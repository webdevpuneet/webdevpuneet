'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';
import { convert } from '@/lib/css-to-tailwind';

/* ════════════════════════════════════════════════════════════════
   Output formatting
════════════════════════════════════════════════════════════════ */

function formatOutput(rules, fmt) {
  const lines = [];
  for (const rule of rules) {
    const cls = rule.classes.join(' ');
    if (rule.selector) lines.push(`/* ${rule.selector} */`);
    if (fmt === 'html')    lines.push(`<div class="${cls}">`);
    else if (fmt === 'jsx') lines.push(`<div className="${cls}">`);
    else                    lines.push(cls);
    if (rule.selector) lines.push('');
  }
  return lines.join('\n').trimEnd();
}

/* ════════════════════════════════════════════════════════════════
   Syntax Highlighting
════════════════════════════════════════════════════════════════ */

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function getCSSC() {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  return dark
    ? { comment: '#6a9955', atRule: '#c586c0', selector: '#4ec9b0', property: '#9cdcfe', value: '#ce9178', punct: '#6b7280', string: '#ce9178', number: '#b5cea8' }
    : { comment: '#6b7280', atRule: '#7c3aed', selector: '#0f766e', property: '#0550ae', value: '#b45309', punct: '#374151', string: '#b45309', number: '#1d4ed8' };
}

function highlightCss(code) {
  const CSSC = getCSSC();
  let out = ''; let i = 0; let depth = 0; let inProp = false;
  while (i < code.length) {
    const rem = code.slice(i);
    if (rem.startsWith('/*')) {
      const end = code.indexOf('*/', i + 2);
      out += `<span style="color:${CSSC.comment}">${esc(end<0?rem:code.slice(i,end+2))}</span>`;
      i = end < 0 ? code.length : end + 2; continue;
    }
    if (code[i] === '@') {
      const m = rem.match(/^@[\w-]+/);
      if (m) { out += `<span style="color:${CSSC.atRule}">${esc(m[0])}</span>`; i += m[0].length; continue; }
    }
    if (code[i] === '{') { out += `<span style="color:${CSSC.punct}">{</span>`; depth++; inProp = true; i++; continue; }
    if (code[i] === '}') { out += `<span style="color:${CSSC.punct}">}</span>`; depth = Math.max(0,depth-1); inProp = false; i++; continue; }
    if (code[i] === ';') { out += `<span style="color:${CSSC.punct}">;</span>`; inProp = true; i++; continue; }
    if (code[i] === ':' && depth > 0 && inProp) { out += `<span style="color:${CSSC.punct}">:</span>`; inProp = false; i++; continue; }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1;
      while (j < code.length && code[j] !== q) { if (code[j]==='\\') j++; j++; }
      out += `<span style="color:${CSSC.string}">${esc(code.slice(i,j+1))}</span>`; i = j+1; continue;
    }
    if (/[a-zA-Z_-]/.test(code[i])) {
      const m = rem.match(/^[-a-zA-Z_][-\w]*/);
      if (m) {
        const after = code.slice(i+m[0].length).trimStart();
        let col = depth>0 && inProp && after.startsWith(':') && !after.startsWith('::') ? CSSC.property
                : depth>0 && !inProp ? CSSC.value
                : CSSC.selector;
        out += `<span style="color:${col}">${esc(m[0])}</span>`; i += m[0].length; continue;
      }
    }
    if (code[i]==='#' && !inProp) {
      const m = rem.match(/^#[0-9a-fA-F]{3,8}\b/);
      if (m) { out += `<span style="color:${CSSC.number}">${esc(m[0])}</span>`; i += m[0].length; continue; }
    }
    if (/\d/.test(code[i])) {
      const m = rem.match(/^\d*\.?\d+(%|px|em|rem|vh|vw|s|ms|deg|fr)?/);
      if (m) { out += `<span style="color:${CSSC.number}">${esc(m[0])}</span>`; i += m[0].length; continue; }
    }
    out += esc(code[i]); i++;
  }
  return out;
}

