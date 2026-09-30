import './globals.css';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import RouteLoader from '@/components/RouteLoader';
import CookieConsent from '@/components/CookieConsent';
import ShareThisWidget from '@/components/ShareThisWidget';
import styles from './layout.module.css';
import AdSenseScript from '@/components/AdSenseScript';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata = {
  title: {
    default: 'webdevpuneet.com — Free Online Developer Tools',
    template: '%s',
  },
  description: 'Free browser-based tools for web developers — JSON formatter, CSS generator, flexbox builder, regex tester, gradient maker, diff checker, and more. No install, no sign-up.',
  metadataBase: new URL('https://webdevpuneet.com'),
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com',
    siteName: 'webdevpuneet.com',
    title: 'webdevpuneet.com — Free Online Developer Tools',
    description: 'Free browser-based tools for web developers — JSON formatter, CSS generator, flexbox builder, regex tester, gradient maker, and more.',
    images: [{ url: 'https://webdevpuneet.com/images/dev-tools.png', width: 1200, height: 630, alt: 'webdevpuneet.com — Free Online Developer Tools' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'webdevpuneet.com — Free Online Developer Tools',
    description: 'Free browser-based tools for web developers — JSON formatter, CSS generator, flexbox builder, regex tester, gradient maker, and more.',
    images: ['https://webdevpuneet.com/images/dev-tools.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/pwa-192.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'webdevpuneet.com',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'webdevpuneet.com',
  url: 'https://webdevpuneet.com',
  sameAs: ['https://www.webdevpuneet.com/', 'https://twitter.com/webdevpuneet'],
  description: 'Free browser-based developer tools — JSON formatter, CSS generators, converters, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Google Consent Mode v2 — must run BEFORE AdSense and GA so the
          consent state is the first thing in the dataLayer. The site uses a
          notice-only cookie banner (continued use = agreement), so every
          signal defaults to 'granted' and ads/analytics run from first load.
        */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});})();` }} />
        <meta name="yandex-verification" content="01596500f0ee9b03" />
        <AdSenseScript />
      </head>
      <body>
        <meta name="theme-color" content="#dde0e8" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <GoogleAnalytics />
        <RouteLoader />
        <div className={styles.appLayout}>
          <Sidebar />
          <div className={styles.mainWrap}>
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
          <div className={styles.rightSpace} aria-hidden="true" />
        </div>
        <CookieConsent />
        <ShareThisWidget />
      </body>
    </html>
  );
}
