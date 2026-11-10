'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ADS_ENABLED } from '@/lib/ads-config';
import { useAdFreeOnLoad } from '@/lib/use-ad-free';
import { useIsNotFound } from '@/lib/not-found-state';
import s from './styles.module.css';

/* — The site's top leaderboard (AdSense slot 7360198340). ONE component for every page: the four editors (Website
   Builder, Section / Email / Social Post Templates), their galleries, the UI snippet editor and galleries, the category
   pages and the Learn to Code playgrounds and tools.
   Shown on phones too (2026-11-10, reversing the 2026-11-09 decision to hide it below 768px): the UI snippet pages,
   the Website Builder, Section / Email / Social Post Templates and their galleries all keep the strip on a phone.
   The size follows the width actually available in the main column, not the screen:
     970x90 large leaderboard → 728x90 leaderboard → 468x60 banner (tablets) → 320x50 mobile banner → 300x50 (phones).
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
  { w: 320, h: 50 },
  { w: 300, h: 50 },
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

function AdUnit({ onNoFit }) {
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
      if (!next) onNoFit?.();   // narrower than the smallest banner (320): no strip at all
      setSize(prev => prev ?? next);
    };
    pick();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(pick);
    ro.observe(strip);
    return () => ro.disconnect();
  }, [onNoFit]);
  return (
    <div ref={boxRef} className={s.unit} style={size ? { width: size.w, height: size.h } : undefined}>
      {size && <AdIns key={size.w} w={size.w} h={size.h} />}
    </div>
  );
}

// `inline` sits the strip inside a tool's title row (title left, ad filling the rest).
// `className` lets a padded main column pull the strip out to its edges (HTML playground).
// `desktopOnly` is still accepted by some callers but no longer has any effect: the strip is shown on phones as well.
export default function PlaygroundTopAd({ className = '', inline = false }) {
  const notFound = useIsNotFound();
  const [noFit, setNoFit] = useState(false); // the column is narrower than the smallest banner
  const adFree = useAdFreeOnLoad();
  const onNoFit = useCallback(() => setNoFit(true), []);
  if (!ADS_ENABLED || notFound || adFree || noFit) return null;
  return (
    <div className={`${s.bar} ${inline ? s.inline : ''} ${className}`} aria-label="Advertisement">
      <AdUnit onNoFit={onNoFit} />
    </div>
  );
}
