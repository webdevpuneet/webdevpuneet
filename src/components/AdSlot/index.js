'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_ENABLED as ADS_CONFIG_ENABLED } from '@/lib/ads-config';
import { useIsNotFound, getNotFound } from '@/lib/not-found-state';
import RelatedStrip from '@/components/RelatedStrip';
import LatestBlogPostsCarousel from '@/components/LatestBlogPostsCarousel';
import styles from './styles.module.css';

// Ads are never shown on the 404 page.
function useAdsEnabled() {
  return ADS_CONFIG_ENABLED && !useIsNotFound();
}

function pushAd() {
  if (getNotFound()) return;
  try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
}

// 300×600 half-page ad — used inside SEO content after the features section
export function AdSlot300x600() {
  const ADS_ENABLED = useAdsEnabled();
  useEffect(() => {
    if (ADS_ENABLED) pushAd();
  }, [ADS_ENABLED]);

  if (!ADS_ENABLED) return null;

  return (
    <div className={styles.adSlot300Wrap}>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '300px', height: '600px' }}
        data-ad-client="ca-pub-2762737943861458"
        data-ad-slot="5223917455"
      />
    </div>
  );
}

export default function AdSlot({ contained = false, related = null, showBlog = true }) {
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
        {showBlog && <LatestBlogPostsCarousel />}
      </div>
    );
  }

  return (
    <div className={styles.adShell}>
      {relatedContent && (
        <div className={styles.relatedFull}>
          {relatedContent}
        </div>
      )}
      {showBlog && <LatestBlogPostsCarousel />}
      <div className={contained ? styles.adWrapContained : styles.adWrap}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2762737943861458"
          data-ad-slot="5223917455"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
