'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import ForkToMyCodeButton from '@/components/ForkToMyCodeButton';
/* ── Helpers ──────────────────────────────────────────────────── */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isValidHex(h) { return /^#[0-9a-fA-F]{6}$/.test(h); }

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = n => Math.round(255 * f(n)).toString(16).padStart(2, '0');
  return `#${to(0)}${to(8)}${to(4)}`;
}

let _id = 0;
function mkId() { return ++_id; }

/* Per-blob effective radius & opacity (blobs can override the globals) */
function blobRadius(b, spread, W, H) {
  return Math.round(Math.max(W, H) * spread * 0.5 * (b.scale ?? 1));
}
function blobAlpha(b, opacity) {
  return ((b.op ?? opacity) / 100);
}
function blobBlur(b, blur) {
  return b.blur ?? blur;
}

/* Single radial-gradient layer string used by CSS / React / Tailwind exports */
function gradientLayers(blobs, spread, opacity) {
  return blobs.map(b => {
    const s = Math.round(spread * 200 * (b.scale ?? 1));
    const x = Math.round(b.x * 100);
    const y = Math.round(b.y * 100);
    return `radial-gradient(ellipse ${s}% ${s}% at ${x}% ${y}%, ${hexToRgba(b.color, blobAlpha(b, opacity).toFixed(2))} 0%, transparent 70%)`;
  });
}

