'use client';
import { useState, useMemo } from 'react';
import s from './styles.module.css';

const ALL_CATEGORIES = [
  { label: null,         href: '/',                 home: true },
  { label: 'All Tools',  href: '/tools',            icon: '🧰' },
  { label: 'CSS Tools',  href: '/css-tools',        icon: '🎨' },
  { label: 'Learn',      href: '/learn-to-code',    icon: '🎓' },
  { label: 'Snippets',   href: '/ui-snippets',      icon: '🧩' },
];

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className={s.mark}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function CategoryGrid({ tools, currentSlug }) {
  const [query, setQuery] = useState('');

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      (t.sub && t.sub.toLowerCase().includes(q))
    );
  }, [query, tools]);

  return (
    <>
      {/* Category nav pills */}
      <div className={s.filters}>
        {ALL_CATEGORIES.map(c => (
          <a
            key={c.href}
            href={c.href}
            className={`${s.categoryLink} ${c.home ? s.categoryHome : ''} ${currentSlug && c.href === `/${currentSlug}` ? s.categoryLinkActive : ''}`}
          >
            {c.home ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Home">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            ) : (
              <>
                <span className={s.categoryIcon}>{c.icon}</span>
                {c.label}
              </>
            )}
          </a>
        ))}
      </div>

      {/* Search bar */}
      <div className={s.searchWrap}>
        <svg className={s.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="search"
          className={s.searchInput}
          placeholder={`Search ${tools.length} tools…`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search tools"
        />
        {query && (
          <button className={s.searchClear} onClick={() => setQuery('')} aria-label="Clear search">✕</button>
        )}
      </div>

      {query && (
        <div className={s.searchMeta}>
          {shown.length === 0
            ? `No tools match "${query}"`
            : `${shown.length} tool${shown.length !== 1 ? 's' : ''} found`}
        </div>
      )}

      {/* Grid — all tools in initial HTML for Google */}
      {shown.length > 0 ? (
        <div className={s.grid}>
          {shown.map(tool => (
            <a
              key={tool.slug}
              href={`/${tool.slug}`}
              className={s.card}
              style={{ '--accent': tool.accent, '--accent-border': tool.accent + '55' }}
            >
              <div className={s.cardTop}>
                <div
                  className={s.cardIcon}
                  style={{ color: tool.accent, background: tool.accent + '18', borderColor: tool.accent + '35' }}
                >
                  {tool.icon?.startsWith('/')
                    ? <img src={tool.icon} alt="" width={22} height={22} style={{ display: 'block' }} />
                    : tool.icon}
                </div>
                <div className={s.cardMeta}>
                  <h3 className={s.cardTitle}>{highlight(tool.name, query)}</h3>
                  {tool.sub && <span className={s.cardSub}>{tool.sub}</span>}
                </div>
                <svg className={s.cardArrow} width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className={s.cardDesc}>{highlight(tool.desc, query)}</p>
            </a>
          ))}
        </div>
      ) : (
        <div className={s.empty}>No tools match &ldquo;{query}&rdquo;</div>
      )}
    </>
  );
}
