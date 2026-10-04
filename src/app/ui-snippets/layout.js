'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import UiSnippetsTool from '@/components/UiSnippetsTool';
import { CATEGORIES } from '@/components/UiSnippetsTool/categories';
import CategoryGalleryPage from './[slug]/CategoryGalleryPage';
import TagGalleryPage from './tag/[tag]/TagGalleryPage';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import styles from '../tool-page.module.css';
import { isEmbedRoute } from '@/lib/is-embed-route';

// Derived from CATEGORIES so a new category never has to be added here by hand
// ('all' is the gallery default, 'dev' is the localhost-only test bucket).
const CATEGORY_IDS = new Set(
  CATEGORIES.filter(c => c.id !== 'all' && c.id !== 'dev').map(c => c.id)
);

/* ── Slide-up loading pill (non-blocking, pointer-events:none) ── */
// Other components fire: window.dispatchEvent(new CustomEvent('snippet-nav-start'))
// The pill shows immediately on that event and hides after the new page paints.
function NavPill() {
  const pathname  = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath  = useRef(pathname);

  // Show on navigation click event
  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener('snippet-nav-start', show);
    return () => window.removeEventListener('snippet-nav-start', show);
  }, []);

  // Hide after the new pathname renders and the browser paints, then reset scroll.
  // Instant, not smooth: an animated scroll-to-top here means the new page briefly
  // paints at the OLD (pre-navigation) scroll position and then visibly glides back
  // up — exactly the "page opens already scrolled down" glitch. Snapping instantly
  // keeps the same paint-after-commit timing without that visible correction.
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    // Two rAFs: first lets React commit, second waits for the browser paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(false);
        const el = document.scrollingElement || document.documentElement;
        if (el.scrollTop > 0) el.scrollTo({ top: 0, behavior: 'instant' });
      });
    });
  }, [pathname]);

  return (
    <div style={{
      position: 'fixed', bottom: 20, left: '50%',
      transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, 80px)',
      opacity: visible ? 1 : 0,
      transition: 'transform 0.28s cubic-bezier(0.32,0.72,0,1), opacity 0.22s',
      background: 'rgba(15,23,42,0.88)',
      backdropFilter: 'blur(8px)',
      color: '#e2e8f0',
      fontSize: 12,
      fontWeight: 600,
      padding: '7px 16px',
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      pointerEvents: 'none',
      zIndex: 9999,
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      userSelect: 'none',
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        style={{ animation: 'spinCCW 0.6s linear infinite', flexShrink: 0 }}>
        <path d="M4.5 9A8 8 0 0 1 19 8"/>
        <path d="M19.5 15A8 8 0 0 1 5 16"/>
        <path d="M19 5v4h-4"/>
        <path d="M5 19v-4h4"/>
      </svg>
      Loading…
    </div>
  );
}

// Bare /ui-snippets/, a category, or a tag — the grid-shaped "gallery" pages,
// as opposed to the fixed-viewport snippet editor or the My Code app.
function isGalleryRoute(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  const slug  = parts.length >= 2 ? parts[1] : null;
  if (slug === 'mycode') return false;
  if (slug === 'tag') return true;
  if (!slug || CATEGORY_IDS.has(slug)) return true;
  return false;
}

function UiSnippetsToolSection() {
  const pathname = usePathname();
  const parts    = pathname.split('/').filter(Boolean);
  const slug     = parts.length >= 2 ? parts[1] : null;

  if (slug && CATEGORY_IDS.has(slug)) {
    return <CategoryGalleryPage key={slug} slug={slug} />;
  }

  // /ui-snippets/tag/<tag>/ — the same gallery filtered to one tag; the bare
  // /ui-snippets/tag/ index shows the unfiltered gallery under its tag list.
  if (slug === 'tag') {
    const tag = parts[2] || null;
    return tag
      ? <TagGalleryPage key={tag} tag={tag} />
      : <UiSnippetsTool initialSnippetId={null} isHome={true} />;
  }

  if (slug === 'mycode') {
    return <UiSnippetsTool initialView="saved" isHome={false} />;
  }

  return <UiSnippetsTool initialSnippetId={slug} isHome={!slug} />;
}

export default function UiSnippetsLayout({ children }) {
  const pathname = usePathname();

  // Playground top nav on every UI Snippets page — gallery, categories, tags, snippet
  // pages and My Code (grid and editor). Embeds return early below and get none.
  const showNav = true;  // top nav shows on every ui-snippets page, individual snippets included

  // The snippet editor fills the screen BELOW the nav, so it needs the nav's real
  // height (a hard-coded number breaks the moment the nav wraps or its font changes,
  // and the bottom Console bar then slides off-screen).
  const navRef = useRef(null);
  const [navH, setNavH] = useState(0);
  useEffect(() => {
    const el = navRef.current;
    if (!el) { setNavH(0); return; }
    const measure = () => setNavH(el.offsetHeight || 0);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [pathname, showNav]);

  // The embed route (/ui-snippets/[slug]/embed/) is a bare iframe target meant
  // to be dropped into a third-party page — none of the playground nav, the
  // full interactive editor, or the nav-loading pill below belong there.
  // Render only the embed page's own content (preview + canonical-URL link).
  if (isEmbedRoute(pathname)) return <>{children}</>;

  // No nav on a snippet page: never carry a stale measurement over from the previous page.
  const effNavH = showNav ? navH : 0;
  const isGallery = isGalleryRoute(pathname);

  return (
    <div className={styles.page} style={{ '--pnav-h': `${effNavH}px` }}>
      {showNav && <div ref={navRef}><PlaygroundTopNav active="ui-snippets" /></div>}
      <div
        className={`${styles.toolSection} ${isGallery ? styles.toolSectionGallery : styles.toolSectionEditor}`}
        style={isGallery ? undefined : { height: `calc(100dvh - ${effNavH}px)` }}
      >
        <Suspense fallback={null}>
          <UiSnippetsToolSection />
        </Suspense>
      </div>
      {children}
      <Suspense fallback={null}>
        <NavPill />
      </Suspense>
    </div>
  );
}
