'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_ENABLED as ADS_CONFIG_ENABLED } from '@/lib/ads-config';
import { useIsNotFound, getNotFound } from '@/lib/not-found-state';
import RelatedStrip from '@/components/RelatedStrip';
import BlogStrip from '@/components/BlogStrip';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import styles from './styles.module.css';

// Ads are never shown on the 404 page.
function useAdsEnabled() {
  return ADS_CONFIG_ENABLED && !useIsNotFound();
}

function pushAd() {
  if (getNotFound()) return;
  try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
}

// 300×600 half-page ad — the sticky column beside the SEO content (features, about…).
// AdSense unit "content-right-sticky" (slot 2059770203); fixed size, not "auto".
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
  // Tool pages (default related strip) get the blog strip right after Related Tools.
  // Custom `related` content (FrontendPlaygroundsStrip) already carries its own.
  const blogContent = related == null && slug ? <BlogStrip /> : null;

  if (!ADS_ENABLED) {
    return (
      <div className={styles.adShell}>
        {relatedContent && (
          <div className={styles.relatedFull}>
            {relatedContent}
            {blogContent}
          </div>
        )}
      </div>
    );
  }

  // Ads only belong on the canonical URL: any query string hides the ad, while
  // Related Tools and the blog strip still render (pages keep AdSlot outside IndexOnly).
  const ad = (
    <IndexOnly>
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
    </IndexOnly>
  );

  // The ad always leads, above the related strip (tool pages included).
  // adFirst only switches it to the full-width, centered wrapper.
  return (
    <div className={styles.adShell}>
      {ad}
      {relatedContent && (
        <div className={styles.relatedFull}>
          {relatedContent}
          {blogContent}
        </div>
      )}
    </div>
  );
}
