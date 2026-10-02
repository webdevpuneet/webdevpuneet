const colorMixer = {
  id: 'color-mixer',
  title: 'Color Mixer',
  lastmod: '2026-07-18',
  category: 'tools',
  html: `<div class="cm-card">
  <div class="cm-ends">
    <label class="cm-end"><span>From</span>
      <div class="cm-swatch"><input type="color" id="cmA" value="#6366f1"><input type="text" id="cmAHex" value="#6366F1" maxlength="7" spellcheck="false"></div>
    </label>
    <label class="cm-end"><span>To</span>
      <div class="cm-swatch"><input type="color" id="cmB" value="#22d3ee"><input type="text" id="cmBHex" value="#22D3EE" maxlength="7" spellcheck="false"></div>
    </label>
  </div>

  <label class="cm-steps">Steps <strong id="cmStepsVal">7</strong>
    <input type="range" id="cmSteps" min="3" max="11" step="1" value="7">
  </label>

  <div class="cm-scale" id="cmScale"></div>
  <code class="cm-css" id="cmCss"></code>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:36px 18px}

.cm-card{background:#1e293b;border:1px solid #334155;border-radius:18px;padding:18px;width:100%;max-width:400px}
.cm-ends{display:flex;gap:12px;margin-bottom:14px}
.cm-end{flex:1;display:flex;flex-direction:column;gap:6px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8}
.cm-swatch{display:flex;align-items:center;gap:8px;background:#0f172a;border:1px solid #334155;border-radius:10px;padding:6px 8px}
.cm-swatch input[type=color]{width:28px;height:28px;border:none;background:none;padding:0;cursor:pointer}
.cm-swatch input[type=text]{border:none;outline:none;background:none;font-size:13px;font-family:ui-monospace,monospace;width:100%;text-transform:uppercase;color:#e2e8f0}

.cm-steps{display:flex;align-items:center;gap:10px;font-size:12px;font-weight:700;color:#94a3b8;margin-bottom:14px}
.cm-steps strong{color:#e2e8f0;min-width:18px}
.cm-steps input{flex:1;accent-color:#6366f1}

.cm-scale{display:flex;border-radius:10px;overflow:hidden;height:64px;border:1px solid #334155}
.cm-cell{flex:1;position:relative;cursor:pointer;transition:flex .12s}
.cm-cell:hover{flex:1.4}
.cm-cell span{position:absolute;left:0;right:0;bottom:4px;text-align:center;font-size:9px;font-weight:700;font-family:ui-monospace,monospace;opacity:0;transition:opacity .12s}
.cm-cell:hover span{opacity:1}
.cm-copied{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#fff;background:rgba(0,0,0,.45)}

.cm-css{display:block;margin-top:12px;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:9px 12px;font-family:ui-monospace,monospace;font-size:11px;color:#7dd3fc;cursor:pointer;word-break:break-all;line-height:1.5}`,

  js: `function toRgb(hex) { return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]; }
function toHex(rgb) { return '#' + rgb.map(function (c) { return Math.round(c).toString(16).padStart(2,'0'); }).join('').toUpperCase(); }
function clampHex(v) { v = v.trim(); if (v[0] !== '#') v = '#' + v; if (/^#[0-9a-fA-F]{3}$/.test(v)) v = '#' + v[1]+v[1]+v[2]+v[2]+v[3]+v[3]; return /^#[0-9a-fA-F]{6}$/.test(v) ? v : null; }
function lum(rgb) { return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2]; }

var a = document.getElementById('cmA'), aHex = document.getElementById('cmAHex');
var b = document.getElementById('cmB'), bHex = document.getElementById('cmBHex');
var steps = document.getElementById('cmSteps'), stepsVal = document.getElementById('cmStepsVal');
var scale = document.getElementById('cmScale'), cssEl = document.getElementById('cmCss');

function mix(c1, c2, t) { return [c1[0]+(c2[0]-c1[0])*t, c1[1]+(c2[1]-c1[1])*t, c1[2]+(c2[2]-c1[2])*t]; }

function render() {
  var ca = toRgb(a.value), cb = toRgb(b.value);
  var n = parseInt(steps.value, 10);
  stepsVal.textContent = n;
  scale.innerHTML = '';
  var hexes = [];
  for (var i = 0; i < n; i++) {
    var t = n === 1 ? 0 : i / (n - 1);
    var rgb = mix(ca, cb, t);
    var hex = toHex(rgb);
    hexes.push(hex);
    var cell = document.createElement('div');
    cell.className = 'cm-cell';
    cell.style.background = hex;
    var label = document.createElement('span');
    label.textContent = hex;
    label.style.color = lum(rgb) > 140 ? '#0f172a' : '#fff';
    cell.appendChild(label);
    cell.addEventListener('click', function (hx, cl) {
      return function () {
        navigator.clipboard && navigator.clipboard.writeText(hx);
        var tag = document.createElement('div'); tag.className = 'cm-copied'; tag.textContent = 'Copied'; cl.appendChild(tag);
        setTimeout(function () { tag.remove(); }, 700);
      };
    }(hex, cell));
    scale.appendChild(cell);
  }
  cssEl.textContent = 'linear-gradient(90deg, ' + hexes.join(', ') + ')';
}

[a, b].forEach(function (inp) { inp.addEventListener('input', function () { (inp === a ? aHex : bHex).value = inp.value.toUpperCase(); render(); }); });
[aHex, bHex].forEach(function (inp) { inp.addEventListener('input', function () { var c = clampHex(inp.value); if (c) { (inp === aHex ? a : b).value = c; render(); } }); });
steps.addEventListener('input', render);
cssEl.addEventListener('click', function () { navigator.clipboard && navigator.clipboard.writeText(cssEl.textContent); });

render();`,

  seo: {
    title: 'Color Mixer — Blend Two Colors into a Swatch Scale',
    description: `A color mixer that blends two colors into a swatch scale, with adjustable steps, click-to-copy hex and a gradient. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Color Mixer — Interpolate a Swatch Scale Between Two Colors',
      description: `A color mixer blends two colors into an evenly-spaced scale of swatches — the quick way to build a gradient, generate tints between a brand pair, or pick a mid-point shade. This snippet interpolates the colors in the browser, lets you set how many steps to generate, and copies any swatch or the full gradient, in plain HTML, CSS, and vanilla JavaScript.

**Linear interpolation in RGB**

The mixer converts each end color from hex to RGB, then for each step computes a position \`t\` from 0 to 1 and linearly interpolates every channel: \`c1 + (c2 - c1) * t\`. With \`n\` steps the positions are spread \`i / (n - 1)\` so the first swatch is exactly the "from" color, the last is exactly the "to" color, and the rest are even blends. The result is rounded back to a hex string per swatch — straightforward, predictable color math with no library.

**Adjustable resolution**

A range slider sets the number of steps from 3 to 11, re-rendering the scale live. Three steps give you a from / mid / to triad; eleven give a smooth ramp you can pull individual tints from. This is handy for generating a tint scale for a design system (50→500→900) or for finding the precise middle color between two brand hues.

**Readable labels, click to copy**

Each swatch shows its hex on hover, and the label color flips between dark and light based on the swatch's luminance so it stays legible on both pale and dark blends. Clicking a swatch copies its hex to the clipboard with a brief "Copied" confirmation — so the mixer doubles as a palette picker, not just a preview.

**Dual input, kept in sync**

Both end colors have a native \`<input type="color">\` swatch and a hex field that stay in sync both ways: pick from the OS color picker and the hex updates, or type a hex (3- or 6-digit, with or without \`#\`) and the swatch follows. A small validator normalizes and ignores invalid input so the scale never breaks mid-typing.

**Gradient output**

Below the scale, the mixer prints a ready-to-use \`linear-gradient(90deg, …)\` built from the generated stops, and clicking it copies the whole declaration. That turns a two-color choice into a paste-ready CSS gradient or a discrete palette in one step. The pure interpolation helpers are easy to lift into a theme generator or design tool, making this a compact, dependency-free reference for blending colors.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mixer renders with two end colors and a generated swatch scale.` },
      { title: 'Choose two colors', text: `Use the swatch pickers or type hex values for the From and To colors.` },
      { title: 'Set the steps', text: `Drag the slider to generate 3–11 evenly-spaced blends.` },
      { title: 'Copy a swatch', text: `Hover to see its hex; click to copy it to the clipboard.` },
      { title: 'Grab the gradient', text: `Click the linear-gradient() string to copy a paste-ready CSS gradient.` },
      { title: 'Reuse the math', text: `Lift the mix/toHex helpers into a palette or theme generator.` },
    ] },
    features: [
      { title: 'RGB interpolation', text: `Even blends between two colors with exact endpoints.` },
      { title: 'Adjustable steps', text: `A slider sets 3–11 swatches, re-rendered live.` },
      { title: 'Click-to-copy swatches', text: `Each blend copies its hex with a Copied confirmation.` },
      { title: 'Luminance-aware labels', text: `Hex labels flip dark/light to stay readable on any swatch.` },
      { title: 'Swatch + hex sync', text: `Native pickers and hex fields stay in sync both ways.` },
      { title: 'Gradient output', text: `Generates a copyable linear-gradient() from the stops.` },
      { title: 'Hex normalisation', text: `Accepts #fff or #ffffff, with or without the hash.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no color library.` },
    ],
    useCases: [
      { title: 'Design system tint scales', text: 'Generate a series of shades between two brand colours, then check them with a [colour swatch](/ui-snippets/color-swatch/) in a design system.' },
      { title: 'Gradient stop discovery', text: 'Find stops for a hero or button, then apply them in a [gradient button](/ui-snippets/gradient-button/), choosing between 3 and 11 swatches.' },
      { title: 'Theme creation', text: 'Blend brand colours alongside a [theme palette generator](/ui-snippets/theme-palette-generator/), with each swatch copying its hex on click.' },
      { title: 'Data visualisation ramps', text: 'Create sequential colour scales for a [heatmap matrix](/ui-snippets/heatmap-matrix/), where exact endpoints keep the scale faithful to your two chosen colours.' },
      { title: 'Mid-point shade picking', text: 'Get the exact colour halfway between two values, with luminance-aware labels flipping dark or light to stay readable on every swatch.' },
      { icon: 'CODE', title: 'Related: OKLCH Color Picker & Playground', desc: 'See the [OKLCH Color Picker & Playground](/ui-snippets/css-oklch-color-picker/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the in-between colors calculated?', a: `Each end color is converted to RGB, then for every step the mixer computes a position t from 0 to 1 and linearly interpolates each channel as c1 + (c2 - c1) * t, rounding back to hex. Positions are spread as i / (n - 1), so the first and last swatches exactly match your two colors and the middle ones are even blends.` },
      { q: 'Why do some hex labels appear dark and others light?', a: `Each label's color is chosen from the swatch's luminance (a weighted sum of its RGB channels): light swatches get a dark label and dark swatches get a light one, so the hex text stays legible across the whole scale. It is the same readability idea behind contrast-aware text on colored backgrounds.` },
      { q: 'Does it interpolate in RGB or another color space?', a: `This version interpolates in sRGB, which is simple and predictable and fine for most UI gradients and tint scales. If you need perceptually even steps you can swap the mix function to interpolate in HSL, OKLCH, or LAB — the rest of the snippet (steps, copy, gradient output) stays the same because it only depends on getting a color per step.` },
      { q: 'Can I export the result as a CSS gradient?', a: `Yes. The mixer builds a linear-gradient(90deg, …) from the generated stops and shows it below the scale; click it to copy the full declaration. You can also click any individual swatch to copy its hex if you want discrete palette values rather than a gradient.` },
      { q: 'How do I use this color mixer in React, Vue, or Angular?', a: `Keep the toRgb, toHex, and mix helpers as plain functions and hold the two colors and step count in state. Compute the swatch array as derived state and render it, with click handlers that copy via the Clipboard API. Two-way bind the color and hex inputs to the same state. Tailwind users swap the classes for utilities; the interpolation logic is unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the interpolation math by hand to understand it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the step positions are computed as i divided by (n - 1) rather than i divided by n, and what would break at the endpoints if that changed. The same assistant can help you optimize it — for example asking whether rebuilding the entire swatch row and re-attaching click listeners on every slider move is necessary, or whether the DOM nodes could be reused instead. It is also a fast way to extend the mixer: ask it to add an option to interpolate through HSL or OKLCH instead of raw RGB for perceptually even steps, support three or more anchor colors instead of just two, or export the scale as CSS custom properties instead of a single gradient string. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a two-color mixer in plain HTML, CSS, and JavaScript that generates an evenly interpolated swatch scale — no color libraries.

Requirements:
- Two color inputs ("from" and "to"), each pairing a native input type="color" swatch with a synced hex text field accepting 3- or 6-digit hex with or without a leading hash.
- A range slider controlling the number of generated swatches (e.g. from 3 to 11 steps), re-rendering the scale live as it moves.
- A pure mix function that linearly interpolates each RGB channel independently between the two end colors at a position t, where t for step i is computed as i / (n - 1) so the first swatch exactly equals the "from" color and the last exactly equals the "to" color.
- Render each interpolated step as a swatch cell filling its background with the computed hex color, with a hex label that switches between a light and dark text color based on that swatch's own luminance so it stays legible on every step.
- Clicking any swatch must copy its hex code to the clipboard via the Clipboard API and show a brief "Copied" confirmation overlay that disappears after under a second.
- Below the scale, generate and display a ready-to-use CSS linear-gradient() string built from the same stops in order, and make clicking it copy the full declaration to the clipboard.
- Keep the hex/RGB conversion and interpolation functions pure and dependency-free so they could be reused in a separate palette-generation script.`,
    },
  },
};

export default colorMixer;
