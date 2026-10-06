import CategoryPage from '@/components/CategoryPage';

export const metadata = {
  title: 'Free Online Image Tools — Compress, Convert & Edit',
  description: '12 free image tools in your browser: editor, compressor, background remover, image to SVG, Base64, OCR, favicon and OG image generators. No upload, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-tools/' },
  icons: { icon: '/images/image-tools.png', shortcut: '/images/image-tools.png' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-tools/',
    siteName: 'webdevpuneet.com',
    title: 'Free Online Image Tools — Edit, Compress, Convert & Generate',
    description: '12 free image tools that run in your browser: Image Editor, Compressor, Background Remover, Relight Photo, Image to SVG, OCR, Base64, Favicon and OG Image generators. No upload, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/image-tools.png', width: 1200, height: 630, alt: 'Free Online Image Tools — webdevpuneet.com' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Online Image Tools — Free, No Upload, No Sign-Up',
    description: '12 free image tools: Image Editor, Compressor, Background Remover, Relight Photo, Image to SVG, OCR, Favicon and OG Image generators, and more.',
    images: ['https://webdevpuneet.com/images/image-tools.png'],
  },
};

export default function ImageToolsPage() {
  return <CategoryPage slug="image-tools" />;
}
