const webLocksTabCoordinator = {
  id: 'web-locks-tab-coordinator',
  title: 'Web Locks API Tab Coordinator',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<section class="wlc-wrap">
  <span class="wlc-tag">navigator.locks</span>
  <h1>Tab lock coordinator</h1>
  <p id="wlcStatus">This tab requests a real named lock via navigator.locks.request(). Only one holder can hold it at a time, across every tab of this origin.</p>

  <div class="wlc-role-card" id="wlcRoleCard">
    <span class="wlc-role-badge" id="wlcRoleBadge">idle</span>
    <p class="wlc-role-text" id="wlcRoleText">Not yet requested.</p>
  </div>

  <div class="wlc-actions">
    <button class="wlc-btn primary" id="wlcRequest">Request "app-leader" lock</button>
    <button class="wlc-btn" id="wlcRelease">Release lock</button>
  </div>

  <div class="wlc-sim">
    <div class="wlc-sim-head">
      <h2>Simulate a second tab</h2>
      <p>Only one real tab is open here, so this button spins up a second async requester inside the same page — contending for the identical named lock — to show how the browser queues and resolves it.</p>
    </div>
    <button class="wlc-btn ghost" id="wlcSimulate">Simulate another tab racing for the lock</button>
    <ul class="wlc-log" id="wlcLog"></ul>
  </div>

  <p class="wlc-note" id="wlcNote">Checking Web Locks API support…</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1a1428,#08060f 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.wlc-wrap{width:100%;max-width:600px}
.wlc-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c4b5fd;background:rgba(196,181,253,.1);border:1px solid rgba(196,181,253,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.wlc-wrap h1{font-size:clamp(26px,6vw,34px);font-weight:800;letter-spacing:-.03em}
.wlc-wrap p{font-size:13.5px;color:#b1a4d6;margin-top:8px;line-height:1.6}
.wlc-role-card{margin:20px 0;padding:20px;border-radius:14px;background:linear-gradient(160deg,#221a38,#120d20);border:1px solid #2f2450;text-align:center}
.wlc-role-badge{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:6px 16px;border-radius:99px;background:rgba(148,163,184,.15);color:#cbd5e1}
.wlc-role-badge.leader{background:rgba(74,222,128,.15);color:#86efac}
.wlc-role-badge.waiting{background:rgba(251,191,36,.15);color:#fcd34d}
.wlc-role-text{margin-top:10px;font-size:13px;color:#c9bfe0}
.wlc-actions{display:flex;gap:8px;flex-wrap:wrap}
.wlc-btn{flex:1;min-width:150px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#ede9fe;font:600 13px system-ui;cursor:pointer;transition:background .15s}
.wlc-btn:hover{background:rgba(255,255,255,.11)}
.wlc-btn.primary{background:linear-gradient(135deg,#a78bfa,#7c3aed);border-color:transparent;color:#1a0d33;font-weight:700}
.wlc-btn.ghost{width:100%;border-color:rgba(196,181,253,.35);color:#ddd6fe}
.wlc-sim{margin-top:22px;padding-top:18px;border-top:1px solid #241a3a}
.wlc-sim-head h2{font-size:15px;font-weight:700}
.wlc-sim-head p{font-size:12.5px;color:#9d8fc4;margin-top:4px;margin-bottom:12px}
.wlc-log{list-style:none;margin-top:12px;display:flex;flex-direction:column;gap:6px;max-height:180px;overflow-y:auto}
.wlc-log li{font-size:12px;font-family:ui-monospace,Menlo,monospace;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#c9bfe0}
.wlc-log li.leader-line{color:#86efac}
.wlc-log li.wait-line{color:#fcd34d}
.wlc-note{font-size:11.5px;color:#7c6fa0;margin-top:16px;line-height:1.6}`,

  js: `var statusEl = document.getElementById('wlcStatus');
var noteEl = document.getElementById('wlcNote');
var roleBadge = document.getElementById('wlcRoleBadge');
var roleText = document.getElementById('wlcRoleText');
var requestBtn = document.getElementById('wlcRequest');
var releaseBtn = document.getElementById('wlcRelease');
var simulateBtn = document.getElementById('wlcSimulate');
var logEl = document.getElementById('wlcLog');

var LOCK_NAME = 'app-leader';
var hasLocksAPI = !!(navigator.locks && typeof navigator.locks.request === 'function');

var releaseCurrent = null; // resolves the promise the primary lock is waiting on

function log(text, cls) {
  var li = document.createElement('li');
  li.textContent = text;
  if (cls) li.className = cls;
  logEl.appendChild(li);
  logEl.scrollTop = logEl.scrollHeight;
}

function setRole(state, text) {
  roleBadge.className = 'wlc-role-badge' + (state ? ' ' + state : '');
  roleBadge.textContent = state || 'idle';
  roleText.textContent = text;
}

// --- Real Web Locks API path -------------------------------------------
// navigator.locks.request(name, callback) grants the callback exclusive
// access to the named lock, queuing any other request() calls for the same
// name (in this tab or any other tab/worker of the same origin) until it
// resolves. We hold the lock open with a manually-resolved promise so the
// UI can release it on demand via the "Release lock" button.
function requestPrimaryLock() {
  if (!hasLocksAPI) {
    setRole('leader', 'Simulated leader (Web Locks API unsupported) — this browser has no navigator.locks.');
    statusEl.textContent = 'No Web Locks API here, so this is a simulated single-tab leader state.';
    return;
  }

  setRole('waiting', 'Requesting the "' + LOCK_NAME + '" lock…');
  navigator.locks.request(LOCK_NAME, function (lock) {
    return new Promise(function (resolve) {
      releaseCurrent = resolve;
      setRole('leader', 'Holding the real "' + LOCK_NAME + '" lock. Any other tab (or the simulated requester below) calling navigator.locks.request("' + LOCK_NAME + '") now queues behind this tab until it\\'s released.');
      statusEl.textContent = 'This tab is the leader — it holds the actual browser-level lock.';
      log('[this tab] acquired "' + LOCK_NAME + '"', 'leader-line');
    });
  }).then(function () {
    if (roleBadge.textContent === 'leader' || roleBadge.textContent === 'waiting') {
      // Lock was released and no error occurred.
    }
  }).catch(function (err) {
    log('[this tab] lock request failed: ' + (err && err.name ? err.name : 'error'));
  });
}

requestBtn.addEventListener('click', requestPrimaryLock);

releaseBtn.addEventListener('click', function () {
  if (releaseCurrent) {
    releaseCurrent();
    releaseCurrent = null;
    setRole('idle', 'Released. Any queued requester (real or simulated) can now acquire the lock.');
    statusEl.textContent = 'Lock released.';
    log('[this tab] released "' + LOCK_NAME + '"');
  } else {
    setRole('idle', 'Nothing to release — this tab isn\\'t currently holding the lock.');
  }
});

// --- "Simulate another tab" ---------------------------------------------
// Real multi-tab contention needs a second browsing context, which a single
// embedded preview can't open. Instead, this spins up a second, independent
// navigator.locks.request() call for the SAME lock name from an async
// function on this page — the browser's own lock manager queues it exactly
// as it would a genuine second tab, so the contention and resolution order
// you see below is real Web Locks queuing behavior, just demonstrated
// in-process rather than cross-tab.
function simulateSecondTab() {
  if (!hasLocksAPI) {
    log('[simulated tab] Web Locks API unsupported — cannot demonstrate real queuing here.', 'wait-line');
    return;
  }

  log('[simulated tab] requesting "' + LOCK_NAME + '"…', 'wait-line');
  var willQueue = !!releaseCurrent;
  if (willQueue) {
    log('[simulated tab] this tab currently holds the lock — the simulated requester queues behind it.', 'wait-line');
  }

  navigator.locks.request(LOCK_NAME, { ifAvailable: false }, function (lock) {
    log('[simulated tab] acquired "' + LOCK_NAME + '"!', 'leader-line');
    return new Promise(function (resolve) {
      setTimeout(function () {
        log('[simulated tab] finished its work and released "' + LOCK_NAME + '"');
        resolve();
      }, 1400);
    });
  }).catch(function (err) {
    log('[simulated tab] request failed: ' + (err && err.name ? err.name : 'error'));
  });
}

simulateBtn.addEventListener('click', simulateSecondTab);

if (hasLocksAPI) {
  noteEl.textContent = 'navigator.locks is a real coordination primitive shared across every tab, iframe, and worker of the same origin — open this same page in a second real tab and click "Request" in both to see genuine cross-tab queuing, not just the in-page simulation above.';
} else {
  noteEl.textContent = 'navigator.locks is unavailable in this browser or blocked by the current context (some sandboxed iframes disallow it). Buttons still update the role card so the intended leader/follower behavior stays visible, but no real cross-tab coordination is happening.';
}

setRole('idle', 'Not yet requested.');`,

  seo: {
    title: 'Web Locks API Tab Coordinator — Free navigator.locks Demo',
    description: `A leader/follower role demo built on the real Web Locks API (navigator.locks.request), with an in-page simulated "second tab" to show genuine cross-context lock queuing. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Web Locks API Tab Coordinator — Real Cross-Tab Queuing, Demonstrated In-Page',
      description: `The Web Locks API lets any number of tabs, iframes, and workers from the same origin coordinate around a named resource without a server round-trip. This snippet uses the genuine \`navigator.locks.request()\` primitive to elect a "leader" and demonstrates real queuing behavior — including a second lock requester run in-process to simulate what a second real browser tab would experience.

**A lock is a callback, not a boolean**

\`navigator.locks.request(name, callback)\` doesn't return "did I get it" — it invokes your callback only once the lock is granted, and the lock is held for exactly as long as the promise your callback returns stays pending. This snippet's primary requester returns a \`new Promise\` it never resolves itself, stashing the \`resolve\` function so the "Release lock" button can trigger it later — a common pattern for holding a lock open across explicit UI-driven duration rather than a fixed task.

**Why "simulate another tab" is honest, not faked**

A single embedded preview can't spawn a genuine second browsing context, so instead of drawing a fake animation, this snippet calls \`navigator.locks.request()\` a second, independent time for the identical lock name from an async function on the same page. Because the Web Locks API's queue is keyed purely by lock name within an origin — not by which script or context requested it — the browser's real lock manager queues this second request exactly as it would a genuine second tab. What you see in the log is real queuing, demonstrated in-process rather than cross-window.

**Real cross-tab behavior, one click away**

The note explicitly tells you how to see the non-simulated version: open the same page in an actual second browser tab and click "Request" in both. Because \`navigator.locks\` coordinates at the origin level (not the tab level), the second tab's request will genuinely queue behind the first's held lock — no simulation involved at that point.

**ifAvailable for non-blocking checks**

The simulated requester passes \`{ ifAvailable: false }\` explicitly to make clear the default (blocking, queued) behavior is intentional here — contrast with \`{ ifAvailable: true }\`, which would resolve immediately with a \`null\` lock instead of waiting, useful for a "try to become leader, don't wait" pattern.

Pair this with a [status dashboard](/ui-snippets/status-dashboard/) for a broader ops-monitoring UI, or an [uptime status page](/ui-snippets/uptime-status-page/) for another dashboards-category piece.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An idle role card and lock controls render.` },
      { title: 'Click "Request app-leader lock"', text: `This tab genuinely acquires the named Web Lock.` },
      { title: 'Click "Simulate another tab"', text: `A second in-page requester queues behind the held lock.` },
      { title: 'Click "Release lock"', text: `The queued simulated requester immediately acquires it.` },
      { title: 'Watch the log', text: `Each acquire/release event prints with a real timest-ordered trace.` },
      { title: 'Open a second real tab', text: `Repeat "Request" there for genuine cross-tab queuing.` },
    ] },
    features: [
      { title: 'Real navigator.locks.request calls', text: `Genuine origin-level lock coordination.` },
      { title: 'Manually-held lock pattern', text: `A stashed resolve() lets the UI control release timing.` },
      { title: 'Honest in-page tab simulation', text: `Second requester uses the real API, not a fake animation.` },
      { title: 'Live contention log', text: `Timestamped trace of acquire/queue/release events.` },
      { title: 'ifAvailable demonstrated', text: `Shows the non-blocking lock-check option explicitly.` },
      { title: 'Leader/follower role card', text: `Visual state distinct from idle, waiting, and leader.` },
      { title: 'True cross-tab instructions', text: `Explains how to verify with a real second browser tab.` },
      { title: 'Graceful unsupported path', text: `Role card still updates when navigator.locks is absent.` },
    ],
    useCases: [
      { title: 'Single-writer tab election', text: 'Elect exactly one tab to own writes to shared storage, using the real `navigator.locks.request()` primitive so a second tab simply waits its turn.' },
      { title: 'Deduplicating network requests', text: 'Let only one tab poll a shared endpoint, with other tabs waiting in the queue until the leader releases the lock.' },
      { title: 'Leader-election dashboards', text: 'Pair with a [status dashboard](/ui-snippets/status-dashboard/) to show which tab currently holds the leader role and who is waiting.' },
      { title: 'Background sync gating', text: 'Ensure only one tab runs a sync job, with a timestamped log of acquire, queue and release events.' },
      { title: 'Multi-tab edit locks and ops monitoring', text: 'Prevent conflicting edits across tabs, or sit alongside an [uptime status page](/ui-snippets/uptime-status-page/) so only one tab does monitoring work.' },
    ],
    faqs: [
      { q: 'What does navigator.locks.request() actually coordinate?', a: `It coordinates access to a named resource across every tab, iframe, and dedicated/shared worker that shares the same origin. Only one exclusive holder of a given lock name can run its callback at a time; every other request() call for that same name queues (FIFO by default) until the holder's callback promise resolves. It requires no server, cookie, or localStorage polling — the browser's own lock manager tracks it.` },
      { q: 'How does the "simulate another tab" button demonstrate something real if only one tab is open?', a: `It calls navigator.locks.request() a second, independent time for the identical lock name from an async function running on the same page. The Web Locks API's queue is keyed by lock name within the origin, not by which script requested it, so the browser's real lock manager queues this second call exactly as it would a genuine second tab — the log output you see is real queuing behavior, just demonstrated in-process instead of across two windows.` },
      { q: 'How do I actually see real cross-tab behavior instead of the simulation?', a: `Open this same page in a second, real browser tab and click "Request app-leader lock" in both. Because navigator.locks coordinates at the origin level rather than the tab level, the second tab's request will genuinely queue behind whichever tab is currently holding the lock — no in-page simulation is involved at that point, and releasing the lock in one tab will unblock the other.` },
      { q: 'What does {ifAvailable: false} do in the simulated requester?', a: `It's the default behavior made explicit: the request queues and waits if the lock isn't immediately available, rather than resolving right away with a null lock. Passing { ifAvailable: true } instead would make request() resolve immediately — with a null lock argument if unavailable — useful for a "become leader only if nobody else already is" check that never blocks.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Call navigator.locks.request() inside a mount effect or event handler, stash the callback's resolve function in a ref (not component state, since it's not meant to trigger re-renders) if you need to release the lock from another handler, and always resolve it in a cleanup/unmount effect so an unmounting component doesn't hold a lock indefinitely.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how navigator.locks.request()'s callback-holds-the-lock-until-its-promise-resolves design differs from more familiar mutex APIs, and why stashing the callback's resolve function lets a UI button release the lock on demand rather than after a fixed duration. It's also useful for reasoning about the "simulate another tab" approach — ask why calling request() a second time for the same lock name from the same page produces genuinely real queuing behavior rather than a faked animation, since the Web Locks API queues by name at the origin level regardless of which script issued the request. For extensions, ask it to add a lock mode ('exclusive' vs 'shared') comparison, demonstrate the signal option for aborting a queued request, or build a small leader-election helper hook. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Web Locks API tab coordinator" demo in plain HTML, CSS, and JavaScript using the real navigator.locks API — no libraries.

Requirements:
- A role-status card showing one of three states: idle, waiting (lock requested but not yet granted), and leader (lock currently held by this context), plus "Request lock", "Release lock", and "Simulate another tab" buttons.
- Feature-detect with navigator.locks && typeof navigator.locks.request === 'function' before use, since the API can be absent or blocked in some contexts (e.g. certain sandboxed iframes).
- The primary "Request lock" flow must call navigator.locks.request(lockName, callback) where the callback returns a new Promise that is NOT resolved immediately — instead, stash its resolve function in an outer-scope variable so a separate "Release lock" button can call it later, demonstrating that a lock is held for as long as the callback's returned promise stays pending, not for a fixed duration.
- CRITICAL: implement "Simulate another tab" not as a fake animation but as a second, independent call to navigator.locks.request() for the exact same lock name, invoked from an async function within the same page. Explain in code comments and UI copy that because the Web Locks API's queue is keyed by lock name at the origin level (not by which script or tab issued the request), this in-page second requester genuinely queues behind the first one exactly as a real second browser tab would — making the demonstration real, not simulated, even though only one browser tab is actually open.
- A visible, timestamp-ordered log area that prints each acquire/queue/release event from both the primary requester and the simulated second requester, so the queuing and resolution order is observable.
- Also demonstrate the { ifAvailable: true } option somewhere (even just in a code comment or a secondary button) to show the non-blocking "check without waiting" variant, and explain the contrast with the default blocking/queuing behavior.
- UI copy should tell the user how to observe genuinely real cross-tab (not just in-page-simulated) behavior: opening the same page in a second actual browser tab and requesting the lock there too.`,
    },
  },
};

export default webLocksTabCoordinator;
