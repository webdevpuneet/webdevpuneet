'use client';

import { useState, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ─── Helpers ───────────────────────────────────────────────────── */
function c2k(s) { return s.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`); }
function rot(r)  { return r ? { transform: `rotate(${r}deg)` } : {}; }
function toSlug(n) { return n.toLowerCase().replace(/\s+/g, '-'); }

/* ─── Shape definitions ─────────────────────────────────────────── */
const SHAPES = [
  /* ── Triangles ── */
  { id:'tri-up',    name:'Triangle Up',    group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderLeft:`${Math.round(s*.5)}px solid transparent`,borderRight:`${Math.round(s*.5)}px solid transparent`,borderBottom:`${s}px solid ${c}`,...rot(r)}) },
  { id:'tri-down',  name:'Triangle Down',  group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderLeft:`${Math.round(s*.5)}px solid transparent`,borderRight:`${Math.round(s*.5)}px solid transparent`,borderTop:`${s}px solid ${c}`,...rot(r)}) },
  { id:'tri-left',  name:'Triangle Left',  group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderTop:`${Math.round(s*.5)}px solid transparent`,borderBottom:`${Math.round(s*.5)}px solid transparent`,borderRight:`${s}px solid ${c}`,...rot(r)}) },
  { id:'tri-right', name:'Triangle Right', group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderTop:`${Math.round(s*.5)}px solid transparent`,borderBottom:`${Math.round(s*.5)}px solid transparent`,borderLeft:`${s}px solid ${c}`,...rot(r)}) },
  { id:'tri-tl',    name:'Corner TL',      group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderTop:`${s}px solid ${c}`,borderRight:`${s}px solid transparent`,...rot(r)}) },
  { id:'tri-tr',    name:'Corner TR',      group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderTop:`${s}px solid ${c}`,borderLeft:`${s}px solid transparent`,...rot(r)}) },
  { id:'tri-bl',    name:'Corner BL',      group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderBottom:`${s}px solid ${c}`,borderRight:`${s}px solid transparent`,...rot(r)}) },
  { id:'tri-br',    name:'Corner BR',      group:'triangles', tech:'Border',
    css:({c,s,r})=>({width:'0',height:'0',borderBottom:`${s}px solid ${c}`,borderLeft:`${s}px solid transparent`,...rot(r)}) },

  /* ── Arrows ── */
  { id:'arrow-right',   name:'Arrow Right',   group:'arrows', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(0 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0 80%)',...rot(r)}) },
  { id:'arrow-left',    name:'Arrow Left',    group:'arrows', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(100% 20%, 40% 20%, 40% 0%, 0% 50%, 40% 100%, 40% 80%, 100% 80%)',...rot(r)}) },
  { id:'arrow-up',      name:'Arrow Up',      group:'arrows', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(20% 100%, 20% 40%, 0% 40%, 50% 0%, 100% 40%, 80% 40%, 80% 100%)',...rot(r)}) },
  { id:'arrow-down',    name:'Arrow Down',    group:'arrows', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(20% 0%, 20% 60%, 0% 60%, 50% 100%, 100% 60%, 80% 60%, 80% 0%)',...rot(r)}) },
  { id:'chevron-right', name:'Chevron Right', group:'arrows', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%)',...rot(r)}) },
  { id:'chevron-left',  name:'Chevron Left',  group:'arrows', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(100% 0, 30% 0, 0% 50%, 30% 100%, 100% 100%, 70% 50%)',...rot(r)}) },

  /* ── Geometric ── */
  { id:'diamond',  name:'Diamond',  group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',...rot(r)}) },
  { id:'pentagon', name:'Pentagon', group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',...rot(r)}) },
  { id:'hexagon',  name:'Hexagon',  group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',...rot(r)}) },
  { id:'octagon',  name:'Octagon',  group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',...rot(r)}) },
  { id:'star-4',   name:'Star 4pt', group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)',...rot(r)}) },
  { id:'star-5',   name:'Star 5pt', group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',...rot(r)}) },
  { id:'star-6',   name:'Star 6pt', group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(50% 0%, 62% 28%, 93% 25%, 75% 50%, 93% 75%, 62% 72%, 50% 100%, 38% 72%, 7% 75%, 25% 50%, 7% 25%, 38% 28%)',...rot(r)}) },
  { id:'cross',    name:'Cross',    group:'geometric', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(33% 0%, 67% 0%, 67% 33%, 100% 33%, 100% 67%, 67% 67%, 67% 100%, 33% 100%, 33% 67%, 0% 67%, 0% 33%, 33% 33%)',...rot(r)}) },

  /* ── Decorative ── */
  { id:'circle',   name:'Circle',   group:'decorative', tech:'Border-Radius',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,borderRadius:'50%',...rot(r)}) },
  { id:'oval',     name:'Oval',     group:'decorative', tech:'Border-Radius',
    css:({c,s,r})=>({width:`${Math.round(s*1.6)}px`,height:`${s}px`,background:c,borderRadius:'50%',...rot(r)}) },
  { id:'squircle', name:'Squircle', group:'decorative', tech:'Border-Radius',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,borderRadius:'30%',...rot(r)}) },
  { id:'heart',    name:'Heart',    group:'decorative', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(50% 80%, 87% 55%, 100% 35%, 90% 15%, 75% 10%, 60% 18%, 50% 30%, 40% 18%, 25% 10%, 10% 15%, 0% 35%, 13% 55%)',...rot(r)}) },
  { id:'leaf',     name:'Leaf',     group:'decorative', tech:'Border-Radius',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,borderRadius:'0% 100% 0% 100%',...rot(r)}) },
  { id:'teardrop', name:'Teardrop', group:'decorative', tech:'Border-Radius',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,borderRadius:'50% 50% 50% 0',transform:`rotate(${-45+r}deg)`}) },
  { id:'crescent', name:'Crescent', group:'decorative', tech:'Gradient',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,borderRadius:'50%',background:`radial-gradient(circle at 65% 35%, transparent 35%, ${c} 35%)`,...rot(r)}) },
  { id:'ring',     name:'Ring',     group:'decorative', tech:'Border',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,borderRadius:'50%',border:`${Math.round(s*.15)}px solid ${c}`,background:'transparent',boxSizing:'border-box',...rot(r)}) },

  /* ── UI ── */
  { id:'pill',          name:'Pill',          group:'ui', tech:'Border-Radius',
    css:({c,s,r})=>({width:`${Math.round(s*1.8)}px`,height:`${s}px`,background:c,borderRadius:'999px',...rot(r)}) },
  { id:'parallelogram', name:'Parallelogram',  group:'ui', tech:'Transform',
    css:({c,s,r})=>({width:`${Math.round(s*1.4)}px`,height:`${Math.round(s*.5)}px`,background:c,transform:`skewX(-20deg) rotate(${r}deg)`}) },
  { id:'trapezoid',     name:'Trapezoid',      group:'ui', tech:'Border',
    css:({c,s,r})=>({width:`${s}px`,height:'0',borderBottom:`${Math.round(s*.55)}px solid ${c}`,borderLeft:`${Math.round(s*.15)}px solid transparent`,borderRight:`${Math.round(s*.15)}px solid transparent`,...rot(r)}) },
  { id:'tag',           name:'Price Tag',      group:'ui', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${Math.round(s*.85)}px`,background:c,clipPath:'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)',...rot(r)}) },
  { id:'notch',         name:'Notch Arrow',    group:'ui', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${Math.round(s*.5)}px`,background:c,clipPath:'polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%, 20% 50%)',...rot(r)}) },
  { id:'speech',        name:'Speech Bubble',  group:'ui', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${Math.round(s*.8)}px`,background:c,clipPath:'polygon(0 0, 100% 0, 100% 78%, 20% 78%, 0 100%)',...rot(r)}) },
  { id:'ribbon',        name:'Ribbon Tab',     group:'ui', tech:'Clip-Path',
    css:({c,s,r})=>({width:`${s}px`,height:`${s}px`,background:c,clipPath:'polygon(0 0, 100% 0, 100% 68%, 50% 100%, 0 68%)',...rot(r)}) },
];

