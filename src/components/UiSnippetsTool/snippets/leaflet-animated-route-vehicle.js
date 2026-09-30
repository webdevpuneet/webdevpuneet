const leafletAnimatedRouteVehicle = {
  id: 'leaflet-animated-route-vehicle',
  title: 'Leaflet Route Line with Animated Vehicle',
  lastmod: '2026-09-20',
  category: 'misc',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
  ],
  html: `<div class="rt-wrap">
  <div class="rt-bar">
    <div class="rt-title">Delivery #4471 — En Route</div>
    <div class="rt-eta" id="rtEta">ETA --</div>
    <button class="rt-btn" id="rtBtn" type="button">Pause</button>
  </div>
  <div class="rt-map" id="rtMap"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif}
.rt-wrap{height:100vh;min-height:480px;display:flex;flex-direction:column}
.rt-bar{padding:12px 16px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.rt-title{font-size:13px;font-weight:800;color:#0f172a;flex:1;min-width:160px}
.rt-eta{font-size:12px;font-weight:700;color:#6366f1}
.rt-btn{background:#eef0ff;color:#6366f1;border:none;border-radius:8px;padding:7px 14px;font:700 12px system-ui;cursor:pointer}
.rt-btn:hover{background:#e0e4ff}
.rt-map{flex:1}
.rt-van-icon{font-size:22px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4));transform-origin:center}`,

  js: `var ROUTE = [
  [37.7599, -122.4187], [37.7650, -122.4110], [37.7720, -122.4050],
  [37.7790, -122.4130], [37.7830, -122.4220], [37.7936, -122.3965],
];

var map = L.map('rtMap').setView(ROUTE[0], 13);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri',
  maxZoom: 19,
}).addTo(map);

L.polyline(ROUTE, { color: '#c7d2fe', weight: 6 }).addTo(map);
var traveled = L.polyline([ROUTE[0]], { color: '#6366f1', weight: 6 }).addTo(map);
L.circleMarker(ROUTE[0], { radius: 6, color: '#16a34a', fillColor: '#16a34a', fillOpacity: 1 }).addTo(map);
L.circleMarker(ROUTE[ROUTE.length - 1], { radius: 6, color: '#dc2626', fillColor: '#dc2626', fillOpacity: 1 }).addTo(map);

var vanIcon = L.divIcon({ className: '', html: '<div class="rt-van-icon">\\ud83d\\ude9a</div>', iconSize: [26, 26], iconAnchor: [13, 13] });
var van = L.marker(ROUTE[0], { icon: vanIcon }).addTo(map);

// Precompute the cumulative distance to each waypoint so a single 0..1
// "progress" value can be mapped to an exact lat/lng anywhere ALONG the
// route -- not just snapped to the nearest waypoint.
function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
var cumulative = [0];
for (var i = 1; i < ROUTE.length; i++) cumulative.push(cumulative[i - 1] + dist(ROUTE[i - 1], ROUTE[i]));
var totalDist = cumulative[cumulative.length - 1];

function pointAt(progress) {
  var target = progress * totalDist;
  for (var i = 1; i < cumulative.length; i++) {
    if (target <= cumulative[i] || i === cumulative.length - 1) {
      var segStart = cumulative[i - 1], segEnd = cumulative[i];
      var segT = segEnd > segStart ? (target - segStart) / (segEnd - segStart) : 0;
      var a = ROUTE[i - 1], b = ROUTE[i];
      return {
        lat: a[0] + (b[0] - a[0]) * segT,
        lng: a[1] + (b[1] - a[1]) * segT,
        bearing: Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI,
        segIndex: i,
      };
    }
  }
  return { lat: ROUTE[0][0], lng: ROUTE[0][1], bearing: 0, segIndex: 0 };
}

var DURATION = 14000;
var startTime = null;
var pausedAt = 0;
var running = true;
var etaEl = document.getElementById('rtEta');
var btn = document.getElementById('rtBtn');

function tick(now) {
  if (!running) return;
  if (startTime === null) startTime = now - pausedAt;
  var elapsed = now - startTime;
  var progress = Math.min(1, elapsed / DURATION);
  var p = pointAt(progress);

  van.setLatLng([p.lat, p.lng]);
  traveled.setLatLngs(ROUTE.slice(0, p.segIndex).concat([[p.lat, p.lng]]));

  var remainingMin = Math.ceil((1 - progress) * 12);
  etaEl.textContent = progress >= 1 ? 'Delivered' : 'ETA ' + remainingMin + ' min';

  if (progress < 1) requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

btn.addEventListener('click', function () {
  running = !running;
  btn.textContent = running ? 'Pause' : 'Resume';
  if (running) {
    startTime = null; // recomputed relative to pausedAt on next tick
    requestAnimationFrame(function (now) { pausedAt = 0; tick(now); });
  } else {
    pausedAt = performance.now() - startTime;
  }
});`,

  seo: {
    title: 'Leaflet Route Line with Animated Vehicle — Free HTML CSS JS Snippet',
    description: `A delivery van animates smoothly along a real route polyline on a Leaflet map, with a live ETA countdown and a pause/resume control. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Leaflet Route Line with Animated Vehicle — Moving Along a Path, Not Between Points',
      description: `A live tracking map's vehicle marker needs to move smoothly along its actual route, not teleport from waypoint to waypoint. That requires being able to answer "where exactly is 43% of the way along this route" for any percentage — which means precomputing the route's real geometry once, up front, rather than trying to interpolate it fresh on every animation frame.

**Cumulative distance turns "43% along" into a real coordinate**

Before any animation starts, the code walks the route's waypoints once and builds a running total of the straight-line distance between each consecutive pair. That cumulative-distance array is what \`pointAt(progress)\` uses to find which route segment a given progress percentage actually falls into, then linearly interpolates the exact latitude and longitude within that one segment — the vehicle can be positioned anywhere along the path, not just snapped to a waypoint.

**One requestAnimationFrame loop, driven by real elapsed time**

The animation reads \`performance.now()\` on every frame and divides elapsed time by a fixed duration to get a 0-to-1 progress value — it never increments position by a fixed step per frame. That's what keeps the vehicle's speed consistent regardless of the viewer's actual frame rate; a fixed-step approach would move the van faster on a high-refresh display and slower on a throttled background tab.

**The traveled line is a second polyline, not a repaint of the first**

Rather than redrawing the whole route every frame, a second, differently-colored polyline (\`traveled\`) is extended with \`setLatLngs\` to include every fully-passed waypoint plus the vehicle's current exact position — which is what produces the classic "line fills in behind the moving vehicle" effect cheaply.

**Pausing preserves exact progress, not just a paused flag**

Clicking Pause records \`performance.now() - startTime\` as \`pausedAt\` — the exact elapsed milliseconds so far. Resuming recomputes \`startTime\` as \`now - pausedAt\`, which is what lets the animation continue from precisely where it left off instead of restarting or jumping, even though the underlying loop always computes progress from a wall-clock timestamp.

**Reusing it**

This is the standard shape for any live-tracking display — delivery, ride-share, shipping, fleet — built on a known route. Swap the hardcoded \`ROUTE\` array for real waypoints (from a routing API or GPS breadcrumbs) and replace the simulated ETA countdown with a real remaining-distance calculation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Leaflet CDN', text: `Load leaflet.css and leaflet.js before the snippet's JS runs.` },
      { title: 'Paste HTML, CSS, and JS', text: `A route line renders and the van starts moving automatically.` },
      { title: 'Watch the traveled line fill in', text: `A darker line extends behind the van as it moves.` },
      { title: 'Watch the ETA countdown', text: `It ticks down and reads "Delivered" at the end.` },
      { title: 'Click Pause', text: `The van stops exactly where it is.` },
      { title: 'Click Resume', text: `It continues from the same point, not from the start.` },
    ] },
    features: [
      { title: 'True along-route interpolation', text: `Positioned by real distance, not snapped to waypoints.` },
      { title: 'Frame-rate-independent speed', text: `Progress is computed from elapsed wall-clock time.` },
      { title: 'Fill-in traveled line effect', text: `A second polyline extends behind the moving vehicle.` },
      { title: 'Exact pause and resume', text: `Elapsed progress is preserved precisely, not reset.` },
      { title: 'Live ETA countdown', text: `Ticks down in sync with actual route progress.` },
      { title: 'Free OpenStreetMap tiles', text: `No API key or paid map provider required.` },
    ],
    useCases: [
      { title: 'Delivery and courier tracking pages', text: `The exact "where's my order" map pattern.` },
      { title: 'Ride-share driver-en-route screens', text: `Smooth vehicle motion along a confirmed route.` },
      { title: 'Fleet and logistics dashboards', text: `Multiple simultaneous vehicles on shared routes.` },
      { title: 'Flight or shipment tracking visualizations', text: `Same interpolation math, longer routes.` },
      { title: 'Trip playback and route replay tools', text: `Pair with the [heatmap density layer](/ui-snippets/leaflet-heatmap-density-layer/) elsewhere in this collection for historical trip analysis.` },
      { title: 'Learning Leaflet animation', text: `A clear reference for smooth marker motion along a path.` },
    ],
    faqs: [
      { q: 'How is the vehicle positioned exactly on the route line, not just at waypoints?', a: `Before animating, the code computes the cumulative straight-line distance up to every waypoint in the route. Given a progress percentage, it finds which segment that percentage's target distance falls within, then linearly interpolates between that segment's two endpoints proportionally — which is what lets the vehicle sit at any point along the path, not just jump discretely from one waypoint to the next.` },
      { q: 'Why does the animation use elapsed time instead of moving a fixed distance per frame?', a: `Reading performance.now() and dividing the elapsed time by a fixed total duration produces a progress value that's tied to real wall-clock time, so the animation takes the same real-world duration regardless of how many frames the browser actually renders per second. Advancing by a fixed step every frame instead would make the vehicle move faster on high-refresh-rate displays and slower when the tab is throttled in the background.` },
      { q: 'How does the "traveled" line fill in behind the vehicle without redrawing everything?', a: `A separate polyline object is kept specifically for the traveled portion, and its coordinate list is replaced on every frame with all fully-passed waypoints plus the vehicle's current interpolated position via setLatLngs. This only updates that one polyline's data — the full route line underneath is drawn once and never touched again.` },
      { q: 'How does pausing preserve the exact position instead of resetting?', a: `Pausing records how many milliseconds of animation had actually elapsed (performance.now() minus the original start time) into a pausedAt variable. Resuming recalculates a new effective start time as the current time minus that stored elapsed value, so the very next frame's elapsed-time calculation picks up from exactly where it left off rather than starting the duration over.` },
      { q: 'How do I use this with a real route and real-time position updates?', a: `Replace the ROUTE array with waypoints from a routing API (or raw GPS breadcrumb points), and either keep the time-based simulated animation for a smooth playback experience, or drive the marker's position directly from live GPS updates (skipping the animation loop) when you have a real, frequently-updating position feed instead of a route to simulate traveling.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive along-path interpolation math from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the cumulative-distance array lets pointAt(progress) find the correct route segment and interpolate a precise coordinate within it, and why driving the animation from performance.now() rather than a per-frame step keeps its speed consistent across different frame rates. The same assistant can help optimize it — ask whether the straight-line (Euclidean) distance approximation between waypoints is accurate enough for this use case, or whether a real route with many widely-spaced waypoints should use Haversine distance instead. It's also useful for extending the effect: ask it to rotate the vehicle icon to face its direction of travel using the bearing value already computed, animate multiple vehicles on different routes simultaneously, or replace the simulated animation with a live position feed from a WebSocket. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Leaflet map that animates a vehicle icon smoothly along a predefined route polyline, with a live ETA and pause/resume control, using Leaflet.js (load Leaflet's CSS and JS from a CDN, no other library), in plain HTML, CSS, and JavaScript.

Requirements:
- Define a route as an ordered array of latitude/longitude waypoints, and draw it as a polyline on the map, with distinct markers for the start and end points.
- Before starting the animation, precompute the cumulative distance along the route up to each waypoint, and write a function that, given a progress value from 0 to 1, uses that precomputed data to find which route segment the target distance falls within and linearly interpolates an exact coordinate within that segment — the vehicle must be able to sit anywhere along the path, not only snap to the nearest waypoint.
- Animate a vehicle icon (a custom HTML/emoji marker, not the library's default pin) moving along the route over a fixed total duration, driving the animation loop from actual elapsed wall-clock time (not a fixed per-frame increment), so its real-world speed stays consistent regardless of the display's frame rate.
- Draw a second, differently colored line that grows to represent the portion of the route already traveled, extending it on every animation frame to include the vehicle's current interpolated position, without redrawing the full original route line.
- Show a countdown estimated-time-of-arrival readout above the map that updates in sync with the route progress, and switches to a "delivered" message once the animation completes.
- Add a Pause/Resume button: pausing must stop the vehicle exactly where it currently is, and resuming must continue the animation from that exact same point rather than restarting from the beginning or jumping to a different position.
- Use free OpenStreetMap tile layers so the demo requires no API key.`,
    },
  },
};

export default leafletAnimatedRouteVehicle;
