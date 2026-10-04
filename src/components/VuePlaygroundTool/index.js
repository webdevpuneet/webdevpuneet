'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from '../ReactPlaygroundTool/styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { LESSONS, CHAPTERS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS = 'fwd-vue-playground-progress';
const LS_POSITION = 'fwd-vue-playground-position';

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

/* ── Vue-aware syntax highlighter ───────────────────────────────────────────── */
const JS_KW = new Set([
  'async','await','break','case','catch','class','const','continue','default',
  'delete','do','else','export','extends','false','finally','for','from',
  'function','if','import','in','instanceof','let','new','null','of','return',
  'switch','this','throw','true','try','typeof','undefined','var','while','yield',
]);
const VUE_APIS = new Set([
  'createApp','defineComponent','ref','reactive','computed','watch','watchEffect','readonly',
  'onMounted','onUpdated','onUnmounted','onBeforeMount','onBeforeUpdate','onBeforeUnmount',
  'onActivated','onDeactivated','onErrorCaptured',
  'provide','inject','toRefs','toRef','unref','isRef','isReactive','nextTick',
  'defineProps','defineEmits','defineExpose','withDefaults','useSlots','useAttrs',
  'shalloc','shallowRef','shallowReactive','markRaw','toRaw','customRef',
  'Vue','KeepAlive','Transition','TransitionGroup','Teleport','Suspense',
  'console','document','window','Array','Object','String','Number','Boolean',
  'Date','Math','JSON','Promise','fetch','setTimeout','setInterval','alert',
]);

const esc = v => v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function highlightVue(code) {
  let out = '', i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (/\s/.test(c)) { out += c; i++; continue; }
    if (c === '/' && code[i+1] === '/') {
      let j = i; while (j < n && code[j] !== '\n') j++;
      out += `<span class="rjx-cm">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (c === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i+2); const j = end < 0 ? n : end+2;
      out += `<span class="rjx-cm">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (c === '"' || c === "'") {
      const q = c; let j = i+1;
      while (j < n) {
        if (code[j] === '\\') { j+=2; continue; }
        if (code[j] === q) { j++; break; }
        if (code[j] === '\n') break;
        j++;
      }
      out += `<span class="rjx-str">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (c === '`') {
      let j = i+1;
      while (j < n) {
        if (code[j] === '\\') { j+=2; continue; }
        if (code[j] === '`') { j++; break; }
        j++;
      }
      out += `<span class="rjx-str">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i; while (j < n && /[0-9a-fA-F.xXeEoObB_]/.test(code[j])) j++;
      out += `<span class="rjx-num">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i; while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i,j);
      if (JS_KW.has(word)) out += `<span class="rjx-kw">${word}</span>`;
      else if (VUE_APIS.has(word)) out += `<span class="rjx-hook">${word}</span>`;
      else out += esc(word);
      i = j; continue;
    }
    if ('{}[]()'.includes(c)) out += `<span class="rjx-brace">${esc(c)}</span>`;
    else out += `<span class="rjx-punct">${esc(c)}</span>`;
    i++;
  }
  return out;
}

