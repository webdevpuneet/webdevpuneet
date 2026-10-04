'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ─── Helpers ──────────────────────────────────────────────────────────── */
function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

const OUTPUT_FORMATS = [
  { id: 'dataUri',    label: 'Data URI',            desc: 'src / url()',       accent: '#10b981' },
  { id: 'htmlImg',    label: 'HTML <img>',           desc: 'Ready to paste',   accent: '#f97316' },
  { id: 'cssBg',      label: 'CSS background',       desc: 'background-image', accent: '#60a5fa' },
  { id: 'cssContent', label: 'CSS content',          desc: 'content: url()',   accent: '#a78bfa' },
  { id: 'rawBase64',  label: 'Raw Base64',           desc: 'String only',      accent: '#f59e0b' },
  { id: 'svgUrl',     label: 'SVG URL-encoded',      desc: 'SVG only',         accent: '#f472b6' },
];

const CONVERT_FORMATS = [
  { id: 'original', label: 'Original' },
  { id: 'jpeg',     label: 'JPEG' },
  { id: 'png',      label: 'PNG' },
  { id: 'webp',     label: 'WebP' },
];

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M2 8l4 4 8-8" stroke="#4ade9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Canvas-based format conversion ───────────────────────────────────── */
async function convertImage(originalDataUri, originalMime, targetFmt, quality) {
  if (targetFmt === 'original') return { dataUri: originalDataUri, mime: originalMime };
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (targetFmt === 'jpeg') {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const mime = targetFmt === 'jpeg' ? 'image/jpeg' : targetFmt === 'png' ? 'image/png' : 'image/webp';
      const dataUri = canvas.toDataURL(mime, quality / 100);
      resolve({ dataUri, mime });
    };
    img.onerror = () => resolve({ dataUri: originalDataUri, mime: originalMime });
    img.src = originalDataUri;
  });
}

/* ─── Get image dimensions ─────────────────────────────────────────────── */
function getImgDimensions(dataUri) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 0, h: 0 });
    img.src = dataUri;
  });
}

