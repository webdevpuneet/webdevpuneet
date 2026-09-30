const canvasWaveBackground = {
  id: 'canvas-wave-background',
  title: 'Canvas Wave Background',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<section class="cwb-wrap">
  <canvas class="cwb-canvas" id="cwbCanvas"></canvas>
  <div class="cwb-content">
    <span class="cwb-tag">canvas 2d · layered sine ribbons</span>
    <h1>Ride the current</h1>
    <p>Four filled wave layers moving at independent speeds, amplitudes, and colors.</p>
    <button class="cwb-btn">Get started</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#031018;color:#fff;min-height:100vh}
.cwb-wrap{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center}
.cwb-canvas{position:absolute;inset:0;width:100%;height:100%}
.cwb-content{position:relative;z-index:1;text-align:center;max-width:460px;padding:26px}
.cwb-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#67e8f9;background:rgba(103,232,249,.1);border:1px solid rgba(103,232,249,.3);padding:5px 12px;border-radius:99px;margin-bottom:16px}
.cwb-content h1{font-size:clamp(34px,7vw,58px);font-weight:800;letter-spacing:-.03em}
.cwb-content p{font-size:14.5px;color:#a7c5ce;margin-top:12px;line-height:1.7}
.cwb-btn{margin-top:26px;padding:14px 30px;border-radius:12px;border:none;background:linear-gradient(135deg,#22d3ee,#0ea5e9);color:#031018;font:700 14px system-ui;cursor:pointer;box-shadow:0 16px 34px -16px rgba(34,211,238,.6)}`,

  js: `var canvas = document.getElementById('cwbCanvas');
var ctx = canvas.getContext('2d');
var wrap = document.querySelector('.cwb-wrap');
var W, H, DPR;

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = wrap.clientWidth;
  H = wrap.clientHeight;
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
resize();
window.addEventListener('resize', resize);

// Each layer is an independent sine ribbon: its own baseline height, amplitude,
// wavelength, horizontal speed, and fill. Layering several with staggered
// baselines and decreasing opacity toward the back is what reads as depth —
// a single wave just looks like a wiggling line.
var LAYERS = [
  { baseline: 0.78, amplitude: 22, wavelength: 340, speed: 0.55, color: 'rgba(34,211,238,0.55)' },
  { baseline: 0.83, amplitude: 30, wavelength: 260, speed: -0.35, color: 'rgba(14,165,233,0.5)' },
  { baseline: 0.9,  amplitude: 26, wavelength: 420, speed: 0.22, color: 'rgba(56,189,248,0.42)' },
  { baseline: 0.97, amplitude: 18, wavelength: 200, speed: -0.7, color: 'rgba(125,211,252,0.38)' }
];

function drawLayer(layer, t) {
  var baseY = H * layer.baseline;
  var k = (Math.PI * 2) / layer.wavelength;

  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, baseY);

  for (var x = 0; x <= W; x += 6) {
    var y = baseY + Math.sin(x * k + t * layer.speed) * layer.amplitude
                   + Math.sin(x * k * 1.7 - t * layer.speed * 1.3) * (layer.amplitude * 0.3);
    ctx.lineTo(x, y);
  }

  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fillStyle = layer.color;
  ctx.fill();
}

var t = 0;
function tick() {
  t += 0.9;
  ctx.clearRect(0, 0, W, H);
  for (var i = 0; i < LAYERS.length; i++) drawLayer(LAYERS[i], t);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);`,

  seo: {
    title: 'Canvas Wave Background — Free Layered Sine Ribbon Hero Effect',
    description: `Four filled sine-wave ribbons animating at independent speeds, amplitudes, and colors for a smooth, layered ocean-wave hero background. Pure Canvas 2D, no dependencies. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Wave Background — Layered Sine Ribbons for a Sense of Depth',
      description: `A single animated sine wave reads as a wiggling line. This snippet stacks four of them — each with its own baseline height, amplitude, wavelength, speed, and translucent fill — to produce the smooth, layered look of ocean swells rolling behind a hero section, built entirely with filled canvas paths rather than strokes.

**Why filled shapes instead of strokes**

Every layer is drawn as a closed path: start at the bottom-left corner, trace the sine curve left to right, drop down to the bottom-right corner, and close back to the start. Filling that shape with a translucent color is what gives each wave visual weight and lets it convincingly occlude the layers behind it — a stroked line would only ever look like a wire outline, with nothing suggesting mass or water beneath the surface.

**Depth from staggered baselines and speed, not blur**

Each of the four \`LAYERS\` has a different \`baseline\` (how far down the canvas its resting line sits) and a different \`speed\` — including negative values, so some layers drift right while others drift left. Combined with decreasing opacity for layers further down, that's the entire depth illusion: nearer waves move faster and sit higher with more contrast, farther waves move slower, sit lower, and fade toward the background color. No blur filter or z-axis is involved.

**Two sine terms per layer, not one**

\`drawLayer()\` doesn't plot a pure sine curve — it sums a primary wave with a smaller secondary one at a different frequency and phase speed: \`Math.sin(x * k + t * speed) * amplitude\` plus a lighter \`Math.sin(x * k * 1.7 - t * speed * 1.3)\` term. That second term breaks up the otherwise perfectly regular crest spacing, so each ribbon has a subtle irregularity to it rather than looking like a textbook sine plot — the same "combine two waves" idea used in [aurora background](/ui-snippets/aurora-bg/) and [wavy background](/ui-snippets/wavy-background/), applied here to filled ribbons instead of strokes or gradients.

**High-DPI sizing done once**

\`resize()\` scales the canvas backing store by \`devicePixelRatio\` (capped at 2) and applies a matching \`ctx.setTransform\`, so every coordinate in \`drawLayer\` stays in plain CSS pixels while still rendering crisply on Retina displays — the same pattern worth reusing in any full-bleed canvas background.

**Tuning the current**

Add or remove entries in \`LAYERS\` to change how many ribbons stack; push \`baseline\` values further down and amplitude up for a stormier feel, or flatten amplitudes and slow every \`speed\` for a calm, barely-moving backdrop. Pair it with [gradient mesh hero](/ui-snippets/gradient-mesh-hero/) for a softer companion background, or [ripple background](/ui-snippets/ripple-background/) for an interactive water effect alongside it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Four wave ribbons animate immediately behind the hero content.` },
      { title: 'Watch the layering', text: `Nearer waves move faster and sit brighter; farther ones lag and fade.` },
      { title: 'Resize the window', text: `The canvas rescales for devicePixelRatio and viewport size.` },
      { title: 'Add a layer', text: `Push a new object into LAYERS with its own baseline/speed/color.` },
      { title: 'Change the mood', text: `Raise amplitude and speed for choppier water, lower for calm.` },
      { title: 'Swap the palette', text: `Change each layer's rgba() fill for a different time of day.` },
    ] },
    features: [
      { title: 'Filled ribbon shapes', text: `Closed paths filled with translucent color, not stroked lines.` },
      { title: 'Four independent layers', text: `Each with its own baseline, amplitude, wavelength, and speed.` },
      { title: 'Bidirectional drift', text: `Negative speeds move some layers opposite others.` },
      { title: 'Dual-sine ribbons', text: `A secondary wave term breaks up regular crest spacing.` },
      { title: 'Depth via opacity and baseline', text: `No blur filter — just staggered contrast and position.` },
      { title: 'High-DPI canvas sizing', text: `devicePixelRatio scaling keeps edges crisp on Retina.` },
      { title: 'Fully responsive', text: `Resizes and redraws to fill any wrapper size.` },
      { title: 'Zero dependencies', text: `Pure Canvas 2D and vanilla JS.` },
    ],
    useCases: [
      { title: 'SaaS and product hero sections', text: `A calm animated backdrop behind a headline and CTA.` },
      { title: 'Ocean/travel/water-brand pages', text: `A literal wave motif for coastal or marine brands.` },
      { title: 'Alongside other canvas backgrounds', text: `Pair with [aurora background](/ui-snippets/aurora-bg/) for contrast.` },
      { title: 'Section dividers', text: `A short wave strip between two content sections.` },
      { title: 'Login/signup screens', text: `A subtle moving background behind a centered form.` },
      { title: 'Companion to ripple effects', text: `Combine with [ripple background](/ui-snippets/ripple-background/).` },
      { icon: 'CODE', title: 'Related: Cursor Spotlight Reveal', desc: 'See the [Cursor Spotlight Reveal](/ui-snippets/cursor-spotlight-reveal/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why are the waves filled shapes instead of stroked lines?', a: `Each layer traces a sine curve and then closes the path down to the bottom of the canvas before filling it, which gives the wave visual weight and lets it convincingly occlude the layers behind it. A stroked line would only ever render as a thin wire outline with nothing suggesting mass or water beneath the surface, so filling is what makes the effect read as waves rather than a wiggling graph line.` },
      { q: 'How is depth created without any blur or 3D?', a: `Depth comes entirely from four values that differ per layer: baseline height (farther layers sit lower), speed (nearer layers move faster, including some drifting in the opposite direction from others), amplitude, and fill opacity (farther layers are more transparent, blending toward the background color). Stacking those differences is enough to read as foreground-to-background depth without any blur filter or actual z-axis.` },
      { q: 'Why does each layer combine two sine waves instead of one?', a: `A single Math.sin term produces perfectly regular, evenly spaced crests that can look mechanical. Adding a second, smaller sine term at a different frequency and phase speed — Math.sin(x * k * 1.7 - t * speed * 1.3) at roughly 30% amplitude — breaks up that regularity, so each ribbon has a subtle, non-repeating irregularity that reads as more natural water motion.` },
      { q: 'Why cap devicePixelRatio at 2 in resize()?', a: `Very high-density phone displays can report a devicePixelRatio of 3 or more, and sizing the canvas backing store that large multiplies memory use and fill-rate cost for very little visible sharpness improvement over 2x. Capping it at 2 keeps the canvas crisp on virtually all displays while avoiding an oversized backing store on the highest-density devices.` },
      { q: 'How do I use this canvas wave background in React, Vue, or Angular?', a: `Move the canvas ref, resize() call, and requestAnimationFrame loop into a mount effect, store the animation frame id, and cancelAnimationFrame it in the cleanup function so the loop stops when the component unmounts. Re-run resize() from a ResizeObserver on the wrapper element if the background needs to track a container that can change size independent of the window.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how staggering baseline, speed, and opacity across the four LAYERS entries produces a sense of depth without any blur filter, or why each layer sums two sine terms at different frequencies instead of plotting a single clean sine curve. It's also useful for tuning the mood — ask it to predict how the wave would look if you doubled every amplitude value, or flattened every speed toward zero, before you actually try it. For extensions, ask it to add a fifth foreground layer with a lighter fill and higher amplitude for a "closest wave" effect, tie one layer's amplitude to scroll position for a parallax feel, or add a subtle color shift over time using HSL interpolation instead of fixed rgba() fills. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "canvas wave background" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API — layered, filled sine-wave ribbons behind hero content, no libraries.

Requirements:
- A full-bleed canvas positioned absolutely behind a centered hero content block (heading, paragraph, button), sized using devicePixelRatio (capped at 2) with a matching ctx.setTransform call so drawing coordinates stay in plain CSS pixels.
- Define an array of at least four wave "layers", each with its own baseline height (as a fraction of canvas height), amplitude, wavelength, horizontal animation speed (including at least one negative value so some layers drift the opposite direction from others), and a translucent rgba() fill color, with opacity generally decreasing for layers whose baseline sits lower/further back.
- For each layer, draw a CLOSED, FILLED path (not a stroked line): start at the bottom-left canvas corner, trace across the width plotting y = baseline + sine-based offset at small x increments, continue to the bottom-right corner, and close the path back to the start, then fill it with that layer's color — explain in comments why filling rather than stroking is what gives the wave visual weight.
- For each layer's y offset, sum TWO sine terms at different frequencies and phase speeds (a primary wave plus a smaller secondary wave, e.g. at 1.7x the frequency and a different speed multiplier) rather than a single clean sine term, so the ribbon's crest spacing isn't perfectly mechanical/regular.
- Animate all layers from one shared requestAnimationFrame loop and a single incrementing time variable, drawing back-to-front (or explain the intended draw order) so nearer/faster layers visually sit in front of farther/slower ones.
- Handle window resize by recalculating the canvas size and DPR transform, and style the page as a dark ocean-at-night gradient background with cyan/blue wave colors and a light call-to-action button above the canvas.`,
    },
  },
};

export default canvasWaveBackground;
