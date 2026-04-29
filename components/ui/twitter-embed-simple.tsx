'use client';

import { useEffect, useState } from 'react';

interface TwitterEmbedSimpleProps {
  tweetId: string;
}

export function TwitterEmbedSimple({ tweetId }: TwitterEmbedSimpleProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Small delay to ensure consistent rendering
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="flex justify-center my-4">
        <div className="w-full max-w-md h-32 bg-gray-800 rounded-lg animate-pulse" />
      </div>
    );
  }

  const embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark&dnt=true&chrome=nofooter&hide_thread=true`;
  
  return (
    <div className="flex justify-center my-4">
      {isMounted ? (
        <div className="relative">
          <iframe
            src={embedUrl}
            width="550"
            height="400"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            allowFullScreen={true}
            className="max-w-full rounded-lg"
            style={{ 
              minHeight: '400px',
              backgroundColor: '#15202b', // Twitter dark background
            }}
            title={`Twitter embed for tweet ${tweetId}`}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full max-w-md h-32 bg-gray-800 rounded-lg animate-pulse" />
      )}
    </div>
  );
}
