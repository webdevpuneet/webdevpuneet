'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import styles from './styles.module.css';
import DevConvertersTopNav from '@/components/DevConvertersTopNav';

/* ── Formatters ──────────────────────────────────────────────────── */
const VOID_TAGS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

function tokenizeHtml(src) {
  const re = /(<!--[\s\S]*?-->)|(<!DOCTYPE[^>]*>)|(<script(?:\s[^>]*)?>[\s\S]*?<\/script>)|(<style(?:\s[^>]*)?>[\s\S]*?<\/style>)|(<\/[\w:-]+\s*>)|(<[\w:-][^>]*\/?>)|([^<]+)/gi;
  const tokens = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const [, comment, doctype, script, style, close, open, text] = m;
    if (comment) tokens.push({ type: 'comment', value: comment.trim() });
    else if (doctype) tokens.push({ type: 'doctype', value: doctype });
    else if (script) tokens.push({ type: 'script', value: script.trim() });
    else if (style)  tokens.push({ type: 'style',  value: style.trim() });
    else if (close)  tokens.push({ type: 'close',  value: close.trim() });
    else if (open) {
      const tag = (open.match(/<([\w:-]+)/) || [])[1]?.toLowerCase() || '';
      tokens.push({ type: 'open', value: open.trim(), void: VOID_TAGS.has(tag), selfClose: open.trimEnd().endsWith('/>') });
    } else if (text) {
      const t = text.replace(/\s+/g, ' ').trim();
      if (t) tokens.push({ type: 'text', value: t });
    }
  }
  return tokens;
}

function formatCss(css) {
  return css
    .replace(/\s*\{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\s*\}\s*/g, '\n}\n')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n').map(l => l.trimEnd()).join('\n')
    .trim();
}

function formatJs(js) {
  let depth = 0;
  const lines = [];
  for (const raw of js.split('\n')) {
    const line = raw.trim();
    if (!line) { lines.push(''); continue; }
    const startsClose = /^[}\])]/.test(line);
    if (startsClose) depth = Math.max(0, depth - 1);
    lines.push('  '.repeat(depth) + line);
    const opens  = (line.match(/[{[(]/g) || []).length;
    const closes = (line.match(/[}\])]/g) || []).length;
    depth = Math.max(0, depth + opens - closes + (startsClose ? 1 : 0));
  }
  return lines.join('\n');
}

