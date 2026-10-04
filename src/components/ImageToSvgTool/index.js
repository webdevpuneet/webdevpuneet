'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ─── Constants ────────────────────────────────────────────────────────── */
const ACCENT = '#f97316';

const PRESETS = [
  { id: 'logo',         label: 'Logo',        hint: '8 colors · smooth',      colorMode: 'color',     numColors: 8,  smoothing: 2.5, pathOmit: 6,  threshold: 128, srcBlur: 0, strokeWidth: 0, lineFilter: true,  cornerSnap: true  },
  { id: 'icon',         label: 'Icon',         hint: '4 colors · very smooth', colorMode: 'color',     numColors: 4,  smoothing: 4,   pathOmit: 4,  threshold: 128, srcBlur: 0, strokeWidth: 0, lineFilter: true,  cornerSnap: true  },
  { id: 'sketch',       label: 'Sketch',       hint: 'B&W · sharp lines',      colorMode: 'bw',        numColors: 2,  smoothing: 0.5, pathOmit: 2,  threshold: 140, srcBlur: 0, strokeWidth: 0, lineFilter: false, cornerSnap: false },
  { id: 'illustration', label: 'Illustration', hint: '24 colors · detailed',   colorMode: 'color',     numColors: 24, smoothing: 1,   pathOmit: 8,  threshold: 128, srcBlur: 1, strokeWidth: 0, lineFilter: true,  cornerSnap: false },
];

const COLOR_MODES = [
  { id: 'color',     label: 'Color' },
  { id: 'grayscale', label: 'Grayscale' },
  { id: 'bw',        label: 'B & W' },
];

const BG_OPTIONS = [
  { id: 'checker', label: 'Checker' },
  { id: 'white',   label: 'White' },
  { id: 'black',   label: 'Black' },
  { id: 'none',    label: 'None' },
];

/* ─── Helpers ──────────────────────────────────────────────────────────── */
function fmtBytes(n) {
  if (!n) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

function applyGrayscale(imgData) {
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const lum = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
    d[i] = d[i + 1] = d[i + 2] = lum;
  }
  return imgData;
}

function applyThreshold(imgData, threshold) {
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    d[i] = d[i + 1] = d[i + 2] = lum >= threshold ? 255 : 0;
  }
  return imgData;
}

function getImageData(src, maxW = 1200) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > maxW) { h = Math.round((h * maxW) / w); w = maxW; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve({ imageData: canvas.getContext('2d').getImageData(0, 0, w, h), w, h });
    };
    img.onerror = reject;
    img.src = src;
  });
}

/* ─── Post-process: inject SVG filters ────────────────────────────────── */
function applyEffects(svgStr, { outputBlur, sharpen, dropShadow, shadowBlur, shadowX, shadowY }) {
  if (!svgStr) return svgStr;
  const hasEffects = outputBlur > 0 || sharpen || dropShadow;
  if (!hasEffects) return svgStr;

  const parts = [];
  if (sharpen) parts.push(`<feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" preserveAlpha="true"/>`);
  if (outputBlur > 0) parts.push(`<feGaussianBlur stdDeviation="${outputBlur}"/>`);
  if (dropShadow) parts.push(`<feDropShadow dx="${shadowX}" dy="${shadowY}" stdDeviation="${shadowBlur}" flood-opacity="0.55"/>`);

  const filterTag = `<defs><filter id="svgfx" x="-25%" y="-25%" width="150%" height="150%">${parts.join('')}</filter></defs>`;
  return svgStr.replace(/(<svg\b[^>]*>)([\s\S]*)(<\/svg>)/,
    (_, open, inner, close) => `${open}${filterTag}<g filter="url(#svgfx)">${inner}</g>${close}`
  );
}

