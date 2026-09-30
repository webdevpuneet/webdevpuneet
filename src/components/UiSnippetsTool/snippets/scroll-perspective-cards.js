const scrollPerspectiveCards = {
  id: 'scroll-perspective-cards',
  title: 'Scroll Perspective Cards',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="pc-top"><p>Scroll ↓</p></section>
<section class="pc-stage" id="pcStage">
  <div class="pc-scene" id="pcScene">
    <div class="pc-card" style="--d:0"><h3>Tunnel I</h3></div>
    <div class="pc-card" style="--d:1"><h3>Tunnel II</h3></div>
    <div class="pc-card" style="--d:2"><h3>Tunnel III</h3></div>
    <div class="pc-card" style="--d:3"><h3>Tunnel IV</h3></div>
    <div class="pc-card" style="--d:4"><h3>Tunnel V</h3></div>
  </div>
</section>
<section class="pc-bottom"><p>You flew through the cards in 3D.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06070d;color:#fff}
.pc-top,.pc-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.pc-stage{height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;perspective:600px}
.pc-scene{position:relative;width:min(420px,80vw);height:min(280px,52vh);transform-style:preserve-3d}
.pc-card{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:22px;background:linear-gradient(150deg,rgba(40,52,96,.9),rgba(16,20,34,.92));border:1px solid rgba(140,160,255,.3);box-shadow:0 30px 80px rgba(0,0,0,.5);backface-visibility:hidden;will-change:transform,opacity}
.pc-card h3{font-size:clamp(22px,4vw,38px);letter-spacing:.02em;color:#dfe6ff}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var cards = gsap.utils.toArray('.pc-card');
var GAP = 420; // z-distance between cards in px

// Place cards receding into depth, then fly the whole scene forward on scroll.
cards.forEach(function (card) {
  var d = parseInt(card.style.getPropertyValue('--d'), 10);
  gsap.set(card, { z: -d * GAP });
});

gsap.to('#pcScene', {
  z: (cards.length - 1) * GAP,   // travel until the last card reaches you
  ease: 'none',
  scrollTrigger: {
    trigger: '#pcStage',
    start: 'top top',
    end: '+=220%',
    scrub: true,
    pin: true
  }
});

// Fade each card in as it nears the camera and out as it passes.
cards.forEach(function (card, i) {
  gsap.fromTo(card, { opacity: 0 }, {
    opacity: 1, ease: 'none',
    scrollTrigger: {
      trigger: '#pcStage',
      start: 'top top',
      end: '+=220%',
      scrub: true,
      onUpdate: function (self) {
        var p = self.progress * (cards.length - 1);
        var dist = Math.abs(p - i);
        card.style.opacity = String(Math.max(0, 1 - dist * 0.8));
      }
    }
  });
});`,

  seo: {
    title: 'Scroll Perspective Cards — Free GSAP 3D Scroll Snippet',
    description: `Cards arranged in 3D depth that you fly through on scroll, fading in near the camera, using GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Perspective Cards — Fly Through Cards in 3D on Scroll',
      description: `Scroll perspective cards is the immersive effect where cards are arranged one behind another in 3D space and you appear to fly forward through them as you scroll — a "tunnel" of content that rushes toward the camera. This snippet builds it with GSAP and ScrollTrigger (from a CDN) and CSS 3D, with each card placed and faded by depth.

**Depth from z-translation**

The stage sets \`perspective: 600px\` and the inner scene uses \`transform-style: preserve-3d\`, so children can be positioned along the z-axis. Each card declares a depth index (\`--d\`) and is pushed back with \`z: -d × GAP\` on load, so they line up receding into the screen like a stack of panes seen edge-on. The perspective value controls how dramatic the convergence looks — smaller is more extreme.

**Flying the scene forward**

Rather than moving each card, the whole scene is tweened on its z-axis from 0 to \`(count − 1) × GAP\`, pinned and scrubbed over \`end: '+=220%'\`. As the scene's z increases, the far cards rush toward the camera and the near ones pass behind you — exactly the sensation of flying down a corridor. Moving one parent is cheaper and keeps the cards' relative spacing fixed.

**Depth-based fading**

A per-card \`onUpdate\` computes how close each card is to the "camera plane" from the scroll progress: it maps progress to a position along the line of cards, measures each card's distance from that point, and sets opacity to fade cards in as they approach and out as they pass. This is what stops the effect from being a confusing wall of overlapping panels — only the card near the focal depth is solid, the rest dissolve into the distance.

**Scrubbed, reversible flight**

Everything is \`scrub: true\` with \`ease: 'none'\`, so the flight speed matches scroll speed and reverses cleanly when you scroll up — you fly backward out of the tunnel. The pin holds the stage so the 220% of scroll is spent travelling through the cards rather than scrolling the section past.

**Composited 3D**

Only \`transform\` (z) and \`opacity\` animate, both GPU-composited, and \`backface-visibility: hidden\` plus \`will-change\` keep the 3D rendering crisp. Because the heavy lifting is one parent tween plus light per-card opacity math, it stays smooth.

**Customizing it**

Add cards (each with the next \`--d\`), change the \`GAP\` for tighter or looser spacing, the \`perspective\` for more or less drama, or the fade falloff; add a slight x/y offset per card for a scattered tunnel. Pair it with [scroll 3d cards](/ui-snippets/scroll-3d-cards/), a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/), or a [coverflow carousel](/ui-snippets/coverflow-carousel/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Cards line up receding into 3D depth.` },
      { title: 'Scroll down', text: `You fly forward through the cards.` },
      { title: 'Watch the fades', text: `Each card solidifies near the camera.` },
      { title: 'Scroll back up', text: `You fly backward — motion is scrubbed.` },
      { title: 'Tune the tunnel', text: `Change GAP and perspective for the feel.` },
    ] },
    features: [
      { title: '3D z-placement', text: `Cards recede along the z-axis.` },
      { title: 'Scene fly-through', text: `One parent z-tween moves the camera.` },
      { title: 'Depth fading', text: `Cards fade by distance from focus.` },
      { title: 'Pinned + scrubbed', text: `Flight tracks the scrollbar.` },
      { title: 'Reversible', text: `Scroll up flies back out.` },
      { title: 'Perspective control', text: `One value sets the drama.` },
      { title: 'GPU 3D', text: `z and opacity only, no reflow.` },
      { title: 'Any card count', text: `Add cards with the next --d.` },
    ],
    useCases: [
      { title: 'Showcases', text: `A 3D cousin of [scroll 3d cards](/ui-snippets/scroll-3d-cards/).` },
      { title: 'Galleries', text: `Fly through a [coverflow carousel](/ui-snippets/coverflow-carousel/) set.` },
      { title: 'Intros', text: `Open before a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/).` },
      { title: 'Storytelling', text: `Sequence scenes in a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Feature reels', text: `Rush through [feature cards](/ui-snippets/feature-cards/).` },
      { title: 'Brand moments', text: `Pair with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).` },
      { icon: 'CODE', title: 'Related: Scroll Rotate Gallery', desc: 'See the [Scroll Rotate Gallery](/ui-snippets/scroll-rotate-gallery/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the cards positioned in 3D?', a: `The stage sets perspective: 600px and the scene uses transform-style: preserve-3d, so children can sit along the z-axis. Each card has a depth index --d and is pushed back with z: -d times GAP on load, lining them up receding into the screen. The perspective value controls how strongly they converge.` },
      { q: 'How does the fly-through work?', a: `Instead of moving each card, the whole scene is tweened on its z-axis from 0 to (count − 1) times GAP, pinned and scrubbed over +=220%. As the scene's z grows, far cards rush toward the camera and near ones pass behind, creating the corridor-flight sensation. Moving one parent is cheaper and keeps spacing fixed.` },
      { q: 'Why do cards fade in and out?', a: `A per-card onUpdate maps scroll progress to a position along the line of cards, measures each card's distance from that focal point, and sets opacity to fade cards in as they approach and out as they pass. Without this, the effect would be a confusing wall of overlapping panels; the fade keeps only the focal card solid.` },
      { q: 'Is the 3D flight performant?', a: `Yes. Only transform (z) and opacity animate, both GPU-composited, with backface-visibility: hidden and will-change keeping rendering crisp. The work is one parent z-tween plus light per-card opacity math, so it stays smooth even with several cards and on every scroll frame.` },
      { q: 'How do I use this scroll perspective cards in React, Vue, or Angular?', a: `In a mount effect, register ScrollTrigger, set each card's z by its depth via refs, and create the scene z-tween plus the per-card opacity triggers. Return a cleanup that reverts the GSAP context so the pin is removed on unmount. Keep perspective and preserve-3d in CSS; the markup ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the 3D depth math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why moving the whole scene's z-position is cheaper than animating each card's z individually, or how the per-card opacity onUpdate maps scroll progress onto a distance-from-focus calculation to fade cards in and out. The same assistant can help optimize it — asking whether the fade falloff constant (0.8) should scale with the GAP value so cards never look abruptly binary, or whether backface-visibility and will-change are pulling their weight at higher card counts. It's also useful for extending the effect: ask it to add a slight per-card x/y jitter for a less mechanical tunnel, make the focal card display extra content only when fully opaque, or add a horizontal drift as cards pass the camera. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll perspective cards" 3D fly-through effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) and CSS 3D transforms — no canvas, no WebGL.

Requirements:
- A stage element with CSS perspective set, containing a scene element with transform-style: preserve-3d, containing several absolutely positioned cards each tagged with its own depth index (e.g. via a custom CSS property).
- On load, position each card along the z-axis using its depth index times a fixed gap distance, so they line up receding into the screen like a stack of panes.
- Pin the stage and tween the scene element's own z position (not each card individually) from 0 forward to (card count - 1) times the gap distance, using ease none and scrub true, over a scroll distance long enough to feel like a deliberate flight (e.g. more than double the viewport height).
- For every card, independently compute and apply an opacity value on every scrollTrigger update: map the overall scroll progress (0 to 1) onto a position along the line of cards, measure the absolute distance between that position and the card's own depth index, and set the card's opacity to fade toward 0 the further it is from that focal position, so only the card near the "camera" is fully solid at any given scroll position.
- Only animate transform (z-translation) and opacity properties — never top/left/width — so everything stays GPU-composited, and set backface-visibility: hidden plus will-change on the cards.
- Confirm scrolling back up reverses the flight and the fades exactly, purely because the tweens are scrubbed — no separate reverse code path.`,
    },
  },
};

export default scrollPerspectiveCards;
