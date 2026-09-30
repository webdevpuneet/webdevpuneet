const liveMarketWatchlistTable = {
  id: 'live-market-watchlist-table',
  title: 'Live Market Watchlist Table',
  category: 'tables',
  html: `<div class="wrap">
  <div class="table-head">
    <h2 class="table-title">Watchlist</h2>
    <span class="live-dot"><i></i>Live</span>
  </div>
  <div class="table-scroll">
    <table class="tbl">
      <thead>
        <tr>
          <th>Symbol</th>
          <th class="num">Price</th>
          <th class="num">24h change</th>
          <th class="spark-col">Trend</th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 32px 20px; }

.wrap { max-width: 640px; margin: 0 auto; }
.table-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.table-title { font-size: 18px; font-weight: 800; color: #0f172a; }
.live-dot { display: flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 700; color: #16a34a; }
.live-dot i { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; display: block; animation: live-blink 1.6s ease-in-out infinite; }
@keyframes live-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.table-scroll { overflow-x: auto; border-radius: 12px; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
.tbl { width: 100%; border-collapse: collapse; background: #fff; }
.tbl thead tr { background: #f8fafc; }
.tbl th { padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; border-bottom: 1px solid #e2e8f0; }
.tbl th.num, .tbl td.num { text-align: right; }
.spark-col { width: 96px; }
.tbl td { padding: 11px 14px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; color: #334155; vertical-align: middle; transition: background-color 0.5s ease; }
.tbl tbody tr:last-child td { border-bottom: none; }
.tbl tbody tr.flash-up td { background-color: rgba(34,197,94,0.14); }
.tbl tbody tr.flash-down td { background-color: rgba(239,68,68,0.14); }

.sym-name { font-weight: 700; color: #0f172a; }
.sym-full { font-size: 11px; color: #94a3b8; margin-top: 1px; }
.price-val { font-weight: 700; color: #0f172a; font-variant-numeric: tabular-nums; }
.chg-val { font-weight: 700; font-variant-numeric: tabular-nums; display: inline-flex; align-items: center; gap: 3px; justify-content: flex-end; }
.chg-val.up { color: #16a34a; }
.chg-val.down { color: #dc2626; }
.chg-arrow { font-size: 10px; }

.spark { display: block; }`,
  js: `let ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin',   price: 64280.50, history: [63100, 63400, 63950, 63700, 64010, 64280] },
  { symbol: 'ETH', name: 'Ethereum',  price: 3142.80,  history: [3190, 3175, 3120, 3145, 3130, 3142.80] },
  { symbol: 'SOL', name: 'Solana',    price: 148.62,   history: [140.2, 142.8, 145.1, 146.9, 147.5, 148.62] },
  { symbol: 'AAPL', name: 'Apple Inc', price: 227.14,  history: [225.6, 226.1, 226.8, 227.4, 226.9, 227.14] },
];
const basePrices = ASSETS.map(a => a.history[0]);

function pctChange(a) {
  const base = basePrices[ASSETS.indexOf(a)];
  return ((a.price - base) / base) * 100;
}

function sparkPoints(history) {
  const w = 88, h = 26, n = history.length;
  const min = Math.min(...history), max = Math.max(...history);
  const range = max - min || 1;
  return history.map((v, i) => {
    const x = (i / (n - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
}

function render() {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = ASSETS.map(a => {
    const chg = pctChange(a);
    const up = chg >= 0;
    return \`
      <tr data-symbol="\${a.symbol}">
        <td>
          <div class="sym-name">\${a.symbol}</div>
          <div class="sym-full">\${a.name}</div>
        </td>
        <td class="num price-val" data-role="price">$\${a.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="num">
          <span class="chg-val \${up ? 'up' : 'down'}" data-role="chg">
            <span class="chg-arrow">\${up ? '\\u25B2' : '\\u25BC'}</span>\${Math.abs(chg).toFixed(2)}%
          </span>
        </td>
        <td>
          <svg class="spark" width="88" height="26" viewBox="0 0 88 26">
            <polyline fill="none" stroke="\${up ? '#16a34a' : '#dc2626'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" points="\${sparkPoints(a.history)}"/>
          </svg>
        </td>
      </tr>
    \`;
  }).join('');
}

function updatePrices() {
  ASSETS.forEach(a => {
    const volatility = a.price * 0.004;
    const next = Math.max(0.01, a.price + (Math.random() * 2 - 1) * volatility);
    const direction = next > a.price ? 'up' : next < a.price ? 'down' : null;
    a.price = Math.round(next * 100) / 100;
    a.history.push(a.price);
    if (a.history.length > 12) a.history.shift();

    const row = document.querySelector('tr[data-symbol="' + a.symbol + '"]');
    if (!row) return;
    const chg = pctChange(a);
    const up = chg >= 0;

    row.querySelector('[data-role="price"]').textContent = '$' + a.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const chgEl = row.querySelector('[data-role="chg"]');
    chgEl.className = 'chg-val ' + (up ? 'up' : 'down');
    chgEl.innerHTML = '<span class="chg-arrow">' + (up ? '\\u25B2' : '\\u25BC') + '</span>' + Math.abs(chg).toFixed(2) + '%';

    const poly = row.querySelector('.spark polyline');
    poly.setAttribute('points', sparkPoints(a.history));
    poly.setAttribute('stroke', up ? '#16a34a' : '#dc2626');

    if (direction) {
      row.classList.remove('flash-up', 'flash-down');
      void row.offsetWidth; // restart the CSS transition even if the same direction flashed last tick
      row.classList.add(direction === 'up' ? 'flash-up' : 'flash-down');
      setTimeout(() => row.classList.remove('flash-up', 'flash-down'), 550);
    }
  });
}

render();
setInterval(updatePrices, 1600);`,
  seo: {
    title: 'Live Market Watchlist Table — Free HTML CSS JS Snippet',
    description: 'A live-updating price table with flash highlights on change, per-row sparkline trend lines, and animated up/down percentage badges. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Live Market Watchlist Table — Flash-on-Change Rows, Live Sparklines & Surgical DOM Updates',
      description: `A price table that silently updates numbers in place is easy to miss changes in — a trader or investor glancing away for a few seconds has no way to tell whether a price just moved or has been sitting still the whole time. This watchlist solves that with a brief background-color flash on any row whose price just changed, colored green or red by direction, alongside a live sparkline trend line per asset that updates every tick.

**Surgical per-cell updates, not a full re-render**

\`render()\` builds the entire table once on load, but the repeating \`updatePrices()\` function never calls it again. Instead, it looks up each row by \`data-symbol\`, then updates exactly three things inside it directly: the price text node, the change badge's class and innerHTML, and the sparkline polyline's \`points\` and \`stroke\` attributes. This distinction is what makes the flash animation possible at all — if the whole table re-rendered from scratch every tick, any CSS transition or flash class added a moment earlier would be wiped out along with the stale DOM node it was attached to.

**Restarting a CSS transition with a forced reflow**

When a row's price moves in the *same* direction two ticks in a row, simply re-adding the same \`.flash-up\` class would have no visible effect — the class is already present, so no transition triggers. \`updatePrices()\` handles this by removing both flash classes, reading \`row.offsetWidth\` (a layout property read that forces the browser to flush pending style changes before continuing — a well-known technique for restarting CSS animations), and only then re-adding the appropriate flash class. Without that forced reflow, a stock moving up for three consecutive ticks would only flash on the first one.

**Self-normalizing sparklines from a rolling history window**

Each asset carries its own \`history\` array, capped at 12 points via \`.shift()\` once new prices push it over that length. \`sparkPoints()\` normalizes each point between that array's own current min and max, so the sparkline always uses its full available height regardless of whether the asset has been range-bound or has just had a sharp move — a fixed y-axis scale shared across all assets would flatten a low-volatility asset's line to a nearly straight one.

**Percent change measured against a fixed baseline, not the previous tick**

\`pctChange()\` always compares the current price to \`basePrices\`, a value captured once when the page loaded (the first entry in each asset's initial history) — not to the price one tick earlier. This mirrors how a real "24h change" figure works: it should represent total movement since a fixed reference point, not reset itself relative to whatever the price happened to be a moment ago.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch it update live', text: 'Every 1.6 seconds, prices nudge randomly — the changed price, percentage badge, and sparkline update in place, with the row briefly flashing green or red.' },
        { title: 'Replace ASSETS with real symbols', text: 'Set each asset\'s symbol, name, starting price, and initial history array to real data from your market data provider.' },
        { title: 'Connect a real price feed', text: 'Replace the setInterval(updatePrices, 1600) simulation with a WebSocket or polling callback from your market data API that sets a.price directly before running the same DOM-update logic.' },
        { title: 'Adjust the flash duration', text: 'Change the 550 in the setTimeout call and the 0.5s in the CSS transition to make the flash linger longer or shorter.' },
        { title: 'Change the sparkline history window', text: 'Edit the "if (a.history.length > 12)" check to show a longer or shorter recent trend per asset.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Live simulated price stream updates every 1.6 seconds via a repeating interval',
      'Row briefly flashes green or red matching the direction of that specific price change',
      'Forced reflow (offsetWidth read) restarts the flash CSS transition even on consecutive same-direction moves',
      'Per-asset sparkline normalizes to its own rolling price history, not a shared fixed scale',
      'Percentage change always measured against a fixed session-start baseline, not the previous tick',
      'Only the changed price, badge, and sparkline DOM nodes update per tick — the table body is never fully re-rendered after initial load',
      'Rolling 12-point history window keeps each sparkline focused on recent movement',
      'Up/down direction reinforced with both color and an arrow glyph for redundant signaling',
    ],
    useCases: [
      { icon: 'APP', title: 'Crypto and stock trading dashboards', desc: 'The core use case — a personal or platform watchlist showing live price movement across multiple assets at a glance.' },
      { icon: 'CHART', title: 'Portfolio tracking apps', desc: 'Adapt the same flash-and-sparkline pattern to show live gain/loss per holding in a personal investment tracker.' },
      { icon: 'DASH', title: 'Trading terminal and market data widgets', desc: 'Embed as one panel inside a larger trading terminal alongside order books and charts.' },
      { icon: 'LEARN', title: 'Learn surgical live-update DOM patterns', desc: 'A clean example of updating only the DOM nodes that actually changed on each tick, instead of re-rendering an entire list — directly transferable to any live-data table.' },
      { icon: 'CODE', title: 'Sports odds and live-score tables', desc: 'Repurpose the same flash-on-change and per-row trend pattern for live betting odds or sports score tickers instead of asset prices.' },
    ],
    faqs: [
      { q: 'Why does the flash animation require reading row.offsetWidth?', a: 'If a row\'s price moves in the same direction on two consecutive ticks, simply re-adding the already-present .flash-up class triggers no CSS transition, since the class never actually left. Reading row.offsetWidth forces the browser to apply the class-removal style change immediately (a technique called a forced reflow) before the class is re-added, guaranteeing the transition restarts every time.' },
      { q: 'Why does the table only update specific DOM nodes instead of calling render() again?', a: 'Rebuilding the entire tbody from scratch every 1.6 seconds would destroy and recreate every row, which would immediately erase any in-progress flash CSS transition and cause needless layout work. updatePrices() instead finds each row by its data-symbol attribute and updates only the price text, change badge, and sparkline polyline points directly.' },
      { q: 'How is percentage change calculated — against the previous price or a fixed baseline?', a: 'pctChange() always compares the current price to basePrices, a value captured once from each asset\'s initial history when the page first loaded — not the price one tick earlier. This matches how a real "24h change" figure behaves: a running total change since a fixed reference point, not something that resets relative to the last tick.' },
      { q: 'How does the sparkline stay legible for both calm and volatile assets?', a: 'sparkPoints() normalizes each asset\'s own history array between that array\'s current minimum and maximum, so every sparkline always uses its full available height — a shared fixed scale across assets would flatten a low-volatility asset\'s line to nearly a straight one.' },
      { q: 'How do I connect this to a real market data feed?', a: 'Replace the setInterval(updatePrices, 1600) simulation with a WebSocket message handler (or polling call) from your market data provider that sets each asset\'s price property to the real incoming value, then reuses the same DOM-update block that already exists inside updatePrices() for the flash, badge, and sparkline logic.' },
      { q: 'How many history points does each sparkline keep?', a: 'Each asset\'s history array is capped at 12 entries via a .shift() call once a new price push exceeds that length, keeping the sparkline focused on roughly the most recent 12 ticks rather than growing unbounded.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why updatePrices reads row.offsetWidth before re-adding a flash class, and what visual bug would appear on consecutive same-direction price moves if that line were removed. The same assistant can help optimize it — for instance asking whether querying the DOM by data-symbol on every single tick for every asset is efficient enough at a larger watchlist size, or whether caching row/element references up front would be worth the added bookkeeping. It's also useful for extending the table: ask it to add a sortable "24h change" column, a search/filter input across symbols, or wire the whole thing to a real WebSocket price feed with reconnect handling. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live-updating "market watchlist" table in plain HTML, CSS, and JavaScript — no charting library, no framework.

Requirements:
- Maintain a plain array of asset objects, each with a symbol, a display name, a current price, and a rolling array of recent price history values (capped at a fixed length, dropping the oldest value as new ones are added).
- Render the initial table once from that array, with each row showing the symbol/name, the current price formatted as currency, a percentage-change badge (colored and arrow-marked for up versus down), and a small inline SVG sparkline of that asset's own price history.
- Simulate a live price feed with a repeating timer that nudges each asset's price by a small random amount. On every tick, update only the specific DOM nodes for the price text, the change badge, and the sparkline of each affected row directly — do not rebuild or re-render the entire table body from the array again after the initial render.
- Whenever a specific row's price actually changes, briefly flash that row's background color (green if it went up, red if it went down) using a CSS transition, and make sure the flash reliably re-triggers even if the price moves in the same direction on consecutive updates (research and use the standard technique for forcing a CSS transition restart, since simply re-adding an already-present class will not retrigger a transition).
- The percentage-change figure must be calculated against a single fixed reference price captured once when the page loads for each asset (not against whatever the price was on the immediately preceding tick).
- Normalize each row's sparkline points to that specific asset's own current minimum and maximum history values (not a scale shared across all assets), so the line's vertical range always uses the chart's full height regardless of how volatile or stable that particular asset has been.`,
    },
  },
};

export default liveMarketWatchlistTable;
