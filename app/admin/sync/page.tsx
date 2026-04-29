'use client'

import { useState } from 'react'
import { RefreshCw, Database, BarChart3 } from 'lucide-react'

interface PostStats {
  totalPosts: number
  totalPages: number
  categories: number
  categoriesList: Array<{
    id: number
    name: string
    slug: string
    count: number
  }>
}

interface SyncResult {
  success: boolean
  total: number
  posts: Array<{
    id: number
    title: string
    slug: string
    date: string
    status: string
    categories: number[]
  }>
}

export default function AdminSyncPage() {
  const [stats, setStats] = useState<PostStats | null>(null)
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adminKey, setAdminKey] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [limit, setLimit] = useState<number>(0)

  const fetchStats = async () => {
    if (!adminKey) {
      setError('Admin key is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/sync-posts', {
        headers: {
          'Authorization': `Bearer ${adminKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setStats(data.stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }

  const syncPosts = async () => {
    if (!adminKey) {
      setError('Admin key is required')
      return
    }

    setLoading(true)
    setError(null)
    setSyncResult(null)

    try {
      const response = await fetch('/api/admin/sync-posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory || undefined,
          limit: limit > 0 ? limit : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setSyncResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync posts')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            WordPress Post Sync Admin
          </h1>

          {/* Admin Key Input */}
          <div className="mb-6">
            <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Admin Secret Key
            </label>
            <input
              type="password"
              id="adminKey"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="glass-input w-full"
              placeholder="Enter admin secret key"
            />
          </div>

          {/* Stats Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              WordPress Stats
            </h2>
            <button
              onClick={fetchStats}
              disabled={loading || !adminKey}
              className="glass-button mb-4"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <BarChart3 className="w-4 h-4 mr-2" />
              )}
              Fetch Stats
            </button>

            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="glass p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {stats.totalPosts}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Posts
                  </div>
                </div>
                <div className="glass p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {stats.totalPages}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Pages
                  </div>
                </div>
                <div className="glass p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {stats.categories}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Categories
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sync Options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Sync Posts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category (optional)
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="glass-input w-full"
                >
                  <option value="">All Categories</option>
                  {stats?.categoriesList.map(cat => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name} ({cat.count} posts)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="limit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Limit (0 = no limit)
                </label>
                <input
                  type="number"
                  id="limit"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value) || 0)}
                  className="glass-input w-full"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={syncPosts}
              disabled={loading || !adminKey}
              className="gradient-button"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Database className="w-4 h-4 mr-2" />
              )}
              Sync Posts
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Sync Results */}
          {syncResult && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sync Results
              </h3>
              <div className="glass p-4 rounded-lg">
                <div className="text-green-600 dark:text-green-400 font-medium mb-2">
                  ✅ Successfully synced {syncResult.total} posts
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {syncResult.posts.slice(0, 10).map(post => (
                    <div key={post.id} className="text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 py-1">
                      {post.title} ({post.slug})
                    </div>
                  ))}
                  {syncResult.posts.length > 10 && (
                    <div className="text-sm text-gray-500 italic mt-2">
                      ... and {syncResult.posts.length - 10} more posts
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Instructions:
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Set the ADMIN_SECRET_KEY environment variable in your .env.local file</li>
              <li>• Use this key to authenticate API requests</li>
              <li>• Fetch stats to see how many posts are available on the WordPress site</li>
              <li>• Use the sync function to fetch all posts or posts from specific categories</li>
              <li>• The sync process will automatically handle pagination to get all posts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
