'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import x from './styles.module.css';
import { AddToPageMenu, ExportMenu, ForkButton, HistoryButtons, SaveButton } from '@/components/ToolbarActions';
import ConfirmDialog from '@/components/SocialPostTemplates/ConfirmDialog';
import SavedDesignsStrip from '@/components/SavedDesignsStrip';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { LoadMore } from '@/components/UiSnippetsGallery';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import { BrandKitPanel, loadKit, kitIsSet, saveKit } from '@/components/BrandKit';
import { exportDesigns, importDesigns, blobToDataUrl, dataUrlToBlob } from '@/lib/design-transfer';
import { loadCustomFonts, onFontsChange, customFontFaceCss, exportCustomFonts, importCustomFonts } from '@/lib/fonts';
import { makeDesignStore } from '@/lib/design-store';
import { dbPut } from '@/lib/uiSnippetsDb';
import { addToLibrary } from '@/lib/image-library';
import { openForkTab } from '@/lib/open-fork-tab';
import { highlightHtml } from '@/lib/highlight-html';
import { toReactComponent, toVueSfc, componentName } from '@/lib/snippet-exporters';
import {
  SECTION_TEMPLATES, SECTION_CATEGORIES, sectionTemplateById, sectionCategoryById,
  defaultSectionState, restoreSectionState,
} from './templates/index.js';
import { ContentPanel, ThemePanel, ArtworkPanel, withKit } from './panels';
import { bindInlineEdit, fieldOfTarget, useFrozenPreview } from './inline-edit';
import { documentHtml, sectionCss, sectionMarkup, snippetParts, customFontIds, sectionScript, sectionCdn } from './templates/render.js';
import { sectionDesignStore as designStore, putAsset, getAsset } from './storage';
import { saveBlob, prepareUpload, EXT, previewImages, localizeImages } from './upload';

const TOOL = 'website-section-templates';
const BASE = `/${TOOL}/`;
const GALLERY_PAGE = 8; // 2 rows of 4
/* Sections whose effect is driven by scrolling (pinned galleries, stacking cards, drawn lines): their
   preview is a scrollable viewport with room before and after, instead of a frame grown to full height */
const SCROLL_FX = new Set(['hscroll', 'story', 'stack', 'drawpath']);
const SCROLL_FX_HEAD = '<script>window.ST_SCROLL_FX=true</script><style>html{background:#e8ebf0}body::after{content:"";display:block;height:40vh;background:#e8ebf0}</style>';
const DEVICES = [
  { id: 'desktop', label: 'Desktop', w: 1280, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
  { id: 'tablet', label: 'Tablet', w: 820, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M11 18h2" /></svg> },
  { id: 'mobile', label: 'Mobile', w: 390, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg> },
];


/* ── Preview frame: an iframe at a real device width, scaled to fit, growing to the section's height ── */
function SectionFrame({ html, width, scale = 1, interactive = true, onDoc, fixedH = 0 }) {
  const onDocRef = useRef(onDoc);
  onDocRef.current = onDoc;
  const ref = useRef(null);
  const [h, setH] = useState(600);
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return undefined;
    let ro;
    const measure = () => {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      const fit = () => setH(Math.max(200, Math.ceil(Math.max(doc.documentElement.scrollHeight, doc.body?.scrollHeight || 0))));
      ro?.disconnect();
      // A fixed-height frame is a scrollable viewport (scroll effects); otherwise it grows to the section
      if (!fixedH) {
        fit();
        if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(fit); ro.observe(doc.documentElement); }
      }
      // Links inside the preview never navigate away from the editor
      doc.addEventListener('click', ev => { if (ev.target.closest?.('a')) ev.preventDefault(); });
      // Forms (newsletter sign-ups) never submit from the preview
      doc.addEventListener('submit', ev => ev.preventDefault());
      onDocRef.current?.(doc);
    };
    frame.addEventListener('load', measure);
    return () => { frame.removeEventListener('load', measure); ro?.disconnect(); };
  }, [fixedH]);
  const frameH = fixedH || h;
  return (
    <div style={{ width: width * scale, height: frameH * scale, overflow: 'hidden', flex: 'none' }}>
      <iframe
        ref={ref}
        title="Section preview"
        srcDoc={html}
        scrolling={fixedH ? 'yes' : 'no'}
        style={{ width, height: frameH, border: 0, overflow: fixedH ? 'auto' : 'hidden', display: 'block', transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left', pointerEvents: interactive ? 'auto' : 'none', background: '#fff' }}
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
        : <div className={`${s.grid} ${s.grid4}`}>{shown.map(t => <GalleryCard key={t.id} t={t} preview={previews.includes(t.id)} />)}</div>}
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
    <div className={`${s.galleryPage} ${s.galleryFull}`}>
      <PlaygroundTopNav active={TOOL} />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Website Section Templates</h1>
        <p className={s.galleryLead}>
          {SECTION_TEMPLATES.length} free, editable website sections: heroes, navbars, features, pricing, testimonials, FAQ, calls to action, team, contact, blog and footers.
          Change the text, upload your images, set your brand colours and fonts, preview desktop, tablet and mobile, then export HTML and CSS, a ZIP, React or Vue.
        </p>
      </header>
      <SectionCategoryLinks />
      <SectionTemplateGallery
        previews={previews}
        savedStrip={q => (
          <SavedDesignsStrip
            gridClass={s.grid4}
            previewClass={x.cardPreview}
            store={designStore}
            basePath={BASE}
            nameOf={id => sectionTemplateById(id)?.name || id}
            imgFor={d => `/images/section-templates/previews/${d.tpl}.png`}
            renderPreview={(d, w) => <SavedSectionPreview design={d} width={w} />}
            query={q}
            deletable
          />
        )}
      />
    </div>
  );
}

