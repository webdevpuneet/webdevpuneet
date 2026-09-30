const loaderRadarSweepScan = {
  id: 'loader-radar-sweep-scan',
  title: 'Radar Sweep Scan Loader',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="rs-stage">
  <div class="rs-field" id="rsField" role="status" aria-label="Scanning">
    <svg id="rsSvg" viewBox="0 0 220 220"></svg>
    <div class="rs-sweep" id="rsSweep"></div>
  </div>
  <p class="rs-hint" id="rsHint">Scanning for devices…</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#04140c;color:#7ee9b0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.rs-stage{display:flex;flex-direction:column;align-items:center;gap:16px}
.rs-field{position:relative;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle at center,#062419 0%,#03130b 70%,#020c07 100%);overflow:hidden;box-shadow:0 0 0 1px rgba(126,233,176,.15),0 0 40px rgba(16,185,129,.15)}
#rsSvg{position:absolute;inset:0;width:100%;height:100%}

.rs-ring{fill:none;stroke:rgba(126,233,176,.22);stroke-width:1}
.rs-crosshair{stroke:rgba(126,233,176,.18);stroke-width:1}
.rs-blip{fill:#4ade80;filter:drop-shadow(0 0 4px #4ade80)}

.rs-sweep{
  position:absolute;top:50%;left:50%;width:110px;height:110px;
  transform-origin:0 0;
  background:conic-gradient(from 0deg,rgba(74,222,128,.55) 0deg,rgba(74,222,128,0) 55deg,rgba(74,222,128,0) 360deg);
  animation:rsSpin 2.8s linear infinite;
  pointer-events:none;
}
@keyframes rsSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

.rs-hint{font-size:12px;color:#5fae86;letter-spacing:.02em}`,

  js: `var svg = document.getElementById('rsSvg');
var hint = document.getElementById('rsHint');
var NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs) {
  var e = document.createElementNS(NS, tag);
  for (var k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

var CX = 110, CY = 110;

// Concentric range rings
[35, 60, 85].forEach(function (r) {
  svg.appendChild(el('circle', { class: 'rs-ring', cx: CX, cy: CY, r: r }));
});
// Crosshair lines
svg.appendChild(el('line', { class: 'rs-crosshair', x1: CX - 90, y1: CY, x2: CX + 90, y2: CY }));
svg.appendChild(el('line', { class: 'rs-crosshair', x1: CX, y1: CY - 90, x2: CX, y2: CY + 90 }));

// Fixed set of "contacts" at random polar positions, each revealed only when
// the sweep beam passes over its angle — a real radar never shows blips
// outside the current beam sector until they've been "painted".
var contacts = [];
var CONTACT_COUNT = 6;
for (var i = 0; i < CONTACT_COUNT; i++) {
  var angle = Math.random() * 360;
  var radius = 20 + Math.random() * 68;
  contacts.push({
    angle: angle,
    x: CX + radius * Math.cos(angle * Math.PI / 180),
    y: CY + radius * Math.sin(angle * Math.PI / 180),
    el: null,
    lastPainted: -999,
  });
  var dot = el('circle', { class: 'rs-blip', cx: contacts[i].x, cy: contacts[i].y, r: 3, opacity: 0 });
  svg.appendChild(dot);
  contacts[i].el = dot;
}

var SWEEP_PERIOD = 2800; // must match the CSS animation duration
var start = null;
var labels = ['Scanning for devices\\u2026', 'Pinging local network\\u2026', 'Resolving hosts\\u2026', 'Checking latency\\u2026'];
var labelIdx = 0;

function currentSweepAngle(elapsed) {
  var t = (elapsed % SWEEP_PERIOD) / SWEEP_PERIOD;
  return t * 360;
}

function tick(ts) {
  if (!start) start = ts;
  var elapsed = ts - start;
  var sweepAngle = currentSweepAngle(elapsed);

  contacts.forEach(function (c) {
    // A contact "paints" (flashes bright) the moment the sweep beam crosses
    // its angle, then fades out over the following ~1.2s until the next pass.
    var angleDiff = Math.abs(((sweepAngle - c.angle + 540) % 360) - 180);
    if (angleDiff < 4 && elapsed - c.lastPainted > 500) {
      c.lastPainted = elapsed;
    }
    var age = elapsed - c.lastPainted;
    var fade = age < 0 ? 0 : Math.max(0, 1 - age / 1400);
    c.el.setAttribute('opacity', fade.toFixed(2));
    var scale = 1 + (1 - fade) * 0;
    c.el.setAttribute('r', (2.5 + fade * 2).toFixed(1));
  });

  // Cycle the status text roughly every full sweep rotation
  var cycle = Math.floor(elapsed / SWEEP_PERIOD) % labels.length;
  if (cycle !== labelIdx) {
    labelIdx = cycle;
    hint.textContent = labels[labelIdx];
  }

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);`,

  seo: {
    title: 'Radar Sweep Scan Loader — Free HTML CSS JS Snippet',
    description: 'A sci-fi radar-style loading indicator with a rotating conic-gradient sweep beam that "paints" randomly placed blips as it passes their angle. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Radar Sweep Scan Loader — Rotating Beam That Paints Blips by Angle',
      description: `A radar sweep loader mimics the classic circular radar display: a bright beam continuously rotates around a center point, and contacts on the screen only flash brightly the instant the beam crosses their angular position, then fade until the next pass. This snippet builds that behavior for real — the beam rotation is a lightweight CSS animation, but each blip's paint-and-fade timing is computed every frame in JavaScript against the beam's actual current angle, so blips only ever light up in sync with the sweep passing over them rather than blinking on an unrelated independent timer.

**The sweep beam is pure CSS, the blips are not**

The rotating beam itself (\`.rs-sweep\`) is a \`conic-gradient\` background on a small element rotated continuously by a CSS \`@keyframes\` animation — cheap, GPU-friendly, and needs no JavaScript to animate smoothly. But a CSS animation alone has no way to know "the beam is currently crossing 214 degrees," so anything that must react to the beam's live position — the blips — has to be computed separately in JavaScript rather than as more CSS animation.

**Keeping JS-computed blips in sync with a CSS-driven beam**

The trick is the constant \`SWEEP_PERIOD = 2800\`, deliberately kept equal to the CSS animation's \`2.8s\` duration. \`currentSweepAngle(elapsed)\` derives the beam's current angle purely from elapsed time modulo that period — the same period the CSS animation uses — so the JavaScript-computed angle and the CSS-rendered beam position stay synchronized without any direct communication between the two, as long as both read from the same wall-clock time and the same period constant.

**Painting a blip only when the beam crosses it**

Each of six randomly-placed contacts stores its own polar \`angle\`. Every animation frame, \`tick()\` compares the beam's current angle against each contact's angle using a wrapped angular-difference calculation (\`((sweepAngle - c.angle + 540) % 360) - 180\`, which correctly handles the 359-to-0 degree wraparound) — when that difference is small, the contact is freshly "painted" and its \`lastPainted\` timestamp updates. Every frame afterward, the contact's opacity and radius fade based on how long ago it was last painted, creating the signature "flash and decay" blip behavior real radar displays have.

**Randomized contact placement, not a fixed pattern**

Contact positions are generated once at load with random polar angle and radius (converted to Cartesian \`x\`/\`y\` via \`cos\`/\`sin\`), so the pattern of blips differs on every page load rather than always lighting up in the same six spots — appropriate for a loading indicator meant to suggest ongoing discovery rather than a static decoration.

**Cycling status text**

The hint text beneath the radar cycles through a short list of scanning-themed phrases once per full sweep rotation, computed from \`Math.floor(elapsed / SWEEP_PERIOD) % labels.length\` — giving the loader a sense of ongoing multi-stage work without needing any real backend progress data to drive it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: 'A circular radar display sweeps continuously, painting randomly placed blips as the beam crosses them.' },
      { title: 'Watch the paint-and-fade cycle', text: 'Each blip flashes bright only when the rotating beam passes its angle, then fades until the next rotation.' },
      { title: 'Change the sweep speed', text: 'Update both the CSS animation duration (2.8s) and the matching SWEEP_PERIOD constant in JS together — they must stay equal to stay in sync.' },
      { title: 'Adjust contact count', text: 'Edit CONTACT_COUNT to show more or fewer randomly-placed blips.' },
      { title: 'Recolor the theme', text: 'Edit the green color values in the CSS for a different radar palette (e.g. amber or blue).' },
      { title: 'Customize the status text', text: 'Edit the labels array in the JS panel to match your own scanning or loading copy.' },
    ] },
    features: [
      'CSS conic-gradient sweep beam animated with a lightweight @keyframes rotation, no JS-driven rotation needed',
      'JavaScript-computed blips stay synchronized to the CSS beam via a shared period constant',
      'Wrapped angular-difference math correctly handles the 359-to-0-degree beam wraparound',
      'Randomized contact placement on every load — not a fixed, always-identical blip pattern',
      'Flash-and-decay blip behavior: full brightness the instant the beam crosses a contact, fading until the next pass',
      'Concentric range rings and crosshair lines for an authentic radar-display look',
      'Cycling status text synced to full sweep rotations for a sense of ongoing multi-stage work',
      'No dependencies — pure inline SVG, CSS, and requestAnimationFrame',
    ],
    useCases: [
      { title: 'Network/device discovery loaders', text: 'A literal, on-theme fit for "scanning for devices" or "discovering peers" loading states in networking tools.' },
      { title: 'Security and monitoring dashboards', text: 'Pair with a [status icon morph spinner](/ui-snippets/status-icon-morph-spinner-check/) as an ambient "actively watching" indicator.' },
      { title: 'Sci-fi and gaming UI loading screens', text: 'A recognizable genre-appropriate loader for games, hacking-themed interfaces, or dev tools with a technical aesthetic.' },
      { title: 'AI / background processing indicators', text: 'A richer alternative to a plain spinner for "searching" or "analyzing" states, similar in spirit to the [particle swarm loader](/ui-snippets/loader-particle-swarm-orbit/) but with a directional sweep motif.' },
      { title: 'Onboarding "finding your data" moments', text: 'Use during an initial sync or import step where the product is actively discovering or connecting to external resources.' },
      { title: 'Studying JS/CSS animation synchronization', text: 'A concrete reference for keeping a JavaScript-computed value in sync with an independently-running CSS animation via a shared period.' },
    ],
    faqs: [
      { q: 'How do the JavaScript blips stay synced to the CSS-animated beam?', a: 'Both use the same period value — 2.8 seconds — defined once in the CSS animation-duration and again as the SWEEP_PERIOD constant in JS. currentSweepAngle() derives the beam\'s angle purely from elapsed time modulo that shared period, so as long as both start at the same moment and use the same period, the JS-computed angle always matches where the CSS beam visually is, without any direct communication between the two.' },
      { q: 'Why does a blip flash and then fade instead of just staying visible?', a: 'Each contact stores a lastPainted timestamp, updated only when the beam\'s current angle is close enough to that contact\'s stored angle. Every frame, opacity is computed as a function of how long ago that paint happened (fade = 1 - age / 1400), producing a bright flash immediately after the beam passes and a gradual fade until the next rotation reaches it again — matching how a real radar display\'s phosphor persistence works.' },
      { q: 'How is the beam-to-contact angular difference calculated correctly across the 0/360 boundary?', a: 'A naive subtraction (sweepAngle - contactAngle) breaks near the 359-to-0 wraparound, producing a huge false difference for angles that are actually close together. The formula ((sweepAngle - c.angle + 540) % 360) - 180 normalizes the difference into a -180 to 180 range first, so angles like 358 and 2 correctly compute as only 4 degrees apart.' },
      { q: 'Can I change how many blips appear?', a: 'Yes — edit the CONTACT_COUNT constant. Each contact is generated with a random polar angle and radius at load time, converted to Cartesian coordinates for SVG placement, so more contacts simply means more randomly-scattered blips within the same radar field.' },
      { q: 'Will this perform well as a long-running loader?', a: 'Yes — the CSS beam rotation costs nothing extra in JS, and the per-frame blip loop is a fixed small array (default 6 contacts) doing simple trigonometry and attribute updates, well within budget for any modern browser even running continuously.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Generate the contacts array once (in useMemo or a computed ref) so positions are not re-randomized on every re-render, and run the requestAnimationFrame loop in a mount effect with cleanup that cancels the frame on unmount, matching the pattern used by other per-frame animated loaders in this library.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how SWEEP_PERIOD keeps the JavaScript-computed blip timing synchronized with the independently-running CSS beam animation, and why the wrapped angular-difference formula is needed instead of a plain subtraction. It's also a good candidate for extension — ask it to add a trailing "fade tail" behind the sweep beam itself, tie blip discovery to real async results (e.g. flash a blip only once a corresponding network request actually resolves), or add a distance-ping label near each blip showing a simulated range value.`,
      prompt: `Build a radar-sweep loading indicator in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A circular radar field with concentric range rings and crosshair lines drawn as inline SVG.
- A rotating "sweep beam" implemented as a CSS conic-gradient on a rotated element, animated continuously with a CSS @keyframes rotation (not JavaScript-driven rotation) at a known, fixed duration.
- Several randomly-placed "contact" blips (circles) at random polar positions within the radar field, generated once when the page loads so the pattern differs each time.
- A JavaScript requestAnimationFrame loop that computes the beam's current angle purely from elapsed time and the SAME rotation duration used by the CSS animation, so the two stay synchronized without directly communicating.
- Each blip must only become fully visible ("painted") at the instant the computed beam angle passes over that blip's own stored angle, using an angular-difference calculation that correctly handles the wraparound between 359 and 0 degrees — then fade back down in opacity over roughly a second until the beam completes another rotation and passes it again.
- Cycling status text beneath the radar that changes to a new phrase from a short list once per full beam rotation.
- Style it with a dark background and a green (or similar) radar-scope color palette with a subtle glow effect.`,
    },
  },
};

export default loaderRadarSweepScan;
