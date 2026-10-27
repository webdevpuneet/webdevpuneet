'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_ENABLED as ADS_CONFIG_ENABLED, adsAllowedOnPath } from '@/lib/ads-config';
import { useIsNotFound, getNotFound } from '@/lib/not-found-state';
import RelatedStrip from '@/components/RelatedStrip';
import styles from './styles.module.css';

// Ads are never shown on the 404 page or on My Code.
function useAdsEnabled() {
  const pathname = usePathname();
  const notFound = useIsNotFound();
  return ADS_CONFIG_ENABLED && !notFound && adsAllowedOnPath(pathname);
}

function pushAd() {
  if (getNotFound()) return;
  try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
}

// 300×600 half-page ad — the sticky column beside the SEO content (features, about…).
// AdSense unit "content-right-sticky" (slot 2059770203); fixed size, not "auto".
// At 1500px and below (SeoSection stacks the column under the content: tablets and phones) a
// fixed 300px ad would sit small in a wide column, so those screens get the full-width
// responsive unit (the same slot as the page-bottom AdSlot) instead. The choice is made once
// per page view, before the ad is requested.
export function AdSlot300x600() {
  const ADS_ENABLED = useAdsEnabled();
  const [wide, setWide] = useState(null);
  useEffect(() => {
    setWide(window.matchMedia('(min-width: 1501px)').matches);
  }, []);
  useEffect(() => {
    if (ADS_ENABLED && wide !== null) pushAd();
  }, [ADS_ENABLED, wide]);

  if (!ADS_ENABLED || wide === null) return null;

  if (!wide) {
    return (
      <div className={styles.adSlot300WrapFull}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2762737943861458"
          data-ad-slot="5223917455"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className={styles.adSlot300Wrap}>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '300px', height: '600px' }}
        data-ad-client="ca-pub-2762737943861458"
        data-ad-slot="2059770203"
      />
    </div>
  );
}

export default function AdSlot({ contained = false, related = null, adFirst = false }) {
  const pathname = usePathname();
  const slug = pathname?.split('/').filter(Boolean)[0];
  const ADS_ENABLED = useAdsEnabled();

  useEffect(() => {
    if (ADS_ENABLED) pushAd();
  }, [ADS_ENABLED]);

  // related={false}: the page renders its own related strip, so show none here.
  const relatedContent = related === false ? null : (related || (slug ? <RelatedStrip slug={slug} /> : null));

  if (!ADS_ENABLED) {
    return (
      <div className={styles.adShell}>
        {relatedContent && (
          <div className={styles.relatedFull}>
            {relatedContent}
          </div>
        )}
      </div>
    );
  }

  // Shown on every URL of the page, query strings included (?design=, ?id=, page numbers…).
  const ad = (
    <>
    <div className={contained ? styles.adWrapContained : adFirst ? styles.adWrapFull : styles.adWrap}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2762737943861458"
        data-ad-slot="5223917455"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
    </>
  );

  // The ad leads, above the related strip (tool pages and snippet pages alike).
  // adFirst only switches it to the full-width, centered wrapper.
  return (
    <div className={styles.adShell}>
      {ad}
      {relatedContent && (
        <div className={styles.relatedFull}>
          {relatedContent}
        </div>
      )}
    </div>
  );
}
