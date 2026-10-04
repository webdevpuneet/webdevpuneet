'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
let shapeId = 0;
function mkId(tag) { return `${tag}_${++shapeId}`; }

/* ── Helpers ── */
function pointsToSmoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = ((pts[i].x + pts[i + 1].x) / 2).toFixed(1);
    const my = ((pts[i].y + pts[i + 1].y) / 2).toFixed(1);
    d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  const l = pts[pts.length - 1];
  return `${d} L ${l.x} ${l.y}`;
}

function svgCoord(e, svgEl, viewBox) {
  const r = svgEl.getBoundingClientRect();
  const [, , vw, vh] = viewBox.split(' ').map(Number);
  return {
    x: +((e.clientX - r.left) * vw / r.width).toFixed(1),
    y: +((e.clientY - r.top)  * vh / r.height).toFixed(1),
  };
}

function starPoints(cx, cy, outerR, innerR, n) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const angle = (i * Math.PI) / n - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(' ');
}

function parseStyleStr(style = '') {
  const obj = {};
  style.split(';').forEach(part => {
    const idx = part.indexOf(':');
    if (idx === -1) return;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) obj[k] = v;
  });
  return obj;
}

/* ── CSS animation helpers ── */
function getCssClasses(s) {
  return s.animations
    .filter(a => a.engine === 'css')
    .map(a => `${a.animName}_${a.id}`)
    .join(' ');
}

function buildCssAnimStyle(shapes) {
  const rules = [];
  for (const s of shapes) {
    for (const a of s.animations.filter(a => a.engine === 'css')) {
      const cls = `${a.animName}_${a.id}`;
      const delay = a.delay ? ` ${a.delay}s` : '';
      rules.push(`.${cls} { animation: ${cls} ${a.dur} ${a.timing}${delay}; ${a.extraProps || ''} }`);
      rules.push(`@keyframes ${cls} { ${a.keyframesBody} }`);
    }
  }
  return rules.length ? `<style>\n  ${rules.join('\n  ')}\n</style>` : '';
}

/* ── SMIL animation renderer (only SMIL engine) ── */
function renderAnims(s) {
  return s.animations
    .filter(a => !a.engine || a.engine === 'smil')
    .map(a => {
      const beginAttr = a.delay ? ` begin="${a.delay}s"` : '';
      if (a.type === 'animateTransform') {
        if (a.values) return `<animateTransform attributeName="${a.attr}" type="${a.transformType}" values="${a.values}" dur="${a.dur}" repeatCount="${a.repeatCount}" additive="${a.additive || 'sum'}"${beginAttr} />`;
        return `<animateTransform attributeName="${a.attr}" type="${a.transformType}" from="${a.from}" to="${a.to}" dur="${a.dur}" repeatCount="${a.repeatCount}" additive="${a.additive || 'sum'}"${beginAttr} />`;
      }
      if (a.values) return `<animate attributeName="${a.attr}" values="${a.values}" dur="${a.dur}" repeatCount="${a.repeatCount}"${beginAttr} />`;
      return `<animate attributeName="${a.attr}" from="${a.from}" to="${a.to}" dur="${a.dur}" repeatCount="${a.repeatCount}"${beginAttr} />`;
    }).join('\n    ');
}

function renderImportedEl(s) {
  const cssClass = getCssClasses(s);
  const classAttr = cssClass ? ` class="${cssClass}"` : '';
  const anims = renderAnims(s);
  const SKIP = new Set(['fill','stroke','opacity','stroke-width','style','id']);
  const attrStr = Object.entries(s.rawAttrs)
    .filter(([k]) => !SKIP.has(k))
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ');
  const transform = s.transform || s.rawAttrs.transform;
  const transformAttr = transform ? ` transform="${transform}"` : '';
  const styleStr = `fill:${s.fill};stroke:${s.stroke};stroke-width:${s.strokeWidth};opacity:${s.opacity};`;
  const inner = (s.innerContent || '') + (anims ? '\n    ' + anims + '\n  ' : '');
  const VOID = ['circle','ellipse','line','path','polyline','polygon','rect','image'];
  if (!inner && VOID.includes(s.tag)) return `<${s.tag} id="${s.id}"${classAttr} ${attrStr}${transformAttr} style="${styleStr}" />`;
  return `<${s.tag} id="${s.id}"${classAttr} ${attrStr}${transformAttr} style="${styleStr}">${inner}</${s.tag}>`;
}

function composeTransform(shape, dx, dy) {
  const base = shape.transform || (shape.rawAttrs && shape.rawAttrs.transform) || '';
  const translate = `translate(${dx} ${dy})`;
  return [base, translate].filter(Boolean).join(' ');
}

function renderShapeEl(s) {
  if (s.imported) return renderImportedEl(s);
  const cssClass = getCssClasses(s);
  const classAttr = cssClass ? ` class="${cssClass}"` : '';
  const style = `fill:${s.fill};stroke:${s.stroke};stroke-width:${s.strokeWidth};opacity:${s.opacity};`;
  const transformAttr = s.transform ? ` transform="${s.transform}"` : '';
  const anims = renderAnims(s);
  const inner = anims ? '\n    ' + anims + '\n  ' : '';
  if (s.tag === 'circle')  return `<circle id="${s.id}"${classAttr} cx="${s.cx}" cy="${s.cy}" r="${s.r}"${transformAttr} style="${style}">${inner}</circle>`;
  if (s.tag === 'rect')    return `<rect id="${s.id}"${classAttr} x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" rx="${s.rx}"${transformAttr} style="${style}">${inner}</rect>`;
  if (s.tag === 'ellipse') return `<ellipse id="${s.id}"${classAttr} cx="${s.cx}" cy="${s.cy}" rx="${s.rx}" ry="${s.ry}"${transformAttr} style="${style}">${inner}</ellipse>`;
  if (s.tag === 'star') {
    const pts = starPoints(s.cx, s.cy, s.outerR, s.innerR, s.starN);
    return `<polygon id="${s.id}"${classAttr} points="${pts}"${transformAttr} style="${style}">${inner}</polygon>`;
  }
  if (s.tag === 'heart')   return `<path id="${s.id}"${classAttr} d="${s.d}"${transformAttr} style="${style}">${inner}</path>`;
  if (s.tag === 'arrow')   return `<polygon id="${s.id}"${classAttr} points="${s.points}"${transformAttr} style="${style}">${inner}</polygon>`;
  if (s.tag === 'line')    return `<line id="${s.id}"${classAttr} x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}"${transformAttr} style="${style}">${inner}</line>`;
  if (s.tag === 'polygon') return `<polygon id="${s.id}"${classAttr} points="${s.points}"${transformAttr} style="${style}">${inner}</polygon>`;
  if (s.tag === 'text')    return `<text id="${s.id}"${classAttr} x="${s.x}" y="${s.y}"${transformAttr} style="${style}font-size:${s.fontSize}px;text-anchor:middle;">${anims ? '\n    ' + anims : ''}${s.content}</text>`;
  // Signature / freehand path — includes pathLength + dasharray so Write-On animation works
  if (s.tag === 'path')    return `<path id="${s.id}"${classAttr} d="${s.d}" pathLength="1" stroke-dasharray="1"${transformAttr} style="${style}">${inner}</path>`;
  return '';
}