function minifyCss(css) {
  return css.replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function minifyJs(js) {
  return js.replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function formatHtml(html, indentSize = 2) {
  const INDENT = ' '.repeat(indentSize);
  const src = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const tokens = tokenizeHtml(src);
  let depth = 0;
  const out = [];
  const ind = d => INDENT.repeat(Math.max(0, d));
  for (const tok of tokens) {
    if (tok.type === 'comment' || tok.type === 'doctype') {
      out.push(ind(depth) + tok.value);
    } else if (tok.type === 'open') {
      out.push(ind(depth) + tok.value);
      if (!tok.void && !tok.selfClose) depth++;
    } else if (tok.type === 'close') {
      depth = Math.max(0, depth - 1);
      out.push(ind(depth) + tok.value);
    } else if (tok.type === 'text') {
      out.push(ind(depth) + tok.value);
    } else if (tok.type === 'script') {
      const m = tok.value.match(/^(<script(?:\s[^>]*)?>)([\s\S]*?)(<\/script>)$/i);
      if (m) {
        out.push(ind(depth) + m[1]);
        const js = m[2].trim();
        if (js) formatJs(js).split('\n').forEach(l => out.push(ind(depth + 1) + l));
        out.push(ind(depth) + m[3]);
      } else out.push(ind(depth) + tok.value);
    } else if (tok.type === 'style') {
      const m = tok.value.match(/^(<style(?:\s[^>]*)?>)([\s\S]*?)(<\/style>)$/i);
      if (m) {
        out.push(ind(depth) + m[1]);
        const css = m[2].trim();
        if (css) formatCss(css).split('\n').forEach(l => out.push(ind(depth + 1) + l));
        out.push(ind(depth) + m[3]);
      } else out.push(ind(depth) + tok.value);
    }
  }
  return out.filter((l, i, a) => l.trim() || (i > 0 && a[i - 1]?.trim())).join('\n');
}

function minifyHtml(html, keepComments = false) {
  const src = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const tokens = tokenizeHtml(src);
  let result = '';
  for (const tok of tokens) {
    if (tok.type === 'comment') { if (keepComments) result += tok.value; continue; }
    if (tok.type === 'doctype') {
      result += tok.value;
    } else if (tok.type === 'open' || tok.type === 'close') {
      result += tok.value;
    } else if (tok.type === 'text') {
      result += tok.value.replace(/\s+/g, ' ');
    } else if (tok.type === 'script') {
      const m = tok.value.match(/^(<script(?:\s[^>]*)?>)([\s\S]*?)(<\/script>)$/i);
      if (m) {
        result += m[1] + minifyJs(m[2]).trim() + m[3];
      } else {
        result += tok.value;
      }
    } else if (tok.type === 'style') {
      const m = tok.value.match(/^(<style(?:\s[^>]*)?>)([\s\S]*?)(<\/style>)$/i);
      if (m) {
        result += m[1] + minifyCss(m[2]).trim() + m[3];
      } else {
        result += tok.value;
      }
    }
  }
  return result.replace(/>\s+</g, '><').trim();
}

/* ── Syntax Highlighting ─────────────────────────────────────────── */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function getC() {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  return dark
    ? { punct: '#6b7280', tag: '#4ec9b0', attrN: '#9cdcfe', attrV: '#ce9178', comment: '#6a9955', text: '#d4d4d4' }
    : { punct: '#374151', tag: '#1d4ed8', attrN: '#0f766e', attrV: '#b45309', comment: '#6b7280', text: '#374151' };
}

function hlAttrs(str, C) {
  if (!str) return '';
  return str.replace(
    /(\s*)([a-zA-Z_:][a-zA-Z0-9_:.-]*)(?:(=)(?:"([^"]*)"|'([^']*)'|(\S+)))?/g,
    (full, space, name, eq, dq, sq, bare) => {
      if (!name) return esc(full);
      let r = space + `<span style="color:${C.attrN}">${name}</span>`;
      if (eq !== undefined) {
        r += `<span style="color:${C.punct}">=</span>`;
        if (dq  !== undefined) r += `<span style="color:${C.attrV}">"${esc(dq)}"</span>`;
        else if (sq   !== undefined) r += `<span style="color:${C.attrV}">'${esc(sq)}'</span>`;
        else if (bare !== undefined) r += `<span style="color:${C.attrV}">${esc(bare)}</span>`;
      }
      return r;
    }
  );
}

function highlightHtml(code) {
  const C = getC();
  let out = '';
  const re = /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z][a-zA-Z0-9:-]*)([^>]*?)(\/?>)|([^<]+|<)/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    const [full, comment, openClose, tagName, attrs, close, other] = m;
    if (comment !== undefined) {
      out += `<span style="color:${C.comment}">${esc(comment)}</span>`;
    } else if (tagName !== undefined) {
      out += `<span style="color:${C.punct}">${esc(openClose)}</span>`;
      out += `<span style="color:${C.tag}">${tagName}</span>`;
      out += hlAttrs(attrs, C);
      out += `<span style="color:${C.punct}">${esc(close)}</span>`;
    } else {
      out += `<span style="color:${C.text}">${esc(other || full)}</span>`;
    }
  }
  return out;
}

function highlightHtmlWithSearch(code, query, caseSensitive, currentIdx) {
  if (!query || !code) return highlightHtml(code);
  const q  = caseSensitive ? query      : query.toLowerCase();
  const s  = caseSensitive ? code       : code.toLowerCase();
  const qLen = query.length;
  const positions = [];
  let pos = 0;
  while ((pos = s.indexOf(q, pos)) !== -1) { positions.push(pos); pos += qLen; }
  if (!positions.length) return highlightHtml(code);

  const parts = [];
  let last = 0;
  positions.forEach((start, i) => {
    if (start > last) parts.push({ text: code.slice(last, start), match: false });
    parts.push({ text: code.slice(start, start + qLen), match: true, current: i === currentIdx });
    last = start + qLen;
  });
  if (last < code.length) parts.push({ text: code.slice(last), match: false });

  return parts.map(p => {
    if (!p.text) return '';
    const hl = highlightHtml(p.text);
    if (!p.match) return hl;
    const bg = p.current ? 'rgba(251,191,36,0.55)' : 'rgba(251,191,36,0.22)';
    const outline = p.current ? ';outline:2px solid rgba(251,191,36,0.8)' : '';
    return `<mark style="background:${bg};color:inherit;border-radius:2px${outline}">${hl}</mark>`;
  }).join('');
}

