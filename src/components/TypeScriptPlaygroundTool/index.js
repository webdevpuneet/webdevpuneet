'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../ReactPlaygroundTool/styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS } from './lessons';

const LS_PROGRESS = 'fwd-typescript-playground-progress';
const LS_POSITION = 'fwd-typescript-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}

function saveProgress(progress) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...progress])); } catch {}
}

function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); }
  catch { return 0; }
}

function savePosition(index) {
  try { localStorage.setItem(LS_POSITION, JSON.stringify(index)); } catch {}
}

const TS_KW = new Set([
  'abstract', 'any', 'as', 'async', 'await', 'boolean', 'break', 'case', 'catch', 'class',
  'const', 'constructor', 'continue', 'default', 'do', 'else', 'enum', 'export', 'extends',
  'false', 'finally', 'for', 'from', 'function', 'if', 'implements', 'import', 'in',
  'interface', 'keyof', 'let', 'never', 'new', 'null', 'number', 'private', 'protected',
  'public', 'readonly', 'return', 'string', 'switch', 'this', 'throw', 'true', 'try',
  'type', 'typeof', 'undefined', 'unknown', 'void', 'while',
]);

const TS_BUILTINS = new Set([
  'Array', 'Boolean', 'Date', 'Error', 'JSON', 'Math', 'Number', 'Object', 'Promise',
  'Record', 'Partial', 'Required', 'Pick', 'Omit', 'Readonly', 'ReturnType', 'Parameters',
  'Set', 'String', 'console', 'document', 'window', 'app', 'write', 'setTimeout',
]);

const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlightTS(code) {
  let out = '';
  let i = 0;
  while (i < code.length) {
    const c = code[i];
    if (/\s/.test(c)) { out += c; i++; continue; }
    if (c === '/' && code[i + 1] === '/') {
      let j = i;
      while (j < code.length && code[j] !== '\n') j++;
      out += `<span class="rjx-cm">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (c === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const j = end < 0 ? code.length : end + 2;
      out += `<span class="rjx-cm">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const quote = c;
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === quote) { j++; break; }
        if (quote !== '`' && code[j] === '\n') break;
        j++;
      }
      out += `<span class="rjx-str">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < code.length && /[0-9a-fA-F.xXeEoObB_]/.test(code[j])) j++;
      out += `<span class="rjx-num">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (TS_KW.has(word)) out += `<span class="rjx-kw">${word}</span>`;
      else if (TS_BUILTINS.has(word)) out += `<span class="rjx-hook">${word}</span>`;
      else out += esc(word);
      i = j;
      continue;
    }
    if ('{}[]()'.includes(c)) out += `<span class="rjx-brace">${esc(c)}</span>`;
    else out += `<span class="rjx-punct">${esc(c)}</span>`;
    i++;
  }
  return out;
}

