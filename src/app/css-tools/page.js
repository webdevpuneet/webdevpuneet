import CategoryPage from '@/components/CategoryPage';

export const metadata = {
  title: 'CSS Tools & Generators — Free Flexbox, Grid & More | webdevpuneet.com',
  description: 'Free CSS generators with live preview — flexbox builder, grid builder, box shadow, gradient, animation, and glassmorphism. Copy code, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-tools/' },
  icons: { icon: '/images/css-tools.png', shortcut: '/images/css-tools.png' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-tools/',
    siteName: 'webdevpuneet.com',
    title: 'Online CSS Tools & Generators — Free Flexbox, Grid, Animations & More',
    description: '24 free CSS tools with live preview: Flexbox Builder, CSS Grid Builder, Animation Generator, Gradient, Glassmorphism, Box Shadow, Clip-path, Loaders, and more. No sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/css-tools.png', width: 1200, height: 630, alt: 'Free Online CSS Tools & Generators — webdevpuneet.com' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Tools & Generators — Free Live Preview, No Sign-Up',
    description: '24 free CSS tools: Flexbox Builder, Grid Builder, Gradient Generator, Animation, Glassmorphism, Box Shadow, Clip-path, Loaders, and more.',
    images: ['https://webdevpuneet.com/images/css-tools.png'],
  },
};

export default function CssToolsPage() {
  return <CategoryPage slug="css-tools" />;
}
