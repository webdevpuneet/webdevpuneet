const canvasMeshGradientBg = {
  id: 'canvas-mesh-gradient-bg',
  title: 'Canvas Mesh Gradient Background',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<section class="cmg-wrap">
  <canvas class="cmg-canvas" id="cmgCanvas"></canvas>
  <div class="cmg-content">
    <span class="cmg-tag">canvas 2d · blurred radial blobs</span>
    <h1>Design, reimagined</h1>
    <p>Soft color blobs drift and orbit slowly, blending into a living mesh gradient.</p>
    <button class="cmg-btn">Start free trial</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0b12;color:#fff;min-height:100vh}
.cmg-wrap{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center}
.cmg-canvas{position:absolute;inset:0;width:100%;height:100%;filter:blur(60px) saturate(1.3)}
.cmg-content{position:relative;z-index:1;text-align:center;max-width:480px;padding:26px}
.cmg-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f5f5ff;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);padding:5px 12px;border-radius:99px;margin-bottom:16px;backdrop-filter:blur(6px)}
.cmg-content h1{font-size:clamp(34px,7vw,60px);font-weight:800;letter-spacing:-.03em;text-shadow:0 4px 30px rgba(0,0,0,.4)}
.cmg-content p{font-size:15px;color:#e7e5f5;margin-top:12px;line-height:1.7;text-shadow:0 2px 14px rgba(0,0,0,.4)}
.cmg-btn{margin-top:28px;padding:14px 30px;border-radius:12px;border:none;background:#0b0b12;color:#fff;font:700 14px system-ui;cursor:pointer;box-shadow:0 16px 34px -16px rgba(0,0,0,.7)}`,

  js: `var canvas = document.getElementById('cmgCanvas');
var ctx = canvas.getContext('2d');
var wrap = document.querySelector('.cmg-wrap');
var W, H;

function resize() {
  // The CSS blur filter on the canvas element does the softening — the
  // canvas itself only needs to draw solid, high-contrast circles at a
  // modest resolution, which keeps the per-frame draw cost low.
  W = canvas.width = wrap.clientWidth * 0.6;
  H = canvas.height = wrap.clientHeight * 0.6;
}
resize();
window.addEventListener('resize', resize);

// Each blob orbits a home point on its own independent ellipse: its own
// radius, speed, phase, and color. That independence — no two blobs share a
// period or a center — is what keeps the mesh from ever repeating visibly.
var BLOBS = [
  { color: '#7c3aed', hx: 0.25, hy: 0.35, orbitX: 0.22, orbitY: 0.18, speed: 0.35, phase: 0,   size: 0.55 },
  { color: '#ec4899', hx: 0.75, hy: 0.3,  orbitX: 0.18, orbitY: 0.24, speed: 0.28, phase: 2.1, size: 0.5 },
  { color: '#22d3ee', hx: 0.3,  hy: 0.75, orbitX: 0.2,  orbitY: 0.2,  speed: 0.22, phase: 4.2, size: 0.52 },
  { color: '#f59e0b', hx: 0.72, hy: 0.72, orbitX: 0.16, orbitY: 0.22, speed: 0.4,  phase: 1.4, size: 0.42 },
  { color: '#4ade80', hx: 0.5,  hy: 0.5,  orbitX: 0.28, orbitY: 0.12, speed: 0.18, phase: 3.3, size: 0.4 }
];

var t = 0;
function tick() {
  t += 0.008;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#0b0b12';
  ctx.fillRect(0, 0, W, H);

  for (var i = 0; i < BLOBS.length; i++) {
    var b = BLOBS[i];
    var cx = (b.hx + Math.cos(t * b.speed + b.phase) * b.orbitX) * W;
    var cy = (b.hy + Math.sin(t * b.speed * 1.3 + b.phase) * b.orbitY) * H;
    var r = b.size * Math.min(W, H);

    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, b.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);`,

  seo: {
    title: 'Canvas Mesh Gradient Background — Free Animated Blurred Blob Effect',
    description: `Soft, saturated color blobs orbiting slowly on a low-resolution canvas, softened with a CSS blur filter into a smooth, trendy animated mesh gradient. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Mesh Gradient Background — Orbiting Blobs Softened by CSS',
      description: `The animated mesh gradient look — soft, saturated color fields blending into each other — is everywhere in modern SaaS and product marketing pages. This snippet builds it with a small trick: draw sharp, high-contrast radial gradient circles on a low-resolution canvas, then let a single CSS \`filter: blur()\` on the canvas element do the actual softening. The blur is free, GPU-accelerated, and completely decoupled from the animation logic.

**Draw sharp, let CSS blur it**

Every blob is a plain \`createRadialGradient\` circle — full color at the center fading to transparent at the edge — drawn with hard mathematical precision. None of that softness is visible directly: \`.cmg-canvas { filter: blur(60px) saturate(1.3) }\` in the CSS is what turns those crisp circles into the smooth, melting color fields the effect is known for. Because the blur is a compositor-level CSS filter rather than a canvas shadow or manual convolution, it costs almost nothing extra to animate — the JavaScript never has to know it's happening.

**Drawing small on purpose**

\`resize()\` deliberately sizes the canvas's backing store to only 60% of the wrapper's dimensions. Since a 60px blur is going to erase most fine detail anyway, there is no benefit to drawing at full resolution — doing so would just spend more pixel-fill time per frame for a visually identical result once blurred. This is the inverse of the usual high-DPI advice, and it's a useful pattern any time a canvas feeds into a heavy CSS filter.

**Orbits instead of random walks**

Each blob in \`BLOBS\` has a \`hx, hy\` home position and orbits it on an ellipse defined by \`orbitX\`, \`orbitY\`, its own \`speed\`, and a \`phase\` offset — \`cx = (hx + cos(t * speed + phase) * orbitX) * W\`. Because every blob's period, radius, and starting phase are different, the five orbits drift in and out of alignment with each other indefinitely without ever repeating in a way a viewer would notice, and — unlike a random-walk approach — the motion is perfectly smooth and perfectly loops mathematically rather than needing manual bounds-checking.

**Layering and readability**

The wrapper's actual content sits in a separate stacking layer above the canvas with its own \`text-shadow\` for legibility against a busy background, and the canvas itself paints an opaque base color before drawing blobs so partially-transparent gradient edges never reveal a transparent hole. Pair this background with a [gradient mesh hero](/ui-snippets/gradient-mesh-hero/) layout, or swap the palette for a calmer duotone version behind a [glowing stars card](/ui-snippets/glowing-stars-card/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Five color blobs orbit and blend behind the hero content.` },
      { title: 'Note the CSS blur', text: `.cmg-canvas uses filter: blur(60px) — that's the actual softening.` },
      { title: 'Resize the window', text: `The canvas rescales at 60% resolution and keeps animating.` },
      { title: 'Add a blob', text: `Push a new object into BLOBS with its own home, orbit, and color.` },
      { title: 'Change the pace', text: `Lower every speed value for a slower, more ambient drift.` },
      { title: 'Adjust the blur amount', text: `Increase blur() for a softer, more diffuse mesh.` },
    ] },
    features: [
      { title: 'CSS-blurred canvas', text: `Sharp circles drawn in JS, softened by a compositor filter.` },
      { title: 'Deliberately low-res canvas', text: `60% resolution since the blur erases fine detail anyway.` },
      { title: 'Elliptical orbits', text: `Each blob drifts around its own home point, not randomly.` },
      { title: 'Independent periods', text: `Different speed and phase per blob avoids visible repetition.` },
      { title: 'Radial gradient blobs', text: `createRadialGradient fades each color to transparent.` },
      { title: 'Opaque base fill', text: `No transparent gaps between overlapping gradient edges.` },
      { title: 'Legible overlay text', text: `Content layer uses text-shadow to stay readable.` },
      { title: 'Zero dependencies', text: `Pure Canvas 2D, CSS filters, and vanilla JS.` },
    ],
    useCases: [
      { title: 'SaaS marketing heroes', text: 'Provide a trendy animated backdrop behind headline text, using sharp circles drawn in JavaScript and softened by a compositor blur filter.' },
      { title: 'Landing page sections', text: 'Pair with a [gradient mesh hero](/ui-snippets/gradient-mesh-hero/) layout elsewhere, with blobs orbiting elliptically around their own home points.' },
      { title: 'App onboarding backdrops', text: 'Give welcome screens a soft, colourful moving background, drawn at 60% resolution since the blur hides fine detail anyway.' },
      { title: 'Card and panel backgrounds', text: 'Place behind a [glowing stars card](/ui-snippets/glowing-stars-card/) for a layered, premium feel, with independent periods preventing visible repetition.' },
      { title: 'Looping presentation backgrounds', text: 'Capture frames for a pitch deck or video, since each blob moves with its own speed and phase for a long non-repeating cycle.' },
      { icon: 'CODE', title: 'Related: Canvas Star Trail Cursor', desc: 'See the [Canvas Star Trail Cursor](/ui-snippets/canvas-star-trail-cursor/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: SVG Liquid Text Wave', desc: 'See the [SVG Liquid Text Wave](/ui-snippets/svg-liquid-text-wave/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Where does the actual blur come from?', a: `The JavaScript never blurs anything — it draws plain, sharp radial gradient circles. The softening comes entirely from a single CSS filter, filter: blur(60px) saturate(1.3), applied to the canvas element itself in the stylesheet. That means the blur is handled by the browser's compositor, not by any per-pixel canvas code, which is both simpler and considerably cheaper than a manual convolution.` },
      { q: 'Why does resize() draw the canvas at only 60% of the wrapper size?', a: `A 60px CSS blur erases almost all fine detail regardless of how sharp the source pixels are, so drawing at full resolution would spend extra fill-rate cost every frame for a result that looks identical once blurred. Sizing the canvas backing store smaller than its displayed size and letting CSS scale it up (along with the blur) keeps the animation loop cheaper without any visible quality loss.` },
      { q: 'How do the blobs avoid ever looking like they repeat?', a: `Each blob orbits its own home position on an ellipse with its own independent speed and starting phase offset. Because no two blobs share a period, radius, or phase, their positions relative to each other drift continuously and take an extremely long time to realign into any previous configuration — long enough that a viewer never perceives a loop, even though the underlying motion is just combined sine and cosine waves.` },
      { q: 'Why fill the canvas with an opaque background color before drawing the blobs?', a: `Each blob's gradient fades from full color at its center to fully transparent (rgba(0,0,0,0)) at its edge. If the canvas were left transparent underneath, the areas between and around blobs would show through to whatever is behind the canvas rather than blending into a continuous color field. Painting an opaque base fill first guarantees every pixel has a solid color to blend against.` },
      { q: 'How do I use this canvas mesh gradient background in React, Vue, or Angular?', a: `Move the canvas ref, resize() call, and requestAnimationFrame loop into a mount effect, and cancelAnimationFrame the stored frame id on unmount. Keep the CSS blur filter on the canvas element's class, since that part of the effect lives entirely in CSS and needs no JavaScript wiring at all — only the drawing loop needs a lifecycle hook.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the actual softening comes from a CSS filter: blur() on the canvas element rather than any blur logic in the JavaScript, and why drawing the canvas at a reduced resolution before a heavy blur is applied is a reasonable performance optimization rather than a quality compromise. It's also a good example for reasoning about combined periodic motion — ask why giving each blob its own independent speed and phase offset in its orbit calculation prevents the mesh from ever visibly repeating, compared to what would happen if every blob shared the same speed. For extensions, ask it to add a subtle hue rotation over time using a CSS filter, tie the blur amount to scroll position for a focus/unfocus effect, or add a sixth blob that only becomes visible on hover over a specific section. It can also help you reason about the blur-and-downscale technique's tradeoffs versus a WebGL shader approach for the same visual result. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "canvas mesh gradient background" effect in plain HTML, CSS, and JavaScript using the Canvas 2D API plus a CSS blur filter — soft, orbiting color blobs blending into a smooth animated mesh, no libraries.

Requirements:
- A full-bleed canvas positioned absolutely behind centered hero content, styled in CSS with filter: blur(60px) saturate(1.3) (or similar) — the blur must come entirely from this CSS filter, not from any manual blur logic in JavaScript.
- Size the canvas's actual drawing backing store to a reduced fraction (e.g. 60%) of its displayed CSS size rather than 1:1 with the viewport, and explain in a comment why doing so is a valid optimization once a heavy blur filter is going to erase fine detail regardless of source resolution.
- Define an array of at least five "blob" objects, each with a home position (as a fraction of canvas width/height), an elliptical orbit radius (separate x and y amplitude), an independent animation speed, and a random phase offset, plus its own solid color. Every blob's speed and phase must differ from the others so their combined motion never visibly repeats.
- Each frame, first fill the canvas with an opaque solid background color (not transparent), then for every blob compute its current orbit position using cosine for x and sine for y (offset by its own speed and phase), and draw a createRadialGradient circle centered there that fades from the blob's full color at the center to fully transparent at its edge — drawn as sharp, unblurred circles, since the CSS filter handles the softening.
- Drive all blob positions from one requestAnimationFrame loop and a single shared time variable, and make sure the layout keeps real hero content (heading, paragraph, button) in front of the canvas in a separate non-blurred stacking layer with readable contrast (e.g. via text-shadow) against the busy moving background.`,
    },
  },
};

export default canvasMeshGradientBg;
