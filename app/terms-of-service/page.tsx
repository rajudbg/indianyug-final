import React from 'react'
import { Metadata } from 'next'
import { FileText, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | IndianYug',
  description: 'Read the terms and conditions that govern the use of IndianYug services.',
  keywords: ['terms of service', 'terms and conditions', 'IndianYug'],
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-neutral-100/50 dark:from-neutral-900/50 dark:to-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 glass-button px-4 py-2 rounded-full text-primary-600 dark:text-primary-400 mb-6">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Terms of Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12">
            <div className="prose prose-lg max-w-none prose-glass">
              <h2>1. Agreement to Terms</h2>
              <p>By accessing or using our website, IndianYug, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of the terms, you may not use our services.</p>
              
              <h2>2. Intellectual Property Rights</h2>
              <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>

              <h2>3. User Representations</h2>
              <p>By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (3) you will not use the Site for any illegal or unauthorized purpose; and (4) your use of the Site will not violate any applicable law or regulation.</p>

              <h2>4. Prohibited Activities</h2>
              <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

              <h2>5. Disclaimer of Warranties</h2>
              <p>The site is provided on an as-is and as-available basis. You agree that your use of the site and our services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the site and your use thereof.</p>

              <h2>6. Limitation of Liability</h2>
              <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the site.</p>

              <h2>7. Governing Law</h2>
              <p>These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of India, and any disputes will be subject to the exclusive jurisdiction of the courts of Delhi.</p>

              <h2>8. Contact Us</h2>
              <p>To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
              <p><strong>General Inquiries:</strong> <a href="mailto:contact@indianyug.com">contact@indianyug.com</a></p>
              <p><strong>Grievances and Legal Disputes:</strong> For any complaints or legal matters, please contact our Grievance Officer at <a href="mailto:grievance@indianyug.com">grievance@indianyug.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
