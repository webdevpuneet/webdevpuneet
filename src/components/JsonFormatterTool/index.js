'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './styles.module.css';
import JsonToolsTopNav from '@/components/JsonToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
function LineNums({ count, scrollTopRef, className }) {
  const ref = useRef(null);
  scrollTopRef.current = (top) => { if (ref.current) ref.current.scrollTop = top; };
  return (
    <div ref={ref} className={`${styles.lineNums} ${className || ''}`} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={styles.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

// ── Pure utility functions ───────────────────────────────────────────────────

function syntaxHighlight(json) {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}\[\],:])/g,
      (match) => {
        if (/^"/.test(match)) {
          if (/:$/.test(match))
            return `<span class="j-key">${match.slice(0, -1)}</span><span class="j-punct">:</span>`;
          return `<span class="j-str">${match}</span>`;
        }
        if (/true|false/.test(match)) return `<span class="j-bool">${match}</span>`;
        if (/null/.test(match)) return `<span class="j-null">${match}</span>`;
        if (/[{}\[\]]/.test(match)) return `<span class="j-punct">${match}</span>`;
        if (/,/.test(match)) return `<span class="j-punct">${match}</span>`;
        return `<span class="j-num">${match}</span>`;
      }
    );
}

function countKeys(obj) {
  if (typeof obj !== 'object' || obj === null) return 0;
  let count = 0;
  if (Array.isArray(obj)) {
    obj.forEach((v) => (count += countKeys(v)));
  } else {
    count += Object.keys(obj).length;
    Object.values(obj).forEach((v) => (count += countKeys(v)));
  }
  return count;
}

function getDepth(obj, d = 0) {
  if (typeof obj !== 'object' || obj === null) return d;
  const children = Array.isArray(obj) ? obj : Object.values(obj);
  if (!children.length) return d + 1;
  return Math.max(...children.map((v) => getDepth(v, d + 1)));
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function friendlyError(msg) {
  const m = msg.match(/position (\d+)/);
  if (m) return `Syntax error near position ${m[1]}`;
  if (msg.includes('Unexpected token')) return 'Unexpected token — check commas & quotes';
  if (msg.includes('Unexpected end')) return 'Unexpected end — missing closing bracket?';
  return 'Invalid JSON — ' + msg.slice(0, 60);
}

function sortObject(obj) {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((acc, k) => {
        acc[k] = sortObject(obj[k]);
        return acc;
      }, {});
  }
  return obj;
}

function addMissingClosers(s) {
  const stack = [];
  let inStr = false;
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (inStr) {
      if (ch === '\\') { i += 2; continue; }
      if (ch === '"') inStr = false;
      i++; continue;
    }
    if (ch === '"') { inStr = true; i++; continue; }
    if (ch === '{') { stack.push('}'); i++; continue; }
    if (ch === '[') { stack.push(']'); i++; continue; }
    if (ch === '}' || ch === ']') {
      if (stack.length && stack[stack.length - 1] === ch) stack.pop();
      i++; continue;
    }
    i++;
  }
  return stack.length ? s + stack.reverse().join('') : s;
}

function repairJson(raw) {
  let s = raw.trim();
  // BOM
  if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
  // Exotic whitespace (non-breaking space, thin space, etc.) → regular space
  s = s.replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ');
  // Smart / curly quotes → straight quotes
  s = s.replace(/[\u2018\u2019]/g, "'");
  s = s.replace(/[\u201C\u201D]/g, '"');
  // JS comments
  s = s.replace(/\/\/[^\n\r]*/g, '');
  s = s.replace(/\/\*[\s\S]*?\*\//g, '');
  // Python / Ruby literals
  s = s.replace(/\bTrue\b/g, 'true');
  s = s.replace(/\bFalse\b/g, 'false');
  s = s.replace(/\bNone\b/g, 'null');
  // JS special values
  s = s.replace(/\b(NaN|-?Infinity)\b/g, 'null');
  s = s.replace(/\bundefined\b/g, 'null');
  // Trailing commas before } or ]
  s = s.replace(/,(\s*[}\]])/g, '$1');
  // Consecutive commas → single comma
  s = s.replace(/,(\s*,)+/g, ',');
  // \x hex escapes → \uXXXX (not valid in JSON)
  s = s.replace(/\\x([0-9a-fA-F]{2})/g, '\\u00$1');
  // Single-quoted strings → double-quoted
  s = s.replace(/'((?:[^'\\]|\\.)*)'/g, (_, inner) =>
    '"' + inner.replace(/\\'/g, "'").replace(/"/g, '\\"') + '"'
  );
  // Unquoted identifier keys: { key: → { "key":
  s = s.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:(?!:))/g, '$1"$2"$3');
  // Unquoted numeric keys: { 1: → { "1":
  s = s.replace(/([{,]\s*)(\d+)(\s*:)/g, '$1"$2"$3');
  // Append any missing closing } or ]
  s = addMissingClosers(s);
  return s;
}

