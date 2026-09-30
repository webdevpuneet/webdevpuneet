const themePaletteGenerator = {
  id: 'theme-palette-generator',
  title: 'Theme Palette Generator',
  category: 'tools',
  description: 'Free theme palette generator HTML CSS JavaScript snippet. Pick a base colour and instantly preview a 9-step tint/shade ramp computed via HSL lightness interpolation, with click-to-copy hex values.',
  html: `<div class="demo">
  <div class="palette-card">
    <div class="controls">
      <label class="color-field">
        <input type="color" class="base-color" value="#6366f1" />
        <span>Base colour</span>
      </label>
      <code class="base-hex">#6366f1</code>
    </div>
    <div class="ramp"></div>
    <p class="copy-hint">Click any swatch to copy its hex code</p>
  </div>
</div>`,
  css: `.demo {
  font-family: 'Segoe UI', system-ui, sans-serif;
  display: flex;
  justify-content: center;
  padding: 28px;
  background: #f1f5f9;
}
.palette-card {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 14px 36px rgba(15,23,42,0.07);
  padding: 22px;
}
.controls {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}
.color-field {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
}
.color-field input[type="color"] {
  width: 42px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
  padding: 0;
}
.base-hex {
  font-size: 13px;
  background: #f1f5f9;
  color: #475569;
  padding: 5px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}
.ramp {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.swatch {
  position: relative;
  height: 76px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 0 0 8px;
}
.swatch .label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  opacity: 0.85;
}
.swatch.copied::after {
  content: 'Copied!';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 700;
  background: rgba(15,23,42,0.85);
  color: #fff;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}
.copy-hint {
  margin: 12px 0 0;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
}`,
  js: `const colorInput = document.querySelector('.base-color');
const baseHex = document.querySelector('.base-hex');
const ramp = document.querySelector('.ramp');

const STEPS = [95, 85, 72, 60, 50, 42, 32, 22, 12];

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function render(hex) {
  baseHex.textContent = hex;
  const { h, s } = hexToHsl(hex);
  ramp.innerHTML = '';
  STEPS.forEach((lightness) => {
    const swatchHex = hslToHex(h, Math.max(s, 35), lightness);
    const btn = document.createElement('button');
    btn.className = 'swatch';
    btn.style.background = swatchHex;
    btn.style.color = lightness > 55 ? '#1e293b' : '#fff';
    btn.innerHTML = '<span class="label">' + swatchHex.toUpperCase() + '</span>';
    btn.addEventListener('click', () => {
      navigator.clipboard?.writeText(swatchHex).catch(() => {});
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1100);
    });
    ramp.appendChild(btn);
  });
}

colorInput.addEventListener('input', (e) => render(e.target.value));
render(colorInput.value);`,
  seo: {
    title: 'Theme Palette Generator — Free HTML CSS JS Snippet',
    description: 'Turns one base colour into a 9-step tint and shade ramp via HSL interpolation with click-to-copy hex. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How this theme palette generator was built — RGB-to-HSL conversion and lightness-step interpolation',
      description: `This snippet recreates the "pick one colour, get a full design-system ramp" tool found in design tools like Tailwind's colour generator and Material Design's palette builder — choose a base colour and instantly see nine coordinated tints and shades (the kind of 50/100/200…900 scale used for buttons, backgrounds, borders, and text), each one click-to-copy as a hex code. It runs on roughly 70 lines of vanilla JavaScript implementing real colour-space conversion math — no design-tooling library involved.

**Why convert to HSL instead of just lightening/darkening RGB values**

Naively brightening a colour by adding to its R, G, and B channels produces washed-out, desaturated results — colours drift toward grey rather than staying vibrant as they lighten or darken. This snippet instead converts the chosen hex colour into **HSL** (hue, saturation, lightness) via \`hexToHsl()\`, which separates *what colour it is* (hue), *how vivid it is* (saturation), and *how light or dark it is* (lightness) into independent values. That separation is exactly what makes a coherent ramp possible: keep the hue and a healthy minimum saturation constant, and vary only the lightness — the same separation-of-concerns idea that powers the colour math behind the [QR Code Generator](/ui-snippets/qr-code-generator)'s colour customization, just applied to ramp generation instead of direct colour selection.

**Generating the ramp with a fixed lightness scale**

A constant array \`STEPS = [95, 85, 72, 60, 50, 42, 32, 22, 12]\` defines nine target lightness percentages, deliberately spaced unevenly — closer together in the lighter and darker extremes, where small lightness changes are visually more dramatic, and wider in the midtones. For each step, \`hslToHex(h, Math.max(s, 35), lightness)\` rebuilds a hex colour at that lightness while clamping saturation to a minimum of 35% — preventing washed-out, low-saturation base colours from producing a grey, lifeless ramp. The result is nine swatches that all clearly belong to the same colour family yet span from near-white to near-black.

**Implementing real colour-space conversion math**

\`hexToHsl()\` and \`hslToHex()\` are textbook implementations of the standard RGB↔HSL conversion formulas: computing max/min/delta across the three channels, deriving hue from which channel is dominant (with the classic six-case switch and 60°-segment multiplication), and reconstructing RGB from HSL via the chroma/intermediate/match-lightness (\`c\`/\`x\`/\`m\`) decomposition before converting back to a two-digit hex string per channel with \`toString(16).padStart(2, '0')\`. Seeing both directions implemented side by side is a genuinely useful reference for understanding how colour pickers, theme systems, and design tokens convert between colour representations.

**Click-to-copy with a transient confirmation**

Each generated swatch is a real \`<button>\` with its hex code rendered as a label; clicking it calls \`navigator.clipboard.writeText()\` and toggles a \`.copied\` class that displays a "Copied!" badge via a CSS \`::after\` pseudo-element, automatically removed after 1.1 seconds with \`setTimeout\`. The \`.catch(() => {})\` on the clipboard promise quietly handles browsers or contexts where clipboard access is unavailable, so the interaction never throws a visible error — it simply skips the copy.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Add a colour input and a ramp container', text: 'Use a native `<input type="color">` for picking the base colour, a `<code>` element to echo its hex value, and an empty `.ramp` div with a `display: grid; grid-template-columns: repeat(9, 1fr)` layout to hold the generated swatches.' },
        { title: 'Convert the chosen hex colour to HSL', text: 'Write `hexToHsl(hex)`: parse the R, G, B channels from the hex string, compute `max`, `min`, and their difference, then derive hue via the standard six-case dominant-channel formula and lightness/saturation from the max/min average and spread.' },
        { title: 'Define a fixed lightness scale for the ramp', text: 'Create a `STEPS` array of nine target lightness percentages (e.g. `[95, 85, 72, 60, 50, 42, 32, 22, 12]`) — spaced to emphasize visual differences at the light and dark extremes of the ramp.' },
        { title: 'Rebuild a hex colour at each lightness step', text: 'Write `hslToHex(h, s, l)` using the chroma/intermediate/match (`c`/`x`/`m`) decomposition to reconstruct RGB from HSL, then format each channel as a two-digit hex string with `toString(16).padStart(2, "0")`.' },
        { title: 'Render swatches and clamp saturation', text: 'For each `STEPS` value, call `hslToHex(h, Math.max(s, 35), lightness)` — clamping saturation to a minimum keeps low-saturation base colours from producing a flat, grey ramp — and create a labelled `<button class="swatch">` with that background colour.' },
        { title: 'Wire click-to-copy with a transient confirmation', text: 'On each swatch\'s click, call `navigator.clipboard.writeText(hex)`, add a `.copied` class that reveals a "Copied!" badge via CSS, and remove the class with `setTimeout(..., 1100)` so the confirmation fades after just over a second.' },
      ],
    },
    features: [
      'Real RGB↔HSL colour-space conversion — `hexToHsl()` and `hslToHex()` implement the standard textbook formulas from scratch, a genuinely useful reference for understanding how colour pickers and design-token systems convert between representations',
      'Hue-and-saturation-preserving ramp generation — only lightness varies across the nine steps, so every swatch clearly belongs to the same colour family instead of drifting toward grey like naive RGB brightening would produce',
      'Thoughtfully uneven lightness scale — the `STEPS` array spaces values more tightly at the light and dark extremes, where small lightness changes read as more visually significant, producing a more natural-feeling ramp',
      'Saturation floor to prevent washed-out ramps — `Math.max(s, 35)` guarantees a minimum vibrancy even when the chosen base colour is pale or near-grey, so the generated shades stay usable as design colours',
      'Click-to-copy hex codes with a transient "Copied!" badge — `navigator.clipboard.writeText()` plus a CSS `::after` pseudo-element confirmation that self-removes after 1.1 seconds via `setTimeout`',
      'Auto-contrasting swatch labels — each swatch\'s text colour switches between dark and light based on whether its lightness is above or below 55%, so hex codes stay readable on every shade',
      'Pure vanilla JavaScript and CSS Grid — no colour-math library or design-tooling dependency; copy the HTML, CSS, and JS into any page and the generator works immediately',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Design systems and component-library colour tokens', desc: 'Generate a coordinated 9-step scale (the same shape as Tailwind\'s 50–900 or Material\'s tonal palettes) from a single brand colour — instantly producing background, border, hover, and text-colour tokens that all read as part of one family.' },
      { icon: 'CODE', title: 'Theming tools and brand customization panels', desc: 'Let users or clients pick one accent colour and preview a full coordinated palette before it gets applied across an app\'s buttons, badges, charts, and surfaces — removing the guesswork of manually picking nine harmonious shades.' },
      { icon: 'WRITE', title: 'Style guide and pattern-library documentation', desc: 'Embed the generator directly in internal documentation so designers and engineers can explore how a proposed brand colour would extend into a full ramp, with one-click hex codes ready to paste into CSS variables or design tokens.' },
      { icon: 'LEARN', title: 'Learning real colour-space conversion math', desc: 'A rare example of seeing both `hexToHsl()` and `hslToHex()` implemented side by side and applied to a practical problem — directly transferable to building colour pickers, gradient tools, or accessibility-contrast checkers.' },
      { icon: 'STAR', title: 'Rapid prototyping and mockup tools', desc: 'Quickly explore "what would this UI look like in blue vs. teal vs. purple" by generating a full coordinated ramp for any candidate brand colour in seconds, without opening a separate design application.' },
      { icon: 'FLOW', title: 'A reference for click-to-copy interactions', desc: 'The `navigator.clipboard.writeText()` plus transient-badge pattern here is directly reusable any time you need a "click to copy this value" affordance — code snippets, API keys, share links, or generated configuration values.' },
    ],
    faqs: [
      { q: 'Why does the generator convert to HSL instead of just adjusting RGB values directly?', a: 'Brightening or darkening a colour by adding to its R, G, and B channels equally tends to wash it out toward grey rather than producing a clean tint or shade — because RGB mixes "how light" and "what colour" together in a way that is hard to separate. HSL (hue, saturation, lightness) keeps those concerns independent: by holding hue and saturation steady and only varying lightness, the generator can produce nine shades that all clearly belong to the same colour family, from near-white to near-black.' },
      { q: 'Why does the code use `Math.max(s, 35)` when rebuilding each ramp colour?', a: 'It clamps the saturation to a minimum of 35% before converting back to hex. Without this floor, choosing a pale or near-grey base colour would produce a ramp where every shade looks flat and lifeless, since low original saturation would carry through to every step. The clamp guarantees the generated palette stays usable and vibrant even when the starting colour itself is muted.' },
      { q: 'Why is the `STEPS` lightness array spaced unevenly instead of using even 10% increments?', a: 'Human perception of lightness is not linear — small changes near pure white or pure black look more dramatic than the same numeric change in the midtones. The chosen values (`95, 85, 72, 60, 50, 42, 32, 22, 12`) bunch more tightly at the light and dark extremes and spread out in the middle, producing a ramp where each step feels like a meaningfully distinct shade rather than several near-duplicates clustered in the middle.' },
      { q: 'How does clicking a swatch copy its colour, and what happens if the clipboard API is unavailable?', a: 'Each swatch button calls `navigator.clipboard.writeText(swatchHex)`, which writes the hex string to the system clipboard, then toggles a `.copied` class that displays a "Copied!" badge via a CSS `::after` pseudo-element for 1.1 seconds. The call is chained with `.catch(() => {})`, so in browsers or contexts where clipboard access is restricted (e.g. insecure origins or missing permissions), the copy attempt simply fails silently rather than throwing a visible error.' },
      { q: 'How do the swatch labels stay readable across both light and dark shades?', a: 'Each swatch\'s text colour is set conditionally — `lightness > 55 ? "#1e293b" : "#fff"` — based on the same lightness value used to generate its background. Light shades (lightness above 55%) get dark slate text, and darker shades get white text, so the hex-code label always has enough contrast to read clearly regardless of where it falls on the ramp.' },
      { q: 'Can I use this theme palette generator snippet on my own site for free, including commercial projects?', a: 'Yes — copy the HTML, CSS, and JS with the buttons on this page and use them anywhere, including commercial design tools and products, with no attribution required. The colour-conversion math is implemented from scratch in vanilla JavaScript using only the native Clipboard API — no third-party colour library or licensing to track.' },
    ],
    aiPrompt: {
      paragraph: `Have an AI coding assistant like Claude walk through the six-case switch inside hexToHsl() line by line — it is exactly the kind of dense conversion math that is much faster to understand with someone explaining the dominant-channel logic than by staring at it cold. It is also worth asking whether Math.max(s, 35) is the right floor for every hue, since very light or very dark base colors might need a different saturation clamp to avoid looking muddy. For extending the generator, ask it to add a "copy all nine as CSS custom properties" button, a mode that also outputs the ramp in OKLCH for better perceptual evenness, or a second ramp generated from a complementary or triadic hue computed from the same base color. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "one base color in, nine-step tint/shade ramp out" theme palette generator in plain HTML, CSS, and JavaScript, implementing the color-space math from scratch with no color library.

Requirements:
- A native input type="color" for picking the base color, and a container that renders nine swatches in a CSS grid.
- Write a hexToHsl function that manually parses the R, G, B channels from a hex string, computes the max, min, and delta across the three channels, and derives hue using the standard six-case dominant-channel formula (with 60-degree segment multiplication) plus saturation and lightness from the max/min average and spread.
- Write the inverse hslToHex function using the chroma/intermediate/match-lightness (c/x/m) decomposition to reconstruct RGB from HSL, converting each channel to a two-digit hex string.
- Define a fixed array of nine target lightness percentages that are spaced unevenly — closer together near the light and dark extremes and wider in the midtones — and generate each ramp swatch by converting the base hue and saturation back to hex at each lightness step.
- Clamp the saturation to a minimum floor (such as 35%) before generating every ramp swatch, so a pale or desaturated base color still produces a vibrant, usable ramp instead of a washed-out gray scale.
- Make every swatch a real button that copies its own hex code to the clipboard via the Clipboard API on click, shows a brief "Copied!" confirmation badge, and automatically picks readable dark or light label text based on whether its own lightness is above or below 55%.`,
    },
  },
};

export default themePaletteGenerator;
