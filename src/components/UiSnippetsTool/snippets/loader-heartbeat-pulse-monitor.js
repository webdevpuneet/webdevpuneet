const loaderHeartbeatPulseMonitor = {
  id: 'loader-heartbeat-pulse-monitor',
  title: 'Heartbeat Pulse Monitor Loader',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="hb-stage">
  <div class="hb-monitor" role="status" aria-label="Checking connection">
    <svg id="hbSvg" viewBox="0 0 400 120" preserveAspectRatio="none"></svg>
    <div class="hb-readout">
      <span class="hb-bpm" id="hbBpm">72</span>
      <span class="hb-bpm-unit">bpm</span>
    </div>
  </div>
  <p class="hb-hint" id="hbHint">Checking connection…</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050a08;color:#7ee9b0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.hb-stage{display:flex;flex-direction:column;align-items:center;gap:14px}
.hb-monitor{position:relative;width:320px;height:120px;background:#03110c;border-radius:14px;border:1px solid rgba(74,222,128,.18);overflow:hidden;box-shadow:0 0 30px rgba(16,185,129,.1) inset}
#hbSvg{position:absolute;inset:0;width:100%;height:100%}

.hb-grid-line{stroke:rgba(74,222,128,.08);stroke-width:1}
.hb-trace{fill:none;stroke:#4ade80;stroke-width:2;filter:drop-shadow(0 0 5px rgba(74,222,128,.65))}
.hb-trace-dim{fill:none;stroke:rgba(74,222,128,.18);stroke-width:2}
.hb-scanhead{fill:#eafff2}

.hb-readout{position:absolute;top:10px;right:14px;text-align:right;font-variant-numeric:tabular-nums}
.hb-bpm{font-size:22px;font-weight:800;color:#4ade80}
.hb-bpm-unit{font-size:10px;color:#5fae86;margin-left:3px}

.hb-hint{font-size:12px;color:#5fae86;letter-spacing:.02em}`,

  js: `var svg = document.getElementById('hbSvg');
var bpmEl = document.getElementById('hbBpm');
var hint = document.getElementById('hbHint');
var NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs) {
  var e = document.createElementNS(NS, tag);
  for (var k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

var W = 400, H = 120, MID = 60;

// Background grid, purely decorative
for (var gx = 0; gx <= W; gx += 40) svg.appendChild(el('line', { class: 'hb-grid-line', x1: gx, y1: 0, x2: gx, y2: H }));
for (var gy = 0; gy <= H; gy += 30) svg.appendChild(el('line', { class: 'hb-grid-line', x1: 0, y1: gy, x2: W, y2: gy }));

// One QRS-like heartbeat waveform "unit", expressed as an array of [xOffset, y]
// sample points across a fixed width. Repeating this unit end-to-end (with a
// flat baseline segment between beats) is what makes it read as a real ECG
// trace instead of an arbitrary wiggly line.
function beatUnit(unitWidth) {
  var pts = [];
  var flatLen = unitWidth * 0.62;
  var steps = 10;
  for (var i = 0; i <= steps; i++) pts.push([(i / steps) * flatLen, MID]);
  var spikeStartX = flatLen;
  var spike = [
    [spikeStartX + 2, MID],
    [spikeStartX + 6, MID + 6],   // small Q dip
    [spikeStartX + 12, MID - 46], // sharp R peak
    [spikeStartX + 18, MID + 18], // S dip below baseline
    [spikeStartX + 26, MID - 2],
    [spikeStartX + 34, MID - 14], // rounded T wave
    [spikeStartX + 46, MID],
  ];
  pts = pts.concat(spike);
  var tailLen = unitWidth - pts[pts.length - 1][0];
  var tailSteps = 6;
  for (var j = 1; j <= tailSteps; j++) {
    var x = pts[pts.length - 1][0] + (tailLen * (j / tailSteps));
    pts.push([x, MID]);
  }
  return pts;
}

var UNIT_W = 130;
var unit = beatUnit(UNIT_W);

function pathFromUnits(count, xOffset) {
  var d = '';
  for (var u = 0; u < count; u++) {
    unit.forEach(function (p, i) {
      var x = xOffset + u * UNIT_W + p[0];
      var y = p[1];
      d += (u === 0 && i === 0 ? 'M ' : 'L ') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
    });
  }
  return d;
}

// Two copies of the same repeating trace, offset so one scrolls out exactly
// as the other scrolls in — a seamless infinite loop with no visible seam or reset jump.
var dimTrace = el('path', { class: 'hb-trace-dim' });
var liveTrace = el('path', { class: 'hb-trace' });
var scanHead = el('circle', { class: 'hb-scanhead', r: 3 });
svg.appendChild(dimTrace);
svg.appendChild(liveTrace);
svg.appendChild(scanHead);

var BPM = 72;
var msPerBeat = 60000 / BPM;
var pxPerMs = UNIT_W / msPerBeat;
var totalUnits = Math.ceil(W / UNIT_W) + 2;

var start = null;
function tick(ts) {
  if (!start) start = ts;
  var elapsed = ts - start;
  var scrollX = (elapsed * pxPerMs) % UNIT_W;

  // The dim background trace shows the full repeating shape at rest, so the
  // "live" sweeping portion has visual context even where it hasn't drawn yet.
  dimTrace.setAttribute('d', pathFromUnits(totalUnits, -scrollX));

  // The live trace is clipped to only the portion left of a moving "scan
  // head" x-position, which sweeps left-to-right and wraps — mimicking a
  // real ECG monitor where the newest sample overwrites the oldest.
  var headX = (elapsed * pxPerMs) % W;
  liveTrace.setAttribute('d', pathFromUnits(totalUnits, -scrollX));
  liveTrace.setAttribute('clip-path', 'none');
  var clipId = 'hbclip';
  var existing = document.getElementById(clipId);
  if (!existing) {
    var defs = el('defs', {});
    var clip = el('clipPath', { id: clipId });
    clip.appendChild(el('rect', { id: 'hbClipRect', x: 0, y: 0, width: headX, height: H }));
    defs.appendChild(clip);
    svg.insertBefore(defs, svg.firstChild);
    liveTrace.setAttribute('clip-path', 'url(#' + clipId + ')');
  } else {
    document.getElementById('hbClipRect').setAttribute('width', headX);
  }

  scanHead.setAttribute('cx', headX);
  var idxFloat = ((headX - (-scrollX)) % UNIT_W + UNIT_W) % UNIT_W;
  var nearestPt = unit.reduce(function (best, p) {
    return Math.abs(p[0] - idxFloat) < Math.abs(best[0] - idxFloat) ? p : best;
  }, unit[0]);
  scanHead.setAttribute('cy', nearestPt[1]);

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// Subtle bpm jitter so the readout feels alive rather than a frozen number.
setInterval(function () {
  var jitter = Math.round((Math.random() - 0.5) * 3);
  bpmEl.textContent = String(BPM + jitter);
}, 1400);

var messages = ['Checking connection\\u2026', 'Waiting for server\\u2026', 'Verifying session\\u2026'];
var mi = 0;
setInterval(function () {
  mi = (mi + 1) % messages.length;
  hint.textContent = messages[mi];
}, 3200);`,

  seo: {
    title: 'Heartbeat Pulse Monitor Loader — Free HTML CSS JS Snippet',
    description: 'An ECG-style heartbeat loading indicator with a real repeating QRS waveform, a sweeping scan head, and a live-updating BPM readout. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Heartbeat Pulse Monitor Loader — ECG Waveform with a Sweeping Scan Head',
      description: `A heartbeat monitor loader mimics a hospital ECG display: a repeating spike-shaped waveform scrolls continuously across a dark screen, with a bright leading edge sweeping left to right and a bpm readout ticking nearby. Unlike a generic pulsing dot, this snippet draws an actual shaped waveform — a flat baseline, then a small dip, a sharp upward spike, a dip below baseline, and a rounded bump, matching the real QRS-complex shape of a heartbeat trace — repeated end-to-end so it reads unmistakably as "heartbeat" rather than an arbitrary wiggle.

**Building one repeatable waveform unit**

\`beatUnit(unitWidth)\` constructs a single beat as an ordered array of \`[x, y]\` points: a long flat segment (most of a real heartbeat cycle is a flat baseline between beats), followed by a small Q dip, a sharp R peak, an S dip below the baseline, and a rounded T wave, then a short flat tail padding the unit back out to its full width. This exact five-part shape — flat, small-dip, sharp-spike, dip, rounded-bump, flat — is what a real single-lead ECG trace looks like, and repeating this one unit via \`pathFromUnits(count, xOffset)\` is what produces a continuous, recognizably medical waveform instead of a looping sine wave.

**Seamless infinite scroll with two trace layers**

A dim, low-opacity trace (\`.hb-trace-dim\`) renders the full repeating waveform shape at rest across the whole visible width, giving the eye context for the shape even in the portion that hasn't "played" yet. A brighter, glowing live trace is layered on top but clipped with an SVG \`<clipPath>\` rect whose width grows with elapsed time — so the bright trace only ever shows up to the current sweep position, exactly like a real monitor where the newest sample is drawn and the sweep continues past what's already been shown. Both traces scroll using the same \`scrollX = (elapsed * pxPerMs) % UNIT_W\` calculation, so the waveform never visibly jumps or resets even though it loops indefinitely.

**Deriving pixel speed from a real BPM value**

Rather than an arbitrary animation duration, \`pxPerMs\` is derived directly from \`BPM\`: \`msPerBeat = 60000 / BPM\`, then \`pxPerMs = UNIT_W / msPerBeat\`. This means the waveform's visual scroll speed is mathematically tied to the displayed beats-per-minute number — changing \`BPM\` changes both the readout and the actual scroll speed together, keeping them honest with each other rather than being two independently-set values that happen to look plausible together.

**A scan head that tracks the current waveform height**

The small bright dot (\`scanHead\`) doesn't just travel in a straight horizontal line — its \`cy\` is set every frame by finding the nearest point in the \`unit\` array to the current sweep position within its cycle, so the dot visually rides along the top of the spike as it passes through, rising sharply during the R peak and dipping during the S trough, reinforcing that it's the leading edge actively drawing the trace rather than a decoration moving independently of it.

**Subtle liveness details**

The bpm readout jitters by a small random amount every 1.4 seconds and the status text below the monitor cycles through a short list of connection-themed phrases — small touches that keep a loading state that could run for many seconds from reading as visually frozen or fake.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: 'An ECG-style waveform scrolls continuously with a bright sweeping scan head and a live bpm readout.' },
      { title: 'Watch the scan head trace the waveform', text: 'The leading dot rises and dips exactly along the spike shape as it sweeps, not in a straight line.' },
      { title: 'Change the simulated heart rate', text: 'Edit the BPM constant — both the readout and the actual scroll speed are derived from it together.' },
      { title: 'Adjust the waveform shape', text: 'Edit the point arrays inside beatUnit() to change the spike height, dip depth, or flat-segment proportion.' },
      { title: 'Recolor the theme', text: 'Edit the green color values in the CSS for a different monitor palette.' },
      { title: 'Customize the status text', text: 'Edit the messages array in the JS panel to match your own loading copy.' },
    ] },
    features: [
      'Real QRS-complex-shaped waveform (flat, Q dip, R peak, S dip, T wave) built from explicit point data, not a generic sine wave',
      'Seamless infinite horizontal scroll with no visible loop seam or reset jump',
      'Bright sweeping scan head clipped via SVG clip-path, revealing the live trace only up to the current sweep position',
      'Scroll speed mathematically derived from a real BPM value shared with the live readout, not two independently-tuned numbers',
      'Scan head vertically tracks the actual waveform height as it sweeps, rather than moving in a straight line',
      'Live bpm readout with subtle randomized jitter so it reads as monitoring, not a frozen static number',
      'Cycling status text for a sense of ongoing multi-stage connection or verification work',
      'Pure inline SVG, CSS, and requestAnimationFrame — no charting or animation library',
    ],
    useCases: [
      { title: 'Connection and session verification loaders', text: 'A literal, on-theme fit for "checking connection" or "verifying session" loading states in health, fitness, or monitoring apps.' },
      { title: 'Health and fitness dashboard loading states', text: 'Use while live vitals or wearable data is being fetched, reinforcing the product\'s health-monitoring theme even during a loading state.' },
      { title: 'System-status and uptime monitoring UI', text: 'Pair with a [status icon morph spinner](/ui-snippets/status-icon-morph-spinner-check/) as a "vital signs" themed indicator for infrastructure health dashboards.' },
      { title: 'Onboarding or splash-screen loading moments', text: 'A distinctive, on-brand alternative to a generic spinner for products with a health or biometric angle.' },
      { title: 'AI / background processing indicators', text: 'A richer alternative to a plain progress bar, similar in spirit to the [radar sweep scan loader](/ui-snippets/loader-radar-sweep-scan/) but with a medical-monitor motif.' },
      { title: 'Studying seamless SVG scroll-loop techniques', text: 'A concrete reference for building an infinitely-looping scrolling trace with a clipped live layer over a dim background layer.' },
    ],
    faqs: [
      { q: 'How is the heartbeat shape actually constructed?', a: 'beatUnit() builds one beat as an explicit ordered array of [x, y] points: a long flat baseline segment, a small downward Q dip, a sharp upward R peak, a deeper S dip below the baseline, a rounded T wave bump, then a short flat tail. This matches the real shape of a single-lead ECG trace, and pathFromUnits() repeats this one unit end-to-end to build the full scrolling waveform.' },
      { q: 'How does the scroll loop seamlessly without a visible jump?', a: 'Both the dim background trace and the bright live trace are drawn from the exact same repeating unit and shifted by the same scrollX = (elapsed * pxPerMs) % UNIT_W value every frame. Because the waveform unit is periodic and the shift wraps at exactly one unit width, there is no discontinuity at the wrap point — the pattern simply continues.' },
      { q: 'How is the scroll speed tied to the displayed BPM number?', a: 'msPerBeat is computed as 60000 / BPM (milliseconds per beat from beats-per-minute), and pxPerMs is then UNIT_W / msPerBeat — the width of one waveform unit divided by how long one beat should take. Changing the BPM constant changes both the readout and the actual pixel scroll speed together, since both derive from the same value.' },
      { q: 'Why does the scan head move up and down instead of in a straight line?', a: 'Every frame, the scan head\'s vertical position is set by finding the point in the beatUnit array closest to the current position within its cycle, rather than staying fixed at the baseline height. This makes the leading dot visually ride along the top of the spike as it sweeps through it, reinforcing that it is the trace\'s actively-drawing edge.' },
      { q: 'How does the clipped "live" trace work?', a: 'An SVG clipPath contains a rect whose width is updated every frame to match the current sweep x-position (headX). The bright live trace path has that clip-path applied, so only the portion of the trace to the left of the current sweep position is visible in the bright color — everything to the right remains hidden until the sweep reaches it, exactly like a real ECG monitor\'s drawing behavior.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Precompute the beatUnit point array once (e.g. in useMemo) since it never changes, then run the requestAnimationFrame loop in a mount effect that updates the SVG path d attributes and the clip rect width via refs, with cleanup that cancels the animation frame and both intervals on unmount.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how beatUnit() encodes the flat-dip-spike-dip-bump shape of a real ECG trace as explicit point data, and how the shared scrollX calculation keeps the dim background trace and the clipped bright live trace perfectly synchronized into a seamless loop. It's also a good candidate for extension — ask it to tie the BPM value to a real async operation's elapsed time (speeding up the pulse the longer a request takes, for instance), add a flatline-then-recover animation for an error state, or add a second, differently-colored trace representing a secondary metric scrolling alongside the first.`,
      prompt: `Build an ECG-style "heartbeat monitor" loading indicator in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Construct a single repeatable "heartbeat" waveform unit as explicit ordered point data (not a sine wave or random noise): a long flat baseline segment, a small downward dip, a sharp upward spike, a deeper dip below the baseline, a rounded bump, and a short flat tail padding it back to a fixed unit width — matching the general shape of a real single-lead ECG QRS complex.
- Render two copies of the repeating waveform as inline SVG paths built by tiling that one unit end-to-end: a dim, low-opacity background trace showing the full shape at rest, and a brighter, glowing "live" trace drawn on top.
- Continuously scroll both traces horizontally using a shared elapsed-time-based offset so the pattern loops seamlessly with no visible jump or reset at the wrap point.
- Clip the bright live trace with an SVG clip-path whose width grows over time to match a sweeping "scan head" x-position, so the bright trace is only ever visible up to the current sweep point — mimicking how a real ECG monitor draws new samples while the trace continues scrolling.
- Add a small bright dot at the current scan-head x-position whose vertical position tracks the actual waveform height at that point in its cycle (rising during the spike, dipping during the trough) rather than moving in a straight horizontal line.
- Derive the horizontal scroll speed directly from a beats-per-minute (BPM) constant using real time-per-beat math, and display that same BPM value as a live numeric readout, so the visual scroll speed and the displayed number are mathematically tied together rather than independently tuned.
- Add subtle random jitter to the displayed BPM number every second or two, and cycle a short status message beneath the monitor, so the loader reads as continuously live rather than a frozen static graphic.`,
    },
  },
};

export default loaderHeartbeatPulseMonitor;
