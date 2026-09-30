const neumorphismCard = {
  id: 'neumorphism-card',
  title: 'Neumorphism Card',
  category: 'cards',
  html: `<div class="neu-card">
  <div class="icon">
    <svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
  </div>
  <h3 class="neu-title">Pro Membership</h3>
  <p>Unlock advanced analytics, unlimited projects, and priority support.</p>

  <div class="stats">
    <button class="neu-btn">Activate</button>
    <button class="neu-btn icon-btn" aria-label="Favorite">
      <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.5-9A5.2 5.2 0 0 1 12 5a5.2 5.2 0 0 1 9.5 7c-2.5 4.4-9.5 9-9.5 9z"/></svg>
    </button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  /* Neumorphism needs a mid-tone background — shadows are tints of it */
  background: #e0e5ec;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}

.neu-card {
  width: 300px;
  background: #e0e5ec;
  border-radius: 24px;
  padding: 30px;
  text-align: center;
  /* Two shadows: dark bottom-right, light top-left = extruded look */
  box-shadow: 9px 9px 18px #b8bcc4, -9px -9px 18px #ffffff;
}

.icon {
  width: 64px; height: 64px;
  margin: 0 auto 18px;
  border-radius: 50%;
  display: grid; place-items: center;
  background: #e0e5ec;
  /* Inset shadow = pressed-in well */
  box-shadow: inset 5px 5px 10px #b8bcc4, inset -5px -5px 10px #ffffff;
}
.icon svg { width: 28px; height: 28px; fill: #6366f1; }

.neu-title { font-size: 18px; color: #44495a; margin-bottom: 8px; }
p { font-size: 13.5px; color: #7a8095; line-height: 1.6; margin-bottom: 22px; }

.stats { display: flex; gap: 12px; }

.neu-btn {
  flex: 1;
  padding: 13px;
  border: none;
  border-radius: 14px;
  background: #e0e5ec;
  color: #6366f1;
  font-size: 14px; font-weight: 700; font-family: inherit;
  cursor: pointer;
  box-shadow: 5px 5px 10px #b8bcc4, -5px -5px 10px #ffffff;
  transition: box-shadow 0.18s, color 0.18s;
}
.neu-btn:hover { color: #4f46e5; }
/* Press: swap to inset shadow so the button looks pushed in */
.neu-btn:active {
  box-shadow: inset 4px 4px 8px #b8bcc4, inset -4px -4px 8px #ffffff;
}

.icon-btn { flex: 0 0 48px; display: grid; place-items: center; }
.icon-btn svg { width: 20px; height: 20px; fill: none; stroke: #6366f1; stroke-width: 2; }`,
  js: `// Pure CSS neumorphism — no JavaScript required.
// Press the buttons to see the shadow flip from raised to inset.
document.querySelectorAll('.neu-btn').forEach(b => {
  b.addEventListener('click', () => console.log('Neumorphic press'));
});`,

  seo: {
    title: 'Neumorphism Card — Soft UI CSS Shadow Snippet',
    description: 'A neumorphic (soft UI) card using dual light/dark box-shadows for an extruded look, plus an inset icon well and pressable buttons. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Neumorphism Card — Dual Box-Shadows, Inset Wells & Pressable Soft UI',
      description: `Neumorphism — also called "soft UI" — is one of the most-searched CSS design trends, alongside the [glassmorphism](/ui-snippets/glass-card/) and [claymorphism](/ui-snippets/claymorphism-card/) card styles, because it produces a clean, tactile look where elements appear gently extruded from, or pressed into, the background. This snippet is a complete neumorphic card: an extruded container, an **inset icon well**, and **buttons that press in** on click (compare the [3D push button](/ui-snippets/3d-button/)). It is pure CSS, and once you understand the two-shadow formula you can apply it to any element.

**The core formula: two opposite shadows**

Every neumorphic element uses two \`box-shadow\`s at once — a dark shadow offset toward the bottom-right and a light highlight offset toward the top-left, both the same blur. The card uses \`box-shadow: 9px 9px 18px #b8bcc4, -9px -9px 18px #ffffff\`. The dark shadow (\`#b8bcc4\`) implies light coming from the top-left, so the bottom-right edge is in shadow; the white highlight (\`#ffffff\`) brightens the top-left edge. Together they make the element look like it was extruded from the surface — a single piece of the same material gently raised. This dual-shadow trick is the entire foundation of neumorphism.

**Why the background color is everything**

Neumorphism only works on a **mid-tone background**, never pure white or black. The body uses \`#e0e5ec\`, a light gray, and — critically — the card, icon, and buttons all share that exact same background. The shadows are simply a darker and a lighter tint of \`#e0e5ec\`. If the element were a different color than its surroundings, the illusion of it being "pushed out of" the surface would break. This is why every neumorphic element must match its parent's background: the effect is the surface deforming, not a separate object sitting on top. Pick your background first, then derive the dark shadow (~12% darker) and light highlight (white or ~8% lighter) from it.

**Inset shadows: the pressed-in well**

To make something look pressed *into* the surface instead of raised out of it, you flip the shadows to \`inset\`. The icon container uses \`box-shadow: inset 5px 5px 10px #b8bcc4, inset -5px -5px 10px #ffffff\`. The \`inset\` keyword draws the shadow inside the element, so the dark shadow now sits on the top-left interior and the highlight on the bottom-right — the exact inverse of the raised card. The result is a smooth circular "well" that the icon sits inside. Raised (outer shadow) and pressed (inset shadow) are the only two neumorphic states, and combining them in one component — a raised card containing an inset well — is what gives soft UI its depth.

**Buttons that physically press**

The buttons are raised by default with \`box-shadow: 5px 5px 10px #b8bcc4, -5px -5px 10px #ffffff\`. On \`:active\`, the shadow swaps to the inset version (\`inset 4px 4px 8px …\`), so the button visibly sinks into the surface when pressed, then pops back when released. A \`transition: box-shadow 0.18s\` smooths the change. This raised-to-inset toggle is the most satisfying neumorphic interaction and the clearest way to show the technique: the same element, the same color, only the shadow direction changes between out and in.

**Strengths and the contrast caveat**

Neumorphism looks elegant and modern, and it is trivially themeable — change one background color and re-derive the two shadow tints. Its well-known weakness is **contrast**: because elements share their background color and rely on subtle shadows, edges can be hard to see, which is an accessibility concern for low-vision users and fails WCAG contrast for boundaries. Use neumorphism for decorative containers and secondary controls, and make sure text and icons inside have strong contrast against the surface (here the indigo icons and dark gray text are clearly legible on the light gray). For primary actions where visibility is critical, consider pairing neumorphism with a clearly colored accent or a visible focus ring so the control is unmistakable.

**Tuning the depth**

The shadow offset and blur control how "deep" the effect looks. The card's \`9px 9px 18px\` reads as a firmly raised panel; smaller offsets like \`5px 5px 10px\` (used on the buttons) feel subtler and closer to the surface. Keep the blur roughly double the offset for a soft, realistic falloff. For a more dramatic, chunky look, increase both; for a barely-there soft UI, decrease them. Always change the dark and light shadows together and keep their offsets mirrored (e.g. \`9px 9px\` and \`-9px -9px\`) so the implied light direction stays consistent across every element.

**Customizing the card**

To re-theme, change the shared background (e.g. to a soft blue \`#dde3ec\` or a warm \`#ece5dd\`), then update both shadow colors to a darker and lighter version of it — that single change re-skins the card, icon well, and buttons at once. Swap the icon SVG and the heading/description text for your content. Round the corners more or less with \`border-radius\`. Add a second inset well for an avatar or a progress ring. Because every piece follows the same two-shadow rule, the card stays visually consistent no matter how you extend it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Match the background', text: 'Set the card, icon, and buttons to the SAME background as the page (here #e0e5ec). Neumorphism only works when elements share the surface color.' },
        { title: 'Use the dual-shadow formula', text: 'Apply a dark shadow bottom-right and a light highlight top-left of equal blur for a raised look (box-shadow: 9px 9px 18px dark, -9px -9px 18px light).' },
        { title: 'Add inset wells', text: 'For pressed-in elements (icon container, active buttons), add the inset keyword so the shadows draw inside.' },
        { title: 'Re-theme from one color', text: 'Pick a new mid-tone background, then derive the dark shadow (~12% darker) and light highlight (white) from it and update both everywhere.' },
        { title: 'Tune the depth', text: 'Increase the shadow offset/blur for a deeper raise; keep blur about double the offset and mirror the offsets.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Dual box-shadow formula (dark bottom-right + light top-left) for an extruded look',
      'Inset shadow icon well that appears pressed into the surface',
      'Buttons that swap raised → inset shadow on :active to press in',
      'Single mid-tone background shared by every element (the core requirement)',
      'Themeable from one background color plus two derived shadow tints',
      'Pure CSS — JavaScript optional, only logs presses',
      'GPU-cheap: only box-shadow changes on interaction',
      'Mirrored shadow offsets keep a consistent light direction',
      'Tunable depth via shadow offset and blur',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Soft UI dashboards & widgets',      desc: 'Membership cards, settings panels, and music/player widgets where a clean, tactile neumorphic look is the brand aesthetic.' },
      { icon: 'APP',    title: 'Toggle and control surfaces',       desc: 'Pressable soft-UI buttons and switches that sink into the surface give satisfying feedback for media and smart-home style UIs.' },
      { icon: 'LEARN',  title: 'Learn the dual-shadow technique',    desc: 'Understand why two opposite box-shadows plus a shared background create the extruded illusion, and how inset flips it to pressed.' },
      { icon: 'PRO',    title: 'Pricing and membership cards',       desc: 'A neumorphic plan card stands out from flat designs and signals a premium, modern product feel.' },
      { icon: 'CODE',   title: 'Reusable soft-UI primitives',        desc: 'Build raised and inset utility classes once and apply them to cards, inputs, and buttons across a soft-UI design system.' },
      { icon: 'ACCESS', title: 'Contrast-aware decoration',          desc: 'Use neumorphism for containers while keeping text and icons high-contrast, so the design stays legible despite the subtle edges.' },
    ],
    faqs: [
      { q: 'What is neumorphism in CSS?', a: 'Neumorphism (soft UI) makes elements look extruded from or pressed into the background using two box-shadows at once — a dark shadow offset one way and a light highlight offset the opposite way, both tints of a shared mid-tone background. The result is a soft, tactile, single-material look.' },
      { q: 'Why must the element match the background color?', a: 'The effect is the surface itself deforming, not an object placed on top. If the element were a different color, it would look like a separate sticker rather than a raised part of the same surface. So the card, icon, and buttons all share the page background, and only the shadows differ.' },
      { q: 'How do I make something look pressed in instead of raised?', a: 'Add the inset keyword to both shadows. inset draws the shadow inside the element, inverting the light direction so it reads as a well pressed into the surface. The icon container and active buttons use this.' },
      { q: 'How do I re-theme a neumorphic component?', a: 'Pick a new mid-tone background, then derive a darker shadow (about 12% darker) and a lighter highlight (white or slightly lighter) from it, and update both shadow colors everywhere. Changing those three values re-skins the whole component.' },
      { q: 'Is neumorphism accessible?', a: 'It can have contrast issues because elements share their background and rely on subtle shadows, which can make edges hard to see. Use it for decorative containers and keep text/icons high-contrast; add a visible focus ring to important controls so they remain clearly perceivable.' },
      { q: 'Can I use this neumorphism card in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. The effect is pure CSS box-shadow, so it works identically in React — just keep the shared background color on the card and its children.' },
    ],
    aiPrompt: {
      paragraph: `Rather than eyeballing the shadow pairs, paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain precisely why the card, the icon well, and the buttons all have to share the exact same background hex value for the extruded illusion to hold, and what breaks visually the moment one of them uses even a slightly different shade. The same assistant can help optimize it, for instance checking whether the dark-shadow-to-light-shadow ratio in this specific palette would still look correct if you shifted the background to a cooler or warmer gray, or whether the box-shadow transition on button press could be made snappier without looking abrupt. It's also useful for extending the card: ask it to derive the two shadow colors programmatically from one CSS custom property using color-mix or a preprocessor function instead of hardcoding three hex values, build a dark-mode neumorphic variant, or add a neumorphic toggle switch that uses the same raised-to-inset technique. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "neumorphic" (soft UI) card in plain HTML and CSS only, using the dual-shadow technique — no images, no SVG filters, minimal JavaScript.

Requirements:
- The card, an inner icon container, and any buttons must all share the exact same background color as the page behind them (a single mid-tone gray, never white or black), since the effect depends on every element matching its surrounding surface.
- The card's raised/extruded look must come from exactly two box-shadow layers on the same element: one dark shadow offset toward the bottom-right and one light (near-white) shadow offset by the same distance toward the top-left, both using the same blur radius, so the two shadows imply a single consistent light source from the top-left.
- The icon container must look pressed into the surface (a "well") using the same two-shadow technique but with the inset keyword added to both shadows, which flips which corner appears dark versus light compared to the raised card.
- Buttons must be raised by default (using the same dual outer-shadow technique at a smaller offset/blur than the card) and must visually flip to the inset/pressed version of those same shadows on the CSS :active state, with a short transition so the shadow change looks like a physical press rather than a snap.
- Add a code comment explaining that the dark shadow color and light shadow color must both be derived from the shared background color (roughly a darker and lighter tint of it) rather than arbitrary colors, and that changing the theme means re-deriving both tints from a new background.
- Ensure text and icon content inside the card has strong, readable contrast against the shared background despite the subtle shadow-based edges, since low contrast is neumorphism's most common accessibility pitfall.`,
    },
  },
};

export default neumorphismCard;
