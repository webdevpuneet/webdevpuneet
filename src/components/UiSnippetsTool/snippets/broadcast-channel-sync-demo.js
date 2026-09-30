const broadcastChannelSyncDemo = {
  id: 'broadcast-channel-sync-demo',
  title: 'BroadcastChannel Cross-Tab Sync',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<section class="bcs-wrap">
  <span class="bcs-tag">broadcastchannel api · cross-tab sync</span>
  <h1>Cross-tab counter</h1>
  <p id="bcsStatus">Open this page in a second tab, then click the buttons below — the count stays in sync across both.</p>

  <div class="bcs-counter">
    <button class="bcs-step" id="bcsDec">−</button>
    <div class="bcs-count" id="bcsCount">0</div>
    <button class="bcs-step" id="bcsInc">+</button>
  </div>

  <div class="bcs-actions">
    <button class="bcs-btn" id="bcsSimBtn">Simulate a second tab (same page)</button>
    <button class="bcs-btn ghost" id="bcsReset">Reset</button>
  </div>

  <div class="bcs-log-head">Message log</div>
  <ul class="bcs-log" id="bcsLog"></ul>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#181026,#08050f 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.bcs-wrap{width:100%;max-width:520px;text-align:center}
.bcs-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c4b5fd;background:rgba(196,181,253,.1);border:1px solid rgba(196,181,253,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.bcs-wrap h1{font-size:clamp(26px,5.5vw,36px);font-weight:800;letter-spacing:-.03em}
.bcs-wrap>p{font-size:13.5px;color:#b3a4d6;margin-top:8px;line-height:1.6}
.bcs-counter{display:flex;align-items:center;justify-content:center;gap:20px;margin:26px 0 18px}
.bcs-step{width:46px;height:46px;border-radius:50%;border:1px solid rgba(196,181,253,.3);background:#150f22;color:#fff;font-size:22px;cursor:pointer;line-height:1}
.bcs-step:hover{background:#1e1633}
.bcs-count{font-size:46px;font-weight:800;min-width:100px;background:linear-gradient(135deg,#c084fc,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent}
.bcs-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:18px}
.bcs-btn{padding:11px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#e8e2f5;font:600 12.5px system-ui;cursor:pointer}
.bcs-btn:hover{background:rgba(255,255,255,.11)}
.bcs-btn.ghost{color:#a898c9}
.bcs-log-head{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8577a3;margin-bottom:8px;text-align:left}
.bcs-log{list-style:none;max-height:190px;overflow-y:auto;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:#0d0918;text-align:left}
.bcs-log li{padding:9px 14px;font-size:12px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;gap:10px;color:#d6c9ef}
.bcs-log li:last-child{border-bottom:none}
.bcs-log li span{color:#6b5f8a;font-size:10.5px;flex-shrink:0}
.bcs-log:empty::after{content:'No messages yet — click a button, or open a second tab.';display:block;padding:16px;font-size:12px;color:#6b5f8a;text-align:center}`,

  js: `var countEl = document.getElementById('bcsCount');
var incBtn = document.getElementById('bcsInc');
var decBtn = document.getElementById('bcsDec');
var resetBtn = document.getElementById('bcsReset');
var simBtn = document.getElementById('bcsSimBtn');
var statusEl = document.getElementById('bcsStatus');
var logEl = document.getElementById('bcsLog');

var CHANNEL_NAME = 'bcs-demo-counter';
var count = 0;
var tabId = Math.random().toString(36).slice(2, 7);

function log(msg, from) {
  var li = document.createElement('li');
  var time = new Date().toLocaleTimeString();
  li.innerHTML = '<span>' + time + '</span><span>' + msg + (from ? ' (' + from + ')' : '') + '</span>';
  logEl.insertBefore(li, logEl.firstChild);
  while (logEl.children.length > 30) logEl.removeChild(logEl.lastChild);
}

function render() {
  countEl.textContent = String(count);
}

var supported = 'BroadcastChannel' in window;
var channel = null;
var simChannel = null; // a second, independently-opened channel used to
                        // simulate a "second tab" within this same page

function broadcast(type, value, sourceLabel) {
  count = value;
  render();
  if (channel) channel.postMessage({ type: type, value: value, tabId: tabId });
}

if (supported) {
  channel = new BroadcastChannel(CHANNEL_NAME);
  channel.onmessage = function (ev) {
    var data = ev.data || {};
    if (typeof data.value === 'number') {
      count = data.value;
      render();
      log('Received "' + data.type + '" -> ' + data.value, 'tab ' + (data.tabId || '?'));
    }
  };
  statusEl.textContent = 'BroadcastChannel is live (tab id: ' + tabId + '). Open this page in a second real browser tab to see true cross-tab sync, or use the simulate button below.';
} else {
  // BroadcastChannel is unsupported in a handful of older/embedded webviews.
  // Fall back to the storage event, which fires in OTHER tabs (never the
  // writing tab itself) whenever localStorage changes on the same origin —
  // a well-known, widely-supported cross-tab messaging trick.
  statusEl.textContent = 'BroadcastChannel unsupported here — falling back to a localStorage "storage" event for cross-tab sync instead.';
  window.addEventListener('storage', function (ev) {
    if (ev.key === CHANNEL_NAME && ev.newValue) {
      try {
        var data = JSON.parse(ev.newValue);
        count = data.value;
        render();
        log('Received (storage fallback) -> ' + data.value, 'other tab');
      } catch (e) {}
    }
  });
}

function step(delta) {
  var next = count + delta;
  log('Sent "step" -> ' + next, 'this tab');
  broadcast('step', next);
  if (!supported) {
    try { localStorage.setItem(CHANNEL_NAME, JSON.stringify({ value: next, ts: Date.now() })); } catch (e) {}
  }
}

incBtn.addEventListener('click', function () { step(1); });
decBtn.addEventListener('click', function () { step(-1); });
resetBtn.addEventListener('click', function () {
  log('Sent "reset" -> 0', 'this tab');
  broadcast('reset', 0);
  if (!supported) {
    try { localStorage.setItem(CHANNEL_NAME, JSON.stringify({ value: 0, ts: Date.now() })); } catch (e) {}
  }
});

// A single tab alone can't visually prove cross-tab sync is working, so this
// opens a SECOND independent BroadcastChannel instance on the same page
// (a legitimate second "listener" the browser treats no differently from a
// second tab) and has it react on its own timer, logging both directions so
// you can see the message flow without leaving the page.
var simRunning = false;
simBtn.addEventListener('click', function () {
  if (simRunning) return;
  simRunning = true;
  simBtn.textContent = 'Simulated tab active…';
  simBtn.disabled = true;

  if (supported) {
    simChannel = new BroadcastChannel(CHANNEL_NAME);
    simChannel.onmessage = function (ev) {
      var data = ev.data || {};
      log('Simulated tab received "' + data.type + '" -> ' + data.value, 'sim');
    };
    setTimeout(function () {
      var next = count + 1;
      log('Simulated tab sent "step" -> ' + next, 'sim');
      simChannel.postMessage({ type: 'step', value: next, tabId: 'sim' });
      count = next;
      render();
    }, 900);
  } else {
    setTimeout(function () {
      var next = count + 1;
      log('Simulated tab sent "step" -> ' + next, 'sim (storage fallback)');
      count = next;
      render();
      try { localStorage.setItem(CHANNEL_NAME, JSON.stringify({ value: next, ts: Date.now() })); } catch (e) {}
    }, 900);
  }
});

render();
log('Tab ' + tabId + ' ready.', null);`,

  seo: {
    title: 'BroadcastChannel Cross-Tab Sync — Free Demo With Live Log',
    description: `A counter kept in sync across every open tab of the same page using the real BroadcastChannel API, with a storage-event fallback and a same-page "simulate a second tab" mode. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'BroadcastChannel Cross-Tab Sync — Real Messages Between Tabs',
      description: `\`BroadcastChannel\` is the browser's native publish/subscribe channel between same-origin browsing contexts — tabs, windows, iframes, and workers can all join a channel by name and send each other messages with \`postMessage\`, with no server round-trip involved. This snippet demonstrates it with the simplest possible payload: a shared counter that stays in sync everywhere the page is open.

**How the sync actually works**

Every instance of the page opens \`new BroadcastChannel('bcs-demo-counter')\`. Clicking + or − updates the local count and calls \`channel.postMessage({ type, value, tabId })\`; every *other* open instance receives that message in its \`channel.onmessage\` handler (a channel never receives its own messages) and updates its own count to match. There's no polling and no server — the browser delivers the message directly to every other same-origin context subscribed to that channel name, typically within milliseconds.

**Why one tab can't prove this on its own**

The whole point of BroadcastChannel is *cross*-tab communication, so a single open tab can't visually demonstrate it — you need a second real tab open to the same page to see a message arrive from outside. This snippet makes that obvious with instructions right in the UI, but also includes a same-page **"simulate a second tab"** button, which opens a genuinely independent second \`BroadcastChannel\` instance inside the same document. The browser treats it identically to a second tab — it's a separate object with its own \`onmessage\` handler — so you can watch a message actually leave one channel instance and arrive at another without opening a second window.

**A live log of both directions**

Every send and every receive is written to a timestamped log, labeled with which "tab" it came from, so the direction of each message is never ambiguous — useful for actually seeing the asynchronous, fire-and-forget nature of \`postMessage\`.

**Fallback for unsupported browsers**

BroadcastChannel is broadly supported in evergreen browsers but missing from a handful of older or embedded webviews. When \`'BroadcastChannel' in window\` is false, the snippet falls back to the classic \`localStorage\` \`storage\`-event trick: writing to \`localStorage\` in one tab fires a \`storage\` event in every *other* same-origin tab (never the writer), which is a well-known, near-universally-supported way to achieve the same cross-tab notification. The status text always states plainly which mode is active. Pair this with a [web locks tab coordinator](/ui-snippets/web-locks-tab-coordinator/) for a fuller multi-tab coordination toolkit, or a [live visitor counter](/ui-snippets/live-visitor-counter/) for a related shared-state dashboard idea.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A counter with +/− buttons renders.` },
      { title: 'Open the page in a second tab', text: `Same URL, same origin.` },
      { title: 'Click + or − in either tab', text: `The count updates in both tabs instantly.` },
      { title: 'Watch the message log', text: `Sent and received messages are both logged.` },
      { title: 'No second tab handy?', text: `Click "Simulate a second tab" to see the flow on one page.` },
      { title: 'Reset', text: `Broadcasts a reset to every open instance.` },
    ] },
    features: [
      { title: 'Real BroadcastChannel messaging', text: `postMessage between same-origin contexts.` },
      { title: 'No server involved', text: `Pure browser-to-browser delivery.` },
      { title: 'Self-exclusion by design', text: `A channel never hears its own messages.` },
      { title: 'Same-page simulated tab', text: `A second independent channel instance for a one-tab demo.` },
      { title: 'Bidirectional live log', text: `Every sent and received message is timestamped.` },
      { title: 'storage-event fallback', text: `Works even without BroadcastChannel support.` },
      { title: 'Per-tab identifier', text: `Random tabId labels each message's origin.` },
      { title: 'Clear active-mode messaging', text: `States which sync mechanism is in use.` },
    ],
    useCases: [
      { title: 'Multi-tab auth state', text: `Sync login/logout across all open tabs.` },
      { title: 'Shopping carts', text: `Keep cart contents consistent everywhere.` },
      { title: 'Theme/preference sync', text: `Propagate dark mode toggles instantly.` },
      { title: 'Tab coordination', text: `Pair with [web locks tab coordinator](/ui-snippets/web-locks-tab-coordinator/).` },
      { title: 'Collaborative-feel demos', text: `Simulate presence like [live visitor counter](/ui-snippets/live-visitor-counter/).` },
      { title: 'Notification dismissal', text: `Dismiss an alert everywhere it's shown at once.` },
      { icon: 'CODE', title: 'Related: Database Connection Pool Monitor Tile', desc: 'See the [Database Connection Pool Monitor Tile](/ui-snippets/connection-pool-monitor-tile/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do I need two tabs open to see this working?', a: `BroadcastChannel is specifically for communication BETWEEN separate browsing contexts, and a channel never receives its own posted messages — only other instances subscribed to the same channel name do. A single tab has only one instance, so there's no "other side" to receive anything. Opening a second tab to the same page, or using the built-in "simulate a second tab" button, creates that second instance.` },
      { q: 'How does the "simulate a second tab" button work without opening a new tab?', a: `It creates a second, fully independent BroadcastChannel object on the same channel name within the same page. The browser treats this exactly like a second tab\'s channel — it has its own onmessage handler and receives messages posted by the first instance (and vice versa) — so you can observe real cross-instance delivery without leaving the page.` },
      { q: 'What happens if BroadcastChannel is not supported?', a: `The snippet checks \`\`BroadcastChannel\`\` in window at load and, if false, switches to a localStorage-based fallback: writing a value to localStorage fires a storage event in every other same-origin tab (but never the tab that wrote it), which has been supported far longer than BroadcastChannel and achieves the same cross-tab notification, just with a slightly different payload shape.` },
      { q: 'Does BroadcastChannel work across different origins or domains?', a: `No — BroadcastChannel is strictly same-origin, matching the page's full origin (protocol, host, and port). It cannot be used to message a different domain or even a different port on the same host; for cross-origin communication you would need something like postMessage on a window reference or a server-mediated channel instead.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Create the BroadcastChannel instance once in a mount effect (store it in a ref so it survives re-renders), post messages from your event handlers, and update component state from the onmessage callback. Close the channel with channel.close() in the cleanup function to avoid leaking a listener when the component unmounts.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why BroadcastChannel messages are never delivered back to the sending instance, and how that self-exclusion behavior shapes the way state has to be updated locally (immediately, on send) versus remotely (only via onmessage). It's also useful for reasoning about the fallback — ask why the storage event is a reasonable substitute for BroadcastChannel specifically, and what payload differences (JSON string vs structured-clone object) the two approaches require. For extensions, ask it to add a "who's currently connected" presence list using periodic ping/pong messages over the same channel, or to sync a more complex shared object (like a shopping cart) instead of a single number. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "BroadcastChannel cross-tab sync" demo in plain HTML, CSS, and JavaScript using the real browser BroadcastChannel API — no libraries.

Requirements:
- A shared counter with increment, decrement, and reset buttons. Every open tab/instance of the page must open new BroadcastChannel('some-channel-name') and post a message ({ type, value, tabId }) whenever the local count changes, so every OTHER open instance receives it via channel.onmessage and updates its own displayed count to match.
- A visible, timestamped log of every message sent and received, labeled with which "tab" or source it involved, so the direction and timing of cross-tab messages is clear.
- CRITICAL: since a single tab cannot demonstrate cross-tab messaging on its own (a channel never receives its own posted messages), include a "simulate a second tab" button that creates a SECOND, independent BroadcastChannel instance within the same page (on the same channel name) with its own onmessage handler, so the demo can visibly show a message being sent from one channel instance and received by another without requiring the user to open a real second browser tab. Clear instructions in the UI should also tell the user they can open a second real tab to see genuine cross-tab sync.
- CRITICAL fallback: feature-detect 'BroadcastChannel' in window. If unsupported, fall back to a localStorage-based cross-tab sync using the window 'storage' event (which fires in other same-origin tabs, never the writing tab, when localStorage changes) so the demo still functions across tabs, with a status message clearly stating that the fallback mechanism is active instead of BroadcastChannel.
- Status text should always state which sync mechanism (real BroadcastChannel vs storage-event fallback) is currently active.`,
    },
  },
};

export default broadcastChannelSyncDemo;
