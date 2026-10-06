'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import UiSnippetsGallery, { LoadMore } from '@/components/UiSnippetsGallery';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import gs from '@/components/UiSnippetsGallery/styles.module.css';
import s from './styles.module.css';
// Never import ./snippets here: it bundles every snippet's source (~33 MB).
// Titles/categories come from the lightweight index; a snippet's own code is
// fetched on demand by loadSnippet (one small chunk per snippet).
import { SNIPPET_INDEX as SNIPPETS, VISIBLE_SNIPPET_INDEX as VISIBLE_SNIPPETS } from '@/lib/snippet-index';
import { publishedTags } from '@/lib/snippet-tags';
import { CATEGORIES } from './categories';
import { loadSnippet as fetchSnippet, getLoadedSnippet } from './loadSnippet';

import { SNIPPET_COUNT } from '@/lib/snippet-count';
import {
  toHtmlFile,
  toReactComponent,
  toTailwindComponent,
  toTailwindHtml,
  toVueSfc,
  toAngularComponent,
  componentName,
  angularSelector,
} from '@/lib/snippet-exporters';
import { navStart } from '@/lib/navStart';
import GistSyncButton from '@/components/GistSyncButton';
import { ADS_ENABLED } from '@/lib/ads-config';
import ExportTester from './ExportTester';
import EmbedModal from './EmbedModal';
import { CategoryStrip } from './RelatedCarousel';
import { dbGetAll, dbPut, dbDelete, dbClear } from '@/lib/uiSnippetsDb';
const SNIPPET_BY_ID = new Map(SNIPPETS.map(sn => [sn.id, sn]));

/* — Gist sync ----------------------------------------------------------------- */
const LS_DELETED     = 'uis_deleted_ids'; // { [id]: isoTimestamp }

function trackDeletion(id) {
  try {
    const map = JSON.parse(localStorage.getItem(LS_DELETED) || '{}');
    map[id] = new Date().toISOString();
    localStorage.setItem(LS_DELETED, JSON.stringify(map));
  } catch {}
}

function getDeletedMap() {
  try { return JSON.parse(localStorage.getItem(LS_DELETED) || '{}'); } catch { return {}; }
}

function pruneDeletedMap(survivingIds) {
  try {
    const map = getDeletedMap();
    survivingIds.forEach(id => delete map[id]);
    localStorage.setItem(LS_DELETED, JSON.stringify(map));
  } catch {}
}
/* — Welcome screen ----------------------------------------------------------- */
const WELCOME_SRCDOC = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  overflow: hidden;
}