/* ── Iframe srcdoc ───────────────────────────────────────────────────────────── */
const _sc = '</' + 'script>';
const IFRAME_SRCDOC = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;padding:14px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.5;color:#111827;background:#fff;transition:background .2s,color .2s}
button,input,textarea,select{font:inherit}
button{cursor:pointer;padding:5px 12px;background:#4ade80;color:#166534;border:1px solid #86efac;border-radius:6px;font-weight:600;transition:background .15s}
button:hover{background:#22c55e}
button:disabled{opacity:0.45;cursor:default}
input,select,textarea{border:1px solid #d1d5db;border-radius:6px;padding:6px 10px;font-size:14px}
input:focus,select:focus,textarea:focus{outline:none;border-color:#42b883}
h1,h2,h3,h4{margin:0 0 8px;line-height:1.3}
p{margin:0 0 8px}
ul,ol{margin:0 0 8px;padding-left:20px}
hr{border:none;border-top:1px solid #e5e7eb;margin:10px 0}
#err{display:none;padding:10px 12px;background:#fef2f2;border-top:2px solid #fca5a5;color:#dc2626;font-family:ui-monospace,Consolas,monospace;font-size:11px;white-space:pre-wrap;word-break:break-word;position:fixed;bottom:0;left:0;right:0;max-height:100px;overflow:auto}
</style>
</head>
<body>
<div id="app"></div>
<div id="err"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.prod.js">${_sc}
<script>
var errEl = document.getElementById('err');
var _currentApp = null;
var hasRun = false;

var _log=console.log,_warn=console.warn,_err=console.error;
function serialise(v){ try{ return typeof v==='string'?v:JSON.stringify(v,null,2); }catch(e){ return String(v); } }
function sendLog(level,args){ var msg=Array.from(args).map(serialise).join(' '); window.parent.postMessage({type:'log',level:level,message:msg},'*'); }
console.log  = function(){ _log.apply(console,arguments);  sendLog('log',arguments);  };
console.warn = function(){ _warn.apply(console,arguments); sendLog('warn',arguments); };
console.error= function(){ _err.apply(console,arguments);  sendLog('error',arguments);};

function showErr(msg){ errEl.textContent=msg; errEl.style.display='block'; window.parent.postMessage({type:'error',message:msg},'*'); }
function clearErr(){ errEl.textContent=''; errEl.style.display='none'; window.parent.postMessage({type:'clearError'},'*'); }

function run(code){
  hasRun = true;
  clearErr();
  window.parent.postMessage({type:'clearLogs'},'*');
  // Unmount previous app
  if (_currentApp){ try{ _currentApp.unmount(); }catch(e){} _currentApp = null; }
  document.getElementById('app').innerHTML = '';

  try {
    // Patch createApp to capture the instance
    var _realCreateApp = Vue.createApp;
    var createApp = function(){
      var app = _realCreateApp.apply(Vue, arguments);
      _currentApp = app;
      return app;
    };
    var { ref, reactive, computed, watch, watchEffect, readonly,
          onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount,
          onActivated, onDeactivated,
          defineComponent, nextTick, provide, inject,
          toRefs, toRef, unref, isRef, markRaw, toRaw, shallowRef, shallowReactive } = Vue;

    var fn = new Function(
      'createApp','ref','reactive','computed','watch','watchEffect','readonly',
      'onMounted','onUpdated','onUnmounted','onBeforeMount','onBeforeUpdate','onBeforeUnmount',
      'onActivated','onDeactivated',
      'defineComponent','nextTick','provide','inject',
      'toRefs','toRef','unref','isRef','markRaw','toRaw','shallowRef','shallowReactive',
      code + '\\n//# sourceURL=vue-playground.js'
    );
    fn(createApp,ref,reactive,computed,watch,watchEffect,readonly,
       onMounted,onUpdated,onUnmounted,onBeforeMount,onBeforeUpdate,onBeforeUnmount,
       onActivated,onDeactivated,
       defineComponent,nextTick,provide,inject,
       toRefs,toRef,unref,isRef,markRaw,toRaw,shallowRef,shallowReactive);
  } catch(e){
    showErr(e && e.stack ? e.stack.split('\\n').slice(0,4).join('\\n') : String(e));
  }
}

window.addEventListener('error', function(e){ showErr(e.message || 'Runtime error'); });
window.addEventListener('unhandledrejection', function(e){ showErr(e.reason && e.reason.message ? e.reason.message : String(e.reason)); });
window.addEventListener('message', function(e){
  if(!e.data) return;
  if(e.data.type === 'run') run(e.data.code);
  if(e.data.type === 'reset'){
    if(_currentApp){ try{_currentApp.unmount();}catch(ex){} _currentApp=null; }
    document.getElementById('app').innerHTML='';
    clearErr();
  }
  if(e.data.type === 'theme'){
    document.body.style.background = e.data.dark ? '#0e0f11' : '#ffffff';
    document.body.style.color      = e.data.dark ? '#e8eaf0' : '#111827';
  }
});

function signalReady(){ window.parent.postMessage({type:'ready'},'*'); }
function requestCode(){ if(!hasRun) window.parent.postMessage({type:'requestCode'},'*'); }
signalReady();
setTimeout(signalReady,100); setTimeout(signalReady,350); setTimeout(signalReady,900);
setTimeout(requestCode,150); setTimeout(requestCode,450); setTimeout(requestCode,1000);
setTimeout(requestCode,1800); setTimeout(requestCode,3000);
${_sc}
</body>
</html>`;

/* ── Challenge widget ────────────────────────────────────────────────────────── */
function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  const [open,   setOpen]   = useState(false);
  return (
    <div className={s.challenge}>
      <button
        className={s.challengeTitle}
        onClick={() => setOpen(v => !v)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
        <span>Quick Check</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <>
          <div className={s.challengeQuestion}>{challenge.question}</div>
          <div className={s.challengeOptions}>
            {challenge.options.map((opt, i) => {
              let cls = s.challengeBtn;
              if (picked !== null) {
                if (i === challenge.correct) cls += ' ' + s.challengeReveal;
                else if (i === picked) cls += ' ' + s.challengeWrong;
              }
              return (
                <button key={opt} className={cls} onClick={() => picked === null && setPicked(i)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>
          )}
        </>
      )}
    </div>
  );
}

/* ── Line numbers ────────────────────────────────────────────────────────────── */
function LineNums({ count, scrollRef, errorLine }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={`${s.lineNum} ${i+1 === errorLine ? s.lineNumError : ''}`}>
          {i+1}
        </div>
      ))}
    </div>
  );
}

/* ── ConceptText ─────────────────────────────────────────────────────────────── */
function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1,-1)}</code>;
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2,-2)}</strong>;
        return p;
      })}
    </>
  );
}

/* ── Main component ──────────────────────────────────────────────────────────── */
export default function VuePlaygroundTool() {
  const [activeIdx,      setActiveIdx]      = useState(0);
  const [code,           setCode]           = useState(LESSONS[0].code);
  const [iframeReady,    setIframeReady]    = useState(false);
  const [hydrated,       setHydrated]       = useState(false);
  const [error,          setError]          = useState('');
  const [errorLine,      setErrorLine]      = useState(null);
  const [progress,       setProgress]       = useState(() => new Set());
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [conceptOpen,    setConceptOpen]    = useState(true);
  const [isMobile,       setIsMobile]       = useState(false);
  const [toast,          setToast]          = useState('');
  const [consoleLogs,    setConsoleLogs]    = useState([]);
  const [showConsole,    setShowConsole]    = useState(false);
  const [editorPct,      setEditorPct]      = useState(50);
  const [search,         setSearch]         = useState('');
  const [isDraggingH,    setIsDraggingH]    = useState(false);
  const [pickerIdx,      setPickerIdx]      = useState(0);

  const iframeRef     = useRef(null);
  const lineNumsRef   = useRef(null);
  const textareaRef   = useRef(null);
  const highlightRef  = useRef(null);
  const debounceRef   = useRef(null);
  const workAreaRef   = useRef(null);
  const codeRef       = useRef(code);
  const isDragging    = useRef(false);
  const logRateRef    = useRef(0); // rate-limit iframe log floods

  const lesson = LESSONS[activeIdx];

  useEffect(() => { codeRef.current = code; }, [code]);

  const showToast = useCallback((msg) => {
    setToast(msg); setTimeout(() => setToast(''), 2000);
  }, []);

  const sendCode = useCallback((nextCode) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'run', code: nextCode ?? codeRef.current }, '*');
  }, []);

  useEffect(() => {
    setProgress(readProgress());
    try {
      const urlCode = new URLSearchParams(window.location.search).get('c');
      if (urlCode) {
        const decoded = decodeURIComponent(escape(atob(urlCode)));
        setCode(decoded); codeRef.current = decoded; setHydrated(true); return;
      }
    } catch {}
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      const l = LESSONS[saved];
      const c = l.type === 'picker' ? (l.options[0]?.code ?? '') : (l.code ?? '');
      setActiveIdx(saved); setCode(c); codeRef.current = c;
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      if (m) setSidebarOpen(false);
    };
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === 'ready') { setIframeReady(true); sendCode(codeRef.current); }
      if (e.data.type === 'requestCode') sendCode(codeRef.current);
      if (e.data.type === 'error') {
        setError(e.data.message);
        const m = String(e.data.message).match(/vue-playground\.js:(\d+)/);
        setErrorLine(m ? Math.max(1, parseInt(m[1], 10) - 1) : null);
      }
      if (e.data.type === 'clearError') { setError(''); setErrorLine(null); }
      if (e.data.type === 'log') {
        const now = Date.now();
        if (now - logRateRef.current > 40) { // max ~25 log updates/sec
          logRateRef.current = now;
          setConsoleLogs(prev => [...prev, { id: now + Math.random(), level: e.data.level, message: e.data.message }].slice(-50));
        }
      }
      if (e.data.type === 'clearLogs') setConsoleLogs([]);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [sendCode]);

  useEffect(() => {
    if (!hydrated || !iframeReady) return;
    sendCode(codeRef.current);
    const t = [setTimeout(() => sendCode(codeRef.current), 120), setTimeout(() => sendCode(codeRef.current), 400)];
    return () => t.forEach(clearTimeout);
  }, [hydrated, iframeReady, sendCode]);

  useEffect(() => {
    if (!iframeReady) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => sendCode(), 700);
  }, [code, iframeReady, sendCode]);

  useEffect(() => {
    if (!iframeReady) return;
    const send = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      iframeRef.current?.contentWindow?.postMessage({ type: 'theme', dark }, '*');
    };
    send();
    const obs = new MutationObserver(send);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [iframeReady]);

  const handleIframeLoad = useCallback(() => {
    setIframeReady(false);
    setTimeout(() => { setIframeReady(true); sendCode(codeRef.current); }, 150);
    setTimeout(() => sendCode(codeRef.current), 600);
  }, [sendCode]);

  const selectLesson = useCallback((idx) => {
    const l = LESSONS[idx];
    const c = l.type === 'picker' ? (l.options[0]?.code ?? '') : (l.code ?? '');
    setActiveIdx(idx); setPickerIdx(0); setCode(c); codeRef.current = c;
    setError(''); setErrorLine(null); setConsoleLogs([]);
    savePosition(idx);
    clearTimeout(debounceRef.current);
    sendCode(c);
  }, [sendCode]);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(l => l.id === lesson.id);
        LESSONS.slice(idx).forEach(l => next.delete(l.id));
        showToast('Progress reset from here');
      } else {
        next.add(lesson.id);
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
        showToast('Lesson complete!');
      }
      saveProgress(next); return next;
    });
  }, [lesson.id, activeIdx, selectLesson, showToast]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target; const start = el.selectionStart; const end = el.selectionEnd;
      const next = code.slice(0, start) + '  ' + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); clearTimeout(debounceRef.current); sendCode(codeRef.current); showToast('Running');
    }
  }, [code, sendCode, showToast]);

  const syncScroll = useCallback((e) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = e.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  }, []);

  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); showToast('Copied'); }
    catch { showToast('Copy failed'); }
  }, [code, showToast]);

  const resetCode = useCallback(() => {
    setError(''); setErrorLine(null);
    clearTimeout(debounceRef.current);
    const c = lesson.type === 'picker' ? (lesson.options[pickerIdx]?.code ?? '') : (lesson.code ?? '');
    setCode(c); codeRef.current = c;
    sendCode(c); showToast('Code reset');
  }, [lesson, pickerIdx, sendCode, showToast]);

  const shareCode = useCallback(async () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(codeRef.current)));
      const url = window.location.origin + window.location.pathname + '?c=' + encoded;
      await navigator.clipboard.writeText(url);
      showToast('Share link copied!');
    } catch { showToast('Copy failed'); }
  }, [showToast]);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    if (!workAreaRef.current) return;
    isDragging.current = true; setIsDraggingH(true);
    document.body.style.userSelect = 'none';
    const rect = workAreaRef.current.getBoundingClientRect();
    const iframe = iframeRef.current;
    if (iframe) iframe.style.pointerEvents = 'none';
    const onMove = (ev) => {
      if (!isDragging.current) return;
      setEditorPct(Math.max(25, Math.min(75, ((ev.clientX - rect.left) / rect.width) * 100)));
    };
    const onUp = () => {
      isDragging.current = false; setIsDraggingH(false);
      if (iframe) iframe.style.pointerEvents = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  const lineCount   = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightVue(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);
  const logCount = consoleLogs.length;

  const vueWarnHint = useMemo(() => {
    const warn = consoleLogs.find(l => l.level === 'warn' && l.message.includes('[Vue warn]'));
    if (!warn) return null;
    const msg = warn.message;
    if (msg.includes('Missing required prop')) return 'A required prop is not being passed. Check the parent template for the missing attribute.';
    if (msg.includes('Failed to resolve component')) return 'Component not registered — add it to components: {} or define it before createApp.';
    if (msg.includes('is not defined on instance')) return 'A property used in the template is not returned from setup() or defined in data()/methods.';
    if (msg.includes('Extraneous non-emits')) return "Declare this event in emits: [] so Vue knows it's intentional.";
    if (msg.includes('Invalid prop')) return "The prop value doesn't match the declared type or validator. Check what you're passing from the parent.";
    return 'Vue warning detected — check the console panel for details.';
  }, [consoleLogs]);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return LESSONS.filter(l => l.title.toLowerCase().includes(q) || l.chapter.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="vue-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/vue-playground.svg" width={24} height={24} alt="" />
          <span className={s.headerTitle}>Vue <span className={s.accent} style={{ color: '#42b883' }}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <button className={s.iconBtn} onClick={shareCode} title="Copy share link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
          <span className={s.progressBadge} style={{ background: 'rgba(66,184,131,0.12)', color: '#42b883', borderColor: 'rgba(66,184,131,0.3)' }}>
            {completedCount}/{LESSONS.length} lessons
          </span>
        </div>
      </header>

      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarPillDot} style={{ background: '#42b883' }} />
              Vue Playground
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          </div>

          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lessons…" />
          </div>

          <div className={s.progress}>
            <div className={s.progressLabel}><span>Progress</span><span>{completedCount} / {LESSONS.length}</span></div>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ width: `${(completedCount / LESSONS.length) * 100}%`, background: '#42b883' }} />
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
                        onClick={() => selectLesson(idx)}>
                        <span className={s.lessonDot} />{l.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map(ch => (
                <div key={ch}>
                  <div className={s.chapterLabel}>{ch}</div>
                  {LESSONS.filter(l => l.chapter === ch).map(l => {
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

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            Lessons
          </button>
        )}

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(v => !v)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag} style={{ color: '#42b883', background: 'rgba(66,184,131,0.1)', borderColor: 'rgba(66,184,131,0.2)' }}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            {conceptOpen && (
              <div className={s.conceptBody}>
                <ConceptText text={lesson.concept} />
              </div>
            )}
          </div>

          {lesson.type === 'picker' && (
            <div style={{ display: 'flex', gap: 6, padding: '8px 12px', background: 'var(--bg2,#f8fafc)', borderBottom: '1px solid var(--border,#e5e7eb)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: 'var(--text3,#6b7280)', alignSelf: 'center', marginRight: 4 }}>Compare:</span>
              {lesson.options.map((opt, i) => (
                <button key={i}
                  style={{
                    padding: '3px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                    background: i === pickerIdx ? '#42b883' : 'transparent',
                    color: i === pickerIdx ? '#fff' : '#42b883',
                    border: '1px solid #42b883',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onClick={() => {
                    setPickerIdx(i);
                    const c = opt.code;
                    setCode(c); codeRef.current = c;
                    clearTimeout(debounceRef.current);
                    sendCode(c);
                  }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          <div ref={workAreaRef} className={s.workArea}>
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Editor</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={resetCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                    Reset
                  </button>
                  <button className={s.iconBtn} onClick={copyCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy
                  </button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} errorLine={errorLine} />
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                  <textarea
                    ref={textareaRef}
                    className={s.editor}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoComplete="off" autoCorrect="off" autoCapitalize="off"
                  />
                </div>
              </div>
              {error && <div className={s.errorBar}>{error}</div>}
              {vueWarnHint && !error && (
                <div style={{ padding: '6px 10px', background: '#fffbeb', borderTop: '2px solid #fbbf24', color: '#92400e', fontSize: 11, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span>⚠</span><span>{vueWarnHint}</span>
                </div>
              )}
            </div>

            <div className={`${s.dragHandle} ${isDraggingH ? s.dragHandleActive : ''}`}
              onMouseDown={startDrag} title="Drag to resize"
              style={{ ['--drag-color']: '#42b883' }} />

            <div className={s.previewPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Preview</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={() => {
                    iframeRef.current?.contentWindow?.postMessage({ type: 'reset' }, '*');
                    setTimeout(() => sendCode(codeRef.current), 50);
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                    Refresh
                  </button>
                </div>
              </div>
              <iframe ref={iframeRef} className={s.previewFrame} srcDoc={IFRAME_SRCDOC}
                sandbox="allow-scripts allow-same-origin" title="Vue preview" onLoad={handleIframeLoad} />
              <div className={s.consolePanel}>
                <div className={s.consoleHeader} onClick={() => setShowConsole(v => !v)} style={{ cursor: 'pointer' }}>
                  <div className={s.consoleTitle}><span className={s.consoleDot} />Console{logCount > 0 && <span style={{ marginLeft: 5, background: 'var(--accent)', color: '#fff', borderRadius: 999, fontSize: 10, padding: '1px 6px', fontWeight: 700 }}>{logCount}</span>}</div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: showConsole ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                {showConsole && (
                  <div className={s.consoleLogs}>
                    {consoleLogs.length === 0
                      ? <div className={s.consoleEmpty}>No output — use console.log() in your code</div>
                      : consoleLogs.map(l => (
                          <div key={l.id} className={`${s.consoleRow} ${l.level === 'warn' ? s.consoleRowWarn : l.level === 'error' ? s.consoleRowError : s.consoleRowLog}`}>
                            <span className={s.consoleIcon}>{l.level === 'warn' ? '!' : l.level === 'error' ? 'x' : '>'}</span>
                            <span className={s.consoleMsg}>{l.message}</span>
                          </div>
                        ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {lesson.challenge && <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />}

          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              Previous
            </button>
            <div className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>
                {isDone ? 'Done' : 'Mark Done'}
              </button>
              <button className={s.navBtn} disabled={activeIdx === LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
