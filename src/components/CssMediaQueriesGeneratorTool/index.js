'use client';
import { useState, useMemo } from 'react';
import s from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ── Constants ──────────────────────────────────────────────── */

const PRESETS = {
  bootstrap: [
    { id: 'b1', name: 'xs',  val: 0    },
    { id: 'b2', name: 'sm',  val: 576  },
    { id: 'b3', name: 'md',  val: 768  },
    { id: 'b4', name: 'lg',  val: 992  },
    { id: 'b5', name: 'xl',  val: 1200 },
    { id: 'b6', name: 'xxl', val: 1400 },
  ],
  tailwind: [
    { id: 't1', name: 'sm',  val: 640  },
    { id: 't2', name: 'md',  val: 768  },
    { id: 't3', name: 'lg',  val: 1024 },
    { id: 't4', name: 'xl',  val: 1280 },
    { id: 't5', name: '2xl', val: 1536 },
  ],
  mui: [
    { id: 'm1', name: 'xs', val: 0    },
    { id: 'm2', name: 'sm', val: 600  },
    { id: 'm3', name: 'md', val: 900  },
    { id: 'm4', name: 'lg', val: 1200 },
    { id: 'm5', name: 'xl', val: 1536 },
  ],
};

const FEATURES = [
  { id: 'dark',     label: 'Dark Mode',       icon: '🌙', query: '(prefers-color-scheme: dark)',     scss: 'dark-mode',      js: 'dark',          tw: 'dark',          twRaw: '(prefers-color-scheme: dark)'     },
  { id: 'light',    label: 'Light Mode',       icon: '☀️', query: '(prefers-color-scheme: light)',    scss: 'light-mode',     js: 'light',         tw: 'light',         twRaw: '(prefers-color-scheme: light)'    },
  { id: 'motion',   label: 'Reduced Motion',   icon: '♿', query: '(prefers-reduced-motion: reduce)', scss: 'reduced-motion', js: 'reducedMotion', tw: 'motion-reduce', twRaw: '(prefers-reduced-motion: reduce)' },
  { id: 'contrast', label: 'High Contrast',    icon: '◑',  query: '(prefers-contrast: more)',         scss: 'high-contrast',  js: 'highContrast',  tw: 'contrast-more', twRaw: '(prefers-contrast: more)'         },
  { id: 'print',    label: 'Print',            icon: '🖨️', query: 'print', printType: true,           scss: 'print',          js: 'print',         tw: 'print',         twRaw: 'print'                            },
  { id: 'retina',   label: 'Retina / 2×',      icon: '✦',  query: '(min-resolution: 2dppx)',          scss: 'retina',         js: 'retina',        tw: 'retina',        twRaw: '(min-resolution: 2dppx)'          },
  { id: 'portrait', label: 'Portrait',         icon: '⬜', query: '(orientation: portrait)',          scss: 'portrait',       js: 'portrait',      tw: 'portrait',      twRaw: '(orientation: portrait)'          },
  { id: 'landscape',label: 'Landscape',        icon: '⬛', query: '(orientation: landscape)',         scss: 'landscape',      js: 'landscape',     tw: 'landscape',     twRaw: '(orientation: landscape)'         },
  { id: 'touch',    label: 'Touch (coarse)',    icon: '👆', query: '(pointer: coarse)',                scss: 'touch',          js: 'touch',         tw: 'touch',         twRaw: '(pointer: coarse)'                },
  { id: 'noHover',  label: 'No Hover',          icon: '✋', query: '(hover: none)',                    scss: 'no-hover',       js: 'noHover',       tw: 'no-hover',      twRaw: '(hover: none)'                    },
];

const CODE_TABS = ['CSS', 'SCSS', 'Tailwind', 'JS'];
const PRESET_LABELS = { bootstrap: 'Bootstrap 5', tailwind: 'Tailwind CSS', mui: 'Material UI' };

let _id = 20;
const uid = () => `c${++_id}`;
const clonePreset = key => PRESETS[key].map(b => ({ ...b, id: uid() }));
const padEnd = (str, len) => str + ' '.repeat(Math.max(0, len - str.length));

