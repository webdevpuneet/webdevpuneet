'use client';

import { useState, useRef, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';

// CSS viewport sizes (screen size in CSS px, as reported by the browser) of current devices.
// Landscape is one click away with Rotate, so only portrait / native orientation is listed.
// `kind` picks the device frame and browser bars (see KINDS / BARS).
const DEVICE_GROUPS = [
  {
    label: 'Phones',
    devices: [
      { id: 'galaxy-fold',   label: 'Galaxy Z Fold (folded)', width: 344,  height: 882,  kind: 'android-phone' },
      { id: 'galaxy-s24',    label: 'Galaxy S24',             width: 360,  height: 780,  kind: 'android-phone' },
      { id: 'iphone-se',     label: 'iPhone SE',              width: 375,  height: 667,  kind: 'ios-phone-se' },
      { id: 'iphone-16',     label: 'iPhone 16',              width: 393,  height: 852,  kind: 'ios-phone' },
      { id: 'iphone-16-pro', label: 'iPhone 16 Pro',          width: 402,  height: 874,  kind: 'ios-phone' },
      { id: 'pixel-8',       label: 'Pixel 8',                width: 412,  height: 915,  kind: 'android-phone' },
      { id: 'iphone-16-pm',  label: 'iPhone 16 Pro Max',      width: 440,  height: 956,  kind: 'ios-phone' },
    ],
  },
  {
    label: 'Tablets',
    devices: [
      { id: 'ipad-mini',     label: 'iPad mini',              width: 744,  height: 1133, kind: 'ios-tablet' },
      { id: 'android-tab',   label: 'Android tablet',         width: 800,  height: 1280, kind: 'android-tablet' },
      { id: 'ipad',          label: 'iPad / iPad Air 11″',    width: 820,  height: 1180, kind: 'ios-tablet' },
      { id: 'ipad-pro-11',   label: 'iPad Pro 11″',           width: 834,  height: 1210, kind: 'ios-tablet' },
      { id: 'ipad-pro-13',   label: 'iPad Pro 13″',           width: 1032, height: 1376, kind: 'ios-tablet' },
    ],
  },
  {
    label: 'Laptops & desktops',
    devices: [
      { id: 'laptop-hd',     label: 'Laptop HD',              width: 1366, height: 768,  kind: 'win' },
      { id: 'macbook-air',   label: 'MacBook Air 13″',        width: 1470, height: 956,  kind: 'mac' },
      { id: 'laptop',        label: 'Laptop (most common)',   width: 1536, height: 864,  kind: 'win' },
      { id: 'macbook-pro',   label: 'MacBook Pro 16″',        width: 1728, height: 1117, kind: 'mac' },
      { id: 'desktop',       label: 'Desktop Full HD',        width: 1920, height: 1080, kind: 'win' },
      { id: 'desktop-qhd',   label: 'Desktop QHD',            width: 2560, height: 1440, kind: 'win' },
    ],
  },
];

const ALL_DEVICES = DEVICE_GROUPS.flatMap(g => g.devices);

// Device frame (bezel) per kind, in device px. bezel = [top, right, bottom, left] in portrait.
const KINDS = {
  'ios-phone':      { type: 'phone',   bezel: [12, 12, 12, 12], radius: 58, screenRadius: 47, notch: 'island' },
  'ios-phone-se':   { type: 'phone',   bezel: [66, 14, 66, 14], radius: 46, screenRadius: 0,  notch: 'none', homeButton: true },
  'android-phone':  { type: 'phone',   bezel: [10, 10, 10, 10], radius: 44, screenRadius: 34, notch: 'punch' },
  'ios-tablet':     { type: 'tablet',  bezel: [20, 20, 20, 20], radius: 38, screenRadius: 18, notch: 'none' },
  'android-tablet': { type: 'tablet',  bezel: [22, 22, 22, 22], radius: 30, screenRadius: 12, notch: 'none' },
  'mac':            { type: 'desktop', bezel: [18, 14, 26, 14], radius: 16, screenRadius: 8,  notch: 'none' },
  'win':            { type: 'desktop', bezel: [14, 14, 30, 14], radius: 10, screenRadius: 2,  notch: 'none' },
};
const DEFAULT_KIND = { phone: 'android-phone', tablet: 'android-tablet', desktop: 'win' };

// Approximate browser + OS bars in CSS px (status bar, address bar, toolbars, home indicator,
// taskbar). With them on, the frame's page area is the real visible viewport: its bottom edge
// is the actual fold. `land` overrides for landscape phones.
const BARS = {
  'ios-phone':      { top: [['status', 54]], bottom: [['address', 56], ['toolbar', 49], ['home', 34]],
                      land: { top: [['address', 50]], bottom: [['home', 21]] } },
  'ios-phone-se':   { top: [['status', 20], ['address', 50]], bottom: [['toolbar', 44]],
                      land: { top: [['address', 50]], bottom: [] } },
  'android-phone':  { top: [['status', 32], ['address', 56]], bottom: [['gesture', 24]],
                      land: { top: [['address', 56]], bottom: [] } },
  'ios-tablet':     { top: [['status', 24], ['address', 50]], bottom: [['home', 20]] },
  'android-tablet': { top: [['status', 24], ['tabs', 40], ['address', 56]], bottom: [['navbar', 48]] },
  'mac':            { top: [['menubar', 37], ['tabs', 40], ['address', 47]], bottom: [] },
  'win':            { top: [['tabs', 40], ['address', 45]], bottom: [['taskbar', 48]] },
};

const BG_OPTIONS = [
  { key: 'dots',  label: 'Dots'  },
  { key: 'grid',  label: 'Grid'  },
  { key: 'dark',  label: 'Dark'  },
  { key: 'light', label: 'Light' },
];

const ZOOM_PRESETS = [25, 50, 75, 100];

const MULTI_DEFAULT = ['iphone-16', 'ipad', 'laptop'];
const BREAKPOINTS   = [375, 768, 1024, 1280, 1440];
const TW_NAMES      = [[1536, '2xl'], [1280, 'xl'], [1024, 'lg'], [768, 'md'], [640, 'sm'], [0, 'base']];
const MIN_SIZE = 200;
const MAX_SIZE = 3840;
const LOAD_TIMEOUT_MS = 12000;
const MULTI_GAP = 24;
const CAPTION_H = 30;
const RULER_H = 28;
const SWEEP_FROM = 320;
const SWEEP_TO = 1920;
const SWEEP_PX_PER_SEC = 220;
const MAX_RECENT = 8;
const EXAMPLES = ['example.com', 'wikipedia.org', 'webdevpuneet.com'];
const LS_RECENT = 'rpt:recent';
const LS_SIZES  = 'rpt:sizes';
const LS_HTML   = 'rpt:html'; // raw string; UI Snippets writes it too ("Test in Responsive Preview")

const clampSize = (n) => Math.max(MIN_SIZE, Math.min(MAX_SIZE, n));
const twName = (w) => TW_NAMES.find(([min]) => w >= min)[1];
const normalizeUrl = (u) => (/^https?:\/\//i.test(u) ? u : 'https://' + u);
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u || ''; } };
const sum = (bars) => bars.reduce((s, [, h]) => s + h, 0);

