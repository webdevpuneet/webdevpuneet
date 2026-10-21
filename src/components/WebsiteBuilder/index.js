'use client';

/* Website Builder (/website-builder/editor/; /website-builder/ is the template gallery): stack navbars, sections and footers from the
   Website Section Templates library into one page with one theme, edit every section in
   place, preview it on any device and export the whole page.

   Pages are saved in this browser (IndexedDB `wdp-website-pages`, record tpl "page");
   uploaded images go to the section asset store with keys `page:<uid>:<field>:<id>`. */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import b from './styles.module.css';
import x from '../SectionTemplates/styles.module.css';
import { ExportMenu, ForkButton, HistoryButtons, SaveButton } from '@/components/ToolbarActions';
import { dbPut } from '@/lib/uiSnippetsDb';
import { openForkTab } from '@/lib/open-fork-tab';
import ConfirmDialog from '@/components/SocialPostTemplates/ConfirmDialog';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { BrandKitPanel, loadKit, kitIsSet, saveKit } from '@/components/BrandKit';
import { makeDesignStore } from '@/lib/design-store';
import { exportDesigns, importDesigns, blobToDataUrl, dataUrlToBlob } from '@/lib/design-transfer';
import { loadCustomFonts, onFontsChange, customFontFaceCss, exportCustomFonts, importCustomFonts } from '@/lib/fonts';
import { SECTION_TEMPLATES, SECTION_CATEGORIES, sectionTemplateById, sectionCategoryById } from '@/components/SectionTemplates/templates/index.js';
import { pageCss, pageMarkup, pageScript, pageCdn, emptyPage, newPageSection, newUid, restorePage, pageDocumentHtml, STARTERS, pageFromStarter, cleanAnchor, defaultAnchor } from '@/components/SectionTemplates/templates/page.js';
import { restoreSectionState } from '@/components/SectionTemplates/templates/index.js';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';

if (typeof window !== 'undefined') gsap.registerPlugin(Draggable, Flip);
import { ContentPanel, ThemePanel, withKit } from '@/components/SectionTemplates/panels';
import { bindInlineEdit, fieldOfTarget, useFrozenPreview } from '@/components/SectionTemplates/inline-edit';
import { putAsset, getAsset } from '@/components/SectionTemplates/storage';
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
const SELECT_CSS = 'section[data-uid]{cursor:pointer}section[data-uid].wb-on{outline:3px solid #6366f1;outline-offset:-3px}section[data-uid]:hover:not(.wb-on){outline:2px dashed rgba(99,102,241,.6);outline-offset:-2px}';

/* The live page: an iframe at the device width, scaled to fit the stage, keeping its
   scroll position across updates. Clicking a section selects it. */