/* ── Code Generators ────────────────────────────────────────── */

function mqStr(val, dir, syn) {
  if (dir === 'min') return syn === 'modern' ? `(width >= ${val}px)` : `(min-width: ${val}px)`;
  return syn === 'modern' ? `(width <= ${val}px)` : `(max-width: ${val}px)`;
}

function genCSS({ breakpoints, direction, syntax, showRange, features }) {
  const sorted = [...breakpoints].sort((a, b) => a.val - b.val);
  const activeFeat = FEATURES.filter(f => features.has(f.id));
  const out = [];

  const dirLabel = direction === 'min' ? 'min-width · mobile-first' : 'max-width · desktop-first';
  out.push(`/* ─── Breakpoints (${dirLabel}) ─────────────────── */`);
  out.push('');

  for (const bp of sorted) {
    if (direction === 'min' && bp.val === 0) {
      out.push(`/* ${bp.name} — default (no query needed; applies to all sizes) */`);
      out.push('');
      continue;
    }
    const hint = direction === 'min' ? `${bp.val}px and up` : `${bp.val}px and below`;
    out.push(`/* ${bp.name} — ${hint} */`);
    out.push(`@media ${mqStr(bp.val, direction, syntax)} {`);
    out.push('');
    out.push('}');
    out.push('');
  }

  if (showRange && sorted.length >= 2) {
    out.push(`/* ─── Range Queries (single-breakpoint targeting) ───────────── */`);
    out.push('');
    for (let i = 0; i < sorted.length; i++) {
      const curr = sorted[i], next = sorted[i + 1];
      if (!next) continue;
      let q, note;
      if (curr.val === 0) {
        q = syntax === 'modern' ? `(width < ${next.val}px)` : `(max-width: ${next.val - 1}px)`;
        note = `0 – ${next.val - 1}px`;
      } else {
        q = syntax === 'modern'
          ? `(${curr.val}px <= width < ${next.val}px)`
          : `(min-width: ${curr.val}px) and (max-width: ${next.val - 1}px)`;
        note = `${curr.val}px – ${next.val - 1}px`;
      }
      out.push(`/* ${curr.name} only (${note}) */`);
      out.push(`@media ${q} {`);
      out.push('');
      out.push('}');
      out.push('');
    }
  }

  if (activeFeat.length) {
    out.push(`/* ─── Feature Queries ─────────────────────────────────────────── */`);
    out.push('');
    for (const f of activeFeat) {
      out.push(`/* ${f.label} */`);
      out.push(`@media ${f.printType ? 'print' : f.query} {`);
      out.push('');
      out.push('}');
      out.push('');
    }
  }

  return out.join('\n');
}