// ── Collapsible JSON tree ────────────────────────────────────────────────────

function JsonNode({ keyName, value, indent, indentStr, isLast, initialCollapsed, path, onPath }) {
  const isObj = value !== null && typeof value === 'object';
  const isArr = Array.isArray(value);
  const entries = isObj ? (isArr ? value : Object.entries(value)) : null;
  const count = entries ? entries.length : 0;
  const collapsible = isObj && count > 0;
  const [collapsed, setCollapsed] = useState(collapsible && initialCollapsed);

  const comma = !isLast ? <span className="j-punct">,</span> : null;
  const keyEl = keyName !== undefined
    ? <><span className="j-key">{JSON.stringify(keyName)}</span><span className="j-punct">:</span>{' '}</>
    : null;

  const Row = ({ arrow, children }) => (
    <div data-tl="" className={styles.treeLine}
      onClick={() => onPath?.(path)}
      style={{ cursor: onPath ? 'pointer' : undefined }}
    >
      <span className={styles.treeGutter}>{arrow ?? null}</span>
      <span className={styles.lineContent}>{indent}{children}</span>
    </div>
  );

  // Primitive
  if (!isObj) {
    let cls, text;
    if (value === null)                  { cls = 'j-null'; text = 'null'; }
    else if (typeof value === 'boolean') { cls = 'j-bool'; text = String(value); }
    else if (typeof value === 'number')  { cls = 'j-num';  text = String(value); }
    else                                 { cls = 'j-str';  text = JSON.stringify(value); }
    return <Row>{keyEl}<span className={cls}>{text}</span>{comma}</Row>;
  }

  const open  = isArr ? '[' : '{';
  const close = isArr ? ']' : '}';
  const childIndent = indent + indentStr;

  if (count === 0) {
    return <Row>{keyEl}<span className="j-punct">{open}{close}</span>{comma}</Row>;
  }

  const toggleBtn = (
    <button
      className={styles.collapseBtn}
      onClick={(e) => { e.stopPropagation(); setCollapsed(c => !c); }}
      title={collapsed ? 'Expand' : 'Collapse'}
    >
      {collapsed ? '▶' : '▼'}
    </button>
  );

  if (collapsed) {
    return (
      <Row arrow={toggleBtn}>
        {keyEl}
        <span className="j-punct">{open}</span>
        <span className={styles.ellipsis} onClick={(e) => { e.stopPropagation(); setCollapsed(false); }}>
          {' '}{count} {isArr ? (count === 1 ? 'item' : 'items') : (count === 1 ? 'key' : 'keys')}{' '}
        </span>
        <span className="j-punct">{close}</span>
        {comma}
      </Row>
    );
  }

  const childPath = (k, i) =>
    isArr
      ? `${path}[${i}]`
      : /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)
        ? `${path}.${k}`
        : `${path}["${k.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`;

  const kids = isArr
    ? entries.map((v, i) => (
        <JsonNode key={i} value={v} indent={childIndent} indentStr={indentStr}
          isLast={i === count - 1} initialCollapsed={initialCollapsed}
          path={childPath(null, i)} onPath={onPath} />
      ))
    : entries.map(([k, v], i) => (
        <JsonNode key={k} keyName={k} value={v} indent={childIndent} indentStr={indentStr}
          isLast={i === count - 1} initialCollapsed={initialCollapsed}
          path={childPath(k, i)} onPath={onPath} />
      ));

  return (
    <>
      <Row arrow={toggleBtn}>{keyEl}<span className="j-punct">{open}</span></Row>
      {kids}
      <div data-tl="" className={styles.treeLine}>
        <span className={styles.treeGutter} />
        <span className={styles.lineContent}>{indent}<span className="j-punct">{close}</span>{comma}</span>
      </div>
    </>
  );
}

