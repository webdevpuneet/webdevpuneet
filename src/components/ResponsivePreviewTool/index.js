'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const DEVICE_GROUPS = [
  {
    label: 'Mobile',
    devices: [
      { id: 'mobile-sm',  label: 'Mobile S',  width: 320,  height: 568  },
      { id: 'mobile',     label: 'Mobile',     width: 390,  height: 844  },
      { id: 'mobile-lg',  label: 'Mobile L',   width: 428,  height: 926  },
    ],
  },
  {
    label: 'Tablet',
    devices: [
      { id: 'tablet-p',   label: 'Tablet ↕',   width: 768,  height: 1024 },
      { id: 'tablet-l',   label: 'Tablet ↔',   width: 1024, height: 768  },
      { id: 'ipad-p',     label: 'iPad Pro ↕', width: 1024, height: 1366 },
      { id: 'ipad-l',     label: 'iPad Pro ↔', width: 1366, height: 1024 },
    ],
  },
  {
    label: 'Desktop',
    devices: [
      { id: 'laptop',     label: 'Laptop',     width: 1280, height: 800  },
      { id: 'desktop',    label: 'Desktop',    width: 1440, height: 900  },
      { id: 'wide',       label: 'Wide 2K',    width: 1920, height: 1080 },
    ],
  },
];

const ALL_DEVICES = DEVICE_GROUPS.flatMap(g => g.devices);

const BG_OPTIONS = [
  { key: 'dots',  label: 'Dots'  },
  { key: 'grid',  label: 'Grid'  },
  { key: 'dark',  label: 'Dark'  },
  { key: 'light', label: 'Light' },
];

const ZOOM_PRESETS = [25, 50, 75, 100];

const MULTI_DEFAULT = ['mobile', 'tablet-p', 'laptop'];
const BREAKPOINTS   = [375, 768, 1024, 1280, 1440];
const TW_NAMES      = [[1536, '2xl'], [1280, 'xl'], [1024, 'lg'], [768, 'md'], [640, 'sm'], [0, 'base']];
const MIN_SIZE = 200;
const MAX_SIZE = 3840;
const LOAD_TIMEOUT_MS = 12000;
const MULTI_GAP = 24;
const EXAMPLES = ['example.com', 'wikipedia.org', 'webdevpuneet.com'];

