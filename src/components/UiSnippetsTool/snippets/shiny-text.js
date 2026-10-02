const shinyText = {
  id: 'shiny-text',
  title: 'Shiny Text',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="st-stage">
  <a href="#" class="st-badge"><span class="st-shiny">✨ Introducing v2.0</span><span class="st-arrow">→</span></a>
  <h1 class="st-shiny st-big">Shimmer that sweeps</h1>
  <p class="st-sub">A muted sheen glides across the text on a loop — no JS required for the shine.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07070f;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:22px;text-align:center;padding:24px}

.st-badge{display:inline-flex;align-items:center;gap:8px;text-decoration:none;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 16px;font-size:13.5px;font-weight:600;transition:background .2s}
.st-badge:hover{background:rgba(255,255,255,.1)}
.st-arrow{transition:transform .2s;color:#a5b4fc}
.st-badge:hover .st-arrow{transform:translateX(3px)}

/* The shine: a light band travels across muted text via a moving
   background-clip gradient. No pseudo-elements, no JS. */
.st-shiny{
  color:transparent;
  background:linear-gradient(110deg,#6b6b82 0%,#6b6b82 40%,#ffffff 50%,#6b6b82 60%,#6b6b82 100%);
  background-size:220% 100%;
  -webkit-background-clip:text;background-clip:text;
  animation:stShine 3s linear infinite;
}
@keyframes stShine{0%{background-position:120% 0}100%{background-position:-120% 0}}

.st-big{font-size:clamp(34px,8vw,72px);font-weight:900;letter-spacing:-.03em}
.st-sub{color:#7a7a92;font-size:15px;max-width:440px;line-height:1.55}`,

  js: `// The shimmer is pure CSS. JS only respects reduced-motion and lets you tune
// the speed/intensity at runtime via data attributes.
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  document.querySelectorAll('.st-shiny').forEach(function (el) {
    el.style.animation = 'none';
    el.style.color = '#cfcfe0';
  });
}

window.shinyText = {
  speed: function (seconds) {
    document.querySelectorAll('.st-shiny').forEach(function (el) {
      el.style.animationDuration = seconds + 's';
    });
  }
};`,

  seo: {
    title: 'Shiny Text — Free HTML CSS Animated Shimmer Text Snippet',
    description: `Muted text with a light band that sweeps across it on a loop, using a moving background-clip gradient, with reduced-motion support. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Shiny Text — A Sheen That Sweeps Across Muted Text',
      description: `Shiny text is the subtle shimmer seen on "Introducing" badges and premium headlines: the text sits in a muted gray, and a soft band of light glides across it repeatedly, like a sheen catching the letters. This snippet builds it with pure CSS — no pseudo-elements, no JavaScript for the shine — plus a small script for accessibility and runtime tuning.

**A gradient clipped to the text**

The shine is a single trick: the text color is set to \`transparent\` and filled with a \`linear-gradient\` via \`background-clip: text\`, so the gradient shows through the letter shapes. The gradient is mostly the muted base gray with a bright white band in the middle, and it is sized at \`220%\` width so there is room to slide. Because \`background-clip: text\` paints the gradient into the glyphs, the bright band only appears where there are letters — exactly the sheen effect.

**Animating the sweep**

The \`stShine\` keyframe animates \`background-position\` from one side to the other, dragging the bright band across the text on a 3-second linear loop. Since the rest of the gradient is the same muted gray on both ends, the band slides in from one edge and out the other with no visible seam — it reads as a continuous, repeating glint. This is far cheaper than a masked overlay or a JavaScript animation, because only \`background-position\` changes and the browser composites it efficiently.

**Reusable on any text**

The effect is a single class, \`.st-shiny\`, applied to whatever you want to shimmer — here both a pill badge and a large headline. Because it only touches color and background, you can drop it onto links, buttons, headings, or inline spans without changing their layout. The demo badge also nudges its arrow on hover, a common pattern for "new feature" announcement chips.

**Respecting reduced motion**

Continuous shimmer can be distracting, so the script checks \`prefers-reduced-motion\` via \`matchMedia\` and, when set, removes the animation and restores a solid readable color on every shiny element. This keeps the text legible and calm for users who have asked for less motion — the accessible default for any looping decorative effect.

**Runtime control**

A tiny \`window.shinyText.speed(seconds)\` helper lets you retune the sweep speed at runtime by updating the animation duration on all shiny elements. It is optional — the effect works without any JavaScript — but it is handy if you want the shimmer to speed up on interaction or differ between elements.

**Why background-clip over a mask**

Some shimmer effects use a moving highlight with \`mix-blend-mode\` or a clipped overlay element. Clipping a gradient to the text is simpler and more robust: it needs no extra DOM, automatically follows the exact letter shapes including descenders and serifs, and works on multi-line text. The only caveat is that the text must be transparent, so provide a solid fallback color (as the reduced-motion branch does) for contexts where the clip is unsupported.

**Customizing it**

Adjust the gradient stops to widen or sharpen the bright band, change the \`220%\` size and the keyframe range to alter how far it travels, retime the loop, or recolor the base and highlight (a gold base with a white band reads as metallic). Pair it with a [retro grid](/ui-snippets/retro-grid/) hero or a [border beam](/ui-snippets/border-beam/) card for a polished announcement.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A badge and headline render in muted gray.` },
      { title: 'Watch the shine', text: `A band of light sweeps across the text on a loop.` },
      { title: 'Hover the badge', text: `The arrow nudges right like a feature chip.` },
      { title: 'Apply it anywhere', text: `Add the st-shiny class to any text.` },
      { title: 'Check reduced motion', text: `Enable the OS setting and the shimmer turns off.` },
      { title: 'Tune the speed', text: `Call window.shinyText.speed(seconds).` },
    ] },
    features: [
      { title: 'background-clip shine', text: `A gradient painted into the letters.` },
      { title: 'Moving highlight band', text: `background-position sweeps the sheen.` },
      { title: 'Seamless loop', text: `Matching gray ends hide the restart.` },
      { title: 'No pseudo or overlay', text: `Pure color and background, no extra DOM.` },
      { title: 'Drop-in class', text: `Works on badges, headings, and links.` },
      { title: 'Reduced-motion safe', text: `Falls back to solid color when requested.` },
      { title: 'Runtime speed API', text: `Retune the sweep on the fly.` },
      { title: 'Multi-line friendly', text: `Follows the exact glyph shapes.` },
    ],
    useCases: [
      { title: 'Announcement badges', text: 'Introduce a release near a [shimmer button](/ui-snippets/shimmer-button/), with muted text and a light band sweeping across it on a loop.' },
      { title: 'Premium headlines', text: 'Shine a title over a [retro grid](/ui-snippets/retro-grid/) hero, using a clipped gradient painted into the letters with no pseudo-element.' },
      { title: 'Pricing highlights', text: 'Mark a popular tier on a [pricing card](/ui-snippets/pricing-card/) with a quiet sheen that draws the eye without shouting.' },
      { title: 'Beta and new chips', text: 'Pair with a [sticky promo bar](/ui-snippets/sticky-promo-bar/) so a small label gently animates, with matching grey ends hiding the loop restart.' },
      { title: 'Calm loading labels', text: 'Offer a gentler cousin of an [AI thinking loader](/ui-snippets/ai-thinking-loader/) for labels, respecting reduced-motion preferences by holding perfectly still.' },
    ],
    faqs: [
      { q: 'How is the shine confined to the text?', a: `The text color is set to transparent and filled with a linear-gradient via background-clip: text, so the gradient only shows through the letter shapes. The gradient is mostly the muted base gray with a bright band in the middle, so the highlight appears only where there are glyphs — that is the sheen.` },
      { q: 'How does the band sweep without a seam?', a: `The stShine keyframe animates background-position across an oversized gradient. Because both ends of the gradient are the same muted gray, the bright band slides in from one edge and out the other with no visible jump, reading as a continuous repeating glint. Only background-position changes, so it composites cheaply.` },
      { q: 'Why use background-clip instead of a masked overlay?', a: `Clipping a gradient to the text needs no extra DOM, automatically follows the exact letter shapes including descenders, and works across multiple lines. A masked highlight overlay is more elements and harder to align. The one caveat is the text must be transparent, so provide a solid fallback color where the clip is unsupported.` },
      { q: 'Is it accessible?', a: `Yes. The script checks prefers-reduced-motion with matchMedia and, when set, removes the animation and restores a solid readable color on every shiny element. Honoring that media query is the accessible default for any looping decorative animation, and it keeps the text legible for users who want less motion.` },
      { q: 'How do I use this shiny text in React, Vue, or Angular?', a: `Make a small ShinyText component that applies the class to its children, and read prefers-reduced-motion in a mount effect to disable the animation when requested. Expose a speed prop that sets animation-duration via inline style. The shine itself is pure CSS. In Tailwind, define the shimmer keyframe in the config and use bg-clip-text with text-transparent and an arbitrary gradient.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the background-clip gradient trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the gradient needs to be sized at 220% width for the sweep to look seamless, or how animating background-position rather than a separate overlay element keeps the effect cheap to composite. The same assistant can help optimize it, for example checking whether the 3-second linear animation duration and gradient stop percentages could be tuned for a calmer or snappier feel without breaking the seamless loop. It's also useful for extending the feature: ask it to add a second color stop for a rainbow-tinted shine, trigger the sweep once on scroll into view instead of looping forever, or expose the shine color as a CSS custom property so it can be themed per section. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a shimmering shine-sweep text effect in plain HTML, CSS, and a small amount of JavaScript, no libraries, no pseudo-elements or extra overlay DOM.

Requirements:
- Apply the effect to text elements (a badge and a large heading) by setting their text color to transparent and clipping a linear-gradient background to the text shape using background-clip: text (with the vendor-prefixed variant for compatibility).
- The gradient must be mostly a muted base gray with a single bright band positioned in the middle of the gradient stops, and the gradient's background-size must be oversized (well over 100% width) so there is room for the band to travel before repeating.
- Animate only the background-position property (not transform, not a second element) across a keyframe animation that moves the gradient from one side to the other on an infinite loop, timed so the loop has no visible seam or jump at the restart point.
- The effect must be a single reusable CSS class that can be applied to any text element (a link, a heading, a paragraph) without altering its layout, and must correctly follow multi-line text.
- In JavaScript, check the prefers-reduced-motion media query with matchMedia on load, and when it is set, remove the animation from every element using the effect and replace its color with a solid, legible fallback color instead of leaving it transparent.
- Expose a small runtime API (for example a global function) that lets the animation-duration of all shine elements be changed after the fact, without needing to edit the CSS file.`,
    },
  },
};

export default shinyText;
