'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { LESSONS, CHAPTERS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import PlaygroundSidebarTitle from '@/components/PlaygroundSidebarTitle';
// ── localStorage keys ─────────────────────────────────────────────────────────
const LS_PROGRESS = 'fwd-react-playground-progress';
const LS_POSITION = 'fwd-react-playground-position';

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

// ── JSX syntax highlighter ────────────────────────────────────────────────────
const JS_KW = new Set(['function','return','const','let','var','if','else','for','while','do','switch','case','break','continue','new','delete','typeof','instanceof','in','of','class','extends','async','await','try','catch','finally','throw','true','false','null','undefined','this','import','export','default','from','static','get','set','yield','void']);
const HOOKS = new Set(['useState','useEffect','useRef','useMemo','useCallback','useContext','useReducer','createContext','forwardRef','memo']);
const _esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// Find the matching } for an opening { — skips strings, template literals, and comments
// so that `}` inside strings like style={{ color: 'red}' }} doesn't break the count.
// `start` is the index AFTER the opening {; returns the index OF the matching }.
function findMatchingBrace(code, start) {
  let depth = 1;
  let i = start;
  const n = code.length;
  while (i < n && depth > 0) {
    const c = code[i];
    // Line comment
    if (c === '/' && code[i+1] === '/') { while (i < n && code[i] !== '\n') i++; continue; }
    // Block comment
    if (c === '/' && code[i+1] === '*') {
      i += 2; while (i < n && !(code[i] === '*' && code[i+1] === '/')) i++; i += 2; continue;
    }
    // Single / double quoted string
    if (c === '"' || c === "'") {
      const q = c; i++;
      while (i < n) { if (code[i] === '\\') { i += 2; continue; } if (code[i] === q) { i++; break; } i++; }
      continue;
    }
    // Template literal
    if (c === '`') {
      i++;
      while (i < n && code[i] !== '`') {
        if (code[i] === '\\') { i += 2; continue; }
        if (code[i] === '$' && code[i+1] === '{') {
          i += 2;
          const end = findMatchingBrace(code, i); // recursive for nested ${}
          i = end < n ? end + 1 : end;
          continue;
        }
        i++;
      }
      if (i < n) i++; // skip closing `
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) break; }
    i++;
  }
  return i; // index of the matching }
}

// Parse JSX tag attribute list starting at `start`, returns { html, end }
function highlightAttrs(code, start) {
  let out = '';
  let i = start;
  const n = code.length;

  while (i < n) {
    const c = code[i];
    // End of tag
    if (c === '/' && code[i+1] === '>') {
      out += '<span class="rjx-punct">/&gt;</span>'; i += 2; return { html: out, end: i };
    }
    if (c === '>') {
      out += '<span class="rjx-punct">&gt;</span>'; i++; return { html: out, end: i };
    }
    // Whitespace / newlines
    if (/[\s]/.test(c)) { out += c; i++; continue; }
    // Spread or expression attr {…}
    if (c === '{') {
      const j = findMatchingBrace(code, i + 1);
      out += `<span class="rjx-brace">{</span>${highlightJSX(code.slice(i+1,j))}<span class="rjx-brace">}</span>`;
      i = j < n ? j + 1 : j; continue;
    }
    // Attribute name
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i; while (j < n && /[a-zA-Z0-9_$-]/.test(code[j])) j++;
      out += `<span class="rjx-attr">${_esc(code.slice(i,j))}</span>`; i = j;
      // Optional =value
      if (code[i] === '=') {
        out += '<span class="rjx-punct">=</span>'; i++;
        if (code[i] === '"' || code[i] === "'") {
          const q = code[i]; let j = i+1;
          while (j < n && code[j] !== q && code[j] !== '\n') { if (code[j]==='\\') j++; j++; }
          if (j < n && code[j] === q) j++;
          out += `<span class="rjx-val">${_esc(code.slice(i,j))}</span>`; i = j;
        } else if (code[i] === '{') {
          const j = findMatchingBrace(code, i + 1);
          out += `<span class="rjx-brace">{</span>${highlightJSX(code.slice(i+1,j))}<span class="rjx-brace">}</span>`;
          i = j < n ? j + 1 : j;
        }
      }
      continue;
    }
    out += _esc(c); i++;
  }
  return { html: out, end: i };
}

