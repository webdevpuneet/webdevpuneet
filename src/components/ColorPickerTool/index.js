'use client';

import { useState, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ─── Color math ───────────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
    .join('');
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const v = max, s = max === 0 ? 0 : d / max;
  let h = 0;
  if (max !== min) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function rgbToOklch(r, g, b) {
  const lin = c => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const lr = lin(r), lg = lin(g), lb = lin(b);
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb;
  const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb;
  const lms = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const mms = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const sms = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);
  const L = 0.2104542553 * lms + 0.7936177850 * mms - 0.0040720468 * sms;
  const a = 1.9779984951 * lms - 2.4285922050 * mms + 0.4505937099 * sms;
  const bk = 0.0259040371 * lms + 0.7827717662 * mms - 0.8086757660 * sms;
  const C = Math.sqrt(a * a + bk * bk);
  let H = Math.atan2(bk, a) * 180 / Math.PI;
  if (H < 0) H += 360;
  return {
    L: Math.round(L * 1000) / 1000,
    C: Math.round(C * 1000) / 1000,
    H: Math.round(H * 10) / 10,
  };
}

function oklchToRgb(L, C, H) {
  const a = C * Math.cos(H * Math.PI / 180);
  const b = C * Math.sin(H * Math.PI / 180);
  const lms = L + 0.3963377774 * a + 0.2158037573 * b;
  const mms = L - 0.1055613458 * a - 0.0638541728 * b;
  const sms = L - 0.0894841775 * a - 1.2914855480 * b;
  const l3 = lms ** 3, m3 = mms ** 3, s3 = sms ** 3;
  const x =  4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const y = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const z = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;
  let lr =  3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  let lg = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
  let lb =  0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
  const gam = c => {
    c = Math.max(0, Math.min(1, c));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };
  return { r: Math.round(gam(lr) * 255), g: Math.round(gam(lg) * 255), b: Math.round(gam(lb) * 255) };
}

function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round((1 - r - k) / (1 - k) * 100),
    m: Math.round((1 - g - k) / (1 - k) * 100),
    y: Math.round((1 - b - k) / (1 - k) * 100),
    k: Math.round(k * 100),
  };
}

function relativeLuminance(r, g, b) {
  const lin = c => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(l1, l2) {
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 10) / 10;
}

