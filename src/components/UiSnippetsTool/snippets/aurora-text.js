const auroraText = {
  id: 'aurora-text',
  title: 'Aurora Text',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="at-stage">
  <p class="at-eyebrow">Northern lights</p>
  <h1 class="at-text">Aurora</h1>
  <p class="at-sub">A flowing aurora gradient drifts through the letters — clipped to the text, animated forever.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#04040c;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:16px;text-align:center;padding:24px}

.at-eyebrow{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#3f7a6b}

.at-text{font-size:clamp(56px,16vw,160px);font-weight:900;letter-spacing:-.04em;line-height:1;
  background-image:linear-gradient(110deg,#22d3ee,#34d399,#a78bfa,#22d3ee,#34d399);
  background-size:200% 200%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:atFlow 8s ease-in-out infinite;
  filter:drop-shadow(0 0 30px rgba(52,211,153,.25))}
@keyframes atFlow{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

.at-sub{color:#7a8a92;font-size:15px;max-width:440px;line-height:1.55;margin-top:6px}`,

  js: `// The aurora is pure CSS. JS only honours reduced-motion and exposes a tiny
// helper to recolour the gradient at runtime.
var el = document.querySelector('.at-text');

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  el.style.animation = 'none';
}

window.auroraText = {
  colors: function (list) {
    // list: array of CSS colors -> rebuild the flowing gradient
    el.style.backgroundImage = 'linear-gradient(110deg,' + list.concat(list[0]).join(',') + ')';
  }
};`,

  seo: {
    title: 'Aurora Text — Free HTML CSS Animated Gradient Text Snippet',
    description: `Headline text filled with a flowing aurora gradient that drifts through the letters on a loop, clipped to the glyphs. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Aurora Text — A Flowing Aurora Gradient Inside the Letters',
      description: `Aurora text fills a headline with a slowly flowing, multi-color gradient — teal, green, and violet drifting through the letters like the northern lights — clipped to the glyph shapes so the color lives inside the type. This snippet builds it with pure CSS, plus a couple of optional JavaScript lines for accessibility and runtime recoloring.

**A gradient clipped to the glyphs**

The text color is set to \`transparent\` and filled with a \`linear-gradient\` via \`background-clip: text\`, so the gradient shows only through the letter shapes. The gradient repeats its aurora colors and is sized at \`200%\` so there is room to move it around. Clipping to text means the color automatically follows the exact contours of the glyphs — including counters and serifs — across any number of lines, without masks or extra elements.

**The flowing animation**

The \`atFlow\` keyframe animates \`background-position\` from \`0% 50%\` to \`100% 50%\` and back on an 8-second ease-in-out loop. Because the gradient is larger than the text and its color stops repeat, sliding the position drifts the bands of color slowly through the letters, never quite repeating — the gentle, organic shimmer of an aurora. The ease-in-out (rather than linear) gives it a breathing, tidal quality instead of a constant scroll. A soft green \`drop-shadow\` adds an ambient glow around the type.

**Why this looks like an aurora, not a rainbow**

The palette and motion are deliberately restrained: cool teals and greens with a single violet accent, drifting slowly. That cool, limited palette plus the slow ease is what evokes the northern lights specifically, versus a fast, saturated rainbow which reads as generic. Swapping the colors changes the mood entirely while keeping the same mechanic.

**Accessibility and runtime control**

The animation is pure CSS, but the script checks \`prefers-reduced-motion\` and disables it for users who request less motion — the text still shows the gradient, just static. A tiny \`window.auroraText.colors([...])\` helper rebuilds the flowing gradient from any list of CSS colors at runtime (it appends the first color to the end so the loop stays seamless), handy for theming or letting users pick a palette. Neither script is required for the core effect.

**Performance**

Only \`background-position\` animates, on a single element, which the browser composites cheaply — so even a giant headline shimmers smoothly. There is no canvas, no SVG, and no per-frame JavaScript.

**Customizing it**

Change the gradient colors and angle for a different aurora (or a warm sunset, or a metallic sheen), adjust the \`background-size\` and keyframe range to control how far the bands travel, retime the loop for a faster or calmer flow, or tune the drop-shadow glow. Provide a solid fallback color for contexts where \`background-clip: text\` is unsupported. Pair it with a [retro grid](/ui-snippets/retro-grid/) or [particle network](/ui-snippets/particle-network/) backdrop for a striking hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A large headline fills with a flowing aurora gradient.` },
      { title: 'Watch the flow', text: `Bands of teal, green, and violet drift through the letters.` },
      { title: 'Note the glow', text: `A soft drop-shadow halos the type.` },
      { title: 'Recolor at runtime', text: `Call window.auroraText.colors([...]) with your palette.` },
      { title: 'Check reduced motion', text: `Enable the OS setting and the flow stops.` },
      { title: 'Retime the loop', text: `Adjust the keyframe duration and gradient size.` },
    ] },
    features: [
      { title: 'Gradient clipped to text', text: `Color lives inside the glyph shapes.` },
      { title: 'Flowing drift', text: `background-position eases back and forth.` },
      { title: 'Aurora palette', text: `Cool teals and greens with a violet accent.` },
      { title: 'Ambient glow', text: `A soft drop-shadow around the type.` },
      { title: 'Multi-line friendly', text: `Follows the exact letter contours.` },
      { title: 'Reduced-motion safe', text: `Static gradient when motion is reduced.` },
      { title: 'Runtime recolor API', text: `Rebuild the gradient from any palette.` },
      { title: 'Compositor-cheap', text: `One property animates on one element.` },
    ],
    useCases: [
      { title: 'Aurora hero titles', text: 'Shine a flowing teal, green and violet gradient through a title over a [particle network](/ui-snippets/particle-network/) backdrop.' },
      { title: 'Brand wordmarks', text: 'Animate a logotype on a landing page, with the gradient clipped to the glyphs so the colour lives inside the letters.' },
      { title: 'Feature section lead-ins', text: 'Lead into a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/) with a title whose `background-position` eases gently back and forth across the letters.' },
      { title: 'Launch page headings', text: 'Pair with a [retro grid](/ui-snippets/retro-grid/) hero for an aurora-meets-synthwave opening, with a soft drop-shadow adding ambient glow.' },
      { title: 'Gradient text alternatives', text: 'Offer a flowing option beside the static [gradient text](/ui-snippets/gradient-text/) for creative portfolios, brand pages and any headline that deserves motion.' },
      { icon: 'CODE', title: 'Related: Canvas ASCII Art Converter', desc: 'See the [Canvas ASCII Art Converter](/ui-snippets/canvas-ascii-art-converter/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Elastic Spring Toggle Switch', desc: 'See the [Elastic Spring Toggle Switch](/ui-snippets/elastic-toggle-switch-spring/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the gradient stay inside the letters?', a: `The text color is set to transparent and filled with a linear-gradient via background-clip: text, so the gradient only shows through the glyph shapes. It automatically follows the exact contours of the letters, including counters, across multiple lines, with no masks or extra elements.` },
      { q: 'What makes the gradient flow?', a: `The gradient is sized at 200% so it is larger than the text, and the atFlow keyframe animates background-position back and forth on an 8-second ease-in-out loop. Because the color stops repeat and the gradient is oversized, the bands of color drift slowly through the letters without an obvious seam, giving the aurora shimmer.` },
      { q: 'Why does it read as an aurora rather than a rainbow?', a: `The palette and motion are restrained: cool teals and greens with a single violet accent, drifting slowly on an ease-in-out curve. That limited, cool palette plus the tidal motion evokes the northern lights, whereas a fast, fully-saturated rainbow reads as a generic gradient. Swapping colors changes the mood while keeping the mechanic.` },
      { q: 'Is it accessible?', a: `The script checks prefers-reduced-motion and disables the animation when set, so the text still shows the gradient but does not move for users who want less motion. Provide a solid fallback color too, since background-clip: text needs the text to be transparent and is unsupported in a few old contexts.` },
      { q: 'How do I use this aurora text in React, Vue, or Angular?', a: `Make a small component that applies the class to its children, read prefers-reduced-motion in a mount effect to disable the animation when requested, and expose a colors prop that sets the gradient via inline style. The effect is pure CSS. In Tailwind, define the flow keyframe in the config and use bg-clip-text with text-transparent and an arbitrary gradient image.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing how the gradient stays inside the letters, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why background-clip: text requires the text color to be transparent, or why the gradient is sized at 200% instead of 100% before the atFlow keyframe animates its background-position. The same assistant can help optimize it — ask whether animating background-position on a very large headline is as compositor-cheap as it looks, or whether the drop-shadow filter meaningfully affects paint cost on lower-end devices. It's also a good way to extend the effect: ask it to expose an intensity or speed prop through the existing window.auroraText API, add a second gradient layer for a more layered aurora look, or trigger a one-off flow burst on hover instead of a constant loop. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "aurora text" animated gradient headline effect in plain HTML, CSS, and a few lines of JavaScript — no canvas, no SVG, no libraries.

Requirements:
- A large heading whose text-color is set to transparent, filled by a multi-stop linear-gradient using background-clip: text (with the -webkit- prefixed version included for broader support), where the gradient's color stops repeat at least once (e.g. color A, B, C, A, B) so a looping animation has no visible seam.
- Size the gradient background at 200% (or larger) relative to the element so there is room for it to visibly travel.
- Animate background-position with a CSS keyframe animation that moves from one edge to the other and back, using an ease-in-out timing function on a multi-second duration so the motion feels like a slow, breathing drift rather than a constant scroll.
- Add a soft colored drop-shadow filter around the text to give it an ambient glow that complements the gradient palette.
- In JavaScript, check window.matchMedia for prefers-reduced-motion and disable the CSS animation for users who have that preference set, without removing the gradient fill itself.
- Expose a small runtime API (e.g. a function attached to a global or module object) that accepts an array of CSS colors and rebuilds the gradient's background-image from that list, appending the first color to the end of the list so the loop stays seamless after recoloring.`,
    },
  },
};

export default auroraText;
