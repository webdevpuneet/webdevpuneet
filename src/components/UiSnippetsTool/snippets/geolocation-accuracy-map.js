const geolocationAccuracyMap = {
  id: 'geolocation-accuracy-map',
  title: 'Geolocation Accuracy Indicator',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="gam-wrap">
  <span class="gam-tag">geolocation api</span>
  <h1>Where am I?</h1>
  <p class="gam-status" id="gamStatus">Click "Locate me" to request your real position.</p>

  <div class="gam-stage">
    <div class="gam-grid" id="gamGrid">
      <div class="gam-circle" id="gamCircle"></div>
      <div class="gam-dot" id="gamDot"></div>
    </div>
  </div>

  <div class="gam-readout">
    <div class="gam-field"><span>Latitude</span><strong id="gamLat">—</strong></div>
    <div class="gam-field"><span>Longitude</span><strong id="gamLng">—</strong></div>
    <div class="gam-field"><span>Accuracy radius</span><strong id="gamAcc">—</strong></div>
  </div>

  <div class="gam-actions">
    <button class="gam-btn primary" id="gamLocateBtn">Locate me</button>
    <button class="gam-btn" id="gamWatchBtn">Watch position</button>
  </div>
  <p class="gam-note">If location access is denied or unavailable (common in a sandboxed preview iframe), a labeled example position fills the grid instead of leaving it blank.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0c1a2b,#050a12 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.gam-wrap{width:100%;max-width:440px;text-align:center}
.gam-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.gam-wrap h1{font-size:28px;font-weight:800;letter-spacing:-.02em}
.gam-status{font-size:13px;color:#8fa8bd;margin-top:8px;line-height:1.6;min-height:20px}
.gam-stage{margin:20px 0;border-radius:16px;overflow:hidden;border:1px solid rgba(125,211,252,.2);background:#081120}
.gam-grid{position:relative;width:100%;aspect-ratio:1/1;background-image:linear-gradient(rgba(125,211,252,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(125,211,252,.08) 1px,transparent 1px);background-size:11.11% 11.11%}
.gam-circle{position:absolute;top:50%;left:50%;width:40%;height:40%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,.25),rgba(56,189,248,.04) 70%,transparent);border:1px solid rgba(56,189,248,.5);transition:width .5s ease,height .5s ease}
.gam-dot{position:absolute;top:50%;left:50%;width:12px;height:12px;transform:translate(-50%,-50%);border-radius:50%;background:#38bdf8;box-shadow:0 0 0 4px rgba(56,189,248,.25),0 0 14px rgba(56,189,248,.7)}
.gam-readout{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.gam-field{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 6px}
.gam-field span{display:block;font-size:10px;color:#7c93a8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.gam-field strong{font-size:13px;font-variant-numeric:tabular-nums}
.gam-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:12px}
.gam-btn{padding:11px 20px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e6f1fa;font:600 13px system-ui;cursor:pointer;transition:background .15s}
.gam-btn:hover{background:rgba(255,255,255,.11)}
.gam-btn.primary{background:linear-gradient(135deg,#38bdf8,#0284c7);border-color:transparent;color:#04202f;font-weight:700}
.gam-btn.active{outline:2px solid #38bdf8;outline-offset:2px}
.gam-note{font-size:11.5px;color:#5f7a91;line-height:1.6}`,

  js: `var statusEl = document.getElementById('gamStatus');
var circleEl = document.getElementById('gamCircle');
var latEl = document.getElementById('gamLat');
var lngEl = document.getElementById('gamLng');
var accEl = document.getElementById('gamAcc');
var locateBtn = document.getElementById('gamLocateBtn');
var watchBtn = document.getElementById('gamWatchBtn');

var watchId = null;

// Example/demo position used whenever the real API is unsupported, denied,
// or times out — Golden Gate Park, San Francisco, with a plausible-looking
// accuracy radius so the circle isn't a suspicious perfect zero.
var EXAMPLE_POS = { lat: 37.7694, lng: -122.4862, accuracy: 65 };

function accuracyToCircleSize(accuracyMeters) {
  // Purely illustrative mapping: larger reported accuracy (worse precision)
  // draws a bigger circle on the abstract grid. Not a real-world scale.
  var pct = Math.min(85, Math.max(14, accuracyMeters / 3));
  return pct + '%';
}

function renderPosition(lat, lng, accuracy, isExample) {
  latEl.textContent = lat.toFixed(4) + '°';
  lngEl.textContent = lng.toFixed(4) + '°';
  accEl.textContent = '±' + Math.round(accuracy) + ' m';
  var size = accuracyToCircleSize(accuracy);
  circleEl.style.width = size;
  circleEl.style.height = size;
  circleEl.style.borderColor = isExample ? 'rgba(148,163,184,.5)' : 'rgba(56,189,248,.5)';
  circleEl.style.background = isExample
    ? 'radial-gradient(circle, rgba(148,163,184,.22), rgba(148,163,184,.04) 70%, transparent)'
    : 'radial-gradient(circle, rgba(56,189,248,.25), rgba(56,189,248,.04) 70%, transparent)';
}

function showExample(reason) {
  renderPosition(EXAMPLE_POS.lat, EXAMPLE_POS.lng, EXAMPLE_POS.accuracy, true);
  statusEl.textContent = 'Showing an example position (' + reason + ') — not your real location.';
}

function handleSuccess(pos) {
  var c = pos.coords;
  renderPosition(c.latitude, c.longitude, c.accuracy || 30, false);
  statusEl.textContent = 'Live position — accuracy reported by your device\\'s location provider.';
}

function handleError(err) {
  var reason = 'unknown error';
  if (err && err.code === 1) reason = 'permission denied';
  else if (err && err.code === 2) reason = 'position unavailable';
  else if (err && err.code === 3) reason = 'request timed out';
  showExample(reason);
}

function locateMe() {
  if (!('geolocation' in navigator)) {
    showExample('geolocation unsupported in this browser');
    return;
  }
  statusEl.textContent = 'Requesting your position…';
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
    enableHighAccuracy: true,
    timeout: 8000,
    maximumAge: 0,
  });
}

function toggleWatch() {
  if (!('geolocation' in navigator)) {
    showExample('geolocation unsupported in this browser');
    return;
  }
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    watchBtn.classList.remove('active');
    watchBtn.textContent = 'Watch position';
    return;
  }
  watchBtn.classList.add('active');
  watchBtn.textContent = 'Stop watching';
  statusEl.textContent = 'Watching position — updates live as it changes.';
  watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
    enableHighAccuracy: true,
    maximumAge: 5000,
  });
}

locateBtn.addEventListener('click', locateMe);
watchBtn.addEventListener('click', toggleWatch);

window.addEventListener('beforeunload', function () {
  if (watchId !== null) navigator.geolocation.clearWatch(watchId);
});

showExample('click "Locate me" for your real position');`,

  seo: {
    title: 'Geolocation Accuracy Indicator — Free Real GPS Accuracy Demo',
    description: `A live latitude/longitude and accuracy-radius readout from the real Geolocation API, drawn as a circle on an abstract grid, with a labeled example position fallback on denial. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Geolocation Accuracy Indicator — Real Coordinates, Honest Fallback',
      description: `This snippet calls the real \`navigator.geolocation\` API and renders what it actually returns: latitude, longitude, and — the part most demos skip — the device's own reported \`accuracy\` value in meters, drawn as a circle on a simple abstract grid rather than a real map (no tiles, no map library, no API key). It pairs naturally with other permission-gated snippets like [screen wake lock](/ui-snippets/screen-wake-lock-toggle/) and [canvas audio bars](/ui-snippets/canvas-audio-bars/) that share the same honesty pattern.

**getCurrentPosition and what accuracy means**

Clicking "Locate me" calls \`navigator.geolocation.getCurrentPosition(success, error, options)\`. The success callback receives a \`GeolocationPosition\` whose \`coords\` carries \`latitude\`, \`longitude\`, and \`accuracy\` — a 95%-confidence radius in meters around the reported point, not a guarantee of exact position. A phone with GPS might report 5-20m; a laptop resolving location from Wi-Fi/IP might report hundreds or thousands of meters. The circle's size scales with that number, so a huge circle is itself meaningful information, not a rendering bug.

**watchPosition for continuous updates**

The "Watch position" toggle calls \`navigator.geolocation.watchPosition()\`, which keeps firing the success callback as the device moves (or as the provider refines its estimate), and is cleared with \`clearWatch(id)\` — both on manual toggle-off and on \`beforeunload\`, so a stray watch never keeps running after the demo is left.

**Why the fallback is essential, not optional**

Geolocation is permission-gated by design, and denial is the common case in a sandboxed preview: the browser may lack support, the user may decline the prompt, the surrounding iframe's Permissions-Policy may block the \`geolocation\` feature outright, or the request may simply time out. \`handleError()\` inspects the \`GeolocationPositionError.code\` (1 = permission denied, 2 = position unavailable, 3 = timeout) and routes every case into \`showExample()\`, which fills the grid with a clearly labeled example coordinate (Golden Gate Park) and a plausible accuracy radius, so the layout is never empty or stuck on "Requesting…".

**An abstract grid, not a real map**

The grid is deliberately not a map integration — no tile server, no third-party JS, no API key to configure — just a CSS grid background with a circle and dot positioned at its center, scaled by accuracy. That keeps the snippet dependency-light and framework-agnostic while still communicating the geolocation concept clearly. Swap in a real map library in production if you need actual cartography; this snippet's job is to demonstrate the API honestly.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An example position fills the grid immediately.` },
      { title: 'Click "Locate me"', text: `The browser prompts for real location access.` },
      { title: 'Allow it', text: `Your real latitude, longitude, and accuracy render.` },
      { title: 'Click "Watch position"', text: `Updates continue live as your position changes.` },
      { title: 'Deny or block access', text: `The status explains why; an example position returns.` },
      { title: 'Read the accuracy radius', text: `A larger circle means a less precise reported position.` },
    ] },
    features: [
      { title: 'Real getCurrentPosition call', text: `Requests genuine device coordinates.` },
      { title: 'True accuracy readout', text: `Displays the device's own reported radius in meters.` },
      { title: 'watchPosition toggle', text: `Live updates as position changes, cleanly torn down.` },
      { title: 'Error-code-aware fallback', text: `Denial, unavailable, and timeout each explained plainly.` },
      { title: 'Labeled example position', text: `Never blank — clearly marked as not-real when shown.' },` },
      { title: 'Accuracy-scaled circle', text: `Circle size communicates precision, not just presence.` },
      { title: 'Dependency-free map visual', text: `No tiles, no API key, no map library.` },
      { title: 'Clean watch teardown', text: `clearWatch runs on toggle-off and page unload.` },
    ],
    useCases: [
      { title: 'Store locators with accuracy', text: 'Show users how precise their position is before searching for nearby stores, using the accuracy radius the device itself reports.' },
      { title: 'Delivery tracking screens', text: 'Pair with a [status dashboard](/ui-snippets/status-dashboard/) so couriers and customers can see both a position and how reliable it is.' },
      { title: 'Weather and local content apps', text: 'Localise forecasts to a real or example position, with a labelled fallback so the demo still works when permission is denied.' },
      { title: 'Check-in features', text: 'Verify a user\'s rough location before allowing a check-in, treating the reported accuracy radius as part of the decision.' },
      { title: 'Permission flow testing', text: 'Confirm that geolocation permission flows work, since denied, unavailable and timeout errors are each explained plainly, and add a [network information badge](/ui-snippets/network-information-badge/) for context.' },
      { icon: 'CODE', title: 'Related: Admin Impersonation Mode Banner — ', desc: 'See the [Admin Impersonation Mode Banner — ](/ui-snippets/impersonation-mode-banner/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does the accuracy radius actually mean?', a: `It's the device's own 95%-confidence radius, in meters, around the reported coordinate — not a promise of exact position. A GPS-equipped phone outdoors might report 5-20 meters; a laptop resolving location from Wi-Fi or IP address alone might report hundreds or thousands of meters. The circle on the grid scales with this value, so a large circle is meaningful, not a bug.` },
      { q: 'Why does it show an example position instead of my real one?', a: `Geolocation is permission-gated, and denial is common: you may decline the browser prompt, your browser may lack support, or — very often in a sandboxed preview iframe — the surrounding page's Permissions-Policy blocks the geolocation feature for that frame entirely. The code checks the specific GeolocationPositionError code and falls back to a clearly labeled example coordinate rather than leaving the grid blank.` },
      { q: 'What is the difference between the two buttons?', a: `"Locate me" calls getCurrentPosition() once for a single reading. "Watch position" calls watchPosition(), which keeps firing updates as your device's estimate changes (useful while actually moving), and is stopped with clearWatch() either by clicking the button again or automatically on page unload.` },
      { q: 'Is this a real map?', a: `No — deliberately not. The grid is a plain CSS background with a circle and dot positioned at its center; there's no tile server, map library, or API key involved. That keeps the snippet dependency-light; swap in a real mapping library for production cartography while keeping the same accuracy-driven data flow.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the getCurrentPosition/watchPosition calls into a mount effect or composable, store the returned coordinates and accuracy in state, and clear any active watch in the cleanup function. Keep the error-code handling (1/2/3) so the same honest fallback behavior carries over into the framework version.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain what the Geolocation API's accuracy value actually represents (a confidence radius, not a precision guarantee) and why the circle's size should scale with it rather than staying a fixed size. It's also useful for reasoning about the fallback design — ask why handleError() branches on the specific GeolocationPositionError.code instead of treating every failure identically, and why the example position is visually distinguished (a muted gray circle) from a real reading rather than looking identical. For extensions, ask it to add a history trail of watched positions, compute distance from the example position to the real one once permission is granted, or add a manual coordinate-entry fallback for testing without triggering the browser prompt at all. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "geolocation accuracy indicator" in plain HTML, CSS, and JavaScript using the real Geolocation API — no map libraries or CDNs.

Requirements:
- A readout showing latitude, longitude, and accuracy (in meters), plus an abstract CSS-grid "map" placeholder with a center dot and a circle whose size scales with the reported accuracy value (larger accuracy number = less precise = bigger circle).
- A "Locate me" button that calls navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 8000 }) and renders the real coords.coords.latitude/longitude/accuracy on success.
- A "Watch position" toggle button that calls navigator.geolocation.watchPosition() for continuous live updates and navigator.geolocation.clearWatch() to stop, also clearing any active watch on page unload.
- CRITICAL: implement a full fallback. Feature-detect with 'geolocation' in navigator first. In the error callback, branch on the GeolocationPositionError code (1 = permission denied, 2 = position unavailable, 3 = timeout) and, for every case (including unsupported browsers and blocked Permissions-Policy in a sandboxed iframe, a common and expected scenario), fall back to rendering a clearly labeled example/demo coordinate and accuracy value so the grid is never blank or stuck on a "Requesting…" state — visually distinguish the example position (e.g. a muted gray circle) from a real reading.
- A status text element that always states in plain language whether the current reading is real or an example, and why, so a viewer understands the state without guessing.`,
    },
  },
};

export default geolocationAccuracyMap;
