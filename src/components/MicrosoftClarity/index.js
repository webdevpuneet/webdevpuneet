'use client';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { isEmbedRoute } from '@/lib/is-embed-route';
import { CLARITY_ENABLED } from '@/lib/tracking-config';

// Microsoft Clarity (heatmaps and session recordings). Clarity follows client-side
// route changes itself, so loading it once here tracks every page of the site.
// Skipped in development and on embed pages for the same reasons as GoogleAnalytics.
export default function MicrosoftClarity() {
  const pathname = usePathname();
  // Off switch: src/lib/tracking-config.js (the layout also skips this component)
  if (!CLARITY_ENABLED || process.env.NODE_ENV !== 'production' || isEmbedRoute(pathname)) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">{`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "z01zumm6t7");
    `}</Script>
  );
}
