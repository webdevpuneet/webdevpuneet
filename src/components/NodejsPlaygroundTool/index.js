'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { RUN_LESSONS, CHAPTER_ORDER, VISUALIZER_CHAPTER } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const STORAGE_KEY = 'fwd-nodejs-playground-position';
const PROGRESS_KEY = 'fwd-nodejs-playground-progress';

const LANES = [
  { key: 'stack', label: 'Call Stack', hint: 'Code running right now' },
  { key: 'nextTick', label: 'nextTick', hint: 'Node-only microtask queue' },
  { key: 'microtasks', label: 'Promise Jobs', hint: 'Promise callbacks and async resumes' },
  { key: 'timers', label: 'Timers', hint: 'setTimeout and setInterval callbacks' },
  { key: 'io', label: 'Poll / I/O', hint: 'File system and network callbacks' },
  { key: 'check', label: 'Check', hint: 'setImmediate callbacks' },
];

const EMPTY_QUEUES = {
  stack: [],
  nextTick: [],
  microtasks: [],
  timers: [],
  io: [],
  check: [],
};

const VIS_LESSONS = [
  {
    id: 'event-loop',
    chapter: 'Event Loop',
    title: 'Why output order feels strange',
    sub: 'Stack, nextTick, promises, timers, and I/O',
    concept:
      'Node.js runs your synchronous code first. When the call stack is empty, Node drains process.nextTick callbacks, then Promise microtasks, then moves through event loop phases such as timers and poll for I/O callbacks.',
    code: `const fs = require('node:fs');

console.log('start');

setTimeout(() => console.log('timer'), 0);

fs.readFile('notes.txt', 'utf8', () => {
  console.log('file');
});

Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

console.log('end');`,
    mock: [
      ['notes.txt', 'Ship it after review'],
      ['Runtime', 'Browser simulator, no server execution'],
    ],
    steps: [
      {
        phase: 'stack',
        lines: [3],
        title: 'Run the top-level script',
        detail: 'The file starts on the call stack. Synchronous console output happens immediately.',
        queues: { stack: ['global()'] },
        log: 'start',
      },
      {
        phase: 'timers',
        lines: [5],
        title: 'Register a timer',
        detail: 'setTimeout does not run its callback now. Node stores it for the timers phase.',
        queues: { stack: ['global()'], timers: ['timer callback'] },
      },
      {
        phase: 'io',
        lines: [7, 8, 9],
        title: 'Start file I/O',
        detail: 'fs.readFile starts work outside the main stack. Its callback waits for the poll phase.',
        queues: { stack: ['global()'], timers: ['timer callback'], io: ['fs.readFile callback'] },
      },
      {
        phase: 'microtasks',
        lines: [11],
        title: 'Queue a promise job',
        detail: 'Promise callbacks are microtasks. They run before timers after the stack clears.',
        queues: { stack: ['global()'], microtasks: ['promise then'], timers: ['timer callback'], io: ['fs.readFile callback'] },
      },
      {
        phase: 'nextTick',
        lines: [12],
        title: 'Queue nextTick',
        detail: 'process.nextTick is Node-specific and runs before normal Promise microtasks.',
        queues: { stack: ['global()'], nextTick: ['nextTick callback'], microtasks: ['promise then'], timers: ['timer callback'], io: ['fs.readFile callback'] },
      },
      {
        phase: 'stack',
        lines: [14],
        title: 'Finish synchronous work',
        detail: 'The last console.log still runs before any queued async callback.',
        queues: { stack: ['global()'], nextTick: ['nextTick callback'], microtasks: ['promise then'], timers: ['timer callback'], io: ['fs.readFile callback'] },
        log: 'end',
      },
      {
        phase: 'nextTick',
        lines: [12],
        title: 'Drain nextTick',
        detail: 'The stack is empty, so Node drains the nextTick queue first.',
        queues: { nextTick: ['nextTick callback'], microtasks: ['promise then'], timers: ['timer callback'], io: ['fs.readFile callback'] },
        log: 'nextTick',
      },
      {
        phase: 'microtasks',
        lines: [11],
        title: 'Drain Promise jobs',
        detail: 'Promise callbacks run before timers and file callbacks.',
        queues: { microtasks: ['promise then'], timers: ['timer callback'], io: ['fs.readFile callback'] },
        log: 'promise',
      },
      {
        phase: 'timers',
        lines: [5],
        title: 'Enter timers phase',
        detail: 'The 0ms timer is ready, so Node runs its callback.',
        queues: { timers: ['timer callback'], io: ['fs.readFile callback'] },
        log: 'timer',
      },
      {
        phase: 'io',
        lines: [7, 8, 9],
        title: 'Run the I/O callback',
        detail: 'When the file read completes, the callback runs in the poll phase.',
        queues: { io: ['fs.readFile callback'] },
        log: 'file',
      },
    ],
    takeaways: [
      'Synchronous code always finishes before queued async callbacks.',
      'process.nextTick runs before Promise callbacks in Node.js.',
      'Timers and I/O callbacks wait for later event loop phases.',
    ],
  },
  {
    id: 'promises',
    chapter: 'Promises',
    title: 'Promise chains are microtasks',
    sub: 'Executor now, then callbacks later',
    concept:
      'The Promise constructor executor runs immediately, but .then and .catch handlers run as microtasks after the current stack is empty. Chained .then calls queue more microtasks as each handler resolves.',
    code: `console.log('before');

const job = new Promise((resolve) => {
  console.log('executor');
  resolve(42);
});

job
  .then((value) => {
    console.log('then 1:', value);
    return value + 1;
  })
  .then((value) => {
    console.log('then 2:', value);
  });

console.log('after');`,
    mock: [
      ['Resolved value', '42'],
      ['Second value', '43'],
    ],
    steps: [
      {
        phase: 'stack',
        lines: [1],
        title: 'Start synchronous code',
        detail: 'The first console statement runs immediately.',
        queues: { stack: ['global()'] },
        log: 'before',
      },
      {
        phase: 'stack',
        lines: [3, 4, 5],
        title: 'Run the Promise executor',
        detail: 'Creating a Promise is not delayed. Only its handlers are delayed.',
        queues: { stack: ['global()', 'Promise executor'] },
        log: 'executor',
      },
      {
        phase: 'microtasks',
        lines: [8, 9, 10, 11],
        title: 'Attach then handlers',
        detail: 'The first .then callback is queued because the promise is already resolved.',
        queues: { stack: ['global()'], microtasks: ['then 1'] },
      },
      {
        phase: 'stack',
        lines: [17],
        title: 'Finish the script',
        detail: 'The stack must clear before Promise jobs can run.',
        queues: { stack: ['global()'], microtasks: ['then 1'] },
        log: 'after',
      },
      {
        phase: 'microtasks',
        lines: [9, 10, 11],
        title: 'Run the first then',
        detail: 'The first handler receives 42 and returns 43, which queues the next handler.',
        queues: { microtasks: ['then 1'] },
        log: 'then 1: 42',
      },
      {
        phase: 'microtasks',
        lines: [13, 14, 15],
        title: 'Run the chained then',
        detail: 'The next microtask receives the returned value from the previous handler.',
        queues: { microtasks: ['then 2'] },
        log: 'then 2: 43',
      },
    ],
    takeaways: [
      'The Promise executor is synchronous.',
      '.then callbacks run after the current stack as microtasks.',
      'Each returned value feeds the next handler in the chain.',
    ],
  },
  {
    id: 'async-await',
    chapter: 'Async / Await',
    title: 'await pauses one function, not Node',
    sub: 'Async functions resume through Promise jobs',
    concept:
      'async/await is syntax over Promises. An async function begins synchronously until it reaches await. At await, that function yields and the caller keeps running. The function resumes later as a Promise microtask.',
    code: `function readProfile() {
  return Promise.resolve({ name: 'Ada' });
}

async function loadUser() {
  console.log('A: inside async function');
  const user = await readProfile();
  console.log('C: loaded', user.name);
}

console.log('start');
loadUser();
console.log('end');`,
    mock: [
      ['readProfile()', '{ name: "Ada" }'],
      ['Important idea', 'await yields control'],
    ],
    steps: [
      {
        phase: 'stack',
        lines: [11],
        title: 'Run the first log',
        detail: 'Top-level synchronous code begins on the stack.',
        queues: { stack: ['global()'] },
        log: 'start',
      },
      {
        phase: 'stack',
        lines: [12, 5, 6],
        title: 'Enter the async function',
        detail: 'Calling an async function starts it immediately, just like a normal function.',
        queues: { stack: ['global()', 'loadUser()'] },
        log: 'A: inside async function',
      },
      {
        phase: 'microtasks',
        lines: [7],
        title: 'Hit await',
        detail: 'readProfile returns a resolved Promise. The rest of loadUser is queued as a microtask.',
        queues: { stack: ['global()'], microtasks: ['resume loadUser'] },
      },
      {
        phase: 'stack',
        lines: [13],
        title: 'Caller keeps going',
        detail: 'await only paused loadUser. It did not block the top-level script.',
        queues: { stack: ['global()'], microtasks: ['resume loadUser'] },
        log: 'end',
      },
      {
        phase: 'microtasks',
        lines: [8],
        title: 'Resume after await',
        detail: 'When the stack is empty, Node resumes the async function with the resolved value.',
        queues: { microtasks: ['resume loadUser'] },
        log: 'C: loaded Ada',
      },
    ],
    takeaways: [
      'async functions start synchronously.',
      'await pauses only the current async function.',
      'Code after await resumes as a Promise microtask.',
    ],
  },
  {
    id: 'fs',
    chapter: 'File System',
    title: 'fs sync vs async APIs',
    sub: 'Blocking reads compared with callback reads',
    concept:
      'Node gives you synchronous and asynchronous file system APIs. Sync APIs are simple but block the event loop while work happens. Async APIs let Node keep the main thread free and run your callback when the file operation completes.',
    code: `const fs = require('node:fs');

console.log('start');

const config = fs.readFileSync('config.json', 'utf8');
console.log('sync done:', config.length);

fs.readFile('users.json', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('async done:', data.length);
});

console.log('end');`,
    mock: [
      ['config.json', '18 characters'],
      ['users.json', '64 characters'],
    ],
    steps: [
      {
        phase: 'stack',
        lines: [3],
        title: 'Start the script',
        detail: 'The first log runs immediately.',
        queues: { stack: ['global()'] },
        log: 'start',
      },
      {
        phase: 'stack',
        lines: [5],
        title: 'Blocking sync read',
        detail: 'readFileSync keeps the call stack busy until the file content is returned.',
        queues: { stack: ['global()', 'readFileSync(config.json)'] },
      },
      {
        phase: 'stack',
        lines: [6],
        title: 'Use sync result',
        detail: 'The config value is available immediately because the read already finished.',
        queues: { stack: ['global()'] },
        log: 'sync done: 18',
      },
      {
        phase: 'io',
        lines: [8, 9, 10, 11],
        title: 'Start async read',
        detail: 'readFile registers a callback and returns. The file work continues outside the stack.',
        queues: { stack: ['global()'], io: ['read users.json'] },
      },
      {
        phase: 'stack',
        lines: [13],
        title: 'Continue immediately',
        detail: 'The async read did not block the next console statement.',
        queues: { stack: ['global()'], io: ['read users.json'] },
        log: 'end',
      },
      {
        phase: 'io',
        lines: [8, 9, 10, 11],
        title: 'File callback runs',
        detail: 'When users.json is ready, Node invokes the callback in the poll phase.',
        queues: { io: ['read users.json callback'] },
        log: 'async done: 64',
      },
    ],
    takeaways: [
      'readFileSync blocks the event loop until it returns.',
      'readFile starts work and returns immediately.',
      'Async file callbacks run later in the I/O phase.',
    ],
  },
  {
    id: 'api',
    chapter: 'API Examples',
    title: 'Fetch data in modern Node',
    sub: 'Network I/O plus async/await',
    concept:
      'Modern Node.js includes fetch. The network request happens outside your call stack. await response waits for the HTTP response, then await response.json waits for the body parsing promise. Both resumes happen through Promise jobs.',
    code: `async function getRelease() {
  console.log('requesting');

  const response = await fetch('https://api.example.dev/releases/latest');
  const data = await response.json();

  console.log('latest:', data.version);
}

getRelease();
console.log('script done');`,
    mock: [
      ['GET /releases/latest', '200 OK'],
      ['Response body', '{ "version": "v22.0.0" }'],
    ],
    steps: [
      {
        phase: 'stack',
        lines: [10, 1, 2],
        title: 'Start the request function',
        detail: 'The async function begins synchronously and logs before the first await.',
        queues: { stack: ['global()', 'getRelease()'] },
        log: 'requesting',
      },
      {
        phase: 'io',
        lines: [4],
        title: 'Send the HTTP request',
        detail: 'fetch starts network I/O and getRelease yields at await.',
        queues: { stack: ['global()'], io: ['HTTP GET /releases/latest'] },
      },
      {
        phase: 'stack',
        lines: [11],
        title: 'Top-level script finishes',
        detail: 'The caller keeps running while the request is in flight.',
        queues: { stack: ['global()'], io: ['HTTP GET /releases/latest'] },
        log: 'script done',
      },
      {
        phase: 'microtasks',
        lines: [4],
        title: 'Response promise resolves',
        detail: 'When headers arrive, the fetch promise queues the async function resume.',
        queues: { microtasks: ['resume with Response'], io: ['response body stream'] },
      },
      {
        phase: 'microtasks',
        lines: [5],
        title: 'Parse JSON body',
        detail: 'response.json() returns another Promise, so there is one more async pause.',
        queues: { microtasks: ['parse JSON body'] },
      },
      {
        phase: 'microtasks',
        lines: [7],
        title: 'Use the parsed data',
        detail: 'The async function resumes with the parsed JSON object.',
        queues: { microtasks: ['resume with data'] },
        log: 'latest: v22.0.0',
      },
    ],
    takeaways: [
      'fetch starts network work outside the call stack.',
      'Each await splits the async function into another Promise job.',
      'This page simulates the output locally; no API request is sent.',
    ],
  },
];