const lsGet = (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const lsGetRaw = (k) => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
const lsSetRaw = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

// Custom sizes have no device behind them, so guess the device type from the shape.
function inferType(w, h) {
  if (Math.min(w, h) < 600) return 'phone';
  if (w > h && Math.max(w, h) >= 1200) return 'desktop';
  return 'tablet';
}

function bezelFor(kind, landscape) {
  const [t, r, b, l] = KINDS[kind].bezel;
  // Turning the device clockwise moves the left bezel to the top
  return landscape && KINDS[kind].type !== 'desktop' ? [l, t, r, b] : [t, r, b, l];
}

function barsFor(kind, landscape) {
  const spec = BARS[kind];
  return landscape && spec.land ? spec.land : spec;
}

// Helper injected into pasted HTML. The frame is sandboxed WITHOUT allow-same-origin, so pasted
// code can't touch this site's storage; everything goes through postMessage instead.
//  - scroll: reports scroll position for synced scrolling, and follows scrollTo
//  - overflow finder: outlines elements wider than the viewport that make the page scroll sideways
//  - colour scheme: forces prefers-color-scheme light/dark by rewriting those media queries
const HELPER_SCRIPT = `<script data-rpt-helper>(function(){
  var P = function(m){ m.__rpt = 1; try { parent.postMessage(m, '*'); } catch (e) {} };
  var ignoreUntil = 0, ovOn = false, marked = [], scheme = 'auto', timer = 0, orig = new WeakMap();
  var RE = /\\(\\s*prefers-color-scheme\\s*:\\s*(dark|light)\\s*\\)/gi;
  function se(){ return document.scrollingElement || document.documentElement; }
  addEventListener('scroll', function(){
    if (Date.now() < ignoreUntil) return;
    var el = se(), max = el.scrollHeight - innerHeight;
    P({ type: 'scroll', ratio: max > 0 ? el.scrollTop / max : 0 });
  }, { passive: true });
  function clipped(e){
    for (var p = e.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
      if (getComputedStyle(p).overflowX !== 'visible') return true;
    }
    return false;
  }
  function clearOv(){
    for (var i = 0; i < marked.length; i++) { marked[i].e.style.outline = marked[i].o; marked[i].e.style.outlineOffset = marked[i].oo; }
    marked = [];
  }
  function runOv(){
    clearOv();
    if (!ovOn || !document.body) return;
    var vw = document.documentElement.clientWidth, all = document.body.getElementsByTagName('*'), n = 0;
    for (var i = 0; i < all.length && n < 300; i++) {
      var e = all[i];
      if (e.tagName === 'SCRIPT' || e.tagName === 'STYLE') continue;
      var r = e.getBoundingClientRect();
      if (!r.width && !r.height) continue;
      if ((r.right > vw + 1 || r.left < -1) && !clipped(e)) {
        marked.push({ e: e, o: e.style.outline, oo: e.style.outlineOffset });
        e.style.outline = '2px solid #ef4444'; e.style.outlineOffset = '-2px';
        n++;
      }
    }
    P({ type: 'overflow', count: n, scrollWidth: se().scrollWidth, vw: vw });
  }
  function fix(text){
    if (scheme === 'auto') return text;
    return text.replace(RE, function(m, v){ return v.toLowerCase() === scheme ? '(min-width: 0px)' : '(max-width: 0px)'; });
  }
  function walk(rules){
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.media && r.cssRules) {
        var t = orig.get(r);
        if (t === undefined) { t = r.media.mediaText; orig.set(r, t); }
        if (/prefers-color-scheme/i.test(t)) r.media.mediaText = fix(t);
      }
      if (r.cssRules) walk(r.cssRules);
    }
  }
  function applyScheme(){
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; i++) {
      var n = ss[i].ownerNode;
      if (n && n.hasAttribute && n.hasAttribute('media')) {
        var m = orig.get(n);
        if (m === undefined) { m = n.getAttribute('media'); orig.set(n, m); }
        if (/prefers-color-scheme/i.test(m)) n.setAttribute('media', fix(m));
      }
      try { walk(ss[i].cssRules); } catch (e) {}
    }
    document.documentElement.style.colorScheme = scheme === 'auto' ? '' : scheme;
  }
  addEventListener('message', function(e){
    var d = e.data;
    if (!d || d.__rpt !== 1) return;
    if (d.type === 'scrollTo') {
      ignoreUntil = Date.now() + 150;
      var el = se();
      el.scrollTop = d.ratio * (el.scrollHeight - innerHeight);
    } else if (d.type === 'state') {
      ovOn = !!d.overflow; scheme = d.scheme || 'auto';
      applyScheme(); runOv();
    }
  });
  addEventListener('resize', function(){ clearTimeout(timer); timer = setTimeout(runOv, 150); });
  addEventListener('load', function(){ applyScheme(); runOv(); });
  P({ type: 'ready' });
})();</script>`;

const injectHelper = (html) => (/<\/body>/i.test(html)
  ? html.replace(/<\/body>(?![\s\S]*<\/body>)/i, HELPER_SCRIPT + '</body>')
  : html + HELPER_SCRIPT);

function Ruler({ width, scale }) {
  let lastLeft = -Infinity;
  const endLabelStart = width * scale - 96; // room for the "393px · base" badge on the right
  const ticks = BREAKPOINTS.filter(b => b <= width).map(b => {
    const left = b * scale;
    const showLabel = left - lastLeft >= 30 && left < endLabelStart;
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

// Toolbar dropdown. Fixed-positioned so the horizontally scrolling header can't clip it.
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
    // Buttons on the right half open leftwards (menu's right edge under the button's right edge),
    // so menus stay clear of the window edge and the floating share bar.
    const preferred = r.left + r.width / 2 > window.innerWidth / 2 ? r.right - width : r.left;
    setPos({ top: r.bottom + 6, left: Math.max(8, Math.min(preferred, window.innerWidth - width - 8)) });
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

function MenuItem({ children, sub, meta, checked, disabled, onClick, onRemove }) {
  return (
    <button role={checked === undefined ? 'menuitem' : 'menuitemcheckbox'} aria-checked={checked} disabled={disabled}
      className={`${styles.menuItem} ${checked ? styles.menuItemOn : ''}`} onClick={onClick}>
      <span className={styles.menuCheck}>{checked ? '✓' : ''}</span>
      <span className={styles.menuText}>
        <span className={styles.menuTitle}>{children}</span>
        {sub && <span className={styles.menuSub}>{sub}</span>}
      </span>
      {meta && <span className={styles.menuMeta}>{meta}</span>}
      {onRemove && (
        <span role="button" tabIndex={0} className={styles.menuRemove} title="Remove" aria-label="Remove"
          onClick={e => { e.stopPropagation(); onRemove(); }}
          onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); onRemove(); } }}>✕</span>
      )}
    </button>
  );
}

const Icon = {
  signal:  <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>,
  wifi:    <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M8 12 5.6 9.2a3.4 3.4 0 0 1 4.8 0z"/><path d="M8 4.2c2 0 3.9.8 5.3 2.1l-1.5 1.7A5.6 5.6 0 0 0 8 6.5 5.6 5.6 0 0 0 4.2 8L2.7 6.3A7.8 7.8 0 0 1 8 4.2z"/><path d="M8 0c3.1 0 6 1.2 8 3.2l-1.5 1.7A9.2 9.2 0 0 0 8 2.3a9.2 9.2 0 0 0-6.5 2.6L0 3.2A11.5 11.5 0 0 1 8 0z"/></svg>,
  battery: <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true"><rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.4"/><rect x="2" y="2" width="17" height="8" rx="1.6"/><rect x="23.5" y="4" width="2" height="4" rx="1" opacity="0.4"/></svg>,
  lock:    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  link:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>,
  rotate:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="9" width="9" height="13" rx="1.5"/><line x1="7" y1="19" x2="8" y2="19"/><path d="M11 3h4a5 5 0 0 1 5 5v4"/><polyline points="17 9.5 20 12.5 23 9.5"/></svg>,
  sweep:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="7 8 3 12 7 16"/><polyline points="17 8 21 12 17 16"/><line x1="3" y1="12" x2="21" y2="12"/></svg>,
  stop:    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor"/></svg>,
};

