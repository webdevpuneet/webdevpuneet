'use client';

/* "Your pages" on /website-builder/ (the landing page): start from scratch, continue the
   autosaved page, or open a page from My pages. All of them open the editor at
   /website-builder/editor/. Renders cards only; the parent supplies the grid.

   Old builder links pointed at /website-builder/?page=…, ?starter=… and ?add=1 (saved pages,
   the section editor's "Add to page", backups); they are forwarded to the editor unchanged. */

import { useEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import x from '../SectionTemplates/styles.module.css';
import b from '../SavedDesignsStrip/styles.module.css';
import w from './styles.module.css';
import { TRASH } from '@/components/SavedDesignsStrip';
import ConfirmDialog from '@/components/SocialPostTemplates/ConfirmDialog';
import { LoadMore } from '@/components/UiSnippetsGallery';
import { makeDesignStore } from '@/lib/design-store';
import { restoreSite, siteDocumentHtml, isSite } from '@/components/SectionTemplates/templates/site.js';
import { getAsset } from '@/components/SectionTemplates/storage';
import { previewImages } from '@/components/SectionTemplates/upload';

export const EDITOR = '/website-builder/editor/';
const store = makeDesignStore('wdp-website-pages');

/* Hover: the page scrolls from top to bottom at the same steady speed as
   the template cards (160px a second), then springs back on leave */
const SCROLL_SPEED = 160;
const panIn = ev => {
  const box = ev.currentTarget.querySelector('[data-stack]');
  const inner = box?.firstElementChild;
  if (!inner) return;
  const hidden = inner.scrollHeight - box.clientHeight;
  if (hidden <= 0) return;
  inner.style.transition = `transform ${Math.max(0.4, hidden / SCROLL_SPEED).toFixed(2)}s linear`;
  inner.style.transform = `translateY(-${hidden}px)`;
};
const panOut = ev => {
  const inner = ev.currentTarget.querySelector('[data-stack]')?.firstElementChild;
  if (!inner) return;
  inner.style.transition = 'transform .6s ease';
  inner.style.transform = 'translateY(0)';
};
const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const panProps = { onMouseEnter: e => { if (!reduced()) panIn(e); }, onMouseLeave: panOut, onFocus: e => { if (!reduced()) panIn(e); }, onBlur: panOut };

/* Every section of a saved record (a site, or an older single page) */
const sectionsOf = st => (isSite(st) ? [...(st.header || []), ...(st.pages || []).flatMap(p => p.sections || []), ...(st.footer || [])] : st?.sections || []);
const sizeOf = st => `${isSite(st) && st.pages?.length > 1 ? `${st.pages.length} pages · ` : ''}${sectionsOf(st).length} sections`;

const when = iso => { try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); } catch { return ''; } };

/* The page itself (a website's home page), rendered live (its text, uploaded images, theme and fonts) at desktop
   width and scaled down to the card. Rendered only once the card reaches the viewport, with
   scripts off (sections are designed to show all their content without JavaScript). */
