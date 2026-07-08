import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for IndianYug.',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">Disclaimer</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>The information provided on IndianYug (indianyug.com) is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information.</p>

        <h2>No Professional Advice</h2>
        <p>The content on this website does not constitute professional advice of any kind — including legal, financial, medical, or other professional advice. Always seek the guidance of qualified professionals for specific concerns.</p>

        <h2>External Links</h2>
        <p>Our website may contain links to external sites. These links are provided for convenience and informational purposes only. We have no control over the content of those sites and are not responsible for any loss or damage that may arise from your use of them.</p>

        <h2>Affiliate Disclaimer</h2>
        <p>Some links on this site may be affiliate links. This means we may earn a small commission if you make a purchase through those links, at no extra cost to you. We only recommend products and services we believe in.</p>

        <h2>Errors and Omissions</h2>
        <p>While we strive to keep information accurate and up-to-date, we cannot guarantee that all content is free from errors. We reserve the right to make changes at any time without notice.</p>

        <h2>Fair Use</h2>
        <p>This website may contain copyrighted material used for educational and informational purposes under the fair use doctrine. If you are the copyright owner and believe your material has been used improperly, please contact us.</p>

        <h2>Contact</h2>
        <p>For questions about this disclaimer, contact us at <a href="mailto:contact@indianyug.com">contact@indianyug.com</a>.</p>
      </div>
    </div>
  )
}
