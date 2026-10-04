'use client';

import { useState, useMemo, useCallback } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ─── Color math ─────────────────────────────────────────────── */
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  const s1 = s / 100, l1 = l / 100;
  const a = s1 * Math.min(l1, 1 - l1);
  const f = n => {
    const k = (n + h / 30) % 12;
    const c = l1 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function textColor(hex) {
  return luminance(hex) > 0.35 ? '#0f172a' : '#f8fafc';
}

/* ─── Harmony generators ─────────────────────────────────────── */
const HARMONIES = {
  monochromatic: { label: 'Monochromatic', count: 7 },
  analogous:     { label: 'Analogous',     count: 5 },
  complementary: { label: 'Complementary', count: 6 },
  splitComp:     { label: 'Split-Comp',    count: 5 },
  triadic:       { label: 'Triadic',       count: 6 },
  tetradic:      { label: 'Tetradic',      count: 8 },
  shades:        { label: 'Shades',        count: 9 },
  tints:         { label: 'Tints',         count: 9 },
};

function generatePalette(hex, type) {
  const [h, s, l] = hexToHsl(hex);

  switch (type) {
    case 'monochromatic':
      return [
        hslToHex(h, s, Math.min(l + 40, 92)),
        hslToHex(h, s, Math.min(l + 25, 80)),
        hslToHex(h, s, Math.min(l + 12, 68)),
        hex,
        hslToHex(h, s, Math.max(l - 12, 15)),
        hslToHex(h, s, Math.max(l - 25, 8)),
        hslToHex(h, Math.min(s + 10, 100), Math.max(l - 38, 5)),
      ];

    case 'analogous':
      return [
        hslToHex(h - 40, s, l),
        hslToHex(h - 20, s, l),
        hex,
        hslToHex(h + 20, s, l),
        hslToHex(h + 40, s, l),
      ];

    case 'complementary': {
      const comp = h + 180;
      return [
        hslToHex(h, s, Math.min(l + 20, 85)),
        hex,
        hslToHex(h, Math.max(s - 15, 20), Math.max(l - 20, 15)),
        hslToHex(comp, s, Math.min(l + 20, 85)),
        hslToHex(comp, s, l),
        hslToHex(comp, Math.max(s - 15, 20), Math.max(l - 20, 15)),
      ];
    }

    case 'splitComp': {
      return [
        hex,
        hslToHex(h + 150, s, l),
        hslToHex(h + 210, s, l),
        hslToHex(h + 150, s, Math.min(l + 20, 85)),
        hslToHex(h + 210, s, Math.min(l + 20, 85)),
      ];
    }

    case 'triadic': {
      return [
        hslToHex(h, s, Math.min(l + 15, 82)),
        hex,
        hslToHex(h + 120, s, Math.min(l + 15, 82)),
        hslToHex(h + 120, s, l),
        hslToHex(h + 240, s, Math.min(l + 15, 82)),
        hslToHex(h + 240, s, l),
      ];
    }

    case 'tetradic': {
      return [
        hex,
        hslToHex(h + 90, s, l),
        hslToHex(h + 180, s, l),
        hslToHex(h + 270, s, l),
        hslToHex(h, s, Math.min(l + 20, 85)),
        hslToHex(h + 90, s, Math.min(l + 20, 85)),
        hslToHex(h + 180, s, Math.min(l + 20, 85)),
        hslToHex(h + 270, s, Math.min(l + 20, 85)),
      ];
    }

    case 'shades': {
      const steps = 9;
      return Array.from({ length: steps }, (_, i) => {
        const lVal = Math.round(5 + (i / (steps - 1)) * 88);
        return hslToHex(h, s, lVal);
      }).reverse();
    }

    case 'tints': {
      const steps = 9;
      return Array.from({ length: steps }, (_, i) => {
        const sVal = Math.round(s * (1 - i / (steps - 1)) + 10 * (i / (steps - 1)));
        const lVal = Math.round(l + (i / (steps - 1)) * (94 - l));
        return hslToHex(h, sVal, lVal);
      });
    }

    default: return [hex];
  }
}

/* ─── Export builders ────────────────────────────────────────── */
function toCssVars(colors, name = 'palette') {
  return `:root {\n${colors.map((c, i) => `  --${name}-${i + 1}: ${c};`).join('\n')}\n}`;
}

function toTailwind(colors) {
  const entries = colors.map((c, i) => `      ${(i + 1) * 100}: '${c}',`).join('\n');
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n${entries}\n        },\n      },\n    },\n  },\n};`;
}

function toHexList(colors) {
  return colors.join('\n');
}

function toHslList(colors) {
  return colors.map(c => {
    const [h, s, l] = hexToHsl(c);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }).join('\n');
}

function toScss(colors) {
  return colors.map((c, i) => `$palette-${i + 1}: ${c};`).join('\n');
}

const EXPORT_TABS = ['CSS Vars', 'Tailwind', 'Hex', 'HSL', 'SCSS'];

export default function ColorPaletteGeneratorTool() {
  const [baseColor, setBaseColor] = useState('#6366f1');
  const [hexInput, setHexInput] = useState('#6366f1');
  const [harmony, setHarmony] = useState('monochromatic');
  const [exportTab, setExportTab] = useState('CSS Vars');
  const [copied, setCopied] = useState(null); // hex string of copied color

  const palette = useMemo(() => generatePalette(baseColor, harmony), [baseColor, harmony]);

  const exportCode = useMemo(() => {
    switch (exportTab) {
      case 'CSS Vars': return toCssVars(palette);
      case 'Tailwind': return toTailwind(palette);
      case 'Hex':      return toHexList(palette);
      case 'HSL':      return toHslList(palette);
      case 'SCSS':     return toScss(palette);
      default: return '';
    }
  }, [exportTab, palette]);

  const handleHexInput = (val) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setBaseColor(val);
  };

  const handleColorPicker = (val) => {
    setBaseColor(val);
    setHexInput(val);
  };

  const copyColor = useCallback(async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied('__code__');
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const [h, s, l] = hexToHsl(baseColor);

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="color-palette-generator" />
      <PlaygroundTopAd />
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <circle cx="10" cy="13" r="4" fill="#f472b6"/>
            <circle cx="16" cy="9"  r="4" fill="#facc15"/>
            <circle cx="22" cy="13" r="4" fill="#34d399"/>
            <circle cx="19" cy="21" r="4" fill="#60a5fa"/>
            <circle cx="13" cy="21" r="4" fill="#f87171"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>Color <span className={styles.accent}>Palette</span> Generator</span>
        <div className={styles.headerSep}/>

        {/* Base color picker in header */}
        <div className={styles.colorInputWrap}>
          <input
            type="color"
            value={baseColor}
            onChange={e => handleColorPicker(e.target.value)}
            className={styles.colorPicker}
          />
          <input
            type="text"
            value={hexInput}
            onChange={e => handleHexInput(e.target.value)}
            className={styles.hexInput}
            spellCheck={false}
            maxLength={7}
          />
          <span className={styles.hslBadge}>hsl({h}, {s}%, {l}%)</span>
        </div>

        <div className={styles.headerSep}/>
        <span className={styles.headerSub}>{palette.length} colors · {HARMONIES[harmony].label}</span>
      </header>

      {/* ── Harmony tabs ── */}
      <div className={styles.harmonyBar}>
        {Object.entries(HARMONIES).map(([key, { label }]) => (
          <button
            key={key}
            className={`${styles.harmonyBtn} ${harmony === key ? styles.harmonyBtnActive : ''}`}
            onClick={() => setHarmony(key)}
          >{label}</button>
        ))}
      </div>

      {/* ── Palette swatches ── */}
      <div className={styles.paletteArea}>
        {palette.map((color, i) => {
          const fg = textColor(color);
          const [ch, cs, cl] = hexToHsl(color);
          const isBase = color.toLowerCase() === baseColor.toLowerCase();
          return (
            <button
              key={i}
              className={`${styles.swatch} ${isBase ? styles.swatchBase : ''}`}
              style={{ background: color }}
              onClick={() => copyColor(color)}
              title={`Click to copy ${color}`}
            >
              <span className={styles.swatchCopyIcon} style={{ color: fg }}>
                {copied === color ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
              </span>
              {isBase && <span className={styles.basePill} style={{ color: fg, borderColor: `${fg}44` }}>base</span>}
              <div className={styles.swatchInfo}>
                <span className={styles.swatchHex} style={{ color: fg }}>{color.toUpperCase()}</span>
                <span className={styles.swatchHsl} style={{ color: `${fg}99` }}>{ch}° {cs}% {cl}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Export panel ── */}
      <div className={styles.export}>
        <div className={styles.exportHeader}>
          <div className={styles.exportTabs}>
            {EXPORT_TABS.map(t => (
              <button
                key={t}
                className={`${styles.exportTab} ${exportTab === t ? styles.exportTabActive : ''}`}
                onClick={() => setExportTab(t)}
              >{t}</button>
            ))}
          </div>
          <button className={styles.copyBtn} onClick={copyCode}>
            {copied === '__code__' ? '✓ Copied' : 'Copy All'}
          </button>
        </div>
        <pre className={styles.code}><code>{exportCode}</code></pre>
      </div>
    </div>
  );
}
