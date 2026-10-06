'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

/* ── CRC32 ───────────────────────────────────────────────────────────────── */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ data[i]) & 0xFF];
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

/* ── ZIP builder (store / no compression) ───────────────────────────────── */
function buildZip(files) {
  const enc = new TextEncoder();
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const { name, data } of files) {
    const nb  = enc.encode(name);
    const crc = crc32(data);
    const sz  = data.length;

    const local = new Uint8Array(30 + nb.length + sz);
    const dv = new DataView(local.buffer);
    dv.setUint32(0,  0x04034b50, true); // local file sig
    dv.setUint16(4,  20, true);         // version needed
    dv.setUint16(6,  0,  true);         // flags
    dv.setUint16(8,  0,  true);         // compression: store
    dv.setUint16(10, 0,  true);         // mod time
    dv.setUint16(12, 0,  true);         // mod date
    dv.setUint32(14, crc, true);
    dv.setUint32(18, sz,  true);        // compressed size
    dv.setUint32(22, sz,  true);        // uncompressed size
    dv.setUint16(26, nb.length, true);  // filename length
    dv.setUint16(28, 0,  true);         // extra field length
    local.set(nb, 30);
    local.set(data, 30 + nb.length);

    const central = new Uint8Array(46 + nb.length);
    const cdv = new DataView(central.buffer);
    cdv.setUint32(0,  0x02014b50, true); // central dir sig
    cdv.setUint16(4,  20, true);
    cdv.setUint16(6,  20, true);
    cdv.setUint16(8,  0,  true);
    cdv.setUint16(10, 0,  true);
    cdv.setUint16(12, 0,  true);
    cdv.setUint16(14, 0,  true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, sz,  true);
    cdv.setUint32(24, sz,  true);
    cdv.setUint16(28, nb.length, true);
    cdv.setUint16(30, 0, true);
    cdv.setUint16(32, 0, true);
    cdv.setUint16(34, 0, true);
    cdv.setUint16(36, 0, true);
    cdv.setUint32(38, 0, true);
    cdv.setUint32(42, offset, true);    // local header offset
    central.set(nb, 46);

    locals.push(local);
    centrals.push(central);
    offset += local.length;
  }

  const cdSz = centrals.reduce((s, c) => s + c.length, 0);
  const eocd = new Uint8Array(22);
  const edv  = new DataView(eocd.buffer);
  edv.setUint32(0,  0x06054b50, true); // end of central dir sig
  edv.setUint16(4,  0, true);
  edv.setUint16(6,  0, true);
  edv.setUint16(8,  files.length, true);
  edv.setUint16(10, files.length, true);
  edv.setUint32(12, cdSz,   true);
  edv.setUint32(16, offset, true);
  edv.setUint16(20, 0, true);

  const total = locals.reduce((s, b) => s + b.length, 0) + cdSz + 22;
  const out = new Uint8Array(total);
  let pos = 0;
  for (const b of [...locals, ...centrals, [eocd]].flat()) { out.set(b, pos); pos += b.length; }
  return out;
}

/* ── ICO builder (embeds PNG data streams) ──────────────────────────────── */
async function buildIco(sizeBlobs) {
  // sizeBlobs: [{size, blob}] — provide 16, 32, 48
  const datas = await Promise.all(sizeBlobs.map(({ blob }) => blob.arrayBuffer().then(ab => new Uint8Array(ab))));
  const count   = sizeBlobs.length;
  const hdrSize = 6 + count * 16;
  let   dataOff = hdrSize;

  const totalSize = hdrSize + datas.reduce((s, d) => s + d.length, 0);
  const buf = new Uint8Array(totalSize);
  const dv  = new DataView(buf.buffer);

  dv.setUint16(0, 0, true); // reserved
  dv.setUint16(2, 1, true); // ICO type
  dv.setUint16(4, count, true);

  for (let i = 0; i < count; i++) {
    const sz  = sizeBlobs[i].size;
    const len = datas[i].length;
    buf[6 + i * 16 + 0] = sz;   // width  (0 = 256)
    buf[6 + i * 16 + 1] = sz;   // height
    buf[6 + i * 16 + 2] = 0;    // color count
    buf[6 + i * 16 + 3] = 0;    // reserved
    dv.setUint16(6 + i * 16 + 4, 1,  true); // color planes
    dv.setUint16(6 + i * 16 + 6, 32, true); // bits per pixel
    dv.setUint32(6 + i * 16 + 8,  len,     true); // data size
    dv.setUint32(6 + i * 16 + 12, dataOff, true); // data offset
    dataOff += len;
  }

  let pos = hdrSize;
  for (const d of datas) { buf.set(d, pos); pos += d.length; }
  return buf;
}

