'use client';

import { useState, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ── Math ─────────────────────────────────────────────────────── */
function f(n, d = 4) { return parseFloat(n.toFixed(d)); }

function sizeAtStep(basePx, ratio, step) {
  return step >= 0 ? basePx * Math.pow(ratio, step) : basePx / Math.pow(ratio, -step);
}

function buildClamp(minPx, maxPx, minVwPx, maxVwPx, rootPx, unit) {
  if (minVwPx >= maxVwPx || minPx === maxPx) {
    return unit === 'rem' ? `${f(minPx / rootPx)}rem` : `${f(minPx, 2)}px`;
  }
  const slope    = (maxPx - minPx) / (maxVwPx - minVwPx);
  const intPx    = minPx - slope * minVwPx;
  const vwCoeff  = slope * 100;

  if (unit === 'rem') {
    const mn  = f(minPx / rootPx);
    const mx  = f(maxPx / rootPx);
    const ic  = f(intPx / rootPx);
    const vw  = f(vwCoeff);
    const mid = `${ic}rem + ${vw}vw`;
    return `clamp(${mn}rem, ${mid}, ${mx}rem)`;
  }
  const mn  = f(minPx, 2);
  const mx  = f(maxPx, 2);
  const ic  = f(intPx, 2);
  const vw  = f(vwCoeff);
  const mid = `${ic}px + ${vw}vw`;
  return `clamp(${mn}px, ${mid}, ${mx}px)`;
}

function sizeAtVw(minPx, maxPx, minVwPx, maxVwPx, vwPx) {
  if (minVwPx >= maxVwPx) return minPx;
  const slope = (maxPx - minPx) / (maxVwPx - minVwPx);
  const intPx = minPx - slope * minVwPx;
  return Math.max(minPx, Math.min(maxPx, intPx + slope * vwPx));
}

/* ── Data ─────────────────────────────────────────────────────── */
const STEPS = [
  { name: 'xs',   step: -2, sample: 'The quick brown fox jumps over the lazy dog and the clever cat sat quietly.' },
  { name: 'sm',   step: -1, sample: 'The quick brown fox jumps over the lazy dog and the fence.' },
  { name: 'base', step:  0, sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'lg',   step:  1, sample: 'The quick brown fox jumps over the fence.' },
  { name: 'xl',   step:  2, sample: 'The quick brown fox jumps high.' },
  { name: '2xl',  step:  3, sample: 'Fluid Typography Scale' },
  { name: '3xl',  step:  4, sample: 'Fluid Type Scale' },
  { name: '4xl',  step:  5, sample: 'Fluid Type' },
];

const RATIOS = [
  { label: 'Minor Third — 1.2',       value: 1.2   },
  { label: 'Major Third — 1.25',      value: 1.25  },
  { label: 'Perfect Fourth — 1.333',  value: 1.333 },
  { label: 'Aug. Fourth — 1.414',     value: 1.414 },
  { label: 'Perfect Fifth — 1.5',     value: 1.5   },
  { label: 'Golden Ratio — 1.618',    value: 1.618 },
  { label: 'Custom',                  value: 0     },
];

const DEFAULTS = { minVw: 360, maxVw: 1440, minBase: 16, maxBase: 20, rootPx: 16, ratio: 1.25, unit: 'rem', previewVw: 768, customRatio: 1.25 };

/* ── Code renderers ─────────────────────────────────────────────── */
function renderCss(lines) {
  return (
    <>
      <span className={styles.cKey}>{':root'}</span>
      <span className={styles.cPunct}>{' {\n'}</span>
      {lines.map(({ name, clampStr }) => (
        <span key={name}>
          {'  '}
          <span className={styles.cProp}>{`--text-${name}`}</span>
          <span className={styles.cPunct}>{': '}</span>
          <span className={styles.cVal}>{clampStr}</span>
          <span className={styles.cPunct}>{';\n'}</span>
        </span>
      ))}
      <span className={styles.cPunct}>{'}'}</span>
    </>
  );
}

function renderTailwind(lines) {
  const header = `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontSize: {\n`;
  const footer = `\n      },\n    },\n  },\n};`;
  return (
    <>
      <span className={styles.cPunct}>{header}</span>
      {lines.map(({ name, clampStr }) => (
        <span key={name}>
          {'        '}
          <span className={styles.cStr}>{`'${name}'`}</span>
          <span className={styles.cPunct}>{': '}</span>
          <span className={styles.cStr}>{`'${clampStr}'`}</span>
          <span className={styles.cPunct}>{',' + '\n'}</span>
        </span>
      ))}
      <span className={styles.cPunct}>{footer}</span>
    </>
  );
}

function renderScss(lines) {
  return lines.map(({ name, clampStr }) => (
    <span key={name}>
      <span className={styles.cProp}>{`$text-${name}`}</span>
      <span className={styles.cPunct}>{': '}</span>
      <span className={styles.cVal}>{clampStr}</span>
      <span className={styles.cPunct}>{';\n'}</span>
    </span>
  ));
}

/* ── Main component ─────────────────────────────────────────────── */
export default function CssClampGeneratorTool() {
  const [minVw,      setMinVw]      = useState(DEFAULTS.minVw);
  const [maxVw,      setMaxVw]      = useState(DEFAULTS.maxVw);
  const [minBase,    setMinBase]    = useState(DEFAULTS.minBase);
  const [maxBase,    setMaxBase]    = useState(DEFAULTS.maxBase);
  const [rootPx,     setRootPx]     = useState(DEFAULTS.rootPx);
  const [ratio,      setRatio]      = useState(DEFAULTS.ratio);
  const [customRatio, setCustomRatio] = useState(DEFAULTS.customRatio);
  const [unit,       setUnit]       = useState(DEFAULTS.unit);
  const [previewVw,  setPreviewVw]  = useState(DEFAULTS.previewVw);
  const [tab,        setTab]        = useState('css');
  const [copied,     setCopied]     = useState(false);
  const [activeStep, setActiveStep] = useState('base');

  const effectiveRatio = ratio === 0 ? customRatio : ratio;

  const scales = useMemo(() => {
    return STEPS.map(({ name, step, sample }) => {
      const minPx = sizeAtStep(minBase, effectiveRatio, step);
      const maxPx = sizeAtStep(maxBase, effectiveRatio, step);
      const clampStr  = buildClamp(minPx, maxPx, minVw, maxVw, rootPx, unit);
      const currentPx = sizeAtVw(minPx, maxPx, minVw, maxVw, previewVw);
      return { name, step, minPx, maxPx, clampStr, currentPx, sample };
    });
  }, [minBase, maxBase, minVw, maxVw, rootPx, effectiveRatio, unit, previewVw]);

  const outputText = useMemo(() => {
    if (tab === 'css') {
      return `:root {\n${scales.map(s => `  --text-${s.name}: ${s.clampStr};`).join('\n')}\n}`;
    }
    if (tab === 'tailwind') {
      const inner = scales.map(s => `        '${s.name}': '${s.clampStr}',`).join('\n');
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontSize: {\n${inner}\n      },\n    },\n  },\n};`;
    }
    return scales.map(s => `$text-${s.name}: ${s.clampStr};`).join('\n');
  }, [scales, tab]);

  /* Formula for active step */
  const formula = useMemo(() => {
    const s = scales.find(x => x.name === activeStep);
    if (!s || minVw >= maxVw) return null;
    const slope   = (s.maxPx - s.minPx) / (maxVw - minVw);
    const intPx   = s.minPx - slope * minVw;
    const vwCoeff = slope * 100;
    return {
      minPx:  f(s.minPx, 2),
      maxPx:  f(s.maxPx, 2),
      slope:  f(slope, 6),
      intPx:  f(intPx, 3),
      vwC:    f(vwCoeff, 4),
      result: s.clampStr,
    };
  }, [scales, activeStep, minVw, maxVw]);

  function copy() {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function reset() {
    setMinVw(DEFAULTS.minVw); setMaxVw(DEFAULTS.maxVw);
    setMinBase(DEFAULTS.minBase); setMaxBase(DEFAULTS.maxBase);
    setRootPx(DEFAULTS.rootPx); setRatio(DEFAULTS.ratio);
    setCustomRatio(DEFAULTS.customRatio); setUnit(DEFAULTS.unit);
    setPreviewVw(DEFAULTS.previewVw);
  }

  const clampedPreviewVw = Math.min(maxVw, Math.max(minVw, previewVw));
  const vpPercent = maxVw > minVw ? ((clampedPreviewVw - minVw) / (maxVw - minVw)) * 100 : 0;

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-clamp-generator" />
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <line x1="3" y1="24" x2="8" y2="24" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
            <line x1="8" y1="24" x2="24" y2="9"  stroke="#4ade9e" strokeWidth="3" strokeLinecap="round"/>
            <line x1="24" y1="9" x2="29" y2="9"  stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>
          CSS <strong className={styles.accent}>clamp()</strong> <span className={styles.accentGreen}>Generator</span>
        </span>
        <div className={styles.sep} />
        <span className={styles.headerSub}>
          {minBase}px → {maxBase}px · ratio {f(effectiveRatio, 3)} · {minVw}px–{maxVw}px
        </span>
        <div className={styles.headerActions}>
          <button className={styles.resetBtn} onClick={reset}>Reset</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* ── Controls ── */}
        <div className={styles.controls}>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Viewport Range</div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Min viewport</span>
                <div className={styles.valWrap}>
                  <input type="number" className={styles.numInput}
                    value={minVw} min={240} max={maxVw - 1} step={10}
                    onChange={e => { const v = Number(e.target.value); setMinVw(v); if (previewVw < v) setPreviewVw(v); }} />
                  <span className={styles.unitLabel}>px</span>
                </div>
              </div>
              <input type="range" className={styles.slider}
                value={minVw} min={240} max={maxVw - 1} step={10}
                onChange={e => { const v = Number(e.target.value); setMinVw(v); if (previewVw < v) setPreviewVw(v); }} />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Max viewport</span>
                <div className={styles.valWrap}>
                  <input type="number" className={styles.numInput}
                    value={maxVw} min={minVw + 1} max={2560} step={10}
                    onChange={e => { const v = Number(e.target.value); setMaxVw(v); if (previewVw > v) setPreviewVw(v); }} />
                  <span className={styles.unitLabel}>px</span>
                </div>
              </div>
              <input type="range" className={styles.slider}
                value={maxVw} min={minVw + 1} max={2560} step={10}
                onChange={e => { const v = Number(e.target.value); setMaxVw(v); if (previewVw > v) setPreviewVw(v); }} />
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Base Font Size</div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Min (at {minVw}px)</span>
                <div className={styles.valWrap}>
                  <input type="number" className={styles.numInput}
                    value={minBase} min={8} max={maxBase} step={0.5}
                    onChange={e => setMinBase(Number(e.target.value))} />
                  <span className={styles.unitLabel}>px</span>
                </div>
              </div>
              <input type="range" className={styles.slider}
                value={minBase} min={8} max={maxBase} step={0.5}
                onChange={e => setMinBase(Number(e.target.value))} />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Max (at {maxVw}px)</span>
                <div className={styles.valWrap}>
                  <input type="number" className={styles.numInput}
                    value={maxBase} min={minBase} max={40} step={0.5}
                    onChange={e => setMaxBase(Number(e.target.value))} />
                  <span className={styles.unitLabel}>px</span>
                </div>
              </div>
              <input type="range" className={styles.slider}
                value={maxBase} min={minBase} max={40} step={0.5}
                onChange={e => setMaxBase(Number(e.target.value))} />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Root font size</span>
                <div className={styles.valWrap}>
                  <input type="number" className={styles.numInput}
                    value={rootPx} min={10} max={24} step={1}
                    onChange={e => setRootPx(Number(e.target.value))} />
                  <span className={styles.unitLabel}>px</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Type Scale</div>

            <select className={styles.ratioSelect}
              value={ratio}
              onChange={e => setRatio(Number(e.target.value))}>
              {RATIOS.map(r => (
                <option key={r.label} value={r.value}>{r.label}</option>
              ))}
            </select>

            {ratio === 0 && (
              <div className={styles.customRatioRow}>
                <span className={styles.label}>Custom ratio</span>
                <input type="number" className={styles.customRatioInput}
                  value={customRatio} min={1.01} max={3} step={0.001}
                  onChange={e => setCustomRatio(Math.max(1.001, Number(e.target.value)))} />
              </div>
            )}

            <div className={styles.labelRow} style={{ marginTop: 14 }}>
              <span className={styles.label}>Output unit</span>
              <div className={styles.unitToggle}>
                <button className={`${styles.unitBtn} ${unit === 'rem' ? styles.unitBtnActive : ''}`}
                  onClick={() => setUnit('rem')}>rem</button>
                <button className={`${styles.unitBtn} ${unit === 'px' ? styles.unitBtnActive : ''}`}
                  onClick={() => setUnit('px')}>px</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className={styles.previewPane}>
          <div className={styles.vpBar}>
            <span className={styles.vpBarLabel}>Viewport</span>
            <input type="range" className={styles.vpSlider}
              value={clampedPreviewVw}
              min={minVw} max={maxVw} step={1}
              onChange={e => setPreviewVw(Number(e.target.value))} />
            <div className={styles.vpDisplay}>
              <div className={styles.vpPx}>{clampedPreviewVw}px</div>
              <div className={styles.vpRange}>{minVw}px — {maxVw}px</div>
            </div>
          </div>

          <div className={styles.previewBody}>
            {scales.map(s => (
              <div
                key={s.name}
                className={`${styles.sizeRow} ${activeStep === s.name ? styles.sizeRowActive : ''}`}
                onClick={() => setActiveStep(s.name)}
              >
                <span className={styles.sizeName}>{s.name}</span>
                <span
                  className={styles.sizeText}
                  style={{ fontSize: `${s.currentPx}px` }}
                >
                  {s.sample}
                </span>
                <span className={styles.sizePxBadge}>{f(s.currentPx, 1)}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Output ── */}
        <div className={styles.outputPane}>
          <div className={styles.tabs}>
            {[['css','CSS Vars'], ['tailwind','Tailwind'], ['scss','SCSS']].map(([id, label]) => (
              <button key={id}
                className={`${styles.tab} ${tab === id ? styles.tabActive : ''}`}
                onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </div>

          <div className={styles.outputBody}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>
                {tab === 'css' ? 'css' : tab === 'tailwind' ? 'js' : 'scss'}
              </span>
              <button
                className={`${styles.codeCopyBtn} ${copied ? styles.codeCopyBtnCopied : ''}`}
                onClick={copy}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <div className={styles.codeScroll}>
              <pre className={styles.codeBlock}>
                {tab === 'css'      && renderCss(scales)}
                {tab === 'tailwind' && renderTailwind(scales)}
                {tab === 'scss'     && renderScss(scales)}
              </pre>
            </div>

            {/* ── Formula explainer ── */}
            <div className={styles.formulaSection}>
              <div className={styles.formulaHeader}>
                <span className={styles.formulaTitle}>Formula</span>
                <span className={styles.formulaStepLabel}>--text-{activeStep}</span>
              </div>
              {formula ? (
                <div className={styles.formulaMath}>
                  <span className={styles.formulaDim}>{'slope  = ('}</span>
                  <span className={styles.formulaHighlight}>{formula.maxPx}px</span>
                  <span className={styles.formulaDim}>{' − '}</span>
                  <span className={styles.formulaHighlight}>{formula.minPx}px</span>
                  <span className={styles.formulaDim}>{') ÷ ('}</span>
                  <span>{maxVw}px − {minVw}px</span>
                  <span className={styles.formulaDim}>{')\n'}</span>

                  <span className={styles.formulaDim}>{'       = '}</span>
                  <span className={styles.formulaHighlight}>{formula.slope}</span>
                  <span className={styles.formulaDim}>{'\n'}</span>

                  <span className={styles.formulaDim}>{'offset = '}</span>
                  <span>{formula.minPx}px − ({formula.slope} × {minVw}px)</span>
                  <span className={styles.formulaDim}>{'\n'}</span>

                  <span className={styles.formulaDim}>{'       = '}</span>
                  <span className={styles.formulaHighlight}>{formula.intPx}{unit === 'rem' ? `px (${f(formula.intPx / rootPx, 4)}rem)` : 'px'}</span>
                  <span className={styles.formulaDim}>{'\n→ '}</span>
                  <span className={styles.formulaHighlight}>{formula.result}</span>
                </div>
              ) : (
                <div className={styles.formulaMath}>
                  <span className={styles.formulaDim}>Click a size row to see its formula.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
