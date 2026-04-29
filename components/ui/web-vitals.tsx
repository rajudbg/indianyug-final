'use client'

import { useEffect } from 'react'

export function WebVitals() {
  useEffect(() => {
    // Only run in production and when supported
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return
    }

    // Import web-vitals library dynamically to avoid bundle bloat
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Report Core Web Vitals to analytics
      const reportWebVital = (metric: any) => {
        // Send to Cloudflare Analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', metric.name, {
            custom_parameter_1: metric.value,
            custom_parameter_2: metric.id,
            custom_parameter_3: metric.name,
          })
        }

        // Console log in development for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log(`Web Vital: ${metric.name}`, metric)
        }
      }

      // Monitor all Core Web Vitals
      onCLS(reportWebVital)
      onINP(reportWebVital) // INP replaced FID in web-vitals v3
      onFCP(reportWebVital)
      onLCP(reportWebVital)
      onTTFB(reportWebVital)
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error)
    })
  }, [])

  return null
}
