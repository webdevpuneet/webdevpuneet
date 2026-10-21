'use client';

import { useState } from 'react';
import InViewImg from '../InViewImg';
import rs from '../UiSnippetsTool/RelatedCarousel.module.css';
import gs from '../SocialPostTemplates/styles.module.css';
import hs from './styles.module.css';

const PAGE = 6;
const WIDE_PAGE_SIZE = 4;

// Home page strips for Social Post Templates and Email Templates. The header and arrows
// match "Latest UI Snippets"; the cards are the template galleries' own cards (tall
// preview, category, name, version). `items` comes from the server as plain data:
// { id, title, href, img, cat, meta }.
// Hover pan at one steady speed for every preview: the duration is the hidden height in
// pixels divided by SCROLL_SPEED. JS measures it and only then starts the pan (data-pan),
// so even the first hover uses the right duration; a plain :hover rule would start the
// transition before the duration was set.
const SCROLL_SPEED = 160; // px per second on screen
export const panStart = ev => {
  const card = ev.currentTarget;
  const img = card.querySelector('img');
  if (img?.naturalWidth && img.clientWidth) {
    const hidden = img.clientWidth * (img.naturalHeight / img.naturalWidth) - img.clientHeight;
    img.style.setProperty('--scroll-dur', `${Math.max(0.4, hidden / SCROLL_SPEED).toFixed(2)}s`);
  }
  card.dataset.pan = '1';
};
export const panEnd = ev => { delete ev.currentTarget.dataset.pan; };
export const panHandlers = { onMouseEnter: panStart, onMouseLeave: panEnd, onFocus: panStart, onBlur: panEnd };

// `scroll`: on hover the preview pans slowly from the top of the image to the bottom.
// `flush`: inside AdSlot's related area, which already pads the sides.
// `activeId`: the current page's template, highlighted like the active card in Related Snippets.
// `wide`: landscape previews (website sections): four 16:10 cards per row instead of six portrait.
// `cols`: cards per row (and per page) for portrait cards, e.g. 4 on a template page.
export default function HomeTemplatesCarousel({ title, items, viewAllHref, viewAllText = 'View all', label, scroll = false, flush = false, activeId = null, wide = false, cols = null }) {
  const PAGE_SIZE = cols || (wide ? WIDE_PAGE_SIZE : PAGE);
  const activeIdx = activeId ? items?.findIndex(it => it.id === activeId) ?? -1 : -1;
  const [start, setStart] = useState(activeIdx > 0 ? Math.floor(activeIdx / PAGE_SIZE) * PAGE_SIZE : 0);
  if (!items?.length) return null;

  const total = items.length;
  const shown = items.slice(start, start + PAGE_SIZE);
  const rangeEnd = Math.min(start + PAGE_SIZE, total);
  const hasPrev = start > 0;
  const hasNext = start + PAGE_SIZE < total;

  return (
    <section className={rs.section} style={flush ? { paddingLeft: 0, paddingRight: 0 } : undefined} aria-label={title}>
      <div className={rs.header}>
        <h2 className={rs.title}>{title}</h2>
        <span className={rs.headCount}>{label || `${total} free templates`}</span>
        {viewAllHref && <a href={viewAllHref} className={rs.viewAll}>{viewAllText} &rarr;</a>}
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
      <div className={`${hs.grid} ${wide ? hs.gridWide : ''}`} style={cols ? { '--home-cols': cols } : undefined}>
        {shown.map(it => (
          <a key={it.id} href={it.href} className={`${gs.card} ${it.id === activeId ? hs.cardActive : ''}`} aria-current={it.id === activeId ? 'page' : undefined} {...(scroll ? panHandlers : {})}>
            <div className={`${gs.cardPreview} ${wide ? hs.previewWide : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <InViewImg className={`${gs.cardImg} ${scroll ? hs.scrollImg : ''}`} src={it.img} alt={`${it.title} template preview`} />
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
