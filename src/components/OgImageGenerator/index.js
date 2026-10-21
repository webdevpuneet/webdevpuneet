'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import {
  SIZES, FONTS, TEMPLATES, PALETTES, drawDesign, ensureFont, hasTemplate, contrast, parseHex, plainText,
} from './engine';
import { FORMATS, formatOf, sizeOf, slugify, canvasToBlob } from './utils';
import SocialPreviews from './SocialPreviews';
import BatchPanel from './BatchPanel';
import CodePanel from './CodePanel';

const LS_KEY = 'wdp-og-generator-v2';

const DEFAULTS = {
  template: 'clean',
  eyebrow: 'Tutorial',
  title: 'Build *beautiful* Open Graph images in seconds',
  description: 'Pick a template, add your title and brand colours, then download a 1200×630 image for every link you share.',
  site: 'webdevpuneet.com',
  author: '',
  authorMeta: '',
  headingFont: 'inter',
  bodyFont: 'inter',
  titleSize: 72,
  bg1: '#ffffff',
  bg2: '#e0e7ff',
  textColor: '#0f172a',
  accentColor: '#6366f1',
  bgStyle: 'solid',
  gradAngle: 135,
  pattern: 'none',
  overlay: 0.6,
  blur: 0,
  logoSize: 64,
  size: 'og',
  format: 'png',
  quality: 0.9,
  logoSrc: null,
  avatarSrc: null,
  bgSrc: null,
};

const formatBytes = n => (n >= 1048576 ? `${(n / 1048576).toFixed(2)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

/* Uploads are downscaled and stored as data URLs, so they survive autosave and undo */
function readImage(file, maxDim, mime) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth || 600, h = img.naturalHeight || 600;
      const k = Math.min(1, maxDim / Math.max(w, h));
      w = Math.round(w * k); h = Math.round(h * k);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL(mime, 0.86));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
    img.src = url;
  });
}

function useImage(src) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!src) { setImg(null); return undefined; }
    let live = true;
    const im = new Image();
    im.onload = () => { if (live) setImg(im); };
    im.onerror = () => { if (live) setImg(null); };
    im.src = src;
    return () => { live = false; };
  }, [src]);
  return img;
}

/* Fills title / description / site / author from a page's HTML (DOMParser runs no scripts) */
function parseMeta(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const m = sel => doc.querySelector(sel)?.getAttribute('content')?.trim() || '';
  const title = m('meta[property="og:title"]') || m('meta[name="twitter:title"]') || doc.querySelector('title')?.textContent.trim() || '';
  const description = m('meta[property="og:description"]') || m('meta[name="description"]') || m('meta[name="twitter:description"]');
  let site = m('meta[property="og:site_name"]');
  if (!site) {
    const u = m('meta[property="og:url"]') || doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    try { site = new URL(u).hostname.replace(/^www\./, ''); } catch { /* not a URL */ }
  }
  return { title, description, site, author: m('meta[name="author"]') };
}

/* ── Small controls ─────────────────────────────────────────────────────────── */
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
          // Only a complete hex value reaches the design; half-typed values stay in the box
          onChange={e => { const v = e.target.value.trim(); setDraft(v); if (parseHex(v)) onChange(v.startsWith('#') ? v : `#${v}`); }}
          onBlur={() => setDraft(value)}
        />
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, onChange, format = v => v }) {
  return (
    <div className={s.field}>
      <div className={s.sliderHead}>
        <label className={s.label}>{label}</label>
        <span className={s.sliderVal}>{format(value)}</span>
      </div>
      <input type="range" className={s.range} min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
    </div>
  );
}

