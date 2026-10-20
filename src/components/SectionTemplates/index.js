'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import x from './styles.module.css';
import { ExportMenu, ForkButton, HistoryButtons, SaveButton } from '@/components/ToolbarActions';
import ConfirmDialog from '@/components/SocialPostTemplates/ConfirmDialog';
import SavedDesignsStrip from '@/components/SavedDesignsStrip';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { LoadMore } from '@/components/UiSnippetsGallery';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import { BrandKitPanel, loadKit, kitIsSet, saveKit } from '@/components/BrandKit';
import FontPicker from '@/components/FontPicker';
import { parseHex, onColor } from '../OgImageGenerator/engine';
import { exportDesigns, importDesigns, blobToDataUrl, dataUrlToBlob } from '@/lib/design-transfer';
import { loadCustomFonts, onFontsChange, customFontFaceCss, exportCustomFonts, importCustomFonts } from '@/lib/fonts';
import { dbPut } from '@/lib/uiSnippetsDb';
import { openForkTab } from '@/lib/open-fork-tab';
import { highlightHtml } from '@/lib/highlight-html';
import { toReactComponent, toVueSfc } from '@/lib/snippet-exporters';
import {
  SECTION_TEMPLATES, SECTION_CATEGORIES, sectionTemplateById, sectionCategoryById,
  defaultSectionState, restoreSectionState, THEME_PRESETS, THEME_COLORS, MOTION_PRESETS, MOTION_SPEEDS,
} from './templates/index.js';
import { documentHtml, sectionCss, sectionMarkup, snippetParts, customFontIds } from './templates/render.js';
import { sectionDesignStore as designStore, putAsset, getAsset } from './storage';

