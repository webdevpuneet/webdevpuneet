const brutalistPressButton = {
  id: 'brutalist-press-button',
  title: 'Tactile Brutalist Press Button',
  lastmod: '2026-08-08',
  category: 'buttons',
  html: `<div class="demo-wrap">
  <h2 class="demo-title">Brutalist Press Buttons</h2>
  <p class="demo-sub">Click and hold — each button physically pushes into its own shadow.</p>

  <div class="btn-row">
    <button class="brute-btn brute-yellow" id="btn-buy">BUY NOW</button>
    <button class="brute-btn brute-pink" id="btn-add">ADD TO CART</button>
    <button class="brute-btn brute-lime" id="btn-go" disabled>SOLD OUT</button>
  </div>

  <p class="press-log" id="press-log">Press a button to see the click register below.</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f4f4f0; min-height: 100vh; }

.demo-wrap { max-width: 560px; margin: 0 auto; padding: 48px 20px; text-align: center; }
.demo-title { font-size: 22px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 6px; }
.demo-sub { font-size: 13px; color: #555; margin-bottom: 32px; }

.btn-row { display: flex; flex-wrap: wrap; gap: 28px; justify-content: center; margin-bottom: 36px; }

.brute-btn {
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #111;
  background: #fff;
  border: 3px solid #111;
  border-radius: 2px;
  padding: 14px 26px;
  cursor: pointer;
  box-shadow: 5px 5px 0 #111;
  transform: translate(0, 0);
  transition: transform 0.08s ease, box-shadow 0.08s ease;
}

.brute-yellow { background: #ffd60a; }
.brute-pink   { background: #ff6b9a; }
.brute-lime   { background: #d3ff5c; }

.brute-btn:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 6px 6px 0 #111;
}

.brute-btn:active:not(:disabled),
.brute-btn.is-pressed:not(:disabled) {
  transform: translate(5px, 5px);
  box-shadow: 0 0 0 #111;
}

.brute-btn:focus-visible {
  outline: 3px solid #111;
  outline-offset: 4px;
}

.brute-btn:disabled {
  background: #ddd;
  color: #999;
  border-color: #999;
  box-shadow: 5px 5px 0 #999;
  cursor: not-allowed;
}

.press-log {
  font-size: 13px;
  color: #111;
  background: #fff;
  border: 3px solid #111;
  border-radius: 2px;
  padding: 10px 16px;
  display: inline-block;
  min-width: 260px;
  box-shadow: 4px 4px 0 #111;
}`,
  js: `const buttons = document.querySelectorAll('.brute-btn:not(:disabled)');
const log = document.getElementById('press-log');
let count = 0;

buttons.forEach(btn => {
  // Keyboard activation (space/enter) doesn't trigger :active the same
  // way a mouse click does in every browser, so we mirror the pressed
  // state manually to keep the tactile feedback consistent everywhere.
  btn.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') btn.classList.add('is-pressed');
  });
  btn.addEventListener('keyup', e => {
    if (e.key === ' ' || e.key === 'Enter') btn.classList.remove('is-pressed');
  });

  btn.addEventListener('click', () => {
    count += 1;
    log.textContent = '"' + btn.textContent.trim() + '" pressed (' + count + ' total clicks)';
  });
});`,
  seo: {
    title: 'Tactile Brutalist Press Button — HTML CSS JS Snippet',
    description: 'Thick-border, high-contrast buttons with a hard offset shadow that visually presses flat into place on click. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Tactile Brutalist Press Button — Hard Offset Shadow, Physical Press Animation & High-Contrast UI',
      description: `Neumorphism dominated button design in the early 2020s: soft, low-contrast surfaces with blurred dual shadows meant to look carved out of a single material. It looked elegant in a design file and tested poorly in the real world &mdash; low contrast made buttons hard to see, and the blurred shadow gave no clear affordance for what was actually clickable. This snippet is the opposite approach: a tactile, brutalist button that communicates "this is a physical, pressable object" through hard edges, flat saturated color, and a shadow that behaves like a real 3D offset rather than a soft glow.

**Why brutalist, tactile design fits 2026 interfaces**

Interface design in 2026 has swung toward directness and high contrast, partly as a reaction to the sameness of soft, blurred, low-information UI, and partly because accessibility-first design demands stronger visual distinction between interactive and static elements. A brutalist button uses a thick 3px solid black border, a completely flat fill color with no gradient, and a hard-edged \`box-shadow: 5px 5px 0 #111\` &mdash; note there is no blur radius, which is the detail that separates this from a conventional drop shadow and makes the shadow read as a literal offset silhouette sitting behind the button, like a printed sticker peeling slightly off the page. This aesthetic borrows directly from print design, punk zine layouts, and early web brutalism, and it is being reintroduced deliberately in product UI because it is unmistakably legible: users do not need to guess whether something is clickable.

**The physical press mechanic**

The defining interaction in this snippet is not the resting appearance, it's what happens on press. On \`:active\`, the button's \`transform\` shifts by exactly the same distance as the shadow offset &mdash; \`translate(5px, 5px)\` against a \`5px 5px\` shadow &mdash; while the \`box-shadow\` itself collapses to \`0 0 0\`. The visual result is that the button appears to travel down into the space the shadow was occupying, exactly as if a raised physical object were being pushed flush against the surface behind it. This only reads correctly if the translate distance and the shadow's default offset match precisely; a common mistake is to translate more or less than the shadow offset, which breaks the illusion and makes the movement look arbitrary rather than mechanical.

**Why the transition is short and linear-feeling, not springy**

The CSS \`transition: transform 0.08s ease, box-shadow 0.08s ease\` is deliberately fast and un-bouncy. Brutalism as a visual language is about directness, not playfulness &mdash; a soft spring or elastic easing curve would undercut the hard-edged aesthetic by making the press feel cushioned. An 80ms linear-feeling transition keeps the interaction snappy and immediate, closer to a mechanical switch than a squishy button. A subtle hover state is included too: on hover the button lifts by 1px in the opposite direction with a slightly larger shadow, previewing the pressable affordance before the user commits to a click.

**Accessibility and keyboard support**

Because \`:active\` only fires reliably for pointer interactions in some browsers, this snippet also toggles an \`.is-pressed\` class via \`keydown\`/\`keyup\` listeners for Space and Enter, so keyboard users see the identical press animation, not just a focus ring. A visible \`:focus-visible\` outline (a thick offset outline, matching the brutalist language rather than a soft browser-default blue ring) ensures keyboard focus is unmistakable. The high-contrast black-on-saturated-color palette used here (\`#ffd60a\` yellow, \`#ff6b9a\` pink, \`#d3ff5c\` lime) is intentional: this style should not be softened with muted pastels, since low contrast defeats the entire premise of a tactile, unmistakably clickable button.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Press and hold a button',
          text: 'Click and hold any enabled button in the demo. Notice the button translates diagonally by the exact distance its shadow was offset, and the shadow itself shrinks to zero — this is the "press into the shadow" mechanic driven entirely by the :active pseudo-class.',
        },
        {
          title: 'Match the translate distance to the shadow offset',
          text: 'The resting state uses box-shadow: 5px 5px 0 #111 and :active uses transform: translate(5px, 5px). These two numbers must match exactly, or the press will look like the button is floating rather than sinking into place. If you change the shadow offset, update the active-state transform to match.',
        },
        {
          title: 'Add or change color variants',
          text: 'Duplicate a .brute-yellow style block, rename the class (e.g. .brute-blue), and set a flat, saturated background color. Keep the 3px solid #111 border and the box-shadow color unchanged across variants so the tactile language stays consistent regardless of fill color.',
        },
        {
          title: 'Keep keyboard users in sync',
          text: 'The JS toggles an .is-pressed class on keydown/keyup for Space and Enter so keyboard activation shows the same press animation as a mouse click. If you add new buttons dynamically, re-attach these listeners or delegate them from a parent container.',
        },
        {
          title: 'Style the disabled state deliberately',
          text: 'The SOLD OUT button demonstrates a disabled state: a muted grey fill, grey border and shadow, and cursor: not-allowed. Keep the same thick-border shape so disabled buttons are still recognizable as buttons, just visibly inactive.',
        },
        {
          title: 'Export and drop into your interface',
          text: 'Click HTML to download a standalone file, or JSX for a React component. In Tailwind, recreate the shadow with an arbitrary value like shadow-[5px_5px_0_#111] and the active state with active:translate-x-[5px] active:translate-y-[5px] active:shadow-none.',
        },
      ],
    },
    features: [
      'Hard offset shadow: box-shadow with zero blur radius, e.g. 5px 5px 0 #111, reads as a literal object silhouette',
      'Physical press mechanic: :active transform matches the shadow offset exactly while box-shadow collapses to 0',
      'Fast 80ms linear-feeling transition on transform and box-shadow — deliberately not springy or bouncy',
      'Subtle hover lift: -1px translate with a slightly larger shadow previews the pressable affordance',
      'Keyboard parity: keydown/keyup listeners toggle an .is-pressed class for Space and Enter so :active behavior is matched',
      'Thick 3px solid border with near-zero border-radius for the sharp-edged brutalist silhouette',
      'High-contrast flat fill colors (no gradients) with black text and border for maximum legibility',
      'Fully styled disabled state with muted grey fill, border, and shadow plus cursor: not-allowed',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Ecommerce buy and add-to-cart buttons that beg to be clicked',
        desc: 'Primary purchase actions benefit from unmistakable, high-contrast affordance — a brutalist button with a hard shadow and a satisfying press animation makes the buy action feel tactile and confident, which is exactly the opposite of the soft, low-contrast buttons that make users hesitate before checkout. Pair it with the [Checkout Trust Badge Strip](/ui-snippets/trust-badge-strip) beneath the button for a complete high-conversion checkout moment.',
      },
      {
        icon: 'APP',
        title: 'Bold marketing and landing page CTAs',
        desc: 'Landing pages for products that want to stand out from the generic soft-gradient SaaS aesthetic use brutalist buttons to signal a distinct, confident brand voice. The flat saturated colors and thick borders photograph well in screenshots and social previews, making the CTA itself part of the page\'s visual identity rather than an afterthought.',
      },
      {
        icon: 'DESIGN',
        title: 'Design systems reviving print-inspired, high-contrast visual language',
        desc: 'Brands moving away from the soft neumorphic and glassmorphic styles of the early 2020s toward a punk zine, print-poster aesthetic use this button as a foundational component. Because the press mechanic is purely CSS-driven (transform and box-shadow), it is trivial to theme across an entire design system by swapping the fill colors while keeping the border and shadow language identical.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching precise transform-to-shadow-offset matching',
        desc: 'This snippet is a clean teaching example of a specific CSS technique: making a translate distance exactly match a box-shadow offset so a press animation reads as physically correct rather than arbitrary. It is a useful reference for any interface element that needs to simulate a raised-to-pressed physical transition, not just buttons.',
      },
      {
        icon: 'CODE',
        title: 'Accessible tactile buttons for keyboard and screen-reader users',
        desc: 'Many hand-rolled "fancy button" implementations only animate on mouse :active and leave keyboard users with a flat, unanimated click. This snippet\'s keydown/keyup handling ensures the identical physical press animation fires for Space and Enter activation, keeping the tactile feedback consistent regardless of input method.',
      },
      {
        icon: 'FLOW',
        title: 'Gamified or playful product interactions needing a satisfying click',
        desc: 'Products with a game-like or toy-like interaction model — quiz apps, voting interfaces, playful onboarding flows — benefit from a button that gives strong, immediate physical feedback on every tap. The instant, non-bouncy press communicates responsiveness in a way a soft fade-based button state change cannot.',
      },
      { icon: 'CODE', title: 'Related: Contact Picker Button', desc: 'See the [Contact Picker Button](/ui-snippets/contact-picker-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why does the button need to translate by the exact same amount as its shadow offset?',
        a: 'The illusion of the button pressing "into" its shadow only works if the two numbers match. The shadow at rest represents the distance between the button\'s top surface and the surface behind it. When you translate the button by that same distance while shrinking the shadow to zero, the button visually lands exactly where the shadow used to end, simulating it physically compressing flat. If the translate distance is smaller or larger than the shadow offset, the motion looks disconnected from the shadow and breaks the physical metaphor.',
      },
      {
        q: 'Can I use this brutalist button style with rounded corners?',
        a: 'You can, but it works against the aesthetic. Brutalist design specifically rejects the soft, friendly rounded-corner language of neumorphism and most default UI kits in favor of sharp, deliberate edges. This snippet uses border-radius: 2px, just enough to avoid razor-sharp corners rendering awkwardly on some displays, while still reading as essentially square. If you need heavier rounding for brand consistency, consider whether the hard-offset shadow technique still fits your visual language, since the combination of soft corners and a hard shadow can look inconsistent.',
      },
      {
        q: 'How do I make the press animation feel even snappier or slower?',
        a: 'Adjust the transition duration on .brute-btn — 0.08s is very fast and mechanical; going up to 0.12-0.15s still feels responsive but slightly softer, while dropping below 0.05s can feel too abrupt to register as an animation at all. Keep the easing as ease or linear rather than a bouncy cubic-bezier, since spring easing contradicts the direct, un-cushioned feel that defines this style.',
      },
      {
        q: 'Does this button work well on touch devices where there is no real hover state?',
        a: 'Yes. The core press mechanic relies on :active, which touch browsers trigger on touchstart and release on touchend, so the press-and-release animation still plays correctly on mobile. The hover lift effect simply will not trigger on touch devices, which is expected and harmless — the primary tactile feedback (the press itself) is preserved regardless of input method.',
      },
      {
        q: 'How do I disable a button while keeping the brutalist visual style?',
        a: 'Add the disabled attribute to the button and rely on the :disabled CSS selector already in this snippet, which swaps the fill, border, and shadow to a muted grey while keeping the same thick-border shape and setting cursor: not-allowed. This keeps the disabled button recognizable as the same component family rather than looking like a different, broken element.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the :active transform value has to numerically match the resting box-shadow offset for the "press into the shadow" illusion to read correctly — that relationship is the entire trick behind the animation and is worth understanding before you start customizing it. You can also ask the assistant to help you build a Tailwind-only version using arbitrary value utilities for the hard shadow and active-state transform, or to add a third "long-press" visual state for buttons that trigger a destructive or slow action. It's a good candidate for asking the assistant to audit for accessibility gaps too, such as whether the keyboard press animation and focus outline remain distinct enough from each other when both are visible at once.`,
      prompt: `Build a tactile, brutalist-style button component in plain HTML, CSS, and JavaScript with a hard offset shadow that visually collapses when the button is pressed.

Requirements:
- Each button has a thick (3-4px) solid, high-contrast border, a flat saturated fill color with no gradient or blur, minimal or no border-radius, and a box-shadow with zero blur radius offset diagonally (e.g. 5px 5px 0 #000) so it reads as a literal object silhouette rather than a soft drop shadow.
- On :active (and via an equivalent keyboard-triggered state for Space/Enter activation), the button must translate by the exact same distance as its resting shadow offset while the shadow itself shrinks to zero, so it looks like the button physically presses down into the space the shadow occupied.
- Use a fast, non-bouncy transition (around 80-120ms, linear or ease, not a spring/elastic curve) on transform and box-shadow only — the interaction should feel direct and mechanical, not soft or playful.
- Include a subtle hover state that slightly lifts the button and enlarges its shadow before it is pressed, to preview the pressable affordance.
- Provide at least 2-3 button variants in different flat saturated colors, plus a properly styled disabled state (muted colors, cursor: not-allowed) that keeps the same thick-border shape.
- Ensure the button remains keyboard accessible: a visible, high-contrast focus outline distinct from the hover/press styling, and identical press-animation behavior whether triggered by mouse or keyboard.`,
    },
  },
};
export default brutalistPressButton;
