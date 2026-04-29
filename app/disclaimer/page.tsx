import React from 'react'
import { Metadata } from 'next'
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  MessageSquare, 
  Copyright, 
  UserCheck, 
  RefreshCw, 
  Scale, 
  Mail,
  Info,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer | IndianYug',
  description: 'Important legal information and disclaimers for IndianYug Media. Read our terms, limitations, and policies.',
  keywords: ['disclaimer', 'legal', 'terms', 'IndianYug', 'media', 'policy'],
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Disclaimer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            IndianYug Media
          </p>
        </div>

        {/* Introduction */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-start space-x-3 mb-6">
            <Info className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to IndianYug.com, operated by IndianYug Media. By accessing and using this website, 
                you agree to the terms and conditions of this disclaimer. Please read it carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Sections */}
        <div className="space-y-8">
          {/* 1. General Information */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                1. General Information
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The information provided on IndianYug.com is for general informational, educational, and entertainment 
                purposes only. While we strive to keep the content accurate, current, and reliable, IndianYug Media 
                makes no guarantees about the completeness, correctness, suitability, or validity of any information 
                on the site.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The website may cover topics including but not limited to news, current affairs, health, lifestyle, 
                history, science, entertainment, culture, technology, politics, and opinion pieces.
              </p>
            </div>
          </section>

          {/* 2. Accuracy of Information */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                2. Accuracy of Information
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We make every effort to verify facts and sources before publishing, but IndianYug Media cannot 
                guarantee the absolute accuracy or timeliness of the content. News is ever-evolving, and developments 
                can change the context of a story after it is published.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Any action you take based upon the information on this website is strictly at your own risk, and 
                IndianYug Media will not be liable for any losses or damages in connection with the use of our website.
              </p>
            </div>
          </section>

          {/* 3. Editorial Independence and Opinions */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <UserCheck className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                3. Editorial Independence and Opinions
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Opinions expressed in articles, columns, blogs, or comments belong solely to the respective authors 
                and do not reflect the views of IndianYug Media, its management, or staff.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Our editorial content is independent and not influenced by advertisers or sponsors. Sponsored or paid 
                content will be clearly marked as such.
              </p>
            </div>
          </section>

          {/* 4. Third-Party Links and External Content */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <ExternalLink className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                4. Third-Party Links and External Content
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                IndianYug.com may include hyperlinks to third-party websites or content. These links are provided 
                for convenience and informational purposes only.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We do not have control over the nature, content, and availability of external sites. The inclusion 
                of any links does not necessarily imply a recommendation or endorse the views expressed within them. 
                IndianYug Media is not responsible for the accuracy or reliability of any information, products, or 
                services found on these external websites.
              </p>
            </div>
          </section>

          {/* 5. User-Generated Content and Comments */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                5. User-Generated Content and Comments
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                IndianYug.com allows users to comment on articles and may feature guest submissions. While we 
                encourage diverse opinions, IndianYug Media is not responsible for any user-generated content.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to moderate, edit, or remove any content that is offensive, inappropriate, 
                defamatory, or violates applicable laws.
              </p>
            </div>
          </section>

          {/* 6. Copyright and Intellectual Property */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <Copyright className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                6. Copyright and Intellectual Property
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                All content on IndianYug.com, including but not limited to text, images, graphics, logos, and 
                multimedia, is the intellectual property of IndianYug Media unless otherwise stated.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Unauthorized reproduction, distribution, or use of our content in any form is strictly prohibited 
                without prior written consent. Proper attribution must be given when quoting or referencing content 
                from IndianYug.
              </p>
            </div>
          </section>

          {/* 7. No Professional Advice */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                7. No Professional Advice
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Content related to health, finance, legal, or any other professional subject is not a substitute 
                for professional advice. Always seek the guidance of a qualified expert before taking any action 
                based on the content of this website.
              </p>
            </div>
          </section>

          {/* 8. Changes to the Disclaimer */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <RefreshCw className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                8. Changes to the Disclaimer
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                IndianYug Media reserves the right to amend, update, or change this disclaimer at any time without 
                prior notice. Any changes will be posted on this page and will be effective immediately upon posting.
              </p>
            </div>
          </section>

          {/* 9. Limitation of Liability */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <Scale className="w-8 h-8 text-gray-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                9. Limitation of Liability
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Under no circumstances shall IndianYug Media, its owners, authors, employees, or affiliates be held 
                liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your 
                access to, use of, or reliance on any content on IndianYug.com.
              </p>
            </div>
          </section>

          {/* 10. Contact and Grievance Redressal */}
          <section className="glass-card p-8">
            <div className="flex items-center mb-6">
              <Mail className="w-8 h-8 text-teal-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                10. Contact and Grievance Redressal
              </h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For any concerns, feedback, or to report objectionable content, please reach out to us at our 
                official grievance redressal email:
              </p>
              <div className="flex items-center space-x-2 text-lg font-medium text-primary-600 dark:text-primary-400">
                <Mail className="w-5 h-5" />
                <span>grievance@indianyug.com</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                We are committed to addressing your concerns promptly and in accordance with applicable laws and 
                standards of journalistic ethics.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="glass-card p-8 mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Agreement
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            By continuing to use IndianYug.com, you acknowledge and agree to the terms of this disclaimer.
          </p>
        </div>
      </div>
    </div>
  )
} 