const TOOL = 'website-section-templates';
const BASE = `/${TOOL}/`;
const GALLERY_PAGE = 12;
const DEVICES = [
  { id: 'desktop', label: 'Desktop', w: 1280, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
  { id: 'tablet', label: 'Tablet', w: 820, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M11 18h2" /></svg> },
  { id: 'mobile', label: 'Mobile', w: 390, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg> },
];
const RADII = [['0', 'Square'], ['8', 'Soft'], ['14', 'Rounded'], ['24', 'Extra'], ['999', 'Pill']];
const WIDTHS = ['1080', '1200', '1320', '1440'];

/* Images on this site load from the local server while you edit (so new art shows before a deploy) */
const previewImages = (html, origin) => (origin ? html.replace(/https:\/\/webdevpuneet\.com\/images\//g, `${origin}/images/`) : html);

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Uploaded images are resized in the browser (GIFs and SVGs are kept as they are) */
function prepareUpload(file, { maxW = 1600, mime = 'image/jpeg' } = {}) {
  return new Promise((resolve, reject) => {
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => { URL.revokeObjectURL(url); resolve({ blob: file, type: file.type, w: img.naturalWidth || 0, h: img.naturalHeight || 0 }); };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
      img.src = url;
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, maxW / (img.naturalWidth || maxW));
      const w = Math.round(img.naturalWidth * k), h = Math.round(img.naturalHeight * k);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      // Keep PNG transparency (cut-out phones, logos); photos become JPEG
      const type = file.type === 'image/png' || file.type === 'image/webp' || mime === 'image/png' ? 'image/png' : 'image/jpeg';
      if (type === 'image/jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); }
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      c.toBlob(b => (b ? resolve({ blob: b, type, w, h }) : reject(new Error('Could not process that image'))), type, 0.86);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
    img.src = url;
  });
}
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp', 'image/svg+xml': 'svg' };

/* ── Preview frame: an iframe at a real device width, scaled to fit, growing to the section's height ── */
function SectionFrame({ html, width, scale = 1, interactive = true }) {
  const ref = useRef(null);
  const [h, setH] = useState(600);
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return undefined;
    let ro;
    const measure = () => {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      const fit = () => setH(Math.max(200, doc.documentElement.scrollHeight));
      fit();
      ro?.disconnect();
      if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(fit); ro.observe(doc.documentElement); }
      // Links inside the preview never navigate away from the editor
      doc.addEventListener('click', ev => { if (ev.target.closest?.('a')) ev.preventDefault(); });
    };
    frame.addEventListener('load', measure);
    return () => { frame.removeEventListener('load', measure); ro?.disconnect(); };
  }, []);
  return (
    <div style={{ width: width * scale, height: h * scale, overflow: 'hidden', flex: 'none' }}>
      <iframe
        ref={ref}
        title="Section preview"
        srcDoc={html}
        style={{ width, height: h, border: 0, display: 'block', transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left', pointerEvents: interactive ? 'auto' : 'none', background: '#fff' }}
      />
    </div>
  );
}

/* Live preview of a section's default design, scaled to its container (gallery fallback, About section) */
export function SectionShot({ id, width = 1280 }) {
  const t = sectionTemplateById(id);
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const html = useMemo(() => (t && origin ? previewImages(documentHtml(t, defaultSectionState(t), { motion: false }), origin) : ''), [t, origin]);
  return <div ref={ref} style={{ width: '100%' }}>{w > 0 && html && <SectionFrame html={html} width={width} scale={w / width} interactive={false} />}</div>;
}

/* ── Gallery ─────────────────────────────────────────────────────────────────── */
function GalleryCard({ t, preview }) {
  return (
    <a className={s.card} href={`${BASE}${t.id}/`} {...panHandlers}>
      <div className={x.cardPreview}>
        {preview
          // eslint-disable-next-line @next/next/no-img-element
          ? <img className={x.cardImg} src={`/images/section-templates/previews/${t.id}.png`} alt={`${t.name} preview`} loading="lazy" />
          : <SectionShot id={t.id} />}
      </div>
      <div className={s.cardBody}>
        <span className={s.cardCat}>{sectionCategoryById(t.category)?.label}</span>
        <h3 className={s.cardTitle}>{t.name}</h3>
        <span className={s.cardMeta}>Responsive · HTML, React &amp; Vue</span>
      </div>
    </a>
  );
}

export function SectionTemplateGallery({ excludeId = null, limit = null, previews = [], initialCategory = 'all', hideControls = false, savedStrip = null }) {
  const [cat] = useState(initialCategory);
  const [q, setQ] = useState('');
  const [shownCount, setShownCount] = useState(GALLERY_PAGE);
  useEffect(() => { setShownCount(GALLERY_PAGE); }, [q]);
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return SECTION_TEMPLATES.filter(t => t.id !== excludeId)
      .filter(t => cat === 'all' || t.category === cat)
      .filter(t => !words.length || words.every(w => `${t.name} ${t.tags.join(' ')} ${sectionCategoryById(t.category)?.label} ${t.description}`.toLowerCase().includes(w)))
      .slice(0, limit || undefined);
  }, [cat, q, excludeId, limit]);
  const shown = limit ? list : list.slice(0, shownCount);
  return (
    <div className={s.gallery}>
      {!hideControls && (
        <div className={s.galleryControls}>
          <input className={s.search} value={q} onChange={ev => setQ(ev.target.value)} placeholder={`Search ${SECTION_TEMPLATES.length} section templates…`} aria-label="Search section templates" />
        </div>
      )}
      {savedStrip && (
        <>
          {savedStrip(q)}
          <div className={s.sectionHead}>
            <h2>All Sections</h2>
            <span>{list.length}{list.length !== SECTION_TEMPLATES.length ? ` of ${SECTION_TEMPLATES.length}` : ''}</span>
          </div>
        </>
      )}
      {list.length === 0
        ? <div className={s.empty}>No section templates match &ldquo;{q}&rdquo;.</div>
        : <div className={s.grid}>{shown.map(t => <GalleryCard key={t.id} t={t} preview={previews.includes(t.id)} />)}</div>}
      {!limit && <LoadMore shown={shown.length} total={list.length} onLoadMore={() => setShownCount(n => n + GALLERY_PAGE)} />}
    </div>
  );
}

/* Crawlable links to every category that has sections */
function SectionCategoryLinks({ active = null }) {
  return (
    <nav className={s.catLinks} aria-label="Section template categories">
      <a href={BASE} className={`${s.catLink} ${!active ? s.catLinkActive : ''}`}>All sections <span>{SECTION_TEMPLATES.length}</span></a>
      {SECTION_CATEGORIES.map(c => {
        const n = SECTION_TEMPLATES.filter(t => t.category === c.id).length;
        return n ? <a key={c.id} href={`${BASE}category/${c.id}/`} className={`${s.catLink} ${active === c.id ? s.catLinkActive : ''}`}>{c.label} <span>{n}</span></a> : null;
      })}
    </nav>
  );
}

/* A saved design rendered live (its uploaded images loaded from IndexedDB) */
function SavedSectionPreview({ design: d, width }) {
  const t = sectionTemplateById(d.tpl);
  const [origin, setOrigin] = useState('');
  const [urls, setUrls] = useState({});
  useEffect(() => { setOrigin(window.location.origin); }, []);
  useEffect(() => {
    let live = true;
    const made = [];
    (async () => {
      const out = {};
      for (const [k, u] of Object.entries(d.state?.uploads || {})) {
        try { const rec = await getAsset(u.id); if (rec?.blob) { const url = URL.createObjectURL(rec.blob); made.push(url); out[k] = url; } } catch { /* missing */ }
      }
      if (live) setUrls(out);
    })();
    return () => { live = false; made.forEach(u => URL.revokeObjectURL(u)); };
  }, [d]);
  const html = useMemo(() => {
    if (!t || !origin) return '';
    const st = restoreSectionState(t, d.state);
    return previewImages(documentHtml(t, st, { imageSrc: k => urls[k] || '', motion: false }), origin);
  }, [t, d, urls, origin]);
  if (!html) return null;
  return <SectionFrame html={html} width={1280} scale={width / 1280} interactive={false} />;
}

export function SectionGalleryPage({ previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <PlaygroundTopNav active={TOOL} />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Website Section Templates</h1>
        <p className={s.galleryLead}>
          {SECTION_TEMPLATES.length} free, editable website sections (hero sections first, with features, pricing, testimonials, FAQ and footers on the way).
          Change the text, upload your images, set your brand colours and fonts, preview desktop, tablet and mobile, then export HTML and CSS, a ZIP, React or Vue.
        </p>
      </header>
      <SectionCategoryLinks />
      <SectionTemplateGallery
        previews={previews}
        savedStrip={q => (
          <SavedDesignsStrip
            store={designStore}
            basePath={BASE}
            nameOf={id => sectionTemplateById(id)?.name || id}
            imgFor={d => `/images/section-templates/previews/${d.tpl}.png`}
            renderPreview={(d, w) => <SavedSectionPreview design={d} width={w} />}
            query={q}
          />
        )}
      />
    </div>
  );
}

export function SectionCategoryPage({ category, h1, lead, previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <PlaygroundTopNav active={TOOL} />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <a href={BASE} className={s.back}>← All section templates</a>
        <h1 className={s.galleryH1}>{h1}</h1>
        <p className={s.galleryLead}>{lead}</p>
      </header>
      <SectionCategoryLinks active={category} />
      <SectionTemplateGallery previews={previews} initialCategory={category} hideControls />
    </div>
  );
}

/* ── Editor ──────────────────────────────────────────────────────────────────── */
function ColorField({ label, value, onChange }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => { setDraft(value); }, [value]);
  const rgb = parseHex(value);
  const six = rgb ? `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}` : '#000000';
  return (
    <div className={s.colorField}>
      <label className={s.label}>{label}</label>
      <div className={s.colorInput}>
        <span className={s.colorSwatch} style={{ background: six }} />
        <input type="color" className={s.colorPicker} value={six} onChange={ev => onChange(ev.target.value)} aria-label={`${label} colour picker`} />
        <input
          className={s.hexInput}
          value={draft}
          maxLength={7}
          spellCheck={false}
          aria-label={`${label} hex value`}
          onChange={ev => { const v = ev.target.value.trim(); setDraft(v); if (parseHex(v)) onChange(v.startsWith('#') ? v : `#${v}`); }}
          onBlur={() => setDraft(value)}
        />
      </div>
    </div>
  );
}

/* Brand kit -> section theme: brand colour (button text picked for contrast), fonts and,
   when the kit says so, background and text colours too */
