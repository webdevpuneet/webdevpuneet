const fabricJsSignaturePad = {
  id: 'fabric-js-signature-pad',
  title: 'Fabric.js Signature Pad',
  lastmod: '2026-09-17',
  category: 'forms',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/fabric@5.3.0/dist/fabric.min.js'],
  html: `<div class="fsp-stage">
  <div class="fsp-head">
    <span class="fsp-tag">Fabric.js · free drawing</span>
    <h2>Signature Pad</h2>
    <p>Sign below with mouse or touch. Adjust pen width and color, then export your signature as a PNG.</p>
  </div>
  <div class="fsp-pad">
    <canvas id="fspCanvas"></canvas>
    <div class="fsp-baseline"></div>
  </div>
  <div class="fsp-controls">
    <label class="fsp-field">
      <span>Pen width</span>
      <input type="range" id="fspWidth" min="1" max="10" value="3" />
    </label>
    <div class="fsp-colors" id="fspColors">
      <button class="fsp-swatch is-on" data-color="#1a1a2e" style="background:#1a1a2e"></button>
      <button class="fsp-swatch" data-color="#1e40af" style="background:#1e40af"></button>
      <button class="fsp-swatch" data-color="#7c2d12" style="background:#7c2d12"></button>
    </div>
    <div class="fsp-actions">
      <button class="fsp-btn fsp-btn-ghost" id="fspClear">Clear</button>
      <button class="fsp-btn" id="fspExport">Export as PNG</button>
    </div>
  </div>
  <img id="fspPreview" class="fsp-preview" alt="Exported signature preview" hidden />
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 100% at 50% 0%,#161d38,#080a14);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.fsp-stage{width:min(560px,94vw);display:flex;flex-direction:column;align-items:center;gap:16px}
.fsp-head{text-align:center}
.fsp-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#818cf8;background:rgba(129,140,248,.12);border:1px solid rgba(129,140,248,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.fsp-head h2{font-size:clamp(24px,5vw,34px);font-weight:800;letter-spacing:-.02em}
.fsp-head p{font-size:13.5px;color:#8e97b8;margin-top:7px}

.fsp-pad{position:relative;width:100%;border-radius:18px;overflow:hidden;background:#fdfcf8;border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px -24px rgba(0,0,0,.8)}
.fsp-baseline{position:absolute;left:8%;right:8%;bottom:28%;height:1px;background:repeating-linear-gradient(90deg,#c9c4b4,#c9c4b4 8px,transparent 8px,transparent 14px);pointer-events:none}

.fsp-controls{width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:16px;justify-content:space-between}
.fsp-field{display:flex;align-items:center;gap:9px;font-size:12.5px;color:#9aa3c4}
.fsp-field input{accent-color:#818cf8}
.fsp-colors{display:flex;gap:8px}
.fsp-swatch{width:24px;height:24px;border-radius:50%;border:2px solid transparent;cursor:pointer}
.fsp-swatch.is-on{border-color:#818cf8;box-shadow:0 0 0 2px rgba(129,140,248,.3)}
.fsp-actions{display:flex;gap:10px}
.fsp-btn{padding:9px 18px;border-radius:99px;border:1px solid rgba(129,140,248,.5);background:#818cf8;color:#0b0f22;font:700 12.5px system-ui;cursor:pointer;transition:transform .15s,background .18s}
.fsp-btn:hover{transform:translateY(-1px);background:#93a0fb}
.fsp-btn-ghost{background:rgba(255,255,255,.04);color:#c3cbe8;border-color:rgba(255,255,255,.14)}
.fsp-btn-ghost:hover{background:rgba(255,255,255,.09);color:#fff}

.fsp-preview{width:100%;border-radius:12px;background:#fff;padding:12px;border:1px solid rgba(255,255,255,.1)}`,

  js: `var canvas = new fabric.Canvas('fspCanvas', {
  width: 520,
  height: 260,
  backgroundColor: '#fdfcf8',
  isDrawingMode: true
});

// PencilBrush is Fabric's built-in freehand brush; assigning it explicitly
// (rather than relying on the default) makes width/color configuration
// straightforward and keeps the brush swappable later.
canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
canvas.freeDrawingBrush.width = 3;
canvas.freeDrawingBrush.color = '#1a1a2e';

document.getElementById('fspWidth').addEventListener('input', function (e) {
  canvas.freeDrawingBrush.width = parseInt(e.target.value, 10);
});

document.querySelectorAll('.fsp-swatch').forEach(function (swatch) {
  swatch.addEventListener('click', function () {
    document.querySelectorAll('.fsp-swatch').forEach(function (s) { s.classList.remove('is-on'); });
    swatch.classList.add('is-on');
    canvas.freeDrawingBrush.color = swatch.dataset.color;
  });
});

document.getElementById('fspClear').addEventListener('click', function () {
  canvas.clear();
  canvas.backgroundColor = '#fdfcf8';
  canvas.requestRenderAll();
  document.getElementById('fspPreview').hidden = true;
});

document.getElementById('fspExport').addEventListener('click', function () {
  // toDataURL rasterizes the current canvas contents (strokes + background)
  // at a given multiplier for higher-resolution export than the on-screen size.
  var dataUrl = canvas.toDataURL({
    format: 'png',
    quality: 1,
    multiplier: 2
  });
  var preview = document.getElementById('fspPreview');
  preview.src = dataUrl;
  preview.hidden = false;
});`,

  seo: {
    title: 'Fabric.js Signature Pad — Free-Drawing Canvas Export Snippet',
    description: 'A signature capture pad built on Fabric.js free-drawing mode with an adjustable PencilBrush, color swatches, a clear button, and a real PNG export via canvas.toDataURL. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Fabric.js Signature Pad — Free Drawing and Canvas Export Explained',
      description: `Capturing a signature looks simple — draw on a canvas, save the pixels — but doing it well means smooth freehand strokes, adjustable pen properties, and a reliable way to get the result back out as an image. **Fabric.js**'s drawing mode and \`toDataURL()\` handle all three without any manual pointer-event math.

## Turning a Fabric canvas into a drawing surface

Setting \`isDrawingMode: true\` on a \`fabric.Canvas\` switches it from an object-selection surface to a freehand drawing surface: pointer-down starts a stroke, pointer-move extends it, and pointer-up commits it as a \`fabric.Path\` object. Fabric handles the pointer-to-path conversion internally, smoothing the raw input points into a single SVG-style path rather than leaving you with a polyline of straight segments.

## Configuring the brush

\`canvas.freeDrawingBrush\` holds the active brush instance. This snippet explicitly assigns \`new fabric.PencilBrush(canvas)\` — Fabric's default freehand brush, which produces a single continuous stroke with a flat width — rather than relying on whatever the canvas defaulted to, so that \`width\` and \`color\` are guaranteed configurable properties on a known object:

\`canvas.freeDrawingBrush.width = 3;\`
\`canvas.freeDrawingBrush.color = '#1a1a2e';\`

Both properties are read fresh by the brush on every new stroke, so changing the range slider or clicking a color swatch mid-signature only affects strokes drawn *after* the change — already-committed paths keep their original width and color, which is the correct, expected behavior for a signature pad.

## Exporting as PNG

\`canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 })\` rasterizes the entire canvas — background color plus every drawn path — into a base64-encoded PNG data URL. The \`multiplier: 2\` option is the detail worth calling out: Fabric renders the export at **twice the on-screen resolution**, internally scaling the canvas up before rasterizing and back down after, so the exported signature stays crisp even if it's later displayed larger than the pad itself (for example, printed on a document). Without a multiplier, the export is pixel-for-pixel identical to the visible canvas size, which can look soft when scaled up.

## Clearing without losing the drawing surface

\`canvas.clear()\` removes every \`Path\` object Fabric has committed, but it also resets \`backgroundColor\` to Fabric's own default (transparent), which is why the clear handler explicitly re-sets \`canvas.backgroundColor\` afterward — otherwise the pad would turn transparent instead of returning to its paper tone.

## Why a canvas-based pad beats raw \`<canvas>\` pointer code

Rolling this by hand means listening to \`pointerdown\`/\`pointermove\`/\`pointerup\`, buffering points, and drawing smoothed curves yourself — solvable, but Fabric's \`PencilBrush\` already does point-smoothing, and because strokes become real \`Path\` objects, you get undo (\`canvas.remove()\` on the last path), per-stroke styling, and JSON serialization for free, none of which raw canvas drawing gives you without extra code.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Fabric.js CDN', text: 'Include fabric.min.js from the CDN panel — it attaches a global fabric object.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A ready-to-sign pad renders with a guide baseline.' },
      { title: 'Sign with mouse or touch', text: 'isDrawingMode routes pointer input straight into smoothed Path strokes.' },
      { title: 'Adjust pen width and color', text: 'The slider and swatches update freeDrawingBrush live for new strokes.' },
      { title: 'Clear the pad', text: 'canvas.clear() wipes all strokes; the background color is re-applied after.' },
      { title: 'Export as PNG', text: 'toDataURL with multiplier: 2 renders a crisp, higher-resolution image preview.' },
    ] },
    features: [
      { title: 'Free-drawing mode', text: 'isDrawingMode: true turns pointer input into smoothed Path strokes automatically.' },
      { title: 'Configurable PencilBrush', text: 'Width and color are live properties read fresh on every new stroke.' },
      { title: 'Multi-color signing', text: 'Swatch buttons swap freeDrawingBrush.color without affecting past strokes.' },
      { title: 'High-resolution export', text: 'toDataURL multiplier: 2 rasterizes at double the on-screen resolution.' },
      { title: 'Clean clear behavior', text: 'clear() plus an explicit backgroundColor reset keeps the paper tone.' },
      { title: 'Guide baseline', text: 'A dashed CSS line hints where to sign without being part of the canvas.' },
      { title: 'Touch-ready by default', text: 'Fabric\\u2019s pointer handling works with mouse, pen, and touch input alike.' },
      { title: 'Real exportable image', text: 'The export button produces an actual PNG data URL, previewed inline.' },
    ],
    useCases: [
      { title: 'Contract and consent signing', text: 'Capture a legal or consent signature with smooth freehand strokes, using Fabric\'s free-drawing mode and a configurable `PencilBrush`.' },
      { title: 'Delivery sign-off pads', text: 'Provide a recipient sign-off for a courier app, with colour swatches and a Clear button for another attempt.' },
      { title: 'Quick sketch capture', text: 'Offer a minimal freehand input for annotations, where brush width and colour are read fresh at the start of every new stroke.' },
      { title: 'Canvas export learning', text: 'Learn how `toDataURL` with a multiplier of 2 rasterises a high-resolution PNG, doubling the on-screen resolution for crisp output.' },
      { title: 'Kiosk and tablet check-in', text: 'Support touch-friendly signing for in-person visits at a front desk, with multi-colour signing handled by swapping `freeDrawingBrush.color` only.' },
    ],
    faqs: [
      { q: 'Why assign a new PencilBrush instead of using the canvas default?', a: 'Fabric does create a default free-drawing brush automatically, but explicitly constructing new fabric.PencilBrush(canvas) guarantees the brush type and gives an unambiguous, documented object to set width and color on, which keeps the code portable across Fabric versions.' },
      { q: 'Does changing the pen width affect strokes already drawn?', a: 'No. freeDrawingBrush.width and .color are read when a new stroke begins, and each committed stroke becomes its own fabric.Path object with its own fixed styling, so past strokes are unaffected by later changes to the brush.' },
      { q: 'Why does toDataURL use multiplier: 2?', a: 'multiplier scales the rendered export resolution relative to the canvas\\u2019s on-screen size. At 1 (the default) the export is pixel-for-pixel identical to the visible canvas, which can look soft if the image is later displayed larger. multiplier: 2 renders at double resolution for a crisper result.' },
      { q: 'Why re-set backgroundColor after canvas.clear()?', a: 'clear() removes every canvas object AND resets background-related properties to Fabric\\u2019s defaults, which is transparent. The clear handler explicitly re-applies the paper background color afterward so the pad does not turn transparent.' },
      { q: 'How would I detect whether anything was actually signed?', a: 'Check canvas.getObjects().length after drawing stops \\u2014 free drawing commits each stroke as a Path object added to the canvas\\u2019s object list, so zero objects means nothing was signed yet.' },
      { q: 'Can I get the signature as an SVG instead of a PNG?', a: 'Yes \\u2014 call canvas.toSVG() instead of toDataURL(). Because each stroke is already a Path object, Fabric serializes it as a real SVG <path> with an exact d attribute rather than rasterizing pixels.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is small enough that the interesting questions are about export fidelity, not drawing mechanics. Paste the code into an AI assistant like Claude and ask it to explain exactly what canvas.toDataURL's multiplier option does internally \\u2014 how Fabric scales the canvas up, rasterizes, and scales back down \\u2014 and why that produces a crisper result than exporting at multiplier: 1 and upscaling the image afterward with CSS. Then ask how you'd detect an empty signature (hint: canvas.getObjects().length) to validate a form before submission. To extend it: add an SVG export path alongside the PNG one via canvas.toSVG(), add an undo button that pops the last object with canvas.remove(canvas.getObjects().slice(-1)[0]), support pressure-sensitive width on stylus input, or send the exported data URL to a backend endpoint as part of a real form submission.`,
      prompt: `Build a signature capture pad using Fabric.js (v5, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- A fabric.Canvas with isDrawingMode: true so pointer/touch input draws smoothed freehand strokes automatically, with a light paper-colored background and a subtle dashed baseline guide drawn in CSS (not on the canvas) hinting where to sign.
- Explicitly assign canvas.freeDrawingBrush = new fabric.PencilBrush(canvas) and set an initial width and color on it.
- A range slider that updates freeDrawingBrush.width live, and 3 color swatch buttons that update freeDrawingBrush.color live \\u2014 changes should only affect strokes drawn after the change, not strokes already committed.
- A "Clear" button that calls canvas.clear() and then explicitly re-applies the background color afterward (since clear() resets it).
- An "Export as PNG" button that calls canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 }) to get a higher-resolution PNG data URL than the on-screen canvas size, and displays the result in a visible <img> preview below the pad.
- Style it as a clean light signing card inside a dark page shell, with the controls (width slider, color swatches, clear/export buttons) laid out in a row beneath the pad.`,
    },
  },
};

export default fabricJsSignaturePad;
