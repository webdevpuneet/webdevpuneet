const scrollZoomHero = {
  id: 'scroll-zoom-hero',
  title: 'Scroll Zoom Hero',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="zh-hero" id="zhHero">
  <div class="zh-media" id="zhMedia"></div>
  <div class="zh-overlay" id="zhOverlay"></div>
  <div class="zh-copy" id="zhCopy">
    <span class="zh-eyebrow">Field Notes</span>
    <h1>Into the<br/>Wild North</h1>
    <p>Scroll to descend through the frame.</p>
  </div>
</section>
<section class="zh-after">
  <h2>The journey continues</h2>
  <p>The hero zoomed past as you scrolled, then handed off to the page.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06070c;color:#fff}
.zh-hero{position:relative;height:100vh;overflow:hidden}
.zh-media{position:absolute;inset:-6%;transform:scale(1);will-change:transform;background:
  radial-gradient(60% 50% at 70% 20%,#3b4d7a,transparent 60%),
  radial-gradient(70% 60% at 20% 80%,#1f6f6b,transparent 60%),
  conic-gradient(from 210deg at 50% 50%,#10141f,#1b2336,#0d1b2a,#10141f);
  background-color:#0a0e18}
.zh-media::after{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.5) 1px,transparent 1.4px);background-size:26px 26px;opacity:.12}
.zh-overlay{position:absolute;inset:0;opacity:.4;background:linear-gradient(180deg,rgba(6,7,12,.1),rgba(6,7,12,.7))}
.zh-copy{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:24px;will-change:transform,opacity}
.zh-eyebrow{font-size:13px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#9fb4ff}
.zh-copy h1{font-size:clamp(44px,11vw,128px);line-height:.92;letter-spacing:-.03em;font-weight:800}
.zh-copy p{color:#c6cbe0;font-size:16px}
.zh-after{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:24px;background:linear-gradient(180deg,#06070c,#0c1322)}
.zh-after h2{font-size:clamp(28px,5vw,46px);letter-spacing:-.02em}
.zh-after p{color:#9aa0b8;font-size:17px;max-width:440px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// One timeline scrubbed across the hero: image zooms in, copy lifts and fades.
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#zhHero',
    start: 'top top',
    end: 'bottom top',  // play across one screen of scrolling
    scrub: true,
    pin: true,
    pinSpacing: false
  }
});

tl.to('#zhMedia', { scale: 1.6, ease: 'none' }, 0)
  .to('#zhCopy', { y: -80, opacity: 0, ease: 'none' }, 0)
  .to('#zhOverlay', { opacity: 1, ease: 'none' }, 0);`,

  seo: {
    title: 'Scroll Zoom Hero — Free GSAP ScrollTrigger Zoom Hero Snippet',
    description: `A hero whose background zooms while the headline lifts and fades on scroll, via a scrubbed GSAP ScrollTrigger timeline. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Zoom Hero — A Hero That Zooms as You Scroll Through It',
      description: `The scroll zoom hero is the cinematic opener where the background image scales up and the headline drifts away as the visitor scrolls past — the "descend into the frame" effect on modern landing and editorial pages. This snippet builds it with GSAP and ScrollTrigger (loaded from a CDN), plus plain HTML and CSS, with no image assets required.

**One scrubbed timeline**

The whole effect is a single GSAP timeline tied to a ScrollTrigger with \`scrub: true\`, so every tween's progress is driven directly by the scroll position rather than time. Three tweens run in parallel from position \`0\`: the media layer scales from 1 to 1.6, the copy lifts up and fades to zero, and a darkening overlay deepens. Because they share one scrubbed timeline, they advance in perfect lockstep with the scrollbar and reverse cleanly when you scroll back up.

**Pinning without reserving space**

The hero pins with \`pin: true\` and \`pinSpacing: false\`, so it stays fixed for one screen of scrolling while the section below slides up to meet it. Using \`pinSpacing: false\` means the pin doesn't add extra scroll height — the next section overlaps the pinned hero, producing the seamless handoff where the page content rises over the zooming image instead of leaving a gap.

**Mapping the range**

\`start: 'top top'\` begins the animation when the hero reaches the top of the viewport, and \`end: 'bottom top'\` finishes it after one viewport of scrolling. That one-screen range is the sweet spot: long enough to feel deliberate, short enough that the zoom completes before the hero is gone. \`ease: 'none'\` on each tween keeps the motion linear so it feels glued to the scroll.

**The overscan trick**

The media layer is inset by a negative margin (\`inset: -6%\`) so it's slightly larger than the hero. As it scales up, the zoom never reveals an edge, and the starting state already hides the overscan — a small but essential detail for any scroll-zoom so the image always fills the frame. \`will-change: transform\` promotes the layer to its own compositor layer for smooth scaling.

**Asset-free, drop-in ready**

So the snippet runs with zero downloads, the "photo" is built from layered CSS gradients plus a dotted texture. In production you'd swap the \`.zh-media\` background for a real \`background-image\`; the timeline is identical because it only animates \`transform\` and \`opacity\`, which work on any background.

**Customizing it**

Change the zoom amount, the copy's exit direction, the overlay strength, or the scroll range via \`end\`. Add a parallax layer or a second line of copy that enters as the first leaves. Pair it with a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/), a [scroll image mask](/ui-snippets/scroll-image-mask/), or a [parallax hero](/ui-snippets/parallax-hero/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A full-screen hero and a section below render.` },
      { title: 'Scroll down', text: `The background zooms and the headline lifts away.` },
      { title: 'Scroll back up', text: `Everything reverses — the timeline is scrubbed.` },
      { title: 'Use a real image', text: `Set background-image on the .zh-media layer.` },
      { title: 'Tune the zoom', text: `Change the scale target and the end range.` },
    ] },
    features: [
      { title: 'Scrubbed timeline', text: `Scroll drives zoom, lift, and overlay together.` },
      { title: 'Seamless pin', text: `pinSpacing false overlaps the next section.` },
      { title: 'One-screen range', text: `start/end map the effect to one viewport.` },
      { title: 'Linear motion', text: `ease none glues tweens to the scrollbar.` },
      { title: 'Overscan media', text: `Negative inset hides edges while scaling.` },
      { title: 'Compositor-friendly', text: `will-change keeps the zoom smooth.` },
      { title: 'Reversible', text: `Scrolling up plays it backward cleanly.` },
      { title: 'Asset-free demo', text: `Gradient stands in for a real photo.` },
    ],
    useCases: [
      { title: 'Landing openers', text: `A bolder [parallax hero](/ui-snippets/parallax-hero/).` },
      { title: 'Editorial', text: `Pair with a [scroll image mask](/ui-snippets/scroll-image-mask/) reveal.` },
      { title: 'Product intros', text: `Lead into a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/).` },
      { title: 'Stories', text: `Open a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Portfolios', text: `Replace a static [portfolio hero](/ui-snippets/portfolio-hero/).` },
      { title: 'Campaigns', text: `Hand off to a [scroll color sections](/ui-snippets/scroll-color-sections/) flow.` },
    ],
    faqs: [
      { q: 'How are the zoom and the text move synchronized?', a: `All three movements live on one GSAP timeline tied to a ScrollTrigger with scrub: true, starting at position 0. The media scales, the copy lifts and fades, and the overlay deepens together, so they advance in lockstep with the scrollbar and reverse cleanly on scroll-up. scrub makes scroll position, not time, drive the progress.` },
      { q: 'Why use pinSpacing: false?', a: `Pinning normally adds scroll height equal to the pin duration, which would leave a gap. pinSpacing: false pins the hero without reserving that space, so the section below slides up and overlaps the zooming hero. This produces the seamless handoff where page content rises over the image rather than appearing after an empty stretch.` },
      { q: 'Why is the image layer larger than the hero?', a: `The media layer is inset by -6% so it overscans the hero. As it scales up, the zoom never exposes an edge, and even at the start the extra is clipped out of view. Without this overscan, scaling could reveal the layer's boundary; will-change: transform also promotes it for smooth GPU scaling.` },
      { q: 'How long does the effect last?', a: `start: top top begins when the hero hits the top of the viewport and end: bottom top finishes after one viewport of scrolling, so the zoom plays across a single screen. Increase the end distance (for example +=150%) to slow it down and make the descent feel longer.` },
      { q: 'How do I use this scroll zoom hero in React, Vue, or Angular?', a: `Register ScrollTrigger once and build the timeline in a mount effect (useGSAP/useLayoutEffect, onMounted, or ngAfterViewInit) scoped to a ref for the hero. Return a cleanup that reverts the GSAP context or kills the ScrollTriggers so the pin is removed on unmount and navigation. Swap the media background for an image; the CSS and timeline port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to work out the pinSpacing behavior or the overscan trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why pinSpacing is set to false here instead of left at its default, and why the media layer is inset by a negative percentage before it ever starts scaling. The same assistant can help optimize it — for example checking whether animating scale on a large background layer is staying on the compositor thread on lower-end devices, or whether the one-viewport scroll range (start top top to end bottom top) is long enough once real imagery with more visual detail replaces the gradient placeholder. It is just as useful for extending the effect: ask it to add a second parallax layer that moves at a different rate than the main image, swap the fixed zoom target for one driven by the image's own aspect ratio, or introduce a second headline that fades in as the first one exits. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll zoom hero" in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A full-viewport-height hero section containing a background media layer, a darkening overlay, and centered headline copy, followed immediately by a second content section.
- The media layer must be inset by a small negative margin (for example -6%) so it starts slightly larger than its container, ensuring that when it scales up later no empty edge is ever revealed.
- Register a single GSAP timeline on a ScrollTrigger with pin: true, pinSpacing: false, scrub: true, start at the top of the viewport, and end at the bottom of the hero reaching the top of the viewport (one full screen of scroll) — and explain why pinSpacing: false is required for the next section to slide up and overlap the pinned hero rather than leaving a gap.
- Inside that timeline, starting all at the same position: scale the media layer up (for example from 1 to 1.6), move the headline copy upward while fading its opacity to 0, and increase the overlay's opacity so the scene darkens — all three tweens using ease: none so they track scroll position linearly.
- Do not use any image assets — build the "photo" from layered CSS gradients (and optionally a subtle repeating dot texture) so the demo runs with zero downloads, while keeping the JavaScript animating only transform and opacity so swapping in a real background-image later requires no timeline changes.
- The whole zoom-and-fade sequence must reverse cleanly when the user scrolls back up before reaching the hero's bottom edge.`,
    },
  },
};

export default scrollZoomHero;
