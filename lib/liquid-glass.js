/**
 * Liquid Glass Enhancement Utility
 * Performance-optimized interactive effects for glass components
 */

class LiquidGlassEnhancer {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    if (this.isReducedMotion || this.isMobile) {
      return; // Skip animations on reduced motion or mobile
    }

    this.setupMouseTracking();
    this.setupIntersectionObserver();
  }

  setupMouseTracking() {
    // Enhanced mouse tracking for liquid glass cards
    const glassCards = document.querySelectorAll('.glass-card, .liquid-glass-card');
    
    glassCards.forEach(card => {
      card.addEventListener('mousemove', this.handleMouseMove.bind(this));
      card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });
  }

  handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }

  handleMouseLeave(e) {
    e.currentTarget.style.removeProperty('--mouse-x');
    e.currentTarget.style.removeProperty('--mouse-y');
  }

  setupIntersectionObserver() {
    // Lazy load liquid effects only when elements are visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('liquid-animated');
        } else {
          entry.target.classList.remove('liquid-animated');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const liquidElements = document.querySelectorAll('.liquid-glass, .liquid-glass-card');
    liquidElements.forEach(el => observer.observe(el));
  }

  // Performance-optimized liquid morphing
  static enableLiquidMorph(elements) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    elements.forEach(element => {
      element.classList.add('liquid-hover');
    });
  }

  // Utility method to enhance existing glass elements
  static enhanceExistingElements() {
    const enhancer = new LiquidGlassEnhancer();
    
    // Add liquid classes to existing glass cards
    const existingCards = document.querySelectorAll('.glass-card:not(.liquid-enhanced)');
    existingCards.forEach(card => {
      card.classList.add('liquid-enhanced');
      card.classList.add('liquid-hover');
    });
  }
}

// Initialize on DOM ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    LiquidGlassEnhancer.enhanceExistingElements();
  });
}

// Export for use in components
export default LiquidGlassEnhancer;
