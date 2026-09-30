const sleepCycleChart = {
  id: 'sleep-cycle-chart',
  title: 'Sleep Cycle Chart',
  lastmod: '2026-08-22',
  category: 'charts',
  cdnUrls: [],
  html: `<div class="slc-card">
  <div class="slc-head">
    <div>
      <h2>Last night's sleep</h2>
      <p>11:42 PM &ndash; 7:15 AM</p>
    </div>
    <div class="slc-total">
      <span id="slcTotal">7h 33m</span>
      <small>time asleep</small>
    </div>
  </div>

  <div class="slc-chart-wrap">
    <svg class="slc-chart" id="slcChart" viewBox="0 0 600 90" preserveAspectRatio="none"></svg>
    <div class="slc-axis" id="slcAxis"></div>
  </div>

  <div class="slc-legend" id="slcLegend"></div>

  <div class="slc-summary" id="slcSummary"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d16;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.slc-card{background:#12151f;border:1px solid #232838;border-radius:18px;padding:22px;width:100%;max-width:540px;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.slc-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}
.slc-head h2{font-size:16px;font-weight:800;color:#f1f5f9}
.slc-head p{font-size:12px;color:#64748b;margin-top:3px}
.slc-total{text-align:right}
.slc-total span{display:block;font-size:19px;font-weight:800;color:#c4b5fd}
.slc-total small{font-size:10.5px;color:#5b6472;text-transform:uppercase;letter-spacing:.04em}

.slc-chart-wrap{margin-bottom:12px}
.slc-chart{width:100%;height:52px;display:block;border-radius:8px;overflow:hidden}
.slc-axis{display:flex;justify-content:space-between;margin-top:6px;font-size:10px;color:#4b5566;font-variant-numeric:tabular-nums}

.slc-legend{display:flex;flex-wrap:wrap;gap:14px;padding:12px 0;border-top:1px solid #1e2330;border-bottom:1px solid #1e2330;margin-bottom:14px}
.slc-legend-item{display:flex;align-items:center;gap:6px;font-size:11.5px;color:#9aa4b6}
.slc-swatch{width:9px;height:9px;border-radius:2px;flex-shrink:0}

.slc-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.slc-stat{background:#0e1119;border:1px solid #1e2330;border-radius:10px;padding:9px 4px;text-align:center}
.slc-stat b{display:block;font-size:13px;font-weight:800}
.slc-stat span{font-size:9.5px;color:#5b6472;text-transform:uppercase;letter-spacing:.03em}`,

  js: `var STAGES = {
  awake: { label: 'Awake', color: '#f87171' },
  rem:   { label: 'REM',   color: '#a78bfa' },
  light: { label: 'Light', color: '#60a5fa' },
  deep:  { label: 'Deep',  color: '#34d399' },
};

// Segments in minutes from lights-out, in chronological order.
var SEGMENTS = [
  { stage: 'awake', minutes: 8 },
  { stage: 'light', minutes: 22 },
  { stage: 'deep', minutes: 48 },
  { stage: 'light', minutes: 18 },
  { stage: 'rem', minutes: 20 },
  { stage: 'light', minutes: 26 },
  { stage: 'deep', minutes: 42 },
  { stage: 'rem', minutes: 24 },
  { stage: 'awake', minutes: 4 },
  { stage: 'light', minutes: 30 },
  { stage: 'rem', minutes: 28 },
  { stage: 'light', minutes: 20 },
  { stage: 'deep', minutes: 20 },
  { stage: 'rem', minutes: 21 },
  { stage: 'awake', minutes: 6 },
  { stage: 'light', minutes: 16 },
];

var TOTAL = SEGMENTS.reduce(function (s, seg) { return s + seg.minutes; }, 0);
var VB_WIDTH = 600;

function fmtHM(mins) {
  var h = Math.floor(mins / 60), m = Math.round(mins % 60);
  return (h > 0 ? h + 'h ' : '') + m + 'm';
}

function render() {
  var svg = document.getElementById('slcChart');
  var x = 0;
  var byStage = { awake: 0, rem: 0, light: 0, deep: 0 };

  svg.innerHTML = SEGMENTS.map(function (seg) {
    var w = (seg.minutes / TOTAL) * VB_WIDTH;
    var rect = '<rect x="' + x.toFixed(2) + '" y="0" width="' + w.toFixed(2) + '" height="90" fill="' + STAGES[seg.stage].color + '"></rect>';
    x += w;
    byStage[seg.stage] += seg.minutes;
    return rect;
  }).join('');

  // Legend
  document.getElementById('slcLegend').innerHTML = Object.keys(STAGES).map(function (key) {
    return '<div class="slc-legend-item"><span class="slc-swatch" style="background:' + STAGES[key].color + '"></span>' + STAGES[key].label + '</div>';
  }).join('');

  // Axis
  document.getElementById('slcAxis').innerHTML = ['11:42 PM', '1:30 AM', '3:20 AM', '5:10 AM', '7:15 AM']
    .map(function (t) { return '<span>' + t + '</span>'; }).join('');

  // Summary stats
  var asleep = TOTAL - byStage.awake;
  document.getElementById('slcTotal').textContent = fmtHM(asleep);
  document.getElementById('slcSummary').innerHTML = Object.keys(STAGES).map(function (key) {
    return '<div class="slc-stat"><b style="color:' + STAGES[key].color + '">' + fmtHM(byStage[key]) + '</b><span>' + STAGES[key].label + '</span></div>';
  }).join('');
}

render();`,

  seo: {
    title: 'Sleep Cycle Chart — Free HTML CSS JS Snippet',
    description: `A horizontal stacked sleep-stage timeline (Awake/REM/Light/Deep) built in pure SVG and CSS, with a legend and per-stage summary stats. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Sleep Cycle Chart — Stacked Sleep-Stage Timeline in Pure SVG',
      description: `Sleep-tracking apps summarize a night in one recognizable shape: a horizontal bar segmented by stage — awake, REM, light, deep — that lets you see the night's rhythm at a glance without reading a single number. This snippet rebuilds that chart with plain SVG rectangles and CSS, no charting library, alongside a color legend and per-stage duration stats. It pairs well with a [water intake tracker](/ui-snippets/water-intake-tracker/) or [workout interval timer](/ui-snippets/workout-interval-timer/) in a broader health dashboard.

**Segments, not a data series**

Sleep data here is a chronological array of \`{ stage, minutes }\` segments rather than one value per hour — because real sleep cycles don't move in neat hourly buckets, they shift between stages every 10-50 minutes throughout the night. Modeling it as ordered segments captures that texture accurately: cycling from light to deep to REM and back, with occasional brief awakenings, several times per night.

**One SVG, proportional rectangles**

\`render()\` walks the segment array once, computing each rectangle's width as its share of the total sleep-tracking duration scaled to the SVG's viewBox width, and advancing an \`x\` cursor as it goes. Because \`preserveAspectRatio="none"\` is set on the \`<svg>\`, the chart stretches to fill any container width while each segment's *relative* width — and therefore the story it tells about the night — stays exactly proportional.

**Color coding that matches sleep-tracker conventions**

Awake is red (a state to minimize), deep sleep is green (the most restorative stage), REM is purple, and light sleep is blue — following the color language used by Apple Health, Fitbit, and Oura, so the chart reads instantly to anyone who has seen a sleep-tracking app before. The legend and the per-stage summary stats reuse the exact same color-per-stage object as the chart bars, so there's a single place to change a stage's color.

**Totals computed from the same segments**

The header's "time asleep" figure and the four per-stage summary cards at the bottom are both derived by summing the same \`SEGMENTS\` array the chart bars are drawn from — awake minutes are subtracted from the total for "time asleep," and each stage's minutes are summed independently for its stat card. Nothing is hand-entered separately, so the chart and the numbers beneath it can never disagree.

**Feeding it real tracker data**

Replace \`SEGMENTS\` with the stage-change events exported by a wearable's API or health-data export (Apple HealthKit, Fitbit, Oura, Google Fit typically expose exactly this shape: a stage label plus a start/end or duration) and call \`render()\` once on load. The axis labels under the chart should also be computed from the actual sleep start/end time rather than hard-coded, if you're wiring in live data.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A stacked sleep-stage bar renders for a sample night with the legend and stats beneath it.` },
      { title: 'Read the timeline', text: `Colored segments run left to right in chronological order from lights-out to wake.` },
      { title: 'Check the legend', text: `Four swatches map red/purple/blue/green to Awake/REM/Light/Deep.` },
      { title: 'Check the summary cards', text: `Each card totals that stage's minutes summed across every segment in the night.` },
      { title: 'Resize the container', text: `The chart stretches to fill any width while segment proportions stay accurate.` },
      { title: 'Feed in real data', text: `Replace SEGMENTS with stage-change data exported from a wearable or health API.` },
    ] },
    features: [
      { title: 'Segment-based data model', text: `Chronological { stage, minutes } segments capture real sleep-cycle texture, not hourly buckets.` },
      { title: 'Pure SVG rendering', text: `Proportional rectangles drawn with plain SVG — no chart library or canvas needed.` },
      { title: 'Fluid width, fixed proportions', text: `preserveAspectRatio="none" lets the chart stretch while segment ratios stay accurate.` },
      { title: 'Convention-matching colors', text: `Red/purple/blue/green map to Awake/REM/Light/Deep, matching common sleep-tracker apps.` },
      { title: 'Single color source of truth', text: `The chart, legend, and stat cards all read color from one shared STAGES object.` },
      { title: 'Derived totals', text: `Time-asleep and per-stage stats are summed live from the same segment array as the bars.` },
      { title: 'Readable duration formatting', text: `fmtHM() renders minutes as "7h 33m" style text instead of raw numbers.` },
      { title: 'Framework-agnostic markup', text: `Plain SVG/CSS/JS ports cleanly to React, Vue, or Angular chart components.` },
    ],
    useCases: [
      { title: 'Sleep tracking apps', text: `Summarize a night's stages at the top of a sleep report screen.` },
      { title: 'Wearable companion dashboards', text: `Visualize HealthKit, Fitbit, or Oura sleep-stage exports without a charting dependency.` },
      { title: 'Health and wellness dashboards', text: `Pair with a [water intake tracker](/ui-snippets/water-intake-tracker/) and a [workout interval timer](/ui-snippets/workout-interval-timer/) for a full daily health view.` },
      { title: 'Weekly sleep trend reports', text: `Stack several of these bars, one per night, to show a week's sleep pattern.` },
      { title: 'Clinical or research sleep review', text: `Present hypnogram-style stage data to patients in an approachable, color-coded format.` },
      { title: 'Learning proportional SVG charts', text: `A clear reference for building stacked timeline charts without a library.` },
    ],
    faqs: [
      { q: 'Why model sleep as segments instead of one value per hour?', a: `Real sleep doesn't move through stages on a clean hourly schedule — a person cycles between light, deep, and REM sleep every 10 to 50 minutes or so throughout the night, with brief awakenings scattered in between. An ordered array of { stage, minutes } segments captures that irregular rhythm accurately, whereas an hourly bucket would flatten and misrepresent short stage changes.` },
      { q: 'How does the chart stay proportional at any width?', a: `The SVG's viewBox is a fixed internal coordinate system (600 wide), and each segment's rectangle width is calculated as its share of the total duration scaled into that 600-unit space. Setting preserveAspectRatio="none" tells the browser to stretch the SVG's rendered width to fill its container without preserving the viewBox's aspect ratio, so segment proportions (not absolute pixel widths) are what stay accurate as the chart resizes.` },
      { q: 'Why are the colors red, purple, blue, and green specifically?', a: `These follow the color conventions used by mainstream sleep trackers (Apple Health, Fitbit, Oura): red typically flags awake time as a state to minimize, green marks deep sleep as the most restorative stage, purple represents REM, and blue represents light sleep. Matching this convention means the chart is instantly legible to anyone who has used a sleep-tracking app before.` },
      { q: 'How are the summary stats kept in sync with the chart?', a: `Both the chart bars and the summary cards are derived from the exact same SEGMENTS array in a single render() pass — the function accumulates each stage's total minutes into a byStage object as it draws the bars, then uses that same object to populate the stat cards. There's no separately maintained total, so the two views can never disagree.` },
      { q: 'How do I connect this to real wearable data?', a: `Most sleep-tracking platforms (Apple HealthKit, Fitbit Web API, Oura, Google Fit) expose sleep data as a series of stage-change events with a stage label and a start/end time or duration. Map that response into the { stage, minutes } segment shape this snippet expects, replace the hard-coded SEGMENTS array and the hard-coded axis time labels with values derived from the real sleep start/end time, and call render().` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the proportional-SVG math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how each segment's rectangle width is calculated from its share of the total duration and the SVG viewBox, and why preserveAspectRatio="none" is what lets the chart stretch to any container width while keeping segment proportions accurate. The same assistant can help you optimize it — ask whether building one string of SVG markup per render is efficient enough for a chart that might update live, or whether it should instead patch individual rect widths. It's also useful for extending the chart: ask it to add a hover tooltip showing the exact time range of each segment, stack multiple nights vertically for a weekly trend view, or compute the axis time labels dynamically from a real sleep start and end timestamp instead of hard-coded strings. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "sleep cycle chart" in plain HTML, CSS, and JavaScript using pure SVG — no charting library, no canvas, no frameworks.

Requirements:
- Model a night's sleep as a chronologically ordered array of segments, each with a sleep stage (Awake, REM, Light, or Deep) and a duration in minutes — not one fixed value per hour, since real sleep stages change irregularly throughout the night.
- Render the segments as a single horizontal stacked bar using SVG rectangles placed edge to edge, where each rectangle's width is proportional to that segment's share of the total tracked duration, all drawn inside one <svg> with a fixed internal viewBox so proportions stay mathematically exact regardless of the SVG's rendered pixel size.
- Make the chart's rendered width fluid (it should stretch to fill its container) while every segment's relative width stays accurate — this requires disabling the SVG's default aspect-ratio-preserving scaling behavior.
- Give each of the four sleep stages a distinct, semantically appropriate color (e.g. a color that reads as "alert/red" for Awake and a color that reads as "restful/green" for Deep sleep), and drive the chart bars, a legend below the chart, and any per-stage summary stats entirely from one shared color/label lookup object, so there is only one place to change a stage's color.
- Below the chart, show a small legend mapping each color to its stage label, and a set of summary stat cards (one per stage) showing the total time spent in that stage, computed by summing the segment durations for that stage — computed from the same segment data the chart bars are drawn from, not entered or maintained separately.
- Show a readable total "time asleep" figure (total tracked time minus awake time) formatted as hours and minutes (e.g. "7h 33m"), not raw minutes.`,
    },
  },
};

export default sleepCycleChart;
