# WordPress Posts Synchronization Guide

This guide explains how to ensure all posts from your WordPress website are properly fetched and displayed on your IndianYug frontend.

## Problem
By default, the WordPress REST API returns only a limited number of posts per request (typically 10). This means that not all posts from your original website may be visible on the IndianYug frontend.

## Solutions Implemented

### 1. Increased Default Limits
- **Homepage**: Now fetches 50 posts instead of 12
- **Category pages**: Now show 24 posts per page instead of 12
- **Default API limit**: Increased from 10 to 50 posts per request

### 2. New API Methods
Added to `lib/wordpress.ts`:

#### `getAllPosts()`
Fetches ALL posts from WordPress by automatically paginating through all pages:
```typescript
const allPosts = await wordpressApi.getAllPosts()
```

#### `getAllPostsByCategory()`
Fetches ALL posts from a specific category:
```typescript
const allCategoryPosts = await wordpressApi.getAllPostsByCategory(categoryId)
```

### 3. Admin Sync Tool
A new admin interface at `/admin/sync` allows you to:
- Check WordPress site statistics
- Sync all posts or posts from specific categories
- Monitor the sync process

## How to Use

### Option 1: Automatic (Recommended)
The site now automatically fetches more posts with the increased limits. Most users will see significantly more content without any action needed.

### Option 2: Manual Sync via Admin Panel
1. Set up the admin secret key in your environment:
   ```bash
   # Add to .env.local
   ADMIN_SECRET_KEY=your-secret-key-here
   ```

2. Visit `/admin/sync` on your website

3. Enter your admin secret key

4. Click "Fetch Stats" to see how many posts are available

5. Use "Sync Posts" to fetch all posts or posts from specific categories

### Option 3: Programmatic Sync
You can also use the new API methods in your code:

```typescript
// Get all posts
const allPosts = await wordpressApi.getAllPosts()

// Get all posts from a specific category
const categoryPosts = await wordpressApi.getAllPostsByCategory(categoryId)

// Get posts with specific filters
const filteredPosts = await wordpressApi.getAllPosts({
  status: 'publish',
  after: '2023-01-01T00:00:00'
})
```

## API Endpoints

### GET `/api/admin/sync-posts`
Get statistics about available posts
- **Headers**: `Authorization: Bearer <ADMIN_SECRET_KEY>`
- **Query params**: 
  - `category`: Category slug (optional)
  - `limit`: Maximum number of posts to return (optional)

### POST `/api/admin/sync-posts`
Sync posts from WordPress
- **Headers**: 
  - `Authorization: Bearer <ADMIN_SECRET_KEY>`
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "category": "technology", // optional
    "limit": 1000 // optional
  }
  ```

## Performance Considerations

### Rate Limiting
The `getAllPosts()` method includes a 100ms delay between requests to avoid overwhelming the WordPress API.

### Memory Usage
Fetching all posts at once may use significant memory for sites with thousands of posts. Consider using the `limit` parameter for large sites.

### Caching
Consider implementing caching for the synced posts to avoid repeated API calls:
- Use Next.js built-in caching
- Implement Redis caching
- Store frequently accessed posts in a database

## Troubleshooting

### "Not all posts showing"
1. Check if your WordPress site has pagination limits
2. Verify the WordPress REST API is enabled and accessible
3. Use the admin sync tool to see exact post counts
4. Check for any API rate limiting on your WordPress host

### "Sync taking too long"
1. Use the `limit` parameter to sync posts in batches
2. Sync by category instead of all posts at once
3. Consider running sync as a background job

### "Memory issues"
1. Reduce the `per_page` parameter in `getAllPosts()`
2. Process posts in smaller batches
3. Implement streaming/chunked processing

## WordPress Configuration

Ensure your WordPress site has:
1. **REST API enabled** (default in modern WordPress)
2. **Proper CORS headers** if hosted on different domain
3. **Adequate hosting resources** to handle API requests
4. **No aggressive rate limiting** on REST API endpoints

## Monitoring

The admin panel provides:
- Total post count from WordPress
- Number of categories
- Sync progress and results
- Error reporting and debugging information

For production sites, consider implementing:
- Automated sync schedules
- Sync monitoring and alerting
- Performance metrics tracking
- Failed sync retry mechanisms