const clampSize = (n) => Math.max(MIN_SIZE, Math.min(MAX_SIZE, n));
const twName = (w) => TW_NAMES.find(([min]) => w >= min)[1];
const normalizeUrl = (u) => (/^https?:\/\//i.test(u) ? u : 'https://' + u);

function Ruler({ width, scale }) {
  let lastLeft = -Infinity;
  const ticks = BREAKPOINTS.filter(b => b <= width).map(b => {
    const left = b * scale;
    const showLabel = left - lastLeft >= 30;
    if (showLabel) lastLeft = left;
    return { b, left, showLabel };
  });
  return (
    <div className={styles.ruler} style={{ width: width * scale + 'px' }}>
      {ticks.map(t => (
        <span key={t.b} className={styles.rulerTick} style={{ left: t.left + 'px' }}>
          <i className={styles.rulerMark} />
          {t.showLabel && <span className={styles.rulerLabel}>{t.b}</span>}
        </span>
      ))}
      <span className={styles.rulerEnd}>{width}px · {twName(width)}</span>
    </div>
  );
}

// Toolbar dropdown. Fixed-positioned so the horizontally scrolling toolbar can't clip it.
// children is a render prop receiving close().
function Menu({ label, title, active, disabled, width = 220, children }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos]   = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close    = () => setOpen(false);
    const inside   = (e) => ref.current && ref.current.contains(e.target);
    const onDown   = (e) => { if (!inside(e)) close(); };
    const onKey    = (e) => { if (e.key === 'Escape') close(); };
    const onScroll = (e) => { if (!inside(e)) close(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open]);

  const toggle = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ top: r.bottom + 6, left: Math.max(8, Math.min(r.left, window.innerWidth - width - 8)) });
    setOpen(o => !o);
  };

  return (
    <div className={styles.menuWrap} ref={ref}>
      <button className={`${styles.controlBtn} ${styles.menuBtn} ${open || active ? styles.controlBtnActive : ''}`}
        onClick={toggle} disabled={disabled} title={title} aria-haspopup="menu" aria-expanded={open}>
        {label}<span className={styles.caret}>▾</span>
      </button>
      {open && (
        <div className={styles.menu} role="menu" style={{ top: pos.top + 'px', left: pos.left + 'px', width: width + 'px' }}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function MenuItem({ children, sub, meta, checked, onClick }) {
  return (
    <button role={checked === undefined ? 'menuitem' : 'menuitemcheckbox'} aria-checked={checked}
      className={`${styles.menuItem} ${checked ? styles.menuItemOn : ''}`} onClick={onClick}>
      <span className={styles.menuCheck}>{checked ? '✓' : ''}</span>
      <span className={styles.menuText}>
        <span className={styles.menuTitle}>{children}</span>
        {sub && <span className={styles.menuSub}>{sub}</span>}
      </span>
      {meta && <span className={styles.menuMeta}>{meta}</span>}
    </button>
  );
}

function ResponsivePreviewInner() {
  const [url, setUrl]               = useState('');
  const [loadedUrl, setLoadedUrl]   = useState('');
  const [device, setDevice]         = useState(ALL_DEVICES[1]);
  const [flipped, setFlipped]       = useState(false);
  const [zoom, setZoom]             = useState(50);
  const [autoFit, setAutoFit]       = useState(true);
  const [canvasBg, setCanvasBg]     = useState('dots');
  const [error, setError]           = useState(false);
  const [loading, setLoading]       = useState(false);
  const [customW, setCustomW]       = useState('');
  const [customH, setCustomH]       = useState('');
  const [useCustom, setUseCustom]   = useState(false);
  const [reloadKey, setReloadKey]   = useState(0);
  const [multi, setMulti]           = useState(false);
  const [multiIds, setMultiIds]     = useState(MULTI_DEFAULT);
  const [showRuler, setShowRuler]   = useState(true);
  const [dragging, setDragging]     = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [isFs, setIsFs]       = useState(false);
  const [shotBusy, setShotBusy] = useState(false);
  const [shotMsg, setShotMsg]   = useState('');
  const canvasRef    = useRef(null);
  const shotRef      = useRef(null);
  const dragRef      = useRef(null);
  const router       = useRouter();
  const searchParams = useSearchParams();

  const baseW = useCustom && customW ? parseInt(customW) || device.width  : (flipped ? device.height : device.width);
  const baseH = useCustom && customH ? parseInt(customH) || device.height : (flipped ? device.width  : device.height);
  const scale = zoom / 100;

  const multiDevices = ALL_DEVICES.filter(d => multiIds.includes(d.id));
  const frames = multi
    ? multiDevices.map(d => ({ id: d.id, label: d.label, w: flipped ? d.height : d.width, h: flipped ? d.width : d.height }))
    : [{ id: 'single', label: '', w: baseW, h: baseH }];
  const framesKey = frames.map(f => `${f.w}x${f.h}`).join(',');

  // Restore full preview state from the shared URL on mount
  useEffect(() => {
    const p = searchParams;
    const linkParam = p.get('link');
    if (!linkParam) return;
    const finalUrl = normalizeUrl(linkParam);
    setUrl(finalUrl);
    setLoadedUrl(finalUrl);
    setError(false);
    setLoading(true);

    const w = parseInt(p.get('w')), h = parseInt(p.get('h'));
    const d = ALL_DEVICES.find(x => x.id === p.get('d'));
    if (w > 0 && h > 0) { setUseCustom(true); setCustomW(String(clampSize(w))); setCustomH(String(clampSize(h))); }
    else if (d) setDevice(d);
    if (p.get('r') === '1') setFlipped(true);
    const z = parseInt(p.get('z'));
    if (z >= 5 && z <= 100) { setZoom(z); setAutoFit(false); }
    if (BG_OPTIONS.some(b => b.key === p.get('bg'))) setCanvasBg(p.get('bg'));
    if (p.get('m')) {
      const ids = p.get('m').split(',').filter(id => ALL_DEVICES.some(x => x.id === id));
      if (ids.length) { setMulti(true); setMultiIds(ids); }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the shareable URL in sync with the whole preview state
  useEffect(() => {
    if (!loadedUrl) return;
    const t = setTimeout(() => {
      const p = new URLSearchParams();
      p.set('link', loadedUrl);
      if (multi) p.set('m', multiIds.join(','));
      else if (useCustom && customW && customH) { p.set('w', customW); p.set('h', customH); }
      else p.set('d', device.id);
      if (flipped && !useCustom) p.set('r', '1');
      if (!autoFit) p.set('z', String(zoom));
      if (canvasBg !== 'dots') p.set('bg', canvasBg);
      router.replace('?' + p.toString(), { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [loadedUrl, multi, multiIds, useCustom, customW, customH, device, flipped, autoFit, zoom, canvasBg]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fit zoom to the canvas (handles single frame and the multi-device row)
  const fitZoom = useCallback(() => {
    if (!canvasRef.current) return;
    const { clientWidth: cw, clientHeight: ch } = canvasRef.current;
    const padding = 48;
    const sumW = frames.reduce((s, f) => s + f.w, 0);
    const maxH = Math.max(...frames.map(f => f.h));
    const gaps = MULTI_GAP * (frames.length - 1);
    const extraH = multi ? 30 : (showRuler ? 28 : 0);
    const fitW = Math.floor(((cw - padding - gaps) / sumW) * 100);
    const fitH = Math.floor(((ch - padding - extraH) / maxH) * 100);
    setZoom(Math.max(5, Math.min(fitW, fitH, 100)));
  }, [framesKey, multi, showRuler]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (autoFit) fitZoom(); }, [autoFit, fitZoom]);

  useEffect(() => {
    if (!autoFit) return;
    window.addEventListener('resize', fitZoom);
    return () => window.removeEventListener('resize', fitZoom);
  }, [autoFit, fitZoom]);

  // Blocked sites report "loaded" in most browsers, so also time out a load that never finishes
  useEffect(() => {
    if (!loadedUrl || !loading) return;
    const t = setTimeout(() => { setError(true); setLoading(false); }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [loadedUrl, loading, reloadKey]);

  const openUrl = (raw) => {
    const finalUrl = normalizeUrl(raw.trim());
    setUrl(finalUrl);
    setError(false);
    setLoading(true);
    setHintDismissed(false);
    if (finalUrl === loadedUrl) setReloadKey(k => k + 1);
    setLoadedUrl(finalUrl);
  };
  const loadUrl = () => { if (url.trim()) openUrl(url); };

  const reload = () => { setError(false); setLoading(true); setReloadKey(k => k + 1); };
  const handleLoad  = () => { setError(false); setLoading(false); };
  const handleError = () => { setError(true);  setLoading(false); };

  const selectDevice = (d) => { setDevice(d); setUseCustom(false); setFlipped(false); };
  const setManualZoom = (z) => { setAutoFit(false); setZoom(Math.max(5, Math.min(100, z))); };

  const flip = () => {
    if (useCustom) { const w = customW, h = customH; setCustomW(h); setCustomH(w); }
    else setFlipped(f => !f);
  };

  const toggleMultiId = (id) => setMultiIds(ids =>
    ids.includes(id) ? (ids.length > 1 ? ids.filter(x => x !== id) : ids) : [...ids, id]);

  const isLandscape = baseW > baseH;

  // Keyboard shortcuts: R rotate, F fit, M multi-device, + / − zoom
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === 'r') flip();
      else if (k === 'f') setAutoFit(true);
      else if (k === 'm') { setMulti(m => !m); setAutoFit(true); }
      else if (k === '+' || k === '=') setManualZoom(zoom + 5);
      else if (k === '-') setManualZoom(zoom - 5);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Drag-to-resize: pointer capture keeps events on the handle even over the iframe
  const startDrag = (axis) => (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { axis, x: e.clientX, y: e.clientY, w: baseW, h: baseH };
    setAutoFit(false);
    setDragging(true);
  };
  const onDragMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const nw = d.axis.includes('x') ? clampSize(Math.round(d.w + (e.clientX - d.x) / scale)) : d.w;
    const nh = d.axis.includes('y') ? clampSize(Math.round(d.h + (e.clientY - d.y) / scale)) : d.h;
    setUseCustom(true);
    setCustomW(String(nw));
    setCustomH(String(nh));
  };
  const endDrag = () => { dragRef.current = null; setDragging(false); };

  // Fullscreen the canvas (frames + background); Esc exits
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else canvasRef.current?.requestFullscreen?.().catch(() => {});
  };
  useEffect(() => {
    const onFs = () => {
      setIsFs(!!document.fullscreenElement);
      if (autoFit) setTimeout(fitZoom, 120);
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, [autoFit, fitZoom]);

  // Screenshot: iframes are cross-origin so pixels can't be read directly. Capture this tab
  // with the browser's screen-capture API and crop to the frame. Output is at on-screen
  // (zoomed) size — use 100% zoom for true device pixels.
  const flashShotMsg = (m) => { setShotMsg(m); setTimeout(() => setShotMsg(''), 4000); };
  const takeScreenshot = async () => {
    const el = shotRef.current;
    if (!el || !loadedUrl || shotBusy) return;
    if (!navigator.mediaDevices?.getDisplayMedia) { flashShotMsg('Screenshots need a desktop Chrome, Edge or Firefox'); return; }
    setShotBusy(true);
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true, preferCurrentTab: true, selfBrowserSurface: 'include' });
      const track = stream.getVideoTracks()[0];
      if (track.getSettings().displaySurface && track.getSettings().displaySurface !== 'browser') {
        flashShotMsg('Pick "This tab" in the share dialog');
        return;
      }
      const video = document.createElement('video');
      video.srcObject = stream; video.muted = true;
      await video.play();
      await new Promise(r => setTimeout(r, 400)); // let the share dialog disappear from the capture
      const r = el.getBoundingClientRect();
      const sx = video.videoWidth / window.innerWidth;
      const sy = video.videoHeight / window.innerHeight;
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(r.width * sx));
      canvas.height = Math.max(1, Math.round(r.height * sy));
      canvas.getContext('2d').drawImage(video, r.left * sx, r.top * sy, r.width * sx, r.height * sy, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
      let host = 'page';
      try { host = new URL(loadedUrl).hostname.replace(/^www\./, ''); } catch {}
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `responsive-${host}-${multi ? 'multi' : baseW + 'x' + baseH}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      flashShotMsg('Screenshot saved');
    } catch (e) {
      if (e?.name !== 'NotAllowedError') flashShotMsg('Screenshot failed');
    } finally {
      stream?.getTracks().forEach(tr => tr.stop());
      setShotBusy(false);
    }
  };

  // Full-page (top to bottom) capture: the framed page is cross-origin so its height can't be read
  // or scrolled from here, and the site is a static export with no server. Microlink's free
  // screenshot API loads the URL at the frame's width and returns the whole page as one PNG.
  const takeFullPage = async () => {
    if (!loadedUrl || shotBusy) return;
    setShotBusy(true);
    flashShotMsg('Rendering full page… (up to ~20s)');
    try {
      let host = 'page';
      try { host = new URL(loadedUrl).hostname.replace(/^www\./, ''); } catch {}
      for (const f of frames) {
        const q = new URLSearchParams({
          url: loadedUrl, screenshot: 'true', meta: 'false', fullPage: 'true', type: 'png',
          'viewport.width': String(f.w), 'viewport.height': String(f.h), 'viewport.deviceScaleFactor': '1',
        });
        const res = await fetch('https://api.microlink.io/?' + q);
        const json = await res.json();
        const shot = json?.data?.screenshot?.url;
        if (json.status !== 'success' || !shot) throw new Error(json?.message || 'failed');
        const name = `fullpage-${host}-${f.w}px.png`;
        try {
          const blob = await (await fetch(shot)).blob();
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = name;
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        } catch {
          window.open(shot, '_blank', 'noopener'); // CDN blocked the blob fetch — open the image instead
        }
      }
      flashShotMsg('Full-page screenshot saved');
    } catch (e) {
      flashShotMsg('Full-page capture failed — the site may block bots, or the daily free limit was hit');
    } finally {
      setShotBusy(false);
    }
  };

  const renderFrame = (f) => (
    <div key={f.id} className={`${styles.frameWrap} ${dragging ? styles.noTransition : ''}`}
      style={{ width: f.w * scale + 'px', height: f.h * scale + 'px' }}>
      {loadedUrl ? (
        <>
          {loading && !error && (
            <div className={styles.loadingOverlay}><div className={styles.spinner} /></div>
          )}
          {error && (
            <div className={styles.errorOverlay}>
              <div className={styles.errorIcon}>⚠</div>
              <div className={styles.errorTitle}>Cannot embed this page</div>
              <div className={styles.errorSub}>This site blocks iframe embedding (X-Frame-Options / CSP) or took too long to load.</div>
              <a href={loadedUrl} target="_blank" rel="noopener noreferrer" className={styles.errorLink}>Open in new tab →</a>
            </div>
          )}
          <iframe
            key={reloadKey}
            src={loadedUrl}
            title={f.label ? `preview ${f.label}` : 'preview'}
            className={styles.iframe}
            style={{
              width: f.w + 'px', height: f.h + 'px',
              transform: `scale(${scale})`, transformOrigin: '0 0',
              display: error ? 'none' : 'block',
              pointerEvents: dragging ? 'none' : 'auto',
            }}
            onLoad={handleLoad}
            onError={handleError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⊞</div>
          <div className={styles.emptyTitle}>Enter a URL to preview</div>
          <div className={styles.emptySub}>Paste any public URL and hit Preview</div>
          <div className={styles.emptyExamples}>
            {EXAMPLES.map(e => (
              <button key={e} className={styles.exampleBtn} onClick={() => openUrl(e)}>{e}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="responsive-preview-tool" />
      <PlaygroundTopAd />
      {/* Single header row: brand + address bar, then grouped controls */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>⊞</div>
          <span className={styles.headerTitle}>Responsive <span className={styles.headerAccent}>Preview</span></span>
          <div className={styles.sep} />
          <div className={styles.urlInputWrap}>
            {loadedUrl && (
              <span className={`${styles.statusDot} ${loading ? styles.statusLoading : error ? styles.statusError : styles.statusOk}`} title={loading ? 'Loading…' : error ? 'Blocked' : 'Loaded'} />
            )}
            <input
              className={styles.urlInput}
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={e => { if (e.key === 'Enter') loadUrl(); }}
            />
            {url && <button className={styles.urlClear} onClick={() => setUrl('')}>✕</button>}
          </div>
          {loadedUrl && <button className={styles.reloadBtn} onClick={reload} title="Reload">↺</button>}
          <button className={styles.previewBtn} onClick={loadUrl}>Preview</button>
          {loadedUrl && (
            <a className={styles.openBtn} href={loadedUrl} target="_blank" rel="noopener noreferrer" title="Open in new tab">↗</a>
          )}
        </div>

        <div className={styles.sep} />

        {/* Grouped controls — Viewport | Zoom | View & capture */}
        <div className={styles.toolbar}>
        {/* Viewport */}
        <div className={styles.group}>
          <Menu width={240} title="Device preset, custom size or multi-device view"
            label={multi ? `⫼ ${multiIds.length} devices` : (useCustom ? 'Custom' : device.label)}>
            {(close) => (
              <>
                {DEVICE_GROUPS.map(group => (
                  <div key={group.label}>
                    <div className={styles.menuHeading}>{group.label}</div>
                    {group.devices.map(d => (
                      <MenuItem key={d.id} meta={`${d.width}×${d.height}`}
                        checked={multi ? multiIds.includes(d.id) : (!useCustom && device.id === d.id)}
                        onClick={() => { if (multi) toggleMultiId(d.id); else { selectDevice(d); close(); } }}>
                        {d.label}
                      </MenuItem>
                    ))}
                  </div>
                ))}
                <div className={styles.menuDivider} />
                {!multi && (
                  <MenuItem checked={useCustom} sub="Type a size, or drag the frame edges"
                    onClick={() => { setCustomW(String(baseW)); setCustomH(String(baseH)); setUseCustom(true); close(); }}>
                    Custom size
                  </MenuItem>
                )}
                <MenuItem checked={multi} sub={multi ? 'Tick devices above to add or remove' : 'Several devices side by side (M)'}
                  onClick={() => { setMulti(m => !m); setAutoFit(true); }}>
                  Multi-device view
                </MenuItem>
              </>
            )}
          </Menu>

          {!multi && (
            <div className={styles.sizeInputs} title="Width × height in CSS pixels">
              <input className={styles.customInput} type="number" aria-label="Width" min={MIN_SIZE} max={MAX_SIZE}
                value={useCustom ? customW : baseW}
                onChange={e => { if (!useCustom) { setCustomH(String(baseH)); setUseCustom(true); } setCustomW(e.target.value); }} />
              <span className={styles.customX}>×</span>
              <input className={styles.customInput} type="number" aria-label="Height" min={MIN_SIZE} max={MAX_SIZE}
                value={useCustom ? customH : baseH}
                onChange={e => { if (!useCustom) { setCustomW(String(baseW)); setUseCustom(true); } setCustomH(e.target.value); }} />
            </div>
          )}

          <button className={`${styles.iconBtn} ${isLandscape ? styles.controlBtnActive : ''}`} onClick={flip}
            title={`Rotate (R) — now ${isLandscape ? 'landscape' : 'portrait'}`} aria-label="Rotate">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="9" width="9" height="13" rx="1.5"/><line x1="7" y1="19" x2="8" y2="19"/><path d="M11 3h4a5 5 0 0 1 5 5v4"/><polyline points="17 9.5 20 12.5 23 9.5"/></svg>
          </button>
        </div>

        <div className={styles.sep} />

        {/* Zoom */}
        <div className={styles.group}>
          <button className={styles.iconBtn} onClick={() => setManualZoom(zoom - 5)} aria-label="Zoom out" title="Zoom out (−)">−</button>
          <Menu width={170} title="Zoom" label={autoFit ? `Fit · ${zoom}%` : `${zoom}%`}>
            {(close) => (
              <>
                <MenuItem checked={autoFit} meta="F" onClick={() => { setAutoFit(true); fitZoom(); close(); }}>Fit to window</MenuItem>
                <div className={styles.menuDivider} />
                {ZOOM_PRESETS.map(p => (
                  <MenuItem key={p} checked={!autoFit && zoom === p} onClick={() => { setManualZoom(p); close(); }}>{p}%</MenuItem>
                ))}
              </>
            )}
          </Menu>
          <button className={styles.iconBtn} onClick={() => setManualZoom(zoom + 5)} aria-label="Zoom in" title="Zoom in (+)">+</button>
        </div>

        <div className={styles.sep} />

        {/* View & capture */}
        <div className={styles.group}>
          <Menu width={210} title="Canvas background and ruler" label="View">
            {() => (
              <>
                <div className={styles.menuHeading}>Background</div>
                {BG_OPTIONS.map(b => (
                  <MenuItem key={b.key} checked={canvasBg === b.key} onClick={() => setCanvasBg(b.key)}>
                    <span className={`${styles.swatch} ${styles['swatch_' + b.key]}`} />{b.label}
                  </MenuItem>
                ))}
                {!multi && (
                  <>
                    <div className={styles.menuDivider} />
                    <MenuItem checked={showRuler} sub="375 · 768 · 1024 · 1280 · 1440" onClick={() => setShowRuler(r => !r)}>Breakpoint ruler</MenuItem>
                  </>
                )}
              </>
            )}
          </Menu>

          <Menu width={240} title="Save a PNG of the preview" disabled={!loadedUrl || shotBusy}
            label={shotBusy ? '… Capturing' : '⌾ Screenshot'}>
            {(close) => (
              <>
                <MenuItem sub={<>What you see now. Pick &ldquo;This tab&rdquo; when asked.</>} onClick={() => { close(); takeScreenshot(); }}>Visible area</MenuItem>
                <MenuItem sub="Top to bottom at this width. URL is sent to Microlink." onClick={() => { close(); takeFullPage(); }}>Full page</MenuItem>
              </>
            )}
          </Menu>

          <button className={`${styles.iconBtn} ${isFs ? styles.controlBtnActive : ''}`} onClick={toggleFullscreen}
            title={isFs ? 'Exit fullscreen (Esc)' : 'Fullscreen preview'} aria-label="Fullscreen">
            {isFs ? '⤡' : '⛶'}
          </button>
        </div>

        {shotMsg && <span className={styles.shotMsg}>{shotMsg}</span>}
        </div>
      </div>

      {/* Blocked-site hint: browsers report blocked frames as "loaded", so this can't be auto-detected */}
      {loadedUrl && !loading && !error && !hintDismissed && (
        <div className={styles.hintBar}>
          Frame blank or says &ldquo;refused to connect&rdquo;? That site blocks embedding.
          <a href={loadedUrl} target="_blank" rel="noopener noreferrer" className={styles.hintLink}>Open in new tab →</a>
          <button className={styles.hintClose} onClick={() => setHintDismissed(true)} aria-label="Dismiss">✕</button>
        </div>
      )}

      {/* Canvas */}
      <div ref={canvasRef} className={`${styles.canvas} ${styles['bg_' + canvasBg]}`}>
        {multi && loadedUrl ? (
          <div ref={shotRef} className={styles.multiRow} style={{ gap: MULTI_GAP + 'px' }}>
            {frames.map(f => (
              <div key={f.id} className={styles.frameOuter}>
                <div className={styles.frameCaption}>{f.label} · {f.w}×{f.h}</div>
                {renderFrame(f)}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.frameOuter}>
            {showRuler && loadedUrl && <Ruler width={baseW} scale={scale} />}
            <div ref={shotRef} className={styles.frameStage}>
              {renderFrame({ id: 'single', label: '', w: baseW, h: baseH })}
              {loadedUrl && (
                <>
                  <div className={`${styles.handle} ${styles.handleR}`} onPointerDown={startDrag('x')} onPointerMove={onDragMove} onPointerUp={endDrag} onPointerCancel={endDrag} title="Drag to resize width" />
                  <div className={`${styles.handle} ${styles.handleB}`} onPointerDown={startDrag('y')} onPointerMove={onDragMove} onPointerUp={endDrag} onPointerCancel={endDrag} title="Drag to resize height" />
                  <div className={`${styles.handle} ${styles.handleC}`} onPointerDown={startDrag('xy')} onPointerMove={onDragMove} onPointerUp={endDrag} onPointerCancel={endDrag} title="Drag to resize" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResponsivePreviewTool() {
  return (
    <Suspense fallback={<div style={{ flex: 1 }} />}>
      <ResponsivePreviewInner />
    </Suspense>
  );
}
