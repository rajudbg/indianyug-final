/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fffef0',
          100: '#fffce0',
          200: '#fff8c1',
          300: '#fff196',
          400: '#fae649',
          500: '#fac001',
          600: '#e6ac00',
          700: '#cc9900',
          800: '#b38600',
          900: '#997300',
        },
        gold: {
          50: '#fffef0',
          100: '#fffce0',
          200: '#fff8c1',
          300: '#fff196',
          400: '#fae649',
          500: '#fac001',
          600: '#e6ac00',
          700: '#cc9900',
          800: '#b38600',
          900: '#997300',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#9aa0a6',
          500: '#5f6368',
          600: '#3c4043',
          700: '#202124',
          800: '#171717',
          900: '#0d0d0d',
        },
        accent: {
          yellow: '#fac001',
          grey: '#5f6368',
          'dark-grey': '#202124',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #fac001 0%, #e6ac00 100%)',
        'gradient-gold': 'linear-gradient(135deg, #fac001 0%, rgba(250, 192, 1, 0.6) 100%)',
        'gradient-neutral': 'linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%)',
        'gradient-dark': 'linear-gradient(135deg, #202124 0%, #171717 100%)',
        'hero-gradient': 'linear-gradient(135deg, #fac001 0%, #cc9900 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #202124 0%, #0d0d0d 100%)',
        'glass-bg': 'linear-gradient(135deg, rgba(250, 192, 1, 0.1) 0%, rgba(250, 192, 1, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(250, 192, 1, 0.08) 75%, rgba(250, 192, 1, 0.12) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glass-shimmer': 'glassShimmer 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'pulse-gold': 'pulseGold 2s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glassShimmer: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.5' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: '0.8' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 8px 32px rgba(250, 192, 1, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(250, 192, 1, 0.1)'
          },
          '100%': { 
            boxShadow: '0 12px 48px rgba(250, 192, 1, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 0 0 1px rgba(250, 192, 1, 0.2)'
          },
        },
        pulseGold: {
          '0%': { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' },
          '50%': { boxShadow: '0 12px 40px rgba(250, 192, 1, 0.2)' },
          '100%': { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        ripple: {
          'to': { transform: 'scale(2)', opacity: '0' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            '[class~="lead"]': {
              color: 'inherit',
            },
            strong: {
              color: 'inherit',
            },
            'ol > li::before': {
              color: 'inherit',
            },
            'ul > li::before': {
              backgroundColor: 'currentColor',
            },
            hr: {
              borderColor: 'currentColor',
              opacity: 0.2,
            },
            blockquote: {
              color: 'inherit',
              borderLeftColor: 'currentColor',
            },
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
            },
            h3: {
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
            'figure figcaption': {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
            'a code': {
              color: 'inherit',
            },
            pre: {
              color: 'inherit',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
            thead: {
              color: 'inherit',
              borderBottomColor: 'currentColor',
            },
            'tbody tr': {
              borderBottomColor: 'currentColor',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