function launchConfetti() {
  const colors = ['#3178c6', '#60a5fa', '#10b981', '#f59e0b', '#ef4444'];
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

const IFRAME_SRCDOC = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;padding:14px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.5;color:#111827;background:#fff;transition:background .2s,color .2s}
button,input,textarea,select{font:inherit}
button{cursor:pointer}
#app{min-height:22px}
#output{display:none;margin-top:14px;border-top:1px solid #e5e7eb;padding-top:10px;font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',monospace;font-size:12px;white-space:pre-wrap;color:#374151}
#output:not(:empty){display:block}
body:has(#app:empty) #output:not(:empty){margin-top:0;border-top:none;padding-top:0}
.output-line{padding:2px 0}
#err{display:none;padding:10px 12px;background:#fef2f2;border-top:2px solid #fca5a5;color:#dc2626;font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',monospace;font-size:11px;white-space:pre-wrap;word-break:break-word;position:fixed;bottom:0;left:0;right:0;max-height:100px;overflow:auto}
</style>
</head>
<body>
<div id="app"></div>
<div id="output"></div>
<div id="err"></div>
<script>
var app=document.getElementById('app');
var output=document.getElementById('output');
var errEl=document.getElementById('err');
var timers=[];
var hasRun=false;
var _log=console.log,_warn=console.warn,_err=console.error;

function serialise(value){
  try { return typeof value === 'string' ? value : JSON.stringify(value,null,2); }
  catch(e) { return String(value); }
}
function sendLog(level,args){
  var msg=Array.from(args).map(serialise).join(' ');
  window.parent.postMessage({type:'log',level:level,message:msg},'*');
}
console.log=function(){_log.apply(console,arguments);sendLog('log',arguments);};
console.warn=function(){_warn.apply(console,arguments);sendLog('warn',arguments);};
console.error=function(){_err.apply(console,arguments);sendLog('error',arguments);};

function clearTimers(){timers.forEach(function(id){clearTimeout(id);clearInterval(id);});timers=[];}
var realSetTimeout=window.setTimeout.bind(window);
var realSetInterval=window.setInterval.bind(window);
window.setTimeout=function(fn,ms){var id=realSetTimeout(fn,ms);timers.push(id);return id;};
window.setInterval=function(fn,ms){var id=realSetInterval(fn,ms);timers.push(id);return id;};

function showErr(msg){errEl.textContent=msg;errEl.style.display='block';window.parent.postMessage({type:'error',message:msg},'*');}
function clearErr(){errEl.textContent='';errEl.style.display='none';window.parent.postMessage({type:'clearError'},'*');}
function write(value){
  var line=document.createElement('div');
  line.className='output-line';
  line.textContent=serialise(value);
  output.append(line);
}
function clearOutput(){output.innerHTML='';}
function $(selector){return app.querySelector(selector);}
function $$(selector){return Array.from(app.querySelectorAll(selector));}

function convertEnum(match, name, body) {
  var index = 0;
  var entries = body.split(',').map(function(part) {
    var text = part.trim();
    if (!text) return '';
    var pair = text.split('=');
    var key = pair[0].trim();
    var value = pair[1] ? pair.slice(1).join('=').trim() : String(index);
    index++;
    return JSON.stringify(key) + ':' + value;
  }).filter(Boolean);
  return 'const ' + name + ' = {' + entries.join(',') + '};';
}

function stripTypescript(code) {
  return code
    .replace(/^\\s*import\\s[^;\\n]*[;\\n]?/gm, '')
    .replace(/^\\s*export\\s+default\\s+/gm, '')
    .replace(/^\\s*export\\s+/gm, '')
    .replace(/enum\\s+(\\w+)\\s*\\{([\\s\\S]*?)\\}/g, convertEnum)
    .replace(/interface\\s+\\w+(?:\\s+extends\\s+[\\w,\\s]+)?\\s*\\{[\\s\\S]*?\\}\\s*/g, '')
    .replace(/type\\s+\\w+(?:<[^>]+>)?\\s*=\\s*\\{[\\s\\S]*?\\};?\\s*/g, '')
    .replace(/type\\s+\\w+(?:<[^>]+>)?\\s*=\\s*[^;]+;\\s*/g, '')
    .replace(/\\b(public|private|protected|readonly)\\s+/g, '')
    .replace(/function\\s+(\\w+)<[^>]+>/g, 'function $1')
    .replace(/\\b(class\\s+\\w+)\\s+implements\\s+[\\w,\\s]+/g, '$1')
    .replace(/\\b([A-Za-z_$][\\w$]*)<[^>\\n]+>\\(/g, '$1(')
    .replace(/:\\s*\\{[^=\\n]*\\}(?=\\s*=)/g, '')
    .replace(/:\\s*\\[[^\\]]+\\](?=\\s*[=;,)])/g, '')
    .replace(/:\\s*(?!(?:true|false|null)\\b)[A-Za-z_$][\\w$]*(?:<[^=\\n]+>)?(?=\\s*[=;,)\\{])/g, '')
    .replace(/:\\s*(?!['"\`\\d\\{\\[]|true\\b|false\\b|null\\b)[A-Za-z_$][\\w$<>,\\[\\]\\s|&.]*(?=\\s*[=;,)\\{])/g, '')
    .replace(/\\?\\s*:/g, ':')
    .replace(/([A-Za-z_$][\\w$]*)\\?(?=\\s*[,)=])/g, '$1')
    .replace(/\\s+as\\s+[A-Za-z_$][\\w$<>,\\[\\]\\s|&.]*/g, '')
    .replace(/!\\./g, '.');
}

function run(code){
  hasRun=true;
  clearTimers();
  clearErr();
  clearOutput();
  window.parent.postMessage({type:'clearLogs'},'*');
  app.innerHTML='';
  try {
    var clean=stripTypescript(code);
    var fn=new Function('api', [
      'const app=api.app, write=api.write, clearOutput=api.clearOutput, $=api.$, $$=api.$$;',
      clean,
      '\\n//# sourceURL=typescript-playground-user-code.js'
    ].join('\\n'));
    fn({app:app,write:write,clearOutput:clearOutput,$:$,$$:$$});
  } catch(e) {
    showErr(e && e.stack ? e.stack.split('\\n').slice(0,3).join('\\n') : String(e));
  }
}

window.addEventListener('error',function(e){showErr(e.message || 'Runtime error');});
window.addEventListener('unhandledrejection',function(e){showErr(e.reason && e.reason.message ? e.reason.message : String(e.reason));});
window.addEventListener('message',function(e){
  if(!e.data)return;
  if(e.data.type==='run')run(e.data.code);
  if(e.data.type==='reset'){clearTimers();app.innerHTML='';clearOutput();clearErr();}
  if(e.data.type==='theme'){
    document.body.style.background=e.data.dark?'#0e0f11':'#ffffff';
    document.body.style.color=e.data.dark?'#e8eaf0':'#111827';
    output.style.borderTopColor=e.data.dark?'#27272a':'#e5e7eb';
    output.style.color=e.data.dark?'#cbd5e1':'#374151';
  }
});
function signalReady(){window.parent.postMessage({type:'ready'},'*');}
function requestCode(){if(!hasRun)window.parent.postMessage({type:'requestCode'},'*');}
signalReady();
realSetTimeout(signalReady,100);
realSetTimeout(signalReady,350);
realSetTimeout(signalReady,900);
realSetTimeout(requestCode,150);
realSetTimeout(requestCode,450);
realSetTimeout(requestCode,1000);
realSetTimeout(requestCode,1800);
realSetTimeout(requestCode,3000);
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
          return <button key={option} className={cls} onClick={() => picked === null && setPicked(index)}>{option}</button>;
        })}
      </div>
      {picked !== null && <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>}
    </div>
  );
}

