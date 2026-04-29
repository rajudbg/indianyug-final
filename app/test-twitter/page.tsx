import React from 'react';
import { TwitterEmbedSimple } from '@/components/ui/twitter-embed-simple';

export default function TestTwitterPage() {
  return (
    <div className="min-h-screen pt-20 p-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Twitter Embed Test Page</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Test Tweet (React Component)</h2>
          <TwitterEmbedSimple tweetId="20" />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Direct Iframe Test 1 (theme=dark)</h2>
          <div className="flex justify-center my-4">
            <iframe
              src="https://platform.twitter.com/embed/Tweet.html?id=20&theme=dark"
              width="550"
              height="400"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              allowFullScreen={true}
              className="max-w-full rounded-lg"
              style={{ minHeight: '400px' }}
              title="Twitter embed test"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Direct Iframe Test 2 (theme=dark&dnt=true)</h2>
          <div className="flex justify-center my-4">
            <iframe
              src="https://platform.twitter.com/embed/Tweet.html?id=20&theme=dark&dnt=true"
              width="550"
              height="400"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              allowFullScreen={true}
              className="max-w-full rounded-lg"
              style={{ minHeight: '400px' }}
              title="Twitter embed test"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Testing Instructions</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="mb-2 text-black dark:text-white"><strong>To test first page load:</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-black dark:text-white">
              <li>Open this page in a new incognito/private window</li>
              <li>Check if tweets load in dark mode</li>
              <li>Look at the debug info below each tweet</li>
              <li>Check browser console for any errors</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm text-black dark:text-white"><strong>Expected Results:</strong></p>
              <ul className="text-xs mt-1 space-y-1 text-black dark:text-white">
                <li>✓ All tweets should appear in dark mode</li>
                <li>✓ Debug info should show loading progress</li>
                <li>✓ No console errors</li>
                <li>✓ Iframes should load within 1-3 seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 