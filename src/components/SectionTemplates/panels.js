'use client';

/* Editing panels shared by the section editor (/website-section-templates/<id>/) and the
   Website Builder (/website-builder/):
     ContentPanel  a section's groups, fields, toggles and repeatable lists (+ uploads)
     ThemePanel    colour presets and colours, fonts, corner radius, width and animation
   Both are controlled: they read a state and report changes; uploads are delegated to the
   parent (which owns the file input and the asset store). */

import { useEffect, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import x from './styles.module.css';
import FontPicker from '@/components/FontPicker';
import { revealInPanel } from '@/lib/reveal-in-panel';
import ImageLibraryPicker from '@/components/ImageLibrary';
import { putAsset } from './storage';
import { parseHex, onColor } from '../OgImageGenerator/engine';
import {
  THEME_PRESETS, THEME_COLORS, MOTION_PRESETS, MOTION_SPEEDS, TEXT_EFFECTS,
  ICONS, ICON_IDS, iconSvg, listItem, newItemId, listImageKey,
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

/* Icon field: the current icon, and a grid of every icon to choose from */
export function IconPicker({ id, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={x.iconPick}>
      <button id={id} type="button" className={x.iconCurrent} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span dangerouslySetInnerHTML={{ __html: iconSvg(value, 18) }} />
        {ICONS[value]?.[0] || 'Choose an icon'} <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className={x.iconGrid} role="listbox" aria-label="Icons">
          {ICON_IDS.map(ic => (
            <button key={ic} type="button" role="option" aria-selected={value === ic} title={ICONS[ic][0]} className={`${x.iconOpt} ${value === ic ? x.iconOptOn : ''}`} onClick={() => { onChange(ic); setOpen(false); }}>
              <span dangerouslySetInnerHTML={{ __html: iconSvg(ic, 18) }} />
            </button>
          ))}
        </div>
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
    const up = fd.type === 'image' ? uploads[ukey] : null;
    return (
      <div key={id} className={s.field} data-fieldwrap="">
        <label className={s.label} htmlFor={id}>{fd.label}</label>
        {fd.type === 'icon' ? <IconPicker id={id} value={value} onChange={onChange} />
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
 * Theme controls: colour presets + colours, fonts, radius, width and animation.
 * @param value      { theme, fonts, motion }
 * @param onChange   (next) => void, receives the full { theme, fonts, motion }
 * @param showTextEffect  show the headline text effect choice
 * @param idPrefix   unique prefix for input ids
 */
export function ThemePanel({ value, onChange, showTextEffect = true, idPrefix = 'stf', motionHint }) {
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
      </section>
    </>
  );
}
