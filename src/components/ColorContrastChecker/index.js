'use client';

import { useState, useMemo, useCallback } from 'react';
import s from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ── WCAG color math ─────────────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  if (h.length !== 6) return null;
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

function relativeLuminance({ r, g, b }) {
  const ch = [r, g, b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.04045 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrastRatio(lum1, lum2) {
  const lighter = Math.max(lum1, lum2);
  const darker  = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getLevel(ratio, size = 'normal') {
  if (size === 'large' || size === 'ui') {
    if (ratio >= 4.5) return 'AAA';
    if (ratio >= 3)   return 'AA';
    return 'FAIL';
  }
  if (ratio >= 7)   return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3)   return 'AA Large';
  return 'FAIL';
}

function parseHexInput(val) {
  const cleaned = val.replace(/[^0-9a-fA-F]/g, '');
  if (cleaned.length === 6) return '#' + cleaned;
  if (cleaned.length === 3) return '#' + cleaned.split('').map(c => c + c).join('');
  return null;
}

/* ── Suggestion: nudge a color to meet a target ratio ───────────────────────── */
function suggestColor(fgRgb, bgRgb, targetRatio) {
  const bgLum = relativeLuminance(bgRgb);
  // Try darkening / lightening fg to hit target
  for (let step = 0; step <= 255; step++) {
    for (const dir of [1, -1]) {
      const adj = step * dir;
      const rgb = {
        r: Math.max(0, Math.min(255, fgRgb.r + adj)),
        g: Math.max(0, Math.min(255, fgRgb.g + adj)),
        b: Math.max(0, Math.min(255, fgRgb.b + adj)),
      };
      const lum = relativeLuminance(rgb);
      if (contrastRatio(lum, bgLum) >= targetRatio) {
        return rgbToHex(rgb.r, rgb.g, rgb.b);
      }
    }
  }
  return null;
}

/* ── WCAG criteria rows ──────────────────────────────────────────────────────── */
const CRITERIA = [
  { id: 'aa-normal',  label: 'Normal text',    sub: 'AA · < 18pt / < 14pt bold', required: 4.5 },
  { id: 'aaa-normal', label: 'Normal text',    sub: 'AAA · < 18pt / < 14pt bold', required: 7 },
  { id: 'aa-large',   label: 'Large text',     sub: 'AA · ≥ 18pt or ≥ 14pt bold', required: 3 },
  { id: 'aaa-large',  label: 'Large text',     sub: 'AAA · ≥ 18pt or ≥ 14pt bold', required: 4.5 },
  { id: 'aa-ui',      label: 'UI components',  sub: 'AA · icons, borders, inputs', required: 3 },
];

/* ── Presets ─────────────────────────────────────────────────────────────────── */
const PRESETS = [
  { label: 'Black / White',   fg: '#000000', bg: '#ffffff' },
  { label: 'Navy / White',    fg: '#1e3a8a', bg: '#ffffff' },
  { label: 'Gray / White',    fg: '#6b7280', bg: '#ffffff' },
  { label: 'White / Blue',    fg: '#ffffff', bg: '#2563eb' },
  { label: 'Yellow / Black',  fg: '#fbbf24', bg: '#000000' },
  { label: 'Red / White',     fg: '#dc2626', bg: '#ffffff' },
];

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function ColorContrastChecker() {
  const [fg, setFg] = useState('#1e293b');
  const [bg, setBg] = useState('#f8fafc');
  const [fgInput, setFgInput] = useState('#1e293b');
  const [bgInput, setBgInput] = useState('#f8fafc');
  const [previewSize, setPreviewSize] = useState('normal');
  const [copied, setCopied] = useState('');

  const fgRgb = useMemo(() => hexToRgb(fg), [fg]);
  const bgRgb = useMemo(() => hexToRgb(bg), [bg]);

  const ratio = useMemo(() => {
    if (!fgRgb || !bgRgb) return null;
    const fgL = relativeLuminance(fgRgb);
    const bgL = relativeLuminance(bgRgb);
    return contrastRatio(fgL, bgL);
  }, [fgRgb, bgRgb]);

  const suggestion = useMemo(() => {
    if (!fgRgb || !bgRgb || !ratio || ratio >= 4.5) return null;
    return suggestColor(fgRgb, bgRgb, 4.5);
  }, [fgRgb, bgRgb, ratio]);

  /* ── Sync hex text ↔ color picker ───────────────────────────────────────── */
  const handleFgText = useCallback((val) => {
    setFgInput(val);
    const parsed = parseHexInput(val.replace(/^#/, ''));
    if (parsed) { setFg(parsed); setFgInput(parsed); }
  }, []);

  const handleBgText = useCallback((val) => {
    setBgInput(val);
    const parsed = parseHexInput(val.replace(/^#/, ''));
    if (parsed) { setBg(parsed); setBgInput(parsed); }
  }, []);

  const handleFgPicker = useCallback((val) => { setFg(val); setFgInput(val); }, []);
  const handleBgPicker = useCallback((val) => { setBg(val); setBgInput(val); }, []);

  const swap = useCallback(() => {
    setFg(bg); setFgInput(bg);
    setBg(fg); setBgInput(fg);
  }, [fg, bg]);

  const applyPreset = useCallback((p) => {
    setFg(p.fg); setFgInput(p.fg);
    setBg(p.bg); setBgInput(p.bg);
  }, []);

  const copySwatch = useCallback(async (hex, id) => {
    await navigator.clipboard.writeText(hex);
    setCopied(id);
    setTimeout(() => setCopied(''), 1500);
  }, []);

  const ratioDisplay = ratio ? ratio.toFixed(2) + ':1' : '—';
  const overallLevel = ratio ? getLevel(ratio) : null;
  const overallPass = overallLevel !== 'FAIL';

  return (
    <div className={s.wrap}>
      <CssToolsTopNav active="color-contrast-checker" />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/>
            </svg>
          </span>
          Color Contrast Checker
        </div>
      </div>

      <div className={s.body}>
        {/* ── Left column: inputs + criteria ── */}
        <div className={s.left}>
          {/* Color inputs */}
          <div className={s.colorInputs}>
            {/* Foreground */}
            <div className={s.colorField}>
              <label className={s.colorLabel}>Foreground (Text)</label>
              <div className={s.colorRow}>
                <div className={s.pickerWrap} style={{ background: fg }}>
                  <input type="color" className={s.colorPicker} value={fg} onChange={e => handleFgPicker(e.target.value)} />
                </div>
                <input
                  className={s.hexInput}
                  value={fgInput}
                  onChange={e => handleFgText(e.target.value)}
                  maxLength={7}
                  spellCheck={false}
                />
                <button className={s.copySwatchBtn} onClick={() => copySwatch(fg, 'fg')} title="Copy hex">
                  {copied === 'fg' ? '✓' : '⎘'}
                </button>
              </div>
              {fgRgb && (
                <span className={s.rgbLabel}>rgb({fgRgb.r}, {fgRgb.g}, {fgRgb.b})</span>
              )}
            </div>

            {/* Swap */}
            <button className={s.swapBtn} onClick={swap} title="Swap colors">
              ⇅
            </button>

            {/* Background */}
            <div className={s.colorField}>
              <label className={s.colorLabel}>Background</label>
              <div className={s.colorRow}>
                <div className={s.pickerWrap} style={{ background: bg }}>
                  <input type="color" className={s.colorPicker} value={bg} onChange={e => handleBgPicker(e.target.value)} />
                </div>
                <input
                  className={s.hexInput}
                  value={bgInput}
                  onChange={e => handleBgText(e.target.value)}
                  maxLength={7}
                  spellCheck={false}
                />
                <button className={s.copySwatchBtn} onClick={() => copySwatch(bg, 'bg')} title="Copy hex">
                  {copied === 'bg' ? '✓' : '⎘'}
                </button>
              </div>
              {bgRgb && (
                <span className={s.rgbLabel}>rgb({bgRgb.r}, {bgRgb.g}, {bgRgb.b})</span>
              )}
            </div>
          </div>

          {/* Ratio badge */}
          <div className={`${s.ratioBadge} ${ratio ? (overallPass ? s.ratioBadgePass : s.ratioBadgeFail) : ''}`}>
            <div className={s.ratioValue}>{ratioDisplay}</div>
            <div className={s.ratioSub}>Contrast Ratio</div>
            {overallLevel && (
              <div className={`${s.ratioLevel} ${overallPass ? s.levelPass : s.levelFail}`}>
                {overallLevel === 'FAIL' ? '✗ Fails WCAG AA' : `✓ Passes WCAG ${overallLevel}`}
              </div>
            )}
          </div>

          {/* WCAG criteria */}
          <div className={s.criteria}>
            <div className={s.criteriaTitle}>WCAG 2.1 Compliance</div>
            {CRITERIA.map(c => {
              const pass = ratio ? ratio >= c.required : null;
              return (
                <div key={c.id} className={`${s.criterionRow} ${pass === true ? s.criterionPass : pass === false ? s.criterionFail : ''}`}>
                  <div className={s.criterionInfo}>
                    <span className={s.criterionLabel}>{c.label}</span>
                    <span className={s.criterionSub}>{c.sub}</span>
                  </div>
                  <div className={s.criterionRight}>
                    <span className={s.criterionRequired}>{c.required}:1</span>
                    <span className={`${s.criterionBadge} ${pass === true ? s.badgePass : pass === false ? s.badgeFail : ''}`}>
                      {pass === null ? '—' : pass ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggestion */}
          {suggestion && (
            <div className={s.suggestion}>
              <span className={s.suggestionLabel}>💡 To pass AA — try this foreground:</span>
              <div className={s.suggestionRow}>
                <span className={s.suggestionSwatch} style={{ background: suggestion }} />
                <span className={s.suggestionHex}>{suggestion}</span>
                <button className={s.suggestionUse} onClick={() => { setFg(suggestion); setFgInput(suggestion); }}>
                  Use
                </button>
              </div>
            </div>
          )}

          {/* Presets */}
          <div className={s.presets}>
            <div className={s.presetsTitle}>Presets</div>
            <div className={s.presetGrid}>
              {PRESETS.map(p => (
                <button key={p.label} className={s.presetBtn} onClick={() => applyPreset(p)}>
                  <span className={s.presetSwatch} style={{ background: p.fg, border: `3px solid ${p.bg}`, outline: `2px solid ${p.fg}` }} />
                  <span className={s.presetLabel}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column: preview ── */}
        <div className={s.right}>
          <div className={s.previewCard} style={{ background: bg }}>
            {/* Preview size tabs */}
            <div className={s.previewTabs}>
              {['normal','large','ui'].map(sz => (
                <button
                  key={sz}
                  className={`${s.previewTab} ${previewSize === sz ? s.previewTabActive : ''}`}
                  style={previewSize === sz ? { color: fg, borderColor: fg } : {}}
                  onClick={() => setPreviewSize(sz)}
                >
                  {sz.charAt(0).toUpperCase() + sz.slice(1)}
                </button>
              ))}
            </div>

            {previewSize === 'normal' && (
              <div className={s.previewNormal}>
                <p className={s.pNormal} style={{ color: fg }}>The quick brown fox jumps over the lazy dog.</p>
                <p className={s.pSmall} style={{ color: fg }}>Normal text — 16px (12pt). This is how body copy, paragraphs, labels, and most interface text appears at typical reading size.</p>
                <p className={s.pBoldNormal} style={{ color: fg }}>Bold text at normal size looks like this.</p>
              </div>
            )}

            {previewSize === 'large' && (
              <div className={s.previewNormal}>
                <p className={s.pLarge} style={{ color: fg }}>Large Text — 24px (18pt)</p>
                <p className={s.pBoldLarge} style={{ color: fg }}>Bold Large — 19px (14pt bold)</p>
                <p className={s.pSmall} style={{ color: fg }}>Large text qualifies for relaxed contrast requirements under WCAG 2.1. Text ≥ 18pt or ≥ 14pt bold passes AA at 3:1.</p>
              </div>
            )}

            {previewSize === 'ui' && (
              <div className={s.previewUi}>
                <p className={s.pSmall} style={{ color: fg }}>UI components must meet 3:1 contrast for borders, icons, and interactive elements.</p>
                <div className={s.uiRow}>
                  <button className={s.uiBtn} style={{ background: fg, color: bg }}>Button</button>
                  <button className={s.uiBtnOutline} style={{ color: fg, borderColor: fg }}>Outlined</button>
                </div>
                <div className={s.uiRow}>
                  <input className={s.uiInput} style={{ color: fg, borderColor: fg }} placeholder="Input field" readOnly />
                  <div className={s.uiCheckbox} style={{ borderColor: fg }}>
                    <div className={s.uiCheckboxInner} style={{ background: fg }} />
                  </div>
                </div>
                <div className={s.uiIconRow}>
                  {['★','♥','⚙','✎','⊕'].map(icon => (
                    <span key={icon} className={s.uiIcon} style={{ color: fg }}>{icon}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Luminance info */}
          {fgRgb && bgRgb && (
            <div className={s.lumInfo}>
              <div className={s.lumRow}>
                <span className={s.lumSwatch} style={{ background: fg }} />
                <span className={s.lumLabel}>Foreground luminance</span>
                <span className={s.lumVal}>{relativeLuminance(fgRgb).toFixed(4)}</span>
              </div>
              <div className={s.lumRow}>
                <span className={s.lumSwatch} style={{ background: bg }} />
                <span className={s.lumLabel}>Background luminance</span>
                <span className={s.lumVal}>{relativeLuminance(bgRgb).toFixed(4)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
