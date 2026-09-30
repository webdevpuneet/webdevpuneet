const signaturePad = {
  id: 'signature-pad',
  title: 'Signature Pad',
  category: 'forms',
  description: 'Free signature pad HTML CSS JavaScript snippet. Canvas drawing surface with smoothed strokes via quadratic curves, pointer + touch support, undo stack, clear, and PNG download.',
  html: `<div class="demo">
  <div class="pad-card">
    <div class="pad-head">
      <span>Sign below</span>
      <div class="swatches">
        <button class="swatch active" data-color="#1f2937" style="--c:#1f2937" aria-label="Black ink"></button>
        <button class="swatch" data-color="#1d4ed8" style="--c:#1d4ed8" aria-label="Blue ink"></button>
        <button class="swatch" data-color="#dc2626" style="--c:#dc2626" aria-label="Red ink"></button>
      </div>
    </div>
    <canvas class="pad-canvas" width="480" height="220"></canvas>
    <div class="pad-line">Sign here</div>
    <div class="pad-actions">
      <button class="btn ghost" data-action="undo">Undo</button>
      <button class="btn ghost" data-action="clear">Clear</button>
      <button class="btn primary" data-action="save">Download PNG</button>
    </div>
  </div>
</div>`,
  css: `.demo {
  font-family: 'Segoe UI', system-ui, sans-serif;
  display: flex;
  justify-content: center;
  padding: 28px;
  background: #eef2f7;
}
.pad-card {
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 32px rgba(15,23,42,0.08);
  padding: 18px;
}
.pad-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #475569;
  margin-bottom: 10px;
  font-weight: 600;
}
.swatches {
  display: flex;
  gap: 8px;
}
.swatch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--c);
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
}
.swatch.active {
  border-color: #94a3b8;
  box-shadow: 0 0 0 2px #fff inset;
}
.pad-canvas {
  width: 100%;
  height: 220px;
  display: block;
  background: #fbfcfe;
  border: 1.5px dashed #cbd5e1;
  border-radius: 10px;
  cursor: crosshair;
  touch-action: none;
}
.pad-line {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 8px;
  letter-spacing: 1px;
}
.pad-actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  justify-content: flex-end;
}
.btn {
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.15s ease, background 0.2s ease;
}
.btn:active { transform: scale(0.96); }
.btn.ghost {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}
.btn.ghost:hover { background: #e2e8f0; }
.btn.primary {
  background: #4f46e5;
  color: #fff;
}
.btn.primary:hover { background: #4338ca; }`,
  js: `const canvas = document.querySelector('.pad-canvas');
const ctx = canvas.getContext('2d');
const swatches = document.querySelectorAll('.swatch');

const ratio = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * ratio || 480;
canvas.height = 220 * ratio;
ctx.scale(ratio, ratio);

let drawing = false;
let color = '#1f2937';
let strokes = [];
let current = null;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redraw() {
  clearCanvas();
  strokes.forEach((stroke) => {
    if (stroke.points.length < 2) return;
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let i = 1; i < stroke.points.length - 1; i++) {
      const mid = {
        x: (stroke.points[i].x + stroke.points[i + 1].x) / 2,
        y: (stroke.points[i].y + stroke.points[i + 1].y) / 2,
      };
      ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, mid.x, mid.y);
    }
    ctx.stroke();
  });
}

function pos(e) {
  const rect = canvas.getBoundingClientRect();
  const point = e.touches ? e.touches[0] : e;
  return { x: point.clientX - rect.left, y: point.clientY - rect.top };
}

function start(e) {
  drawing = true;
  current = { color, points: [pos(e)] };
  strokes.push(current);
}
function move(e) {
  if (!drawing) return;
  e.preventDefault();
  current.points.push(pos(e));
  redraw();
}
function end() {
  drawing = false;
  current = null;
}

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', move);
window.addEventListener('mouseup', end);
canvas.addEventListener('touchstart', start, { passive: true });
canvas.addEventListener('touchmove', move, { passive: false });
canvas.addEventListener('touchend', end);

swatches.forEach((sw) => {
  sw.addEventListener('click', () => {
    swatches.forEach((s) => s.classList.remove('active'));
    sw.classList.add('active');
    color = sw.dataset.color;
  });
});

document.querySelectorAll('[data-action]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    if (action === 'clear') {
      strokes = [];
      clearCanvas();
    } else if (action === 'undo') {
      strokes.pop();
      redraw();
    } else if (action === 'save') {
      const link = document.createElement('a');
      link.download = 'signature.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  });
});`,
  seo: {
    title: 'Signature Pad — Free HTML CSS JS Canvas Snippet',
    description: 'Canvas signature pad with smoothed strokes, touch support, undo, ink colours and PNG download. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How this signature pad was built — smoothed canvas strokes and a stroke-based undo stack',
      description: `This snippet recreates the "sign here" widget you find in contract tools, delivery confirmations, and onboarding forms — draw with a mouse or finger and the line comes out smooth, not jagged, with undo, clear, multiple ink colours, and a one-click PNG export. It runs on a single \`<canvas>\` and about 90 lines of vanilla JavaScript, with no signature library required.

**Smoothing strokes with quadratic curves**

The naive way to draw a freehand line is to connect every raw pointer position with straight \`lineTo\` segments — which looks visibly faceted at normal drawing speeds. Instead, this snippet stores each stroke as an array of points and redraws it with \`ctx.quadraticCurveTo()\`, using the *midpoint* between each pair of consecutive points as the curve's end coordinate and the point itself as the control point. That midpoint trick is the classic technique behind smooth freehand drawing — it threads a continuous curve through a series of raw samples so corners round off naturally, a related idea to the particle-trajectory smoothing you'll find in our [Floating Particles](/ui-snippets/floating-particles) snippet — both threading continuous motion through a series of raw, jittery samples.

**Strokes as data, not pixels — which makes undo trivial**

Rather than drawing directly onto the canvas and leaving permanent pixels behind, every pen-down starts a new \`{ color, points: [] }\` object pushed onto a \`strokes\` array, and a single \`redraw()\` function clears the canvas and replays every stroke from scratch on each pointer move. Because the drawing is *data-driven*, "Undo" is just \`strokes.pop()\` followed by a redraw — popping the most recent stroke off the array and re-rendering everything that's left. "Clear" is the same idea taken to its conclusion: empty the array, wipe the canvas. There's no pixel manipulation involved in either action, which keeps the code short and the behavior perfectly predictable.

**High-DPI canvas and unified pointer handling**

The canvas is sized using \`window.devicePixelRatio\`, scaling the drawing buffer up and calling \`ctx.scale(ratio, ratio)\` so strokes stay crisp on Retina and high-density mobile screens instead of looking soft and blurry. A small \`pos()\` helper normalizes \`mousedown\`/\`mousemove\` and \`touchstart\`/\`touchmove\` into the same \`{x, y}\` shape via \`getBoundingClientRect()\`, so the exact same \`start\`/\`move\`/\`end\` functions drive both desktop and touch input — paired with \`touch-action: none\` on the canvas so signing on a phone doesn't also scroll the page.

**Exporting as a PNG**

The "Download PNG" button is a one-liner: \`canvas.toDataURL('image/png')\` returns a base64-encoded image of the current canvas, which gets assigned to a temporary \`<a download>\` link and clicked programmatically — the same export pattern used by the [QR Code Generator](/ui-snippets/qr-code-generator) snippet. No server round-trip, no image-processing library — the browser does all the encoding.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Set up a high-DPI canvas', text: 'Multiply the canvas\'s width and height by `window.devicePixelRatio` and call `ctx.scale(ratio, ratio)` so strokes render crisply on Retina and high-density mobile displays instead of looking blurry.' },
        { title: 'Record strokes as point arrays, not pixels', text: 'On pointer-down, push a new `{ color, points: [pos(e)] }` object onto a `strokes` array. On every pointer-move, append the new position to `current.points` — the canvas never gets drawn on directly during input.' },
        { title: 'Smooth the line with quadraticCurveTo', text: 'In `redraw()`, walk each stroke\'s points and call `ctx.quadraticCurveTo(point, midpoint)` between consecutive samples — using the midpoint as the curve endpoint rounds off the line instead of leaving visible facets.' },
        { title: 'Make undo and clear pure array operations', text: 'Implement "Undo" as `strokes.pop()` followed by `redraw()`, and "Clear" as emptying the array and calling `ctx.clearRect()` — both actions stay perfectly in sync because the canvas always reflects exactly what is in `strokes`.' },
        { title: 'Wire ink colour swatches', text: 'Give each swatch button a `data-color` attribute; on click, toggle an `.active` class and update a shared `color` variable that gets assigned to new strokes as they start.' },
        { title: 'Export with toDataURL', text: 'On the download button\'s click handler, set a temporary `<a>` element\'s `href` to `canvas.toDataURL("image/png")` and its `download` attribute to a filename, then call `.click()` to trigger the browser\'s save dialog.' },
      ],
    },
    features: [
      'Quadratic-curve stroke smoothing — midpoint-based `quadraticCurveTo()` rendering turns raw pointer samples into a continuous, natural-looking line instead of a faceted polyline',
      'Strokes stored as data, not pixels — every pen stroke is an array of points, so a single `redraw()` function can rebuild the entire drawing from scratch after any change',
      'One-line undo and clear — `strokes.pop()` plus redraw removes the last stroke; emptying the array and clearing the canvas resets everything, both with zero pixel manipulation',
      'High-DPI canvas scaling — sizes the drawing buffer by `window.devicePixelRatio` so signatures stay sharp on Retina displays and modern phones instead of rendering soft',
      'Switchable ink colours — three swatch buttons update a shared `color` variable so new strokes pick up whichever ink is active, with an animated active-state ring',
      'Unified mouse + touch input — a single `pos()` helper normalizes both pointer families into canvas coordinates, with `touch-action: none` so signing on mobile does not scroll the page',
      'One-click PNG export — `canvas.toDataURL("image/png")` plus a programmatic `<a download>` click saves the finished signature as an image with no server or library involved',
    ],
    useCases: [
      { icon: 'WRITE', title: 'Contract, agreement, and consent forms', desc: 'Drop a signature pad into a rental agreement, NDA, waiver, or terms-acceptance flow — capture a real signature image instead of a typed name, and export it as a PNG to attach to the submitted record.' },
      { icon: 'SAFE', title: 'Delivery and service confirmations', desc: 'Use the canvas as a "sign on receipt" widget for courier, repair, or field-service apps — undo lets the signer fix a mistake without starting completely over, and the colour swatches suit different ink-style preferences.' },
      { icon: 'PEOPLE', title: 'Onboarding and profile personalization', desc: 'Let users draw a personal signature, monogram, or doodle as part of account setup — export it as a transparent-friendly PNG to use as an avatar flourish or email sign-off image.' },
      { icon: 'CODE', title: 'Learning canvas freehand drawing', desc: 'A compact, real-world example of the exact techniques — pointer normalization, stroke smoothing, and data-driven redraw — that underlie every drawing app, from simple sketch pads to full illustration tools.' },
      { icon: 'FLOW', title: 'A foundation for richer drawing tools', desc: 'Extend the `strokes` data model with variable line widths, eraser strokes, or a redo stack — because every action is just an array operation followed by a redraw, new features compose cleanly on top.' },
      { icon: 'LEARN', title: 'A reference for canvas-to-image export', desc: 'The `toDataURL()` + programmatic-download pattern here is the same one used by the [QR Code Generator](/ui-snippets/qr-code-generator) — copy it any time you need to let users save canvas content as an image file.' },
    ],
    faqs: [
      { q: 'How do I make freehand canvas drawing look smooth instead of jagged?', a: 'Avoid connecting raw pointer samples with straight `lineTo` segments — at normal drawing speed that produces a visibly faceted line. Instead, store each stroke as an array of points and render it with `ctx.quadraticCurveTo()`, using the midpoint between each consecutive pair of points as the curve\'s endpoint and the point itself as the control point. That threads a continuous curve through the samples and rounds off corners naturally — exactly what this signature pad does in its `redraw()` function.' },
      { q: 'How does undo work without keeping a history of canvas snapshots?', a: 'By treating each stroke as data rather than pixels. Every pen-down pushes a new `{ color, points: [] }` object onto a `strokes` array, and the canvas is always rebuilt from that array via a `redraw()` call. "Undo" is therefore just `strokes.pop()` (remove the most recent stroke) followed by a redraw — no pixel snapshots, no memory-heavy history stack, just one array operation.' },
      { q: 'Why does the canvas need to be scaled by devicePixelRatio?', a: 'On Retina and most modern phone screens, one CSS pixel maps to two or three physical device pixels. If the canvas\'s internal resolution matches only its CSS size, strokes render at a lower resolution than the screen and look soft or blurry. Multiplying the canvas\'s `width`/`height` by `window.devicePixelRatio` and calling `ctx.scale(ratio, ratio)` renders at full device resolution while keeping coordinates in familiar CSS-pixel units — so signatures stay crisp.' },
      { q: 'Does this signature pad work on touchscreens?', a: 'Yes — a `pos()` helper reads `e.touches?.[0] ?? e` so the same coordinate math drives both `mousemove` and `touchmove`. The canvas also sets `touch-action: none`, which prevents the browser from interpreting a finger drag as a page-scroll gesture, so signing on a phone or tablet feels natural rather than fighting the scroll.' },
      { q: 'How do I save the finished signature as an image file?', a: 'Call `canvas.toDataURL("image/png")`, which returns a base64-encoded PNG of the canvas\'s current contents. Assign that string to a temporary `<a>` element\'s `href`, set its `download` attribute to a filename like `signature.png`, and call `.click()` programmatically — the browser handles the save dialog with no server round-trip or image library required.' },
      { q: 'Can I use this signature pad snippet on my own site for free, including commercial projects?', a: 'Yes — copy the HTML, CSS, and JS with the buttons on this page and use them anywhere, including commercial products, with no attribution required. It is built entirely on the native Canvas 2D API and vanilla JavaScript, so there are no licensing terms or third-party dependencies to track.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the stroke-smoothing math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why quadraticCurveTo is called with the midpoint between consecutive points rather than the raw point itself, or why storing strokes as an array of point objects instead of drawing straight to the canvas is what makes undo a one-line operation. The same assistant can help optimize it, for instance checking whether redrawing every stroke from scratch on each pointermove becomes a bottleneck with very long signatures, or whether the devicePixelRatio scaling needs to account for window resizes. It is just as useful for extending the pad: ask it to add a redo stack alongside undo, support variable stroke width based on drawing speed, or export the signature as an SVG path instead of a PNG. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a canvas-based "signature pad" in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no signature library, no dependencies.

Requirements:
- A canvas element scaled for high-DPI screens: multiply its width and height by window.devicePixelRatio and call ctx.scale(ratio, ratio) so strokes render crisply on Retina and high-density mobile displays.
- Store drawing as data, not pixels: every pointer-down must start a new stroke object holding a color and an array of points, pushed onto a shared strokes array. Every pointer-move must append the current position to that stroke's points array — never draw directly to the canvas from a single move event.
- A single redraw function must clear the entire canvas and replay every stroke in the strokes array from scratch, smoothing each one with ctx.quadraticCurveTo, using the midpoint between each pair of consecutive points as the curve's endpoint and the point itself as the control point, so the line looks continuously curved instead of a faceted polyline of straight segments.
- Implement Undo as popping the most recently added stroke off the strokes array and calling redraw — no separate undo history or canvas snapshots. Implement Clear as emptying the strokes array and clearing the canvas.
- Normalize mouse and touch input through one helper function that returns the same {x, y} shape for both mousedown/mousemove and touchstart/touchmove, using getBoundingClientRect for coordinate translation, and set touch-action: none on the canvas so signing on a touchscreen does not also scroll the page.
- Support switchable ink colors via clickable swatch buttons that update a shared color variable used only when a new stroke begins.
- Add a "Download PNG" action that calls canvas.toDataURL("image/png") and triggers a programmatic download via a temporary anchor element — no server round-trip.`,
    },
  },
};

export default signaturePad;
