const gradientStatRing = {
  id: 'gradient-stat-ring',
  title: 'Gradient Stat Ring',
  lastmod: '2026-07-18',
  category: 'charts',
  html: `<div class="gr-grid" id="grGrid">
  <div class="gr-card">
    <svg class="gr-ring" viewBox="0 0 120 120" data-value="74">
      <defs><linearGradient id="grA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>
      <circle class="gr-track" cx="60" cy="60" r="52"/>
      <circle class="gr-fill" cx="60" cy="60" r="52" stroke="url(#grA)"/>
      <text class="gr-pct" x="60" y="66">0%</text>
    </svg>
    <div class="gr-label">Storage used</div>
  </div>
  <div class="gr-card">
    <svg class="gr-ring" viewBox="0 0 120 120" data-value="92">
      <defs><linearGradient id="grB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>
      <circle class="gr-track" cx="60" cy="60" r="52"/>
      <circle class="gr-fill" cx="60" cy="60" r="52" stroke="url(#grB)"/>
      <text class="gr-pct" x="60" y="66">0%</text>
    </svg>
    <div class="gr-label">Goal progress</div>
  </div>
  <div class="gr-card">
    <svg class="gr-ring" viewBox="0 0 120 120" data-value="48">
      <defs><linearGradient id="grC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbbf24"/><stop offset="1" stop-color="#f97316"/></linearGradient></defs>
      <circle class="gr-track" cx="60" cy="60" r="52"/>
      <circle class="gr-fill" cx="60" cy="60" r="52" stroke="url(#grC)"/>
      <text class="gr-pct" x="60" y="66">0%</text>
    </svg>
    <div class="gr-label">CPU load</div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e16;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.gr-grid{display:flex;flex-wrap:wrap;gap:18px}
.gr-card{background:#141925;border:1px solid #232b3d;border-radius:18px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:12px;width:170px}
.gr-ring{width:120px;height:120px;transform:rotate(-90deg)}
.gr-track{fill:none;stroke:#222a3a;stroke-width:10}
.gr-fill{fill:none;stroke-width:10;stroke-linecap:round;transition:stroke-dashoffset 1.3s cubic-bezier(.22,1,.36,1)}
.gr-pct{fill:#fff;font-size:24px;font-weight:800;text-anchor:middle;transform:rotate(90deg);transform-origin:60px 60px;font-variant-numeric:tabular-nums}
.gr-label{color:#8a94a8;font-size:13px;font-weight:500}`,

  js: `var rings = Array.prototype.slice.call(document.querySelectorAll('.gr-ring'));
var R = 52;
var CIRC = 2 * Math.PI * R; // circumference of the progress circle

rings.forEach(function (svg) {
  var fill = svg.querySelector('.gr-fill');
  // Lay the dash out as one full ring, then hide all of it to start.
  fill.style.strokeDasharray = CIRC;
  fill.style.strokeDashoffset = CIRC;
});

function animateTo(svg) {
  var value = Math.max(0, Math.min(100, parseFloat(svg.dataset.value)));
  var fill = svg.querySelector('.gr-fill');
  var text = svg.querySelector('.gr-pct');
  // Reveal a fraction of the ring by shortening the dash offset.
  fill.style.strokeDashoffset = CIRC * (1 - value / 100);
  // Count the percentage label up to match the sweep duration.
  var start = null, dur = 1300;
  function frame(t) {
    if (start === null) start = t;
    var p = Math.min((t - start) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    text.textContent = Math.round(value * eased) + '%';
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// Animate the rings when the grid scrolls into view, once.
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { rings.forEach(animateTo); io.disconnect(); }
  });
}, { threshold: 0.3 });
io.observe(document.getElementById('grGrid'));`,

  seo: {
    title: 'Gradient Stat Ring — Free HTML CSS JS Progress Ring Snippet',
    description: `SVG circular progress rings with gradient strokes that sweep to a value while the percentage counts up, triggered on scroll. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Gradient Stat Ring — Circular Progress With a Counting Label',
      description: `The gradient stat ring is the circular progress indicator you see on dashboards and fitness apps — a gradient arc that sweeps around to represent a percentage while the number in the centre counts up to match. This snippet builds a responsive grid of them with pure SVG, CSS, and a small vanilla JavaScript driver, with no charting library.

**Stroke-dash geometry**

Each ring is two stacked SVG circles: a muted track and a coloured fill, both with the same radius. The fill's progress is controlled by the classic \`stroke-dasharray\` / \`stroke-dashoffset\` trick. The dash array is set to the full circumference (\`2πr\`) so a single dash wraps the whole circle, and the offset is then set to the same length to hide it entirely. Animating the offset down to \`circumference × (1 − value/100)\` reveals exactly that fraction of the arc, which is how the ring "fills".

**Why the SVG is rotated**

By default SVG circles start their stroke at 3 o'clock, so the whole \`<svg>\` is rotated \`-90deg\` to move the start point to 12 o'clock — the natural top-of-the-clock origin people expect from a progress ring. The centre percentage \`<text>\` is then counter-rotated \`90deg\` around the ring's centre so the label stays upright despite the parent rotation.

**Gradient strokes**

Each fill is painted with \`stroke="url(#id)"\` referencing an SVG \`<linearGradient>\`, giving the arc a two-colour gradient that reads as premium and distinguishes one metric from another. Because the gradient is defined per-SVG with a unique id, several rings can carry different colour ramps on the same page without clashing.

**Synchronised sweep and count**

The arc animation is pure CSS — a \`transition\` on \`stroke-dashoffset\` with an ease-out cubic-bezier so it decelerates as it lands. The centre number is animated separately in JavaScript with \`requestAnimationFrame\` over the same duration and an ease-out curve, so the label and the arc finish together. The figure uses \`font-variant-numeric: tabular-nums\` so it does not jitter horizontally while counting.

**Scroll-triggered, once**

An \`IntersectionObserver\` starts every ring when the grid is 30% in view and then disconnects, so the fill and count play exactly once as the section appears — the standard performant trigger, with no scroll listener. Values are clamped to 0–100 so out-of-range data can't overdraw the arc.

**Customizing it**

Set each ring's target with a \`data-value\` attribute, change the gradient stops, adjust the \`stroke-width\` for thicker or thinner arcs, or tune the transition duration. Add more cards and the grid wraps responsively. Pair the rings with a [metric card grid](/ui-snippets/metric-card-grid/) or a [glass stat card](/ui-snippets/glass-stat-card/) for a complete dashboard panel.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three stat rings render empty at 0%.` },
      { title: 'Scroll them into view', text: `Each arc sweeps to its value and the number counts up.` },
      { title: 'Note the gradients', text: `Every ring carries its own two-colour stroke.` },
      { title: 'Set a value', text: `Change a ring's data-value attribute.` },
      { title: 'Recolor a ring', text: `Edit its linearGradient stops.` },
      { title: 'Adjust thickness', text: `Tune the stroke-width on track and fill.` },
    ] },
    features: [
      { title: 'Pure SVG rings', text: `Stroke-dash geometry, no chart library.` },
      { title: 'Gradient strokes', text: `Per-ring linearGradient stroke fills.` },
      { title: 'Counting label', text: `Centre number eases up to the value.` },
      { title: 'Synced timing', text: `Arc and count finish together.` },
      { title: 'Top-start origin', text: `SVG rotated so fill begins at 12 o'clock.` },
      { title: 'Tabular figures', text: `Equal-width digits prevent jitter.` },
      { title: 'Scroll-triggered', text: `IntersectionObserver fires once in view.` },
      { title: 'Clamped values', text: `0–100 guard prevents overdraw.` },
    ],
    useCases: [
      { title: 'Dashboards', text: `Show KPIs beside a [metric card grid](/ui-snippets/metric-card-grid/).` },
      { title: 'Usage meters', text: `Storage and quota next to a [glass stat card](/ui-snippets/glass-stat-card/).` },
      { title: 'Fitness apps', text: `Pair activity rings with a [streak tracker](/ui-snippets/streak-tracker/).` },
      { title: 'Goal tracking', text: `Progress toward a target in a [feature checklist](/ui-snippets/feature-checklist/).` },
      { title: 'Reports', text: `Headline percentages above a [donut chart](/ui-snippets/donut-chart/).` },
      { title: 'Status panels', text: `Resource load on a [status dashboard](/ui-snippets/status-dashboard/).` },
      { icon: 'CODE', title: 'Related: Range Area Chart', desc: 'See the [Range Area Chart](/ui-snippets/range-area-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the ring fill to a percentage?', a: `Each ring is two SVG circles — a track and a fill — with the fill controlled by stroke-dasharray and stroke-dashoffset. The dash array equals the circumference, 2 times pi times r, so one dash wraps the circle; the offset starts at the full length to hide it, then animates down to circumference times (1 minus value over 100) to reveal exactly that fraction.` },
      { q: 'Why does the arc start at the top?', a: `By default an SVG circle's stroke begins at 3 o'clock, so the whole svg is rotated -90 degrees to move the start to 12 o'clock, the origin people expect from a progress ring. The centre percentage text is counter-rotated 90 degrees around the ring's centre so the label stays upright.` },
      { q: 'How do the arc and the number stay in sync?', a: `The arc uses a CSS transition on stroke-dashoffset with an ease-out cubic-bezier. The centre number is animated separately with requestAnimationFrame over the same duration and an ease-out curve, so both finish together. The figure uses tabular-nums so it does not shift horizontally while counting.` },
      { q: 'Can each ring have a different color?', a: `Yes. Each fill references its own SVG linearGradient by id with stroke="url(#id)", so every ring can carry a distinct two-colour ramp on the same page without clashing. Change the gradient stops to recolour a ring, and keep the ids unique per ring.` },
      { q: 'How do I use this gradient stat ring in React, Vue, or Angular?', a: `Render the SVG in your template and compute strokeDashoffset from a value prop as circumference times (1 minus value/100). Run the centre count-up in a mount effect with requestAnimationFrame, writing to a ref'd text node, and start it from an IntersectionObserver. Give each gradient a unique id (e.g. include the component key) so multiple instances do not collide.` },
    ],
    aiPrompt: {
      paragraph: `Rather than working out the trigonometry of the stroke-dash trick by hand, hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain precisely why the svg element is rotated -90 degrees while the percentage text inside it is separately counter-rotated 90 degrees around the ring's own center, and how the stroke-dashoffset formula circumference times one minus value over 100 actually reveals the arc. The same assistant is useful for optimization too — ask whether running a requestAnimationFrame loop per ring scales fine for a dozen rings on one dashboard or whether the count-up should share a single rAF driver across all rings. It's also a quick way to extend the effect: ask it to add a second, thinner ring showing a target or comparison value, support negative or over-100 values with a visual warning color, or replay the animation whenever the underlying data value changes rather than only once on scroll. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a grid of circular gradient progress rings in plain SVG, CSS, and vanilla JavaScript, no charting library, triggered once via IntersectionObserver.

Requirements:
- Each ring is an svg containing two concentric circles of the same radius: a muted track circle and a colored fill circle, plus a linearGradient definition with a unique id per ring referenced by the fill circle's stroke attribute as a url reference.
- The fill circle's progress must be controlled with stroke-dasharray set to the full circumference (2 times pi times the radius) so one dash wraps the entire circle, and stroke-dashoffset animated from the full circumference (fully hidden) down to circumference times one minus the target value over 100 (revealing that fraction of the arc).
- The whole svg element must be rotated -90 degrees so the arc begins at the 12 o'clock position instead of the default 3 o'clock start, and the centered percentage text element must be separately rotated 90 degrees around the ring's own center point so it reads upright despite the parent rotation.
- The stroke-dashoffset change should animate via a CSS transition with an ease-out cubic-bezier curve, and independently, a centered percentage label must count up from 0 to the target value using requestAnimationFrame with a matching ease-out easing function over the same duration, so the number and the arc finish together.
- Use font-variant-numeric: tabular-nums on the percentage label so the digits do not shift horizontally while counting.
- Clamp every target value to between 0 and 100 before using it in any calculation.
- Use a single IntersectionObserver watching the ring grid's container, firing the sweep-and-count animation for every ring only once when at least 30 percent of the grid is visible, then disconnecting the observer.`,
    },
  },
};

export default gradientStatRing;
