const cssClampResponsiveTypeDemo = {
  id: 'css-clamp-responsive-type-demo',
  title: 'Fluid Typography with CSS clamp() Demo',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="controls">
    <div class="control-group">
      <label>Min size <span id="min-label">1.25rem</span></label>
      <input type="range" id="min-slider" min="12" max="32" value="20" step="1">
    </div>
    <div class="control-group">
      <label>Preferred (viewport-relative) <span id="pref-label">4vw</span></label>
      <input type="range" id="pref-slider" min="1" max="10" value="4" step="0.5">
    </div>
    <div class="control-group">
      <label>Max size <span id="max-label">3.5rem</span></label>
      <input type="range" id="max-slider" min="24" max="80" value="56" step="1">
    </div>
  </div>

  <pre class="clamp-string" id="clamp-string"></pre>

  <div class="preview-frame">
    <p class="preview-hint">Resize your browser window to see the heading scale between the min and max bounds</p>
    <h2 class="preview-heading" id="preview-heading">Fluid Typography</h2>
    <div class="viewport-readout">Current viewport width: <strong id="vw-readout">--</strong></div>
  </div>

  <div class="ruler-wrap">
    <p class="ruler-label">Growth zones across viewport width</p>
    <div class="ruler" id="ruler">
      <div class="ruler-zone zone-min" id="zone-min"></div>
      <div class="ruler-zone zone-fluid" id="zone-fluid"></div>
      <div class="ruler-zone zone-max" id="zone-max"></div>
      <div class="ruler-marker" id="ruler-marker"></div>
    </div>
    <div class="ruler-legend">
      <span><i class="dot dot-min"></i> Locked at min</span>
      <span><i class="dot dot-fluid"></i> Fluid (scales with vw)</span>
      <span><i class="dot dot-max"></i> Locked at max</span>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }

.demo-wrap { max-width: 720px; margin: 0 auto; padding: 32px 20px 48px; display: flex; flex-direction: column; gap: 18px; }