/* ── Canvas helpers ─────────────────────────────────────────────────────── */
function loadImg(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload  = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

function clipShape(ctx, size, shape) {
  if (shape === 'square') return;
  ctx.beginPath();
  if (shape === 'circle') {
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  } else {
    // rounded — manual roundRect for broad browser compat
    const r = size * 0.2;
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.arcTo(size, 0, size, r, r);
    ctx.lineTo(size, size - r);
    ctx.arcTo(size, size, size - r, size, r);
    ctx.lineTo(r, size);
    ctx.arcTo(0, size, 0, size - r, r);
    ctx.lineTo(0, r);
    ctx.arcTo(0, 0, r, 0, r);
    ctx.closePath();
  }
  ctx.clip();
}

async function renderSize(imgEl, size, { bgColor, transparent, padding, shape, fitMode }) {
  const canvas = document.createElement('canvas');
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!transparent) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
  }

  ctx.save();
  clipShape(ctx, size, shape);

  const pad     = Math.round(size * padding / 100);
  const drawSz  = size - pad * 2;
  const iw      = imgEl.naturalWidth  || 300;
  const ih      = imgEl.naturalHeight || 300;

  ctx.imageSmoothingEnabled  = true;
  ctx.imageSmoothingQuality  = 'high';

  if (fitMode === 'crop') {
    const scale = Math.max(drawSz / iw, drawSz / ih);
    const sw = drawSz / scale, sh = drawSz / scale;
    const sx = (iw - sw) / 2,  sy = (ih - sh) / 2;
    ctx.drawImage(imgEl, sx, sy, sw, sh, pad, pad, drawSz, drawSz);
  } else {
    const scale = Math.min(drawSz / iw, drawSz / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = pad + (drawSz - dw) / 2;
    const dy = pad + (drawSz - dh) / 2;
    ctx.drawImage(imgEl, 0, 0, iw, ih, dx, dy, dw, dh);
  }

  ctx.restore();
  return new Promise(res => canvas.toBlob(res, 'image/png'));
}

