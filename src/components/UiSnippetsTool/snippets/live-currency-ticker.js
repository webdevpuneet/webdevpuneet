const liveCurrencyTicker = {
  id: 'live-currency-ticker',
  title: 'Live Currency Ticker',
  lastmod: '2026-06-20',
  category: 'dashboards',
  html: `<div class="lct-card">
  <div class="lct-head">
    <span class="lct-dot"></span> Live rates
  </div>
  <div class="lct-track-wrap">
    <div class="lct-track" id="lctTrack"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.lct-card{background:#111827;border:1px solid #1f2937;border-radius:16px;padding:16px 0;width:100%;max-width:640px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,.45)}
.lct-head{display:flex;align-items:center;gap:7px;padding:0 18px 12px;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em}
.lct-dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 0 0 rgba(52,211,153,.6);animation:lctPulse 1.6s ease-out infinite}
@keyframes lctPulse{0%{box-shadow:0 0 0 0 rgba(52,211,153,.5)}70%{box-shadow:0 0 0 7px rgba(52,211,153,0)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}

.lct-track-wrap{position:relative;mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.lct-track{display:flex;gap:28px;white-space:nowrap;will-change:transform}

.lct-item{display:flex;align-items:baseline;gap:8px;flex-shrink:0;padding:0 4px}
.lct-pair{font-size:13px;font-weight:800;color:#f8fafc}
.lct-price{font-size:13px;font-weight:700;color:#cbd5e1;font-variant-numeric:tabular-nums;transition:color .25s}
.lct-change{font-size:11.5px;font-weight:700;font-variant-numeric:tabular-nums}
.lct-change.up{color:#34d399}
.lct-change.down{color:#f87171}
.lct-flash-up{animation:lctFlashUp .5s ease}
.lct-flash-down{animation:lctFlashDown .5s ease}
@keyframes lctFlashUp{0%{color:#34d399}100%{color:#cbd5e1}}
@keyframes lctFlashDown{0%{color:#f87171}100%{color:#cbd5e1}}`,

  js: `var PAIRS = [
  { pair: 'BTC/USD', price: 67340.12, base: 67340.12 },
  { pair: 'ETH/USD', price: 3512.88, base: 3512.88 },
  { pair: 'EUR/USD', price: 1.0842, base: 1.0842 },
  { pair: 'GBP/USD', price: 1.2715, base: 1.2715 },
  { pair: 'USD/JPY', price: 156.32, base: 156.32 },
  { pair: 'SOL/USD', price: 168.47, base: 168.47 },
  { pair: 'AUD/USD', price: 0.6628, base: 0.6628 },
];

var track = document.getElementById('lctTrack');
var offset = 0;
var SPEED = 0.4; // px per frame

function decimalsFor(price) { return price > 100 ? 2 : 4; }

function buildItems() {
  var html = PAIRS.map(function (p, i) {
    var change = ((p.price - p.base) / p.base) * 100;
    var dir = change >= 0 ? 'up' : 'down';
    return '<span class="lct-item" data-i="' + i + '">' +
      '<span class="lct-pair">' + p.pair + '</span>' +
      '<span class="lct-price" id="lctPrice' + i + '">' + p.price.toFixed(decimalsFor(p.price)) + '</span>' +
      '<span class="lct-change ' + dir + '" id="lctChange' + i + '">' + (change >= 0 ? '▲' : '▼') + ' ' + Math.abs(change).toFixed(2) + '%</span>' +
    '</span>';
  }).join('');
  // Duplicate the list so the marquee loops seamlessly.
  track.innerHTML = html + html;
}

function tickPrices() {
  PAIRS.forEach(function (p, i) {
    var drift = (Math.random() - 0.5) * (p.price * 0.0009);
    p.price = Math.max(0.0001, p.price + drift);
    var change = ((p.price - p.base) / p.base) * 100;
    var dir = change >= 0 ? 'up' : 'down';

    // Both marquee copies share the same ids, so a single querySelectorAll updates them together.
    document.querySelectorAll('[id="lctPrice' + i + '"]').forEach(function (el) {
      el.textContent = p.price.toFixed(decimalsFor(p.price));
      el.classList.remove('lct-flash-up', 'lct-flash-down');
      void el.offsetWidth;
      el.classList.add(drift >= 0 ? 'lct-flash-up' : 'lct-flash-down');
    });
    document.querySelectorAll('[id="lctChange' + i + '"]').forEach(function (el) {
      el.className = 'lct-change ' + dir;
      el.textContent = (change >= 0 ? '▲ ' : '▼ ') + Math.abs(change).toFixed(2) + '%';
    });
  });
}

function animate() {
  offset -= SPEED;
  var half = track.scrollWidth / 2;
  if (Math.abs(offset) >= half) offset += half;
  track.style.transform = 'translateX(' + offset + 'px)';
  requestAnimationFrame(animate);
}

buildItems();
requestAnimationFrame(animate);
setInterval(tickPrices, 1500);

document.querySelector('.lct-card').addEventListener('mouseenter', function () { SPEED = 0; });
document.querySelector('.lct-card').addEventListener('mouseleave', function () { SPEED = 0.4; });`,

  seo: {
    title: 'Live Currency Ticker — Scrolling Rates HTML CSS JS',
    description: `A scrolling currency/crypto ticker with simulated live price drift, flash-on-change colors, and a seamless looping marquee. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Live Currency Ticker — Seamless Marquee, Simulated Live Drift & Flash-on-Change',
      description: `A scrolling rates ticker is the visual shorthand for "this data is live" — banks, exchanges, and finance dashboards all use one because a static price table doesn't communicate motion the way a marquee does. This snippet builds a seamless, infinitely scrolling ticker in plain HTML, CSS, and vanilla JavaScript, with simulated price drift and a flash animation on every change.

**A seamless loop via duplicated content**

\`buildItems()\` renders the pair list once into a string, then sets the track's \`innerHTML\` to that string *twice* concatenated. The marquee then only needs to scroll exactly half of the track's total \`scrollWidth\` before resetting the offset — because the second half is an identical copy, the reset is invisible to the eye. This is the standard trick for an infinite marquee without cloning DOM nodes on every frame.

**requestAnimationFrame, not CSS animation**

The scroll position is driven by \`requestAnimationFrame\`, decrementing an \`offset\` variable by a fixed speed each frame and applying it via \`transform: translateX()\`. Using JS instead of a CSS \`@keyframes\` marquee makes the loop point exact (tied to the real measured \`scrollWidth\`, not a guessed percentage) and makes pausing trivial: hovering the card sets \`SPEED\` to zero, and the next frame simply stops advancing — no animation-play-state juggling needed.

**Simulated live price drift**

Every 1.5 seconds, \`tickPrices()\` nudges each pair's price by a small random delta (roughly ±0.045% of its value) and recomputes the percent change against a fixed \`base\` price captured at load. This produces a realistic-looking tape without a real market-data feed — replace the random drift with your actual price source and the rendering stays identical.

**Flash-on-change feedback**

When a price updates, its color flashes green or red via a CSS \`@keyframes\` animation (\`lct-flash-up\`/\`lct-flash-down\`) that fades back to neutral gray, the same up/down-tick feedback real trading tickers use. The class is removed and immediately re-added with a forced reflow (\`void el.offsetWidth\`) so the flash retriggers even if the price moves in the same direction twice in a row — without the reflow, a repeated class add wouldn't restart the CSS animation.

**Querying by duplicated id**

Because the pair list is rendered twice for the seamless loop, both copies share the same element ids; \`tickPrices()\` updates *both* copies in one pass with \`document.querySelectorAll('[id="…"]')\`, since a duplicate id is invalid HTML but still queryable this way — a deliberate, documented trade-off for the marquee trick, not an accident. Keep this in mind if you extend the ticker: any new per-pair element should be queried the same way, by id across both copies, rather than assuming a single match.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark ticker bar appears with a "Live rates" pulsing dot and a row of currency/crypto pairs scrolling right to left.` },
      { title: 'Watch prices update', text: `Every 1.5 seconds, each price nudges up or down slightly and flashes green or red, with the percent change updating beside it.` },
      { title: 'Hover to pause', text: `Moving your mouse over the ticker stops the scroll so you can read a specific rate; moving away resumes it.` },
      { title: 'Watch the seamless loop', text: `The ticker never visibly jumps or resets — the track scrolls through a duplicated copy of the list and wraps invisibly.` },
      { title: 'Edit the pairs', text: `Change the PAIRS array's pair names and starting prices, then call buildItems() to rebuild the ticker with your data.` },
      { title: 'Plug in real market data', text: `Replace the random drift in tickPrices() with prices from a real feed (WebSocket or polling fetch), keeping the same DOM update calls.` },
    ] },
    features: [
      { title: 'Seamless infinite marquee', text: `The pair list is duplicated once so the scroll loop resets invisibly at the halfway point of the track's measured width.` },
      { title: 'requestAnimationFrame-driven scroll', text: `JS-driven transform animation gives an exact, measured loop point and trivial hover-to-pause behavior.` },
      { title: 'Simulated live price drift', text: `Each pair nudges by a small random delta every 1.5s, producing a realistic-looking tape without a real feed.` },
      { title: 'Flash-on-change color feedback', text: `Prices flash green or red via a CSS keyframe animation, with a forced reflow so repeated same-direction moves still retrigger it.` },
      { title: 'Live percent change vs. a fixed base', text: `Each pair tracks a captured base price so the percent change reflects total movement since load, not just the last tick.` },
      { title: 'Hover-to-pause', text: `Hovering the ticker sets the scroll speed to zero for easy reading, resuming on mouse-leave.` },
      { title: 'Edge fade mask', text: `A CSS mask-image fades the ticker's left and right edges so items don't appear to clip abruptly.` },
      { title: 'Pulsing "live" indicator dot', text: `A small green dot pulses continuously to reinforce that the data is live, independent of the price ticks.` },
    ],
    useCases: [
      { title: 'Crypto and forex dashboards', text: `The header ticker for a trading platform or exchange landing page — pair with a [candlestick chart](/ui-snippets/candlestick-chart/) for the detail view.` },
      { title: 'Financial news sites', text: `A scrolling market-summary bar above or below the fold on a news or finance media site.` },
      { title: 'Stock and index tickers', text: `Swap the pairs for stock symbols and indices — the same drift, flash, and marquee logic applies unchanged.` },
      { title: 'Fintech marketing pages', text: `An eye-catching, motion-driven proof of "real-time data" for a trading app's landing page.` },
      { title: 'Internal finance dashboards', text: `Show live FX rates for a multi-currency invoicing or payroll tool's header bar.` },
      { title: 'Learning seamless marquee technique', text: `A clear, reusable reference for the duplicate-content infinite-scroll trick — compare with a [logo cloud](/ui-snippets/logo-cloud/) for a non-data marquee variant.` },
      { icon: 'CODE', title: 'Related: New Hire Day-One Checklist', desc: 'See the [New Hire Day-One Checklist](/ui-snippets/onboarding-day-one-checklist/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real exchange-rate or crypto feed?', a: `Open a WebSocket (or poll a REST endpoint) for your provider, and on each price update find the matching pair in PAIRS by symbol, set its .price, and call the same DOM-update block tickPrices() uses (or call tickPrices() itself if your update cadence matches) — the marquee and flash logic don't need to change.` },
      { q: 'How do I change the scroll speed or direction?', a: `Edit the SPEED constant (px per frame) for speed — larger is faster. To scroll right-to-left instead of left-to-right, increment offset instead of decrementing it in the animate() function.` },
      { q: 'Why are there two copies of the same pair list in the DOM?', a: `Duplicating the list is what makes the marquee loop seamless: the track only needs to scroll exactly half its total width before resetting, and because the second half is identical to the first, the reset is invisible. This means both copies share element ids, which tickPrices() updates together via a single querySelectorAll call.` },
      { q: 'How do I pause the ticker on mobile (no hover)?', a: `Add a touchstart listener that sets SPEED to 0 and a touchend listener that restores it, mirroring the existing mouseenter/mouseleave handlers, since touch devices have no hover state.` },
      { q: 'How do I use this currency ticker in React, Vue, or Angular?', a: `In React, drive the offset with useRef and a requestAnimationFrame loop inside useEffect, storing prices in state updated on an interval; in Vue, use ref()/onMounted with the same rAF loop; in Angular, use ngZone.runOutsideAngular for the animation loop to avoid unnecessary change-detection cycles. The duplicate-content seamless-loop technique applies in every framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the duplicated-id querying trick on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why tickPrices() uses document.querySelectorAll('[id="lctPrice' + i + '"]') instead of getElementById, and how that connects to the track being built from two concatenated copies of the same HTML string. The same assistant can help optimize it, for instance asking whether updating both duplicate DOM nodes on every 1.5-second tick could be replaced with CSS custom properties or a single source-of-truth render to cut DOM writes in half. It is also useful for extending the ticker: ask it to wire tickPrices to a real WebSocket feed, add a per-pair click handler that opens a detail chart, or support a vertical ticker layout for a sidebar widget. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "live currency ticker" marquee in plain HTML, CSS, and JavaScript with no libraries, using requestAnimationFrame for the scroll (not a CSS keyframe animation).

Requirements:
- A horizontal track built from an array of currency/crypto pair objects, each with a pair name, a current price, and a fixed base price captured once at load for computing percent change.
- Render the full pair list into the track's innerHTML, then concatenate that same HTML string to itself so the track contains exactly two identical copies back to back, enabling a seamless loop.
- Drive the scroll with requestAnimationFrame: decrement a numeric offset each frame by a fixed pixel speed, apply it via transform: translateX(), and once the absolute offset reaches or exceeds half of the track's measured scrollWidth, add that half-width back to the offset so the reset is invisible.
- Every 1.5 seconds, nudge each pair's price by a small random percentage delta, recompute its percent change against the fixed base price, and update both duplicate copies of that pair's price and change elements in one pass (since both copies share the same element id, a single querySelectorAll by that id must update both).
- On each price update, remove and immediately re-add a flash CSS class (forcing a reflow in between) so a brief color flash animation retriggers every time, even if the price moves in the same direction on consecutive ticks.
- Hovering the ticker card must set the scroll speed to zero so the whole track visibly freezes, and moving the mouse away must resume the original speed.
- Apply a CSS mask-image gradient across the track's container so pairs fade in and out at the left and right edges instead of clipping abruptly.`,
    },
  },
};

export default liveCurrencyTicker;
