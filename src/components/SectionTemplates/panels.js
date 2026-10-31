'use client';

/* Editing panels shared by the section editor (/website-section-templates/<id>/) and the
   Website Builder (/website-builder/):
     ContentPanel  a section's groups, fields, toggles and repeatable lists (+ uploads)
     ThemePanel    colour presets and colours, fonts, corner radius, width and animation
   Both are controlled: they read a state and report changes; uploads are delegated to the
   parent (which owns the file input and the asset store). */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import s from '../SocialPostTemplates/styles.module.css';
import x from './styles.module.css';
import FontPicker from '@/components/FontPicker';
import { revealInPanel } from '@/lib/reveal-in-panel';
import ImageLibraryPicker from '@/components/ImageLibrary';
import { putAsset } from './storage';
import { ICON_SETS, loadIconSet } from './icon-sets';
import { ARTWORKS, ART_COLORS, ART_STRENGTHS, ART_ANIMS, artworkById, cleanArt, newArt, artPreview, artMarkup, ART_CUSTOM_MAX, CUSTOM_ART_LAYOUTS, ART_POSITIONS } from './templates/art.js';
import { parseHex, onColor } from '../OgImageGenerator/engine';
import {
  THEME_PRESETS, THEME_COLORS, MOTION_PRESETS, MOTION_SPEEDS, TEXT_EFFECTS,
  SCALE_CONTROLS, SCALE_MIN, SCALE_MAX, SCALE_STEP,
  ICONS, ICON_IDS, iconSvgAny, iconLabelAny, encodeIcon, listItem, newItemId, listImageKey,
} from './templates/index.js';

export const RADII = [['0', 'Square'], ['8', 'Soft'], ['14', 'Rounded'], ['24', 'Extra'], ['999', 'Pill']];
export const WIDTHS = ['1080', '1200', '1320', '1440'];

export function ColorField({ label, value, onChange }) {
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

/* Icon field: the current icon, and a grid to choose from. "Essentials" is the curated set;
   the other tabs browse the open-source sets (loaded when opened). A chosen icon is stored in
   full in the design, so it keeps working offline. */
const ICON_PAGE = 150;
export function IconPicker({ id, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('essentials');
  const [q, setQ] = useState('');
  const [list, setList] = useState(null); // null = loading, 'error', or the icons
  const [shown, setShown] = useState(ICON_PAGE);
  useEffect(() => {
    if (!open || tab === 'essentials') return undefined;
    let live = true;
    setList(null);
    loadIconSet(tab).then(l => { if (live) setList(l); }).catch(() => { if (live) setList('error'); });
    return () => { live = false; };
  }, [open, tab]);
  useEffect(() => { setShown(ICON_PAGE); }, [tab, q]);
  const set = ICON_SETS.find(o => o.id === tab);
  const term = q.trim().toLowerCase();
  const found = Array.isArray(list) ? (term ? list.filter(ic => ic.name.includes(term)) : list) : [];
  const pickEssential = ic => { onChange(ic); setOpen(false); };
  const pickRemote = ic => { onChange(encodeIcon(ic.name, ic.w, ic.h, ic.body)); setOpen(false); };
  return (
    <div className={x.iconPick}>
      <button id={id} type="button" className={x.iconCurrent} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span dangerouslySetInnerHTML={{ __html: iconSvgAny(value, 18) }} />
        {iconLabelAny(value) || 'Choose an icon'} <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }} role="tablist" aria-label="Icon sets">
            {[{ id: 'essentials', label: 'Essentials' }, ...ICON_SETS].map(o => (
              <button key={o.id} type="button" role="tab" aria-selected={tab === o.id} className={s.miniBtn} style={tab === o.id ? { borderColor: '#4f46e5', color: '#4f46e5' } : undefined} onClick={() => setTab(o.id)}>{o.label}</button>
            ))}
          </div>
          {tab !== 'essentials' && <input className={s.input} type="search" placeholder={`Search ${set?.label || ''} icons`} value={q} onChange={ev => setQ(ev.target.value)} aria-label="Search icons" />}
          {tab === 'essentials' ? (
            <div className={x.iconGrid} role="listbox" aria-label="Icons">
              {ICON_IDS.map(ic => (
                <button key={ic} type="button" role="option" aria-selected={value === ic} title={ICONS[ic][0]} className={`${x.iconOpt} ${value === ic ? x.iconOptOn : ''}`} onClick={() => pickEssential(ic)}>
                  <span dangerouslySetInnerHTML={{ __html: iconSvgAny(ic, 18) }} />
                </button>
              ))}
            </div>
          ) : list === null ? <span className={s.hint}>Loading {set?.label} icons…</span>
            : list === 'error' ? <span className={s.hint}>Could not load this icon set. Check your connection and try again.</span>
              : !found.length ? <span className={s.hint}>No icons match “{q}”.</span>
                : (
                  <>
                    <div className={x.iconGrid} role="listbox" aria-label={`${set?.label} icons`}>
                      {found.slice(0, shown).map(ic => (
                        <button key={ic.name} type="button" role="option" aria-selected={false} title={ic.name} className={x.iconOpt} onClick={() => pickRemote(ic)}>
                          <span dangerouslySetInnerHTML={{ __html: iconSvgAny(encodeIcon(ic.name, ic.w, ic.h, ic.body), 18) }} />
                        </button>
                      ))}
                    </div>
                    {found.length > shown && <button type="button" className={s.miniBtn} style={{ alignSelf: 'flex-start' }} onClick={() => setShown(n => n + ICON_PAGE)}>Show more ({found.length - shown} left)</button>}
                  </>
                )}
          {set && <span className={s.hint}>{set.label} · {set.license} · <a href={set.url} target="_blank" rel="noopener noreferrer">{set.url.replace('https://', '')}</a></span>}
        </>
      )}
    </div>
  );
}

