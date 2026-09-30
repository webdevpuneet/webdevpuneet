const loaderRouteTrackingProgress = {
  id: 'loader-route-tracking-progress',
  title: 'Route Tracking Progress Loader',
  category: 'loaders',
  html: `<div class="demo">
  <div class="route-card">
    <svg class="route-svg" viewBox="0 0 300 120" preserveAspectRatio="none">
      <path id="route-path" class="route-track" d="M 20 90 C 80 90, 70 20, 130 30 S 220 90, 280 40" />
      <path id="route-fill" class="route-fill" d="M 20 90 C 80 90, 70 20, 130 30 S 220 90, 280 40" />
      <circle id="route-pin" class="route-pin" r="6" />
      <circle class="route-endpoint" cx="20" cy="90" r="4.5" />
      <circle class="route-endpoint" cx="280" cy="40" r="4.5" />
    </svg>
    <div class="route-info">
      <div class="route-labels">
        <span class="route-label start">Warehouse</span>
        <span class="route-label end">Your door</span>
      </div>
      <div class="route-meta">
        <span class="route-pct" id="route-pct">0%</span>
        <span class="route-eta" id="route-eta">Calculating ETA…</span>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.route-card { width: 320px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; box-shadow: 0 14px 34px rgba(30,41,59,0.08); }

.route-svg { width: 100%; height: auto; display: block; overflow: visible; }
.route-track { fill: none; stroke: #e2e8f0; stroke-width: 3; stroke-linecap: round; }
.route-fill { fill: none; stroke: #6366f1; stroke-width: 3; stroke-linecap: round; }
.route-pin { fill: #6366f1; stroke: #fff; stroke-width: 2.5; filter: drop-shadow(0 2px 4px rgba(99,102,241,0.5)); }
.route-endpoint { fill: #94a3b8; }

.route-info { margin-top: 6px; }
.route-labels { display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 700; color: #475569; margin-bottom: 8px; }
.route-meta { display: flex; align-items: baseline; justify-content: space-between; }
.route-pct { font-size: 21px; font-weight: 800; color: #1e293b; font-variant-numeric: tabular-nums; }
.route-eta { font-size: 12px; font-weight: 600; color: #94a3b8; }`,
  js: `const NS = 'http://www.w3.org/2000/svg';
const pathTrack = document.getElementById('route-path');
const pathFill = document.getElementById('route-fill');
const pin = document.getElementById('route-pin');
const pctEl = document.getElementById('route-pct');
const etaEl = document.getElementById('route-eta');

const totalLen = pathTrack.getTotalLength();
pathFill.style.strokeDasharray = String(totalLen);
pathFill.style.strokeDashoffset = String(totalLen);

const TOTAL_MINUTES = 42;
let progress = 0;

function setProgress(t) {
  t = Math.max(0, Math.min(1, t));
  pathFill.style.strokeDashoffset = String(totalLen * (1 - t));
  const point = pathTrack.getPointAtLength(totalLen * t);
  pin.setAttribute('cx', point.x);
  pin.setAttribute('cy', point.y);
  pctEl.textContent = Math.round(t * 100) + '%';
  const remaining = Math.max(0, Math.round(TOTAL_MINUTES * (1 - t)));
  etaEl.textContent = t >= 1 ? 'Arrived' : \`ETA \${remaining} min\`;
}

function tick() {
  progress += 0.0022 + Math.random() * 0.0016;
  if (progress >= 1) {
    setProgress(1);
    return;
  }
  setProgress(progress);
  requestAnimationFrame(tick);
}

setProgress(0);
requestAnimationFrame(tick);`,
  seo: {
    title: 'Route Tracking Progress Loader — Free HTML CSS JS Snippet',
    description: 'A delivery-style loading indicator with a moving pin animated along an SVG path using getPointAtLength, a stroke-dashoffset trail fill and a live ETA countdown.',
    about: {
      title: 'Route Tracking Progress Loader — A Pin Animated Along an SVG Path with getPointAtLength',
      description: `Delivery and ride-tracking apps share a familiar visual language: a pin sliding along a curved route between two points, with the traveled portion of the path filled in behind it. This loader recreates that exact effect for any process that maps naturally onto "progress from A to B" — a shipment update, a multi-step pipeline, an onboarding journey — using two small SVG APIs, \`getTotalLength()\` and \`getPointAtLength()\`, instead of a generic percentage bar.

**Measuring and pre-filling the path**

The route is a single curved SVG \`<path>\` (built with cubic Bézier \`C\`/\`S\` commands) rendered twice on top of each other: a light gray \`.route-track\` showing the full route at all times, and a colored \`.route-fill\` on top representing only the traveled portion. On load, \`pathTrack.getTotalLength()\` measures the exact pixel length of the curve — impossible to know from the path's \`d\` attribute alone since it's a curve, not a straight line — and that length is used to set \`.route-fill\`'s \`stroke-dasharray\` to exactly one segment as long as the whole path, with \`stroke-dashoffset\` initially equal to that same length so nothing is visible yet. This is the same masking technique used by SVG progress rings, applied here to an arbitrary curved path instead of a circle.

**Revealing the traveled portion**

As \`progress\` (a 0-to-1 fraction) increases, \`setProgress()\` sets \`stroke-dashoffset\` to \`totalLen * (1 - t)\`, progressively revealing more of the \`.route-fill\` stroke from its start point exactly as \`t\` grows — at \`t = 0\` the full length is hidden, at \`t = 1\` the offset is zero and the entire colored path is visible, tracing precisely along the curve rather than a straight line between the two endpoints.

**Placing the pin exactly on the curve with getPointAtLength**

The moving pin's position is the trickiest part to get right without a library, because a curved path's x/y coordinates at "40% of the way along" cannot be computed with simple linear interpolation between the endpoints — the curve bows away from the straight line between them. \`pathTrack.getPointAtLength(totalLen * t)\` solves this directly: given a distance along the path, the browser's own SVG geometry engine returns the exact \`{x, y}\` point at that distance, which is assigned straight to the pin \`<circle>\`'s \`cx\`/\`cy\` attributes every frame. Because both the fill's dash offset and the pin's position are driven by the same \`totalLen * t\` calculation, the pin always sits exactly at the leading edge of the filled trail, never lagging behind or overshooting it.

**Progress simulation with a live ETA**

A \`requestAnimationFrame\` loop increments \`progress\` by a small randomized amount each frame (\`0.0022 + Math.random() * 0.0016\`), giving a naturally uneven, non-robotic pace rather than a perfectly linear count-up — closer to how a real delivery's reported progress fluctuates. Alongside the percentage, \`etaEl\` derives a remaining-minutes estimate directly from the same \`t\` value against a fixed \`TOTAL_MINUTES\` budget, so the numeric ETA and the visual pin position always stay in sync, both driven by one single source-of-truth progress value, and flips to "Arrived" once \`t\` reaches 1.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the pin travel', text: 'The pin animates along the exact curve of the SVG path using getPointAtLength(), with the trail behind it filling in via a stroke-dashoffset reveal.' },
        { title: 'Read the live percentage and ETA', text: 'Both are derived from the same 0-to-1 progress value each frame, so they always stay in sync with the pin\'s visual position.' },
        { title: 'Redraw the route', text: 'Edit the d attribute on both #route-path and #route-fill (they must match exactly) to change the route\'s shape — getTotalLength() automatically re-measures whatever curve you draw.' },
        { title: 'Change the total ETA budget', text: 'Adjust the TOTAL_MINUTES constant to change what "100%" represents in real time for the ETA calculation.' },
        { title: 'Replace simulated progress with real progress', text: 'Instead of incrementing progress by a random amount each frame, call setProgress(t) directly with a real fraction reported by your tracking API or backend.' },
        { title: 'Relabel the endpoints', text: 'Update the start and end text in .route-labels to match your use case — a delivery route, a pipeline stage name, or an onboarding step.' },
      ],
    },
    features: [
      'Pin position computed every frame with the native SVG getPointAtLength() API — exact, not approximated',
      'Traveled-trail reveal uses the same stroke-dasharray/dashoffset technique as SVG progress rings, applied to an arbitrary curve',
      'getTotalLength() measures the exact pixel length of a Bézier curve automatically, no manual math required',
      'Pin position and dashoffset reveal are both driven by one shared progress fraction, so they never drift out of sync',
      'Randomized per-frame increment gives a naturally uneven pace instead of a robotic linear count-up',
      'Live ETA countdown derived from the same progress value against a configurable total-time budget',
      'Fully reusable for any curved route shape — just edit the shared path d attribute',
      'No external mapping library, image asset, or animation library required',
    ],
    useCases: [
      { icon: 'APP', title: 'Delivery and order tracking screens', desc: 'Show a shipment moving from warehouse to doorstep with a live ETA, the standard visual pattern used by delivery and food-order tracking apps.' },
      { icon: 'FLOW', title: 'Multi-stage pipeline or job progress', desc: 'Represent an abstract process (a build pipeline, a data import, a multi-stage approval) as a journey along a path rather than a flat bar, giving it more narrative weight.' },
      { icon: 'ONBOARD', title: 'Onboarding or setup journey visualization', desc: 'Pair with a multi-step onboarding flow to show overall journey completion in a more visually engaging way than a plain [step progress](/ui-snippets/step-progress/) bar.' },
      { icon: 'DASH', title: 'Ride-sharing and logistics ETA widgets', desc: 'Reuse the same path-following pin technique for a ride-tracking or logistics dashboard widget showing a vehicle en route to a destination.' },
    ],
    faqs: [
      { q: 'How does the pin know exactly where to sit on a curved path?', a: 'It uses the native SVG method pathTrack.getPointAtLength(distance), which the browser computes directly from the path\'s actual geometry. Multiplying the path\'s total length (from getTotalLength()) by the current 0-to-1 progress fraction gives the exact distance to query, so the returned x/y point always lies precisely on the curve.' },
      { q: 'Why are there two separate path elements instead of one?', a: 'The two paths share the exact same d attribute so they trace identical curves, but serve different visual roles: .route-track is a static light-gray path always fully visible to show the whole route, while .route-fill uses stroke-dasharray/dashoffset to reveal only the traveled portion on top of it, in the accent color.' },
      { q: 'What happens if I change the route\'s shape?', a: 'Update the d attribute on both #route-path and #route-fill to the same new curve. Because getTotalLength() re-measures whatever path is present on load, the dash-based reveal and the pin\'s getPointAtLength() calls automatically adapt to the new curve\'s actual length and shape with no other changes needed.' },
      { q: 'How is the ETA calculated?', a: 'etaEl computes Math.round(TOTAL_MINUTES * (1 - t)) using the same t (0-to-1 progress) value that drives the pin position and trail fill, so the displayed minutes-remaining count is always mathematically consistent with how far the pin has visually traveled.' },
      { q: 'How do I connect this to a real tracking backend instead of simulated progress?', a: 'Remove or stop the requestAnimationFrame tick() loop and instead call setProgress(t) directly whenever your backend reports a new completion fraction (for example, distance traveled divided by total route distance), passing a value between 0 and 1.' },
      { q: 'Does this work if the SVG is resized responsively?', a: 'Yes — getPointAtLength() and getTotalLength() operate in the SVG\'s internal viewBox coordinate system, not screen pixels, so the pin stays correctly positioned on the curve regardless of how large or small the SVG is rendered on screen.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why getPointAtLength() is necessary instead of simply interpolating between the route's start and end coordinates, and how that relates to the stroke-dasharray/dashoffset technique used for the trail fill sharing the same underlying path length. It's also a good candidate for extension — ask it to add a small vehicle or delivery-truck icon that rotates to face its direction of travel along the curve (using the path's tangent angle at each point), multiple simultaneous pins tracking several shipments on the same route, or a version that reads real progress from a WebSocket or polling API instead of simulated increments.`,
      prompt: `Build a route-tracking progress loader in HTML, CSS and vanilla JavaScript using inline SVG — no external mapping library.

Requirements:
- Draw a single curved SVG path (using cubic Bézier commands, not a straight line) representing a route between two labeled endpoints, rendered twice: once as a static light-gray full-route track, and once as a colored "traveled" overlay using the exact same path shape.
- On load, measure the path's exact total length using the SVG getTotalLength() method, and use that measured length to set up a stroke-dasharray/stroke-dashoffset masking technique on the colored overlay path so it starts fully hidden.
- Animate a 0-to-1 progress value that reveals the colored overlay path proportionally (via stroke-dashoffset) as it increases, and independently position a circular "pin" element exactly on the curve at the corresponding distance using the SVG getPointAtLength() method — not linear interpolation between the endpoints — so the pin always sits precisely at the leading edge of the revealed trail.
- Advance the progress value using requestAnimationFrame with a small randomized per-frame increment so the pace feels natural rather than perfectly linear, and stop cleanly once progress reaches 100%.
- Show a live percentage readout and a live estimated-time-remaining countdown, both derived from the same underlying progress fraction so they never fall out of sync with each other or with the pin's visual position, and switch the ETA text to an "arrived" state once progress completes.`,
    },
  },
};

export default loaderRouteTrackingProgress;
