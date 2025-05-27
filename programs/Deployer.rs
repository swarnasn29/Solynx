use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111112");

#[program]
pub mod solynx_deployer {
    use super::*;

    /// Creates a new deployment record for a user
    pub fn create_deployment(
        ctx: Context<CreateDeployment>,
        github_url: String,
        arweave_url: String,
    ) -> Result<()> {
        // Validate URL lengths to prevent excessive storage costs
        require!(github_url.len() <= 200, ErrorCode::UrlTooLong);
        require!(arweave_url.len() <= 200, ErrorCode::UrlTooLong);
        require!(!github_url.is_empty(), ErrorCode::EmptyUrl);
        require!(!arweave_url.is_empty(), ErrorCode::EmptyUrl);

        let deployment = &mut ctx.accounts.deployment;
        let clock = Clock::get()?;

        deployment.owner = ctx.accounts.owner.key();
        deployment.github_url = github_url;
        deployment.arweave_url = arweave_url;
        deployment.deployed_at = clock.unix_timestamp;
        deployment.bump = ctx.bumps.deployment;

        emit!(DeploymentCreated {
            owner: deployment.owner,
            github_url: deployment.github_url.clone(),
            arweave_url: deployment.arweave_url.clone(),
            deployed_at: deployment.deployed_at,
        });

        Ok(())
    }

    /// Updates an existing deployment record
    pub fn update_deployment(
        ctx: Context<UpdateDeployment>,
        new_github_url: Option<String>,
        new_arweave_url: Option<String>,
    ) -> Result<()> {
        let deployment = &mut ctx.accounts.deployment;

        if let Some(github_url) = new_github_url {
            require!(github_url.len() <= 200, ErrorCode::UrlTooLong);
            require!(!github_url.is_empty(), ErrorCode::EmptyUrl);
            deployment.github_url = github_url;
        }

        if let Some(arweave_url) = new_arweave_url {
            require!(arweave_url.len() <= 200, ErrorCode::UrlTooLong);
            require!(!arweave_url.is_empty(), ErrorCode::EmptyUrl);
            deployment.arweave_url = arweave_url;
        }

        let clock = Clock::get()?;
        deployment.deployed_at = clock.unix_timestamp;

        emit!(DeploymentUpdated {
            owner: deployment.owner,
            github_url: deployment.github_url.clone(),
            arweave_url: deployment.arweave_url.clone(),
            updated_at: deployment.deployed_at,
        });

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(github_url: String, arweave_url: String)]
pub struct CreateDeployment<'info> {
    #[account(
        init,
        payer = owner,
        space = Deployment::LEN,
        seeds = [
            b"deployment",
            owner.key().as_ref(),
            &Clock::get()?.unix_timestamp.to_le_bytes()
        ],
        bump
    )]
    pub deployment: Account<'info, Deployment>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateDeployment<'info> {
    #[account(
        mut,
        has_one = owner @ ErrorCode::Unauthorized,
        seeds = [
            b"deployment",
            owner.key().as_ref(),
            &deployment.deployed_at.to_le_bytes()
        ],
        bump = deployment.bump
    )]
    pub deployment: Account<'info, Deployment>,
    
    pub owner: Signer<'info>,
}

#[account]
pub struct Deployment {
    pub owner: Pubkey,           // 32 bytes
    pub github_url: String,      // 4 + up to 200 bytes
    pub arweave_url: String,     // 4 + up to 200 bytes
    pub deployed_at: i64,        // 8 bytes
    pub bump: u8,                // 1 byte
}

impl Deployment {
    // Calculate space needed for the account
    // 8 (discriminator) + 32 + 4 + 200 + 4 + 200 + 8 + 1 = 457 bytes
    pub const LEN: usize = 8 + 32 + 4 + 200 + 4 + 200 + 8 + 1;
}

#[event]
pub struct DeploymentCreated {
    pub owner: Pubkey,
    pub github_url: String,
    pub arweave_url: String,
    pub deployed_at: i64,
}

#[event]
pub struct DeploymentUpdated {
    pub owner: Pubkey,
    pub github_url: String,
    pub arweave_url: String,
    pub updated_at: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("URL is too long (max 200 characters)")]
    UrlTooLong,
    #[msg("URL cannot be empty")]
    EmptyUrl,
    #[msg("Unauthorized: You can only modify your own deployments")]
    Unauthorized,
}