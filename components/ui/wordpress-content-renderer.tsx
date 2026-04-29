'use client';

import React, { useEffect, useState, useMemo } from 'react';
import parse, { domToReact, HTMLReactParserOptions, DOMNode, Element as ParserElement } from 'html-react-parser';

interface WordPressContentRendererProps {
  content: string;
  adType?: 'standard' | 'native' | 'mixed';
  interval?: number;
  maxAds?: number;
}

const adSlots = [
  '5576831162',
  '5576831162',
  '5576831162',
  '5576831162',
  '5576831162',
  '5576831162',
];

export default function WordPressContentRenderer({ 
  content, 
  adType = 'standard', 
  interval = 5, 
  maxAds = 6 
}: WordPressContentRendererProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { processedContent, adPlaceholders } = useMemo(() => {
    if (!isMounted) {
      return { processedContent: content, adPlaceholders: [] };
    }

    // Preprocess content to convert Twitter URLs to embedded tweets
    let processedContent = content;
    // Match anchor tags containing Twitter URLs to remove the entire anchor and replace with embed
    // Improved regex to handle various attribute orders and content within anchors
    const twitterAnchorRegex = /<a\s+(?:[^>]*?\s+)?href="(https?:\/\/twitter\.com\/\w+\/status\/\d+[^"]*)"[^>]*>(.*?)<\/a>/gi;
    const matches = processedContent.match(twitterAnchorRegex);
    
    console.log('Found Twitter anchor tags:', matches ? matches.length : 0);
    
    if (matches && matches.length > 0) {
      // Replace entire anchor tags with Twitter embed blocks
      processedContent = processedContent.replace(twitterAnchorRegex, (match, url, anchorText) => {
        // Extract just the tweet ID from the URL
        const tweetIdMatch = url.match(/\/status\/(\d+)/);
        const tweetId = tweetIdMatch ? tweetIdMatch[1] : '';
        console.log('Converting anchor to embed:', match, 'Tweet ID:', tweetId, 'Anchor text:', anchorText);
        return `<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/x/status/${tweetId}"></a></blockquote>`;
      });
    }
    
    // Also handle standalone Twitter URLs not in anchor tags
    const twitterUrlRegex = /https?:\/\/twitter\.com\/\w+\/status\/(\d+)(\?[^"'\s<>]*)?/g;
    const urlMatches = processedContent.match(twitterUrlRegex);
    
    console.log('Found standalone Twitter URLs:', urlMatches ? urlMatches.length : 0);
    
    if (urlMatches && urlMatches.length > 0) {
      processedContent = processedContent.replace(twitterUrlRegex, (match) => {
        const tweetIdMatch = match.match(/\/status\/(\d+)/);
        const tweetId = tweetIdMatch ? tweetIdMatch[1] : '';
        console.log('Converting URL to embed:', match, 'Tweet ID:', tweetId);
        return `<blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/x/status/${tweetId}"></a></blockquote>`;
      });
    }

    // Filter to only include actual paragraph tags
    const paragraphs = processedContent.split('</p>');
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

  // Inject AdSense ads
  useEffect(() => {
    if (!isMounted) return;

    const injectAds = () => {
      const adPoints = document.querySelectorAll('.ad-injection-point');
      
      adPoints.forEach((point, index) => {
        // Check if this ad point has already been processed
        if (point.children.length === 0 && !point.getAttribute('data-ad-injected')) {
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
          
          // Mark this ad point as injected
          point.setAttribute('data-ad-injected', 'true');
          
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

  useEffect(() => {
    // Twitter
    const twitterScript = document.querySelector('script[src*="platform.twitter.com/widgets.js"]');
    if (!twitterScript) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    }

    // Facebook
    const facebookScript = document.querySelector('script[src*="connect.facebook.net"]');
    if (!facebookScript) {
      const script = document.createElement('script');
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    } else if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [processedContent]);

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof ParserElement && domNode.name === 'iframe') {
        const src = domNode.attribs.src;
        if (src && (src.includes('youtube.com') || src.includes('youtu.be'))) {
          return (
            <div className="aspect-w-16 aspect-h-9">
              <iframe {...domNode.attribs} className="w-full h-full" />
            </div>
          );
        }
      }
      return domNode;
    },
  };

  if (!isMounted) {
    return (
      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-strong:text-neutral-800 dark:prose-strong:text-neutral-100 prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-900/20 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800 prose-img:rounded-lg prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: processedContent }}
        suppressHydrationWarning
      />
    );
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-strong:text-neutral-800 dark:prose-strong:text-neutral-100 prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-900/20 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800 prose-img:rounded-lg prose-img:shadow-lg">
      {parse(processedContent, options)}
    </div>
  );
}
declare global {
  interface Window {
    twttr?: any;
    FB?: any;
  }
}
