'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';
import GistSyncButton from '@/components/GistSyncButton';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
// ─── constants ────────────────────────────────────────────────────────────────

const LOCAL_SAVE_DEBOUNCE = 500;

// IndexedDB
const DB_NAME        = 'sms_db';
const DB_VERSION     = 1;
const STORE_PROJECTS = 'projects';
const STORE_META     = 'meta';
const META_ACTIVE    = 'activeId';
const META_PRESETS   = 'presets';
const DELETE_TTL     = 30 * 24 * 60 * 60 * 1000; // 30 days

// ─── IndexedDB helpers ─────────────────────────────────────────────────────────

let _db = null;
async function getDb() {
  if (_db) return _db;
  _db = await new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_PROJECTS)) db.createObjectStore(STORE_PROJECTS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_META))     db.createObjectStore(STORE_META);
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
  return _db;
}

async function idbGetAll() {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_PROJECTS, 'readonly').objectStore(STORE_PROJECTS).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror   = e => reject(e.target.error);
  });
}

async function idbPut(project) {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_PROJECTS, 'readwrite').objectStore(STORE_PROJECTS).put(project);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

async function idbPutMany(projects) {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE_PROJECTS, 'readwrite');
    const store = tx.objectStore(STORE_PROJECTS);
    for (const p of projects) store.put(p);
    tx.oncomplete = () => resolve();
    tx.onerror    = e => reject(e.target.error);
  });
}

async function idbGetMeta(key) {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_META, 'readonly').objectStore(STORE_META).get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror   = e => reject(e.target.error);
  });
}

async function idbSetMeta(key, value) {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_META, 'readwrite').objectStore(STORE_META).put(value, key);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

// ─── Merge helpers ─────────────────────────────────────────────────────────────

function genId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

function liveSorted(all) {
  return all
    .filter(p => !p.deleted)
    .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
}

// Merge two project arrays. Each project carries its own deleted flag + updatedAt.
// Newer updatedAt always wins. Deleted records older than DELETE_TTL are pruned.
function mergeProjects(local, remote) {
  const map = new Map(local.map(p => [p.id, p]));
  for (const rp of remote) {
    const lp = map.get(rp.id);
    if (!lp || (rp.updatedAt || '') > (lp.updatedAt || '')) map.set(rp.id, rp);
  }
  const cutoff = new Date(Date.now() - DELETE_TTL).toISOString();
  return [...map.values()].filter(p => !(p.deleted && (p.updatedAt || '') < cutoff));
}

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" role="img" aria-label="Rocket illustration">
  <defs>
    <linearGradient id="rocket-body" x1="0" x2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#c7d2fe"/>
    </linearGradient>
  </defs>
  <circle id="moon" cx="330" cy="70" r="34" fill="#fde68a"/>
  <g id="stars" fill="#facc15">
    <circle cx="70" cy="58" r="4"/><circle cx="112" cy="34" r="2.8"/><circle cx="250" cy="42" r="3.2"/>
  </g>
  <path id="trail" d="M103 215 C 132 198, 161 191, 196 178" fill="none" stroke="#60a5fa" stroke-width="10" stroke-linecap="round" opacity=".55"/>
  <g id="rocket">
    <path d="M205 174 C 218 103, 263 66, 318 50 C 304 107, 269 151, 207 174 Z" fill="url(#rocket-body)" stroke="#1e293b" stroke-width="4"/>
    <circle cx="263" cy="103" r="17" fill="#38bdf8" stroke="#1e293b" stroke-width="4"/>
    <path d="M214 164 L 189 205 L 238 181 Z" fill="#f97316" stroke="#1e293b" stroke-width="4"/>
    <path d="M246 151 L 240 202 L 281 159 Z" fill="#ef4444" stroke="#1e293b" stroke-width="4"/>
  </g>
  <path id="flame" d="M189 203 C 164 215, 152 241, 137 263 C 162 250, 193 241, 214 205 Z" fill="#fb923c"/>
</svg>`;

const ANIMATABLE = 'g,path,circle,rect,ellipse,line,polyline,polygon,text';
const DEFAULT_DURATION = 2.4;
const DEFAULT_KEYFRAME = { time: 0, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, fill: '', strokeDash: 0, strokeOffset: 0, blur: 0, brightness: 1, segEasing: '' };

const SAMPLE_LAYERS = [
  { id: 'moon',   tag: 'circle', label: 'moon',   baseTransform: '', baseFill: '#fde68a', easing: 'inherit', delay: 0, visible: true, locked: false, motionPath: '' },
  { id: 'stars',  tag: 'g',      label: 'stars',  baseTransform: '', baseFill: '#facc15', easing: 'inherit', delay: 0, visible: true, locked: false, motionPath: '' },
  { id: 'trail',  tag: 'path',   label: 'trail',  baseTransform: '', baseFill: 'none',    easing: 'inherit', delay: 0, visible: true, locked: false, motionPath: '' },
  { id: 'rocket', tag: 'g',      label: 'rocket', baseTransform: '', baseFill: '',        easing: 'inherit', delay: 0, visible: true, locked: false, motionPath: '' },
  { id: 'flame',  tag: 'path',   label: 'flame',  baseTransform: '', baseFill: '#fb923c', easing: 'inherit', delay: 0, visible: true, locked: false, motionPath: '' },
];

const PRESETS = [
  { category: 'Entrance', items: [
    { name: 'Fade In',    frames: [{ time: 0, opacity: 0 }, { time: 100, opacity: 1 }] },
    { name: 'Slide Up',   frames: [{ time: 0, y: 40, opacity: 0 }, { time: 100, y: 0, opacity: 1 }] },
    { name: 'Slide Left', frames: [{ time: 0, x: -60, opacity: 0 }, { time: 100, x: 0, opacity: 1 }] },
    { name: 'Zoom In',    frames: [{ time: 0, scale: 0.2, opacity: 0 }, { time: 70, scale: 1.08, opacity: 1 }, { time: 100, scale: 1 }] },
    { name: 'Bounce In',  frames: [{ time: 0, y: 40, opacity: 0 }, { time: 60, y: -12, opacity: 1 }, { time: 80, y: 6 }, { time: 100, y: 0 }] },
  ]},
  { category: 'Emphasis', items: [
    { name: 'Float',  frames: [{ time: 0, y: 0 }, { time: 50, y: -18 }, { time: 100, y: 0 }] },
    { name: 'Pop In', frames: [{ time: 0, scale: 0.25, opacity: 0 }, { time: 70, scale: 1.08, opacity: 1 }, { time: 100, scale: 1 }] },
    { name: 'Pulse',  frames: [{ time: 0, scale: 1 }, { time: 50, scale: 1.18 }, { time: 100, scale: 1 }] },
    { name: 'Spin',   frames: [{ time: 0, rotate: 0 }, { time: 100, rotate: 360 }] },
    { name: 'Blink',  frames: [{ time: 0, opacity: 1 }, { time: 50, opacity: 0.2 }, { time: 100, opacity: 1 }] },
    { name: 'Shake',  frames: [{ time: 0, x: 0 }, { time: 15, x: -12 }, { time: 30, x: 12 }, { time: 45, x: -8 }, { time: 60, x: 8 }, { time: 75, x: -4 }, { time: 90, x: 4 }, { time: 100, x: 0 }] },
    { name: 'Wiggle', frames: [{ time: 0, rotate: 0 }, { time: 20, rotate: -12 }, { time: 40, rotate: 12 }, { time: 60, rotate: -8 }, { time: 80, rotate: 8 }, { time: 100, rotate: 0 }] },
    { name: 'Glow',   frames: [{ time: 0, brightness: 1 }, { time: 50, brightness: 1.8 }, { time: 100, brightness: 1 }] },
  ]},
  { category: 'Exit', items: [
    { name: 'Fade Out',    frames: [{ time: 0, opacity: 1 }, { time: 100, opacity: 0 }] },
    { name: 'Slide Down',  frames: [{ time: 0, y: 0, opacity: 1 }, { time: 100, y: 40, opacity: 0 }] },
    { name: 'Slide Right', frames: [{ time: 0, x: 0, opacity: 1 }, { time: 100, x: 80, opacity: 0 }] },
    { name: 'Zoom Out',    frames: [{ time: 0, scale: 1, opacity: 1 }, { time: 100, scale: 0.2, opacity: 0 }] },
    { name: 'Blur Out',    frames: [{ time: 0, blur: 0, opacity: 1 }, { time: 100, blur: 12, opacity: 0 }] },
  ]},
  { category: 'Draw', items: [
    { name: 'Draw On',  frames: [{ time: 0, strokeDash: 1000, strokeOffset: 1000 }, { time: 100, strokeDash: 1000, strokeOffset: 0 }] },
    { name: 'Draw Off', frames: [{ time: 0, strokeDash: 1000, strokeOffset: 0 }, { time: 100, strokeDash: 1000, strokeOffset: 1000 }] },
  ]},
];

const EASINGS = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

const BEZIER_QUICK = [
  ['Ease',      [0.25, 0.1,  0.25, 1]],
  ['Ease In',   [0.42, 0,    1,    1]],
  ['Ease Out',  [0,    0,    0.58, 1]],
  ['In Out',    [0.42, 0,    0.58, 1]],
  ['Linear',    [0,    0,    1,    1]],
  ['Bounce',    [0.34, 1.56, 0.64, 1]],
  ['Snappy',    [0.2,  0.8,  0.2,  1]],
  ['Smooth',    [0.4,  0,    0.2,  1]],
  ['Spring',    [0.5, -0.5,  0.5,  1.5]],
];

// ─── pure helpers ──────────────────────────────────────────────────────────────

function sanitizeSvg(input) {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

function parseProject(svgText) {
  if (typeof DOMParser === 'undefined') return { svg: sanitizeSvg(svgText), layers: SAMPLE_LAYERS };
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizeSvg(svgText), 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg || doc.querySelector('parsererror')) throw new Error('Paste or upload a valid SVG file.');
  if (!svg.getAttribute('viewBox')) {
    const w = parseFloat(svg.getAttribute('width')) || 420;
    const h = parseFloat(svg.getAttribute('height')) || 300;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  }
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.querySelectorAll('script').forEach(el => el.remove());
  const layers = [...svg.querySelectorAll(ANIMATABLE)].map((el, i) => {
    let id = el.getAttribute('id');
    if (!id) { id = `layer-${i + 1}`; el.setAttribute('id', id); }
    return { id, tag: el.tagName.toLowerCase(), label: id.replace(/[-_]/g, ' '), baseTransform: el.getAttribute('transform') || '', baseFill: el.getAttribute('fill') || '', easing: 'inherit', delay: 0, visible: true, locked: false, motionPath: '' };
  });
  return { svg: new XMLSerializer().serializeToString(svg), layers };
}

function clamp(n, min, max) { return Math.min(max, Math.max(min, Number.isFinite(n) ? n : min)); }
function mergeFrame(base, partial) { return { ...base, ...partial }; }

function interpolate(a, b, pct) {
  if (!b || a.time === b.time) return a;
  const t = (pct - a.time) / (b.time - a.time);
  const num = (k, d = 0) => +(((a[k] ?? d) + ((b[k] ?? d) - (a[k] ?? d)) * t).toFixed(k === 'scale' || k === 'opacity' ? 3 : 1));
  return { time: pct, x: num('x'), y: num('y'), scale: num('scale', 1), rotate: num('rotate'), opacity: num('opacity', 1), fill: t < 0.5 ? a.fill : b.fill, strokeDash: num('strokeDash'), strokeOffset: num('strokeOffset'), blur: num('blur'), brightness: num('brightness', 1), segEasing: a.segEasing };
}

function frameAt(frames, pct) {
  const sorted = [...frames].sort((a, b) => a.time - b.time);
  const first = sorted[0] || DEFAULT_KEYFRAME;
  if (pct <= first.time) return first;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (pct >= sorted[i].time && pct <= sorted[i + 1].time) return interpolate(sorted[i], sorted[i + 1], pct);
  }
  return sorted[sorted.length - 1] || first;
}

function frameToTransform(f) {
  return `translate(${f.x ?? 0}px,${f.y ?? 0}px) rotate(${f.rotate ?? 0}deg) scale(${f.scale ?? 1})`;
}

function frameToFilter(f) {
  const parts = [];
  if ((f.blur || 0) > 0) parts.push(`blur(${f.blur}px)`);
  if ((f.brightness ?? 1) !== 1) parts.push(`brightness(${f.brightness})`);
  return parts.length ? parts.join(' ') : '';
}

function frameToRule(frame, nextSegEasing, hasFilter, hasDash) {
  const tf = frameToTransform(frame);
  const fl = hasFilter ? ` filter:${frameToFilter(frame) || 'none'};` : '';
  const sd = hasDash ? ` stroke-dasharray:${frame.strokeDash || 0}; stroke-dashoffset:${frame.strokeOffset || 0};` : '';
  const atf = nextSegEasing ? ` animation-timing-function:${nextSegEasing};` : '';
  return `  ${frame.time}% { transform:${tf}; opacity:${frame.opacity ?? 1};${fl}${sd}${atf} }`;
}

function buildLayerCss(layer, frames, duration, globalEasing, loop, stagger, idx) {
  if (!layer.visible) return `#${layer.id} { visibility: hidden; }`;
  const sorted = [...frames].sort((a, b) => a.time - b.time);
  if (sorted.length < 2 && !layer.motionPath) return '';
  const eas = layer.easing !== 'inherit' ? layer.easing : globalEasing;
  const delay = (layer.delay || 0) + idx * stagger;
  const hasFilter = sorted.some(f => (f.blur || 0) > 0 || (f.brightness ?? 1) !== 1);
  const hasDash = sorted.some(f => (f.strokeDash || 0) > 0);

  const animations = [];
  if (sorted.length >= 2) animations.push(`${layer.id}-motion ${duration}s ${eas} ${loop ? 'infinite' : '1'} ${delay}s both`);
  if (layer.motionPath) animations.push(`${layer.id}-path ${duration}s linear ${loop ? 'infinite' : '1'} ${delay}s both`);

  const body = sorted.map((f, i) => {
    const nextEas = i < sorted.length - 1 ? (sorted[i].segEasing || null) : null;
    return frameToRule(f, nextEas, hasFilter, hasDash);
  }).join('\n');

  let css = `#${layer.id} {\n  transform-box: fill-box;\n  transform-origin: center;`;
  if (layer.motionPath) css += `\n  offset-path: path('${layer.motionPath}');\n  offset-rotate: auto;`;
  if (animations.length) css += `\n  animation: ${animations.join(',\n             ')};`;
  css += '\n}';
  if (sorted.length >= 2) css += `\n@keyframes ${layer.id}-motion {\n${body}\n}`;
  if (layer.motionPath) css += `\n@keyframes ${layer.id}-path {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}`;
  return css;
}

