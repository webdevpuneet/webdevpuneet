'use client';

/* "Add a section" dialog for the Website Builder: a large modal with search and category
   filters. Clicking a section opens a live preview (the real section, with the page's theme
   and fonts, at phone / tablet / desktop widths) and a "Use this section" button. The top
   strip creates a new Custom Section or reuses custom sections saved in the section editor.
   The grid shows two rows of cards; Load more adds two rows (10). */
import { useEffect, useMemo, useRef, useState } from 'react';
import b from './styles.module.css';
import { SECTION_TEMPLATES, SECTION_CATEGORIES, defaultSectionState, restoreSectionState, sectionTemplateById, sectionCategoryById } from '@/components/SectionTemplates/templates/index.js';
import { documentHtml } from '@/components/SectionTemplates/templates/render.js';
import { sectionDesignStore } from '@/components/SectionTemplates/storage';
import { SavedSectionPreview } from '@/components/SectionTemplates';

const previewOf = id => `/images/section-templates/previews/${id}.png`;
const ICON = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true };
const DEVICES = [
  ['desktop', 'Desktop', '100%', <svg key="d" {...ICON}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>],
  ['tablet', 'Tablet', '820px', <svg key="t" {...ICON}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M12 18h.01" /></svg>],
  ['phone', 'Phone', '390px', <svg key="p" {...ICON}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M12 18h.01" /></svg>],
];

/* A saved design's real, live render, scaled to the card's width (loads once near the screen) */
function SavedThumb({ design }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  return <span ref={ref} className={b.savedThumb} aria-hidden="true">{w > 0 && seen ? <SavedSectionPreview design={design} width={w} /> : null}</span>;
}

const ROWS_AT_FIRST = 2; // rows of ready-made sections shown first; Load more adds two rows
const CUSTOM = sectionTemplateById('custom-section');
const ago = iso => { try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); } catch { return ''; } };

