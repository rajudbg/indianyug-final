/**
 * Utility functions for image optimization and Vercel usage reduction
 */

/**
 * Check if an image URL is from a service that already optimizes images
 */
export function isAlreadyOptimized(url: string): boolean {
  const optimizedDomains = [
    'secure.gravatar.com',
    'gravatar.com',
    '0.gravatar.com',
    '1.gravatar.com',
    '2.gravatar.com',
    'cms.indianyug.com', // Your WordPress site might already optimize images
  ];
  
  try {
    const urlObj = new URL(url);
    return optimizedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}

/**
 * Check if an image URL contains optimization parameters
 */
export function hasOptimizationParams(url: string): boolean {
  const optimizationParams = [
    'w=', 'h=', 'crop=', 'fit=', 'fm=', 'q=',
    'auto=', 'format=', 'quality=', 'width=', 'height='
  ];
  
  return optimizationParams.some(param => url.includes(param));
}

/**
 * Determine if an image should bypass Next.js optimization
 */
export function shouldBypassOptimization(url: string): boolean {
  return isAlreadyOptimized(url) || hasOptimizationParams(url);
}

/**
 * Get optimal image size based on container size
 */
export function getOptimalImageSize(containerWidth: number, containerHeight: number): {
  width: number;
  height: number;
} {
  // Common breakpoints for responsive images
  const breakpoints = [640, 768, 1024, 1280];
  
  // Find the closest breakpoint that's larger than container width
  const optimalWidth = breakpoints.find(bp => bp >= containerWidth) || containerWidth;
  
  // Maintain aspect ratio
  const aspectRatio = containerWidth / containerHeight;
  const optimalHeight = Math.round(optimalWidth / aspectRatio);
  
  return {
    width: optimalWidth,
    height: optimalHeight
  };
} 