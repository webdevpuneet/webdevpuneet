const rangeBarChart = {
  id: 'range-bar-chart',
  title: 'Range Bar Chart',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="rb-card">
  <div class="rb-head"><h3>Salary range by role</h3><span class="rb-unit">USD / year</span></div>
  <div class="rb-rows" id="rbRows"></div>
  <div class="rb-scale" id="rbScale"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.rb-card{background:#fff;border-radius:16px;padding:22px;width:100%;max-width:480px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.rb-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:20px}
.rb-head h3{font-size:16px;font-weight:800;color:#0f172a}
.rb-unit{font-size:11.5px;font-weight:700;color:#94a3b8}

.rb-rows{display:flex;flex-direction:column;gap:16px}
.rb-row{display:grid;grid-template-columns:96px 1fr;align-items:center;gap:12px}
.rb-label{font-size:12.5px;font-weight:700;color:#334155}
.rb-track{position:relative;height:22px}
.rb-rail{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);height:2px;background:#eef2f7;border-radius:2px}
.rb-bar{position:absolute;top:50%;transform:translateY(-50%) scaleX(0);transform-origin:left;height:14px;border-radius:7px;cursor:pointer;transition:transform .7s cubic-bezier(.22,1,.36,1);display:flex;align-items:center}
.rb-bar.rb-in{transform:translateY(-50%) scaleX(1)}
.rb-cap{position:absolute;font-size:10px;font-weight:800;color:#0f172a;top:-15px;white-space:nowrap}
.rb-cap.rb-lo{left:0}.rb-cap.rb-hi{right:0}
.rb-med{position:absolute;top:50%;transform:translate(-50%,-50%);width:3px;height:20px;background:#0f172a;border-radius:2px}

.rb-scale{display:flex;justify-content:space-between;margin-top:18px;padding-left:108px;font-size:10px;font-weight:700;color:#94a3b8}`,

  js: `// Each role: low, median, and high of the range.
var DATA = [
  { label: 'Junior', low: 60, median: 78, high: 95, color: '#22c55e' },
  { label: 'Mid', low: 95, median: 120, high: 145, color: '#6366f1' },
  { label: 'Senior', low: 140, median: 175, high: 210, color: '#f59e0b' },
  { label: 'Staff', low: 200, median: 250, high: 320, color: '#ec4899' },
  { label: 'Principal', low: 280, median: 360, high: 460, color: '#0ea5e9' },
];

var rows = document.getElementById('rbRows');
var AXIS_MIN = 0;
var AXIS_MAX = Math.ceil(Math.max.apply(null, DATA.map(function (d) { return d.high; })) / 50) * 50;

function pct(v) { return ((v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100; }

function render() {
  rows.innerHTML = DATA.map(function (d) {
    var lo = pct(d.low), hi = pct(d.high), med = pct(d.median);
    return '<div class="rb-row">' +
      '<span class="rb-label">' + d.label + '</span>' +
      '<div class="rb-track"><div class="rb-rail"></div>' +
        '<div class="rb-bar" style="left:' + lo + '%;width:' + (hi - lo) + '%;background:' + d.color + '" ' +
          'data-label="' + d.label + '" data-low="' + d.low + '" data-high="' + d.high + '">' +
          '<span class="rb-cap rb-lo">$' + d.low + 'k</span><span class="rb-cap rb-hi">$' + d.high + 'k</span>' +
        '</div>' +
        '<div class="rb-med" style="left:' + med + '%" title="Median $' + d.median + 'k"></div>' +
      '</div></div>';
  }).join('');
  // Animate bars growing from their low edge.
  requestAnimationFrame(function () {
    rows.querySelectorAll('.rb-bar').forEach(function (b) { b.classList.add('rb-in'); });
  });
  // Axis ticks.
  document.getElementById('rbScale').innerHTML = [0, .25, .5, .75, 1].map(function (f) {
    return '<span>$' + Math.round(AXIS_MIN + f * (AXIS_MAX - AXIS_MIN)) + 'k</span>';
  }).join('');
}

render();`,

  seo: {
    title: 'Range Bar Chart — HTML CSS JS Floating Bars (No Lib)',
    description: `A range (floating) bar chart showing each category's low–high span with a median marker on a shared axis. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Range Bar Chart — Floating Bars for Each Category Low-to-High Range',
      description: `A range bar chart (also called a floating-bar or range-column chart) draws each bar from a *start* value to an *end* value rather than from zero — perfect for showing spans: salary ranges by role, daily temperature high/low, project start-to-end dates, or any min–max band. This snippet builds it in plain HTML, CSS, and vanilla JavaScript, with bars positioned on a shared axis, low/high captions, and a median marker — no charting library.

**Bars that start where the data starts**

The defining feature is that a bar doesn't begin at zero. Each bar is absolutely positioned along a track: its \`left\` is the low value's position on the axis and its \`width\` is the span from low to high (both as percentages of the axis range via \`pct()\`). So the bar floats between its two endpoints, encoding the *range* by its position and length. This is the right chart whenever the meaningful information is a span, not a single magnitude — a plain bar from zero would waste space and hide the actual range.

**A shared axis so ranges are comparable**

Every bar is scaled against one axis (0 to a clean step above the largest high value), with tick labels beneath, so ranges across categories line up and can be compared directly — you can see at a glance that Senior's band overlaps Mid's, or that Principal's range is far wider. A faint rail behind each bar marks the full axis extent, giving the floating bar context for where it sits.

**Low, high, and median in one row**

Each bar carries small captions at its two ends showing the low and high values, and a dark median marker sits at the median's position within the bar — so a single row communicates the bottom, top, and typical value of the range. Showing the median turns a simple range into a richer summary (it's the bar-chart cousin of a box plot's median line), which is exactly what's useful for things like salary bands.

**Animated growth from the low edge**

The bars animate in by scaling from their low edge (\`transform-origin: left\` with a \`scaleX\` from 0 to 1) on the next animation frame — the standard requestAnimationFrame trick so the CSS transition runs from the start state. Growing from the low edge (rather than from zero) reinforces that the bar represents a span anchored at its start.

**Data-driven and drop-in**

Each row comes from \`{ label, low, median, high, color }\`, and the axis auto-scales to the data. Swap in temperatures, date ranges, or score bands and it draws the floating bars. It's a clear reference for from-to bar positioning and shared-axis scaling that apply to any range or Gantt-style visualisation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A range bar chart renders showing salary low–high bands per role with median markers.` },
      { title: 'Read the ranges', text: `Each floating bar spans its low to high; the dark marker shows the median, captions show the values.` },
      { title: 'Compare on the axis', text: `Bars share one axis, so you can see overlaps and which ranges are wider.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own { label, low, median, high, color } items.` },
      { title: 'Use for any spans', text: `Temperatures, date ranges, score bands — any min–max data fits.` },
      { title: 'Wire to an API', text: `Fetch your ranges, map them into the DATA shape, and call render().` },
    ] },
    features: [
      { title: 'Floating from-to bars', text: `Each bar spans low to high rather than starting at zero — encoding a range.` },
      { title: 'Shared auto-scaled axis', text: `One axis (0 to a clean step above the max) makes ranges directly comparable.` },
      { title: 'Median marker', text: `A dark marker within each bar shows the typical value, like a box plot's median.` },
      { title: 'Low / high captions', text: `Small labels at each end show the range's bottom and top values.` },
      { title: 'Context rail', text: `A faint rail behind each bar marks the full axis extent.` },
      { title: 'Grow-from-low animation', text: `Bars scaleX from their low edge via a requestAnimationFrame-triggered transition.` },
      { title: 'Axis tick labels', text: `Evenly-spaced ticks beneath the chart aid reading.` },
      { title: 'Data-driven & no library', text: `Draws from a DATA array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Salary and compensation bands', text: 'Show pay ranges by role or level as floating bars with a median marker, so candidates see both the span and the typical offer.' },
      { title: 'Daily temperature highs and lows', text: 'Display each day\'s low-to-high span on one shared axis, beside a [line chart widget](/ui-snippets/line-chart-widget/) of the average temperature.' },
      { title: 'Project and date ranges', text: 'Show start-to-end spans like a lightweight [gantt table](/ui-snippets/gantt-table/), with low and high captions at each end of every bar.' },
      { title: 'Price and estimate ranges', text: 'Show min-to-max quotes or forecasts, with a shared auto-scaled axis making the ranges directly comparable across categories.' },
      { title: 'Score and benchmark bands', text: 'Show acceptable ranges for scores or measurements, and pair with a [bullet chart](/ui-snippets/bullet-chart/) to mark the target within each band.' },
      { icon: 'CODE', title: 'Related: Sunburst Chart', desc: 'See the [Sunburst Chart](/ui-snippets/sunburst-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is a range bar chart different from a normal bar chart?', a: `A normal bar starts at zero and its length encodes a single value. A range (floating) bar starts at a low value and ends at a high value, so its position and length together encode a span — a min-to-max range. This snippet positions each bar by its low value (left) and sizes it by the span (width), both as percentages of a shared axis.` },
      { q: 'Why show a median marker inside the bar?', a: `A range alone tells you the extremes but not where values typically fall. Adding a median marker shows the central/typical value within the span — so a salary band, for example, communicates not just min and max but the midpoint candidates can expect. It's the same idea as a box plot's median line, condensed into a single floating bar.` },
      { q: 'How do the bars stay comparable across categories?', a: `Every bar is scaled against one shared axis that runs from zero to a clean step above the largest high value across the data. Because all bars use the same pct() mapping, their positions and widths are directly comparable — you can see overlaps between ranges and which bands are wider, which is the whole point of putting ranges on one axis.` },
      { q: 'Why animate the bars from the low edge?', a: `The bars use transform-origin: left and animate scaleX from 0 to 1 on the next animation frame (so the CSS transition runs from its start state). Growing from the low edge — where the bar is anchored on the axis — reinforces that the bar represents a span starting at its low value, rather than a magnitude from zero. It's the same requestAnimationFrame technique any animated bar uses.` },
      { q: 'How do I use this range bar chart in React, Vue, or Angular?', a: `In React, hold the data in useState and render rows from .map(), adding the grow class in a useEffect so bars animate after mount; in Vue, use v-for with onMounted; in Angular, *ngFor with ngAfterViewInit. The pct() scaling and positioning are framework-agnostic — only the state and the deferred animation trigger move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work through the floating-bar positioning math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the bar's left and width are both computed from the same pct() function against one shared AXIS_MAX rather than each bar scaling to its own range, and why transform-origin is set to left with a scaleX animation instead of animating width directly. The same assistant can help you optimize it — ask whether AXIS_MAX being derived once from Math.max across all bars means adding a single outlier row would force every other bar to visually compress, and how you'd handle that gracefully. It's also useful for extending the chart: ask it to add a hover tooltip showing exact low/median/high values, support sorting rows by range width or median, or add a second overlaid marker for a target or benchmark value. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a range (floating) bar chart in plain HTML, CSS, and JavaScript with no charting library — bars that start at a low value and end at a high value rather than starting at zero.

Requirements:
- Take a data array of objects, each with a label, a low value, a median value, a high value, and a color, and compute one shared axis maximum by rounding up the largest high value across all rows to a clean step (e.g. the nearest 50).
- Position each bar using percentages of that one shared axis: the bar's left offset must equal the low value's percentage position on the axis, and the bar's width must equal the percentage span between the low and high values — the bar must never start at zero.
- Draw a faint full-width rail behind each bar showing the complete axis extent for context, plus small caption labels at the bar's two ends showing the exact low and high values.
- Add a distinct marker (a small vertical line or dot, visually different from the bar itself) positioned at the median value's percentage location within the bar, so each row communicates low, median, and high in a single glance.
- Animate each bar growing in from its low edge on load: use transform-origin set to the left edge and animate a scaleX transform from 0 to 1 (not a width transition), triggered one animation frame after the bar is added to the DOM so the transition actually plays.
- Add evenly spaced axis tick labels beneath the chart showing values across the shared 0-to-max range, aligned with the bar track columns (not the row labels column).`,
    },
  },
};

export default rangeBarChart;
