#!/usr/bin/env node

import https from 'https';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs to validate
const SITEMAP_URLS = [
  'https://indianyug.com/sitemap.xml',
  'https://indianyug.com/sitemap-0.xml',
  'https://indianyug.com/news.xml'
];

// Helper function to check URL accessibility
function checkUrl(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    https.get(url, (res) => {
      const responseTime = Date.now() - startTime;
      const contentType = res.headers['content-type'] || '';
      
      resolve({
        url,
        status: res.statusCode,
        contentType,
        responseTime,
        accessible: res.statusCode === 200,
        error: null
      });
    }).on('error', (error) => {
      resolve({
        url,
        status: null,
        contentType: null,
        responseTime: Date.now() - startTime,
        accessible: false,
        error: error.message
      });
    });
  });
}

// Helper function to fetch real WordPress posts with pagination
async function fetchRealPosts() {
  const allPosts = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    try {
      const posts = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'cms.indianyug.com',
          path: `/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_fields=slug,link,date_gmt,title`,
          method: 'GET',
          headers: {
            'User-Agent': 'IndianYug-Sitemap-Validator/1.0'
          }
        };
        
        let data = '';
        
        const req = https.request(options, (res) => {
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              const posts = JSON.parse(data);
              resolve(posts);
            } catch (error) {
              reject(error);
            }
          });
        });
        
        req.on('error', (error) => {
          reject(error);
        });
        
        req.end();
      });
      
      if (posts.length === 0) {
        break;
      }
      
      allPosts.push(...posts);
      
      if (posts.length < perPage) {
        break;
      }
      
      page++;
    } catch (error) {
      if (error.message.includes('404')) {
        // No more pages
        break;
      }
      throw error;
    }
  }
  
  const realUrls = allPosts.map(post => ({
    url: `https://indianyug.com/${post.slug}`,
    title: post.title.rendered,
    date: post.date_gmt
  }));
  
  return realUrls;
}

// Main validation function
async function validateRealSitemaps() {
  console.log('🔍 Starting Real Sitemap Validation...\n');
  
  const results = {
    sitemaps: {},
    urls: {},
    summary: {
      total: 0,
      accessible: 0,
      errors: 0,
      warnings: 0
    }
  };
  
  // Check sitemap files
  console.log('📋 Checking sitemap files...\n');
  for (const sitemapUrl of SITEMAP_URLS) {
    const result = await checkUrl(sitemapUrl);
    results.sitemaps[sitemapUrl] = result;
    
    if (result.accessible) {
      console.log(`✅ ${sitemapUrl} - OK (${result.responseTime}ms)`);
    } else {
      console.log(`❌ ${sitemapUrl} - ERROR: ${result.error || `Status ${result.status}`}`);
      results.summary.errors++;
    }
  }
  
  // Fetch and validate real WordPress URLs
  console.log('\n📰 Fetching real WordPress posts...\n');
  try {
    const realPosts = await fetchRealPosts();
    console.log(`Found ${realPosts.length} real WordPress posts\n`);
    
    results.summary.total = realPosts.length;
    
    // Validate each real URL
    console.log('🔍 Validating real article URLs...\n');
    const batchSize = 10;
    const batches = [];
    
    for (let i = 0; i < realPosts.length; i += batchSize) {
      batches.push(realPosts.slice(i, i + batchSize));
    }
    
    let processed = 0;
    
    for (const batch of batches) {
      const batchResults = await Promise.all(batch.map(post => checkUrl(post.url)));
      
      batchResults.forEach((result, index) => {
        const post = batch[index];
        results.urls[result.url] = {
          ...result,
          title: post.title,
          date: post.date
        };
        
        if (result.accessible) {
          results.summary.accessible++;
          console.log(`✅ ${result.url} - OK (${result.responseTime}ms) - ${post.title.substring(0, 50)}...`);
        } else {
          results.summary.errors++;
          console.log(`❌ ${result.url} - ERROR: ${result.error || `Status ${result.status}`} - ${post.title.substring(0, 50)}...`);
        }
        
        processed++;
        if (processed % 10 === 0) {
          console.log(`Progress: ${processed}/${realPosts.length} URLs checked`);
        }
      });
      
      // Small delay between batches
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
  } catch (error) {
    console.error('❌ Error fetching WordPress posts:', error.message);
    return;
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: results.summary,
    sitemaps: results.sitemaps,
    failedUrls: Object.values(results.urls).filter(url => !url.accessible),
    workingUrls: Object.values(results.urls).filter(url => url.accessible)
  };
  
  const reportPath = path.join(__dirname, '..', 'real-sitemap-validation-report.json');
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📊 Validation Report Generated: ${reportPath}`);
  console.log(`📈 Summary:`);
  console.log(`   Total Real Articles: ${report.summary.total}`);
  console.log(`   ✅ Accessible: ${report.summary.accessible}`);
  console.log(`   ❌ Errors: ${report.summary.errors}`);
  console.log(`   ⚠️  Warnings: ${report.summary.warnings}`);
  
  if (report.failedUrls.length > 0) {
    console.log(`\n❌ Failed URLs:`);
    report.failedUrls.forEach(url => {
      console.log(`   ${url.url} - ${url.error || `Status ${url.status}`}`);
    });
  }
  
  console.log('\n✅ Real validation complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateRealSitemaps().catch(console.error);
}
