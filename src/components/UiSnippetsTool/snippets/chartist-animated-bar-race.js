const chartistAnimatedBarRace = {
  id: 'chartist-animated-bar-race',
  title: 'Chartist.js Animated Bar Race',
  lastmod: '2026-09-17',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/chartist@1.3.0/dist/index.umd.min.js',
    'https://cdn.jsdelivr.net/npm/chartist@1.3.0/dist/index.css',
  ],
  html: `<div class="cbr-stage">
  <div class="cbr-head">
    <span class="cbr-tag">Chartist.js · draw event · bar</span>
    <h2>Top Products by Revenue</h2>
    <p>Bars grow in from zero on load, and chart.update() replays the same animation with a fresh shuffle.</p>
  </div>
  <div class="cbr-chart" id="cbrChart"></div>
  <button class="cbr-btn" id="cbrShuffle">Shuffle data</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 100% at 50% 0%,#161d38,#080a14);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.cbr-stage{width:min(640px,94vw);display:flex;flex-direction:column;gap:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:28px;box-shadow:0 24px 60px -24px rgba(0,0,0,.8)}
.cbr-head{text-align:center}
.cbr-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#34d399;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.cbr-head h2{font-size:clamp(22px,4.4vw,28px);font-weight:800;letter-spacing:-.02em}
.cbr-head p{font-size:13px;color:#8e97b8;margin-top:7px;line-height:1.5}

.cbr-chart{height:280px}
.cbr-chart .ct-label{fill:#c3cbe8;color:#c3cbe8;font-size:.72rem}
.cbr-chart .ct-grid{stroke:rgba(255,255,255,.08)}
.cbr-chart .ct-series-a .ct-bar{stroke:#34d399;stroke-width:22px}
.cbr-chart .ct-bars-labels{fill:#fff;font-weight:700;font-size:.75rem}

.cbr-btn{align-self:center;padding:10px 22px;border-radius:99px;border:1px solid rgba(52,211,153,.4);background:rgba(52,211,153,.12);color:#a7f3d5;font:700 13px system-ui;cursor:pointer;transition:background .18s}
.cbr-btn:hover{background:rgba(52,211,153,.22)}`,

  js: `var LABELS = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];

function randomSeries() {
  return LABELS.map(function () { return Math.round(20 + Math.random() * 80); });
}

var data = { labels: LABELS, series: [randomSeries()] };
var options = {
  horizontalBars: true,
  axisY: { offset: 90 },
  axisX: { onlyInteger: true },
  chartPadding: { right: 40 },
  high: 100,
  low: 0
};

var chart = new Chartist.BarChart('#cbrChart', data, options);

// Bars fire draw with data.type === 'bar'. A horizontal bar's "length" is really its
// x2 coordinate (where it ends along the value axis) versus x1 (where it starts, at
// the axis baseline). Animating a bar in means animating x2 from x1's own value
// (a zero-length bar sitting flush against the baseline) out to its real, final x2.
chart.on('draw', function (data) {
  if (data.type === 'bar') {
    data.element.animate({
      x2: {
        id: 'grow',
        dur: 800,
        from: data.x1,
        to: data.x2,
        easing: Chartist.Svg.Easing.easeOutQuint
      }
    });
  }
});

// Chartist's own update-transition: calling chart.update() with new data does NOT
// require re-attaching the draw listener or re-running the animation setup above --
// update() re-runs the whole draw pass internally, so every bar refires 'draw' and
// grows in again from its own new x1/x2, this time animating from its OLD rendered
// length to the new one rather than from zero, because Chartist reuses the existing
// DOM elements and only their coordinates change.
document.getElementById('cbrShuffle').addEventListener('click', function () {
  chart.update({ labels: LABELS, series: [randomSeries()] });
});`,

  seo: {
    title: 'Chartist.js Animated Bar Race — Growing Bars & update() Snippet',
    description: 'A horizontal bar chart that grows in from zero on load and re-animates on chart.update() with fresh shuffled data, using Chartist.js\'s draw event and built-in update transitions. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Chartist.js Animated Bar Race — Growing Bars and the update() Transition',
      description: `The [line](/ui-snippets/chartist-animated-line-chart/) and [donut](/ui-snippets/chartist-animated-donut-chart/) snippets in this library animate a static chart once, on load. This one adds a second dimension: what happens when the *data itself* changes after the chart already exists, via \`chart.update()\` — and it turns out Chartist has that transition built in almost for free, as long as your \`draw\` handler is written the right way.

## What a horizontal bar actually is, geometrically

For a \`Chartist.BarChart\` with \`horizontalBars: true\`, each bar's \`draw\` event carries \`data.x1\` and \`data.x2\` — the bar's start and end coordinates along the horizontal value axis (plus \`y1\`/\`y2\`, which stay constant for a given row since the bar's vertical position doesn't change). \`x1\` is always the axis baseline; \`x2\` is where the bar's value places its far end. A bar's on-screen length is nothing more than \`x2 - x1\`.

## Growing from zero: animate x2 from x1

\`\`\`js
data.element.animate({
  x2: { dur: 800, from: data.x1, to: data.x2, easing: ... }
});
\`\`\`

Setting the animation's \`from\` value to \`data.x1\` — the bar's own baseline, not a hardcoded zero — makes the bar start with zero visible length (its start and end coincide) and grow out to its real length. Using \`data.x1\` rather than a literal \`0\` matters because the baseline position depends on \`axisY\`'s offset and the chart's padding; hardcoding \`0\` would grow every bar from the literal left edge of the SVG instead of from the actual axis line, which is wrong the moment the axis has any offset at all.

## Why \`chart.update()\` replays the animation without extra code

This is the part that looks like magic until you see the mechanism: Chartist doesn't destroy and recreate the SVG on \`update()\`. It reuses the existing DOM elements where the shape hasn't structurally changed, and re-runs its internal draw pass, updating each bar's \`x2\` coordinate and — critically — **firing the \`draw\` event again for every element**, exactly as it did on the first render. Because this snippet's \`chart.on('draw', ...)\` handler is attached once, outside of any specific render, it doesn't need to be re-attached or re-triggered manually after \`update()\` — Chartist calls it again on its own.

The one behavioral difference: on the very first render, \`data.x1 === \` the baseline and every bar visibly grows from zero. On a subsequent \`update()\`, the bar element already has a real \`x2\` from before the shuffle — but the \`draw\` handler still reads whatever \`data.x1\`/\`data.x2\` the *new* draw pass computes, and animates between them the same way. In practice this means each shuffle animates every bar from its previous length directly to its new length, which is the actual "race" feeling: bars don't reset to zero and regrow each time, they visibly grow or shrink relative to where they just were.

## Why \`horizontalBars: true\` suits a "race" layout

Vertical bars racing would need height changes read off \`y1\`/\`y2\` instead, but the visual metaphor of a "bar race" — labels on the left, bars extending rightward by value — is a horizontal-bar convention. \`axisY: { offset: 90 }\` reserves enough left-hand space for the product name labels to render without truncation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add both Chartist CDN files', text: 'The JS bundle and index.css.' },
      { title: 'Create a horizontal BarChart', text: 'new Chartist.BarChart(selector, data, { horizontalBars: true, ... }).' },
      { title: 'Animate x2 from x1 on draw', text: 'data.type === "bar" gives x1 (baseline) and x2 (real end) to animate between.' },
      { title: 'Use data.x1, not a literal 0, as the start value', text: 'The baseline position depends on axis offset and padding, so it must be read, not assumed.' },
      { title: 'Call chart.update() with new data', text: 'No extra animation code is needed — the same draw handler fires again automatically.' },
      { title: 'Wire a shuffle button', text: 'Generates fresh random values and calls update(), demonstrating the built-in transition.' },
    ] },
    features: [
      { title: 'Bars grow in from zero on load', text: 'x2 animates from the axis baseline (x1) out to its real value.' },
      { title: 'Baseline read from data, not hardcoded', text: 'Using data.x1 keeps the animation correct regardless of axis offset or padding.' },
      { title: 'Built-in update-transition', text: 'chart.update() re-fires draw automatically, replaying the same growth animation with no extra code.' },
      { title: 'Bars animate between old and new length', text: 'A shuffle grows or shrinks each bar relative to its previous value, not from zero every time.' },
      { title: 'Horizontal bar-race layout', text: 'Labels on the left, bars extending right — the standard "race" visual convention.' },
      { title: 'Randomized shuffle button', text: 'Demonstrates the animation repeatedly with fresh data on demand.' },
      { title: 'Eased growth curve', text: 'Chartist.Svg.Easing.easeOutQuint gives bars a natural deceleration as they land.' },
      { title: 'Fixed value axis range', text: 'high/low keep the scale stable across shuffles so bar lengths stay comparable.' },
    ],
    useCases: [
      { icon: 'CHART', title: 'Leaderboards and rankings', text: 'A product, team, or player ranking chart that visibly reacts to new data.' },
      { icon: 'APP', title: 'Live dashboards', text: 'Poll an API and call chart.update() on an interval to get automatic re-animation for free.' },
      { icon: 'LEARN', title: 'Teaching Chartist\'s update lifecycle', text: 'A clear demonstration that update() reuses draw handlers rather than requiring new ones.' },
      { icon: 'DESIGN', title: 'Sales and revenue snapshots', text: 'A top-N chart that feels alive each time the underlying numbers refresh.' },
    ],
    faqs: [
      { q: 'Why animate x2 from data.x1 instead of from 0?', a: 'data.x1 is the bar\'s actual axis baseline in the chart\'s current coordinate space, which shifts depending on axisY offset and chart padding. Hardcoding 0 would grow bars from the literal edge of the SVG rather than from the real axis line, which looks wrong as soon as there\'s any axis offset.' },
      { q: 'Does chart.update() need its own animation code?', a: 'No. The draw event handler attached once with chart.on("draw", ...) fires again automatically every time update() re-runs Chartist\'s internal render pass, so the exact same x1-to-x2 growth animation replays without any extra setup.' },
      { q: 'Why do bars grow from their previous length instead of resetting to zero on shuffle?', a: 'Chartist reuses existing DOM elements on update() rather than destroying and recreating them. The draw handler reads whatever x1/x2 the new render pass computes and animates between those, so a bar that already has a rendered length animates from that length to its new one, not from zero.' },
      { q: 'What\'s the difference between data.x1/x2 and y1/y2 in the draw event?', a: 'For a horizontal bar chart, x1/x2 represent the bar\'s start and end along the value axis (what changes with the data), while y1/y2 represent its position along the category axis (which stays fixed for a given row). A vertical bar chart would swap which pair encodes the growing length.' },
      { q: 'Why use horizontalBars: true for a "bar race" instead of vertical bars?', a: 'The bar-race visual convention is labels on the left with bars extending rightward by value, which is what horizontalBars: true produces. It also makes long product names easier to read than rotated axis labels under vertical bars would.' },
      { q: 'Why set a fixed high/low range instead of letting Chartist auto-scale?', a: 'Auto-scaling recalculates the axis range based on the current data\'s max value, which would make the same underlying value draw a different bar length on every shuffle. A fixed high/low keeps the scale stable so bar lengths stay visually comparable across updates.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is a good one to have an AI trace through Chartist's update lifecycle rather than just its animation code. Paste it into an assistant like Claude and ask it to explain exactly why calling chart.update() with new data replays the same growth animation without the draw event listener being re-attached anywhere — the answer should describe Chartist re-running its internal draw pass and reusing existing DOM elements rather than tearing the chart down. Then ask what would go wrong if data.x1 were replaced with a hardcoded 0 in the animate() call, and under what axis configuration that mistake would become visible (any nonzero axisY offset). To extend it: ask for a version that sorts bars by value and animates their vertical reordering on each shuffle (a true "race" reordering effect, which Chartist doesn't do automatically), a version that polls a real API on an interval instead of a manual shuffle button, or a version using vertical bars where the growth is read from y1/y2 instead of x1/x2.`,
      prompt: `Build a horizontal "bar race" chart using Chartist.js (v1.3.0, from a CDN, both the JS and its index.css) in plain HTML, CSS, and JavaScript, where bars grow in on load and re-animate whenever the data changes.

Requirements:
- A horizontal bar chart for 5 labeled categories, created with new Chartist.BarChart('#selector', data, { horizontalBars: true, axisY: { offset: 90 }, high: 100, low: 0, ... }), styled to sit in a dark card panel with labels rendered fully (no truncation) via sufficient axisY offset.
- Attach chart.on('draw', function(data) { if (data.type === 'bar') { ... } }). Inside it, animate the bar's x2 coordinate from data.x1 (the real axis baseline, read from the event data, NOT a hardcoded 0) to data.x2 (the bar's real end position), over roughly 800ms with an eased curve like Chartist.Svg.Easing.easeOutQuint. Add a comment explaining why data.x1 must be used instead of a literal 0 — because the baseline's actual coordinate depends on axis offset and chart padding.
- Add a "Shuffle data" button that generates new random values for the same 5 categories and calls chart.update() with them. Do NOT write any new animation code for this button — rely entirely on the fact that update() re-fires the same draw event handler already attached, and add a comment explaining that Chartist reuses existing bar elements on update() rather than recreating them, so each shuffle animates every bar from its previous rendered length to its new one rather than resetting to zero each time.
- Keep the value axis range fixed (high/low in options) so bar lengths stay visually comparable across shuffles instead of auto-rescaling to each new dataset's max.`,
    },
  },
};

export default chartistAnimatedBarRace;
