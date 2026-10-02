const auctionBidTicker = {
  id: 'auction-bid-ticker',
  title: 'Live Auction Bid Ticker',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="abt-wrap">
  <span class="abt-tag">live auction</span>
  <h1>Vintage Leica M6 — Bidding</h1>

  <div class="abt-highest">
    <span class="abt-highest-label">Current highest bid</span>
    <span class="abt-highest-amount" id="abtHighest">$420</span>
    <span class="abt-highest-bidder" id="abtHighestBidder">by j_collector</span>
  </div>

  <div class="abt-bidbox">
    <div class="abt-input-row">
      <span class="abt-dollar">$</span>
      <input type="number" id="abtBidInput" class="abt-input" step="5" />
    </div>
    <button class="abt-btn" id="abtBidBtn">Place bid</button>
  </div>
  <p class="abt-hint" id="abtHint">Minimum bid: $430 (increment of $10)</p>

  <div class="abt-log-head">Bid history</div>
  <ul class="abt-log" id="abtLog"></ul>

  <p class="abt-cross">See it paired with <a href="/ui-snippets/auction-countdown-timer/">Auction Countdown with Anti-Sniping</a> for the closing-time mechanic.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#241608,#0c0704 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.abt-wrap{width:100%;max-width:480px}
.abt-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.abt-wrap h1{font-size:clamp(20px,4.5vw,26px);font-weight:800;letter-spacing:-.02em;margin-bottom:18px}
.abt-highest{display:flex;flex-direction:column;align-items:center;gap:2px;padding:22px;border-radius:16px;background:linear-gradient(160deg,#2e1c0a,#160d04);border:1px solid rgba(251,191,36,.3);margin-bottom:18px;text-align:center}
.abt-highest-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#c9a566}
.abt-highest-amount{font-size:42px;font-weight:800;color:#fbbf24;line-height:1.2}
.abt-highest-bidder{font-size:12.5px;color:#a08653}
.abt-bidbox{display:flex;gap:10px;margin-bottom:6px}
.abt-input-row{flex:1;display:flex;align-items:center;background:#160d04;border:1px solid rgba(251,191,36,.3);border-radius:10px;padding:0 12px}
.abt-dollar{color:#c9a566;font-weight:700;margin-right:4px}
.abt-input{flex:1;background:transparent;border:none;color:#fff;font:600 16px system-ui;padding:11px 0}
.abt-input:focus{outline:none}
.abt-btn{padding:0 20px;border-radius:10px;border:none;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1a1103;font:700 13px system-ui;cursor:pointer}
.abt-btn:hover:not(:disabled){filter:brightness(1.06)}
.abt-btn:disabled{opacity:.4;cursor:not-allowed}
.abt-hint{font-size:11.5px;color:#8a7248;margin-bottom:18px}
.abt-hint.error{color:#f87171}
.abt-log-head{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a7248;margin-bottom:8px}
.abt-log{list-style:none;max-height:220px;overflow-y:auto;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:#160d04}
.abt-log li{padding:11px 14px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;color:#e9d9b8}
.abt-log li:last-child{border-bottom:none}
.abt-log li:first-child{background:rgba(251,191,36,.06)}
.abt-log li small{display:block;color:#8a7248;font-size:10.5px;margin-top:2px}
.abt-cross{font-size:11.5px;color:#6b5836;margin-top:16px;text-align:center}
.abt-cross a{color:#fbbf24}`,

  js: `var highestEl = document.getElementById('abtHighest');
var highestBidderEl = document.getElementById('abtHighestBidder');
var bidInput = document.getElementById('abtBidInput');
var bidBtn = document.getElementById('abtBidBtn');
var hintEl = document.getElementById('abtHint');
var logEl = document.getElementById('abtLog');

var INCREMENT = 10;
var bids = [
  { bidder: 'j_collector', amount: 420, ts: Date.now() - 1000 * 60 * 4 },
  { bidder: 'lens_hunter', amount: 385, ts: Date.now() - 1000 * 60 * 9 },
  { bidder: 'retro_optics', amount: 350, ts: Date.now() - 1000 * 60 * 14 },
];
var YOU_NAME = 'you';

function highestBid() {
  return bids[0];
}

function minNextBid() {
  return highestBid().amount + INCREMENT;
}

function fmtTime(ts) {
  var diff = Math.max(0, Date.now() - ts);
  var mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins === 1) return '1 min ago';
  return mins + ' min ago';
}

function render() {
  var top = highestBid();
  highestEl.textContent = '$' + top.amount.toLocaleString();
  highestBidderEl.textContent = 'by ' + top.bidder;

  logEl.innerHTML = '';
  bids.forEach(function (b) {
    var li = document.createElement('li');
    li.innerHTML = '<span>' + b.bidder + '<small>' + fmtTime(b.ts) + '</small></span><span>$' + b.amount.toLocaleString() + '</span>';
    logEl.appendChild(li);
  });

  bidInput.value = minNextBid();
  hintEl.textContent = 'Minimum bid: $' + minNextBid().toLocaleString() + ' (increment of $' + INCREMENT + ')';
  hintEl.classList.remove('error');
}

function validateInput() {
  var val = Number(bidInput.value);
  var min = minNextBid();
  if (!val || isNaN(val) || val < min) {
    bidBtn.disabled = true;
    hintEl.classList.add('error');
    hintEl.textContent = 'Bid must be at least $' + min.toLocaleString() + ' (current bid + $' + INCREMENT + ' increment).';
  } else {
    bidBtn.disabled = false;
    hintEl.classList.remove('error');
    hintEl.textContent = 'Minimum bid: $' + min.toLocaleString() + ' (increment of $' + INCREMENT + ')';
  }
}

bidInput.addEventListener('input', validateInput);

bidBtn.addEventListener('click', function () {
  var val = Number(bidInput.value);
  var min = minNextBid();
  if (!val || isNaN(val) || val < min) { validateInput(); return; }

  bids.unshift({ bidder: YOU_NAME, amount: val, ts: Date.now() });
  render();

  // Notify anything listening for a fresh bid (e.g. the companion
  // "auction-countdown-timer" snippet's anti-sniping extension logic) via a
  // custom DOM event carrying the bid detail.
  window.dispatchEvent(new CustomEvent('auction:bid', { detail: { bidder: YOU_NAME, amount: val, ts: Date.now() } }));
});

// A light simulated "other bidder" every so often, so the ticker feels
// alive even without real backend data — this is presentational only and
// clearly distinguishable in the log by bidder name.
var rivalNames = ['m_vintage', 'shutter_sam', 'film_no_filter', 'analog_annie'];
setInterval(function () {
  if (Math.random() > 0.35) return;
  var name = rivalNames[Math.floor(Math.random() * rivalNames.length)];
  var amount = minNextBid() + Math.round(Math.random() * 2) * INCREMENT;
  bids.unshift({ bidder: name, amount: amount, ts: Date.now() });
  render();
  window.dispatchEvent(new CustomEvent('auction:bid', { detail: { bidder: name, amount: amount, ts: Date.now() } }));
}, 8000);

render();`,

  seo: {
    title: 'Live Auction Bid Ticker — Free Increment-Validated Bidding UI',
    description: `A live auction bid list with a prominent current-highest display and a "Place bid" flow that enforces a real minimum-increment rule, disabling invalid bids automatically. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Live Auction Bid Ticker — Increment Rules Enforced, Not Just Displayed',
      description: `This snippet builds the core interaction of any live auction UI: a running bid history, a prominent current-highest amount, and a bid box that won't let you submit an amount that isn't actually a valid raise. The validation isn't cosmetic — it's the same logic real auction platforms run before ever accepting a bid.

**The minimum-increment rule**

Every auction defines an increment — the smallest amount a new bid must exceed the current highest by (here, a flat $10, though real platforms often scale the increment with price tier). \`minNextBid()\` computes \`highestBid().amount + INCREMENT\` fresh every time the bid list changes, and the input is pre-filled with that exact value so a bidder rarely has to think about the math. Typing anything below it disables the "Place bid" button and turns the hint text into a visible error explaining exactly why.

**Highest bid, always current**

Bids are kept sorted with the newest/highest at \`bids[0]\` (new bids are \`unshift\`'d in, and since every accepted bid must exceed the prior highest, the array stays correctly ordered without a separate sort step). The prominent amount at the top of the card always reads directly from \`highestBid()\`, so it can never drift out of sync with the log beneath it.

**A believable, honest simulated feed**

A live auction ticker without any competing activity feels dead, so this demo periodically injects a simulated rival bid — clearly using distinct placeholder bidder names, at a valid increment above the current price, through the exact same \`bids.unshift\` + \`render()\` path a real bid takes. It's presentational, and openly so, not a fake "AI-powered demand" trick.

**A hook for related demos**

Every accepted bid — yours or simulated — dispatches a custom \`auction:bid\` DOM event carrying the bidder, amount, and timestamp. That's the same event shape the companion [Auction Countdown with Anti-Sniping](/ui-snippets/auction-countdown-timer/) snippet listens for to trigger its closing-time extension, so the two snippets are built to compose into one auction page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A bid list and highest-bid card render with sample data.` },
      { title: 'Check the pre-filled amount', text: `The input defaults to the exact minimum valid bid.` },
      { title: 'Type a low amount', text: `The button disables and an error explains the increment rule.` },
      { title: 'Click "Place bid"', text: `Your bid appears at the top of the log instantly.` },
      { title: 'Watch for rival bids', text: `A simulated competing bid arrives periodically.` },
      { title: 'Pair with the countdown', text: `Both snippets share the auction:bid custom event.` },
    ] },
    features: [
      { title: 'Real increment validation', text: `Bids below current + increment are rejected in the UI.` },
      { title: 'Auto-filled minimum', text: `The input starts at the exact valid next amount.` },
      { title: 'Prominent highest bid', text: `Always reads live from the sorted bid list.` },
      { title: 'Disabled-state guard', text: `The submit button can't fire an invalid bid.` },
      { title: 'Relative timestamps', text: `"X min ago" formatting for each log entry.` },
      { title: 'Simulated rival activity', text: `Honest, clearly-labeled competing bids.` },
      { title: 'Custom auction:bid event', text: `Composable with related auction snippets.` },
      { title: 'Scrollable capped log', text: `Full bid history stays reviewable.` },
    ],
    useCases: [
      { title: 'Live auction platforms', text: 'Pair the bid list with an [auction countdown timer](/ui-snippets/auction-countdown-timer/) to build a complete auction page, with the current highest bid always read live from the sorted list.' },
      { title: 'Charity and fundraiser bidding', text: 'Enforce fair raises on donated items: bids below the current amount plus the increment are rejected, and the input starts at the exact valid next amount.' },
      { title: 'Sneaker and collectible drops', text: 'Allocate limited items by bid rather than first-come-first-served, with a disabled submit button guarding against invalid or accidental bids.' },
      { title: 'Estate sale platforms', text: 'Run item-by-item competitive bidding with a running history, so every participant sees the same prominent highest figure.' },
      { title: 'B2B reverse auctions', text: 'Adapt the increment rule for descending bids, where suppliers undercut each other, by flipping the comparison in the validation function.' },
      { icon: 'CODE', title: 'Related: Insurance Claim Status Tracker', desc: 'See the [Insurance Claim Status Tracker](/ui-snippets/claim-status-tracker/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the minimum next bid calculated?', a: `minNextBid() takes the current highest bid amount (the first item in the sorted bids array) and adds a fixed increment (here $10). That value is recomputed every time the bid list changes and is used both to pre-fill the input field and to validate whatever the user types before enabling the submit button.` },
      { q: 'What stops someone from submitting a bid below the minimum?', a: `The input's value is checked on every keystroke via an input event listener. If the typed amount is not a valid number or is below the current minimum, the "Place bid" button is disabled via the disabled attribute and the hint text switches to a visible error state — the click handler also re-validates defensively before accepting any bid.` },
      { q: 'Are the extra bids from other users real?', a: `No, and the demo doesn't claim otherwise — a periodic timer occasionally injects a simulated competing bid from one of a few clearly fictional placeholder names, at a valid increment above the current price, purely so the ticker feels like a live auction rather than a static list. It goes through the exact same code path a real bid would.` },
      { q: 'How does this connect to the countdown timer snippet?', a: `Every accepted bid — from the user or the simulated feed — dispatches a window-level auction:bid CustomEvent carrying the bidder, amount, and timestamp. The companion Auction Countdown with Anti-Sniping snippet listens for that same event to trigger its closing-time extension logic, so the two are designed to be dropped onto the same page together.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the bids array in component state (sorted with the newest highest bid first), derive the highest bid and minimum next bid from it with simple selectors, and validate the input against that derived minimum on each change. Dispatch or replace the custom event with your framework's own event bus or state store if you need cross-component communication instead of a raw DOM CustomEvent.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the bid list is kept sorted by always unshifting a new highest bid rather than re-sorting the whole array on every change, and what would break if a bid below the current highest were ever allowed through. It's also useful for reasoning about the validation flow — ask why the button is disabled proactively based on live input rather than only rejecting on click, and why the click handler still re-validates instead of trusting the disabled state alone. For extensions, ask it to add a "you've been outbid" notification when a rival bid surpasses the user's last bid, or a percentage-based increment instead of a flat dollar amount for higher price tiers. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "live auction bid ticker" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A prominent "current highest bid" display (amount + bidder name) always reflecting the top of a bids array, plus a scrollable bid history log below it (newest first) with relative "X min ago" timestamps.
- A bid input pre-filled with the exact minimum valid next bid (current highest + a fixed increment, e.g. $10) and a "Place bid" button.
- CRITICAL validation: as the user types, disable the "Place bid" button whenever the entered amount is not a number or is below the current minimum (current highest + increment), and show a visible error hint explaining the rule. Re-validate defensively in the click handler too, and only accept/append the bid if it's actually valid.
- New valid bids should be added to the top of the bids array (kept in descending order) and the UI (highest display, log, and pre-filled minimum) should update immediately.
- Include a periodic (e.g. every ~8 seconds, with some randomness) SIMULATED competing bid from a small pool of clearly fictional placeholder bidder names, injected at a valid increment above the current price through the same code path as a real bid, so the ticker feels alive — make sure this is honest/obviously simulated, not misrepresented as real user activity.
- Dispatch a window-level CustomEvent named "auction:bid" with { bidder, amount, ts } in its detail whenever any bid (user or simulated) is accepted, so the ticker can compose with a separate countdown-timer component that listens for the same event.`,
    },
  },
};

export default auctionBidTicker;
