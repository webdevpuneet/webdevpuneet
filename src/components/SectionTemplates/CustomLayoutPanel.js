'use client';

/* Editor for the Custom Section (templates/custom-section.js): section width, alignment and
   spacing; rows of 1 to 4 columns; blocks inside each column (heading, paragraph, image,
   button, list, spacer, divider, HTML embed); custom CSS and JavaScript. Used by the section
   editor and the Website Builder in place of ContentPanel. */
import { useEffect, useState } from 'react';
import { revealInPanel } from '@/lib/reveal-in-panel';
import s from '../SocialPostTemplates/styles.module.css';
import x from './styles.module.css';
import ImageLibraryPicker from '@/components/ImageLibrary';
import { putAsset } from './storage';
import {
  CUSTOM_LAYOUTS, ALIGNS, WIDTHS, VALIGNS, STACKS, HEADING_SIZES, TEXT_SIZES, BLOCKS, BLOCK_TYPES,
  colsOf, newBlock, newRow, newCustomId, relayoutRow, defaultCustom,
} from './templates/custom-section.js';

const IMAGE_FIELD = { key: 'image', type: 'image', upload: { name: 'image', maxW: 1800 } };
const plain = v => String(v ?? '').replace(/<[^>]+>/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const summary = b => {
  if (b.type === 'image') return b.alt || 'Image';
  if (b.type === 'button') return plain(b.label) || 'Button';
  if (b.type === 'spacer') return `${b.h} px`;
  if (b.type === 'divider') return 'Line';
  if (b.type === 'html') return plain(b.code).slice(0, 40) || 'HTML';
  return plain(b.text).slice(0, 48) || BLOCKS[b.type].label;
};

/* Small controls */
function Seg({ label, value, options, onPick }) {
  return (
    <div className={s.field}>
      <span className={s.label}>{label}</span>
      <div className={`${s.seg} ${x.segSm}`} role="radiogroup" aria-label={label}>
        {options.map(([v, l]) => <button key={v} type="button" role="radio" aria-checked={value === v} className={`${s.segBtn} ${value === v ? s.segBtnActive : ''}`} onClick={() => onPick(v)}>{l}</button>)}
      </div>
    </div>
  );
}
function Select({ id, label, value, options, onChange }) {
  return (
    <div className={s.field}>
      <label className={s.label} htmlFor={id}>{label}</label>
      <select id={id} className={s.input} value={value} onChange={e => onChange(e.target.value)}>{options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
    </div>
  );
}
function Num({ id, label, value, onChange, min = 0, max = 400, unit = 'px' }) {
  return (
    <div className={s.field}>
      <label className={s.label} htmlFor={id}>{label} <span style={{ textTransform: 'none', opacity: 0.7 }}>({unit})</span></label>
      <input id={id} className={s.input} type="number" min={min} max={max} value={value} onChange={e => onChange(e.target.value === '' ? 0 : Number(e.target.value))} />
    </div>
  );
}
function Text({ id, label, value, onChange, area = false, rows = 3, mono = false, hint }) {
  const style = mono ? { fontFamily: 'var(--font-mono, monospace)', fontSize: 12.5 } : undefined;
  return (
    <div className={s.field} data-fieldwrap="">
      <label className={s.label} htmlFor={id}>{label}</label>
      {area
        ? <textarea id={id} className={s.textarea} rows={rows} spellCheck={!mono} style={style} value={value} onChange={e => onChange(e.target.value)} />
        : <input id={id} className={s.input} type="text" value={value} onChange={e => onChange(e.target.value)} />}
      {hint && <span className={s.hint}>{hint}</span>}
    </div>
  );
}
function Check({ id, label, checked, onChange }) {
  return (
    <div className={s.field} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <label className={s.label} htmlFor={id} style={{ margin: 0 }}>{label}</label>
      <label className={x.switch}><input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} /><span /></label>
    </div>
  );
}
/* A mini picture of a layout: one bar per column, widths in proportion */
function LayoutIcon({ layout }) {
  return <span className={x.csLayoutIcon} aria-hidden="true">{layout.split('-').map((n, i) => <i key={i} style={{ flex: Number(n) }} />)}</span>;
}

const INHERIT = [['inherit', 'Auto'], ...ALIGNS];
const two = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 };

