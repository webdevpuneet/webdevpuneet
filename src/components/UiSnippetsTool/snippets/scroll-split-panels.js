const scrollSplitPanels = {
  id: 'scroll-split-panels',
  title: 'Scroll Split Panels',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sp-top"><p>Scroll ↓</p></section>
<section class="sp-stage" id="spStage">
  <div class="sp-half sp-left" id="spLeft"><span>LEFT</span></div>
  <div class="sp-half sp-right" id="spRight"><span>RIGHT</span></div>
  <div class="sp-center" id="spCenter">
    <h2>Revealed</h2>
    <p>The two panels slide apart as you scroll, uncovering the content behind them.</p>
  </div>
</section>
<section class="sp-bottom"><p>Panels parted like curtains.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.sp-top,.sp-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.sp-stage{position:relative;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center}
.sp-center{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:14px;padding:24px;z-index:0}
.sp-center h2{font-size:clamp(40px,9vw,108px);letter-spacing:-.03em;font-weight:800;background:linear-gradient(120deg,#7c8cff,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.sp-center p{color:#aeb4ca;font-size:clamp(15px,2.2vw,20px);max-width:420px}
.sp-half{position:absolute;top:0;bottom:0;width:50.5%;display:flex;align-items:center;justify-content:center;z-index:2;will-change:transform}
.sp-half span{font-size:clamp(28px,6vw,72px);font-weight:900;letter-spacing:.1em;color:rgba(255,255,255,.16)}
.sp-left{left:0;background:linear-gradient(120deg,#1b2540,#10141f)}
.sp-right{right:0;background:linear-gradient(240deg,#2a1b40,#12101f)}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Pin the stage and slide the halves apart in sync with scroll.
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#spStage',
    start: 'top top',
    end: '+=120%',
    scrub: true,
    pin: true
  }
});

tl.to('#spLeft', { xPercent: -100, ease: 'none' }, 0)
  .to('#spRight', { xPercent: 100, ease: 'none' }, 0)
  .to('#spCenter', { scale: 1, opacity: 1, ease: 'none' }, 0)
  .from('#spCenter h2', { y: 40, ease: 'none' }, 0);

// Start the center slightly small and dim so it "settles" as the panels open.
gsap.set('#spCenter', { scale: 0.9, opacity: 0.4 });`,

  seo: {
    title: 'Scroll Split Panels — Free GSAP ScrollTrigger Curtain Reveal',
    description: `Two panels that slide apart like curtains on scroll to uncover content behind them, pinned and scrubbed with GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Split Panels — Part the Curtains to Reveal Content',
      description: `Scroll split panels is the reveal where two halves of a cover slide apart — left goes left, right goes right — as you scroll, uncovering a headline or media sitting behind them like curtains opening on a stage. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus plain HTML and CSS.

**Two halves over a hidden center**

The stage layers three pieces: a centered content block at \`z-index: 0\` and two absolutely-positioned halves at \`z-index: 2\` that cover it. Each half is just over 50% wide so they meet with no seam down the middle at rest. Because the halves sit above the content, the center is hidden until they move — the whole effect is just sliding those two covers out of the way.

**Pinned, scrubbed timeline**

A GSAP timeline tied to a ScrollTrigger pins the stage (\`pin: true\`) and runs for \`end: '+=120%'\` with \`scrub: true\`, so the panels' positions follow the scrollbar. From position 0, the left half tweens \`xPercent: -100\` and the right half \`xPercent: 100\`, sliding each fully off its own edge, while the center scales up and brightens. Sharing one timeline keeps the parting symmetrical and reversible — scroll back and the curtains close.

**The center settles as it's revealed**

The center starts slightly scaled down and dimmed (\`gsap.set\` to \`scale: 0.9, opacity: 0.4\`) and animates to full size and opacity over the same scroll, with its heading rising from an offset. So the revealed content doesn't just appear — it eases into focus as the panels retreat, which makes the reveal feel composed rather than a hard uncover.

**Why xPercent and a pin**

Using \`xPercent\` (a transform) rather than \`left\` means the slide is GPU-composited and never reflows, even at full screen size. Pinning holds the stage still so the parting plays over a controlled scroll distance instead of scrolling away; \`end: '+=120%'\` gives it a little over one screen to complete, which reads as deliberate.

**Linear and reversible**

\`ease: 'none'\` on the panel tweens locks their travel to the scroll position so there's no rubber-banding, and because everything lives on one scrubbed timeline the entire effect runs backward perfectly when you scroll up — the panels glide back together and the center dims again.

**Customizing it**

Swap the panel gradients for images, change the slide direction (vertical curtains with \`yPercent\`), adjust the reveal distance via \`end\`, or put real media behind the panels. Pair it with a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/), a [scroll image mask](/ui-snippets/scroll-image-mask/), or a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Two cover panels hide a center message.` },
      { title: 'Scroll down', text: `The panels slide apart like curtains.` },
      { title: 'See the reveal', text: `The center settles into full focus.` },
      { title: 'Scroll back up', text: `The curtains close — motion is scrubbed.` },
      { title: 'Use real media', text: `Swap the gradients or center for images.` },
    ] },
    features: [
      { title: 'Curtain-part reveal', text: `Halves slide off opposite edges.` },
      { title: 'Layered cover', text: `Panels hide a centered content block.` },
      { title: 'Pinned + scrubbed', text: `Parting follows the scrollbar.` },
      { title: 'Settling center', text: `Content scales and brightens in.` },
      { title: 'Seamless meet', text: `Halves overlap so there is no gap.` },
      { title: 'Transform slide', text: `xPercent composites, no reflow.` },
      { title: 'Reversible', text: `Scrolling up closes the curtains.` },
      { title: 'Direction-flexible', text: `Swap to vertical with yPercent.` },
    ],
    useCases: [
      { title: 'Big reveals', text: `Pair with a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/).` },
      { title: 'Product launches', text: `Uncover a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).` },
      { title: 'Editorial', text: `Frame a [scroll image mask](/ui-snippets/scroll-image-mask/) reveal.` },
      { title: 'Brand intros', text: `Open onto a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'Galleries', text: `Reveal a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/).` },
      { title: 'Stories', text: `Punctuate a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { icon: 'CODE', title: 'Related: Staggered Reveal on Scroll — IntersectionObserver, One Timer', desc: 'See the [Staggered Reveal on Scroll — IntersectionObserver, One Timer](/ui-snippets/stagger-reveal-scroll-list/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the center content hidden until you scroll?', a: `The stage layers a centered content block at z-index 0 beneath two absolutely-positioned halves at z-index 2 that cover it. Each half is just over 50% wide so they meet seamlessly at rest. Because the halves sit above the content, the center stays hidden until the panels slide out of the way.` },
      { q: 'How do the panels move with the scroll?', a: `A GSAP timeline tied to a pinned ScrollTrigger with scrub: true slides the left half to xPercent -100 and the right half to xPercent 100 from position 0, moving each fully off its edge. Because it is scrubbed, the panels' positions follow the scrollbar and reverse when you scroll up, closing the curtains.` },
      { q: 'Why does the revealed content look composed, not abrupt?', a: `The center starts slightly scaled down and dim via gsap.set, then animates to full size and opacity across the same scroll while its heading rises from an offset. So it eases into focus as the panels retreat rather than snapping into view, which makes the reveal feel choreographed with the parting.` },
      { q: 'Why use xPercent instead of animating left?', a: `xPercent is a transform, so the slide is composited on the GPU and never triggers layout reflow, even at full-screen panel sizes. Animating left would reflow each frame and stutter. Pinning holds the stage so the parting plays over a controlled distance, and ease: none keeps the travel locked to scroll.` },
      { q: 'How do I use this scroll split panels in React, Vue, or Angular?', a: `In a mount effect, register ScrollTrigger and build the pinned, scrubbed timeline scoped to refs for the stage and panels, with a gsap.set for the center's initial state. Return a cleanup that reverts the GSAP context so the pin and triggers are torn down on unmount. The layered CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the curtain-layering math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the two half-panels are sized just over 50% wide to avoid a seam, or how sharing a single scrubbed timeline keeps the panel parting, the center scale-up, and the heading rise perfectly synchronized in both scroll directions. The same assistant can help optimize it — asking whether xPercent is really necessary over left/right for this specific layout, or whether the +=120% scroll distance feels right compared to a shorter or longer reveal window. It's also useful for extending the effect: ask it to make the curtains part vertically instead of horizontally, add a subtle skew to the panels as they slide for extra drama, or trigger a secondary animation on the revealed content only once the panels have fully cleared the screen. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll split panels" curtain-reveal effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN).

Requirements:
- A pinned stage containing three layered pieces: a centered content block placed behind everything with a low z-index, and two cover panels — a left half and a right half — placed above it with a higher z-index, each panel sized to just over 50% of the stage width so they overlap slightly in the middle with no visible seam at rest.
- Register a single GSAP timeline on one ScrollTrigger with pin: true and scrub: true, running for a scroll distance of roughly 120% of the viewport height.
- On that timeline, starting at the same position (time 0), tween the left panel's xPercent to -100 (sliding it fully off the left edge) and the right panel's xPercent to +100 (sliding it fully off the right edge), both using ease none so their travel is locked directly to scroll position with no rubber-banding.
- On the same timeline position, animate the previously-hidden center content's scale and opacity from a slightly shrunken, dimmed starting state (set once at load, not as part of the scrubbed tween) up to full scale and full opacity, and animate its heading rising up from a vertical offset — so the reveal feels like content settling into focus as the curtains part, not a hard cut.
- Use xPercent instead of animating the left/right CSS positioning properties, so the panel movement is GPU-composited and never triggers layout reflow.
- Confirm scrolling back up smoothly closes the curtains and re-dims the center content, purely because everything lives on one scrubbed timeline — no separate reverse-specific code.`,
    },
  },
};

export default scrollSplitPanels;
