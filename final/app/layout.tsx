import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getCategories } from '@/lib/wordpress'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indianyug.com'

export const metadata: Metadata = {
  title: {
    default: 'IndianYug – Bridging Tradition with Innovation',
    template: '%s | IndianYug',
  },
  description: 'Bridging Worlds, Sharing Stories. Explore a world of diverse perspectives and global insights at IndianYug.',
  keywords: ['India', 'culture', 'news', 'lifestyle', 'technology', 'business', 'IndianYug'],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    siteName: 'IndianYug',
    locale: 'en_IN',
    url: siteUrl,
    images: [{ url: `${siteUrl}/og-default.jpg`, width: 1200, height: 630, alt: 'IndianYug' }],
  },
  twitter: { card: 'summary_large_image', site: '@indianyug' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const gaId = process.env.NEXT_PUBLIC_GA_ID
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://cms.indianyug.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-gray-950`}>
        <ThemeProvider>
          <Navbar categories={categories} />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer categories={categories} />
        </ThemeProvider>

        {/* Google Analytics — loaded after interaction for better Core Web Vitals */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname})`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
