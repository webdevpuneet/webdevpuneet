'use client';

import { useState, useMemo } from 'react';
import s from './styles.module.css';
import JsonToolsTopNav from '@/components/JsonToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

/* ─── Constants ─────────────────────────────────────────────── */
const SAMPLE_JSON = `[
  {"month":"Jan","revenue":12400,"users":340,"region":"North","status":"Active"},
  {"month":"Feb","revenue":18200,"users":415,"region":"South","status":"Active"},
  {"month":"Mar","revenue":15800,"users":398,"region":"North","status":"Paused"},
  {"month":"Apr","revenue":22100,"users":512,"region":"East","status":"Active"},
  {"month":"May","revenue":19600,"users":487,"region":"West","status":"Active"},
  {"month":"Jun","revenue":28400,"users":634,"region":"East","status":"Active"},
  {"month":"Jul","revenue":24300,"users":589,"region":"South","status":"Paused"},
  {"month":"Aug","revenue":31200,"users":712,"region":"North","status":"Active"},
  {"month":"Sep","revenue":29800,"users":681,"region":"West","status":"Active"},
  {"month":"Oct","revenue":35600,"users":798,"region":"East","status":"Active"},
  {"month":"Nov","revenue":32100,"users":745,"region":"South","status":"Paused"},
  {"month":"Dec","revenue":41800,"users":923,"region":"North","status":"Active"}
]`;

const PIE_COLORS = ['#6366f1','#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899'];
const CHART_COLORS = [
  { name: 'Indigo',  value: '#6366f1' },
  { name: 'Blue',    value: '#3b82f6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Amber',   value: '#f59e0b' },
  { name: 'Rose',    value: '#ef4444' },
  { name: 'Purple',  value: '#8b5cf6' },
];
const TYPE_META = {
  number:   { label: '#',   color: '#3b82f6' },
  category: { label: 'Aⓐ', color: '#8b5cf6' },
  date:     { label: '📅',  color: '#10b981' },
  boolean:  { label: 'T/F', color: '#f59e0b' },
  string:   { label: 'Aa',  color: '#6b7280' },
  id:       { label: 'ID',  color: '#9ca3af' },
};
const PAGE_SIZE = 10;

/* ─── Helpers ───────────────────────────────────────────────── */
function fmtVal(n) {
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (abs >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (abs >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  if (!Number.isInteger(n) && abs < 1000) return n.toFixed(1);
  return Math.round(n).toLocaleString();
}

function analyzeJSON(input) {
  let parsed;
  try { parsed = JSON.parse(input); } catch (e) { return { error: e.message }; }

  let rows = parsed;
  let meta = null;

  if (!Array.isArray(parsed)) {
    const keys = Object.keys(parsed);
    const found = keys.find(k => Array.isArray(parsed[k]));
    if (found) {
      rows = parsed[found];
      meta = {};
      keys.forEach(k => { if (k !== found) meta[k] = parsed[k]; });
    } else {
      rows = [parsed];
    }
  }

  if (!rows.length) return { error: 'Array is empty. Paste a JSON array with at least one row.' };

  const flatRows = rows.map(row => {
    const flat = {};
    for (const [k, v] of Object.entries(row)) {
      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
        for (const [ck, cv] of Object.entries(v)) {
          if (!Array.isArray(cv)) flat[`${k}.${ck}`] = cv;
        }
      } else if (!Array.isArray(v)) {
        flat[k] = v;
      }
    }
    return flat;
  });

  const allKeys = [...new Set(flatRows.flatMap(r => Object.keys(r)))];
  const fields = {};

  for (const key of allKeys) {
    const vals = flatRows.map(r => r[key]).filter(v => v !== null && v !== undefined);
    if (!vals.length) continue;

    const lk = key.toLowerCase();
    const isIdName = lk === 'id' || lk === '_id' || lk === 'uuid' || lk === 'key' || lk === 'pk';
    const uniqueVals = [...new Set(vals.map(String))];
    const allUnique = uniqueVals.length === flatRows.length;
    const looksLikeId = allUnique && (isIdName || vals.every(v => typeof v === 'string' && (v.length > 10 || /^\d+$/.test(String(v)))));

    let type;
    if (isIdName || looksLikeId) {
      type = 'id';
    } else if (vals.every(v => typeof v === 'boolean')) {
      type = 'boolean';
    } else if (vals.every(v => typeof v === 'number' || (typeof v === 'string' && !isNaN(parseFloat(v)) && isFinite(v)))) {
      type = 'number';
    } else if (vals.every(v => typeof v === 'string' && v.length >= 8 && !isNaN(Date.parse(v)))) {
      type = 'date';
    } else if (typeof vals[0] === 'string' && uniqueVals.length <= 25 && uniqueVals.length < flatRows.length * 0.9) {
      type = 'category';
    } else {
      type = 'string';
    }

    const field = { key, type };

    if (type === 'number') {
      const nums = vals.map(v => typeof v === 'number' ? v : parseFloat(v));
      field.sum = nums.reduce((a, b) => a + b, 0);
      field.avg = field.sum / nums.length;
      field.min = Math.min(...nums);
      field.max = Math.max(...nums);
    } else if (type === 'category' || type === 'boolean') {
      field.uniqueValues = uniqueVals;
      field.cardinality = uniqueVals.length;
    }

    fields[key] = field;
  }

  return { rows: flatRows, fields, meta, error: null };
}

function autoConfig(fields) {
  const fieldArr = Object.values(fields);
  const dateField = fieldArr.find(f => f.type === 'date');
  const catField = fieldArr.find(f => f.type === 'category');
  const strField = fieldArr.find(f => f.type === 'string');
  const numField = fieldArr.find(f => f.type === 'number');
  const filterFields = fieldArr.filter(f => f.type === 'category' || f.type === 'boolean').map(f => f.key);

  let xField, chartType;
  if (dateField) {
    xField = dateField.key;
    chartType = 'line';
  } else if (catField) {
    xField = catField.key;
    chartType = (catField.cardinality || 10) <= 6 ? 'pie' : 'bar';
  } else if (strField) {
    xField = strField.key;
    chartType = 'bar';
  } else {
    xField = fieldArr[0]?.key || '';
    chartType = 'bar';
  }

  const yField = numField?.key || '';
  return { xField, yField, chartType, filterFields };
}

/* ─── SVG Tooltip (renders inside SVG) ─────────────────────── */
function SvgTip({ x, y, label, value, W, padL, padR }) {
  const TW = 92, TH = 42, margin = 10;
  const tx = Math.min(Math.max(x - TW / 2, padL), W - padR - TW);
  const ty = Math.max(4, y - TH - margin);
  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x={tx} y={ty} width={TW} height={TH} rx="5"
        fill="#0f172a" stroke="#334155" strokeWidth="1" opacity="0.97" />
      <text x={tx + TW / 2} y={ty + 16} textAnchor="middle"
        fontSize="10.5" fontWeight="700" fill="#f1f5f9" fontFamily="var(--font-mono)">
        {fmtVal(value)}
      </text>
      <text x={tx + TW / 2} y={ty + 31} textAnchor="middle"
        fontSize="8.5" fill="#94a3b8" fontFamily="var(--font-ui)">
        {String(label).slice(0, 14)}
      </text>
    </g>
  );
}

