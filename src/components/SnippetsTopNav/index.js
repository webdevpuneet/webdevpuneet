'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { CATEGORIES } from '@/components/UiSnippetsTool/categories';
import { VISIBLE_SNIPPET_INDEX } from '@/lib/snippet-index';

// Same lists the old header strip used: categories that have visible snippets, and the published tags.
const FIRST_CATEGORY = 'games';   // shown first in the row, ahead of the usual order
const CATS = CATEGORIES
  .filter(c => c.id !== 'all' && !c.devOnly)
  .filter(c => VISIBLE_SNIPPET_INDEX.some(sn => sn.category === c.id))
  .map(c => ({ id: c.id, label: c.label }))
  .sort((a, b) => (b.id === FIRST_CATEGORY) - (a.id === FIRST_CATEGORY));

// Top nav for /ui-snippets/: one horizontally scrollable row of categories (no hover panel).
export default function SnippetsTopNav() {
  const pathname = usePathname() || '';
  const parts = pathname.split('/').filter(Boolean);
  const activeCat = parts[1] && CATS.some(c => c.id === parts[1]) ? parts[1] : null;

  // Horizontal scroll with arrows, same as the language nav
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const cur = el.querySelector('[aria-current="page"]');
    if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
    return () => { el.removeEventListener('scroll', update); ro.disconnect(); };
  }, []);

  function scroll(dir) {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * Math.round(el.clientWidth / 3), behavior: 'smooth' });
  }

  return (
    <nav className={styles.bar} aria-label="Snippet categories">
      <div className={styles.row}>
        {canLeft && (
          <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(-1)} aria-label="Scroll left">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        <div className={styles.list} ref={scrollRef}>
          {CATS.map(c => (
            <a key={c.id} href={`/ui-snippets/${c.id}/`} className={`${styles.item} ${c.id === activeCat ? styles.itemActive : ''}`} aria-current={c.id === activeCat ? 'page' : undefined}>{c.label}</a>
          ))}
        </div>
        {canRight && (
          <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(1)} aria-label="Scroll right">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}
      </div>
    </nav>
  );
}
