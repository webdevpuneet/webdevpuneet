const colorMixPlayground = {
  id: 'color-mix-playground',
  title: 'CSS color-mix() Playground',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="intro">
    <h2>color-mix() playground</h2>
    <p>Pick two base colors and a mix ratio. The swatch below is colored with a live CSS custom property set to a real <code>color-mix(in oklch, ...)</code> function — updated via JS <code>style.setProperty</code>, not by computing the blended color in JavaScript.</p>
  </div>

  <div class="controls">
    <div class="control-group">
      <label for="color-a">Color A</label>
      <input type="color" id="color-a" value="#6366f1">
    </div>
    <div class="control-group">
      <label for="color-b">Color B</label>
      <input type="color" id="color-b" value="#f472b6">
    </div>
    <div class="control-group">
      <label for="color-space">Color space</label>
      <select id="color-space">
        <option value="oklch">oklch</option>
        <option value="oklab">oklab</option>
        <option value="srgb">srgb</option>
        <option value="hsl">hsl</option>
        <option value="lch">lch</option>
      </select>
    </div>
  </div>

  <div class="control-group slider-group">
    <label for="mix-ratio">Mix ratio: A <span id="ratio-label">50%</span> / B <span id="ratio-label-b">50%</span></label>
    <input type="range" id="mix-ratio" min="0" max="100" value="50">
  </div>

  <div class="swatch-row">
    <div class="swatch-box" id="swatch-a"></div>
    <div class="swatch-box swatch-result" id="swatch-result">
      <span class="swatch-tag">Mixed</span>
    </div>
    <div class="swatch-box" id="swatch-b"></div>
  </div>

  <div class="css-panel">
    <p class="css-panel-label">Applied CSS custom property</p>
    <code class="css-panel-code" id="css-live-code">--mixed-color: color-mix(in oklch, #6366f1 50%, #f472b6);</code>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; }

.demo-wrap { max-width: 600px; margin: 0 auto; padding: 32px 20px 48px; }
.intro h2 { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.intro p { font-size: 13px; color: #64748b; line-height: 1.6; }
.intro code { background: #eef2ff; color: #4f46e5; padding: 1px 6px; border-radius: 5px; font-size: 12px; }

.controls { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin: 20px 0 16px; }
@media (max-width: 480px) { .controls { grid-template-columns: 1fr; } }

.control-group { display: flex; flex-direction: column; gap: 6px; }
.control-group label { font-size: 12px; font-weight: 600; color: #475569; }

.control-group input[type="color"] {
  width: 100%; height: 40px; border-radius: 8px; border: 1.5px solid #e2e8f0;
  cursor: pointer; padding: 3px; background: #fff;
}

.control-group select {
  padding: 9px 10px; border-radius: 8px; border: 1.5px solid #e2e8f0;
  font-size: 13px; font-family: inherit; background: #fff; color: #1e293b; cursor: pointer;
}
.control-group select:focus { outline: none; border-color: #6366f1; }

.slider-group { margin-bottom: 20px; }
.slider-group label span { color: #6366f1; font-weight: 700; }
.slider-group input[type="range"] {
  width: 100%; accent-color: #6366f1; height: 6px; cursor: pointer;
}

.swatch-row { display: grid; grid-template-columns: 1fr 1.4fr 1fr; gap: 12px; margin-bottom: 20px; }
.swatch-box {
  height: 100px; border-radius: 14px;
  display: flex; align-items: flex-end; justify-content: center;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
  transition: background-color 0.2s;
}
#swatch-a { background: #6366f1; }
#swatch-b { background: #f472b6; }

/* --- The core color-mix() technique --- */
:root { --color-a: #6366f1; --color-b: #f472b6; --mix-ratio: 50%; }

.swatch-result {
  background: var(--mixed-color, color-mix(in oklch, var(--color-a) var(--mix-ratio), var(--color-b)));
}

.swatch-tag {
  font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.2); padding: 4px 10px; border-radius: 20px;
  margin-bottom: 8px; backdrop-filter: blur(4px);
}

.css-panel { background: #0f172a; border-radius: 12px; padding: 14px 16px; }
.css-panel-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #818cf8; margin-bottom: 6px; }
.css-panel-code { display: block; font-family: "SF Mono", Consolas, monospace; font-size: 12px; color: #e2e8f0; word-break: break-word; }`,
  js: `const colorA = document.getElementById('color-a');
const colorB = document.getElementById('color-b');
const spaceSelect = document.getElementById('color-space');
const ratioSlider = document.getElementById('mix-ratio');
const ratioLabel = document.getElementById('ratio-label');
const ratioLabelB = document.getElementById('ratio-label-b');
const swatchA = document.getElementById('swatch-a');
const swatchB = document.getElementById('swatch-b');
const swatchResult = document.getElementById('swatch-result');
const liveCode = document.getElementById('css-live-code');
const root = document.documentElement;

function update() {
  const a = colorA.value;
  const b = colorB.value;
  const space = spaceSelect.value;
  const ratioA = Number(ratioSlider.value);
  const ratioB = 100 - ratioA;

  ratioLabel.textContent = ratioA + '%';
  ratioLabelB.textContent = ratioB + '%';

  swatchA.style.background = a;
  swatchB.style.background = b;

  // Build the real color-mix() function string and hand it straight to the
  // browser via a CSS custom property — the browser, not JS, computes the blend.
  const mixFunction = \`color-mix(in \${space}, \${a} \${ratioA}%, \${b})\`;

  root.style.setProperty('--color-a', a);
  root.style.setProperty('--color-b', b);
  root.style.setProperty('--mixed-color', mixFunction);

  swatchResult.style.background = mixFunction;

  liveCode.textContent = \`--mixed-color: \${mixFunction};\`;
}

[colorA, colorB, spaceSelect, ratioSlider].forEach(el => {
  el.addEventListener('input', update);
});

update();`,
  seo: {
    title: 'CSS color-mix() Playground — Free HTML CSS JS Snippet',
    description: 'Live color-mix() demo: pick two colors and a ratio, see the real CSS function string update. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS color-mix() Playground — Blending Colors With a Native CSS Function',
      description: `Blending two colors used to be something CSS genuinely could not do on its own — you either pre-computed the blended hex value in a design tool and hard-coded it, or you reached for a preprocessor function like Sass's \`mix()\`, or you wrote JavaScript to interpolate RGB channels manually. The \`color-mix()\` function, part of the CSS Color Module Level 5 and supported in Chrome/Edge 111+, Safari 16.2+, and Firefox 113+ (full baseline coverage across evergreen browsers since mid-2023), makes color blending a first-class native CSS operation you can use directly in any property that accepts a color — background, border, box-shadow, even inside another color-mix() call.

**How color-mix() works technically**

The syntax is \`color-mix(in <color-space>, <color> [<percentage>], <color> [<percentage>])\`. The first argument names the color space the interpolation happens in — this demo lets you switch between \`oklch\`, \`oklab\`, \`srgb\`, \`hsl\`, and \`lch\` live so you can see how dramatically the choice of space changes the result. The two colors that follow can each carry an optional percentage; if you specify a percentage on only one color, the other is inferred as the remainder needed to reach 100%, and if you omit both, the browser splits 50/50. This demo always supplies the first percentage explicitly (driven by the slider) and lets the second color's share be implied, exactly matching how \`color-mix(in oklch, var(--color-a) 30%, var(--color-b))\` is typically written in real stylesheets.

**Why color space choice actually matters**

This is the part most developers new to \`color-mix()\` underestimate. Mixing in \`srgb\` (the classic RGB channel-averaging approach, similar to what \`rgba()\` blending or most JS color libraries default to) frequently produces muddy, desaturated midpoints when the two input colors are far apart on the color wheel — mixing a saturated blue and a saturated pink in sRGB often passes through a grayish-purple dead zone. Mixing in \`oklch\` or \`oklab\` — perceptually uniform color spaces designed so that equal numeric steps look like equal visual steps to the human eye — produces much more vivid, visually pleasing gradients between the same two endpoints, because the interpolation path follows how humans actually perceive hue and lightness rather than raw channel math. This is exactly why modern CSS color tooling (and this demo) defaults to \`oklch\`: it is widely considered the best general-purpose choice for UI color blending in 2025/2026 work, particularly for building tints, shades, and hover-state variants of a brand color programmatically.

**Why this matters for modern UI development**

Before \`color-mix()\`, generating a lighter or darker variant of a brand color (for hover states, disabled states, or a tint scale) required either a Sass build step, a JavaScript color library shipped to the client, or manually authored hex values for every shade — none of which could respond to a CSS custom property changing at runtime. With \`color-mix()\`, you can write \`background: color-mix(in oklch, var(--brand-color) 85%, white)\` directly in a stylesheet and get a computed 15%-lightened tint that automatically updates if \`--brand-color\` changes (for example, via a theme switcher or user-customizable accent color), with zero JavaScript recomputation needed at all.

**How this demo wires it together**

The two \`<input type="color">\` pickers and the range slider don't compute any color math themselves — every change handler simply builds a literal \`color-mix(in <space>, <colorA> <ratio>%, <colorB>)\` string and hands it to \`document.documentElement.style.setProperty('--mixed-color', mixFunction)\`. The actual pixel-level blending happens entirely inside the browser's rendering engine when it resolves that custom property against \`.swatch-result { background: var(--mixed-color, ...); }\`. This is the idiomatic way to make CSS color functions interactive: pass strings into custom properties, and let CSS do the computation.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick two base colors', text: 'Use the Color A and Color B native <input type="color"> pickers to choose any two colors. Both swatches on either side of the mixed swatch update immediately to show your raw picks.' },
        { title: 'Drag the mix ratio slider', text: 'The #mix-ratio range input controls what percentage of Color A is used — the label above updates live to show "A 30% / B 70%", and the middle swatch recomputes using color-mix(in oklch, colorA 30%, colorB).' },
        { title: 'Switch the color space', text: 'Change the "Color space" dropdown between oklch, oklab, srgb, hsl, and lch while keeping the same two colors and ratio. Watch the middle swatch shift — oklch and oklab typically stay vivid through the midpoint, while srgb and hsl often pass through a duller, grayer blend.' },
        { title: 'Read the generated CSS', text: 'The dark panel at the bottom shows the exact --mixed-color custom property value being set, e.g. --mixed-color: color-mix(in oklch, #6366f1 30%, #f472b6);, which is the literal string handed to style.setProperty in the JS panel.' },
        { title: 'Inspect the custom property in DevTools', text: 'Open your browser DevTools, select the swatch-result element, and look at the Styles/Computed panel for --mixed-color and background — you will see the browser has resolved the color-mix() function to a final computed color, confirming the blend is happening natively in CSS, not in JavaScript.' },
        { title: 'Apply the pattern in your own stylesheet', text: 'Define a brand color as a custom property (--brand: #6366f1;) and derive hover/tint/shade variants with color-mix(in oklch, var(--brand) 85%, white) or color-mix(in oklch, var(--brand) 80%, black) — these recompute automatically if --brand ever changes at runtime.' },
      ],
    },
    features: [
      'color-mix(in <space>, colorA ratio%, colorB) built as a literal string and passed to style.setProperty',
      'Live switch between 5 color spaces (oklch, oklab, srgb, hsl, lch) to compare interpolation paths',
      'Native <input type="color"> pickers drive --color-a and --color-b custom properties directly',
      'Range slider percentage maps directly onto the first color\'s explicit percentage argument in the function',
      'Second color\'s share is left implicit, letting the browser infer the remainder to 100% per the spec',
      'CSS custom property fallback syntax: var(--mixed-color, color-mix(...)) provides an initial computed value',
      'Generated CSS panel displays the exact custom property declaration being applied, for genuine transparency',
      'All blending math executes inside the browser\'s CSS engine — zero color-interpolation logic exists in JS',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Generating hover, active, and disabled tints from one brand color', desc: 'Instead of hand-authoring separate hex values for a button\'s default, hover, and disabled states, derive them all from a single --brand custom property using color-mix(in oklch, var(--brand) 85%, white) for a light tint or ...black for a darkened active state — all three stay perfectly in sync if the brand color is ever changed by a theme system.' },
      { icon: 'FORM', title: 'Live theme and accent-color pickers', desc: 'A settings page that lets users pick a custom accent color can use color-mix() to derive an entire consistent shade scale (10%, 30%, 70%, 90% mixes with white/black) in real time as the user drags a color picker, without recalculating anything in JavaScript — pairs naturally with a [Color Theme Switcher](/ui-snippets/color-theme-switcher/) component.' },
      { icon: 'CHARTS', title: 'Data visualization gradient scales in perceptually uniform space', desc: 'Chart and heatmap color scales benefit strongly from oklch/oklab interpolation because equal data-value steps map to visually equal color steps, avoiding the "false plateau" perception problem that plain sRGB gradients create in the middle of a scale.' },
      { icon: 'DESIGN', title: 'Translucent overlay colors without separate alpha math', desc: 'color-mix(in srgb, black 20%, transparent) is a concise way to create a 20%-opacity black overlay color derived from any base color, useful for scrim overlays, disabled-state washes, and hover backgrounds without maintaining separate rgba() values.' },
      { icon: 'LEARN', title: 'Teaching perceptually uniform vs. legacy color spaces', desc: 'This playground is built specifically so switching only the color-space dropdown (while holding colors and ratio constant) isolates that one variable, making the visual difference between srgb/hsl channel averaging and oklch/oklab perceptual blending obvious without reading a color-theory textbook.' },
      { icon: 'CODE', title: 'Removing JS color-manipulation libraries from a bundle', desc: 'Libraries like chroma.js or tinycolor2 are often included purely to compute tints, shades, and blends at runtime; for browsers with color-mix() support, that logic can move entirely into CSS custom properties, removing kilobytes of JavaScript and keeping color logic declarative alongside the rest of the stylesheet.' },
      { icon: 'CODE', title: 'Related: Cron Expression Builder', desc: 'See the [Cron Expression Builder](/ui-snippets/cron-expression-builder/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does the "in oklch" part of color-mix() actually control?', a: 'It specifies the color space in which the interpolation math happens — the two input colors are converted into that space\'s coordinate system, blended proportionally along each axis, and the result is converted back to a displayable color. Different spaces produce visually different blends between the same two endpoints because they define "halfway between" differently; oklch and oklab are perceptually uniform and tend to produce more vivid midpoints than srgb or hsl.' },
      { q: 'What happens if I only specify one percentage in color-mix()?', a: 'The unspecified color\'s percentage is inferred as whatever remainder is needed to reach 100% — color-mix(in oklch, red 30%, blue) is equivalent to color-mix(in oklch, red 30%, blue 70%). If you omit both percentages entirely, the browser defaults to an even 50/50 split, which is what this demo starts with before you move the slider.' },
      { q: 'Is color-mix() supported widely enough to use in production in 2026?', a: 'Yes — color-mix() has shipped in Chrome/Edge since version 111, Safari since 16.2, and Firefox since 113, all released in the first half of 2023, giving it broad coverage across evergreen browsers by 2025/2026. For any audience still on notably older browsers, feature-detect with @supports (background: color-mix(in oklch, red, blue)) and provide a pre-computed fallback color.' },
      { q: 'Why do oklch and srgb produce such different results for the same two colors?', a: 'srgb and hsl interpolate by averaging raw channel values (red/green/blue, or hue/saturation/lightness) along a straight numeric line, which does not correspond to how the human eye perceives brightness and saturation changes — the midpoint often looks duller or grayer than either endpoint. oklch and oklab were specifically designed so that equal numeric distance corresponds to roughly equal perceived visual distance, so their midpoints tend to stay vivid and look like a genuine "average" of the two hues rather than a washed-out compromise.' },
      { q: 'Can color-mix() be used with CSS custom properties and variables?', a: 'Yes, and this is one of its most powerful applications — you can pass a var(--brand-color) as either color argument, as this demo does with --color-a and --color-b, so the mixed result automatically recomputes whenever the underlying custom property changes, whether from a theme toggle, a user-controlled color picker, or a media-query-driven light/dark mode switch, with no JavaScript recalculation required.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain, in plain terms, why the oklch and srgb results look so different for the same two input colors — it can walk through how each color space defines "halfway between" two colors and why perceptually uniform spaces avoid the muddy-midpoint problem. You could also ask it to add a third color-mix() layer (mixing the result of one color-mix() with a third color) to build a 3-stop gradient generator, or to add a "copy CSS" button that copies the generated color-mix() declaration to the clipboard. It's also a good prompt for a practical extension: ask it to generate a full tint/shade scale (10 steps from white to black) for whatever Color A is currently selected, using this same color-mix() technique.`,
      prompt: `Build an interactive HTML/CSS/JS playground for the CSS color-mix() function that lets a user blend two colors and compare different interpolation color spaces.

Requirements:
- Two native <input type="color"> pickers for a base Color A and Color B, plus a <select> dropdown offering at least these color-mix() spaces: oklch, oklab, srgb, hsl, lch.
- A range slider controlling the mix percentage, with a live text label showing the current split (e.g. "A 30% / B 70%") that updates on every input event.
- Three swatches displayed side by side: Color A raw, the mixed result, and Color B raw, where the mixed swatch's background is set via a real CSS color-mix(in <space>, <colorA> <ratio>%, <colorB>) function string, applied through a CSS custom property using element.style.setProperty — the blend itself must be computed by the browser's CSS engine, not precalculated in JavaScript.
- A visible code panel that displays the exact literal custom property declaration currently being applied (e.g. "--mixed-color: color-mix(in oklch, #6366f1 30%, #f472b6);"), updating live as any control changes, so the underlying mechanism is never hidden.
- All three controls (color A, color B, space dropdown, ratio slider) must independently and correctly update the mixed swatch and code panel on every change, with no stale state.
- Use a neutral palette for the surrounding UI chrome with rounded swatches, clear labels, and smooth background-color transitions on the swatches.
- No external color-manipulation libraries — the only computation JavaScript performs is string-building the color-mix() function call and setting a CSS custom property.`,
    },
  },
};

export default colorMixPlayground;
