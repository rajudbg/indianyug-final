'use client'

import React, { useState } from 'react'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setMessage(data.message || 'Thank you for subscribing!')
      setEmail('')
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-card p-4">
      <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-100">Stay Updated</h4>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
        Get the latest posts delivered right to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="glass-input w-full text-sm"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full gradient-button text-sm py-2 disabled:opacity-50"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="text-sm mt-2 text-center">{message}</p>}
    </div>
  )
}