function Seg({ options, value, onChange, label }) {
  return (
    <div className={s.seg} role="radiogroup" aria-label={label}>
      {options.map(o => (
        <button key={o.id} type="button" role="radio" aria-checked={value === o.id} className={`${s.segBtn} ${value === o.id ? s.segBtnActive : ''}`} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function UploadRow({ label, src, onFile, onClear }) {
  const ref = useRef(null);
  return (
    <div className={s.logoRow}>
      <input ref={ref} type="file" accept="image/*" className={s.fileInput} onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ''; }} />
      {src && <img className={s.uploadThumb} src={src} alt="" />}
      <button type="button" className={s.uploadBtn} onClick={() => ref.current?.click()}>{src ? 'Replace' : label}</button>
      {src && <button type="button" className={s.clearLogoBtn} onClick={onClear}>Remove</button>}
    </div>
  );
}

const TABS = [
  { id: 'design', label: 'Design' },
  { id: 'social', label: 'Social previews' },
  { id: 'batch',  label: 'Batch' },
  { id: 'code',   label: 'Code & meta tags' },
];

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function OgImageGenerator() {
  const canvasRef = useRef(null);
  const thumbRefs = useRef({});

  const [opts, setOpts] = useState(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [fontTick, setFontTick] = useState(0);
  const [info, setInfo] = useState({});
  const [fileSize, setFileSize] = useState(null);
  const [tab, setTab] = useState('design');
  const [safeZones, setSafeZones] = useState(false);
  const [toast, setToast] = useState('');
  const [importHtml, setImportHtml] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const set = useCallback((key, val) => setOpts(prev => ({ ...prev, [key]: val })), []);
  const patch = useCallback(obj => setOpts(prev => ({ ...prev, ...obj })), []);
  const flash = useCallback(msg => { setToast(msg); setTimeout(() => setToast(''), 2400); }, []);

  const size = sizeOf(opts.size);
  const logo = useImage(opts.logoSrc);
  const avatar = useImage(opts.avatarSrc);
  const bg = useImage(opts.bgSrc);
  const assets = useMemo(() => ({ logo, avatar, bg }), [logo, avatar, bg]);

  /* ── Restore the last design ─────────────────────────────────────────────── */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      if (saved && typeof saved === 'object') {
        const next = { ...DEFAULTS };
        Object.keys(DEFAULTS).forEach(k => { if (k in saved) next[k] = saved[k]; });
        if (!hasTemplate(next.template)) next.template = DEFAULTS.template;
        setOpts(next);
      }
    } catch { /* storage blocked */ }
    hist.current.skip = true; // the restored design is the starting point, not an undo step
    setHydrated(true);
  }, []);

  /* ── Autosave (images too; retried without them if storage is full) ──────── */
  useEffect(() => {
    if (!hydrated) return undefined;
    const t = setTimeout(() => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(opts)); }
      catch {
        try { localStorage.setItem(LS_KEY, JSON.stringify({ ...opts, bgSrc: null, logoSrc: null, avatarSrc: null })); } catch { /* blocked */ }
      }
    }, 500);
    return () => clearTimeout(t);
  }, [opts, hydrated]);

  /* ── Undo / redo: changes settle for 400ms before becoming a history step ── */
  const hist = useRef({ past: [], future: [], committed: DEFAULTS, skip: false, timer: null });
  const [, setHistTick] = useState(0);
  useEffect(() => {
    const h = hist.current;
    if (!hydrated) { h.committed = opts; return undefined; }
    if (h.skip) { h.skip = false; h.committed = opts; return undefined; }
    clearTimeout(h.timer);
    h.timer = setTimeout(() => {
      if (h.committed === opts) return;
      h.past.push(h.committed);
      if (h.past.length > 60) h.past.shift();
      h.future = [];
      h.committed = opts;
      setHistTick(t => t + 1);
    }, 400);
    return () => clearTimeout(h.timer);
  }, [opts, hydrated]);
  const flushHistory = () => {
    const h = hist.current;
    clearTimeout(h.timer);
    if (h.committed !== opts) { h.past.push(h.committed); h.future = []; h.committed = opts; }
  };
  const undo = useCallback(() => {
    flushHistory();
    const h = hist.current;
    if (!h.past.length) return;
    h.future.push(h.committed);
    const prev = h.past.pop();
    h.committed = prev;
    h.skip = true;
    setOpts(prev);
    setHistTick(t => t + 1);
  }, [opts]); // eslint-disable-line react-hooks/exhaustive-deps
  const redo = useCallback(() => {
    const h = hist.current;
    if (!h.future.length) return;
    h.past.push(h.committed);
    const next = h.future.pop();
    h.committed = next;
    h.skip = true;
    setOpts(next);
    setHistTick(t => t + 1);
  }, []);
  useEffect(() => {
    const onKey = e => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable) return; // native text undo there
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);
  const canUndo = hist.current.past.length > 0 || hist.current.committed !== opts;
  const canRedo = hist.current.future.length > 0;

  /* ── Web fonts: redraw once the chosen families are ready ────────────────── */
  useEffect(() => {
    let live = true;
    Promise.all([ensureFont(opts.headingFont), ensureFont(opts.bodyFont)]).then(() => { if (live) setFontTick(t => t + 1); });
    return () => { live = false; };
  }, [opts.headingFont, opts.bodyFont]);

  /* ── Main canvas ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const next = drawDesign(canvas.getContext('2d'), opts, assets, size.w, size.h);
    setInfo(prev => (prev.titleSize === next.titleSize && prev.truncated === next.truncated ? prev : next));
  }, [opts, assets, fontTick, size.w, size.h, tab]);

  /* ── Template thumbnails, drawn with the current content and colours ────── */
  useEffect(() => {
    const t = setTimeout(() => {
      TEMPLATES.forEach(tp => {
        const c = thumbRefs.current[tp.id];
        if (!c) return;
        const ctx = c.getContext('2d');
        const k = c.width / size.w;
        ctx.setTransform(k, 0, 0, k, 0, 0);
        drawDesign(ctx, { ...opts, template: tp.id }, assets, size.w, size.h);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });
    }, 220);
    return () => clearTimeout(t);
  }, [opts, assets, fontTick, size.w, size.h]);

  /* ── Export size estimate ────────────────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => {
      const c = canvasRef.current;
      if (!c) return;
      canvasToBlob(c, opts.format, opts.quality).then(b => setFileSize(b.size)).catch(() => setFileSize(null));
    }, 600);
    return () => clearTimeout(t);
  }, [opts, assets, fontTick, size.w, size.h]);

  /* ── Snapshot for the social previews tab ────────────────────────────────── */
  useEffect(() => {
    if (tab !== 'social') return undefined;
    const t = setTimeout(() => { if (canvasRef.current) setPreviewUrl(canvasRef.current.toDataURL('image/jpeg', 0.9)); }, 200);
    return () => clearTimeout(t);
  }, [tab, opts, assets, fontTick]);

  /* ── Actions ─────────────────────────────────────────────────────────────── */
  const fileName = `${slugify(opts.title) || 'og-image'}-${size.w}x${size.h}.${opts.format === 'jpeg' ? 'jpg' : opts.format}`;

  const download = useCallback(async () => {
    try {
      const blob = await canvasToBlob(canvasRef.current, opts.format, opts.quality);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Safari can't encode WebP and hands back a PNG; name the file by what it really is
      const realExt = blob.type === 'image/jpeg' ? 'jpg' : blob.type === 'image/webp' ? 'webp' : 'png';
      a.download = fileName.replace(/\.[a-z]+$/, `.${realExt}`);
      if (blob.type !== formatOf(opts.format).mime) flash(`This browser can't save ${formatOf(opts.format).label}, so it saved ${realExt.toUpperCase()}`);
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { flash('Download failed'); }
  }, [opts.format, opts.quality, fileName, flash]);

  const copyImage = useCallback(async () => {
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') throw new Error('unsupported');
      // The blob is passed as a promise so the write starts inside the click (Safari requires it)
      const blob = canvasToBlob(canvasRef.current, 'png');
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      flash('Image copied to clipboard');
    } catch {
      download();
      flash('Clipboard blocked by the browser, so the image was downloaded instead');
    }
  }, [download, flash]);

  const upload = useCallback(async (key, file, maxDim, mime) => {
    try { set(key, await readImage(file, maxDim, mime)); }
    catch (e) { flash(e.message); }
  }, [set, flash]);

  const shuffle = () => {
    const p = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    patch({ bg1: p.bg1, bg2: p.bg2, textColor: p.textColor, accentColor: p.accentColor, bgStyle: ['solid', 'gradient', 'mesh'][Math.floor(Math.random() * 3)] });
  };

  const runImport = () => {
    const m = parseMeta(importHtml);
    const found = Object.fromEntries(Object.entries(m).filter(([, v]) => v));
    if (!Object.keys(found).length) { flash('No title or meta tags found in that HTML'); return; }
    patch(found);
    setImportHtml('');
    flash(`Filled ${Object.keys(found).join(', ')}`);
  };

  /* ── Checks ──────────────────────────────────────────────────────────────── */
  const bgsForContrast = opts.template === 'card' ? [opts.bg1] : opts.bgStyle === 'solid' ? [opts.bg1] : [opts.bg1, opts.bg2];
  const ratio = Math.min(...bgsForContrast.map(b => contrast(opts.textColor, b)));
  const titleLen = plainText(opts.title).length;
  const warnings = [];
  if (ratio < 3) warnings.push({ level: 'bad', text: `Low contrast (${ratio.toFixed(1)}:1) between the text and background. It will be hard to read in feeds.` });
  else if (ratio < 4.5) warnings.push({ level: 'warn', text: `Contrast is ${ratio.toFixed(1)}:1. Fine for big titles, weak for the description. Aim for 4.5:1.` });
  if (info.truncated) warnings.push({ level: 'bad', text: 'Some text didn’t fit and was cut with “…”. Shorten the title or description.' });
  if (info.titleSize && info.titleSize < 44) warnings.push({ level: 'warn', text: `The title shrank to ${info.titleSize}px to fit. It may be hard to read in small previews.` });
  if (titleLen > 70) warnings.push({ level: 'warn', text: `The title is ${titleLen} characters. Under 60 reads best at feed size.` });
  if (opts.bgSrc && opts.overlay < 0.35) warnings.push({ level: 'warn', text: 'A light overlay on a photo often makes text hard to read. Try 50% or more.' });
  if (fileSize && fileSize > 5 * 1048576) warnings.push({ level: 'bad', text: `The file is ${formatBytes(fileSize)}. Facebook and X reject images over 5 MB, so switch to JPEG or WebP.` });

  const ratioClass = ratio >= 4.5 ? s.badgeGood : ratio >= 3 ? s.badgeWarn : s.badgeBad;
  const showSquareGuide = size.w !== size.h;

  return (
    <div className={s.wrap}>
      <ImageToolsTopNav active="og-image-generator" />

      <div className={s.body}>
        {/* ── Controls ── */}
        <aside className={s.controls}>
          <div className={s.panelHead}>
            <div className={s.logo}>
              <span className={s.logoIcon}>OG</span>
              OG Image Generator
            </div>
            <div className={s.headActions}>
              <button type="button" className={s.downloadBtn} onClick={download}>↓ Download {formatOf(opts.format).label}</button>
              <button type="button" className={s.actionBtn} onClick={copyImage}>Copy image</button>
            </div>
            <div className={s.miniActions}>
              <button type="button" className={s.miniBtn} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">↶ Undo</button>
              <button type="button" className={s.miniBtn} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">↷ Redo</button>
              <button type="button" className={s.miniBtn} onClick={shuffle} title="Random palette and background">⤨ Shuffle</button>
              <button type="button" className={s.miniBtn} onClick={() => setOpts({ ...DEFAULTS })} title="Start over (undo brings it back)">Reset</button>
            </div>
          </div>

          {/* Template */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Template <span className={s.sectionCount}>{TEMPLATES.length}</span></div>
            <div className={s.templateGrid}>
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`${s.templateBtn} ${opts.template === t.id ? s.templateBtnActive : ''}`}
                  onClick={() => set('template', t.id)}
                  aria-pressed={opts.template === t.id}
                >
                  <canvas
                    ref={el => { thumbRefs.current[t.id] = el; }}
                    width={240}
                    height={Math.round((240 * size.h) / size.w)}
                    className={s.thumb}
                  />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Content</div>
            <div className={s.field}>
              <label className={s.label} htmlFor="og-eyebrow">Label</label>
              <input id="og-eyebrow" className={s.input} value={opts.eyebrow} onChange={e => set('eyebrow', e.target.value)} placeholder="e.g. Tutorial · New · OCT 24" maxLength={40} />
            </div>
            <div className={s.field}>
              <div className={s.sliderHead}>
                <label className={s.label} htmlFor="og-title">Title</label>
                <span className={`${s.sliderVal} ${titleLen > 70 ? s.countOver : ''}`}>{titleLen}/70</span>
              </div>
              <textarea id="og-title" className={s.textarea} value={opts.title} onChange={e => set('title', e.target.value)} placeholder="Page title" rows={2} maxLength={160} />
              <span className={s.hint}>Wrap words in *asterisks* to colour them with the accent.</span>
            </div>
            <div className={s.field}>
              <label className={s.label} htmlFor="og-desc">Description</label>
              <textarea id="og-desc" className={s.textarea} value={opts.description} onChange={e => set('description', e.target.value)} placeholder="One supporting line" rows={2} maxLength={240} />
            </div>
            <div className={s.field}>
              <label className={s.label} htmlFor="og-site">Site name / URL</label>
              <input id="og-site" className={s.input} value={opts.site} onChange={e => set('site', e.target.value)} placeholder="webdevpuneet.com" maxLength={60} />
            </div>
            <div className={s.twoCol}>
              <div className={s.field}>
                <label className={s.label} htmlFor="og-author">Author</label>
                <input id="og-author" className={s.input} value={opts.author} onChange={e => set('author', e.target.value)} placeholder="Name (optional)" maxLength={40} />
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="og-meta">Author line</label>
                <input id="og-meta" className={s.input} value={opts.authorMeta} onChange={e => set('authorMeta', e.target.value)} placeholder="Oct 16 · 5 min read" maxLength={50} />
              </div>
            </div>
            <div className={s.field}>
              <label className={s.label}>Author photo</label>
              <UploadRow label="Upload photo" src={opts.avatarSrc} onFile={f => upload('avatarSrc', f, 320, 'image/png')} onClear={() => set('avatarSrc', null)} />
            </div>
            <details className={s.importBox}>
              <summary>Fill from a page&rsquo;s HTML</summary>
              <textarea className={s.textarea} rows={3} value={importHtml} onChange={e => setImportHtml(e.target.value)} placeholder="Paste the page's HTML source or its <head> tags" />
              <button type="button" className={s.uploadBtn} onClick={runImport} disabled={!importHtml.trim()}>Fill fields</button>
            </details>
          </div>

          {/* Typography */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Typography</div>
            <div className={s.twoCol}>
              <div className={s.field}>
                <label className={s.label} htmlFor="og-hfont">Heading font</label>
                <select id="og-hfont" className={s.select} value={opts.headingFont} onChange={e => set('headingFont', e.target.value)}>
                  {FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                </select>
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="og-bfont">Body font</label>
                <select id="og-bfont" className={s.select} value={opts.bodyFont} onChange={e => set('bodyFont', e.target.value)}>
                  {FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                </select>
              </div>
            </div>
            <Slider label="Title size (shrinks to fit)" value={opts.titleSize} min={48} max={110} step={2} onChange={v => set('titleSize', v)} format={v => `${v}px`} />
          </div>

          {/* Colours */}
          <div className={s.section}>
            <div className={s.sectionTitle}>
              Colours
              <span className={`${s.badge} ${ratioClass}`} title="WCAG contrast between the text and background">
                {ratio.toFixed(1)}:1 {ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'Large only' : 'Low'}
              </span>
            </div>
            <div className={s.palettes}>
              {PALETTES.map(p => (
                <button
                  key={p.name}
                  type="button"
                  className={s.palette}
                  title={p.name}
                  aria-label={`${p.name} palette`}
                  onClick={() => patch({ bg1: p.bg1, bg2: p.bg2, textColor: p.textColor, accentColor: p.accentColor })}
                >
                  <span style={{ background: p.bg1 }} /><span style={{ background: p.accentColor }} /><span style={{ background: p.textColor }} />
                </button>
              ))}
            </div>
            <Seg label="Background style" value={opts.bgStyle} onChange={v => set('bgStyle', v)} options={[{ id: 'solid', label: 'Solid' }, { id: 'gradient', label: 'Gradient' }, { id: 'mesh', label: 'Mesh' }]} />
            {opts.bgStyle === 'gradient' && (
              <Slider label="Gradient angle" value={opts.gradAngle} min={0} max={360} step={5} onChange={v => set('gradAngle', v)} format={v => `${v}°`} />
            )}
            <div className={s.colorRow}>
              <ColorField label="Background" value={opts.bg1} onChange={v => set('bg1', v)} />
              <ColorField label={opts.template === 'card' ? 'Outer colour' : 'Second colour'} value={opts.bg2} onChange={v => set('bg2', v)} />
            </div>
            <div className={s.colorRow}>
              <ColorField label="Text" value={opts.textColor} onChange={v => set('textColor', v)} />
              <ColorField label="Accent" value={opts.accentColor} onChange={v => set('accentColor', v)} />
            </div>
          </div>

          {/* Background extras */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Background</div>
            <div className={s.field}>
              <label className={s.label} htmlFor="og-pattern">Pattern</label>
              <select id="og-pattern" className={s.select} value={opts.pattern} onChange={e => set('pattern', e.target.value)}>
                <option value="none">None</option>
                <option value="dots">Dots</option>
                <option value="grid">Grid</option>
                <option value="lines">Diagonal lines</option>
                <option value="noise">Grain</option>
              </select>
            </div>
            <div className={s.field}>
              <label className={s.label}>Photo</label>
              <UploadRow label="Upload photo" src={opts.bgSrc} onFile={f => upload('bgSrc', f, 1600, 'image/jpeg')} onClear={() => set('bgSrc', null)} />
            </div>
            {opts.bgSrc && (
              <>
                <Slider label="Colour overlay" value={opts.overlay} min={0} max={0.95} step={0.05} onChange={v => set('overlay', v)} format={v => `${Math.round(v * 100)}%`} />
                <Slider label="Blur" value={opts.blur} min={0} max={24} step={1} onChange={v => set('blur', v)} format={v => `${v}px`} />
              </>
            )}
          </div>

          {/* Logo */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Logo</div>
            <UploadRow label="Upload logo" src={opts.logoSrc} onFile={f => upload('logoSrc', f, 600, 'image/png')} onClear={() => set('logoSrc', null)} />
            {opts.logoSrc && <Slider label="Logo size" value={opts.logoSize} min={32} max={160} step={4} onChange={v => set('logoSize', v)} format={v => `${v}px`} />}
          </div>

          {/* Export */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Export</div>
            <div className={s.field}>
              <label className={s.label} htmlFor="og-size">Size</label>
              <select id="og-size" className={s.select} value={opts.size} onChange={e => set('size', e.target.value)}>
                {SIZES.map(z => <option key={z.id} value={z.id}>{z.label}</option>)}
              </select>
              <span className={s.hint}>{size.note}</span>
            </div>
            <Seg label="File format" value={opts.format} onChange={v => set('format', v)} options={FORMATS.map(f => ({ id: f.id, label: f.label }))} />
            {opts.format !== 'png' && (
              <Slider label="Quality" value={opts.quality} min={0.5} max={1} step={0.02} onChange={v => set('quality', v)} format={v => `${Math.round(v * 100)}%`} />
            )}
            <div className={s.sizeInfo}>
              <span title={fileName}>{fileName}</span>
              <strong>{fileSize ? formatBytes(fileSize) : '…'}</strong>
            </div>
          </div>
        </aside>

        {/* ── Preview ── */}
        <div className={s.preview}>
          <PlaygroundTopAd />
          <div className={s.tabs} role="tablist">
            {TABS.map(t => (
              <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={`${s.tab} ${tab === t.id ? s.tabActive : ''}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          <div className={s.tabBody}>
            {/* The canvas stays mounted on every tab: it is the source for copy, download and previews */}
            <div className={tab === 'design' ? s.designPane : s.hiddenPane}>
              <div className={s.previewBar}>
                <span>{size.w} × {size.h} px · {formatOf(opts.format).label}{fileSize ? ` · ${formatBytes(fileSize)}` : ''}</span>
                <label className={s.toggle}>
                  <input type="checkbox" checked={safeZones} onChange={e => setSafeZones(e.target.checked)} />
                  Safe zones
                </label>
              </div>
              <div className={s.canvasWrap} style={{ aspectRatio: `${size.w} / ${size.h}`, maxWidth: size.w === size.h ? 560 : 860 }}>
                <canvas ref={canvasRef} width={size.w} height={size.h} className={s.canvas} />
                {safeZones && (
                  <div className={s.safe} aria-hidden="true">
                    <div className={s.safeMargin} style={{ inset: `${(80 / size.h) * 100}% ${(80 / size.w) * 100}%` }}><span>Keep text inside</span></div>
                    {showSquareGuide && <div className={s.safeSquare} style={{ width: `${(size.h / size.w) * 100}%` }}><span>Square crop (WhatsApp, small cards)</span></div>}
                    <div className={s.safeX}><span>X domain label</span></div>
                  </div>
                )}
              </div>
              {warnings.length > 0 ? (
                <ul className={s.warnings}>
                  {warnings.map(w => <li key={w.text} className={w.level === 'bad' ? s.warnBad : s.warnWarn}>{w.text}</li>)}
                </ul>
              ) : (
                <div className={s.allGood}>✓ Readable, fits, and under every platform&rsquo;s size limit.</div>
              )}
            </div>

            {tab === 'social' && <SocialPreviews src={previewUrl} title={plainText(opts.title)} description={opts.description} site={opts.site} accent={opts.accentColor} />}
            {tab === 'batch' && <BatchPanel opts={opts} assets={assets} size={size} onToast={flash} />}
            {tab === 'code' && <CodePanel opts={opts} size={size} fileName={fileName} onToast={flash} />}
          </div>
        </div>
      </div>

      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}