function buildCss(layers, keyframes, duration, easing, loop, stagger) {
  const rules = layers.map((l, i) => buildLayerCss(l, keyframes[l.id] || [], duration, easing, loop, stagger, i)).filter(Boolean).join('\n\n');
  return rules || '/* Add at least two keyframes to a layer to generate CSS. */';
}

function buildPreviewCss(layers, keyframes, duration, easing, loop, stagger, time) {
  return layers.map((layer, i) => {
    if (!layer.visible) return `#${layer.id} { visibility: hidden; }`;
    const frames = keyframes[layer.id] || [];
    const sorted = [...frames].sort((a, b) => a.time - b.time);
    if (sorted.length === 0) return '';
    const eas = layer.easing !== 'inherit' ? layer.easing : easing;
    const baseDelay = (layer.delay || 0) + i * stagger;
    const scrubDelay = (-((time / 100) * duration) + baseDelay).toFixed(3);
    const hasFilter = sorted.some(f => (f.blur || 0) > 0 || (f.brightness ?? 1) !== 1);
    const hasDash = sorted.some(f => (f.strokeDash || 0) > 0);

    if (sorted.length === 1) {
      const f = sorted[0];
      const fl = frameToFilter(f);
      const sd = hasDash ? `stroke-dasharray:${f.strokeDash||0};stroke-dashoffset:${f.strokeOffset||0};` : '';
      return `#${layer.id}{transform-box:fill-box;transform-origin:center;transform:${frameToTransform(f)};opacity:${f.opacity??1};${fl ? `filter:${fl};` : ''}${sd}}`;
    }

    const body = sorted.map((f, idx) => {
      const nextEas = idx < sorted.length - 1 ? (sorted[idx].segEasing || null) : null;
      return frameToRule(f, nextEas, hasFilter, hasDash);
    }).join('\n');

    const animations = [`${layer.id}-prev ${duration}s ${eas} ${loop ? 'infinite' : '1'} both`];
    if (layer.motionPath) animations.push(`${layer.id}-path-prev ${duration}s linear ${loop ? 'infinite' : '1'} both`);

    let css = `#${layer.id}{transform-box:fill-box;transform-origin:center;`;
    if (layer.motionPath) css += `offset-path:path('${layer.motionPath}');offset-rotate:auto;`;
    css += `animation:${animations.join(',')};animation-play-state:paused;animation-delay:${scrubDelay}s}`;
    css += `\n@keyframes ${layer.id}-prev{\n${body}\n}`;
    if (layer.motionPath) css += `\n@keyframes ${layer.id}-path-prev{from{offset-distance:0%}to{offset-distance:100%}}`;
    return css;
  }).filter(Boolean).join('\n');
}

function buildGsap(layers, keyframes, duration, globalEasing, loop, stagger) {
  const easMap = { linear: 'none', ease: 'power1.out', 'ease-in': 'power1.in', 'ease-out': 'power1.out', 'ease-in-out': 'power2.inOut' };
  const mapE = e => (e && e !== 'inherit' && e !== '') ? (e.startsWith('cubic-bezier') ? `CustomEase.create("ce","${e}")` : (easMap[e] || 'power2.inOut')) : null;

  const lines = ['// Requires: gsap (https://gsap.com)', `const tl = gsap.timeline({ repeat: ${loop ? -1 : 0} });\n`];

  layers.forEach((layer, i) => {
    if (!layer.visible) return;
    const frames = [...(keyframes[layer.id] || [])].sort((a, b) => a.time - b.time);
    if (frames.length < 2) return;
    lines.push(`// — ${layer.label}`);
    const offset = (layer.delay || 0) + i * stagger;
    const layerEase = mapE(layer.easing !== 'inherit' ? layer.easing : globalEasing) || '"power2.inOut"';

    for (let j = 0; j < frames.length - 1; j++) {
      const f0 = frames[j], f1 = frames[j + 1];
      const segDur = +((f1.time - f0.time) / 100 * duration).toFixed(3);
      const pos = +(f0.time / 100 * duration + offset).toFixed(3);
      const eas = mapE(f0.segEasing) || layerEase;
      const propMap = { x: 'x', y: 'y', scale: 'scale', rotate: 'rotation', opacity: 'opacity' };
      const fromP = [], toP = [];
      Object.entries(propMap).forEach(([k, gk]) => {
        const v0 = f0[k] ?? DEFAULT_KEYFRAME[k], v1 = f1[k] ?? DEFAULT_KEYFRAME[k];
        if (v0 !== v1) { fromP.push(`${gk}: ${v0}`); toP.push(`${gk}: ${v1}`); }
      });
      if (f0.fill !== f1.fill && (f0.fill || f1.fill)) {
        fromP.push(`fill: '${f0.fill || 'inherit'}'`); toP.push(`fill: '${f1.fill || 'inherit'}'`);
      }
      if (!fromP.length && !toP.length) continue;
      const toStr = [...toP, `duration: ${segDur}`, `ease: "${eas}"`].join(', ');
      lines.push(`tl.fromTo("#${layer.id}", { ${fromP.join(', ')} }, { ${toStr} }, ${pos});`);
    }
    lines.push('');
  });
  return lines.join('\n') || '// Add at least two keyframes to a layer to generate GSAP code.';
}

