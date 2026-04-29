import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations for Cloudflare Pages
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },
  // Cloudflare Pages optimizations
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization for Cloudflare Pages
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.indianyug.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'indianyug.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: 'https://cms.indianyug.com/wp-content/uploads/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://platform.twitter.com; media-src 'self' https://platform.twitter.com https://*.twimg.com;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
