'use client';

import { loadContentIndex, searchContent, GROUP_META } from '@/lib/site-search';
import { usePathname, useRouter } from 'next/navigation';
import { isEmbedRoute } from '@/lib/is-embed-route';
import { ADS_ENABLED, SIDEBAR_AD_ENABLED, adsAllowedOnPath } from '@/lib/ads-config';
import { useAdFree, useAdFreeOnLoad } from '@/lib/use-ad-free';
import { PremiumUnlockDialog } from '@/components/PremiumGate';
import { lockAgain, PATREON_URL, PATREON_PRICE } from '@/lib/premium';
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
import { dbGetAll as dbGetAllCustomSnippets } from '@/lib/uiSnippetsDb';
import { useBookmarks, BOOKMARKED_HREF } from '@/lib/snippet-bookmarks';
import { useProjects, ResumeCard } from './MyProjects';
import { promptStore, loadPrompts } from '@/components/AiPromptStudioTool/storage';
import { publishedTags, tagsForSnippetId } from '@/lib/snippet-tags';
// Snapshot of fwdtools' sidebar groups — regenerate with scripts/sync-fwdtools-sidebar.mjs
import FWD_SIDEBAR from '@/data/fwdtools-sidebar.json';

/* ─────────────────────────────────────────────────────────────
   Derived data — do not edit; edit tools-registry.js instead
───────────────────────────────────────────────────────────── */
const EXTENDED_TOOLS = LIVE_TOOLS.filter(t => t.extended);

const TOOL_MAP = Object.fromEntries(LIVE_TOOLS.map(t => [t.slug, t]));

// Category accordions mirror fwdtools' groups (see FWD_SIDEBAR above), but list only the
// tools that live on webdevpuneet; a group with none of them is dropped.
// 'learn' (Learn & Think) is skipped: its only local tool, UI Snippets, has its own link at the top.
const CATEGORIES = FWD_SIDEBAR.categories
  .filter(c => c.id !== 'learn')
  .map(c => ({ ...c, tools: c.tools.filter(t => TOOL_MAP[t.slug]) }))
  .filter(c => c.tools.length > 0);

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
/* The part of `text` that matches the search (the first matching word), highlighted */
function markMatch(text, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lower = text.toLowerCase();
  let at = -1, len = 0;
  for (const w of words) { const i = lower.indexOf(w); if (i !== -1 && (at === -1 || i < at)) { at = i; len = w.length; } }
  if (at === -1) return text;
  return (<>{text.slice(0, at)}<mark className={styles.mark}>{text.slice(at, at + len)}</mark>{text.slice(at + len)}</>);
}

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
// Only playgrounds that live on webdevpuneet.
// UI Snippets Library and AI Prompt Studio are not listed here: they have their own links in the sidebar
// (the snapshot in data/fwdtools-sidebar.json still has them, so they are filtered out).
const NOT_IN_LEARN_TO_CODE = ['ui-snippets', 'ai-prompt-studio'];
const PLAYGROUND_TOOLS = FWD_SIDEBAR.playgrounds
  .filter(p => !NOT_IN_LEARN_TO_CODE.includes(p.slug))
  .map(p => TOOL_MAP[p.slug])
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
        className={`${styles.playgroundsHeader} ${styles.plainLink} ${open ? styles.groupOpen : ''} ${/^\/ui-snippets(?!\/mycode(\/|$))(\/|$)/.test(pathname) ? styles.linkActive : ''}`}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className={styles.railIcon}>
          <img src="/icons/ui-snippets.svg" alt="" width={13} height={13} />
        </span>
        <span className={styles.frontIcon}>
          <img src="/icons/ui-snippets.svg" alt="" width={16} height={16} />
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
        <ul className={`${styles.list} ${styles.compactList}`}>
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

