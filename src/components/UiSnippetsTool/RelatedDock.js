'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import RelatedCarousel from './RelatedCarousel';
import ds from './RelatedDock.module.css';

const SHOW_AFTER_MS = 8000;   // the dock slides up this long after the page loads
const HIDE_AFTER_PX = 40;     // scrolling down this far (in one direction) slides it away
const SHOW_AFTER_UP_PX = 40;  // scrolling back up this far brings it back

// Related-snippets dock for snippet pages, rendered inside the preview area (portal into
// #related-dock-mount) rather than across the whole viewport. Slides up 8s after load,
// slides down on its close button or as soon as the reader scrolls down. A vertical
// "Related" tab just outside the preview's right edge is there from page load whenever the
// dock is hidden: it fades out in place when the dock opens and back in when it closes.
// It reuses the RelatedCarousel cards, so the same items and paging as the in-page section.
export default function RelatedDock({ items, total, activeId, category }) {
  const [open, setOpen] = useState(false);
  const interacted = useRef(false);            // reader scrolled or closed it: don't auto-open
  const hiddenByUser = useRef(false);          // dock was hidden after being shown (scroll down, ×, Escape): scrolling up brings it back
  const dockRef = useRef(null);
  const [mount, setMount] = useState(null);    // #related-dock-mount, inside the preview area
  const [tabPos, setTabPos] = useState(null);  // fixed coords of the edge tab

  useEffect(() => { setMount(document.getElementById('related-dock-mount')); }, []);

  // The tab sits just outside the preview's right edge, so it can't live inside the
  // (overflow-clipped) preview stage: it is portalled to <body>, fixed-positioned from the
  // stage's rect and kept in sync on resize and scroll.
  useEffect(() => {
    const stage = mount?.parentElement;
    if (!stage) return undefined;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect();
        setTabPos({ left: r.right, bottom: Math.max(16, window.innerHeight - r.bottom + 16) });
      });
    };
    measure();
    window.addEventListener('resize', measure);
    document.addEventListener('scroll', measure, { capture: true, passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      document.removeEventListener('scroll', measure, { capture: true });
    };
  }, [mount]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!interacted.current) setOpen(true);
    }, SHOW_AFTER_MS);
    return () => clearTimeout(id);
  }, []);

  // Scroll anywhere (window or an inner scroller: capture catches both).
  // Down slides the dock away; scrolling back up brings it back, however it was closed
  // (scroll, the × button or Escape).
  useEffect(() => {
    const last = new WeakMap();
    let down = 0;
    let up = 0;
    function onScroll(e) {
      const t = e.target;
      if (dockRef.current && t instanceof Node && dockRef.current.contains(t)) return;
      const el = t === document ? document.scrollingElement : t;
      if (!el || typeof el.scrollTop !== 'number') return;
      const prev = last.get(el);
      last.set(el, el.scrollTop);
      if (prev === undefined) return;
      const delta = el.scrollTop - prev;
      if (delta > 0) { down += delta; up = 0; } else if (delta < 0) { up -= delta; down = 0; }
      if (down >= HIDE_AFTER_PX) {
        down = 0;
        interacted.current = true;
        hiddenByUser.current = true;
        setOpen(false);
      } else if (up >= SHOW_AFTER_UP_PX && hiddenByUser.current) {
        up = 0;
        hiddenByUser.current = false;
        setOpen(true);
      }
    }
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => document.removeEventListener('scroll', onScroll, { capture: true });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => { if (e.key === 'Escape') { interacted.current = true; hiddenByUser.current = true; setOpen(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!items?.length || !mount) return null;

  return (
    <>
      {createPortal(
        <aside
          ref={dockRef}
          className={`${ds.dock} ${open ? ds.dockOpen : ''}`}
          aria-label="Related snippets"
          aria-hidden={!open}
        >
          <div className={ds.inner}>
            <button
              type="button"
              className={ds.close}
              onClick={() => { interacted.current = true; hiddenByUser.current = true; setOpen(false); }}
              aria-label="Close related snippets"
              tabIndex={open ? 0 : -1}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <RelatedCarousel items={items} total={total} activeId={activeId} category={category} compact />
          </div>
        </aside>,
        mount
      )}

      {tabPos && createPortal(
        <button
          type="button"
          className={`${ds.edgeBtn} ${!open ? ds.edgeBtnShown : ''}`}
          style={{ left: tabPos.left, bottom: tabPos.bottom }}
          onClick={() => { hiddenByUser.current = false; setOpen(true); }}
          aria-label="Show related snippets"
          tabIndex={!open ? 0 : -1}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          Related
        </button>,
        document.body
      )}
    </>
  );
}
