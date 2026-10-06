'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

/* ─── Constants ─────────────────────────────────────────────────────────── */
const SIZE_PRESETS = [
  { label: 'Social Square',   w: 1080, h: 1080 },
  { label: 'Instagram Post',  w: 1080, h: 1350 },
  { label: 'Twitter/X Post',  w: 1200, h: 675  },
  { label: 'Facebook Cover',  w: 851,  h: 315  },
  { label: 'LinkedIn Banner', w: 1584, h: 396  },
  { label: 'YouTube Thumb',   w: 1280, h: 720  },
  { label: 'OG Image',        w: 1200, h: 630  },
  { label: 'Full HD',         w: 1920, h: 1080 },
  { label: 'Favicon 32px',    w: 32,   h: 32   },
  { label: 'Favicon 64px',    w: 64,   h: 64   },
];

const CROP_ASPECTS = [
  { label: 'Free',  ratio: null  },
  { label: '1:1',   ratio: 1     },
  { label: '4:3',   ratio: 4/3   },
  { label: '16:9',  ratio: 16/9  },
  { label: '3:2',   ratio: 3/2   },
  { label: '9:16',  ratio: 9/16  },
  { label: '3:4',   ratio: 3/4   },
];

const TABS = [
  { id: 'resize',   icon: '⤡', label: 'Resize'    },
  { id: 'crop',     icon: '⊹', label: 'Crop'      },
  { id: 'rotate',   icon: '↻', label: 'Rotate'    },
  { id: 'compress', icon: '▾', label: 'Compress'  },
  { id: 'text',     icon: 'T', label: 'Text'      },
  { id: 'bg',       icon: '◧', label: 'BG Color'  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function fmtBytes(n) {
  if (!n) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1048576).toFixed(1)} MB`;
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function uid() { return Math.random().toString(36).slice(2, 8); }

/* ─── Crop overlay component ────────────────────────────────────────────── */
function CropOverlay({ crop, setCrop, pctAspect }) {
  const ref  = useRef(null);
  const drag = useRef(null);

  function startDrag(e, handle) {
    e.preventDefault();
    e.stopPropagation();
    const { width, height } = ref.current.getBoundingClientRect();
    drag.current = { handle, sx: e.clientX, sy: e.clientY, crop: { ...crop }, width, height };

    function move(ev) {
      const d = drag.current;
      if (!d) return;
      const dx = ((ev.clientX - d.sx) / d.width)  * 100;
      const dy = ((ev.clientY - d.sy) / d.height) * 100;
      let { x, y, w, h } = d.crop;
      let nx = x, ny = y, nw = w, nh = h;

      if (handle === 'move') {
        nx = clamp(x + dx, 0, 100 - w);
        ny = clamp(y + dy, 0, 100 - h);
      } else {
        if (handle.includes('w')) { nx = clamp(x + dx, 0, x + w - 3); nw = w - (nx - x); }
        if (handle.includes('e')) { nw = clamp(w + dx, 3, 100 - x); }
        if (handle.includes('n')) { ny = clamp(y + dy, 0, y + h - 3); nh = h - (ny - y); }
        if (handle.includes('s')) { nh = clamp(h + dy, 3, 100 - y); }

        if (pctAspect) {
          if (handle === 'nw' || handle === 'ne' || handle === 'sw' || handle === 'se') {
            nh = nw / pctAspect;
            if (ny + nh > 100) { nh = 100 - ny; nw = nh * pctAspect; }
          } else if (handle === 'n' || handle === 's') {
            nw = nh * pctAspect;
          } else {
            nh = nw / pctAspect;
          }
          nw = clamp(nw, 3, 100 - nx);
          nh = clamp(nh, 3, 100 - ny);
        }
      }
      setCrop({ x: nx, y: ny, w: nw, h: nh });
    }

    function up() {
      drag.current = null;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }

  const { x, y, w, h } = crop;
  return (
    <div ref={ref} className={styles.cropOverlay}>
      {/* Dark shades outside crop */}
      <div className={styles.shade} style={{ top: 0, left: 0, right: 0, height: `${y}%` }} />
      <div className={styles.shade} style={{ top: `${y + h}%`, left: 0, right: 0, bottom: 0 }} />
      <div className={styles.shade} style={{ top: `${y}%`, left: 0, width: `${x}%`, height: `${h}%` }} />
      <div className={styles.shade} style={{ top: `${y}%`, left: `${x + w}%`, right: 0, height: `${h}%` }} />

      {/* Crop selection */}
      <div
        className={styles.cropSel}
        style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
        onMouseDown={e => startDrag(e, 'move')}
      >
        {/* Rule-of-thirds grid lines */}
        <span className={styles.grid3H} style={{ top: '33.3%' }} />
        <span className={styles.grid3H} style={{ top: '66.6%' }} />
        <span className={styles.grid3V} style={{ left: '33.3%' }} />
        <span className={styles.grid3V} style={{ left: '66.6%' }} />

        {/* Handles */}
        {['nw','n','ne','e','se','s','sw','w'].map(h => (
          <div key={h} className={`${styles.handle} ${styles['h_' + h]}`}
            onMouseDown={e => startDrag(e, h)} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function ImageEditorTool() {
  /* Source image */
  const [img, setImg]         = useState(null); // { el, name, origSize, type }
  const [dragging, setDragging] = useState(false);
  const fileRef               = useRef(null);

  /* Active tab */
  const [tab, setTab] = useState('resize');

  /* Resize */
  const [rW, setRW]     = useState(0);
  const [rH, setRH]     = useState(0);
  const [lock, setLock] = useState(true);

  /* Crop */
  const [cropOn, setCropOn]     = useState(false);
  const [crop, setCrop]         = useState({ x: 10, y: 10, w: 80, h: 80 });
  const [cropAspect, setCropAspect] = useState(null); // pixel aspect ratio

  /* Transform */
  const [rot, setRot]     = useState(0);   // 0 | 90 | 180 | 270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  /* Compress / format */
  const [quality, setQuality] = useState(85);
  const [fmt, setFmt]         = useState('jpg');

  /* Background */
  const [bgOn,  setBgOn]  = useState(false);
  const [bgCol, setBgCol] = useState('#ffffff');

  /* Text overlays */
  const [texts, setTexts]     = useState([]);
  const [tText, setTText]     = useState('');
  const [tSize, setTSize]     = useState(48);
  const [tColor, setTColor]   = useState('#ffffff');
  const [tOpac, setTOpac]     = useState(100);
  const [tX, setTX]           = useState(50);
  const [tY, setTY]           = useState(50);
  const [tBold, setTBold]     = useState(true);
  const [tStroke, setTStroke] = useState(false);

  /* Preview */
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const [outDims, setOutDims] = useState({ w: 0, h: 0 });
  const [estSize, setEstSize] = useState(null);
  const [busy, setBusy]       = useState(false);

  /* ── Load file ── */
  function loadFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const el = new Image();
      el.onload = () => {
        setImg({ el, name: file.name, origSize: file.size, type: file.type });
        setRW(el.naturalWidth);
        setRH(el.naturalHeight);
        setCrop({ x: 10, y: 10, w: 80, h: 80 });
        setCropAspect(null);
        setCropOn(false);
        setRot(0); setFlipH(false); setFlipV(false);
        setTexts([]);
        if (file.type === 'image/png')       setFmt('png');
        else if (file.type === 'image/webp') setFmt('webp');
        else                                  setFmt('jpg');
      };
      el.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /* ── Build canvas (pure function) ── */
  const buildCanvas = useCallback((forCropPreview = false) => {
    if (!img) return null;
    const el    = img.el;
    const origW = el.naturalWidth;
    const origH = el.naturalHeight;

    // Source region (crop applied to original image, in pixels)
    const sx = cropOn ? (crop.x / 100) * origW : 0;
    const sy = cropOn ? (crop.y / 100) * origH : 0;
    const sw = cropOn ? (crop.w / 100) * origW : origW;
    const sh = cropOn ? (crop.h / 100) * origH : origH;

    // Output dimensions (resize applied to cropped region)
    const outW = rW > 0 ? rW : Math.round(sw);
    const outH = rH > 0 ? rH : Math.round(sh);

    // Skip rotation when drawing the crop preview so the overlay aligns
    const applyRot  = forCropPreview ? 0 : rot;
    const applyFlipH = forCropPreview ? false : flipH;
    const applyFlipV = forCropPreview ? false : flipV;

    const swap = applyRot === 90 || applyRot === 270;
    const cvW  = swap ? outH : outW;
    const cvH  = swap ? outW : outH;

    const cv  = document.createElement('canvas');
    cv.width  = cvW;
    cv.height = cvH;
    const ctx = cv.getContext('2d');

    // Background fill
    if (bgOn) { ctx.fillStyle = bgCol; ctx.fillRect(0, 0, cvW, cvH); }

    // Draw with transforms
    ctx.save();
    ctx.translate(cvW / 2, cvH / 2);
    ctx.rotate((applyRot * Math.PI) / 180);
    if (applyFlipH) ctx.scale(-1, 1);
    if (applyFlipV) ctx.scale(1, -1);
    ctx.drawImage(el, sx, sy, sw, sh, -outW / 2, -outH / 2, outW, outH);
    ctx.restore();

    // Text overlays
    for (const t of texts) {
      ctx.save();
      ctx.globalAlpha   = t.opacity / 100;
      ctx.font          = `${t.bold ? 'bold ' : ''}${t.size}px sans-serif`;
      ctx.textBaseline  = 'middle';
      ctx.textAlign     = 'center';
      if (t.stroke) {
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.lineWidth   = t.size / 10;
        ctx.strokeText(t.text, (t.x / 100) * cvW, (t.y / 100) * cvH);
      }
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, (t.x / 100) * cvW, (t.y / 100) * cvH);
      ctx.restore();
    }

    return cv;
  }, [img, rW, rH, cropOn, crop, rot, flipH, flipV, bgOn, bgCol, texts]);

  /* ── Update preview canvas ── */
  useEffect(() => {
    if (!img || !canvasRef.current || !containerRef.current) return;
    const out = buildCanvas(cropOn);
    if (!out) return;

    const maxW = (containerRef.current.clientWidth  || 800) - 48;
    const maxH = (containerRef.current.clientHeight || 600) - 96;
    const scale = Math.min(maxW / out.width, maxH / out.height, 1);
    const dW = Math.max(1, Math.round(out.width  * scale));
    const dH = Math.max(1, Math.round(out.height * scale));

    canvasRef.current.width  = dW;
    canvasRef.current.height = dH;
    canvasRef.current.getContext('2d').drawImage(out, 0, 0, dW, dH);
    setOutDims({ w: out.width, h: out.height });
  }, [img, buildCanvas, cropOn]);

  /* ── Estimate compressed size ── */
  useEffect(() => {
    if (!img) return;
    const out = buildCanvas(false);
    if (!out) return;
    const mime = fmt === 'png' ? 'image/png' : fmt === 'webp' ? 'image/webp' : 'image/jpeg';
    const q    = fmt !== 'png' ? quality / 100 : undefined;
    out.toBlob(blob => setEstSize(blob?.size ?? null), mime, q);
  }, [img, buildCanvas, fmt, quality]);

  /* ── Download ── */
  function download() {
    setBusy(true);
    const out  = buildCanvas(false);
    if (!out) { setBusy(false); return; }
    const mime = fmt === 'png' ? 'image/png' : fmt === 'webp' ? 'image/webp' : 'image/jpeg';
    const q    = fmt !== 'png' ? quality / 100 : undefined;
    const base = img.name.replace(/\.[^.]+$/, '');
    out.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      Object.assign(document.createElement('a'), { href: url, download: `${base}-edited.${fmt}` }).click();
      URL.revokeObjectURL(url);
      setBusy(false);
    }, mime, q);
  }

  /* ── Resize helpers ── */
  function onWChange(v) {
    const val = Math.max(1, parseInt(v) || 1);
    setRW(val);
    if (lock && img) setRH(Math.round(val * img.el.naturalHeight / img.el.naturalWidth));
  }
  function onHChange(v) {
    const val = Math.max(1, parseInt(v) || 1);
    setRH(val);
    if (lock && img) setRW(Math.round(val * img.el.naturalWidth / img.el.naturalHeight));
  }

  /* ── Apply crop aspect preset ── */
  function applyCropAspect(ratio) {
    setCropAspect(ratio);
    if (!ratio || !img) return;
    const imgAsp = img.el.naturalWidth / img.el.naturalHeight;
    const pctAsp = ratio / imgAsp;
    let cw = 90, ch = 90 / pctAsp;
    if (ch > 90) { ch = 90; cw = ch * pctAsp; }
    cw = Math.min(cw, 100); ch = Math.min(ch, 100);
    setCrop({ x: (100 - cw) / 2, y: (100 - ch) / 2, w: cw, h: ch });
  }

  /* pctAspect for crop overlay constraint */
  const pctAspect = cropAspect && img
    ? cropAspect / (img.el.naturalWidth / img.el.naturalHeight)
    : null;

  /* ── Add text ── */
  function addText() {
    if (!tText.trim()) return;
    setTexts(prev => [...prev, {
      id: uid(), text: tText, x: tX, y: tY,
      size: tSize, color: tColor, opacity: tOpac, bold: tBold, stroke: tStroke,
    }]);
    setTText('');
  }

  /* ─────────────────── SHARED HEADER ─────────────────── */
  const header = (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <polyline points="3,17 8,12 11,15 14,11 21,17"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
          </svg>
        </div>
        <span>Image <span style={{ color: '#10b981' }}>Editor</span></span>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.headerSub}>Resize · Crop · Compress · Convert — 100% in your browser</span>
      </div>
    </div>
  );

  /* ─────────────────── UPLOAD VIEW ─────────────────── */
  if (!img) {
    return (
      <div className={styles.wrap}>
      <ImageToolsTopNav active="image-editor" />
      <PlaygroundTopAd />
        {header}
        <div className={styles.uploadOuter}>
          <div
            className={`${styles.upload} ${dragging ? styles.uploadDrag : ''}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files[0]); }}
            onClick={() => fileRef.current?.click()}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept="image/*"
              className={styles.fileHidden}
              onChange={e => loadFile(e.target.files[0])} />
            <div className={styles.uploadIcon}>🖼️</div>
            <h2 className={styles.uploadTitle}>Drop an image or click to upload</h2>
            <p className={styles.uploadSub}>PNG · JPG · WebP · GIF · BMP — all editing happens in your browser</p>
            <div className={styles.uploadPrivacy}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Your images never leave your device — no upload, no server
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────── EDITOR VIEW ─────────────────── */
  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="image-editor" />
      <PlaygroundTopAd />
      {header}
    <div className={styles.editor}>

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>

        {/* Tabs */}
        <div className={styles.tabs}>
          {TABS.map(t => (
            <button key={t.id}
              className={`${styles.tabBtn} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className={styles.tabIcon}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className={styles.panel}>

          {/* ── RESIZE ── */}
          {tab === 'resize' && (
            <div className={styles.controls}>
              <div className={styles.dimRow}>
                <div className={styles.dimField}>
                  <label className={styles.lbl}>W</label>
                  <input type="number" value={rW} min={1} max={8000}
                    className={styles.numIn}
                    onChange={e => onWChange(e.target.value)} />
                  <span className={styles.unit}>px</span>
                </div>
                <button className={`${styles.lockBtn} ${lock ? styles.lockOn : ''}`}
                  onClick={() => setLock(l => !l)}
                  title={lock ? 'Unlock aspect ratio' : 'Lock aspect ratio'}>
                  {lock ? '🔒' : '🔓'}
                </button>
                <div className={styles.dimField}>
                  <label className={styles.lbl}>H</label>
                  <input type="number" value={rH} min={1} max={8000}
                    className={styles.numIn}
                    onChange={e => onHChange(e.target.value)} />
                  <span className={styles.unit}>px</span>
                </div>
              </div>
              <div className={styles.hint}>
                Original: {img.el.naturalWidth} × {img.el.naturalHeight} px
              </div>
              <button className={styles.resetBtn}
                onClick={() => { setRW(img.el.naturalWidth); setRH(img.el.naturalHeight); }}>
                Reset to original
              </button>

              <div className={styles.secLabel}>Size Presets</div>
              <div className={styles.presetGrid}>
                {SIZE_PRESETS.map(p => (
                  <button key={p.label} className={styles.presetBtn}
                    onClick={() => { setRW(p.w); setRH(p.h); setLock(false); }}>
                    <span className={styles.presetName}>{p.label}</span>
                    <span className={styles.presetDim}>{p.w}×{p.h}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CROP ── */}
          {tab === 'crop' && (
            <div className={styles.controls}>
              <div className={styles.toggleRow}>
                <span>Crop mode</span>
                <button
                  className={`${styles.toggle} ${cropOn ? styles.toggleOn : ''}`}
                  onClick={() => setCropOn(c => !c)}>
                  {cropOn ? 'On' : 'Off'}
                </button>
              </div>
              {cropOn ? (
                <>
                  <div className={styles.hint}>Drag the handles on the preview to set the crop area.</div>
                  <div className={styles.secLabel}>Aspect Ratio</div>
                  <div className={styles.aspectGrid}>
                    {CROP_ASPECTS.map(a => (
                      <button key={a.label}
                        className={`${styles.aspectBtn} ${cropAspect === a.ratio ? styles.aspectActive : ''}`}
                        onClick={() => applyCropAspect(a.ratio)}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                  <div className={styles.cropInfo}>
                    <div>X: {crop.x.toFixed(1)}%  Y: {crop.y.toFixed(1)}%</div>
                    <div>W: {crop.w.toFixed(1)}%  H: {crop.h.toFixed(1)}%</div>
                    <div className={styles.hint}>
                      ≈ {Math.round(crop.w / 100 * img.el.naturalWidth)} × {Math.round(crop.h / 100 * img.el.naturalHeight)} px
                    </div>
                  </div>
                  <button className={styles.resetBtn}
                    onClick={() => { setCrop({ x: 0, y: 0, w: 100, h: 100 }); setCropAspect(null); }}>
                    Reset crop
                  </button>
                  <div className={styles.hint}>ℹ Crop is applied before rotation.</div>
                </>
              ) : (
                <div className={styles.hint}>Enable crop mode to select a region of the image.</div>
              )}
            </div>
          )}

          {/* ── ROTATE ── */}
          {tab === 'rotate' && (
            <div className={styles.controls}>
              <div className={styles.secLabel}>Rotate</div>
              <div className={styles.btnGrid2}>
                <button className={styles.actionBtn}
                  onClick={() => setRot(r => (r + 270) % 360)}>↺ 90° Left</button>
                <button className={styles.actionBtn}
                  onClick={() => setRot(r => (r + 90) % 360)}>↻ 90° Right</button>
                <button className={styles.actionBtn}
                  onClick={() => setRot(r => (r + 180) % 360)}>⇅ 180°</button>
                <button className={styles.actionBtn}
                  onClick={() => setRot(0)}>↺ Reset</button>
              </div>
              <div className={styles.hint}>Current angle: {rot}°</div>

              <div className={styles.secLabel}>Flip</div>
              <div className={styles.btnGrid2}>
                <button className={`${styles.actionBtn} ${flipH ? styles.actionOn : ''}`}
                  onClick={() => setFlipH(f => !f)}>↔ Horizontal</button>
                <button className={`${styles.actionBtn} ${flipV ? styles.actionOn : ''}`}
                  onClick={() => setFlipV(f => !f)}>↕ Vertical</button>
              </div>
            </div>
          )}

          {/* ── COMPRESS ── */}
          {tab === 'compress' && (
            <div className={styles.controls}>
              <div className={styles.secLabel}>Output Format</div>
              <div className={styles.fmtRow}>
                {['jpg', 'png', 'webp'].map(f => (
                  <button key={f}
                    className={`${styles.fmtBtn} ${fmt === f ? styles.fmtActive : ''}`}
                    onClick={() => setFmt(f)}>
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
              {fmt !== 'png' ? (
                <>
                  <div className={styles.secLabel}>Quality: <strong>{quality}%</strong></div>
                  <input type="range" min={10} max={100} value={quality}
                    onChange={e => setQuality(Number(e.target.value))}
                    className={styles.slider} />
                  <div className={styles.sliderHints}>
                    <span>Smaller file</span><span>Better quality</span>
                  </div>
                </>
              ) : (
                <p className={styles.hint}>PNG is lossless — quality slider does not apply.</p>
              )}
              <div className={styles.sizeBox}>
                <div className={styles.sizeRow}>
                  <span>Original</span>
                  <strong>{fmtBytes(img.origSize)}</strong>
                </div>
                <div className={styles.sizeRow}>
                  <span>Estimated output</span>
                  <strong className={styles.estGreen}>{estSize ? fmtBytes(estSize) : '…'}</strong>
                </div>
                {estSize && img.origSize > 0 && estSize < img.origSize && (
                  <div className={styles.sizeRow}>
                    <span>Reduction</span>
                    <strong className={styles.estGreen}>
                      {Math.round((1 - estSize / img.origSize) * 100)}%
                    </strong>
                  </div>
                )}
              </div>
              <div className={styles.hint}>
                JPG — best for photos · WebP — best for web · PNG — lossless / transparency
              </div>
            </div>
          )}

          {/* ── TEXT ── */}
          {tab === 'text' && (
            <div className={styles.controls}>
              <div className={styles.secLabel}>Text content</div>
              <textarea className={styles.textArea} rows={3} placeholder="Your text here…"
                value={tText} onChange={e => setTText(e.target.value)} />

              <div className={styles.inlineRow}>
                <label className={styles.lbl}>Size</label>
                <input type="number" value={tSize} min={8} max={500}
                  className={styles.numIn} onChange={e => setTSize(Number(e.target.value))} />
                <span className={styles.unit}>px</span>
              </div>

              <div className={styles.inlineRow}>
                <label className={styles.lbl}>Color</label>
                <input type="color" value={tColor} onChange={e => setTColor(e.target.value)}
                  className={styles.colorPick} />
                <span className={styles.colorHex}>{tColor}</span>
              </div>

              <div className={styles.sliderRow}>
                <label className={styles.lbl}>Opacity</label>
                <input type="range" min={10} max={100} value={tOpac}
                  onChange={e => setTOpac(Number(e.target.value))} className={styles.slider} />
                <span className={styles.sliderVal}>{tOpac}%</span>
              </div>
              <div className={styles.sliderRow}>
                <label className={styles.lbl}>X pos</label>
                <input type="range" min={0} max={100} value={tX}
                  onChange={e => setTX(Number(e.target.value))} className={styles.slider} />
                <span className={styles.sliderVal}>{tX}%</span>
              </div>
              <div className={styles.sliderRow}>
                <label className={styles.lbl}>Y pos</label>
                <input type="range" min={0} max={100} value={tY}
                  onChange={e => setTY(Number(e.target.value))} className={styles.slider} />
                <span className={styles.sliderVal}>{tY}%</span>
              </div>

              <div className={styles.checkRow}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={tBold} onChange={e => setTBold(e.target.checked)} />
                  Bold
                </label>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={tStroke} onChange={e => setTStroke(e.target.checked)} />
                  Outline
                </label>
              </div>

              <div className={styles.btnGrid2}>
                <button className={styles.addBtn} onClick={addText} disabled={!tText.trim()}>
                  + Add text
                </button>
                <button className={styles.addBtn} onClick={() => {
                  setTText('© Watermark'); setTOpac(40); setTX(75); setTY(93); setTColor('#ffffff'); setTStroke(true);
                }}>
                  💧 Watermark
                </button>
              </div>

              {texts.length > 0 && (
                <>
                  <div className={styles.secLabel}>Layers ({texts.length})</div>
                  {texts.map(t => (
                    <div key={t.id} className={styles.layerRow}>
                      <span
                        className={styles.layerDot}
                        style={{ background: t.color, border: '1px solid rgba(255,255,255,0.2)' }}
                      />
                      <span className={styles.layerText}>"{t.text}"</span>
                      <span className={styles.layerMeta}>{t.size}px</span>
                      <button className={styles.layerDel}
                        onClick={() => setTexts(a => a.filter(x => x.id !== t.id))}>✕</button>
                    </div>
                  ))}
                  <button className={styles.resetBtn} onClick={() => setTexts([])}>
                    Clear all layers
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── BG COLOR ── */}
          {tab === 'bg' && (
            <div className={styles.controls}>
              <p className={styles.hint}>
                Fills transparent pixels — ideal for PNG images with transparency or when converting to JPG.
              </p>
              <div className={styles.toggleRow}>
                <span>Fill background</span>
                <button className={`${styles.toggle} ${bgOn ? styles.toggleOn : ''}`}
                  onClick={() => setBgOn(b => !b)}>
                  {bgOn ? 'On' : 'Off'}
                </button>
              </div>
              {bgOn && (
                <>
                  <div className={styles.inlineRow}>
                    <label className={styles.lbl}>Color</label>
                    <input type="color" value={bgCol} onChange={e => setBgCol(e.target.value)}
                      className={styles.colorPick} />
                    <span className={styles.colorHex}>{bgCol}</span>
                  </div>
                  <div className={styles.swatchRow}>
                    {['#ffffff','#000000','#f8fafc','#1e293b','#fef2f2','#eff6ff','#f0fdf4','#fefce8'].map(c => (
                      <button key={c}
                        className={`${styles.swatch} ${bgCol === c ? styles.swatchOn : ''}`}
                        style={{ background: c }}
                        onClick={() => setBgCol(c)} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Change image */}
        <div className={styles.sideFooter}>
          <button className={styles.changeBtn} onClick={() => setImg(null)}>
            ← New image
          </button>
          <input ref={fileRef} type="file" accept="image/*"
            className={styles.fileHidden}
            onChange={e => loadFile(e.target.files[0])} />
        </div>
      </aside>

      {/* ── Preview area ── */}
      <div ref={containerRef} className={styles.previewArea}>
        <div className={styles.previewInner}>
          {/* Checkered background to show transparency */}
          <div className={styles.canvasWrap}>
            <canvas ref={canvasRef} className={styles.canvas} />
            {cropOn && (
              <CropOverlay crop={crop} setCrop={setCrop} pctAspect={pctAspect} />
            )}
          </div>
        </div>

        {/* Info bar */}
        <div className={styles.infoBar}>
          <span className={styles.infoDims}>{outDims.w} × {outDims.h}</span>
          <span className={styles.infoDot}>·</span>
          <span>{fmt.toUpperCase()}</span>
          {fmt !== 'png' && <><span className={styles.infoDot}>·</span><span>Q{quality}</span></>}
          {estSize && <><span className={styles.infoDot}>·</span><span>~{fmtBytes(estSize)}</span></>}
          <span className={styles.infoPrivacy}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            No upload
          </span>
        </div>

        <button className={styles.downloadBtn} onClick={download} disabled={busy}>
          {busy
            ? <span className={styles.spin}>⟳</span>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          }
          {busy ? 'Preparing…' : `Download ${fmt.toUpperCase()}`}
        </button>
      </div>
    </div>
    </div>
  );
}
