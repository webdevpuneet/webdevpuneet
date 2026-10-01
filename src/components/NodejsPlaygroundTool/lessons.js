// Node.js Playground — "run" lessons.
// These execute REAL JavaScript in a sandboxed iframe. Node built-ins are
// provided as faithful browser shims where the behaviour is pure JS
// (events, path, util, assert, Buffer, async/await, streams via async
// iterators). Server-only modules (fs, http) are modeled in-memory and the
// lesson text says so plainly — nothing fakes a result it can't compute.

// L(id, chapter, title, concept, code, challenge?)
function L(id, chapter, title, concept, code, challenge) {
  return { id, chapter, title, concept, code, challenge };
}

export const RUN_LESSONS = [
  /* ── Modules & require ── */
  L('module-exports', 'Modules & require', 'module.exports',
    'Every Node file is a **module**. You expose values by assigning to `module.exports`; other files get them with `require()`. Here we export an object and use it in the same file.',
    `// Each file is a module with its own module.exports object.
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }

module.exports = { add, sub };

console.log('Exported:', Object.keys(module.exports));
console.log('add(2, 3) =', module.exports.add(2, 3));`,
    { question: 'How does a Node module expose values to other files?', options: ['By assigning to module.exports', 'By using <export> tags', 'With a window global', 'They are shared automatically'], correct: 0 }),

  L('require-builtin', 'Modules & require', 'Requiring Built-in Modules',
    'Node ships core modules like `path`, `events`, and `util`. Load them with `require(\'name\')` (or the `node:` prefix). This playground runs real implementations of the pure-JS ones.',
    `const path = require('node:path');

console.log(path.join('users', 'ada', 'notes.txt'));
console.log('extension:', path.extname('report.pdf'));
console.log('filename:', path.basename('/app/data/report.pdf'));`),

  /* ── Globals & process ── */
  L('process-basics', 'Globals & process', 'The process Object',
    '`process` is a global describing the running program — its version, platform, environment variables, and CLI arguments. No import needed.',
    `console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Arguments:', process.argv);`),

  L('process-nexttick', 'Globals & process', 'process.nextTick & Ordering',
    'Synchronous code runs first. Then `process.nextTick` callbacks drain, then Promise microtasks. Run it and read the order in the console.',
    `console.log('1: synchronous start');

process.nextTick(() => console.log('3: nextTick'));
Promise.resolve().then(() => console.log('4: promise'));

console.log('2: synchronous end');`,
    { question: 'Which runs first after synchronous code?', options: ['process.nextTick callbacks', 'Promise .then callbacks', 'setTimeout callbacks', 'They run in random order'], correct: 0 }),

  /* ── Async Patterns ── */
  L('callbacks', 'Async Patterns', 'Callbacks',
    'The classic Node async style passes a function that runs when the work finishes. The convention is `(err, result)` — error first.',
    `function loadUser(id, callback) {
  setTimeout(() => callback(null, { id, name: 'Ada' }), 10);
}

loadUser(1, (err, user) => {
  if (err) return console.error('Failed:', err.message);
  console.log('Loaded user:', user.name);
});

console.log('Request sent, waiting...');`),

  L('promises-run', 'Async Patterns', 'Promises',
    'A Promise represents a future value. `.then` transforms it; returning a value passes it down the chain.',
    `function fetchPrice() {
  return Promise.resolve(42);
}

fetchPrice()
  .then((price) => { console.log('price:', price); return price * 2; })
  .then((doubled) => console.log('with tax:', doubled));`),

  L('async-await-run', 'Async Patterns', 'async / await',
    '`await` pauses one async function until a Promise settles — but the rest of the program keeps running. Notice the synchronous line prints before the awaited result.',
    `function getUser() {
  return Promise.resolve({ name: 'Lin' });
}

async function main() {
  console.log('A: before await');
  const user = await getUser();
  console.log('C: got', user.name);
}

main();
console.log('B: runs before the awaited result');`,
    { question: 'While one function awaits, what does the rest of the program do?', options: ['Keeps running', 'Freezes completely', 'Throws an error', 'Restarts'], correct: 0 }),

  L('promise-all', 'Async Patterns', 'Promise.all',
    'Run independent async work concurrently and wait for all of it with `Promise.all`, which resolves to an array of results in order.',
    `const a = Promise.resolve('users');
const b = Promise.resolve('orders');
const c = Promise.resolve('invoices');

Promise.all([a, b, c]).then((results) => {
  console.log('Loaded:', results.join(', '));
});`),

  /* ── Events (EventEmitter) ── */
  L('emitter-basics', 'Events (EventEmitter)', 'EventEmitter',
    'Much of Node is event-driven. `EventEmitter` lets objects publish named events that listeners react to. This runs the real emitter logic.',
    `const { EventEmitter } = require('events');

const orders = new EventEmitter();
orders.on('created', (id) => console.log('Order created:', id));

orders.emit('created', 1001);
orders.emit('created', 1002);

console.log('Listeners:', orders.listenerCount('created'));`,
    { question: 'What pattern does EventEmitter implement?', options: ['Publish / subscribe (events and listeners)', 'Request / response', 'Inheritance', 'Polling'], correct: 0 }),

  L('emitter-once', 'Events (EventEmitter)', 'once() Listeners',
    '`once` registers a listener that fires a single time and then removes itself — handy for one-time setup like a connection opening.',
    `const { EventEmitter } = require('events');

const db = new EventEmitter();
db.once('connect', () => console.log('connected (runs once)'));

db.emit('connect');
db.emit('connect'); // ignored — listener already removed
console.log('done');`),

  /* ── Paths & Strings ── */
  L('path-ops', 'Paths & Strings', 'Working with Paths',
    'The `path` module joins and inspects file paths correctly across segments — including resolving `..`. These are pure string operations, so they run for real here.',
    `const path = require('path');

const file = '/var/www/app/index.html';
console.log('dir:', path.dirname(file));
console.log('name:', path.basename(file, '.html'));
console.log('joined:', path.join('a', 'b', '..', 'c'));`),

  /* ── Buffers ── */
  L('buffer-basics', 'Buffers', 'Buffers & Binary',
    'A `Buffer` holds raw bytes. Convert text to bytes and back, or to hex. This playground backs Buffer with the browser TextEncoder, so the bytes are real.',
    `const buf = Buffer.from('Node');

console.log('byte length:', buf.length);
console.log('as hex:', buf.toString('hex'));
console.log('back to text:', buf.toString());`),

  /* ── Streams ── */
  L('streams-async-iter', 'Streams', 'Streaming with Async Iterators',
    'Streams process data piece by piece instead of all at once. Modern Node lets you consume them with `for await...of`. Async generators model the same pattern and run for real.',
    `async function* readLines() {
  yield 'line 1';
  yield 'line 2';
  yield 'line 3';
}

(async () => {
  for await (const line of readLines()) {
    console.log('chunk:', line);
  }
  console.log('stream ended');
})();`),

  /* ── File System (model) ── */
  L('fs-read', 'File System (model)', 'Reading a File',
    'Real Node reads from disk with `fs`. The browser has no disk, so this playground ships an **in-memory file** at `/app/notes.txt` and `fs` reads it for real from memory.',
    `const fs = require('fs');

// Pre-loaded in-memory file: /app/notes.txt
const text = fs.readFileSync('/app/notes.txt', 'utf8');
console.log(text.trim());`),

  L('fs-write-read', 'File System (model)', 'Writing then Reading',
    'Write a file and read it back. The in-memory model behaves like `fs` (you get an ENOENT error for missing files), so the flow matches real Node — only the storage is memory, not disk.',
    `const fs = require('fs');

fs.writeFileSync('/app/todo.txt', 'Learn Node streams');
console.log('exists?', fs.existsSync('/app/todo.txt'));
console.log('contents:', fs.readFileSync('/app/todo.txt', 'utf8'));`),

  /* ── JSON & Data ── */
  L('json-parse', 'JSON & Data', 'JSON.parse & stringify',
    'APIs and config files speak JSON. `JSON.parse` turns text into objects; `JSON.stringify` does the reverse, with optional pretty-printing.',
    `const raw = '{"name":"Ada","langs":["JS","Python"]}';
const data = JSON.parse(raw);

console.log(data.name, 'knows', data.langs.join(' & '));
console.log(JSON.stringify({ ok: true, count: 2 }, null, 2));`),

  /* ── Error Handling ── */
  L('try-catch', 'Error Handling', 'try / catch',
    'Wrap risky synchronous code in `try/catch` to handle failures gracefully instead of crashing the process.',
    `function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    return { error: err.message };
  }
}

console.log(safeParse('{"a":1}'));
console.log(safeParse('not json'));`),

  L('async-errors', 'Error Handling', 'Catching async Errors',
    'A rejected Promise inside an `async` function throws at the `await`. Wrap it in `try/catch` just like synchronous code.',
    `async function risky() {
  throw new Error('payment declined');
}

(async () => {
  try {
    await risky();
  } catch (err) {
    console.log('caught:', err.message);
  }
})();`,
    { question: 'How do you handle a rejected Promise with async/await?', options: ['try/catch around the await', 'An onError attribute', 'It cannot be caught', 'process.exit()'], correct: 0 }),

  /* ── HTTP (modeled) ── */
  L('http-handler', 'HTTP (modeled)', 'A Request Handler',
    'Real Node serves with `http.createServer((req, res) => {...})`. There is no socket in the browser, so the playground **invokes your handler once with a sample request** — the handler code itself runs for real.',
    `function handler(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ path: req.url, method: req.method, ok: true }));
}

// The playground calls your handler with a sample request:
const res = {
  writeHead: (code) => console.log('status', code),
  end: (body) => console.log('body', body),
};
handler({ url: '/api/health', method: 'GET' }, res);`),

  /* ── Testing ── */
  L('assert-test', 'Testing', 'Assertions with assert',
    'Node\'s built-in `assert` module powers many test runners. `strictEqual` throws when values differ — the foundation of automated tests. This runs the real assert logic.',
    `const assert = require('assert');

function add(a, b) { return a + b; }

assert.strictEqual(add(2, 3), 5);
console.log('PASS: add(2, 3) === 5');

try {
  assert.strictEqual(add(2, 2), 5);
} catch (err) {
  console.log('FAIL caught:', err.message);
}`),

  /* ── Production & Performance ── */
  L('env-config', 'Production & Performance', 'Environment Variables',
    'Production apps read configuration — ports, secrets, feature flags — from `process.env`, never from hardcoded values. Provide sensible defaults with `||`, and keep real secrets in a `.env` file (loaded by the `dotenv` package) or the host\'s dashboard.',
    `const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Starting on port', PORT, 'in', NODE_ENV, 'mode');

const isDev = NODE_ENV === 'development';
console.log('Verbose logging enabled:', isDev);`,
    { question: 'Where should production config like ports and secrets come from?', options: ['process.env (environment variables)', 'Hardcoded in the source', 'A global variable', 'The URL'], correct: 0 }),

  L('cjs-vs-esm', 'Production & Performance', 'CommonJS vs ES Modules',
    'Node has two module systems. **CommonJS** uses `require()` and `module.exports` (the classic default). **ES Modules** use `import`/`export` and are enabled by `"type": "module"` in package.json or an `.mjs` extension. New projects increasingly prefer ESM; both are everywhere, so you should recognize each.',
    `// CommonJS — what this playground runs:
function greet(name) { return 'Hi ' + name; }
module.exports = { greet };

console.log('CommonJS exports:', Object.keys(module.exports));
console.log(module.exports.greet('Ada'));

// The ESM equivalent would be:
//   export function greet(name) { ... }
//   import { greet } from './greet.js';`,
    { question: 'Which syntax does CommonJS use to export values?', options: ['module.exports', 'export default', 'exports as import', 'window.exports'], correct: 0 }),

  L('perf-timing', 'Production & Performance', 'Measuring Performance',
    'Before optimizing, measure. The quickest way is a timer around the work; Node also offers `console.time()`/`console.timeEnd()` and high-resolution `process.hrtime.bigint()`. Profile first, then optimize the slow part — guessing wastes effort.',
    `const start = Date.now();

let sum = 0;
for (let i = 0; i < 1_000_000; i++) sum += i;

const ms = Date.now() - start;
console.log('Sum:', sum);
console.log('Took ~' + ms + 'ms for 1,000,000 iterations');`),

  L('worker-threads', 'Production & Performance', 'Worker Threads (CPU work)',
    'Node\'s event loop is single-threaded, so a long CPU-bound loop **blocks every other request**. The fix is `worker_threads`: run heavy computation on a separate thread and message the result back. The demo below runs a heavy loop on the main thread so you can feel the cost — in production this belongs in a worker.',
    `// Real Node: const { Worker } = require('worker_threads');
//            new Worker('./heavy-task.js');
// CPU-heavy work blocks the single main thread — move it to a worker.

const t = Date.now();
let total = 0;
for (let i = 0; i < 5_000_000; i++) total += Math.sqrt(i);

console.log('Heavy result:', Math.round(total));
console.log('Blocked the main thread for ~' + (Date.now() - t) + 'ms');
console.log('In production, run this in a worker thread.');`,
    { question: 'Why move CPU-heavy work to a worker thread?', options: ['The single-threaded event loop would otherwise block all other requests', 'Workers are required for any loop', 'It uses less memory always', 'To avoid using require'], correct: 0 }),

  L('cluster-scaling', 'Production & Performance', 'Scaling with Cluster',
    'A single Node process uses one CPU core. The `cluster` module (or a process manager like **PM2**) forks one worker process per core, all sharing the same port, so a multi-core server handles far more traffic. In containers you often scale horizontally with more replicas instead.',
    `const os = require('os');

// Real Node:
//   const cluster = require('cluster');
//   if (cluster.isPrimary) {
//     for (let i = 0; i < os.cpus().length; i++) cluster.fork();
//   } else {
//     // each worker runs the server, sharing the port
//   }

console.log('Platform:', os.platform());
console.log('Strategy: fork one worker per CPU core, or run more replicas.');`),

  L('debugging-inspect', 'Production & Performance', 'Logging & Debugging',
    'Good observability beats guesswork. `console.log/warn/error` write to stdout/stderr, `util.inspect` pretty-prints deep objects, and `node --inspect app.js` opens a real debugger in Chrome DevTools. In production, send structured logs to a service like Datadog or Logtail.',
    `const util = require('util');

const data = { user: 'Ada', roles: ['admin', 'dev'], active: true, meta: { plan: 'pro' } };

console.log('Inspect:', util.inspect(data));
console.warn('Warning: token expires soon');
console.error('Error (non-fatal): retrying request');
console.log('Tip: run "node --inspect app.js" and open chrome://inspect to set breakpoints.');`),
];

// Sidebar order. The visualizer block is injected at this chapter name.
export const CHAPTER_ORDER = [
  'Modules & require',
  'Globals & process',
  'Async Patterns',
  'Event Loop (Visualized)',
  'Events (EventEmitter)',
  'Paths & Strings',
  'Buffers',
  'Streams',
  'File System (model)',
  'JSON & Data',
  'Error Handling',
  'HTTP (modeled)',
  'Testing',
  'Production & Performance',
];

export const VISUALIZER_CHAPTER = 'Event Loop (Visualized)';