function highlightJSX(code) {
  let out = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    const c = code[i];
    if (c === '\n' || c === ' ' || c === '\t' || c === '\r') { out += c; i++; continue; }

    // Line comment
    if (c === '/' && code[i+1] === '/') {
      let j = i; while (j < n && code[j] !== '\n') j++;
      out += `<span class="rjx-cm">${_esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    // Block comment
    if (c === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i+2);
      const j = end < 0 ? n : end + 2;
      out += `<span class="rjx-cm">${_esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    // Template literal — highlight string parts green, ${} delimiters as punct, expressions normally
    if (c === '`') {
      out += '<span class="rjx-str">`</span>'; i++;
      while (i < n) {
        if (code[i] === '\\') { out += `<span class="rjx-str">${_esc(code.slice(i,i+2))}</span>`; i+=2; continue; }
        if (code[i] === '`') { out += '<span class="rjx-str">`</span>'; i++; break; }
        if (code[i] === '$' && code[i+1] === '{') {
          out += '<span class="rjx-punct">${</span>'; i += 2;
          const xs = i;
          const je = findMatchingBrace(code, i);
          out += highlightJSX(code.slice(xs, je));
          if (je < n && code[je] === '}') { out += '<span class="rjx-punct">}</span>'; i = je + 1; }
          else { i = je; }
          continue;
        }
        // String content chunk up to next special char
        let j = i;
        while (j < n && code[j] !== '\\' && code[j] !== '`' && !(code[j]==='$' && code[j+1]==='{')) j++;
        if (j > i) { out += `<span class="rjx-str">${_esc(code.slice(i,j))}</span>`; i = j; }
        else { out += _esc(code[i]); i++; }
      }
      continue;
    }
    // String
    if (c === '"' || c === "'") {
      let j = i+1;
      while (j < n && code[j] !== c && code[j] !== '\n') { if (code[j]==='\\') j++; j++; }
      if (j < n && code[j] === c) j++;
      out += `<span class="rjx-str">${_esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    // JSX tag opener
    if (c === '<' && i+1 < n && (/[A-Za-z]/.test(code[i+1]) || code[i+1] === '/')) {
      out += '<span class="rjx-punct">&lt;</span>'; i++;
      if (code[i] === '/') { out += '<span class="rjx-punct">/</span>'; i++; }
      let j = i; while (j < n && /[A-Za-z0-9._-]/.test(code[j])) j++;
      if (j > i) {
        const tag = code.slice(i,j);
        out += /^[A-Z]/.test(tag) ? `<span class="rjx-comp">${_esc(tag)}</span>` : `<span class="rjx-tag">${_esc(tag)}</span>`;
        i = j;
        // Parse attribute list
        const attrs = highlightAttrs(code, i);
        out += attrs.html; i = attrs.end;
      }
      continue;
    }
    // Self-close />
    if (c === '/' && code[i+1] === '>') { out += '<span class="rjx-punct">/&gt;</span>'; i+=2; continue; }
    // >
    if (c === '>') { out += '<span class="rjx-punct">&gt;</span>'; i++; continue; }
    // Number
    if (/[0-9]/.test(c)) {
      let j = i; while (j < n && /[0-9a-fA-F.xXeEoObB_]/.test(code[j])) j++;
      out += `<span class="rjx-num">${_esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    // Word
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i; while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const w = code.slice(i,j);
      if (JS_KW.has(w)) out += `<span class="rjx-kw">${w}</span>`;
      else if (HOOKS.has(w)) out += `<span class="rjx-hook">${w}</span>`;
      else if (/^[A-Z]/.test(w)) out += `<span class="rjx-comp">${_esc(w)}</span>`;
      else out += _esc(w);
      i = j; continue;
    }
    // Braces
    if (c === '{' || c === '}') { out += `<span class="rjx-brace">${c}</span>`; i++; continue; }
    out += _esc(c); i++;
  }
  return out;
}

// ── Confetti ──────────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#61dafb','#10b981','#6366f1','#f59e0b','#ef4444','#ec4899'];
  for (let i = 0; i < 72; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dur = 1.4 + Math.random() * 1.4;
    const delay = Math.random() * 0.4;
    const size = 6 + Math.random() * 6;
    el.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:${Math.random()>0.5?'50%':'2px'};background:${color};left:${Math.random()*100}vw;top:-12px;pointer-events:none;z-index:99999;animation:confettiFall ${dur}s ${delay}s ease-in forwards;transform:rotate(${Math.random()*360}deg)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000 + 100);
  }
}

