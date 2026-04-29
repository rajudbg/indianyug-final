'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (
      event: string,
      action: string,
      params: { [key: string]: string | number | undefined }
    ) => void
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!gaId) {
      console.warn('Google Analytics ID is not set. Tracking is disabled.');
      return;
    }
    
    if (window.gtag) {
      console.log(`GA: Sending pageview for ${pathname}`);
      window.gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, gaId]);

  if (!gaId) {
    return null;
  }

  console.log(`GA: Initializing with Measurement ID: ${gaId}`);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
