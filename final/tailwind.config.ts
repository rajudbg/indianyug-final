import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(31 41 55)',
            '--tw-prose-headings': 'rgb(17 24 39)',
            '--tw-prose-links': 'rgb(82 82 91)',
            '--tw-prose-invert-body': 'rgb(209 213 219)',
            '--tw-prose-invert-headings': 'rgb(243 244 246)',
            '--tw-prose-invert-links': 'rgb(161 161 170)',
            maxWidth: '70ch',
            lineHeight: '1.85',
            fontSize: '1.0625rem',
            p: { marginTop: '1.4em', marginBottom: '1.4em' },
            'h2,h3,h4': { fontWeight: '700', letterSpacing: '-0.02em' },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: 'rgb(82 82 91)',
              backgroundColor: 'rgb(244 244 245 / 0.5)',
              borderRadius: '0 0.5rem 0.5rem 0',
              paddingTop: '0.75em',
              paddingBottom: '0.75em',
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
            code: {
              backgroundColor: 'rgb(243 244 246)',
              borderRadius: '0.25rem',
              paddingLeft: '0.375em',
              paddingRight: '0.375em',
              fontWeight: '400',
            },
            img: { borderRadius: '0.75rem' },
          },
        },
        invert: {
          css: {
            blockquote: { backgroundColor: 'rgb(39 39 42 / 0.5)' },
            code: { backgroundColor: 'rgb(31 41 55)' },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
