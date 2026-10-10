'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import ForkToMyCodeButton from '@/components/ForkToMyCodeButton';
import { CENTER_PAGE_CSS } from '@/lib/fork-to-mycode';
let idCounter = 0;
function mkId() { return ++idCounter; }

function createLayer(opts = {}) {
  return {
    id: mkId(),
    offsetX: opts.offsetX ?? 0,
    offsetY: opts.offsetY ?? 8,
    blur: opts.blur ?? 16,
    spread: opts.spread ?? 0,
    color: opts.color ?? '#000000',
    opacity: opts.opacity ?? 30,
    inset: opts.inset ?? false,
    enabled: opts.enabled ?? true,
  };
}

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${Number(alpha).toFixed(2)})`;
}

function buildShadowInline(layers) {
  const active = layers.filter(l => l.enabled);
  if (!active.length) return 'none';
  return active.map(l => {
    const rgba = hexToRgba(l.color, l.opacity / 100);
    return `${l.inset ? 'inset ' : ''}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.spread}px ${rgba}`;
  }).join(', ');
}

function buildShadowMultiline(layers) {
  const active = layers.filter(l => l.enabled);
  if (!active.length) return 'none';
  return active.map(l => {
    const rgba = hexToRgba(l.color, l.opacity / 100);
    return `${l.inset ? 'inset ' : ''}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.spread}px ${rgba}`;
  }).join(',\n         ');
}

const NEU_PRESETS = {
  flat: [
    { offsetX: 6, offsetY: 6, blur: 12, spread: 0, color: '#b0aac0', opacity: 80, inset: false, enabled: true },
    { offsetX: -6, offsetY: -6, blur: 12, spread: 0, color: '#ffffff', opacity: 100, inset: false, enabled: true },
  ],
  pressed: [
    { offsetX: 4, offsetY: 4, blur: 8, spread: 0, color: '#b0aac0', opacity: 80, inset: true, enabled: true },
    { offsetX: -4, offsetY: -4, blur: 8, spread: 0, color: '#ffffff', opacity: 100, inset: true, enabled: true },
  ],
  concave: [
    { offsetX: 6, offsetY: 6, blur: 12, spread: 0, color: '#b0aac0', opacity: 80, inset: false, enabled: true },
    { offsetX: -6, offsetY: -6, blur: 12, spread: 0, color: '#ffffff', opacity: 100, inset: false, enabled: true },
    { offsetX: 2, offsetY: 2, blur: 5, spread: -2, color: '#b0aac0', opacity: 40, inset: true, enabled: true },
  ],
  raised: [
    { offsetX: 8, offsetY: 8, blur: 16, spread: -2, color: '#b0aac0', opacity: 90, inset: false, enabled: true },
    { offsetX: -8, offsetY: -8, blur: 16, spread: -2, color: '#ffffff', opacity: 100, inset: false, enabled: true },
  ],
};

const BG_SWATCHES = ['#ffffff', '#000000', '#1a1a24', '#2a2a3a', '#f0f0f4', '#1a2a1a'];

const DEFAULT_LAYERS = [
  createLayer({ offsetX: 0, offsetY: 4, blur: 6, spread: -1, color: '#000000', opacity: 20 }),
  createLayer({ offsetX: 0, offsetY: 10, blur: 15, spread: -3, color: '#000000', opacity: 15 }),
];

const STORAGE_KEY = 'wdp-box-shadow-generator-v1';

const DEFAULTS = {
  layers: DEFAULT_LAYERS, tab: 'css', mode: 'normal', neuPreset: 'flat',
  previewBg: '#ffffff', shape: 'square', boxW: 180, boxH: 180, boxRadius: 16, boxColor: '#cecece',
};

export default function BoxShadowGeneratorTool() {
  const hydrated  = useRef(false);
  const saveTimer = useRef(null);

  const [layers, setLayers] = useState(DEFAULTS.layers);
  const [activeIdx, setActiveIdx] = useState(0);
  const [tab, setTab] = useState(DEFAULTS.tab);
  const [mode, setMode] = useState(DEFAULTS.mode);
  const [neuPreset, setNeuPreset] = useState(DEFAULTS.neuPreset);
  const [previewBg, setPreviewBg] = useState(DEFAULTS.previewBg);
  const [shape, setShape] = useState(DEFAULTS.shape);
  const [boxW, setBoxW] = useState(DEFAULTS.boxW);
  const [boxH, setBoxH] = useState(DEFAULTS.boxH);
  const [boxRadius, setBoxRadius] = useState(DEFAULTS.boxRadius);
  const [boxColor, setBoxColor] = useState(DEFAULTS.boxColor);
  const [copied, setCopied] = useState(false);
  const [saveState, setSaveState] = useState('idle');

  const activeLayer = layers[activeIdx] ?? null;

  const shadowInline = useMemo(() => buildShadowInline(layers), [layers]);
  const shadowMultiline = useMemo(() => buildShadowMultiline(layers), [layers]);

  /* ── Restore from localStorage ───────────────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (Array.isArray(s.layers) && s.layers.length) {
          const maxId = Math.max(...s.layers.map(l => l.id ?? 0));
          if (maxId > idCounter) idCounter = maxId;
          setLayers(s.layers);
        }
        if (s.tab)        setTab(s.tab);
        if (s.mode)       setMode(s.mode);
        if (s.neuPreset)  setNeuPreset(s.neuPreset);
        if (s.previewBg)  setPreviewBg(s.previewBg);
        if (s.shape)      setShape(s.shape);
        if (s.boxW)       setBoxW(s.boxW);
        if (s.boxH)       setBoxH(s.boxH);
        if (s.boxRadius   != null) setBoxRadius(s.boxRadius);
        if (s.boxColor)   setBoxColor(s.boxColor);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  /* ── Debounced save ───────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          layers, tab, mode, neuPreset, previewBg, shape, boxW, boxH, boxRadius, boxColor,
        }));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [layers, tab, mode, neuPreset, previewBg, shape, boxW, boxH, boxRadius, boxColor]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Reset ────────────────────────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    setLayers([
      createLayer({ offsetX: 0, offsetY: 4, blur: 6, spread: -1, color: '#000000', opacity: 20 }),
      createLayer({ offsetX: 0, offsetY: 10, blur: 15, spread: -3, color: '#000000', opacity: 15 }),
    ]);
    setActiveIdx(0);
    setTab(DEFAULTS.tab);
    setMode(DEFAULTS.mode);
    setNeuPreset(DEFAULTS.neuPreset);
    setPreviewBg(DEFAULTS.previewBg);
    setShape(DEFAULTS.shape);
    setBoxW(DEFAULTS.boxW);
    setBoxH(DEFAULTS.boxH);
    setBoxRadius(DEFAULTS.boxRadius);
    setBoxColor(DEFAULTS.boxColor);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSaveState('idle');
  }, []);

  const updateLayer = useCallback((prop, value) => {
    setLayers(prev => prev.map((l, i) => i === activeIdx ? { ...l, [prop]: value } : l));
  }, [activeIdx]);

  const addLayer = () => {
    const newLayer = createLayer();
    setLayers(prev => [...prev, newLayer]);
    setActiveIdx(layers.length);
  };

  const removeLayer = (idx) => {
    setLayers(prev => {
      const next = prev.filter((_, i) => i !== idx);
      return next;
    });
    setActiveIdx(prev => {
      if (prev >= layers.length - 1) return Math.max(0, layers.length - 2);
      return prev;
    });
  };

  const toggleLayer = (idx) => {
    setLayers(prev => prev.map((l, i) => i === idx ? { ...l, enabled: !l.enabled } : l));
  };

  const applyNeuPreset = (preset) => {
    setNeuPreset(preset);
    const base = NEU_PRESETS[preset];
    setLayers(base.map(l => ({ ...l, id: mkId() })));
    setActiveIdx(0);
    setBoxColor('#e8e4f0');
  };

  const switchMode = (m) => {
    setMode(m);
    if (m === 'neu') {
      applyNeuPreset('flat');
      setPreviewBg('#e8e4f0');
    } else {
      setPreviewBg('#ffffff');
    }
  };

  const setCircle = () => {
    setShape('circle');
    setBoxRadius(150);
  };

  const setRect = () => {
    setShape('square');
  };

  const getCode = () => {
    if (tab === 'css') return `box-shadow: ${shadowMultiline};`;
    if (tab === 'tailwind') {
      const safe = shadowInline.replace(/"/g, '\\"');
      return `/* tailwind.config.js */\nmodule.exports = {\n  theme: {\n    extend: {\n      boxShadow: {\n        'custom': '${safe}',\n      },\n    },\n  },\n};\n\n/* Usage */\n<div class="shadow-custom">...</div>`;
    }
    if (tab === 'js') return `// React style object\nconst styles = {\n  boxShadow: '${shadowInline}'\n};\n\n// Usage\n<div style={styles}>...</div>`;
    if (tab === 'scss') return `// SCSS variable\n$shadow-custom: ${shadowInline};\n\n// Mixin\n@mixin custom-shadow {\n  box-shadow: $shadow-custom;\n}\n\n// Usage\n.element {\n  @include custom-shadow;\n}`;
    return '';
  };

  // Fork to My Code: the preview box with the shadow you built, on the preview background
  const forkSnippet = () => ({
    name: 'Box Shadow',
    html: '<div class="card">Box shadow</div>',
    css: `${CENTER_PAGE_CSS.replace('background: #f1f5f9;', `background: ${previewBg};`)}

.card {
  width: ${boxW}px;
  height: ${boxH}px;
  display: grid;
  place-items: center;
  border-radius: ${boxRadius}px;
  background: ${boxColor};
  color: #475569;
  font-weight: 600;
  /* The shadow you built */
  box-shadow: ${shadowMultiline.split('\n').join('\n  ')};
}`,
  });

  const copyCode = () => {
    navigator.clipboard.writeText(getCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const previewStyle = {
    width: boxW + 'px',
    height: boxH + 'px',
    borderRadius: shape === 'circle' ? '50%' : boxRadius + 'px',
    background: mode === 'neu' ? '#e8e4f0' : boxColor,
    boxShadow: shadowInline,
    transition: 'all 0.25s ease',
  };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="box-shadow-generator" />

      <div className={styles.layout}>
        {/* Sidebar: title, save state and Reset on top, then the controls */}
        <aside className={styles.sidebar}>
          <div className={styles.toolHeader}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="10" height="10" rx="2" fill="currentColor" opacity="0.9"/>
                  <rect x="5" y="5" width="10" height="10" rx="2" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              <span>Box Shadow <span className={styles.logoAccent}>Generator</span></span>
            </div>
            <div className={styles.headerActions}>
              <span className={`${styles.saveIndicator} ${saveState === 'saving' ? styles.saveIndicatorSaving : saveState === 'saved' ? styles.saveIndicatorSaved : ''}`}>
                <span className={styles.saveDot} />
                {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Auto-saved'}
              </span>
              <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
            </div>
          </div>
          <div className={styles.forkRow}><ForkToMyCodeButton getSnippet={forkSnippet} /></div>

          {/* Mode toggle — top of sidebar */}
          <div className={styles.section}>
            <div className={styles.modeToggle}>
              <button className={mode === 'normal' ? styles.modeActive : styles.modeBtn} onClick={() => switchMode('normal')}>Normal</button>
              <button className={mode === 'neu' ? styles.modeActive : styles.modeBtn} onClick={() => switchMode('neu')}>Neumorphism</button>
            </div>
          </div>

          {/* Neumorphism presets */}
          {mode === 'neu' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Presets</div>
              <div className={styles.neuGrid}>
                {Object.keys(NEU_PRESETS).map(p => (
                  <button key={p} className={`${styles.neuPreset} ${neuPreset === p ? styles.neuPresetActive : ''}`} onClick={() => applyNeuPreset(p)}>
                    <div className={styles.neuIcon} />
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Layers */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Shadow Layers</div>
            <div className={styles.layersList}>
              {layers.map((l, i) => (
                <div key={l.id}
                  className={`${styles.layerItem} ${i === activeIdx ? styles.layerActive : ''} ${!l.enabled ? styles.layerDisabled : ''}`}
                  onClick={() => setActiveIdx(i)}>
                  <div className={styles.layerSwatch} style={{ background: hexToRgba(l.color, l.opacity / 100) }} />
                  <span className={styles.layerLabel}>{l.inset ? '↙ ' : ''}{l.offsetX}px {l.offsetY}px {l.blur}px {l.spread}px</span>
                  <button className={styles.layerToggle} onClick={e => { e.stopPropagation(); toggleLayer(i); }} title={l.enabled ? 'Hide' : 'Show'}>{l.enabled ? '◉' : '○'}</button>
                  <button className={styles.layerDelete} onClick={e => { e.stopPropagation(); removeLayer(i); }} title="Delete">✕</button>
                </div>
              ))}
            </div>
            <button className={styles.addLayerBtn} onClick={addLayer}>+ Add Layer</button>
          </div>

          {/* Active layer controls */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Layer Properties</div>
            {activeLayer ? (
              <div>
                <div className={styles.controlRow}>
                  <SliderNum label="Offset X" min={-60} max={60} value={activeLayer.offsetX} onChange={v => updateLayer('offsetX', v)} />
                  <SliderNum label="Offset Y" min={-60} max={60} value={activeLayer.offsetY} onChange={v => updateLayer('offsetY', v)} />
                </div>
                <div className={styles.controlRow}>
                  <SliderNum label="Blur" min={0} max={100} value={activeLayer.blur} onChange={v => updateLayer('blur', v)} />
                  <SliderNum label="Spread" min={-30} max={60} value={activeLayer.spread} onChange={v => updateLayer('spread', v)} />
                </div>
                <div className={`${styles.controlRow} ${styles.full}`}>
                  <div className={styles.controlGroup}>
                    <span className={styles.controlLabel}>Color</span>
                    <div className={styles.colorRow}>
                      <input type="color" className={styles.colorPicker} value={activeLayer.color}
                        onChange={e => updateLayer('color', e.target.value)} />
                      <input type="text" className={styles.hexInput} value={activeLayer.color} maxLength={7}
                        onChange={e => { if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e.target.value)) updateLayer('color', e.target.value); }} />
                    </div>
                  </div>
                </div>
                <div className={`${styles.controlRow} ${styles.full}`}>
                  <div className={styles.controlGroup}>
                    <span className={styles.controlLabel}>Opacity <span className={styles.accentVal}>{activeLayer.opacity}%</span></span>
                    <input type="range" min={0} max={100} value={activeLayer.opacity}
                      onChange={e => updateLayer('opacity', parseInt(e.target.value))} />
                  </div>
                </div>
                <div className={styles.insetRow}>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" checked={activeLayer.inset} onChange={e => updateLayer('inset', e.target.checked)} />
                    <span className={styles.toggleSlider} />
                  </label>
                  <span className={styles.toggleLabel}>Inset shadow</span>
                </div>
              </div>
            ) : (
              <div className={styles.noLayer}>Select a layer to edit</div>
            )}
          </div>

          {/* Box options */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Box Options</div>
            <div className={styles.controlRow}>
              <SliderNum label="Width" min={60} max={300} value={boxW} onChange={setBoxW} />
              <SliderNum label="Height" min={60} max={300} value={boxH} onChange={setBoxH} />
            </div>
            <div className={`${styles.controlRow} ${styles.full}`}>
              <SliderNum label="Border Radius" min={0} max={150} value={boxRadius} onChange={setBoxRadius} />
            </div>
          </div>

        </aside>

        {/* Main area */}
        <main className={styles.main}>
          {/* Leaderboard ad (max 90px) at the top of the right panel */}
          <PlaygroundTopAd />

          {/* Preview toolbar */}
          <div className={styles.previewToolbar}>
            <span className={styles.previewLabel}>Background</span>
            <div className={styles.bgSwatches}>
              {BG_SWATCHES.map(c => (
                <div key={c} className={`${styles.bgSwatch} ${previewBg === c ? styles.bgSwatchActive : ''}`}
                  style={{ background: c }} onClick={() => setPreviewBg(c)} />
              ))}
              <label className={`${styles.bgSwatch} ${styles.bgSwatchPicker} ${!BG_SWATCHES.includes(previewBg) ? styles.bgSwatchActive : ''}`}
                style={{ background: previewBg }} title="Custom background color">
                <input type="color" value={previewBg} onChange={e => setPreviewBg(e.target.value)} className={styles.hiddenColorInput} />
                {BG_SWATCHES.includes(previewBg) && <span className={styles.pickerPlus}>+</span>}
              </label>
            </div>
            <div className={styles.toolbarDivider} />
            <span className={styles.previewLabel}>Box Color</span>
            <label className={`${styles.bgSwatch} ${styles.bgSwatchPicker}`} style={{ background: boxColor }} title="Box color">
              <input type="color" value={boxColor} onChange={e => setBoxColor(e.target.value)} className={styles.hiddenColorInput} />
            </label>
            <input type="text" className={styles.toolbarHexInput} value={boxColor} maxLength={7}
              onChange={e => { if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e.target.value)) setBoxColor(e.target.value); }} />
            <div className={styles.shapeBtns}>
              <button className={`${styles.shapeBtn} ${shape === 'square' ? styles.shapeBtnActive : ''}`} onClick={setRect}>■ Rect</button>
              <button className={`${styles.shapeBtn} ${shape === 'circle' ? styles.shapeBtnActive : ''}`} onClick={setCircle}>● Circle</button>
            </div>
          </div>

          {/* Preview area */}
          <div className={styles.previewArea} style={{ background: mode === 'neu' ? '#e8e4f0' : previewBg }}>
            <div className={styles.previewBoxWrapper}>
              <div style={previewStyle} />
            </div>
          </div>

          {/* Output */}
          <div className={styles.outputArea}>
            <div className={styles.outputTabs}>
              {['css', 'tailwind', 'js', 'scss'].map(t => (
                <button key={t} className={`${styles.outTab} ${tab === t ? styles.outTabActive : ''}`} onClick={() => setTab(t)}>
                  {t === 'js' ? 'JS Object' : t === 'scss' ? 'SCSS Var' : t.toUpperCase()}
                </button>
              ))}
            </div>
            <div className={styles.outputContent}>
              <div className={styles.codeWrap}>
                <pre className={styles.codeBlock}>{getCode()}</pre>
                <button className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`} onClick={copyCode}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SliderNum({ label, min, max, value, onChange }) {
  return (
    <div className={styles.controlGroup}>
      <div className={styles.controlLabelRow}>
        <span className={styles.controlLabel}>{label}</span>
        <input type="number" className={styles.numInput} value={value} min={min} max={max}
          onChange={e => onChange(parseFloat(e.target.value))} />
      </div>
      <input type="range" className={styles.rangeInput} min={min} max={max} value={value}
        onChange={e => onChange(parseFloat(e.target.value))} />
    </div>
  );
}