/* ─── Bar Chart ─────────────────────────────────────────────── */
function SvgBarChart({ data, color }) {
  const [hovIdx, setHovIdx] = useState(null);
  if (!data || !data.length) return null;

  const W = 560, H = 200;
  const pad = { t: 20, r: 12, b: 42, l: 52 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;
  const maxY = Math.max(...data.map(d => d.y), 1);
  const barW = Math.max(4, Math.floor(cW / data.length) - 5);

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(pct => ({
    y: pad.t + cH * (1 - pct),
    val: fmtVal(maxY * pct),
  }));

  const bars = data.map((d, i) => {
    const slotW = cW / data.length;
    const x = pad.l + slotW * i + (slotW - barW) / 2;
    const barH = Math.max(2, (d.y / maxY) * cH);
    const y = pad.t + cH - barH;
    return { ...d, x, y, barH, cx: x + barW / 2 };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      onMouseLeave={() => setHovIdx(null)}>
      {/* Grid */}
      {gridLines.map((gl, i) => (
        <g key={i}>
          <line x1={pad.l} y1={gl.y} x2={W - pad.r} y2={gl.y}
            stroke="var(--border)" strokeWidth="1" strokeDasharray={i === 0 ? '' : '3 3'} />
          <text x={pad.l - 5} y={gl.y + 4} textAnchor="end"
            fontSize="7.5" fill="var(--text3)" fontFamily="var(--font-mono)">{gl.val}</text>
        </g>
      ))}
      {/* Bars */}
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x} y={b.y} width={barW} height={b.barH} rx="3"
            fill={color}
            opacity={hovIdx !== null && hovIdx !== i ? 0.35 : 0.88}
            style={{ cursor: 'crosshair' }}
            onMouseEnter={() => setHovIdx(i)}
          />
          <text x={b.cx} y={H - pad.b + 13} textAnchor="middle"
            fontSize="7.5" fill={hovIdx === i ? 'var(--text2)' : 'var(--text3)'}
            fontFamily="var(--font-ui)">
            {String(b.x).slice(0, 9)}
          </text>
        </g>
      ))}
      {/* Tooltip */}
      {hovIdx !== null && bars[hovIdx] && (
        <SvgTip x={bars[hovIdx].cx} y={bars[hovIdx].y}
          label={bars[hovIdx].x} value={bars[hovIdx].y}
          W={W} padL={pad.l} padR={pad.r} />
      )}
    </svg>
  );
}

