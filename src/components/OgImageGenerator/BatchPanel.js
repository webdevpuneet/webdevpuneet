'use client';

import { useState } from 'react';
import s from './styles.module.css';
import { drawDesign } from './engine';
import { canvasToBlob, formatOf, slugify } from './utils';

const MAX_ROWS = 200;
const COLUMNS = ['title', 'description', 'eyebrow', 'author', 'authorMeta', 'site'];

/* CSV with an optional header row (title, description, eyebrow/label, author, date, site).
   Quoted fields may contain commas, quotes ("") and line breaks. */
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(v => v.trim())) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some(v => v.trim())) rows.push(row);
  if (!rows.length) return [];

  const aliases = { title: 'title', headline: 'title', description: 'description', desc: 'description', summary: 'description', eyebrow: 'eyebrow', label: 'eyebrow', category: 'eyebrow', tag: 'eyebrow', author: 'author', date: 'authorMeta', meta: 'authorMeta', authormeta: 'authorMeta', site: 'site', url: 'site', domain: 'site' };
  const head = rows[0].map(h => aliases[h.trim().toLowerCase().replace(/[^a-z]/g, '')]);
  const hasHeader = head.includes('title');
  const keys = hasHeader ? head : COLUMNS;
  return (hasHeader ? rows.slice(1) : rows).map(r => {
    const o = {};
    keys.forEach((k, i) => { if (k && r[i] != null && r[i].trim()) o[k] = r[i].trim(); });
    return o;
  }).filter(o => o.title);
}

/* Plain list: one design per line, "Title | Description | Label" */
function parseLines(text) {
  return text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
    const [title, description, eyebrow] = l.split('|').map(v => v.trim());
    const o = { title };
    if (description) o.description = description;
    if (eyebrow) o.eyebrow = eyebrow;
    return o;
  }).filter(o => o.title);
}

export default function BatchPanel({ opts, assets, size, onToast }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [keepDesc, setKeepDesc] = useState(false);

  const looksCsv = /(^|\n)\s*"?title"?\s*,/i.test(text) || (text.includes(',') && !text.includes('|') && text.split('\n').every(l => !l.trim() || l.includes(',')));
  const rows = (looksCsv ? parseCsv(text) : parseLines(text)).slice(0, MAX_ROWS);

  const onFile = async e => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (f) setText(await f.text());
  };

  const run = async () => {
    if (!rows.length || busy) return;
    setBusy(true);
    setProgress(0);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const canvas = document.createElement('canvas');
      canvas.width = size.w;
      canvas.height = size.h;
      const ctx = canvas.getContext('2d');
      const used = new Set();
      const fmt = formatOf(opts.format);
      for (let i = 0; i < rows.length; i++) {
        // Each row overrides the current design's text; empty cells keep it (or clear it)
        const row = rows[i];
        const design = { ...opts, description: keepDesc ? opts.description : '', ...row };
        drawDesign(ctx, design, assets, size.w, size.h);
        const blob = await canvasToBlob(canvas, opts.format, opts.quality);
        const ext = blob.type === 'image/jpeg' ? 'jpg' : blob.type === 'image/webp' ? 'webp' : 'png';
        let name = `${String(i + 1).padStart(3, '0')}-${slugify(row.title) || 'og-image'}`;
        while (used.has(name)) name += '-x';
        used.add(name);
        zip.file(`${name}.${ext}`, blob);
        setProgress(i + 1);
        if (i % 5 === 4) await new Promise(r => setTimeout(r, 0)); // let the progress bar paint
      }
      const out = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(out);
      const a = document.createElement('a');
      a.href = url;
      a.download = `og-images-${size.w}x${size.h}.zip`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      onToast(`Downloaded ${rows.length} ${fmt.label} images as a ZIP`);
    } catch (err) {
      onToast(`Batch export failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={s.panelPane}>
      <h3 className={s.paneTitle}>Batch export</h3>
      <p className={s.paneText}>
        One image per line, all in your current template, colours, fonts and logo. Write
        <code>Title | Description | Label</code> per line, or paste or upload a CSV with a header row
        (<code>title, description, label, author, date, site</code>). Up to {MAX_ROWS} rows.
      </p>
      <textarea
        className={`${s.textarea} ${s.batchInput}`}
        rows={9}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={'How to Center a Div | Five CSS methods compared | CSS\nA Beginner’s Guide to Flexbox | Learn the core ideas in 10 minutes | Tutorial\nShipping v3.0 | Faster builds and a new plugin API | Release'}
      />
      <div className={s.batchBar}>
        <label className={s.uploadBtn}>
          Upload CSV
          <input type="file" accept=".csv,text/csv,text/plain" className={s.fileInput} onChange={onFile} />
        </label>
        <label className={s.toggle}>
          <input type="checkbox" checked={keepDesc} onChange={e => setKeepDesc(e.target.checked)} />
          Use my description when a row has none
        </label>
        <span className={s.batchCount}>{rows.length} image{rows.length === 1 ? '' : 's'} · {size.w}×{size.h} · {formatOf(opts.format).label}</span>
      </div>
      {busy && (
        <div className={s.progress} aria-label="Export progress">
          <div className={s.progressFill} style={{ width: `${(progress / rows.length) * 100}%` }} />
          <span>{progress} / {rows.length}</span>
        </div>
      )}
      <button type="button" className={s.downloadBtn} onClick={run} disabled={!rows.length || busy}>
        {busy ? 'Rendering…' : `↓ Download ${rows.length || ''} images as ZIP`}
      </button>
    </div>
  );
}
