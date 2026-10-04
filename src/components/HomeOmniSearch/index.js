'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';
import styles from './styles.module.css';

const POPULAR = ['CSS', 'JavaScript', 'React'];
const MAX_TOOL_RESULTS = 8;
const MAX_SNIPPET_RESULTS = 5;

// Every tool on this site plus every tool that still lives on fwdtools.com (external
// links). Name matches rank first, then slug, then the longer description text; tools on
// this site win ties.
function matchTools(query, externalTools) {
  const q = query.toLowerCase();
  const local = new Set(SEARCHABLE_TOOLS.map(t => t.slug));
  const pool = [
    ...SEARCHABLE_TOOLS.map(t => ({ ...t, external: false })),
    ...(externalTools || [])
      .filter(t => !local.has(t.slug))
      .map(t => ({ slug: t.slug, name: t.name, icon: t.icon, accent: '#64748b', sub: 'on fwdtools.com', external: true })),
  ];
  const scored = [];
  for (const t of pool) {
    const name = t.name.toLowerCase();
    let score = 0;
    if (name.startsWith(q)) score = 5;
    else if (name.split(/[\s\-/·]+/).some(w => w.startsWith(q))) score = 4;
    else if (name.includes(q)) score = 3;
    else if (t.slug.includes(q)) score = 2;
    else if (!t.external && ((t.sub || '').toLowerCase().includes(q) || (t.desc || '').toLowerCase().includes(q))) score = 1;
    if (score) scored.push({ t, score });
  }
  scored.sort((a, b) => b.score - a.score || (a.t.external - b.t.external));
  return scored.slice(0, MAX_TOOL_RESULTS).map(x => x.t);
}

function toolHref(t) {
  return t.external ? `https://fwdtools.com/${t.slug}/` : `/${t.slug}`;
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
  const [externalTools, setExternalTools] = useState(null);
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

  // fwdtools' tool list, also its own chunk: only needed once someone starts typing.
  useEffect(() => {
    let cancelled = false;
    import('@/data/fwdtools-sidebar.json').then(mod => {
      const d = mod.default || mod;
      const list = [...(d.freelancer || []), ...d.categories.flatMap(c => c.tools)];
      if (!cancelled) setExternalTools(list);
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

  const toolResults = useMemo(() => (query.trim() ? matchTools(query.trim(), externalTools) : []), [query, externalTools]);
  const snippetResults = useMemo(
    () => (query.trim() ? matchSnippets(query.trim(), snippetIndex) : []),
    [query, snippetIndex]
  );
  const flatResults = useMemo(
    () => [
      ...toolResults.map(t => ({ kind: 'tool', ...t, href: toolHref(t) })),
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
          placeholder="Search UI snippets, coding playgrounds and tools…"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="home-omni-results"
          aria-autocomplete="list"
          aria-label="Search UI snippets, coding playgrounds and tools"
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
                          href={toolHref(t)}
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