/* Brand kit -> theme + fonts: brand colour (button text picked for contrast), fonts and,
   when the kit says so, background and text colours too */
export function withKit(prev, kit) {
  const theme = { ...prev.theme, brand: kit.primary, brandText: onColor(kit.primary) };
  if (kit.applyAllColors) { if (kit.bg) theme.bg = kit.bg; if (kit.text) theme.text = kit.text; }
  return { ...prev, theme, fonts: { heading: kit.headingFont || prev.fonts.heading, body: kit.bodyFont || prev.fonts.body } };
}

/**
 * A section's content controls.
 * @param t          the section template
 * @param state      its state ({ fields, toggles, lists, uploads })
 * @param setState   (fn | value) updater, like React's
 * @param blobUrls   upload id -> object URL (thumbnails)
 * @param onPickUpload (fieldDef, ukey) open the file picker for that image
 * @param idPrefix   unique prefix for input ids (the builder shows several sections)
 * @param reveal     { key, list, item, focus, n } from a click in the preview: opens that
 *                   field's group (and list item), scrolls its input into view and flashes it
 */
export function ContentPanel({ t, state, setState, blobUrls = {}, onPickUpload, idPrefix = 'st', openFirst = 2, reveal }) {
  const [open, setOpen] = useState(() => new Set(t.groups.slice(0, openFirst).map(g => g.id)));
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    if (!reveal?.key) return undefined;
    const l = reveal.list ? (t.lists || []).find(o => o.key === reveal.list) : null;
    const gid = l ? l.group : t.fields.find(o => o.key === reveal.key)?.group;
    if (!gid) return undefined;
    setOpen(prev => (prev.has(gid) ? prev : new Set(prev).add(gid)));
    if (l) setOpenItem(reveal.item);
    const id = l ? `${idPrefix}-${l.key}-${reveal.item}-${reveal.key}` : `${idPrefix}-${reveal.key}`;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => {
      const input = document.getElementById(id);
      if (!input) return;
      revealInPanel(input.closest('[data-fieldwrap]') || input, x.flash);
      if (reveal.focus) { input.focus({ preventScroll: true }); input.select?.(); }
    }); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [reveal]); // eslint-disable-line react-hooks/exhaustive-deps
  const uploads = state.uploads || {};
  const f = state.fields || {};
  const toggleGroup = gid => setOpen(prev => { const n = new Set(prev); if (n.has(gid)) n.delete(gid); else n.add(gid); return n; });
  const setField = (key, value) => setState(p => ({ ...p, fields: { ...p.fields, [key]: value } }));
  const setToggle = (key, value) => setState(p => ({ ...p, toggles: { ...p.toggles, [key]: value } }));
  /* Reuse an image from the shared gallery. One already in this tool's store is used as is;
     any other is copied into it (once) so it behaves like an upload. */
  const applyLibraryImage = async (key, item) => {
    let rec;
    if (item.origin === 'section') rec = { id: item.key, file: item.file, w: item.w, h: item.h };
    else {
      const id = `lib:${item.sig}`;
      const ext = (item.file.match(/\.(\w+)$/)?.[1] || item.type.split('/')[1] || 'png').replace('jpeg', 'jpg');
      const stem = item.file.replace(/\.\w+$/, '').replace(/[^\w-]+/g, '-').slice(0, 40) || 'image';
      const hash = Array.from(item.sig).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7).toString(36);
      const file = `${stem}-${hash}.${ext}`;
      await putAsset(id, { blob: item.blob, type: item.type, file, name: file, w: item.w, h: item.h, updatedAt: new Date().toISOString() });
      rec = { id, file, w: item.w, h: item.h };
    }
    setState(p => ({ ...p, uploads: { ...(p.uploads || {}), [key]: rec } }));
  };
  const removeUpload = key => setState(p => { const u = { ...(p.uploads || {}) }; delete u[key]; return { ...p, uploads: u }; });

  /* Repeatable lists: add, edit, duplicate, reorder and remove items */
  const setList = (key, fn) => setState(p => ({ ...p, lists: { ...p.lists, [key]: fn(p.lists?.[key] || []) } }));
  const setItemField = (lk, iid, fk, v) => setList(lk, items => items.map(it => (it._id === iid ? { ...it, [fk]: v } : it)));
  const addItem = l => {
    const it = listItem(l, l.blank || {});
    setList(l.key, items => (items.length >= (l.max || 24) ? items : [...items, it]));
    setOpenItem(it._id);
  };
  const duplicateItem = (l, it) => {
    const copy = { ...it, _id: newItemId() };
    setState(p => {
      const items = p.lists?.[l.key] || [];
      if (items.length >= (l.max || 24)) return p;
      const at = items.findIndex(o => o._id === it._id);
      const ups = { ...(p.uploads || {}) };
      // The copy shows the same uploaded images (the stored image is shared, not duplicated)
      for (const fd of l.fields) { const u = ups[listImageKey(l.key, it._id, fd.key)]; if (u) ups[listImageKey(l.key, copy._id, fd.key)] = u; }
      return { ...p, uploads: ups, lists: { ...p.lists, [l.key]: [...items.slice(0, at + 1), copy, ...items.slice(at + 1)] } };
    });
    setOpenItem(copy._id);
  };
  const moveItem = (l, idx, dir) => setList(l.key, items => {
    const to = idx + dir;
    if (to < 0 || to >= items.length) return items;
    const next = [...items];
    [next[idx], next[to]] = [next[to], next[idx]];
    return next;
  });
  const removeItem = (l, it) => setState(p => {
    const items = p.lists?.[l.key] || [];
    if (items.length <= (l.min ?? 1)) return p;
    const ups = Object.fromEntries(Object.entries(p.uploads || {}).filter(([k]) => !k.startsWith(`${l.key}.${it._id}.`)));
    return { ...p, uploads: ups, lists: { ...p.lists, [l.key]: items.filter(o => o._id !== it._id) } };
  });

  /* One editing control. ukey = where an uploaded image is stored in state.uploads */
  const renderField = (fd, value, onChange, ukey, id) => {
    if (fd.type === 'switch') {
      const on = state.toggles?.[fd.toggle] !== false;
      return (
        <div key={id} className={s.field} data-fieldwrap="" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <label className={s.label} htmlFor={id} style={{ margin: 0 }}>{fd.label}</label>
          <label className={x.switch} title={on ? 'Shown in the section' : 'Hidden from the section'}>
            <input id={id} type="checkbox" checked={on} onChange={ev => setToggle(fd.toggle, ev.target.checked)} />
            <span />
          </label>
        </div>
      );
    }
    if (fd.type === 'check') {
      return (
        <div key={id} className={s.field} data-fieldwrap="" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <label className={s.label} htmlFor={id} style={{ margin: 0 }}>{fd.label}</label>
          <label className={x.switch}>
            <input id={id} type="checkbox" checked={value !== 'no'} onChange={ev => onChange(ev.target.checked ? 'yes' : 'no')} />
            <span />
          </label>
        </div>
      );
    }
    const up = fd.type === 'image' ? uploads[ukey] : null;
    return (
      <div key={id} className={s.field} data-fieldwrap="">
        <label className={s.label} htmlFor={id}>{fd.label}</label>
        {fd.type === 'icon' ? <IconPicker id={id} value={value} onChange={onChange} />
          : fd.type === 'choice'
            ? <select id={id} className={s.input} value={value ?? ''} onChange={ev => onChange(ev.target.value)}>{fd.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          : fd.type === 'textarea' || fd.type === 'lines' || fd.type === 'links'
            ? <textarea id={id} className={s.textarea} rows={fd.type === 'textarea' ? 3 : 5} spellCheck={fd.type !== 'links'} value={value ?? ''} onChange={ev => onChange(ev.target.value)} />
            : <input id={id} className={s.input} type="text" inputMode={fd.type === 'url' || fd.type === 'image' ? 'url' : undefined} spellCheck={fd.type === 'text'} value={up ? `images/${up.file}` : (value ?? '')} disabled={!!up} title={up ? 'Using your uploaded image; remove it to paste a URL instead' : undefined} onChange={ev => onChange(ev.target.value)} />}
        {fd.type === 'image' && onPickUpload && (
          <div className={x.uploadRow}>
            {up ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {blobUrls[up.id] ? <img className={x.uploadThumb} src={blobUrls[up.id]} alt="" /> : <span className={x.uploadThumb} />}
                <span className={x.uploadName}>{up.file} · {up.w}×{up.h}</span>
                <button type="button" className={s.miniBtn} onClick={() => onPickUpload(fd, ukey)}>Replace</button>
                <button type="button" className={s.miniBtn} onClick={() => removeUpload(ukey)}>Remove</button>
              </>
            ) : (
              <button type="button" className={s.miniBtn} onClick={() => onPickUpload(fd, ukey)}>↑ Upload image</button>
            )}
            <ImageLibraryPicker onPick={item => applyLibraryImage(ukey, item)} />
          </div>
        )}
        {(fd.hint || fd.type === 'lines' || fd.type === 'links') && <span className={s.hint}>{fd.hint || (fd.type === 'links' ? 'One link per line: Label | URL' : 'One item per line.')}</span>}
      </div>
    );
  };

  return (
    <>
      {t.groups.map(g => {
        const fields = t.fields.filter(fd => fd.group === g.id);
        const isOpen = open.has(g.id);
        const enabled = !g.toggle || state.toggles?.[g.toggle];
        return (
          <section key={g.id} className={s.section}>
            <div className={x.groupHead}>
              <button type="button" className={x.groupBtn} onClick={() => toggleGroup(g.id)} aria-expanded={isOpen}>
                <span className={`${x.chev} ${isOpen ? x.chevOpen : ''}`}>›</span>
                <h2 className={s.sectionTitle}>{g.label}</h2>
              </button>
              {g.toggle && (
                <label className={x.switch} title={enabled ? 'Shown in the section' : 'Hidden from the section'}>
                  <input type="checkbox" checked={!!state.toggles?.[g.toggle]} onChange={ev => setToggle(g.toggle, ev.target.checked)} aria-label={`Show ${g.label}`} />
                  <span />
                </label>
              )}
            </div>
            {isOpen && (
              <div className={`${x.groupBody} ${enabled ? '' : x.groupOff}`}>
                {fields.map(fd => renderField(fd, f[fd.key], v => setField(fd.key, v), fd.key, `${idPrefix}-${fd.key}`))}
                {(t.lists || []).filter(l => l.group === g.id).map(l => {
                  const items = state.lists?.[l.key] || [];
                  return (
                    <div key={l.key} className={x.items}>
                      {items.map((it, i) => {
                        const on = openItem === it._id;
                        const name = String(it[l.titleKey] ?? '').replace(/\*/g, '').trim();
                        return (
                          <div key={it._id} className={`${x.item} ${on ? x.itemOpen : ''}`}>
                            <div className={x.itemHead}>
                              <button type="button" className={x.itemToggle} onClick={() => setOpenItem(on ? null : it._id)} aria-expanded={on}>
                                <span className={`${x.chev} ${on ? x.chevOpen : ''}`}>›</span>
                                <span className={x.itemNum}>{i + 1}</span>
                                <span>{name || `${l.itemLabel} ${i + 1}`}</span>
                              </button>
                              <button type="button" className={x.itemBtn} onClick={() => moveItem(l, i, -1)} disabled={i === 0} title="Move up" aria-label={`Move ${l.itemLabel.toLowerCase()} ${i + 1} up`}>↑</button>
                              <button type="button" className={x.itemBtn} onClick={() => moveItem(l, i, 1)} disabled={i === items.length - 1} title="Move down" aria-label={`Move ${l.itemLabel.toLowerCase()} ${i + 1} down`}>↓</button>
                              <button type="button" className={x.itemBtn} onClick={() => duplicateItem(l, it)} disabled={items.length >= (l.max || 24)} title="Duplicate" aria-label={`Duplicate ${l.itemLabel.toLowerCase()} ${i + 1}`}>⧉</button>
                              <button type="button" className={x.itemBtn} onClick={() => removeItem(l, it)} disabled={items.length <= (l.min ?? 1)} title="Remove" aria-label={`Remove ${l.itemLabel.toLowerCase()} ${i + 1}`}>✕</button>
                            </div>
                            {on && (
                              <div className={x.itemBody}>
                                {l.fields.map(fd => renderField(fd, it[fd.key], v => setItemField(l.key, it._id, fd.key, v), listImageKey(l.key, it._id, fd.key), `${idPrefix}-${l.key}-${it._id}-${fd.key}`))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <button type="button" className={`${s.miniBtn} ${x.addItem}`} onClick={() => addItem(l)} disabled={items.length >= (l.max || 24)}>+ Add {l.itemLabel.toLowerCase()}</button>
                      {items.length >= (l.max || 24) && <span className={s.hint}>Up to {l.max} {l.label.toLowerCase()}.</span>}
                    </div>
                  );
                })}
                {g.id === t.groups[0].id && <span className={s.hint}>Tip: wrap words in *asterisks* to colour them with the brand colour.</span>}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}

/**
 * SVG artwork behind a section (templates/art.js): pick an artwork, then its colour,
 * strength, edge (dividers) and GSAP animation. Shared by the section editor and the builder.
 * @param art       the section's state.art (undefined = none)
 * @param onChange  (art | null) => void
 */
/* Your own artwork: an uploaded or pasted SVG cleaned down to plain shapes. Only the tags and
   attributes below survive (no scripts, links, images, text, styles or event handlers);
   style="fill:…" declarations become attributes. cleanArt() checks the result again. */
const ART_TAGS = new Set(['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g', 'defs', 'clipPath', 'mask', 'linearGradient', 'radialGradient', 'stop']);
const ART_ATTRS = new Set(['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'points', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-miterlimit', 'opacity', 'fill-opacity', 'stroke-opacity', 'fill-rule', 'clip-rule', 'transform', 'id', 'offset', 'stop-color', 'stop-opacity', 'gradientUnits', 'gradientTransform', 'fx', 'fy', 'clip-path', 'mask', 'maskUnits', 'clipPathUnits', 'spreadMethod', 'vector-effect']);
const artValueOk = v => !/[<>"]|javascript:|expression\(|url\((?!#)/i.test(v);
export function importArtSvg(text) {
  const doc = new DOMParser().parseFromString(String(text || ''), 'image/svg+xml');
  const svg = doc.documentElement;
  if (!svg || svg.nodeName.toLowerCase() !== 'svg' || doc.querySelector('parsererror')) throw new Error('That isn’t a valid SVG file.');
  let vb = svg.getAttribute('viewBox');
  if (!vb) { const w = parseFloat(svg.getAttribute('width')), h = parseFloat(svg.getAttribute('height')); if (w > 0 && h > 0) vb = `0 0 ${w} ${h}`; }
  if (!vb) throw new Error('The SVG needs a viewBox (or a width and height).');
  const out = node => [...node.children].map(el => {
    const tag = el.tagName.replace(/^svg:/, '');
    if (!ART_TAGS.has(tag)) return tag === 'svg' || tag === 'a' || tag === 'switch' ? out(el) : ''; // nested svg / links: keep their shapes only
    const attrs = {};
    for (const at of el.attributes) if (ART_ATTRS.has(at.name) && artValueOk(at.value)) attrs[at.name] = at.value.trim();
    (el.getAttribute('style') || '').split(';').forEach(decl => {
      const [k, ...rest] = decl.split(':'); const key = (k || '').trim(), v = rest.join(':').trim();
      if (ART_ATTRS.has(key) && v && artValueOk(v)) attrs[key] = v;
    });
    const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${v.replace(/&/g, '&amp;')}"`).join('');
    const inner = out(el);
    return inner ? `<${tag}${a}>${inner}</${tag}>` : `<${tag}${a}/>`;
  }).join('');
  const body = out(svg);
  if (!body) throw new Error('No shapes found. Text, photos and embedded images can’t be used, only vector shapes.');
  if (body.length > ART_CUSTOM_MAX) throw new Error(`That SVG is too detailed (${Math.round(body.length / 1000)} KB of shapes; the limit is ${ART_CUSTOM_MAX / 1000} KB). Simplify it in your design tool first.`);
  return { vb, body };
}

const ART_PAGE = 12; // artworks per page in the picker; Show more adds another page

export function ArtworkPanel({ art, onChange, idPrefix = 'art' }) {
  const a = art ? cleanArt(art) : null;
  const custom = a?.id === 'custom';
  const def = a && (custom ? { layout: a.layout, anims: ['float', 'spin', 'parallax'] } : artworkById(a.id));
  const [pick, setPick] = useState(false); // the artwork modal is open
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(ART_PAGE); // artworks listed in the modal; Show more adds a page
  const openPick = () => { setQ(''); setShown(ART_PAGE); setPick(true); };
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const found = words.length ? ARTWORKS.filter(w => { const hay = `${w.label} ${w.cat} ${w.kind} ${w.tags || ''} ${w.anims.join(' ')}`.toLowerCase(); return words.every(t => hay.includes(t)); }) : ARTWORKS;
  const [own, setOwn] = useState(false); // the "Your own" tile is open (paste / upload)
  const [paste, setPaste] = useState('');
  const [err, setErr] = useState('');
  // The modal closes on Escape or a click outside, and the page behind stays put
  useEffect(() => {
    if (!pick) return undefined;
    const onKey = e => { if (e.key === 'Escape') setPick(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [pick]);
  const useSvg = (text, name) => {
    try {
      const { vb, body } = importArtSvg(text);
      const next = cleanArt({ id: 'custom', name, vb, body, layout: 'cover', recolor: true, color: 'brand', strength: '15', anim: '' });
      if (!next) throw new Error('That SVG couldn’t be used. Try exporting it again as plain SVG.');
      setErr(''); setPaste(''); onChange(next); setPick(false);
    } catch (e) { setErr(e.message); }
  };
  const onFile = async ev => {
    const file = ev.target.files?.[0];
    ev.target.value = '';
    if (!file) return;
    if (!/svg/i.test(file.type) && !/\.svg$/i.test(file.name)) { setErr('Choose an .svg file.'); return; }
    useSvg(await file.text(), file.name.replace(/\.svg$/i, ''));
  };
  const set = patch => onChange(cleanArt({ ...a, ...patch }));
  const seg = (label, value, options, onPick) => (
    <div className={s.field}>
      <span className={s.label}>{label}</span>
      <div className={`${s.seg} ${x.segSm}`} role="radiogroup" aria-label={label}>
        {options.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={value === v} className={`${s.segBtn} ${value === v ? s.segBtnActive : ''}`} onClick={() => onPick(v)}>{l}</button>)}
      </div>
    </div>
  );
  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>Artwork</h2>
      <p className={s.hint} style={{ margin: '0 0 10px' }}>SVG shapes behind the content, in your theme colours. They recolour with every preset and can animate with GSAP.</p>
      {/* The chosen artwork; the full list opens in a modal */}
      <div className={x.artCurrent}>
        {!a
          ? <span className={x.artThumb}><span className={x.artNone}>None</span></span>
          : <span className={`${x.artThumb} ${def.layout === 'edge' ? x.artThumbEdge : ''}`} dangerouslySetInnerHTML={{ __html: custom ? artMarkup({ ...a, strength: '100', anim: '' }, `${idPrefix}-cur`).replace(/style="[^"]*"/, 'style="position:relative;display:block;width:100%;height:100%;color:currentColor"') : artPreview(a.id, `${idPrefix}-cur`) }} />}
        <span className={x.artCurrentName}>{!a ? 'No artwork' : custom ? (a.name || 'Your own SVG') : ARTWORKS.find(w => w.id === a.id)?.label}</span>
        <button type="button" className={s.miniBtn} onClick={openPick} aria-haspopup="dialog">{a ? 'Change' : 'Choose'}</button>
      </div>
      {pick && createPortal(
        <div
          onMouseDown={e => { if (e.target === e.currentTarget) setPick(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'grid', placeItems: 'center', padding: 'clamp(8px, 3vw, 32px)', background: 'rgba(15,23,42,.62)', backdropFilter: 'blur(3px)' }}
        >
          <div role="dialog" aria-modal="true" aria-label="Choose artwork" style={{ display: 'flex', flexDirection: 'column', width: 'min(900px, 100%)', maxHeight: '100%', borderRadius: 16, background: 'var(--bg, #fff)', color: 'var(--text, #0f172a)', boxShadow: '0 30px 80px rgba(0,0,0,.45)', overflow: 'hidden' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderBottom: '1px solid rgba(127,127,127,.25)' }}>
              <h2 style={{ margin: 0, fontSize: 18, whiteSpace: 'nowrap' }}>Artwork <span style={{ opacity: 0.6, fontWeight: 500 }}>{ARTWORKS.length}</span></h2>
              <input className={x.artSearch} type="search" value={q} autoFocus onChange={ev => { setQ(ev.target.value); setShown(ART_PAGE); }} placeholder={`Search ${ARTWORKS.length} artworks (dots, waves, stars, edge…)`} aria-label="Search artwork" />
              <button type="button" onClick={() => setPick(false)} aria-label="Close" style={{ width: 32, height: 32, border: 0, borderRadius: 8, background: 'transparent', color: 'inherit', fontSize: 24, lineHeight: 1, cursor: 'pointer' }}>&times;</button>
            </header>
            <div style={{ padding: 18, overflowY: 'auto' }}>
              <p className={s.hint} style={{ margin: '0 0 12px' }}>SVG shapes behind the content, in your theme colours. They recolour with every preset and can animate with GSAP.</p>
              <div className={`${x.artGrid} ${x.artModalGrid}`} role="radiogroup" aria-label="Artwork">
                {!words.length && <button type="button" role="radio" aria-checked={!a} className={`${x.artTile} ${!a ? x.artTileOn : ''}`} onClick={() => { onChange(null); setPick(false); }} title="No artwork"><span className={x.artNone}>None</span></button>}
                {!words.length && (
                  <button type="button" role="radio" aria-checked={custom} className={`${x.artTile} ${custom || own ? x.artTileOn : ''}`} onClick={() => setOwn(o => !o)} title="Upload or paste your own SVG">
                    {custom
                      ? <span className={x.artThumb} dangerouslySetInnerHTML={{ __html: artMarkup({ ...a, strength: '100', anim: '' }, `${idPrefix}-own`).replace(/style="[^"]*"/, 'style="position:relative;display:block;width:100%;height:100%;color:currentColor"') }} />
                      : <span className={x.artNone}>+ SVG</span>}
                    <span className={x.artLabel}>Your own</span>
                  </button>
                )}
                {found.slice(0, shown).map(w => (
                  <button key={w.id} type="button" role="radio" aria-checked={a?.id === w.id} className={`${x.artTile} ${a?.id === w.id ? x.artTileOn : ''}`} onClick={() => { onChange(a?.id === w.id ? a : newArt(w.id)); setPick(false); }} title={w.label}>
                    <span className={`${x.artThumb} ${w.layout === 'edge' ? x.artThumbEdge : ''}`} dangerouslySetInnerHTML={{ __html: artPreview(w.id, `${idPrefix}-m`) }} />
                    <span className={x.artLabel}>{w.label}</span>
                  </button>
                ))}
              </div>
              {words.length > 0 && !found.length && (
                <p className={s.hint} style={{ margin: '4px 0 12px' }}>No artwork matches “{q}”. <button type="button" className={s.miniBtn} onClick={() => setQ('')}>Clear search</button></p>
              )}
              {found.length > shown && (
                <div className={x.artMore}>
                  <button type="button" className={s.miniBtn} onClick={() => setShown(n => n + ART_PAGE)}>Show more</button>
                  <span className={s.hint}>Showing {shown} of {found.length}</span>
                </div>
              )}
              {(own || custom) && (
                <div className={s.field}>
                  <span className={s.label}>{custom ? `Your artwork${a.name ? `: ${a.name}` : ''}` : 'Your own SVG'}</span>
                  <label className={s.miniBtn} style={{ alignSelf: 'flex-start', cursor: 'pointer' }}>
                    {custom ? 'Replace with another .svg' : 'Upload an .svg file'}
                    <input type="file" accept=".svg,image/svg+xml" onChange={onFile} hidden />
                  </label>
                  <textarea className={s.textarea} rows={3} placeholder="…or paste SVG code here" value={paste} onChange={ev => setPaste(ev.target.value)} aria-label="Paste SVG code" />
                  {paste.trim() && <button type="button" className={`${s.miniBtn} ${s.miniBtnAccent}`} style={{ alignSelf: 'flex-start' }} onClick={() => useSvg(paste, 'Pasted SVG')}>Use this SVG</button>}
                  {err && <p className={s.hint} role="alert" style={{ color: '#dc2626' }}>{err}</p>}
                  <p className={s.hint}>Vector shapes only: scripts, links, text and embedded images are removed. It is saved inside your design, so exports work offline.</p>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
      {a && (
        <>
          {custom && seg('Layout', a.layout, CUSTOM_ART_LAYOUTS, v => set({ layout: v, pos: v === 'corner' ? 'c' : undefined, x: undefined, y: undefined }))}
          {custom && seg('Colours', a.recolor ? 'theme' : 'own', [['theme', 'Theme colour'], ['own', 'Its own colours']], v => set({ recolor: v === 'theme' }))}
          {(!custom || a.recolor) && seg('Colour', a.color, ART_COLORS, v => set({ color: v }))}
          {seg('Strength', a.strength, ART_STRENGTHS, v => set({ strength: v }))}
          {def.layout === 'edge' && seg('Edge', a.pos, [['top', 'Top'], ['bottom', 'Bottom']], v => set({ pos: v }))}
          {ART_POSITIONS[def.layout] && seg('Position', a.pos || '', ART_POSITIONS[def.layout], v => set({ pos: v }))}
          {def.layout === 'corner' && a.pos === 'c' && (
            <div className={x.posRow}>
              {[['y', 'From top (%)'], ['x', 'From left (%)']].map(([k, label]) => (
                <label key={k} className={s.field}>
                  <span className={s.label}>{label}</span>
                  <input type="number" className={s.input} min={-50} max={150} step={1} value={a[k] ?? 50} aria-label={label} onChange={ev => { if (ev.target.value !== '') set({ [k]: Number(ev.target.value) }); }} />
                </label>
              ))}
              <p className={`${s.hint} ${x.posHint}`}>The middle of the artwork sits at this point. 50 and 50 is the center; use a number below 0 or above 100 to push it past the edge.</p>
            </div>
          )}
          {def.layout === 'corners' && <p className={s.hint}>The same shape also sits in the opposite corner.</p>}
          {ART_POSITIONS[def.layout]?.length === 5 && <p className={s.hint}>Top, Bottom, Left and Right place the artwork in that half of the section.</p>}
          {def.anims.length > 0 && seg('Animation', a.anim || '', [['', 'None'], ...def.anims.map(k => [k, ART_ANIMS[k]])], v => set({ anim: v }))}
          {a.anim && <p className={s.hint}>Animation plays in your exports and when you press ▶ Play (↻ Refresh on scroll-driven sections); it switches off for people who prefer reduced motion.</p>}
        </>
      )}
    </section>
  );
}

const scaleValue = v => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : 100);

/** Sizes: text size, padding & margins and gaps as − / + percentage steppers.
    Each click is one change (one undo step, one preview render). */
function SizesSection({ theme, onChange }) {
  const changed = SCALE_CONTROLS.some(c => scaleValue(theme[c.key]) !== 100);
  const set = (key, v) => onChange({ ...theme, [key]: String(Math.min(SCALE_MAX, Math.max(SCALE_MIN, v))) });
  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>Sizes</h2>
      {SCALE_CONTROLS.map(c => {
        const v = scaleValue(theme[c.key]);
        return (
          <div key={c.key} className={x.scaleRow}>
            <div className={x.scaleText}>
              <span className={s.label}>{c.label}</span>
              <span className={s.hint}>{c.hint}</span>
            </div>
            <div className={x.stepper} role="group" aria-label={c.label}>
              <button type="button" className={x.stepBtn} onClick={() => set(c.key, v - SCALE_STEP)} disabled={v <= SCALE_MIN} aria-label={`Decrease ${c.label.toLowerCase()}`}>−</button>
              <button type="button" className={x.stepVal} onClick={() => set(c.key, 100)} disabled={v === 100} title="Reset to 100%" aria-label={`${c.label} ${v}%, reset to 100%`}>{v}%</button>
              <button type="button" className={x.stepBtn} onClick={() => set(c.key, v + SCALE_STEP)} disabled={v >= SCALE_MAX} aria-label={`Increase ${c.label.toLowerCase()}`}>+</button>
            </div>
          </div>
        );
      })}
      <div className={x.scaleFoot}>
        <p className={s.hint}>Scales every section from its own design ({SCALE_MIN}–{SCALE_MAX}%). Click a percentage to reset it.</p>
        {changed && <button type="button" className={s.miniBtn} onClick={() => onChange({ ...theme, ...Object.fromEntries(SCALE_CONTROLS.map(c => [c.key, '100'])) })}>Reset all</button>}
      </div>
    </section>
  );
}

/**
 * Theme controls: colour presets + colours, fonts, radius, width, sizes and animation.
 * @param value      { theme, fonts, motion }
 * @param onChange   (next) => void, receives the full { theme, fonts, motion }
 * @param showTextEffect  show the headline text effect choice
 * @param idPrefix   unique prefix for input ids
 */
export function ThemePanel({ value, onChange, showTextEffect = true, idPrefix = 'stf', motionHint, pageScroll = false }) {
  const { theme, fonts, motion = {} } = value;
  const setTheme = (key, v) => onChange({ ...value, theme: { ...theme, [key]: v } });
  const setMotion = (key, v) => onChange({ ...value, motion: { ...motion, [key]: v } });
  return (
    <>
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Colours</h2>
        <div className={x.presetGrid}>
          {THEME_PRESETS.map(p => (
            <button key={p.id} type="button" className={x.preset} title={`${p.label} colours`} onClick={() => onChange({ ...value, theme: { ...theme, ...Object.fromEntries(THEME_COLORS.map(c => [c.key, p[c.key]])) } })}>
              <span className={x.presetSwatch}><i style={{ background: p.bg }} /><i style={{ background: p.brand }} /><i style={{ background: p.text }} /></span>
              {p.label}
            </button>
          ))}
        </div>
        <div className={s.colorGrid}>
          {THEME_COLORS.map(c => <ColorField key={c.key} label={c.label} value={theme[c.key]} onChange={v => setTheme(c.key, v)} />)}
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Fonts</h2>
        {['heading', 'body'].map(k => (
          <div key={k} className={s.field}>
            <label className={s.label} htmlFor={`${idPrefix}-${k}`}>{k === 'heading' ? 'Headings' : 'Body text'}</label>
            <FontPicker id={`${idPrefix}-${k}`} label={k === 'heading' ? 'Heading font' : 'Body font'} allowCustom value={fonts[k]} onChange={fid => onChange({ ...value, fonts: { ...fonts, [k]: fid } })} />
          </div>
        ))}
        <p className={s.hint}>Any Google Font, or upload your own (WOFF2, WOFF, TTF or OTF). Uploaded fonts are embedded in your exports and included in backups.</p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Shape &amp; width</h2>
        <div className={s.field}>
          <span className={s.label}>Corner radius</span>
          <div className={s.seg} role="radiogroup" aria-label="Corner radius">
            {RADII.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={String(theme.radius) === v} className={`${s.segBtn} ${String(theme.radius) === v ? s.segBtnActive : ''}`} onClick={() => setTheme('radius', v)}>{l}</button>)}
          </div>
        </div>
        <div className={s.field}>
          <span className={s.label}>Content width</span>
          <div className={s.seg} role="radiogroup" aria-label="Content width">
            {WIDTHS.map(v => <button key={v} type="button" role="radio" aria-checked={String(theme.maxWidth) === v} className={`${s.segBtn} ${String(theme.maxWidth) === v ? s.segBtnActive : ''}`} onClick={() => setTheme('maxWidth', v)}>{v}px</button>)}
          </div>
        </div>
      </section>

      <SizesSection theme={theme} onChange={t => onChange({ ...value, theme: t })} />

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Animation</h2>
        <div className={s.field}>
          <span className={s.label}>Entrance effect</span>
          <div className={`${s.seg} ${x.segSm}`} role="radiogroup" aria-label="Entrance effect">
            {MOTION_PRESETS.map(p => <button key={p.id} type="button" role="radio" aria-checked={motion.preset === p.id} className={`${s.segBtn} ${motion.preset === p.id ? s.segBtnActive : ''}`} onClick={() => setMotion('preset', p.id)}>{p.label}</button>)}
          </div>
        </div>
        {motion.preset !== 'none' && showTextEffect && (
          <div className={s.field}>
            <span className={s.label}>Headline text effect</span>
            <div className={`${s.seg} ${x.segSm}`} role="radiogroup" aria-label="Headline text effect">
              {TEXT_EFFECTS.map(e => <button key={e.id} type="button" role="radio" aria-checked={(motion.text || 'none') === e.id} className={`${s.segBtn} ${(motion.text || 'none') === e.id ? s.segBtnActive : ''}`} onClick={() => setMotion('text', e.id)}>{e.label}</button>)}
            </div>
          </div>
        )}
        {motion.preset !== 'none' && (
          <div className={s.field}>
            <span className={s.label}>Speed</span>
            <div className={`${s.seg} ${x.segSm}`} role="radiogroup" aria-label="Animation speed">
              {MOTION_SPEEDS.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={String(motion.speed) === v} className={`${s.segBtn} ${String(motion.speed) === v ? s.segBtnActive : ''}`} onClick={() => setMotion('speed', v)}>{l}</button>)}
            </div>
          </div>
        )}
        <p className={s.hint}>{motionHint || 'Powered by GSAP, ScrollTrigger and SplitText: the section animates in once when it scrolls into view. Exports include it, content stays visible without JavaScript, and it switches off for people who prefer reduced motion.'}</p>
        {pageScroll && (
          <>
            {[
              ['smooth', 'Smooth scrolling', 'GSAP ScrollSmoother on desktop with a mouse; phones keep native scrolling.'],
              ['parallax', 'Parallax backgrounds', 'Background photos drift slower than the page.'],
              ['progress', 'Reading progress bar', 'A thin bar in your brand colour shows how far down the page the reader is.'],
            ].map(([k, l, h]) => (
              <div key={k} className={s.field} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 10 }}>
                <label className={s.label} htmlFor={`${idPrefix}-${k}`} style={{ margin: 0 }}>{l}<span className={s.hint} style={{ display: 'block', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>{h}</span></label>
                <label className={x.switch}>
                  <input id={`${idPrefix}-${k}`} type="checkbox" checked={!!motion[k]} onChange={ev => setMotion(k, ev.target.checked)} />
                  <span />
                </label>
              </div>
            ))}
            <p className={s.hint}>Press ▶ Play (↻ Refresh on scroll-driven sections) to try them in the preview; they are always on in your exports.</p>
          </>
        )}
      </section>
    </>
  );
}
