'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ── CSS Minifier ────────────────────────────────────────────────── */

function minifyCss(input) {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')   // remove comments
    .replace(/\s+/g, ' ')               // collapse whitespace
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/:\s+/g, ':')              // no space after colon
    .replace(/;}/g, '}')               // trailing semicolons
    .trim();
}

/* ── CSS Beautifier ──────────────────────────────────────────────── */

function beautifyCss(input) {
  const INDENT = '  ';
  const src = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

  let out = '';
  let depth = 0;
  let i = 0;

  const ind = (d) => INDENT.repeat(Math.max(0, d));

  while (i < src.length) {
    const ch = src[i];

    // Collapse whitespace
    if (ch === ' ' || ch === '\t' || ch === '\n') {
      const prev = out[out.length - 1];
      if (prev && prev !== '\n' && prev !== ' ') out += ' ';
      i++;
      while (i < src.length && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n')) i++;
      continue;
    }

    // Comment
    if (ch === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      const comment = (end < 0 ? src.slice(i) : src.slice(i, end + 2)).replace(/\s+/g, ' ');
      out = out.trimEnd();
      if (out.length > 0 && !out.endsWith('\n')) out += '\n';
      out += ind(depth) + comment.trim() + '\n';
      i = end < 0 ? src.length : end + 2;
      while (i < src.length && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n')) i++;
      if (i < src.length && src[i] !== '}') out += ind(depth);
      continue;
    }

    // String literal
    if (ch === '"' || ch === "'") {
      const q = ch;
      let j = i + 1;
      while (j < src.length && src[j] !== q) {
        if (src[j] === '\\') j++;
        j++;
      }
      out += src.slice(i, j + 1);
      i = j + 1;
      continue;
    }

    // Open brace
    if (ch === '{') {
      out = out.trimEnd() + ' {\n';
      depth++;
      i++;
      while (i < src.length && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n')) i++;
      out += ind(depth);
      continue;
    }

    // Close brace
    if (ch === '}') {
      out = out.trimEnd();
      depth = Math.max(0, depth - 1);
      out += '\n' + ind(depth) + '}\n';
      i++;
      while (i < src.length && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n')) i++;
      if (i < src.length) {
        if (depth === 0) out += '\n';
        if (src[i] !== '}') out += ind(depth);
      }
      continue;
    }

    // Semicolon
    if (ch === ';') {
      out = out.trimEnd() + ';\n';
      i++;
      while (i < src.length && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n')) i++;
      if (i < src.length && src[i] !== '}') out += ind(depth);
      continue;
    }

    out += ch;
    i++;
  }

  return out
    .replace(/\n{3,}/g, '\n\n')
    .split('\n').map(l => l.trimEnd()).join('\n')
    .trim();
}

/* ── Syntax Highlighting ─────────────────────────────────────────── */

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Uses CSS classes (cm-*) defined in globals.css — adapts to light and dark themes.
function highlightCss(code) {
  let out = '';
  let i = 0;
  let depth = 0;
  let inPropName = false; // true = expecting prop name; false = in value or selector

  while (i < code.length) {
    const rem = code.slice(i);

    // Comment
    if (rem.startsWith('/*')) {
      const end = code.indexOf('*/', i + 2);
      const comment = end < 0 ? rem : code.slice(i, end + 2);
      out += `<span class="cm-comment">${esc(comment)}</span>`;
      i = end < 0 ? code.length : end + 2;
      continue;
    }

    // At-rule
    if (code[i] === '@') {
      const m = rem.match(/^@[\w-]+/);
      if (m) {
        out += `<span class="cm-at">${esc(m[0])}</span>`;
        i += m[0].length;
        continue;
      }
    }

    // Open brace
    if (code[i] === '{') {
      out += `<span class="cm-punct">{</span>`;
      depth++;
      inPropName = true;
      i++;
      continue;
    }

    // Close brace
    if (code[i] === '}') {
      out += `<span class="cm-punct">}</span>`;
      depth = Math.max(0, depth - 1);
      inPropName = false;
      i++;
      continue;
    }

    // Semicolon
    if (code[i] === ';') {
      out += `<span class="cm-punct">;</span>`;
      inPropName = true;
      i++;
      continue;
    }

    // Colon — separates property from value
    if (code[i] === ':') {
      if (depth > 0 && inPropName) {
        out += `<span class="cm-colon">:</span>`;
        inPropName = false;
      } else {
        out += esc(':');
      }
      i++;
      continue;
    }

    // String literal
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q) {
        if (code[j] === '\\') j++;
        j++;
      }
      out += `<span class="cm-val">${esc(code.slice(i, j + 1))}</span>`;
      i = j + 1;
      continue;
    }

    // !important
    if (rem.startsWith('!important')) {
      out += `<span class="cm-imp">!important</span>`;
      i += 10;
      continue;
    }

    // Hex color
    if (code[i] === '#' && !inPropName) {
      const m = rem.match(/^#[0-9a-fA-F]{3,8}\b/);
      if (m) {
        out += `<span class="cm-num">${esc(m[0])}</span>`;
        i += m[0].length;
        continue;
      }
    }

    // Numbers with units
    if (/\d/.test(code[i]) || (code[i] === '-' && /\d/.test(code[i + 1] || ''))) {
      const m = rem.match(/^-?\d*\.?\d+(%|px|em|rem|vh|vw|vmin|vmax|pt|pc|ex|ch|fr|deg|rad|turn|s|ms|cm|mm|in|dpi|dppx)?/);
      if (m && m[0].length > 0) {
        out += `<span class="cm-num">${esc(m[0])}</span>`;
        i += m[0].length;
        continue;
      }
    }

    // Identifiers: properties, values, selectors
    if (/[a-zA-Z_-]/.test(code[i])) {
      const m = rem.match(/^[-a-zA-Z_][-\w]*/);
      if (m) {
        if (depth > 0 && inPropName) {
          // Check if followed by colon (property declaration)
          const after = code.slice(i + m[0].length).trimStart();
          if (after.startsWith(':') && !after.startsWith('::')) {
            out += `<span class="cm-prop">${esc(m[0])}</span>`;
          } else {
            out += esc(m[0]);
          }
        } else if (depth > 0 && !inPropName) {
          out += `<span class="cm-val">${esc(m[0])}</span>`;
        } else {
          out += `<span class="cm-sel">${esc(m[0])}</span>`;
        }
        i += m[0].length;
        continue;
      }
    }

    out += esc(code[i]);
    i++;
  }

  return out;
}

/* ── Utilities ───────────────────────────────────────────────────── */

function fmtBytes(n) {
  if (n === 0) return '0 B';
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

/* ── Constants ───────────────────────────────────────────────────── */

const PLACEHOLDER = `/* Paste your CSS here and click Beautify or Minify */
body{margin:0;padding:0;font-family:sans-serif;background:#f0f0f0;}
.container{max-width:1200px;margin:0 auto;padding:0 20px;}
h1,h2,h3{font-weight:700;line-height:1.2;}
@media(max-width:768px){.container{padding:0 12px;}.hero{font-size:24px;}}`;

let histId = 0;

/* ── Component ───────────────────────────────────────────────────── */

export default function CssMinifierBeautifierTool() {
  const [input, setInput]               = useState('');
  const [output, setOutput]             = useState('');
  const [originalInput, setOriginalInput] = useState('');
  const [viewMode, setViewMode]         = useState('input');    // 'input' | 'output'
  const [processMode, setProcessMode]   = useState('beautify'); // 'beautify' | 'minify'
  const [history, setHistory]           = useState([]);
  const [histOpen, setHistOpen]         = useState(false);
  const [copied, setCopied]             = useState(false);
  const [status, setStatus]             = useState('');         // '' | 'ok' | 'err'
  const [dragging, setDragging]         = useState(false);

  const textareaRef  = useRef(null);
  const lineNumRef   = useRef(null);
  const preLineRef   = useRef(null);
  const fileInputRef = useRef(null);

  const code       = viewMode === 'output' ? output : input;
  const lineCount  = Math.max((code || '').split('\n').length, 1);
  const lineNums   = Array.from({ length: lineCount }, (_, k) => k + 1).join('\n');

  // Stats
  const inputLen  = (originalInput || input).length;
  const outputLen = output.length;
  const diffLen   = outputLen - inputLen;
  const diffPct   = inputLen > 0 ? Math.abs(diffLen / inputLen * 100).toFixed(1) : '0.0';

  const syncTextareaScroll = useCallback((e) => {
    if (lineNumRef.current) lineNumRef.current.scrollTop = e.target.scrollTop;
  }, []);

  const syncPreScroll = useCallback((e) => {
    if (preLineRef.current) preLineRef.current.scrollTop = e.target.scrollTop;
  }, []);

  const runProcess = (mode) => {
    const src = (input || '').trim() || PLACEHOLDER;
    try {
      const result = mode === 'minify' ? minifyCss(src) : beautifyCss(src);
      const entry = {
        id: ++histId,
        ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        mode,
        inLen: src.length,
        outLen: result.length,
        preview: src.replace(/\s+/g, ' ').trim().slice(0, 80),
        code: result,
        original: src,
      };
      setHistory(h => [entry, ...h].slice(0, 15));
      setOriginalInput(src);
      setOutput(result);
      setProcessMode(mode);
      setViewMode('output');
      setStatus('ok');
      setTimeout(() => setStatus(''), 2000);
    } catch {
      setStatus('err');
      setTimeout(() => setStatus(''), 2000);
    }
  };

  const handleBeautify = () => runProcess('beautify');
  const handleMinify   = () => runProcess('minify');

  const handleEdit = () => {
    // After minify, restore the readable original; after beautify use the beautified text
    setInput(processMode === 'minify' ? (originalInput || output) : (output || input));
    setViewMode('input');
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleCopy = async () => {
    const text = viewMode === 'output' ? output : input;
    if (!text) return;
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setOriginalInput('');
    setViewMode('input');
    setStatus('');
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleDownload = () => {
    const text = viewMode === 'output' ? output : input;
    if (!text) return;
    const blob = new Blob([text], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = viewMode === 'output' && processMode === 'minify' ? 'styles.min.css' : 'styles.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target.result);
      setOutput('');
      setOriginalInput('');
      setViewMode('input');
      setTimeout(() => textareaRef.current?.focus(), 0);
    };
    reader.readAsText(file);
  };

  const handleFileInput = (e) => { loadFile(e.target.files[0]); e.target.value = ''; };
  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files[0]); };

  const restoreHistory = (entry) => {
    setInput(entry.original);
    setOriginalInput(entry.original);
    setOutput(entry.code);
    setProcessMode(entry.mode);
    setViewMode('output');
    setHistOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-minifier-beautifier" />

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2"/>
            <path d="M18 4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>CSS <span className={styles.accent}>Minifier / Beautifier</span></span>
        <div className={styles.headerSep} />
        <span className={styles.headerSub}>Minify &amp; format CSS · Syntax highlighting</span>
        <div className={styles.headerMeta}>
          {viewMode === 'output' ? (
            <>
              <span className={styles.metaChip}>{fmtBytes(inputLen)} → {fmtBytes(outputLen)}</span>
              {diffLen < 0 && <span className={styles.metaChipSaved}>−{diffPct}%</span>}
              {diffLen > 0 && <span className={styles.metaChipExpanded}>+{diffPct}%</span>}
              <span className={`${styles.modeBadge} ${processMode === 'minify' ? styles.modeBadgeMinify : styles.modeBadgeBeautify}`}>
                {processMode === 'minify' ? 'Minified' : 'Beautified'}
              </span>
            </>
          ) : (
            <>
              <span className={styles.metaChip}>{lineCount}L</span>
              <span className={styles.metaChip}>{fmtBytes(input.length)}</span>
            </>
          )}
        </div>
      </header>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <button className={`${styles.actionBtn} ${styles.actionBtnBeautify}`} onClick={handleBeautify}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="10" x2="15" y2="10"/>
            <line x1="3" y1="14" x2="21" y2="14"/>
            <line x1="3" y1="18" x2="15" y2="18"/>
          </svg>
          Beautify
        </button>
        <button className={`${styles.actionBtn} ${styles.actionBtnMinify}`} onClick={handleMinify}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 14 10 14 10 20"/>
            <polyline points="20 10 14 10 14 4"/>
            <line x1="14" y1="10" x2="21" y2="3"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
          Minify
        </button>

        {viewMode === 'output' && (
          <button className={styles.editBtn} onClick={handleEdit}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
        )}

        <div className={styles.toolbarSep} />

        <button className={styles.toolBtn} onClick={() => fileInputRef.current?.click()}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload
        </button>
        <input ref={fileInputRef} type="file" accept=".css,.txt" style={{ display: 'none' }} onChange={handleFileInput} />

        <button className={styles.toolBtn} onClick={handleCopy} disabled={!code}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <button className={styles.toolBtn} onClick={handleDownload} disabled={!code}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download
        </button>
        <button className={styles.toolBtn} onClick={handleClear} disabled={!code}>
          Clear
        </button>

        {status === 'ok'  && <span className={styles.statusOk}>✓ Done</span>}
        {status === 'err' && <span className={styles.statusErr}>✗ Error</span>}

        <div className={styles.toolbarSpacer} />

        <button className={styles.histBtn} onClick={() => setHistOpen(true)}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          History
          {history.length > 0 && <span className={styles.histBadge}>{history.length}</span>}
        </button>
      </div>

      {/* ── Editor / Output ── */}
      <div
        className={`${styles.editorWrap}${dragging ? ` ${styles.editorWrapDragging}` : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {dragging && (
          <div className={styles.dragOverlay}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Drop CSS file here
          </div>
        )}

        <div
          className={styles.lineNums}
          ref={viewMode === 'output' ? preLineRef : lineNumRef}
          aria-hidden="true"
        >
          {lineNums}
        </div>

        {viewMode === 'input' ? (
          <textarea
            ref={textareaRef}
            className={styles.editor}
            value={input}
            onChange={e => setInput(e.target.value)}
            onScroll={syncTextareaScroll}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
          />
        ) : (
          <pre
            className={styles.output}
            onScroll={syncPreScroll}
            dangerouslySetInnerHTML={{ __html: highlightCss(output) + '\n' }}
          />
        )}
      </div>

      {/* ── History Panel ── */}
      {histOpen && (
        <div className={styles.histOverlay} onClick={() => setHistOpen(false)}>
          <aside className={styles.histPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.histPanelHead}>
              <span className={styles.histPanelTitle}>History</span>
              <button
                className={styles.histClearAll}
                onClick={() => { setHistory([]); setHistOpen(false); }}
                disabled={history.length === 0}
              >
                Clear all
              </button>
              <button className={styles.histClose} onClick={() => setHistOpen(false)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {history.length === 0 ? (
              <div className={styles.histEmpty}>No history yet. Click Beautify or Minify to save a snapshot.</div>
            ) : (
              <div className={styles.histList}>
                {history.map((h, idx) => (
                  <button key={h.id} className={styles.histItem} onClick={() => restoreHistory(h)}>
                    <div className={styles.histItemTop}>
                      {idx === 0 && <span className={styles.histItemLatest}>latest</span>}
                      <span className={`${styles.histItemMode} ${h.mode === 'minify' ? styles.histItemModeMinify : styles.histItemModeBeautify}`}>
                        {h.mode}
                      </span>
                      <span className={styles.histItemTs}>{h.ts}</span>
                      <span className={styles.histItemStats}>{fmtBytes(h.inLen)} → {fmtBytes(h.outLen)}</span>
                    </div>
                    <div className={styles.histItemPreview}>{h.preview}</div>
                  </button>
                ))}
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
