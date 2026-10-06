'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import styles from './styles.module.css';

const PRESETS = {
  studio: {
    label: 'Studio',
    ambient: 72,
    shadow: 22,
    lights: [
      { id: 'key', name: 'Key', x: 0.28, y: 0.32, color: '#fff0d0', intensity: 72, radius: 46 },
      { id: 'fill', name: 'Fill', x: 0.72, y: 0.44, color: '#dce9ff', intensity: 34, radius: 54 },
    ],
  },
  neon: {
    label: 'Neon',
    ambient: 52,
    shadow: 34,
    lights: [
      { id: 'pink', name: 'Pink', x: 0.18, y: 0.42, color: '#ff4fd8', intensity: 78, radius: 50 },
      { id: 'cyan', name: 'Cyan', x: 0.82, y: 0.35, color: '#22d3ee', intensity: 74, radius: 48 },
    ],
  },
  sunset: {
    label: 'Sunset',
    ambient: 63,
    shadow: 30,
    lights: [
      { id: 'sun', name: 'Sun', x: 0.16, y: 0.22, color: '#ff9f43', intensity: 84, radius: 64 },
      { id: 'sky', name: 'Sky', x: 0.78, y: 0.62, color: '#7aa7ff', intensity: 28, radius: 60 },
    ],
  },
  product: {
    label: 'Product',
    ambient: 82,
    shadow: 16,
    lights: [
      { id: 'top', name: 'Top', x: 0.5, y: 0.18, color: '#ffffff', intensity: 68, radius: 44 },
      { id: 'rim', name: 'Rim', x: 0.82, y: 0.52, color: '#dbeafe', intensity: 42, radius: 34 },
    ],
  },
  dramatic: {
    label: 'Dramatic',
    ambient: 42,
    shadow: 48,
    lights: [
      { id: 'spot', name: 'Spot', x: 0.34, y: 0.28, color: '#fff7cc', intensity: 92, radius: 36 },
    ],
  },
};