function withKit(prev, kit) {
  const theme = { ...prev.theme, brand: kit.primary, brandText: onColor(kit.primary) };
  if (kit.applyAllColors) { if (kit.bg) theme.bg = kit.bg; if (kit.text) theme.text = kit.text; }
  return { ...prev, theme, fonts: { heading: kit.headingFont || prev.fonts.heading, body: kit.bodyFont || prev.fonts.body } };
}

export function SectionTemplateEditor({ id }) {
  const t = sectionTemplateById(id);
  const [state, setStateRaw] = useState(() => defaultSectionState(t));
  const [hydrated, setHydrated] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [view, setView] = useState('preview'); // preview | html | css
  const [panelTab, setPanelTab] = useState('edit');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [open, setOpen] = useState(() => new Set(t.groups.slice(0, 2).map(g => g.id)));
  const [origin, setOrigin] = useState('');
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [currentDesign, setCurrentDesign] = useState(null); // { id, name }
  const [renaming, setRenaming] = useState(null);
  const [designQuery, setDesignQuery] = useState('');
  const [designScope, setDesignScope] = useState('all');
  const [blobUrls, setBlobUrls] = useState({}); // upload id -> object URL
  const [fontTick, setFontTick] = useState(0);
  const [stageW, setStageW] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);
  // The live preview stays still while editing; "Play animation" re-renders it with the GSAP runtime once
  const [playing, setPlaying] = useState(0);
  const fileRef = useRef(null);
  const importRef = useRef(null);
  const uploadTarget = useRef(null);
  const stageRef = useRef(null);
  const toastTimer = useRef(null);
  const savedJson = useRef(null);

  const flash = useCallback(msg => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(''), Math.min(6500, 2200 + msg.length * 25));
  }, []);

  /* Undo / redo: typing bursts are grouped (one step per pause of 600 ms) */
  const past = useRef([]);
  const future = useRef([]);
  const lastPush = useRef(0);
  const [, setHistTick] = useState(0);
  const setState = useCallback(next => {
    setStateRaw(prev => {
      const value = typeof next === 'function' ? next(prev) : next;
      if (value === prev) return prev;
      const now = Date.now();
      if (now - lastPush.current > 600) { past.current.push(prev); if (past.current.length > 100) past.current.shift(); }
      lastPush.current = now;
      future.current = [];
      return value;
    });
    setHistTick(n => n + 1);
  }, []);
  const undo = useCallback(() => {
    setStateRaw(prev => { const p = past.current.pop(); if (!p) return prev; future.current.push(prev); lastPush.current = 0; return p; });
    setHistTick(n => n + 1);
  }, []);
  const redo = useCallback(() => {
    setStateRaw(prev => { const n = future.current.pop(); if (!n) return prev; past.current.push(prev); lastPush.current = 0; return n; });
    setHistTick(n => n + 1);
  }, []);

  /* Restore: ?design=<id> opens a saved design, otherwise the autosave */
  useEffect(() => {
    setOrigin(window.location.origin);
    let live = true;
    (async () => {
      const did = new URLSearchParams(window.location.search).get('design');
      let restored = false;
      if (did) {
        const d = await designStore.getDesign(did).catch(() => null);
        if (d && d.tpl === t.id && live) {
          const st = restoreSectionState(t, d.state);
          setStateRaw(st);
          savedJson.current = JSON.stringify(st);
          setCurrentDesign({ id: d.id, name: d.name });
          restored = true;
        }
      }
      if (!restored) {
        const auto = await designStore.getAutosave(t.id).catch(() => null);
        if (auto && live) setStateRaw(restoreSectionState(t, auto));
      }
      if (live) setHydrated(true);
    })();
    return () => { live = false; };
  }, [t]);

  /* Autosave every change (after the first restore) */
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => { designStore.putAutosave(t.id, state).catch(() => {}); }, 500);
    return () => clearTimeout(tm);
  }, [state, hydrated, t]);

  /* The address bar shows the open saved design, so reload and bookmarks keep it */
  useEffect(() => {
    if (!hydrated) return;
    const url = currentDesign ? `${window.location.pathname}?design=${encodeURIComponent(currentDesign.id)}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [currentDesign, hydrated]);

  /* My designs list, kept in sync across tabs */
  useEffect(() => {
    const load = () => designStore.listDesigns().then(setDesigns).catch(() => {});
    load();
    return designStore.onDesignsChange(load);
  }, []);

  /* Uploaded fonts register once; re-render the preview when they load or change */
  useEffect(() => {
    loadCustomFonts().then(() => setFontTick(n => n + 1));
    return onFontsChange(() => setFontTick(n => n + 1));
  }, []);

  /* Object URLs for uploaded images */
  const uploads = useMemo(() => state.uploads || {}, [state.uploads]);
  useEffect(() => {
    let live = true;
    const made = [];
    (async () => {
      const next = {};
      for (const u of Object.values(uploads)) {
        try { const rec = await getAsset(u.id); if (rec?.blob) { const url = URL.createObjectURL(rec.blob); made.push(url); next[u.id] = url; } } catch { /* missing */ }
      }
      if (live) setBlobUrls(next);
    })();
    return () => { live = false; made.forEach(u => URL.revokeObjectURL(u)); };
  }, [uploads]);

  /* Stage width (the preview scales to fit) */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setStageW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [view]);

  /* Keyboard: Ctrl+S saves; Ctrl+Z / Ctrl+Y undo and redo outside text fields */
  const saveRef = useRef(null);
  useEffect(() => {
    const onKey = ev => {
      if (!(ev.ctrlKey || ev.metaKey)) return;
      const k = ev.key.toLowerCase();
      if (k === 's') { ev.preventDefault(); saveRef.current?.(); return; }
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');
      if (typing) return;
      if (k === 'z' && !ev.shiftKey) { ev.preventDefault(); undo(); }
      else if (k === 'y' || (k === 'z' && ev.shiftKey)) { ev.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  const f = state.fields;
  const setField = (key, value) => setState(p => ({ ...p, fields: { ...p.fields, [key]: value } }));
  const setToggle = (key, value) => setState(p => ({ ...p, toggles: { ...p.toggles, [key]: value } }));
  const setTheme = (key, value) => setState(p => ({ ...p, theme: { ...p.theme, [key]: value } }));
  const setMotion = (key, value) => { setState(p => ({ ...p, motion: { ...p.motion, [key]: value } })); setPlaying(n => n + 1); };
  const toggleGroup = gid => setOpen(prev => { const n = new Set(prev); if (n.has(gid)) n.delete(gid); else n.add(gid); return n; });

  /* Images: preview uses object URLs; exports use data URLs or images/<file> */
  const previewSrc = useCallback(key => (uploads[key] ? blobUrls[uploads[key].id] || '' : ''), [uploads, blobUrls]);
  const dataUrls = async () => {
    const out = {};
    for (const [k, u] of Object.entries(uploads)) { const rec = await getAsset(u.id).catch(() => null); if (rec?.blob) out[k] = await blobToDataUrl(rec.blob); }
    return out;
  };
  const relativeSrc = key => (uploads[key] ? `images/${uploads[key].file}` : '');
  const fontFaces = useMemo(() => (fontTick >= 0 ? customFontFaceCss(customFontIds(t, state)) : ''), [t, state, fontTick]);

  const previewHtml = useMemo(
    () => previewImages(documentHtml(t, state, { imageSrc: previewSrc, clean: false, fontFaces, motion: playing > 0 }), origin),
    [t, state, previewSrc, fontFaces, origin, playing],
  );
  // Any edit other than the animation settings stops the replay, so typing never re-runs it
  const stillJson = JSON.stringify({ ...state, motion: null });
  useEffect(() => { setPlaying(0); }, [stillJson]);
  const codeHtml = useMemo(() => documentHtml(t, state, { imageSrc: relativeSrc, fontFaces: fontFaces ? '/* + your uploaded fonts (inlined on export) */' : '' }), [t, state, fontFaces]); // eslint-disable-line react-hooks/exhaustive-deps
  const codeCss = useMemo(() => sectionCss(t, state), [t, state]);
  const highlighted = useMemo(() => (view === 'html' ? highlightHtml(codeHtml) : ''), [view, codeHtml]);

  /* Uploads */
  const pickUpload = fd => { uploadTarget.current = fd; fileRef.current?.click(); };
  const onUploadFile = async ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    const fd = uploadTarget.current;
    if (!file || !fd) return;
    if (!/^image\//.test(file.type)) { flash('Choose an image file (PNG, JPG, WebP, GIF or SVG).'); return; }
    try {
      const out = await prepareUpload(file, fd.upload || {});
      const uid = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const key = `${t.id}:${fd.key}:${uid}`;
      const name = `${fd.upload?.name || fd.key}-${uid}.${EXT[out.type] || 'png'}`;
      await putAsset(key, { blob: out.blob, type: out.type, file: name, name, w: out.w, h: out.h, updatedAt: new Date().toISOString() });
      setState(p => ({ ...p, uploads: { ...p.uploads, [fd.key]: { id: key, file: name, w: out.w, h: out.h } } }));
      flash(`Uploaded ${file.name} (${out.w}×${out.h}). Saved in this browser.`);
    } catch (err) { flash(err.message || 'Upload failed'); }
  };
  const removeUpload = key => setState(p => { const u = { ...(p.uploads || {}) }; delete u[key]; return { ...p, uploads: u }; });

  /* Copy / download */
  const copy = async (str, note) => {
    try { await navigator.clipboard.writeText(str); flash(note); return true; }
    catch { flash('Copy was blocked by the browser, so use a download option instead'); return false; }
  };
  const hasUploads = Object.keys(uploads).length > 0;
  const fileBase = t.id;
  const copyHtml = async () => {
    setBusy('copy');
    const urls = await dataUrls();
    await copy(documentHtml(t, state, { imageSrc: k => urls[k] || '', fontFaces }), hasUploads ? 'HTML copied, with your uploaded images embedded.' : 'HTML copied: one file with the CSS included.');
    setBusy('');
  };
  const downloadHtml = async () => {
    setBusy('html');
    const urls = await dataUrls();
    saveBlob(new Blob([documentHtml(t, state, { imageSrc: k => urls[k] || '', fontFaces })], { type: 'text/html' }), `${fileBase}.html`);
    flash('Downloaded a single HTML file that works offline.');
    setBusy('');
  };
  const downloadZip = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const dir = zip.folder(fileBase);
      dir.file('index.html', documentHtml(t, state, { imageSrc: relativeSrc, fontFaces }));
      const files = [];
      for (const u of Object.values(uploads)) { const rec = await getAsset(u.id).catch(() => null); if (rec?.blob) { dir.file(`images/${u.file}`, rec.blob); files.push(u.file); } }
      dir.file('README.txt', [
        `${t.name} v${t.version} — https://webdevpuneet.com${BASE}${t.id}/`,
        '',
        'index.html   the section as a complete page (HTML with the CSS in a <style> tag)',
        files.length ? `images/      your uploaded images: ${files.join(', ')}` : '',
        '',
        'To use it on your site, copy the <section class="st …"> element and the CSS into your page.',
        'Every colour, font and size is a CSS variable at the top of the CSS (--st-brand, --st-font-heading …).',
      ].filter((l, i, a) => l || a[i - 1]).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${fileBase}.zip`);
      flash(files.length ? `Downloaded ZIP with ${files.length} image${files.length > 1 ? 's' : ''}.` : 'Downloaded ZIP.');
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };
  const copyFramework = async kind => {
    const parts = snippetParts(t, state, { imageSrc: relativeSrc, fontFaces });
    const code = kind === 'react' ? toReactComponent(parts) : toVueSfc(parts);
    await copy(code, `${kind === 'react' ? 'React' : 'Vue'} component copied.${hasUploads ? ' Uploaded images point to images/, so put them there (Download ZIP gives you the files).' : ''}`);
  };
  const forkToMyCode = async () => {
    const tab = openForkTab();
    setBusy('fork');
    try {
      const urls = await dataUrls();
      const now = new Date().toISOString();
      const rid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `st-${Date.now().toString(36)}`;
      const gf = documentHtml(t, state).match(/<link href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)?.[1];
      await dbPut({
        id: rid,
        name: `${t.name} (section)`,
        tags: ['section'],
        cdnUrls: gf ? [gf] : [],
        html: sectionMarkup(t, state, { imageSrc: k => urls[k] || '', clean: true }),
        css: sectionCss(t, state, { fontFaces }),
        js: '',
        createdAt: now,
        updatedAt: now,
      });
      tab.go(rid);
      flash('Forked to My Code. It opened in a new tab.');
    } catch (err) { tab.cancel(); flash(`Couldn't save to My Code: ${err.message}`); }
    setBusy('');
  };

  /* My designs */
  const dirty = !!currentDesign && savedJson.current !== null && savedJson.current !== JSON.stringify(state);
  const [justSaved, setJustSaved] = useState(false);
  const nextName = () => `${t.name} ${designs.filter(d => d.tpl === t.id).length + 1}`;
  const saveNewDesign = async name => {
    setBusy('save');
    try {
      const rec = await designStore.saveDesign({ name: name.trim() || t.name, tpl: t.id, state });
      savedJson.current = JSON.stringify(state);
      setCurrentDesign({ id: rec.id, name: rec.name });
      flash(`Saved “${rec.name}” to My designs`);
      setJustSaved(true); setTimeout(() => setJustSaved(false), 1500);
    } catch (err) { flash(`Couldn't save: ${err.message}`); }
    setBusy('');
  };
  const quickSave = async () => {
    if (!currentDesign) return saveNewDesign(nextName());
    setBusy('save');
    try {
      const old = await designStore.getDesign(currentDesign.id).catch(() => null);
      await designStore.saveDesign({ ...(old || {}), id: currentDesign.id, name: currentDesign.name, tpl: t.id, state });
      savedJson.current = JSON.stringify(state);
      setJustSaved(true); setTimeout(() => setJustSaved(false), 1500);
    } catch (err) { flash(`Couldn't save: ${err.message}`); }
    setBusy('');
  };
  saveRef.current = quickSave;
  const openDesign = d => {
    if (d.tpl !== t.id) { window.location.href = `${BASE}${d.tpl}/?design=${encodeURIComponent(d.id)}`; return; }
    const st = restoreSectionState(t, d.state);
    setState(st);
    savedJson.current = JSON.stringify(st);
    setCurrentDesign({ id: d.id, name: d.name });
    setPanelTab('edit');
    flash(`Opened “${d.name}”`);
  };
  const duplicate = async d => { const c = await designStore.duplicateDesign(d.id); if (c) flash(`Duplicated as “${c.name}”`); };
  const renameDesign = async (did, name) => {
    setRenaming(null);
    const d = await designStore.getDesign(did).catch(() => null);
    const clean = String(name || '').trim();
    if (!d || !clean || clean === d.name) return;
    await designStore.saveDesign({ ...d, name: clean });
    if (currentDesign?.id === did) setCurrentDesign({ id: did, name: clean });
  };
  const removeDesign = d => setConfirm({
    title: `Delete “${d.name}”?`,
    body: 'This removes the saved design from this browser. The template itself and your autosave stay.',
    okLabel: 'Delete',
    danger: true,
    onOk: async () => {
      await designStore.deleteDesign(d.id);
      if (currentDesign?.id === d.id) { setCurrentDesign(null); savedJson.current = null; }
      flash(`Deleted “${d.name}”`);
    },
  });
  const shownDesigns = useMemo(() => {
    const q = designQuery.trim().toLowerCase();
    return designs.filter(d => (designScope === 'all' || d.tpl === t.id) && (!q || `${d.name} ${sectionTemplateById(d.tpl)?.name || ''}`.toLowerCase().includes(q)));
  }, [designs, designQuery, designScope, t]);

  /* Backup export / import: designs + uploaded images + uploaded fonts + brand kit */
  const exportAll = async () => {
    setBusy('export');
    try {
      const kitNow = loadKit();
      const r = await exportDesigns({
        tool: TOOL,
        store: designStore,
        getAssets: async ds => {
          const ids = [...new Set(ds.flatMap(d => Object.values(d.state?.uploads || {}).map(u => u.id)))];
          const out = [];
          for (const key of ids) {
            const rec = await getAsset(key).catch(() => null);
            if (rec?.blob) out.push({ key, data: await blobToDataUrl(rec.blob), type: rec.type, name: rec.file || rec.name, w: rec.w, h: rec.h });
          }
          return out;
        },
        getFonts: async ds => {
          const ids = [...new Set(ds.flatMap(d => Object.values(d.state?.fonts || {})).filter(fid => String(fid).startsWith('c:')))];
          return ids.length ? exportCustomFonts(ids) : [];
        },
        brandKit: kitIsSet(kitNow) ? kitNow : undefined,
      });
      flash(`Exported ${r.count} design${r.count === 1 ? '' : 's'} (${(r.bytes / 1024 / 1024).toFixed(2)} MB). Keep the file as a backup or import it in another browser.`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const importFile = async file => {
    if (!file) return;
    setBusy('import');
    try {
      const r = await importDesigns(file, {
        tool: TOOL,
        store: designStore,
        knownTemplate: tid => !!sectionTemplateById(tid),
        putAssets: async assets => {
          let n = 0;
          for (const a of assets) {
            if (!a?.key || !String(a.data || '').startsWith('data:')) continue;
            if (await getAsset(a.key).catch(() => null)) continue;
            await putAsset(a.key, { blob: await dataUrlToBlob(a.data), type: a.type, file: a.name, name: a.name, w: a.w, h: a.h, updatedAt: new Date().toISOString() });
            n++;
          }
          return n;
        },
        putFonts: fonts => importCustomFonts(fonts),
        applyKit: k => { if (kitIsSet(loadKit())) return false; saveKit(k); return true; },
      });
      const parts = [];
      if (r.added) parts.push(`${r.added} design${r.added > 1 ? 's' : ''} added`);
      if (r.copies) parts.push(`${r.copies} added as copies`);
      if (r.skipped) parts.push(`${r.skipped} already here`);
      if (r.assets) parts.push(`${r.assets} image${r.assets > 1 ? 's' : ''}`);
      if (r.fonts) parts.push(`${r.fonts} font${r.fonts > 1 ? 's' : ''}`);
      if (r.kit) parts.push('brand kit');
      flash(parts.length ? `Imported: ${parts.join(', ')}.` : 'Nothing new in that file.');
    } catch (err) { flash(err.message || 'Import failed'); }
    setBusy('');
  };

  const dev = DEVICES.find(d => d.id === device) || DEVICES[0];
  const scale = stageW ? Math.min(1, (stageW - 36) / dev.w) : 0;
  const copyCode = async () => {
    if (await copy(view === 'css' ? codeCss : codeHtml, view === 'css' ? 'CSS copied' : 'HTML copied')) { setCodeCopied(true); setTimeout(() => setCodeCopied(false), 1400); }
  };

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active={TOOL} />
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml" className={s.fileInput} onChange={onUploadFile} />
      <div className={s.body}>
        <aside className={`${s.controls} ${sheetOpen ? s.sheetOpen : ''}`}>
          <div className={s.toolBrandBar}>
            <a href={BASE} className={s.toolBrand} title="All website section templates">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/website-section-templates.svg" alt="" width={26} height={26} />
              <span>Website Sections</span>
            </a>
          </div>
          <button type="button" className={s.sheetHandle} onClick={() => setSheetOpen(o => !o)} aria-expanded={sheetOpen} aria-label={sheetOpen ? 'Close the editing panel' : 'Open the editing panel'}>
            <i aria-hidden="true" />
            {sheetOpen ? 'Hide panel' : 'Edit section'}
          </button>
          <div className={s.panelTabs} role="tablist" aria-label="Panel" onClickCapture={() => setSheetOpen(true)}>
            <button type="button" role="tab" aria-selected={panelTab === 'edit'} className={panelTab === 'edit' ? s.panelTabOn : ''} onClick={() => setPanelTab('edit')}>Edit</button>
            <button type="button" role="tab" aria-selected={panelTab === 'designs'} className={panelTab === 'designs' ? s.panelTabOn : ''} onClick={() => setPanelTab('designs')}>
              My designs <span className={s.panelTabCount}>{designs.length}</span>
            </button>
            <button type="button" role="tab" aria-selected={panelTab === 'transfer'} className={panelTab === 'transfer' ? s.panelTabOn : ''} onClick={() => setPanelTab('transfer')}>Import / Export</button>
          </div>
          <div className={s.controlsScroll}>
            {panelTab === 'transfer' ? (
              <section className={s.section}>
                <h2 className={s.sectionTitle}>Export</h2>
                <p className={s.transferText}>Download all {designs.length} saved design{designs.length === 1 ? '' : 's'} as one backup file. Keep it safe, or import it in another browser or on another device.</p>
                <ul className={s.transferList}>
                  <li>Every design in My designs (text, colours, fonts and settings)</li>
                  <li>Images you uploaded into your sections</li>
                  <li>Fonts you uploaded that your designs use</li>
                  <li>Your brand kit, if you’ve set one</li>
                </ul>
                <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={exportAll} disabled={!!busy || !designs.length}>{busy === 'export' ? 'Exporting…' : '⤓ Export designs'}</button>
                {!designs.length && <p className={s.hint}>Nothing to export yet. Save a design first (Save in the toolbar, or Ctrl+S).</p>}
                <h2 className={s.sectionTitle} style={{ marginTop: 22 }}>Import</h2>
                <p className={s.transferText}>Add designs from a backup file. Nothing you already have is changed: designs you have are skipped, and a different design with the same id comes in as a copy.</p>
                <button type="button" className={s.miniBtn} onClick={() => importRef.current?.click()} disabled={!!busy}>{busy === 'import' ? 'Importing…' : '⤒ Choose a backup file (.json)'}</button>
                <input ref={importRef} type="file" accept=".json,application/json" hidden onChange={ev => { const file = ev.target.files?.[0]; ev.target.value = ''; importFile(file); }} />
                <p className={s.hint}>Designs, images and fonts are stored only in this browser. Export regularly so clearing site data or switching devices never loses your work.</p>
              </section>
            ) : panelTab === 'designs' ? (
              <section className={s.section}>
                {designs.length > 0 && (
                  <div className={s.designFind}>
                    <input type="search" className={s.input} value={designQuery} onChange={ev => setDesignQuery(ev.target.value)} placeholder={`Search ${designs.length} design${designs.length > 1 ? 's' : ''}…`} aria-label="Search my designs" />
                    <div className={s.designScope} role="radiogroup" aria-label="Show designs from">
                      {[['all', 'All'], ['this', 'This section']].map(([v, l]) => (
                        <button key={v} type="button" role="radio" aria-checked={designScope === v} className={designScope === v ? s.designScopeOn : ''} onClick={() => setDesignScope(v)}>
                          {l} <span>{v === 'all' ? designs.length : designs.filter(d => d.tpl === t.id).length}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {designs.length > 0 && shownDesigns.length === 0 && <p className={s.designsEmpty}>No designs match{designQuery.trim() ? ` “${designQuery.trim()}”` : ''}.</p>}
                {shownDesigns.length > 0 && (
                  <ul className={`${s.designList} ${s.designListTab}`}>
                    {shownDesigns.map(d => (
                      <li key={d.id} className={`${s.designItem} ${currentDesign?.id === d.id ? s.designItemOn : ''}`}>
                        <button type="button" className={s.designOpen} onClick={() => openDesign(d)} title={d.tpl === t.id ? 'Open this design' : 'Open in its section'} style={{ borderBottom: `3px solid ${d.state?.theme?.brand || '#4f46e5'}` }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/images/section-templates/previews/${d.tpl}.png`} alt="" style={{ objectPosition: 'top' }} />
                        </button>
                        <span className={s.designMeta}>
                          {renaming?.id === d.id
                            ? (
                              <form onSubmit={ev => { ev.preventDefault(); renameDesign(d.id, renaming.name); }}>
                                <input className={s.designRename} value={renaming.name} onChange={ev => setRenaming({ id: d.id, name: ev.target.value })} onBlur={() => renameDesign(d.id, renaming.name)} autoFocus aria-label="New name" maxLength={60} />
                              </form>
                            )
                            : <b title={d.name}>{d.name}</b>}
                          <small>{sectionTemplateById(d.tpl)?.name || d.tpl}</small>
                          <span className={s.designActions}>
                            <button type="button" onClick={() => openDesign(d)}>Open</button>
                            <button type="button" onClick={() => duplicate(d)}>Duplicate</button>
                            <button type="button" onClick={() => setRenaming({ id: d.id, name: d.name })}>Rename</button>
                            <button type="button" onClick={() => removeDesign(d)} aria-label={`Delete ${d.name}`}>Delete</button>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {designs.length === 0 && <p className={s.designsEmpty}>No saved designs yet. Click Save in the toolbar (or press Ctrl+S) to keep this section, make variations, or come back to it on this device.</p>}
                <p className={s.hint}>Designs are saved in this browser, uploaded images included. Open one to keep editing, or duplicate it to make a variation.</p>
              </section>
            ) : (
              <>
                <BrandKitPanel
                  onToast={flash}
                  onApply={kit => setState(p => withKit(p, kit))}
                  onSaveFrom={() => ({ primary: state.theme.brand, bg: state.theme.bg, text: state.theme.text, headingFont: state.fonts.heading, bodyFont: state.fonts.body })}
                />

                {t.groups.map(g => {
                  const fields = t.fields.filter(fd => fd.group === g.id);
                  const isOpen = open.has(g.id);
                  const enabled = !g.toggle || state.toggles[g.toggle];
                  return (
                    <section key={g.id} className={s.section}>
                      <div className={x.groupHead}>
                        <button type="button" className={x.groupBtn} onClick={() => toggleGroup(g.id)} aria-expanded={isOpen}>
                          <span className={`${x.chev} ${isOpen ? x.chevOpen : ''}`}>›</span>
                          <h2 className={s.sectionTitle}>{g.label}</h2>
                        </button>
                        {g.toggle && (
                          <label className={x.switch} title={enabled ? 'Shown in the section' : 'Hidden from the section'}>
                            <input type="checkbox" checked={!!state.toggles[g.toggle]} onChange={ev => setToggle(g.toggle, ev.target.checked)} aria-label={`Show ${g.label}`} />
                            <span />
                          </label>
                        )}
                      </div>
                      {isOpen && (
                        <div className={`${x.groupBody} ${enabled ? '' : x.groupOff}`}>
                          {fields.map(fd => (
                            <div key={fd.key} className={s.field}>
                              <label className={s.label} htmlFor={`st-${fd.key}`}>{fd.label}</label>
                              {fd.type === 'textarea'
                                ? <textarea id={`st-${fd.key}`} className={s.textarea} rows={3} value={f[fd.key] ?? ''} onChange={ev => setField(fd.key, ev.target.value)} />
                                : <input id={`st-${fd.key}`} className={s.input} type="text" inputMode={fd.type === 'url' || fd.type === 'image' ? 'url' : undefined} spellCheck={fd.type === 'text' || fd.type === 'textarea'} value={uploads[fd.key] ? `images/${uploads[fd.key].file}` : (f[fd.key] ?? '')} disabled={!!uploads[fd.key]} title={uploads[fd.key] ? 'Using your uploaded image; remove it to paste a URL instead' : undefined} onChange={ev => setField(fd.key, ev.target.value)} />}
                              {fd.type === 'image' && (
                                <div className={x.uploadRow}>
                                  {uploads[fd.key] ? (
                                    <>
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      {blobUrls[uploads[fd.key].id] ? <img className={x.uploadThumb} src={blobUrls[uploads[fd.key].id]} alt="" /> : <span className={x.uploadThumb} />}
                                      <span className={x.uploadName}>{uploads[fd.key].file} · {uploads[fd.key].w}×{uploads[fd.key].h}</span>
                                      <button type="button" className={s.miniBtn} onClick={() => pickUpload(fd)}>Replace</button>
                                      <button type="button" className={s.miniBtn} onClick={() => removeUpload(fd.key)}>Remove</button>
                                    </>
                                  ) : (
                                    <button type="button" className={s.miniBtn} onClick={() => pickUpload(fd)}>↑ Upload image</button>
                                  )}
                                </div>
                              )}
                              {fd.hint && <span className={s.hint}>{fd.hint}</span>}
                            </div>
                          ))}
                          {g.id === t.groups[0].id && <span className={s.hint}>Tip: wrap words in *asterisks* to colour them with the brand colour.</span>}
                        </div>
                      )}
                    </section>
                  );
                })}

                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Colours</h2>
                  <div className={x.presetGrid}>
                    {THEME_PRESETS.map(p => (
                      <button key={p.id} type="button" className={x.preset} title={`${p.label} colours`} onClick={() => setState(prev => ({ ...prev, theme: { ...prev.theme, ...Object.fromEntries(THEME_COLORS.map(c => [c.key, p[c.key]])) } }))}>
                        <span className={x.presetSwatch}><i style={{ background: p.bg }} /><i style={{ background: p.brand }} /><i style={{ background: p.text }} /></span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className={s.colorGrid}>
                    {THEME_COLORS.map(c => <ColorField key={c.key} label={c.label} value={state.theme[c.key]} onChange={v => setTheme(c.key, v)} />)}
                  </div>
                </section>

                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Fonts</h2>
                  {['heading', 'body'].map(k => (
                    <div key={k} className={s.field}>
                      <label className={s.label} htmlFor={`stf-${k}`}>{k === 'heading' ? 'Headings' : 'Body text'}</label>
                      <FontPicker id={`stf-${k}`} label={k === 'heading' ? 'Heading font' : 'Body font'} allowCustom value={state.fonts[k]} onChange={fid => setState(p => ({ ...p, fonts: { ...p.fonts, [k]: fid } }))} />
                    </div>
                  ))}
                  <p className={s.hint}>Any Google Font, or upload your own (WOFF2, WOFF, TTF or OTF). Uploaded fonts are embedded in your exports and included in backups.</p>
                </section>

                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Shape &amp; width</h2>
                  <div className={s.field}>
                    <span className={s.label}>Corner radius</span>
                    <div className={s.seg} role="radiogroup" aria-label="Corner radius">
                      {RADII.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={String(state.theme.radius) === v} className={`${s.segBtn} ${String(state.theme.radius) === v ? s.segBtnActive : ''}`} onClick={() => setTheme('radius', v)}>{l}</button>)}
                    </div>
                  </div>
                  <div className={s.field}>
                    <span className={s.label}>Content width</span>
                    <div className={s.seg} role="radiogroup" aria-label="Content width">
                      {WIDTHS.map(v => <button key={v} type="button" role="radio" aria-checked={String(state.theme.maxWidth) === v} className={`${s.segBtn} ${String(state.theme.maxWidth) === v ? s.segBtnActive : ''}`} onClick={() => setTheme('maxWidth', v)}>{v}px</button>)}
                    </div>
                  </div>
                </section>

                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Animation</h2>
                  <div className={s.field}>
                    <span className={s.label}>Entrance effect</span>
                    <div className={s.seg} role="radiogroup" aria-label="Entrance effect">
                      {MOTION_PRESETS.map(p => <button key={p.id} type="button" role="radio" aria-checked={state.motion?.preset === p.id} className={`${s.segBtn} ${state.motion?.preset === p.id ? s.segBtnActive : ''}`} onClick={() => setMotion('preset', p.id)}>{p.label}</button>)}
                    </div>
                  </div>
                  {state.motion?.preset !== 'none' && (
                    <div className={s.field}>
                      <span className={s.label}>Speed</span>
                      <div className={s.seg} role="radiogroup" aria-label="Animation speed">
                        {MOTION_SPEEDS.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={String(state.motion?.speed) === v} className={`${s.segBtn} ${String(state.motion?.speed) === v ? s.segBtnActive : ''}`} onClick={() => setMotion('speed', v)}>{l}</button>)}
                      </div>
                    </div>
                  )}
                  <p className={s.hint}>Powered by GSAP and ScrollTrigger: the section animates in once when it scrolls into view. Exports include it, content stays visible without JavaScript, and it switches off for people who prefer reduced motion.</p>
                </section>
              </>
            )}
          </div>
        </aside>

        <div className={s.main} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <PlaygroundTopAd />
          <div className={s.toolbar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', minWidth: 0 }}>
              <h1 className={s.metaName} title={currentDesign ? `Saved design “${currentDesign.name}”` : undefined}>{currentDesign ? currentDesign.name : t.name}</h1>
              {currentDesign && dirty && <i className={s.dirtyDot} title="Unsaved changes" aria-label="Unsaved changes" />}
              <span className={s.toolbarSep} aria-hidden="true" />
              <div className={`${s.seg} ${x.toolSeg}`} role="radiogroup" aria-label="View">
                {[['preview', 'Preview'], ['html', 'HTML'], ['css', 'CSS']].map(([v, l]) => (
                  <button key={v} type="button" role="radio" aria-checked={view === v} className={`${s.segBtn} ${view === v ? s.segBtnActive : ''}`} onClick={() => setView(v)}>{l}</button>
                ))}
              </div>
              {view === 'preview' && (
                <div className={`${s.seg} ${x.toolSeg}`} role="radiogroup" aria-label="Device">
                  {DEVICES.map(d => (
                    <button key={d.id} type="button" role="radio" aria-checked={device === d.id} aria-label={`${d.label} preview (${d.w}px)`} title={`${d.label} · ${d.w}px`} className={`${s.segBtn} ${x.iconSeg} ${device === d.id ? s.segBtnActive : ''}`} onClick={() => setDevice(d.id)}>{d.icon}</button>
                  ))}
                </div>
              )}
              {view === 'preview' && state.motion?.preset !== 'none' && (
                <button type="button" className={s.miniBtn} onClick={() => setPlaying(n => n + 1)} title="Replay the GSAP entrance animation in the preview">▶ Play animation</button>
              )}
            </div>
            <div className={s.toolbarRight} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <HistoryButtons onUndo={undo} onRedo={redo} onReset={() => setState({ ...defaultSectionState(t) })} canUndo={past.current.length > 0} canRedo={future.current.length > 0} />
              <SaveButton
                onClick={quickSave}
                busy={busy === 'save'}
                saved={justSaved}
                dirty={dirty}
                disabled={!!busy}
                title={currentDesign ? (dirty ? `Save changes to “${currentDesign.name}” (Ctrl+S)` : `“${currentDesign.name}” is saved`) : 'Save to My designs (Ctrl+S)'}
                saveAs={{ defaultName: currentDesign ? `${currentDesign.name} (copy)` : nextName(), onSave: name => saveNewDesign(name) }}
                menu={currentDesign ? [{ label: 'Detach', sub: `Keep editing without changing “${currentDesign.name}”`, onClick: () => { setCurrentDesign(null); savedJson.current = null; flash('Detached. Save now creates a new design.'); } }] : []}
              />
              <span className={s.toolbarSep} aria-hidden="true" />
              <ForkButton onClick={forkToMyCode} busy={busy === 'fork'} disabled={!!busy} />
              <ExportMenu
                head="Export this section as…"
                options={[
                  { icon: 'html', label: 'Copy HTML', sub: 'One file: HTML + CSS, images embedded', onClick: copyHtml, disabled: !!busy },
                  { icon: 'file', label: 'Download .html', sub: 'A single page that works offline', onClick: downloadHtml, disabled: !!busy },
                  { icon: 'zip', label: busy === 'zip' ? 'Zipping…' : 'Download ZIP', sub: 'index.html plus your images folder', onClick: downloadZip, disabled: !!busy },
                  { icon: 'react', label: 'Copy React component', sub: 'JSX with the CSS included', onClick: () => copyFramework('react') },
                  { icon: 'vue', label: 'Copy Vue component', sub: 'Single-file component (.vue)', onClick: () => copyFramework('vue') },
                ]}
              />
            </div>
          </div>

          <div className={x.stage} ref={stageRef}>
            {view === 'preview' ? (
              <>
                {origin && scale > 0 && (
                  <div className={x.frameOuter} style={{ width: dev.w * scale }}>
                    <div className={x.frameBox}><SectionFrame key={`${device}-${playing}`} html={previewHtml} width={dev.w} scale={scale} /></div>
                  </div>
                )}
                <p className={x.stageHint}>{dev.label} · {dev.w}px{scale < 1 ? ` · shown at ${Math.round(scale * 100)}%` : ''} · edit the text, images and colours in the panel</p>
              </>
            ) : (
              <div className={x.codeWrap}>
                <button type="button" className={x.codeCopy} onClick={copyCode} aria-live="polite">{codeCopied ? 'Copied ✓' : 'Copy'}</button>
                {view === 'html'
                  ? <pre className={x.code}><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
                  : <pre className={x.code}><code>{codeCss}</code></pre>}
              </div>
            )}
          </div>
        </div>
      </div>
      {confirm && (
        <ConfirmDialog
          {...confirm}
          onCancel={() => setConfirm(null)}
          onOk={() => { const go = confirm.onOk; setConfirm(null); go(); }}
        />
      )}
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}
