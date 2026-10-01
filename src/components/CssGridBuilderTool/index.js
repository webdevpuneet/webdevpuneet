'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ─── Area color palette ─────────────────────────────────────────────────── */
const AREA_COLORS = [
  { bg: 'rgba(129,140,248,0.22)', border: 'rgba(129,140,248,0.7)', text: '#818cf8' },
  { bg: 'rgba(52,211,153,0.22)',  border: 'rgba(52,211,153,0.7)',  text: '#34d399' },
  { bg: 'rgba(251,146,60,0.22)',  border: 'rgba(251,146,60,0.7)',  text: '#fb923c' },
  { bg: 'rgba(248,113,113,0.22)', border: 'rgba(248,113,113,0.7)', text: '#f87171' },
  { bg: 'rgba(167,139,250,0.22)', border: 'rgba(167,139,250,0.7)', text: '#a78bfa' },
  { bg: 'rgba(244,114,182,0.22)', border: 'rgba(244,114,182,0.7)', text: '#f472b6' },
  { bg: 'rgba(56,189,248,0.22)',  border: 'rgba(56,189,248,0.7)',  text: '#38bdf8' },
  { bg: 'rgba(250,204,21,0.22)',  border: 'rgba(250,204,21,0.7)',  text: '#facc15' },
];

/* ─── Preset layouts ─────────────────────────────────────────────────────── */
const PRESETS = [
  {
    id: 'holy-grail', label: 'Holy Grail',
    cols: ['200px', '1fr', '200px'], rows: ['64px', '1fr', '48px'],
    colGap: 12, rowGap: 12,
    areas: [
      { name: 'header',  r1:0,c1:0,r2:0,c2:2 },
      { name: 'sidebar', r1:1,c1:0,r2:1,c2:0 },
      { name: 'main',    r1:1,c1:1,r2:1,c2:1 },
      { name: 'aside',   r1:1,c1:2,r2:1,c2:2 },
      { name: 'footer',  r1:2,c1:0,r2:2,c2:2 },
    ],
  },
  {
    id: 'sidebar', label: 'Sidebar',
    cols: ['240px', '1fr'], rows: ['56px', '1fr'],
    colGap: 0, rowGap: 0,
    areas: [
      { name: 'header', r1:0,c1:0,r2:0,c2:1 },
      { name: 'nav',    r1:1,c1:0,r2:1,c2:0 },
      { name: 'main',   r1:1,c1:1,r2:1,c2:1 },
    ],
  },
  {
    id: '3col', label: '3 Column',
    cols: ['1fr', '1fr', '1fr'], rows: ['56px', '1fr', '48px'],
    colGap: 16, rowGap: 16,
    areas: [
      { name: 'header', r1:0,c1:0,r2:0,c2:2 },
      { name: 'col1',   r1:1,c1:0,r2:1,c2:0 },
      { name: 'col2',   r1:1,c1:1,r2:1,c2:1 },
      { name: 'col3',   r1:1,c1:2,r2:1,c2:2 },
      { name: 'footer', r1:2,c1:0,r2:2,c2:2 },
    ],
  },
  {
    id: 'dashboard', label: 'Dashboard',
    cols: ['200px', '1fr', '1fr', '1fr'], rows: ['56px', '120px', '1fr'],
    colGap: 12, rowGap: 12,
    areas: [
      { name: 'header', r1:0,c1:0,r2:0,c2:3 },
      { name: 'nav',    r1:1,c1:0,r2:2,c2:0 },
      { name: 'stat1',  r1:1,c1:1,r2:1,c2:1 },
      { name: 'stat2',  r1:1,c1:2,r2:1,c2:2 },
      { name: 'stat3',  r1:1,c1:3,r2:1,c2:3 },
      { name: 'content',r1:2,c1:1,r2:2,c2:3 },
    ],
  },
  {
    id: 'blog', label: 'Blog',
    cols: ['1fr', '280px'], rows: ['56px', '1fr', '48px'],
    colGap: 24, rowGap: 0,
    areas: [
      { name: 'header',  r1:0,c1:0,r2:0,c2:1 },
      { name: 'article', r1:1,c1:0,r2:1,c2:0 },
      { name: 'sidebar', r1:1,c1:1,r2:1,c2:1 },
      { name: 'footer',  r1:2,c1:0,r2:2,c2:1 },
    ],
  },
  {
    id: 'card-grid', label: 'Card Grid',
    cols: ['1fr', '1fr', '1fr', '1fr'], rows: ['56px', '1fr', '1fr'],
    colGap: 16, rowGap: 16,
    areas: [
      { name: 'header', r1:0,c1:0,r2:0,c2:3 },
      { name: 'card1',  r1:1,c1:0,r2:1,c2:0 },
      { name: 'card2',  r1:1,c1:1,r2:1,c2:1 },
      { name: 'card3',  r1:1,c1:2,r2:1,c2:3 },
      { name: 'card4',  r1:2,c1:0,r2:2,c2:1 },
      { name: 'wide',   r1:2,c1:2,r2:2,c2:3 },
    ],
  },
];

