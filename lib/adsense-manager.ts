declare global {
  interface Window {
    adsbygoogle: any;
    __adsenseInitialized?: boolean;
    __adsenseElements?: Set<string>;
  }
}

class AdSenseManager {
  private initialized = false;
  private initializedElements = new Set<string>();
  private pendingElements = new Map<string, HTMLElement>();

  constructor() {
    // Initialize global tracking
    if (typeof window !== 'undefined') {
      window.adsbygoogle = window.adsbygoogle || [];
      window.__adsenseInitialized = window.__adsenseInitialized || false;
      window.__adsenseElements = window.__adsenseElements || new Set();
    }
  }

  /**
   * Generate a unique identifier for an ad element
   */
  private generateElementId(element: HTMLElement): string {
    const rect = element.getBoundingClientRect();
    return `${element.tagName}-${Math.round(rect.top)}-${Math.round(rect.left)}-${element.getAttribute('data-ad-slot') || 'default'}`;
  }

  /**
   * Check if an element has already been initialized
   */
  private isElementInitialized(element: HTMLElement): boolean {
    const elementId = this.generateElementId(element);
    
    // Check if element has the AdSense status attribute
    if (element.getAttribute('data-adsbygoogle-status') !== null) {
      return true;
    }

    // Check our tracking sets
    if (window.__adsenseElements?.has(elementId)) {
      return true;
    }

    return this.initializedElements.has(elementId);
  }

  /**
   * Mark an element as initialized
   */
  private markElementInitialized(element: HTMLElement): void {
    const elementId = this.generateElementId(element);
    this.initializedElements.add(elementId);
    window.__adsenseElements?.add(elementId);
  }

  /**
   * Initialize a single ad element with duplicate prevention
   */
  public initializeAd(element: HTMLElement): boolean {
    if (!element || this.isElementInitialized(element)) {
      return false;
    }

    try {
      // Ensure AdSense script is loaded
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }

      // Mark as initializing to prevent race conditions
      element.setAttribute('data-adsense-initializing', 'true');
      
      // Small delay to ensure element is fully rendered
      setTimeout(() => {
        if (!this.isElementInitialized(element)) {
          try {
            window.adsbygoogle.push({});
            this.markElementInitialized(element);
            element.removeAttribute('data-adsense-initializing');
          } catch (error) {
            console.warn('AdSense initialization error:', error);
            element.removeAttribute('data-adsense-initializing');
          }
        }
      }, 50);

      return true;
    } catch (error) {
      console.error('Failed to initialize ad:', error);
      return false;
    }
  }

  /**
   * Batch initialize multiple ad elements
   */
  public initializeAds(elements: HTMLElement[]): void {
    elements.forEach(element => this.initializeAd(element));
  }

  /**
   * Reset tracking for specific elements (useful for SPA navigation)
   */
  public resetElement(element: HTMLElement): void {
    const elementId = this.generateElementId(element);
    this.initializedElements.delete(elementId);
    window.__adsenseElements?.delete(elementId);
    element.removeAttribute('data-adsbygoogle-status');
    element.removeAttribute('data-adsense-initializing');
  }

  /**
   * Clear all tracking (useful for development/debugging)
   */
  public clearAll(): void {
    this.initializedElements.clear();
    if (typeof window !== 'undefined') {
      window.__adsenseElements?.clear();
    }
  }

  /**
   * Get initialization statistics
   */
  public getStats(): { initialized: number; total: number } {
    return {
      initialized: this.initializedElements.size,
      total: this.initializedElements.size + this.pendingElements.size
    };
  }
}

// Create singleton instance
const adSenseManager = new AdSenseManager();

export default adSenseManager;
