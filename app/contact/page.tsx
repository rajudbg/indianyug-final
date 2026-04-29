import React from 'react'
import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the IndianYug team. We\'d love to hear from you and answer any questions you may have.',
  keywords: ['IndianYug', 'contact', 'support', 'get in touch'],
  openGraph: {
    title: 'Contact Us',
    description: 'Get in touch with the IndianYug team. We\'d love to hear from you.',
    type: 'website',
    url: '/contact',
  },
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours',
    value: 'contact@indianyug.com',
    action: 'mailto:contact@indianyug.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our team during business hours',
    value: '+91 75032 75549',
    action: 'tel:+917503275549',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come visit us at our office',
    value: 'Delhi, India',
    action: '#',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'We\'re available to help you',
    value: 'Mon-Fri: 9AM-6PM IST',
    action: '#',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full text-primary-600 dark:text-primary-400 mb-6">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              We'd Love to <span className="text-gradient">Hear</span> From You
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Have a question, suggestion, or just want to say hello? Drop us a line and 
              we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="glass-card text-center group hover:scale-105 transition-transform duration-300">
                  <div className="glass p-3 rounded-xl inline-flex mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {info.description}
                  </p>
                  {info.action !== '#' ? (
                    <a
                      href={info.action}
                      className="text-primary-800 dark:text-primary-400 font-medium hover:underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-gray-900 dark:text-white font-medium">
                      {info.value}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Quick answers to common questions about IndianYug.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How can I contribute content to IndianYug?",
                answer: "We welcome contributions! Please send us an email with your article proposal, writing samples, and a brief bio. Our editorial team will review your submission and get back to you."
              },
              {
                question: "Can I republish IndianYug articles on my website?",
                answer: "Please contact us before republishing any content. We're generally open to collaboration but prefer to discuss terms and provide proper attribution guidelines."
              },
              {
                question: "How often do you publish new content?",
                answer: "We publish new articles multiple times per week across various categories. Subscribe to our newsletter to stay updated with the latest posts."
              },
              {
                question: "Do you offer advertising opportunities?",
                answer: "Yes, we offer various advertising and sponsorship opportunities. Please reach out to discuss your requirements and we'll send you our media kit."
              }
            ].map((faq, index) => (
              <div key={index} className="glass-card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
