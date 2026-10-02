const canvasImagePixelateReveal = {
  id: 'canvas-image-pixelate-reveal',
  title: 'Canvas Pixelate Image Reveal',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<section class="pxr-wrap">
  <span class="pxr-tag">canvas 2d · intersectionobserver</span>
  <h1>Pixelate reveal</h1>
  <p>Scroll the card into view, or hover it, to sharpen from a tiny mosaic to full detail.</p>

  <div class="pxr-grid">
    <div class="pxr-card" data-seed="1">
      <canvas class="pxr-canvas"></canvas>
      <span class="pxr-label">Aurora</span>
    </div>
    <div class="pxr-card" data-seed="2">
      <canvas class="pxr-canvas"></canvas>
      <span class="pxr-label">Ember</span>
    </div>
    <div class="pxr-card" data-seed="3">
      <canvas class="pxr-canvas"></canvas>
      <span class="pxr-label">Tidepool</span>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07070d;color:#fff;min-height:100vh;padding:60px 20px}
.pxr-wrap{max-width:920px;margin:0 auto;text-align:center}
.pxr-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fca5a5;background:rgba(252,165,165,.1);border:1px solid rgba(252,165,165,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.pxr-wrap h1{font-size:clamp(28px,6vw,42px);font-weight:800;letter-spacing:-.03em}
.pxr-wrap p{font-size:14px;color:#b3aab8;margin-top:8px}
.pxr-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-top:36px}
.pxr-card{position:relative;aspect-ratio:4/3;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1);cursor:pointer}
.pxr-canvas{display:block;width:100%;height:100%}
.pxr-label{position:absolute;left:14px;bottom:12px;font-size:14px;font-weight:700;text-shadow:0 2px 10px rgba(0,0,0,.7)}`,

  js: `var cards = document.querySelectorAll('.pxr-card');

var PALETTES = [
  ['#7c3aed', '#f472b6', '#22d3ee'],
  ['#f97316', '#facc15', '#ef4444'],
  ['#0ea5e9', '#22c55e', '#a3e635']
];

function paintSource(sctx, w, h, seedIndex) {
  var colors = PALETTES[seedIndex % PALETTES.length];
  var grad = sctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(0.55, colors[1]);
  grad.addColorStop(1, colors[2]);
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, w, h);

  sctx.globalAlpha = 0.85;
  for (var i = 0; i < 5; i++) {
    sctx.beginPath();
    var r = (0.12 + Math.random() * 0.22) * Math.min(w, h);
    var cx = Math.random() * w;
    var cy = Math.random() * h;
    sctx.fillStyle = colors[(i + 1) % colors.length];
    sctx.arc(cx, cy, r, 0, Math.PI * 2);
    sctx.fill();
  }
  sctx.globalAlpha = 1;
}

function setupCard(card, seedIndex) {
  var canvas = card.querySelector('.pxr-canvas');
  var ctx = canvas.getContext('2d');
  var W = 320, H = 240;
  canvas.width = W;
  canvas.height = H;

  // Render the "full detail" source once at native resolution into an
  // offscreen canvas — this never gets redrawn small, so quality never
  // degrades across repeated reveals.
  var src = document.createElement('canvas');
  src.width = W; src.height = H;
  var sctx = src.getContext('2d');
  paintSource(sctx, W, H, seedIndex);

  var MIN_CELLS = 6;   // heavily pixelated
  var MAX_CELLS = 96;  // effectively full detail
  var current = MIN_CELLS;
  var target = MIN_CELLS;
  var raf = null;

  // Downscale the source to a tiny cells-wide canvas, then draw that tiny
  // canvas back up to full size with image smoothing disabled — the browser's
  // own nearest-neighbor upscale is what produces crisp pixel blocks.
  function drawAtResolution(cells) {
    var tiny = document.createElement('canvas');
    tiny.width = cells;
    tiny.height = Math.max(1, Math.round(cells * (H / W)));
    var tctx = tiny.getContext('2d');
    tctx.imageSmoothingEnabled = true;
    tctx.drawImage(src, 0, 0, tiny.width, tiny.height);

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(tiny, 0, 0, tiny.width, tiny.height, 0, 0, W, H);
  }

  function animate() {
    current += (target - current) * 0.12;
    if (Math.abs(target - current) < 0.4) current = target;
    drawAtResolution(Math.round(current));
    if (current !== target) {
      raf = requestAnimationFrame(animate);
    } else {
      raf = null;
    }
  }

  function reveal() {
    target = MAX_CELLS;
    if (!raf) raf = requestAnimationFrame(animate);
  }
  function hide() {
    target = MIN_CELLS;
    if (!raf) raf = requestAnimationFrame(animate);
  }

  drawAtResolution(MIN_CELLS);

  card.addEventListener('mouseenter', reveal);
  card.addEventListener('mouseleave', hide);
  card.addEventListener('touchstart', reveal, { passive: true });

  return { reveal: reveal, hide: hide };
}

