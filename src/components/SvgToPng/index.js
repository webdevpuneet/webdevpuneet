'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function fmtBytes(n) {
  if (!n) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

function getSvgDimensions(svgText) {
  const parser = new DOMParser();
  const doc    = parser.parseFromString(svgText, 'image/svg+xml');
  const svg    = doc.querySelector('svg');
  if (!svg) return null;

  const vb = svg.getAttribute('viewBox');
  let w = parseFloat(svg.getAttribute('width'))  || 0;
  let h = parseFloat(svg.getAttribute('height')) || 0;

  if (vb) {
    const parts = vb.trim().split(/[\s,]+/);
    if (parts.length === 4) {
      if (!w) w = parseFloat(parts[2]);
      if (!h) h = parseFloat(parts[3]);
    }
  }
  if (!w || !h) { w = 512; h = 512; }
  return { w: Math.round(w), h: Math.round(h) };
}

function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload  = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

async function svgToPngBlob(svgText, { outW, outH, bg }) {
  const blob   = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url    = URL.createObjectURL(blob);
  try {
    const img    = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width  = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (bg && bg !== 'transparent') {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, outW, outH);
    }
    ctx.drawImage(img, 0, 0, outW, outH);
    return await new Promise(res => canvas.toBlob(res, 'image/png'));
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* ── Sample SVG ──────────────────────────────────────────────────────────────── */
const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="url(#g)"/>
  <circle cx="50" cy="38" r="16" fill="#fff" opacity="0.9"/>
  <rect x="26" y="60" width="48" height="6" rx="3" fill="#fff" opacity="0.8"/>
  <rect x="32" y="72" width="36" height="6" rx="3" fill="#fff" opacity="0.6"/>
</svg>`;

const SCALES = [1, 2, 3, 4];
const BG_PRESETS = [
  { label: 'Transparent', value: 'transparent' },
  { label: 'White',       value: '#ffffff' },
  { label: 'Black',       value: '#000000' },
  { label: 'Custom',      value: 'custom' },
];

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function SvgToPng() {
  const [tab, setTab]           = useState('upload'); // 'upload' | 'paste'
  const [svgText, setSvgText]   = useState('');
  const [fileName, setFileName] = useState('');
  const [svgSize, setSvgSize]   = useState(null);   // { w, h } native
  const [error, setError]       = useState('');

  const [scale, setScale]       = useState(2);
  const [outW, setOutW]         = useState(512);
  const [outH, setOutH]         = useState(512);
  const [lockAr, setLockAr]     = useState(true);
  const [bg, setBg]             = useState('transparent');
  const [customBg, setCustomBg] = useState('#ffffff');

  const [pngBlob, setPngBlob]   = useState(null);
  const [pngUrl, setPngUrl]     = useState('');
  const [converting, setConverting] = useState(false);
  const [copied, setCopied]     = useState(false);

  const fileRef   = useRef(null);
  const prevBlobUrl = useRef('');

  /* ── Load SVG → detect dimensions ──────────────────────────────────────── */
  const loadSvg = useCallback((text, name = '') => {
    setError('');
    setPngBlob(null);
    setPngUrl('');
    setFileName(name);
    setSvgText(text);

    const dims = getSvgDimensions(text);
    if (!dims) { setError('Could not parse SVG dimensions.'); return; }
    setSvgSize(dims);
    const w = dims.w * scale;
    const h = dims.h * scale;
    setOutW(w);
    setOutH(h);
  }, [scale]);

  /* ── File upload ─────────────────────────────────────────────────────────── */
  const onFile = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
      setError('Please select an SVG file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => loadSvg(ev.target.result, file.name.replace('.svg', ''));
    reader.readAsText(file);
    e.target.value = '';
  }, [loadSvg]);

  /* ── Drop zone ───────────────────────────────────────────────────────────── */
  const onDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFile({ target: { files: [file], value: '' } });
  }, [onFile]);

  /* ── Paste SVG code ──────────────────────────────────────────────────────── */
  const onPasteCode = useCallback((text) => {
    if (text.trim().startsWith('<')) loadSvg(text, 'pasted');
  }, [loadSvg]);

  /* ── Scale change ────────────────────────────────────────────────────────── */
  const applyScale = useCallback((newScale) => {
    setScale(newScale);
    if (svgSize) {
      setOutW(svgSize.w * newScale);
      setOutH(svgSize.h * newScale);
    }
  }, [svgSize]);

  /* ── Width/height change with AR lock ────────────────────────────────────── */
  const onWidthChange = useCallback((v) => {
    const w = Math.max(1, Number(v));
    setOutW(w);
    if (lockAr && svgSize) setOutH(Math.round(w / (svgSize.w / svgSize.h)));
  }, [lockAr, svgSize]);

  const onHeightChange = useCallback((v) => {
    const h = Math.max(1, Number(v));
    setOutH(h);
    if (lockAr && svgSize) setOutW(Math.round(h * (svgSize.w / svgSize.h)));
  }, [lockAr, svgSize]);

  /* ── Convert ─────────────────────────────────────────────────────────────── */
  const convert = useCallback(async () => {
    if (!svgText) return;
    setConverting(true);
    setError('');
    try {
      const effectiveBg = bg === 'custom' ? customBg : bg;
      const blob = await svgToPngBlob(svgText, { outW, outH, bg: effectiveBg });
      if (prevBlobUrl.current) URL.revokeObjectURL(prevBlobUrl.current);
      const url = URL.createObjectURL(blob);
      prevBlobUrl.current = url;
      setPngBlob(blob);
      setPngUrl(url);
    } catch (err) {
      setError('Conversion failed. Make sure the SVG is valid.');
    } finally {
      setConverting(false);
    }
  }, [svgText, outW, outH, bg, customBg]);

  /* ── Auto-convert when SVG loaded ────────────────────────────────────────── */
  useEffect(() => {
    if (svgText) convert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgText]);

  /* ── Download ─────────────────────────────────────────────────────────────── */
  const download = useCallback(() => {
    if (!pngBlob) return;
    const a = document.createElement('a');
    a.href     = pngUrl;
    a.download = `${fileName || 'image'}.png`;
    a.click();
  }, [pngBlob, pngUrl, fileName]);

  /* ── Copy to clipboard ───────────────────────────────────────────────────── */
  const copyImage = useCallback(async () => {
    if (!pngBlob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { download(); }
  }, [pngBlob, download]);

  const hasSvg = !!svgText;

  return (
    <div className={s.wrap}>
      <ImageToolsTopNav active="svg-to-png" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>SVG</span>
          SVG to PNG Converter
        </div>
        <div className={s.headerActions}>
          <button className={s.actionBtn} onClick={() => loadSvg(SAMPLE_SVG, 'sample')}>Sample</button>
          <button className={s.actionBtn} onClick={() => { setSvgText(''); setPngBlob(null); setPngUrl(''); setSvgSize(null); setFileName(''); setError(''); }}>Clear</button>
        </div>
      </div>

      <div className={s.body}>
        {/* ── Left: input + settings ── */}
        <div className={s.left}>

          {/* Input tabs */}
          <div className={s.inputTabs}>
            <button className={`${s.inputTab} ${tab === 'upload' ? s.inputTabActive : ''}`} onClick={() => setTab('upload')}>Upload SVG</button>
            <button className={`${s.inputTab} ${tab === 'paste'  ? s.inputTabActive : ''}`} onClick={() => setTab('paste')}>Paste Code</button>
          </div>

          {tab === 'upload' ? (
            <div
              className={`${s.dropZone} ${hasSvg ? s.dropZoneLoaded : ''}`}
              onDragOver={e => e.preventDefault()}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" accept=".svg,image/svg+xml" className={s.fileInput} onChange={onFile} />
              {hasSvg ? (
                <div className={s.loadedInfo}>
                  <span className={s.loadedIcon}>✓</span>
                  <span className={s.loadedName}>{fileName || 'SVG loaded'}</span>
                  {svgSize && <span className={s.loadedDims}>{svgSize.w} × {svgSize.h}</span>}
                </div>
              ) : (
                <div className={s.dropHint}>
                  <span className={s.dropIcon}>↑</span>
                  <span className={s.dropText}>Drop SVG here or click to browse</span>
                  <span className={s.dropSub}>.svg files only</span>
                </div>
              )}
            </div>
          ) : (
            <textarea
              className={s.codeArea}
              value={svgText}
              onChange={e => onPasteCode(e.target.value)}
              placeholder={'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  …\n</svg>'}
              spellCheck={false}
            />
          )}

          {error && <div className={s.error}>{error}</div>}

          {/* Settings */}
          <div className={s.settings}>
            {/* Scale */}
            <div className={s.settingRow}>
              <span className={s.settingLabel}>Scale</span>
              <div className={s.scaleButtons}>
                {SCALES.map(sc => (
                  <button
                    key={sc}
                    className={`${s.scaleBtn} ${scale === sc ? s.scaleBtnActive : ''}`}
                    onClick={() => applyScale(sc)}
                  >{sc}×</button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className={s.settingRow}>
              <span className={s.settingLabel}>Output size</span>
              <div className={s.dimRow}>
                <input type="number" className={s.dimInput} value={outW} min={1} max={8192} onChange={e => onWidthChange(e.target.value)} />
                <span className={s.dimX}>×</span>
                <input type="number" className={s.dimInput} value={outH} min={1} max={8192} onChange={e => onHeightChange(e.target.value)} />
                <button
                  className={`${s.lockBtn} ${lockAr ? s.lockBtnActive : ''}`}
                  onClick={() => setLockAr(v => !v)}
                  title={lockAr ? 'Lock aspect ratio' : 'Unlock aspect ratio'}
                >
                  {lockAr ? '🔒' : '🔓'}
                </button>
              </div>
            </div>

            {/* Background */}
            <div className={s.settingRow}>
              <span className={s.settingLabel}>Background</span>
              <div className={s.bgOptions}>
                {BG_PRESETS.map(p => (
                  <button
                    key={p.value}
                    className={`${s.bgBtn} ${bg === p.value ? s.bgBtnActive : ''}`}
                    onClick={() => setBg(p.value)}
                  >
                    {p.value !== 'transparent' && p.value !== 'custom' && (
                      <span className={s.bgSwatch} style={{ background: p.value, border: p.value === '#ffffff' ? '1px solid var(--border)' : 'none' }} />
                    )}
                    {p.label}
                  </button>
                ))}
              </div>
              {bg === 'custom' && (
                <div className={s.customBgRow}>
                  <input type="color" value={customBg} onChange={e => setCustomBg(e.target.value)} className={s.colorPicker} />
                  <input className={s.hexInput} value={customBg} onChange={e => setCustomBg(e.target.value)} maxLength={7} />
                </div>
              )}
            </div>

            {/* Convert button */}
            <button className={s.convertBtn} onClick={convert} disabled={!hasSvg || converting}>
              {converting ? 'Converting…' : '⟳ Re-convert'}
            </button>
          </div>
        </div>

        {/* ── Right: preview + download ── */}
        <div className={s.right}>
          <div className={s.previewHeader}>
            <span className={s.previewLabel}>PNG Preview</span>
            {pngBlob && (
              <div className={s.previewMeta}>
                {outW} × {outH} px · {fmtBytes(pngBlob.size)}
              </div>
            )}
          </div>

          <div className={s.previewArea}>
            {pngUrl ? (
              <img src={pngUrl} alt="PNG preview" className={s.previewImg} />
            ) : (
              <div className={s.previewEmpty}>
                <span className={s.previewEmptyIcon}>🖼</span>
                <span className={s.previewEmptyText}>PNG preview will appear here</span>
              </div>
            )}
          </div>

          {/* SVG preview */}
          {svgText && (
            <div className={s.svgPreviewWrap}>
              <span className={s.svgPreviewLabel}>SVG source</span>
              <div
                className={s.svgPreview}
                dangerouslySetInnerHTML={{ __html: svgText }}
              />
            </div>
          )}

          {/* Download actions */}
          <div className={s.downloadRow}>
            <button className={s.downloadBtn} onClick={download} disabled={!pngBlob}>
              ↓ Download PNG
            </button>
            <button className={`${s.copyBtn} ${copied ? s.copyBtnDone : ''}`} onClick={copyImage} disabled={!pngBlob}>
              {copied ? '✓ Copied' : 'Copy Image'}
            </button>
          </div>

          {/* Size comparison */}
          {svgText && pngBlob && (
            <div className={s.sizeCompare}>
              <div className={s.sizeItem}>
                <span className={s.sizeLabel}>SVG</span>
                <span className={s.sizeVal}>{fmtBytes(new TextEncoder().encode(svgText).length)}</span>
              </div>
              <span className={s.sizeArrow}>→</span>
              <div className={s.sizeItem}>
                <span className={s.sizeLabel}>PNG</span>
                <span className={s.sizeVal}>{fmtBytes(pngBlob.size)}</span>
              </div>
              <div className={s.sizeItem}>
                <span className={s.sizeLabel}>Output</span>
                <span className={s.sizeVal}>{outW}×{outH}px</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
