'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

import {
  toHtmlFile,
  toReactComponent,
  toTailwindComponent,
  toTailwindHtml,
  toVueSfc,
  toAngularComponent,
  componentName,
  angularSelector,
  cdnTagsHtml,
} from '@/lib/snippet-exporters';
import { CONSOLE_BRIDGE, buildPreviewSrcdoc } from '@/lib/snippet-preview';

// ── srcdoc builder for preview iframes ──────────────────────────────────────────
// buildPreviewSrcdoc/CONSOLE_BRIDGE live in src/lib/snippet-preview.js so the
// standalone embed page (src/app/ui-snippets/[slug]/embed/page.js) can render
// a snippet identically without pulling in this whole client component.

// Shared in-iframe error UI for framework previews (shown when the runtime CDN
// fails to load or the component won't compile/run).
const PREVIEW_ERR_CSS = '.preview-err{padding:18px 20px;font:13px/1.55 system-ui,sans-serif;color:#57606a}.preview-err strong{display:block;color:#cf222e;font-size:13px;margin-bottom:6px}.preview-err pre{margin:6px 0 12px;padding:10px 12px;background:#fff1f0;border:1px solid #ffccc7;border-radius:6px;color:#a8071a;font:12px/1.5 monospace;white-space:pre-wrap;word-break:break-word}.preview-err button{font:600 12px system-ui;padding:6px 13px;border:1px solid #d0d7de;border-radius:6px;background:#f6f8fa;color:#24292f;cursor:pointer}.preview-err button:hover{background:#eaeef2}';

// JS string expression that builds the error markup inside the iframe.
// `e` must be in scope where this is interpolated.
const PREVIEW_ERR_HTML = `'<div class="preview-err"><strong>Preview could not run</strong><pre>' + String((e && e.message) || e) + '</pre><button onclick="location.reload()">Reload preview</button></div>'`;

// Escapes a literal </script> so it can be safely embedded inside an inline <script>.
function esc(str) {
  return String(str).replace(/<\/script>/gi, '<\\/script>');
}

// ── Lightweight syntax highlighter (light theme) ────────────────────────────────
// One left-to-right pass over a master regex, so string/comment interiors are
// never re-tokenized. Handles HTML / JSX / Vue / TS well enough for a preview.
const HL = {
  comment: '#6e7781',
  string:  '#0a3069',
  keyword: '#cf222e',
  number:  '#0550ae',
  tag:     '#116329',
  attr:    '#0550ae',
  fn:      '#8250df',
};
const HL_KEYWORDS = 'import|from|export|default|function|return|const|let|var|if|else|for|while|switch|case|break|continue|new|class|extends|implements|interface|typeof|instanceof|await|async|void|null|undefined|true|false|this|super|in|of|public|private|protected|readonly|static|enum|type';

