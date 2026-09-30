const retroGrid = {
  id: 'retro-grid',
  title: 'Retro Grid',
  lastmod: '2026-07-18',
  category: 'heroes',
  html: `<section class="rg-hero">
  <div class="rg-grid" aria-hidden="true"><div class="rg-plane"></div></div>
  <div class="rg-sun" aria-hidden="true"></div>
  <div class="rg-content">
    <span class="rg-tag">★ SYNTHWAVE</span>
    <h1>Outrun the night</h1>
    <p>An animated neon grid floor racing toward the horizon — pure CSS perspective.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0420;color:#fff}

.rg-hero{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(180deg,#1a0b3a 0%,#2d0b4e 45%,#0a0420 75%)}

.rg-grid{position:absolute;left:0;right:0;bottom:0;height:55%;perspective:240px;overflow:hidden}
.rg-plane{position:absolute;inset:-60% 0 0 0;background-image:linear-gradient(rgba(236,72,153,.55) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.55) 1px,transparent 1px);background-size:44px 44px;transform:rotateX(72deg);transform-origin:bottom;animation:rgRun 1.6s linear infinite}
@keyframes rgRun{to{background-position:0 44px}}

.rg-sun{position:absolute;top:24%;left:50%;width:260px;height:260px;border-radius:50%;transform:translate(-50%,-50%);background:linear-gradient(180deg,#fde047,#ec4899);box-shadow:0 0 90px 20px rgba(236,72,153,.45)}
.rg-sun::after{content:'';position:absolute;inset:0;border-radius:50%;background:repeating-linear-gradient(180deg,transparent 0 14px,#0a0420 14px 18px);-webkit-mask:linear-gradient(180deg,transparent 55%,#000 55%);mask:linear-gradient(180deg,transparent 55%,#000 55%)}

.rg-content{position:relative;z-index:1;padding:0 20px;max-width:600px}
.rg-tag{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.2em;color:#22d3ee;margin-bottom:16px;text-shadow:0 0 12px rgba(34,211,238,.7)}
.rg-content h1{font-size:clamp(38px,9vw,84px);font-weight:900;letter-spacing:-.02em;text-transform:uppercase;background:linear-gradient(180deg,#fff,#f0abfc);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 40px rgba(240,171,252,.4)}
.rg-content p{margin-top:14px;font-size:16px;color:#c4b5fd}`,

  js: `// The grid is 100% CSS. This optional script lets you change the scroll speed
// and pause it when the tab is hidden to save the GPU.
var plane = document.querySelector('.rg-plane');

document.addEventListener('visibilitychange', function () {
  plane.style.animationPlayState = document.hidden ? 'paused' : 'running';
});

// Expose a tiny API: window.retroGrid.speed(seconds) to retune the run speed.
window.retroGrid = {
  speed: function (s) { plane.style.animationDuration = s + 's'; }
};`,

  seo: {
    title: 'Retro Grid — Free HTML CSS Synthwave Hero Background Snippet',
    description: `An animated neon synthwave grid floor racing toward the horizon in CSS perspective, with a retro sun and glow. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Retro Grid — Animated Synthwave Perspective Floor',
      description: `The retro grid is the 80s synthwave staple: a glowing neon grid floor that recedes to a horizon and races endlessly toward the viewer, lit by a striped retro sun. It is the backdrop of choice for vaporwave, outrun, and game-themed sites. This snippet builds the whole scene with pure CSS perspective and a couple of optional lines of JavaScript — no canvas, no images.

**The perspective floor**

The grid lives in a container with \`perspective: 240px\` and a child plane that is rotated flat with \`transform: rotateX(72deg)\` and \`transform-origin: bottom\`. That low perspective value combined with the steep rotation tips the plane almost flat and exaggerates the foreshortening, so the lines compress toward a vanishing point — the signature receding-floor look. The plane itself is just two layered \`linear-gradient\` backgrounds (pink horizontals, cyan verticals) tiled at \`44px\`, the same graph-paper trick used for any CSS grid, here viewed in 3D.

**Making it race forward**

Animating the plane toward the viewer is a one-line keyframe: \`rgRun\` shifts \`background-position\` down by exactly one tile (\`44px\`) over 1.6 seconds and loops. Because the grid pattern repeats every 44px, moving by one full cell lands on an identical pattern, so the loop is seamless — the lines appear to stream continuously toward you with no visible jump. The plane is oversized (\`inset: -60%\` at the top) so the scrolling lines fill the perspective without revealing an edge near the horizon.

**The retro sun**

The sun is a circle filled with a vertical yellow-to-pink gradient and a soft glowing \`box-shadow\`. Its iconic horizontal slats come from an \`::after\` pseudo-element: a \`repeating-linear-gradient\` of background-colored bars, masked so the stripes only appear across the lower half (\`mask: linear-gradient(transparent 55%, #000 55%)\`). That mask is what gives the classic synthwave sun its half-banded look without drawing each stripe by hand.

**The color story**

A vertical background gradient runs from deep indigo at the top through magenta to near-black at the bottom, so the sky glows behind the sun and darkens toward the grid. The headline uses a top-down \`background-clip: text\` gradient with a soft text-shadow glow, and the tag and copy use neon cyan and violet — all the hallmarks of the outrun palette. Everything is CSS, so recoloring the whole scene is a handful of values.

**The optional script**

The animation is entirely CSS, but two small JavaScript conveniences are included: a \`visibilitychange\` listener pauses the grid when the tab is hidden to spare the GPU, and a tiny \`window.retroGrid.speed(seconds)\` helper lets you retune the run speed at runtime (for example, to accelerate on a button press). Neither is required for the effect to work.

**Customizing it**

Change the \`perspective\` and \`rotateX\` to steepen or flatten the floor, adjust the \`44px\` tile size for a denser or wider grid, retime \`rgRun\` for a faster or slower race, recolor the line gradients and sun, or move the horizon by resizing the grid container. Pair it with an [aurora text](/ui-snippets/aurora-text/) headline or a [pulse button](/ui-snippets/pulse-button/) for a complete retro hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A neon grid floor and a striped sun fill the hero.` },
      { title: 'Watch it race', text: `The grid lines stream endlessly toward the horizon.` },
      { title: 'Note the sun', text: `Horizontal slats band its lower half, synthwave style.` },
      { title: 'Switch tabs', text: `The grid pauses while hidden to save the GPU.` },
      { title: 'Retune the speed', text: `Call window.retroGrid.speed(seconds) at runtime.` },
      { title: 'Recolor the scene', text: `Edit the gradient and sun colors.` },
    ] },
    features: [
      { title: 'CSS perspective floor', text: `rotateX plus a low perspective recede the grid.` },
      { title: 'Seamless forward race', text: `background-position shifts one tile and loops.` },
      { title: 'Gradient grid lines', text: `Two layered gradients, no image.` },
      { title: 'Masked retro sun', text: `Slats banded by a mask gradient.` },
      { title: 'Outrun palette', text: `Indigo-to-magenta sky with neon type.` },
      { title: 'Glowing headline', text: `Clipped gradient text with a soft glow.` },
      { title: 'Battery-aware', text: `Animation pauses when the tab is hidden.` },
      { title: 'Runtime speed API', text: `A tiny helper retunes the run speed.` },
    ],
    useCases: [
      { title: 'Synthwave landing pages', text: `Pair with an [aurora text](/ui-snippets/aurora-text/) headline.` },
      { title: 'Game and arcade sites', text: `Set the mood behind a [pulse button](/ui-snippets/pulse-button/) CTA.` },
      { title: 'Music and DJ pages', text: `A retro backdrop for an [app hero](/ui-snippets/app-hero/).` },
      { title: 'Event microsites', text: `Frame a [shiny text](/ui-snippets/shiny-text/) announcement.` },
      { title: 'Retro portfolios', text: `An 80s alternative to a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'CSS perspective demos', text: `A reference for animated receding grids.` },
      { icon: 'CODE', title: 'Related: Split-Screen Hero with Embedded Signup Form', desc: 'See the [Split-Screen Hero with Embedded Signup Form](/ui-snippets/hero-split-screen-form/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the flat grid recede into the distance?', a: `The grid container has perspective: 240px and its child plane is rotated with rotateX(72deg) and transform-origin: bottom. The low perspective value plus the steep rotation tips the plane nearly flat and exaggerates the foreshortening, so the gridlines compress toward a vanishing point — the classic receding-floor look, all in CSS.` },
      { q: 'How does the grid race forward without a visible jump?', a: `The rgRun keyframe shifts the plane background-position down by exactly one 44px tile and loops. Because the grid pattern repeats every 44px, moving by one full cell lands on an identical pattern, so the restart is invisible and the lines appear to stream continuously toward the viewer.` },
      { q: 'How is the striped synthwave sun made?', a: `The sun is a circle with a vertical yellow-to-pink gradient and a glowing box-shadow. Its horizontal slats come from an ::after repeating-linear-gradient of background-colored bars, masked with a linear-gradient so the stripes only show across the lower half. The mask gives the iconic half-banded sun without drawing each stripe manually.` },
      { q: 'Is the animation expensive?', a: `Not very — it animates only background-position on one element, which the compositor handles efficiently. A visibilitychange listener also pauses it when the tab is hidden to spare the GPU. For very low-end targets you can slow the keyframe or enlarge the tile size to reduce the number of lines.` },
      { q: 'How do I use this retro grid in React, Vue, or Angular?', a: `The scene is pure CSS, so drop the markup into a component and keep the classes. Add the visibilitychange listener in a mount effect with cleanup, and expose the speed control as a prop that sets the animation-duration via a ref or inline style instead of the global helper. In Tailwind, build the plane with a bg-[linear-gradient(...)] arbitrary value and define the run keyframe in the config.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reverse-engineer the 3D illusion by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the low perspective value combined with the steep rotateX angle is what tips the plane into a receding floor, and why the keyframe only needs to shift background-position by exactly one tile size to loop seamlessly forever. The same assistant can help you optimize it — ask whether animating background-position (which is not a compositor-only property) could be replaced with a translateY transform loop for smoother performance on lower-end GPUs, especially since the visibilitychange pause already shows performance awareness. It's also useful for extending the scene: ask it to add parallax scrolling stars behind the sun, make the grid react to scroll position instead of running on a timer, or add a second color scheme swappable via a CSS custom property. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated synthwave "retro grid" hero background in plain HTML and CSS, with only a couple of optional JavaScript conveniences — no canvas, no images, no library.

Requirements:
- Create a perspective floor using a container with a CSS perspective value and a child "plane" element rotated with transform rotateX at a steep angle (setting transform-origin to the bottom edge), so the plane appears to recede toward a horizon rather than lying flat on screen.
- Build the grid lines on that plane using two layered CSS linear-gradient backgrounds (one for horizontal lines, one for vertical), tiled at a fixed pixel size — do not use an image or SVG for the grid.
- Animate the grid endlessly racing toward the viewer using only a CSS keyframe that shifts background-position by exactly one tile's worth of pixels and loops infinitely, so the restart is invisible because the pattern is identical at that offset.
- Size the plane element larger than its container (extending well above the visible area) so the scrolling lines fill the whole perspective without ever revealing a hard edge near the horizon.
- Build a glowing retro sun as a circle with a vertical two-color gradient fill and a soft blurred box-shadow glow, then add horizontal banding stripes across only its lower half using a repeating-linear-gradient pseudo-element clipped with a CSS mask so the stripes fade in starting partway down the circle.
- Add a small optional JavaScript enhancement: pause the CSS animation via animationPlayState when the page visibility changes to hidden (and resume when visible again), to avoid wasting GPU cycles on a backgrounded tab.`,
    },
  },
};

export default retroGrid;