// ── Search helpers ────────────────────────────────────────────────────────────

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Walk the HTML string, only replacing inside text nodes (not tag attributes).
// Returns the new HTML with <mark> tags injected.
function applySearch(html, query, currentIdx) {
  if (!query.trim()) return html;
  const re = new RegExp(escapeRe(query), 'gi');
  const parts = html.split(/(<[^>]+>)/g);
  let matchIdx = 0;
  return parts.map((part, i) => {
    if (i % 2 === 1) return part; // tag node — skip
    return part.replace(re, (m) => {
      const cls = matchIdx === currentIdx ? 'j-search j-search-current' : 'j-search';
      matchIdx++;
      return `<mark class="${cls}">${m}</mark>`;
    });
  }).join('');
}

function countSearchMatches(html, query) {
  if (!query.trim() || !html) return 0;
  const re = new RegExp(escapeRe(query), 'gi');
  const parts = html.split(/(<[^>]+>)/g);
  let count = 0;
  parts.forEach((part, i) => {
    if (i % 2 === 1) return;
    const m = part.match(re);
    if (m) count += m.length;
  });
  return count;
}

const SAMPLE = {
  project: 'JSONfmt',
  version: '2.0',
  features: ['syntax highlighting', 'minify', 'sort keys', 'live parse'],
  meta: { author: 'you', license: 'MIT', active: true, count: 42, notes: null },
};

