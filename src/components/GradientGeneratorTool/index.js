'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

const ANIM_PRESETS = [
  { id: 'none',      label: 'Off' },
  {
    id: 'slide',     label: 'Slide',
    keyframes: `@keyframes _gSlide { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }`,
    previewStyle: (s) => ({ backgroundSize:'300% 300%', animation:`_gSlide ${s}s ease infinite` }),
    exportKeyframes: (s) => `background-size: 300% 300%;\nanimation: gradSlide ${s}s ease infinite;\n\n@keyframes gradSlide {\n  0%, 100% { background-position: 0% 50%; }\n  50%       { background-position: 100% 50%; }\n}`,
  },
  {
    id: 'diagonal',  label: 'Diagonal',
    keyframes: `@keyframes _gDiag { 0%,100%{background-position:0% 0%} 50%{background-position:100% 100%} }`,
    previewStyle: (s) => ({ backgroundSize:'300% 300%', animation:`_gDiag ${s}s ease infinite` }),
    exportKeyframes: (s) => `background-size: 300% 300%;\nanimation: gradDiagonal ${s}s ease infinite;\n\n@keyframes gradDiagonal {\n  0%, 100% { background-position: 0% 0%; }\n  50%       { background-position: 100% 100%; }\n}`,
  },
  {
    id: 'hue',       label: 'Hue Shift',
    keyframes: `@keyframes _gHue { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }`,
    previewStyle: (s) => ({ animation:`_gHue ${s}s linear infinite` }),
    exportKeyframes: (s) => `animation: gradHue ${s}s linear infinite;\n\n@keyframes gradHue {\n  0%   { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}`,
  },
  {
    id: 'breathe',   label: 'Breathe',
    keyframes: `@keyframes _gBreathe { 0%,100%{background-size:100% 100%} 50%{background-size:250% 250%} }`,
    previewStyle: (s) => ({ animation:`_gBreathe ${s}s ease-in-out infinite` }),
    exportKeyframes: (s) => `animation: gradBreathe ${s}s ease-in-out infinite;\n\n@keyframes gradBreathe {\n  0%, 100% { background-size: 100% 100%; }\n  50%       { background-size: 250% 250%; }\n}`,
  },
  {
    id: 'pulse',     label: 'Pulse',
    keyframes: `@keyframes _gPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`,
    previewStyle: (s) => ({ animation:`_gPulse ${s}s ease-in-out infinite` }),
    exportKeyframes: (s) => `animation: gradPulse ${s}s ease-in-out infinite;\n\n@keyframes gradPulse {\n  0%, 100% { opacity: 1; }\n  50%       { opacity: 0.4; }\n}`,
  },
  {
    id: 'spin',      label: 'Spin ✦',
    keyframes: `@property --ga{syntax:"<angle>";inherits:false;initial-value:0deg;} @keyframes _gSpin{to{--ga:360deg}}`,
    previewStyle: (s) => ({ animation:`_gSpin ${s}s linear infinite` }),
    exportKeyframes: (s) => `/* Chrome/Edge only — uses @property */\nanimation: gradSpin ${s}s linear infinite;\n\n@property --gradient-angle {\n  syntax: "<angle>";\n  inherits: false;\n  initial-value: 0deg;\n}\n\n@keyframes gradSpin {\n  to { --gradient-angle: 360deg; }\n}`,
    spinGradient: true, // replace angle with var(--ga)
  },
];

const PRESETS = [
  { name: 'Cosmic', stops: [{ c: '#7c6dfa', p: 0 }, { c: '#c47fff', p: 50 }, { c: '#4dd9c0', p: 100 }], angle: 135 },
  { name: 'Sunset', stops: [{ c: '#ff6b6b', p: 0 }, { c: '#feca57', p: 50 }, { c: '#ff9ff3', p: 100 }], angle: 135 },
  { name: 'Ocean', stops: [{ c: '#0f3460', p: 0 }, { c: '#16213e', p: 50 }, { c: '#0f3460', p: 100 }], angle: 90 },
  { name: 'Forest', stops: [{ c: '#134e5e', p: 0 }, { c: '#71b280', p: 100 }], angle: 135 },
  { name: 'Fire', stops: [{ c: '#f7971e', p: 0 }, { c: '#ffd200', p: 100 }], angle: 135 },
  { name: 'Neon', stops: [{ c: '#f953c6', p: 0 }, { c: '#b91d73', p: 100 }], angle: 135 },
  { name: 'Aurora', stops: [{ c: '#00c6ff', p: 0 }, { c: '#0072ff', p: 100 }], angle: 135 },
  { name: 'Rose', stops: [{ c: '#f64f59', p: 0 }, { c: '#c471ed', p: 50 }, { c: '#12c2e9', p: 100 }], angle: 135 },
];

