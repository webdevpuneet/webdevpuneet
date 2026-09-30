const donutChart = {
  id: 'donut-chart',
  title: 'Donut Chart',
  category: 'charts',
  html: `<div class="wrap">
  <div class="card">
    <div class="card-header">
      <div>
        <div class="card-title">Traffic Sources</div>
        <div class="card-sub">Last 30 days</div>
      </div>
      <div class="total-wrap">
        <div class="total-n" id="total-n">48,291</div>
        <div class="total-l">Total visits</div>
      </div>
    </div>

    <div class="chart-row">
      <div class="donut-wrap">
        <svg class="donut" id="donut" viewBox="0 0 120 120">
          <circle class="donut-bg" cx="60" cy="60" r="48"/>
          <!-- segments rendered by JS -->
        </svg>
        <div class="donut-center" id="donut-center">
          <div class="dc-pct" id="dc-pct">42%</div>
          <div class="dc-label" id="dc-label">Organic</div>
        </div>
      </div>

      <div class="legend" id="legend"></div>
    </div>

    <div class="segment-details" id="segment-details"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 480px; }

.card { background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 1px 8px rgba(0,0,0,0.07); border: 1px solid #e2e8f0; }

.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.card-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
.total-wrap { text-align: right; }
.total-n { font-size: 22px; font-weight: 800; color: #0f172a; }
.total-l { font-size: 11px; color: #94a3b8; }

.chart-row { display: flex; align-items: center; gap: 24px; }

.donut-wrap { position: relative; flex-shrink: 0; width: 140px; height: 140px; }
.donut { width: 100%; height: 100%; transform: rotate(-90deg); }
.donut-bg { fill: none; stroke: #f1f5f9; stroke-width: 18; }
.donut-seg { fill: none; stroke-width: 18; stroke-linecap: butt; transition: stroke-dashoffset 0.6s ease, opacity 0.2s; cursor: pointer; }
.donut-seg:hover { opacity: 0.8; }

.donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; pointer-events: none; }
.dc-pct   { font-size: 22px; font-weight: 800; color: #0f172a; line-height: 1; }
.dc-label { font-size: 11px; color: #64748b; font-weight: 500; }

.legend { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.leg-item { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 6px; border-radius: 7px; transition: background 0.12s; }
.leg-item:hover { background: #f8fafc; }
.leg-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.leg-label { font-size: 13px; color: #374151; font-weight: 500; flex: 1; }
.leg-pct { font-size: 12px; font-weight: 700; color: #64748b; }
.leg-val { font-size: 11px; color: #94a3b8; }

.segment-details { margin-top: 16px; padding-top: 14px; border-top: 1px solid #f1f5f9; display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
.sd-item { text-align: center; }
.sd-n { font-size: 16px; font-weight: 800; color: #0f172a; }
.sd-l { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; margin-top: 2px; }`,
  js: `const DATA = [
  { label: 'Organic',  value: 20283, pct: 42, color: '#6366f1' },
  { label: 'Direct',   value: 12556, pct: 26, color: '#10b981' },
  { label: 'Referral', value:  8204, pct: 17, color: '#0ea5e9' },
  { label: 'Social',   value:  7248, pct: 15, color: '#f59e0b' },
];

const CIRC = 2 * Math.PI * 48; // circumference
let total = DATA.reduce((s,d) => s + d.pct, 0);

const donutSVG = document.getElementById('donut');
let offset = 0;

DATA.forEach((d, i) => {
  const seg = document.createElementNS('http://www.w3.org/2000/svg','circle');
  seg.setAttribute('class','donut-seg');
  seg.setAttribute('cx','60'); seg.setAttribute('cy','60'); seg.setAttribute('r','48');
  seg.setAttribute('stroke', d.color);
  const dash = (d.pct / total) * CIRC;
  seg.setAttribute('stroke-dasharray', dash + ' ' + (CIRC - dash));
  seg.setAttribute('stroke-dashoffset', -offset);
  seg.id = 'seg-' + i;
  donutSVG.appendChild(seg);
  offset += dash;

  seg.addEventListener('mouseenter', () => highlightSeg(i));
  seg.addEventListener('mouseleave', resetHighlight);
});

// Legend
const legend = document.getElementById('legend');
DATA.forEach((d, i) => {
  const li = document.createElement('div');
  li.className = 'leg-item';
  li.innerHTML = '<div class="leg-dot" style="background:'+d.color+'"></div><span class="leg-label">'+d.label+'</span><span class="leg-pct">'+d.pct+'%</span>';
  li.addEventListener('mouseenter', () => highlightSeg(i));
  li.addEventListener('mouseleave', resetHighlight);
  legend.appendChild(li);
});

// Bottom detail strip
const details = document.getElementById('segment-details');
DATA.forEach(d => {
  const div = document.createElement('div');
  div.className = 'sd-item';
  div.innerHTML = '<div class="sd-n" style="color:'+d.color+'">'+d.value.toLocaleString()+'</div><div class="sd-l">'+d.label+'</div>';
  details.appendChild(div);
});

function highlightSeg(idx) {
  DATA.forEach((_, i) => {
    const seg = document.getElementById('seg-'+i);
    seg.style.opacity = i === idx ? '1' : '0.3';
  });
  document.getElementById('dc-pct').textContent = DATA[idx].pct + '%';
  document.getElementById('dc-label').textContent = DATA[idx].label;
  document.getElementById('dc-pct').style.color = DATA[idx].color;
}

function resetHighlight() {
  DATA.forEach((_, i) => { document.getElementById('seg-'+i).style.opacity = '1'; });
  document.getElementById('dc-pct').textContent = DATA[0].pct + '%';
  document.getElementById('dc-label').textContent = DATA[0].label;
  document.getElementById('dc-pct').style.color = DATA[0].color;
}`,
  seo: {
    title: 'Donut Chart — Free HTML CSS JS SVG Snippet',
    description: 'SVG donut built with stroke-dasharray segments, hover highlight, legend and centre label — no library. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Donut Chart — SVG Stroke-Based Segments, Hover Highlight, Interactive Legend & Detail Strip',
      description: `A donut chart is the most popular dashboard visualisation for showing part-to-whole relationships — traffic sources, revenue breakdown, user demographics, or any percentage distribution. It combines a visual arc layout with a centre label for immediate context. This snippet builds a complete donut chart from scratch: SVG stroke-dasharray segments computed from data percentages, hover highlight with opacity dimming of other segments, an interactive legend that mirrors the hover effect, a centre label that updates on hover, and a bottom detail strip — all in plain HTML, CSS, and vanilla JavaScript with no chart library.\n\n**How SVG stroke segments work**\n\nEach segment is an SVG circle element with the same cx, cy, and r as the background circle. stroke-dasharray defines how much of the stroke is solid (the segment arc) and how much is transparent (the gap). For a segment with 42% of the total: dash = (42/100) × CIRCUMFERENCE; gap = CIRCUMFERENCE - dash. stroke-dashoffset controls where the segment starts along the perimeter — each segment is offset by the sum of all previous segment lengths.\n\n**The -90 degree rotation**\n\nBy default, SVG strokes start at the 3 o'clock position. transform: rotate(-90deg) on the SVG element rotates the start to 12 o'clock — the expected position for donut charts. Because the segments are children of the rotated SVG, they all rotate together.\n\n**Hover highlight pattern**\n\nOn mouseenter for any segment or legend item, highlightSeg(idx) sets all other segments to opacity: 0.3 and the hovered segment to 1. The centre label updates to show the hovered segment's percentage and label. resetHighlight() on mouseleave restores all segments to opacity: 1 and resets the centre to the first segment.\n\n**The interactive legend**\n\nThe legend mirrors the chart: hovering a legend item calls the same highlightSeg() function as hovering a segment. Both input devices produce identical visual feedback — users who prefer clicking on text labels get the same experience as users who hover the arc segments.\n\n**Customising the chart**\n\nUpdate the DATA array: each entry needs label, value (raw number for the detail strip), pct (percentage of total), and color. The segment sizes compute from pct values. Update the total variable if your percentages do not sum to 100.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Hover over segments or legend items', text: 'Moving the cursor over any segment or legend item highlights it (other segments dim to 30% opacity). The centre label updates to show the hovered segment\'s percentage and name.' },
      { title: 'Update the DATA array with your values', text: 'Edit DATA at the top of the JS panel. Each object needs label, value (raw number for the detail strip), pct (percentage), and color (hex). Keep pct values summing to 100 for a complete donut.' },
      { title: 'Change the number of segments', text: 'Add or remove objects from DATA. The chart builds segments dynamically from the array length. More than 6 segments can make the chart hard to read — consider grouping small segments into an "Other" category.' },
      { title: 'Change segment colours', text: 'Update the color field in each DATA entry. Use brand colours, semantic colours (green for positive, red for negative), or a sequential colour scale. The legend dots and detail strip numbers automatically use the same colour.' },
      { title: 'Change the hole size', text: 'Update the stroke-width on .donut-bg and .donut-seg (default 18). Increasing stroke-width makes the ring thicker (smaller hole); decreasing makes it thinner (larger hole). Keep stroke-width below the radius (48px) to avoid overlapping.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component with useMemo for segment computation, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['SVG segments: stroke-dasharray dash+gap from pct/total × CIRCUMFERENCE','Offset accumulation: each segment offset by sum of previous dash lengths','SVG rotate(-90deg): starts segments at 12 o\'clock not 3 o\'clock','Hover highlight: opacity 0.3 on non-hovered, 1 on hovered — all segments','Centre label: updates pct and label text on hover, resets on mouseleave','Interactive legend: mirrors segment hover via same highlightSeg() function','Detail strip: 4-column grid showing raw values per segment','No chart library — pure SVG circle + stroke manipulation'],
    useCases: [
      { icon: 'CHART', title: 'Traffic source and marketing channel attribution dashboards', desc: 'The traffic sources use case (Organic/Direct/Referral/Social) maps directly to Google Analytics breakdown data. Wire to your analytics API and update DATA on each fetch. The percentage labels update automatically from the data.' },
      { icon: 'MONEY', title: 'Revenue breakdown and budget allocation widgets', desc: 'Show revenue by product line, department, or region as donut segments, then pair it with a [bar chart](/ui-snippets/bar-chart/) or [waterfall chart](/ui-snippets/waterfall-chart/) for period-over-period detail. The centre total shows the overall figure while segments show relative contributions. Add a period tab switcher (Q1/Q2/Q3/Q4) to swap DATA arrays on tab click.' },
      { icon: 'APP', title: 'User demographics and audience segment visualisations', desc: 'Break down users by device type (mobile/desktop/tablet), plan tier (free/pro/enterprise), or geographic region. The interactive legend makes it easy to identify the largest segments in a dense donut chart.' },
      { icon: 'DESIGN', title: 'Task completion and project progress rings', desc: 'Use a two-segment donut (complete/remaining) as a project progress indicator. Set complete segment to the completion percentage and remaining to 100-pct. The centre label shows the percentage complete.' },
      { icon: 'LEARN', title: 'Study SVG stroke-dasharray segment calculation', desc: 'The donut chart teaches the core SVG data visualisation technique: computing stroke-dasharray from a data percentage, accumulating offsets, and using SVG transform for orientation. These techniques apply directly to the [gauge chart](/ui-snippets/gauge-chart/) and other ring-based widgets.' },
      { icon: 'CODE', title: 'Replace Chart.js for lightweight single-chart use cases', desc: 'Chart.js adds 60KB+ for a use case this snippet handles in under 80 lines of JavaScript. For dashboards with one or two simple charts, this zero-dependency SVG approach avoids the bundle overhead entirely — combine it with a [sparkline chart](/ui-snippets/sparkline-chart/) or [line chart widget](/ui-snippets/line-chart-widget/) for trend context.' },
      { icon: 'CODE', title: 'Related: Marimekko (Mekko) Chart — Proportional Stacked Segments', desc: 'See the [Marimekko (Mekko) Chart — Proportional Stacked Segments](/ui-snippets/marimekko-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the SVG segment positions calculated?', a: 'Each segment is a circle element with stroke-dasharray: [dash] [gap]. CIRCUMFERENCE = 2 × π × r = 301.6px for r=48. For a 42% segment: dash = 0.42 × 301.6 = 126.7px; gap = 301.6 - 126.7 = 174.9px. stroke-dashoffset shifts the start: negative offset moves the dash clockwise. Each segment\'s offset is -(sum of all previous dash lengths). The SVG is rotated -90° so the first segment starts at 12 o\'clock.' },
      { q: 'How do I add animation when the chart first renders?', a: 'Set all segments to stroke-dasharray: 0 CIRCUMFERENCE initially (empty segments), then use requestAnimationFrame or CSS transition to animate to their final values. For a staggered entrance, add animation-delay: calc(i × 0.1s) to each segment via JavaScript: seg.style.transitionDelay = i * 0.1 + "s". Then set the final stroke-dasharray in the next frame to trigger the CSS transition.' },
      { q: 'How do I add a tooltip showing the exact value on hover?', a: 'Create a .tooltip div positioned with position:absolute. On mouseenter for each segment, position it near the cursor: tooltip.style.left = (e.pageX + 12) + "px"; tooltip.style.top = (e.pageY - 8) + "px". Set tooltip.textContent = d.label + ": " + d.value.toLocaleString(). On mousemove, update the position. On mouseleave, hide the tooltip. Add pointer-events:none to the tooltip so it never interferes with cursor events.' },
      { q: 'How do I use this donut chart in React?', a: 'Click "JSX" to download. Compute segments with useMemo([data]): iterate data, accumulate offset, return array of {color, dash, gap, offset, idx}. Map segments to SVG circle elements. Manage hovered state with useState(null) — on mouseEnter set it to the segment index, on mouseLeave null. Derive opacity for each segment from hovered state. Pass data as a prop for reusability across different chart instances in your dashboard.' },
    ],
    aiPrompt: {
      paragraph: `Rather than reconstructing the stroke-dasharray math yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how each segment's dash length is derived from CIRC and its pct/total ratio, and why the running offset variable has to accumulate the previous segments' dash lengths rather than each segment computing its own offset independently. The same assistant can help optimize it, for instance asking whether recreating all SVG circle elements from scratch would be needed if DATA changes at runtime, or whether existing elements could be updated in place instead. It is also useful for extending the chart: ask it to animate the segments sweeping in from zero on load, add a click handler that filters the legend and detail strip to a single selected segment, or support a "no data" empty state. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an interactive donut chart in plain HTML, CSS, and SVG with vanilla JavaScript — no chart library.

Requirements:
- An SVG containing one background circle plus one circle element per data segment, all sharing the same cx, cy, and radius, with the whole SVG rotated -90 degrees so segments start at the 12 o'clock position instead of 3 o'clock.
- Compute the circumference once as 2 times PI times the radius. For each segment, set stroke-dasharray to "dash gap" where dash equals (segment percentage / total percentage) times the circumference, and gap is the circumference minus dash.
- Maintain a running offset variable across the loop that builds the segments: each segment's stroke-dashoffset must be the negative of the sum of all dash lengths from every previously drawn segment, so segments sit end to end around the ring with no gaps or overlaps.
- Render a legend list and a bottom detail strip from the same data array used to build the segments, so all three (ring, legend, detail strip) share one source of truth.
- Add mouseenter and mouseleave handlers to both the SVG segments and the legend items (not just one or the other) so hovering either sets every other segment's opacity to a dimmed value and the hovered one to full opacity, while updating a center label to show that segment's percentage and name; mouseleave must restore full opacity to all segments and reset the center label back to the first segment.`,
    },
  },
};

export default donutChart;
