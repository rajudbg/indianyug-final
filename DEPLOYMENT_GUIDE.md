# Cloudflare Pages Deployment Guide - Next-on-Pages SSR

## Configuration Updated for SSR

The project is now configured for **next-on-pages SSR deployment** instead of static export. This provides full Next.js functionality including:
- ✅ Server-side rendering (SSR)
- ✅ API routes as edge functions
- ✅ Image optimization
- ✅ Dynamic routes
- ✅ Server components

## Files Updated

### 1. next.config.js
- ✅ Removed `output: 'export'`
- ✅ Enabled image optimization
- ✅ Added edge runtime support
- ✅ Restored server-side features

### 2. wrangler.toml
- ✅ Added build command for next-on-pages
- ✅ Added compatibility flags for Node.js
- ✅ Added KV namespace configuration (optional)

### 3. package.json
- ✅ Added @cloudflare/next-on-pages dependency
- ✅ Added wrangler dependency
- ✅ Added next-on-pages scripts

### 4. New Files
- ✅ `.node-version` - Specifies Node.js 18.17.0

## Installation Complete
All required packages have been installed:
- `@cloudflare/next-on-pages`
- `wrangler`

## Deployment Steps

### 1. Cloudflare Pages Dashboard Settings:
- **Build command**: `npm run pages:build`
- **Build output directory**: `.vercel/output/static`
- **Root directory**: `/`

### 2. Environment Variables:
Set these in Cloudflare Pages dashboard:
- `WORDPRESS_API_URL`
- Any other variables from your `.env` file

### 3. Optional KV Setup:
If you want to use KV storage:
1. Create a KV namespace in Cloudflare dashboard
2. Update `wrangler.toml` with your KV namespace IDs
3. Bind it as `KV` in your project

## Local Development

```bash
# Install dependencies (already done)
npm install

# Development with next-on-pages
npm run pages:dev

# Build for production
npm run pages:build

# Preview locally
npm run pages:preview

# Deploy to Cloudflare Pages
npm run pages:deploy
```

## API Routes
Your existing API routes (`/api/contact`, `/api/subscribe`) will now work as edge functions on Cloudflare Pages.

## Troubleshooting

If you encounter issues:
1. Ensure Node.js version is 18.17.0 or higher
2. Check that all environment variables are set
3. Verify KV namespace IDs if using KV storage
4. Check Cloudflare Pages logs for specific errors

## Build Process
1. `npm run pages:build` runs next-on-pages
2. Next.js builds with full SSR support
3. Output is optimized for Cloudflare's edge runtime
4. API routes are converted to edge functions
