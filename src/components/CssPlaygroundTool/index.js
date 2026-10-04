'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS   = 'fwd-css-playground-progress';
const LS_POSITION   = 'fwd-css-playground-position';
const LS_CHALLENGES = 'fwd-css-playground-challenges';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); } catch { return new Set(); }
}
function saveProgress(set) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...set])); } catch {}
}
function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); } catch { return 0; }
}
function savePosition(idx) {
  try { localStorage.setItem(LS_POSITION, JSON.stringify(idx)); } catch {}
}
function readChallenges() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_CHALLENGES) || '[]')); } catch { return new Set(); }
}
function saveChallenges(set) {
  try { localStorage.setItem(LS_CHALLENGES, JSON.stringify([...set])); } catch {}
}

// ── CSS formatter ─────────────────────────────────────────────────────────────
function formatCSS(raw) {
  let s = raw.replace(/\s+/g, ' ').trim();
  s = s.replace(/\{/g, ' {\n').replace(/;/g, ';\n').replace(/\}/g, '\n}\n');
  let result = '';
  let depth = 0;
  for (const line of s.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    if (t === '}') { depth = Math.max(0, depth - 1); result += '}\n\n'; }
    else if (t.endsWith('{')) { result += '  '.repeat(depth) + t + '\n'; depth++; }
    else { result += '  '.repeat(depth) + t + '\n'; }
  }
  return result.trim();
}

// ── CSS error checker ─────────────────────────────────────────────────────────
function checkCSSErrors(css) {
  let depth = 0;
  let inStr = false, strCh = '', inCmt = false;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (inCmt) { if (c === '*' && css[i+1] === '/') { inCmt = false; i++; } continue; }
    if (c === '/' && css[i+1] === '*') { inCmt = true; i++; continue; }
    if (inStr) { if (c === strCh && css[i-1] !== '\\') inStr = false; continue; }
    if (c === '"' || c === "'") { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth < 0) return 'Unexpected } — missing opening {'; }
  }
  if (depth > 0) return `Unclosed rule — ${depth} opening brace${depth > 1 ? 's' : ''} without matching }`;
  return '';
}

const ALL_LESSONS = CHAPTERS.flatMap(ch => ch.lessons.map(l => ({ ...l, chapterId: ch.id })));