const EXPORT_TABS = [
  { id: 'css',      label: 'CSS'      },
  { id: 'scss',     label: 'SCSS'     },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'react',    label: 'React'    },
  { id: 'html',     label: 'HTML'     },
];

const ALIGN_VALUES = ['start', 'end', 'center', 'stretch'];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
let _idCounter = 0;
function uid() { return String(++_idCounter); }

function makeAreas(preset) {
  _idCounter = 0;
  return preset.areas.map((a, i) => ({
    id: uid(),
    name: a.name,
    color: AREA_COLORS[i % AREA_COLORS.length],
    r1: a.r1, c1: a.c1, r2: a.r2, c2: a.c2,
  }));
}

function buildTemplateAreas(areas, rowCount, colCount) {
  const grid = Array.from({ length: rowCount }, () => Array(colCount).fill('.'));
  for (const area of areas) {
    for (let r = area.r1; r <= area.r2; r++)
      for (let c = area.c1; c <= area.c2; c++)
        grid[r][c] = area.name;
  }
  return grid.map(row => `"${row.join(' ')}"`).join('\n    ');
}

function hasOverlap(areas, r1, c1, r2, c2, excludeId = null) {
  for (const a of areas) {
    if (a.id === excludeId) continue;
    if (r1 <= a.r2 && r2 >= a.r1 && c1 <= a.c2 && c2 >= a.c1) return true;
  }
  return false;
}

function getAreaAtCell(areas, r, c) {
  return areas.find(a => r >= a.r1 && r <= a.r2 && c >= a.c1 && c <= a.c2) ?? null;
}

function removeTrackFromAreas(areas, type, idx) {
  const s = type === 'col' ? 'c1' : 'r1';
  const e = type === 'col' ? 'c2' : 'r2';
  return areas.map(a => {
    if (a[s] > idx) return { ...a, [s]: a[s] - 1, [e]: a[e] - 1 };
    if (a[e] < idx) return a;
    if (a[s] === idx && a[e] === idx) return null;
    return { ...a, [e]: a[e] > idx ? Math.max(a[e] - 1, a[s]) : a[e] };
  }).filter(Boolean).filter(a => a[s] <= a[e]);
}

function sanitizeName(n) { return n.replace(/[^a-zA-Z0-9_-]/g, '') || 'area'; }

/* ─── Code generation ────────────────────────────────────────────────────── */
function buildCSS(cols, rows, colGap, rowGap, areas) {
  const ta = areas.length ? buildTemplateAreas(areas, rows.length, cols.length) : null;
  let out = `.grid-container {\n  display: grid;\n  grid-template-columns: ${cols.join(' ')};\n  grid-template-rows: ${rows.join(' ')};\n`;
  if (ta) out += `  grid-template-areas:\n    ${ta};\n`;
  if (colGap === rowGap && colGap > 0) out += `  gap: ${colGap}px;\n`;
  else {
    if (colGap > 0) out += `  column-gap: ${colGap}px;\n`;
    if (rowGap > 0) out += `  row-gap: ${rowGap}px;\n`;
  }
  out += `}`;
  if (areas.length) {
    out += '\n';
    for (const a of areas) out += `\n.${a.name} {\n  grid-area: ${a.name};\n}`;
  }
  return out;
}

