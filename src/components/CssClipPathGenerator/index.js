'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ─── Preset shapes ────────────────────────────────────────────────────── */
const PRESETS = [
  // Basic polygons
  { id: 'triangle',      label: 'Triangle',       mode: 'polygon', points: [[50,0],[100,100],[0,100]] },
  { id: 'rtriangle',     label: 'Right Triangle', mode: 'polygon', points: [[0,0],[100,100],[0,100]] },
  { id: 'rectangle',     label: 'Rectangle',      mode: 'polygon', points: [[0,0],[100,0],[100,100],[0,100]] },
  { id: 'trapezoid',     label: 'Trapezoid',      mode: 'polygon', points: [[20,0],[80,0],[100,100],[0,100]] },
  { id: 'parallelogram', label: 'Parallelogram',  mode: 'polygon', points: [[25,0],[100,0],[75,100],[0,100]] },
  { id: 'diamond',       label: 'Rhombus',        mode: 'polygon', points: [[50,0],[100,50],[50,100],[0,50]] },
  { id: 'bevel',         label: 'Bevel',          mode: 'polygon', points: [[30,0],[70,0],[100,30],[100,70],[70,100],[30,100],[0,70],[0,30]] },
  // Polygons by side count
  { id: 'pentagon',      label: 'Pentagon',       mode: 'polygon', points: [[50,0],[98,35],[79,91],[21,91],[2,35]] },
  { id: 'hexagon',       label: 'Hexagon',        mode: 'polygon', points: [[50,0],[93,25],[93,75],[50,100],[7,75],[7,25]] },
  { id: 'heptagon',      label: 'Heptagon',       mode: 'polygon', points: [[50,0],[89,19],[99,61],[72,95],[28,95],[1,61],[11,19]] },
  { id: 'octagon',       label: 'Octagon',        mode: 'polygon', points: [[50,0],[85,15],[100,50],[85,85],[50,100],[15,85],[0,50],[15,15]] },
  { id: 'nonagon',       label: 'Nonagon',        mode: 'polygon', points: [[50,0],[82,12],[99,41],[93,75],[67,97],[33,97],[7,75],[1,41],[18,12]] },
  { id: 'decagon',       label: 'Decagon',        mode: 'polygon', points: [[50,0],[79,10],[98,35],[98,65],[79,90],[50,100],[21,90],[2,65],[2,35],[21,10]] },
  // Stars & special
  { id: 'star',          label: 'Star 5',         mode: 'polygon', points: [[50,0],[62,34],[98,35],[69,56],[79,90],[50,70],[21,90],[31,56],[2,35],[38,34]] },
  { id: 'star4',         label: 'Star 4',         mode: 'polygon', points: [[50,0],[64,36],[100,50],[64,64],[50,100],[36,64],[0,50],[36,36]] },
  { id: 'star6',         label: 'Star 6',         mode: 'polygon', points: [[50,0],[60,33],[93,25],[70,50],[93,75],[60,67],[50,100],[40,67],[7,75],[30,50],[7,25],[40,33]] },
  { id: 'cross',         label: 'Cross',          mode: 'polygon', points: [[33,0],[67,0],[67,33],[100,33],[100,67],[67,67],[67,100],[33,100],[33,67],[0,67],[0,33],[33,33]] },
  { id: 'close',         label: 'Close',          mode: 'polygon', points: [[20,0],[50,30],[80,0],[100,20],[70,50],[100,80],[80,100],[50,70],[20,100],[0,80],[30,50],[0,20]] },
  // Arrows & directional
  { id: 'rightArrow',    label: 'Right Arrow',    mode: 'polygon', points: [[0,35],[60,35],[60,0],[100,50],[60,100],[60,65],[0,65]] },
  { id: 'leftArrow',     label: 'Left Arrow',     mode: 'polygon', points: [[100,35],[40,35],[40,0],[0,50],[40,100],[40,65],[100,65]] },
  { id: 'upArrow',       label: 'Up Arrow',       mode: 'polygon', points: [[35,100],[35,45],[0,45],[50,0],[100,45],[65,45],[65,100]] },
  { id: 'downArrow',     label: 'Down Arrow',     mode: 'polygon', points: [[35,0],[35,55],[0,55],[50,100],[100,55],[65,55],[65,0]] },
  { id: 'rightPoint',    label: 'Right Point',    mode: 'polygon', points: [[0,0],[70,0],[100,50],[70,100],[0,100]] },
  { id: 'leftPoint',     label: 'Left Point',     mode: 'polygon', points: [[30,0],[100,0],[100,100],[30,100],[0,50]] },
  { id: 'rightChevron',  label: 'Right Chevron',  mode: 'polygon', points: [[0,0],[75,0],[100,50],[75,100],[0,100],[25,50]] },
  { id: 'leftChevron',   label: 'Left Chevron',   mode: 'polygon', points: [[100,0],[25,0],[0,50],[25,100],[100,100],[75,50]] },
  { id: 'upChevron',     label: 'Up Chevron',     mode: 'polygon', points: [[0,100],[0,75],[50,0],[100,75],[100,100],[50,25]] },
  { id: 'downChevron',   label: 'Down Chevron',   mode: 'polygon', points: [[0,0],[0,25],[50,100],[100,25],[100,0],[50,75]] },
  // Callouts & decorative
  { id: 'message',       label: 'Chat Bubble',    mode: 'polygon', points: [[0,0],[100,0],[100,75],[60,75],[50,100],[40,75],[0,75]] },
  { id: 'speechRight',   label: 'Speech Right',   mode: 'polygon', points: [[0,0],[75,0],[75,35],[100,50],[75,65],[75,100],[0,100]] },
  { id: 'speechLeft',    label: 'Speech Left',    mode: 'polygon', points: [[25,0],[100,0],[100,100],[25,100],[25,65],[0,50],[25,35]] },
  { id: 'notch',         label: 'Notch',          mode: 'polygon', points: [[0,0],[40,0],[50,15],[60,0],[100,0],[100,100],[0,100]] },
  { id: 'rabbet',        label: 'Rabbet',         mode: 'polygon', points: [[0,0],[60,0],[60,40],[100,40],[100,100],[0,100]] },
  { id: 'shield',        label: 'Shield',         mode: 'polygon', points: [[20,0],[80,0],[100,20],[100,60],[50,100],[0,60],[0,20]] },
  { id: 'bookmark',      label: 'Bookmark',       mode: 'polygon', points: [[0,0],[100,0],[100,100],[50,80],[0,100]] },
  { id: 'tag',           label: 'Tag',            mode: 'polygon', points: [[20,0],[100,0],[100,100],[20,100],[0,50]] },
  { id: 'flag',          label: 'Flag',           mode: 'polygon', points: [[0,0],[100,0],[80,50],[100,100],[0,100]] },
  { id: 'kite',          label: 'Kite',           mode: 'polygon', points: [[50,0],[90,35],[50,100],[10,35]] },
  { id: 'halfCircle',    label: 'Half Circle',    mode: 'polygon', points: [[0,100],[7,75],[25,57],[50,50],[75,57],[93,75],[100,100]] },
  { id: 'pacman',        label: 'Pac-Man',        mode: 'polygon', points: [[50,50],[85,15],[50,0],[15,15],[0,50],[15,85],[50,100],[85,85]] },
  // Curved shapes
  { id: 'circle',        label: 'Circle',         mode: 'circle',  r: 50, cx: 50, cy: 50 },
  { id: 'ellipse',       label: 'Ellipse',        mode: 'ellipse', rx: 50, ry: 35, cx: 50, cy: 50 },
  { id: 'inset',         label: 'Inset',          mode: 'inset',   top: 10, right: 10, bottom: 10, left: 10, radius: 0 },
  { id: 'insetRound',    label: 'Inset Round',    mode: 'inset',   top: 10, right: 10, bottom: 10, left: 10, radius: 20 },
  { id: 'frame',         label: 'Frame',          mode: 'frame',   top: 25, right: 25, bottom: 25, left: 25 },
];

