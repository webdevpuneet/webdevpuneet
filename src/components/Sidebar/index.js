'use client';

import { usePathname, useRouter } from 'next/navigation';
import { isEmbedRoute } from '@/lib/is-embed-route';
import { ADS_ENABLED, SIDEBAR_AD_ENABLED, adsAllowedOnPath } from '@/lib/ads-config';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import { useIsNotFound, getNotFound } from '@/lib/not-found-state';
import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './styles.module.css';
import { LIVE_TOOLS, SEARCHABLE_TOOLS } from '@/lib/tools-registry';
import { fetchLatestBlogPosts } from '@/lib/blog-feed';
import ThemeToggle from '@/components/ThemeToggle';
import CookieSettingsButton from '@/components/CookieSettingsButton';
// The lightweight index + categories, not UiSnippetsTool/snippets (which bundles every snippet's source).
import { CATEGORIES as SNIPPET_CATEGORIES } from '@/components/UiSnippetsTool/categories';
import { SNIPPET_INDEX as SNIPPETS, VISIBLE_SNIPPET_INDEX as VISIBLE_SNIPPETS } from '@/lib/snippet-index';
import { dbGetAll as dbGetAllCustomSnippets, dbDelete as dbDeleteCustomSnippet } from '@/lib/uiSnippetsDb';
import { publishedTags, tagsForSnippetId } from '@/lib/snippet-tags';
// Snapshot of fwdtools' sidebar groups — regenerate with scripts/sync-fwdtools-sidebar.mjs
import FWD_SIDEBAR from '@/data/fwdtools-sidebar.json';

/* ─────────────────────────────────────────────────────────────
   Derived data — do not edit; edit tools-registry.js instead
───────────────────────────────────────────────────────────── */
const EXTENDED_TOOLS = LIVE_TOOLS.filter(t => t.extended);

const TOOL_MAP = Object.fromEntries(LIVE_TOOLS.map(t => [t.slug, t]));

// Category accordions mirror fwdtools (see FWD_SIDEBAR above).
const CATEGORIES = FWD_SIDEBAR.categories;

// Tools that live on webdevpuneet link locally; everything else goes to fwdtools.
function toolHref(slug) {
  return TOOL_MAP[slug] ? `/${slug}/` : `https://fwdtools.com/${slug}/`;
}

const PAGE_SIZE = 9;

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */

function isExtended(slug) {
  return TOOL_MAP[slug]?.extended === true;
}

/* ─────────────────────────────────────────────────────────────
   BookmarkNudge
───────────────────────────────────────────────────────────── */
function FavNudge({ tool, isFav, onToggle }) {
  if (!tool || isFav) return null;
  return (
    <button
      className={styles.favNudge}
      onClick={onToggle}
      title="Add to favourites"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"
        fill="none" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <span>Add to favourites</span>
    </button>
  );
}