function highlightTailwind(code) {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const T = dark
    ? { comment: '#6a9955', arbitrary: '#fbbf24', cls: '#7dd3fc', attrN: '#9cdcfe', quote: '#ce9178' }
    : { comment: '#6b7280', arbitrary: '#b45309', cls: '#0550ae', attrN: '#0f766e', quote: '#b45309' };
  return code.split('\n').map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('/*')) return `<span style="color:${T.comment}">${esc(line)}</span>`;
    if (trimmed.startsWith('<')) {
      // HTML/JSX output — escape the whole line first so <div> / > become &lt;div&gt;
      const safe = esc(line);
      return safe.replace(/\bclass(Name)?="([^"]*)"/g, (_, name, cls) => {
        const attrName = name ? 'className' : 'class';
        const highlighted = cls.split(' ').filter(Boolean).map(t =>
          t.includes('[')
            ? `<span style="color:${T.arbitrary}">${t}</span>`
            : `<span style="color:${T.cls}">${t}</span>`
        ).join(' ');
        return `<span style="color:${T.attrN}">${attrName}</span>=<span style="color:${T.quote}">"</span>${highlighted}<span style="color:${T.quote}">"</span>`;
      });
    }
    return line.split(/(\S+)/g).map((tok, i) => {
      if (i % 2 === 0) return esc(tok);
      if (tok.includes('[')) return `<span style="color:${T.arbitrary}">${esc(tok)}</span>`;
      return `<span style="color:${T.cls}">${esc(tok)}</span>`;
    }).join('');
  }).join('\n');
}

/* ════════════════════════════════════════════════════════════════
   Sample
════════════════════════════════════════════════════════════════ */

const SAMPLE = `.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  margin: 16px auto;
  width: 100%;
  max-width: 512px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.25;
}

.card-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}`;

/* ════════════════════════════════════════════════════════════════
   LineNumbers helper
════════════════════════════════════════════════════════════════ */

