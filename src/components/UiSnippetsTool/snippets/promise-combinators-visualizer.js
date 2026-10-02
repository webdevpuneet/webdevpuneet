const promiseCombinatorsVisualizer = {
  id: 'promise-combinators-visualizer',
  title: 'Promise.all vs allSettled vs race vs any Visualizer',
  lastmod: '2026-09-25',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="pc">
  <div class="pc-top">
    <h2>Promise combinators on a timeline</h2>
    <p>Set how long each task takes and whether it fails, then run all four combinators on the same tasks at the same moment.</p>
  </div>
  <div class="pc-tasks" id="pcTasks"></div>
  <div class="pc-actions">
    <button type="button" id="pcRun">Run all four</button>
    <button type="button" id="pcPreset" class="ghost">Randomise</button>
  </div>
  <div class="pc-lanes" id="pcLanes"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.pc{width:100%;max-width:980px}
.pc h2{font-size:18px}
.pc-top p{font-size:12.5px;color:#94a3b8;margin-top:4px}
.pc-tasks{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}
@media (max-width:720px){.pc-tasks{grid-template-columns:repeat(2,1fr)}}
.pc-task{background:#111a2e;border:1px solid #1e293b;border-radius:12px;padding:10px 12px;font-size:12px}
.pc-task b{display:flex;align-items:center;gap:6px;font-size:13px}
.pc-task i{width:10px;height:10px;border-radius:3px;display:inline-block}
.pc-task label{display:flex;align-items:center;gap:6px;margin-top:8px;color:#cbd5e1}
.pc-task input[type=range]{flex:1;accent-color:#818cf8}
.pc-task output{width:46px;text-align:right;font-variant-numeric:tabular-nums}
.pc-actions{display:flex;gap:8px;margin:14px 0}
.pc button{border:0;border-radius:9px;padding:8px 14px;font:700 12px system-ui;background:#6366f1;color:#fff;cursor:pointer}
.pc button.ghost{background:#1e293b;color:#cbd5e1}
.pc button:disabled{opacity:.4}
.pc :focus-visible{outline:2px solid #a5b4fc;outline-offset:2px}
.pc-lane{background:#111a2e;border:1px solid #1e293b;border-radius:12px;padding:10px 12px;margin-bottom:10px}
.pc-lane-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-size:13px}
.pc-lane-head code{font:700 13px ui-monospace,monospace;color:#a5b4fc}
.pc-lane-head small{color:#94a3b8;font-size:11.5px}
.pc-track{position:relative;height:66px;margin-top:8px;background:repeating-linear-gradient(90deg,#1e293b 0 1px,transparent 1px 10%)}
.pc-bar{position:absolute;left:0;height:12px;border-radius:4px;width:0;opacity:.95}
.pc-bar.fail{background-image:repeating-linear-gradient(45deg,rgba(0,0,0,.35) 0 4px,transparent 4px 8px)}
.pc-bar.ignored{opacity:.28}
.pc-line{position:absolute;top:-4px;bottom:-4px;width:2px;background:#fbbf24;display:none}
.pc-line.bad{background:#f43f5e}
.pc-result{margin-top:8px;font:12px ui-monospace,monospace;color:#cbd5e1;min-height:18px;word-break:break-word}
.pc-result .ok{color:#4ade80}.pc-result .err{color:#fb7185}`,

  js: `var COLORS = ['#38bdf8', '#a78bfa', '#f472b6', '#34d399'];
var tasks = [
  { name: 'fetchUser',   ms: 900,  fail: false },
  { name: 'fetchOrders', ms: 1500, fail: false },
  { name: 'fetchAds',    ms: 600,  fail: true },
  { name: 'fetchPrefs',  ms: 1200, fail: false },
];
var MAX = 2000;

var COMBINATORS = [
  { fn: 'all',        rule: 'Fulfils when every task fulfils; rejects as soon as ONE rejects.' },
  { fn: 'allSettled', rule: 'Always fulfils, after every task settles, with a status per task.' },
  { fn: 'race',       rule: 'Settles like the FIRST task to settle, success or failure.' },
  { fn: 'any',        rule: 'Fulfils with the first SUCCESS; rejects only if every task fails.' },
];

function renderTasks() {
  document.getElementById('pcTasks').innerHTML = tasks.map(function (t, i) {
    return '<div class="pc-task"><b><i style="background:' + COLORS[i] + '"></i>' + t.name + '()</b>' +
      '<label>Time <input type="range" min="100" max="' + MAX + '" step="100" value="' + t.ms + '" data-i="' + i + '" aria-label="' + t.name + ' duration"><output>' + t.ms + 'ms</output></label>' +
      '<label><input type="checkbox" data-f="' + i + '"' + (t.fail ? ' checked' : '') + '> Rejects</label></div>';
  }).join('');
}

function renderLanes() {
  document.getElementById('pcLanes').innerHTML = COMBINATORS.map(function (c, ci) {
    return '<div class="pc-lane"><div class="pc-lane-head"><code>Promise.' + c.fn + '()</code><small>' + c.rule + '</small></div>' +
      '<div class="pc-track" id="track' + ci + '">' +
      tasks.map(function (t, i) { return '<div class="pc-bar" style="top:' + (i * 16 + 2) + 'px;background-color:' + COLORS[i] + '"></div>'; }).join('') +
      '<div class="pc-line"></div></div><div class="pc-result" id="res' + ci + '" aria-live="polite"></div></div>';
  }).join('');
}

// Each task is a REAL promise that resolves or rejects after its delay.
// All four combinators receive the same four promises.
function makeTask(t) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (t.fail) reject(new Error(t.name + ' failed'));
      else resolve(t.name + ' ok');
    }, t.ms);
  });
}

function describe(v) {
  if (v instanceof AggregateError) return 'AggregateError: all ' + v.errors.length + ' rejected';
  if (v instanceof Error) return v.message;
  if (Array.isArray(v)) return '[' + v.map(function (x) { return typeof x === 'object' ? '{' + x.status + '}' : JSON.stringify(x); }).join(', ') + ']';
  return JSON.stringify(v);
}

var running = false;
function run() {
  if (running) return;
  running = true;
  document.getElementById('pcRun').disabled = true;
  renderLanes();
  var t0 = performance.now();
  var promises = tasks.map(makeTask);
  // Silence "unhandled rejection" warnings for the raw task promises: the
  // combinators below are what we actually observe.
  promises.forEach(function (p) { p.catch(function () {}); });

  var pending = COMBINATORS.length;
  var bars = COMBINATORS.map(function (c, ci) { return document.querySelectorAll('#track' + ci + ' .pc-bar'); });
  var settledAt = COMBINATORS.map(function () { return null; });

  // Grow each task bar in real time until the task settles.
  (function frame() {
    var elapsed = performance.now() - t0;
    tasks.forEach(function (t, i) {
      var w = Math.min(elapsed, t.ms) / MAX * 100;
      bars.forEach(function (lane, ci) {
        lane[i].style.width = w + '%';
        if (elapsed >= t.ms && t.fail) lane[i].classList.add('fail');
        // Tasks that finish after a combinator settled can't change its result.
        if (settledAt[ci] !== null && t.ms > settledAt[ci]) lane[i].classList.add('ignored');
      });
    });
    if (elapsed < MAX && pending > 0 || tasks.some(function (t) { return elapsed < t.ms; })) requestAnimationFrame(frame);
  })();

  COMBINATORS.forEach(function (c, ci) {
    Promise[c.fn](promises).then(function (v) { mark(ci, true, v); }, function (e) { mark(ci, false, e); });
  });

  function mark(ci, ok, value) {
    var at = performance.now() - t0;
    settledAt[ci] = at;
    var line = document.querySelector('#track' + ci + ' .pc-line');
    line.style.display = 'block';
    line.style.left = Math.min(100, at / MAX * 100) + '%';
    if (!ok) line.classList.add('bad');
    document.getElementById('res' + ci).innerHTML = '<span class="' + (ok ? 'ok' : 'err') + '">' + (ok ? 'fulfilled' : 'rejected') + '</span> at ' + Math.round(at) + 'ms → ' + describe(value).replace(/</g, '&lt;');
    if (--pending === 0) {
      setTimeout(function () { running = false; document.getElementById('pcRun').disabled = false; }, Math.max(0, Math.max.apply(null, tasks.map(function (t) { return t.ms; })) - at) + 50);
    }
  }
}

document.getElementById('pcTasks').addEventListener('input', function (e) {
  var i = e.target.dataset.i;
  if (i !== undefined) { tasks[i].ms = Number(e.target.value); e.target.nextElementSibling.textContent = e.target.value + 'ms'; }
});
document.getElementById('pcTasks').addEventListener('change', function (e) {
  var f = e.target.dataset.f;
  if (f !== undefined) tasks[f].fail = e.target.checked;
});
document.getElementById('pcRun').addEventListener('click', run);
document.getElementById('pcPreset').addEventListener('click', function () {
  if (running) return;
  tasks.forEach(function (t) { t.ms = 100 * (2 + Math.floor(Math.random() * 17)); t.fail = Math.random() < 0.35; });
  renderTasks();
  renderLanes();
});

renderTasks();
renderLanes();
run();`,

  seo: {
    title: 'Promise.all vs allSettled vs race vs any — Free Interactive Visualizer',
    description: `Run Promise.all, Promise.allSettled, Promise.race and Promise.any on the same four real promises and watch a live timeline show when each combinator settles, with what value, and which tasks it ignored. Plain JS; exports to React, Vue & Tailwind.`,
    about: {
      title: 'JavaScript Promise Combinators — Four Rules on One Timeline',
      description: `JavaScript has four built-in ways to wait for several promises at once, and they differ in exactly two things: when they settle, and what counts as success. Reading the spec wording is one thing; seeing the same four tasks produce four different outcomes is what makes it stick.

**Real promises, same start time**

Each task is a real \`Promise\` that resolves or rejects after its delay. All four combinators receive the same array of promises at the same moment, so the only difference between lanes is the combinator's rule.

**The four rules**

- \`Promise.all\` fulfils with an array of values when every task fulfils, and rejects immediately when any task rejects — it short-circuits on the first failure.
- \`Promise.allSettled\` never rejects. It waits for every task and fulfils with \`{ status, value | reason }\` objects.
- \`Promise.race\` settles the same way as whichever task settles first, success or failure.
- \`Promise.any\` fulfils with the first success and ignores failures, rejecting with an \`AggregateError\` only if every task fails.

**Reading the timeline**

Bars grow in real time. Striped bars are rejections. The vertical line marks when the combinator settled — amber for fulfilled, red for rejected — and bars that are still running afterwards fade, because nothing they do can change that combinator's result.

**Short-circuiting doesn't cancel**

When \`Promise.all\` rejects early, the other tasks keep running: promises have no built-in cancellation. The faded bars keep growing to make this visible. Use an \`AbortController\` to actually stop network requests.

**Unhandled rejections**

The raw task promises get an empty \`.catch()\` so the browser doesn't report unhandled rejections for promises that are observed only through combinators.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the first run', text: `The page runs once automatically with a failing third task.` },
      { title: 'Adjust tasks', text: `Change each task's duration and tick "Rejects" to make it fail.` },
      { title: 'Run all four', text: `Compare when and how each combinator settles.` },
      { title: 'Randomise', text: `Generate new durations and failures to test your predictions.` },
      { title: 'Predict first', text: `Guess each lane's result before pressing Run.` },
    ] },
    features: [
      { title: 'Real promises', text: `Actual resolve/reject timers, not a simulation of the rules.` },
      { title: 'All four combinators', text: `all, allSettled, race and any side by side.` },
      { title: 'Live timeline', text: `Bars grow with elapsed time.` },
      { title: 'Settle markers', text: `Amber for fulfilled, red for rejected.` },
      { title: 'Ignored tasks faded', text: `Work that can no longer affect the result.` },
      { title: 'Result values shown', text: `Arrays, statuses and AggregateError.` },
      { title: 'Configurable tasks', text: `Duration and failure per task.` },
      { title: 'No unhandled rejections', text: `Raw promises are caught explicitly.` },
    ],
    useCases: [
      { title: 'Learning async JavaScript', text: 'Compare `Promise.all`, `allSettled`, `race` and `any` on the same four real promises, seeing when each settles and with what value.' },
      { title: 'Choosing the right API', text: 'Decide how to load a dashboard\'s widgets, seeing which combinator tolerates failure and which short-circuits on the first rejection.' },
      { title: 'Adding timeouts', text: 'See why `race` is the usual way to put a timeout on a request, with a live timeline of bars growing with elapsed time.' },
      { title: 'Fallback mirrors', text: 'Understand why `any` returns the first mirror that succeeds, ignoring rejections unless every single promise fails.' },
      { title: 'Teaching and interviews', text: 'Explain a frequently asked question visually, with amber markers for fulfilled and red for rejected promises.' },
      { icon: 'CODE', title: 'Related: Event Loop Visualizer', desc: 'When promise callbacks actually run: [Event Loop Visualizer](/ui-snippets/event-loop-visualizer/).' },
      { icon: 'CODE', title: 'Related: Debounce vs Throttle', desc: 'Another timing concept visualized: [Debounce vs Throttle Visualizer](/ui-snippets/debounce-throttle-visualizer/).' },
    ],
    faqs: [
      { q: 'What is the difference between Promise.all and Promise.allSettled?', a: `Promise.all rejects as soon as any promise rejects, so you lose the other results. Promise.allSettled waits for every promise and always fulfils with an array of { status, value } or { status, reason } objects.` },
      { q: 'What is the difference between Promise.race and Promise.any?', a: `race settles with the first promise to settle, even if it rejects. any waits for the first promise to fulfil and ignores rejections, rejecting with an AggregateError only if all of them reject.` },
      { q: 'Does Promise.all cancel the other promises when one fails?', a: `No. JavaScript promises cannot be cancelled. The other operations keep running; only the combined promise has already rejected. Use AbortController to cancel fetch requests.` },
      { q: 'How do I add a timeout to a fetch?', a: `Race the request against a promise that rejects after a delay: Promise.race([fetch(url), timeout(5000)]). Better still, use AbortSignal.timeout(5000) so the request is actually aborted.` },
      { q: 'When should I use Promise.allSettled?', a: `When the tasks are independent and a failure in one shouldn't discard the others, such as loading several dashboard widgets or sending a batch of notifications.` },
    ],
    aiPrompt: {
      paragraph: `Paste this visualizer into an AI assistant like Claude and ask it to predict each lane's result for a given configuration, then check with Run. Ask it to add AbortController so that Promise.all's early rejection actually cancels the other tasks, a fifth lane for a custom "first N succeed" combinator, or a timeout lane built with Promise.race. It can also explain how microtasks affect the exact order of the settle callbacks.`,
      prompt: `Build an interactive visualizer comparing Promise.all, Promise.allSettled, Promise.race and Promise.any in plain HTML, CSS and JavaScript on a dark theme.

Requirements:
- Four configurable tasks, each with a name, a duration slider (100–2000 ms) and a "Rejects" checkbox.
- Each run creates four real promises that resolve or reject after their durations, and passes the same array to all four combinators at the same moment; attach an empty catch to the raw promises to avoid unhandled rejections.
- One lane per combinator with its rule in one sentence, a timeline where each task's bar grows in real time (striped when it rejects), and a vertical marker at the moment the combinator settled (amber if fulfilled, red if rejected).
- Fade the bars of tasks that finish after a combinator has settled, since they can't affect its result.
- Print each combinator's outcome and value, including allSettled's status list and any's AggregateError.
- A Randomise button for durations and failures, and an automatic first run.`,
    },
  },
};

export default promiseCombinatorsVisualizer;
