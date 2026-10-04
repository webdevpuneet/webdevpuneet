'use client';

import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
// ── Sample texts ──────────────────────────────────────────────────────────────

const SAMPLE_A = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  console.log("Total: " + total);
  return total;
}

const cart = [
  { name: "Apple", price: 1.5 },
  { name: "Bread", price: 2.0 },
  { name: "Milk",  price: 1.2 },
];

const result = calculateTotal(cart);`;

const SAMPLE_B = `function calculateTotal(items, discount = 0) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const discounted = total * (1 - discount);
  console.log(\`Total: \$\{discounted.toFixed(2)\}\`);
  return discounted;
}

const cart = [
  { name: "Apple", price: 1.5 },
  { name: "Bread", price: 2.25 },
  { name: "Milk",  price: 1.2 },
  { name: "Eggs",  price: 3.0 },
];

const result = calculateTotal(cart, 0.1);`;

// ── LCS-based diff engine ─────────────────────────────────────────────────────

function getLCS(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp;
}

function diffLines(linesA, linesB, ignoreWS, ignoreCase) {
  const norm = s => {
    if (ignoreWS) s = s.replace(/\s+/g, ' ').trim();
    if (ignoreCase) s = s.toLowerCase();
    return s;
  };
  const nA = linesA.map(norm), nB = linesB.map(norm);
  const dp = getLCS(nA, nB);
  const result = [];
  let i = linesA.length, j = linesB.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && nA[i - 1] === nB[j - 1]) {
      result.push({ type: 'same', lineA: i, lineB: j, textA: linesA[i - 1], textB: linesB[j - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: 'add', lineB: j, text: linesB[j - 1] });
      j--;
    } else {
      result.push({ type: 'del', lineA: i, text: linesA[i - 1] });
      i--;
    }
  }
  return result.reverse();
}

// char-level spans for diff table
function charDiffSpans(a, b) {
  const dp = getLCS(a.split(''), b.split(''));
  const ops = [];
  let i = a.length, j = b.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) { ops.push(['=', a[i - 1]]); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) { ops.push(['+', b[j - 1]]); j--; }
    else { ops.push(['-', a[i - 1]]); i--; }
  }
  ops.reverse();
  const spansA = [], spansB = [];
  for (const [t, c] of ops) {
    if (t === '=') { spansA.push(<span key={spansA.length}>{c}</span>); spansB.push(<span key={spansB.length}>{c}</span>); }
    else if (t === '+') spansB.push(<span key={spansB.length} className={styles.charAdd}>{c}</span>);
    else spansA.push(<span key={spansA.length} className={styles.charDel}>{c}</span>);
  }
  return { spansA, spansB };
}

// char-level spans for pane overlay
function charOverlaySpans(a, b) {
  const dp = getLCS(a.split(''), b.split(''));
  const ops = [];
  let i = a.length, j = b.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) { ops.push(['=', a[i - 1]]); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) { ops.push(['+', b[j - 1]]); j--; }
    else { ops.push(['-', a[i - 1]]); i--; }
  }
  ops.reverse();
  const spansA = [], spansB = [];
  for (const [t, c] of ops) {
    if (t === '=') {
      spansA.push(<span key={spansA.length}>{c}</span>);
      spansB.push(<span key={spansB.length}>{c}</span>);
    } else if (t === '+') {
      spansB.push(<span key={spansB.length} className={styles.hlCharAdd}>{c}</span>);
    } else {
      spansA.push(<span key={spansA.length} className={styles.hlCharDel}>{c}</span>);
    }
  }
  return { spansA, spansB };
}

function countWords(txt) { return txt.trim() ? txt.trim().split(/\s+/).length : 0; }

// ── URL encoding ──────────────────────────────────────────────────────────────

// ── Patch generation ──────────────────────────────────────────────────────────

