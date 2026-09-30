const proximityGlowButton = {
  id: 'proximity-glow-button',
  title: 'Proximity Glow Button',
  category: 'buttons',
  html: `<div class="pg-stage">
  <p class="pg-hint">Move your cursor around the page — the buttons glow brighter the closer you get, even before touching them</p>
  <div class="pg-row">
    <button class="pg-btn" data-radius="260"><span>Deploy now</span></button>
    <button class="pg-btn" data-radius="180"><span>View docs</span></button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #06070d; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.pg-stage { display: flex; flex-direction: column; align-items: center; gap: 44px; padding: 40px; }
.pg-hint { font-size: 13px; color: #4b5468; text-align: center; max-width: 380px; }
.pg-row { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; }

.pg-btn {
  position: relative;
  padding: 15px 34px;
  font-size: 15px; font-weight: 700;
  border-radius: 12px;
  background: #12141f;
  border: 1.5px solid #23273a;
  color: #cbd2e1;
  cursor: pointer; font-family: inherit;
  transition: color 0.2s, border-color 0.2s, transform 0.15s;
  /* --pg-glow drives both the border glow (via a radial box-shadow proxy)
     and the ::before ambient halo intensity. It is written from JS as a
     0..1 value based on cursor distance, continuously, not just on :hover. */
  --pg-glow: 0;
  box-shadow: 0 0 calc(var(--pg-glow) * 40px) calc(var(--pg-glow) * 4px) rgba(99,102,241, calc(var(--pg-glow) * 0.55));
  border-color: color-mix(in srgb, #23273a, #818cf8 calc(var(--pg-glow) * 100%));
}
.pg-btn span { position: relative; z-index: 1; pointer-events: none; }

.pg-btn::before {
  content: '';
  position: absolute; inset: -1.5px;
  border-radius: inherit;
  background: radial-gradient(circle at 50% 50%, rgba(129,140,248,0.9), transparent 70%);
  opacity: var(--pg-glow);
  filter: blur(6px);
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.05s linear;
}

.pg-btn:hover { transform: translateY(-1px); color: #fff; }`,
  js: `// Unlike a normal :hover glow, this button reacts to how close the cursor
// is ANYWHERE on the page — the glow ramps up smoothly as the cursor
// approaches from a distance, well before it actually touches the button,
// using a continuous document-wide mousemove listener and per-button
// distance falloff rather than a boolean hover state.
var buttons = Array.prototype.slice.call(document.querySelectorAll('.pg-btn'));

function update(clientX, clientY) {
  buttons.forEach(function (btn) {
    var radius = parseFloat(btn.dataset.radius) || 200;
    var rect = btn.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dx = clientX - cx;
    var dy = clientY - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);

    var t = 1 - dist / radius;           // 1 at center, 0 at radius edge
    t = Math.max(0, Math.min(1, t));
    t = t * t;                            // ease-in: glow builds slowly then accelerates near the button

    btn.style.setProperty('--pg-glow', t.toFixed(3));
  });
}

document.addEventListener('mousemove', function (e) {
  update(e.clientX, e.clientY);
});

document.addEventListener('mouseleave', function () {
  buttons.forEach(function (btn) { btn.style.setProperty('--pg-glow', '0'); });
});`,

  seo: {
    title: 'Proximity Glow Button — Cursor Distance Hover Effect',
    description: 'Button glow that ramps up continuously as the cursor approaches from anywhere on the page, driven by a document-wide mousemove and squared distance falloff, not a boolean :hover state. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Proximity Glow Button — Continuous Cursor-Distance Glow Before the Cursor Even Touches It',
      description: `Most button glow effects are binary: nothing happens until the cursor crosses the button's edge, at which point CSS \`:hover\` flips a fixed style on. This effect is continuous instead — the glow intensity is a real number between 0 and 1 that increases smoothly as the cursor approaches from anywhere on the page, so the button visibly "senses" an approaching cursor well before contact, similar in spirit to a [magnetic button](/ui-snippets/magnetic-button/)'s pull but applied to light intensity instead of position.

**A document-wide listener, not a button-scoped one**

The trigger mechanism itself is what makes this different from a hover effect: a single \`mousemove\` listener on \`document\` fires on every cursor movement anywhere on the page, and for every button on the page it recomputes a distance-based intensity — not just for the button the cursor happens to be over. This lets multiple buttons glow in relation to the same cursor position simultaneously, each with its own falloff radius.

**The distance-to-intensity formula**

For each button, \`getBoundingClientRect()\` gives its center point. The straight-line distance from the cursor to that center is compared against a per-button \`data-radius\` attribute (in pixels) — the maximum distance at which any glow is visible at all. The raw ratio \`t = 1 - dist / radius\` is clamped to \`[0, 1]\`, then squared (\`t = t * t\`). Squaring is the key perceptual tweak: without it, a cursor that's still fairly far away would already produce a noticeably bright glow; squaring keeps the glow nearly invisible until the cursor is meaningfully close, then it ramps up quickly in the final approach — closer to how a real light source's perceived brightness falls off with distance.

**Writing intensity as a CSS custom property**

Rather than toggling classes, the JS writes the computed \`t\` directly to a CSS custom property, \`--pg-glow\`, via \`style.setProperty\`. Every visual consequence of proximity — the ambient \`box-shadow\`, the border color mixed toward indigo via \`color-mix()\`, and the blurred \`::before\` halo's opacity — all reference \`var(--pg-glow)\` directly in CSS, so a single JS-written number drives three coordinated visual changes without any additional JS branching.

**Per-button radius via \`data-radius\`**

Each button carries its own \`data-radius\` attribute, so different buttons can have different "sensing" distances — a primary CTA might use a larger radius (260px) to feel more magnetic and attention-grabbing than a secondary button (180px).

**Resetting when the cursor leaves the page**

A \`mouseleave\` listener on \`document\` (fired when the cursor exits the browser viewport entirely) resets every button's \`--pg-glow\` back to \`0\`, since without an active cursor position there's nothing to measure distance against.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Move the cursor around the page', text: 'Without touching either button, move your cursor closer and farther away — notice the glow ramps up smoothly well before you reach the button.' },
        { title: 'Compare the two buttons', text: 'The first button has a larger data-radius (260) and starts glowing from farther away than the second (180).' },
        { title: 'Adjust the sensing radius', text: 'In the HTML panel, change each button\'s data-radius attribute to control how far away the glow starts appearing.' },
        { title: 'Change the glow color', text: 'Update the rgba(99,102,241, ...) values in the box-shadow rule and the color-mix() target color in the CSS panel.' },
        { title: 'Adjust the falloff curve', text: 'In the JS panel, change the t = t * t line — remove it for a linear falloff, or raise the power (t*t*t) for glow that appears even more suddenly at close range.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Document-wide mousemove listener — glow reacts to cursor position anywhere on the page, not just on :hover',
      'Continuous 0-1 glow intensity via CSS custom property, not a binary hover class toggle',
      'Squared distance falloff for a perceptually natural "brightness" curve',
      'Per-button data-radius attribute controls each button\'s independent sensing distance',
      'A single --pg-glow custom property drives box-shadow, border color-mix, and halo opacity together',
      'CSS color-mix() blends the border color toward the glow tint proportional to intensity',
      'Blurred ::before pseudo-element halo layered beneath the label for a soft ambient light look',
      'mouseleave on document resets all buttons cleanly when the cursor exits the viewport',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'BTN', title: 'Primary CTA buttons on dark landing pages', desc: 'A CTA that glows as the cursor approaches draws the eye toward it before the user even consciously decides to click, more effectively than a static hover state.' },
      { icon: 'APP', title: 'Product launch and futuristic dashboard UIs', desc: 'Pairs naturally with a dark, glassy interface aesthetic — the proximity reaction reads as ambient, responsive lighting rather than a simple color swap.' },
      { icon: 'LEARN', title: 'Learn continuous vs. binary interaction states', desc: 'A clear example of replacing a boolean :hover trigger with a continuous, distance-driven value — a pattern used across cursor-reactive effects like the [neon glow](/ui-snippets/neon-glow/).' },
      { icon: 'DESIGN', title: 'Gaming and creative-tech portfolio sites', desc: 'Use on a hero CTA for a portfolio or product that wants to feel technically impressive — the glow-before-touch reaction is a small but memorable detail.' },
      { icon: 'STAR', title: 'Onboarding "next step" emphasis', desc: 'Use a larger sensing radius on the button representing the intended next action to subtly guide user attention as they move the cursor around the screen.' },
      { icon: 'CODE', title: 'Related: Magnetic Button', desc: 'Combine with the [Magnetic Button](/ui-snippets/magnetic-button/) for a CTA that both glows from a distance and physically pulls toward the cursor once it gets close.' },
    ],
    faqs: [
      { q: 'How is this different from a plain CSS :hover glow?', a: 'A :hover glow is binary — off until the cursor crosses the button\'s exact boundary, then fully on. This effect computes a continuous distance value on every mousemove anywhere on the page, so the glow visibly ramps up as the cursor approaches from far away, well before it touches the button.' },
      { q: 'Why square the falloff ratio (t = t * t)?', a: 'A raw linear ratio makes the glow noticeably visible even when the cursor is still fairly far from the button. Squaring keeps the glow nearly imperceptible at greater distances and lets it build up quickly only in the final approach, which reads as a more natural, light-source-like falloff.' },
      { q: 'What does data-radius control?', a: 'It is the maximum distance in pixels, measured from the button\'s center to the cursor, at which any glow starts to appear at all. A button with a 260px radius starts glowing from farther away than one with a 180px radius.' },
      { q: 'Why is the intensity written to a CSS custom property instead of setting individual styles in JS?', a: 'Writing one number to --pg-glow lets CSS itself compute three coordinated effects (box-shadow spread and opacity, color-mix on the border, and a blurred halo\'s opacity) directly from that single value using CSS functions like calc() and color-mix() — simpler and faster than computing and writing three separate style properties from JavaScript every mousemove.' },
      { q: 'Does this affect performance with a lot of buttons on the page?', a: 'Each mousemove event does a getBoundingClientRect() and a distance calculation per button, which is cheap for a handful of buttons. For dozens of proximity-reactive elements on one page, consider throttling the mousemove handler or caching bounding rects and only recomputing them on scroll/resize.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Attach a single document mousemove listener in a useEffect with an empty dependency array, keep refs to each button, and write --pg-glow directly via ref.current.style.setProperty inside the handler to avoid state-driven re-renders on every mouse movement.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to design the falloff math from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the effect listens on document instead of on each button individually, and why the intensity ratio is squared before being written to the CSS custom property. The same assistant can help optimize it — for instance asking whether the per-button getBoundingClientRect() calls on every single mousemove event should be throttled with requestAnimationFrame for pages with many proximity-reactive elements. It's also useful for extending the effect: ask it to add a second, tighter-radius "hot" glow tier that kicks in only very close to the button, make the glow color shift hue based on distance rather than staying fixed, or combine the proximity value with the magnetic button's pull formula so the button both glows and moves as the cursor approaches. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "proximity glow button" hover effect in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- One or more button elements, each carrying a data-radius attribute defining, in pixels, the maximum distance from the button's center at which any glow becomes visible.
- Attach a SINGLE mousemove listener to the document (not to each button individually), so the glow reacts to cursor movement anywhere on the page, not only once the cursor is already over or near a specific button.
- For every button, on every mousemove event, compute the button's center using getBoundingClientRect, the straight-line distance from the cursor to that center, and a normalized intensity ratio that is 1 when the cursor is exactly at the center and 0 at or beyond the button's own data-radius distance, clamped to that 0-1 range.
- Apply a non-linear falloff to that ratio (such as squaring it) before using it, so the glow stays nearly invisible until the cursor is meaningfully close and then builds up quickly in the final approach, rather than growing at a constant linear rate across the whole radius.
- Write the final intensity value to a single CSS custom property on the button element via style.setProperty, and drive ALL of the visual glow effects (a soft box-shadow halo, a border color shift, and a blurred ambient pseudo-element glow) purely from that one custom property using CSS calc() and/or color-mix(), rather than writing multiple separate inline styles from JavaScript.
- On mouseleave of the document (cursor exits the browser viewport), reset every button's glow intensity back to 0.
- The effect must work correctly for multiple buttons on the same page simultaneously, each responding independently to the same cursor position based on its own measured distance and its own data-radius.`,
    },
  },
};

export default proximityGlowButton;
