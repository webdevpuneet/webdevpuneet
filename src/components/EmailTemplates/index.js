'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import e from './styles.module.css';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import { EMAIL_TEMPLATES, EMAIL_CATEGORIES, emailTemplateById, emailCategoryById, defaultEmailState, FONT_STACKS } from './templates/index.js';
import { LoadMore } from '@/components/UiSnippetsGallery';
import { scrollDuration } from '@/components/HomeTemplatesCarousel';
import { previewImages, forceDark } from './templates/meta.js';
import { PALETTES, parseHex, onColor } from '../OgImageGenerator/engine';
import { BrandKitPanel, loadKit, kitIsSet } from '@/components/BrandKit';
import { dbPut } from '@/lib/uiSnippetsDb';
import { openForkTab } from '@/lib/open-fork-tab';
import { putAsset, getAsset, deleteAsset, assetKeys } from './assetsDb';
import { revealInPanel } from '@/lib/reveal-in-panel';
import FontPicker from '@/components/FontPicker';
import { resolveFont } from '@/lib/fonts';

const LS_PREFIX = 'wdp-email-v1:';
const GMAIL_CLIP = 102 * 1024; // Gmail clips messages larger than ~102 KB
const fmtKB = n => `${(n / 1024).toFixed(1)} KB`;
const GALLERY_PAGE = 10; // cards per "Load more", same rhythm as the UI snippets gallery

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Uploaded email images: resized in the browser (GIFs kept as-is, so animation survives) */
function prepareUpload(file, { maxW, mime }) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const w0 = img.naturalWidth || maxW, h0 = img.naturalHeight || maxW;
      if (file.type === 'image/gif') { URL.revokeObjectURL(url); resolve({ blob: file, type: 'image/gif', w: w0, h: h0 }); return; }
      const k = Math.min(1, maxW / w0);
      const w = Math.round(w0 * k), h = Math.round(h0 * k);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      const type = file.type === 'image/png' || mime === 'image/png' ? 'image/png' : 'image/jpeg';
      if (type === 'image/jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); } // JPEG has no transparency
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      c.toBlob(b => (b ? resolve({ blob: b, type, w, h }) : reject(new Error('Could not process that image'))), type, 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
    img.src = url;
  });
}
const blobToDataUrl = blob => new Promise((resolve, reject) => {
  const fr = new FileReader();
  fr.onload = () => resolve(fr.result);
  fr.onerror = reject;
  fr.readAsDataURL(blob);
});
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp' };

