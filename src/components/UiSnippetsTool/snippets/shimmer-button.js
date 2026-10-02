const shimmerButton = {
  id: 'shimmer-button',
  title: 'Shimmer Button',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="sh-stage">
  <button type="button" class="sh-btn">
    <span class="sh-spark" aria-hidden="true"></span>
    <span class="sh-body">
      <span class="sh-shine" aria-hidden="true"></span>
      Get started
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </span>
  </button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#070712;display:flex;justify-content:center;align-items:center;min-height:100vh}

.sh-stage{padding:30px}

/* Outer button = the rotating conic spark ring */
.sh-btn{position:relative;border:none;background:none;padding:0;border-radius:13px;cursor:pointer;overflow:hidden;isolation:isolate}
.sh-spark{position:absolute;inset:0;z-index:0;border-radius:inherit}
.sh-spark::before{content:'';position:absolute;top:50%;left:50%;width:160%;aspect-ratio:1;transform:translate(-50%,-50%);background:conic-gradient(from 0deg,transparent 0 75%,#a78bfa 90%,#22d3ee 100%);animation:shSpin 2.6s linear infinite}
@keyframes shSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}

/* Inner body sits 1.5px inside so the spark shows as a thin animated edge */
.sh-body{position:relative;z-index:1;display:inline-flex;align-items:center;gap:9px;margin:1.5px;padding:13px 24px;border-radius:11px;background:#141427;color:#fff;font-family:inherit;font-size:14.5px;font-weight:700;letter-spacing:.01em;overflow:hidden;transition:background .2s}
.sh-btn:hover .sh-body{background:#1b1b34}
.sh-body svg{width:17px;height:17px;transition:transform .2s}
.sh-btn:hover .sh-body svg{transform:translateX(3px)}

/* Sheen sweep across the label on hover */
.sh-shine{position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);transform:translateX(-120%);pointer-events:none}
.sh-btn:hover .sh-shine{animation:shSweep .85s ease}
@keyframes shSweep{to{transform:translateX(120%)}}

.sh-btn:active{transform:scale(.97)}`,

  js: `// The shimmer and spark are pure CSS. JS only adds an accessible press ripple
// and a tiny click confirmation so the button feels responsive.
var btn = document.querySelector('.sh-btn');
var body = btn.querySelector('.sh-body');

btn.addEventListener('click', function (e) {
  // Position-aware ripple from the click point.
  var rect = btn.getBoundingClientRect();
  var r = document.createElement('span');
  r.style.cssText = 'position:absolute;z-index:2;border-radius:50%;pointer-events:none;' +
    'background:rgba(255,255,255,.4);width:8px;height:8px;left:' + (e.clientX - rect.left) +
    'px;top:' + (e.clientY - rect.top) + 'px;transform:translate(-50%,-50%);';
  body.appendChild(r);
  r.animate(
    [{ transform: 'translate(-50%,-50%) scale(0)', opacity: .6 },
     { transform: 'translate(-50%,-50%) scale(26)', opacity: 0 }],
    { duration: 600, easing: 'ease-out' }
  ).onfinish = function () { r.remove(); };
});`,

  seo: {
    title: 'Shimmer Button — Free HTML CSS JS Animated Border Snippet',
    description: `A button with a rotating conic spark border, a sheen sweep on hover, and a click ripple — all GPU-light. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Shimmer Button — Rotating Spark Border and Sheen Sweep',
      description: `The shimmer button is the premium call-to-action seen across modern AI and developer products: a dark pill wrapped in a thin animated light that travels around its border, with a glossy sheen that sweeps across the label on hover. This snippet builds it in plain HTML, CSS, and a touch of vanilla JavaScript, using a conic-gradient technique that stays cheap for the GPU.

**The rotating spark border**

The animated edge is created with two layers. The outer button holds a \`.sh-spark\` element whose \`::before\` is an oversized square (160% of the button, kept square with \`aspect-ratio: 1\`) filled with a \`conic-gradient\` that is transparent for most of its sweep and bright purple-to-cyan for the final slice. Rotating that square 360° with the \`shSpin\` keyframe drags the bright slice around the perimeter. The inner \`.sh-body\` sits with a \`1.5px\` margin on top of the spark, so only a thin rim of the rotating gradient peeks out as a glowing animated border — the body itself covers the rest.

**Why conic-gradient over an SVG stroke**

A rotating conic gradient masked by an inner panel is far cheaper than animating an SVG stroke or a box-shadow: it's a single transform on one element, which the compositor handles on the GPU without repainting. That's why the border can spin continuously without hurting scroll performance, even on a page full of other animations.

**The sheen sweep**

On hover, a \`.sh-shine\` overlay — a diagonal \`linear-gradient\` with a bright band in the middle — animates from \`translateX(-120%)\` to \`120%\`, sweeping a glossy highlight across the label once. Because it starts and ends fully off the button, you only see the band crossing the face. The arrow icon also nudges right on hover, reinforcing the forward call to action.

**A position-aware click ripple**

The JavaScript adds tactile feedback. On click it reads the cursor position relative to the button, drops a tiny \`span\` there, and animates it with the Web Animations API (\`element.animate\`) scaling from 0 to 26× while fading out — a Material-style ripple that emanates from exactly where you clicked. The ripple element removes itself in the \`onfinish\` callback, so no nodes accumulate. Using \`animate()\` instead of CSS keyframes keeps the ripple self-contained and avoids managing extra classes.

**Layering and isolation**

The button uses \`overflow: hidden\` to clip the spark and ripple to its rounded shape, and \`isolation: isolate\` to keep the stacking context self-contained. The z-index order — spark at 0, body at 1, ripple at 2 — guarantees the ripple draws over the body while the spark stays behind it. The \`:active\` scale gives a subtle physical press.

**Customizing it**

Recolor the conic stops to change the spark, slow or speed the \`shSpin\` duration, widen the body margin for a thicker border, or adjust the sheen angle and speed. Make it a link by swapping \`<button>\` for \`<a>\` — the effects don't depend on the element. Pair it with a [neo-brutalist card](/ui-snippets/neo-brutalist-card/) or place it inside an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) for a cohesive, high-end look.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark button renders with a thin light traveling around its border.` },
      { title: 'Hover the button', text: `A glossy sheen sweeps across the label and the arrow slides right.` },
      { title: 'Click it', text: `A ripple expands from exactly where you clicked.` },
      { title: 'Recolor the spark', text: `Edit the conic-gradient stops to match your brand.` },
      { title: 'Adjust the speed', text: `Change the shSpin duration for a faster or calmer border.` },
      { title: 'Use as a link', text: `Swap button for an anchor; the effects still work.` },
    ] },
    features: [
      { title: 'Rotating spark border', text: `A conic-gradient slice travels around the edge.` },
      { title: 'GPU-cheap animation', text: `One transform on one element, no repaint.` },
      { title: 'Hover sheen sweep', text: `A diagonal highlight crosses the label.` },
      { title: 'Arrow nudge', text: `The icon advances on hover for forward intent.` },
      { title: 'Click ripple', text: `Web Animations API ripple from the click point.` },
      { title: 'Self-cleaning nodes', text: `Ripple removes itself on finish.` },
      { title: 'Correct layering', text: `z-index keeps spark, body, and ripple in order.` },
      { title: 'Press feedback', text: `A subtle active scale on click.` },
    ],
    useCases: [
      { title: 'Primary calls to action', text: 'Headline an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) with a dark pill whose border carries a travelling conic-gradient spark.' },
      { title: 'AI product landing pages', text: 'Pair with a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/) for the premium look seen across modern AI and developer products.' },
      { title: 'Pricing card actions', text: 'Use as the action on a [pricing card](/ui-snippets/pricing-card/), with a diagonal sheen sweeping the label on hover and an arrow that nudges forward.' },
      { title: 'Hero section buttons', text: 'Place under a [lamp header](/ui-snippets/lamp-header/) title, using a single transform on one element so the animation stays cheap on the GPU.' },
      { title: 'Submit button upgrades', text: 'Replace a plain [loading button](/ui-snippets/loading-button/) on sign-up, and use it as a reference for the conic-gradient animated border technique.' },
    ],
    faqs: [
      { q: 'How is the animated border created?', a: `An outer spark layer has a ::before that is an oversized square filled with a conic-gradient — transparent for most of its sweep and bright for one slice. Rotating that square 360 degrees drags the bright slice around the perimeter. An inner body panel with a 1.5px margin covers everything except a thin rim, so only that glowing edge shows.` },
      { q: 'Why is a conic gradient better than an SVG stroke here?', a: `Rotating one conic-gradient element is a single GPU transform with no repaint, whereas animating an SVG stroke or a box-shadow forces repaints each frame. That's why the border can spin continuously without hurting scroll or competing animations, even on lower-end devices.` },
      { q: 'How does the click ripple know where to start?', a: `The click handler reads the pointer position relative to the button via getBoundingClientRect, places a small span at that point, and animates it with the Web Animations API from scale 0 to 26 while fading out. The element removes itself in the animation's onfinish callback, so ripples never accumulate in the DOM.` },
      { q: 'Can I use this as a link instead of a button?', a: `Yes. None of the effects depend on the button element — swap <button> for an <a href>. Keep the same class structure so the spark, body, sheen, and ripple markup line up. If you do, ensure the link has a visible focus style for keyboard users since the demo relies on the native button focus ring.` },
      { q: 'How do I use this shimmer button in React, Vue, or Angular?', a: `The markup and CSS port directly as a reusable Button component. Implement the ripple in the click handler using element.animate on a ref, or extract it to a small hook/composable. In Tailwind, define the conic spin keyframe in the config, build the border with an absolute spark layer plus an inset body, and animate the sheen with a translate-x utility on group-hover.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the layered conic-gradient border trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the oversized rotating square behind sh-spark produces a thin traveling border rather than a spinning square, or why the inner sh-body's 1.5px margin is what makes only a rim of the gradient visible. The same assistant can help optimize it, for example checking whether the conic-gradient rotation is truly GPU-composited in this exact stacking setup or whether isolation and overflow are doing more repaint work than they need to. It's also useful for extending the feature: ask it to vary the spark colors based on a data attribute for different button variants, add a disabled state that stops the spin and mutes the sheen, or make the ripple's color match the spark's gradient instead of plain white. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a premium call-to-action button with a rotating animated border and a hover sheen sweep in plain HTML, CSS, and a small amount of JavaScript, no libraries.

Requirements:
- Create the animated border using a rotating conic-gradient, not an SVG stroke or an animated box-shadow: an outer layer holds an oversized square pseudo-element (larger than the button, kept square with aspect-ratio) filled with a conic-gradient that is transparent for most of its rotation and brightly colored for one slice, animated with a CSS transform rotation.
- Layer an inner content panel on top of that outer layer with only a 1-2px margin, so the rotating gradient is visible solely as a thin traveling rim around the edge, not as a spinning shape across the whole button face.
- On hover, sweep a diagonal light band across the button label using a linear-gradient overlay that translates from fully off one side to fully off the other side, so the sheen crosses the face exactly once per hover and is invisible when idle.
- Use CSS overflow hidden and an isolated stacking context on the outer button so the rotating gradient and any ripple effect are clipped to the button's rounded shape and layer in the correct order (border behind, content in the middle, ripple effects on top).
- In JavaScript, add a click ripple that originates from the exact cursor position (computed via getBoundingClientRect relative to the click event), animated with the Web Animations API's element.animate method scaling from zero to a large multiple while fading out, and have the ripple element remove itself from the DOM in the animation's finish callback so nodes never accumulate.
- The button must also support being rendered as an anchor element instead of a button element without losing any of the border, sheen, or ripple behavior.`,
    },
  },
};

export default shimmerButton;