/* ─── Line Chart ────────────────────────────────────────────── */
function SvgLineChart({ data, color }) {
  const [hovIdx, setHovIdx] = useState(null);
  if (!data || !data.length) return null;

  const W = 560, H = 200;
  const pad = { t: 20, r: 12, b: 42, l: 52 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;
  const maxY = Math.max(...data.map(d => d.y), 1);
  const gradId = 'lg' + color.replace('#', '');

  const pts = data.map((d, i) => ({
    ...d,
    px: pad.l + (cW / (data.length - 1 || 1)) * i,
    py: pad.t + cH - (d.y / maxY) * cH,
  }));

  function buildCurvePath(points) {
    if (points.length < 2) return `M ${points[0]?.px} ${points[0]?.py}`;
    let d = `M ${points[0].px} ${points[0].py}`;
    for (let i = 1; i < points.length; i++) {
      const p = points[i - 1], c = points[i];
      const cp1x = p.px + (c.px - p.px) * 0.4;
      const cp2x = c.px - (c.px - p.px) * 0.4;
      d += ` C ${cp1x} ${p.py} ${cp2x} ${c.py} ${c.px} ${c.py}`;
    }
    return d;
  }

  const linePath = buildCurvePath(pts);
  const areaPath = pts.length < 2 ? '' :
    `M ${pts[0].px} ${pad.t + cH} L ${pts[0].px} ${pts[0].py}` +
    pts.slice(1).map((p, j) => {
      const prev = pts[j];
      const cp1x = prev.px + (p.px - prev.px) * 0.4;
      const cp2x = p.px - (p.px - prev.px) * 0.4;
      return ` C ${cp1x} ${prev.py} ${cp2x} ${p.py} ${p.px} ${p.py}`;
    }).join('') +
    ` L ${pts[pts.length - 1].px} ${pad.t + cH} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(pct => ({
    y: pad.t + cH * (1 - pct),
    val: fmtVal(maxY * pct),
  }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      onMouseLeave={() => setHovIdx(null)}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {gridLines.map((gl, i) => (
        <g key={i}>
          <line x1={pad.l} y1={gl.y} x2={W - pad.r} y2={gl.y}
            stroke="var(--border)" strokeWidth="1" strokeDasharray={i === 0 ? '' : '3 3'} />
          <text x={pad.l - 5} y={gl.y + 4} textAnchor="end"
            fontSize="7.5" fill="var(--text3)" fontFamily="var(--font-mono)">{gl.val}</text>
        </g>
      ))}
      {/* Area + line */}
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ pointerEvents: 'none' }} />
      {/* Points */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.px} cy={p.py} r="12" fill="transparent"
            style={{ cursor: 'crosshair' }}
            onMouseEnter={() => setHovIdx(i)} />
          <circle cx={p.px} cy={p.py}
            r={hovIdx === i ? 5 : 3.5}
            fill={color} stroke="var(--surface)" strokeWidth="1.5"
            style={{ pointerEvents: 'none' }} />
          <text x={p.px} y={H - pad.b + 13} textAnchor="middle"
            fontSize="7.5" fill={hovIdx === i ? 'var(--text2)' : 'var(--text3)'}
            fontFamily="var(--font-ui)">
            {String(p.x).slice(0, 9)}
          </text>
        </g>
      ))}
      {/* Tooltip */}
      {hovIdx !== null && pts[hovIdx] && (
        <SvgTip x={pts[hovIdx].px} y={pts[hovIdx].py}
          label={pts[hovIdx].x} value={pts[hovIdx].y}
          W={W} padL={pad.l} padR={pad.r} />
      )}
    </svg>
  );
}

/* ─── Pie / Donut Chart ─────────────────────────────────────── */
function SvgPieChart({ data }) {
  const [hovIdx, setHovIdx] = useState(null);
  if (!data || !data.length) return null;

  const total = data.reduce((a, d) => a + d.y, 0);
  if (!total) return null;

  const r = 112, innerR = 52;
  const LEG_ROW_H = 28;

  // Adaptive layout: side legend ≤6 items, bottom legend for more
  const sideLegend = data.length <= 6;
  const COLS = data.length > 10 ? 3 : 2;

  let W, H, cx, cy;
  if (sideLegend) {
    W = 520;
    H = Math.max(280, 24 + data.length * 34 + 24);
    cx = 130; cy = H / 2;
  } else {
    const legRows = Math.ceil(data.length / COLS);
    W = 520;
    cy = r + 24;
    H = cy + r + 28 + legRows * LEG_ROW_H + 12;
    cx = W / 2;
  }

  let angle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const sweep = (d.y / total) * Math.PI * 2;
    const sa = angle;
    angle += sweep;
    const ea = angle;
    const mid = sa + sweep / 2;
    const dx = hovIdx === i ? Math.cos(mid) * 8 : 0;
    const dy = hovIdx === i ? Math.sin(mid) * 8 : 0;
    const x1 = cx + r * Math.cos(sa), y1 = cy + r * Math.sin(sa);
    const x2 = cx + r * Math.cos(ea), y2 = cy + r * Math.sin(ea);
    const ix1 = cx + innerR * Math.cos(ea), iy1 = cy + innerR * Math.sin(ea);
    const ix2 = cx + innerR * Math.cos(sa), iy2 = cy + innerR * Math.sin(sa);
    const large = sweep > Math.PI ? 1 : 0;
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`;
    return { ...d, path, color: PIE_COLORS[i % PIE_COLORS.length], pct: ((d.y / total) * 100).toFixed(1), dx, dy };
  });

  const hov = hovIdx !== null ? slices[hovIdx] : null;

  // Legend item renderer
  function LegendItem({ sl, i, lx, ly, rectSize = 14, fontSize = 13, pctSize = 11.5 }) {
    return (
      <g onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(null)} style={{ cursor: 'pointer' }}>
        <rect x={lx} y={ly} width={rectSize} height={rectSize} rx="3"
          fill={sl.color} opacity={hovIdx !== null && hovIdx !== i ? 0.4 : 1} />
        <text x={lx + rectSize + 6} y={ly + rectSize - 2} fontSize={fontSize}
          fill={hovIdx === i ? 'var(--text)' : 'var(--text2)'}
          fontFamily="var(--font-ui)">
          {String(sl.x).slice(0, 12)}
          <tspan fill="var(--text3)" fontSize={pctSize}> ({sl.pct}%)</tspan>
        </text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', maxWidth: W, overflow: 'visible' }}>
      {/* Slices */}
      {slices.map((sl, i) => (
        <path
          key={i} d={sl.path}
          fill={sl.color}
          stroke="var(--surface)" strokeWidth="2"
          opacity={hovIdx !== null && hovIdx !== i ? 0.55 : 1}
          transform={`translate(${sl.dx}, ${sl.dy})`}
          style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
          onMouseEnter={() => setHovIdx(i)}
          onMouseLeave={() => setHovIdx(null)}
        />
      ))}
      {/* Center info — switches on hover */}
      {hov ? (
        <>
          <text x={cx} y={cy - 16} textAnchor="middle" fontSize="17" fontWeight="700"
            fill="var(--text)" fontFamily="var(--font-mono)">{fmtVal(hov.y)}</text>
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12" fontWeight="600"
            fill={hov.color} fontFamily="var(--font-ui)">{String(hov.x).slice(0, 10)}</text>
          <text x={cx} y={cy + 22} textAnchor="middle" fontSize="11"
            fill="var(--text3)" fontFamily="var(--font-mono)">{hov.pct}%</text>
        </>
      ) : (
        <>
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="19" fontWeight="700"
            fill="var(--text)" fontFamily="var(--font-mono)">{fmtVal(total)}</text>
          <text x={cx} y={cy + 15} textAnchor="middle" fontSize="11"
            fill="var(--text3)" fontFamily="var(--font-ui)">total</text>
        </>
      )}
      {/* Legend — side (≤6) or below (>6) */}
      {sideLegend
        ? slices.map((sl, i) => (
            <LegendItem key={i} sl={sl} i={i}
              lx={cx + r + 22} ly={cy - (slices.length * 34) / 2 + i * 34}
              fontSize={13} pctSize={11.5} />
          ))
        : (() => {
            const legStartY = cy + r + 28;
            const colW = W / COLS;
            return slices.map((sl, i) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              return (
                <LegendItem key={i} sl={sl} i={i}
                  lx={col * colW + 6} ly={legStartY + row * LEG_ROW_H}
                  rectSize={12} fontSize={12} pctSize={10.5} />
              );
            });
          })()
      }
    </svg>
  );
}

