'use client';

import styles from '@/components/SeoSection/styles.module.css';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { RELATED_TOOLS } from '@/lib/related-tools';

export default function RelatedStrip({ slug }) {
  const relatedSlugs = RELATED_TOOLS[slug] || [];
  const tools = relatedSlugs
    .map(s => LIVE_TOOLS.find(t => t.slug === s))
    .filter(Boolean)
    .slice(0, 8);

  if (!tools.length) return null;

  return (
    <div className={styles.ymal}>
      <div className={styles.ymalHead}>
        <div>
          <h2 className={styles.ymalTitle}>Related Tools</h2>
        </div>
        <a href="/" className={styles.ymalSeeAll}>See all -&gt;</a>
      </div>
      <div className={styles.ymalScroll}>
        {tools.map(tool => (
          <a key={tool.slug} href={`/${tool.slug}/`} className={styles.ymalCard}>
            <span className={styles.ymalIconWrap}>
              <img src={`/icons/${tool.slug}.svg`} alt="" width={20} height={20} className={styles.ymalIcon} />
            </span>
            <span className={styles.ymalBody}>
              <span className={styles.ymalName}>{tool.name}</span>
              <span className={styles.ymalDesc}>{tool.sub || tool.desc}</span>
            </span>
            <svg className={styles.ymalArrow} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
