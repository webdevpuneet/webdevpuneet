'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_ENABLED, adsAllowedOnPath } from '@/lib/ads-config';
import { useIsNotFound } from '@/lib/not-found-state';
import { isEmbedRoute } from '@/lib/is-embed-route';

export default function AdSenseScript() {
  const isNotFoundPage = useIsNotFound();
  const pathname = usePathname();

  // The 404 page flags itself in an effect, which runs after this component's
  // first render (it sits earlier in the tree). Wait one tick so a hard load
  // of the 404 page never injects the loader before the flag is set.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(id);
  }, []);

  // Never load AdSense on an embed page — it's meant to be dropped into a
  // third-party iframe (WordPress, etc.) and must show nothing but the
  // snippet preview, with zero ad scripts or requests. Same for the 404 page and My Code.
  if (!ADS_ENABLED || !ready || isNotFoundPage || isEmbedRoute(pathname) || !adsAllowedOnPath(pathname)) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2762737943861458"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
