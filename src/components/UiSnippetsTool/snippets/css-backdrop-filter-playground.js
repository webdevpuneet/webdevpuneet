const cssBackdropFilterPlayground = {
  id: 'css-backdrop-filter-playground',
  title: 'CSS backdrop-filter Playground',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="playground">
  <div class="stage">
    <div class="card glass-card" id="glass-card">
      <span class="card-eyebrow">Frosted glass</span>
      <h3>backdrop-filter</h3>
      <p>Blur and saturate everything behind this card, live.</p>
    </div>
  </div>

  <div class="controls">
    <div class="control-row">
      <div class="control-label">
        <span>Blur</span>
        <span class="control-value" id="blur-value">12px</span>
      </div>
      <input type="range" id="blur-slider" min="0" max="40" step="1" value="12" aria-label="Blur amount">
    </div>
    <div class="control-row">
      <div class="control-label">
        <span>Saturate</span>
        <span class="control-value" id="sat-value">150%</span>
      </div>
      <input type="range" id="sat-slider" min="0" max="300" step="5" value="150" aria-label="Saturate amount">
    </div>

    <label class="compare-toggle">
      <input type="checkbox" id="compare-toggle">
      <span>Compare with plain <code>background: rgba(...)</code> (no backdrop-filter)</span>
    </label>

    <div class="code-readout">
      <span class="code-label">CSS value</span>
      <code id="css-output">backdrop-filter: blur(12px) saturate(150%);</code>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; color: #1e293b; }

.playground { max-width: 640px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; gap: 22px; }

.stage {
  border-radius: 20px;
  min-height: 260px;
  display: flex; align-items: center; justify-content: center;
  padding: 32px;
  background:
    radial-gradient(circle at 20% 20%, #f472b6, transparent 55%),
    radial-gradient(circle at 80% 30%, #60a5fa, transparent 55%),
    radial-gradient(circle at 50% 85%, #fbbf24, transparent 55%),
    linear-gradient(135deg, #818cf8, #6366f1);
  position: relative;
}

.card {
  width: 260px;
  border-radius: 16px;
  padding: 24px 22px;
  color: #fff;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
}

.glass-card {
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  transition: backdrop-filter 0.05s linear;
}

.glass-card.flat {
  background: rgba(30,30,46,0.55);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: 1px solid rgba(255,255,255,0.12);
}

.card-eyebrow { display: block; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.85; margin-bottom: 6px; }
.card h3 { font-size: 19px; font-weight: 700; margin-bottom: 8px; }
.card p { font-size: 13px; line-height: 1.6; opacity: 0.92; }

.controls { display: flex; flex-direction: column; gap: 18px; background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.control-row { display: flex; flex-direction: column; gap: 8px; }
.control-label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: #334155; }
.control-value { color: #6366f1; font-variant-numeric: tabular-nums; }

input[type="range"] {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 6px; border-radius: 4px; background: #e2e8f0; outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
  background: #6366f1; cursor: pointer; border: 3px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
}
input[type="range"]::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%; background: #6366f1; cursor: pointer;
  border: 3px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.25);
}

.compare-toggle { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569; cursor: pointer; }
.compare-toggle input { width: 16px; height: 16px; accent-color: #6366f1; }
.compare-toggle code { background: #f1f5f9; padding: 1px 6px; border-radius: 4px; font-size: 11.5px; color: #6366f1; }

.code-readout { display: flex; align-items: center; gap: 10px; background: #0f172a; color: #e2e8f0; padding: 10px 16px; border-radius: 10px; font-size: 12.5px; flex-wrap: wrap; }
.code-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; font-weight: 600; }
.code-readout code { font-family: 'SFMono-Regular', Consolas, monospace; color: #a5b4fc; word-break: break-all; }`,

  js: `const blurSlider = document.getElementById('blur-slider');
const satSlider = document.getElementById('sat-slider');
const blurValue = document.getElementById('blur-value');
const satValue = document.getElementById('sat-value');
const glassCard = document.getElementById('glass-card');
const cssOutput = document.getElementById('css-output');
const compareToggle = document.getElementById('compare-toggle');

function update() {
  const blur = blurSlider.value;
  const sat = satSlider.value;

  blurValue.textContent = blur + 'px';
  satValue.textContent = sat + '%';

  const filterValue = 'blur(' + blur + 'px) saturate(' + sat + '%)';

  if (!compareToggle.checked) {
    glassCard.style.backdropFilter = filterValue;
    glassCard.style.webkitBackdropFilter = filterValue;
    cssOutput.textContent = 'backdrop-filter: ' + filterValue + ';';
  }
}

compareToggle.addEventListener('change', () => {
  const flat = compareToggle.checked;
  glassCard.classList.toggle('flat', flat);

  if (flat) {
    // No backdrop-filter at all -- just a semi-opaque flat background,
    // the pre-backdrop-filter technique for "translucent" panels.
    cssOutput.textContent = 'background: rgba(30, 30, 46, 0.55); /* no backdrop-filter */';
    blurSlider.disabled = true;
    satSlider.disabled = true;
  } else {
    blurSlider.disabled = false;
    satSlider.disabled = false;
    update();
  }
});

blurSlider.addEventListener('input', update);
satSlider.addEventListener('input', update);

update();`,

  seo: {
    title: 'CSS backdrop-filter Playground — Free HTML CSS JS Snippet',
    description: 'Interactive frosted-glass card demo with live blur and saturate sliders, plus a flat rgba comparison toggle. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS backdrop-filter Playground — Real-Time Frosted Glass with blur() and saturate()',
      description: `The "frosted glass" look — a translucent panel that blurs and enriches whatever sits behind it, like macOS's Control Center or iOS's Control Panel — was, for years, impossible to reproduce faithfully on the web. Developers approximated it with a semi-transparent \`background: rgba(...)\` color, which dims what's behind a panel but never actually blurs it, producing a flat, muddy look nothing like real frosted glass. The \`backdrop-filter\` CSS property, standardized in the CSS Filter Effects Module Level 2 spec, closes that gap by applying filter functions — the same \`blur()\`, \`saturate()\`, \`brightness()\`, \`contrast()\`, and others already available via the regular \`filter\` property — directly to whatever content is rendered **behind** an element, rather than to the element's own contents.

**How backdrop-filter differs from filter**

The standard \`filter\` property (also part of Filter Effects) applies its functions to an element and its own descendants — blur a \`filter: blur(8px)\` div and everything drawn inside that div gets blurry, but the page behind it stays crisp. \`backdrop-filter\` inverts this: the element itself (and its content) stays perfectly sharp, while the filter is applied to a snapshot of whatever is rendered underneath it, continuously, as that background content scrolls, animates, or changes. This is what makes it possible to have perfectly legible white text sitting on top of a blurred, colorful background simultaneously — something the regular \`filter\` property alone could never achieve, because blurring the container would blur the text right along with it.

**Why blur() and saturate() are used together**

A frosted-glass effect almost always combines two filter functions in the same declaration: \`blur(Npx)\` softens the fine detail of whatever is behind the panel into indistinct color fields, while \`saturate(P%)\` (values above 100% intensify color vividness) compensates for the perceptual "washing out" that blurring alone tends to cause, keeping the glass panel feeling vibrant rather than murky. Real operating system implementations of this effect (Apple's \`UIVisualEffectView\`, Windows' Acrylic material) use this exact blur-plus-saturate combination internally, which is why matching both properties together, rather than blur alone, is what actually reads as "glass" instead of just "blurry."

**Technical implementation and browser support**

Under the hood, applying \`backdrop-filter\` to an element creates a new stacking context and forces the browser to continuously re-composite a filtered copy of the background layer beneath that element on every frame it's visible — a genuinely expensive GPU operation compared to a static \`rgba()\` background, which is one reason it's best reserved for a small number of prominent UI surfaces (a nav bar, a modal, a floating card) rather than applied broadly across a page. Support has existed in Safari since version 9 (with the \`-webkit-\` prefix still recommended alongside the unprefixed property for maximum compatibility) and in Chrome/Edge since version 76; Firefox shipped unprefixed support in version 103 (2022), meaning as of 2025/2026 it is safe to use in production for any project that doesn't need to support genuinely ancient browser versions, especially when paired with a plain \`background-color\` fallback for the rare unsupported client.

**What this playground demonstrates**

Two sliders build a live \`backdrop-filter: blur(Npx) saturate(P%)\` declaration applied directly to a card floating over a deliberately busy, multi-color radial-gradient background, so the blur and saturation effects are immediately obvious against the colorful backdrop. The exact generated CSS string is echoed as literal text so you can copy it straight into a stylesheet. A comparison toggle swaps the card to a "flat" mode using only \`background: rgba(30,30,46,0.55)\` with \`backdrop-filter: none\` — visually, the flat card simply darkens the busy background uniformly, with all of its color and detail still sharply visible through the translucency, while the frosted card genuinely obscures fine background detail into soft color fields, which is the entire visual and functional difference the two techniques exist to communicate.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag the Blur slider', text: 'The #blur-slider ranges from 0 to 40 and maps directly to the pixel value inside blur() in the generated backdrop-filter declaration. At 0px the card is fully transparent with a sharp background visible through it; as the value increases, background detail smooths into soft color fields.' },
        { title: 'Drag the Saturate slider', text: 'The #sat-slider ranges from 0 to 300 percent and maps to saturate() in the same declaration. Below 100% the blurred background desaturates toward gray; above 100% (the demo\'s 150% default) colors intensify, which is what keeps a heavily blurred panel still feeling vivid rather than washed out.' },
        { title: 'Read the generated CSS string', text: 'The #css-output element mirrors the exact backdrop-filter declaration currently applied to #glass-card, formatted as valid CSS text, ready to copy into your own stylesheet alongside the required -webkit-backdrop-filter duplicate for Safari.' },
        { title: 'Toggle the flat rgba comparison', text: 'Check "Compare with plain background: rgba(...)" to swap the card into .flat mode, which sets backdrop-filter: none and relies solely on a semi-opaque rgba(30,30,46,0.55) background color. Both sliders disable themselves in this mode since there is no filter left to adjust.' },
        { title: 'Compare the two techniques directly', text: 'Toggle back and forth between frosted and flat mode over the same busy multi-color gradient background to see the core difference: the flat rgba card dims the background uniformly while keeping every detail sharp, whereas the frosted glass card genuinely blurs fine detail while staying vibrant, which is the whole reason backdrop-filter exists.' },
        { title: 'Apply -webkit- prefix and a fallback in production', text: 'Always declare both backdrop-filter and -webkit-backdrop-filter with identical values (Safari still requires the prefix), and set a fallback background-color for browsers with no support at all, so the panel remains legibly translucent even where the blur itself silently does nothing.' },
      ],
    },
    features: [
      'Live backdrop-filter: blur(Npx) saturate(P%) string generation from two range inputs, applied via element.style.backdropFilter',
      'Multi-color radial-gradient stage background specifically designed to make blur and saturation shifts visually obvious',
      'Frosted-vs-flat comparison toggle swapping backdrop-filter: none plus rgba() background against the live filtered version',
      'Disabled-state sliders when the flat comparison mode is active, communicating that there is no filter to adjust',
      'Both unprefixed backdrop-filter and -webkit-backdrop-filter set together in both CSS and JS for Safari compatibility',
      'Tabular-numeric live value readouts next to each slider label for precise value tracking while dragging',
      'Custom-styled range slider thumbs with cross-browser -webkit- and -moz- pseudo-element rules',
      'Semi-transparent card border (rgba(255,255,255,0.3)) reinforcing the glass-edge highlight common to real frosted-glass UI',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Designing a frosted-glass navigation bar or modal', desc: 'Use the sliders to dial in a blur and saturate combination that reads as vibrant glass rather than muddy translucency, then copy the resulting backdrop-filter string directly into a fixed-position nav bar or modal overlay so page content stays legible while scrolling content blurs softly beneath it.' },
      { icon: 'CODE', title: 'Building a performant glass-morphism component library', desc: 'Because backdrop-filter is GPU-intensive, use this playground to find the minimum blur radius that still reads convincingly as glass before committing a value to a shared component, avoiding needlessly high blur values that increase paint cost on lower-powered devices without an additional visual benefit.' },
      { icon: 'LEARN', title: 'Teaching the difference between filter and backdrop-filter', desc: 'This playground is a direct, interactive way to demonstrate that filter blurs an element\'s own content while backdrop-filter blurs only what is rendered behind it, letting text stay perfectly sharp on top of a blurred backdrop — a distinction that is much clearer shown live than described in text.' },
      { icon: 'APP', title: 'Prototyping OS-style UI chrome for a web app', desc: 'Apps that want to evoke native macOS or iOS chrome (a floating command palette, a translucent sidebar, a settings sheet) can use the exact blur-plus-saturate combination demonstrated here as a starting point, since it mirrors the internal recipe used by Apple\'s own UIVisualEffectView materials.' },
      { icon: 'FLOW', title: 'Justifying a design decision to a team with a fallback plan', desc: 'Use the flat-vs-frosted toggle in a design review to show stakeholders exactly what browsers or devices without backdrop-filter support will see (the flat rgba() fallback) versus what modern browsers render, helping the team make an informed call about whether the visual gap is acceptable for their audience.' },
      { icon: 'FORM', title: 'Auditing accessibility and legibility of glass UI over photos', desc: 'Drag saturate down toward 0% while keeping blur high to preview how a frosted card would look if its host page needs a more muted, accessible aesthetic, or push blur higher to confirm text contrast remains sufficient over a genuinely busy background image rather than a flat gradient.' },
      { icon: 'CODE', title: 'Related: Live Edit Presence', desc: 'See the [Live Edit Presence](/ui-snippets/live-edit-presence/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between filter and backdrop-filter?', a: 'filter applies its functions (blur, saturate, brightness, etc.) to an element and everything rendered inside it — blurring a filter: blur(8px) container blurs its own text and children too. backdrop-filter applies the same functions only to whatever is rendered behind the element, leaving the element\'s own content perfectly sharp, which is what allows crisp white text to sit legibly on top of a heavily blurred, colorful background simultaneously.' },
      { q: 'Do I need the -webkit- prefix for backdrop-filter in 2026?', a: 'Yes, still — Safari requires -webkit-backdrop-filter alongside the unprefixed backdrop-filter property even in recent versions, so production CSS should always declare both with identical values: -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%);. Chrome, Edge, and Firefox have supported the unprefixed property for years and do not need the prefix, but including it is harmless and keeps Safari users fully covered.' },
      { q: 'Why does the frosted card look different from the flat rgba() card at the same opacity?', a: 'The flat card only dims the background uniformly through a semi-transparent color layer — every pixel of detail behind it, sharp edges and all, is still visible, just darkened or tinted. The frosted card actually resamples and blurs the pixels behind it before compositing, destroying fine detail into soft color fields, which is a fundamentally different rendering operation and the entire reason backdrop-filter exists rather than just using a translucent background.' },
      { q: 'Is backdrop-filter expensive for performance?', a: 'Yes, relatively — because the browser must continuously composite a filtered copy of everything behind the element, including as that background scrolls or animates, backdrop-filter is more GPU-intensive than a static background-color. Best practice is to apply it to a small number of prominent, mostly-static surfaces (a nav bar, a modal, a card) rather than broadly across many elements or large scrolling regions, and to keep blur radii as low as visually necessary.' },
      { q: 'Can I combine backdrop-filter with other filter functions besides blur and saturate?', a: 'Yes — backdrop-filter accepts the full CSS filter function list, including brightness(), contrast(), grayscale(), hue-rotate(), and invert(), and you can chain multiple functions in one declaration exactly as this demo chains blur() and saturate(), for example backdrop-filter: blur(10px) brightness(1.1) contrast(0.95) for a slightly brighter, softer glass variant.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why backdrop-filter keeps the card's own text sharp while blurring only the background, and how that differs mechanically from the regular filter property. You could also ask it to add a third slider for brightness() or contrast() and have it explain how chaining additional filter functions changes the generated CSS string in update(). It's also a good candidate for extension: ask the assistant to add a real background photograph instead of the CSS gradient stage, wire up a "copy CSS" button next to the code readout, or add a second glass card so you can compare two different blur/saturate combinations side by side. Treat the demo as a working reference to interrogate and build on, not a finished black box.`,
      prompt: `Build an interactive frosted-glass CSS backdrop-filter playground in plain HTML, CSS, and JavaScript.

Requirements:
- A visually busy, multi-color background (a layered CSS gradient or similar) behind a floating card, chosen specifically so blur and saturation changes are obvious against it.
- Two range sliders controlling a blur radius in pixels (0-40) and a saturation percentage (0-300), each wired with an input event listener that rebuilds a backdrop-filter: blur(Npx) saturate(P%) value and applies it live to the card via both backdropFilter and webkitBackdropFilter inline style properties.
- A text readout that always displays the exact, currently-applied backdrop-filter CSS declaration as copyable code.
- A toggle that swaps the card into a "flat" comparison mode using backdrop-filter: none and a plain semi-transparent rgba() background color instead, disabling the sliders while in that mode since there is nothing left to adjust, so the user can directly compare frosted glass against the older flat-translucency technique on the identical background.
- Live-updating numeric labels next to each slider showing its current value with correct units (px for blur, % for saturate).
- Both the unprefixed backdrop-filter and the -webkit-backdrop-filter properties set together everywhere the effect is applied, for Safari compatibility, with a short code comment explaining why the prefix is still required.
- Custom-styled range slider thumbs with a visible focus state for keyboard accessibility.`,
    },
  },
};

export default cssBackdropFilterPlayground;
