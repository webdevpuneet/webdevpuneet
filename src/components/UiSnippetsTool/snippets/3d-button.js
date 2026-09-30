const threeDButton = {
  id: '3d-button',
  title: '3D Push Button',
  category: 'buttons',
  html: `<div class="wrap">
  <button class="btn-3d green"><span>Add to Cart</span></button>
  <button class="btn-3d blue"><span>Download</span></button>
  <button class="btn-3d dark"><span>Continue</span></button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f1f5f9;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}

.wrap { display: flex; flex-wrap: wrap; gap: 26px; padding: 24px; }

/* 3D push button: the outer button is the "shadow" face,
   the inner span is the top face that moves down on press. */
.btn-3d {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  border-radius: 12px;
  outline-offset: 4px;
}

.btn-3d span {
  display: block;
  padding: 14px 30px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  transform: translateY(-6px);
  transition: transform 0.12s cubic-bezier(0.3, 0.7, 0.4, 1);
}

/* Press: top face drops onto the shadow face */
.btn-3d:active span { transform: translateY(-2px); }
.btn-3d:hover span  { transform: translateY(-8px); }
.btn-3d:hover:active span { transform: translateY(-2px); }

/* Green */
.btn-3d.green { background: #15803d; }
.btn-3d.green span { background: #22c55e; box-shadow: 0 0 0 1px rgba(0,0,0,0.05); }

/* Blue */
.btn-3d.blue { background: #1e40af; }
.btn-3d.blue span { background: #3b82f6; }

/* Dark */
.btn-3d.dark { background: #020617; }
.btn-3d.dark span { background: #1e293b; }`,
  js: `// Pure CSS 3D button — no JavaScript required.
// Press any button to see the top face drop onto its shadow.
document.querySelectorAll('.btn-3d').forEach(b => {
  b.addEventListener('click', () => console.log('Pressed:', b.textContent.trim()));
});`,

  seo: {
    title: '3D Push Button — CSS Press Effect Snippet',
    description: 'A tactile 3D push button in pure CSS — the top face drops onto a darker shadow face on click, like a real key. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: '3D Push Button — Tactile CSS Press Effect with a Two-Layer Face',
      description: `A 3D push button is a high-demand CSS snippet because it makes a call-to-action feel physical: the button has visible depth and "presses down" when clicked, exactly like a real keyboard key or arcade button. This version is pure CSS — no JavaScript, no images — and ships in three colors (green, blue, dark). The whole effect comes from a clever two-layer structure that any developer can learn and reuse.

**The two-face structure**

A real 3D button has two visible parts: the **top face** (the colored surface you press) and the **shadow face** (a darker base it sits on). This snippet maps those to two elements. The outer \`<button class="btn-3d">\` is the darker shadow face, and the inner \`<span>\` is the brighter top face. The button itself has \`background: transparent; padding: 0\`, and a colored background on the \`.green\`/\`.blue\`/\`.dark\` modifier — that colored button is the base. The span is filled with a lighter shade of the same hue and lifted up with \`transform: translateY(-6px)\`, so it floats 6px above the base. That 6px gap is the visible "thickness" of the button.

**The press animation**

By default the top face is at \`translateY(-6px)\` — fully raised. On hover, \`translateY(-8px)\` raises it slightly more for a subtle "ready" cue. On \`:active\` (mouse or finger down), \`translateY(-2px)\` drops the top face most of the way onto the base, shrinking the visible thickness from 6px to 2px. The transition \`transform 0.12s cubic-bezier(0.3, 0.7, 0.4, 1)\` makes the motion fast and slightly springy — quick enough to feel responsive, with an easing curve that mimics a real key snapping down. Because only \`transform\` animates, the effect runs on the GPU at 60fps with zero layout cost.

**Why two layers instead of box-shadow**

You could fake depth with a single \`box-shadow\`, but the two-layer approach is far more convincing because the dark base is a real element with the button's exact rounded shape. When the top face drops, the base stays put, so the colored "side wall" of the button visibly compresses — the depth shrinks before your eyes. A box-shadow cannot do that; it would just move. The two-layer technique also keeps the corners perfectly rounded at any radius because both the base and the face use the same \`border-radius: 12px\`.

**The color system**

Each variant pairs a dark base with a lighter face of the same hue: green uses \`#15803d\` base + \`#22c55e\` face, blue uses \`#1e40af\` + \`#3b82f6\`, dark uses \`#020617\` + \`#1e293b\`. The base must be noticeably darker than the face so the "wall" reads as a shadow in the gap. To create a new color, pick a base that is roughly 25–35% darker than the face. The white label sits on the face and stays legible on all three because each face color clears AA contrast for bold text.

**Hover, active, and the combined state**

The snippet handles three pointer states cleanly. \`:hover span\` lifts to -8px (the button "rises" toward the cursor). \`:active span\` drops to -2px (pressed). The combined \`:hover:active\` rule also drops to -2px so the button does not get stuck at the raised hover height while being held down. This ordering matters: because \`:hover:active\` is more specific and comes last, it wins when both states are true, which is exactly what happens during a click.

**Accessibility and focus**

These are native \`<button>\` elements, so they are keyboard-focusable and activate on Enter/Space — and crucially, the \`:active\` press animation also fires on keyboard activation in most browsers, so keyboard users get the same tactile feedback. The button uses \`outline-offset: 4px\` so a focus ring sits clear of the raised face rather than clipping into it. Keep the default focus outline (or add a \`:focus-visible\` style) so keyboard users can see which button is selected. For users who prefer less motion, wrap the press transition in \`@media (prefers-reduced-motion: reduce)\` to make the state change instant.

**Customizing thickness and feel**

The button's depth is the default \`translateY(-6px)\` — increase it to -10px for a chunkier, more arcade-like button or reduce it to -3px for a subtle press. The pressed depth (\`-2px\` on \`:active\`) sets how far it travels; keep a 1–2px gap so the button never looks fully flattened. Speed up or slow down the snap by changing the \`0.12s\` duration, and adjust the \`cubic-bezier\` to make it bouncier or stiffer. Because every measurement is a single \`translateY\` value, the whole feel is tunable from a few lines of CSS.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy a button', text: 'Each button is an outer <button> (the dark base) wrapping an inner <span> (the colored top face). Keep both layers.' },
        { title: 'Change the label', text: 'Edit the text inside the <span>. The label rides on the top face and stays above the press animation.' },
        { title: 'Add your own color', text: 'Set a dark background on the .btn-3d (base) and a lighter shade of the same hue on its span (face). Aim for the base ~30% darker.' },
        { title: 'Tune the thickness', text: 'Change the span translateY(-6px) for resting depth and the :active translateY(-2px) for how far it presses.' },
        { title: 'Adjust the snap', text: 'Edit the 0.12s duration and cubic-bezier on the span transition to make the press faster, slower, or bouncier.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Two-layer structure: outer button is the shadow face, inner span is the top face',
      'translateY moves the top face down on :active to shrink visible depth',
      'Springy cubic-bezier transition mimics a real physical key',
      'Hover raises the face, active presses it, :hover:active keeps it pressed',
      'Three ready-made colors with a dark-base + light-face pairing',
      'Pure CSS — JavaScript optional, only logs clicks',
      'GPU-friendly: animates only transform at 60fps',
      'Native <button> — keyboard activatable with matching press feedback',
      'outline-offset keeps the focus ring clear of the raised face',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'APP',    title: 'Add to cart & checkout buttons',   desc: 'E-commerce CTAs like the [add to cart button](/ui-snippets/add-to-cart-button/) feel more tactile and clickable with real press depth, nudging users toward the primary action.' },
      { icon: 'GAME',   title: 'Game and app UI controls',         desc: 'Arcade-style buttons suit games, kiosks, and playful product UIs where a satisfying press improves the feel.' },
      { icon: 'DESIGN', title: 'Skeuomorphic / playful designs',   desc: 'Brands going for a chunky, friendly look use 3D buttons — alongside soft [neumorphism cards](/ui-snippets/neumorphism-card/) — as a signature element across their landing pages.' },
      { icon: 'LEARN',  title: 'Learn two-layer depth in CSS',     desc: 'Understand why a real dark base element beats a box-shadow for depth, and how translateY shrinks the visible side wall on press.' },
      { icon: 'CODE',   title: 'Design-system button styles',      desc: 'Add primary, success, and dark 3D variants to your component library — combine with a [button group](/ui-snippets/button-group/) and [gradient buttons](/ui-snippets/gradient-button/), all sharing one base-plus-face structure.' },
      { icon: 'ACCESS', title: 'Keyboard-friendly feedback',       desc: 'Built on native buttons, the press animation also fires on Enter/Space, so keyboard users get the same tactile confirmation.' },
      { icon: 'CODE', title: 'Related: AI Voice Input Button', desc: 'See the [AI Voice Input Button](/ui-snippets/ai-voice-input-button/) for a related buttons pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Cooldown Ring Button', desc: 'See the [Cooldown Ring Button](/ui-snippets/cooldown-ring-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the 3D press effect work without JavaScript?', a: 'The outer <button> is a dark base and the inner <span> is a lighter top face lifted with transform: translateY(-6px). On :active the face drops to translateY(-2px), shrinking the visible gap so the button appears to press down. A fast cubic-bezier transition animates the move — all in CSS.' },
      { q: 'Why use two layers instead of a box-shadow?', a: 'A real base element keeps the button\'s exact rounded shape, so when the top face drops the colored side wall visibly compresses. A box-shadow would just move, not compress, and is harder to keep crisp on rounded corners.' },
      { q: 'How do I make the button thicker or thinner?', a: 'Change the resting depth on the span (translateY(-6px)) — increase to -10px for chunkier, decrease to -3px for subtle. Keep the :active value around -2px so it never looks fully flattened.' },
      { q: 'How do I add a new color?', a: 'Give the .btn-3d a dark background (the base) and its span a lighter shade of the same hue (the face). Make the base roughly 30% darker than the face so the gap reads as a shadow.' },
      { q: 'Is it accessible and keyboard friendly?', a: 'Yes. These are native <button> elements, focusable and activatable with Enter/Space, and the press animation fires on keyboard activation too. outline-offset keeps the focus ring clear of the raised face; add prefers-reduced-motion to disable the animation for those who prefer less motion.' },
      { q: 'Can I use this 3D button in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. Render a <button> wrapping a <span> label with the same classes; the CSS works identically, and you can pass the label and onClick as props.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess why this button feels physical rather than flat — paste the HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how the two-layer structure (the outer button as a dark base, the inner span as a lifted face) simulates compressible depth, and why that beats a single box-shadow. The same assistant is useful for optimizing it — checking whether the transition timing on the span is the cheapest possible GPU-only animation, or whether the hover and active rules could be consolidated without losing the pressed-while-hovering behavior. It's just as good for extending the button: ask it to add a loading spinner state that disables the press, a ripple effect on click, or a size variant system driven by CSS custom properties instead of hardcoded padding values. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "3D push button" in plain HTML and CSS only — no JavaScript required for the effect itself, no images, no box-shadow-only tricks.

Requirements:
- Each button is two stacked elements: an outer button element that acts as a darker "shadow" base with a solid background color and rounded corners, and an inner span that acts as the lighter "top face" the user actually presses, also with the same border-radius.
- The top face must rest lifted above the base using transform: translateY with a negative value (roughly -6px), so the gap between the face and the base reads as physical thickness.
- On :hover, raise the face slightly further (e.g. -8px) as a "ready to press" cue. On :active, drop the face most of the way down (e.g. -2px) so the visible gap shrinks and it looks pressed. Add a combined :hover:active rule so the button doesn't snap back to the raised hover height while still being held down.
- The transform transition must use a short duration (around 0.12s) with a springy cubic-bezier easing curve so the press feels snappy rather than linear.
- Ship at least three color variants, each pairing a distinctly darker base color with a lighter face color of the same hue (roughly 25-35% darker for the base).
- Use real button elements (not divs) so the buttons are keyboard focusable and the :active press animation also fires on Enter/Space activation, and keep outline-offset generous enough that the focus ring doesn't clip into the raised face.`,
    },
  },
};

export default threeDButton;
