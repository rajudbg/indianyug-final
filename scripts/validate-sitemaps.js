#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URLs to validate
const SITEMAP_URLS = [
  'https://indianyug.com/sitemap.xml',
  'https://indianyug.com/sitemap-0.xml',
  'https://indianyug.com/news.xml'
];

// All URLs from sitemaps (173 total)
const ALL_URLS = [
  // From sitemap-0.xml (73 URLs)
  'https://indianyug.com/',
  'https://indianyug.com/about',
  'https://indianyug.com/contact',
  'https://indianyug.com/disclaimer',
  'https://indianyug.com/privacy-policy',
  'https://indianyug.com/terms-of-service',
  'https://indianyug.com/category/business',
  'https://indianyug.com/category/entertainment',
  'https://indianyug.com/category/health',
  'https://indianyug.com/category/india',
  'https://indianyug.com/category/lifestyle',
  'https://indianyug.com/category/opinion',
  'https://indianyug.com/category/politics',
  'https://indianyug.com/category/sports',
  'https://indianyug.com/category/technology',
  'https://indianyug.com/category/world',
  'https://indianyug.com/2024/12/31/2024-year-in-review-major-events',
  'https://indianyug.com/2024/12/30/indian-economy-growth-2024',
  'https://indianyug.com/2024/12/29/technology-trends-2024-india',
  'https://indianyug.com/2024/12/28/politics-year-end-review',
  'https://indianyug.com/2024/12/27/sports-highlights-2024',
  'https://indianyug.com/2024/12/26/entertainment-blockbusters-2024',
  'https://indianyug.com/2024/12/25/health-wellness-trends-2024',
  'https://indianyug.com/2024/12/24/lifestyle-changes-2024',
  'https://indianyug.com/2024/12/23/world-events-impact-india',
  'https://indianyug.com/2024/12/22/business-success-stories-2024',
  'https://indianyug.com/2024/12/21/opinion-editorial-2024',
  'https://indianyug.com/2024/12/20/indian-startup-ecosystem-2024',
  'https://indianyug.com/2024/12/19/climate-change-india-response',
  'https://indianyug.com/2024/12/18/education-reforms-2024',
  'https://indianyug.com/2024/12/17/healthcare-innovations-india',
  'https://indianyug.com/2024/12/16/digital-transformation-india',
  'https://indianyug.com/2024/12/15/agriculture-technology-2024',
  'https://indianyug.com/2024/12/14/space-research-india-2024',
  'https://indianyug.com/2024/12/13/defense-achievements-2024',
  'https://indianyug.com/2024/12/12/foreign-policy-milestones',
  'https://indianyug.com/2024/12/11/social-media-impact-2024',
  'https://indianyug.com/2024/12/10/cryptocurrency-regulation-india',
  'https://indianyug.com/2024/12/09/artificial-intelligence-india',
  'https://indianyug.com/2024/12/08/renewable-energy-milestones',
  'https://indianyug.com/2024/12/07/smart-cities-development',
  'https://indianyug.com/2024/12/06/rural-development-schemes',
  'https://indianyug.com/2024/12/05/women-empowerment-2024',
  'https://indianyug.com/2024/12/04/youth-entrepreneurship-india',
  'https://indianyug.com/2024/12/03/financial-inclusion-2024',
  'https://indianyug.com/2024/12/02/digital-payment-adoption',
  'https://indianyug.com/2024/12/01/e-commerce-growth-india',
  'https://indianyug.com/2024/11/30/startup-funding-2024',
  'https://indianyug.com/2024/11/29/unicorn-companies-india',
  'https://indianyug.com/2024/11/28/ipo-market-2024',
  'https://indianyug.com/2024/11/27/stock-market-performance',
  'https://indianyug.com/2024/11/26/banking-sector-reforms',
  'https://indianyug.com/2024/11/25/insurance-sector-growth',
  'https://indianyug.com/2024/11/24/real-estate-trends-2024',
  'https://indianyug.com/2024/11/23/infrastructure-development',
  'https://indianyug.com/2024/11/22/transportation-upgrades',
  'https://indianyug.com/2024/11/21/aviation-industry-recovery',
  'https://indianyug.com/2024/11/20/tourism-revival-india',
  'https://indianyug.com/2024/11/19/hospitality-sector-growth',
  'https://indianyug.com/2024/11/18/food-processing-industry',
  'https://indianyug.com/2024/11/17/textile-industry-2024',
  'https://indianyug.com/2024/11/16/automobile-sector-performance',
  'https://indianyug.com/2024/11/15/pharmaceutical-industry-growth',
  'https://indianyug.com/2024/11/14/it-services-expansion',
  'https://indianyug.com/2024/11/13/fintech-innovations-2024',
  'https://indianyug.com/2024/11/12/edtech-sector-evolution',
  'https://indianyug.com/2024/11/11/healthtech-advancements',
  'https://indianyug.com/2024/11/10/agritech-innovations',
  'https://indianyug.com/2024/11/09/cleantech-investments',
  'https://indianyug.com/2024/11/08/biotech-breakthroughs',
  'https://indianyug.com/2024/11/07/nanotechnology-research',
  'https://indianyug.com/2024/11/06/quantum-computing-india',
  'https://indianyug.com/2024/11/05/blockchain-applications',
  'https://indianyug.com/2024/11/04/iot-adoption-india',
  'https://indianyug.com/2024/11/03/5g-implementation-progress',
  'https://indianyug.com/2024/11/02/cybersecurity-measures',
  'https://indianyug.com/2024/11/01/data-protection-laws',
  'https://indianyug.com/2024/10/31/privacy-rights-india',
  'https://indianyug.com/2024/10/30/digital-literacy-campaigns',
  'https://indianyug.com/2024/10/29/skill-development-programs',
  'https://indianyug.com/2024/10/28/vocational-training-india',
  'https://indianyug.com/2024/10/27/apprenticeship-schemes',
  'https://indianyug.com/2024/10/26/employment-generation-2024',
  'https://indianyug.com/2024/10/25/labor-market-reforms',
  'https://indianyug.com/2024/10/24/minimum-wage-revisions',
  'https://indianyug.com/2024/10/23/social-security-expansion',
  'https://indianyug.com/2024/10/22/pension-scheme-enhancements',
  'https://indianyug.com/2024/10/21/health-insurance-coverage',
  'https://indianyug.com/2024/10/20/maternity-benefit-schemes',
  'https://indianyug.com/2024/10/19/child-welfare-programs',
  'https://indianyug.com/2024/10/18/elderly-care-initiatives',
  'https://indianyug.com/2024/10/17/disability-rights-advancement',
  'https://indianyug.com/2024/10/16/lgbtq-rights-progress',
  'https://indianyug.com/2024/10/15/gender-equality-measures',
  'https://indianyug.com/2024/10/14/minority-empowerment',
  'https://indianyug.com/2024/10/13/tribal-development-schemes',
  'https://indianyug.com/2024/10/12/backward-classes-welfare',
  'https://indianyug.com/2024/10/11/below-poverty-line-support',
  'https://indianyug.com/2024/10/10/food-security-programs',
  'https://indianyug.com/2024/10/09/public-distribution-system',
  'https://indianyug.com/2024/10/08/mid-day-meal-schemes',
  'https://indianyug.com/2024/10/07/anganwadi-services',
  'https://indianyug.com/2024/10/06/integrated-child-development',
  'https://indianyug.com/2024/10/05/nutrition-campaigns',
  'https://indianyug.com/2024/10/04/clean-drinking-water',
  'https://indianyug.com/2024/10/03/sanitation-improvements',
  'https://indianyug.com/2024/10/02/swachh-bharat-mission',
  'https://indianyug.com/2024/10/01/waste-management-systems',
  
  // From news.xml (100 URLs)
  'https://indianyug.com/2024/12/31/breaking-news-2024-year-end-special',
  'https://indianyug.com/2024/12/31/politics-major-announcements-today',
  'https://indianyug.com/2024/12/31/business-market-updates-live',
  'https://indianyug.com/2024/12/31/technology-latest-launches',
  'https://indianyug.com/2024/12/31/sports-breaking-news-today',
  'https://indianyug.com/2024/12/31/entertainment-buzz-latest',
  'https://indianyug.com/2024/12/31/health-wellness-updates',
  'https://indianyug.com/2024/12/31/lifestyle-trending-now',
  'https://indianyug.com/2024/12/31/world-news-headlines',
  'https://indianyug.com/2024/12/31/india-news-today',
  'https://indianyug.com/2024/12/30/politics-breaking-developments',
  'https://indianyug.com/2024/12/30/business-stock-market-live',
  'https://indianyug.com/2024/12/30/technology-innovation-news',
  'https://indianyug.com/2024/12/30/sports-match-results',
  'https://indianyug.com/2024/12/30/entertainment-celebrity-news',
  'https://indianyug.com/2024/12/30/health-medical-breakthroughs',
  'https://indianyug.com/2024/12/30/lifestyle-fashion-trends',
  'https://indianyug.com/2024/12/30/world-international-affairs',
  'https://indianyug.com/2024/12/30/india-national-news',
  'https://indianyug.com/2024/12/29/politics-election-updates',
  'https://indianyug.com/2024/12/29/business-economic-indicators',
  'https://indianyug.com/2024/12/29/technology-ai-developments',
  'https://indianyug.com/2024/12/29/sports-tournament-results',
  'https://indianyug.com/2024/12/29/entertainment-movie-releases',
  'https://indianyug.com/2024/12/29/health-fitness-trends',
  'https://indianyug.com/2024/12/29/lifestyle-travel-updates',
  'https://indianyug.com/2024/12/29/world-global-events',
  'https://indianyug.com/2024/12/29/india-regional-news',
  'https://indianyug.com/2024/12/28/politics-policy-changes',
  'https://indianyug.com/2024/12/28/business-corporate-news',
  'https://indianyug.com/2024/12/28/technology-cybersecurity-alerts',
  'https://indianyug.com/2024/12/28/sports-player-transfers',
  'https://indianyug.com/2024/12/28/entertainment-music-releases',
  'https://indianyug.com/2024/12/28/health-nutrition-studies',
  'https://indianyug.com/2024/12/28/lifestyle-home-decor',
  'https://indianyug.com/2024/12/28/world-diplomatic-relations',
  'https://indianyug.com/2024/12/28/india-state-news',
  'https://indianyug.com/2024/12/27/politics-parliament-updates',
  'https://indianyug.com/2024/12/27/business-market-analysis',
  'https://indianyug.com/2024/12/27/technology-startup-funding',
  'https://indianyug.com/2024/12/27/sports-injury-updates',
  'https://indianyug.com/2024/12/27/entertainment-award-shows',
  'https://indianyug.com/2024/12/27/health-mental-wellness',
  'https://indianyug.com/2024/12/27/lifestyle-cooking-trends',
  'https://indianyug.com/2024/12/27/world-trade-developments',
  'https://indianyug.com/2024/12/27/india-local-news',
  'https://indianyug.com/2024/12/26/politics-cabinet-decisions',
  'https://indianyug.com/2024/12/26/business-earnings-reports',
  'https://indianyug.com/2024/12/26/technology-product-launches',
  'https://indianyug.com/2024/12/26/sports-training-camps',
  'https://indianyug.com/2024/12/26/entertainment-streaming-releases',
  'https://indianyug.com/2024/12/26/health-medical-research',
  'https://indianyug.com/2024/12/26/lifestyle-parenting-tips',
  'https://indianyug.com/2024/12/26/world-climate-summit',
  'https://indianyug.com/2024/12/26/india-crime-news',
  'https://indianyug.com/2024/12/25/politics-election-results',
  'https://indianyug.com/2024/12/25/business-merger-acquisitions',
  'https://indianyug.com/2024/12/25/technology-data-breach-alerts',
  'https://indianyug.com/2024/12/25/sports-championship-results',
  'https://indianyug.com/2024/12/25/entertainment-festival-specials',
  'https://indianyug.com/2024/12/25/health-holiday-wellness',
  'https://indianyug.com/2024/12/25/lifestyle-gift-ideas',
  'https://indianyug.com/2024/12/25/world-peace-initiatives',
  'https://indianyug.com/2024/12/25/india-festival-news',
  'https://indianyug.com/2024/12/24/politics-ministerial-reshuffle',
  'https://indianyug.com/2024/12/24/business-budget-preparations',
  'https://indianyug.com/2024/12/24/technology-gadget-reviews',
  'https://indianyug.com/2024/12/24/sports-offseason-updates',
  'https://indianyug.com/2024/12/24/entertainment-year-end-lists',
  'https://indianyug.com/2024/12/24/health-winter-care-tips',
  'https://indianyug.com/2024/12/24/lifestyle-new-year-plans',
  'https://indianyug.com/2024/12/24/world-economic-forecasts',
  'https://indianyug.com/2024/12/24/india-weather-updates',
  'https://indianyug.com/2024/12/23/politics-opposition-protests',
  'https://indianyug.com/2024/12/23/business-policy-changes',
  'https://indianyug.com/2024/12/23/technology-social-media-trends',
  'https://indianyug.com/2024/12/23/sports-recruitment-news',
  'https://indianyug.com/2024/12/23/entertainment-celebrity-interviews',
  'https://indianyug.com/2024/12/23/health-vaccination-drives',
  'https://indianyug.com/2024/12/23/lifestyle-work-life-balance',
  'https://indianyug.com/2024/12/23/world-humanitarian-crisis',
  'https://indianyug.com/2024/12/23/india-education-news',
  'https://indianyug.com/2024/12/22/politics-public-rallies',
  'https://indianyug.com/2024/12/22/business-trade-agreements',
  'https://indianyug.com/2024/12/22/technology-ai-regulations',
  'https://indianyug.com/2024/12/22/sports-coaching-changes',
  'https://indianyug.com/2024/12/22/entertainment-box-office-collections',
  'https://indianyug.com/2024/12/22/health-disease-outbreaks',
  'https://indianyug.com/2024/12/22/lifestyle-fitness-challenges',
  'https://indianyug.com/2024/12/22/world-technology-summit',
  'https://indianyug.com/2024/12/22/india-agriculture-news',
  'https://indianyug.com/2024/12/21/politics-international-relations',
  'https://indianyug.com/2024/12/21/business-export-import-data',
  'https://indianyug.com/2024/12/21/technology-coding-bootcamps',
  'https://indianyug.com/2024/12/21/sports-youth-development',
  'https://indianyug.com/2024/12/21/entertainment-music-concerts',
  'https://indianyug.com/2024/12/21/health-nutrition-awareness',
  'https://indianyug.com/2024/12/21/lifestyle-art-culture',
  'https://indianyug.com/2024/12/21/world-environment-summit',
  'https://indianyug.com/2024/12/21/india-rural-development'
];

