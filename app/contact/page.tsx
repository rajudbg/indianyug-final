'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const form = e.currentTarget
      const data = Object.fromEntries(new FormData(form))
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <header className="text-center mb-12">
        <span className="badge mb-4 inline-flex items-center gap-1"><Mail size={12} /> Contact</span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">Get in Touch</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Have a story idea, partnership proposal, or just want to say hello? We'd love to hear from you.
        </p>
      </header>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Info */}
        <div className="md:col-span-2 space-y-5">
          {[
            { icon: Mail, label: 'Email', value: 'contact@indianyug.com', href: 'mailto:contact@indianyug.com' },
            { icon: Phone, label: 'Phone', value: '+91 75032 75549', href: 'tel:+917503275549' },
            { icon: MapPin, label: 'Location', value: 'Delhi, India', href: undefined },
          ].map(item => (
            <div key={item.label} className="glass-card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center shrink-0">
                <item.icon className="text-saffron-600 dark:text-saffron-400" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-gray-700 dark:text-gray-300 hover:text-saffron-600 transition-colors font-medium">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="md:col-span-3 glass-card p-7">
          {status === 'sent' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <Send className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input
                  name="subject"
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all text-sm"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all resize-none text-sm"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center"
              >
                <Send size={16} />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