/* ─────────────────────────────────────────────────────────────
   TemplatesGroup — Email Templates / Social Post Templates, by category.
   Categories start collapsed; the one holding the current template opens.
   Data: src/data/template-nav.json (scripts/generate-template-nav.mjs).
───────────────────────────────────────────────────────────── */
function TemplatesGroup({ label, base, icon, nav, pathname, open, onToggle }) {
  const bodyRef = useRef(null);
  // The category a template page belongs to is highlighted too
  const activeCat = nav.categories.find(c => c.items.some(t => pathname === `${base}${t.id}/`) || pathname === `${base}category/${c.id}/`)?.id;

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
          <img src={icon} alt="" width={13} height={13} />
        </span>
        <span className={styles.groupLabel}>{label}</span>
        <span className={`${styles.groupCount} ${styles.playgroundsCount}`}>{nav.total}</span>
        <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* Height is animated by the effect; children stay in the DOM so the links are crawlable */}
      <div ref={bodyRef} className={styles.groupBody} style={{ height: open ? 'auto' : '0px' }}>
        {/* Categories only, one per row; the category pages list their templates */}
        <ul className={`${styles.list} ${styles.compactList}`}>
          <li className={`${styles.item} ${pathname === base ? styles.active : ''}`}>
            <a href={base}>
              <span className={styles.itemInner}>
                <span className={styles.info}><span className={styles.name}>All {label.toLowerCase()}</span></span>
                <span className={styles.tplCatCount}>{nav.total}</span>
              </span>
            </a>
          </li>
          {nav.categories.map(c => (
            <li key={c.id} className={`${styles.item} ${activeCat === c.id ? styles.active : ''}`}>
              <a href={`${base}category/${c.id}/`}>
                <span className={styles.itemInner}>
                  <span className={styles.info}><span className={styles.name}>{c.label}</span></span>
                  <span className={styles.tplCatCount}>{c.items.length}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// A plain link row styled like a group header, with an icon in front (no expandable list)
function SidebarLink({ href, icon, label, active, count = 0 }) {
  // the count pops when it changes after the first load (a save or delete), not when it first appears
  const shown = useRef(null);
  const born = useRef(0);
  const [pop, setPop] = useState(0);
  useEffect(() => {
    if (!born.current) born.current = Date.now();
    // counts start at 0 and fill in as the saved items load, so changes in the first 2 seconds are the load, not a save
    if (shown.current !== null && shown.current !== count && Date.now() - born.current > 2000) setPop(n => n + 1);
    shown.current = count;
  }, [count]);
  return (
    <a
      href={href}
      className={`${styles.playgroundsHeader} ${styles.plainLink} ${active ? `${styles.groupOpen} ${styles.linkActive}` : ''}`}
      style={{ textDecoration: 'none' }}
    >
      <span className={styles.railIcon}>
        <img src={icon} alt="" width={13} height={13} />
      </span>
      <span className={styles.frontIcon}>
        <img src={icon} alt="" width={16} height={16} />
      </span>
      <span className={styles.groupLabel}>{label}</span>
      {count > 0 && <span key={pop} className={`${styles.linkCount} ${pop > 0 ? styles.linkCountPop : ''}`} aria-label={`${count} saved`}>{count}</span>}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   UiSnippetsCategories - the UI Snippets link with every category under it, two per row.
   Folded by default (open on the UI snippets pages); the chevron opens the list. The links stay in the page when it is folded
   (height 0, hidden from keyboard and screen readers), so crawlers still see them everywhere.
───────────────────────────────────────────────────────────── */
// The UI Snippets group is folded on every page, the UI snippet pages and My Code included; the chevron opens it. Nothing is
// remembered: the next page load starts folded again. (The links stay in the page when folded, so crawlers still see them.)
const startsOpen = () => false;

function UiSnippetsCategories({ pathname }) {
  const [open, setOpen] = useState(() => startsOpen(pathname));
  const bodyRef = useRef(null);
  const first = useRef(true);
  // Only the count of bookmarked snippets shows, first under UI Snippets; the link opens the gallery's Bookmarked view
  const bookmarked = useBookmarks();

  const toggleOpen = () => setOpen(v => !v);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return undefined;
    if (first.current) { first.current = false; return undefined; }
    if (open) {
      el.style.height = el.scrollHeight + 'px';
      const t = setTimeout(() => { el.style.height = 'auto'; }, 220);
      return () => clearTimeout(t);
    }
    el.style.height = el.scrollHeight + 'px';
    requestAnimationFrame(() => { el.style.height = '0px'; });
    return undefined;
  }, [open]);

  return (
    <div className={styles.uiSnipGroup}>
      <div className={styles.uiSnipHead}>
        <SidebarLink href="/ui-snippets/" icon="/icons/ui-snippets.svg" label="UI Snippets" active={/^\/ui-snippets(?!\/mycode(\/|$))(\/|$)/.test(pathname)} count={bookmarked.length} />
        <button
          type="button"
          className={styles.uiSnipToggle}
          aria-expanded={open}
          aria-controls="ui-snippet-categories"
          aria-label={open ? 'Collapse UI snippet categories' : 'Expand UI snippet categories'}
          onClick={toggleOpen}
        >
          <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div id="ui-snippet-categories" ref={bodyRef} className={`${styles.groupBody} ${open ? '' : styles.uiSnipClosed}`} style={{ height: open ? 'auto' : '0px' }}>
        {bookmarked.length > 0 && (
          <nav aria-label="Bookmarked UI snippets">
            <ul className={`${styles.list} ${styles.compactList}`} style={{ padding: '2px 8px 6px 30px', margin: 0 }}>
              <li className={styles.item}>
                <a href={BOOKMARKED_HREF} title="Show all bookmarked snippets">
                  <span className={styles.itemInner} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', border: '1px solid rgba(245,158,11,0.45)', background: 'rgba(245,158,11,0.08)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#f59e0b', flex: 'none' }}>
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className={styles.info} style={{ flex: 1 }}>
                      <span className={styles.name}>Bookmarked</span>
                    </span>
                    <span className={styles.linkCount} aria-label={`${bookmarked.length} bookmarked`}>{bookmarked.length}</span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        )}
        <nav aria-label="UI snippet categories">
          <ul className={`${styles.list} ${styles.compactList} ${styles.snipCatList}`}>
            {UI_SNIPPET_CATEGORIES_SIDEBAR.map(cat => (
              <li key={cat.id} className={`${styles.item} ${pathname === `/ui-snippets/${cat.id}/` ? styles.active : ''}`}>
                <a href={`/ui-snippets/${cat.id}/`} title={`${cat.label} UI snippets`}>
                  <span className={styles.itemInner}>
                    <span className={styles.info}>
                      <span className={styles.name}>{cat.label}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function PlaygroundsGroup({ activeSlug, open, onToggle }) {
  const bodyRef = useRef(null);
  // The playground links are always in the page HTML (so search crawlers find them), collapsed to nothing
  // until opened, like the UI Snippets categories.
  const first = useRef(true);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (first.current) { first.current = false; return; }
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
        className={`${styles.playgroundsHeader} ${styles.plainLink} ${open ? styles.groupOpen : ''}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="learn-to-code-links"
      >
        <span className={styles.railIcon}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </span>
        <span className={styles.frontIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <div ref={bodyRef} id="learn-to-code-links" className={`${styles.groupBody} ${open ? '' : styles.uiSnipClosed}`} style={{ height: open ? 'auto' : '0px' }}>
        <nav aria-label="Learn to code playgrounds">
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
        </nav>
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
  // The tool links are drawn only after the group is first opened (not in the page HTML until then)
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
        {green && (
          <span className={styles.frontIcon}>
            <img src="/icons/css-playground.svg" alt="" width={16} height={16} />
          </span>
        )}
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

// Home-icon link placed after the sort button: the gallery for the panel it sits in.
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

// Shared with UiSnippetsGallery (the main /ui-snippets/ page content) — see
// that file for why a plain localStorage write alone isn't enough to keep
// the two in sync live: this sidebar never remounts on a client navigation,
// so it needs an explicit same-tab signal to know a key changed underneath it.
// Related on/off + sort order, read by UiSnippetsTool's Prev / Next / Random.

/* ─────────────────────────────────────────────────────────────
   My Projects (MyProjects.js) — a log of everything saved in this browser: code, websites, sections, emails, posts
───────────────────────────────────────────────────────────── */
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

/* Sidebar top ad — AdSense (slot 6939815965) at a fixed size, never "auto", so the
   sidebar doesn't shift while a creative loads: 300x250 medium rectangle on desktop.
   Not shown on mobile (≤768px, where the sidebar is a 240px drawer): no strip and no ad request
   there (2026-11-04). Changing between the two remounts the <ins> for a fresh ad.
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
  if (mobile !== false) return null; // phones (and before the first measure): no sidebar ad
  return (
    <div className={styles.sidebarTopAd}>
      <SidebarTopAdIns w={300} h={250} />
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isNotFoundPage = useIsNotFound();
  const adFree = useAdFree(); // Patreon supporters (passcode in localStorage): the button's label
  const adFreeOnLoad = useAdFreeOnLoad(); // ...and no sidebar ad on pages loaded as a supporter
  const [unlockOpen, setUnlockOpen] = useState(false);
  const router = useRouter();
  const activeSlug = pathname.replace(/^\//, '').split('/')[0] || '';

  const [query, setQuery] = useState('');
  const [openIds, setOpenIds] = useState(() => new Set());
  const [favourites, setFavourites] = useState([]);
  const [playgroundsOpen,  setPlaygroundsOpen]  = useState(false);
  // Template groups start collapsed, except on their own pages
  const [freelancerOpen,   setFreelancerOpen]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  // Persisted so a hidden sidebar stays hidden across page navigations (a full
  // reload remounts this component, losing plain React state) until the user
  // explicitly reopens it. Starts false on every render (server and first
  // client render must match to avoid a hydration mismatch) and is corrected
  // from localStorage in an effect immediately after mount.
  const [collapsed, setCollapsed] = useState(false);
  // Tools by default on every page. The tab a visitor clicks is remembered in this browser, so My Code (or
  // Blog) stays open on the next page load. Starts on Tools for the server render and the first client render
  // (they must match), then switches to the remembered tab in an effect.
  const [customSnippets, setCustomSnippets] = useState([]);
  const projects = useProjects(); // saved websites, sections, emails and posts, for the My Projects tab
  // saved items per tool, shown on each tool's link (the website in progress is not a saved one, so it is not counted)
  const savedCount = useMemo(() => {
    const c = { website: 0, section: 0, email: 0, social: 0 };
    projects.forEach(p => { if (p.id !== 'draft' && p.type in c) c[p.type] += 1; });
    return c;
  }, [projects]);
  // number of saved AI prompts, shown on the AI Prompts link; follows saves and deletes live (this tab and other tabs)
  const [promptCount, setPromptCount] = useState(0);
  useEffect(() => {
    let live = true;
    const load = () => loadPrompts().then(l => { if (live) setPromptCount(l.length); }).catch(() => {});
    load();
    const off = promptStore.onDesignsChange(load);
    // loadPrompts also moves an older localStorage library into IndexedDB; look again when the tab regains focus
    const onVis = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { live = false; off(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

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
  }, []);

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

  // No "Add to favourites" button on the sections that are plain links in this sidebar
  const NO_FAV_SLUGS = ['website-builder', 'website-section-templates', 'email-templates', 'social-post-templates', 'ui-snippets', 'ai-prompt-studio'];
  const activeTool = NO_FAV_SLUGS.includes(activeSlug) ? null : (TOOL_MAP[activeSlug] || null);
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

  /* The same search also finds UI snippets and templates: their name lists load on the first search */
  const [contentIndex, setContentIndex] = useState(null);
  const contentLoading = useRef(false);
  useEffect(() => {
    if (!query.trim() || contentLoading.current) return;
    contentLoading.current = true;
    loadContentIndex().then(setContentIndex).catch(() => { contentLoading.current = false; });
  }, [query]);
  const contentGroups = useMemo(() => (query.trim() ? searchContent(contentIndex, query.trim()) : []), [contentIndex, query]);

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
            Shown on every URL (query strings included); never on the 404 page. */}
        {ADS_ENABLED && SIDEBAR_AD_ENABLED && !adFreeOnLoad && !isNotFoundPage && !isEmbedRoute(pathname) && adsAllowedOnPath(pathname) && (
          <SidebarTopAd key={pathname} />
        )}

        {/* Latest blog posts, one at a time, right under the ad. */}
        <BlogTicker />

        {/* Patreon: a supporter sees the thank-you line; everyone else sees the sign-in line (both one line, same place) */}
        {!adFree && (
          <div className={`${styles.supporterBar} ${styles.supporterBarOff}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7.2-4.35-9.55-8.42C.66 9.47 1.43 5.75 4.55 4.2 7.02 2.97 9.46 3.76 12 6.32c2.54-2.56 4.98-3.35 7.45-2.12 3.12 1.55 3.89 5.27 2.1 8.38C19.2 16.65 12 21 12 21Z" /></svg>
            <span className={styles.supporterText}>Patreon supporter?</span>
            <button type="button" className={styles.supporterOut} onClick={() => setUnlockOpen(true)}>Sign in</button>
            {/* What a supporter gets: opens on hover or keyboard focus */}
            <div className={styles.supporterPop} role="tooltip">
              <strong className={styles.supporterPopTitle}>Patreon supporter, {PATREON_PRICE}</strong>
              <ul className={styles.supporterPopList}>
                <li>No ads anywhere on the site</li>
                <li>Export the templates with a Patreon badge (website, email and social post) and single sections from the Section Templates page</li>
                <li>Backup and restore all your saved designs</li>
                <li>A new passcode every month in the supporter post</li>
              </ul>
              <a className={styles.supporterPopJoin} href={PATREON_URL} target="_blank" rel="noopener noreferrer">Join on Patreon</a>
              <span className={styles.supporterPopNote}>Everything else stays free, including building in the Website Builder with every section. </span>
              <span className={styles.supporterPopNote}>Already a supporter? Click Sign in and enter the passcode.</span>
            </div>
          </div>
        )}
        {/* Shown once the Patreon passcode has been accepted in this browser */}
        {adFree && (
          <div className={styles.supporterBar} role="status">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.2-4.35-9.55-8.42C.66 9.47 1.43 5.75 4.55 4.2 7.02 2.97 9.46 3.76 12 6.32c2.54-2.56 4.98-3.35 7.45-2.12 3.12 1.55 3.89 5.27 2.1 8.38C19.2 16.65 12 21 12 21Z" /></svg>
            <span className={styles.supporterText}>Patreon supporter: thank you!</span>
            <button type="button" className={styles.supporterOut} onClick={() => { lockAgain(); window.location.reload(); }} title="Forget the passcode in this browser (ads come back)">Sign out</button>
          </div>
        )}

        <>
            {/* Search, with a home button before it that opens the full tools hub */}
            <div className={styles.toolsSearchRow}>
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchRef}
                type="search"
                className={styles.searchInput}
                placeholder="Search tools, snippets, templates…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search tools, UI snippets and templates"
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
                searchResults.length > 0 || contentGroups.length > 0 ? (
                  <>
                    {searchResults.length > 0 && (
                      <>
                        <div className={styles.searchMeta}>
                          {searchResults.length} tool{searchResults.length !== 1 ? 's' : ''}
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
                    )}
                    {contentGroups.map(g => (
                      <section key={g.lib} className={styles.srGroup} aria-label={g.lib}>
                        <div className={styles.srHead}>
                          <img src={GROUP_META[g.lib].icon} alt="" width={14} height={14} />
                          <span className={styles.srLabel}>{g.lib}</span>
                          <span className={styles.srCount}>{g.total}</span>
                        </div>
                        <ul className={styles.srList}>
                          {g.items.map(it => (
                            <li key={it.href}>
                              <a href={it.href} className={styles.srRow} title={`${it.name} · ${it.cat}`}>
                                <span className={styles.srThumb}>
                                  {it.thumb
                                    ? <img src={it.thumb} alt="" loading="lazy" decoding="async" onError={e => { e.currentTarget.style.display = 'none'; }} />
                                    : <img src={GROUP_META[g.lib].icon} alt="" width={14} height={14} className={styles.srThumbIcon} />}
                                </span>
                                <span className={styles.srText}>
                                  <span className={styles.srName}>{markMatch(it.name, query)}</span>
                                  <span className={styles.srCat}>{it.cat}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                        {g.total > g.items.length && (
                          <a href={GROUP_META[g.lib].all} className={styles.srAll}>See all {g.total} {g.lib.toLowerCase()} →</a>
                        )}
                      </section>
                    ))}
                  </>
                ) : !contentIndex ? (
                  <div className={styles.searchMeta}>Searching…</div>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>⌕</div>
                    <div>Nothing matches<br /><strong>"{query}"</strong></div>
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
                  <ResumeCard snippets={customSnippets} projects={projects} />
                  <UiSnippetsCategories pathname={pathname} />
                  <SidebarLink href="/ui-snippets/mycode/" icon="/icons/my-code.svg" label="My Code" active={/^\/ui-snippets\/mycode(\/|$)/.test(pathname)} count={customSnippets.length} />
                  <SidebarLink href="/website-builder/" icon="/icons/website-builder.svg" label="Website Builder" active={/^\/website-builder(\/|$)/.test(pathname)} count={savedCount.website} />
                  <SidebarLink href="/website-section-templates/" icon="/icons/website-section-templates.svg" label="Website Sections" active={/^\/website-section-templates(\/|$)/.test(pathname)} count={savedCount.section} />
                  <SidebarLink href="/email-templates/" icon="/icons/email-templates.svg" label="Email Templates" active={/^\/email-templates(\/|$)/.test(pathname)} count={savedCount.email} />
                  <SidebarLink href="/social-post-templates/" icon="/icons/social-post-templates.svg" label="Social Post Templates" active={/^\/social-post-templates(\/|$)/.test(pathname)} count={savedCount.social} />
                  <SidebarLink href="/ai-prompt-studio/" icon="/icons/ai-prompt-studio.svg" label="AI Prompts" active={/^\/ai-prompt-studio(\/|$)/.test(pathname)} count={promptCount} />
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
                  <div className={styles.categories}>
                    {CATEGORIES.filter(cat => cat.id !== 'css' && cat.id !== 'pdf').map(cat => (
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
                  {/* Freelance and PDF Tools are not shown on webdevpuneet (they live on fwdtools) */}

                </>
              )}
            </nav>
        </>

        <div className={styles.sidebarBottom}>
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
          <button
            type="button"
            className={styles.followBtn}
            onClick={() => { if (!adFree) setUnlockOpen(true); }}
            title={adFree ? 'Thank you for supporting the site on Patreon: ads are off' : 'Patreon supporters: enter the passcode to remove all ads'}
            aria-label={adFree ? 'Ads are off, thank you for supporting the site' : 'Remove ads: enter the Patreon supporter passcode'}
            style={{ whiteSpace: 'nowrap', ...(adFree ? { cursor: 'default' } : null) }}
          >
            <span>{adFree ? 'Ad-free \u2713' : 'Ad-free'}</span>
          </button>
          <a
            href="/puneet/"
            className={styles.hireLine}
            title="Hire Puneet Sharma - UI Engineer (10 yrs exp)"
            aria-label="Hire Puneet Sharma - UI Engineer (10 yrs exp)"
          >
            <span className={styles.hireLineStatus} aria-hidden="true">
              <span className={styles.hireLineDot} />
            </span>
            <span className={styles.hireLineText}>Hire Me</span>
          </a>
        </div>
      </aside>
      <PremiumUnlockDialog open={unlockOpen} onClose={() => setUnlockOpen(false)} />
    </>
  );
}
