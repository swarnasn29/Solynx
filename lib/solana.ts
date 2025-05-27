import { 
    Connection, 
    Keypair, 
    PublicKey, 
    Transaction, 
    TransactionInstruction,
    SystemProgram, 
    sendAndConfirmTransaction 
  } from '@solana/web3.js';
  import { serialize, deserialize } from 'borsh';
  
  export interface SolanaDeploymentResult {
    success: boolean;
    signature?: string;
    error?: string;
  }
  
  class DeploymentRecord {
    arweaveId: string;
    timestamp: number;
    domain: string;
    owner: Uint8Array;
  
    constructor(props: {
      arweaveId: string;
      timestamp: number;
      domain: string;
      owner: Uint8Array;
    }) {
      this.arweaveId = props.arweaveId;
      this.timestamp = props.timestamp;
      this.domain = props.domain;
      this.owner = props.owner;
    }
  
    static schema = new Map([
      [
        DeploymentRecord,
        {
          kind: 'struct',
          fields: [
            ['arweaveId', 'string'],
            ['timestamp', 'u64'],
            ['domain', 'string'],
            ['owner', [32]],
          ],
        },
      ],
    ]);
  }
  
  export async function registerDeploymentOnSolana(
    connection: Connection,
    payer: Keypair,
    programId: PublicKey,
    arweaveId: string,
    domain: string
  ): Promise<SolanaDeploymentResult> {
    try {
      // Create a new account for storing deployment data
      const newAccount = Keypair.generate();
      const deploymentRecord = new DeploymentRecord({
        arweaveId,
        timestamp: Math.floor(Date.now() / 1000),
        domain,
        owner: new Uint8Array(payer.publicKey.toBytes()),
      });
  
      // Serialize the data
      const data = serialize(DeploymentRecord.schema, deploymentRecord);
      
      // Calculate rent exemption
      const space = data.length;
      const lamports = await connection.getMinimumBalanceForRentExemption(space);
  
      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: newAccount.publicKey,
          lamports,
          space,
          programId,
        }),
        new TransactionInstruction({
          keys: [
            { pubkey: newAccount.publicKey, isSigner: true, isWritable: true },
            { pubkey: payer.publicKey, isSigner: true, isWritable: false },
          ],
          programId,
          data: Buffer.from(data),
        })
      );
  
      // Send transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [payer, newAccount]);
  
      return {
        success: true,
        signature,
      };
    } catch (error: any) {
      console.error('Failed to register deployment on Solana:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }