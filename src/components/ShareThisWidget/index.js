'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { isEmbedRoute } from '@/lib/is-embed-route';

const SHARETHIS_PROPERTY = '60ae07cf93080c0011ad8de0';
const SHARETHIS_PRODUCT = 'sticky-share-buttons';
const SHARETHIS_SRC = `https://platform-api.sharethis.com/js/sharethis.js#property=${SHARETHIS_PROPERTY}&product=${SHARETHIS_PRODUCT}`;

// ShareThis builds its sticky share bar once from the page's URL at
// load time and has no idea Next.js later swapped the page via client-side
// navigation — left alone, every share click would point back at whatever
// page the widget last saw.
//
// window.__sharethis__.initialize() is ShareThis's documented re-init hook,
// but it's only documented for their "inline-share-buttons" product — it does
// NOT reliably refresh the sticky share widget's share URL (confirmed: still
// stale after a route change even with the recommended 0.3-1s delay).
// window.__sharethis__.load(product, config) is the lower-level method
// ShareThis's own official React wrapper (sharethis-reactjs) calls internally
// to (re)render a given product with a specific config — including `url` — so
// call that directly with the current page's URL on every route change.
export default function ShareThisWidget() {
  const pathname = usePathname();
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!loadedRef.current) return;
    const id = setTimeout(() => {
      try {
        window.__sharethis__?.load(SHARETHIS_PRODUCT, {
          property: SHARETHIS_PROPERTY,
          url: window.location.href,
        });
      } catch {}
    }, 600);
    return () => clearTimeout(id);
  }, [pathname]);

  if (isEmbedRoute(pathname)) return null;

  return (
    <Script
      src={SHARETHIS_SRC}
      strategy="afterInteractive"
      onLoad={() => { loadedRef.current = true; }}
    />
  );
}
