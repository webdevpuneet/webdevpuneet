'use client';

import { useState, useMemo, useRef } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ── Helpers ──────────────────────────────────────────────────── */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${Number(alpha).toFixed(2)})`;
}

function isValidHex(h) { return /^#[0-9a-fA-F]{6}$/.test(h); }

function blurToTw(px) {
  if (px === 0) return '';
  const m = { 4: 'backdrop-blur-sm', 8: 'backdrop-blur', 12: 'backdrop-blur-md', 16: 'backdrop-blur-lg', 24: 'backdrop-blur-xl', 40: 'backdrop-blur-2xl' };
  return m[px] ?? `backdrop-blur-[${px}px]`;
}
function saturateToTw(pct) {
  if (pct === 100) return '';
  const m = { 0: 'backdrop-saturate-0', 50: 'backdrop-saturate-50', 150: 'backdrop-saturate-150', 200: 'backdrop-saturate-200' };
  return m[pct] ?? `backdrop-saturate-[${pct}%]`;
}
function radiusToTw(px) {
  if (px === 0) return 'rounded-none';
  if (px >= 100) return 'rounded-full';
  const m = { 2: 'rounded-sm', 4: 'rounded', 6: 'rounded-md', 8: 'rounded-lg', 12: 'rounded-xl', 16: 'rounded-2xl', 24: 'rounded-3xl' };
  return m[px] ?? `rounded-[${px}px]`;
}
function shadowToTw(blur) {
  if (blur === 0) return '';
  if (blur <= 6) return 'shadow-sm';
  if (blur <= 12) return 'shadow-md';
  if (blur <= 24) return 'shadow-lg';
  if (blur <= 32) return 'shadow-xl';
  return 'shadow-2xl';
}
function bgToTw(hex, op) {
  const p = Math.round(op / 5) * 5;
  if (hex === '#ffffff') return `bg-white/${p}`;
  if (hex === '#000000') return `bg-black/${p}`;
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `bg-[rgba(${r},${g},${b},${(op/100).toFixed(2)})]`;
}
function borderToTw(w, hex, op) {
  if (w === 0) return '';
  const p = Math.round(op / 5) * 5;
  const sz = w === 1 ? 'border' : `border-[${w}px]`;
  let col;
  if (hex === '#ffffff') col = `border-white/${p}`;
  else if (hex === '#000000') col = `border-black/${p}`;
  else { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); col = `border-[rgba(${r},${g},${b},${(op/100).toFixed(2)})]`; }
  return `${sz} ${col}`;
}

/* ── Data ─────────────────────────────────────────────────────── */
const PRESETS = [
  { label: 'Card',    blur: 16, sat: 180, tint: '#ffffff', bgOp: 20, bw: 1, bo: 25, bc: '#ffffff', radius: 16, sb: 32, so: 15 },
  { label: 'Navbar',  blur: 12, sat: 180, tint: '#ffffff', bgOp: 15, bw: 1, bo: 20, bc: '#ffffff', radius: 0,  sb: 20, so: 10 },
  { label: 'Button',  blur: 8,  sat: 150, tint: '#ffffff', bgOp: 25, bw: 1, bo: 30, bc: '#ffffff', radius: 8,  sb: 12, so: 12 },
  { label: 'Modal',   blur: 20, sat: 200, tint: '#ffffff', bgOp: 25, bw: 1, bo: 20, bc: '#ffffff', radius: 20, sb: 40, so: 20 },
  { label: 'Badge',   blur: 6,  sat: 130, tint: '#ffffff', bgOp: 30, bw: 1, bo: 30, bc: '#ffffff', radius: 100,sb: 8,  so: 10 },
  { label: 'Sidebar', blur: 14, sat: 180, tint: '#ffffff', bgOp: 18, bw: 1, bo: 15, bc: '#ffffff', radius: 0,  sb: 20, so: 15 },
  { label: 'Dark',    blur: 20, sat: 200, tint: '#000000', bgOp: 12, bw: 1, bo: 15, bc: '#ffffff', radius: 16, sb: 32, so: 30 },
  { label: 'Frosted', blur: 25, sat: 200, tint: '#ffffff', bgOp: 35, bw: 2, bo: 40, bc: '#ffffff', radius: 12, sb: 24, so: 8  },
];

const BACKGROUNDS = [
  { label: 'Cosmic', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', dot: '#764ba2' },
  { label: 'Sunset', css: 'linear-gradient(135deg, #f5576c 0%, #f093fb 50%, #ffecd2 100%)', dot: '#f5576c' },
  { label: 'Ocean',  css: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',               dot: '#0093E9' },
  { label: 'Aurora', css: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #667eea 100%)', dot: '#43e97b' },
];

const DEFAULT = PRESETS[0];

/* ── Sub-components ───────────────────────────────────────────── */
function SliderRow({ label, value, min, max, step, unit, onChange }) {
  return (
    <div className={styles.sliderRow}>
      <div className={styles.sliderLabelRow}>
        <span className={styles.sliderLabel}>{label}</span>
        <div className={styles.sliderValWrap}>
          <input type="number" className={styles.numInput}
            value={value} min={min} max={max} step={step}
            onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value))))} />
          <span className={styles.sliderUnit}>{unit}</span>
        </div>
      </div>
      <input type="range" className={styles.slider}
        value={value} min={min} max={max} step={step}
        onChange={e => onChange(Number(e.target.value))} />
    </div>
  );
}

function ColorRow({ label, value, onChange }) {
  const [raw, setRaw] = useState(value);
  return (
    <div className={styles.colorRow}>
      <span className={styles.sliderLabel}>{label}</span>
      <div className={styles.colorInputWrap}>
        <input type="color" className={styles.colorPicker} value={value}
          onChange={e => { setRaw(e.target.value); onChange(e.target.value); }} />
        <input type="text" className={styles.hexInput}
          value={raw}
          onChange={e => { setRaw(e.target.value); if (isValidHex(e.target.value)) onChange(e.target.value); }}
          onBlur={() => setRaw(value)}
          maxLength={7} />
      </div>
    </div>
  );
}

/* ── Code rendering ───────────────────────────────────────────── */
function renderCssCode(text) {
  return text.split('\n').map((line, i) => {
    const m = line.match(/^([^:]+):(.*);$/);
    if (!m) return <span key={i}>{line}{'\n'}</span>;
    return (
      <span key={i}>
        <span className={styles.cProp}>{m[1]}</span>
        <span>:</span>
        <span className={styles.cVal}>{m[2]}</span>
        <span>;</span>
        {'\n'}
      </span>
    );
  });
}

function renderTwCode(text) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('<div')) {
      const m = line.match(/^(<div class=")(.+)(">.*)$/);
      if (m) return (
        <span key={i}>
          <span className={styles.cTag}>&lt;div</span>
          <span className={styles.cAttr}> class</span>
          <span>=</span>
          <span className={styles.cStr}>"{m[2]}"</span>
          <span className={styles.cTag}>&gt;</span>
          {'\n'}
        </span>
      );
    }
    if (line.trim() === '<!-- content -->') return <span key={i}>{'  '}<span className={styles.cProp}>{'<!-- content -->'}</span>{'\n'}</span>;
    if (line === '</div>') return <span key={i}><span className={styles.cTag}>&lt;/div&gt;</span>{'\n'}</span>;
    return <span key={i}>{line}{'\n'}</span>;
  });
}

function renderReactCode(text) {
  return text.split('\n').map((line, i) => {
    const m = line.match(/^(\s*)(\w+):\s*('.*'),?$/);
    if (m) return (
      <span key={i}>
        {m[1]}
        <span className={styles.cAttr}>{m[2]}</span>
        <span>: </span>
        <span className={styles.cStr}>{m[3]}</span>
        {line.endsWith(',') ? ',' : ''}
        {'\n'}
      </span>
    );
    return <span key={i}>{line}{'\n'}</span>;
  });
}

/* ── Main component ───────────────────────────────────────────── */
export default function GlassmorphismGeneratorTool() {
  const [blur, setBlur]     = useState(DEFAULT.blur);
  const [sat, setSat]       = useState(DEFAULT.sat);
  const [tint, setTint]     = useState(DEFAULT.tint);
  const [bgOp, setBgOp]     = useState(DEFAULT.bgOp);
  const [bw, setBw]         = useState(DEFAULT.bw);
  const [bo, setBo]         = useState(DEFAULT.bo);
  const [bc, setBc]         = useState(DEFAULT.bc);
  const [radius, setRadius] = useState(DEFAULT.radius);
  const [sb, setSb]         = useState(DEFAULT.sb);
  const [so, setSo]         = useState(DEFAULT.so);
  const [bgIdx, setBgIdx]   = useState(0);
  const [customBg, setCustomBg] = useState(null);
  const [tab, setTab]       = useState('css');
  const [copied, setCopied] = useState(false);
  const [preset, setPreset] = useState('Card');
  const fileRef = useRef(null);

  function applyPreset(p) {
    setBlur(p.blur); setSat(p.sat); setTint(p.tint); setBgOp(p.bgOp);
    setBw(p.bw); setBo(p.bo); setBc(p.bc); setRadius(p.radius);
    setSb(p.sb); setSo(p.so); setPreset(p.label);
  }

  const tintRgba   = hexToRgba(tint, bgOp / 100);
  const borderRgba = hexToRgba(bc, bo / 100);
  const shadowStr  = sb > 0 ? `0 8px ${sb}px rgba(0, 0, 0, ${(so / 100).toFixed(2)})` : 'none';

  const glassStyle = {
    backdropFilter: `blur(${blur}px) saturate(${sat}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${sat}%)`,
    background: tintRgba,
    border: bw > 0 ? `${bw}px solid ${borderRgba}` : 'none',
    borderRadius: `${radius}px`,
    boxShadow: sb > 0 ? shadowStr : 'none',
  };

  const cssOutput = useMemo(() => {
    const lines = [
      `backdrop-filter: blur(${blur}px) saturate(${sat}%);`,
      `-webkit-backdrop-filter: blur(${blur}px) saturate(${sat}%);`,
      `background: ${tintRgba};`,
    ];
    if (bw > 0) lines.push(`border: ${bw}px solid ${borderRgba};`);
    lines.push(`border-radius: ${radius}px;`);
    if (sb > 0) lines.push(`box-shadow: ${shadowStr};`);
    return lines.join('\n');
  }, [blur, sat, tintRgba, bw, borderRgba, radius, sb, shadowStr]);

  const twOutput = useMemo(() => {
    const classes = [
      blurToTw(blur),
      saturateToTw(sat),
      bgToTw(tint, bgOp),
      borderToTw(bw, bc, bo),
      radiusToTw(radius),
      shadowToTw(sb),
    ].filter(Boolean).join(' ');
    return `<div class="${classes}">\n  <!-- content -->\n</div>`;
  }, [blur, sat, tint, bgOp, bw, bc, bo, radius, sb]);

  const reactOutput = useMemo(() => {
    const lines = [
      `  backdropFilter: 'blur(${blur}px) saturate(${sat}%)',`,
      `  WebkitBackdropFilter: 'blur(${blur}px) saturate(${sat}%)',`,
      `  background: '${tintRgba}',`,
    ];
    if (bw > 0) lines.push(`  border: '${bw}px solid ${borderRgba}',`);
    lines.push(`  borderRadius: '${radius}px',`);
    if (sb > 0) lines.push(`  boxShadow: '${shadowStr}',`);
    return `style={{\n${lines.join('\n')}\n}}`;
  }, [blur, sat, tintRgba, bw, borderRgba, radius, sb, shadowStr]);

  const outputText = tab === 'css' ? cssOutput : tab === 'tailwind' ? twOutput : reactOutput;

  function copy() {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function reset() { applyPreset(DEFAULT); setBgIdx(0); setCustomBg(null); }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setCustomBg(ev.target.result); setBgIdx(-1); };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const bgStyle = customBg
    ? { backgroundImage: `url(${customBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: BACKGROUNDS[bgIdx]?.css ?? BACKGROUNDS[0].css };

  const headerSub = `blur(${blur}px) · ${bgOp}% opacity · ${radius}px radius`;

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="glassmorphism-generator" />
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="11" height="11" rx="3" fill="#667eea" opacity="0.8"/>
            <circle cx="18" cy="8" r="5" fill="#f093fb" opacity="0.7"/>
            <rect x="10" y="10" width="11" height="11" rx="3" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>CSS <strong className={styles.accent}>Glassmorphism</strong> Generator</span>
        <div className={styles.sep} />
        <span className={styles.headerSub}>{headerSub}</span>
        <div className={styles.headerActions}>
          <button className={styles.resetBtn} onClick={reset}>Reset</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* ── Controls ── */}
        <div className={styles.controls}>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Presets</div>
            <div className={styles.presetGrid}>
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  className={`${styles.presetBtn} ${preset === p.label ? styles.presetBtnActive : ''}`}
                  onClick={() => applyPreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Backdrop</div>
            <SliderRow label="Blur" value={blur} min={0} max={30} step={1} unit="px"
              onChange={v => { setBlur(v); setPreset(''); }} />
            <SliderRow label="Saturate" value={sat} min={100} max={250} step={5} unit="%"
              onChange={v => { setSat(v); setPreset(''); }} />
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Background</div>
            <ColorRow label="Tint color" value={tint}
              onChange={v => { setTint(v); setPreset(''); }} />
            <SliderRow label="Opacity" value={bgOp} min={0} max={60} step={1} unit="%"
              onChange={v => { setBgOp(v); setPreset(''); }} />
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Border</div>
            <SliderRow label="Width" value={bw} min={0} max={4} step={1} unit="px"
              onChange={v => { setBw(v); setPreset(''); }} />
            <ColorRow label="Color" value={bc}
              onChange={v => { setBc(v); setPreset(''); }} />
            <SliderRow label="Opacity" value={bo} min={0} max={80} step={1} unit="%"
              onChange={v => { setBo(v); setPreset(''); }} />
            <SliderRow label="Radius" value={radius} min={0} max={100} step={1} unit="px"
              onChange={v => { setRadius(v); setPreset(''); }} />
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Shadow</div>
            <SliderRow label="Blur" value={sb} min={0} max={60} step={2} unit="px"
              onChange={v => { setSb(v); setPreset(''); }} />
            <SliderRow label="Opacity" value={so} min={0} max={50} step={1} unit="%"
              onChange={v => { setSo(v); setPreset(''); }} />
          </div>
        </div>

        {/* ── Preview ── */}
        <div className={styles.previewPane}>
          <div className={styles.bgBar}>
            <span className={styles.bgBarLabel}>Background</span>
            {BACKGROUNDS.map((bg, i) => (
              <button
                key={bg.label}
                className={`${styles.bgBtn} ${bgIdx === i && !customBg ? styles.bgBtnActive : ''}`}
                onClick={() => { setBgIdx(i); setCustomBg(null); }}
              >
                <span className={styles.bgBtnSwatch} style={{ background: bg.dot }} />
                {bg.label}
              </button>
            ))}
            <button className={styles.uploadBtn} onClick={() => fileRef.current?.click()}>
              ↑ Upload
            </button>
            {customBg && (
              <button className={styles.uploadBtn} onClick={() => { setCustomBg(null); setBgIdx(0); }}>
                ✕ Remove
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          </div>

          <div className={styles.previewArea}>
            <div className={styles.previewBg} style={bgStyle}>
              <div className={styles.blob1} />
              <div className={styles.blob2} />
              <div className={styles.blob3} />
              <div className={styles.glassCard} style={glassStyle}>
                <div className={styles.cardBadge}>Glass Effect</div>
                <div className={styles.cardTitle}>Glassmorphism</div>
                <div className={styles.cardSub}>blur({blur}px) · opacity {bgOp}%</div>
                <div className={styles.cardRow}>
                  <div className={styles.cardAvatar} />
                  <div className={styles.cardActionBtn}>Learn More</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Output ── */}
        <div className={styles.outputPane}>
          <div className={styles.tabs}>
            {['css', 'tailwind', 'react'].map(t => (
              <button
                key={t}
                className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
                onClick={() => setTab(t)}
              >
                {t === 'css' ? 'CSS' : t === 'tailwind' ? 'Tailwind' : 'React'}
              </button>
            ))}
          </div>

          <div className={styles.outputBody}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>
                {tab === 'css' ? 'css' : tab === 'tailwind' ? 'html' : 'jsx'}
              </span>
              <button
                className={`${styles.codeCopyBtn} ${copied ? styles.copied : ''}`}
                onClick={copy}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <div className={styles.codeScroll}>
              <pre className={styles.codeBlock}>
                {tab === 'css' && renderCssCode(cssOutput)}
                {tab === 'tailwind' && renderTwCode(twOutput)}
                {tab === 'react' && renderReactCode(reactOutput)}
              </pre>
            </div>

            <div className={styles.compatSection}>
              <div className={styles.compatTitle}>Browser Support</div>
              <div className={styles.compatRow}>
                <span className={styles.compatBadge + ' ' + styles.compatOk}>✓ Chrome</span>
                <span className={styles.compatBadge + ' ' + styles.compatWarn}>⚠ Firefox</span>
                <span className={styles.compatBadge + ' ' + styles.compatOk}>✓ Safari</span>
                <span className={styles.compatBadge + ' ' + styles.compatOk}>✓ Edge</span>
              </div>
              <div className={styles.compatNote}>
                Firefox requires <code>layout.css.backdrop-filter.enabled</code> in about:config. Always include <code>-webkit-backdrop-filter</code> for Safari.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
