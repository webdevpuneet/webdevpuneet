'use client';

import { useEffect } from 'react';
import { ADS_ENABLED } from '@/lib/ads-config';
import { useAdFreeOnLoad } from '@/lib/use-ad-free';
import { useIsNotFound } from '@/lib/not-found-state';
import s from './styles.module.css';

/* — Top ad for the UI Snippets GALLERY pages only (the library, a category, a tag, the My Code grid), placed under the top
   nav and above the UI Snippets / My Code / Create bar.
   Fully responsive, with NO height limit: data-ad-format="auto" + data-full-width-responsive, so AdSense picks any size that
   fits the width. That is safe here because gallery pages flow at their natural height. Do NOT use this on the editor
   pages: a responsive unit makes AdSense rewrite ancestor heights (height:auto / min-height:0 !important), which collapses
   the full-height editor; those keep the fixed-size PlaygroundTopAd.
   Same ad slot as the leaderboard (7360198340). Mount it with a `key` per gallery view so each view requests a fresh ad.
   The strip collapses itself when AdSense has no ad. — */
export default function GalleryTopAd({ className = '' }) {
  const notFound = useIsNotFound();
  const adFree = useAdFreeOnLoad();
  const show = ADS_ENABLED && !notFound && !adFree;
  useEffect(() => {
    if (!show) return undefined;
    const id = setTimeout(() => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {} }, 300);
    return () => clearTimeout(id);
  }, [show]);
  if (!show) return null;
  return (
    <div className={`${s.bar} ${className}`} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2762737943861458"
        data-ad-slot="7360198340"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
