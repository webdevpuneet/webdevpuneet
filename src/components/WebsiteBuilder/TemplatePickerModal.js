'use client';

/* "Start from a template" dialog for the Website Builder: the same large modal as the section
   picker, with search and industry filters. Clicking a template shows the whole page and
   "Use as one page" / "Use multi-page website" buttons. The template replaces the current
   (empty) website. */
import { useEffect, useMemo, useRef, useState } from 'react';
import b from './styles.module.css';
import x from '../SectionTemplates/styles.module.css';
import InViewImg from '@/components/InViewImg';
import { LivePage, panProps } from './StartCards';
import { isSite } from '@/components/SectionTemplates/templates/site.js';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import { WEBSITE_TEMPLATES, TEMPLATE_INDUSTRIES } from '@/components/SectionTemplates/templates/starters.js';
import { starterPageList } from '@/components/SectionTemplates/templates/site.js';
import { pageFromStarter, pageDocumentHtml } from '@/components/SectionTemplates/templates/page.js';

const fullOf = id => `/images/website-templates/full/${id}.jpg`;
const ICON = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true };
const DEVICES = [ // same preview sizes as the section picker
  ['desktop', 'Desktop', '100%', <svg key="d" {...ICON}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>],
  ['tablet', 'Tablet', '820px', <svg key="t" {...ICON}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M12 18h.01" /></svg>],
  ['phone', 'Mobile', '390px', <svg key="p" {...ICON}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M12 18h.01" /></svg>],
];
const DEMOS = 'https://webdevpuneet.com/demos/website-templates/'; // live demos (scripts/export-website-demos.mjs)
const ARROW = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>;
const ago = iso => { try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); } catch { return ''; } };
const PAGE = 10; // two rows of five; Load more adds two rows

/* A saved website: its live home page, panned top to bottom on hover (like "Your pages" on
   /website-builder/); rendered only once the card nears the screen */
function SavedCard({ d, onOpen }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = isSite(d.state) ? d.state.pages?.length || 0 : 0;
  return (
    <button ref={ref} type="button" className={`${b.modalCard} ${b.tplCard}`} onClick={() => onOpen(d)} {...panProps}>
      <span className={b.tplPreview} data-stack="">
        <span className={x.pageStack}>{seen && <LivePage page={d.state} />}</span>
      </span>
      <span className={b.modalCardCat}>My pages</span>
      <strong>{d.name}</strong>
      <small className={b.savedWhen}>{n > 1 ? `${n} pages · ` : ''}Saved {ago(d.updated)}</small>
    </button>
  );
}

