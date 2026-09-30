const loaderLiquidFillProgress = {
  id: 'loader-liquid-fill-progress',
  title: 'Liquid Fill Progress Indicator',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="lf-stage">
  <div class="lf-tank" id="lfTank" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Fill progress">
    <svg class="lf-wave" viewBox="0 0 200 200" preserveAspectRatio="none">
      <path id="lfWavePath" d=""></path>
    </svg>
    <span class="lf-pct" id="lfPct">0%</span>
  </div>
  <div class="lf-controls">
    <button type="button" class="lf-btn" id="lfMinus">−10%</button>
    <button type="button" class="lf-btn lf-primary" id="lfPlus">+10%</button>
    <button type="button" class="lf-btn" id="lfReset">Reset</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1220;color:#e6e9f2;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.lf-stage{display:flex;flex-direction:column;align-items:center;gap:22px}

.lf-tank{position:relative;width:180px;height:220px;border-radius:90px 90px 26px 26px;background:#0f1a2e;border:3px solid #223353;overflow:hidden;box-shadow:inset 0 6px 18px rgba(0,0,0,.5)}
.lf-wave{position:absolute;left:0;bottom:0;width:100%;height:100%;transform:translateY(100%);transition:transform .7s cubic-bezier(.22,1,.36,1)}
.lf-wave path{fill:url(#lfGrad)}

.lf-pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;letter-spacing:-.02em;color:#eef2ff;text-shadow:0 2px 10px rgba(0,0,0,.4);z-index:2;font-variant-numeric:tabular-nums}

.lf-controls{display:flex;gap:10px}
.lf-btn{background:#182644;border:1.5px solid #2a3c63;color:#c7d2fe;border-radius:10px;padding:10px 16px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.lf-btn:hover{background:#233458}
.lf-primary{background:#6366f1;border-color:#6366f1;color:#fff}
.lf-primary:hover{background:#4f46e5}`,

  js: `// Build the SVG gradient once (kept in JS so the file stays a single self-contained snippet).
var svgNS = 'http://www.w3.org/2000/svg';
var svg = document.querySelector('.lf-wave');
var defs = document.createElementNS(svgNS, 'defs');
defs.innerHTML = '<linearGradient id="lfGrad" x1="0" y1="0" x2="0" y2="1">' +
  '<stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>';
svg.appendChild(defs);

var wave = document.getElementById('lfWavePath');
var tank = document.getElementById('lfTank');
var pctLabel = document.getElementById('lfPct');

var progress = 0;      // real 0-100 target value
var t = 0;              // continuous time driving the wave's undulation
var AMPLITUDE = 5;      // wave height in viewBox units
var WAVELENGTH = 200;   // one full sine cycle across the 200-wide viewBox

// Redraw the sine-wave surface every frame so the liquid keeps moving even
// while progress is holding steady at a fixed level — this is what makes it
// read as liquid rather than a rectangle sliding up.
function drawWave() {
  t += 0.06;
  var points = [];
  var steps = 24;
  for (var i = 0; i <= steps; i++) {
    var x = (i / steps) * 200;
    var y = 12 + Math.sin((x / WAVELENGTH) * Math.PI * 2 + t) * AMPLITUDE;
    points.push(x + ',' + y.toFixed(2));
  }
  var d = 'M0,' + (12 + AMPLITUDE) + ' L' + points.join(' L') + ' L200,200 L0,200 Z';
  wave.setAttribute('d', d);
  requestAnimationFrame(drawWave);
}
requestAnimationFrame(drawWave);

function render() {
  var clamped = Math.max(0, Math.min(100, progress));
  // Translate the wave surface up by the real percentage — the actual liquid
  // level, computed from the current progress value, not a fixed animation.
  svg.style.transform = 'translateY(' + (100 - clamped) + '%)';
  pctLabel.textContent = Math.round(clamped) + '%';
  tank.setAttribute('aria-valuenow', String(Math.round(clamped)));
}

document.getElementById('lfPlus').addEventListener('click', function () { progress += 10; render(); });
document.getElementById('lfMinus').addEventListener('click', function () { progress -= 10; render(); });
document.getElementById('lfReset').addEventListener('click', function () { progress = 0; render(); });

render();`,

  seo: {
    title: 'Liquid Fill Progress Indicator — Wavy SVG Loader in HTML CSS JS',
    description: `A tank that fills with an animated liquid surface — a real sine-wave SVG path driven by an actual percentage, with continuous undulation even while holding. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Liquid Fill Progress Indicator — A Tank That Fills With a Genuinely Undulating Surface',
      description: `A liquid fill indicator shows progress as rising liquid inside a container rather than a bar or ring — a shape more associated with tanks, gauges, and playful onboarding or gamified UIs than a typical [progress bar](/ui-snippets/progress-bar/). The part that makes it convincing is the surface: a flat rectangle sliding up reads as a fake liquid, so this snippet draws the top edge as a real sine wave in an SVG path and keeps it moving continuously, even when the fill level is holding steady.

**A sine wave, not a straight edge**

The liquid's surface is an SVG \`<path>\` rebuilt every frame inside a \`requestAnimationFrame\` loop. Twenty-four points are sampled across the tank's width, each offset vertically by \`Math.sin((x / WAVELENGTH) * Math.PI * 2 + t)\`, where \`t\` increments a little every frame. That constant increment is what keeps the wave rolling sideways forever — the surface never goes flat, whether progress is at 20% or sitting untouched at 70% for a minute.

**The fill level is a real value**

Separately from the wave's own motion, the whole SVG element is translated vertically by \`translateY(100 - progress + '%')\`, computed directly from a \`progress\` variable you control (0–100). This is the actual liquid level: incrementing progress with the demo buttons animates the tank rising or falling with a smooth \`cubic-bezier\` transition, while the sine wave keeps undulating on top of wherever that level currently sits — two independent motions (level and surface) composed together, which is what separates this from a bar with a wavy PNG background.

**Two separate motions, cleanly split**

Keeping "how full" (a CSS transform driven by a real percentage) and "how the surface moves" (a continuously regenerated SVG path) as two independent systems is the key architectural decision here. It means you can drive progress from a real value — an upload's loaded/total, a task counter, a battery level — while the wave animation runs untouched in its own rAF loop, never needing to know what the percentage is.

**Accessible and swappable**

The tank carries \`role="progressbar"\` with \`aria-valuenow\` kept in sync with the real percentage on every render, so assistive tech reports genuine progress, not just the visual. Swap the pill-shaped tank for a circle, change the gradient stops, or tune \`AMPLITUDE\`/\`WAVELENGTH\` for calmer or choppier water. Pair it with a [circular progress](/ui-snippets/circular-progress/) ring for a numeric companion, or a [quota usage meter](/ui-snippets/quota-usage-meter/) for a dashboard context.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A tank renders empty with a percentage label at 0%.` },
      { title: 'Click +10% / −10%', text: `The liquid level rises or falls with a smooth transition to the real value.` },
      { title: 'Watch the surface at rest', text: `Even holding steady, the wave keeps rolling — it never goes flat.` },
      { title: 'Drive it from real data', text: `Set the progress variable from your actual percentage and call render().` },
      { title: 'Tune the wave', text: `Adjust AMPLITUDE and WAVELENGTH for calmer or choppier motion.` },
      { title: 'Restyle the tank', text: `Change the border-radius, gradient stops, or container shape.` },
    ] },
    features: [
      { title: 'Real sine-wave surface', text: `An SVG path resampled every frame — a genuine undulation, not a static wavy image.` },
      { title: 'Independent level and motion', text: `Fill height is a real percentage; the wave's roll is a separate, continuous system.` },
      { title: 'Holds and still moves', text: `The surface keeps animating even while progress is unchanged.` },
      { title: 'Smooth level transitions', text: `A cubic-bezier transform eases the tank between percentages.` },
      { title: 'Accessible progressbar role', text: `aria-valuenow tracks the real value on every render.` },
      { title: 'Gradient liquid fill', text: `A cyan-to-indigo SVG gradient gives the liquid depth.` },
      { title: 'Tunable physics', text: `AMPLITUDE and WAVELENGTH constants control the wave's character.` },
      { title: 'No dependencies', text: `Pure SVG, CSS, and vanilla JS — no canvas library or animation engine.` },
    ],
    useCases: [
      { title: 'Onboarding and gamified progress', text: `A playful alternative to a [progress bar](/ui-snippets/progress-bar/) for setup or level-up flows.` },
      { title: 'Battery and resource gauges', text: `Show charge, storage, or quota level, alongside a [quota usage meter](/ui-snippets/quota-usage-meter/).` },
      { title: 'Hydration or goal trackers', text: `A literal water-themed visual for fitness or wellness goal widgets.` },
      { title: 'File upload/download level', text: `Pair with an [upload progress](/ui-snippets/upload-progress/) bar for a more expressive companion visual.` },
      { title: 'Dashboard KPI tanks', text: `Show a metric filling toward a target next to a [circular progress](/ui-snippets/circular-progress/) ring.` },
      { title: 'Loading-state exploration', text: `A reference for combining a real value with continuous ambient motion.` },
      { icon: 'CODE', title: 'Related: Button Loading State Morph', desc: 'See the [Button Loading State Morph](/ui-snippets/loader-inline-button-morph/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the wave keep moving even when progress is unchanged?', a: `The wave's shape and the fill level are two separate systems. A requestAnimationFrame loop increments a time variable t every frame and rebuilds the SVG path from Math.sin(x / WAVELENGTH * 2π + t) regardless of the progress value, so the surface keeps rolling sideways continuously. The fill level is a separate CSS transform driven only by the progress variable, so it only changes when you actually update progress.` },
      { q: 'Why use an SVG path instead of a CSS wavy background image?', a: `A static background image repeats identically every cycle and cannot be resized without artifacts. Rebuilding the path from real trigonometry each frame means the wave scales cleanly to any tank width, the amplitude and wavelength are tunable numbers rather than a fixed asset, and the motion has no visible seam or restart point.` },
      { q: 'How do I drive it from a real percentage, like an upload progress event?', a: `Set the progress variable to your real value (0-100) — for example from a fetch/XHR progress event's loaded/total — and call render(). The translateY transform and the aria-valuenow both update from that same variable, so the visual and the accessible value never drift apart.` },
      { q: 'How do I make the water look calmer or choppier?', a: `Lower AMPLITUDE for a calmer, flatter surface or raise it for more dramatic waves. Increase WAVELENGTH for slower, broader swells or decrease it for tighter ripples. Changing the 0.06 increment on t controls how fast the surface scrolls sideways.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the rAF wave-drawing loop in a mount effect with cleanup (cancelAnimationFrame on unmount), and drive the fill level from component state instead of a bare variable — update the transform whenever your progress prop or state changes. The SVG path generation logic is framework-agnostic and ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Rather than working out the wave math from scratch, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the SVG path's y-coordinate formula combines a per-frame time variable with Math.sin to produce continuous sideways motion, and why the fill level is a completely separate transform rather than being baked into the same wave calculation. The same assistant can help optimize it — for instance asking whether resampling 24 points every frame is necessary at small tank sizes, or whether the amplitude should scale down as the tank narrows. It's also useful for extending the effect: ask it to add a second, offset wave layer for more visual depth, make the liquid color shift as it approaches 100%, or add a subtle bobbing/splash animation triggered on level changes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "liquid fill" progress indicator in plain HTML, CSS, and JavaScript using an SVG path for the liquid surface — no canvas library, no animation engine.

Requirements:
- A rounded tank/container shape with overflow hidden, containing an SVG whose viewBox spans the tank, and a percentage label centered on top.
- The liquid's top surface must be an SVG path recomputed every animation frame inside a requestAnimationFrame loop: sample a fixed number of x-coordinates across the viewBox width, compute each point's y-offset from a sine function of x combined with a continuously incrementing time variable, and rebuild the path's d attribute from those points each frame — so the surface visibly undulates sideways forever, never settling into a static shape.
- The actual fill LEVEL must be entirely separate from the wave's own motion: represent it as a CSS transform (a vertical translate) on the whole wave SVG element, computed directly from a real numeric progress variable (0 to 100), with a smooth CSS transition so changing the level eases rather than snaps.
- Demonstrate both systems working together: add buttons that increment/decrement the progress variable, and confirm that even while progress is unchanged and the tank is holding at a fixed level, the sine-wave surface keeps moving.
- Give the tank container role="progressbar" with aria-valuemin, aria-valuemax, and aria-valuenow, updating aria-valuenow every time the progress variable changes so assistive tech reports the real value.
- Fill the liquid path with an SVG linearGradient for visual depth rather than a flat color.`,
    },
  },
};

export default loaderLiquidFillProgress;