const BG_OPTIONS = [
  { id: 'gradient', label: 'Gradient' },
  { id: 'color',    label: 'Solid' },
  { id: 'pattern',  label: 'Pattern' },
  { id: 'image',    label: 'Image' },
];

const THUMB_COLORS = [
  '#22c55e','#f97316','#a855f7','#ef4444','#6b7280',
  '#ec4899','#16a34a','#14b8a6','#f59e0b','#eab308',
  '#3b82f6','#8b5cf6','#06b6d4','#10b981','#f43f5e',
  '#84cc16','#0ea5e9','#d946ef',
];

const HANDLE_COLORS = [
  'rgba(239,68,68,0.55)','rgba(34,197,94,0.55)','rgba(59,130,246,0.55)','rgba(245,158,11,0.55)',
  'rgba(168,85,247,0.55)','rgba(236,72,153,0.55)','rgba(20,184,166,0.55)','rgba(249,115,22,0.55)',
];

/* ─── Generate clip-path string ─────────────────────────────────────────── */
function buildClipPath({ mode, points, r, cx, cy, rx, ry, top, right, bottom, left, radius, frameOuter, frameInner }) {
  if (mode === 'polygon') {
    return `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;
  }
  if (mode === 'circle') {
    return `circle(${r}% at ${cx}% ${cy}%)`;
  }
  if (mode === 'ellipse') {
    return `ellipse(${rx}% ${ry}% at ${cx}% ${cy}%)`;
  }
  if (mode === 'inset') {
    const base = `inset(${top}% ${right}% ${bottom}% ${left}%`;
    return radius > 0 ? `${base} round ${radius}px)` : `${base})`;
  }
  if (mode === 'frame') {
    const [otl, otr, obr, obl] = frameOuter;
    const [itl, itr, ibr, ibl] = frameInner;
    const p = (x, y) => `${x}% ${y}%`;
    return `polygon(${p(...otl)}, ${p(...obl)}, ${p(ibl[0], obl[1])}, ${p(...itl)}, ${p(...itr)}, ${p(...ibr)}, ${p(...ibl)}, ${p(ibl[0], obl[1])}, ${p(...obr)}, ${p(...otr)})`;
  }
  return '';
}

/* ─── Format output string ──────────────────────────────────────────────── */
function formatOutput(clipPath, fmt) {
  if (fmt === 'css')     return `clip-path: ${clipPath};`;
  if (fmt === 'tailwind') return `[clip-path:${clipPath}]`;
  if (fmt === 'react')   return `clipPath: '${clipPath}'`;
  return clipPath;
}

/* ─── Clamp ─────────────────────────────────────────────────────────────── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function CssClipPathGenerator() {
  const [mode,      setMode]      = useState('polygon');
  const [points,    setPoints]    = useState([[50,0],[100,100],[0,100]]);
  const [circleR,   setCircleR]   = useState(50);
  const [circleCx,  setCircleCx]  = useState(50);
  const [circleCy,  setCircleCy]  = useState(50);
  const [ellipseRx, setEllipseRx] = useState(50);
  const [ellipseRy, setEllipseRy] = useState(35);
  const [ellipseCx, setEllipseCx] = useState(50);
  const [ellipseCy, setEllipseCy] = useState(50);
  const [insetTop,   setInsetTop]   = useState(10);
  const [insetRight, setInsetRight] = useState(10);
  const [insetBot,   setInsetBot]   = useState(10);
  const [insetLeft,  setInsetLeft]  = useState(10);
  const [insetRadius,setInsetRadius]= useState(0);
  // frame: [tl, tr, br, bl] each [x, y]
  const [frameOuter, setFrameOuter] = useState([[0,0],[100,0],[100,100],[0,100]]);
  const [frameInner, setFrameInner] = useState([[25,25],[75,25],[75,75],[25,75]]);
  const [bgType,    setBgType]    = useState('gradient');
  const [bgColor,   setBgColor]   = useState('#3b82f6');
  const [bgImage,       setBgImage]       = useState(null);
  const [bgImageAspect, setBgImageAspect] = useState(null);
  const bgImageRef = useRef(null);
  const [exportFmt, setExportFmt] = useState('css');
  const [copied,    setCopied]    = useState(false);
  const [activePreset, setActivePreset] = useState('triangle');
  const [showOutside,  setShowOutside]  = useState(true);
  const [popoverIdx,   setPopoverIdx]   = useState(null);

  const [activeHandle, setActiveHandle] = useState(null);

  const dragRef         = useRef(null);
  const dragMovedRef    = useRef(false);
  const dragEndedRef    = useRef(false);
  const previewRef      = useRef(null);
  const previewSectionRef = useRef(null);
  const [previewSize,   setPreviewSize] = useState(null);

  /* ── Derived clip-path ──────────────────────────────────────────────── */
  const clipState = { mode, points, r: circleR, cx: circleCx, cy: circleCy, rx: ellipseRx, ry: ellipseRy, top: insetTop, right: insetRight, bottom: insetBot, left: insetLeft, radius: insetRadius, frameOuter, frameInner };
  const clipPath  = buildClipPath(clipState);
  const output    = formatOutput(clipPath, exportFmt);

  /* ── Apply preset ───────────────────────────────────────────────────── */
  function applyPreset(preset) {
    setActivePreset(preset.id);
    setMode(preset.mode);
    if (preset.mode === 'polygon')  setPoints(preset.points.map(p => [...p]));
    if (preset.mode === 'circle')   { setCircleR(preset.r); setCircleCx(preset.cx); setCircleCy(preset.cy); }
    if (preset.mode === 'ellipse')  { setEllipseRx(preset.rx); setEllipseRy(preset.ry); setEllipseCx(preset.cx); setEllipseCy(preset.cy); }
    if (preset.mode === 'inset')    { setInsetTop(preset.top); setInsetRight(preset.right); setInsetBot(preset.bottom); setInsetLeft(preset.left); setInsetRadius(preset.radius); }
    if (preset.mode === 'frame')    { setFrameOuter([[0,0],[100,0],[100,100],[0,100]]); setFrameInner([[preset.left,preset.top],[100-preset.right,preset.top],[100-preset.right,100-preset.bottom],[preset.left,100-preset.bottom]]); }
  }

  /* ── Polygon dragging ───────────────────────────────────────────────── */
  const getRelPos = useCallback((e) => {
    const el = previewRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clamp(Math.round(((clientX - rect.left) / rect.width)  * 100), 0, 100),
      y: clamp(Math.round(((clientY - rect.top)  / rect.height) * 100), 0, 100),
    };
  }, []);

  const onHandleMouseDown = useCallback((e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { type: 'polygon', index: idx };
    dragMovedRef.current = false;
    setActiveHandle({ type: 'polygon', index: idx });
  }, []);

  const onShapeHandleMouseDown = useCallback((e, dragType, extra = {}) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { type: dragType, ...extra };
    dragMovedRef.current = false;
    setActiveHandle({ type: dragType });
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current) return;
    dragMovedRef.current = true;
    const pos = getRelPos(e);
    if (!pos) return;
    const drag = dragRef.current;

    if (drag.type === 'polygon') {
      const idx = drag.index;
      setPoints(prev => { const next = [...prev]; next[idx] = [pos.x, pos.y]; return next; });
      setActivePreset(null);
    } else if (drag.type === 'circle-center') {
      setCircleCx(pos.x); setCircleCy(pos.y); setActivePreset(null);
    } else if (drag.type === 'circle-radius') {
      const dx = pos.x - drag.cx; const dy = pos.y - drag.cy;
      setCircleR(clamp(Math.round(Math.sqrt(dx*dx + dy*dy)), 1, 99)); setActivePreset(null);
    } else if (drag.type === 'ellipse-center') {
      setEllipseCx(pos.x); setEllipseCy(pos.y); setActivePreset(null);
    } else if (drag.type === 'ellipse-rx') {
      setEllipseRx(clamp(Math.round(Math.abs(pos.x - drag.cx)), 1, 100)); setActivePreset(null);
    } else if (drag.type === 'ellipse-ry') {
      setEllipseRy(clamp(Math.round(Math.abs(pos.y - drag.cy)), 1, 100)); setActivePreset(null);
    } else if (drag.type === 'inset-top') {
      setInsetTop(clamp(Math.round(pos.y), 0, 49)); setActivePreset(null);
    } else if (drag.type === 'inset-right') {
      setInsetRight(clamp(Math.round(100 - pos.x), 0, 49)); setActivePreset(null);
    } else if (drag.type === 'inset-bottom') {
      setInsetBot(clamp(Math.round(100 - pos.y), 0, 49)); setActivePreset(null);
    } else if (drag.type === 'inset-left') {
      setInsetLeft(clamp(Math.round(pos.x), 0, 49)); setActivePreset(null);
    } else if (drag.type === 'frame-outer') {
      const idx = drag.index;
      setFrameOuter(prev => { const n = prev.map(p => [...p]); n[idx] = [clamp(Math.round(pos.x),0,100), clamp(Math.round(pos.y),0,100)]; return n; });
      setActivePreset(null);
    } else if (drag.type === 'frame-inner') {
      const idx = drag.index;
      setFrameInner(prev => { const n = prev.map(p => [...p]); n[idx] = [clamp(Math.round(pos.x),0,100), clamp(Math.round(pos.y),0,100)]; return n; });
      setActivePreset(null);
    }
  }, [getRelPos]);

  const onMouseUp = useCallback(() => {
    if (dragMovedRef.current) dragEndedRef.current = true;
    dragRef.current = null;
    dragMovedRef.current = false;
    setActiveHandle(null);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',  onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',  onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  /* ── Right-click handle: show delete popover ───────────────────────── */
  const onHandleContextMenu = useCallback((e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverIdx(prev => prev === idx ? null : idx);
  }, []);

  /* ── Delete point from popover ──────────────────────────────────────── */
  function deletePoint(idx) {
    if (points.length <= 3) return;
    setPoints(prev => prev.filter((_, i) => i !== idx));
    setPopoverIdx(null);
    setActivePreset(null);
  }

  /* ── Click on SVG background: add point or close popover ───────────── */
  function onSvgClick(e) {
    if (mode !== 'polygon') return;
    if (dragEndedRef.current) { dragEndedRef.current = false; return; }
    if (popoverIdx !== null) { setPopoverIdx(null); return; }
    const pos = getRelPos(e);
    if (!pos) return;
    setPoints(prev => [...prev, [pos.x, pos.y]]);
    setActivePreset(null);
  }

  /* ── Copy ───────────────────────────────────────────────────────────── */
  function copyOutput() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  /* ── SVG polygon points string (for <polygon> element) ─────────────── */
  const svgPoints = points.map(([x, y]) => `${x},${y}`).join(' ');

  /* ── Image upload handler ───────────────────────────────────────────── */
  function onBgImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (bgImage) URL.revokeObjectURL(bgImage);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setBgImageAspect(img.naturalWidth / img.naturalHeight);
    img.src = url;
    setBgImage(url);
    setBgType('image');
  }

  useEffect(() => {
    return () => { if (bgImage) URL.revokeObjectURL(bgImage); };
  }, [bgImage]);

  /* ── Fit image preview to section bounds ────────────────────────────── */
  useEffect(() => {
    if (!bgImageAspect || !previewSectionRef.current) { setPreviewSize(null); return; }
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      const pad = 32;
      const aw = width - 24;
      const ah = height - pad;
      if (aw / ah > bgImageAspect) {
        setPreviewSize({ width: ah * bgImageAspect, height: ah });
      } else {
        setPreviewSize({ width: aw, height: aw / bgImageAspect });
      }
    });
    ro.observe(previewSectionRef.current);
    return () => ro.disconnect();
  }, [bgImageAspect]);

  /* ── Auto-size circle to fit image (min dimension = diameter) ────────── */
  useEffect(() => {
    if (!bgImageAspect || bgType !== 'image') return;
    const a = bgImageAspect; // W/H
    // CSS circle() % resolves against sqrt((W²+H²)/2)
    // diameter = min(W,H) → r = min(W,H)/2
    const rPct = a >= 1
      ? 50 * Math.sqrt(2 / (a * a + 1))       // landscape: minDim = H
      : 50 * Math.sqrt(2 * a * a / (a * a + 1)); // portrait:  minDim = W
    setCircleR(clamp(Math.round(rPct), 1, 99));
    setCircleCx(50);
    setCircleCy(50);
  }, [bgImage]); // re-run only when a new image is uploaded

  /* ── Preview background style ───────────────────────────────────────── */
  const bgStyle = bgType === 'gradient'
    ? { background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f97316 100%)' }
    : bgType === 'color'
    ? { background: bgColor }
    : bgType === 'image' && bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }
    : { backgroundImage: 'repeating-conic-gradient(#333 0% 25%, #1a1a1a 0% 50%)', backgroundSize: '24px 24px' };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-clip-path-generator" />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className={styles.header} style={{ height: 'auto', minHeight: 52 }}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,22 2,22" stroke="#818cf8" strokeWidth="1.5" fill="rgba(129,140,248,0.15)"/>
            </svg>
          </div>
          <span>CSS <span style={{ color: '#818cf8' }}>Clip-path</span> Generator</span>
        </div>

        <PlaygroundTopAd inline />
      </div>

      {/* ── Preset strip ─────────────────────────────────────────────────── */}
      <div className={styles.presetStrip}>
        {PRESETS.map((p, idx) => (
          <button
            key={p.id}
            className={`${styles.presetThumb} ${activePreset === p.id ? styles.presetThumbActive : ''}`}
            onClick={() => applyPreset(p)}
            title={p.label}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {p.mode === 'polygon' && (
                <polygon points={p.points.map(([x,y]) => `${x},${y}`).join(' ')} fill={THUMB_COLORS[idx % THUMB_COLORS.length]} />
              )}
              {p.mode === 'circle' && (
                <circle cx={p.cx} cy={p.cy} r={p.r} fill={THUMB_COLORS[idx % THUMB_COLORS.length]} />
              )}
              {p.mode === 'ellipse' && (
                <ellipse cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill={THUMB_COLORS[idx % THUMB_COLORS.length]} />
              )}
              {p.mode === 'inset' && (
                <rect x={p.left} y={p.top} width={100 - p.left - p.right} height={100 - p.top - p.bottom} rx={p.radius} fill={THUMB_COLORS[idx % THUMB_COLORS.length]} />
              )}
              {p.mode === 'frame' && <>
                <rect x="0" y="0" width="100" height="100" fill={THUMB_COLORS[idx % THUMB_COLORS.length]} />
                <rect x={p.left} y={p.top} width={100 - p.left - p.right} height={100 - p.top - p.bottom} fill="#111827" />
              </>}
            </svg>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Left: controls ───────────────────────────────────────────── */}
        <div className={styles.leftPane}>

          {/* Mode selector */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Shape Type</div>
            <div className={styles.modeTabs}>
              {['polygon','circle','ellipse','inset','frame'].map(m => (
                <button key={m}
                  className={`${styles.modeTab} ${mode === m ? styles.modeTabActive : ''}`}
                  onClick={() => { setMode(m); setActivePreset(null); }}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Mode-specific controls */}
          {mode === 'polygon' && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Points — {points.length} vertices</div>
              <div className={styles.pointsTable}>
                {points.map(([x, y], i) => (
                  <div key={i} className={styles.pointRow}>
                    <span className={styles.pointIdx}>P{i + 1}</span>
                    <span className={styles.pointCoord}>
                      <label>X</label>
                      <input type="number" min="0" max="100" value={x}
                        onChange={e => { const v = clamp(+e.target.value, 0, 100); setPoints(prev => { const n=[...prev]; n[i]=[v,n[i][1]]; return n; }); setActivePreset(null); }}
                        className={styles.pointInput} />
                      <span className={styles.pct}>%</span>
                    </span>
                    <span className={styles.pointCoord}>
                      <label>Y</label>
                      <input type="number" min="0" max="100" value={y}
                        onChange={e => { const v = clamp(+e.target.value, 0, 100); setPoints(prev => { const n=[...prev]; n[i]=[n[i][0],v]; return n; }); setActivePreset(null); }}
                        className={styles.pointInput} />
                      <span className={styles.pct}>%</span>
                    </span>
                    {points.length > 3 && (
                      <button className={styles.removePoint}
                        onClick={() => { setPoints(prev => prev.filter((_,j) => j !== i)); setActivePreset(null); }}>×</button>
                    )}
                  </div>
                ))}
              </div>
              <button className={styles.addPoint}
                onClick={() => { setPoints(prev => [...prev, [50, 50]]); setActivePreset(null); }}>
                + Add point
              </button>
            </div>
          )}

          {mode === 'circle' && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Circle Parameters</div>
              <div className={styles.sliders}>
                {[
                  { label: 'Radius', val: circleR,  set: setCircleR,  min: 1, max: 100 },
                  { label: 'Center X', val: circleCx, set: setCircleCx, min: 0, max: 100 },
                  { label: 'Center Y', val: circleCy, set: setCircleCy, min: 0, max: 100 },
                ].map(({ label, val, set, min, max }) => (
                  <div key={label} className={styles.sliderRow}>
                    <span className={styles.sliderLabel}>{label}</span>
                    <input type="range" min={min} max={max} value={val}
                      onChange={e => { set(+e.target.value); setActivePreset(null); }}
                      className={styles.slider} />
                    <span className={styles.sliderVal}>{val}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'ellipse' && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Ellipse Parameters</div>
              <div className={styles.sliders}>
                {[
                  { label: 'Radius X', val: ellipseRx, set: setEllipseRx, min: 1, max: 100 },
                  { label: 'Radius Y', val: ellipseRy, set: setEllipseRy, min: 1, max: 100 },
                  { label: 'Center X', val: ellipseCx, set: setEllipseCx, min: 0, max: 100 },
                  { label: 'Center Y', val: ellipseCy, set: setEllipseCy, min: 0, max: 100 },
                ].map(({ label, val, set, min, max }) => (
                  <div key={label} className={styles.sliderRow}>
                    <span className={styles.sliderLabel}>{label}</span>
                    <input type="range" min={min} max={max} value={val}
                      onChange={e => { set(+e.target.value); setActivePreset(null); }}
                      className={styles.slider} />
                    <span className={styles.sliderVal}>{val}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'inset' && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Inset Parameters</div>
              <div className={styles.sliders}>
                {[
                  { label: 'Top',    val: insetTop,    set: setInsetTop },
                  { label: 'Right',  val: insetRight,  set: setInsetRight },
                  { label: 'Bottom', val: insetBot,     set: setInsetBot },
                  { label: 'Left',   val: insetLeft,   set: setInsetLeft },
                ].map(({ label, val, set }) => (
                  <div key={label} className={styles.sliderRow}>
                    <span className={styles.sliderLabel}>{label}</span>
                    <input type="range" min="0" max="49" value={val}
                      onChange={e => { set(+e.target.value); setActivePreset(null); }}
                      className={styles.slider} />
                    <span className={styles.sliderVal}>{val}%</span>
                  </div>
                ))}
                <div className={styles.sliderRow}>
                  <span className={styles.sliderLabel}>Radius</span>
                  <input type="range" min="0" max="100" value={insetRadius}
                    onChange={e => { setInsetRadius(+e.target.value); setActivePreset(null); }}
                    className={styles.slider} />
                  <span className={styles.sliderVal}>{insetRadius}px</span>
                </div>
              </div>
            </div>
          )}

          {mode === 'frame' && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Inner Hole — drag handles or reset</div>
              <div className={styles.sliders}>
                {[
                  { label: 'Inset T', idx: 0, axis: 1 },
                  { label: 'Inset R', idx: 1, axis: 0, flip: true },
                  { label: 'Inset B', idx: 2, axis: 1, flip: true },
                  { label: 'Inset L', idx: 0, axis: 0 },
                ].map(({ label, idx, axis, flip }) => {
                  const val = flip ? 100 - frameInner[idx][axis] : frameInner[idx][axis];
                  return (
                    <div key={label} className={styles.sliderRow}>
                      <span className={styles.sliderLabel}>{label}</span>
                      <input type="range" min="1" max="49" value={val}
                        onChange={e => {
                          const v = +e.target.value;
                          setFrameInner(prev => {
                            const n = prev.map(p => [...p]);
                            if (label === 'Inset T') { n[0][1]=v; n[1][1]=v; }
                            if (label === 'Inset R') { n[1][0]=100-v; n[2][0]=100-v; }
                            if (label === 'Inset B') { n[2][1]=100-v; n[3][1]=100-v; }
                            if (label === 'Inset L') { n[0][0]=v; n[3][0]=v; }
                            return n;
                          });
                          setActivePreset(null);
                        }}
                        className={styles.slider} />
                      <span className={styles.sliderVal}>{val}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ── Right: preview ───────────────────────────────────────────── */}
        <div className={styles.rightPane}>

          {/* Preview bar: Live Preview label (left) + Background controls (right) */}
          <div className={styles.previewBar}>
            <span className={styles.sectionLabel}>Live Preview</span>
            {mode === 'polygon' && <span className={styles.previewHint}>drag · right-click to delete</span>}
            <div className={styles.bgTabs} style={{ marginLeft: 'auto' }}>
              <span className={styles.sectionLabel}>Background</span>
              {BG_OPTIONS.map(b => (
                <button key={b.id}
                  className={`${styles.bgTab} ${bgType === b.id ? styles.bgTabActive : ''}`}
                  onClick={() => { setBgType(b.id); if (b.id === 'image') bgImageRef.current?.click(); }}>
                  {b.label}
                </button>
              ))}
              {bgType === 'color' && (
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className={styles.colorInput} />
              )}
              {bgType === 'image' && bgImage && (
                <button className={styles.bgChangeBtn} onClick={() => bgImageRef.current?.click()}>Change</button>
              )}
              <input ref={bgImageRef} type="file" accept="image/*" className={styles.bgImageInput} onChange={onBgImageChange} />
            </div>
          </div>

          {/* Preview area */}
          <div className={styles.previewSection} ref={previewSectionRef}>

            <div
              className={`${styles.previewOuter} ${bgType === 'image' && bgImage ? styles.previewOuterWide : ''} ${activeHandle ? styles.previewOuterDragging : ''}`}
              style={bgType === 'image' && previewSize ? { width: previewSize.width, height: previewSize.height } : undefined}
            >
              {bgType === 'image' && bgImage ? (
                <>
                  {showOutside && (
                    <img src={bgImage} className={`${styles.previewImg} ${styles.previewOutside}`} alt="" />
                  )}
                  <img src={bgImage} className={styles.previewImg} style={{ clipPath }} alt="" />
                </>
              ) : (
                <>
                  {showOutside && (
                    <div className={`${styles.previewBg} ${styles.previewOutside}`} style={bgStyle} />
                  )}
                  <div className={styles.previewBg} style={{ ...bgStyle, clipPath }} />
                </>
              )}
              {/* SVG for shape outlines only (no handles here) */}
              <svg
                ref={previewRef}
                className={styles.svgOverlay}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                onClick={onSvgClick}
              >
                {mode === 'polygon' && (
                  <polygon points={svgPoints} fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                )}
                {mode === 'circle' && (
                  <circle cx={circleCx} cy={circleCy} r={circleR} fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="3 2" />
                )}
                {mode === 'ellipse' && (
                  <ellipse cx={ellipseCx} cy={ellipseCy} rx={ellipseRx} ry={ellipseRy} fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="3 2" />
                )}
                {mode === 'inset' && (
                  <rect x={insetLeft} y={insetTop} width={100 - insetLeft - insetRight} height={100 - insetTop - insetBot} fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="3 2" />
                )}
                {mode === 'frame' && <>
                  <polygon points={frameOuter.map(([x,y])=>`${x},${y}`).join(' ')} fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="3 2" />
                  <polygon points={frameInner.map(([x,y])=>`${x},${y}`).join(' ')} fill="none" stroke="rgba(129,140,248,0.7)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="3 2" />
                </>}
              </svg>

              {/* HTML handles — always perfect circles, unaffected by SVG aspect ratio */}
              {mode === 'polygon' && points.map(([x, y], i) => {
                const isActive = activeHandle?.type === 'polygon' && activeHandle?.index === i;
                return (
                  <div key={i} className={styles.handle}
                    style={{ left: `${x}%`, top: `${y}%`, background: isActive ? 'transparent' : HANDLE_COLORS[i % HANDLE_COLORS.length], borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                    onMouseDown={e => onHandleMouseDown(e, i)}
                    onContextMenu={e => onHandleContextMenu(e, i)}
                  />
                );
              })}

              {mode === 'circle' && <>
                <div className={`${styles.handle} ${styles.handleCenter}`}
                  style={{ left: `${circleCx}%`, top: `${circleCy}%`, ...(activeHandle?.type === 'circle-center' ? { background: 'transparent', borderColor: 'transparent' } : {}) }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'circle-center')} />
                <div className={styles.handle}
                  style={{ left: `${clamp(circleCx + circleR, 0, 100)}%`, top: `${circleCy}%`, background: activeHandle?.type === 'circle-radius' ? 'transparent' : 'rgba(34,197,94,0.55)', borderColor: activeHandle?.type === 'circle-radius' ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'circle-radius', { cx: circleCx, cy: circleCy })} />
              </>}

              {mode === 'ellipse' && <>
                <div className={`${styles.handle} ${styles.handleCenter}`}
                  style={{ left: `${ellipseCx}%`, top: `${ellipseCy}%`, ...(activeHandle?.type === 'ellipse-center' ? { background: 'transparent', borderColor: 'transparent' } : {}) }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'ellipse-center')} />
                <div className={styles.handle}
                  style={{ left: `${clamp(ellipseCx + ellipseRx, 0, 100)}%`, top: `${ellipseCy}%`, background: activeHandle?.type === 'ellipse-rx' ? 'transparent' : 'rgba(34,197,94,0.55)', borderColor: activeHandle?.type === 'ellipse-rx' ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'ellipse-rx', { cx: ellipseCx, cy: ellipseCy })} />
                <div className={styles.handle}
                  style={{ left: `${ellipseCx}%`, top: `${clamp(ellipseCy + ellipseRy, 0, 100)}%`, background: activeHandle?.type === 'ellipse-ry' ? 'transparent' : 'rgba(59,130,246,0.55)', borderColor: activeHandle?.type === 'ellipse-ry' ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'ellipse-ry', { cx: ellipseCx, cy: ellipseCy })} />
              </>}

              {mode === 'inset' && <>
                <div className={styles.handle}
                  style={{ left: '50%', top: `${insetTop}%`, background: activeHandle?.type === 'inset-top' ? 'transparent' : 'rgba(239,68,68,0.55)', borderColor: activeHandle?.type === 'inset-top' ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'inset-top')} />
                <div className={styles.handle}
                  style={{ left: `${100 - insetRight}%`, top: '50%', background: activeHandle?.type === 'inset-right' ? 'transparent' : 'rgba(34,197,94,0.55)', borderColor: activeHandle?.type === 'inset-right' ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'inset-right')} />
                <div className={styles.handle}
                  style={{ left: '50%', top: `${100 - insetBot}%`, background: activeHandle?.type === 'inset-bottom' ? 'transparent' : 'rgba(59,130,246,0.55)', borderColor: activeHandle?.type === 'inset-bottom' ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'inset-bottom')} />
                <div className={styles.handle}
                  style={{ left: `${insetLeft}%`, top: '50%', background: activeHandle?.type === 'inset-left' ? 'transparent' : 'rgba(245,158,11,0.55)', borderColor: activeHandle?.type === 'inset-left' ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                  onMouseDown={e => onShapeHandleMouseDown(e, 'inset-left')} />
              </>}

              {mode === 'frame' && <>
                {frameOuter.map(([x,y], i) => (
                  <div key={`fo${i}`} className={styles.handle}
                    style={{ left: `${x}%`, top: `${y}%`, background: activeHandle?.type === 'frame-outer' && activeHandle?.index === i ? 'transparent' : HANDLE_COLORS[i], borderColor: activeHandle?.type === 'frame-outer' && activeHandle?.index === i ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                    onMouseDown={e => onShapeHandleMouseDown(e, 'frame-outer', { index: i })} />
                ))}
                {frameInner.map(([x,y], i) => (
                  <div key={`fi${i}`} className={styles.handle}
                    style={{ left: `${x}%`, top: `${y}%`, background: activeHandle?.type === 'frame-inner' && activeHandle?.index === i ? 'transparent' : HANDLE_COLORS[i+4], borderColor: activeHandle?.type === 'frame-inner' && activeHandle?.index === i ? 'transparent' : 'rgba(255,255,255,0.45)' }}
                    onMouseDown={e => onShapeHandleMouseDown(e, 'frame-inner', { index: i })} />
                ))}
              </>}

              {/* Handle delete popover */}
              {popoverIdx !== null && mode === 'polygon' && (
                <div
                  className={styles.handlePopover}
                  style={{ left: `${points[popoverIdx][0]}%`, top: `${points[popoverIdx][1]}%` }}
                >
                  {points.length > 3
                    ? <button className={styles.handlePopoverDelete} onClick={() => deletePoint(popoverIdx)}>✕ Delete</button>
                    : <span className={styles.handlePopoverMin}>Min 3 points</span>
                  }
                </div>
              )}
            </div>
          </div>

          {/* Output box */}
          <div className={styles.outputSection}>
            <div className={styles.outputFooter}>
              <div className={styles.exportTabs}>
                {['css','tailwind','react'].map(f => (
                  <button key={f} className={`${styles.exportTab} ${exportFmt === f ? styles.exportTabActive : ''}`}
                    onClick={() => setExportFmt(f)}>
                    {f === 'css' ? 'CSS' : f === 'tailwind' ? 'Tailwind' : 'React'}
                  </button>
                ))}
              </div>
              <label className={styles.toggle}>
                <input type="checkbox" checked={showOutside} onChange={e => setShowOutside(e.target.checked)} />
                <span>Show outside</span>
              </label>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnOk : ''}`} onClick={copyOutput}>
                {copied
                  ? <><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> Copied</>
                  : <><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> Copy</>
                }
              </button>
            </div>
            <div className={styles.outputCode}>{output}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
