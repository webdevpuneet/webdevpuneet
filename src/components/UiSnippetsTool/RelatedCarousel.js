'use client';

import { useState } from 'react';
import { navStart } from '@/lib/navStart';
import rs from './RelatedCarousel.module.css';

const PAGE_SIZE = 6;

function RelatedCard({ sn, active }) {
  return (
    <a
      href={`/ui-snippets/${sn.id}/`}
      className={`${rs.card} ${active ? rs.cardActive : ''}`}
      title={sn.title}
      onClick={() => navStart()}
    >
      <img
        className={rs.thumb}
        src={`/images/ui-snippets/previews/${sn.id}.png`}
        alt={sn.title}
        loading="lazy"
      />
      <h4 className={rs.cardTitle}>{sn.title}</h4>
    </a>
  );
}

// Placed after the snippet's own source code, this replaces the old in-editor
// "Related" tab — a horizontal strip instead of a vertical list the reader
// had to click past to reach the actual code.
//
// `items` is the whole category (current snippet included, same as browsing
// it in the sidebar) ranked server-side (see @/lib/snippet-related) and
// passed in as a plain prop, so the ranking never has to run as client JS and
// the related links land in the raw server-rendered HTML. The grid opens on
// whichever page naturally contains the current snippet — same windowing
// formula the sidebar uses for its own active-snippet list — instead of
// always starting at page 1. It is a plain in-page section: no floating
// slide-up dock and no edge button.

// One-line strip of every category (links to the category pages). Hovering or
// focusing it opens a panel below with two columns — every category and every tag —
// over the content. Rendered in the snippet page header (UiSnippetsTool); `inHeader`
// drops the section spacing it had when it sat above the related cards.
function PanelChip({ href, label, active }) {
  return (
    <a
      href={href}
      className={`${rs.catChip} ${active ? rs.catChipActive : ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={() => navStart()}
    >
      {label}
    </a>
  );
}

export function CategoryStrip({ categories, tags = [], activeCategory, activeTag = null, inHeader = false }) {
  if (!categories?.length) return null;
  // The active category leads the row, so it is always visible without opening the strip.
  const ordered = activeCategory
    ? [...categories.filter(c => c.id === activeCategory), ...categories.filter(c => c.id !== activeCategory)]
    : categories;
  // On a tag page the active tag leads the row, highlighted, ahead of the categories.
  const leadTag = activeTag ? tags.find(t => t.id === activeTag) : null;
  return (
    <nav className={`${rs.catBar} ${inHeader ? rs.catBarHeader : ''}`} aria-label="Snippet categories">
      <div className={rs.catList}>
        {leadTag && (
          <a
            href={`/ui-snippets/tag/${leadTag.id}/`}
            className={`${rs.catChip} ${rs.catChipActive}`}
            aria-current="page"
            onClick={() => navStart()}
          >
            {leadTag.label}
          </a>
        )}
        {ordered.map(c => (
          <a
            key={c.id}
            href={`/ui-snippets/${c.id}/`}
            className={`${rs.catChip} ${c.id === activeCategory ? rs.catChipActive : ''}`}
            aria-current={c.id === activeCategory ? 'page' : undefined}
            onClick={() => navStart()}
          >
            {c.label}
          </a>
        ))}
      </div>
      <span className={rs.catMore} aria-hidden="true">
        More
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
      {inHeader && (
        <div className={rs.catPanel}>
          <div className={rs.catPanelInner}>
            <div className={rs.catCol}>
              <div className={rs.catColLabel}>Categories</div>
              <div className={rs.catColChips}>
                <PanelChip href="/ui-snippets/" label="All categories" active={!activeCategory && !activeTag} />
                {categories.map(c => (
                  <PanelChip key={c.id} href={`/ui-snippets/${c.id}/`} label={c.label} active={c.id === activeCategory} />
                ))}
              </div>
            </div>
            {tags.length > 0 && (
              <div className={rs.catCol}>
                <div className={rs.catColLabel}>Tags</div>
                <div className={rs.catColChips}>
                  {tags.map(t => (
                    <PanelChip key={t.id} href={`/ui-snippets/tag/${t.id}/`} label={t.label} active={t.id === activeTag} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default function RelatedCarousel({ items, total, activeId, category }) {
  const [start, setStart] = useState(() => {
    if (!items?.length) return 0;
    const idx = items.findIndex(sn => sn.id === activeId);
    if (idx < 0) return 0;
    let s = idx;
    let e = s + PAGE_SIZE;
    if (e > items.length) {
      e = items.length;
      s = Math.max(0, e - PAGE_SIZE);
    }
    return s;
  });

  const hasPrevPage = start > 0;
  const hasNextPage = items?.length ? start + PAGE_SIZE < items.length : false;
  const shown = items?.length ? items.slice(start, start + PAGE_SIZE) : [];
  const rangeEnd = items?.length ? Math.min(start + PAGE_SIZE, items.length) : 0;

  if (!items?.length) return null;

  return (
    <div className={rs.section}>
      <div className={rs.header}>
        <h2 className={rs.title}>Related Snippets</h2>
        <span className={rs.headCount}>{total ?? items.length} in {category ? `${category} category` : 'this category'}</span>
        <div className={rs.navBtns}>
          {items.length > PAGE_SIZE && (
            <span className={rs.pageIndicator}>{start + 1}–{rangeEnd} of {items.length}</span>
          )}
          <button
            type="button"
            className={rs.navBtn}
            onClick={() => setStart(s => Math.max(0, s - PAGE_SIZE))}
            disabled={!hasPrevPage}
            aria-label="See previous related snippets"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            type="button"
            className={rs.navBtn}
            onClick={() => setStart(s => (s + PAGE_SIZE < items.length ? s + PAGE_SIZE : s))}
            disabled={!hasNextPage}
            aria-label="See more related snippets"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div className={rs.track}>
        {shown.map(sn => <RelatedCard key={sn.id} sn={sn} active={sn.id === activeId} />)}
      </div>
    </div>
  );
}