function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

function LineNums({ count, scrollRef, errorLine }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={`${s.lineNum} ${i + 1 === errorLine ? s.lineNumError : ''}`}>{i + 1}</div>
      ))}
    </div>
  );
}

export default function TypeScriptPlaygroundTool() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [code, setCode] = useState(LESSONS[0].code);
  const [iframeReady, setIframeReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');
  const [errorLine, setErrorLine] = useState(null);
  const [progress, setProgress] = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState('');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [editorPct, setEditorPct] = useState(50);
  const [search, setSearch] = useState('');
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);
  const [autoRun, setAutoRun] = useState(true);

  const iframeRef = useRef(null);
  const lineNumsRef = useRef(null);
  const highlightRef = useRef(null);
  const debounceRef = useRef(null);
  const workAreaRef = useRef(null);
  const lessonListRef = useRef(null);
  const codeRef = useRef(code);
  const isDragging = useRef(false);

  const lesson = LESSONS[activeIdx];

  useEffect(() => { codeRef.current = code; }, [code]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  const sendCode = useCallback((nextCode) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'run', code: nextCode ?? codeRef.current }, '*');
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
      setActiveIdx(saved);
      setCode(LESSONS[saved].code);
      codeRef.current = LESSONS[saved].code;
    }
    setHydrated(true);
  }, []);

  // Scroll active lesson into view on initial load only (within panel, no page scroll)
  useEffect(() => {
    if (!hydrated) return;
    const list = lessonListRef.current;
    const el = list?.querySelector('[data-active="true"]');
    if (list && el) {
      list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2;
    }
  }, [hydrated]);

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
        sendCode(codeRef.current);
      }
      if (event.data.type === 'requestCode') sendCode(codeRef.current);
      if (event.data.type === 'error') {
        setError(event.data.message);
        const match = String(event.data.message).match(/typescript-playground-user-code\.js:(\d+):\d+/);
        setErrorLine(match ? Math.max(1, parseInt(match[1], 10) - 1) : null);
      }
      if (event.data.type === 'clearError') { setError(''); setErrorLine(null); }
      if (event.data.type === 'log') {
        setConsoleLogs(prev => [...prev, { id: Date.now() + Math.random(), level: event.data.level, message: event.data.message }].slice(-30));
      }
      if (event.data.type === 'clearLogs') setConsoleLogs([]);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [sendCode]);

  useEffect(() => {
    if (!hydrated || !iframeReady) return;
    sendCode(codeRef.current);
    const retryTimers = [
      setTimeout(() => sendCode(codeRef.current), 120),
      setTimeout(() => sendCode(codeRef.current), 400),
      setTimeout(() => sendCode(codeRef.current), 900),
    ];
    return () => retryTimers.forEach(clearTimeout);
  }, [hydrated, iframeReady, sendCode]);

  useEffect(() => {
    if (!iframeReady || !autoRun) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => sendCode(), 800);
  }, [code, iframeReady, autoRun, sendCode]);

  useEffect(() => {
    if (!iframeReady) return;
    const send = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      iframeRef.current?.contentWindow?.postMessage({ type: 'theme', dark }, '*');
    };
    send();
    const observer = new MutationObserver(send);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [iframeReady]);

  const handleIframeLoad = useCallback(() => {
    setIframeReady(false);
    setTimeout(() => {
      setIframeReady(true);
      sendCode(codeRef.current);
    }, 150);
    setTimeout(() => sendCode(codeRef.current), 600);
  }, [sendCode]);

  const selectLesson = useCallback((index) => {
    const nextCode = LESSONS[index].code;
    setActiveIdx(index);
    setError('');
    setErrorLine(null);
    setConsoleLogs([]);
    savePosition(index);
    clearTimeout(debounceRef.current);
    applyCodeChange(nextCode);
    sendCode(nextCode);
  }, [applyCodeChange, sendCode]);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(item => item.id === lesson.id);
        LESSONS.slice(idx).forEach(item => next.delete(item.id));
        showToast('Progress reset from here');
      } else {
        next.add(lesson.id);
        const chapterLessons = LESSONS.filter(item => item.chapter === lesson.chapter);
        if (chapterLessons.every(item => next.has(item.id))) launchConfetti();
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
        showToast('Lesson complete');
      }
      saveProgress(next);
      return next;
    });
  }, [activeIdx, lesson.chapter, lesson.id, selectLesson, showToast]);

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
      showToast('Running');
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
    setError('');
    setErrorLine(null);
    clearTimeout(debounceRef.current);
    applyCodeChange(lesson.code);
    sendCode(lesson.code);
    showToast('Code reset');
  }, [applyCodeChange, lesson.code, sendCode, showToast]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.id}.ts`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded');
  }, [code, lesson.id, showToast]);

  const shareCode = useCallback(async () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      const url = `${window.location.origin}/typescript-playground/?c=${encoded}`;
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
    const onMove = moveEvent => {
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
  const highlighted = useMemo(() => highlightTS(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);
  const logCount = consoleLogs.length;
  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const query = search.toLowerCase();
    return LESSONS.filter(item => item.title.toLowerCase().includes(query) || item.chapter.toLowerCase().includes(query));
  }, [search]);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="typescript-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/typescript-playground.svg" width={24} height={24} alt="" />
          <span className={s.headerTitle}>TypeScript <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length} lessons</span>
        </div>
      </header>

      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}><span className={s.sidebarPillDot} />TS Playground</div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          </div>
          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search lessons..." />
          </div>
          <div className={s.progress}>
            <div className={s.progressLabel}><span>Progress</span><span>{completedCount} / {LESSONS.length}</span></div>
            <div className={s.progressBar}><div className={s.progressFill} style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} /></div>
          </div>
          <div className={s.lessonList} ref={lessonListRef}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div style={{ padding: '12px', fontSize: 12, color: 'var(--text3)' }}>No lessons found</div>
                : filteredLessons.map(item => {
                    const index = LESSONS.indexOf(item);
                    return (
                      <button key={item.id} data-active={index === activeIdx ? 'true' : undefined} className={`${s.lessonBtn} ${index === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`} onClick={() => { selectLesson(index); setSearch(''); }}>
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map(chapter => (
                <div key={chapter}>
                  <div className={s.chapterLabel}>{chapter}</div>
                  {LESSONS.filter(item => item.chapter === chapter).map(item => {
                    const index = LESSONS.indexOf(item);
                    return (
                      <button key={item.id} data-active={index === activeIdx ? 'true' : undefined} className={`${s.lessonBtn} ${index === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`} onClick={() => selectLesson(index)}>
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
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            Lessons
          </button>
        )}

        <div className={s.main}>
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(open => !open)}>
              <div className={s.conceptTitle}><span className={s.chapterTag}>{lesson.chapter}</span>{lesson.title}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            {conceptOpen && <div className={s.conceptBody}><ConceptText text={lesson.concept} /></div>}
          </div>

          <div ref={workAreaRef} className={s.workArea}>
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Editor</span>
                <div className={s.paneActions}>
                  <button className={`${s.iconBtn} ${autoRun ? s.iconBtnActive : ''}`} onClick={() => setAutoRun(v => !v)} title={autoRun ? 'Auto-run on' : 'Auto-run off'}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    Auto
                  </button>
                  <button className={s.iconBtn} onClick={resetCode}>Reset</button>
                  <button className={s.iconBtn} onClick={copyCode}>Copy</button>
                  <button className={s.iconBtn} onClick={downloadCode}>.ts</button>
                  <button className={s.iconBtn} onClick={shareCode}>Share</button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} errorLine={errorLine} />
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                  <textarea className={s.editor} value={code} onChange={event => setCode(event.target.value)} onKeyDown={handleKeyDown} onScroll={syncScroll} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" />
                </div>
              </div>
              {error && <div className={s.errorBar}>{error}</div>}
            </div>

            <div className={`${s.dragHandle} ${isDraggingHandle ? s.dragHandleActive : ''}`} onMouseDown={startDrag} title="Drag to resize" />

            <div className={s.previewPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Preview</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={() => { iframeRef.current?.contentWindow?.postMessage({ type: 'reset' }, '*'); setTimeout(() => sendCode(codeRef.current), 50); }}>Refresh</button>
                </div>
              </div>
              <iframe ref={iframeRef} className={s.previewFrame} srcDoc={IFRAME_SRCDOC} sandbox="allow-scripts" title="TypeScript preview" onLoad={handleIframeLoad} />
              <div className={s.consolePanel}>
                <div className={s.consoleHeader} onClick={() => setShowConsole(v => !v)} style={{ cursor: 'pointer' }}>
                  <div className={s.consoleTitle}><span className={s.consoleDot} />Console{logCount > 0 && <span style={{ marginLeft: 5, background: 'var(--accent)', color: '#fff', borderRadius: 999, fontSize: 10, padding: '1px 6px', fontWeight: 700 }}>{logCount}</span>}</div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: showConsole ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                {showConsole && (
                  <div className={s.consoleLogs}>
                    {consoleLogs.length === 0
                      ? <div className={s.consoleEmpty}>No output yet — use write() or console.log()</div>
                      : consoleLogs.map(entry => (
                          <div key={entry.id} className={`${s.consoleRow} ${entry.level === 'warn' ? s.consoleRowWarn : entry.level === 'error' ? s.consoleRowError : s.consoleRowLog}`}>
                            <span className={s.consoleIcon}>{entry.level === 'warn' ? '!' : entry.level === 'error' ? 'x' : '>'}</span>
                            <span className={s.consoleMsg}>{entry.message}</span>
                          </div>
                        ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {lesson.challenge && <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />}

          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>Previous</button>
            <div className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>{isDone ? 'Done' : 'Mark Done'}</button>
              <button className={s.navBtn} disabled={activeIdx === LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