/* Grayscale film-grain — inline SVG turbulence data URI for CSS/React */
function grainDataUri(grain) {
  const op = (grain / 100).toFixed(2);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='${op}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function buildSvgString(blobs, bgColor, blur, spread, opacity, grain, W, H) {
  const filters = blobs.map((b, i) =>
    `    <filter id="blur${i}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="${blobBlur(b, blur)}"/></filter>`
  ).join('\n');
  const circles = blobs.map((b, i) =>
    `  <circle cx="${Math.round(b.x * W)}" cy="${Math.round(b.y * H)}" r="${blobRadius(b, spread, W, H)}" fill="${b.color}" opacity="${blobAlpha(b, opacity).toFixed(2)}" filter="url(#blur${i})"/>`
  ).join('\n');
  const grainDefs = grain > 0
    ? `    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`
    : null;
  const grainRect = grain > 0
    ? `  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="${(grain / 100).toFixed(2)}"/>`
    : null;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`,
    `  <defs>`,
    filters,
    grainDefs,
    `  </defs>`,
    `  <rect width="${W}" height="${H}" fill="${bgColor}"/>`,
    circles,
    grainRect,
    `</svg>`,
  ].filter(Boolean).join('\n');
}

function buildCssString(blobs, bgColor, spread, opacity, grain) {
  const layers = gradientLayers(blobs, spread, opacity);
  if (grain > 0) layers.unshift(grainDataUri(grain));
  const stops = layers.map(l => `    ${l}`).join(',\n');
  return `.mesh-bg {\n  background-color: ${bgColor};\n  background-image:\n${stops};\n}`;
}

function buildReactString(blobs, bgColor, spread, opacity, grain) {
  const layers = gradientLayers(blobs, spread, opacity);
  if (grain > 0) layers.unshift(grainDataUri(grain));
  const bg = layers.join(', ').replace(/'/g, "\\'");
  return `export default function MeshBackground() {\n  return (\n    <div\n      style={{\n        width: '100%',\n        height: '100%',\n        backgroundColor: '${bgColor}',\n        backgroundImage:\n          '${bg}',\n      }}\n    />\n  );\n}`;
}

function buildTailwindString(blobs, bgColor, spread, opacity, grain) {
  const layers = gradientLayers(blobs, spread, opacity);
  if (grain > 0) layers.unshift(grainDataUri(grain));
  // Tailwind arbitrary values: no spaces — replace with underscores
  const img = layers.join(',').replace(/\s+/g, '_');
  return `<div class="h-full w-full bg-[${bgColor}] bg-[image:${img}]"></div>`;
}

/* ── Presets ──────────────────────────────────────────────────── */
const PRESETS = [
  { label: 'Aurora',  bgColor: '#060d1f', dot: '#4776e6',
    blobs: [{ x:0.2, y:0.2, color:'#4776e6' },{ x:0.8, y:0.25, color:'#8e54e9' },{ x:0.5, y:0.8, color:'#43e97b' },{ x:0.1, y:0.75, color:'#38f9d7' }] },
  { label: 'Sunset',  bgColor: '#1a0800', dot: '#f7971e',
    blobs: [{ x:0.2, y:0.3,  color:'#f7971e' },{ x:0.75,y:0.2,  color:'#ff6b6b' },{ x:0.6, y:0.8,  color:'#ff0844' },{ x:0.15,y:0.8,  color:'#ffd200' }] },
  { label: 'Ocean',   bgColor: '#020c18', dot: '#0093e9',
    blobs: [{ x:0.3, y:0.2,  color:'#0093e9' },{ x:0.8, y:0.5,  color:'#80d0c7' },{ x:0.2, y:0.75, color:'#764ba2' },{ x:0.7, y:0.85, color:'#43b89c' }] },
  { label: 'Neon',    bgColor: '#0a0014', dot: '#00ff88',
    blobs: [{ x:0.25,y:0.25, color:'#00ff88' },{ x:0.75,y:0.25, color:'#ff00ff' },{ x:0.5, y:0.7,  color:'#00ccff' },{ x:0.15,y:0.75, color:'#ff6600' }] },
  { label: 'Pastel',  bgColor: '#f0ebff', dot: '#c9b8f4',
    blobs: [{ x:0.2, y:0.2,  color:'#c9b8f4' },{ x:0.8, y:0.3,  color:'#f7b8d3' },{ x:0.5, y:0.75, color:'#b8e4f7' },{ x:0.15,y:0.7,  color:'#b8f7c8' }] },
  { label: 'Dusk',    bgColor: '#1a0522', dot: '#c471ed',
    blobs: [{ x:0.3, y:0.2,  color:'#c471ed' },{ x:0.8, y:0.4,  color:'#12c2e9' },{ x:0.15,y:0.7,  color:'#f64f59' },{ x:0.7, y:0.8,  color:'#f093fb' }] },
];

const RATIOS = [
  { label: '16:10', w: 800, h: 500 },
  { label: '16:9',  w: 960, h: 540 },
  { label: '1:1',   w: 700, h: 700 },
  { label: '4:3',   w: 800, h: 600 },
  { label: '9:16',  w: 540, h: 960 },
];

const HARMONIES = [
  { value: 'random',        label: 'Random' },
  { value: 'analogous',     label: 'Analogous' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'triad',         label: 'Triadic' },
  { value: 'mono',          label: 'Monochrome' },
];

const RAND_COLORS = ['#4776e6','#8e54e9','#43e97b','#38f9d7','#f093fb','#f5576c','#fda085','#667eea','#764ba2','#43b89c','#0093e9','#80d0c7','#c471ed','#12c2e9','#ff6600','#ffd200'];
const DEFAULT = PRESETS[0];
const CUSTOM_KEY = 'mesh_custom_presets';

function makeBlobs(preset) { return preset.blobs.map(b => ({ ...b, scale: 1, op: null, id: mkId() })); }

function harmonyColors(n, harmony) {
  if (harmony === 'random') {
    const shuffled = [...RAND_COLORS].sort(() => Math.random() - 0.5);
    return Array.from({ length: n }, (_, i) => shuffled[i % shuffled.length]);
  }
  const base = Math.floor(Math.random() * 360);
  return Array.from({ length: n }, (_, i) => {
    let h, s = 72, l = 58;
    if (harmony === 'analogous')          h = base + (i - (n - 1) / 2) * 28;
    else if (harmony === 'complementary') h = base + (i % 2) * 180 + (i * 6);
    else if (harmony === 'triad')         h = base + (i % 3) * 120;
    else /* mono */                     { h = base; s = 62; l = 32 + (i * 46) / Math.max(1, n - 1); }
    return hslToHex(((h % 360) + 360) % 360, s, l);
  });
}

/* Compact serialisable snapshot of the whole design (no React ids) */
function snapshotOf(blobs, bgColor, blur, spread, opacity, grain, W, H) {
  return {
    blobs: blobs.map(b => ({ x: +b.x.toFixed(4), y: +b.y.toFixed(4), color: b.color, scale: b.scale ?? 1, op: b.op ?? null, blur: b.blur ?? null })),
    bgColor, blur, spread, opacity, grain, w: W, h: H,
  };
}
function encodeState(s)  { return btoa(unescape(encodeURIComponent(JSON.stringify(s)))); }
function decodeState(str){ return JSON.parse(decodeURIComponent(escape(atob(str)))); }

/* ── Component ──────────────────────────────────────────────────── */
export default function MeshGradientGeneratorTool() {
  const [blobs,      setBlobs]      = useState(() => makeBlobs(DEFAULT));
  const [bgColor,    setBgColor]    = useState(DEFAULT.bgColor);
  const [bgRaw,      setBgRaw]      = useState(DEFAULT.bgColor);
  const [blur,       setBlur]       = useState(80);
  const [spread,     setSpread]     = useState(0.5);
  const [opacity,    setOpacity]    = useState(85);
  const [grain,      setGrain]      = useState(0);
  const [ratio,      setRatio]      = useState(RATIOS[0]);
  const [harmony,    setHarmony]    = useState('random');
  const [preset,     setPreset]     = useState('Aurora');
  const [activeBlob, setActiveBlob] = useState(null);
  const [tab,        setTab]        = useState('svg');
  const [copied,     setCopied]     = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [imgFormat,  setImgFormat]  = useState('png');
  const [pngSize,    setPngSize]    = useState('1600x1000');
  const [pngCustomW, setPngCustomW] = useState(1600);
  const [pngCustomH, setPngCustomH] = useState(1000);
  const [customPresets, setCustomPresets] = useState([]);
  const [histVer,    setHistVer]    = useState(0);

  const W = ratio.w;
  const H = ratio.h;

  const svgRef      = useRef(null);
  const draggingRef = useRef(null);
  const histRef     = useRef(null);
  const restoringRef = useRef(false);

  /* ── Load custom presets + shared state on mount ── */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
      if (Array.isArray(saved)) setCustomPresets(saved);
    } catch {}
    try {
      const params = new URLSearchParams(window.location.search);
      const g = params.get('g');
      if (g) applySnapshot(decodeState(g), true);
    } catch {}
  }, []); // eslint-disable-line

  /* ── Drag (pointer events → mouse, touch, pen) ── */
  function getSvgPos(e) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0.5, y: 0.5 };
    return {
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
    };
  }

  function handleBlobPointerDown(e, id) {
    e.preventDefault();
    e.stopPropagation();
    const pos  = getSvgPos(e);
    const blob = blobs.find(b => b.id === id);
    draggingRef.current = { id, ox: pos.x - blob.x, oy: pos.y - blob.y };
    setActiveBlob(id);
  }

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current) return;
      const { id, ox, oy } = draggingRef.current;
      const pos = getSvgPos(e);
      setBlobs(prev => prev.map(b => b.id === id
        ? { ...b, x: Math.max(0.02, Math.min(0.98, pos.x - ox)), y: Math.max(0.02, Math.min(0.98, pos.y - oy)) }
        : b
      ));
    }
    function onUp() { draggingRef.current = null; }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []); // eslint-disable-line

  /* ── Arrow-key nudge for active blob ── */
  useEffect(() => {
    if (activeBlob == null) return;
    function onKey(e) {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const step = e.shiftKey ? 0.05 : 0.01;
      let dx = 0, dy = 0;
      if (e.key === 'ArrowLeft')       dx = -step;
      else if (e.key === 'ArrowRight') dx = step;
      else if (e.key === 'ArrowUp')    dy = -step;
      else if (e.key === 'ArrowDown')  dy = step;
      else return;
      e.preventDefault();
      setBlobs(prev => prev.map(b => b.id === activeBlob
        ? { ...b, x: Math.max(0.02, Math.min(0.98, b.x + dx)), y: Math.max(0.02, Math.min(0.98, b.y + dy)) }
        : b
      ));
      setPreset('');
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeBlob]);

  /* ── History (undo / redo) ── */
  const snap = useMemo(
    () => snapshotOf(blobs, bgColor, blur, spread, opacity, grain, W, H),
    [blobs, bgColor, blur, spread, opacity, grain, W, H]
  );
  const snapStr = JSON.stringify(snap);

  useEffect(() => {
    if (!histRef.current) { histRef.current = { stack: [snapStr], idx: 0 }; return; }
    if (restoringRef.current) { restoringRef.current = false; return; }
    const t = setTimeout(() => {
      const h = histRef.current;
      if (h.stack[h.idx] === snapStr) return;
      h.stack = h.stack.slice(0, h.idx + 1);
      h.stack.push(snapStr);
      if (h.stack.length > 60) h.stack.shift();
      h.idx = h.stack.length - 1;
      setHistVer(v => v + 1);
    }, 350);
    return () => clearTimeout(t);
  }, [snapStr]);

  function applySnapshot(s, isShare) {
    restoringRef.current = !isShare; // shared state should start a fresh history entry
    setBlobs(s.blobs.map(b => ({ x: b.x, y: b.y, color: b.color, scale: b.scale ?? 1, op: b.op ?? null, blur: b.blur ?? null, id: mkId() })));
    setBgColor(s.bgColor); setBgRaw(s.bgColor);
    setBlur(s.blur); setSpread(s.spread); setOpacity(s.opacity); setGrain(s.grain ?? 0);
    setRatio(RATIOS.find(r => r.w === s.w && r.h === s.h) || { label: 'custom', w: s.w, h: s.h });
    setPreset(''); setActiveBlob(null);
  }

  function undo() {
    const h = histRef.current;
    if (!h || h.idx <= 0) return;
    h.idx -= 1; applySnapshot(JSON.parse(h.stack[h.idx]), false);
    setHistVer(v => v + 1);
  }
  function redo() {
    const h = histRef.current;
    if (!h || h.idx >= h.stack.length - 1) return;
    h.idx += 1; applySnapshot(JSON.parse(h.stack[h.idx]), false);
    setHistVer(v => v + 1);
  }
  const canUndo = histRef.current ? histRef.current.idx > 0 : false;
  const canRedo = histRef.current ? histRef.current.idx < histRef.current.stack.length - 1 : false;

  useEffect(() => {
    function onKey(e) {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((k === 'z' && e.shiftKey) || k === 'y') { e.preventDefault(); redo(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }); // re-bind each render so undo/redo see latest histRef

  /* ── Blob ops ── */
  function addBlob() {
    if (blobs.length >= 8) return;
    const color = RAND_COLORS[Math.floor(Math.random() * RAND_COLORS.length)];
    const id    = mkId();
    setBlobs(prev => [...prev, { id, x: 0.2 + Math.random() * 0.6, y: 0.2 + Math.random() * 0.6, color, scale: 1, op: null }]);
    setActiveBlob(id);
    setPreset('');
  }
  function removeBlob(id) {
    if (blobs.length <= 2) return;
    setBlobs(prev => prev.filter(b => b.id !== id));
    if (activeBlob === id) setActiveBlob(null);
    setPreset('');
  }
  function updateColor(id, color) {
    setBlobs(prev => prev.map(b => b.id === id ? { ...b, color } : b));
    setPreset('');
  }
  function updateBlob(id, patch) {
    setBlobs(prev => prev.map(b => b.id === id ? { ...b, ...patch } : b));
    setPreset('');
  }

  function applyPreset(p) {
    setBlobs(makeBlobs(p));
    setBgColor(p.bgColor); setBgRaw(p.bgColor);
    if (p.blur != null)   setBlur(p.blur);
    if (p.spread != null) setSpread(p.spread);
    if (p.opacity != null) setOpacity(p.opacity);
    setGrain(p.grain ?? 0);
    if (p.w && p.h) setRatio(RATIOS.find(r => r.w === p.w && r.h === p.h) || { label: 'custom', w: p.w, h: p.h });
    setPreset(p.label); setActiveBlob(null);
  }

  function randomize() {
    const colors = harmonyColors(blobs.length, harmony);
    setBlobs(prev => prev.map((b, i) => ({
      ...b,
      x: 0.05 + Math.random() * 0.9,
      y: 0.05 + Math.random() * 0.9,
      color: colors[i % colors.length],
    })));
    setPreset('');
  }

  function reset() {
    setRatio(RATIOS[0]); setGrain(0);
    applyPreset(DEFAULT); setBlur(80); setSpread(0.5); setOpacity(85);
  }

  /* ── Custom presets ── */
  function saveCustomPreset() {
    const s = snapshotOf(blobs, bgColor, blur, spread, opacity, grain, W, H);
    const entry = { label: `Custom ${customPresets.length + 1}`, dot: blobs[0]?.color || '#888', ...s };
    const next = [...customPresets, entry];
    setCustomPresets(next);
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(next)); } catch {}
    setPreset(entry.label);
  }
  function deleteCustomPreset(label) {
    const next = customPresets.filter(p => p.label !== label);
    setCustomPresets(next);
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(next)); } catch {}
  }

  /* ── Code ── */
  const svgString = useMemo(() => buildSvgString(blobs, bgColor, blur, spread, opacity, grain, W, H), [blobs, bgColor, blur, spread, opacity, grain, W, H]);
  const cssString = useMemo(() => buildCssString(blobs, bgColor, spread, opacity, grain), [blobs, bgColor, spread, opacity, grain]);
  const reactString = useMemo(() => buildReactString(blobs, bgColor, spread, opacity, grain), [blobs, bgColor, spread, opacity, grain]);
  const twString  = useMemo(() => buildTailwindString(blobs, bgColor, spread, opacity, grain), [blobs, bgColor, spread, opacity, grain]);
  const outputText = { svg: svgString, css: cssString, react: reactString, tailwind: twString }[tab];
  const codeLang = { svg: 'svg', css: 'css', react: 'jsx', tailwind: 'html' }[tab];

  function copy() {
    navigator.clipboard.writeText(outputText);
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  }

  function copyShareLink() {
    try {
      const s = snapshotOf(blobs, bgColor, blur, spread, opacity, grain, W, H);
      const url = `${window.location.origin}${window.location.pathname}?g=${encodeState(s)}`;
      navigator.clipboard.writeText(url);
      setShareCopied(true); setTimeout(() => setShareCopied(false), 1800);
    } catch {}
  }

  /* ── Downloads ── */
  function downloadSvg() {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'mesh-gradient.svg'; a.click();
    URL.revokeObjectURL(url);
  }

  const PNG_PRESETS = [
    { label: `${W}×${H} (canvas)`, value: `${W}x${H}` },
    { label: '1600×1000', value: '1600x1000' },
    { label: '1920×1080', value: '1920x1080' },
    { label: '2560×1600', value: '2560x1600' },
    { label: '3200×2000', value: '3200x2000' },
    { label: 'Custom',    value: 'custom'    },
  ];

  function getPngDims() {
    if (pngSize === 'custom') return { w: Math.max(1, pngCustomW), h: Math.max(1, pngCustomH) };
    const [w, h] = pngSize.split('x').map(Number);
    return { w, h };
  }

  function downloadRaster() {
    const { w, h } = getPngDims();
    const mime = imgFormat === 'jpg' ? 'image/jpeg' : imgFormat === 'webp' ? 'image/webp' : 'image/png';
    const ext  = imgFormat === 'jpg' ? 'jpg' : imgFormat;
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (imgFormat === 'jpg') { ctx.fillStyle = bgColor; ctx.fillRect(0, 0, w, h); } // JPG has no alpha
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.download = `mesh-gradient-${w}x${h}.${ext}`;
      a.href = canvas.toDataURL(mime, 0.92); a.click();
    };
    img.src = url;
  }

  /* ── Render ── */
  const active = blobs.find(b => b.id === activeBlob) || null;

  // Fork to My Code: the mesh as a full-page hero background (the CSS export, unchanged)
  const forkSnippet = () => ({
    name: 'Mesh Gradient Hero',
    html: `<section class="mesh-bg hero">
  <h1>Mesh gradient background</h1>
  <p>Made with the Mesh Gradient Generator on webdevpuneet.com</p>
</section>`,
    css: `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }

