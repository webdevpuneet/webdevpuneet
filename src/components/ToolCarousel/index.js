'use client';

import { useState } from 'react';
import rs from '@/components/UiSnippetsTool/RelatedCarousel.module.css';
import { usePeek, PeekPopup } from '@/components/UiSnippetsTool/RelatedCarousel';

const PAGE_SIZE = 6;

// Thumbnail card for a tool/playground: its preview image over the name, like the
// Latest UI Snippets cards. A tool without a preview image falls back to its icon.
function ToolCard({ tool, onPeek }) {
  const [noImg, setNoImg] = useState(false);
  return (
    <a
      href={`/${tool.slug}/`}
      className={rs.card}
      onClick={() => onPeek(null)}
      onMouseEnter={e => onPeek({ src: `/images/${tool.slug}.png`, title: tool.name }, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={() => onPeek(null)}
    >
      {noImg ? (
        <div className={rs.thumb} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
          <img src={`/icons/${tool.slug}.svg`} alt="" width={40} height={40} />
        </div>
      ) : (
        <img
          className={rs.thumb}
          src={`/images/${tool.slug}.png`}
          alt={tool.name}
          loading="lazy"
          onError={() => setNoImg(true)}
        />
      )}
      <h3 className={rs.cardTitle}>{tool.name}</h3>
    </a>
  );
}

// Six image cards per page with arrows for the rest — same header, arrows and cards as the
// Latest UI Snippets strip. Rendered inside AdSlot's .relatedFull, which already pads the sides.
export default function ToolCarousel({ title, count, tools, allHref, ariaLabel }) {
  const [start, setStart] = useState(0);
  const [peek, onPeek] = usePeek();
  if (!tools.length) return null;

  const total = tools.length;
  const shown = tools.slice(start, start + PAGE_SIZE);
  const rangeEnd = Math.min(start + PAGE_SIZE, total);
  const hasPrev = start > 0;
  const hasNext = start + PAGE_SIZE < total;

  return (
    <section className={rs.section} style={{ paddingLeft: 0, paddingRight: 0 }} aria-label={ariaLabel}>
      <div className={rs.header}>
        <h2 className={rs.title}>{title}</h2>
        <span className={rs.headCount}>{count}</span>
        <a href={allHref} className={rs.viewAll}>View all &rarr;</a>
        <div className={rs.navBtns}>
          <span className={rs.pageIndicator}>{start + 1}–{rangeEnd} of {total}</span>
          <button
            type="button"
            className={rs.navBtn}
            onClick={() => setStart(s => Math.max(0, s - PAGE_SIZE))}
            disabled={!hasPrev}
            aria-label="Show previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            type="button"
            className={rs.navBtn}
            onClick={() => setStart(s => s + PAGE_SIZE)}
            disabled={!hasNext}
            aria-label="Show next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div className={rs.track}>
        {shown.map(tool => <ToolCard key={tool.slug} tool={tool} onPeek={onPeek} />)}
      </div>
      <PeekPopup peek={peek} />
    </section>
  );
}