const DEFAULT_LIGHT = { name: 'Light', x: 0.5, y: 0.35, color: '#fff2c7', intensity: 64, radius: 42 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function makeLight(overrides = {}) {
  return { ...DEFAULT_LIGHT, id: Math.random().toString(36).slice(2, 8), ...overrides };
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

export default function RelightPhotoTool() {
  const fileRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const dragRef = useRef(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [lights, setLights] = useState(PRESETS.studio.lights);
  const [selectedId, setSelectedId] = useState(PRESETS.studio.lights[0].id);
  const [ambient, setAmbient] = useState(PRESETS.studio.ambient);
  const [shadow, setShadow] = useState(PRESETS.studio.shadow);
  const [compare, setCompare] = useState(false);
  const [compareX, setCompareX] = useState(0.5);
  const [dragOver, setDragOver] = useState(false);
  const [quality, setQuality] = useState(92);
  const [format, setFormat] = useState('image/png');

  const selected = lights.find(light => light.id === selectedId) || lights[0];

  const drawVersion = useCallback((ctx, relit) => {
    const img = imgRef.current;
    const canvas = ctx.canvas;
    if (!img) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (!relit) return;

    if (ambient < 100) {
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = `rgba(8, 12, 24, ${(100 - ambient) / 118})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    lights.forEach(light => {
      const { r, g, b } = hexToRgb(light.color);
      const x = light.x * canvas.width;
      const y = light.y * canvas.height;
      const radius = (Math.min(canvas.width, canvas.height) * light.radius) / 100;
      const alpha = light.intensity / 100;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.82 * alpha})`);
      gradient.addColorStop(0.38, `rgba(${r}, ${g}, ${b}, ${0.32 * alpha})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    });

    if (shadow > 0) {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.45,
        Math.min(canvas.width, canvas.height) * 0.18,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.72
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, `rgba(0,0,0,${shadow / 155})`);
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }, [ambient, lights, shadow]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!compare) {
      drawVersion(ctx, true);
      return;
    }
    const before = document.createElement('canvas');
    const after = document.createElement('canvas');
    before.width = after.width = canvas.width;
    before.height = after.height = canvas.height;
    drawVersion(before.getContext('2d'), false);
    drawVersion(after.getContext('2d'), true);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(before, 0, 0);
    ctx.save();
    const splitX = canvas.width * compareX;
    ctx.beginPath();
    ctx.rect(splitX, 0, canvas.width - splitX, canvas.height);
    ctx.clip();
    ctx.drawImage(after, 0, 0);
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(splitX - 1, 0, 2, canvas.height);
  }, [compare, compareX, drawVersion]);

  useEffect(() => {
    if (!imageInfo || !canvasRef.current) return;
    const canvas = canvasRef.current;
    if (canvas.width !== imageInfo.previewWidth) canvas.width = imageInfo.previewWidth;
    if (canvas.height !== imageInfo.previewHeight) canvas.height = imageInfo.previewHeight;
    render();
  }, [imageInfo, render]);

  useEffect(() => {
    render();
  }, [render]);

  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setCompare(false);
    setCompareX(0.5);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = fitSize(img.naturalWidth, img.naturalHeight);
        imgRef.current = img;
        setImageInfo({ name: file.name, width: img.naturalWidth, height: img.naturalHeight, previewWidth: size.width, previewHeight: size.height });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function applyPreset(key) {
    const preset = PRESETS[key];
    setAmbient(preset.ambient);
    setShadow(preset.shadow);
    setLights(preset.lights.map(light => ({ ...light, id: `${key}-${light.id}` })));
    setSelectedId(`${key}-${preset.lights[0].id}`);
  }

  function updateSelected(patch) {
    if (!selected) return;
    setLights(items => items.map(light => light.id === selected.id ? { ...light, ...patch } : light));
  }

  function addLight() {
    const next = makeLight({ name: `Light ${lights.length + 1}`, x: 0.5, y: 0.42 });
    setLights(items => [...items, next].slice(0, 5));
    setSelectedId(next.id);
  }

  function removeLight() {
    if (!selected || lights.length <= 1) return;
    const next = lights.filter(light => light.id !== selected.id);
    setLights(next);
    setSelectedId(next[0].id);
  }

  function getPointerPosition(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1),
    };
  }

  function onPointerDown(event) {
    if (!imageInfo) return;
    const pos = getPointerPosition(event);
    if (compare) {
      setCompareX(pos.x);
      dragRef.current = 'compare';
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    const nearest = lights
      .map(light => ({ light, dist: Math.hypot(light.x - pos.x, light.y - pos.y) }))
      .sort((a, b) => a.dist - b.dist)[0];
    const active = nearest && nearest.dist < 0.08 ? nearest.light : selected;
    if (active) {
      setSelectedId(active.id);
      setLights(items => items.map(light => light.id === active.id ? { ...light, ...pos } : light));
      dragRef.current = active.id;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  function onPointerMove(event) {
    if (!dragRef.current) return;
    const pos = getPointerPosition(event);
    if (dragRef.current === 'compare') {
      setCompareX(pos.x);
      return;
    }
    setLights(items => items.map(light => light.id === dragRef.current ? { ...light, ...pos } : light));
  }

  function stopDrag(event) {
    dragRef.current = null;
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch (_) {}
  }

  function download() {
    const img = imgRef.current;
    if (!img) return;
    const size = fitSize(img.naturalWidth, img.naturalHeight, 2200, 2200);
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    drawVersion(canvas.getContext('2d'), true);
    canvas.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement('a');
      const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
      a.href = URL.createObjectURL(blob);
      a.download = `relit-photo.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
    }, format, quality / 100);
  }

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
      <ImageToolsTopNav active="relight-photo" />
      <PlaygroundTopAd />
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◐</span>
          <div>
            <strong>Relight Photo</strong>
            <span>Add draggable studio, neon, sunset, or product lighting locally.</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          {imageInfo && (
            <button className={styles.ghostBtn} type="button" onClick={() => fileRef.current?.click()}>
              Replace Photo
            </button>
          )}
          <button className={styles.ghostBtn} type="button" onClick={() => setCompare(v => !v)} disabled={!imageInfo}>{compare ? 'Relit only' : 'Before / After'}</button>
          <button className={styles.primaryBtn} type="button" onClick={download} disabled={!imageInfo}>Download</button>
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
            <span className={styles.uploadIcon}>◐</span>
            <h2>Upload a photo to relight</h2>
            <p>Drop a JPEG, PNG, WebP, or screenshot. Processing stays in your browser.</p>
            <button className={styles.primaryBtn} type="button">Choose image</button>
          </div>
        </div>
      ) : (
        <div className={styles.workspace}>
          <aside className={styles.sidebar}>
            <section className={styles.panel}>
              <div className={styles.panelTitle}>Presets</div>
              <div className={styles.presetGrid}>
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <button key={key} type="button" className={styles.presetBtn} onClick={() => applyPreset(key)}>{preset.label}</button>
                ))}
              </div>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelTitle}>Scene</div>
              <label className={styles.control}>Ambient <span>{ambient}%</span><input type="range" min="20" max="100" value={ambient} onChange={e => setAmbient(Number(e.target.value))} /></label>
              <label className={styles.control}>Vignette <span>{shadow}%</span><input type="range" min="0" max="65" value={shadow} onChange={e => setShadow(Number(e.target.value))} /></label>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelTitle}>Lights</div>
                <button type="button" className={styles.tinyBtn} onClick={addLight} disabled={lights.length >= 5}>+ Add</button>
              </div>
              <div className={styles.lightList}>
                {lights.map(light => (
                  <button key={light.id} type="button" className={`${styles.lightItem} ${light.id === selected?.id ? styles.activeLight : ''}`} onClick={() => setSelectedId(light.id)}>
                    <span style={{ background: light.color }} />
                    {light.name}
                  </button>
                ))}
              </div>
              {selected && (
                <div className={styles.lightControls}>
                  <label className={styles.colorRow}>Color <input type="color" value={selected.color} onChange={e => updateSelected({ color: e.target.value })} /></label>
                  <label className={styles.control}>Intensity <span>{selected.intensity}%</span><input type="range" min="0" max="100" value={selected.intensity} onChange={e => updateSelected({ intensity: Number(e.target.value) })} /></label>
                  <label className={styles.control}>Radius <span>{selected.radius}%</span><input type="range" min="12" max="90" value={selected.radius} onChange={e => updateSelected({ radius: Number(e.target.value) })} /></label>
                  <button type="button" className={styles.dangerBtn} onClick={removeLight} disabled={lights.length <= 1}>Remove selected</button>
                </div>
              )}
            </section>

            <section className={styles.panel}>
              <div className={styles.panelTitle}>Export</div>
              <label className={styles.selectRow}>Format
                <select value={format} onChange={e => setFormat(e.target.value)}>
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </label>
              {format !== 'image/png' && (
                <label className={styles.control}>Quality <span>{quality}%</span><input type="range" min="40" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} /></label>
              )}
            </section>
          </aside>

          <main className={styles.stage}>
            <div className={styles.stageMeta}>
              <strong>{imageInfo.name}</strong>
              <span>{imageInfo.width} x {imageInfo.height}px</span>
            </div>
            <div
              className={styles.canvasShell}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
            >
              <canvas ref={canvasRef} className={styles.canvas} />
              {compare && (
                <span
                  className={styles.compareHandle}
                  style={{ left: `${compareX * 100}%` }}
                  aria-hidden="true"
                />
              )}
              {!compare && lights.map(light => (
                <span
                  key={light.id}
                  className={`${styles.lightHandle} ${light.id === selected?.id ? styles.activeHandle : ''}`}
                  style={{ left: `${light.x * 100}%`, top: `${light.y * 100}%`, '--light-color': light.color }}
                />
              ))}
            </div>
            <p className={styles.hint}>{compare ? 'Drag the divider to compare before and after.' : 'Drag on the photo to move the selected light. Click a light marker to select it.'}</p>
          </main>
        </div>
      )}
    </div>
  );
}
