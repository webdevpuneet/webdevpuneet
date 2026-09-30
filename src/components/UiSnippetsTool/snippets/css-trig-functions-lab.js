const cssTrigFunctionsLab = {
  id: 'css-trig-functions-lab',
  title: 'CSS Trig Functions Lab (sin, cos, clamp)',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="lab">
  <div class="orbit-stage">
    <div class="orbit-ring"></div>
    <div class="orbit-center"></div>
    <div class="satellite" id="satellite-1" style="--i: 0; --count: 6;"></div>
    <div class="satellite" id="satellite-2" style="--i: 1; --count: 6;"></div>
    <div class="satellite" id="satellite-3" style="--i: 2; --count: 6;"></div>
    <div class="satellite" id="satellite-4" style="--i: 3; --count: 6;"></div>
    <div class="satellite" id="satellite-5" style="--i: 4; --count: 6;"></div>
    <div class="satellite" id="satellite-6" style="--i: 5; --count: 6;"></div>
    <div class="tracker" id="tracker"></div>
  </div>

  <div class="controls">
    <div class="control-row">
      <label for="angle-slider">Angle <span id="angle-value">0deg</span></label>
      <input type="range" id="angle-slider" min="0" max="360" value="0" step="1">
    </div>
    <div class="control-row">
      <label for="radius-slider">Orbit radius <span id="radius-value">110px</span></label>
      <input type="range" id="radius-slider" min="50" max="150" value="110" step="1">
    </div>
    <label class="checkbox-row">
      <input type="checkbox" id="auto-rotate" checked>
      Auto-rotate tracker
    </label>

    <div class="code-readout">
      <p class="readout-label">Live computed CSS</p>
      <pre id="code-output">--angle: 0deg;
left: calc(50% + cos(var(--angle)) * 110px);
top:  calc(50% + sin(var(--angle)) * 110px);</pre>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.lab { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; justify-content: center; padding: 32px 20px; min-height: 100vh; }

.orbit-stage {
  position: relative;
  width: 320px; height: 320px;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 32px rgba(15,23,42,0.06);
  flex-shrink: 0;
}

.orbit-ring {
  position: absolute; top: 50%; left: 50%;
  width: calc(var(--radius, 110px) * 2);
  height: calc(var(--radius, 110px) * 2);
  transform: translate(-50%, -50%);
  border: 1.5px dashed #c7d2fe;
  border-radius: 50%;
  transition: width 0.15s, height 0.15s;
}

.orbit-center {
  position: absolute; top: 50%; left: 50%;
  width: 14px; height: 14px;
  transform: translate(-50%, -50%);
  background: #1e293b;
  border-radius: 50%;
}

.satellite {
  --angle: calc((360deg / var(--count)) * var(--i));
  --radius: 110px;
  position: absolute; top: 50%; left: 50%;
  width: 12px; height: 12px;
  margin: -6px;
  border-radius: 50%;
  background: #a5b4fc;
  transform: translate(
    calc(cos(var(--angle)) * var(--radius)),
    calc(sin(var(--angle)) * var(--radius))
  );
  transition: transform 0.15s;
}

.tracker {
  --angle: 0deg;
  --radius: 110px;
  position: absolute; top: 50%; left: 50%;
  width: 22px; height: 22px;
  margin: -11px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 4px 14px rgba(99,102,241,0.5);
  transform: translate(
    calc(cos(var(--angle)) * var(--radius)),
    calc(sin(var(--angle)) * var(--radius))
  );
}

.controls {
  width: 320px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 22px;
  display: flex; flex-direction: column; gap: 18px;
}

.control-row { display: flex; flex-direction: column; gap: 8px; }
.control-row label { font-size: 13px; font-weight: 600; color: #334155; display: flex; justify-content: space-between; }
.control-row label span { color: #6366f1; font-weight: 700; font-variant-numeric: tabular-nums; }
.control-row input[type="range"] { width: 100%; accent-color: #6366f1; }

.checkbox-row { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; }
.checkbox-row input { accent-color: #6366f1; width: 16px; height: 16px; }

.code-readout {
  background: #0f172a;
  border-radius: 10px;
  padding: 14px 16px;
}
.readout-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #818cf8; margin-bottom: 8px; }
.code-readout pre {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 11.5px; line-height: 1.7;
  color: #e2e8f0;
  white-space: pre-wrap;
  word-break: break-word;
}`,

  js: `const angleSlider = document.getElementById('angle-slider');
const radiusSlider = document.getElementById('radius-slider');
const angleValue = document.getElementById('angle-value');
const radiusValue = document.getElementById('radius-value');
const autoRotate = document.getElementById('auto-rotate');
const tracker = document.getElementById('tracker');
const ring = document.getElementById('tracker') && document.querySelector('.orbit-ring');
const codeOutput = document.getElementById('code-output');

let angle = 0;
let radius = 110;
let rafId = null;

function updateCode() {
  codeOutput.textContent =
    '--angle: ' + Math.round(angle) + 'deg;\\n' +
    'left: calc(50% + cos(var(--angle)) * ' + radius + 'px);\\n' +
    'top:  calc(50% + sin(var(--angle)) * ' + radius + 'px);';
}

function applyAngle(a) {
  angle = a;
  angleSlider.value = a;
  angleValue.textContent = Math.round(a) + 'deg';
  tracker.style.setProperty('--angle', a + 'deg');
  updateCode();
}

function applyRadius(r) {
  radius = r;
  radiusValue.textContent = r + 'px';
  tracker.style.setProperty('--radius', r + 'px');
  document.querySelectorAll('.satellite').forEach(s => s.style.setProperty('--radius', r + 'px'));
  document.querySelector('.orbit-ring').style.setProperty('--radius', r + 'px');
  updateCode();
}

angleSlider.addEventListener('input', e => {
  autoRotate.checked = false;
  stopAutoRotate();
  applyAngle(Number(e.target.value));
});

radiusSlider.addEventListener('input', e => {
  applyRadius(Number(e.target.value));
});

autoRotate.addEventListener('change', () => {
  if (autoRotate.checked) startAutoRotate();
  else stopAutoRotate();
});

function startAutoRotate() {
  let last = performance.now();
  function tick(now) {
    const dt = now - last;
    last = now;
    angle = (angle + dt * 0.05) % 360;
    applyAngle(angle);
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);
}

function stopAutoRotate() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

applyAngle(0);
applyRadius(110);
startAutoRotate();`,

  seo: {
    title: 'CSS Trig Functions Lab: sin(), cos() & calc() — Free Snippet',
    description: 'Interactive lab for native CSS sin(), cos() and calc() trig functions driving circular motion with no JavaScript math. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS Trigonometric Functions Lab — sin(), cos(), calc() and Custom Properties for Circular Motion',
      description: `For years, positioning an element on a circle — an orbiting dot, a radial menu, a clock hand, a gauge needle — required JavaScript. You'd compute \`x = cx + r * Math.cos(angle)\` and \`y = cy + r * Math.sin(angle)\` in a script and write the result into inline styles or a \`transform\`. CSS Values and Units Module Level 4 changes that by adding native trigonometric functions directly to the language: \`sin()\`, \`cos()\`, \`tan()\`, \`asin()\`, \`acos()\`, \`atan()\`, and \`atan2()\`. This lab demonstrates the two most useful ones, \`cos()\` and \`sin()\`, driving real circular motion with zero JavaScript trigonometry.

**How the math maps to CSS**

Every satellite dot in the orbit uses a \`transform: translate(...)\` built from three ingredients: an angle custom property, a radius custom property, and the trig functions themselves. The core expression is \`translate(calc(cos(var(--angle)) * var(--radius)), calc(sin(var(--angle)) * var(--radius)))\`. This is the exact same parametric circle equation you'd write in a canvas or SVG script — \`x = r·cos(θ)\`, \`y = r·sin(θ)\` — except it lives entirely in a CSS custom property and gets recalculated by the browser's layout engine whenever \`--angle\` or \`--radius\` changes. Critically, CSS trig functions accept an angle with a unit — \`deg\`, \`rad\`, \`grad\`, or \`turn\` — so \`cos(90deg)\` is valid CSS and evaluates to (approximately) 0, just like its JavaScript counterpart \`Math.cos(Math.PI/2)\` but without you needing to convert degrees to radians yourself.

**Why custom properties are the glue**

The six static satellites are spaced evenly using \`--angle: calc((360deg / var(--count)) * var(--i))\`, where \`--i\` is set inline per element (0 through 5) and \`--count\` is 6. This is a classic CSS custom-property trick: each element gets a unique index via an inline \`style\` attribute, and a single shared formula in the stylesheet computes a per-element result from it — no per-element CSS rules needed. The draggable tracker dot works the same way but with \`--angle\` driven by JavaScript instead of a static index, proving that CSS custom properties are a live binding: change the property with \`element.style.setProperty('--angle', '45deg')\` and the browser re-evaluates every \`calc()\` and trig function that references it, repainting instantly with no manual recalculation of pixel offsets.

**\`calc()\` as the composition operator**

None of this works without \`calc()\` gluing the trig result to a length. \`cos(var(--angle))\` returns a unitless number between -1 and 1 — it cannot be used as a \`translate()\` argument directly. Wrapping it as \`calc(cos(var(--angle)) * var(--radius))\` multiplies that unitless ratio by a length (\`110px\`), producing a valid CSS length the transform can consume. This number-times-length pattern is exactly how \`clamp()\`, \`min()\`, and \`max()\` are typically combined with trig in production: fluid radial layouts, circular progress rings, and orbiting notification badges all use this same three-function stack.

**Browser support and fallbacks**

\`sin()\`, \`cos()\`, and \`tan()\` shipped in Chrome 111, Safari 15.4, and Firefox 118 — they are supported in all evergreen browsers as of 2024 and safe to use without a JavaScript fallback in most 2025/2026 projects. For older browsers, wrap trig-dependent layout in \`@supports (top: calc(sin(1turn) * 1px))\` and provide a static or JS-computed fallback inside the \`@supports\` negation. Because the calculation happens in the CSS engine rather than JavaScript, animating \`--angle\` with a CSS \`@keyframes\` or transition is also GPU-accelerated and runs off the main thread, which is a genuine performance win over the old \`requestAnimationFrame\` + inline-style approach for orbit and gauge-style UI.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag the angle slider', text: 'Move the "Angle" range input from 0 to 360 degrees. The tracker dot (the larger indigo circle) recalculates its position using calc(cos(var(--angle)) * var(--radius)) and calc(sin(var(--angle)) * var(--radius)) on every input event, and the code readout box updates to show the exact CSS values being evaluated.' },
        { title: 'Adjust the orbit radius', text: 'Drag the "Orbit radius" slider to change --radius from 50px to 150px. Both the dashed orbit-ring guide and the tracker\'s translate() distance update together because they read the same --radius custom property, showing how one variable can drive multiple independent CSS rules.' },
        { title: 'Toggle auto-rotate', text: 'Enable the "Auto-rotate tracker" checkbox to watch a requestAnimationFrame loop increment --angle continuously, demonstrating that even JS-driven custom property updates still let the CSS engine handle all the trigonometric position math — the script only ever writes an angle value, never a pixel coordinate.' },
        { title: 'Read the live code panel', text: 'The dark code-output box under the controls mirrors the exact --angle, left/top-equivalent calc() expressions currently being applied, rounded to the nearest degree, so you can see cause and effect between the slider value and the resulting CSS in real time.' },
        { title: 'Inspect the six static satellites', text: 'The six small dots ringing the center use a fixed --angle formula, calc((360deg / var(--count)) * var(--i)), with only --i changed per element (0 through 5). Open devtools and edit --count on the .orbit-stage element to see all six redistribute themselves evenly around the circle automatically.' },
        { title: 'Reuse the pattern in your own layout', text: 'Copy the three-line transform: translate(calc(cos(var(--angle)) * var(--radius)), calc(sin(var(--angle)) * var(--radius))) pattern onto any absolutely positioned element, expose --angle and --radius as custom properties, and drive them from a slider, a CSS animation, or a scroll-linked timeline to build radial menus, orbiting badges, or gauge needles without a math library.' },
      ],
    },
    features: [
      'Native CSS cos() and sin() functions compute a parametric circle position with zero JavaScript trigonometry',
      'calc() composes a unitless trig ratio with a length custom property to produce a valid transform argument',
      'Per-element --i and --count custom properties distribute six satellites evenly using one shared formula',
      'CSSStyleDeclaration.setProperty("--angle", ...) proves custom properties are a live binding the layout engine re-evaluates',
      'requestAnimationFrame drives --angle for smooth auto-rotation while the position math stays entirely in CSS',
      'Live code readout panel mirrors the exact calc()/trig expression currently applied, rounded for readability',
      'Dashed .orbit-ring guide and tracker both derive their size from the same --radius variable for single-source-of-truth styling',
      'Range inputs use accent-color for native, dependency-free themed sliders matching the #6366f1 accent',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Orbiting notification badges and avatar rings', desc: 'Circular avatar stacks, "who\'s online" indicator rings, and orbiting status badges on dashboards can position child elements with cos()/sin() instead of hand-computed pixel offsets. Because the formula only depends on --angle and --radius, resizing the ring or adding more items is a single custom-property change rather than recalculating coordinates in JavaScript.' },
      { icon: 'CODE', title: 'Circular and radial navigation menus', desc: 'Radial "pie" menus that fan icons out around a central trigger button rely on exactly this per-item angle formula: calc((360deg / var(--count)) * var(--i)). Combining it with a CSS transition on --angle lets the whole menu animate open with spring easing, entirely in CSS.' },
      { icon: 'LEARN', title: 'Teaching parametric equations and the CSS custom-property cascade', desc: 'This lab is a hands-on way to demonstrate that CSS is now expressive enough to encode real mathematical relationships, not just static styling. It pairs well with the [CSS Scroll-Driven Animations Explainer](/ui-snippets/scroll-timeline-explainer) for showing students how modern CSS increasingly replaces small utility scripts.' },
      { icon: 'APP', title: 'Analog gauge needles and dial indicators', desc: 'Speedometer-style gauges, volume dials, and circular progress needles need to rotate an indicator to an angle proportional to a value. Instead of computing a rotate() transform in JavaScript on every value change, expose --angle as a custom property and let a CSS transition animate it smoothly between updates.' },
      { icon: 'FLOW', title: 'Data visualization: radial/polar chart prototyping', desc: 'Before reaching for a charting library, simple radial layouts — polar scatter points, spoke diagrams, or clock-face visualizations — can be prototyped directly in CSS using this cos()/sin() pattern, keeping the prototype dependency-free and easy to inspect in devtools.' },
      { icon: 'DESIGN', title: 'Orbit-style hero and loading animations', desc: 'Marketing pages and loading screens often show small dots or icons drifting around a central logo. Driving --angle with a CSS @keyframes animation instead of JavaScript keeps the animation running smoothly on the compositor thread, even during heavy main-thread JavaScript execution elsewhere on the page.' },
      { icon: 'CODE', title: 'Related: Fireworks', desc: 'See the [Fireworks](/ui-snippets/fireworks/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Do I need a JavaScript fallback for cos() and sin() in CSS?', a: 'For most 2025/2026 projects, no — sin(), cos(), and tan() have shipped in Chrome 111+, Safari 15.4+, and Firefox 118+, covering effectively all evergreen browsers. If you must support older browsers, wrap the trig-dependent rule in @supports (top: calc(sin(1turn) * 1px)) and provide a static fallback position in the negated branch, or compute the position in JavaScript and write plain pixel values instead of relying on the CSS function.' },
      { q: 'Why does cos(var(--angle)) need to be wrapped in calc() to use as a transform offset?', a: 'cos() and sin() return a unitless number between -1 and 1, not a length. CSS transform functions like translate() require an actual length value (px, %, etc.), so you multiply the unitless ratio by a length inside calc(), e.g. calc(cos(var(--angle)) * 110px). The calc() function is what performs the type coercion from "unitless number times length" into a valid length the browser can use for layout.' },
      { q: 'What angle units does CSS sin()/cos() accept?', a: 'CSS trig functions accept any valid CSS angle unit — deg, rad, grad, or turn — and convert internally, so cos(0.25turn) and cos(90deg) both evaluate to the same result. This is more forgiving than JavaScript\'s Math.cos(), which only accepts radians and requires manual degree-to-radian conversion (radians = degrees * Math.PI / 180) before every call.' },
      { q: 'Can I animate --angle with a native CSS @keyframes animation instead of JavaScript?', a: 'Yes, and it\'s the more performant option. Register the custom property with @property { syntax: "<angle>"; inherits: true; initial-value: 0deg; } so the browser knows to interpolate it as an angle, then animate it with a standard @keyframes rule and animation: orbit 4s linear infinite. This runs off the main thread and stays smooth even under heavy JavaScript load, unlike a requestAnimationFrame loop.' },
      { q: 'Is this more performant than computing positions with JavaScript and Math.cos/Math.sin?', a: 'For continuous or interaction-driven repositioning, yes. When the browser evaluates cos()/calc() as part of style resolution, it can batch the recalculation with the rest of layout and, when paired with a registered @property animation, run entirely on the compositor. A JavaScript-driven approach that writes inline styles on every animation frame forces a style recalculation on the main thread each time, which is more prone to jank under load.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how the --angle and --radius custom properties flow from the range inputs, through JavaScript's setProperty calls, into the calc(cos()...) and calc(sin()...) expressions that position the tracker dot — it can show you precisely which line changes when you move a slider one pixel. It's also a great way to explore extensions: ask it to register --angle with @property so the rotation can be driven by a pure CSS @keyframes animation instead of the current requestAnimationFrame loop, or to add a second orbiting ring at a different radius and rotation speed using the same formula. You could also ask it to explain why cos() needs calc() around it while a plain rotate(var(--angle)) transform would not, which is a subtle but important distinction in how CSS typechecks function arguments.`,
      prompt: `Build an interactive CSS trigonometric functions lab in plain HTML, CSS, and JavaScript that visually teaches native CSS sin(), cos(), and calc().

Requirements:
- A circular "orbit stage" containing a dashed guide ring, a fixed center dot, six evenly-spaced static satellite dots, and one larger draggable "tracker" dot.
- Every satellite and the tracker must be positioned using transform: translate(calc(cos(var(--angle)) * var(--radius)), calc(sin(var(--angle)) * var(--radius))) — no manually computed pixel coordinates anywhere in JavaScript.
- The six static satellites must derive their angle from a single shared CSS formula, calc((360deg / var(--count)) * var(--i)), with only a per-element --i custom property set inline (0 through 5) and a shared --count of 6.
- An angle range slider (0-360) that updates the tracker's --angle custom property live via element.style.setProperty, plus a numeric readout of the current angle in degrees next to the slider label.
- A radius range slider (roughly 50-150px) that updates --radius on both the tracker and the guide ring simultaneously so they stay visually consistent.
- An auto-rotate checkbox that starts/stops a requestAnimationFrame loop incrementing --angle continuously, pausing correctly when the user manually drags the angle slider.
- A live "code readout" panel showing the exact current --angle value and the literal calc(cos()...)/calc(sin()...) CSS expressions being applied, updating in real time as either slider moves.
- Smooth CSS transitions on radius changes so the ring and tracker resize gracefully rather than jumping.`,
    },
  },
};

export default cssTrigFunctionsLab;