function generatePatch(diff, nameA = 'original', nameB = 'modified') {
  const CONTEXT = 3;
  const changed = diff.reduce((acc, _, i) => { if (diff[i].type !== 'same') acc.push(i); return acc; }, []);
  if (!changed.length) return null;

  // Merge nearby changes into hunk ranges
  const ranges = [];
  let start = Math.max(0, changed[0] - CONTEXT);
  let end = Math.min(diff.length, changed[0] + CONTEXT + 1);
  for (let i = 1; i < changed.length; i++) {
    const ns = Math.max(0, changed[i] - CONTEXT);
    if (ns <= end) { end = Math.min(diff.length, changed[i] + CONTEXT + 1); }
    else { ranges.push([start, end]); start = ns; end = Math.min(diff.length, changed[i] + CONTEXT + 1); }
  }
  ranges.push([start, end]);

  let patch = `--- a/${nameA}\n+++ b/${nameB}\n`;
  for (const [from, to] of ranges) {
    const slice = diff.slice(from, to);
    const countA = slice.filter(d => d.type !== 'add').length;
    const countB = slice.filter(d => d.type !== 'del').length;
    const startA = slice.find(d => d.type !== 'add')?.lineA ?? 1;
    const startB = slice.find(d => d.type !== 'del')?.lineB ?? 1;
    patch += `@@ -${startA},${countA} +${startB},${countB} @@\n`;
    for (const d of slice) {
      if (d.type === 'same') patch += ` ${d.textA}\n`;
      else if (d.type === 'del') patch += `-${d.text}\n`;
      else patch += `+${d.text}\n`;
    }
  }
  return patch;
}

// ── Patch parsing ─────────────────────────────────────────────────────────────

function parsePatch(content) {
  const lines = content.split('\n');
  const aLines = [], bLines = [];
  let inHunk = false;

  for (const line of lines) {
    if (line.startsWith('--- ') || line.startsWith('+++ ')) continue;
    if (line.startsWith('@@ ')) { inHunk = true; continue; }
    if (!inHunk) continue;
    if (line.startsWith('-')) aLines.push(line.slice(1));
    else if (line.startsWith('+')) bLines.push(line.slice(1));
    else if (line.startsWith(' ')) { aLines.push(line.slice(1)); bLines.push(line.slice(1)); }
  }

  if (!aLines.length && !bLines.length) return null;
  return { textA: aLines.join('\n'), textB: bLines.join('\n') };
}

// ── History helpers ───────────────────────────────────────────────────────────

const HISTORY_KEY = 'diffchecker_history';
const DRAFT_KEY   = 'diffchecker_draft';
const MAX_HISTORY = 8;

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

function saveHistory(textA, textB, existing) {
  if (!textA && !textB) return existing;
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    previewA: (textA.split('\n')[0] || '').slice(0, 60),
    previewB: (textB.split('\n')[0] || '').slice(0, 60),
    textA,
    textB,
  };
  const updated = [entry, ...existing.filter(e => e.textA !== textA || e.textB !== textB)].slice(0, MAX_HISTORY);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); } catch {}
  return updated;
}

