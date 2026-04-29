'use client';

import React, { useEffect } from 'react';
import LiquidGlassEnhancer from '@/lib/liquid-glass';

interface LiquidGlassDemoProps {
  title?: string;
  description?: string;
  variant?: 'standard' | 'enhanced' | 'liquid';
}

export default function LiquidGlassDemo({ 
  title = "Enhanced Liquid Glass Card", 
  description = "Experience the new layered liquid glass effect with performance-optimized animations",
  variant = 'enhanced' 
}: LiquidGlassDemoProps) {
  useEffect(() => {
    // Initialize liquid glass enhancements
    LiquidGlassEnhancer.enhanceExistingElements();
  }, []);

  const getGlassClass = () => {
    switch (variant) {
      case 'liquid':
        return 'liquid-glass-card liquid-glow';
      case 'enhanced':
        return 'glass-card liquid-hover';
      default:
        return 'glass-card';
    }
  };

  return (
    <div className={`${getGlassClass()} max-w-md mx-auto`}>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        
        <div className="flex items-center space-x-2">
          <button className="glass-button text-sm">
            Learn More
          </button>
          <button className="glass-button-subtle text-sm">
            Preview
          </button>
        </div>
      </div>
      
      {/* Liquid effect indicators */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}
