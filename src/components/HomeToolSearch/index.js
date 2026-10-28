'use client';

import { useMemo, useState } from 'react';
import styles from './styles.module.css';

const STEP = 10; // show this many at first, and this many more on each click

// Home page "Free Developer Tools" finder: a search box plus category chips over
// every live tool. `tools`: [{ slug, name, sub, desc, icon, accent, category }],
// `categories`: [{ id, label }] (only the ones that have tools).
export default function HomeToolSearch({ tools, categories, noun = 'tools', placeholder, allHref = '/tools/', step = STEP, searchable = true }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [visible, setVisible] = useState(step);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter(t =>
      (cat === 'all' || t.category === cat) &&
      (!q || t.name.toLowerCase().includes(q) || t.slug.includes(q) ||
        (t.sub || '').toLowerCase().includes(q) || (t.desc || '').toLowerCase().includes(q))
    );
  }, [tools, query, cat]);

  const filtering = query.trim() || cat !== 'all';
  const shown = filtering ? list : list.slice(0, visible);

  return (
    <div className={styles.wrap}>
      {(searchable || categories.length > 0) && <div className={styles.controls}>
        {searchable && <label className={styles.search}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder || `Search ${noun} — "gradient", "json", "shadow"…`}
            aria-label={`Search ${noun}`}
          />
        </label>}
        {categories.length > 0 && <div className={styles.chips} role="group" aria-label={`Filter ${noun} by category`}>
          {[{ id: 'all', label: 'All' }, ...categories].map(c => (
            <button
              key={c.id}
              type="button"
              className={`${styles.chip} ${cat === c.id ? styles.chipOn : ''}`}
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>}
      </div>}

      {shown.length === 0 ? (
        <p className={styles.empty}>No {noun} match &ldquo;{query}&rdquo;. <a href={allHref}>Browse the full list</a>.</p>
      ) : (
        <ul className={styles.grid}>
          {shown.map(t => (
            <li key={t.slug}>
              <a href={`/${t.slug}/`} className={styles.item}>
                <span className={styles.icon} style={{ background: t.accent + '18', borderColor: t.accent + '38' }}>
                  {t.icon?.startsWith('/')
                    ? <img src={t.icon} alt="" width={15} height={15} />
                    : <span style={{ color: t.accent }}>{t.icon}</span>}
                </span>
                <span className={styles.body}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.sub}>{t.sub}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {!filtering && list.length > visible && (
        <div className={styles.moreRow}>
          <button type="button" className={styles.more} onClick={() => setVisible(v => v + step)}>
            Show more {noun}
          </button>
        </div>
      )}
    </div>
  );
}
