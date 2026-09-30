const waveLoader = {
  id: 'wave-loader',
  title: 'Wave Loader',
  lastmod: '2026-06-24',
  category: 'loaders',
  html: `<div class="wl-stage">
  <div class="wl-orb">
    <svg class="wl-svg" viewBox="0 0 120 120">
      <defs><clipPath id="wlClip"><circle cx="60" cy="60" r="56"/></clipPath></defs>
      <circle cx="60" cy="60" r="56" class="wl-ring"/>
      <g clip-path="url(#wlClip)">
        <rect x="0" y="0" width="120" height="120" class="wl-fill" id="wlFill"/>
        <path class="wl-wave" id="wlWave1"/>
        <path class="wl-wave wl-wave2" id="wlWave2"/>
      </g>
    </svg>
    <div class="wl-pct" id="wlPct">0%</div>
  </div>
  <input type="range" id="wlRange" min="0" max="100" value="65" aria-label="Fill level">
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:26px}

.wl-orb{position:relative;width:160px;height:160px}
.wl-svg{width:160px;height:160px}
.wl-ring{fill:#0b1220;stroke:#1e293b;stroke-width:3}
.wl-fill{fill:#1d4ed8;opacity:.25}
.wl-wave{fill:#3b82f6;opacity:.85}
.wl-wave2{fill:#60a5fa;opacity:.55}
/* The two waves slide horizontally at different speeds for a layered liquid look. */
#wlWave1{animation:wlMove 2.4s linear infinite}
#wlWave2{animation:wlMove 3.6s linear infinite reverse}
@keyframes wlMove{from{transform:translateX(0)}to{transform:translateX(-120px)}}

.wl-pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.5);font-variant-numeric:tabular-nums}
input[type=range]{width:200px;accent-color:#3b82f6}`,

  js: `var range = document.getElementById('wlRange');
var pct = document.getElementById('wlPct');
var SVGNS = 'http://www.w3.org/2000/svg';

// Build a sine wave path twice as wide as the orb so it can slide seamlessly.
function wavePath(level, amp, len) {
  // level 0..1 → baseline y (full at top when level=1). The path is 240 wide
  // (2x the 120 viewBox) so translating by -120 loops perfectly.
  var baseY = 120 - level * 120;
  var d = 'M0,' + baseY.toFixed(1);
  for (var x = 0; x <= 240; x += 6) {
    var y = baseY + Math.sin((x / len) * Math.PI * 2) * amp;
    d += ' L' + x + ',' + y.toFixed(1);
  }
  d += ' L240,120 L0,120 Z';
  return d;
}

function update() {
  var level = +range.value / 100;
  document.getElementById('wlWave1').setAttribute('d', wavePath(level, 5, 60));
  document.getElementById('wlWave2').setAttribute('d', wavePath(level, 7, 80));
  document.getElementById('wlFill').setAttribute('y', (120 - level * 120).toFixed(1));
  document.getElementById('wlFill').setAttribute('height', (level * 120).toFixed(1));
  pct.textContent = range.value + '%';
}

range.addEventListener('input', update);
update();`,

  seo: {
    title: 'Wave Loader — Liquid Fill Loader HTML CSS JS SVG',
    description: `A liquid wave-fill loader — an orb that fills with two animated sine waves to a percentage, clipped to a circle. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Wave Loader — A Liquid-Fill Orb with Two Animated Sine Waves',
      description: `The wave (or liquid-fill) loader shows progress as liquid rising in a container, its surface rippling with animated waves — a richer, more organic alternative to a plain bar or spinner. This snippet builds it in plain HTML, CSS, SVG, and vanilla JavaScript: a circular orb that fills to any percentage with two layered sine waves sliding across the surface — no library.

**Waves drawn as sine paths**

The wave surface is an SVG \`path\` generated from the sine function: \`wavePath()\` walks across the width sampling \`sin()\` to build the rippled top edge, then closes the path down to the bottom to form a filled body of liquid. The path is drawn twice as wide as the orb (240 across a 120 viewBox) so it can slide a full wavelength and loop seamlessly. Generating the wave from \`sin()\` (rather than a static image) means the amplitude, wavelength, and fill level are all parameters you control.

**Two layers for depth**

Two wave paths are stacked — one taller-amplitude and more opaque, one shorter and translucent — animated at different speeds and opposite directions. This parallax of two offset waves is what makes the liquid look alive and three-dimensional rather than a single flat ripple; it is the same trick used in app liquid-progress widgets. A faint static fill rectangle behind them gives the body colour.

**Clipped to the container shape**

Everything inside the orb is wrapped in a \`clipPath\` of the circle, so the rectangular waves and fill are masked to the round shape — the liquid appears to sit inside the orb with a clean curved edge. Swapping the clip shape (a rounded rect, a logo path) reshapes the container without touching the wave logic, which is the flexibility the clip approach gives.

**Level-driven fill**

The fill level (0–100%) sets the waves' baseline y — at 100% the surface is at the top, at 0% at the bottom — and a percentage label sits centred over the orb. Here a slider drives the level live so you can see it fill and drain; in real use you would set the level from your actual progress (upload percent, score, capacity). The horizontal sliding is pure CSS animation, independent of the level, so the liquid keeps rippling at any fill.

**Drop-in and adaptable**

Tune the wave amplitude, wavelength, colours, and speeds, or change the clip shape to fit your design. It is a complete, dependency-free reference for sine-wave path generation, layered wave parallax, and clip-path container masking — the foundation of any liquid-fill loader or gauge. Because \`update()\` rewrites the \`d\` attribute on every change rather than only animating the CSS slide, regenerating the path is the right place to put any easing if you switch the level from a slider to programmatic progress updates — wrap the level changes in a short transition loop (or animate a JS value over a few hundred milliseconds and call \`update()\` each frame) so the surface rises smoothly instead of jumping straight to the new height.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A liquid orb renders, filled with two rippling waves, and a slider to set the level.` },
      { title: 'Drag the slider', text: `Change the fill level 0-100% and watch the liquid rise or drain while the waves ripple.` },
      { title: 'Drive from real progress', text: `Set range.value (or call update with your level) from upload percent, score, or capacity.` },
      { title: 'Tune the waves', text: `Adjust the amplitude, wavelength, and animation speeds for calmer or choppier liquid.` },
      { title: 'Reshape the container', text: `Change the clipPath shape to a rounded rect or logo to fill a different outline.` },
      { title: 'Restyle it', text: `Edit the wave colours, body fill, and ring to match your theme.` },
    ] },
    features: [
      { title: 'Sine-generated waves', text: `The rippled surface is an SVG path built from sin(), so amplitude and wavelength are parameters.` },
      { title: 'Two-layer parallax', text: `Two waves at different speeds and directions give the liquid depth and life.` },
      { title: 'Seamless looping', text: `The path is double-width so it slides one wavelength and loops without a seam.` },
      { title: 'Clip-path container', text: `Rectangular waves are masked to the orb shape via a clipPath.` },
      { title: 'Level-driven fill', text: `The fill level sets the wave baseline, from empty at 0% to full at 100%.` },
      { title: 'Centred percentage', text: `A tabular-figures label shows the level over the liquid.` },
      { title: 'Pure-CSS ripple', text: `The horizontal slide is a CSS animation, independent of the fill level.` },
      { title: 'Reshapeable & no library', text: `Swap the clip shape to refill any outline — plain HTML/CSS/SVG/JS.` },
    ],
    useCases: [
      { title: 'Upload and download progress', text: `Show transfer progress as rising liquid — pair with an [upload progress](/ui-snippets/upload-progress/) bar.` },
      { title: 'Capacity and storage meters', text: `Visualise used capacity, alongside a [quota usage meter](/ui-snippets/quota-usage-meter/).` },
      { title: 'Scores and goal completion', text: `A playful fill for a score or daily goal, next to [activity rings](/ui-snippets/activity-rings/).` },
      { title: 'Battery and water tracking', text: `Liquid-style level indicators for apps.` },
      { title: 'Hero and loading accents', text: `An eye-catching loader while content loads.` },
      { title: 'Learning SVG wave paths', text: `A reference for sine-path generation and clip masking — compare with a [breathing animation](/ui-snippets/breathing-animation/).` },
    ],
    faqs: [
      { q: 'How is the wave shape generated?', a: `wavePath() walks across the width in small steps, computing each point's y as the fill baseline plus sin(x) × amplitude, building an SVG path of the rippled surface, then closes it down to the bottom to form a filled body. Because it is generated from sin() rather than a fixed image, you control the amplitude (wave height), wavelength, and baseline (fill level) as parameters.` },
      { q: 'Why are there two waves?', a: `A single ripple looks flat. Stacking two waves — one taller and more opaque, one shorter and translucent — animated at different speeds and opposite directions creates a parallax that reads as real, three-dimensional liquid. This layered-wave technique is what app liquid-progress widgets use to make the fill feel alive at any level.` },
      { q: 'How does it loop without a visible seam?', a: `The wave path is drawn twice as wide as the visible orb (240 across a 120 viewBox). The CSS animation translates it left by exactly one orb-width (120px), so when it resets, the second half of the wave has moved into the position the first half started in — a continuous sine pattern means the wave looks identical, and the loop is seamless.` },
      { q: 'How do I drive it from real progress?', a: `The fill level comes from the slider's 0-100 value, which sets the wave baseline and the static fill height. In real use, set that level from your actual progress — assign range.value or call update() with your percentage from an upload's loaded/total, a score, or a capacity figure. The wave ripple animation is independent of the level, so it keeps moving as the liquid rises.` },
      { q: 'How do I use this wave loader in React, Vue, or Angular?', a: `Hold the fill level in state and recompute the wave path d attributes from it in the render (or imperatively via a ref). In React use useState and set the paths in an effect or inline; in Vue bind :d with a computed; in Angular bind [attr.d] with a getter. The wavePath() sine math and the CSS ripple animation are framework-agnostic — only the level state moves into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to walk through wavePath()'s two summed sine terms — the primary wave plus a smaller harmonic at 2.3 times its frequency — and explain concretely why a single sine would look mechanical while the sum reads as organic liquid. It's worth an efficiency check too: the path is drawn twice the orb's width so the CSS translate animation can loop seamlessly, so ask what would visually break (a visible seam or jump) if the sample step or the double-width trick were removed. For extending it, ask for a version driven by a smoothly animated JS value instead of an instant slider jump, so the liquid actually rises and falls rather than snapping, a way to reshape the clipPath into a rounded rectangle or custom logo outline, or a color that shifts from red to green as the level crosses a threshold. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a circular liquid-fill "wave loader" in plain HTML, CSS, and SVG using vanilla JavaScript — the fill surface generated from sine math, not a static image.

Requirements:
- An SVG circle acting as the loader's outer ring, with a clipPath matching that same circle shape applied to a group containing the liquid layers, so anything drawn inside is masked to the round outline.
- A function that generates an SVG path string representing a rippled liquid surface: given a fill level (0 to 1), an amplitude, and a wavelength, sample points across a width at least twice as wide as the visible orb, compute each point's y-coordinate as the level's baseline plus a sine function of x scaled by amplitude, then close the path down to the bottom to form a filled shape.
- Render two separate wave paths from that function with different amplitudes, wavelengths, and opacities, and animate them horizontally in opposite directions and at different speeds using CSS keyframe animations, so the two layers create a parallax effect that reads as three-dimensional liquid rather than a flat ripple.
- The horizontal CSS animation must translate each wave path by exactly one orb-width so that when it loops back to its start, the visual pattern is identical and the loop shows no visible seam or jump.
- Add a percentage label centered over the orb showing the current fill level as a number, using a tabular numeral font so the digits don't jitter as the value changes.
- Wire a range slider (or an equivalent programmatic input) that, on every change, recomputes both wave paths' d attributes and a background fill rectangle's height from the new level — the horizontal ripple animation must keep running independently of the level, purely via CSS, while only the level-driven baseline position is recalculated in JavaScript.`,
    },
  },
};

export default waveLoader;
