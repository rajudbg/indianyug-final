# Cloudflare Pages Deployment Guide

## ✅ Current Configuration

Your project is now properly configured for Cloudflare Pages with SSR:

### 1. wrangler.toml ✅
```toml
name = "indianyug-frontend"
compatibility_date = "2025-08-04"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

### 2. package.json ✅
- `@cloudflare/next-on-pages` dependency installed
- `pages:build` script configured
- `pages:deploy` script available

### 3. next.config.js ✅
- No output configuration (enables SSR)
- Edge runtime enabled
- Image optimization configured

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Connect to GitHub** in Cloudflare Pages dashboard
2. **Set Build Configuration:**
   - **Build command:** `npm run pages:build`
   - **Output directory:** `.vercel/output/static`
   - **Node.js version:** 18 (or higher)

3. **Environment Variables** (if needed):
   - `WORDPRESS_API_URL`: `https://cms.indianyug.com/wp-json/wp/v2`

### Option 2: Manual Deployment

```bash
# Build the project
npm run pages:build

# Deploy to Cloudflare Pages
npm run pages:deploy
```

## 🔍 Verification Steps

After deployment, verify SSR is working:

1. **Check Dynamic Routes:**
   - Visit a blog post page (e.g., `/posts/[slug]`)
   - Should show server-rendered content, not blank page

2. **Check Network Tab:**
   - Should see server-side rendered HTML
   - No client-side hydration errors

3. **Check Console:**
   - No SSR-related errors
   - Proper hydration messages

## 🛠️ Troubleshooting

### If Build Fails:

1. **Check Build Output:**
   ```bash
   npm run pages:build
   ls -la .vercel/output/static
   ```

2. **Verify Configuration:**
   - Ensure no `output` field in `next.config.js`
   - Check `pages_build_output_dir` in `wrangler.toml`
   - Verify `compatibility_date` is current

3. **Check Cloudflare Pages Settings:**
   - Build command: `npm run pages:build`
   - Output directory: `.vercel/output/static`

### Common Issues:

- **"Build output directory not found":** Make sure build command runs first
- **Blank pages:** Usually means static export is enabled
- **Build failures:** Check Node.js version compatibility
- **Runtime errors:** Verify edge runtime configuration

## 📝 Notes

- Your site will be deployed to: `https://indianyug-frontend.pages.dev`
- Custom domain can be configured in Cloudflare Pages dashboard
- Automatic deployments on git push (if connected to GitHub)
- Edge functions will handle SSR at Cloudflare's edge network

## 🔄 Redeployment

To force a redeploy:
1. Push changes to GitHub (if auto-deploy enabled)
2. Or manually trigger in Cloudflare Pages dashboard
3. Or run: `npm run pages:deploy`

## ✅ Final Configuration Checklist

- [x] `wrangler.toml` includes `pages_build_output_dir`
- [x] `wrangler.toml` includes `compatibility_flags = ["nodejs_compat"]`
- [x] `wrangler.toml` has current `compatibility_date`
- [x] `next.config.js` has no `output` configuration
- [x] Cloudflare Pages dashboard build settings configured
- [x] `@cloudflare/next-on-pages` dependency installed 