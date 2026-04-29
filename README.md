# IndianYug Frontend

A modern, headless WordPress frontend built with Next.js 14, featuring Apple "Liquid Glass" design aesthetics and optimized for performance.

## ✨ Features

- **🎨 Glassmorphism Design**: Apple-inspired liquid glass UI with backdrop blur effects
- **🚀 Next.js 14**: Latest React Server Components and App Router
- **📱 Responsive**: Mobile-first design that works on all devices
- **🌙 Dark Mode**: Automatic theme switching with system preference detection
- **⚡ Performance**: Optimized images, code splitting, and lazy loading
- **🔍 SEO Optimized**: Meta tags, Open Graph, and Twitter Cards
- **🔍 Search**: Real-time search with WordPress API integration
- **📊 Analytics Ready**: Google Analytics integration
- **🎯 TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **UI Components**: Custom components with Framer Motion animations
- **Icons**: Lucide React
- **CMS**: WordPress (headless) via REST API
- **Type Safety**: TypeScript
- **Deployment**: Vercel (optimized)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- A WordPress site with REST API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indianyug-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your WordPress API URL and other configuration:
   ```env
   WORDPRESS_API_URL=https://indianyug.com/wp-json/wp/v2
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── category/[slug]/   # Dynamic category pages
│   └── posts/[slug]/      # Dynamic post pages
├── components/            # Reusable React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── ui/               # UI components (Cards, Modals, etc.)
├── lib/                  # Utility libraries
│   └── wordpress.ts      # WordPress API client
├── types/                # TypeScript type definitions
│   └── wordpress.ts      # WordPress data types
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Design System

### Glassmorphism Classes

The project includes custom Tailwind CSS classes for glassmorphism effects:

- `glass` - Basic glass effect with backdrop blur
- `glass-card` - Glass card with hover effects
- `glass-nav` - Navigation-specific glass styling
- `glass-button` - Interactive glass buttons
- `glass-input` - Form input styling

### Color Palette

- **Primary**: Blue gradient (`primary-50` to `primary-900`)
- **Glass Effects**: Semi-transparent whites and blacks
- **Gradients**: Custom gradients for buttons and backgrounds

## 🔌 WordPress Integration

### Required WordPress Setup

1. **Ensure WordPress REST API is enabled** (enabled by default in WordPress 4.7+)
2. **Install recommended plugins**:
   - Yoast SEO (for enhanced meta data)
   - Featured Image from URL (if using external images)

### API Endpoints Used

- `/wp/v2/posts` - Blog posts
- `/wp/v2/categories` - Post categories
- `/wp/v2/pages` - Static pages
- `/wp/v2/media` - Media attachments
- `/wp/v2/users` - Author information

### Custom Fields

The app supports WordPress custom fields and ACF (Advanced Custom Fields) data through the `acf` property in post objects.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**

2. **Set environment variables in Vercel dashboard**:
   ```env
   WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   GOOGLE_SITE_VERIFICATION=your-verification-code
   ```

3. **Deploy**
   - Automatic deployments on every push to main branch
   - Preview deployments for pull requests

### Other Platforms

The app can be deployed on any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## ⚡ Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic code splitting with dynamic imports
- **Static Generation**: Pre-rendered pages for better SEO and performance
- **API Caching**: WordPress API responses cached for 5 minutes
- **Font Optimization**: Optimized Google Fonts loading

## 🔍 SEO Features

- **Meta Tags**: Dynamic meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **JSON-LD**: Structured data for better search results
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: SEO-friendly robots.txt

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Progressive Web App

The app includes PWA features:

- Service worker for offline support
- Web app manifest
- Add to home screen capability

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact us at contact@indianyug.com

## 🙏 Acknowledgments

- WordPress REST API
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- The open-source community

---

Made with ❤️ by the IndianYug team
# Updated
