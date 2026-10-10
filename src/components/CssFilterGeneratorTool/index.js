'use client';

import { useState, useMemo, useRef } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const FILTERS = [
  { id: 'blur',       label: 'Blur',        unit: 'px',  min: 0,    max: 20,   step: 0.5,  default: 0,   format: v => `blur(${v}px)` },
  { id: 'brightness', label: 'Brightness',  unit: '%',   min: 0,    max: 300,  step: 1,    default: 100, format: v => `brightness(${v}%)` },
  { id: 'contrast',   label: 'Contrast',    unit: '%',   min: 0,    max: 300,  step: 1,    default: 100, format: v => `contrast(${v}%)` },
  { id: 'saturate',   label: 'Saturate',    unit: '%',   min: 0,    max: 300,  step: 1,    default: 100, format: v => `saturate(${v}%)` },
  { id: 'grayscale',  label: 'Grayscale',   unit: '%',   min: 0,    max: 100,  step: 1,    default: 0,   format: v => `grayscale(${v}%)` },
  { id: 'sepia',      label: 'Sepia',       unit: '%',   min: 0,    max: 100,  step: 1,    default: 0,   format: v => `sepia(${v}%)` },
  { id: 'hue-rotate', label: 'Hue Rotate',  unit: 'deg', min: 0,    max: 360,  step: 1,    default: 0,   format: v => `hue-rotate(${v}deg)` },
  { id: 'invert',     label: 'Invert',      unit: '%',   min: 0,    max: 100,  step: 1,    default: 0,   format: v => `invert(${v}%)` },
  { id: 'opacity',    label: 'Opacity',     unit: '%',   min: 0,    max: 100,  step: 1,    default: 100, format: v => `opacity(${v}%)` },
];

const SHADOW_DEFAULT = { x: 2, y: 4, blur: 6, color: '#000000', opacity: 40 };