function escapeHtmlText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightCode(code) {
  const re = new RegExp(
    '(<!--[\\s\\S]*?-->|/\\*[\\s\\S]*?\\*/|//[^\\n]*)' +                        // 1 comment
    '|(\'(?:[^\'\\\\]|\\\\.)*\'|"(?:[^"\\\\]|\\\\.)*"|`(?:[^`\\\\]|\\\\.)*`)' +  // 2 string
    '|(</?[A-Za-z][\\w.-]*)' +                                                   // 3 tag/component
    '|\\b(' + HL_KEYWORDS + ')\\b' +                                            // 4 keyword
    '|\\b([A-Za-z_$][\\w$]*)(?=\\s*\\()' +                                      // 5 function call
    '|\\b([a-zA-Z_:][\\w:-]*)(?=\\s*=)' +                                       // 6 attribute / prop
    '|\\b(\\d+\\.?\\d*)\\b',                                                     // 7 number
    'g'
  );
  let out = '', last = 0, m;
  while ((m = re.exec(code)) !== null) {
    out += escapeHtmlText(code.slice(last, m.index));
    const color = m[1] ? HL.comment : m[2] ? HL.string : m[3] ? HL.tag
      : m[4] ? HL.keyword : m[5] ? HL.fn : m[6] ? HL.attr : HL.number;
    const italic = m[1] ? 'font-style:italic;' : '';
    out += `<span style="color:${color};${italic}">${escapeHtmlText(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  out += escapeHtmlText(code.slice(last));
  return out;
}

// React / React + Tailwind — runs the exported component through in-browser Babel.
// We compile EXPLICITLY (rather than a <script type="text/babel"> auto-scan) so every
// failure path — CDN didn't load, JSX won't compile, component throws at runtime — is
// caught, logged to the console panel, and shown in-pane with a Reload button. The
// silent auto-scan just leaves a blank pane when Babel doesn't load.
function buildReactPreview(componentCode, useTailwind = false, cdnUrls = []) {
  // Strip ES module syntax + the dependency comment so the code runs as a plain script.
  let body = componentCode
    .replace(/^\/\/[^\n]*\n/gm, '')
    .replace(/^\s*import[^\n]*\n/gm, '')
    .replace(/export\s+default\s+function/, 'function');
  const m = body.match(/function\s+([A-Za-z0-9_$]+)\s*\(/);
  const name = m ? m[1] : 'Component';
  const tw = useTailwind ? '<script src="https://cdn.tailwindcss.com"><\/script>' : '';
  const cdn = cdnTagsHtml(cdnUrls, '');
  const src = `const { useState, useEffect, useRef, useCallback, useMemo, useReducer } = React;
${body}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${name}));`;
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
${CONSOLE_BRIDGE}
<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" onerror="window.__cdnFail='React'"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" onerror="window.__cdnFail='ReactDOM'"><\/script>
<script src="https://unpkg.com/@babel/standalone@7.26.4/babel.min.js" onerror="window.__cdnFail='Babel'"><\/script>
${tw}
${cdn}
<style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#fff}#root{display:contents}${PREVIEW_ERR_CSS}</style>
</head><body>
<div id="root"></div>
<script type="text/plain" id="__src">${esc(src)}</script>
<script>
window.addEventListener('load', function () {
  var root = document.getElementById('root');
  try {
    if (window.__cdnFail) throw new Error(window.__cdnFail + ' failed to load from the CDN (network issue).');
    if (typeof Babel === 'undefined') throw new Error('Babel failed to load from the CDN.');
    var code = Babel.transform(document.getElementById('__src').textContent, { presets: ['react'] }).code;
    (0, eval)(code);
  } catch (e) {
    console.error(e);
    root.innerHTML = ${PREVIEW_ERR_HTML};
  }
});
<\/script>
</body></html>`;
}

// Collect the TOP-LEVEL const/let/var/function names from <script setup> so
// setup() can return them to the template. The exporter emits top-level
// declarations at column 0 and nested ones (inside function bodies) indented —
// so we anchor at column 0 to avoid returning locals like `const now` that only
// exist inside a function (which would throw "now is not defined").
function vueSetupReturns(script) {
  const names = new Set();
  let m;
  // const/let/var — capture every binding (handles comma lists: `let a, b, c;`)
  const varRe = /^(?:const|let|var)\s+([^=;\n]+)/gm;
  while ((m = varRe.exec(script)) !== null) {
    for (const part of m[1].split(',')) {
      const id = part.trim().match(/^([A-Za-z_$][A-Za-z0-9_$]*)/);
      if (id) names.add(id[1]);
    }
  }
  const fnRe = /^(?:async\s+)?function\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm;
  while ((m = fnRe.exec(script)) !== null) names.add(m[1]);
  return [...names];
}

