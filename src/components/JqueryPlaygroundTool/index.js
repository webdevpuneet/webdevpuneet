'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { LESSONS, CHAPTERS } from './lessons';

// ── localStorage keys ─────────────────────────────────────────────────────────
const LS_PROGRESS = 'fwd-jquery-playground-progress';
const LS_POSITION = 'fwd-jquery-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}
function saveProgress(set) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...set])); } catch {}
}
function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); }
  catch { return 0; }
}
function savePosition(idx) {
  try { localStorage.setItem(LS_POSITION, JSON.stringify(idx)); } catch {}
}

// ── Syntax highlighter ────────────────────────────────────────────────────────
const JS_KW = new Set(['function','return','const','let','var','if','else','for','while','do','switch','case','break','continue','new','delete','typeof','instanceof','in','of','class','extends','async','await','try','catch','finally','throw','true','false','null','undefined','this','import','export','default','from','static','get','set','yield','void']);
const _esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlightJS(code) {
  let out = '', i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (/[\n\r\t ]/.test(c)) { out += c; i++; continue; }
    if (c === '/' && code[i + 1] === '/') {
      let j = i; while (j < n && code[j] !== '\n') j++;
      out += `<span class="jq-cm">${_esc(code.slice(i, j))}</span>`; i = j; continue;
    }
    if (c === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2); const j = end < 0 ? n : end + 2;
      out += `<span class="jq-cm">${_esc(code.slice(i, j))}</span>`; i = j; continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < n && code[j] !== c) { if (code[j] === '\\') j++; j++; }
      if (j < n) j++;
      out += `<span class="jq-str">${_esc(code.slice(i, j))}</span>`; i = j; continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i; while (j < n && /[0-9a-fA-F.xXeE_]/.test(code[j])) j++;
      out += `<span class="jq-num">${_esc(code.slice(i, j))}</span>`; i = j; continue;
    }
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i; while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const w = code.slice(i, j);
      if (w === '$' || w === 'jQuery') out += `<span class="jq-dollar">${_esc(w)}</span>`;
      else if (JS_KW.has(w)) out += `<span class="jq-kw">${_esc(w)}</span>`;
      else out += _esc(w);
      i = j; continue;
    }
    out += _esc(c); i++;
  }
  return out;
}

function highlightHTML(code) {
  let out = '', i = 0;
  const n = code.length;
  while (i < n) {
    if (code.slice(i, i + 4) === '<!--') {
      const end = code.indexOf('-->', i + 4); const j = end < 0 ? n : end + 3;
      out += `<span class="jq-cm">${_esc(code.slice(i, j))}</span>`; i = j; continue;
    }
    if (code[i] === '<' && i + 1 < n && /[a-zA-Z/!]/.test(code[i + 1])) {
      out += '<span class="jq-punct">&lt;</span>'; i++;
      if (code[i] === '/') { out += '<span class="jq-punct">/</span>'; i++; }
      let j = i; while (j < n && /[a-zA-Z0-9:-]/.test(code[j])) j++;
      out += `<span class="jq-tag">${_esc(code.slice(i, j))}</span>`; i = j;
      while (i < n && code[i] !== '>') {
        if (/\s/.test(code[i])) { out += code[i]; i++; continue; }
        if (/[a-zA-Z_:]/.test(code[i])) {
          let k = i; while (k < n && /[a-zA-Z0-9_:\-]/.test(code[k])) k++;
          out += `<span class="jq-attr">${_esc(code.slice(i, k))}</span>`; i = k;
          if (code[i] === '=') {
            out += '<span class="jq-punct">=</span>'; i++;
            if (code[i] === '"' || code[i] === "'") {
              const q = code[i]; let m = i + 1;
              while (m < n && code[m] !== q) m++;
              if (m < n) m++;
              out += `<span class="jq-val">${_esc(code.slice(i, m))}</span>`; i = m;
            }
          }
          continue;
        }
        out += _esc(code[i]); i++;
      }
      if (code[i] === '>') { out += '<span class="jq-punct">&gt;</span>'; i++; }
      continue;
    }
    out += _esc(code[i]); i++;
  }
  return out;
}

function highlightCode(code) {
  const re = /(<script(?:\s[^>]*)?>)([\s\S]*?)(<\/script>)/gi;
  let out = '', lastEnd = 0, match;
  while ((match = re.exec(code)) !== null) {
    if (match.index > lastEnd) out += highlightHTML(code.slice(lastEnd, match.index));
    out += `<span class="jq-tag">${_esc(match[1])}</span>`;
    out += highlightJS(match[2]);
    out += `<span class="jq-tag">${_esc(match[3])}</span>`;
    lastEnd = match.index + match[0].length;
  }
  if (lastEnd < code.length) out += highlightHTML(code.slice(lastEnd));
  return out;
}