/* ─── Smart parser ─────────────────────────────────────────────────────── */
function parseAnyColor(raw) {
  const s = raw.trim();
  if (!s) return null;

  // HEX 3-digit
  const h3 = s.match(/^#?([0-9a-f]{3})$/i);
  if (h3) {
    const h = h3[1];
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`.toLowerCase();
  }
  // HEX 6-digit
  const h6 = s.match(/^#?([0-9a-f]{6})$/i);
  if (h6) return `#${h6[1].toLowerCase()}`;

  // RGB / RGBA
  const rgb = s.match(/rgba?\(\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)/i);
  if (rgb) return rgbToHex(+rgb[1], +rgb[2], +rgb[3]);

  // HSL / HSLA
  const hsl = s.match(/hsla?\(\s*(\d+(?:\.\d+)?)\s*(?:deg)?\s*[,\s]\s*(\d+(?:\.\d+)?)%\s*[,\s]\s*(\d+(?:\.\d+)?)%/i);
  if (hsl) {
    const { r, g, b } = hslToRgb(+hsl[1], +hsl[2], +hsl[3]);
    return rgbToHex(r, g, b);
  }

  // OKLCH
  const oklch = s.match(/oklch\(\s*(\d+(?:\.\d+)?)(%?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/i);
  if (oklch) {
    let L = +oklch[1];
    if (oklch[2] === '%') L /= 100;
    const { r, g, b } = oklchToRgb(L, +oklch[3], +oklch[4]);
    return rgbToHex(r, g, b);
  }

  // CSS named color via canvas
  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#010101';
      ctx.fillStyle = s;
      const c = ctx.fillStyle;
      if (c !== '#010101') return c;
    } catch {}
  }
  return null;
}

/* ─── Config ───────────────────────────────────────────────────────────── */
const FORMATS = [
  { id: 'hex',   label: 'HEX',   desc: 'Web / CSS',                    accent: '#f59e0b' },
  { id: 'rgb',   label: 'RGB',   desc: 'Red · Green · Blue',           accent: '#4ade9e' },
  { id: 'hsl',   label: 'HSL',   desc: 'Hue · Saturation · Lightness', accent: '#60a5fa' },
  { id: 'hsv',   label: 'HSV',   desc: 'Hue · Saturation · Value',     accent: '#a78bfa' },
  { id: 'oklch', label: 'OKLCH', desc: 'CSS Color Level 4',            accent: '#f472b6' },
  { id: 'cmyk',  label: 'CMYK',  desc: 'Print / Design',               accent: '#fb923c' },
];

const PRESETS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
  '#f8fafc', '#0f172a',
];

/* ─── Copy icon ────────────────────────────────────────────────────────── */
function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Component ────────────────────────────────────────────────────────── */
export default function ColorPickerTool() {
  const [hex,        setHex]        = useState('#3b82f6');
  const [smartVal,   setSmartVal]   = useState('');
  const [smartErr,   setSmartErr]   = useState('');
  const [copied,     setCopied]     = useState(null);
  const [upperCase,  setUpperCase]  = useState(false);

  /* ── Derived ───────────────────────────────────────────────────────── */
  const color = useMemo(() => {
    const { r, g, b } = hexToRgb(hex);
    const hsl  = rgbToHsl(r, g, b);
    const hsv  = rgbToHsv(r, g, b);
    const oklch = rgbToOklch(r, g, b);
    const cmyk = rgbToCmyk(r, g, b);
    const lum  = relativeLuminance(r, g, b);
    return {
      r, g, b, lum,
      isLight: lum > 0.35,
      fmtHex:   upperCase ? hex.toUpperCase() : hex,
      fmtRgb:   `rgb(${r}, ${g}, ${b})`,
      fmtHsl:   `hsl(${hsl.h}deg ${hsl.s}% ${hsl.l}%)`,
      fmtHsv:   `hsv(${hsv.h}° ${hsv.s}% ${hsv.v}%)`,
      fmtOklch: `oklch(${oklch.L} ${oklch.C} ${oklch.H})`,
      fmtCmyk:  `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
      contrastW: contrastRatio(lum, 1.0),
      contrastB: contrastRatio(lum, 0.0),
    };
  }, [hex, upperCase]);

  const fmtValues = {
    hex:   color.fmtHex,
    rgb:   color.fmtRgb,
    hsl:   color.fmtHsl,
    hsv:   color.fmtHsv,
    oklch: color.fmtOklch,
    cmyk:  color.fmtCmyk,
  };

  /* ── Actions ───────────────────────────────────────────────────────── */
  function updateHex(raw) {
    const h = raw.startsWith('#') ? raw.toLowerCase() : `#${raw.toLowerCase()}`;
    if (/^#[0-9a-f]{6}$/.test(h)) {
      setHex(h);
      setSmartVal('');
      setSmartErr('');
    }
  }

  function handleSmartInput(val) {
    setSmartVal(val);
    if (!val.trim()) { setSmartErr(''); return; }
    const parsed = parseAnyColor(val);
    if (parsed) { setHex(parsed); setSmartErr(''); }
    else setSmartErr('Unrecognized format');
  }

  function copyFmt(id) {
    navigator.clipboard.writeText(fmtValues[id]).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  }

  /* ── Dynamic chrome ─ tool UI tints to the selected color ──────────── */
  const ac = hex;
  const acBg   = `${ac}1a`;
  const acBd   = `${ac}44`;
  const acText = color.isLight ? '#000' : '#fff';

  /* ── WCAG helpers ──────────────────────────────────────────────────── */
  function WcagBadge({ ratio, threshold, label }) {
    const pass = ratio >= threshold;
    return (
      <span className={`${styles.wcagBadge} ${pass ? styles.wcagPass : styles.wcagFail}`}>
        {label} {pass ? '✓' : '✗'}
      </span>
    );
  }

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="color-picker" />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} style={{ background: acBg, borderColor: acBd }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="13.5" cy="6.5" r="2.5" fill={ac}/>
              <circle cx="17.5" cy="10.5" r="2.5" fill="#f472b6"/>
              <circle cx="8.5"  cy="7.5"  r="2.5" fill="#4ade9e"/>
              <circle cx="6.5"  cy="14.5" r="2.5" fill="#60a5fa"/>
              <circle cx="15.5" cy="15.5" r="2.5" fill="#f59e0b"/>
              <circle cx="10.5" cy="17.5" r="2.5" fill="#a78bfa"/>
            </svg>
          </div>
          <span>Color <span style={{ color: ac }}>Picker</span></span>
        </div>

        <label className={styles.toggle}>
          <input type="checkbox" checked={upperCase} onChange={e => setUpperCase(e.target.checked)} />
          <span>UPPERCASE</span>
        </label>

        <div className={styles.headerRight}>
          <button className={styles.sampleBtn}
            onClick={() => updateHex(PRESETS[Math.floor(Math.random() * PRESETS.length)])}>
            Random
          </button>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Left: picker ─────────────────────────────────────────────── */}
        <div className={styles.pickerPane}>

          {/* Swatch */}
          <div className={styles.swatchWrap}>
            <div className={styles.swatch} style={{ background: hex }}>
              <input
                type="color"
                className={styles.nativePicker}
                value={hex}
                onChange={e => updateHex(e.target.value)}
              />
              <span className={styles.swatchHint} style={{ color: color.isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.45)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.52-.2-1-.54-1.36-.32-.34-.52-.82-.52-1.32 0-1.1.9-2 2-2h2.36c3.08 0 5.7-2.54 5.7-5.64C22 6.22 17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8"  cy="14" r="1.2" fill="currentColor"/>
                  <circle cx="8"  cy="10" r="1.2" fill="currentColor"/>
                  <circle cx="12" cy="7"  r="1.2" fill="currentColor"/>
                  <circle cx="16" cy="10" r="1.2" fill="currentColor"/>
                </svg>
                Click to pick
              </span>
            </div>

            {/* Hex bar below swatch */}
            <div className={styles.hexBar}>
              <span className={styles.hexHash} style={{ color: ac }}>#</span>
              <input
                className={styles.hexInput}
                value={(upperCase ? hex.slice(1).toUpperCase() : hex.slice(1))}
                onChange={e => updateHex(e.target.value)}
                maxLength={6}
                spellCheck={false}
              />
              <div className={styles.hexSwatch} style={{ background: hex }} />
            </div>
          </div>

          {/* Smart paste */}
          <div className={styles.smartSection}>
            <label className={styles.sectionLabel}>Paste any format</label>
            <input
              className={`${styles.smartInput} ${smartErr ? styles.smartInputErr : ''}`}
              type="text"
              placeholder="rgb(…) hsl(…) oklch(…) or color name…"
              value={smartVal}
              onChange={e => handleSmartInput(e.target.value)}
              spellCheck={false}
            />
            {smartErr && <div className={styles.smartError}>{smartErr}</div>}
          </div>

          {/* Presets */}
          <div className={styles.presetsSection}>
            <label className={styles.sectionLabel}>Presets</label>
            <div className={styles.presets}>
              {PRESETS.map(p => (
                <button
                  key={p}
                  className={`${styles.preset} ${hex === p ? styles.presetActive : ''}`}
                  style={{
                    background: p,
                    borderColor: hex === p ? ac : 'transparent',
                    outline: hex === p ? `2px solid ${ac}55` : 'none',
                  }}
                  onClick={() => { setHex(p); setSmartVal(''); setSmartErr(''); }}
                  title={p}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: formats ───────────────────────────────────────────── */}
        <div className={styles.formatsPane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>Color Formats</span>
            <span className={styles.paneHint}>click to copy</span>
          </div>

          <div className={styles.formatsList}>
            {FORMATS.map(fmt => (
              <div
                key={fmt.id}
                className={`${styles.fmtRow} ${copied === fmt.id ? styles.fmtRowCopied : ''}`}
                onClick={() => copyFmt(fmt.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && copyFmt(fmt.id)}
              >
                <div className={styles.fmtAccent} style={{ background: fmt.accent }} />
                <div className={styles.fmtInfo}>
                  <span className={styles.fmtLabel} style={{ color: fmt.accent }}>{fmt.label}</span>
                  <span className={styles.fmtDesc}>{fmt.desc}</span>
                </div>
                <div className={styles.fmtValue}>
                  <span className={styles.fmtText}>{fmtValues[fmt.id]}</span>
                </div>
                <span className={`${styles.copyBtn} ${copied === fmt.id ? styles.copyBtnOk : ''}`}>
                  {copied === fmt.id
                    ? <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="#4ade9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <CopyIcon />
                  }
                </span>
              </div>
            ))}
          </div>

          {/* ── WCAG Accessibility ───────────────────────────────────── */}
          <div className={styles.wcagSection}>
            <div className={styles.wcagTitle}>WCAG Contrast</div>
            <div className={styles.wcagRows}>

              <div className={styles.wcagRow}>
                <div className={styles.wcagPreview} style={{ background: '#ffffff' }}>
                  <span style={{ color: hex }}>Aa</span>
                </div>
                <span className={styles.wcagOn}>on white</span>
                <span className={styles.wcagRatio}>{color.contrastW}:1</span>
                <WcagBadge ratio={color.contrastW} threshold={4.5} label="AA" />
                <WcagBadge ratio={color.contrastW} threshold={7}   label="AAA" />
              </div>

              <div className={styles.wcagRow}>
                <div className={styles.wcagPreview} style={{ background: '#000000' }}>
                  <span style={{ color: hex }}>Aa</span>
                </div>
                <span className={styles.wcagOn}>on black</span>
                <span className={styles.wcagRatio}>{color.contrastB}:1</span>
                <WcagBadge ratio={color.contrastB} threshold={4.5} label="AA" />
                <WcagBadge ratio={color.contrastB} threshold={7}   label="AAA" />
              </div>

              <div className={styles.wcagRow}>
                <div className={styles.wcagPreview} style={{ background: hex }}>
                  <span style={{ color: '#ffffff' }}>Aa</span>
                </div>
                <span className={styles.wcagOn}>white on color</span>
                <span className={styles.wcagRatio}>{color.contrastW}:1</span>
                <WcagBadge ratio={color.contrastW} threshold={4.5} label="AA" />
                <WcagBadge ratio={color.contrastW} threshold={7}   label="AAA" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
