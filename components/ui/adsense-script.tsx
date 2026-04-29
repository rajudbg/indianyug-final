'use client'

import Script from 'next/script'

export function AdSenseScript() {
  return (
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9432969048505333"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      onLoad={() => {
        console.log('AdSense script loaded successfully');
      }}
      onError={(e) => {
        console.error('AdSense script failed to load:', e);
      }}
    />
  )
}