/* ─── Code Generator ────────────────────────────────────────── */
function genReact({ rows, fields, xField, yField, chartType, filterFields }) {
  const fieldArr = Object.values(fields || {});
  const numFields = fieldArr.filter(f => f.type === 'number').slice(0, 4);
  const tableFields = fieldArr.filter(f => f.type !== 'id').slice(0, 8);
  const sample = (rows || []).slice(0, 100);

  const chartImports = chartType === 'bar'
    ? 'BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer'
    : chartType === 'line'
    ? 'LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer'
    : 'PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend';

  const chartJSX = chartType === 'bar' ? `
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="${xField}" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="${yField}" fill="#6366f1" radius={[3,3,0,0]} />
        </BarChart>
      </ResponsiveContainer>` : chartType === 'line' ? `
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="${xField}" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="${yField}" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>` : `
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="${yField}" nameKey="${xField}" cx="50%" cy="50%" outerRadius={100} innerRadius={50} label>
            {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>`;

  const filterStateLines = filterFields.map(f =>
    `  const [filter_${f.replace(/\./g, '_')}, setFilter_${f.replace(/\./g, '_')}] = useState('');`
  ).join('\n');

  const filterConditions = filterFields.map(f =>
    `      (!filter_${f.replace(/\./g, '_')} || String(row['${f}']) === filter_${f.replace(/\./g, '_')})`
  ).join(' &&\n');

  const filterDropdowns = filterFields.map(f => {
    const ff = fields[f];
    const opts = ff?.uniqueValues || [];
    return `        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>${f}:</label>
          <select value={filter_${f.replace(/\./g, '_')}} onChange={e => setFilter_${f.replace(/\./g, '_')}(e.target.value)} style={{ fontSize: 11, padding: '3px 6px', borderRadius: 4, border: '1px solid #374151', background: '#1f2937', color: '#f9fafb', cursor: 'pointer' }}>
            <option value="">All</option>
            ${opts.map(o => `<option value="${o}">${o}</option>`).join('\n            ')}
          </select>
        </div>`;
  }).join('\n');

  const statCards = numFields.map(f => `
        <div style={cardStyle}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9ca3af', marginBottom: 4 }}>${f.key.toUpperCase()}</div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'monospace' }}>{fmtVal(filtered.reduce((sum, r) => sum + (Number(r['${f.key}']) || 0), 0))}</div>
          <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{filtered.length} rows</div>
        </div>`).join('');

  const thCells = tableFields.map(f => `<th key="${f.key}" style={thStyle} onClick={() => setSort('${f.key}')}>${f.key} {sort === '${f.key}' ? (dir === 'asc' ? '↑' : '↓') : ''}</th>`).join('\n          ');
  const tdCells = tableFields.map(f => `<td key="${f.key}" style={tdStyle}>{String(row['${f.key}'] ?? '')}</td>`).join('\n            ');

  return `import { useState, useMemo } from 'react';
import { ${chartImports} } from 'recharts';

const COLORS = ['#6366f1','#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899'];

function fmtVal(n) {
  const abs = Math.abs(n);
  if (abs >= 1e9) return (n/1e9).toFixed(1)+'B';
  if (abs >= 1e6) return (n/1e6).toFixed(1)+'M';
  if (abs >= 1e3) return (n/1e3).toFixed(1)+'K';
  return Math.round(n).toLocaleString();
}

const data = ${JSON.stringify(sample, null, 2)};

const cardStyle = { background: '#1f2937', border: '1px solid #374151', borderLeft: '3px solid #6366f1', borderRadius: 8, padding: '12px 16px', minWidth: 120, flex: 1 };
const thStyle = { padding: '9px 12px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textAlign: 'left', background: '#111827', borderBottom: '2px solid #374151', whiteSpace: 'nowrap', cursor: 'pointer' };
const tdStyle = { padding: '8px 12px', fontSize: 11.5, color: '#d1d5db', borderBottom: '1px solid #1f2937', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

export default function Dashboard() {
${filterStateLines}
  const [sort, setSort] = useState('');
  const [dir, setDir] = useState('asc');

  const filtered = data.filter(row =>
${filterConditions || '    true'}
  );

  const chartData = useMemo(() => {
    const map = {};
    filtered.forEach(row => {
      const key = String(row['${xField}'] ?? '');
      if (!map[key]) map[key] = { '${xField}': key, '${yField}': 0 };
      map[key]['${yField}'] += Number(row['${yField}']) || 0;
    });
    return Object.values(map).slice(0, 30);
  }, [filtered]);

  const sorted = sort
    ? [...filtered].sort((a, b) => {
        const va = a[sort], vb = b[sort];
        const num = typeof va === 'number' && typeof vb === 'number';
        return dir === 'asc'
          ? num ? va - vb : String(va).localeCompare(String(vb))
          : num ? vb - va : String(vb).localeCompare(String(va));
      })
    : filtered;

  const tableRows = sorted.slice(0, 50);

  function handleSort(field) {
    if (sort === field) setDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSort(field); setDir('asc'); }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#111827', color: '#f9fafb', padding: 24, minHeight: '100vh' }}>
      {/* Stat Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
${statCards}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', padding: '10px 14px', background: '#1f2937', borderRadius: 8, border: '1px solid #374151', marginBottom: 16 }}>
${filterDropdowns}
      </div>

      {/* Chart */}
      <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>${yField} by ${xField}</div>
${chartJSX}
      </div>

      {/* Table */}
      <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
          ${thCells}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
            ${tdCells}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length > 50 && (
          <div style={{ fontSize: 11, color: '#6b7280', padding: '8px 12px', borderTop: '1px solid #374151' }}>
            Showing 50 of {sorted.length} rows
          </div>
        )}
      </div>
    </div>
  );
}
`;
}

