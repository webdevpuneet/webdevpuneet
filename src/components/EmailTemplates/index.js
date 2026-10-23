'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import e from './styles.module.css';
import { ExportMenu, ForkButton, HistoryButtons, SaveButton } from '@/components/ToolbarActions';
import ConfirmDialog from '@/components/SocialPostTemplates/ConfirmDialog';
import { emailDesignStore } from './designs';
import SavedDesignsStrip from '@/components/SavedDesignsStrip';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { EMAIL_TEMPLATES, EMAIL_CATEGORIES, emailTemplateById, emailCategoryById, defaultEmailState, FONT_STACKS } from './templates/index.js';
import { LoadMore } from '@/components/UiSnippetsGallery';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import { previewImages, forceDark, stripRich, MERGE_TAGS, MERGE_PLATFORMS, MERGE_URLS, mergePlatform, applyMergeTags, sampleMergeTags, sampleMergePlain } from './templates/meta.js';
import { PALETTES, parseHex, onColor } from '../OgImageGenerator/engine';
import { BrandKitPanel, loadKit, kitIsSet, saveKit } from '@/components/BrandKit';
import { exportDesigns, importDesigns, blobToDataUrl as fileToDataUrl, dataUrlToBlob } from '@/lib/design-transfer';
import { dbPut } from '@/lib/uiSnippetsDb';
import { openForkTab } from '@/lib/open-fork-tab';
import { putAsset, getAsset, deleteAsset, assetKeys } from './assetsDb';
import { revealInPanel } from '@/lib/reveal-in-panel';
import FormatPopover from './FormatPopover';
import { BLOCK_TYPES, blocksText, blockSlot, COLUMN_FIELDS, columnCount, upgradeColumns, socialList, socialSlug, socialIconSvg, socialIconFile, SOCIAL_STYLES } from './templates/shell.js';
import { highlightHtml } from '@/lib/highlight-html';
import FontPicker from '@/components/FontPicker';
import ImageLibraryPicker from '@/components/ImageLibrary';
import { addToLibrary } from '@/lib/image-library';
import { resolveFont } from '@/lib/fonts';

const LS_PREFIX = 'wdp-email-v1:';
// "My designs" and the autosave, in IndexedDB database `wdp-email-designs`
const designStore = emailDesignStore;
const GMAIL_CLIP = 102 * 1024; // Gmail clips messages larger than ~102 KB
const fmtKB = n => `${(n / 1024).toFixed(1)} KB`;
const GALLERY_PAGE = 10; // cards per "Load more": 2 rows of 5

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
  const html = useMemo(() => (preview || !visible ? '' : previewImages(sampleMergePlain(t.build(defaultEmailState(t))), origin)), [t, origin, preview, visible]);
  return (
    <a className={s.card} href={`/email-templates/${t.id}/`} {...panHandlers}>
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
        <span className={s.cardMeta}>Responsive · Dark mode</span>
      </div>
    </a>
  );
}

