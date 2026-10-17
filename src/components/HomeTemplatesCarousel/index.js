'use client';

import { useState } from 'react';
import rs from '../UiSnippetsTool/RelatedCarousel.module.css';
import gs from '../SocialPostTemplates/styles.module.css';
import hs from './styles.module.css';

const PAGE_SIZE = 6;

// Home page strips for Social Post Templates and Email Templates. The header and arrows
// match "Latest UI Snippets"; the cards are the template galleries' own cards (tall
// preview, category, name, version). `items` comes from the server as plain data:
// { id, title, href, img, cat, meta }.
// Scroll time grows with how much of the image is hidden, so long emails move at the same pace
export const scrollDuration = img => {
  const hidden = img.naturalHeight / img.naturalWidth - img.clientHeight / img.clientWidth;
  img.style.setProperty('--scroll-dur', `${Math.max(1.5, hidden * 4.5).toFixed(1)}s`);
};

// `scroll`: on hover the preview pans slowly from the top of the image to the bottom
export default function HomeTemplatesCarousel({ title, items, viewAllHref, label, scroll = false }) {
  const [start, setStart] = useState(0);
  if (!items?.length) return null;

  const total = items.length;
  const shown = items.slice(start, start + PAGE_SIZE);
  const rangeEnd = Math.min(start + PAGE_SIZE, total);
  const hasPrev = start > 0;
  const hasNext = start + PAGE_SIZE < total;

  return (
    <section className={rs.section} aria-label={title}>
      <div className={rs.header}>
        <h2 className={rs.title}>{title}</h2>
        <span className={rs.headCount}>{label || `${total} free templates`}</span>
        <a href={viewAllHref} className={rs.viewAll}>View all &rarr;</a>
        {total > PAGE_SIZE && (
          <div className={rs.navBtns}>
            <span className={rs.pageIndicator}>{start + 1}–{rangeEnd} of {total}</span>
            <button type="button" className={rs.navBtn} onClick={() => setStart(s => Math.max(0, s - PAGE_SIZE))} disabled={!hasPrev} aria-label={`Previous ${title.toLowerCase()}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button type="button" className={rs.navBtn} onClick={() => setStart(s => s + PAGE_SIZE)} disabled={!hasNext} aria-label={`Next ${title.toLowerCase()}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        )}
      </div>
      <div className={hs.grid}>
        {shown.map(it => (
          <a key={it.id} href={it.href} className={gs.card}>
            <div className={gs.cardPreview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={`${gs.cardImg} ${scroll ? hs.scrollImg : ''}`} src={it.img} alt={`${it.title} template preview`} loading="lazy" onLoad={scroll ? ev => scrollDuration(ev.currentTarget) : undefined} />
            </div>
            <div className={gs.cardBody}>
              {it.cat && <span className={gs.cardCat}>{it.cat}</span>}
              <h3 className={gs.cardTitle}>{it.title}</h3>
              {it.meta && <span className={gs.cardMeta}>{it.meta}</span>}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
