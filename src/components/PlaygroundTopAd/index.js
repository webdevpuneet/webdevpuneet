'use client';

import { useEffect, useRef, useState } from 'react';
import { ADS_ENABLED } from '@/lib/ads-config';
import { useAdFreeOnLoad } from '@/lib/use-ad-free';
import { useIsNotFound } from '@/lib/not-found-state';
import s from './styles.module.css';

/* — The site's top leaderboard (AdSense slot 7360198340). ONE component for every page: the four editors (Website
   Builder, Section / Email / Social Post Templates), their galleries, the UI snippet editor and galleries, the category
   pages and the Learn to Code playgrounds and tools.
   NOT shown on phones: below 768px wide there is no strip and no ad request (decided 2026-11-09; the phone layouts
   keep the page ad under the content instead).
   The size follows the width actually available in the main column, not the screen:
     970x90 large leaderboard → 728x90 leaderboard → 468x60 banner (tablets).
   Each size is a FIXED slot. Do NOT use data-ad-format="horizontal"/"auto" or
   data-full-width-responsive here: AdSense then rewrites ancestor inline styles to
   `height:auto !important; min-height:0 !important`, which collapses the editor layout.
   The size is picked once per page view; later resizes never re-request an ad (AdSense
   forbids refreshing without new content or a user action). Canonical URLs only, like
   every other ad on the site. — */
const SIZES = [
  { w: 970, h: 90 },
  { w: 728, h: 90 },
  { w: 468, h: 60 },
];

function AdIns({ w, h }) {
  useEffect(() => {
    const id = setTimeout(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
    }, 300);
    return () => clearTimeout(id);
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'inline-block', width: `${w}px`, height: `${h}px` }}
      data-ad-client="ca-pub-2762737943861458"
      data-ad-slot="7360198340"
    />
  );
}

function AdUnit() {
  const boxRef = useRef(null);
  const [size, setSize] = useState(null);
  useEffect(() => {
    const strip = boxRef.current?.parentElement;
    if (!strip) return;
    const pick = () => {
      // A strip collapsed by the unfilled rule (display:none) measures 0 wide; ignore it.
      if (strip.offsetParent === null || strip.clientWidth === 0) return;
      const cs = getComputedStyle(strip);
      const avail = strip.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const next = SIZES.find(z => z.w <= avail) || null;
      setSize(prev => prev ?? next);
    };
    pick();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(pick);
    ro.observe(strip);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={boxRef} className={s.unit} style={size ? { width: size.w, height: size.h } : undefined}>
      {size && <AdIns key={size.w} w={size.w} h={size.h} />}
    </div>
  );
}

// `inline` sits the strip inside a tool's title row (title left, ad filling the rest).
// `className` lets a padded main column pull the strip out to its edges (HTML playground).
// `desktopOnly`: stricter cut-off, no strip below 900px instead of the default 768px.
export default function PlaygroundTopAd({ className = '', inline = false, desktopOnly = false }) {
  const notFound = useIsNotFound();
  const [wide, setWide] = useState(false); // false until measured: nothing is rendered, and no ad requested, on a phone
  const adFree = useAdFreeOnLoad();
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${desktopOnly ? 900 : 768}px)`);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [desktopOnly]);
  if (!ADS_ENABLED || notFound || adFree || !wide) return null;
  return (
    <div className={`${s.bar} ${inline ? s.inline : ''} ${className}`} aria-label="Advertisement">
      <AdUnit />
    </div>
  );
}
