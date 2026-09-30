const claymorphismCard = {
  id: 'claymorphism-card',
  title: 'Claymorphism Card',
  category: 'cards',
  html: `<div class="clay-card">
  <div class="clay-icon">
    <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
  </div>
  <h3 class="clay-title">Daily Streak</h3>
  <p class="clay-text">You're on a 7-day roll. Keep going to unlock the gold badge!</p>
  <button class="clay-btn">Claim reward</button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #c8d0f5;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}

.clay-card {
  width: 290px;
  background: #eef1ff;
  border-radius: 34px;
  padding: 32px 28px;
  text-align: center;
  /* Claymorphism = big soft outer drop shadow + two inner highlights/shadows */
  box-shadow:
    18px 18px 40px rgba(99,102,241,0.30),
    inset -8px -8px 16px rgba(165,180,252,0.55),
    inset 8px 8px 18px rgba(255,255,255,0.9);
}

.clay-icon {
  width: 74px; height: 74px;
  margin: 0 auto 20px;
  display: grid; place-items: center;
  border-radius: 26px;
  background: #6366f1;
  box-shadow:
    8px 8px 18px rgba(99,102,241,0.45),
    inset -4px -4px 10px rgba(67,56,202,0.6),
    inset 4px 4px 10px rgba(165,180,252,0.7);
}
.clay-icon svg { width: 34px; height: 34px; fill: #fff; }

.clay-title { font-size: 19px; font-weight: 800; color: #3730a3; margin-bottom: 8px; }
.clay-text { font-size: 13.5px; color: #6366f1; line-height: 1.6; margin-bottom: 22px; }

.clay-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 18px;
  background: #6366f1; color: #fff;
  font-size: 14px; font-weight: 700; font-family: inherit;
  cursor: pointer;
  box-shadow:
    6px 6px 14px rgba(99,102,241,0.4),
    inset -3px -3px 8px rgba(67,56,202,0.55),
    inset 3px 3px 8px rgba(165,180,252,0.65);
  transition: transform 0.15s, box-shadow 0.15s;
}
.clay-btn:hover { transform: translateY(-2px); }
.clay-btn:active {
  transform: translateY(0);
  box-shadow: inset 4px 4px 10px rgba(67,56,202,0.6), inset -4px -4px 10px rgba(165,180,252,0.6);
}`,
  js: `// Pure CSS claymorphism — the only script is an optional click log.
// Delegated on document so it works whether the button mounts before or after this runs.
document.addEventListener('click', (e) => {
  if (e.target.closest('.clay-btn')) console.log('Reward claimed');
});`,

  seo: {
    title: 'Claymorphism Card — Puffy 3D Clay UI Snippet',
    description: 'A claymorphism (clay UI) card with the puffy 3D look from a soft outer shadow plus dual inner highlights, in pure CSS. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Claymorphism Card — Puffy 3D Clay Look from Outer Shadow + Inner Highlights',
      description: `Claymorphism — the soft, puffy, "squishy 3D clay" aesthetic popularized by playful apps, 3D illustration kits, and gamified UIs — is a rising design trend (alongside [neumorphism](/ui-snippets/neumorphism-card/) and [glassmorphism](/ui-snippets/glass-card/)) that developers search for because the effect looks complex but is entirely achievable with CSS \`box-shadow\`. This snippet is a complete claymorphic card: a chunky rounded container, a raised icon "blob", and a pressable button (see also the [3D push button](/ui-snippets/3d-button/)), all sharing the same clay recipe. It is pure CSS, and once you learn the three-shadow formula you can make any element look like inflated clay.

**The claymorphism recipe: one outer + two inner shadows**

The clay look comes from stacking **three shadows on every element**: one large, soft, colored **outer drop shadow** that lifts the shape off the page, and two **inset shadows** — a dark one and a light one on opposite interior edges — that round the inside so the element looks inflated, like a piece of pressed clay. The card uses \`18px 18px 40px rgba(99,102,241,0.30)\` for the big outer shadow, then \`inset -8px -8px 16px rgba(165,180,252,0.55)\` (a soft purple inner shadow on the bottom-right) and \`inset 8px 8px 18px rgba(255,255,255,0.9)\` (a bright white inner highlight on the top-left). The white inset highlight is what gives clay its signature "puffy and soft" rounded-inward feel; without it, you just have a flat card with a drop shadow.

**Why huge border-radius is essential**

Claymorphism only reads as "clay" with very large corner radii — the card uses \`border-radius: 34px\`, the icon \`26px\`, the button \`18px\`. Clay is soft and has no sharp edges, so generous rounding is mandatory; small radii make the inner shadows look like a bevel rather than inflated clay. Pair the big radius with the inner highlights and the shape looks like it was molded, not drawn. This is the most common mistake people make trying to copy the style — they use the shadows but keep tight corners, and it falls flat.

**How claymorphism differs from neumorphism**

Both use inset shadows, but the look and rules are different. **Neumorphism** is monochrome and low-contrast: the element must match its background exactly, and the effect is a subtle extrusion of the same surface. **Claymorphism** is colorful and high-contrast: elements are a different, often pastel color from the background, the outer shadow is large and tinted, and the inner highlights are strong (especially the bright white one), producing a bold, toy-like, three-dimensional pop rather than a flat embossed surface. Claymorphism also fixes neumorphism's biggest weakness — poor contrast — because the elements are distinctly colored and clearly raised, so they remain legible and obviously interactive.

**The raised icon blob**

The icon container is its own little clay blob: a colored square with the same three-shadow treatment, so it appears to float above the card surface. It uses the indigo accent for fill, a colored outer shadow, and inset shadows tuned to its color (a darker indigo inset and a lighter periwinkle highlight). This nesting — a clay icon sitting on a clay card — is what gives claymorphic designs their layered, tactile depth. The white SVG icon inside stays crisp and high-contrast against the indigo blob.

**The pressable clay button**

The button is raised by default with the clay shadows, lifts slightly on hover (\`translateY(-2px)\`), and on \`:active\` swaps to **only inset shadows** — which makes it look pressed *into* the surface, like poking soft clay. This raised-to-pressed toggle is the most satisfying claymorphic interaction and reinforces the material metaphor: the button physically deforms when you press it. Because only \`transform\` and \`box-shadow\` change, it stays smooth on the GPU.

**Customizing the clay**

Claymorphism is built around a single hue. To re-theme, pick a pastel background, a slightly lighter element color, and an accent for the icon/button, then derive the shadow colors: the outer shadow is a translucent tint of the accent, the dark inset is a darker shade, and the light inset is white or a very light tint. Change all three together to keep the material consistent. Increase the outer shadow blur and offset for a more "floating" look, or boost the inset opacities for a puffier, more inflated feel. Keep the radii large. Because every element follows the same recipe, swapping the hue re-skins the whole card at once.

**Accessibility note**

Unlike neumorphism, claymorphism's strong color contrast and clear elevation make it more accessible by default — buttons and cards are obviously distinct from the background and clearly interactive. Still, ensure the text color has sufficient contrast against the element (the dark indigo title and indigo body text here read clearly on the light lavender card), and add a visible \`:focus-visible\` ring to interactive elements so keyboard users can see focus, since the clay shadows alone do not indicate it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Apply the three-shadow recipe', text: 'Give each element one large soft colored outer shadow plus two inset shadows — a dark one and a bright white one on opposite interior edges. The white inset creates the puffy look.' },
        { title: 'Use very large border-radius', text: 'Clay has no sharp edges. Keep radii generous (30px+ on cards) or the effect reads as a bevel instead of inflated clay.' },
        { title: 'Pick one hue', text: 'Choose a pastel background, a lighter element color, and an accent. Derive the shadow colors from the accent (translucent tint outer, darker + white insets).' },
        { title: 'Add a pressed state', text: 'On :active, swap the button to inset-only shadows so it looks poked into the surface, like soft clay.' },
        { title: 'Add a focus ring', text: 'Add a :focus-visible outline to buttons so keyboard focus is visible — the clay shadows alone do not show it.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Signature puffy clay look from one outer shadow + two inset highlights',
      'Bright white inset highlight that creates the inflated, soft-clay feel',
      'Very large border-radius for the edgeless, molded clay shape',
      'Nested clay: a raised icon blob sitting on the clay card',
      'Pressable button that swaps to inset-only shadows on :active (poked-in)',
      'Single-hue recipe — re-skin the whole card by changing one accent color',
      'Higher contrast and accessibility than neumorphism',
      'Pure CSS — JavaScript optional, only logs the click',
      'GPU-friendly: only transform and box-shadow animate on interaction',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'GAME',   title: 'Gamified & playful app UIs',        desc: 'Streak cards, reward badges, and achievement tiles where the toy-like clay look fits a fun, motivating product.' },
      { icon: 'DESIGN', title: 'Trendy 3D-style landing pages',     desc: 'Pair claymorphic cards with 3D illustrations for a soft, modern aesthetic that stands out from flat designs.' },
      { icon: 'APP',    title: 'Kids, education, and wellness apps', desc: 'The friendly, squishy look suits learning apps, habit trackers, and wellness products aimed at a broad audience.' },
      { icon: 'LEARN',  title: 'Learn the clay shadow recipe',      desc: 'Understand the one-outer-plus-two-inset formula and why a large radius and a white inset highlight make it read as clay.' },
      { icon: 'PRO',    title: 'Compare clay vs neumorphism',       desc: 'See how claymorphism uses color and high contrast to fix neumorphism\'s legibility problems while keeping the soft 3D feel.' },
      { icon: 'CODE',   title: 'Reusable clay primitives',          desc: 'Build raised and pressed clay utility styles once and apply them to cards, icons, and buttons across a playful design system.' },
      { icon: 'CODE', title: 'Related: Gift Wrap Option Card', desc: 'See the [Gift Wrap Option Card](/ui-snippets/gift-wrap-option-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is claymorphism in CSS?', a: 'Claymorphism is a soft, puffy "3D clay" UI style made with three box-shadows on each element: one large, soft, colored outer drop shadow that lifts the shape, plus two inset shadows — a dark one and a bright white one on opposite interior edges — that round the inside so it looks inflated. Paired with very large border-radius, elements look molded from clay.' },
      { q: 'How is claymorphism different from neumorphism?', a: 'Neumorphism is monochrome and low-contrast — elements match the background and look subtly embossed. Claymorphism is colorful and high-contrast — elements are a different pastel color, the outer shadow is large and tinted, and a strong white inset highlight makes shapes pop in 3D. Claymorphism is more legible and obviously interactive as a result.' },
      { q: 'Why does it need such a large border-radius?', a: 'Clay is soft with no sharp edges, so generous rounding (30px+ on cards) is essential. With tight corners the inset shadows look like a bevel rather than inflated clay, which is the most common reason copies of the style fall flat.' },
      { q: 'How do I make the button look pressed?', a: 'On :active, replace the button\'s raised shadows with inset-only shadows. That inverts the light direction so the button appears poked into the surface, like pressing soft clay, then it pops back when released.' },
      { q: 'How do I re-theme a claymorphic component?', a: 'Pick a single hue: a pastel background, a lighter element color, and an accent. Derive the three shadow colors from the accent — a translucent tint for the outer shadow, a darker shade for the dark inset, and white for the light inset — and change them together to keep the material consistent.' },
      { q: 'Can I use this claymorphism card in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. The effect is pure CSS box-shadow and border-radius, so it works identically in React — just keep the three-shadow recipe and large radii on each element.' },
    ],
    aiPrompt: {
      paragraph: `Since this effect lives entirely in box-shadow values, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the card needs three separate shadows (one outer, two inset) rather than two, and why the two inset shadows are positioned on opposite corners instead of the same one. The same assistant is useful for checking your understanding of the neumorphism-versus-claymorphism distinction — ask it to point out precisely which values in this CSS would need to change to make the card read as neumorphic instead of claymorphic. It's also a good partner for extending the component: ask it to derive all the shadow colors from a single CSS custom property so re-theming is a one-line change instead of editing six rgba values, add a loading/disabled clay state for the button, or build a second clay element (like a toggle switch) that reuses the same raised-to-pressed interaction pattern. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "claymorphism" styled card in plain CSS only (markup can be minimal HTML, at most a tiny click-logging script) — no images, no SVG filters, no libraries.

Requirements:
- Every clay element (the card, an icon container, and a button) must use exactly three stacked box-shadow values: one large, soft, colored, non-inset outer shadow that lifts the shape off the page, plus two inset shadows positioned on opposite interior corners of each other — one darker/saturated and one bright near-white — so the element reads as inflated rather than flat.
- Use noticeably large border-radius values on every clay element (at least 24-34px on the card, proportionally large on smaller elements) — the puffy look must break if the corners are made small, so the recipe should visibly depend on generous rounding.
- All shadow colors across the card, icon, and button must derive from one shared accent hue (e.g. all reference the same base color at different opacities/lightness) so that changing one accent value could restyle the whole component consistently.
- The button must visually invert on :active — swapping from its raised (outer + inset) shadow combination to an inset-only shadow combination — so it appears pressed into the surface like soft clay, and must revert automatically on release.
- The button must also lift slightly (a small upward translateY) on hover, using only transform and box-shadow transitions so the interaction stays smooth on the GPU with no layout-triggering properties animating.
- Ensure text color contrast against the pastel clay background is clearly legible, and add a visible focus state for keyboard users on the interactive button (the shadow recipe alone does not indicate keyboard focus).`,
    },
  },
};

export default claymorphismCard;
