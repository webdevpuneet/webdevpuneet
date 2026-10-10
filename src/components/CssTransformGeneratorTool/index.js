'use client';

import { useState, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Default state ──────────────────────────────────────────── */
const DEFAULTS = {
  translateX: 0, translateY: 0, translateZ: 0,
  rotateX: 0, rotateY: 0, rotateZ: 0,
  scaleX: 1, scaleY: 1,
  skewX: 0, skewY: 0,
};

/* ── Presets ─────────────────────────────────────────────────── */
const PRESETS = [
  { label: 'None',        values: { ...DEFAULTS } },
  { label: 'Flip H',      values: { ...DEFAULTS, scaleX: -1 } },
  { label: 'Flip V',      values: { ...DEFAULTS, scaleY: -1 } },
  { label: 'Rotate 45°',  values: { ...DEFAULTS, rotateZ: 45 } },
  { label: 'Rotate 90°',  values: { ...DEFAULTS, rotateZ: 90 } },
  { label: 'Scale Up',    values: { ...DEFAULTS, scaleX: 1.5, scaleY: 1.5 } },
  { label: 'Scale Down',  values: { ...DEFAULTS, scaleX: 0.5, scaleY: 0.5 } },
  { label: 'Skew',        values: { ...DEFAULTS, skewX: 20, skewY: 10 } },
  { label: 'Tilt 3D',     values: { ...DEFAULTS, rotateX: 30, rotateY: 20 } },
  { label: 'Slide Right', values: { ...DEFAULTS, translateX: 40 } },
];

/* ── Export formats ──────────────────────────────────────────── */
const EXPORT_TABS = ['CSS', 'Tailwind', 'React'];

/* ── Slider groups ───────────────────────────────────────────── */
const GROUPS = [
  {
    id: 'translate', label: 'Translate', icon: '↔',
    sliders: [
      { key: 'translateX', label: 'X', unit: 'px', min: -200, max: 200, step: 1 },
      { key: 'translateY', label: 'Y', unit: 'px', min: -200, max: 200, step: 1 },
      { key: 'translateZ', label: 'Z', unit: 'px', min: -200, max: 200, step: 1 },
    ],
  },
  {
    id: 'rotate', label: 'Rotate', icon: '↻',
    sliders: [
      { key: 'rotateZ', label: 'Z', unit: 'deg', min: -360, max: 360, step: 1 },
      { key: 'rotateX', label: 'X', unit: 'deg', min: -180, max: 180, step: 1 },
      { key: 'rotateY', label: 'Y', unit: 'deg', min: -180, max: 180, step: 1 },
    ],
  },
  {
    id: 'scale', label: 'Scale', icon: '⤢',
    sliders: [
      { key: 'scaleX', label: 'X', unit: '×', min: -3, max: 3, step: 0.05 },
      { key: 'scaleY', label: 'Y', unit: '×', min: -3, max: 3, step: 0.05 },
    ],
  },
  {
    id: 'skew', label: 'Skew', icon: '⟋',
    sliders: [
      { key: 'skewX', label: 'X', unit: 'deg', min: -80, max: 80, step: 1 },
      { key: 'skewY', label: 'Y', unit: 'deg', min: -80, max: 80, step: 1 },
    ],
  },
];

/* ── Build transform string ──────────────────────────────────── */
function buildTransform(v, perspective = 600) {
  const parts = [];
  if (v.translateX !== 0 || v.translateY !== 0 || v.translateZ !== 0) {
    if (v.translateZ !== 0) parts.push(`translate3d(${v.translateX}px, ${v.translateY}px, ${v.translateZ}px)`);
    else if (v.translateY !== 0) parts.push(`translate(${v.translateX}px, ${v.translateY}px)`);
    else parts.push(`translateX(${v.translateX}px)`);
  }
  if (v.rotateX !== 0) parts.push(`rotateX(${v.rotateX}deg)`);
  if (v.rotateY !== 0) parts.push(`rotateY(${v.rotateY}deg)`);
  if (v.rotateZ !== 0) parts.push(`rotateZ(${v.rotateZ}deg)`);
  if (v.scaleX !== 1 || v.scaleY !== 1) {
    if (v.scaleX === v.scaleY) parts.push(`scale(${v.scaleX})`);
    else parts.push(`scale(${v.scaleX}, ${v.scaleY})`);
  }
  if (v.skewX !== 0 || v.skewY !== 0) {
    if (v.skewY !== 0) parts.push(`skew(${v.skewX}deg, ${v.skewY}deg)`);
    else parts.push(`skewX(${v.skewX}deg)`);
  }
  return parts.length ? parts.join('\n    ') : 'none';
}

function buildPerspective(v) {
  return v.rotateX !== 0 || v.rotateY !== 0 || v.translateZ !== 0;
}

function buildCSS(v, origin, perspective) {
  const t = buildTransform(v, perspective);
  const needs3d = buildPerspective(v);
  const lines = [`.element {`];
  if (needs3d) lines.push(`  perspective: ${perspective}px;`);
  lines.push(`  transform: ${t === 'none' ? 'none' : t.replace(/\n    /g, '\n    ')};`);
  if (origin !== '50% 50%') lines.push(`  transform-origin: ${origin};`);
  lines.push(`}`);
  return lines.join('\n');
}

function buildTailwind(v, origin) {
  const parts = [];
  if (v.translateX !== 0) parts.push(`translate-x-[${v.translateX}px]`);
  if (v.translateY !== 0) parts.push(`translate-y-[${v.translateY}px]`);
  if (v.rotateZ !== 0) parts.push(`rotate-[${v.rotateZ}deg]`);
  if (v.scaleX === v.scaleY && v.scaleX !== 1) parts.push(`scale-[${v.scaleX}]`);
  else {
    if (v.scaleX !== 1) parts.push(`scale-x-[${v.scaleX}]`);
    if (v.scaleY !== 1) parts.push(`scale-y-[${v.scaleY}]`);
  }
  if (v.skewX !== 0) parts.push(`skew-x-[${v.skewX}deg]`);
  if (v.skewY !== 0) parts.push(`skew-y-[${v.skewY}deg]`);
  if (!parts.length) return `<!-- no Tailwind transform classes needed -->`;
  let out = `<div class="${parts.join(' ')}">`;
  if (origin !== '50% 50%') out += `\n  <!-- Note: add style="transform-origin: ${origin}" for custom origin -->`;
  out += `\n  <!-- content -->\n</div>`;
  return out;
}

function buildReact(v, origin, perspective) {
  const t = buildTransform(v, perspective);
  const needs3d = buildPerspective(v);
  const styleLines = [];
  if (needs3d) styleLines.push(`    perspective: '${perspective}px'`);
  styleLines.push(`    transform: '${t === 'none' ? 'none' : t.replace(/\n    /g, ' ')}'`);
  if (origin !== '50% 50%') styleLines.push(`    transformOrigin: '${origin}'`);
  return `<div\n  style={{\n${styleLines.join(',\n')},\n  }}\n>\n  {/* content */}\n</div>`;
}

/* ── Origin options ──────────────────────────────────────────── */
const ORIGINS = [
  'top left', 'top center', 'top right',
  'center left', 'center', 'center right',
  'bottom left', 'bottom center', 'bottom right',
];

const ORIGIN_DISPLAY = {
  'top left': '50% 50%' === 'top left' ? '50% 50%' : 'top left',
};

/* ── Fork to My Code ──────────────────────────────────────────────
   Hands the current transform to /ui-snippets/mycode/ as an editable snippet: the same
   hand-off the demo pages use (localStorage under uis_fork_<token>, claimed from
   #fork=ls:<token>), with the snippet itself in the fragment when storage is blocked.
   Nothing goes to a server. */
const FORK_PREFIX = 'uis_fork_';
const FORK_PATH = '/ui-snippets/mycode/';

function b64url(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function forkPayload(v, origin, perspective, color) {
  const t = buildTransform(v, perspective);
  const needs3d = buildPerspective(v);
  const css = [
    '* { box-sizing: border-box; }',
    'body {',
    '  margin: 0;',
    '  min-height: 100vh;',
    '  display: grid;',
    '  place-items: center;',
    '  background: #f1f5f9;',
    '  font-family: system-ui, -apple-system, sans-serif;',
    '}',
    '',
    '/* The stage supplies the perspective for 3D transforms on .element */',
    '.stage {',
    '  display: grid;',
    '  place-items: center;',
    '  width: 100%;',
    '  min-height: 100vh;',
    ...(needs3d ? [`  perspective: ${perspective}px;`] : []),
    '}',
    '',
    '.element {',
    '  width: 120px;',
    '  height: 120px;',
    '  display: grid;',
    '  place-items: center;',
    '  border-radius: 10px;',
    `  background: ${color};`,
    '  color: rgba(255, 255, 255, 0.9);',
    '  font: 700 12px system-ui, sans-serif;',
    '  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);',
    '  transition: transform 0.3s ease;',
    `  transform: ${t === 'none' ? 'none' : t.replace(/\n    /g, '\n    ')};`,
    ...(origin !== '50% 50%' ? [`  transform-origin: ${origin};`] : []),
    '}',
  ].join('\n');
  return {
    v: 1,
    name: 'CSS Transform',
    html: '<div class="stage">\n  <div class="element">Element</div>\n</div>',
    css,
    js: '',
    cdnUrls: [],
  };
}

function forkUrl(payload) {
  try {
    const token = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const key = FORK_PREFIX + token;
    localStorage.setItem(key, JSON.stringify({ t: Date.now(), payload }));
    if (localStorage.getItem(key)) return `${FORK_PATH}#fork=ls:${token}`;
  } catch { /* no storage: fall back to the fragment */ }
  return `${FORK_PATH}#fork=${b64url(JSON.stringify(payload))}`;
}

export default function CssTransformGeneratorTool() {
  const [values, setValues] = useState({ ...DEFAULTS });
  const [origin, setOrigin] = useState('center');
  const [perspective, setPerspective] = useState(600);
  const [exportTab, setExportTab] = useState('CSS');
  const [copied, setCopied] = useState(false);
  const [previewBg, setPreviewBg] = useState('#6366f1');
  const [activePreset, setActivePreset] = useState('None');
  const [showGrid, setShowGrid] = useState(true);

  const set = (key, val) => {
    setValues(p => ({ ...p, [key]: val }));
    setActivePreset('');
  };

  const reset = () => { setValues({ ...DEFAULTS }); setActivePreset('None'); };

  const isDefault = useMemo(() =>
    Object.entries(DEFAULTS).every(([k, v]) => values[k] === v), [values]);

  const transformStr = useMemo(() => buildTransform(values), [values]);
  const needs3d = useMemo(() => buildPerspective(values), [values]);

  const originCss = origin === 'center' ? '50% 50%' : origin;

  const exportCode = useMemo(() => {
    switch (exportTab) {
      case 'CSS':     return buildCSS(values, originCss, perspective);
      case 'Tailwind': return buildTailwind(values, originCss);
      case 'React':   return buildReact(values, originCss, perspective);
      default: return '';
    }
  }, [exportTab, values, originCss, perspective]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(exportCode); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  const forkToMyCode = () => {
    window.open(forkUrl(forkPayload(values, originCss, perspective, previewBg)), '_blank', 'noopener');
  };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-transform-generator" />

      <div className={styles.body}>
        {/* ── Left: sliders ── */}
        <aside className={styles.sidebar}>
          {/* Title, live value and the two main actions stay pinned at the top of the panel */}
          <div className={styles.sideTop}>
            <div className={styles.sideTitleRow}>
              <div className={styles.logoIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 3v18M3 9h18"/>
                </svg>
              </div>
              <div className={styles.headerTitle}>CSS <span className={styles.accent}>Transform</span> Generator</div>
            </div>
            <code
              className={styles.sideCode}
              title={transformStr === 'none' ? 'transform: none' : `transform: ${transformStr.replace(/\n    /g, ' ')}`}
            >
              {transformStr === 'none' ? 'transform: none' : `transform: ${transformStr.replace(/\n    /g, ' ')}`}
            </code>
            <div className={styles.sideActions}>
              <button className={styles.resetBtn} onClick={reset} disabled={isDefault}>Reset</button>
              <button className={styles.copyBtn} onClick={copy}>{copied ? '✓ Copied' : 'Copy CSS'}</button>
              <button
                className={`${styles.copyBtn} ${styles.forkBtn}`}
                onClick={forkToMyCode}
                title="Open this transform in My Code as an editable HTML + CSS snippet"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 7.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><line x1="12" y1="11.5" x2="12" y2="16.5"/></svg>
                Fork to My Code
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className={styles.group}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>✦</span>
              <span className={styles.groupLabel}>Presets</span>
            </div>
            <div className={styles.presetGrid}>
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  className={`${styles.presetBtn} ${activePreset === p.label ? styles.presetBtnActive : ''}`}
                  onClick={() => { setValues({ ...p.values }); setActivePreset(p.label); }}
                >{p.label}</button>
              ))}
            </div>
          </div>

          <div className={styles.divider}/>

          {GROUPS.map(group => (
            <div key={group.id} className={styles.group}>
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon}>{group.icon}</span>
                <span className={styles.groupLabel}>{group.label}</span>
              </div>
              {group.sliders.map(s => (
                <div key={s.key} className={styles.sliderRow}>
                  <div className={styles.sliderLabelRow}>
                    <span className={styles.sliderLabel}>{s.label}-axis</span>
                    <div className={styles.valWrap}>
                      <input
                        type="number"
                        className={styles.numInput}
                        value={values[s.key]}
                        min={s.min} max={s.max} step={s.step}
                        onChange={e => set(s.key, +e.target.value)}
                      />
                      <span className={styles.unit}>{s.unit}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className={styles.slider}
                    min={s.min} max={s.max} step={s.step}
                    value={values[s.key]}
                    onChange={e => set(s.key, +e.target.value)}
                  />
                  <div className={styles.sliderMinMax}>
                    <span>{s.min}{s.unit}</span>
                    <span>0</span>
                    <span>{s.max}{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className={styles.divider}/>

          {/* Origin */}
          <div className={styles.group}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>◎</span>
              <span className={styles.groupLabel}>Transform Origin</span>
            </div>
            <div className={styles.originGrid}>
              {ORIGINS.map(o => (
                <button
                  key={o}
                  className={`${styles.originBtn} ${origin === o ? styles.originBtnActive : ''}`}
                  onClick={() => setOrigin(o)}
                  title={o}
                />
              ))}
            </div>
            <div className={styles.originLabel}>{origin}</div>
          </div>

          {/* Perspective */}
          {needs3d && (
            <>
              <div className={styles.divider}/>
              <div className={styles.group}>
                <div className={styles.groupHeader}>
                  <span className={styles.groupIcon}>◈</span>
                  <span className={styles.groupLabel}>Perspective</span>
                </div>
                <div className={styles.sliderRow}>
                  <div className={styles.sliderLabelRow}>
                    <span className={styles.sliderLabel}>Depth</span>
                    <div className={styles.valWrap}>
                      <input
                        type="number"
                        className={styles.numInput}
                        value={perspective}
                        min={100} max={2000} step={50}
                        onChange={e => setPerspective(+e.target.value)}
                      />
                      <span className={styles.unit}>px</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className={styles.slider}
                    min={100} max={2000} step={50}
                    value={perspective}
                    onChange={e => setPerspective(+e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </aside>

        {/* ── Right: preview + output ── */}
        <div className={styles.rightCol}>
          {/* Ad space: top of the right panel, above the preview */}
          <PlaygroundTopAd />

          {/* Preview */}
          <div className={styles.previewArea}>
            <div className={`${styles.previewBg} ${showGrid ? styles.previewGrid : ''}`}
              style={{ perspective: needs3d ? `${perspective}px` : undefined }}
            >
              {/* Origin crosshair */}
              <div className={styles.crosshair}>
                <div className={styles.crosshairH}/>
                <div className={styles.crosshairV}/>
              </div>
              <div
                className={styles.previewBox}
                style={{
                  transform: transformStr === 'none' ? undefined : transformStr.replace(/\n    /g, ' '),
                  transformOrigin: originCss,
                  background: previewBg,
                }}
              >
                <span className={styles.previewLabel}>Element</span>
              </div>
            </div>
            {/* Preview controls */}
            <div className={styles.previewControls}>
              <label className={styles.previewCtrlLabel}>
                <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)}/>
                Grid
              </label>
              <div className={styles.colorDots}>
                {['#6366f1', '#10b981', '#f59e0b', '#f87171', '#3b82f6', '#ec4899'].map(c => (
                  <button
                    key={c}
                    className={`${styles.colorDot} ${previewBg === c ? styles.colorDotActive : ''}`}
                    style={{ background: c }}
                    onClick={() => setPreviewBg(c)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Export output */}
          <div className={styles.output}>
            <div className={styles.outputHeader}>
              <div className={styles.outputTabs}>
                {EXPORT_TABS.map(t => (
                  <button
                    key={t}
                    className={`${styles.outputTab} ${exportTab === t ? styles.outputTabActive : ''}`}
                    onClick={() => setExportTab(t)}
                  >{t}</button>
                ))}
              </div>
              <button className={styles.copyBtn} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
            </div>
            <pre className={styles.code}><code>{exportCode}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
