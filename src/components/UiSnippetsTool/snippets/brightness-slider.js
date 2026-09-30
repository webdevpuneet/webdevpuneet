const brightnessSlider = {
  id: 'brightness-slider',
  title: 'Brightness Slider',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="br-card">
  <div class="br-preview" id="brPreview">
    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='150'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23f97316'/><stop offset='.5' stop-color='%23db2777'/><stop offset='1' stop-color='%236d28d9'/></linearGradient></defs><rect width='320' height='150' fill='url(%23g)'/><circle cx='250' cy='45' r='26' fill='%23fde68a'/></svg>" alt="Preview">
  </div>
  <div class="br-control">
    <span class="br-ico br-min">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle></svg>
    </span>
    <input type="range" id="brRange" min="20" max="160" value="100" aria-label="Brightness">
    <span class="br-ico br-max" id="brSun">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="4.9" y1="4.9" x2="7" y2="7"></line><line x1="17" y1="17" x2="19.1" y2="19.1"></line><line x1="4.9" y1="19.1" x2="7" y2="17"></line><line x1="17" y1="7" x2="19.1" y2="4.9"></line></svg>
    </span>
  </div>
  <div class="br-value" id="brValue">100%</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.br-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:20px;width:100%;max-width:340px}

.br-preview{border-radius:11px;overflow:hidden;margin-bottom:20px;line-height:0;background:#0f172a}
.br-preview img{width:100%;height:auto;display:block;filter:brightness(1);transition:filter .12s linear}

.br-control{display:flex;align-items:center;gap:12px}
.br-ico{flex-shrink:0;color:#94a3b8;display:flex}
.br-ico svg{width:18px;height:18px}
.br-max svg{width:22px;height:22px;transition:transform .15s,color .15s,filter .2s}
.br-max.bright svg{color:#fde68a;filter:drop-shadow(0 0 6px rgba(253,224,107,.7))}

.br-control input[type=range]{flex:1;-webkit-appearance:none;appearance:none;height:6px;border-radius:4px;background:linear-gradient(90deg,#1e293b,#fde68a);outline:none;cursor:pointer}
.br-control input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid #f59e0b;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.4)}
.br-control input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:2px solid #f59e0b;cursor:pointer}

.br-value{text-align:center;font-size:13px;font-weight:800;color:#cbd5e1;margin-top:14px;font-variant-numeric:tabular-nums}`,

  js: `var range = document.getElementById('brRange');
var img = document.querySelector('.br-preview img');
var value = document.getElementById('brValue');
var sun = document.getElementById('brSun');

function paint() {
  var raw = Number(range.value);          // 20..160
  var factor = raw / 100;                  // 0.2 .. 1.6 for CSS filter
  img.style.filter = 'brightness(' + factor + ')';
  value.textContent = raw + '%';

  // The sun icon scales with brightness and glows past 100%.
  var scale = 0.75 + (raw / 160) * 0.55;   // ~0.78 .. 1.3
  sun.querySelector('svg').style.transform = 'scale(' + scale.toFixed(3) + ')';
  sun.classList.toggle('bright', raw > 100);
}

range.addEventListener('input', paint);
paint();`,

  seo: {
    title: 'Brightness Slider — Free CSS Filter Control JS Snippet',
    description: `A brightness slider that dims a live preview with the CSS brightness() filter, a gradient track, and a sun icon that glows. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Brightness Slider — Live CSS brightness() Filter Control',
      description: `A brightness slider lets a user dim or brighten an image, screen preview, or theme — the control in photo editors, display settings, and reading apps. This snippet wires a range input to the CSS \`brightness()\` filter so a preview updates live, with a gradient track and a sun icon that grows and glows as you push past full brightness. It's pure HTML, CSS, and vanilla JavaScript with no canvas and no dependency.

**brightness() does the heavy lifting**

The whole effect is one CSS filter: \`filter: brightness(factor)\`, where \`1\` is the original, below \`1\` darkens, and above \`1\` over-brightens. The slider's raw 20–160 value is divided by 100 to produce a \`0.2\`–\`1.6\` factor, so the range covers a meaningful dimming-to-blown-out span. A short \`transition\` on the filter keeps dragging buttery rather than steppy, and because it's GPU-composited it stays smooth even on large images.

**A gradient track that reads as brightness**

The range's background is a left-to-right \`linear-gradient\` from near-black to warm yellow, so the track itself communicates "dark on the left, bright on the right" before you read any number. The thumb is styled across \`::-webkit-slider-thumb\` and \`::-moz-range-thumb\` so it looks consistent in both engines.

**An icon that responds to the value**

The sun glyph isn't static — \`paint()\` scales its SVG from about 0.78× up to 1.3× as brightness rises, and adds a \`.bright\` class above 100% that tints it amber and applies a \`drop-shadow\` glow. This gives an analog, at-a-glance sense of intensity that complements the percentage readout, and it's all driven from the same single render function.

**One render path**

Every change runs through \`paint()\`, which reads the slider once and updates the filter, the label, and the icon together. There's no duplicated state, so the preview, the number, and the sun can never disagree — a pattern that scales cleanly if you later add presets or sync to a stored setting.

**Beyond images**

The same \`brightness()\` filter applies to any element — a full theme container, a video, a map, or a canvas — so you can dim an entire UI for night reading by putting the filter on a wrapper. Pair it with \`contrast()\` or \`saturate()\` in the same filter string to build a complete display-adjustment panel from the same approach.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A preview image renders above a gradient brightness slider.` },
      { title: 'Drag the slider', text: `The preview brightens or dims live via the CSS brightness() filter.` },
      { title: 'Watch the sun icon', text: `It scales up as you increase brightness and glows past 100%.` },
      { title: 'Read the percentage', text: `The value label shows the exact brightness from 20% to 160%.` },
      { title: 'Swap the preview', text: `Point the filter at any image, video, or wrapper element.` },
      { title: 'Combine filters', text: `Add contrast() or saturate() to the same filter string.` },
    ] },
    features: [
      { title: 'CSS brightness() filter', text: `GPU-composited dimming and over-brightening in one property.` },
      { title: 'Live preview', text: `The image updates instantly as you drag.` },
      { title: 'Gradient track', text: `Dark-to-yellow background signals the range visually.` },
      { title: 'Reactive sun icon', text: `Scales with the value and glows above 100%.` },
      { title: 'Cross-browser thumb', text: `Styled for WebKit and Firefox range thumbs.` },
      { title: 'Single render path', text: `paint() updates filter, label, and icon together.` },
      { title: 'Works on any element', text: `Dim a whole theme by filtering a wrapper.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS — no canvas or image processing.` },
    ],
    useCases: [
      { title: 'Photo and image editors', text: `Adjust exposure next to an [image filter editor](/ui-snippets/image-filter-editor/).` },
      { title: 'Display settings panels', text: `Drop into a [settings panel](/ui-snippets/settings-panel/) for screen brightness.` },
      { title: 'Night and reading modes', text: `Dim a whole theme alongside a [color mode toggle](/ui-snippets/color-mode-toggle/).` },
      { title: 'Media controls', text: `Tune preview brightness beside a [volume control](/ui-snippets/volume-control/).` },
      { title: 'Any filter slider', text: `Reuse the pattern with a [range slider](/ui-snippets/range-slider/).` },
      { title: 'Learning CSS filters', text: `A reference for live brightness() and composited transitions.` },
      { icon: 'CODE', title: 'Related: Chip Multiselect', desc: 'See the [Chip Multiselect](/ui-snippets/chip-multiselect/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the brightness change without editing the image?', a: `It uses the CSS filter: brightness(factor) property on the image. A factor of 1 is the original, below 1 darkens, and above 1 over-brightens. The slider's 20–160 value is divided by 100 to make a 0.2–1.6 factor, so nothing about the pixel data changes — the browser composites the adjustment on the GPU.` },
      { q: 'Why is dragging so smooth?', a: `The filter has a short CSS transition, and brightness() is GPU-composited, so updates don't trigger layout or repaint of the underlying bitmap. Even on a large image, dragging stays fluid because the work happens on the compositor, not the main thread.` },
      { q: 'Why does the sun icon change?', a: `The paint() function scales the sun SVG from about 0.78× to 1.3× based on the slider value and adds a .bright class above 100% that tints it amber with a drop-shadow glow. It gives an analog sense of intensity that complements the numeric percentage, all from the same render call.` },
      { q: 'Can I dim my whole interface, not just an image?', a: `Yes. The brightness() filter works on any element, so applying it to a wrapper div dims everything inside — useful for a night or reading mode. You can also chain it with contrast() and saturate() in one filter string to build a complete display-adjustment panel.` },
      { q: 'How do I use this brightness slider in React, Vue, or Angular?', a: `Hold the value in state and bind the target element's filter style to brightness(value/100). Compute the icon scale and glow class from the same value in render. Tailwind users can use the brightness-* utilities for fixed steps, but for a continuous slider bind an inline filter style to the live value instead.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer the scale formula by hand to see how the sun icon tracks the slider. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the raw 20-160 range gets converted into both the brightness() filter factor and the separate 0.78-to-1.3 icon scale factor in the same paint function, and why those two mappings use different formulas even though they're driven by the same slider value. The same assistant can help optimize it — asking whether the CSS transition on the filter property is redundant given the input event already fires continuously while dragging, or whether the icon scale calculation could be simplified into a shared helper. It's also a good way to extend the widget: ask it to add contrast() and saturate() sliders sharing one combined filter string, persist the chosen brightness to localStorage, or apply the filter to a live video element instead of a static image. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "brightness slider" in plain HTML, CSS, and JavaScript that live-dims or brightens a preview element using only the CSS brightness() filter — no canvas, no per-pixel image manipulation.

Requirements:
- A range input whose min and max represent a brightness percentage wider than 0-100 (allow both under- and over-brightening, e.g. 20 to 160), with a track styled as a left-to-right linear-gradient from dark to a bright warm color so the slider itself visually communicates the range before any value is read.
- On every input event, convert the raw slider value into a CSS filter factor by dividing by 100, and apply it as filter: brightness(factor) to a preview image element, with a short CSS transition on the filter property so the visual change during dragging is smooth rather than stepped.
- Display the current raw percentage value as text, updating on every input event from the same handler that updates the filter.
- Render an icon (e.g. a sun) next to the slider whose visual scale grows continuously as the value increases across the full range, computed with its own separate formula from the same slider value (not simply mirroring the filter factor), and add a distinct glow/color-change state on the icon specifically when the value exceeds the normal 100% baseline.
- Consolidate all of this — the filter update, the label text, and the icon scale and glow state — into a single function that runs on every input event, so the preview, the numeric readout, and the icon can never fall out of sync with each other.
- Make sure the technique generalizes: the same filter approach must be usable on any element (a video, a wrapper div, a canvas), not hardcoded to only work on the one image in the demo.`,
    },
  },
};

export default brightnessSlider;
