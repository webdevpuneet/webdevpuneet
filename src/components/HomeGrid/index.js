'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import styles from './styles.module.css';

const INITIAL = 9;
const MOBILE_INITIAL = 5;
const PAGE_SIZE = 18;

const CATEGORIES = [
  { label: null,          href: '/',                 home: true },
  { label: 'Learn',       href: '/learn-to-code',    icon: '🎓' },
  { label: 'Snippets',    href: '/ui-snippets',      icon: '🧩' },
];

export default function HomeGrid({ tools, searchTools = tools }) {
  const [visible, setVisible] = useState(INITIAL);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 640px)').matches) setVisible(MOBILE_INITIAL);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return searchTools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      (t.desc || '').toLowerCase().includes(q) ||
      t.slug.includes(q) ||
      (t.sub && t.sub.toLowerCase().includes(q))
    );
  }, [query, searchTools]);

  const list  = filtered ?? tools;
  const shown = filtered ? list : list.slice(0, visible);
  const remaining = tools.length - visible;
  const allShown  = visible >= tools.length;

  function handleShowMore() {
    setVisible(v => Math.min(v + PAGE_SIZE, tools.length));
  }

  function highlight(text) {
    const q = query.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className={styles.mark}>{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  }

  return (
    <>
      {/* Category links */}
      <div className={styles.filters}>
        {CATEGORIES.map(c => (
          <a key={c.href} href={c.href} className={`${styles.categoryLink} ${c.home ? styles.categoryHome : ''}`}>
            {c.home ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Home">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            ) : (
              <>
                <span className={styles.categoryIcon}>{c.icon}</span>
                {c.label}
              </>
            )}
          </a>
        ))}
      </div>

      {/* Search bar */}
      <div className={styles.searchWrap}>
        <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          ref={searchRef}
          type="search"
          className={styles.searchInput}
          placeholder={`Search ${searchTools.length} tools…`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search tools"
        />
        {query && (
          <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Results meta */}
      {filtered !== null && (
        <div className={styles.searchMeta}>
          {filtered.length === 0
            ? `No tools match "${query}"`
            : `${filtered.length} tool${filtered.length !== 1 ? 's' : ''} found`}
        </div>
      )}

      {/* Grid */}
      {shown.length > 0 && (
        <div className={styles.grid}>
          {shown.map((tool) => (
            <a
              key={tool.slug}
              href={`/${tool.slug}`}
              className={styles.card}
              style={{ '--accent': tool.accent, '--accent-bg': tool.accent + '14', '--accent-border': tool.accent + '55' }}
            >
              <div className={styles.cardTop}>
                <div className={styles.cardIcon} style={{ color: tool.accent, background: tool.accent + '18', borderColor: tool.accent + '35' }}>
                  {tool.icon?.startsWith('/')
                    ? <img src={tool.icon} alt="" width={24} height={24} className={styles.cardIconImg} />
                    : tool.icon}
                </div>
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardTitle}>{highlight(tool.name)}</h3>
                  {tool.sub && <span className={styles.cardSub}>{tool.sub}</span>}
                </div>
                <svg className={styles.cardArrow} width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className={styles.cardDesc}>{highlight(tool.desc)}</p>
            </a>
          ))}
        </div>
      )}

      {/* Show more */}
      {filtered === null && !allShown && (
        <button className={styles.showMoreBtn} onClick={handleShowMore}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Show {Math.min(remaining, PAGE_SIZE)} more tools · {remaining} remaining
        </button>
      )}

      {filtered === null && allShown && visible > INITIAL && (
        <div className={styles.allShown}>All {tools.length} tools shown</div>
      )}
    </>
  );
}
