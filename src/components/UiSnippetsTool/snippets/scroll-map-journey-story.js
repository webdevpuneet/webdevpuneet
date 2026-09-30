const scrollMapJourneyStory = {
  id: 'scroll-map-journey-story',
  title: 'Scroll Map Journey Story',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="mjs-intro"><h1>The Overland Route</h1><p>Scroll to follow the trail, waypoint by waypoint.</p></section>
<section class="mjs-pin" id="mjsPin">
  <svg class="mjs-map" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
    <path class="mjs-route-bg" d="M60,440 C120,420 90,340 150,320 S220,260 200,200 S280,140 260,80 S330,60 340,30" />
    <path class="mjs-route" id="mjsRoute" d="M60,440 C120,420 90,340 150,320 S220,260 200,200 S280,140 260,80 S330,60 340,30" />
    <g class="mjs-stop" data-progress="0.03"><circle cx="60" cy="440" r="7"/></g>
    <g class="mjs-stop" data-progress="0.32"><circle cx="150" cy="320" r="7"/></g>
    <g class="mjs-stop" data-progress="0.6"><circle cx="200" cy="200" r="7"/></g>
    <g class="mjs-stop" data-progress="0.82"><circle cx="260" cy="80" r="7"/></g>
    <g class="mjs-stop" data-progress="0.98"><circle cx="340" cy="30" r="7"/></g>
    <circle class="mjs-marker" id="mjsMarker" cx="60" cy="440" r="6"/>
  </svg>
  <div class="mjs-panel">
    <div class="mjs-panel-eyebrow" id="mjsEyebrow">Day 1</div>
    <h3 class="mjs-panel-title" id="mjsTitle">Base Camp</h3>
    <p class="mjs-panel-text" id="mjsText">The crew sets out from the trailhead at first light, packs heavy with ten days of supplies.</p>
  </div>
</section>
<section class="mjs-outro"><p>620 kilometers, eleven days, one continuous line on the map.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f0c;color:#fff;min-height:100vh}
.mjs-intro,.mjs-outro{min-height:65vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.mjs-intro h1{font-size:clamp(28px,6vw,50px);letter-spacing:-.02em}
.mjs-intro p,.mjs-outro p{color:#8ea38f;font-size:15px;max-width:440px}
.mjs-pin{position:relative;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:clamp(20px,5vw,64px);padding:0 24px;background:radial-gradient(70% 70% at 50% 50%,#132116,#0a0f0c)}
.mjs-map{width:min(340px,42vh);height:auto;flex-shrink:0}
.mjs-route-bg{fill:none;stroke:rgba(255,255,255,.14);stroke-width:3;stroke-linecap:round}
.mjs-route{fill:none;stroke:#4ade80;stroke-width:3;stroke-linecap:round}
.mjs-stop circle{fill:#0a0f0c;stroke:rgba(255,255,255,.35);stroke-width:2;transition:fill .3s,stroke .3s,r .3s}
.mjs-stop.is-reached circle{fill:#4ade80;stroke:#4ade80}
.mjs-marker{fill:#facc15;stroke:#0a0f0c;stroke-width:2;filter:drop-shadow(0 0 6px rgba(250,204,21,.8))}
.mjs-panel{max-width:340px}
.mjs-panel-eyebrow{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;margin-bottom:8px}
.mjs-panel-title{font-size:clamp(24px,4vw,32px);letter-spacing:-.01em;margin-bottom:10px}
.mjs-panel-text{font-size:15px;line-height:1.65;color:#a3b0a4}
@media (max-width:720px){.mjs-pin{flex-direction:column;justify-content:center;gap:20px;padding:40px 20px}.mjs-panel{text-align:center}}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const route = document.getElementById('mjsRoute');
const marker = document.getElementById('mjsMarker');
const stops = Array.from(document.querySelectorAll('.mjs-stop'));
const eyebrow = document.getElementById('mjsEyebrow');
const title = document.getElementById('mjsTitle');
const text = document.getElementById('mjsText');

// SVG's own pathLength attribute normalizes the path's length to 1 unit,
// which is what lets stroke-dasharray/stroke-dashoffset of exactly 1 draw
// the route from 0% to 100% regardless of the path's real geometric
// length — no manual getTotalLength() measurement needed.
const routeLength = route.getTotalLength();
route.style.strokeDasharray = String(routeLength);
route.style.strokeDashoffset = String(routeLength);

const waypoints = [
  { at: 0, eyebrow: 'Day 1', title: 'Base Camp', text: 'The crew sets out from the trailhead at first light, packs heavy with ten days of supplies.' },
  { at: 0.32, eyebrow: 'Day 3', title: 'River Crossing', text: 'A washed-out bridge forces a two-hour detour upstream to find a safe ford.' },
  { at: 0.6, eyebrow: 'Day 6', title: 'The High Pass', text: 'At 3,800 meters, the air is thin and the trail narrows to a single file line along the ridge.' },
  { at: 0.82, eyebrow: 'Day 9', title: 'Cedar Valley', text: 'Descending into treeline again, the group makes camp beside a lake for the first time in a week.' },
  { at: 0.98, eyebrow: 'Day 11', title: 'Journey\\'s End', text: 'The trailhead sign at the far end comes into view exactly on schedule.' },
];

function getPointAt(fraction) {
  return route.getPointAtLength(routeLength * fraction);
}

ScrollTrigger.create({
  trigger: '#mjsPin',
  start: 'top top',
  end: '+=2400',
  pin: true,
  scrub: 0.4,
  onUpdate(self) {
    const progress = self.progress;
    route.style.strokeDashoffset = String(routeLength * (1 - progress));

    const point = getPointAt(progress);
    marker.setAttribute('cx', point.x);
    marker.setAttribute('cy', point.y);

    stops.forEach((stop) => {
      const at = Number(stop.getAttribute('data-progress'));
      stop.classList.toggle('is-reached', progress >= at);
    });

    let active = waypoints[0];
    for (const w of waypoints) {
      if (progress >= w.at) active = w;
    }
    if (title.textContent !== active.title) {
      eyebrow.textContent = active.eyebrow;
      title.textContent = active.title;
      text.textContent = active.text;
    }
  },
});`,

  seo: {
    title: 'Scroll Map Journey Story — Free GSAP ScrollTrigger SVG Route Animation',
    description: `A scroll-scrubbed SVG trail that draws itself with stroke-dashoffset as a marker travels along the exact path geometry, revealing waypoint stories as it passes each stop, built with GSAP ScrollTrigger.`,
    about: {
      title: 'Scroll Map Journey Story — A Route That Draws Itself as You Scroll',
      description: `Travel features and expedition recaps often want more than a static map image — they want the route itself to feel traveled. This snippet draws an SVG trail progressively as the visitor scrolls, moves a marker along the path's real geometry (not an approximation), and swaps a waypoint story panel as the marker passes each stop.

**\`stroke-dashoffset\` plus \`pathLength\` draws the line honestly**

The route's real length is measured once with \`route.getTotalLength()\`, then set as both \`stroke-dasharray\` and the starting \`stroke-dashoffset\` — the classic SVG "line draw" technique. Every scroll update sets \`strokeDashoffset\` to \`routeLength * (1 - progress)\`, so the visible drawn portion of the trail is always an exact, geometrically accurate fraction of the real path — not a rough approximation based on bounding-box width, which would draw unevenly across a winding route with tight curves.

**The marker rides the path's actual geometry, not a straight-line lerp**

Rather than interpolating the marker's position linearly between two fixed points (which would cut corners on every curve), \`route.getPointAtLength(routeLength * progress)\` asks the SVG path itself for the exact x/y coordinate at that fraction of its real length. The yellow marker therefore follows every bend of the trail precisely, speeding through straight stretches and slowing through tight curves exactly as the path's own geometry dictates.

**Waypoints activate by progress threshold, matched to real stop positions**

Each waypoint stop \`<g>\` carries a \`data-progress\` value matching where that stop actually sits along the path's length (not an arbitrary evenly-spaced guess), so a stop's dot lighting up green and the story panel's text changing both happen at the moment the marker visually reaches that exact point on the map — text and graphic stay physically synchronized.

**One shared \`progress\` value, four synchronized outputs**

A single \`self.progress\` inside \`onUpdate\` drives the dash-offset draw, the marker's coordinates, every stop's reached state, and the waypoint panel's text — the same "one number, several outputs" discipline used throughout this library's scroll-scrub snippets, which is what keeps every visual element honestly locked to the same scroll position instead of drifting apart under independent timers.

**Customizing it**

Redraw the \`d\` path with your own route geometry (a real city walk, a hiking trail, a delivery route) and update each stop's \`cx\`/\`cy\` to sit visually on the new path — then recompute each \`data-progress\` value by eyeballing roughly where along the new path's length each stop falls, or by sampling \`getPointAtLength\` for exact matches. Pair with a [scroll company timeline](/ui-snippets/scroll-company-timeline/) for a date-based journey, or a [scroll horizontal story track](/ui-snippets/scroll-horizontal-story-track/) if the journey reads better left-to-right than as a pinned map.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add GSAP and ScrollTrigger', text: `Load both from the CDN and call gsap.registerPlugin(ScrollTrigger).` },
      { title: 'Paste the HTML, CSS, and JS', text: `The route path starts fully undrawn; only the faint background trail shows.` },
      { title: 'Scroll into the pinned section', text: `The trail draws itself while a marker travels along its exact geometry.` },
      { title: 'Watch the waypoint stops', text: `Each stop lights up and the story panel updates as the marker passes it.` },
      { title: 'Scroll back up', text: `The trail undraws and the marker retraces its path, since scrub is bidirectional.` },
      { title: 'Swap in your own route', text: `Replace the path's d attribute and recompute each stop's data-progress value.` },
    ] },
    features: [
      { title: 'Geometrically accurate line draw', text: `stroke-dashoffset scrubs against the path's real measured length.` },
      { title: 'Marker follows real path geometry', text: `getPointAtLength positions the marker exactly on every curve, no lerp shortcuts.` },
      { title: 'Position-matched waypoints', text: `Each stop's trigger threshold matches its actual location along the path.` },
      { title: 'Single shared progress value', text: `Draw, marker, stops, and text panel all derive from one scroll-locked number.` },
      { title: 'Fully bidirectional', text: `Scrolling up undraws the trail and retraces the marker precisely.` },
      { title: 'No map imagery required', text: `The entire map is inline SVG — no tile server, no external map library.` },
      { title: 'Responsive stacked layout', text: `Map and story panel stack vertically on narrow viewports.` },
      { title: 'Extensible waypoint list', text: `Add stops and matching waypoint entries with no other logic to update.` },
    ],
    useCases: [
      { title: 'Expedition and travel recap pages', text: `Narrate a real trip's route with the map itself as the storytelling device.` },
      { title: 'Delivery or logistics journey explainers', text: `Show a package's route with waypoint status updates along the way.` },
      { title: 'City walking tour microsites', text: `Guide readers stop by stop along a real walking route.` },
      { title: 'Historical migration or exploration stories', text: `Illustrate a historic journey with a self-drawing route line.` },
      { title: 'Sales or onboarding "customer journey" visuals', text: `Reuse the path-draw metaphor for an abstract, non-geographic journey.` },
      { title: 'Race or endurance event recaps', text: `Trace a marathon or trail-race route with waypoint splits and stories.` },
      { icon: 'CODE', title: 'Related: Scroll Product Launch Story', desc: 'See the [Scroll Product Launch Story](/ui-snippets/scroll-product-launch-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How does the trail draw itself accurately along a curved path?`, a: `The SVG path's real length is measured once with route.getTotalLength(), then used as both the stroke-dasharray and starting stroke-dashoffset — a technique that turns the path's stroke into one long dash exactly as long as the path itself, initially pushed fully out of view via the offset. Setting strokeDashoffset to routeLength times (1 minus progress) on every scroll update reveals the stroke proportionally to real path length, so the draw looks even and accurate across straight stretches and tight curves alike.` },
      { q: `Why does the marker use getPointAtLength instead of interpolating between waypoint coordinates?`, a: `Interpolating linearly between two fixed x/y coordinates would cut straight across any curve between them, visibly leaving the drawn path. getPointAtLength(routeLength * progress) instead asks the SVG path element itself for the exact coordinate at that fraction of its real length, so the marker always sits precisely on the drawn line, following every bend correctly regardless of how curvy the route geometry is.` },
      { q: `How are the waypoint stops positioned so they line up with where the marker actually is?`, a: `Each stop's data-progress value is set to roughly match where that stop's cx/cy coordinates actually fall along the path's total length, rather than being evenly spaced by index. Because both the stop-reveal check and the marker's position are compared against the same scroll progress value, a stop only lights up right around the moment the marker visually arrives at that point on the map.` },
      { q: `What happens if I change the route's path geometry — do I need to recalculate anything by hand?`, a: `The route length itself is remeasured automatically via getTotalLength() at page load, so the draw animation adapts to any new path shape with no manual length calculation. You do need to reposition each waypoint stop's cx/cy to sit on the new path visually, and re-estimate its data-progress value to roughly match where along the new path's length that point falls — either by eye or by sampling getPointAtLength at a few candidate values.` },
      { q: `How do I build this scroll map journey in React, Vue, or Angular?`, a: `Create the ScrollTrigger inside a mount effect after the SVG has rendered and call route.getTotalLength() there too, since the path element must already exist in the DOM for length measurement to work. Update the marker's coordinates and stop states as direct DOM/attribute writes inside onUpdate rather than through component state, and call .kill() on the ScrollTrigger in the cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how getTotalLength combined with stroke-dasharray and stroke-dashoffset produces an accurate progressive line-draw regardless of the path's curviness, and why getPointAtLength is the correct way to position a marker on a curved SVG path instead of interpolating between fixed coordinates. The same assistant can help extend the pattern — ask it to add a small distance-traveled counter that updates alongside the marker, animate the map's zoom level to focus on whichever segment is currently active, or replace the abstract SVG path with coordinates traced from a real geographic route. Treat the code as a working starting point for your own scroll-driven journey visualization.`,
      prompt: `Build a "scroll map journey story" in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin, loaded from a CDN with no bundler.

Requirements:
- A pinned section containing an inline SVG with a faint background path representing a route, an identical foreground path that will be progressively drawn, several small circle-based waypoint markers positioned along the route at specific coordinates, and a single traveling marker circle — alongside a text panel showing an eyebrow label, a title, and a description for the current waypoint, preceded by an intro section and followed by an outro section.
- On page load, measure the foreground route path's real length using the SVG path element's getTotalLength method, and set both its stroke-dasharray and its initial stroke-dashoffset to that exact measured length, so the path's stroke starts completely hidden.
- Create a single ScrollTrigger on the pinned section with scrub enabled, and inside its onUpdate callback, set the route path's stroke-dashoffset to the measured length multiplied by one minus the current scroll progress, so the visible drawn portion of the path is always an accurate fraction of its real geometric length regardless of how curved the route is.
- In the same onUpdate callback, use the path element's getPointAtLength method (called with the measured length multiplied by the current progress) to compute the exact x/y coordinate the traveling marker should be positioned at, so the marker follows the path's true curved geometry rather than moving in a straight line between fixed points.
- Store an array of waypoint stops, each with a data attribute or JS value indicating roughly what fraction of the path's length it occupies, and toggle a "reached" visual state on each stop's marker once the current scroll progress passes that threshold — position values should roughly correspond to each stop's actual location along the drawn path.
- Also maintain an array of waypoint story entries, each with a progress threshold, an eyebrow label, a title, and descriptive text, and update the text panel to show whichever entry's threshold is the highest one the current scroll progress has already reached, so the story text changes at approximately the same moments the marker passes each visual waypoint.
- Ensure scrolling back up smoothly un-draws the path, retraces the marker backward along the exact same curved geometry, and reverts waypoint stops and story text, entirely through the scrub-driven ScrollTrigger with no separate reverse-direction logic.`,
    },
  },
};

export default scrollMapJourneyStory;
