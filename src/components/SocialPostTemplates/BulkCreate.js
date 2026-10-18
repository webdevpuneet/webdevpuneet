'use client';

/* Bulk create: paste or upload a CSV (or a sheet copied from Excel / Google Sheets), and
   every row becomes one post in the current design, downloaded together as a ZIP.
   Column headers are matched to the template's text fields by label or key. */

import { useEffect, useMemo, useRef, useState } from 'react';
import b from './bulk.module.css';
import { renderImage } from './render';

const MAX_ROWS = 300;
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const slug = s => String(s || '').toLowerCase().replace(/\*/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

/* RFC 4180-style parser: quotes, escaped quotes, newlines inside quotes; delimiter is
   picked from the header line (comma, tab or semicolon) */
export function parseCsv(text) {
  const src = String(text || '').replace(/^﻿/, '');
  const first = src.split(/\r?\n/, 1)[0] || '';
  const delim = [',', '\t', ';'].map(d => [d, first.split(d).length]).sort((x, y) => y[1] - x[1])[0][0];
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (q) {
      if (ch === '"' && src[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"' && cell === '') q = true;
    else if (ch === delim) { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some(c => c.trim())) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some(c => c.trim())) rows.push(row);
  return rows;
}

const csvCell = v => (/[",\n\r]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

export default function BulkCreate({ template: t, design, size, onClose, flash }) {
  const textFields = t.fields.filter(f => f.type !== 'image');
  const [text, setText] = useState('');
  const [format, setFormat] = useState('png');
  const [nameBy, setNameBy] = useState('');
  const [progress, setProgress] = useState(null); // { done, total }
  const cancelRef = useRef(false);
  const fileRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.querySelector('textarea')?.focus();
    const onKey = e => { if (e.key === 'Escape' && !progress) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, progress]);

  const parsed = useMemo(() => {
    const rows = parseCsv(text);
    if (rows.length < 2) return { rows: [], map: [], unmatched: [], header: rows[0] || [] };
    const header = rows[0];
    const map = header.map(h => textFields.find(f => norm(f.label) === norm(h) || norm(f.key) === norm(h))?.key || null);
    const unmatched = header.filter((h, i) => !map[i] && String(h).trim());
    const data = rows.slice(1, MAX_ROWS + 1).map(r => {
      const fields = {};
      map.forEach((key, i) => { if (key) fields[key] = (r[i] ?? '').trim(); });
      return fields;
    });
    return { rows: data, map, unmatched, header, truncated: rows.length - 1 > MAX_ROWS };
  }, [text, textFields]);
  const matchedKeys = [...new Set(parsed.map.filter(Boolean))];
  const fileKey = nameBy && matchedKeys.includes(nameBy) ? nameBy : matchedKeys[0];

  const sample = () => {
    const head = textFields.map(f => f.label);
    const row1 = textFields.map(f => design.fields[f.key] ?? '');
    const row2 = textFields.map(f => (f.type === 'textarea' ? 'Your second post goes here' : design.fields[f.key] ?? ''));
    const csv = [head, row1, row2].map(r => r.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url; a.download = `${t.id}-bulk-sample.csv`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };
  const loadFile = async file => { if (file) setText(await file.text()); if (fileRef.current) fileRef.current.value = ''; };

  const run = async () => {
    const rows = parsed.rows;
    if (!rows.length) return;
    cancelRef.current = false;
    setProgress({ done: 0, total: rows.length });
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const ext = format === 'jpeg' ? 'jpg' : 'png';
      for (let i = 0; i < rows.length; i++) {
        if (cancelRef.current) break;
        const fields = { ...design.fields, ...rows[i] };
        const blob = await renderImage(t, { ...design, fields }, { format, quality: 0.92 });
        const name = slug(fileKey ? fields[fileKey] : '') || t.id;
        zip.file(`${String(i + 1).padStart(3, '0')}-${name}-${size.w}x${size.h}.${ext}`, blob);
        setProgress({ done: i + 1, total: rows.length });
      }
      if (cancelRef.current) { flash('Bulk create cancelled'); setProgress(null); return; }
      const out = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(out);
      const a = document.createElement('a');
      a.href = url; a.download = `${t.id}-${rows.length}-posts-${size.w}x${size.h}.zip`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      flash(`Created ${rows.length} posts in one ZIP`);
      onClose();
    } catch (err) {
      flash(`Bulk create failed: ${err.message}`);
      setProgress(null);
    }
  };

  return (
    <div className={b.overlay} onMouseDown={e => { if (e.target === e.currentTarget && !progress) onClose(); }}>
      <div ref={dialogRef} className={b.dialog} role="dialog" aria-modal="true" aria-labelledby="bulk-title">
        <div className={b.head}>
          <h2 id="bulk-title">Bulk create from CSV</h2>
          <button type="button" className={b.close} onClick={onClose} disabled={!!progress} aria-label="Close">✕</button>
        </div>
        <p className={b.lead}>
          Every row becomes one <b>{t.name}</b> post at {size.label} ({size.w}×{size.h}), using your current colours, fonts and photos.
          Paste rows from a spreadsheet or upload a .csv file. The first row names the columns:
        </p>
        <div className={b.chips}>
          {textFields.map(f => <span key={f.key} className={`${b.chip} ${matchedKeys.includes(f.key) ? b.chipOn : ''}`}>{f.label}</span>)}
        </div>
        <textarea
          className={b.input}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`${textFields.map(f => f.label).join(',')}\n${textFields.map(f => csvCell(design.fields[f.key] ?? '')).join(',')}`}
          spellCheck={false}
          disabled={!!progress}
        />
        <div className={b.row}>
          <button type="button" className={b.btn} onClick={() => fileRef.current?.click()} disabled={!!progress}>Upload .csv</button>
          <button type="button" className={b.btn} onClick={sample} disabled={!!progress}>Download sample CSV</button>
          <input ref={fileRef} type="file" accept=".csv,.tsv,.txt,text/csv" hidden onChange={e => loadFile(e.target.files?.[0])} />
          <span className={b.status}>
            {parsed.rows.length
              ? <>{parsed.rows.length} post{parsed.rows.length > 1 ? 's' : ''}{parsed.truncated ? ` (first ${MAX_ROWS})` : ''} · {matchedKeys.length} column{matchedKeys.length === 1 ? '' : 's'} matched</>
              : text.trim() ? 'Add a header row and at least one data row' : 'Columns you leave out keep the design’s current text'}
          </span>
        </div>
        {parsed.unmatched.length > 0 && <p className={b.warn}>Ignored columns (no matching field): {parsed.unmatched.join(', ')}</p>}
        {parsed.rows.length > 0 && matchedKeys.length === 0 && <p className={b.warn}>No column names match this template&rsquo;s fields. Use the field names above as headers, or download the sample CSV.</p>}

        {parsed.rows.length > 0 && matchedKeys.length > 0 && (
          <div className={b.tableWrap}>
            <table className={b.table}>
              <thead><tr><th>#</th>{matchedKeys.map(k => <th key={k}>{textFields.find(f => f.key === k)?.label}</th>)}</tr></thead>
              <tbody>
                {parsed.rows.slice(0, 4).map((r, i) => <tr key={i}><td>{i + 1}</td>{matchedKeys.map(k => <td key={k}>{r[k]}</td>)}</tr>)}
              </tbody>
            </table>
            {parsed.rows.length > 4 && <p className={b.more}>…and {parsed.rows.length - 4} more</p>}
          </div>
        )}

        <div className={b.foot}>
          <div className={b.seg} role="radiogroup" aria-label="Image format">
            {[['png', 'PNG'], ['jpeg', 'JPG']].map(([v, l]) => (
              <button key={v} type="button" role="radio" aria-checked={format === v} className={format === v ? b.segOn : ''} onClick={() => setFormat(v)} disabled={!!progress}>{l}</button>
            ))}
          </div>
          {matchedKeys.length > 1 && (
            <label className={b.nameBy}>
              Name files by
              <select value={fileKey} onChange={e => setNameBy(e.target.value)} disabled={!!progress}>
                {matchedKeys.map(k => <option key={k} value={k}>{textFields.find(f => f.key === k)?.label}</option>)}
              </select>
            </label>
          )}
          <span className={b.spacer} />
          {progress
            ? (
              <>
                <span className={b.progress}><i style={{ width: `${(progress.done / progress.total) * 100}%` }} /></span>
                <span className={b.status}>{progress.done} / {progress.total}</span>
                <button type="button" className={b.btn} onClick={() => { cancelRef.current = true; }}>Cancel</button>
              </>
            )
            : <button type="button" className={b.primary} onClick={run} disabled={!parsed.rows.length || !matchedKeys.length}>Create {parsed.rows.length || ''} post{parsed.rows.length === 1 ? '' : 's'} (ZIP)</button>}
        </div>
      </div>
    </div>
  );
}
