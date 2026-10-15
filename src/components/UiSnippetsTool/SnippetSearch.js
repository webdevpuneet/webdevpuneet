'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import s from './SnippetSearch.module.css';

const PAGE_SIZE = 10;
// Same key + event the gallery uses to drive the sidebar's library search
const LIB_QUERY_KEY = 'uis_sidebar_query';
const SYNC_EVENT = 'uis-filters-changed';

function syncSidebarQuery(value) {
  try {
    if (value) localStorage.setItem(LIB_QUERY_KEY, value);
    else localStorage.removeItem(LIB_QUERY_KEY);
  } catch {}
  window.dispatchEvent(new Event(SYNC_EVENT));
}
const PEEK_W = 300; // hover preview width (matches .peek)
const PEEK_GAP = 8;

// Small search box for the preview toolbar. Focusing it opens a drop-down of
// snippets; typing filters by title, id and category. The panel is
// position:fixed (placed from the input's rect) so the toolbar's horizontal
// scroller can't clip it.
export default function SnippetSearch({ snippets, categoryLabels, activeId, onNavigate }) {
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState(null); // null = closed
  const [hi, setHi] = useState(0);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [peekOn, setPeekOn] = useState(false); // a row is hovered (or arrowed to)
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const list = !words.length ? snippets : snippets.filter(sn => {
      const hay = `${sn.title} ${sn.id} ${categoryLabels.get(sn.category) || sn.category || ''}`.toLowerCase();
      return words.every(w => hay.includes(w));
    });
    return { total: list.length, items: list.slice(0, limit) };
  }, [query, snippets, categoryLabels, limit]);
  const hasMore = results.total > results.items.length;
  const showMore = () => setLimit(l => l + PAGE_SIZE);

  useEffect(() => { setHi(0); setLimit(PAGE_SIZE); listRef.current?.scrollTo(0, 0); }, [query]);

  // Shares the sidebar's saved query: restored after navigation (each snippet is a
  // full page load) and kept in step when the sidebar or gallery search changes.
  useEffect(() => {
    const load = () => {
      try { setQuery(localStorage.getItem(LIB_QUERY_KEY) || ''); } catch {}
    };
    load();
    window.addEventListener(SYNC_EVENT, load);
    return () => window.removeEventListener(SYNC_EVENT, load);
  }, []);

  // Keep the highlighted row in view while arrowing through the list
  useEffect(() => {
    listRef.current?.children[hi]?.scrollIntoView({ block: 'nearest' });
  }, [hi]);

  // Close on outside click, and on resize/scroll (the fixed coords would go stale)
  useEffect(() => {
    if (!pos) return;
    const onDown = e => { if (!wrapRef.current?.contains(e.target)) setPos(null); };
    const close = () => setPos(null);
    // Capture phase so elements that stop propagation can't swallow the click
    document.addEventListener('pointerdown', onDown, true);
    // Clicks inside the preview iframe never reach this document; the window blurs instead
    window.addEventListener('blur', close);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', onDown, true);
      window.removeEventListener('blur', close);
      window.removeEventListener('resize', close);
    };
  }, [pos]);

  function open() {
    const r = inputRef.current.getBoundingClientRect();
    const w = Math.min(360, window.innerWidth - 16); // matches .panel width
    const left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8));
    // Preview goes left of the drop-down; flip right if there's no room, hide if neither fits
    const peekSide = left >= PEEK_W + PEEK_GAP + 8 ? 'left'
      : window.innerWidth - (left + w) >= PEEK_W + PEEK_GAP + 8 ? 'right'
      : null;
    setPos({ top: r.bottom + 4, left, peekSide });
    setPeekOn(false);
  }

  function go(sn) {
    if (!sn) return;
    setPos(null);
    setLimit(PAGE_SIZE);
    if (sn.id === activeId) return;
    onNavigate?.();
    window.location.href = `/ui-snippets/${sn.id}/`;
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') { setPos(null); inputRef.current.blur(); return; }
    if (!pos) { if (e.key === 'ArrowDown' || e.key === 'Enter') open(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') setPeekOn(true);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Arrowing past the last row loads the next page
      if (hi >= results.items.length - 1 && hasMore) showMore();
      setHi(h => Math.min(Math.min(results.total, limit + PAGE_SIZE) - 1, h + 1));
    }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi(h => Math.max(0, h - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results.items[hi]); }
  }

  return (
    <div ref={wrapRef} className={s.wrap}>
      <svg className={s.icon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      <input
        ref={inputRef}
        className={s.input}
        type="search"
        value={query}
        placeholder="Search snippets"
        aria-label="Search UI snippets"
        aria-expanded={!!pos}
        aria-haspopup="listbox"
        onChange={e => { setQuery(e.target.value); syncSidebarQuery(e.target.value); if (!pos) open(); }}
        onFocus={open}
        onClick={() => { if (!pos) open(); }}
        onKeyDown={onKeyDown}
      />
      {pos && (
        <div className={s.pop} style={{ top: pos.top, left: pos.left }}>
        {peekOn && pos.peekSide && results.items[hi] && (
          <div className={`${s.peek} ${pos.peekSide === 'right' ? s.peekRight : ''}`} aria-hidden="true">
            <div className={s.peekImg}>
              <img
                key={results.items[hi].id}
                src={`/images/ui-snippets/previews/${results.items[hi].id}.png`}
                alt=""
                onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
              />
            </div>
          </div>
        )}
        <div className={s.panel}>
          <div className={s.head}>
            {query.trim()
              ? `${results.total.toLocaleString('en-US')} match${results.total === 1 ? '' : 'es'}`
              : `${results.total.toLocaleString('en-US')} snippets — type to filter`}
          </div>
          {results.items.length === 0 ? (
            <div className={s.empty}>No snippets found</div>
          ) : (
            <ul
              ref={listRef}
              className={s.list}
              role="listbox"
              onMouseLeave={() => setPeekOn(false)}
              // Infinite scroll: next 10 once the user nears the bottom
              onScroll={e => {
                const el = e.currentTarget;
                if (hasMore && el.scrollTop + el.clientHeight >= el.scrollHeight - 40) showMore();
              }}
            >
              {results.items.map((sn, i) => (
                <li
                  key={sn.id}
                  role="option"
                  aria-selected={i === hi}
                  className={`${s.item} ${i === hi ? s.itemHi : ''} ${sn.id === activeId ? s.itemActive : ''}`}
                  onMouseEnter={() => { setHi(i); setPeekOn(true); }}
                  onMouseDown={e => e.preventDefault()} // keep input focus so the click lands
                  onClick={() => go(sn)}
                >
                  <span className={s.thumb}>
                    <img
                      src={`/images/ui-snippets/previews/${sn.id}.png`}
                      alt=""
                      loading="lazy"
                      onError={e => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                  </span>
                  <span className={s.text}>
                    <span className={s.title}>{sn.title}</span>
                    {sn.category && <span className={s.cat}>{categoryLabels.get(sn.category) || sn.category}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {hasMore && (
            <button
              type="button"
              className={s.more}
              onMouseDown={e => e.preventDefault()}
              onClick={showMore}
            >
              Show more ({results.items.length.toLocaleString('en-US')} of {results.total.toLocaleString('en-US')})
            </button>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
