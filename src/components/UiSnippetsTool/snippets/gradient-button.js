const gradientButton = {
  id: 'gradient-button',
  title: 'Gradient Button',
  category: 'buttons',
  html: `<div class="wrap">
  <button class="grad-btn">
    <span>Get Started</span>
  </button>

  <button class="grad-btn sweep">
    <span>Upgrade to Pro</span>
  </button>

  <button class="grad-btn outline">
    <span>Learn More</span>
  </button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #0f172a;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}

.wrap { display: flex; flex-wrap: wrap; gap: 20px; padding: 24px; }

/* Base gradient button */
.grad-btn {
  position: relative;
  border: none;
  border-radius: 12px;
  padding: 14px 30px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
  background-size: 200% 200%;
  background-position: 0% 50%;
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.35);
  transition: background-position 0.5s ease, transform 0.15s ease, box-shadow 0.3s ease;
}
.grad-btn span { position: relative; z-index: 1; }

.grad-btn:hover {
  background-position: 100% 50%;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(236, 72, 153, 0.45);
}
.grad-btn:active { transform: translateY(0); }

/* Animated shine sweep variant */
.grad-btn.sweep { overflow: hidden; }
.grad-btn.sweep::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.6s ease;
}
.grad-btn.sweep:hover::after { transform: translateX(120%); }

/* Gradient outline (border) variant */
.grad-btn.outline {
  background: #0f172a;
  box-shadow: none;
  z-index: 0;
}
.grad-btn.outline::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
.grad-btn.outline:hover {
  background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
  transform: translateY(-2px);
}
.grad-btn.outline:hover::before { opacity: 0; }`,
  js: `// Pure CSS — no JavaScript needed. Hover any button to see the gradient shift.
// Optional: log clicks
document.querySelectorAll('.grad-btn').forEach(btn => {
  btn.addEventListener('click', () => console.log('Clicked:', btn.textContent.trim()));
});`,

  seo: {
    title: 'CSS Gradient Button — Animated Hover Snippet',
    description: 'Three animated CSS gradient buttons — moving gradient, shine sweep, and gradient border — with hover lifts and no JS. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS Gradient Button — Moving Gradient, Shine Sweep & Gradient Border on Hover',
      description: `A gradient button is one of the most-searched UI snippets because a well-made gradient instantly makes a call-to-action feel modern and premium without any images or libraries. This snippet ships three production-ready variants built entirely with CSS: a button whose gradient **slides on hover**, a button with an animated **shine sweep**, and a button with an animated **gradient border** (outline) and a transparent fill. All three are pure CSS — the JavaScript is optional and only logs clicks.

**The moving-gradient technique**

The base \`.grad-btn\` uses \`background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899)\` with the crucial pair \`background-size: 200% 200%\` and \`background-position: 0% 50%\`. Because the gradient is drawn at twice the button's size, only part of it is visible at a time. On hover, \`background-position: 100% 50%\` shifts which slice of that oversized gradient is shown, and \`transition: background-position 0.5s ease\` animates the slide. This is the canonical CSS trick for animating a gradient — you cannot transition the gradient's color stops directly, so instead you make the gradient larger than its box and move the viewport across it.

**The hover lift and shadow**

Each button adds \`transform: translateY(-2px)\` on hover for a subtle lift, paired with a deeper, color-matched \`box-shadow\` (\`0 12px 32px rgba(236, 72, 153, 0.45)\`). The shadow uses the same pink as the gradient's end stop so the glow looks like it belongs to the button rather than a generic drop shadow. \`:active\` resets \`translateY(0)\` so the button presses back down when clicked, giving tactile feedback. The text sits in a \`<span>\` with \`position: relative; z-index: 1\` so it always stays above the pseudo-element effects.

**The shine sweep (::after) variant**

The \`.sweep\` button has \`overflow: hidden\` and an \`::after\` pseudo-element absolutely positioned to fill the button. Its background is a diagonal \`linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)\` — a thin band of semi-transparent white. It starts off-screen with \`transform: translateX(-120%)\`. On hover, \`transform: translateX(120%)\` slides the band across the button and \`transition: transform 0.6s ease\` animates the sweep. This is the glossy "light reflection" effect you see on premium and gaming UI buttons (pair it with a [neon glow](/ui-snippets/neon-glow/) for a fuller arcade look), and it costs nothing — no images, no JavaScript, just one pseudo-element.

**The gradient-border (outline) variant**

The hardest gradient effect — a gradient *border* with a solid or transparent center — is done with the CSS mask trick. The \`.outline\` button has a dark fill matching the page background and an \`::before\` pseudo-element that fills the button, has \`padding: 2px\`, and is painted with the gradient. The two masks \`linear-gradient(#000 0 0) content-box\` and \`linear-gradient(#000 0 0)\` combined with \`mask-composite: exclude\` (and the \`-webkit-\` prefix for Safari/Chrome) punch out the center, leaving only the 2px padding ring filled with gradient. The result is a crisp gradient border that no \`border-image\` rounding bug can ruin. On hover, the fill becomes the gradient and the border fades, so the button "fills in."

**Why CSS instead of an SVG or image**

Image-based gradient buttons do not scale crisply, cannot animate, and add HTTP requests. A CSS gradient button is resolution-independent, animates on the GPU (\`transform\` and \`background-position\` are cheap to animate), and is trivially themeable — change three hex values in the \`linear-gradient\` and every variant updates. It also inherits accessibility for free because it is a real \`<button>\` element: it is focusable, keyboard-activatable, and announced correctly by screen readers.

**Customizing the colors and angle**

Every gradient in the snippet uses \`linear-gradient(135deg, #6366f1, #a855f7, #ec4899)\` (indigo → purple → pink). Change the angle (135deg) to rotate the gradient, add or remove color stops, or swap to brand colors. For a two-color gradient, delete the middle stop. To match the shadow to your new palette, update the \`rgba()\` color in \`box-shadow\` to your gradient's end color. Because all three variants reference the same gradient, a single find-and-replace re-themes the entire set.

**Performance and accessibility**

The animations only use \`transform\`, \`background-position\`, and \`box-shadow\`, all of which the browser can composite smoothly at 60fps. There is no layout thrash because nothing changes \`width\`, \`height\`, or \`top/left\`. For accessibility, keep sufficient contrast between the white label and the gradient (the indigo-to-pink range here passes AA for bold text), add a visible \`:focus-visible\` outline if your design removes the default, and wrap motion in \`@media (prefers-reduced-motion: reduce)\` to disable the sweep for users who prefer less animation. Because these are native buttons, they already work with keyboard and assistive tech.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy a button variant', text: 'Pick the plain gradient, the .sweep shine, or the .outline gradient border. Each is a self-contained <button> with a <span> label.' },
        { title: 'Change the label', text: 'Edit the text inside the <span> — keep it in the span so it stays above the pseudo-element effects.' },
        { title: 'Re-theme the gradient', text: 'Replace the three hex stops in every linear-gradient(135deg, …) with your brand colors, and update the box-shadow rgba() to match the end color.' },
        { title: 'Tune the hover speed', text: 'Adjust transition: background-position 0.5s for the slide, or the 0.6s on .sweep::after for the shine.' },
        { title: 'Add a focus ring', text: 'Add a :focus-visible outline if your reset removes default focus styling, for keyboard accessibility.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Moving gradient on hover via background-size: 200% + background-position shift',
      'Animated shine sweep with a translucent ::after band and translateX',
      'Gradient border (outline) using the mask-composite: exclude trick',
      'Color-matched box-shadow glow that lifts on hover (translateY)',
      ':active press-down feedback for a tactile click',
      'Pure CSS — JavaScript is optional and only logs clicks',
      'GPU-friendly: animates only transform, background-position, and box-shadow',
      'Real <button> elements — keyboard and screen-reader accessible',
      'Re-theme the whole set by editing one linear-gradient',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'APP',    title: 'Primary call-to-action buttons',    desc: 'Sign up, Get started, and Upgrade buttons where a vivid gradient draws the eye and lifts conversion versus a flat solid color.' },
      { icon: 'PRO',    title: 'Pricing and upgrade CTAs',          desc: 'The .sweep shine variant is perfect for "Upgrade to Pro" buttons on a [pricing card](/ui-snippets/pricing-card/) — the moving highlight implies premium without extra graphics.' },
      { icon: 'DESIGN', title: 'Outline buttons on dark UIs',       desc: 'The gradient-border variant gives a secondary action a colorful outline that fills in on hover, ideal on dark landing pages.' },
      { icon: 'LEARN',  title: 'Learn the animated-gradient trick',  desc: 'See exactly why background-size: 200% + background-position is the standard way to animate a CSS gradient, since color stops cannot transition.' },
      { icon: 'CODE',   title: 'Reusable button component',          desc: 'Drop the three classes into your design system as primary, accent, and outline button styles — alongside [3D push buttons](/ui-snippets/3d-button/) and a [button group](/ui-snippets/button-group/), all sharing one gradient variable.' },
      { icon: 'ACCESS', title: 'Accessible by default',             desc: 'Built on native <button> elements, so they are focusable and keyboard-activatable; add prefers-reduced-motion to respect motion preferences.' },
      { icon: 'CODE', title: 'Related: Payment Request API Button', desc: 'See the [Payment Request API Button](/ui-snippets/payment-request-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do you animate a CSS gradient on hover?', a: 'You cannot transition a gradient\'s color stops directly. Instead set background-size: 200% 200% so the gradient is larger than the button, then animate background-position from 0% 50% to 100% 50% on hover with transition: background-position. This slides the visible slice of the oversized gradient.' },
      { q: 'How does the gradient border work?', a: 'The .outline button uses a ::before painted with the gradient and a 2px padding ring. Two masks combined with -webkit-mask-composite: xor / mask-composite: exclude punch out the center, leaving only the padding ring filled with the gradient — a crisp gradient border that border-image cannot match on rounded corners.' },
      { q: 'How do I change the colors?', a: 'Replace the three hex values in every linear-gradient(135deg, #6366f1, #a855f7, #ec4899) with your brand colors, and update the rgba() in box-shadow to your gradient\'s end color so the glow matches.' },
      { q: 'Does it need JavaScript?', a: 'No. All three buttons are pure CSS — the gradient slide, shine sweep, and gradient border all run on hover with no scripts. The included JavaScript is optional and only logs which button was clicked.' },
      { q: 'How do I respect reduced-motion preferences?', a: 'Wrap the hover animations in @media (prefers-reduced-motion: no-preference) or disable them in @media (prefers-reduced-motion: reduce) so users who prefer less motion get an instant color change instead of the sweep and slide.' },
      { q: 'Can I use this gradient button in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, render a <button> with the gradient classes; the CSS works identically. You can also pass the label and an onClick handler as props.' },
    ],
    aiPrompt: {
      paragraph: `You shouldn't have to puzzle out the mask trick on the outline button by trial and error. Drop this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to walk through exactly how the two stacked masks and mask-composite: exclude on the outline button's before element carve out just a 2px gradient ring instead of filling the whole shape. The same assistant is useful for optimizing it — ask whether transitioning background-position on three separate buttons at once is worth batching into a single CSS custom property update, or whether the shine-sweep's transform-based translateX could be replaced with a will-change hint for smoother compositing on lower-end devices. It's equally handy for extending the set: ask it to add a fourth variant with a pulsing box-shadow glow, wire up a loading spinner state that replaces the label, or generate a script that lets you swap the shared gradient palette across all three buttons from one CSS variable. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build three CSS-only gradient button variants in plain HTML and CSS, with only optional JavaScript for a click log — no libraries.

Requirements:
- A base button with a multi-stop linear-gradient background at background-size 200% 200% and background-position 0% 50%; on hover, shift background-position to 100% 50% with a transition on background-position, so the visible slice of the oversized gradient appears to slide.
- The same base button must lift on hover using transform: translateY(-2px) with a matching increase in a colored box-shadow, and reset with transform: translateY(0) on active/press.
- A second "sweep" variant that adds overflow: hidden and an after pseudo-element covering the button with a thin diagonal semi-transparent white band (a linear-gradient with transparent-white-transparent stops at an angle), positioned off-screen via transform: translateX(-120%), sliding to translateX(120%) on hover with a transition on transform, so a light sweeps across the button.
- A third "outline" variant with a transparent or dark fill and a before pseudo-element that: covers the button, has padding equal to the desired border thickness, is painted with the same gradient, and uses two combined mask layers (one content-box, one full box) with mask-composite: exclude (plus the -webkit- prefixed mask-composite: xor for Safari) so only the padding-width ring is visible as a gradient border. On hover, fill the button with the gradient and fade the border pseudo-element's opacity to 0.
- Keep the label text in a child span with position: relative and a z-index above the pseudo-elements so it is never covered.
- All animated properties must be limited to transform, background-position, and box-shadow only, so everything can run on the compositor without triggering layout.`,
    },
  },
};

export default gradientButton;
