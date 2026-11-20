'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import DevGeneratorsTopNav from '@/components/DevGeneratorsTopNav';

/* Mermaid is loaded from a CDN the first time the page opens (about 2.5 MB, then cached by the browser), so it never
   weighs down the rest of the site. Pinned to one version so the syntax a visitor tests stays stable. */
const MERMAID_SRC = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
const STORE_KEY = 'wdp-mermaid-code-v1';

const TEMPLATES = [
  { id: 'flow', name: 'Flowchart', code: `flowchart TD
    A[Visitor lands on page] --> B{Signed in?}
    B -- Yes --> C[Show dashboard]
    B -- No --> D[Show sign-up form]
    D --> E[Create account]
    E --> C
    C --> F((Done))` },
  { id: 'sequence', name: 'Sequence diagram', code: `sequenceDiagram
    autonumber
    participant U as User
    participant W as Web app
    participant A as API
    U->>W: Click "Pay now"
    W->>A: POST /checkout
    A-->>W: 200 OK (order id)
    W-->>U: Show confirmation
    Note over W,A: The token is checked on every call` },
  { id: 'class', name: 'Class diagram', code: `classDiagram
    class Order {
      +int id
      +Date createdAt
      +total() float
    }
    class Customer {
      +string name
      +string email
    }
    class Item {
      +string sku
      +float price
    }
    Customer "1" --> "many" Order : places
    Order "1" --> "many" Item : contains` },
  { id: 'state', name: 'State diagram', code: `stateDiagram-v2
    [*] --> Draft
    Draft --> Review : submit
    Review --> Draft : changes requested
    Review --> Published : approve
    Published --> Archived : retire
    Archived --> [*]` },
  { id: 'er', name: 'ER diagram', code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "appears in"
    CUSTOMER {
      int id PK
      string name
      string email
    }
    ORDER {
      int id PK
      date created
    }` },
  { id: 'gantt', name: 'Gantt chart', code: `gantt
    title Website launch plan
    dateFormat  YYYY-MM-DD
    section Design
    Wireframes      :done,    d1, 2026-12-01, 5d
    Visual design   :active,  d2, after d1, 7d
    section Build
    Front end       :         b1, after d2, 10d
    Back end        :         b2, after d2, 12d
    section Launch
    Testing         :         t1, after b2, 5d
    Go live         :milestone, after t1, 0d` },
  { id: 'pie', name: 'Pie chart', code: `pie showData
    title Where visitors come from
    "Search" : 52
    "Social" : 21
    "Direct" : 17
    "Email" : 10` },
  { id: 'mindmap', name: 'Mind map', code: `mindmap
  root((Launch plan))
    Product
      Features
      Pricing
    Marketing
      Blog posts
      Social posts
      Email series
    Support
      Help centre
      Chat` },
  { id: 'journey', name: 'User journey', code: `journey
    title Buying a template
    section Discover
      Search on Google: 4: Visitor
      Open the template page: 5: Visitor
    section Decide
      Try the live preview: 5: Visitor
      Compare options: 3: Visitor
    section Buy
      Check out: 3: Visitor
      Download files: 5: Visitor` },
  { id: 'git', name: 'Git graph', code: `gitGraph
    commit id: "start"
    branch feature
    checkout feature
    commit id: "add form"
    commit id: "add tests"
    checkout main
    merge feature
    commit id: "release"` },
];

const THEMES = [
  { id: 'default', name: 'Default' },
  { id: 'neutral', name: 'Neutral' },
  { id: 'forest', name: 'Forest' },
  { id: 'dark', name: 'Dark' },
  { id: 'base', name: 'Base (clean)' },
];

const BACKGROUNDS = [
  { id: 'white', name: 'White', value: '#ffffff' },
  { id: 'transparent', name: 'Transparent', value: 'transparent' },
  { id: 'dark', name: 'Dark', value: '#0f172a' },
];

function loadMermaid() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.mermaid) return Promise.resolve(window.mermaid);
  if (window.__wdpMermaidLoading) return window.__wdpMermaidLoading;
  window.__wdpMermaidLoading = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = MERMAID_SRC;
    el.async = true;
    el.onload = () => (window.mermaid ? resolve(window.mermaid) : reject(new Error('Mermaid did not start')));
    el.onerror = () => { window.__wdpMermaidLoading = null; reject(new Error('Could not load the Mermaid library. Check your connection and try again.')); };
    document.head.appendChild(el);
  });
  return window.__wdpMermaidLoading;
}

/* the share link keeps the diagram in the URL hash, so nothing is stored on a server */
function encodeShare(code) {
  try { return btoa(unescape(encodeURIComponent(code))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); } catch (e) { return ''; }
}
function decodeShare(str) {
  try {
    const b = str.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(escape(atob(b + '==='.slice((b.length + 3) % 4))));
  } catch (e) { return ''; }
}

/* AI answers come wrapped in a fenced block (three backticks, the word mermaid, the code, three backticks). Take the
   fence off when the whole text is one fenced block, so a straight paste just works. */
function stripFence(text) {
  const m = /^\s*(?:`{3}|~{3})\s*mermaid[^\n]*\n([\s\S]*?)\n?\s*(?:`{3}|~{3})\s*$/i.exec(text);
  return m ? m[1] : text;
}

const DIRECTIONS = [['TD', 'Top to bottom'], ['LR', 'Left to right'], ['BT', 'Bottom to top'], ['RL', 'Right to left']];
function flowDirection(code) {
  const m = /^(\s*(?:flowchart|graph)\s+)(TD|TB|LR|RL|BT)\b/m.exec(code);
  return m ? (m[2] === 'TB' ? 'TD' : m[2]) : '';
}
function setFlowDirection(code, dir) {
  return code.replace(/^(\s*(?:flowchart|graph)\s+)(TD|TB|LR|RL|BT)\b/m, '$1' + dir);
}

function download(name, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* The parser says "Parse error on line 4:" - pull the line number out so the editor can point at it */
function errorLine(msg) {
  const m = /line (\d+)/i.exec(msg || '');
  return m ? Number(m[1]) : 0;
}
function friendlyError(msg) {
  const m = String(msg || '').replace(/\s+/g, ' ');
  if (/No diagram type detected|UnknownDiagramError/i.test(m)) return 'Mermaid could not tell what kind of diagram this is. The first line must name it, for example flowchart TD, sequenceDiagram, classDiagram, erDiagram, gantt, pie or mindmap.';
  if (/Parse error|Lexical error/i.test(m)) return 'Syntax problem: ' + m.replace(/^.*?(Parse error|Lexical error)/i, '$1').slice(0, 220);
  return m.slice(0, 260) || 'Mermaid could not draw this diagram.';
}

export default function MermaidEditorTool() {
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [theme, setTheme] = useState('default');
  const [bg, setBg] = useState('white');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [errLine, setErrLine] = useState(0);
  const [ready, setReady] = useState(false);
  const [loadErr, setLoadErr] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [note, setNote] = useState('');
  const [full, setFull] = useState(false);
  const fileRef = useRef(null);
  const idRef = useRef(0);
  const noteTimer = useRef(0);
  const dragRef = useRef(null);
  const taRef = useRef(null);
  const gutterRef = useRef(null);

  /* first load: a shared link wins, then the last diagram this browser kept */
  useEffect(() => {
    try {
      const h = window.location.hash.replace(/^#/, '');
      if (h.startsWith('d=')) {
        const c = decodeShare(h.slice(2));
        if (c) { setCode(c); return; }
      }
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) setCode(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    let live = true;
    loadMermaid().then(() => { if (live) setReady(true); }).catch(e => { if (live) setLoadErr(e.message); });
    return () => { live = false; };
  }, []);

  /* draw (debounced) whenever the code or theme changes */
  useEffect(() => {
    if (!ready) return undefined;
    try { localStorage.setItem(STORE_KEY, code); } catch (e) {}
    const my = ++idRef.current;
    const t = setTimeout(async () => {
      const m = window.mermaid;
      if (!code.trim()) { setSvg(''); setError(''); setErrLine(0); return; }
      try {
        m.initialize({ startOnLoad: false, theme, securityLevel: 'strict', flowchart: { htmlLabels: false }, fontFamily: 'trebuchet ms, verdana, arial, sans-serif' });
        const out = await m.render('wdp-mmd-' + my, code);
        if (my !== idRef.current) return;
        setSvg(out.svg); setError(''); setErrLine(0);
      } catch (e) {
        if (my !== idRef.current) return;
        const msg = (e && e.message) || String(e);
        setError(friendlyError(msg)); setErrLine(errorLine(msg));
      } finally {
        const leftover = document.getElementById('dwdp-mmd-' + my);
        if (leftover) leftover.remove();
      }
    }, 350);
    return () => clearTimeout(t);
  }, [code, theme, ready]);

  useEffect(() => {
    if (!full) return undefined;
    const onKey = e => { if (e.key === 'Escape') setFull(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [full]);

  function flash(t) {
    setNote(t);
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setNote(''), 2200);
  }

  const lineCount = useMemo(() => code.split('\n').length, [code]);

  function onScroll() { if (gutterRef.current && taRef.current) gutterRef.current.scrollTop = taRef.current.scrollTop; }

  function onCodeChange(value) { setCode(stripFence(value)); }

  function onKeyDown(e) {
    if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      const ta = e.target, a = ta.selectionStart, b = ta.selectionEnd;
      const next = code.slice(0, a) + '  ' + code.slice(b);
      setCode(next);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = a + 2; });
    }
  }

  function onFile(e) {
    const f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!f) return;
    if (f.size > 1024 * 1024) { flash('That file is over 1 MB.'); return; }
    const r = new FileReader();
    r.onload = () => { setCode(stripFence(String(r.result || ''))); resetView(); flash('Opened ' + f.name); };
    r.readAsText(f);
  }

  function downloadCode() { download('diagram.mmd', new Blob([code], { type: 'text/plain;charset=utf-8' })); }

  function copyFixPrompt() {
    const prompt = 'This Mermaid diagram fails to render. Fix the syntax and return only the corrected code in a mermaid code block. Keep the same meaning and labels.\n\nError: ' + error + '\n\nCode:\n```mermaid\n' + code + '\n```';
    copyText(prompt, 'Fix prompt copied. Paste it into your AI assistant.');
  }

  const dir = useMemo(() => flowDirection(code), [code]);

  function pickTemplate(id) {
    const t = TEMPLATES.find(x => x.id === id);
    if (t) { setCode(t.code); setZoom(1); setPan({ x: 0, y: 0 }); }
  }

  /* ---- exports ---- */
  const bgValue = (BACKGROUNDS.find(b => b.id === bg) || BACKGROUNDS[0]).value;

  function sizedSvg() {
    /* the SVG that Mermaid returns has width 100% and a viewBox; give it a pixel size so image exports are not tiny */
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    const el = doc.documentElement;
    const vb = (el.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    const w = vb[2] || 800, h = vb[3] || 600;
    el.setAttribute('width', String(Math.ceil(w)));
    el.setAttribute('height', String(Math.ceil(h)));
    el.removeAttribute('style');
    if (bgValue !== 'transparent') {
      const rect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', vb[0] || 0); rect.setAttribute('y', vb[1] || 0);
      rect.setAttribute('width', String(w)); rect.setAttribute('height', String(h));
      rect.setAttribute('fill', bgValue);
      el.insertBefore(rect, el.firstChild);
    }
    return { text: new XMLSerializer().serializeToString(el), w, h };
  }

  function exportSvg() {
    if (!svg) return;
    const { text } = sizedSvg();
    download('diagram.svg', new Blob(['<?xml version="1.0" encoding="UTF-8"?>\n' + text], { type: 'image/svg+xml;charset=utf-8' }));
  }
  function exportPng(scale) {
    if (!svg) return;
    const { text, w, h } = sizedSvg();
    const img = new Image();
    img.onload = () => {
      const maxSide = 8000;
      const k = Math.min(scale, maxSide / Math.max(w, h));
      const c = document.createElement('canvas');
      c.width = Math.round(w * k); c.height = Math.round(h * k);
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => { if (b) download('diagram.png', b); else flash('Could not make the PNG here. Try SVG.'); }, 'image/png');
    };
    img.onerror = () => flash('Could not make the PNG here. Try SVG.');
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text);
  }
  function copyText(text, msg) {
    try { navigator.clipboard.writeText(text).then(() => flash(msg), () => flash('Copy is blocked here.')); } catch (e) { flash('Copy is blocked here.'); }
  }
  function copyShare() {
    const url = window.location.origin + window.location.pathname + '#d=' + encodeShare(code);
    try { window.history.replaceState(null, '', '#d=' + encodeShare(code)); } catch (e) {}
    copyText(url, 'Share link copied. Anyone who opens it sees this diagram.');
  }
  function copyMarkdown() { copyText('```mermaid\n' + code + '\n```', 'Copied as a Markdown code block (works on GitHub and in Notion).'); }

  /* ---- zoom and pan ---- */
  const onWheel = useCallback(e => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom(z => Math.min(4, Math.max(0.2, z * (e.deltaY < 0 ? 1.1 : 0.9))));
  }, []);
  function onDown(e) {
    if (e.target.closest('button')) return;
    dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onMove(e) {
    const d = dragRef.current;
    if (!d) return;
    setPan({ x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y });
  }
  function onUp() { dragRef.current = null; }
  function resetView() { setZoom(1); setPan({ x: 0, y: 0 }); }

  return (
    <div className={s.wrap} style={{ '--accent': '#ff3670' }}>
      <DevGeneratorsTopNav active="mermaid-diagram-editor" />
      <div className={s.header}>
        <div className={s.logo}><span className={s.logoIcon}>M</span><span>Mermaid <span className={s.accent}>Live Editor</span></span></div>
        <div className={s.headerRight}>
          {note && <span className={s.note} role="status">{note}</span>}
          <span className={s.hint}>Runs in your browser. Your diagram is not uploaded.</span>
        </div>
      </div>

      <div className={s.toolbar}>
        <label className={s.tb}><span>Start from</span>
          <select value="" onChange={e => pickTemplate(e.target.value)} aria-label="Start from a template">
            <option value="" disabled>Pick a diagram type...</option>
            {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </label>
        <label className={s.tb}><span>Theme</span>
          <select value={theme} onChange={e => { const v = e.target.value; setTheme(v); if (v === 'dark') setBg('dark'); else if (bg === 'dark') setBg('white'); }} aria-label="Diagram theme">
            {THEMES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </label>
        {dir && (
          <label className={s.tb}><span>Flow direction</span>
            <select value={dir} onChange={e => setCode(setFlowDirection(code, e.target.value))} aria-label="Flowchart direction">
              {DIRECTIONS.map(([v, n]) => <option key={v} value={v}>{n}</option>)}
            </select>
          </label>
        )}
        <label className={s.tb}><span>Export background</span>
          <select value={bg} onChange={e => setBg(e.target.value)} aria-label="Export background">
            {BACKGROUNDS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </label>
        <div className={s.btns}>
          <button type="button" onClick={() => fileRef.current && fileRef.current.click()} title="Open a .mmd, .md or .txt file">Open file</button>
          <button type="button" onClick={downloadCode} disabled={!code.trim()} title="Download the Mermaid code as a .mmd file">Save .mmd</button>
          <input ref={fileRef} type="file" accept=".mmd,.mermaid,.md,.txt,text/*" hidden onChange={onFile} />
          <button type="button" onClick={exportSvg} disabled={!svg}>SVG</button>
          <button type="button" onClick={() => exportPng(2)} disabled={!svg}>PNG</button>
          <button type="button" onClick={() => exportPng(4)} disabled={!svg} title="Large PNG, 4x">PNG 4x</button>
          <button type="button" onClick={() => copyText(svg ? sizedSvg().text : '', 'SVG code copied.')} disabled={!svg}>Copy SVG</button>
          <button type="button" onClick={copyMarkdown} disabled={!code.trim()}>Copy for Markdown</button>
          <button type="button" className={s.primary} onClick={copyShare} disabled={!code.trim()}>Share link</button>
        </div>
      </div>

      <div className={s.main}>
        <section className={s.editor} aria-label="Mermaid code">
          <div className={s.paneHead}><span>Mermaid code</span><span className={s.count}>{lineCount} line{lineCount === 1 ? '' : 's'}</span></div>
          <div className={s.codeBox}>
            <div className={s.gutter} ref={gutterRef} aria-hidden="true">
              {Array.from({ length: lineCount }, (_, i) => <div key={i} className={errLine === i + 1 ? s.gutBad : ''}>{i + 1}</div>)}
            </div>
            <textarea
              ref={taRef}
              className={s.ta}
              value={code}
              onChange={e => onCodeChange(e.target.value)}
              onKeyDown={onKeyDown}
              onScroll={onScroll}
              spellCheck={false}
              wrap="off"
              placeholder={'Paste Mermaid code here, for example:\nflowchart LR\n  A --> B'}
              aria-label="Mermaid diagram code"
            />
          </div>
          {error && (
            <div className={s.error} role="alert">
              <strong>{errLine ? 'Problem near line ' + errLine : 'Problem'}</strong>
              <span>{error}</span>
              <button type="button" className={s.fixBtn} onClick={copyFixPrompt}>Copy fix prompt for your AI</button>
            </div>
          )}
        </section>

        <section className={`${s.preview} ${full ? s.previewFull : ''}`} aria-label="Diagram preview">
          <div className={s.paneHead}>
            <span>Preview</span>
            <div className={s.zoomBtns}>
              <button type="button" onClick={() => setZoom(z => Math.max(0.2, z / 1.2))} aria-label="Zoom out">-</button>
              <span className={s.zoomVal}>{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom(z => Math.min(4, z * 1.2))} aria-label="Zoom in">+</button>
              <button type="button" onClick={resetView}>Reset</button>
              <button type="button" onClick={() => setFull(v => !v)} aria-pressed={full}>{full ? 'Exit full screen' : 'Full screen'}</button>
            </div>
          </div>
          <div
            className={s.stage}
            style={{ background: bgValue === 'transparent' ? undefined : bgValue }}
            data-transparent={bgValue === 'transparent' ? '' : undefined}
            onWheel={onWheel}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            {!ready && !loadErr && <div className={s.msg}>Loading the diagram engine...</div>}
            {loadErr && <div className={s.msg}>{loadErr}</div>}
            {ready && !svg && !error && <div className={s.msg}>Type some Mermaid code on the left, or pick a diagram type above.</div>}
            {svg && (
              <div className={s.canvas} style={{ transform: 'translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom + ')' }} dangerouslySetInnerHTML={{ __html: svg }} />
            )}
            {error && svg && <div className={s.stale}>Showing the last working version</div>}
          </div>
          <div className={s.tip}>Drag to move. Hold Ctrl (or Cmd) and scroll to zoom.</div>
        </section>
      </div>
    </div>
  );
}
