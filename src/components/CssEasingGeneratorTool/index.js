'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import ForkToMyCodeButton from '@/components/ForkToMyCodeButton';

/* ── SVG coordinate helpers ─────────────────────────────────────────────── */
const SVG_W  = 260;
const SVG_H  = 260;
const PAD    = 28;
const PLOT   = SVG_W - PAD * 2; // 204

// CSS bezier y can exceed [0,1]; we show y in range [-0.5, 1.5]
const Y_MIN  = -0.5;
const Y_MAX  =  1.5;
const Y_RNG  = Y_MAX - Y_MIN; // 2.0

function toSvg(x, y) {
  return {
    x: PAD + x * PLOT,
    y: PAD + (1 - (y - Y_MIN) / Y_RNG) * PLOT,
  };
}

// Handle dots are always clamped to SVG bounds so they stay grabbable
function toSvgClamped(x, y) {
  const nx = Math.max(0, Math.min(1, x));
  const ny = Math.max(0.01, Math.min(0.99, (y - Y_MIN) / Y_RNG));
  return {
    x: PAD + nx * PLOT,
    y: PAD + (1 - ny) * PLOT,
  };
}

function fromSvg(clientX, clientY, svgEl) {
  const rect   = svgEl.getBoundingClientRect();
  const scaleX = SVG_W / rect.width;
  const scaleY = SVG_H / rect.height;
  const lx     = (clientX - rect.left) * scaleX;
  const ly     = (clientY - rect.top)  * scaleY;
  return {
    x: (lx - PAD) / PLOT,
    y: Y_MIN + (1 - (ly - PAD) / PLOT) * Y_RNG,
  };
}

function bezierPath(x1, y1, x2, y2) {
  const s  = toSvg(0, 0);
  const e  = toSvg(1, 1);
  const p1 = toSvg(x1, y1);
  const p2 = toSvg(x2, y2);
  return `M ${s.x} ${s.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${e.x} ${e.y}`;
}

function r4(n)   { return Math.round(n * 10000) / 10000; }
function fmt(n)  { return r4(n).toFixed(2); }
function clampX(v) { return Math.max(0, Math.min(1, v)); }
function clampY(v) { return Math.max(-1.5, Math.min(2.5, v)); }

/* ── Presets ─────────────────────────────────────────────────────────────── */
const PRESETS = [
  { group: 'CSS Standard', items: [
    { name: 'linear',      x1: 0,    y1: 0,     x2: 1,    y2: 1    },
    { name: 'ease',        x1: 0.25, y1: 0.1,   x2: 0.25, y2: 1    },
    { name: 'ease-in',     x1: 0.42, y1: 0,     x2: 1,    y2: 1    },
    { name: 'ease-out',    x1: 0,    y1: 0,     x2: 0.58, y2: 1    },
    { name: 'ease-in-out', x1: 0.42, y1: 0,     x2: 0.58, y2: 1    },
  ]},
  { group: 'Sine', items: [
    { name: 'easeInSine',    x1: 0.12, y1: 0, x2: 0.39, y2: 0 },
    { name: 'easeOutSine',   x1: 0.61, y1: 1, x2: 0.88, y2: 1 },
    { name: 'easeInOutSine', x1: 0.37, y1: 0, x2: 0.63, y2: 1 },
  ]},
  { group: 'Quad', items: [
    { name: 'easeInQuad',    x1: 0.11, y1: 0, x2: 0.5,  y2: 0 },
    { name: 'easeOutQuad',   x1: 0.5,  y1: 1, x2: 0.89, y2: 1 },
    { name: 'easeInOutQuad', x1: 0.45, y1: 0, x2: 0.55, y2: 1 },
  ]},
  { group: 'Cubic', items: [
    { name: 'easeInCubic',    x1: 0.32, y1: 0, x2: 0.67, y2: 0 },
    { name: 'easeOutCubic',   x1: 0.33, y1: 1, x2: 0.68, y2: 1 },
    { name: 'easeInOutCubic', x1: 0.65, y1: 0, x2: 0.35, y2: 1 },
  ]},
  { group: 'Quart', items: [
    { name: 'easeInQuart',    x1: 0.5,  y1: 0, x2: 0.75, y2: 0 },
    { name: 'easeOutQuart',   x1: 0.25, y1: 1, x2: 0.5,  y2: 1 },
    { name: 'easeInOutQuart', x1: 0.76, y1: 0, x2: 0.24, y2: 1 },
  ]},
  { group: 'Quint', items: [
    { name: 'easeInQuint',    x1: 0.64, y1: 0, x2: 0.78, y2: 0 },
    { name: 'easeOutQuint',   x1: 0.22, y1: 1, x2: 0.36, y2: 1 },
    { name: 'easeInOutQuint', x1: 0.83, y1: 0, x2: 0.17, y2: 1 },
  ]},
  { group: 'Expo', items: [
    { name: 'easeInExpo',    x1: 0.7,  y1: 0, x2: 0.84, y2: 0 },
    { name: 'easeOutExpo',   x1: 0.16, y1: 1, x2: 0.3,  y2: 1 },
    { name: 'easeInOutExpo', x1: 0.87, y1: 0, x2: 0.13, y2: 1 },
  ]},
  { group: 'Circ', items: [
    { name: 'easeInCirc',    x1: 0.55, y1: 0,    x2: 1,    y2: 0.45 },
    { name: 'easeOutCirc',   x1: 0,    y1: 0.55, x2: 0.45, y2: 1    },
    { name: 'easeInOutCirc', x1: 0.85, y1: 0,    x2: 0.15, y2: 1    },
  ]},
  { group: 'Back', items: [
    { name: 'easeInBack',    x1: 0.36, y1: 0,     x2: 0.66, y2: -0.56 },
    { name: 'easeOutBack',   x1: 0.34, y1: 1.56,  x2: 0.64, y2: 1     },
    { name: 'easeInOutBack', x1: 0.68, y1: -0.6,  x2: 0.32, y2: 1.6   },
  ]},
];

