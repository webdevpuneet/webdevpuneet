'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { isEmbedRoute } from '@/lib/is-embed-route';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Never load GA on an embed page — it's dropped into a third-party iframe
  // (WordPress, this very blog, etc.), and a pageview there would count against
  // the embed's own URL (the iframe document) rather than the embedding page,
  // inflating pageviews every time the iframe loads on someone else's site.
  if (process.env.NODE_ENV !== 'production' || isEmbedRoute(pathname)) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YZX1VC4PFC"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YZX1VC4PFC');
      `}</Script>
    </>
  );
}
