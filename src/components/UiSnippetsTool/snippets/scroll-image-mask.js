const scrollImageMask = {
  id: 'scroll-image-mask',
  title: 'Scroll Image Mask',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="im-top"><p>Scroll ↓</p></section>
<section class="im-stage" id="imStage">
  <div class="im-frame" id="imFrame">
    <div class="im-media" id="imMedia"></div>
    <div class="im-cap" id="imCap"><span>Reveal</span><h2>Through the frame</h2></div>
  </div>
</section>
<section class="im-bottom"><p>The image grew from a slit to fullscreen.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.im-top,.im-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.im-stage{height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.im-frame{position:relative;width:90vw;height:80vh;border-radius:24px;overflow:hidden;
  /* Start as a narrow centered slit; GSAP opens the inset. */
  clip-path:inset(42% 38% round 24px);will-change:clip-path}
.im-media{position:absolute;inset:0;transform:scale(1.3);will-change:transform;background:
  radial-gradient(70% 60% at 30% 30%,#5b74d8,transparent 60%),
  radial-gradient(80% 70% at 80% 80%,#1f8f86,transparent 60%),
  conic-gradient(from 200deg at 50% 50%,#10131f,#1d2740,#0e2a2a,#10131f)}
.im-media::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(7,8,13,.55))}
.im-cap{position:absolute;left:0;right:0;bottom:34px;text-align:center;z-index:1;will-change:transform,opacity}
.im-cap span{display:block;font-size:13px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#9fc0ff;margin-bottom:6px}
.im-cap h2{font-size:clamp(28px,5vw,56px);letter-spacing:-.02em}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Pin the stage; open the clip-path slit to full frame while scaling the image down.
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#imStage',
    start: 'top top',
    end: '+=140%',
    scrub: true,
    pin: true
  }
});

tl.to('#imFrame', { clipPath: 'inset(0% 0% round 24px)', ease: 'none' }, 0)
  .to('#imMedia', { scale: 1, ease: 'none' }, 0)
  .from('#imCap', { y: 40, opacity: 0, ease: 'none' }, 0.3);`,

  seo: {
    title: 'Scroll Image Mask — Free GSAP ScrollTrigger Clip-Path Reveal',
    description: `An image that opens from a slit to fullscreen on scroll, animating clip-path inset while it un-zooms, via GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Image Mask — Open an Image From a Slit to Fullscreen',
      description: `The scroll image mask is the cinematic reveal where an image starts as a thin centered slot and expands to fill the frame as you scroll, while the picture inside subtly un-zooms — the dramatic media reveal from editorial and product launch pages. This snippet builds it with GSAP and ScrollTrigger (from a CDN) using an animated CSS \`clip-path\`.

**clip-path inset as the mask**

The frame's reveal is driven by \`clip-path: inset(...)\`, which crops the element by a percentage from each edge. At rest it's \`inset(42% 38%)\` — cropped heavily top/bottom and left/right, leaving only a small central window. Animating the inset toward \`inset(0%)\` un-crops it edge by edge until the whole frame shows. Because \`clip-path\` clips rather than resizes, the media behind stays put while the visible window grows, which is exactly the "opening aperture" feel.

**A scrubbed, pinned timeline**

The stage pins (\`pin: true\`) and a scrubbed timeline runs for \`end: '+=140%'\`, so the aperture opens in direct response to scrolling. Three tweens share position 0-ish: the clip-path opens, the media scales from 1.3 down to 1, and the caption rises in slightly later (at 0.3 on the timeline). \`ease: 'none'\` keeps the opening linear so it tracks the scrollbar, and the whole thing reverses on scroll-up.

**The counter-zoom**

The media starts scaled to 1.3 and eases to 1 as the mask opens. This counter-zoom is a subtle but important touch: as the window expands, the image gently pulls back, so you feel like you're seeing more of the scene rather than the same crop stretched. It mirrors the language of a camera revealing a wider shot.

**Why clip-path over width/height**

You could animate the frame's width and height, but that reflows layout and resizes the media with it, breaking the aperture illusion. \`clip-path\` is a GPU-composited paint operation — it changes only what's visible, not the box, so the image inside holds steady while the mask opens, and there's no layout thrash. \`will-change: clip-path\` hints the compositor.

**Asset-free demo**

The "photo" is layered CSS gradients with a darkening overlay so the caption stays legible. Swap \`.im-media\`'s background for a real \`background-image\` and the reveal is identical, since the timeline only touches clip-path, transform, and opacity.

**Customizing it**

Change the starting inset for a different slit shape (a horizontal letterbox, a vertical slot), the open distance via \`end\`, the counter-zoom amount, or the caption timing. Pair it with a [scroll split panels](/ui-snippets/scroll-split-panels/) reveal, a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/), or a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A small image slit sits in a pinned stage.` },
      { title: 'Scroll down', text: `The slit opens to a fullscreen frame.` },
      { title: 'Watch the un-zoom', text: `The image pulls back as the window grows.` },
      { title: 'Scroll back up', text: `The aperture closes — motion is scrubbed.` },
      { title: 'Use a real image', text: `Set background-image on the media layer.` },
    ] },
    features: [
      { title: 'clip-path aperture', text: `inset opens the frame edge by edge.` },
      { title: 'Pinned + scrubbed', text: `Opening follows the scrollbar.` },
      { title: 'Counter-zoom', text: `Media eases from 1.3 to 1 as it opens.` },
      { title: 'Timed caption', text: `Text rises in after the open begins.` },
      { title: 'Steady media', text: `Clip reveals without moving the image.` },
      { title: 'No reflow', text: `clip-path composites, box stays fixed.` },
      { title: 'Reversible', text: `Scrolling up closes the aperture.` },
      { title: 'Asset-free demo', text: `Gradient stands in for a photo.` },
    ],
    useCases: [
      { title: 'Media reveals', text: `Pair with a [scroll split panels](/ui-snippets/scroll-split-panels/) open.` },
      { title: 'Hero intros', text: `Lead into a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).` },
      { title: 'Editorial', text: `Frame an article's [parallax hero](/ui-snippets/parallax-hero/).` },
      { title: 'Launches', text: `Unveil with a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/).` },
      { title: 'Galleries', text: `Open into a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/).` },
      { title: 'Stories', text: `Punctuate a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { icon: 'CODE', title: 'Related: Scroll-Synced Margin Annotations', desc: 'See the [Scroll-Synced Margin Annotations](/ui-snippets/scroll-margin-annotations-sync/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the image open from a slit?', a: `The frame uses clip-path: inset(), which crops it by a percentage from each edge. At rest it is inset(42% 38%), leaving a small central window, and the timeline animates the inset toward inset(0%) to un-crop it edge by edge. Because clip-path clips rather than resizes, the media stays put while the visible window grows.` },
      { q: 'Why does the picture pull back as it opens?', a: `The media starts at scale 1.3 and eases to 1 over the same scroll, a counter-zoom. As the aperture expands, the image gently pulls back so you feel like you are seeing more of the scene rather than the same crop stretched — it mirrors a camera revealing a wider shot, which makes the reveal cinematic.` },
      { q: 'Why animate clip-path instead of width and height?', a: `Animating width and height reflows layout and resizes the media with the box, breaking the aperture illusion and causing layout thrash. clip-path is a GPU-composited paint operation that changes only what is visible, so the image holds steady while the mask opens. will-change: clip-path hints the compositor for smoothness.` },
      { q: 'How is the reveal tied to scrolling?', a: `The stage pins and the timeline is scrubbed over end: +=140%, so the clip-path open, the counter-zoom, and the caption rise all advance with the scrollbar and reverse on scroll-up. ease: none keeps the opening linear so it tracks scroll position exactly rather than playing on its own clock.` },
      { q: 'How do I use this scroll image mask in React, Vue, or Angular?', a: `In a mount effect, register ScrollTrigger and build the pinned, scrubbed timeline scoped to refs for the stage, frame, media, and caption. Return a cleanup that reverts the GSAP context so the pin is removed on unmount. Swap the media background for an image; the clip-path CSS and timeline port unchanged. Note older Safari needs -webkit-clip-path.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to puzzle out the clip-path percentages or the counter-zoom math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why the frame animates clip-path inset instead of width and height, and why the media layer starts scaled to 1.3 rather than 1. The same assistant is useful for optimizing it — for example checking whether will-change: clip-path is actually helping on lower-end mobile GPUs or whether it should be applied only during the active scroll range. It is just as good for extending the effect: ask it to make the starting slit a horizontal letterbox instead of a centered window, add a second image that cross-fades in as the first mask finishes opening, or drive the reveal from an IntersectionObserver instead of a pin for pages that cannot afford a full ScrollTrigger pin. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll image mask" reveal in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A pinned stage containing a frame element whose clip-path starts as inset() cropped heavily from all four edges (for example inset(42% 38%) with a rounded corner), leaving only a small centered window, and a media layer inside it that starts scaled up (for example scale(1.3)).
- Register a single GSAP timeline on a ScrollTrigger with pin: true, scrub: true, and an end a percentage of the viewport tall (not the full page), so the reveal completes within a bounded scroll distance.
- Inside that timeline, animate the frame's clip-path inset toward inset(0% 0%) so the window opens edge to edge, and simultaneously animate the media layer's scale back down to 1, so the image appears to un-zoom as the aperture opens. Both tweens must use ease: none and start at the same timeline position so they are perfectly linked to scroll position.
- Add a caption element that animates in (rising up and fading in from 0 opacity) starting partway through the timeline, after the frame has already begun opening, not before.
- Do not animate width or height directly on the frame to achieve the reveal — the cropping must come only from clip-path so the box never reflows and the effect stays GPU-composited.
- The whole sequence must reverse cleanly when the user scrolls back up, closing the aperture and re-zooming the image.`,
    },
  },
};

export default scrollImageMask;
