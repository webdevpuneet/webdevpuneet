'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import UPNG from 'upng-js';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

/* ─── Utilities ─────────────────────────────────────────────────────────── */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function fmtBytes(n) {
  if (!n || n < 0) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

function getOutputExt(fileMime, format) {
  if (format === 'jpeg') return 'jpg';
  if (format === 'webp') return 'webp';
  if (format === 'png')  return 'png';
  if (format === 'avif') return 'avif';
  const map = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif', 'image/svg+xml': 'svg' };
  return map[fileMime] || 'jpg';
}

function loadImg(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

async function compressFile(file, { format, quality, resizeMode, resizePct, resizeMaxW, resizeMaxH, resizeExactW, resizeExactH }) {
  const url = URL.createObjectURL(file);
  try {
    const img  = await loadImg(url);
    const ow   = img.naturalWidth  || 800;
    const oh   = img.naturalHeight || 600;
    const ar   = ow / oh;
    let tw = ow, th = oh;

    if (resizeMode === 'percent') {
      tw = Math.max(1, Math.round(ow * resizePct / 100));
      th = Math.max(1, Math.round(oh * resizePct / 100));
    } else if (resizeMode === 'maxWidth' && ow > resizeMaxW) {
      tw = resizeMaxW;
      th = Math.max(1, Math.round(tw / ar));
    } else if (resizeMode === 'maxHeight' && oh > resizeMaxH) {
      th = resizeMaxH;
      tw = Math.max(1, Math.round(th * ar));
    } else if (resizeMode === 'exact') {
      const scale = Math.min(resizeExactW / ow, resizeExactH / oh);
      tw = Math.max(1, Math.round(ow * scale));
      th = Math.max(1, Math.round(oh * scale));
    }

    const mime   = format === 'original' ? (file.type || 'image/jpeg') : `image/${format}`;
    const canvas = document.createElement('canvas');
    canvas.width  = tw;
    canvas.height = th;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (mime === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, tw, th); }
    ctx.drawImage(img, 0, 0, tw, th);

    let blob;
    if (format === 'png') {
      // UPNG palette quantization — same technique as TinyPNG
      // quality 1→100 maps to 2→256 max colors
      const numColors = Math.max(2, Math.round(quality * 2.56));
      const imageData = ctx.getImageData(0, 0, tw, th);
      const encoded   = UPNG.encode([imageData.data.buffer], tw, th, numColors);
      blob = new Blob([encoded], { type: 'image/png' });
    } else {
      const q = mime === 'image/png' ? undefined : quality / 100;
      blob = await new Promise(r => canvas.toBlob(r, mime, q));
      if (!blob) throw new Error(`Format ${format} not supported by this browser`);
    }

    return { blob, width: tw, height: th, origW: ow, origH: oh };
  } finally {
    URL.revokeObjectURL(url);
  }
}

let _id = 0;
const mkId = () => `img_${++_id}`;

const FORMAT_OPTS = [
  { id: 'webp',     label: 'WebP',     tip: 'Best: ~30–70% smaller than JPEG/PNG, fully supported in all modern browsers' },
  { id: 'avif',     label: 'AVIF',     tip: 'Cutting-edge: 30–50% smaller than WebP. Chrome, Firefox, Safari 16+' },
  { id: 'jpeg',     label: 'JPEG',     tip: 'Lossy — great for photos, universal compatibility' },
  { id: 'png',      label: 'PNG',      tip: 'Palette quantization — quality controls color count (like TinyPNG)' },
  { id: 'original', label: 'Original', tip: 'Keep source format, apply quality/resize only' },
];

const RESIZE_OPTS = [
  { id: 'none',      label: 'None' },
  { id: 'percent',   label: 'Scale %' },
  { id: 'maxWidth',  label: 'Max W' },
  { id: 'maxHeight', label: 'Max H' },
  { id: 'exact',     label: 'Fit W×H' },
];

const PRESETS = [
  { label: 'OG Image',      w: 1200, h: 630 },
  { label: 'Instagram',     w: 1080, h: 1080 },
  { label: 'Twitter Header',w: 1500, h: 500 },
  { label: 'LinkedIn Cover',w: 1584, h: 396 },
  { label: 'Favicon',       w: 32,   h: 32 },
  { label: 'Full HD',       w: 1920, h: 1080 },
];

const SETTINGS_KEY = 'wdp-image-compressor-settings-v1';
const DEFAULT_SETTINGS = {
  format: 'png',
  quality: 80,
  resizeMode: 'none',
  resizePct: 80,
  resizeMaxW: 1920,
  resizeMaxH: 1080,
  resizeExactW: 1200,
  resizeExactH: 630,
  splitPos: 50,
};

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function ImageCompressorTool() {
  const [items,       setItems]       = useState([]);
  const [format,      setFormat]      = useState(DEFAULT_SETTINGS.format);
  const [quality,     setQuality]     = useState(DEFAULT_SETTINGS.quality);
  const [resizeMode,  setResizeMode]  = useState(DEFAULT_SETTINGS.resizeMode);
  const [resizePct,   setResizePct]   = useState(DEFAULT_SETTINGS.resizePct);
  const [resizeMaxW,  setResizeMaxW]  = useState(DEFAULT_SETTINGS.resizeMaxW);
  const [resizeMaxH,  setResizeMaxH]  = useState(DEFAULT_SETTINGS.resizeMaxH);
  const [resizeExactW,setResizeExactW]= useState(DEFAULT_SETTINGS.resizeExactW);
  const [resizeExactH,setResizeExactH]= useState(DEFAULT_SETTINGS.resizeExactH);
  const [selectedId,  setSelectedId]  = useState(null);
  const [splitPos,   setSplitPos]   = useState(DEFAULT_SETTINGS.splitPos);
  const [imgNaturalW, setImgNaturalW] = useState(null);
  const [dropActive, setDropActive] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const hydrated      = useRef(false);
  const versionRef    = useRef(0);
  const splitDragging  = useRef(false);
  const splitPosRef    = useRef(DEFAULT_SETTINGS.splitPos);
  const previewRef     = useRef(null);
  const handleRef      = useRef(null);
  const clipLayerRef   = useRef(null);
  const qualityTimer  = useRef(null);
  const saveTimer     = useRef(null);
  const fileInputRef  = useRef(null);

  const selected       = items.find(i => i.id === selectedId) ?? items[0] ?? null;
  const qualityOff     = format === 'original' && selected?.file?.type === 'image/png';
  const doneItems      = items.filter(i => i.status === 'done' && i.compressedSize);
  const totalOrig      = items.reduce((s, i) => s + i.originalSize, 0);
  const totalComp      = doneItems.reduce((s, i) => s + i.compressedSize, 0);
  const totalSaved     = Math.max(0, totalOrig - totalComp);
  const totalReduction = totalOrig > 0 && totalComp > 0
    ? Math.round((totalSaved / totalOrig) * 100) : 0;

  /* ── getOpts ─────────────────────────────────────────────────────────── */
  const getOpts = useCallback(() => ({
    format, quality, resizeMode, resizePct, resizeMaxW, resizeMaxH, resizeExactW, resizeExactH,
  }), [format, quality, resizeMode, resizePct, resizeMaxW, resizeMaxH, resizeExactW, resizeExactH]);

  /* ── load saved settings after mount (avoids SSR hydration mismatch) ─── */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      const s = { ...DEFAULT_SETTINGS, ...saved };
      setFormat(s.format);
      setQuality(s.quality);
      setResizeMode(s.resizeMode);
      setResizePct(s.resizePct);
      setResizeMaxW(s.resizeMaxW);
      setResizeMaxH(s.resizeMaxH);
      setResizeExactW(s.resizeExactW);
      setResizeExactH(s.resizeExactH);
      setSplitPos(s.splitPos);
      splitPosRef.current = s.splitPos;
    } catch {}
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...getOpts(), splitPos }));
      setSettingsSaved(true);
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => setSettingsSaved(false), 1300);
    } catch {}
    return () => clearTimeout(saveTimer.current);
  }, [getOpts, splitPos]);

  /* ── processItem ─────────────────────────────────────────────────────── */
  const processItem = useCallback(async (item, opts, version) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'processing' } : i));
    try {
      const result       = await compressFile(item.file, opts);
      if (versionRef.current !== version) return;
      const compressedUrl = URL.createObjectURL(result.blob);
      setItems(prev => prev.map(i => {
        if (i.id !== item.id) return i;
        if (i.compressedUrl) URL.revokeObjectURL(i.compressedUrl);
        return { ...i, status: 'done', compressedBlob: result.blob, compressedUrl,
          compressedSize: result.blob.size, compW: result.width, compH: result.height,
          origW: result.origW, origH: result.origH };
      }));
    } catch {
      if (versionRef.current !== version) return;
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'error' } : i));
    }
  }, []);

  /* ── processAll ──────────────────────────────────────────────────────── */
  const processAll = useCallback((itemList, opts) => {
    if (!itemList.length) return;
    const version = ++versionRef.current;
    itemList.forEach(item => processItem(item, opts, version));
  }, [processItem]);

  /* ── re-process when non-quality settings change ─────────────────────── */
  useEffect(() => {
    if (!items.length) return;
    processAll(items, getOpts());
  }, [format, resizeMode, resizePct, resizeMaxW, resizeMaxH, resizeExactW, resizeExactH]); // eslint-disable-line

  /* ── debounced quality ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!items.length) return;
    clearTimeout(qualityTimer.current);
    qualityTimer.current = setTimeout(() => processAll(items, getOpts()), 350);
    return () => clearTimeout(qualityTimer.current);
  }, [quality]); // eslint-disable-line

  /* ── addFiles ────────────────────────────────────────────────────────── */
  const addFiles = useCallback((fileList) => {
    const accepted = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!accepted.length) return;
    const newItems = accepted.map(file => ({
      id: mkId(), file,
      originalUrl: URL.createObjectURL(file),
      originalSize: file.size,
      name: file.name,
      status: 'processing',
      compressedBlob: null, compressedUrl: null, compressedSize: null,
      compW: 0, compH: 0, origW: 0, origH: 0,
    }));
    setItems(prev => [...newItems, ...prev]);
    setSelectedId(prev => prev ?? newItems[0].id);
    const version = ++versionRef.current;
    const opts    = getOpts();
    newItems.forEach(item => processItem(item, opts, version));
  }, [processItem, getOpts]);

  /* ── removeItem ──────────────────────────────────────────────────────── */
  function removeItem(id) {
    setItems(prev => {
      const found = prev.find(i => i.id === id);
      if (found) {
        URL.revokeObjectURL(found.originalUrl);
        if (found.compressedUrl) URL.revokeObjectURL(found.compressedUrl);
      }
      return prev.filter(i => i.id !== id);
    });
    setSelectedId(prev => prev === id ? null : prev);
  }

  /* ── download ────────────────────────────────────────────────────────── */
  function downloadItem(item) {
    if (!item.compressedUrl) return;
    const ext  = getOutputExt(item.file.type, format);
    const base = item.name.replace(/\.[^.]+$/, '');
    const a    = document.createElement('a');
    a.href = item.compressedUrl;
    a.download = `${base}-compressed.${ext}`;
    a.click();
  }

  function downloadAll() {
    doneItems.forEach((item, idx) => setTimeout(() => downloadItem(item), idx * 250));
  }

  /* ── clipboard paste ─────────────────────────────────────────────────── */
  useEffect(() => {
    const h = e => {
      if (!e.clipboardData) return;
      const imgs = [];
      for (const item of e.clipboardData.items) {
        if (item.type.startsWith('image/')) { const f = item.getAsFile(); if (f) imgs.push(f); }
      }
      if (imgs.length) addFiles(imgs);
    };
    window.addEventListener('paste', h);
    return () => window.removeEventListener('paste', h);
  }, [addFiles]);

  /* ── split-slider mouse ──────────────────────────────────────────────── */
  useEffect(() => {
    const mm = e => {
      if (!splitDragging.current || !previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const pos  = clamp((e.clientX - rect.left) / rect.width * 100, 2, 98);
      splitPosRef.current = pos;
      if (handleRef.current)    handleRef.current.style.left        = `${pos}%`;
      if (clipLayerRef.current) clipLayerRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    };
    const mu = () => {
      if (!splitDragging.current) return;
      splitDragging.current = false;
      setSplitPos(splitPosRef.current);
    };
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup',   mu);
    return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu); };
  }, []);

  /* ── badge color ─────────────────────────────────────────────────────── */
  function badgeClass(pct) {
    if (pct >= 40) return styles.badgeGreen;
    if (pct >= 15) return styles.badgeYellow;
    if (pct > 0)   return styles.badgeBlue;
    return styles.badgeGray;
  }

  /* ── selected item stats ─────────────────────────────────────────────── */
  const selReduction = selected?.compressedSize
    ? Math.round((1 - selected.compressedSize / selected.originalSize) * 100) : null;
  const selOutMime = selected
    ? (format === 'original' ? selected.file.type : `image/${format}`)
    : '';

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="image-compressor" />
      <PlaygroundTopAd />

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4ade9e" strokeWidth="1.5"/>
              <path d="M8 12l3 3 5-5" stroke="#4ade9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Image <span style={{ color: '#4ade9e' }}>Compressor</span> <span style={{ color: 'rgba(255,255,255,0.35)' }}>+</span> <span style={{ color: '#60a5fa' }}>Converter</span></span>
        </div>

        <div className={styles.headerRight}>
          {doneItems.length > 1 && (
            <span className={styles.totalSaved}>
              Saved {fmtBytes(totalSaved)} ({totalReduction}%) across {doneItems.length} images
            </span>
          )}
          <span className={styles.savedSettings}>
            {settingsSaved ? 'Settings saved' : 'Auto-saves settings'}
          </span>
          {doneItems.length > 0 && (
            <button className={styles.dlAllBtn} onClick={downloadAll}>
              ↓ Download All ({doneItems.length})
            </button>
          )}
          {items.length > 0 && (
            <button className={styles.clearAllBtn} onClick={() => {
              items.forEach(i => {
                URL.revokeObjectURL(i.originalUrl);
                if (i.compressedUrl) URL.revokeObjectURL(i.compressedUrl);
              });
              setItems([]);
              setSelectedId(null);
              setSplitPos(DEFAULT_SETTINGS.splitPos);
              splitPosRef.current = DEFAULT_SETTINGS.splitPos;
              setImgNaturalW(null);
            }}>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ══ LEFT — controls ═════════════════════════════════════════ */}
        <div className={styles.rightPane}>

          {/* Preview label */}
          <div className={styles.previewLabel}>
            {selected ? (
              <>
                <span className={styles.previewFilename} title={selected.name}>
                  {selected.name}
                </span>
                {selected.status === 'processing' && (
                  <span className={styles.processingTag}>Processing…</span>
                )}
              </>
            ) : (
              <span className={styles.sectionLabel}>Preview</span>
            )}
            {selected?.compressedUrl && (
              <span className={styles.dragHint}>← drag to compare →</span>
            )}
          </div>

          {/* Split-slider comparison */}
          <div ref={previewRef} className={styles.splitWrap}
            style={{
              cursor: selected?.compressedUrl ? 'ew-resize' : 'default',
              maxWidth: imgNaturalW ? `${imgNaturalW}px` : '100%',
            }}
            onMouseDown={e => {
              if (!selected?.compressedUrl || !previewRef.current) return;
              const rect = previewRef.current.getBoundingClientRect();
              const pos  = clamp((e.clientX - rect.left) / rect.width * 100, 2, 98);
              splitPosRef.current = pos;
              if (handleRef.current)    handleRef.current.style.left        = `${pos}%`;
              if (clipLayerRef.current) clipLayerRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
              splitDragging.current = true;
            }}>

            {!selected ? (
              <div className={styles.splitEmpty}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" opacity="0.2">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="8.5" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.1"/>
                  <path d="M2 17l5-5 4 4 3-3 8 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
                <span>Upload images to compare</span>
              </div>
            ) : (
              <>
                {/* Bottom: compressed */}
                {selected.compressedUrl
                  ? <img
                      src={selected.compressedUrl}
                      alt="Compressed"
                      className={styles.splitImg}
                      draggable={false}
                      onLoad={e => setImgNaturalW(e.target.naturalWidth)}
                    />
                  : <div className={styles.splitLoading}><div className={styles.spinner}/></div>
                }

                {/* Top: original, clipped */}
                {selected.compressedUrl && (
                  <div ref={clipLayerRef} className={styles.splitOrigLayer}
                    style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}>
                    <img src={selected.originalUrl} alt="Original" className={styles.splitImg} draggable={false} />
                  </div>
                )}

                {/* Divider */}
                {selected.compressedUrl && (
                  <div ref={handleRef} className={styles.splitHandle} style={{ left: `${splitPos}%` }}
                    onMouseDown={() => { splitDragging.current = true; }}>
                    <div className={styles.splitLine} />
                    <div className={styles.splitKnob}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Labels */}
                {selected.compressedUrl && (
                  <>
                    <div className={styles.labelLeft}>Original</div>
                    <div className={styles.labelRight}>
                      {format === 'original' ? 'Compressed' : `→ ${getOutputExt(selected.file.type, format).toUpperCase()}`}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Stats strip */}
          {selected?.status === 'done' && selected.compressedSize && (
            <div className={styles.statsStrip}>
              {[
                { k: 'Before', v: fmtBytes(selected.originalSize) },
                { k: 'After',  v: fmtBytes(selected.compressedSize), green: true },
                { k: 'Saved',  v: selReduction !== null
                    ? `${fmtBytes(Math.max(0, selected.originalSize - selected.compressedSize))} (${selReduction > 0 ? '-' : selReduction < 0 ? '+' : ''}${Math.abs(selReduction)}%)`
                    : '—',
                  green: selReduction > 0 },
                { k: 'Size',   v: selected.origW ? `${selected.compW}×${selected.compH}` : '—' },
              ].map(({ k, v, green }) => (
                <div key={k} className={styles.statCell}>
                  <span className={styles.statKey}>{k}</span>
                  <span className={`${styles.statVal} ${green ? styles.statGreen : ''}`}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Download selected */}
          {selected?.status === 'done' && selected.compressedSize && (
            <div className={styles.downloadWrap}>
              <button className={styles.downloadBtn} onClick={() => downloadItem(selected)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 19h14M5 13l7 6 7-6" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download — {fmtBytes(selected.compressedSize)}
                {selOutMime && <span className={styles.dlExt}>{selOutMime.replace('image/','').toUpperCase()}</span>}
              </button>
            </div>
          )}
        </div>

        {/* ══ RIGHT — preview ═════════════════════════════════════════ */}
        <div className={styles.leftPane}>

          {/* ── Images section ─────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Images</div>

            {/* Drop zone */}
            <div
              className={`${styles.dropZone} ${dropActive ? styles.dropActive : ''} ${items.length > 0 ? styles.dropCompact : ''}`}
              onDragOver={e => { e.preventDefault(); setDropActive(true); }}
              onDragLeave={() => setDropActive(false)}
              onDrop={e => { e.preventDefault(); setDropActive(false); addFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
            >
              {items.length === 0 ? (
                <>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={styles.dropIcon}>
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="8.5" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.1"/>
                    <path d="M2 17l5-5 4 4 3-3 8 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    <path d="M12 1v5M10 3l2-2 2 2" stroke="#4ade9e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className={styles.dropTitle}>Drop images here</div>
                  <div className={styles.dropSub}>click · drag & drop · Ctrl+V to paste</div>
                  <div className={styles.dropFmts}>PNG · JPEG · WebP · GIF · BMP</div>
                </>
              ) : (
                <div className={styles.dropCompactRow}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Add more images
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" multiple className={styles.fileInput}
                onChange={e => { addFiles(e.target.files); e.target.value = ''; }} />
            </div>

            {/* File list */}
            {items.length > 0 && (
              <div className={styles.fileList}>
                {items.map(item => {
                  const pct = item.originalSize > 0 && item.compressedSize
                    ? Math.round((1 - item.compressedSize / item.originalSize) * 100) : null;
                  const active = item.id === selected?.id;
                  const inFmt  = item.file.type.replace('image/', '').replace('jpeg', 'jpg').toUpperCase();
                  const outFmt = getOutputExt(item.file.type, format).toUpperCase();
                  const isConverting = format !== 'original' && inFmt !== outFmt;
                  return (
                    <div key={item.id}
                      className={`${styles.fileRow} ${active ? styles.fileRowActive : ''}`}
                      onClick={() => { setSelectedId(item.id); setImgNaturalW(null); }}>

                      <div className={styles.fileAccent} style={{ background: active ? '#4ade9e' : 'transparent' }} />

                      <div className={styles.thumb}>
                        <img src={item.originalUrl} alt="" className={styles.thumbImg} />
                        {item.status === 'processing' && <div className={styles.thumbOverlay}><div className={styles.thumbSpin}/></div>}
                      </div>

                      <div className={styles.fileInfo}>
                        <div className={styles.fileName} title={item.name}>{item.name}</div>
                        <div className={styles.fileSizes}>
                          <span className={styles.origSize}>{fmtBytes(item.originalSize)}</span>
                          {item.compressedSize && (
                            <><span className={styles.szArrow}>→</span>
                            <span className={styles.compSize}>{fmtBytes(item.compressedSize)}</span></>
                          )}
                        </div>
                        {item.origW > 0 && (
                          <div className={styles.fileDims}>
                            {item.origW}×{item.origH}
                            {item.compW !== item.origW && <> → {item.compW}×{item.compH}</>}
                          </div>
                        )}
                      </div>

                      <div className={styles.fileEnd}>
                        {isConverting && (
                          <span className={styles.convBadge}>{inFmt}→{outFmt}</span>
                        )}
                        {pct !== null && (
                          <span className={`${styles.badge} ${badgeClass(pct)}`}>
                            {pct > 0 ? `-${pct}%` : pct < 0 ? `+${Math.abs(pct)}%` : '±0'}
                          </span>
                        )}
                        {item.status === 'done' && (
                          <button className={styles.dlRowBtn} title="Download"
                            onClick={e => { e.stopPropagation(); downloadItem(item); }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                              <path d="M12 5v14M5 19h14M5 13l7 6 7-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        )}
                        <button className={styles.removeBtn} title="Remove"
                          onClick={e => { e.stopPropagation(); removeItem(item.id); }}>×</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Convert To section ─────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Convert To</div>
            <div className={styles.optionGrid}>
              {FORMAT_OPTS.map(f => (
                <button key={f.id} title={f.tip}
                  className={`${styles.optBtn} ${format === f.id ? styles.optBtnActive : ''}`}
                  onClick={() => setFormat(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className={styles.fmtTip}>{FORMAT_OPTS.find(f => f.id === format)?.tip}</div>
          </div>

          {/* ── Quality section ─────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              Quality
              <span className={styles.qualNum} style={{ opacity: qualityOff ? 0.4 : 1 }}>{quality}%</span>
            </div>
            <div className={styles.sliderRow}>
              <span className={styles.sliderEdge}>1</span>
              <input type="range" min="1" max="100" value={quality}
                disabled={qualityOff}
                onChange={e => setQuality(+e.target.value)}
                className={`${styles.slider} ${qualityOff ? styles.sliderOff : ''}`} />
              <span className={styles.sliderEdge}>100</span>
            </div>
            {format === 'png' && (
              <div className={styles.infoNote}>
                Quality sets the max color palette size (2–256 colors). Lower = smaller file, fewer colors — same technique as TinyPNG.
              </div>
            )}
            {qualityOff && (
              <div className={styles.infoNote}>
                PNG (original mode) is lossless — switch to PNG format for palette quantization, or WebP/JPEG to reduce size.
              </div>
            )}
          </div>

          {/* ── Resize section ──────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Resize</div>
            <div className={styles.optionGrid}>
              {RESIZE_OPTS.map(r => (
                <button key={r.id}
                  className={`${styles.optBtn} ${resizeMode === r.id ? styles.optBtnActive : ''}`}
                  onClick={() => setResizeMode(r.id)}>
                  {r.label}
                </button>
              ))}
            </div>
            {resizeMode === 'percent' && (
              <div className={styles.resizeRow}>
                <input type="number" min="10" max="100" value={resizePct}
                  onChange={e => setResizePct(clamp(+e.target.value, 10, 100))}
                  className={styles.numInput} />
                <span className={styles.numLabel}>% of original dimensions</span>
              </div>
            )}
            {resizeMode === 'maxWidth' && (
              <div className={styles.resizeRow}>
                <input type="number" min="1" value={resizeMaxW}
                  onChange={e => setResizeMaxW(Math.max(1, +e.target.value))}
                  className={styles.numInput} />
                <span className={styles.numLabel}>px max width (aspect ratio kept)</span>
              </div>
            )}
            {resizeMode === 'maxHeight' && (
              <div className={styles.resizeRow}>
                <input type="number" min="1" value={resizeMaxH}
                  onChange={e => setResizeMaxH(Math.max(1, +e.target.value))}
                  className={styles.numInput} />
                <span className={styles.numLabel}>px max height (aspect ratio kept)</span>
              </div>
            )}
            {resizeMode === 'exact' && (
              <>
                <div className={styles.resizeRow}>
                  <input type="number" min="1" value={resizeExactW}
                    onChange={e => setResizeExactW(Math.max(1, +e.target.value))}
                    className={styles.numInput} />
                  <span className={styles.numLabel}>×</span>
                  <input type="number" min="1" value={resizeExactH}
                    onChange={e => setResizeExactH(Math.max(1, +e.target.value))}
                    className={styles.numInput} />
                  <span className={styles.numLabel}>px (fit, keep AR)</span>
                </div>
                <div className={styles.presetGrid}>
                  {PRESETS.map(p => (
                    <button key={p.label} className={styles.presetBtn}
                      onClick={() => { setResizeExactW(p.w); setResizeExactH(p.h); }}>
                      {p.label}
                      <span className={styles.presetDims}>{p.w}×{p.h}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>{/* end rightPane */}
      </div>
    </div>
  );
}