// ── Interactive gradient bar ──────────────────────────────────────────────────
function lerpHex(a, b, t) {
  const parse = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const [r1,g1,b1] = parse(a); const [r2,g2,b2] = parse(b);
  const r = Math.round(r1 + (r2-r1)*t), g = Math.round(g1 + (g2-g1)*t), bv = Math.round(b1 + (b2-b1)*t);
  return '#' + [r,g,bv].map(x => x.toString(16).padStart(2,'0')).join('');
}

function interpolateColorAt(stops, p) {
  const sorted = [...stops].sort((a,b) => a.p - b.p);
  if (p <= sorted[0].p) return sorted[0].c;
  if (p >= sorted[sorted.length-1].p) return sorted[sorted.length-1].c;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (p >= sorted[i].p && p <= sorted[i+1].p) {
      const t = (p - sorted[i].p) / (sorted[i+1].p - sorted[i].p);
      return lerpHex(sorted[i].c, sorted[i+1].c, t);
    }
  }
  return stops[0].c;
}

function GradientBar({ stops, gradientCSS, onStopChange, onStopAdd, onStopRemove, selectedId, onSelect }) {
  const barRef = useRef(null);
  const dragging = useRef(null);

  const getPercent = (clientX) => {
    const rect = barRef.current.getBoundingClientRect();
    return Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  useEffect(() => {
    const onMove = (e) => {
      if (dragging.current === null) return;
      onStopChange(dragging.current, 'p', getPercent(e.clientX));
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [onStopChange]);

  const handleBarClick = (e) => {
    if (dragging.current !== null) return;
    // don't add if click landed on a handle
    if (e.target !== barRef.current) return;
    const p = getPercent(e.clientX);
    const color = interpolateColorAt(stops, p);
    onStopAdd(p, color);
  };

  return (
    <div className={styles.gradBarWrap}>
      <div
        ref={barRef}
        className={styles.gradBar}
        style={{ background: gradientCSS }}
        onClick={handleBarClick}
      >
        {stops.map(s => (
          <div
            key={s.id}
            className={`${styles.gradHandle} ${selectedId === s.id ? styles.gradHandleActive : ''}`}
            style={{ left: `calc(${s.p}% - 8px)`, background: s.c }}
            onMouseDown={e => { e.stopPropagation(); dragging.current = s.id; onSelect(s.id); }}
            onClick={e => { e.stopPropagation(); onSelect(s.id); }}
          />
        ))}
      </div>
      <p className={styles.gradBarHint}>Click bar to add stop · Drag handles · Click handle to select</p>
    </div>
  );
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

let stopId = 0;
function mkStop(c, p) { return { id: ++stopId, c, p }; }

const DEFAULT_STOPS = [mkStop('#7c6dfa', 0), mkStop('#c47fff', 50), mkStop('#4dd9c0', 100)];

const STORAGE_KEY = 'wdp-gradient-generator-v1';

const DEFAULTS = {
  mode: 'linear', angle: 135, stops: DEFAULT_STOPS,
  radialX: 50, radialY: 50, conicAngle: 0,
  animId: 'none', animSpeed: 4, previewMode: 'bg',
};

export default function GradientGeneratorTool() {
  const hydrated  = useRef(false);
  const saveTimer = useRef(null);

  const [mode, setMode] = useState(DEFAULTS.mode);
  const [angle, setAngle] = useState(DEFAULTS.angle);
  const [stops, setStops] = useState(DEFAULTS.stops);
  const [radialX, setRadialX] = useState(DEFAULTS.radialX);
  const [radialY, setRadialY] = useState(DEFAULTS.radialY);
  const [conicAngle, setConicAngle] = useState(DEFAULTS.conicAngle);
  const [exportMode, setExportMode] = useState('css');
  const [animId, setAnimId] = useState(DEFAULTS.animId);
  const [animSpeed, setAnimSpeed] = useState(DEFAULTS.animSpeed);
  const [copied, setCopied] = useState(false);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [previewMode, setPreviewMode] = useState(DEFAULTS.previewMode);
  const [saveState, setSaveState] = useState('idle');

  const gradientCSS = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.p - b.p);
    const stopsStr = sortedStops.map(s => `${s.c} ${s.p}%`).join(', ');
    if (mode === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
    if (mode === 'radial') return `radial-gradient(ellipse at ${radialX}% ${radialY}%, ${stopsStr})`;
    if (mode === 'conic') return `conic-gradient(from ${conicAngle}deg, ${stopsStr})`;
    return '';
  }, [mode, angle, stops, radialX, radialY, conicAngle]);

  const activeAnim = ANIM_PRESETS.find(a => a.id === animId);

  // For spin, replace the fixed angle with the animated CSS variable
  const spinGradientCSS = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.p - b.p);
    const stopsStr = sortedStops.map(s => `${s.c} ${s.p}%`).join(', ');
    return `linear-gradient(var(--ga, ${angle}deg), ${stopsStr})`;
  }, [stops, angle]);

  const previewBackground = (animId === 'spin' && mode === 'linear') ? spinGradientCSS : gradientCSS;
  const previewAnimStyle = (activeAnim && activeAnim.id !== 'none') ? activeAnim.previewStyle(animSpeed) : {};

  /* ── Restore from localStorage ────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.mode)             setMode(s.mode);
        if (s.angle     != null) setAngle(s.angle);
        if (Array.isArray(s.stops) && s.stops.length >= 2) {
          const maxId = Math.max(...s.stops.map(st => st.id ?? 0));
          if (maxId > stopId) stopId = maxId;
          setStops(s.stops);
        }
        if (s.radialX   != null) setRadialX(s.radialX);
        if (s.radialY   != null) setRadialY(s.radialY);
        if (s.conicAngle != null) setConicAngle(s.conicAngle);
        if (s.animId)            setAnimId(s.animId);
        if (s.animSpeed != null) setAnimSpeed(s.animSpeed);
        if (s.previewMode)       setPreviewMode(s.previewMode);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  /* ── Debounced save ───────────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          mode, angle, stops, radialX, radialY, conicAngle, animId, animSpeed, previewMode,
        }));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [mode, angle, stops, radialX, radialY, conicAngle, animId, animSpeed, previewMode]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Reset ────────────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    setMode(DEFAULTS.mode);
    setAngle(DEFAULTS.angle);
    setStops([mkStop('#7c6dfa', 0), mkStop('#c47fff', 50), mkStop('#4dd9c0', 100)]);
    setRadialX(DEFAULTS.radialX);
    setRadialY(DEFAULTS.radialY);
    setConicAngle(DEFAULTS.conicAngle);
    setAnimId(DEFAULTS.animId);
    setAnimSpeed(DEFAULTS.animSpeed);
    setPreviewMode(DEFAULTS.previewMode);
    setSelectedStopId(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSaveState('idle');
  }, []);

  const exportCode = useMemo(() => {
    const animSuffix = (activeAnim && activeAnim.id !== 'none' && exportMode === 'css')
      ? '\n\n/* Animation */\n' + activeAnim.exportKeyframes(animSpeed)
      : '';

    if (exportMode === 'css') {
      if (previewMode === 'text') {
        return `/* Gradient Text */\n.gradient-text {\n  background: ${gradientCSS};\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  -webkit-text-fill-color: transparent;${animSuffix ? '\n' + animSuffix : ''}\n}`;
      }
      if (previewMode === 'border') {
        return `/* Gradient Border (padding-box trick) */\n.gradient-border {\n  background:\n    var(--surface) padding-box,\n    ${gradientCSS} border-box;\n  border: 2px solid transparent;\n  border-radius: 12px;\n}\n\n/* Gradient Button */\n.gradient-btn {\n  background: ${gradientCSS};\n  border: none;\n  border-radius: 8px;\n  color: #fff;\n  padding: 12px 32px;\n}${animSuffix}`;
      }
      return `background: ${gradientCSS};${animSuffix}`;
    }

    if (exportMode === 'tailwind') {
      if (previewMode === 'text') {
        if (mode === 'linear') {
          const dirs = { 0: 'to-t', 45: 'to-tr', 90: 'to-r', 135: 'to-br', 180: 'to-b', 225: 'to-bl', 270: 'to-l', 315: 'to-tl' };
          const dir = dirs[angle] || 'to-br';
          return `bg-gradient-${dir} from-[${stops[0].c}] to-[${stops[stops.length-1].c}] bg-clip-text text-transparent`;
        }
        return `bg-[${gradientCSS}] bg-clip-text text-transparent`;
      }
      if (mode === 'linear') {
        const dirs = { 0: 'to-t', 45: 'to-tr', 90: 'to-r', 135: 'to-br', 180: 'to-b', 225: 'to-bl', 270: 'to-l', 315: 'to-tl' };
        const dir = dirs[angle] || 'to-br';
        return `bg-gradient-${dir} from-[${stops[0].c}] to-[${stops[stops.length - 1].c}]`;
      }
      return `/* Use arbitrary value:\nbg-[${gradientCSS}] */`;
    }

    if (exportMode === 'scss') {
      if (previewMode === 'text') {
        return `$gradient: ${gradientCSS};\n\n.gradient-text {\n  background: $gradient;\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n}`;
      }
      if (previewMode === 'border') {
        return `$gradient: ${gradientCSS};\n\n.gradient-border {\n  background:\n    var(--surface) padding-box,\n    $gradient border-box;\n  border: 2px solid transparent;\n  border-radius: 12px;\n}\n\n.gradient-btn {\n  background: $gradient;\n  border: none;\n  border-radius: 8px;\n  color: #fff;\n  padding: 12px 32px;\n}`;
      }
      return `$gradient: ${gradientCSS};\n\n.element {\n  background: $gradient;\n}`;
    }
    return '';
  }, [exportMode, previewMode, gradientCSS, mode, angle, stops, activeAnim, animSpeed]);

  const updateStop = (id, field, val) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const addStop = (pos, color) => {
    if (pos === undefined) {
      const maxPos = Math.max(...stops.map(s => s.p));
      const minPos = Math.min(...stops.map(s => s.p));
      pos = Math.round((maxPos + minPos) / 2);
      color = randomColor();
    }
    const newStop = mkStop(color, pos);
    setStops(prev => [...prev, newStop]);
    setSelectedStopId(newStop.id);
  };

  const removeStop = (id) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter(s => s.id !== id));
    setSelectedStopId(null);
  };

  const applyPreset = (preset) => {
    setStops(preset.stops.map(s => mkStop(s.c, s.p)));
    setAngle(preset.angle);
    setMode('linear');
  };

  const randomize = () => {
    setStops(prev => prev.map(s => ({ ...s, c: randomColor() })));
  };

  const copy = () => {
    navigator.clipboard.writeText(exportCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.p - b.p), [stops]);

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="gradient-generator" />
      {/* Header */}
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

      {/* Interactive gradient bar */}
      <GradientBar
        stops={stops}
        gradientCSS={gradientCSS}
        onStopChange={updateStop}
        onStopAdd={addStop}
        onStopRemove={removeStop}
        selectedId={selectedStopId}
        onSelect={setSelectedStopId}
      />

      <div className={styles.layout}>
        {/* Left panel */}
        <aside className={styles.panel}>
          {/* Mode */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Type</div>
            <div className={styles.modeBtns}>
              {['linear', 'radial', 'conic'].map(m => (
                <button key={m} className={`${styles.modeBtn} ${mode === m ? styles.modeBtnActive : ''}`} onClick={() => setMode(m)}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Angle (linear) */}
          {mode === 'linear' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Angle <span className={styles.accentVal}>{angle}°</span></div>
              <div className={styles.sliderRow}>
                <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(parseInt(e.target.value))} />
                <input type="number" className={styles.numInput} value={angle} onChange={e => setAngle(parseInt(e.target.value) || 0)} />
              </div>
            </div>
          )}

          {/* Radial position */}
          {mode === 'radial' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Center</div>
              <div className={styles.controlLabel}>X: {radialX}%</div>
              <input type="range" min={0} max={100} value={radialX} onChange={e => setRadialX(parseInt(e.target.value))} className={styles.mb8} />
              <div className={styles.controlLabel}>Y: {radialY}%</div>
              <input type="range" min={0} max={100} value={radialY} onChange={e => setRadialY(parseInt(e.target.value))} />
            </div>
          )}

          {/* Conic angle */}
          {mode === 'conic' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>From Angle <span className={styles.accentVal}>{conicAngle}°</span></div>
              <input type="range" min={0} max={360} value={conicAngle} onChange={e => setConicAngle(parseInt(e.target.value))} />
            </div>
          )}

          {/* Color stops */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Color Stops</div>
              <button className={styles.addBtn} onClick={() => addStop()}>+ Add</button>
            </div>
            <div className={styles.stopsList}>
              {sortedStops.map(s => (
                <div key={s.id}
                  className={`${styles.stopItem} ${selectedStopId === s.id ? styles.stopItemActive : ''}`}
                  onClick={() => setSelectedStopId(s.id)}>
                  <input type="color" className={styles.colorPicker} value={s.c} onChange={e => updateStop(s.id, 'c', e.target.value)} />
                  <input type="text" className={styles.hexInput} value={s.c} maxLength={7}
                    onChange={e => { if (/^#[0-9a-f]{6}$/i.test(e.target.value)) updateStop(s.id, 'c', e.target.value); }} />
                  <input type="range" min={0} max={100} value={s.p} onChange={e => updateStop(s.id, 'p', parseInt(e.target.value))} className={styles.stopPosSlider} />
                  <span className={styles.posLabel}>{s.p}%</span>
                  {stops.length > 2 && <button className={styles.removeBtn} onClick={e => { e.stopPropagation(); removeStop(s.id); }}>✕</button>}
                </div>
              ))}
            </div>
          </div>

          {/* Animate */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Animate</div>
            <div className={styles.animGrid}>
              {ANIM_PRESETS.map(a => (
                <button key={a.id}
                  className={`${styles.animBtn} ${animId === a.id ? styles.animBtnActive : ''}`}
                  onClick={() => setAnimId(a.id)}>
                  {a.label}
                </button>
              ))}
            </div>
            {animId !== 'none' && (
              <div className={styles.speedRow}>
                <span className={styles.controlLabel}>Speed</span>
                <input type="range" min={1} max={12} step={0.5} value={animSpeed}
                  onChange={e => setAnimSpeed(+e.target.value)} className={styles.speedSlider} />
                <span className={styles.posLabel}>{animSpeed}s</span>
              </div>
            )}
          </div>

          {/* Presets */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Presets</div>
            <div className={styles.presetsGrid}>
              {PRESETS.map(p => (
                <button key={p.name} className={styles.presetBtn} onClick={() => applyPreset(p)}
                  style={{ background: `linear-gradient(135deg, ${p.stops.map(s => `${s.c} ${s.p}%`).join(', ')})` }}
                  title={p.name} />
              ))}
            </div>
          </div>
        </aside>

        {/* Main: preview + export */}
        <main className={styles.main}>
          {/* Inject keyframes for active animation */}
          {activeAnim && activeAnim.id !== 'none' && (
            <style>{activeAnim.keyframes}</style>
          )}

          {/* Preview mode toggle */}
          <div className={styles.previewModeBar}>
            {[['bg','Background'],['text','Text'],['border','Border']].map(([id, label]) => (
              <button key={id}
                className={`${styles.previewModeBtn} ${previewMode === id ? styles.previewModeBtnActive : ''}`}
                onClick={() => setPreviewMode(id)}>{label}</button>
            ))}
            <button className={styles.randomBtn} onClick={randomize}>⟳ Randomize</button>
          </div>

          {/* Preview */}
          <div className={styles.preview}
            style={previewMode === 'bg' ? { background: previewBackground, ...previewAnimStyle } : {}}>
            {previewMode === 'text' && (
              <div className={styles.textPreviewWrap}>
                <span className={styles.textPreview}
                  style={{ backgroundImage: previewBackground, ...previewAnimStyle }}>
                  Beautiful Gradient
                </span>
                <span className={styles.textPreviewSm}
                  style={{ backgroundImage: previewBackground, ...previewAnimStyle }}>
                  The quick brown fox jumps
                </span>
              </div>
            )}
            {previewMode === 'border' && (
              <div className={styles.borderPreviewWrap}>
                <div className={styles.borderPreviewCard}
                  style={{ '--grad': previewBackground }}>
                  <span className={styles.borderPreviewLabel}>Card with gradient border</span>
                </div>
                <div className={styles.borderPreviewBtn}
                  style={{ '--grad': previewBackground }}>
                  Gradient Button
                </div>
              </div>
            )}
          </div>

          {/* Export */}
          <div className={styles.exportArea}>
            <div className={styles.exportTabs}>
              {['css', 'tailwind', 'scss'].map(t => (
                <button key={t} className={`${styles.exportTab} ${exportMode === t ? styles.exportTabActive : ''}`} onClick={() => setExportMode(t)}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
            <div className={styles.codeWrap}>
              <pre className={styles.codeBlock}>{exportCode}</pre>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`} onClick={copy}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