/* ─── SVG icons ────────────────────────────────────────────────────────── */
function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M2 8l4 4 8-8" stroke="#4ade9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Toggle ───────────────────────────────────────────────────────────── */
function Toggle({ on, onChange }) {
  return (
    <button
      role="switch" aria-checked={on}
      className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
      onClick={() => onChange(!on)}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

/* ─── Component ────────────────────────────────────────────────────────── */
export default function ImageToSvgTool() {
  const [file,         setFile]         = useState(null);
  const [svgString,    setSvgString]    = useState('');
  const [svgSize,      setSvgSize]      = useState(0);
  const [processing,   setProcessing]   = useState(false);
  const [error,        setError]        = useState('');
  const [dragging,     setDragging]     = useState(false);
  const [activeTab,    setActiveTab]    = useState('preview');
  const [bgStyle,      setBgStyle]      = useState('checker');
  const [copied,       setCopied]       = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  /* ── Tracing controls (trigger re-trace) ────────────────────────────── */
  const [colorMode,    setColorMode]    = useState('color');
  const [numColors,    setNumColors]    = useState(16);
  const [threshold,    setThreshold]    = useState(128);
  const [smoothing,    setSmoothing]    = useState(1);
  const [pathOmit,     setPathOmit]     = useState(8);
  const [srcBlur,      setSrcBlur]      = useState(0);
  const [strokeWidth,  setStrokeWidth]  = useState(0);
  const [lineFilter,   setLineFilter]   = useState(false);
  const [cornerSnap,   setCornerSnap]   = useState(true);

  /* ── Post-process SVG effects (no re-trace) ─────────────────────────── */
  const [outputBlur,   setOutputBlur]   = useState(0);
  const [sharpen,      setSharpen]      = useState(false);
  const [dropShadow,   setDropShadow]   = useState(false);
  const [shadowBlur,   setShadowBlur]   = useState(3);
  const [shadowX,      setShadowX]      = useState(2);
  const [shadowY,      setShadowY]      = useState(2);

  /* ── Split slider ───────────────────────────────────────────────────── */
  const [splitPct,     setSplitPct]     = useState(50);
  const splitDragging  = useRef(false);
  const compareRef     = useRef(null);

  const fileRef        = useRef(null);
  const tracerRef      = useRef(null);
  const traceIdRef     = useRef(0);

  /* ── SVG with effects applied — used for preview & download ─────────── */
  const displaySvg = useMemo(() =>
    applyEffects(svgString, { outputBlur, sharpen, dropShadow, shadowBlur, shadowX, shadowY }),
    [svgString, outputBlur, sharpen, dropShadow, shadowBlur, shadowX, shadowY]
  );

  /* ── Load imagetracerjs ──────────────────────────────────────────────── */
  useEffect(() => {
    import('imagetracerjs').then(mod => {
      tracerRef.current = mod.default ?? mod;
    }).catch(() => setError('Failed to load tracing library.'));
  }, []);

  /* ── Blob URL for compare tab ────────────────────────────────────────── */
  const [svgUrl, setSvgUrl] = useState('');
  useEffect(() => {
    if (!displaySvg) { setSvgUrl(''); return; }
    const blob = new Blob([displaySvg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    setSvgUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [displaySvg]);

  /* ── Trace ───────────────────────────────────────────────────────────── */
  const runTrace = useCallback(async (fileState, opts) => {
    if (!fileState || !tracerRef.current) return;
    const id = ++traceIdRef.current;
    setProcessing(true);
    setError('');
    try {
      const { imageData, w, h } = await getImageData(fileState.dataUrl);
      let processedData = imageData;
      if (opts.colorMode === 'grayscale') {
        processedData = applyGrayscale(new ImageData(new Uint8ClampedArray(imageData.data), w, h));
      } else if (opts.colorMode === 'bw') {
        processedData = applyThreshold(new ImageData(new Uint8ClampedArray(imageData.data), w, h), opts.threshold);
      }
      const svg = tracerRef.current.imagedataToSVG(processedData, {
        numberofcolors:    opts.colorMode === 'bw' ? 2 : opts.numColors,
        pathomit:          opts.pathOmit,
        ltres:             opts.smoothing,
        qtres:             opts.smoothing,
        strokewidth:       opts.strokeWidth,
        blurradius:        opts.srcBlur,
        linefilter:        opts.lineFilter,
        rightangleenhance: opts.cornerSnap,
      });
      if (traceIdRef.current !== id) return;
      setSvgString(svg);
      setSvgSize(new Blob([svg]).size);
    } catch {
      if (traceIdRef.current !== id) return;
      setError('Tracing failed. Try a smaller or simpler image.');
    } finally {
      if (traceIdRef.current === id) setProcessing(false);
    }
  }, []);

  const traceOpts = { colorMode, numColors, threshold, smoothing, pathOmit, srcBlur, strokeWidth, lineFilter, cornerSnap };

  useEffect(() => {
    if (!file || !tracerRef.current) return;
    runTrace(file, traceOpts);
  }, [file, colorMode, numColors, threshold, smoothing, pathOmit, srcBlur, strokeWidth, lineFilter, cornerSnap, runTrace]);

  useEffect(() => {
    const iv = setInterval(() => {
      if (tracerRef.current && file && !svgString && !processing) {
        runTrace(file, traceOpts);
        clearInterval(iv);
      }
    }, 200);
    return () => clearInterval(iv);
  }, [file, svgString, processing]);

  /* ── Presets ─────────────────────────────────────────────────────────── */
  function applyPreset(p) {
    setActivePreset(p.id);
    setColorMode(p.colorMode);
    setNumColors(p.numColors);
    setSmoothing(p.smoothing);
    setPathOmit(p.pathOmit);
    setThreshold(p.threshold);
    setSrcBlur(p.srcBlur);
    setStrokeWidth(p.strokeWidth);
    setLineFilter(p.lineFilter);
    setCornerSnap(p.cornerSnap);
  }
  function clearPreset() { setActivePreset(null); }

  /* ── Load file ───────────────────────────────────────────────────────── */
  const loadFile = useCallback((f) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) { setError('Please upload a PNG, JPEG, WebP, GIF, or BMP image.'); return; }
    if (f.size > 10 * 1024 * 1024) { setError('File too large. Max 10 MB.'); return; }
    setError('');
    setSvgString('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => setFile({ dataUrl, name: f.name, size: f.size, w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => setError('Could not read image.');
      img.src = dataUrl;
    };
    reader.readAsDataURL(f);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!e.clipboardData) return;
      for (const item of e.clipboardData.items) {
        if (item.type.startsWith('image/')) { loadFile(item.getAsFile()); break; }
      }
    };
    window.addEventListener('paste', handler);
    return () => window.removeEventListener('paste', handler);
  }, [loadFile]);

  function onDrop(e) { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files?.[0]); }
  function onDragOver(e) { e.preventDefault(); setDragging(true); }
  function onDragLeave() { setDragging(false); }

  /* ── Split slider ────────────────────────────────────────────────────── */
  function onSplitDown(e) { e.preventDefault(); splitDragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); }
  function onSplitMove(e) {
    if (!splitDragging.current || !compareRef.current) return;
    const rect = compareRef.current.getBoundingClientRect();
    setSplitPct(Math.max(3, Math.min(97, ((e.clientX - rect.left) / rect.width) * 100)));
  }
  function onSplitUp() { splitDragging.current = false; }

  /* ── Copy / Download ─────────────────────────────────────────────────── */
  function copySvg() {
    if (!displaySvg) return;
    navigator.clipboard.writeText(displaySvg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function downloadSvg() {
    if (!displaySvg) return;
    const blob = new Blob([displaySvg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'image') + '.svg';
    a.click();
    URL.revokeObjectURL(url);
  }

  function clear() {
    setFile(null); setSvgString(''); setSvgSize(0); setError(''); setActivePreset(null);
    setSrcBlur(0); setStrokeWidth(0); setLineFilter(false); setCornerSnap(true);
    setOutputBlur(0); setSharpen(false); setDropShadow(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  const bgMap  = { checker: undefined, white: '#ffffff', black: '#000000', none: 'transparent' };
  const hasResult = !!svgString;

  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="image-to-svg" />
      <PlaygroundTopAd />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke={ACCENT} strokeWidth="1.5"/>
              <path d="M6 16l4-5 3 3.5 2-2.5 3 4" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8.5" cy="9.5" r="1.5" stroke={ACCENT} strokeWidth="1.2"/>
              <path d="M18 2l2 2-2 2M14 4h6" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span>Image <span style={{ color: ACCENT }}>to SVG</span></span>
        </div>
        <div className={styles.headerRight}>
          {hasResult && (
            <>
              <button className={styles.copyBtn2} onClick={copySvg}>
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? 'Copied!' : 'Copy SVG'}
              </button>
              <button className={styles.downloadBtn} onClick={downloadSvg}>
                <DownloadIcon />
                Download SVG
              </button>
            </>
          )}
          {file && <button className={styles.clearBtn} onClick={clear}>Clear</button>}
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Left panel ────────────────────────────────────────────────── */}
        <div className={styles.leftPane}>

          {!file ? (
            <div
              className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ''}`}
              onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
              onClick={() => fileRef.current?.click()}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className={styles.dropIcon}>
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 16l4-5 3 3.5 2-2.5 3 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M12 1v6M9 4l3-3 3 3" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.dropTitle}>Drop image here</div>
              <div className={styles.dropSub}>or click to upload · Ctrl+V to paste</div>
              <div className={styles.dropFormats}>PNG · JPEG · WebP · GIF · BMP</div>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/bmp"
                className={styles.fileInput}
                onChange={e => { loadFile(e.target.files?.[0]); e.target.value = ''; }} />
            </div>
          ) : (
            <>
              <div className={styles.thumbWrap}
                onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
                <div className={styles.thumbInner} onClick={() => fileRef.current?.click()}>
                  <img src={file.dataUrl} alt="Source" className={styles.thumbImg} />
                  <div className={styles.thumbOverlay}><span>Click to replace</span></div>
                </div>
                <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/bmp"
                  className={styles.fileInput}
                  onChange={e => { loadFile(e.target.files?.[0]); e.target.value = ''; }} />
              </div>

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>File</span>
                  <span className={styles.metaVal} title={file.name}>{file.name}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>Size</span>
                  <span className={styles.metaVal}>{fmtBytes(file.size)}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>Dimensions</span>
                  <span className={styles.metaVal}>{file.w} × {file.h}px</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>SVG size</span>
                  <span className={styles.metaVal} style={{ color: ACCENT }}>{fmtBytes(svgSize)}</span>
                </div>
              </div>
            </>
          )}

          {error && <div className={styles.errorMsg}>{error}</div>}

          {file && (
            <>
              {/* ── Quick Presets ──────────────────────────────────────── */}
              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Quick Presets</div>
                <div className={styles.presetGrid}>
                  {PRESETS.map(p => (
                    <button key={p.id}
                      className={`${styles.presetBtn} ${activePreset === p.id ? styles.presetBtnActive : ''}`}
                      onClick={() => applyPreset(p)} title={p.hint}>
                      <span className={styles.presetName}>{p.label}</span>
                      <span className={styles.presetHint}>{p.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Color Mode ────────────────────────────────────────── */}
              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Color Mode</div>
                <div className={styles.modeTabs}>
                  {COLOR_MODES.map(m => (
                    <button key={m.id}
                      className={`${styles.modeTab} ${colorMode === m.id ? styles.modeTabActive : ''}`}
                      onClick={() => { setColorMode(m.id); clearPreset(); }}>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {colorMode !== 'bw' && (
                <div className={styles.controlSection}>
                  <div className={styles.controlLabel}>Colors — <span className={styles.accentVal}>{numColors}</span></div>
                  <input type="range" min="2" max="32" step="1" value={numColors}
                    onChange={e => { setNumColors(+e.target.value); clearPreset(); }} className={styles.slider} />
                  <div className={styles.sliderHint}><span>2</span><span>32</span></div>
                </div>
              )}

              {colorMode === 'bw' && (
                <div className={styles.controlSection}>
                  <div className={styles.controlLabel}>Threshold — <span className={styles.accentVal}>{threshold}</span></div>
                  <input type="range" min="0" max="255" step="1" value={threshold}
                    onChange={e => { setThreshold(+e.target.value); clearPreset(); }} className={styles.slider} />
                  <div className={styles.sliderHint}><span>Dark</span><span>Light</span></div>
                </div>
              )}

              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Smoothing — <span className={styles.accentVal}>{smoothing}</span></div>
                <input type="range" min="0.1" max="5" step="0.1" value={smoothing}
                  onChange={e => { setSmoothing(+e.target.value); clearPreset(); }} className={styles.slider} />
                <div className={styles.sliderHint}><span>Sharp</span><span>Smooth</span></div>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Detail — <span className={styles.accentVal}>{pathOmit < 4 ? 'High' : pathOmit < 10 ? 'Medium' : 'Low'}</span></div>
                <input type="range" min="1" max="20" step="1" value={pathOmit}
                  onChange={e => { setPathOmit(+e.target.value); clearPreset(); }} className={styles.slider} />
                <div className={styles.sliderHint}><span>Max detail</span><span>Simplified</span></div>
              </div>

              {/* ═══ PRE-TRACE ════════════════════════════════════════ */}
              <div className={styles.sectionDivider}>
                <span>Pre-Trace</span>
                <span className={styles.sectionDividerHint}>applied before tracing</span>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Source Blur — <span className={styles.accentVal}>{srcBlur === 0 ? 'Off' : srcBlur}</span></div>
                <input type="range" min="0" max="5" step="1" value={srcBlur}
                  onChange={e => { setSrcBlur(+e.target.value); clearPreset(); }} className={styles.slider} />
                <div className={styles.sliderHint}><span>Off</span><span>Strong blur</span></div>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Stroke Width — <span className={styles.accentVal}>{strokeWidth === 0 ? 'Off' : strokeWidth + 'px'}</span></div>
                <input type="range" min="0" max="5" step="0.5" value={strokeWidth}
                  onChange={e => { setStrokeWidth(+e.target.value); clearPreset(); }} className={styles.slider} />
                <div className={styles.sliderHint}><span>Off</span><span>5px</span></div>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>
                    <span className={styles.toggleTitle}>Line Noise Filter</span>
                    <span className={styles.toggleSub}>Remove speckle artifacts</span>
                  </span>
                  <Toggle on={lineFilter} onChange={v => { setLineFilter(v); clearPreset(); }} />
                </div>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>
                    <span className={styles.toggleTitle}>Corner Snap</span>
                    <span className={styles.toggleSub}>Snap ~90° angles to exact right angles</span>
                  </span>
                  <Toggle on={cornerSnap} onChange={v => { setCornerSnap(v); clearPreset(); }} />
                </div>
              </div>

              {/* ═══ SVG EFFECTS ══════════════════════════════════════ */}
              <div className={styles.sectionDivider}>
                <span>SVG Effects</span>
                <span className={styles.sectionDividerHint}>instant · no re-trace</span>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Output Softness — <span className={styles.accentVal}>{outputBlur === 0 ? 'Off' : outputBlur}</span></div>
                <input type="range" min="0" max="8" step="0.5" value={outputBlur}
                  onChange={e => setOutputBlur(+e.target.value)} className={styles.slider} />
                <div className={styles.sliderHint}><span>Off</span><span>Soft glow</span></div>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>
                    <span className={styles.toggleTitle}>Sharpen</span>
                    <span className={styles.toggleSub}>Edge-enhance the SVG paths</span>
                  </span>
                  <Toggle on={sharpen} onChange={setSharpen} />
                </div>
              </div>

              <div className={styles.controlSection}>
                <div className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>
                    <span className={styles.toggleTitle}>Drop Shadow</span>
                    <span className={styles.toggleSub}>Add depth shadow to all paths</span>
                  </span>
                  <Toggle on={dropShadow} onChange={setDropShadow} />
                </div>

                {dropShadow && (
                  <div className={styles.subControls}>
                    <div className={styles.subRow}>
                      <span className={styles.subLabel}>Blur</span>
                      <input type="range" min="0" max="10" step="0.5" value={shadowBlur}
                        onChange={e => setShadowBlur(+e.target.value)} className={styles.sliderSm} />
                      <span className={styles.subVal}>{shadowBlur}</span>
                    </div>
                    <div className={styles.subRow}>
                      <span className={styles.subLabel}>X offset</span>
                      <input type="range" min="-10" max="10" step="0.5" value={shadowX}
                        onChange={e => setShadowX(+e.target.value)} className={styles.sliderSm} />
                      <span className={styles.subVal}>{shadowX}</span>
                    </div>
                    <div className={styles.subRow}>
                      <span className={styles.subLabel}>Y offset</span>
                      <input type="range" min="-10" max="10" step="0.5" value={shadowY}
                        onChange={e => setShadowY(+e.target.value)} className={styles.sliderSm} />
                      <span className={styles.subVal}>{shadowY}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Right panel ───────────────────────────────────────────────── */}
        <div className={styles.rightPane}>

          <div className={styles.paneHeader}>
            <div className={styles.tabs}>
              {[{ id: 'preview', label: 'Preview' }, { id: 'compare', label: 'Compare' }, { id: 'code', label: 'SVG Code' }]
                .map(t => (
                  <button key={t.id}
                    className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(t.id)}>
                    {t.label}
                  </button>
                ))}
            </div>
            {(activeTab === 'preview' || activeTab === 'compare') && hasResult && (
              <div className={styles.bgPicker}>
                <span className={styles.bgLabel}>BG:</span>
                {BG_OPTIONS.map(b => (
                  <button key={b.id}
                    className={`${styles.bgBtn} ${bgStyle === b.id ? styles.bgBtnActive : ''}`}
                    onClick={() => setBgStyle(b.id)}>
                    {b.label}
                  </button>
                ))}
              </div>
            )}
            {processing && <span className={styles.processingBadge}>Tracing…</span>}
          </div>

          <div className={styles.paneBody}>

            {!file && !processing && (
              <div className={styles.emptyState}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" opacity="0.15">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.1"/>
                  <path d="M6 16l4-5 3 3.5 2-2.5 3 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                  <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1"/>
                </svg>
                <p>Upload an image to vectorize it</p>
                <p className={styles.emptyHint}>Works best with logos, icons, illustrations, and line art</p>
              </div>
            )}

            {processing && (
              <div className={styles.emptyState}>
                <div className={styles.spinner} />
                <p>Tracing paths…</p>
              </div>
            )}

            {!processing && hasResult && activeTab === 'preview' && (
              <div
                className={`${styles.svgPreview} ${bgStyle === 'checker' ? styles.checkerBg : ''}`}
                style={{ background: bgMap[bgStyle] }}
                dangerouslySetInnerHTML={{ __html: displaySvg }}
              />
            )}

            {!processing && hasResult && activeTab === 'compare' && (
              <div
                ref={compareRef}
                className={`${styles.compareWrap} ${bgStyle === 'checker' ? styles.checkerBg : ''}`}
                style={{ background: bgMap[bgStyle] }}
                onPointerMove={onSplitMove}
                onPointerUp={onSplitUp}
              >
                <img src={file.dataUrl} alt="Original" className={styles.compareBase} />
                <img src={svgUrl} alt="SVG result" className={styles.compareBase}
                  style={{ clipPath: `inset(0 ${100 - splitPct}% 0 0)` }} />
                <span className={styles.splitLabelLeft}>SVG</span>
                <span className={styles.splitLabelRight}>Original</span>
                <div className={styles.splitHandle} style={{ left: `${splitPct}%` }}
                  onPointerDown={onSplitDown} onPointerUp={onSplitUp}>
                  <div className={styles.splitLine} />
                  <div className={styles.splitKnob}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5 8H2M2 8L4 6M2 8l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 8h3M14 8l-2-2M14 8l-2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {!processing && !hasResult && activeTab === 'compare' && file && (
              <div className={styles.emptyState}>
                <div className={styles.spinner} />
                <p>Waiting for trace result…</p>
              </div>
            )}

            {!processing && hasResult && activeTab === 'code' && (
              <div className={styles.codeWrap}>
                <pre className={styles.codeBlock}>{displaySvg}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