/* ── Component ───────────────────────────────────────────────────── */
const PLACEHOLDER = `<!-- Paste your HTML here and click Format -->
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Example</title><style>body{margin:0;font-family:sans-serif;background:#f0f0f0;}.container{max-width:800px;margin:0 auto;padding:20px;}</style></head>
<body><div class="container"><h1>Hello World</h1><p>This is an example paragraph with some content.</p></div><script>document.addEventListener('DOMContentLoaded',function(){console.log('Page loaded');var el=document.querySelector('h1');if(el){el.style.color='#333';}});</script></body></html>`;

let histId = 0;

export default function HtmlFormatterTool() {
  const [input, setInput]         = useState('');
  const [formatted, setFormatted] = useState('');
  const [mode, setMode]           = useState('input'); // 'input' | 'formatted'
  const [history, setHistory]     = useState([]);
  const [histOpen, setHistOpen]   = useState(false);
  const [copied, setCopied]       = useState(false);
  const [status, setStatus]       = useState(''); // '' | 'ok' | 'err'

  const [dragging, setDragging]   = useState(false);
  const [indent, setIndent]           = useState(2);
  const [wrap, setWrap]               = useState(false);
  const [keepComments, setKeepComments] = useState(false);

  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCase,  setSearchCase]  = useState(false);
  const [searchIdx,   setSearchIdx]   = useState(0);

  const textareaRef  = useRef(null);
  const lineNumRef   = useRef(null);
  const preLineRef   = useRef(null);
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const outputRef    = useRef(null);

  const code = mode === 'formatted' ? formatted : input;
  const lineCount = Math.max((code || '').split('\n').length, 1);
  const lineNums  = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

  const syncTextareaScroll = useCallback((e) => {
    if (lineNumRef.current) lineNumRef.current.scrollTop = e.target.scrollTop;
  }, []);

  const syncPreScroll = useCallback((e) => {
    if (preLineRef.current) preLineRef.current.scrollTop = e.target.scrollTop;
  }, []);

  const searchMatches = useMemo(() => {
    if (!searchQuery || !code) return [];
    const q = searchCase ? searchQuery : searchQuery.toLowerCase();
    const s = searchCase ? code        : code.toLowerCase();
    const out = [];
    let pos = 0;
    while ((pos = s.indexOf(q, pos)) !== -1) { out.push(pos); pos += q.length; }
    return out;
  }, [searchQuery, code, searchCase]);

  const clampedIdx = searchMatches.length
    ? ((searchIdx % searchMatches.length) + searchMatches.length) % searchMatches.length
    : 0;

  // Reset index when query changes
  useEffect(() => { setSearchIdx(0); }, [searchQuery, searchCase]);

  // Ctrl/Cmd+F opens search bar
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.select(), 0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Scroll textarea to current match in input mode
  useEffect(() => {
    if (!searchOpen || !searchMatches.length || mode !== 'input') return;
    const start = searchMatches[clampedIdx];
    const ta = textareaRef.current;
    if (!ta) return;
    ta.focus();
    ta.setSelectionRange(start, start + searchQuery.length);
  }, [clampedIdx, searchOpen, mode, searchMatches, searchQuery]);

  // Scroll <pre> to current match in formatted mode
  useEffect(() => {
    if (!searchOpen || !searchMatches.length || mode !== 'formatted') return;
    const pre = outputRef.current;
    if (!pre) return;
    const marks = pre.querySelectorAll('mark');
    marks[clampedIdx]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [clampedIdx, searchOpen, mode, searchMatches]);

  const goNext = () => setSearchIdx(i => searchMatches.length ? (i + 1) % searchMatches.length : 0);
  const goPrev = () => setSearchIdx(i => searchMatches.length ? (i - 1 + searchMatches.length) % searchMatches.length : 0);

  const handleFormat = () => {
    const src = (input || '').trim() || PLACEHOLDER;
    try {
      const result = formatHtml(src, indent);
      const entry = {
        id: ++histId,
        ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        lines: result.split('\n').length,
        chars: result.length,
        preview: src.replace(/\s+/g, ' ').trim().slice(0, 80),
        code: result,
      };
      setHistory(h => [entry, ...h].slice(0, 15));
      setFormatted(result);
      setMode('formatted');
      setStatus('ok');
      setTimeout(() => setStatus(''), 2000);
    } catch {
      setStatus('err');
      setTimeout(() => setStatus(''), 2000);
    }
  };

  const handleMinify = () => {
    const src = (mode === 'formatted' ? formatted : input || '').trim() || PLACEHOLDER;
    try {
      const result = minifyHtml(src, keepComments);
      const entry = {
        id: ++histId,
        ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        lines: result.split('\n').length,
        chars: result.length,
        preview: src.replace(/\s+/g, ' ').trim().slice(0, 80),
        code: result,
      };
      setHistory(h => [entry, ...h].slice(0, 15));
      setFormatted(result);
      setMode('formatted');
      setStatus('ok');
      setTimeout(() => setStatus(''), 2000);
    } catch {
      setStatus('err');
      setTimeout(() => setStatus(''), 2000);
    }
  };

  const handleEdit = () => {
    setInput(formatted || input);
    setMode('input');
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleCopy = async () => {
    const text = mode === 'formatted' ? formatted : input;
    if (!text) return;
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setFormatted('');
    setMode('input');
    setStatus('');
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleDownload = () => {
    const text = mode === 'formatted' ? formatted : input;
    if (!text) return;
    const blob = new Blob([text], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target.result);
      setFormatted('');
      setMode('input');
      setTimeout(() => textareaRef.current?.focus(), 0);
    };
    reader.readAsText(file);
  };

  const handleFileInput = (e) => {
    loadFile(e.target.files[0]);
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  const restoreHistory = (entry) => {
    setFormatted(entry.code);
    setInput(entry.code);
    setMode('formatted');
    setHistOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <DevConvertersTopNav active="html-formatter" />
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>HTML <span className={styles.accent}>Formatter</span></span>
        <div className={styles.headerSep}/>
        <span className={styles.headerSub}>Prettify HTML · Format inline CSS &amp; JS · Minify HTML</span>
        <div className={styles.headerMeta}>
          <span className={styles.metaChip}>{lineCount}L</span>
          <span className={styles.metaChip}>{code.length}ch</span>
          {mode === 'formatted' && <span className={styles.modeBadge}>Formatted</span>}
        </div>
      </header>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <button className={styles.formatBtn} onClick={handleFormat}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4"/><polyline points="4 20 4 17"/><line x1="4" y1="11" x2="14" y2="11"/><line x1="4" y1="15" x2="12" y2="15"/>
          </svg>
          Format
        </button>

        <div className={styles.chipGroup}>
          {[2, 4].map(n => (
            <button key={n}
              className={`${styles.chipBtn} ${indent === n ? styles.chipBtnActive : ''}`}
              onClick={() => {
                setIndent(n);
                if (mode === 'formatted' && formatted) {
                  try { setFormatted(formatHtml(formatted, n)); } catch {}
                }
              }}
              title={`Indent ${n} spaces`}
            >{n}</button>
          ))}
        </div>

        <button className={styles.toolBtn} onClick={handleMinify}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M4 12h10M4 17h16"/>
          </svg>
          Minify
        </button>

        <label className={styles.keepLabel}>
          <input type="checkbox" checked={keepComments} onChange={e => setKeepComments(e.target.checked)} />
          <span>Keep comments</span>
        </label>

        {mode === 'formatted' && (
          <button className={styles.editBtn} onClick={handleEdit}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
        )}

        <div className={styles.toolbarSep}/>

        <button className={styles.toolBtn} onClick={() => fileInputRef.current?.click()}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload
        </button>
        <input ref={fileInputRef} type="file" accept=".html,.htm,.xml,.svg,.txt" style={{ display: 'none' }} onChange={handleFileInput} />
        <button className={styles.toolBtn} onClick={handleCopy} disabled={!code}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <button className={styles.toolBtn} onClick={handleDownload} disabled={!code}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download
        </button>
        <button className={styles.toolBtn} onClick={handleClear} disabled={!code}>
          Clear
        </button>

        {status === 'ok'  && <span className={styles.statusOk}>✓ Formatted</span>}
        {status === 'err' && <span className={styles.statusErr}>✗ Parse error</span>}

        <div className={styles.toolbarSpacer}/>

        <button
          className={`${styles.toolBtn} ${wrap ? styles.toolBtnActive : ''}`}
          onClick={() => setWrap(w => !w)}
          title="Toggle line wrap"
        >Wrap</button>

        <button
          className={`${styles.toolBtn} ${searchOpen ? styles.toolBtnActive : ''}`}
          onClick={() => { setSearchOpen(o => !o); setTimeout(() => searchInputRef.current?.select(), 0); }}
          title="Find (Ctrl+F)"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Find
        </button>

        <button className={styles.histBtn} onClick={() => setHistOpen(true)}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          History
          {history.length > 0 && <span className={styles.histBadge}>{history.length}</span>}
        </button>
      </div>

      {/* ── Search Bar ── */}
      {searchOpen && (
        <div className={styles.searchBar}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={searchInputRef}
            className={styles.searchInput}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Find in code…"
            spellCheck={false}
            onKeyDown={e => {
              if (e.key === 'Enter')  { e.shiftKey ? goPrev() : goNext(); }
              if (e.key === 'Escape') { setSearchOpen(false); }
            }}
          />
          <span className={styles.searchCount}>
            {searchQuery
              ? (searchMatches.length ? `${clampedIdx + 1} / ${searchMatches.length}` : 'No results')
              : ''}
          </span>
          <button className={styles.searchNavBtn} onClick={goPrev} title="Previous (Shift+Enter)" disabled={!searchMatches.length}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button className={styles.searchNavBtn} onClick={goNext} title="Next (Enter)" disabled={!searchMatches.length}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button
            className={`${styles.searchCaseBtn} ${searchCase ? styles.searchCaseActive : ''}`}
            onClick={() => setSearchCase(c => !c)}
            title="Case sensitive"
          >Aa</button>
          <button className={styles.searchCloseBtn} onClick={() => setSearchOpen(false)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Drop HTML file here
          </div>
        )}
        {/* Line numbers */}
        <div
          className={styles.lineNums}
          ref={mode === 'formatted' ? preLineRef : lineNumRef}
          aria-hidden="true"
        >
          {lineNums}
        </div>

        {mode === 'input' ? (
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
            style={{ whiteSpace: wrap ? 'pre-wrap' : 'pre' }}
          />
        ) : (
          <pre
            ref={outputRef}
            className={styles.output}
            onScroll={syncPreScroll}
            style={{ whiteSpace: wrap ? 'pre-wrap' : 'pre' }}
            dangerouslySetInnerHTML={{
              __html: (searchOpen && searchQuery
                ? highlightHtmlWithSearch(formatted, searchQuery, searchCase, clampedIdx)
                : highlightHtml(formatted)) + '\n'
            }}
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
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {history.length === 0 ? (
              <div className={styles.histEmpty}>No history yet. Click Format to save a snapshot.</div>
            ) : (
              <div className={styles.histList}>
                {history.map((h, i) => (
                  <button key={h.id} className={styles.histItem} onClick={() => restoreHistory(h)}>
                    <div className={styles.histItemTop}>
                      {i === 0 && <span className={styles.histItemLatest}>latest</span>}
                      <span className={styles.histItemTs}>{h.ts}</span>
                      <span className={styles.histItemStats}>{h.lines}L · {h.chars}ch</span>
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