function mergeQueues(queues = {}) {
  return { ...EMPTY_QUEUES, ...queues };
}

/* ── Compose the unified curriculum: real-execution lessons + the visualizer ── */
const NODE_VIS_LESSONS = VIS_LESSONS.map((l) => ({ ...l, kind: 'visualizer', chapter: VISUALIZER_CHAPTER }));
const NODE_RUN_LESSONS = RUN_LESSONS.map((l) => ({ ...l, kind: 'run' }));

const BY_CHAPTER = {};
[...NODE_RUN_LESSONS, ...NODE_VIS_LESSONS].forEach((l) => {
  (BY_CHAPTER[l.chapter] = BY_CHAPTER[l.chapter] || []).push(l);
});
const ALL_LESSONS = CHAPTER_ORDER.flatMap((ch) => BY_CHAPTER[ch] || []);
const CHAPTERS = CHAPTER_ORDER.filter((ch) => BY_CHAPTER[ch]);

function readStoredPosition() {
  try {
    const idx = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    return idx > 0 && idx < ALL_LESSONS.length ? idx : 0;
  } catch {
    return 0;
  }
}

function writeStoredPosition(idx) {
  try { localStorage.setItem(STORAGE_KEY, String(idx)); } catch {}
}

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]')); }
  catch { return new Set(); }
}

