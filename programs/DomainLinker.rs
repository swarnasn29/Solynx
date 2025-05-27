use anchor_lang::prelude::*;

declare_id!("22222222222222222222222222222223");

#[program]
pub mod solynx_domain_linker {
    use super::*;

    /// Links a domain name to an Arweave URL
    pub fn link_domain(
        ctx: Context<LinkDomain>,
        domain_name: String,
        arweave_url: String,
        description: Option<String>,
    ) -> Result<()> {
        // Validate inputs
        require!(domain_name.len() <= 100, ErrorCode::DomainTooLong);
        require!(arweave_url.len() <= 200, ErrorCode::UrlTooLong);
        require!(!domain_name.is_empty(), ErrorCode::EmptyDomain);
        require!(!arweave_url.is_empty(), ErrorCode::EmptyUrl);
        
        // Validate domain format (basic validation)
        require!(
            domain_name.chars().all(|c| c.is_alphanumeric() || c == '.' || c == '-' || c == '_'),
            ErrorCode::InvalidDomainFormat
        );

        if let Some(ref desc) = description {
            require!(desc.len() <= 500, ErrorCode::DescriptionTooLong);
        }

        let domain_link = &mut ctx.accounts.domain_link;
        let clock = Clock::get()?;

        domain_link.owner = ctx.accounts.owner.key();
        domain_link.domain_name = domain_name.to_lowercase(); // Store in lowercase for consistency
        domain_link.arweave_url = arweave_url;
        domain_link.description = description.unwrap_or_default();
        domain_link.created_at = clock.unix_timestamp;
        domain_link.updated_at = clock.unix_timestamp;
        domain_link.is_active = true;
        domain_link.bump = ctx.bumps.domain_link;

        emit!(DomainLinked {
            owner: domain_link.owner,
            domain_name: domain_link.domain_name.clone(),
            arweave_url: domain_link.arweave_url.clone(),
            linked_at: domain_link.created_at,
        });

        Ok(())
    }

    /// Updates an existing domain link
    pub fn update_domain_link(
        ctx: Context<UpdateDomainLink>,
        new_arweave_url: Option<String>,
        new_description: Option<String>,
    ) -> Result<()> {
        let domain_link = &mut ctx.accounts.domain_link;
        let clock = Clock::get()?;

        if let Some(arweave_url) = new_arweave_url {
            require!(arweave_url.len() <= 200, ErrorCode::UrlTooLong);
            require!(!arweave_url.is_empty(), ErrorCode::EmptyUrl);
            domain_link.arweave_url = arweave_url;
        }

        if let Some(description) = new_description {
            require!(description.len() <= 500, ErrorCode::DescriptionTooLong);
            domain_link.description = description;
        }

        domain_link.updated_at = clock.unix_timestamp;

        emit!(DomainLinkUpdated {
            owner: domain_link.owner,
            domain_name: domain_link.domain_name.clone(),
            arweave_url: domain_link.arweave_url.clone(),
            updated_at: domain_link.updated_at,
        });

        Ok(())
    }

    /// Deactivates a domain link (soft delete)
    pub fn deactivate_domain_link(ctx: Context<UpdateDomainLink>) -> Result<()> {
        let domain_link = &mut ctx.accounts.domain_link;
        let clock = Clock::get()?;

        domain_link.is_active = false;
        domain_link.updated_at = clock.unix_timestamp;

        emit!(DomainLinkDeactivated {
            owner: domain_link.owner,
            domain_name: domain_link.domain_name.clone(),
            deactivated_at: domain_link.updated_at,
        });

        Ok(())
    }

    /// Reactivates a domain link
    pub fn reactivate_domain_link(ctx: Context<UpdateDomainLink>) -> Result<()> {
        let domain_link = &mut ctx.accounts.domain_link;
        let clock = Clock::get()?;

        domain_link.is_active = true;
        domain_link.updated_at = clock.unix_timestamp;

        emit!(DomainLinkReactivated {
            owner: domain_link.owner,
            domain_name: domain_link.domain_name.clone(),
            reactivated_at: domain_link.updated_at,
        });

        Ok(())
    }