const PAGE_W = 1280;
function LivePage({ page }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [h, setH] = useState(0);
  const [urls, setUrls] = useState({});
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / PAGE_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Uploaded images: object URLs from the builder's asset store
  useEffect(() => {
    let live = true;
    const made = [];
    (async () => {
      const out = {};
      for (const sec of sectionsOf(page)) {
        // Its uploads, plus a section background image (style.bg, key '@bg')
        for (const [k, u] of [...Object.entries(sec.state?.uploads || {}), ...(sec.style?.bg ? [['@bg', sec.style.bg]] : [])]) {
          try { const rec = await getAsset(u.id); if (rec?.blob) { const url = URL.createObjectURL(rec.blob); made.push(url); out[`${sec.uid}|${k}`] = url; } } catch { /* missing */ }
        }
      }
      if (live) setUrls(out);
    })();
    return () => { live = false; made.forEach(u => URL.revokeObjectURL(u)); };
  }, [page]);
  const html = useMemo(() => {
    if (!origin || !page) return '';
    try {
      const site = restoreSite(page);
      return previewImages(siteDocumentHtml(site, site.pages[0].id, { imageSrc: (uid, k) => urls[`${uid}|${k}`] || '', motion: false }), origin);
    } catch { return ''; }
  }, [page, urls, origin]);
  // The page's height, kept up to date as its fonts and images load
  const roRef = useRef(null);
  useEffect(() => () => roRef.current?.disconnect(), []);
  const onLoad = ev => {
    const root = ev.currentTarget.contentDocument?.documentElement;
    if (!root) return;
    const fit = () => setH(root.scrollHeight);
    fit();
    roRef.current?.disconnect();
    roRef.current = new ResizeObserver(fit);
    roRef.current.observe(root);
  };
  return (
    <div ref={boxRef} style={{ height: h && scale ? h * scale : '100%', position: 'relative' }}>
      {html && scale > 0 && (
        <iframe
          title="Page preview"
          srcDoc={html}
          sandbox="allow-same-origin"
          tabIndex={-1}
          aria-hidden="true"
          loading="lazy"
          onLoad={onLoad}
          style={{ width: PAGE_W, height: h || 2000, border: 0, display: 'block', transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none', background: '#fff' }}
        />
      )}
    </div>
  );
}

function PageCard({ href, page, cat, title, meta, onDelete }) {
  // Rendered only when the card reaches the viewport (a page is a full HTML document)
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShow(true); return undefined; }
    const io = new IntersectionObserver(en => { if (en.some(e => e.isIntersecting)) { setShow(true); io.disconnect(); } }, { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className={b.cardWrap}>
      <a ref={ref} className={s.card} href={href} {...panProps}>
        <div className={s.cardPreview} data-stack="">
          <div className={x.pageStack}>{show && <LivePage page={page} />}</div>
        </div>
        <div className={s.cardBody}>
          <span className={s.cardCat}>{cat}</span>
          <h3 className={s.cardTitle}>{title}</h3>
          <span className={s.cardMeta}>{meta}</span>
        </div>
      </a>
      {/* A sibling of the link (a button can't sit inside one), shown on hover */}
      <button type="button" className={b.cardDel} onClick={onDelete} title="Delete" aria-label={`Delete ${title}`}>{TRASH}</button>
    </div>
  );
}

/* "Your pages": the blank card plus FIRST of the visitor's pages (autosave first, then My pages,
   newest first) fill one row of 5; Load more adds MORE (another full row). Live page previews
   render only for the cards shown. */
const FIRST = 4;
const MORE = 5;

export default function StartCards() {
  const [auto, setAuto] = useState(null);
  const [pages, setPages] = useState([]);
  const [count, setCount] = useState(FIRST);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (['page', 'starter', 'add'].some(k => q.has(k))) { window.location.replace(`${EDITOR}${window.location.search}${window.location.hash}`); return undefined; }
    let live = true;
    store.getAutosave('page').then(a => { if (live && sectionsOf(a).length) setAuto(a); }).catch(() => {});
    const load = () => store.listDesigns().then(list => { if (live) setPages(list); }).catch(() => {});
    load();
    const off = store.onDesignsChange(load);
    return () => { live = false; off?.(); };
  }, []);

  const items = [
    ...(auto ? [{ key: 'auto', href: EDITOR, page: auto, cat: 'Autosaved', title: 'Continue editing', meta: `${auto.name || 'Your website'} · ${sizeOf(auto)}`,
      ask: { title: 'Discard the autosave?', message: `“${auto.name || 'Your website'}” hasn’t been saved to My pages. Discarding it can’t be undone.`, okLabel: 'Discard' },
      remove: () => store.clearAutosave('page').then(() => setAuto(null)) }] : []),
    ...pages.map(d => ({ key: d.id, href: `${EDITOR}?page=${encodeURIComponent(d.id)}`, page: d.state, cat: 'My pages', title: d.name, meta: `${sizeOf(d.state)} · ${when(d.updated)}`,
      ask: { title: 'Delete this website?', message: `“${d.name}” will be removed from My pages. This can’t be undone.`, okLabel: 'Delete' },
      remove: () => store.deleteDesign(d.id) })),
  ];
  const total = items.length;
  const shown = items.slice(0, count);

  return (
    <>
      {/* Starting from scratch is the first card of All Templates (TemplateGallery); "Your pages"
          (autosave + My pages) only appears once there is something to show */}
      {total > 0 && (
        <>
          <div className={s.sectionHead}>
            <h2>Your pages</h2>
            <span>{total}</span>
          </div>
          <div className={`${s.grid} ${s.grid5}`}>
            {shown.map(it => <PageCard key={it.key} href={it.href} page={it.page} cat={it.cat} title={it.title} meta={it.meta} onDelete={() => setConfirm({ ...it.ask, danger: true, onOk: () => it.remove().catch(() => {}) })} />)}
          </div>
        </>
      )}
      <LoadMore shown={shown.length} total={total} onLoadMore={() => setCount(n => n + MORE)} />
      {confirm && <ConfirmDialog {...confirm} onCancel={() => setConfirm(null)} onOk={() => { const go = confirm.onOk; setConfirm(null); go(); }} />}
    </>
  );
}
