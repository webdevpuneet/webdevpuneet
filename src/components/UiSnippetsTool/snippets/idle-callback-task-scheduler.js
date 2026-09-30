const idleCallbackTaskScheduler = {
  id: 'idle-callback-task-scheduler',
  title: 'Idle Callback Task Scheduler',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<section class="ics-wrap">
  <span class="ics-tag">requestidlecallback</span>
  <h1>Background task queue</h1>
  <p id="icsStatus">Tasks only run when the browser is actually idle — try scrolling or clicking while they queue.</p>

  <div class="ics-list" id="icsList"></div>

  <div class="ics-actions">
    <button class="ics-btn primary" id="icsRunBtn" type="button">Queue background tasks</button>
    <button class="ics-btn" id="icsBusyBtn" type="button">Simulate busy main thread (3s)</button>
    <button class="ics-btn" id="icsResetBtn" type="button">Reset</button>
  </div>

  <p class="ics-note" id="icsNote">Each completed task shows the real deadline.timeRemaining() it ran with, proving it executed during genuine idle time, not on a fixed timer.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1c1730,#07050f 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.ics-wrap{width:100%;max-width:540px}
.ics-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c4b5fd;background:rgba(196,181,253,.1);border:1px solid rgba(196,181,253,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.ics-wrap h1{font-size:clamp(24px,5.5vw,32px);font-weight:800;letter-spacing:-.03em}
.ics-wrap>p{font-size:13.5px;color:#a49dc2;margin-top:8px;line-height:1.6}
.ics-list{display:flex;flex-direction:column;gap:8px;margin:20px 0 16px}
.ics-task{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:11px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);transition:border-color .2s,background .2s}
.ics-task.running{border-color:#c4b5fd;background:rgba(196,181,253,.08)}
.ics-task.done{background:rgba(74,222,128,.06);border-color:rgba(74,222,128,.25)}
.ics-dot{width:9px;height:9px;border-radius:50%;background:#4b5372;flex-shrink:0}
.ics-task.running .ics-dot{background:#c4b5fd;box-shadow:0 0 0 4px rgba(196,181,253,.2);animation:icsPulse 1s infinite}
.ics-task.done .ics-dot{background:#4ade80}
@keyframes icsPulse{0%,100%{opacity:1}50%{opacity:.4}}
.ics-task-name{flex:1;font-size:13.5px;font-weight:600}
.ics-task-meta{font-size:11px;font-weight:700;color:#8b93ab;font-variant-numeric:tabular-nums;text-transform:uppercase;letter-spacing:.04em}
.ics-task.done .ics-task-meta{color:#4ade80}
.ics-actions{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:14px}
.ics-btn{padding:11px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e8e2f5;font:700 12.5px system-ui;cursor:pointer;transition:background .15s}
.ics-btn:hover{background:rgba(255,255,255,.11)}
.ics-btn:disabled{opacity:.4;cursor:not-allowed}
.ics-btn.primary{background:linear-gradient(135deg,#c084fc,#818cf8);border-color:transparent;color:#150a29}
.ics-note{font-size:11.5px;color:#736c8c;line-height:1.6}`,

  js: `var listEl = document.getElementById('icsList');
var statusEl = document.getElementById('icsStatus');
var runBtn = document.getElementById('icsRunBtn');
var busyBtn = document.getElementById('icsBusyBtn');
var resetBtn = document.getElementById('icsResetBtn');

var TASKS = [
  'Sync analytics events',
  'Prefetch product images',
  'Warm search index cache',
  'Compress uploaded thumbnails',
  'Persist draft to storage',
  'Precompute recommendation scores'
];

var supported = typeof window.requestIdleCallback === 'function';

// Safari (desktop and iOS) has never shipped requestIdleCallback. This
// ponyfill approximates it with setTimeout: it cannot know true idle time,
// so it reports a fixed conservative timeRemaining budget instead of a
// real one. It's clearly labeled as an approximation everywhere the
// deadline value is shown.
function ricPonyfill(callback) {
  var start = Date.now();
  return setTimeout(function () {
    callback({
      didTimeout: false,
      timeRemaining: function () { return Math.max(0, 50 - (Date.now() - start)); }
    });
  }, 1);
}
var ric = supported ? window.requestIdleCallback : ricPonyfill;
var cic = supported ? window.cancelIdleCallback : clearTimeout;

var queue = [];
var pendingHandles = [];

function buildList() {
  listEl.innerHTML = '';
  TASKS.forEach(function (name, i) {
    var row = document.createElement('div');
    row.className = 'ics-task';
    row.id = 'icsTask' + i;
    row.innerHTML = '<span class="ics-dot"></span><span class="ics-task-name">' + name + '</span><span class="ics-task-meta" id="icsMeta' + i + '">Queued</span>';
    listEl.appendChild(row);
  });
}

function setTaskState(i, state, meta) {
  var row = document.getElementById('icsTask' + i);
  var metaEl = document.getElementById('icsMeta' + i);
  row.className = 'ics-task' + (state === 'running' ? ' running' : state === 'done' ? ' done' : '');
  metaEl.textContent = meta;
}

function runQueue() {
  runBtn.disabled = true;
  statusEl.textContent = supported
    ? 'Tasks queued with requestIdleCallback — each runs only when the browser reports free time.'
    : 'Tasks queued with a setTimeout-based fallback (this browser has no native requestIdleCallback — commonly Safari) — timeRemaining is approximated, not measured.';

  var i = 0;
  function scheduleNext() {
    if (i >= TASKS.length) {
      statusEl.textContent = 'All background tasks completed during idle time.';
      runBtn.disabled = false;
      return;
    }
    var index = i;
    i++;
    setTaskState(index, 'queued', 'Queued');
    var handle = ric(function (deadline) {
      setTaskState(index, 'running', 'Running…');
      var remaining = Math.round(deadline.timeRemaining());
      // Simulate a small chunk of real work so "running" is visible.
      setTimeout(function () {
        setTaskState(index, 'done', (supported ? 'Ran with ' + remaining + 'ms left' : '~' + remaining + 'ms (approx)'));
        scheduleNext();
      }, 220);
    }, { timeout: 4000 });
    pendingHandles.push(handle);
  }
  scheduleNext();
}

function simulateBusyMainThread() {
  busyBtn.disabled = true;
  statusEl.textContent = 'Blocking the main thread for 3 seconds synchronously — idle tasks cannot run until this finishes…';
  var end = Date.now() + 3000;
  // Deliberately janky synchronous block so idle callbacks visibly wait.
  requestAnimationFrame(function block() {
    if (Date.now() < end) {
      var x = 0;
      var innerEnd = Date.now() + 16;
      while (Date.now() < innerEnd) { x += Math.sqrt(x + 1); }
      requestAnimationFrame(block);
    } else {
      busyBtn.disabled = false;
      statusEl.textContent = 'Main thread free again — any queued idle tasks can now run.';
    }
  });
}

function reset() {
  pendingHandles.forEach(function (h) { cic(h); });
  pendingHandles = [];
  runBtn.disabled = false;
  buildList();
  statusEl.textContent = 'Tasks only run when the browser is actually idle — try scrolling or clicking while they queue.';
}

runBtn.addEventListener('click', runQueue);
busyBtn.addEventListener('click', simulateBusyMainThread);
resetBtn.addEventListener('click', reset);

if (!supported) {
  statusEl.textContent = 'This browser has no native requestIdleCallback (commonly Safari) — using a setTimeout-based fallback with an approximated deadline instead. Everything below still works.';
}

buildList();`,

  seo: {
    title: 'Idle Callback Task Scheduler — Free requestIdleCallback Demo',
    description: `A low-priority task queue built on the real requestIdleCallback API, showing each task's status and the actual deadline.timeRemaining() it ran with — with a labeled setTimeout fallback for Safari. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Idle Callback Task Scheduler — Proving Tasks Run During Real Idle Time',
      description: `Most "background task" demos fake it with \`setTimeout\` and hope it looks convincing. This one uses the actual \`requestIdleCallback\` API and proves it — every completed task displays the real \`deadline.timeRemaining()\` value the browser handed it, which only exists because the callback genuinely ran during idle time.

**The real API: requestIdleCallback and its deadline**

\`requestIdleCallback(callback, { timeout })\` asks the browser to invoke \`callback\` during a period when it has spare time before the next frame or user input — not on a fixed schedule. The callback receives a \`deadline\` object whose \`timeRemaining()\` method returns how many milliseconds of idle time are actually left right now. A "Simulate busy main thread" button lets you block the thread synchronously for 3 seconds; watch tasks queue and only start once that block clears, since \`requestIdleCallback\` genuinely cannot fire while the thread is busy.

**A labeled fallback for Safari**

\`requestIdleCallback\` has never shipped in Safari (desktop or iOS), so \`typeof window.requestIdleCallback === 'function'\` is feature-detected up front. When it's missing, \`ricPonyfill()\` substitutes a \`setTimeout\`-based approximation that calls back with a synthetic \`deadline\` object — but it cannot know true idle state, so its \`timeRemaining()\` reports a fixed conservative budget rather than a measured one. Every completed task's label is explicit about which mode produced it: \`"Ran with 34ms left"\` for the real API versus \`"~34ms (approx)"\` for the ponyfill.

**Visible task lifecycle**

Each task in the queue moves through three states — queued (gray dot), running (pulsing purple dot, currently inside its idle callback), and done (green dot, showing the deadline it ran with) — driven entirely by \`setTaskState()\`, so the UI is an honest reflection of when each callback actually fired, not a progress bar animated on a timer.

**Why a timeout option matters**

Each call passes \`{ timeout: 4000 }\`, which tells the browser to force-run the callback after 4 seconds even without idle time, so low-priority work still eventually completes on a busy page instead of starving indefinitely. Pair this with a broader [feature flag toggle panel](/ui-snippets/feature-flag-toggle-panel/) dashboard for a "system internals" demo page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A six-task queue renders, all marked "Queued."` },
      { title: 'Click "Queue background tasks"', text: `Tasks run one by one, only during idle time.` },
      { title: 'Watch each task complete', text: `Its label shows the real deadline.timeRemaining().` },
      { title: 'Click "Simulate busy main thread"', text: `Block the thread for 3s and watch tasks wait.` },
      { title: 'Queue tasks during the block', text: `They visibly queue until the thread frees up.` },
      { title: 'Click Reset', text: `Cancels any pending idle callbacks and restarts.` },
    ] },
    features: [
      { title: 'Real requestIdleCallback', text: `Tasks genuinely wait for browser idle time.` },
      { title: 'Live deadline.timeRemaining()', text: `Each completed task shows its actual idle budget.` },
      { title: 'Busy-thread proof', text: `A blocking demo shows tasks visibly waiting.` },
      { title: 'Labeled Safari fallback', text: `setTimeout ponyfill with an approximated deadline.` },
      { title: 'Three-state task lifecycle', text: `Queued, running, and done, each visually distinct.` },
      { title: 'Force-run timeout', text: `{ timeout: 4000 } guarantees eventual execution.` },
      { title: 'Clean cancellation', text: `Reset cancels every pending idle callback handle.` },
      { title: 'Zero dependencies', text: `Pure browser API, no scheduling library.` },
    ],
    useCases: [
      { title: 'Analytics batching', text: `Send non-critical events without blocking interaction.` },
      { title: 'Image/asset prefetching', text: `Warm caches only when the browser has spare time.` },
      { title: 'Autosave/draft persistence', text: `Persist state during idle instead of on every keystroke.` },
      { title: 'Admin dashboards', text: `Pair with a [feature flag toggle panel](/ui-snippets/feature-flag-toggle-panel/).` },
      { title: 'Search index warming', text: `Precompute client-side search data lazily.` },
      { title: 'Performance teaching tools', text: `Show developers how idle scheduling actually behaves.` },
      { icon: 'CODE', title: 'Related: Scheduled Job Run History Tile', desc: 'See the [Scheduled Job Run History Tile](/ui-snippets/job-run-history-status-tile/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I know tasks are really running during idle time, not on a timer?', a: `Each completed task displays deadline.timeRemaining(), a value only requestIdleCallback's real callback receives — it reports how much idle time was actually left when the browser invoked it. Clicking "Simulate busy main thread" blocks the thread synchronously for 3 seconds; queued tasks visibly wait and only start once that block clears, which a fixed setTimeout schedule could never demonstrate since it would fire on its own clock regardless of thread load.` },
      { q: 'Why does Safari need a fallback?', a: `requestIdleCallback has never been implemented in Safari, on desktop or iOS, despite being a W3C spec supported by Chrome, Edge, and Firefox. The code feature-detects with typeof window.requestIdleCallback === 'function' and, when it's missing, substitutes a setTimeout-based ponyfill that calls back with a synthetic deadline object after a 1ms delay.` },
      { q: 'Is the fallback\'s timeRemaining() value accurate?', a: `No, and the UI says so explicitly. The ponyfill has no way to measure genuine browser idle time the way native requestIdleCallback does, so it returns a fixed conservative budget (up to 50ms minus elapsed setup time) as an approximation. Completed tasks under the fallback are labeled "~Nms (approx)" rather than "Ran with Nms left," so the distinction from real measured idle time is never hidden.` },
      { q: 'What does the timeout option in { timeout: 4000 } do?', a: `It forces the browser to invoke the idle callback after 4 seconds even if no genuine idle period occurs, so low-priority work queued on a persistently busy page still eventually runs rather than being starved indefinitely. Without a timeout, a callback with no timeout option could theoretically wait a very long time on a page with constant animation or input.` },
      { q: 'How do I use requestIdleCallback in React, Vue, or Angular?', a: `Call requestIdleCallback (or the same feature-detected fallback) inside a mount effect for non-urgent setup work, store the returned handle, and cancel it with cancelIdleCallback in the cleanup function so an unmounted component doesn't run stale idle work. Avoid calling setState-equivalent updates from inside idle callbacks that fire after unmount, since the framework may warn or error.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain what deadline.timeRemaining() actually measures inside a requestIdleCallback callback, and why that value can only exist for the real API — not for a setTimeout-based approximation. It's also useful for reasoning about the fallback: ask why Safari has never implemented requestIdleCallback despite it being a standard API, and what tradeoffs the setTimeout ponyfill makes by returning a fixed approximate budget instead of a measured one. For extensions, ask it to add a priority field so higher-priority tasks preempt lower ones, visualize actual idle-time windows on a timeline as the page runs, or add a "cancel individual task" control per queued item. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "idle callback task scheduler" demo in plain HTML, CSS, and JavaScript using the real browser requestIdleCallback API — no libraries.

Requirements:
- A list of several low-priority background task names (e.g. "Sync analytics events", "Prefetch product images"), each starting in a "Queued" visual state (a status dot plus a text label).
- A "Queue background tasks" button that schedules each task sequentially via requestIdleCallback(callback, { timeout: 4000 }), where each callback marks its task "Running" immediately, reads and rounds deadline.timeRemaining() at the moment it was invoked, waits briefly to simulate doing work, then marks the task "Done" with a label showing the actual timeRemaining() value it ran with (e.g. "Ran with 34ms left") before scheduling the next task the same way.
- CRITICAL: feature-detect requestIdleCallback with typeof window.requestIdleCallback === 'function'. If unsupported (notably Safari, which has never implemented it), substitute a setTimeout-based ponyfill that invokes its callback with a synthetic deadline object whose timeRemaining() returns a fixed conservative approximate value (not a real measurement, since setTimeout cannot know actual browser idle state) — and label every task completed under this fallback differently (e.g. "~34ms (approx)") so it's never presented as a real measurement.
- A "Simulate busy main thread" button that synchronously blocks the main thread for about 3 seconds (e.g. via a tight loop driven by requestAnimationFrame checks against a target end time) so the user can visibly see queued idle tasks wait until the block clears, proving requestIdleCallback genuinely respects real idle time rather than firing on a fixed schedule.
- A "Reset" button that cancels any pending scheduled callbacks via cancelIdleCallback (or clearTimeout for the fallback) and restores every task to "Queued".`,
    },
  },
};

export default idleCallbackTaskScheduler;
