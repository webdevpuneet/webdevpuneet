const canvasAsciiArtConverter = {
  id: 'canvas-ascii-art-converter',
  title: 'Canvas ASCII Art Converter',
  lastmod: '2026-08-21',
  category: 'tools',
  cdnUrls: [],
  html: `<section class="aac-wrap">
  <span class="aac-tag">canvas 2d · pixel sampling</span>
  <h1>ASCII render</h1>
  <p>A generated scene, sampled pixel by pixel and redrawn as characters.</p>

  <div class="aac-stage">
    <canvas class="aac-canvas" id="aacCanvas" width="640" height="400"></canvas>
  </div>

  <div class="aac-controls">
    <label class="aac-slider-row">
      <span>Detail</span>
      <input type="range" id="aacDetail" min="4" max="16" value="9" step="1" />
      <span class="aac-slider-val" id="aacDetailVal">9px cells</span>
    </label>
    <label class="aac-slider-row">
      <span>Ramp</span>
      <select id="aacRamp">
        <option value="0">Standard · " .:-=+*#%@"</option>
        <option value="1">Blocks · " ░▒▓█"</option>
        <option value="2">Binary · " 01"</option>
      </select>
    </label>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#111a14,#05070a 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.aac-wrap{width:100%;max-width:720px;text-align:center}
.aac-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4ade80;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.aac-wrap h1{font-size:clamp(28px,6vw,40px);font-weight:800;letter-spacing:-.03em}
.aac-wrap p{font-size:14px;color:#8fa396;margin-top:8px;line-height:1.6}
.aac-stage{margin:26px 0 18px;border-radius:16px;overflow:hidden;border:1px solid rgba(74,222,128,.22);background:#030504;box-shadow:0 24px 60px -30px rgba(0,0,0,.8)}
.aac-canvas{display:block;width:100%;height:auto}
.aac-controls{display:flex;flex-wrap:wrap;gap:18px;justify-content:center;align-items:center;font-size:12.5px;color:#a9baae}
.aac-slider-row{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:8px 14px;border-radius:10px}
.aac-slider-row input[type="range"]{accent-color:#4ade80;width:120px}
.aac-slider-row select{background:#0b120e;color:#e6f5ea;border:1px solid rgba(255,255,255,.14);border-radius:6px;padding:4px 6px;font-size:12px}
.aac-slider-val{min-width:70px;text-align:left;color:#4ade80;font-family:ui-monospace,SFMono-Regular,monospace}`,

  js: `var canvas = document.getElementById('aacCanvas');
var ctx = canvas.getContext('2d');
var W = canvas.width, H = canvas.height;

// Offscreen canvas holds the "source image" — since we can't load an external
// asset in a sandboxed snippet, one is painted procedurally: a gradient sky,
// a glowing sun disc, and a jagged mountain silhouette. That gives the ASCII
// sampler real light-to-dark structure to work with.
var src = document.createElement('canvas');
src.width = W; src.height = H;
var sctx = src.getContext('2d');

function paintSourceImage() {
  var sky = sctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#0a2a1f');
  sky.addColorStop(1, '#020403');
  sctx.fillStyle = sky;
  sctx.fillRect(0, 0, W, H);

  var sun = sctx.createRadialGradient(W * 0.68, H * 0.32, 6, W * 0.68, H * 0.32, 150);
  sun.addColorStop(0, '#ffffff');
  sun.addColorStop(0.4, '#bdf0c8');
  sun.addColorStop(1, 'rgba(189,240,200,0)');
  sctx.fillStyle = sun;
  sctx.fillRect(0, 0, W, H);

  sctx.beginPath();
  sctx.moveTo(0, H);
  var peaks = 7;
  for (var i = 0; i <= peaks; i++) {
    var x = (W / peaks) * i;
    var y = H * 0.55 + Math.sin(i * 1.7) * 60 + (i % 2 === 0 ? -40 : 20);
    sctx.lineTo(x, y);
  }
  sctx.lineTo(W, H);
  sctx.closePath();
  sctx.fillStyle = '#040a06';
  sctx.fill();

  for (var s = 0; s < 40; s++) {
    var sx = Math.random() * W;
    var sy = Math.random() * H * 0.5;
    var r = Math.random() * 1.6;
    sctx.fillStyle = 'rgba(255,255,255,' + (0.2 + Math.random() * 0.6) + ')';
    sctx.beginPath();
    sctx.arc(sx, sy, r, 0, Math.PI * 2);
    sctx.fill();
  }
}
paintSourceImage();

var RAMPS = [
  ' .:-=+*#%@',
  ' ░▒▓█',
  ' 01'
];

var detailInput = document.getElementById('aacDetail');
var detailVal = document.getElementById('aacDetailVal');
var rampSelect = document.getElementById('aacRamp');

function render() {
  var cell = parseInt(detailInput.value, 10);
  var ramp = RAMPS[parseInt(rampSelect.value, 10)];
  detailVal.textContent = cell + 'px cells';

  var data = sctx.getImageData(0, 0, W, H).data;

  ctx.fillStyle = '#030504';
  ctx.fillRect(0, 0, W, H);
  ctx.font = (cell * 1.15).toFixed(1) + 'px ui-monospace, SFMono-Regular, monospace';
  ctx.textBaseline = 'top';

  for (var y = 0; y < H; y += cell) {
    for (var x = 0; x < W; x += cell) {
      var idx = (y * W + x) * 4;
      var r = data[idx], g = data[idx + 1], b = data[idx + 2];
      var brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      var charIndex = Math.min(ramp.length - 1, Math.floor(brightness * (ramp.length - 1)));
      var ch = ramp[charIndex];
      if (ch === ' ') continue;

      var alpha = 0.35 + brightness * 0.65;
      ctx.fillStyle = 'rgba(120,240,160,' + alpha.toFixed(2) + ')';
      ctx.fillText(ch, x, y);
    }
  }
}

render();
detailInput.addEventListener('input', render);
rampSelect.addEventListener('change', render);

// Re-paint the source with fresh stars every few seconds so the ASCII output
// has a subtle live quality without needing a real video feed.
setInterval(function () {
  paintSourceImage();
  render();
}, 4000);`,

  seo: {
    title: 'Canvas ASCII Art Converter — Free Live Pixel-to-Character Demo',
    description: `An image rendered as live ASCII art: canvas pixel data is sampled cell by cell and mapped to characters by brightness, with a density slider and swappable character ramps. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas ASCII Art Converter — Sampling Pixels Into Characters',
      description: `ASCII art conversion is the classic canvas exercise that never gets old: take an image, read its pixel brightness in a grid, and swap every cell for a character whose visual weight matches that brightness. This snippet builds the whole pipeline from scratch with the 2D canvas API — no image upload, no external asset, and no library — by first painting a procedural "source image" onto an offscreen canvas and then sampling it.

**A source image with nothing to load**

Because a sandboxed snippet has nowhere reliable to host a photo, \`paintSourceImage()\` draws one instead: a vertical sky gradient, a radial-gradient sun with real falloff, a jagged mountain silhouette built from a sine-perturbed polygon, and a scatter of star dots. The point isn't the scene itself — it's that the source has genuine light-to-dark range for the sampler to react to, the same way a real photo would.

**Sampling with getImageData**

\`sctx.getImageData(0, 0, W, H).data\` returns a flat array of RGBA bytes, four per pixel. The render loop walks the canvas in \`cell\`-sized steps, looks up the pixel at each cell's top-left corner, and converts it to brightness with the standard luminance weighting \`r * 0.299 + g * 0.587 + b * 0.114\`. That single formula is doing the real work: it accounts for the eye being more sensitive to green than red or blue, so the resulting brightness value tracks perceived lightness rather than raw pixel average.

**Mapping brightness to a character ramp**

Each ramp — from \`" .:-=+*#%@"\` for a classic terminal look to block glyphs or plain binary — is ordered from visually lightest to densest. \`Math.floor(brightness * (ramp.length - 1))\` picks an index along that ramp, so bright pixels become sparse punctuation and dark pixels become dense glyphs (or vice versa, depending on which end you treat as "ink"). The character is then drawn with \`ctx.fillText\` directly at the cell's coordinates, so the ASCII output lives entirely on the same canvas — no overlaid \`<pre>\` block, no HTML text nodes to keep in sync.

**Density as a live control**

The detail slider changes \`cell\` — the sampling and glyph size — from 4px (fine detail, more characters, closer to the source image) up to 16px (chunky, poster-like). Because \`render()\` re-samples and redraws from scratch on every change, dragging the slider gives instant, correct feedback rather than an approximation. The ramp selector swaps the character set entirely, which changes not just the look but the perceived contrast, since block glyphs read as much denser at the same brightness threshold than punctuation does.

**Extending it**

Swap the procedural source for a real \`<img>\` drawn with \`ctx.drawImage\` (still same-origin or CORS-enabled) to convert actual photos; add color by keeping the sampled RGB instead of forcing green; or drive the source from a live video element for a real-time ASCII webcam feed. Pair it with a [matrix rain](/ui-snippets/matrix-rain/) background for a retro terminal page, or a [noise background](/ui-snippets/noise-background/) for a grittier texture layer underneath.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A procedural scene renders as green ASCII characters on load.` },
      { title: 'Drag the Detail slider', text: `Cell size (and glyph size) changes; the canvas re-samples instantly.` },
      { title: 'Switch the Ramp', text: `Choose punctuation, block glyphs, or binary — contrast changes with it.` },
      { title: 'Watch it refresh', text: `The source scene repaints every few seconds with new stars.` },
      { title: 'Swap the source', text: `Replace paintSourceImage with ctx.drawImage(yourImg, 0, 0).` },
      { title: 'Add color', text: `Use the sampled r/g/b directly instead of a fixed green tint.` },
    ] },
    features: [
      { title: 'Procedural source image', text: `No external asset — a gradient scene is painted on load.` },
      { title: 'Real pixel sampling', text: `getImageData reads actual RGBA bytes per cell.` },
      { title: 'Luminance-weighted brightness', text: `Standard 0.299/0.587/0.114 formula, not a flat average.` },
      { title: 'Swappable character ramps', text: `Punctuation, block glyphs, or binary, chosen live.` },
      { title: 'Live density slider', text: `Cell size from 4px to 16px, re-sampled on every change.` },
      { title: 'Single-canvas output', text: `Characters draw with fillText — no overlay DOM needed.` },
      { title: 'Auto-refreshing scene', text: `Source repaints every few seconds for subtle motion.` },
      { title: 'Framework-agnostic', text: `Pure Canvas 2D and vanilla JS, no dependencies.` },
    ],
    useCases: [
      { title: 'Developer portfolio heroes', text: 'Open a terminal-flavoured intro with live ASCII art, sampling pixels cell by cell and mapping brightness to characters.' },
      { title: 'Retro and hacker-themed pages', text: 'Layer over a [noise background](/ui-snippets/noise-background/) or alongside [matrix rain](/ui-snippets/matrix-rain/) for a coherent retro terminal aesthetic on hacker-themed pages.' },
      { title: 'Image upload previews', text: 'Swap the generated source for an uploaded image element, using the standard 0.299, 0.587 and 0.114 luminance weights for accurate brightness.' },
      { title: 'Empty and loading placeholders', text: 'Show an ASCII placeholder while real media loads, with a density slider changing how many characters represent the image.' },
      { title: 'Webcam art filters', text: 'Feed video frames into the same sampling loop for a live ASCII camera, choosing punctuation, block glyph or binary ramps on the fly.' },
      { icon: 'CODE', title: 'Related: Canvas Rainbow Mouse Trail', desc: 'See the [Canvas Rainbow Mouse Trail](/ui-snippets/canvas-mouse-trail-rainbow/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Layout Switcher Container Morph', desc: 'See the [Layout Switcher Container Morph](/ui-snippets/layout-switcher-container-morph/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the source image drawn on canvas instead of loaded from a file?', a: `A self-contained snippet has no reliable place to host or fetch an external photo, and doing so would break the "no dependencies" constraint. paintSourceImage draws a gradient sky, a radial sun, a jagged mountain silhouette and stars directly with canvas primitives, which gives getImageData genuine brightness variation to sample without needing any asset to load.` },
      { q: 'How does brightness get converted into a character?', a: `Each sampled pixel's red, green and blue values are combined with the luminance formula r*0.299 + g*0.587 + b*0.114, which weights green highest to match human perception. That 0-255 value is normalized to 0-1 and used to index into the current character ramp, so darker pixels pick characters further along the ramp toward its densest glyph.` },
      { q: 'Can I convert a real photo instead of the generated scene?', a: `Yes. Replace the body of paintSourceImage with sctx.drawImage(yourImageElement, 0, 0, W, H) once the image has loaded (listen for its load event, or use an already-decoded Image). Everything downstream — sampling, the ramp mapping, and the render loop — works unchanged because it only reads pixel data from the offscreen canvas.` },
      { q: 'Why does dragging the slider redraw instantly instead of lagging?', a: `render() re-samples and redraws the entire canvas from scratch on every input event rather than incrementally patching it, and at these resolutions (a few hundred cells) that full pass is cheap for the 2D canvas API. There is no accumulated state to get out of sync, so every slider position is always drawn correctly rather than approximated.` },
      { q: 'How would I add color to the ASCII output?', a: `Instead of forcing a fixed green rgba() fill for every character, use the sampled r, g and b values directly — for example ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')' before the fillText call. The brightness-to-character mapping stays the same; only the fill color changes, which turns the effect from a monochrome terminal look into a full ASCII-mosaic version of the source image.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why the luminance formula weights green highest when converting a pixel to a single brightness value, and how getImageData's flat RGBA byte array maps back to an (x, y) coordinate for each sampled cell. The same assistant is useful for extending the effect: ask it to wire up a real img or video element as the source via drawImage instead of the procedural scene, add a color mode that keeps each cell's sampled RGB instead of a fixed tint, or add a "invert ramp" toggle so bright areas render dense instead of sparse. It can also help you reason about performance — ask whether reading getImageData once per render versus once per cell matters at this scale, and how the approach would need to change to sample a live video feed at 30fps instead of a static or slowly-changing canvas. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live "canvas ASCII art converter" in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no image upload and no external asset.

Requirements:
- Since there is no external image to load, paint a procedural "source image" onto an offscreen canvas using canvas primitives: a gradient background, at least one radial-gradient glow, a filled polygon silhouette, and some scattered dot detail — enough to produce real brightness variation across the frame.
- Sample that offscreen canvas with getImageData once per render, and for each grid cell of a configurable pixel size, read the RGBA values at that cell's top-left pixel and convert them to a single brightness value using the standard luminance weighting (roughly 0.299 red, 0.587 green, 0.114 blue), not a flat average of the three channels.
- Map the normalized 0-1 brightness to an index into a string "ramp" of characters ordered from visually sparse to visually dense (e.g. " .:-=+*#%@"), and draw the resulting character directly onto the visible canvas at the cell's coordinates with fillText, skipping cells that map to a blank/space character.
- Provide a range input that controls the cell size (roughly 4px to 16px), and a select dropdown offering at least two alternate character ramps (for example block-shading glyphs and a binary 0/1 ramp). Both controls should trigger a full re-sample and redraw immediately on change.
- Style it as a dark terminal-like panel with a monospace font for the glyphs, and re-paint the procedural source every few seconds (new random star positions, for example) on a timer so the output has subtle ongoing life even without user interaction.`,
    },
  },
};

export default canvasAsciiArtConverter;
