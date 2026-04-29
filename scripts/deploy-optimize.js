#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting deployment optimization...');

// Clear Next.js cache
const nextCacheDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextCacheDir)) {
  console.log('🗑️  Clearing Next.js cache...');
  fs.rmSync(nextCacheDir, { recursive: true, force: true });
}

// Clear node_modules cache if it exists
const nodeModulesCache = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(nodeModulesCache)) {
  console.log('🗑️  Clearing node_modules cache...');
  fs.rmSync(nodeModulesCache, { recursive: true, force: true });
}

// Check for large files that might cause issues
console.log('📊 Checking for large files...');
const checkLargeFiles = (dir, maxSize = 10 * 1024 * 1024) => { // 10MB
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
      checkLargeFiles(fullPath, maxSize);
    } else if (file.isFile()) {
      try {
        const stats = fs.statSync(fullPath);
        if (stats.size > maxSize) {
          console.log(`⚠️  Large file found: ${fullPath} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
        }
      } catch (error) {
        // Ignore permission errors
      }
    }
  }
};

checkLargeFiles(process.cwd());

// Check package.json for potential issues
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  console.log('📦 Package.json analysis:');
  console.log(`   - Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
  console.log(`   - Dev dependencies: ${Object.keys(packageJson.devDependencies || {}).length}`);
  
  // Check for potentially problematic dependencies
  const problematicDeps = ['framer-motion', 'three', 'gsap'];
  const foundProblematic = problematicDeps.filter(dep => 
    packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]
  );
  
  if (foundProblematic.length > 0) {
    console.log(`⚠️  Found potentially heavy dependencies: ${foundProblematic.join(', ')}`);
  }
}

console.log('✅ Deployment optimization complete!');
console.log('💡 Tips for faster builds:');
console.log('   - Consider using dynamic imports for heavy components');
console.log('   - Optimize images before deployment');
console.log('   - Use Next.js Image component with proper sizing');
console.log('   - Consider implementing ISR for frequently updated pages'); 