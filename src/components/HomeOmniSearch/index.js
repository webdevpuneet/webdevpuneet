'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';
import styles from './styles.module.css';

const POPULAR = ['CSS', 'JavaScript', 'React', 'Next.js', 'SVG', 'PDF'];
const MAX_TOOL_RESULTS = 5;
const MAX_SNIPPET_RESULTS = 5;

function matchTools(query) {
  const q = query.toLowerCase();
  return SEARCHABLE_TOOLS.filter(t =>
    t.name.toLowerCase().includes(q) ||
    (t.sub || '').toLowerCase().includes(q) ||
    (t.desc || '').toLowerCase().includes(q) ||
    t.slug.includes(q)
  ).slice(0, MAX_TOOL_RESULTS);
}

function matchSnippets(query, index) {
  if (!index) return [];
  const q = query.toLowerCase();
  return index
    .filter(sn => sn.title.toLowerCase().includes(q) || sn.category.toLowerCase().includes(q))
    .slice(0, MAX_SNIPPET_RESULTS);
}

export default function HomeOmniSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [snippetIndex, setSnippetIndex] = useState(null);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  // The 1962-snippet index is real weight (~200KB) — load it as its own chunk
  // on mount instead of bundling it into the homepage's initial JS.
  useEffect(() => {
    let cancelled = false;
    import('@/lib/snippet-search-index').then(mod => {
      if (!cancelled) setSnippetIndex(mod.SNIPPET_SEARCH_INDEX);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  const toolResults = useMemo(() => (query.trim() ? matchTools(query.trim()) : []), [query]);
  const snippetResults = useMemo(
    () => (query.trim() ? matchSnippets(query.trim(), snippetIndex) : []),
    [query, snippetIndex]
  );
  const flatResults = useMemo(
    () => [
      ...toolResults.map(t => ({ kind: 'tool', href: `/${t.slug}`, ...t })),
      ...snippetResults.map(s => ({ kind: 'snippet', href: `/ui-snippets/${s.id}/`, ...s })),
    ],
    [toolResults, snippetResults]
  );

  const showDropdown = open && query.trim().length > 0;

  function handleChange(e) {
    setQuery(e.target.value);
    setHighlight(-1);
    setOpen(true);
  }

  function handleChipClick(term) {
    setQuery(term);
    setOpen(true);
    setHighlight(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (!showDropdown || flatResults.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight(h => (h + 1) % flatResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight(h => (h - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === 'Enter') {
      const target = flatResults[highlight] ?? flatResults[0];
      if (target) window.location.href = target.href;
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.searchBar}>
        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          className={styles.searchInput}
          placeholder="Search tools, snippets, tutorials…"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="home-omni-results"
          aria-autocomplete="list"
          aria-label="Search tools, snippets, and tutorials"
        />
        {query && (
          <button
            type="button"
            className={styles.clearBtn}
            aria-label="Clear search"
            onClick={() => { setQuery(''); setHighlight(-1); inputRef.current?.focus(); }}
          >
            ✕
          </button>
        )}

        {showDropdown && (
          <div className={styles.dropdown} id="home-omni-results" role="listbox">
            {flatResults.length === 0 ? (
              <div className={styles.noResults}>
                No matches for &ldquo;{query.trim()}&rdquo;
              </div>
            ) : (
              <>
                {toolResults.length > 0 && (
                  <div className={styles.resultGroup}>
                    <div className={styles.resultGroupLabel}>Tools</div>
                    {toolResults.map((t, i) => {
                      const idx = i;
                      return (
                        <a
                          key={t.slug}
                          href={`/${t.slug}`}
                          role="option"
                          aria-selected={highlight === idx}
                          className={`${styles.resultRow} ${highlight === idx ? styles.resultRowActive : ''}`}
                          onMouseEnter={() => setHighlight(idx)}
                        >
                          <span className={styles.resultIcon} style={{ borderColor: t.accent + '55', background: t.accent + '18' }}>
                            {t.icon?.startsWith('/')
                              ? <img src={t.icon} alt="" width={16} height={16} />
                              : t.icon}
                          </span>
                          <span className={styles.resultBody}>
                            <span className={styles.resultTitle}>{t.name}</span>
                            {t.sub && <span className={styles.resultSub}>{t.sub}</span>}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
                {snippetResults.length > 0 && (
                  <div className={styles.resultGroup}>
                    <div className={styles.resultGroupLabel}>UI Snippets</div>
                    {snippetResults.map((s, i) => {
                      const idx = toolResults.length + i;
                      return (
                        <a
                          key={s.id}
                          href={`/ui-snippets/${s.id}/`}
                          role="option"
                          aria-selected={highlight === idx}
                          className={`${styles.resultRow} ${highlight === idx ? styles.resultRowActive : ''}`}
                          onMouseEnter={() => setHighlight(idx)}
                        >
                          <span className={styles.resultIcon}>{'</>'}</span>
                          <span className={styles.resultBody}>
                            <span className={styles.resultTitle}>{s.title}</span>
                            <span className={styles.resultSub}>{s.category}</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.popularRow}>
        <span className={styles.popularLabel}>Popular:</span>
        {POPULAR.map(term => (
          <button key={term} type="button" className={styles.popularChip} onClick={() => handleChipClick(term)}>
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
