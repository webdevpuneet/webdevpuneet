'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_ENABLED, adsAllowedOnPath, noAutoAdsOnPath } from '@/lib/ads-config';
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

  // My Code: flag the page so globals.css hides auto-placed ads (they break the editor)
  useEffect(() => {
    document.documentElement.classList.toggle('no-auto-ads', noAutoAdsOnPath(pathname));
  }, [pathname]);

  // Never load AdSense on an embed page — it's meant to be dropped into a
  // third-party iframe (WordPress, etc.) and must show nothing but the
  // snippet preview, with zero ad scripts or requests. Same for the 404 page.
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