function buildFramerMotion(layers, keyframes, duration, globalEasing, loop, stagger) {
  const easMap = { linear: 'linear', ease: 'easeOut', 'ease-in': 'easeIn', 'ease-out': 'easeOut', 'ease-in-out': 'easeInOut' };
  const mapE = e => easMap[e] || 'easeInOut';
  const out = ["import { motion } from 'framer-motion';\n// Place inside your React component:\n"];

  layers.forEach((layer, i) => {
    if (!layer.visible) return;
    const frames = [...(keyframes[layer.id] || [])].sort((a, b) => a.time - b.time);
    if (frames.length < 2) return;
    const props = {};
    ['x', 'y', 'scale', 'rotate', 'opacity'].forEach(k => {
      const vals = frames.map(f => f[k] ?? DEFAULT_KEYFRAME[k]);
      if (new Set(vals).size > 1) props[k] = vals;
    });
    if (!Object.keys(props).length) return;
    const times = frames.map(f => +(f.time / 100).toFixed(2));
    const delay = (layer.delay || 0) + i * stagger;
    const ease = mapE(layer.easing !== 'inherit' ? layer.easing : globalEasing);
    const animStr = Object.entries(props).map(([k, v]) => `    ${k}: ${JSON.stringify(v)}`).join(',\n');
    const transParts = [`duration: ${duration}`, `times: ${JSON.stringify(times)}`, `ease: "${ease}"`, loop && 'repeat: Infinity', delay && `delay: ${delay}`].filter(Boolean).join(', ');
    out.push(`{/* ${layer.label} */}\n<motion.${layer.tag} id="${layer.id}"\n  animate={{\n${animStr},\n    transition: { ${transParts} }\n  }}\n/>`);
  });
  return out.length > 1 ? out.join('\n\n') : '// Add at least two keyframes to a layer to generate Framer Motion code.';
}

function buildScrollTrigger(layers, keyframes, duration, globalEasing, stagger) {
  const easMap = { linear: 'none', ease: 'power1.out', 'ease-in': 'power1.in', 'ease-out': 'power1.out', 'ease-in-out': 'power2.inOut' };
  const mapE = e => (e && e !== 'inherit' && e !== '') ? (e.startsWith('cubic-bezier') ? `CustomEase.create("ce","${e}")` : (easMap[e] || 'power2.inOut')) : null;
  const lines = [
    '// Requires: gsap + ScrollTrigger plugin (https://gsap.com/docs/v3/Plugins/ScrollTrigger/)',
    'gsap.registerPlugin(ScrollTrigger);\n',
    'const tl = gsap.timeline({',
    '  scrollTrigger: {',
    '    trigger: ".svg-container", // ← change to your trigger element',
    '    start: "top 80%",',
    '    end: "bottom 20%",',
    '    toggleActions: "play none none reverse",',
    '    // scrub: true, // uncomment for scroll-linked scrub',
    '  },',
    '});\n',
  ];
  layers.forEach((layer, i) => {
    if (!layer.visible) return;
    const frames = [...(keyframes[layer.id] || [])].sort((a, b) => a.time - b.time);
    if (frames.length < 2) return;
    lines.push(`// — ${layer.label}`);
    const offset = (layer.delay || 0) + i * stagger;
    const layerEase = mapE(layer.easing !== 'inherit' ? layer.easing : globalEasing) || '"power2.inOut"';
    for (let j = 0; j < frames.length - 1; j++) {
      const f0 = frames[j], f1 = frames[j + 1];
      const segDur = +((f1.time - f0.time) / 100 * duration).toFixed(3);
      const pos = +(f0.time / 100 * duration + offset).toFixed(3);
      const eas = mapE(f0.segEasing) || layerEase;
      const propMap = { x: 'x', y: 'y', scale: 'scale', rotate: 'rotation', opacity: 'opacity' };
      const fromP = [], toP = [];
      Object.entries(propMap).forEach(([k, gk]) => {
        const v0 = f0[k] ?? DEFAULT_KEYFRAME[k], v1 = f1[k] ?? DEFAULT_KEYFRAME[k];
        if (v0 !== v1) { fromP.push(`${gk}: ${v0}`); toP.push(`${gk}: ${v1}`); }
      });
      if (!fromP.length && !toP.length) continue;
      lines.push(`tl.fromTo("#${layer.id}", { ${fromP.join(', ')} }, { ${toP.join(', ')}, duration: ${segDur}, ease: "${eas}" }, ${pos});`);
    }
    lines.push('');
  });
  return lines.join('\n') || '// Add at least two keyframes to generate ScrollTrigger code.';
}

function buildLottie(svgHtml, layers, keyframes, duration) {
  const FR = 60;
  const totalFrames = Math.round(duration * FR);
  let W = 420, H = 300;
  if (typeof DOMParser !== 'undefined') {
    try {
      const doc = new DOMParser().parseFromString(svgHtml, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      const vb = svg?.getAttribute('viewBox')?.split(/\s+/).map(Number);
      if (vb?.length === 4) { W = vb[2]; H = vb[3]; }
      else { W = parseFloat(svg?.getAttribute('width')) || 420; H = parseFloat(svg?.getAttribute('height')) || 300; }
    } catch {}
  }
  const buildScalarProp = (frames, key, def, multiplier = 1) => {
    const vals = frames.map(f => ({ t: Math.round((f.time / 100) * totalFrames), v: (f[key] ?? def) * multiplier }));
    if (vals.length < 2 || new Set(vals.map(v => v.v)).size === 1) return { a: 0, k: vals[0]?.v ?? def * multiplier };
    return { a: 1, k: vals.map((v, i) => { const n = vals[i + 1]; return n ? { t: v.t, s: [v.v], e: [n.v], i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] } } : { t: v.t, s: [v.v] }; }) };
  };
  const buildPosProp = (frames) => {
    const vals = frames.map(f => ({ t: Math.round((f.time / 100) * totalFrames), x: (f.x ?? 0) + W / 2, y: (f.y ?? 0) + H / 2 }));
    if (vals.length < 2) return { a: 0, k: [vals[0]?.x ?? W / 2, vals[0]?.y ?? H / 2, 0] };
    return { a: 1, k: vals.map((v, i) => { const n = vals[i + 1]; return n ? { t: v.t, s: [v.x, v.y, 0], e: [n.x, n.y, 0], i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] } } : { t: v.t, s: [v.x, v.y, 0] }; }) };
  };
  const buildScaleProp = (frames) => {
    const base = buildScalarProp(frames, 'scale', 1, 100);
    if (base.a === 0) return { a: 0, k: [base.k, base.k, 100] };
    return { a: 1, k: base.k.map(kf => ({ ...kf, ...(kf.s ? { s: [kf.s[0], kf.s[0], 100] } : {}), ...(kf.e ? { e: [kf.e[0], kf.e[0], 100] } : {}) })) };
  };
  const lottieLayers = layers.filter(l => l.visible).map((layer, i) => {
    const frames = [...(keyframes[layer.id] || [])].sort((a, b) => a.time - b.time);
    const delay = Math.round(((layer.delay || 0) / duration) * totalFrames);
    return { ddd: 0, ind: i + 1, ty: 4, nm: layer.label, sr: 1, ks: { o: buildScalarProp(frames, 'opacity', 1, 100), r: buildScalarProp(frames, 'rotate', 0), p: buildPosProp(frames), s: buildScaleProp(frames) }, shapes: [], ip: delay, op: totalFrames, st: delay, bm: 0 };
  });
  return JSON.stringify({ v: '5.5.7', fr: FR, ip: 0, op: totalFrames, w: W, h: H, nm: 'SVG Motion Studio Export', ddd: 0, assets: [], layers: lottieLayers, meta: { g: 'SVG Motion Studio — fwdtools.com' } }, null, 2);
}

function exportSvg(svgHtml, layers, keyframes, duration, easing, loop, stagger) {
  if (typeof DOMParser === 'undefined') return svgHtml;
  const doc = new DOMParser().parseFromString(svgHtml, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg) return svgHtml;
  const style = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `\n${buildCss(layers, keyframes, duration, easing, loop, stagger)}\n`;
  svg.insertBefore(style, svg.firstChild);
  return new XMLSerializer().serializeToString(svg);
}

function exportHtml(svgMarkup) {
  return `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>Animated SVG</title>\n  <style>body{min-height:100vh;margin:0;display:grid;place-items:center;background:#0f172a}svg{width:min(84vw,720px);height:auto}</style>\n</head>\n<body>\n${svgMarkup}\n</body>\n</html>`;
}

function downloadFile(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  a.click(); URL.revokeObjectURL(url);
}

// ─── BezierEditor component ────────────────────────────────────────────────────

