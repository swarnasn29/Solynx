import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { nanoid } from 'nanoid';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { cloneRepository, analyzeRepository } from '../../../lib/git';
import { buildProject } from '../../../lib/builder';
import { deployToArweave, deployToArweaveWithArDrive, uploadToArweave } from '../../../lib/arweave';
import { registerDeploymentOnSolana } from '../../../lib/solana';
import { NextResponse } from "next/server";
import formidable from 'formidable';
import { Readable } from 'stream';


// Helper to parse multipart form data from a Web API Request
async function parseFormData(req: Request) {
  const form = formidable({ 
    multiples: false, 
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB max file size
  });

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    throw new Error('Content-Type must be multipart/form-data');
  }

  const buffer = Buffer.from(await req.arrayBuffer());
  const stream = Readable.from(buffer);
  
  // Add required headers that formidable expects
  const headers = {
    'content-type': contentType,
    'content-length': buffer.length.toString()
  };

  return new Promise<{ fields: any, files: any }>((resolve, reject) => {
    form.parse(stream, { headers }, (err: any, fields: any, files: any) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
export async function POST(req: Request) {

  const contentType = req.headers.get('content-type') || '';
  // if (!contentType.startsWith('multipart/form-data')) {
  //   return NextResponse.json({ error: 'Content-Type must be multipart/form-data' }, { status: 400 });
  // }

  let fields, files;
  try {
    ({ fields, files } = await parseFormData(req));
  } catch (err) {
    return NextResponse.json({ error: 'Failed to parse form data', details: String(err) }, { status: 400 });
  }

  const repoUrl = fields.repoUrl;
  const solanaKeyFile = fields.solanaKeyFile;
  const domain = fields.domain ? "hello": undefined;
  const tags = fields.tags ? JSON.parse(fields.tags) : undefined;
  const arweaveKeyFile = files.arweaveKeyFile;

  if (!repoUrl) {
    return NextResponse.json({ error: 'Repository URL is required' }, { status: 400 });
  }
  if (!arweaveKeyFile) {
    return NextResponse.json({ error: 'Arweave key file is required' }, { status: 400 });
  }
  try {
    
      // Use the file path for uploadToArweave
      const arweaveKeyPath = arweaveKeyFile.filepath || arweaveKeyFile.path;
  
      // Parse solana key if provided
      const solanaKey = solanaKeyFile
        ? Keypair.fromSecretKey(new Uint8Array(JSON.parse(solanaKeyFile)))
        : null;
  
      // Create a temporary directory for the repo
      const tmpDir = path.join(os.tmpdir(), `solynx-${nanoid()}`);
      fs.ensureDirSync(tmpDir);
  

    // Clone the repository
    console.log(`Cloning ${repoUrl} to ${tmpDir}...`);
    const repoDir = await cloneRepository(repoUrl, tmpDir);

    // Analyze the repository
    console.log('Analyzing repository...');
    const repoInfo = await analyzeRepository(repoDir);
    
    if (repoInfo.type === 'unknown') {
      throw new Error('Unable to determine project type. Please ensure it\'s a valid Next.js, React, Vue, or static HTML project.');
    }

    // Build the project
    console.log(`Building project of type: ${repoInfo.type}...`);
    const buildResult = await buildProject(repoDir, repoInfo);
    
    if (!buildResult.success) {
      throw new Error(`Build failed: ${buildResult.error}`);
    }

    // Define tags for Arweave
    const deploymentTags = [
      { name: 'App-Name', value: 'Solynx' },
      { name: 'Content-Type', value: 'text/html' },
      { name: 'Deploy-Platform', value: 'Solynx' },
      { name: 'Project-Type', value: repoInfo.type },
      ...(domain ? [{ name: 'Domain', value: domain }] : []),
      ...(tags || [])
    ];

    // Deploy to Arweave
    console.log('Deploying to Arweave...');
    const arweaveResult: any = await uploadToArweave(buildResult.outputDir, arweaveKeyPath);
    
    if (!arweaveResult.success) {
      throw new Error(`Arweave deployment failed: ${arweaveResult.error}`);
    }

    // Register on Solana if solanaKey is provided
    let solanaResult: any = { success: false, error: 'Solana key not provided' };
    if (solanaKey) {
      console.log('Registering deployment on Solana...');
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      // This would be your program ID - replace with actual value
      const programId = new PublicKey('YourProgramIdHere');
      
      solanaResult = await registerDeploymentOnSolana(
        connection,
        solanaKey,
        programId,
        arweaveResult.transactionId,
        domain || ''
      );
    }

    // Clean up the temporary directory
    fs.removeSync(tmpDir);

    // Return the results
    return NextResponse.json({
      success: true,
      arweave: {
        transactionId: arweaveResult.transactionId,
        url: arweaveResult.url
      },
      solana: solanaResult.success ? {
        signature: solanaResult.signature
      } : {
        status: 'not registered',
        reason: solanaResult.error
      },
      projectInfo: {
        type: repoInfo.type,
        framework: repoInfo.framework
      }
    });
  } catch (error: any) {
    console.error('Deployment failed:', error);
    return NextResponse.json({ 
      error: 'Deployment failed', 
      message: error.message 
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return NextResponse.json({
    status: 'ok',
    message: 'Solynx deployment API is running',
    endpoints: {
      POST: '/api/deploy',
      GET: '/api/deploy'
    }
  });
}