const GROUPS = [
  { id:'all',        label:'All'        },
  { id:'triangles',  label:'Triangles'  },
  { id:'arrows',     label:'Arrows'     },
  { id:'geometric',  label:'Geometric'  },
  { id:'decorative', label:'Decorative' },
  { id:'ui',         label:'UI'         },
];

/* ─── Export generators ─────────────────────────────────────────── */
function propsBlock(props) {
  return Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `  ${c2k(k)}: ${v};`)
    .join('\n');
}

function genCSS(props, name) {
  return `.${toSlug(name)} {\n${propsBlock(props)}\n}`;
}

function genHTML(props, name) {
  const slug = toSlug(name);
  return `<style>\n.${slug} {\n${propsBlock(props)}\n}\n</style>\n\n<div class="${slug}"></div>`;
}

function genReact(props) {
  const lines = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => {
      const isNumStr = /^\d+$/.test(String(v));
      return `  ${k}: ${isNumStr ? v : `'${v}'`},`;
    }).join('\n');
  return `<div\n  style={{\n${lines}\n  }}\n/>`;
}

function genTailwind(props) {
  return Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => {
      const vv = String(v).replace(/\s+/g, '_');
      switch (k) {
        case 'width':           return `w-[${v}]`;
        case 'height':          return `h-[${v}]`;
        case 'background':      return v.includes('gradient') ? `[background:${vv}]` : `bg-[${v}]`;
        case 'backgroundColor': return `bg-[${v}]`;
        case 'borderRadius':    return `rounded-[${v}]`;
        case 'clipPath':        return `[clip-path:${vv}]`;
        case 'transform':       return `[transform:${vv}]`;
        case 'boxSizing':       return v === 'border-box' ? 'box-border' : 'box-content';
        case 'border':          return `[border:${vv}]`;
        case 'borderTop':       return `[border-top:${vv}]`;
        case 'borderBottom':    return `[border-bottom:${vv}]`;
        case 'borderLeft':      return `[border-left:${vv}]`;
        case 'borderRight':     return `[border-right:${vv}]`;
        case 'boxShadow':       return `shadow-[${vv}]`;
        default:                return `[${c2k(k)}:${vv}]`;
      }
    }).join(' ');
}