var controllers = [];
cards.forEach(function (card, i) {
  controllers.push({ el: card, ctrl: setupCard(card, i) });
});

// Also reveal automatically the first time each card scrolls into view, so
// the effect works on scroll-triggered pages without requiring hover.
if ('IntersectionObserver' in window) {
  var seen = new WeakSet();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        var match = controllers.find(function (c) { return c.el === entry.target; });
        if (match) match.ctrl.reveal();
      }
    });
  }, { threshold: 0.4 });
  controllers.forEach(function (c) { io.observe(c.el); });
}`,

  seo: {
    title: 'Canvas Pixelate Image Reveal — Free Scroll/Hover Sharpen Effect',
    description: `A pixelated-to-sharp image reveal: a tiny downscaled canvas is upscaled with image smoothing disabled, then progressively sharpened on scroll-into-view or hover. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Pixelate Image Reveal — From Mosaic to Full Detail',
      description: `The pixelate reveal is the "developing photograph" effect: a card starts as a chunky, low-resolution mosaic and sharpens smoothly into full detail as it scrolls into view or is hovered. The whole trick lives in two canvas properties — drawing at a tiny resolution, then reading that tiny canvas back at full size with \`imageSmoothingEnabled = false\`.

**Why downscale-then-upscale produces pixel blocks**

\`drawAtResolution(cells)\` first draws the full-detail source image onto a tiny offscreen canvas only \`cells\` pixels wide — at \`cells = 6\`, an entire 320px-wide card is represented by six columns of pixels. That tiny canvas is then drawn back onto the visible canvas at full size. With \`ctx.imageSmoothingEnabled = false\` on the destination context, the browser's own scaling algorithm switches from bilinear interpolation to nearest-neighbor, so each of those six source pixels becomes one crisp, hard-edged block rather than a blurry smear. Toggling that single boolean is the entire difference between a "pixelated" look and a "blurry" one.

**A source that's never redrawn small**

The full-detail image is painted once, at native resolution, onto its own offscreen \`src\` canvas via \`paintSource()\` (a gradient plus a few soft circular blooms, since there's no external image to load). Every reveal frame downsamples fresh from that same source — it's never progressively degraded by repeatedly scaling an already-scaled canvas, which is what keeps the "full detail" end state actually sharp instead of soft after a few reveal cycles.

**Easing resolution instead of jumping to it**

Rather than snapping straight from 6 cells to 96, \`animate()\` eases \`current\` toward a \`target\` cell count with \`current += (target - current) * 0.12\` every frame — the same simple spring-like approach used for numeric tweens throughout this library. Because \`cells\` is rounded before each redraw, the visible result is a smooth, discrete step-up in resolution rather than a single hard cut, which reads as "sharpening" instead of "swapping images."

**Two triggers, one animation function**

Both \`card.addEventListener('mouseenter', reveal)\` and an \`IntersectionObserver\` calling the same \`reveal()\` on first scroll-into-view drive the identical animation path — there's no duplicated logic for "reveal by hover" versus "reveal by scroll." The observer uses a \`WeakSet\` to reveal each card only once on its first appearance, while hover continues to work afterward via \`mouseleave\` re-pixelating and \`mouseenter\` re-sharpening.

**Extending it**

Swap \`paintSource\` for a real \`ctx.drawImage(yourImg, 0, 0, W, H)\` once an image has loaded; tie \`target\`'s cell count to scroll progress instead of a boolean for a scrubbable reveal; or pair the technique with [image blur-up](/ui-snippets/image-blur-up/) for a hybrid loading placeholder, or [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for the surrounding entrance choreography.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three cards render heavily pixelated on load.` },
      { title: 'Scroll them into view', text: `Each sharpens once automatically via IntersectionObserver.` },
      { title: 'Hover a card', text: `It sharpens further; move away and it re-pixelates.` },
      { title: 'Watch the easing', text: `Resolution steps up smoothly, not in one jump.` },
      { title: 'Swap the source', text: `Replace paintSource with ctx.drawImage(yourImg, 0, 0, W, H).` },
      { title: 'Tune the range', text: `Change MIN_CELLS and MAX_CELLS for a coarser or finer effect.` },
    ] },
    features: [
      { title: 'Nearest-neighbor upscale', text: `imageSmoothingEnabled = false produces crisp pixel blocks.` },
      { title: 'Fresh downsample per frame', text: `Always samples the untouched full-detail source.` },
      { title: 'Eased resolution steps', text: `A spring-like tween, not a hard resolution jump.` },
      { title: 'Dual trigger, one code path', text: `Scroll-into-view and hover call the same reveal function.` },
      { title: 'Once-per-card auto reveal', text: `A WeakSet ensures the scroll trigger fires only once.` },
      { title: 'Re-pixelates on mouse leave', text: `Hover is fully reversible, not one-directional.` },
      { title: 'Procedural source art', text: `No external image needed — gradient plus soft blooms.` },
      { title: 'Touch-friendly', text: `touchstart also triggers the reveal on mobile.` },
    ],
    useCases: [
      { title: 'Portfolio and gallery grids', text: 'Pair with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) so images sharpen from chunky blocks as each row scrolls into view.' },
      { title: 'Product image reveals', text: 'Sharpen a product shot on scroll, upscaling a tiny canvas with `imageSmoothingEnabled = false` for crisp, deliberate pixel blocks.' },
      { title: 'Stylised loading placeholders', text: 'Provide a bolder alternative to an [image blur-up](/ui-snippets/image-blur-up/), stepping resolution up with an eased spring-like tween.' },
      { title: 'Project cards with intrigue', text: 'Add mystery before a case study opens, resampling the untouched full-detail source on every frame for a clean result.' },
      { title: 'Developing-photo hover effects', text: 'Sharpen on hover for a tactile editorial layout, as scroll and hover both call the same reveal function.' },
      { icon: 'CODE', title: 'Related: Canvas Snow Overlay', desc: 'See the [Canvas Snow Overlay](/ui-snippets/canvas-snow-overlay/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Status Icon Morph — Spinner to Check/Cross', desc: 'See the [Status Icon Morph — Spinner to Check/Cross](/ui-snippets/status-icon-morph-spinner-check/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What actually produces the pixelated look?', a: `The source image is first drawn onto a tiny offscreen canvas only a handful of pixels wide, then that tiny canvas is drawn back onto the visible canvas at full size with the destination context's imageSmoothingEnabled set to false. That single property switches the browser's scaling from smooth bilinear interpolation to nearest-neighbor, so each source pixel becomes one crisp, hard-edged block instead of a blurry gradient — which is the difference between "pixelated" and simply "blurry."` },
      { q: 'Why is the source image drawn on its own separate offscreen canvas?', a: `Keeping a single untouched, full-detail source canvas means every reveal frame downsamples fresh from that original rather than repeatedly scaling an already-scaled canvas. If the code instead progressively resized the same visible canvas in place, quality would degrade with each cycle and the "full detail" end state would end up soft after a few reveals; sampling from a pristine source avoids that entirely.` },
      { q: 'Why does resolution ease in smoothly instead of jumping straight to full detail?', a: `animate() moves a current cell-count value toward a target value by a fixed fraction of the remaining distance each frame (current += (target - current) * 0.12), the same simple spring-like tween used elsewhere in this library. Because that value is rounded and redrawn every frame, the card visibly steps up through several intermediate pixelation levels, which reads as "sharpening" rather than a single abrupt image swap.` },
      { q: 'How do the scroll and hover triggers avoid duplicated logic?', a: `Both triggers call the exact same reveal() function, which just changes the target cell count and kicks off the shared animate() loop if it is not already running. The IntersectionObserver additionally tracks which cards have already been revealed in a WeakSet so the scroll trigger only fires once per card, while mouseenter and mouseleave continue to call reveal() and hide() freely afterward for a fully reversible hover interaction.` },
      { q: 'Can I use a real photo instead of the procedural gradient art?', a: `Yes — replace the body of paintSource with sctx.drawImage(yourLoadedImageElement, 0, 0, W, H) once the image has finished loading (listen for its load event, or use an already-decoded Image object). Everything downstream, including the downscale/upscale pixelation and the scroll/hover triggers, works unchanged because it only ever reads pixels from the src offscreen canvas.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting imageSmoothingEnabled to false on the destination canvas is what turns an upscaled tiny image into crisp pixel blocks instead of a blurry smear, and why the code always downsamples fresh from an untouched source canvas rather than repeatedly resizing the same visible canvas in place. It's also useful for reasoning about the easing — ask how changing the 0.12 interpolation factor in animate() would affect how quickly a card sharpens, and whether a duration-based tween (easing over a fixed number of milliseconds) would behave more predictably across different frame rates than the current per-frame-fraction approach. For extensions, ask it to wire in a real image via drawImage once loaded, tie the target cell count to scroll progress within the viewport for a scrubbable reveal instead of a boolean trigger, or add a subtle chromatic-aberration offset at low resolutions for a glitchier look. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "canvas pixelate image reveal" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API — a card that starts heavily pixelated and sharpens on scroll-into-view or hover, no external image required and no libraries.

Requirements:
- Since there is no external image to load, paint a procedural "source image" once at native resolution onto its own separate offscreen canvas (a gradient plus a few soft filled circles is enough) — this source canvas must never be redrawn or resized in place; every reveal step should re-sample from this same pristine source.
- Implement a function that renders the card at a given "resolution" by first drawing the source canvas down onto a tiny intermediate canvas only N pixels wide (N being the current resolution, as low as ~6), then drawing that tiny canvas back onto the visible destination canvas at full display size with the destination context's imageSmoothingEnabled explicitly set to false, so the upscale uses nearest-neighbor scaling and produces visible hard-edged pixel blocks rather than a blur.
- Animate the resolution value smoothly from a low starting value (heavily pixelated) up to a high target value (effectively full detail) using a simple per-frame easing approach — interpolate the current value toward a target by a fixed fraction of the remaining distance each animation frame, round it, and redraw — rather than jumping directly to the final resolution in one step.
- Trigger the reveal both on hover (mouseenter sharpens, mouseleave re-pixelates back down, so it is fully reversible) and automatically the first time each card scrolls into the viewport using an IntersectionObserver, with both triggers calling the same shared reveal function/animation path rather than duplicating logic — track which cards have already auto-revealed (e.g. with a WeakSet) so the scroll trigger only fires once per card.
- Build this for a grid of at least 3 cards, each with a different procedurally generated color scheme, and support touch by also triggering the reveal on touchstart.`,
    },
  },
};

export default canvasImagePixelateReveal;
