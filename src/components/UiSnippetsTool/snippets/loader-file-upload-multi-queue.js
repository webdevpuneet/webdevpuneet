const loaderFileUploadMultiQueue = {
  id: 'loader-file-upload-multi-queue',
  title: 'Multi-File Upload Queue',
  lastmod: '2026-08-23',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="fq-card">
  <div class="fq-summary">
    <div class="fq-summary-row">
      <span class="fq-summary-label" id="fqLabel">Uploading 6 files…</span>
      <span class="fq-summary-pct" id="fqPct">0%</span>
    </div>
    <div class="fq-summary-track"><div class="fq-summary-fill" id="fqFill"></div></div>
    <div class="fq-summary-meta" id="fqMeta">2 active · 1 queued · 3 waiting</div>
  </div>
  <ul class="fq-list" id="fqList"></ul>
  <button type="button" class="fq-restart" id="fqRestart">↻ Run queue again</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.fq-card{width:100%;max-width:420px;background:#121729;border:1px solid #232a41;border-radius:16px;padding:20px;box-shadow:0 18px 44px rgba(0,0,0,.4)}

.fq-summary{padding-bottom:14px;margin-bottom:12px;border-bottom:1px solid #1f2538}
.fq-summary-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}
.fq-summary-label{font-size:13px;font-weight:700;color:#fff}
.fq-summary-pct{font-size:13px;font-weight:800;color:#818cf8;font-variant-numeric:tabular-nums}
.fq-summary-track{height:6px;background:#1c2338;border-radius:4px;overflow:hidden}
.fq-summary-fill{height:100%;width:0%;background:linear-gradient(90deg,#6366f1,#22d3ee);border-radius:4px;transition:width .25s ease}
.fq-summary-meta{margin-top:7px;font-size:11px;color:#6b7591}

.fq-list{list-style:none;display:flex;flex-direction:column;gap:8px;max-height:320px;overflow-y:auto}
.fq-row{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:#161b2c;border:1px solid #1f2538;opacity:.55;transition:opacity .25s}
.fq-row.is-active,.fq-row.is-done,.fq-row.is-error{opacity:1}
.fq-icon{width:30px;height:30px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;background:#1f2538}
.fq-body{flex:1;min-width:0}
.fq-name{font-size:12.5px;font-weight:700;color:#dbe0f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fq-sub{font-size:10.5px;color:#6b7591;margin-top:2px}
.fq-track{height:3px;background:#1f2538;border-radius:2px;margin-top:6px;overflow:hidden}
.fq-fill{height:100%;width:0%;background:#6366f1;border-radius:2px}
.fq-row.is-done .fq-fill{background:#22c55e}
.fq-row.is-error .fq-fill{background:#f87171}
.fq-status{font-size:10.5px;font-weight:800;flex-shrink:0;text-transform:uppercase;letter-spacing:.03em}
.fq-row.is-queued .fq-status{color:#6b7591}
.fq-row.is-active .fq-status{color:#818cf8}
.fq-row.is-done .fq-status{color:#22c55e}
.fq-row.is-error .fq-status{color:#f87171}
.fq-retry{margin-left:6px;font-size:10.5px;font-weight:800;color:#fff;background:#3730a3;border:none;border-radius:6px;padding:4px 8px;cursor:pointer;font-family:inherit}
.fq-retry:hover{background:#4338ca}

.fq-restart{display:none;margin-top:14px;width:100%;padding:9px;background:#1c2338;border:1px solid #2b3350;color:#c3cadf;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit}
.fq-restart.show{display:block}
.fq-restart:hover{background:#242c47}`,

  js: `var FILES = [
  { name: 'brand-guidelines.pdf', size: '4.1 MB' },
  { name: 'hero-banner.png', size: '2.8 MB' },
  { name: 'product-shots.zip', size: '18.3 MB' },
  { name: 'presentation-deck.pptx', size: '9.6 MB' },
  { name: 'invoice-q3.pdf', size: '312 KB' },
  { name: 'demo-recording.mp4', size: '54.2 MB' },
];
var MAX_CONCURRENT = 2;
var ERROR_INDEX = 2; // "product-shots.zip" fails once, then succeeds on retry

var list = document.getElementById('fqList');
var fill = document.getElementById('fqFill');
var pct = document.getElementById('fqPct');
var label = document.getElementById('fqLabel');
var meta = document.getElementById('fqMeta');
var restartBtn = document.getElementById('fqRestart');

var state = []; // { status: 'waiting'|'queued'|'active'|'done'|'error', progress: 0-100, timer }

function iconFor(name) {
  var ext = name.split('.').pop();
  if (ext === 'pdf') return '📄';
  if (ext === 'png' || ext === 'jpg') return '🖼️';
  if (ext === 'zip') return '🗜️';
  if (ext === 'pptx') return '📊';
  if (ext === 'mp4') return '🎬';
  return '📁';
}

function buildList() {
  list.innerHTML = '';
  state = FILES.map(function (f, i) {
    var li = document.createElement('li');
    li.className = 'fq-row is-waiting';
    li.id = 'fq-row-' + i;
    li.innerHTML =
      '<div class="fq-icon">' + iconFor(f.name) + '</div>' +
      '<div class="fq-body">' +
        '<div class="fq-name">' + f.name + '</div>' +
        '<div class="fq-sub">' + f.size + '</div>' +
        '<div class="fq-track"><div class="fq-fill" id="fq-fill-' + i + '"></div></div>' +
      '</div>' +
      '<span class="fq-status" id="fq-status-' + i + '">Waiting</span>';
    list.appendChild(li);
    return { status: 'waiting', progress: 0, timer: null };
  });
}

function activeCount() {
  return state.filter(function (s) { return s.status === 'active'; }).length;
}

function updateSummary() {
  var doneCount = state.filter(function (s) { return s.status === 'done'; }).length;
  var errorCount = state.filter(function (s) { return s.status === 'error'; }).length;
  var active = activeCount();
  var waiting = state.filter(function (s) { return s.status === 'waiting'; }).length;
  var avg = state.reduce(function (sum, s) { return sum + (s.status === 'error' ? 0 : s.progress); }, 0) / state.length;
  fill.style.width = avg.toFixed(0) + '%';
  pct.textContent = avg.toFixed(0) + '%';
  meta.textContent = active + ' active · ' + waiting + ' waiting · ' + doneCount + ' done' + (errorCount ? ' · ' + errorCount + ' failed' : '');
  if (doneCount + errorCount === state.length) {
    if (errorCount) {
      label.textContent = 'Finished with ' + errorCount + ' error' + (errorCount > 1 ? 's' : '');
    } else {
      label.textContent = 'All ' + state.length + ' files uploaded';
    }
    restartBtn.classList.add('show');
  } else {
    label.textContent = 'Uploading ' + state.length + ' files…';
  }
}

function renderRow(i) {
  var s = state[i];
  var row = document.getElementById('fq-row-' + i);
  var statusEl = document.getElementById('fq-status-' + i);
  var fillEl = document.getElementById('fq-fill-' + i);
  row.className = 'fq-row is-' + s.status;
  fillEl.style.width = s.progress.toFixed(0) + '%';
  if (s.status === 'waiting') statusEl.textContent = 'Waiting';
  else if (s.status === 'active') statusEl.textContent = s.progress.toFixed(0) + '%';
  else if (s.status === 'done') statusEl.textContent = '✓ Done';
  else if (s.status === 'error') {
    statusEl.innerHTML = 'Failed <button type="button" class="fq-retry" onclick="retryFile(' + i + ')">Retry</button>';
  }
}

function startFile(i) {
  var s = state[i];
  s.status = 'active';
  s.progress = 0;
  renderRow(i);
  var speed = Math.random() * 6 + 3;
  s.timer = setInterval(function () {
    // The designated file fails partway through the first time only.
    if (i === ERROR_INDEX && !s.hasFailedOnce && s.progress > 40) {
      clearInterval(s.timer);
      s.status = 'error';
      s.hasFailedOnce = true;
      renderRow(i);
      updateSummary();
      fillQueue();
      return;
    }
    s.progress = Math.min(100, s.progress + speed * (Math.random() * 0.6 + 0.7));
    renderRow(i);
    if (s.progress >= 100) {
      clearInterval(s.timer);
      s.status = 'done';
      renderRow(i);
      updateSummary();
      fillQueue();
    } else {
      updateSummary();
    }
  }, 220);
}

// Only MAX_CONCURRENT files upload at once; the rest sit "waiting" until a
// slot frees up, like a real download/upload manager's queue.
function fillQueue() {
  while (activeCount() < MAX_CONCURRENT) {
    var nextIndex = state.findIndex(function (s) { return s.status === 'waiting'; });
    if (nextIndex === -1) break;
    startFile(nextIndex);
  }
}

function retryFile(i) {
  startFile(i);
  updateSummary();
}
window.retryFile = retryFile;

function runQueue() {
  buildList();
  restartBtn.classList.remove('show');
  updateSummary();
  fillQueue();
}

restartBtn.addEventListener('click', runQueue);
runQueue();`,

  seo: {
    title: 'Multi-File Upload Queue — Concurrency-Limited Upload Loader',
    description: `Several files uploading with independent per-file progress, a queue that only runs two at a time, a real failure with retry, and a live aggregate summary. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Multi-File Upload Queue — Limited-Concurrency Uploads with Retry',
      description: `Real upload managers rarely fire every file at once — bandwidth and browser connection limits mean only a handful upload concurrently while the rest wait their turn. This snippet models that honestly: six files queue up, only two upload at a time, each running file advances on its own randomised interval so they finish at different moments, one file genuinely fails partway through with a retry action, and a live aggregate bar and status line summarise the whole queue — all in plain HTML, CSS, and vanilla JavaScript, no drag-and-drop chrome, focused purely on the queue mechanics.

**A concurrency-limited queue, not a free-for-all**

\`fillQueue()\` is the core of the snippet: it counts how many files are currently \`active\` and starts new ones from the \`waiting\` pool only until \`MAX_CONCURRENT\` (2) is reached. Every time a file finishes — successfully or with an error — \`fillQueue()\` runs again, pulling the next waiting file into an open slot. This is the same limited-concurrency pattern real upload clients use to avoid saturating a connection, and it's a meaningfully different mechanic from a simple "start everything simultaneously" uploader.

**Independent, realistically staggered progress**

Each active file gets its own \`setInterval\` with a randomised speed, so two files running side by side visibly finish at different times — one might complete in three seconds, another in eight. Nothing is synchronised or faked to look tidy; the raw randomness is what makes the queue feel like real network activity rather than a scripted animation.

**A genuine failure and retry**

One file (\`ERROR_INDEX\`) is scripted to fail once it passes 40% progress on its first attempt, switching to a red error row with an inline Retry button. Clicking Retry calls \`startFile\` again for that index, which restarts its progress from zero and re-enters the active pool — this time it's allowed to succeed, demonstrating a real state transition from error back to active rather than a decorative error icon that never resolves.

**A live, honest aggregate**

The top summary bar isn't a rough estimate — \`updateSummary()\` recomputes the true average of every file's current progress (treating a failed file as 0% until it's retried) on every tick, plus a live breakdown of how many files are active, waiting, done, or failed. This mirrors exactly what a user needs to know at a glance: how far along is the whole batch, and is anything stuck.

**Wiring it to a real backend**

Replace \`startFile\`'s simulated interval with a real \`XMLHttpRequest\` (or \`fetch\` with a readable stream) per file, updating \`s.progress\` from \`upload.onprogress\`'s \`loaded/total\`, and call \`fillQueue()\` from that request's \`load\`/\`error\` handlers instead of the simulated completion. The concurrency-limiting, retry, and summary logic all stay exactly the same. Pair it with the drag-and-drop [upload progress](/ui-snippets/upload-progress/) pattern for the initial file-picking step, or a [loading overlay](/ui-snippets/loading-overlay/) while the queue completes.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Six files render, two begin uploading immediately, the rest sit "Waiting".` },
      { title: 'Watch the queue advance', text: `As each active file finishes, the next waiting file automatically starts.` },
      { title: 'See the scripted failure', text: `One file fails partway through and shows a Retry button.` },
      { title: 'Click Retry', text: `That file restarts from zero and succeeds on its second attempt.` },
      { title: 'Watch the summary bar', text: `The top bar and meta line track the true live average and counts.` },
      { title: 'Run it again', text: `Once every file settles, click "Run queue again" to reset and replay.` },
    ] },
    features: [
      { title: 'Concurrency-limited queue', text: `Only MAX_CONCURRENT files upload at once; the rest wait their turn.` },
      { title: 'Auto-advancing slots', text: `fillQueue() pulls the next waiting file in the moment a slot frees up.` },
      { title: 'Independent per-file timers', text: `Each active upload runs its own randomised-speed interval.` },
      { title: 'Realistic staggered finishes', text: `Files complete at genuinely different, unscripted times.` },
      { title: 'Real failure and retry', text: `One file errors mid-upload and can be retried back into the queue.` },
      { title: 'Live true-average summary', text: `The top bar recomputes the real average progress every tick.` },
      { title: 'Status breakdown', text: `Active, waiting, done, and failed counts update live in the meta line.` },
      { title: 'Backend-ready structure', text: `Swap the simulated interval for real XHR upload.onprogress with no other changes.` },
    ],
    useCases: [
      { title: 'Media and asset upload managers', text: `Batch uploads of large files where bandwidth limits concurrent transfers.` },
      { title: 'Backup and sync clients', text: `A web dashboard for a sync tool showing queued vs. active file transfers.` },
      { title: 'Bulk document ingestion', text: `Compare with [upload progress](/ui-snippets/upload-progress/) for the picker step feeding this queue.` },
      { title: 'CMS and DAM bulk imports', text: `Import many assets while capping concurrent requests to the media API.` },
      { title: 'Data pipeline job queues', text: `Adapt the same concurrency-limited pattern for background job processing.` },
      { title: 'Any rate-limited API upload', text: `Respect a backend's concurrent-request limit while keeping users informed.` },
      { icon: 'CODE', title: 'Related: Infinite Scroll Loading Spinner', desc: 'See the [Infinite Scroll Loading Spinner](/ui-snippets/loader-infinite-scroll-spinner/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the concurrency limit actually work?', a: `fillQueue() counts files currently in the active status and starts more from the waiting pool only until MAX_CONCURRENT is reached. It's called again every time a file finishes or errors, so a freed slot is immediately backfilled from the queue — the same mechanic real upload managers use to avoid overwhelming a connection.` },
      { q: 'Why do the files finish at different times?', a: `Each active file runs its own setInterval with a randomised per-tick speed, so two files started at the same moment naturally diverge — one may finish well before the other. Nothing is synchronised on purpose; the unscripted variance is what makes the queue read as real network activity.` },
      { q: 'How does the retry actually work?', a: `One file is scripted to fail once past 40% progress on its first attempt, switching to an error row with a Retry button. Clicking Retry calls startFile again for that index, resetting its progress to zero and re-entering the active pool exactly like a fresh upload — this time it's allowed to complete, so the failure-to-success transition is real, not decorative.` },
      { q: 'Is the summary bar a real average or an estimate?', a: `It's a real average. updateSummary() sums every file's current progress (a failed file counts as 0% until retried) and divides by the total file count on every tick, so the top bar and percentage always reflect the true, live state of every row — not a smoothed or faked approximation.` },
      { q: 'How do I use this with a real upload endpoint?', a: `Replace startFile's setInterval with a real XMLHttpRequest per file: update s.progress from xhr.upload.onprogress's loaded/total, and call fillQueue() from the request's load and error handlers instead of the simulated completion. Keep MAX_CONCURRENT, the retry button, and updateSummary unchanged — they operate purely on the state array regardless of what drives it.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how fillQueue() enforces MAX_CONCURRENT by counting active files and only pulling from the waiting pool when a slot is free, and why it needs to be called again after both a successful completion and a failure for the queue to keep draining correctly. It's worth an efficiency check too: ask whether recomputing the full average in updateSummary() on every single tick of every active file matters at six files versus sixty, and how you'd batch those updates if it did. For extending it, ask for a version wired to real XMLHttpRequest uploads with genuine upload.onprogress events, a configurable MAX_CONCURRENT exposed as a UI control, or a pause/cancel action per file that correctly frees its slot for the next waiting item. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "multi-file upload queue" in plain HTML, CSS, and JavaScript that enforces a maximum number of concurrent uploads — no drag-and-drop UI needed, focus purely on the queue mechanics.

Requirements:
- A list of several files (name, size, icon) each rendered as a row with its own progress bar and a status label that can read Waiting, an active percentage, Done, or Failed.
- A JavaScript state array tracking each file's status (waiting, active, done, or error) and progress percentage, with a constant limiting how many files may be in the active status simultaneously (e.g. 2).
- A queue-filling function that counts currently active files and starts new ones from the waiting pool only until the concurrency limit is reached, and must be re-invoked every time any file finishes or fails, so a freed slot is immediately backfilled by the next waiting file — files must not all start simultaneously regardless of the limit.
- Each active file must progress independently via its own interval timer with a randomized speed, so that two files running concurrently visibly complete at different, unscripted times rather than in lockstep.
- Exactly one file must be scripted to fail partway through its first upload attempt (after passing some progress threshold), switching its row to a distinct error state with an inline Retry button; clicking Retry must restart that file's upload from zero and allow it to re-enter the concurrency-limited active pool, succeeding on the second attempt.
- A top-level summary section must show a live aggregate progress bar and percentage computed as the true running average of every file's current individual progress (not a separate faked value), plus a text line breaking down how many files are currently active, waiting, done, and failed, all updating in real time as the queue drains.`,
    },
  },
};

export default loaderFileUploadMultiQueue;