// ── Iframe srcdoc ─────────────────────────────────────────────────────────────
const IFRAME_SRCDOC = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"></` + `script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></` + `script>
<script src="https://unpkg.com/@babel/standalone@7.25.9/babel.min.js"></` + `script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></` + `script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></` + `script>
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;padding:12px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.5;color:#111;background:#fff;transition:background 0.2s,color 0.2s}
button{cursor:pointer;font-family:inherit}
input,textarea,select{font-family:inherit}
#err{display:none;padding:10px 12px;background:#fef2f2;border-top:2px solid #fca5a5;color:#dc2626;font-family:monospace;font-size:11px;white-space:pre-wrap;word-break:break-all;position:fixed;bottom:0;left:0;right:0;max-height:100px;overflow:auto}
</style>
</head>
<body>
<div id="root"></div>
<div id="err"></div>
<script>
var _root=null;
var errEl=document.getElementById('err');

// Register GSAP plugins when available
(function tryRegisterGsap(){
  if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined'){
    gsap.registerPlugin(ScrollTrigger);
  } else {
    setTimeout(tryRegisterGsap,100);
  }
})();

// Console interception
var _log=console.log,_warn=console.warn,_err=console.error;
function sendLog(level,args){
  var msg=Array.from(args).map(function(a){try{return typeof a==='object'?JSON.stringify(a,null,2):String(a);}catch(e){return '[object]';}}).join(' ');
  window.parent.postMessage({type:'log',level:level,message:msg},'*');
}
console.log=function(){_log.apply(console,arguments);sendLog('log',arguments);};
console.warn=function(){_warn.apply(console,arguments);sendLog('warn',arguments);};
console.error=function(){_err.apply(console,arguments);sendLog('error',arguments);};

class Boundary extends React.Component{
  constructor(p){super(p);this.state={err:null};}
  static getDerivedStateFromError(e){return{err:e};}
  componentDidCatch(e){showErr(e.message);}
  render(){return this.state.err?null:this.props.children;}
}

function showErr(msg){errEl.textContent=msg;errEl.style.display='block';window.parent.postMessage({type:'error',message:msg},'*');}
function clearErr(){errEl.textContent='';errEl.style.display='none';window.parent.postMessage({type:'clearError'},'*');}

function run(code){
  clearErr();
  window.parent.postMessage({type:'clearLogs'},'*');
  try{
    var clean=code.replace(/^\\s*import\\s[^;\\n]*[;\\n]?/gm,'').replace(/^\\s*export\\s+default\\s+/gm,'').replace(/^\\s*export\\s+/gm,'');
    var out=Babel.transform(clean,{presets:[['react',{runtime:'classic'}]],filename:'app.jsx'}).code;
    var fn=new Function('React',[
      'var useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,',
      'useMemo=React.useMemo,useCallback=React.useCallback,useContext=React.useContext,',
      'useReducer=React.useReducer,createContext=React.createContext,',
      'forwardRef=React.forwardRef,memo=React.memo;',
      out,
      'return typeof App!=="undefined"?App:null;'
    ].join(''));
    var App=fn(React);
    if(!App){showErr('Define a function named App that returns JSX.');return;}
    if(_root){_root.unmount();_root=null;}
    var el=document.getElementById('root');
    el.innerHTML='';
    _root=ReactDOM.createRoot(el);
    _root.render(React.createElement(Boundary,null,React.createElement(App)));
  }catch(e){showErr(e.message);}
}

window.addEventListener('message',function(e){
  if(!e.data)return;
  if(e.data.type==='run')run(e.data.code);
  if(e.data.type==='reset'){if(_root){_root.unmount();_root=null;}document.getElementById('root').innerHTML='';clearErr();}
  if(e.data.type==='theme'){
    document.body.style.background=e.data.dark?'#0e0f11':'#ffffff';
    document.body.style.color=e.data.dark?'#e8eaf0':'#111827';
  }
});

