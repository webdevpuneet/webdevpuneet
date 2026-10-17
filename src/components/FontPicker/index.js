'use client';

/* Searchable font picker: the built-in picks, every Google Font (loaded on demand, each
   row previewed in its own face) and fonts the user uploads (kept in this browser).
   Values are font ids from src/lib/fonts.js. */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import {
  BUILTIN_FONTS, FONT_CATEGORIES, CUSTOM_FONT_EXT, resolveFont, googleFontId, loadGoogleCatalog,
  loadCustomFonts, customFonts, addCustomFont, removeCustomFont, onFontsChange,
  loadPreview, previewFamily, recentFonts, rememberFont,
} from '@/lib/fonts';

const PAGE = 60;
const BUILTIN_CAT = { serif: 'e', monospace: 'm' };
const builtinCat = f => (f.id === 'bebas' || f.id === 'oswald' ? 'd' : BUILTIN_CAT[f.fallback] || (f.id === 'georgia' ? 'e' : 's'));

export default function FontPicker({ value, onChange, id, allowCustom = true, label = 'Font' }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [catalog, setCatalog] = useState(null);
  const [limit, setLimit] = useState(PAGE);
  const [active, setActive] = useState(0);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [, setTick] = useState(0);
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const listRef = useRef(null);
  const fileRef = useRef(null);
  const searchRef = useRef(null);

  // Uploaded fonts register once per page; re-render when they change
  useEffect(() => {
    loadCustomFonts();
    return onFontsChange(() => setTick(n => n + 1));
  }, []);
  const current = resolveFont(value);
  useEffect(() => { if (current.kind === 'google' || current.family) loadPreview(current.family); }, [current.family, current.kind]);

  // Catalog loads the first time the picker opens
  useEffect(() => {
    if (!open) return;
    if (!catalog) loadGoogleCatalog().then(setCatalog);
    setTimeout(() => searchRef.current?.focus(), 0);
  }, [open, catalog]);
  useEffect(() => { setLimit(PAGE); setActive(0); }, [q, cat]);

  // Fixed-position popover under the button (side panels scroll and would clip it)
  useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (!r) return;
      const w = Math.min(320, window.innerWidth - 16);
      const left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8));
      const below = window.innerHeight - r.bottom;
      const h = Math.min(420, Math.max(below, r.top) - 12);
      setPos(below >= 300 || below >= r.top ? { left, top: r.bottom + 4, width: w, maxHeight: h } : { left, bottom: window.innerHeight - r.top + 4, width: w, maxHeight: h });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [open]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return undefined;
    const down = e => { if (!popRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) setOpen(false); };
    const key = e => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); } };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('keydown', key); };
  }, [open]);

  /* Rows: [{ type:'head', text } | { type:'font', id, label, family, preview, cat, kind }] */
  const { rows, more, total } = useMemo(() => {
    if (!open) return { rows: [], more: 0, total: 0 };
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const match = (name, c) => (cat === 'all' || c === cat) && words.every(w => name.toLowerCase().includes(w));
    const out = [];
    const seen = new Set();
    const push = (head, list) => {
      const fresh = list.filter(r => !seen.has(r.id));
      if (!fresh.length) return;
      out.push({ type: 'head', text: head });
      fresh.forEach(r => { seen.add(r.id); out.push(r); });
    };
    const mine = allowCustom ? customFonts().map(f => ({ type: 'font', id: f.id, label: f.name, family: f.family, preview: `"${f.family}"`, cat: 'custom', kind: 'custom' })) : [];
    push('Your uploaded fonts', mine.filter(r => cat === 'all' && words.every(w => r.label.toLowerCase().includes(w))));
    if (!words.length) {
      const recent = recentFonts().map(resolveFont).filter(f => f.kind === 'google' && (cat === 'all' || f.cat === cat))
        .map(f => ({ type: 'font', id: f.id, label: f.label, family: f.family, preview: `"${previewFamily(f.family)}"`, cat: f.cat, kind: 'google' }));
      push('Recently used', recent);
    }
    const builtin = BUILTIN_FONTS.map(f => ({ type: 'font', id: f.id, label: f.label, family: f.family, preview: f.family ? `"${previewFamily(f.family)}"` : f.stack, cat: builtinCat(f), kind: 'builtin' }))
      .filter(r => match(r.label, r.cat));
    push('Popular picks', builtin);
    const all = (catalog || []).filter(row => match(row[0], row[1]));
    const google = all.slice(0, limit).map(row => {
      const fid = googleFontId(row);
      return { type: 'font', id: fid, label: row[0], family: row[0], preview: `"${previewFamily(row[0])}"`, cat: row[1], kind: 'google' };
    });
    push(catalog ? `All Google Fonts (${all.length.toLocaleString()})` : 'Loading Google Fonts…', google);
    return { rows: out, more: Math.max(0, all.length - limit), total: all.length };
  }, [open, q, cat, catalog, limit, allowCustom]);
  const fontRows = rows.filter(r => r.type === 'font');

  // Preview each visible row in its own face (tiny subsets, loaded as rows scroll in)
  useEffect(() => {
    const list = listRef.current;
    if (!open || !list) return undefined;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const fam = en.target.dataset.family;
        if (fam) loadPreview(fam).then(() => { en.target.dataset.ready = '1'; });
        io.unobserve(en.target);
      });
    }, { root: list, rootMargin: '120px' });
    list.querySelectorAll('[data-family]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [open, rows]);

  const pick = r => {
    rememberFont(r.id);
    onChange(r.id);
    setOpen(false);
    btnRef.current?.focus();
  };
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(fontRows.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && fontRows[active]) { e.preventDefault(); pick(fontRows[active]); }
  };
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const upload = async file => {
    if (!file) return;
    setError('');
    setBusy(true);
    try {
      const fid = await addCustomFont(file);
      onChange(fid);
      setOpen(false);
    } catch (err) {
      setError(err.message || 'That font couldn’t be added.');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  let idx = -1;
  return (
    <div className={s.wrap}>
      <button
        ref={btnRef}
        id={id}
        type="button"
        className={s.trigger}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${current.label}`}
        title={current.label}
      >
        <span className={s.triggerText} style={{ fontFamily: current.kind === 'custom' ? `"${current.family}"` : current.family ? `"${previewFamily(current.family)}", "${current.family}", var(--font-ui)` : current.stack }}>{current.label}</span>
        <span className={s.caret} aria-hidden="true">▾</span>
      </button>
      {open && pos && (
        <div ref={popRef} className={s.pop} style={pos} role="dialog" aria-label={`Choose ${label.toLowerCase()}`}>
          <input
            ref={searchRef}
            className={s.search}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder={catalog ? `Search ${catalog.length.toLocaleString()} Google Fonts…` : 'Search fonts…'}
            aria-label="Search fonts"
          />
          <div className={s.cats}>
            {[{ id: 'all', label: 'All' }, ...FONT_CATEGORIES].map(c => (
              <button key={c.id} type="button" className={`${s.cat} ${cat === c.id ? s.catOn : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>
            ))}
          </div>
          <div ref={listRef} className={s.list} role="listbox" aria-label="Fonts">
            {rows.map(r => {
              if (r.type === 'head') return <div key={`h-${r.text}`} className={s.head}>{r.text}</div>;
              idx += 1;
              const i = idx;
              return (
                <div key={r.id} className={`${s.row} ${r.id === value ? s.rowOn : ''} ${i === active ? s.rowActive : ''}`} data-idx={i}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={r.id === value}
                    className={s.rowBtn}
                    onClick={() => pick(r)}
                    onMouseEnter={() => setActive(i)}
                    data-family={r.kind === 'google' || (r.kind === 'builtin' && r.family) ? r.family : undefined}
                    style={{ fontFamily: `${r.preview}, var(--font-ui)` }}
                  >
                    {r.label}
                  </button>
                  {r.kind === 'custom' && (
                    <button type="button" className={s.del} onClick={() => removeCustomFont(r.id)} aria-label={`Remove ${r.label}`} title="Remove from this browser">✕</button>
                  )}
                </div>
              );
            })}
            {catalog && total === 0 && !fontRows.length && <div className={s.empty}>No fonts match &ldquo;{q}&rdquo;.</div>}
            {more > 0 && <button type="button" className={s.more} onClick={() => setLimit(n => n + PAGE * 2)}>Show more ({more.toLocaleString()} left)</button>}
          </div>
          {allowCustom && (
            <div className={s.foot}>
              <button type="button" className={s.upload} onClick={() => fileRef.current?.click()} disabled={busy}>{busy ? 'Adding…' : '⤒ Upload a font'}</button>
              <span className={s.hint}>.woff2 .woff .ttf .otf · stays in your browser</span>
              <input ref={fileRef} type="file" hidden accept={CUSTOM_FONT_EXT.map(x => `.${x}`).join(',')} onChange={e => upload(e.target.files?.[0])} />
              {error && <p className={s.error} role="alert">{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
