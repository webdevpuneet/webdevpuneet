'use client';

/* "My designs" strip for a template gallery page: every design saved in this browser
   (IndexedDB), newest first, in a single horizontal row of compact cards that scrolls
   sideways. Each card opens the design in its editor. Renders nothing until something
   is saved. */

import { useEffect, useRef, useState } from 'react';
import rs from '../UiSnippetsTool/RelatedCarousel.module.css';
import gs from '../SocialPostTemplates/styles.module.css';
import hs from '../HomeTemplatesCarousel/styles.module.css';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import st from './styles.module.css';

const fmtDate = iso => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

/**
 * @param store      a design store from src/lib/design-store.js
 * @param basePath   '/social-post-templates/' or '/email-templates/'
 * @param nameOf     template id -> template name
 * @param imgFor     design -> image URL for its card
 * @param scroll     pan tall images on hover (emails)
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
export default function SavedDesignsStrip({ store, basePath, nameOf, imgFor, renderPreview = null, scroll = false, query = '', maxFour = false }) {
  const [designs, setDesigns] = useState(null);
  const [expanded, setExpanded] = useState(false);
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
  if (!designs?.length) return null;
  // The gallery search filters saved designs too (design name or template name)
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = designs.filter(d => words.every(w => `${d.name} ${nameOf(d.tpl)}`.toLowerCase().includes(w)));
  if (!shown.length) return null;

  return (
    <section className={`${rs.section} ${st.wrap}`} aria-label="My designs">
      <div className={rs.header}>
        <h2 className={rs.title}>My designs</h2>
        <span className={rs.headCount}>{words.length ? `${shown.length} of ${designs.length} match` : `${designs.length} saved in this browser`}</span>
        {cols > 0 && shown.length > cols && (
          <button type="button" className={st.toggle} onClick={() => setExpanded(v => !v)}>{expanded ? 'Show one row' : `Show all ${shown.length}`}</button>
        )}
      </div>
      {/* Same column grid as "All Templates", so the cards line up; one row unless expanded */}
      <div ref={rowRef} className={`${gs.grid} ${maxFour ? gs.grid4 : ''} ${expanded ? '' : st.oneRow}`}>
        {shown.map(d => (
          <a key={d.id} href={`${basePath}${d.tpl}/?design=${encodeURIComponent(d.id)}`} className={gs.card} title={`Open “${d.name}”`} {...(scroll && !renderPreview ? panHandlers : {})}>
            {renderPreview
              // The design itself, rendered live from its template code
              ? <LiveBox className={gs.cardPreview}>{w => renderPreview(d, w)}</LiveBox>
              : (
                <div className={gs.cardPreview}>
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
        ))}
      </div>
    </section>
  );
}