function genSCSS(props, name) {
  let block = propsBlock(props);
  const hex = Object.values(props).find(v => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v));
  const prefix = hex ? `$color: ${hex};\n\n` : '';
  if (hex) block = block.split(hex).join('$color');
  return `${prefix}.${toSlug(name)} {\n${block}\n}`;
}

function genStyled(props) {
  const lines = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `  ${c2k(k)}: ${v};`)
    .join('\n');
  return `import styled from 'styled-components';\n\nconst Shape = styled.div\`\n${lines}\n\`;`;
}

function genVue(props) {
  const lines = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `  '${c2k(k)}': '${v}',`)
    .join('\n');
  return `<template>\n  <div :style="shapeStyle" />\n</template>\n\n<script setup>\nconst shapeStyle = {\n${lines}\n};\n</script>`;
}

const EXPORT_TABS = [
  { id:'css',      label:'CSS',       gen:(p,n) => genCSS(p,n)     },
  { id:'html',     label:'HTML',      gen:(p,n) => genHTML(p,n)    },
  { id:'react',    label:'React',     gen:(p)   => genReact(p)     },
  { id:'tailwind', label:'Tailwind',  gen:(p)   => genTailwind(p)  },
  { id:'scss',     label:'SCSS',      gen:(p,n) => genSCSS(p,n)    },
  { id:'styled',   label:'Styled-C',  gen:(p)   => genStyled(p)    },
  { id:'vue',      label:'Vue',       gen:(p)   => genVue(p)       },
];

