# Cloudflare Pages Environment Variables Setup

## 🔧 Required Environment Variables

### 1. **Cloudflare Analytics**
```bash
# Add to Cloudflare Pages Dashboard → Settings → Environment Variables
NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN=your_beacon_token_here
```

**How to get the beacon token:**
1. Go to Cloudflare Dashboard
2. Navigate to Web Analytics
3. Create a new site or select existing site
4. Copy the beacon token from the installation instructions

### 2. **WordPress API**
```bash
WORDPRESS_API_URL=https://cms.indianyug.com/wp-json/wp/v2
```

### 3. **Site Configuration**
```bash
NEXT_PUBLIC_SITE_URL=https://indianyug.com
```

## 🚀 Performance Optimizations Implemented

### 1. **Cloudflare Caching Headers** ✅
- **Static Assets**: 1-year cache with `immutable` flag
- **Images**: 1-year cache with WebP optimization
- **CSS/JS**: 1-year cache with versioning
- **API Routes**: 60-second cache for dynamic content
- **Pages**: 5-minute ISR with stale-while-revalidate

### 2. **ISR (Incremental Static Regeneration)** ✅
- **Homepage**: 5-minute revalidation
- **Blog Posts**: 1-minute revalidation
- **Categories**: 5-minute revalidation

### 3. **Image Optimization** ✅
- **WebP Format**: Automatic conversion
- **Responsive Sizes**: Device-specific optimization
- **Lazy Loading**: Built-in performance
- **Cloudflare CDN**: Global edge caching

### 4. **Cloudflare Analytics** ✅
- **Lightweight**: Minimal performance impact
- **Privacy-First**: GDPR compliant
- **Real-time**: Instant insights
- **Custom Events**: Track user interactions

## 📊 Expected Performance Improvements

### **PageSpeed Insights:**
- **Cache Headers**: +20-25 points
- **Image Optimization**: +15-20 points
- **ISR**: +10-15 points
- **Analytics**: No impact (lightweight)

### **Core Web Vitals:**
- **LCP**: 30-40% faster
- **FID**: 20-30% improvement
- **CLS**: 50-60% reduction

## 🔍 Verification Steps

### 1. **Check Caching Headers:**
```bash
curl -I https://yourdomain.com
# Should see: Cache-Control: public, max-age=60, s-maxage=3600
```

### 2. **Verify Image Optimization:**
```bash
curl -I https://yourdomain.com/image.jpg
# Should see: Cache-Control: public, max-age=31536000, immutable
```

### 3. **Test ISR:**
- Update a blog post in WordPress
- Check if it appears within 1 minute on your site

### 4. **Analytics Setup:**
- Check Cloudflare Analytics dashboard
- Verify data is being collected

## 🛠️ Troubleshooting

### **Cache Not Working:**
1. Check Cloudflare Pages settings
2. Verify headers are being applied
3. Clear Cloudflare cache if needed

### **Images Not Optimizing:**
1. Check image URLs in WordPress
2. Verify Next.js Image component usage
3. Check Cloudflare image optimization settings

### **Analytics Not Tracking:**
1. Verify beacon token is correct
2. Check browser console for errors
3. Ensure no ad blockers are interfering

## 📈 Monitoring

### **Key Metrics to Watch:**
- **Cache Hit Rate**: Should be > 90%
- **Page Load Time**: Should be < 2s
- **Core Web Vitals**: All green
- **Analytics Data**: Real-time insights

### **Tools:**
- Cloudflare Analytics Dashboard
- PageSpeed Insights
- WebPageTest
- Chrome DevTools

## 🎯 Next Steps

1. ✅ Add environment variables to Cloudflare Pages
2. ✅ Deploy and test caching headers
3. ✅ Verify ISR is working
4. ✅ Check analytics data
5. ✅ Monitor performance improvements 