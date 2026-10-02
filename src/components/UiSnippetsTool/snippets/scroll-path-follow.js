const scrollPathFollow = {
  id: 'scroll-path-follow',
  title: 'Scroll Path Follow',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="spf-top"><p>Scroll ↓</p></section>
<section class="spf-journey">
  <svg class="spf-svg" viewBox="0 0 600 1400" preserveAspectRatio="xMidYMid meet">
    <path id="spfTrack" class="spf-track" d="M300,40 C520,180 80,320 300,470 C520,620 80,760 300,910 C520,1060 120,1200 300,1340"/>
    <path id="spfDrawn" class="spf-drawn" d="M300,40 C520,180 80,320 300,470 C520,620 80,760 300,910 C520,1060 120,1200 300,1340"/>
    <circle class="spf-stop" cx="300" cy="40" r="9"/>
    <circle class="spf-stop" cx="300" cy="470" r="9"/>
    <circle class="spf-stop" cx="300" cy="910" r="9"/>
    <circle class="spf-stop" cx="300" cy="1340" r="9"/>
    <g id="spfShip"><circle r="15" class="spf-ship-glow"/><text y="8" text-anchor="middle" font-size="22">🚀</text></g>
  </svg>
  <div class="spf-label" style="top:1%">Launch</div>
  <div class="spf-label" style="top:32%">First orbit</div>
  <div class="spf-label" style="top:63%">Deep space</div>
  <div class="spf-label" style="top:94%">Arrival</div>
</section>
<section class="spf-bottom"><p>The rocket rode the curve — scroll up to fly it home.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.spf-top,.spf-bottom{min-height:60vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.spf-journey{position:relative;max-width:640px;margin:0 auto;padding:0 20px}
.spf-svg{display:block;width:100%;height:auto}
.spf-track{fill:none;stroke:rgba(255,255,255,.1);stroke-width:3;stroke-dasharray:2 10;stroke-linecap:round}
.spf-drawn{fill:none;stroke:url(#spfG);stroke:#818cf8;stroke-width:3;stroke-linecap:round}
.spf-stop{fill:#0d1122;stroke:#3a4062;stroke-width:3;transition:stroke .3s,fill .3s}
.spf-stop.is-hit{fill:#818cf8;stroke:#c7d2fe}
.spf-ship-glow{fill:rgba(129,140,248,.28)}
.spf-label{position:absolute;left:50%;transform:translateX(-50%);margin-left:130px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8a90a8}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var track = document.getElementById('spfTrack');
var drawn = document.getElementById('spfDrawn');
var ship = document.getElementById('spfShip');
var stops = document.querySelectorAll('.spf-stop');

// getTotalLength gives the curve's true arc length — the basis for both
// the trailing draw and the ship's position lookup.
var LEN = track.getTotalLength();
drawn.style.strokeDasharray = LEN;
drawn.style.strokeDashoffset = LEN;

// Pre-compute each stop's distance along the path (by nearest sampling).
var stopDist = [0, 0.333, 0.666, 1].map(function (f) { return f * LEN; });

var state = { d: 0 };
function render() {
  var pt = track.getPointAtLength(state.d);
  var ahead = track.getPointAtLength(Math.min(state.d + 2, LEN));
  var angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180 / Math.PI;
  // The rocket emoji points up-right (45°), so offset the heading.
  ship.setAttribute('transform',
    'translate(' + pt.x + ',' + pt.y + ') rotate(' + (angle + 45) + ')');
  drawn.style.strokeDashoffset = LEN - state.d;
  stops.forEach(function (stop, i) {
    stop.classList.toggle('is-hit', state.d >= stopDist[i] - 4);
  });
}
render();

// Not pinned: the journey is laid out in the page, and progress maps to
// the section passing through the viewport.
gsap.to(state, {
  d: LEN,
  ease: 'none',
  scrollTrigger: {
    trigger: '.spf-journey',
    start: 'top 70%',
    end: 'bottom 45%',
    scrub: 0.5
  },
  onUpdate: render
});`,

  seo: {
    title: 'Scroll Path Follow — Free GSAP SVG Motion Snippet',
    description: `A rocket rides a curved SVG path as you scroll — getPointAtLength positioning, heading rotation, trailing draw, and milestone dots. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Path Follow — Move an Element Along an SVG Path With Scroll',
      description: `The scroll path follow sends an element — here a rocket — traveling along a curved SVG path as the page scrolls, rotating to face its direction of travel while the path draws itself behind it and milestone dots light up as they're passed. It's the backbone of journey maps, process trails, and delivery-route sections. This snippet builds it with GSAP ScrollTrigger (from a CDN) and the SVG geometry API — no MotionPathPlugin required.

**getPointAtLength is the whole positioning engine**

SVG paths expose their geometry: \`getTotalLength()\` returns the curve's true arc length, and \`getPointAtLength(d)\` returns the exact x/y coordinate at distance \`d\` along it. The snippet tweens a single number — \`state.d\` from 0 to the path length — and on every update asks the path where that distance lands, then writes a \`translate()\` transform on the ship group. The browser does all the Bézier math; the animation code never touches curve equations.

**Heading comes from sampling two points**

To rotate the rocket into its direction of travel, the render step samples the path twice — at \`d\` and at \`d + 2\` — and takes \`Math.atan2\` of the difference for the tangent angle. This two-point finite difference is the standard way to get a heading without derivative math, and the 2-unit lookahead is small enough to hug tight curves. A +45° offset compensates for the rocket emoji's natural up-right orientation.

**The trail is the same dash trick, sharing the same distance**

A second copy of the path sits on top with \`stroke-dasharray\` and \`stroke-dashoffset\` set to the full length (invisible). Each frame sets its offset to \`LEN − state.d\` — so the drawn portion always ends exactly under the ship. Because trail and ship both derive from one number, they can never desynchronize, no matter how fast the user scrubs.

**Milestone dots light up by distance thresholds**

Each stop's distance along the path is precomputed as a fraction of \`LEN\`; the render loop toggles an \`is-hit\` class when \`state.d\` passes it (with a 4-unit tolerance so the dot fires as the ship touches it, not after). CSS transitions handle the fill/stroke pop, keeping per-frame JS to class toggles.

**Unpinned on purpose**

Unlike most scroll-driven effects, this one doesn't pin: the journey is laid out in normal document flow, and the trigger maps \`top 70% → bottom 45%\` of the section's passage through the viewport onto the tween. The rocket travels as the page travels — appropriate for a tall roadmap section where labels sit beside the curve at fixed document positions. \`scrub: 0.5\` smooths wheel steps into glides.

**The viewBox makes it responsive for free**

All geometry lives in a 600×1400 viewBox, so the same path coordinates work at any rendered size — \`getPointAtLength\` returns viewBox units and the transform applies in the same space. No resize listeners needed.

**Customizing it**

Redraw the \`d\` attribute in any editor (both path copies must match), move the stops, or swap the rocket for a truck, plane, or dot. Related: [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) for the line-only version, [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) for a straight-rail variant, and [vertical timeline](/ui-snippets/vertical-timeline/) for a static cousin.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A dotted track, trail path, stops, and rocket render.` },
      { title: 'Scroll the page', text: `The rocket rides the curve as the section passes.` },
      { title: 'Watch the milestones', text: `Dots light up the moment the ship touches them.` },
      { title: 'Scroll back up', text: `The rocket flies home and the trail un-draws.` },
      { title: 'Redraw the route', text: `Edit the path d attribute in both path copies.` },
    ] },
    features: [
      { title: 'True path riding', text: `getPointAtLength positions the ship.` },
      { title: 'Tangent heading', text: `Two-point sampling rotates into travel direction.` },
      { title: 'Synced trail', text: `Dashoffset draws to exactly under the ship.` },
      { title: 'Milestone dots', text: `Distance thresholds toggle is-hit stops.` },
      { title: 'No plugin needed', text: `Pure SVG geometry API, no MotionPath.` },
      { title: 'Unpinned flow', text: `Progress maps to the section passing by.` },
      { title: 'ViewBox responsive', text: `Same coordinates at every screen size.` },
      { title: 'Reversible', text: `Scrolling up rides the path backward.` },
    ],
    useCases: [
      { title: 'Journey roadmaps', text: 'Show product milestones along a winding trail, with a rocket positioned by `getPointAtLength` and rotated by sampling two nearby points for heading.' },
      { title: 'Delivery tracking pages', text: 'Ride a truck along a route beside an [order tracking timeline](/ui-snippets/order-tracking-timeline/), with milestone dots lighting as the vehicle passes each stop.' },
      { title: 'Process explainers', text: 'Guide readers from step to step, then detail each with [scroll sticky features](/ui-snippets/scroll-sticky-features/) or [scroll timeline dots](/ui-snippets/scroll-timeline-dots/).' },
      { title: 'Story characters', text: 'Let a character travel through a [scroll pin story](/ui-snippets/scroll-pin-story/), with the trail drawing to exactly under the moving ship.' },
      { title: 'Line-only and history variants', text: 'Drop the ship and use [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) for plain lines, or pair the trail with a [scroll year timeline](/ui-snippets/scroll-year-timeline/) for history routes.' },
      { icon: 'CODE', title: 'Related: Scroll Position Memory Across Tab Switches', desc: 'See the [Scroll Position Memory Across Tab Switches](/ui-snippets/scroll-restoration-tab-memory/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the rocket follow the curve without MotionPathPlugin?', a: `GSAP tweens one number — a distance along the path — and every update calls the SVG API getPointAtLength(d) to get the exact x/y at that distance, writing it into the ship's transform. The browser resolves all the Bézier math internally, so the follow logic is a dozen lines and needs no plugin.` },
      { q: 'How does the rocket know which way to face?', a: `Each frame samples the path at d and d + 2 and takes Math.atan2 of the difference — a finite-difference tangent that approximates the curve's direction. The result rotates the ship group, plus a +45° constant because the rocket emoji natively points up-right. Smaller lookaheads hug tighter curves; larger ones smooth jittery headings.` },
      { q: 'Why do the trail and the ship never drift apart?', a: `Both derive from the same tweened distance: the ship's position is getPointAtLength(d) and the trail's stroke-dashoffset is LEN − d, so the drawn stroke always terminates exactly under the ship. There's no second animation to fall out of phase — one number is the single source of truth for position, trail, heading, and milestone checks.` },
      { q: 'How do I change the route?', a: `Edit the d attribute — draw a path in Figma or Illustrator and paste it into both the track and drawn paths (they must be identical twins). getTotalLength adapts automatically. Reposition the milestone circles onto the new curve and adjust their stopDist fractions to match where along the length each stop sits.` },
      { q: 'How do I use this scroll path follow in React, Vue, or Angular?', a: `Inline the SVG and run the measurement plus tween in a mount effect — useEffect, onMounted, or ngAfterViewInit — since getTotalLength needs the rendered element; use refs, wrap setup in gsap.context, and revert on cleanup. Write the ship transform directly in onUpdate rather than through state, or you'll re-render every scroll frame. Labels and layout around the SVG work fine as Tailwind utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the SVG geometry math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how getPointAtLength turns a single tweened distance into both the ship's position and the trail's stroke-dashoffset, or why the heading angle is computed from two nearby sample points instead of a derivative formula. The same assistant can help optimize it — asking whether the 2-unit lookahead for tangent sampling should scale with path curvature, or whether milestone hit-testing could be replaced with a cheaper lookup for a path with many stops. It's also useful for extending the effect: ask it to add a second object trailing behind the first at a fixed distance offset, make milestones trigger a popup or sound on hit, or swap the rocket for an SVG icon that itself needs to be pre-rotated to match the path's starting tangent. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll path follow" effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) and native SVG geometry methods — do not use MotionPathPlugin.

Requirements:
- An inline SVG containing a curved path (drawn with cubic Bezier commands), a second identical copy of that same path used only for a trailing draw effect, several small circles marking milestone stops along the curve, and a group element representing a moving object (e.g. an emoji or icon) that will travel along the path.
- On load, call getTotalLength on the track path to get its true arc length, and set the trail-copy path's stroke-dasharray and stroke-dashoffset both to that full length so it starts completely undrawn.
- Precompute each milestone's target distance along the path as a fraction of the total length (not by guessing pixel positions).
- Tween a single plain object's distance property from 0 to the path's total length using GSAP with ease none, driven by a ScrollTrigger with scrub enabled — the object must NOT be pinned; instead the trigger should map the distance the section travels through the viewport (e.g. from when its top nears the viewport to when its bottom passes a point near the top) onto the tween.
- On every update of that tween: call getPointAtLength on the track path at the current distance to position the moving object via a transform; sample a second point slightly further along the path and use Math.atan2 on the difference between the two points to compute a heading angle, then rotate the moving object to face that heading (adding any constant offset needed if the icon doesn't natively point along the positive x-axis); set the trail path's stroke-dashoffset to (total length minus current distance) so the drawn stroke always ends exactly at the moving object's current position; and toggle a css class on each milestone circle when the current distance passes that milestone's precomputed distance (with a small tolerance).
- Confirm scrolling back up moves the object backward along the path, un-draws the trail, and un-marks milestones, purely because the tween is scrubbed in reverse — no separate reverse logic.`,
    },
  },
};

export default scrollPathFollow;
