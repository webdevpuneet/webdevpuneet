const auctionCountdownTimer = {
  id: 'auction-countdown-timer',
  title: 'Auction Countdown with Anti-Sniping',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="act-wrap">
  <span class="act-tag">anti-sniping · auto-extend</span>
  <h1>Vintage Leica M6 — Closes in</h1>

  <div class="act-clock">
    <div class="act-unit"><span id="actMin">02</span><small>min</small></div>
    <span class="act-colon">:</span>
    <div class="act-unit"><span id="actSec">00</span><small>sec</small></div>
  </div>

  <div class="act-explain" id="actExplain">
    If a bid arrives with less than <strong>30s</strong> remaining, the clock auto-extends by <strong>+60s</strong> — this is the real "anti-sniping" mechanism eBay and similar auction sites use to stop last-second snipe bids from winning unfairly.
  </div>

  <button class="act-btn" id="actSimBid">Simulate a late bid</button>

  <div class="act-log-head">Extension log</div>
  <ul class="act-log" id="actLog"></ul>

  <p class="act-cross">Pair with the <a href="/ui-snippets/auction-bid-ticker/">Live Auction Bid Ticker</a> — placing a real bid there also triggers this extension.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#241608,#0c0704 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.act-wrap{width:100%;max-width:480px;text-align:center}
.act-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.act-wrap h1{font-size:clamp(20px,4.5vw,26px);font-weight:800;letter-spacing:-.02em;margin-bottom:22px}
.act-clock{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:18px}
.act-unit{background:linear-gradient(160deg,#2e1c0a,#160d04);border:1px solid rgba(251,191,36,.3);border-radius:14px;padding:14px 20px;min-width:80px}
.act-unit span{display:block;font-size:40px;font-weight:800;color:#fbbf24;font-variant-numeric:tabular-nums;line-height:1}
.act-unit small{font-size:10px;color:#a08653;text-transform:uppercase;letter-spacing:.06em}
.act-colon{font-size:32px;font-weight:800;color:#fbbf24;margin-bottom:16px}
.act-clock.act-extending .act-unit{border-color:#fb923c;animation:actPulse 1s ease}
@keyframes actPulse{0%{box-shadow:0 0 0 0 rgba(251,146,60,.5)}100%{box-shadow:0 0 0 14px rgba(251,146,60,0)}}
.act-explain{font-size:12.5px;color:#c9a566;line-height:1.7;background:#160d04;border:1px solid rgba(251,191,36,.2);border-radius:12px;padding:14px 16px;margin-bottom:16px}
.act-explain strong{color:#fbbf24}
.act-btn{padding:11px 20px;border-radius:10px;border:1px solid rgba(251,191,36,.3);background:rgba(251,191,36,.08);color:#fbbf24;font:700 12.5px system-ui;cursor:pointer;margin-bottom:18px}
.act-btn:hover{background:rgba(251,191,36,.15)}
.act-log-head{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a7248;margin-bottom:8px;text-align:left}
.act-log{list-style:none;max-height:150px;overflow-y:auto;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:#160d04;text-align:left}
.act-log li{padding:10px 14px;font-size:12.5px;border-bottom:1px solid rgba(255,255,255,.05);color:#e9d9b8;display:flex;justify-content:space-between;gap:10px}
.act-log li:last-child{border-bottom:none}
.act-log li span{color:#8a7248;font-size:10.5px;flex-shrink:0}
.act-log:empty::after{content:'No extensions triggered yet.';display:block;padding:14px;font-size:12px;color:#6b5836;text-align:center}
.act-cross{font-size:11.5px;color:#6b5836;margin-top:16px}
.act-cross a{color:#fbbf24}`,

  js: `var minEl = document.getElementById('actMin');
var secEl = document.getElementById('actSec');
var clockEl = document.querySelector('.act-clock');
var explainEl = document.getElementById('actExplain');
var simBtn = document.getElementById('actSimBid');
var logEl = document.getElementById('actLog');

// --- Anti-sniping configuration ---
// If a bid lands with fewer than SNIPE_WINDOW_MS left on the clock, extend
// the close time by EXTEND_MS. This is the real mechanism eBay (and many
// other auction platforms) use: it exists because without it, a bidder
// could wait until the very last second to place a winning bid, leaving no
// time for anyone else to respond ("sniping"). Auto-extending guarantees
// every late bid gets a fair reaction window.
var SNIPE_WINDOW_MS = 30 * 1000;
var EXTEND_MS = 60 * 1000;

var closesAt = Date.now() + 2 * 60 * 1000; // demo starts at 2:00 remaining
var extensionCount = 0;
var tickHandle = null;

function fmt(n) { return String(n).padStart(2, '0'); }

function render() {
  var remaining = Math.max(0, closesAt - Date.now());
  var totalSec = Math.ceil(remaining / 1000);
  var mins = Math.floor(totalSec / 60);
  var secs = totalSec % 60;
  minEl.textContent = fmt(mins);
  secEl.textContent = fmt(secs);

  if (remaining <= 0) {
    clearInterval(tickHandle);
    explainEl.textContent = 'Auction closed. No further bids can trigger an extension.';
    simBtn.disabled = true;
  }
}

function logExtension(reason) {
  extensionCount += 1;
  var li = document.createElement('li');
  var time = new Date().toLocaleTimeString();
  li.innerHTML = '<span>' + time + '</span><span>' + reason + ' -> extended +' + (EXTEND_MS / 1000) + 's</span>';
  logEl.insertBefore(li, logEl.firstChild);
}

function maybeExtend(source) {
  var remaining = closesAt - Date.now();
  if (remaining > 0 && remaining < SNIPE_WINDOW_MS) {
    closesAt += EXTEND_MS;
    clockEl.classList.add('act-extending');
    setTimeout(function () { clockEl.classList.remove('act-extending'); }, 1000);
    logExtension(source + ' bid inside the last ' + (SNIPE_WINDOW_MS / 1000) + 's');
    render();
    return true;
  }
  return false;
}

// Listen for real bids placed on the companion "auction-bid-ticker" snippet
// (or any other bidding UI) via the shared auction:bid CustomEvent, and
// apply the same anti-sniping check to them.
window.addEventListener('auction:bid', function (ev) {
  maybeExtend((ev && ev.detail && ev.detail.bidder) || 'A new');
});

simBtn.addEventListener('click', function () {
  // Force the clock into the snipe window so the extension is guaranteed
  // to demonstrate visibly, regardless of how much time is actually left.
  var remaining = closesAt - Date.now();
  if (remaining > SNIPE_WINDOW_MS) {
    closesAt = Date.now() + Math.min(remaining, SNIPE_WINDOW_MS - 3000);
  }
  var extended = maybeExtend('Simulated late');
  if (!extended) {
    // Auction already closed; nothing to extend.
    logExtension('Simulated late bid arrived after close — no extension possible');
  }
});

tickHandle = setInterval(render, 250);
render();`,

  seo: {
    title: 'Auction Countdown with Anti-Sniping — Free Auto-Extend Timer',
    description: `A closing-time countdown that auto-extends when a bid arrives inside a configurable "snipe window," recreating the real anti-sniping mechanism used by eBay and similar auction platforms. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Auction Countdown with Anti-Sniping — The Real eBay-Style Extension Rule',
      description: `This countdown does more than tick down to zero — it implements **anti-sniping**, the real mechanism major auction platforms use to stop last-second "snipe" bids from unfairly winning an item with no time left for anyone else to respond.

**Why auction sites need this at all**

Without any protection, a bidder can wait until the literal last second of an auction to place a winning bid — by the time anyone else sees it, the clock has already hit zero and there's no way to respond. This "sniping" strategy exploits the fixed deadline itself. eBay's real solution (and the one this snippet recreates) is simple: if a bid arrives within a defined window before close, push the close time back by a fixed amount, so every bid — however late — guarantees everyone else a genuine chance to react.

**The actual rule, implemented literally**

Two constants drive it: \`SNIPE_WINDOW_MS\` (30 seconds here) and \`EXTEND_MS\` (60 seconds). \`maybeExtend()\` computes the real remaining time as \`closesAt - Date.now()\` and, if that's positive but under the snipe window, adds \`EXTEND_MS\` directly onto \`closesAt\`. Because the extension is applied to the actual close timestamp rather than to a countdown display value, it composes correctly no matter how many times it fires — a flurry of last-second bids each pushes the deadline further out, exactly like a real platform.

**Composable with a real bidding UI**

Rather than simulate bids internally as its primary path, this snippet listens for a window-level \`auction:bid\` \`CustomEvent\` — the exact event the companion [Live Auction Bid Ticker](/ui-snippets/auction-bid-ticker/) snippet dispatches every time a bid (real or simulated) is accepted. Drop both snippets on the same page and placing a bid there during the last 30 seconds here will genuinely extend this clock — no wiring required beyond the shared event name.

**Seeing it without waiting**

Waiting a real two minutes to see the mechanic fire isn't a great demo, so a "Simulate a late bid" button fast-forwards the clock into the snipe window and fires the same \`maybeExtend()\` path a real late bid would — with a visible pulse animation and a logged entry, so the extension is never subtle or missable.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 2-minute countdown starts immediately.` },
      { title: 'Click "Simulate a late bid"', text: `The clock jumps into the snipe window and extends.` },
      { title: 'Watch the pulse and log', text: `A visible extension event is recorded with a timestamp.` },
      { title: 'Click it again', text: `Multiple late bids can each extend the deadline further.` },
      { title: 'Pair with the bid ticker snippet', text: `A real bid there fires the same extension here.` },
      { title: 'Let it reach zero', text: `The countdown locks and further bids can't extend it.` },
    ] },
    features: [
      { title: 'Real snipe-window logic', text: `Extends only when a bid lands inside the configured window.` },
      { title: 'Extension applied to the deadline', text: `closesAt itself is pushed back, not just the display.` },
      { title: 'Stacks correctly', text: `Multiple late bids each extend further, like real platforms.` },
      { title: 'Shared auction:bid event', text: `Composable with the companion bid ticker snippet.` },
      { title: 'Visible pulse feedback', text: `An animation marks the moment an extension fires.` },
      { title: 'Timestamped extension log', text: `Every extension is recorded with its trigger reason.` },
      { title: 'One-click simulation', text: `See the mechanic without waiting out the real clock.` },
      { title: 'Closes and locks', text: `No further extensions once the clock hits zero.` },
    ],
    useCases: [
      { title: 'Online auction platforms', text: 'Pair with the [live bid ticker](/ui-snippets/auction-bid-ticker/) so every new bid can extend the closing time, with the shared `auction:bid` event keeping both widgets in sync.' },
      { title: 'Charity and fundraiser bidding', text: 'Prevent unfair last-second wins on donated items by extending the deadline whenever a bid lands inside the configured snipe window.' },
      { title: 'Limited ticket and allocation drops', text: 'Extend a claim window while demand is still arriving, so a late rush is handled fairly instead of cutting off the people already mid-checkout.' },
      { title: 'Domain name and memorabilia auctions', text: 'Meet the familiar anti-sniping expectation of bidders, where `closesAt` itself is pushed back and multiple late bids each extend the close further.' },
      { title: 'Flash-sale countdowns', text: 'Adapt the extension trigger to a high-demand sale, changing `SNIPE_WINDOW_MS` and the extension length to suit how long buyers need to finish.' },
      { icon: 'CODE', title: 'Related: Insurance Claim Status Tracker', desc: 'See the [Insurance Claim Status Tracker](/ui-snippets/claim-status-tracker/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is "anti-sniping" and why do auction sites use it?', a: `Sniping is placing a winning bid in the final seconds of an auction, timed so no other bidder has any realistic chance to respond before the clock hits zero. Anti-sniping counters this by automatically extending the close time whenever a bid arrives within a defined window before close, guaranteeing every bidder — even the very last one — leaves time for others to react. eBay is a well-known real-world example of a platform that does exactly this.` },
      { q: 'How is the extension actually applied?', a: `The code adds a fixed number of milliseconds (EXTEND_MS) directly onto the closesAt timestamp itself, not to whatever the countdown display currently shows. Because it modifies the actual deadline, the logic composes correctly if several late bids arrive in a row — each one pushes the true close time further out, matching how real auction platforms behave under a flurry of last-second bids.` },
      { q: 'How does this connect to the bid ticker snippet?', a: `This countdown listens for a window-level auction:bid CustomEvent and runs its snipe-window check against whatever bid triggered it. The companion Live Auction Bid Ticker snippet dispatches that exact same event every time a bid is accepted, so placing both snippets on one page means a real bid there can genuinely extend the deadline here with no additional wiring.` },
      { q: 'Why is there a "simulate a late bid" button?', a: `Waiting out a real countdown to see the extension trigger naturally would make for a poor demo, so the button fast-forwards the internal clock to just inside the snipe window and then runs the exact same extension check a genuine late bid would trigger — including the same visible pulse animation and log entry — so you can see the real mechanic on demand.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep closesAt in a ref (so it isn't reset by re-renders) and drive the displayed minutes/seconds from component state updated by a setInterval or requestAnimationFrame loop. Handle the auction:bid event the same way — either as a raw window listener in a mount effect, or by replacing it with your framework's own event bus if you're avoiding native CustomEvents.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the anti-sniping extension is applied to the closesAt timestamp rather than to the displayed remaining-time value, and why that distinction matters when multiple late bids arrive in quick succession. It's also useful for reasoning about the event-based design — ask why listening for a shared auction:bid CustomEvent is a better composition strategy here than having the countdown and the bid ticker directly call each other's functions. For extensions, ask it to make the snipe window and extend duration configurable per-auction, or to add a maximum total extension cap so the auction can't be extended indefinitely by a bidding war. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "auction countdown with anti-sniping" timer in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A countdown display (minutes:seconds) counting down to a closesAt timestamp, updated on an interval, with tabular-nums styling so digits don't jitter.
- CRITICAL anti-sniping logic: define a SNIPE_WINDOW_MS (e.g. 30000) and an EXTEND_MS (e.g. 60000). Whenever a "bid" event occurs (see below) while the real remaining time (closesAt - Date.now()) is positive but less than SNIPE_WINDOW_MS, add EXTEND_MS directly onto the closesAt timestamp itself (not just the displayed value), so the extension is durable and multiple late bids each extend the deadline further, matching how real auction platforms like eBay implement this.
- Listen for a window-level CustomEvent named "auction:bid" (with bidder/amount/ts in its detail) as the primary trigger for the anti-sniping check, so this countdown can compose with a separate bid-list component that dispatches that same event.
- A "simulate a late bid" button that forces the internal clock to just inside the snipe window (if it isn't already) and then runs the exact same extension check, so the anti-sniping mechanic is visibly demonstrable without waiting out a real countdown.
- Visible feedback when an extension fires (e.g. a brief pulse animation on the clock) and a timestamped log listing each extension event and what triggered it.
- Explain in on-page copy, in plain terms, what anti-sniping is and why real auction sites implement it.
- When the countdown reaches zero, stop the interval, disable further bidding/extension, and show a clear "closed" state.`,
    },
  },
};

export default auctionCountdownTimer;