/* ─── Component ────────────────────────────────────────────────────────── */
export default function ImageToBase64Tool() {
  const [original,    setOriginal]    = useState(null); // { dataUri, mime, name, size }
  const [converted,   setConverted]   = useState(null); // { dataUri, mime, base64, size }
  const [dims,        setDims]        = useState(null); // { w, h }
  const [targetFmt,   setTargetFmt]   = useState('original');
  const [quality,     setQuality]     = useState(85);
  const [dragging,    setDragging]    = useState(false);
  const [copied,      setCopied]      = useState(null);
  const [converting,  setConverting]  = useState(false);

  const fileRef    = useRef(null);
  const convertRef = useRef(0);

  /* ── Load image from file ──────────────────────────────────────────── */
  const loadFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target.result;
      const dims    = await getImgDimensions(dataUri);
      setOriginal({ dataUri, mime: file.type, name: file.name, size: file.size });
      setDims(dims);
      setTargetFmt('original');
    };
    reader.readAsDataURL(file);
  }, []);

  /* ── Clipboard paste ───────────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (!e.clipboardData) return;
      for (const item of e.clipboardData.items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) loadFile(file);
          break;
        }
      }
    };
    window.addEventListener('paste', handler);
    return () => window.removeEventListener('paste', handler);
  }, [loadFile]);

  /* ── Convert on param change ───────────────────────────────────────── */
  useEffect(() => {
    if (!original) { setConverted(null); return; }
    const id = ++convertRef.current;
    setConverting(true);
    convertImage(original.dataUri, original.mime, targetFmt, quality).then(({ dataUri, mime }) => {
      if (convertRef.current !== id) return;
      const base64  = dataUri.split(',')[1] ?? '';
      const b64size = Math.ceil(base64.length * 0.75);
      setConverted({ dataUri, mime, base64, size: b64size });
      setConverting(false);
    });
  }, [original, targetFmt, quality]);

  /* ── Output rows ───────────────────────────────────────────────────── */
  const outputs = converted ? {
    dataUri:    converted.dataUri,
    htmlImg:    `<img src="${converted.dataUri}" alt="" />`,
    cssBg:      `background-image: url("${converted.dataUri}");`,
    cssContent: `content: url("${converted.dataUri}");`,
    rawBase64:  converted.base64,
    svgUrl:     converted.mime === 'image/svg+xml'
                  ? (() => { try { return `url("data:image/svg+xml,${encodeURIComponent(atob(converted.base64))}")`; } catch { return ''; } })()
                  : '',
  } : {};

  /* ── Copy ──────────────────────────────────────────────────────────── */
  function copyOutput(id) {
    const val = outputs[id];
    if (!val) return;
    navigator.clipboard.writeText(val).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  }

  /* ── Drag & Drop ───────────────────────────────────────────────────── */
  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }

  function onDragOver(e) { e.preventDefault(); setDragging(true); }
  function onDragLeave()  { setDragging(false); }

  /* ── Stats ─────────────────────────────────────────────────────────── */
  const origSize  = original?.size ?? 0;
  const b64Size   = converted?.size ?? 0;
  const overhead  = origSize > 0 ? Math.round(((b64Size - origSize) / origSize) * 100) : 0;
  const isSvg     = converted?.mime === 'image/svg+xml';
  const qualityFmts = ['jpeg', 'webp'];
  const showQuality = qualityFmts.includes(targetFmt);

  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="image-to-base64" />
      <PlaygroundTopAd />

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="#10b981" strokeWidth="1.5"/>
              <circle cx="8.5" cy="10.5" r="2" stroke="#10b981" strokeWidth="1.3"/>
              <path d="M2 17l5-5 4 4 3-3 8 7" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Image <span style={{ color: '#10b981' }}>to Base64</span></span>
        </div>

        <div className={styles.headerRight}>
          {original && (
            <button className={styles.clearBtn} onClick={() => { setOriginal(null); setConverted(null); setDims(null); setTargetFmt('original'); }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Left panel ──────────────────────────────────────────────── */}
        <div className={styles.leftPane}>

          {/* Drop zone */}
          {!original ? (
            <div
              className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ''}`}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => fileRef.current?.click()}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className={styles.dropIcon}>
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="8.5" cy="10.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M2 17l5-5 4 4 3-3 8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M12 1v6M9 4l3-3 3 3" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.dropTitle}>Drop image here</div>
              <div className={styles.dropSub}>or click to upload · Ctrl+V to paste</div>
              <div className={styles.dropFormats}>PNG · JPEG · WebP · GIF · SVG · BMP · ICO</div>
              <input ref={fileRef} type="file" accept="image/*" className={styles.fileInput}
                onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = ''; }} />
            </div>
          ) : (
            <>
              {/* Preview */}
              <div className={styles.previewWrap}
                onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
                <div className={styles.previewInner} onClick={() => fileRef.current?.click()}>
                  <img src={original.dataUri} alt="Preview" className={styles.previewImg} />
                  <div className={styles.previewOverlay}>
                    <span>Click to replace</span>
                  </div>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className={styles.fileInput}
                  onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = ''; }} />
              </div>

              {/* Metadata */}
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>File</span>
                  <span className={styles.metaVal} title={original.name}>{original.name}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>Dimensions</span>
                  <span className={styles.metaVal}>{dims ? `${dims.w} × ${dims.h} px` : '…'}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>Type</span>
                  <span className={styles.metaVal}>{converted?.mime ?? original.mime}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>Original</span>
                  <span className={styles.metaVal}>{fmtBytes(origSize)}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>Base64 size</span>
                  <span className={styles.metaVal}>{fmtBytes(b64Size)}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaKey}>Overhead</span>
                  <span className={`${styles.metaVal} ${styles.metaOrange}`}>+{overhead}%</span>
                </div>
              </div>

              {/* Format conversion */}
              <div className={styles.controlSection}>
                <div className={styles.controlLabel}>Convert to</div>
                <div className={styles.fmtTabs}>
                  {CONVERT_FORMATS.map(f => (
                    <button
                      key={f.id}
                      className={`${styles.fmtTab} ${targetFmt === f.id ? styles.fmtTabActive : ''}`}
                      onClick={() => setTargetFmt(f.id)}
                    >{f.label}</button>
                  ))}
                </div>
              </div>

              {/* Quality slider */}
              {showQuality && (
                <div className={styles.controlSection}>
                  <div className={styles.controlLabel}>Quality — <span className={styles.qualityVal}>{quality}%</span></div>
                  <input
                    type="range" min="10" max="100" step="5"
                    value={quality}
                    onChange={e => setQuality(+e.target.value)}
                    className={styles.qualitySlider}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Right panel: outputs ──────────────────────────────────────── */}
        <div className={styles.rightPane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>Output Formats</span>
            {converting && <span className={styles.converting}>Converting…</span>}
            {!converting && converted && <span className={styles.paneHint}>click row to copy</span>}
          </div>

          <div className={styles.outputList}>
            {OUTPUT_FORMATS.map(fmt => {
              const val     = outputs[fmt.id] ?? '';
              const isEmpty = !val;
              const isSvgRow = fmt.id === 'svgUrl';
              if (isSvgRow && converted && !isSvg) return null;

              return (
                <div
                  key={fmt.id}
                  className={`${styles.outRow} ${copied === fmt.id ? styles.outRowCopied : ''} ${isEmpty ? styles.outRowEmpty : ''}`}
                  onClick={() => !isEmpty && copyOutput(fmt.id)}
                  role={isEmpty ? undefined : 'button'}
                  tabIndex={isEmpty ? undefined : 0}
                  onKeyDown={e => e.key === 'Enter' && !isEmpty && copyOutput(fmt.id)}
                >
                  <div className={styles.outAccent} style={{ background: fmt.accent }} />
                  <div className={styles.outInfo}>
                    <span className={styles.outLabel} style={{ color: fmt.accent }}>{fmt.label}</span>
                    <span className={styles.outDesc}>{fmt.desc}</span>
                  </div>
                  <div className={styles.outValue}>
                    {isEmpty
                      ? <span className={styles.outEmpty}>
                          {!converted ? 'Upload an image first' : isSvgRow ? 'SVG images only' : ''}
                        </span>
                      : <span className={styles.outText}>{val}</span>
                    }
                  </div>
                  {!isEmpty && (
                    <span className={`${styles.copyBtn} ${copied === fmt.id ? styles.copyBtnOk : ''}`}>
                      {copied === fmt.id ? <CheckIcon /> : <CopyIcon />}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {!original && (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.2">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="8.5" cy="10.5" r="2" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M2 17l5-5 4 4 3-3 8 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              <span>Output appears here after uploading an image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