const HISTORY_KEY = 'jsonformatter_history';
const MAX_HISTORY = 15;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function persistHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
  return history;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function JsonFormatterTool() {
  const [input, setInput] = useState(JSON.stringify(SAMPLE));
  const [outputHtml, setOutputHtml] = useState('');
  const [indent, setIndent] = useState('2');
  const [inStatus, setInStatus] = useState({ type: 'idle', msg: 'Paste or type JSON…' });
  const [outStatus, setOutStatus] = useState({ type: 'idle', msg: 'Formatted output appears here' });
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({ keys: 0, depth: 0, size: '' });
  const [inMeta, setInMeta] = useState('');
  const [outMeta, setOutMeta] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [cursorInfo, setCursorInfo] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyIdRef = useRef(0);

  const [outputLineCount, setOutputLineCount] = useState(0);
  const [parsedValue, setParsedValue] = useState(null);
  const [formattedText, setFormattedText] = useState('');
  const [treeMode, setTreeMode] = useState(false);
  const [treeKey, setTreeKey] = useState(0);
  const [treeInitCollapsed, setTreeInitCollapsed] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [jsonPath, setJsonPath] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [searchIndex, setSearchIndex] = useState(0);

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const toastTimerRef = useRef(null);
  const debounceRef = useRef(null);
  const syncInputNums = useRef(() => {});
  const syncOutputNums = useRef(() => {});
  const searchInputRef = useRef(null);
  const outputScrollRef = useRef(null);
  const treeContainerRef = useRef(null);
  const [treeLineCount, setTreeLineCount] = useState(1);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast({ show: false, msg: '' }), 2200);
  }, []);

  const closeSearch = useCallback(() => {
    setShowSearch(false);
    setSearchQuery('');
    setSearchCount(0);
    setSearchIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setShowSearch(true);
    setTimeout(() => searchInputRef.current?.focus(), 30);
  }, []);

  const navigateSearch = useCallback((dir) => {
    setSearchIndex((prev) => {
      if (searchCount === 0) return 0;
      return (prev + dir + searchCount) % searchCount;
    });
  }, [searchCount]);

  const saveHistoryEntry = useCallback((action, text) => {
    if (!text || !text.trim()) return;
    const entryText = text.trim();
    const entry = {
      id: ++historyIdRef.current,
      action,
      ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      lines: entryText.split('\n').length,
      chars: entryText.length,
      preview: entryText.replace(/\s+/g, ' ').trim().slice(0, 120),
      text: entryText,
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_HISTORY);
      persistHistory(next);
      return next;
    });
  }, []);

  const doFormat = useCallback((raw, ind) => {
    if (!raw.trim()) {
      setInStatus({ type: 'idle', msg: 'Paste or type JSON…' });
      setOutStatus({ type: 'idle', msg: 'Formatted output appears here' });
      setOutputHtml('');
      setFormattedText('');
      setParsedValue(null);
      setTreeMode(false);
      setIsEmpty(true);
      setShowStats(false);
      setInMeta('');
      setOutMeta('');
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      const indentVal = ind === 'tab' ? '\t' : parseInt(ind);
      const formatted = JSON.stringify(parsed, null, indentVal);
      setOutputHtml(syntaxHighlight(formatted));
      setFormattedText(formatted);
      setParsedValue(parsed);
      setTreeMode(true);
      setIsEmpty(false);
      const lines = formatted.split('\n').length;
      setOutputLineCount(lines);
      const size = formatSize(new Blob([formatted]).size);
      const rawSize = formatSize(new Blob([raw]).size);
      setInStatus({ type: 'ok', msg: 'Valid JSON' });
      setOutStatus({ type: 'ok', msg: 'Formatted successfully' });
      setInMeta(rawSize);
      setOutMeta(`${lines} lines · ${size}`);
      setShowStats(true);
      setStats({ keys: countKeys(parsed), depth: getDepth(parsed), size });
      return true;
    } catch (e) {
      setInStatus({ type: 'err', msg: friendlyError(e.message) });
      setOutStatus({ type: 'idle', msg: 'Fix errors in input' });
      setOutputHtml('');
      setFormattedText('');
      setParsedValue(null);
      setTreeMode(false);
      setIsEmpty(true);
      setShowStats(false);
      setInMeta('');
      setOutMeta('');
      return false;
    }
  }, []);

  // Load history and initial sample on mount
  useEffect(() => {
    const stored = loadHistory();
    setHistory(stored);
    historyIdRef.current = stored.reduce((maxId, entry) => Math.max(maxId, entry.id || 0), 0);
    doFormat(JSON.stringify(SAMPLE), '2');
    inputRef.current?.focus();
  }, [doFormat]);

  // Update match count whenever query or output changes; reset to first match
  useEffect(() => {
    const count = countSearchMatches(outputHtml, searchQuery);
    setSearchCount(count);
    setSearchIndex(0);
  }, [searchQuery, outputHtml]);

  // Scroll current match into view whenever the active index changes
  useEffect(() => {
    if (!showSearch || !searchQuery || !outputScrollRef.current) return;
    const el = outputScrollRef.current.querySelector('.j-search-current');
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [searchIndex, showSearch, searchQuery]);

  // Close search when output is cleared
  useEffect(() => {
    if (isEmpty && showSearch) closeSearch();
  }, [isEmpty, showSearch, closeSearch]);

  // Global Ctrl+F opens search when output has content
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && !isEmpty) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isEmpty, openSearch]);

  // Count visible tree lines via MutationObserver (data-tl avoids CSS-module class issues)
  useEffect(() => {
    if (!treeMode || showSearch) return;
    const el = treeContainerRef.current;
    if (!el) return;
    const recount = () => setTreeLineCount(el.querySelectorAll('[data-tl]').length || 1);
    recount();
    const observer = new MutationObserver(recount);
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [treeMode, showSearch, treeKey]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setInMeta(val.length ? `${val.length} chars` : '');
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doFormat(val, indent), 300);
  };

  const handlePaste = () => {
    clearTimeout(debounceRef.current);
    setTimeout(() => {
      const val = inputRef.current?.value || '';
      setInput(val);
      if (doFormat(val, indent)) {
        saveHistoryEntry('Paste', val);
      }
    }, 10);
  };

  const handleIndentChange = (e) => {
    const val = e.target.value;
    setIndent(val);
    doFormat(input, val);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') { closeSearch(); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      navigateSearch(e.shiftKey ? -1 : 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const tabStr = indent === 'tab' ? '\t' : ' '.repeat(parseInt(indent));
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newVal = input.slice(0, start) + tabStr + input.slice(end);
      setInput(newVal);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + tabStr.length;
      }, 0);
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      doFormat(input, indent);
    }
  };

  const updateCursor = (e) => {
    const val = e.target.value;
    const pos = e.target.selectionStart;
    const lines = val.slice(0, pos).split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursorInfo(`Ln ${line}, Col ${col}`);
  };

  const formatJSON = () => {
    if (doFormat(input, indent)) {
      saveHistoryEntry('Format', input);
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutputHtml(syntaxHighlight(minified));
      setFormattedText(minified);
      setParsedValue(null);
      setTreeMode(false);
      setIsEmpty(false);
      setOutputLineCount(1);
      const size = formatSize(new Blob([minified]).size);
      setOutStatus({ type: 'ok', msg: `Minified · ${size}` });
      setOutMeta(`1 line · ${size}`);
      setShowStats(false);
      saveHistoryEntry('Minify', minified);
    } catch (e) {
      setInStatus({ type: 'err', msg: friendlyError(e.message) });
    }
  };

  const sortKeys = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const sorted = sortObject(parsed);
      const indentVal = indent === 'tab' ? '\t' : parseInt(indent);
      const formatted = JSON.stringify(sorted, null, indentVal);
      setInput(formatted);
      doFormat(formatted, indent);
      saveHistoryEntry('Sort keys', formatted);
      showToast('Keys sorted alphabetically');
    } catch (e) {
      setInStatus({ type: 'err', msg: friendlyError(e.message) });
    }
  };

  const loadFile = async (file) => {
    try {
      const text = await file.text();
      setInput(text);
      setInMeta(`${file.name} · ${formatSize(file.size)}`);
      if (doFormat(text, indent)) saveHistoryEntry('Upload', text);
      showToast(`Loaded ${file.name}`);
    } catch (e) {
      setInStatus({ type: 'err', msg: 'Unable to read file' });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = '';
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) loadFile(file);
  };

  const copyOutput = () => {
    if (!formattedText.trim()) return;
    navigator.clipboard.writeText(formattedText).then(() => showToast('Copied to clipboard!'));
  };

  const downloadJSON = () => {
    if (!formattedText.trim()) return;
    const blob = new Blob([formattedText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded formatted.json');
  };

  const clearAll = () => {
    setInput('');
    setOutputHtml('');
    setFormattedText('');
    setParsedValue(null);
    setTreeMode(false);
    setIsEmpty(true);
    setInStatus({ type: 'idle', msg: 'Paste or type JSON…' });
    setOutStatus({ type: 'idle', msg: 'Formatted output appears here' });
    setShowStats(false);
    setInMeta('');
    setOutMeta('');
    inputRef.current?.focus();
  };

  const repairJSON = () => {
    if (!input.trim()) return;
    try { JSON.parse(input); showToast('JSON is already valid'); return; } catch {}
    try {
      const repaired = repairJson(input);
      const parsed = JSON.parse(repaired);
      const indentVal = indent === 'tab' ? '\t' : parseInt(indent);
      const formatted = JSON.stringify(parsed, null, indentVal);
      setInput(formatted);
      doFormat(formatted, indent);
      saveHistoryEntry('Repair', formatted);
      showToast('JSON repaired successfully');
    } catch {
      showToast('Could not repair — too many issues');
    }
  };

  const collapseAll = () => {
    setTreeInitCollapsed(true);
    setTreeKey((k) => k + 1);
  };

  const expandAll = () => {
    setTreeInitCollapsed(false);
    setTreeKey((k) => k + 1);
  };

  // Derived: syntax-highlighted HTML with search marks overlaid
  const displayHtml = useMemo(() => {
    if (!searchQuery.trim() || !outputHtml) return outputHtml;
    return applySearch(outputHtml, searchQuery, searchIndex);
  }, [outputHtml, searchQuery, searchIndex]);

  return (
    <div className={styles.wrap}>
      <JsonToolsTopNav active="json-formatter" />
      <PlaygroundTopAd />
      {/* Tool Header / Toolbar */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>{'{}'}</div>
          JSON<span>formatter</span>
        </div>
        <input ref={fileInputRef} type="file" accept="application/json,text/*" onChange={handleFileSelect} className={styles.hiddenFileInput} />
      </header>

      {/* Panels */}
      <main className={styles.panels}>
        {/* Input Panel */}
        <div className={styles.panel}>
          <div className={styles.inputPanelHead}>
            <span className={styles.panelLabel}>Input</span>
            <div className={styles.inputToolbar}>
              <button className={`${styles.btn} ${styles.danger}`} onClick={clearAll}>Clear</button>
              <button className={styles.btn} onClick={triggerFileInput}>Upload JSON</button>
              <div className={styles.divider} />
              <button className={`${styles.btn} ${styles.primary}`} onClick={formatJSON}>Format</button>
              <button className={styles.btn} onClick={minifyJSON}>Minify</button>
              <button className={styles.btn} onClick={repairJSON}>Repair</button>
              <div className={styles.divider} />
              <select className={styles.indentSelect} value={indent} onChange={handleIndentChange}>
                <option value="2">2 spaces</option>
                <option value="4">4 spaces</option>
                <option value="tab">Tab</option>
              </select>
              <div className={styles.divider} />
              <button className={styles.btn} onClick={sortKeys}>Sort keys</button>
            </div>
            <span className={styles.panelMeta}>{inMeta}</span>
          </div>
          <div className={styles.statusBar}>
            <div className={`${styles.statusDot} ${styles[inStatus.type]}`} />
            <span className={`${styles.statusMsg} ${styles[inStatus.type]}`}>{inStatus.msg}</span>
          </div>
          <div
            className={styles.editorWrap}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={`${styles.dropOverlay} ${isDragActive ? styles.active : ''}`}>
              <div className={styles.dropTitle}>Drop JSON file here to upload</div>
              <div className={styles.dropSubtitle}>or click Upload JSON</div>
            </div>
            <LineNums count={Math.max(1, input.split('\n').length)} scrollTopRef={syncInputNums} />
            <textarea
              ref={inputRef}
              className={styles.textarea}
              value={input}
              onChange={handleInputChange}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              onKeyUp={updateCursor}
              onClick={updateCursor}
              onScroll={e => syncInputNums.current(e.target.scrollTop)}
              placeholder='{"name":"JSONfmt","awesome":true}'
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className={styles.panel}>
          <div className={styles.outputPanelHead}>
            <span className={styles.panelLabel}>Output</span>
            <div className={styles.outputToolbar}>
              {!isEmpty && (
                <>
                  <button
                    className={`${styles.searchToggle} ${showSearch ? styles.searchToggleActive : ''}`}
                    onClick={openSearch}
                    title="Search output (Ctrl+F)"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </button>
                  {treeMode && (
                    <>
                      <div className={styles.divider} />
                      <button className={styles.btn} onClick={collapseAll} title="Collapse all nodes">Collapse All</button>
                      <button className={styles.btn} onClick={expandAll} title="Expand all nodes">Expand All</button>
                    </>
                  )}
                </>
              )}
              <div className={styles.divider} />
              <button
                className={`${styles.btn} ${wrap ? styles.btnActive : ''}`}
                onClick={() => setWrap(w => !w)}
                title="Toggle line wrap"
              >Wrap</button>
              <div className={styles.divider} />
              <button className={styles.btn} onClick={copyOutput}>Copy Output</button>
              <button className={styles.btn} onClick={downloadJSON}>Download</button>
              <div className={styles.divider} />
              <button className={styles.btn} onClick={() => setHistoryOpen(true)}>
                History{history.length > 0 ? ` (${history.length})` : ''}
              </button>
            </div>
            <span className={styles.panelMeta}>{outMeta}</span>
          </div>
          {showSearch && (
            <div className={styles.searchBar}>
              <input
                ref={searchInputRef}
                className={styles.searchInput}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search in output…"
                spellCheck={false}
              />
              <span className={styles.searchCount}>
                {searchQuery.trim()
                  ? (searchCount === 0 ? 'No results' : `${searchIndex + 1} of ${searchCount}`)
                  : ''}
              </span>
              <button className={styles.searchNavBtn} onClick={() => navigateSearch(-1)} disabled={!searchCount} title="Previous match (Shift+Enter)">↑</button>
              <button className={styles.searchNavBtn} onClick={() => navigateSearch(1)} disabled={!searchCount} title="Next match (Enter)">↓</button>
              <button className={styles.searchCloseBtn} onClick={closeSearch} title="Close search (Esc)">✕</button>
            </div>
          )}
          <div className={styles.statusBar}>
            <div className={`${styles.statusDot} ${styles[outStatus.type]}`} />
            <span className={`${styles.statusMsg} ${styles[outStatus.type]}`}>{outStatus.msg}</span>
            {showStats && (
              <div className={styles.statsRow}>
                <span className={styles.stat}>Keys: <strong>{stats.keys}</strong></span>
                <span className={styles.stat}>Depth: <strong>{stats.depth}</strong></span>
                <span className={styles.stat}>Size: <strong>{stats.size}</strong></span>
              </div>
            )}
          </div>
          <div className={styles.editorWrap}>
            {!isEmpty && (
              <LineNums
                count={treeMode && !showSearch ? treeLineCount : outputLineCount}
                scrollTopRef={syncOutputNums}
              />
            )}
            <div ref={outputScrollRef} className={styles.outputScroll} onScroll={e => syncOutputNums.current(e.target.scrollTop)}>
              {treeMode && !showSearch ? (
                <div ref={treeContainerRef} className={styles.treeOutput}>
                  <JsonNode
                    key={treeKey}
                    value={parsedValue}
                    indent=""
                    indentStr={indent === 'tab' ? '\t' : ' '.repeat(parseInt(indent))}
                    isLast={true}
                    initialCollapsed={treeInitCollapsed}
                    path="$"
                    onPath={setJsonPath}
                  />
                </div>
              ) : (
                <div
                  className={styles.output}
                  style={{ whiteSpace: wrap ? 'pre-wrap' : 'pre' }}
                  dangerouslySetInnerHTML={{ __html: displayHtml }}
                />
              )}
            </div>
            {isEmpty && (
              <div className={styles.emptyState}>
                <div className={styles.emptyGlyph}>{'{}'}</div>
                <div className={styles.emptyText}>formatted JSON will appear here</div>
              </div>
            )}
          </div>
        </div>
      </main>

      {historyOpen && (
        <div className={styles.historyOverlay} onClick={() => setHistoryOpen(false)}>
          <aside className={styles.historyPanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.historyPanelHead}>
              <span className={styles.historyPanelTitle}>History</span>
              <div className={styles.historyPanelActions}>
                <button className={`${styles.btn} ${styles.danger}`} onClick={() => { setHistory([]); try { localStorage.setItem(HISTORY_KEY, JSON.stringify([])); } catch {} }} disabled={!history.length}>Clear</button>
                <button className={styles.btn} onClick={() => setHistoryOpen(false)}>Close</button>
              </div>
            </div>

            {history.length === 0 ? (
              <div className={styles.historyEmpty}>No history yet. Click Format, Minify, Sort keys, or Upload to save entries.</div>
            ) : (
              <div className={styles.historyList}>
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    className={styles.historyItem}
                    onClick={() => {
                      setInput(entry.text);
                      doFormat(entry.text, indent);
                      setHistoryOpen(false);
                    }}
                  >
                    <div className={styles.historyItemTop}>
                      <span className={styles.historyItemAction}>{entry.action}</span>
                      <span className={styles.historyItemTs}>{entry.ts}</span>
                    </div>
                    <div className={styles.historyItemMeta}>{entry.lines} lines · {entry.chars} chars</div>
                    <div className={styles.historyItemPreview}>{entry.preview}</div>
                  </button>
                ))}
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <span>JSONformatter</span>
        <span className={styles.bottomPath}>{jsonPath || cursorInfo}</span>
      </div>

      {/* Toast */}
      <div className={`${styles.toast} ${toast.show ? styles.toastShow : ''}`}>
        {toast.msg}
      </div>
    </div>
  );
}
