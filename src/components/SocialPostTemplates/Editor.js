'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { BrandKitPanel, loadKit, kitIsSet } from '@/components/BrandKit';
import { revealInPanel } from '@/lib/reveal-in-panel';
import { SIZES, sizeById, templateById } from './templates/index.js';
import { PALETTES, parseHex } from '../OgImageGenerator/engine';
import FontPicker from '@/components/FontPicker';
import { ExportMenu, ForkButton, HistoryButtons } from '@/components/ToolbarActions';
import Preview from './Preview';
import { renderImage, standaloneHtml, snippetParts } from './render';
import { dbPut } from '@/lib/uiSnippetsDb';
import { jpegsToPdf } from '@/lib/images-to-pdf';
import Mockup, { MOCKUPS } from './Mockup';
import BulkCreate from './BulkCreate';
import { runChecks } from './quality-checks';
import { listDesigns, getDesign, saveDesign, deleteDesign, duplicateDesign, thumbFrom, onDesignsChange } from './designs';
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
    return { size: t.defaultSize || 'portrait', vars, fonts: { ...t.fonts }, slides, active: Math.max(0, slides.findIndex(x => x.tpl === t.id)), caption: '' };
  }
  return { size: t.defaultSize || 'portrait', vars, fonts: { ...t.fonts }, slides: [newSlide(t.id)], active: 0, caption: '' };
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
    caption: typeof saved.caption === 'string' ? saved.caption : '',
  };
}

