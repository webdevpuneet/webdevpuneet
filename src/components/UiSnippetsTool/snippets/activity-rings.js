const activityRings = {
  id: 'activity-rings',
  title: 'Activity Rings',
  lastmod: '2026-06-22',
  category: 'dashboards',
  html: `<div class="arg-card">
  <div class="arg-head">
    <h3>Today's activity</h3>
    <span class="arg-date">Mon, Jun 22</span>
  </div>

  <div class="arg-main">
    <svg class="arg-rings" viewBox="0 0 200 200" id="argRings"></svg>

    <div class="arg-legend" id="argLegend"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.arg-card{background:#111827;border:1px solid #1f2937;border-radius:20px;padding:24px;width:100%;max-width:380px;box-shadow:0 18px 44px rgba(0,0,0,.45)}
.arg-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:6px}
.arg-head h3{font-size:16px;font-weight:800;color:#f8fafc}
.arg-date{font-size:12px;color:#6b7280;font-weight:600}

.arg-main{display:flex;align-items:center;gap:22px;margin-top:14px}
.arg-rings{width:160px;height:160px;flex-shrink:0}
.arg-track{fill:none;stroke-linecap:round}
.arg-prog{fill:none;stroke-linecap:round;transition:stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)}

.arg-legend{display:flex;flex-direction:column;gap:13px}
.arg-row{display:flex;flex-direction:column;gap:2px}
.arg-row-top{display:flex;align-items:center;gap:7px}
.arg-dot{width:9px;height:9px;border-radius:50%}
.arg-name{font-size:12px;font-weight:700;color:#e5e7eb}
.arg-vals{font-size:16px;font-weight:800;color:#f8fafc;font-variant-numeric:tabular-nums;padding-left:16px}
.arg-vals small{font-size:11px;font-weight:600;color:#6b7280}
.arg-pct{font-size:10.5px;font-weight:700;padding-left:16px}`,

  js: `var RINGS = [
  { name: 'Move',    value: 520, goal: 600, unit: 'cal', color: '#fb2c5a' },
  { name: 'Exercise',value: 38,  goal: 30,  unit: 'min', color: '#a3f307' },
  { name: 'Stand',   value: 9,   goal: 12,  unit: 'hr',  color: '#22d3ee' },
];
var SIZE = 200, CENTER = 100, GAP = 8, STROKE = 17;
var svg = document.getElementById('argRings');
var NS = 'http://www.w3.org/2000/svg';

function build() {
  RINGS.forEach(function (ring, i) {
    var r = CENTER - STROKE / 2 - 4 - i * (STROKE + GAP);
    var circ = 2 * Math.PI * r;
    var pct = Math.min(1, ring.value / ring.goal);

    var track = document.createElementNS(NS, 'circle');
    track.setAttribute('class', 'arg-track');
    track.setAttribute('cx', CENTER); track.setAttribute('cy', CENTER); track.setAttribute('r', r);
    track.setAttribute('stroke', ring.color); track.setAttribute('stroke-width', STROKE);
    track.setAttribute('opacity', '0.18');
    svg.appendChild(track);

    var prog = document.createElementNS(NS, 'circle');
    prog.setAttribute('class', 'arg-prog');
    prog.setAttribute('cx', CENTER); prog.setAttribute('cy', CENTER); prog.setAttribute('r', r);
    prog.setAttribute('stroke', ring.color); prog.setAttribute('stroke-width', STROKE);
    prog.setAttribute('transform', 'rotate(-90 ' + CENTER + ' ' + CENTER + ')');
    prog.setAttribute('stroke-dasharray', circ);
    prog.setAttribute('stroke-dashoffset', circ);   // start empty, animate to filled
    svg.appendChild(prog);

    // Animate after a frame so the transition runs.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { prog.setAttribute('stroke-dashoffset', circ * (1 - pct)); });
    });
  });

  document.getElementById('argLegend').innerHTML = RINGS.map(function (ring) {
    var pct = Math.round((ring.value / ring.goal) * 100);
    return '<div class="arg-row">' +
      '<div class="arg-row-top"><span class="arg-dot" style="background:' + ring.color + '"></span><span class="arg-name">' + ring.name + '</span></div>' +
      '<span class="arg-vals">' + ring.value + '<small>/' + ring.goal + ' ' + ring.unit + '</small></span>' +
      '<span class="arg-pct" style="color:' + ring.color + '">' + pct + '%' + (pct >= 100 ? ' ✓' : '') + '</span>' +
    '</div>';
  }).join('');
}

build();`,

  seo: {
    title: 'Activity Rings — Concentric Progress Rings HTML CSS',
    description: `Apple-style concentric activity rings drawn in SVG, animating to each goal's progress, with a value/goal legend. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Activity Rings — Apple-Style Concentric Goal Rings in SVG',
      description: `Apple's activity rings — three nested, brightly colored arcs that fill as you close each daily goal — are one of the most recognizable data visualizations ever shipped, because they pack three progress metrics into one glanceable, motivating graphic. This snippet recreates that concentric-rings pattern in plain HTML, CSS, and SVG: any number of rings, each animating from empty to its goal percentage, with a matching value/goal legend.

**Nested rings from one loop**

Each ring is a pair of SVG circles — a faint full-circle track and a colored progress arc — sharing a center but with a decreasing radius so they nest inside one another. The radius for ring \`i\` steps inward by the stroke width plus a gap (\`CENTER − STROKE/2 − 4 − i × (STROKE + GAP)\`), so the rings sit concentrically with even spacing regardless of how many you add. Thick \`stroke-linecap: round\` strokes give the signature chunky, rounded-end look. It's all generated in a single loop over the ring data, so three rings or five is the same code.

**The fill is stroke-dashoffset, capped at 100%**

Each progress arc uses the \`stroke-dasharray\` / \`stroke-dashoffset\` technique: the dasharray is set to the circle's circumference, and the dashoffset starts at the full circumference (empty) and animates to \`circumference × (1 − percent)\` so the arc fills to exactly the goal fraction. The percent is clamped to 1, so an over-achieved goal (like 38 of 30 exercise minutes in the demo) fills the ring completely rather than overflowing — and the legend still shows the true 127%, the way Apple's rings do. The arcs are rotated −90° so they start filling from the top (12 o'clock) rather than 3 o'clock.

**Animation that draws the rings on**

On load, each arc starts empty and animates to its filled offset via a CSS transition with a smooth ease, using the double-\`requestAnimationFrame\` pattern to ensure the browser registers the starting state before the transition runs (otherwise it would jump straight to filled with no animation). The rings sweep into place over a second, which is both satisfying and draws the eye to each metric's progress — the motion is the moment that makes the rings feel alive rather than static.

**A legend that names the numbers**

Rings alone are evocative but ambiguous, so a legend lists each ring's name, current value over goal with units ("520/600 cal"), and percentage, color-matched to its arc, with a ✓ when a goal is met. This pairs the at-a-glance ring graphic with the precise numbers, covering both the "how am I doing overall" and "exactly what are my numbers" questions. Color is the link between a ring and its legend row.

**Fully data-driven and re-themeable**

Everything comes from the \`RINGS\` array — name, value, goal, unit, color — so adapting this to any three (or more) goals is a data edit. Apple uses Move/Exercise/Stand, but the same component works for any nested-goal display: daily tasks done, calories/protein/water, or three KPIs against targets. Swap the colors and labels and it fits any brand or metric set.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An activity-rings card renders on a dark background; the three rings animate from empty to their goal progress.` },
      { title: 'Read the rings', text: `Each concentric ring fills toward its goal — Move, Exercise, Stand — in its own color, starting from the top.` },
      { title: 'Check the legend', text: `The side legend shows each ring's value/goal with units and percentage, color-matched, with a ✓ when met.` },
      { title: 'Note over-achievement', text: `A goal exceeded (38/30 min) fills its ring completely while the legend shows the true 127%.` },
      { title: 'Edit the goals', text: `Change the RINGS array (name, value, goal, unit, color) — radii, animation, and legend all recompute.` },
      { title: 'Connect real data', text: `Populate RINGS from your fitness, habit, or goal data and re-run build() to draw the day's progress.` },
    ] },
    features: [
      { title: 'Concentric nested rings', text: `Each ring's radius steps inward by stroke + gap, so any number of rings nest evenly from one generation loop.` },
      { title: 'stroke-dashoffset goal fill', text: `Each arc fills to exactly its goal fraction via the dasharray/dashoffset technique, clamped so over-goals fill fully.` },
      { title: 'Draw-on animation', text: `Rings animate from empty to filled on load via a transition, using double-rAF so the animation actually runs.` },
      { title: 'Top-start arcs', text: `A −90° rotation starts each ring filling from 12 o'clock, the expected orientation.` },
      { title: 'Rounded chunky strokes', text: `stroke-linecap: round gives the signature thick, rounded-end ring look.` },
      { title: 'Value/goal legend', text: `A color-matched legend shows each ring's value over goal with units, percent, and a ✓ when complete.` },
      { title: 'True percent over 100%', text: `Exceeded goals fill the ring fully but the legend reports the real percentage, like Apple's rings.` },
      { title: 'Fully data-driven', text: `Name, value, goal, unit, and color come from the RINGS array — adapt to any nested-goal set with a data edit.` },
    ],
    useCases: [
      { title: 'Fitness and health apps', text: `Daily activity, step, or workout goals in the Apple-rings style — pair with a [streak tracker](/ui-snippets/streak-tracker/) for consistency.` },
      { title: 'Habit and goal tracking', text: `Show progress toward three daily habits at a glance, alongside a [profile completion](/ui-snippets/profile-completion/) ring.` },
      { title: 'Productivity dashboards', text: `Visualize tasks done, focus time, and breaks taken against targets.` },
      { title: 'Nutrition and wellness', text: `Track calories, protein, and water as three goal rings.` },
      { title: 'KPI goal attainment', text: `Display three business metrics against their targets in one compact graphic, beside [stat comparison cards](/ui-snippets/stat-comparison-card/).` },
      { title: 'Learning SVG ring techniques', text: `A reference for concentric rings and animated dashoffset fills — compare with an [SVG progress ring](/ui-snippets/svg-progress-ring/) for a single ring.` },
      { icon: 'CODE', title: 'Related: Live Ops Alert Feed Panel', desc: 'See the [Live Ops Alert Feed Panel](/ui-snippets/alert-feed-panel/) for a related dashboards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Canary Rollout Progress Tile', desc: 'See the [Canary Rollout Progress Tile](/ui-snippets/canary-rollout-progress-tile/) for a related dashboards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: CDN Cache Hit Ratio Widget', desc: 'See the [CDN Cache Hit Ratio Widget](/ui-snippets/cdn-cache-hit-ratio-widget/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add or change the rings?', a: `Edit the RINGS array — each entry has a name, value, goal, unit, and color. The build loop computes each ring's radius from its index, so adding a fourth ring nests it inside automatically; just give it a distinct color. The legend regenerates from the same array, so values and percentages update with no other changes.` },
      { q: 'How does a ring fill to exactly the goal percentage?', a: `Each progress arc's stroke-dasharray is set to the circle's circumference, turning the stroke into one dash as long as the ring. The stroke-dashoffset starts at the full circumference (fully hidden) and animates to circumference × (1 − percent), revealing exactly the goal fraction. The percent is clamped to 1 so an exceeded goal fills the ring completely rather than wrapping past the start.` },
      { q: 'Why use the double requestAnimationFrame for the animation?', a: `CSS transitions only animate when a property changes after the element is rendered with its initial value. Setting dashoffset to empty and immediately to filled in the same frame would skip the animation. Two nested requestAnimationFrame calls let the browser paint the empty state first, so the subsequent change to the filled offset transitions smoothly.` },
      { q: 'How do I show the true percentage when a goal is exceeded?', a: `Clamp only the visual fill (Math.min(1, value/goal) for the dashoffset) but compute the legend's percentage from the raw value/goal — so the ring caps at full while the number reads 127%. This mirrors Apple's behavior where the ring completes but the count keeps going, signaling over-achievement honestly.` },
      { q: 'How do I use activity rings in React, Vue, or Angular?', a: `In React, map the RINGS array to <circle> elements in JSX, computing each radius and dashoffset with useMemo, and trigger the animation with a mounted state or key; in Vue, use v-for with computed geometry; in Angular, use *ngFor. The radius/circumference/dashoffset math is plain SVG that ports unchanged — only the mount-time animation trigger uses each framework's lifecycle.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the circle geometry yourself — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the radius formula CENTER minus STROKE/2 minus 4 minus i times (STROKE plus GAP) keeps each ring evenly nested, and why the stroke-dashoffset is clamped separately from the percentage shown in the legend. The same assistant is useful for optimizing it — asking whether building the SVG circles imperatively with createElementNS is worth it here versus writing the SVG markup directly and only updating dashoffset in JS. It's just as good for extending the rings: ask it to add a fourth ring with a different unit, animate the legend numbers counting up alongside the ring fill, or make the rings interactive so clicking one shows a weekly history chart for that metric. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build Apple-style "activity rings" (concentric animated goal progress rings) in plain HTML, CSS, and JavaScript using SVG — no charting library, no canvas.

Requirements:
- A data array of ring objects, each with a name, current value, goal, unit, and color, rendered as nested SVG circles generated entirely from a loop (not one hardcoded circle per ring).
- Each ring must consist of two concentric SVG circle elements sharing the same center: a faint, low-opacity full "track" circle, and a colored "progress" arc drawn on top of it.
- Compute each ring's radius so that ring index 0 is the outermost and each subsequent ring's radius steps inward by exactly one stroke-width-plus-gap amount, so any number of rings nest evenly with no overlap and no gaps, using only the ring's index in the formula.
- The progress arc must use the stroke-dasharray/stroke-dashoffset technique: set the dasharray to the circle's circumference, start the dashoffset at the full circumference (empty), and animate it via a CSS transition to circumference times (1 minus the completion fraction) so it visually fills to the goal percentage. Clamp the fill fraction used for the dashoffset to a maximum of 100%, but keep tracking and displaying the true, uncapped percentage separately in a legend (so a ring that's 127% of goal shows a full ring but a legend that reads "127%").
- Rotate each progress arc -90 degrees around its center so it starts filling from the 12 o'clock position rather than 3 o'clock, and give the strokes a round linecap for the characteristic chunky rounded-end look.
- Trigger the fill animation using two nested requestAnimationFrame calls after the arcs are inserted into the DOM (not immediately), so the transition actually plays on load instead of jumping straight to the filled state.
- Generate a legend below or beside the rings from the same data array, showing each ring's color-matched dot, name, "value/goal unit" text, and percentage with a checkmark when the goal is met or exceeded.`,
    },
  },
};

export default activityRings;