.hero {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 12px;
  padding: 48px 24px;
  text-align: center;
  color: #fff;
}
.hero h1 { margin: 0; font-size: clamp(28px, 6vw, 56px); line-height: 1.1; }
.hero p { margin: 0; font-size: 17px; opacity: 0.85; }

/* The mesh gradient you built */
${cssString}`,
  });

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="mesh-gradient-generator" />
      {/* ── Body ── */}
      <div className={styles.body}>

        {/* ── Left: Controls ── */}
        <div className={styles.blobPanel}>

          {/* Title, live value and actions pinned at the top of the panel */}
          <div className={styles.sideTop}>
            <div className={styles.sideTitleRow}>
              <div className={styles.logoIcon}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="7" fill="#060d1f"/>
            <defs><filter id="hb" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter></defs>
            <circle cx="10" cy="10" r="12" fill="#4776e6" opacity="0.85" filter="url(#hb)"/>
            <circle cx="24" cy="10" r="10" fill="#8e54e9" opacity="0.85" filter="url(#hb)"/>
            <circle cx="16" cy="24" r="11" fill="#43e97b" opacity="0.85" filter="url(#hb)"/>
          </svg>
        </div>
              <div className={styles.headerTitle}><strong className={styles.accent}>Mesh</strong> <span className={styles.accent2}>Gradient</span> Generator</div>
            </div>
            <code className={styles.sideCode} title={`${blobs.length} blobs · blur ${blur}px · spread ${Math.round(spread * 100)}%${grain > 0 ? ` · grain ${grain}%` : ''}`}>{`${blobs.length} blobs · blur ${blur}px · spread ${Math.round(spread * 100)}%${grain > 0 ? ` · grain ${grain}%` : ''}`}</code>
            <div className={styles.sideActions}>
              <div className={styles.sideBtnRow}>
                <button className={styles.histBtn} onClick={undo} disabled={!canUndo} aria-label="Undo" title="Undo (Ctrl+Z)">↶</button>
                <button className={styles.histBtn} onClick={redo} disabled={!canRedo} aria-label="Redo" title="Redo (Ctrl+Shift+Z)">↷</button>
                <button className={styles.randomBtn} onClick={randomize} aria-label="Randomize blob positions and colors">⟳ Randomize</button>
                <button className={styles.resetBtn} onClick={reset} aria-label="Reset to default gradient">Reset</button>
              </div>
              <ForkToMyCodeButton getSnippet={forkSnippet} />
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Presets</div>
            <div className={styles.presetGrid}>
              {PRESETS.map(p => (
                <button key={p.label}
                  className={`${styles.presetBtn} ${preset === p.label ? styles.presetBtnActive : ''}`}
                  onClick={() => applyPreset(p)}>
                  <span className={styles.presetDot} style={{ background: p.dot }} />
                  {p.label}
                </button>
              ))}
            </div>
            {customPresets.length > 0 && (
              <div className={styles.customList}>
                {customPresets.map(p => (
                  <div key={p.label} className={`${styles.customRow} ${preset === p.label ? styles.presetBtnActive : ''}`}>
                    <button className={styles.customApply} onClick={() => applyPreset(p)}>
                      <span className={styles.presetDot} style={{ background: p.dot }} />
                      {p.label}
                    </button>
                    <button className={styles.blobRemoveBtn} onClick={() => deleteCustomPreset(p.label)} aria-label={`Delete ${p.label}`}>×</button>
                  </div>
                ))}
              </div>
            )}
            <button className={styles.addBlobBtn} onClick={saveCustomPreset} style={{ marginTop: customPresets.length ? 6 : 8 }}>★ Save current</button>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Canvas</div>
            <div className={styles.ratioGrid}>
              {RATIOS.map(r => (
                <button key={r.label}
                  className={`${styles.ratioBtn} ${ratio.w === r.w && ratio.h === r.h ? styles.ratioBtnActive : ''}`}
                  onClick={() => setRatio(r)}>{r.label}</button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Blobs ({blobs.length}/8)</div>
            <div className={styles.blobList}>
              {blobs.map((b, i) => (
                <div key={b.id}
                  className={`${styles.blobRow} ${activeBlob === b.id ? styles.blobRowActive : ''}`}
                  onClick={() => setActiveBlob(b.id)}>
                  <input type="color" className={styles.blobColorPicker}
                    value={b.color}
                    aria-label={`Blob ${i + 1} color`}
                    onChange={e => updateColor(b.id, e.target.value)}
                    onClick={e => e.stopPropagation()} />
                  <span className={styles.blobLabel}>
                    Blob {i + 1} · {Math.round(b.x * 100)}%,{Math.round(b.y * 100)}%
                  </span>
                  <button className={styles.blobRemoveBtn}
                    disabled={blobs.length <= 2}
                    aria-label={`Remove blob ${i + 1}`}
                    onClick={e => { e.stopPropagation(); removeBlob(b.id); }}>×</button>
                </div>
              ))}
            </div>
            <button className={styles.addBlobBtn}
              disabled={blobs.length >= 8}
              onClick={addBlob}>+ Add blob</button>

            {active && (
              <div className={styles.blobEditor}>
                <div className={styles.blobEditorTitle}>Selected blob — Blob {blobs.findIndex(b => b.id === active.id) + 1}</div>

                <div className={styles.colorRow} style={{ marginBottom: 10 }}>
                  <span className={styles.label}>Color</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="color" className={styles.colorPicker}
                      value={active.color}
                      aria-label="Selected blob color"
                      onChange={e => updateColor(active.id, e.target.value)} />
                    <input type="text" className={styles.hexInput}
                      value={active.color}
                      aria-label="Selected blob hex color"
                      onChange={e => { if (isValidHex(e.target.value)) updateColor(active.id, e.target.value); }}
                      maxLength={7} />
                  </div>
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.labelRow}>
                    <span className={styles.label}>X position</span>
                    <span className={styles.valBadge}>{Math.round(active.x * 100)}%</span>
                  </div>
                  <input type="range" className={styles.slider}
                    value={active.x} min={0.02} max={0.98} step={0.01}
                    aria-label="Blob X position"
                    onChange={e => updateBlob(active.id, { x: Number(e.target.value) })} />
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.labelRow}>
                    <span className={styles.label}>Y position</span>
                    <span className={styles.valBadge}>{Math.round(active.y * 100)}%</span>
                  </div>
                  <input type="range" className={styles.slider}
                    value={active.y} min={0.02} max={0.98} step={0.01}
                    aria-label="Blob Y position"
                    onChange={e => updateBlob(active.id, { y: Number(e.target.value) })} />
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.labelRow}>
                    <span className={styles.label}>Size</span>
                    <span className={styles.valBadge}>{Math.round((active.scale ?? 1) * 100)}%</span>
                  </div>
                  <input type="range" className={styles.slider}
                    value={active.scale ?? 1} min={0.4} max={1.8} step={0.05}
                    aria-label="Blob size"
                    onChange={e => updateBlob(active.id, { scale: Number(e.target.value) })} />
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.labelRow}>
                    <span className={styles.label}>Blur{active.blur == null ? ' (global)' : ''}</span>
                    <span className={styles.valBadge}>{active.blur ?? blur}px</span>
                  </div>
                  <input type="range" className={styles.slider}
                    value={active.blur ?? blur} min={10} max={150} step={5}
                    aria-label="Blob blur"
                    onChange={e => updateBlob(active.id, { blur: Number(e.target.value) })} />
                </div>

                <div className={styles.sliderRow}>
                  <div className={styles.labelRow}>
                    <span className={styles.label}>Opacity{active.op == null ? ' (global)' : ''}</span>
                    <span className={styles.valBadge}>{active.op ?? opacity}%</span>
                  </div>
                  <input type="range" className={styles.slider}
                    value={active.op ?? opacity} min={20} max={100} step={5}
                    aria-label="Blob opacity"
                    onChange={e => updateBlob(active.id, { op: Number(e.target.value) })} />
                </div>

                {(active.op != null || active.blur != null || (active.scale ?? 1) !== 1) && (
                  <button className={styles.resetInline}
                    onClick={() => updateBlob(active.id, { op: null, blur: null, scale: 1 })}>
                    Reset blob overrides
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Background</div>
            <div className={styles.colorRow}>
              <span className={styles.label}>Color</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="color" className={styles.colorPicker}
                  value={bgColor}
                  aria-label="Background color"
                  onChange={e => { setBgColor(e.target.value); setBgRaw(e.target.value); }} />
                <input type="text" className={styles.hexInput}
                  value={bgRaw}
                  aria-label="Background hex color"
                  onChange={e => { setBgRaw(e.target.value); if (isValidHex(e.target.value)) setBgColor(e.target.value); }}
                  onBlur={() => setBgRaw(bgColor)}
                  maxLength={7} />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Settings</div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Blur</span>
                <span className={styles.valBadge}>{blur}px</span>
              </div>
              <input type="range" className={styles.slider}
                value={blur} min={10} max={150} step={5}
                aria-label="Blur" aria-valuetext={`${blur}px`}
                onChange={e => setBlur(Number(e.target.value))} />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Spread</span>
                <span className={styles.valBadge}>{Math.round(spread * 100)}%</span>
              </div>
              <input type="range" className={styles.slider}
                value={spread} min={0.2} max={0.9} step={0.05}
                aria-label="Spread" aria-valuetext={`${Math.round(spread * 100)}%`}
                onChange={e => setSpread(Number(e.target.value))} />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Opacity</span>
                <span className={styles.valBadge}>{opacity}%</span>
              </div>
              <input type="range" className={styles.slider}
                value={opacity} min={30} max={100} step={5}
                aria-label="Opacity" aria-valuetext={`${opacity}%`}
                onChange={e => setOpacity(Number(e.target.value))} />
            </div>

            <div className={styles.sliderRow}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Grain</span>
                <span className={styles.valBadge}>{grain}%</span>
              </div>
              <input type="range" className={styles.slider}
                value={grain} min={0} max={60} step={2}
                aria-label="Grain" aria-valuetext={`${grain}%`}
                onChange={e => setGrain(Number(e.target.value))} />
            </div>

            <div className={styles.selectRow}>
              <span className={styles.label}>Randomize style</span>
              <select className={styles.miniSelect} value={harmony}
                aria-label="Randomize color harmony"
                onChange={e => setHarmony(e.target.value)}>
                {HARMONIES.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── Center: SVG Preview ── */}
        <div className={styles.previewPane}>
          {/* Ad space: top of the preview column */}
          <PlaygroundTopAd />
          <div className={styles.previewArea}>
            <div className={styles.svgWrap} style={{ aspectRatio: `${W} / ${H}` }}>
              <svg
                ref={svgRef}
                viewBox={`0 0 ${W} ${H}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block', width: '100%', height: '100%' }}
              >
                <defs>
                  {blobs.map((b, i) => (
                    <filter key={`f-${b.id}`} id={`meshBlurLive${i}`} x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation={blobBlur(b, blur)} />
                    </filter>
                  ))}
                  {grain > 0 && (
                    <filter id="meshGrainLive">
                      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                      <feColorMatrix type="saturate" values="0" />
                    </filter>
                  )}
                </defs>
                <rect width={W} height={H} fill={bgColor} />
                {blobs.map((b, i) => (
                  <circle key={b.id}
                    cx={b.x * W} cy={b.y * H} r={blobRadius(b, spread, W, H)}
                    fill={b.color} opacity={blobAlpha(b, opacity).toFixed(2)}
                    filter={`url(#meshBlurLive${i})`} />
                ))}
                {grain > 0 && (
                  <rect width={W} height={H} filter="url(#meshGrainLive)" opacity={(grain / 100).toFixed(2)} />
                )}
                {/* Drag handles */}
                {blobs.map((b, i) => {
                  const isActive = activeBlob === b.id;
                  return (
                    <g key={`h-${b.id}`}
                      style={{ cursor: 'grab', touchAction: 'none' }}
                      role="button"
                      aria-label={`Drag blob ${i + 1}`}
                      onPointerDown={e => handleBlobPointerDown(e, b.id)}>
                      <circle
                        cx={b.x * W} cy={b.y * H}
                        r={isActive ? 17 : 13}
                        fill={b.color}
                        stroke="white"
                        strokeWidth={isActive ? 2.5 : 1.5}
                        opacity={isActive ? 0.95 : 0.8}
                      />
                      <circle cx={b.x * W} cy={b.y * H} r={isActive ? 5 : 4}
                        fill="white" opacity={0.9} />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* ── Right: Export ── */}
        <div className={styles.exportPane}>
          <div className={styles.tabs}>
            {['svg', 'css', 'react', 'tailwind'].map(t => (
              <button key={t}
                className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
                onClick={() => setTab(t)}>
                {t === 'react' ? 'React' : t === 'tailwind' ? 'Tailwind' : t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className={styles.exportBody}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>{codeLang}</span>
              <button
                className={`${styles.codeCopyBtn} ${copied ? styles.codeCopyBtnCopied : ''}`}
                onClick={copy}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <div className={styles.codeScroll}>
              <pre className={styles.codeBlock}>{outputText}</pre>
            </div>

            <div className={styles.downloadSection}>
              <button className={`${styles.shareBtn} ${shareCopied ? styles.shareBtnDone : ''}`} onClick={copyShareLink}>
                {shareCopied ? '✓ Link copied' : '🔗 Copy shareable link'}
              </button>

              <div className={styles.downloadTitle}>Download</div>
              <div className={styles.dlRow}>
                <button className={`${styles.dlBtn} ${styles.dlBtnPrimary}`} onClick={downloadSvg}>↓ SVG</button>
                <button className={styles.dlBtn} onClick={downloadRaster}>↓ {imgFormat.toUpperCase()}</button>
              </div>
              <div className={styles.pngSizeRow}>
                <span className={styles.pngSizeLabel}>Format</span>
                <select className={styles.pngSizeSelect} value={imgFormat}
                  aria-label="Raster export format"
                  onChange={e => setImgFormat(e.target.value)}>
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <div className={styles.pngSizeRow}>
                <span className={styles.pngSizeLabel}>Size</span>
                <select
                  className={styles.pngSizeSelect}
                  value={pngSize}
                  aria-label="Raster export size"
                  onChange={e => setPngSize(e.target.value)}>
                  {PNG_PRESETS.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              {pngSize === 'custom' && (
                <div className={styles.pngCustomRow}>
                  <input
                    type="number" className={styles.pngDimInput}
                    value={pngCustomW} min={100} max={8000}
                    aria-label="Custom width"
                    onChange={e => setPngCustomW(Number(e.target.value))}
                    placeholder="W" />
                  <span className={styles.pngDimSep}>×</span>
                  <input
                    type="number" className={styles.pngDimInput}
                    value={pngCustomH} min={100} max={8000}
                    aria-label="Custom height"
                    onChange={e => setPngCustomH(Number(e.target.value))}
                    placeholder="H" />
                  <span className={styles.pngDimUnit}>px</span>
                </div>
              )}
              <div className={styles.dlNote}>SVG is infinitely scalable · Raster at {pngSize === 'custom' ? `${pngCustomW}×${pngCustomH}` : pngSize.replace('x', '×')}px</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
