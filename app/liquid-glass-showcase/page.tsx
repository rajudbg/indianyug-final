'use client';

import React, { useEffect } from 'react';
import LiquidGlassEnhancer from '@/lib/liquid-glass';
import LiquidGlassDemo from '@/components/ui/liquid-glass-demo';
import { PostCard } from '@/components/ui/post-card';
import { mockPosts } from '@/lib/mock-data';

export default function LiquidGlassShowcase() {
  useEffect(() => {
    // Initialize liquid glass enhancements
    LiquidGlassEnhancer.enhanceExistingElements();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Enhanced Liquid Glass
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                Design Showcase
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the new layered liquid glass effects with performance-optimized animations
              and interactive elements that respond to your cursor.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Standard Glass Card */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Standard</h2>
            <LiquidGlassDemo 
              title="Standard Glass Card"
              description="Basic glass effect with subtle transparency"
              variant="standard"
            />
          </div>

          {/* Enhanced Glass Card */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enhanced</h2>
            <LiquidGlassDemo 
              title="Enhanced Glass Card"
              description="Improved glass effect with hover animations"
              variant="enhanced"
            />
          </div>

          {/* Liquid Glass Card */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Liquid</h2>
            <LiquidGlassDemo 
              title="Liquid Glass Card"
              description="Full liquid glass effect with morphing animations"
              variant="liquid"
            />
          </div>
        </div>

        {/* Post Cards Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Enhanced Post Cards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts.slice(0, 3).map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                className="liquid-hover"
              />
            ))}
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Interactive Elements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Glass Buttons */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Glass Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="glass-button">Primary Action</button>
                <button className="glass-button-subtle">Secondary</button>
                <button className="glass-button-outline">Outline</button>
              </div>
            </div>

            {/* Form Elements */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Form Elements</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="glass-input w-full"
                />
                <textarea 
                  placeholder="Your message"
                  className="glass-textarea w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Info */}
        <div className="mt-16 glass-card p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Performance Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Automatic Optimizations</h3>
              <ul className="space-y-1">
                <li>• Intersection Observer for visibility</li>
                <li>• Reduced motion support</li>
                <li>• Mobile performance optimization</li>
                <li>• Lazy loading animations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Browser Support</h3>
              <ul className="space-y-1">
                <li>• Modern browsers: Full support</li>
                <li>• Safari: Webkit prefixes included</li>
                <li>• Mobile: Reduced effects for performance</li>
                <li>• Legacy: Graceful degradation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