/* ─── Shape renderer ────────────────────────────────────────────── */
function ShapeEl({ shape, color, size }) {
  const p = shape.css({ c: color, s: size, r: 0 });
  if (p.width === '0') {
    return (
      <div style={{ width: size * 1.2, height: size * 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={p} />
      </div>
    );
  }
  return <div style={{ flexShrink: 0, ...p }} />;
}

function ShapePreview({ shape, color, size, rotation }) {
  const p = shape.css({ c: color, s: size, r: rotation });
  if (p.width === '0') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={p} />
      </div>
    );
  }
  return <div style={p} />;
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function CssShapeGeneratorTool() {
  const [selectedId, setSelectedId] = useState('circle');
  const [group,      setGroup]      = useState('all');
  const [color,      setColor]      = useState('#0d9488');
  const [size,       setSize]       = useState(100);
  const [rotation,   setRotation]   = useState(0);
  const [exportTab,  setExportTab]  = useState('css');
  const [copied,     setCopied]     = useState(false);

  const shape    = SHAPES.find(s => s.id === selectedId);
  const filtered = group === 'all' ? SHAPES : SHAPES.filter(s => s.group === group);

  const cssPropsObj = useMemo(() => {
    if (!shape) return {};
    return shape.css({ c: color, s: size, r: rotation });
  }, [shape, color, size, rotation]);

  const code = useMemo(() => {
    if (!shape) return '';
    const tab = EXPORT_TABS.find(t => t.id === exportTab);
    return tab ? tab.gen(cssPropsObj, shape.name) : '';
  }, [cssPropsObj, exportTab, shape]);

  function handleCopy() {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-shape-generator" />
      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Left panel: shape picker */}
        <div className={styles.shapePanel}>
          <div className={styles.panelTitle}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}><span className={styles.accent}>◆</span></div>
              <span>CSS <span className={styles.accent}>Shape</span> Generator</span>
            </div>
          </div>
          <div className={styles.groupTabs}>
            {GROUPS.map(g => (
              <button
                key={g.id}
                className={`${styles.groupTab} ${group === g.id ? styles.groupTabActive : ''}`}
                onClick={() => setGroup(g.id)}
              >{g.label}</button>
            ))}
          </div>
          <div className={styles.shapeGrid}>
            {filtered.map(s => (
              <button
                key={s.id}
                className={`${styles.shapeItem} ${selectedId === s.id ? styles.shapeItemActive : ''}`}
                onClick={() => setSelectedId(s.id)}
                title={s.name}
              >
                <div className={styles.shapeThumb}>
                  <ShapeEl shape={s} color={selectedId === s.id ? color : 'var(--text2)'} size={34} />
                </div>
                <span className={styles.shapeName}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          <PlaygroundTopAd />

          {/* Preview */}
          <div className={styles.previewSection}>
            <div className={styles.sectionLabel}>Preview</div>
            <div className={styles.previewArea}>
              {shape && <ShapePreview shape={shape} color={color} size={size} rotation={rotation} />}
            </div>
          </div>

          {/* Controls */}
          <div className={styles.controlsSection}>
            <div className={styles.ctrlRow}>
              <span className={styles.ctrlLabel}>Color</span>
              <div className={styles.colorWrap}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className={styles.colorSwatch} />
                <input
                  type="text"
                  value={color}
                  spellCheck={false}
                  className={styles.colorText}
                  onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setColor(e.target.value); }}
                />
              </div>
            </div>
            <div className={styles.ctrlRow}>
              <span className={styles.ctrlLabel}>Size</span>
              <input type="range" min="50" max="250" value={size}
                onChange={e => setSize(Number(e.target.value))} className={styles.slider} />
              <span className={styles.ctrlVal}>{size}px</span>
            </div>
            <div className={styles.ctrlRow}>
              <span className={styles.ctrlLabel}>Rotation</span>
              <input type="range" min="0" max="360" value={rotation}
                onChange={e => setRotation(Number(e.target.value))} className={styles.slider} />
              <span className={styles.ctrlVal}>{rotation}°</span>
              {rotation > 0 && (
                <button className={styles.resetBtn} onClick={() => setRotation(0)} title="Reset rotation">↺</button>
              )}
            </div>
          </div>

          {/* Export */}
          <div className={styles.exportSection}>
            <div className={styles.exportTabs}>
              {EXPORT_TABS.map(t => (
                <button
                  key={t.id}
                  className={`${styles.exportTab} ${exportTab === t.id ? styles.exportTabActive : ''}`}
                  onClick={() => setExportTab(t.id)}
                >{t.label}</button>
              ))}
            </div>
            <div className={styles.codeWrap}>
              <pre className={styles.code}><code>{code}</code></pre>
            </div>
            <div className={styles.exportFooter}>
              <button
                className={`${styles.copyBtn} ${copied ? styles.copyOk : ''}`}
                onClick={handleCopy}
              >{copied ? '✓ Copied!' : '⎘ Copy'}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
