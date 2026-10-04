'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import PlaygroundSidebarTitle from '@/components/PlaygroundSidebarTitle';
const LS_PROGRESS = 'fwd-gsap-playground-progress';
const LS_POSITION = 'fwd-gsap-playground-position';
const GSAP_PLUGIN_FILES = [
  'ScrollTrigger.min.js',
  'CustomEase.min.js',
  'ScrollToPlugin.min.js',
  'MotionPathPlugin.min.js',
  'Flip.min.js',
  'CSSRulePlugin.min.js',
  'CustomBounce.min.js',
  'CustomWiggle.min.js',
  'Draggable.min.js',
  'DrawSVGPlugin.min.js',
  'EaselPlugin.min.js',
  'EasePack.min.js',
  'GSDevTools.min.js',
  'InertiaPlugin.min.js',
  'MorphSVGPlugin.min.js',
  'MotionPathHelper.min.js',
  'Observer.min.js',
  'Physics2DPlugin.min.js',
  'PhysicsPropsPlugin.min.js',
  'PixiPlugin.min.js',
  'ScrambleTextPlugin.min.js',
  'ScrollSmoother.min.js',
  'SplitText.min.js',
  'TextPlugin.min.js',
];
const GSAP_PLUGIN_GLOBALS = [
  'ScrollTrigger',
  'CustomEase',
  'ScrollToPlugin',
  'MotionPathPlugin',
  'Flip',
  'CSSRulePlugin',
  'CustomBounce',
  'CustomWiggle',
  'Draggable',
  'DrawSVGPlugin',
  'EaselPlugin',
  'RoughEase',
  'ExpoScaleEase',
  'SlowMo',
  'GSDevTools',
  'InertiaPlugin',
  'MorphSVGPlugin',
  'MotionPathHelper',
  'Observer',
  'Physics2DPlugin',
  'PhysicsPropsPlugin',
  'PixiPlugin',
  'ScrambleTextPlugin',
  'ScrollSmoother',
  'SplitText',
  'TextPlugin',
];

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

// ── Syntax highlighter ──────────────────────────────────────────────────────
const GSAP_GLOBALS = new Set([
  'gsap',
  ...GSAP_PLUGIN_GLOBALS,
]);
const JS_KW = new Set([
  'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
  'default', 'delete', 'do', 'else', 'export', 'extends', 'false', 'finally',
  'for', 'from', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new',
  'null', 'of', 'return', 'switch', 'this', 'throw', 'true', 'try', 'typeof',
  'undefined', 'var', 'while', 'yield',
]);
const JS_BUILTINS = new Set([
  'Array', 'Boolean', 'Date', 'Error', 'JSON', 'Math', 'Number', 'Object',
  'Promise', 'Set', 'String', 'console', 'document', 'window',
  'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
  'app', 'controls',
]);

const esc = v => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlightJS(code) {
  let out = '';
  let i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (/\s/.test(c)) { out += c; i++; continue; }
    if (c === '/' && code[i + 1] === '/') {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      out += `<span class="rjx-cm">${esc(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    if (c === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const j = end < 0 ? n : end + 2;
      out += `<span class="rjx-cm">${esc(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    if (c === '"' || c === "'") {
      const q = c; let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === q) { j++; break; }
        if (code[j] === '\n') break;
        j++;
      }
      out += `<span class="rjx-str">${esc(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    if (c === '`') {
      let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === '`') { j++; break; }
        j++;
      }
      out += `<span class="rjx-str">${esc(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < n && /[0-9a-fA-F.xXeEoObB_]/.test(code[j])) j++;
      out += `<span class="rjx-num">${esc(code.slice(i, j))}</span>`;
      i = j; continue;
    }
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i;
      while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (GSAP_GLOBALS.has(word)) out += `<span class="rjx-comp">${word}</span>`;
      else if (JS_KW.has(word)) out += `<span class="rjx-kw">${word}</span>`;
      else if (JS_BUILTINS.has(word)) out += `<span class="rjx-hook">${word}</span>`;
      else out += esc(word);
      i = j; continue;
    }
    if ('{}[]()'.includes(c)) out += `<span class="rjx-brace">${esc(c)}</span>`;
    else out += `<span class="rjx-punct">${esc(c)}</span>`;
    i++;
  }
  return out;
}

// ── Confetti ────────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#88ce02', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const size = 5 + Math.random() * 6;
    const dur = 1.3 + Math.random() * 1.4;
    const delay = Math.random() * 0.35;
    el.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}vw;top:-12px;pointer-events:none;z-index:99999;animation:confettiFall ${dur}s ${delay}s ease-in forwards`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000 + 100);
  }
}