function formatRelativeTime(iso) {
  const mins = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DiffCheckerTool() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [mode, setMode] = useState('split');
  const [ignoreWS, setIgnoreWS] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [showSame, setShowSame] = useState(true);
  const [wrapLines, setWrapLines] = useState(true);
  const [mergeOpen, setMergeOpen] = useState(false);
  const [mergeText, setMergeText] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [syncScroll, setSyncScroll] = useState(true);
  const [currentHunkIdx, setCurrentHunkIdx] = useState(-1);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const hydrated = useRef(false);
  const syncScrollRef = useRef(true);
  syncScrollRef.current = syncScroll;
  const paneASetterRef = useRef(null);
  const paneBSetterRef = useRef(null);
  const paneAScrollToLineRef = useRef(null);
  const paneBScrollToLineRef = useRef(null);
  const isSyncingRef = useRef(false);

  const handlePaneScroll = (fromSide, scrollTop, scrollLeft) => {
    if (!syncScrollRef.current || isSyncingRef.current) return;
    isSyncingRef.current = true;
    const target = fromSide === 'A' ? paneBSetterRef : paneASetterRef;
    target.current?.(scrollTop, scrollLeft);
    requestAnimationFrame(() => { isSyncingRef.current = false; });
  };

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 2000); };

  const diff = useMemo(() => {
    if (!textA && !textB) return [];
    return diffLines(textA.split('\n'), textB.split('\n'), ignoreWS, ignoreCase);
  }, [textA, textB, ignoreWS, ignoreCase]);

  const stats = useMemo(() => {
    const added = diff.filter(d => d.type === 'add').length;
    const removed = diff.filter(d => d.type === 'del').length;
    const same = diff.filter(d => d.type === 'same').length;
    const total = added + removed + same * 2;
    const sim = total > 0 ? Math.round((same * 2) / total * 100) : (textA || textB ? 0 : 100);
    return { added, removed, same, sim };
  }, [diff, textA, textB]);

  // Build per-line highlights for both panes
  const { highlightsA, highlightsB } = useMemo(() => {
    const hA = {}, hB = {};
    let i = 0;
    while (i < diff.length) {
      const d = diff[i];
      if (d.type === 'del' && i + 1 < diff.length && diff[i + 1].type === 'add') {
        const { spansA, spansB } = charOverlaySpans(d.text, diff[i + 1].text);
        hA[d.lineA] = { type: 'del', spans: spansA };
        hB[diff[i + 1].lineB] = { type: 'add', spans: spansB };
        i += 2;
      } else if (d.type === 'del') {
        hA[d.lineA] = { type: 'del', spans: null };
        i++;
      } else if (d.type === 'add') {
        hB[d.lineB] = { type: 'add', spans: null };
        i++;
      } else { i++; }
    }
    return { highlightsA: hA, highlightsB: hB };
  }, [diff]);

  // ── Hunk navigation ──
  const hunks = useMemo(() => {
    const result = [];
    let i = 0;
    while (i < diff.length) {
      if (diff[i].type === 'same') { i++; continue; }
      let lineA = null, lineB = null;
      while (i < diff.length && diff[i].type !== 'same') {
        const d = diff[i];
        if (d.type === 'del' && lineA === null) lineA = d.lineA;
        if (d.type === 'add' && lineB === null) lineB = d.lineB;
        i++;
      }
      result.push({ lineA: lineA ?? lineB, lineB: lineB ?? lineA });
    }
    return result;
  }, [diff]);

  useEffect(() => { setCurrentHunkIdx(-1); }, [diff]);

  // Load history + draft from localStorage on mount
  useEffect(() => {
    setHistory(loadHistory());
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      if (draft.textA) setTextA(draft.textA);
      if (draft.textB) setTextB(draft.textB);
    } catch {}
    hydrated.current = true;
  }, []);

  // Auto-save draft (debounced 400ms)
  useEffect(() => {
    if (!hydrated.current) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ textA, textB })); } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [textA, textB]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save to history (debounced 2s after last change)
  useEffect(() => {
    if (!textA && !textB) return;
    const t = setTimeout(() => {
      setHistory(prev => saveHistory(textA, textB, prev));
    }, 2000);
    return () => clearTimeout(t);
  }, [textA, textB]);

  const exportPatch = () => {
    const patch = generatePatch(diff);
    if (!patch) return showToast('Nothing to export');
    const blob = new Blob([patch], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'changes.patch'; a.click();
    URL.revokeObjectURL(url);
    showToast('Patch downloaded');
  };

  const restoreHistory = (entry) => {
    setTextA(entry.textA);
    setTextB(entry.textB);
    setHistoryOpen(false);
    showToast('Diff restored');
  };

  const deleteHistory = (id) => {
    setHistory(prev => {
      const updated = prev.filter(e => e.id !== id);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const clearAllHistory = () => {
    setHistory([]);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify([])); } catch {}
    showToast('History cleared');
  };

  const clearDraft = () => {
    setTextA('');
    setTextB('');
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
  };

  const goToHunk = useCallback((idx) => {
    if (!hunks.length) return;
    const clamped = ((idx % hunks.length) + hunks.length) % hunks.length;
    setCurrentHunkIdx(clamped);
    const h = hunks[clamped];
    if (h.lineA != null) paneAScrollToLineRef.current?.(h.lineA);
    if (h.lineB != null) paneBScrollToLineRef.current?.(h.lineB);
  }, [hunks]);

  // ── File loading ──
  const loadFile = useCallback((pane, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (file.name.endsWith('.patch') || file.name.endsWith('.diff')) {
        const parsed = parsePatch(content);
        if (!parsed) return showToast('Could not parse patch file');
        setTextA(parsed.textA);
        setTextB(parsed.textB);
        showToast(`${file.name} imported`);
      } else {
        if (pane === 'A') setTextA(content);
        else setTextB(content);
        showToast(`${file.name} loaded`);
      }
    };
    reader.readAsText(file);
  }, []);

  const swap = () => { setTextA(textB); setTextB(textA); showToast('Panes swapped'); };

  const copyPane = async (pane) => { await navigator.clipboard.writeText(pane === 'A' ? textA : textB); showToast(`Copied`); };

  const pastePane = async (pane) => {
    try {
      const txt = await navigator.clipboard.readText();
      if (pane === 'A') setTextA(txt); else setTextB(txt);
      showToast('Pasted');
    } catch { showToast('Clipboard access denied'); }
  };

  const copyResult = async () => {
    const lines = diff.map(d => d.type === 'add' ? `+ ${d.text}` : d.type === 'del' ? `- ${d.text}` : `  ${d.textA}`).join('\n');
    await navigator.clipboard.writeText(lines);
    showToast('Diff copied');
  };

  const openMerge = () => {
    const merged = diff.filter(d => d.type !== 'del').map(d => d.type === 'add' ? d.text : d.textA).join('\n');
    setMergeText(merged);
    setMergeOpen(true);
  };

  const copyMerge = async () => { await navigator.clipboard.writeText(mergeText); showToast('Merged text copied'); };

  const loadSample = () => { setTextA(SAMPLE_A); setTextB(SAMPLE_B); showToast('Sample loaded'); };

  const aLines = textA ? textA.split('\n').length : 0;
  const bLines = textB ? textB.split('\n').length : 0;
  const hasContent = textA || textB;

  const renderDiffRows = (isInline) => {
    const rows = [];
    let hunkPending = false;
    let i = 0;
    while (i < diff.length) {
      const d = diff[i];
      if (d.type === 'same' && !showSame) {
        if (!hunkPending) {
          rows.push(
            <tr key={`hunk-${i}`} className={styles.hunkRow}>
              <td colSpan={isInline ? 4 : 3} className={styles.hunkCell}>
                ⋯ unchanged lines
              </td>
            </tr>
          );
          hunkPending = true;
        }
        i++; continue;
      }
      hunkPending = false;
      if (isInline && d.type === 'del' && i + 1 < diff.length && diff[i + 1].type === 'add') {
        const { spansA, spansB } = charDiffSpans(d.text, diff[i + 1].text);
        rows.push(<tr key={`del-${i}`} className={styles.delRow}><td className={styles.ln}>{d.lineA}</td><td className={styles.lnSide}>A</td><td className={styles.sign}>−</td><td className={styles.lineContent}>{spansA}</td></tr>);
        rows.push(<tr key={`add-${i}`} className={styles.addRow}><td className={styles.ln}>{diff[i + 1].lineB}</td><td className={styles.lnSide}>B</td><td className={styles.sign}>+</td><td className={styles.lineContent}>{spansB}</td></tr>);
        i += 2; continue;
      }
      if (d.type === 'del') {
        rows.push(<tr key={`del-${i}`} className={styles.delRow}><td className={styles.ln}>{d.lineA}</td>{isInline && <td className={styles.lnSide}>A</td>}<td className={styles.sign}>−</td><td className={styles.lineContent}>{d.text || ' '}</td></tr>);
      } else if (d.type === 'add') {
        rows.push(<tr key={`add-${i}`} className={styles.addRow}><td className={styles.ln}>{d.lineB}</td>{isInline && <td className={styles.lnSide}>B</td>}<td className={styles.sign}>+</td><td className={styles.lineContent}>{d.text || ' '}</td></tr>);
      } else {
        rows.push(<tr key={`same-${i}`} className={styles.sameRow}><td className={styles.ln}>{d.lineA}</td>{isInline && <td className={styles.lnSide}> </td>}<td className={styles.sign}></td><td className={styles.lineContent}>{d.textA || ' '}</td></tr>);
      }
      i++;
    }
    if (rows.length === 0) {
      return (
        <tr>
          <td colSpan={isInline ? 4 : 3} className={styles.emptyCell}>
            {hasContent
              ? <><span className={styles.emptyCellIcon}>✓</span><span>Texts are identical</span></>
              : <><span className={styles.emptyCellIcon}>↑</span><span>Paste text in both panes above to compare</span></>
            }
          </td>
        </tr>
      );
    }
    return rows;
  };

  const paneProps = (side) => ({
    side,
    label: side === 'A' ? 'Original' : 'Modified',
    text: side === 'A' ? textA : textB,
    highlights: side === 'A' ? highlightsA : highlightsB,
    wrapLines,
    onChange: side === 'A' ? setTextA : setTextB,
    onCopy: () => copyPane(side),
    onPaste: () => pastePane(side),
    onClear: () => (side === 'A' ? setTextA('') : setTextB('')),
    onFileLoad: (file) => loadFile(side, file),

    scrollSetterRef: side === 'A' ? paneASetterRef : paneBSetterRef,
    scrollToLineRef: side === 'A' ? paneAScrollToLineRef : paneBScrollToLineRef,
    onExternalScroll: (top, left) => handlePaneScroll(side, top, left),
  });

  return (
    <div className={styles.wrap}>
      <TextToolsTopNav active="diff-checker" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="6" height="12" rx="1.5" fill="currentColor" opacity="0.5"/>
              <rect x="9" y="2" width="6" height="12" rx="1.5" fill="currentColor"/>
              <path d="M7.5 8H8.5M8.5 8L7 6.5M8.5 8L7 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>Diff <span className={styles.logoAccent}>Checker</span></span>
        </div>
        <div className={styles.headerSep} />
        <div className={styles.modeBtns}>
          {['split', 'unified', 'inline'].map(m => (
            <button key={m} className={`${styles.modeBtn} ${mode === m ? styles.modeBtnActive : ''}`} onClick={() => setMode(m)}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        <div className={styles.headerSep} />
        <div className={styles.opts}>
          <label className={styles.optLabel}><input type="checkbox" checked={ignoreWS} onChange={e => setIgnoreWS(e.target.checked)} /> Ignore WS</label>
          <label className={styles.optLabel}><input type="checkbox" checked={ignoreCase} onChange={e => setIgnoreCase(e.target.checked)} /> Ignore Case</label>
          <label className={styles.optLabel}><input type="checkbox" checked={showSame} onChange={e => setShowSame(e.target.checked)} /> Show Same</label>
          <label className={styles.optLabel}><input type="checkbox" checked={wrapLines} onChange={e => setWrapLines(e.target.checked)} /> Wrap Lines</label>
          <label className={styles.optLabel}><input type="checkbox" checked={syncScroll} onChange={e => setSyncScroll(e.target.checked)} /> Sync Scroll</label>
        </div>
        <div className={styles.actions}>
          <button className={styles.sampleBtn} onClick={loadSample}>Load Sample</button>
          {(textA || textB) && <button className={styles.sampleBtn} onClick={clearDraft}>Clear All</button>}
          <div className={styles.headerSep} />
          {hunks.length > 0 && (
            <div className={styles.hunkNav}>
              <button className={styles.hunkNavBtn} onClick={() => goToHunk(currentHunkIdx <= 0 ? hunks.length - 1 : currentHunkIdx - 1)} title="Previous change">↑</button>
              <span className={styles.hunkNavCount}>
                {currentHunkIdx >= 0 ? `${currentHunkIdx + 1}/` : ''}{hunks.length} {hunks.length === 1 ? 'change' : 'changes'}
              </span>
              <button className={styles.hunkNavBtn} onClick={() => goToHunk(currentHunkIdx < hunks.length - 1 ? currentHunkIdx + 1 : 0)} title="Next change">↓</button>
            </div>
          )}
          <div className={styles.headerSep} />
          <button className={styles.actionBtn} onClick={swap}>⇄ Swap</button>
          <button className={styles.actionBtn} onClick={copyResult} disabled={!hasContent}>Copy Diff</button>
          <button className={styles.actionBtn} onClick={exportPatch} disabled={!hasContent} title="Download .patch file">Export</button>
          <button className={`${styles.actionBtn} ${historyOpen ? styles.actionBtnActive : ''}`} onClick={() => setHistoryOpen(o => !o)} title="View history">History{history.length > 0 && <span className={styles.historyBadge}>{history.length}</span>}</button>
          <button className={styles.actionBtnGreen} onClick={openMerge} disabled={!hasContent}>Merge</button>
        </div>
      </div>

      {/* Main */}
      <div className={styles.main}>
        {mode === 'split' && (
          <div className={styles.splitWrap}>
            <Pane {...paneProps('A')}
              placeholder={'Paste original text here…\n\nOr drag & drop a file, or click Upload.'} />
            <Minimap
              diff={diff}
              totalLines={Math.max(aLines, bLines, 1)}
              onSeek={(lineNum) => {
                paneAScrollToLineRef.current?.(lineNum);
                paneBScrollToLineRef.current?.(lineNum);
              }}
            />
            <Pane {...paneProps('B')}
              placeholder={'Paste modified text here…\n\nDifferences will highlight in real time.'} />
          </div>
        )}
        {(mode === 'unified' || mode === 'inline') && (
          <div className={styles.diffTableWrap}>
            <div className={styles.splitWrapCompact}>
              <Pane {...paneProps('A')} placeholder="Paste original text…" compact />
              <Minimap
                diff={diff}
                totalLines={Math.max(aLines, bLines, 1)}
                onSeek={(lineNum) => {
                  paneAScrollToLineRef.current?.(lineNum);
                  paneBScrollToLineRef.current?.(lineNum);
                }}
              />
              <Pane {...paneProps('B')} placeholder="Paste modified text…" compact />
            </div>
            <div className={styles.diffTableScroll}>
              <table className={styles.diffTable}>
                <tbody>{renderDiffRows(mode === 'inline')}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Legend + diff stats */}
      <div className={styles.legend}>
        <span className={styles.legendAdd}>■ Added</span>
        <span className={styles.legendDel}>■ Removed</span>
        <span className={styles.legendSame}>■ Unchanged</span>
        {hasContent ? <>
          <span className={styles.legendDivider} />
          <span className={styles.statAdd}>+{stats.added} added</span>
          <span className={styles.statDel}>−{stats.removed} removed</span>
          <span className={styles.statSame}>{stats.same} same</span>
          <span className={styles.statSim}>~{stats.sim}% similar</span>
        </> : <span className={styles.legendHint}>Edits diff live as you type</span>}
      </div>

      {/* Merge pane */}
      {mergeOpen && (
        <div className={styles.mergeOverlay}>
          <div className={styles.mergePane}>
            <div className={styles.mergePaneHeader}>
              <span>⊕ Merge Output</span>
              <div className={styles.mergeBtns}>
                <button className={styles.actionBtn} onClick={() => { const m = diff.filter(d => d.type !== 'add').map(d => d.type === 'del' ? d.text : d.textA).join('\n'); setMergeText(m); }}>Use All A</button>
                <button className={styles.actionBtn} onClick={() => { const m = diff.filter(d => d.type !== 'del').map(d => d.type === 'add' ? d.text : d.textA).join('\n'); setMergeText(m); }}>Use All B</button>
                <button className={styles.actionBtnGreen} onClick={copyMerge}>Copy Merged</button>
                <button className={styles.actionBtn} onClick={() => setMergeOpen(false)}>Close</button>
              </div>
            </div>
            <textarea className={styles.mergeTextarea} value={mergeText} onChange={e => setMergeText(e.target.value)} />
          </div>
        </div>
      )}

      {/* History panel */}
      {historyOpen && (
        <div className={styles.historyPanel}>
          <div className={styles.historyHeader}>
            <span>History</span>
            <div className={styles.historyHeaderBtns}>
              {history.length > 0 && <button className={styles.actionBtn} onClick={clearAllHistory} title="Clear all history">Clear</button>}
              <button className={styles.actionBtn} onClick={() => setHistoryOpen(false)}>Close</button>
            </div>
          </div>
          {history.length === 0 ? (
            <div className={styles.historyEmpty}>No history yet — diffs auto-save after 2s of inactivity.</div>
          ) : (
            <div className={styles.historyList}>
              {history.map(entry => (
                <div key={entry.id} className={styles.historyItem}>
                  <div className={styles.historyItemContent} onClick={() => restoreHistory(entry)}>
                    <div className={styles.historyTime}>{formatRelativeTime(entry.date)}</div>
                    <div className={styles.historyPreviewA}><span className={styles.historyLabel}>A</span>{entry.previewA || <em>empty</em>}</div>
                    <div className={styles.historyPreviewB}><span className={`${styles.historyLabel} ${styles.historyLabelB}`}>B</span>{entry.previewB || <em>empty</em>}</div>
                  </div>
                  <button className={styles.historyDelete} onClick={() => deleteHistory(entry.id)} title="Remove">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {toastMsg && <div className={styles.toast}>{toastMsg}</div>}
    </div>
  );
}

// ── Pane component ────────────────────────────────────────────────────────────

function Pane({ label, side, text, highlights, onChange, onCopy, onPaste, onClear, onFileLoad,
  placeholder, compact, scrollSetterRef, scrollToLineRef, onExternalScroll, wrapLines }) {
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const lineNumsRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const lines = text.split('\n');
  const isB = side === 'B';

  // Expose scroll setter
  if (scrollSetterRef) {
    scrollSetterRef.current = (top, left) => {
      if (textareaRef.current) {
        textareaRef.current.scrollTop = top;
        if (left !== undefined && !wrapLines) textareaRef.current.scrollLeft = left;
      }
      if (preRef.current) {
        preRef.current.scrollTop = top;
        if (left !== undefined && !wrapLines) preRef.current.scrollLeft = left;
      }
      if (lineNumsRef.current) lineNumsRef.current.scrollTop = top;
    };
  }

  // Expose scroll-to-line
  if (scrollToLineRef) {
    scrollToLineRef.current = (lineNum) => {
      if (!textareaRef.current) return;
      const lh = textareaRef.current.scrollHeight / Math.max(1, lines.length);
      const top = Math.max(0, (lineNum - 4) * lh);
      textareaRef.current.scrollTop = top;
      if (preRef.current) preRef.current.scrollTop = top;
      if (lineNumsRef.current) lineNumsRef.current.scrollTop = top;
    };
  }

  const handleScroll = (e) => {
    const { scrollTop, scrollLeft } = e.target;
    if (preRef.current) { preRef.current.scrollTop = scrollTop; preRef.current.scrollLeft = scrollLeft; }
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = scrollTop;
    onExternalScroll?.(scrollTop, scrollLeft);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileLoad(file);
  };
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
  };
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) { onFileLoad(file); e.target.value = ''; }
  };

  const preClass = `${styles.hlPre} ${wrapLines ? styles.hlPreWrap : ''}`;
  const taClass = `${styles.textarea} ${wrapLines ? styles.textareaWrap : ''}`;

  return (
    <div
      className={`${styles.pane} ${compact ? styles.paneCompact : ''} ${isDragging ? styles.paneDragging : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {isDragging && (
        <div className={styles.dropOverlay}>
          <div className={styles.dropOverlayInner}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Drop file here
          </div>
        </div>
      )}
      <div className={styles.paneHeader}>
        <span className={styles.paneTitle}>
          <span className={`${styles.sideBadge} ${isB ? styles.sideBadgeB : styles.sideBadgeA}`}>{isB ? 'B' : 'A'}</span>
          <span className={`${styles.dot} ${isB ? styles.dotB : ''}`} />
          {label}

          {text ? <>
            <span className={styles.lineCount}>{lines.length} {lines.length === 1 ? 'line' : 'lines'}</span>
            <span className={styles.lineCount}>{countWords(text)} words</span>
            <span className={styles.lineCount}>{text.length} chars</span>
          </> : <span className={styles.lineCount}>empty</span>}
        </span>
        <div className={styles.paneActions}>
          <button className={styles.paneBtn} onClick={() => fileInputRef.current?.click()} title="Upload file">Upload</button>
          <button className={styles.paneBtn} onClick={onPaste} title="Paste from clipboard">Paste</button>
          <button className={styles.paneBtn} onClick={onCopy} title="Copy to clipboard" disabled={!text}>Copy</button>
          <button className={`${styles.paneBtn} ${styles.paneBtnDanger}`} onClick={onClear} title="Clear pane" disabled={!text}>Clear</button>
        </div>
      </div>
      <div className={styles.editorArea}>
        <div ref={lineNumsRef} className={styles.lineNums}>
          {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <div className={styles.editorInner}>
          <pre ref={preRef} className={preClass} aria-hidden="true">
            {lines.map((line, i) => {
              const h = highlights[i + 1];
              const cls = h ? (h.type === 'del' ? styles.hlDelLine : styles.hlAddLine) : '';
              if (h?.spans) {
                return <div key={i} className={`${styles.hlLine} ${cls}`}>{h.spans}</div>;
              }
              return <div key={i} className={`${styles.hlLine} ${cls}`}>{line || ' '}</div>;
            })}
          </pre>
          <textarea
            ref={textareaRef}
            className={taClass}
            value={text}
            onChange={e => onChange(e.target.value)}
            onScroll={handleScroll}
            placeholder={placeholder}
            spellCheck={false}
          />
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="text/*" style={{ display: 'none' }} onChange={handleFileInput} />
    </div>
  );
}

// ── Minimap component ─────────────────────────────────────────────────────────

function Minimap({ diff, totalLines, onSeek }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const h = container.clientHeight;
    const w = container.clientWidth;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const lineH = Math.max(h / totalLines, 1);

    for (const d of diff) {
      if (d.type === 'add') {
        ctx.fillStyle = 'rgba(34,197,94,0.7)';
        const y = ((d.lineB - 1) / totalLines) * h;
        ctx.fillRect(2, y, w - 4, Math.max(lineH, 1.5));
      } else if (d.type === 'del') {
        ctx.fillStyle = 'rgba(248,113,113,0.7)';
        const y = ((d.lineA - 1) / totalLines) * h;
        ctx.fillRect(2, y, w - 4, Math.max(lineH, 1.5));
      }
    }
  }, [diff, totalLines]);

  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    onSeek(Math.round(ratio * totalLines));
  };

  return (
    <div ref={containerRef} className={styles.minimap} onClick={handleClick} title="Click to jump to position">
      <canvas ref={canvasRef} />
    </div>
  );
}
