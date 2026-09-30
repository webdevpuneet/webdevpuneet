'use client';
import Script from 'next/script';
import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_ENABLED } from '@/lib/ads-config';
import { getNotFound, getNotFoundServerSnapshot, subscribeNotFound } from '@/lib/not-found-state';
import { isEmbedRoute } from '@/lib/is-embed-route';

export default function AdSenseScript() {
  const isNotFoundPage = useSyncExternalStore(subscribeNotFound, getNotFound, getNotFoundServerSnapshot);
  const pathname = usePathname();

  // Never load AdSense on an embed page — it's meant to be dropped into a
  // third-party iframe (WordPress, etc.) and must show nothing but the
  // snippet preview, with zero ad scripts or requests.
  if (!ADS_ENABLED || isNotFoundPage || isEmbedRoute(pathname)) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2762737943861458"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
