'use client'

import React, { useEffect, useRef } from 'react'
import adSenseManager from '@/lib/adsense-manager'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

interface AdUnitProps {
  className?: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  label?: string
  slot: string
}

export function AdUnit({ 
  className = '', 
  format = 'auto',
  responsive = true,
  label = 'Advertisement',
  slot
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current) {
      adSenseManager.initializeAd(adRef.current);
    }
  }, [])

  return (
    <div className={`my-8 text-center ${className}`}>
      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
        {label}
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '250px' }}
        data-ad-client="ca-pub-9432969048505333"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}
