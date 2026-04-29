import fetch from 'node-fetch';

// Test the pagination logic directly
const testFetchPosts = async () => {
  try {
    let allPosts = [];
    let page = 1;
    const perPage = 100; // Maximum allowed by WordPress API
    
    console.log('Starting to fetch posts with pagination...');
    
    while (true) {
      const url = `https://cms.indianyug.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_fields=slug,modified_gmt,date_gmt,title`;
      console.log(`Fetching: ${url}`);
      
      const res = await fetch(url);
      
      if (!res.ok) {
        if (res.status === 400) {
          console.log(`No more pages available (status 400 at page ${page})`);
          break;
        }
        throw new Error(`Failed to fetch posts, status: ${res.status}`);
      }
      
      const posts = await res.json();
      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
      const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0');
      
      console.log(`Page ${page}: ${posts.length} posts (Total pages: ${totalPages}, Total posts: ${totalPosts})`);
      
      if (posts.length === 0) {
        console.log('No more posts found');
        break;
      }
      
      allPosts = allPosts.concat(posts);
      
      if (page >= totalPages) {
        console.log(`Reached last page (${totalPages})`);
        break;
      }
      
      page++;
      
      // Add a small delay to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`✅ Successfully fetched ${allPosts.length} total posts`);
    
    // Show some sample posts
    if (allPosts.length > 0) {
      console.log('\nSample posts:');
      console.log('First 3 posts:', allPosts.slice(0, 3).map(p => p.slug));
      console.log('Last 3 posts:', allPosts.slice(-3).map(p => p.slug));
    }
    
    return allPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Run the test
testFetchPosts();
