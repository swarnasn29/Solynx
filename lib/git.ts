import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

const execAsync = util.promisify(exec);

export interface RepoInfo {
  type: 'next' | 'react' | 'vue' | 'static' | 'unknown';
  hasPackageJson: boolean;
  framework?: string;
  version?: string;
  buildCommand?: string;
}

export async function cloneRepository(repoUrl: string, targetDir: string): Promise<string> {
  try {
    await execAsync(`git clone ${repoUrl} ${targetDir}`);
    return targetDir;
  } catch (error: any) {
    console.error('Failed to clone repository:', error);
    throw new Error(`Failed to clone repository: ${error.message}`);
  }
}

export async function analyzeRepository(repoDir: string): Promise<RepoInfo> {
  const info: RepoInfo = {
    type: 'unknown',
    hasPackageJson: false,
  };

  try {
    // Check if package.json exists
    const packageJsonPath = path.join(repoDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      info.hasPackageJson = true;
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      info.version = packageJson.version;

      // Identify framework based on dependencies
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      if (deps.next) {
        info.type = 'next';
        info.framework = 'next';
        info.buildCommand = 'npm run build && npm run export';
      } else if (deps.react && !deps.next) {
        info.type = 'react';
        info.framework = 'react';
        info.buildCommand = 'npm run build';
      } else if (deps.vue) {
        info.type = 'vue';
        info.framework = 'vue';
        info.buildCommand = 'npm run build';
      }

      // Get build command from scripts if available
      if (packageJson.scripts) {
        if (packageJson.scripts.build) {
          info.buildCommand = 'npm run build';
        }
        if (info.type === 'next' && !packageJson.scripts.export) {
          // Next.js after v12 uses 'next build' with 'output: export' in next.config.js
          info.buildCommand = 'npm run build';
        }
      }
    } else {
      // Check if it's a basic static site
      const htmlFiles = fs.readdirSync(repoDir).filter(file => file.endsWith('.html'));
      if (htmlFiles.length > 0) {
        info.type = 'static';
      }
    }

    return info;
  } catch (error) {
    console.error('Failed to analyze repository:', error);
    return info;
  }
}