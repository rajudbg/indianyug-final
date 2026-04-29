'use client'

import React, { useEffect, useState } from 'react'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

interface NativeAdProps {
  className?: string
  label?: string
  style?: 'card' | 'inline' | 'minimal'
}

export function NativeAd({ 
  className = '', 
  label = 'Sponsored Content',
  style = 'card'
}: NativeAdProps) {
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle && window.adsbygoogle.loaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
          setAdLoaded(true)
          console.log('NativeAd: AdSense initialized successfully')
        } else {
          console.warn('NativeAd: AdSense script not loaded yet')
        }
      } catch (err) {
        console.error('NativeAd: AdSense error:', err)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const styleClasses = {
    card: 'bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6',
    inline: 'bg-gray-50 dark:bg-gray-800 rounded-xl border-l-4 border-primary-500 p-5',
    minimal: 'border-t border-b border-gray-200 dark:border-gray-700 py-6'
  }

  return (
    <div className={`my-8 ${className}`}>
      {/* Native ad label with icon */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 px-4 py-2 rounded-full">
          <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-primary-600 dark:text-primary-400 uppercase tracking-wider font-semibold">
            {label}
          </span>
        </div>
      </div>
      
      {/* Native ad container */}
      <div className={styleClasses[style]}>
        {!adLoaded && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-500 dark:text-primary-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading sponsored content</p>
            </div>
          </div>
        )}
        
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '100%',
            minHeight: '200px'
          }}
          data-ad-client="ca-pub-9432969048505333"
          data-ad-slot="5576831162"
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