/* Caption limits shown under the caption box */
const CAPTION_LIMITS = [['Instagram', 2200], ['X', 280], ['LinkedIn', 3000], ['Facebook', 63206]];

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
  const [busy, setBusy] = useState('');
  const [toast, setToast] = useState('');
  const [includeImages, setIncludeImages] = useState(true);
  const [box, setBox] = useState({ w: 600, h: 600 });
  const [mockup, setMockupRaw] = useState('design');
  const [checks, setChecks] = useState([]);
  const [checksOpen, setChecksOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [currentDesign, setCurrentDesign] = useState(null); // { id, name } when editing a saved design
  const [naming, setNaming] = useState(null); // draft name while saving
  const [renaming, setRenaming] = useState(null); // { id, name }
  const stageRef = useRef(null);
  const fileRef = useRef(null);
  const pickKey = useRef(null);

  const flash = useCallback(msg => { setToast(msg); setTimeout(() => setToast(''), 2600); }, []);
  const z = sizeById(state.size);

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
  const onLayout = useCallback(root => {
    // Measured after layout settles; only stored when the result changes
    requestAnimationFrame(() => {
      const next = runChecks(root, { size: sizeById(design.size), template: st, fields: design.fields, imageDims: design.imageDims, imagePos: design.imagePos });
      setChecks(prev => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    });
  }, [design, st]);

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
    // /social-post-templates/<id>/?design=<designId> opens a saved design (My designs)
    const wanted = new URLSearchParams(window.location.search).get('design');
    if (wanted) {
      getDesign(wanted).then(d => {
        if (d && d.tpl === t.id) {
          hist.current.skip = true;
          setState(restore(t, d.state));
          setCurrentDesign({ id: d.id, name: d.name });
        }
      }).catch(() => {});
      window.history.replaceState(null, '', window.location.pathname);
    }
    try { const mv = localStorage.getItem('wdp-spt-mockup'); if (MOCKUPS.some(x => x.id === mv)) setMockupRaw(mv); } catch { /* blocked */ }
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps
  const setMockup = v => { setMockupRaw(v); try { localStorage.setItem('wdp-spt-mockup', v); } catch { /* blocked */ } };

  /* My designs: the list, kept fresh across tabs of this page */
  useEffect(() => {
    let live = true;
    const load = () => listDesigns().then(list => { if (live) setDesigns(list); });
    load();
    const off = onDesignsChange(load);
    return () => { live = false; off(); };
  }, []);
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
  // format: 'png' (sharpest text) or 'jpeg' (smaller for photo-heavy posts), picked in the Export menu
  const download = async (format = 'png') => {
    setBusy('download');
    try {
      const blob = await renderImage(st, design, { format, quality: 0.92 });
      saveBlob(blob, `${baseName}.${extOf(blob)}`);
      flash(`Downloaded ${z.w}×${z.h} ${extOf(blob).toUpperCase()} · ${fmtBytes(blob.size)}`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const downloadAllSizes = async (format = 'png') => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      for (const size of SIZES) {
        const blob = await renderImage(st, { ...design, size: size.id }, { format, quality: 0.92 });
        zip.file(`${t.id}-${size.id}-${size.w}x${size.h}.${extOf(blob)}`, blob);
      }
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${t.id}-all-sizes-${format === 'jpeg' ? 'jpg' : 'png'}.zip`);
      flash(`Downloaded ${SIZES.length} sizes as a ZIP`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const downloadAllSlides = async (format = 'png') => {
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

  /* Carousel (or a single post) as a PDF: LinkedIn document posts are uploaded as PDFs */
  const downloadPdf = async () => {
    setBusy('pdf');
    try {
      const count = isCarousel ? state.slides.length : 1;
      const pages = [];
      for (let i = 0; i < count; i++) {
        const tt = isCarousel ? templateById(state.slides[i].tpl) : st;
        const blob = await renderImage(tt, isCarousel ? designFor(i) : design, { format: 'jpeg', quality: 0.92 });
        pages.push({ bytes: new Uint8Array(await blob.arrayBuffer()), w: z.w, h: z.h });
      }
      const pdf = jpegsToPdf(pages, { title: isCarousel ? (state.slides[0].fields.title || 'Carousel').replace(/\*/g, '') : t.name });
      saveBlob(pdf, isCarousel ? `carousel-${count}-slides-${z.w}x${z.h}.pdf` : `${baseName}.pdf`);
      flash(`Downloaded a ${count}-page PDF · ${fmtBytes(pdf.size)}${isCarousel ? '. Upload it to LinkedIn as a document post' : ''}`);
    } catch (err) { flash(`PDF export failed: ${err.message}`); }
    setBusy('');
  };

  /* My designs */
  const myDesigns = designs;
  const designThumb = async () => {
    try { return await thumbFrom(await renderImage(templateById(state.slides[0].tpl) || st, designFor(0), { format: 'jpeg', quality: 0.8 })); }
    catch { return null; }
  };
  const saveNewDesign = async name => {
    setBusy('save');
    try {
      const rec = await saveDesign({ name: name.trim() || t.name, tpl: t.id, state, thumb: await designThumb() });
      setCurrentDesign({ id: rec.id, name: rec.name });
      flash(`Saved “${rec.name}” to My designs`);
    } catch (err) { flash(`Couldn't save the design: ${err.message}`); }
    setNaming(null);
    setBusy('');
  };
  const updateCurrentDesign = async () => {
    if (!currentDesign) return;
    setBusy('save');
    try {
      const old = await getDesign(currentDesign.id);
      await saveDesign({ ...(old || {}), id: currentDesign.id, name: currentDesign.name, tpl: t.id, state, thumb: await designThumb() });
      flash(`Updated “${currentDesign.name}”`);
    } catch (err) { flash(`Couldn't save the design: ${err.message}`); }
    setBusy('');
  };
  const openDesign = d => {
    if (d.tpl !== t.id) { window.location.href = `/social-post-templates/${d.tpl}/?design=${encodeURIComponent(d.id)}`; return; }
    setState(restore(t, d.state));
    setCurrentDesign({ id: d.id, name: d.name });
    flash(`Opened “${d.name}”`);
  };
  const duplicate = async d => {
    const copy = await duplicateDesign(d.id);
    if (copy) flash(`Duplicated as “${copy.name}”`);
  };
  const removeDesign = async d => {
    if (!window.confirm(`Delete “${d.name}” from My designs? This can't be undone.`)) return;
    await deleteDesign(d.id);
    if (currentDesign?.id === d.id) setCurrentDesign(null);
  };
  const renameDesign = async (id, name) => {
    const d = await getDesign(id);
    if (d && name.trim()) {
      await saveDesign({ ...d, name: name.trim() });
      if (currentDesign?.id === id) setCurrentDesign({ id, name: name.trim() });
    }
    setRenaming(null);
  };
  const copyCaption = async () => {
    try { await navigator.clipboard.writeText(state.caption || ''); flash('Caption copied'); }
    catch { flash('Copy blocked by the browser'); }
  };

  /* Profile shown in the platform mock-ups: from the brand kit when it's set */
  const kit = typeof window !== 'undefined' ? loadKit() : null;
  const profile = {
    name: kit?.name || 'Your Brand',
    handle: (kit?.handle || slide.fields.handle || '@yourbrand').replace(/^@?/, '@'),
    logo: kit?.logo || null,
    initial: (kit?.name || kit?.handle || 'Y').replace(/^@/, '').trim()[0]?.toUpperCase() || 'Y',
  };
  const bad = checks.filter(c => c.level === 'bad').length;

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
          {/* Tool name stays pinned at the top of the panel; everything below scrolls */}
          <div className={s.toolBrandBar}>
            <a href="/social-post-templates/" className={s.toolBrand} title="All social post templates">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/social-post-templates.svg" alt="" width={26} height={26} />
              <span>Social Post Templates</span>
            </a>
          </div>
          {/* Only this part scrolls, so the scrollbar starts below the pinned tool name */}
          <div className={s.controlsScroll}>
          <BrandKitPanel onApply={applyKit} onSaveFrom={kitFromDesign} onToast={flash} />

          <section className={s.section}>
            <h2 className={s.sectionTitle}>My designs <span className={s.sectionCount}>{myDesigns.length}</span></h2>
            {currentDesign && (
              <p className={s.designNow}>Editing <b>{currentDesign.name}</b></p>
            )}
            {naming !== null
              ? (
                <form className={s.designName} onSubmit={e => { e.preventDefault(); saveNewDesign(naming); }}>
                  <input className={s.input} value={naming} onChange={e => setNaming(e.target.value)} placeholder="Design name" aria-label="Design name" autoFocus maxLength={60} />
                  <button type="submit" className={s.miniBtn} disabled={busy === 'save'}>{busy === 'save' ? 'Saving…' : 'Save'}</button>
                  <button type="button" className={s.miniBtn} onClick={() => setNaming(null)}>Cancel</button>
                </form>
              )
              : (
                <div className={s.miniRow}>
                  {currentDesign && <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={updateCurrentDesign} disabled={!!busy}>Save changes</button>}
                  <button type="button" className={currentDesign ? s.miniBtn : `${s.miniBtn} ${s.miniBtnAccent}`} onClick={() => setNaming(currentDesign ? `${currentDesign.name} (copy)` : `${isCarousel ? 'Carousel' : t.name} ${myDesigns.filter(d => d.tpl === t.id).length + 1}`)} disabled={!!busy}>
                    {currentDesign ? 'Save as new' : '+ Save this design'}
                  </button>
                  {currentDesign && <button type="button" className={s.miniBtn} onClick={() => setCurrentDesign(null)} title="Keep editing without linking to the saved design">Detach</button>}
                </div>
              )}
            {myDesigns.length > 0 && (
              <ul className={s.designList}>
                {myDesigns.slice(0, 30).map(d => (
                  <li key={d.id} className={`${s.designItem} ${currentDesign?.id === d.id ? s.designItemOn : ''}`}>
                    <button type="button" className={s.designOpen} onClick={() => openDesign(d)} title={d.tpl === t.id ? 'Open this design' : 'Open in its template'}>
                      {d.thumb
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={d.thumb} alt="" />
                        : <span className={s.designThumbEmpty} />}
                    </button>
                    <span className={s.designMeta}>
                      {renaming?.id === d.id
                        ? (
                          <form onSubmit={e => { e.preventDefault(); renameDesign(d.id, renaming.name); }}>
                            <input className={s.designRename} value={renaming.name} onChange={e => setRenaming({ id: d.id, name: e.target.value })} onBlur={() => renameDesign(d.id, renaming.name)} autoFocus aria-label="New name" maxLength={60} />
                          </form>
                        )
                        : <b title={d.name}>{d.name}</b>}
                      <small>{templateById(d.tpl)?.name || d.tpl} · {new Date(d.updated).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</small>
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
            <p className={s.hint}>Designs are saved in this browser, photos included. Open one to keep editing, or duplicate it to make a variation.</p>
          </section>

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

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Post caption</h2>
            <textarea className={s.textarea} rows={3} value={state.caption || ''} onChange={e => setState(p => ({ ...p, caption: e.target.value }))} placeholder="Write the caption you'll post with this image. It shows in the Instagram, X and LinkedIn mock-ups." aria-label="Post caption" />
            <div className={s.captionMeta}>
              {CAPTION_LIMITS.map(([name, max]) => {
                const n = (state.caption || '').length;
                return <span key={name} className={n > max ? s.captionOver : ''}>{name} {n.toLocaleString()}/{max.toLocaleString()}</span>;
              })}
              <button type="button" className={s.miniBtn} onClick={copyCaption} disabled={!state.caption}>Copy</button>
            </div>
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
                  <FontPicker id={`font-${k}`} label={k === 'heading' ? 'Heading font' : 'Body font'} value={state.fonts[k]} onChange={fid => setState(p => ({ ...p, fonts: { ...p.fonts, [k]: fid } }))} />
                </div>
              ))}
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Export</h2>
            <label className={s.check}>
              <input type="checkbox" checked={includeImages} onChange={e => setIncludeImages(e.target.checked)} />
              Include uploaded photos in the HTML and My Code fork
            </label>
            <p className={s.hint}>Download PNG or JPEG from Export ▾ above the preview. PNG keeps text sharpest; JPEG is smaller for photo-heavy posts. Every image is exported at full size ({z.w}×{z.h}).</p>
          </section>
          </div>
        </aside>

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.toolbar}>
            <div className={s.meta}>
              {/* The page's H1: template name and version lead the preview toolbar */}
              <h1 className={s.metaName}>{isCarousel ? 'Carousel Builder' : t.name}</h1>
              <span className={s.version}>v{t.version}</span>
              {isCarousel
                ? (
                  <span className={s.slideNav}>
                    <button type="button" onClick={() => selectSlide(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous slide">‹</button>
                    Slide {active + 1} of {state.slides.length} · {SLIDE_NAMES[slide.tpl]}
                    <button type="button" onClick={() => selectSlide(Math.min(state.slides.length - 1, active + 1))} disabled={active === state.slides.length - 1} aria-label="Next slide">›</button>
                  </span>
                )
                : null}
              <span>{z.w}×{z.h}</span>
              <span className={s.toolbarSep} aria-hidden="true" />
              <HistoryButtons onUndo={undo} onRedo={redo} onReset={() => setState(editorDefault(t))} canUndo={canUndo} canRedo={canRedo} />
            </div>
            <div className={s.toolbarRight}>
              {(state.size === 'story' || state.size === 'portrait') && (
                <label className={s.check}>
                  <input type="checkbox" checked={safe} onChange={e => setSafe(e.target.checked)} />
                  {state.size === 'story' ? 'Story safe zones' : 'Grid crop guides'}
                </label>
              )}
              <ForkButton onClick={forkToMyCode} busy={busy === 'fork'} disabled={!!busy} title="Save this design as an editable HTML/CSS snippet in My Code (opens in a new tab)" />
              <ExportMenu
                head={isCarousel ? 'Export this carousel as…' : 'Export this post as…'}
                options={[
                  { icon: 'image', label: isCarousel ? `Slide ${active + 1} as PNG` : 'Download PNG', sub: `${z.w}×${z.h} · sharpest text`, onClick: () => download('png'), disabled: !!busy },
                  { icon: 'image', label: isCarousel ? `Slide ${active + 1} as JPG` : 'Download JPG', sub: `${z.w}×${z.h} · smaller file for photos`, onClick: () => download('jpeg'), disabled: !!busy },
                  ...(isCarousel
                    ? [
                      { icon: 'zip', label: `All ${state.slides.length} slides · PNG (ZIP)`, sub: 'Every slide, numbered in posting order', onClick: () => downloadAllSlides('png'), disabled: !!busy },
                      { icon: 'zip', label: `All ${state.slides.length} slides · JPG (ZIP)`, sub: 'Every slide, numbered in posting order', onClick: () => downloadAllSlides('jpeg'), disabled: !!busy },
                      { icon: 'zip', label: 'This slide in all sizes (ZIP)', sub: SIZES.map(x => `${x.w}×${x.h}`).join(' · '), onClick: () => downloadAllSizes('png'), disabled: !!busy },
                    ]
                    : [
                      { icon: 'zip', label: 'All sizes · PNG (ZIP)', sub: SIZES.map(x => `${x.w}×${x.h}`).join(' · '), onClick: () => downloadAllSizes('png'), disabled: !!busy },
                      { icon: 'zip', label: 'All sizes · JPG (ZIP)', sub: SIZES.map(x => `${x.w}×${x.h}`).join(' · '), onClick: () => downloadAllSizes('jpeg'), disabled: !!busy },
                    ]),
                  isCarousel
                    ? { icon: 'file', label: busy === 'pdf' ? 'Making PDF…' : `Carousel as PDF (${state.slides.length} pages)`, sub: 'Upload to LinkedIn as a document post', onClick: downloadPdf, disabled: !!busy }
                    : { icon: 'file', label: busy === 'pdf' ? 'Making PDF…' : 'Download PDF', sub: `${z.w}×${z.h}, one page`, onClick: downloadPdf, disabled: !!busy },
                  ...(isCarousel ? [] : [{ icon: 'text', label: 'Bulk create from CSV…', sub: 'One post per spreadsheet row, as a ZIP', onClick: () => setBulkOpen(true), disabled: !!busy }]),
                  { icon: 'html', label: 'Copy HTML', sub: 'The design as HTML and CSS', onClick: copyHtml },
                  { icon: 'file', label: 'Download .html', sub: 'A single self-contained HTML file', onClick: downloadHtml },
                ]}
              />
            </div>
          </div>
          <div className={s.viewBar}>
            <div className={s.viewSeg} role="radiogroup" aria-label="Preview as">
              {MOCKUPS.map(v => (
                <button key={v.id} type="button" role="radio" aria-checked={mockup === v.id} className={mockup === v.id ? s.viewSegOn : ''} onClick={() => setMockup(v.id)}>{v.label}</button>
              ))}
            </div>
            <button
              type="button"
              className={`${s.checksChip} ${bad ? s.checksBad : checks.length ? s.checksWarn : s.checksGood}`}
              onClick={() => setChecksOpen(o => !o)}
              aria-expanded={checksOpen}
              disabled={!checks.length}
              title="Quality checks: contrast, text size, safe zones, fit and photo resolution"
            >
              {checks.length ? `⚠ ${checks.length} check${checks.length > 1 ? 's' : ''} to review` : '✓ Quality checks passed'}
            </button>
          </div>
          {checksOpen && checks.length > 0 && (
            <ul className={s.checksList}>
              {checks.map(c => (
                <li key={`${c.key}|${c.text}`} className={c.level === 'bad' ? s.checkBad : s.checkWarn}>
                  {c.key ? <button type="button" onClick={() => revealField(c.key)}>{c.text}</button> : c.text}
                </li>
              ))}
            </ul>
          )}
          <div ref={stageRef} className={s.stage}>
            <Mockup
              mode={mockup}
              box={box}
              size={z}
              profile={profile}
              caption={state.caption || ''}
              renderPost={(mw, mh) => (
            <Preview template={st} state={design} maxW={mw} maxH={mh} editable onEdit={setField} onPickImage={pickImage} onReveal={revealField} onImagePos={setImagePos} onLayout={onLayout}>
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
              )}
            />
          </div>
          <p className={s.stageHint}>Click any text to edit it · drag a photo to reposition it, scroll to zoom, click to replace</p>
        </div>
      </div>
      {bulkOpen && <BulkCreate template={st} design={design} size={z} onClose={() => setBulkOpen(false)} flash={flash} />}
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
