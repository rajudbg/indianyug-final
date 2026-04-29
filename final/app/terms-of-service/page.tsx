import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for IndianYug.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>By accessing and using IndianYug (indianyug.com), you accept and agree to be bound by these Terms of Service.</p>

        <h2>Use of the Website</h2>
        <p>You may use our website for lawful purposes only. You agree not to use this site in any way that violates applicable laws or regulations, or that harms or could harm other users.</p>

        <h2>Intellectual Property</h2>
        <p>All content published on IndianYug, including articles, images, logos, and graphics, is the property of IndianYug or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without express written permission.</p>

        <h2>User Submissions</h2>
        <p>By submitting content to IndianYug (e.g., via contact forms or comments), you grant us a non-exclusive, royalty-free licence to use, publish, and display such content on our platform.</p>

        <h2>Third-Party Links</h2>
        <p>Our website may contain links to third-party sites. These are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them.</p>

        <h2>Disclaimer of Warranties</h2>
        <p>This website is provided on an "as is" basis without any warranties of any kind, either express or implied.</p>

        <h2>Limitation of Liability</h2>
        <p>IndianYug shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.</p>

        <h2>Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of India.</p>

        <h2>Contact</h2>
        <p>Questions about the Terms of Service should be sent to <a href="mailto:contact@indianyug.com">contact@indianyug.com</a>.</p>
      </div>
    </div>
  )
}
