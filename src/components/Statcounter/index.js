'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { isEmbedRoute } from '@/lib/is-embed-route';
import { STATCOUNTER_ENABLED } from '@/lib/tracking-config';

// Statcounter (invisible counter, project 13361076). Its script counts the page it
// loads on; the site switches pages client-side, so later pages are recorded with
// _statcounter.record_pageview(). Skipped in development and on embed pages, like
// GoogleAnalytics.
const SC_PROJECT = 13361076;
const SC_SECURITY = '4423db42';

export default function Statcounter() {
  const pathname = usePathname();
  const first = useRef(true);
  const off = !STATCOUNTER_ENABLED || process.env.NODE_ENV !== 'production' || isEmbedRoute(pathname);

  // Client-side navigations: the first page is counted by counter.js itself
  useEffect(() => {
    if (off) return;
    if (first.current) { first.current = false; return; }
    try { window._statcounter?.record_pageview?.(); } catch { /* blocked or not loaded */ }
  }, [pathname, off]);

  if (off) return null;
  return (
    <>
      <Script id="statcounter-init" strategy="afterInteractive">{`
        var sc_project=${SC_PROJECT};
        var sc_invisible=1;
        var sc_security="${SC_SECURITY}";
      `}</Script>
      <Script id="statcounter" src="https://www.statcounter.com/counter/counter.js" strategy="afterInteractive" />
      <noscript>
        <div className="statcounter">
          <a title="Web Analytics Made Easy - Statcounter" href="https://statcounter.com/" target="_blank" rel="noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="statcounter" src={`https://c.statcounter.com/${SC_PROJECT}/0/${SC_SECURITY}/1/`} alt="Web Analytics Made Easy - Statcounter" referrerPolicy="no-referrer-when-downgrade" />
          </a>
        </div>
      </noscript>
    </>
  );
}