.controls {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 16px 18px; display: flex; flex-direction: column; gap: 14px;
}
.control-group { display: flex; flex-direction: column; gap: 8px; }
.control-group label { font-size: 12px; font-weight: 600; color: #64748b; display: flex; justify-content: space-between; }
.control-group label span { color: #6366f1; font-weight: 700; font-family: 'SFMono-Regular', Consolas, monospace; }
.control-group input[type="range"] { accent-color: #6366f1; }

.clamp-string {
  background: #0f172a; color: #86efac; border-radius: 10px; padding: 14px 16px;
  font-size: 13px; font-family: 'SFMono-Regular', Consolas, monospace; overflow-x: auto;
}

.preview-frame {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 28px 20px; text-align: center; display: flex; flex-direction: column; gap: 10px;
}
.preview-hint { font-size: 12px; color: #94a3b8; }
.preview-heading {
  font-weight: 800; color: #4338ca; line-height: 1.1; word-break: break-word;
}
.viewport-readout { font-size: 12px; color: #64748b; font-family: 'SFMono-Regular', Consolas, monospace; }
.viewport-readout strong { color: #6366f1; }

.ruler-wrap { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 18px; display: flex; flex-direction: column; gap: 10px; }
.ruler-label { font-size: 12px; font-weight: 600; color: #94a3b8; }
.ruler { position: relative; height: 34px; border-radius: 8px; overflow: hidden; display: flex; }
.ruler-zone { height: 100%; }
.zone-min { background: #fecaca; }
.zone-fluid { background: #c7d2fe; flex: 1; }
.zone-max { background: #bbf7d0; }
.ruler-marker {
  position: absolute; top: -4px; width: 2px; height: 42px; background: #1e293b;
  transition: left 0.1s linear;
}
.ruler-legend { display: flex; gap: 16px; flex-wrap: wrap; font-size: 11px; color: #64748b; }
.dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 5px; vertical-align: middle; }
.dot-min { background: #f87171; }
.dot-fluid { background: #6366f1; }
.dot-max { background: #22c55e; }`,

  js: `const minSlider = document.getElementById('min-slider');
const prefSlider = document.getElementById('pref-slider');
const maxSlider = document.getElementById('max-slider');
const minLabel = document.getElementById('min-label');
const prefLabel = document.getElementById('pref-label');
const maxLabel = document.getElementById('max-label');
const clampString = document.getElementById('clamp-string');
const previewHeading = document.getElementById('preview-heading');
const vwReadout = document.getElementById('vw-readout');
const ruler = document.getElementById('ruler');
const zoneMin = document.getElementById('zone-min');
const zoneMax = document.getElementById('zone-max');
const rulerMarker = document.getElementById('ruler-marker');

const ROOT_FONT_PX = 16;

function pxToRem(px) { return (px / ROOT_FONT_PX).toFixed(2); }

function currentValues() {
  const minPx = Number(minSlider.value);
  const prefVw = Number(prefSlider.value);
  const maxPx = Number(maxSlider.value);
  return { minPx, prefVw, maxPx };
}

function buildClamp() {
  const { minPx, prefVw, maxPx } = currentValues();
  const minRem = pxToRem(minPx);
  const maxRem = pxToRem(maxPx);
  return {
    css: 'clamp(' + minRem + 'rem, ' + prefVw + 'vw, ' + maxRem + 'rem)',
    minPx, maxPx, prefVw, minRem, maxRem,
  };
}

// Solve the viewport width (px) at which prefVw * vw crosses minPx and maxPx
// prefVw is a percentage: value_px = (prefVw / 100) * viewportWidth
function crossoverWidths(minPx, maxPx, prefVw) {
  const minCrossVw = (minPx * 100) / prefVw;
  const maxCrossVw = (maxPx * 100) / prefVw;
  return { minCrossVw, maxCrossVw };
}

function render() {
  const { css, minPx, maxPx, prefVw, minRem, maxRem } = buildClamp();

  minLabel.textContent = minRem + 'rem';
  prefLabel.textContent = prefVw + 'vw';
  maxLabel.textContent = maxRem + 'rem';

  clampString.textContent = 'font-size: ' + css + ';';
  previewHeading.style.fontSize = css;

  updateViewportReadout(minPx, maxPx, prefVw);
  updateRuler(minPx, maxPx, prefVw);
}

function updateViewportReadout(minPx, maxPx, prefVw) {
  const vw = window.innerWidth;
  const fluidPx = (prefVw / 100) * vw;
  const clamped = Math.min(Math.max(fluidPx, minPx), maxPx);
  vwReadout.textContent = vw + 'px → computed font-size ' + clamped.toFixed(1) + 'px';
}

function updateRuler(minPx, maxPx, prefVw) {
  const { minCrossVw, maxCrossVw } = crossoverWidths(minPx, maxPx, prefVw);
  // Map crossover viewport widths onto a 320-2200px reference scale for the ruler visual
  const REF_MIN = 320, REF_MAX = 2200;
  const clampPct = w => Math.min(100, Math.max(0, ((w - REF_MIN) / (REF_MAX - REF_MIN)) * 100));

  const minPct = clampPct(minCrossVw);
  const maxPct = clampPct(maxCrossVw);

  zoneMin.style.width = minPct + '%';
  zoneMax.style.width = (100 - maxPct) + '%';

  // Marker shows current real viewport position on the ruler
  const currentPct = clampPct(window.innerWidth);
  rulerMarker.style.left = currentPct + '%';
}

[minSlider, prefSlider, maxSlider].forEach(s => s.addEventListener('input', render));
window.addEventListener('resize', () => {
  const { minPx, maxPx, prefVw } = currentValues();
  updateViewportReadout(minPx, maxPx, prefVw);
  updateRuler(minPx, maxPx, prefVw);
});

render();`,

  seo: {
    title: 'Fluid Typography with CSS clamp() — Free Snippet Demo',
    description: 'Build a font-size: clamp(min, vw, max) value with live sliders and see where it locks vs scales. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Fluid Typography with CSS clamp() — Building and Understanding Responsive font-size Without Media Queries',
      description: `Before \`clamp()\`, fluid typography required either a fixed \`font-size\` per breakpoint (a stair-step effect, jumping abruptly at each \`@media\` boundary) or a raw viewport-relative unit like \`4vw\` with no bounds, which reads beautifully on a laptop but becomes illegibly tiny on a phone and absurdly oversized on an ultrawide monitor. CSS's \`clamp(min, preferred, max)\` function solves both problems in a single declaration, and this snippet is an interactive builder that lets you construct one live, see its exact generated CSS string, and visualize precisely where on the viewport-width axis it switches between its three behavior zones.

**How clamp() actually resolves three arguments**

\`clamp(MIN, PREFERRED, MAX)\` takes three comma-separated values and returns whichever satisfies: the middle "preferred" value, unless it would fall below MIN (in which case MIN is used) or above MAX (in which case MAX is used). The critical detail is that only the *preferred* argument is typically expressed in a fluid, viewport-relative unit like \`vw\`; MIN and MAX are normally fixed units like \`rem\`, acting as hard floors and ceilings. In this demo, moving the "Preferred" slider changes the \`vw\` value passed to \`clamp()\` — the middle argument, e.g. \`4vw\` — while the min and max sliders set the two \`rem\`-based bounds, exactly mirroring the three-argument structure of the real CSS function.

**Why rem for the bounds and vw for the middle**

Using \`rem\` for MIN and MAX (rather than \`px\`) means both bounds respect the user's browser font-size setting, which matters for accessibility — a user who has increased their default browser font size for readability should see that preference reflected even at the clamped floor and ceiling. The middle argument uses \`vw\` (1% of viewport width) specifically because it is the term that needs to move continuously with window size; this demo computes it directly from your Preferred slider value as a percentage, and the code panel always shows the exact resulting string, e.g. \`clamp(1.25rem, 4vw, 3.5rem)\`, ready to paste into a stylesheet.

**Finding the crossover viewport widths — the real math behind the ruler**

The most educational part of this demo is the "Growth zones" ruler beneath the preview. It answers a question most fluid-typography tutorials never actually compute: *at what exact viewport width does the value stop being MIN and start scaling, and at what width does it stop scaling and become MAX?* Since the preferred value is \`prefVw%\` of viewport width, solving \`minPx = (prefVw / 100) * viewportWidth\` for \`viewportWidth\` gives the exact pixel width where the curve crosses from the min-locked zone into the fluid zone: \`viewportWidth = minPx * 100 / prefVw\`. The same algebra with \`maxPx\` gives the crossover into the max-locked zone. This demo's \`crossoverWidths()\` function performs exactly that calculation, and the ruler visually maps those two crossover widths onto a reference 320px–2200px scale, coloring the red zone (locked at min), the indigo zone (actively fluid), and the green zone (locked at max) — with a live marker showing where your actual current browser width currently sits.

**Why this beats hand-picking breakpoint font sizes**

A traditional approach — three or four fixed font-size declarations inside \`@media\` queries — produces visible, discrete jumps as the viewport crosses each breakpoint, and requires maintaining N separate values that must be kept visually consistent by hand. A single \`clamp()\` declaration replaces all of that with one line that scales continuously and smoothly across every viewport width in between, with genuinely zero jump discontinuities, while still guaranteeing the text never becomes illegibly small or absurdly large at the extremes — the two failure modes of raw unbounded \`vw\` sizing.

**Browser support and where this pattern is heading**

\`clamp()\`, along with its siblings \`min()\` and \`max()\`, has been supported in all major browsers since 2020, making it entirely production-safe in 2025/2026 with no fallback needed. The same three-argument pattern demonstrated here for \`font-size\` composes directly with newer relative units — swapping the \`vw\` middle argument for a \`cqi\` container query unit, as explored in the companion [Container Query Units demo](/ui-snippets/css-container-query-units-demo), produces fluid typography that scales relative to a component's container rather than the whole viewport, which is increasingly the preferred approach for reusable, drop-anywhere component libraries.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Adjust the min size slider', text: 'Sets the first clamp() argument, converted from pixels to rem via pxToRem() so the floor respects the user\'s root font-size setting. This is the smallest the heading will ever render, no matter how narrow the viewport gets.' },
        { title: 'Adjust the preferred (vw) slider', text: 'Sets the middle clamp() argument as a raw vw percentage — this is the only fluid term, and it is what makes the heading continuously resize as you change your browser window width, computed live as (prefVw / 100) * window.innerWidth.' },
        { title: 'Adjust the max size slider', text: 'Sets the third clamp() argument, the ceiling. Once the vw-based preferred value would exceed this, the heading locks at this size no matter how wide the viewport becomes — try a small gap between min and max to see the fluid zone narrow dramatically on the ruler.' },
        { title: 'Read the generated CSS string', text: 'The dark code panel always shows the exact font-size: clamp(...) declaration your three sliders currently produce, in the same rem/vw/rem format you would hand-write in a stylesheet — copy it directly.' },
        { title: 'Resize your actual browser window', text: 'The live heading and the "computed font-size" readout both update in response to real window resize events, not just slider input — this is the only way to see the fluid scaling behavior itself, since the sliders only change the clamp() parameters, not the viewport.' },
        { title: 'Read the growth-zone ruler', text: 'The colored ruler bar shows, across a 320px-2200px reference scale, exactly which viewport widths lock to min (red), scale fluidly (indigo), or lock to max (green) for your current three values — computed by solving for the exact crossover width algebraically in crossoverWidths(), with a marker showing where your real current window width sits.' },
      ],
    },
    features: [
      'Three sliders directly map to clamp()\'s three arguments: min (rem), preferred (vw), max (rem)',
      'pxToRem() converts slider pixel values to rem so bounds respect the user\'s root font-size',
      'Live code panel shows the exact, copy-pasteable font-size: clamp(min, vw, max) CSS string',
      'Real window resize listener drives the computed font-size readout, not just slider changes',
      'crossoverWidths() algebraically solves the exact viewport-width points where the curve locks to min/max',
      'Canvas-free color-coded ruler visualizes the min-locked, fluid, and max-locked zones to scale',
      'Live marker on the ruler shows exactly where the current real browser width falls across the zones',
      'No JavaScript resize logic drives the heading itself — the actual scaling is pure native CSS clamp()',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Designing a heading scale without hand-picking per-breakpoint sizes', desc: 'Instead of maintaining separate font-size values across 3-4 media query breakpoints for every heading level, use this tool to find a single clamp() triple that scales smoothly across the full range, then verify the crossover ruler shows the fluid zone spanning your target device widths (roughly 375px to 1440px for most sites).' },
      { icon: 'LEARN', title: 'Teaching why raw vw units alone are dangerous for typography', desc: 'A heading set to plain 6vw with no bounds looks reasonable on a 1440px laptop but shrinks below 20px on a narrow phone and balloons past 130px on a 4K ultrawide. This demo makes that failure mode visible by letting you set an unrealistically small min or large max and watch the fluid zone swallow the entire practical viewport range.' },
      { icon: 'CODE', title: 'Generating exact clamp() values for a design system\'s type scale', desc: 'Design systems often define a modular type scale (h1 through h6, body, caption). Run each level\'s intended min/max through this tool to get a precise, consistent clamp() declaration per level, rather than approximating vw percentages by trial and error in a browser resize test.' },
      { icon: 'APP', title: 'Debugging why a heading "stopped scaling" at a certain window width', desc: 'If a fluid heading appears to stop growing while resizing a real page, the crossover ruler in this demo demonstrates exactly why — every clamp() value has a hard max crossover width beyond which it is locked by design. Recreate the site\'s actual clamp() values here to find precisely which viewport width the lock engages at.' },
      { icon: 'FLOW', title: 'Extending fluid sizing to spacing, padding, and gap values', desc: 'The same three-argument clamp(min, vw, max) pattern built in this demo for font-size works identically for any length property — padding, gap, border-radius, line-height. Once the min/vw/max relationship is understood here, the identical technique applies to fluid spacing scales without any additional concepts.' },
      { icon: 'CODE', title: 'Swapping the vw unit for cqi to make type scale fluid within a container', desc: 'Replacing the middle vw argument with a cqi container query unit produces a clamp() value that scales relative to a component\'s own container rather than the whole browser viewport — see the [Container Query Units demo](/ui-snippets/css-container-query-units-demo) for the container-relative version of the same three-zone clamp() behavior explored here.' },
      { icon: 'CODE', title: 'Related: Native CSS Nesting Playground', desc: 'See the [Native CSS Nesting Playground](/ui-snippets/css-nesting-playground/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the exact difference between the three arguments of clamp()?', a: 'clamp(MIN, PREFERRED, MAX) evaluates all three and returns PREFERRED unless it falls outside the MIN-MAX range, in which case the nearest bound wins. MIN and MAX are typically fixed values (this demo uses rem so they respect the user\'s font-size setting), while PREFERRED is typically a fluid, relative value like vw so the result actually changes continuously with viewport width between the two bounds.' },
      { q: 'How do I calculate the exact viewport width where my clamp() value starts scaling?', a: 'Since the preferred term is (vwPercentage / 100) times the viewport width in pixels, solve minPx = (vwPercentage / 100) * width for width to get width = minPx * 100 / vwPercentage — that is exactly the calculation this demo\'s crossoverWidths() function performs, and it is the same math you would use to hand-derive the crossover point for any clamp() value you find in production CSS.' },
      { q: 'Should I use vw, vi, or a newer unit like cqi for the preferred argument?', a: 'vw scales against the full browser viewport width regardless of where the element sits in the page. cqi (container query inline-size) instead scales against the nearest ancestor with container-type: inline-size set, making it the better choice for reusable components that may render inside a narrow sidebar or a wide main column — swap the middle argument\'s unit and the rest of the clamp() bounds logic in this demo is unchanged, as shown in the [Container Query Units demo](/ui-snippets/css-container-query-units-demo).' },
      { q: 'Why use rem instead of px for the min and max bounds?', a: 'rem is relative to the root element\'s font-size, which by default is the browser\'s font-size setting (commonly 16px, but user-adjustable in accessibility settings). Using rem for the min and max bounds means a user who has increased their browser\'s default text size for readability still sees a proportionally larger floor and ceiling, whereas hardcoded px bounds would ignore that preference entirely — an important accessibility consideration for fluid type scales.' },
      { q: 'Is CSS clamp() safe to use in production without a fallback in 2026?', a: 'Yes — clamp(), along with min() and max(), has been supported in all major evergreen browsers (Chrome, Edge, Firefox, Safari) since 2020, making it fully production-ready with no polyfill or fallback needed as of 2025/2026. It is one of the most broadly supported modern CSS functions in active use for responsive design.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to walk through the algebra in crossoverWidths() line by line — solving for the exact viewport width where a clamp() value transitions between its locked and fluid zones is a genuinely useful skill to internalize, not just something to copy. You could also ask it to extend the ruler to plot a second, comparison clamp() value alongside the first so you can visually compare two type-scale choices at once, or to add a toggle that swaps the middle argument's unit from vw to cqi and updates all the crossover math to use a container width input instead of window.innerWidth. It's also worth asking it to generate a full six-level heading type scale (h1 through h6) as a set of CSS custom properties, each using this same clamp() pattern with proportionally related min/max bounds.`,
      prompt: `Build an interactive CSS clamp() fluid typography builder in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Three range sliders controlling the three arguments of a font-size: clamp(min, preferred, max) declaration: a minimum bound in a unit that respects the user's root font-size (e.g. rem, converted from a pixel-based slider), a preferred value expressed as a raw vw percentage, and a maximum bound in the same rem-based unit as the minimum.
- A live, read-only text output showing the exact generated CSS string (e.g. font-size: clamp(1.25rem, 4vw, 3.5rem);) that updates immediately as any slider moves.
- A visible heading element whose actual font-size is set to the live clamp() value (not simulated), so resizing the real browser window visibly changes its size according to true CSS clamp() behavior, bounded correctly at the extremes.
- A live numeric readout showing the current real viewport width and the resulting computed font-size in pixels at that width, updated via a window resize listener (not just on slider change).
- A visual "ruler" or bar, spanning a reasonable reference viewport-width range (e.g. 320px to 2200px), split into three colored zones — locked-at-minimum, actively fluid, and locked-at-maximum — with the two zone boundaries computed algebraically from the current min/preferred/max values (solve for the viewport width at which the vw-based preferred value equals the min bound, and separately equals the max bound).
- A marker on the ruler indicating where the browser's actual current width currently falls among the three zones, updated on resize.
- Clearly explain, either in a comment or on-page, why the min/max bounds use a relative unit like rem instead of a fixed px value.`,
    },
  },
};

export default cssClampResponsiveTypeDemo;
