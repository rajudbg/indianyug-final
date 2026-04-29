'use client'

import Script from 'next/script'

interface CloudflareAnalyticsProps {
  beaconToken?: string
  enabled?: boolean
}

export function CloudflareAnalytics({ 
  beaconToken = process.env.NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN,
  enabled = true 
}: CloudflareAnalyticsProps) {
  if (!enabled || !beaconToken) {
    return null
  }

  return (
    <>
      {/* Cloudflare Web Analytics */}
      <Script
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={`{"token": "${beaconToken}"}`}
        strategy="afterInteractive"
      />
      
      {/* Alternative: Self-hosted analytics script */}
      <Script id="cloudflare-analytics" strategy="afterInteractive">
        {`
          // Cloudflare Analytics - Lightweight tracking
          (function() {
            // Only track if user hasn't opted out
            if (localStorage.getItem('analytics-opt-out') === 'true') return;
            
            // Send pageview to Cloudflare
            if (typeof window !== 'undefined' && window.navigator) {
              const data = {
                type: 'pageview',
                url: window.location.href,
                title: document.title,
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                timestamp: Date.now()
              };
              
              // Send to Cloudflare Analytics
              fetch('https://cloudflareinsights.com/beacon', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
              }).catch(() => {
                // Silent fail - analytics shouldn't break the site
              });
            }
          })();
        `}
      </Script>
    </>
  )
}

// Hook for custom analytics events
export function useCloudflareAnalytics() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window === 'undefined') return;
    
    // Only track if user hasn't opted out
    if (localStorage.getItem('analytics-opt-out') === 'true') return;
    
    const data = {
      type: 'event',
      name: eventName,
      properties,
      timestamp: Date.now()
    };
    
    // Send to Cloudflare Analytics
    fetch('https://cloudflareinsights.com/beacon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).catch(() => {
      // Silent fail
    });
  };
  
  return { trackEvent };
} 