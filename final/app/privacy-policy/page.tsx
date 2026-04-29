import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for IndianYug – how we collect, use and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>At IndianYug, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website indianyug.com.</p>

        <h2>Information We Collect</h2>
        <p>We may collect information about you in various ways:</p>
        <ul>
          <li><strong>Personal Data:</strong> Name, email address, and contact information you voluntarily provide via contact or subscription forms.</li>
          <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on pages — collected automatically.</li>
          <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience and for analytics.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To operate and maintain our website</li>
          <li>To send newsletters and updates (with your consent)</li>
          <li>To respond to inquiries and provide customer support</li>
          <li>To analyze usage and improve our content and services</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>Google AdSense & Analytics</h2>
        <p>We use Google AdSense to display advertisements and Google Analytics to understand site traffic. These services may use cookies and collect data in accordance with Google's Privacy Policy.</p>

        <h2>Third-Party Disclosure</h2>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this policy or with your consent.</p>

        <h2>Data Security</h2>
        <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.</p>

        <h2>Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at contact@indianyug.com.</p>

        <h2>Children's Privacy</h2>
        <p>Our website is not directed to children under 13. We do not knowingly collect personal data from children.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:contact@indianyug.com">contact@indianyug.com</a>.</p>
      </div>
    </div>
  )
}
