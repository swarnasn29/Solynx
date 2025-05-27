import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { RepoInfo } from './git';
import os from 'os';
import { nanoid } from 'nanoid';

const execAsync = util.promisify(exec);

export interface BuildResult {
  success: boolean;
  outputDir: string;
  error?: string;
}

export async function buildProject(repoDir: string, repoInfo: RepoInfo): Promise<BuildResult> {
  try {
    // Install dependencies if package.json exists
    if (repoInfo.hasPackageJson) {
      console.log('Installing dependencies...');
      await execAsync('npm install', { cwd: repoDir });
    }

    // Create output directory
    const outputDir = path.join(os.tmpdir(), `solynx-build-${nanoid()}`); // instead of path.join(repoDir, 'solynx-build')
    await fs.copy(repoDir, outputDir, {
      filter: (src: any) => {
        // Exclude node_modules, .git, etc.
        return !src.includes('node_modules') && !src.includes('.git');
      }
    });

    // Build based on project type
    if (repoInfo.type === 'next') {
      // Ensure next.config.js has the output: 'export' setting for static export
      const configPath = path.join(repoDir, 'next.config.js');
      if (fs.existsSync(configPath)) {
        let configContent = fs.readFileSync(configPath, 'utf8');
        if (!configContent.includes('output:') || !configContent.includes('export')) {
          // Modify config to add output: 'export'
          if (configContent.includes('module.exports')) {
            configContent = configContent.replace(
              'module.exports = {',
              'module.exports = {\n  output: "export",'
            );
          } else {
            // Create a basic config
            configContent = `
              /** @type {import('next').NextConfig} */
              const nextConfig = {
                output: 'export',
                // Original config follows
                ${configContent}
              };
              
              module.exports = nextConfig;
            `;
          }
          fs.writeFileSync(configPath, configContent);
        }
      } else {
        // Create a basic next.config.js file
        const basicConfig = `
          /** @type {import('next').NextConfig} */
          const nextConfig = {
            output: 'export',
          };
          
          module.exports = nextConfig;
        `;
        fs.writeFileSync(configPath, basicConfig);
      }

      // Run the build command
      console.log('Building Next.js project...');
      await execAsync('npm run build', { cwd: repoDir });
      
      // Next.js v12+ with output: export creates an 'out' directory
      const nextOutDir = path.join(repoDir, 'out');
      if (fs.existsSync(nextOutDir)) {
        await fs.copy(nextOutDir, outputDir);
      } else {
        throw new Error('Next.js build completed but no output directory was found.');
      }
    } else if (repoInfo.type === 'react') {
      console.log('Building React project...');
      await execAsync('npm run build', { cwd: repoDir });
      
      // React typically builds to a 'build' directory
      const buildDir = path.join(repoDir, 'build');
      if (fs.existsSync(buildDir)) {
        await fs.copy(buildDir, outputDir);
      } else {
        throw new Error('React build completed but no build directory was found.');
      }
    } else if (repoInfo.type === 'vue') {
      console.log('Building Vue project...');
      await execAsync('npm run build', { cwd: repoDir });
      
      // Vue typically builds to a 'dist' directory
      const distDir = path.join(repoDir, 'dist');
      if (fs.existsSync(distDir)) {
        await fs.copy(distDir, outputDir);
      } else {
        throw new Error('Vue build completed but no dist directory was found.');
      }
    } else if (repoInfo.type === 'static') {
      // Just copy all files for a static site
      console.log('Copying static site files...');
      await fs.copy(repoDir, outputDir, {
        filter: (src: any) => {
          // Exclude node_modules, .git, etc.
          return !src.includes('node_modules') && 
                 !src.includes('.git') &&
                 !src.includes('.github') &&
                 !src.includes('.gitignore');
        }
      });
    } else {
      throw new Error(`Unsupported project type: ${repoInfo.type}`);
    }

    return {
      success: true,
      outputDir,
    };
  } catch (error: any) {
    console.error('Build failed:', error);
    return {
      success: false,
      outputDir: '',
      error: error.message,
    };
  }
}
