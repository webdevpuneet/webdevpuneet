'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { BrandKitPanel, loadKit, kitIsSet } from '@/components/BrandKit';
import { revealInPanel } from '@/lib/reveal-in-panel';
import { SIZES, sizeById, categoryById, templateById } from './templates/index.js';
import { FONTS, PALETTES, parseHex } from '../OgImageGenerator/engine';
import Preview from './Preview';
import { renderImage, standaloneHtml, snippetParts } from './render';
import { dbPut } from '@/lib/uiSnippetsDb';
import { openForkTab } from '@/lib/open-fork-tab';

const LS_PREFIX = 'wdp-spt-v1:';
const fmtBytes = n => (n >= 1048576 ? `${(n / 1048576).toFixed(2)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const extOf = blob => (blob.type === 'image/jpeg' ? 'jpg' : blob.type === 'image/webp' ? 'webp' : 'png');
const VAR_LABELS = { bg: 'Background', bg2: 'Gradient end', text: 'Text', accent: 'Accent', card: 'Card', accent2: 'Second accent' };
const CAROUSEL = ['carousel-cover', 'carousel-step', 'carousel-save'];
const SLIDE_NAMES = { 'carousel-cover': 'Cover', 'carousel-step': 'Step', 'carousel-save': 'Final' };

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Uploads are downscaled and kept as data URLs; their size is kept for photo cropping */
function readImage(file, maxDim, mime) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth || 800, h = img.naturalHeight || 800;
      const k = Math.min(1, maxDim / Math.max(w, h));
      w = Math.round(w * k); h = Math.round(h * k);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve({ data: c.toDataURL(mime, 0.86), dims: { w, h } });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
    img.src = url;
  });
}

const textDefaults = tt => Object.fromEntries(tt.fields.filter(f => f.type !== 'image').map(f => [f.key, f.value || '']));
const newSlide = (tpl, fields) => ({ tpl, fields: fields || textDefaults(templateById(tpl)), images: {}, imagePos: {}, imageDims: {} });

/* Carousel slides number themselves: {n} slide number, {nn} two digits, {total} count */
function slideFields(tpl, extra = {}) {
  const f = textDefaults(templateById(tpl));
  if (tpl === 'carousel-cover') f.count = '{n}/{total}';
  if (tpl === 'carousel-step') { f.number = '{nn}'; f.progress = '{n} / {total}'; }
  return { ...f, ...extra };
}
function carouselSlides() {
  return [
    newSlide('carousel-cover', slideFields('carousel-cover', { title: '3 CSS tricks I wish I knew *sooner*' })),
    newSlide('carousel-step', slideFields('carousel-step')),
    newSlide('carousel-step', slideFields('carousel-step', { title: 'Size boxes with *aspect-ratio*', body: 'aspect-ratio: 16 / 9 keeps images, videos and cards in shape without padding hacks.' })),
    newSlide('carousel-step', slideFields('carousel-step', { title: 'Style parents with *:has()*', body: 'li:has(> input:checked) styles a whole row when its checkbox is ticked, with no JavaScript.' })),
    newSlide('carousel-save', slideFields('carousel-save')),
  ];
}
// One palette for the whole carousel, based on the template it was opened from
const CAROUSEL_BG2 = { 'carousel-step': '#ddd6fe', 'carousel-save': '#fde68a' };

function editorDefault(t) {
  const vars = Object.fromEntries(t.vars.map(v => [v.key, v.value]));
  if (CAROUSEL.includes(t.id)) {
    if (!('bg2' in vars)) vars.bg2 = CAROUSEL_BG2[t.id] || '#7c3aed';
    const slides = carouselSlides();
    return { size: t.defaultSize || 'portrait', vars, fonts: { ...t.fonts }, slides, active: Math.max(0, slides.findIndex(x => x.tpl === t.id)) };
  }
  return { size: t.defaultSize || 'portrait', vars, fonts: { ...t.fonts }, slides: [newSlide(t.id)], active: 0 };
}

/* Brings a saved design up to date (older saves kept fields at the top level) */
function restore(t, saved) {
  const d = editorDefault(t);
  const keep = (src, def) => ({ ...def, ...Object.fromEntries(Object.entries(src || {}).filter(([k]) => k in def)) });
  const cleanSlide = sl => {
    const tt = templateById(sl?.tpl);
    if (!tt) return null;
    const imgKeys = new Set(tt.fields.filter(f => f.type === 'image').map(f => f.key));
    const only = obj => Object.fromEntries(Object.entries(obj || {}).filter(([k]) => imgKeys.has(k)));
    return { tpl: tt.id, fields: keep(sl.fields, textDefaults(tt)), images: only(sl.images), imagePos: only(sl.imagePos), imageDims: only(sl.imageDims) };
  };
  let slides;
  if (Array.isArray(saved.slides)) slides = saved.slides.map(cleanSlide).filter(Boolean);
  else {
    const at = d.slides.findIndex(sl => sl.tpl === t.id);
    slides = d.slides.map((sl, i) => (i === at ? { ...sl, ...cleanSlide({ ...saved, tpl: t.id }) } : sl));
  }
  if (!slides.length) slides = d.slides;
  return {
    size: SIZES.some(x => x.id === saved.size) ? saved.size : d.size,
    vars: { ...d.vars, ...Object.fromEntries(Object.entries(saved.vars || {}).filter(([k]) => k in d.vars)) },
    fonts: { ...d.fonts, ...(saved.fonts || {}) },
    slides,
    active: Math.min(Math.max(0, saved.active ?? d.active), slides.length - 1),
  };
}

function ColorField({ label, value, onChange }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => { setDraft(value); }, [value]);
  const rgb = parseHex(value);
  const six = rgb ? '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('') : '#000000';
  return (
    <div className={s.colorField}>
      <label className={s.label}>{label}</label>
      <div className={s.colorInput}>
        <span className={s.colorSwatch} style={{ background: six }} />
        <input type="color" className={s.colorPicker} value={six} onChange={e => onChange(e.target.value)} aria-label={`${label} colour picker`} />
        <input
          className={s.hexInput}
          value={draft}
          maxLength={7}
          spellCheck={false}
          aria-label={`${label} hex value`}
          onChange={e => { const v = e.target.value.trim(); setDraft(v); if (parseHex(v)) onChange(v.startsWith('#') ? v : `#${v}`); }}
          onBlur={() => setDraft(value)}
        />
      </div>
    </div>
  );
}