// savedStrip(query): the "My designs" row, shown under the search with a Templates heading
export function EmailTemplateGallery({ excludeId = null, limit = null, previews = [], initialCategory = 'all', hideControls = false, chips = true, savedStrip = null }) {
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
      {savedStrip && (
        <>
          {savedStrip(q)}
          <div className={s.sectionHead}>
            <h2>All Templates</h2>
            <span>{list.length}{list.length !== EMAIL_TEMPLATES.length ? ` of ${EMAIL_TEMPLATES.length}` : ''}</span>
          </div>
        </>
      )}
      {list.length === 0 ? (
        <div className={s.empty}>No email templates match &ldquo;{q}&rdquo;.</div>
      ) : (
        <div className={`${s.grid} ${s.grid5}`}>
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

/* A saved email design rendered from its template code: the real email HTML, with
   images uploaded in the editor loaded from IndexedDB */
function SavedEmailPreview({ design: d, width }) {
  const t = emailTemplateById(d.tpl);
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
    const st = restoreEmail(t, d.state);
    return previewImages(sampleMergePlain(t.build({ ...st, fields: { ...st.fields, ...urls } })), origin);
  }, [t, d, urls, origin]);
  if (!html) return null;
  return <EmailFrame html={html} width={640} scale={width / 640} interactive={false} />;
}

export function EmailGalleryPage({ previews = [] }) {
  return (
    <div className={`${s.galleryPage} ${s.galleryFull}`}>
      <PlaygroundTopNav active="email-templates" />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Email Templates</h1>
        <p className={s.galleryLead}>
          {EMAIL_TEMPLATES.length} free responsive HTML email templates (onboarding, account, receipts, abandoned cart, shipping, newsletters,
          sales, webinars and holiday emails) that work in Gmail, Outlook and Apple Mail, with dark mode built in. Edit them in your browser,
          then copy the HTML, download a ZIP or fork it into My Code.
        </p>
      </header>
      <EmailCategoryLinks />
      <EmailTemplateGallery
        previews={previews}
        chips={false}
        savedStrip={q => (
          <SavedDesignsStrip
            gridClass={s.grid5}
            store={emailDesignStore}
            basePath="/email-templates/"
            nameOf={id => emailTemplateById(id)?.name || id}
            imgFor={d => `/images/email-templates/previews/${d.tpl}.png`}
            renderPreview={(d, w) => <SavedEmailPreview design={d} width={w} />}
            query={q}
            deletable
          />
        )}
      />
    </div>
  );
}

/* Category landing page: same shell as the gallery, filtered to one category */
export function EmailCategoryPage({ category, h1, lead, previews = [] }) {
  return (
    <div className={`${s.galleryPage} ${s.galleryFull}`}>
      <PlaygroundTopNav active="email-templates" />
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
  const html = useMemo(() => previewImages(sampleMergePlain(t.build(defaultEmailState(t))), origin), [t, origin]);
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

/* Edited preview text -> field value: text plus only the inline tags templates allow
   (<b> <i> <u> <a href>); everything else becomes plain text, blocks become new lines */
const RICH_MAP = { b: 'b', strong: 'b', i: 'i', em: 'i', u: 'u' };
function domToRich(node, multiline) {
  let out = '';
  node.childNodes.forEach(n => {
    if (n.nodeType === 3) { out += n.nodeValue; return; }
    if (n.nodeType !== 1 || n.hasAttribute?.('data-wdp-bar')) return;
    if (n.dataset?.merge) { out += `{{${n.dataset.merge}}}`; return; } // a merge-tag chip stays a token
    const tag = n.tagName.toLowerCase();
    if (tag === 'br') { out += multiline ? '\n' : ' '; return; }
    const inner = domToRich(n, multiline);
    if (RICH_MAP[tag]) out += inner ? `<${RICH_MAP[tag]}>${inner}</${RICH_MAP[tag]}>` : '';
    else if (tag === 'a') out += `<a href="${(n.getAttribute('href') || '#').replace(/"/g, '%22')}">${inner}</a>`;
    else if (tag === 'div' || tag === 'p') out += (out && multiline && !out.endsWith('\n') ? '\n' : (out && !multiline ? ' ' : '')) + inner;
    else out += inner;
  });
  return out;
}

/* Blocks with their uploaded images swapped in: blk:<id> is an image block's picture,
   blk:<id>:c<n> a column's. srcFor(key) gives the URL to use, or '' to keep the block's own. */
function withBlockImages(blocks, srcFor) {
  return (blocks || []).map(b => {
    let out = b;
    const own = srcFor(`blk:${b.id}`);
    if (own) out = { ...out, url: own };
    if (b.type === 'columns') {
      for (let n = 1; n <= columnCount(b); n++) {
        const u = srcFor(`blk:${b.id}:c${n}`);
        if (u) out = { ...out, [`c${n}Image`]: u };
      }
    }
    return out;
  });
}

/* An SVG icon drawn to a PNG (email clients don't show SVG): 72×72, shown at 24px */
async function svgToPng(svg, size = 72) {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  c.getContext('2d').drawImage(img, 0, 0, size, size);
  return new Promise((res, rej) => c.toBlob(b => (b ? res(b) : rej(new Error('PNG failed'))), 'image/png'));
}

/* Small badges for the extra section types */
const BLOCK_ICONS = { heading: 'H', text: '¶', button: '▭', image: '▣', columns: '▥', divider: '—', spacer: '↕' };

/* A saved email state brought up to date with the template (unknown keys dropped) */
function restoreEmail(t, saved) {
  const d = defaultEmailState(t);
  const pick = (src, def) => ({ ...def, ...Object.fromEntries(Object.entries(src || {}).filter(([k]) => k in def)) });
  const blockIds = new Set((Array.isArray(saved?.blocks) ? saved.blocks : []).map(b => `blk:${b?.id}`));
  const uploads = Object.fromEntries(Object.entries(saved?.uploads || {}).filter(([k, u]) => u?.id && (t.fields.some(x => x.key === k && x.upload) || blockIds.has(k.split(':').slice(0, 2).join(':')))));
  return { fields: pick(saved?.fields, d.fields), toggles: pick(saved?.toggles, d.toggles), vars: pick(saved?.vars, d.vars), fonts: pick(saved?.fonts, d.fonts), uploads, assetBase: saved?.assetBase || '', platform: MERGE_PLATFORMS.some(p => p.id === saved?.platform) ? saved.platform : '',
    previewText: typeof saved?.previewText === 'string' ? saved.previewText : '',
    blocks: Array.isArray(saved?.blocks) ? saved.blocks.filter(b => b && BLOCK_TYPES[b.type] && b.id).map(upgradeColumns).map(b => ({ ...BLOCK_TYPES[b.type].defaults, ...b, where: b.where === 'top' || b.where === 'bottom' ? b.where : (Number.isFinite(parseInt(b.where, 10)) ? parseInt(b.where, 10) : 'bottom') })) : [] };
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
  const [panelTab, setPanelTab] = useState('edit'); // left panel: 'edit' | 'designs' | 'transfer'
  const [sheetOpen, setSheetOpen] = useState(false); // phones: the panel as a bottom sheet
  const [designs, setDesigns] = useState([]);
  const [currentDesign, setCurrentDesign] = useState(null); // { id, name } while editing a saved design
  const [renaming, setRenaming] = useState(null);
  const [designQuery, setDesignQuery] = useState('');
  const [designScope, setDesignScope] = useState('all');
  const [confirm, setConfirm] = useState(null);
  const savedJson = useRef(null); // the open design as last saved or opened, to spot unsaved changes
  const [checksOpen, setChecksOpen] = useState(true);
  useEffect(() => { try { if (localStorage.getItem('wdp-email-checks-open') === '0') setChecksOpen(false); } catch { /* blocked */ } }, []);
  useEffect(() => { try { localStorage.setItem('wdp-email-checks-open', checksOpen ? '1' : '0'); } catch { /* blocked */ } }, [checksOpen]);
  const [checksHidden, setChecksHidden] = useState(false);
  useEffect(() => { try { if (localStorage.getItem('wdp-email-checks-hidden') === '1') setChecksHidden(true); } catch { /* blocked */ } }, []);
  const hideChecks = hidden => { setChecksHidden(hidden); try { localStorage.setItem('wdp-email-checks-hidden', hidden ? '1' : '0'); } catch { /* blocked */ } };
  const toastTimer = useRef(null);
  const flash = useCallback(msg => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), Math.min(6000, 2200 + msg.length * 25));
  }, []);

  useEffect(() => { setOrigin(window.location.origin); }, []);

  /* Restore (IndexedDB autosave; older localStorage saves move over) and ?design=<id>.
     The brand kit is only applied when the user clicks "Apply to this design". */
  useEffect(() => {
    let live = true;
    const wanted = new URLSearchParams(window.location.search).get('design');
    (async () => {
      let saved = await designStore.getAutosave(t.id);
      if (!saved) {
        try {
          saved = JSON.parse(localStorage.getItem(LS_PREFIX + t.id) || 'null');
          if (saved) { await designStore.putAutosave(t.id, saved); localStorage.removeItem(LS_PREFIX + t.id); }
        } catch { /* storage blocked */ }
      }
      let next = saved ? restoreEmail(t, saved) : null;
      if (wanted) {
        const d = await designStore.getDesign(wanted).catch(() => null);
        if (d && d.tpl === t.id) {
          next = restoreEmail(t, d.state);
          savedJson.current = JSON.stringify(next);
          if (live) setCurrentDesign({ id: d.id, name: d.name });
        }
      }
      // Uploaded images nobody uses any more (not this email, not a saved design) are removed
      const all = await designStore.listDesigns();
      const keep = new Set([next, ...all.filter(d => d.tpl === t.id).map(d => d.state)].flatMap(st => Object.values(st?.uploads || {}).map(u => u.id)));
      assetKeys(`${t.id}:`).then(keys => keys.filter(k => !keep.has(k)).forEach(k => deleteAsset(k))).catch(() => {});
      if (!live) return;
      if (next) setState(next);
      hist.current.skip = true;
      setHydrated(true);
    })();
    return () => { live = false; };
  }, [t]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => {
      designStore.putAutosave(t.id, state).catch(() => { try { localStorage.setItem(LS_PREFIX + t.id, JSON.stringify(state)); } catch { /* full */ } });
    }, 500);
    return () => clearTimeout(tm);
  }, [state, hydrated, t.id]);

  /* The address bar shows the open saved design (?design=<id>), so reload, bookmark
     and a new tab reopen it in this browser; it goes back to the plain URL otherwise */
  useEffect(() => {
    if (!hydrated) return;
    const url = currentDesign ? `${window.location.pathname}?design=${encodeURIComponent(currentDesign.id)}` : window.location.pathname;
    if (window.location.pathname + window.location.search !== url) window.history.replaceState(null, '', url);
  }, [currentDesign?.id, hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  /* My designs: the list, kept fresh */
  useEffect(() => {
    let live = true;
    const load = () => designStore.listDesigns().then(list => { if (live) setDesigns(list); });
    load();
    const off = designStore.onDesignsChange(load);
    return () => { live = false; off(); };
  }, []);

  /* Undo / redo */
  const hist = useRef({ past: [], future: [], committed: null, skip: false, timer: null });
  const [, setHistTick] = useState(0);
  const stateRef = useRef(state);
  stateRef.current = state;
  const saveRef = useRef(null); // the latest Save handler, for Ctrl+S
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
      if (ev.key.toLowerCase() === 's' && !ev.shiftKey && !ev.altKey) { ev.preventDefault(); saveRef.current?.(); return; }
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
  /* Brand-colour social icons: PNGs drawn here in the brand colour for the networks in use.
     { slug: { blob, url, file } }; the preview shows the blob: URLs, exports link images/<file>
     (or the Image base URL) and Download ZIP includes the files. */
  const socialStyle = state.toggles.socialStyle;
  const brandIconKey = socialStyle === 'brand' && state.toggles.showSocial !== false ? `${state.vars.brand}|${socialList(state.fields).map(([l]) => socialSlug(l)).join(',')}` : '';
  const [brandIcons, setBrandIcons] = useState({});
  useEffect(() => {
    if (!brandIconKey) { setBrandIcons({}); return undefined; }
    let live = true;
    const made = {};
    const [color, slugs] = brandIconKey.split('|');
    (async () => {
      for (const slug of slugs.split(',').filter(Boolean)) {
        try { const blob = await svgToPng(socialIconSvg(slug, color)); made[slug] = { blob, url: URL.createObjectURL(blob), file: socialIconFile(slug, color) }; } catch { /* that icon falls back to the grey one */ }
      }
      if (live) setBrandIcons(made); else Object.values(made).forEach(x => URL.revokeObjectURL(x.url));
    })();
    return () => { live = false; };
  }, [brandIconKey]);
  useEffect(() => () => Object.values(brandIcons).forEach(x => URL.revokeObjectURL(x.url)), [brandIcons]);
  const iconPath = file => (assetBase ? `${assetBase}/${file}` : `images/${file}`);
  const imagePath = key => (assetBase ? `${assetBase}/${uploads[key].file}` : `images/${uploads[key].file}`);
  const exportState = useMemo(() => {
    const fields = { ...state.fields };
    Object.keys(uploads).forEach(k => { if (!k.startsWith('blk:')) fields[k] = imagePath(k); });
    fields.preheader = state.previewText || ''; // optional; empty = no preheader (no stale sample text)
    const blocks = withBlockImages(state.blocks, k => (uploads[k] ? imagePath(k) : ''));
    // With a platform chosen, empty or placeholder unsubscribe / preferences links become its tags
    if (mergePlatform(state.platform).unsubscribe) {
      Object.entries(MERGE_URLS).forEach(([k, url]) => {
        if (k in fields && (!String(fields[k] || '').trim() || /webdevpuneet\.com|yoursite\.com|yourbrand/i.test(fields[k]))) fields[k] = url;
      });
    }
    const socialIconSrc = Object.fromEntries(Object.entries(brandIcons).map(([k, x]) => [k, iconPath(x.file)]));
    return { ...state, fields, blocks, socialIconSrc };
  }, [state, brandIcons]); // eslint-disable-line react-hooks/exhaustive-deps
  const previewState = useMemo(() => {
    const fields = { ...state.fields };
    Object.entries(uploads).forEach(([k, u]) => { if (blobUrls[u.id] && !k.startsWith('blk:')) fields[k] = blobUrls[u.id]; });
    const blocks = withBlockImages(state.blocks, k => (uploads[k] && blobUrls[uploads[k].id]) || '');
    const socialIconSrc = Object.fromEntries(Object.entries(brandIcons).map(([k, x]) => [k, x.url]));
    return { ...state, fields, blocks, socialIconSrc };
  }, [state, blobUrls, brandIcons]); // eslint-disable-line react-hooks/exhaustive-deps

  // Exports use the chosen platform's merge tags; the preview shows tokens as sample values
  const html = useMemo(() => applyMergeTags(t.build(exportState), state.platform), [t, exportState, state.platform]);
  const editHtml = useMemo(() => sampleMergeTags(t.build(previewState, { edit: true })), [t, previewState]);
  // Plain-text version: inline formatting (<b>, links…) turned back into plain text
  const text = useMemo(() => {
    let body = t.text(exportState);
    const top = blocksText(state.blocks, 'top'), bottom = blocksText(state.blocks, 'bottom');
    if (bottom) { const at = body.lastIndexOf('\n---'); body = at > -1 ? `${body.slice(0, at)}\n${bottom}\n${body.slice(at)}` : `${body}\n${bottom}\n`; }
    if (top) body = `${top}\n\n${body}`;
    return applyMergeTags(stripRich(body), state.platform);
  }, [t, exportState, state.platform, state.blocks]);
  // Colour-coded HTML for the HTML tab (only worked out while that tab is open)
  // The card's own sections, labelled by their first words (Position menu for extra sections)
  const rowLabels = useMemo(() => {
    if (typeof DOMParser === 'undefined') return [];
    try {
      const doc = new DOMParser().parseFromString(editHtml, 'text/html');
      return [...doc.querySelectorAll('[data-row]')].map(r => (r.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 34) || (r.querySelector('img') ? 'Image' : 'Section'));
    } catch { return []; }
  }, [editHtml]);
  const highlightedHtml = useMemo(() => (view === 'html' ? highlightHtml(html) : ''), [view, html]);
  const bytes = useMemo(() => new Blob([html]).size, [html]);
  const liveHtml = useMemo(() => previewImages(dark ? forceDark(editHtml) : editHtml, origin), [editHtml, dark, origin]);
  // While text is being edited inside the preview, keep its document as-is (a new srcDoc
  // would reload the frame and drop the caret); it refreshes when editing ends.
  const [frozenHtml, setFrozenHtml] = useState(null);
  const liveHtmlRef = useRef(liveHtml);
  liveHtmlRef.current = liveHtml;
  const previewHtml = frozenHtml ?? liveHtml;

  const setField = (key, val) => setState(p => ({ ...p, fields: { ...p.fields, [key]: val } }));
  const controlsRef = useRef(null); // left panel (the formatting popover listens here)
  /* Extra sections */
  const newBlockId = () => `b${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
  const addBlock = type => setState(p => ({ ...p, blocks: [...(p.blocks || []), { id: newBlockId(), type, where: 'bottom', ...BLOCK_TYPES[type].defaults }] }));
  const updateBlock = (id, patch) => setState(p => ({ ...p, blocks: (p.blocks || []).map(b => (b.id === id ? { ...b, ...patch } : b)) }));
  const moveBlockToSlot = (id, slot, rowCount) => setState(p => {
    const list = [...(p.blocks || [])];
    const i = list.findIndex(b => b.id === id);
    if (i < 0) return p;
    const [b] = list.splice(i, 1);
    list.push({ ...b, where: slot <= 0 ? 'top' : slot >= rowCount ? 'bottom' : slot });
    return { ...p, blocks: list };
  });
  const moveBlockRef = useRef(null);
  moveBlockRef.current = moveBlockToSlot;
  const removeBlock = id => setState(p => {
    const u = { ...(p.uploads || {}) };
    Object.keys(u).forEach(k => { if (k === `blk:${id}` || k.startsWith(`blk:${id}:`)) delete u[k]; });
    return { ...p, uploads: u, blocks: (p.blocks || []).filter(b => b.id !== id) };
  });
  // Field keys from rich inputs: template fields, or "blk:<id>:<prop>" for a block's text
  const setAnyField = (key, val) => {
    if (String(key).startsWith('blk:')) { const [, id, prop] = key.split(':'); updateBlock(id, { [prop]: val }); }
    else if (key === 'previewText') setState(p => ({ ...p, previewText: val }));
    else setField(key, val);
  };
  const [addOpen, setAddOpen] = useState(false);
  const [foldedBlocks, setFoldedBlocks] = useState(() => new Set()); // sections collapsed to one line
  const toggleFold = id => setFoldedBlocks(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const lastRichField = useRef(null); // the text field merge-tag chips insert into
  useEffect(() => {
    const root = controlsRef.current;
    if (!root) return undefined;
    const onFocus = ev => { if (ev.target?.dataset?.rich) lastRichField.current = ev.target; };
    root.addEventListener('focusin', onFocus);
    return () => root.removeEventListener('focusin', onFocus);
  }, []);
  const insertMergeTag = key => {
    const el = lastRichField.current;
    if (!el || !el.isConnected) { flash('Click into a text field first, then pick a merge tag to insert it there.'); return; }
    const token = `{{${key}}}`;
    const a = el.selectionStart ?? el.value.length, b = el.selectionEnd ?? a;
    const next = el.value.slice(0, a) + token + el.value.slice(b);
    setAnyField(el.dataset.rich, next);
    requestAnimationFrame(() => { try { el.focus(); el.setSelectionRange(a + token.length, a + token.length); } catch { /* gone */ } });
  };
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
    // Phones: open the panel for fields edited there (images, links); text is edited in the preview
    if (focusInput) { setSheetOpen(true); setPanelTab('edit'); }
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
    // Extra sections can be dragged between the template's sections
    const dragCss = doc.createElement('style');
    dragCss.textContent = '[data-block]{cursor:grab}[data-block]:hover{outline:2px dashed rgba(124,58,237,.7);outline-offset:-2px}[data-block].wdp-dragging{opacity:.35}';
    doc.head.appendChild(dragCss);
    let dragId = null, dropSlot = null;
    const line = doc.createElement('div');
    line.style.cssText = 'position:absolute;left:0;right:0;height:4px;margin-top:-2px;border-radius:4px;background:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.2);pointer-events:none;display:none;z-index:2147483646;';
    doc.body.appendChild(line);
    const slotAt = y => {
      const rows = [...doc.querySelectorAll('[data-row]')];
      if (!rows.length) return null;
      let k = 0;
      rows.forEach((r, i) => { const rc = r.getBoundingClientRect(); if (y > rc.top + rc.height / 2) k = i + 1; });
      const ref = k < rows.length ? rows[k].getBoundingClientRect().top : rows[rows.length - 1].getBoundingClientRect().bottom;
      const card = rows[0].closest('table').getBoundingClientRect();
      return { k, n: rows.length, y: ref + doc.defaultView.scrollY, left: card.left, width: card.width };
    };
    doc.addEventListener('dragstart', d => {
      const b = d.target.closest?.('[data-block]');
      if (!b) return;
      dragId = b.dataset.block;
      d.dataTransfer.effectAllowed = 'move';
      try { d.dataTransfer.setData('text/plain', dragId); } catch { /* old engines */ }
      b.classList.add('wdp-dragging');
    });
    doc.addEventListener('dragover', d => {
      if (!dragId) return;
      d.preventDefault();
      const at = slotAt(d.clientY);
      if (!at) return;
      dropSlot = at;
      Object.assign(line.style, { display: 'block', top: `${at.y}px`, left: `${at.left}px`, width: `${at.width}px`, right: 'auto' });
    });
    const endDrag = () => {
      line.style.display = 'none';
      doc.querySelectorAll('.wdp-dragging').forEach(x => x.classList.remove('wdp-dragging'));
      doc.__wdpDragged = !!dragId;
      setTimeout(() => { doc.__wdpDragged = false; }, 50);
      dragId = null;
      dropSlot = null;
    };
    doc.addEventListener('drop', d => {
      if (!dragId || !dropSlot) return;
      d.preventDefault();
      moveBlockRef.current?.(dragId, dropSlot.k, dropSlot.n);
      endDrag();
    });
    doc.addEventListener('dragend', endDrag);
    doc.addEventListener('click', ev => {
      if (ev.target.closest('a')) ev.preventDefault(); // links don't navigate inside the editor
      const blk = ev.target.closest('[data-block]');
      if (blk && !ev.target.closest('[data-field]') && !doc.__wdpDragged) {
        setSheetOpen(true);
        setPanelTab('edit');
        requestAnimationFrame(() => revealInPanel(document.getElementById(`blk-${blk.dataset.block}`), e.flash));
        return;
      }
      const el = ev.target.closest('[data-field]');
      if (!el || el.isContentEditable) return;
      const fd = t.fields.find(x => x.key === el.dataset.field);
      if (!fd) return;
      if (fd.type !== 'text' && fd.type !== 'textarea') { revealField(fd.key, true); return; }
      // Text: edit it right here in the preview. Rich editing (bold, italic, underline,
      // links), saved back as the inline HTML the templates allow.
      setFrozenHtml(cur => cur ?? liveHtmlRef.current);
      el.contentEditable = 'true';
      try { doc.execCommand('styleWithCSS', false, false); } catch { /* old engines */ }
      el.focus();
      const range = doc.caretRangeFromPoint?.(ev.clientX, ev.clientY);
      if (range) { const sel = doc.getSelection(); sel.removeAllRanges(); sel.addRange(range); }
      const multi = fd.type === 'textarea';
      const read = () => domToRich(el, multi).replace(/\n+$/, '');
      const onInput = () => setField(fd.key, read());
      const onPaste = p => { p.preventDefault(); doc.execCommand('insertText', false, p.clipboardData.getData('text/plain')); };

      // Selection bar (lives in the preview document while editing)
      const bar = doc.createElement('div');
      bar.setAttribute('data-wdp-bar', '');
      bar.style.cssText = 'position:absolute;z-index:2147483647;display:none;align-items:center;gap:2px;padding:3px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.14);font:14px/1 -apple-system,Segoe UI,Arial,sans-serif;';
      const btn = 'display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:28px;padding:0 6px;border:0;border-radius:6px;background:none;color:#4b5563;cursor:pointer;font-size:14px;';
      const ICON = {
        link: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
        unlink: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/><path d="M3 3l18 18"/></svg>',
        clear: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/><path d="M3 3l18 18"/></svg>',
        ok: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
      };
      const barCss = doc.createElement('style');
      barCss.textContent = '[data-wdp-bar] svg{pointer-events:none;display:block}[data-wdp-bar] button:hover{background:#f3f4f6 !important;color:#111827 !important}[data-wdp-bar] button[aria-pressed="true"]{background:#eef2ff !important;color:#4f46e5 !important}';
      doc.head.appendChild(barCss);
      const tools = `<button type="button" data-cmd="bold" title="Bold (Ctrl+B)" style="${btn}"><b>B</b></button><button type="button" data-cmd="italic" title="Italic (Ctrl+I)" style="${btn}"><i style="font-family:Georgia,serif">I</i></button><button type="button" data-cmd="underline" title="Underline (Ctrl+U)" style="${btn}"><u>U</u></button><button type="button" data-cmd="link" title="Add a link" style="${btn}">${ICON.link}</button><span style="width:1px;height:18px;margin:0 3px;background:#e5e7eb"></span><button type="button" data-cmd="removeFormat" title="Remove formatting" style="${btn}">${ICON.clear}</button>`;
      bar.innerHTML = tools;
      doc.body.appendChild(bar);
      let saved = null;
      const place = () => {
        const sel = doc.getSelection();
        if (bar.dataset.linking) return;
        if (!sel.rangeCount || sel.isCollapsed || !el.contains(sel.anchorNode)) { bar.style.display = 'none'; return; }
        const r = sel.getRangeAt(0).getBoundingClientRect();
        const win = doc.defaultView;
        // Selected state for formats already applied to the selection
        bar.querySelectorAll('[data-cmd]').forEach(bt => {
          const cmd = bt.dataset.cmd;
          let pressed = false;
          if (cmd === 'bold' || cmd === 'italic' || cmd === 'underline') { try { pressed = doc.queryCommandState(cmd); } catch { pressed = false; } }
          if (cmd === 'link') {
            pressed = !!(sel.anchorNode?.parentElement?.closest('a') && el.contains(sel.anchorNode));
            bt.title = pressed ? 'Remove link (keeps the text)' : 'Add a link';
            bt.innerHTML = pressed ? ICON.unlink : ICON.link;
          }
          bt.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        });
        bar.style.display = 'flex';
        bar.style.left = `${Math.max(4, r.left + win.scrollX)}px`;
        bar.style.top = `${Math.max(4, r.top + win.scrollY - 40)}px`;
      };
      const finishLink = url => {
        delete bar.dataset.linking;
        bar.innerHTML = tools;
        el.focus();
        if (saved) { const sel = doc.getSelection(); sel.removeAllRanges(); sel.addRange(saved); }
        if (url) doc.execCommand('createLink', false, url.replace(/"/g, '%22'));
        onInput();
        place();
      };
      bar.addEventListener('mousedown', m => { if (m.target.tagName !== 'INPUT') m.preventDefault(); });
      const bt0 = c => c.target.closest('[data-cmd]');
      bar.addEventListener('click', c => {
        const cmd = c.target.closest('[data-cmd]')?.dataset.cmd;
        if (!cmd) return;
        if (cmd === 'link' && bt0(c)?.getAttribute('aria-pressed') === 'true') {
          // Already a link: remove it (select the whole link first so all of it goes)
          const sel = doc.getSelection();
          const a = sel.anchorNode?.parentElement?.closest('a');
          if (a && el.contains(a)) { const r = doc.createRange(); r.selectNodeContents(a); sel.removeAllRanges(); sel.addRange(r); }
          doc.execCommand('unlink');
          onInput();
          place();
          return;
        }
        if (cmd === 'link') {
          const sel = doc.getSelection();
          saved = sel.rangeCount ? sel.getRangeAt(0).cloneRange() : null;
          bar.dataset.linking = '1';
          bar.innerHTML = `<input type="url" placeholder="https://…" value="https://" style="width:190px;height:26px;padding:0 8px;border:1px solid #d1d5db;border-radius:5px;font:12px Arial,sans-serif;outline:none"><button type="button" data-ok title="Add link" style="${btn}">${ICON.ok}</button>`;
          const input = bar.querySelector('input');
          input.focus(); input.select();
          input.addEventListener('keydown', k => { if (k.key === 'Enter') { k.preventDefault(); finishLink(input.value.trim()); } if (k.key === 'Escape') finishLink(''); });
          bar.querySelector('[data-ok]').addEventListener('click', () => finishLink(input.value.trim()));
          return;
        }
        doc.execCommand(cmd);
        if (cmd === 'removeFormat') doc.execCommand('unlink');
        onInput();
        place();
      });
      doc.addEventListener('selectionchange', place);

      const onKey = k => {
        if (k.key === 'Escape' || (k.key === 'Enter' && !multi)) { k.preventDefault(); el.blur(); }
      };
      const onBlur = b => {
        if (bar.contains(b.relatedTarget) || bar.dataset.linking) return; // typing a link URL
        el.removeEventListener('input', onInput);
        el.removeEventListener('keydown', onKey);
        el.removeEventListener('blur', onBlur);
        el.removeEventListener('paste', onPaste);
        doc.removeEventListener('selectionchange', place);
        bar.remove();
        barCss.remove();
        el.removeAttribute('contenteditable');
        setFrozenHtml(null);
      };
      el.addEventListener('input', onInput);
      el.addEventListener('keydown', onKey);
      el.addEventListener('blur', onBlur);
      el.addEventListener('paste', onPaste);
      revealField(fd.key, false);
    }, true);
  }, [t, revealField]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Pre-send checks */
  const f = state.fields;
  const checks = [];
  if (bytes > GMAIL_CLIP) checks.push({ level: 'bad', text: `The email is ${fmtKB(bytes)}. Gmail clips messages over 102 KB and hides the rest, including your unsubscribe link.` });
  else if (bytes > 80 * 1024) checks.push({ level: 'warn', text: `The email is ${fmtKB(bytes)}, close to Gmail’s 102 KB clipping limit.` });
  if (Object.keys(brandIcons).length && !assetBase && !Object.keys(uploads).length) checks.push({ level: 'warn', text: 'Brand-colour social icons are PNG files in Download ZIP (images folder). Host them and set the Image base URL before pasting the HTML elsewhere, or switch to Grey icons, which are already hosted.' });
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
  // Extra sections: hosted images with alt text, real links
  (state.blocks || []).forEach((b, i) => {
    const n = `${BLOCK_TYPES[b.type]?.label || 'Section'} (extra section ${i + 1})`;
    const uploaded = !!uploads[`blk:${b.id}`];
    if (b.type === 'image' && uploaded && !String(b.alt || '').trim()) checks.push({ level: 'warn', text: `${n}: add alt text. Many people read email with images off.` });
    if (b.type === 'image' && !uploaded && String(b.url || '').trim()) {
      if (!/^https:\/\//i.test(b.url)) checks.push({ level: 'bad', text: `${n}: the image must be a full https:// URL.` });
      if (!String(b.alt || '').trim()) checks.push({ level: 'warn', text: `${n}: add alt text. Many people read email with images off.` });
    }
    if (b.type === 'columns') {
      for (let k = 1; k <= columnCount(b); k++) {
        const up = !!uploads[`blk:${b.id}:c${k}`];
        const src = String(b[`c${k}Image`] || '').trim();
        if (!up && src && !/^https:\/\//i.test(src)) checks.push({ level: 'bad', text: `${n}, column ${k}: the image must be a full https:// URL.` });
        if ((up || src) && !String(b[`c${k}Alt`] || '').trim()) checks.push({ level: 'warn', text: `${n}, column ${k}: add alt text for the image.` });
        if (String(b[`c${k}Btn`] || '').trim() && /webdevpuneet\.com|yoursite\.com|yourbrand/i.test(String(b[`c${k}Url`] || ''))) checks.push({ level: 'warn', text: `${n}, column ${k}: replace the placeholder button link.` });
      }
    }
    const link = b.type === 'button' ? b.url : b.type === 'image' ? b.link : '';
    if (/webdevpuneet\.com|yoursite\.com|yourbrand/i.test(String(link || ''))) checks.push({ level: 'warn', text: `${n}: replace the placeholder link.` });
  });
  const pvLen = (state.previewText || '').trim().length;
  if (pvLen && (pvLen < 35 || pvLen > 140)) checks.push({ level: 'warn', text: `The inbox preview text is ${pvLen} characters. 40 to 130 fills the preview line without being cut off.` });
  const marketing = 'unsubscribeUrl' in f;
  if (marketing && !String(f.unsubscribeUrl || '').trim() && !mergePlatform(state.platform).unsubscribe) checks.push({ level: 'bad', text: 'Add an unsubscribe link. US CAN-SPAM and Gmail/Yahoo sender rules require one in marketing email.' });
  if ('address' in f && !String(f.address || '').trim()) checks.push({ level: marketing ? 'bad' : 'warn', text: marketing ? 'Add your postal address. US CAN-SPAM requires a valid physical address in commercial email.' : 'Add your company address so people can tell the email is really from you.' });
  const mergeHandles = k => !!mergePlatform(state.platform).unsubscribe && k in MERGE_URLS;
  const placeholders = t.fields.filter(x => x.type === 'url' && !mergeHandles(x.key) && /webdevpuneet\.com|yoursite\.com|yourbrand/i.test(String(f[x.key] || ''))).map(x => x.label.replace(/ \(optional\)/i, '').replace(/ URL$/, ''));
  if (placeholders.length) checks.push({ level: 'warn', text: `Replace the placeholder links: ${placeholders.join(', ')}.` });

  /* Actions */
  const copy = async (str, what, note) => {
    try { await navigator.clipboard.writeText(str); flash(note || `${what} copied`); return true; }
    catch { flash('Copy blocked by the browser, so use the download button instead'); return false; }
  };
  // The code box's own button reads "Copied ✓" for a moment after a click
  const [codeCopied, setCodeCopied] = useState(false);
  const copiedTimer = useRef(null);
  useEffect(() => () => clearTimeout(copiedTimer.current), []);
  const copyCode = async () => {
    const ok = await copy(view === 'html' ? html : text, view === 'html' ? 'Email HTML' : 'Plain-text version');
    if (!ok) return;
    setCodeCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCodeCopied(false), 1600);
  };
  const fileRef = useRef(null);
  const uploadField = useRef(null);
  const pickUpload = fd => { uploadField.current = fd; fileRef.current?.click(); };
  /* Resize a picked or reused image to the field's size and store it for this template */
  const storeUpload = async (file, fd) => {
    try {
      const out = await prepareUpload(file, fd.upload);
      const id = `${t.id}:${fd.key}:${Date.now().toString(36)}`;
      const name = `${fd.upload.name}.${EXT[out.type] || 'png'}`;
      await putAsset(id, { blob: out.blob, type: out.type, name, w: out.w, h: out.h, updatedAt: new Date().toISOString() });
      addToLibrary(out.blob, { file: name, w: out.w, h: out.h });
      setState(p => ({ ...p, uploads: { ...(p.uploads || {}), [fd.key]: { id, file: name, type: out.type, w: out.w, h: out.h, size: out.blob.size } } }));
      flash(`Using ${name} (${out.w}×${out.h}, ${fmtKB(out.blob.size)}). Saved in this browser.`);
    } catch (err) { flash(err.message || 'Upload failed'); }
  };
  const onUploadFile = async ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    const fd = uploadField.current;
    if (!file || !fd) return;
    await storeUpload(file, fd);
  };
  const reuseLibraryImage = (fd, item) => storeUpload(new File([item.blob], item.file, { type: item.type }), fd);
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
      for (const x of Object.values(brandIcons)) { dir.file(`images/${x.file}`, x.blob); files.push(x.file); }
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
        Object.keys(brandIcons).length ? 'The social icons (social-*.png) are PNG images in your brand colour: email clients don’t show SVG.' : '',
      ].filter((l, i, a) => l || a[i - 1]).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${t.id}-email.zip`);
      flash(files.length ? `Downloaded ZIP with ${files.length} image${files.length > 1 ? 's' : ''}` : 'Downloaded ZIP');
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };

  /* My designs: save, save as, open, duplicate, rename, delete */
  const dirty = !!currentDesign && savedJson.current !== null && savedJson.current !== JSON.stringify(state);
  const [justSaved, setJustSaved] = useState(false);
  const savedTimer = useRef(null);
  useEffect(() => () => clearTimeout(savedTimer.current), []);
  const nextName = () => `${t.name} ${designs.filter(d => d.tpl === t.id).length + 1}`;
  const saveNewDesign = async name => {
    setBusy('save');
    try {
      const rec = await designStore.saveDesign({ name: name.trim() || t.name, tpl: t.id, state });
      savedJson.current = JSON.stringify(state);
      setCurrentDesign({ id: rec.id, name: rec.name });
      flash(`Saved “${rec.name}” to My designs`);
    } catch (err) { flash(`Couldn't save the design: ${err.message}`); }
    setBusy('');
  };
  const updateCurrentDesign = async () => {
    if (!currentDesign) return;
    setBusy('save');
    try {
      const old = await designStore.getDesign(currentDesign.id);
      await designStore.saveDesign({ ...(old || {}), id: currentDesign.id, name: currentDesign.name, tpl: t.id, state });
      savedJson.current = JSON.stringify(state);
      flash(`Updated “${currentDesign.name}”`);
    } catch (err) { flash(`Couldn't save the design: ${err.message}`); }
    setBusy('');
  };
  const quickSave = async () => {
    if (busy) return;
    if (currentDesign) await updateCurrentDesign();
    else await saveNewDesign(nextName());
    setJustSaved(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setJustSaved(false), 1600);
  };
  saveRef.current = quickSave;
  const openDesign = (d, force = false) => {
    if (currentDesign?.id === d.id && !dirty) { setPanelTab('edit'); return; }
    if (!force && currentDesign && dirty) {
      setConfirm({
        title: 'Discard unsaved changes?',
        message: `“${currentDesign.name}” has changes you haven't saved. Opening “${d.name}” replaces them in the editor.`,
        okLabel: `Open “${d.name}”`,
        danger: true,
        onOk: () => openDesign(d, true),
      });
      return;
    }
    if (d.tpl !== t.id) { window.location.href = `/email-templates/${d.tpl}/?design=${encodeURIComponent(d.id)}`; return; }
    const next = restoreEmail(t, d.state);
    savedJson.current = JSON.stringify(next);
    setState(next);
    setCurrentDesign({ id: d.id, name: d.name });
    setPanelTab('edit');
    flash(`Opened “${d.name}”`);
  };
  const duplicate = async d => { const copy = await designStore.duplicateDesign(d.id); if (copy) flash(`Duplicated as “${copy.name}”`); };
  const removeDesign = d => setConfirm({
    title: 'Delete this design?',
    message: `“${d.name}” will be removed from My designs in this browser. This can't be undone.`,
    okLabel: 'Delete',
    danger: true,
    onOk: async () => {
      await designStore.deleteDesign(d.id);
      if (currentDesign?.id === d.id) setCurrentDesign(null);
      flash(`Deleted “${d.name}”`);
    },
  });
  const renameDesign = async (rid, name) => {
    const d = await designStore.getDesign(rid);
    if (d && name.trim()) {
      await designStore.saveDesign({ ...d, name: name.trim() });
      if (currentDesign?.id === rid) setCurrentDesign({ id: rid, name: name.trim() });
    }
    setRenaming(null);
  };
  /* Export / import My designs (backup file, uploaded images included) */
  const importRef = useRef(null);
  const exportAll = async () => {
    setBusy('export');
    try {
      const kitNow = loadKit();
      const r = await exportDesigns({
        tool: 'email-templates',
        store: designStore,
        getAssets: async ds => {
          const ids = [...new Set(ds.flatMap(d => Object.values(d.state?.uploads || {}).map(u => u.id)))];
          const out = [];
          for (const key of ids) {
            const rec = await getAsset(key).catch(() => null);
            if (rec?.blob) out.push({ key, data: await fileToDataUrl(rec.blob), type: rec.type, name: rec.name, w: rec.w, h: rec.h });
          }
          return out;
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
        tool: 'email-templates',
        store: designStore,
        knownTemplate: id => !!emailTemplateById(id),
        putAssets: async assets => {
          let n = 0;
          for (const a of assets) {
            if (!a?.key || !String(a.data || '').startsWith('data:')) continue;
            if (await getAsset(a.key).catch(() => null)) continue;
            await putAsset(a.key, { blob: await dataUrlToBlob(a.data), type: a.type, name: a.name, w: a.w, h: a.h, updatedAt: new Date().toISOString() });
            n++;
          }
          return n;
        },
        applyKit: k => { if (kitIsSet(loadKit())) return false; saveKit(k); return true; },
      });
    const parts = [];
    if (r.added) parts.push(`${r.added} design${r.added > 1 ? 's' : ''} added`);
    if (r.copies) parts.push(`${r.copies} added as copies`);
    if (r.skipped) parts.push(`${r.skipped} already here`);
    if (r.assets) parts.push(`${r.assets} image(s) added`);
    if (r.kit) parts.push('brand kit restored');
    flash(parts.length ? `Imported: ${parts.join(', ')}` : 'Nothing new to import');
    } catch (err) { flash(err.message); }
    setBusy('');
  };
  const shownDesigns = designs.filter(d => {
    const words = designQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return (designScope === 'all' || d.tpl === t.id) && words.every(w => `${d.name} ${emailTemplateById(d.tpl)?.name || d.tpl}`.toLowerCase().includes(w));
  });

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
        const fields = { ...exportState.fields }; // keeps merge-tag unsubscribe links
        const blockUrls = {};
        for (const [k, u] of Object.entries(uploads)) { const rec = await getAsset(u.id); if (rec?.blob) { const url = await blobToDataUrl(rec.blob); if (k.startsWith('blk:')) blockUrls[k] = url; else fields[k] = url; } }
        const blocks = withBlockImages(exportState.blocks, k => blockUrls[k] || '');
        forkHtml = applyMergeTags(t.build({ ...exportState, fields, blocks }), state.platform);
      }
      await dbPut({ id: rid, name: `${t.name} (email)`, tags: ['email'], cdnUrls: [], html: forkHtml, css: '', js: '', createdAt: now, updatedAt: now });
      tab.go(rid);
      flash('Forked to My Code. It opened in a new tab.');
    } catch (err) { tab.cancel(); flash(`Couldn't save to My Code: ${err.message}`); }
    setBusy('');
  };

  const frameW = device === 'mobile' ? 390 : 680;

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="email-templates" />
      <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp" className={s.fileInput} onChange={onUploadFile} />
      <div className={s.body}>
        <aside className={`${s.controls} ${sheetOpen ? s.sheetOpen : ''}`} ref={controlsRef}>
          <FormatPopover containerRef={controlsRef} onChange={setAnyField} />
          {/* Tool name stays pinned at the top of the panel; everything below scrolls */}
          <div className={s.toolBrandBar}>
            <a href="/email-templates/" className={s.toolBrand} title="All email templates">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/email-templates.svg" alt="" width={26} height={26} />
              <span>Email Templates</span>
            </a>
          </div>
          {/* Only this part scrolls, so the scrollbar starts below the pinned tool name */}
          {/* Phones: grab handle that opens / closes the panel as a bottom sheet */}
          <button type="button" className={s.sheetHandle} onClick={() => setSheetOpen(o => !o)} aria-expanded={sheetOpen} aria-label={sheetOpen ? 'Close the editing panel' : 'Open the editing panel'}>
            <i aria-hidden="true" />
            {sheetOpen ? 'Hide panel' : 'Edit email'}
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
                <li>Every design in My designs (text, colours, fonts and sections)</li>
                <li>Images you uploaded into your emails</li>
                <li>Your brand kit, if you’ve set one</li>
              </ul>
              <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={exportAll} disabled={!!busy || !designs.length}>{busy === 'export' ? 'Exporting…' : '⤓ Export designs'}</button>
              {!designs.length && <p className={s.hint}>Nothing to export yet. Save a design first (Save in the toolbar, or Ctrl+S).</p>}

              <h2 className={s.sectionTitle} style={{ marginTop: 22 }}>Import</h2>
              <p className={s.transferText}>Add designs from a backup file. Nothing you already have is changed: designs you have are skipped, and a different design with the same id comes in as a copy.</p>
              <button type="button" className={s.miniBtn} onClick={() => importRef.current?.click()} disabled={!!busy}>{busy === 'import' ? 'Importing…' : '⤒ Choose a backup file (.json)'}</button>
              <input ref={importRef} type="file" accept=".json,application/json" hidden onChange={ev => { const f = ev.target.files?.[0]; ev.target.value = ''; importFile(f); }} />
              <p className={s.hint}>Designs are stored only in this browser. Export regularly so clearing site data or switching devices never loses your work.</p>
            </section>
          ) : panelTab === 'designs' ? (
            <section className={s.section}>
              {designs.length > 0 && (
                <div className={s.designFind}>
                  <input type="search" className={s.input} value={designQuery} onChange={ev => setDesignQuery(ev.target.value)} placeholder={`Search ${designs.length} design${designs.length > 1 ? 's' : ''}…`} aria-label="Search my designs" />
                  <div className={s.designScope} role="radiogroup" aria-label="Show designs from">
                    {[['all', 'All'], ['this', 'This template']].map(([v, l]) => (
                      <button key={v} type="button" role="radio" aria-checked={designScope === v} className={designScope === v ? s.designScopeOn : ''} onClick={() => setDesignScope(v)}>
                        {l} <span>{v === 'all' ? designs.length : designs.filter(d => d.tpl === t.id).length}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {designs.length > 0 && shownDesigns.length === 0 && (
                <p className={s.designsEmpty}>No designs match{designQuery.trim() ? ` “${designQuery.trim()}”` : ''}{designScope === 'this' ? ' in this template' : ''}.</p>
              )}
              {shownDesigns.length > 0 && (
                <ul className={`${s.designList} ${s.designListTab}`}>
                  {shownDesigns.map(d => (
                    <li key={d.id} className={`${s.designItem} ${currentDesign?.id === d.id ? s.designItemOn : ''}`}>
                      <button type="button" className={s.designOpen} onClick={() => openDesign(d)} title={d.tpl === t.id ? 'Open this design' : 'Open in its template'} style={{ borderBottom: `3px solid ${d.state?.vars?.brand || '#6366f1'}` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/images/email-templates/previews/${d.tpl}.png`} alt="" style={{ objectPosition: 'top' }} />
                      </button>
                      <span className={s.designMeta}>
                        {renaming?.id === d.id
                          ? (
                            <form onSubmit={ev => { ev.preventDefault(); renameDesign(d.id, renaming.name); }}>
                              <input className={s.designRename} value={renaming.name} onChange={ev => setRenaming({ id: d.id, name: ev.target.value })} onBlur={() => renameDesign(d.id, renaming.name)} autoFocus aria-label="New name" maxLength={60} />
                            </form>
                          )
                          : <b title={d.name}>{d.name}</b>}
                        <small>{emailTemplateById(d.tpl)?.name || d.tpl} · {String(d.state?.fields?.subject || '').slice(0, 40) || 'No subject'}</small>
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
              {designs.length === 0 && <p className={s.designsEmpty}>No saved designs yet. Click Save in the toolbar (or press Ctrl+S) to keep this email, make variations, or come back to it on this device.</p>}
              <p className={s.hint}>Designs are saved in this browser, uploaded images included. Open one to keep editing, or duplicate it to make a variation.</p>
            </section>
          ) : (
          <>
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
              ...(state.fields.headerLink && !/webdevpuneet\.com|yoursite\.com/.test(state.fields.headerLink) ? { website: state.fields.headerLink } : {}),
            })}
          />

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Inbox preview text</h2>
            <input
              id="em-previewText"
              data-rich="previewText"
              className={s.input}
              value={state.previewText || ''}
              onChange={ev => setState(p => ({ ...p, previewText: ev.target.value }))}
              placeholder="Optional: the grey line shown after the subject"
              aria-label="Inbox preview text"
              maxLength={200}
            />
            <p className={s.hint}>
              {(state.previewText || '').trim()
                ? `${(state.previewText || '').trim().length} characters (aim for 40 to 130). Merge tags work here too.`
                : 'Leave empty and inboxes show the first words of the email instead.'}
            </p>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Merge tags</h2>
            <label className={s.label} htmlFor="em-platform">Email platform</label>
            <select id="em-platform" className={s.select} value={state.platform || ''} onChange={ev => setState(p => ({ ...p, platform: ev.target.value }))}>
              {MERGE_PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
            <p className={s.hint}>
              {state.platform
                ? <>Copy HTML and downloads use {mergePlatform(state.platform).label} tags: first name becomes <code>{mergePlatform(state.platform).tags.first_name}</code>, and placeholder unsubscribe / preferences links become <code>{mergePlatform(state.platform).unsubscribe}</code> and <code>{mergePlatform(state.platform).prefs}</code>.</>
                : <>Exports keep <code>{'{{first_name}}'}</code> style tokens. Pick your email platform to get its own merge tags and unsubscribe link automatically.</>}
            </p>
            <div className={s.mergeChips}>
              <span className={s.label}>Insert</span>
              {MERGE_TAGS.map(m => (
                <button key={m.key} type="button" className={s.miniBtn} onMouseDown={ev => ev.preventDefault()} onClick={() => insertMergeTag(m.key)} title={`Insert {{${m.key}}} where the cursor is (preview shows “${m.sample}”)`}>+ {m.label}</button>
              ))}
            </div>
          </section>

          {t.groups.filter(g => g.id !== 'inbox').map(g => {
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
                    {g.id === 'social' && 'socialStyle' in state.toggles && (
                      <div className={s.field}>
                        <span className={s.label}>Show links as</span>
                        <div className={s.seg} role="radiogroup" aria-label="Show social links as">
                          {SOCIAL_STYLES.map(([v, l]) => (
                            <button key={v} type="button" role="radio" aria-checked={socialStyle === v} className={`${s.segBtn} ${socialStyle === v ? s.segBtnActive : ''}`} onClick={() => setToggle('socialStyle', v)}>{l}</button>
                          ))}
                        </div>
                        <p className={s.hint}>{socialStyle === 'icons' ? 'Grey PNG icons hosted on webdevpuneet.com, so the HTML works anywhere.' : socialStyle === 'brand' ? 'PNG icons drawn in your brand colour (emails can’t show SVG). Download ZIP includes them in images/.' : 'Plain text links in your brand colour.'}</p>
                      </div>
                    )}
                    {fields.map(fd => (
                      <div key={fd.key} className={s.field} data-fieldwrap>
                        <label className={s.label} htmlFor={`em-${fd.key}`}>{fd.label}</label>
                        {fd.type === 'textarea'
                          ? <textarea id={`em-${fd.key}`} data-rich={fd.key} className={s.textarea} rows={3} value={f[fd.key] ?? ''} onChange={ev => setField(fd.key, ev.target.value)} />
                          : <input id={`em-${fd.key}`} data-rich={fd.type === 'text' ? fd.key : undefined} className={s.input} type={fd.type === 'number' ? 'number' : 'text'} inputMode={fd.type === 'url' ? 'url' : undefined} value={uploads[fd.key] ? imagePath(fd.key) : (f[fd.key] ?? '')} onChange={ev => setField(fd.key, ev.target.value)} spellCheck={fd.type !== 'url'} disabled={!!uploads[fd.key]} title={uploads[fd.key] ? 'Using your uploaded image; remove it to paste a URL instead' : undefined} />}
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
                          <ImageLibraryPicker onPick={item => reuseLibraryImage(fd, item)} />
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
              <input id="em-assetBase" className={s.input} inputMode="url" spellCheck={false} placeholder="https://cdn.webdevpuneet.com/email/" value={state.assetBase || ''} onChange={ev => setState(p => ({ ...p, assetBase: ev.target.value }))} />
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
            <h2 className={s.sectionTitle}>Extra sections <span className={s.sectionCount}>{(state.blocks || []).length}</span></h2>
            {(state.blocks || []).map(b => {
              const def = BLOCK_TYPES[b.type];
              const folded = foldedBlocks.has(b.id);
              const upKey = `blk:${b.id}`;
              const up = b.type === 'image' ? uploads[upKey] : null;
              const summary = String(b.type === 'columns' ? `${columnCount(b)} columns · ${Array.from({ length: columnCount(b) }, (_, k) => b[`c${k + 1}Title`]).filter(Boolean).join(', ')}` : (b.text || b.alt || (up ? up.file : b.url) || (b.type === 'spacer' ? `${b.size || 24}px` : ''))).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
              const slot = blockSlot(b, rowLabels.length);
              return (
                <div key={b.id} id={`blk-${b.id}`} className={`${e.block} ${folded ? e.blockFolded : ''}`}>
                  <div className={e.blockHead}>
                    <button type="button" className={e.blockToggle} onClick={() => toggleFold(b.id)} aria-expanded={!folded} title={folded ? 'Show settings' : 'Hide settings'}>
                      <span className={e.blockIcon} aria-hidden="true">{BLOCK_ICONS[b.type]}</span>
                      <span className={e.blockTitle}>
                        <b>{def.label}</b>
                        {summary && <small>{summary.slice(0, 42)}</small>}
                      </span>
                      <span className={`${e.blockChev} ${folded ? '' : e.blockChevOpen}`} aria-hidden="true">›</span>
                    </button>
                    <button type="button" className={e.blockRemove} onClick={() => removeBlock(b.id)} aria-label={`Remove ${def.label}`} title="Remove this section">✕</button>
                  </div>
                  {!folded && (
                    <div className={e.blockBody}>
                      <div className={e.blockField}>
                        <label className={e.blockLabel} htmlFor={`blk-${b.id}-where`}>Position</label>
                        <select
                          id={`blk-${b.id}-where`}
                          className={s.select}
                          title="Where this section sits (or drag it in the preview)"
                          value={slot === 0 ? 'top' : slot >= rowLabels.length ? 'bottom' : String(slot)}
                          onChange={ev => { const v = ev.target.value; updateBlock(b.id, { where: v === 'top' || v === 'bottom' ? v : parseInt(v, 10) }); }}
                        >
                          <option value="top">Top of email</option>
                          {rowLabels.slice(0, -1).map((label, k) => <option key={k} value={String(k + 1)}>After: {label}</option>)}
                          <option value="bottom">Bottom of email</option>
                        </select>
                      </div>
                      {def.fields.map(([key, label, type]) => (
                        <div key={key} className={type === 'align' ? e.blockInline : e.blockField}>
                          <label className={e.blockLabel} htmlFor={`blk-${b.id}-${key}`}>{label}</label>
                          {type === 'textarea' && <textarea id={`blk-${b.id}-${key}`} data-rich={`blk:${b.id}:${key}`} className={s.textarea} rows={3} value={b[key] ?? ''} onChange={ev => updateBlock(b.id, { [key]: ev.target.value })} />}
                          {type === 'text' && <input id={`blk-${b.id}-${key}`} data-rich={`blk:${b.id}:${key}`} className={s.input} value={b[key] ?? ''} onChange={ev => updateBlock(b.id, { [key]: ev.target.value })} />}
                          {(type === 'url' || type === 'number') && (
                            <input
                              id={`blk-${b.id}-${key}`}
                              className={s.input}
                              type={type === 'number' ? 'number' : 'text'}
                              inputMode={type === 'url' ? 'url' : 'numeric'}
                              placeholder={type === 'url' ? 'https://' : undefined}
                              value={up && key === 'url' ? (assetBase ? `${assetBase}/${up.file}` : `images/${up.file}`) : (b[key] ?? '')}
                              onChange={ev => updateBlock(b.id, { [key]: ev.target.value })}
                              spellCheck={false}
                              disabled={!!(up && key === 'url')}
                              title={up && key === 'url' ? 'Using your uploaded image; remove it to paste a URL instead' : undefined}
                            />
                          )}
                          {b.type === 'image' && key === 'url' && (
                            <div className={e.uploadRow}>
                              {up ? (
                                <>
                                  {blobUrls[up.id] ? <img className={e.uploadThumb} src={blobUrls[up.id]} alt="" /> : <span className={e.uploadThumb} />}
                                  <span className={e.uploadName}>{up.file} · {up.w}×{up.h}</span>
                                  <button type="button" className={s.miniBtn} onClick={() => pickUpload({ key: upKey, upload: { name: `section-${b.id}`, maxW: 1200, mime: 'image/jpeg' } })}>Replace</button>
                                  <button type="button" className={s.miniBtn} onClick={() => removeUpload(upKey)}>Remove</button>
                                </>
                              ) : (
                                <button type="button" className={s.miniBtn} onClick={() => pickUpload({ key: upKey, upload: { name: `section-${b.id}`, maxW: 1200, mime: 'image/jpeg' } })}>↑ Upload image</button>
                              )}
                            <ImageLibraryPicker onPick={item => reuseLibraryImage({ key: upKey, upload: { name: `section-${b.id}`, maxW: 1200, mime: 'image/jpeg' } }, item)} />
</div>
                          )}
                          {type === 'align' && (
                            <div className={`${s.seg} ${e.blockSeg}`} role="radiogroup" aria-label={label}>
                              {[['left', 'Left'], ['center', 'Centre']].map(([v, l]) => (
                                <button key={v} type="button" role="radio" aria-checked={(b[key] || 'left') === v} className={`${s.segBtn} ${(b[key] || 'left') === v ? s.segBtnActive : ''}`} onClick={() => updateBlock(b.id, { [key]: v })}>{l}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {b.type === 'columns' && (
                        <>
                          <div className={e.blockInline}>
                            <span className={e.blockLabel}>Columns</span>
                            <div className={`${s.seg} ${e.blockSeg}`} role="radiogroup" aria-label="Number of columns">
                              {[2, 3, 4].map(c => (
                                <button key={c} type="button" role="radio" aria-checked={columnCount(b) === c} className={`${s.segBtn} ${columnCount(b) === c ? s.segBtnActive : ''}`} onClick={() => updateBlock(b.id, { count: c })}>{c}</button>
                              ))}
                            </div>
                          </div>
                          {Array.from({ length: columnCount(b) }, (_, i) => {
                            const k = i + 1;
                            const ckey = `blk:${b.id}:c${k}`;
                            const cup = uploads[ckey];
                            return (
                              <fieldset key={k} className={e.colBox}>
                                <legend className={e.colLegend}>Column {k}</legend>
                                {COLUMN_FIELDS.map(([suffix, label, type]) => {
                                  const key = `c${k}${suffix}`;
                                  const id = `blk-${b.id}-${key}`;
                                  return (
                                    <div key={key} className={e.blockField}>
                                      <label className={e.blockLabel} htmlFor={id}>{label}</label>
                                      {type === 'textarea' && <textarea id={id} data-rich={`blk:${b.id}:${key}`} className={s.textarea} rows={2} value={b[key] ?? ''} onChange={ev => updateBlock(b.id, { [key]: ev.target.value })} />}
                                      {type === 'text' && <input id={id} data-rich={suffix === 'Title' ? `blk:${b.id}:${key}` : undefined} className={s.input} value={b[key] ?? ''} onChange={ev => updateBlock(b.id, { [key]: ev.target.value })} />}
                                      {type === 'url' && (
                                        <input
                                          id={id}
                                          className={s.input}
                                          inputMode="url"
                                          placeholder="https://"
                                          spellCheck={false}
                                          value={cup && suffix === 'Image' ? (assetBase ? `${assetBase}/${cup.file}` : `images/${cup.file}`) : (b[key] ?? '')}
                                          disabled={!!(cup && suffix === 'Image')}
                                          title={cup && suffix === 'Image' ? 'Using your uploaded image; remove it to paste a URL instead' : undefined}
                                          onChange={ev => updateBlock(b.id, { [key]: ev.target.value })}
                                        />
                                      )}
                                      {suffix === 'Image' && (
                                        <div className={e.uploadRow}>
                                          {cup ? (
                                            <>
                                              {blobUrls[cup.id] ? <img className={e.uploadThumb} src={blobUrls[cup.id]} alt="" /> : <span className={e.uploadThumb} />}
                                              <span className={e.uploadName}>{cup.file} · {cup.w}×{cup.h}</span>
                                              <button type="button" className={s.miniBtn} onClick={() => pickUpload({ key: ckey, upload: { name: `section-${b.id}-c${k}`, maxW: 800, mime: 'image/jpeg' } })}>Replace</button>
                                              <button type="button" className={s.miniBtn} onClick={() => removeUpload(ckey)}>Remove</button>
                                            </>
                                          ) : (
                                            <button type="button" className={s.miniBtn} onClick={() => pickUpload({ key: ckey, upload: { name: `section-${b.id}-c${k}`, maxW: 800, mime: 'image/jpeg' } })}>↑ Upload image</button>
                                          )}
                                        <ImageLibraryPicker onPick={item => reuseLibraryImage({ key: ckey, upload: { name: `section-${b.id}-c${k}`, maxW: 800, mime: 'image/jpeg' } }, item)} />
</div>
                                      )}
                                    </div>
                                  );
                                })}
                              </fieldset>
                            );
                          })}
                          <p className={s.hint}>Columns sit side by side and stack on phones. Leave a field empty to leave it out.</p>
                        </>
                      )}
                      {!def.fields.length && !def.custom && <p className={s.hint}>No settings: drag it in the preview or pick a position.</p>}
                    </div>
                  )}
                </div>
              );
            })}
            <div className={e.addBlock}>
              <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={() => setAddOpen(o => !o)} aria-expanded={addOpen}>+ Add a section</button>
              {addOpen && (
                <div className={e.addMenu}>
                  {Object.entries(BLOCK_TYPES).map(([type, def]) => (
                    <button key={type} type="button" className={s.miniBtn} onClick={() => { addBlock(type); setAddOpen(false); }}>{def.label}</button>
                  ))}
                </div>
              )}
            </div>
            <p className={s.hint}>Add headings, text, buttons, images, columns (2 to 4, each with an image, text and a button), dividers or spacing anywhere in the email: pick a position, or drag a section in the preview. They’re saved with your design and included in every export.</p>
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
          </>
          )}
          </div>
        </aside>

        <div className={s.main} style={{ position: 'relative' }}>
          <PlaygroundTopAd />
          <div className={s.toolbar}>
            <div className={e.toolbarLeft}>
              {/* The page's H1: template name and version lead the preview toolbar */}
              {/* The page's H1: the template name, or the saved design's name once it's saved */}
              <h1 className={s.metaName} title={currentDesign ? `Saved design “${currentDesign.name}”` : undefined}>{currentDesign ? currentDesign.name : t.name}</h1>
              {currentDesign && dirty && <i className={s.dirtyDot} title="Unsaved changes" aria-label="Unsaved changes" />}
              <span className={s.toolbarSep} aria-hidden="true" />
              <div className={`${s.seg} ${e.toolSeg}`} role="radiogroup" aria-label="View">
                {[['preview', 'Preview'], ['html', 'HTML'], ['text', 'Text']].map(([v, l]) => (
                  <button key={v} type="button" role="radio" aria-checked={view === v} className={`${s.segBtn} ${view === v ? s.segBtnActive : ''}`} onClick={() => setView(v)}>{l}</button>
                ))}
              </div>
              {view === 'preview' && (
                <>
                  <div className={`${s.seg} ${e.toolSeg}`} role="radiogroup" aria-label="Device">
                    {[
                      ['desktop', 'Desktop', <svg key="d" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>],
                      ['mobile', 'Mobile', <svg key="m" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>],
                    ].map(([v, l, icon]) => (
                      <button key={v} type="button" role="radio" aria-checked={device === v} aria-label={`${l} preview`} title={`${l} preview`} className={`${s.segBtn} ${e.iconSeg} ${device === v ? s.segBtnActive : ''}`} onClick={() => setDevice(v)}>{icon}</button>
                    ))}
                  </div>
                  <label className={`${s.check} ${e.toolCheck}`}><input type="checkbox" checked={dark} onChange={ev => setDark(ev.target.checked)} /> Dark mode</label>
                </>
              )}
            </div>
            <div className={e.toolbarRight}>
              <HistoryButtons onUndo={undo} onRedo={redo} onReset={() => setState({ ...defaultEmailState(t), assetBase: state.assetBase || '' })} canUndo={canUndo} canRedo={canRedo} />
              <SaveButton
                onClick={quickSave}
                busy={busy === 'save'}
                saved={justSaved}
                dirty={dirty}
                disabled={!!busy}
                title={currentDesign ? (dirty ? `Save changes to “${currentDesign.name}” (Ctrl+S)` : `“${currentDesign.name}” is saved`) : 'Save to My designs (Ctrl+S)'}
                saveAs={{ defaultName: currentDesign ? `${currentDesign.name} (copy)` : nextName(), onSave: name => saveNewDesign(name) }}
                menu={currentDesign ? [{ label: 'Detach', sub: `Keep editing without changing “${currentDesign.name}”`, onClick: () => { setCurrentDesign(null); flash('Detached. Save now creates a new design.'); } }] : []}
              />
              <span className={s.toolbarSep} aria-hidden="true" />
              <ForkButton onClick={forkToMyCode} busy={busy === 'fork'} disabled={!!busy} />
              <ExportMenu
                head="Export this email as…"
                options={[
                  { icon: 'html', label: 'Copy HTML', sub: 'Paste into Mailchimp, Klaviyo or your code', onClick: () => copy(html, 'Email HTML', (Object.keys(uploads).length || Object.keys(brandIcons).length) && !assetBase ? 'HTML copied. Uploaded images and brand-colour icons link to images/, so set an Image base URL or use Download ZIP.' : '') },
                  { icon: 'zip', label: busy === 'zip' ? 'Zipping…' : 'Download ZIP', sub: 'HTML, plain text and your uploaded images', onClick: downloadZip, disabled: !!busy },
                  { icon: 'file', label: 'Download .html', sub: 'The email as a single HTML file', onClick: () => saveBlob(new Blob([html], { type: 'text/html' }), `${t.id}-email.html`) },
                  { icon: 'text', label: 'Copy plain text', sub: 'The text version for multipart email', onClick: () => copy(text, 'Plain-text version') },
                ]}
              />
            </div>
          </div>

          <div className={e.stage}>
            {view === 'preview' && (
              <>
                <div className={`${e.device} ${device === 'mobile' ? e.deviceMobile : ''}`} style={{ width: frameW }}>
                  {origin && <EmailFrame key={`${device}-${dark}`} html={previewHtml} width={frameW} onDoc={bindPreview} />}
                </div>
                <p className={e.stageHint}>Click any text to edit it right here · click an image or link to jump to its setting</p>
              </>
            )}
            {view !== 'preview' && (
              <div className={e.codeWrap}>
                <button type="button" className={`${e.codeCopy} ${codeCopied ? e.codeCopied : ''}`} onClick={copyCode} aria-live="polite">{codeCopied ? 'Copied ✓' : 'Copy'}</button>
                {view === 'html'
                  ? <pre className={e.code}><code dangerouslySetInnerHTML={{ __html: highlightedHtml }} /></pre>
                  : <pre className={e.code}><code>{text}</code></pre>}
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