function FavouritesGroup({ slugs, onRemove, onReorder, activeSlug, open, onToggle, activeTool, isFav, onToggleFav }) {
  const bodyRef = useRef(null);
  const [dragSlug, setDragSlug] = useState(null);
  const [dropIdx, setDropIdx]   = useState(null);
  const tools = slugs.map(slug => TOOL_MAP[slug]).filter(Boolean);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
      const t = setTimeout(() => { el.style.height = 'auto'; }, 220);
      return () => clearTimeout(t);
    } else {
      el.style.height = el.scrollHeight + 'px';
      requestAnimationFrame(() => { el.style.height = '0px'; });
    }
  }, [open, slugs.length]);

  if (!tools.length && (!activeTool || isFav)) return null;

  function onDragStart(e, slug) {
    setDragSlug(slug);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', slug);
  }

  function onItemDragOver(e, idx) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    setDropIdx(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1);
  }

  function onDrop(e) {
    e.preventDefault();
    if (!dragSlug || dropIdx === null) { resetDrag(); return; }
    const from = slugs.indexOf(dragSlug);
    if (from === -1 || from === dropIdx || from + 1 === dropIdx) { resetDrag(); return; }
    const next = [...slugs];
    next.splice(from, 1);
    next.splice(dropIdx > from ? dropIdx - 1 : dropIdx, 0, dragSlug);
    onReorder(next);
    resetDrag();
  }

  function resetDrag() { setDragSlug(null); setDropIdx(null); }

  return (
    <div className={styles.favGroup}>
      <button
        className={`${styles.favGroupHeader} ${open ? styles.groupOpen : ''}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <span className={styles.groupLabel}>Favourites</span>
        <span className={`${styles.groupCount} ${styles.favCount}`}>{tools.length}</span>
        <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div ref={bodyRef} className={styles.groupBody} style={{ height: open ? 'auto' : '0px' }}>
        <ul className={`${styles.list} ${styles.compactList}`} onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) resetDrag(); }}>
          {tools.map((t, idx) => (
            <li
              key={t.slug}
              className={[
                styles.item, styles.favItem,
                activeSlug === t.slug ? styles.active : '',
                dragSlug === t.slug ? styles.favItemDragging : '',
                dropIdx === idx ? styles.favDropAbove : '',
                dropIdx === idx + 1 ? styles.favDropBelow : '',
              ].join(' ')}
              draggable
              onDragStart={e => onDragStart(e, t.slug)}
              onDragOver={e => onItemDragOver(e, idx)}
              onDrop={onDrop}
              onDragEnd={resetDrag}
            >
              <a href={toolHref(t.slug)}>
                <span className={styles.itemInner}>
                  <span className={styles.icon}>
                    <img src={`/icons/${t.slug}.svg`} alt="" width={14} height={14} />
                  </span>
                  <span className={styles.info}>
                    <span className={styles.name}>{t.name}</span>
                  </span>
                </span>
              </a>
              <button
                className={styles.favRemoveBtn}
                onClick={e => { e.preventDefault(); e.stopPropagation(); onRemove(t.slug); }}
                title="Remove from favourites"
              >×</button>
            </li>
          ))}
        </ul>
        {activeTool && !isFav && (
          <button className={styles.favNudge} onClick={onToggleFav} title="Add to favourites">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>Add to favourites</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ToolLink — shared by accordion + more tools list
───────────────────────────────────────────────────────────── */
function ToolLink({ slug, name, sub, active, query, soon }) {
  function highlight(text) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className={styles.mark}>{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  }

  const inner = (
    <span className={styles.itemInner}>
      <span className={styles.icon}>
        <img src={`/icons/${slug}.svg`} alt="" width={14} height={14} />
      </span>
      <span className={styles.info}>
        <span className={styles.name}>{highlight(name)}</span>
      </span>
      {soon && <span className={styles.soonBadge}>soon</span>}
    </span>
  );

  return (
    <li className={`${styles.item} ${active ? styles.active : ''} ${soon ? styles.soon : ''}`}>
      {soon ? <span>{inner}</span> : <a href={toolHref(slug)}>{inner}</a>}
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   Tool of the Day — deterministic from date
───────────────────────────────────────────────────────────── */
function getTotd() {
  const dayIndex = Math.floor(Date.now() / 86_400_000) % LIVE_TOOLS.length;
  return LIVE_TOOLS[dayIndex];
}

function ToolOfDay({ activeSlug, favourites }) {
  const tool = getTotd();
  if (!tool || favourites.includes(tool.slug)) return null;
  const isActive = activeSlug === tool.slug;
  return (
    <div className={styles.totdWrap}>
      <div className={styles.totdLabel}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Tool of the day
      </div>
      <a href={`/${tool.slug}/`} className={`${styles.totdCard} ${isActive ? styles.totdActive : ''}`}>
        <span className={styles.totdIcon}>
          <img src={`/icons/${tool.slug}.svg`} alt="" width={14} height={14} />
        </span>
        <span className={styles.totdInfo}>
          <span className={styles.totdName}>{tool.name}</span>
          <span className={styles.totdSub}>{tool.sub}</span>
        </span>
        <svg className={styles.totdArrow} width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PlaygroundsGroup — pinned learn-to-code section
───────────────────────────────────────────────────────────── */
// Local entry wins (webdevpuneet's own name); fwdtools-only ones come from the snapshot.
const PLAYGROUND_TOOLS = FWD_SIDEBAR.playgrounds
  .map(p => TOOL_MAP[p.slug] || (p.name ? p : null))
  .filter(Boolean);

const FREELANCER_TOOLS_SIDEBAR = FWD_SIDEBAR.freelancer;

const PLAYGROUND_INITIAL = 5;

const UI_SNIPPET_CATEGORIES_SIDEBAR = SNIPPET_CATEGORIES.filter(cat => cat.id !== 'all' && !cat.devOnly);

/* ─────────────────────────────────────────────────────────────
   UiSnippetsGroup — UI Snippets categories, pinned above Learn to Code
───────────────────────────────────────────────────────────── */
function UiSnippetsGroup({ pathname, open, onToggle }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
      const t = setTimeout(() => { el.style.height = 'auto'; }, 220);
      return () => clearTimeout(t);
    } else {
      el.style.height = el.scrollHeight + 'px';
      requestAnimationFrame(() => { el.style.height = '0px'; });
    }
  }, [open]);

  return (
    <div className={styles.playgroundsGroup}>
      <button
        className={`${styles.playgroundsHeader} ${open ? styles.groupOpen : ''}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className={styles.railIcon}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </span>
        <span className={styles.groupLabel}>UI Snippets</span>
        <span className={`${styles.groupCount} ${styles.playgroundsCount}`}>{UI_SNIPPET_CATEGORIES_SIDEBAR.length}</span>
        <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div ref={bodyRef} className={styles.groupBody} style={{ height: open ? 'auto' : '0px' }}>
        <ul className={`${styles.list} ${styles.compactList} ${styles.twoColList}`}>
          <li className={`${styles.item} ${pathname === '/ui-snippets/' ? styles.active : ''}`}>
            <a href="/ui-snippets/">
              <span className={styles.itemInner}>
                <span className={styles.info}>
                  <span className={styles.name}>All Snippets</span>
                </span>
              </span>
            </a>
          </li>
          {UI_SNIPPET_CATEGORIES_SIDEBAR.map(cat => (
            <li key={cat.id} className={`${styles.item} ${pathname === `/ui-snippets/${cat.id}/` ? styles.active : ''}`}>
              <a href={`/ui-snippets/${cat.id}/`}>
                <span className={styles.itemInner}>
                  <span className={styles.info}>
                    <span className={styles.name}>{cat.label}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PlaygroundsGroup({ activeSlug, open, onToggle }) {
  const bodyRef = useRef(null);
  const [everOpened, setEverOpened] = useState(open);

  useEffect(() => {
    if (open && !everOpened) setEverOpened(true);
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
      const t = setTimeout(() => { el.style.height = 'auto'; }, 220);
      return () => clearTimeout(t);
    } else {
      el.style.height = el.scrollHeight + 'px';
      requestAnimationFrame(() => { el.style.height = '0px'; });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.playgroundsGroup}>
      <button
        className={`${styles.playgroundsHeader} ${open ? styles.groupOpen : ''}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className={styles.railIcon}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </span>
        <span className={styles.groupLabel}>Learn to Code</span>
        <span className={`${styles.groupCount} ${styles.playgroundsCount}`}>{PLAYGROUND_TOOLS.length}</span>
        <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div ref={bodyRef} className={styles.groupBody} style={{ height: open ? 'auto' : '0px' }}>
        {everOpened && (
          <ul className={`${styles.list} ${styles.compactList}`}>
            {PLAYGROUND_TOOLS.map(t => (
              <li key={t.slug} className={`${styles.item} ${activeSlug === t.slug ? styles.active : ''}`}>
                <a href={toolHref(t.slug)}>
                  <span className={styles.itemInner}>
                    <span className={styles.icon}>
                      <img src={`/icons/${t.slug}.svg`} alt="" width={14} height={14} />
                    </span>
                    <span className={styles.info}>
                      <span className={styles.name}>{t.name}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FreelancerGroup — pinned freelancer tools section
───────────────────────────────────────────────────────────── */
function FreelancerGroup({ activeSlug, open, onToggle }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
      const t = setTimeout(() => { el.style.height = 'auto'; }, 220);
      return () => clearTimeout(t);
    } else {
      el.style.height = el.scrollHeight + 'px';
      requestAnimationFrame(() => { el.style.height = '0px'; });
    }
  }, [open]);

  return (
    <div className={styles.group}>
      <button
        className={`${styles.groupHeader} ${open ? styles.groupOpen : ''}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className={styles.railIcon}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          </svg>
        </span>
        <span className={styles.groupLabel}>Freelance</span>
        <span className={styles.groupCount}>{FREELANCER_TOOLS_SIDEBAR.length}</span>
        <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div ref={bodyRef} className={styles.groupBody} style={{ height: open ? 'auto' : '0px' }}>
        <ul className={`${styles.list} ${styles.compactList}`}>
          {FREELANCER_TOOLS_SIDEBAR.map(t => (
            <li key={t.slug} className={`${styles.item} ${activeSlug === t.slug ? styles.active : ''}`}>
              <a href={toolHref(t.slug)}>
                <span className={styles.itemInner}>
                  <span className={styles.icon}>
                    {t.icon?.startsWith('/')
                      ? <img src={t.icon} alt="" width={14} height={14} />
                      : <span style={{ fontSize: 13 }}>{t.icon}</span>}
                  </span>
                  <span className={styles.info}>
                    <span className={styles.name}>{t.name}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CategoryGroup
───────────────────────────────────────────────────────────── */
function CategoryGroup({ category, open, onToggle, activeSlug, query, green = false }) {
  const bodyRef = useRef(null);
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => {
    if (open && !everOpened) setEverOpened(true);
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
      const t = setTimeout(() => { el.style.height = 'auto'; }, 220);
      return () => clearTimeout(t);
    } else {
      el.style.height = el.scrollHeight + 'px';
      requestAnimationFrame(() => { el.style.height = '0px'; });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={green ? styles.playgroundsGroup : styles.group}>
      <button
        className={`${green ? styles.playgroundsHeader : styles.groupHeader} ${open ? styles.groupOpen : ''}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className={styles.railIcon}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        </span>
        <span className={styles.groupLabel}>{category.label}</span>
        <span className={styles.groupCount}>{category.tools.length}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div ref={bodyRef} className={styles.groupBody} style={{ height: open ? 'auto' : '0px' }}>
        {everOpened && (
          <ul className={`${styles.list} ${styles.compactList}`}>
            {category.tools.map(t => (
              <ToolLink
                key={t.slug}
                slug={t.slug}
                name={t.name}
                sub={t.sub}
                active={activeSlug === t.slug}
                query={query}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MoreTools — paginated extended list
───────────────────────────────────────────────────────────── */
function MoreTools({ activeSlug, query }) {
  const [visible, setVisible] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef(null);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollEndTimer = useRef(null);
  const wasAtBottomRef = useRef(false);
  const doShowMoreRef = useRef(null);
  doShowMoreRef.current = doShowMore;

  /* track active scrolling + auto-expand at scroll bottom */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ancestor = el.parentElement;
    while (ancestor) {
      const oy = getComputedStyle(ancestor).overflowY;
      if (oy === 'auto' || oy === 'scroll') break;
      ancestor = ancestor.parentElement;
    }
    if (!ancestor) return;
    const onScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);

      const { scrollTop, scrollHeight, clientHeight } = ancestor;
      const atBottom = scrollHeight - scrollTop - clientHeight < 5;
      if (atBottom && !wasAtBottomRef.current) {
        wasAtBottomRef.current = true;
        doShowMoreRef.current();
      } else if (!atBottom) {
        wasAtBottomRef.current = false;
      }
    };
    ancestor.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ancestor.removeEventListener('scroll', onScroll);
      clearTimeout(scrollEndTimer.current);
    };
  }, []);

  /* auto-expand if active tool is in the extended list */
  useEffect(() => {
    if (isExtended(activeSlug) && !expanded) {
      setExpanded(true);
      setVisible(PAGE_SIZE);
    }
  }, [activeSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  function doShowMore() {
    if (!expanded) {
      setExpanded(true);
      setVisible(PAGE_SIZE);
    } else {
      setVisible(v => Math.min(v + PAGE_SIZE, EXTENDED_TOOLS.length));
    }
  }

  function handleShowMore() {
    if (isScrollingRef.current) return;
    doShowMore();
  }

  const shown = EXTENDED_TOOLS.slice(0, visible);
  const remaining = EXTENDED_TOOLS.length - visible;
  const allShown = visible >= EXTENDED_TOOLS.length;

  /* animate body open */
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (expanded) {
      el.style.height = el.scrollHeight + 'px';
      const t = setTimeout(() => { el.style.height = 'auto'; }, 220);
      return () => clearTimeout(t);
    }
  }, [expanded, visible]);

  return (
    <div ref={containerRef} className={styles.moreTools}>
      <div className={styles.moreDivider} />

      <div
        ref={bodyRef}
        className={styles.moreBody}
        style={{ height: expanded ? 'auto' : '0px', overflow: 'hidden', transition: 'height 0.22s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <ul className={`${styles.list} ${styles.compactList}`}>
          {shown.map(t => (
            <ToolLink
              key={t.slug}
              slug={t.slug}
              name={t.name}
              sub={t.sub}
              active={activeSlug === t.slug}
              query={query}
              soon={t.status === 'soon'}
            />
          ))}
        </ul>
      </div>

      {!allShown && (
        <button className={styles.showMoreBtn} onClick={handleShowMore}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {!expanded
            ? `More tools (${EXTENDED_TOOLS.length})`
            : `Show ${Math.min(remaining, PAGE_SIZE)} more · ${remaining} left`
          }
        </button>
      )}

      {allShown && expanded && (
        <div className={styles.allShown}>All {EXTENDED_TOOLS.length} tools shown</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LibraryTab — UI Snippets library search + category filter
───────────────────────────────────────────────────────────── */
const LIB_CATEGORIES = SNIPPET_CATEGORIES.filter(cat => !cat.devOnly || process.env.NODE_ENV !== 'production');
const LIB_TAGS = publishedTags(VISIBLE_SNIPPETS);
const LIB_PAGE_SIZE = 20;

// Home-icon link placed before the search box: the gallery for the panel it sits in.
function GalleryBtn({ href, label }) {
  return (
    <a href={href} className={styles.sortBtn} title={label} aria-label={label}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </a>
  );
}

function SortBtn({ order, onToggle }) {
  return (
    <button
      className={styles.sortBtn}
      onClick={onToggle}
      title={order === 'newest' ? 'Newest first — click for oldest first' : 'Oldest first — click for newest first'}
      aria-label={order === 'newest' ? 'Sort: newest first' : 'Sort: oldest first'}
    >
      {order === 'newest'
        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="5 11 12 4 19 11"/><line x1="7" y1="20" x2="17" y2="20"/></svg>
        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="5 13 12 20 19 13"/><line x1="7" y1="4" x2="17" y2="4"/></svg>
      }
    </button>
  );
}

const LIB_CATEGORY_KEY = 'uis_sidebar_category';
const LIB_TAG_KEY = 'uis_sidebar_tag';
const LIB_QUERY_KEY = 'uis_sidebar_query';
const LIB_SORT_KEY = 'uis_sidebar_sort';
// Shared with UiSnippetsGallery (the main /ui-snippets/ page content) — see
// that file for why a plain localStorage write alone isn't enough to keep
// the two in sync live: this sidebar never remounts on a client navigation,
// so it needs an explicit same-tab signal to know a key changed underneath it.
const SYNC_EVENT = 'uis-filters-changed';
// Related on/off + sort order, read by UiSnippetsTool's Prev / Next / Random.
const SIDEBAR_NAV_EVENT = 'uis-sidebar-nav';

function LibraryTab({ pathname }) {
  // Persisted so the search text (and the filters below) survive a hard
  // navigation — e.g. clicking a snippet reloads the whole page, remounting
  // the sidebar from scratch, which would otherwise silently clear whatever
  // the reader had just typed.
  const [libQuery, setLibQueryState] = useState('');
  const [libCategory, setLibCategoryState] = useState('all');
  const [libTag, setLibTagState] = useState(null);
  function loadFromStorage() {
    try {
      const savedQuery = localStorage.getItem(LIB_QUERY_KEY);
      setLibQueryState(savedQuery || '');
      const savedTag = localStorage.getItem(LIB_TAG_KEY);
      if (savedTag) {
        setLibTagState(savedTag);
        setLibCategoryState('all');
      } else {
        setLibTagState(null);
        setLibCategoryState(localStorage.getItem(LIB_CATEGORY_KEY) || 'all');
      }
    } catch {}
  }
  useEffect(() => {
    loadFromStorage();
    // The gallery page (UiSnippetsGallery) writes the same three keys and
    // fires this same event on every search keystroke and on every
    // category/tag route it renders — since this sidebar lives in the root
    // layout and never remounts on that kind of navigation, this listener is
    // what actually picks the change up live instead of only on next mount.
    window.addEventListener(SYNC_EVENT, loadFromStorage);
    return () => window.removeEventListener(SYNC_EVENT, loadFromStorage);
  }, []);
  function setLibQuery(value) {
    setLibQueryState(value);
    try {
      if (value) localStorage.setItem(LIB_QUERY_KEY, value);
      else localStorage.removeItem(LIB_QUERY_KEY);
    } catch {}
    window.dispatchEvent(new Event(SYNC_EVENT));
  }
  // Category and tag are mutually exclusive — picking one clears the other,
  // so only one filter is ever the active one.
  function setLibCategory(id) {
    setLibCategoryState(id);
    try { localStorage.setItem(LIB_CATEGORY_KEY, id); } catch {}
    setLibTagState(null);
    try { localStorage.removeItem(LIB_TAG_KEY); } catch {}
    window.dispatchEvent(new Event(SYNC_EVENT));
  }
  function setLibTag(id) {
    setLibTagState(id);
    // Selecting a tag resets category back to "All categories" — so it
    // sorts first and shows active, matching how the two stay mutually
    // exclusive in the other direction.
    setLibCategoryState('all');
    try { localStorage.setItem(LIB_CATEGORY_KEY, 'all'); } catch {}
    try {
      if (id) localStorage.setItem(LIB_TAG_KEY, id);
      else localStorage.removeItem(LIB_TAG_KEY);
    } catch {}
    window.dispatchEvent(new Event(SYNC_EVENT));
  }
  const [libStart, setLibStart] = useState(0);
  const [libVisible, setLibVisible] = useState(LIB_PAGE_SIZE);
  // Persisted like the other filters above, so newest-first/oldest-first
  // survives a hard navigation instead of silently resetting to newest.
  const [sortOrder, setSortOrderState] = useState('newest');
  useEffect(() => {
    try { setSortOrderState(localStorage.getItem(LIB_SORT_KEY) || 'newest'); } catch {}
  }, []);
  function setSortOrder(updater) {
    setSortOrderState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try { localStorage.setItem(LIB_SORT_KEY, next); } catch {}
      return next;
    });
  }
  // "Related" is ON by default: every snippet page the reader lands on opens
  // the sidebar on that snippet's related list — as long as no search,
  // category or tag filter is set (canShowRelated below; a filter always wins).
  // Toggling it off only lasts for the current page: the next snippet page
  // turns it back on (reset in the effect under activeId). Not persisted.
  const [relatedOn, setRelatedOn] = useState(true);
  const snippetListRef = useRef(null);
  const loadMoreBtnRef = useRef(null);

  // The current /ui-snippets/[id]/ page, if any — resolves to null (and the
  // effect below no-ops) on every other route, category gallery, or /mycode/.
  const activeId = pathname?.match(/^\/ui-snippets\/([^/]+)\/?$/)?.[1] || null;
  // Landing on a (new) snippet page re-enables Related.
  useEffect(() => { if (activeId) setRelatedOn(true); }, [activeId]);

  const snippetById = useMemo(() => new Map(VISIBLE_SNIPPETS.map(sn => [sn.id, sn])), []);

  // Whether the "Related" toggle can even show — only on an individual
  // snippet page, and only while the reader hasn't already narrowed the list
  // with a search term or a category/tag filter (those two ways of slicing
  // the library don't mix). Gallery, tag, category, and My Code pages never
  // set activeId, so this — and related mode itself — is always off there.
  const canShowRelated = !!activeId && !libQuery.trim() && libCategory === 'all' && !libTag;
  const showRelated = canShowRelated && relatedOn;

  // The preview toolbar's Prev / Next / Random (UiSnippetsTool, a separate
  // tree with no shared state) follow this list while Related is on. Publish
  // it on window as well as via an event, since either side may mount first.
  // (The publishing effect lives below, right after `filtered` is defined.)
  // Library tab closed (Tools / My Code / Blog tab): its Related list is gone, so stop scoping.
  useEffect(() => () => {
    const detail = { related: false, sort: 'newest', ids: null };
    window.__uisSidebarNav = detail;
    window.dispatchEvent(new CustomEvent(SIDEBAR_NAV_EVENT, { detail }));
  }, []);

  // "Related" is just the active snippet's own category, browsed the exact
  // same way a real category filter is — same list, same sort, same active
  // snippet visible in place. It reuses the existing "keep the open snippet
  // in view with Load previous/next" effect below rather than a bespoke pool,
  // so it behaves identically to clicking that category chip.
  const filtered = useMemo(() => {
    const activeSn = showRelated ? snippetById.get(activeId) : null;
    const effectiveCategory = activeSn ? activeSn.category : libCategory;
    const q = libQuery.trim().toLowerCase();
    const isDev = effectiveCategory === 'dev';
    const pool = isDev ? SNIPPETS : VISIBLE_SNIPPETS;
    // A tag is a cross-cutting filter — when one is active it replaces the
    // category filter entirely, same as the /ui-snippets/tag/ pages do.
    const matchOk = sn => libTag
      ? tagsForSnippetId(sn.id).includes(libTag)
      : (isDev ? sn.noindex === true : (effectiveCategory === 'all' || sn.category === effectiveCategory));
    const list = pool.filter(sn => matchOk(sn) && (!q || sn.title.toLowerCase().includes(q) || sn.category.toLowerCase().includes(q)));
    return sortOrder === 'newest' ? [...list].reverse() : list;
  }, [libQuery, libCategory, libTag, sortOrder, showRelated, activeId, snippetById]);

  // `ids` is the exact ordered list the sidebar is showing (search, category,
  // tag, Related and sort all applied), so Prev / Next / Random stay inside
  // whatever filtered stack the reader is looking at — including a filter that
  // was restored automatically from storage. Must come after `filtered`.
  useEffect(() => {
    const detail = { related: showRelated, sort: sortOrder, ids: filtered.map(sn => sn.id) };
    window.__uisSidebarNav = detail;
    window.dispatchEvent(new CustomEvent(SIDEBAR_NAV_EVENT, { detail }));
  }, [showRelated, sortOrder, filtered]);

  useEffect(() => { setLibStart(0); setLibVisible(LIB_PAGE_SIZE); }, [libQuery, libCategory, libTag, sortOrder, showRelated]);

  // Infinite scroll at the bottom only (not "Load previous" at the top) —
  // once the "Load next" button scrolls into view, click it for real
  // rather than duplicating its logic, so there's a single source of truth
  // for what happens on click vs. auto-trigger.
  const hasMore = libVisible < filtered.length;
  useEffect(() => {
    const btn = loadMoreBtnRef.current;
    const root = snippetListRef.current;
    if (!hasMore || !btn || !root) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) btn.click();
    }, { root, rootMargin: '150px' });
    io.observe(btn);
    return () => io.disconnect();
  }, [hasMore, filtered.length]);


  // Whenever the open snippet changes, make sure it falls inside the visible
  // window and scroll it into view — so the panel always shows the current
  // snippet as active even if it sits on a later page. Only reacts to
  // activeId/list changes, so it never fights manual Load previous/next clicks.
  useEffect(() => {
    if (!activeId) return;
    const idx = filtered.findIndex(sn => sn.id === activeId);
    if (idx < 0) return;
    let start = idx;
    let end = start + LIB_PAGE_SIZE;
    if (end > filtered.length) {
      end = filtered.length;
      start = Math.max(0, end - LIB_PAGE_SIZE);
    }
    setLibStart(start);
    setLibVisible(end);
    requestAnimationFrame(() => {
      const el = snippetListRef.current?.querySelector(`[data-snip-id="${activeId}"]`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    });
  }, [activeId, filtered]);

  // Hover preview: a larger copy of the snippet's thumbnail floating beside the
  // sidebar. Fixed-positioned from the row's rect so the list's own scroll
  // container can't clip it.
  const [hoverPreview, setHoverPreview] = useState(null);
  const hoverTimer = useRef(null);
  // The preview rides along with the pointer vertically (max 300x300): the stage's `top`
  // is set straight on the element, so moving the mouse never re-renders anything.
  const hoverStageRef = useRef(null);
  const hoverYRef = useRef(0);
  function placeHoverStage(y) {
    const el = hoverStageRef.current;
    if (!el) return;
    const h = el.offsetHeight;
    el.style.top = `${Math.min(Math.max(12, y - h / 2), window.innerHeight - h - 12)}px`;
  }
  function showHoverPreview(e, id, title) {
    const r = e.currentTarget.getBoundingClientRect();
    // The dim + preview start at the sidebar's own right edge (not the row's, which
    // sits a few pixels inside it), so the sidebar itself is never darkened.
    const edge = e.currentTarget.closest('aside')?.getBoundingClientRect().right ?? r.right;
    const next = { id, title, left: edge + 12 };
    hoverYRef.current = r.top + r.height / 2;
    clearTimeout(hoverTimer.current);
    if (hoverPreview) {
      // Already showing: just swap to this row's image, no fade or delay.
      setHoverPreview(next);
    } else {
      // First show gets a short delay so a quick sweep down the list doesn't flash.
      hoverTimer.current = setTimeout(() => setHoverPreview(next), 120);
    }
  }
  function hideHoverPreview() {
    // Deferred a beat so moving to the next row swaps instead of hide-then-show.
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoverPreview(null), 80);
  }
  function closeHoverPreview() {
    clearTimeout(hoverTimer.current);
    setHoverPreview(null);
  }
  useEffect(() => () => clearTimeout(hoverTimer.current), []);
  // Watchdog: row mouseleave alone is not reliable — it never fires when the
  // list scrolls under a still pointer, when a row re-renders or unmounts
  // (click → navigation), or when the pointer exits the window fast. While a
  // preview is open, every pointer move checks what is actually under the
  // pointer, and anything that means "not hovering" closes it.
  // Escape, hovering the preview image and a click anywhere also close it.
  const hoverOpen = !!hoverPreview;
  useEffect(() => {
    if (!hoverOpen) return;
    const stillHovering = el =>
      !!(el && el.closest && el.closest('aside [data-snip-id]'));
    // One-shot grace timer (not re-armed on every move, or constant motion
    // would postpone the close forever); crossing the gap between two rows
    // cancels it.
    let leaveTimer = null;
    const onMove = e => {
      hoverYRef.current = e.clientY;
      placeHoverStage(e.clientY);
      if (stillHovering(e.target)) { clearTimeout(leaveTimer); leaveTimer = null; return; }
      if (!leaveTimer) leaveTimer = setTimeout(closeHoverPreview, 100);
    };
    const onScroll = () => closeHoverPreview();          // the row under the pointer just changed
    const onOut = e => { if (!e.relatedTarget) closeHoverPreview(); };   // pointer left the window
    const onKey = e => { if (e.key === 'Escape') closeHoverPreview(); };
    const onDown = () => closeHoverPreview();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('wheel', onScroll, { passive: true });
    document.addEventListener('mouseout', onOut);
    window.addEventListener('blur', closeHoverPreview);
    document.addEventListener('visibilitychange', closeHoverPreview);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown, true);
    return () => {
      clearTimeout(leaveTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('wheel', onScroll);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('blur', closeHoverPreview);
      document.removeEventListener('visibilitychange', closeHoverPreview);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown, true);
    };
  }, [hoverOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  // Navigating to another snippet always dismisses it.
  useEffect(() => { closeHoverPreview(); }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps
  // A newly shown / swapped preview is placed beside the pointer straight away.
  useEffect(() => { if (hoverPreview) placeHoverStage(hoverYRef.current); }, [hoverPreview?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={styles.libSearchWrap}>
        <GalleryBtn href="/ui-snippets/" label="All snippets" />
        <div className={styles.libSearchBox}>
          <svg className={styles.libSearchIcon} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="search"
            className={styles.libSearchInput}
            placeholder={`Search ${VISIBLE_SNIPPETS.length} snippets...`}
            value={libQuery}
            onChange={e => setLibQuery(e.target.value)}
            aria-label="Search UI snippets"
          />
          {canShowRelated && (
            <button
              type="button"
              className={`${styles.relatedChip} ${showRelated ? styles.relatedChipActive : ''}`}
              onClick={() => setRelatedOn(!relatedOn)}
              title={showRelated ? 'Showing snippets related to this one — click to show the full library' : 'Show snippets related to this one'}
              aria-pressed={showRelated}
            >
              Related
            </button>
          )}
        </div>
        <SortBtn order={sortOrder} onToggle={() => setSortOrder(o => o === 'newest' ? 'oldest' : 'newest')} />
      </div>


      {(libTag || libCategory !== 'all') && (
        <div className={styles.activeFilterBar}>
          <span className={styles.activeFilterLabel}>
            Filter: {libTag ? LIB_TAGS.find(t => t.id === libTag)?.label : LIB_CATEGORIES.find(c => c.id === libCategory)?.label}
          </span>
          <button className={styles.activeFilterClear} onClick={() => setLibCategory('all')} aria-label="Clear filter" title="Clear filter">
            ✕
          </button>
        </div>
      )}

      <div className={styles.filterColsWrap}>
        <div className={styles.filterCols}>
          {/* Category (left) and Tag (right) — mutually exclusive filters.
              Selected item sorts first in each column so it's visible in the
              collapsed 50px strip; hovering either side reveals both columns
              in full, overlaid on top of the snippet list below. */}
          <div className={styles.filterCol}>
            {[...LIB_CATEGORIES].sort((a, b) => (a.id === libCategory ? -1 : b.id === libCategory ? 1 : 0)).map(cat => (
              <button
                key={cat.id}
                className={`${styles.chip} ${libCategory === cat.id ? styles.chipActive : ''}`}
                onClick={() => setLibCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className={styles.filterCol}>
            {[{ id: null, label: 'All tags' }, ...LIB_TAGS]
              .sort((a, b) => (a.id === libTag ? -1 : b.id === libTag ? 1 : 0))
              .map(tag => (
              <button
                key={tag.id ?? 'all'}
                className={`${styles.chip} ${libTag === tag.id ? styles.chipActive : ''}`}
                onClick={() => setLibTag(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.snippetList} ref={snippetListRef} aria-label="UI snippet library">
        {filtered.length === 0 && <div className={styles.noResults}>No snippets match</div>}
        {libStart > 0 && (
          <button className={styles.loadMoreSidebar} onClick={() => setLibStart(v => Math.max(0, v - LIB_PAGE_SIZE))}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
            Load {Math.min(LIB_PAGE_SIZE, libStart)} previous
          </button>
        )}
        {filtered.slice(libStart, libVisible).map(sn => (
          <a
            key={sn.id}
            href={`/ui-snippets/${sn.id}/`}
            data-snip-id={sn.id}
            onMouseEnter={e => showHoverPreview(e, sn.id, sn.title)}
            onMouseLeave={hideHoverPreview}
            className={`${styles.snippetItem} ${sn.id === activeId ? styles.snippetItemActive : ''}`}
          >
            <img className={styles.snippetThumb} src={`/images/ui-snippets/previews/${sn.id}.png`} alt="" loading="lazy" />
            <span className={styles.snippetBody}>
              <span className={styles.snippetTitle}>{sn.title}</span>
              <span className={styles.snippetSub}>{sn.category}</span>
            </span>
            {sn.noindex && <span className={styles.devPill} title="Not live yet — visible only in dev">dev</span>}
          </a>
        ))}
        {hoverPreview && (
          // Starts at the sidebar's right edge and follows the pointer up and down; the image is
          // capped at 300×300 and only scales down, never up. Image only, no title.
          <div ref={hoverStageRef} className={styles.hoverStage} style={{ left: hoverPreview.left - 12 }}>
            {/* The preview is a peek, not a destination: pointing at it closes it. */}
            <div className={styles.hoverFrame} onMouseEnter={closeHoverPreview}>
              <div className={styles.hoverBox}>
                <img
                  className={styles.hoverPreview}
                  src={`/images/ui-snippets/previews/${hoverPreview.id}.png`}
                  alt=""
                  onLoad={() => placeHoverStage(hoverYRef.current)}
                />
              </div>
            </div>
          </div>
        )}
        {libVisible < filtered.length && (
          <button ref={loadMoreBtnRef} className={styles.loadMoreSidebar} onClick={() => setLibVisible(v => v + LIB_PAGE_SIZE)}>
            Load {Math.min(LIB_PAGE_SIZE, filtered.length - libVisible)} next
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        )}
        {filtered.length > 0 && (
          <div className={styles.snippetListCount}>
            {Math.min(libStart + 1, filtered.length)}–{Math.min(libVisible, filtered.length)} of {filtered.length}
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   MyCodeTab — saved custom snippets (IndexedDB), read-only browse
───────────────────────────────────────────────────────────── */
function MyCodeTab({ pathname, snippets }) {
  const [mcQuery, setMcQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [activeId, setActiveId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirmDelete(id) {
    setDeleting(true);
    try { await dbDeleteCustomSnippet(id); } catch {}
    setDeleting(false);
    setConfirmDeleteId(null);
  }

  // Read the active ?id= client-side only — avoids requiring a Suspense
  // boundary around the whole app just to highlight the open snippet.
  // The ?id= can change without the pathname changing (forking a snippet, or
  // clicking another saved one), so also follow pushState/replaceState and
  // back/forward — Next's router uses the History API for those.
  useEffect(() => {
    const read = () => {
      try { setActiveId(new URLSearchParams(window.location.search).get('id')); } catch { setActiveId(null); }
    };
    read();
    const origPush = window.history.pushState;
    const origReplace = window.history.replaceState;
    // Deferred so Next has committed the new URL before it is read.
    const patched = orig => function () {
      const ret = orig.apply(this, arguments);
      setTimeout(read, 0);
      return ret;
    };
    window.history.pushState = patched(origPush);
    window.history.replaceState = patched(origReplace);
    window.addEventListener('popstate', read);
    return () => {
      window.history.pushState = origPush;
      window.history.replaceState = origReplace;
      window.removeEventListener('popstate', read);
    };
  }, [pathname]);

  const filtered = useMemo(() => {
    const q = mcQuery.trim().toLowerCase();
    const list = q ? snippets.filter(sn => (sn.name || '').toLowerCase().includes(q)) : snippets;
    return sortOrder === 'newest' ? list : [...list].reverse();
  }, [snippets, mcQuery, sortOrder]);

  return (
    <>
      <div className={styles.libSearchWrap}>
        <GalleryBtn href="/ui-snippets/mycode/" label="All My Code snippets" />
        <div className={styles.libSearchBox}>
          <svg className={styles.libSearchIcon} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="search"
            className={styles.libSearchInput}
            placeholder="Search saved..."
            value={mcQuery}
            onChange={e => setMcQuery(e.target.value)}
            aria-label="Search saved snippets"
          />
        </div>
        <SortBtn order={sortOrder} onToggle={() => setSortOrder(o => o === 'newest' ? 'oldest' : 'newest')} />
      </div>

      <div className={styles.snippetList} aria-label="My saved snippets">
        {/* Same destination as the Create button in the snippet header: a blank editor */}
        <a href="/ui-snippets/mycode/?new=1" className={styles.createNewRow}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create new
        </a>
        {filtered.length === 0 && (
          <div className={styles.noResults}>
            {snippets.length === 0
              ? 'No saved snippets yet — open a library snippet and click "Save as".'
              : 'No results'
            }
          </div>
        )}
        {filtered.map(sn => (
          confirmDeleteId === sn.id ? (
            <div key={sn.id} className={styles.snippetItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text2)' }}>Delete &ldquo;{sn.name || 'Untitled'}&rdquo;?</span>
              <span style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(null)}
                  disabled={deleting}
                  style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, border: '1px solid var(--border2)', background: 'none', color: 'var(--text2)', cursor: 'pointer' }}
                >Cancel</button>
                <button
                  type="button"
                  onClick={() => handleConfirmDelete(sn.id)}
                  disabled={deleting}
                  style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: 'none', background: '#dc2626', color: '#fff', cursor: 'pointer' }}
                >{deleting ? '...' : 'Delete'}</button>
              </span>
            </div>
          ) : (
            <div key={sn.id} className={styles.myCodeRow}>
              <a
                href={`/ui-snippets/mycode/?id=${sn.id}`}
                className={`${styles.snippetItem} ${pathname === '/ui-snippets/mycode/' && activeId === sn.id ? styles.snippetItemActive : ''}`}
                style={{ flex: 1, minWidth: 0 }}
              >
                <span className={styles.myCodeText}>
                  <span className={styles.snippetTitle}>{sn.name || 'Untitled'}</span>
                  {sn.tags?.length > 0 && (
                    <span className={styles.myCodeTags}>
                      {sn.tags.map(tag => <span key={tag} className={styles.myCodeTag}>{tag}</span>)}
                    </span>
                  )}
                </span>
              </a>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(sn.id)}
                aria-label={`Delete "${sn.name || 'Untitled'}"`}
                title="Delete"
                className={styles.myCodeDeleteBtn}
                style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', borderRadius: 5 }}
                onMouseEnter={e => { e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.background = 'var(--surface2)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'none'; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </button>
            </div>
          )
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   BlogTab — latest posts from the WordPress blog (webdevpuneet.com/blog/)
───────────────────────────────────────────────────────────── */
// Module-level cache so switching tabs back and forth in the same session
// doesn't refetch every time.
let blogPostsCache = null;

// The live WordPress API is cross-origin from localhost (CORS-blocked, so it
// resolves to []); fall back to this site's own /blog-posts.json snapshot.
async function loadBlogPosts() {
  const live = await fetchLatestBlogPosts(10);
  if (live.length) return live;
  try {
    const res = await fetch('/blog-posts.json');
    const data = res.ok ? await res.json() : [];
    return Array.isArray(data) ? data : [];
  } catch (_) {
    return [];
  }
}

function BlogTab() {
  const [posts, setPosts] = useState(blogPostsCache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (blogPostsCache) return;
    let cancelled = false;
    loadBlogPosts()
      .then(list => {
        if (cancelled) return;
        if (list.length) blogPostsCache = list;
        setPosts(list);
      })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className={styles.snippetList} aria-label="Latest blog posts">
      {posts === null && !error && (
        <div className={styles.noResults}>Loading latest posts…</div>
      )}
      {error && (
        <div className={styles.noResults}>Couldn&apos;t load the blog right now.</div>
      )}
      {posts?.length === 0 && (
        <div className={styles.noResults}>No posts found.</div>
      )}
      {posts?.map((post, i) => (
        <a
          key={post.href + i}
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.blogItem}
        >
          {post.thumb && <img className={styles.blogThumb} src={post.thumb} alt="" loading="lazy" />}
          <span className={styles.blogTitle}>{post.title}</span>
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────
   BlogTicker — the latest five blog posts as a one/two-line title that rotates
   every 5 seconds, just under the sidebar's top ad. Shares the BlogTab's
   post cache. The bottom progress bar drives the rotation (its animationend
   advances), so hover/focus pauses both together and a hidden tab, where CSS
   animations don't run, doesn't rotate.
──────────────────────────────────────────────────*/
const TICKER_COUNT = 5;
const TICKER_MS = 5000;

function BlogTicker() {
  const [posts, setPosts] = useState(blogPostsCache);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (blogPostsCache) return undefined;
    let cancelled = false;
    loadBlogPosts()
      .then(list => {
        if (cancelled) return;
        if (list.length) blogPostsCache = list;
        setPosts(list);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const items = posts ? posts.slice(0, TICKER_COUNT) : [];

  if (items.length === 0) return null;
  const post = items[idx % items.length];

  return (
    <div
      className={styles.blogTicker}
      role="group"
      aria-label="Latest from the blog"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {items.length > 1 && (
        <button type="button" className={styles.blogTickerBtn} onClick={() => setIdx(i => (i - 1 + items.length) % items.length)} aria-label="Previous post">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      <a
        key={post.href}
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.blogTickerLink}
        title={post.title}
      >
        <span className={styles.blogTickerText}>{post.title}</span>
      </a>
      {items.length > 1 && (
        <button type="button" className={styles.blogTickerBtn} onClick={() => setIdx(i => (i + 1) % items.length)} aria-label="Next post">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
      {items.length > 1 && (
        <span
          key={idx}
          className={`${styles.blogTickerProgress} ${paused ? styles.blogTickerProgressPaused : ''}`}
          style={{ animationDuration: `${TICKER_MS}ms` }}
          onAnimationEnd={() => setIdx(i => (i + 1) % items.length)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sidebar
───────────────────────────────────────────────────────────── */
// Which sidebar tab a route should default to: any /ui-snippets/mycode page →
// My Code, any other /ui-snippets page (gallery, category, tag, snippet) →
// Library, and the home page and every tool page → Tools (the home page also opens
// the UI Snippets group).
function defaultSidebarViewFor(pathname) {
  if (pathname?.startsWith('/ui-snippets/mycode')) return 'mycode';
  if (pathname?.startsWith('/ui-snippets')) return 'library';
  return 'tools';
}

/* Sidebar top ad — AdSense (slot 6939815965) at a fixed size, never "auto", so the
   sidebar doesn't shift while a creative loads: 300x250 medium rectangle on desktop,
   200x200 small square on mobile (≤768px, where the sidebar is a 240px drawer that a
   300px unit would overflow). Changing size remounts the <ins> (key) for a fresh ad.
   The adsbygoogle.js loader lives once site-wide in AdSenseScript; each mount requests
   an ad for its own fresh <ins>. Delayed so the <ins> is laid out first. */
const SIDEBAR_AD_MOBILE = '(max-width: 768px)';
function SidebarTopAdIns({ w, h }) {
  useEffect(() => {
    const id = setTimeout(() => {
      if (getNotFound()) return;
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
    }, 800);
    return () => clearTimeout(id);
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'inline-block', width: `${w}px`, height: `${h}px` }}
      data-ad-client="ca-pub-2762737943861458"
      data-ad-slot="6939815965"
    />
  );
}
function SidebarTopAd() {
  const [mobile, setMobile] = useState(null); // null until measured on the client
  useEffect(() => {
    const mq = window.matchMedia(SIDEBAR_AD_MOBILE);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const size = mobile ? { w: 200, h: 200 } : { w: 300, h: 250 };
  return (
    <div className={styles.sidebarTopAd}>
      {mobile !== null && <SidebarTopAdIns key={size.w} w={size.w} h={size.h} />}
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isNotFoundPage = useIsNotFound();
  const router = useRouter();
  const activeSlug = pathname.replace(/^\//, '').split('/')[0] || '';

  const [query, setQuery] = useState('');
  const [openIds, setOpenIds] = useState(() => new Set());
  const [favourites, setFavourites] = useState([]);
  const [uiSnippetsOpen,   setUiSnippetsOpen]   = useState(pathname === '/'); // home: the UI Snippets group starts expanded
  const [playgroundsOpen,  setPlaygroundsOpen]  = useState(false);
  const [freelancerOpen,   setFreelancerOpen]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Persisted so a hidden sidebar stays hidden across page navigations (a full
  // reload remounts this component, losing plain React state) until the user
  // explicitly reopens it. Starts false on every render (server and first
  // client render must match to avoid a hydration mismatch) and is corrected
  // from localStorage in an effect immediately after mount.
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarView, setSidebarView] = useState(() => defaultSidebarViewFor(pathname));

  // Re-derive the default tab whenever the route changes (client-side nav keeps
  // the sidebar mounted) — /ui-snippets pages open on Library, My Code on My Code,
  // and every other page (Home, a tool page) on Tools. A manual tab click
  // still wins until the next navigation changes the page type.
  useEffect(() => {
    setSidebarView(defaultSidebarViewFor(pathname));
    if (pathname === '/') setUiSnippetsOpen(true);
  }, [pathname]);

  const [customSnippets, setCustomSnippets] = useState([]);

  // Loaded on mount (for the My Code tab badge), refreshed whenever the My Code
  // tab is opened, and refreshed live on every save/delete/clear anywhere on the
  // page (uiSnippetsDb dispatches 'uis-custom-snippets-changed') — otherwise the
  // badge count only ever updated on a full page refresh.
  useEffect(() => {
    let cancelled = false;
    function refresh() {
      dbGetAllCustomSnippets()
        .then(all => {
          if (cancelled) return;
          setCustomSnippets(all.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
        })
        .catch(() => {});
    }
    refresh();
    window.addEventListener('uis-custom-snippets-changed', refresh);
    return () => { cancelled = true; window.removeEventListener('uis-custom-snippets-changed', refresh); };
  }, [sidebarView === 'mycode']); // eslint-disable-line react-hooks/exhaustive-deps

  // Restore the persisted collapsed state right after mount (see the useState
  // above for why this isn't read synchronously).
  useEffect(() => {
    try {
      if (localStorage.getItem('sidebar-collapsed') === '1') setCollapsed(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (collapsed) {
      document.body.classList.add('sidebar-left-collapsed');
    } else {
      document.body.classList.remove('sidebar-left-collapsed');
    }
    try { localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0'); } catch {}
    return () => document.body.classList.remove('sidebar-left-collapsed');
  }, [collapsed]);

  // External components (e.g. the UI Snippets tool's "Maximise preview"
  // button) can ask the sidebar to collapse/restore itself, since they live
  // outside this component and have no shared state with it.
  useEffect(() => {
    function onCollapseRequest(e) {
      setCollapsed(Boolean(e.detail));
    }
    window.addEventListener('sidebar-collapse-request', onCollapseRequest);
    return () => window.removeEventListener('sidebar-collapse-request', onCollapseRequest);
  }, []);

  useEffect(() => {
    try { setFavourites(JSON.parse(localStorage.getItem('fav-tools') || '[]')); } catch {}

    const onFavChanged = () => {
      try { setFavourites(JSON.parse(localStorage.getItem('fav-tools') || '[]')); } catch {}
    };
    window.addEventListener('fav-tools-changed', onFavChanged);
    return () => window.removeEventListener('fav-tools-changed', onFavChanged);
  }, []);

  const [favOpen, setFavOpen] = useState(true);

  const activeTool = TOOL_MAP[activeSlug] || null;
  const isFav = favourites.includes(activeSlug);

  const toggleFav = () => {
    setFavourites(prev => {
      const next = prev.includes(activeSlug)
        ? prev.filter(s => s !== activeSlug)
        : [...prev, activeSlug];
      try { localStorage.setItem('fav-tools', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const removeFav = (slug) => {
    setFavourites(prev => {
      const next = prev.filter(s => s !== slug);
      try { localStorage.setItem('fav-tools', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const reorderFavs = (next) => {
    setFavourites(next);
    try { localStorage.setItem('fav-tools', JSON.stringify(next)); } catch {}
  };

  const searchRef = useRef(null);

  function toggleCategory(id) {
    setOpenIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /* unified search across core + extended */
  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const seen = new Set();
    return SEARCHABLE_TOOLS
      .filter(t => seen.has(t.slug) ? false : seen.add(t.slug))
      .filter(t => t.name.toLowerCase().includes(q) || (t.sub || '').toLowerCase().includes(q) || t.slug.includes(q))
      .map(t => ({ ...t, soon: false }));
  }, [query]);

  /* close sidebar on navigation */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* lock body scroll when mobile sidebar is open */
  useEffect(() => {
    const v = mobileOpen ? 'hidden' : '';
    document.body.style.overflow = v;
    document.documentElement.style.overflow = v;
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  /* keyboard: / to focus, Esc to clear */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setQuery('');
        searchRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (isEmbedRoute(pathname)) return null;

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen(v => !v)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* Reopen rail — fixed at top-left, shown only while the sidebar is
          collapsed (the aside itself is off-screen, so this has to live
          outside it). Widens into a rail tab with a vertical "Open Sidebar"
          label so it stays discoverable. */}
      {collapsed && (
        <button
          className={`${styles.collapseTab} ${styles.collapseTabCollapsed}`}
          onClick={() => setCollapsed(false)}
          title="Show sidebar"
          style={{ left: 0 }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span className={styles.collapseTabLabel}>Open Sidebar</span>
        </button>
      )}

      <aside
        className={`${styles.sidebar} ${styles.sidebarExpanded} ${mobileOpen ? styles.sidebarOpen : ''} ${collapsed ? styles.sidebarCollapsed : ''}`}
      >
        {/* Brand */}
        <div className={styles.brandRow}>
          <a href="/" className={styles.brand}>
            <img className={styles.brandIcon} src="/icons/brand-logo.png" alt="" width={26} height={26} />
            <span className={styles.brandText}>webdevpuneet<strong>.com</strong></span>
          </a>
          <button
            className={styles.collapseInlineBtn}
            onClick={() => setCollapsed(true)}
            title="Hide sidebar"
            aria-label="Hide sidebar"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        </div>

        {/* Sidebar top ad. Keyed by pathname so every page mounts a fresh slot.
            On My Code it follows the IndexOnly standard: shown on the bare
            /ui-snippets/mycode/ page, hidden on a saved snippet (?id=…).
            Never shown on the 404 page. */}
        {ADS_ENABLED && SIDEBAR_AD_ENABLED && !isNotFoundPage && !isEmbedRoute(pathname) && adsAllowedOnPath(pathname) && (
          pathname.startsWith('/ui-snippets/mycode')
            ? <IndexOnly><SidebarTopAd key={pathname} /></IndexOnly>
            : <SidebarTopAd key={pathname} />
        )}

        {/* Latest blog posts, one at a time, right under the ad. */}
        <BlogTicker />

        {/* View tabs — all four only switch the panel; the My Code panel has Create new / All Snippets links for navigating */}
        <div className={styles.viewTabs}>
          <button
            className={`${styles.viewTab} ${sidebarView === 'library' ? styles.viewTabActive : ''}`}
            onClick={() => setSidebarView('library')}
          >Library</button>
          <button
            className={`${styles.viewTab} ${sidebarView === 'tools' ? styles.viewTabActive : ''}`}
            onClick={() => setSidebarView('tools')}
          >Tools</button>
          <button
            className={`${styles.viewTab} ${sidebarView === 'blog' ? styles.viewTabActive : ''}`}
            onClick={() => setSidebarView('blog')}
          >Blog</button>
          <button
            className={`${styles.viewTab} ${sidebarView === 'mycode' ? styles.viewTabActive : ''}`}
            onClick={() => setSidebarView('mycode')}
          >
            My Code
            {customSnippets.length > 0 && <span className={styles.savedCount}>{customSnippets.length}</span>}
          </button>
        </div>

        {sidebarView === 'library' && <LibraryTab pathname={pathname} />}
        {sidebarView === 'blog' && <BlogTab />}
        {sidebarView === 'mycode' && <MyCodeTab pathname={pathname} snippets={customSnippets} />}

        {sidebarView === 'tools' && (
          <>
            {/* Search, with a home button before it that opens the full tools hub */}
            <div className={styles.toolsSearchRow}>
            <GalleryBtn href="/tools/" label="All tools" />
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchRef}
                type="search"
                className={styles.searchInput}
                placeholder="Search tools…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search tools"
              />
              {query
                ? <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear search">✕</button>
                : null
              }
            </div>
            </div>
            {activeSlug !== 'ui-snippets' && !pathname?.startsWith('/ui-snippets') && (
              <FavNudge tool={activeTool} isFav={isFav} onToggle={toggleFav} />
            )}


            {/* Nav */}
            <nav className={styles.nav} aria-label="Tools">
              {searchResults !== null ? (
                searchResults.length > 0 ? (
                  <>
                    <div className={styles.searchMeta}>
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                    </div>
                    <ul className={`${styles.list} ${styles.compactList}`}>
                      {searchResults.map(t => (
                        <ToolLink
                          key={t.slug}
                          slug={t.slug}
                          name={t.name}
                          sub={t.sub}
                          active={activeSlug === t.slug}
                          query={query}
                          soon={t.soon}
                        />
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>⌕</div>
                    <div>No tools match<br /><strong>"{query}"</strong></div>
                  </div>
                )
              ) : (
                <>
                  <FavouritesGroup
                    slugs={favourites}
                    onRemove={removeFav}
                    onReorder={reorderFavs}
                    activeSlug={activeSlug}
                    open={favOpen}
                    onToggle={() => setFavOpen(v => !v)}
                  />
                  <UiSnippetsGroup
                    pathname={pathname}
                    open={uiSnippetsOpen}
                    onToggle={() => setUiSnippetsOpen(v => !v)}
                  />
                  <PlaygroundsGroup
                    activeSlug={activeSlug}
                    open={playgroundsOpen}
                    onToggle={() => setPlaygroundsOpen(v => !v)}
                  />
                  {CATEGORIES.filter(cat => cat.id === 'css').map(cat => (
                    <div key={cat.id} className={styles.categories}>
                      <CategoryGroup
                        green
                        category={cat}
                        open={openIds.has(cat.id)}
                        onToggle={() => toggleCategory(cat.id)}
                        activeSlug={activeSlug}
                        query=""
                      />
                    </div>
                  ))}
                  {FREELANCER_TOOLS_SIDEBAR.length > 0 && (
                    <FreelancerGroup
                      activeSlug={activeSlug}
                      open={freelancerOpen}
                      onToggle={() => setFreelancerOpen(v => !v)}
                    />
                  )}
                  <div className={styles.categories}>
                    {CATEGORIES.filter(cat => cat.id !== 'css').map(cat => (
                      <CategoryGroup
                        key={cat.id}
                        category={cat}
                        open={openIds.has(cat.id)}
                        onToggle={() => toggleCategory(cat.id)}
                        activeSlug={activeSlug}
                        query=""
                      />
                    ))}
                  </div>

                </>
              )}
            </nav>
          </>
        )}

        <div className={styles.sidebarBottom}>
          <a
            href="https://www.webdevpuneet.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.hireLine}
            title="Hire Puneet Sharma - UI Engineer (10 yrs exp)"
            aria-label="Hire Puneet Sharma - UI Engineer (10 yrs exp)"
          >
            <span className={styles.hireLineStatus} aria-hidden="true">
              <span className={styles.hireLineDot} />
            </span>
            <span className={styles.hireLineText}>Hire Me</span>
          </a>
          <a
            className={styles.supportHeartBtn}
            href="https://paypal.me/webdevpuneet/5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Please consider donating $5 if this site has helped you — thank you!"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#ec4899" aria-hidden="true" className={styles.supportHeart}>
              <path d="M12 21s-7.2-4.35-9.55-8.42C.66 9.47 1.43 5.75 4.55 4.2 7.02 2.97 9.46 3.76 12 6.32c2.54-2.56 4.98-3.35 7.45-2.12 3.12 1.55 3.89 5.27 2.1 8.38C19.2 16.65 12 21 12 21Z" />
            </svg>
            <span>Support</span>
            <span className={styles.supportTooltip} role="tooltip">
              Please consider donating $5 if this site has helped you — thank you!
            </span>
          </a>
          <ThemeToggle />
          <CookieSettingsButton />
          <a
            className={styles.followBtn}
            href="https://x.com/webdevpuneet"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow @webdevpuneet on X"
            aria-label="Follow @webdevpuneet on X"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Follow</span>
          </a>
        </div>
      </aside>
    </>
  );
}
