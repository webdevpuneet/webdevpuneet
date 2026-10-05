'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { forkToMyCode, b64url } from '@/lib/fork-to-mycode';
import {
  SPACES, RADIAL_SIZES, BLEND_MODES, colorAt, stopColor, layerCSS, backgroundParts,
  backgroundValue, cssDeclarations, textContrast, renderCanvas, renderSVG, svgSupported,
} from './engine';

/* ── Animations ─────────────────────────────────────────────────────────── */
const ANIM_PRESETS = [
  { id: 'none',      label: 'Off' },
  {
    id: 'slide',     label: 'Slide',
    keyframes: `@keyframes _gSlide { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }`,
    previewStyle: (s) => ({ backgroundSize: '300% 300%', animation: `_gSlide ${s}s ease infinite` }),
    exportKeyframes: (s) => `background-size: 300% 300%;\nanimation: gradSlide ${s}s ease infinite;\n\n@keyframes gradSlide {\n  0%, 100% { background-position: 0% 50%; }\n  50%       { background-position: 100% 50%; }\n}`,
  },
  {
    id: 'diagonal',  label: 'Diagonal',
    keyframes: `@keyframes _gDiag { 0%,100%{background-position:0% 0%} 50%{background-position:100% 100%} }`,
    previewStyle: (s) => ({ backgroundSize: '300% 300%', animation: `_gDiag ${s}s ease infinite` }),
    exportKeyframes: (s) => `background-size: 300% 300%;\nanimation: gradDiagonal ${s}s ease infinite;\n\n@keyframes gradDiagonal {\n  0%, 100% { background-position: 0% 0%; }\n  50%       { background-position: 100% 100%; }\n}`,
  },
  {
    id: 'hue',       label: 'Hue Shift',
    keyframes: `@keyframes _gHue { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }`,
    previewStyle: (s) => ({ animation: `_gHue ${s}s linear infinite` }),
    exportKeyframes: (s) => `animation: gradHue ${s}s linear infinite;\n\n@keyframes gradHue {\n  0%   { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}`,
  },
  {
    id: 'breathe',   label: 'Breathe',
    keyframes: `@keyframes _gBreathe { 0%,100%{background-size:100% 100%} 50%{background-size:250% 250%} }`,
    previewStyle: (s) => ({ animation: `_gBreathe ${s}s ease-in-out infinite` }),
    exportKeyframes: (s) => `animation: gradBreathe ${s}s ease-in-out infinite;\n\n@keyframes gradBreathe {\n  0%, 100% { background-size: 100% 100%; }\n  50%       { background-size: 250% 250%; }\n}`,
  },
  {
    id: 'pulse',     label: 'Pulse',
    keyframes: `@keyframes _gPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`,
    previewStyle: (s) => ({ animation: `_gPulse ${s}s ease-in-out infinite` }),
    exportKeyframes: (s) => `animation: gradPulse ${s}s ease-in-out infinite;\n\n@keyframes gradPulse {\n  0%, 100% { opacity: 1; }\n  50%       { opacity: 0.4; }\n}`,
  },
  {
    id: 'spin',      label: 'Spin ✦',
    keyframes: `@property --ga{syntax:"<angle>";inherits:false;initial-value:0deg;} @keyframes _gSpin{to{--ga:360deg}}`,
    previewStyle: (s) => ({ animation: `_gSpin ${s}s linear infinite` }),
    exportKeyframes: (s) => `/* Spins the top linear layer — uses @property (Chrome, Edge, Safari 16.4+, Firefox 128+) */\nanimation: gradSpin ${s}s linear infinite;\n\n@property --gradient-angle {\n  syntax: "<angle>";\n  inherits: false;\n  initial-value: 0deg;\n}\n\n@keyframes gradSpin {\n  to { --gradient-angle: 360deg; }\n}`,
  },
];

/* ── Model ──────────────────────────────────────────────────────────────── */
let stopId = 0;
let layerId = 0;
const mkStop = (c, p, a = 100) => ({ id: ++stopId, c, p, a });
function mkLayer(over = {}) {
  const stops = over.stops || [{ c: '#7c6dfa', p: 0 }, { c: '#c47fff', p: 50 }, { c: '#4dd9c0', p: 100 }];
  return {
    type: 'linear', angle: 135, shape: 'ellipse', size: 'farthest-corner', cx: 50, cy: 50, from: 0,
    repeating: false, repeatSize: 40, hard: false, blend: 'normal',
    ...over,
    id: ++layerId,
    stops: stops.map(s => mkStop(s.c, s.p, s.a ?? 100)),
  };
}
const defaultCfg = () => ({
  layers: [mkLayer()], space: 'oklch', eased: false, grain: 0,
  animId: 'none', animSpeed: 4, previewMode: 'bg',
});