function buildSCSS(cols, rows, colGap, rowGap, areas) {
  const ta = areas.length ? buildTemplateAreas(areas, rows.length, cols.length) : null;
  let out = `$col-gap: ${colGap}px;\n$row-gap: ${rowGap}px;\n\n`;
  out += `.grid-container {\n  display: grid;\n  grid-template-columns: ${cols.join(' ')};\n  grid-template-rows: ${rows.join(' ')};\n`;
  if (ta) out += `  grid-template-areas:\n    ${ta};\n`;
  if (colGap === rowGap && colGap > 0) out += `  gap: $col-gap;\n`;
  else {
    if (colGap > 0) out += `  column-gap: $col-gap;\n`;
    if (rowGap > 0) out += `  row-gap: $row-gap;\n`;
  }
  for (const a of areas) out += `\n  .${a.name} {\n    grid-area: ${a.name};\n  }`;
  out += `\n}`;
  return out;
}

function twColClass(cols) {
  const n = cols.length;
  if (cols.every(c => c === '1fr')) return n <= 12 ? `grid-cols-${n}` : `grid-cols-[repeat(${n},1fr)]`;
  return `grid-cols-[${cols.join('_').replace(/\s+/g, '_')}]`;
}
function twRowClass(rows) {
  const n = rows.length;
  if (rows.every(r => r === '1fr')) return n <= 6 ? `grid-rows-${n}` : `grid-rows-[repeat(${n},1fr)]`;
  return `grid-rows-[${rows.join('_').replace(/\s+/g, '_')}]`;
}
function twGap(colGap, rowGap) {
  const m = { 0:'0',4:'1',8:'2',12:'3',16:'4',20:'5',24:'6',28:'7',32:'8',36:'9',40:'10',48:'12' };
  if (colGap === rowGap) return m[colGap] ? `gap-${m[colGap]}` : `gap-[${colGap}px]`;
  const cg = m[colGap] ? `gap-x-${m[colGap]}` : `gap-x-[${colGap}px]`;
  const rg = m[rowGap] ? `gap-y-${m[rowGap]}` : `gap-y-[${rowGap}px]`;
  return `${cg} ${rg}`;
}

function buildTailwind(cols, rows, colGap, rowGap, areas) {
  const cc = twColClass(cols), rc = twRowClass(rows), gc = twGap(colGap, rowGap);
  let out = `<div class="grid ${cc} ${rc} ${gc}">\n`;
  for (const a of areas) {
    const cs = a.c1 + 1, ce = a.c2 + 2, rs = a.r1 + 1, re = a.r2 + 2;
    const span = a.c2 - a.c1 + 1, rspan = a.r2 - a.r1 + 1;
    const cls = [];
    if (cs > 1) cls.push(`col-start-${cs}`);
    if (span > 1) cls.push(`col-span-${span}`); else if (cs === 1) cls.push('');
    if (rs > 1) cls.push(`row-start-${rs}`);
    if (rspan > 1) cls.push(`row-span-${rspan}`);
    const clsStr = cls.filter(Boolean).join(' ');
    out += `  <div class="${[a.name, clsStr].filter(Boolean).join(' ')}">${a.name}</div>\n`;
  }
  out += `</div>`;
  return out;
}

function buildReact(cols, rows, colGap, rowGap, areas) {
  const ta = areas.length ? buildTemplateAreas(areas, rows.length, cols.length) : null;
  let out = `import React from 'react';\n\nconst styles = {\n  container: {\n    display: 'grid',\n    gridTemplateColumns: '${cols.join(' ')}',\n    gridTemplateRows: '${rows.join(' ')}',\n`;
  if (ta) out += `    gridTemplateAreas: \`\n      ${ta.replace(/\n    /g, '\n      ')}\n    \`,\n`;
  if (colGap === rowGap && colGap > 0) out += `    gap: '${colGap}px',\n`;
  else {
    if (colGap > 0) out += `    columnGap: '${colGap}px',\n`;
    if (rowGap > 0) out += `    rowGap: '${rowGap}px',\n`;
  }
  out += `  },\n`;
  for (const a of areas) out += `  ${a.name}: { gridArea: '${a.name}' },\n`;
  out += `};\n\nexport default function Layout() {\n  return (\n    <div style={styles.container}>\n`;
  for (const a of areas) out += `      <div style={styles.${a.name}}>${a.name}</div>\n`;
  out += `    </div>\n  );\n}`;
  return out;
}