export default function SectionPickerModal({ open, onClose, onUse, page, below }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [chosen, setChosen] = useState(null); // { t, state?, title }
  const [device, setDevice] = useState('desktop');
  const [rows, setRows] = useState(ROWS_AT_FIRST);
  const [cols, setCols] = useState(4);
  const [saved, setSaved] = useState([]); // sections saved in the section editor (My designs)
  const [allSaved, setAllSaved] = useState(false);
  const gridRef = useRef(null);
  useEffect(() => setRows(ROWS_AT_FIRST), [q, cat]);
  // How many cards fit in one row of the grid (it fills the width with auto-fill columns)
  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const measure = () => setCols(Math.max(1, getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, chosen]);
  useEffect(() => {
    if (!open) return;
    sectionDesignStore.listDesigns().then(list => setSaved(list.filter(d => sectionTemplateById(d.tpl)).sort((a, b2) => String(b2.updated).localeCompare(String(a.updated))))).catch(() => setSaved([]));
  }, [open]);
  const searchRef = useRef(null);
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);

  const LIB = useMemo(() => SECTION_TEMPLATES.filter(t => !t.custom), []);
  const cats = useMemo(() => SECTION_CATEGORIES.filter(c => LIB.some(t => t.category === c.id)), [LIB]);
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return LIB.filter(t => {
      if (cat !== 'all' && t.category !== cat) return false;
      if (!words.length) return true;
      const hay = `${t.name} ${t.description} ${(t.tags || []).join(' ')} ${sectionCategoryById(t.category)?.label || ''}`.toLowerCase();
      return words.every(w => hay.includes(w));
    });
  }, [q, cat, LIB]);
  const counts = useMemo(() => Object.fromEntries(cats.map(c => [c.id, LIB.filter(t => t.category === c.id).length])), [cats, LIB]);
  const limit = cols * rows;

  // Live preview document: the page's theme, fonts and motion over the section's sample content
  const doc = useMemo(() => {
    if (!chosen) return '';
    const base = chosen.state ? restoreSectionState(chosen.t, chosen.state) : defaultSectionState(chosen.t);
    const st = { ...base, theme: page?.theme, fonts: page?.fonts, motion: page?.motion };
    // The frame is sandboxed (its own origin), so a custom section's scripts can run here.
    // Uploaded images live in this browser's store; the preview shows the typed image links.
    return documentHtml(chosen.t, st, { clean: true, extraHead: '<style>html{scroll-behavior:auto}</style>' });
  }, [chosen, page]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    setChosen(null);
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
  const width = DEVICES.find(d => d[0] === device)[2];

  return (
    <div className={b.modalBack} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} className={b.modal} role="dialog" aria-modal="true" aria-label="Add a section">
        <header className={b.modalHead}>
          <h2 className={b.modalTitle}>{chosen ? chosen.title : 'Add a section'}</h2>
          {!chosen && (
            <input ref={searchRef} className={b.modalSearch} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${LIB.length} sections (hero, pricing, gallery, share…)`} aria-label="Search sections" />
          )}
          <button type="button" className={b.modalClose} onClick={onClose} aria-label="Close">×</button>
        </header>

        {!chosen ? (
          <>
            <div className={b.modalCats} role="radiogroup" aria-label="Section type">
              <button type="button" role="radio" aria-checked={cat === 'all'} className={`${b.cat} ${cat === 'all' ? b.catOn : ''}`} onClick={() => setCat('all')}>All <em>{LIB.length}</em></button>
              {cats.map(c => (
                <button key={c.id} type="button" role="radio" aria-checked={cat === c.id} className={`${b.cat} ${cat === c.id ? b.catOn : ''}`} onClick={() => setCat(c.id)}>{c.label} <em>{counts[c.id]}</em></button>
              ))}
            </div>
            <div className={b.modalBody}>
              {CUSTOM && !q && cat === 'all' && (
                <div className={b.customStrip}>
                  <h3 className={b.stripTitle}>Custom and saved sections{saved.length ? <em> {saved.length} saved</em> : null}</h3>
                  <div className={b.modalGrid}>
                    <a className={`${b.modalCard} ${b.createCard}`} href={`/website-section-templates/${CUSTOM.id}/?new=1`} target="_blank" rel="noopener" onClick={onClose}>
                      <span className={b.createThumb} aria-hidden="true">
                        <span className={b.createPlus}>+</span>
                        <span className={b.createMock}><i /><i /><i /></span>
                      </span>
                      <span className={b.modalCardCat}>Custom section</span>
                      <strong>Create custom section</strong>
                      <small className={b.savedWhen}>Opens the editor in a new tab. Rows, columns, text, images, buttons and your own HTML, CSS and JS</small>
                    </a>
                    {saved.slice(0, allSaved ? saved.length : Math.max(0, cols - 1)).map(d => {
                      const st = sectionTemplateById(d.tpl);
                      return (
                        <button key={d.id} type="button" className={b.modalCard} onClick={() => { setChosen({ t: st, state: d.state, title: d.name, saved: d }); setDevice('desktop'); }}>
                          <SavedThumb design={d} />
                          <span className={b.modalCardCat}>{st.custom ? 'Custom section' : `Saved · ${st.name}`}</span>
                          <strong>{d.name}</strong>
                          <small className={b.savedWhen}>Saved {ago(d.updated)}</small>
                        </button>
                      );
                    })}
                  </div>
                  {saved.length > cols - 1 && (
                    <div className={b.modalMore}>
                      <button type="button" className={b.moreBtn} onClick={() => setAllSaved(v => !v)}>{allSaved ? 'Show fewer' : `Show all saved (${saved.length})`}</button>
                    </div>
                  )}
                </div>
              )}
              {list.length > 0 && (
                <h3 className={`${b.stripTitle} ${b.stripTitleGap}`}>
                  {q ? 'Search results' : cat === 'all' ? 'Ready-made sections' : `${sectionCategoryById(cat)?.label} sections`}
                  <em> {list.length}</em>
                </h3>
              )}
              {list.length ? (
                <div ref={gridRef} className={b.modalGrid}>
                  {list.slice(0, limit).map(t => (
                    <button key={t.id} type="button" className={b.modalCard} onClick={() => { setChosen({ t, title: t.name }); setDevice('desktop'); }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewOf(t.id)} alt="" loading="lazy" />
                      <span className={b.modalCardCat}>{sectionCategoryById(t.category)?.label}</span>
                      <strong>{t.name}</strong>
                    </button>
                  ))}
                </div>
              ) : null}
              {list.length > limit && (
                <div className={b.modalMore}>
                  <button type="button" className={b.moreBtn} onClick={() => setRows(n => n + 2)}>Load more</button>
                  <span>Showing {Math.min(limit, list.length)} of {list.length}</span>
                </div>
              )}
              {list.length ? null : (
                <p className={b.modalEmpty}>No sections match “{q}”. <button type="button" className={b.back} onClick={() => { setQ(''); setCat('all'); }}>Clear search</button></p>
              )}
            </div>
          </>
        ) : (
          <div className={b.modalDetail}>
            <div className={b.modalPreviewCol}>
              <div className={b.modalDevices} role="radiogroup" aria-label="Preview size">
                {DEVICES.map(([id, label, , icon]) => (
                  <button key={id} type="button" role="radio" aria-checked={device === id} aria-label={label} title={label} className={`${b.deviceBtn} ${device === id ? b.catOn : ''}`} onClick={() => setDevice(id)}>{icon}</button>
                ))}
              </div>
              <div className={b.modalFrameWrap}>
                <iframe key={chosen.saved?.id || chosen.t.id} className={b.modalFrame} style={{ width }} title={`${chosen.title} preview`} srcDoc={doc} sandbox="allow-scripts" />
              </div>
            </div>
            <aside className={b.modalSide}>
              <div className={b.modalActions}>
                <button type="button" className={b.useBtn} onClick={() => onUse(chosen.t.id, chosen.state || null, { edit: !!chosen.saved })}>Use this section{below ? ' (below the selected one)' : ''}</button>
                <button type="button" className={b.backBtn} onClick={() => setChosen(null)}>← Back to all sections</button>
              </div>
              <p className={b.modalCardCat}>{chosen.saved ? `Your saved ${chosen.t.custom ? 'custom section' : chosen.t.name}` : sectionCategoryById(chosen.t.category)?.label}</p>
              <p className={b.modalDesc}>{chosen.saved ? 'Saved in the section editor. It is added as a copy, so editing it here does not change the saved one.' : chosen.t.description}</p>
              {!chosen.saved && chosen.t.bestFor?.length > 0 && (<><h3 className={b.modalH3}>Best for</h3><ul className={b.modalList}>{chosen.t.bestFor.map(x => <li key={x}>{x}</li>)}</ul></>)}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
