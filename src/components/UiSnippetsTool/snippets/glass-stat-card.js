const glassStatCard = {
  id: 'glass-stat-card',
  title: 'Glass Stat Card',
  lastmod: '2026-07-18',
  category: 'dashboards',
  html: `<div class="gs-stage">
  <div class="gs-grid">
    <div class="gs-card" data-trend="up">
      <div class="gs-row"><span class="gs-icon">💸</span><span class="gs-delta">+12.4%</span></div>
      <div class="gs-val" data-to="48230" data-prefix="$">$0</div>
      <div class="gs-label">Revenue</div>
      <svg class="gs-spark" viewBox="0 0 100 32" preserveAspectRatio="none"><polyline points="0,26 14,22 28,24 42,14 56,18 70,8 84,11 100,4"/></svg>
    </div>
    <div class="gs-card" data-trend="up">
      <div class="gs-row"><span class="gs-icon">👥</span><span class="gs-delta">+5.1%</span></div>
      <div class="gs-val" data-to="9821">0</div>
      <div class="gs-label">Active users</div>
      <svg class="gs-spark" viewBox="0 0 100 32" preserveAspectRatio="none"><polyline points="0,20 14,18 28,21 42,15 56,16 70,12 84,13 100,9"/></svg>
    </div>
    <div class="gs-card" data-trend="down">
      <div class="gs-row"><span class="gs-icon">📉</span><span class="gs-delta">-2.3%</span></div>
      <div class="gs-val" data-to="3.8" data-decimals="1" data-suffix="%">0%</div>
      <div class="gs-label">Churn rate</div>
      <svg class="gs-spark" viewBox="0 0 100 32" preserveAspectRatio="none"><polyline points="0,8 14,10 28,9 42,14 56,12 70,18 84,16 100,22"/></svg>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;justify-content:center;align-items:center;padding:24px;background:
  radial-gradient(900px circle at 15% 10%,#3b2a7a,transparent 45%),
  radial-gradient(800px circle at 90% 80%,#0d4f63,transparent 45%),
  #0a0b14}

.gs-grid{display:flex;flex-wrap:wrap;gap:18px;max-width:760px}
.gs-card{position:relative;width:226px;padding:20px;border-radius:20px;overflow:hidden;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);box-shadow:0 18px 50px rgba(0,0,0,.35)}
/* Subtle top-edge sheen for the glass. */
.gs-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)}
.gs-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.gs-icon{font-size:20px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}
.gs-delta{font-size:12px;font-weight:700;padding:3px 9px;border-radius:999px}
[data-trend="up"] .gs-delta{color:#6ee7b7;background:rgba(16,185,129,.16)}
[data-trend="down"] .gs-delta{color:#fca5a5;background:rgba(239,68,68,.16)}
.gs-val{font-size:30px;font-weight:800;color:#fff;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.gs-label{font-size:13px;color:rgba(255,255,255,.62);margin-top:3px}
.gs-spark{position:absolute;left:0;right:0;bottom:0;width:100%;height:34px;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.85}
[data-trend="up"] .gs-spark{stroke:#34d399}
[data-trend="down"] .gs-spark{stroke:#f87171}
.gs-spark polyline{stroke-dasharray:200;stroke-dashoffset:200;animation:gsDraw 1.4s ease forwards .2s}
@keyframes gsDraw{to{stroke-dashoffset:0}}`,

  js: `var vals = Array.prototype.slice.call(document.querySelectorAll('.gs-val'));

function format(v, decimals) {
  var s = decimals ? v.toFixed(decimals) : Math.round(v).toString();
  var parts = s.split('.');
  parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
  return parts.join('.');
}

function countUp(el) {
  var to = parseFloat(el.dataset.to);
  var decimals = parseInt(el.dataset.decimals || '0', 10);
  var prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
  var start = null, dur = 1400;
  function frame(t) {
    if (start === null) start = t;
    var p = Math.min((t - start) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + format(to * eased, decimals) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// Animate the figures when the grid scrolls into view, once.
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { vals.forEach(countUp); io.disconnect(); } });
}, { threshold: 0.3 });
io.observe(document.querySelector('.gs-grid'));`,

  seo: {
    title: 'Glass Stat Card — Free HTML CSS JS Glassmorphism KPI Card',
    description: `Frosted-glass KPI cards with backdrop-blur, trend pills, count-up figures, and self-drawing sparklines on scroll. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Glass Stat Card — Frosted KPI Tiles With Sparklines',
      description: `The glass stat card is the frosted, translucent KPI tile that floats over a colourful dashboard background — blurred glass, a trend pill, a big animated number, and a tiny sparkline. This snippet builds a responsive grid of them with plain HTML, CSS glassmorphism, and a small vanilla JavaScript count-up, with no charting library.

**Real glassmorphism**

The frosted effect is genuine \`backdrop-filter: blur(18px) saturate(140%)\` over a semi-transparent white background, so the colourful page behind the cards blurs through them rather than being faked with a flat panel. A thin gradient sheen on the top edge (\`::before\`) and a soft drop shadow sell the "pane of glass" look. The \`-webkit-\` prefix is included for Safari, where backdrop-filter still needs it.

**Trend pills from a data attribute**

Each card declares its direction with a \`data-trend\` of \`up\` or \`down\`, and CSS colours the delta pill green or red and the sparkline to match — one attribute drives the whole positive/negative theme of the card. This keeps the markup semantic and makes flipping a card's sentiment a single-value change.

**Count-up figures**

The big numbers animate from zero to their target with \`requestAnimationFrame\` and an ease-out cubic curve, reading their value and formatting from data attributes: \`data-to\`, optional \`data-decimals\`, \`data-prefix\` (like \`$\`), and \`data-suffix\` (like \`%\`). A formatter inserts thousands separators, and \`font-variant-numeric: tabular-nums\` keeps the digits from jittering as they roll. The same routine handles currency, counts, and percentages without per-card code.

**Self-drawing sparklines**

Each card's trend line is an inline SVG \`<polyline>\` animated with the \`stroke-dasharray\`/\`stroke-dashoffset\` "line draw" technique: the dash is set to the line's length and offset to hide it, then the offset animates to zero so the line draws itself left to right. It's pure CSS once the points are in place — a lightweight way to add a chart feel without a library.

**Scroll-triggered, once**

An \`IntersectionObserver\` starts the count-ups when the grid is 30% in view and disconnects, so the numbers animate exactly once as the dashboard appears. The sparkline draw runs on a short CSS delay so the line and the numbers feel coordinated.

**Customizing it**

Swap the emoji icons for SVGs, change the blur and tint, point the polylines at real data, or feed the figures from an API. The grid wraps responsively at any card count. Pair the cards with a [metric card grid](/ui-snippets/metric-card-grid/), a [gradient stat ring](/ui-snippets/gradient-stat-ring/), or a [sparkline chart](/ui-snippets/sparkline-chart/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three glass KPI cards render over a gradient.` },
      { title: 'Scroll them in', text: `The figures count up and sparklines draw.` },
      { title: 'Note the trend pills', text: `Up is green, down is red, from one attribute.` },
      { title: 'See the glass', text: `The background blurs through each card.` },
      { title: 'Set a value', text: `Edit data-to, prefix, suffix, decimals.` },
      { title: 'Use real data', text: `Point the polyline points at your series.` },
    ] },
    features: [
      { title: 'True backdrop blur', text: `Real glassmorphism, not a flat panel.` },
      { title: 'Edge sheen', text: `Gradient top line sells the glass.` },
      { title: 'Trend pills', text: `data-trend colours delta and sparkline.` },
      { title: 'Count-up figures', text: `Ease-out rAF with formatted numbers.` },
      { title: 'Thousands separators', text: `Formatter keeps big numbers readable.` },
      { title: 'Self-drawing sparkline', text: `Stroke-dash line draw, no library.` },
      { title: 'Scroll-triggered', text: `IntersectionObserver animates once.` },
      { title: 'Responsive grid', text: `Wraps at any number of cards.` },
    ],
    useCases: [
      { title: 'Dashboards', text: `Headline KPIs in a [dashboard layout](/ui-snippets/dashboard-layout/).` },
      { title: 'Metric rows', text: `A glassy [metric card grid](/ui-snippets/metric-card-grid/).` },
      { title: 'Rings + cards', text: `Pair with a [gradient stat ring](/ui-snippets/gradient-stat-ring/).` },
      { title: 'Trends', text: `Expand a [sparkline chart](/ui-snippets/sparkline-chart/) into context.` },
      { title: 'Reports', text: `Summary tiles above a [line chart widget](/ui-snippets/line-chart-widget/).` },
      { title: 'Status', text: `Live figures on a [status dashboard](/ui-snippets/status-dashboard/).` },
      { icon: 'CODE', title: 'Related: Trip Itinerary Day Timeline', desc: 'See the [Trip Itinerary Day Timeline](/ui-snippets/itinerary-day-timeline/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the frosted look real or faked?', a: `It is real glassmorphism: backdrop-filter: blur with saturate over a semi-transparent white background, so the colourful page behind the cards actually blurs through them. A thin gradient sheen on the top edge and a soft drop shadow complete the glass look. The -webkit- prefix is included because Safari still needs it for backdrop-filter.` },
      { q: 'How do the trend colors switch?', a: `Each card declares data-trend of up or down, and CSS colours both the delta pill (green or red) and the sparkline stroke to match. One attribute drives the entire positive or negative theme of the card, so flipping a card's sentiment is a single-value change with no extra classes.` },
      { q: 'How do the sparklines draw themselves?', a: `Each trend line is an inline SVG polyline animated with the stroke-dasharray and stroke-dashoffset line-draw technique: the dash is set to the line's length and the offset hides it, then the offset animates to zero so the line draws left to right. It is pure CSS once the points are set — a lightweight chart feel without a library.` },
      { q: 'When do the numbers count up?', a: `An IntersectionObserver starts the count-ups when the grid is 30% in view, then disconnects so they run once. Each figure animates from zero with requestAnimationFrame and an ease-out curve, reading its value and prefix, suffix, and decimals from data attributes, with thousands separators and tabular figures so it stays steady while rolling.` },
      { q: 'How do I use this glass stat card in React, Vue, or Angular?', a: `Render cards from a data array with value, trend, and series. Run each count-up in a mount effect with requestAnimationFrame writing to a ref'd node (not state) to avoid per-frame re-renders, started from an IntersectionObserver. Build the sparkline points from the series. The glass and line-draw CSS port unchanged; in Tailwind use backdrop-blur utilities.` },
    ],
    aiPrompt: {
      paragraph: `Instead of stepping through the animation timing by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the countUp function's ease-out cubic curve (1 minus (1 minus progress) to the third power) produces a decelerating roll, and how the stroke-dasharray/stroke-dashoffset pairing on the sparkline polyline makes the line appear to draw itself. It's also a good way to optimize the card, for example asking whether the IntersectionObserver threshold and the single shared count-up loop scale cleanly to a dashboard with dozens of these tiles instead of three. For extending it, ask it to wire the data-to values and polyline points to a live API response, add a tooltip that shows the exact value on sparkline hover, or support a compact single-row layout for narrow sidebars. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a row of frosted-glass KPI stat cards in plain HTML, CSS, and JavaScript using only backdrop-filter, inline SVG, and the Intersection Observer API — no canvas, no chart library.

Requirements:
- Each card must use real glassmorphism: backdrop-filter: blur combined with saturate over a semi-transparent white background, plus a thin gradient sheen on the top edge, so the colorful page behind genuinely blurs through rather than a flat panel with the same look.
- Each card must declare its trend direction as a single data attribute (up or down) on the card element, and CSS alone must use that attribute to color both a trend delta pill and a sparkline stroke, so changing a card's sentiment requires editing only that one attribute.
- Each card's headline number must be driven from data attributes: a numeric target value, and optional prefix, suffix, and decimal-place attributes, so the same formatting function handles currency, plain counts, and percentages.
- Write a count-up function that animates the number from zero to its target using requestAnimationFrame with an ease-out cubic easing curve over roughly 1.4 seconds, inserting thousands separators into the formatted output, and use font-variant-numeric: tabular-nums so the digits don't jitter horizontally while rolling.
- Include an inline SVG polyline sparkline in each card whose line "draws itself" using the stroke-dasharray and stroke-dashoffset technique animated via a CSS keyframe.
- Use a single IntersectionObserver watching the card grid to start every card's count-up animation once, the first time the grid scrolls into view at roughly 30% visibility, then disconnect so it never re-triggers.`,
    },
  },
};

export default glassStatCard;