// ── Iframe srcdoc builder ─────────────────────────────────────────────────────
function buildSrcdoc(code, dark) {
  const bg = dark ? '#0e0f11' : '#ffffff';
  const fg = dark ? '#e8eaf0' : '#111827';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></` + `script>
<script>
(function(){
window.parent.postMessage({type:'jqpg-clearLogs'},'*');
var _l=console.log,_w=console.warn,_e=console.error;
function sl(lv,a){var m=Array.from(a).map(function(x){try{return typeof x==='object'?JSON.stringify(x,null,2):String(x);}catch(ex){return '[object]';}}).join(' ');window.parent.postMessage({type:'jqpg-log',level:lv,message:m},'*');}
console.log=function(){_l.apply(console,arguments);sl('log',arguments);};
console.warn=function(){_w.apply(console,arguments);sl('warn',arguments);};
console.error=function(){_e.apply(console,arguments);sl('error',arguments);};
window.onerror=function(msg,src,ln){window.parent.postMessage({type:'jqpg-error',message:msg+(ln?' (line '+ln+')':'')},'*');return false;};
})();
</` + `script>
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;padding:12px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.5;color:${fg};background:${bg}}
button{cursor:pointer;font-family:inherit}
input,textarea,select{font-family:inherit}
</style>
</head>
<body>
${code}
</body>
</html>`;
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#0769ad', '#5bc0de', '#10b981', '#6366f1', '#f59e0b', '#ef4444'];
  for (let i = 0; i < 72; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dur = 1.4 + Math.random() * 1.4;
    const delay = Math.random() * 0.4;
    const size = 6 + Math.random() * 6;
    el.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};background:${color};left:${Math.random() * 100}vw;top:-12px;pointer-events:none;z-index:99999;animation:confettiFall ${dur}s ${delay}s ease-in forwards;transform:rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000 + 100);
  }
}

// ── Challenge widget ──────────────────────────────────────────────────────────
function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  const choose = (i) => { if (picked !== null) return; setPicked(i); };
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}><span>🎯</span> Quick Check</div>
      <div className={s.challengeQuestion}>{challenge.question}</div>
      <div className={s.challengeOptions}>
        {challenge.options.map((opt, i) => {
          let cls = s.challengeBtn;
          if (picked !== null) {
            if (i === challenge.correct) cls += ' ' + s.challengeReveal;
            else if (i === picked) cls += ' ' + s.challengeWrong;
          }
          return <button key={i} className={cls} onClick={() => choose(i)}>{opt}</button>;
        })}
      </div>
      {picked !== null && <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>}
    </div>
  );
}

// ── Concept text ──────────────────────────────────────────────────────────────
function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>;
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
        return p;
      })}
    </>
  );
}

// ── Line numbers ──────────────────────────────────────────────────────────────
function LineNums({ count, scrollRef, errorLine }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={`${s.lineNum} ${i + 1 === errorLine ? s.lineNumError : ''}`}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function JqueryPlaygroundTool() {
  const [activeIdx, setActiveIdx]               = useState(0);
  const [code, setCode]                         = useState(LESSONS[0].code);
  const [srcdoc, setSrcdoc]                     = useState('');
  const [dark, setDark]                         = useState(false);
  const [error, setError]                       = useState('');
  const [errorLine, setErrorLine]               = useState(null);
  const [progress, setProgress]                 = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen]           = useState(true);
  const [conceptOpen, setConceptOpen]           = useState(true);
  const [isMobile, setIsMobile]                 = useState(false);
  const [toast, setToast]                       = useState('');
  const [consoleLogs, setConsoleLogs]           = useState([]);
  const [showConsole, setShowConsole]           = useState(false);
  const [editorPct, setEditorPct]               = useState(50);
  const [search, setSearch]                     = useState('');
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);

  const iframeRef    = useRef(null);
  const lineNumsRef  = useRef(null);
  const textareaRef  = useRef(null);
  const highlightRef = useRef(null);
  const debounceRef  = useRef(null);
  const workAreaRef  = useRef(null);
  const codeRef      = useRef(code);
  const darkRef      = useRef(false);
  const isDragging   = useRef(false);

  const lesson = LESSONS[activeIdx];

  useEffect(() => { codeRef.current = code; }, [code]);
  useEffect(() => { darkRef.current = dark; }, [dark]);

  // Dark mode detection
  useEffect(() => {
    const detect = () => {
      const d = document.documentElement.getAttribute('data-theme') === 'dark';
      setDark(d);
    };
    detect();
    const obs = new MutationObserver(detect);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  // Hydrate from localStorage
  useEffect(() => {
    setProgress(readProgress());
    try {
      const urlCode = new URLSearchParams(window.location.search).get('c');
      if (urlCode) {
        const decoded = decodeURIComponent(escape(atob(urlCode)));
        codeRef.current = decoded;
        setCode(decoded);
        setSrcdoc(buildSrcdoc(decoded, darkRef.current));
        return;
      }
    } catch {}
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      codeRef.current = LESSONS[saved].code;
      setActiveIdx(saved);
      setCode(LESSONS[saved].code);
    }
    setSrcdoc(buildSrcdoc(codeRef.current, darkRef.current));
  }, []); // eslint-disable-line

  // Mobile detection
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) { setSidebarOpen(false); setConceptOpen(false); }
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Message listener — console + errors from iframe
  useEffect(() => {
    const handler = e => {
      if (!e.data) return;
      if (e.data.type === 'jqpg-clearLogs') { setConsoleLogs([]); setError(''); setErrorLine(null); }
      if (e.data.type === 'jqpg-error') {
        setError(e.data.message);
        const m = e.data.message.match(/line (\d+)/);
        setErrorLine(m ? parseInt(m[1]) : null);
      }
      if (e.data.type === 'jqpg-log') {
        setConsoleLogs(p => [...p, { id: Date.now() + Math.random(), level: e.data.level, message: e.data.message }].slice(-30));
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Debounced srcdoc rebuild on code change
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSrcdoc(buildSrcdoc(codeRef.current, darkRef.current));
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [code]);

  // Immediate rebuild on dark mode change
  useEffect(() => {
    if (!srcdoc) return;
    setSrcdoc(buildSrcdoc(codeRef.current, dark));
  }, [dark]); // eslint-disable-line

  // Confetti on chapter completion
  const checkChapterComplete = useCallback((newProgress, completedId) => {
    const l = LESSONS.find(x => x.id === completedId);
    if (!l) return;
    const chapterLessons = LESSONS.filter(x => x.chapter === l.chapter);
    if (chapterLessons.every(x => newProgress.has(x.id))) launchConfetti();
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg); setTimeout(() => setToast(''), 2000);
  }, []);

  const selectLesson = useCallback((idx) => {
    const l = LESSONS[idx];
    setActiveIdx(idx);
    setError(''); setErrorLine(null); setConsoleLogs([]);
    savePosition(idx);
    clearTimeout(debounceRef.current);
    codeRef.current = l.code;
    setCode(l.code);
    setSrcdoc(buildSrcdoc(l.code, darkRef.current));
  }, []);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(l => l.id === lesson.id);
        LESSONS.slice(idx).forEach(l => next.delete(l.id));
        showToast('Progress reset from here');
      } else {
        next.add(lesson.id);
        checkChapterComplete(next, lesson.id);
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
        showToast('Lesson complete ✓');
      }
      saveProgress(next); return next;
    });
  }, [lesson, activeIdx, selectLesson, checkChapterComplete, showToast]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.slice(0, start) + '  ' + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(debounceRef.current);
      setSrcdoc(buildSrcdoc(codeRef.current, darkRef.current));
      showToast('↺ Running');
    }
  }, [code, showToast]);

  const syncScroll = useCallback((e) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = e.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  }, []);

  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); showToast('Copied!'); }
    catch { showToast('Copy failed'); }
  }, [code, showToast]);

  const resetCode = useCallback(() => {
    setError(''); setErrorLine(null);
    clearTimeout(debounceRef.current);
    codeRef.current = lesson.code;
    setCode(lesson.code);
    setSrcdoc(buildSrcdoc(lesson.code, darkRef.current));
    showToast('Code reset');
  }, [lesson, showToast]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${lesson.id}.html`; a.click();
    URL.revokeObjectURL(url); showToast('Downloaded');
  }, [code, lesson.id, showToast]);

  const shareCode = useCallback(() => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      const url = `${window.location.origin}/jquery-playground/?c=${encoded}`;
      navigator.clipboard.writeText(url); showToast('Share link copied!');
    } catch { showToast('Copy failed'); }
  }, [code, showToast]);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    if (!workAreaRef.current) return;
    isDragging.current = true;
    setIsDraggingHandle(true);
    const rect = workAreaRef.current.getBoundingClientRect();
    const iframe = iframeRef.current;
    if (iframe) iframe.style.pointerEvents = 'none';
    document.body.style.userSelect = 'none';
    const onMove = (mv) => {
      if (!isDragging.current) return;
      const pct = ((mv.clientX - rect.left) / rect.width) * 100;
      setEditorPct(Math.max(25, Math.min(75, pct)));
    };
    const onUp = () => {
      isDragging.current = false;
      setIsDraggingHandle(false);
      if (iframe) iframe.style.pointerEvents = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  const lineCount   = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightCode(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return LESSONS.filter(l => l.title.toLowerCase().includes(q) || l.chapter.toLowerCase().includes(q));
  }, [search]);

  const logCount = consoleLogs.length;

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="jquery-playground" />

      {/* ── Header ── */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/jquery-playground.svg" width={24} height={24} alt="" />
          <span className={s.headerTitle}>jQuery <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length} lessons</span>
        </div>
      </header>

      <div className={s.body}>
        {/* ── Sidebar ── */}
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarPillDot} />
              jQuery Playground
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          <div className={s.searchWrap}>
            <input
              className={s.searchInput}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search lessons…"
            />
          </div>

          <div className={s.progress}>
            <div className={s.progressLabel}>
              <span>Progress</span>
              <span>{completedCount} / {LESSONS.length}</span>
            </div>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} />
            </div>
          </div>

          <div className={s.lessonList}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div style={{ padding: '12px', fontSize: 12, color: 'var(--text3)' }}>No lessons found</div>
                : filteredLessons.map(l => {
                    const idx = LESSONS.indexOf(l);
                    return (
                      <button key={l.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(l.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => { selectLesson(idx); setSearch(''); }}>
                        <span className={s.lessonDot} />{l.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map(chapter => (
                <div key={chapter}>
                  <div className={s.chapterLabel}>{chapter}</div>
                  {LESSONS.filter(l => l.chapter === chapter).map(l => {
                    const idx = LESSONS.indexOf(l);
                    return (
                      <button key={l.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(l.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => selectLesson(idx)}>
                        <span className={s.lessonDot} />{l.title}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Reopen sidebar tab */}
        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        {/* ── Main ── */}
        <div className={s.main}>
          {/* Concept panel */}
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(o => !o)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && (
              <div className={s.conceptBody}>
                <ConceptText text={lesson.concept} />
              </div>
            )}
          </div>

          {/* Editor + Preview */}
          <div ref={workAreaRef} className={s.workArea}>
            {/* Code editor */}
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Editor</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={resetCode} title="Reset code">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                    Reset
                  </button>
                  <button className={s.iconBtn} onClick={copyCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </button>
                  <button className={s.iconBtn} onClick={downloadCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    .html
                  </button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} errorLine={errorLine} />
                <div className={s.codeArea}>
                  <pre
                    ref={highlightRef}
                    className={s.highlight}
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}
                  />
                  <textarea
                    ref={textareaRef}
                    className={s.editor}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>
              {error && <div className={s.errorBar}>{error}</div>}
            </div>

            {/* Drag handle */}
            <div
              className={`${s.dragHandle} ${isDraggingHandle ? s.dragHandleActive : ''}`}
              onMouseDown={startDrag}
              title="Drag to resize"
            />

            {/* Preview pane */}
            <div className={s.previewPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Preview</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={() => { clearTimeout(debounceRef.current); setSrcdoc(buildSrcdoc(codeRef.current, darkRef.current)); }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                    Refresh
                  </button>
                </div>
              </div>
              <iframe
                ref={iframeRef}
                className={s.previewFrame}
                srcDoc={srcdoc}
                sandbox="allow-scripts"
                title="jQuery preview"
              />
              <div className={s.consolePanel}>
                <div className={s.consoleHeader} onClick={() => setShowConsole(v => !v)} style={{ cursor: 'pointer' }}>
                  <div className={s.consoleTitle}>
                    <span className={s.consoleDot} />
                    Console{logCount > 0 && <span style={{ marginLeft: 5, background: 'var(--accent)', color: '#fff', borderRadius: 999, fontSize: 10, padding: '1px 6px', fontWeight: 700 }}>{logCount}</span>}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: showConsole ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                {showConsole && (
                  <div className={s.consoleLogs}>
                    {consoleLogs.length === 0
                      ? <div className={s.consoleEmpty}>No output — use console.log() in your code</div>
                      : consoleLogs.map(entry => (
                          <div key={entry.id} className={`${s.consoleRow} ${entry.level === 'warn' ? s.consoleRowWarn : entry.level === 'error' ? s.consoleRowError : s.consoleRowLog}`}>
                            <span className={s.consoleIcon}>{entry.level === 'warn' ? '⚠' : entry.level === 'error' ? '✕' : '›'}</span>
                            <span className={s.consoleMsg}>{entry.message}</span>
                          </div>
                        ))
                    }
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Challenge */}
          {lesson.challenge && <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />}

          {/* Nav footer */}
          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>
            <div className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>
                {isDone ? '✓ Done' : 'Mark Done →'}
              </button>
              <button className={s.navBtn} disabled={activeIdx === LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