/* ── GSAP code generation ── */
function propsToJs(props) {
  return Object.entries(props).map(([k, v]) => {
    if (typeof v === 'string')  return `${k}: "${v}"`;
    if (v !== null && typeof v === 'object') {
      const inner = Object.entries(v).map(([ik, iv]) =>
        typeof iv === 'string' ? `${ik}: "${iv}"` : `${ik}: ${JSON.stringify(iv)}`
      ).join(', ');
      return `${k}: { ${inner} }`;
    }
    return `${k}: ${v}`;
  }).join(', ');
}

function generateGsapCode(shapes) {
  const pluginsNeeded = new Set();
  const lines = [];
  for (const s of shapes) {
    const gsapAnims = s.animations.filter(a => a.engine === 'gsap');
    for (const a of gsapAnims) {
      (a.plugins || []).forEach(p => pluginsNeeded.add(p));
      lines.push(`gsap.${a.gsapMethod}("#${s.id}", { ${propsToJs(a.props)} });`);
    }
  }
  return { lines, plugins: [...pluginsNeeded] };
}

const GSAP_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5';
const BG_COLORS = { dark: '#0d0d1a', light: '#f0f0f4', dots: '#0d0d1a', grid: '#0d0d1a', none: 'transparent' };

function buildHtmlOutput({ shapes, viewBox, svgDefs, bg }) {
  const { lines, plugins } = generateGsapCode(shapes);
  const bgColor = BG_COLORS[bg] || '#0d0d1a';
  // SVG content with NO animations — GSAP drives everything
  const svgBody = shapes.map(s => '    ' + renderShapeEl({ ...s, animations: [] })).join('\n');
  const pluginTags = plugins.map(p => `  <script src="${GSAP_CDN}/${p}.min.js"><\/script>`).join('\n');
  const registerLine = plugins.length ? `  gsap.registerPlugin(${plugins.join(', ')});\n` : '';
  const jsBody = lines.length
    ? `${registerLine}  ${lines.join('\n  ')}`
    : '  // Add GSAP animations in the tool sidebar';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SVG Animation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; background: ${bgColor};
    }
    svg { width: 90vmin; height: 90vmin; }
  </style>
</head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
${svgDefs ? '    ' + svgDefs : ''}${svgBody}
  <\/svg>
  <script src="${GSAP_CDN}/gsap.min.js"><\/script>
${pluginTags}
  <script>
${jsBody}
  <\/script>