export default function CustomLayoutPanel({ state, setState, blobUrls = {}, onPickUpload, idPrefix = 'cs', reveal }) {
  const c = state.custom || defaultCustom();
  const uploads = state.uploads || {};
  const [openRow, setOpenRow] = useState(() => c.rows[0]?.id || null);
  const [openBlock, setOpenBlock] = useState(null);
  const [adding, setAdding] = useState(null); // column id whose "add block" menu is open

  /* A click in the preview on a block: open its row and block here, scroll to its first control and flash it */
  useEffect(() => {
    if (!reveal?.csBlock) return undefined;
    const row = c.rows.find(r => r.cols.some(col => col.blocks.some(b => b.id === reveal.csBlock)));
    if (!row) return undefined;
    setOpenRow(row.id);
    setOpenBlock(reveal.csBlock);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => {
      const body = document.querySelector(`[data-cs-body="${reveal.csBlock}"]`);
      const input = (reveal.key && body?.querySelector(`[id$="-cs-${reveal.csBlock}-${reveal.key}"]`)) || body?.querySelector('input,textarea,select');
      if (!input) return;
      revealInPanel(input.closest('[data-fieldwrap]') || input, x.flash);
      if (reveal.focus) { input.focus({ preventScroll: true }); input.select?.(); }
    }); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [reveal]); // eslint-disable-line react-hooks/exhaustive-deps

  const setC = fn => setState(p => ({ ...p, custom: fn(p.custom || defaultCustom()) }));
  const setTop = patch => setC(o => ({ ...o, ...patch }));
  const setRows = fn => setC(o => ({ ...o, rows: fn(o.rows) }));
  const setRow = (rid, fn) => setRows(rows => rows.map(r => (r.id === rid ? fn(r) : r)));
  const setCol = (rid, cid, fn) => setRow(rid, r => ({ ...r, cols: r.cols.map(col => (col.id === cid ? fn(col) : col)) }));
  const setBlock = (rid, cid, bid, patch) => setCol(rid, cid, col => ({ ...col, blocks: col.blocks.map(b => (b.id === bid ? { ...b, ...patch } : b)) }));
  const move = (arr, i, dir) => { const to = i + dir; if (to < 0 || to >= arr.length) return arr; const n = [...arr]; [n[i], n[to]] = [n[to], n[i]]; return n; };
  const dropUploads = keys => setState(p => { const u = { ...(p.uploads || {}) }; keys.forEach(k => delete u[k]); return { ...p, uploads: u }; });
  /* Reuse an image from the shared gallery (same as the other section panels): one already in
     this tool's store is used as is; any other is copied into it once so it behaves like an upload. */
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
  const imageKeysOf =blocks => blocks.filter(b => b.type === 'image').map(b => `cs.${b.id}`);

  /* Rows */
  const addRow = () => { const r = newRow('1'); setRows(rows => [...rows, r]); setOpenRow(r.id); };
  const dupRow = r => setState(p => {
    const ups = { ...(p.uploads || {}) };
    const copy = { ...r, id: newCustomId(), cols: r.cols.map(col => ({ ...col, id: newCustomId(), blocks: col.blocks.map(b => { const nb = { ...b, id: newCustomId() }; if (ups[`cs.${b.id}`]) ups[`cs.${nb.id}`] = ups[`cs.${b.id}`]; return nb; }) })) };
    const cc = p.custom || defaultCustom();
    const at = cc.rows.findIndex(o => o.id === r.id);
    return { ...p, uploads: ups, custom: { ...cc, rows: [...cc.rows.slice(0, at + 1), copy, ...cc.rows.slice(at + 1)] } };
  });
  const removeRow = r => {
    if (c.rows.length <= 1) return;
    dropUploads(r.cols.flatMap(col => imageKeysOf(col.blocks)));
    setRows(rows => rows.filter(o => o.id !== r.id));
  };

  /* Blocks */
  const addBlock = (r, col, type) => { const b = newBlock(type); setCol(r.id, col.id, cc => ({ ...cc, blocks: [...cc.blocks, b] })); setOpenBlock(b.id); setAdding(null); };
  const dupBlock = (r, col, b) => setState(p => {
    const nb = { ...b, id: newCustomId() };
    const ups = { ...(p.uploads || {}) };
    if (ups[`cs.${b.id}`]) ups[`cs.${nb.id}`] = ups[`cs.${b.id}`];
    const cc = p.custom || defaultCustom();
    const rows = cc.rows.map(rr => (rr.id !== r.id ? rr : { ...rr, cols: rr.cols.map(k => { if (k.id !== col.id) return k; const at = k.blocks.findIndex(o => o.id === b.id); return { ...k, blocks: [...k.blocks.slice(0, at + 1), nb, ...k.blocks.slice(at + 1)] }; }) }));
    return { ...p, uploads: ups, custom: { ...cc, rows } };
  });
  const removeBlock = (r, col, b) => { dropUploads(imageKeysOf([b])); setCol(r.id, col.id, cc => ({ ...cc, blocks: cc.blocks.filter(o => o.id !== b.id) })); };
  const moveBlockToCol = (r, fromCol, b, toColId) => setRow(r.id, rr => ({
    ...rr,
    cols: rr.cols.map(k => (k.id === fromCol.id ? { ...k, blocks: k.blocks.filter(o => o.id !== b.id) } : k.id === toColId ? { ...k, blocks: [...k.blocks, b] } : k)),
  }));

  const blockFields = (r, col, b) => {
    const id = k => `${idPrefix}-cs-${b.id}-${k}`;
    const set = patch => setBlock(r.id, col.id, b.id, patch);
    const ukey = `cs.${b.id}`;
    const up = uploads[ukey];
    const common = (
      <>
        <Select id={id('align')} label="Alignment" value={b.align} options={INHERIT} onChange={v => set({ align: v })} />
        <div style={two}>
          <Num id={id('mt')} label="Space above" value={b.mt} min={-200} onChange={v => set({ mt: v })} />
          <Num id={id('mb')} label="Space below" value={b.mb} min={-200} onChange={v => set({ mb: v })} />
        </div>
        {r.cols.length > 1 && (
          <Select id={id('col')} label="Column" value={col.id} options={r.cols.map((k, i) => [k.id, `Column ${i + 1}`])} onChange={v => moveBlockToCol(r, col, b, v)} />
        )}
      </>
    );
    switch (b.type) {
      case 'eyebrow': return <><Text id={id('text')} label="Text" value={b.text} onChange={v => set({ text: v })} />{common}</>;
      case 'heading': return (
        <>
          <Text id={id('text')} label="Heading" area rows={2} value={b.text} onChange={v => set({ text: v })} hint="Wrap words in *asterisks* to colour them." />
          <div style={two}>
            <Select id={id('level')} label="Tag (for SEO)" value={b.level} options={[['h1', 'H1 (once per page)'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4']]} onChange={v => set({ level: v })} />
            <Select id={id('size')} label="Size" value={b.size} options={HEADING_SIZES} onChange={v => set({ size: v })} />
          </div>
          {common}
        </>
      );
      case 'text': return (
        <>
          <Text id={id('text')} label="Paragraph" area rows={4} value={b.text} onChange={v => set({ text: v })} hint="*word* colours it; <b>, <i> and <br> work too." />
          <Select id={id('size')} label="Size" value={b.size} options={TEXT_SIZES} onChange={v => set({ size: v })} />
          {common}
        </>
      );
      case 'image': return (
        <>
          <div className={s.field}>
            <label className={s.label} htmlFor={id('src')}>Image</label>
            <input id={id('src')} className={s.input} type="text" inputMode="url" value={up ? `images/${up.file}` : b.src} disabled={!!up} onChange={e => set({ src: e.target.value })} />
            {onPickUpload && (
              <div className={x.uploadRow}>
                {up ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {blobUrls[up.id] ? <img className={x.uploadThumb} src={blobUrls[up.id]} alt="" /> : <span className={x.uploadThumb} />}
                    <span className={x.uploadName}>{up.file} · {up.w}×{up.h}</span>
                    <button type="button" className={s.miniBtn} onClick={() => onPickUpload(IMAGE_FIELD, ukey)}>Replace</button>
                    <button type="button" className={s.miniBtn} onClick={() => dropUploads([ukey])}>Remove</button>
                  </>
                ) : <button type="button" className={s.miniBtn} onClick={() => onPickUpload(IMAGE_FIELD, ukey)}>↑ Upload image</button>}
                <ImageLibraryPicker onPick={item => applyLibraryImage(ukey, item)} />
              </div>
            )}
          </div>
          <Text id={id('alt')} label="Alt text" value={b.alt} onChange={v => set({ alt: v })} hint="Describe the image for screen readers and search engines." />
          <div style={two}>
            <Num id={id('width')} label="Width" unit="%" min={10} max={100} value={b.width} onChange={v => set({ width: v })} />
            <Select id={id('radius')} label="Corners" value={b.radius} options={[['yes', 'Rounded'], ['no', 'Square']]} onChange={v => set({ radius: v })} />
          </div>
          <Text id={id('link')} label="Link (optional)" value={b.link} onChange={v => set({ link: v })} />
          {common}
        </>
      );
      case 'button': return (
        <>
          <Text id={id('label')} label="Button text" value={b.label} onChange={v => set({ label: v })} />
          <Text id={id('url')} label="Link" value={b.url} onChange={v => set({ url: v })} />
          <div style={two}>
            <Select id={id('style')} label="Style" value={b.style} options={[['primary', 'Filled'], ['ghost', 'Outline'], ['link', 'Text link']]} onChange={v => set({ style: v })} />
            <Select id={id('newTab')} label="Opens in" value={b.newTab} options={[['no', 'Same tab'], ['yes', 'New tab']]} onChange={v => set({ newTab: v })} />
          </div>
          <span className={s.hint}>Buttons next to each other in a column sit side by side.</span>
          {common}
        </>
      );
      case 'list': return (
        <>
          <Text id={id('text')} label="Items (one per line)" area rows={4} value={b.text} onChange={v => set({ text: v })} />
          <Select id={id('style')} label="Style" value={b.style} options={[['checks', 'Check marks'], ['bullets', 'Bullets'], ['numbers', 'Numbers']]} onChange={v => set({ style: v })} />
          {common}
        </>
      );
      case 'spacer': return <><Num id={id('h')} label="Height" value={b.h} onChange={v => set({ h: v })} />{common}</>;
      case 'divider': return <><Num id={id('width')} label="Width" unit="%" min={10} max={100} value={b.width} onChange={v => set({ width: v })} />{common}</>;
      case 'html': return (
        <>
          <Text id={id('code')} label="HTML" area rows={7} mono value={b.code} onChange={v => set({ code: v })} hint="Embed codes, iframes, forms or any markup. Scripts and onclick-style handlers are left out of the editor preview; they run in your exported page." />
          {common}
        </>
      );
      default: return null;
    }
  };

  return (
    <>
      <section className={s.section}>
        <h2 className={s.sectionTitle}>Section layout</h2>
        <Select id={`${idPrefix}-cs-width`} label="Content width" value={c.width} options={WIDTHS} onChange={v => setTop({ width: v })} />
        <Seg label="Alignment" value={c.align} options={ALIGNS} onPick={v => setTop({ align: v })} />
        <div style={two}>
          <Num id={`${idPrefix}-cs-pt`} label="Padding top" value={c.pt} onChange={v => setTop({ pt: v })} />
          <Num id={`${idPrefix}-cs-pb`} label="Padding bottom" value={c.pb} onChange={v => setTop({ pb: v })} />
        </div>
        <Num id={`${idPrefix}-cs-rowgap`} label="Space between rows" value={c.rowGap} onChange={v => setTop({ rowGap: v })} />
        <span className={s.hint}>Colours, fonts and corner radius come from the Theme. Each row, column and block can override the alignment.</span>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Rows</h2>
        <div className={x.items}>
          {c.rows.map((r, ri) => {
            const on = openRow === r.id;
            const rid = k => `${idPrefix}-cs-${r.id}-${k}`;
            return (
              <div key={r.id} className={`${x.item} ${on ? x.itemOpen : ''}`}>
                <div className={x.itemHead}>
                  <button type="button" className={x.itemToggle} onClick={() => setOpenRow(on ? null : r.id)} aria-expanded={on}>
                    <span className={`${x.chev} ${on ? x.chevOpen : ''}`}>›</span>
                    <span className={x.itemNum}>{ri + 1}</span>
                    <LayoutIcon layout={r.layout} />
                    <span>{CUSTOM_LAYOUTS.find(l => l[0] === r.layout)?.[1]}</span>
                  </button>
                  <button type="button" className={x.itemBtn} onClick={() => setRows(rows => move(rows, ri, -1))} disabled={ri === 0} aria-label={`Move row ${ri + 1} up`} title="Move up">↑</button>
                  <button type="button" className={x.itemBtn} onClick={() => setRows(rows => move(rows, ri, 1))} disabled={ri === c.rows.length - 1} aria-label={`Move row ${ri + 1} down`} title="Move down">↓</button>
                  <button type="button" className={x.itemBtn} onClick={() => dupRow(r)} aria-label={`Duplicate row ${ri + 1}`} title="Duplicate">⧉</button>
                  <button type="button" className={x.itemBtn} onClick={() => removeRow(r)} disabled={c.rows.length <= 1} aria-label={`Remove row ${ri + 1}`} title="Remove">✕</button>
                </div>
                {on && (
                  <div className={x.itemBody}>
                    <div className={s.field}>
                      <span className={s.label}>Columns</span>
                      <div className={x.csLayouts} role="radiogroup" aria-label="Columns">
                        {CUSTOM_LAYOUTS.map(([l, name]) => (
                          <button key={l} type="button" role="radio" aria-checked={r.layout === l} title={name} aria-label={name} className={`${x.csLayoutBtn} ${r.layout === l ? x.csLayoutOn : ''}`} onClick={() => setRow(r.id, rr => relayoutRow(rr, l))}><LayoutIcon layout={l} /></button>
                        ))}
                      </div>
                      {colsOf(r.layout) < r.cols.length && <span className={s.hint}>Blocks from removed columns move into the last column.</span>}
                    </div>
                    <div style={two}>
                      <Select id={rid('valign')} label="Line up columns" value={r.valign} options={VALIGNS} onChange={v => setRow(r.id, rr => ({ ...rr, valign: v }))} />
                      <Num id={rid('gap')} label="Column gap" value={r.gap} max={200} onChange={v => setRow(r.id, rr => ({ ...rr, gap: v }))} />
                    </div>
                    {r.cols.length > 1 && (
                      <>
                        <Select id={rid('stack')} label="Stack columns on" value={r.stack} options={STACKS} onChange={v => setRow(r.id, rr => ({ ...rr, stack: v }))} />
                        <Check id={rid('reverse')} label="Last column first when stacked" checked={r.reverse} onChange={v => setRow(r.id, rr => ({ ...rr, reverse: v }))} />
                      </>
                    )}
                    <div style={two}>
                      <Num id={rid('pt')} label="Padding top" value={r.pt} onChange={v => setRow(r.id, rr => ({ ...rr, pt: v }))} />
                      <Num id={rid('pb')} label="Padding bottom" value={r.pb} onChange={v => setRow(r.id, rr => ({ ...rr, pb: v }))} />
                    </div>

                    {r.cols.map((col, ci) => (
                      <div key={col.id} className={x.csCol}>
                        <div className={x.csColHead}>
                          <strong>{r.cols.length > 1 ? `Column ${ci + 1}` : 'Content'}</strong>
                          <select className={x.csMiniSelect} aria-label={`Column ${ci + 1} alignment`} value={col.align} onChange={e => setCol(r.id, col.id, k => ({ ...k, align: e.target.value }))}>{INHERIT.map(([v, l]) => <option key={v} value={v}>{v === 'inherit' ? 'Align: auto' : `Align: ${l}`}</option>)}</select>
                          <select className={x.csMiniSelect} aria-label={`Column ${ci + 1} style`} value={col.style} onChange={e => setCol(r.id, col.id, k => ({ ...k, style: e.target.value }))}><option value="plain">Plain</option><option value="card">Card</option></select>
                        </div>
                        <div className={x.items}>
                          {col.blocks.map((b, bi) => {
                            const bon = openBlock === b.id;
                            return (
                              <div key={b.id} className={`${x.item} ${bon ? x.itemOpen : ''}`}>
                                <div className={x.itemHead}>
                                  <button type="button" className={x.itemToggle} onClick={() => setOpenBlock(bon ? null : b.id)} aria-expanded={bon}>
                                    <span className={`${x.chev} ${bon ? x.chevOpen : ''}`}>›</span>
                                    <span className={x.csBlockIcon} aria-hidden="true">{BLOCKS[b.type].icon}</span>
                                    <span>{summary(b)}</span>
                                  </button>
                                  <button type="button" className={x.itemBtn} onClick={() => setCol(r.id, col.id, k => ({ ...k, blocks: move(k.blocks, bi, -1) }))} disabled={bi === 0} aria-label="Move block up" title="Move up">↑</button>
                                  <button type="button" className={x.itemBtn} onClick={() => setCol(r.id, col.id, k => ({ ...k, blocks: move(k.blocks, bi, 1) }))} disabled={bi === col.blocks.length - 1} aria-label="Move block down" title="Move down">↓</button>
                                  <button type="button" className={x.itemBtn} onClick={() => dupBlock(r, col, b)} aria-label="Duplicate block" title="Duplicate">⧉</button>
                                  <button type="button" className={x.itemBtn} onClick={() => removeBlock(r, col, b)} aria-label="Remove block" title="Remove">✕</button>
                                </div>
                                {bon && <div className={x.itemBody} data-cs-body={b.id}>{blockFields(r, col, b)}</div>}
                              </div>
                            );
                          })}
                          {adding === col.id ? (
                            <div className={x.csAddMenu} role="group" aria-label="Add a block">
                              {BLOCK_TYPES.map(type => (
                                <button key={type} type="button" className={x.csAddBtn} onClick={() => addBlock(r, col, type)}><span aria-hidden="true">{BLOCKS[type].icon}</span>{BLOCKS[type].label}</button>
                              ))}
                              <button type="button" className={s.miniBtn} onClick={() => setAdding(null)}>Cancel</button>
                            </div>
                          ) : (
                            <button type="button" className={`${s.miniBtn} ${x.addItem}`} onClick={() => setAdding(col.id)}>+ Add block</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <button type="button" className={`${s.miniBtn} ${x.addItem}`} onClick={addRow} disabled={c.rows.length >= 40}>+ Add row</button>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Custom code</h2>
        <Text id={`${idPrefix}-cs-css`} label="CSS" area rows={6} mono value={c.css} onChange={v => setTop({ css: v })} hint="Start selectors with .this to style only this section, for example: .this h2 { letter-spacing: 0 }" />
        <Text id={`${idPrefix}-cs-js`} label="JavaScript" area rows={6} mono value={c.js} onChange={v => setTop({ js: v })} hint="Runs in your exported page (not in the editor preview). The variable section is this section’s element." />
      </section>
    </>
  );
}
