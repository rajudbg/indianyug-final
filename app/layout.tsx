import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer-simple'
import { FloatingElements } from '@/components/ui/floating-elements'
import { RippleEffect } from '@/components/ui/ripple-effect'
import { GoogleAnalytics } from '@/components/google-analytics'
import { AdSenseScript } from '@/components/ui/adsense-script'
import { PerformanceOptimizer } from '@/components/ui/performance-optimizer'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CloudflareAnalytics } from '@/components/ui/cloudflare-analytics'
import { WebVitals } from '@/components/ui/web-vitals'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: {
    default: 'IndianYug - Your Digital Destination',
    template: '%s | IndianYug'
  },
  description: 'Discover the latest trends, insights, and stories that matter. Your go-to source for digital content and Indian culture.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  keywords: ['IndianYug', 'blog', 'Indian culture', 'technology', 'lifestyle', 'news'],
  authors: [{ name: 'IndianYug Team' }],
  creator: 'IndianYug',
  publisher: 'IndianYug',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://indianyug.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'IndianYug - Your Digital Destination',
    description: 'Discover the latest trends, insights, and stories that matter.',
    siteName: 'IndianYug',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IndianYug',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IndianYug - Your Digital Destination',
    description: 'Discover the latest trends, insights, and stories that matter.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'X-UA-Compatible': 'IE=edge',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical resource hints for Cloudflare Pages */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//cms.indianyug.com" />
        <link rel="dns-prefetch" href="//secure.gravatar.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="preload" href="/og-image.jpg" as="image" type="image/jpeg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PerformanceOptimizer>
            <FloatingElements />
            <RippleEffect />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </PerformanceOptimizer>
        </ThemeProvider>
        <AdSenseScript />
        <GoogleAnalytics />
        <CloudflareAnalytics />
        <WebVitals />
        <SpeedInsights />
      </body>
    </html>
  )
}
