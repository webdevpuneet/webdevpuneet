const scrollRotateGallery = {
  id: 'scroll-rotate-gallery',
  title: 'Scroll Rotate Gallery',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="rt-top"><p>Scroll ↓</p></section>
<section class="rt-stage" id="rtStage">
  <div class="rt-ring" id="rtRing">
    <figure class="rt-card" style="--i:0;--g:linear-gradient(160deg,#6366f1,#22d3ee)"></figure>
    <figure class="rt-card" style="--i:1;--g:linear-gradient(160deg,#a855f7,#ec4899)"></figure>
    <figure class="rt-card" style="--i:2;--g:linear-gradient(160deg,#10b981,#84cc16)"></figure>
    <figure class="rt-card" style="--i:3;--g:linear-gradient(160deg,#f59e0b,#ef4444)"></figure>
    <figure class="rt-card" style="--i:4;--g:linear-gradient(160deg,#0ea5e9,#6366f1)"></figure>
    <figure class="rt-card" style="--i:5;--g:linear-gradient(160deg,#f43f5e,#f59e0b)"></figure>
  </div>
</section>
<section class="rt-bottom"><p>The carousel turned with your scroll.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080e;color:#fff}
.rt-top,.rt-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.rt-stage{height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;perspective:1100px}
.rt-ring{position:relative;width:220px;height:280px;transform-style:preserve-3d;will-change:transform}
.rt-card{position:absolute;inset:0;border-radius:20px;background:var(--g);box-shadow:0 24px 60px rgba(0,0,0,.45);backface-visibility:hidden;
  /* Lay 6 cards around a cylinder: each rotated 60° and pushed out. */
  transform:rotateY(calc(var(--i) * 60deg)) translateZ(230px)}
.rt-card::after{content:'';position:absolute;inset:0;border-radius:20px;background:rgba(7,8,14,.4);opacity:0;transition:none}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Spin the cylinder of cards as the section is pinned and scrolled.
gsap.to('#rtRing', {
  rotateY: -300,    // a little over one full turn (6 cards × 60° minus the first)
  ease: 'none',
  scrollTrigger: {
    trigger: '#rtStage',
    start: 'top top',
    end: '+=200%',
    scrub: 1,
    pin: true
  }
});

// Optional gentle bob so the ring feels alive while it turns.
gsap.to('#rtRing', {
  y: 14, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true
});`,

  seo: {
    title: 'Scroll Rotate Gallery — Free GSAP 3D Carousel Scroll Snippet',
    description: `A 3D cylinder of cards that rotates as you scroll a pinned section, built with CSS rotateY and GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Rotate Gallery — A 3D Carousel Driven by Scroll',
      description: `The scroll rotate gallery is a 3D cylinder of cards arranged in a ring that spins as you scroll, like a carousel turning under your control — an eye-catching way to present a set of images or features. This snippet builds it with GSAP and ScrollTrigger (from a CDN) and pure CSS 3D, no carousel library.

**Arranging cards in a cylinder**

Each card is positioned with CSS: \`transform: rotateY(i × 60deg) translateZ(230px)\`. The \`rotateY\` fans the six cards evenly around a circle (360° ÷ 6 = 60° each), and the \`translateZ\` pushes each out from the center by the cylinder's radius — so they form a ring facing outward. The stage provides \`perspective\` and the ring uses \`transform-style: preserve-3d\` so the depth renders correctly. This is the classic CSS 3D carousel construction, done entirely with two transforms per card.

**Scroll spins the ring**

A single tween rotates the whole \`.rt-ring\` on its y-axis as the section is pinned and scrubbed over \`end: '+=200%'\`. Because the cards are children of the ring, rotating the parent turns the entire cylinder — the cards sweep toward and away from the viewer in sequence. \`scrub: 1\` adds a touch of momentum so the spin feels weighty, and the pin holds the stage so the rotation plays over a controlled scroll distance.

**Why rotate the parent, not the cards**

Spinning the single ring container is far cheaper and simpler than re-rotating six cards every frame, and it keeps their relative arrangement locked — they stay a rigid cylinder while it turns. The cards' own transforms are set once on load and never change; only the parent's \`rotateY\` animates.

**A subtle idle bob**

An independent, infinitely repeating \`yoyo\` tween floats the ring up and down a few pixels with a sine ease, so even when you stop scrolling the carousel feels alive rather than frozen. Because it animates \`y\` on the same element while the ScrollTrigger animates \`rotateY\`, GSAP composes the two transforms without conflict.

**Composited 3D**

Everything animates transforms (\`rotateY\`, \`y\`), so the browser composites on the GPU with no reflow, and \`backface-visibility: hidden\` hides the reversed back faces of cards facing away. \`will-change: transform\` promotes the ring for a smooth spin.

**Customizing it**

Change the card count (update the \`60deg\` to \`360 ÷ count\` and the rotate distance), the radius (\`translateZ\`), the perspective for more or less drama, or swap gradients for real images. Pair it with a [coverflow carousel](/ui-snippets/coverflow-carousel/), [scroll perspective cards](/ui-snippets/scroll-perspective-cards/), or a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Six cards form a 3D cylinder.` },
      { title: 'Scroll down', text: `The carousel rotates through the section.` },
      { title: 'Pause', text: `A gentle bob keeps the ring alive.` },
      { title: 'Scroll back up', text: `The ring spins backward — it is scrubbed.` },
      { title: 'Change the count', text: `Update the per-card angle and radius.` },
    ] },
    features: [
      { title: 'CSS 3D cylinder', text: `rotateY + translateZ arrange the ring.` },
      { title: 'Parent spin', text: `Rotating the ring turns all cards.` },
      { title: 'Pinned + scrubbed', text: `Spin tracks the scrollbar.` },
      { title: 'Momentum', text: `scrub 1 gives the turn weight.` },
      { title: 'Idle bob', text: `Looping yoyo keeps it alive.` },
      { title: 'Composed transforms', text: `y and rotateY animate together.` },
      { title: 'Hidden backfaces', text: `backface-visibility cleans the far side.` },
      { title: 'GPU 3D', text: `Transforms only, no reflow.` },
    ],
    useCases: [
      { title: 'Showcases', text: `A spinning [coverflow carousel](/ui-snippets/coverflow-carousel/).` },
      { title: 'Galleries', text: `Pair with a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/).` },
      { title: 'Feature reels', text: `Rotate through [feature cards](/ui-snippets/feature-cards/).` },
      { title: 'Tunnels', text: `Combine with [scroll perspective cards](/ui-snippets/scroll-perspective-cards/).` },
      { title: 'Products', text: `Turn a ring of [product card](/ui-snippets/product-card/) shots.` },
      { title: 'Brand moments', text: `Open with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).` },
      { icon: 'CODE', title: 'Related: Scroll Velocity Motion Blur', desc: 'See the [Scroll Velocity Motion Blur](/ui-snippets/scroll-velocity-blur/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the cards arranged into a ring?', a: `Each card uses transform: rotateY(i × 60deg) translateZ(230px). The rotateY fans the six cards evenly around a circle (360 divided by 6 is 60 degrees each) and the translateZ pushes each outward by the cylinder radius, so they face outward in a ring. The stage adds perspective and the ring uses preserve-3d so the depth renders.` },
      { q: 'Why rotate the ring instead of each card?', a: `Spinning the single ring container turns the whole cylinder at once, which is far cheaper than re-rotating six cards every frame and keeps their arrangement rigid. The cards' own transforms are set once on load and never change; only the parent's rotateY animates with scroll, so the cards sweep past the viewer in order.` },
      { q: 'How does the idle bob coexist with the scroll spin?', a: `An independent repeating yoyo tween animates the ring's y by a few pixels with a sine ease, while the ScrollTrigger animates the ring's rotateY. GSAP composes both transforms on the same element without conflict, so the carousel keeps a gentle float even when you stop scrolling, rather than freezing.` },
      { q: 'Is the 3D carousel performant?', a: `Yes. Everything animates transforms — rotateY and y — so the browser composites on the GPU with no layout reflow, backface-visibility: hidden removes the reversed back faces, and will-change promotes the ring. Because only the parent animates, adding more cards does not add per-frame animation cost.` },
      { q: 'How do I use this scroll rotate gallery in React, Vue, or Angular?', a: `Render the cards with their --i index, keep the cylinder transforms in CSS, and in a mount effect register ScrollTrigger and create the pinned rotateY tween plus the looping bob, scoped to a ref. Return a cleanup that reverts the GSAP context so the pin and the infinite tween stop on unmount. Update the per-card angle if you change the count.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the 3D cylinder trigonometry by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each card's static rotateY(i * 60deg) translateZ(230px) transform places it correctly on the ring, or why rotating the parent ring's rotateY is cheaper and more stable than re-rotating six individual cards every scroll frame. The same assistant can help optimize it — asking whether backface-visibility: hidden is actually saving paint work with only six cards, or how the idle yoyo bob and the scroll-driven rotateY tween compose on the same element without one canceling the other. It's also useful for extending the effect: ask it to support a variable card count computed from 360 divided by the count rather than a hardcoded 60 degrees, add click-to-jump navigation to a specific card, or swap the flat gradients for real product photography with correct backface hiding. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll rotate gallery" 3D carousel in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) and CSS 3D transforms — no carousel library, no canvas.

Requirements:
- A stage element with CSS perspective set, containing a ring/cylinder container with transform-style: preserve-3d, containing a fixed number of card elements (e.g. six).
- Position each card once at load using a combination of rotateY, where the angle is that card's index times (360 divided by the total card count), and translateZ pushing it outward by a fixed radius distance — so the cards form a ring facing outward, not a flat stack.
- Give every card backface-visibility: hidden so the reversed side of cards facing away from the viewer never becomes visible during rotation.
- Pin the stage and, using a single ScrollTrigger with pin: true and a scrub value greater than 0 (for a slight momentum feel, not scrub: true), rotate only the ring container's own rotateY property (never touch the individual cards' transforms after initial placement) by roughly one full turn or slightly more as the user scrolls through the pinned section.
- Independently of the scroll-driven rotation, add a separate infinitely repeating yoyo tween on the same ring container that gently moves its y position up and down with a sine easing, so the carousel still feels alive when scrolling stops, and confirm both tweens can animate different transform properties on the same element simultaneously without conflict.
- Confirm scrolling back up spins the cylinder in reverse, purely because the rotation tween is scrubbed — no separate reverse-specific code.`,
    },
  },
};

export default scrollRotateGallery;
