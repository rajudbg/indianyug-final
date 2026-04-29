#!/usr/bin/env node

/**
 * Performance Check Script for Cloudflare Pages Deployment
 * 
 * This script validates all performance optimizations are in place
 * before deploying to Cloudflare Pages
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 Performance Optimization Check for Cloudflare Pages\n');

const checks = [
  {
    name: 'Bundle Analyzer Configuration',
    check: () => {
      const configPath = fs.existsSync('next.config.mjs') ? 'next.config.mjs' : 'next.config.js';
      const nextConfig = fs.readFileSync(configPath, 'utf8');
      return nextConfig.includes('withBundleAnalyzer') && nextConfig.includes('@next/bundle-analyzer');
    }
  },
  {
    name: 'Font Optimization',
    check: () => {
      const layout = fs.readFileSync('app/layout.tsx', 'utf8');
      return layout.includes('display: \'swap\'') && layout.includes('preload: true');
    }
  },
  {
    name: 'Cloudflare Headers File',
    check: () => fs.existsSync('_headers')
  },
  {
    name: 'Performance Optimizer Component',
    check: () => fs.existsSync('components/ui/performance-optimizer.tsx')
  },
  {
    name: 'Web Vitals Monitoring',
    check: () => fs.existsSync('components/ui/web-vitals.tsx')
  },
  {
    name: 'Lazy Loading Components',
    check: () => fs.existsSync('components/ui/lazy-components.tsx')
  },
  {
    name: 'Package Dependencies',
    check: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.dependencies['web-vitals'] && pkg.dependencies['@next/bundle-analyzer'];
    }
  },
  {
    name: 'Image Optimization',
    check: () => {
      const configPath = fs.existsSync('next.config.mjs') ? 'next.config.mjs' : 'next.config.js';
      const nextConfig = fs.readFileSync(configPath, 'utf8');
      return nextConfig.includes('remotePatterns') && nextConfig.includes('cms.indianyug.com');
    }
  },
  {
    name: 'Compression Enabled',
    check: () => {
      const configPath = fs.existsSync('next.config.mjs') ? 'next.config.mjs' : 'next.config.js';
      const nextConfig = fs.readFileSync(configPath, 'utf8');
      return nextConfig.includes('compress: true');
    }
  },
  {
    name: 'Security Headers',
    check: () => {
      const vercel = fs.readFileSync('vercel.json', 'utf8');
      return vercel.includes('X-Frame-Options') && vercel.includes('Strict-Transport-Security');
    }
  }
];

let passed = 0;
let failed = 0;

checks.forEach(({ name, check }) => {
  try {
    if (check()) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${name} (Error: ${error.message})`);
    failed++;
  }
});

console.log(`\n📊 Performance Check Results:`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Score: ${Math.round((passed / (passed + failed)) * 100)}%\n`);

if (failed === 0) {
  console.log('🎉 All performance optimizations are in place!');
  console.log('🌍 Ready for Cloudflare Pages deployment\n');
} else {
  console.log('⚠️  Some optimizations are missing. Please review the failed checks.\n');
}

// Additional Cloudflare Pages specific checks
console.log('🔧 Cloudflare Pages Compatibility:');
const cfChecks = [
  {
    name: 'Edge Runtime Support',
    check: () => {
      const apiFiles = ['app/api/subscribe/route.ts'];
      return apiFiles.some(file => {
        if (fs.existsSync(file)) {
          const content = fs.readFileSync(file, 'utf8');
          return content.includes('edge');
        }
        return false;
      });
    }
  },
  {
    name: 'Static Export Compatibility',
    check: () => {
      const configPath = fs.existsSync('next.config.mjs') ? 'next.config.mjs' : 'next.config.js';
      const nextConfig = fs.readFileSync(configPath, 'utf8');
      return !nextConfig.includes('output: \'export\''); // Should NOT be export for dynamic features
    }
  }
];

cfChecks.forEach(({ name, check }) => {
  try {
    if (check()) {
      console.log(`✅ ${name}`);
    } else {
      console.log(`❌ ${name}`);
    }
  } catch (error) {
    console.log(`❌ ${name} (Error: ${error.message})`);
  }
});