// Vue — extracts <template>/<script setup>/<style> and mounts via the global build (includes the compiler).
function buildVuePreview(sfcCode, cdnUrls = []) {
  const template = (sfcCode.match(/<template>([\s\S]*?)<\/template>/) || [null, ''])[1];
  const style    = (sfcCode.match(/<style[^>]*>([\s\S]*?)<\/style>/)   || [null, ''])[1];
  let   script   = (sfcCode.match(/<script setup>([\s\S]*?)<\/script>/) || [null, ''])[1];
  const cdn      = cdnTagsHtml(cdnUrls, '');
  script = script.replace(/^\s*import[^\n]*\n/gm, '').trim();
  const returns = vueSetupReturns(script);
  const returnStmt = returns.length ? `return { ${returns.join(', ')} };` : 'return {};';
  const tmpl = esc(JSON.stringify(template));
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
${CONSOLE_BRIDGE}
<script src="https://unpkg.com/vue@3.5.13/dist/vue.global.prod.js" onerror="window.__cdnFail='Vue'"><\/script>
${cdn}
<style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#fff}#app{display:contents}${PREVIEW_ERR_CSS}${style}</style>
</head><body>
<div id="app"></div>
<script type="text/plain" id="__tmpl">${tmpl}</script>
<script>
window.addEventListener('load', function () {
  var mountEl = document.getElementById('app');
  try {
    if (window.__cdnFail) throw new Error(window.__cdnFail + ' failed to load from the CDN (network issue).');
    if (typeof Vue === 'undefined') throw new Error('Vue failed to load from the CDN.');
    const { createApp, ref, reactive, computed, watch, onMounted, onUnmounted, nextTick } = Vue;
    createApp({
      template: JSON.parse(document.getElementById('__tmpl').textContent),
      setup() {
${esc(script)}
        ${returnStmt}
      }
    }).mount('#app');
  } catch (e) {
    console.error(e);
    mountEl.innerHTML = ${PREVIEW_ERR_HTML};
  }
});
<\/script>
</body></html>`;
}

// ── Tab definitions ──────────────────────────────────────────────────────────────

const TABS = [
  { id: 'html',     label: 'HTML',              lang: 'html',       needsTailwind: false },
  { id: 'tailwind', label: 'Tailwind',           lang: 'html',       needsTailwind: true  },
  { id: 'react',    label: 'React',              lang: 'jsx',        needsTailwind: false },
  { id: 'react-tw', label: 'React + Tailwind',   lang: 'jsx',        needsTailwind: true  },
  { id: 'vue',      label: 'Vue',                lang: 'vue',        needsTailwind: false },
  { id: 'angular',  label: 'Angular',            lang: 'typescript', needsTailwind: false },
];

function getCode(tab, sn) {
  const cdn = sn.cdnUrls || [];
  switch (tab) {
    case 'html':     return { code: toHtmlFile(sn), preview: buildPreviewSrcdoc(sn.html, sn.css, sn.js, false, cdn) };
    case 'tailwind': { const c = toTailwindHtml(sn); return { code: c, preview: buildPreviewSrcdoc(sn.html, sn.css, sn.js, true, cdn) }; }
    case 'react':    { const c = toReactComponent(sn);    return { code: c, preview: buildReactPreview(c, false, cdn) }; }
    case 'react-tw': { const c = toTailwindComponent(sn); return { code: c, preview: buildReactPreview(c, true, cdn) }; }
    case 'vue':      { const c = toVueSfc(sn);            return { code: c, preview: buildVuePreview(c, cdn) }; }
    // Angular: ViewEncapsulation.None + ngAfterViewInit reproduce the original DOM/behavior,
    // so the raw snippet is a faithful render (Angular itself can't JIT-compile inside a sandboxed iframe).
    case 'angular':  return { code: toAngularComponent(sn), preview: buildPreviewSrcdoc(sn.html, sn.css, sn.js, false, cdn) };
    default:         return { code: '', preview: null };
  }
}

// ── Component ────────────────────────────────────────────────────────────────────

// Uncontrolled by default (its own button opens it). Pass `open` + `onOpenChange`
// to drive it from elsewhere, and `hideButton` when something else opens it.
export default function ExportTester({ html = '', css = '', js = '', title = 'Snippet', cdnUrls = [], className, open: openProp, onOpenChange, hideButton = false }) {
  const [innerOpen, setInnerOpen]     = useState(false);
  const controlled = openProp !== undefined;
  const open       = controlled ? openProp : innerOpen;
  const setOpen    = controlled ? onOpenChange : setInnerOpen;
  const [activeTab, setActiveTab]     = useState('html');
  const [copied, setCopied]           = useState(false);
  const [splitPct, setSplitPct]       = useState(50);
  const [isDragging, setIsDragging]   = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const bodyRef    = useRef(null);
  const dragging   = useRef(false);

  const sn = { html, css, js: js || '', title, cdnUrls };
  const { code, preview } = getCode(activeTab, sn);

  const codeBtnStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 9px', fontSize: 10.5, fontWeight: 600, letterSpacing: 0,
    textTransform: 'none', fontFamily: 'var(--font-ui)',
    color: '#1f2328', background: '#f6f8fa',
    border: '1px solid #d8dee4', borderRadius: 6, cursor: 'pointer',
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

  const handleDownload = useCallback(() => {
    const base = componentName(sn);
    const names = {
      html:       `${base}.html`,
      tailwind:   `${base}.tailwind.html`,
      react:      `${base}.jsx`,
      'react-tw': `${base}.tailwind.jsx`,
      vue:        `${base}.vue`,
      angular:    `${angularSelector(base)}.component.ts`,
    };
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
    a.download = names[activeTab] || `${base}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [code, activeTab, sn]);

  const handleClose = useCallback((e) => {
    if (e.target === e.currentTarget) setOpen(false);
  }, []);

  // Clear console and collapse when switching tabs (iframe remounts)
  useEffect(() => { setConsoleLogs([]); setConsoleOpen(false); setPreviewLoading(true); }, [activeTab]);

  // Listen for console messages forwarded from the preview iframe via postMessage
  useEffect(() => {
    if (!open) return;
    function onMsg(e) {
      if (e.data && e.data.type === '__console__') {
        const { level, args } = e.data;
        setConsoleLogs(prev => [...prev, { level, text: args.join(' '), id: Date.now() + Math.random() }]);
        setConsoleOpen(true);
      }
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [open]);

  // Drag handlers on the divider
  const onDividerMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    setIsDragging(true);
  }, []);

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragging.current || !bodyRef.current) return;
      // Compute pane width directly from the cursor's absolute position so
      // tracking stays exact even after fast moves / dropped events.
      const rect = bodyRef.current.getBoundingClientRect();
      const pct  = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPct(Math.min(80, Math.max(20, pct)));
    }
    function onMouseUp() {
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
    };
  }, []);

  return (
    <>
      {!hideButton && (
        <button
          className={className}
          onClick={() => setOpen(true)}
          title="Preview & test every export format (HTML, Tailwind, React, Vue, Angular)"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          Test Exports
        </button>
      )}

      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
            display: 'flex', flexDirection: 'column',
          }}
          onClick={handleClose}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', flexShrink: 0,
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <span style={{
              fontSize: 13, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-ui)', marginRight: 'auto',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              Export Tester — {title}
            </span>

            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '5px 12px', fontSize: 12, fontWeight: 600,
                  fontFamily: 'var(--font-ui)', border: '1px solid',
                  borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s',
                  background: activeTab === t.id ? 'var(--accent)' : 'var(--surface2)',
                  borderColor: activeTab === t.id ? 'var(--accent)' : 'var(--border)',
                  color: activeTab === t.id ? '#fff' : 'var(--text2)',
                }}
              >
                {t.label}
              </button>
            ))}


            <button
              onClick={() => setOpen(false)}
              title="Close"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, border: '1px solid var(--border)',
                borderRadius: 7, background: 'var(--surface2)', cursor: 'pointer',
                color: 'var(--text3)', flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Body — split panes */}
          <div
            ref={bodyRef}
            style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Transparent overlay during drag — keeps the iframe from swallowing mouse events */}
            {isDragging && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 10,
                cursor: 'col-resize',
              }} />
            )}
            {/* Code pane */}
            <div style={{
              width: `${splitPct}%`, flexShrink: 0, overflow: 'hidden',
              display: 'flex', flexDirection: 'column', background: '#f6f8fa',
            }}>
              <div style={{
                padding: '5px 8px 5px 12px', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px',
                textTransform: 'uppercase', color: '#57606a', background: '#fff',
                borderBottom: '1px solid #d8dee4', fontFamily: 'var(--font-ui)', flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ marginRight: 'auto' }}>Generated Code — {TABS.find(t => t.id === activeTab)?.label}</span>
                <button onClick={handleCopy} title="Copy code" style={codeBtnStyle}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button onClick={handleDownload} title="Download file" style={codeBtnStyle}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </button>
              </div>
              <pre style={{
                flex: 1, overflow: 'auto', margin: 0, padding: 16,
                fontFamily: 'var(--font-mono, monospace)', fontSize: 12,
                lineHeight: 1.6, color: '#1f2328', whiteSpace: 'pre', tabSize: 2,
              }}
                dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
              />
            </div>

            {/* Draggable divider */}
            <div
              onMouseDown={onDividerMouseDown}
              style={{
                width: 6, flexShrink: 0, cursor: 'col-resize', zIndex: 11,
                background: isDragging ? '#2563eb' : '#e2e6ea',
                transition: 'background 0.15s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = '#2563eb'; }}
              onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = '#e2e6ea'; }}
              title="Drag to resize"
            >
              {/* Grip dots */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex', flexDirection: 'column', gap: 3,
              }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: '#9aa4af' }} />
                ))}
              </div>
            </div>

            {/* Preview pane */}
            <div style={{
              flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                padding: '6px 12px', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px',
                textTransform: 'uppercase', color: 'var(--text3)', background: 'var(--surface)',
                borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-ui)', flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>Rendered Preview — {TABS.find(t => t.id === activeTab)?.label}</span>
                {activeTab === 'angular' && (
                  <span
                    title="The exported Angular component uses ViewEncapsulation.None and runs the same template, styles, and logic (in ngAfterViewInit). This preview renders that identical DOM — Angular's JIT compiler can't run inside a sandboxed iframe, but the output is exactly what the component produces."
                    style={{
                      textTransform: 'none', letterSpacing: 0, fontWeight: 600, fontSize: 10,
                      color: '#10b981', background: 'rgba(16,185,129,0.12)',
                      border: '1px solid rgba(16,185,129,0.35)', borderRadius: 4, padding: '1px 6px',
                      cursor: 'help',
                    }}>
                    faithful render — identical to the component output
                  </span>
                )}
              </div>

              {/* Preview area + console panel */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {preview ? (
                  <div style={{ flex: 1, position: 'relative', minHeight: 0, background: '#fff' }}>
                    <iframe
                      key={activeTab}
                      srcDoc={preview}
                      onLoad={() => setPreviewLoading(false)}
                      style={{ position: 'absolute', inset: 0, border: 'none', width: '100%', height: '100%' }}
                      sandbox="allow-scripts allow-forms"
                      title="Export preview"
                    />
                    {/* White loading veil until the iframe finishes loading the runtime */}
                    {previewLoading && (
                      <div style={{
                        position: 'absolute', inset: 0, background: '#fff', zIndex: 5,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
                      }}>
                        <span style={{
                          width: 26, height: 26, borderRadius: '50%',
                          border: '3px solid #e2e6ea', borderTopColor: '#2563eb',
                          animation: 'exp-spin 0.7s linear infinite', display: 'block',
                        }} />
                        <span style={{ fontSize: 11, color: '#8a929c', fontFamily: 'var(--font-ui)' }}>
                          Loading {TABS.find(t => t.id === activeTab)?.label} preview…
                        </span>
                        <style>{`@keyframes exp-spin{to{transform:rotate(360deg)}}`}</style>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24,
                    background: 'var(--surface)', color: 'var(--text3)',
                    fontSize: 13, fontFamily: 'var(--font-ui)', textAlign: 'center',
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0.3 }}>
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                    <span>Live preview not available for {TABS.find(t => t.id === activeTab)?.label}</span>
                    <span style={{ fontSize: 11, opacity: 0.6 }}>Copy the code and paste it into your project to test</span>
                  </div>
                )}

                {/* Console panel */}
                <div style={{ flexShrink: 0, borderTop: '1px solid #d8dee4', background: '#fff', display: 'flex', flexDirection: 'column', height: consoleOpen ? 140 : 28, transition: 'height 0.15s' }}>
                  {/* Console header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px', height: 28, flexShrink: 0, borderBottom: consoleOpen ? '1px solid #e8eaed' : 'none', background: '#f8f9fa', cursor: 'pointer', userSelect: 'none' }} onClick={() => setConsoleOpen(v => !v)}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: consoleOpen ? 'none' : 'rotate(-90deg)', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9"/></svg>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#5f6368', fontFamily: 'var(--font-ui)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Console</span>
                    {consoleLogs.filter(l => l.level === 'error').length > 0 && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#d93025', background: 'rgba(217,48,37,0.1)', borderRadius: 3, padding: '1px 5px', fontFamily: 'var(--font-ui)' }}>
                        {consoleLogs.filter(l => l.level === 'error').length} error{consoleLogs.filter(l => l.level === 'error').length > 1 ? 's' : ''}
                      </span>
                    )}
                    {consoleLogs.filter(l => l.level === 'warn').length > 0 && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#e37400', background: 'rgba(227,116,0,0.1)', borderRadius: 3, padding: '1px 5px', fontFamily: 'var(--font-ui)' }}>
                        {consoleLogs.filter(l => l.level === 'warn').length} warn
                      </span>
                    )}
                    <span style={{ flex: 1 }} />
                    {consoleLogs.length > 0 && (
                      <button onClick={e => { e.stopPropagation(); setConsoleLogs([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5f6368', fontSize: 10, fontFamily: 'var(--font-ui)', padding: '2px 4px', borderRadius: 3 }} title="Clear console">
                        Clear
                      </button>
                    )}
                  </div>
                  {/* Log entries */}
                  {consoleOpen && (
                    <div style={{ flex: 1, overflowY: 'auto', padding: '2px 0', background: '#fff' }}>
                      {consoleLogs.length === 0 ? (
                        <div style={{ padding: '6px 12px', fontSize: 11, color: '#80868b', fontFamily: 'monospace' }}>No output</div>
                      ) : consoleLogs.map(entry => (
                        <div key={entry.id} style={{
                          padding: '2px 12px', fontSize: 11, fontFamily: 'monospace', lineHeight: 1.5,
                          borderLeft: `2px solid ${entry.level === 'error' ? '#d93025' : entry.level === 'warn' ? '#e37400' : '#bdc1c6'}`,
                          color: entry.level === 'error' ? '#c5221f' : entry.level === 'warn' ? '#b06000' : '#202124',
                          background: entry.level === 'error' ? '#fce8e6' : entry.level === 'warn' ? '#fef7e0' : 'transparent',
                          whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                        }}>
                          {entry.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