function PageFrame({ html, width, height, scale, selected, onSelect, onKey, onDoc }) {
  const ref = useRef(null);
  const onDocRef = useRef(onDoc);
  onDocRef.current = onDoc;
  const scrollY = useRef(0);
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return undefined;
    const onLoad = () => {
      const doc = frame.contentDocument;
      if (!doc) return;
      const win = frame.contentWindow;
      win.scrollTo(0, scrollY.current);
      win.addEventListener('scroll', () => { scrollY.current = win.scrollY; }, { passive: true });
      doc.addEventListener('click', ev => {
        const a = ev.target.closest?.('a');
        if (a) {
          ev.preventDefault();
          // In-page links (#pricing) scroll the preview to that section (not buttons, whose
          // clicks edit their text or point to their link field)
          const href = a.getAttribute('href') || '';
          if (href.length > 1 && href.startsWith('#') && !ev.target.closest('[data-st-editing],[data-href],[data-i-href]')) { doc.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        }
        const sec = ev.target.closest?.('section[data-uid]');
        if (sec) onSelect(sec.getAttribute('data-uid'));
      });
      doc.addEventListener('submit', ev => ev.preventDefault());
      // Undo / redo / save shortcuts keep working while the preview has focus
      doc.addEventListener('keydown', ev => onKey?.(ev));
      onDocRef.current?.(doc);
      doc.querySelectorAll('section[data-uid]').forEach(el => el.classList.toggle('wb-on', el.getAttribute('data-uid') === selected));
    };
    frame.addEventListener('load', onLoad);
    return () => frame.removeEventListener('load', onLoad);
  }, [html]); // eslint-disable-line react-hooks/exhaustive-deps
  // Selection changes only move the outline (no reload) and bring the section into view
  useEffect(() => {
    const doc = ref.current?.contentDocument;
    if (!doc) return;
    let target = null;
    doc.querySelectorAll('section[data-uid]').forEach(el => { const on = el.getAttribute('data-uid') === selected; el.classList.toggle('wb-on', on); if (on) target = el; });
    if (target) {
      const r = target.getBoundingClientRect();
      if (r.top < 0 || r.top > ref.current.contentWindow.innerHeight * 0.6) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [selected]);
  return (
    <div className={b.frameBox} style={{ width: width * scale, height: height * scale }}>
      <iframe ref={ref} title="Page preview" srcDoc={html} className={b.frame} style={{ width, height, transform: scale !== 1 ? `scale(${scale})` : undefined }} />
    </div>
  );
}

/* The page's sections as a list. Drag a row by its handle (GSAP Draggable): the other
   rows slide out of the way, and on release everything Flips into the new order.
   The ↑ ↓ buttons do the same from the keyboard. */
function SectionList({ sections, selected, onOpen, onMove, onReorder, onDuplicate, onRemove }) {
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
              <span className={b.rowText}><b>{t?.name}</b><small>{sectionCategoryById(t?.category)?.label}{x.anchor ? ` · #${x.anchor}` : ''}</small></span>
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

export default function WebsiteBuilder() {
  const [page, setPageRaw] = useState(emptyPage);
  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState('page'); // page | theme | pages | backup
  const [editing, setEditing] = useState(null); // uid whose content is open
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);
  const [pickCat, setPickCat] = useState('all');
  const [device, setDevice] = useState('desktop');
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const [playing, setPlaying] = useState(0);
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

  /* Undo / redo (typing bursts grouped per 600 ms) */
  const past = useRef([]);
  const future = useRef([]);
  const lastPush = useRef(0);
  const [, setHistTick] = useState(0);
  const setPage = useCallback(next => {
    setPageRaw(prev => {
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
  const undo = useCallback(() => { setPageRaw(prev => { const p = past.current.pop(); if (!p) return prev; future.current.push(prev); lastPush.current = 0; return p; }); setHistTick(n => n + 1); }, []);
  const redo = useCallback(() => { setPageRaw(prev => { const n = future.current.pop(); if (!n) return prev; past.current.push(prev); lastPush.current = 0; return n; }); setHistTick(n => n + 1); }, []);

  /* Restore: ?page=<id> opens a saved page, otherwise the autosave */
  useEffect(() => {
    setOrigin(window.location.origin);
    let live = true;
    (async () => {
      const id = new URLSearchParams(window.location.search).get('page');
      let done = false;
      if (id) {
        const d = await store.getDesign(id).catch(() => null);
        if (d && live) { const p = restorePage(d.state); setPageRaw(p); savedJson.current = JSON.stringify(p); setCurrent({ id: d.id, name: d.name }); done = true; }
      }
      if (!done) { const auto = await store.getAutosave(AUTOSAVE).catch(() => null); if (auto && live) setPageRaw(restorePage(auto)); }
      // ?starter=<id> from a website template page (or ?starter=blank, "Start from scratch"
      // on /website-builder/): open that template. The current page, if it has sections and
      // isn't saved, is kept in My pages first so nothing is lost.
      const starterId = new URLSearchParams(window.location.search).get('starter');
      const blank = starterId === 'blank';
      if (live && starterId && (blank || STARTERS.some(x => x.id === starterId))) {
        const auto = await store.getAutosave(AUTOSAVE).catch(() => null);
        const prev = auto ? restorePage(auto) : null;
        let kept = '';
        if (!done && prev?.sections?.length) {
          const rec = await store.saveDesign({ name: `${prev.name} (autosaved)`, tpl: 'page', state: prev }).catch(() => null);
          if (rec) kept = ` Your previous page was saved to My pages as “${rec.name}”.`;
        }
        const next = blank ? emptyPage() : pageFromStarter(starterId);
        if (live) {
          setPageRaw(next);
          setCurrent(null); savedJson.current = null;
          setToast(blank ? `New empty page. Add a navbar, hero and more from the list.${kept}` : `Opened the ${next.name} template. Click any section to edit it.${kept}`);
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
      // "Add to Website Builder" from a section editor: append that section to the page
      if (live && new URLSearchParams(window.location.search).get('add')) {
        let incoming = null;
        try { incoming = JSON.parse(localStorage.getItem(INCOMING_KEY) || 'null'); localStorage.removeItem(INCOMING_KEY); } catch { /* storage blocked */ }
        const t = incoming && Date.now() - (incoming.at || 0) < 10 * 60 * 1000 ? sectionTemplateById(incoming.tpl) : null;
        if (t) {
          setPageRaw(p => {
            const sec = { uid: newUid(), tpl: t.id, anchor: defaultAnchor(t.id, p.sections), state: restoreSectionState(t, incoming.state) };
            setSelected(sec.uid);
            return { ...p, sections: [...p.sections, sec] };
          });
          setToast(`Added your ${t.name} to the page. It now uses the page’s theme; change colours and fonts in the Theme tab.`);
        }
        window.history.replaceState(null, '', window.location.pathname);
      }
      if (live) setHydrated(true);
    })();
    return () => { live = false; };
  }, []);
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => { store.putAutosave(AUTOSAVE, page).catch(() => {}); }, 600);
    return () => clearTimeout(tm);
  }, [page, hydrated]);
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

  /* Uploaded images across every section: object URLs for the preview */
  const allUploads = useMemo(() => page.sections.flatMap(sec => Object.entries(sec.state.uploads || {}).map(([k, u]) => ({ uid: sec.uid, k, ...u }))), [page.sections]);
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
  const uploadOf = (uid, k) => page.sections.find(x => x.uid === uid)?.state.uploads?.[k];
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
  const startFrom = starterId => {
    const p = pageFromStarter(starterId);
    setPage(p);
    setCurrent(null); savedJson.current = null; setSelected(null); setEditing(null);
    flash(`Started a ${STARTERS.find(x => x.id === starterId)?.name.toLowerCase()} with ${p.sections.length} sections. Edit any section, or change the theme for the whole page.`);
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
      setSectionState(uid, st => ({ ...st, uploads: { ...st.uploads, [ukey]: { id: key, file: name, w: out.w, h: out.h } } }));
      flash(`Uploaded ${file.name} (${out.w}×${out.h}). Saved in this browser.`);
    } catch (err) { flash(err.message || 'Upload failed'); }
  };

  /* Preview */
  const previewHtml = useMemo(() => previewImages(pageDocumentHtml(page, {
    imageSrc: previewSrc, clean: false, fontFaces, motion: playing > 0,
    extraHead: `<script>window.ST_PREVIEW=true</script><style>${SELECT_CSS}</style>`,
  }), origin), [page, blobUrls, fontFaces, origin, playing]); // eslint-disable-line react-hooks/exhaustive-deps
  /* Click-to-edit: text is typed right in the page preview, any other bound element opens
     its section and points to its input. The preview doesn't reload while text is edited. */
  const [shownHtml, editStart, editEnd] = useFrozenPreview(previewHtml);
  const [reveal, setReveal] = useState(null);
  const sectionsRef = useRef(page.sections);
  sectionsRef.current = page.sections;
  const onPreviewDoc = useCallback(doc => bindInlineEdit(doc, {
    resolve: tg => {
      const sec = tg?.uid && sectionsRef.current.find(o => o.uid === tg.uid);
      return sec ? fieldOfTarget(sectionTemplateById(sec.tpl), tg) : null;
    },
    onInput: (tg, v) => setSectionState(tg.uid, p => (tg.list
      ? { ...p, lists: { ...p.lists, [tg.list]: (p.lists?.[tg.list] || []).map(it => (it._id === tg.item ? { ...it, [tg.key]: v } : it)) } }
      : { ...p, fields: { ...p.fields, [tg.key]: v } })),
    onReveal: (tg, focus) => { setReveal({ ...tg, focus, n: Date.now() }); openSection(tg.uid); },
    onStart: editStart,
    onEnd: editEnd,
  }), [editStart, editEnd]); // eslint-disable-line react-hooks/exhaustive-deps
  const stillJson = JSON.stringify({ ...page, motion: null });
  useEffect(() => { setPlaying(0); }, [stillJson]);
  const dev = DEVICES.find(d => d.id === device) || DEVICES[0];
  const scale = stage.w ? Math.min(1, (stage.w - 32) / dev.w) : 0;
  const frameH = stage.h && scale ? Math.max(400, Math.round((stage.h - 32) / scale)) : 800;

  /* Export */
  const fileBase = slugify(page.name);
  const downloadHtml = async () => {
    setBusy('html');
    const urls = await dataUrls();
    saveBlob(new Blob([pageDocumentHtml(page, { imageSrc: (uid, k) => urls[`${uid}|${k}`] || '', fontFaces })], { type: 'text/html' }), `${fileBase}.html`);
    flash('Downloaded your page as one HTML file (images embedded).');
    setBusy('');
  };
  const copyHtml = async () => {
    setBusy('copy');
    const urls = await dataUrls();
    try { await navigator.clipboard.writeText(pageDocumentHtml(page, { imageSrc: (uid, k) => urls[`${uid}|${k}`] || '', fontFaces })); flash('Page HTML copied.'); }
    catch { flash('Copy was blocked by the browser, so use Download instead.'); }
    setBusy('');
  };
  /* Fork: the whole page as one editable snippet in My Code (opens in a new tab) */
  const forkToMyCode = async () => {
    const tab = openForkTab();
    setBusy('fork');
    try {
      const urls = await dataUrls();
      const now = new Date().toISOString();
      const rid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `wb-${Date.now().toString(36)}`;
      const gf = pageDocumentHtml(page, { fontFaces }).match(/<link href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)?.[1];
      /* On localhost the production image URLs aren't live yet, so point them at this origin */
      const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
        ? str => str.split('https://webdevpuneet.com/images/').join(`${location.origin}/images/`)
        : str => str;
      const js = pageScript(page);
      await dbPut({
        id: rid,
        name: `${page.name || 'My website'} (page)`,
        tags: ['page'],
        cdnUrls: [...(gf ? [gf] : []), ...(js ? pageCdn(page) : [])],
        html: local(pageMarkup(page, { imageSrc: (uid, k) => urls[`${uid}|${k}`] || '', clean: true })),
        css: local(`body{margin:0;background:${page.theme?.bg || '#fff'}}
html{scroll-behavior:smooth}section[id]{scroll-margin-top:84px}
${pageCss(page, { fontFaces })}`),
        js: js || '',
        createdAt: now,
        updatedAt: now,
      });
      tab.go(rid);
      flash('Forked to My Code. It opened in a new tab.');
    } catch (err) { tab.cancel(); flash(`Couldn't save to My Code: ${err.message}`); }
    setBusy('');
  };
  const downloadZip = async () => {
    setBusy('zip');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const dir = zip.folder(fileBase);
      let html = pageDocumentHtml(page, { imageSrc: relativeSrc, fontFaces });
      const seen = new Set();
      for (const u of allUploads) {
        if (seen.has(u.file)) continue;
        const rec = await getAsset(u.id).catch(() => null);
        if (rec?.blob) { dir.file(`assets/${u.file}`, rec.blob); seen.add(u.file); }
      }
      let missed;
      ({ html, missed } = await localizeImages(html, dir, seen));
      dir.file('index.html', html);
      dir.file('README.txt', [
        `${page.name}: built with the free Website Builder, https://webdevpuneet.com/website-builder/`,
        '',
        'index.html   the complete page (HTML with the CSS in a <style> tag)',
        seen.size ? `assets/      every image the page uses (${seen.size})` : '',
        missed ? `             ${missed} image${missed > 1 ? 's' : ''} could not be downloaded and still load from their original URL.` : '',
        '',
        'Upload the folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages) or open index.html.',
        'Every colour, font and size is a CSS variable at the top of the CSS (--st-brand, --st-font-heading …).',
      ].filter(Boolean).join('\n'));
      saveBlob(await zip.generateAsync({ type: 'blob' }), `${fileBase}.zip`);
      flash(`Downloaded ZIP${seen.size ? ` with ${seen.size} image${seen.size > 1 ? 's' : ''} in assets/` : ''}${missed ? ` (${missed} kept as links)` : ''}.`);
    } catch (err) { flash(`ZIP failed: ${err.message}`); }
    setBusy('');
  };

  /* My pages */
  const dirty = !!current && savedJson.current !== null && savedJson.current !== JSON.stringify(page);
  const saveNew = async name => {
    setBusy('save');
    try {
      const nm = name.trim() || page.name;
      const next = { ...page, name: nm };
      const rec = await store.saveDesign({ name: nm, tpl: 'page', state: next });
      setPageRaw(next);
      savedJson.current = JSON.stringify(next);
      setCurrent({ id: rec.id, name: rec.name });
      setJustSaved(true); setTimeout(() => setJustSaved(false), 1500);
      flash(`Saved “${rec.name}” to My pages`);
    } catch (err) { flash(`Couldn't save: ${err.message}`); }
    setBusy('');
  };
  const quickSave = async () => {
    if (!current) return saveNew(page.name);
    setBusy('save');
    try {
      const old = await store.getDesign(current.id).catch(() => null);
      await store.saveDesign({ ...(old || {}), id: current.id, name: page.name, tpl: 'page', state: page });
      savedJson.current = JSON.stringify(page);
      setCurrent({ id: current.id, name: page.name });
      setJustSaved(true); setTimeout(() => setJustSaved(false), 1500);
    } catch (err) { flash(`Couldn't save: ${err.message}`); }
    setBusy('');
  };
  saveRef.current = quickSave;
  const openPage = d => {
    const p = restorePage(d.state);
    setPage(p);
    savedJson.current = JSON.stringify(p);
    setCurrent({ id: d.id, name: d.name });
    setSelected(null); setEditing(null); setTab('page');
    flash(`Opened “${d.name}”`);
  };
  const deletePage = d => setConfirm({
    title: `Delete “${d.name}”?`,
    body: 'This removes the saved page from this browser. Your autosave stays.',
    okLabel: 'Delete',
    danger: true,
    onOk: async () => { await store.deleteDesign(d.id); if (current?.id === d.id) { setCurrent(null); savedJson.current = null; } flash(`Deleted “${d.name}”`); },
  });
  const newPage = () => setConfirm({
    title: 'Start a new page?',
    body: current ? 'Your saved page stays in My pages.' : 'The current page is not saved in My pages. Save it first if you want to keep it (it stays in the autosave until you change the new page).',
    okLabel: 'New page',
    onOk: () => { setPage(emptyPage()); setCurrent(null); savedJson.current = null; setSelected(null); setEditing(null); setTab('page'); },
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
          const ids = [...new Set(ds.flatMap(d => (d.state?.sections || []).flatMap(x => Object.values(x.state?.uploads || {}).map(u => u.id))))];
          const out = [];
          for (const key of ids) { const rec = await getAsset(key).catch(() => null); if (rec?.blob) out.push({ key, data: await blobToDataUrl(rec.blob), type: rec.type, name: rec.file || rec.name, w: rec.w, h: rec.h }); }
          return out;
        },
        getFonts: async ds => { const ids = [...new Set(ds.flatMap(d => Object.values(d.state?.fonts || {})).filter(id => String(id).startsWith('c:')))]; return ids.length ? exportCustomFonts(ids) : []; },
        brandKit: kitIsSet(kit) ? kit : undefined,
      });
      flash(`Exported ${r.count} page${r.count === 1 ? '' : 's'} (${(r.bytes / 1024 / 1024).toFixed(2)} MB).`);
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
        knownTemplate: tid => tid === 'page',
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
      if (r.added) parts.push(`${r.added} page${r.added > 1 ? 's' : ''} added`);
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
          <div className={s.panelTabs} role="tablist" aria-label="Panel" onClickCapture={() => setSheetOpen(true)}>
            {[['page', 'Page'], ['theme', 'Theme'], ['pages', `My pages`], ['backup', 'Backup']].map(([v, l]) => (
              <button key={v} type="button" role="tab" aria-selected={tab === v} className={tab === v ? s.panelTabOn : ''} onClick={() => { setTab(v); if (v !== 'page') setEditing(null); }}>
                {l}{v === 'pages' && <span className={s.panelTabCount}>{pages.length}</span>}
              </button>
            ))}
          </div>
          <div className={s.controlsScroll}>
            {tab === 'page' && editSec && editTpl ? (
              <>
                <section className={s.section}>
                  <div className={b.editHead}>
                    <button type="button" className={b.back} onClick={() => setEditing(null)}>← Sections</button>
                    <span className={b.editTitle}><b>{editTpl.name}</b><small>{sectionCategoryById(editTpl.category)?.label} · theme and animation are set for the whole page</small></span>
                  </div>
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
                  <label className={s.label} htmlFor="wb-name">Page title</label>
                  <input id="wb-name" className={`${s.input} ${b.pageName}`} value={page.name} maxLength={80} onChange={ev => setPage(p => ({ ...p, name: ev.target.value }))} />
                  <p className={s.hint}>Used as the page’s &lt;title&gt; in your export and as its name in My pages.</p>
                </section>
                <section className={s.section}>
                  <h2 className={s.sectionTitle}>Sections {page.sections.length > 0 && <span style={{ opacity: 0.6, fontWeight: 500 }}>({page.sections.length})</span>}</h2>
                  {page.sections.length === 0 && !adding && (
                    <>
                      <p className={s.hint}>Start from a template, or add sections one by one. <a href="/website-builder/" target="_blank" rel="noopener">Browse all templates ↗</a></p>
                      <div className={b.starters}>
                        {STARTERS.map(st => (
                          <button key={st.id} type="button" className={b.starter} onClick={() => startFrom(st.id)} title={st.blurb}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/images/website-templates/thumb/${st.id}.jpg`} alt="" loading="lazy" />
                            <b>{st.name}</b><small>{st.industry} · {st.sections.length} sections</small>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  <SectionList
                    sections={page.sections}
                    selected={selected}
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
                {page.sections.length > 0 && <p className={s.hint} style={{ padding: '0 16px 16px' }}>Tip: click any section in the preview to edit it. Colours, fonts and animation are in the Theme tab and apply to the whole page.</p>}
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
                <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={newPage}>+ New page</button>
                {pages.length === 0 && <p className={s.designsEmpty}>No saved pages yet. Click Save in the toolbar (or press Ctrl+S) to keep this page.</p>}
                {pages.length > 0 && (
                  <ul className={`${s.designList} ${s.designListTab}`} style={{ marginTop: 12 }}>
                    {pages.map(d => (
                      <li key={d.id} className={`${s.designItem} ${current?.id === d.id ? s.designItemOn : ''}`}>
                        <button type="button" className={s.designOpen} onClick={() => openPage(d)} title="Open this page" style={{ borderBottom: `3px solid ${d.state?.theme?.brand || '#4f46e5'}` }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={previewOf(d.state?.sections?.[1]?.tpl || d.state?.sections?.[0]?.tpl || 'saas-split-hero')} alt="" style={{ objectPosition: 'top' }} />
                        </button>
                        <span className={s.designMeta}>
                          <b title={d.name}>{d.name}</b>
                          <small>{(d.state?.sections || []).length} sections</small>
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
                <p className={s.hint}>Pages are saved in this browser, with your uploaded images. Rename a page with the Page title field, then Save.</p>
              </section>
            ) : (
              <section className={s.section}>
                <h2 className={s.sectionTitle}>Export</h2>
                <p className={s.transferText}>Download all {pages.length} saved page{pages.length === 1 ? '' : 's'} as one backup file, with your uploaded images, uploaded fonts and brand kit.</p>
                <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} onClick={exportAll} disabled={!!busy || !pages.length}>{busy === 'export' ? 'Exporting…' : '⤓ Export pages'}</button>
                <h2 className={s.sectionTitle} style={{ marginTop: 22 }}>Import</h2>
                <p className={s.transferText}>Add pages from a backup file. Nothing you already have is changed.</p>
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
              <h1 className={s.metaName} title={page.name}>{page.name}</h1>
              {current && dirty && <i className={s.dirtyDot} title="Unsaved changes" aria-label="Unsaved changes" />}
              <span className={s.toolbarSep} aria-hidden="true" />
              <div className={`${s.seg} ${x.toolSeg}`} role="radiogroup" aria-label="Device">
                {DEVICES.map(d => (
                  <button key={d.id} type="button" role="radio" aria-checked={device === d.id} aria-label={`${d.label} preview (${d.w}px)`} title={`${d.label} · ${d.w}px`} className={`${s.segBtn} ${x.iconSeg} ${device === d.id ? s.segBtnActive : ''}`} onClick={() => setDevice(d.id)}>{d.icon}</button>
                ))}
              </div>
              {page.motion?.preset !== 'none' && page.sections.length > 0 && (
                <button type="button" className={`${s.miniBtn} ${x.toolBtn}`} onClick={() => setPlaying(n => n + 1)} title="Play animation">▶ Play</button>
              )}
            </div>
            <div className={s.toolbarRight} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Reset clears the page; it is one undo step, so Ctrl+Z brings everything back */}
              <HistoryButtons onUndo={undo} onRedo={redo} onReset={() => { setPage(emptyPage()); setSelected(null); setEditing(null); flash('Page cleared. Press Undo (Ctrl+Z) to bring it back.'); }} canUndo={past.current.length > 0} canRedo={future.current.length > 0} />
              <SaveButton
                onClick={quickSave}
                busy={busy === 'save'}
                saved={justSaved}
                dirty={dirty}
                disabled={!!busy}
                title={current ? (dirty ? `Save changes to “${current.name}” (Ctrl+S)` : `“${current.name}” is saved`) : 'Save to My pages (Ctrl+S)'}
                saveAs={{ defaultName: current ? `${page.name} (copy)` : page.name, onSave: name => saveNew(name) }}
                menu={current ? [{ label: 'Detach', sub: `Keep editing without changing “${current.name}”`, onClick: () => { setCurrent(null); savedJson.current = null; flash('Detached. Save now creates a new page.'); } }] : []}
              />
              <span className={s.toolbarSep} aria-hidden="true" />
              <ExportMenu
                head="Export this page as…"
                options={[
                  { icon: 'file', label: busy === 'html' ? 'Preparing…' : 'Download .html', sub: 'One file, images embedded, works offline', onClick: downloadHtml, disabled: !!busy || !page.sections.length },
                  { icon: 'zip', label: busy === 'zip' ? 'Zipping…' : 'Download ZIP', sub: 'index.html plus an assets folder with every image', onClick: downloadZip, disabled: !!busy || !page.sections.length },
                  { icon: 'html', label: 'Copy HTML', sub: 'The whole page, CSS included', onClick: copyHtml, disabled: !!busy || !page.sections.length },
                ]}
              />
              <ForkButton onClick={forkToMyCode} busy={busy === 'fork'} disabled={!!busy || !page.sections.length} />
            </div>
          </div>

          <div className={b.stage} ref={stageRef}>
            {page.sections.length === 0 ? (
              <div className={b.empty}>
                <h2>Build a page from sections</h2>
                <p>Pick a starter page or add sections from the panel: navbars, heroes, features, pricing, testimonials, FAQ, CTA, footers and more. They all share one theme, so the page always looks like one website.</p>
              </div>
            ) : origin && scale > 0 && (
              <PageFrame key={device} html={shownHtml} width={dev.w} height={frameH} scale={scale} selected={selected} onSelect={openSection} onKey={onKey} onDoc={onPreviewDoc} />
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
