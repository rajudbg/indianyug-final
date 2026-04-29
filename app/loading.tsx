import React from 'react'

const SkeletonElement = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200/30 dark:bg-gray-700/30 rounded-md shimmer ${className}`} />
);

export default function LoadingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Title and Meta Skeleton */}
          <div className="space-y-3">
            <SkeletonElement className="h-4 w-1/4" />
            <SkeletonElement className="h-12 w-full" />
            <SkeletonElement className="h-10 w-3/4" />
            <SkeletonElement className="h-6 w-1/2" />
          </div>

          {/* Featured Image Skeleton */}
          <div className="glass rounded-xl overflow-hidden">
            <SkeletonElement className="h-[70vh] w-full" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4 pt-8">
            <SkeletonElement className="h-6 w-full" />
            <SkeletonElement className="h-6 w-5/6" />
            <SkeletonElement className="h-6 w-full" />
            <SkeletonElement className="h-6 w-3/4" />
            <SkeletonElement className="h-6 w-full" />
            <SkeletonElement className="h-6 w-4/6" />
          </div>
        </div>
      </div>
    </div>
  )
}
