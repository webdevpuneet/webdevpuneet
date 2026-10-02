const cryptoPriceTickerCard = {
  id: 'crypto-price-ticker-card',
  title: 'Crypto Price Ticker Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="cpt-card" id="cptCard">
  <div class="cpt-head">
    <div class="cpt-asset">
      <span class="cpt-icon">Ξ</span>
      <div class="cpt-names">
        <span class="cpt-symbol">ETH</span>
        <span class="cpt-name">Ethereum</span>
      </div>
    </div>
    <span class="cpt-change up" id="cptChange">▲ 2.34%</span>
  </div>

  <div class="cpt-price" id="cptPrice">$3,412.58</div>

  <svg class="cpt-spark" id="cptSpark" viewBox="0 0 200 56" preserveAspectRatio="none" aria-hidden="true">
    <polyline id="cptLine" points="" fill="none" stroke="#22c55e" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>

  <div class="cpt-foot">
    <span class="cpt-range">24h range <b id="cptRange">$3,290 – $3,480</b></span>
    <span class="cpt-live"><span class="cpt-dot"></span>Live</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}

.cpt-card{width:100%;max-width:340px;background:linear-gradient(165deg,#151b2c,#0d1120);border:1px solid #202942;border-radius:18px;padding:20px 22px;box-shadow:0 24px 60px rgba(0,0,0,.4);transition:background-color .5s ease}
.cpt-card.flash-up{background-color:rgba(34,197,94,.08)}
.cpt-card.flash-down{background-color:rgba(248,113,113,.08)}

.cpt-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.cpt-asset{display:flex;align-items:center;gap:10px}
.cpt-icon{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#627eea,#3757c7);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff}
.cpt-names{display:flex;flex-direction:column;line-height:1.2}
.cpt-symbol{font-size:14px;font-weight:800;color:#f4f6fb;letter-spacing:.02em}
.cpt-name{font-size:11.5px;color:#7a83a0}

.cpt-change{font-size:12.5px;font-weight:800;padding:5px 10px;border-radius:999px;letter-spacing:.02em;transition:background-color .2s,color .2s}
.cpt-change.up{color:#22c55e;background:rgba(34,197,94,.12)}
.cpt-change.down{color:#f87171;background:rgba(248,113,113,.12)}

.cpt-price{font-size:32px;font-weight:800;color:#fff;letter-spacing:-.01em;margin-bottom:14px;font-variant-numeric:tabular-nums}

.cpt-spark{width:100%;height:56px;display:block;margin-bottom:14px}

.cpt-foot{display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:#7a83a0}
.cpt-range b{color:#c7cde3;font-weight:700}
.cpt-live{display:flex;align-items:center;gap:6px;color:#22c55e;font-weight:700}
.cpt-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 0 rgba(34,197,94,.6);animation:cptPulse 1.8s infinite}
@keyframes cptPulse{
  0%{box-shadow:0 0 0 0 rgba(34,197,94,.55)}
  70%{box-shadow:0 0 0 7px rgba(34,197,94,0)}
  100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}
}`,

  js: `// Simulated live price feed for a single asset. Replace pushPrice's random
// walk with a real websocket/poll handler to drive this with live data.
var basePrice = 3412.58;
var history = [];
var HISTORY_LEN = 24;

var card = document.getElementById('cptCard');
var priceEl = document.getElementById('cptPrice');
var changeEl = document.getElementById('cptChange');
var lineEl = document.getElementById('cptLine');
var rangeEl = document.getElementById('cptRange');

function fmtUsd(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function seed() {
  var p = basePrice;
  for (var i = 0; i < HISTORY_LEN; i++) {
    p += (Math.random() - 0.5) * 12;
    history.push(p);
  }
}

function render(prevPrice) {
  var price = history[history.length - 1];
  var openPrice = history[0];
  var changePct = ((price - openPrice) / openPrice) * 100;
  var up = price >= openPrice;

  priceEl.textContent = fmtUsd(price);
  changeEl.textContent = (up ? '▲ ' : '▼ ') + Math.abs(changePct).toFixed(2) + '%';
  changeEl.classList.toggle('up', up);
  changeEl.classList.toggle('down', !up);
  lineEl.setAttribute('stroke', up ? '#22c55e' : '#f87171');

  var min = Math.min.apply(null, history);
  var max = Math.max.apply(null, history);
  rangeEl.textContent = fmtUsd(min) + ' – ' + fmtUsd(max);

  var w = 200, h = 56, pad = 4;
  var span = (max - min) || 1;
  var pts = history.map(function (v, i) {
    var x = (i / (history.length - 1)) * w;
    var y = h - pad - ((v - min) / span) * (h - pad * 2);
    return x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
  lineEl.setAttribute('points', pts);

  if (prevPrice != null) {
    var flashClass = price >= prevPrice ? 'flash-up' : 'flash-down';
    card.classList.remove('flash-up', 'flash-down');
    // Force reflow so the transition restarts on rapid consecutive ticks.
    void card.offsetWidth;
    card.classList.add(flashClass);
    setTimeout(function () { card.classList.remove(flashClass); }, 480);
  }
}

function tick() {
  var prev = history[history.length - 1];
  var next = prev + (Math.random() - 0.48) * 14;
  history.push(next);
  if (history.length > HISTORY_LEN) history.shift();
  render(prev);
}

seed();
render(null);
setInterval(tick, 2200);`,

  seo: {
    title: 'Crypto Price Ticker Card — Free Live Price UI with Sparkline',
    description: `A live-feeling crypto price card with a colored 24h change badge, an inline SVG sparkline, and a flash highlight on every simulated price tick. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Crypto Price Ticker Card — Sparkline, Change Badge & Live Tick Flash',
      description: `The crypto price ticker card is the compact asset display that shows up in wallets, exchanges, and dashboards: an icon, a symbol, a big price, a colored change badge, and a tiny trend line, all updating as new prices arrive. This snippet builds one entirely with vanilla JS and inline SVG — no charting library — and simulates a live feed with \`setInterval\` so you can see the flash-on-update behavior without wiring a real websocket.

**A rolling price history array**

A single \`history\` array holds the last 24 simulated prices. Every tick pushes a new price with a small random walk and shifts the oldest one off, so the array always represents a fixed trailing window — the same shape you'd maintain for a real feed, just fed by \`Math.random()\` instead of a websocket message handler.

**The sparkline is a plain polyline, no chart library**

The trend line is one \`<svg>\` with a single \`<polyline>\`. On every render, the history array is mapped to \`x,y\` coordinate pairs — \`x\` spread evenly across the viewBox width, \`y\` scaled between the window's min and max — and joined into the \`points\` attribute. This is the entire "chart": no dependency, no canvas, just a string of coordinates recalculated on each tick. It's the same technique used in [sparkline chart](/ui-snippets/sparkline-chart/) and scales to any small trend indicator.

**Change badge and line color both read the trend**

The 24h change percentage compares the newest price against the oldest price still in the window, and a single \`up\` boolean drives three things at once: the badge's arrow and color, the badge's background tint, and the sparkline's stroke color. Keeping all three tied to one boolean means the card can never show a green badge next to a red line — a common bug when these are computed separately.

**Flash highlight without restarting mid-flash**

Each tick briefly adds a \`flash-up\` or \`flash-down\` class that tints the card's background, then removes it after the CSS transition finishes. Because ticks can arrive before the previous flash clears, the class is removed and a \`void card.offsetWidth\` forces a reflow before re-adding it — this restarts the CSS transition cleanly instead of it silently no-opping on an already-present class.

**A live indicator that reads as "connected"**

A small pulsing dot next to "Live" uses a CSS \`@keyframes\` box-shadow ping, independent of the price ticks — it communicates the feed is active even between updates, the same convention used for a [live visitor counter](/ui-snippets/live-visitor-counter/) or [live currency ticker](/ui-snippets/live-currency-ticker/).

**Wiring it to a real feed**

Replace the \`tick()\` function's random walk with your websocket \`onmessage\` handler (or a polling \`fetch\`) — push the real price into \`history\`, shift if it exceeds the window length, and call \`render(prevPrice)\`. Everything downstream — the sparkline, the badge, the flash, the range — already reacts to whatever is in \`history\`. Pair it with a [wallet card](/ui-snippets/wallet-card/) or [currency converter](/ui-snippets/currency-converter/) for a fuller portfolio view.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A single asset card renders with a starting price and a seeded 24-point history.` },
      { title: 'Watch it tick', text: `Every ~2.2 seconds the price updates, the sparkline redraws, and the card briefly flashes green or red.` },
      { title: 'Read the change badge', text: `It compares the newest price to the oldest in the visible window and colors itself accordingly.` },
      { title: 'Connect a real feed', text: `Replace tick()'s random walk with your websocket or polling handler that pushes real prices into history.` },
      { title: 'Adjust the window', text: `Change HISTORY_LEN to widen or narrow how much trailing history the sparkline shows.` },
      { title: 'Style the asset', text: `Swap the icon gradient, symbol, and name for any asset — everything else adapts automatically.` },
    ] },
    features: [
      { title: 'Pure SVG sparkline', text: `A single polyline recalculated from a rolling price array — no chart library.` },
      { title: 'Simulated live ticks', text: `setInterval drives a random-walk feed so the card updates on its own.` },
      { title: 'Flash-on-update', text: `A brief background tint on every tick, restarted cleanly via forced reflow.` },
      { title: 'One boolean drives color', text: `Badge and sparkline stroke both follow the same up/down flag — never mismatched.` },
      { title: 'Rolling history window', text: `A fixed-length array shifts old points as new ones arrive.` },
      { title: 'Live pulse indicator', text: `An independent CSS-only pulsing dot signals an active connection.` },
      { title: '24h range readout', text: `Min and max of the visible window computed on every render.` },
      { title: 'Tabular numerals', text: `font-variant-numeric keeps the price from jittering horizontally as digits change.` },
    ],
    useCases: [
      { title: 'Crypto dashboards', text: 'Show live asset prices alongside a [wallet card](/ui-snippets/wallet-card/), with a coloured 24 hour change badge and an inline SVG sparkline.' },
      { title: 'Exchange watchlists', text: 'Stack several ticker cards in a grid, each flashing a brief background tint on every simulated tick via a forced reflow restart.' },
      { title: 'Portfolio summaries', text: 'Pair with a [currency converter](/ui-snippets/currency-converter/) to show holdings in a chosen currency, with one boolean driving badge and line colour.' },
      { title: 'Trading widgets', text: 'Embed beside an [area chart](/ui-snippets/area-chart/) for a fuller price view, with the sparkline a single polyline rebuilt from a rolling price array.' },
      { title: 'Landing page proof points', text: 'Add a live-feeling ticker to a marketing page, built from a random-walk feed and learn how to draw sparklines without any charting library.' },
      { icon: 'CODE', title: 'Related: Live Edit Presence', desc: 'See the [Live Edit Presence](/ui-snippets/live-edit-presence/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the sparkline drawn without a charting library?', a: `The rolling history array is mapped to x,y coordinate pairs on every render — x spread evenly across the SVG viewBox width, y scaled between the window's current min and max — and joined into a single polyline's points attribute. There is no canvas and no dependency; it's a plain SVG element whose points string is recalculated each tick.` },
      { q: 'How do I connect this to a real price feed?', a: `Replace the body of tick() with your websocket onmessage handler or a polling fetch. Push the new real price into the history array, shift() the oldest entry once it exceeds HISTORY_LEN, and call render(prevPrice) with the previous price for the flash comparison. Every other part of the card — sparkline, badge, range — already reacts to whatever is in history.` },
      { q: 'Why does the flash sometimes not restart on rapid ticks?', a: `Toggling a CSS class that is already present does not restart its transition. The fix used here is to remove the class, force a synchronous reflow with void card.offsetWidth, then re-add the class — this guarantees the browser treats it as a fresh transition even if ticks arrive faster than the previous flash finished fading.` },
      { q: 'How is the 24h change percentage calculated?', a: `It compares the newest price (the last entry in the history array) against the oldest price still in the window (the first entry) as a percentage: (newest - oldest) / oldest * 100. Because history is a fixed-length rolling window, this approximates a trailing-window change rather than a true calendar-day change — swap in a stored 24h-ago price for exact accuracy.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep history in component state (a fixed-length array), update it on an interval or feed callback, and derive price, change percentage, and the polyline points string in a render/computed function. The SVG and CSS port unchanged; only the setInterval-driven mutation moves into the framework's state and lifecycle.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the sparkline math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the rolling history array is mapped into SVG polyline coordinates, and why scaling y between the window's own min and max (rather than a fixed range) keeps the sparkline visually meaningful as the price drifts over time. The same assistant can help optimize it — asking whether the flash-restart technique using a forced reflow is the right approach if ticks can arrive faster than the CSS transition duration, or whether the change percentage should be computed against a true 24-hours-ago price instead of the oldest point in a rolling window. It's also useful for extending the card: ask it to add multiple assets in a scrollable list, wire tick() to a real websocket feed, or add a tap-to-expand state that reveals a larger chart. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "crypto price ticker card" in plain HTML, CSS, and JavaScript with no library or CDN dependency.

Requirements:
- A card showing an asset icon, symbol, and name, a large current price, and a colored 24h change badge (green with an up arrow, red with a down arrow) driven by a single boolean so the badge and any trend indicator never disagree on direction.
- An inline SVG sparkline built from a single polyline element whose points attribute is recalculated from a fixed-length rolling array of recent prices — map each price to an x,y pair (x spread evenly across the viewBox width, y scaled between the window's own current min and max) — no canvas element and no charting library.
- Simulate a live feed with setInterval: every ~2 seconds, push a new price onto the history array using a small random walk, drop the oldest entry once the array exceeds a fixed window length, then re-render the price, change badge, sparkline, and a 24h min/max range readout.
- On every price update, briefly flash the card's background green or red depending on whether the price went up or down, and make sure the flash restarts cleanly even if a new tick arrives before the previous flash animation finished (hint: removing then re-adding the CSS class alone won't restart an in-progress transition — you need to force a reflow in between).
- Add a small independent "Live" indicator with a CSS-only pulsing dot animation that runs continuously regardless of the price ticks, to visually communicate the feed is connected.
- Use tabular/monospaced numeral styling on the price so digit changes don't cause horizontal jitter.`,
    },
  },
};

export default cryptoPriceTickerCard;