/* ─── Init ──────────────────────────────────────────────────── */
const INIT_SCHEMA = analyzeJSON(SAMPLE_JSON);
const INIT_CFG = autoConfig(INIT_SCHEMA.fields || {});

/* ─── Main Component ────────────────────────────────────────── */
export default function JsonDashboardGeneratorTool() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [schema, setSchema] = useState(INIT_SCHEMA);
  const [xField, setXField] = useState(INIT_CFG.xField);
  const [yField, setYField] = useState(INIT_CFG.yField);
  const [chartType, setChartType] = useState(INIT_CFG.chartType);
  const [filterFields, setFilterFields] = useState(INIT_CFG.filterFields);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortField, setSortField] = useState('');
  const [sortDir, setSortDir] = useState('asc');
  const [tablePage, setTablePage] = useState(0);
  const [codeTab, setCodeTab] = useState('react');
  const [copied, setCopied] = useState(false);
  const [chartColor, setChartColor] = useState('#6366f1');
  const [chartLimit, setChartLimit] = useState(30);

  function handleJsonChange(val) {
    setJsonInput(val);
    const newSchema = analyzeJSON(val);
    setSchema(newSchema);
    if (!newSchema.error && newSchema.fields) {
      const cfg = autoConfig(newSchema.fields);
      setXField(cfg.xField);
      setYField(cfg.yField);
      setChartType(cfg.chartType);
      setFilterFields(cfg.filterFields);
      setActiveFilters({});
      setTablePage(0);
    }
  }

  const fieldArr = useMemo(() => Object.values(schema.fields || {}), [schema]);
  const numFields = useMemo(() => fieldArr.filter(f => f.type === 'number'), [fieldArr]);
  const catBoolFields = useMemo(() => fieldArr.filter(f => f.type === 'category' || f.type === 'boolean'), [fieldArr]);
  const tableFields = useMemo(() => fieldArr.filter(f => f.type !== 'id').slice(0, 8), [fieldArr]);

  const filteredRows = useMemo(() => {
    if (!schema.rows) return [];
    return schema.rows.filter(row =>
      Object.entries(activeFilters).every(([k, v]) => !v || String(row[k]) === v)
    );
  }, [schema.rows, activeFilters]);

  const chartData = useMemo(() => {
    if (!xField || !yField) return [];
    const map = {};
    filteredRows.forEach(row => {
      const key = String(row[xField] ?? '');
      if (!map[key]) map[key] = { x: key, y: 0 };
      map[key].y += Number(row[yField]) || 0;
    });
    return Object.values(map).slice(0, chartLimit);
  }, [filteredRows, xField, yField, chartLimit]);

  const sortedRows = useMemo(() => {
    if (!sortField) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const va = a[sortField], vb = b[sortField];
      const isNum = typeof va === 'number' && typeof vb === 'number';
      return sortDir === 'asc'
        ? isNum ? va - vb : String(va).localeCompare(String(vb))
        : isNum ? vb - va : String(vb).localeCompare(String(va));
    });
  }, [filteredRows, sortField, sortDir]);

  const tableRows = useMemo(() =>
    sortedRows.slice(tablePage * PAGE_SIZE, (tablePage + 1) * PAGE_SIZE),
    [sortedRows, tablePage]
  );
  const totalPages = Math.ceil(sortedRows.length / PAGE_SIZE);

  const statCards = useMemo(() =>
    numFields.slice(0, 4).map(f => ({
      name: f.key,
      sum: filteredRows.reduce((acc, r) => acc + (Number(r[f.key]) || 0), 0),
      count: filteredRows.length,
    })),
    [numFields, filteredRows]
  );

  const yFieldStats = useMemo(() => {
    if (!yField || !schema.fields?.[yField]) return null;
    const f = schema.fields[yField];
    if (f.type !== 'number') return null;
    return { avg: f.avg, min: f.min, max: f.max, sum: f.sum };
  }, [yField, schema.fields]);

  const code = useMemo(() => {
    if (codeTab === 'data') return JSON.stringify(filteredRows.slice(0, 100), null, 2);
    if (!schema.rows) return '// Paste valid JSON to generate code';
    return genReact({ rows: schema.rows, fields: schema.fields || {}, xField, yField, chartType, filterFields });
  }, [codeTab, schema, filteredRows, xField, yField, chartType, filterFields]);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleSort(field) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
    setTablePage(0);
  }

  function toggleFilterField(key) {
    setFilterFields(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    setActiveFilters(prev => { const next = { ...prev }; delete next[key]; return next; });
  }

  const hasValidSchema = !schema.error && schema.rows;
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className={s.wrap}>
      <JsonToolsTopNav active="json-dashboard-generator" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="14" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="10" y="8" width="4" height="14" rx="1" fill="currentColor"/>
              <rect x="18" y="4" width="4" height="18" rx="1" fill="currentColor" opacity="0.85"/>
              <line x1="1" y1="23" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span>JSON Dashboard <span className={s.accent}>Generator</span></span>
        </div>
        <div className={s.headerRight}>
          <span className={s.hint}>Paste any JSON → charts · filters · React code</span>
        </div>
      </div>

      {/* Body */}
      <div className={s.body}>
        {/* Left Panel */}
        <div className={s.left}>
          <div className={s.leftScroll}>
            {/* JSON Input */}
            <div className={s.section}>
              <div className={s.sectionTitle}>JSON Input</div>
              <textarea
                className={s.jsonInput}
                value={jsonInput}
                onChange={e => handleJsonChange(e.target.value)}
                placeholder="Paste JSON array or API response..."
                spellCheck={false}
              />
              {schema.error ? (
                <div className={s.parseError}>✗ {schema.error}</div>
              ) : schema.rows ? (
                <div className={s.parsedOk}>✓ {schema.rows.length} rows · {fieldArr.length} fields</div>
              ) : null}
            </div>

            {/* Detected Fields */}
            {hasValidSchema && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Detected Fields</div>
                <div className={s.fieldList}>
                  {fieldArr.map(f => {
                    const meta = TYPE_META[f.type] || TYPE_META.string;
                    const hint = f.type === 'number'
                      ? `Σ ${fmtVal(f.sum)}`
                      : f.cardinality !== undefined ? `${f.cardinality} vals` : '';
                    return (
                      <div key={f.key} className={s.fieldItem}>
                        <span className={s.fieldBadge} style={{ background: meta.color + '22', color: meta.color }}>
                          {meta.label}
                        </span>
                        <span className={s.fieldName}>{f.key}</span>
                        {hint && <span className={s.fieldHint}>{hint}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Chart Config */}
            {hasValidSchema && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Chart</div>
                <div className={s.segmented}>
                  {['bar', 'line', 'pie'].map(ct => (
                    <button
                      key={ct}
                      className={`${s.seg} ${chartType === ct ? s.segActive : ''}`}
                      onClick={() => setChartType(ct)}
                    >
                      {ct === 'bar' ? '▦ Bar' : ct === 'line' ? '↗ Line' : '◉ Pie'}
                    </button>
                  ))}
                </div>
                <div className={s.row}>
                  <span className={s.rowLabel}>X axis</span>
                  <select className={s.select} value={xField} onChange={e => setXField(e.target.value)}>
                    {fieldArr.map(f => <option key={f.key} value={f.key}>{f.key}</option>)}
                  </select>
                </div>
                <div className={s.row}>
                  <span className={s.rowLabel}>Y axis</span>
                  <select className={s.select} value={yField} onChange={e => setYField(e.target.value)}>
                    {numFields.map(f => <option key={f.key} value={f.key}>{f.key}</option>)}
                  </select>
                </div>
                {/* Color picker */}
                <div className={s.row}>
                  <span className={s.rowLabel}>Color</span>
                  <div className={s.colorDots}>
                    {CHART_COLORS.map(c => (
                      <button
                        key={c.value}
                        className={`${s.colorDot} ${chartColor === c.value ? s.colorDotActive : ''}`}
                        style={{ background: c.value }}
                        onClick={() => setChartColor(c.value)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
                {/* Max data points (hidden for pie) */}
                {chartType !== 'pie' && (
                  <div className={s.row}>
                    <span className={s.rowLabel}>Max pts</span>
                    <input
                      type="range" min="5" max="50" value={chartLimit}
                      onChange={e => setChartLimit(+e.target.value)}
                      className={s.range}
                    />
                    <span className={s.rowVal}>{chartLimit}</span>
                  </div>
                )}
              </div>
            )}

            {/* Filters Config */}
            {hasValidSchema && catBoolFields.length > 0 && (
              <div className={s.section}>
                <div className={s.sectionTitle}>Filters</div>
                {catBoolFields.map(f => (
                  <label key={f.key} className={s.checkRow}>
                    <input
                      type="checkbox"
                      className={s.check}
                      checked={filterFields.includes(f.key)}
                      onChange={() => toggleFilterField(f.key)}
                    />
                    <span className={s.fieldName}>{f.key}</span>
                    {f.cardinality !== undefined && (
                      <span className={s.fieldHint}>{f.cardinality} vals</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className={s.right}>
          <div className={s.dashboard}>
            {/* Meta Banner */}
            {schema.meta && Object.keys(schema.meta).length > 0 && (
              <div className={s.metaBanner}>
                {Object.entries(schema.meta).map(([k, v]) => (
                  <span key={k} className={s.metaChip}>
                    <strong>{k}:</strong> {String(v)}
                  </span>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!hasValidSchema && (
              <div className={s.emptyState}>
                <div className={s.emptyIcon}>
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                    <rect x="4" y="30" width="10" height="18" rx="2" fill="#6366f1" opacity="0.3"/>
                    <rect x="21" y="18" width="10" height="30" rx="2" fill="#6366f1" opacity="0.5"/>
                    <rect x="38" y="8" width="10" height="40" rx="2" fill="#6366f1" opacity="0.7"/>
                    <line x1="2" y1="50" x2="50" y2="50" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                  </svg>
                </div>
                <div className={s.emptyTitle}>Paste JSON to generate a dashboard</div>
                <div className={s.emptyHint}>
                  Supports arrays, paginated responses with data/results/items keys,<br />
                  nested objects, and mixed field types.
                </div>
                {schema.error && (
                  <div className={s.parseError} style={{ maxWidth: 320, textAlign: 'center' }}>
                    {schema.error}
                  </div>
                )}
              </div>
            )}

            {hasValidSchema && (
              <>
                {/* Stat Cards */}
                {statCards.length > 0 && (
                  <div className={s.statRow}>
                    {statCards.map(card => (
                      <div key={card.name} className={s.statCard}>
                        <div className={s.statLabel}>{card.name}</div>
                        <div className={s.statValue}>{fmtVal(card.sum)}</div>
                        <div className={s.statSub}>{card.count} rows</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Filter Bar */}
                {filterFields.length > 0 && (
                  <div className={s.filterBar}>
                    {filterFields.map(key => {
                      const f = schema.fields[key];
                      const opts = f?.uniqueValues || [];
                      return (
                        <div key={key} className={s.filterItem}>
                          <span className={s.filterLabel}>{key}:</span>
                          <select
                            className={s.filterSelect}
                            value={activeFilters[key] || ''}
                            onChange={e => {
                              setActiveFilters(prev => ({ ...prev, [key]: e.target.value }));
                              setTablePage(0);
                            }}
                          >
                            <option value="">All</option>
                            {opts.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      );
                    })}
                    {activeFilterCount > 0 && (
                      <button className={s.clearFilters} onClick={() => { setActiveFilters({}); setTablePage(0); }}>
                        ✕ Clear
                      </button>
                    )}
                  </div>
                )}

                {/* Chart */}
                {xField && yField && chartData.length > 0 && (
                  <div className={s.chartCard}>
                    <div className={s.chartTitle}>{yField} by {xField}</div>
                    {chartType === 'bar' && <SvgBarChart data={chartData} color={chartColor} />}
                    {chartType === 'line' && <SvgLineChart data={chartData} color={chartColor} />}
                    {chartType === 'pie' && <SvgPieChart data={chartData} />}
                    {/* Chart stats strip */}
                    {yFieldStats && chartType !== 'pie' && (
                      <div className={s.chartStats}>
                        <span className={s.chartStat}>
                          <span className={s.chartStatLabel}>avg</span>
                          {fmtVal(yFieldStats.avg)}
                        </span>
                        <span className={s.chartStat}>
                          <span className={s.chartStatLabel}>min</span>
                          {fmtVal(yFieldStats.min)}
                        </span>
                        <span className={s.chartStat}>
                          <span className={s.chartStatLabel}>max</span>
                          {fmtVal(yFieldStats.max)}
                        </span>
                        <span className={s.chartStat}>
                          <span className={s.chartStatLabel}>total</span>
                          {fmtVal(yFieldStats.sum)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Table */}
                {tableFields.length > 0 && (
                  <div className={s.tableWrap}>
                    <div className={s.tableScroll}>
                      <table className={s.table}>
                        <thead>
                          <tr>
                            {tableFields.map(f => (
                              <th key={f.key} className={s.th} onClick={() => handleSort(f.key)}>
                                {f.key}{' '}
                                {sortField === f.key
                                  ? (sortDir === 'asc' ? '↑' : '↓')
                                  : <span style={{ opacity: 0.3 }}>↕</span>}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.map((row, ri) => (
                            <tr key={ri} className={s.tr}>
                              {tableFields.map(f => (
                                <td key={f.key} className={s.td}>{String(row[f.key] ?? '')}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className={s.tablePager}>
                      <span className={s.tableCount}>
                        {sortedRows.length === 0
                          ? 'No rows'
                          : `Rows ${tablePage * PAGE_SIZE + 1}–${Math.min((tablePage + 1) * PAGE_SIZE, sortedRows.length)} of ${sortedRows.length}`}
                      </span>
                      <div className={s.pagerBtns}>
                        <button className={s.pagerBtn} onClick={() => setTablePage(0)} disabled={tablePage === 0} aria-label="First page">«</button>
                        <button className={s.pagerBtn} onClick={() => setTablePage(p => Math.max(0, p - 1))} disabled={tablePage === 0} aria-label="Previous page">‹</button>
                        <button className={s.pagerBtn} onClick={() => setTablePage(p => Math.min(totalPages - 1, p + 1))} disabled={tablePage >= totalPages - 1} aria-label="Next page">›</button>
                        <button className={s.pagerBtn} onClick={() => setTablePage(totalPages - 1)} disabled={tablePage >= totalPages - 1} aria-label="Last page">»</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Code Panel */}
          <div className={s.codePanel}>
            <div className={s.codeTabs}>
              <button className={`${s.codeTab} ${codeTab === 'react' ? s.codeTabActive : ''}`} onClick={() => setCodeTab('react')}>
                React (Recharts)
              </button>
              <button className={`${s.codeTab} ${codeTab === 'data' ? s.codeTabActive : ''}`} onClick={() => setCodeTab('data')}>
                JSON Data
              </button>
              <div className={s.codeTabSpacer} />
              <button className={copied ? s.copyOk : s.copyBtn} onClick={handleCopy}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className={s.codeScroll}>
              <pre className={s.code}>{code}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