function writeProgress(set) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...set])); } catch {}
}

/* ── Real-JS runtime: runs lesson code in a sandboxed iframe with faithful
   Node shims. console output and errors are posted back to the parent. ── */
function buildNodeSrcDoc(code) {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(function () {
  function send(type, payload) { parent.postMessage(Object.assign({ source: 'nodejs-run' }, { type: type }, payload), '*'); }

  ['log', 'info', 'warn', 'error'].forEach(function (level) {
    console[level] = function () {
      var args = Array.prototype.slice.call(arguments).map(function (a) {
        if (typeof a === 'string') return a;
        try { return JSON.stringify(a); } catch (_) { return String(a); }
      });
      send('console', { level: level === 'info' ? 'log' : level, text: args.join(' ') });
    };
  });

  window.addEventListener('error', function (e) {
    send('console', { level: 'error', text: (e.error && e.error.name ? e.error.name + ': ' : 'Error: ') + (e.message || (e.error && e.error.message) || 'Script error') });
  });
  window.addEventListener('unhandledrejection', function (e) {
    send('console', { level: 'error', text: 'UnhandledRejection: ' + ((e.reason && e.reason.message) || e.reason) });
  });

  // ── Faithful pure-JS Node shims ──
  class EventEmitter {
    constructor() { this._e = {}; }
    on(n, fn) { (this._e[n] = this._e[n] || []).push(fn); return this; }
    addListener(n, fn) { return this.on(n, fn); }
    once(n, fn) { var w = function () { this.off(n, w); fn.apply(null, arguments); }.bind(this); w._o = fn; return this.on(n, w); }
    off(n, fn) { if (this._e[n]) this._e[n] = this._e[n].filter(function (f) { return f !== fn && f._o !== fn; }); return this; }
    removeListener(n, fn) { return this.off(n, fn); }
    emit(n) { var a = Array.prototype.slice.call(arguments, 1); var ls = (this._e[n] || []).slice(); ls.forEach(function (f) { f.apply(null, a); }); return ls.length > 0; }
    listenerCount(n) { return (this._e[n] || []).length; }
  }

  function normalize(str) {
    var abs = str.charAt(0) === '/';
    var out = [];
    str.split('/').forEach(function (p) {
      if (p === '' || p === '.') return;
      if (p === '..') out.pop();
      else out.push(p);
    });
    return (abs ? '/' : '') + out.join('/');
  }
  var path = {
    sep: '/',
    join: function () { return normalize(Array.prototype.join.call(arguments, '/')) || '.'; },
    basename: function (p, ext) { var b = p.split('/').pop() || ''; if (ext && b.slice(-ext.length) === ext) b = b.slice(0, -ext.length); return b; },
    dirname: function (p) { var a = p.split('/'); a.pop(); return a.join('/') || (p.charAt(0) === '/' ? '/' : '.'); },
    extname: function (p) { var b = p.split('/').pop() || ''; var i = b.lastIndexOf('.'); return i > 0 ? b.slice(i) : ''; },
    resolve: function () { var r = Array.prototype.join.call(arguments, '/'); if (r.charAt(0) !== '/') r = '/app/' + r; return normalize(r); }
  };

  var _files = { '/app/notes.txt': 'Ship it after review\\n', '/app/data.json': '{"users":3}' };
  function enoent(p) { var e = new Error("ENOENT: no such file or directory, open '" + p + "'"); e.code = 'ENOENT'; return e; }
  var fs = {
    readFileSync: function (p) { if (!(p in _files)) throw enoent(p); return _files[p]; },
    writeFileSync: function (p, data) { _files[p] = String(data); },
    existsSync: function (p) { return p in _files; },
    readdirSync: function () { return Object.keys(_files).map(function (f) { return f.split('/').pop(); }); },
    readFile: function (p, enc, cb) { cb = typeof enc === 'function' ? enc : cb; setTimeout(function () { if (p in _files) cb(null, _files[p]); else cb(enoent(p)); }, 0); },
    writeFile: function (p, data, cb) { cb = typeof data === 'function' ? data : cb; setTimeout(function () { _files[p] = String(data); cb && cb(null); }, 0); },
    promises: {
      readFile: function (p) { return Promise.resolve().then(function () { if (p in _files) return _files[p]; throw enoent(p); }); },
      writeFile: function (p, d) { return Promise.resolve().then(function () { _files[p] = String(d); }); }
    }
  };

  var util = {
    format: function () { return Array.prototype.slice.call(arguments).map(function (a) { return typeof a === 'string' ? a : JSON.stringify(a); }).join(' '); },
    inspect: function (o) { try { return JSON.stringify(o, null, 2); } catch (_) { return String(o); } },
    promisify: function (fn) { return function () { var a = Array.prototype.slice.call(arguments); return new Promise(function (res, rej) { fn.apply(null, a.concat([function (e, v) { e ? rej(e) : res(v); }])); }); }; }
  };

  function assert(v, msg) { if (!v) throw new Error(msg || 'Assertion failed'); }
  assert.ok = assert;
  assert.strictEqual = function (a, b, m) { if (a !== b) throw new Error(m || ('Expected ' + JSON.stringify(b) + ' but got ' + JSON.stringify(a))); };
  assert.notStrictEqual = function (a, b, m) { if (a === b) throw new Error(m || 'Expected values to differ'); };
  assert.deepStrictEqual = function (a, b, m) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(m || 'Objects are not deeply equal'); };

  var os = { EOL: '\\n', platform: function () { return 'browser'; }, hostname: function () { return 'playground'; }, type: function () { return 'Browser'; } };

  var BufferShim = {
    from: function (input) {
      var arr = typeof input === 'string' ? new TextEncoder().encode(input) : Uint8Array.from(input);
      arr.toString = function (enc) { return enc === 'hex' ? Array.prototype.map.call(this, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('') : new TextDecoder().decode(this); };
      return arr;
    },
    byteLength: function (s) { return new TextEncoder().encode(s).length; },
    isBuffer: function (x) { return x instanceof Uint8Array; }
  };

  function require(name) {
    name = name.replace(/^node:/, '');
    if (name === 'events') return { EventEmitter: EventEmitter, default: EventEmitter };
    if (name === 'path') return path;
    if (name === 'fs') return fs;
    if (name === 'util') return util;
    if (name === 'assert' || name === 'assert/strict') return assert;
    if (name === 'os') return os;
    if (name === 'buffer') return { Buffer: BufferShim };
    throw new Error("Cannot find module '" + name + "' — this playground only ships browser-safe Node built-ins (events, path, fs, util, assert, os, buffer).");
  }

  var process = {
    argv: ['node', '/app/script.js'],
    env: { NODE_ENV: 'development' },
    platform: 'browser',
    version: 'v22.0.0',
    versions: { node: '22.0.0' },
    cwd: function () { return '/app'; },
    nextTick: function (fn) { var a = Array.prototype.slice.call(arguments, 1); queueMicrotask(function () { fn.apply(null, a); }); },
    exit: function () {}
  };
  // Expose Node-style globals so the user's script (kept in a separate <script>
  // tag, so its own syntax errors stay catchable via window.onerror) can use them.
  window.require = require;
  window.process = process;
  window.Buffer = BufferShim;
  window.setImmediate = function (fn) { var a = Array.prototype.slice.call(arguments, 1); return setTimeout(function () { fn.apply(null, a); }, 0); };
  window.clearImmediate = function (id) { clearTimeout(id); };
  window.__dirname = '/app';
  window.__filename = '/app/script.js';
  window.module = { exports: {} };
  window.exports = window.module.exports;

  // Always signal completion so the UI never hangs, even on a syntax error.
  setTimeout(function () { send('done', {}); }, 160);
})();
<\/script>
<script>
${String(code).replace(/<\/script/gi, '<\\/script')}
<\/script>
</body>
</html>`;
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

function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}>Quick check</div>
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
      {picked !== null && <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>}
    </div>
  );
}

function PlayIcon({ paused }) {
  if (paused) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5h3v14H8V5Zm5 0h3v14h-3V5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

function CodePanel({ code, activeLines }) {
  const active = new Set(activeLines || []);
  return (
    <pre className={s.codeBlock} aria-label="Node.js example code">
      {code.split('\n').map((line, index) => {
        const lineNo = index + 1;
        return (
          <span key={lineNo} className={active.has(lineNo) ? s.codeLineActive : s.codeLine}>
            <span className={s.lineNo}>{lineNo}</span>
            <span className={s.lineText}>{line || ' '}</span>
          </span>
        );
      })}
    </pre>
  );
}

function QueueLane({ lane, items, active }) {
  return (
    <section className={active ? s.laneActive : s.lane}>
      <div className={s.laneHead}>
        <span>{lane.label}</span>
        <small>{lane.hint}</small>
      </div>
      <div className={s.laneItems}>
        {items.length ? (
          items.map((item, index) => (
            <span key={`${item}-${index}`} className={s.queueItem}>
              {item}
            </span>
          ))
        ) : (
          <span className={s.emptyItem}>empty</span>
        )}
      </div>
    </section>
  );
}

function PhaseRail({ activePhase }) {
  return (
    <div className={s.phaseRail} aria-label="Node.js event loop phases">
      {LANES.map((lane) => (
        <div key={lane.key} className={activePhase === lane.key ? s.phaseActive : s.phase}>
          <span className={s.phaseDot} />
          <span>{lane.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function NodejsPlaygroundTool() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(() => new Set());
  const [conceptOpen, setConceptOpen] = useState(true);
  const [search, setSearch] = useState('');

  // run-lesson state
  const [code, setCode] = useState(ALL_LESSONS[0].code || '');
  const [runLogs, setRunLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [runSrcDoc, setRunSrcDoc] = useState('');

  // visualizer state
  const [stepIndex, setStepIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  const lesson = ALL_LESSONS[activeIdx];
  const isRun = lesson.kind === 'run';
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  useEffect(() => {
    setProgress(readProgress());
    const idx = readStoredPosition();
    if (idx) {
      setActiveIdx(idx);
      setCode(ALL_LESSONS[idx].code || '');
    }
    setHydrated(true);
  }, []);

  /* ── visualizer derived ── */
  const currentStep = !isRun && stepIndex >= 0 ? lesson.steps[stepIndex] : null;
  const queues = mergeQueues(currentStep?.queues);
  const visOutput = useMemo(
    () => (isRun ? [] : lesson.steps.slice(0, stepIndex + 1).filter((step) => step.log).map((step) => step.log)),
    [isRun, lesson, stepIndex]
  );
  const progressPct = isRun ? 0 : ((stepIndex + 1) / lesson.steps.length) * 100;

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const selectLesson = useCallback((idx) => {
    stopTimer();
    setActiveIdx(idx);
    setPlaying(false);
    setStepIndex(-1);
    setCode(ALL_LESSONS[idx].code || '');
    setRunLogs([]);
    setRunSrcDoc('');
    setSearch('');
    writeStoredPosition(idx);
  }, [stopTimer]);

  const markDone = useCallback(() => {
    setProgress((prev) => {
      const next = new Set(prev);
      if (next.has(lesson.id)) next.delete(lesson.id);
      else {
        next.add(lesson.id);
        if (activeIdx < ALL_LESSONS.length - 1) selectLesson(activeIdx + 1);
      }
      writeProgress(next);
      return next;
    });
  }, [activeIdx, lesson.id, selectLesson]);

  /* ── run-lesson execution ── */
  useEffect(() => {
    function onMessage(event) {
      if (!event.data || event.data.source !== 'nodejs-run') return;
      if (event.data.type === 'console') {
        setRunLogs((cur) => [...cur.slice(-199), { level: event.data.level, text: event.data.text }]);
      }
      if (event.data.type === 'done') setRunning(false);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const runCode = useCallback(() => {
    setRunLogs([]);
    setRunning(true);
    // unique comment forces the iframe to reload even if code is unchanged
    setRunSrcDoc(buildNodeSrcDoc(code) + `<!-- ${Date.now()} -->`);
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(lesson.code || '');
    setRunLogs([]);
  }, [lesson.code]);

  /* ── visualizer controls ── */
  const nextStep = useCallback(() => {
    setStepIndex((index) => {
      if (index >= lesson.steps.length - 1) { setPlaying(false); return index; }
      return index + 1;
    });
  }, [lesson.steps]);

  const resetVis = useCallback(() => { stopTimer(); setPlaying(false); setStepIndex(-1); }, [stopTimer]);

  useEffect(() => {
    stopTimer();
    if (isRun || !playing) return undefined;
    if (stepIndex >= lesson.steps.length - 1) { setPlaying(false); return undefined; }
    timerRef.current = setTimeout(nextStep, speed);
    return stopTimer;
  }, [isRun, lesson.steps, nextStep, playing, speed, stepIndex, stopTimer]);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return ALL_LESSONS.filter((item) => item.title.toLowerCase().includes(q) || item.chapter.toLowerCase().includes(q));
  }, [search]);

  if (!hydrated) return null;

  const lessonButton = (item) => {
    const idx = ALL_LESSONS.indexOf(item);
    return (
      <button
        key={item.id}
        className={idx === activeIdx ? s.lessonActive : s.lessonButton}
        onClick={() => selectLesson(idx)}
      >
        <span className={s.lessonIndex}>{progress.has(item.id) ? '✓' : String(idx + 1).padStart(2, '0')}</span>
        <span>
          <strong>{item.title}</strong>
          {item.kind === 'visualizer' && <small>Event-loop visualizer</small>}
        </span>
      </button>
    );
  };

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="nodejs-playground" />
      <header className={s.header}>
        <div className={s.brand}>
          <img src="/icons/nodejs-playground.svg" alt="" width="28" height="28" />
          <div>
            <h1>Node.js Playground</h1>
            <p>Run real Node-flavoured JavaScript in your browser, plus an event-loop visualizer.</p>
          </div>
        </div>
        <div className={s.headerActions}>
          <span className={s.progressBadge}>{completedCount}/{ALL_LESSONS.length} lessons</span>
        </div>
      </header>

      <div className={s.body}>
        <aside className={s.sidebar}>
          <input className={s.searchInput} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search lessons..." />
          <div className={s.progressTop}>
            <span>Progress</span>
            <span>{completedCount} / {ALL_LESSONS.length}</span>
          </div>
          <div className={s.progressBar}><div className={s.progressBarFill} style={{ width: `${(completedCount / ALL_LESSONS.length) * 100}%` }} /></div>

          {filteredLessons ? (
            filteredLessons.length === 0
              ? <div className={s.noResults}>No lessons found</div>
              : filteredLessons.map(lessonButton)
          ) : (
            CHAPTERS.map((chapter) => (
              <div key={chapter}>
                <div className={s.sidebarTitle}>{chapter}</div>
                {(BY_CHAPTER[chapter] || []).map(lessonButton)}
              </div>
            ))
          )}
        </aside>

        <main className={s.main}>
          <PlaygroundTopAd />
          <section className={s.conceptHead}>
            <div className={s.conceptHeadTop} onClick={() => setConceptOpen((o) => !o)}>
              <div>
                <span className={s.chapter}>{lesson.chapter}</span>
                <h2>{lesson.title}</h2>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && <p className={s.conceptP}><ConceptText text={lesson.concept} /></p>}
          </section>

          {isRun ? (
            <section className={s.runWorkspace}>
              <div className={s.runEditorPanel}>
                <div className={s.panelHeader}>
                  <span>script.js</span>
                  <div className={s.runActions}>
                    <button className={s.secondaryButton} onClick={resetCode}>Reset</button>
                    <button className={s.primaryButton} onClick={runCode} disabled={running}>
                      <PlayIcon paused={false} />{running ? 'Running…' : 'Run'}
                    </button>
                  </div>
                </div>
                <textarea
                  className={s.runEditor}
                  value={code}
                  spellCheck={false}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      e.preventDefault();
                      const t = e.currentTarget;
                      const st = t.selectionStart;
                      setCode(code.slice(0, st) + '  ' + code.slice(t.selectionEnd));
                      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = st + 2; });
                    }
                  }}
                />
              </div>
              <div className={s.runOutputPanel}>
                <div className={s.panelHeader}>
                  <span>console</span>
                  <span>{running ? 'running' : 'ready'}</span>
                </div>
                <div className={s.runConsole}>
                  {runLogs.length ? (
                    runLogs.map((log, i) => (
                      <div key={i} className={`${s.consoleLine} ${log.level === 'error' ? s.consoleError : ''} ${log.level === 'warn' ? s.consoleWarn : ''}`}>
                        <span>{i + 1}</span>
                        <code>{log.text}</code>
                      </div>
                    ))
                  ) : (
                    <div className={s.consoleEmpty}>Press Run to execute this code for real in a sandbox.</div>
                  )}
                </div>
                <iframe ref={null} title="Node runtime" sandbox="allow-scripts" srcDoc={runSrcDoc} style={{ display: 'none' }} />
              </div>
            </section>
          ) : (
            <>
              <div className={s.controls}>
                <button className={s.primaryButton} onClick={() => setPlaying((v) => !v)}>
                  <PlayIcon paused={playing} />
                  {playing ? 'Pause' : stepIndex < 0 ? 'Run Simulation' : 'Resume'}
                </button>
                <button className={s.secondaryButton} onClick={nextStep} disabled={stepIndex >= lesson.steps.length - 1}>Step</button>
                <button className={s.secondaryButton} onClick={resetVis}>Reset</button>
                <label className={s.speedControl}>
                  <span>Speed</span>
                  <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
                    <option value={1300}>Slow</option>
                    <option value={900}>Normal</option>
                    <option value={500}>Fast</option>
                  </select>
                </label>
              </div>

              <div className={s.progressTrack}><div className={s.progressFill} style={{ width: `${progressPct}%` }} /></div>

              <section className={s.workspace}>
                <div className={s.editorPanel}>
                  <div className={s.panelHeader}><span>Example</span><span>{lesson.chapter}</span></div>
                  <CodePanel code={lesson.code} activeLines={currentStep?.lines} />
                </div>

                <div className={s.visualPanel}>
                  <div className={s.panelHeader}>
                    <span>Event Loop Simulator</span>
                    <span>{stepIndex < 0 ? 'Ready' : `Step ${stepIndex + 1}/${lesson.steps.length}`}</span>
                  </div>
                  <PhaseRail activePhase={currentStep?.phase} />
                  <div className={s.queueGrid}>
                    {LANES.map((lane) => (
                      <QueueLane key={lane.key} lane={lane} items={queues[lane.key]} active={currentStep?.phase === lane.key} />
                    ))}
                  </div>
                </div>

                <div className={s.inspectorPanel}>
                  <div className={s.panelHeader}><span>Output</span><span>Modeled trace</span></div>
                  <div className={s.stepCard}>
                    {currentStep ? (
                      <><h3>{currentStep.title}</h3><p>{currentStep.detail}</p></>
                    ) : (
                      <><h3>Press Run Simulation</h3><p>This chapter visualizes how Node schedules async work. It plays a deterministic, hand-built model of the event loop — the runnable lessons in other chapters execute real JavaScript.</p></>
                    )}
                  </div>
                  <div className={s.console}>
                    <div className={s.consoleTitle}>console</div>
                    {visOutput.length ? (
                      visOutput.map((line, index) => (
                        <div key={`${line}-${index}`} className={s.consoleLine}><span>{index + 1}</span><code>{line}</code></div>
                      ))
                    ) : (
                      <div className={s.consoleEmpty}>No output yet</div>
                    )}
                  </div>
                  <div className={s.takeaways}>
                    <div className={s.consoleTitle}>takeaways</div>
                    {lesson.takeaways.map((item) => <p key={item}>{item}</p>)}
                  </div>
                </div>
              </section>
            </>
          )}

          {lesson.challenge && <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />}

          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>Previous</button>
            <div className={s.navCounter}>{activeIdx + 1} / {ALL_LESSONS.length}</div>
            <div className={s.navRight}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>{isDone ? 'Done ✓' : 'Mark Done'}</button>
              <button className={s.navBtn} disabled={activeIdx === ALL_LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
