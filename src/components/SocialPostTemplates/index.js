'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { LoadMore } from '@/components/UiSnippetsGallery';
import { TEMPLATES, TEMPLATE_CATEGORIES, SIZES, sizeById, categoryById, templateById } from './templates/index.js';
import { FONTS, PALETTES, parseHex } from '../OgImageGenerator/engine';
import Preview from './Preview';
import { defaultState, renderImage, standaloneHtml, snippetParts } from './render';
import { dbPut } from '@/lib/uiSnippetsDb';

const LS_PREFIX = 'wdp-spt-v1:';
const GALLERY_PAGE = 10; // cards per "Load more", same rhythm as the UI snippets gallery
const fmtBytes = n => (n >= 1048576 ? `${(n / 1048576).toFixed(2)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const extOf = blob => (blob.type === 'image/jpeg' ? 'jpg' : blob.type === 'image/webp' ? 'webp' : 'png');

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Uploads are downscaled and kept as data URLs (they must be embeddable in the export) */
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
      resolve(c.toDataURL(mime, 0.86));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
    img.src = url;
  });
}

/* ── Gallery ─────────────────────────────────────────────────────────────────── */
export function TemplateGallery({ compact = false, excludeId = null, limit = null, previews = [], initialCategory = 'all', hideControls = false, chips = true }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState('');
  const [shownCount, setShownCount] = useState(GALLERY_PAGE);
  // A new search or category starts again from the first page
  useEffect(() => { setShownCount(GALLERY_PAGE); }, [cat, q]);
  // /social-post-templates/#events opens with that category selected
  useEffect(() => {
    const pick = () => { const h = window.location.hash.slice(1); if (categoryById(h)) setCat(h); };
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
  }, []);
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return TEMPLATES.filter(t => t.id !== excludeId)
      .filter(t => cat === 'all' || t.category === cat)
      .filter(t => !words.length || words.every(w => `${t.name} ${t.tags.join(' ')} ${categoryById(t.category)?.label}`.toLowerCase().includes(w)))
      .slice(0, limit || undefined);
  }, [cat, q, excludeId, limit]);
  // Compact strips (e.g. "More templates") show their fixed `limit`; the gallery pages by 10
  const shown = limit ? list : list.slice(0, shownCount);

  return (
    <div className={compact ? s.galleryCompact : s.gallery} data-spt-gallery>
      {!compact && !hideControls && (
        <div className={s.galleryControls}>
          <input className={s.search} value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${TEMPLATES.length} templates…`} aria-label="Search templates" />
          {chips && <div className={s.chips}>
            <button type="button" className={`${s.chip} ${cat === 'all' ? s.chipActive : ''}`} onClick={() => setCat('all')}>All <span>{TEMPLATES.length}</span></button>
            {TEMPLATE_CATEGORIES.map(c => {
              const n = TEMPLATES.filter(t => t.category === c.id).length;
              return n ? (
                <button key={c.id} type="button" className={`${s.chip} ${cat === c.id ? s.chipActive : ''}`} onClick={() => setCat(c.id)}>
                  {c.label} <span>{n}</span>
                </button>
              ) : null;
            })}
          </div>}
        </div>
      )}
      {list.length === 0 ? (
        <div className={s.empty}>No templates match &ldquo;{q}&rdquo;.</div>
      ) : (
        <div className={s.grid}>
          {shown.map(t => <GalleryCard key={t.id} t={t} preview={previews.includes(t.id)} />)}
        </div>
      )}
      {!limit && <LoadMore shown={shown.length} total={list.length} onLoadMore={() => setShownCount(n => n + GALLERY_PAGE)} />}
    </div>
  );
}

/* Full gallery screen: image-tools nav, leaderboard ad, heading, then the grid */
export function TemplateGalleryPage({ previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <ImageToolsTopNav active="social-post-templates" />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Social Post Templates</h1>
        <p className={s.galleryLead}>
          {TEMPLATES.length} free HTML templates for Instagram, Facebook and X posts and Stories. Pick one, edit the text,
          photos, colours and fonts in your browser, then download every size as an image or copy the HTML.
        </p>
      </header>
      <CategoryLinks />
      <TemplateGallery previews={previews} chips={false} />
    </div>
  );
}