const HEX = /^#[0-9a-f]{6}$/i;
const num = (v, d, min, max) => (typeof v === 'number' && isFinite(v) ? Math.min(max, Math.max(min, v)) : d);
/** Validates anything read from storage or a shared link; returns a fresh config or null. */
function normalizeCfg(raw) {
  if (!raw || !Array.isArray(raw.layers) || !raw.layers.length) return null;
  const layers = raw.layers.slice(0, 6).map(l => {
    const stops = (Array.isArray(l.stops) ? l.stops : [])
      .filter(s => s && HEX.test(s.c))
      .slice(0, 16)
      .map(s => ({ c: s.c.toLowerCase(), p: num(s.p, 0, 0, 100), a: num(s.a, 100, 0, 100) }));
    if (stops.length < 2) return null;
    return mkLayer({
      type: ['linear', 'radial', 'conic'].includes(l.type) ? l.type : 'linear',
      angle: num(l.angle, 135, 0, 360),
      shape: l.shape === 'circle' ? 'circle' : 'ellipse',
      size: RADIAL_SIZES.includes(l.size) ? l.size : 'farthest-corner',
      cx: num(l.cx, 50, 0, 100), cy: num(l.cy, 50, 0, 100), from: num(l.from, 0, 0, 360),
      repeating: !!l.repeating, repeatSize: num(l.repeatSize, 40, 2, 400), hard: !!l.hard,
      blend: BLEND_MODES.includes(l.blend) ? l.blend : 'normal',
      stops,
    });
  }).filter(Boolean);
  if (!layers.length) return null;
  return {
    layers,
    space: SPACES.some(([id]) => id === raw.space) ? raw.space : 'srgb',
    eased: !!raw.eased,
    grain: num(raw.grain, 0, 0, 100),
    animId: ANIM_PRESETS.some(a => a.id === raw.animId) ? raw.animId : 'none',
    animSpeed: num(raw.animSpeed, 4, 1, 12),
    previewMode: PREVIEW_MODES.some(([id]) => id === raw.previewMode) ? raw.previewMode : 'bg',
  };
}
/** Compact, id-free copy for storage and share links. */
const serialize = cfg => ({
  ...cfg,
  layers: cfg.layers.map(({ id, stops, ...rest }) => ({ ...rest, stops: stops.map(({ c, p, a }) => ({ c, p, a })) })),
});

const PREVIEW_MODES = [['bg', 'Background'], ['hero', 'Hero'], ['card', 'Card'], ['button', 'Buttons'], ['text', 'Text'], ['border', 'Border']];
const EXPORT_TABS = [['css', 'CSS'], ['tailwind', 'Tailwind'], ['scss', 'SCSS'], ['var', 'CSS Variable'], ['react', 'React']];
const SIZES = [['1920x1080', '1920×1080'], ['2560x1440', '2560×1440'], ['1200x630', '1200×630 social'], ['1080x1080', '1080×1080 square'], ['1080x1920', '1080×1920 story']];

/* ── Presets ────────────────────────────────────────────────────────────── */
const lin = (angle, stops) => ({ layers: [{ type: 'linear', angle, stops }] });
const PRESETS = [
  { name: 'Cosmic',  ...lin(135, [{ c: '#7c6dfa', p: 0 }, { c: '#c47fff', p: 50 }, { c: '#4dd9c0', p: 100 }]) },
  { name: 'Sunset',  ...lin(135, [{ c: '#ff6b6b', p: 0 }, { c: '#feca57', p: 50 }, { c: '#ff9ff3', p: 100 }]) },
  { name: 'Ocean',   ...lin(90,  [{ c: '#0f3460', p: 0 }, { c: '#16213e', p: 50 }, { c: '#0f3460', p: 100 }]) },
  { name: 'Forest',  ...lin(135, [{ c: '#134e5e', p: 0 }, { c: '#71b280', p: 100 }]) },
  { name: 'Fire',    ...lin(135, [{ c: '#f7971e', p: 0 }, { c: '#ffd200', p: 100 }]) },
  { name: 'Neon',    ...lin(135, [{ c: '#f953c6', p: 0 }, { c: '#b91d73', p: 100 }]) },
  { name: 'Aurora',  ...lin(135, [{ c: '#00c6ff', p: 0 }, { c: '#0072ff', p: 100 }]) },
  { name: 'Rose',    ...lin(135, [{ c: '#f64f59', p: 0 }, { c: '#c471ed', p: 50 }, { c: '#12c2e9', p: 100 }]) },
  {
    name: 'Aurora mesh', space: 'oklab', grain: 18,
    layers: [
      { type: 'radial', shape: 'circle', size: 'farthest-side', cx: 15, cy: 20, stops: [{ c: '#22d3ee', a: 85, p: 0 }, { c: '#22d3ee', a: 0, p: 55 }] },
      { type: 'radial', shape: 'circle', size: 'farthest-side', cx: 85, cy: 25, stops: [{ c: '#a855f7', a: 80, p: 0 }, { c: '#a855f7', a: 0, p: 55 }] },
      { type: 'radial', shape: 'circle', size: 'farthest-side', cx: 55, cy: 100, stops: [{ c: '#f472b6', a: 70, p: 0 }, { c: '#f472b6', a: 0, p: 60 }] },
      { type: 'linear', angle: 160, stops: [{ c: '#0f172a', p: 0 }, { c: '#1e1b4b', p: 100 }] },
    ],
  },
  { name: 'Grainy sunset', space: 'oklch', eased: true, grain: 30, ...lin(160, [{ c: '#ff7e5f', p: 0 }, { c: '#feb47b', p: 55 }, { c: '#ffd194', p: 100 }]) },
  // Two near-identical reds + "long hue" = a full trip round the color wheel.
  { name: 'Rainbow', space: 'oklch-longer', ...lin(90, [{ c: '#ff4d6d', p: 0 }, { c: '#ff5e4d', p: 100 }]) },
  {
    name: 'Spotlight', space: 'oklab',
    layers: [
      { type: 'radial', shape: 'ellipse', size: 'closest-side', cx: 50, cy: 0, stops: [{ c: '#ffffff', a: 40, p: 0 }, { c: '#ffffff', a: 0, p: 100 }] },
      { type: 'linear', angle: 180, stops: [{ c: '#1e293b', p: 0 }, { c: '#020617', p: 100 }] },
    ],
  },
  { name: 'Candy stripes', layers: [{ type: 'linear', angle: 45, repeating: true, repeatSize: 40, hard: true, stops: [{ c: '#f472b6', p: 0 }, { c: '#fbcfe8', p: 50 }] }] },
  { name: 'Pie chart', layers: [{ type: 'conic', from: 0, hard: true, stops: [{ c: '#3b82f6', p: 0 }, { c: '#22c55e', p: 40 }, { c: '#f59e0b', p: 65 }, { c: '#ef4444', p: 85 }] }] },
  {
    name: 'Peach glow', space: 'oklch', eased: true,
    layers: [
      { type: 'radial', shape: 'circle', size: 'farthest-side', cx: 80, cy: 20, stops: [{ c: '#fde68a', a: 90, p: 0 }, { c: '#fde68a', a: 0, p: 70 }] },
      { type: 'linear', angle: 135, stops: [{ c: '#fb7185', p: 0 }, { c: '#f97316', p: 100 }] },
    ],
  },
  { name: 'Ripples', layers: [{ type: 'radial', shape: 'circle', repeating: true, repeatSize: 36, cx: 50, cy: 50, stops: [{ c: '#0ea5e9', p: 0 }, { c: '#38bdf8', p: 50 }, { c: '#0ea5e9', p: 100 }] }] },
];

