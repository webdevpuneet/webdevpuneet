'use client';

import { useState } from 'react';
import rs from '../UiSnippetsTool/RelatedCarousel.module.css';

const PAGE_SIZE = 6;

// The home page's "Latest UI Snippets" strip: the newest six first, and each
// arrow click brings the next six - all the way through the whole library.
// It reuses the Related Snippets carousel's look (same card, header and
// arrows) so the two feel like one design.
//
// `items` is the newest slice, ranked on the server and passed in as plain
// data, so the first paint (and the links a crawler sees) cost nothing extra.
// Only when the reader pages past that slice does the full {id, title} list
// load - lazily, from the same index the home page search already uses - so
// the client never imports the whole snippet library just to draw thumbnails.
// `flush`: rendered inside AdSlot's .relatedFull (tool pages), which already pads the sides.
export default function HomeSnippetsCarousel({ items, total, flush = false }) {
  const [start, setStart] = useState(0);
  const [all, setAll] = useState(null);        // the whole library, newest first, once loaded
  const [loading, setLoading] = useState(false);
  if (!items?.length) return null;

  const list = all || items;
  const grand = all ? all.length : (total ?? items.length);
  const shown = list.slice(start, start + PAGE_SIZE);
  const rangeEnd = Math.min(start + PAGE_SIZE, list.length);
  const hasPrev = start > 0;
  const hasNext = start + PAGE_SIZE < grand;

  async function next() {
    if (!hasNext || loading) return;
    const to = start + PAGE_SIZE;
    if (to < list.length) { setStart(to); return; }
    // The next page is beyond what the server sent: fetch the rest, then move on.
    setLoading(true);
    try {
      const mod = await import('@/lib/snippet-search-index');
      const full = [...mod.SNIPPET_SEARCH_INDEX].reverse();   // the index is oldest-first
      setAll(full);
      setStart(to);
    } catch {
      /* offline or chunk failed: stay where we are */
    }
    setLoading(false);
  }

  return (
    <section className={rs.section} style={flush ? { paddingLeft: 0, paddingRight: 0 } : undefined} aria-label="Latest UI snippets">
      <div className={rs.header}>
        <h2 className={rs.title}>Latest UI Snippets</h2>
        <span className={rs.headCount}>{grand.toLocaleString('en-US')} in the library</span>
        <a href="/ui-snippets/" className={rs.viewAll}>View all &rarr;</a>
        <div className={rs.navBtns}>
          <span className={rs.pageIndicator}>{(start + 1).toLocaleString('en-US')}–{rangeEnd.toLocaleString('en-US')} of {grand.toLocaleString('en-US')}</span>
          <button
            type="button"
            className={rs.navBtn}
            onClick={() => setStart(s => Math.max(0, s - PAGE_SIZE))}
            disabled={!hasPrev}
            aria-label="Show previous snippets"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            type="button"
            className={rs.navBtn}
            onClick={next}
            disabled={!hasNext || loading}
            aria-label="Show next snippets"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div className={`${rs.track} ${rs.trackThree}`}>
        {shown.map(sn => (
          <a
            key={sn.id}
            href={`/ui-snippets/${sn.id}/`}
            className={rs.card}
          >
            <img
              className={rs.thumb}
              src={`/images/ui-snippets/previews/${sn.id}.png`}
              alt={sn.title}
              loading={start === 0 ? 'eager' : 'lazy'}
            />
            <h3 className={rs.cardTitle}>{sn.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
