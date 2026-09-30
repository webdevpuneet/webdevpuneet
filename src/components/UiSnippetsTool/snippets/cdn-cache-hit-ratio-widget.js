const cdnCacheHitRatioWidget = {
  id: 'cdn-cache-hit-ratio-widget',
  title: 'CDN Cache Hit Ratio Widget',
  category: 'dashboards',
  html: `<div class="demo">
  <div class="tile">
    <div class="tile-head">
      <h3>CDN cache performance</h3>
      <span class="live-badge"><span class="live-dot"></span>Live</span>
    </div>

    <div class="ring-row">
      <div class="ring-wrap">
        <svg width="112" height="112" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r="48" fill="none" stroke="#f1f5f9" stroke-width="12" />
          <circle cx="56" cy="56" r="48" fill="none" stroke="#16a34a" stroke-width="12" stroke-linecap="round" id="ringFg" transform="rotate(-90 56 56)" />
        </svg>
        <div class="ring-center">
          <span class="ring-pct" id="ringPct">0%</span>
          <span class="ring-label">hit rate</span>
        </div>
      </div>

      <div class="stat-col">
        <div class="stat-row"><span class="stat-dot hit"></span><span class="stat-label">Hits</span><span class="stat-val" id="hitVal">0</span></div>
        <div class="stat-row"><span class="stat-dot miss"></span><span class="stat-label">Misses</span><span class="stat-val" id="missVal">0</span></div>
        <div class="stat-row"><span class="stat-dot"></span><span class="stat-label">Requests/s</span><span class="stat-val" id="rpsVal">0</span></div>
      </div>
    </div>

    <ul class="edge-list" id="edgeList"></ul>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.tile { width: 400px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 16px; }

.tile-head { display: flex; align-items: center; justify-content: space-between; }
.tile-head h3 { font-size: 15px; font-weight: 800; color: #0f172a; }
.live-badge { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #16a34a; }
.live-dot { width: 6px; height: 6px; border-radius: 50%; background: #16a34a; animation: pulseDot 1.4s ease-in-out infinite; }
@keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.ring-row { display: flex; align-items: center; gap: 22px; }
.ring-wrap { position: relative; width: 112px; height: 112px; flex-shrink: 0; }
.ring-wrap svg circle#ringFg { transition: stroke-dashoffset 0.6s ease, stroke 0.4s; }
.ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.ring-pct { font-size: 21px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.ring-label { font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }

.stat-col { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.stat-row { display: flex; align-items: center; gap: 8px; }
.stat-dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0; }
.stat-dot.hit { background: #16a34a; }
.stat-dot.miss { background: #dc2626; }
.stat-label { flex: 1; font-size: 12px; color: #64748b; font-weight: 600; }
.stat-val { font-size: 13px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }

.edge-list { list-style: none; display: flex; flex-direction: column; gap: 6px; padding-top: 12px; border-top: 1px solid #f1f5f9; }
.edge-row { display: flex; align-items: center; gap: 10px; }
.edge-name { width: 92px; font-size: 11.5px; font-weight: 700; color: #334155; flex-shrink: 0; }
.edge-bar { flex: 1; height: 6px; border-radius: 999px; background: #f1f5f9; overflow: hidden; }
.edge-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #6366f1, #22c55e); transition: width 0.6s ease; }
.edge-pct { width: 38px; text-align: right; font-size: 11px; font-weight: 700; color: #94a3b8; font-variant-numeric: tabular-nums; }`,
  js: `var CIRC = 2 * Math.PI * 48;
var ringFg = document.getElementById('ringFg');
ringFg.style.strokeDasharray = CIRC;
ringFg.style.strokeDashoffset = CIRC;

var totalHits = 0;
var totalMisses = 0;

var EDGES = [
  { name: 'US-East', hits: 0, total: 0 },
  { name: 'EU-West', hits: 0, total: 0 },
  { name: 'AP-South', hits: 0, total: 0 },
  { name: 'SA-East', hits: 0, total: 0 },
];

var edgeListEl = document.getElementById('edgeList');
var ringPct = document.getElementById('ringPct');
var hitVal = document.getElementById('hitVal');
var missVal = document.getElementById('missVal');
var rpsVal = document.getElementById('rpsVal');

function setRing(pct) {
  var offset = CIRC - (pct / 100) * CIRC;
  ringFg.style.strokeDashoffset = offset;
  ringFg.style.stroke = pct >= 85 ? '#16a34a' : pct >= 60 ? '#f59e0b' : '#dc2626';
}

function renderEdges() {
  edgeListEl.innerHTML = EDGES.map(function (e) {
    var pct = e.total === 0 ? 0 : Math.round((e.hits / e.total) * 100);
    return '<li class="edge-row">' +
      '<span class="edge-name">' + e.name + '</span>' +
      '<div class="edge-bar"><div class="edge-fill" style="width:' + pct + '%"></div></div>' +
      '<span class="edge-pct">' + pct + '%</span>' +
    '</li>';
  }).join('');
}

function simulateTick() {
  var requestsThisSecond = 40 + Math.floor(Math.random() * 60);
  rpsVal.textContent = requestsThisSecond;

  for (var i = 0; i < requestsThisSecond; i++) {
    var edge = EDGES[Math.floor(Math.random() * EDGES.length)];
    var isHit = Math.random() < 0.9;
    edge.total++;
    if (isHit) { edge.hits++; totalHits++; } else { totalMisses++; }
  }

  var overallTotal = totalHits + totalMisses;
  var pct = overallTotal === 0 ? 0 : Math.round((totalHits / overallTotal) * 100);
  ringPct.textContent = pct + '%';
  setRing(pct);
  hitVal.textContent = totalHits.toLocaleString();
  missVal.textContent = totalMisses.toLocaleString();
  renderEdges();
}

simulateTick();
setInterval(simulateTick, 1500);`,
  seo: {
    title: 'CDN Cache Hit Ratio Widget — Free HTML CSS JS Snippet',
    description: 'A live CDN dashboard widget with an animated SVG ring for overall cache hit rate, running hit/miss counters, and a per-edge-location breakdown. Exports to React, Vue & Tailwind.',
    about: {
      title: 'CDN Cache Hit Ratio Widget — Animated SVG Ring, Live Counters & Per-Edge Breakdown',
      description: `A CDN's entire value proposition comes down to one ratio: what fraction of requests get served from a nearby cache instead of round-tripping back to origin. This widget makes that ratio the visual centerpiece — a large animated ring shows the current overall hit rate, a running total of hits versus misses accumulates beside it, and a per-edge-location list breaks the same ratio down by region so a regression in one location doesn't hide inside a healthy global average.

**The ring drawn with stroke-dasharray, not a chart library**

The SVG has two overlapping circles of the same radius: a light gray track and a colored foreground circle whose \`stroke-dasharray\` is set to the circle's full circumference (\`CIRC = 2 * Math.PI * 48\`) and whose \`stroke-dashoffset\` is animated to represent the unfilled portion. Setting \`offset = CIRC - (pct / 100) * CIRC\` means at 0% the offset equals the full circumference (nothing visible) and at 100% the offset is 0 (the full circle drawn). The circle is rotated \`-90deg\` so the arc starts from 12 o'clock rather than the default 3 o'clock, matching how a progress ring is conventionally read. This is the standard pure-SVG technique for a progress ring with no canvas or charting dependency.

**The ring's color itself carries meaning, not just its fill amount**

\`setRing()\` sets the circle's \`stroke\` color based on threshold bands — green at 85%+, amber between 60-85%, red below 60% — recomputed on every tick. A cache hit ratio isn't just a number that goes up or down; it has industry-typical healthy ranges, and encoding that directly in the ring's color means a viewer doesn't need to know "is 72% good or bad" from memory, the amber color already answers that.

**Per-request simulation, not a single random number per tick**

\`simulateTick()\` doesn't just pick one random hit-rate percentage per second — it simulates a random *count* of individual requests (\`40 + Math.floor(Math.random() * 60)\`), routes each one to a randomly chosen edge location, and rolls a 90%-probability hit/miss outcome for each request individually before aggregating into both the global ring and each edge's own running total. This produces the same statistical texture real traffic has — some edges get more requests than others in a given tick purely by chance, and the overall ratio converges toward the underlying 90% probability over time rather than jumping around a single random value every second.

**Per-edge bars reveal what the global ring average hides**

The four \`.edge-row\` bars each compute their own \`hits / total\` percentage independently. Because every edge draws from the same 90% hit probability in this demo, they trend similarly, but in production this is exactly where regional cache configuration problems surface — an edge location with a stale cache-control policy or a recently added origin region can show a materially worse ratio than the global average while the ring alone stays reassuringly green.

**Numbers formatted for scanability at scale**

\`hitVal\` and \`missVal\` use \`.toLocaleString()\` rather than raw digit strings, so accumulated counts read as \`"12,480"\` instead of \`"12480"\` once the running totals grow past a few thousand over a long-running dashboard session.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the ring and counters update', text: 'Every 1.5 seconds a new batch of simulated requests updates the hit-rate ring, the running hit/miss totals, and the requests-per-second figure.' },
        { title: 'Watch the ring change color', text: 'The ring turns green at 85%+ hit rate, amber between 60-85%, and red below 60%, recalculated on every update.' },
        { title: 'Watch per-edge bars', text: 'Each of the four edge locations tracks its own independent hit ratio, useful for spotting a regional regression the global ring average might hide.' },
        { title: 'Replace the simulation with real metrics', text: 'Swap simulateTick() for a fetch call to your CDN provider\'s analytics API (Cloudflare, Fastly, CloudFront) polling real hit/miss counts per edge location.' },
        { title: 'Adjust the color thresholds', text: 'Change the 85 and 60 percentage breakpoints in setRing() to match what counts as healthy for your specific CDN configuration and content mix.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Pure SVG stroke-dasharray/stroke-dashoffset progress ring, no canvas or charting library',
      'Ring color shifts between green, amber, and red bands based on the current hit-rate percentage',
      'Per-request simulation with randomized request volume and per-edge routing, not a single random percentage per tick',
      'Independent per-edge-location hit ratio bars reveal regional regressions a global average can mask',
      'Running hit and miss counters formatted with toLocaleString for readability at scale',
      'Live pulsing "Live" indicator badge signals the data is actively updating',
      'Smooth CSS transitions on the ring offset, ring color, and edge bar widths avoid abrupt jumps',
      'Structured to swap the simulated tick function for a real CDN analytics API poll with minimal changes',
    ],
    useCases: [
      { icon: 'OPS', title: 'CDN and edge infrastructure dashboards', desc: 'The core use case — give an infrastructure team a live view of cache effectiveness across edge locations without opening a separate CDN provider console.' },
      { icon: 'DASH', title: 'Performance and reliability status boards', desc: 'Pair with a [Connection Pool Monitor Tile](/ui-snippets/connection-pool-monitor-tile/) and similar infra widgets on a shared team status wall or ops dashboard.' },
      { icon: 'ALERT', title: 'Cache configuration regression alerting', desc: 'A sudden drop in one edge\'s bar while others stay steady is a strong signal to investigate that region\'s cache-control headers or recent origin changes.' },
      { icon: 'CHART', title: 'Cost and origin-load capacity planning', desc: 'A falling global hit rate directly predicts rising origin server load and CDN bandwidth cost, making this ring a useful early input to capacity discussions.' },
      { icon: 'CODE', title: 'Learn SVG progress ring construction', desc: 'A clean, dependency-free example of building an animated circular progress indicator from two overlapping SVG circles and stroke-dashoffset math.' },
    ],
    faqs: [
      { q: 'How is the SVG ring drawn without a charting library?', a: 'Two SVG circles of the same radius overlap — a static gray track and a colored foreground circle. The foreground circle\'s stroke-dasharray is set to its full circumference, and its stroke-dashoffset is set to circumference minus (percentage/100 times circumference), which visually reveals more of the stroke as the percentage rises. Rotating the circle -90 degrees makes the arc start from the top instead of the default right-hand starting point.' },
      { q: 'Why does the ring change color instead of staying one color?', a: 'setRing() sets the stroke color to green at 85% or higher, amber between 60% and 85%, and red below 60%, recalculated on every update. This lets the color itself communicate whether the current hit rate is healthy without requiring the viewer to know what a "good" cache hit ratio number looks like.' },
      { q: 'Why does the simulation generate a random number of requests instead of a single random percentage each tick?', a: 'simulateTick() picks a random request count per tick and rolls an individual hit/miss outcome (with a 90% hit probability) for each simulated request, aggregating them into per-edge and global totals. This produces the same statistical variability real traffic shows — some ticks and some edges naturally skew higher or lower by chance — rather than a single smoothly random percentage that would not resemble real request-level data.' },
      { q: 'Why might one edge location show a worse hit rate than the overall ring?', a: 'Each edge tracks its own hits and total requests independently and computes its own percentage. In production this is exactly where a regional cache misconfiguration, a stale cache-control policy, or a newly added origin region would surface as a below-average bar even while the global ring stays in a healthy color band, since the ring only reflects the aggregate across all edges combined.' },
      { q: 'How do I connect this to a real CDN provider?', a: 'Replace simulateTick() with a periodic fetch() call to your CDN\'s analytics or logs API (for example Cloudflare Analytics, Fastly real-time stats, or CloudFront metrics), map the response into totalHits, totalMisses, and each EDGES entry\'s hits/total counts, and call the same setRing() and renderEdges() functions to update the display from real numbers instead of the random simulation.' },
      { q: 'Why do the hit and miss counters use toLocaleString?', a: 'toLocaleString() formats large numbers with thousands separators (for example "12,480" instead of "12480"), which keeps the running totals easy to scan at a glance once a long-running dashboard session accumulates counts into the thousands or more.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the stroke-dasharray and stroke-dashoffset values combine to draw a partial circle, and why the SVG circle needs a -90 degree rotation for the ring to start filling from the top rather than the right side. The same assistant can help optimize it — for instance asking whether the per-request simulation loop would still perform well if the requests-per-second figure were scaled up by 100x for a much higher-traffic demo. It's also useful for extending the widget: ask it to add a historical sparkline of hit rate over the last few minutes, support configurable color thresholds passed as props, or add a tooltip on each edge bar showing raw hit and miss counts on hover. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "CDN cache hit ratio" dashboard widget in HTML, CSS, and vanilla JavaScript — no charting or SVG library, hand-rolled SVG only.

Requirements:
- Draw an animated circular progress ring using two overlapping SVG circles (a static background track and a colored foreground arc) with the foreground arc's fill percentage controlled purely through stroke-dasharray and stroke-dashoffset math — no canvas, no external charting library — and display the current overall cache hit percentage as text in the ring's center.
- The ring's stroke color must switch between at least three distinct color bands (for example green, amber, red) based on which percentage range the current hit rate falls into, recalculated every time the value updates.
- Simulate live traffic on an interval (roughly every one to two seconds): generate a random number of individual simulated requests per tick, route each one to a randomly chosen edge location from a list of at least four named regions, and independently roll a hit-or-miss outcome for each individual request (do not just generate one random percentage per tick) — aggregate these into a running global hit/miss total and per-edge-location hit/miss totals.
- Display running total hit and miss counters (formatted with thousands separators) and a requests-per-second figure that update on each tick, plus a live-updating requests-per-second value.
- Render one horizontal bar per edge location showing that location's own independently computed hit-rate percentage, so a regional regression is visible even when the global ring stays in a healthy color band.
- All numeric transitions (ring fill, bar widths) should animate smoothly between values rather than jumping instantly.`,
    },
  },
};

export default cdnCacheHitRatioWidget;
