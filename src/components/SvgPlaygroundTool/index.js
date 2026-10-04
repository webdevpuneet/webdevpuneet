'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../ReactPlaygroundTool/styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS = 'fwd-svg-playground-progress';
const LS_POSITION = 'fwd-svg-playground-position';

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

/* ── SVG / XML syntax highlighter (character-preserving overlay) ──────────────
   Emits global hl-* token classes (defined in globals.css). Every input
   character is emitted exactly once so the highlight <pre> stays aligned with
   the textarea beneath it. */
function highlightSVG(raw) {
  const e = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let result = '';
  let i = 0;
  const n = raw.length;
  while (i < n) {
    if (raw[i] !== '<') {
      const next = raw.indexOf('<', i);
      const text = next === -1 ? raw.slice(i) : raw.slice(i, next);
      if (text) result += `<span class="hl-text">${e(text)}</span>`;
      i = next === -1 ? n : next;
      continue;
    }
    if (raw.startsWith('<!--', i)) {
      const ce = raw.indexOf('-->', i);
      const seg = ce === -1 ? raw.slice(i) : raw.slice(i, ce + 3);
      result += `<span class="hl-cm">${e(seg)}</span>`;
      i = ce === -1 ? n : ce + 3;
      continue;
    }
    const end = raw.indexOf('>', i);
    if (end === -1) { result += e(raw.slice(i)); break; }
    let p = i + 1;
    result += `<span class="hl-punct">&lt;</span>`;
    if (raw[p] === '/') { result += `<span class="hl-slash">/</span>`; p++; }
    let start = p;
    while (p < end && !/[\s/]/.test(raw[p])) p++;
    if (p > start) result += `<span class="hl-tag">${e(raw.slice(start, p))}</span>`;
    while (p < end) {
      const ch = raw[p];
      if (/\s/.test(ch)) { result += e(ch); p++; continue; }
      if (ch === '/')    { result += `<span class="hl-slash">/</span>`; p++; continue; }
      if (/[\w:-]/.test(ch)) {
        let as = p;
        while (p < end && /[\w:-]/.test(raw[p])) p++;
        result += `<span class="hl-attr">${e(raw.slice(as, p))}</span>`;
        if (raw[p] === '=') {
          result += `<span class="hl-eq">=</span>`; p++;
          const q = raw[p];
          if (q === '"' || q === "'") {
            let vs = p; p++; while (p < end && raw[p] !== q) p++; if (p < end) p++;
            result += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          } else {
            let vs = p; while (p < end && !/[\s>]/.test(raw[p])) p++;
            if (p > vs) result += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          }
        }
        continue;
      }
      result += e(ch); p++;
    }
    result += `<span class="hl-punct">&gt;</span>`;
    i = end + 1;
  }
  return result;
}

function launchConfetti() {
  const colors = ['#0891b2', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dur = 1.3 + Math.random() * 1.4;
    const delay = Math.random() * 0.35;
    const size = 5 + Math.random() * 6;
    el.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};background:${color};left:${Math.random() * 100}vw;top:-12px;pointer-events:none;z-index:99999;animation:confettiFall ${dur}s ${delay}s ease-in forwards;transform:rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000 + 100);
  }
}

const BACKGROUNDS = [
  { id: 'grid',  label: 'Grid' },
  { id: 'white', label: 'White' },
  { id: 'dark',  label: 'Dark' },
];

