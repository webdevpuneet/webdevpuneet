const candlestickChart = {
  id: 'candlestick-chart',
  title: 'Candlestick Chart',
  lastmod: '2026-06-17',
  category: 'charts',
  html: `<div class="ck-card">
  <div class="ck-head">
    <div>
      <div class="ck-sym">AURX <span class="ck-tf">· 1D</span></div>
      <div class="ck-price"><span id="ckPrice">—</span> <span class="ck-chg" id="ckChg">hover a candle</span></div>
    </div>
    <div class="ck-hl"><span class="up">H <b id="ckHi">—</b></span><span class="down">L <b id="ckLo">—</b></span></div>
  </div>
  <div class="ck-plot" id="ckPlot">
    <svg class="ck-svg" id="ckSvg" viewBox="0 0 320 180" preserveAspectRatio="none"></svg>
    <div class="ck-tip" id="ckTip"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ck-card{background:#111827;border:1px solid #1f2937;border-radius:16px;padding:18px;width:100%;max-width:420px;box-shadow:0 18px 44px rgba(0,0,0,.45)}
.ck-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px}
.ck-sym{font-size:15px;font-weight:800;color:#f9fafb}
.ck-tf{color:#6b7280;font-weight:600;font-size:12px}
.ck-price{display:flex;align-items:baseline;gap:8px;margin-top:4px}
.ck-price #ckPrice{font-size:22px;font-weight:800;color:#f9fafb;font-variant-numeric:tabular-nums}
.ck-chg{font-size:12px;font-weight:700}
.ck-chg.up{color:#34d399}.ck-chg.down{color:#f87171}
.ck-hl{display:flex;flex-direction:column;gap:2px;text-align:right;font-size:11px;font-weight:600}
.ck-hl .up{color:#34d399}.ck-hl .down{color:#f87171}
.ck-hl b{font-variant-numeric:tabular-nums}

.ck-plot{position:relative}
.ck-svg{width:100%;height:180px;display:block}
.ck-wick{stroke-width:1.4}
.ck-body{transition:opacity .12s}
.ck-up{fill:#10b981;stroke:#10b981}
.ck-down{fill:#ef4444;stroke:#ef4444}
.ck-col:hover .ck-body{opacity:.7}
.ck-cross{stroke:#475569;stroke-width:1;stroke-dasharray:3 3;opacity:0;transition:opacity .12s}

.ck-tip{position:absolute;top:6px;transform:translateX(-50%);background:#1f2937;border:1px solid #374151;color:#e5e7eb;border-radius:8px;padding:7px 10px;font-size:11px;line-height:1.5;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .12s;box-shadow:0 6px 18px rgba(0,0,0,.4);z-index:2}
.ck-tip b{font-variant-numeric:tabular-nums}
.ck-tip .g{color:#9ca3af}`,

  js: `var svg = document.getElementById('ckSvg');
var plot = document.getElementById('ckPlot');
var tip = document.getElementById('ckTip');
var NS = 'http://www.w3.org/2000/svg';
var W = 320, H = 180, PAD = 10;
var DATA = [];

function genData() {
  var price = 120, out = [];
  for (var i = 0; i < 24; i++) {
    var open = price;
    var close = open + (Math.random() - 0.48) * 9;
    var high = Math.max(open, close) + Math.random() * 4;
    var low = Math.min(open, close) - Math.random() * 4;
    out.push({ o: open, c: close, h: high, l: low });
    price = close;
  }
  return out;
}

function build() {
  DATA = genData();
  var max = Math.max.apply(null, DATA.map(function (d) { return d.h; }));
  var min = Math.min.apply(null, DATA.map(function (d) { return d.l; }));
  var range = max - min || 1;
  var n = DATA.length;
  var step = (W - PAD * 2) / n;
  var bodyW = step * 0.6;
  function y(v) { return PAD + (1 - (v - min) / range) * (H - PAD * 2); }

  var frag = '';
  DATA.forEach(function (d, i) {
    var cx = PAD + step * i + step / 2;
    var up = d.c >= d.o;
    var cls = up ? 'ck-up' : 'ck-down';
    var bodyTop = y(Math.max(d.o, d.c));
    var bodyH = Math.max(1.5, Math.abs(y(d.o) - y(d.c)));
    frag += '<g class="ck-col" data-i="' + i + '">' +
      '<rect x="' + (cx - step / 2) + '" y="0" width="' + step + '" height="' + H + '" fill="transparent"/>' +
      '<line class="ck-wick ' + cls + '" x1="' + cx + '" y1="' + y(d.h) + '" x2="' + cx + '" y2="' + y(d.l) + '"/>' +
      '<rect class="ck-body ' + cls + '" x="' + (cx - bodyW / 2) + '" y="' + bodyTop + '" width="' + bodyW + '" height="' + bodyH + '" rx="1"/>' +
      '</g>';
  });
  frag += '<line class="ck-cross" id="ckCross" x1="0" y1="' + PAD + '" x2="0" y2="' + (H - PAD) + '"/>';
  svg.innerHTML = frag;

  var last = DATA[n - 1];
  document.getElementById('ckHi').textContent = max.toFixed(2);
  document.getElementById('ckLo').textContent = min.toFixed(2);
  show(n - 1);

  svg.querySelectorAll('.ck-col').forEach(function (g) {
    g.addEventListener('mouseenter', function () { show(+g.dataset.i); });
  });
  plot.addEventListener('mouseleave', function () { show(DATA.length - 1); hideCross(); });
}

function show(i) {
  var d = DATA[i];
  var price = document.getElementById('ckPrice');
  price.textContent = d.c.toFixed(2);
  var chg = ((d.c - d.o) / d.o * 100);
  var chgEl = document.getElementById('ckChg');
  chgEl.textContent = (chg >= 0 ? '▲ ' : '▼ ') + Math.abs(chg).toFixed(2) + '%';
  chgEl.className = 'ck-chg ' + (chg >= 0 ? 'up' : 'down');

  var step = (W - PAD * 2) / DATA.length;
  var cx = PAD + step * i + step / 2;
  var cross = document.getElementById('ckCross');
  if (cross) { cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.style.opacity = '1'; }

  tip.innerHTML = '<span class="g">O</span> <b>' + d.o.toFixed(1) + '</b>  <span class="g">C</span> <b>' + d.c.toFixed(1) + '</b><br>' +
    '<span class="g">H</span> <b>' + d.h.toFixed(1) + '</b>  <span class="g">L</span> <b>' + d.l.toFixed(1) + '</b>';
  tip.style.left = (cx / W * 100) + '%';
  tip.style.opacity = '1';
}

function hideCross() {
  var cross = document.getElementById('ckCross');
  if (cross) cross.style.opacity = '0';
  tip.style.opacity = '0';
}

build();`,

  seo: {
    title: 'Candlestick Chart — Stock OHLC HTML CSS JS Snippet',
    description: `SVG candlestick (OHLC) chart with green/red bodies, high-low wicks, a hover crosshair, and a live tooltip. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Candlestick Chart — OHLC Bodies & Wicks, Hover Crosshair & Live Price Readout`,
      description: `The candlestick chart is the language of financial markets — every trading app, crypto dashboard, and stock tracker uses it because a single candle encodes four values (open, high, low, close) and its colour shows direction at a glance. This snippet draws a real OHLC candlestick chart with an SVG in plain HTML, CSS, and vanilla JavaScript: green/red bodies, high-low wicks, a hover crosshair, and a tooltip with the candle's OHLC plus a live price and percent-change readout.

**Anatomy of a candle**

Each candle is an SVG \`<g>\` containing a thin \`<line>\` wick from the high to the low and a \`<rect>\` body spanning the open-to-close range. The body is green (\`.ck-up\`) when close ≥ open and red (\`.ck-down\`) otherwise — the universal convention. \`build\` computes the data's overall high and low, derives a \`y\` mapping that flips the axis (higher price = higher on screen) and fits everything within padding, then positions each candle at an evenly spaced \`cx\`. A minimum body height (\`Math.max(1.5, …)\`) keeps doji candles (open ≈ close) visible as a thin line rather than vanishing.

**Hover crosshair and OHLC tooltip**

Each candle's \`<g>\` includes a full-height transparent \`<rect>\` as a generous hit area, so you do not have to land precisely on the thin body. On \`mouseenter\`, \`show\` moves a dashed vertical crosshair to that candle, updates the header price and percent change (coloured green/red), and fills a tooltip with the formatted O, H, L, C values positioned over the candle. Leaving the plot snaps the readout back to the latest candle and hides the crosshair — exactly how trading terminals behave.

**Auto-scaling and data generation**

The chart auto-scales to the min/max of the dataset, so it works for any price range without configuration. A \`genData\` function produces a realistic random walk (each candle opens at the previous close, with randomised high/low spreads) so the demo looks like a real instrument; replace it with your OHLC array from a market API and call \`build\`.

**Why SVG over Canvas**

SVG candles are individually hoverable DOM elements — no hit-testing math, no manual redraws on hover — which makes the crosshair and tooltip trivial, and it stays crisp at any size via \`preserveAspectRatio\`. For thousands of candles you would switch to Canvas, but for the typical 20–60 visible candles a dashboard shows, SVG is simpler and exports cleanly to every framework.

Pair this with a [realtime line chart](/ui-snippets/realtime-line-chart/) for live ticks, a [sparkline chart](/ui-snippets/sparkline-chart/) for compact trends, or a [metric card grid](/ui-snippets/metric-card-grid/) for portfolio stats.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark "AURX · 1D" card appears with 24 green/red candlesticks and the latest candle's price and % change in the header.` },
      { title: 'Hover a candle', text: `A dashed crosshair snaps to it, the header price and percent change update, and a tooltip shows that candle's O/H/L/C.` },
      { title: 'Read direction at a glance', text: `Green candles closed up, red closed down; the wick shows the full high-to-low range, the body the open-to-close range.` },
      { title: 'Move along the series', text: `Sweep across the candles — the crosshair, price, and tooltip follow each one in turn.` },
      { title: 'Leave the chart', text: `The readout returns to the most recent candle and the crosshair hides.` },
      { title: 'Plug in real OHLC data', text: `Replace \`genData\` with your market data array of \`{ o, h, l, c }\` and call \`build\`; the chart auto-scales.` },
    ] },
    features: [
      { title: 'True OHLC candles', text: `Each candle is a wick \`<line>\` (high→low) plus a body \`<rect>\` (open→close), coloured green/red by direction — the standard candlestick anatomy.` },
      { title: 'Auto-scaling axis', text: `\`build\` maps prices to the data's min/max within padding, so any instrument or price range renders correctly with no config.` },
      { title: 'Doji-safe bodies', text: `A minimum body height keeps open≈close candles visible as a thin line instead of disappearing.` },
      { title: 'Generous hit areas', text: `A transparent full-height \`<rect>\` per candle makes hovering forgiving — you needn't land on the thin body.` },
      { title: 'Hover crosshair', text: `A dashed vertical line snaps to the hovered candle, the crosshair UX traders expect from a terminal.` },
      { title: 'OHLC tooltip + readout', text: `\`show\` fills a tooltip with formatted O/H/L/C and updates the header price and coloured percent change.` },
      { title: 'Latest-candle default', text: `Leaving the chart restores the readout to the most recent candle, never leaving a stale hovered value.` },
      { title: 'Crisp scalable SVG', text: `Candles are hoverable DOM elements that stay sharp at any size via \`preserveAspectRatio\` — no canvas hit-testing.` },
    ],
    useCases: [
      { title: 'Trading and brokerage apps', text: `The core price chart for stocks, forex, or crypto. Pair with a [realtime line chart](/ui-snippets/realtime-line-chart/) for the live tick line.` },
      { title: 'Crypto dashboards', text: `Show OHLC candles per coin with the header price/percent readout; combine with a [metric card grid](/ui-snippets/metric-card-grid/) for portfolio stats.` },
      { title: 'Market and watchlist widgets', text: `Compact candlestick cards in a watchlist; a [sparkline chart](/ui-snippets/sparkline-chart/) works for the tighter rows.` },
      { title: 'Backtesting and analytics tools', text: `Visualise historical OHLC bars with hover inspection of each candle's values.` },
      { title: 'Fintech marketing and demos', text: `An impressive, dependency-free chart for landing pages and product tours.` },
      { title: 'Education and trading tutorials', text: `Teach candle anatomy — body, wick, colour — with an interactive, hoverable example.` },
      { icon: 'CODE', title: 'Related: Dumbbell Chart', desc: 'See the [Dumbbell Chart](/ui-snippets/dumbbell-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I load real OHLC market data?', a: `Replace \`genData\` with your data: fetch an array of \`{ o, h, l, c }\` (open/high/low/close) from a market API and pass it to \`build\` (assign it to \`DATA\` and skip the generator). The chart auto-scales to the data's min/max, so no axis configuration is needed. For live updates, append the newest candle and re-run \`build\`, or update only the last candle's rect/line for efficiency.` },
      { q: 'How do I add volume bars or moving averages?', a: `For volume, reserve the bottom ~20% of the viewBox and draw a thin \`<rect>\` per candle scaled to its volume. For a moving average, compute the rolling mean and draw a smooth \`<path>\` (a polyline or Bézier) over the candles. Both overlay cleanly because everything shares the same \`x\` step and \`y\` scale used by the candles.` },
      { q: 'Should I use SVG or Canvas for candlesticks?', a: `SVG is ideal up to a few hundred candles: each is a real DOM element, so hover, crosshair, and tooltips need no hit-testing and it stays crisp at any size. For thousands of candles or high-frequency live updates, Canvas (or WebGL) is faster because it avoids per-element DOM overhead. This snippet uses SVG for the typical 20–60 visible candles a dashboard shows.` },
      { q: 'How do I make the chart accessible?', a: `An SVG price chart is hard for screen readers, so expose the data textually: the header already shows the current price and change as real text, and you can add an \`aria-label\` to the SVG summarising the trend plus an off-screen data table of OHLC values. Ensure up/down is conveyed by more than colour — the percent arrow (▲/▼) and the tooltip labels do this.` },
      { q: 'How do I use this candlestick chart in React, Vue, or Angular?', a: `In React, compute the candle geometry with \`useMemo\` from your OHLC array and render \`<g>\`/\`<line>\`/\`<rect>\` elements in JSX, tracking the hovered index in \`useState\` for the crosshair and tooltip. In Vue, use a \`computed\` for the candles and \`v-for\`. In Angular, compute in the component and \`*ngFor\`. The y-scale math and colour logic port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive the y-scale or the hit-area trick by hand to trust this chart. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the y function inverts the price-to-pixel mapping so higher prices land higher on screen, and why each candle's group includes a full-height transparent rect in addition to the visible wick and body. The same assistant can help optimize it — asking whether rebuilding the entire SVG innerHTML string on every build call is necessary versus updating only the changed candle when live data ticks in, or whether the minimum body height guard for doji candles could be made proportional to the chart's overall price range instead of a fixed pixel value. It's also useful for extending the chart: ask it to add volume bars beneath the candles, overlay a moving-average line, or support pinch-zooming into a specific date range. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "candlestick (OHLC) chart" in plain HTML, CSS, and SVG built with vanilla JavaScript, with a hover crosshair and tooltip — no charting library, no canvas.

Requirements:
- Accept data as an array of objects each with an open, high, low, and close price, and compute the y-axis scale dynamically from the overall minimum low and maximum high across the entire dataset, inverting the mapping so higher prices render at smaller pixel-y coordinates (higher on screen) since SVG's native coordinate system grows downward.
- For every data point, draw a thin vertical line spanning from the high price to the low price (the wick), and a rectangle spanning from the open price to the close price (the body), coloring the wick and body green when the close is greater than or equal to the open and red otherwise — with the body's height enforced to a small non-zero minimum so a candle where open and close are nearly identical still renders as a visible thin line rather than disappearing.
- Wrap each candle's wick and body in a group that also includes an invisible, full chart-height rectangle spanning that candle's full horizontal slot, used purely as a generous mouse hit area so hovering doesn't require precisely targeting the thin visual elements.
- On hovering any candle's group, move a dashed vertical crosshair line to that candle's x position, update a header display showing that candle's closing price and a color-coded (green for up, red for down) percentage change from its own open to close, and show a tooltip positioned above the candle listing its open, high, low, and close values.
- When the mouse leaves the whole chart area, reset the header readout back to the most recent candle in the dataset and hide both the crosshair and the tooltip.
- Make sure the entire scale recomputes correctly for any price range or number of candles passed in, with no hardcoded axis bounds.`,
    },
  },
};

export default candlestickChart;
