'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

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

function ResponsivePreviewInner() {
  const [url, setUrl]               = useState('');
  const [loadedUrl, setLoadedUrl]   = useState('');
  const [device, setDevice]         = useState(ALL_DEVICES[1]);
  const [flipped, setFlipped]       = useState(false);
  const [zoom, setZoom]             = useState(50);
  const [canvasBg, setCanvasBg]     = useState('dots');
  const [error, setError]           = useState(false);
  const [loading, setLoading]       = useState(false);
  const [customW, setCustomW]       = useState('');
  const [customH, setCustomH]       = useState('');
  const [useCustom, setUseCustom]   = useState(false);
  const [reloadKey, setReloadKey]   = useState(0);
  const iframeRef    = useRef(null);
  const canvasRef    = useRef(null);
  const router       = useRouter();
  const searchParams = useSearchParams();

  const baseW = useCustom && customW ? parseInt(customW) : (flipped ? device.height : device.width);
  const baseH = useCustom && customH ? parseInt(customH) : (flipped ? device.width  : device.height);
  const scale  = zoom / 100;

  // Auto-load from ?link= query param on mount
  useEffect(() => {
    const linkParam = searchParams.get('link');
    if (linkParam) {
      let finalUrl = linkParam;
      if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;
      setUrl(finalUrl);
      setLoadedUrl(finalUrl);
      setError(false);
      setLoading(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-fit zoom when device or canvas changes
  const fitZoom = useCallback(() => {
    if (!canvasRef.current) return;
    const { clientWidth: cw, clientHeight: ch } = canvasRef.current;
    const padding = 48;
    const fitW = Math.floor(((cw - padding) / baseW) * 100);
    const fitH = Math.floor(((ch - padding) / baseH) * 100);
    setZoom(Math.min(fitW, fitH, 100));
  }, [baseW, baseH]);

  useEffect(() => { fitZoom(); }, [device, flipped, useCustom, customW, customH]);

  const loadUrl = () => {
    if (!url.trim()) return;
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;
    setError(false);
    setLoading(true);
    setLoadedUrl(finalUrl);
    // Sync to address bar
    router.replace(`?link=${encodeURIComponent(finalUrl)}`, { scroll: false });
  };

  const reload = () => { setError(false); setLoading(true); setReloadKey(k => k + 1); };
  const handleLoad  = () => { setError(false); setLoading(false); };
  const handleError = () => { setError(true);  setLoading(false); };

  const selectDevice = (d) => { setDevice(d); setUseCustom(false); setFlipped(false); };

  const isLandscape = flipped ? device.width > device.height : device.height > device.width;

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="responsive-preview-tool" />
      {/* Single header bar */}
      <div className={styles.header}>
        {/* ── Left: logo + URL bar ── */}
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

        {/* ── Right: device / zoom / orientation settings ── */}
        <div className={styles.headerRight}>
          {/* Device select */}
          <select
            className={styles.deviceSelect}
            value={useCustom ? 'custom' : device.id}
            onChange={e => {
              if (e.target.value === 'custom') { setUseCustom(true); }
              else { const d = ALL_DEVICES.find(x => x.id === e.target.value); if (d) selectDevice(d); }
            }}>
            {DEVICE_GROUPS.map(group => (
              <optgroup key={group.label} label={group.label}>
                {group.devices.map(d => (
                  <option key={d.id} value={d.id}>{d.label} — {d.width}×{d.height}</option>
                ))}
              </optgroup>
            ))}
            <option value="custom">Custom</option>
          </select>

          {useCustom && (
            <div className={styles.customSizeRow}>
              <input className={`${styles.customInput} ${styles.customInputActive}`}
                type="number" placeholder="W" value={customW}
                onChange={e => setCustomW(e.target.value)} />
              <span className={styles.customX}>×</span>
              <input className={`${styles.customInput} ${styles.customInputActive}`}
                type="number" placeholder="H" value={customH}
                onChange={e => setCustomH(e.target.value)} />
            </div>
          )}

          {/* Size info */}
          <div className={styles.sizeInfo}>
            <span className={styles.sizeLabel}>{baseW} × {baseH}</span>
            <span className={styles.aspectLabel}>{gcd(baseW, baseH) > 0 ? `${baseW/gcd(baseW,baseH)}:${baseH/gcd(baseW,baseH)}` : ''}</span>
          </div>

          {/* Orientation flip */}
          <button className={`${styles.controlBtn} ${flipped ? styles.controlBtnActive : ''}`}
            onClick={() => setFlipped(f => !f)} title="Flip orientation">
            {isLandscape ? '↔ Landscape' : '↕ Portrait'}
          </button>

          <div className={styles.sep} />

          {/* Zoom */}
          <div className={styles.zoomGroup}>
            {ZOOM_PRESETS.map(p => (
              <button key={p}
                className={`${styles.zoomPreset} ${zoom === p ? styles.zoomPresetActive : ''}`}
                onClick={() => setZoom(p)}>{p}%</button>
            ))}
            <button className={styles.controlBtn} onClick={fitZoom} title="Fit to window">⊡ Fit</button>
            <button className={styles.zoomBtnSm} onClick={() => setZoom(z => Math.max(10, z - 5))}>−</button>
            <span className={styles.zoomVal}>{zoom}%</span>
            <button className={styles.zoomBtnSm} onClick={() => setZoom(z => Math.min(100, z + 5))}>+</button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={canvasRef} className={`${styles.canvas} ${styles['bg_' + canvasBg]}`}>
        <div className={styles.frameOuter}>
          <div className={styles.frameWrap}
            style={{ width: baseW * scale + 'px', height: baseH * scale + 'px' }}>
            {loadedUrl ? (
              <>
                {loading && !error && (
                  <div className={styles.loadingOverlay}>
                    <div className={styles.spinner} />
                  </div>
                )}
                {error && (
                  <div className={styles.errorOverlay}>
                    <div className={styles.errorIcon}>⚠</div>
                    <div className={styles.errorTitle}>Cannot embed this page</div>
                    <div className={styles.errorSub}>This site blocks iframe embedding (X-Frame-Options / CSP).</div>
                    <a href={loadedUrl} target="_blank" rel="noopener noreferrer" className={styles.errorLink}>Open in new tab →</a>
                  </div>
                )}
                <iframe
                  key={reloadKey}
                  ref={iframeRef}
                  src={loadedUrl}
                  title="preview"
                  className={styles.iframe}
                  style={{
                    width: baseW + 'px',
                    height: baseH + 'px',
                    transform: `scale(${scale})`,
                    transformOrigin: '0 0',
                    display: error ? 'none' : 'block',
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
                  {['example.com', 'github.com', 'vercel.com'].map(e => (
                    <button key={e} className={styles.exampleBtn}
                      onClick={() => { const u = 'https://' + e; setUrl(u); setLoadedUrl(u); setLoading(true); setError(false); router.replace(`?link=${encodeURIComponent(u)}`, { scroll: false }); }}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
