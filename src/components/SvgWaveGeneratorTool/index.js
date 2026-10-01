'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import CssToolsTopNav from '../CssToolsTopNav';
import styles from './styles.module.css';

const ACCENT = '#06b6d4';
const VB_LEN = 1440; // length along the main (long) axis, regardless of orientation
const DEFAULT_LAYER_COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
const STATE_KEY = 'g';

const PRESETS = [
  { name: 'Calm',    amplitude: 28,  waves: 2, complexity: 18 },
  { name: 'Smooth',  amplitude: 45,  waves: 2, complexity: 20 },
  { name: 'Wavy',    amplitude: 38,  waves: 4, complexity: 26 },
  { name: 'Peaks',   amplitude: 70,  waves: 3, complexity: 22 },
  { name: 'Choppy',  amplitude: 32,  waves: 7, complexity: 36 },
  { name: 'Bold',    amplitude: 90,  waves: 2, complexity: 22 },
];

const EDGES = [
  { id: 'top',    label: 'Top' },
  { id: 'bottom', label: 'Bottom' },
  { id: 'left',   label: 'Left' },
  { id: 'right',  label: 'Right' },
];

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function orientationOf(edge) {
  return edge === 'left' || edge === 'right' ? 'vertical' : 'horizontal';
}

// Sample a sine wave along the main axis (0..VB_LEN) with cross-axis deviation.
// Returns [main, cross] pairs; the caller maps these to (x, y) based on orientation.
function wavePoints(baseCross, amplitude, waves, phase, samples) {
  const pts = [];
  for (let i = 0; i <= samples; i++) {
    const main = (VB_LEN / samples) * i;
    const cross = baseCross + amplitude * Math.sin((i / samples) * waves * Math.PI * 2 + phase);
    pts.push([main, cross]);
  }
  return pts;
}

// horizontal: (main,cross) -> (x=main, y=cross)  |  vertical: (main,cross) -> (x=cross, y=main)
function toXY(points, orientation) {
  return orientation === 'vertical' ? points.map(([m, c]) => [c, m]) : points;
}

function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(p2[0])} ${round(p2[1])}`;
  }
  return d;
}

function round(n) {
  return Math.round(n * 10) / 10;
}

// Build the array of layer descriptors (path + fill + opacity) from state.
// `thickness` is the band's cross-axis size (height for a horizontal edge, width for a vertical one).
function buildLayers({ thickness, amplitude, waves, complexity, layers, phase, edge, color, useMultiColor, layerColors }) {
  const orientation = orientationOf(edge);
  const isStart = edge === 'top' || edge === 'left'; // "start" edges sit at coordinate 0
  const out = [];
  const samples = Math.max(6, Math.round(complexity));
  for (let k = 0; k < layers; k++) {
    const t = layers === 1 ? 1 : k / (layers - 1);
    const ampK = amplitude * (1 - k * 0.12);
    const phaseK = phase + k * 0.85;
    const baseCross = isStart
      ? amplitude + 6 + k * (thickness - amplitude * 2) / (layers + 0.5)
      : thickness - amplitude - 6 - (layers - 1 - k) * (thickness - amplitude * 2) / (layers + 0.5);
    const pts = toXY(wavePoints(baseCross, ampK, waves, phaseK, samples), orientation);
    let d = smoothPath(pts);
    // Close the shape back to the fixed edge (0 or `thickness`) on the cross axis.
    if (orientation === 'horizontal') {
      const y = isStart ? 0 : thickness;
      d += ` L ${VB_LEN} ${y} L 0 ${y} Z`;
    } else {
      const x = isStart ? 0 : thickness;
      d += ` L ${x} ${VB_LEN} L ${x} 0 Z`;
    }
    const opacity = layers === 1 ? 1 : round(0.35 + 0.65 * t);
    const fill = useMultiColor ? (layerColors[k] || DEFAULT_LAYER_COLORS[k % 5]) : color;
    out.push({ d, fill, opacity });
  }
  return out;
}

function animationStyle(layerCount) {
  const rules = Array.from({ length: layerCount }, (_, i) =>
    `.wave-layer-${i}{animation:waveDrift ${6 + i * 2}s ease-in-out infinite alternate;transform-origin:center}`
  ).join('');
  return `<style>@keyframes waveDrift{0%{transform:translateX(0)}100%{transform:translateX(-3%)}}${rules}</style>`;
}

function buildSvg(layers, thickness, edge, useGradient, useMultiColor, color, color2, animate, decorative) {
  const orientation = orientationOf(edge);
  const w = orientation === 'vertical' ? thickness : VB_LEN;
  const h = orientation === 'vertical' ? VB_LEN : thickness;
  const defs = (useGradient && !useMultiColor)
    ? `\n  <defs>\n    <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">\n      <stop offset="0%" stop-color="${color}"/>\n      <stop offset="100%" stop-color="${color2}"/>\n    </linearGradient>\n  </defs>`
    : '';
  const fill = (useGradient && !useMultiColor) ? 'url(#waveGrad)' : null;
  const style = animate ? `\n  ${animationStyle(layers.length)}` : '';
  const paths = layers
    .map((l, i) => `  <path${animate ? ` class="wave-layer-${i}"` : ''} fill="${fill || l.fill}" fill-opacity="${l.opacity}" d="${l.d}"/>`)
    .join('\n');
  const aria = decorative ? ' aria-hidden="true"' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none"${aria}>${defs}${style}\n${paths}\n</svg>`;
}