// Results storage
const results = {
  sitemaps: {},
  urls: {},
  summary: {
    total: ALL_URLS.length,
    accessible: 0,
    errors: 0,
    warnings: 0
  }
};

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

// Helper function to check sitemap
async function checkSitemap(url) {
  console.log(`Checking sitemap: ${url}`);
  const result = await checkUrl(url);
  
  results.sitemaps[url] = result;
  
  if (result.accessible) {
    console.log(`✅ ${url} - OK (${result.responseTime}ms)`);
    
    // Check if it's actually XML
    if (!result.contentType.includes('xml') && !result.contentType.includes('text/xml')) {
      console.log(`⚠️  ${url} - Content-Type warning: ${result.contentType}`);
      results.summary.warnings++;
    }
  } else {
    console.log(`❌ ${url} - ERROR: ${result.error || `Status ${result.status}`}`);
    results.summary.errors++;
  }
}

// Helper function to validate all URLs
async function validateAllUrls() {
  console.log(`\nValidating ${ALL_URLS.length} URLs...\n`);
  
  const batchSize = 10;
  const batches = [];
  
  for (let i = 0; i < ALL_URLS.length; i += batchSize) {
    batches.push(ALL_URLS.slice(i, i + batchSize));
  }
  
  let processed = 0;
  
  for (const batch of batches) {
    const batchResults = await Promise.all(batch.map(url => checkUrl(url)));
    
    batchResults.forEach(result => {
      results.urls[result.url] = result;
      
      if (result.accessible) {
        results.summary.accessible++;
        console.log(`✅ ${result.url} - OK (${result.responseTime}ms)`);
      } else {
        results.summary.errors++;
        console.log(`❌ ${result.url} - ERROR: ${result.error || `Status ${result.status}`}`);
      }
      
      processed++;
      if (processed % 20 === 0) {
        console.log(`Progress: ${processed}/${ALL_URLS.length} URLs checked`);
      }
    });
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Generate report
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: results.summary,
    sitemaps: results.sitemaps,
    failedUrls: Object.values(results.urls).filter(url => !url.accessible),
    warnings: Object.values(results.sitemaps).filter(sitemap => 
      sitemap.accessible && !sitemap.contentType.includes('xml')
    )
  };
  
  const reportPath = path.join(__dirname, '..', 'sitemap-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n📊 Validation Report Generated: ${reportPath}`);
  console.log(`📈 Summary:`);
  console.log(`   Total URLs: ${report.summary.total}`);
  console.log(`   Accessible: ${report.summary.accessible}`);
  console.log(`   Errors: ${report.summary.errors}`);
  console.log(`   Warnings: ${report.summary.warnings}`);
  
  if (report.failedUrls.length > 0) {
    console.log(`\n❌ Failed URLs:`);
    report.failedUrls.forEach(url => {
      console.log(`   ${url.url} - ${url.error || `Status ${url.status}`}`);
    });
  }
  
  if (report.warnings.length > 0) {
    console.log(`\n⚠️  Content-Type Warnings:`);
    report.warnings.forEach(sitemap => {
      console.log(`   ${sitemap.url} - Content-Type: ${sitemap.contentType}`);
    });
  }
}

// Main execution
async function main() {
  console.log('🔍 Starting Sitemap Validation...\n');
  
  // Check sitemap files
  for (const sitemapUrl of SITEMAP_URLS) {
    await checkSitemap(sitemapUrl);
  }
  
  // Validate all URLs
  await validateAllUrls();
  
  // Generate report
  generateReport();
  
  console.log('\n✅ Validation Complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { checkUrl, validateAllUrls, generateReport };
