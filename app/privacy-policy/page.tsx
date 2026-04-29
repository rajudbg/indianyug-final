import React from 'react'
import { Metadata } from 'next'
import { Shield, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | IndianYug',
  description: 'Learn about how IndianYug collects, uses, and protects your personal information.',
  keywords: ['privacy policy', 'data protection', 'IndianYug'],
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-neutral-100/50 dark:from-neutral-900/50 dark:to-neutral-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 glass-button px-4 py-2 rounded-full text-primary-600 dark:text-primary-400 mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
            Your Privacy Matters
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
              <h2>1. Introduction</h2>
              <p>Welcome to IndianYug. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
              
              <h2>2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul>
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you subscribe to our newsletter or use our contact form.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                <li><strong>Cookies and Web Beacons:</strong> We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience.</li>
              </ul>

              <h2>3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul>
                <li>Send you a newsletter or other promotional communications.</li>
                <li>Respond to your comments, questions, and provide customer service.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Serve personalized advertising via partners like Google AdSense.</li>
              </ul>

              <h2>4. Disclosure of Your Information</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information we have collected about you in certain situations, such as with third-party service providers that perform services for us or on our behalf, including email delivery and ad serving.</p>

              <h2>5. Third-Party Websites</h2>
              <p>The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy.</p>

              <h2>6. Data Security</h2>
              <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

              <h2>7. Your Rights</h2>
              <p>You have the right to opt-out of marketing communications at any time. You can usually do this by clicking the "unsubscribe" link in the footer of our emails. You may also have other rights, such as the right to access or delete your data, depending on your location.</p>

              <h2>8. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
              <p><strong>General Inquiries:</strong> <a href="mailto:contact@indianyug.com">contact@indianyug.com</a></p>
              <p><strong>Grievances and Legal Requests:</strong> For any complaints, disputes, or legal matters, please contact our Grievance Officer at <a href="mailto:grievance@indianyug.com">grievance@indianyug.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