function genSCSS({ breakpoints, direction, showRange, features }) {
  const sorted = [...breakpoints].sort((a, b) => a.val - b.val);
  const withVal = sorted.filter(b => !(direction === 'min' && b.val === 0));
  const activeFeat = FEATURES.filter(f => features.has(f.id));
  const out = [];

  // Alignment widths
  const maxVarDecl = withVal.length ? Math.max(...withVal.map(b => `$bp-${b.name}:`.length)) : 6;
  const maxMixDecl = withVal.length ? Math.max(...withVal.map(b => `bp-${b.name}`.length)) : 4;
  const maxFeatDecl = activeFeat.length ? Math.max(...activeFeat.map(f => f.scss.length)) : 4;

  out.push(`// ─── Breakpoint Variables ────────────────────────────────────`);
  out.push('');
  for (const bp of withVal) {
    const decl = `$bp-${bp.name}:`;
    out.push(`${padEnd(decl, maxVarDecl + 1)}${bp.val}px;`);
  }
  out.push('');

  out.push(`// ─── Breakpoint Mixins ───────────────────────────────────────`);
  out.push('');
  for (const bp of withVal) {
    const mq = direction === 'min' ? `(min-width: $bp-${bp.name})` : `(max-width: $bp-${bp.name})`;
    const name = `bp-${bp.name}`;
    out.push(`@mixin ${padEnd(name, maxMixDecl)} { @media ${mq} { @content; } }`);
  }
  out.push('');

  if (showRange && sorted.length >= 2) {
    out.push(`// ─── Range Mixins ────────────────────────────────────────────`);
    out.push('');
    for (let i = 0; i < sorted.length; i++) {
      const curr = sorted[i], next = sorted[i + 1];
      if (!next) continue;
      let mq;
      if (curr.val === 0) {
        mq = `(max-width: $bp-${next.name} - 1px)`;
      } else {
        mq = `(min-width: $bp-${curr.name}) and (max-width: $bp-${next.name} - 1px)`;
      }
      out.push(`@mixin bp-${curr.name}-only { @media ${mq} { @content; } }`);
    }
    out.push('');
  }

  if (activeFeat.length) {
    out.push(`// ─── Feature Query Mixins ────────────────────────────────────`);
    out.push('');
    for (const f of activeFeat) {
      const mq = f.printType ? 'print' : f.query;
      out.push(`@mixin ${padEnd(f.scss, maxFeatDecl)} { @media ${mq} { @content; } }`);
    }
    out.push('');
  }

  out.push(`// ─── Usage ───────────────────────────────────────────────────`);
  out.push('');
  out.push(`// .element {`);
  out.push(`//   font-size: 14px;`);
  if (withVal[0]) out.push(`//   @include bp-${withVal[0].name} { font-size: 16px; }`);
  if (activeFeat[0]) out.push(`//   @include ${activeFeat[0].scss} { color: #f0f0f0; }`);
  out.push(`// }`);

  return out.join('\n');
}

function genTailwind({ breakpoints, direction, features }) {
  const sorted = [...breakpoints].sort((a, b) => a.val - b.val).filter(b => b.val > 0);
  const activeFeat = FEATURES.filter(f => features.has(f.id));

  const allKeys = [...sorted.map(b => `'${b.name}'`), ...activeFeat.map(f => `'${f.tw}'`)];
  const maxLen = allKeys.length ? Math.max(...allKeys.map(n => n.length)) : 4;

  const out = [];
  out.push(`/** @type {import('tailwindcss').Config} */`);
  out.push(`module.exports = {`);
  out.push(`  theme: {`);
  out.push(`    screens: {`);

  const bpList = direction === 'max' ? [...sorted].reverse() : sorted;
  for (const bp of bpList) {
    const key = padEnd(`'${bp.name}'`, maxLen);
    const val = direction === 'max' ? `{ max: '${bp.val}px' }` : `'${bp.val}px'`;
    out.push(`      ${key}: ${val},`);
  }

  if (activeFeat.length) {
    out.push(`      // Feature-based screen variants`);
    for (const f of activeFeat) {
      out.push(`      ${padEnd(`'${f.tw}'`, maxLen)}: { raw: '${f.twRaw}' },`);
    }
  }

  out.push(`    },`);
  out.push(`  },`);
  out.push(`};`);
  return out.join('\n');
}

