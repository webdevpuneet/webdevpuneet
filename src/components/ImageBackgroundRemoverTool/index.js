'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import styles from './styles.module.css';

const PREVIEW_BACKGROUNDS = [
  { id: 'checker', label: 'Checker' },
  { id: 'transparent', label: 'Transparent' },
  { id: 'white', label: 'White', color: '#ffffff' },
  { id: 'black', label: 'Black', color: '#111827' },
  { id: 'custom', label: 'Custom' },
];

const MODES = [
  { id: 'white', label: 'White / light background' },
  { id: 'magic', label: 'Magic wand selection' },
  { id: 'picked', label: 'Picked color' },
  { id: 'edge', label: 'Auto edge color' },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function fitSize(width, height, maxWidth = 1180, maxHeight = 680) {
  const scale = Math.min(maxWidth / width, maxHeight / height, 1);
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

function hexToRgb(hex) {
  const raw = hex.replace('#', '');
  const full = raw.length === 3 ? raw.split('').map(ch => ch + ch).join('') : raw;
  const int = parseInt(full, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function colorDistance(data, idx, color) {
  const dr = data[idx] - color.r;
  const dg = data[idx + 1] - color.g;
  const db = data[idx + 2] - color.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function averageCornerColor(data, width, height) {
  const points = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
    [Math.floor(width * 0.5), 0], [Math.floor(width * 0.5), height - 1],
    [0, Math.floor(height * 0.5)], [width - 1, Math.floor(height * 0.5)],
  ];
  const sum = points.reduce((acc, [x, y]) => {
    const idx = (y * width + x) * 4;
    acc.r += data[idx];
    acc.g += data[idx + 1];
    acc.b += data[idx + 2];
    return acc;
  }, { r: 0, g: 0, b: 0 });
  return { r: sum.r / points.length, g: sum.g / points.length, b: sum.b / points.length };
}

function removeBackground(sourceCanvas, tolerance, feather, mode, pickedColor, wandSeeds) {
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  const ctx = sourceCanvas.getContext('2d', { willReadFrequently: true });
  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  if (mode === 'magic' && !wandSeeds?.length) {
    return new ImageData(new Uint8ClampedArray(data), width, height);
  }
  const bg = mode === 'white'
    ? { r: 255, g: 255, b: 255 }
    : mode === 'picked'
      ? hexToRgb(pickedColor)
      : averageCornerColor(data, width, height);
  const lightFloor = clamp(255 - tolerance * 1.4, 78, 247);
  const total = width * height;
  const visited = new Uint8Array(total);
  const remove = new Uint8Array(total);
  const queue = [];

  function push(x, y, targetColor = bg, targetTolerance = tolerance) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const pos = y * width + x;
    if (visited[pos]) return;
    visited[pos] = 1;
    const idx = pos * 4;
    const isLightBg = mode === 'white'
      && data[idx] >= lightFloor
      && data[idx + 1] >= lightFloor
      && data[idx + 2] >= lightFloor
      && Math.max(data[idx], data[idx + 1], data[idx + 2]) - Math.min(data[idx], data[idx + 1], data[idx + 2]) <= Math.max(18, tolerance * 0.55);
    if (data[idx + 3] < 8 || colorDistance(data, idx, targetColor) <= targetTolerance || isLightBg) {
      remove[pos] = 1;
      queue.push(pos);
    }
  }

  function floodFromSeed(seed) {
    visited.fill(0);
    queue.length = 0;
    const targetColor = seed.color || hexToRgb(pickedColor);
    const targetTolerance = seed.tolerance ?? tolerance;
    push(
      clamp(Math.round(seed.x * (width - 1)), 0, width - 1),
      clamp(Math.round(seed.y * (height - 1)), 0, height - 1),
      targetColor,
      targetTolerance
    );
    for (let i = 0; i < queue.length; i++) {
      const pos = queue[i];
      const x = pos % width;
      const y = Math.floor(pos / width);
      push(x + 1, y, targetColor, targetTolerance);
      push(x - 1, y, targetColor, targetTolerance);
      push(x, y + 1, targetColor, targetTolerance);
      push(x, y - 1, targetColor, targetTolerance);
    }
  }

  if (mode === 'magic' && wandSeeds?.length) {
    wandSeeds.forEach(floodFromSeed);
  } else {
    for (let x = 0; x < width; x++) {
      push(x, 0);
      push(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      push(0, y);
      push(width - 1, y);
    }
    for (let i = 0; i < queue.length; i++) {
      const pos = queue[i];
      const x = pos % width;
      const y = Math.floor(pos / width);
      push(x + 1, y);
      push(x - 1, y);
      push(x, y + 1);
      push(x, y - 1);
    }
  }

  const out = new ImageData(new Uint8ClampedArray(data), width, height);
  const outData = out.data;
  const featherPx = Math.round(feather);

  if (mode === 'picked') {
    for (let pos = 0; pos < total; pos++) {
      const idx = pos * 4;
      if (data[idx + 3] < 8 || colorDistance(data, idx, bg) <= tolerance) {
        remove[pos] = 1;
      }
    }
  }

  for (let pos = 0; pos < total; pos++) {
    if (!remove[pos]) continue;
    outData[pos * 4 + 3] = 0;
  }

  if (featherPx > 0) {
    for (let pos = 0; pos < total; pos++) {
      if (remove[pos]) continue;
      const x = pos % width;
      const y = Math.floor(pos / width);
      let near = false;
      for (let dy = -featherPx; dy <= featherPx && !near; dy++) {
        for (let dx = -featherPx; dx <= featherPx; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (remove[ny * width + nx]) {
            near = true;
            break;
          }
        }
      }
      if (near) {
        const idx = pos * 4;
        outData[idx + 3] = Math.round(outData[idx + 3] * 0.82);
      }
    }
  }

  return out;
}

export default function ImageBackgroundRemoverTool() {
  const fileRef    = useRef(null);
  const imgRef     = useRef(null);
  const sourceRef  = useRef(null);
  const outputRef  = useRef(null);
  // Zoom + pan
  const viewportRef   = useRef(null);   // the overflow:hidden stage content div
  const transformRef  = useRef(null);   // the div that gets CSS transform
  const viewRef       = useRef({ zoom: 1, x: 0, y: 0 });
  const panStartRef   = useRef(null);   // { startX, startY, panX, panY } while dragging
  const didMoveRef    = useRef(false);

  const [imageInfo, setImageInfo] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState('white');
  const [tolerance, setTolerance] = useState(64);
  const [pickedColor, setPickedColor] = useState('#ffffff');
  const [wandSeeds, setWandSeeds] = useState([]);
  const [redoWandSeeds, setRedoWandSeeds] = useState([]);
  const [feather, setFeather] = useState(1);
  const [previewBg, setPreviewBg] = useState('checker');
  const [customBg, setCustomBg] = useState('#dbeafe');
  const [format, setFormat] = useState('image/png');
  const [compare, setCompare] = useState(false);
  const [compareX, setCompareX] = useState(0.5);
  const [processing, setProcessing] = useState(false);
  const [panning, setPanning] = useState(false);
  const [viewZoom, setViewZoom] = useState(1); // for display only

  // Apply transform to DOM directly (no re-render) and keep viewRef in sync.
  function applyView(v) {
    viewRef.current = v;
    if (transformRef.current) {
      transformRef.current.style.transform = `translate(${v.x}px, ${v.y}px) scale(${v.zoom})`;
    }
    setViewZoom(v.zoom);
  }

  function resetView() {
    applyView({ zoom: 1, x: 0, y: 0 });
  }

  function zoomStep(delta) {
    const { zoom, x, y } = viewRef.current;
    const newZoom = clamp(+(zoom + delta).toFixed(2), 0.25, 8);
    const ratio = newZoom / zoom;
    applyView({ zoom: newZoom, x: x * ratio, y: y * ratio });
  }

  // Wheel zoom toward cursor
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!imgRef.current) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.15 : -0.15;
      const rect = el.getBoundingClientRect();
      const ocx = rect.left + rect.width / 2;
      const ocy = rect.top + rect.height / 2;
      const { zoom, x, y } = viewRef.current;
      const newZoom = clamp(+(zoom + delta).toFixed(2), 0.25, 8);
      const ratio = newZoom / zoom;
      applyView({
        zoom: newZoom,
        x: x * ratio + (e.clientX - ocx) * (1 - ratio),
        y: y * ratio + (e.clientY - ocy) * (1 - ratio),
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Unified pointer handlers on viewport (handles both pan and compare drag)
  function onViewportPointerDown(e) {
    if (e.button !== 0) return;
    didMoveRef.current = false;
    panStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: viewRef.current.x,
      panY: viewRef.current.y,
    };
    setPanning(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onViewportPointerMove(e) {
    if (!panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.startX;
    const dy = e.clientY - panStartRef.current.startY;
    if (Math.abs(dx) < 3 && Math.abs(dy) < 3) return;
    didMoveRef.current = true;
    if (compare) {
      const output = outputRef.current;
      if (!output) return;
      const rect = output.getBoundingClientRect();
      setCompareX(clamp((e.clientX - rect.left) / rect.width, 0, 1));
    } else {
      applyView({ zoom: viewRef.current.zoom, x: panStartRef.current.panX + dx, y: panStartRef.current.panY + dy });
    }
  }

  function onViewportPointerUp(e) {
    panStartRef.current = null;
    setPanning(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
  }

  // Click fires sampleColor only if the pointer didn't move (no pan)
  function onViewportClick(e) {
    if (didMoveRef.current) return;
    sampleColor(e);
  }

  const processImage = useCallback(() => {
    const img = imgRef.current;
    const source = sourceRef.current;
    const output = outputRef.current;
    if (!img || !source || !output) return;

    setProcessing(true);
    requestAnimationFrame(() => {
      const size = fitSize(img.naturalWidth, img.naturalHeight);
      source.width = output.width = size.width;
      source.height = output.height = size.height;
      source.getContext('2d').drawImage(img, 0, 0, size.width, size.height);
      const result = removeBackground(source, tolerance, feather, mode, pickedColor, wandSeeds);
      output.getContext('2d').putImageData(result, 0, 0);
      setProcessing(false);
    });
  }, [feather, mode, pickedColor, tolerance, wandSeeds]);

  useEffect(() => {
    processImage();
  }, [processImage, imageInfo]);

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setCompare(false);
        setCompareX(0.5);
        setWandSeeds([]);
        setRedoWandSeeds([]);
        resetView();
        setImageInfo({ name: file.name, width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function download() {
    const img = imgRef.current;
    if (!img) return;
    const source = document.createElement('canvas');
    source.width = img.naturalWidth;
    source.height = img.naturalHeight;
    source.getContext('2d').drawImage(img, 0, 0);
    const result = removeBackground(source, tolerance, feather, mode, pickedColor, wandSeeds);
    const out = document.createElement('canvas');
    out.width = img.naturalWidth;
    out.height = img.naturalHeight;
    out.getContext('2d').putImageData(result, 0, 0);
    out.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement('a');
      const ext = format === 'image/webp' ? 'webp' : 'png';
      a.href = URL.createObjectURL(blob);
      a.download = `background-removed.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, format);
  }

  function sampleColor(event) {
    if (compare) return;
    if (mode !== 'picked' && mode !== 'magic') return;
    const source = sourceRef.current;
    const output = outputRef.current;
    if (!source || !output) return;
    const rect = output.getBoundingClientRect();
    const x = clamp(Math.round(((event.clientX - rect.left) / rect.width) * source.width), 0, source.width - 1);
    const y = clamp(Math.round(((event.clientY - rect.top) / rect.height) * source.height), 0, source.height - 1);
    const data = source.getContext('2d', { willReadFrequently: true }).getImageData(x, y, 1, 1).data;
    const hex = `#${[data[0], data[1], data[2]].map(v => v.toString(16).padStart(2, '0')).join('')}`;
    setPickedColor(hex);
    if (mode === 'magic') {
      setWandSeeds(current => [...current, {
        x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
        y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
        color: { r: data[0], g: data[1], b: data[2] },
        tolerance,
      }]);
      setRedoWandSeeds([]);
    }
  }

  function undoWand() {
    setWandSeeds(current => {
      if (!current.length) return current;
      const next = current.slice(0, -1);
      const removed = current[current.length - 1];
      setRedoWandSeeds(redo => [removed, ...redo]);
      return next;
    });
  }

  function redoWand() {
    setRedoWandSeeds(current => {
      if (!current.length) return current;
      const [restored, ...rest] = current;
      setWandSeeds(seeds => [...seeds, restored]);
      return rest;
    });
  }

  function clearWand() {
    if (!wandSeeds.length) return;
    setRedoWandSeeds(wandSeeds);
    setWandSeeds([]);
  }

  const bgStyle = previewBg === 'custom'
    ? { '--preview-bg': customBg }
    : previewBg === 'white'
      ? { '--preview-bg': '#ffffff' }
      : previewBg === 'black'
        ? { '--preview-bg': '#111827' }
        : {};

  const stageCursor = compare
    ? 'ew-resize'
    : panning
      ? 'grabbing'
      : (mode === 'magic' || mode === 'picked')
        ? 'crosshair'
        : 'grab';

  return (
    <div className={styles.wrap}>
      <input
        ref={fileRef}
        className={styles.fileHidden}
        type="file"
        accept="image/*"
        onChange={event => {
          loadFile(event.target.files[0]);
          event.target.value = '';
        }}
      />
      <ImageToolsTopNav active="image-background-remover" />
      <PlaygroundTopAd />
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}><img src="/icons/image-background-remover.svg" alt="" /></span>
          <div>
            <strong>Image Background Remover</strong>
            <span>Remove edge-connected backgrounds locally and export transparent PNG/WebP.</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          {imageInfo && <button className={styles.ghostBtn} type="button" onClick={() => fileRef.current?.click()}>Replace Image</button>}
          <button className={styles.ghostBtn} type="button" onClick={() => setCompare(v => !v)} disabled={!imageInfo}>{compare ? 'Result only' : 'Before / After'}</button>
          <button className={styles.primaryBtn} type="button" onClick={download} disabled={!imageInfo || processing}>{processing ? 'Processing...' : 'Download'}</button>
        </div>
      </header>

      {!imageInfo ? (
        <div
          className={`${styles.uploadOuter} ${dragOver ? styles.uploadDrag : ''}`}
          onDragOver={event => { event.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={event => { event.preventDefault(); setDragOver(false); loadFile(event.dataTransfer.files[0]); }}
          onClick={() => fileRef.current?.click()}
        >
          <div className={styles.uploadCard}>
            <span className={styles.uploadIcon}><img src="/icons/image-background-remover.svg" alt="" /></span>
            <h2>Upload an image to remove the background</h2>
            <p>Best for product photos, logos, screenshots, and images with a clear background around the edges. Nothing is uploaded.</p>
            <button className={styles.primaryBtn} type="button">Choose image</button>
          </div>
        </div>
      ) : (
        <div className={styles.workspace}>
          <aside className={styles.sidebar}>
            <section className={styles.panel}>
              <div className={styles.panelTitle}>Background Detection</div>
              <div className={styles.modeGrid}>
                {MODES.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.modeBtn} ${mode === item.id ? styles.activeMode : ''}`}
                    onClick={() => {
                      setMode(item.id);
                      if (item.id !== 'magic') {
                        setWandSeeds([]);
                        setRedoWandSeeds([]);
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <label className={styles.colorRow}>Remove color <input type="color" value={pickedColor} onChange={e => { setPickedColor(e.target.value); setMode('picked'); setWandSeeds([]); setRedoWandSeeds([]); }} /></label>
              {mode === 'magic' && (
                <div className={styles.wandStatus}>
                  <span className={styles.wandIcon} aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9H6" /><path d="M21 9h-2" />
                      <path d="m18.5 5.5 1.4-1.4" /><path d="m8.1 15.9 1.4-1.4" /><path d="m8.1 2.1 1.4 1.4" />
                      <path d="M3 21 14 10" /><path d="m14 10 4 4" />
                    </svg>
                  </span>
                  {wandSeeds.length ? `${wandSeeds.length} wand removal${wandSeeds.length === 1 ? '' : 's'} applied` : 'Click the background area to select it'}
                </div>
              )}
              {mode === 'magic' && (
                <div className={styles.wandActions}>
                  <button type="button" className={styles.wandBtn} onClick={undoWand} disabled={!wandSeeds.length}>Undo</button>
                  <button type="button" className={styles.wandBtn} onClick={redoWand} disabled={!redoWandSeeds.length}>Redo</button>
                  <button type="button" className={styles.wandBtn} onClick={clearWand} disabled={!wandSeeds.length}>Clear</button>
                </div>
              )}
              <label className={styles.control}>Tolerance <span>{tolerance}</span><input type="range" min="8" max="180" value={tolerance} onChange={e => setTolerance(Number(e.target.value))} /></label>
              <label className={styles.control}>Edge feather <span>{feather}px</span><input type="range" min="0" max="5" value={feather} onChange={e => setFeather(Number(e.target.value))} /></label>
              <p className={styles.note}>{mode === 'white' ? 'Best for portraits, logos, and products on white or off-white backgrounds.' : mode === 'magic' ? 'Photoshop-style magic wand: click one background area and only the connected similar region is removed.' : mode === 'picked' ? 'Click the image or use the color picker to choose a color to remove across the image.' : 'Samples the image edges and removes connected pixels with a similar color.'} Higher tolerance removes more background; lower it if the subject starts disappearing.</p>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelTitle}>Preview Background</div>
              <div className={styles.bgGrid}>
                {PREVIEW_BACKGROUNDS.map(item => (
                  <button key={item.id} type="button" className={`${styles.bgBtn} ${previewBg === item.id ? styles.activeBg : ''}`} onClick={() => setPreviewBg(item.id)}>
                    {item.label}
                  </button>
                ))}
              </div>
              {previewBg === 'custom' && (
                <label className={styles.colorRow}>Color <input type="color" value={customBg} onChange={e => setCustomBg(e.target.value)} /></label>
              )}
            </section>

            <section className={styles.panel}>
              <div className={styles.panelTitle}>Export</div>
              <label className={styles.selectRow}>Format
                <select value={format} onChange={e => setFormat(e.target.value)}>
                  <option value="image/png">PNG transparent</option>
                  <option value="image/webp">WebP transparent</option>
                </select>
              </label>
              <p className={styles.note}>Use PNG for maximum compatibility. Use WebP for smaller files where supported.</p>
            </section>
          </aside>

          <main className={styles.stage}>
            <div className={styles.stageMeta}>
              <strong>{imageInfo.name}</strong>
              <div className={styles.zoomControls}>
                <button type="button" className={styles.zoomBtn} onClick={() => zoomStep(-0.25)} disabled={viewZoom <= 0.25} aria-label="Zoom out">−</button>
                <button type="button" className={styles.zoomReset} onClick={resetView}>{Math.round(viewZoom * 100)}%</button>
                <button type="button" className={styles.zoomBtn} onClick={() => zoomStep(0.25)} disabled={viewZoom >= 8} aria-label="Zoom in">+</button>
              </div>
              <span>{imageInfo.width} × {imageInfo.height}px</span>
            </div>

            <div
              ref={viewportRef}
              className={styles.stageViewport}
              style={{ cursor: stageCursor }}
              onPointerDown={onViewportPointerDown}
              onPointerMove={onViewportPointerMove}
              onPointerUp={onViewportPointerUp}
              onPointerCancel={onViewportPointerUp}
              onClick={onViewportClick}
            >
              <div
                ref={transformRef}
                style={{ transform: 'translate(0px, 0px) scale(1)', transformOrigin: 'center center', willChange: 'transform' }}
              >
                <div
                  className={`${styles.previewShell} ${previewBg === 'checker' ? styles.checker : ''} ${previewBg === 'transparent' ? styles.transparent : ''}`}
                  style={bgStyle}
                >
                  <canvas ref={sourceRef} className={`${styles.canvas} ${compare ? styles.beforeCanvas : styles.hiddenCanvas}`} style={compare ? { width: `${compareX * 100}%` } : undefined} />
                  <canvas ref={outputRef} className={styles.canvas} />
                  {compare && <span className={styles.compareHandle} style={{ left: `${compareX * 100}%` }} aria-hidden="true" />}
                </div>
              </div>
            </div>

            <p className={styles.hint}>{compare ? 'Drag the divider to compare before and after.' : mode === 'magic' ? 'Magic Wand: click a background area, then adjust tolerance to grow or shrink the selection.' : mode === 'picked' ? 'Click the image to pick a background color, then adjust tolerance if needed.' : 'Scroll to zoom · drag to pan · use zoom buttons above.'}</p>
          </main>
        </div>
      )}
    </div>
  );
}
