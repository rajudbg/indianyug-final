/**
 * Liquid Glass Global Initialization
 * This script automatically applies liquid glass enhancements to existing elements
 */

import LiquidGlassEnhancer from './liquid-glass';

// Initialize liquid glass effects when DOM is ready
export function initLiquidGlass() {
  if (typeof window === 'undefined') return;

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  function initialize() {
    // Apply enhancements to existing elements
    LiquidGlassEnhancer.enhanceExistingElements();
  }
}
