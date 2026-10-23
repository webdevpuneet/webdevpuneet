'use client';

/* Website Builder (/website-builder/editor/; /website-builder/ is the template gallery): stack navbars, sections and footers from the
   Website Section Templates library into a website with one theme, edit every section in
   place, preview it on any device and export it.

   A website is a site (templates/site.js): a shared header and footer plus one or more
   pages. The builder edits one page at a time as an ordinary page (header + page + footer,
   pageView) and writes every change back into the site (applyPageView), so the section
   tools below work unchanged. One-page sites export exactly like a single page; sites with
   more pages export as a static site (one .html per page + styles.css + script.js).

   Sites are saved in this browser (IndexedDB `wdp-website-pages`, record tpl "site"; older
   records with tpl "page" open as one-page sites); uploaded images go to the section asset
   store with keys `page:<uid>:<field>:<id>`. */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import b from './styles.module.css';
import x from '../SectionTemplates/styles.module.css';
import { ExportMenu, ForkButton, HistoryButtons, SaveButton } from '@/components/ToolbarActions';
import { toReactComponent, toVueSfc, componentName } from '@/lib/snippet-exporters';
import { dbPut } from '@/lib/uiSnippetsDb';
import { openForkTab } from '@/lib/open-fork-tab';
import ConfirmDialog from '@/components/SocialPostTemplates/ConfirmDialog';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { BrandKitPanel, loadKit, kitIsSet, saveKit } from '@/components/BrandKit';
import { makeDesignStore } from '@/lib/design-store';
import { exportDesigns, importDesigns, blobToDataUrl, dataUrlToBlob } from '@/lib/design-transfer';
import { loadCustomFonts, onFontsChange, customFontFaceCss, exportCustomFonts, importCustomFonts } from '@/lib/fonts';
import { SECTION_TEMPLATES, SECTION_CATEGORIES, sectionTemplateById, sectionCategoryById } from '@/components/SectionTemplates/templates/index.js';
import {
  pageCss, pageMarkup, pageScript, pageCdn, newPageSection, newUid, pageDocumentHtml, STARTERS, cleanAnchor, defaultAnchor,
  SECTION_SCHEMES, SECTION_SPACING, SECTION_OVERLAYS, BG_KEY, cleanSectionStyle, sectionPadding,
} from '@/components/SectionTemplates/templates/page.js';
import {
  emptySite, restoreSite, siteFromStarter, isSite, pageView, renderView, applyPageView, pageById, pageFile, pageTitle, isHomePage,
  siteFiles, usesAutoNav, addSitePage, updateSitePage, removeSitePage, reorderSitePages, pageFromLayout, PAGE_LAYOUTS, cleanSlug, cleanBaseUrl, newPageId, starterPageList,
} from '@/components/SectionTemplates/templates/site.js';
import { restoreSectionState } from '@/components/SectionTemplates/templates/index.js';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';

if (typeof window !== 'undefined') gsap.registerPlugin(Draggable, Flip);
import { ContentPanel, ThemePanel, ColorField, ArtworkPanel, withKit } from '@/components/SectionTemplates/panels';
import {
  SCROLL_PRESETS, SCROLL_STARTS, SCROLL_MODES, SCROLL_PIN_LENGTHS, SCROLL_TARGETS, SCROLL_EASES, KEY_FIELDS, REVEALS,
  scrollPresetById, scrollFromPreset, scrollSummary, cleanScroll, addTrack, removeTrack, setTrack, addKey, removeKey, setKey, trackLabel,
} from '@/components/SectionTemplates/templates/scroll.js';
import { bindInlineEdit, fieldOfTarget, useFrozenPreview } from '@/components/SectionTemplates/inline-edit';
import { putAsset, getAsset } from '@/components/SectionTemplates/storage';
import { addToLibrary } from '@/lib/image-library';
import { saveBlob, prepareUpload, EXT, previewImages, localizeImages } from '@/components/SectionTemplates/upload';

