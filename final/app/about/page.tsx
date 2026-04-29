import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Users, Globe, Lightbulb, Target, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about IndianYug, our mission to bridge Indian culture with the digital age.',
}

const values = [
  { icon: Heart, title: 'Authenticity', description: 'We celebrate genuine Indian culture while embracing modern perspectives and innovation.' },
  { icon: Users, title: 'Community', description: 'Building bridges between diverse communities and fostering meaningful connections.' },
  { icon: Globe, title: 'Global Reach', description: 'Connecting Indian culture with the world through digital storytelling and content.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Pioneering new ways to share culture, knowledge, and stories in the digital age.' },
]

const stats = [
  { number: '100K+', label: 'Monthly Readers' },
  { number: '600+', label: 'Articles Published' },
  { number: '50+', label: 'Contributors' },
  { number: '25+', label: 'Categories' },
]

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* Hero */}
      <section className="text-center mb-16">
        <span className="badge mb-4 inline-flex items-center gap-1"><Heart size={12} /> About IndianYug</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-5 tracking-tight">
          Bridging <span className="text-gradient">Tradition</span> with{' '}
          <span className="text-gradient">Innovation</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          IndianYug is your digital destination for exploring the rich tapestry of Indian culture
          through a modern lens. We celebrate our heritage while embracing the future.
        </p>
      </section>

      {/* Stats */}
      <section className="glass-card p-8 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gradient mb-1">{s.number}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="grid md:grid-cols-2 gap-10 mb-14">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            <p>
              Founded in the digital age, IndianYug emerged from a vision to create a platform
              that honors India's diverse cultural heritage while embracing modern storytelling.
            </p>
            <p>
              We believe that culture is not static—it evolves, adapts, and grows. Through our
              carefully curated content, we explore how Indian traditions, values, and innovations
              continue to shape our world today.
            </p>
            <p>
              From ancient wisdom to contemporary insights, from traditional arts to cutting-edge
              technology, IndianYug serves as a bridge connecting the past, present, and future.
            </p>
          </div>
        </div>
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-saffron-50 to-orange-50 dark:from-saffron-950/30 dark:to-orange-950/30">
          <Globe className="w-16 h-16 text-saffron-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Global Cultural Bridge</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Connecting Indian culture with the world through digital storytelling
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-14">
        <h2 className="section-title">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(v => (
            <div key={v.title} className="glass-card p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center mx-auto mb-4">
                <v.icon className="text-saffron-600 dark:text-saffron-400" size={22} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="glass-card p-10 text-center mb-14">
        <span className="badge mb-4 inline-flex items-center gap-1"><Target size={12} /> Our Mission</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Empowering Cultural Understanding</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Our mission is to create a digital platform that celebrates the diversity and richness
          of Indian culture while fostering understanding, connection, and dialogue between
          communities worldwide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Award, title: 'Excellence', desc: 'Maintaining high standards in content quality and cultural authenticity' },
            { icon: Users, title: 'Inclusivity', desc: 'Celebrating diversity within Indian culture and welcoming all perspectives' },
            { icon: Lightbulb, title: 'Innovation', desc: 'Using modern technology to share timeless wisdom and cultural insights' },
          ].map(item => (
            <div key={item.title} className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/40">
              <item.icon className="text-saffron-600 dark:text-saffron-400 mb-3 mx-auto" size={22} />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Join Our Journey</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          Become part of a community that values cultural heritage and believes in the power of storytelling.
        </p>
        <Link href="/contact" className="btn-primary">Get in Touch</Link>
      </section>
    </div>
  )
}
