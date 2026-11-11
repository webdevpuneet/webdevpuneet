'use client';

import { useEffect, useState } from 'react';
import rs from '../UiSnippetsTool/RelatedCarousel.module.css';
import InViewImg from '../InViewImg';
import { PremiumBadge } from '@/components/PremiumGate';
import { isPremiumGameSnippet } from '@/lib/premium';
import { CATEGORIES } from '@/components/UiSnippetsTool/categories';

// Category tag text: a ready label (`cat`) or looked up from the category id (`category`, as in the Latest strip and the full index)
const catOf = sn => sn.cat || CATEGORIES.find(c => c.id === sn.category)?.label || '';

const PAGE_SIZE = 5;

// The home page's "Latest UI Snippets" strip: the newest five first, and each
// arrow click brings the next five - all the way through the whole library.
// It reuses the Related Snippets carousel's look (same card, header and
// arrows) so the two feel like one design.
//
// `items` is the newest slice, ranked on the server and passed in as plain
// data, so the first paint (and the links a crawler sees) cost nothing extra.
// Only when the reader pages past that slice does the full {id, title} list
// load - lazily, from the same index the home page search already uses - so
// the client never imports the whole snippet library just to draw thumbnails.
// `flush`: rendered inside AdSlot's .relatedFull (tool pages), which already pads the sides.
// `title`: the heading (default "Latest UI Snippets"). `shuffle`: reorder `items` randomly in the visitor's browser after
// the first paint (the server-rendered order stays as the crawlable HTML), and show a Shuffle button; the strip then
// stays within `items` instead of paging through the whole library.
// `games`: with `shuffle`, a pool of Patreon games. The strip then shows FIVE cards in one row: 3 random games + 2 random items from
// `items`, mixed into random positions; every card gets a category tag (and games the Patreon badge).
const mixed = list => [...list].sort(() => Math.random() - 0.5);
export default function HomeSnippetsCarousel({ items, total, flush = false, title = 'Latest UI Snippets', shuffle = false, games = null }) {
  const mix = shuffle && games?.length > 0;
  // First paint (the server HTML): a fixed alternation, so the markup is stable; the browser then re-picks at random
  const firstMix = () => {
    const g = games.slice(0, 3), o = items.slice(0, 2), out = [];
    for (let i = 0; i < 3; i++) { if (g[i]) out.push(g[i]); if (o[i]) out.push(o[i]); }
    return out;
  };
  const [start, setStart] = useState(0);
  const [all, setAll] = useState(null);        // the whole library, newest first, once loaded
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(() => (mix ? firstMix() : items));   // items in the order shown
  const reshuffle = () => {
    setOrder(mix ? mixed([...mixed(games).slice(0, 3), ...mixed(items).slice(0, 2)]) : mixed(items));
    setStart(0);
  };
  useEffect(() => { if (shuffle) reshuffle(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!items?.length) return null;

  const pageSize = PAGE_SIZE;
  const list = all || order;
  const grand = all ? all.length : (total ?? items.length);
  const shown = list.slice(start, start + pageSize);
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
    <section className={rs.section} style={flush ? { paddingLeft: 0, paddingRight: 0 } : undefined} aria-label={title}>
      <div className={rs.header}>
        <h2 className={rs.title}>{title}</h2>
        {!shuffle && <span className={rs.headCount}>{`${grand.toLocaleString('en-US')} in the library`}</span>}
        {shuffle && <button type="button" className={rs.viewAll} onClick={reshuffle} style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit' }}>Shuffle ↻</button>}
        <a href="/ui-snippets/" className={rs.viewAll}>View all &rarr;</a>
        <div className={rs.navBtns}>
          {!shuffle && <span className={rs.pageIndicator}>{(start + 1).toLocaleString('en-US')}–{rangeEnd.toLocaleString('en-US')} of {grand.toLocaleString('en-US')}</span>}
          {/* The shuffled strip shows just five at a time: no paging arrows, the Shuffle link brings another five */}
          {!shuffle && (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className={`${rs.track} ${rs.trackThree}`}>
        {shown.map(sn => (
          <a
            key={sn.id}
            href={`/ui-snippets/${sn.id}/`}
            className={rs.card}
          >
            {/* The first five are above the fold: load them straight away. The rest wait until they are in view. */}
            {start === 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={rs.thumb}
                src={`/images/ui-snippets/previews/${sn.id}.png`}
                alt={sn.title}
                loading="eager"
              />
            ) : (
              <InViewImg
                className={rs.thumb}
                src={`/images/ui-snippets/previews/${sn.id}.png`}
                alt={sn.title}
              />
            )}
            {catOf(sn) && <span className={`${rs.catTag} ${sn.game || sn.category === 'games' ? rs.catTagGame : ''}`}>{catOf(sn)}</span>}
            {(sn.game || isPremiumGameSnippet(sn)) && <PremiumBadge corner kind="game" />}
            <h3 className={rs.cardTitle}>{sn.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