// Swatch backgrounds, computed once.
const PRESET_BG = PRESETS.map(p => backgroundValue({
  ...defaultCfg(), space: p.space || 'oklch', eased: !!p.eased, grain: 0, layers: p.layers.map(l => mkLayer(l)),
}));

/* ── Small UI pieces ────────────────────────────────────────────────────── */

const CHECKER = 'repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 12px 12px';

function GradientBar({ layer, barCSS, space, onStopChange, onStopAdd, selectedId, onSelect }) {
  const barRef = useRef(null);
  const dragging = useRef(null);

  const getPercent = (clientX) => {
    const rect = barRef.current.getBoundingClientRect();
    return Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  useEffect(() => {
    const onMove = (e) => { if (dragging.current !== null) onStopChange(dragging.current, 'p', getPercent(e.clientX)); };
    const onUp = () => { dragging.current = null; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, [onStopChange]);

  const handleBarClick = (e) => {
    if (e.target !== barRef.current) return;
    const p = getPercent(e.clientX);
    const { c, a } = colorAt(layer.stops, p, space);
    onStopAdd(p, c, a);
  };

  // Arrow keys nudge the selected stop; Delete removes it (handled by the parent via onStopChange).
  const onKey = (e, s) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const step = e.shiftKey ? 10 : 1;
      onStopChange(s.id, 'p', Math.max(0, Math.min(100, s.p + (e.key === 'ArrowLeft' ? -step : step))));
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      onStopChange(s.id, '__remove');
    }
  };

  return (
    <div className={styles.gradBarWrap}>
      <div className={styles.gradBarChecker} style={{ background: CHECKER }}>
        <div ref={barRef} className={styles.gradBar} style={{ background: barCSS }} onClick={handleBarClick}>
          {layer.stops.map(s => (
            <div
              key={s.id}
              role="slider"
              tabIndex={0}
              aria-label={`Color stop ${s.c} at ${s.p}%`}
              aria-valuemin={0} aria-valuemax={100} aria-valuenow={s.p}
              className={`${styles.gradHandle} ${selectedId === s.id ? styles.gradHandleActive : ''}`}
              style={{ left: `calc(${s.p}% - 8px)`, background: s.c }}
              onPointerDown={e => { e.stopPropagation(); dragging.current = s.id; onSelect(s.id); }}
              onClick={e => { e.stopPropagation(); onSelect(s.id); }}
              onFocus={() => onSelect(s.id)}
              onKeyDown={e => onKey(e, s)}
            />
          ))}
        </div>
      </div>
      <p className={styles.gradBarHint}>Click the bar to add a stop · drag or use ← → to move · Delete removes</p>
    </div>
  );
}

function AngleDial({ value, onChange }) {
  const ref = useRef(null);
  const set = (e) => {
    const r = ref.current.getBoundingClientRect();
    const deg = Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
    onChange(Math.round((deg + 360) % 360));
  };
  const rad = (value - 90) * Math.PI / 180;
  return (
    <div
      ref={ref}
      className={styles.dial}
      role="slider"
      tabIndex={0}
      aria-label="Gradient angle"
      aria-valuemin={0} aria-valuemax={360} aria-valuenow={value}
      onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); set(e); }}
      onPointerMove={e => { if (e.buttons) set(e); }}
      onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); onChange((value + (e.shiftKey ? 15 : 1)) % 360); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); onChange((value - (e.shiftKey ? 15 : 1) + 360) % 360); }
      }}
    >
      <span className={styles.dialKnob} style={{ left: `${50 + Math.cos(rad) * 38}%`, top: `${50 + Math.sin(rad) * 38}%` }} />
      <span className={styles.dialLine} style={{ transform: `rotate(${value}deg)` }} />
    </div>
  );
}