</body>
<\/html>`;
}

/* ── Constants ── */
const SHAPE_TYPES = [
  { tag: 'circle',  label: 'Circle'   },
  { tag: 'rect',    label: 'Rect'     },
  { tag: 'ellipse', label: 'Ellipse'  },
  { tag: 'star',    label: 'Star'     },
  { tag: 'heart',   label: 'Heart'    },
  { tag: 'arrow',   label: 'Arrow'    },
  { tag: 'line',    label: 'Line'     },
  { tag: 'polygon', label: 'Triangle' },
  { tag: 'text',    label: 'Text'     },
];

const SHAPE_ICONS = {
  circle: '●', rect: '■', ellipse: '⬭', star: '★', heart: '♥',
  arrow: '↑', line: '╱', polygon: '▲', text: 'T',
  path: '✏', g: '❏', polyline: '╱', image: '⬜', default: '◈',
};

const SHAPE_DEFAULTS = {
  circle:  { cx: 200, cy: 200, r: 50 },
  rect:    { x: 150, y: 150, width: 100, height: 100, rx: 8 },
  ellipse: { cx: 200, cy: 200, rx: 70, ry: 35 },
  star:    { cx: 200, cy: 200, outerR: 60, innerR: 25, starN: 5 },
  heart:   { d: 'M 200,245 C 200,245 108,188 108,143 C 108,114 132,96 160,104 C 177,109 200,124 200,124 C 200,124 223,109 240,104 C 268,96 292,114 292,143 C 292,188 200,245 200,245 Z' },
  arrow:   { points: '200,115 248,178 224,178 224,285 176,285 176,178 152,178' },
  line:    { x1: 100, y1: 100, x2: 300, y2: 300 },
  polygon: { points: '200,100 280,260 120,260' },
  text:    { x: 200, y: 200, content: 'SVG Text', fontSize: 28 },
};

/* ── SMIL animation presets ── */
const SMIL_PRESETS = [
  { label: 'Rotate',     engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'rotate',    from: '0 200 200',    to: '360 200 200',  dur: '2s',   repeatCount: 'indefinite' },
  { label: 'Spin CCW',   engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'rotate',    from: '0 200 200',    to: '-360 200 200', dur: '2s',   repeatCount: 'indefinite' },
  { label: 'Pulse',      engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'scale',     values: '1;1.25;1',                       dur: '1s',   repeatCount: 'indefinite' },
  { label: 'Zoom In',    engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'scale',     from: '0',            to: '1',            dur: '1.5s', repeatCount: 'indefinite' },
  { label: 'Bounce',     engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'translate', values: '0,0;0,-40;0,0',                  dur: '0.9s', repeatCount: 'indefinite' },
  { label: 'Float',      engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'translate', values: '0,0;0,-18;0,0',                  dur: '2.2s', repeatCount: 'indefinite' },
  { label: 'Move Right', engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'translate', from: '-80,0',        to: '80,0',         dur: '2s',   repeatCount: 'indefinite' },
  { label: 'Shake',      engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'translate', values: '0,0;-10,0;10,0;-10,0;10,0;0,0', dur: '0.5s', repeatCount: 'indefinite' },
  { label: 'Wiggle',     engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'rotate',    values: '0 200 200;-18 200 200;18 200 200;0 200 200', dur: '0.6s', repeatCount: 'indefinite' },
  { label: 'Skew',       engine: 'smil', type: 'animateTransform', attr: 'transform', additive: 'sum', transformType: 'skewX',     values: '0;20;0;-20;0',                   dur: '1.2s', repeatCount: 'indefinite' },
  { label: 'Fade',       engine: 'smil', type: 'animate', attr: 'opacity', values: '1;0;1',                                              dur: '1.5s', repeatCount: 'indefinite' },
  { label: 'Blink',      engine: 'smil', type: 'animate', attr: 'opacity', values: '1;1;0;0;1',                                          dur: '1s',   repeatCount: 'indefinite' },
  { label: 'Color Cycle',engine: 'smil', type: 'animate', attr: 'fill',    values: '#7c6aff;#ff6a9b;#6affd4;#ffd93d;#7c6aff',           dur: '3s',   repeatCount: 'indefinite' },
  { label: 'Rainbow',    engine: 'smil', type: 'animate', attr: 'fill',    values: '#ff6b6b;#ffd93d;#6bcb77;#4d96ff;#c77dff;#ff6b6b',   dur: '2.5s', repeatCount: 'indefinite' },
  { label: 'Stroke Draw',engine: 'smil', type: 'animate', attr: 'stroke-dashoffset', from: '1000', to: '0',                              dur: '2s',   repeatCount: 'indefinite' },
  /* ── Signature / path draw ── */
  { label: '✏ Write On',  engine: 'smil', type: 'animate', attr: 'stroke-dashoffset', from: '1', to: '0', dur: '1.5s', repeatCount: '1' },
  { label: '✏ Write Loop',engine: 'smil', type: 'animate', attr: 'stroke-dashoffset', from: '1', to: '0', dur: '1.5s', repeatCount: 'indefinite' },
  { label: '✏ Erase',     engine: 'smil', type: 'animate', attr: 'stroke-dashoffset', from: '0', to: '1', dur: '1.5s', repeatCount: '1' },
];

/* ── GSAP animation presets (all free plugins) ── */
const GSAP_PRESETS = [
  // Core
  { label: 'Rotate CW',    engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { rotation: 360,  duration: 2,   repeat: -1, ease: 'none',              transformOrigin: '50% 50%' } },
  { label: 'Rotate CCW',   engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { rotation: -360, duration: 2,   repeat: -1, ease: 'none',              transformOrigin: '50% 50%' } },
  { label: 'Bounce',       engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { y: -50,         duration: 0.6, repeat: -1, yoyo: true, ease: 'power2.out' } },
  { label: 'Pulse',        engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { scale: 1.3,     duration: 0.6, repeat: -1, yoyo: true, ease: 'power1.inOut', transformOrigin: '50% 50%' } },
  { label: 'Elastic',      engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { scale: 1.4,     duration: 1,   repeat: -1, yoyo: true, ease: 'elastic.out(1,0.3)', transformOrigin: '50% 50%' } },
  { label: 'Float',        engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { y: -20,         duration: 2,   repeat: -1, yoyo: true, ease: 'sine.inOut' } },
  { label: 'Move Right',   engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { x: 80,          duration: 2,   repeat: -1, yoyo: true, ease: 'power1.inOut' } },
  { label: 'Shake',        engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { x: 12,          duration: 0.08,repeat: 10, yoyo: true, ease: 'none' } },
  { label: 'Wiggle',       engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { rotation: 20,   duration: 0.25,repeat: 8,  yoyo: true, transformOrigin: '50% 50%' } },
  { label: 'Skew',         engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { skewX: 25,      duration: 0.5, repeat: -1, yoyo: true, ease: 'power1.inOut' } },
  { label: 'Fade',         engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { opacity: 0,     duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' } },
  { label: 'Blink',        engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { opacity: 0,     duration: 0.15,repeat: -1, yoyo: true } },
  { label: 'Zoom In',      engine: 'gsap', gsapMethod: 'from', plugins: [], props: { scale: 0,       duration: 1,   repeat: -1, ease: 'back.out(1.7)', transformOrigin: '50% 50%' } },
  { label: 'Fill Shift',   engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { fill: '#ff6b6b',duration: 1.5, repeat: -1, yoyo: true } },
  { label: 'Stroke Draw',   engine: 'gsap', gsapMethod: 'from', plugins: [], props: { strokeDashoffset: 1000, strokeDasharray: 1000, duration: 2, repeat: -1, ease: 'power1.inOut' } },
  // Signature / path draw (works with pathLength="1" drawn paths)
  { label: '✏ Write On',   engine: 'gsap', gsapMethod: 'from', plugins: [], props: { strokeDashoffset: 1, duration: 1.5, ease: 'none' } },
  { label: '✏ Write Loop', engine: 'gsap', gsapMethod: 'from', plugins: [], props: { strokeDashoffset: 1, duration: 1.5, repeat: -1, ease: 'none' } },
  { label: '✏ Erase',      engine: 'gsap', gsapMethod: 'to',   plugins: [], props: { strokeDashoffset: 1, duration: 1.5, ease: 'none' } },
  // MotionPathPlugin (free)
  { label: 'Orbit ✦',      engine: 'gsap', gsapMethod: 'to',   plugins: ['MotionPathPlugin'], props: { duration: 3, repeat: -1, ease: 'none', motionPath: { path: [{ x: 0, y: -80 }, { x: 80, y: 0 }, { x: 0, y: 80 }, { x: -80, y: 0 }, { x: 0, y: -80 }], curviness: 1.25, type: 'soft' } } },
  { label: 'Figure-8 ✦',   engine: 'gsap', gsapMethod: 'to',   plugins: ['MotionPathPlugin'], props: { duration: 4, repeat: -1, ease: 'none', motionPath: { path: [{ x: 70, y: -70 }, { x: 0, y: 0 }, { x: -70, y: -70 }, { x: 0, y: -140 }, { x: 70, y: -70 }], curviness: 1.5, type: 'soft' } } },
];

/* ── CSS animation presets — embedded in SVG <style>, no library needed ── */
const CSS_PRESETS = [
  { label: 'Rotate',       engine: 'css', dur: '2s',   animName: 'cssRotate',      timing: 'linear infinite',      extraProps: 'transform-origin: 50% 50%;',                            keyframesBody: 'to { transform: rotate(360deg); }' },
  { label: 'Spin CCW',     engine: 'css', dur: '2s',   animName: 'cssSpinCCW',     timing: 'linear infinite',      extraProps: 'transform-origin: 50% 50%;',                            keyframesBody: 'to { transform: rotate(-360deg); }' },
  { label: 'Pulse',        engine: 'css', dur: '1s',   animName: 'cssPulse',       timing: 'ease-in-out infinite', extraProps: 'transform-origin: 50% 50%;',                            keyframesBody: '0%,100% { transform: scale(1); } 50% { transform: scale(1.25); }' },
  { label: 'Bounce',       engine: 'css', dur: '0.9s', animName: 'cssBounce',      timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { transform: translateY(0); } 50% { transform: translateY(-40px); }' },
  { label: 'Float',        engine: 'css', dur: '2.2s', animName: 'cssFloat',       timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); }' },
  { label: 'Move Right',   engine: 'css', dur: '2s',   animName: 'cssMoveRight',   timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { transform: translateX(0); } 50% { transform: translateX(80px); }' },
  { label: 'Shake',        engine: 'css', dur: '0.5s', animName: 'cssShake',       timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-10px); } 40%,80% { transform: translateX(10px); }' },
  { label: 'Wiggle',       engine: 'css', dur: '0.6s', animName: 'cssWiggle',      timing: 'ease-in-out infinite', extraProps: 'transform-origin: 50% 50%;',                            keyframesBody: '0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-18deg); } 75% { transform: rotate(18deg); }' },
  { label: 'Skew',         engine: 'css', dur: '1.2s', animName: 'cssSkew',        timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { transform: skewX(0deg); } 25% { transform: skewX(20deg); } 75% { transform: skewX(-20deg); }' },
  { label: 'Zoom In',      engine: 'css', dur: '1.5s', animName: 'cssZoomIn',      timing: 'ease-in-out infinite', extraProps: 'transform-origin: 50% 50%;',                            keyframesBody: '0%,100% { transform: scale(0); } 50% { transform: scale(1); }' },
  { label: 'Fade',         engine: 'css', dur: '1.5s', animName: 'cssFade',        timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { opacity: 1; } 50% { opacity: 0; }' },
  { label: 'Blink',        engine: 'css', dur: '1s',   animName: 'cssBlink',       timing: 'step-end infinite',    extraProps: '',                                                      keyframesBody: '0%,100% { opacity: 1; } 50% { opacity: 0; }' },
  { label: 'Color Cycle',  engine: 'css', dur: '3s',   animName: 'cssColorCycle',  timing: 'linear infinite',      extraProps: '',                                                      keyframesBody: '0% { fill: #7c6aff; } 25% { fill: #ff6a9b; } 50% { fill: #6affd4; } 75% { fill: #ffd93d; } 100% { fill: #7c6aff; }' },
  { label: 'Glow',         engine: 'css', dur: '1.5s', animName: 'cssGlow',        timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { filter: drop-shadow(0 0 0px currentColor); } 50% { filter: drop-shadow(0 0 8px currentColor); }' },
  { label: 'Draw Stroke',  engine: 'css', dur: '2s',   animName: 'cssDrawStroke',  timing: 'ease forwards',        extraProps: 'stroke-dasharray: 1000; stroke-dashoffset: 1000;',     keyframesBody: 'to { stroke-dashoffset: 0; }' },
  { label: 'March',        engine: 'css', dur: '1s',   animName: 'cssMarch',       timing: 'linear infinite',      extraProps: 'stroke-dasharray: 8 4;',                                keyframesBody: 'to { stroke-dashoffset: -24; }' },
  { label: 'Stroke Pulse', engine: 'css', dur: '1.2s', animName: 'cssStrokePulse', timing: 'ease-in-out infinite', extraProps: '',                                                      keyframesBody: '0%,100% { stroke-opacity: 1; } 50% { stroke-opacity: 0.1; }' },
];

const SWATCHES = ['#7c6aff','#ff6b6b','#ff9f43','#ffd93d','#6bcb77','#4d96ff','#c77dff','#6affd4','#ff6a9b','#ffffff'];
const BG_OPTIONS = [
  { key: 'dark',  label: 'Dark'  },
  { key: 'light', label: 'Light' },
];

const IMPORTABLE_TAGS = new Set(['circle','rect','ellipse','line','polygon','polyline','path','text','g','image']);
const SKIP_TAGS = new Set(['defs','style','title','desc','metadata','linearGradient','radialGradient','filter','clipPath','mask','symbol','pattern']);

function mkShape(tag) {
  return { id: mkId(tag), tag, imported: false, ...SHAPE_DEFAULTS[tag], fill: '#7c6aff', stroke: 'none', strokeWidth: 0, opacity: 1, animations: [] };
}

/* ── Component ── */
export default function SvgAnimationGeneratorTool() {
  const [shapes, setShapes]               = useState([]);
  const [selectedId, setSelectedId]       = useState(null);
  const [bg, setBg]                       = useState('light');
  const [canvasViewBox, setCanvasViewBox] = useState('0 0 400 400');
  const [svgDefs, setSvgDefs]             = useState('');
  const [importError, setImportError]     = useState('');
  const [animEngine, setAnimEngine]       = useState('smil'); // 'smil' | 'gsap'
  const [outputTab, setOutputTab]         = useState('svg');  // 'svg' | 'html'
  const [copied, setCopied]               = useState(false);
  const [copiedHtml, setCopiedHtml]       = useState(false);
  const [selectionBox, setSelectionBox]   = useState(null);
  const [customBg, setCustomBg]           = useState('#ffffff');
  const [drawMode, setDrawMode]           = useState(false);
  const [livePathD, setLivePathD]         = useState('');
  const [history, setHistory]             = useState([]);
  const [historyIndex, setHistoryIndex]   = useState(-1);
  const fileInputRef      = useRef(null);
  const svgRef            = useRef(null);
  const isDrawingRef      = useRef(false);
  const drawPointsRef     = useRef([]);
  const historyRef        = useRef([]);
  const historyIndexRef   = useRef(-1);
  const historyLockedRef  = useRef(false);
  const draggingRef       = useRef(false);
  const dragShapeRef      = useRef(null);
  const dragStartRef      = useRef(null);
  const dragBaseShapeRef  = useRef(null);

  const selected = shapes.find(s => s.id === selectedId) || null;
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex >= 0 && historyIndex < history.length - 1;

  const snapshot = () => ({
    shapes,
    selectedId,
    canvasViewBox,
    svgDefs,
  });

  const setHistoryState = (nextHistory, nextIndex) => {
    historyRef.current = nextHistory;
    historyIndexRef.current = nextIndex;
    setHistory(nextHistory);
    setHistoryIndex(nextIndex);
  };

  const pushHistory = (stateSnapshot) => {
    if (historyLockedRef.current) return;
    const nextHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    nextHistory.push(stateSnapshot);
    setHistoryState(nextHistory, nextHistory.length - 1);
  };

  useEffect(() => {
    const initial = snapshot();
    setHistoryState([initial], 0);
  }, []);

  const applySnapshot = (snap) => {
    historyLockedRef.current = true;
    setShapes(snap.shapes);
    setSelectedId(snap.selectedId);
    setCanvasViewBox(snap.canvasViewBox);
    setSvgDefs(snap.svgDefs);
    historyLockedRef.current = false;
  };

  const undo = () => {
    if (!canUndo) return;
    const nextIndex = historyIndexRef.current - 1;
    const snap = historyRef.current[nextIndex];
    if (!snap) return;
    setHistoryIndex(nextIndex);
    historyIndexRef.current = nextIndex;
    applySnapshot(snap);
  };

  const redo = () => {
    if (!canRedo) return;
    const nextIndex = historyIndexRef.current + 1;
    const snap = historyRef.current[nextIndex];
    if (!snap) return;
    setHistoryIndex(nextIndex);
    historyIndexRef.current = nextIndex;
    applySnapshot(snap);
  };

  /* ── Selection bounding box (in SVG viewport coords) ── */
  useEffect(() => {
    if (!selectedId || !svgRef.current) { setSelectionBox(null); return; }
    const el = svgRef.current.querySelector(`[id="${selectedId}"]`);
    if (!el || typeof el.getBBox !== 'function') { setSelectionBox(null); return; }
    try {
      const bbox   = el.getBBox();
      const elCTM  = el.getScreenCTM();
      const svgCTM = svgRef.current.getScreenCTM();
      if (!elCTM || !svgCTM) { setSelectionBox(bbox); return; }

      // element-local → SVG viewport coordinate transform
      const toViewport = svgCTM.inverse().multiply(elCTM);
      const pt = svgRef.current.createSVGPoint();

      const corners = [
        { x: bbox.x,              y: bbox.y               },
        { x: bbox.x + bbox.width, y: bbox.y               },
        { x: bbox.x,              y: bbox.y + bbox.height  },
        { x: bbox.x + bbox.width, y: bbox.y + bbox.height  },
      ].map(({ x, y }) => { pt.x = x; pt.y = y; return pt.matrixTransform(toViewport); });

      const xs = corners.map(p => p.x);
      const ys = corners.map(p => p.y);
      setSelectionBox({
        x: Math.min(...xs), y: Math.min(...ys),
        width:  Math.max(...xs) - Math.min(...xs),
        height: Math.max(...ys) - Math.min(...ys),
      });
    } catch { setSelectionBox(null); }
  }, [selectedId, shapes]);

  /* ── Click shape in preview to select ── */
  const handleSvgClick = (e) => {
    if (drawMode) return;
    let t = e.target;
    while (t && t !== svgRef.current) {
      const hit = shapes.find(s => s.id === t.id);
      if (hit) { setSelectedId(hit.id); return; }
      t = t.parentElement;
    }
  };

  /* ── GSAP live preview ── */
  useEffect(() => {
    const hasGsap = shapes.some(s => s.animations.some(a => a.engine === 'gsap'));
    const g = window.gsap;

    if (!hasGsap) {
      if (g) g.killTweensOf('svg *');
      return;
    }

    const needsMotionPath = shapes.some(s =>
      s.animations.some(a => a.engine === 'gsap' && (a.plugins || []).includes('MotionPathPlugin'))
    );

    const applyGsap = () => {
      const gsap = window.gsap;
      if (!gsap) return;
      gsap.killTweensOf('svg *');
      gsap.set('svg *', { clearProps: 'all' });
      shapes.forEach(s => {
        s.animations.filter(a => a.engine === 'gsap').forEach(a => {
          if ((a.plugins || []).includes('MotionPathPlugin') && !window.MotionPathPlugin) return;
          try { gsap[a.gsapMethod](`#${s.id}`, { ...a.props }); } catch { /* silent */ }
        });
      });
    };

    const loadScript = (src, cb) => {
      if (document.querySelector(`script[src="${src}"]`)) { cb(); return; }
      const el = document.createElement('script');
      el.src = src; el.onload = cb;
      document.head.appendChild(el);
    };

    const afterGsap = () => {
      if (needsMotionPath && !window.MotionPathPlugin) {
        loadScript(`${GSAP_CDN}/MotionPathPlugin.min.js`, () => {
          window.gsap.registerPlugin(window.MotionPathPlugin);
          applyGsap();
        });
      } else {
        applyGsap();
      }
    };

    if (!window.gsap) {
      loadScript(`${GSAP_CDN}/gsap.min.js`, afterGsap);
    } else {
      afterGsap();
    }
  }, [shapes]);

  /* ── Import SVG ── */
  const importSVG = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportError('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(evt.target.result, 'image/svg+xml');
        if (doc.querySelector('parsererror')) { setImportError('Invalid SVG file.'); return; }
        const svgEl = doc.querySelector('svg');
        if (!svgEl) { setImportError('No <svg> element found.'); return; }

        const vb = svgEl.getAttribute('viewBox') ||
                   `0 0 ${svgEl.getAttribute('width') || 400} ${svgEl.getAttribute('height') || 400}`;
        setCanvasViewBox(vb.replace(/[a-z%]/gi, '').trim() || '0 0 400 400');

        const defsEl = svgEl.querySelector('defs');
        const styleEl = svgEl.querySelector('style');
        setSvgDefs((defsEl ? defsEl.outerHTML + '\n  ' : '') + (styleEl ? styleEl.outerHTML + '\n  ' : ''));

        const newShapes = [];
        for (const el of svgEl.children) {
          const tag = el.tagName.toLowerCase();
          if (SKIP_TAGS.has(tag) || !IMPORTABLE_TAGS.has(tag)) continue;
          const rawAttrs = {};
          for (const attr of el.attributes) rawAttrs[attr.name] = attr.value;
          const inlineStyle = parseStyleStr(rawAttrs.style || '');
          newShapes.push({
            id: mkId(tag), tag, imported: true,
            label: rawAttrs.id || rawAttrs['data-name'] || tag,
            rawAttrs, innerContent: el.innerHTML || '',
            fill:   inlineStyle.fill        || rawAttrs.fill        || '#7c6aff',
            stroke: inlineStyle.stroke      || rawAttrs.stroke      || 'none',
            strokeWidth: parseFloat(inlineStyle['stroke-width'] || rawAttrs['stroke-width']) || 0,
            opacity: parseFloat(inlineStyle.opacity || rawAttrs.opacity) || 1,
            animations: [],
          });
        }
        if (!newShapes.length) { setImportError('No animatable elements found.'); return; }
        const nextShapes = [...shapes, ...newShapes];
        setShapes(nextShapes);
        const nextSelected = newShapes[0].id;
        setSelectedId(nextSelected);
        pushHistory({ ...snapshot(), shapes: nextShapes, selectedId: nextSelected });
      } catch { setImportError('Failed to parse SVG.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  /* ── Shape management ── */
  const addShape = (tag) => {
    const s = mkShape(tag);
    const nextShapes = [...shapes, s];
    setShapes(nextShapes);
    setSelectedId(s.id);
    pushHistory({ ...snapshot(), shapes: nextShapes, selectedId: s.id });
  };
  const deleteShape = (id) => {
    const nextShapes = shapes.filter(s => s.id !== id);
    const nextSelected = selectedId === id ? null : selectedId;
    setShapes(nextShapes);
    setSelectedId(nextSelected);
    pushHistory({ ...snapshot(), shapes: nextShapes, selectedId: nextSelected });
  };
  const duplicateShape = (id) => {
    const s = shapes.find(sh => sh.id === id);
    if (!s) return;
    const newS = { ...s, id: mkId(s.tag), animations: s.animations.map(a => ({ ...a, id: mkId('anim') })) };
    const nextShapes = [...shapes, newS];
    setShapes(nextShapes);
    setSelectedId(newS.id);
    pushHistory({ ...snapshot(), shapes: nextShapes, selectedId: newS.id });
  };
  const reorderShape = (id, direction) => {
    const idx = shapes.findIndex(s => s.id === id);
    if (idx === -1) return;
    const target = direction === 'up' ? idx + 1 : idx - 1;
    if (target < 0 || target >= shapes.length) return;
    const next = [...shapes];
    const [item] = next.splice(idx, 1);
    next.splice(target, 0, item);
    setShapes(next);
    pushHistory({ ...snapshot(), shapes: next });
  };
  const updateShape = (field, val) => {
    const nextShapes = shapes.map(s => s.id === selectedId ? { ...s, [field]: val } : s);
    setShapes(nextShapes);
    pushHistory({ ...snapshot(), shapes: nextShapes });
  };
  const updateShapeNum = (field, val) => updateShape(field, parseFloat(val) || 0);
  const clearAll = () => {
    const nextState = {
      shapes: [],
      selectedId: null,
      canvasViewBox: '0 0 400 400',
      svgDefs: '',
    };
    setShapes(nextState.shapes);
    setSelectedId(nextState.selectedId);
    setSvgDefs(nextState.svgDefs);
    setCanvasViewBox(nextState.canvasViewBox);
    pushHistory(nextState);
  };

  /* ── Animation management ── */
  const addAnim = (preset) => {
    if (!selectedId) return;
    const anim = { ...preset, id: mkId('anim'), delay: 0 };
    // Sync dur field for GSAP (uses props.duration)
    if (anim.engine === 'gsap' && anim.props?.duration) {
      anim.dur = `${anim.props.duration}s`;
      anim.props = { ...anim.props, delay: 0 };
    }
    const nextShapes = shapes.map(s => s.id === selectedId ? { ...s, animations: [...s.animations, anim] } : s);
    setShapes(nextShapes);
    pushHistory({ ...snapshot(), shapes: nextShapes });
  };
  const removeAnim = (animId) => {
    const nextShapes = shapes.map(s => s.id === selectedId
      ? { ...s, animations: s.animations.filter(a => a.id !== animId) } : s);
    setShapes(nextShapes);
    pushHistory({ ...snapshot(), shapes: nextShapes });
  };
  const updateAnimDur = (animId, dur) => {
    setShapes(prev => prev.map(s => s.id === selectedId
      ? {
          ...s,
          animations: s.animations.map(a => {
            if (a.id !== animId) return a;
            if (a.engine === 'gsap') {
              const durNum = parseFloat(dur) || 1;
              return { ...a, dur, props: { ...a.props, duration: durNum } };
            }
            return { ...a, dur };
          }),
        }
      : s));
  };
  const updateAnimDelay = (animId, delay) => {
    const nextShapes = shapes.map(s => s.id === selectedId
      ? {
          ...s,
          animations: s.animations.map(a => {
            if (a.id !== animId) return a;
            const delayNum = parseFloat(delay) || 0;
            if (a.engine === 'gsap') {
              return { ...a, delay: delayNum, props: { ...a.props, delay: delayNum } };
            }
            return { ...a, delay: delayNum };
          }),
        }
      : s);
    setShapes(nextShapes);
    pushHistory({ ...snapshot(), shapes: nextShapes });
  };

  const getShapeIdFromEvent = (e) => {
    let t = e.target;
    while (t && t !== svgRef.current) {
      if (t.id && shapes.some(s => s.id === t.id)) return t.id;
      t = t.parentElement;
    }
    return null;
  };

  const handleDragStart = (e) => {
    if (drawMode || !svgRef.current || e.button !== 0) return;
    const hitId = getShapeIdFromEvent(e);
    if (!hitId) return;
    const hitShape = shapes.find(s => s.id === hitId);
    if (!hitShape) return;
    setSelectedId(hitId);
    dragShapeRef.current = hitId;
    dragStartRef.current = svgCoord(e, svgRef.current, canvasViewBox);
    dragBaseShapeRef.current = hitShape;
    draggingRef.current = true;
    e.preventDefault();
  };

  const handleDragMove = (e) => {
    if (!draggingRef.current || !svgRef.current) return;
    const pt = svgCoord(e, svgRef.current, canvasViewBox);
    const dx = pt.x - dragStartRef.current.x;
    const dy = pt.y - dragStartRef.current.y;
    setShapes(prev => prev.map(s => {
      if (s.id !== dragShapeRef.current) return s;
      return { ...s, transform: composeTransform(dragBaseShapeRef.current, dx, dy) };
    }));
  };

  const handleDragEnd = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    dragShapeRef.current = null;
    dragStartRef.current = null;
    dragBaseShapeRef.current = null;
    pushHistory(snapshot());
  };

  const handleDrawStart = (e) => {
    if (drawMode) {
      e.preventDefault();
      isDrawingRef.current = true;
      const pt = svgCoord(e, svgRef.current, canvasViewBox);
      drawPointsRef.current = [pt];
      setLivePathD(`M ${pt.x} ${pt.y}`);
      return;
    }
    handleDragStart(e);
  };

  const handleDrawMove = (e) => {
    if (drawMode) {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const pt = svgCoord(e, svgRef.current, canvasViewBox);
      drawPointsRef.current.push(pt);
      if (drawPointsRef.current.length % 3 === 0) {
        setLivePathD(pointsToSmoothPath(drawPointsRef.current));
      }
      return;
    }
    handleDragMove(e);
  };

  const handleDrawEnd = () => {
    if (draggingRef.current) {
      handleDragEnd();
    }
    if (!drawMode || !isDrawingRef.current) return;
    isDrawingRef.current = false;
    const d = pointsToSmoothPath(drawPointsRef.current);
    if (!d || drawPointsRef.current.length < 3) { setLivePathD(''); return; }
    const newShape = {
      id: mkId('path'), tag: 'path', imported: false,
      label: 'path', d,
      fill: 'none', stroke: '#7c6aff', strokeWidth: 2.5, opacity: 1,
      animations: [],
    };
    const nextShapes = [...shapes, newShape];
    setShapes(nextShapes);
    setSelectedId(newShape.id);
    pushHistory({ ...snapshot(), shapes: nextShapes, selectedId: newShape.id });
    setLivePathD('');
    drawPointsRef.current = [];
  };

  /* ── Outputs ── */
  const cssStyleBlock = buildCssAnimStyle(shapes);
  const svgContent  = shapes.map(renderShapeEl).join('\n  ');
  const fullSVG     = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${canvasViewBox}">\n${cssStyleBlock ? '  ' + cssStyleBlock + '\n' : ''}  ${svgDefs}${svgContent}\n</svg>`;
  const fullHTML    = buildHtmlOutput({ shapes, viewBox: canvasViewBox, svgDefs, bg });
  const previewHTML = (cssStyleBlock ? cssStyleBlock + '\n  ' : '') + svgDefs + svgContent;

  const copy = () => navigator.clipboard.writeText(fullSVG).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  const download = () => {
    const blob = new Blob([fullSVG], { type: 'image/svg+xml' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'animation.svg'; a.click();
  };
  const copyHtml = () => navigator.clipboard.writeText(fullHTML).then(() => { setCopiedHtml(true); setTimeout(() => setCopiedHtml(false), 1800); });
  const downloadHtml = () => {
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'animation.html'; a.click();
  };

  const activePresets = animEngine === 'gsap' ? GSAP_PRESETS : animEngine === 'css' ? CSS_PRESETS : SMIL_PRESETS;

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="svg-animation-generator" />
      {/* Header */}
      <div className={styles.header} style={{ height: 'auto', minHeight: 52 }}>
        <div className={styles.headerIcon}>△</div>
        <span className={styles.headerTitle}>SVG <span className={styles.headerAccent}>Animation</span> Generator</span>
        <PlaygroundTopAd inline />
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>

          {/* Import SVG */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Import SVG</div>
            <input ref={fileInputRef} type="file" accept=".svg,image/svg+xml" style={{ display: 'none' }} onChange={importSVG} />
            <button className={styles.importBtn} onClick={() => fileInputRef.current?.click()}>↑ Upload SVG file</button>
            <p className={styles.importHint}>Extracts all shapes as editable layers you can animate individually.</p>
            {importError && <p className={styles.importError}>{importError}</p>}
          </div>

          {/* Add Shapes */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Add Shape</div>
            <div className={styles.shapeGrid}>
              {SHAPE_TYPES.map(({ tag, label }) => (
                <button key={tag} className={styles.shapeBtn} onClick={() => addShape(tag)}>
                  <span className={styles.shapeBtnIcon}>{SHAPE_ICONS[tag]}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Layers */}
          <div className={styles.section}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionTitle} style={{ margin: 0 }}>Layers</span>
              {shapes.length > 0 && <button className={styles.clearBtn} onClick={clearAll}>Clear all</button>}
            </div>
            {shapes.length === 0
              ? <div className={styles.noLayers}>No shapes yet</div>
              : (
                <div className={styles.layerList}>
                  {[...shapes].reverse().map(s => (
                    <div key={s.id}
                      className={`${styles.layerItem} ${selectedId === s.id ? styles.layerActive : ''}`}
                      onClick={() => setSelectedId(s.id)}>
                      <span className={styles.layerIcon}>{SHAPE_ICONS[s.tag] || SHAPE_ICONS.default}</span>
                      <span className={styles.layerTag}>{s.label || s.tag}</span>
                      {s.imported && <span className={styles.importedBadge}>svg</span>}
                      {s.animations.length > 0 && <span className={styles.animBadge}>{s.animations.length}</span>}
                      <button className={styles.iconBtn} title="Move up" onClick={e => { e.stopPropagation(); reorderShape(s.id, 'up'); }}>↑</button>
                      <button className={styles.iconBtn} title="Move down" onClick={e => { e.stopPropagation(); reorderShape(s.id, 'down'); }}>↓</button>
                      <button className={styles.iconBtn} title="Duplicate" onClick={e => { e.stopPropagation(); duplicateShape(s.id); }}>⎘</button>
                      <button className={styles.iconBtn} title="Delete" onClick={e => { e.stopPropagation(); deleteShape(s.id); }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
          </div>

        </aside>

        {/* ── Panel: Properties + Animations ── */}
        <aside className={styles.panel}>
          {!selected ? (
            <div className={styles.panelEmpty}>
              <span className={styles.panelEmptyIcon}>◈</span>
              <span className={styles.panelEmptyText}>Select a layer to edit its properties and add animations</span>
            </div>
          ) : (<>

            {/* Properties */}
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Properties</div>
              <div className={styles.propRows}>
                <div className={styles.propRow}>
                  <span className={styles.propLabel}>Fill</span>
                  <input type="color" className={styles.colorPicker}
                    value={selected.fill === 'none' ? '#000000' : selected.fill}
                    onChange={e => updateShape('fill', e.target.value)} />
                  <input type="text" className={styles.hexInput} value={selected.fill} maxLength={7}
                    onChange={e => { if (/^(#[0-9a-f]{0,6}|none)$/i.test(e.target.value)) updateShape('fill', e.target.value); }} />
                </div>
                <div className={styles.swatchRow}>
                  {SWATCHES.map(c => (
                    <button key={c} className={`${styles.swatch} ${selected.fill === c ? styles.swatchActive : ''}`}
                      style={{ background: c }} onClick={() => updateShape('fill', c)} />
                  ))}
                </div>
                <div className={styles.propRow}>
                  <span className={styles.propLabel}>Stroke</span>
                  <input type="color" className={styles.colorPicker}
                    value={selected.stroke === 'none' ? '#ffffff' : selected.stroke}
                    onChange={e => updateShape('stroke', e.target.value)} />
                  <input type="text" className={styles.hexInput} value={selected.stroke} maxLength={7}
                    onChange={e => { if (/^(#[0-9a-f]{0,6}|none)$/i.test(e.target.value)) updateShape('stroke', e.target.value); }} />
                </div>
                <div className={styles.propRow}>
                  <span className={styles.propLabel}>S.Width</span>
                  <input type="range" min={0} max={20} step={1} value={selected.strokeWidth}
                    onChange={e => updateShapeNum('strokeWidth', e.target.value)} className={styles.rangeInput} />
                  <span className={styles.propVal}>{selected.strokeWidth}</span>
                </div>
                <div className={styles.propRow}>
                  <span className={styles.propLabel}>Opacity</span>
                  <input type="range" min={0} max={1} step={0.05} value={selected.opacity}
                    onChange={e => updateShape('opacity', +e.target.value)} className={styles.rangeInput} />
                  <span className={styles.propVal}>{selected.opacity}</span>
                </div>
                {!selected.imported && <>
                  {selected.tag === 'circle' && <>
                    <PropNum label="CX" value={selected.cx} onChange={v => updateShapeNum('cx', v)} />
                    <PropNum label="CY" value={selected.cy} onChange={v => updateShapeNum('cy', v)} />
                    <PropNum label="R"  value={selected.r}  onChange={v => updateShapeNum('r', v)} />
                  </>}
                  {selected.tag === 'rect' && <>
                    <PropNum label="X"  value={selected.x}      onChange={v => updateShapeNum('x', v)} />
                    <PropNum label="Y"  value={selected.y}      onChange={v => updateShapeNum('y', v)} />
                    <PropNum label="W"  value={selected.width}  onChange={v => updateShapeNum('width', v)} />
                    <PropNum label="H"  value={selected.height} onChange={v => updateShapeNum('height', v)} />
                    <PropNum label="RX" value={selected.rx}     onChange={v => updateShapeNum('rx', v)} />
                  </>}
                  {selected.tag === 'ellipse' && <>
                    <PropNum label="CX" value={selected.cx} onChange={v => updateShapeNum('cx', v)} />
                    <PropNum label="CY" value={selected.cy} onChange={v => updateShapeNum('cy', v)} />
                    <PropNum label="RX" value={selected.rx} onChange={v => updateShapeNum('rx', v)} />
                    <PropNum label="RY" value={selected.ry} onChange={v => updateShapeNum('ry', v)} />
                  </>}
                  {selected.tag === 'star' && <>
                    <PropNum label="CX"     value={selected.cx}     onChange={v => updateShapeNum('cx', v)} />
                    <PropNum label="CY"     value={selected.cy}     onChange={v => updateShapeNum('cy', v)} />
                    <PropNum label="Outer"  value={selected.outerR} onChange={v => updateShapeNum('outerR', v)} />
                    <PropNum label="Inner"  value={selected.innerR} onChange={v => updateShapeNum('innerR', v)} />
                    <PropNum label="Points" value={selected.starN}  onChange={v => updateShapeNum('starN', Math.max(3, v))} />
                  </>}
                  {selected.tag === 'line' && <>
                    <PropNum label="X1" value={selected.x1} onChange={v => updateShapeNum('x1', v)} />
                    <PropNum label="Y1" value={selected.y1} onChange={v => updateShapeNum('y1', v)} />
                    <PropNum label="X2" value={selected.x2} onChange={v => updateShapeNum('x2', v)} />
                    <PropNum label="Y2" value={selected.y2} onChange={v => updateShapeNum('y2', v)} />
                  </>}
                  {selected.tag === 'text' && <>
                    <div className={styles.propRow}>
                      <span className={styles.propLabel}>Text</span>
                      <input type="text" className={styles.hexInput} value={selected.content}
                        onChange={e => updateShape('content', e.target.value)} />
                    </div>
                    <PropNum label="Size" value={selected.fontSize} onChange={v => updateShapeNum('fontSize', v)} />
                    <PropNum label="X"    value={selected.x}        onChange={v => updateShapeNum('x', v)} />
                    <PropNum label="Y"    value={selected.y}        onChange={v => updateShapeNum('y', v)} />
                  </>}
                </>}
              </div>
            </div>

            {/* Animations */}
            <div className={styles.section}>
              <div className={styles.engineRow}>
                <span className={styles.sectionTitle} style={{ margin: 0 }}>Animations</span>
                <div className={styles.engineToggle}>
                  <button
                    className={`${styles.engineBtn} ${animEngine === 'css' ? styles.engineBtnCss : ''}`}
                    onClick={() => setAnimEngine('css')}>
                    CSS
                  </button>
                  <button
                    className={`${styles.engineBtn} ${animEngine === 'smil' ? styles.engineBtnActive : ''}`}
                    onClick={() => setAnimEngine('smil')}>
                    SMIL
                  </button>
                  <button
                    className={`${styles.engineBtn} ${animEngine === 'gsap' ? styles.engineBtnGsap : ''}`}
                    onClick={() => { setAnimEngine('gsap'); setOutputTab('html'); }}>
                    GSAP
                  </button>
                </div>
              </div>

              {animEngine === 'gsap' && (
                <p className={styles.gsapNote}>GSAP runs in browser. ✦ = requires MotionPathPlugin (free).</p>
              )}
              {animEngine === 'css' && (
                <p className={styles.cssNote}>CSS animations are embedded in the SVG &lt;style&gt; tag — no library needed.</p>
              )}

              <div className={styles.animPresets}>
                {activePresets.map(p => (
                  <button key={p.label}
                    className={`${styles.animPresetBtn} ${p.engine === 'gsap' ? styles.animPresetBtnGsap : p.engine === 'css' ? styles.animPresetBtnCss : ''}`}
                    onClick={() => addAnim(p)}>
                    + {p.label}
                  </button>
                ))}
              </div>

              {selected.animations.length > 0 && (
                <div className={styles.animList}>
                  {selected.animations.map(a => (
                    <div key={a.id} className={styles.animItem}>
                      <span className={`${styles.engineBadge} ${a.engine === 'gsap' ? styles.engineBadgeGsap : a.engine === 'css' ? styles.engineBadgeCss : styles.engineBadgeSmil}`}>
                        {a.engine === 'gsap' ? 'G' : a.engine === 'css' ? 'C' : 'S'}
                      </span>
                      <span className={styles.animLabel}>{a.label}</span>
                      <input className={styles.durInput} value={a.dur}
                        onChange={e => updateAnimDur(a.id, e.target.value)}
                        title="Duration (e.g. 1s, 0.5s)" />
                      <input className={styles.durInput} value={a.delay ?? 0}
                        onChange={e => updateAnimDelay(a.id, e.target.value)}
                        title="Delay in seconds" placeholder="0" />
                      <button className={styles.iconBtn} onClick={() => removeAnim(a.id)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>)}
        </aside>

        {/* ── Main ── */}
        <main className={styles.main}>

          {/* Canvas toolbar */}
          <div className={styles.canvasBar}>
            <span className={styles.canvasBarLabel}>Background</span>
            {BG_OPTIONS.map(o => (
              <button key={o.key}
                className={`${styles.bgBtn} ${bg === o.key ? styles.bgBtnActive : ''}`}
                onClick={() => setBg(o.key)}>
                {o.label}
              </button>
            ))}
            <div className={`${styles.bgColorWrap} ${bg === 'custom' ? styles.bgBtnActive : ''}`}>
              <input
                type="color"
                className={styles.bgColorPicker}
                value={customBg}
                title="Custom background color"
                onChange={e => { setCustomBg(e.target.value); setBg('custom'); }}
                onClick={() => setBg('custom')}
              />
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button className={styles.bgBtn} disabled={!canUndo} onClick={undo}>Undo</button>
              <button className={styles.bgBtn} disabled={!canRedo} onClick={redo}>Redo</button>
              <button
                className={`${styles.bgBtn} ${drawMode ? styles.drawBtnActive : ''}`}
                onClick={() => { setDrawMode(d => !d); setLivePathD(''); }}>
                ✏ {drawMode ? 'Drawing…' : 'Draw'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div
            className={`${styles.preview} ${bg !== 'custom' ? styles['bg_' + bg] : ''}`}
            style={bg === 'custom' ? { background: customBg } : undefined}
          >
            <svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox={canvasViewBox}
              style={{ maxWidth: '100%', maxHeight: '100%', width: 400, height: 400, cursor: drawMode ? 'crosshair' : (shapes.length ? 'pointer' : 'default') }}
              className={styles.svgEl}
              onClick={handleSvgClick}
              onMouseDown={handleDrawStart}
              onMouseMove={handleDrawMove}
              onMouseUp={handleDrawEnd}
              onMouseLeave={handleDrawEnd}
            >
              <g dangerouslySetInnerHTML={{ __html: previewHTML }} />

              {/* Live draw preview */}
              {livePathD && (
                <path d={livePathD} fill="none" stroke="#6affd4" strokeWidth="2"
                  strokeDasharray="4 2" style={{ pointerEvents: 'none' }} />
              )}

              {/* Selection overlay */}
              {selectionBox && (
                <g style={{ pointerEvents: 'none' }}>
                  <rect
                    x={selectionBox.x - 6}
                    y={selectionBox.y - 6}
                    width={Math.max(selectionBox.width + 12, 12)}
                    height={Math.max(selectionBox.height + 12, 12)}
                    fill="rgba(255,107,107,0.07)"
                    stroke="#ff6b6b"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    rx="3"
                  />
                  {/* Corner handles */}
                  {[
                    [selectionBox.x - 6,                         selectionBox.y - 6],
                    [selectionBox.x + selectionBox.width + 6,    selectionBox.y - 6],
                    [selectionBox.x - 6,                         selectionBox.y + selectionBox.height + 6],
                    [selectionBox.x + selectionBox.width + 6,    selectionBox.y + selectionBox.height + 6],
                  ].map(([cx, cy], i) => (
                    <rect key={i} x={cx - 3} y={cy - 3} width={6} height={6} fill="#ff6b6b" rx="1" />
                  ))}
                  {/* Layer label */}
                  <text
                    x={selectionBox.x - 6}
                    y={selectionBox.y - 10}
                    fill="#ff6b6b"
                    fontSize="10"
                    fontFamily="sans-serif"
                  >
                    {selected?.label || selected?.tag}
                  </text>
                </g>
              )}
            </svg>
            {shapes.length === 0 && (
              <div className={styles.emptyHint}>Upload an SVG or add a shape to get started</div>
            )}
          </div>

          {/* Code output */}
          <div className={styles.codeArea}>
            <div className={styles.codeTabs}>
              <button
                className={`${styles.codeTab} ${outputTab === 'svg' ? styles.codeTabActive : ''}`}
                onClick={() => setOutputTab('svg')}>
                SVG <span className={styles.codeTabSub}>SMIL</span>
              </button>
              <button
                className={`${styles.codeTab} ${outputTab === 'html' ? styles.codeTabGsap : ''}`}
                onClick={() => setOutputTab('html')}>
                HTML <span className={styles.codeTabSub}>GSAP</span>
              </button>
              <div className={styles.codeActions}>
                {outputTab === 'svg' ? <>
                  <button className={styles.copyBtnAction} onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
                  <button className={styles.copyBtnAction} onClick={download}>↓ SVG</button>
                </> : <>
                  <button className={styles.copyBtnAction} onClick={copyHtml}>{copiedHtml ? 'Copied!' : 'Copy'}</button>
                  <button className={`${styles.copyBtnAction} ${styles.copyBtnHtml}`} onClick={downloadHtml}>↓ HTML</button>
                </>}
              </div>
            </div>
            <pre className={styles.codeBlock}>{outputTab === 'svg' ? fullSVG : fullHTML}</pre>
          </div>
        </main>
      </div>
    </div>
  );
}

function PropNum({ label, value, onChange }) {
  return (
    <div className={styles.propRow}>
      <span className={styles.propLabel}>{label}</span>
      <input type="number" className={styles.numInput} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