function genJS({ breakpoints, direction, syntax, features }) {
  const sorted = [...breakpoints].sort((a, b) => a.val - b.val);
  const bpsQuery = sorted.filter(b => !(direction === 'min' && b.val === 0));
  const activeFeat = FEATURES.filter(f => features.has(f.id));

  const bpMaxLen = sorted.length ? Math.max(...sorted.map(b => b.name.length)) : 2;
  const mqKeys = [...bpsQuery.map(b => b.name), ...activeFeat.map(f => f.js)];
  const mqMaxLen = mqKeys.length ? Math.max(...mqKeys.map(k => k.length)) : 2;

  const out = [];
  const dirLabel = direction === 'min' ? 'min-width, mobile-first' : 'max-width, desktop-first';

  out.push(`// Breakpoint values in px`);
  out.push(`export const bp = {`);
  for (const b of sorted) {
    out.push(`  ${padEnd(b.name + ':', bpMaxLen + 1)} ${b.val},`);
  }
  out.push(`};`);
  out.push('');

  out.push(`// Media query strings (${dirLabel})`);
  out.push(`export const mq = {`);
  for (const b of bpsQuery) {
    const q = mqStr(b.val, direction, syntax);
    out.push(`  ${padEnd(b.name + ':', mqMaxLen + 1)} '@media ${q}',`);
  }
  if (bpsQuery.length && activeFeat.length) out.push('');
  for (const f of activeFeat) {
    const q = f.printType ? 'print' : f.query;
    out.push(`  ${padEnd(f.js + ':', mqMaxLen + 1)} '@media ${q}',`);
  }
  out.push(`};`);
  out.push('');

  out.push(`// Usage with styled-components / emotion:`);
  out.push(`// const Box = styled.div\``);
  out.push(`//   color: #333;`);
  if (bpsQuery[0]) out.push(`//   \${mq.${bpsQuery[0].name}} { font-size: 18px; }`);
  if (activeFeat[0]) out.push(`//   \${mq.${activeFeat[0].js}} { background: #1a1a1a; }`);
  out.push(`// \`\`;`);

  return out.join('\n');
}

function generateCode(tab, config) {
  try {
    if (tab === 'CSS')      return genCSS(config);
    if (tab === 'SCSS')     return genSCSS(config);
    if (tab === 'Tailwind') return genTailwind(config);
    if (tab === 'JS')       return genJS(config);
    return '';
  } catch (e) { return `/* Error: ${e.message} */`; }
}

/* ── Main Component ─────────────────────────────────────────── */