/* ── Grid lines ─────────────────────────────────────────────────────────── */
function GridLines() {
  const lines = [];
  // vertical lines at x = 0.25, 0.5, 0.75, 1
  for (const x of [0.25, 0.5, 0.75, 1]) {
    const sx = toSvg(x, 0).x;
    lines.push(<line key={`vx${x}`} x1={sx} y1={PAD} x2={sx} y2={PAD + PLOT} stroke="var(--border)" strokeWidth="1" />);
  }
  // horizontal lines at y = 0, 0.25, 0.5, 0.75, 1 (in bezier space)
  for (const y of [0, 0.25, 0.5, 0.75, 1]) {
    const sy = toSvg(0, y).y;
    lines.push(<line key={`hy${y}`} x1={PAD} y1={sy} x2={PAD + PLOT} y2={sy} stroke={y === 0 || y === 1 ? 'var(--border2)' : 'var(--border)'} strokeWidth={y === 0 || y === 1 ? 1.5 : 1} />);
  }
  return <g>{lines}</g>;
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function CssEasingGeneratorTool() {
  const [x1, setX1] = useState(0.25);
  const [y1, setY1] = useState(0.1);
  const [x2, setX2] = useState(0.25);
  const [y2, setY2] = useState(1.0);
  const [duration,     setDuration]     = useState(1.0);
  const [animKey,      setAnimKey]      = useState(0);
  const [activePreset, setActivePreset] = useState('ease');
  const [copied,       setCopied]       = useState('');
  const [dragging,     setDragging]     = useState(null); // 'p1' | 'p2'

  const svgRef = useRef(null);

  const cbValue      = `cubic-bezier(${fmt(x1)}, ${fmt(y1)}, ${fmt(x2)}, ${fmt(y2)})`;
  const cssTransition = `transition: all ${duration.toFixed(1)}s ${cbValue};`;
  const cssAnimation  = `animation: slide ${duration.toFixed(1)}s ${cbValue};`;

  /* restart animation by remounting ball via key */
  const triggerPlay = useCallback(() => {
    setAnimKey(k => k + 1);
  }, []);

  /* auto-restart on easing/duration change */
  useEffect(() => { triggerPlay(); }, [x1, y1, x2, y2, duration]); // eslint-disable-line

  /* presets */
  function applyPreset(p) {
    setX1(p.x1); setY1(p.y1); setX2(p.x2); setY2(p.y2);
    setActivePreset(p.name);
  }

  /* drag handlers */
  function onPointerDown(e, handle) {
    e.preventDefault();
    setDragging(handle);
    svgRef.current?.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragging || !svgRef.current) return;
    const { x, y } = fromSvg(e.clientX, e.clientY, svgRef.current);
    if (dragging === 'p1') {
      setX1(r4(clampX(x))); setY1(r4(clampY(y))); setActivePreset('');
    } else {
      setX2(r4(clampX(x))); setY2(r4(clampY(y))); setActivePreset('');
    }
  }
  function onPointerUp()   { setDragging(null); }

  /* copy */
  function handleCopy(text, key) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  }

  /* SVG points */
  const p0  = toSvg(0, 0);
  const p3  = toSvg(1, 1);
  const hp1 = toSvgClamped(x1, y1);
  const hp2 = toSvgClamped(x2, y2);
  const path = bezierPath(x1, y1, x2, y2);

  // Fork to My Code: a ball that travels back and forth with your easing curve
  const forkSnippet = () => ({
    name: `Easing — ${cbValue}`,
    html: `<div class="track">
  <div class="ball"></div>
</div>
<p class="label">${cbValue}</p>`,
    css: `* { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 16px;
  padding: 24px;
  background: #f1f5f9;
  font-family: system-ui, -apple-system, sans-serif;
}
.track { width: min(520px, 90vw); height: 56px; padding: 8px; border-radius: 999px; background: #e2e8f0; }
.ball {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #8b5cf6;
  /* The easing you built */
  animation: slide ${duration}s ${cbValue} infinite alternate;
}
@keyframes slide {
  to { transform: translateX(calc(min(520px, 90vw) - 56px)); }
}
.label { margin: 0; text-align: center; font: 600 13px ui-monospace, monospace; color: #64748b; }`,
  });

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-easing-generator" />

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Left: SVG curve editor */}
        <div className={styles.editorPanel}>
          {/* Title, the cubic-bezier value and actions at the top of the panel */}
          <div className={styles.sideTop}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}><span className={styles.accent}>⌒</span></div>
              <span>CSS <span className={styles.accent}>Easing</span> Generator</span>
            </div>
            <code className={styles.cbDisplay} title={cbValue}>{cbValue}</code>
            <div className={styles.sideActions}>
              <button
                className={`${styles.copyHeaderBtn} ${copied === 'cb' ? styles.copyOk : ''}`}
                onClick={() => handleCopy(cbValue, 'cb')}
              >{copied === 'cb' ? '✓ Copied' : 'Copy'}</button>
              <ForkToMyCodeButton getSnippet={forkSnippet} />
            </div>
          </div>
          <div className={styles.svgLabel}>Curve Editor <span className={styles.svgHint}>drag handles</span></div>
          <div className={styles.svgWrap}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className={styles.svg}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              style={{ touchAction: 'none' }}
            >
              <GridLines />

              {/* diagonal reference line */}
              <line x1={p0.x} y1={p0.y} x2={p3.x} y2={p3.y}
                stroke="var(--text3)" strokeWidth="1" strokeDasharray="5 4" opacity="0.35" />

              {/* handle guide lines */}
              <line x1={p0.x} y1={p0.y} x2={hp1.x} y2={hp1.y}
                stroke="#8b5cf6" strokeWidth="1.5" opacity="0.55" />
              <line x1={p3.x} y1={p3.y} x2={hp2.x} y2={hp2.y}
                stroke="#8b5cf6" strokeWidth="1.5" opacity="0.55" />

              {/* bezier curve */}
              <path d={path} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />

              {/* anchor dots */}
              <circle cx={p0.x} cy={p0.y} r="5" fill="#8b5cf6" />
              <circle cx={p3.x} cy={p3.y} r="5" fill="#8b5cf6" />

              {/* handle P1 */}
              <circle cx={hp1.x} cy={hp1.y} r="8" fill="#8b5cf6"
                stroke={y1 < Y_MIN || y1 > Y_MAX ? '#f59e0b' : 'none'} strokeWidth="2"
                className={styles.handle}
                onPointerDown={e => onPointerDown(e, 'p1')} />
              <circle cx={hp1.x} cy={hp1.y} r="4" fill="white" pointerEvents="none" />

              {/* handle P2 */}
              <circle cx={hp2.x} cy={hp2.y} r="8" fill="#a78bfa"
                stroke={y2 < Y_MIN || y2 > Y_MAX ? '#f59e0b' : 'none'} strokeWidth="2"
                className={styles.handle}
                onPointerDown={e => onPointerDown(e, 'p2')} />
              <circle cx={hp2.x} cy={hp2.y} r="4" fill="white" pointerEvents="none" />
            </svg>
          </div>

          {/* Numeric inputs */}
          <div className={styles.coords}>
            {[
              { label: 'X1', val: x1, set: v => { setX1(r4(clampX(v))); setActivePreset(''); }, min: 0, max: 1, color: '#8b5cf6' },
              { label: 'Y1', val: y1, set: v => { setY1(r4(clampY(v))); setActivePreset(''); }, min: -1.5, max: 2.5, color: '#8b5cf6' },
              { label: 'X2', val: x2, set: v => { setX2(r4(clampX(v))); setActivePreset(''); }, min: 0, max: 1, color: '#a78bfa' },
              { label: 'Y2', val: y2, set: v => { setY2(r4(clampY(v))); setActivePreset(''); }, min: -1.5, max: 2.5, color: '#a78bfa' },
            ].map(({ label, val, set, min, max, color }) => (
              <div key={label} className={styles.coordItem}>
                <span className={styles.coordDot} style={{ background: color }} />
                <label className={styles.coordLabel}>{label}</label>
                <input
                  type="number"
                  className={styles.coordInput}
                  value={fmt(val)}
                  step="0.01"
                  min={min}
                  max={max}
                  onChange={e => { const v = parseFloat(e.target.value); if (!isNaN(v)) set(v); }}
                />
              </div>
            ))}
          </div>

          {/* Presets — left panel, below curve editor */}
          <div className={styles.presetsLabel}>
            Presets <span className={styles.svgHint}>{PRESETS.reduce((s,g) => s + g.items.length, 0)} easings</span>
          </div>
          <div className={styles.presetList}>
            {PRESETS.map(group => (
              <div key={group.group} className={styles.presetGroup}>
                <div className={styles.groupLabel}>{group.group}</div>
                <div className={styles.groupItems}>
                  {group.items.map(p => (
                    <button
                      key={p.name}
                      className={`${styles.presetBtn} ${activePreset === p.name ? styles.presetActive : ''}`}
                      onClick={() => applyPreset(p)}
                    >{p.name}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          <PlaygroundTopAd />

          {/* Preview */}
          <div className={styles.previewSection}>
            <div className={styles.sectionLabel}>
              Preview
              <div className={styles.durationRow}>
                <span className={styles.durLabel}>{duration.toFixed(1)}s</span>
                <input type="range" min="0.3" max="3" step="0.1" value={duration}
                  onChange={e => setDuration(Number(e.target.value))}
                  className={styles.durSlider} />
                <button className={styles.playBtn} onClick={triggerPlay}>▶</button>
              </div>
            </div>
            <div className={styles.previewOuter}>
              <div className={styles.previewTrack}>
                <div
                  key={animKey}
                  className={`${styles.previewBall} ${styles.previewBallActive}`}
                  style={{
                    '--ball-dur':    `${duration.toFixed(1)}s`,
                    '--ball-easing': cbValue,
                  }}
                />
              </div>
            </div>
          </div>

          {/* CSS Output */}
          <div className={styles.outputSection}>
            <div className={styles.sectionLabel}>CSS Output</div>
            {[
              { key: 'cb',         label: 'cubic-bezier', value: cbValue },
              { key: 'transition', label: 'transition',   value: cssTransition },
              { key: 'animation',  label: 'animation',    value: cssAnimation },
            ].map(({ key, label, value }) => (
              <div key={key} className={styles.outputRow}>
                <span className={styles.outLabel}>{label}</span>
                <code className={styles.outCode}>{value}</code>
                <button
                  className={`${styles.outCopy} ${copied === key ? styles.copyOk : ''}`}
                  onClick={() => handleCopy(value, key)}
                  title="Copy"
                >{copied === key ? '✓' : '⎘'}</button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
