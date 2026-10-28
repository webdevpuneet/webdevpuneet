'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';
import styles from './styles.module.css';

const POPULAR = ['CSS', 'JavaScript', 'React'];
const SNIPPET_POPULAR = ['Button', 'Card', 'Navbar', 'Modal', 'Loader'];
const MAX_TOOL_RESULTS = 8;
const MAX_SNIPPET_RESULTS = 5;
const MAX_SNIPPET_ONLY_RESULTS = 10;
const MAX_TEMPLATE_RESULTS = 6;

// Tools on this site only. Name matches rank first, then slug, then the longer description text.
function matchTools(query) {
  const q = query.toLowerCase();
  const scored = [];
  for (const t of SEARCHABLE_TOOLS) {
    const name = t.name.toLowerCase();
    let score = 0;
    if (name.startsWith(q)) score = 5;
    else if (name.split(/[\s\-/·]+/).some(w => w.startsWith(q))) score = 4;
    else if (name.includes(q)) score = 3;
    else if (t.slug.includes(q)) score = 2;
    else if ((t.sub || '').toLowerCase().includes(q) || (t.desc || '').toLowerCase().includes(q)) score = 1;
    if (score) scored.push({ t, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, MAX_TOOL_RESULTS).map(x => x.t);
}

function toolHref(t) {
  return `/${t.slug}`;
}

function matchSnippets(query, index, max = MAX_SNIPPET_RESULTS) {
  if (!index) return [];
  const q = query.toLowerCase();
  return index
    .filter(sn => sn.title.toLowerCase().includes(q) || sn.category.toLowerCase().includes(q))
    .slice(0, max);
}

/* The four template libraries as one searchable list, built from the small generated nav
   files (names and categories only, no template code): { name, lib, cat, href }. Matches
   every word of the query against the name, the category and the library name. */
const TEMPLATE_LIBS = [
  { key: 'section', lib: 'Website Section Templates', base: '/website-section-templates/' },
  { key: 'email', lib: 'Email Templates', base: '/email-templates/' },
  { key: 'social', lib: 'Social Post Templates', base: '/social-post-templates/' },
];
function buildTemplateIndex(nav, websites) {
  const out = [];
  for (const { key, lib, base } of TEMPLATE_LIBS) {
    for (const c of nav[key]?.categories || []) for (const it of c.items) out.push({ name: it.name, lib, cat: c.label, href: `${base}${it.id}/` });
  }
  for (const w of websites || []) out.push({ name: w.name, lib: 'Website Templates', cat: w.industry, href: `/website-builder/templates/${w.id}/` });
  out.push({ name: 'Custom Section Builder', lib: 'Website Section Templates', cat: 'Build your own', href: '/website-section-templates/custom-section/' });
  return out.map(t => ({ ...t, hay: `${t.name} ${t.cat} ${t.lib}`.toLowerCase(), lname: t.name.toLowerCase() }));
}
function matchTemplates(query, index) {
  if (!index) return [];
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = [];
  for (const t of index) {
    if (!words.every(w => t.hay.includes(w))) continue;
    const q = words.join(' ');
    scored.push({ t, score: t.lname.startsWith(q) ? 3 : t.lname.includes(q) ? 2 : 1 });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, MAX_TEMPLATE_RESULTS).map(x => x.t);
}

// `snippetsOnly`: search just the UI snippet library (used inside the home page's snippets
// section) and skip loading the tool and template indexes.
export default function HomeOmniSearch({ snippetsOnly = false }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [snippetIndex, setSnippetIndex] = useState(null);
  const [templateIndex, setTemplateIndex] = useState(null);
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

  // Templates (sections, websites, social posts, emails): their own small chunk too
  useEffect(() => {
    if (snippetsOnly) return undefined;
    let cancelled = false;
    Promise.all([import('@/data/template-nav.json'), import('@/data/website-templates-nav.json')]).then(([nav, sites]) => {
      if (!cancelled) setTemplateIndex(buildTemplateIndex(nav.default || nav, sites.default || sites));
    });
    return () => { cancelled = true; };
  }, [snippetsOnly]);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  const toolResults = useMemo(() => (!snippetsOnly && query.trim() ? matchTools(query.trim()) : []), [snippetsOnly, query]);
  const templateResults = useMemo(() => (!snippetsOnly && query.trim() ? matchTemplates(query.trim(), templateIndex) : []), [snippetsOnly, query, templateIndex]);
  const snippetResults = useMemo(
    () => (query.trim() ? matchSnippets(query.trim(), snippetIndex, snippetsOnly ? MAX_SNIPPET_ONLY_RESULTS : MAX_SNIPPET_RESULTS) : []),
    [snippetsOnly, query, snippetIndex]
  );
  const searchLabel = snippetsOnly
    ? `Search ${snippetIndex ? snippetIndex.length.toLocaleString('en-US') + ' ' : ''}UI snippets…`
    : 'Search UI snippets, templates, coding playgrounds and tools…';
  const flatResults = useMemo(
    () => [
      ...toolResults.map(t => ({ kind: 'tool', ...t, href: toolHref(t) })),
      ...templateResults.map(t => ({ kind: 'template', ...t })),
      ...snippetResults.map(s => ({ kind: 'snippet', href: `/ui-snippets/${s.id}/`, ...s })),
    ],
    [toolResults, templateResults, snippetResults]
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
          placeholder={searchLabel}
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="home-omni-results"
          aria-autocomplete="list"
          aria-label={snippetsOnly ? 'Search UI snippets' : 'Search UI snippets, templates, coding playgrounds and tools'}
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
                {templateResults.length > 0 && (
                  <div className={styles.resultGroup}>
                    <div className={styles.resultGroupLabel}>Templates</div>
                    {templateResults.map((t, i) => {
                      const idx = toolResults.length + i;
                      return (
                        <a
                          key={t.href}
                          href={t.href}
                          role="option"
                          aria-selected={highlight === idx}
                          className={`${styles.resultRow} ${highlight === idx ? styles.resultRowActive : ''}`}
                          onMouseEnter={() => setHighlight(idx)}
                        >
                          <span className={styles.resultIcon} aria-hidden="true">▦</span>
                          <span className={styles.resultBody}>
                            <span className={styles.resultTitle}>{t.name}</span>
                            <span className={styles.resultSub}>{t.lib} · {t.cat}</span>
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
                      const idx = toolResults.length + templateResults.length + i;
                      return (
                        <a
                          key={s.id}
                          href={`/ui-snippets/${s.id}/`}
                          role="option"
                          aria-selected={highlight === idx}
                          className={`${styles.resultRow} ${highlight === idx ? styles.resultRowActive : ''}`}
                          onMouseEnter={() => setHighlight(idx)}
                        >
                          <span className={styles.resultThumb} aria-hidden="true">
                            <span className={styles.resultThumbFallback}>{'</>'}</span>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/images/ui-snippets/previews/${s.id}.png`} alt="" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
                          </span>
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
        {(snippetsOnly ? SNIPPET_POPULAR : POPULAR).map(term => (
          <button key={term} type="button" className={styles.popularChip} onClick={() => handleChipClick(term)}>
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