/* Crawlable links to every category landing page */
function CategoryLinks({ active = null }) {
  return (
    <nav className={s.catLinks} aria-label="Template categories">
      <a href="/social-post-templates/" className={`${s.catLink} ${!active ? s.catLinkActive : ''}`}>All templates</a>
      {TEMPLATE_CATEGORIES.map(c => (
        <a key={c.id} href={`/social-post-templates/category/${c.id}/`} className={`${s.catLink} ${active === c.id ? s.catLinkActive : ''}`}>
          {c.label} <span>{TEMPLATES.filter(t => t.category === c.id).length}</span>
        </a>
      ))}
    </nav>
  );
}

/* Category landing page: same shell as the gallery, filtered to one category */
export function TemplateCategoryPage({ category, h1, lead, previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <ImageToolsTopNav active="social-post-templates" />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <a href="/social-post-templates/" className={s.back}>← All social post templates</a>
        <h1 className={s.galleryH1}>{h1}</h1>
        <p className={s.galleryLead}>{lead}</p>
      </header>
      <CategoryLinks active={category} />
      <TemplateGallery previews={previews} initialCategory={category} hideControls />
    </div>
  );
}

function GalleryCard({ t, preview }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [visible, setVisible] = useState(false);
  const state = useMemo(() => ({ ...defaultState(t), size: 'portrait' }), [t]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    // Only mount the live preview (and load its fonts) once the card scrolls near view
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  const cat = categoryById(t.category);
  return (
    <a className={s.card} href={`/social-post-templates/${t.id}/`}>
      <div ref={ref} className={s.cardPreview}>
        {preview
          // Captured screenshot when available: much lighter than a live preview
          // eslint-disable-next-line @next/next/no-img-element
          ? <img className={s.cardImg} src={`/images/social-post-templates/previews/${t.id}.png`} alt={`${t.name} template preview`} loading="lazy" />
          : visible && w > 0 && <Preview template={t} state={state} maxW={w} />}
      </div>
      <div className={s.cardBody}>
        <span className={s.cardCat}>{cat?.label}</span>
        <h3 className={s.cardTitle}>{t.name}</h3>
        <span className={s.cardMeta}>v{t.version} · {SIZES.length} sizes</span>
      </div>
    </a>
  );
}

/* ── Editor ──────────────────────────────────────────────────────────────────── */
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

export function TemplateEditor({ id }) {
  const t = templateById(id);
  const [state, setState] = useState(() => defaultState(t));
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

  /* Restore / autosave this template's edits */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PREFIX + t.id) || 'null');
      if (saved) {
        const d = defaultState(t);
        setState({
          size: SIZES.some(x => x.id === saved.size) ? saved.size : d.size,
          fields: { ...d.fields, ...Object.fromEntries(Object.entries(saved.fields || {}).filter(([k]) => k in d.fields)) },
          images: Object.fromEntries(Object.entries(saved.images || {}).filter(([k]) => t.fields.some(f => f.key === k && f.type === 'image'))),
          vars: { ...d.vars, ...Object.fromEntries(Object.entries(saved.vars || {}).filter(([k]) => k in d.vars)) },
          fonts: { ...d.fonts, ...(saved.fonts || {}) },
        });
      }
    } catch { /* storage blocked */ }
    hist.current.skip = true; // the restored design is the starting point, not an undo step
    setHydrated(true);
  }, [t]);
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => {
      try { localStorage.setItem(LS_PREFIX + t.id, JSON.stringify(state)); }
      catch { try { localStorage.setItem(LS_PREFIX + t.id, JSON.stringify({ ...state, images: {} })); } catch { /* full */ } }
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
    // An edit still settling counts as the newest step
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
      // Leave native text undo alone in form fields and while editing text in the preview
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

  const setField = useCallback((key, val) => setState(p => ({ ...p, fields: { ...p.fields, [key]: val } })), []);
  const setVar = (key, val) => setState(p => ({ ...p, vars: { ...p.vars, [key]: val } }));
  const pickImage = useCallback(key => { pickKey.current = key; fileRef.current?.click(); }, []);
  const onFile = async e => {
    const file = e.target.files?.[0];
    e.target.value = '';
    const key = pickKey.current;
    if (!file || !key) return;
    const field = t.fields.find(f => f.key === key);
    try {
      const data = await readImage(file, field?.fit === 'contain' ? 600 : 1600, field?.fit === 'contain' ? 'image/png' : 'image/jpeg');
      setState(p => ({ ...p, images: { ...p.images, [key]: data } }));
    } catch (err) { flash(err.message); }
  };
  const applyPalette = p => setState(prev => {
    const map = { bg: p.bg1, bg2: p.bg2, text: p.textColor, accent: p.accentColor };
    const vars = { ...prev.vars };
    Object.entries(map).forEach(([k, v]) => { if (k in vars) vars[k] = v; });
    return { ...prev, vars };
  });

  const baseName = `${t.id}-${z.w}x${z.h}`;
  const download = async () => {
    setBusy('download');
    try {
      const blob = await renderImage(t, state, { format, quality: 0.92 });
      saveBlob(blob, `${baseName}.${extOf(blob)}`);
      flash(`Downloaded ${z.w}×${z.h} ${extOf(blob).toUpperCase()} · ${fmtBytes(blob.size)}`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const downloadAll = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      for (const size of SIZES) {
        const blob = await renderImage(t, { ...state, size: size.id }, { format, quality: 0.92 });
        zip.file(`${t.id}-${size.id}-${size.w}x${size.h}.${extOf(blob)}`, blob);
      }
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${t.id}-all-sizes.zip`);
      flash(`Downloaded ${SIZES.length} sizes as a ZIP`);
    } catch (err) { flash(`Export failed: ${err.message}`); }
    setBusy('');
  };
  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(standaloneHtml(t, state, { includeImages }));
      flash('HTML copied. Paste it into a .html file');
    } catch { flash('Copy blocked by the browser, so use Download .html instead'); }
  };
  // Saves the current design as a new My Code snippet and opens it in the snippet editor
  const forkToMyCode = async () => {
    setBusy('fork');
    try {
      const { html, css } = snippetParts(t, state, { includeImages });
      const now = new Date().toISOString();
      const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `spt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      await dbPut({
        id,
        name: `${t.name} (${z.label}, ${z.w}×${z.h})`,
        tags: ['social-post'],
        cdnUrls: [],
        html,
        css,
        js: '',
        createdAt: now,
        updatedAt: now,
      });
      flash('Forked to My Code. Opening it…');
      window.location.href = `/ui-snippets/mycode/?id=${id}`;
    } catch (err) {
      flash(`Couldn't save to My Code: ${err.message}`);
      setBusy('');
    }
  };
  const downloadHtml = () => {
    saveBlob(new Blob([standaloneHtml(t, state, { includeImages })], { type: 'text/html' }), `${baseName}.html`);
  };

  const textFields = t.fields.filter(f => f.type !== 'image');
  const imageFields = t.fields.filter(f => f.type === 'image');
  const scaleSafe = v => `${(v / z.h) * 100}%`;

  return (
    <div className={s.wrap}>
      <ImageToolsTopNav active="social-post-templates" />
      <input ref={fileRef} type="file" accept="image/*" className={s.fileInput} onChange={onFile} />
      <div className={s.body}>
        <aside className={s.controls}>
          <div className={s.panelHead}>
            <a href="/social-post-templates/" className={s.back}>← All templates</a>
            <div className={s.titleRow}>
              <h1 className={s.title}>{t.name}</h1>
              <span className={s.version}>v{t.version}</span>
            </div>
            <div className={s.headActions}>
              <button type="button" className={s.primaryBtn} onClick={download} disabled={!!busy}>
                {busy === 'download' ? 'Rendering…' : `↓ Download ${format.toUpperCase()}`}
              </button>
              <button type="button" className={s.btn} onClick={downloadAll} disabled={!!busy} title="Every size as a ZIP">
                {busy === 'zip' ? 'Zipping…' : 'All sizes (ZIP)'}
              </button>
            </div>
            <div className={s.miniRow}>
              <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={forkToMyCode} disabled={!!busy} title="Save this design as an editable HTML/CSS snippet in My Code">
                {busy === 'fork' ? 'Forking…' : 'Fork to My Code'}
              </button>
              <button type="button" className={s.miniBtn} onClick={copyHtml}>Copy HTML</button>
              <button type="button" className={s.miniBtn} onClick={downloadHtml}>Download .html</button>
              <button type="button" className={s.miniBtn} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">↶ Undo</button>
              <button type="button" className={s.miniBtn} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">↷ Redo</button>
              <button type="button" className={s.miniBtn} onClick={() => setState(defaultState(t))} title="Back to the template's original text and colours (undo brings your edits back)">Reset</button>
            </div>
          </div>

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
            <p className={s.hint}>{z.note}</p>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Text</h2>
            {textFields.map(f => (
              <div key={f.key} className={s.field}>
                <label className={s.label} htmlFor={`f-${f.key}`}>{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea id={`f-${f.key}`} className={s.textarea} rows={f.key === 'code' ? 5 : 2} value={state.fields[f.key] ?? ''} onChange={e => setField(f.key, e.target.value)} spellCheck={f.key !== 'code'} />
                  : <input id={`f-${f.key}`} className={s.input} value={state.fields[f.key] ?? ''} onChange={e => setField(f.key, e.target.value)} />}
              </div>
            ))}
            <p className={s.hint}>Tip: click text in the preview to edit it there. Wrap words in *asterisks* to colour them.</p>
          </section>

          {imageFields.length > 0 && (
            <section className={s.section}>
              <h2 className={s.sectionTitle}>Images</h2>
              {imageFields.map(f => (
                <div key={f.key} className={s.imageRow}>
                  {state.images[f.key] ? <img className={s.thumb} src={state.images[f.key]} alt="" /> : <span className={s.thumbEmpty} />}
                  <span className={s.imageLabel}>{f.label}</span>
                  <button type="button" className={s.miniBtn} onClick={() => pickImage(f.key)}>{state.images[f.key] ? 'Replace' : 'Upload'}</button>
                  {state.images[f.key] && (
                    <button type="button" className={s.miniBtn} onClick={() => setState(p => { const images = { ...p.images }; delete images[f.key]; return { ...p, images }; })}>Remove</button>
                  )}
                </div>
              ))}
              <p className={s.hint}>Photos stay in your browser. You can also click a photo area in the preview.</p>
            </section>
          )}

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Colours</h2>
            <div className={s.palettes}>
              {PALETTES.map(p => (
                <button key={p.name} type="button" className={s.palette} title={p.name} aria-label={`${p.name} palette`} onClick={() => applyPalette(p)}>
                  <span style={{ background: p.bg1 }} /><span style={{ background: p.accentColor }} /><span style={{ background: p.textColor }} />
                </button>
              ))}
            </div>
            <div className={s.colorGrid}>
              {t.vars.map(v => <ColorField key={v.key} label={v.label} value={state.vars[v.key]} onChange={val => setVar(v.key, val)} />)}
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
              <span>v{t.version}</span>
              <span>Updated {t.updated}</span>
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
            <Preview template={t} state={state} maxW={box.w} maxH={box.h} editable onEdit={setField} onPickImage={pickImage}>
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
          <p className={s.stageHint}>Click any text to edit it · click a photo area to upload</p>
        </div>
      </div>
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}