export default function TemplateEditor({ id }) {
  const t = templateById(id);
  const isCarousel = CAROUSEL.includes(t.id);
  const [state, setState] = useState(() => editorDefault(t));
  const [hydrated, setHydrated] = useState(false);
  const [safe, setSafe] = useState(false);
  const [format, setFormat] = useState('png');
  const [busy, setBusy] = useState('');
  const [toast, setToast] = useState('');
  const [includeImages, setIncludeImages] = useState(true);
  const [box, setBox] = useState({ w: 600, h: 600 });
  const stageRef = useRef(null);
  const fileRef = useRef(null);
  const pickKey = useRef(null);

  const flash = useCallback(msg => { setToast(msg); setTimeout(() => setToast(''), 2600); }, []);
  const z = sizeById(state.size);
  const cat = categoryById(t.category);

  /* Current slide and the flat design state the renderer works with */
  const active = Math.min(state.active, state.slides.length - 1);
  const slide = state.slides[active];
  const st = templateById(slide.tpl) || t;
  const designFor = useCallback((i, base = state) => {
    const sl = base.slides[i];
    return {
      size: base.size, vars: base.vars, fonts: base.fonts,
      fields: sl.fields, images: sl.images || {}, imagePos: sl.imagePos || {}, imageDims: sl.imageDims || {},
      slideNo: i + 1, slideTotal: base.slides.length,
    };
  }, [state]);
  const design = useMemo(() => designFor(active), [designFor, active]);

  /* Restore / autosave this template's edits */
  useEffect(() => {
    let next = null;
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PREFIX + t.id) || 'null');
      if (saved) next = restore(t, saved);
    } catch { /* storage blocked */ }
    if (!next) {
      // Untouched template: open it in the user's brand if they asked for that
      const kit = loadKit();
      if (kit?.autoApply && kitIsSet(kit)) next = withKit(editorDefault(t), kit);
    }
    if (next) setState(next);
    hist.current.skip = true; // the restored design is the starting point, not an undo step
    setHydrated(true);
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => {
      try { localStorage.setItem(LS_PREFIX + t.id, JSON.stringify(state)); }
      catch {
        try { localStorage.setItem(LS_PREFIX + t.id, JSON.stringify({ ...state, slides: state.slides.map(sl => ({ ...sl, images: {}, imageDims: {}, imagePos: {} })) })); } catch { /* full */ }
      }
    }, 500);
    return () => clearTimeout(tm);
  }, [state, hydrated, t.id]);

  /* Fit the preview into the stage */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth - 40, h: el.clientHeight - 40 }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Undo / redo: edits settle for 450ms before becoming one history step */
  const hist = useRef({ past: [], future: [], committed: null, skip: false, timer: null });
  const [, setHistTick] = useState(0);
  useEffect(() => {
    const h = hist.current;
    if (!hydrated || h.skip || h.committed === null) { h.skip = false; h.committed = state; return undefined; }
    clearTimeout(h.timer);
    h.timer = setTimeout(() => {
      if (h.committed === state) return;
      h.past.push(h.committed);
      if (h.past.length > 80) h.past.shift();
      h.future = [];
      h.committed = state;
      setHistTick(n => n + 1);
    }, 450);
    return () => clearTimeout(h.timer);
  }, [state, hydrated]);
  const stateRef = useRef(state);
  stateRef.current = state;
  const undo = useCallback(() => {
    const h = hist.current;
    clearTimeout(h.timer);
    const cur = stateRef.current;
    if (h.committed !== cur) { h.past.push(h.committed); h.future = []; h.committed = cur; }
    if (!h.past.length) return;
    h.future.push(h.committed);
    const prev = h.past.pop();
    h.committed = prev;
    h.skip = true;
    setState(prev);
    setHistTick(n => n + 1);
  }, []);
  const redo = useCallback(() => {
    const h = hist.current;
    if (!h.future.length) return;
    h.past.push(h.committed);
    const next = h.future.pop();
    h.committed = next;
    h.skip = true;
    setState(next);
    setHistTick(n => n + 1);
  }, []);
  useEffect(() => {
    const onKey = e => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const el = e.composedPath?.()[0] || e.target;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName) || el?.isContentEditable) return;
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);
  const canUndo = hist.current.past.length > 0 || (hist.current.committed !== null && hist.current.committed !== state);
  const canRedo = hist.current.future.length > 0;

  /* Editing the current slide */
  const updateSlide = useCallback(fn => setState(p => ({ ...p, slides: p.slides.map((sl, i) => (i === Math.min(p.active, p.slides.length - 1) ? fn(sl) : sl)) })), []);
  const setField = useCallback((key, val) => updateSlide(sl => ({ ...sl, fields: { ...sl.fields, [key]: val } })), [updateSlide]);
  const setImagePos = useCallback((key, pos) => updateSlide(sl => ({ ...sl, imagePos: { ...sl.imagePos, [key]: pos } })), [updateSlide]);
  const setVar = (key, val) => setState(p => ({ ...p, vars: { ...p.vars, [key]: val } }));
  const revealField = useCallback(key => revealInPanel(document.querySelector(`[data-fieldwrap="${key}"]`), s.flash), []);
  const pickImage = useCallback(key => { pickKey.current = key; fileRef.current?.click(); }, []);
  const onFile = async e => {
    const file = e.target.files?.[0];
    e.target.value = '';
    const key = pickKey.current;
    if (!file || !key) return;
    const field = st.fields.find(f => f.key === key);
    const contain = field?.fit === 'contain';
    try {
      const { data, dims } = await readImage(file, contain ? 600 : 1600, contain ? 'image/png' : 'image/jpeg');
      updateSlide(sl => {
        const imagePos = { ...sl.imagePos };
        delete imagePos[key]; // a new photo starts centred
        return { ...sl, images: { ...sl.images, [key]: data }, imageDims: { ...sl.imageDims, [key]: dims }, imagePos };
      });
    } catch (err) { flash(err.message); }
  };
  const removeImage = key => updateSlide(sl => {
    const strip = o => { const n = { ...o }; delete n[key]; return n; };
    return { ...sl, images: strip(sl.images), imagePos: strip(sl.imagePos), imageDims: strip(sl.imageDims) };
  });
  const applyPalette = p => setState(prev => {
    const map = { bg: p.bg1, bg2: p.bg2, text: p.textColor, accent: p.accentColor };
    const vars = { ...prev.vars };
    Object.entries(map).forEach(([k, v]) => { if (k in vars) vars[k] = v; });
    return { ...prev, vars };
  });

  /* Carousel slides */
  const selectSlide = i => setState(p => ({ ...p, active: i }));
  const addSlide = tpl => setState(p => {
    const at = Math.min(p.active, p.slides.length - 1) + 1;
    const slides = [...p.slides.slice(0, at), newSlide(tpl, slideFields(tpl)), ...p.slides.slice(at)];
    return { ...p, slides, active: at };
  });
  const duplicateSlide = () => setState(p => {
    const at = Math.min(p.active, p.slides.length - 1);
    const copy = JSON.parse(JSON.stringify(p.slides[at]));
    return { ...p, slides: [...p.slides.slice(0, at + 1), copy, ...p.slides.slice(at + 1)], active: at + 1 };
  });
  const removeSlide = i => setState(p => {
    if (p.slides.length < 2) return p;
    const slides = p.slides.filter((_, j) => j !== i);
    return { ...p, slides, active: Math.min(p.active > i ? p.active - 1 : p.active, slides.length - 1) };
  });
  const moveSlide = (i, dir) => setState(p => {
    const j = i + dir;
    if (j < 0 || j >= p.slides.length) return p;
    const slides = [...p.slides];
    [slides[i], slides[j]] = [slides[j], slides[i]];
    return { ...p, slides, active: p.active === i ? j : p.active === j ? i : p.active };
  });

  /* Brand kit */
  const applyKit = kit => setState(p => withKit(p, kit));
  const kitFromDesign = () => {
    const logoField = st.fields.find(f => f.type === 'image' && f.fit === 'contain');
    return {
      primary: state.vars.accent || state.vars.brand,
      bg: state.vars.bg,
      text: state.vars.text,
      headingFont: state.fonts.heading,
      bodyFont: state.fonts.body,
      ...(slide.fields.handle ? { handle: slide.fields.handle } : {}),
      ...(logoField && slide.images[logoField.key] ? { logo: slide.images[logoField.key], logoDims: slide.imageDims?.[logoField.key] || null } : {}),
    };
  };

  /* Export */
  const slideName = i => `${String(i + 1).padStart(2, '0')}-${(SLIDE_NAMES[state.slides[i].tpl] || 'slide').toLowerCase()}`;
  const baseName = isCarousel ? `carousel-${slideName(active)}-${z.w}x${z.h}` : `${t.id}-${z.w}x${z.h}`;
  const download = async () => {
    setBusy('download');
    try {
      const blob = await renderImage(st, design, { format, quality: 0.92 });
      saveBlob(blob, `${baseName}.${extOf(blob)}`);
      flash(`Downloaded ${z.w}×${z.h} ${extOf(blob).toUpperCase()} · ${fmtBytes(blob.size)}`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const downloadAllSizes = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      for (const size of SIZES) {
        const blob = await renderImage(st, { ...design, size: size.id }, { format, quality: 0.92 });
        zip.file(`${t.id}-${size.id}-${size.w}x${size.h}.${extOf(blob)}`, blob);
      }
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${t.id}-all-sizes.zip`);
      flash(`Downloaded ${SIZES.length} sizes as a ZIP`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const downloadAllSlides = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      for (let i = 0; i < state.slides.length; i++) {
        const blob = await renderImage(templateById(state.slides[i].tpl), designFor(i), { format, quality: 0.92 });
        zip.file(`${slideName(i)}-${z.w}x${z.h}.${extOf(blob)}`, blob);
      }
      saveBlob(await zip.generateAsync({ type: 'blob' }), `carousel-${state.slides.length}-slides-${z.w}x${z.h}.zip`);
      flash(`Downloaded ${state.slides.length} slides as a ZIP, numbered in posting order`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(standaloneHtml(st, design, { includeImages }));
      flash('HTML copied. Paste it into a .html file');
    } catch { flash('Copy blocked by the browser, so use Download .html instead'); }
  };
  const forkToMyCode = async () => {
    const tab = openForkTab();
    setBusy('fork');
    try {
      const { html, css } = snippetParts(st, design, { includeImages });
      const now = new Date().toISOString();
      const rid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `spt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      await dbPut({ id: rid, name: `${st.name} (${z.label}, ${z.w}×${z.h})`, tags: ['social-post'], cdnUrls: [], html, css, js: '', createdAt: now, updatedAt: now });
      tab.go(rid);
      flash('Forked to My Code. It opened in a new tab.');
    } catch (err) {
      tab.cancel();
      flash(`Couldn't save to My Code: ${err.message}`);
    }
    setBusy('');
  };
  const downloadHtml = () => saveBlob(new Blob([standaloneHtml(st, design, { includeImages })], { type: 'text/html' }), `${baseName}.html`);

  const textFields = st.fields.filter(f => f.type !== 'image');
  const imageFields = st.fields.filter(f => f.type === 'image');
  const scaleSafe = v => `${(v / z.h) * 100}%`;
  const varKeys = Object.keys(state.vars);
  const varLabel = k => (isCarousel ? VAR_LABELS[k] : t.vars.find(v => v.key === k)?.label) || VAR_LABELS[k] || k;

  return (
    <div className={s.wrap}>
      <ImageToolsTopNav active="social-post-templates" />
      <input ref={fileRef} type="file" accept="image/*" className={s.fileInput} onChange={onFile} />
      <div className={s.body}>
        <aside className={s.controls}>
          <div className={s.panelHead}>
            <a href="/social-post-templates/" className={s.toolBrand} title="All social post templates">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/social-post-templates.svg" alt="" width={26} height={26} />
              <span>Social Post Templates</span>
            </a>
            <div className={s.titleRow}>
              <h1 className={s.title}>{isCarousel ? 'Carousel Builder' : t.name}</h1>
              <span className={s.version}>v{t.version}</span>
            </div>
            <div className={s.headActions}>
              <button type="button" className={s.primaryBtn} onClick={download} disabled={!!busy}>
                {busy === 'download' ? 'Rendering…' : isCarousel ? `↓ Slide ${active + 1} (${format.toUpperCase()})` : `↓ Download ${format.toUpperCase()}`}
              </button>
              {isCarousel
                ? <button type="button" className={s.btn} onClick={downloadAllSlides} disabled={!!busy} title="Every slide as a numbered ZIP">{busy === 'zip' ? 'Zipping…' : `All ${state.slides.length} slides (ZIP)`}</button>
                : <button type="button" className={s.btn} onClick={downloadAllSizes} disabled={!!busy} title="Every size as a ZIP">{busy === 'zip' ? 'Zipping…' : 'All sizes (ZIP)'}</button>}
            </div>
            <div className={s.miniRow}>
              <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={forkToMyCode} disabled={!!busy} title="Save this design as an editable HTML/CSS snippet in My Code">
                {busy === 'fork' ? 'Forking…' : 'Fork to My Code'}
              </button>
              <button type="button" className={s.miniBtn} onClick={copyHtml}>Copy HTML</button>
              <button type="button" className={s.miniBtn} onClick={downloadHtml}>Download .html</button>
              <button type="button" className={s.miniBtn} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">↶ Undo</button>
              <button type="button" className={s.miniBtn} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">↷ Redo</button>
              <button type="button" className={s.miniBtn} onClick={() => setState(editorDefault(t))} title="Back to the original (undo brings your edits back)">Reset</button>
            </div>
          </div>

          <BrandKitPanel onApply={applyKit} onSaveFrom={kitFromDesign} onToast={flash} />

          {isCarousel && (
            <section className={s.section}>
              <h2 className={s.sectionTitle}>Slides <span className={s.sectionCount}>{state.slides.length}</span></h2>
              <ol className={s.slides}>
                {state.slides.map((sl, i) => (
                  <li key={i} className={`${s.slideRow} ${i === active ? s.slideRowActive : ''}`}>
                    <button type="button" className={s.slidePick} onClick={() => selectSlide(i)} aria-current={i === active}>
                      <b>{i + 1}</b>
                      <span>{SLIDE_NAMES[sl.tpl]}</span>
                      <small>{String(sl.fields.title || '').replace(/\*/g, '').slice(0, 40)}</small>
                    </button>
                    <span className={s.slideActions}>
                      <button type="button" onClick={() => moveSlide(i, -1)} disabled={i === 0} aria-label={`Move slide ${i + 1} up`}>↑</button>
                      <button type="button" onClick={() => moveSlide(i, 1)} disabled={i === state.slides.length - 1} aria-label={`Move slide ${i + 1} down`}>↓</button>
                      <button type="button" onClick={() => removeSlide(i)} disabled={state.slides.length < 2} aria-label={`Delete slide ${i + 1}`}>✕</button>
                    </span>
                  </li>
                ))}
              </ol>
              <div className={s.miniRow}>
                <button type="button" className={s.miniBtn} onClick={() => addSlide('carousel-step')}>+ Step</button>
                <button type="button" className={s.miniBtn} onClick={() => addSlide('carousel-cover')}>+ Cover</button>
                <button type="button" className={s.miniBtn} onClick={() => addSlide('carousel-save')}>+ Final</button>
                <button type="button" className={s.miniBtn} onClick={duplicateSlide}>Duplicate</button>
              </div>
              <p className={s.hint}>Slide numbers fill themselves: <code>{'{n}'}</code> is the slide number, <code>{'{nn}'}</code> two digits, <code>{'{total}'}</code> the count. Up to 20 slides per Instagram carousel.</p>
            </section>
          )}

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Size</h2>
            <div className={s.sizeGrid}>
              {SIZES.map(size => (
                <button key={size.id} type="button" className={`${s.sizeBtn} ${state.size === size.id ? s.sizeBtnActive : ''}`} onClick={() => setState(p => ({ ...p, size: size.id }))} title={size.note}>
                  <i style={{ aspectRatio: `${size.w} / ${size.h}` }} />
                  <span>{size.label}</span>
                  <small>{size.w}×{size.h}</small>
                </button>
              ))}
            </div>
            <p className={s.hint}>{isCarousel ? 'Every slide uses this size (Instagram requires one size per carousel).' : z.note}</p>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>{isCarousel ? `Text · slide ${active + 1}` : 'Text'}</h2>
            {textFields.map(f => (
              <div key={`${active}-${f.key}`} className={s.field} data-fieldwrap={f.key}>
                <label className={s.label} htmlFor={`f-${f.key}`}>{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea id={`f-${f.key}`} className={s.textarea} rows={f.key === 'code' ? 5 : 2} value={slide.fields[f.key] ?? ''} onChange={e => setField(f.key, e.target.value)} spellCheck={f.key !== 'code'} />
                  : <input id={`f-${f.key}`} className={s.input} value={slide.fields[f.key] ?? ''} onChange={e => setField(f.key, e.target.value)} />}
              </div>
            ))}
            <p className={s.hint}>Tip: click text in the preview to edit it there. Wrap words in *asterisks* to colour them.</p>
          </section>

          {imageFields.length > 0 && (
            <section className={s.section}>
              <h2 className={s.sectionTitle}>Images</h2>
              {imageFields.map(f => {
                const src = slide.images?.[f.key];
                const pos = { x: 50, y: 50, zoom: 1, ...(slide.imagePos?.[f.key] || {}) };
                const croppable = src && f.fit !== 'contain';
                return (
                  <div key={`${active}-${f.key}`} className={s.imageBlock} data-fieldwrap={f.key}>
                    <div className={s.imageRow}>
                      {src ? <img className={s.thumb} src={src} alt="" /> : <span className={s.thumbEmpty} />}
                      <span className={s.imageLabel}>{f.label}</span>
                      <button type="button" className={s.miniBtn} onClick={() => pickImage(f.key)}>{src ? 'Replace' : 'Upload'}</button>
                      {src && <button type="button" className={s.miniBtn} onClick={() => removeImage(f.key)}>Remove</button>}
                    </div>
                    {croppable && (
                      <div className={s.cropRow}>
                        <label className={s.cropLabel} htmlFor={`zoom-${f.key}`}>Zoom</label>
                        <input id={`zoom-${f.key}`} type="range" className={s.range} min={1} max={4} step={0.05} value={pos.zoom} onChange={e => setImagePos(f.key, { ...pos, zoom: Number(e.target.value) })} />
                        <span className={s.cropVal}>{Math.round(pos.zoom * 100)}%</span>
                        <button type="button" className={s.miniBtn} onClick={() => setImagePos(f.key, { x: 50, y: 50, zoom: 1 })} disabled={pos.zoom === 1 && pos.x === 50 && pos.y === 50}>Reset</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <p className={s.hint}>Drag a photo in the preview to reposition it, scroll over it to zoom, or click it to replace it. Photos stay in your browser.</p>
            </section>
          )}

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Colours{isCarousel ? ' · all slides' : ''}</h2>
            <div className={s.palettes}>
              {PALETTES.map(p => (
                <button key={p.name} type="button" className={s.palette} title={p.name} aria-label={`${p.name} palette`} onClick={() => applyPalette(p)}>
                  <span style={{ background: p.bg1 }} /><span style={{ background: p.accentColor }} /><span style={{ background: p.textColor }} />
                </button>
              ))}
            </div>
            <div className={s.colorGrid}>
              {varKeys.map(k => <ColorField key={k} label={varLabel(k)} value={state.vars[k]} onChange={val => setVar(k, val)} />)}
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Fonts</h2>
            <div className={s.twoCol}>
              {['heading', 'body'].map(k => (
                <div key={k} className={s.field}>
                  <label className={s.label} htmlFor={`font-${k}`}>{k === 'heading' ? 'Heading' : 'Body'}</label>
                  <select id={`font-${k}`} className={s.select} value={state.fonts[k]} onChange={e => setState(p => ({ ...p, fonts: { ...p.fonts, [k]: e.target.value } }))}>
                    {FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Export</h2>
            <div className={s.seg} role="radiogroup" aria-label="Image format">
              {['png', 'jpeg'].map(f => (
                <button key={f} type="button" role="radio" aria-checked={format === f} className={`${s.segBtn} ${format === f ? s.segBtnActive : ''}`} onClick={() => setFormat(f)}>{f.toUpperCase()}</button>
              ))}
            </div>
            {isCarousel && (
              <button type="button" className={s.btn} onClick={downloadAllSizes} disabled={!!busy}>This slide in all sizes (ZIP)</button>
            )}
            <label className={s.check}>
              <input type="checkbox" checked={includeImages} onChange={e => setIncludeImages(e.target.checked)} />
              Include uploaded photos in the HTML and My Code fork
            </label>
            <p className={s.hint}>PNG keeps text sharpest. JPEG is smaller for photo-heavy posts. Every image is exported at full size ({z.w}×{z.h}).</p>
          </section>
        </aside>

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.toolbar}>
            <div className={s.meta}>
              <a className={s.metaCat} href={`/social-post-templates/category/${t.category}/`}>{cat?.label}</a>
              {isCarousel
                ? (
                  <span className={s.slideNav}>
                    <button type="button" onClick={() => selectSlide(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous slide">‹</button>
                    Slide {active + 1} of {state.slides.length} · {SLIDE_NAMES[slide.tpl]}
                    <button type="button" onClick={() => selectSlide(Math.min(state.slides.length - 1, active + 1))} disabled={active === state.slides.length - 1} aria-label="Next slide">›</button>
                  </span>
                )
                : <><span>v{t.version}</span><span>Updated {t.updated}</span></>}
              <span>{z.w}×{z.h}</span>
            </div>
            {(state.size === 'story' || state.size === 'portrait') && (
              <label className={s.check}>
                <input type="checkbox" checked={safe} onChange={e => setSafe(e.target.checked)} />
                {state.size === 'story' ? 'Story safe zones' : 'Grid crop guides'}
              </label>
            )}
          </div>
          <div ref={stageRef} className={s.stage}>
            <Preview template={st} state={design} maxW={box.w} maxH={box.h} editable onEdit={setField} onPickImage={pickImage} onReveal={revealField} onImagePos={setImagePos}>
              {safe && state.size === 'story' && (
                <div className={s.safe} aria-hidden="true">
                  <div className={s.safeBand} style={{ top: 0, height: scaleSafe(z.safeTop) }}><span>Profile & close buttons</span></div>
                  <div className={s.safeBand} style={{ bottom: 0, height: scaleSafe(z.safeBottom) }}><span>Reply bar & stickers</span></div>
                </div>
              )}
              {safe && state.size === 'portrait' && (
                <div className={s.safe} aria-hidden="true">
                  <div className={s.cropBox} style={{ left: `${((1080 - 1012.5) / 2 / 1080) * 100}%`, right: `${((1080 - 1012.5) / 2 / 1080) * 100}%`, top: 0, bottom: 0 }}><span>3:4 grid</span></div>
                  <div className={`${s.cropBox} ${s.cropSquare}`} style={{ left: 0, right: 0, top: `${(135 / 1350) * 100}%`, bottom: `${(135 / 1350) * 100}%` }}><span>1:1 grid</span></div>
                </div>
              )}
            </Preview>
          </div>
          <p className={s.stageHint}>Click any text to edit it · drag a photo to reposition it, scroll to zoom, click to replace</p>
        </div>
      </div>
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}

/* Applies a brand kit: brand colour (and optionally background/text), fonts, the handle
   field and logo slots, across every slide */
function withKit(p, kit) {
  const vars = { ...p.vars };
  if ('accent' in vars && kit.primary) vars.accent = kit.primary;
  if (kit.applyAllColors) {
    if ('bg' in vars && kit.bg) vars.bg = kit.bg;
    if ('text' in vars && kit.text) vars.text = kit.text;
  }
  const fonts = { heading: kit.headingFont || p.fonts.heading, body: kit.bodyFont || p.fonts.body };
  const slides = p.slides.map(sl => {
    const tt = templateById(sl.tpl);
    const fields = { ...sl.fields };
    if ('handle' in fields && kit.handle) fields.handle = kit.handle;
    const logoField = tt?.fields.find(f => f.type === 'image' && f.fit === 'contain');
    if (logoField && kit.logo) {
      return { ...sl, fields, images: { ...sl.images, [logoField.key]: kit.logo }, imageDims: { ...sl.imageDims, [logoField.key]: kit.logoDims || null } };
    }
    return { ...sl, fields };
  });
  return { ...p, vars, fonts, slides };
}
