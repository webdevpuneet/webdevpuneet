const idleDetectionBadge = {
  id: 'idle-detection-badge',
  title: 'Idle Detection Badge',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="idb-wrap">
  <span class="idb-tag">IdleDetector · heuristic fallback</span>
  <h1>Presence status</h1>
  <p id="idbStatus">Move the mouse or press a key — the badge below reflects real activity.</p>

  <div class="idb-card">
    <div class="idb-badge-row">
      <span class="idb-badge" id="idbBadge">
        <span class="idb-dot" id="idbDot"></span>
        <span id="idbBadgeLabel">Active</span>
      </span>
      <span class="idb-mode" id="idbMode">heuristic mode</span>
    </div>
    <div class="idb-meta">
      <div><span>Last activity</span><strong id="idbLastActivity">just now</strong></div>
      <div><span>Idle threshold</span><strong id="idbThreshold">6s</strong></div>
    </div>
    <button class="idb-btn" id="idbRequestBtn">Try real Idle Detection API</button>
  </div>

  <p class="idb-note">The IdleDetector interface is Chromium-only, requires an explicit permission grant, and is disabled by default behind a flag on many installs — so this demo's primary, always-working mode tracks real mousemove/keydown timestamps itself. If the real API is available and permission is granted, it takes over as a progressive enhancement.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0a1a22,#04090c 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.idb-wrap{width:100%;max-width:440px;text-align:center}
.idb-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#67e8f9;background:rgba(103,232,249,.1);border:1px solid rgba(103,232,249,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.idb-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.idb-wrap p{font-size:13.5px;color:#8fb8c2;margin-top:8px;line-height:1.6}
.idb-card{margin-top:22px;border-radius:16px;border:1px solid rgba(103,232,249,.18);background:#081319;padding:20px;text-align:left}
.idb-badge-row{display:flex;align-items:center;justify-content:space-between}
.idb-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:99px;background:rgba(74,222,128,.14);border:1px solid rgba(74,222,128,.35);color:#86efac;font-weight:700;font-size:13.5px;transition:background .2s,border-color .2s,color .2s}
.idb-badge.idle{background:rgba(251,191,36,.14);border-color:rgba(251,191,36,.35);color:#fcd34d}
.idb-badge.locked{background:rgba(248,113,113,.14);border-color:rgba(248,113,113,.35);color:#fca5a5}
.idb-dot{width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}
.idb-mode{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#5b8894;background:rgba(103,232,249,.08);padding:4px 9px;border-radius:6px}
.idb-meta{display:flex;gap:20px;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.08)}
.idb-meta div{display:flex;flex-direction:column;gap:3px}
.idb-meta span{font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#5b8894}
.idb-meta strong{font-size:13px;color:#d4f1f5}
.idb-btn{width:100%;margin-top:16px;padding:10px 14px;border-radius:10px;border:1px solid rgba(103,232,249,.3);background:rgba(103,232,249,.08);color:#a5e9f2;font:600 12.5px system-ui;cursor:pointer;transition:background .15s}
.idb-btn:hover{background:rgba(103,232,249,.16)}
.idb-btn:disabled{opacity:.5;cursor:not-allowed}
.idb-note{font-size:11.5px;color:#4a707a;max-width:420px;margin:16px auto 0;line-height:1.6}`,

  js: `var statusEl = document.getElementById("idbStatus");
var badge = document.getElementById("idbBadge");
var dot = document.getElementById("idbDot");
var badgeLabel = document.getElementById("idbBadgeLabel");
var modeEl = document.getElementById("idbMode");
var lastActivityEl = document.getElementById("idbLastActivity");
var thresholdEl = document.getElementById("idbThreshold");
var requestBtn = document.getElementById("idbRequestBtn");

var IDLE_THRESHOLD_MS = 6000;
thresholdEl.textContent = (IDLE_THRESHOLD_MS / 1000) + "s";

var currentState = "active"; // 'active' | 'idle' | 'locked'
var usingRealApi = false;
var lastActivityAt = Date.now();
var heuristicTimer = null;

function setBadge(state) {
  currentState = state;
  badge.classList.remove("idle", "locked");
  if (state === "idle") {
    badge.classList.add("idle");
    badgeLabel.textContent = "Idle";
  } else if (state === "locked") {
    badge.classList.add("locked");
    badgeLabel.textContent = "Locked";
  } else {
    badgeLabel.textContent = "Active";
  }
}

function updateLastActivityText() {
  var secondsAgo = Math.round((Date.now() - lastActivityAt) / 1000);
  lastActivityEl.textContent = secondsAgo <= 1 ? "just now" : secondsAgo + "s ago";
}

// --- Primary mode: a real heuristic built from actual DOM activity events.
// This is the mode most viewers will see, since it needs no permission and
// works in every browser.
function markActivity() {
  if (usingRealApi) return; // the real IdleDetector owns state once active
  lastActivityAt = Date.now();
  if (currentState !== "active") {
    setBadge("active");
    statusEl.textContent = "Activity detected — back to active.";
  }
}

function heuristicTick() {
  if (usingRealApi) return;
  updateLastActivityText();
  var elapsed = Date.now() - lastActivityAt;
  if (elapsed >= IDLE_THRESHOLD_MS && currentState === "active") {
    setBadge("idle");
    statusEl.textContent = "No mouse or key activity for " + Math.round(IDLE_THRESHOLD_MS / 1000) + "s — marked idle.";
  }
}

["mousemove", "keydown", "pointerdown", "touchstart", "scroll"].forEach(function (evt) {
  window.addEventListener(evt, markActivity, { passive: true });
});
heuristicTimer = setInterval(heuristicTick, 500);

// --- Progressive enhancement: the real IdleDetector API, when present and
// permitted. Chromium-only, gated behind an explicit permission request,
// and commonly blocked entirely inside a sandboxed preview iframe — so this
// is opt-in via a button rather than attempted automatically.
async function tryRealIdleDetector() {
  if (!("IdleDetector" in window)) {
    statusEl.textContent = "IdleDetector isn't available in this browser — staying in heuristic mode (the normal case).";
    requestBtn.disabled = true;
    requestBtn.textContent = "IdleDetector unsupported";
    return;
  }

  try {
    statusEl.textContent = "Requesting idle-detection permission\\u2026";
    var permission = await IdleDetector.requestPermission();
    if (permission !== "granted") {
      statusEl.textContent = "Idle-detection permission was denied — staying in heuristic mode.";
      requestBtn.disabled = true;
      requestBtn.textContent = "Permission denied";
      return;
    }

    var detector = new IdleDetector();
    detector.addEventListener("change", function () {
      usingRealApi = true;
      clearInterval(heuristicTimer);
      var userState = detector.userState; // 'active' | 'idle'
      var screenState = detector.screenState; // 'locked' | 'unlocked'
      if (screenState === "locked") {
        setBadge("locked");
      } else if (userState === "idle") {
        setBadge("idle");
      } else {
        setBadge("active");
      }
      lastActivityAt = Date.now();
      updateLastActivityText();
      statusEl.textContent = "Live from the real IdleDetector API.";
    });

    await detector.start({ threshold: 60000, signal: new AbortController().signal });
    usingRealApi = true;
    modeEl.textContent = "native mode";
    statusEl.textContent = "Real IdleDetector active — heuristic tracking has handed off.";
    requestBtn.disabled = true;
    requestBtn.textContent = "Native IdleDetector active";
  } catch (err) {
    // Missing permission, unsupported in this context, or blocked by a
    // permissions policy (common inside a sandboxed preview iframe).
    statusEl.textContent = "Couldn't start the real IdleDetector (" + (err && err.name ? err.name : "blocked") + ") — staying in heuristic mode.";
    requestBtn.disabled = true;
    requestBtn.textContent = "Native API unavailable";
  }
}

requestBtn.addEventListener("click", tryRealIdleDetector);

updateLastActivityText();
setInterval(updateLastActivityText, 1000);`,

  seo: {
    title: 'Idle Detection Badge — Free Heuristic + Native IdleDetector Demo',
    description: `An Active/Idle/Locked presence badge driven primarily by a real mousemove/keydown activity heuristic, with the native Chromium-only IdleDetector API wired in as an opt-in progressive enhancement. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Idle Detection Badge — A Heuristic That Works Everywhere, Enhanced by the Real API',
      description: `Most "idle detection" demos reach straight for the \`IdleDetector\` interface and quietly break everywhere it isn't available — which, in practice, is almost everywhere: it's Chromium-only, requires an explicit permission grant through \`IdleDetector.requestPermission()\`, and is routinely disabled or blocked inside sandboxed preview iframes like the one likely rendering this demo. This snippet inverts that priority. The primary, always-on mode is a genuine activity heuristic built from real DOM events; the native API is wired in as an optional, opt-in upgrade.

**The heuristic that actually runs**

Every \`mousemove\`, \`keydown\`, \`pointerdown\`, \`touchstart\`, and \`scroll\` event updates \`lastActivityAt\` to the current timestamp. A 500ms interval, \`heuristicTick()\`, compares that timestamp against \`IDLE_THRESHOLD_MS\` (six seconds here) and flips the badge to "Idle" the moment that much real time has passed with zero activity — then flips straight back to "Active" the instant any tracked event fires again. Nothing here depends on permissions, browser support, or an installed context; it's the same technique behind countless "away" statuses in chat apps, just made honest about being a heuristic rather than dressed up as something more authoritative.

**The real API, opted into deliberately**

Clicking "Try real Idle Detection API" calls \`IdleDetector.requestPermission()\` behind a capability check for \`'IdleDetector' in window\`. If granted, a live \`IdleDetector\` instance is started with a 60-second threshold (the API's practical minimum) and its \`change\` event reports both \`userState\` (\`'active'\`/\`'idle'\`) and \`screenState\` (\`'locked'\`/\`'unlocked'\`) — the latter is something no DOM-event heuristic could ever detect, since a locked screen fires no browser events at all. When it successfully takes over, the heuristic timer is cleared and the mode label switches from "heuristic mode" to "native mode."

**Why this order, not the reverse**

Attempting the real API first and falling back only on failure would mean most visitors briefly see a permission prompt attempt, or a silent failure, before anything useful renders. Starting from a fully working heuristic and treating the native API as a bonus — exactly the shape used by this library's [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) snippet for microphone access — means the badge is meaningful from the first paint no matter what the browser or embedding context allows.

**A third state a heuristic can't reach**

The "Locked" badge state only ever appears via the real API's \`screenState\`, and the UI is explicit that this is a native-only capability — the heuristic mode simply has no equivalent. Pair this badge with a [team presence list](/ui-snippets/team-presence-list/) or [collaborator presence bar](/ui-snippets/collaborator-presence-bar/) for a multi-user version of the same pattern.

**Customizing it**

Tune \`IDLE_THRESHOLD_MS\`, add a "step away" auto-logout timer keyed off the idle state, or feed the state into a websocket to broadcast presence to other users in a real collaborative app.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An "Active" badge renders immediately in heuristic mode.` },
      { title: 'Stop moving the mouse or typing', text: `After the threshold, the badge flips to "Idle" automatically.` },
      { title: 'Move the mouse or press a key', text: `It flips straight back to "Active."` },
      { title: 'Click "Try real Idle Detection API"', text: `Requests permission for the native IdleDetector where available.` },
      { title: 'Grant or deny the permission', text: `The status line reports exactly what happened either way.` },
      { title: 'Watch the mode label', text: `It reads "heuristic mode" or "native mode" depending on what's active.` },
    ] },
    features: [
      { title: 'Working-by-default heuristic', text: `Needs zero permissions or special browser support.` },
      { title: 'Real activity events tracked', text: `mousemove, keydown, pointerdown, touchstart, and scroll.` },
      { title: 'Native IdleDetector opt-in', text: `Progressive enhancement behind an explicit button click.` },
      { title: 'Locked-screen detection', text: `screenState surfaces a state no heuristic alone can reach.` },
      { title: 'Clean handoff between modes', text: `The heuristic timer stops the moment the native API takes over.` },
      { title: 'Named permission outcomes', text: `States plainly whether the request was denied or unsupported.` },
      { title: 'Live last-activity readout', text: `A running "Xs ago" counter alongside the badge.` },
      { title: 'Visible active mode label', text: `Always shows whether heuristic or native mode is driving the badge.` },
    ],
    useCases: [
      { title: 'Chat and collaboration apps', text: `Pair with a [team presence list](/ui-snippets/team-presence-list/).` },
      { title: 'Support agent dashboards', text: `Show agent availability alongside a [status dashboard](/ui-snippets/status-dashboard/).` },
      { title: 'Session timeout warnings', text: `Trigger a warning modal after a real idle period.` },
      { title: 'Collaborative editors', text: `Combine with a [collaborator presence bar](/ui-snippets/collaborator-presence-bar/).` },
      { title: 'Kiosk and shared-device apps', text: `Detect a walked-away user to reset to a home screen.` },
      { title: 'Analytics engagement tracking', text: `Measure genuine active time versus idle tab time.` },
      { icon: 'CODE', title: 'Related: JSON Diff Viewer', desc: 'See the [JSON Diff Viewer](/ui-snippets/json-diff-viewer/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does this badge say "heuristic mode" instead of using the real Idle Detection API?', a: `The native IdleDetector interface is implemented only in Chromium browsers, requires an explicit permission grant via IdleDetector.requestPermission(), and is frequently disabled by default or blocked entirely inside sandboxed contexts like the preview iframe likely rendering this demo. Rather than depend on that narrow path, the badge starts in a heuristic mode that tracks real mouse and keyboard events directly — no permission needed — and only switches to native mode if you explicitly request it and it succeeds.` },
      { q: "How does the heuristic actually decide I'm idle?", a: `It listens for mousemove, keydown, pointerdown, touchstart, and scroll events on the window and records the timestamp of the most recent one. A recurring check compares the current time against that timestamp, and if more time has passed than the configured threshold (six seconds in this demo, tunable via IDLE_THRESHOLD_MS) with zero activity, the badge flips to Idle. Any tracked event firing again flips it straight back to Active.` },
      { q: "What can the real IdleDetector API do that the heuristic can't?", a: `The heuristic can only ever infer idleness from events that fire in the browser tab, so it has no way to know if the screen is locked — a locked device fires no DOM events, but the tab itself may still technically be open. The real IdleDetector API's screenState property reports 'locked' directly from the OS, which is why this snippet's "Locked" badge state is only reachable through the native API, never the heuristic.` },
      { q: "Why do I need to click a button to try the real API instead of it just working?", a: `Requesting idle-detection permission triggers a real browser permission prompt, and attempting that automatically on page load would be an unwanted surprise for most visitors of a demo page. Making it an explicit opt-in click respects that it's a meaningful permission request, and means the badge is already fully functional in heuristic mode before you ever decide whether to grant it.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Move the activity event listeners and the setInterval heuristic check into a mount effect, storing lastActivityAt and the current state in refs or component state. Keep the IdleDetector setup in the button's click handler exactly as shown, and make sure to call detector's abort signal (or otherwise stop it) and clear the heuristic interval in your component's cleanup function so neither keeps running after unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the heuristic mode is built to run first and unconditionally, with the real IdleDetector API wired in only as an opt-in enhancement behind a button click, rather than the more obvious-seeming approach of trying IdleDetector first and falling back to the heuristic on failure. It's a good prompt for reasoning about the actual mechanics too — ask what screenState reports that no DOM-event heuristic could ever detect, and why detector.start() is called with a 60-second threshold rather than something shorter. For extensions, ask it to add a configurable idle threshold input, broadcast the idle/active/locked state over a WebSocket for a real multi-user presence feature, or add an auto-logout countdown that starts once the badge goes idle. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "Idle Detection Badge" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A badge element that shows one of three states \— Active, Idle, or Locked \— with distinct colors for each, plus a "last activity" readout and a label showing which detection mode is currently driving the badge (heuristic or native).
- CRITICAL: make the PRIMARY, always-working detection method a real heuristic, not the native browser API. Attach listeners for mousemove, keydown, pointerdown, touchstart, and scroll on the window, record the timestamp of the most recent event, and run a recurring check (e.g. every 500ms) that flips the badge to Idle once a configurable threshold (a handful of seconds) has passed with no activity, flipping straight back to Active the moment any tracked event fires again. This heuristic must work with zero permissions and in every browser, since it is the mode most viewers of this demo will actually experience.
- Add a button that, only when clicked, attempts to use the real native IdleDetector API as a progressive enhancement: check 'IdleDetector' in window first, then call IdleDetector.requestPermission() inside a try/catch, and only if permission is granted, construct a new IdleDetector, listen for its change event to read both userState ('active'/'idle') and screenState ('locked'/'unlocked'), and call detector.start(). On success, stop the heuristic's interval timer and switch the mode label to native, and use screenState to show the Locked badge state that the heuristic alone cannot detect.
- On any failure of the native path \— the API not existing (the common case, since IdleDetector is Chromium-only), permission denied, or blocked by a permissions policy (a likely scenario inside a sandboxed preview iframe) \— leave the heuristic running uninterrupted and show a specific status message explaining what happened, disabling the "try real API" button so it's clear that mode isn't available rather than leaving it clickable and silently failing again.`,
    },
  },
};

export default idleDetectionBadge;
