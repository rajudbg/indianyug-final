'use client'
import { useState } from 'react'

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {}
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <p className="text-sm text-green-600 dark:text-green-400 font-medium py-2">
        ✓ Thanks for subscribing!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="w-full px-4 py-2.5 rounded-xl text-sm
                   bg-white dark:bg-gray-800
                   border border-gray-200 dark:border-gray-700
                   text-gray-900 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent
                   transition-all"
      />
      <button type="submit" disabled={status === 'sending'} className="btn-primary justify-center text-sm py-2">
        {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  )
}
