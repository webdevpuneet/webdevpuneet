const gradientPicker = {
  id: 'gradient-picker',
  title: 'Gradient Picker',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="gp-card">
  <div class="gp-preview" id="gpPreview"></div>
  <div class="gp-bar" id="gpBar">
    <div class="gp-stops" id="gpStops"></div>
  </div>
  <div class="gp-row">
    <label class="gp-angle">Angle <strong id="gpAngVal">90°</strong>
      <input type="range" id="gpAngle" min="0" max="360" value="90">
    </label>
    <input type="color" id="gpColor" value="#6366f1" aria-label="Stop color">
    <button type="button" class="gp-del" id="gpDel" title="Delete stop">Delete</button>
  </div>
  <code class="gp-css" id="gpCss"></code>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:32px 18px}

.gp-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:16px;width:100%;max-width:380px}
.gp-preview{height:120px;border-radius:12px;border:1px solid #334155;margin-bottom:14px}
.gp-bar{position:relative;height:26px;border-radius:7px;margin-bottom:14px;cursor:copy;border:1px solid #334155;background-image:linear-gradient(45deg,#334155 25%,transparent 25%),linear-gradient(-45deg,#334155 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#334155 75%),linear-gradient(-45deg,transparent 75%,#334155 75%);background-size:10px 10px;background-position:0 0,0 5px,5px -5px,-5px 0}
.gp-stops{position:absolute;inset:0;border-radius:6px}
.gp-stop{position:absolute;top:50%;width:16px;height:16px;border-radius:50%;border:2px solid #fff;transform:translate(-50%,-50%);cursor:grab;box-shadow:0 1px 4px rgba(0,0,0,.5)}
.gp-stop.is-sel{outline:2px solid #fff;outline-offset:2px}
.gp-stop:active{cursor:grabbing}

.gp-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.gp-angle{flex:1;font-size:11.5px;font-weight:700;color:#94a3b8;display:flex;flex-direction:column;gap:4px}
.gp-angle strong{color:#e2e8f0}
.gp-angle input{accent-color:#6366f1}
.gp-row input[type=color]{width:34px;height:30px;border:none;background:none;padding:0;cursor:pointer}
.gp-del{background:#0f172a;border:1px solid #334155;color:#f87171;border-radius:8px;padding:6px 10px;font-size:11.5px;font-weight:700;cursor:pointer;font-family:inherit}
.gp-del:hover{border-color:#ef4444}

.gp-css{display:block;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:9px 12px;font-family:ui-monospace,monospace;font-size:11px;color:#7dd3fc;cursor:pointer;word-break:break-all;line-height:1.5}`,

  js: `var stops = [ { pos:0, color:'#6366f1' }, { pos:100, color:'#22d3ee' } ];
var angle = 90, selected = 0;
var bar = document.getElementById('gpBar');
var stopsWrap = document.getElementById('gpStops');
var preview = document.getElementById('gpPreview');
var cssEl = document.getElementById('gpCss');
var colorInput = document.getElementById('gpColor');
var angleInput = document.getElementById('gpAngle');
var angleVal = document.getElementById('gpAngVal');

function cssGradient(forBar) {
  var sorted = stops.slice().sort(function (a, b) { return a.pos - b.pos; });
  var list = sorted.map(function (s) { return s.color + ' ' + Math.round(s.pos) + '%'; }).join(', ');
  return 'linear-gradient(' + (forBar ? '90deg' : angle + 'deg') + ', ' + list + ')';
}

function render() {
  preview.style.background = cssGradient(false);
  stopsWrap.style.background = cssGradient(true);
  stopsWrap.innerHTML = '';
  stops.forEach(function (s, i) {
    var el = document.createElement('div');
    el.className = 'gp-stop' + (i === selected ? ' is-sel' : '');
    el.style.left = s.pos + '%';
    el.style.background = s.color;
    el.addEventListener('pointerdown', function (e) { e.stopPropagation(); selected = i; colorInput.value = s.color; drag(i, e); render(); });
    stopsWrap.appendChild(el);
  });
  cssEl.textContent = 'background: ' + cssGradient(false) + ';';
  colorInput.value = stops[selected].color;
}

function posFromX(clientX) {
  var r = bar.getBoundingClientRect();
  return Math.max(0, Math.min(100, (clientX - r.left) / r.width * 100));
}
function drag(i, startEvt) {
  function mv(e) { stops[i].pos = posFromX(e.clientX); render(); }
  function up() { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); }
  document.addEventListener('pointermove', mv);
  document.addEventListener('pointerup', up);
}

bar.addEventListener('click', function (e) {
  if (e.target.classList.contains('gp-stop')) return;
  stops.push({ pos: posFromX(e.clientX), color: stops[selected].color });
  selected = stops.length - 1;
  render();
});
colorInput.addEventListener('input', function () { stops[selected].color = colorInput.value; render(); });
angleInput.addEventListener('input', function () { angle = parseInt(angleInput.value, 10); angleVal.textContent = angle + '\\u00b0'; render(); });
document.getElementById('gpDel').addEventListener('click', function () { if (stops.length > 2) { stops.splice(selected, 1); selected = 0; render(); } });
cssEl.addEventListener('click', function () { navigator.clipboard && navigator.clipboard.writeText(cssEl.textContent); });

render();`,

  seo: {
    title: 'Gradient Picker — CSS Linear Gradient Builder',
    description: `A CSS gradient picker: drag color stops on a bar, set the angle, add/remove stops and copy the linear-gradient. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Gradient Picker — Draggable Color Stops and Angle to CSS',
      description: `A gradient picker lets you build a CSS \`linear-gradient\` visually — drag colour stops along a bar, pick each stop's colour, set the angle, and copy the result. It's the core of any theme editor or design tool's gradient control. This snippet builds a complete one with draggable stops, click-to-add, delete, and live output, in plain HTML, CSS, and vanilla JavaScript.

**Stops as data, rendered to a bar**

The gradient is an array of \`{ pos, color }\` stops. The editor renders a preview, a gradient bar (always shown at 90° so the stop positions map directly to the bar's left-to-right axis regardless of the chosen output angle), and a draggable handle per stop. Sorting the stops by position when building the CSS means you can drag stops past each other freely without breaking the output.

**Drag, add, and delete**

Dragging a handle updates its position live via Pointer Events with document-level tracking (so the drag continues outside the bar). Clicking an empty part of the bar adds a new stop there, inheriting the selected colour, and a delete button removes the selected stop (keeping a minimum of two). The selected stop is highlighted and bound to the colour input, so picking a colour recolours exactly the handle you're working on.

**Angle and live CSS**

A range slider sets the gradient angle (0–360°) for the output, shown live on the preview while the editing bar stays horizontal for predictable stop placement. The generated \`background: linear-gradient(…)\` string updates on every change and is one click to copy — paste-ready CSS, no manual typing of percentages.

**A checkerboard for transparency**

The bar sits on a CSS checkerboard so semi-transparent stops read correctly (if you extend it to support alpha), the same affordance every colour tool uses. The preview shows the real angled gradient as it will appear in your UI.

**Self-contained and portable**

The whole picker is the stops array, a render function, and pointer handlers, with no dependencies. Swap the initial stops, restyle the handles, or wire the output into your theme state — it's a clean reference for the gradient-editor pattern that design tools and CSS generators are built around.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A gradient picker renders with two stops and a preview.` },
      { title: 'Drag the stops', text: `Move handles along the bar to reposition colors.` },
      { title: 'Add and recolor', text: `Click the bar to add a stop; use the color input to recolor the selected one.` },
      { title: 'Set the angle', text: `Drag the angle slider to rotate the gradient.` },
      { title: 'Delete a stop', text: `Remove the selected stop (a minimum of two remain).` },
      { title: 'Copy the CSS', text: `Click the output to copy the linear-gradient declaration.` },
    ] },
    features: [
      { title: 'Draggable stops', text: `Pointer-dragged handles with document-level tracking.` },
      { title: 'Click to add', text: `Clicking the bar inserts a stop at that position.` },
      { title: 'Selected-stop color', text: `The color input edits exactly the chosen handle.` },
      { title: 'Delete stops', text: `Remove a stop while keeping at least two.` },
      { title: 'Angle control', text: `A slider sets the output gradient angle 0–360°.` },
      { title: 'Live CSS output', text: `Copyable linear-gradient string updates instantly.` },
      { title: 'Position-sorted', text: `Stops sort by position so dragging past each other works.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no color or gradient dependency.` },
    ],
    useCases: [
      { title: 'Theme editor gradients', text: 'Author gradients for buttons and hero sections by dragging colour stops along a bar and copying the finished `linear-gradient`.' },
      { title: 'Design tool controls', text: 'Embed a gradient control in a builder, where clicking the bar adds a stop and deleting keeps at least two in place.' },
      { title: 'Hero background design', text: 'Craft the base for a [gradient mesh hero](/ui-snippets/gradient-mesh-hero/), choosing an angle and stop positions visually first.' },
      { title: 'Button and badge styling', text: 'Generate gradients for a [gradient button](/ui-snippets/gradient-button/), with the colour input editing exactly the stop currently selected.' },
      { title: 'Blending and brand palettes', text: 'Define shared brand gradients, and use a [color mixer](/ui-snippets/color-mixer/) to find intermediate shades between two stop colours.' },
      { icon: 'CODE', title: 'Related: Price Range Slider', desc: 'See the [Price Range Slider](/ui-snippets/price-range-slider/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the editing bar always horizontal even when I change the angle?', a: `The bar represents stop positions from 0% to 100% along the gradient line, which is one-dimensional regardless of angle. Keeping the bar at 90° (horizontal) means a handle's left position maps directly to its percentage, so dragging is predictable. The angle only affects the output and the preview, where the real rotated gradient is shown — separating editing axis from display angle is how gradient tools stay usable.` },
      { q: 'How do I add or remove color stops?', a: `Click an empty part of the gradient bar to add a stop at that position (it inherits the currently selected color), and use the delete button to remove the selected stop. A minimum of two stops is enforced because a gradient needs at least two colors. The selected stop is highlighted and bound to the color input so recoloring affects the right handle.` },
      { q: 'Can stops cross over each other?', a: `Yes. You can drag any stop past another freely; when building the CSS the stops are sorted by position, so the output is always valid even if the array order does not match the visual order. This lets you reorder colors by dragging without any special handling.` },
      { q: 'How do I get the gradient into my project?', a: `The picker outputs a ready-to-paste declaration like background: linear-gradient(90deg, #6366f1 0%, #22d3ee 100%); and clicking it copies it to the clipboard. You can paste that into CSS, a style attribute, or a CSS-in-JS value. To bind it to app state instead, read the stops array and angle and build the string yourself.` },
      { q: 'How do I use this gradient picker in React, Vue, or Angular?', a: `Hold the stops array, angle, and selected index in state and render the bar, handles, preview, and CSS string from them. Move the pointer drag into handlers that update state (attach window listeners in an effect and clean them up). Emit the gradient string via a callback or v-model so a parent theme store can consume it. Tailwind users swap the classes for utilities.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the drag math yourself, feed this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain why the editing bar's cssGradient call is hardcoded to 90 degrees while the preview uses the angle variable, and how that separation keeps the stop percentages meaningful regardless of the chosen output angle. The same assistant can help optimize it — ask whether rebuilding the entire stopsWrap innerHTML on every pointermove during a drag is wasteful compared to just repositioning the dragged handle's own style.left, especially with many stops. It's also useful for extending the tool: ask it to add support for radial gradients alongside linear, add an alpha channel with a checkerboard-aware color input, or let users type a raw CSS gradient string and parse it back into the stops array. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a draggable CSS linear-gradient picker in plain HTML, CSS, and vanilla JavaScript, no color-picker library, using the Pointer Events API for dragging.

Requirements:
- Maintain gradient state as an array of stop objects, each with a position percentage (0-100) and a hex color string, plus a separate numeric angle value (0-360) for the output gradient's direction.
- Render a preview element whose background is the real gradient at the chosen angle, and a separate editing bar whose background is always rendered at a fixed 90 degrees regardless of the chosen output angle, so a stop's horizontal position on the bar always maps directly to its percentage.
- Each stop must render as a small circular handle positioned with left equal to its percentage, draggable via pointerdown starting a document-level pointermove/pointerup listener pair (not just listeners on the handle itself, so the drag continues even if the pointer leaves the handle), computing the new position by clamping (clientX - barLeft) / barWidth * 100 between 0 and 100.
- Clicking an empty part of the bar (not an existing handle) must insert a new stop at that position, inheriting the currently selected stop's color, and select the new stop.
- A color input must always reflect and edit the currently selected stop's color, and a delete button must remove the selected stop but refuse to go below two stops.
- Before building the final CSS string, sort the stops by position so stops can be dragged past each other without producing invalid or reordered gradient syntax.
- Display the generated linear-gradient CSS declaration as text, and copy it to the clipboard when clicked.`,
    },
  },
};

export default gradientPicker;
