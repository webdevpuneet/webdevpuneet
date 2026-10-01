import CategoryPage from '@/components/CategoryPage';

export const metadata = {
  title: 'Learn to Code Free — 25 Interactive Playgrounds, No Install | webdevpuneet.com',
  description: 'Free interactive coding playgrounds — learn HTML, CSS, JavaScript, React, Vue, Next.js, Python, Node.js, SQL, MongoDB and more with live preview and lessons.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/learn-to-code/' },
  icons: { icon: '/images/learn-to-code.png', shortcut: '/images/learn-to-code.png' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/learn-to-code/',
    siteName: 'webdevpuneet.com',
    title: 'Learn to Code Free — 25 Interactive Playgrounds, No Install',
    description: 'Free interactive coding playgrounds — no signup, no install. Learn HTML, CSS, JavaScript, React, Vue, TypeScript, Tailwind, Angular, Next.js and more with live preview and structured lessons.',
    images: [{ url: 'https://webdevpuneet.com/images/learn-to-code.png', width: 1200, height: 630, alt: 'Interactive Coding Playgrounds - Learn to Code | webdevpuneet.com' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Learn to Code Free — 25 Interactive Playgrounds, No Install',
    description: 'Free coding playgrounds — no signup, no install. HTML, CSS, JavaScript, React, Vue, TypeScript, Tailwind, Next.js, GSAP and more. Live preview, structured lessons.',
    images: ['https://webdevpuneet.com/images/learn-to-code.png'],
  },
};

export default function LearnToCodePage() {
  return <CategoryPage slug="learn-to-code" />;
}