// Simulated browser / OS chrome, drawn at device px and scaled with the frame
function Bar({ type, h, kind, host }) {
  const st = { height: h + 'px' };
  const ios = kind.startsWith('ios');
  switch (type) {
    case 'status':
      return (
        <div className={`${styles.bar} ${styles.barStatus} ${kind === 'ios-phone' ? styles.barStatusIsland : ''}`} style={st}>
          <span className={styles.barTime}>9:41</span>
          <span className={styles.barIcons}>{Icon.signal}{Icon.wifi}{Icon.battery}</span>
        </div>
      );
    case 'address':
      return (
        <div className={`${styles.bar} ${styles.barAddress} ${ios ? styles.barAddressIos : ''}`} style={st}>
          {KINDS[kind].type === 'desktop' && <span className={styles.barNav}>‹ › ↻</span>}
          <span className={styles.barPill}>{Icon.lock}<span className={styles.barHost}>{host || 'example.com'}</span></span>
        </div>
      );
    case 'toolbar':
      return <div className={`${styles.bar} ${styles.barToolbar}`} style={st}><span>‹</span><span>›</span><span>⇧</span><span>▢</span><span>⧉</span></div>;
    case 'home':
      return <div className={`${styles.bar} ${styles.barHome}`} style={st}><i /></div>;
    case 'gesture':
      return <div className={`${styles.bar} ${styles.barGesture}`} style={st}><i /></div>;
    case 'tabs':
      return <div className={`${styles.bar} ${styles.barTabs}`} style={st}><span className={styles.barTab}>{host || 'New tab'}</span></div>;
    case 'menubar':
      return <div className={`${styles.bar} ${styles.barMenubar}`} style={st}><span><b>Browser</b>  File  Edit  View  History</span><span>9:41</span></div>;
    case 'navbar':
      return <div className={`${styles.bar} ${styles.barNavbar}`} style={st}><span>◁</span><span>○</span><span>▢</span></div>;
    case 'taskbar':
      return <div className={`${styles.bar} ${styles.barTaskbar}`} style={st}><span className={styles.barApps}><i /><i /><i /><i /><i /></span><span className={styles.barClock}>9:41</span></div>;
    default:
      return null;
  }
}