/* ── Utilities ──────────────────────────────────────────────────────────── */
function fmtBytes(n) {
  if (!n) return '';
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

function downloadBlob(data, filename, mime = 'application/octet-stream') {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ── Constants ──────────────────────────────────────────────────────────── */
const SIZES = [
  { size: 16,  name: 'favicon-16x16.png',          label: '16×16',   badge: 'favicon'  },
  { size: 32,  name: 'favicon-32x32.png',          label: '32×32',   badge: 'favicon'  },
  { size: 48,  name: 'favicon-48x48.png',          label: '48×48',   badge: 'favicon'  },
  { size: 64,  name: 'favicon-64x64.png',          label: '64×64',   badge: ''         },
  { size: 96,  name: 'favicon-96x96.png',          label: '96×96',   badge: ''         },
  { size: 180, name: 'apple-touch-icon.png',        label: '180×180', badge: 'apple'    },
  { size: 192, name: 'android-chrome-192x192.png',  label: '192×192', badge: 'android'  },
  { size: 512, name: 'android-chrome-512x512.png',  label: '512×512', badge: 'android'  },
];

const HTML_SNIPPET = `<!-- Place in <head> -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16">
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

const MANIFEST_SNIPPET = `{
  "name": "My App",
  "short_name": "App",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`;

/* ── Component ──────────────────────────────────────────────────────────── */
export default function FaviconGeneratorTool() {
  const [srcUrl,      setSrcUrl]      = useState(null);
  const [imgEl,       setImgEl]       = useState(null);
  const [bgColor,     setBgColor]     = useState('#ffffff');
  const [transparent, setTransparent] = useState(false);
  const [padding,     setPadding]     = useState(0);
  const [shape,       setShape]       = useState('square');
  const [fitMode,     setFitMode]     = useState('fit');
  const [generated,   setGenerated]   = useState([]);
  const [icoData,     setIcoData]     = useState(null);
  const [generating,  setGenerating]  = useState(false);
  const [tab,         setTab]         = useState('sizes');
  const [copied,      setCopied]      = useState('');
  const [dragging,    setDragging]    = useState(false);
  const [error,       setError]       = useState('');

  const fileInputRef = useRef(null);
  const genTimerRef  = useRef(null);
  const prevUrlsRef  = useRef([]);

  const loadFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPEG, WebP, SVG, GIF).');
      return;
    }
    setError('');
    const url = URL.createObjectURL(file);
    try {
      const img = await loadImg(url);
      if (srcUrl) URL.revokeObjectURL(srcUrl);
      setSrcUrl(url);
      setImgEl(img);
    } catch {
      URL.revokeObjectURL(url);
      setError('Could not load image. Try a different file.');
    }
  }, [srcUrl]);

  // Auto-regenerate when image or options change
  useEffect(() => {
    if (!imgEl) return;
    if (genTimerRef.current) clearTimeout(genTimerRef.current);
    genTimerRef.current = setTimeout(() => doGenerate(imgEl), 120);
  }, [imgEl, bgColor, transparent, padding, shape, fitMode]); // eslint-disable-line

  async function doGenerate(img) {
    setGenerating(true);
    try {
      const opts = { bgColor, transparent, padding, shape, fitMode };
      const results = await Promise.all(
        SIZES.map(async (def) => {
          const blob = await renderSize(img, def.size, opts);
          const url  = URL.createObjectURL(blob);
          return { ...def, blob, url, bytes: blob.size };
        })
      );

      // Build ICO from 16, 32, 48
      const icoBuf = await buildIco([
        { size: 16, blob: results[0].blob },
        { size: 32, blob: results[1].blob },
        { size: 48, blob: results[2].blob },
      ]);

      // Revoke previous preview URLs
      prevUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
      prevUrlsRef.current = results.map(r => r.url);

      setGenerated(results);
      setIcoData(icoBuf);
    } catch (e) {
      setError('Generation failed: ' + e.message);
    } finally {
      setGenerating(false);
    }
  }

  async function downloadAll() {
    if (!generated.length) return;
    const files = [];
    for (const g of generated) {
      files.push({ name: g.name, data: new Uint8Array(await g.blob.arrayBuffer()) });
    }
    if (icoData) {
      files.push({ name: 'favicon.ico', data: icoData });
    }
    files.push({ name: 'site.webmanifest', data: new TextEncoder().encode(MANIFEST_SNIPPET) });
    const zip = buildZip(files);
    downloadBlob(zip, 'favicon-package.zip', 'application/zip');
  }

  function handleCopy(text, key) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 1600);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  }

  // Visual display size for preview thumbnails (capped at 80px, min 32px)
  function displaySize(sz) {
    return Math.min(80, Math.max(32, sz));
  }

  const BADGE_LABELS = { favicon: 'Favicon', apple: 'Apple', android: 'Android' };

  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="favicon-generator" />
      <PlaygroundTopAd />

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><span className={styles.accent}>★</span></div>
          <span>Favicon<span className={styles.accent}>Generator</span></span>
        </div>
        <div className={styles.controls}>
          {generating && <span className={styles.genLabel}>Generating…</span>}
          <button
            className={`${styles.dlBtn} ${!generated.length ? styles.dlBtnDis : ''}`}
            onClick={downloadAll}
            disabled={!generated.length || generating}
          >
            ↓ Download ZIP ({generated.length ? `${generated.length + 1} files` : '—'})
          </button>
        </div>
      </div>

      {/* ── Error bar ── */}
      {error && (
        <div className={styles.errorBar}>
          <span>⚠</span> {error}
          <button className={styles.errClose} onClick={() => setError('')}>✕</button>
        </div>
      )}

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Left panel */}
        <div className={styles.leftPanel}>

          {/* Drop zone */}
          <div
            className={`${styles.dropZone} ${dragging ? styles.dropZoneDrag : ''}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {srcUrl ? (
              <div className={styles.srcPreview}>
                <img src={srcUrl} alt="source" className={styles.srcImg} />
                <div className={styles.srcHint}>Click or drop to replace</div>
              </div>
            ) : (
              <div className={styles.dropPlaceholder}>
                <div className={styles.dropIcon}>⬆</div>
                <div className={styles.dropText}>Drop image here</div>
                <div className={styles.dropSub}>PNG · JPEG · WebP · SVG · GIF</div>
                <div className={styles.dropBtn}>Browse file</div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => e.target.files[0] && loadFile(e.target.files[0])}
            />
          </div>

          {/* Options */}
          <div className={styles.options}>

            {/* Shape */}
            <div className={styles.optSection}>
              <div className={styles.optLabel}>Shape</div>
              <div className={styles.shapeRow}>
                {[
                  { id: 'square',  glyph: '■', label: 'Square'  },
                  { id: 'rounded', glyph: '▣', label: 'Rounded' },
                  { id: 'circle',  glyph: '●', label: 'Circle'  },
                ].map(s => (
                  <button
                    key={s.id}
                    className={`${styles.shapeBtn} ${shape === s.id ? styles.shapeBtnActive : ''}`}
                    onClick={() => setShape(s.id)}
                  >
                    <span className={styles.shapeGlyph}>{s.glyph}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div className={styles.optSection}>
              <div className={styles.optLabel}>Background</div>
              <div className={styles.bgRow}>
                <label className={styles.optCheck}>
                  <input type="checkbox" checked={transparent} onChange={e => setTransparent(e.target.checked)} />
                  Transparent
                </label>
                {!transparent && (
                  <div className={styles.colorRow}>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className={styles.colorInput}
                    />
                    <span className={styles.colorHex}>{bgColor}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Padding */}
            <div className={styles.optSection}>
              <div className={styles.optLabel}>
                Padding <span className={styles.optVal}>{padding}%</span>
              </div>
              <input
                type="range" min="0" max="25" step="1" value={padding}
                onChange={e => setPadding(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

            {/* Fit mode */}
            <div className={styles.optSection}>
              <div className={styles.optLabel}>Fit Mode</div>
              <div className={styles.segmented}>
                <button
                  className={`${styles.seg} ${fitMode === 'fit' ? styles.segActive : ''}`}
                  onClick={() => setFitMode('fit')}
                  title="Letterbox — show full image, add background if needed"
                >Fit</button>
                <button
                  className={`${styles.seg} ${fitMode === 'crop' ? styles.segActive : ''}`}
                  onClick={() => setFitMode('crop')}
                  title="Center-crop — fill square without letterboxing"
                >Crop</button>
              </div>
            </div>

          </div>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'sizes' ? styles.tabActive : ''}`}
              onClick={() => setTab('sizes')}
            >
              Sizes
              {generated.length > 0 && (
                <span className={styles.tabBadge}>{generated.length + 1}</span>
              )}
            </button>
            <button
              className={`${styles.tab} ${tab === 'html' ? styles.tabActive : ''}`}
              onClick={() => setTab('html')}
            >HTML</button>
            <button
              className={`${styles.tab} ${tab === 'manifest' ? styles.tabActive : ''}`}
              onClick={() => setTab('manifest')}
            >Manifest</button>
          </div>

          {/* Tab: Sizes */}
          {tab === 'sizes' && (
            <div className={styles.tabContent}>
              {!generated.length ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>★</div>
                  <div className={styles.emptyText}>Upload an image to generate all favicon sizes</div>
                  <div className={styles.emptySub}>8 PNG sizes + favicon.ico + site.webmanifest</div>
                </div>
              ) : (
                <div className={styles.sizeList}>

                  {/* ICO card */}
                  {icoData && (
                    <div className={styles.sizeCard}>
                      <div className={styles.sizeThumb}>
                        <img
                          src={generated[1]?.url}
                          alt="ico"
                          style={{ width: 32, height: 32, imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className={styles.sizeInfo}>
                        <div className={styles.sizeName}>favicon.ico</div>
                        <div className={styles.sizeMeta}>16 · 32 · 48 px · {fmtBytes(icoData.length)}</div>
                      </div>
                      <div className={`${styles.sizeBadge} ${styles.badgeFavicon}`}>favicon</div>
                      <button
                        className={styles.dlIconBtn}
                        onClick={() => downloadBlob(icoData, 'favicon.ico', 'image/x-icon')}
                        title="Download favicon.ico"
                      >↓</button>
                    </div>
                  )}

                  {/* PNG cards */}
                  {generated.map(g => (
                    <div key={g.name} className={styles.sizeCard}>
                      <div className={styles.sizeThumb}>
                        <img
                          src={g.url}
                          alt={g.label}
                          style={{
                            width:           displaySize(g.size),
                            height:          displaySize(g.size),
                            imageRendering:  g.size <= 48 ? 'pixelated' : 'auto',
                          }}
                        />
                      </div>
                      <div className={styles.sizeInfo}>
                        <div className={styles.sizeName}>{g.name}</div>
                        <div className={styles.sizeMeta}>{g.label} · {fmtBytes(g.bytes)}</div>
                      </div>
                      {g.badge && (
                        <div className={`${styles.sizeBadge} ${styles['badge_' + g.badge]}`}>
                          {BADGE_LABELS[g.badge] || g.badge}
                        </div>
                      )}
                      <button
                        className={styles.dlIconBtn}
                        onClick={() => downloadBlob(g.blob, g.name, 'image/png')}
                        title={`Download ${g.name}`}
                      >↓</button>
                    </div>
                  ))}

                </div>
              )}
            </div>
          )}

          {/* Tab: HTML */}
          {tab === 'html' && (
            <div className={styles.tabContent}>
              <div className={styles.snippetWrap}>
                <div className={styles.snippetHeader}>
                  <span className={styles.snippetTitle}>Place in your HTML <code>&lt;head&gt;</code></span>
                  <button
                    className={`${styles.copyBtn} ${copied === 'html' ? styles.copyBtnOk : ''}`}
                    onClick={() => handleCopy(HTML_SNIPPET, 'html')}
                  >
                    {copied === 'html' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className={styles.snippet}>{HTML_SNIPPET}</pre>
              </div>
            </div>
          )}

          {/* Tab: Manifest */}
          {tab === 'manifest' && (
            <div className={styles.tabContent}>
              <div className={styles.snippetWrap}>
                <div className={styles.snippetHeader}>
                  <span className={styles.snippetTitle}>Save as <code>site.webmanifest</code></span>
                  <button
                    className={`${styles.copyBtn} ${copied === 'manifest' ? styles.copyBtnOk : ''}`}
                    onClick={() => handleCopy(MANIFEST_SNIPPET, 'manifest')}
                  >
                    {copied === 'manifest' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className={styles.snippet}>{MANIFEST_SNIPPET}</pre>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
