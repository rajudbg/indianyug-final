/** @type {import('next-sitemap').IConfig} */
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to fetch all posts for the sitemap with pagination
const fetchPosts = async () => {
  try {
    let allPosts = [];
    let page = 1;
    const perPage = 100; // Maximum allowed by WordPress API
    
    while (true) {
      const res = await fetch(`https://cms.indianyug.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_fields=slug,modified_gmt,date_gmt,title`);
      
      if (!res.ok) {
        if (res.status === 400) {
          // No more pages available
          break;
        }
        throw new Error(`Failed to fetch posts, status: ${res.status}`);
      }
      
      const posts = await res.json();
      
      if (posts.length === 0) {
        // No more posts
        break;
      }
      
      allPosts = allPosts.concat(posts);
      console.log(`Fetched ${posts.length} posts from page ${page}, total: ${allPosts.length}`);
      
      // Check if there are more pages
      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
      if (page >= totalPages) {
        break;
      }
      
      page++;
    }
    
    console.log(`✅ Successfully fetched ${allPosts.length} total posts`);
    return allPosts;
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }
};

// Generate news sitemap manually
const generateNewsSitemap = async () => {
  const posts = await fetchPosts();
  
  if (posts.length === 0) {
    console.warn('No posts found for news sitemap');
    return;
  }

  const newsSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${posts.map(post => `  <url>
    <loc>https://indianyug.com/${post.slug}</loc>
    <lastmod>${new Date(post.modified_gmt).toISOString()}</lastmod>
    <news:news>
      <news:publication>
        <news:name>IndianYug</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date_gmt).toISOString()}</news:publication_date>
      <news:title>${post.title.rendered.replace(/[<>&'"]/g, (match) => {
        const escapeMap = { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' };
        return escapeMap[match];
      })}</news:title>
    </news:news>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  const newsSitemapPath = path.join(publicDir, 'news.xml');
  
  fs.writeFileSync(newsSitemapPath, newsSitemapContent);
  console.log(`✅ News sitemap generated: ${newsSitemapPath}`);
};

// Generate main sitemap with posts
const generateMainSitemap = async () => {
  const posts = await fetchPosts();
  
  if (posts.length === 0) {
    console.warn('No posts found for main sitemap');
    return;
  }

  const mainSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://indianyug.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://indianyug.com/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://indianyug.com/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://indianyug.com/privacy-policy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://indianyug.com/terms-of-service</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://indianyug.com/disclaimer</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
${posts.map(post => `  <url>
    <loc>https://indianyug.com/${post.slug}</loc>
    <lastmod>${new Date(post.modified_gmt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  const mainSitemapPath = path.join(publicDir, 'sitemap-0.xml');
  
  fs.writeFileSync(mainSitemapPath, mainSitemapContent);
  console.log(`✅ Main sitemap generated: ${mainSitemapPath}`);
};

export default {
  siteUrl: 'https://indianyug.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://indianyug.com/sitemap.xml',
      'https://indianyug.com/news.xml',
    ],
  },
  // Generate additional sitemaps
  additionalSitemaps: async (config) => {
    await generateNewsSitemap();
    await generateMainSitemap();
    
    return [{
      loc: 'https://indianyug.com/news.xml',
      lastmod: new Date().toISOString(),
    }];
  },
};
