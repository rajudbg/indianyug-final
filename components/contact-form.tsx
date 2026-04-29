'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', type: 'general', message: '' });
    } catch (error: any) {
      setStatus(error.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 md:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Send Us a Message
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="glass-input w-full" placeholder="Your full name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="glass-input w-full" placeholder="your.email@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="glass-input w-full" placeholder="What's this about?" />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium mb-2">Message Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="glass-input w-full">
            <option value="general">General Inquiry</option>
            <option value="feedback">Feedback</option>
            <option value="collaboration">Collaboration</option>
            <option value="technical">Technical Support</option>
            <option value="content">Content Submission</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="glass-input w-full resize-none" placeholder="Tell us how we can help you..." />
        </div>
        <div className="text-center">
          <button type="submit" disabled={isLoading} className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-primary-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 disabled:opacity-50">
            <Send className="w-5 h-5" />
            <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
          </button>
        </div>
      </form>
      {status && (
        <p className={`mt-4 text-center text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {status === 'success' ? 'Message sent successfully! We will get back to you soon.' : status}
        </p>
      )}
    </div>
  );
}