function buildHTML(cols, rows, colGap, rowGap, areas) {
  const css = buildCSS(cols, rows, colGap, rowGap, areas);
  let out = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Grid Layout</title>\n  <style>\n`;
  out += css.split('\n').map(l => `    ${l}`).join('\n');
  out += `\n  </style>\n</head>\n<body>\n  <div class="grid-container">\n`;
  for (const a of areas) out += `    <div class="${a.name}">${a.name}</div>\n`;
  out += `  </div>\n</body>\n</html>`;
  return out;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const DEFAULT_PRESET = PRESETS[0];

export default function CssGridBuilderTool() {
  const [cols, setCols]         = useState(DEFAULT_PRESET.cols);
  const [rows, setRows]         = useState(DEFAULT_PRESET.rows);
  const [colGap, setColGap]     = useState(DEFAULT_PRESET.colGap);
  const [rowGap, setRowGap]     = useState(DEFAULT_PRESET.rowGap);
  const [areas, setAreas]       = useState(() => makeAreas(DEFAULT_PRESET));
  const [justifyItems, setJustifyItems] = useState('stretch');
  const [alignItems, setAlignItems]     = useState('stretch');
  const [exportTab, setExportTab]       = useState('css');
  const [copied, setCopied]             = useState(false);
  const [selectedAreaId, setSelectedAreaId]   = useState(null);
  const [editingAreaId, setEditingAreaId]     = useState(null);
  const [editingAreaName, setEditingAreaName] = useState('');
  const [activePresetId, setActivePresetId]   = useState(DEFAULT_PRESET.id);

  const [selStart, setSelStart]       = useState(null);
  const [selEnd, setSelEnd]           = useState(null);
  const [selConflict, setSelConflict] = useState(false);
  const isSelectingRef = useRef(false);
  const areaCounterRef = useRef(areas.length);

  /* ── Selection rect (normalized) ──────────────────────────────────────── */
  const selRect = selStart && selEnd ? {
    r1: Math.min(selStart[0], selEnd[0]),
    c1: Math.min(selStart[1], selEnd[1]),
    r2: Math.max(selStart[0], selEnd[0]),
    c2: Math.max(selStart[1], selEnd[1]),
  } : null;

  /* ── Code output ───────────────────────────────────────────────────────── */
  const codeOutput = useMemo(() => {
    switch (exportTab) {
      case 'css':      return buildCSS(cols, rows, colGap, rowGap, areas);
      case 'scss':     return buildSCSS(cols, rows, colGap, rowGap, areas);
      case 'tailwind': return buildTailwind(cols, rows, colGap, rowGap, areas);
      case 'react':    return buildReact(cols, rows, colGap, rowGap, areas);
      case 'html':     return buildHTML(cols, rows, colGap, rowGap, areas);
      default: return '';
    }
  }, [exportTab, cols, rows, colGap, rowGap, areas]);

  /* ── Copy ──────────────────────────────────────────────────────────────── */
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [codeOutput]);

  /* ── Preset ────────────────────────────────────────────────────────────── */
  const applyPreset = useCallback((preset) => {
    setCols(preset.cols);
    setRows(preset.rows);
    setColGap(preset.colGap);
    setRowGap(preset.rowGap);
    setAreas(makeAreas(preset));
    areaCounterRef.current = preset.areas.length;
    setSelectedAreaId(null);
    setEditingAreaId(null);
    setActivePresetId(preset.id);
    setSelStart(null);
    setSelEnd(null);
  }, []);

  /* ── Track management ──────────────────────────────────────────────────── */
  const addCol = () => { setCols(p => [...p, '1fr']); setActivePresetId(null); };
  const addRow = () => { setRows(p => [...p, 'auto']); setActivePresetId(null); };

  const removeCol = useCallback((i) => {
    if (cols.length <= 1) return;
    setCols(p => p.filter((_, idx) => idx !== i));
    setAreas(p => removeTrackFromAreas(p, 'col', i));
    setActivePresetId(null);
  }, [cols.length]);

  const removeRow = useCallback((i) => {
    if (rows.length <= 1) return;
    setRows(p => p.filter((_, idx) => idx !== i));
    setAreas(p => removeTrackFromAreas(p, 'row', i));
    setActivePresetId(null);
  }, [rows.length]);

  const updateCol = useCallback((i, v) => {
    setCols(p => { const n = [...p]; n[i] = v; return n; });
    setActivePresetId(null);
  }, []);

  const updateRow = useCallback((i, v) => {
    setRows(p => { const n = [...p]; n[i] = v; return n; });
    setActivePresetId(null);
  }, []);

  /* ── Canvas interaction ────────────────────────────────────────────────── */
  const handleCellMouseDown = useCallback((e, r, c) => {
    e.preventDefault();
    const area = getAreaAtCell(areas, r, c);
    if (area) {
      setSelectedAreaId(area.id);
      setEditingAreaId(null);
      return;
    }
    setSelectedAreaId(null);
    setSelStart([r, c]);
    setSelEnd([r, c]);
    setSelConflict(false);
    isSelectingRef.current = true;
  }, [areas]);

  const handleCellMouseEnter = useCallback((r, c) => {
    if (!isSelectingRef.current) return;
    setSelEnd([r, c]);
  }, []);

  const finishSelection = useCallback(() => {
    if (!isSelectingRef.current) return;
    isSelectingRef.current = false;
    setSelStart(prev => {
      setSelEnd(prevEnd => {
        if (prev && prevEnd) {
          const r1 = Math.min(prev[0], prevEnd[0]);
          const c1 = Math.min(prev[1], prevEnd[1]);
          const r2 = Math.max(prev[0], prevEnd[0]);
          const c2 = Math.max(prev[1], prevEnd[1]);
          setAreas(prevAreas => {
            if (hasOverlap(prevAreas, r1, c1, r2, c2)) {
              setSelConflict(true);
              setTimeout(() => { setSelConflict(false); setSelStart(null); setSelEnd(null); }, 700);
              return prevAreas;
            }
            const colorIdx = prevAreas.length % AREA_COLORS.length;
            const newId = uid();
            const name = `area${++areaCounterRef.current}`;
            const newArea = { id: newId, name, color: AREA_COLORS[colorIdx], r1, c1, r2, c2 };
            setSelectedAreaId(newId);
            setEditingAreaId(newId);
            setEditingAreaName(name);
            setActivePresetId(null);
            setTimeout(() => { setSelStart(null); setSelEnd(null); }, 0);
            return [...prevAreas, newArea];
          });
        }
        return null;
      });
      return null;
    });
  }, []);

  const handleAreaMouseDown = useCallback((e, areaId) => {
    e.stopPropagation();
    setSelectedAreaId(areaId);
    setEditingAreaId(null);
  }, []);

  /* ── Area management ───────────────────────────────────────────────────── */
  const deleteArea = useCallback((id) => {
    setAreas(p => p.filter(a => a.id !== id));
    setSelectedAreaId(null);
    setEditingAreaId(null);
    setActivePresetId(null);
  }, []);

  const startRenameArea = useCallback((id, name) => {
    setEditingAreaId(id);
    setEditingAreaName(name);
  }, []);

  const commitRenameArea = useCallback((id) => {
    const clean = sanitizeName(editingAreaName);
    setAreas(p => p.map(a => a.id === id ? { ...a, name: clean } : a));
    setEditingAreaId(null);
    setActivePresetId(null);
  }, [editingAreaName]);

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-grid-builder" />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1" fill="#818cf8" opacity="0.9"/>
              <rect x="9" y="1" width="6" height="6" rx="1" fill="#818cf8" opacity="0.5"/>
              <rect x="1" y="9" width="6" height="6" rx="1" fill="#818cf8" opacity="0.5"/>
              <rect x="9" y="9" width="6" height="6" rx="1" fill="#818cf8" opacity="0.3"/>
            </svg>
          </div>
          CSS Grid Builder
        </div>

        <div className={styles.presetStrip}>
          {PRESETS.map(p => (
            <button
              key={p.id}
              className={`${styles.presetBtn} ${activePresetId === p.id ? styles.presetBtnActive : ''}`}
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Left pane ────────────────────────────────────────────────── */}
        <aside className={styles.leftPane}>

          {/* Columns */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Columns</span>
              <button className={styles.addTrackBtn} onClick={addCol}>+ Add</button>
            </div>
            <div className={styles.trackList}>
              {cols.map((val, i) => (
                <div key={i} className={styles.trackRow}>
                  <span className={styles.trackIdx}>{i + 1}</span>
                  <input
                    className={styles.trackInput}
                    value={val}
                    onChange={e => updateCol(i, e.target.value)}
                    placeholder="1fr"
                  />
                  <button
                    className={styles.trackRemoveBtn}
                    onClick={() => removeCol(i)}
                    disabled={cols.length <= 1}
                    title="Remove column"
                  >×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Rows</span>
              <button className={styles.addTrackBtn} onClick={addRow}>+ Add</button>
            </div>
            <div className={styles.trackList}>
              {rows.map((val, i) => (
                <div key={i} className={styles.trackRow}>
                  <span className={styles.trackIdx}>{i + 1}</span>
                  <input
                    className={styles.trackInput}
                    value={val}
                    onChange={e => updateRow(i, e.target.value)}
                    placeholder="auto"
                  />
                  <button
                    className={styles.trackRemoveBtn}
                    onClick={() => removeRow(i)}
                    disabled={rows.length <= 1}
                    title="Remove row"
                  >×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Gap */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Gap</div>
            <div className={styles.sliders}>
              <div className={styles.sliderRow}>
                <span className={styles.sliderLabel}>Column</span>
                <input type="range" min={0} max={48} step={4} value={colGap}
                  className={styles.slider}
                  onChange={e => { setColGap(Number(e.target.value)); setActivePresetId(null); }} />
                <span className={styles.sliderVal}>{colGap}px</span>
              </div>
              <div className={styles.sliderRow}>
                <span className={styles.sliderLabel}>Row</span>
                <input type="range" min={0} max={48} step={4} value={rowGap}
                  className={styles.slider}
                  onChange={e => { setRowGap(Number(e.target.value)); setActivePresetId(null); }} />
                <span className={styles.sliderVal}>{rowGap}px</span>
              </div>
            </div>
          </div>

          {/* Alignment */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Alignment</div>
            <div className={styles.alignBlock}>
              <span className={styles.alignLabel}>justify-items</span>
              <div className={styles.alignBtns}>
                {ALIGN_VALUES.map(v => (
                  <button key={v}
                    className={`${styles.alignBtn} ${justifyItems === v ? styles.alignBtnActive : ''}`}
                    onClick={() => setJustifyItems(v)}
                  >{v}</button>
                ))}
              </div>
            </div>
            <div className={styles.alignBlock}>
              <span className={styles.alignLabel}>align-items</span>
              <div className={styles.alignBtns}>
                {ALIGN_VALUES.map(v => (
                  <button key={v}
                    className={`${styles.alignBtn} ${alignItems === v ? styles.alignBtnActive : ''}`}
                    onClick={() => setAlignItems(v)}
                  >{v}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Areas */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Areas</span>
              <span className={styles.areaHint}>drag canvas to add</span>
            </div>
            {areas.length === 0 && (
              <p className={styles.emptyAreas}>No areas yet. Drag on the canvas to create one.</p>
            )}
            <div className={styles.areasList}>
              {areas.map(a => (
                <div
                  key={a.id}
                  className={`${styles.areaRow} ${selectedAreaId === a.id ? styles.areaRowSelected : ''}`}
                  onClick={() => setSelectedAreaId(a.id)}
                >
                  <span className={styles.areaSwatch} style={{ background: a.color.border }} />
                  {editingAreaId === a.id ? (
                    <input
                      className={styles.areaNameInput}
                      value={editingAreaName}
                      autoFocus
                      onChange={e => setEditingAreaName(e.target.value)}
                      onBlur={() => commitRenameArea(a.id)}
                      onKeyDown={e => { if (e.key === 'Enter') commitRenameArea(a.id); if (e.key === 'Escape') setEditingAreaId(null); }}
                      onClick={e => e.stopPropagation()}
                    />
                  ) : (
                    <span className={styles.areaName} onDoubleClick={e => { e.stopPropagation(); startRenameArea(a.id, a.name); }}>
                      {a.name}
                    </span>
                  )}
                  <span className={styles.areaSpan} style={{ color: a.color.text }}>
                    {a.c2 - a.c1 + 1}×{a.r2 - a.r1 + 1}
                  </span>
                  <button className={styles.areaDeleteBtn} onClick={e => { e.stopPropagation(); deleteArea(a.id); }} title="Delete area">×</button>
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* ── Right pane ───────────────────────────────────────────────── */}
        <div className={styles.rightPane}>

          {/* Canvas hint bar */}
          <div className={styles.canvasBar}>
            <span className={styles.canvasHint}>
              Drag to create areas · Click area to select · Double-click name to rename
            </span>
            <span className={styles.gridDims}>{cols.length} col{cols.length !== 1 ? 's' : ''} × {rows.length} row{rows.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Canvas */}
          <div
            className={styles.canvas}
            onMouseUp={finishSelection}
            onMouseLeave={finishSelection}
            style={{ userSelect: 'none' }}
          >
            <div
              className={styles.canvasGrid}
              style={{
                display: 'grid',
                gridTemplateColumns: cols.join(' '),
                gridTemplateRows: rows.join(' '),
                columnGap: `${colGap}px`,
                rowGap: `${rowGap}px`,
                justifyItems,
                alignItems,
              }}
            >
              {/* Cells */}
              {rows.map((_, r) =>
                cols.map((_, c) => {
                  const inSel = selRect && r >= selRect.r1 && r <= selRect.r2 && c >= selRect.c1 && c <= selRect.c2;
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`${styles.cell} ${inSel ? (selConflict ? styles.cellConflict : styles.cellInSel) : ''}`}
                      style={{ gridColumn: c + 1, gridRow: r + 1 }}
                      onMouseDown={e => handleCellMouseDown(e, r, c)}
                      onMouseEnter={() => handleCellMouseEnter(r, c)}
                    />
                  );
                })
              )}

              {/* Area overlays */}
              {areas.map(a => (
                <div
                  key={a.id}
                  className={`${styles.areaOverlay} ${selectedAreaId === a.id ? styles.areaOverlaySelected : ''}`}
                  style={{
                    gridColumn: `${a.c1 + 1} / ${a.c2 + 2}`,
                    gridRow: `${a.r1 + 1} / ${a.r2 + 2}`,
                    background: a.color.bg,
                    borderColor: selectedAreaId === a.id ? a.color.border : a.color.border,
                    borderWidth: selectedAreaId === a.id ? '2px' : '1px',
                  }}
                  onMouseDown={e => handleAreaMouseDown(e, a.id)}
                  onDoubleClick={() => startRenameArea(a.id, a.name)}
                >
                  <span className={styles.areaOverlayLabel} style={{ color: a.color.text }}>
                    {editingAreaId === a.id ? (
                      <input
                        className={styles.areaOverlayInput}
                        value={editingAreaName}
                        autoFocus
                        onChange={e => setEditingAreaName(e.target.value)}
                        onBlur={() => commitRenameArea(a.id)}
                        onKeyDown={e => { if (e.key === 'Enter') commitRenameArea(a.id); if (e.key === 'Escape') setEditingAreaId(null); }}
                        onClick={e => e.stopPropagation()}
                        style={{ color: a.color.text, borderColor: a.color.border }}
                      />
                    ) : a.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Code output */}
          <div className={styles.codeSection}>
            <div className={styles.codeSectionHeader}>
              <div className={styles.exportTabsWrap}>
                {EXPORT_TABS.map(t => (
                  <button
                    key={t.id}
                    className={`${styles.exportTab} ${exportTab === t.id ? styles.exportTabActive : ''}`}
                    onClick={() => setExportTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnOk : ''}`} onClick={handleCopy}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {copied
                    ? <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    : <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>
                  }
                </svg>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.codeOutput}>{codeOutput}</pre>
          </div>

        </div>
      </div>
    </div>
  );
}
