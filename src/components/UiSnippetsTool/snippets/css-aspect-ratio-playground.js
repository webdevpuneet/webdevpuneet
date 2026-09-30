const cssAspectRatioPlayground = {
  id: 'css-aspect-ratio-playground',
  title: 'CSS aspect-ratio Playground',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="playground">
  <div class="controls">
    <div class="control-group">
      <span class="control-label">aspect-ratio value</span>
      <div class="ratio-buttons" id="ratio-buttons">
        <button class="ratio-btn active" data-ratio="16/9">16 / 9</button>
        <button class="ratio-btn" data-ratio="1/1">1 / 1</button>
        <button class="ratio-btn" data-ratio="4/3">4 / 3</button>
        <button class="ratio-btn" data-ratio="21/9">21 / 9</button>
        <button class="ratio-btn" data-ratio="auto">auto</button>
      </div>
    </div>
    <div class="control-group">
      <div class="control-label-row">
        <span class="control-label">Container width</span>
        <span class="control-value" id="width-value">280px</span>
      </div>
      <input type="range" id="width-slider" min="120" max="480" step="4" value="280" aria-label="Container width">
    </div>
  </div>

  <div class="boxes-row">
    <div class="box-card">
      <div class="box-card-label">
        <span>Modern: <code>aspect-ratio</code></span>
      </div>
      <div class="media-box" id="media-box">
        <span class="box-content">16 / 9</span>
      </div>
      <code class="css-line" id="css-line">aspect-ratio: 16 / 9;</code>
    </div>

    <div class="box-card">
      <div class="box-card-label">
        <span>Legacy: padding-top hack</span>
      </div>
      <div class="legacy-outer" id="legacy-outer">
        <div class="legacy-pad" id="legacy-pad"></div>
        <div class="legacy-content">
          <span class="box-content">16 / 9</span>
        </div>
      </div>
      <code class="css-line" id="legacy-css-line">padding-top: 56.25%;</code>
    </div>
  </div>

  <div class="explain-note">
    <strong>Why aspect-ratio wins:</strong> the padding-top hack needs a wrapper, an absolutely-positioned inner element, and a manually pre-calculated percentage (height &divide; width &times; 100) that breaks the moment you change the ratio. <code>aspect-ratio</code> is one line, applies directly to the element, works with intrinsic content, and updates instantly &mdash; try switching to <code>auto</code> to see the modern box fall back to its content's natural size while the legacy box stays locked to its last percentage.
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; color: #1e293b; }

.playground { max-width: 720px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; gap: 26px; }

.controls { background: #fff; border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 18px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.control-group { display: flex; flex-direction: column; gap: 10px; }
.control-label { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #64748b; }
.control-label-row { display: flex; justify-content: space-between; align-items: center; }
.control-value { font-size: 13px; font-weight: 600; color: #6366f1; font-variant-numeric: tabular-nums; }

.ratio-buttons { display: flex; flex-wrap: wrap; gap: 8px; }
.ratio-btn {
  font-family: inherit; font-size: 13px; font-weight: 600;
  padding: 8px 16px; border-radius: 8px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #475569; cursor: pointer; transition: all 0.15s;
}
.ratio-btn:hover { border-color: #a5b4fc; color: #4f46e5; }
.ratio-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }

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

.boxes-row { display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }
.box-card { display: flex; flex-direction: column; gap: 10px; align-items: center; }
.box-card-label { font-size: 12.5px; color: #64748b; font-weight: 600; }
.box-card-label code { background: #f1f5f9; padding: 1px 6px; border-radius: 4px; color: #6366f1; }

.media-box {
  width: 280px;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #818cf8, #6366f1);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(99,102,241,0.25);
  transition: width 0.05s linear, aspect-ratio 0.25s ease;
}

/* Legacy padding-top hack: needs a wrapper + absolutely positioned inner content */
.legacy-outer {
  width: 280px;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(135deg, #94a3b8, #64748b);
  box-shadow: 0 8px 24px rgba(100,116,139,0.25);
  transition: width 0.05s linear;
}
.legacy-pad { padding-top: 56.25%; }
.legacy-content {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}

.box-content { color: #fff; font-weight: 700; font-size: 14px; text-shadow: 0 1px 4px rgba(0,0,0,0.2); }

.css-line { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12px; background: #0f172a; color: #a5b4fc; padding: 6px 12px; border-radius: 8px; }

.explain-note { background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 12px; padding: 16px 18px; font-size: 12.5px; color: #4338ca; line-height: 1.65; }
.explain-note code { background: rgba(99,102,241,0.12); padding: 1px 6px; border-radius: 4px; font-family: 'SFMono-Regular', Consolas, monospace; }`,

  js: `const ratioButtons = document.querySelectorAll('.ratio-btn');
const mediaBox = document.getElementById('media-box');
const cssLine = document.getElementById('css-line');
const legacyPad = document.getElementById('legacy-pad');
const legacyCssLine = document.getElementById('legacy-css-line');
const widthSlider = document.getElementById('width-slider');
const widthValue = document.getElementById('width-value');
const legacyOuter = document.getElementById('legacy-outer');
const boxContentLabels = document.querySelectorAll('.box-content');

// Manual conversion needed only for the legacy padding-top hack:
// percentage = (height / width) * 100
function ratioToPaddingPercent(ratioStr) {
  const [w, h] = ratioStr.split('/').map(Number);
  return (h / w) * 100;
}

function applyRatio(ratioStr) {
  if (ratioStr === 'auto') {
    mediaBox.style.aspectRatio = 'auto';
    mediaBox.style.height = '160px'; // give the "natural content size" something to show
    cssLine.textContent = 'aspect-ratio: auto;';
    // The legacy hack has no equivalent "auto" \\u2014 it stays pinned to its
    // last computed percentage, which is exactly the point being illustrated.
    boxContentLabels.forEach(el => { el.textContent = 'auto (natural size)'; });
    return;
  }

  mediaBox.style.height = '';
  mediaBox.style.aspectRatio = ratioStr;
  cssLine.textContent = 'aspect-ratio: ' + ratioStr + ';';

  const percent = ratioToPaddingPercent(ratioStr);
  legacyPad.style.paddingTop = percent + '%';
  legacyCssLine.textContent = 'padding-top: ' + percent.toFixed(2) + '%;';

  boxContentLabels.forEach(el => { el.textContent = ratioStr.replace('/', ' / '); });
}

ratioButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    ratioButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyRatio(btn.dataset.ratio);
  });
});

widthSlider.addEventListener('input', () => {
  const w = widthSlider.value + 'px';
  widthValue.textContent = w;
  mediaBox.style.width = w;
  legacyOuter.style.width = w;
});

applyRatio('16/9');`,

  seo: {
    title: 'CSS aspect-ratio Playground — Free HTML CSS JS Snippet',
    description: 'Interactive demo comparing the modern aspect-ratio property against the classic padding-top percentage hack, live. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS aspect-ratio Playground — Modern Ratio Boxes vs the Legacy Padding-Top Hack',
      description: `Maintaining a fixed width-to-height ratio on an element — a video embed, a thumbnail, a card image — used to require one of CSS's cleverest, and ugliest, workarounds. The \`aspect-ratio\` property, standardized in CSS Box Sizing Module Level 4 and supported in every major browser since 2021, replaces that entire workaround with a single declaration. This playground puts both techniques side by side so you can see exactly what problem \`aspect-ratio\` solves and why it was worth waiting for.

**The old problem: percentages in CSS are relative to width, not height**

Historically there was no way to say "make this box's height a fraction of its width" directly. The workaround exploited a specific, slightly obscure quirk of the CSS box model: when you set \`padding-top\` (or \`padding-bottom\`) as a percentage, that percentage is always resolved against the element's own **width**, never its height, even for vertical padding. Developers hijacked this quirk to build a fixed-ratio box: wrap the ratio target in an empty div, give that div \`padding-top: 56.25%\` (the height-to-width ratio of 16:9, i.e. 9 &divide; 16 &times; 100), and the padding itself becomes exactly the right height because it's a percentage of the parent's width. Since padding takes up space but isn't itself content, you then need a second, absolutely-positioned inner wrapper (\`position: absolute; inset: 0\`) to actually hold your real content on top of that padding, with the outer element set to \`position: relative; overflow: hidden\`. That's a minimum of three nested elements and one manually pre-calculated percentage just to get a 16:9 box.

**Why the hack is fragile**

Every time the target ratio changes, someone has to recompute the percentage by hand — \`height / width * 100\` — and there's no way to express "auto" or "fall back to natural size" once the hack is in place; the box stays locked to whatever percentage was last set, permanently divorced from the element's actual content. It also doesn't compose well with intrinsic sizing: if the box needs to size itself from its content in some states and hold a fixed ratio in others, you need JavaScript to toggle inline styles, because the CSS itself has no escape hatch.

**How aspect-ratio actually works**

\`aspect-ratio: 16 / 9\` (or the equivalent unitless \`aspect-ratio: 1.7778\`) tells the browser directly: derive this dimension from that one using the given ratio. It participates in the browser's normal sizing algorithm as a **preferred aspect ratio** — if you specify an explicit width, the browser computes height from the ratio; if you specify height, width is derived instead; if neither is constrained, both come from content as usual. Critically, \`aspect-ratio: auto\` is a real, valid value meaning "no forced ratio, size from content or replaced-element intrinsics" (this is actually the property's default, and it's why \`<img>\` and \`<video>\` elements already respect their natural width/height ratio without any extra CSS). This single declaration replaces the entire three-element hack, requires no manual percentage math, and updates instantly if you change the ratio via a CSS custom property, a media query, or JavaScript — no absolute positioning, no wrapper divs, no \`overflow: hidden\` needed just to keep clipped padding under control.

**What this playground demonstrates**

Five preset buttons switch a live media box between \`16/9\`, \`1/1\`, \`4/3\`, \`21/9\`, and \`auto\`, applying the value directly via \`element.style.aspectRatio\` and echoing the exact CSS declaration as text. A width slider resizes the box's container in real time so you can see the height recompute automatically at every width, exactly the behavior a responsive image grid or video gallery relies on. Beside it, a second box built with the classic padding-top technique mirrors the same ratio, with its percentage recalculated on every button click via \`(height / width) * 100\`, so you can watch both approaches update side by side — and notice that switching the modern box to \`auto\` lets it snap to a natural content height, while the legacy box has no equivalent state and simply keeps whatever percentage it was last given.

**When you still need the fallback**

\`aspect-ratio\` support (Chrome 88+, Firefox 89+, Safari 15+) covers effectively all production browser traffic as of 2025/2026, so the padding-top hack is now legacy knowledge worth understanding for maintaining older codebases rather than a pattern to reach for in new work.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Switch between ratio presets', text: 'Click any button in #ratio-buttons (16/9, 1/1, 4/3, 21/9, or auto). The applyRatio() function sets mediaBox.style.aspectRatio to that exact string and updates the #css-line text to show the literal CSS declaration being applied.' },
        { title: 'Drag the width slider', text: 'The #width-slider input, ranging 120px to 480px, sets both box-card widths live via an input event listener. Watch the modern aspect-ratio box recompute its height automatically at every width value with no JavaScript height calculation needed.' },
        { title: 'Compare against the legacy padding-top box', text: 'The second card reproduces the classic hack: an empty .legacy-pad element whose padding-top percentage is recalculated in JS via ratioToPaddingPercent() every time you change the ratio, and a separately positioned .legacy-content layer holds the visible label on top of it.' },
        { title: 'Select "auto" to see the key difference', text: 'Clicking the auto button sets the modern box to aspect-ratio: auto and gives it an explicit fallback height to represent natural content sizing, while the legacy box has no equivalent concept of auto and simply retains whatever padding percentage was last computed.' },
        { title: 'Read the generated CSS strings', text: 'Both .css-line elements always mirror the exact, currently active declaration — aspect-ratio: 16 / 9; on the modern box and padding-top: 56.25%; on the legacy box — so you can copy either directly into a stylesheet or compare their literal syntax weight.' },
        { title: 'Apply the pattern to real media', text: 'In production, replace the gradient placeholder in .media-box with a real <img> or <video> and add object-fit: cover so the media fills the ratio box without distortion, which is the standard combination for responsive video embeds and image galleries.' },
      ],
    },
    features: [
      'Five preset aspect-ratio values (16/9, 1/1, 4/3, 21/9, auto) applied live via element.style.aspectRatio',
      'Live-generated CSS text readout showing the exact aspect-ratio and padding-top declarations in use',
      'Side-by-side legacy padding-top hack rebuilt faithfully with a wrapper, absolute inner layer, and overflow: hidden',
      'Automatic percentage recalculation for the legacy box via ratioToPaddingPercent(): (height / width) * 100',
      'Width slider demonstrating that aspect-ratio recomputes height responsively with zero JS resize logic',
      '"auto" preset demonstrating aspect-ratio\'s real fallback-to-content-size behavior with no legacy equivalent',
      'Active-state ratio buttons with a toggled .active class for clear current-selection feedback',
      'Custom-styled range slider thumb with cross-browser -webkit- and -moz- pseudo-elements',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Building responsive video and image galleries without layout shift', desc: 'Applying aspect-ratio directly to an <img> or an <iframe> wrapper (for embedded YouTube videos) reserves the correct box space before the media finishes loading, preventing the cumulative layout shift that hurts Core Web Vitals scores — the exact technique demonstrated by the modern box in this playground responding instantly to the width slider.' },
      { icon: 'CODE', title: 'Migrating a legacy component off the padding-top hack', desc: 'Use the side-by-side comparison to audit an older codebase for the three-element wrapper pattern (outer relative, padding-top spacer, absolute inner content) and replace it with a single aspect-ratio declaration on the actual content element, removing the wrapper divs and absolute positioning entirely.' },
      { icon: 'LEARN', title: 'Teaching why percentage padding resolves against width', desc: 'This playground is a concrete teaching tool for one of CSS\'s more surprising box-model rules — that padding-top and padding-bottom percentages are always relative to the containing block\'s width, never its height — by showing the manual percentage math (height / width * 100) happening live as you switch ratio presets.' },
      { icon: 'APP', title: 'Designing consistent card grids with mixed media types', desc: 'Set aspect-ratio: 1/1 or 4/3 uniformly across a grid of product or profile cards so every tile holds the same shape regardless of the natural dimensions of the underlying photo, combined with object-fit: cover on the inner image to crop rather than distort.' },
      { icon: 'FORM', title: 'Prototyping embed dimensions before shipping a video player', desc: 'Cycle through the 16/9, 21/9, and 4/3 presets to preview how a video embed or hero banner will look at different standard broadcast and cinematic ratios before committing to a final aspect ratio in a production layout.' },
      { icon: 'FLOW', title: 'Explaining a CSS code review comment about layout shift', desc: 'Link a teammate to this playground when reviewing a PR that still uses the padding-top hack, letting them see interactively why swapping to aspect-ratio removes two DOM nodes and a fragile manual percentage while behaving identically — a faster path to agreement than explaining it in a text comment.' },
      { icon: 'CODE', title: 'Related: Native CSS Nesting Playground', desc: 'See the [Native CSS Nesting Playground](/ui-snippets/css-nesting-playground/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What browsers support the CSS aspect-ratio property?', a: 'aspect-ratio has shipped in Chrome/Edge since version 88 (January 2021), Firefox since version 89 (June 2021), and Safari since version 15 (September 2021), giving it effectively universal coverage in production traffic as of 2025/2026. No vendor prefix or fallback is required for modern projects; the padding-top hack is now only relevant for maintaining pre-2021-era codebases.' },
      { q: 'How is aspect-ratio different from setting both width and height directly?', a: 'Setting fixed width and height locks both dimensions absolutely, which breaks responsiveness — the box can\'t shrink proportionally in a fluid layout. aspect-ratio instead lets you constrain just one dimension explicitly (or neither) and derives the other automatically, so a box with width: 100% and aspect-ratio: 16/9 keeps a correct height at every possible container width, which is exactly what the width slider in this demo illustrates.' },
      { q: 'Does aspect-ratio work with <img> and <video> elements directly?', a: 'Yes, and it is one of the most valuable uses: applying aspect-ratio (matching the image\'s natural intrinsic ratio, or a custom crop ratio) directly to an <img> tag, combined with object-fit: cover, reserves the correct layout space before the image downloads and finishes decoding, which is a standard technique for eliminating layout shift and improving Core Web Vitals\' Cumulative Layout Shift metric.' },
      { q: 'What does aspect-ratio: auto actually do?', a: 'auto is the property\'s default value and means the element uses its natural, content-derived size with no ratio constraint imposed — for replaced elements like <img> or <video> that means their intrinsic width-to-height ratio, and for other elements it means ordinary content-based sizing. This demo\'s auto preset shows the modern box falling back to a natural size, in contrast with the legacy padding-top box, which has no concept of "auto" and simply keeps its last manually-computed percentage forever.' },
      { q: 'Can I combine aspect-ratio with min-height or max-height?', a: 'Yes — if both an explicit aspect-ratio and a conflicting min-height or max-height apply, the browser resolves the conflict by respecting the min/max constraint first and using aspect-ratio only for the dimension left unconstrained, which is useful for a hero banner that should hold a 21/9 ratio on wide screens but never exceed a fixed max-height on very large viewports.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain step by step why the legacy padding-top box needs three nested elements while the modern aspect-ratio box needs only one, referencing the specific ratioToPaddingPercent() calculation used here. You could also ask it to add a sixth custom ratio option driven by two number inputs (width units and height units) that builds an arbitrary aspect-ratio: W / H string dynamically. It's also useful for extension: ask the assistant to add object-fit: cover behavior with a real background image so the demo more closely mirrors a production video thumbnail, or to add a CSS custom property (like --ratio) so both the modern and legacy boxes could theoretically share a single source of truth. Use the code as a live reference to question and build on, not a finished black box.`,
      prompt: `Build an interactive playground in plain HTML, CSS, and JavaScript comparing the modern CSS aspect-ratio property against the classic padding-top percentage hack.

Requirements:
- A row of preset buttons for common ratios (16/9, 1/1, 4/3, 21/9) plus an "auto" option, where clicking a button applies that value live to a "modern" box using element.style.aspectRatio and marks the button active.
- A text readout that always shows the exact currently-applied aspect-ratio CSS declaration as literal copyable code.
- A second "legacy" box built using the real three-part padding-top technique: an outer relatively-positioned wrapper, an inner empty element whose padding-top percentage is manually computed in JavaScript from the same selected ratio (height divided by width, times 100), and an absolutely-positioned content layer on top holding the visible label.
- A width slider that resizes both boxes' containers simultaneously in real time, so the user can see the modern box's height recompute automatically at every width with no JavaScript height calculation, while the legacy box's percentage-based padding also resolves correctly against its new width.
- Selecting "auto" must visibly demonstrate the key behavioral difference: the modern box falls back to a natural, content-derived size, while the legacy box has no equivalent state and simply retains whatever percentage was last computed.
- A short written explanation on the page describing, in plain language, why percentage padding-top is relative to an element's width (not height) and how that quirk was historically exploited to fake aspect ratios before the aspect-ratio property existed.`,
    },
  },
};

export default cssAspectRatioPlayground;