function Seg({ value, options, onChange, small }) {
  return (
    <div className={styles.modeBtns}>
      {options.map(([v, label]) => (
        <button key={v} type="button" className={`${styles.modeBtn} ${small ? styles.modeBtnSm : ''} ${value === v ? styles.modeBtnActive : ''}`} onClick={() => onChange(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}

const randomColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
const STORAGE_KEY = 'wdp-gradient-generator-v2';
const OLD_STORAGE_KEY = 'wdp-gradient-generator-v1';

function download(name, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ── Main ───────────────────────────────────────────────────────────────── */
export default function GradientGeneratorTool() {
  const hydrated = useRef(false);
  const saveTimer = useRef(null);

  const [cfg, setCfg] = useState(defaultCfg);
  const [active, setActive] = useState(0);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [exportMode, setExportMode] = useState('css');
  const [copied, setCopied] = useState(false);
  const [saveState, setSaveState] = useState('idle');
  const [toast, setToast] = useState('');
  const [size, setSize] = useState('1920x1080');
  const [contrast, setContrast] = useState(null);

  const layer = cfg.layers[Math.min(active, cfg.layers.length - 1)];
  const flash = msg => { setToast(msg); setTimeout(() => setToast(''), 2200); };

  /* ── Updates ── */
  const update = useCallback(patch => setCfg(c => ({ ...c, ...patch })), []);
  const updateLayer = useCallback(patch => setCfg(c => ({
    ...c, layers: c.layers.map((l, i) => (i === Math.min(active, c.layers.length - 1) ? { ...l, ...patch } : l)),
  })), [active]);
  const setStops = useCallback(fn => setCfg(c => ({
    ...c, layers: c.layers.map((l, i) => (i === Math.min(active, c.layers.length - 1) ? { ...l, stops: fn(l.stops) } : l)),
  })), [active]);

  const updateStop = useCallback((id, field, val) => {
    if (field === '__remove') {
      setStops(st => (st.length > 2 ? st.filter(s => s.id !== id) : st));
      setSelectedStopId(null);
      return;
    }
    setStops(st => st.map(s => (s.id === id ? { ...s, [field]: val } : s)));
  }, [setStops]);
  const addStop = (p, c, a = 100) => {
    if (p === undefined) {
      const ps = layer.stops.map(s => s.p);
      p = Math.round((Math.max(...ps) + Math.min(...ps)) / 2);
      ({ c, a } = colorAt(layer.stops, p, cfg.space));
    }
    const s = mkStop(c, p, a);
    setStops(st => [...st, s]);
    setSelectedStopId(s.id);
  };
  const removeStop = id => updateStop(id, '__remove');

  const addLayer = () => {
    const c = randomColor();
    const l = mkLayer({ type: 'radial', shape: 'circle', size: 'farthest-side', cx: 25 + Math.round(Math.random() * 50), cy: 25 + Math.round(Math.random() * 50), stops: [{ c, a: 85, p: 0 }, { c, a: 0, p: 60 }] });
    setCfg(cfg2 => ({ ...cfg2, layers: [l, ...cfg2.layers].slice(0, 6) }));
    setActive(0);
  };
  const removeLayer = i => {
    if (cfg.layers.length < 2) return;
    setCfg(c => ({ ...c, layers: c.layers.filter((_, j) => j !== i) }));
    setActive(a => Math.max(0, a >= i ? a - 1 : a));
  };
  const moveLayer = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= cfg.layers.length) return;
    setCfg(c => { const ls = [...c.layers]; [ls[i], ls[j]] = [ls[j], ls[i]]; return { ...c, layers: ls }; });
    setActive(j);
  };

  const applyPreset = p => {
    setCfg(c => ({
      ...c,
      layers: p.layers.map(l => mkLayer(l)),
      space: p.space || 'oklch', eased: !!p.eased, grain: p.grain || 0,
    }));
    setActive(0);
    setSelectedStopId(null);
  };
  const randomize = () => setStops(st => st.map(s => ({ ...s, c: randomColor() })));

  /* ── Restore: share link first, then saved state ── */
  useEffect(() => {
    let loaded = null;
    try {
      const m = window.location.hash.match(/^#g=([\w-]+)/);
      if (m) {
        const json = decodeURIComponent(escape(atob(m[1].replace(/-/g, '+').replace(/_/g, '/'))));
        loaded = normalizeCfg(JSON.parse(json));
        if (loaded) flash('Loaded a shared gradient');
      }
    } catch { /* bad link: fall through */ }
    if (!loaded) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) loaded = normalizeCfg(JSON.parse(raw));
        if (!loaded) {
          // v1 (single gradient) → one layer
          const old = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY) || 'null');
          if (old && Array.isArray(old.stops)) {
            loaded = normalizeCfg({
              layers: [{ type: old.mode, angle: old.angle, cx: old.radialX, cy: old.radialY, from: old.conicAngle, stops: old.stops }],
              space: 'srgb', animId: old.animId, animSpeed: old.animSpeed, previewMode: old.previewMode,
            });
          }
        }
      } catch { /* ignore */ }
    }
    if (loaded) setCfg(loaded);
    hydrated.current = true;
  }, []);

  /* ── Debounced save ── */
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize(cfg)));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch { /* storage full or blocked */ }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [cfg]);

  /* ── Contrast of text over the gradient (sampled from a small render) ── */
  useEffect(() => {
    const t = setTimeout(() => { try { setContrast(textContrast(cfg)); } catch { setContrast(null); } }, 150);
    return () => clearTimeout(t);
  }, [cfg]);
  const best = contrast
    ? (contrast.white >= contrast.dark ? { color: '#ffffff', ratio: contrast.white, label: 'White' } : { color: '#0f172a', ratio: contrast.dark, label: 'Dark' })
    : { color: '#ffffff', ratio: null, label: 'White' };

  const handleReset = () => {
    setCfg(defaultCfg());
    setActive(0);
    setSelectedStopId(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setSaveState('idle');
  };

  /* ── Derived CSS ── */
  const activeAnim = ANIM_PRESETS.find(a => a.id === cfg.animId);
  const animOn = activeAnim && activeAnim.id !== 'none';
  const spin = cfg.animId === 'spin' && cfg.layers[0].type === 'linear';
  const parts = useMemo(() => backgroundParts(cfg, spin ? { angleVar: `var(--ga, ${cfg.layers[0].angle}deg)` } : {}), [cfg, spin]);
  const previewBg = parts.layers.join(', ');
  // backgroundImage (not the `background` shorthand) so the text preview keeps background-clip: text.
  const previewStyle = { backgroundImage: previewBg, backgroundBlendMode: parts.blend || undefined, ...(animOn ? activeAnim.previewStyle(cfg.animSpeed) : {}) };
  const barCSS = useMemo(() => layerCSS({ ...layer, type: 'linear', angle: 90, repeating: false }, cfg), [layer, cfg]);

  /* ── Export code ── */
  const exportCode = useMemo(() => {
    const opts = spin ? { angleVar: `var(--gradient-angle, ${cfg.layers[0].angle}deg)` } : {};
    const { layers, blend } = backgroundParts(cfg, opts);
    const oneLine = layers.join(', ');
    let animDecl = '', keyframes = '';
    if (animOn) {
      const full = activeAnim.exportKeyframes(cfg.animSpeed);
      const cut = full.indexOf('\n\n');
      animDecl = '\n' + full.slice(0, cut).split('\n').map(l => '  ' + l).join('\n');
      keyframes = '\n\n' + full.slice(cut + 2);
    }
    const mode = cfg.previewMode;
    const spaceNote = cfg.space !== 'srgb' ? `/* Uses CSS color interpolation (${cfg.space === 'oklch-longer' ? 'in oklch longer hue' : 'in ' + cfg.space}) — Chrome 111+, Safari 16.2+, Firefox 127+ */\n` : '';

    if (exportMode === 'css') {
      if (mode === 'text') {
        return `.gradient-text {\n${cssDeclarations(cfg, '  ', opts)}\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  -webkit-text-fill-color: transparent;${animDecl}\n}${keyframes}`;
      }
      if (mode === 'border') {
        return `/* Gradient border: a solid padding-box layer over the gradient border-box */\n.gradient-border {\n  border: 2px solid transparent;\n  border-radius: 12px;\n  background:\n    linear-gradient(#ffffff, #ffffff) padding-box,\n    ${layers.join(' border-box,\n    ')} border-box;\n}`;
      }
      const sel = mode === 'hero' ? '.hero' : mode === 'card' ? '.card-media' : mode === 'button' ? '.gradient-btn' : '.gradient';
      const extra = mode === 'hero' || mode === 'button' ? `\n  color: ${best.color};` : '';
      return `${sel} {\n${cssDeclarations(cfg, '  ', opts)}${extra}${animDecl}\n}${keyframes}`;
    }
    if (exportMode === 'tailwind') {
      const v = oneLine.replace(/ /g, '_');
      const cls = [`bg-[${v}]`];
      if (blend) cls.push(`[background-blend-mode:${blend.replace(/ /g, '')}]`);
      if (mode === 'text') cls.push('bg-clip-text', 'text-transparent');
      return `${spaceNote}<!-- Tailwind CSS arbitrary values (spaces become underscores) -->\n<div class="${cls.join(' ')}"></div>`;
    }
    if (exportMode === 'scss') {
      return `${spaceNote}$gradient:\n  ${layers.join(',\n  ')};\n${blend ? `$gradient-blend: ${blend};\n` : ''}\n.gradient {\n  background: $gradient;${blend ? '\n  background-blend-mode: $gradient-blend;' : ''}${mode === 'text' ? '\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;' : ''}\n}`;
    }
    if (exportMode === 'var') {
      return `${spaceNote}:root {\n  --gradient:\n    ${layers.join(',\n    ')};${blend ? `\n  --gradient-blend: ${blend};` : ''}\n}\n\n.gradient {\n  background: var(--gradient);${blend ? '\n  background-blend-mode: var(--gradient-blend);' : ''}\n}`;
    }
    // react
    return `${spaceNote ? spaceNote.replace('/*', '//').replace(' */', '') : ''}const gradientStyle = {\n  background: \`${oneLine}\`,${blend ? `\n  backgroundBlendMode: '${blend}',` : ''}${mode === 'text' ? "\n  backgroundClip: 'text',\n  WebkitBackgroundClip: 'text',\n  color: 'transparent'," : ''}\n};\n\nexport default function Gradient({ children }) {\n  return <div style={gradientStyle}>{children}</div>;\n}`;
  }, [cfg, exportMode, spin, animOn, activeAnim, best.color]);

  const copy = () => {
    navigator.clipboard.writeText(exportCode).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  /* ── Share link, downloads, fork ── */
  const shareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#g=${b64url(JSON.stringify(serialize(cfg)))}`;
    navigator.clipboard.writeText(url).then(() => flash('Share link copied')).catch(() => flash('Could not copy the link'));
    window.history.replaceState(null, '', url);
  };
  const [W, H] = size.split('x').map(Number);
  const downloadPNG = () => {
    const canvas = renderCanvas(cfg, W, H);
    if (!canvas) return;
    canvas.toBlob(b => b && download(`gradient-${W}x${H}.png`, b), 'image/png');
  };
  const canSVG = svgSupported(cfg);
  const downloadSVG = () => {
    if (!canSVG) return;
    download(`gradient-${W}x${H}.svg`, new Blob([renderSVG(cfg, W, H)], { type: 'image/svg+xml' }));
  };
  const fork = () => {
    let animDecl = '', keyframes = '';
    if (animOn) {
      const full = activeAnim.exportKeyframes(cfg.animSpeed);
      const cut = full.indexOf('\n\n');
      animDecl = '\n' + full.slice(0, cut).split('\n').map(l => '  ' + l).join('\n');
      keyframes = '\n\n' + full.slice(cut + 2);
    }
    const opts = spin ? { angleVar: `var(--gradient-angle, ${cfg.layers[0].angle}deg)` } : {};
    const onText = best.color === '#ffffff' ? '#0f172a' : '#ffffff';
    forkToMyCode({
      name: 'Gradient — Gradient Generator',
      html: `<section class="gradient-hero">\n  <h1>Your gradient, ready to use</h1>\n  <p>Made with the Gradient Generator on webdevpuneet.com</p>\n  <a href="#">Get started</a>\n</section>`,
      css: `* { box-sizing: border-box; }\nbody { margin: 0; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; }\n\n.gradient-hero {\n  min-height: 100vh;\n  display: grid;\n  place-content: center;\n  gap: 16px;\n  padding: 48px 24px;\n  text-align: center;\n  color: ${best.color};\n${cssDeclarations(cfg, '  ', opts)}${animDecl}\n}\n.gradient-hero h1 { margin: 0; font-size: clamp(32px, 6vw, 64px); line-height: 1.1; }\n.gradient-hero p { margin: 0; font-size: 18px; opacity: 0.85; }\n.gradient-hero a {\n  justify-self: center;\n  padding: 12px 28px;\n  border-radius: 999px;\n  background: ${best.color};\n  color: ${onText};\n  font-weight: 700;\n  text-decoration: none;\n}${keyframes}`,
      js: '',
    });
  };

  /* ── Drag the radial / conic center on the preview ── */
  const centerDrag = layer.type !== 'linear' && ['bg', 'hero'].includes(cfg.previewMode);
  const setCenterFrom = e => {
    const r = e.currentTarget.getBoundingClientRect();
    updateLayer({
      cx: Math.round(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100))),
      cy: Math.round(Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100))),
    });
  };
  const centerHandlers = centerDrag ? {
    onPointerDown: e => { if (e.target.closest('a,button')) return; e.currentTarget.setPointerCapture(e.pointerId); setCenterFrom(e); },
    onPointerMove: e => { if (e.buttons) setCenterFrom(e); },
  } : {};

  const sortedStops = useMemo(() => [...layer.stops].sort((a, b) => a.p - b.p), [layer.stops]);
  const spaceInfo = SPACES.find(([id]) => id === cfg.space);
  const aa = best.ratio == null ? null : best.ratio >= 4.5 ? 'AA' : best.ratio >= 3 ? 'AA large' : 'Fails';

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="gradient-generator" />
      <div className={styles.layout}>
        {/* ── Left panel ── */}
        <aside className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerIcon}>◈</div>
            <span className={styles.headerTitle}>Gradient <span className={styles.headerAccent}>Generator</span></span>
            <div className={styles.headerActions}>
              <span className={`${styles.saveIndicator} ${saveState === 'saving' ? styles.saveIndicatorSaving : saveState === 'saved' ? styles.saveIndicatorSaved : ''}`}>
                <span className={styles.saveDot} />
                {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Auto-saved'}
              </span>
              <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
            </div>
          </div>

          {/* Layers */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Layers</div>
              <button className={styles.addBtn} onClick={addLayer} disabled={cfg.layers.length >= 6}>+ Layer</button>
            </div>
            <div className={styles.layerList}>
              {cfg.layers.map((l, i) => (
                <div key={l.id} className={`${styles.layerItem} ${i === active ? styles.layerItemActive : ''}`} onClick={() => setActive(i)}>
                  <span className={styles.layerSwatch} style={{ background: `${layerCSS({ ...l, type: 'linear', angle: 90, repeating: false }, cfg)}, ${CHECKER}` }} />
                  <span className={styles.layerName}>
                    {l.repeating ? 'Repeating ' : ''}{l.type}{i === 0 && cfg.layers.length > 1 ? ' · top' : ''}{i === cfg.layers.length - 1 && cfg.layers.length > 1 ? ' · base' : ''}
                  </span>
                  <button className={styles.iconBtn} title="Move up" disabled={i === 0} onClick={e => { e.stopPropagation(); moveLayer(i, -1); }}>↑</button>
                  <button className={styles.iconBtn} title="Move down" disabled={i === cfg.layers.length - 1} onClick={e => { e.stopPropagation(); moveLayer(i, 1); }}>↓</button>
                  {cfg.layers.length > 1 && <button className={styles.iconBtn} title="Remove layer" onClick={e => { e.stopPropagation(); removeLayer(i); }}>✕</button>}
                </div>
              ))}
            </div>
            {cfg.layers.length > 1 && active < cfg.layers.length - 1 && (
              <div className={styles.inlineRow}>
                <span className={styles.controlLabel}>Blend</span>
                <select className={styles.select} value={layer.blend} onChange={e => updateLayer({ blend: e.target.value })}>
                  {BLEND_MODES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            )}
            <p className={styles.hint}>The top layer paints first. Fade a stop's opacity to 0 so the layers below show through.</p>
          </div>

          {/* Type + per-type controls */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Type</div>
            <Seg value={layer.type} options={[['linear', 'Linear'], ['radial', 'Radial'], ['conic', 'Conic']]} onChange={v => updateLayer({ type: v })} />

            {layer.type === 'linear' && (
              <div className={styles.typeBlock}>
                <div className={styles.controlLabel}>Angle <span className={styles.accentVal}>{layer.angle}°</span></div>
                <div className={styles.dialRow}>
                  <AngleDial value={layer.angle} onChange={v => updateLayer({ angle: v })} />
                  <div className={styles.dialSide}>
                    <input type="range" min={0} max={360} value={layer.angle} onChange={e => updateLayer({ angle: +e.target.value })} />
                    <div className={styles.angleChips}>
                      {[0, 45, 90, 135, 180, 270].map(a => (
                        <button key={a} className={`${styles.chip} ${layer.angle === a ? styles.chipActive : ''}`} onClick={() => updateLayer({ angle: a })}>{a}°</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {layer.type === 'radial' && (
              <div className={styles.typeBlock}>
                <div className={styles.controlLabel}>Shape</div>
                <Seg small value={layer.shape} options={[['ellipse', 'Ellipse'], ['circle', 'Circle']]} onChange={v => updateLayer({ shape: v })} />
                <div className={styles.controlLabel} style={{ marginTop: 10 }}>Size</div>
                <select className={styles.select} value={layer.size} onChange={e => updateLayer({ size: e.target.value })}>
                  {RADIAL_SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                </select>
              </div>
            )}

            {layer.type === 'conic' && (
              <div className={styles.typeBlock}>
                <div className={styles.controlLabel}>From angle <span className={styles.accentVal}>{layer.from}°</span></div>
                <div className={styles.dialRow}>
                  <AngleDial value={layer.from} onChange={v => updateLayer({ from: v })} />
                  <div className={styles.dialSide}>
                    <input type="range" min={0} max={360} value={layer.from} onChange={e => updateLayer({ from: +e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {layer.type !== 'linear' && (
              <div className={styles.typeBlock}>
                <div className={styles.controlLabel}>Center <span className={styles.accentVal}>{layer.cx}% {layer.cy}%</span> — or drag on the preview</div>
                <div className={styles.sliderRow}><span className={styles.axis}>X</span><input type="range" min={0} max={100} value={layer.cx} onChange={e => updateLayer({ cx: +e.target.value })} /></div>
                <div className={styles.sliderRow}><span className={styles.axis}>Y</span><input type="range" min={0} max={100} value={layer.cy} onChange={e => updateLayer({ cy: +e.target.value })} /></div>
              </div>
            )}

            <div className={styles.toggleGrid}>
              <label className={styles.toggle}><input type="checkbox" checked={layer.repeating} onChange={e => updateLayer({ repeating: e.target.checked })} /> Repeating</label>
              <label className={styles.toggle}><input type="checkbox" checked={layer.hard} onChange={e => updateLayer({ hard: e.target.checked })} /> Hard stops</label>
            </div>
            {layer.repeating && (
              <div className={styles.sliderRow}>
                <span className={styles.controlLabel} style={{ margin: 0 }}>Repeat every</span>
                <input type="range" min={layer.type === 'conic' ? 5 : 8} max={layer.type === 'conic' ? 180 : 200} value={layer.repeatSize} onChange={e => updateLayer({ repeatSize: +e.target.value })} />
                <span className={styles.posLabel}>{layer.repeatSize}{layer.type === 'conic' ? '°' : 'px'}</span>
              </div>
            )}
          </div>

          {/* Color stops */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Color stops</div>
              <button className={styles.addBtn} onClick={() => addStop()}>+ Add</button>
            </div>
            <div className={styles.stopsList}>
              {sortedStops.map(s => (
                <div key={s.id} className={`${styles.stopItem} ${selectedStopId === s.id ? styles.stopItemActive : ''}`} onClick={() => setSelectedStopId(s.id)}>
                  <input type="color" className={styles.colorPicker} value={s.c} onChange={e => updateStop(s.id, 'c', e.target.value)} aria-label="Stop color" />
                  <input type="text" className={styles.hexInput} defaultValue={s.c} key={s.c} maxLength={7} aria-label="Hex color"
                    onChange={e => { if (HEX.test(e.target.value)) updateStop(s.id, 'c', e.target.value.toLowerCase()); }} />
                  <input type="number" className={styles.alphaInput} min={0} max={100} value={s.a} title="Opacity %" aria-label="Opacity percent"
                    onChange={e => updateStop(s.id, 'a', Math.max(0, Math.min(100, +e.target.value || 0)))} />
                  <input type="range" min={0} max={100} value={s.p} onChange={e => updateStop(s.id, 'p', +e.target.value)} className={styles.stopPosSlider} aria-label="Stop position" />
                  <span className={styles.posLabel}>{s.p}%</span>
                  {layer.stops.length > 2 && <button className={styles.removeBtn} onClick={e => { e.stopPropagation(); removeStop(s.id); }} aria-label="Remove stop">✕</button>}
                </div>
              ))}
            </div>
            <p className={styles.hint}>Second number is opacity (0–100%).</p>
          </div>

          {/* Smoothness */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Smoothness</div>
            <div className={styles.controlLabel}>Color space</div>
            <div className={styles.spaceGrid}>
              {SPACES.map(([id, label]) => (
                <button key={id} className={`${styles.modeBtn} ${styles.modeBtnSm} ${cfg.space === id ? styles.modeBtnActive : ''}`} onClick={() => update({ space: id })}>{label}</button>
              ))}
            </div>
            <p className={styles.hint}>{spaceInfo?.[2]}</p>
            <label className={styles.toggle}><input type="checkbox" checked={cfg.eased} onChange={e => update({ eased: e.target.checked })} /> Eased gradient <span className={styles.hintInline}>— softens the seam at each stop</span></label>
          </div>

          {/* Grain */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Grain <span className={styles.accentVal}>{cfg.grain ? `${cfg.grain}%` : 'off'}</span></div>
            <input type="range" min={0} max={60} value={cfg.grain} onChange={e => update({ grain: +e.target.value })} aria-label="Grain amount" />
            <p className={styles.hint}>Adds a film-grain noise overlay — the modern "grainy gradient" look, and it hides banding.</p>
          </div>

          {/* Animate */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Animate</div>
            <div className={styles.animGrid}>
              {ANIM_PRESETS.map(a => (
                <button key={a.id} className={`${styles.animBtn} ${cfg.animId === a.id ? styles.animBtnActive : ''}`} onClick={() => update({ animId: a.id })}>{a.label}</button>
              ))}
            </div>
            {animOn && (
              <div className={styles.speedRow}>
                <span className={styles.controlLabel}>Speed</span>
                <input type="range" min={1} max={12} step={0.5} value={cfg.animSpeed} onChange={e => update({ animSpeed: +e.target.value })} className={styles.speedSlider} />
                <span className={styles.posLabel}>{cfg.animSpeed}s</span>
              </div>
            )}
            {cfg.animId === 'spin' && cfg.layers[0].type !== 'linear' && <p className={styles.hint}>Spin rotates the top layer, so make it a linear gradient.</p>}
          </div>

          {/* Presets */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Presets</div>
            <div className={styles.presetsGrid}>
              {PRESETS.map((p, i) => (
                <button key={p.name} className={styles.presetBtn} onClick={() => applyPreset(p)} title={p.name} aria-label={`Preset: ${p.name}`}
                  style={{ background: PRESET_BG[i] }} />
              ))}
            </div>
          </div>
        </aside>

        {/* ── Right panel: ad, toolbar, stop bar, preview, export ── */}
        <main className={styles.main}>
          {animOn && <style>{activeAnim.keyframes}</style>}
          <PlaygroundTopAd />

          <div className={styles.previewModeBar}>
            {PREVIEW_MODES.map(([id, label]) => (
              <button key={id} className={`${styles.previewModeBtn} ${cfg.previewMode === id ? styles.previewModeBtnActive : ''}`} onClick={() => update({ previewMode: id })}>{label}</button>
            ))}
            <div className={styles.toolbarRight}>
              <button className={styles.toolBtn} onClick={randomize} title="Random colors for this layer">⟳ Randomize</button>
              <button className={styles.toolBtn} onClick={shareLink} title="Copy a link that reopens this exact gradient">🔗 Share link</button>
              <button className={`${styles.toolBtn} ${styles.forkBtn}`} onClick={fork} title="Open this gradient on a demo page in My Code">⑂ Fork &amp; Edit</button>
            </div>
          </div>

          <GradientBar
            layer={layer}
            barCSS={barCSS}
            space={cfg.space}
            onStopChange={updateStop}
            onStopAdd={addStop}
            selectedId={selectedStopId}
            onSelect={setSelectedStopId}
          />

          {/* Preview */}
          <div className={`${styles.preview} ${centerDrag ? styles.previewDraggable : ''}`} style={{ background: CHECKER }}>
            {cfg.previewMode === 'bg' && (
              <div className={styles.fill} style={previewStyle} {...centerHandlers} />
            )}
            {cfg.previewMode === 'hero' && (
              <div className={`${styles.fill} ${styles.hero}`} style={{ ...previewStyle, color: best.color }} {...centerHandlers}>
                <p className={styles.heroEyebrow}>New release</p>
                <h2 className={styles.heroTitle}>Ship beautiful interfaces faster</h2>
                <p className={styles.heroText}>A preview of your gradient as a landing-page hero, with the most readable text color picked automatically.</p>
                <div className={styles.heroBtns}>
                  <a className={styles.heroBtn} style={{ background: best.color, color: best.color === '#ffffff' ? '#0f172a' : '#ffffff' }}>Get started</a>
                  <a className={styles.heroBtnGhost} style={{ borderColor: best.color, color: best.color }}>Learn more</a>
                </div>
              </div>
            )}
            {cfg.previewMode === 'card' && (
              <div className={styles.cardStage}>
                <div className={styles.demoCard}>
                  <div className={styles.demoCardMedia} style={previewStyle} />
                  <div className={styles.demoCardBody}>
                    <span className={styles.demoCardTag}>Design</span>
                    <h3>Gradient card header</h3>
                    <p>Use the gradient as card artwork, a cover image or a placeholder while images load.</p>
                  </div>
                </div>
                <div className={styles.demoAvatarRow}>
                  {[0, 1, 2].map(i => <span key={i} className={styles.demoAvatar} style={previewStyle} />)}
                  <span className={styles.demoPill} style={{ ...previewStyle, color: best.color }}>Gradient badge</span>
                </div>
              </div>
            )}
            {cfg.previewMode === 'button' && (
              <div className={styles.btnStage}>
                <button className={styles.demoBtn} style={{ ...previewStyle, color: best.color }}>Primary button</button>
                <button className={`${styles.demoBtn} ${styles.demoBtnPill}`} style={{ ...previewStyle, color: best.color }}>Pill button →</button>
                <button className={styles.demoBtnOutline} style={{ '--grad': previewBg }}>Outline button</button>
                <button className={styles.demoBtnIcon} style={{ ...previewStyle, color: best.color }} aria-label="Icon button">★</button>
              </div>
            )}
            {cfg.previewMode === 'text' && (
              <div className={styles.textPreviewWrap}>
                <span className={styles.textPreview} style={previewStyle}>Beautiful Gradient</span>
                <span className={styles.textPreviewSm} style={previewStyle}>The quick brown fox jumps</span>
              </div>
            )}
            {cfg.previewMode === 'border' && (
              <div className={styles.borderPreviewWrap}>
                <div className={styles.borderPreviewCard} style={{ '--grad': previewBg }}>
                  <span className={styles.borderPreviewLabel}>Card with gradient border</span>
                </div>
                <div className={styles.borderPreviewBtn} style={{ ...previewStyle, color: best.color }}>Gradient Button</div>
              </div>
            )}
            {centerDrag && (
              <span className={styles.centerMarker} style={{ left: `${layer.cx}%`, top: `${layer.cy}%` }} aria-hidden="true" />
            )}
            {['hero', 'button', 'border'].includes(cfg.previewMode) && best.ratio != null && (
              <span className={`${styles.contrastBadge} ${aa === 'Fails' ? styles.contrastFail : ''}`}>
                {best.label} text · {best.ratio}:1 · {aa}
              </span>
            )}
            {toast && <span className={styles.toast}>{toast}</span>}
          </div>

          {/* Export */}
          <div className={styles.exportArea}>
            <div className={styles.exportTabs}>
              {EXPORT_TABS.map(([id, label]) => (
                <button key={id} className={`${styles.exportTab} ${exportMode === id ? styles.exportTabActive : ''}`} onClick={() => setExportMode(id)}>{label}</button>
              ))}
              <div className={styles.downloadRow}>
                <select className={styles.select} value={size} onChange={e => setSize(e.target.value)} aria-label="Image size">
                  {SIZES.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
                </select>
                <button className={styles.toolBtn} onClick={downloadPNG}>↓ PNG</button>
                <button className={styles.toolBtn} onClick={downloadSVG} disabled={!canSVG}
                  title={canSVG ? 'Download as SVG' : 'SVG supports linear and radial layers only — use PNG for conic or repeating gradients'}>↓ SVG</button>
              </div>
            </div>
            <div className={styles.codeWrap}>
              <pre className={styles.codeBlock}>{exportCode}</pre>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`} onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