function BezierEditor({ value, onChange, onClose, label }) {
  const G = 140, P = 16;           // grid size, padding
  const VW = G + P * 2;            // 172 — square viewBox
  const VH = G + P * 2;            // 172

  const parseBz = v => {
    const m = v?.match(/cubic-bezier\(([^)]+)\)/);
    if (m) return m[1].split(',').map(Number);
    return ({ ease:[0.25,0.1,0.25,1],'ease-in':[0.42,0,1,1],'ease-out':[0,0,0.58,1],'ease-in-out':[0.42,0,0.58,1] })[v] || [0.25,0.1,0.25,1];
  };

  const [bz, setBz] = useState(() => parseBz(value));
  const [previewKey, setPreviewKey] = useState(0);
  const svgRef  = useRef(null);
  const dragRef = useRef(null);
  const [x1, y1, x2, y2] = bz;

  // Grid coords: bx∈[0,1] → x∈[P,P+G], by=0→bottom, by=1→top (flipped Y).
  const gridX = bx => P + bx * G;
  const gridY = by => P + G - by * G;   // unclamped — can go outside [P, P+G]

  // Dot position: handle is ALWAYS inside the grid square.
  const dotX = bx => P + clamp(bx, 0, 1) * G;
  const dotY = by => P + G - clamp(by, 0, 1) * G;

  // Raw bezier values from mouse position (unclamped Y — curve stretches freely)
  const getSvgCoords = e => {
    const rect = svgRef.current.getBoundingClientRect();
    const sx = (e.clientX - rect.left) / rect.width  * VW;
    const sy = (e.clientY - rect.top)  / rect.height * VH;
    const bx = clamp((sx - P) / G, 0, 1);
    const by = (P + G - sy) / G;              // unclamped Y
    return [bx, by];
  };

  const apply = nb => {
    setBz(nb);
    onChange(`cubic-bezier(${nb.map(n => +n.toFixed(3)).join(',')})`);
    setPreviewKey(k => k + 1);
  };

  const onHandleDown = (e, which) => {
    e.preventDefault();
    dragRef.current = which;
    svgRef.current.setPointerCapture(e.pointerId);
  };
  const onSvgMove = e => {
    if (!dragRef.current) return;
    const [bx, by] = getSvgCoords(e);
    apply(dragRef.current === 1 ? [bx, by, x2, y2] : [x1, y1, bx, by]);
  };
  const onSvgUp = () => { dragRef.current = null; };

  // Anchors (fixed corners)
  const [p0x, p0y] = [gridX(0), gridY(0)];
  const [p3x, p3y] = [gridX(1), gridY(1)];

  // Control points for the CURVE — unclamped, so curve stretches outside grid
  const [c1x, c1y] = [gridX(x1), gridY(y1)];
  const [c2x, c2y] = [gridX(x2), gridY(y2)];

  // Handle DOT positions — always inside grid square
  const [d1x, d1y] = [dotX(x1), dotY(y1)];
  const [d2x, d2y] = [dotX(x2), dotY(y2)];

  // Coord labels
  const fmt = n => (n >= 0 ? ' ' : '') + n.toFixed(2);

  return (
    <div className={styles.bezierPanel}>
      <div className={styles.bezierHead}>
        <span>{label || 'Curve Editor'}</span>
        <button onClick={onClose} aria-label="Close">✕</button>
      </div>

      {/* SVG canvas — overflow:visible so the CURVE renders beyond the grid.
          Dots are always inside the grid, so no extra canvas padding needed. */}
      <div className={styles.bezierCanvas}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VW} ${VH}`}
          className={styles.bezierSvg}
          onPointerMove={onSvgMove}
          onPointerUp={onSvgUp}
        >
          {/* grid */}
          <rect x={P} y={P} width={G} height={G}
            fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="2"/>
          {[0.25, 0.5, 0.75].map(t => (
            <g key={t}>
              <line x1={gridX(t)} y1={P} x2={gridX(t)} y2={P+G} stroke="var(--border)" strokeWidth="0.5"/>
              <line x1={P} y1={dotY(t)} x2={P+G} y2={dotY(t)} stroke="var(--border)" strokeWidth="0.5"/>
            </g>
          ))}

          {/* diagonal reference */}
          <line x1={p0x} y1={p0y} x2={p3x} y2={p3y}
            stroke="var(--border2)" strokeWidth="0.8" strokeDasharray="4,3"/>

          {/* arms: anchor → dot (dot is inside grid, arm shows direction) */}
          <line x1={p0x} y1={p0y} x2={d1x} y2={d1y}
            stroke="#7c3aed" strokeWidth="1.2" opacity="0.55"/>
          <line x1={p3x} y1={p3y} x2={d2x} y2={d2y}
            stroke="#a78bfa" strokeWidth="1.2" opacity="0.55"/>

          {/* curve — uses UNCLAMPED control points so it stretches beyond grid */}
          <path d={`M${p0x},${p0y} C${c1x},${c1y} ${c2x},${c2y} ${p3x},${p3y}`}
            fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round"
            style={{ overflow: 'visible' }}/>

          {/* anchors */}
          <circle cx={p0x} cy={p0y} r="4" fill="#7c3aed"/>
          <circle cx={p3x} cy={p3y} r="4" fill="#7c3aed"/>

          {/* handle 1 — dot clamped inside grid, ring shows it's active */}
          <circle cx={d1x} cy={d1y} r="9" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.3"/>
          <circle cx={d1x} cy={d1y} r="5" fill="#7c3aed" stroke="var(--bg)" strokeWidth="1.5"
            style={{ cursor: 'grab' }}
            onPointerDown={e => onHandleDown(e, 1)}/>

          {/* handle 2 */}
          <circle cx={d2x} cy={d2y} r="9" fill="none" stroke="#a78bfa" strokeWidth="1.2" opacity="0.3"/>
          <circle cx={d2x} cy={d2y} r="5" fill="#a78bfa" stroke="var(--bg)" strokeWidth="1.5"
            style={{ cursor: 'grab' }}
            onPointerDown={e => onHandleDown(e, 2)}/>
        </svg>
      </div>

      {/* coordinate readout */}
      <div className={styles.bezierCoords}>
        <span><em style={{color:'#7c3aed'}}>●</em> x1<b>{fmt(x1)}</b> y1<b>{fmt(y1)}</b></span>
        <span><em style={{color:'#a78bfa'}}>●</em> x2<b>{fmt(x2)}</b> y2<b>{fmt(y2)}</b></span>
      </div>

      {/* animated preview */}
      <div className={styles.bezierTrack}>
        <div key={previewKey} className={styles.bezierBall}
          style={{ animationTimingFunction: `cubic-bezier(${bz.map(n => +n.toFixed(3)).join(',')})` }}/>
      </div>

      <div className={styles.bezierQuick}>
        {BEZIER_QUICK.map(([name, vals]) => (
          <button key={name} className={styles.bezierQBtn} onClick={() => apply(vals)}>{name}</button>
        ))}
      </div>
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────

export default function SvgMotionStudioTool() {
  const [svgHtml, setSvgHtml]       = useState(SAMPLE_SVG);
  const [layers, setLayers]         = useState(SAMPLE_LAYERS);
  const [selectedId, setSelectedId] = useState(SAMPLE_LAYERS[0]?.id || '');
  const [keyframes, setKeyframes]   = useState(() => ({
    [SAMPLE_LAYERS[0]?.id]: [
      { ...DEFAULT_KEYFRAME, time: 0 },
      { ...DEFAULT_KEYFRAME, time: 50, y: -18, scale: 1.08 },
      { ...DEFAULT_KEYFRAME, time: 100 },
    ],
  }));
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [time, setTime]       = useState(0);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [easing, setEasing]   = useState('ease-in-out');
  const [loop, setLoop]       = useState(true);
  const [stagger, setStagger] = useState(0);
  const [speed, setSpeed]     = useState(1);
  const [playing, setPlaying] = useState(false);
  const [svgInput, setSvgInput] = useState(SAMPLE_SVG);
  const [error, setError]     = useState('');
  const [copied, setCopied]   = useState('');
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [previewBg, setPreviewBg] = useState('dark');
  const [previewBgColor, setPreviewBgColor] = useState('#1e293b');
  const [exportTab, setExportTab] = useState('css');
  const [bezierFor, setBezierFor] = useState(null); // 'global' | 'layer' | 'frame' | null

  const [showProjects, setShowProjects] = useState(false);

  // Multi-project library — initialised async from IDB in mount effect
  const [projects, setProjects]               = useState([]);
  const [activeProjectId, setActiveProjectId] = useState('');
  const [projectName, setProjectName]         = useState('');
  const [projectNameInput, setProjectNameInput] = useState('');
  const [renamingId, setRenamingId]             = useState(null);
  const [renameInput, setRenameInput]           = useState('');
  const [confirmDelete, setConfirmDelete]       = useState(null); // { id, name }

  // Copy/paste keyframes
  const [clipboardKf, setClipboardKf] = useState(null);

  // Custom presets — initialised async from IDB in mount effect
  const [customPresets, setCustomPresets] = useState([]);
  const [presetName, setPresetName] = useState('');

  // Layer drag-and-drop reorder
  const [dragLayerId, setDragLayerId] = useState(null);
  const [dragOverId, setDragOverId]   = useState(null);

  const rafRef           = useRef(null);
  const startRef         = useRef(0);
  const previewStyleRef  = useRef(null);
  const dragRef          = useRef(null);
  const latestKfRef      = useRef(keyframes);
  const historyRef       = useRef([{}]);
  const histIdxRef       = useRef(0);
  const localSaveDebounceRef = useRef(null);
  const syncRef          = useRef(null);
  const projectAnchorRef = useRef(null);
  // Always-fresh snapshot of current canvas state for use inside async timeouts
  const latestStateRef   = useRef({});

  useEffect(() => { latestKfRef.current = keyframes; }, [keyframes]);
  // Keep latestStateRef in sync with every render
  latestStateRef.current = { svgHtml, layers, keyframes, duration, easing, loop, stagger, activeProjectId, projectName };

  // ── history ────────────────────────────────────────────────────────────────

  const pushHistory = useCallback((kf) => {
    historyRef.current = historyRef.current.slice(0, histIdxRef.current + 1);
    historyRef.current.push(JSON.parse(JSON.stringify(kf)));
    histIdxRef.current = historyRef.current.length - 1;
    setCanUndo(histIdxRef.current > 0);
    setCanRedo(false);
  }, []);

  const undo = useCallback(() => {
    if (histIdxRef.current <= 0) return;
    histIdxRef.current--;
    setKeyframes(historyRef.current[histIdxRef.current]);
    setCanUndo(histIdxRef.current > 0); setCanRedo(true);
  }, []);

  const redo = useCallback(() => {
    if (histIdxRef.current >= historyRef.current.length - 1) return;
    histIdxRef.current++;
    setKeyframes(historyRef.current[histIdxRef.current]);
    setCanRedo(histIdxRef.current < historyRef.current.length - 1); setCanUndo(true);
  }, []);

  // ── project library ────────────────────────────────────────────────────────

  const getCurrentSnapshot = useCallback((name, id) => ({
    id: id || activeProjectId || genId(),
    name: name || projectName || 'Untitled',
    svgHtml, layers, keyframes: latestKfRef.current, duration, easing, loop, stagger,
    updatedAt: new Date().toISOString(),
  }), [svgHtml, layers, duration, easing, loop, stagger, activeProjectId, projectName]);

  const applySnapshot = useCallback((d) => {
    if (!d) return;
    // Use ?? so an intentionally blank svgHtml ('') is applied, not fallen back on current state
    const html = d.svgHtml ?? '';
    setSvgHtml(html);
    setSvgInput(html);
    setLayers(d.layers || []);
    const kf = d.keyframes || {};
    setKeyframes(kf); historyRef.current = [kf]; histIdxRef.current = 0;
    setCanUndo(false); setCanRedo(false);
    setDuration(d.duration || DEFAULT_DURATION);
    setEasing(d.easing || 'ease-in-out');
    setLoop(d.loop ?? true);
    setStagger(d.stagger || 0);
    setSelectedId(d.layers?.[0]?.id || '');
    setSelectedFrame(0); setTime(0);
  }, []); // no deps — uses only the argument, not captured state

  async function getLocalData() {
    const all = await idbGetAll();
    const activeId = await idbGetMeta(META_ACTIVE);
    return { projects: all, activeProjectId: activeId, updatedAt: new Date().toISOString() };
  }

  async function onPullData(remote) {
    const remoteProjects = remote.projects || [];
    const localAll = await idbGetAll();
    const merged = mergeProjects(localAll, remoteProjects);
    await idbPutMany(merged);
    setProjects(liveSorted(merged));
    const activeId = remote.activeProjectId || (await idbGetMeta(META_ACTIVE));
    if (activeId) {
      const updated = merged.find(p => p.id === activeId && !p.deleted);
      if (updated) {
        applySnapshot(updated);
        setProjectName(updated.name);
        setProjectNameInput(updated.name);
        setActiveProjectId(activeId);
      }
    }
  }

  // ── project CRUD (IDB-backed) ──────────────────────────────────────────────

  async function flushCurrentProjectToIdb() {
    const s = latestStateRef.current;
    if (!s.activeProjectId) return null;
    const snap = {
      id: s.activeProjectId, name: s.projectName || 'Untitled',
      svgHtml: s.svgHtml, layers: s.layers, keyframes: s.keyframes,
      duration: s.duration, easing: s.easing, loop: s.loop, stagger: s.stagger,
      updatedAt: new Date().toISOString(), deleted: false,
    };
    await idbPut(snap);
    await idbSetMeta(META_ACTIVE, s.activeProjectId);
    return snap;
  }

  function scheduleLocalProjectSave() {
    clearTimeout(localSaveDebounceRef.current);
    localSaveDebounceRef.current = setTimeout(() => {
      flushCurrentProjectToIdb().catch(() => {});
    }, LOCAL_SAVE_DEBOUNCE);
  }

  async function saveProject(nameOverride) {
    const name = (nameOverride || projectNameInput || projectName || 'Untitled').trim();
    const id   = activeProjectId || genId();
    const snap = { ...getCurrentSnapshot(name, id), deleted: false };
    await idbPut(snap);
    await idbSetMeta(META_ACTIVE, id);
    setProjects(prev => liveSorted([snap, ...prev.filter(p => p.id !== id)]));
    setActiveProjectId(id);
    setProjectName(snap.name);
    setProjectNameInput('');
    syncRef.current?.forcePush();
  }

  async function saveAsNew(name) {
    const n    = (name || projectNameInput || 'Untitled').trim();
    const snap = { ...getCurrentSnapshot(n, genId()), deleted: false };
    await idbPut(snap);
    await idbSetMeta(META_ACTIVE, snap.id);
    setProjects(prev => liveSorted([snap, ...prev]));
    setActiveProjectId(snap.id);
    setProjectName(snap.name);
    setProjectNameInput('');
    syncRef.current?.forcePush();
  }

  function loadProjectEntry(p) {
    applySnapshot(p);
    setActiveProjectId(p.id);
    setProjectName(p.name);
    setProjectNameInput(p.name);
    setRenamingId(null);
    idbSetMeta(META_ACTIVE, p.id);
  }

  async function renameProject(id, newName) {
    const n  = newName.trim() || 'Untitled';
    const ts = new Date().toISOString();
    setProjects(prev => {
      const next = prev.map(p => p.id === id ? { ...p, name: n, updatedAt: ts } : p);
      // Write updated record to IDB (fire-and-forget here; awaited copy below)
      const updated = next.find(p => p.id === id);
      if (updated) idbPut(updated);
      return next;
    });
    if (id === activeProjectId) setProjectName(n);
    setRenamingId(null);
    syncRef.current?.forcePush();
  }

  function deleteProjectEntry(id) {
    const p = projects.find(x => x.id === id);
    setConfirmDelete({ id, name: p?.name || 'this project' });
  }

  async function confirmDeleteProject() {
    if (!confirmDelete) return;
    const { id } = confirmDelete;
    setConfirmDelete(null);
    // Mark as deleted in IDB (keeps the record for cross-device propagation until TTL)
    const ts      = new Date().toISOString();
    const current = (await idbGetAll()).find(p => p.id === id);
    if (current) await idbPut({ ...current, deleted: true, updatedAt: ts });
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) {
      setActiveProjectId('');
      setProjectName('');
      setProjectNameInput('');
      await idbSetMeta(META_ACTIVE, null);
    }
    syncRef.current?.forcePush();
  }

  // Load IDB on mount
  useEffect(() => {
    (async () => {
      const [all, activeId, presets] = await Promise.all([
        idbGetAll(),
        idbGetMeta(META_ACTIVE),
        idbGetMeta(META_PRESETS),
      ]);
      const live = liveSorted(all);
      setProjects(live);
      setCustomPresets(presets || []);
      if (activeId) {
        setActiveProjectId(activeId);
        const active = live.find(p => p.id === activeId);
        if (active) {
          applySnapshot(active);
          setProjectName(active.name);
          setProjectNameInput(active.name);
        }
      }
    })();

    return () => {
      clearTimeout(localSaveDebounceRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounce local save and Gist sync independently on canvas edits
  useEffect(() => {
    scheduleLocalProjectSave();
    syncRef.current?.forcePush();
  }, [keyframes, layers, duration, easing, loop, stagger]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── derived (needed before keyboard effect) ────────────────────────────────

  const selectedLayer  = layers.find(l => l.id === selectedId);
  const selectedFrames = keyframes[selectedId] || [{ ...DEFAULT_KEYFRAME }];
  const currentFrame   = selectedFrames[selectedFrame] || selectedFrames[0] || DEFAULT_KEYFRAME;

  // ── keyboard shortcuts ─────────────────────────────────────────────────────

  useEffect(() => {
    const fn = e => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if (ctrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
      if (ctrl && e.key === 'c' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setClipboardKf(selectedFrames.map(f => ({ ...f })));
      }
      if (ctrl && e.key === 'v' && clipboardKf && selectedId) {
        e.preventDefault();
        commitKeyframes({ ...keyframes, [selectedId]: clipboardKf.map(f => ({ ...f })) });
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [undo, redo, selectedFrames, clipboardKf, selectedId, keyframes]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Projects popover outside-click close ──────────────────────────────────

  useEffect(() => {
    if (!showProjects) return;
    function handler(e) {
      if (projectAnchorRef.current && !projectAnchorRef.current.contains(e.target)) setShowProjects(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showProjects]);

  // ── CSS-injection preview ─────────────────────────────────────────────────

  useEffect(() => {
    if (previewStyleRef.current) {
      previewStyleRef.current.textContent = buildPreviewCss(layers, keyframes, duration, easing, loop, stagger, time);
    }
  });

  // ── init ───────────────────────────────────────────────────────────────────

  useEffect(() => { loadSvg(SAMPLE_SVG); }, []);

  // ── rAF playback ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!playing) { if (rafRef.current) cancelAnimationFrame(rafRef.current); return; }
    startRef.current = performance.now() - (time / 100) * duration * 1000 / speed;
    const tick = now => {
      const pct = (((now - startRef.current) * speed / (duration * 1000)) * 100) % 100;
      setTime(+pct.toFixed(1));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [playing, duration, speed]);

  // ── more derived ───────────────────────────────────────────────────────────

  const animatedSvg = useMemo(
    () => typeof DOMParser === 'undefined' ? svgHtml : exportSvg(svgHtml, layers, keyframes, duration, easing, loop, stagger),
    [svgHtml, layers, keyframes, duration, easing, loop, stagger]
  );
  const cssOutput      = useMemo(() => buildCss(layers, keyframes, duration, easing, loop, stagger), [layers, keyframes, duration, easing, loop, stagger]);
  const gsapOutput     = useMemo(() => buildGsap(layers, keyframes, duration, easing, loop, stagger), [layers, keyframes, duration, easing, loop, stagger]);
  const framerOutput   = useMemo(() => buildFramerMotion(layers, keyframes, duration, easing, loop, stagger), [layers, keyframes, duration, easing, loop, stagger]);
  const scrollOutput   = useMemo(() => buildScrollTrigger(layers, keyframes, duration, easing, stagger), [layers, keyframes, duration, easing, stagger]);
  const lottieOutput   = useMemo(() => buildLottie(svgHtml, layers, keyframes, duration), [svgHtml, layers, keyframes, duration]);

  const exportCode = exportTab === 'gsap' ? gsapOutput : exportTab === 'framer' ? framerOutput : exportTab === 'scroll' ? scrollOutput : exportTab === 'lottie' ? lottieOutput : cssOutput;

  // bezier-for derived value and setter
  const bezierValue = bezierFor === 'global' ? easing : bezierFor === 'layer' ? (selectedLayer?.easing || easing) : bezierFor === 'frame' ? (currentFrame?.segEasing || '') : '';
  const bezierChange = v => {
    if (bezierFor === 'global') setEasing(v);
    else if (bezierFor === 'layer') updateLayer({ easing: v });
    else if (bezierFor === 'frame') updateFrame({ segEasing: v });
  };

  // ── SVG load ──────────────────────────────────────────────────────────────

  function loadSvg(input) {
    if (!input || !input.trim()) {
      setSvgHtml(''); setLayers([]); setSelectedId('');
      setKeyframes({}); historyRef.current = [{}]; histIdxRef.current = 0;
      setCanUndo(false); setCanRedo(false); setSelectedFrame(0); setTime(0);
      setError('SVG is blank. Paste or upload an SVG file.');
      return;
    }
    try {
      const next = parseProject(input);
      setSvgHtml(next.svg); setLayers(next.layers); setSelectedId(next.layers[0]?.id || '');
      const kf = {};
      setKeyframes(kf); historyRef.current = [kf]; histIdxRef.current = 0;
      setCanUndo(false); setCanRedo(false); setSelectedFrame(0); setTime(0); setError('');
    } catch (err) { setError(err.message); }
  }

  function commitKeyframes(kf) { setKeyframes(kf); pushHistory(kf); }

  // ── keyframe actions ───────────────────────────────────────────────────────

  function updateFrame(patch) {
    const frames = [...selectedFrames];
    const updated = mergeFrame(frames[selectedFrame] || DEFAULT_KEYFRAME, patch);
    frames[selectedFrame] = updated;
    frames.sort((a, b) => a.time - b.time);
    setSelectedFrame(Math.max(0, frames.findIndex(f => f === updated)));
    commitKeyframes({ ...keyframes, [selectedId]: frames });
  }

  function addKeyframe() {
    const next = mergeFrame(frameAt(selectedFrames, time), { time: +time.toFixed(1) });
    const frames = [...selectedFrames.filter(f => Math.abs(f.time - next.time) > 0.2), next].sort((a, b) => a.time - b.time);
    setSelectedFrame(frames.findIndex(f => f.time === next.time));
    commitKeyframes({ ...keyframes, [selectedId]: frames });
  }

  function removeKeyframe() {
    if (selectedFrames.length <= 1) return;
    const frames = selectedFrames.filter((_, i) => i !== selectedFrame);
    setSelectedFrame(0);
    commitKeyframes({ ...keyframes, [selectedId]: frames });
  }

  function applyPreset(preset) {
    const base = frameAt(selectedFrames, time);
    const frames = preset.frames.map(f => mergeFrame({ ...DEFAULT_KEYFRAME, ...base }, f));
    setSelectedFrame(0); setTime(0);
    commitKeyframes({ ...keyframes, [selectedId]: frames });
  }

  // ── custom presets ────────────────────────────────────────────────────────

  function saveAsPreset() {
    const name = presetName.trim();
    if (!name || selectedFrames.length < 2) return;
    const next = [...customPresets, { name, frames: selectedFrames.map(f => ({ ...f })) }];
    setCustomPresets(next); idbSetMeta(META_PRESETS, next); setPresetName('');
  }

  function deleteCustomPreset(idx) {
    const next = customPresets.filter((_, i) => i !== idx);
    setCustomPresets(next); idbSetMeta(META_PRESETS, next);
  }

  // ── layer drag-and-drop reorder ───────────────────────────────────────────

  function onLayerDragStart(id) { setDragLayerId(id); }
  function onLayerDragOver(id) { if (id !== dragLayerId) setDragOverId(id); }
  function onLayerDragEnd() {
    if (dragLayerId && dragOverId && dragLayerId !== dragOverId) {
      setLayers(prev => {
        const next = [...prev];
        const fromIdx = next.findIndex(l => l.id === dragLayerId);
        const toIdx   = next.findIndex(l => l.id === dragOverId);
        if (fromIdx >= 0 && toIdx >= 0) { const [item] = next.splice(fromIdx, 1); next.splice(toIdx, 0, item); }
        return next;
      });
    }
    setDragLayerId(null); setDragOverId(null);
  }

  // ── layer actions ──────────────────────────────────────────────────────────

  function updateLayer(patch) {
    setLayers(prev => prev.map(l => l.id === selectedId ? { ...l, ...patch } : l));
  }

  function toggleVis(id) {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  }

  function toggleLock(id) {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, locked: !l.locked } : l));
  }

  // ── canvas click-to-select ────────────────────────────────────────────────

  function handleCanvasClick(e) {
    let el = e.target;
    while (el && el !== e.currentTarget) {
      const id = el.getAttribute?.('id');
      const layer = id && layers.find(l => l.id === id);
      if (layer && !layer.locked) { setSelectedId(id); setSelectedFrame(0); return; }
      el = el.parentElement;
    }
  }

  // ── timeline drag ─────────────────────────────────────────────────────────

  function onKeyDotPointerDown(e, frameIndex) {
    e.preventDefault(); e.stopPropagation();
    dragRef.current = { frameIndex, selectedId };
    setSelectedFrame(frameIndex);
    setTime(selectedFrames[frameIndex]?.time ?? 0);
    setPlaying(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onKeyDotPointerMove(e) {
    if (!dragRef.current) return;
    const track = e.currentTarget.parentElement;
    const rect = track.getBoundingClientRect();
    let pct = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
    if (e.shiftKey) pct = Math.round(pct / 5) * 5; // snap to 5%
    const newTime = +pct.toFixed(1);
    setTime(newTime);
    const lid = dragRef.current.selectedId;
    setKeyframes(prev => {
      const frames = [...(prev[lid] || [])];
      const fi = dragRef.current?.frameIndex ?? 0;
      frames[fi] = { ...frames[fi], time: newTime };
      frames.sort((a, b) => a.time - b.time);
      const ni = frames.findIndex(f => f.time === newTime);
      if (ni >= 0) dragRef.current.frameIndex = ni;
      const next = { ...prev, [lid]: frames };
      latestKfRef.current = next;
      return next;
    });
    if (dragRef.current) setSelectedFrame(dragRef.current.frameIndex);
  }

  function onKeyDotPointerUp() {
    if (!dragRef.current) return;
    dragRef.current = null;
    pushHistory(latestKfRef.current);
  }

  function onTrackClick(e, layerId) {
    if (dragRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let pct = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
    if (e.shiftKey) pct = Math.round(pct / 5) * 5;
    setTime(+pct.toFixed(1));
    setPlaying(false);
    if (layerId !== selectedId) { setSelectedId(layerId); setSelectedFrame(0); }
  }

  // ── paste SVG from clipboard ───────────────────────────────────────────────

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim().startsWith('<svg') || text.trim().startsWith('<SVG')) {
        setSvgInput(text); loadSvg(text);
      } else {
        setError('Clipboard content is not SVG markup.');
      }
    } catch { setError('Clipboard access denied — paste manually into the box.'); }
  }

  // ── export / import JSON ──────────────────────────────────────────────────

  function exportProjectJson() {
    const snap = getCurrentSnapshot();
    downloadFile(`${snap.name || 'motion-project'}.json`, JSON.stringify(snap, null, 2), 'application/json');
  }

  function importProjectJson(file) {
    file.text().then(text => {
      try {
        const d = JSON.parse(text);
        if (d.projects) {
          applyProject(d);
        } else {
          applySnapshot(d);
          const snap = { ...d, id: d.id || genId(), name: d.name || file.name.replace('.json', '') || 'Imported', updatedAt: d.updatedAt || new Date().toISOString() };
          setProjects(prev => { const next = mergeProjectArrays(prev, [snap]); saveStoredProjects(next); return next; });
          setActiveProjectId(snap.id);
          setProjectName(snap.name);
          try { localStorage.setItem(LS_ACTIVE_ID, snap.id); } catch {}
        }
      } catch { setError('Invalid project file.'); }
    });
  }

  async function copy(content, label) {
    await navigator.clipboard.writeText(content);
    setCopied(label); setTimeout(() => setCopied(''), 1500);
  }

  // ── background style ───────────────────────────────────────────────────────

  const bgStyle = previewBg === 'custom' ? { background: previewBgColor } : {};
  const bgClass = styles[`bg${previewBg.charAt(0).toUpperCase() + previewBg.slice(1)}`] || '';

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="svg-motion-studio" />
      <PlaygroundTopAd />

      {/* ── header ── */}
      <header className={styles.header}>
        <img src="/icons/svg-motion-studio.svg" width="34" height="34" alt="SVG Motion Studio" className={styles.logo} />
        <div>
          <div className={styles.title}>SVG Motion Studio</div>
        </div>

        {/* ── project chooser ── */}
        <div className={styles.projectAnchor} ref={projectAnchorRef}>
          <button
            className={`${styles.projectTrigger} ${showProjects ? styles.projectTriggerActive : ''}`}
            onClick={() => { setShowProjects(v => !v); setProjectNameInput(projectName || ''); }}
            title="Manage projects"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <span className={styles.projectTriggerName} suppressHydrationWarning>{projectName || 'Untitled'}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, opacity: 0.5 }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {showProjects && (
            <div className={styles.projectPopover}>
              <div className={styles.projectPopoverHead}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Projects</span>
                <button className={styles.projectPopoverClose} onClick={() => setShowProjects(false)}>✕</button>
              </div>

              {/* save current */}
              <div className={styles.projectSaveArea}>
                <input
                  className={styles.projectPopoverInput}
                  type="text"
                  placeholder="Project name…"
                  value={projectNameInput}
                  onChange={e => setProjectNameInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { saveProject(projectNameInput); } }}
                />
                <div className={styles.projectSaveBtns}>
                  <button onClick={() => saveProject(projectNameInput)} title="Save to current slot">
                    Save
                  </button>
                  <button
                    onClick={() => saveAsNew(projectNameInput)}
                    disabled={!projectNameInput.trim()}
                    title="Save as a new project"
                  >
                    Save as New
                  </button>
                </div>
              </div>

              {/* project list */}
              {projects.length > 0 ? (
                <>
                  <div className={styles.projectPopoverDivider} />
                  <div className={styles.projectPopoverList}>
                    {projects.map(p => (
                      <div key={p.id} className={`${styles.projectPopoverItem} ${p.id === activeProjectId ? styles.projectPopoverItemActive : ''}`}>
                        {renamingId === p.id ? (
                          <input
                            className={`${styles.projectPopoverInput} ${styles.projectRenameInput}`}
                            autoFocus
                            value={renameInput}
                            onChange={e => setRenameInput(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') renameProject(p.id, renameInput);
                              if (e.key === 'Escape') setRenamingId(null);
                            }}
                            onBlur={() => renameProject(p.id, renameInput)}
                          />
                        ) : (
                          <button
                            className={styles.projectPopoverLoad}
                            onClick={() => loadProjectEntry(p)}
                            title={`Load "${p.name}"`}
                          >
                            <span className={styles.projectPopoverName}>{p.name || 'Untitled'}</span>
                            {p.updatedAt && <span className={styles.projectPopoverDate}>{new Date(p.updatedAt).toLocaleDateString()}</span>}
                          </button>
                        )}
                        <button
                          className={styles.projectPopoverEdit}
                          onClick={() => { setRenamingId(p.id); setRenameInput(p.name || ''); }}
                          title="Rename project"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          className={styles.projectPopoverDel}
                          onClick={() => deleteProjectEntry(p.id)}
                          title="Delete project"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className={styles.projectPopoverEmpty}>No saved projects yet. Type a name above and press Save.</p>
              )}
            </div>
          )}
        </div>

        <div className={styles.headerActions}>
          <button className={styles.iconActionBtn} disabled={!canUndo} onClick={undo} title="Undo (Ctrl+Z)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7h11a5 5 0 0 1 0 10H3"/><path d="M6 4l-3 3 3 3"/>
            </svg>
          </button>
          <button className={styles.iconActionBtn} disabled={!canRedo} onClick={redo} title="Redo (Ctrl+Y)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 7H10a5 5 0 0 0 0 10h11"/><path d="M18 4l3 3-3 3"/>
            </svg>
          </button>
          <button onClick={exportProjectJson}>Export JSON</button>
          <label className={styles.fileBtn}>
            Import JSON
            <input type="file" accept=".json" onChange={e => { const f = e.target.files?.[0]; if (f) importProjectJson(f); e.target.value = ''; }} />
          </label>
          <button className={styles.primaryBtn} onClick={() => downloadFile('animated.svg', animatedSvg, 'image/svg+xml')}>Export SVG</button>
          <button className={styles.primaryBtn} onClick={() => downloadFile('animated.html', exportHtml(animatedSvg), 'text/html')}>Export HTML</button>

          <GistSyncButton ref={syncRef} toolKey="sm" fileName="fwd-svg-motion.json" description="webdevpuneet.com — SVG Motion Studio" getLocalData={getLocalData} onPullData={onPullData} />
        </div>
      </header>

      <div className={styles.layout}>

        {/* ── sidebar ── */}
        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Import SVG</div>
            <textarea value={svgInput} onChange={e => setSvgInput(e.target.value)} className={styles.importBox} spellCheck={false} placeholder="Paste SVG markup here…" />
            <div className={styles.importActions}>
              <label className={styles.fileBtn}>
                Upload
                <input type="file" accept=".svg,image/svg+xml" onChange={e => { const f = e.target.files?.[0]; if (f) f.text().then(t => { setSvgInput(t); loadSvg(t); }); }} />
              </label>
              <button onClick={pasteFromClipboard} title="Paste SVG from clipboard">Paste</button>
              <button onClick={() => loadSvg(svgInput)}>Load</button>
              <button onClick={() => { setSvgInput(SAMPLE_SVG); loadSvg(SAMPLE_SVG); }}>Sample</button>
            </div>
            {error
              ? <p className={styles.error}>{error}</p>
              : <p className={styles.hint}>Scripts stripped. Click canvas elements to select layers. Hold ⇧ while dragging keyframes to snap.</p>}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Layers <span className={styles.dndHint}>drag ≡ to reorder</span></div>
            <div className={styles.layers}>
              {layers.map(layer => (
                <div
                  key={layer.id}
                  className={`${styles.layerItem} ${layer.id === selectedId ? styles.activeLayerItem : ''} ${!layer.visible ? styles.hiddenLayerItem : ''} ${dragOverId === layer.id && dragLayerId !== layer.id ? styles.layerDragOver : ''}`}
                  onPointerEnter={() => dragLayerId && onLayerDragOver(layer.id)}
                >
                  <button
                    className={styles.layerHandle}
                    title="Drag to reorder"
                    onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); onLayerDragStart(layer.id); }}
                    onPointerUp={onLayerDragEnd}
                    onPointerCancel={onLayerDragEnd}
                  >≡</button>
                  <button className={styles.layerIcon} onClick={() => toggleVis(layer.id)} title={layer.visible ? 'Hide layer' : 'Show layer'}>
                    {layer.visible ? '●' : '○'}
                  </button>
                  <button className={styles.layerIcon} onClick={() => toggleLock(layer.id)} title={layer.locked ? 'Unlock layer' : 'Lock layer'}>
                    {layer.locked ? '⚷' : '·'}
                  </button>
                  <button className={styles.layerMain} onClick={() => { if (!layer.locked) { setSelectedId(layer.id); setSelectedFrame(0); } }}>
                    <span className={styles.layerTag}>{layer.tag}</span>
                    <strong className={styles.layerName}>{layer.label}</strong>
                    <em className={styles.layerKf}>{(keyframes[layer.id] || []).length}kf</em>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Motion Presets</div>
            {PRESETS.map(group => (
              <div key={group.category} className={styles.presetGroup}>
                <div className={styles.presetLabel}>{group.category}</div>
                <div className={styles.presetGrid}>
                  {group.items.map(p => (
                    <button key={p.name} disabled={!selectedLayer || selectedLayer.locked} onClick={() => applyPreset(p)}>{p.name}</button>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* custom presets */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>My Presets</div>
            {customPresets.length > 0 && (
              <div className={styles.customPresetGrid}>
                {customPresets.map((p, i) => (
                  <div key={i} className={styles.customPresetItem}>
                    <button className={styles.customPresetApply} disabled={!selectedLayer || selectedLayer.locked} onClick={() => applyPreset(p)} title={`Apply "${p.name}"`}>{p.name}</button>
                    <button className={styles.customPresetDel} onClick={() => deleteCustomPreset(i)} title="Delete preset">✕</button>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.savePresetRow}>
              <input className={styles.savePresetInput} type="text" placeholder="Preset name…" value={presetName} onChange={e => setPresetName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveAsPreset()} />
              <button disabled={!selectedLayer || selectedFrames.length < 2 || !presetName.trim()} onClick={saveAsPreset} title="Save current layer's keyframes as a preset">Save</button>
            </div>
          </section>
        </aside>

        {/* ── stage ── */}
        <main className={styles.stage}>
          {/* stage top bar */}
          <div className={styles.stageTop}>
            <button className={styles.playBtn} onClick={() => setPlaying(p => !p)} title={playing ? 'Pause' : 'Play'}>
              {playing ? '⏸' : '▶'}
            </button>
            <button onClick={() => { setPlaying(false); setTime(0); }} title="Restart">↺</button>

            <div className={styles.speedGroup}>
              {[0.5, 1, 2].map(s => (
                <button key={s} className={`${styles.speedBtn} ${speed === s ? styles.speedBtnActive : ''}`} onClick={() => setSpeed(s)}>×{s}</button>
              ))}
            </div>

            <label className={styles.timeLabel}>
              <input type="range" min="0" max="100" step="0.1" value={time}
                onChange={e => { setPlaying(false); setTime(Number(e.target.value)); }} />
              <span>{time.toFixed(1)}%</span>
            </label>

            <div className={styles.bgGroup}>
              {[['dark', '◼'], ['light', '◻'], ['checker', '⊞']].map(([bg, icon]) => (
                <button key={bg} className={`${styles.bgBtn} ${previewBg === bg ? styles.bgBtnActive : ''}`} onClick={() => setPreviewBg(bg)} title={bg}>{icon}</button>
              ))}
              <input type="color" value={previewBgColor} title="Custom background"
                className={`${styles.bgColorPicker} ${previewBg === 'custom' ? styles.bgBtnActive : ''}`}
                onChange={e => { setPreviewBgColor(e.target.value); setPreviewBg('custom'); }} />
            </div>
          </div>

          {/* canvas */}
          <div className={styles.canvas}>
            <div className={`${styles.svgPreview} ${svgHtml ? bgClass : ''}`} style={svgHtml ? bgStyle : {}} onClick={handleCanvasClick} suppressHydrationWarning>
              <style ref={previewStyleRef} />
              {svgHtml
                ? <div dangerouslySetInnerHTML={{ __html: svgHtml }} />
                : <div className={styles.canvasEmpty}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10, opacity: 0.35 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                    SVG is blank — paste or upload an SVG file
                  </div>
              }
            </div>
          </div>

          {/* multi-layer timeline */}
          <div className={styles.timeline}>
            <div className={styles.tlHeader}>
              <span>Timeline</span>
              <div className={styles.tlHeaderRight}>
                <span className={styles.tlSnapHint}>⇧ snap</span>
                <button disabled={!selectedLayer || selectedLayer?.locked} onClick={addKeyframe}>+ Keyframe</button>
              </div>
            </div>
            <div className={styles.tlBody}>
              {layers.map(layer => {
                const isSelected = layer.id === selectedId;
                const lFrames = keyframes[layer.id] || [];
                return (
                  <div
                    key={layer.id}
                    className={`${styles.tlRow} ${isSelected ? styles.tlRowActive : ''} ${!layer.visible ? styles.tlRowHidden : ''} ${layer.locked ? styles.tlRowLocked : ''}`}
                    onClick={() => { if (!layer.locked) { setSelectedId(layer.id); setSelectedFrame(0); } }}
                  >
                    <div className={styles.tlLabel} title={`${layer.tag}: ${layer.label}`}>
                      {layer.label}
                    </div>
                    <div
                      className={styles.tlTrack}
                      onClick={e => { e.stopPropagation(); onTrackClick(e, layer.id); }}
                    >
                      <div className={styles.tlPlayhead} style={{ left: `${time}%` }} />
                      {lFrames.map((frame, fi) => (
                        <button
                          key={`${frame.time}-${fi}`}
                          className={`${styles.tlKeyDot} ${isSelected && fi === selectedFrame ? styles.tlKeyDotActive : ''}`}
                          style={{ left: `${frame.time}%` }}
                          onPointerDown={isSelected && !layer.locked ? e => onKeyDotPointerDown(e, fi) : undefined}
                          onPointerMove={isSelected ? onKeyDotPointerMove : undefined}
                          onPointerUp={isSelected ? onKeyDotPointerUp : undefined}
                          onClick={e => {
                            e.stopPropagation();
                            if (!layer.locked) { setSelectedId(layer.id); setSelectedFrame(fi); setTime(frame.time); setPlaying(false); }
                          }}
                          title={`${frame.time}%${isSelected ? ' — drag to move, ⇧ snap' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* ── inspector ── */}
        <aside className={styles.inspector}>

          {/* animation globals */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Animation</div>
            <label className={styles.control}>Duration (s)
              <input type="number" min="0.2" step="0.1" value={duration} onChange={e => setDuration(clamp(Number(e.target.value), 0.2, 20))} />
            </label>
            <label className={styles.control}>Global Easing
              <div className={styles.easingRow}>
                <select value={easing} onChange={e => setEasing(e.target.value)}>
                  {EASINGS.map(o => <option key={o}>{o}</option>)}
                  {!EASINGS.includes(easing) && <option value={easing}>{easing}</option>}
                </select>
                <button className={`${styles.curveBtn} ${bezierFor === 'global' ? styles.curveBtnOn : ''}`} onClick={() => setBezierFor(f => f === 'global' ? null : 'global')} title="Edit bezier curve">∿</button>
              </div>
            </label>
            {bezierFor === 'global' && <BezierEditor value={bezierValue} onChange={bezierChange} onClose={() => setBezierFor(null)} label="Global Easing" />}
            <label className={styles.control}>Stagger (s)
              <input type="number" min="0" max="2" step="0.05" value={stagger} onChange={e => setStagger(clamp(Number(e.target.value), 0, 2))} />
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={loop} onChange={e => setLoop(e.target.checked)} /> Loop animation
            </label>
          </section>

          {/* per-layer */}
          {selectedLayer && (
            <section className={styles.section}>
              <div className={styles.sectionTitle}>Layer — {selectedLayer.label}</div>
              <label className={styles.control}>Easing
                <div className={styles.easingRow}>
                  <select value={selectedLayer.easing || 'inherit'} onChange={e => updateLayer({ easing: e.target.value })}>
                    <option value="inherit">inherit global</option>
                    {EASINGS.map(o => <option key={o}>{o}</option>)}
                    {selectedLayer.easing && !EASINGS.includes(selectedLayer.easing) && selectedLayer.easing !== 'inherit' && (
                      <option value={selectedLayer.easing}>{selectedLayer.easing}</option>
                    )}
                  </select>
                  <button className={`${styles.curveBtn} ${bezierFor === 'layer' ? styles.curveBtnOn : ''}`} onClick={() => setBezierFor(f => f === 'layer' ? null : 'layer')} title="Edit bezier curve">∿</button>
                </div>
              </label>
              {bezierFor === 'layer' && <BezierEditor value={bezierValue} onChange={bezierChange} onClose={() => setBezierFor(null)} label={`${selectedLayer.label} Easing`} />}
              <label className={styles.control}>Delay (s)
                <input type="number" min="0" max="10" step="0.1" value={selectedLayer.delay || 0} onChange={e => updateLayer({ delay: clamp(Number(e.target.value), 0, 10) })} />
              </label>
              <div className={styles.motionPathWrap}>
                <label className={styles.check}>
                  <input type="checkbox" checked={!!selectedLayer.motionPath} onChange={e => updateLayer({ motionPath: e.target.checked ? 'M 0 150 Q 210 0 420 150' : '' })} />
                  Enable motion path
                </label>
                {selectedLayer.motionPath && (
                  <textarea
                    className={styles.motionPathInput}
                    value={selectedLayer.motionPath}
                    onChange={e => updateLayer({ motionPath: e.target.value })}
                    placeholder="SVG path d-attribute, e.g. M 0 0 C 100 0, 200 100, 300 0"
                    spellCheck={false}
                    rows={3}
                  />
                )}
              </div>
            </section>
          )}

          {/* keyframe editor */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Keyframe</div>
            <div className={styles.keyList}>
              {selectedFrames.map((frame, i) => (
                <button key={`${frame.time}-${i}`} className={i === selectedFrame ? styles.activeKey : ''} onClick={() => { setSelectedFrame(i); setTime(frame.time); }}>
                  {frame.time}%
                </button>
              ))}
            </div>
            <button className={styles.removeBtn} disabled={selectedFrames.length <= 1} onClick={removeKeyframe}>Remove Keyframe</button>

            <label className={styles.control}>Time %
              <input type="number" min="0" max="100" step="1" value={currentFrame.time} onChange={e => updateFrame({ time: clamp(Number(e.target.value), 0, 100) })} />
            </label>
            <div className={styles.controlGrid2}>
              <label className={styles.controlInline}>X <input type="number" step="1" value={currentFrame.x ?? 0} onChange={e => updateFrame({ x: Number(e.target.value) || 0 })} /></label>
              <label className={styles.controlInline}>Y <input type="number" step="1" value={currentFrame.y ?? 0} onChange={e => updateFrame({ y: Number(e.target.value) || 0 })} /></label>
              <label className={styles.controlInline}>Scale <input type="number" min="0" step="0.05" value={currentFrame.scale ?? 1} onChange={e => updateFrame({ scale: clamp(Number(e.target.value), 0, 10) })} /></label>
              <label className={styles.controlInline}>Rotate <input type="number" step="5" value={currentFrame.rotate ?? 0} onChange={e => updateFrame({ rotate: Number(e.target.value) || 0 })} /></label>
              <label className={styles.controlInline}>Opacity <input type="number" min="0" max="1" step="0.05" value={currentFrame.opacity ?? 1} onChange={e => updateFrame({ opacity: clamp(Number(e.target.value), 0, 1) })} /></label>
              <label className={styles.controlInline}>Fill <input type="color" value={currentFrame.fill || selectedLayer?.baseFill || '#7c3aed'} onChange={e => updateFrame({ fill: e.target.value })} /></label>
              <label className={styles.controlInline}>Blur (px) <input type="number" min="0" step="1" value={currentFrame.blur ?? 0} onChange={e => updateFrame({ blur: clamp(Number(e.target.value), 0, 50) })} /></label>
              <label className={styles.controlInline}>Brightness <input type="number" min="0" step="0.1" value={currentFrame.brightness ?? 1} onChange={e => updateFrame({ brightness: clamp(Number(e.target.value), 0, 5) })} /></label>
              <label className={styles.controlInline}>Dash <input type="number" min="0" step="10" value={currentFrame.strokeDash ?? 0} onChange={e => updateFrame({ strokeDash: clamp(Number(e.target.value), 0, 5000) })} /></label>
              <label className={styles.controlInline}>Offset <input type="number" step="10" value={currentFrame.strokeOffset ?? 0} onChange={e => updateFrame({ strokeOffset: Number(e.target.value) || 0 })} /></label>
            </div>

            <label className={styles.control} style={{ marginTop: 8 }}>Exit Easing
              <div className={styles.easingRow}>
                <select value={currentFrame.segEasing || ''} onChange={e => updateFrame({ segEasing: e.target.value })}>
                  <option value="">inherit</option>
                  {EASINGS.map(o => <option key={o}>{o}</option>)}
                  {currentFrame.segEasing && !EASINGS.includes(currentFrame.segEasing) && (
                    <option value={currentFrame.segEasing}>{currentFrame.segEasing}</option>
                  )}
                </select>
                <button className={`${styles.curveBtn} ${bezierFor === 'frame' ? styles.curveBtnOn : ''}`} onClick={() => setBezierFor(f => f === 'frame' ? null : 'frame')} title="Edit bezier curve">∿</button>
              </div>
            </label>
            {bezierFor === 'frame' && <BezierEditor value={bezierValue || easing} onChange={bezierChange} onClose={() => setBezierFor(null)} label={`Frame ${currentFrame.time}% Exit`} />}
          </section>

          {/* copy/paste keyframes */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Keyframe Clipboard</div>
            <div className={styles.copyRow}>
              <button onClick={() => setClipboardKf(selectedFrames.map(f => ({ ...f })))} title="Copy keyframes (Ctrl+C)">Copy Keyframes</button>
              <button disabled={!clipboardKf || !selectedId} onClick={() => commitKeyframes({ ...keyframes, [selectedId]: clipboardKf.map(f => ({ ...f })) })} title="Paste keyframes (Ctrl+V)">Paste to Layer</button>
            </div>
            {clipboardKf && <p className={styles.hint}>{clipboardKf.length} keyframe{clipboardKf.length !== 1 ? 's' : ''} in clipboard — select a layer and paste.</p>}
          </section>

          {/* export */}
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Export Code</div>
            <div className={styles.exportTabs}>
              {[['css', 'CSS'], ['gsap', 'GSAP'], ['scroll', 'ScrollTrigger'], ['framer', 'Framer'], ['lottie', 'Lottie']].map(([id, label]) => (
                <button key={id} className={`${styles.exportTab} ${exportTab === id ? styles.exportTabActive : ''}`} onClick={() => setExportTab(id)}>{label}</button>
              ))}
            </div>
            <div className={styles.copyRow}>
              <button onClick={() => copy(exportCode, exportTab)}>{copied === exportTab ? 'Copied!' : `Copy ${exportTab.toUpperCase()}`}</button>
              {exportTab === 'lottie' && (
                <button onClick={() => downloadFile('motion-export.json', lottieOutput, 'application/json')}>Download .json</button>
              )}
            </div>
            <textarea className={styles.output} value={exportCode} readOnly spellCheck={false} />
          </section>
        </aside>
      </div>

      {/* ── Delete confirmation modal ── */}
      {confirmDelete && (
        <div className={styles.modalOverlay} onClick={() => setConfirmDelete(null)}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
            </div>
            <p className={styles.modalTitle}>Delete project?</p>
            <p className={styles.modalDesc}>
              <strong>"{confirmDelete.name}"</strong> will be permanently deleted and cannot be recovered.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className={styles.modalConfirm} onClick={confirmDeleteProject}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
