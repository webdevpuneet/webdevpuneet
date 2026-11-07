'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { isEmbedRoute } from '@/lib/is-embed-route';
import { AHREFS_ANALYTICS_ENABLED } from '@/lib/tracking-config';

// Ahrefs Web Analytics (the data-key is the site's key from Ahrefs → Web Analytics → Installation guide). Its script follows
// client-side page changes by itself. Skipped in development and on embed pages, like GoogleAnalytics and Statcounter.
const AHREFS_KEY = 'hOluLhDOBOdKBmJJ8n0hsw';

export default function AhrefsAnalytics() {
  const pathname = usePathname();
  if (!AHREFS_ANALYTICS_ENABLED || process.env.NODE_ENV !== 'production' || isEmbedRoute(pathname)) return null;
  return <Script id="ahrefs-analytics" src="https://analytics.ahrefs.com/analytics.js" data-key={AHREFS_KEY} strategy="afterInteractive" />;
}