export default function TemplatePickerModal({ open, onClose, onUse, saved = [], onOpenSaved }) {
  const [allSaved, setAllSaved] = useState(false);
  const [q, setQ] = useState('');
  const [ind, setInd] = useState('all');
  const [chosen, setChosen] = useState(null);
  const [shown, setShown] = useState(PAGE);
  const [device, setDevice] = useState('desktop');
  const searchRef = useRef(null);
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);
  useEffect(() => setShown(PAGE), [q, ind]);

  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return [...WEBSITE_TEMPLATES].reverse()
      .filter(t => ind === 'all' || t.industry === ind)
      .filter(t => !words.length || words.every(w => `${t.name} ${t.industry} ${t.blurb}`.toLowerCase().includes(w)));
  }, [q, ind]);
  const pages = useMemo(() => (chosen ? starterPageList(chosen.id) : []), [chosen]);
  // Live preview document: the template's one-page version, rendered like the section picker's preview
  const doc = useMemo(() => (chosen ? pageDocumentHtml(pageFromStarter(chosen.id), { clean: true, extraHead: '<style>html{scroll-behavior:auto}</style>' }) : ''), [chosen]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    setChosen(null);
    setDevice('desktop');
    const t = setTimeout(() => searchRef.current?.focus(), 30);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(t); document.body.style.overflow = prevOverflow; lastFocus.current?.focus?.(); };
  }, [open]);

  // Escape: closes the preview first, then the dialog. Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') { e.preventDefault(); if (chosen) setChosen(null); else onClose(); return; }
      if (e.key !== 'Tab') return;
      const f = [...(dialogRef.current?.querySelectorAll('button:not([disabled]),input,[href],[tabindex]:not([tabindex="-1"])') || [])].filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, chosen, onClose]);

  if (!open) return null;

  return (
    <div className={chosen ? `${b.modalBack} ${b.modalBackWide}` : b.modalBack} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} className={chosen ? `${b.modal} ${b.modalWide}` : b.modal} role="dialog" aria-modal="true" aria-label="Start from a template">
        <header className={b.modalHead}>
          <h2 className={b.modalTitle}>{chosen ? chosen.name : 'Start from a template'}</h2>
          {chosen && (
            <div className={b.headDevices} role="radiogroup" aria-label="Preview size">
              {DEVICES.map(([id, label, , icon]) => (
                <button key={id} type="button" role="radio" aria-checked={device === id} aria-label={label} title={label} className={`${b.deviceBtn} ${device === id ? b.catOn : ''}`} onClick={() => setDevice(id)}>{icon}</button>
              ))}
            </div>
          )}
          {!chosen && (
            <input ref={searchRef} className={b.modalSearch} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${WEBSITE_TEMPLATES.length} website templates (restaurant, gym, SaaS…)`} aria-label="Search website templates" />
          )}
          <button type="button" className={b.modalClose} onClick={onClose} aria-label="Close">×</button>
        </header>

        {!chosen ? (
          <>
            <div className={b.modalCats} role="radiogroup" aria-label="Industry">
              <button type="button" role="radio" aria-checked={ind === 'all'} className={`${b.cat} ${ind === 'all' ? b.catOn : ''}`} onClick={() => setInd('all')}>All <em>{WEBSITE_TEMPLATES.length}</em></button>
              {TEMPLATE_INDUSTRIES.map(i => (
                <button key={i} type="button" role="radio" aria-checked={ind === i} className={`${b.cat} ${ind === i ? b.catOn : ''}`} onClick={() => setInd(i)}>{i} <em>{WEBSITE_TEMPLATES.filter(t => t.industry === i).length}</em></button>
              ))}
            </div>
            <div className={b.modalBody}>
              {!q && ind === 'all' && saved.length > 0 && (
                <div className={b.customStrip}>
                  <h3 className={b.stripTitle}>Your pages<em> {saved.length}</em></h3>
                  <div className={b.modalGrid}>
                    {saved.slice(0, allSaved ? saved.length : 5).map(d => <SavedCard key={d.id} d={d} onOpen={onOpenSaved} />)}
                  </div>
                  {saved.length > 5 && (
                    <div className={b.modalMore}>
                      <button type="button" className={b.moreBtn} onClick={() => setAllSaved(v => !v)}>{allSaved ? 'Show fewer' : `Show all (${saved.length})`}</button>
                    </div>
                  )}
                </div>
              )}
              {list.length > 0 && <h3 className={`${b.stripTitle} ${b.stripTitleGap}`}>{q ? 'Search results' : ind === 'all' ? 'All templates' : `${ind} templates`}<em> {list.length}</em></h3>}
              {list.length ? (
                <div className={b.modalGrid}>
                  {list.slice(0, shown).map(t => (
                    // Tall card with the whole page: the preview scrolls top to bottom while hovered
                    <button key={t.id} type="button" className={`${b.modalCard} ${b.tplCard}`} onClick={() => setChosen(t)} title={t.blurb} {...panHandlers}>
                      <span className={b.tplPreview}>
                        <InViewImg className={b.tplImg} src={fullOf(t.id)} alt={`${t.name} template preview`} />
                      </span>
                      <span className={b.modalCardCat}>{t.industry}</span>
                      <strong>{t.name}</strong>
                      <small className={b.savedWhen}>{t.sections.length} sections</small>
                    </button>
                  ))}
                </div>
              ) : (
                <p className={b.modalEmpty}>No templates match “{q}”. <button type="button" className={b.back} onClick={() => { setQ(''); setInd('all'); }}>Clear search</button></p>
              )}
              {list.length > shown && (
                <div className={b.modalMore}>
                  <button type="button" className={b.moreBtn} onClick={() => setShown(n => n + PAGE)}>Load more</button>
                  <span>Showing {shown} of {list.length}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={b.modalDetail}>
            <div className={b.modalPreviewCol}>
              <div className={b.modalFrameWrap} style={{ paddingTop: 14 }}>
                <iframe key={chosen.id} className={b.modalFrame} style={{ width: DEVICES.find(d => d[0] === device)[2] }} title={`${chosen.name} template preview`} srcDoc={doc} sandbox="allow-scripts" />
              </div>
            </div>
            <aside className={b.modalSide}>
              <div className={b.modalActions}>
                <button type="button" className={b.useBtn} onClick={() => onUse(chosen.id, false)}>Use as one page</button>
                {pages.length > 1 && <button type="button" className={b.backBtn} onClick={() => onUse(chosen.id, true)}>Use multi-page website ({pages.length} pages)</button>}
                <span className={b.demoLabel}>Live demo</span>
                <div className={b.demoLinks}>
                  <a className={b.demoLink} href={`${DEMOS}${chosen.id}/one-page/`} target="_blank" rel="noopener">One page {ARROW}</a>
                  {pages.length > 1 && <a className={b.demoLink} href={`${DEMOS}${chosen.id}/multi-page/`} target="_blank" rel="noopener">Multi-page {ARROW}</a>}
                </div>
                <button type="button" className={b.backBtn} onClick={() => setChosen(null)}>← Back to all templates</button>
              </div>
              <p className={b.modalCardCat}>{chosen.industry}</p>
              <p className={b.modalDesc}>{chosen.blurb}</p>
              {pages.length > 1 && (<><h3 className={b.modalH3}>Pages in the multi-page version</h3><ul className={b.modalList}>{pages.map(p => <li key={p.file}>{p.name}</li>)}</ul></>)}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