const SAMPLE_IMAGES = [
  { id: 'landscape', label: 'Landscape', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { id: 'portrait',  label: 'Portrait',  url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' },
  { id: 'city',      label: 'City',      url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
  { id: 'color',     label: 'Color',     url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80' },
];

const PRESETS = [
  { label: 'None',        values: { blur: 0, brightness: 100, contrast: 100, saturate: 100, grayscale: 0, sepia: 0, 'hue-rotate': 0, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Vintage',     values: { blur: 0, brightness: 105, contrast: 85,  saturate: 75,  grayscale: 0, sepia: 30, 'hue-rotate': 0, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Grayscale',   values: { blur: 0, brightness: 100, contrast: 110, saturate: 0,   grayscale: 100, sepia: 0, 'hue-rotate': 0, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Cold',        values: { blur: 0, brightness: 100, contrast: 100, saturate: 110, grayscale: 0, sepia: 0, 'hue-rotate': 200, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Warm',        values: { blur: 0, brightness: 105, contrast: 95,  saturate: 120, grayscale: 0, sepia: 20, 'hue-rotate': 340, invert: 0, opacity: 100 }, shadow: null },
  { label: 'High Contrast', values: { blur: 0, brightness: 100, contrast: 180, saturate: 110, grayscale: 0, sepia: 0, 'hue-rotate': 0, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Dreamy',      values: { blur: 2, brightness: 115, contrast: 85,  saturate: 130, grayscale: 0, sepia: 0, 'hue-rotate': 0, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Neon',        values: { blur: 0, brightness: 110, contrast: 120, saturate: 250, grayscale: 0, sepia: 0, 'hue-rotate': 90, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Matte',       values: { blur: 0, brightness: 95,  contrast: 90,  saturate: 80,  grayscale: 10, sepia: 5, 'hue-rotate': 0, invert: 0, opacity: 100 }, shadow: null },
  { label: 'Night Vision', values: { blur: 0, brightness: 90, contrast: 130, saturate: 120, grayscale: 0, sepia: 0, 'hue-rotate': 90, invert: 0, opacity: 100 }, shadow: null },
];

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`;
}

/* ── Fork to My Code ──────────────────────────────────────────────
   Hands the current filter to /ui-snippets/mycode/ as an editable HTML + CSS snippet: the
   same hand-off the demo pages use (localStorage under uis_fork_<token>, claimed from
   #fork=ls:<token>; the snippet itself rides in the fragment if storage is blocked).
   Nothing goes to a server. */
const FORK_PREFIX = 'uis_fork_';
const FORK_PATH = '/ui-snippets/mycode/';

function b64url(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
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

export default function CssFilterGeneratorTool() {
  const defaults = useMemo(() => Object.fromEntries(FILTERS.map(f => [f.id, f.default])), []);

  const [values, setValues]         = useState({ ...defaults });
  const [shadow, setShadow]         = useState(null); // null = disabled
  const [shadowVals, setShadowVals] = useState({ ...SHADOW_DEFAULT });
  const [sample, setSample]         = useState(SAMPLE_IMAGES[0]);
  const [customUrl, setCustomUrl]   = useState('');
  const [copied, setCopied]         = useState(false);
  const [activePreset, setActivePreset] = useState('None');
  const fileRef = useRef(null);

  const setValue = (id, v) => {
    setValues(prev => ({ ...prev, [id]: v }));
    setActivePreset('');
  };

  const filterString = useMemo(() => {
    const parts = FILTERS
      .filter(f => values[f.id] !== f.default)
      .map(f => f.format(values[f.id]));

    if (shadow) {
      const { x, y, blur, color, opacity } = shadowVals;
      parts.push(`drop-shadow(${x}px ${y}px ${blur}px ${hexToRgba(color, opacity)})`);
    }

    return parts.length ? parts.join('\n  ') : 'none';
  }, [values, shadow, shadowVals]);

  const cssOutput = useMemo(() => {
    const parts = FILTERS
      .filter(f => values[f.id] !== f.default)
      .map(f => f.format(values[f.id]));

    if (shadow) {
      const { x, y, blur, color, opacity } = shadowVals;
      parts.push(`drop-shadow(${x}px ${y}px ${blur}px ${hexToRgba(color, opacity)})`);
    }

    if (!parts.length) return '.element {\n  /* no filters applied */\n}';
    return `.element {\n  filter: ${parts.join('\n    ')};\n  -webkit-filter: ${parts.join('\n    ')};\n}`;
  }, [values, shadow, shadowVals]);

  const isDefault = useMemo(() =>
    FILTERS.every(f => values[f.id] === f.default) && !shadow,
    [values, shadow]
  );

  const reset = () => {
    setValues({ ...defaults });
    setShadow(null);
    setShadowVals({ ...SHADOW_DEFAULT });
    setActivePreset('None');
  };

  const applyPreset = (preset) => {
    setValues({ ...defaults, ...preset.values });
    if (preset.shadow) { setShadow(true); setShadowVals(preset.shadow); }
    else setShadow(null);
    setActivePreset(preset.label);
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const forkToMyCode = () => {
    // An uploaded photo is a blob: URL that only exists in this tab, so it cannot travel to
    // My Code; fall back to the Landscape sample and leave a comment saying how to swap it.
    const isLocal = !/^https?:\/\//i.test(sample.url);
    const src = (isLocal ? SAMPLE_IMAGES[0].url : sample.url).replace(/"/g, '&quot;');
    const html = (isLocal ? '<!-- Your uploaded photo cannot be sent to My Code: replace this src with any image URL. -->\n' : '')
      + `<img class="element" src="${src}" alt="Image with CSS filters applied">`;
    const css = [
      '* { box-sizing: border-box; }',
      'body {',
      '  margin: 0;',
      '  min-height: 100vh;',
      '  display: grid;',
      '  place-items: center;',
      '  padding: 24px;',
      '  background: #f1f5f9;',
      '}',
      '',
      '.element {',
      '  display: block;',
      '  width: min(560px, 100%);',
      '  border-radius: 12px;',
      '  transition: filter 0.3s ease;',
      '}',
      '',
      '/* The filter you built */',
      cssOutput,
    ].join('\n');
    const payload = { v: 1, name: 'CSS Filter', html, css, js: '', cdnUrls: [] };
    window.open(forkUrl(payload), '_blank', 'noopener');
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSample({ id: 'custom', label: 'Custom', url });
  };

  const applyCustomUrl = () => {
    if (customUrl.trim()) setSample({ id: 'url', label: 'URL', url: customUrl.trim() });
  };

  const displayFilter = filterString === 'none' ? 'none' : `${filterString.replace(/\n  /g, ' ')}`;

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-filter-generator" />

      <div className={styles.body}>
        {/* ── Left: sliders ── */}
        <aside className={styles.sidebar}>
          {/* Title, live value and the two main actions stay pinned at the top of the panel */}
          <div className={styles.sideTop}>
            <div className={styles.sideTitleRow}>
              <div className={styles.logoIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="5" fill="#f472b6" opacity="0.85"/>
                  <circle cx="15" cy="9" r="5" fill="#facc15" opacity="0.85"/>
                  <circle cx="12" cy="15" r="5" fill="#60a5fa" opacity="0.85"/>
                </svg>
              </div>
              <div className={styles.headerTitle}>CSS <span className={styles.accent}>Filter</span> Generator</div>
            </div>
            <code className={styles.sideCode} title={isDefault ? 'no filters' : filterString.replace(/\n  /g, ' · ')}>
              {isDefault ? 'no filters' : filterString.replace(/\n  /g, ' · ')}
            </code>
            <div className={styles.sideActions}>
              <button className={styles.resetBtn} onClick={reset} disabled={isDefault}>Reset</button>
              <button className={styles.copyBtn} onClick={copyCSS}>{copied ? '✓ Copied' : 'Copy CSS'}</button>
              <button
                className={`${styles.copyBtn} ${styles.forkBtn}`}
                onClick={forkToMyCode}
                title="Open this filter in My Code as an editable HTML + CSS snippet"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 7.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><line x1="12" y1="11.5" x2="12" y2="16.5"/></svg>
                Fork to My Code
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className={styles.sideSection}>
            <div className={styles.sideSectionTitle}>Presets</div>
            <div className={styles.presetGrid}>
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  className={`${styles.presetBtn} ${activePreset === p.label ? styles.presetBtnActive : ''}`}
                  onClick={() => applyPreset(p)}
                >{p.label}</button>
              ))}
            </div>
          </div>

          <div className={styles.divider}/>

          {/* Filter sliders */}
          <div className={styles.sideSection}>
            <div className={styles.sideSectionTitle}>Filters</div>
            {FILTERS.map(f => (
              <div key={f.id} className={styles.filterRow}>
                <div className={styles.filterLabelRow}>
                  <span className={styles.filterLabel}>{f.label}</span>
                  <div className={styles.filterValWrap}>
                    <input
                      type="number"
                      className={styles.filterNumInput}
                      value={values[f.id]}
                      min={f.min} max={f.max} step={f.step}
                      onChange={e => setValue(f.id, +e.target.value)}
                    />
                    <span className={styles.filterUnit}>{f.unit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min={f.min} max={f.max} step={f.step}
                  value={values[f.id]}
                  onChange={e => setValue(f.id, +e.target.value)}
                />
                <div className={styles.sliderMinMax}>
                  <span>{f.min}{f.unit}</span>
                  <span>{f.max}{f.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.divider}/>

          {/* Drop shadow */}
          <div className={styles.sideSection}>
            <div className={styles.sideSectionTitleRow}>
              <span className={styles.sideSectionTitle}>Drop Shadow</span>
              <label className={styles.toggle}>
                <input type="checkbox" checked={!!shadow} onChange={e => setShadow(e.target.checked ? true : null)}/>
                <span className={styles.toggleTrack}/>
              </label>
            </div>
            {shadow && (
              <div className={styles.shadowControls}>
                {[
                  { key: 'x',    label: 'X', min: -40, max: 40, unit: 'px' },
                  { key: 'y',    label: 'Y', min: -40, max: 40, unit: 'px' },
                  { key: 'blur', label: 'Blur', min: 0, max: 40, unit: 'px' },
                ].map(({ key, label, min, max, unit }) => (
                  <div key={key} className={styles.filterRow}>
                    <div className={styles.filterLabelRow}>
                      <span className={styles.filterLabel}>{label}</span>
                      <div className={styles.filterValWrap}>
                        <input
                          type="number"
                          className={styles.filterNumInput}
                          value={shadowVals[key]}
                          min={min} max={max}
                          onChange={e => setShadowVals(p => ({ ...p, [key]: +e.target.value }))}
                        />
                        <span className={styles.filterUnit}>{unit}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      className={styles.slider}
                      min={min} max={max}
                      value={shadowVals[key]}
                      onChange={e => setShadowVals(p => ({ ...p, [key]: +e.target.value }))}
                    />
                  </div>
                ))}
                <div className={styles.filterRow}>
                  <div className={styles.filterLabelRow}>
                    <span className={styles.filterLabel}>Color</span>
                    <input
                      type="color"
                      value={shadowVals.color}
                      onChange={e => setShadowVals(p => ({ ...p, color: e.target.value }))}
                      className={styles.colorPicker}
                    />
                  </div>
                </div>
                <div className={styles.filterRow}>
                  <div className={styles.filterLabelRow}>
                    <span className={styles.filterLabel}>Opacity</span>
                    <div className={styles.filterValWrap}>
                      <input
                        type="number"
                        className={styles.filterNumInput}
                        value={shadowVals.opacity}
                        min={0} max={100}
                        onChange={e => setShadowVals(p => ({ ...p, opacity: +e.target.value }))}
                      />
                      <span className={styles.filterUnit}>%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    className={styles.slider}
                    min={0} max={100}
                    value={shadowVals.opacity}
                    onChange={e => setShadowVals(p => ({ ...p, opacity: +e.target.value }))}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ── Right: preview + output ── */}
        <div className={styles.rightCol}>
          {/* Ad space: top of the right panel, above the preview */}
          <PlaygroundTopAd />

          {/* Image selector */}
          <div className={styles.imageBar}>
            <div className={styles.imageTabs}>
              {SAMPLE_IMAGES.map(img => (
                <button
                  key={img.id}
                  className={`${styles.imageTab} ${sample.id === img.id ? styles.imageTabActive : ''}`}
                  onClick={() => setSample(img)}
                >{img.label}</button>
              ))}
              <button
                className={`${styles.imageTab} ${sample.id === 'custom' ? styles.imageTabActive : ''}`}
                onClick={() => fileRef.current.click()}
              >Upload</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile}/>
            </div>
            <div className={styles.urlWrap}>
              <input
                type="text"
                className={styles.urlInput}
                placeholder="Paste image URL…"
                value={customUrl}
                onChange={e => setCustomUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && applyCustomUrl()}
              />
              <button className={styles.urlBtn} onClick={applyCustomUrl}>Apply</button>
            </div>
          </div>

          {/* Preview */}
          <div className={styles.previewArea}>
            <div className={styles.previewBg}>
              {/* Side-by-side: original + filtered */}
              <div className={styles.compareWrap}>
                <div className={styles.comparePane}>
                  <span className={styles.compareLabel}>Original</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sample.url}
                    alt="original"
                    className={styles.previewImg}
                    crossOrigin="anonymous"
                  />
                </div>
                <div className={styles.compareDivider}/>
                <div className={styles.comparePane}>
                  <span className={styles.compareLabel}>Filtered</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sample.url}
                    alt="filtered"
                    className={styles.previewImg}
                    style={{ filter: displayFilter }}
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Code output */}
          <div className={styles.output}>
            <div className={styles.outputHeader}>
              <span className={styles.outputTitle}>Generated CSS</span>
              <button className={styles.copyBtn} onClick={copyCSS}>{copied ? '✓ Copied' : 'Copy'}</button>
            </div>
            <pre className={styles.code}><code>{cssOutput}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