.aurora {
  position: fixed; inset: 0; pointer-events: none;
  filter: blur(80px); opacity: 0.4;
}
.orb {
  position: absolute; border-radius: 50%;
  mix-blend-mode: screen;
}
.o1 { width: 400px; height: 400px; background: radial-gradient(circle,#6366f1,transparent 70%); top:-100px;left:-80px; animation: drift 14s ease infinite; }
.o2 { width: 300px; height: 300px; background: radial-gradient(circle,#ec4899,transparent 70%); bottom:-80px;right:-60px; animation: drift 18s ease infinite reverse; }
.o3 { width: 250px; height: 250px; background: radial-gradient(circle,#0ea5e9,transparent 70%); top:40%;left:50%; animation: drift 22s ease infinite; }
@keyframes drift { 0%,100%{transform:translate(0,0)} 33%{transform:translate(40px,-30px)} 66%{transform:translate(-30px,40px)} }

.wrap {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  align-items: center; gap: 28px;
  max-width: 560px; width: 100%; text-align: center;
}

.badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  color: #a78bfa;
  background: rgba(139,92,246,0.12);
  border: 1px solid rgba(139,92,246,0.25);
  padding: 5px 14px; border-radius: 20px;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #a78bfa;
  animation: pulse 2s ease infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

h1 {
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800; color: #f1f5f9;
  line-height: 1.15; letter-spacing: -0.5px;
}
h1 span {
  background: linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sub { font-size: 14px; color: #475569; line-height: 1.7; max-width: 420px; }

.cats {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
}
.cat {
  display: flex; align-items: center; gap: 5px;
  padding: 6px 14px; border-radius: 8px;
  background: #1e293b; border: 1px solid #334155;
  font-size: 12px; font-weight: 600; color: #64748b;
  transition: all 0.15s;
}
.cat:hover { border-color: #6366f1; color: #a78bfa; }
.cat .dot { width: 6px; height: 6px; border-radius: 50%; }

.grid {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; width: 100%;
}
.card {
  background: #1e293b; border: 1px solid #334155;
  border-radius: 10px; padding: 14px 12px;
  text-align: left;
  transition: border-color 0.15s, transform 0.15s;
}
.card:hover { border-color: #6366f1; transform: translateY(-1px); }
.card-icon { font-size: 18px; margin-bottom: 7px; }
.card-name { font-size: 11px; font-weight: 700; color: #94a3b8; }

.hint {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: #334155;
  background: #1e293b; border: 1px solid #334155;
  border-radius: 8px; padding: 10px 16px;
}
.hint svg { flex-shrink: 0; color: #475569; }
</style>
</head>
<body>
<div class="aurora">
  <div class="orb o1"></div>
  <div class="orb o2"></div>
  <div class="orb o3"></div>
</div>
<div class="wrap">
  <div class="badge"><span class="badge-dot"></span>65+ snippets ready to use</div>

  <h1>Copy-paste <span>UI components</span><br>that just work</h1>

  <p class="sub">Navigation, cards, buttons, forms, layouts, and animations — all in plain HTML, CSS, and vanilla JS. Edit live. Copy. Done.</p>

  <div class="cats">
    <div class="cat"><span class="dot" style="background:#f97316"></span>Navigation</div>
    <div class="cat"><span class="dot" style="background:#6366f1"></span>Cards</div>
    <div class="cat"><span class="dot" style="background:#ec4899"></span>Buttons</div>
    <div class="cat"><span class="dot" style="background:#10b981"></span>Forms</div>
    <div class="cat"><span class="dot" style="background:#0ea5e9"></span>Layouts</div>
    <div class="cat"><span class="dot" style="background:#8b5cf6"></span>Animations</div>
  </div>

  <div class="grid">
    <div class="card"><div class="card-icon">⌨️</div><div class="card-name">Command Palette</div></div>
    <div class="card"><div class="card-icon">🎭</div><div class="card-name">3D Card Tilt</div></div>
    <div class="card"><div class="card-icon">🎵</div><div class="card-name">Music Player</div></div>
    <div class="card"><div class="card-icon">🧲</div><div class="card-name">Magnetic Button</div></div>
    <div class="card"><div class="card-icon">🌈</div><div class="card-name">Aurora Background</div></div>
    <div class="card"><div class="card-icon">🔦</div><div class="card-name">Spotlight Effect</div></div>
  </div>

  <div class="hint">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    Select any snippet from the sidebar to preview it here
  </div>
</div>
</body>
</html>`;

/* — srcdoc builder ------------------------------------------------------------ */
const CONSOLE_INTERCEPTOR = `<script>(function(){function _s(l,a){try{window.parent.postMessage({_uisnip:'console',level:l,args:Array.from(a).map(function(x){try{if(x instanceof Error)return x.toString();if(typeof x==='object'&&x!==null)return JSON.stringify(x,null,2);return String(x);}catch(e){return String(x);}})}, '*');}catch(e){}}['log','warn','error','info'].forEach(function(m){var o=console[m];console[m]=function(){o&&o.apply(console,arguments);_s(m,arguments);};});window.addEventListener('error',function(e){_s('error',[e.message+(e.lineno?' (line '+e.lineno+')':'')]);}); window.addEventListener('unhandledrejection',function(e){_s('error',['Uncaught (in promise) '+(e.reason instanceof Error?e.reason.toString():String(e.reason))]);});})();<\/script>`;

function buildSrcdoc(html, css, js, cdnUrls = []) {
  const cdnTags = cdnUrls.filter(u => u.trim()).map(u =>
    /\.css(\?.*)?$/.test(u.trim())
      ? `<link rel="stylesheet" href="${u.trim()}">`
      : `<script src="${u.trim()}"><\/script>`
  ).join('\n');
  const hasBabel = cdnUrls.some(u => /babel/i.test(u));
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${cdnTags}
<style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}${css}</style>
</head>
<body>
${CONSOLE_INTERCEPTOR}
${html}
${js ? `<script${hasBabel ? ' type="text/babel" data-presets="react,env"' : ''}>${js}<\/script>` : ''}
<script>document.addEventListener('click',function(e){var a=e.target.closest('a');if(a&&(a.getAttribute('href')==='#'||a.getAttribute('href')==='javascript:void(0)')){e.preventDefault();}});<\/script>
</body>
</html>`;
}

/* — HTML highlighter ----------------------------------------------------------
   Character-preserving: every input character is emitted exactly once (escaped),
   and whitespace inside tags is kept verbatim. This is essential — the colored
   <pre> sits under the textarea, so if it dropped a self-closing slash or
   collapsed multi-line tag whitespace, the caret would drift out of alignment. */
function highlightHTML(raw) {
  raw = raw || '';
  const e = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let out = ''; let i = 0; const n = raw.length;
  while (i < n) {
    if (raw[i] !== '<') {
      const next = raw.indexOf('<', i);
      const text = next === -1 ? raw.slice(i) : raw.slice(i, next);
      if (text) out += `<span class="hl-text">${e(text)}</span>`;
      i = next === -1 ? n : next; continue;
    }
    // HTML comment — emit verbatim
    if (raw.startsWith('<!--', i)) {
      const end = raw.indexOf('-->', i);
      const seg = end === -1 ? raw.slice(i) : raw.slice(i, end + 3);
      out += `<span class="hl-cm">${e(seg)}</span>`;
      i = end === -1 ? n : end + 3; continue;
    }
    const end = raw.indexOf('>', i);
    if (end === -1) { out += e(raw.slice(i)); break; }
    let p = i + 1;
    out += '<span class="hl-punct">&lt;</span>';
    if (raw[p] === '/') { out += '<span class="hl-slash">/</span>'; p++; }
    // tag name (stops at whitespace, slash, or end)
    let s = p; while (p < end && !/[\s/]/.test(raw[p])) p++;
    if (p > s) out += `<span class="hl-tag">${e(raw.slice(s, p))}</span>`;
    // attribute region — preserve every character verbatim
    while (p < end) {
      const ch = raw[p];
      if (/\s/.test(ch)) { out += e(ch); p++; continue; }          // whitespace incl. newlines
      if (ch === '/')    { out += '<span class="hl-slash">/</span>'; p++; continue; }
      if (/[\w-]/.test(ch)) {                                       // attribute name
        let as = p; while (p < end && /[\w-]/.test(raw[p])) p++;
        out += `<span class="hl-attr">${e(raw.slice(as, p))}</span>`;
        if (raw[p] === '=') {
          out += '<span class="hl-eq">=</span>'; p++;
          const q = raw[p];
          if (q === '"' || q === "'") {
            let vs = p; p++; while (p < end && raw[p] !== q) p++; if (p < end) p++;
            out += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          } else {
            let vs = p; while (p < end && !/[\s>]/.test(raw[p])) p++;
            if (p > vs) out += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          }
        }
        continue;
      }
      out += e(ch); p++;                                            // any other char verbatim
    }
    out += '<span class="hl-punct">&gt;</span>';
    i = end + 1;
  }
  return out;
}

/* — CSS highlighter ----------------------------------------------------------- */
function highlightCSS(raw) {
  raw = raw || '';
  const e = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let out = ''; let i = 0; const n = raw.length; let depth = 0; let afterColon = false;
  while (i < n) {
    const c = raw[i];
    if (c === '\n') { out += '\n'; afterColon = false; i++; continue; }
    if (c === ' ' || c === '\t' || c === '\r') { out += c; i++; continue; }
    if (c === '/' && raw[i+1] === '*') { const end = raw.indexOf('*/', i+2); const cm = end === -1 ? raw.slice(i) : raw.slice(i, end+2); out += `<span class="cp-cm">${e(cm)}</span>`; i = end === -1 ? n : end+2; continue; }
    if (c === '"' || c === "'") { const q = c; let j = i+1; while (j < n && raw[j] !== q) { if (raw[j] === '\\') j++; j++; } out += `<span class="cp-str">${e(raw.slice(i, j+1))}</span>`; i = j+1; continue; }
    if (c === '@') { let j = i+1; while (j < n && /[\w-]/.test(raw[j])) j++; out += `<span class="cp-at">${e(raw.slice(i, j))}</span>`; i = j; continue; }
    if (c === '{') { depth++; afterColon = false; out += `<span class="cp-br">{</span>`; i++; continue; }
    if (c === '}') { depth = Math.max(0, depth-1); afterColon = false; out += `<span class="cp-br">}</span>`; i++; continue; }
    if (depth === 0) { const st = i; while (i < n && raw[i] !== '{' && raw[i] !== '\n') i++; out += `<span class="cp-sel">${e(raw.slice(st, i))}</span>`; continue; }
    if (c === ';') { afterColon = false; out += `<span class="cp-semi">;</span>`; i++; continue; }
    if (!afterColon && c !== ':') { const st = i; while (i < n && raw[i] !== ':' && raw[i] !== ';' && raw[i] !== '}' && raw[i] !== '\n') i++; if (raw[i] === ':') { out += `<span class="cp-prop">${e(raw.slice(st, i))}</span>`; afterColon = true; } else { out += e(raw.slice(st, i)); } continue; }
    if (c === ':') { let j = i; while (j < n && /[:a-zA-Z\-()0-9"']/.test(raw[j]) && raw[j] !== '{' && raw[j] !== '\n') j++; out += `<span class="cp-ps">${e(raw.slice(i, j))}</span>`; i = j; continue; }
    out += e(c); i++;
  }
  return out;
}

/* — JS highlighter ------------------------------------------------------------ */
function highlightJS(raw) {
  raw = raw || '';
  const e = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const KW = new Set(['const','let','var','function','return','if','else','for','while','do','class','import','export','default','new','this','typeof','instanceof','true','false','null','undefined','async','await','try','catch','finally','throw','in','of','break','continue','switch','case','delete','void','yield']);
  let out = ''; let i = 0; const n = raw.length;
  while (i < n) {
    const c = raw[i];
    if (c === '/' && raw[i+1] === '/') { const end = raw.indexOf('\n', i); const seg = end === -1 ? raw.slice(i) : raw.slice(i, end); out += `<span class="js-cm">${e(seg)}</span>`; i = end === -1 ? n : end; continue; }
    if (c === '/' && raw[i+1] === '*') { const end = raw.indexOf('*/', i+2); const seg = end === -1 ? raw.slice(i) : raw.slice(i, end+2); out += `<span class="js-cm">${e(seg)}</span>`; i = end === -1 ? n : end+2; continue; }
    if (c === '`') { let j = i+1; while (j < n && raw[j] !== '`') { if (raw[j] === '\\') j++; j++; } out += `<span class="js-str">${e(raw.slice(i, j+1))}</span>`; i = j+1; continue; }
    if (c === '"' || c === "'") { let j = i+1; while (j < n && raw[j] !== c) { if (raw[j] === '\\') j++; j++; } out += `<span class="js-str">${e(raw.slice(i, j+1))}</span>`; i = j+1; continue; }
    if (/[a-zA-Z_$]/.test(c)) { let j = i; while (j < n && /[\w$]/.test(raw[j])) j++; const word = raw.slice(i, j); out += KW.has(word) ? `<span class="js-kw">${word}</span>` : e(word); i = j; continue; }
    if (/\d/.test(c)) { let j = i; while (j < n && /[\d.]/.test(raw[j])) j++; out += `<span class="js-num">${e(raw.slice(i, j))}</span>`; i = j; continue; }
    out += e(c); i++;
  }
  return out;
}

/* — Drag helper --------------------------------------------------------------- */
function startDrag(onMove) {
  document.body.style.userSelect = 'none';
  document.querySelectorAll('iframe').forEach(f => { f.style.pointerEvents = 'none'; });
  function move(ev) { onMove(ev); }
  function up() {
    document.body.style.userSelect = '';
    document.querySelectorAll('iframe').forEach(f => { f.style.pointerEvents = ''; });
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
  }
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
}

/* — Editor panel -------------------------------------------------------------- */
function EditorPanel({ lang, code, highlight, onChange, onReset, collapsed, onToggle, className, flexVal, headerExtra, hideChevron, ...rest }) {
  const taRef = useRef(null);
  const hiRef = useRef(null);
  const [copied, setCopied] = useState(false);

  function copyCode(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(code)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); })
      .catch(() => {});
  }

  function syncScroll() {
    if (!taRef.current || !hiRef.current) return;
    hiRef.current.scrollTop  = taRef.current.scrollTop;
    hiRef.current.scrollLeft = taRef.current.scrollLeft;
  }
  function handleTab(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta = e.target; const start = ta.selectionStart; const end = ta.selectionEnd;
    const next = ta.value.slice(0, start) + '  ' + ta.value.slice(end);
    onChange(next);
    requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
  }

  const langColor  = { html: '#f97316', css: '#0ea5e9', js: '#eab308' };
  const highlighted = useMemo(() => highlight(code), [code, highlight]);

  return (
    <div
      className={`${s.panel} ${className || ''}`}
      style={flexVal !== undefined ? { flex: flexVal } : undefined}
      {...rest}
    >
      <div className={s.panelHeader} onClick={hideChevron ? undefined : onToggle} title={hideChevron ? undefined : 'Click to collapse / expand'} style={hideChevron ? { cursor: 'default' } : undefined}>
        <span className={s.panelLang} style={{ color: langColor[lang] }}>{lang.toUpperCase()}</span>
        {headerExtra}
        <div className={s.panelBtns}>
          {onReset && <button className={s.panelBtn} onClick={e => { e.stopPropagation(); onReset(e); }} title="Reset to original">Reset</button>}
          <button className={`${s.panelBtn} ${copied ? s.panelBtnOk : ''}`} onClick={copyCode}>{copied ? 'Copied!' : 'Copy'}</button>
          {!hideChevron && (
            <button className={s.panelBtn} onClick={e => { e.stopPropagation(); onToggle(); }} title={collapsed ? 'Expand' : 'Collapse'}>
              {collapsed
                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              }
            </button>
          )}
        </div>
      </div>
      {!collapsed && (
        <div className={s.codeArea}>
          <pre ref={hiRef} className={s.highlight} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
          <textarea
            ref={taRef} className={s.editor} value={code || ''}
            onChange={e => onChange(e.target.value)} onKeyDown={handleTab}
            onScroll={syncScroll} spellCheck={false} autoCorrect="off" autoCapitalize="off"
          />
        </div>
      )}
    </div>
  );
}

/* — Confirm dialog ------------------------------------------------------------ */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={s.confirmOverlay}>
      <div className={s.confirmBox}>
        <p className={s.confirmMsg}>{message}</p>
        <div className={s.confirmBtns}>
          <button className={s.confirmCancel} onClick={onCancel}>Cancel</button>
          <button className={s.confirmDelete} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* — UUID helper --------------------------------------------------------------- */
function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/* — Fork & Edit hand-off ------------------------------------------------------
   Demo pages (demos/<bucket>/<topic>/, rendered by demos/assets/demo.js) send
   their source here two ways, both landing in /ui-snippets/mycode/#fork=…:

     #fork=ls:<token>   the snippet sits in localStorage under uis_fork_<token>
                        (same origin), and the link carries only the key
     #fork=<base64url>  the snippet itself, for when storage was unavailable

   Either way nothing reaches the server. Nothing here is trusted to be
   well-formed — a reader can hand-edit the URL — so anything malformed
   returns null and is ignored. — */
const FORK_PREFIX = 'uis_fork_';

function normalizeFork(data) {
  if (!data || typeof data !== 'object') return null;
  const str = v => (typeof v === 'string' ? v : '');
  const payload = {
    name: str(data.name).trim().slice(0, 80) || 'Forked snippet',
    html: str(data.html),
    css:  str(data.css),
    js:   str(data.js),
    // Only http(s) URLs — a javascript: or data: entry here would land in a
    // <script src> inside the preview frame.
    cdnUrls: Array.isArray(data.cdnUrls)
      ? data.cdnUrls.filter(u => typeof u === 'string' && /^https?:\/\//i.test(u.trim())).slice(0, 20)
      : [],
  };
  if (!payload.html && !payload.css && !payload.js) return null;
  return payload;
}

/* The stashed snippet is single-use: it is removed before it is even parsed,
   so a refresh, a second tab, or a link opened twice cannot import it again —
   whether or not the import that follows succeeds. */
function claimStashedFork(token) {
  if (!/^[a-z0-9]+$/i.test(token)) return null;
  try {
    const key = FORK_PREFIX + token;
    const raw = localStorage.getItem(key);
    localStorage.removeItem(key);
    if (!raw) return null;
    const rec = JSON.parse(raw);
    return normalizeFork(rec && rec.payload);
  } catch {
    return null;
  }
}

function readFork(raw) {
  if (raw.startsWith('ls:')) return claimStashedFork(raw.slice(3));
  try {
    const b64 = raw.replace(/-/g, '+').replace(/_/g, '/');
    return normalizeFork(JSON.parse(decodeURIComponent(escape(atob(b64)))));
  } catch {
    return null;
  }
}

/* — Saved snippets gallery ---------------------------------------------------- */
function buildSrcdocSimple(html, css, js, cdnUrls = []) {
  // Same CDN injection as buildSrcdoc — without it, any snippet that depends
  // on a library (Bootstrap, GSAP, jQuery...) renders broken in the card
  // thumbnail even though the real editor preview loads it correctly.
  const cdnTags = cdnUrls.filter(u => u.trim()).map(u =>
    /\.css(\?.*)?$/.test(u.trim())
      ? `<link rel="stylesheet" href="${u.trim()}">`
      : `<script src="${u.trim()}"><\/script>`
  ).join('\n');
  const hasBabel = cdnUrls.some(u => /babel/i.test(u));
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">${cdnTags}<style>*{box-sizing:border-box}::-webkit-scrollbar{display:none}*{scrollbar-width:none}body{margin:0;font-family:system-ui,sans-serif}${css}</style></head><body>${html}${js ? `<script${hasBabel ? ' type="text/babel" data-presets="react,env"' : ''}>${js}<\/script>` : ''}<script>document.addEventListener('click',function(e){var a=e.target.closest('a');if(a&&(a.getAttribute('href')==='#'||a.getAttribute('href')==='javascript:void(0)')){e.preventDefault();}});<\/script></body></html>`;
}

const SAVED_PER_PAGE = 9;

/* — Snippet top ad: AdSense unit (slot 7360198340) above the preview, library snippets.
   The size follows the space actually available above the preview (sidebar and code
   column eat into the viewport, so screen width alone would be wrong):
     970x90 large leaderboard → 728x90 leaderboard → 468x60 banner (tablet) → 320x50 mobile.
   Each size is a FIXED slot. Do NOT use data-ad-format="horizontal"/"auto" or
   data-full-width-responsive here: AdSense then rewrites every ancestor's inline style to
   `height:auto !important; min-height:0 !important` (and the section to 100vh), which
   collapses the whole editor/preview. The size is picked ONCE per snippet view (the parent
   keys this by snippet id): later resizes never re-request an ad, because AdSense policy
   forbids refreshing ads without new content or a user action. The loader is site-wide. — */
const TOP_AD_SIZES = [
  { w: 970, h: 90 },
  { w: 728, h: 90 },
  { w: 468, h: 60 },
  { w: 320, h: 50 },
];
function TopAdIns({ w, h }) {
  useEffect(() => {
    const id = setTimeout(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
    }, 300);
    return () => clearTimeout(id);
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'inline-block', width: `${w}px`, height: `${h}px` }}
      data-ad-client="ca-pub-2762737943861458"
      data-ad-slot="7360198340"
    />
  );
}
function SnippetTopAd() {
  const boxRef = useRef(null);
  const [size, setSize] = useState(null);
  useEffect(() => {
    const strip = boxRef.current?.parentElement;
    if (!strip) return;
    const pick = () => {
      // A strip collapsed by the unfilled-ad rule (display:none) measures 0 wide; ignore it so
      // the size is never dropped (that would un-collapse, re-request and collapse again).
      if (strip.offsetParent === null || strip.clientWidth === 0) return;
      const cs = getComputedStyle(strip);
      const avail = strip.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const next = TOP_AD_SIZES.find(z => z.w <= avail) || null;
      setSize(prev => prev ?? next);
    };
    pick();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(pick);
    ro.observe(strip);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={boxRef} className={s.adBarUnit} style={size ? { width: size.w, height: size.h } : undefined}>
      {size && <TopAdIns key={size.w} w={size.w} h={size.h} />}
    </div>
  );
}

function SavedGallery({ snippets, loaded, activeId, activeIsCustom, onSelect, onCreateNew, onExploreLibrary, onDelete }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState('');
  const [tagFilter, setTagFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');
  // How many pages are loaded, minus one — "Load more" appends the next page
  // below the cards already shown, same as the public library gallery. Seeded
  // from an old ?page=N link (pages 1..N load); clicks don't touch the URL.
  const [page, setPage] = useState(() => Math.max(0, (parseInt(searchParams.get('page'), 10) || 1) - 1));
  // Which card the pointer is over — the delete button is only shown on that
  // one, so a full grid is not a grid of trash icons.
  const [hoverId, setHoverId] = useState(null);
  const gridRef = useRef(null);
  const tagCounts = snippets.reduce((m, sn) => {
    (sn.tags || []).forEach(tg => { m[tg] = (m[tg] || 0) + 1; });
    return m;
  }, {});
  const allTags = Object.keys(tagCounts);
  const sorted = sortOrder === 'newest'
    ? [...snippets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [...snippets].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const filtered = sorted.filter(sn => {
    if (q.trim() && !sn.name.toLowerCase().includes(q.trim().toLowerCase())) return false;
    if (tagFilter && !(sn.tags || []).includes(tagFilter)) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / SAVED_PER_PAGE));
  const shown = filtered.slice(0, (page + 1) * SAVED_PER_PAGE);

  // A new search / tag / sort starts over at the first page. A stale ?page=N
  // from an old link is dropped then too; otherwise the URL is left alone, as
  // a query string would unmount the IndexOnly ad/SEO content below the grid.
  function resetPages() {
    setPage(0);
    if (searchParams.has('page')) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete('page');
      const qs = params.toString();
      router.replace(`${window.location.pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    }
  }

  // Keep the loaded count in range if the filtered set shrinks (a search
  // narrows the results, or snippets get deleted). Gated on `loaded`:
  // snippets start out as [] before IndexedDB resolves, which would otherwise
  // look like "out of range" and collapse a deep-linked ?page=N too early.
  useEffect(() => {
    if (!loaded) return;
    if (page > totalPages - 1) setPage(totalPages - 1);
  }, [loaded, totalPages, page]);

  function loadMore() {
    setPage(p => Math.min(p + 1, totalPages - 1));
  }

  if (snippets.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px 24px', gap: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16, lineHeight: 1 }}>✦</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-ui)', marginBottom: 8, letterSpacing: '-0.3px' }}>Your personal code space</h2>
        <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, maxWidth: 320, marginBottom: 8 }}>
          Save snippets from the library, or create your own from scratch. Everything stays in your browser — private, always available, never shared.
        </p>
        <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, maxWidth: 300, marginBottom: 28, opacity: 0.7 }}>
          Write HTML, CSS &amp; JS with live preview. Add CDN libraries. Export as HTML, JSX or Tailwind.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={onCreateNew}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-ui)', cursor: 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create new snippet
          </button>
          <button
            onClick={onExploreLibrary}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'none', color: 'var(--text2)', border: '1.5px solid var(--border2)', borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-ui)', cursor: 'pointer' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Explore {SNIPPET_COUNT}+ snippets
          </button>
        </div>
        <div style={{ marginTop: 32, display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '📋', text: 'Save from library' },
            { icon: '✏️', text: 'Write from scratch' },
            { icon: '🔗', text: 'Sync via GitHub Gist' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text3)' }}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={gs.wrap}>
      <div className={gs.layout}>
      <div className={gs.main}>
      {/* Leaderboard ad (max 90px) above the search box, same as the library gallery */}
      <PlaygroundTopAd className={gs.topAd} />
      <div className={gs.controls}>
        <div className={gs.searchRow}>
          <div className={gs.searchWrap}>
            <svg className={gs.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className={gs.searchInput}
              value={q}
              onChange={e => { setQ(e.target.value); resetPages(); }}
              placeholder="Search saved snippets..."
            />
            {q && (
              <button className={gs.clearBtn} onClick={() => { setQ(''); resetPages(); }} aria-label="Clear search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
          <button
            className={gs.gallerySortBtn}
            onClick={() => { setSortOrder(o => o === 'newest' ? 'oldest' : 'newest'); resetPages(); }}
            title={sortOrder === 'newest' ? 'Newest first — click for oldest first' : 'Oldest first — click for newest first'}
            aria-label={sortOrder === 'newest' ? 'Sort: newest first' : 'Sort: oldest first'}
          >
            {sortOrder === 'newest'
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="5 11 12 4 19 11"/><line x1="7" y1="20" x2="17" y2="20"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="5 13 12 20 19 13"/><line x1="7" y1="4" x2="17" y2="4"/></svg>
            }
          </button>
        </div>
        {allTags.length > 0 && (
          <div className={s.tagFilters}>
            <button
              className={`${s.tagFilterBtn} ${!tagFilter ? s.tagFilterActive : ''}`}
              onClick={() => { setTagFilter(null); resetPages(); }}
            >All tags</button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`${s.tagFilterBtn} ${tagFilter === tag ? s.tagFilterActive : ''}`}
                onClick={() => { setTagFilter(t => t === tag ? null : tag); resetPages(); }}
              >{tag}<span className={s.tagFilterCount}>{tagCounts[tag]}</span></button>
            ))}
          </div>
        )}
      </div>
      {filtered.length === 0 && (
        <div className={gs.empty}>No snippets match &ldquo;{q}&rdquo;</div>
      )}
      <div className={gs.grid} ref={gridRef}>
        {shown.map(sn => (
          <div
            key={sn.id}
            onClick={() => onSelect(sn)}
            style={{
              background: 'var(--surface)', border: `1.5px solid ${sn.id === activeId && activeIsCustom ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
              transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => { setHoverId(sn.id); e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { setHoverId(null); e.currentTarget.style.borderColor = sn.id === activeId && activeIsCustom ? 'var(--accent)' : 'var(--border)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <div style={{ position: 'relative', height: 160, overflow: 'hidden', background: '#fff' }}>
              <iframe
                srcDoc={buildSrcdocSimple(sn.html || '', sn.css || '', sn.js || '', sn.cdnUrls || [])}
                title={sn.name}
                sandbox="allow-scripts allow-forms"
                style={{ width: '133.33%', height: '133.33%', border: 'none', pointerEvents: 'none', transform: 'scale(0.75)', transformOrigin: 'top left' }}
              />
              <button
                type="button"
                className={s.cardDelete}
                onClick={e => { e.stopPropagation(); onDelete(sn); }}
                aria-label={`Delete "${sn.name}"`}
                title="Delete"
                style={{
                  position: 'absolute', top: 8, right: 8, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(15,17,23,0.55)', color: '#fff', border: 'none', borderRadius: 7, cursor: 'pointer',
                  backdropFilter: 'blur(2px)', transition: 'background 0.15s, opacity 0.15s',
                  // Only while the pointer is on this card. Left undefined
                  // otherwise so .cardDelete keeps control — it also has to
                  // cover keyboard focus and touch screens, which never hover.
                  opacity: hoverId === sn.id ? 1 : undefined,
                  pointerEvents: hoverId === sn.id ? 'auto' : undefined,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.85)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,17,23,0.55)'; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </button>
            </div>
            <div className={gs.cardBody}>
              {(sn.tags?.length > 0)
                ? <span className={gs.catBadge} onClick={e => { e.stopPropagation(); setTagFilter(t => t === sn.tags[0] ? null : sn.tags[0]); resetPages(); }}>{sn.tags[0]}</span>
                : <span className={gs.catBadge} style={{ opacity: 0.45 }}>saved</span>
              }
              <h3 className={gs.cardTitle}>{sn.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <LoadMore shown={shown.length} total={filtered.length} onLoadMore={loadMore} />
      </div>
      </div>
    </div>
  );
}

/* — Export dropdown — single "Export ▾" menu listing every framework format.
   Self-contained: manages its own open/close + outside-click. — */
const EXPORT_ICONS = {
  'HTML':             <svg width="16" height="18" viewBox="0 0 512 512" title="HTML"><path fill="#e44d26" d="M107 457L75 96h362l-32 361-149 41z"/><path fill="#f16529" d="M256 444l120-33 27-307H256z"/><path fill="#ebebeb" d="M256 208h-62l-4-45h66v-44H144l11 127h101zm0 122l-49-13-3-36h-44l6 67 90 25z"/><path fill="#fff" d="M256 208v44h58l-6 58-52 14v46l90-25 7-77 7-60zm0-89v44h114l-4-44z"/></svg>,
  'HTML + Tailwind':  <svg width="18" height="11" viewBox="0 0 54 33" title="Tailwind"><path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.728 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.256 3.272 34.192 0 27 0zM13.5 16C6.3 16 1.8 19.6 0 26.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C16.744 28.728 19.808 32 26.5 32c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.756 19.272 20.692 16 13.5 16z" fill="#38bdf8"/></svg>,
  'React':            <svg width="17" height="17" viewBox="0 0 100 100" title="React"><ellipse cx="50" cy="50" rx="10" ry="10" fill="#61dafb"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(120 50 50)"/></svg>,
  'React + Tailwind': (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <svg width="17" height="17" viewBox="0 0 100 100" title="React + Tailwind"><ellipse cx="50" cy="50" rx="10" ry="10" fill="#61dafb"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(120 50 50)"/></svg>
      <svg width="10" height="6" viewBox="0 0 54 33" style={{ position: 'absolute', right: -4, bottom: -2 }}><path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.728 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.256 3.272 34.192 0 27 0zM13.5 16C6.3 16 1.8 19.6 0 26.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C16.744 28.728 19.808 32 26.5 32c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.756 19.272 20.692 16 13.5 16z" fill="#38bdf8"/></svg>
    </span>
  ),
  'Vue':              <svg width="17" height="15" viewBox="0 0 261.76 226.69" title="Vue"><path d="M161.096 0l-30.225 52.351L100.647 0H0l130.871 226.69L261.742 0z" fill="#41b883"/><path d="M161.096 0l-30.225 52.351L100.647 0H52.346l78.525 136.01L209.397 0z" fill="#34495e"/></svg>,
  'Angular':          <svg width="17" height="17" viewBox="0 0 250 250" title="Angular"><path d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" fill="#dd0031"/><path d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" fill="#c3002f"/><path fill="#fff" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/></svg>,
  'Embed':            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  'Test Exports':     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
};

// Tints the icon tile behind each option so the seven wildly-different brand
// glyphs (a shield, a swirl, a circle, a triangle...) read as one consistent
// row of framed icons instead of loose shapes floating at different sizes.
const EXPORT_ICON_TINTS = {
  'HTML':             '#e44d26',
  'HTML + Tailwind':  '#38bdf8',
  'React':            '#61dafb',
  'React + Tailwind': '#61dafb',
  'Vue':              '#41b883',
  'Angular':          '#dd0031',
  'Embed':            '#6b7280',
  'Test Exports':     '#059669',
};

function ExportMenu({ options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div className={s.popoverAnchor} ref={ref}>
      <button className={s.iconBtn} onClick={() => setOpen(v => !v)} title="Export as HTML, Tailwind, React, Vue or Angular" aria-haspopup="true" aria-expanded={open}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M4 19h16"/></svg>
        Export
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 1, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 299 }} />}
      {open && (
        <div className={s.exportMenu} role="menu">
          <div className={s.exportMenuHead}>Export this snippet as…</div>
          {options.map((o, i) => (
            <div key={o.label}>
              {/* Embed is a live-preview link, not a code export — set it apart */}
              {(o.label === 'Embed' || (i > 0 && options[i - 1].label === 'Test Exports')) && i > 0 && <div className={s.exportMenuDivider} />}
              <button className={s.exportMenuItem} role="menuitem" onClick={() => { o.onClick(); setOpen(false); }}>
                <span className={s.exportMenuItemIcon} style={{ background: `${EXPORT_ICON_TINTS[o.label]}1a` }}>
                  {EXPORT_ICONS[o.label]}
                </span>
                <span className={s.exportMenuItemText}>
                  <span className={s.exportMenuItemLabel}>{o.label}</span>
                  <span className={s.exportMenuItemSub}>{o.sub}</span>
                </span>
                <svg className={s.exportMenuItemArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* — Main component ------------------------------------------------------------ */
// id -> {id, title, category} for every library snippet.
const SNIPPET_META = new Map(SNIPPETS.map(sn => [sn.id, sn]));

// Header category strip: computed once at module load (the library is static).
const HEADER_CATEGORIES = CATEGORIES
  .filter(c => c.id !== 'all' && !c.devOnly)
  .map(c => ({ id: c.id, label: c.label, count: VISIBLE_SNIPPETS.filter(sn => sn.category === c.id).length }))
  .filter(c => c.count > 0);
// Header tag list for the strip's drop-down (same set the gallery's Tags column shows).
const HEADER_TAGS = publishedTags(SNIPPETS).map(t => ({ id: t.id, label: t.label }));

export default function UiSnippetsTool({ initialSnippetId, isHome = false, initialCategory = 'all', initialTag = null, initialView = null } = {}) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  // Only the id is known synchronously: the snippet's code is fetched on
  // demand (openLibSnippet below), so the editors start empty.
  const _initId      = (initialSnippetId && SNIPPET_META.has(initialSnippetId)) ? initialSnippetId : SNIPPETS[0].id;
  // Active snippet
  const [activeId,      setActiveId]      = useState(_initId);
  const [activeIsCustom, setActiveIsCustom] = useState(false);
  const [htmlCode,      setHtmlCode]      = useState('');
  const [cssCode,       setCssCode]       = useState('');
  const [jsCode,        setJsCode]        = useState('');
  const [srcDoc,        setSrcDoc]        = useState('');

  // Sidebar
  const [sidebarTab,    setSidebarTab]    = useState(initialView === 'saved' ? 'saved' : 'library'); // 'library' | 'saved'
  // Sort order for "My Code" — drives both the removed sidebar's old sort
  // toggle (gone) and customSorted below, which feeds My Code prev/next nav.
  const [savedSortOrder,  setSavedSortOrder]  = useState('newest');

  // ── Author credit popover: zooms out of the "webdevpuneet" link, holds for
  // 5s, then zooms back in on its own (no close button). Shows once on load and
  // re-triggers when you hover the byline.
  const [creditMounted, setCreditMounted] = useState(false);
  const [creditShown,   setCreditShown]   = useState(false);
  const creditTimers = useRef({ hide: null, unmount: null, open: null });
  const closeCredit = useCallback(() => {
    clearTimeout(creditTimers.current.hide);
    setCreditShown(false);                                   // zoom back in
    creditTimers.current.unmount = setTimeout(() => setCreditMounted(false), 340);
  }, []);
  const openCredit = useCallback(() => {
    const t = creditTimers.current;
    clearTimeout(t.unmount); clearTimeout(t.hide); clearTimeout(t.open);
    setCreditMounted(true);
    t.open = setTimeout(() => setCreditShown(true), 20);      // zoom out on next tick
    t.hide = setTimeout(() => closeCredit(), 10000);          // auto-dismiss after 10s (or via close button)
  }, [closeCredit]);
  // Auto-show shortly after the tool mounts, and again every time the active
  // snippet changes (the layout keeps this component mounted across snippet
  // navigations, so a fresh mount-only effect would only ever fire once).
  useEffect(() => {
    if (sidebarTab !== 'library') return;
    const t = setTimeout(openCredit, 900);
    return () => { clearTimeout(t); const c = creditTimers.current; clearTimeout(c.hide); clearTimeout(c.unmount); clearTimeout(c.open); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSnippetId, sidebarTab]);

  // Custom snippets (IndexedDB)
  const [customSnippets,  setCustomSnippets]  = useState([]);
  const [customSnippetsLoaded, setCustomSnippetsLoaded] = useState(false);

  // Layout
  const [editorWidth,   setEditorWidth]   = useState(320); // px — floor is 300px, dragging below it collapses the pane
  const [htmlFlex,      setHtmlFlex]      = useState(1);
  const [cssFlex,       setCssFlex]       = useState(1);
  const [jsFlex,        setJsFlex]        = useState(1);
  const [htmlCollapsed, setHtmlCollapsed] = useState(false);
  const [cssCollapsed,  setCssCollapsed]  = useState(false);
  const [jsCollapsed,   setJsCollapsed]   = useState(false);

  // Library snippets now open straight into the code panels — the same
  // independently-toggleable HTML/CSS/JS panels as My Code — instead of
  // defaulting to a "Related" tab the reader had to click past.
  function toggleHtmlPanel() { setHtmlCollapsed(p => !p); }
  function toggleCssPanel()  { setCssCollapsed(p => !p); }
  function toggleJsPanel()   { setJsCollapsed(p => !p); }
  const [editorVisible, setEditorVisible] = useState(true);
  const [showEditor,    setShowEditor]    = useState(initialView === 'saved' ? false : !isHome);
  const [previewMode,   setPreviewMode]   = useState('desktop'); // 'mobile'|'tablet'|'desktop'
  const [isMobile,      setIsMobile]      = useState(false);

  const [isMaximized,   setIsMaximized]   = useState(false);
  const [previewKey,    setPreviewKey]    = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  // Kept alive for catSnippets' prev/next-in-category nav below (its old UI
  // toggle lived in the removed sidebar).
  const [sortOrder,     setSortOrder]     = useState('newest');
  // Mirror of the site Sidebar's Related toggle + sort (published on window
  // and via the 'uis-sidebar-nav' event) so Prev / Next / Random can follow it.
  const [sidebarNav, setSidebarNav] = useState({ related: false, sort: 'newest', ids: null });
  useEffect(() => {
    if (window.__uisSidebarNav) setSidebarNav(window.__uisSidebarNav);
    const onNav = e => setSidebarNav(e.detail);
    window.addEventListener('uis-sidebar-nav', onNav);
    return () => window.removeEventListener('uis-sidebar-nav', onNav);
  }, []);

  const [isNewBlank,  setIsNewBlank]  = useState(false);
  const [cdnUrls,     setCdnUrls]     = useState([]);
  const [cdnInput,    setCdnInput]    = useState('');
  const [cdnCssInput, setCdnCssInput] = useState('');
  const [showCdn,     setShowCdn]     = useState(false);
  const [showCdnCss,  setShowCdnCss]  = useState(false);
  const [copiedCdnUrl, setCopiedCdnUrl] = useState(null);
  const cdnPopRef    = useRef(null);
  const cdnCssPopRef = useRef(null);
  const cdnUrlsRef   = useRef([]);
  const [consoleLogs,  setConsoleLogs]  = useState([]);
  const [consoleOpen,  setConsoleOpen]  = useState(false);
  const consoleEndRef = useRef(null);

  // Embed modal — library snippets only, never for a custom/MyCode snippet
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  // Test Exports lightbox opened from the Export dropdown (the toolbar button keeps its own state).
  const [testerOpen, setTesterOpen] = useState(false);

  // Save popover
  const [showSave,   setShowSave]   = useState(false);
  const [saveName,      setSaveName]      = useState('');
  const [saveTags,      setSaveTags]      = useState([]);
  const [saveTagInput,  setSaveTagInput]  = useState('');
  const [saveStatus, setSaveStatus] = useState(''); // '' | 'saving' | 'saved'

  // Confirm delete
  const [confirmDelete, setConfirmDelete] = useState(null); // { id, name }

  // Toast
  const [toast, setToast] = useState('');

  const bodyRef     = useRef(null);
  const editorRef   = useRef(null);
  const savePopRef  = useRef(null);
  const debounceRef     = useRef(null);
  const jsDebounceRef   = useRef(null);
  const jsCountdownRef  = useRef(null);
  const [jsCountdown, setJsCountdown] = useState(null);
  const syncRef     = useRef(null);
  const forkRef     = useRef(false);
  const htmlRef     = useRef('');
  const cssRef      = useRef('');
  const jsRef       = useRef('');
  // Which library snippet's code is currently in the editors, and which one
  // was requested last (a slower earlier load must not overwrite a newer one).
  const shownLibIdRef = useRef(null);
  const libReqRef     = useRef(null);

  function applyLibSnippet(sn) {
    shownLibIdRef.current = sn.id;
    htmlRef.current = sn.html; cssRef.current = sn.css; jsRef.current = sn.js || '';
    setActiveId(sn.id); setActiveIsCustom(false);
    setHtmlCode(sn.html); setCssCode(sn.css); setJsCode(sn.js || '');
    const libUrls = sn.cdnUrls || []; setCdnUrls(libUrls); cdnUrlsRef.current = libUrls;
    setSrcDoc(buildSrcdoc(sn.html, sn.css, sn.js, libUrls));
  }
  // Open a library snippet: title/category switch immediately (from the
  // index); the code follows as soon as its chunk arrives (instant if cached).
  function openLibSnippet(id) {
    libReqRef.current = id;
    setActiveId(id); setActiveIsCustom(false);
    const cached = getLoadedSnippet(id);
    if (cached) { applyLibSnippet(cached); return; }
    // Clear the previous snippet's code so it never shows under the new title.
    shownLibIdRef.current = null;
    htmlRef.current = ''; cssRef.current = ''; jsRef.current = '';
    setHtmlCode(''); setCssCode(''); setJsCode('');
    fetchSnippet(id).then(sn => {
      if (sn && libReqRef.current === id) applyLibSnippet(sn);
    });
  }

  /* — Blank "Create new" editor. The ?new=1 param keeps the URL effects below
       from bouncing back to a gallery or a stale snippet. — */
  const wantsNew = searchParams.get('new') === '1';
  function applyBlank() {
    htmlRef.current = ''; cssRef.current = ''; jsRef.current = '';
    setHtmlCode(''); setCssCode(''); setJsCode('');
    setCdnUrls([]); cdnUrlsRef.current = [];
    setSrcDoc(buildSrcdoc('', '', ''));
    setActiveId(null); setActiveIsCustom(false);
    setIsNewBlank(true); setShowEditor(true);
    setSidebarTab('saved');
  }

  /* — React to slug change (layout keeps component mounted) — */
  useEffect(() => {
    if (!initialSnippetId) { setShowEditor(false); return; }
    if (!SNIPPET_META.has(initialSnippetId)) return;
    setShowEditor(true);
    if (initialSnippetId === shownLibIdRef.current && !activeIsCustom) return;
    openLibSnippet(initialSnippetId);
  }, [initialSnippetId]); // eslint-disable-line react-hooks/exhaustive-deps

  /* — React to saved snippet param — */
  useEffect(() => {
    const savedId = initialView === 'saved' ? searchParams.get('id') : searchParams.get('saved');
    if (!savedId) {
      if (wantsNew) { applyBlank(); return; }
      if (initialView === 'saved') {
        // Back-navigated to /mycode/ with no ?id= -> return to gallery
        setShowEditor(false);
        setActiveId(null);
        setActiveIsCustom(false);
      } else if (!initialSnippetId) {
        // No param and no slug -> library gallery
        setShowEditor(false);
        setSidebarTab('library');
        setActiveId(null);
        setActiveIsCustom(false);
      }
      return;
    }
    dbGetAll().then(all => {
      const sn = all.find(x => x.id === savedId);
      if (!sn) return;
      setActiveId(sn.id); setActiveIsCustom(true);
      htmlRef.current = sn.html; cssRef.current = sn.css; jsRef.current = sn.js;
      setHtmlCode(sn.html); setCssCode(sn.css); setJsCode(sn.js);
      const urls = sn.cdnUrls || []; setCdnUrls(urls); cdnUrlsRef.current = urls;
      setSrcDoc(buildSrcdoc(sn.html, sn.css, sn.js, urls));
      setSidebarTab('saved'); setShowEditor(true); setIsNewBlank(false);
      setCustomSnippets(all.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    }).catch(() => {});
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  /* — Arriving from a demo's "Fork & Edit" button — */
  useEffect(() => {
    if (initialView !== 'saved') return;
    // Runs once per mount: the ref is set before the first await so React's
    // double-invoked dev effects cannot save the snippet twice.
    if (forkRef.current) return;
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (!hash.startsWith('#fork=')) return;
    forkRef.current = true;

    const payload = readFork(hash.slice(6));
    if (!payload) {
      window.history.replaceState(null, '', '/ui-snippets/mycode/');
      showToast('That fork link could not be read');
      return;
    }

    const now = new Date().toISOString();
    const record = {
      id: uuid(),
      name: payload.name,
      tags: [],
      cdnUrls: payload.cdnUrls,
      html: payload.html,
      css:  payload.css,
      js:   payload.js,
      createdAt: now,
      updatedAt: now,
    };

    (async () => {
      try {
        await dbPut(record);
        await loadCustomSnippets();
        // Swapping the fragment for ?id= hands the rest to the saved-param
        // effect above, so the fork opens through the same path as any other
        // snippet — and a refresh reopens it instead of forking again.
        router.replace(`/ui-snippets/mycode/?id=${record.id}`, { scroll: false });
        showToast(`Forked "${record.name}" into My Code`);
        syncRef.current?.forcePush();
      } catch {
        showToast('Could not save the forked snippet');
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync showEditor with URL — back/forward navigation changes initialSnippetId prop
  useEffect(() => {
    if (!initialSnippetId && wantsNew) { applyBlank(); return; }
    if (!initialSnippetId) {
      setShowEditor(false);
      setActiveId(null);
      setActiveIsCustom(false);
      setIsNewBlank(false);
      // Only switch to library if there's no saved param and not on the /saved/ route
      if (!searchParams.get('id') && !searchParams.get('saved') && initialView !== 'saved') setSidebarTab('library');
    } else {
      if (SNIPPET_META.has(initialSnippetId)) {
        if (initialSnippetId !== shownLibIdRef.current || activeIsCustom) openLibSnippet(initialSnippetId);
        setShowEditor(true); setIsNewBlank(false);
      }
    }
  }, [initialSnippetId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { cdnUrlsRef.current = cdnUrls; }, [cdnUrls]);

  useEffect(() => { setConsoleLogs([]); }, [activeId]);

  // Keep the preview hidden behind a loading screen on every snippet load,
  // auto-clicking Refresh at 500ms, then reveal it in one instant flash —
  // no fade, just a hard show.
  useEffect(() => {
    if (!showEditor) return;
    setPreviewVisible(false);
    const timer = setTimeout(() => {
      setPreviewKey(k => k + 1);
      setPreviewVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeId, showEditor]);

  useEffect(() => {
    function handler(e) {
      if (e.data?._uisnip !== 'console') return;
      setConsoleLogs(prev => [...prev, { id: Date.now() + Math.random(), level: e.data.level, args: e.data.args }]);
      setConsoleOpen(true); // slide the panel open on any console message or error
    }
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    if (consoleOpen) consoleEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [consoleLogs, consoleOpen]);

  /* — Init — */
  useEffect(() => {
    loadCustomSnippets();
    try { const saved = localStorage.getItem('uis_sort'); if (saved) setSortOrder(saved); } catch {}
    // Keep in sync with saves/deletes made elsewhere (e.g. the Sidebar's My Code
    // list has its own delete button) — uiSnippetsDb dispatches this on every write.
    window.addEventListener('uis-custom-snippets-changed', loadCustomSnippets);
    return () => window.removeEventListener('uis-custom-snippets-changed', loadCustomSnippets);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* — Mobile — */
  useEffect(() => {
    const check = (initial = false) => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        if (initial) {
          setHtmlCollapsed(true);
          setCssCollapsed(true);
          setJsCollapsed(true);
        }
      }
    };
    check(true);
    const onResize = () => check(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* — Close popovers on outside click — */
  useEffect(() => {
    function handler(e) {
      if (showSave && savePopRef.current && !savePopRef.current.contains(e.target)) setShowSave(false);
      if (showCdn    && cdnPopRef.current    && !cdnPopRef.current.contains(e.target))    setShowCdn(false);
      if (showCdnCss && cdnCssPopRef.current && !cdnCssPopRef.current.contains(e.target)) setShowCdnCss(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showSave, showCdn, showCdnCss]);

  /* — IndexedDB helpers — */
  async function loadCustomSnippets() {
    try {
      const all = await dbGetAll();
      setCustomSnippets(all.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    } catch {}
    setCustomSnippetsLoaded(true);
  }

  /* — Preview — */
  function clearJsCountdown() {
    clearInterval(jsCountdownRef.current);
    clearTimeout(jsDebounceRef.current);
    setJsCountdown(null);
  }

  function runPreview(html, css, js) {
    clearTimeout(debounceRef.current);
    clearJsCountdown();
    setConsoleLogs([]);
    setSrcDoc(buildSrcdoc(html, css, js, cdnUrlsRef.current));
  }

  function queuePreview(html, css, js, jsChanged = false) {
    clearTimeout(debounceRef.current);
    if (jsChanged) {
      clearJsCountdown();
      const SECS = 5;
      setJsCountdown(SECS);
      let remaining = SECS;
      jsCountdownRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(jsCountdownRef.current);
          setJsCountdown(null);
          setConsoleLogs([]);
          setSrcDoc(buildSrcdoc(html, css, js, cdnUrlsRef.current));
        } else {
          setJsCountdown(remaining);
        }
      }, 1000);
    } else {
      debounceRef.current = setTimeout(() => { setConsoleLogs([]); setSrcDoc(buildSrcdoc(html, css, js, cdnUrlsRef.current)); }, 200);
    }
  }

  /* — Load snippet — */
  function loadSnippet(id, isCustom = false) {
    if (!isCustom) { if (SNIPPET_META.has(id)) openLibSnippet(id); return; }
    const sn = customSnippets.find(x => x.id === id);
    if (!sn) return;
    setActiveId(id);
    setActiveIsCustom(isCustom);
    htmlRef.current = sn.html; cssRef.current = sn.css; jsRef.current = sn.js;
    setHtmlCode(sn.html); setCssCode(sn.css); setJsCode(sn.js);
    const snUrls = sn.cdnUrls || []; setCdnUrls(snUrls); cdnUrlsRef.current = snUrls;
    setSrcDoc(buildSrcdoc(sn.html, sn.css, sn.js, snUrls));
  }

  /* — Reset helpers — */
  function getOriginal() {
    return activeIsCustom
      ? customSnippets.find(x => x.id === activeId)
      : getLoadedSnippet(activeId);
  }
  function resetHtml() {
    const sn = getOriginal(); if (!sn) return;
    htmlRef.current = sn.html; setHtmlCode(sn.html);
    queuePreview(sn.html, cssRef.current, jsRef.current);
    showToast('HTML reset');
  }
  function resetCss() {
    const sn = getOriginal(); if (!sn) return;
    cssRef.current = sn.css; setCssCode(sn.css);
    queuePreview(htmlRef.current, sn.css, jsRef.current);
    showToast('CSS reset');
  }
  function resetJs() {
    const sn = getOriginal(); if (!sn) return;
    jsRef.current = sn.js; setJsCode(sn.js);
    queuePreview(htmlRef.current, cssRef.current, sn.js);
    showToast('JS reset');
  }

  /* — Code change handlers — */
  const onHtml = useCallback(val => {
    htmlRef.current = val; setHtmlCode(val);
    queuePreview(val, cssRef.current, jsRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const onCss = useCallback(val => {
    cssRef.current = val; setCssCode(val);
    queuePreview(htmlRef.current, val, jsRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const onJs = useCallback(val => {
    jsRef.current = val; setJsCode(val);
    queuePreview(htmlRef.current, cssRef.current, val, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* — Update existing saved snippet — */
  async function updateSnippet() {
    const sn = customSnippets.find(x => x.id === activeId);
    if (!sn) return;
    const record = { ...sn, html: htmlRef.current, css: cssRef.current, js: jsRef.current, cdnUrls: cdnUrlsRef.current, updatedAt: new Date().toISOString() };
    try {
      await dbPut(record);
      await loadCustomSnippets();
      showToast(`Saved "${sn.name}"`);
      syncRef.current?.forcePush();
    } catch {
      showToast('Save failed');
    }
  }

  /* — Save to IndexedDB — */
  async function saveSnippet() {
    if (!saveName.trim()) return;
    setSaveStatus('saving');
    const now = new Date().toISOString();
    const pendingTag = saveTagInput.trim().toLowerCase();
    const finalTags = pendingTag && !saveTags.includes(pendingTag)
      ? [...saveTags, pendingTag]
      : saveTags;
    const record = {
      id: uuid(),
      name: saveName.trim(),
      tags: finalTags,
      cdnUrls: cdnUrlsRef.current,
      html: htmlRef.current,
      css:  cssRef.current,
      js:   jsRef.current,
      createdAt: now,
      updatedAt: now,
    };
    try {
      await dbPut(record);
      await loadCustomSnippets();
      setSaveStatus('saved');
      showToast(`Forked "${record.name}"`);
      syncRef.current?.forcePush();
      setTimeout(() => {
        setShowSave(false); setSaveName(''); setSaveTags([]); setSaveTagInput(''); setSaveStatus(''); setIsNewBlank(false);
        // Open the saved copy so the user lands on it instead of the original
        router.push(`/ui-snippets/mycode/?id=${record.id}`, { scroll: false });
      }, 900);
    } catch {
      setSaveStatus('');
      showToast('Fork failed');
    }
  }

  /* — Delete custom snippet — */
  async function deleteCustomSnippet(id) {
    try {
      trackDeletion(id);
      await dbDelete(id);
      await loadCustomSnippets();
      if (activeId === id) loadSnippet(SNIPPETS[0].id, false);
      syncRef.current?.forcePush();
      showToast('Snippet deleted');
    } catch {}
  }

  /* — Framework exports — all delegate to the shared converters in
     src/lib/snippet-exporters.js so the toolbar, the Test Exports lightbox,
     and the on-page code tabs always emit identical code. — */
  function currentSn() {
    return { html: htmlRef.current, css: cssRef.current, js: jsRef.current, title: activeSn?.title, id: activeId || 'snippet', cdnUrls: cdnUrlsRef.current };
  }
  function downloadText(content, filename, type = 'text/plain') {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportReact() {
    const sn = currentSn();
    downloadText(toReactComponent(sn), componentName(sn) + '.jsx');
    showToast('React component downloaded!');
  }

  function exportTailwind() {
    const sn = currentSn();
    downloadText(toTailwindComponent(sn), componentName(sn) + '.tailwind.jsx');
    showToast('React + Tailwind downloaded!');
  }

  function exportTailwindHtml() {
    const sn = currentSn();
    downloadText(toTailwindHtml(sn), sn.id + '.tailwind.html', 'text/html');
    showToast('Tailwind downloaded!');
  }

  function exportVue() {
    const sn = currentSn();
    downloadText(toVueSfc(sn), componentName(sn) + '.vue');
    showToast('Vue SFC downloaded!');
  }

  function exportAngular() {
    const sn = currentSn();
    downloadText(toAngularComponent(sn), angularSelector(componentName(sn)) + '.component.ts');
    showToast('Angular component downloaded!');
  }

  /* — Download standalone HTML file (shared toHtmlFile converter) — */
  function downloadSnippet() {
    downloadText(toHtmlFile(currentSn()), `${activeId}.html`, 'text/html');
    showToast('Downloaded!');
  }

  /* — Options for the single Export dropdown (labels + what each produces) — */
  const exportOptions = [
    { label: 'Test Exports',     sub: 'Preview & try every format live',      onClick: () => setTesterOpen(true) },
    { label: 'HTML',            sub: 'Standalone .html file',                onClick: downloadSnippet },
    { label: 'HTML + Tailwind',  sub: 'Standalone file via Tailwind CDN',     onClick: exportTailwindHtml },
    { label: 'React',            sub: 'JSX component (.jsx) with useEffect',   onClick: exportReact },
    { label: 'React + Tailwind', sub: 'JSX with Tailwind utility classes',     onClick: exportTailwind },
    { label: 'Vue',              sub: 'Vue 3 single-file component (.vue)',    onClick: exportVue },
    { label: 'Angular',          sub: 'Standalone component (.component.ts)',  onClick: exportAngular },
    // Embed only exists for library snippets — a custom/MyCode snippet has no
    // canonical /ui-snippets/[slug]/ page for the embed iframe to point back to.
    ...(!activeIsCustom ? [{ label: 'Embed', sub: 'Live-preview <iframe> for WordPress & other sites', onClick: () => setEmbedModalOpen(true) }] : []),
  ];

  /* — Toast — */
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 2000); }

  async function getLocalData() {
    const all = await dbGetAll();
    return { snippets: all, deleted: getDeletedMap() };
  }

  async function onPullData(remote) {
    const remoteSnippets = remote.snippets || [];
    const remoteDeleted = remote.deleted || {};
    const local = await dbGetAll();
    const localDeleted = getDeletedMap();
    const mergedDeleted = { ...remoteDeleted, ...localDeleted };
    const map = new Map();
    [...local, ...remoteSnippets].forEach(r => {
      const deletedAt = mergedDeleted[r.id];
      if (deletedAt && new Date(deletedAt) >= new Date(r.updatedAt)) return;
      const ex = map.get(r.id);
      if (!ex || new Date(r.updatedAt) > new Date(ex.updatedAt)) map.set(r.id, r);
    });
    const merged = [...map.values()];
    try { localStorage.setItem(LS_DELETED, JSON.stringify(mergedDeleted)); } catch {}
    await dbClear();
    await Promise.all(merged.map(r => dbPut(r)));
    await loadCustomSnippets();
  }

  /* — Maximize preview — also collapses the site-wide left Sidebar (a
     separate component under the root layout) via a window event, since
     there's no shared state between them. */
  function toggleMaximize() {
    if (!isMaximized) {
      setEditorVisible(false);
      setIsMaximized(true);
      try { window.dispatchEvent(new CustomEvent('sidebar-collapse-request', { detail: true })); } catch {}
    } else {
      setEditorVisible(true);
      setIsMaximized(false);
      try { window.dispatchEvent(new CustomEvent('sidebar-collapse-request', { detail: false })); } catch {}
    }
  }

  /* — Drag handlers — */
  function onSplitDragStart(e) {
    e.preventDefault();
    document.body.style.userSelect = 'none';
    document.querySelectorAll('iframe').forEach(f => { f.style.pointerEvents = 'none'; });

    function move(ev) {
      if (!bodyRef.current) return;
      const rect  = bodyRef.current.getBoundingClientRect();
      const avail = rect.width - 4;
      // Measure from whichever side the editor is docked to.
      const editorPx = codeRight ? rect.right - ev.clientX : ev.clientX - rect.left;
      if (editorPx < 300) {
        setEditorVisible(false);
      } else {
        setEditorVisible(true);
        setEditorWidth(Math.min(avail * 0.75, editorPx));
      }
    }

    function up() {
      document.body.style.userSelect = '';
      document.querySelectorAll('iframe').forEach(f => { f.style.pointerEvents = ''; });
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    }

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }

  function onHtmlCssDragStart(e) {
    e.preventDefault();
    if (!editorRef.current) return;
    const startY    = e.clientY;
    const htmlEl    = editorRef.current.querySelector('[data-panel="html"]');
    const cssEl     = editorRef.current.querySelector('[data-panel="css"]');
    const startHtmlH = htmlEl.getBoundingClientRect().height;
    const startCssH  = cssEl.getBoundingClientRect().height;
    const combinedH  = startHtmlH + startCssH;
    const combinedFlex = htmlFlex + cssFlex;
    startDrag(ev => {
      const newHtmlH = Math.max(44, Math.min(combinedH - 44, startHtmlH + (ev.clientY - startY)));
      setHtmlFlex(newHtmlH / combinedH * combinedFlex);
      setCssFlex((combinedH - newHtmlH) / combinedH * combinedFlex);
    });
  }

  function onCssJsDragStart(e) {
    e.preventDefault();
    if (!editorRef.current) return;
    const startY    = e.clientY;
    const cssEl     = editorRef.current.querySelector('[data-panel="css"]');
    const jsEl      = editorRef.current.querySelector('[data-panel="js"]');
    const startCssH  = cssEl.getBoundingClientRect().height;
    const startJsH   = jsEl.getBoundingClientRect().height;
    const combinedH  = startCssH + startJsH;
    const combinedFlex = cssFlex + jsFlex;
    startDrag(ev => {
      const newCssH = Math.max(44, Math.min(combinedH - 44, startCssH + (ev.clientY - startY)));
      setCssFlex(newCssH / combinedH * combinedFlex);
      setJsFlex((combinedH - newCssH) / combinedH * combinedFlex);
    });
  }

  // Library: the index row ({id, title, category}) — nothing here needs the code.
  const activeSn = activeIsCustom
    ? customSnippets.find(x => x.id === activeId)
    : SNIPPET_META.get(activeId);

  const cssHeaderExtra = (
    <div style={{ position: 'static' }} ref={cdnCssPopRef} onClick={e => e.stopPropagation()}>
      <button className={`${s.panelBtn} ${showCdnCss ? s.panelBtnActive : ''}`} onClick={e => { e.stopPropagation(); setShowCdnCss(v => !v); }} title="Add external CSS libraries" style={{ position: 'relative' }}>
        CDN{cdnUrls.filter(u => /\.css(\?.*)?$/.test(u)).length > 0 && <span className={s.cdnCount}>({cdnUrls.filter(u => /\.css(\?.*)?$/.test(u)).length})</span>}
      </button>
      {showCdnCss && (
        <div className={s.cdnPopover}>
          <p className={s.savePopTitle}>CSS Libraries</p>
          <p className={s.cdnDesc}>Paste a CSS CDN URL. Press Enter to add.</p>
          <input className={s.saveInput} value={cdnCssInput} onChange={e => setCdnCssInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { const url = cdnCssInput.trim(); if (url && !cdnUrls.includes(url)) { const next = [...cdnUrls, url]; setCdnUrls(next); cdnUrlsRef.current = next; queuePreview(htmlRef.current, cssRef.current, jsRef.current); } setCdnCssInput(''); } }}
            placeholder="https://cdn.jsdelivr.net/..." autoFocus />
          {cdnUrls.filter(u => /\.css(\?.*)?$/.test(u)).length > 0 && (
            <div className={s.cdnList}>
              {cdnUrls.map((url, i) => /\.css(\?.*)?$/.test(url) ? (
                <div key={i} className={s.cdnItem}>
                  <span className={s.cdnUrl}>{url}</span>
                  <button className={s.cdnCopyBtn} onClick={() => { navigator.clipboard.writeText(url).catch(() => {}); setCopiedCdnUrl(url); setTimeout(() => setCopiedCdnUrl(c => c === url ? null : c), 1200); }} title="Copy URL">
                    {copiedCdnUrl === url ? '✓' : '⧉'}
                  </button>
                  <button className={s.cdnRemoveBtn} onClick={() => { const next = cdnUrls.filter((_,j)=>j!==i); setCdnUrls(next); cdnUrlsRef.current=next; queuePreview(htmlRef.current,cssRef.current,jsRef.current); }} title="Remove">×</button>
                </div>
              ) : null)}
            </div>
          )}
          <div className={s.cdnSuggestions}>
            {[
              { label: 'Bootstrap', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css' },
              { label: 'Font Awesome', url: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css' },
              { label: 'Tailwind', url: 'https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css' },
              { label: 'Animate.css', url: 'https://cdn.jsdelivr.net/npm/animate.css@4/animate.min.css' },
              { label: 'Bulma', url: 'https://cdn.jsdelivr.net/npm/bulma@0.9/css/bulma.min.css' },
              { label: 'normalize', url: 'https://cdn.jsdelivr.net/npm/normalize.css@8/normalize.min.css' },
            ].filter(x => !cdnUrls.includes(x.url)).map(({ label, url }) => (
              <button key={label} className={s.cdnSuggestBtn} onClick={() => { const next=[...cdnUrls,url]; setCdnUrls(next); cdnUrlsRef.current=next; queuePreview(htmlRef.current,cssRef.current,jsRef.current); }}>{label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const jsHeaderExtra = (
    <div style={{ position: 'static', display: 'flex', alignItems: 'center', gap: 4 }} ref={cdnPopRef} onClick={e => e.stopPropagation()}>
      <button className={`${s.panelBtn} ${jsCountdown !== null ? s.panelBtnActive : ''}`} onClick={e => { e.stopPropagation(); runPreview(htmlRef.current, cssRef.current, jsRef.current); }} title="Run JS now">
        {jsCountdown !== null ? `▶ ${jsCountdown}s` : '▶ Run'}
      </button>
      <button className={`${s.panelBtn} ${showCdn ? s.panelBtnActive : ''}`} onClick={e => { e.stopPropagation(); setShowCdn(v => !v); }} title="Add external libraries">
        CDN{cdnUrls.length > 0 && <span className={s.cdnCount}>({cdnUrls.length})</span>}
      </button>
      {showCdn && (
        <div className={s.cdnPopover}>
          <p className={s.savePopTitle}>External Libraries</p>
          <p className={s.cdnDesc}>Paste a CDN URL (JS or CSS). Press Enter to add.</p>
          <input className={s.saveInput} value={cdnInput} onChange={e => setCdnInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { const url = cdnInput.trim(); if (url && !cdnUrls.includes(url)) { const next = [...cdnUrls, url]; setCdnUrls(next); cdnUrlsRef.current = next; queuePreview(htmlRef.current, cssRef.current, jsRef.current); } setCdnInput(''); } }}
            placeholder="https://cdn.jsdelivr.net/..." autoFocus />
          {cdnUrls.length > 0 && <div className={s.cdnList}>{cdnUrls.map((url, i) => (
            <div key={i} className={s.cdnItem}>
              <span className={s.cdnUrl}>{url}</span>
              <button className={s.cdnCopyBtn} onClick={() => { navigator.clipboard.writeText(url).catch(() => {}); setCopiedCdnUrl(url); setTimeout(() => setCopiedCdnUrl(c => c === url ? null : c), 1200); }} title="Copy URL">
                {copiedCdnUrl === url ? '✓' : '⧉'}
              </button>
              <button className={s.cdnRemoveBtn} onClick={() => { const next = cdnUrls.filter((_,j)=>j!==i); setCdnUrls(next); cdnUrlsRef.current=next; queuePreview(htmlRef.current,cssRef.current,jsRef.current); }} title="Remove">×</button>
            </div>
          ))}</div>}
          <div className={s.cdnSuggestions}>
            {[{label:'jQuery',url:'https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js'},{label:'GSAP',url:'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js'},{label:'Alpine.js',url:'https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js'},{label:'Anime.js',url:'https://cdn.jsdelivr.net/npm/animejs@3/lib/anime.min.js'},{label:'React',urls:['https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js','https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js','https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js']},{label:'Lodash',url:'https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js'},{label:'Chart.js',url:'https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js'},{label:'Three.js',url:'https://cdn.jsdelivr.net/npm/three@0.160/build/three.min.js'},{label:'D3',url:'https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js'}]
              .filter(x => x.urls ? !x.urls.every(u => cdnUrls.includes(u)) : !cdnUrls.includes(x.url))
              .map(({label,url,urls}) => (
              <button key={label} className={s.cdnSuggestBtn} title={urls ? 'Adds React, ReactDOM & Babel (for JSX)' : undefined} onClick={() => { const add=(urls||[url]).filter(u=>!cdnUrls.includes(u)); const next=[...cdnUrls,...add]; setCdnUrls(next); cdnUrlsRef.current=next; queuePreview(htmlRef.current,cssRef.current,jsRef.current); }}>{label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Prev / Next / Random in the preview toolbar, spanning the whole library.
  // Mirrors the gallery's own
  // sortOrder so "Next" always advances in the same direction the gallery
  // cards are shown — when sortOrder is 'newest' the gallery reverses
  // VISIBLE_SNIPPETS, so this must reverse the same way or Next/Prev end up
  // backwards from what's on screen.
  //
  // They always follow the sidebar's own list when it contains the open
  // snippet: search, category, tag, Related and sort all applied, exactly as
  // shown there (a filter restored from storage counts too).
  // Otherwise, while "Related" is on, they stay inside the active snippet's
  // category in the sidebar's sort order.
  const sidebarStack = (!activeIsCustom && activeSn && sidebarNav.ids?.includes(activeId))
    ? sidebarNav.ids.map(id => SNIPPET_BY_ID.get(id)).filter(Boolean)
    : null;
  const relatedNavOn = sidebarNav.related && !activeIsCustom && !!activeSn?.category;
  const catSnippets  = (!activeIsCustom && activeSn)
    ? (() => {
        if (sidebarStack) return sidebarStack;
        if (relatedNavOn) {
          const cat = VISIBLE_SNIPPETS.filter(sn => sn.category === activeSn.category);
          return sidebarNav.sort === 'newest' ? [...cat].reverse() : cat;
        }
        const base = VISIBLE_SNIPPETS;
        return sortOrder === 'newest' ? [...base].reverse() : base;
      })()
    : [];
  const randomLabel  = relatedNavOn ? 'Random related snippet'
    : (sidebarStack && sidebarStack.length < VISIBLE_SNIPPETS.length) ? 'Random from this filter'
    : 'Random snippet';
  const catIdx       = catSnippets.findIndex(s => s.id === activeId);
  const prevCatSn    = catIdx > 0 ? catSnippets[catIdx - 1] : null;
  const nextCatSn    = catIdx < catSnippets.length - 1 ? catSnippets[catIdx + 1] : null;

  // Prev / Next across all My Code snippets
  const customSorted  = useMemo(() =>
    savedSortOrder === 'newest'
      ? [...customSnippets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : [...customSnippets].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
  [customSnippets, savedSortOrder]);
  const customIdx     = customSorted.findIndex(s => s.id === activeId);
  const prevCustomSn  = customIdx > 0 ? customSorted[customIdx - 1] : null;
  const nextCustomSn  = customIdx < customSorted.length - 1 ? customSorted[customIdx + 1] : null;

  /* — Render — */
  // Gallery routes (bare /ui-snippets/, a category, a tag) show a grid, not
  // the editor — let the page's own scroll carry it instead of boxing it
  // into a fixed-viewport inner scroll pane on top of the main page scroll.
  // Gallery layout (page scrolls, no fixed-height inner pane) for every grid view:
  // the library gallery / categories / tags AND the My Code saved-snippet grid.
  const galleryMode = !showEditor;
  // Which header section is current: My Code (its gallery, its snippets, a new blank one) or the library.
  const inMyCode = initialView === 'saved' || activeIsCustom || isNewBlank || wantsNew;
  // Code panel stays on the left everywhere, same as My Code.
  const codeRight = false;

  // Snippet / My Code editor on desktop: the header moves into the top of the code
  // column so the preview column (toolbar, ad, preview) starts at the very top.
  // Also while the code panel is collapsed: the header then hides with the column
  // instead of reappearing as a full-width bar, so the layout stays the same.
  const headerInCode = !isMobile && showEditor;
  // Save / Fork / Export / sync. Rendered in the header normally, or in the preview
  // toolbar (left of the device buttons) when the header sits in the code column.
  const headerRightEl = (
        <div className={s.headerRight}>
          {/* Save — update existing or open dialog for new blank */}
          {showEditor && (activeIsCustom || isNewBlank) && (
            <button
              className={`${s.iconBtn} ${s.iconBtnAccent}`}
              onClick={() => isNewBlank ? (setSaveName(''), setShowSave(v => !v), setSaveStatus('')) : updateSnippet()}
              title={isNewBlank ? 'Name and save this snippet' : 'Save changes to this snippet'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save
            </button>
          )}
          {/* Fork & Edit — save your own editable copy, only when a snippet is open */}
          {showEditor && <div className={s.popoverAnchor} ref={savePopRef}>
            <button
              className={s.iconBtn}
              onClick={() => { setSaveName(activeSn?.title || activeSn?.name || ''); setShowSave(v => !v); setSaveStatus(''); }}
              title="Fork this snippet into your own editable copy"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 7.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><line x1="12" y1="11.5" x2="12" y2="16.5"/></svg>
              Fork
            </button>
            {showSave && (
              <div className={s.savePopover}>
                <p className={s.savePopTitle}>Fork &amp; Edit</p>
                <input
                  className={s.saveInput}
                  value={saveName}
                  onChange={e => setSaveName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveSnippet()}
                  placeholder="Name your fork..."
                  autoFocus
                />
                <div className={s.tagLabel}>Tags <span className={s.tagHint}>(optional · Enter to add)</span></div>
                <div className={s.tagInputWrap} onClick={e => e.currentTarget.querySelector('input')?.focus()}>
                  {saveTags.map(tag => (
                    <span key={tag} className={s.tagChip}>
                      {tag}
                      <button className={s.tagChipX} type="button" onClick={() => setSaveTags(t => t.filter(x => x !== tag))}>×</button>
                    </span>
                  ))}
                  <input
                    className={s.tagTextInput}
                    value={saveTagInput}
                    onChange={e => setSaveTagInput(e.target.value)}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || e.key === ',') && saveTagInput.trim()) {
                        e.preventDefault();
                        const tag = saveTagInput.trim().toLowerCase().replace(/,/g, '');
                        if (tag && !saveTags.includes(tag)) setSaveTags(t => [...t, tag]);
                        setSaveTagInput('');
                      }
                      if (e.key === 'Backspace' && !saveTagInput && saveTags.length) {
                        setSaveTags(t => t.slice(0, -1));
                      }
                    }}
                    placeholder={saveTags.length ? '' : 'e.g. dark, form, work...'}
                  />
                </div>
                <div className={s.saveActions}>
                  <button className={s.saveCancelBtn} onClick={() => { setShowSave(false); setSaveTags([]); setSaveTagInput(''); }}>Cancel</button>
                  <button
                    className={s.saveConfirmBtn}
                    onClick={saveSnippet}
                    disabled={!saveName.trim() || saveStatus === 'saving'}
                  >
                    {saveStatus === 'saving' ? 'Forking...' : saveStatus === 'saved' ? '✓ Forked' : 'Fork'}
                  </button>
                </div>
              </div>
            )}
          </div>}

          {!isMobile && showEditor && (
            <>
              <ExportMenu options={exportOptions} />
            </>
          )}

          {/* GitHub sync is shown in My Code only. Kept mounted (just hidden) elsewhere so a save
              started from the library (Fork & Edit etc.) still reaches syncRef.forcePush(). */}
          <span style={{ display: inMyCode ? 'contents' : 'none' }}>
            <GistSyncButton ref={syncRef} toolKey="us" fileName="fwd-ui-snippets.json" description="webdevpuneet.com — UI Snippets" getLocalData={getLocalData} onPullData={onPullData} />
          </span>

          {toast && <span className={s.toast}>{toast}</span>}
        </div>
  );

  const headerEl = (
      <header className={`${s.header} ${headerInCode ? s.headerInCode : ''}`}>
        <div className={s.headerLeft}>
          <a href="/ui-snippets/" className={`${s.headerBrand} ${!inMyCode ? s.headerBrandActive : ''}`}>
            <img src="/icons/ui-snippets.svg" width="20" height="20" alt="" />
            <span className={s.headerTitle}>UI Snippets</span>
          </a>
          <a href="/ui-snippets/mycode/" className={`${s.headerBrand} ${inMyCode ? s.headerBrandActive : ''}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
            <span className={s.headerTitle}>My Code</span>
            {customSnippets.length > 0 && <span className={s.savedCount}>{customSnippets.length}</span>}
          </a>
          <button
            className={s.headerBrand}
            onClick={() => {
              // navStart()'s loading pill only ever hides itself on a pathname
              // change (see NavPill in layout.js) — already being on
              // /ui-snippets/mycode/ means router.push below is a same-URL
              // no-op, so the pill would show and then never get told to hide.
              // Always land on the blank editor, from a snippet, the gallery or My Code:
              // ?new=1 replaces any ?id= so a reload does not reopen the old snippet.
              // navStart()'s pill only hides on a pathname change, so skip it when staying on /mycode/.
              const onMycode = typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/ui-snippets/mycode';
              const onNew = onMycode && new URLSearchParams(window.location.search).get('new') === '1';
              if (!onMycode) navStart();
              applyBlank();
              if (!onNew) router.push('/ui-snippets/mycode/?new=1', { scroll: false });
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span className={s.headerTitle}>{headerInCode ? 'Create snippet' : 'Create'}</span>
          </button>
        </div>
        {/* One row of categories; hover opens a two-column Categories | Tags panel.
            Hidden on the library gallery / category / tag pages, which show their own
            Categories | Tags panel, and when the header sits in the narrow code column.
            An empty slot keeps the header layout unchanged. */}
        <div className={s.headerCats}>
          {(showEditor || sidebarTab !== 'library') && !headerInCode && (
            <CategoryStrip categories={HEADER_CATEGORIES} tags={HEADER_TAGS} activeTag={initialTag} activeCategory={activeIsCustom ? null : (activeSn?.category || (initialCategory !== 'all' ? initialCategory : null))} inHeader panelLeft={headerInCode} />
          )}
        </div>
        {!headerInCode && headerRightEl}
      </header>
  );

  return (
    <div className={`${s.wrap} ${galleryMode ? s.wrapGallery : ''}`} data-uis-gallery={galleryMode ? '' : undefined}>

      {/* — Header — on editor pages (desktop) it sits at the top of the code column instead */}
      {!headerInCode && headerEl}

      {/* — Body — */}
      <div className={`${s.body} ${galleryMode ? s.bodyGallery : ''} ${codeRight ? s.bodyCodeRight : ''}`} ref={bodyRef}>

        {/* — Editor pane — hidden on home — */}
        {!isMobile && showEditor && (
          <>
            {!editorVisible && (
              <button className={s.editorTab} onClick={() => setEditorVisible(true)} title="Show code editor">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points={codeRight ? '15 18 9 12 15 6' : '9 18 15 12 9 6'}/></svg>
                <span className={s.editorTabLabel}>Code</span>
              </button>
            )}
            <div
              className={s.editorPane}
              ref={editorRef}
              style={{ flex: editorVisible ? `0 0 ${editorWidth}px` : undefined, minWidth: editorVisible ? 300 : undefined, display: editorVisible ? 'flex' : 'none' }}
            >
              {headerInCode && headerEl}
              <EditorPanel lang="html" data-panel="html" code={htmlCode} highlight={highlightHTML} onChange={onHtml} onReset={resetHtml} collapsed={htmlCollapsed} onToggle={toggleHtmlPanel} className={`${sidebarTab === 'saved' ? s.panelTopBorder : ''} ${htmlCollapsed ? '' : s.panelFlex}`} flexVal={htmlCollapsed ? undefined : htmlFlex} />
              {!htmlCollapsed && !cssCollapsed && <div className={s.vDragHandle} onMouseDown={onHtmlCssDragStart} title="Drag to resize" />}
              <EditorPanel lang="css"  data-panel="css"  code={cssCode}  highlight={highlightCSS}  onChange={onCss}  onReset={resetCss} collapsed={cssCollapsed}  onToggle={toggleCssPanel}  className={cssCollapsed  ? '' : s.panelFlex} flexVal={cssCollapsed  ? undefined : cssFlex} headerExtra={cssHeaderExtra} />
              {!cssCollapsed && !jsCollapsed && <div className={s.vDragHandle} onMouseDown={onCssJsDragStart} title="Drag to resize" />}
              <EditorPanel lang="js"   data-panel="js"   code={jsCode}   highlight={highlightJS}   onChange={onJs}   onReset={resetJs} collapsed={jsCollapsed}   onToggle={toggleJsPanel}   className={jsCollapsed   ? '' : s.panelFlex} flexVal={jsCollapsed   ? undefined : jsFlex} headerExtra={jsHeaderExtra} />
            </div>
            {editorVisible && <div className={s.dragHandle} onMouseDown={onSplitDragStart} title="Drag to resize" />}
          </>
        )}

        {/* — Preview pane / Gallery — */}
        <div className={s.previewPane} style={isMobile ? {} : galleryMode ? { overflow: 'visible', height: 'auto' } : { flex: 1, overflowY: showEditor ? 'hidden' : 'auto' }}>
          {!showEditor && sidebarTab === 'library' && <UiSnippetsGallery initialCategory={initialCategory} initialTag={initialTag} />}
          {!showEditor && sidebarTab === 'saved' && (
            <SavedGallery
              snippets={customSnippets}
              loaded={customSnippetsLoaded}
              activeId={activeId}
              activeIsCustom={activeIsCustom}
              onSelect={sn => {
                htmlRef.current = sn.html; cssRef.current = sn.css; jsRef.current = sn.js;
                setActiveId(sn.id); setActiveIsCustom(true); setIsNewBlank(false);
                setHtmlCode(sn.html); setCssCode(sn.css); setJsCode(sn.js);
                const u2 = sn.cdnUrls||[]; setCdnUrls(u2); cdnUrlsRef.current=u2;
                setSrcDoc(buildSrcdoc(sn.html, sn.css, sn.js, u2));
                setShowEditor(true);
                router.push(`/ui-snippets/mycode/?id=${sn.id}`, { scroll: false });
              }}
              onDelete={sn => setConfirmDelete({ id: sn.id, name: sn.name })}
              onCreateNew={() => {
                htmlRef.current = ''; cssRef.current = ''; jsRef.current = '';
                setHtmlCode(''); setCssCode(''); setJsCode('');
                setSrcDoc(buildSrcdoc('', '', ''));
                setActiveId(null); setActiveIsCustom(false);
                setIsNewBlank(true); setShowEditor(true);
              }}
              onExploreLibrary={() => {
                setSidebarTab('library');
                router.push('/ui-snippets/', { scroll: false });
              }}
            />
          )}
          {showEditor && isMobile && (
            <div className={s.mobileEditors}>
              <EditorPanel lang="html" code={htmlCode} highlight={highlightHTML} onChange={onHtml} onReset={resetHtml} collapsed={htmlCollapsed} onToggle={toggleHtmlPanel} className={sidebarTab === 'saved' ? s.panelTopBorder : ''} />
              <EditorPanel lang="css"  code={cssCode}  highlight={highlightCSS}  onChange={onCss}  onReset={resetCss}  collapsed={cssCollapsed}  onToggle={toggleCssPanel} headerExtra={cssHeaderExtra} />
              <EditorPanel lang="js"   code={jsCode}   highlight={highlightJS}   onChange={onJs}   onReset={resetJs}   collapsed={jsCollapsed}   onToggle={toggleJsPanel} headerExtra={jsHeaderExtra} />
            </div>
          )}
          {showEditor && <div className={s.previewHeader}>
            {/* Everything but the action menus scrolls sideways in one row when space is
                short; Fork / Export stay pinned outside so their menus aren't clipped. */}
            <div className={s.previewScroll}>
            <span className={s.previewLabel}>Preview</span>
            <div className={s.previewDeviceBtns}>
              <button className={`${s.deviceBtn} ${previewMode === 'mobile'  ? s.deviceBtnActive : ''}`} onClick={() => setPreviewMode('mobile')}  title="Mobile (375px)">
                <svg width="11" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              </button>
              <button className={`${s.deviceBtn} ${previewMode === 'tablet'  ? s.deviceBtnActive : ''}`} onClick={() => setPreviewMode('tablet')}  title="Tablet (768px)">
                <svg width="13" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="2" width="18" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              </button>
              <button className={`${s.deviceBtn} ${previewMode === 'desktop' ? s.deviceBtnActive : ''}`} onClick={() => setPreviewMode('desktop')} title="Desktop (full)">
                <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </button>
              <button
                className={`${s.deviceBtn} ${isMaximized ? s.deviceBtnActive : ''}`}
                onClick={toggleMaximize}
                title={isMaximized ? 'Restore panels' : 'Maximise preview'}
              >
                {isMaximized ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
                    <line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                )}
              </button>
              <button
                className={s.deviceBtn}
                onClick={() => {
                  const blob = new Blob([srcDoc], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const win = window.open(url, '_blank', 'width=' + screen.width + ',height=' + screen.height);
                  if (win) { win.addEventListener('load', () => URL.revokeObjectURL(url)); }
                }}
                title="Pop out preview in new window"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </button>
            </div>
            <button
              className={`${s.iconBtn} ${s.refreshBtn}`}
              onClick={() => setPreviewKey(k => k + 1)}
              title="Refresh preview — click if nothing appears"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Refresh
            </button>

            {/* — My Code prev / next — */}
            {activeIsCustom && customSorted.length > 0 && (
              <div className={s.previewNav}>
                <a
                  className={s.navBtn}
                  href="/ui-snippets/mycode/"
                  aria-label="All My Code snippets"
                  data-tip="All My Code snippets"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </a>
                {prevCustomSn ? (
                  <a
                    className={`${s.navBtn} ${s.navBtnLabeled}`}
                    href={`/ui-snippets/mycode/?id=${prevCustomSn.id}`}
                    aria-label={`Previous: ${prevCustomSn.name}`}
                    data-tip={prevCustomSn.name}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    <span className={s.navBtnText}>Prev</span>
                  </a>
                ) : (
                  <button className={`${s.navBtn} ${s.navBtnLabeled}`} disabled aria-label="No previous" data-tip="No previous">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    <span className={s.navBtnText}>Prev</span>
                  </button>
                )}
                {nextCustomSn ? (
                  <a
                    className={`${s.navBtn} ${s.navBtnLabeled}`}
                    href={`/ui-snippets/mycode/?id=${nextCustomSn.id}`}
                    aria-label={`Next: ${nextCustomSn.name}`}
                    data-tip={nextCustomSn.name}
                  >
                    <span className={s.navBtnText}>Next</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                ) : (
                  <button className={`${s.navBtn} ${s.navBtnLabeled}`} disabled aria-label="No next" data-tip="No next">
                    <span className={s.navBtnText}>Next</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                )}
              </div>
            )}

            {/* — Library prev / next — */}
            {!activeIsCustom && activeSn && (
              <div className={s.previewNav}>
                <a
                  className={s.navBtn}
                  href="/ui-snippets/"
                  aria-label="All UI snippets"
                  data-tip="All UI snippets"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </a>
                {catSnippets.length > 1 && prevCatSn ? (
                  <a
                    className={`${s.navBtn} ${s.navBtnLabeled}`}
                    href={`/ui-snippets/${prevCatSn.id}/`}
                    aria-label={`Previous: ${prevCatSn.title}`}
                    data-tip={prevCatSn.title}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    <span className={s.navBtnText}>Prev</span>
                  </a>
                ) : (
                  <button className={`${s.navBtn} ${s.navBtnLabeled}`} disabled aria-label="No previous" data-tip="No previous">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                    <span className={s.navBtnText}>Prev</span>
                  </button>
                )}
                {nextCatSn ? (
                  <a
                    className={`${s.navBtn} ${s.navBtnLabeled}`}
                    href={`/ui-snippets/${nextCatSn.id}/`}
                    aria-label={`Next: ${nextCatSn.title}`}
                    data-tip={nextCatSn.title}
                  >
                    <span className={s.navBtnText}>Next</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                ) : (
                  <button className={`${s.navBtn} ${s.navBtnLabeled}`} disabled aria-label="No next" data-tip="No next">
                    <span className={s.navBtnText}>Next</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                )}
                <button
                  className={`${s.navBtn} ${s.navBtnLabeled}`}
                  onClick={() => {
                    if (!catSnippets.length) return;
                    const others = catSnippets.filter(sn => sn.id !== activeId);
                    const pool = others.length ? others : catSnippets;
                    const pick = pool[Math.floor(Math.random() * pool.length)];
                    window.location.href = `/ui-snippets/${pick.id}/`;
                  }}
                  aria-label={randomLabel}
                  data-tip={randomLabel}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                  <span className={s.navBtnText}>Random</span>
                </button>
              </div>
            )}

            </div>
            {headerInCode && <div className={s.previewActions}>{headerRightEl}</div>}
            <div className={s.previewBtns}>
              <ExportMenu options={exportOptions} />
            </div>
          </div>}
          {/* AdSense leaderboard (slot 7360198340) directly below the Preview toolbar, above the preview —
              970x90 / 728x90 / 468x60 / 320x50 by available width, library snippets only.
              Collapses when unfilled (.adBar:has(ins[data-ad-status="unfilled"])). */}
          {showEditor && !inMyCode && (
            <div className={s.adBar} aria-label="Advertisement">
              {ADS_ENABLED ? <SnippetTopAd key={activeId || 'none'} /> : (
                <div className={s.adBarSlot}>
                  <span className={s.adBarLabel}>Ad space</span>
                  <span className={s.adBarSize}>728 × 90</span>
                </div>
              )}
            </div>
          )}
          {showEditor && <div className={s.previewStage}>
          <div className={s.iframeWrap}>
            {!previewVisible && (
              <div className={s.previewLoading}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spinCCW 0.6s linear infinite' }}>
                  <path d="M4.5 9A8 8 0 0 1 19 8"/>
                  <path d="M19.5 15A8 8 0 0 1 5 16"/>
                  <path d="M19 5v4h-4"/>
                  <path d="M5 19v-4h4"/>
                </svg>
                <span>Loading preview…</span>
              </div>
            )}
            <iframe
              key={previewKey}
              className={s.iframe}
              srcDoc={srcDoc}
              title="Preview"
              sandbox="allow-scripts allow-forms"
              style={{
                ...(previewMode === 'mobile' ? { width: '375px' } : previewMode === 'tablet' ? { width: '768px' } : {}),
                visibility: previewVisible ? 'visible' : 'hidden',
              }}
            />
          </div>
          </div>}
          {showEditor && (
            <div className={`${s.consolePanel} ${consoleOpen ? s.consolePanelOpen : ''}`}>
              <div className={s.consoleBar} onClick={() => setConsoleOpen(v => !v)}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                <span className={s.consoleBarLabel}>Console</span>
                {(activeSn?.title || activeSn?.name) && (
                  <span className={s.consoleBarTitle} title={activeSn.title || activeSn.name}>{activeSn.title || activeSn.name}</span>
                )}
                {consoleLogs.filter(l => l.level === 'error').length > 0 && <span className={s.consoleBadge} data-level="error">{consoleLogs.filter(l => l.level === 'error').length}</span>}
                {consoleLogs.filter(l => l.level === 'warn').length > 0 && <span className={s.consoleBadge} data-level="warn">{consoleLogs.filter(l => l.level === 'warn').length}</span>}
                {consoleLogs.filter(l => l.level === 'log' || l.level === 'info').length > 0 && <span className={s.consoleBadge} data-level="log">{consoleLogs.filter(l => l.level === 'log' || l.level === 'info').length}</span>}
                <span className={s.consoleBarChevron} style={{ transform: consoleOpen ? 'rotate(180deg)' : 'none' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                </span>
                {consoleLogs.length > 0 && (
                  <button className={s.consoleClearBtn} onClick={e => { e.stopPropagation(); setConsoleLogs([]); }} title="Clear console">Clear</button>
                )}
              </div>
              {consoleOpen && (
                <div className={s.consoleOutput}>
                  {consoleLogs.length === 0 && <span className={s.consoleEmpty}>No output yet</span>}
                  {consoleLogs.map(entry => (
                    <div key={entry.id} className={`${s.consoleLine} ${s['consoleLevel_' + entry.level]}`}>
                      <span className={s.consolePrefix}>{entry.level === 'error' ? '✕' : entry.level === 'warn' ? '⚠' : entry.level === 'info' ? 'ℹ' : '›'}</span>
                      <span className={s.consoleText}>{entry.args.join(' ')}</span>
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* — Confirm delete dialog — */}
      {confirmDelete && (
        <ConfirmDialog
          message={`Delete "${confirmDelete.name}"?`}
          onConfirm={() => { deleteCustomSnippet(confirmDelete.id); setConfirmDelete(null); }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* — Test Exports lightbox opened from the Export dropdown — */}
      {showEditor && (
        <ExportTester hideButton open={testerOpen} onOpenChange={setTesterOpen} html={htmlCode} css={cssCode} js={jsCode} title={activeSn?.title || activeSn?.name || 'Snippet'} cdnUrls={cdnUrls} />
      )}

      {/* — Embed modal — only ever opened for library snippets (see exportOptions) — */}
      {embedModalOpen && !activeIsCustom && activeSn && (
        <EmbedModal
          slug={activeId}
          title={activeSn.title || activeSn.name || 'Snippet'}
          onClose={() => setEmbedModalOpen(false)}
        />
      )}

    </div>
  );
}

