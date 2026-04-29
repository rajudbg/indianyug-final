'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AdUnit } from './ad-unit';
import { NativeAd } from './native-ad';

interface AdInjectorProps {
  content: string;
  adType?: 'standard' | 'native' | 'mixed';
  interval?: number;
  maxAds?: number;
}

const adSlots = ["5576831162", "5576831162", "5576831162", "5576831162", "5576831162", "5576831162"];

export function AdInjector({ 
  content, 
  adType = 'mixed',
  interval = 5,
  maxAds = 6 
}: AdInjectorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { processedContent, adPlaceholders } = useMemo(() => {
    if (!isMounted) {
      return { processedContent: content, adPlaceholders: [] };
    }

    // Filter to only include actual paragraph tags
    const paragraphs = content.split('</p>');
    let adCount = 0;
    const placeholders: { id: string, adType: 'native' | 'standard', index: number }[] = [];

    const newContent = paragraphs.reduce((acc, p, i) => {
      acc.push(p);
      if (i < paragraphs.length - 1) {
        acc.push('</p>');
      }

      // Place ads after 5th, 10th, 15th, etc. paragraphs
      const paragraphNumber = i + 1;
      if (p.includes('<p>') && adCount < maxAds && paragraphNumber % interval === 0 && paragraphNumber >= 5) {
        const id = `ad-placeholder-${adCount}`;
        const useNativeAd = adType === 'native' || (adType === 'mixed' && adCount % 2 !== 0);
        placeholders.push({ id, adType: useNativeAd ? 'native' : 'standard', index: adCount });
        acc.push(`<div id="${id}" class="ad-injection-point" data-ad-index="${adCount}"></div>`);
        adCount++;
      }
      return acc;
    }, [] as string[]).join('');

    return { processedContent: newContent, adPlaceholders: placeholders };
  }, [isMounted, content, adType, interval, maxAds]);

  // Use a more reliable approach than createPortal
  useEffect(() => {
    if (!isMounted) return;

    const injectAds = () => {
      const adPoints = document.querySelectorAll('.ad-injection-point');
      
      adPoints.forEach((point, index) => {
        if (point.children.length === 0) { // Only inject if not already injected
          const adIndex = parseInt(point.getAttribute('data-ad-index') || '0');
          const adSlot = adSlots[adIndex % adSlots.length];
          
          const adContainer = document.createElement('div');
          adContainer.className = 'my-8 text-center';
          
          const label = document.createElement('span');
          label.className = 'text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full';
          label.textContent = 'Advertisement';
          
          const adElement = document.createElement('ins');
          adElement.className = 'adsbygoogle';
          adElement.style.display = 'block';
          adElement.style.width = '100%';
          adElement.style.minHeight = '250px';
          adElement.setAttribute('data-ad-client', 'ca-pub-9432969048505333');
          adElement.setAttribute('data-ad-slot', adSlot);
          adElement.setAttribute('data-ad-format', 'auto');
          adElement.setAttribute('data-full-width-responsive', 'true');
          
          adContainer.appendChild(label);
          adContainer.appendChild(document.createElement('br'));
          adContainer.appendChild(adElement);
          
          point.appendChild(adContainer);
          
          // Push the ad to AdSense
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.error('AdSense injection error:', err);
          }
        }
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(injectAds, 100);
    
    return () => {
      clearTimeout(timeoutId);
      // Cleanup any injected ads
      const adPoints = document.querySelectorAll('.ad-injection-point');
      adPoints.forEach((point) => {
        try {
          while (point.firstChild) {
            point.removeChild(point.firstChild);
          }
        } catch (error) {
          console.warn('Could not cleanup ad injection point:', error);
        }
      });
    };
  }, [isMounted, adPlaceholders]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </div>
  );
}