    /// Transfers domain ownership to another wallet
    pub fn transfer_domain_ownership(
        ctx: Context<TransferDomainOwnership>,
        new_owner: Pubkey,
    ) -> Result<()> {
        let domain_link = &mut ctx.accounts.domain_link;
        let clock = Clock::get()?;
        let old_owner = domain_link.owner;

        domain_link.owner = new_owner;
        domain_link.updated_at = clock.unix_timestamp;

        emit!(DomainOwnershipTransferred {
            old_owner,
            new_owner,
            domain_name: domain_link.domain_name.clone(),
            transferred_at: domain_link.updated_at,
        });

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(domain_name: String)]
pub struct LinkDomain<'info> {
    #[account(
        init,
        payer = owner,
        space = DomainLink::LEN,
        seeds = [
            b"domain_link",
            domain_name.to_lowercase().as_bytes()
        ],
        bump
    )]
    pub domain_link: Account<'info, DomainLink>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateDomainLink<'info> {
    #[account(
        mut,
        has_one = owner @ ErrorCode::Unauthorized,
        seeds = [
            b"domain_link",
            domain_link.domain_name.as_bytes()
        ],
        bump = domain_link.bump
    )]
    pub domain_link: Account<'info, DomainLink>,
    
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct TransferDomainOwnership<'info> {
    #[account(
        mut,
        has_one = owner @ ErrorCode::Unauthorized,
        seeds = [
            b"domain_link",
            domain_link.domain_name.as_bytes()
        ],
        bump = domain_link.bump
    )]
    pub domain_link: Account<'info, DomainLink>,
    
    pub owner: Signer<'info>,
    
    /// CHECK: This account is validated by the instruction logic
    pub new_owner: AccountInfo<'info>,
}

#[account]
pub struct DomainLink {
    pub owner: Pubkey,           // 32 bytes
    pub domain_name: String,     // 4 + up to 100 bytes
    pub arweave_url: String,     // 4 + up to 200 bytes
    pub description: String,     // 4 + up to 500 bytes
    pub created_at: i64,         // 8 bytes
    pub updated_at: i64,         // 8 bytes
    pub is_active: bool,         // 1 byte
    pub bump: u8,                // 1 byte
}

impl DomainLink {
    // Calculate space needed for the account
    // 8 (discriminator) + 32 + 4 + 100 + 4 + 200 + 4 + 500 + 8 + 8 + 1 + 1 = 870 bytes
    pub const LEN: usize = 8 + 32 + 4 + 100 + 4 + 200 + 4 + 500 + 8 + 8 + 1 + 1;
}

#[event]
pub struct DomainLinked {
    pub owner: Pubkey,
    pub domain_name: String,
    pub arweave_url: String,
    pub linked_at: i64,
}

#[event]
pub struct DomainLinkUpdated {
    pub owner: Pubkey,
    pub domain_name: String,
    pub arweave_url: String,
    pub updated_at: i64,
}

#[event]
pub struct DomainLinkDeactivated {
    pub owner: Pubkey,
    pub domain_name: String,
    pub deactivated_at: i64,
}

#[event]
pub struct DomainLinkReactivated {
    pub owner: Pubkey,
    pub domain_name: String,
    pub reactivated_at: i64,
}

#[event]
pub struct DomainOwnershipTransferred {
    pub old_owner: Pubkey,
    pub new_owner: Pubkey,
    pub domain_name: String,
    pub transferred_at: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Domain name is too long (max 100 characters)")]
    DomainTooLong,
    #[msg("URL is too long (max 200 characters)")]
    UrlTooLong,
    #[msg("Description is too long (max 500 characters)")]
    DescriptionTooLong,
    #[msg("Domain name cannot be empty")]
    EmptyDomain,
    #[msg("URL cannot be empty")]
    EmptyUrl,
    #[msg("Invalid domain format")]
    InvalidDomainFormat,
    #[msg("Unauthorized: You can only modify your own domain links")]
    Unauthorized,
}