function svgToCss(svg) {
  const encoded = encodeURIComponent(svg)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'");
  return `.wave-divider {\n  width: 100%;\n  background-image: url("data:image/svg+xml,${encoded}");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}`;
}

function svgToReact(svg) {
  const jsx = svg
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/class=/g, 'className=')
    .replace(/<style>([^<]*)<\/style>/, (_, css) => `<style>{\`${css}\`}</style>`)
    .split('\n')
    .map(line => '    ' + line.trim())
    .join('\n');
  return `export function WaveDivider() {\n  return (\n${jsx}\n  );\n}`;
}

function snapshotOf(s) {
  return {
    amplitude: s.amplitude, waves: s.waves, complexity: s.complexity, layers: s.layers,
    thickness: s.thickness, phase: s.phase, edge: s.edge, color: s.color, color2: s.color2,
    useGradient: s.useGradient, useMultiColor: s.useMultiColor, layerColors: s.layerColors,
    animate: s.animate, decorative: s.decorative,
  };
}
function encodeState(s)  { return btoa(unescape(encodeURIComponent(JSON.stringify(s)))); }
function decodeState(str){ return JSON.parse(decodeURIComponent(escape(atob(str)))); }

export default function SvgWaveGeneratorTool() {
  const [amplitude, setAmplitude]     = useState(45);
  const [waves, setWaves]             = useState(2);
  const [complexity, setComplexity]   = useState(20);
  const [layers, setLayers]           = useState(3);
  const [thickness, setThickness]     = useState(220);
  const [phase, setPhase]             = useState(0);
  const [edge, setEdge]               = useState('bottom');
  const [color, setColor]             = useState('#06b6d4');
  const [color2, setColor2]           = useState('#3b82f6');
  const [useGradient, setUseGradient] = useState(false);
  const [useMultiColor, setUseMultiColor] = useState(false);
  const [layerColors, setLayerColors] = useState(DEFAULT_LAYER_COLORS);
  const [animate, setAnimate]         = useState(false);
  const [decorative, setDecorative]   = useState(true);
  const [fmt, setFmt]                 = useState('svg');
  const [copied, setCopied]           = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const histRef = useRef(null);
  const restoringRef = useRef(false);
  const [, forceRender] = useState(0);

  const orientation = orientationOf(edge);

  // Restore shared state from ?g= on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const g = params.get(STATE_KEY);
      if (g) applySnapshot(decodeState(g));
    } catch {}
  }, []); // eslint-disable-line

  const layerData = useMemo(
    () => buildLayers({ thickness, amplitude, waves, complexity, layers, phase, edge, color, useMultiColor, layerColors }),
    [thickness, amplitude, waves, complexity, layers, phase, edge, color, useMultiColor, layerColors]
  );

  const svgString = useMemo(
    () => buildSvg(layerData, thickness, edge, useGradient, useMultiColor, color, color2, animate, decorative),
    [layerData, thickness, edge, useGradient, useMultiColor, color, color2, animate, decorative]
  );

  const output = useMemo(() => {
    if (fmt === 'css') return svgToCss(svgString);
    if (fmt === 'react') return svgToReact(svgString);
    return svgString;
  }, [fmt, svgString]);

  // ── Undo/redo history (debounced snapshots) ──
  const snap = snapshotOf({ amplitude, waves, complexity, layers, thickness, phase, edge, color, color2, useGradient, useMultiColor, layerColors, animate, decorative });
  const snapStr = JSON.stringify(snap);

  useEffect(() => {
    if (!histRef.current) { histRef.current = { stack: [snapStr], idx: 0 }; return; }
    if (restoringRef.current) { restoringRef.current = false; return; }
    const t = setTimeout(() => {
      const h = histRef.current;
      if (h.stack[h.idx] === snapStr) return;
      h.stack = h.stack.slice(0, h.idx + 1);
      h.stack.push(snapStr);
      if (h.stack.length > 60) h.stack.shift();
      h.idx = h.stack.length - 1;
      forceRender(v => v + 1);
    }, 350);
    return () => clearTimeout(t);
  }, [snapStr]);

  function applySnapshot(s) {
    restoringRef.current = true;
    setAmplitude(s.amplitude); setWaves(s.waves); setComplexity(s.complexity); setLayers(s.layers);
    setThickness(s.thickness); setPhase(s.phase); setEdge(s.edge); setColor(s.color); setColor2(s.color2);
    setUseGradient(s.useGradient); setUseMultiColor(s.useMultiColor); setLayerColors(s.layerColors);
    setAnimate(s.animate); setDecorative(s.decorative);
  }

  function undo() {
    const h = histRef.current;
    if (!h || h.idx <= 0) return;
    h.idx -= 1; applySnapshot(JSON.parse(h.stack[h.idx])); forceRender(v => v + 1);
  }
  function redo() {
    const h = histRef.current;
    if (!h || h.idx >= h.stack.length - 1) return;
    h.idx += 1; applySnapshot(JSON.parse(h.stack[h.idx])); forceRender(v => v + 1);
  }
  const canUndo = histRef.current ? histRef.current.idx > 0 : false;
  const canRedo = histRef.current ? histRef.current.idx < histRef.current.stack.length - 1 : false;

  useEffect(() => {
    function onKey(e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }); // re-bind each render so undo/redo see the latest histRef

  function applyPreset(p) {
    setAmplitude(p.amplitude);
    setWaves(p.waves);
    setComplexity(p.complexity);
  }

  function randomize() {
    setPhase(Math.random() * Math.PI * 2);
    setAmplitude(clamp(Math.round(25 + Math.random() * 75), 8, 120));
    setWaves(Math.round(2 + Math.random() * 5));
    setComplexity(clamp(Math.round(10 + Math.random() * 30), 6, 48));
    if (useMultiColor) {
      setLayerColors(DEFAULT_LAYER_COLORS.map(() => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`));
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function copyShareLink() {
    try {
      const url = `${window.location.origin}${window.location.pathname}?${STATE_KEY}=${encodeState(snap)}`;
      navigator.clipboard.writeText(url);
      setShareCopied(true); setTimeout(() => setShareCopied(false), 1800);
    } catch {}
  }

  function updateLayerColor(i, val) {
    setLayerColors(prev => { const next = [...prev]; next[i] = val; return next; });
  }

  const gradId = 'preview-grad';
  const previewFill = (useGradient && !useMultiColor) ? `url(#${gradId})` : undefined;
  const previewVB = orientation === 'vertical' ? `0 0 ${thickness} ${VB_LEN}` : `0 0 ${VB_LEN} ${thickness}`;
  const previewAspect = orientation === 'vertical' ? `${thickness} / ${VB_LEN}` : `${VB_LEN} / ${thickness}`;
  const previewFlexDir = edge === 'top' ? 'column-reverse' : edge === 'left' ? 'row-reverse' : edge === 'right' ? 'row' : 'column';

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="svg-wave-generator" />

      <div className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8c2.5 0 2.5 4 5 4s2.5-4 5-4 2.5 4 5 4 2.5-4 5-4" />
            <path d="M2 16c2.5 0 2.5 4 5 4s2.5-4 5-4 2.5 4 5 4 2.5-4 5-4" />
          </svg>
        </div>
        <span className={styles.title}>
          SVG <span style={{ color: ACCENT }}>Wave</span> Generator
        </span>
        <div className={styles.headerActions}>
          <button className={styles.histBtn} onClick={undo} disabled={!canUndo} aria-label="Undo" title="Undo (Ctrl+Z)">↶</button>
          <button className={styles.histBtn} onClick={redo} disabled={!canRedo} aria-label="Redo" title="Redo (Ctrl+Shift+Z)">↷</button>
          <button className={`${styles.shareBtn} ${shareCopied ? styles.shareBtnDone : ''}`} onClick={copyShareLink}>
            {shareCopied ? '✓ Link copied' : '🔗 Share'}
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {/* ── Controls ─────────────────────────────────────────── */}
        <div className={styles.leftPane}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Style presets</div>
            <div className={styles.presets}>
              {PRESETS.map(p => (
                <button key={p.name} className={styles.preset} onClick={() => applyPreset(p)}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Edge</div>
            <div className={styles.modeTabs}>
              {EDGES.map(e => (
                <button
                  key={e.id}
                  className={`${styles.modeTab} ${edge === e.id ? styles.modeTabActive : ''}`}
                  onClick={() => setEdge(e.id)}
                >{e.label}</button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Shape</div>
            <div className={styles.sliders}>
              <Slider label="Amplitude" value={amplitude} min={4} max={120} onChange={setAmplitude} suffix="px" />
              <Slider label="Waves" value={waves} min={1} max={10} onChange={setWaves} />
              <Slider label="Smoothness" value={complexity} min={6} max={48} onChange={setComplexity} />
              <Slider label="Layers" value={layers} min={1} max={5} onChange={setLayers} />
              <Slider label="Thickness" value={thickness} min={80} max={400} onChange={setThickness} suffix="px" />
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Color</div>
            <label className={styles.checkRow} style={{ marginBottom: 12 }}>
              <input type="checkbox" checked={useMultiColor} onChange={e => setUseMultiColor(e.target.checked)} />
              <span>Multi-color layers</span>
            </label>

            {useMultiColor ? (
              <div className={styles.layerColorsRow}>
                {Array.from({ length: layers }, (_, i) => (
                  <label key={i} className={styles.colorField}>
                    <input
                      type="color"
                      value={layerColors[i] || DEFAULT_LAYER_COLORS[i % 5]}
                      onChange={e => updateLayerColor(i, e.target.value)}
                      className={styles.colorInput}
                    />
                  </label>
                ))}
              </div>
            ) : (
              <>
                <div className={styles.colorRow}>
                  <label className={styles.colorField}>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className={styles.colorInput} />
                    <span>{color}</span>
                  </label>
                  {useGradient && (
                    <label className={styles.colorField}>
                      <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className={styles.colorInput} />
                      <span>{color2}</span>
                    </label>
                  )}
                </div>
                <label className={styles.checkRow}>
                  <input type="checkbox" checked={useGradient} onChange={e => setUseGradient(e.target.checked)} />
                  <span>Use gradient fill</span>
                </label>
              </>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Export options</div>
            <label className={styles.checkRow} style={{ marginBottom: 10 }}>
              <input type="checkbox" checked={animate} onChange={e => setAnimate(e.target.checked)} />
              <span>Animate (gentle drift)</span>
            </label>
            <label className={styles.checkRow}>
              <input type="checkbox" checked={decorative} onChange={e => setDecorative(e.target.checked)} />
              <span>Decorative (adds aria-hidden)</span>
            </label>
          </div>

          <div className={styles.section}>
            <button className={styles.randomBtn} onClick={randomize}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
              </svg>
              Randomize
            </button>
          </div>
        </div>

        {/* ── Preview + Output ─────────────────────────────────── */}
        <div className={styles.rightPane}>
          <div className={styles.previewSection}>
            <div className={styles.preview} style={{ flexDirection: previewFlexDir }}>
              <div className={styles.previewFill} />
              <div className={styles.waveHolder} style={{ aspectRatio: previewAspect, width: orientation === 'vertical' ? 'auto' : '100%', height: orientation === 'vertical' ? '100%' : 'auto' }}>
                <svg viewBox={previewVB} width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
                  {(useGradient && !useMultiColor) && (
                    <defs>
                      <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} />
                        <stop offset="100%" stopColor={color2} />
                      </linearGradient>
                    </defs>
                  )}
                  {layerData.map((l, i) => (
                    <path key={i} d={l.d} fill={previewFill || l.fill} fillOpacity={l.opacity} />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.outputSection}>
            <div className={styles.exportRow}>
              <div className={styles.exportTabs}>
                {['svg', 'css', 'react'].map(f => (
                  <button
                    key={f}
                    className={`${styles.exportTab} ${fmt === f ? styles.exportTabActive : ''}`}
                    onClick={() => setFmt(f)}
                  >{f === 'svg' ? 'SVG' : f === 'css' ? 'CSS' : 'React'}</button>
                ))}
              </div>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnOk : ''}`} onClick={copyOutput}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={styles.outputCode}><code>{output}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange, suffix }) {
  return (
    <div className={styles.sliderRow}>
      <span className={styles.sliderLabel}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={styles.slider}
      />
      <span className={styles.sliderVal}>{value}{suffix || ''}</span>
    </div>
  );
}