/* Email preview in an iframe; grows to the email's height */
function EmailFrame({ html, width, scale = 1, interactive = true, onDoc }) {
  const ref = useRef(null);
  const [h, setH] = useState(900);
  const onDocRef = useRef(onDoc);
  onDocRef.current = onDoc;
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return undefined;
    let ro;
    // Every srcDoc change loads a new document, so re-measure and re-observe on each load
    const measure = () => {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      const fit = () => setH(Math.max(400, doc.documentElement.scrollHeight));
      fit();
      onDocRef.current?.(doc);
      ro?.disconnect();
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(fit);
        ro.observe(doc.documentElement);
      }
    };
    frame.addEventListener('load', measure);
    return () => { frame.removeEventListener('load', measure); ro?.disconnect(); };
  }, []);
  return (
    <div style={{ width: width * scale, height: h * scale, overflow: 'hidden', flex: 'none' }}>
      <iframe
        ref={ref}
        title="Email preview"
        srcDoc={html}
        style={{ width, height: h, border: 0, display: 'block', transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left', pointerEvents: interactive ? 'auto' : 'none', background: 'transparent' }}
      />
    </div>
  );
}

/* ── Gallery ─────────────────────────────────────────────────────────────────── */
function GalleryCard({ t, preview }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [origin, setOrigin] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setOrigin(window.location.origin);
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  const html = useMemo(() => (preview || !visible ? '' : previewImages(t.build(defaultEmailState(t)), origin)), [t, origin, preview, visible]);
  return (
    <a className={s.card} href={`/email-templates/${t.id}/`} onMouseEnter={ev => scrollDuration(ev.currentTarget)} onFocus={ev => scrollDuration(ev.currentTarget)}>
      <div ref={ref} className={e.cardPreview}>
        {preview
          // Captured screenshot when available: lighter than a live email preview
          // eslint-disable-next-line @next/next/no-img-element
          ? <img className={e.cardImg} src={`/images/email-templates/previews/${t.id}.png`} alt={`${t.name} preview`} loading="lazy" />
          : w > 0 && origin && html && <EmailFrame html={html} width={640} scale={w / 640} interactive={false} />}
      </div>
      <div className={s.cardBody}>
        <span className={s.cardCat}>{emailCategoryById(t.category)?.label}</span>
        <h3 className={s.cardTitle}>{t.name}</h3>
        <span className={s.cardMeta}>v{t.version} · Responsive · Dark mode</span>
      </div>
    </a>
  );
}

export function EmailTemplateGallery({ excludeId = null, limit = null, previews = [], initialCategory = 'all', hideControls = false, chips = true }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState('');
  const [shownCount, setShownCount] = useState(GALLERY_PAGE);
  // A new search or category starts again from the first page
  useEffect(() => { setShownCount(GALLERY_PAGE); }, [cat, q]);
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return EMAIL_TEMPLATES.filter(t => t.id !== excludeId)
      .filter(t => cat === 'all' || t.category === cat)
      .filter(t => !words.length || words.every(w => `${t.name} ${t.tags.join(' ')} ${emailCategoryById(t.category)?.label} ${t.description}`.toLowerCase().includes(w)))
      .slice(0, limit || undefined);
  }, [cat, q, excludeId, limit]);
  // Strips with a fixed `limit` show all of it; the gallery pages by 10
  const shown = limit ? list : list.slice(0, shownCount);

  return (
    <div className={s.gallery} data-spt-gallery>
      {!hideControls && (
        <div className={s.galleryControls}>
          <input className={s.search} value={q} onChange={ev => setQ(ev.target.value)} placeholder={`Search ${EMAIL_TEMPLATES.length} email templates…`} aria-label="Search email templates" />
          {chips && <div className={s.chips}>
            <button type="button" className={`${s.chip} ${cat === 'all' ? s.chipActive : ''}`} onClick={() => setCat('all')}>All <span>{EMAIL_TEMPLATES.length}</span></button>
            {EMAIL_CATEGORIES.map(c => {
              const n = EMAIL_TEMPLATES.filter(t => t.category === c.id).length;
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
        <div className={s.empty}>No email templates match &ldquo;{q}&rdquo;.</div>
      ) : (
        <div className={s.grid}>
          {shown.map(t => <GalleryCard key={t.id} t={t} preview={previews.includes(t.id)} />)}
        </div>
      )}
      {!limit && <LoadMore shown={shown.length} total={list.length} onLoadMore={() => setShownCount(n => n + GALLERY_PAGE)} />}
    </div>
  );
}

/* Crawlable links to every category landing page */
function EmailCategoryLinks({ active = null }) {
  return (
    <nav className={s.catLinks} aria-label="Email template categories">
      <a href="/email-templates/" className={`${s.catLink} ${!active ? s.catLinkActive : ''}`}>All templates <span>{EMAIL_TEMPLATES.length}</span></a>
      {EMAIL_CATEGORIES.map(c => {
        const n = EMAIL_TEMPLATES.filter(t => t.category === c.id).length;
        return n ? (
          <a key={c.id} href={`/email-templates/category/${c.id}/`} className={`${s.catLink} ${active === c.id ? s.catLinkActive : ''}`}>
            {c.label} <span>{n}</span>
          </a>
        ) : null;
      })}
    </nav>
  );
}

export function EmailGalleryPage({ previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <ImageToolsTopNav active="email-templates" />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Email Templates</h1>
        <p className={s.galleryLead}>
          {EMAIL_TEMPLATES.length} free responsive HTML email templates (welcome, verification, password reset, order confirmation, receipt,
          newsletter and sale emails) that work in Gmail, Outlook and Apple Mail, with dark mode built in. Edit them in your browser,
          then copy the HTML, download a ZIP or fork it into My Code.
        </p>
      </header>
      <EmailCategoryLinks />
      <EmailTemplateGallery previews={previews} chips={false} />
    </div>
  );
}

/* Category landing page: same shell as the gallery, filtered to one category */
export function EmailCategoryPage({ category, h1, lead, previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <ImageToolsTopNav active="email-templates" />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <a href="/email-templates/" className={s.back}>← All email templates</a>
        <h1 className={s.galleryH1}>{h1}</h1>
        <p className={s.galleryLead}>{lead}</p>
      </header>
      <EmailCategoryLinks active={category} />
      <EmailTemplateGallery previews={previews} initialCategory={category} hideControls />
    </div>
  );
}

/* Read-only live preview of a template's default design (About section on its page) */
export function EmailShot({ id }) {
  const t = emailTemplateById(id);
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(Math.min(640, el.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const html = useMemo(() => previewImages(t.build(defaultEmailState(t)), origin), [t, origin]);
  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {w > 0 && origin && <EmailFrame html={html} width={640} scale={w / 640} interactive={false} />}
    </div>
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

/* Any picker font id -> an email font id: the email stacks keep their ids, other Google
   fonts become 'g:' ids, and uploaded or system fonts fall back to Arial or Georgia */
function toEmailFont(fid) {
  if (FONT_STACKS.some(f => f.id === fid) || String(fid).startsWith('g:')) return fid;
  const f = resolveFont(fid);
  if (f.kind === 'builtin' && f.family) return `g:${f.family}|${f.weights.map(w => w / 100).join('')}|${f.fallback === 'serif' ? 'e' : f.fallback === 'monospace' ? 'm' : 's'}`;
  return f.fallback === 'serif' || fid === 'georgia' ? 'georgia' : 'system';
}

/* Brand kit -> email: brand colour (button text picked for contrast), name, hosted logo,
   website and fonts. Fonts emails can't use fall back to Arial or Georgia stacks. */
function withKit(prev, kit) {
  const fontFor = toEmailFont;
  const vars = { ...prev.vars, brand: kit.primary, btnText: onColor(kit.primary) };
  if (kit.applyAllColors && kit.text) vars.text = kit.text;
  const fields = { ...prev.fields };
  if (kit.name) fields.brandName = kit.name;
  if (kit.logoUrl) fields.logoUrl = kit.logoUrl;
  if (kit.website) fields.headerLink = kit.website;
  return { ...prev, vars, fields, fonts: { heading: fontFor(kit.headingFont), body: fontFor(kit.bodyFont) } };
}

export function EmailTemplateEditor({ id }) {
  const t = emailTemplateById(id);
  const [state, setState] = useState(() => defaultEmailState(t));
  const [hydrated, setHydrated] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [dark, setDark] = useState(false);
  const [view, setView] = useState('preview');
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState('');
  const [origin, setOrigin] = useState('');
  const [open, setOpen] = useState(() => new Set(['inbox', 'main']));
  const [checksOpen, setChecksOpen] = useState(true);
  useEffect(() => { try { if (localStorage.getItem('wdp-email-checks-open') === '0') setChecksOpen(false); } catch { /* blocked */ } }, []);
  useEffect(() => { try { localStorage.setItem('wdp-email-checks-open', checksOpen ? '1' : '0'); } catch { /* blocked */ } }, [checksOpen]);
  const [checksHidden, setChecksHidden] = useState(false);
  useEffect(() => { try { if (localStorage.getItem('wdp-email-checks-hidden') === '1') setChecksHidden(true); } catch { /* blocked */ } }, []);
  const hideChecks = hidden => { setChecksHidden(hidden); try { localStorage.setItem('wdp-email-checks-hidden', hidden ? '1' : '0'); } catch { /* blocked */ } };
  const flash = useCallback(msg => { setToast(msg); setTimeout(() => setToast(''), 2600); }, []);

  useEffect(() => { setOrigin(window.location.origin); }, []);

  /* Restore / autosave */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PREFIX + t.id) || 'null');
      if (saved) {
        const d = defaultEmailState(t);
        const pick = (src, def) => ({ ...def, ...Object.fromEntries(Object.entries(src || {}).filter(([k]) => k in def)) });
        const uploads = Object.fromEntries(Object.entries(saved.uploads || {}).filter(([k, u]) => u?.id && t.fields.some(x => x.key === k && x.upload)));
        setState({ fields: pick(saved.fields, d.fields), toggles: pick(saved.toggles, d.toggles), vars: pick(saved.vars, d.vars), fonts: pick(saved.fonts, d.fonts), uploads, assetBase: saved.assetBase || '' });
        const keep = new Set(Object.values(uploads).map(u => u.id));
        assetKeys(`${t.id}:`).then(keys => keys.filter(k => !keep.has(k)).forEach(k => deleteAsset(k))).catch(() => {});
      } else {
        const kit = loadKit();
        if (kit?.autoApply && kitIsSet(kit)) setState(withKit(defaultEmailState(t), kit));
      }
    } catch { /* storage blocked */ }
    hist.current.skip = true;
    setHydrated(true);
  }, [t]);
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => { try { localStorage.setItem(LS_PREFIX + t.id, JSON.stringify(state)); } catch { /* full */ } }, 500);
    return () => clearTimeout(tm);
  }, [state, hydrated, t.id]);

  /* Undo / redo */
  const hist = useRef({ past: [], future: [], committed: null, skip: false, timer: null });
  const [, setHistTick] = useState(0);
  const stateRef = useRef(state);
  stateRef.current = state;
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
    const onKey = ev => {
      if (!(ev.ctrlKey || ev.metaKey)) return;
      const el = ev.target;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName) || el?.isContentEditable) return;
      const k = ev.key.toLowerCase();
      if (k === 'z' && !ev.shiftKey) { ev.preventDefault(); undo(); }
      else if ((k === 'z' && ev.shiftKey) || k === 'y') { ev.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);
  const canUndo = hist.current.past.length > 0 || (hist.current.committed !== null && hist.current.committed !== state);
  const canRedo = hist.current.future.length > 0;

  /* Output */
  /* Uploaded images: blobs live in IndexedDB; previews use object URLs */
  const uploads = state.uploads || {};
  const [blobUrls, setBlobUrls] = useState({});
  const blobUrlsRef = useRef(blobUrls);
  blobUrlsRef.current = blobUrls;
  useEffect(() => {
    let live = true;
    Object.values(uploads).forEach(u => {
      if (blobUrlsRef.current[u.id]) return;
      getAsset(u.id).then(rec => {
        if (live && rec?.blob) setBlobUrls(m => (m[u.id] ? m : { ...m, [u.id]: URL.createObjectURL(rec.blob) }));
      }).catch(() => {});
    });
    return () => { live = false; };
  }, [uploads]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => Object.values(blobUrlsRef.current).forEach(u => URL.revokeObjectURL(u)), []);
  const assetBase = String(state.assetBase || '').trim().replace(/\/+$/, '');
  const imagePath = key => (assetBase ? `${assetBase}/${uploads[key].file}` : `images/${uploads[key].file}`);
  const exportState = useMemo(() => {
    const fields = { ...state.fields };
    Object.keys(uploads).forEach(k => { fields[k] = imagePath(k); });
    return { ...state, fields };
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps
  const previewState = useMemo(() => {
    const fields = { ...state.fields };
    Object.entries(uploads).forEach(([k, u]) => { if (blobUrls[u.id]) fields[k] = blobUrls[u.id]; });
    return { ...state, fields };
  }, [state, blobUrls]); // eslint-disable-line react-hooks/exhaustive-deps

  const html = useMemo(() => t.build(exportState), [t, exportState]);
  const editHtml = useMemo(() => t.build(previewState, { edit: true }), [t, previewState]);
  const text = useMemo(() => t.text(exportState), [t, exportState]);
  const bytes = useMemo(() => new Blob([html]).size, [html]);
  const liveHtml = useMemo(() => previewImages(dark ? forceDark(editHtml) : editHtml, origin), [editHtml, dark, origin]);
  // While text is being edited inside the preview, keep its document as-is (a new srcDoc
  // would reload the frame and drop the caret); it refreshes when editing ends.
  const [frozenHtml, setFrozenHtml] = useState(null);
  const liveHtmlRef = useRef(liveHtml);
  liveHtmlRef.current = liveHtml;
  const previewHtml = frozenHtml ?? liveHtml;

  const setField = (key, val) => setState(p => ({ ...p, fields: { ...p.fields, [key]: val } }));
  const setToggle = (key, val) => setState(p => ({ ...p, toggles: { ...p.toggles, [key]: val } }));
  const setVar = (key, val) => setState(p => ({ ...p, vars: { ...p.vars, [key]: val } }));
  // Palettes set the brand colour and a readable button text colour for it
  const applyPalette = p => setState(prev => ({ ...prev, vars: { ...prev.vars, brand: p.accentColor, btnText: onColor(p.accentColor) } }));
  const toggleGroup = gid => setOpen(prev => { const n = new Set(prev); if (n.has(gid)) n.delete(gid); else n.add(gid); return n; });

  /* Click-to-edit in the preview */
  // Opens the field's group, scrolls its input into view and flashes it. Inputs for images
  // and links also take focus; text being edited in the preview keeps the caret there.
  const revealField = useCallback((key, focusInput) => {
    const fd = t.fields.find(x => x.key === key);
    if (!fd) return;
    setOpen(prev => (prev.has(fd.group) ? prev : new Set(prev).add(fd.group)));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const input = document.getElementById(`em-${key}`);
      if (!input) return;
      revealInPanel(input.closest('[data-fieldwrap]') || input, e.flash);
      if (focusInput) { input.focus({ preventScroll: true }); input.select?.(); }
    }));
  }, [t]);

  const bindPreview = useCallback(doc => {
    const style = doc.createElement('style');
    style.textContent = '[data-field]{cursor:pointer}[data-field]:hover{outline:2px dashed rgba(99,102,241,.75);outline-offset:3px}[data-field][contenteditable]{outline:2px solid #6366f1 !important;outline-offset:3px;cursor:text}';
    doc.head.appendChild(style);
    doc.addEventListener('click', ev => {
      if (ev.target.closest('a')) ev.preventDefault(); // links don't navigate inside the editor
      const el = ev.target.closest('[data-field]');
      if (!el || el.isContentEditable) return;
      const fd = t.fields.find(x => x.key === el.dataset.field);
      if (!fd) return;
      if (fd.type !== 'text' && fd.type !== 'textarea') { revealField(fd.key, true); return; }
      // Text: edit it right here in the preview
      setFrozenHtml(cur => cur ?? liveHtmlRef.current);
      try { el.contentEditable = 'plaintext-only'; } catch { el.contentEditable = 'true'; }
      el.focus();
      const range = doc.caretRangeFromPoint?.(ev.clientX, ev.clientY);
      if (range) { const sel = doc.getSelection(); sel.removeAllRanges(); sel.addRange(range); }
      // textContent for one-line fields (innerText would bake in CSS uppercase), innerText for multi-line
      const read = () => (fd.type === 'textarea' ? el.innerText.replace(/\n$/, '') : el.textContent);
      const onInput = () => setField(fd.key, read());
      const onKey = k => { if (k.key === 'Escape' || (k.key === 'Enter' && fd.type !== 'textarea')) { k.preventDefault(); el.blur(); } };
      const onBlur = () => {
        el.removeEventListener('input', onInput);
        el.removeEventListener('keydown', onKey);
        el.removeEventListener('blur', onBlur);
        el.removeAttribute('contenteditable');
        setFrozenHtml(null);
      };
      el.addEventListener('input', onInput);
      el.addEventListener('keydown', onKey);
      el.addEventListener('blur', onBlur);
      revealField(fd.key, false);
    }, true);
  }, [t, revealField]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Pre-send checks */
  const f = state.fields;
  const checks = [];
  if (bytes > GMAIL_CLIP) checks.push({ level: 'bad', text: `The email is ${fmtKB(bytes)}. Gmail clips messages over 102 KB and hides the rest, including your unsubscribe link.` });
  else if (bytes > 80 * 1024) checks.push({ level: 'warn', text: `The email is ${fmtKB(bytes)}, close to Gmail’s 102 KB clipping limit.` });
  if (Object.keys(uploads).length) {
    if (!assetBase) checks.push({ level: 'warn', text: 'You uploaded images. Use Download ZIP (images sit next to the email in an images folder), or host them and set the Image base URL before pasting the HTML into an email service.' });
    else if (!/^https:\/\//i.test(assetBase)) checks.push({ level: 'bad', text: 'The Image base URL must start with https:// so email clients can load your uploaded images.' });
  }
  // Every image field (the ones that accept uploads), skipped when its section is switched off
  t.fields.filter(x => x.upload).forEach(fd => {
    const k = fd.key;
    const toggle = t.groups.find(g => g.id === fd.group)?.toggle;
    if (toggle && !state.toggles[toggle]) return;
    const v = String(f[k] || '').trim();
    if (!v && !uploads[k]) return;
    const label = fd.label.replace(/ \(optional\)/i, '');
    if (!uploads[k] && !/^https:\/\//i.test(v)) checks.push({ level: 'bad', text: `${label} must be a full https:// URL. Email clients can’t load local or relative images.` });
    const altKey = k.replace(/Url$/, 'Alt');
    if (altKey !== k && altKey in f && !String(f[altKey] || '').trim()) checks.push({ level: 'warn', text: `Add alt text for the ${label.replace(/ (image )?URL$/i, '').toLowerCase()} image. Many people read email with images off.` });
  });
  const marketing = 'unsubscribeUrl' in f;
  if (marketing && !String(f.unsubscribeUrl || '').trim()) checks.push({ level: 'bad', text: 'Add an unsubscribe link. US CAN-SPAM and Gmail/Yahoo sender rules require one in marketing email.' });
  if ('address' in f && !String(f.address || '').trim()) checks.push({ level: marketing ? 'bad' : 'warn', text: marketing ? 'Add your postal address. US CAN-SPAM requires a valid physical address in commercial email.' : 'Add your company address so people can tell the email is really from you.' });
  const placeholders = t.fields.filter(x => x.type === 'url' && /yoursite\.com|yourbrand/i.test(String(f[x.key] || ''))).map(x => x.label.replace(/ \(optional\)/i, '').replace(/ URL$/, ''));
  if (placeholders.length) checks.push({ level: 'warn', text: `Replace the placeholder links: ${placeholders.join(', ')}.` });
  if ((f.subject || '').length > 60) checks.push({ level: 'warn', text: `The subject is ${f.subject.length} characters. Phones show about 35 to 60, so lead with the important words.` });
  const ph = (f.preheader || '').length;
  if (ph && (ph < 35 || ph > 140)) checks.push({ level: 'warn', text: `The preheader is ${ph} characters. 40 to 130 fills the inbox preview without being cut off.` });

  /* Actions */
  const copy = async (str, what, note) => {
    try { await navigator.clipboard.writeText(str); flash(note || `${what} copied`); }
    catch { flash('Copy blocked by the browser, so use the download button instead'); }
  };
  const fileRef = useRef(null);
  const uploadField = useRef(null);
  const pickUpload = fd => { uploadField.current = fd; fileRef.current?.click(); };
  const onUploadFile = async ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    const fd = uploadField.current;
    if (!file || !fd) return;
    try {
      const out = await prepareUpload(file, fd.upload);
      const id = `${t.id}:${fd.key}:${Date.now().toString(36)}`;
      const name = `${fd.upload.name}.${EXT[out.type] || 'png'}`;
      await putAsset(id, { blob: out.blob, type: out.type, name, w: out.w, h: out.h, updatedAt: new Date().toISOString() });
      setState(p => ({ ...p, uploads: { ...(p.uploads || {}), [fd.key]: { id, file: name, type: out.type, w: out.w, h: out.h, size: out.blob.size } } }));
      flash(`Uploaded ${name} (${out.w}×${out.h}, ${fmtKB(out.blob.size)}). Saved in this browser.`);
    } catch (err) { flash(err.message || 'Upload failed'); }
  };
  const removeUpload = key => setState(p => { const u = { ...(p.uploads || {}) }; delete u[key]; return { ...p, uploads: u }; });

  // ZIP: the email, its plain-text version and the uploaded images, ready to extract and host
  const downloadZip = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const dir = zip.folder(`${t.id}-email`);
      dir.file(`${t.id}.html`, html);
      dir.file(`${t.id}.txt`, text);
      const files = [];
      for (const u of Object.values(uploads)) {
        const rec = await getAsset(u.id);
        if (rec?.blob) { dir.file(`images/${u.file}`, rec.blob); files.push(u.file); }
      }
      dir.file('README.txt', [
        `${t.name} v${t.version} \u2014 https://webdevpuneet.com/email-templates/${t.id}/`,
        '',
        `${t.id}.html  the email (HTML)`,
        `${t.id}.txt   plain-text version for the multipart text part`,
        files.length ? `images/       ${files.join(', ')}` : '',
        '',
        files.length
          ? (assetBase
            ? `Image links point to ${assetBase}/. Upload the files in images/ there before sending.`
            : 'Image links are relative (images/...). Upload the images folder to your server or email service and update the links, or set an Image base URL in the editor and export again.')
          : 'No uploaded images: all images use the URLs set in the editor.',
      ].filter((l, i, a) => l || a[i - 1]).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${t.id}-email.zip`);
      flash(files.length ? `Downloaded ZIP with ${files.length} image${files.length > 1 ? 's' : ''}` : 'Downloaded ZIP');
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };

  const forkToMyCode = async () => {
    const tab = openForkTab();
    setBusy('fork');
    try {
      // The whole email document goes into the HTML panel as-is (head styles, Outlook
      // conditional comments and all), so the fork is exactly what you would send.
      // CSS and JS stay empty, and My Code opens with those panels collapsed.
      const now = new Date().toISOString();
      const rid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `em-${Date.now().toString(36)}`;
      // Uploaded images are embedded as data URLs: My Code can't read this tool's image store
      let forkHtml = html;
      if (Object.keys(uploads).length) {
        const fields = { ...state.fields };
        for (const [k, u] of Object.entries(uploads)) { const rec = await getAsset(u.id); if (rec?.blob) fields[k] = await blobToDataUrl(rec.blob); }
        forkHtml = t.build({ ...state, fields });
      }
      await dbPut({ id: rid, name: `${t.name} (email)`, tags: ['email'], cdnUrls: [], html: forkHtml, css: '', js: '', createdAt: now, updatedAt: now });
      tab.go(rid);
      flash('Forked to My Code. It opened in a new tab.');
    } catch (err) { tab.cancel(); flash(`Couldn't save to My Code: ${err.message}`); }
    setBusy('');
  };

  const cat = emailCategoryById(t.category);
  const frameW = device === 'mobile' ? 390 : 680;
  const avatar = (f.fromName || f.brandName || 'A').trim()[0]?.toUpperCase() || 'A';

  return (
    <div className={s.wrap}>
      <ImageToolsTopNav active="email-templates" />
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp" className={s.fileInput} onChange={onUploadFile} />
      <div className={s.body}>
        <aside className={s.controls}>
          <div className={s.panelHead}>
            <a href="/email-templates/" className={s.toolBrand} title="All email templates">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/email-templates.svg" alt="" width={26} height={26} />
              <span>Email Templates</span>
            </a>
            <div className={s.titleRow}>
              <h1 className={s.title}>{t.name}</h1>
              <span className={s.version}>v{t.version}</span>
            </div>
            <div className={s.headActions}>
              <button type="button" className={s.primaryBtn} onClick={() => copy(html, 'Email HTML', Object.keys(uploads).length && !assetBase ? 'HTML copied. Uploaded images link to images/, so set an Image base URL or use Download ZIP.' : '')}>Copy HTML</button>
              <button type="button" className={s.btn} onClick={forkToMyCode} disabled={!!busy} title="Save an editable copy of the code in My Code">
                {busy === 'fork' ? 'Forking…' : 'Fork to My Code'}
              </button>
            </div>
            <div className={s.miniRow}>
              <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={downloadZip} disabled={!!busy} title="Email HTML, plain text and uploaded images in one ZIP">{busy === 'zip' ? 'Zipping…' : 'Download ZIP'}</button>
              <button type="button" className={s.miniBtn} onClick={() => saveBlob(new Blob([html], { type: 'text/html' }), `${t.id}-email.html`)}>Download .html</button>
              <button type="button" className={s.miniBtn} onClick={() => copy(text, 'Plain-text version')}>Copy plain text</button>
              <button type="button" className={s.miniBtn} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">↶ Undo</button>
              <button type="button" className={s.miniBtn} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">↷ Redo</button>
              <button type="button" className={s.miniBtn} onClick={() => setState({ ...defaultEmailState(t), assetBase: state.assetBase || '' })} title="Back to the original (undo brings your edits back)">Reset</button>
            </div>
          </div>

          <BrandKitPanel
            emailMode
            onToast={flash}
            onApply={kit => setState(p => withKit(p, kit))}
            onSaveFrom={() => ({
              primary: state.vars.brand,
              text: state.vars.text,
              headingFont: state.fonts.heading,
              bodyFont: state.fonts.body,
              ...(state.fields.brandName ? { name: state.fields.brandName } : {}),
              ...(/^https:\/\//.test(state.fields.logoUrl || '') ? { logoUrl: state.fields.logoUrl } : {}),
              ...(state.fields.headerLink && !/yoursite\.com/.test(state.fields.headerLink) ? { website: state.fields.headerLink } : {}),
            })}
          />

          {t.groups.map(g => {
            const fields = t.fields.filter(x => x.group === g.id);
            const isOpen = open.has(g.id);
            const enabled = !g.toggle || state.toggles[g.toggle];
            return (
              <section key={g.id} className={s.section}>
                <div className={e.groupHead}>
                  <button type="button" className={e.groupBtn} onClick={() => toggleGroup(g.id)} aria-expanded={isOpen}>
                    <span className={`${e.chev} ${isOpen ? e.chevOpen : ''}`}>›</span>
                    <h2 className={s.sectionTitle}>{g.label}</h2>
                  </button>
                  {g.toggle && (
                    <label className={e.switch} title={enabled ? 'Shown in the email' : 'Hidden from the email'}>
                      <input type="checkbox" checked={!!state.toggles[g.toggle]} onChange={ev => setToggle(g.toggle, ev.target.checked)} />
                      <span />
                    </label>
                  )}
                </div>
                {isOpen && (
                  <div className={`${e.groupBody} ${enabled ? '' : e.groupOff}`}>
                    {fields.map(fd => (
                      <div key={fd.key} className={s.field} data-fieldwrap>
                        <label className={s.label} htmlFor={`em-${fd.key}`}>{fd.label}</label>
                        {fd.type === 'textarea'
                          ? <textarea id={`em-${fd.key}`} className={s.textarea} rows={3} value={f[fd.key] ?? ''} onChange={ev => setField(fd.key, ev.target.value)} />
                          : <input id={`em-${fd.key}`} className={s.input} type={fd.type === 'number' ? 'number' : 'text'} inputMode={fd.type === 'url' ? 'url' : undefined} value={uploads[fd.key] ? imagePath(fd.key) : (f[fd.key] ?? '')} onChange={ev => setField(fd.key, ev.target.value)} spellCheck={fd.type !== 'url'} disabled={!!uploads[fd.key]} title={uploads[fd.key] ? 'Using your uploaded image; remove it to paste a URL instead' : undefined} />}
                        {fd.upload && (
                          <div className={e.uploadRow}>
                            {uploads[fd.key] ? (
                              <>
                                {blobUrls[uploads[fd.key].id] ? <img className={e.uploadThumb} src={blobUrls[uploads[fd.key].id]} alt="" /> : <span className={e.uploadThumb} />}
                                <span className={e.uploadName}>{uploads[fd.key].file} · {uploads[fd.key].w}×{uploads[fd.key].h}</span>
                                <button type="button" className={s.miniBtn} onClick={() => pickUpload(fd)}>Replace</button>
                                <button type="button" className={s.miniBtn} onClick={() => removeUpload(fd.key)}>Remove</button>
                              </>
                            ) : (
                              <button type="button" className={s.miniBtn} onClick={() => pickUpload(fd)}>↑ Upload image</button>
                            )}
                          </div>
                        )}
                        {fd.hint && <span className={s.hint}>{fd.hint}</span>}
                        {fd.key === 'subject' && <span className={s.hint}>{(f.subject || '').length} characters (aim for under 60)</span>}
                        {fd.key === 'preheader' && <span className={s.hint}>{(f.preheader || '').length} characters (aim for 40 to 130)</span>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Image hosting</h2>
            <div className={s.field}>
              <label className={s.label} htmlFor="em-assetBase">Image base URL (optional)</label>
              <input id="em-assetBase" className={s.input} inputMode="url" spellCheck={false} placeholder="https://cdn.yoursite.com/email/" value={state.assetBase || ''} onChange={ev => setState(p => ({ ...p, assetBase: ev.target.value }))} />
              <span className={s.hint}>
                Uploaded images are saved in this browser and packed into <strong>Download ZIP</strong> as an <code>images</code> folder.
                Once you host them, put their folder URL here and every export links to it.
              </span>
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Colours</h2>
            <div className={s.palettes}>
              {PALETTES.map(p => (
                <button key={p.name} type="button" className={s.palette} title={`${p.name} accent`} aria-label={`${p.name} accent`} onClick={() => applyPalette(p)}>
                  <span style={{ background: p.accentColor }} /><span style={{ background: p.bg1 }} />
                </button>
              ))}
            </div>
            <p className={s.hint}>Light mode</p>
            <div className={s.colorGrid}>
              {t.vars.filter(v => v.group === 'light').map(v => <ColorField key={v.key} label={v.label} value={state.vars[v.key]} onChange={val => setVar(v.key, val)} />)}
            </div>
            <p className={s.hint}>Dark mode (Apple Mail, iOS Mail, Outlook.com)</p>
            <div className={s.colorGrid}>
              {t.vars.filter(v => v.group === 'dark').map(v => <ColorField key={v.key} label={v.label} value={state.vars[v.key]} onChange={val => setVar(v.key, val)} />)}
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Fonts</h2>
            <div className={s.twoCol}>
              {['heading', 'body'].map(k => (
                <div key={k} className={s.field}>
                  <label className={s.label} htmlFor={`emf-${k}`}>{k === 'heading' ? 'Headings' : 'Body text'}</label>
                  <FontPicker id={`emf-${k}`} label={k === 'heading' ? 'Heading font' : 'Body font'} allowCustom={false} value={state.fonts[k]} onChange={fid => setState(p => ({ ...p, fonts: { ...p.fonts, [k]: toEmailFont(fid) } }))} />
                </div>
              ))}
            </div>
            <p className={s.hint}>Any Google Font works. Web fonts show in Apple Mail and iOS Mail; Gmail and Outlook use Arial, Georgia or Courier instead.</p>
          </section>
        </aside>

        <div className={s.main} style={{ position: 'relative' }}>
          <PlaygroundTopAd />
          <div className={s.toolbar}>
            <div className={e.toolbarLeft}>
              <div className={s.seg} role="radiogroup" aria-label="View">
                {[['preview', 'Preview'], ['html', 'HTML'], ['text', 'Plain text']].map(([v, l]) => (
                  <button key={v} type="button" role="radio" aria-checked={view === v} className={`${s.segBtn} ${view === v ? s.segBtnActive : ''}`} onClick={() => setView(v)}>{l}</button>
                ))}
              </div>
              {view === 'preview' && (
                <>
                  <div className={s.seg} role="radiogroup" aria-label="Device">
                    {[['desktop', 'Desktop'], ['mobile', 'Mobile']].map(([v, l]) => (
                      <button key={v} type="button" role="radio" aria-checked={device === v} className={`${s.segBtn} ${device === v ? s.segBtnActive : ''}`} onClick={() => setDevice(v)}>{l}</button>
                    ))}
                  </div>
                  <label className={s.check}><input type="checkbox" checked={dark} onChange={ev => setDark(ev.target.checked)} /> Dark mode</label>
                </>
              )}
            </div>
            <div className={s.meta}>
              <a className={s.metaCat} href="/email-templates/">{cat?.label}</a>
              <span className={bytes > GMAIL_CLIP ? e.over : ''}>{fmtKB(bytes)} / 102 KB</span>
            </div>
          </div>

          <div className={e.stage}>
            {view === 'preview' && (
              <>
                <div className={e.inbox} style={{ width: frameW }} aria-label="Inbox preview">
                  <span className={e.avatar}>{avatar}</span>
                  <div className={e.inboxText}>
                    <div className={e.inboxTop}><strong>{f.fromName || f.brandName}</strong><span>9:41 AM</span></div>
                    <div className={e.inboxSubject}>{f.subject || '(no subject)'}</div>
                    <div className={e.inboxPre}>{f.preheader}</div>
                  </div>
                </div>
                <div className={`${e.device} ${device === 'mobile' ? e.deviceMobile : ''}`} style={{ width: frameW }}>
                  {origin && <EmailFrame key={`${device}-${dark}`} html={previewHtml} width={frameW} onDoc={bindPreview} />}
                </div>
                <p className={e.stageHint}>Click any text to edit it right here · click an image or link to jump to its setting</p>
              </>
            )}
            {view !== 'preview' && (
              <div className={e.codeWrap}>
                <button type="button" className={e.codeCopy} onClick={() => copy(view === 'html' ? html : text, view === 'html' ? 'Email HTML' : 'Plain-text version')}>Copy</button>
                <pre className={e.code}><code>{view === 'html' ? html : text}</code></pre>
              </div>
            )}
          </div>

          {!checksHidden && <div className={e.checksBox}>
            {(() => {
              const bad = checks.filter(c => c.level === 'bad').length;
              const warn = checks.length - bad;
              const summary = checks.length === 0
                ? '✓ Ready to send'
                : [bad && `${bad} issue${bad > 1 ? 's' : ''}`, warn && `${warn} warning${warn > 1 ? 's' : ''}`].filter(Boolean).join(' · ');
              return (
                <div className={e.checksBar}>
                  <button type="button" className={e.checksHead} onClick={() => setChecksOpen(o => !o)} aria-expanded={checksOpen}>
                    <span className={`${e.chev} ${checksOpen ? e.chevOpen : ''}`}>›</span>
                    <span>Pre-send checks</span>
                    <span className={bad ? e.countBad : warn ? e.countWarn : e.countGood}>{summary}</span>
                    <span className={e.checksToggle}>{checksOpen ? 'Collapse' : 'Expand'}</span>
                  </button>
                  <button type="button" className={e.checksClose} onClick={() => hideChecks(true)} aria-label="Close pre-send checks" title="Close (reopen from the button at the bottom right)">✕</button>
                </div>
              );
            })()}
            {checksOpen && (
              <ul className={e.checks}>
                {checks.length === 0
                  ? <li className={e.good}>✓ Ready to send: under Gmail&rsquo;s clipping limit, images hosted, alt text set{'unsubscribeUrl' in f ? ', unsubscribe link and address in place' : ' and sender address in place'}.</li>
                  : checks.map(c => <li key={c.text} className={c.level === 'bad' ? e.bad : e.warn}>{c.text}</li>)}
              </ul>
            )}
          </div>}
          {checksHidden && (() => {
            const bad = checks.filter(c => c.level === 'bad').length;
            const n = checks.length;
            return (
              <button
                type="button"
                className={`${e.checksFab} ${bad ? e.fabBad : n ? e.fabWarn : e.fabGood}`}
                onClick={() => hideChecks(false)}
                title={n ? `Show pre-send checks (${n})` : 'Show pre-send checks (all good)'}
                aria-label={n ? `Show ${n} pre-send check${n > 1 ? 's' : ''}` : 'Show pre-send checks'}
              >
                {n ? <>⚠ {n}</> : '✓'}
              </button>
            );
          })()}
        </div>
      </div>
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}