const TOOL = 'website-builder';
const store = makeDesignStore('wdp-website-pages');
const AUTOSAVE = 'page';
/* A section sent from a section editor ("Add to Website Builder"): { tpl, state, at } */
export const INCOMING_KEY = 'wdp-wb-incoming';
const DEVICES = [
  { id: 'desktop', label: 'Desktop', w: 1280, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
  { id: 'tablet', label: 'Tablet', w: 820, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M11 18h2" /></svg> },
  { id: 'mobile', label: 'Mobile', w: 390, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg> },
];
const previewOf = id => `/images/section-templates/previews/${id}.png`;
const slugify = v => String(v || 'my-website').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my-website';
const SELECT_CSS = 'section[data-uid]{cursor:pointer}section[data-uid].wb-on{outline:3px solid #6366f1;outline-offset:-3px}section[data-uid]:hover:not(.wb-on){outline:2px dashed rgba(99,102,241,.6);outline-offset:-2px}'
  // Element picker (scroll animation targets): hovered elements of the edited section light up
  + '.wb-picking section.wb-on *:hover{outline:2px solid #f59e0b!important;outline-offset:2px;cursor:crosshair!important}';

/* The picked element as { sel: '.class', i, n }: the nearest element with a usable class inside
   the section, its index among the section's elements with that class, and how many there are
   (classes are kept in exports, editor attributes are not) */
function describePick(target, section) {
  const ok = c => /^[A-Za-z_][\w-]{0,60}$/.test(c) && !/^(wb-|st-inline|is-)/.test(c);
  for (let el = target; el && el !== section; el = el.parentElement) {
    const cls = [...(el.classList || [])].find(ok);
    if (!cls) continue;
    const all = [...section.querySelectorAll(`.${cls}`)];
    return { sel: `.${cls}`, i: all.indexOf(el), n: all.length };
  }
  return null;
}
/* A link to another page of the site (about.html, index.html#pricing) */
const PAGE_LINK = /^([\w-]+\.html)(?:#([\w-]*))?$/i;
/* Every section of a saved record (a site, or an older single page) */
const sectionsOf = st => (isSite(st) ? [...(st.header || []), ...(st.pages || []).flatMap(p => p.sections || []), ...(st.footer || [])] : st?.sections || []);

/* The live page: an iframe at the device width, scaled to fit the stage, keeping its
   scroll position across updates. Clicking a section selects it. */
function PageFrame({ html, width, height, scale, selected, onSelect, onKey, onDoc, onNavigate, hash, topKey = 0 }) {
  /* Two stacked frames (double buffering): an edit loads the new page into the hidden frame,
     restores the scroll position there, and only then swaps it in. The visible frame is never
     blanked or sent back to the top, so editing doesn't flicker. */
  const refs = [useRef(null), useRef(null)];
  const [docs, setDocs] = useState([html, '']);
  const [front, setFront] = useState(0);
  const frontRef = useRef(0);
  const pending = useRef(-1);
  const seq = useRef(0);
  const lastHtml = useRef(html);
  const onDocRef = useRef(onDoc);
  onDocRef.current = onDoc;
  const selRef = useRef(selected);
  selRef.current = selected;
  const cb = useRef({});
  cb.current = { onSelect, onKey, onNavigate };
  const scrollY = useRef(0);
  useEffect(() => { if (topKey) scrollY.current = 0; }, [topKey]); // ▶ Play starts from the top
  const hashRef = useRef(hash); // a section to scroll to once, after another page's link opened this one

  useEffect(() => {
    if (html === lastHtml.current) return;
    lastHtml.current = html;
    const back = 1 - frontRef.current;
    pending.current = back;
    // A unique trailer forces a reload even when this frame already holds identical html (e.g.
    // toggling something off and on), otherwise no load event fires and the swap never happens
    seq.current += 1;
    setDocs(d => { const n = [...d]; n[back] = `${html}<!--${seq.current}-->`; return n; });
  }, [html]);

  const onLoad = i => {
    const frame = refs[i].current;
    const doc = frame?.contentDocument;
    if (!doc || !doc.body || !doc.body.firstChild) return; // the empty hidden frame
    const win = frame.contentWindow;
    // The page has smooth scrolling, so restoring the position would visibly glide
    const root = doc.documentElement;
    root.style.scrollBehavior = 'auto';
    win.scrollTo(0, scrollY.current);
    if (hashRef.current) { doc.getElementById(hashRef.current)?.scrollIntoView({ block: 'start' }); hashRef.current = ''; }
    root.style.scrollBehavior = '';
    win.addEventListener('scroll', () => { if (frontRef.current === i) scrollY.current = win.scrollY; }, { passive: true });
    doc.addEventListener('click', ev => {
      const a = ev.target.closest?.('a');
      if (a) {
        ev.preventDefault();
        // In-page links (#pricing) scroll the preview to that section (not buttons, whose
        // clicks edit their text or point to their link field)
        const href = a.getAttribute('href') || '';
        if (href.length > 1 && href.startsWith('#') && !ev.target.closest('[data-st-editing],[data-href],[data-i-href]')) { doc.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        // Links to other pages of the site (the automatic menu, about.html …) open that page
        const pg = href.match(PAGE_LINK);
        const went = pg && !ev.target.closest('[data-st-editing]') ? cb.current.onNavigate?.(pg[1], pg[2] || '') : false;
        if (went === 'here') { if (pg[2]) doc.getElementById(pg[2])?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        if (went) return;
      }
      const sec = ev.target.closest?.('section[data-uid]');
      if (sec) cb.current.onSelect(sec.getAttribute('data-uid'));
    });
    doc.addEventListener('submit', ev => ev.preventDefault());
    // Undo / redo / save shortcuts keep working while the preview has focus
    doc.addEventListener('keydown', ev => cb.current.onKey?.(ev));
    doc.querySelectorAll('section[data-uid]').forEach(el => el.classList.toggle('wb-on', el.getAttribute('data-uid') === selRef.current));
    onDocRef.current?.(doc);
    if (pending.current === i) {
      pending.current = -1;
      frontRef.current = i;
      setFront(i);
    }
  };

  // Selection changes only move the outline (no reload) and bring the section into view
  useEffect(() => {
    const frame = refs[frontRef.current].current;
    const doc = frame?.contentDocument;
    if (!doc) return;
    let target = null;
    doc.querySelectorAll('section[data-uid]').forEach(el => { const on = el.getAttribute('data-uid') === selected; el.classList.toggle('wb-on', on); if (on) target = el; });
    if (target) {
      const r = target.getBoundingClientRect();
      if (r.top < 0 || r.top > frame.contentWindow.innerHeight * 0.6) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={b.frameBox} style={{ width: width * scale, height: height * scale }}>
      {[0, 1].map(i => (
        <iframe
          key={i}
          ref={refs[i]}
          title={i === front ? 'Page preview' : 'Page preview (loading)'}
          aria-hidden={i === front ? undefined : true}
          tabIndex={i === front ? undefined : -1}
          srcDoc={docs[i]}
          onLoad={() => onLoad(i)}
          className={b.frame}
          style={{ width, height, transform: scale !== 1 ? `scale(${scale})` : undefined, ...(i === 1 ? { position: 'absolute', top: 0, left: 0 } : null), visibility: i === front ? 'visible' : 'hidden', pointerEvents: i === front ? undefined : 'none' }}
        />
      ))}
    </div>
  );
}

/* The page's sections as a list. Drag a row by its handle (GSAP Draggable): the other
   rows slide out of the way, and on release everything Flips into the new order.
   The ↑ ↓ buttons do the same from the keyboard. */
function SectionList({ sections, selected, shared, onOpen, onMove, onReorder, onDuplicate, onRemove }) {
  const listRef = useRef(null);
  const flipState = useRef(null);
  const order = sections.map(x => x.uid).join('|');

  // After a drop has re-rendered the list in its new order, animate from where rows were
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, { duration: 0.35, ease: 'power3.out' });
    flipState.current = null;
  }, [order]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const rows = Array.from(list.children);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const drags = rows.map((row, i) => Draggable.create(row, {
      type: 'y',
      trigger: row.querySelector('[data-handle]'),
      zIndexBoost: true,
      onPress() {
        this.mids = rows.map(r => { const rr = r.getBoundingClientRect(); return rr.top + rr.height / 2; });
        this.step = row.offsetHeight + 6;
        this.to = i;
        row.classList.add(b.rowDragging);
      },
      onDrag() {
        const mid = this.mids[i] + this.y;
        let to = 0;
        this.mids.forEach((m, j) => { if (j !== i && m < mid) to++; });
        if (to === this.to) return;
        this.to = to;
        rows.forEach((r, j) => {
          if (j === i) return;
          const shift = i < to && j > i && j <= to ? -this.step : to < i && j >= to && j < i ? this.step : 0;
          gsap.to(r, { y: shift, duration: reduce ? 0 : 0.2, ease: 'power2.out', overwrite: true });
        });
      },
      onRelease() {
        row.classList.remove(b.rowDragging);
        const to = this.to ?? i;
        if (to === i) { gsap.to(rows, { y: 0, duration: reduce ? 0 : 0.25, ease: 'power3.out', overwrite: true }); return; }
        flipState.current = reduce ? null : Flip.getState(rows);
        gsap.set(rows, { y: 0 });
        onReorder(i, to);
      },
    })[0]);
    return () => drags.forEach(d => d.kill());
  }, [order]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ol className={b.list} ref={listRef}>
      {sections.map((x, i) => {
        const t = sectionTemplateById(x.tpl);
        return (
          <li key={x.uid} className={`${b.row} ${selected === x.uid ? b.rowOn : ''}`}>
            <span className={b.handle} data-handle title="Drag to reorder" aria-hidden="true">⠿</span>
            <button type="button" className={b.rowMain} onClick={() => onOpen(x.uid)} title="Edit this section">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={b.thumb} src={previewOf(x.tpl)} alt="" loading="lazy" draggable="false" />
              <span className={b.rowText}><b>{t?.name}</b><small>{shared?.has(x.uid) ? 'Shared on every page' : sectionCategoryById(t?.category)?.label}{x.anchor ? ` · #${x.anchor}` : ''}</small></span>
            </button>
            <button type="button" className={b.rowBtn} onClick={() => onMove(x.uid, -1)} disabled={i === 0} title="Move up" aria-label={`Move ${t?.name} up`}>↑</button>
            <button type="button" className={b.rowBtn} onClick={() => onMove(x.uid, 1)} disabled={i === sections.length - 1} title="Move down" aria-label={`Move ${t?.name} down`}>↓</button>
            <button type="button" className={b.rowBtn} onClick={() => onDuplicate(x.uid)} title="Duplicate" aria-label={`Duplicate ${t?.name}`}>⧉</button>
            <button type="button" className={b.rowBtn} onClick={() => onRemove(x.uid)} title="Remove" aria-label={`Remove ${t?.name}`}>✕</button>
          </li>
        );
      })}
    </ol>
  );
}

/* Per-section style: colours, top / bottom spacing and a background image for this section
   only (templates/page.js sectionStyleCss renders it). */
function SectionStylePanel({ sec, tpl, theme, bgUrl, onChange, onPickBg, onRemoveBg }) {
  const st = sec.style || {};
  const scheme = st.scheme || 'page';
  const pad = sectionPadding(tpl);
  const seg = (label, value, options, onPick) => (
    <div className={s.field}>
      <span className={s.label}>{label}</span>
      <div className={`${s.seg} ${x.segSm}`} role="radiogroup" aria-label={label}>
        {options.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={value === v} className={`${s.segBtn} ${value === v ? s.segBtnActive : ''}`} onClick={() => onPick(v)}>{l}</button>)}
      </div>
    </div>
  );
  return (
    <section className={s.section}>
      <div className={b.styleHead}>
        <h2 className={s.sectionTitle} style={{ margin: 0 }}>Section style</h2>
        {sec.style && <button type="button" className={b.linkBtn} onClick={() => onChange(null)}>Reset</button>}
      </div>
      <p className={s.hint} style={{ margin: '4px 0 10px' }}>Overrides the page theme for this section only.</p>
      {seg('Colours', scheme, SECTION_SCHEMES.map(o => [o.id, o.label]), v => onChange({ scheme: v, colors: v === 'custom' ? { bg: theme.surface, text: theme.text, brand: theme.brand, ...(st.colors || {}) } : st.colors }))}
      {scheme === 'custom' && (
        <div className={s.colorGrid}>
          {[['bg', 'Background', theme.bg], ['text', 'Text', theme.text], ['brand', 'Buttons', theme.brand]].map(([k, l, d]) => (
            <ColorField key={k} label={l} value={st.colors?.[k] || d} onChange={v => onChange({ colors: { ...(st.colors || {}), [k]: v } })} />
          ))}
        </div>
      )}
      {pad ? (
        <>
          {seg('Space above', st.top || '100', SECTION_SPACING, v => onChange({ top: v }))}
          {seg('Space below', st.bottom || '100', SECTION_SPACING, v => onChange({ bottom: v }))}
        </>
      ) : <p className={s.hint}>This section sets its own height, so it has no spacing options.</p>}
      <div className={s.field}>
        <span className={s.label}>Background image</span>
        <div className={b.bgRow}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {st.bg && bgUrl && <img src={bgUrl} alt="" className={b.bgThumb} />}
          <button type="button" className={s.miniBtn} onClick={onPickBg}>{st.bg ? 'Replace' : 'Upload'}</button>
          {st.bg && <button type="button" className={s.miniBtn} onClick={onRemoveBg}>Remove</button>}
        </div>
      </div>
      {st.bg && seg('Overlay', st.overlay || '0', SECTION_OVERLAYS, v => onChange({ overlay: v }))}
      {st.bg && <p className={s.hint}>The overlay uses the section’s background colour, so text stays readable. Pair a photo with Inverted or Custom colours.</p>}
    </section>
  );
}

/* A number input that commits only valid numbers (or empty = unset), so "-" or "0." can be
   typed without the value jumping */
function NumField({ id, value, step, onCommit }) {
  const [draft, setDraft] = useState(value ?? '');
  useEffect(() => { setDraft(value ?? ''); }, [value]);
  return (
    <input
      id={id} className={s.input} type="text" inputMode="decimal" value={draft} placeholder="—"
      onChange={ev => { const v = ev.target.value; setDraft(v); if (v === '' || Number.isFinite(Number(v))) onCommit(v === '' ? '' : Number(v)); }}
      onBlur={() => setDraft(value ?? '')}
      onKeyDown={ev => {
        if (ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
        ev.preventDefault();
        const n = +((Number(draft) || 0) + (ev.key === 'ArrowUp' ? step : -step)).toFixed(3);
        setDraft(String(n)); onCommit(n);
      }}
    />
  );
}

/* Keyframes of a scroll animation: one bar per track (target) with a dot per key; the
   selected key's position, values and ease are edited below. Any edit makes it Custom. */
function KeyframeEditor({ sc, uid, onChange, hasNumbers, onPick, picking }) {
  const [sel, setSel] = useState({ t: 0, k: 0 });
  if (!sc.tracks.length) {
    return (
      <div className={b.kf}>
        <span className={s.label}>Keyframes</span>
        <button type="button" className={s.miniBtn} onClick={() => onChange(addTrack(sc, 'items'))}>+ Animate the text too</button>
      </div>
    );
  }
  const ti = Math.min(sel.t, sc.tracks.length - 1);
  const track = sc.tracks[ti];
  const ki = Math.min(sel.k, track.keys.length - 1);
  const key = track.keys[ki];
  const used = new Set(sc.tracks.map(t => t.target));
  // Role targets ("Picked element" is added with the picker; Numbers only where the section has them)
  const roles = SCROLL_TARGETS.filter(o => o.id !== 'el' && (o.id !== 'numbers' || hasNumbers));
  const free = roles.filter(t => !used.has(t.id));
  const id = p => `kf-${uid}-${p}`;
  return (
    <div className={b.kf}>
      <span className={s.label}>Keyframes</span>
      {sc.tracks.map((t, i) => (
        <div key={`${t.target}-${t.sel || ''}-${i}`} className={`${b.kfTrack} ${i === ti ? b.kfTrackOn : ''}`}>
          <div className={b.kfHead}>
            {t.target === 'el' ? (
              <>
                <span className={b.kfPicked} title={t.sel}>{trackLabel(t)}</span>
                <select className={b.kfTarget} value={t.i >= 0 ? 'one' : 'all'} aria-label="Which elements" onChange={ev => onChange(setTrack(sc, i, { i: ev.target.value === 'all' ? -1 : Math.max(0, t.pickedI ?? 0) }))}>
                  <option value="one">Only this one</option>
                  <option value="all">All like it</option>
                </select>
              </>
            ) : t.target === 'numbers' ? (
              <span className={b.kfPicked}>Numbers (count)</span>
            ) : (
              <select className={b.kfTarget} value={t.target} aria-label="Animates" onChange={ev => onChange(setTrack(sc, i, { target: ev.target.value }))}>
                {roles.filter(o => o.id !== 'numbers' && (o.id === t.target || !used.has(o.id))).map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            )}
            {(t.target === 'items') && (
              <select className={b.kfTarget} value={String(t.stagger || 0)} aria-label="One after another" title="One after another" onChange={ev => onChange(setTrack(sc, i, { stagger: Number(ev.target.value) }))}>
                {[[0, 'Together'], [0.04, 'Stagger S'], [0.08, 'Stagger M'], [0.15, 'Stagger L']].map(([v, l]) => <option key={v} value={String(v)}>{l}</option>)}
              </select>
            )}
            <button type="button" className={b.rowBtn} title="Add a keyframe" aria-label="Add a keyframe" onClick={() => { const r = addKey(sc, i); onChange(r.scroll); setSel({ t: i, k: r.key }); }}>＋</button>
            <button type="button" className={b.rowBtn} title="Remove this track" aria-label="Remove this track" onClick={() => { onChange(removeTrack(sc, i)); setSel({ t: 0, k: 0 }); }}>✕</button>
          </div>
          <div className={b.kfBar} aria-label={`${SCROLL_TARGETS.find(o => o.id === t.target)?.label} keyframes`}>
            {t.keys.map((kk, j) => (
              <button
                key={j} type="button"
                className={`${b.kfDot} ${i === ti && j === ki ? b.kfDotOn : ''}`}
                style={{ left: `${kk.at}%` }}
                title={`${kk.at}%`}
                aria-label={`Keyframe at ${kk.at}%`}
                onClick={() => setSel({ t: i, k: j })}
              />
            ))}
          </div>
        </div>
      ))}
      <div className={b.addRow}>
        {free.length > 0 && (
          <select className={`${s.input} ${b.kfAdd}`} value="" aria-label="Add a track" onChange={ev => { if (!ev.target.value) return; const n = addTrack(sc, ev.target.value); onChange(n); setSel({ t: n.tracks.length - 1, k: 0 }); }}>
            <option value="">+ Animate another part…</option>
            {free.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        )}
        <button type="button" className={`${s.miniBtn} ${picking ? s.miniBtnAccent : ''}`} onClick={() => onPick(r => { const n = addTrack(sc, 'el', { sel: r.sel, i: r.i }); onChange(n); setSel({ t: n.tracks.length - 1, k: 0 }); })} title="Click any element of this section in the preview to animate it">{picking ? 'Click it in the preview…' : '🎯 Pick an element'}</button>
      </div>
      {key && (
        <div className={b.kfKey}>
          <div className={b.kfKeyHead}>
            <b>{trackLabel(track)} · keyframe {ki + 1} of {track.keys.length}</b>
            {track.keys.length > 2 && <button type="button" className={b.linkBtn} onClick={() => { onChange(removeKey(sc, ti, ki)); setSel({ t: ti, k: Math.max(0, ki - 1) }); }}>Delete keyframe</button>}
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor={id('at')}>Position <span className={b.count}>{key.at}% of the scroll</span></label>
            <input id={id('at')} type="range" min={0} max={100} step={1} value={key.at} className={b.kfRange}
              onChange={ev => { const at = Number(ev.target.value); const n = setKey(sc, ti, ki, { at }); onChange(n); setSel({ t: ti, k: n.tracks[ti].keys.findIndex(o => o.at === at) }); }} />
          </div>
          <div className={b.kfGrid}>
            {(track.count ? [{ prop: 'count', label: 'Counted', unit: '0 = zero, 1 = full', step: 0.1 }] : KEY_FIELDS).map(f => (
              <div key={f.prop} className={s.field}>
                <label className={s.label} htmlFor={id(f.prop)}>{f.label} <span className={b.count}>{f.unit}</span></label>
                <NumField id={id(f.prop)} value={key[f.prop]} step={f.step} onCommit={v => onChange(setKey(sc, ti, ki, { [f.prop]: v }))} />
              </div>
            ))}
          </div>
          <div className={b.kfGrid}>
            {!track.count && <div className={s.field}>
              <label className={s.label} htmlFor={id('clip')}>Reveal</label>
              <select id={id('clip')} className={s.input} value={key.clip || ''} onChange={ev => onChange(setKey(sc, ti, ki, { clip: ev.target.value }))}>
                {REVEALS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>}
            <div className={s.field}>
              <label className={s.label} htmlFor={id('ease')}>Ease to next</label>
              <select id={id('ease')} className={s.input} value={key.ease || ''} disabled={ki === track.keys.length - 1} onChange={ev => onChange(setKey(sc, ti, ki, { ease: ev.target.value }))}>
                <option value="">{sc.mode === 'scrub' ? 'Linear (default)' : 'Smooth (default)'}</option>
                {SCROLL_EASES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <p className={s.hint}>Empty fields keep the element as designed at this point. Use ↑ ↓ in a field to nudge the value.</p>
        </div>
      )}
    </div>
  );
}

/* Scroll animation for one section (templates/scroll.js): pick an effect, then when it starts,
   how it plays, whether the section pins, and its keyframes. */
function ScrollAnimPanel({ sec, onChange, onPreview, hasNumbers, hasMedia, laterSections = [], onPick, picking }) {
  const sc = sec.scroll;
  const seg = (label, value, options, onPick) => (
    <div className={s.field}>
      <span className={s.label}>{label}</span>
      <div className={`${s.seg} ${x.segSm}`} role="radiogroup" aria-label={label}>
        {options.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={value === v} className={`${s.segBtn} ${value === v ? s.segBtnActive : ''}`} onClick={() => onPick(v)}>{l}</button>)}
      </div>
    </div>
  );
  const preset = sc && scrollPresetById(sc.preset);
  return (
    <section className={s.section}>
      <div className={b.styleHead}>
        <h2 className={s.sectionTitle} style={{ margin: 0 }}>Scroll animation</h2>
        {sc && <button type="button" className={b.linkBtn} onClick={onPreview}>▶ Preview</button>}
      </div>
      <div className={s.field} style={{ marginTop: 8 }}>
        <label className={s.label} htmlFor={`sa-${sec.uid}`}>Effect</label>
        <select id={`sa-${sec.uid}`} className={s.input} value={sc?.preset || (sc ? 'custom' : '')} onChange={ev => onChange(ev.target.value ? scrollFromPreset(ev.target.value) : null)}>
          <option value="">None (entrance animation only)</option>
          {SCROLL_PRESETS.filter(p => (p.needs !== 'numbers' || hasNumbers) && (p.needs !== 'media' || hasMedia)).map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          {sc && !preset && <option value="custom">Custom</option>}
        </select>
        <span className={s.hint}>{preset ? preset.note : 'Scroll-driven motion for this section, made with GSAP ScrollTrigger. It replaces the entrance animation here.'}</span>
      </div>
      {sc && (
        <>
          <p className={b.scrollSummary}>{scrollSummary(sc)}</p>
          {!sc.pin && seg('Starts', sc.start, SCROLL_STARTS, v => onChange({ ...sc, start: v }))}
          {seg('Plays', sc.mode, SCROLL_MODES, v => onChange({ ...sc, mode: v }))}
          <label className={b.check} style={{ marginTop: 4 }}><input type="checkbox" checked={sc.pin} onChange={ev => onChange({ ...sc, pin: ev.target.checked, ...(ev.target.checked ? { start: 'top top', mode: 'scrub' } : {}) })} /> Pin the section while it animates</label>
          {sc.pin && seg('Pin for', sc.pinLength, SCROLL_PIN_LENGTHS, v => onChange({ ...sc, pinLength: v }))}
          <label className={b.check} style={{ marginTop: 4 }}><input type="checkbox" checked={!!sc.desktopOnly} onChange={ev => onChange({ ...sc, desktopOnly: ev.target.checked })} /> Larger screens only (off on phones)</label>
          {hasMedia && <label className={b.check} style={{ marginTop: 4 }}><input type="checkbox" checked={!!sc.stickMedia} onChange={ev => onChange({ ...sc, stickMedia: ev.target.checked })} /> Sticky image (the text scrolls past it)</label>}
          {laterSections.length > 0 && (
            <div className={s.field} style={{ marginTop: 6 }}>
              <label className={s.label} htmlFor={`sa-until-${sec.uid}`}>Lasts until the end of</label>
              <select id={`sa-until-${sec.uid}`} className={s.input} value={sc.until || ''} onChange={ev => onChange({ ...sc, until: ev.target.value || undefined })}>
                <option value="">This section</option>
                {laterSections.map(o => <option key={o.uid} value={o.uid}>{o.name}</option>)}
              </select>
              <span className={s.hint}>Stretch the animation over the following sections, e.g. a pinned background that the next sections scroll over.</span>
            </div>
          )}
          {sc.pin && sc.until && <label className={b.check} style={{ marginTop: 4 }}><input type="checkbox" checked={!!sc.overlap} onChange={ev => onChange({ ...sc, overlap: ev.target.checked })} /> Later sections scroll over it</label>}
          <KeyframeEditor key={sec.uid} sc={sc} uid={sec.uid} onChange={onChange} hasNumbers={hasNumbers} onPick={onPick} picking={picking} />
          <p className={s.hint}>Press ▶ Preview, then drag the timeline under the preview to scrub through it. Exports include it; people who prefer reduced motion see the section without it.</p>
        </>
      )}
    </section>
  );
}

export default function WebsiteBuilder() {
  const [site, setSiteRaw] = useState(emptySite);
  const [pageId, setPageIdRaw] = useState(null); // the page being edited (null = home)
  const [navHash, setNavHash] = useState(''); // section to scroll to after a page link
  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState('page'); // page (sections) | site (pages) | theme | pages (saved) | backup
  const [showMarkers, setShowMarkers] = useState(false); // ScrollTrigger start/end markers in the preview
  const previewDocRef = useRef(null); // the preview's latest document (timeline scrubber, picker)
  /* Element picker: startPick(done) arms it; the next click in the edited section calls done */
  const [picking, setPicking] = useState(false);
  const pickRef = useRef(null);
  const editingRef = useRef(null);
  const startPick = done => {
    if (pickRef.current) { pickRef.current = null; setPicking(false); return; } // second click cancels
    pickRef.current = done; setPicking(true);
  };
  useEffect(() => { previewDocRef.current?.documentElement?.classList.toggle('wb-picking', picking); }, [picking]);
  const [editing, setEditing] = useState(null); // uid whose content is open
  editingRef.current = editing;
  // Switching or closing the section cancels the element picker
  useEffect(() => { pickRef.current = null; setPicking(false); }, [editing]);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [pickCat, setPickCat] = useState('all');
  const [device, setDevice] = useState('desktop');
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const [playing, setPlaying] = useState(0);
  const [topKey, setTopKey] = useState(0);
  const [origin, setOrigin] = useState('');
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const [current, setCurrent] = useState(null); // { id, name } of the open saved page
  const [blobUrls, setBlobUrls] = useState({});
  const [fontTick, setFontTick] = useState(0);
  const [justSaved, setJustSaved] = useState(false);
  const stageRef = useRef(null);
  const fileRef = useRef(null);
  const importRef = useRef(null);
  const uploadTarget = useRef(null);
  const toastTimer = useRef(null);
  const savedJson = useRef(null);

  const flash = useCallback(msg => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(''), Math.min(6500, 2200 + msg.length * 25));
  }, []);

  /* Undo / redo over the whole site (typing bursts grouped per 600 ms) */
  const past = useRef([]);
  const future = useRef([]);
  const lastPush = useRef(0);
  const [, setHistTick] = useState(0);
  const setSite = useCallback(next => {
    setSiteRaw(prev => {
      const value = typeof next === 'function' ? next(prev) : next;
      if (value === prev) return prev;
      const now = Date.now();
      if (now - lastPush.current > 600) { past.current.push(prev); if (past.current.length > 80) past.current.shift(); }
      lastPush.current = now;
      future.current = [];
      return value;
    });
    setHistTick(n => n + 1);
  }, []);
  const undo = useCallback(() => { setSiteRaw(prev => { const p = past.current.pop(); if (!p) return prev; future.current.push(prev); lastPush.current = 0; return p; }); setHistTick(n => n + 1); }, []);
  const redo = useCallback(() => { setSiteRaw(prev => { const n = future.current.pop(); if (!n) return prev; past.current.push(prev); lastPush.current = 0; return n; }); setHistTick(n => n + 1); }, []);

  /* The open page as an ordinary page (header + its sections + footer); every section
     tool edits it through setPage, which writes the change back into the site */
  const activePage = pageById(site, pageId);
  const page = useMemo(() => pageView(site, activePage.id), [site, activePage.id]);
  const pageIdRef = useRef(activePage.id);
  pageIdRef.current = activePage.id;
  const setPage = useCallback(next => setSite(prev => {
    const id = pageIdRef.current;
    const view = pageView(prev, id);
    const value = typeof next === 'function' ? next(view) : next;
    return value === view ? prev : applyPageView(prev, id, value);
  }), [setSite]);
  const multi = site.pages.length > 1;
  const sharedIds = useMemo(() => new Set([...site.header, ...site.footer].map(x => x.uid)), [site.header, site.footer]);
  const goToPage = (id, hash = '') => {
    if (id === activePage.id && !hash) return;
    setPageIdRaw(id); setNavHash(hash); setSelected(null); setEditing(null);
  };

  /* Restore: ?page=<id> opens a saved page, otherwise the autosave */
  useEffect(() => {
    setOrigin(window.location.origin);
    let live = true;
    (async () => {
      const wantsAdd = !!new URLSearchParams(window.location.search).get('add'); // the starter branch below clears the URL
      const addTo = new URLSearchParams(window.location.search).get('to'); // the page of a multi-page website to add to
      let loadedSite = null; // the saved website opened with ?page= (for the "added to" message)
      const id = new URLSearchParams(window.location.search).get('page');
      let done = false;
      if (id) {
        const d = await store.getDesign(id).catch(() => null);
        if (d && live) { const p = restoreSite(d.state); loadedSite = p; setSiteRaw(p); savedJson.current = JSON.stringify(p); setCurrent({ id: d.id, name: d.name }); done = true; }
      }
      if (!done) { const auto = await store.getAutosave(AUTOSAVE).catch(() => null); if (auto && live) setSiteRaw(restoreSite(auto)); }
      // ?starter=<id> from a website template page (or ?starter=blank, "Start from scratch"
      // on /website-builder/): open that template. The current page, if it has sections and
      // isn't saved, is kept in My pages first so nothing is lost.
      const starterId = new URLSearchParams(window.location.search).get('starter');
      const blank = starterId === 'blank';
      if (live && starterId && (blank || STARTERS.some(x => x.id === starterId))) {
        const auto = await store.getAutosave(AUTOSAVE).catch(() => null);
        const prev = auto ? restoreSite(auto) : null;
        let kept = '';
        if (!done && prev && sectionsOf(prev).length) {
          const rec = await store.saveDesign({ name: `${prev.name} (autosaved)`, tpl: 'site', state: prev }).catch(() => null);
          if (rec) kept = ` Your previous website was saved to Saved as “${rec.name}”.`;
        }
        // &pages=multi opens the template's multi-page version (the template page offers both)
        const next = blank ? emptySite() : siteFromStarter(starterId, { multi: new URLSearchParams(window.location.search).get('pages') === 'multi' });
        if (live) {
          setSiteRaw(next); setPageIdRaw(null);
          setCurrent(null); savedJson.current = null;
          setToast(blank ? `New empty website. Add a navbar, hero and more from the list.${kept}` : `Opened the ${next.name} template. Click any section to edit it, or add pages in the Pages tab.${kept}`);
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
      // "Add to Website Builder" from a section editor: append that section to the page
      if (live && wantsAdd) {
        let incoming = null;
        try { incoming = JSON.parse(localStorage.getItem(INCOMING_KEY) || 'null'); localStorage.removeItem(INCOMING_KEY); } catch { /* storage blocked */ }
        const t = incoming && Date.now() - (incoming.at || 0) < 10 * 60 * 1000 ? sectionTemplateById(incoming.tpl) : null;
        if (t) {
          // Appended to the chosen page (?to=, else the home page), above the shared footer; a
          // navbar or footer joins the shared ones
          const sec = { uid: newUid(), tpl: t.id, anchor: '', state: restoreSectionState(t, incoming.state) };
          setSiteRaw(st => {
            const target = st.pages.find(p => p.id === addTo) || st.pages[0];
            const view = pageView(st, target.id);
            return applyPageView(st, target.id, { ...view, sections: [...view.sections, { ...sec, anchor: defaultAnchor(t.id, view.sections) }] });
          });
          setPageIdRaw(addTo || null);
          setSelected(sec.uid);
          const named = loadedSite?.pages.length > 1 ? (loadedSite.pages.find(p => p.id === addTo) || loadedSite.pages[0]).name : '';
          setToast(`Added your ${t.name} to ${named ? `the “${named}” page` : 'the page'}. It now uses the website’s theme; change colours and fonts in the Theme tab.`);
        }
        window.history.replaceState(null, '', window.location.pathname);
      }
      if (live) setHydrated(true);
    })();
    return () => { live = false; };
  }, []);
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => { store.putAutosave(AUTOSAVE, site).catch(() => {}); }, 600);
    return () => clearTimeout(tm);
  }, [site, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    window.history.replaceState(null, '', current ? `${window.location.pathname}?page=${encodeURIComponent(current.id)}` : window.location.pathname);
  }, [current, hydrated]);
  useEffect(() => { const load = () => store.listDesigns().then(setPages).catch(() => {}); load(); return store.onDesignsChange(load); }, []);
  useEffect(() => { loadCustomFonts().then(() => setFontTick(n => n + 1)); return onFontsChange(() => setFontTick(n => n + 1)); }, []);

  /* Stage size (the page preview fills it) */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setStage({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Keyboard: Ctrl+S saves; Ctrl+Z undoes, Ctrl+Y / Ctrl+Shift+Z redoes (outside text
     fields, where the browser's own text undo applies). Also wired into the preview iframe. */
  const saveRef = useRef(null);
  const onKey = useCallback(ev => {
    if (!(ev.ctrlKey || ev.metaKey)) return;
    const k = ev.key.toLowerCase();
    if (k === 's') { ev.preventDefault(); saveRef.current?.(); return; }
    const active = ev.target?.ownerDocument?.activeElement || document.activeElement;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(active?.tagName || '') || active?.isContentEditable) return;
    if (k === 'z' && !ev.shiftKey) { ev.preventDefault(); undo(); } else if (k === 'y' || (k === 'z' && ev.shiftKey)) { ev.preventDefault(); redo(); }
  }, [undo, redo]);
  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  /* Uploaded images across every section of every page: object URLs for the preview */
  const allSections = useMemo(() => sectionsOf(site), [site]);
  const allUploads = useMemo(() => allSections.flatMap(sec => [
    ...Object.entries(sec.state.uploads || {}).map(([k, u]) => ({ uid: sec.uid, k, ...u })),
    ...(sec.style?.bg ? [{ uid: sec.uid, k: BG_KEY, ...sec.style.bg }] : []), // section background image
  ]), [allSections]);
  const uploadIds = allUploads.map(u => u.id).sort().join('|');
  useEffect(() => {
    let live = true;
    const made = [];
    (async () => {
      const next = {};
      for (const u of allUploads) {
        if (next[u.id]) continue;
        try { const rec = await getAsset(u.id); if (rec?.blob) { const url = URL.createObjectURL(rec.blob); made.push(url); next[u.id] = url; } } catch { /* missing */ }
      }
      if (live) setBlobUrls(next);
    })();
    return () => { live = false; made.forEach(u => URL.revokeObjectURL(u)); };
  }, [uploadIds]); // eslint-disable-line react-hooks/exhaustive-deps
  const uploadOf = (uid, k) => { const sec = allSections.find(x => x.uid === uid); return k === BG_KEY ? sec?.style?.bg : sec?.state.uploads?.[k]; };
  const previewSrc = (uid, k) => { const u = uploadOf(uid, k); return u ? blobUrls[u.id] || '' : ''; };
  const relativeSrc = (uid, k) => { const u = uploadOf(uid, k); return u ? `assets/${u.file}` : ''; };
  const dataUrls = async () => {
    const out = {};
    for (const u of allUploads) { const rec = await getAsset(u.id).catch(() => null); if (rec?.blob) out[`${u.uid}|${u.k}`] = await blobToDataUrl(rec.blob); }
    return out;
  };
  const customIds = [page.fonts.heading, page.fonts.body].filter(id => String(id).startsWith('c:'));
  const fontFaces = useMemo(() => (fontTick >= 0 ? customFontFaceCss(customIds) : ''), [customIds.join('|'), fontTick]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Sections */
  const setSectionState = useCallback((uid, next) => setPage(p => ({
    ...p,
    sections: p.sections.map(x => (x.uid === uid ? { ...x, state: typeof next === 'function' ? next(x.state) : next } : x)),
  })), [setPage]);
  /** Merge a change into one section's style override (null clears it) */
  const setSectionStyle = useCallback((uid, patch) => setPage(p => ({
    ...p,
    sections: p.sections.map(x => {
      if (x.uid !== uid) return x;
      const style = patch === null ? undefined : cleanSectionStyle({ ...(x.style || {}), ...patch });
      const { style: _old, ...rest } = x;
      return style ? { ...rest, style } : rest;
    }),
  })), [setPage]);
  /** Set (or with null, remove) one section's scroll animation */
  const setSectionScroll = useCallback((uid, value) => setPage(p => ({
    ...p,
    sections: p.sections.map(x => {
      if (x.uid !== uid) return x;
      const scroll = value ? cleanScroll(value) : undefined;
      const { scroll: _old, ...rest } = x;
      return scroll ? { ...rest, scroll } : rest;
    }),
  })), [setPage]);
  const addSection = tplId => {
    const sec = newPageSection(tplId, page.sections);
    if (!sec) return;
    setPage(p => {
      const at = selected ? p.sections.findIndex(x => x.uid === selected) : -1;
      const list = [...p.sections];
      list.splice(at < 0 ? list.length : at + 1, 0, sec);
      return { ...p, sections: list };
    });
    setSelected(sec.uid);
    setAdding(false);
    flash(`Added ${sectionTemplateById(tplId)?.name}. Click it in the list or the preview to edit.`);
  };
  const moveSection = (uid, dir) => setPage(p => {
    const i = p.sections.findIndex(x => x.uid === uid), to = i + dir;
    if (i < 0 || to < 0 || to >= p.sections.length) return p;
    const list = [...p.sections];
    [list[i], list[to]] = [list[to], list[i]];
    return { ...p, sections: list };
  });
  const reorderSection = (from, to) => setPage(p => {
    if (from === to || from < 0 || to < 0 || from >= p.sections.length || to >= p.sections.length) return p;
    const list = [...p.sections];
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    return { ...p, sections: list };
  });
  const duplicateSection = uid => setPage(p => {
    const i = p.sections.findIndex(x => x.uid === uid);
    if (i < 0) return p;
    // The copy gets no anchor (ids must be unique on the page); set one in its settings
    const copy = { ...p.sections[i], uid: newUid(), anchor: '', state: JSON.parse(JSON.stringify(p.sections[i].state)) };
    const list = [...p.sections];
    list.splice(i + 1, 0, copy);
    return { ...p, sections: list };
  });
  const removeSection = uid => {
    setPage(p => ({ ...p, sections: p.sections.filter(x => x.uid !== uid) }));
    if (editing === uid) setEditing(null);
    if (selected === uid) setSelected(null);
  };
  const openSection = uid => { setSelected(uid); setEditing(uid); setTab('page'); setSheetOpen(true); };
  /* Website templates open as one page or as their multi-page version */
  const [starterMulti, setStarterMulti] = useState(false);
  const starterPages = useMemo(() => Object.fromEntries(STARTERS.map(st => [st.id, starterPageList(st.id)])), []);
  const startFrom = (starterId, multiPage = false) => {
    const p = siteFromStarter(starterId, { multi: multiPage });
    setSite(p); setPageIdRaw(null);
    setCurrent(null); savedJson.current = null; setSelected(null); setEditing(null);
    const name = STARTERS.find(x => x.id === starterId)?.name.toLowerCase();
    flash(p.pages.length > 1
      ? `Started a ${p.pages.length}-page ${name}: ${p.pages.map(x => x.name).join(', ')}. Switch pages in the toolbar or the Pages tab.`
      : `Started a ${name} with ${sectionsOf(p).length} sections. Edit any section, change the theme, or add pages in the Pages tab.`);
  };

  /* Pages of the site */
  const [newPageName, setNewPageName] = useState('');
  const [newPageLayout, setNewPageLayout] = useState('about');
  const [pageOpen, setPageOpen] = useState(null); // page whose settings are expanded in the Pages tab
  const addPage = () => {
    const pg = pageFromLayout(site, newPageLayout, newPageName.trim() || undefined);
    setSite(st => addSitePage(st, pg));
    setNewPageName('');
    goToPage(pg.id);
    setPageOpen(pg.id);
    flash(`Added the ${pg.name} page${pg.sections.length ? ` with ${pg.sections.length} sections` : ''}. It shares the header, footer and theme${usesAutoNav({ ...site, pages: [...site.pages, pg] }) ? ', and the menu now links to it' : ''}.`);
  };
  const duplicatePage = id => {
    const src = pageById(site, id);
    const copy = { ...JSON.parse(JSON.stringify(src)), id: newPageId(), name: `${src.name} (copy)`, slug: '' };
    copy.sections = copy.sections.map(x => ({ ...x, uid: newUid() }));
    setSite(st => addSitePage(st, copy, id));
    goToPage(copy.id);
    flash(`Duplicated “${src.name}”.`);
  };
  const deleteSitePage = id => {
    const pg = pageById(site, id);
    setConfirm({
      title: `Delete the “${pg.name}” page?`,
      body: 'Its sections are removed from this website. Press Undo (Ctrl+Z) to bring it back.',
      okLabel: 'Delete page',
      danger: true,
      onOk: () => { setSite(st => removeSitePage(st, id)); if (activePage.id === id) goToPage(null); flash(`Deleted the “${pg.name}” page.`); },
    });
  };
  const movePage = (id, dir) => {
    const ids = site.pages.map(p => p.id);
    const i = ids.indexOf(id), to = i + dir;
    if (i < 0 || to < 0 || to >= ids.length) return;
    [ids[i], ids[to]] = [ids[to], ids[i]];
    setSite(st => reorderSitePages(st, ids));
    if (to === 0 || i === 0) flash(`“${pageById(site, ids[0]).name}” is now the home page (index.html).`);
  };
  const setPageSetting = (id, patch) => setSite(st => updateSitePage(st, id, patch));
  const navigateTo = (file, hash) => {
    const pg = site.pages.find(p => pageFile(site, p) === file);
    if (!pg) return false;
    if (pg.id === activePage.id) return 'here'; // the preview just scrolls to the section
    goToPage(pg.id, hash);
    return true;
  };

  /* Uploads (into the section being edited) */
  const pickUpload = (uid, fd, ukey) => { uploadTarget.current = { uid, fd, ukey }; fileRef.current?.click(); };
  const onUploadFile = async ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    const { uid, fd, ukey } = uploadTarget.current || {};
    if (!file || !fd) return;
    if (!/^image\//.test(file.type)) { flash('Choose an image file (PNG, JPG, WebP, GIF or SVG).'); return; }
    try {
      const out = await prepareUpload(file, fd.upload || {});
      const rid = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const key = `page:${uid}:${ukey}:${rid}`;
      const name = `${fd.upload?.name || fd.key}-${rid}.${EXT[out.type] || 'png'}`;
      await putAsset(key, { blob: out.blob, type: out.type, file: name, name, w: out.w, h: out.h, updatedAt: new Date().toISOString() });
      addToLibrary(out.blob, { file: name, w: out.w, h: out.h });
      if (ukey === BG_KEY) setSectionStyle(uid, { bg: { id: key, file: name, w: out.w, h: out.h }, overlay: '55' });
      else setSectionState(uid, st => ({ ...st, uploads: { ...st.uploads, [ukey]: { id: key, file: name, w: out.w, h: out.h } } }));
      flash(`Uploaded ${file.name} (${out.w}×${out.h}). Saved in this browser.`);
    } catch (err) { flash(err.message || 'Upload failed'); }
  };

  /* Preview */
  const shown = useMemo(() => renderView(site, activePage.id), [site, activePage.id]); // with the automatic menu
  const previewHtml = useMemo(() => previewImages(pageDocumentHtml(shown, {
    imageSrc: previewSrc, clean: false, fontFaces, motion: playing > 0,
    extraHead: `<script>window.ST_PREVIEW=true;window.ST_SCROLL_FX=true${showMarkers ? ';window.ST_SCROLL_MARKERS=true' : ''}</script><style>${SELECT_CSS}</style>`,
  }), origin), [shown, blobUrls, fontFaces, origin, playing, showMarkers]); // eslint-disable-line react-hooks/exhaustive-deps
  const autoNav = usesAutoNav(site);
  const autoNavRef = useRef(autoNav);
  autoNavRef.current = autoNav;
  const headerIdsRef = useRef(sharedIds);
  headerIdsRef.current = new Set(site.header.map(x => x.uid));
  /* Click-to-edit: text is typed right in the page preview, any other bound element opens
     its section and points to its input. The preview doesn't reload while text is edited. */
  const [shownHtml, editStart, editEnd] = useFrozenPreview(previewHtml);
  const [reveal, setReveal] = useState(null);
  const sectionsRef = useRef(page.sections);
  sectionsRef.current = page.sections;
  const onPreviewDoc = useCallback(doc => {
    previewDocRef.current = doc;
    // Element picker: a window capture listener runs before click-to-edit and section select
    const win = doc.defaultView;
    if (win && !doc.__wbPick) {
      doc.__wbPick = true;
      win.addEventListener('click', ev => {
        const done = pickRef.current;
        if (!done) return;
        ev.preventDefault(); ev.stopPropagation(); ev.stopImmediatePropagation();
        const sec = ev.target.closest?.('section[data-uid]');
        if (!sec || sec.getAttribute('data-uid') !== editingRef.current) { flash('Pick an element inside the section you are editing (outlined in blue).'); return; }
        const r = describePick(ev.target, sec);
        if (!r) { flash('That part can’t be animated on its own. Try the text, an image or a card.'); return; }
        pickRef.current = null; setPicking(false);
        done(r);
        flash(`Animating ${r.sel}${r.n > 1 ? ` (${r.i + 1} of ${r.n}; switch to “All like it” in its track to animate every one)` : ''}.`);
      }, true);
    }
    doc.documentElement.classList.toggle('wb-picking', !!pickRef.current);
    return bindInlineEdit(doc, {
    resolve: tg => {
      // The automatic menu's links come from the page names: clicking one opens that page
      if (autoNavRef.current && tg?.list === 'links' && headerIdsRef.current.has(tg.uid)) return null;
      const sec = tg?.uid && sectionsRef.current.find(o => o.uid === tg.uid);
      return sec ? fieldOfTarget(sectionTemplateById(sec.tpl), tg) : null;
    },
    onInput: (tg, v) => setSectionState(tg.uid, p => (tg.list
      ? { ...p, lists: { ...p.lists, [tg.list]: (p.lists?.[tg.list] || []).map(it => (it._id === tg.item ? { ...it, [tg.key]: v } : it)) } }
      : { ...p, fields: { ...p.fields, [tg.key]: v } })),
    onReveal: (tg, focus) => { setReveal({ ...tg, focus, n: Date.now() }); openSection(tg.uid); },
    onStart: editStart,
    onEnd: editEnd,
  }); }, [editStart, editEnd]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Timeline scrubber: drag through the edited section's scroll animation in the preview.
     Follow-scroll animations scroll the preview between their start and end (pins included);
     play-once / play-and-reverse ones pause and jump to that point. */
  const [scrub, setScrub] = useState(0);
  const scrubTo = pct => {
    setScrub(pct);
    const doc = previewDocRef.current;
    const el = doc && editing && doc.querySelector(`section[data-uid="${editing}"]`);
    const tl = el?.__stScroll;
    if (!tl) return;
    const st = tl.scrollTrigger;
    if (el.getAttribute('data-scroll')?.includes('"mode":"scrub"') && st) {
      doc.documentElement.style.scrollBehavior = 'auto';
      doc.defaultView.scrollTo(0, st.start + (st.end - st.start) * pct / 100);
    } else { tl.pause(); tl.progress(pct / 100); }
  };
  /* ▶ Play is a switch: it stays on while content is edited (the page reloads animated, keeping
     its scroll position) until ■ Stop. Turning it on starts from the top of the page. */
  const togglePlay = () => {
    if (playing > 0) { setPlaying(0); return; }
    setTopKey(k => k + 1);
    setPlaying(1);
  };
  const dev = DEVICES.find(d => d.id === device) || DEVICES[0];
  const scale = stage.w ? Math.min(1, (stage.w - 32) / dev.w) : 0;
  const frameH = stage.h && scale ? Math.max(400, Math.round((stage.h - 32) / scale)) : 800;

  /* Export */
  const fileBase = slugify(page.name);
  /* Fork: the whole page as one editable snippet in My Code (opens in a new tab) */
  const forkToMyCode = async () => {
    const tab = openForkTab();
    setBusy('fork');
    try {
      const urls = await dataUrls();
      const now = new Date().toISOString();
      const rid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `wb-${Date.now().toString(36)}`;
      const gf = pageDocumentHtml(shown, { fontFaces }).match(/<link href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)?.[1];
      /* On localhost the production image URLs aren't live yet, so point them at this origin */
      const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
        ? str => str.split('https://webdevpuneet.com/images/').join(`${location.origin}/images/`)
        : str => str;
      const js = pageScript(shown);
      await dbPut({
        id: rid,
        name: `${page.name || 'My website'}${multi ? ` · ${activePage.name}` : ''} (page)`,
        tags: ['page'],
        cdnUrls: [...(gf ? [gf] : []), ...(js ? pageCdn(shown) : [])],
        html: local(pageMarkup(shown, { imageSrc: (uid, k) => urls[`${uid}|${k}`] || '', clean: true })),
        css: local(`body{margin:0;background:${page.theme?.bg || '#fff'}}
html{scroll-behavior:smooth}section[id]{scroll-margin-top:84px}
${pageCss(shown, { fontFaces })}`),
        js: js || '',
        createdAt: now,
        updatedAt: now,
      });
      tab.go(rid);
      flash('Forked to My Code. It opened in a new tab.');
    } catch (err) { tab.cancel(); flash(`Couldn't save to My Code: ${err.message}`); }
    setBusy('');
  };
  const pageParts = imageSrc => {
    const gf = pageDocumentHtml(shown, { fontFaces }).match(/<link href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)?.[1];
    const js = pageScript(shown);
    return {
      id: multi && !isHomePage(site, activePage) ? `${fileBase}-${activePage.slug}` : fileBase,
      title: multi ? pageTitle(site, activePage) : page.name || 'My website',
      html: pageMarkup(shown, { imageSrc, clean: true }),
      css: `${gf ? `@import url('${gf}');\n` : ''}body{margin:0;background:${page.theme?.bg || '#fff'}}\nhtml{scroll-behavior:smooth}section[id]{scroll-margin-top:84px}\n${pageCss(shown, { fontFaces })}`,
      js: js || '',
      cdnUrls: js ? pageCdn(shown) : [],
    };
  };
  const downloadFrameworkZip = async kind => {
    const react = kind === 'react';
    setBusy(`${kind}zip`);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const dir = zip.folder(`${fileBase}-${kind}`);
      const seen = new Set();
      for (const u of allUploads) {
        if (seen.has(u.file)) continue;
        const rec = await getAsset(u.id).catch(() => null);
        if (rec?.blob) { dir.file(`assets/${u.file}`, rec.blob); seen.add(u.file); }
      }
      const parts = pageParts(relativeSrc);
      const a = await localizeImages(parts.html, dir, seen);
      const c = await localizeImages(parts.css, dir, seen);
      const name = componentName(parts);
      const out = { ...parts, html: a.html, css: c.html };
      dir.file(react ? `${name}.jsx` : `${name}.vue`, react ? toReactComponent(out) : toVueSfc(out));
      const missed = a.missed + c.missed;
      dir.file('README.txt', [
        `${page.name} as a ${react ? 'React' : 'Vue'} component: built with the free Website Builder, https://webdevpuneet.com/website-builder/`,
        '',
        react ? `${name}.jsx   the component (JSX with the CSS included)` : `${name}.vue   the single-file component (template, script and CSS)`,
        seen.size ? `assets/        every image the page uses (${seen.size}). Copy this folder into your public/ folder so /assets/... resolves.` : '',
        missed ? `${missed} image${missed > 1 ? 's' : ''} could not be downloaded and still load from their original URL.` : '',
      ].filter(Boolean).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${fileBase}-${kind}.zip`);
      flash(`Downloaded ${react ? 'React' : 'Vue'} ZIP${seen.size ? ` with ${seen.size} image${seen.size > 1 ? 's' : ''} in assets/` : ''}.`);
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };
  const downloadZip = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const dir = zip.folder(fileBase);
      const seen = new Set();
      for (const u of allUploads) {
        if (seen.has(u.file)) continue;
        const rec = await getAsset(u.id).catch(() => null);
        if (rec?.blob) { dir.file(`assets/${u.file}`, rec.blob); seen.add(u.file); }
      }
      let missed = 0;
      let hasScript = false;
      if (!multi) {
        // One page: one self-contained index.html (as before)
        let html = pageDocumentHtml(shown, { imageSrc: relativeSrc, fontFaces });
        ({ html, missed } = await localizeImages(html, dir, seen));
        dir.file('index.html', html);
      } else {
        // A static site: one .html per page sharing styles.css and script.js
        for (const f of siteFiles(site, { imageSrc: relativeSrc, fontFaces })) {
          if (f.path === 'script.js') hasScript = true;
          if (/\.(html|css)$/.test(f.path)) { const r = await localizeImages(f.content, dir, seen); missed += r.missed; dir.file(f.path, r.html); }
          else dir.file(f.path, f.content);
        }
      }
      dir.file('README.txt', [
        `${site.name}: built with the free Website Builder, https://webdevpuneet.com/website-builder/`,
        '',
        ...(multi ? [
          ...site.pages.map(p => `${pageFile(site, p).padEnd(20)} ${p.name}${isHomePage(site, p) ? ' (home page)' : ''}`),
          'styles.css           every page’s CSS (theme variables at the top)',
          hasScript ? 'script.js            animations and interactive parts (menus, sliders, FAQ, pricing switch)' : '',
          site.url ? `sitemap.xml          every page, for search engines (${site.url}sitemap.xml)` : 'Tip: set the site address in the builder’s Pages tab to get sitemap.xml, robots.txt and canonical links.',
        ] : ['index.html   the complete page (HTML with the CSS in a <style> tag)']),
        seen.size ? `assets/      every image the ${multi ? 'site' : 'page'} uses (${seen.size})` : '',
        missed ? `             ${missed} image${missed > 1 ? 's' : ''} could not be downloaded and still load from their original URL.` : '',
        '',
        `Upload the folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages) or open index.html.${multi ? ' Links between pages work from disk too.' : ''}`,
        'Every colour, font and size is a CSS variable at the top of the CSS (--st-brand, --st-font-heading …).',
      ].filter(Boolean).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${fileBase}.zip`);
      flash(`Downloaded ZIP${multi ? ` with ${site.pages.length} pages` : ''}${seen.size ? `${multi ? ' and' : ' with'} ${seen.size} image${seen.size > 1 ? 's' : ''} in assets/` : ''}${missed ? ` (${missed} kept as links)` : ''}.`);
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };

  /* My pages */
  const dirty = !!current && savedJson.current !== null && savedJson.current !== JSON.stringify(site);
  const saveNew = async name => {
    setBusy('save');
    try {
      const nm = name.trim() || site.name;
      const next = { ...site, name: nm };
      const rec = await store.saveDesign({ name: nm, tpl: 'site', state: next });
      setSiteRaw(next);
      savedJson.current = JSON.stringify(next);
      setCurrent({ id: rec.id, name: rec.name });
      setJustSaved(true); setTimeout(() => setJustSaved(false), 1500);
      flash(`Saved “${rec.name}” to My pages`);
    } catch (err) { flash(`Couldn't save: ${err.message}`); }
    setBusy('');
  };
  const quickSave = async () => {
    if (!current) return saveNew(site.name);
    setBusy('save');
    try {
      const old = await store.getDesign(current.id).catch(() => null);
      await store.saveDesign({ ...(old || {}), id: current.id, name: site.name, tpl: 'site', state: site });
      savedJson.current = JSON.stringify(site);
      setCurrent({ id: current.id, name: site.name });
      setJustSaved(true); setTimeout(() => setJustSaved(false), 1500);
    } catch (err) { flash(`Couldn't save: ${err.message}`); }
    setBusy('');
  };
  saveRef.current = quickSave;
  const openPage = d => {
    const p = restoreSite(d.state);
    setSite(p); setPageIdRaw(null);
    savedJson.current = JSON.stringify(p);
    setCurrent({ id: d.id, name: d.name });
    setSelected(null); setEditing(null); setTab('page');
    flash(`Opened “${d.name}”${p.pages.length > 1 ? ` (${p.pages.length} pages)` : ''}`);
  };
  const deletePage = d => setConfirm({
    title: `Delete “${d.name}”?`,
    body: 'This removes the saved website from this browser. Your autosave stays.',
    okLabel: 'Delete',
    danger: true,
    onOk: async () => { await store.deleteDesign(d.id); if (current?.id === d.id) { setCurrent(null); savedJson.current = null; } flash(`Deleted “${d.name}”`); },
  });
  const newPage = () => setConfirm({
    title: 'Start a new website?',
    body: current ? 'Your saved website stays in Saved.' : 'The current website is not saved. Save it first if you want to keep it (it stays in the autosave until you change the new one).',
    okLabel: 'New website',
    onOk: () => { setSite(emptySite()); setPageIdRaw(null); setCurrent(null); savedJson.current = null; setSelected(null); setEditing(null); setTab('page'); },
  });

  /* Backup export / import */
  const exportAll = async () => {
    setBusy('export');
    try {
      const kit = loadKit();
      const r = await exportDesigns({
        tool: TOOL,
        store,
        getAssets: async ds => {
          const ids = [...new Set(ds.flatMap(d => sectionsOf(d.state).flatMap(x => [...Object.values(x.state?.uploads || {}), x.style?.bg].filter(Boolean).map(u => u.id))))];
          const out = [];
          for (const key of ids) { const rec = await getAsset(key).catch(() => null); if (rec?.blob) out.push({ key, data: await blobToDataUrl(rec.blob), type: rec.type, name: rec.file || rec.name, w: rec.w, h: rec.h }); }
          return out;
        },
        getFonts: async ds => { const ids = [...new Set(ds.flatMap(d => Object.values(d.state?.fonts || {})).filter(id => String(id).startsWith('c:')))]; return ids.length ? exportCustomFonts(ids) : []; },
        brandKit: kitIsSet(kit) ? kit : undefined,
      });
      flash(`Exported ${r.count} website${r.count === 1 ? '' : 's'} (${(r.bytes / 1024 / 1024).toFixed(2)} MB).`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const importFile = async file => {
    if (!file) return;
    setBusy('import');
    try {
      const r = await importDesigns(file, {
        tool: TOOL,
        store,
        knownTemplate: tid => tid === 'page' || tid === 'site',
        putAssets: async assets => {
          let n = 0;
          for (const a of assets) {
            if (!a?.key || !String(a.data || '').startsWith('data:') || await getAsset(a.key).catch(() => null)) continue;
            await putAsset(a.key, { blob: await dataUrlToBlob(a.data), type: a.type, file: a.name, name: a.name, w: a.w, h: a.h, updatedAt: new Date().toISOString() });
            n++;
          }
          return n;
        },
        putFonts: fonts => importCustomFonts(fonts),
        applyKit: k => { if (kitIsSet(loadKit())) return false; saveKit(k); return true; },
      });
      const parts = [];
      if (r.added) parts.push(`${r.added} website${r.added > 1 ? 's' : ''} added`);
      if (r.copies) parts.push(`${r.copies} added as copies`);
      if (r.skipped) parts.push(`${r.skipped} already here`);
      if (r.assets) parts.push(`${r.assets} image${r.assets > 1 ? 's' : ''}`);
      if (r.fonts) parts.push(`${r.fonts} font${r.fonts > 1 ? 's' : ''}`);
      flash(parts.length ? `Imported: ${parts.join(', ')}.` : 'Nothing new in that file.');
    } catch (err) { flash(err.message || 'Import failed'); }
    setBusy('');
  };

  const editSec = page.sections.find(x => x.uid === editing);
  const editTpl = editSec ? sectionTemplateById(editSec.tpl) : null;
  const pickList = SECTION_TEMPLATES.filter(t => pickCat === 'all' || t.category === pickCat);
  const hasTextEffect = page.sections.some(x => /data-anim-text/.test(sectionTemplateById(x.tpl)?.html || ''));

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active={TOOL} />
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml" className={s.fileInput} onChange={onUploadFile} />
      <div className={s.body}>
        <aside className={`${s.controls} ${sheetOpen ? s.sheetOpen : ''}`}>
          <div className={s.toolBrandBar}>
            <a href="/website-builder/" className={s.toolBrand} title="Website Builder">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/website-builder.svg" alt="" width={26} height={26} />
              <span>Website Builder</span>
            </a>
          </div>
          <button type="button" className={s.sheetHandle} onClick={() => setSheetOpen(o => !o)} aria-expanded={sheetOpen}>
            <i aria-hidden="true" />
            {sheetOpen ? 'Hide panel' : 'Edit page'}
          </button>
          <div className={`${s.panelTabs} ${b.tabs5}`} role="tablist" aria-label="Panel" onClickCapture={() => setSheetOpen(true)}>
            {[['page', 'Sections'], ['site', 'Pages'], ['theme', 'Theme'], ['pages', 'Saved'], ['backup', 'Backup']].map(([v, l]) => (
              <button key={v} type="button" role="tab" aria-selected={tab === v} className={tab === v ? s.panelTabOn : ''} onClick={() => { setTab(v); if (v !== 'page') setEditing(null); }}>
                {l}{v === 'site' && multi && <span className={b.tabBadge}>{site.pages.length}</span>}
              </button>
            ))}
          </div>
          <div className={s.controlsScroll}>
            {tab === 'page' && editSec && editTpl ? (
              <>
                <section className={s.section}>
                  <div className={b.editHead}>
                    <button type="button" className={b.back} onClick={() => setEditing(null)}>← Sections</button>
                    <span className={b.editTitle}><b>{editTpl.name}</b><small>{sharedIds.has(editSec.uid) ? (multi ? 'Shared: changes here appear on every page' : 'Header / footer, shared with every page you add') : sectionCategoryById(editTpl.category)?.label} · theme and animation are set for the whole website</small></span>
                  </div>
                  {autoNav && site.header.some(h => h.uid === editSec.uid) && (editTpl.lists || []).some(l => l.key === 'links') && (
                    <p className={s.hint} style={{ marginTop: 10 }}>The menu links come from your pages. Rename, reorder or hide pages in the <button type="button" className={b.linkBtn} onClick={() => { setEditing(null); setTab('site'); }}>Pages tab</button>, or switch off the automatic menu there to edit the links below.</p>
                  )}
                  <div className={s.field} style={{ marginTop: 12 }}>
                    <label className={s.label} htmlFor="wb-anchor">Section link (anchor)</label>
                    <div className={b.anchorRow}>
                      <span aria-hidden="true">#</span>
                      <input
                        id="wb-anchor"
                        className={s.input}
                        value={editSec.anchor || ''}
                        placeholder="e.g. pricing"
                        maxLength={40}
                        spellCheck={false}
                        onChange={ev => setPage(p => ({ ...p, sections: p.sections.map(x => (x.uid === editSec.uid ? { ...x, anchor: cleanAnchor(ev.target.value) } : x)) }))}
                      />
                    </div>
                    {editSec.anchor && page.sections.some(x => x.uid !== editSec.uid && x.anchor === editSec.anchor)
                      ? <span className={s.hint} style={{ color: '#dc2626' }}>Another section already uses #{editSec.anchor}. Anchors must be unique.</span>
                      : <span className={s.hint}>Navbar and button links to <b>#{editSec.anchor || 'anchor'}</b> scroll to this section. Leave empty for none.</span>}
                  </div>
                </section>
                <SectionStylePanel
                  sec={editSec}
                  tpl={editTpl}
                  theme={page.theme}
                  bgUrl={editSec.style?.bg ? blobUrls[editSec.style.bg.id] : ''}
                  onChange={patch => setSectionStyle(editSec.uid, patch)}
                  onPickBg={() => pickUpload(editSec.uid, { key: 'background', upload: { name: 'background', maxW: 2400 } }, BG_KEY)}
                  onRemoveBg={() => setSectionStyle(editSec.uid, { bg: null, overlay: null })}
                />
                <ArtworkPanel
                  art={editSec.state.art}
                  idPrefix={`wa-${editSec.uid}`}
                  onChange={next => {
                    setSectionState(editSec.uid, st => { const { art: _old, ...rest } = st; return next ? { ...rest, art: next } : rest; });
                    if (next?.anim && next.anim !== editSec.state.art?.anim) setPlaying(n => n + 1);
                  }}
                />
                <ScrollAnimPanel
                  sec={editSec}
                  onChange={v => { setSectionScroll(editSec.uid, v); if (v) setPlaying(n => n + 1); }}
                  onPreview={() => setPlaying(n => n + 1)}
                  hasNumbers={/data-count/.test(editTpl.html)}
                  hasMedia={/data-anim="media"/.test(editTpl.html)}
                  laterSections={page.sections.slice(page.sections.findIndex(o => o.uid === editSec.uid) + 1).map(o => ({ uid: o.uid, name: sectionTemplateById(o.tpl)?.name || o.tpl }))}
                  onPick={startPick}
                  picking={picking}
                />
                <ContentPanel
                  key={editSec.uid}
                  t={editTpl}
                  state={editSec.state}
                  setState={next => setSectionState(editSec.uid, next)}
                  blobUrls={blobUrls}
                  onPickUpload={(fd, ukey) => pickUpload(editSec.uid, fd, ukey)}
                  idPrefix={`wb-${editSec.uid}`}
                  reveal={reveal?.uid === editSec.uid ? reveal : null}
                />
              </>
            ) : tab === 'page' ? (
              <>
                <section className={s.section}>
                  <label className={s.label} htmlFor="wb-name">Website name</label>
                  <input id="wb-name" className={`${s.input} ${b.pageName}`} value={site.name} maxLength={80} onChange={ev => setPage(p => ({ ...p, name: ev.target.value }))} />
                  <p className={s.hint}>{multi ? 'The home page’s <title>, the end of every other page’s title, and the name in Saved.' : 'Used as the page’s <title> in your export and as its name in Saved.'}</p>
                </section>
                <section className={s.section}>
                  {multi && (
                    <div className={b.pageBar}>
                      <span>Editing <b>{activePage.name}</b> <code>{pageFile(site, activePage)}</code></span>
                      <button type="button" className={b.linkBtn} onClick={() => setTab('site')}>All pages →</button>
                    </div>
                  )}
                  <h2 className={s.sectionTitle}>Sections {page.sections.length > 0 && <span style={{ opacity: 0.6, fontWeight: 500 }}>({page.sections.length})</span>}</h2>
                  {page.sections.length === 0 && !adding && (
                    <>
                      <p className={s.hint}>Start from a template, or add sections one by one. <a href="/website-builder/" target="_blank" rel="noopener">Browse all templates ↗</a></p>
                      <div className={`${s.seg} ${b.starterMode}`} role="radiogroup" aria-label="Template version">
                        {[[false, 'One page'], [true, 'Multi-page']].map(([v, l]) => (
                          <button key={l} type="button" role="radio" aria-checked={starterMulti === v} className={`${s.segBtn} ${starterMulti === v ? s.segBtnActive : ''}`} onClick={() => setStarterMulti(v)}>{l}</button>
                        ))}
                      </div>
                      <div className={b.starters}>
                        {STARTERS.map(st => (
                          <button key={st.id} type="button" className={b.starter} onClick={() => startFrom(st.id, starterMulti)} title={st.blurb}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/images/website-templates/thumb/${st.id}.jpg`} alt="" loading="lazy" />
                            <b>{st.name}</b><small>{st.industry} · {starterMulti ? `${starterPages[st.id]?.length || 1} pages: ${(starterPages[st.id] || []).map(p => p.name).join(', ')}` : `${st.sections.length} sections, one page`}</small>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  <SectionList
                    sections={page.sections}
                    selected={selected}
                    shared={sharedIds}
                    onOpen={openSection}
                    onMove={moveSection}
                    onReorder={reorderSection}
                    onDuplicate={duplicateSection}
                    onRemove={removeSection}
                  />
                  {!adding && <button type="button" className={b.addBtn} onClick={() => setAdding(true)}>+ Add section{selected ? ' below the selected one' : ''}</button>}
                </section>
                {adding && (
                  <section className={s.section}>
                    <div className={b.picker}>
                      <div className={b.pickerHead}>
                        <h2 className={s.sectionTitle}>Add a section</h2>
                        <button type="button" className={b.back} onClick={() => setAdding(false)}>Cancel</button>
                      </div>
                      <div className={b.cats} role="radiogroup" aria-label="Section type">
                        {[{ id: 'all', label: 'All' }, ...SECTION_CATEGORIES.filter(c => SECTION_TEMPLATES.some(t => t.category === c.id))].map(c => (
                          <button key={c.id} type="button" role="radio" aria-checked={pickCat === c.id} className={`${b.cat} ${pickCat === c.id ? b.catOn : ''}`} onClick={() => setPickCat(c.id)}>{c.label}</button>
                        ))}
                      </div>
                      <div className={b.pickGrid}>
                        {pickList.map(t => (
                          <button key={t.id} type="button" className={b.pick} onClick={() => addSection(t.id)} title={t.description}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={previewOf(t.id)} alt="" loading="lazy" />
                            <span>{t.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>
                )}
                {page.sections.length > 0 && <p className={s.hint} style={{ padding: '0 16px 16px' }}>Tip: click any section in the preview to edit it. Colours, fonts and animation are in the Theme tab and apply to the whole website. Add more pages (About, Contact…) in the Pages tab.</p>}
              </>
            ) : tab === 'site' ? (
              <>
                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Pages <span style={{ opacity: 0.6, fontWeight: 500 }}>({site.pages.length})</span></h2>
                  <p className={s.hint}>Every page shares the header, footer and theme. The first page is the home page (index.html).</p>
                  <ol className={b.list} style={{ marginTop: 10 }}>
                    {site.pages.map((pg, i) => {
                      const open = pageOpen === pg.id;
                      const home = i === 0;
                      return (
                        <li key={pg.id} className={b.pageItem}>
                          <div className={`${b.row} ${pg.id === activePage.id ? b.rowOn : ''}`}>
                            <button type="button" className={b.rowMain} onClick={() => { goToPage(pg.id); setTab('page'); }} title="Edit this page's sections">
                              <span className={b.pageIcon} aria-hidden="true">{home ? '⌂' : '▤'}</span>
                              <span className={b.rowText}><b>{pg.name}</b><small>{pageFile(site, pg)} · {pg.sections.length} section{pg.sections.length === 1 ? '' : 's'}{pg.hideHeader || pg.hideFooter ? ` · no ${[pg.hideHeader && 'header', pg.hideFooter && 'footer'].filter(Boolean).join(' / ')}` : ''}</small></span>
                            </button>
                            <button type="button" className={b.rowBtn} onClick={() => movePage(pg.id, -1)} disabled={home} title="Move up" aria-label={`Move ${pg.name} up`}>↑</button>
                            <button type="button" className={b.rowBtn} onClick={() => movePage(pg.id, 1)} disabled={i === site.pages.length - 1} title="Move down" aria-label={`Move ${pg.name} down`}>↓</button>
                            <button type="button" className={b.rowBtn} onClick={() => setPageOpen(open ? null : pg.id)} aria-expanded={open} title="Page settings" aria-label={`Settings for ${pg.name}`}>⚙</button>
                            <button type="button" className={b.rowBtn} onClick={() => duplicatePage(pg.id)} title="Duplicate" aria-label={`Duplicate ${pg.name}`}>⧉</button>
                            <button type="button" className={b.rowBtn} onClick={() => deleteSitePage(pg.id)} disabled={site.pages.length < 2} title="Delete" aria-label={`Delete ${pg.name}`}>✕</button>
                          </div>
                          {open && (
                            <div className={b.pageSettings}>
                              <div className={s.field}>
                                <label className={s.label} htmlFor={`pg-name-${pg.id}`}>Page name (menu label)</label>
                                <input id={`pg-name-${pg.id}`} className={s.input} value={pg.name} maxLength={80} onChange={ev => setPageSetting(pg.id, { name: ev.target.value })} />
                              </div>
                              <div className={s.field}>
                                <label className={s.label} htmlFor={`pg-slug-${pg.id}`}>File name</label>
                                {home
                                  ? <span className={s.hint}><code>index.html</code>: the home page is always index.html. Move another page to the top to make it the home page.</span>
                                  : (
                                    <div className={b.anchorRow}>
                                      <input id={`pg-slug-${pg.id}`} className={s.input} value={pg.slug} maxLength={48} spellCheck={false} onChange={ev => setSite(st => ({ ...st, pages: st.pages.map(p => (p.id === pg.id ? { ...p, slug: cleanSlug(ev.target.value) } : p)) }))} onBlur={() => setPageSetting(pg.id, {})} />
                                      <span aria-hidden="true">.html</span>
                                    </div>
                                  )}
                              </div>
                              <div className={s.field}>
                                <label className={s.label} htmlFor={`pg-title-${pg.id}`}>SEO title <span className={b.count}>{(pg.title || pageTitle(site, pg)).length}/60</span></label>
                                <input id={`pg-title-${pg.id}`} className={s.input} value={pg.title} maxLength={120} placeholder={pageTitle(site, { ...pg, title: '' })} onChange={ev => setPageSetting(pg.id, { title: ev.target.value })} />
                              </div>
                              <div className={s.field}>
                                <label className={s.label} htmlFor={`pg-desc-${pg.id}`}>Meta description <span className={b.count}>{pg.description.length}/160</span></label>
                                <textarea id={`pg-desc-${pg.id}`} className={s.input} rows={3} value={pg.description} maxLength={320} placeholder="One or two sentences search engines can show under the title" onChange={ev => setPageSetting(pg.id, { description: ev.target.value })} />
                              </div>
                              <label className={b.check}><input type="checkbox" checked={pg.inNav} onChange={ev => setPageSetting(pg.id, { inNav: ev.target.checked })} /> Show in the menu</label>
                              <label className={b.check}><input type="checkbox" checked={pg.hideHeader} onChange={ev => setPageSetting(pg.id, { hideHeader: ev.target.checked })} /> Hide the header on this page</label>
                              <label className={b.check}><input type="checkbox" checked={pg.hideFooter} onChange={ev => setPageSetting(pg.id, { hideFooter: ev.target.checked })} /> Hide the footer on this page</label>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </section>
                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Add a page</h2>
                  <div className={b.cats} role="radiogroup" aria-label="Page layout">
                    {PAGE_LAYOUTS.map(l => (
                      <button key={l.id} type="button" role="radio" aria-checked={newPageLayout === l.id} className={`${b.cat} ${newPageLayout === l.id ? b.catOn : ''}`} onClick={() => setNewPageLayout(l.id)} title={l.sections.map(id => sectionTemplateById(id)?.name).filter(Boolean).join(', ') || 'Only the shared header and footer'}>{l.name}</button>
                    ))}
                  </div>
                  <p className={s.hint} style={{ margin: '8px 0' }}>{(() => { const l = PAGE_LAYOUTS.find(o => o.id === newPageLayout); return l?.sections.length ? `Starts with: ${l.sections.map(id => sectionTemplateById(id)?.name).filter(Boolean).join(', ')}.` : 'Starts with only the shared header and footer.'; })()}</p>
                  <div className={b.addRow}>
                    <input className={s.input} value={newPageName} maxLength={80} placeholder={`Page name (${PAGE_LAYOUTS.find(o => o.id === newPageLayout)?.id === 'blank' ? 'New page' : PAGE_LAYOUTS.find(o => o.id === newPageLayout)?.name})`} aria-label="New page name" onChange={ev => setNewPageName(ev.target.value)} onKeyDown={ev => { if (ev.key === 'Enter') addPage(); }} />
                    <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={addPage}>+ Add page</button>
                  </div>
                </section>
                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Website settings</h2>
                  <label className={b.check}><input type="checkbox" checked={site.autoNav !== false} onChange={ev => setSite(st => ({ ...st, autoNav: ev.target.checked }))} /> Automatic menu</label>
                  <p className={s.hint}>{site.autoNav !== false ? 'The navbar links to every page marked “Show in the menu”, and the logo links to the home page (with two or more pages).' : 'The navbar keeps the links you type in it. Link to a page with its file name, e.g. about.html or contact.html#map.'}</p>
                  <div className={s.field} style={{ marginTop: 12 }}>
                    <label className={s.label} htmlFor="wb-url">Site address (optional)</label>
                    <input id="wb-url" className={s.input} value={site.url} placeholder="https://www.example.com/" spellCheck={false} onChange={ev => setSite(st => ({ ...st, url: ev.target.value }))} onBlur={() => setSite(st => ({ ...st, url: cleanBaseUrl(st.url) }))} />
                    <span className={s.hint}>Where the site will live. Adds canonical links, sitemap.xml and robots.txt to the ZIP.</span>
                  </div>
                </section>
              </>
            ) : tab === 'theme' ? (
              <>
                <BrandKitPanel
                  onToast={flash}
                  onApply={kit => setPage(p => withKit(p, kit))}
                  onSaveFrom={() => ({ primary: page.theme.brand, bg: page.theme.bg, text: page.theme.text, headingFont: page.fonts.heading, bodyFont: page.fonts.body })}
                />
                <ThemePanel
                  value={{ theme: page.theme, fonts: page.fonts, motion: page.motion }}
                  showTextEffect={hasTextEffect}
                  idPrefix="wbt"
                  pageScroll
                  motionHint="One GSAP setting for the whole page: every section animates in as it scrolls into view. Exports include it, content stays visible without JavaScript, and it switches off for people who prefer reduced motion."
                  onChange={v => {
                    const motionChanged = JSON.stringify(v.motion) !== JSON.stringify(page.motion);
                    setPage(p => ({ ...p, theme: v.theme, fonts: v.fonts, motion: v.motion }));
                    if (motionChanged) setPlaying(n => n + 1);
                  }}
                />
              </>
            ) : tab === 'pages' ? (
              <section className={s.section}>
                <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={newPage}>+ New website</button>
                {pages.length === 0 && <p className={s.designsEmpty}>No saved websites yet. Click Save in the toolbar (or press Ctrl+S) to keep this one.</p>}
                {pages.length > 0 && (
                  <ul className={`${s.designList} ${s.designListTab}`} style={{ marginTop: 12 }}>
                    {pages.map(d => (
                      <li key={d.id} className={`${s.designItem} ${current?.id === d.id ? s.designItemOn : ''}`}>
                        <button type="button" className={s.designOpen} onClick={() => openPage(d)} title="Open this website" style={{ borderBottom: `3px solid ${d.state?.theme?.brand || '#4f46e5'}` }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={previewOf((isSite(d.state) ? d.state.pages?.[0]?.sections?.[0]?.tpl || d.state.header?.[0]?.tpl : d.state?.sections?.[1]?.tpl || d.state?.sections?.[0]?.tpl) || 'saas-split-hero')} alt="" style={{ objectPosition: 'top' }} />
                        </button>
                        <span className={s.designMeta}>
                          <b title={d.name}>{d.name}</b>
                          <small>{isSite(d.state) && (d.state.pages || []).length > 1 ? `${d.state.pages.length} pages · ` : ''}{sectionsOf(d.state).length} sections</small>
                          <span className={s.designActions}>
                            <button type="button" onClick={() => openPage(d)}>Open</button>
                            <button type="button" onClick={async () => { const c = await store.duplicateDesign(d.id); if (c) flash(`Duplicated as “${c.name}”`); }}>Duplicate</button>
                            <button type="button" onClick={() => deletePage(d)} aria-label={`Delete ${d.name}`}>Delete</button>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className={s.hint}>Websites are saved in this browser with all their pages and uploaded images. Rename one with the Website name field (Sections tab), then Save.</p>
              </section>
            ) : (
              <section className={s.section}>
                <h2 className={s.sectionTitle}>Export</h2>
                <p className={s.transferText}>Download all {pages.length} saved website{pages.length === 1 ? '' : 's'} as one backup file, with every page, your uploaded images, uploaded fonts and brand kit.</p>
                <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={exportAll} disabled={!!busy || !pages.length}>{busy === 'export' ? 'Exporting…' : '⤓ Export websites'}</button>
                <h2 className={s.sectionTitle} style={{ marginTop: 22 }}>Import</h2>
                <p className={s.transferText}>Add websites from a backup file. Nothing you already have is changed.</p>
                <button type="button" className={s.miniBtn} onClick={() => importRef.current?.click()} disabled={!!busy}>{busy === 'import' ? 'Importing…' : '⤒ Choose a backup file (.json)'}</button>
                <input ref={importRef} type="file" accept=".json,application/json" hidden onChange={ev => { const file = ev.target.files?.[0]; ev.target.value = ''; importFile(file); }} />
                <p className={s.hint}>Everything is stored only in this browser. Export regularly so clearing site data or switching devices never loses your work.</p>
              </section>
            )}
          </div>
        </aside>

        <div className={s.main} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div className={s.toolbar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', minWidth: 0 }}>
              <h1 className={s.metaName} title={site.name}>{site.name}</h1>
              {current && dirty && <i className={s.dirtyDot} title="Unsaved changes" aria-label="Unsaved changes" />}
              <span className={s.toolbarSep} aria-hidden="true" />
              <select
                className={b.pageSelect}
                value={activePage.id}
                aria-label="Page"
                title="Page to edit and preview"
                onChange={ev => { if (ev.target.value === '+') { setTab('site'); setSheetOpen(true); } else goToPage(ev.target.value); }}
              >
                {site.pages.map(p => <option key={p.id} value={p.id}>{p.name} ({pageFile(site, p)})</option>)}
                <option value="+">+ Add a page…</option>
              </select>
              <div className={`${s.seg} ${x.toolSeg}`} role="radiogroup" aria-label="Device">
                {DEVICES.map(d => (
                  <button key={d.id} type="button" role="radio" aria-checked={device === d.id} aria-label={`${d.label} preview (${d.w}px)`} title={`${d.label} · ${d.w}px`} className={`${s.segBtn} ${x.iconSeg} ${device === d.id ? s.segBtnActive : ''}`} onClick={() => setDevice(d.id)}>{d.icon}</button>
                ))}
              </div>
              {page.motion?.preset !== 'none' && page.sections.length > 0 && (
                <button type="button" className={`${s.miniBtn} ${x.toolBtn} ${playing > 0 ? s.miniBtnAccent : ''}`} aria-pressed={playing > 0} onClick={togglePlay} title={playing > 0 ? 'Animations are on: scroll the preview to watch each section animate in, again every time it comes into view. Click to stop.' : 'Turn on the page’s entrance animations, smooth scrolling and scroll effects in the preview, from the top. Editing keeps them on.'}>{playing > 0 ? '■ Stop' : '▶ Play'}</button>
              )}
            </div>
            <div className={s.toolbarRight} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Reset clears the website; it is one undo step, so Ctrl+Z brings everything back */}
              <HistoryButtons onUndo={undo} onRedo={redo} onReset={() => { setSite(emptySite()); setPageIdRaw(null); setSelected(null); setEditing(null); flash('Website cleared. Press Undo (Ctrl+Z) to bring it back.'); }} canUndo={past.current.length > 0} canRedo={future.current.length > 0} />
              <SaveButton
                onClick={quickSave}
                busy={busy === 'save'}
                saved={justSaved}
                dirty={dirty}
                disabled={!!busy}
                title={current ? (dirty ? `Save changes to “${current.name}” (Ctrl+S)` : `“${current.name}” is saved`) : 'Save to My pages (Ctrl+S)'}
                saveAs={{ defaultName: current ? `${site.name} (copy)` : site.name, onSave: name => saveNew(name) }}
                menu={current ? [{ label: 'Detach', sub: `Keep editing without changing “${current.name}”`, onClick: () => { setCurrent(null); savedJson.current = null; flash('Detached. Save now creates a new website.'); } }] : []}
              />
              <span className={s.toolbarSep} aria-hidden="true" />
              <ForkButton onClick={forkToMyCode} busy={busy === 'fork'} disabled={!!busy || !page.sections.length} />
              <ExportMenu
                head={multi ? 'Export this website as…' : 'Export this page as…'}
                options={[
                  multi
                    ? { icon: 'html', label: busy === 'zip' ? 'Zipping…' : 'Download website ZIP', sub: `${site.pages.length} pages (index.html, ${site.pages.slice(1, 3).map(p => pageFile(site, p)).join(', ')}${site.pages.length > 3 ? ' …' : ''}), styles.css, script.js and an assets folder`, onClick: downloadZip, disabled: !!busy || !allSections.length }
                    : { icon: 'html', label: busy === 'zip' ? 'Zipping…' : 'Download ZIP', sub: 'index.html plus an assets folder with every image', onClick: downloadZip, disabled: !!busy || !page.sections.length },
                  { icon: 'react', label: busy === 'reactzip' ? 'Zipping…' : 'Download React ZIP', sub: `The .jsx component${multi ? ` of this page (${activePage.name})` : ''} plus an assets folder with every image`, onClick: () => downloadFrameworkZip('react'), disabled: !!busy || !page.sections.length },
                  { icon: 'vue', label: busy === 'vuezip' ? 'Zipping…' : 'Download Vue ZIP', sub: `The .vue component${multi ? ` of this page (${activePage.name})` : ''} plus an assets folder with every image`, onClick: () => downloadFrameworkZip('vue'), disabled: !!busy || !page.sections.length },
                ]}
              />
            </div>
          </div>

          {editSec?.scroll && (
            <div className={b.scrubBar}>
              {playing > 0 ? (
                <>
                  <span className={b.scrubLabel}>{editTpl?.name}: scroll timeline</span>
                  <input type="range" min={0} max={100} step={1} value={scrub} className={b.kfRange} aria-label="Scrub through the scroll animation" onChange={ev => scrubTo(Number(ev.target.value))} />
                  <span className={b.scrubPct}>{scrub}%</span>
                </>
              ) : (
                <>
                  <span className={b.scrubLabel}>{editTpl?.name} has a scroll animation.</span>
                  <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={() => { setScrub(0); setPlaying(n => n + 1); }}>▶ Preview to scrub</button>
                </>
              )}
              <label className={b.check} title="Show where the animation starts and ends"><input type="checkbox" checked={showMarkers} onChange={ev => setShowMarkers(ev.target.checked)} /> Markers</label>
            </div>
          )}
          <div className={b.stage} ref={stageRef}>
            {page.sections.length === 0 ? (
              <div className={b.empty}>
                <h2>{multi ? `“${activePage.name}” is empty` : 'Build a website from sections'}</h2>
                <p>{multi ? 'Add sections from the panel to fill this page. It gets the shared header and footer unless you hide them in its page settings.' :'Pick a starter or add sections from the panel: navbars, heroes, features, pricing, testimonials, FAQ, CTA, footers and more. They all share one theme, so every page looks like one website. Add more pages in the Pages tab.'}</p>
              </div>
            ) : origin && scale > 0 && (
              <PageFrame key={`${device}|${activePage.id}`} html={shownHtml} width={dev.w} height={frameH} scale={scale} selected={selected} onSelect={openSection} onKey={onKey} onDoc={onPreviewDoc} onNavigate={navigateTo} hash={navHash} topKey={topKey} />
            )}
          </div>
        </div>
      </div>
      {confirm && (
        <ConfirmDialog {...confirm} onCancel={() => setConfirm(null)} onOk={() => { const go = confirm.onOk; setConfirm(null); go(); }} />
      )}
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}