export function SectionCategoryPage({ category, h1, lead, previews = [] }) {
  return (
    <div className={`${s.galleryPage} ${s.galleryFull}`}>
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
export function SectionTemplateEditor({ id }) {
  const t = sectionTemplateById(id);
  const [state, setStateRaw] = useState(() => defaultSectionState(t));
  const [hydrated, setHydrated] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [view, setView] = useState('preview'); // preview | html | css
  const [panelTab, setPanelTab] = useState('edit');
  const [sheetOpen, setSheetOpen] = useState(false);
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
  const [stageH, setStageH] = useState(0);
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
    const ro = new ResizeObserver(() => { setStageW(el.clientWidth); setStageH(el.clientHeight); });
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


  /* Images: preview uses object URLs; exports use data URLs or images/<file> */
  const previewSrc = useCallback(key => (uploads[key] ? blobUrls[uploads[key].id] || '' : ''), [uploads, blobUrls]);
  const dataUrls = async () => {
    const out = {};
    for (const [k, u] of Object.entries(uploads)) { const rec = await getAsset(u.id).catch(() => null); if (rec?.blob) out[k] = await blobToDataUrl(rec.blob); }
    return out;
  };
  const relativeSrc = key => (uploads[key] ? `images/${uploads[key].file}` : '');
  const zipSrc = key => (uploads[key] ? `assets/${uploads[key].file}` : '');
  const fontFaces = useMemo(() => (fontTick >= 0 ? customFontFaceCss(customFontIds(t, state)) : ''), [t, state, fontTick]);

  const scrollFx = (t.behaviors || []).some(b => SCROLL_FX.has(b));
  const previewHtml = useMemo(
    // Navbars get room below them in the preview, so their menus have space to open
    // ST_PREVIEW: forms simulate success instead of sending anything
    () => previewImages(documentHtml(t, state, { imageSrc: previewSrc, clean: false, fontFaces, motion: playing > 0, extraHead: `<script>window.ST_PREVIEW=true</script>${scrollFx ? SCROLL_FX_HEAD : ''}${t.previewMinHeight ? `<style>body{min-height:${t.previewMinHeight}px;background:#f1f5f9}</style>` : ''}` }), origin),
    [t, state, previewSrc, fontFaces, origin, playing, scrollFx],
  );
  /* Click-to-edit: text is typed right in the preview, any other bound element points to its
     input in the panel. The preview doesn't reload while text is being edited in it. */
  const [shownHtml, editStart, editEnd] = useFrozenPreview(previewHtml);
  const [reveal, setReveal] = useState(null);
  const onPreviewDoc = useCallback(doc => bindInlineEdit(doc, {
    resolve: tg => fieldOfTarget(t, tg),
    onInput: (tg, v) => setState(p => (tg.list
      ? { ...p, lists: { ...p.lists, [tg.list]: (p.lists?.[tg.list] || []).map(it => (it._id === tg.item ? { ...it, [tg.key]: v } : it)) } }
      : { ...p, fields: { ...p.fields, [tg.key]: v } })),
    onReveal: (tg, focus) => {
      setPanelTab('edit');
      if (focus) setSheetOpen(true);
      setReveal({ ...tg, focus, n: Date.now() });
    },
    onStart: editStart,
    onEnd: editEnd,
  }), [t, setState, editStart, editEnd]);
  // Any edit other than the animation settings stops the replay, so typing never re-runs it
  const stillJson = JSON.stringify({ ...state, motion: null });
  useEffect(() => { setPlaying(0); }, [stillJson]);
  const codeHtml = useMemo(() => documentHtml(t, state, { imageSrc: relativeSrc, fontFaces: fontFaces ? '/* + your uploaded fonts (inlined on export) */' : '' }), [t, state, fontFaces]); // eslint-disable-line react-hooks/exhaustive-deps
  const highlighted = useMemo(() => (view === 'html' ? highlightHtml(codeHtml) : ''), [view, codeHtml]);

  /* Uploads */
  // ukey: where the upload is stored in state.uploads (the field key, or list.item.field)
  const pickUpload = (fd, ukey = fd.key) => { uploadTarget.current = { fd, ukey }; fileRef.current?.click(); };
  const onUploadFile = async ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    const { fd, ukey } = uploadTarget.current || {};
    if (!file || !fd) return;
    if (!/^image\//.test(file.type)) { flash('Choose an image file (PNG, JPG, WebP, GIF or SVG).'); return; }
    try {
      const out = await prepareUpload(file, fd.upload || {});
      const uid = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const key = `${t.id}:${ukey}:${uid}`;
      const name = `${fd.upload?.name || fd.key}-${uid}.${EXT[out.type] || 'png'}`;
      await putAsset(key, { blob: out.blob, type: out.type, file: name, name, w: out.w, h: out.h, updatedAt: new Date().toISOString() });
      addToLibrary(out.blob, { file: name, w: out.w, h: out.h });
      setState(p => ({ ...p, uploads: { ...p.uploads, [ukey]: { id: key, file: name, w: out.w, h: out.h } } }));
      flash(`Uploaded ${file.name} (${out.w}×${out.h}). Saved in this browser.`);
    } catch (err) { flash(err.message || 'Upload failed'); }
  };

  /* Copy / download */
  const copy = async (str, note) => {
    try { await navigator.clipboard.writeText(str); flash(note); return true; }
    catch { flash('Copy was blocked by the browser, so use a download option instead'); return false; }
  };
  const fileBase = t.id;
  const downloadZip = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const dir = zip.folder(fileBase);
      const taken = new Set();
      for (const u of Object.values(uploads)) { const rec = await getAsset(u.id).catch(() => null); if (rec?.blob && !taken.has(u.file)) { dir.file(`assets/${u.file}`, rec.blob); taken.add(u.file); } }
      const { html, missed } = await localizeImages(documentHtml(t, state, { imageSrc: zipSrc, fontFaces }), dir, taken);
      dir.file('index.html', html);
      const files = [...taken];
      dir.file('README.txt', [
        `${t.name} v${t.version} — https://webdevpuneet.com${BASE}${t.id}/`,
        '',
        'index.html   the section as a complete page (HTML with the CSS in a <style> tag)',
        files.length ? `assets/      every image the section uses: ${files.join(', ')}` : '',
        missed ? `             ${missed} image${missed > 1 ? 's' : ''} could not be downloaded and still load from their original URL.` : '',
        '',
        'To use it on your site, copy the <section class="st …"> element and the CSS into your page.',
        'Every colour, font and size is a CSS variable at the top of the CSS (--st-brand, --st-font-heading …).',
      ].filter((l, i, a) => l || a[i - 1]).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${fileBase}.zip`);
      flash(`Downloaded ZIP${files.length ? ` with ${files.length} image${files.length > 1 ? 's' : ''} in assets/` : ''}${missed ? ` (${missed} kept as links)` : ''}.`);
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };
  const downloadFrameworkZip = async kind => {
    const react = kind === 'react';
    setBusy(`${kind}zip`);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const dir = zip.folder(`${fileBase}-${kind}`);
      const taken = new Set();
      for (const u of Object.values(uploads)) { const rec = await getAsset(u.id).catch(() => null); if (rec?.blob && !taken.has(u.file)) { dir.file(`assets/${u.file}`, rec.blob); taken.add(u.file); } }
      const parts = snippetParts(t, state, { imageSrc: zipSrc, fontFaces });
      const a = await localizeImages(parts.html, dir, taken);
      const b = await localizeImages(parts.css, dir, taken);
      const name = componentName(parts);
      const out = { ...parts, html: a.html, css: b.html };
      dir.file(react ? `${name}.jsx` : `${name}.vue`, react ? toReactComponent(out) : toVueSfc(out));
      const missed = a.missed + b.missed;
      dir.file('README.txt', [
        `${t.name} v${t.version} as a ${react ? 'React' : 'Vue'} component: https://webdevpuneet.com${BASE}${t.id}/`,
        '',
        react ? `${name}.jsx   the component (JSX with the CSS included)` : `${name}.vue   the single-file component (template, script and CSS)`,
        taken.size ? `assets/        every image it uses (${taken.size}). Copy this folder into your public/ folder so /assets/... resolves.` : '',
        missed ? `${missed} image${missed > 1 ? 's' : ''} could not be downloaded and still load from their original URL.` : '',
      ].filter(Boolean).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${fileBase}-${kind}.zip`);
      flash(`Downloaded ${react ? 'React' : 'Vue'} ZIP${taken.size ? ` with ${taken.size} image${taken.size > 1 ? 's' : ''} in assets/` : ''}.`);
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };
  /* Send this section (content, lists and uploaded images) to the Website Builder, which
     appends it to the page being built. Key shared with components/WebsiteBuilder. */
  // Saved websites with their pages (older single-page records count as one page)
  const loadBuilderPages = () => makeDesignStore('wdp-website-pages').listDesigns().then(list => list.map(d => ({
    id: d.id, name: d.name, updated: d.updated,
    pages: d.state?.kind === 'site' && Array.isArray(d.state.pages)
      ? d.state.pages.map((p, i) => ({ id: p.id, name: p.name || (i ? 'Page' : 'Home'), file: i === 0 ? 'index.html' : `${p.slug || 'page'}.html` }))
      : [{ id: null, name: 'Home', file: 'index.html' }],
  })));
  const addToBuilder = (siteId, pageId) => {
    try { localStorage.setItem('wdp-wb-incoming', JSON.stringify({ tpl: t.id, state, at: Date.now() })); }
    catch { flash('Your browser blocked storage, so the section couldn’t be sent to the Website Builder.'); return; }
    window.open(`/website-builder/editor/?add=1&${siteId ? `page=${encodeURIComponent(siteId)}${pageId ? `&to=${encodeURIComponent(pageId)}` : ''}` : 'starter=blank'}`, '_blank', 'noopener');
    flash(siteId ? 'Opened your website in the Website Builder with this section added.' : 'Opened a new website in the Website Builder with this section added.');
  };
  const forkToMyCode = async () => {
    const tab = openForkTab();
    setBusy('fork');
    try {
      const urls = await dataUrls();
      const now = new Date().toISOString();
      const rid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `st-${Date.now().toString(36)}`;
      const gf = documentHtml(t, state).match(/<link href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)?.[1];
      /* On localhost the production image URLs aren't live yet, so point them at this origin */
      const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
        ? s => s.split('https://webdevpuneet.com/images/').join(`${location.origin}/images/`)
        : s => s;
      await dbPut({
        id: rid,
        name: `${t.name} (section)`,
        tags: ['section'],
        cdnUrls: [...(gf ? [gf] : []), ...sectionCdn(t, state)],
        html: local(sectionMarkup(t, state, { imageSrc: k => urls[k] || '', clean: true })),
        css: local(sectionCss(t, state, { fontFaces })),
        js: sectionScript(t, state),
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
    if (await copy(codeHtml, 'HTML copied')) { setCodeCopied(true); setTimeout(() => setCodeCopied(false), 1400); }
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

                <ContentPanel t={t} state={state} setState={setState} blobUrls={blobUrls} onPickUpload={pickUpload} reveal={reveal} />

                <ThemePanel
                  value={{ theme: state.theme, fonts: state.fonts, motion: state.motion }}
                  showTextEffect={/data-anim-text/.test(t.html)}
                  onChange={v => {
                    const motionChanged = JSON.stringify(v.motion) !== JSON.stringify(state.motion);
                    setState(p => ({ ...p, theme: v.theme, fonts: v.fonts, motion: v.motion }));
                    if (motionChanged) setPlaying(n => n + 1);
                  }}
                />
                <ArtworkPanel
                  art={state.art}
                  idPrefix={`sa-${t.id}`}
                  onChange={next => {
                    setState(p => { const { art: _old, ...rest } = p; return next ? { ...rest, art: next } : rest; });
                    if (next?.anim && next.anim !== state.art?.anim) setPlaying(n => n + 1);
                  }}
                />
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
                {[['preview', 'Preview'], ['html', 'HTML']].map(([v, l]) => (
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
                <button type="button" className={`${s.miniBtn} ${x.toolBtn}`} onClick={() => setPlaying(n => n + 1)} title="Play animation">▶ Play</button>
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
              <AddToPageMenu loadPages={loadBuilderPages} onPick={addToBuilder} />
              <ForkButton onClick={forkToMyCode} busy={busy === 'fork'} disabled={!!busy} />
              <ExportMenu
                head="Export this section as…"
                options={[
                  { icon: 'html', label: busy === 'zip' ? 'Zipping…' : 'Download ZIP', sub: 'index.html plus an assets folder with every image', onClick: downloadZip, disabled: !!busy },
                  { icon: 'react', label: busy === 'reactzip' ? 'Zipping…' : 'Download React ZIP', sub: 'The .jsx component plus an assets folder with every image', onClick: () => downloadFrameworkZip('react'), disabled: !!busy },
                  { icon: 'vue', label: busy === 'vuezip' ? 'Zipping…' : 'Download Vue ZIP', sub: 'The .vue component plus an assets folder with every image', onClick: () => downloadFrameworkZip('vue'), disabled: !!busy },
                ]}
              />
            </div>
          </div>

          <div className={x.stage} ref={stageRef}>
            {view === 'preview' ? (
              <>
                {origin && scale > 0 && (
                  <div className={x.frameOuter} style={{ width: dev.w * scale }}>
                    <div className={x.frameBox}><SectionFrame key={`${device}-${playing}-${scrollFx}`} html={shownHtml} width={dev.w} scale={scale} onDoc={onPreviewDoc} fixedH={scrollFx && stageH ? Math.max(360, Math.round((stageH - 110) / scale)) : 0} /></div>
                  </div>
                )}
                <p className={x.stageHint}>{dev.label} · {dev.w}px{scale < 1 ? ` · shown at ${Math.round(scale * 100)}%` : ''} · {scrollFx ? 'scroll inside the preview to see the effect' : 'edit the text, images and colours in the panel'}</p>
              </>
            ) : (
              <div className={x.codeWrap}>
                <button type="button" className={x.codeCopy} onClick={copyCode} aria-live="polite">{codeCopied ? 'Copied ✓' : 'Copy'}</button>
                <pre className={x.code}><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
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