// ── CSS syntax highlighter ────────────────────────────────────────────────────
function highlightCSS(raw) {
  const e = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let out = '';
  let i = 0;
  const n = raw.length;
  let depth = 0;      // brace depth (0 = selector context, >0 = declaration context)
  let afterColon = false; // inside a value (after : in a declaration)

  while (i < n) {
    const c = raw[i];

    // Newline
    if (c === '\n') { out += '\n'; afterColon = false; i++; continue; }

    // Whitespace passthrough
    if (c === ' ' || c === '\t' || c === '\r') { out += c; i++; continue; }

    // Block comment
    if (c === '/' && raw[i + 1] === '*') {
      const end = raw.indexOf('*/', i + 2);
      const comment = end === -1 ? raw.slice(i) : raw.slice(i, end + 2);
      out += `<span class="cp-cm">${e(comment)}</span>`;
      i = end === -1 ? n : end + 2;
      continue;
    }

    // String
    if (c === '"' || c === "'") {
      const q = c; let j = i + 1;
      while (j < n && raw[j] !== q) { if (raw[j] === '\\') j++; j++; }
      out += `<span class="cp-str">${e(raw.slice(i, j + 1))}</span>`;
      i = j + 1;
      continue;
    }

    // At-rule keyword
    if (c === '@') {
      let j = i + 1;
      while (j < n && /[\w-]/.test(raw[j])) j++;
      out += `<span class="cp-at">${e(raw.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Opening brace
    if (c === '{') {
      depth++;
      afterColon = false;
      out += `<span class="cp-br">{</span>`;
      i++;
      continue;
    }

    // Closing brace
    if (c === '}') {
      depth = Math.max(0, depth - 1);
      afterColon = false;
      out += `<span class="cp-br">}</span>`;
      i++;
      continue;
    }

    // Semicolon
    if (c === ';') {
      afterColon = false;
      out += `<span class="cp-pu">;</span>`;
      i++;
      continue;
    }

    // Inside a declaration block
    if (depth > 0) {
      // CSS variable name (--foo)
      if (c === '-' && raw[i + 1] === '-') {
        let j = i + 2;
        while (j < n && /[\w-]/.test(raw[j])) j++;
        out += `<span class="cp-var">${e(raw.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Hex colour in value context
      if (afterColon && c === '#') {
        let j = i + 1;
        while (j < n && /[0-9a-fA-F]/.test(raw[j])) j++;
        if (j - i >= 4) {
          out += `<span class="cp-color">${e(raw.slice(i, j))}</span>`;
          i = j;
          continue;
        }
      }

      // Number + optional unit in value context
      if (afterColon && /\d/.test(c)) {
        let j = i;
        while (j < n && /[\d.]/.test(raw[j])) j++;
        const unitM = raw.slice(j).match(/^(px|em|rem|%|vh|vw|vmin|vmax|fr|ms|s|deg|turn|ch|ex|cm|mm|pt)/);
        if (unitM) j += unitM[1].length;
        out += `<span class="cp-num">${e(raw.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Colon — property:value separator (skip :: pseudo)
      if (c === ':' && !afterColon && raw[i + 1] !== ':') {
        afterColon = true;
        out += `<span class="cp-pu">:</span>`;
        i++;
        continue;
      }

      // Property name (before colon)
      if (!afterColon && /[a-zA-Z-]/.test(c)) {
        let j = i;
        while (j < n && /[a-zA-Z0-9-]/.test(raw[j])) j++;
        out += `<span class="cp-prop">${e(raw.slice(i, j))}</span>`;
        i = j;
        continue;
      }
    } else {
      // Selector context — highlight .class, #id, :pseudo
      if (c === '.') {
        let j = i + 1;
        while (j < n && /[\w-]/.test(raw[j])) j++;
        out += `<span class="cp-cls">${e(raw.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      if (c === '#') {
        let j = i + 1;
        while (j < n && /[\w-]/.test(raw[j])) j++;
        out += `<span class="cp-id">${e(raw.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      if (c === ':') {
        let j = i;
        while (j < n && /[:a-zA-Z\-()0-9"']/.test(raw[j]) && raw[j] !== '{' && raw[j] !== '\n') j++;
        out += `<span class="cp-ps">${e(raw.slice(i, j))}</span>`;
        i = j;
        continue;
      }
    }

    out += e(c);
    i++;
  }

  return out;
}

// ── HTML highlighter (simple, for the HTML editor) ───────────────────────────
function highlightHTML(raw) {
  const e = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // Character-preserving: every input character is emitted exactly once (escaped)
  // and whitespace inside tags is kept verbatim, so the highlighted <pre> stays the
  // same length/layout as the textarea above it (no caret/selection drift).
  let out = ''; let i = 0; const n = raw.length;
  while (i < n) {
    if (raw[i] !== '<') {
      const next = raw.indexOf('<', i);
      const text = next === -1 ? raw.slice(i) : raw.slice(i, next);
      if (text) out += `<span class="hl-text">${e(text)}</span>`;
      i = next === -1 ? n : next; continue;
    }
    if (raw.startsWith('<!--', i)) {
      const ce = raw.indexOf('-->', i);
      const seg = ce === -1 ? raw.slice(i) : raw.slice(i, ce + 3);
      out += `<span class="hl-cm">${e(seg)}</span>`;
      i = ce === -1 ? n : ce + 3; continue;
    }
    const end = raw.indexOf('>', i);
    if (end === -1) { out += e(raw.slice(i)); break; }
    let p = i + 1;
    out += '<span class="hl-punct">&lt;</span>';
    if (raw[p] === '/') { out += '<span class="hl-slash">/</span>'; p++; }
    let s = p; while (p < end && !/[\s/]/.test(raw[p])) p++;
    if (p > s) out += `<span class="hl-tag">${e(raw.slice(s, p))}</span>`;
    while (p < end) {
      const ch = raw[p];
      if (/\s/.test(ch)) { out += e(ch); p++; continue; }
      if (ch === '/')    { out += '<span class="hl-slash">/</span>'; p++; continue; }
      if (/[\w-]/.test(ch)) {
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
      out += e(ch); p++;
    }
    out += '<span class="hl-punct">&gt;</span>';
    i = end + 1;
  }
  return out;
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#f97316', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(wrap);
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 8;
    el.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:-10px;width:${size}px;height:${size}px;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};animation:confettiFall ${1.2 + Math.random() * 0.8}s ${Math.random() * 0.4}s ease-in forwards;`;
    wrap.appendChild(el);
  }
  setTimeout(() => document.body.removeChild(wrap), 2500);
}

// ── Challenge widget ──────────────────────────────────────────────────────────
function ChallengeWidget({ challenge, onCorrect }) {
  const [picked, setPicked] = useState(null);

  function pick(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === challenge.correct) setTimeout(onCorrect, 600);
  }

  return (
    <div className={s.challenge}>
      <div className={s.challengeHeader}>
        <span>🎯</span>
        <span className={s.challengeTitle}>Quick Check</span>
      </div>
      <p className={s.challengeQ}>{challenge.question}</p>
      <div className={s.challengeOpts}>
        {challenge.options.map(opt => {
          const isCorrect = opt === challenge.correct;
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              className={`${s.challengeBtn} ${isPicked ? (isCorrect ? s.challengeCorrect : s.challengeWrong) : ''}`}
              onClick={() => pick(opt)}
              disabled={!!picked}
            >
              {isPicked && isCorrect && '✓ '}
              {isPicked && !isCorrect && '✗ '}
              {opt}
            </button>
          );
        })}
      </div>
      {picked && (
        <p className={picked === challenge.correct ? s.challengeRight : s.challengeWrongMsg}>
          {picked === challenge.correct ? '🎉 Correct!' : `The answer is "${challenge.correct}".`}
        </p>
      )}
    </div>
  );
}

// ── Line numbers ──────────────────────────────────────────────────────────────
function LineNums({ count, scrollRef }) {
  return (
    <div className={s.lineNums} ref={scrollRef} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

// ── Build srcdoc ──────────────────────────────────────────────────────────────
function buildSrcdoc(html, css) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*, *::before, *::after { box-sizing: border-box; }
</style>
<style id="user-css">${css}</style>
</head>
<body>${html}</body>
</html>`;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CssPlaygroundTool() {
  const [activeIdx,      setActiveIdx]      = useState(0);
  const [htmlCode,       setHtmlCode]       = useState(ALL_LESSONS[0].html);
  const [cssCode,        setCssCode]        = useState(ALL_LESSONS[0].css);
  const [srcDoc,         setSrcDoc]         = useState('');
  const [progress,       setProgress]       = useState(new Set());
  const [challenges,     setChallenges]     = useState(new Set());
  const [hydrated,       setHydrated]       = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [conceptOpen,    setConceptOpen]    = useState(true);
  const [isMobile,       setIsMobile]       = useState(false);
  const [editorPct,      setEditorPct]      = useState(50);
  const [htmlEditorPct,  setHtmlEditorPct]  = useState(35);
  const [previewWidth,   setPreviewWidth]   = useState(null);
  const [showBefore,     setShowBefore]     = useState(false);
  const [cssError,       setCssError]       = useState('');
  const [toast,          setToast]          = useState('');
  const [search,         setSearch]         = useState('');

  const debounceRef    = useRef(null);
  const isDragging     = useRef(false);
  const isVDragging    = useRef(false);
  const editorPaneRef  = useRef(null);
  const workAreaRef    = useRef(null);
  const cssTextaRef  = useRef(null);
  const htmlTextaRef = useRef(null);
  const cssHighRef   = useRef(null);
  const htmlHighRef  = useRef(null);
  const cssLineRef   = useRef(null);
  const htmlLineRef  = useRef(null);
  const htmlCodeRef  = useRef(ALL_LESSONS[0].html);
  const cssCodeRef   = useRef(ALL_LESSONS[0].css);

  const lesson = ALL_LESSONS[activeIdx];
  const prevLesson = ALL_LESSONS[activeIdx - 1] || null;
  const nextLesson = ALL_LESSONS[activeIdx + 1] || null;

  // ── Hydration ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const prog = readProgress();
    const chal = readChallenges();
    const pos  = Math.min(readPosition(), ALL_LESSONS.length - 1);
    setProgress(prog);
    setChallenges(chal);
    loadLesson(pos, prog, false);
    setHydrated(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mobile detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Queue preview update ──────────────────────────────────────────────────
  function queuePreview(html, css) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCssError(checkCSSErrors(css));
      setSrcDoc(buildSrcdoc(html, css));
    }, 150);
  }

  // Immediate preview (on lesson load)
  function immediatePreview(html, css) {
    clearTimeout(debounceRef.current);
    setCssError('');
    setSrcDoc(buildSrcdoc(html, css));
  }

  // ── Load lesson ───────────────────────────────────────────────────────────
  function loadLesson(idx, prog, markCurrent = true) {
    const l = ALL_LESSONS[idx];
    htmlCodeRef.current = l.html;
    cssCodeRef.current  = l.css;
    setHtmlCode(l.html);
    setCssCode(l.css);
    setActiveIdx(idx);
    setShowBefore(false);
    setCssError('');
    savePosition(idx);

    if (markCurrent) {
      const next = new Set(prog ?? progress);
      next.add(l.id);
      // Check chapter completion for confetti
      const chapter = CHAPTERS.find(ch => ch.lessons.some(x => x.id === l.id));
      if (chapter) {
        const wasComplete = chapter.lessons.every(x => progress.has(x.id));
        const nowComplete = chapter.lessons.every(x => next.has(x.id));
        if (!wasComplete && nowComplete) setTimeout(() => launchConfetti(), 300);
      }
      setProgress(next);
      saveProgress(next);
    }
    immediatePreview(l.html, l.css);
  }

  // ── CSS editor change ─────────────────────────────────────────────────────
  const onCssChange = useCallback(e => {
    const val = e.target.value;
    cssCodeRef.current = val;
    setCssCode(val);
    syncScroll(cssTextaRef, cssHighRef, cssLineRef);
    queuePreview(htmlCodeRef.current, val);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── HTML editor change ────────────────────────────────────────────────────
  const onHtmlChange = useCallback(e => {
    const val = e.target.value;
    htmlCodeRef.current = val;
    setHtmlCode(val);
    syncScroll(htmlTextaRef, htmlHighRef, htmlLineRef);
    queuePreview(val, cssCodeRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tab on textarea ───────────────────────────────────────────────────────
  function handleTab(e, setter, ref, codeRef) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta = e.target;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const newVal = ta.value.slice(0, start) + '  ' + ta.value.slice(end);
    codeRef.current = newVal;
    setter(newVal);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + 2;
    });
  }

  // ── Sync scroll ───────────────────────────────────────────────────────────
  function syncScroll(taRef, hiRef, lnRef) {
    if (!taRef.current) return;
    const t = taRef.current.scrollTop;
    const l = taRef.current.scrollLeft;
    if (hiRef.current)  { hiRef.current.scrollTop = t; hiRef.current.scrollLeft = l; }
    if (lnRef.current)  { lnRef.current.scrollTop = t; }
  }

  // ── Reset to lesson defaults ──────────────────────────────────────────────
  const resetLesson = useCallback(() => {
    const l = ALL_LESSONS[activeIdx];
    htmlCodeRef.current = l.html;
    cssCodeRef.current  = l.css;
    setHtmlCode(l.html);
    setCssCode(l.css);
    immediatePreview(l.html, l.css);
    showToast('Reset to defaults');
  }, [activeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Format CSS ────────────────────────────────────────────────────────────
  const prettifyCSS = useCallback(() => {
    const formatted = formatCSS(cssCodeRef.current);
    cssCodeRef.current = formatted;
    setCssCode(formatted);
    queuePreview(htmlCodeRef.current, formatted);
    showToast('CSS formatted!');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Copy CSS ──────────────────────────────────────────────────────────────
  const copyCss = useCallback(() => {
    navigator.clipboard.writeText(cssCodeRef.current).catch(() => {});
    showToast('CSS copied!');
  }, []);

  // ── Copy HTML ─────────────────────────────────────────────────────────────
  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(htmlCodeRef.current).catch(() => {});
    showToast('HTML copied!');
  }, []);

  // ── Before / After toggle ─────────────────────────────────────────────────
  const toggleBefore = useCallback(() => {
    setShowBefore(prev => {
      const next = !prev;
      immediatePreview(htmlCodeRef.current, next ? '' : cssCodeRef.current);
      return next;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Vertical drag (HTML/CSS split) ────────────────────────────────────────
  function onVDragStart(e) {
    e.preventDefault();
    if (!editorPaneRef.current) return;
    isVDragging.current = true;
    const rect = editorPaneRef.current.getBoundingClientRect();
    document.body.style.userSelect = 'none';
    function onMove(ev) {
      if (!isVDragging.current) return;
      const pct = Math.min(60, Math.max(15, ((rect.bottom - ev.clientY) / rect.height) * 100));
      setHtmlEditorPct(pct);
    }
    function onUp() {
      isVDragging.current = false;
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // ── Download ──────────────────────────────────────────────────────────────
  const download = useCallback(() => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${lesson.title}</title>
<style>
${cssCodeRef.current}
</style>
</head>
<body>
${htmlCodeRef.current}
</body>
</html>`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    a.download = `${lesson.id}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Downloaded!');
  }, [lesson]); // eslint-disable-line react-hooks/exhaustive-deps

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 1800);
  }

  // ── Drag handle ───────────────────────────────────────────────────────────
  function onDragStart(e) {
    e.preventDefault();
    if (!workAreaRef.current) return;
    isDragging.current = true;
    const rect = workAreaRef.current.getBoundingClientRect();
    document.body.style.userSelect = 'none';
    // Block iframe from intercepting mouse events during drag
    const iframes = workAreaRef.current.querySelectorAll('iframe');
    iframes.forEach(f => { f.style.pointerEvents = 'none'; });
    function onMove(ev) {
      if (!isDragging.current) return;
      const pct = Math.min(75, Math.max(25, ((ev.clientX - rect.left) / rect.width) * 100));
      setEditorPct(pct);
    }
    function onUp() {
      isDragging.current = false;
      document.body.style.userSelect = '';
      iframes.forEach(f => { f.style.pointerEvents = ''; });
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // ── Filtered chapters for sidebar search ──────────────────────────────────
  const filteredChapters = useMemo(() => {
    if (!search.trim()) return CHAPTERS;
    const q = search.toLowerCase();
    return CHAPTERS.map(ch => ({
      ...ch,
      lessons: ch.lessons.filter(l =>
        l.title.toLowerCase().includes(q) || ch.title.toLowerCase().includes(q)
      ),
    })).filter(ch => ch.lessons.length > 0);
  }, [search]);

  // ── Challenge complete ────────────────────────────────────────────────────
  const markChallengeComplete = useCallback((lessonId) => {
    setChallenges(prev => {
      const next = new Set(prev);
      next.add(lessonId);
      saveChallenges(next);
      return next;
    });
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────
  const totalLessons    = ALL_LESSONS.length;
  const completedCount  = progress.size;
  const cssLineCount    = (cssCode.match(/\n/g) || []).length + 1;
  const htmlLineCount   = (htmlCode.match(/\n/g) || []).length + 1;
  const cssHighlighted  = useMemo(() => highlightCSS(cssCode), [cssCode]);
  const htmlHighlighted = useMemo(() => highlightHTML(htmlCode), [htmlCode]);
  const challengeDone   = challenges.has(lesson.id);

  const chapter = CHAPTERS.find(ch => ch.lessons.some(l => l.id === lesson.id));

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="css-playground" />

      {/* ── Header ── */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/css-playground.svg" width="20" height="20" alt="" />
          <span className={s.headerTitle}>CSS Playground</span>
          {!isMobile && chapter && (
            <span className={s.breadcrumb}>{chapter.emoji} {chapter.title} / {lesson.title}</span>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      <div className={s.body}>

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <aside className={`${s.sidebar} ${isMobile ? s.sidebarOverlay : ''}`}>
            <div className={s.sidebarTopBar}>
              <span className={s.progressCount}>{completedCount}/{totalLessons} lessons</span>
              <button className={s.sidebarHideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            </div>
            <div className={s.sidebarProgress}>
              <div className={s.progressLabel}>Your progress</div>
              <div className={s.progressBar}>
                <div className={s.progressFill} style={{ width: `${(completedCount / totalLessons) * 100}%` }} />
              </div>
              <span className={s.progressText}>Click any lesson below to jump to it</span>
            </div>
            <div className={s.searchWrap}>
              <input
                className={s.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search lessons…"
              />
            </div>
            <div className={s.sidebarScroll}>
              {filteredChapters.map(ch => (
                <div key={ch.id} className={s.chapter}>
                  <div className={s.chapterTitle}>{ch.emoji} {ch.title}</div>
                  {ch.lessons.map(l => {
                    const globalIdx = ALL_LESSONS.findIndex(x => x.id === l.id);
                    const isActive  = globalIdx === activeIdx;
                    const isDone    = progress.has(l.id);
                    return (
                      <button
                        key={l.id}
                        className={`${s.lessonBtn} ${isActive ? s.lessonBtnActive : ''} ${isDone ? s.lessonBtnDone : ''}`}
                        onClick={() => { loadLesson(globalIdx, progress); if (isMobile) setSidebarOpen(false); }}
                      >
                        <span
                          className={s.lessonDot}
                          title={isDone ? 'Mark incomplete' : 'Mark complete'}
                          onClick={e => {
                            e.stopPropagation();
                            const next = new Set(progress);
                            if (next.has(l.id)) next.delete(l.id); else next.add(l.id);
                            setProgress(next);
                            saveProgress(next);
                          }}
                        >{isDone ? '✓' : ''}</span>
                        <span className={s.lessonLabel}>{l.title}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* ── Sidebar reopen tab ── */}
        {!sidebarOpen && (
          <button className={s.sidebarReopenTab} onClick={() => setSidebarOpen(true)} title="Show lessons sidebar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            <span className={s.sidebarReopenLabel}>Lessons</span>
          </button>
        )}

        {/* ── Main ── */}
        <div className={s.main}>
          <PlaygroundTopAd />

          {/* ── Concept strip ── */}
          <div className={s.conceptStrip}>
            <button className={s.conceptToggle} onClick={() => setConceptOpen(p => !p)}>
              <span className={s.lessonTitle}>{lesson.title}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ transform: conceptOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {conceptOpen && (
              <div className={s.conceptBody}>
                <ConceptText text={lesson.concept} />
                {lesson.challenge && !challengeDone && (
                  <ChallengeWidget challenge={lesson.challenge} onCorrect={() => markChallengeComplete(lesson.id)} />
                )}
                {challengeDone && <p className={s.challengeDoneMsg}>✓ Challenge complete!</p>}
              </div>
            )}
          </div>

          {/* ── Work area ── */}
          <div className={s.workArea} ref={workAreaRef}>

            {/* ── Editor pane ── */}
            <div
              className={s.editorPane}
              ref={editorPaneRef}
              style={isMobile ? {} : { width: `${editorPct}%` }}
            >
              {/* CSS error strip */}
              {cssError && <div className={s.errorStrip}>⚠ {cssError}</div>}

              {/* CSS editor */}
              <div className={s.editorSection} style={{ flex: `${100 - htmlEditorPct} 0 0` }}>
                <div className={s.editorSectionHeader}>
                  <span>CSS</span>
                  <div className={s.panelBtns}>
                    <button className={`${s.panelBtn} ${showBefore ? s.panelBtnActive : ''}`} onClick={toggleBefore} title="Toggle CSS on/off">{showBefore ? 'Apply CSS' : 'Remove CSS'}</button>
                    <button className={s.panelBtn} onClick={prettifyCSS} title="Format CSS">Format</button>
                    <button className={s.panelBtn} onClick={copyCss} title="Copy CSS">Copy</button>
                    <button className={s.panelBtn} onClick={resetLesson} title="Reset">Reset</button>
                  </div>
                </div>
                <div className={s.editorWrap}>
                  <LineNums count={cssLineCount} scrollRef={cssLineRef} />
                  <div className={s.codeArea}>
                    <pre
                      ref={cssHighRef}
                      className={s.highlight}
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: cssHighlighted + '\n' }}
                    />
                    <textarea
                      ref={cssTextaRef}
                      className={s.editor}
                      value={cssCode}
                      onChange={onCssChange}
                      onKeyDown={e => handleTab(e, setCssCode, cssTextaRef, cssCodeRef)}
                      onScroll={() => syncScroll(cssTextaRef, cssHighRef, cssLineRef)}
                      spellCheck={false}
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                  </div>
                </div>
              </div>

              {/* Vertical drag handle */}
              {!isMobile && (
                <div className={s.vDragHandle} onMouseDown={onVDragStart} title="Drag to resize" />
              )}

              {/* HTML editor */}
              <div className={s.editorSection} style={{ flex: `${htmlEditorPct} 0 0` }}>
                <div className={s.editorSectionHeader}>
                  <span>HTML</span>
                  <div className={s.panelBtns}>
                    <button className={s.panelBtn} onClick={copyHtml} title="Copy HTML">Copy</button>
                  </div>
                </div>
                <div className={s.editorWrap}>
                  <LineNums count={htmlLineCount} scrollRef={htmlLineRef} />
                  <div className={s.codeArea}>
                    <pre
                      ref={htmlHighRef}
                      className={s.highlight}
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: htmlHighlighted + '\n' }}
                    />
                    <textarea
                      ref={htmlTextaRef}
                      className={s.editor}
                      value={htmlCode}
                      onChange={onHtmlChange}
                      onKeyDown={e => handleTab(e, setHtmlCode, htmlTextaRef, htmlCodeRef)}
                      onScroll={() => syncScroll(htmlTextaRef, htmlHighRef, htmlLineRef)}
                      spellCheck={false}
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Horizontal drag handle ── */}
            {!isMobile && (
              <div className={s.dragHandle} onMouseDown={onDragStart} title="Drag to resize" />
            )}

            {/* ── Preview pane ── */}
            <div
              className={s.previewPane}
              style={isMobile ? {} : { width: `${100 - editorPct}%` }}
            >
              <div className={s.previewHeader}>
                <span className={s.previewLabel}>Preview</span>
                <div className={s.previewSizes}>
                  <button className={`${s.sizeBtn} ${previewWidth === 375 ? s.sizeBtnActive : ''}`}
                    onClick={() => setPreviewWidth(w => w === 375 ? null : 375)} title="Mobile (375px)">
                    <svg width="12" height="14" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="1" width="16" height="26" rx="3"/><line x1="10" y1="24" x2="14" y2="24"/>
                    </svg>
                    <span>375</span>
                  </button>
                  <button className={`${s.sizeBtn} ${previewWidth === 768 ? s.sizeBtnActive : ''}`}
                    onClick={() => setPreviewWidth(w => w === 768 ? null : 768)} title="Tablet (768px)">
                    <svg width="13" height="14" viewBox="0 0 26 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="1" width="22" height="26" rx="3"/><line x1="11" y1="24" x2="15" y2="24"/>
                    </svg>
                    <span>768</span>
                  </button>
                  <button className={`${s.sizeBtn} ${previewWidth === null ? s.sizeBtnActive : ''}`}
                    onClick={() => setPreviewWidth(null)} title="Full width">
                    <svg width="15" height="14" viewBox="0 0 30 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="1" width="28" height="18" rx="2"/><line x1="10" y1="22" x2="20" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/>
                    </svg>
                    <span>Full</span>
                  </button>
                </div>
                <button className={s.refreshBtn} onClick={download} title="Download as HTML" style={{ display:'flex', alignItems:'center', gap:'3px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  .html
                </button>
                <button
                  className={s.refreshBtn}
                  onClick={() => immediatePreview(htmlCodeRef.current, cssCodeRef.current)}
                  title="Refresh preview"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                  </svg>
                </button>
              </div>
              <div className={s.previewContent}>
                <iframe
                  key={activeIdx}
                  className={s.preview}
                  srcDoc={srcDoc}
                  sandbox="allow-scripts"
                  title="CSS Preview"
                  style={previewWidth ? { width: `${previewWidth}px`, maxWidth: '100%' } : {}}
                />
              </div>
            </div>
          </div>

          {/* ── Prev / Next ── */}
          <div className={s.navBar}>
            <button
              className={s.navBtn}
              onClick={() => prevLesson && loadLesson(activeIdx - 1, progress)}
              disabled={!prevLesson}
            >← Prev</button>
            <span className={s.navCounter}>{activeIdx + 1} / {totalLessons}</span>
            <button
              className={s.navBtn}
              onClick={() => nextLesson && loadLesson(activeIdx + 1, progress)}
              disabled={!nextLesson}
            >Next →</button>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}

// ── Concept text renderer ─────────────────────────────────────────────────────
function ConceptText({ text }) {
  const paragraphs = text.split('\n\n');
  return (
    <div className={s.conceptText}>
      {paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: renderInline(p) }} />
      ))}
    </div>
  );
}

function renderInline(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
