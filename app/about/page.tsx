import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { Heart, Users, Globe, Lightbulb, Target, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | IndianYug',
  description: 'Learn about IndianYug, our mission to bridge Indian culture with the digital age, and the passionate team behind our platform.',
  keywords: ['IndianYug', 'about', 'Indian culture', 'digital platform', 'team'],
  openGraph: {
    title: 'About Us | IndianYug',
    description: 'Learn about IndianYug, our mission to bridge Indian culture with the digital age.',
    type: 'website',
    url: '/about',
  },
}

const values = [
  {
    icon: Heart,
    title: 'Authenticity',
    description: 'We celebrate genuine Indian culture while embracing modern perspectives and innovation.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building bridges between diverse communities and fostering meaningful connections.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connecting Indian culture with the world through digital storytelling and content.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pioneering new ways to share culture, knowledge, and stories in the digital age.',
  },
]

const stats = [
  { number: '100K+', label: 'Monthly Readers' },
  { number: '500+', label: 'Articles Published' },
  { number: '50+', label: 'Contributors' },
  { number: '25+', label: 'Categories' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full text-primary-600 dark:text-primary-400 mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">About IndianYug</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Bridging <span className="text-gradient">Tradition</span> with <span className="text-gradient">Innovation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              IndianYug is your digital destination for exploring the rich tapestry of Indian culture 
              through a modern lens. We celebrate our heritage while embracing the future, creating 
              a platform where tradition meets innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Founded in the digital age, IndianYug emerged from a vision to create a platform 
                  that honors India's diverse cultural heritage while embracing modern storytelling 
                  methods and technology.
                </p>
                <p>
                  We believe that culture is not static—it evolves, adapts, and grows. Through our 
                  carefully curated content, we explore how Indian traditions, values, and innovations 
                  continue to shape our world today.
                </p>
                <p>
                  From ancient wisdom to contemporary insights, from traditional arts to cutting-edge 
                  technology, IndianYug serves as a bridge connecting the past, present, and future 
                  of Indian culture.
                </p>
              </div>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden glass">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Globe className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Global Cultural Bridge
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Connecting Indian culture with the world through digital storytelling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do, from the content we create to the 
              community we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="glass-card text-center group hover:scale-105 transition-transform duration-300">
                  <div className="glass p-3 rounded-xl inline-flex mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card text-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full text-primary-600 dark:text-primary-400 mb-6">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Our Mission</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Empowering Cultural Understanding
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Our mission is to create a digital platform that celebrates the diversity and richness 
              of Indian culture while fostering understanding, connection, and dialogue between 
              communities worldwide. We strive to be the bridge that connects tradition with 
              innovation, local with global, and past with future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-card">
                <Award className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Excellence</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Maintaining high standards in content quality and cultural authenticity
                </p>
              </div>
              
              <div className="glass-card">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Inclusivity</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Celebrating the diversity within Indian culture and welcoming all perspectives
                </p>
              </div>
              
              <div className="glass-card">
                <Lightbulb className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Innovation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Using modern technology to share timeless wisdom and cultural insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Journey
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Become part of a community that values cultural heritage, embraces innovation, 
              and believes in the power of storytelling to connect hearts and minds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                Subscribe to Newsletter
              </button>
              <a
                href="/contact"
                className="glass-button px-8 py-3 text-primary-800 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/20"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
