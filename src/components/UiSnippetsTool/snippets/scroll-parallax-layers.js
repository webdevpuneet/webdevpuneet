const scrollParallaxLayers = {
  id: 'scroll-parallax-layers',
  title: 'Scroll Parallax Layers',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="pl-top"><p>Scroll ↓</p></section>
<section class="pl-scene" id="plScene">
  <div class="pl-layer pl-sky" data-speed="0.15"></div>
  <div class="pl-layer pl-hills" data-speed="0.4"></div>
  <div class="pl-layer pl-mid" data-speed="0.7"></div>
  <h2 class="pl-title" data-speed="0.9">PARALLAX</h2>
  <div class="pl-layer pl-fore" data-speed="1.25"></div>
</section>
<section class="pl-bottom"><p>Layers moved at different speeds.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d18;color:#fff}
.pl-top,.pl-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.pl-scene{position:relative;height:120vh;overflow:hidden;background:linear-gradient(180deg,#1a2350,#0b0d18)}
.pl-layer{position:absolute;left:0;right:0;will-change:transform}
.pl-sky{top:0;height:80%;background:radial-gradient(50% 60% at 70% 20%,rgba(255,235,180,.5),transparent 60%),radial-gradient(40% 50% at 30% 30%,rgba(140,170,255,.35),transparent 60%)}
.pl-hills{bottom:0;height:55%;background:radial-gradient(120% 100% at 30% 100%,#2b3f8a 0 60%,transparent 61%),radial-gradient(120% 100% at 80% 100%,#27457e 0 55%,transparent 56%)}
.pl-mid{bottom:0;height:38%;background:radial-gradient(140% 100% at 60% 100%,#1d2c63 0 60%,transparent 61%)}
.pl-fore{bottom:-4%;height:26%;background:radial-gradient(160% 100% at 40% 100%,#10183a 0 70%,transparent 71%)}
.pl-title{position:absolute;top:42%;left:0;right:0;text-align:center;font-size:clamp(40px,12vw,150px);font-weight:900;letter-spacing:.04em;color:#fff;text-shadow:0 10px 40px rgba(0,0,0,.4);will-change:transform}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Move each layer by a multiple of the scroll distance: smaller = slower = "farther".
gsap.utils.toArray('[data-speed]').forEach(function (layer) {
  var speed = parseFloat(layer.dataset.speed);
  gsap.to(layer, {
    yPercent: -40 * speed,   // farther layers travel less, near layers more
    ease: 'none',
    scrollTrigger: {
      trigger: '#plScene',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});`,

  seo: {
    title: 'Scroll Parallax Layers — Free GSAP ScrollTrigger Snippet',
    description: `A layered scene where each layer scrolls at its own speed via a data-speed attribute and GSAP ScrollTrigger scrub, creating depth. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Parallax Layers — Depth From Speed-Differentiated Layers',
      description: `Scroll parallax is the depth illusion where background layers drift slowly and foreground layers move quickly as you scroll, so the scene feels three-dimensional. This snippet builds a multi-layer parallax scene with GSAP and ScrollTrigger (from a CDN), driven entirely by a single \`data-speed\` attribute per layer.

**Speed as data**

Every parallax layer declares how fast it should move with a \`data-speed\` value — small numbers for distant layers (sky), larger ones for near layers (foreground). The script reads each value and creates a tween that translates the layer by \`yPercent: -40 × speed\` as the scene scrolls. Encoding speed in markup means adding or retuning a layer is a one-attribute change, and one loop wires them all up; there are no per-layer constants buried in the JavaScript.

**Scrubbed across the scene**

Each layer's tween is tied to a ScrollTrigger on the scene with \`start: 'top bottom'\` and \`end: 'bottom top'\`, so the parallax plays across the entire time the scene is in view — from when its top enters the bottom of the viewport to when its bottom exits the top. \`scrub: true\` binds the motion to the scrollbar so the layers separate and re-converge smoothly as you scroll either direction. \`ease: 'none'\` keeps the speed differences constant and predictable.

**Why differential speed reads as depth**

Our eyes infer distance from motion parallax: things farther away appear to move less. By moving the sky a little and the foreground a lot for the same scroll, the snippet reproduces that cue, and the brain reads the flat layers as receding into space. The headline sits at a middle speed so it feels embedded in the scene rather than pasted on top.

**Transform-only and smooth**

All movement is \`yPercent\` (a GSAP transform), so the browser composites the layers on the GPU without reflowing or repainting layout — essential when several layers animate at once on every scroll frame. \`will-change: transform\` and \`overflow: hidden\` on the scene keep the moving layers contained and jank-free.

**Asset-free scene**

The layers are built from CSS radial gradients (sky glow, rolling hills, foreground ridge) so the snippet needs no images. In production you'd swap each layer's background for a transparent PNG or SVG; the parallax logic is unchanged because it only animates transforms.

**Customizing it**

Add more layers with their own \`data-speed\`, change the base travel multiplier, swap the gradients for real art, or add horizontal parallax with \`xPercent\`. Pair it with a [parallax hero](/ui-snippets/parallax-hero/), a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/), or a [hero parallax grid](/ui-snippets/hero-parallax-grid/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A layered scene renders between two spacers.` },
      { title: 'Scroll through the scene', text: `Layers move at different speeds for depth.` },
      { title: 'Scroll back up', text: `The layers re-converge — motion is scrubbed.` },
      { title: 'Retune a layer', text: `Change its data-speed value.` },
      { title: 'Use real art', text: `Swap each layer's gradient for a PNG/SVG.` },
    ] },
    features: [
      { title: 'Data-driven speeds', text: `One data-speed attribute per layer.` },
      { title: 'Single wiring loop', text: `All layers tweened from one forEach.` },
      { title: 'Full-scene scrub', text: `Parallax plays while the scene is in view.` },
      { title: 'Transform-only', text: `yPercent composites on the GPU.` },
      { title: 'Depth cue', text: `Differential speed reads as distance.` },
      { title: 'Embedded title', text: `Mid-speed headline sits within the scene.` },
      { title: 'Reversible', text: `Layers separate and rejoin both ways.` },
      { title: 'Asset-free demo', text: `Gradient layers, swap for images.` },
    ],
    useCases: [
      { title: 'Layered hero scenes', text: 'Create depth with layers moving at different speeds, as a richer version of a [parallax hero](/ui-snippets/parallax-hero/) using a `data-speed` attribute per layer.' },
      { title: 'Landing page depth', text: 'Pair with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) on a landing page, using `yPercent` transforms that composite on the GPU for depth.' },
      { title: 'Showcase combinations', text: 'Combine with a [hero parallax grid](/ui-snippets/hero-parallax-grid/) for a page with both layered scenes and moving image columns.' },
      { title: 'Narrative scene setting', text: 'Set scenes in a [scroll pin story](/ui-snippets/scroll-pin-story/), with one wiring loop tweening every layer from a single `forEach`.' },
      { title: 'Game and startup landing art', text: 'Layer illustrations behind a [startup hero](/ui-snippets/startup-hero/), then lead into [scroll colour sections](/ui-snippets/scroll-color-sections/) for the next scene.' },
      { icon: 'CODE', title: 'Related: Scroll Position Memory Across Tab Switches', desc: 'See the [Scroll Position Memory Across Tab Switches](/ui-snippets/scroll-restoration-tab-memory/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does each layer get its own speed?', a: `Every layer carries a data-speed value, and the script reads it and tweens the layer by yPercent: -40 times that speed. Small values move distant layers a little; large values move near layers a lot. Encoding speed in the attribute means one loop wires every layer and retuning is a single-attribute change.` },
      { q: 'Over what scroll range does the parallax play?', a: `Each tween is tied to a ScrollTrigger on the scene with start: top bottom and end: bottom top, so it runs the whole time the scene is in view — from its top entering the viewport bottom to its bottom leaving the top. scrub: true binds it to the scrollbar so layers separate and re-converge as you scroll either way.` },
      { q: 'Why does differential speed look like depth?', a: `Motion parallax is a real depth cue: distant objects appear to move less than near ones. Moving the sky slightly and the foreground a lot for the same scroll reproduces that cue, so the brain reads the flat layers as receding into space. The headline uses a middle speed so it feels embedded in the scene.` },
      { q: 'Is animating several layers on scroll performant?', a: `Yes, because all movement is yPercent, a transform, so the browser composites the layers on the GPU without reflowing or repainting layout. will-change: transform promotes them and overflow: hidden on the scene contains them, so even multiple layers moving every frame stay smooth.` },
      { q: 'How do I use this scroll parallax layers in React, Vue, or Angular?', a: `Render the layers with their data-speed attributes, then in a mount effect register ScrollTrigger and loop the layers (via a scoped ref query) to create the tweens. Return a cleanup that reverts the GSAP context so the triggers are removed on unmount. Swap gradients for image layers; the transform-based logic and CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the speed math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why yPercent: -40 * speed produces the illusion of depth, or why every layer is wired up from a single gsap.utils.toArray loop instead of individual tweens. The same assistant can help optimize it — asking whether more layers would still stay GPU-composited, or whether the scene needs will-change adjustments if you add a dozen data-speed elements instead of five. It's also useful for extending the effect: ask it to add horizontal drift with xPercent for a diagonal parallax, wire a mouse-move layer on top of the scroll-driven ones, or swap the CSS gradient layers for real transparent PNG art without touching the animation logic. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll parallax layers" scene in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) — no manual scroll-position math.

Requirements:
- A scene container with several absolutely positioned full-width layers stacked inside it (e.g. sky, hills, midground, a title, foreground), each layer carrying its own data-speed attribute as a plain number: small values for layers meant to look distant, larger values (including one above 1) for layers meant to look close.
- A single loop that selects every element with a data-speed attribute (e.g. via gsap.utils.toArray) and creates one GSAP tween per layer, translating it with yPercent equal to a negative base multiplier times that layer's own speed value — do not write a separate tween per layer by hand.
- Every layer's tween must share the same ScrollTrigger configuration: triggered off the scene container, starting when the scene's top hits the bottom of the viewport and ending when the scene's bottom hits the top of the viewport, with scrub set to true so motion is tied directly to the scrollbar in both directions.
- Use ease none on every tween so the relative speed differences between layers stay constant and don't curve.
- Only animate transform-based properties (yPercent), never top/margin/position, so the browser can composite every layer on the GPU without triggering layout reflow.
- Confirm the effect is fully reversible: scrolling back up must separate and re-converge the layers exactly as scrolling down did, with no extra reset code.`,
    },
  },
};

export default scrollParallaxLayers;
