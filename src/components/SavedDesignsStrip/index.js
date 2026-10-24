'use client';

/* "My designs" strip for a template gallery page: the designs saved in this browser
   (IndexedDB), newest first, in the gallery's own card grid. One row at first; Load more adds
   a row at a time (only the cards shown are rendered, so live previews stay cheap). Each card
   opens the design in its editor. Renders nothing until something is saved. */

import { useEffect, useRef, useState } from 'react';
import rs from '../UiSnippetsTool/RelatedCarousel.module.css';
import gs from '../SocialPostTemplates/styles.module.css';
import hs from '../HomeTemplatesCarousel/styles.module.css';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import st from './styles.module.css';
import { LoadMore } from '@/components/UiSnippetsGallery';
import ConfirmDialog from '@/components/SocialPostTemplates/ConfirmDialog';

export const TRASH = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" /></svg>;

const fmtDate = iso => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

/**
 * @param store      a design store from src/lib/design-store.js
 * @param basePath   '/social-post-templates/' or '/email-templates/'
 * @param nameOf     template id -> template name
 * @param imgFor     design -> image URL for its card
 * @param scroll     pan tall images on hover (emails)
 * @param deletable  a delete button on each card, shown on hover (asks first)
 */
/* Card preview box that reports its width, so the live preview can scale to it */
function LiveBox({ children, className }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    // Only build the live preview once the card is near the screen
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  return <div ref={ref} className={className} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>{w > 0 && seen ? children(w) : null}</div>;
}

// maxFour: at most 4 cards per row, matching galleries that use the grid4 layout
// gridClass: any other column class from the gallery stylesheet (e.g. grid5 for social posts)
// previewClass: the card's preview box (default: the gallery's portrait box; sections pass 16:10)
// leadCard: an element shown as the first card (e.g. "Create custom section"); the strip then shows even with no designs
export default function SavedDesignsStrip({ store, basePath, nameOf, imgFor, renderPreview = null, scroll = false, query = '', maxFour = false, gridClass = '', previewClass = '', deletable = false, leadCard = null }) {
  const [designs, setDesigns] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(0); // cards that fit one row of the gallery grid
  const rowRef = useRef(null);
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setCols(getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length));
    ro.observe(el);
    return () => ro.disconnect();
  }, [designs]);
  useEffect(() => {
    let live = true;
    const load = () => store.listDesigns().then(list => { if (live) setDesigns(list); });
    load();
    const off = store.onDesignsChange(load);
    return () => { live = false; off(); };
  }, [store]);
  if (!designs || (!designs.length && !leadCard)) return null;
  // The gallery search filters saved designs too (design name or template name)
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = designs.filter(d => words.every(w => `${d.name} ${nameOf(d.tpl)}`.toLowerCase().includes(w)));
  if (!shown.length && !leadCard) return null;
  // One row per step (the grid's column count, measured; 4 until it is known)
  const perRow = cols || 4;
  const visible = shown.slice(0, perRow * rows - (leadCard ? 1 : 0));

  return (
    <section className={`${rs.section} ${st.wrap}`} aria-label="My designs">
      <div className={rs.header}>
        <h2 className={rs.title}>My designs</h2>
        {designs.length > 0 && <span className={rs.headCount}>{words.length ? `${shown.length} of ${designs.length} match` : `${designs.length} saved in this browser`}</span>}
      </div>
      {/* Same column grid as "All Templates", so the cards line up */}
      <div ref={rowRef} className={`${gs.grid} ${maxFour ? gs.grid4 : ''} ${gridClass}`}>
        {leadCard}
        {visible.map(d => {
          const card = (
            <a key={d.id} href={`${basePath}${d.tpl}/?design=${encodeURIComponent(d.id)}`} className={gs.card} title={`Open “${d.name}”`} {...(scroll && !renderPreview ? panHandlers : {})}>
              {renderPreview
                // The design itself, rendered live from its template code
                ? <LiveBox className={previewClass || gs.cardPreview}>{w => renderPreview(d, w)}</LiveBox>
                : (
                  <div className={previewClass || gs.cardPreview}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={`${gs.cardImg} ${scroll ? hs.scrollImg : ''}`} src={imgFor(d)} alt={`${d.name} preview`} loading="lazy" />
                  </div>
                )}
              <div className={gs.cardBody}>
                <span className={gs.cardCat}>{nameOf(d.tpl)}</span>
                <h3 className={gs.cardTitle}>{d.name}</h3>
                <span className={gs.cardMeta}>Saved {fmtDate(d.updated)}</span>
              </div>
            </a>
          );
          if (!deletable) return card;
          // The button is a sibling of the link (a button can't sit inside one)
          return (
            <div key={d.id} className={st.cardWrap}>
              {card}
              <button type="button" className={st.cardDel} title="Delete" aria-label={`Delete ${d.name}`}
                onClick={() => setConfirm({ title: 'Delete this design?', message: `“${d.name}” will be removed from My designs. This can’t be undone.`, okLabel: 'Delete', danger: true, onOk: () => store.deleteDesign(d.id).catch(() => {}) })}>{TRASH}</button>
            </div>
          );
        })}
      </div>
      <LoadMore shown={visible.length + (leadCard ? 1 : 0)} total={shown.length + (leadCard ? 1 : 0)} onLoadMore={() => setRows(r => r + 1)} />
      {confirm && <ConfirmDialog {...confirm} onCancel={() => setConfirm(null)} onOk={() => { const go = confirm.onOk; setConfirm(null); go(); }} />}
    </section>
  );
}
