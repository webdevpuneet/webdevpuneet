'use client';

import { useState } from 'react';
import rs from '@/components/UiSnippetsTool/RelatedCarousel.module.css';
import seo from '@/components/SeoSection/styles.module.css';
import styles from './styles.module.css';
import { LIVE_TOOLS } from '@/lib/tools-registry';

const PAGE_SIZE = 6;

// Every live tool that isn't a playground (CSS tools first, then the rest).
const TOOLS = LIVE_TOOLS
  .filter(t => t.slug !== 'ui-snippets' && !t.slug.endsWith('-playground'))
  .sort((a, b) => (a.category === 'css' ? 0 : 1) - (b.category === 'css' ? 0 : 1));

// Home page tools strip: six at a time, arrows page through the rest. Header and arrows
// match the "Latest UI Snippets" carousel; the cards are the "Learn Coding Visually" ones.
// Rendered inside AdSlot's .relatedFull, which already pads the sides.
export default function ToolsStrip() {
  const [start, setStart] = useState(0);
  if (!TOOLS.length) return null;

  const total = TOOLS.length;
  const shown = TOOLS.slice(start, start + PAGE_SIZE);
  const rangeEnd = Math.min(start + PAGE_SIZE, total);
  const hasPrev = start > 0;
  const hasNext = start + PAGE_SIZE < total;

  return (
    <section className={rs.section} style={{ paddingLeft: 0, paddingRight: 0 }} aria-label="Free developer tools">
      <div className={rs.header}>
        <h2 className={rs.title}>Free Developer Tools</h2>
        <span className={rs.headCount}>{total} tools</span>
        <a href="/css-tools/" className={rs.viewAll}>View all &rarr;</a>
        <div className={rs.navBtns}>
          <span className={rs.pageIndicator}>{start + 1}–{rangeEnd} of {total}</span>
          <button
            type="button"
            className={rs.navBtn}
            onClick={() => setStart(s => Math.max(0, s - PAGE_SIZE))}
            disabled={!hasPrev}
            aria-label="Show previous tools"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            type="button"
            className={rs.navBtn}
            onClick={() => setStart(s => s + PAGE_SIZE)}
            disabled={!hasNext}
            aria-label="Show next tools"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        {shown.map(tool => (
          <a key={tool.slug} href={`/${tool.slug}/`} className={seo.ymalCard} title={tool.name}>
            <span className={seo.ymalIconWrap}>
              <img src={`/icons/${tool.slug}.svg`} alt="" width={20} height={20} className={seo.ymalIcon} />
            </span>
            <span className={seo.ymalBody}>
              <span className={seo.ymalName}>{tool.name}</span>
              <span className={seo.ymalDesc}>{tool.sub || tool.desc}</span>
            </span>
            <svg className={seo.ymalArrow} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