export default function CssMediaQueriesGeneratorTool() {
  const [preset, setPreset]       = useState('bootstrap');
  const [breakpoints, setBreakpoints] = useState(() => clonePreset('bootstrap'));
  const [direction, setDirection] = useState('min');
  const [syntax, setSyntax]       = useState('traditional');
  const [showRange, setShowRange] = useState(false);
  const [features, setFeatures]   = useState(() => new Set(['dark', 'motion', 'print']));
  const [codeTab, setCodeTab]     = useState('CSS');
  const [copied, setCopied]       = useState(false);

  const applyPreset = key => {
    setPreset(key);
    setBreakpoints(clonePreset(key));
  };

  const updateBp = (id, field, rawVal) => {
    setPreset('custom');
    setBreakpoints(bps => bps.map(b => {
      if (b.id !== id) return b;
      if (field === 'val') {
        const n = parseInt(rawVal, 10);
        return { ...b, val: isNaN(n) ? b.val : Math.max(0, n) };
      }
      return { ...b, [field]: rawVal };
    }));
  };

  const removeBp = id => {
    setBreakpoints(bps => {
      const n = bps.filter(b => b.id !== id);
      return n.length ? n : bps;
    });
    setPreset('custom');
  };

  const addBp = () => {
    const sorted = [...breakpoints].sort((a, b) => a.val - b.val);
    const lastVal = sorted.length ? sorted[sorted.length - 1].val : 0;
    setBreakpoints(bps => [...bps, { id: uid(), name: `bp${bps.length + 1}`, val: lastVal + 200 }]);
    setPreset('custom');
  };

  const toggleFeature = id => {
    setFeatures(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const config = useMemo(
    () => ({ breakpoints, direction, syntax, showRange, features }),
    [breakpoints, direction, syntax, showRange, features]
  );
  const code = useMemo(() => generateCode(codeTab, config), [codeTab, config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const sortedBps = [...breakpoints].sort((a, b) => a.val - b.val);

  return (
    <div className={s.wrap}>
      <CssToolsTopNav active="css-media-queries-generator" />

      {/* ── Header ── */}
      <div className={s.header}>
        <span className={s.logo}>
          <span className={s.logoIcon}>◫</span>
          <span>CSS Media Queries <span className={s.accent}>Generator</span></span>
        </span>
        <div className={s.headerBadges}>
          <span className={s.badge}>CSS</span>
          <span className={s.badge}>SCSS</span>
          <span className={s.badge}>Tailwind</span>
          <span className={s.badge}>JS</span>
        </div>
      </div>

      <div className={s.panels}>
      {/* ── Left panel ── */}
      <div className={s.leftPanel}>

        {/* Preset bar */}
        <div className={s.presetBar}>
          {Object.keys(PRESETS).map(key => (
            <button
              key={key}
              className={`${s.presetBtn} ${preset === key ? s.presetActive : ''}`}
              onClick={() => applyPreset(key)}
            >
              {PRESET_LABELS[key]}
            </button>
          ))}
          {preset === 'custom' && <span className={s.customBadge}>custom</span>}
        </div>

        <div className={s.scrollable}>

          {/* Breakpoints */}
          <div className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionTitle}>Breakpoints</span>
              <div className={s.pills}>
                <button className={`${s.pill} ${direction === 'min' ? s.pillActive : ''}`} onClick={() => setDirection('min')}>min-width</button>
                <button className={`${s.pill} ${direction === 'max' ? s.pillActive : ''}`} onClick={() => setDirection('max')}>max-width</button>
              </div>
            </div>

            <div className={s.syntaxRow}>
              <button className={`${s.pill} ${syntax === 'traditional' ? s.pillActive : ''}`} onClick={() => setSyntax('traditional')}>Traditional</button>
              <button className={`${s.pill} ${syntax === 'modern' ? s.pillActive : ''}`} onClick={() => setSyntax('modern')}>Range syntax</button>
            </div>

            <div className={s.bpList}>
              {sortedBps.map(bp => (
                <div key={bp.id} className={s.bpRow}>
                  <input
                    className={`${s.bpInput} ${s.bpName}`}
                    value={bp.name}
                    onChange={e => updateBp(bp.id, 'name', e.target.value)}
                    placeholder="name"
                    spellCheck={false}
                  />
                  <input
                    className={`${s.bpInput} ${s.bpVal}`}
                    type="number"
                    value={bp.val}
                    onChange={e => updateBp(bp.id, 'val', e.target.value)}
                    min={0}
                    max={9999}
                  />
                  <span className={s.bpUnit}>px</span>
                  <button className={s.bpDel} onClick={() => removeBp(bp.id)} title="Remove">×</button>
                </div>
              ))}
            </div>

            <button className={s.addBtn} onClick={addBp}>+ Add Breakpoint</button>

            <label className={s.rangeToggle}>
              <input
                type="checkbox"
                checked={showRange}
                onChange={e => setShowRange(e.target.checked)}
                className={s.rangeCheck}
              />
              <span>Include range queries</span>
            </label>
          </div>

          {/* Feature queries */}
          <div className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionTitle}>Feature Queries</span>
            </div>
            <div className={s.featureList}>
              {FEATURES.map(f => (
                <label key={f.id} className={`${s.featureRow} ${features.has(f.id) ? s.featureOn : ''}`}>
                  <input
                    type="checkbox"
                    checked={features.has(f.id)}
                    onChange={() => toggleFeature(f.id)}
                    className={s.featureCheck}
                  />
                  <span className={s.featureIcon}>{f.icon}</span>
                  <span className={s.featLabel}>{f.label}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Right panel ── */}
      <div className={s.rightPanel}>
        <div className={s.codeTabBar}>
          {CODE_TABS.map(t => (
            <button
              key={t}
              className={`${s.codeTab} ${codeTab === t ? s.codeTabActive : ''}`}
              onClick={() => setCodeTab(t)}
            >
              {t}
            </button>
          ))}
          <button className={`${s.copyBtnTop} ${copied ? s.copyOk : ''}`} onClick={handleCopy}>
            {copied ? '✓ Copied' : '⎘ Copy'}
          </button>
        </div>
        <div className={s.codeWrap}>
          <pre className={s.code}>{code}</pre>
        </div>
        <div className={s.codeFooter}>
          <span className={s.codeLabel}>{codeTab}</span>
        </div>
      </div>
      </div>
    </div>
  );
}