function ResponsivePreviewInner() {
  const [srcMode, setSrcMode]       = useState('url'); // 'url' | 'html'
  const [url, setUrl]               = useState('');
  const [loadedUrl, setLoadedUrl]   = useState('');
  const [url2, setUrl2]             = useState('');
  const [loadedUrl2, setLoadedUrl2] = useState('');
  const [htmlDoc, setHtmlDoc]       = useState('');
  const [device, setDevice]         = useState(ALL_DEVICES.find(d => d.id === 'iphone-16'));
  const [flipped, setFlipped]       = useState(false);
  const [zoom, setZoom]             = useState(50);
  const [autoFit, setAutoFit]       = useState(true);
  const [canvasBg, setCanvasBg]     = useState('dots');
  const [status, setStatus]         = useState({}); // frame source key → 'loading' | 'ok' | 'error'
  const [customW, setCustomW]       = useState('');
  const [customH, setCustomH]       = useState('');
  const [useCustom, setUseCustom]   = useState(false);
  const [reloadKey, setReloadKey]   = useState(0);
  const [multi, setMulti]           = useState(false);
  const [multiIds, setMultiIds]     = useState(MULTI_DEFAULT);
  const [compare, setCompare]       = useState(false);
  const [showRuler, setShowRuler]   = useState(true);
  const [frameOn, setFrameOn]       = useState(false);
  const [barsOn, setBarsOn]         = useState(false);
  const [overflowOn, setOverflowOn] = useState(false);
  const [syncScroll, setSyncScroll] = useState(true);
  const [scheme, setScheme]         = useState('auto');
  const [overflow, setOverflow]     = useState({}); // frame id → { count, scrollWidth, vw }
  const [dragging, setDragging]     = useState(false);
  const [sweeping, setSweeping]     = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [isFs, setIsFs]             = useState(false);
  const [shotBusy, setShotBusy]     = useState(false);
  const [flash, setFlash]           = useState('');
  const [recent, setRecent]         = useState([]);
  const [recentPos, setRecentPos]   = useState(null);
  const [savedSizes, setSavedSizes] = useState([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft]           = useState('');
  const [dropping, setDropping]     = useState(false);
  const canvasRef    = useRef(null);
  const shotRef      = useRef(null);
  const dragRef      = useRef(null);
  const sweepRef     = useRef(null);
  const urlWrapRef   = useRef(null);
  const frameEls     = useRef({});
  const liveRef      = useRef({});
  const flashTimer   = useRef(0);
  const router       = useRouter();
  const searchParams = useSearchParams();

  const isHtml = srcMode === 'html';
  const comparing = compare && !isHtml;
  const hasSource = isHtml ? !!htmlDoc : !!loadedUrl;
  const srcdoc = useMemo(() => (htmlDoc ? injectHelper(htmlDoc) : ''), [htmlDoc]);

  const baseW = useCustom && customW ? parseInt(customW) || device.width  : (flipped ? device.height : device.width);
  const baseH = useCustom && customH ? parseInt(customH) || device.height : (flipped ? device.width  : device.height);
  const scale = zoom / 100;

  // Custom sizes keep the last preset's look when it is the same device type
  const customKind = (w, h) => {
    const type = inferType(w, h);
    return KINDS[device.kind].type === type ? device.kind : DEFAULT_KIND[type];
  };
  const singleKind = useCustom ? customKind(baseW, baseH) : device.kind;

  const frames = (() => {
    if (multi) {
      return ALL_DEVICES.filter(d => multiIds.includes(d.id)).map(d => ({
        id: d.id, label: `${d.label} · ${flipped ? d.height : d.width}×${flipped ? d.width : d.height}`,
        w: flipped ? d.height : d.width, h: flipped ? d.width : d.height, kind: d.kind,
        sk: isHtml ? 'H' : 'A', src: loadedUrl,
      }));
    }
    if (comparing) {
      return [
        { id: 'A', label: `A · ${hostOf(loadedUrl) || 'first URL'}`,  w: baseW, h: baseH, kind: singleKind, sk: 'A', src: loadedUrl },
        { id: 'B', label: `B · ${hostOf(loadedUrl2) || 'second URL'}`, w: baseW, h: baseH, kind: singleKind, sk: 'B', src: loadedUrl2 },
      ];
    }
    return [{ id: 'single', label: '', w: baseW, h: baseH, kind: singleKind, sk: isHtml ? 'H' : 'A', src: loadedUrl }];
  })();
  const framesKey = frames.map(f => `${f.id}:${f.w}x${f.h}:${f.kind}`).join(',');
  const showCaptions = frames.length > 1 || (isHtml && overflowOn);

  // Outer size of a frame in device px (screen + bezel)
  const outerOf = (f, withFrame = frameOn) => {
    const [t, r, b, l] = withFrame ? bezelFor(f.kind, f.w > f.h) : [0, 0, 0, 0];
    return { w: f.w + l + r, h: f.h + t + b };
  };

  const setSk = (sk, v) => setStatus(s => (s[sk] === v ? s : { ...s, [sk]: v }));
  const flashMsg = (m) => { setFlash(m); clearTimeout(flashTimer.current); flashTimer.current = setTimeout(() => setFlash(''), 4000); };

  // Restore preferences and the shared setup on mount
  useEffect(() => {
    setRecent(lsGet(LS_RECENT, []));
    setSavedSizes(lsGet(LS_SIZES, []));
    const p = searchParams;

    const w = parseInt(p.get('w')), h = parseInt(p.get('h'));
    const d = ALL_DEVICES.find(x => x.id === p.get('d'));
    if (w > 0 && h > 0) { setUseCustom(true); setCustomW(String(clampSize(w))); setCustomH(String(clampSize(h))); }
    else if (d) setDevice(d);
    if (p.get('r') === '1') setFlipped(true);
    const z = parseInt(p.get('z'));
    if (z >= 5 && z <= 100) { setZoom(z); setAutoFit(false); }
    if (BG_OPTIONS.some(b => b.key === p.get('bg'))) setCanvasBg(p.get('bg'));
    if (p.get('frame') === '1') setFrameOn(true);
    if (p.get('ui') === '1') setBarsOn(true);
    if (p.get('m')) {
      const ids = p.get('m').split(',').filter(id => ALL_DEVICES.some(x => x.id === id));
      if (ids.length) { setMulti(true); setMultiIds(ids); }
    }

    if (p.get('mode') === 'html') {
      const doc = lsGetRaw(LS_HTML);
      setSrcMode('html');
      if (doc) { setHtmlDoc(doc); setSk('H', 'loading'); }
      else { setDraft(''); setEditorOpen(true); }
      return;
    }
    const linkParam = p.get('link');
    if (linkParam) {
      const finalUrl = normalizeUrl(linkParam);
      setUrl(finalUrl); setLoadedUrl(finalUrl); setSk('A', 'loading');
    }
    if (p.get('cmp') === '1') {
      setCompare(true); setMulti(false);
      const l2 = p.get('link2');
      if (l2) { const u2 = normalizeUrl(l2); setUrl2(u2); setLoadedUrl2(u2); setSk('B', 'loading'); }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the shareable URL in sync with the whole preview state
  useEffect(() => {
    if (!hasSource && !(isHtml && editorOpen)) return;
    const t = setTimeout(() => {
      const p = new URLSearchParams();
      if (isHtml) p.set('mode', 'html');
      else p.set('link', loadedUrl);
      if (comparing) { p.set('cmp', '1'); if (loadedUrl2) p.set('link2', loadedUrl2); }
      if (multi) p.set('m', multiIds.join(','));
      else if (useCustom && customW && customH) { p.set('w', customW); p.set('h', customH); }
      else p.set('d', device.id);
      if (flipped && !useCustom) p.set('r', '1');
      if (!autoFit) p.set('z', String(zoom));
      if (canvasBg !== 'dots') p.set('bg', canvasBg);
      if (frameOn) p.set('frame', '1');
      if (barsOn) p.set('ui', '1');
      router.replace('?' + p.toString(), { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [hasSource, isHtml, editorOpen, loadedUrl, comparing, loadedUrl2, multi, multiIds, useCustom, customW, customH, device, flipped, autoFit, zoom, canvasBg, frameOn, barsOn]); // eslint-disable-line react-hooks/exhaustive-deps

  // Zoom that fits a set of frames (with bezels, captions and ruler) into the canvas
  const computeFit = (list) => {
    if (!canvasRef.current) return zoom;
    const { clientWidth: cw, clientHeight: ch } = canvasRef.current;
    const padding = 56;
    const dims = list.map(f => outerOf(f));
    const sumW = dims.reduce((s, d) => s + d.w, 0);
    const maxH = Math.max(...dims.map(d => d.h));
    const gaps = MULTI_GAP * (list.length - 1);
    const extraH = (list.length > 1 || (isHtml && overflowOn) ? CAPTION_H : 0) + (list.length === 1 && showRuler ? RULER_H : 0);
    const fitW = Math.floor(((cw - padding - gaps) / sumW) * 100);
    const fitH = Math.floor(((ch - padding - extraH) / maxH) * 100);
    return Math.max(5, Math.min(fitW, fitH, 100));
  };

  const fitKey = `${framesKey}|${frameOn}|${showRuler}|${isHtml && overflowOn}`;
  const fitZoom = useCallback(() => setZoom(computeFit(frames)), [fitKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (autoFit && !sweeping) fitZoom(); }, [autoFit, fitZoom, sweeping]);

  // Re-fit whenever the canvas changes size: window resize, fullscreen, compare / hint bars
  useEffect(() => {
    const el = canvasRef.current;
    if (!autoFit || !el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => fitZoom());
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoFit, fitZoom]);

  // Blocked sites report "loaded" in most browsers, so also time out loads that never finish
  useEffect(() => {
    const pending = Object.keys(status).filter(k => status[k] === 'loading' && k !== 'H');
    if (!pending.length) return;
    const t = setTimeout(() => setStatus(s => {
      const n = { ...s };
      pending.forEach(k => { if (n[k] === 'loading') n[k] = 'error'; });
      return n;
    }), LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [status]);

  // ── Sources ──
  const addRecent = (u) => setRecent(list => {
    const next = [u, ...list.filter(x => x !== u)].slice(0, MAX_RECENT);
    lsSet(LS_RECENT, next);
    return next;
  });
  const removeRecent = (u) => setRecent(list => { const next = list.filter(x => x !== u); lsSet(LS_RECENT, next); return next; });

  const openUrl = (raw) => {
    if (!raw.trim()) return;
    const finalUrl = normalizeUrl(raw.trim());
    setSrcMode('url');
    setUrl(finalUrl);
    setHintDismissed(false);
    setSk('A', 'loading');
    if (finalUrl === loadedUrl) setReloadKey(k => k + 1);
    setLoadedUrl(finalUrl);
    addRecent(finalUrl);
    setRecentPos(null);
  };
  const loadUrl = () => openUrl(url);

  const openUrl2 = (raw) => {
    if (!raw.trim()) return;
    const finalUrl = normalizeUrl(raw.trim());
    setUrl2(finalUrl);
    setSk('B', 'loading');
    if (finalUrl === loadedUrl2) setReloadKey(k => k + 1);
    setLoadedUrl2(finalUrl);
    addRecent(finalUrl);
  };

  const swapCompare = () => {
    setUrl(url2); setUrl2(url);
    setLoadedUrl(loadedUrl2); setLoadedUrl2(loadedUrl);
    setStatus(s => ({ ...s, A: s.B, B: s.A }));
  };

  const applyHtml = (doc) => {
    if (!doc.trim()) return;
    setHtmlDoc(doc);
    lsSetRaw(LS_HTML, doc);
    setSrcMode('html');
    setCompare(false);
    setOverflow({});
    setSk('H', 'loading');
    setEditorOpen(false);
  };
  const openEditor = () => { setDraft(htmlDoc); setEditorOpen(true); };
  const switchMode = (m) => {
    if (m === 'html' && !htmlDoc) { openEditor(); return; }
    setSrcMode(m);
    setOverflow({});
  };
  const readHtmlFile = async (file) => {
    if (!file) return;
    if (!/\.html?$/i.test(file.name) && file.type !== 'text/html') { flashMsg('Drop an .html file'); return; }
    applyHtml(await file.text());
  };

  const reload = () => {
    setStatus(s => {
      const n = { ...s };
      frames.forEach(f => { if (isHtml || f.src) n[f.sk] = 'loading'; });
      return n;
    });
    setReloadKey(k => k + 1);
  };

  const openInNewTab = () => {
    if (isHtml) {
      const u = URL.createObjectURL(new Blob([htmlDoc], { type: 'text/html' }));
      window.open(u, '_blank');
      setTimeout(() => URL.revokeObjectURL(u), 60000);
    } else if (loadedUrl) window.open(loadedUrl, '_blank', 'noopener');
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); flashMsg('Link copied — it opens this exact setup'); }
    catch { flashMsg('Copy failed — copy the address bar instead'); }
  };

  // ── Sizes ──
  const stopSweep = () => {
    if (sweepRef.current) cancelAnimationFrame(sweepRef.current);
    sweepRef.current = null;
    setSweeping(false);
  };
  useEffect(() => () => { if (sweepRef.current) cancelAnimationFrame(sweepRef.current); }, []);

  const selectDevice = (d) => { stopSweep(); setDevice(d); setUseCustom(false); setFlipped(false); };
  const setManualZoom = (z) => { setAutoFit(false); setZoom(Math.max(5, Math.min(100, z))); };

  const flip = () => {
    if (useCustom) { const w = customW, h = customH; setCustomW(h); setCustomH(w); }
    else setFlipped(f => !f);
  };

  const toggleMulti = () => { stopSweep(); setMulti(m => !m); setCompare(false); setAutoFit(true); };
  const toggleCompare = () => { stopSweep(); setCompare(c => !c); setMulti(false); setAutoFit(true); };
  const toggleMultiId = (id) => setMultiIds(ids =>
    ids.includes(id) ? (ids.length > 1 ? ids.filter(x => x !== id) : ids) : [...ids, id]);

  const savedMatch = useCustom ? savedSizes.find(s => String(s.width) === customW && String(s.height) === customH) : null;
  const saveCurrentSize = () => {
    const name = window.prompt('Name this size', `${baseW}×${baseH}`);
    if (!name || !name.trim()) return;
    const next = [...savedSizes.filter(s => !(s.width === baseW && s.height === baseH)), { id: 'u' + Date.now(), label: name.trim().slice(0, 40), width: baseW, height: baseH }];
    setSavedSizes(next); lsSet(LS_SIZES, next);
  };
  const removeSize = (id) => { const next = savedSizes.filter(s => s.id !== id); setSavedSizes(next); lsSet(LS_SIZES, next); };
  const useSize = (s) => { stopSweep(); setCustomW(String(s.width)); setCustomH(String(s.height)); setUseCustom(true); };

  // Width sweep: animate the frame from 320px to 1920px to spot where the layout jumps
  const toggleSweep = () => {
    if (sweeping) { stopSweep(); return; }
    const h = baseH;
    setUseCustom(true); setCustomH(String(h)); setCustomW(String(SWEEP_FROM));
    setAutoFit(false);
    setZoom(computeFit(frames.map(f => ({ ...f, w: SWEEP_TO, h, kind: customKind(SWEEP_TO, h) }))));
    setSweeping(true);
    const t0 = performance.now();
    const tick = (now) => {
      const w = Math.min(SWEEP_TO, Math.round(SWEEP_FROM + ((now - t0) / 1000) * SWEEP_PX_PER_SEC));
      setCustomW(String(w));
      if (w >= SWEEP_TO) { sweepRef.current = null; setSweeping(false); return; }
      sweepRef.current = requestAnimationFrame(tick);
    };
    sweepRef.current = requestAnimationFrame(tick);
  };

  const isLandscape = baseW > baseH;

  // ── Pasted-HTML helpers (postMessage bridge to the injected script) ──
  liveRef.current = { overflowOn, scheme, syncScroll };
  const sendState = (el) => {
    const { overflowOn: o, scheme: s } = liveRef.current;
    try { el.contentWindow?.postMessage({ __rpt: 1, type: 'state', overflow: o, scheme: s }, '*'); } catch {}
  };
  useEffect(() => {
    if (!isHtml) return;
    if (!overflowOn) setOverflow({});
    Object.values(frameEls.current).forEach(sendState);
  }, [overflowOn, scheme, isHtml]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || d.__rpt !== 1) return;
      const entry = Object.entries(frameEls.current).find(([, el]) => el.contentWindow === e.source);
      if (!entry) return;
      const [id, el] = entry;
      if (d.type === 'ready') sendState(el);
      else if (d.type === 'scroll' && liveRef.current.syncScroll) {
        Object.entries(frameEls.current).forEach(([oid, other]) => {
          if (oid !== id) try { other.contentWindow?.postMessage({ __rpt: 1, type: 'scrollTo', ratio: d.ratio }, '*'); } catch {}
        });
      } else if (d.type === 'overflow') {
        setOverflow(o => ({ ...o, [id]: { count: d.count, scrollWidth: d.scrollWidth, vw: d.vw } }));
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // A file dragged over the window shows a drop zone above the frames (iframes swallow drag events)
  // Files dropped outside the drop zone are ignored instead of the browser navigating to them.
  useEffect(() => {
    const isFile = (e) => e.dataTransfer?.types?.includes('Files');
    const onEnter = (e) => { if (isFile(e)) setDropping(true); };
    const onOver  = (e) => { if (isFile(e)) e.preventDefault(); };
    const onDrop  = (e) => { if (isFile(e)) { e.preventDefault(); setDropping(false); } };
    window.addEventListener('dragenter', onEnter);
    window.addEventListener('dragover', onOver);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragenter', onEnter);
      window.removeEventListener('dragover', onOver);
      window.removeEventListener('drop', onDrop);
    };
  }, []);

  // Keyboard shortcuts: R rotate, F fit, M multi-device, S sweep, + / − zoom
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || editorOpen) return;
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === 'r') flip();
      else if (k === 'f') setAutoFit(true);
      else if (k === 'm') toggleMulti();
      else if (k === 's' && !multi && hasSource) toggleSweep();
      else if (k === '+' || k === '=') setManualZoom(zoom + 5);
      else if (k === '-') setManualZoom(zoom - 5);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Drag-to-resize: pointer capture keeps events on the handle even over the iframe
  const startDrag = (axis) => (e) => {
    e.preventDefault();
    stopSweep();
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

  // Screenshot: iframes may be cross-origin, so pixels can't be read directly. Capture this tab
  // with the browser's screen-capture API and crop to the frame. Output is at on-screen
  // (zoomed) size — use 100% zoom for true device pixels.
  const fileStem = isHtml ? 'pasted-html' : hostOf(loadedUrl) || 'page';
  const takeScreenshot = async () => {
    const el = shotRef.current;
    if (!el || !hasSource || shotBusy) return;
    if (!navigator.mediaDevices?.getDisplayMedia) { flashMsg('Screenshots need a desktop Chrome, Edge or Firefox'); return; }
    setShotBusy(true);
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true, preferCurrentTab: true, selfBrowserSurface: 'include' });
      const track = stream.getVideoTracks()[0];
      if (track.getSettings().displaySurface && track.getSettings().displaySurface !== 'browser') {
        flashMsg('Pick "This tab" in the share dialog');
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
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `responsive-${fileStem}-${frames.length > 1 ? (comparing ? 'compare' : 'multi') : baseW + 'x' + baseH}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      flashMsg('Screenshot saved');
    } catch (e) {
      if (e?.name !== 'NotAllowedError') flashMsg('Screenshot failed');
    } finally {
      stream?.getTracks().forEach(tr => tr.stop());
      setShotBusy(false);
    }
  };

  // Full-page (top to bottom) capture: a cross-origin page's height can't be read or scrolled
  // from here, and the site is a static export with no server. Microlink's free screenshot
  // API loads the URL at the frame's width and returns the whole page as one PNG.
  const takeFullPage = async () => {
    if (isHtml || !loadedUrl || shotBusy) return;
    setShotBusy(true);
    flashMsg('Rendering full page… (up to ~20s)');
    try {
      for (const f of frames.filter(x => x.src)) {
        const q = new URLSearchParams({
          url: f.src, screenshot: 'true', meta: 'false', fullPage: 'true', type: 'png',
          'viewport.width': String(f.w), 'viewport.height': String(f.h), 'viewport.deviceScaleFactor': '1',
        });
        const res = await fetch('https://api.microlink.io/?' + q);
        const json = await res.json();
        const shot = json?.data?.screenshot?.url;
        if (json.status !== 'success' || !shot) throw new Error(json?.message || 'failed');
        const name = `fullpage-${hostOf(f.src)}-${f.w}px.png`;
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
      flashMsg('Full-page screenshot saved');
    } catch {
      flashMsg('Full-page capture failed — the site may block bots, or the daily free limit was hit');
    } finally {
      setShotBusy(false);
    }
  };

  // ── Rendering ──
  const renderEmpty = () => (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>⊞</div>
      {isHtml ? (
        <>
          <div className={styles.emptyTitle}>Paste HTML to preview</div>
          <div className={styles.emptySub}>Or drop an .html file anywhere here</div>
          <div className={styles.emptyExamples}><button className={styles.exampleBtn} onClick={openEditor}>Paste HTML</button></div>
        </>
      ) : (
        <>
          <div className={styles.emptyTitle}>Enter a URL to preview</div>
          <div className={styles.emptySub}>Paste any public URL, or drop an .html file here</div>
          <div className={styles.emptyExamples}>
            {EXAMPLES.map(e => (
              <button key={e} className={styles.exampleBtn} onClick={() => openUrl(e)}>{e}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderFrame = (f) => {
    const landscape = f.w > f.h;
    const kind = KINDS[f.kind];
    const [bt, br, bb, bl] = frameOn ? bezelFor(f.kind, landscape) : [0, 0, 0, 0];
    const bars = barsOn ? barsFor(f.kind, landscape) : { top: [], bottom: [] };
    const vpH = Math.max(100, f.h - sum(bars.top) - sum(bars.bottom));
    const outer = outerOf(f);
    const st = status[f.sk];
    const live = isHtml ? !!htmlDoc : !!f.src;
    const host = isHtml ? 'localhost' : hostOf(f.src);

    return (
      <div className={`${styles.frameStage} ${frameOn ? styles.stageFramed : styles.frameWrap}`}
        style={{ width: outer.w * scale + 'px', height: outer.h * scale + 'px' }}>
        <div className={`${styles.device} ${frameOn ? styles.deviceFramed : ''}`}
          style={{
            width: outer.w + 'px', height: outer.h + 'px',
            padding: `${bt}px ${br}px ${bb}px ${bl}px`,
            borderRadius: frameOn ? kind.radius + 'px' : 0,
            transform: `scale(${scale})`,
          }}>
          <div className={styles.screen} style={{ width: f.w + 'px', height: f.h + 'px', borderRadius: frameOn ? kind.screenRadius + 'px' : 0 }}>
            {bars.top.map(([type, h], i) => <Bar key={'t' + i} type={type} h={h} kind={f.kind} host={host} />)}
            <div className={styles.viewport} style={{ height: vpH + 'px' }}>
              {live && (
                <iframe
                  key={`${reloadKey}-${isHtml ? 'html' : f.src}`}
                  ref={el => { if (el) frameEls.current[f.id] = el; else delete frameEls.current[f.id]; }}
                  {...(isHtml ? { srcDoc: srcdoc } : { src: f.src })}
                  title={f.label ? `preview ${f.label}` : 'preview'}
                  className={styles.iframe}
                  style={{
                    width: f.w + 'px', height: vpH + 'px',
                    display: st === 'error' ? 'none' : 'block',
                    pointerEvents: dragging ? 'none' : 'auto',
                  }}
                  onLoad={() => setSk(f.sk, 'ok')}
                  onError={() => setSk(f.sk, 'error')}
                  sandbox={isHtml ? 'allow-scripts allow-forms allow-popups allow-modals' : 'allow-scripts allow-same-origin allow-forms allow-popups'}
                />
              )}
            </div>
            {bars.bottom.map(([type, h], i) => <Bar key={'b' + i} type={type} h={h} kind={f.kind} host={host} />)}
            {frameOn && kind.notch !== 'none' && (
              <span className={`${styles.notch} ${kind.notch === 'island' ? styles.notchIsland : styles.notchPunch} ${landscape ? styles.notchSide : ''}`} />
            )}
          </div>
          {frameOn && kind.homeButton && <span className={`${styles.homeButton} ${landscape ? styles.homeButtonSide : ''}`} />}
        </div>

        {!live && <div className={styles.emptyLayer}>{renderEmpty()}</div>}
        {live && st === 'loading' && !isHtml && (
          <div className={styles.loadingOverlay}><div className={styles.spinner} /></div>
        )}
        {live && st === 'error' && (
          <div className={styles.errorOverlay}>
            <div className={styles.errorIcon}>⚠</div>
            <div className={styles.errorTitle}>Cannot embed this page</div>
            <div className={styles.errorSub}>This site blocks iframe embedding (X-Frame-Options / CSP) or took too long to load.</div>
            <a href={f.src} target="_blank" rel="noopener noreferrer" className={styles.errorLink}>Open in new tab →</a>
          </div>
        )}
      </div>
    );
  };

  const renderCaption = (f) => {
    const ov = overflow[f.id];
    return (
      <div className={styles.frameCaption}>
        {f.label && <span>{f.label}</span>}
        {isHtml && overflowOn && ov && (
          ov.count > 0 || ov.scrollWidth > ov.vw
            ? <span className={`${styles.ovBadge} ${styles.ovBad}`} title="Outlined in red inside the frame">⚠ {ov.count} overflowing{ov.scrollWidth > ov.vw ? ` · page ${ov.scrollWidth}px wide` : ''}</span>
            : <span className={`${styles.ovBadge} ${styles.ovGood}`}>✓ No horizontal overflow</span>
        )}
      </div>
    );
  };

  const mainStatus = status[isHtml ? 'H' : 'A'];
  const deviceLabel = multi ? `⫼ ${multiIds.length} devices`
    : (useCustom ? (savedMatch ? savedMatch.label : 'Custom') : device.label);
  const recentShown = recent.filter(u => !url || url === loadedUrl || u.toLowerCase().includes(url.toLowerCase().replace(/^https?:\/\//, '')));
  const showRecentPos = () => {
    const r = urlWrapRef.current?.getBoundingClientRect();
    if (r) setRecentPos({ top: r.bottom + 4, left: r.left, width: r.width });
  };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="responsive-preview-tool" />
      <PlaygroundTopAd />
      {/* Single header row: source + address bar, then grouped controls */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>⊞</div>
          <span className={styles.headerTitle}>Responsive <span className={styles.headerAccent}>Preview</span></span>
          <div className={styles.sep} />

          <div className={styles.modeSwitch} role="tablist" aria-label="Preview source">
            <button role="tab" aria-selected={!isHtml} className={!isHtml ? styles.modeOn : ''} onClick={() => switchMode('url')}>URL</button>
            <button role="tab" aria-selected={isHtml} className={isHtml ? styles.modeOn : ''} onClick={() => switchMode('html')} title="Paste HTML or open an .html file">HTML</button>
          </div>

          {isHtml ? (
            <button className={styles.htmlChip} onClick={openEditor} title="Edit the pasted HTML">
              {htmlDoc && <span className={`${styles.statusDot} ${styles.statusOk}`} />}
              <span className={styles.htmlChipText}>{htmlDoc ? `Pasted HTML · ${(new Blob([htmlDoc]).size / 1024).toFixed(1)} KB` : 'No HTML yet'}</span>
              <span className={styles.htmlChipEdit}>Edit</span>
            </button>
          ) : (
            <div className={styles.urlInputWrap} ref={urlWrapRef}>
              {loadedUrl && (
                <span className={`${styles.statusDot} ${mainStatus === 'loading' ? styles.statusLoading : mainStatus === 'error' ? styles.statusError : styles.statusOk}`}
                  title={mainStatus === 'loading' ? 'Loading…' : mainStatus === 'error' ? 'Blocked' : 'Loaded'} />
              )}
              <input
                className={styles.urlInput}
                type="url"
                value={url}
                onChange={e => { setUrl(e.target.value); showRecentPos(); }}
                onFocus={showRecentPos}
                onBlur={() => setTimeout(() => setRecentPos(null), 120)}
                placeholder="https://example.com"
                onKeyDown={e => { if (e.key === 'Enter') loadUrl(); if (e.key === 'Escape') setRecentPos(null); }}
              />
              {url && <button className={styles.urlClear} onClick={() => setUrl('')} aria-label="Clear">✕</button>}
            </div>
          )}
          {hasSource && <button className={styles.reloadBtn} onClick={reload} title="Reload">↺</button>}
          {isHtml
            ? <button className={styles.previewBtn} onClick={openEditor}>Edit HTML</button>
            : <button className={styles.previewBtn} onClick={loadUrl}>Preview</button>}
          {hasSource && <button className={styles.openBtn} onClick={openInNewTab} title="Open in new tab">↗</button>}
          {!isHtml && loadedUrl && (
            <button className={styles.openBtn} onClick={copyLink} title="Copy a link to this exact setup" aria-label="Copy link">{Icon.link}</button>
          )}
        </div>

        <div className={styles.sep} />

        {/* Grouped controls — Viewport | Zoom | View, inspect & capture */}
        <div className={styles.toolbar}>
          {/* Viewport */}
          <div className={styles.group}>
            <Menu width={290} title="Device preset, custom size, multi-device or compare" label={deviceLabel}>
              {(close) => (
                <>
                  {!multi && (
                    <MenuItem checked={useCustom && !savedMatch} sub="Type a size, or drag the frame edges"
                      onClick={() => { setCustomW(String(baseW)); setCustomH(String(baseH)); setUseCustom(true); close(); }}>
                      Custom size
                    </MenuItem>
                  )}
                  {!multi && useCustom && !savedMatch && (
                    <MenuItem sub="Keep it in this menu on this browser" onClick={() => { close(); saveCurrentSize(); }}>
                      Save {baseW}×{baseH} as a preset…
                    </MenuItem>
                  )}
                  <MenuItem checked={multi} sub={multi ? 'Tick devices below to add or remove' : 'Several devices side by side (M)'} onClick={toggleMulti}>
                    Multi-device view
                  </MenuItem>
                  <MenuItem checked={comparing} disabled={isHtml}
                    sub={isHtml ? 'Switch to URL mode to compare' : 'Two URLs side by side, e.g. staging vs live'} onClick={toggleCompare}>
                    Compare two URLs
                  </MenuItem>
                  {!multi && savedSizes.length > 0 && (
                    <>
                      <div className={styles.menuDivider} />
                      <div className={styles.menuHeading}>My sizes</div>
                      {savedSizes.map(s => (
                        <MenuItem key={s.id} meta={`${s.width}×${s.height}`} checked={savedMatch?.id === s.id}
                          onClick={() => { useSize(s); close(); }} onRemove={() => removeSize(s.id)}>
                          {s.label}
                        </MenuItem>
                      ))}
                    </>
                  )}
                  <div className={styles.menuDivider} />
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
                </>
              )}
            </Menu>

            {!multi && (
              <div className={styles.sizeInputs} title="Width × height in CSS pixels">
                <input className={styles.customInput} type="number" aria-label="Width" min={MIN_SIZE} max={MAX_SIZE}
                  value={useCustom ? customW : baseW}
                  onChange={e => { stopSweep(); if (!useCustom) { setCustomH(String(baseH)); setUseCustom(true); } setCustomW(e.target.value); }} />
                <span className={styles.customX}>×</span>
                <input className={styles.customInput} type="number" aria-label="Height" min={MIN_SIZE} max={MAX_SIZE}
                  value={useCustom ? customH : baseH}
                  onChange={e => { stopSweep(); if (!useCustom) { setCustomW(String(baseW)); setUseCustom(true); } setCustomH(e.target.value); }} />
              </div>
            )}

            <button className={`${styles.iconBtn} ${isLandscape ? styles.controlBtnActive : ''}`} onClick={flip}
              title={`Rotate (R) — now ${isLandscape ? 'landscape' : 'portrait'}`} aria-label="Rotate">
              {Icon.rotate}
            </button>
            {!multi && (
              <button className={`${styles.iconBtn} ${sweeping ? styles.controlBtnActive : ''}`} onClick={toggleSweep} disabled={!hasSource}
                title={sweeping ? 'Stop the width sweep (S)' : `Sweep the width from ${SWEEP_FROM} to ${SWEEP_TO}px to spot where the layout jumps (S)`}
                aria-label={sweeping ? 'Stop width sweep' : 'Start width sweep'}>
                {sweeping ? Icon.stop : Icon.sweep}
              </button>
            )}
          </div>

          <div className={styles.sep} />

          {/* Zoom */}
          <div className={styles.group}>
            <button className={styles.iconBtn} onClick={() => setManualZoom(zoom - 5)} aria-label="Zoom out" title="Zoom out (−)">−</button>
            <Menu width={170} title="Zoom" label={autoFit ? `Fit · ${zoom}%` : `${zoom}%`}>
              {(close) => (
                <>
                  <MenuItem checked={autoFit} meta="F" onClick={() => { stopSweep(); setAutoFit(true); fitZoom(); close(); }}>Fit to window</MenuItem>
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

          {/* View, inspect & capture */}
          <div className={styles.group}>
            <Menu width={250} title="Device frame, browser bars, background and ruler" label="View">
              {() => (
                <>
                  <MenuItem checked={frameOn} sub="Phone, tablet or monitor bezel, notch and camera" onClick={() => setFrameOn(v => !v)}>Device frame</MenuItem>
                  <MenuItem checked={barsOn} sub="Status, address and toolbars (approx.) — the frame's bottom edge becomes the real fold"
                    onClick={() => setBarsOn(v => !v)}>Browser bars</MenuItem>
                  {frames.length === 1 && (
                    <MenuItem checked={showRuler} sub="375 · 768 · 1024 · 1280 · 1440" onClick={() => setShowRuler(r => !r)}>Breakpoint ruler</MenuItem>
                  )}
                  <div className={styles.menuDivider} />
                  <div className={styles.menuHeading}>Background</div>
                  {BG_OPTIONS.map(b => (
                    <MenuItem key={b.key} checked={canvasBg === b.key} onClick={() => setCanvasBg(b.key)}>
                      <span className={`${styles.swatch} ${styles['swatch_' + b.key]}`} />{b.label}
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>

            <Menu width={260} title="Overflow finder, synced scrolling and light / dark preview" label="Inspect" active={isHtml && (overflowOn || scheme !== 'auto')}>
              {() => (
                <>
                  {!isHtml && <div className={styles.menuNote}>These read inside the page, so they work on pasted HTML (switch to HTML). Websites from other domains can't be inspected from here.</div>}
                  <MenuItem checked={isHtml && overflowOn} disabled={!isHtml}
                    sub="Outlines elements wider than the screen in red" onClick={() => setOverflowOn(v => !v)}>Overflow finder</MenuItem>
                  <MenuItem checked={isHtml && syncScroll} disabled={!isHtml || frames.length < 2}
                    sub="Scroll one frame and the others follow (multi-device)" onClick={() => setSyncScroll(v => !v)}>Sync scrolling</MenuItem>
                  <div className={styles.menuDivider} />
                  <div className={styles.menuHeading}>Colour scheme</div>
                  {[['auto', 'System'], ['light', 'Light'], ['dark', 'Dark']].map(([k, label]) => (
                    <MenuItem key={k} checked={isHtml && scheme === k} disabled={!isHtml} onClick={() => setScheme(k)}
                      sub={k === 'dark' ? 'Forces prefers-color-scheme: dark' : undefined}>{label}</MenuItem>
                  ))}
                </>
              )}
            </Menu>

            <Menu width={250} title="Save a PNG of the preview" disabled={!hasSource || shotBusy}
              label={shotBusy ? '… Capturing' : '⌾ Screenshot'}>
              {(close) => (
                <>
                  <MenuItem sub={<>What you see now, frames included. Pick &ldquo;This tab&rdquo; when asked.</>} onClick={() => { close(); takeScreenshot(); }}>Visible area</MenuItem>
                  <MenuItem disabled={isHtml} sub={isHtml ? 'Needs a public URL' : 'Top to bottom at this width. URL is sent to Microlink.'}
                    onClick={() => { close(); takeFullPage(); }}>Full page</MenuItem>
                </>
              )}
            </Menu>

            <button className={`${styles.iconBtn} ${isFs ? styles.controlBtnActive : ''}`} onClick={toggleFullscreen}
              title={isFs ? 'Exit fullscreen (Esc)' : 'Fullscreen preview'} aria-label="Fullscreen">
              {isFs ? '⤡' : '⛶'}
            </button>
          </div>

          {flash && <span className={styles.shotMsg} role="status">{flash}</span>}
        </div>
      </div>

      {/* Compare: second address bar */}
      {comparing && (
        <div className={styles.compareBar}>
          <span className={styles.compareTag}>A</span>
          <span className={styles.compareHost}>{loadedUrl ? hostOf(loadedUrl) : 'Enter the first URL above'}</span>
          <button className={styles.iconBtn} onClick={swapCompare} title="Swap A and B" aria-label="Swap A and B">⇄</button>
          <span className={styles.compareTag}>B</span>
          <div className={`${styles.urlInputWrap} ${styles.compareInput}`}>
            <input className={styles.urlInput} type="url" value={url2} placeholder="Second URL, e.g. staging.example.com"
              onChange={e => setUrl2(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') openUrl2(url2); }} />
          </div>
          <button className={`${styles.previewBtn} ${styles.previewBtnSm}`} onClick={() => openUrl2(url2)}>Load B</button>
        </div>
      )}

      {/* Blocked-site hint: browsers report blocked frames as "loaded", so this can't be auto-detected */}
      {!isHtml && loadedUrl && mainStatus === 'ok' && !hintDismissed && (
        <div className={styles.hintBar}>
          Frame blank or says &ldquo;refused to connect&rdquo;? That site blocks embedding.
          <a href={loadedUrl} target="_blank" rel="noopener noreferrer" className={styles.hintLink}>Open in new tab →</a>
          <button className={styles.hintClose} onClick={() => setHintDismissed(true)} aria-label="Dismiss">✕</button>
        </div>
      )}

      {/* Canvas */}
      <div ref={canvasRef} className={`${styles.canvas} ${styles['bg_' + canvasBg]}`}>
        {frames.length > 1 ? (
          <div ref={shotRef} className={styles.multiRow} style={{ gap: MULTI_GAP + 'px' }}>
            {frames.map(f => (
              <div key={f.id} className={styles.frameOuter}>
                {renderCaption(f)}
                {renderFrame(f)}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.frameOuter}>
            {showRuler && hasSource && <Ruler width={baseW} scale={scale} />}
            {showCaptions && renderCaption(frames[0])}
            <div ref={shotRef} className={styles.stageWrap}>
              {renderFrame(frames[0])}
              {hasSource && (
                <>
                  <div className={`${styles.handle} ${styles.handleR}`} onPointerDown={startDrag('x')} onPointerMove={onDragMove} onPointerUp={endDrag} onPointerCancel={endDrag} title="Drag to resize width" />
                  <div className={`${styles.handle} ${styles.handleB}`} onPointerDown={startDrag('y')} onPointerMove={onDragMove} onPointerUp={endDrag} onPointerCancel={endDrag} title="Drag to resize height" />
                  <div className={`${styles.handle} ${styles.handleC}`} onPointerDown={startDrag('xy')} onPointerMove={onDragMove} onPointerUp={endDrag} onPointerCancel={endDrag} title="Drag to resize" />
                </>
              )}
            </div>
          </div>
        )}

        {dropping && (
          <div className={styles.dropZone}
            onDragOver={e => e.preventDefault()}
            onDragLeave={() => setDropping(false)}
            onDrop={e => { e.preventDefault(); setDropping(false); readHtmlFile(e.dataTransfer.files?.[0]); }}>
            <div className={styles.dropCard}>Drop an .html file to preview it</div>
          </div>
        )}
      </div>

      {/* Recent URLs */}
      {recentPos && !isHtml && recentShown.length > 0 && (
        <div className={styles.recentMenu} style={{ top: recentPos.top + 'px', left: recentPos.left + 'px', width: Math.max(260, recentPos.width) + 'px' }}
          onMouseDown={e => e.preventDefault()}>
          <div className={styles.menuHeading}>Recent</div>
          {recentShown.map(u => (
            <MenuItem key={u} onClick={() => openUrl(u)} onRemove={() => removeRecent(u)}>{u.replace(/^https?:\/\//, '')}</MenuItem>
          ))}
        </div>
      )}

      {/* Paste HTML */}
      {editorOpen && (
        <div className={styles.modalBack} onMouseDown={e => { if (e.target === e.currentTarget) setEditorOpen(false); }}
          onKeyDown={e => { if (e.key === 'Escape') setEditorOpen(false); }}>
          <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Paste HTML">
            <div className={styles.modalHead}>
              <div>
                <div className={styles.modalTitle}>Paste HTML</div>
                <div className={styles.modalSub}>A full page or a fragment. It stays in your browser and runs in a sandboxed frame.</div>
              </div>
              <button className={styles.hintClose} onClick={() => setEditorOpen(false)} aria-label="Close">✕</button>
            </div>
            <textarea className={styles.modalText} value={draft} onChange={e => setDraft(e.target.value)} spellCheck={false} autoFocus
              placeholder={'<!doctype html>\n<html>\n  <head><style>…</style></head>\n  <body>…</body>\n</html>\n\nYou can also drop an .html file here.'}
              onDragOver={e => e.preventDefault()}
              onDrop={async e => {
                const file = e.dataTransfer.files?.[0];
                if (!file) return;
                e.preventDefault();
                setDraft(await file.text());
              }} />
            <div className={styles.modalFoot}>
              <label className={styles.controlBtn}>
                Open file…
                <input type="file" accept=".html,.htm,text/html" hidden onChange={async e => { const f = e.target.files?.[0]; if (f) setDraft(await f.text()); e.target.value = ''; }} />
              </label>
              <span className={styles.modalSpacer} />
              <button className={styles.controlBtn} onClick={() => setEditorOpen(false)}>Cancel</button>
              <button className={styles.previewBtn} disabled={!draft.trim()} onClick={() => applyHtml(draft)}>Preview</button>
            </div>
          </div>
        </div>
      )}
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