window.parent.postMessage({type:'ready'},'*');
setTimeout(function(){window.parent.postMessage({type:'ready'},'*');},300);
setTimeout(function(){window.parent.postMessage({type:'ready'},'*');},900);
</` + `script>
</body>
</html>`;

// ── Challenge widget ──────────────────────────────────────────────────────────
function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);

  const choose = (i) => { if (picked !== null) return; setPicked(i); };

  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}>
        <span>🎯</span> Quick Check
      </div>
      <div className={s.challengeQuestion}>{challenge.question}</div>
      <div className={s.challengeOptions}>
        {challenge.options.map((opt, i) => {
          let cls = s.challengeBtn;
          if (picked !== null) {
            if (i === challenge.correct) cls += ' ' + s.challengeReveal;
            else if (i === picked) cls += ' ' + s.challengeWrong;
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              {opt}
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

// ── Inline concept renderer ───────────────────────────────────────────────────
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

// ── Line numbers ──────────────────────────────────────────────────────────────
function LineNums({ count, scrollRef, errorLine }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={`${s.lineNum} ${i+1 === errorLine ? s.lineNumError : ''}`}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReactPlaygroundTool() {
  const [activeIdx, setActiveIdx]     = useState(0);
  const [code, setCode]               = useState(LESSONS[0].code);
  const [pickerIdx, setPickerIdx]     = useState(0);
  const [iframeReady, setIframeReady] = useState(false);
  const [hydrated, setHydrated]       = useState(false);
  const [error, setError]             = useState('');
  const [errorLine, setErrorLine]     = useState(null);
  const [progress, setProgress]       = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [isMobile, setIsMobile]       = useState(false);
  const [toast, setToast]             = useState('');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [editorPct, setEditorPct]     = useState(50);
  const [search, setSearch]           = useState('');
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);

  const iframeRef    = useRef(null);
  const lineNumsRef  = useRef(null);
  const textareaRef  = useRef(null);
  const highlightRef = useRef(null);
  const debounceRef    = useRef(null);
  const workAreaRef    = useRef(null);
  const codeRef        = useRef(code);
  const isDragging     = useRef(false);
  const initialSentRef  = useRef(false); // prevent double-send on first load
  const skipDebounceRef = useRef(false); // skip debounce when sendCode already called directly
  const lessonListRef   = useRef(null);  // lesson sidebar scroll container

  const lesson = LESSONS[activeIdx];

  useEffect(() => { codeRef.current = code; }, [code]);

  // ── Direct send helper ────────────────────────────────────────────────────
  const sendCode = useCallback((c) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'run', code: c ?? codeRef.current }, '*');
  }, []);

  // ── Programmatic code change ──────────────────────────────────────────────
  // Lesson switches and resets intentionally start a fresh undo stack —
  // users expect a clean slate when they load new code.
  const applyCodeChange = useCallback((newValue) => {
    codeRef.current = newValue;
    setCode(newValue);
  }, []);

  // ── Hydrate from localStorage ─────────────────────────────────────────────
  useEffect(() => {
    setProgress(readProgress());
    // Check URL for shared code first
    try {
      const urlCode = new URLSearchParams(window.location.search).get('c');
      if (urlCode) {
        const decoded = decodeURIComponent(escape(atob(urlCode)));
        setCode(decoded); codeRef.current = decoded;
        setHydrated(true); return;
      }
    } catch {}
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      const l = LESSONS[saved];
      const initialCode = l.type === 'picker' ? l.options[0].code : l.code;
      setActiveIdx(saved); setCode(initialCode); codeRef.current = initialCode; setPickerIdx(0);
    }
    setHydrated(true);
  }, []);

  // ── Scroll active lesson into view on initial load only ──────────────────
  useEffect(() => {
    const list = lessonListRef.current;
    if (!list) return;
    const active = list.querySelector('[data-active="true"]');
    if (!active) return;
    list.scrollTo({ top: active.offsetTop - 8, behavior: 'instant' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keep active lesson visible on clicks (scroll only if out of view) ────
  useEffect(() => {
    const list = lessonListRef.current;
    if (!list) return;
    const active = list.querySelector('[data-active="true"]');
    if (!active) return;
    const { offsetTop, offsetHeight } = active;
    const { scrollTop, clientHeight } = list;
    if (offsetTop < scrollTop) {
      // lesson is above visible area — scroll it into view at top
      list.scrollTo({ top: offsetTop - 8, behavior: 'smooth' });
    } else if (offsetTop + offsetHeight > scrollTop + clientHeight) {
      // lesson is below visible area — scroll it into view at bottom
      list.scrollTo({ top: offsetTop + offsetHeight - clientHeight + 8, behavior: 'smooth' });
    }
    // if already visible — do nothing
  }, [activeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mobile detection ──────────────────────────────────────────────────────
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

  // ── Message listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = e => {
      if (!e.data) return;
      if (e.data.type === 'ready') setIframeReady(true);
      if (e.data.type === 'error') {
        setError(e.data.message);
        const m = e.data.message.match(/\((\d+):\d+\)/);
        setErrorLine(m ? parseInt(m[1]) : null);
      }
      if (e.data.type === 'clearError') { setError(''); setErrorLine(null); }
      if (e.data.type === 'log')   setConsoleLogs(p => [...p, { id: Date.now()+Math.random(), level: e.data.level, message: e.data.message }].slice(-30));
      if (e.data.type === 'clearLogs') setConsoleLogs([]);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // ── Send once BOTH gates open ─────────────────────────────────────────────
  useEffect(() => {
    if (!hydrated || !iframeReady) return;
    initialSentRef.current = true;
    sendCode(codeRef.current);
  }, [hydrated, iframeReady]); // eslint-disable-line

  // ── Debounced send for typing ─────────────────────────────────────────────
  useEffect(() => {
    if (!iframeReady) return;
    // Skip when initial send already handled by the gate effect
    if (initialSentRef.current) { initialSentRef.current = false; return; }
    // Skip when sendCode was already called directly (lesson switch, reset, picker)
    if (skipDebounceRef.current) { skipDebounceRef.current = false; return; }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => sendCode(), 300);
  }, [code, iframeReady, sendCode]);

  // ── Dark mode sync to iframe ──────────────────────────────────────────────
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

  // ── Confetti on chapter completion ────────────────────────────────────────
  const checkChapterComplete = useCallback((newProgress, completedId) => {
    const lesson = LESSONS.find(l => l.id === completedId);
    if (!lesson) return;
    const chapterLessons = LESSONS.filter(l => l.chapter === lesson.chapter);
    const allDone = chapterLessons.every(l => newProgress.has(l.id));
    if (allDone) launchConfetti();
  }, []);

  // ── onLoad fallback ───────────────────────────────────────────────────────
  const handleIframeLoad = useCallback(() => {
    setTimeout(() => setIframeReady(true), 1000);
  }, []);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setToast(msg); setTimeout(() => setToast(''), 2000);
  }, []);

  // ── Select lesson ─────────────────────────────────────────────────────────
  const selectLesson = useCallback((idx) => {
    const l = LESSONS[idx];
    const newCode = l.type === 'picker' ? l.options[0].code : l.code;
    setActiveIdx(idx); setPickerIdx(0);
    setError(''); setErrorLine(null); setConsoleLogs([]);
    savePosition(idx);
    clearTimeout(debounceRef.current);
    skipDebounceRef.current = true;
    applyCodeChange(newCode);
    sendCode(newCode);
  }, [sendCode, applyCodeChange]);

  // ── Select picker option ──────────────────────────────────────────────────
  const selectOption = useCallback((idx) => {
    const newCode = lesson.options[idx].code;
    setPickerIdx(idx);
    setError(''); setErrorLine(null); setConsoleLogs([]);
    clearTimeout(debounceRef.current);
    skipDebounceRef.current = true;
    applyCodeChange(newCode);
    sendCode(newCode);
  }, [lesson, sendCode, applyCodeChange]);

  // ── Mark done ─────────────────────────────────────────────────────────────
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

  // ── Tab key + Ctrl+Enter ──────────────────────────────────────────────────
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
      sendCode(codeRef.current);
      showToast('↺ Running');
    }
  }, [code, sendCode, showToast]);

  // ── Scroll sync (textarea → line nums + highlight) ────────────────────────
  const syncScroll = useCallback((e) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = e.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  }, []);

  // ── Copy / reset / download / share ──────────────────────────────────────
  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); showToast('Copied!'); }
    catch { showToast('Copy failed'); }
  }, [code, showToast]);

  const resetCode = useCallback(() => {
    const src = lesson.type === 'picker' ? lesson.options[pickerIdx].code : lesson.code;
    setError(''); setErrorLine(null);
    clearTimeout(debounceRef.current);
    skipDebounceRef.current = true;
    applyCodeChange(src);
    sendCode(src);
    showToast('Code reset');
  }, [lesson, pickerIdx, sendCode, applyCodeChange, showToast]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${lesson.id}.jsx`; a.click();
    URL.revokeObjectURL(url); showToast('Downloaded');
  }, [code, lesson.id, showToast]);

  const shareCode = useCallback(() => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      const url = `${window.location.origin}/react-playground/?c=${encoded}`;
      navigator.clipboard.writeText(url); showToast('Share link copied!');
    } catch { showToast('Copy failed'); }
  }, [code, showToast]);

  // ── Drag handle ───────────────────────────────────────────────────────────
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

  // ── Derived ───────────────────────────────────────────────────────────────
  const lineCount  = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightJSX(code), [code]);
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
      <PlaygroundTopNav active="react-playground" />
      {/* ── Header ── */}
      <div className={s.body}>
        {/* ── Sidebar ── */}
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <PlaygroundSidebarTitle slug="react-playground" name="React Playground" />
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
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

          <div ref={lessonListRef} className={s.lessonList}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div style={{ padding: '12px', fontSize: 12, color: 'var(--text3)' }}>No lessons found</div>
                : filteredLessons.map(l => {
                    const idx = LESSONS.indexOf(l);
                    return (
                      <button key={l.id}
                        data-active={idx === activeIdx ? 'true' : undefined}
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
                        data-active={idx === activeIdx ? 'true' : undefined}
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

        {/* Reopen tab */}
        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            Lessons
          </button>
        )}

        {/* ── Main ── */}
        <div className={s.main}>
          <PlaygroundTopAd />
          {/* Concept panel */}
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(o => !o)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
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

          {/* Picker options */}
          {lesson.type === 'picker' && (
            <>
              <div className={s.pickerBar}>
                <span className={s.pickerLabel}>Variant</span>
                {lesson.options.map((opt, i) => (
                  <button key={i}
                    className={`${s.pickerBtn} ${i === pickerIdx ? s.pickerBtnActive : ''}`}
                    onClick={() => selectOption(i)}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {lesson.options[pickerIdx]?.note && (
                <div className={s.pickerNote}>💡 {lesson.options[pickerIdx].note}</div>
              )}
            </>
          )}

          {/* Editor + Preview */}
          <div ref={workAreaRef} className={s.workArea}>
            {/* Code editor */}
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Editor</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={resetCode} title="Reset code (Ctrl+Z)">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                    </svg>
                    Reset
                  </button>
                  <button className={s.iconBtn} onClick={copyCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy
                  </button>
                  <button className={s.iconBtn} onClick={downloadCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    .jsx
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
                  <button className={s.iconBtn}
                    onClick={() => {
                      iframeRef.current?.contentWindow?.postMessage({ type: 'reset' }, '*');
                      setTimeout(() => sendCode(codeRef.current), 50);
                    }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                    </svg>
                    Refresh
                  </button>
                </div>
              </div>
              <iframe
                ref={iframeRef}
                className={s.previewFrame}
                srcDoc={IFRAME_SRCDOC}
                sandbox="allow-scripts"
                title="React preview"
                onLoad={handleIframeLoad}
              />
              {/* Console panel — collapsed by default, click header to expand */}
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
                            <span className={s.consoleIcon}>
                              {entry.level === 'warn' ? '⚠' : entry.level === 'error' ? '✕' : '›'}
                            </span>
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
                <polyline points="15 18 9 12 15 6"/>
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
                  <polyline points="9 18 15 12 9 6"/>
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