// ── Iframe srcdoc ───────────────────────────────────────────────────────────
function buildSrcdoc(gsapJs, pluginScripts = '') {
return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.5;color:#111827;background:#fff;overflow-x:hidden;transition:background .2s,color .2s}
button,input,select{font:inherit;cursor:pointer}

/* demo elements */
.demo{padding:18px 18px 0}
.box{width:52px;height:52px;background:#6366f1;border-radius:8px;display:inline-block;flex-shrink:0}
.box-row{display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
.heading{font-size:22px;font-weight:700;color:inherit;margin-bottom:6px}
.subtitle{font-size:13px;color:#6b7280;margin-bottom:12px}
.btn{padding:8px 18px;background:#6366f1;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600}
.btn:hover{background:#4f46e5}
.card{padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:8px;font-size:13px;font-weight:500;color:inherit}
#hero{margin-bottom:14px}
#cards{margin-bottom:14px}
#app{margin-top:10px;min-height:4px}
#controls{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
#controls button{padding:5px 14px;border:1px solid #e5e7eb;border-radius:6px;background:#f9fafb;font-size:12px;font-weight:600}
#controls button:hover{background:#e5e7eb}
#controls .btn{padding:8px 18px;background:#6366f1;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600}
#controls .btn:hover{background:#4f46e5}

/* scroll section */
.scroll-hint{text-align:center;padding:16px 14px;font-size:12px;color:#9ca3af;border-top:1px dashed #e5e7eb;margin-top:10px;letter-spacing:.02em}
.scroll-spacer{height:700px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#d1d5db;letter-spacing:.04em}
.scroll-zone{padding:40px 20px 800px;display:flex;flex-direction:column;align-items:flex-start}
.scroll-label{font-size:11px;color:#9ca3af;margin-bottom:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
#scroll-box{width:64px;height:64px;background:#6366f1;border-radius:10px;display:block}
#scroll-return{margin-top:18px}
#scroll-return .btn{background:#6b7280}
#scroll-return .btn:hover{background:#4b5563}

/* error */
#err{display:none;position:fixed;bottom:0;left:0;right:0;background:#fef2f2;border-top:2px solid #fca5a5;color:#dc2626;font-family:monospace;font-size:11px;padding:8px 12px;white-space:pre-wrap;word-break:break-all;max-height:80px;overflow:auto;z-index:99}

/* dark */
body.dark .card{background:#16181d;border-color:#252830;color:#e8eaf0}
body.dark .heading{color:#e8eaf0}
body.dark .subtitle{color:#8b90a0}
body.dark #controls button{background:#1d2028;border-color:#252830;color:#e8eaf0}
body.dark #controls button:hover{background:#252830}
</style>
</head>
<body>
<div class="demo">
  <div class="box-row" id="row">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
  <div id="hero">
    <h1 class="heading">GSAP Animation</h1>
    <p class="subtitle">Smooth, powerful, and flexible.</p>
    <button class="btn">Get Started</button>
  </div>
  <div id="cards">
    <div class="card">Card One</div>
    <div class="card">Card Two</div>
    <div class="card">Card Three</div>
  </div>
  <div id="controls"></div>
  <div id="app"></div>
</div>
<div class="scroll-hint">↓ Scroll down in this panel to trigger the animation</div>
<div class="scroll-spacer">↓ keep scrolling ↓</div>
<div class="scroll-zone">
  <div class="scroll-label">ScrollTrigger target ↓</div>
  <div id="scroll-box"></div>
  <div id="scroll-return"></div>
</div>
<div id="err"></div>
<script>${gsapJs}</script>
${pluginScripts}
<script>
var errEl = document.getElementById('err');
(function(){var _l=console.log,_w=console.warn,_e=console.error;function fwd(lvl,args){try{parent.postMessage({type:'gsap-log',level:lvl,message:Array.from(args).map(function(v){return typeof v==='object'?JSON.stringify(v):String(v);}).join(' ')},'*');}catch(e){}}console.log=function(){_l.apply(console,arguments);fwd('log',arguments);};console.warn=function(){_w.apply(console,arguments);fwd('warn',arguments);};console.error=function(){_e.apply(console,arguments);fwd('error',arguments);};})();
var lastCode = '';
var lastScene = 'boxes';
var gsapReady = false;
var pluginNames = ${JSON.stringify(GSAP_PLUGIN_GLOBALS)};

function applyScene(scene) {
  var show = { row: false, hero: false, cards: false, scroll: false };
  if (scene === 'hero')   show.hero   = true;
  else if (scene === 'cards')  show.cards  = true;
  else if (scene === 'scroll') show.scroll = true;
  else if (scene !== 'app')    show.row    = true; // default: boxes
  var d = function(id, vis) {
    var el = document.getElementById(id);
    if (el) el.style.display = vis ? '' : 'none';
  };
  var q = function(sel, vis) {
    document.querySelectorAll(sel).forEach(function(el){ el.style.display = vis ? '' : 'none'; });
  };
  d('row',    show.row);
  d('hero',   show.hero);
  d('cards',  show.cards);
  q('.scroll-hint, .scroll-spacer, .scroll-zone', show.scroll);
}

function waitGsap(cb) {
  if (typeof gsap !== 'undefined') {
    if (!gsapReady) {
      pluginNames.forEach(function(name) {
        var plugin = window[name];
        if (plugin) {
          try { gsap.registerPlugin(plugin); } catch (e) {}
        }
      });
      gsapReady = true;
    }
    cb();
  } else {
    setTimeout(function(){ waitGsap(cb); }, 80);
  }
}

function resetScene() {
  if (typeof gsap === 'undefined') return;
  gsap.globalTimeline.timeScale(1);
  gsap.globalTimeline.clear();
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(function(t){ t.kill(); });
  }
  if (typeof Draggable !== 'undefined' && Draggable.getAll) {
    Draggable.getAll().forEach(function(d){ d.kill(); });
  }
  if (typeof Observer !== 'undefined' && Observer.getAll) {
    Observer.getAll().forEach(function(o){ o.kill(); });
  }
  var targets = document.querySelectorAll('.box, .heading, .subtitle, .btn, .card, #hero, #scroll-box, #row');
  targets.forEach(function(el){
    gsap.set(el, { clearProps: 'all' });
    // Belt-and-braces: also clear inline styles GSAP may not track
    el.style.transform = '';
    el.style.opacity = '';
    el.style.backgroundColor = '';
    el.style.borderRadius = '';
    el.style.boxShadow = '';
    el.style.visibility = '';
  });
  document.getElementById('controls').innerHTML = '';
  document.getElementById('app').innerHTML = '';
  document.getElementById('scroll-return').innerHTML = '';
  errEl.style.display = 'none';
  errEl.textContent = '';
}

function showErr(msg) {
  errEl.textContent = msg;
  errEl.style.display = 'block';
  window.parent.postMessage({ type: 'error', message: msg }, '*');
}

window._ucErr = function(e) { showErr(String(e)); };

window.addEventListener('error', function(e) {
  if (e.filename && e.filename.indexOf('user-code') !== -1) showErr(e.message);
});

function runCode(code, scene) {
  resetScene();
  lastCode = code;
  lastScene = scene || 'boxes';
  applyScene(lastScene);
  // remove previous injected script
  var old = document.getElementById('_uc');
  if (old) old.remove();
  // double rAF: lets browser repaint the reset before new tweens start
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      var script = document.createElement('script');
      script.id = '_uc';
      script.setAttribute('data-src', 'user-code');
      // wrap in IIFE so app/controls locals are available; errors surface via _ucErr
      script.textContent =
        '(function(){' +
        'var app=document.getElementById("app");' +
        'var controls=document.getElementById("controls");' +
        'try{' +
        code +
        '}catch(e){window._ucErr(e);}' +
        '})();';
      document.body.appendChild(script);
    });
  });
}

window.addEventListener('message', function(e) {
  if (!e.data) return;
  if (e.data.type === 'run') {
    var code = e.data.code, scene = e.data.scene || 'boxes';
    if (!gsapReady) {
      waitGsap(function(){ runCode(code, scene); });
    } else {
      runCode(code, scene);
    }
  }
  if (e.data.type === 'replay') runCode(lastCode, lastScene);
  if (e.data.type === 'theme') {
    document.body.classList.toggle('dark', !!e.data.dark);
    document.body.style.background = e.data.dark ? '#0e0f11' : '#ffffff';
    document.body.style.color = e.data.dark ? '#e8eaf0' : '#111827';
  }
  if (e.data.type === 'reset') resetScene();
  if (e.data.type === 'speed') gsap.globalTimeline.timeScale(e.data.scale || 1);
  if (e.data.type === 'markers') {
    // re-run current code with markers toggled via ScrollTrigger.defaults
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.defaults({ markers: e.data.on ? { startColor:'#10b981', endColor:'#ef4444', fontSize:'10px', fontWeight:'700' } : false });
    }
    runCode(lastCode, lastScene);
  }
});

function signalReady() { window.parent.postMessage({ type: 'ready' }, '*'); }
function requestCode() { window.parent.postMessage({ type: 'requestCode' }, '*'); }

// GSAP is inline — ready immediately.
waitGsap(function(){
  signalReady();
});
<\/script>
</body>
</html>`;
} // end buildSrcdoc

// ── Sub-components ──────────────────────────────────────────────────────────
function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}><span>Quick Check</span></div>
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
    </div>
  );
}

function ConceptText({ text }) {
  return (
    <>
      {text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((chunk, i) => {
        if (chunk.startsWith('`') && chunk.endsWith('`')) return <code key={i}>{chunk.slice(1, -1)}</code>;
        if (chunk.startsWith('**') && chunk.endsWith('**')) return <strong key={i}>{chunk.slice(2, -2)}</strong>;
        return chunk;
      })}
    </>
  );
}

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

// ── Main component ──────────────────────────────────────────────────────────
export default function GsapPlaygroundTool() {
  const [srcdoc, setSrcdoc] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [code, setCode] = useState(LESSONS[0].code);
  const [pickerIdx, setPickerIdx] = useState(0);
  const [iframeReady, setIframeReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');
  const [errorLine, setErrorLine] = useState(null);
  const [progress, setProgress] = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [markersOn, setMarkersOn] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState('');
  const [editorPct, setEditorPct] = useState(50);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);
  const [search, setSearch] = useState('');

  const iframeRef = useRef(null);
  const lineNumsRef = useRef(null);
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const debounceRef = useRef(null);
  const workAreaRef = useRef(null);
  const codeRef = useRef(code);
  const sceneRef = useRef(LESSONS[0].scene || 'boxes');
  const isDragging = useRef(false);
  const initialSentRef = useRef(false); // prevents double-send on iframe load

  const lesson = LESSONS[activeIdx];

  useEffect(() => { codeRef.current = code; }, [code]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  const sendCode = useCallback((nextCode, nextScene) => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'run',
      code: nextCode ?? codeRef.current,
      scene: nextScene ?? sceneRef.current,
    }, '*');
  }, []);

  const replayAnimation = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'replay' }, '*');
    showToast('Replaying');
  }, [showToast]);

  const toggleMarkers = useCallback(() => {
    setMarkersOn(prev => {
      const next = !prev;
      iframeRef.current?.contentWindow?.postMessage({ type: 'markers', on: next }, '*');
      return next;
    });
  }, []);

  const setSpeedScale = useCallback((scale) => {
    setSpeed(scale);
    iframeRef.current?.contentWindow?.postMessage({ type: 'speed', scale }, '*');
  }, []);

  const applyCodeChange = useCallback((val) => {
    codeRef.current = val;
    setCode(val);
  }, []);

  useEffect(() => {
    // Fetch GSAP files from /public/js/ and inline them in the srcdoc
    // (inline avoids cross-origin issues in null-origin sandboxed iframes)
    Promise.all([
      fetch('/js/gsap.min.js').then(r => r.text()),
      Promise.all(GSAP_PLUGIN_FILES.map(file =>
        fetch(`/js/${file}`)
          .then(r => (r.ok ? r.text() : ''))
          .catch(() => '')
          .then(js => (js ? `<script>${js}</script>` : ''))
      )),
    ]).then(([gsapJs, pluginScriptParts]) => {
      setSrcdoc(buildSrcdoc(gsapJs, pluginScriptParts.join('\n')));
    }).catch(() => {
      // fallback: build with empty strings so iframe at least loads
      setSrcdoc(buildSrcdoc(''));
    });

    setProgress(readProgress());
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      const sl = LESSONS[saved];
      const ic = sl.type === 'picker' ? sl.options[0].code : sl.code;
      setActiveIdx(saved);
      setPickerIdx(0);
      setCode(ic);
      codeRef.current = ic;
      sceneRef.current = sl.scene || 'boxes';
    }
    setHydrated(true);
  }, []);

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

  useEffect(() => {
    const handler = e => {
      if (!e.data) return;
      if (e.data.type === 'ready') {
        setIframeReady(true);
        if (!initialSentRef.current) {
          initialSentRef.current = true;
          sendCode(codeRef.current);
        }
      }
      if (e.data.type === 'requestCode') {
        if (!initialSentRef.current) {
          initialSentRef.current = true;
          sendCode(codeRef.current);
        }
      }
      if (e.data.type === 'error') {
        setError(e.data.message);
        setErrorLine(null);
      }
      if (e.data.type === 'clearError') { setError(''); setErrorLine(null); }
      if (e.data.type === 'gsap-log') setConsoleLogs(prev => [...prev, { id: Date.now() + Math.random(), level: e.data.level, message: e.data.message }].slice(-30));
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [sendCode]);

  // Initial send is handled by the 'ready' / 'requestCode' message handler above

  // NOTE: no debounce useEffect here — debounce is applied in handleEditorChange
  // so that lesson switches (which call sendCode directly) don't get re-triggered

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
    initialSentRef.current = false; // reset guard so next 'ready' sends code
    setTimeout(() => setIframeReady(true), 150);
  }, []);

  const checkChapterComplete = useCallback((prog, id) => {
    const l = LESSONS.find(x => x.id === id);
    if (!l) return;
    if (LESSONS.filter(x => x.chapter === l.chapter).every(x => prog.has(x.id))) launchConfetti();
  }, []);

  const selectLesson = useCallback((idx) => {
    const nl = LESSONS[idx];
    const nc = nl.type === 'picker' ? nl.options[0].code : nl.code;
    const ns = nl.scene || 'boxes';
    sceneRef.current = ns;
    setActiveIdx(idx);
    setPickerIdx(0);
    setError('');
    setErrorLine(null);
    setMarkersOn(false);
    setSpeed(1);
    savePosition(idx);
    clearTimeout(debounceRef.current);
    applyCodeChange(nc);
    sendCode(nc, ns);
  }, [applyCodeChange, sendCode]);

  const selectOption = useCallback((idx) => {
    const nc = lesson.options[idx].code;
    setPickerIdx(idx);
    setError('');
    clearTimeout(debounceRef.current);
    applyCodeChange(nc);
    sendCode(nc, sceneRef.current);
  }, [applyCodeChange, lesson, sendCode]);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(x => x.id === lesson.id);
        LESSONS.slice(idx).forEach(x => next.delete(x.id));
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

  const handleEditorChange = useCallback((e) => {
    const val = e.target.value;
    codeRef.current = val;
    setCode(val);
    if (iframeReady) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => sendCode(val), 600);
    }
  }, [iframeReady, sendCode]);

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
      showToast('Running');
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
    const src = lesson.type === 'picker' ? lesson.options[pickerIdx].code : lesson.code;
    setError('');
    clearTimeout(debounceRef.current);
    applyCodeChange(src);
    sendCode(src);
    showToast('Code reset');
  }, [applyCodeChange, lesson, pickerIdx, sendCode, showToast]);

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

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightJS(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return LESSONS.filter(l => l.title.toLowerCase().includes(q) || l.chapter.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="gsap-playground" />
      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <PlaygroundSidebarTitle slug="gsap-playground" name="GSAP Playground" />
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lessons…" />
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
                      <button key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => { selectLesson(idx); setSearch(''); }}>
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map(chapter => (
                <div key={chapter}>
                  <div className={s.chapterLabel}>{chapter}</div>
                  {LESSONS.filter(l => l.chapter === chapter).map(item => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => selectLesson(idx)}>
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
              <div className={s.conceptBody}><ConceptText text={lesson.concept} /></div>
            )}
          </div>

          {lesson.type === 'picker' && (
            <>
              <div className={s.pickerBar}>
                <span className={s.pickerLabel}>Variant</span>
                {lesson.options.map((opt, i) => (
                  <button key={opt.label}
                    className={`${s.pickerBtn} ${i === pickerIdx ? s.pickerBtnActive : ''}`}
                    onClick={() => selectOption(i)}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {lesson.options[pickerIdx]?.note && (
                <div className={s.pickerNote}>{lesson.options[pickerIdx].note}</div>
              )}
            </>
          )}

          <div ref={workAreaRef} className={s.workArea}>
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
                  <button className={s.iconBtn} onClick={copyCode} title="Copy code">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
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
                    onChange={handleEditorChange}
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

            <div className={`${s.dragHandle} ${isDraggingHandle ? s.dragHandleActive : ''}`}
              onMouseDown={startDrag} title="Drag to resize" />

            <div className={s.previewPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Preview</span>
                <div className={s.paneActions}>
                  {/* Speed control */}
                  <div className={s.speedGroup}>
                    {[0.25, 1, 2].map(sc => (
                      <button key={sc}
                        className={`${s.speedBtn} ${speed === sc ? s.speedBtnActive : ''}`}
                        onClick={() => setSpeedScale(sc)}
                        title={`${sc}x speed`}>
                        {sc === 0.25 ? '¼×' : sc === 1 ? '1×' : '2×'}
                      </button>
                    ))}
                  </div>
                  {/* Markers — only useful for ScrollTrigger lessons */}
                  {lesson.scene === 'scroll' && (
                    <button
                      className={`${s.iconBtn} ${markersOn ? s.markersActive : ''}`}
                      onClick={toggleMarkers}
                      title="Toggle ScrollTrigger markers">
                      Markers
                    </button>
                  )}
                  <button className={s.replayBtn} onClick={replayAnimation} title="Replay animation">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                    Replay
                  </button>
                </div>
              </div>
              {srcdoc && (
                <iframe
                  ref={iframeRef}
                  className={s.previewFrame}
                  srcDoc={srcdoc}
                  sandbox="allow-scripts"
                  title="GSAP preview"
                  onLoad={handleIframeLoad}
                />
              )}
              <div className={s.consolePanel}>
                <div className={s.consoleHeader} onClick={() => setShowConsole(v => !v)} style={{ cursor: 'pointer' }}>
                  <div className={s.consoleTitle}><span className={s.consoleDot} />Console{consoleLogs.length > 0 && <span style={{ marginLeft: 5, background: 'var(--accent)', color: '#fff', borderRadius: 999, fontSize: 10, padding: '1px 6px', fontWeight: 700 }}>{consoleLogs.length}</span>}</div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: showConsole ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                {showConsole && (
                  <div className={s.consoleLogs}>
                    {consoleLogs.length === 0
                      ? <div className={s.consoleEmpty}>No output — use console.log() in your code</div>
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

          {lesson.challenge && (
            <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />
          )}

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
                {isDone ? '✓ Done' : 'Mark Done'}
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