const IFRAME_SRCDOC = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;height:100%}
body{height:100%;transition:background-color .2s}
body.bg-grid{background-color:#ffffff;
  background-image:linear-gradient(45deg,#e2e8f0 25%,transparent 25%),linear-gradient(-45deg,#e2e8f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e2e8f0 75%),linear-gradient(-45deg,transparent 75%,#e2e8f0 75%);
  background-size:20px 20px;background-position:0 0,0 10px,10px -10px,-10px 0}
body.bg-white{background-color:#ffffff}
body.bg-dark{background-color:#0f172a}
#stage{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:18px}
#stage svg{max-width:100%;max-height:100%;display:block}
#err{display:none;position:fixed;left:0;right:0;bottom:0;padding:8px 12px;
  background:#fef2f2;border-top:2px solid #fca5a5;color:#dc2626;
  font-family:ui-monospace,Consolas,monospace;font-size:11px;white-space:pre-wrap}
</style>
</head>
<body class="bg-grid">
<div id="stage"></div>
<div id="err"></div>
<script>
var stage=document.getElementById('stage');
var errEl=document.getElementById('err');
var lastCode='';
function showErr(msg){errEl.textContent=msg;errEl.style.display='block';}
function clearErr(){errEl.textContent='';errEl.style.display='none';}
function render(code){
  lastCode=code||'';
  clearErr();
  try {
    stage.innerHTML=lastCode;
    var svg=stage.querySelector('svg');
    if(lastCode.trim() && !svg){ showErr('No <svg> element found in your markup.'); }
  } catch(e){ showErr(String(e && e.message ? e.message : e)); }
}
function setBg(id){
  document.body.className='bg-'+id;
  errEl.style.color = id==='dark' ? '#fca5a5' : '#dc2626';
}
window.addEventListener('message',function(e){
  if(!e.data)return;
  if(e.data.type==='render') render(e.data.code);
  if(e.data.type==='bg') setBg(e.data.value);
  if(e.data.type==='replay') render(lastCode);
});
function signalReady(){window.parent.postMessage({type:'ready'},'*');}
function requestCode(){if(!lastCode)window.parent.postMessage({type:'requestCode'},'*');}
signalReady();
setTimeout(signalReady,120);
setTimeout(signalReady,400);
setTimeout(requestCode,160);
setTimeout(requestCode,500);
setTimeout(requestCode,1200);
</` + `script>
</body>
</html>`;

function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}><span>Check</span></div>
      <div className={s.challengeQuestion}>{challenge.question}</div>
      <div className={s.challengeOptions}>
        {challenge.options.map((option, index) => {
          let cls = s.challengeBtn;
          if (picked !== null) {
            if (index === challenge.correct) cls += ' ' + s.challengeReveal;
            else if (index === picked) cls += ' ' + s.challengeWrong;
          }
          return (
            <button key={option} className={cls} onClick={() => picked === null && setPicked(index)}>
              {option}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>
      )}
    </div>
  );
}

function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
        return part;
      })}
    </>
  );
}

function LineNums({ count, scrollRef }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

export default function SvgPlaygroundTool() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [code, setCode] = useState(LESSONS[0].code);
  const [pickerIdx, setPickerIdx] = useState(0);
  const [iframeReady, setIframeReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState('');
  const [editorPct, setEditorPct] = useState(50);
  const [search, setSearch] = useState('');
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const [bg, setBg] = useState('grid');

  const iframeRef = useRef(null);
  const lineNumsRef = useRef(null);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const debounceRef = useRef(null);
  const workAreaRef = useRef(null);
  const codeRef = useRef(code);
  const bgRef = useRef(bg);
  const isDragging = useRef(false);

  const lesson = LESSONS[activeIdx];

  useEffect(() => { codeRef.current = code; }, [code]);
  useEffect(() => { bgRef.current = bg; }, [bg]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  const sendCode = useCallback((nextCode) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'render', code: nextCode ?? codeRef.current }, '*');
  }, []);

  const sendBg = useCallback((value) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'bg', value: value ?? bgRef.current }, '*');
  }, []);

  const applyCodeChange = useCallback((newValue) => {
    codeRef.current = newValue;
    setCode(newValue);
  }, []);

  useEffect(() => {
    setProgress(readProgress());
    try {
      const urlCode = new URLSearchParams(window.location.search).get('c');
      if (urlCode) {
        const decoded = decodeURIComponent(escape(atob(urlCode)));
        setCode(decoded);
        codeRef.current = decoded;
        setHydrated(true);
        return;
      }
    } catch {}
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      const savedLesson = LESSONS[saved];
      const initialCode = savedLesson.type === 'picker' ? savedLesson.options[0].code : savedLesson.code;
      setActiveIdx(saved);
      setPickerIdx(0);
      setCode(initialCode);
      codeRef.current = initialCode;
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setConceptOpen(false);
      }
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handler = event => {
      if (!event.data) return;
      if (event.data.type === 'ready') {
        setIframeReady(true);
        sendBg(bgRef.current);
        sendCode(codeRef.current);
      }
      if (event.data.type === 'requestCode') { sendBg(bgRef.current); sendCode(codeRef.current); }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [sendCode, sendBg]);

  useEffect(() => {
    if (!hydrated || !iframeReady) return;
    const runCurrentCode = () => { sendBg(bgRef.current); sendCode(codeRef.current); };
    runCurrentCode();
    const retryTimers = [
      setTimeout(runCurrentCode, 120),
      setTimeout(runCurrentCode, 400),
      setTimeout(runCurrentCode, 900),
    ];
    return () => retryTimers.forEach(clearTimeout);
  }, [hydrated, iframeReady, sendCode, sendBg]);

  useEffect(() => {
    if (!iframeReady || !autoRun) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => sendCode(), 600);
  }, [code, iframeReady, autoRun, sendCode]);

  const handleIframeLoad = useCallback(() => {
    setIframeReady(false);
    const markReadyAndRun = () => {
      setIframeReady(true);
      sendBg(bgRef.current);
      sendCode(codeRef.current);
    };
    setTimeout(markReadyAndRun, 150);
    setTimeout(() => sendCode(codeRef.current), 600);
  }, [sendCode, sendBg]);

  const checkChapterComplete = useCallback((newProgress, completedId) => {
    const completedLesson = LESSONS.find(item => item.id === completedId);
    if (!completedLesson) return;
    const chapterLessons = LESSONS.filter(item => item.chapter === completedLesson.chapter);
    if (chapterLessons.every(item => newProgress.has(item.id))) launchConfetti();
  }, []);

  const selectLesson = useCallback((idx) => {
    const nextLesson = LESSONS[idx];
    const nextCode = nextLesson.type === 'picker' ? nextLesson.options[0].code : nextLesson.code;
    setActiveIdx(idx);
    setPickerIdx(0);
    savePosition(idx);
    clearTimeout(debounceRef.current);
    applyCodeChange(nextCode);
    sendCode(nextCode);
  }, [applyCodeChange, sendCode]);

  const selectOption = useCallback((idx) => {
    const nextCode = lesson.options[idx].code;
    setPickerIdx(idx);
    clearTimeout(debounceRef.current);
    applyCodeChange(nextCode);
    sendCode(nextCode);
  }, [applyCodeChange, lesson, sendCode]);

  const changeBg = useCallback((value) => {
    setBg(value);
    bgRef.current = value;
    sendBg(value);
  }, [sendBg]);

  const replay = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'replay' }, '*');
    showToast('Animation replayed');
  }, [showToast]);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(item => item.id === lesson.id);
        LESSONS.slice(idx).forEach(item => next.delete(item.id));
        showToast('Progress reset from here');
      } else {
        next.add(lesson.id);
        checkChapterComplete(next, lesson.id);
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
        showToast('Lesson complete');
      }
      saveProgress(next);
      return next;
    });
  }, [activeIdx, checkChapterComplete, lesson.id, selectLesson, showToast]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const el = event.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.slice(0, start) + '  ' + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      clearTimeout(debounceRef.current);
      sendCode(codeRef.current);
      showToast('Rendered');
    }
  }, [code, sendCode, showToast]);

  const syncScroll = useCallback((event) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = event.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = event.target.scrollTop;
      highlightRef.current.scrollLeft = event.target.scrollLeft;
    }
  }, []);

  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); showToast('Copied'); }
    catch { showToast('Copy failed'); }
  }, [code, showToast]);

  const resetCode = useCallback(() => {
    const src = lesson.type === 'picker' ? lesson.options[pickerIdx].code : lesson.code;
    clearTimeout(debounceRef.current);
    applyCodeChange(src);
    sendCode(src);
    showToast('Code reset');
  }, [applyCodeChange, lesson, pickerIdx, sendCode, showToast]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded');
  }, [code, lesson.id, showToast]);

  const shareCode = useCallback(async () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      const url = `${window.location.origin}/svg-playground/?c=${encoded}`;
      await navigator.clipboard.writeText(url);
      showToast('Share link copied');
    } catch {
      showToast('Copy failed');
    }
  }, [code, showToast]);

  const startDrag = useCallback((event) => {
    event.preventDefault();
    if (!workAreaRef.current) return;
    isDragging.current = true;
    setIsDraggingHandle(true);
    const rect = workAreaRef.current.getBoundingClientRect();
    const iframe = iframeRef.current;
    if (iframe) iframe.style.pointerEvents = 'none';
    document.body.style.userSelect = 'none';

    const onMove = (moveEvent) => {
      if (!isDragging.current) return;
      const pct = ((moveEvent.clientX - rect.left) / rect.width) * 100;
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

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightSVG(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);
  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const query = search.toLowerCase();
    return LESSONS.filter(item => item.title.toLowerCase().includes(query) || item.chapter.toLowerCase().includes(query));
  }, [search]);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="svg-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/svg-playground.svg" width={24} height={24} alt="" />
          <span className={s.headerTitle}>SVG <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length} lessons</span>
        </div>
      </header>

      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarPillDot} />
              SVG Playground
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search lessons..." />
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
                : filteredLessons.map(item => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => { selectLesson(idx); setSearch(''); }}
                      >
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map(chapter => (
                <div key={chapter}>
                  <div className={s.chapterLabel}>{chapter}</div>
                  {LESSONS.filter(item => item.chapter === chapter).map(item => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => selectLesson(idx)}
                      >
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(open => !open)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && <div className={s.conceptBody}><ConceptText text={lesson.concept} /></div>}
          </div>

          {lesson.type === 'picker' && (
            <>
              <div className={s.pickerBar}>
                <span className={s.pickerLabel}>Variant</span>
                {lesson.options.map((option, index) => (
                  <button key={option.label} className={`${s.pickerBtn} ${index === pickerIdx ? s.pickerBtnActive : ''}`} onClick={() => selectOption(index)}>
                    {option.label}
                  </button>
                ))}
              </div>
              {lesson.options[pickerIdx]?.note && <div className={s.pickerNote}>{lesson.options[pickerIdx].note}</div>}
            </>
          )}

          <div ref={workAreaRef} className={s.workArea}>
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>SVG Editor</span>
                <div className={s.paneActions}>
                  <button
                    className={`${s.iconBtn} ${autoRun ? s.iconBtnActive : ''}`}
                    onClick={() => setAutoRun(v => !v)}
                    title={autoRun ? 'Auto-render on (click to disable)' : 'Auto-render off (click to enable)'}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Auto
                  </button>
                  <button className={s.iconBtn} onClick={resetCode} title="Reset code">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                    Reset
                  </button>
                  <button className={s.iconBtn} onClick={copyCode} title="Copy code">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </button>
                  <button className={s.iconBtn} onClick={downloadCode} title="Download SVG">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    .svg
                  </button>
                  <button className={s.iconBtn} onClick={shareCode} title="Copy share link">
                    Share
                  </button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} />
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                  <textarea
                    ref={textareaRef}
                    className={s.editor}
                    value={code}
                    onChange={event => setCode(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>
            </div>

            <div className={`${s.dragHandle} ${isDraggingHandle ? s.dragHandleActive : ''}`} onMouseDown={startDrag} title="Drag to resize" />

            <div className={s.previewPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Preview</span>
                <div className={s.paneActions}>
                  {BACKGROUNDS.map(option => (
                    <button
                      key={option.id}
                      className={`${s.iconBtn} ${bg === option.id ? s.iconBtnActive : ''}`}
                      onClick={() => changeBg(option.id)}
                      title={`${option.label} background`}
                    >
                      {option.label}
                    </button>
                  ))}
                  <button className={s.iconBtn} onClick={replay} title="Replay animation">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                    Replay
                  </button>
                </div>
              </div>
              <iframe ref={iframeRef} className={s.previewFrame} srcDoc={IFRAME_SRCDOC} sandbox="allow-scripts" title="SVG preview" onLoad={handleIframeLoad} />
            </div>
          </div>

          {lesson.challenge && <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />}

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
                {isDone ? 'Done' : 'Mark Done'}
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