function LineNumbers({ count, scrollRef }) {
  const nums = Array.from({ length: Math.max(count, 1) }, (_, i) => i + 1);
  return (
    <div ref={scrollRef} className={styles.lineNums} aria-hidden="true">
      {nums.map(n => <div key={n} className={styles.lineNum}>{n}</div>)}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Component
════════════════════════════════════════════════════════════════ */

const OUTPUT_FMTS = ['Classes', 'HTML', 'JSX'];

export default function CssToTailwindTool() {
  const [input, setInput]       = useState(SAMPLE);
  const [fmt, setFmt]           = useState('Classes');
  const [copyDone, setCopyDone] = useState(false);
  const [history, setHistory]   = useState([]);
  const [histOpen, setHistOpen] = useState(false);

  const inputScrollRef    = useRef(null);
  const inputLineRef      = useRef(null);
  const inputHighRef      = useRef(null);
  const outputScrollRef   = useRef(null);
  const outputLineRef     = useRef(null);
  const textareaRef       = useRef(null);
  const fileInputRef      = useRef(null);

  // Live conversion
  const result = (() => {
    try { return input.trim() ? convert(input) : { rules: [], totalClasses: 0, unknownCount: 0 }; }
    catch { return { rules: [], totalClasses: 0, unknownCount: 0 }; }
  })();

  const outputText = result.rules.length ? formatOutput(result.rules, fmt.toLowerCase()) : '';
  const inputLineCount  = Math.max(input.split('\n').length, 1);
  const outputLineCount = Math.max(outputText.split('\n').length, 1);

  const syncInputScroll = useCallback((e) => {
    const top = e.target.scrollTop;
    const left = e.target.scrollLeft;
    if (inputLineRef.current) inputLineRef.current.scrollTop = top;
    if (inputHighRef.current) { inputHighRef.current.scrollTop = top; inputHighRef.current.scrollLeft = left; }
  }, []);

  const syncOutputScroll = useCallback((e) => {
    if (outputLineRef.current) outputLineRef.current.scrollTop = e.target.scrollTop;
  }, []);

  // Auto-save to history 1.5s after the user stops changing the input
  useEffect(() => {
    if (!input.trim() || !outputText) return;
    const timer = setTimeout(() => {
      setHistory(prev => {
        // Skip if the most recent entry is identical
        if (prev.length > 0 && prev[0].input === input) return prev;
        return [{
          id: Date.now(),
          ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          input,
          preview: input.replace(/\s+/g, ' ').trim().slice(0, 72),
          fmt,
          classCount: result.totalClasses,
        }, ...prev].slice(0, 15);
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [input]); // only re-trigger when input changes; fmt/classCount captured via closure at fire time

  const handleCopy = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 1800);
    });
  }, [outputText]);

  const handleDownload = useCallback(() => {
    if (!outputText) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([outputText], { type: 'text/plain' }));
    a.download = 'tailwind-classes.txt';
    a.click();
  }, [outputText]);

  const loadFile = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => setInput(e.target.result);
    r.readAsText(file);
  };

  const handleFileInput = (e) => { loadFile(e.target.files[0]); e.target.value = ''; };
  const handleDrop = (e) => { e.preventDefault(); loadFile(e.dataTransfer.files[0]); };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-to-tailwind" />

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoBox}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2"/>
            <path d="M18 4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2"/>
          </svg>
        </div>
        <span className={styles.logoText}>CSS <span className={styles.accent}>→</span> Tailwind</span>
        <div className={styles.headerSep}/>
        <span className={styles.headerSub}>Convert CSS to utility classes</span>
        <div className={styles.headerRight}>
          <div className={styles.fmtTabs}>
            {OUTPUT_FMTS.map(f => (
              <button key={f} className={`${styles.fmtTab}${fmt===f?' '+styles.fmtTabActive:''}`} onClick={() => setFmt(f)}>{f}</button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <button className={styles.btnSample} onClick={() => setInput(SAMPLE)}>Sample</button>
        <button className={styles.btnTool} onClick={() => setInput('')} disabled={!input}>Clear</button>
        <button className={styles.btnTool} onClick={() => fileInputRef.current?.click()}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload
        </button>
        <input ref={fileInputRef} type="file" accept=".css,.txt" style={{display:'none'}} onChange={handleFileInput}/>
        <div className={styles.toolbarSpacer}/>
        <button className={`${styles.btnTool}${histOpen ? ' ' + styles.btnToolActive : ''}`} onClick={() => setHistOpen(h => !h)} style={{ position: 'relative' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          History
          {history.length > 0 && <span className={styles.histBadge}>{history.length}</span>}
        </button>
        <button className={`${styles.btnCopy}${copyDone?' '+styles.btnCopyDone:''}`} onClick={handleCopy} disabled={!outputText}>
          {copyDone ? '✓ Copied' : 'Copy'}
        </button>
        <button className={styles.btnTool} onClick={handleDownload} disabled={!outputText}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download
        </button>
      </div>

      {/* ── History Panel ── */}
      {histOpen && (
        <div className={styles.histPanel}>
          <div className={styles.histPanelHeader}>
            <span className={styles.histPanelTitle}>History</span>
            <button className={styles.histClearBtn} onClick={() => setHistory([])} disabled={history.length === 0}>Clear all</button>
            <button className={styles.histCloseBtn} onClick={() => setHistOpen(false)}>✕</button>
          </div>
          {history.length === 0 ? (
            <div className={styles.histEmpty}>No history yet — copy or download output to save an entry.</div>
          ) : (
            <div className={styles.histList}>
              {history.map(h => (
                <button key={h.id} className={styles.histItem} onClick={() => { setInput(h.input); setFmt(h.fmt); setHistOpen(false); }}>
                  <div className={styles.histMeta}>{h.ts} · <span className={styles.histFmt}>{h.fmt}</span> · {h.classCount} classes</div>
                  <div className={styles.histPreview}>{h.preview}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Editor Grid ── */}
      <div className={styles.editorGrid}>

        {/* Left: CSS Input */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>CSS Input</span>
            <span className={styles.paneCount}>{inputLineCount} lines</span>
          </div>
          <div className={styles.editorWrap} onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
            <LineNumbers count={inputLineCount} scrollRef={inputLineRef}/>
            <div className={styles.editorInner}>
              <pre
                ref={inputHighRef}
                className={styles.highlight}
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlightCss(input) + '\n' }}
              />
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={input}
                onChange={e => setInput(e.target.value)}
                onScroll={syncInputScroll}
                placeholder="Paste your CSS here…"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        </div>

        {/* Right: Tailwind Output */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>Tailwind Output</span>
            {result.totalClasses > 0 && (
              <span className={styles.paneCount}>{result.totalClasses} classes{result.unknownCount > 0 ? ` · ${result.unknownCount} arbitrary` : ''}</span>
            )}
          </div>
          <div className={styles.editorWrap}>
            <LineNumbers count={outputLineCount} scrollRef={outputLineRef}/>
            <div className={styles.editorInner}>
              {outputText ? (
                <pre
                  className={`${styles.highlight} ${styles.outputPre}`}
                  onScroll={syncOutputScroll}
                  dangerouslySetInnerHTML={{ __html: highlightTailwind(outputText) + '\n' }}
                />
              ) : (
                <pre className={styles.highlight} style={{ color: '#3d4450' }}>
                  {input.trim() ? 'No output — check your CSS input.' : 'Paste CSS on the left to see Tailwind classes here.'}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div className={styles.statusBar}>
        <div className={styles.statusDot + (result.totalClasses > 0 ? ' ' + styles.statusOk : '')}/>
        <span className={styles.statusText}>
          {result.totalClasses > 0
            ? `${result.totalClasses} classes generated${result.unknownCount ? ` · ${result.unknownCount} arbitrary value${result.unknownCount>1?'s':''}` : ''}`
            : 'Ready — paste or type CSS on the left'}
        </span>
        <span className={styles.statusHint}>Output format: <strong>{fmt}</strong></span>
      </div>
    </div>
  );
}
