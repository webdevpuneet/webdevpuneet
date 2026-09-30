const cssScrollTimelineImageZoomParallax = {
  id: 'css-scroll-timeline-image-zoom-parallax',
  title: 'CSS Scroll Timeline Image Zoom Parallax',
  lastmod: '2026-09-16',
  category: 'scroll',
  html: `<section class="izp-hero">
  <div class="izp-media" aria-hidden="true"></div>
  <div class="izp-scrim" aria-hidden="true"></div>
  <div class="izp-copy">
    <span class="izp-eyebrow">Scroll-driven zoom</span>
    <h1>The Backdrop Grows As You Descend</h1>
    <p>No parallax library, no scroll listener — the photo scales and drifts purely via native <code>animation-timeline: scroll()</code>.</p>
  </div>
</section>
<section class="izp-after"><h2>Below the Fold</h2><p>Once the hero has fully scrolled past, ordinary content resumes — the zoom effect was entirely confined to the hero's own transit through the viewport.</p></section>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a10;color:#f3f1fa}
code{background:rgba(219,39,119,.16);color:#f5b8e0;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}

.izp-hero{position:relative;height:180vh;overflow:hidden}
.izp-media{
  position:sticky;top:0;height:100vh;width:100%;
  background-image:url('https://picsum.photos/seed/izp-hero/1600/1000');
  background-size:cover;
  background-position:center;
  transform:scale(1) translateY(0);
  animation:izp-zoom linear both;
  animation-timeline:scroll(root);
  animation-range:0% 100%;
  will-change:transform;
}
@keyframes izp-zoom{
  from{ transform:scale(1) translateY(0) }
  to{ transform:scale(1.3) translateY(-2%) }
}
/* A bottom-anchored scrim, not a full-frame vignette -- the photo has to
   stay visible and recognizable through the whole zoom, not black out
   into an empty frame by the midpoint. Only the lower band, behind the
   copy, needs to darken for legibility. */
.izp-scrim{
  position:sticky;top:0;height:100vh;width:100%;margin-top:-100vh;
  background:linear-gradient(to top, rgba(5,4,10,.88) 0%, rgba(5,4,10,.45) 32%, transparent 62%);
  pointer-events:none;
}
.izp-copy{
  position:sticky;top:0;height:100vh;width:100%;margin-top:-100vh;
  display:flex;flex-direction:column;justify-content:flex-end;gap:14px;
  max-width:560px;padding:0 8vw 9vh;
  animation:izp-fade-copy linear both;
  animation-timeline:scroll(root);
  animation-range:0% 60%;
}
@keyframes izp-fade-copy{ to{ opacity:0; transform:translateY(-24px) } }
.izp-eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#f0abfc}
.izp-copy h1{font-size:clamp(32px,6vw,58px);letter-spacing:-.02em;line-height:1.05;text-shadow:0 2px 20px rgba(0,0,0,.5)}
.izp-copy p{color:#e4dff2;font-size:16px;line-height:1.7;max-width:440px;text-shadow:0 1px 12px rgba(0,0,0,.5)}

.izp-after{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:10px;text-align:center;padding:24px;max-width:520px;margin:0 auto}
.izp-after h2{font-size:28px}
.izp-after p{color:#a79fc4;font-size:15.5px;line-height:1.75}

@supports not (animation-timeline: scroll()){
  .izp-media{animation:none;transform:scale(1.15)}
  .izp-copy{animation:none;opacity:1;transform:none}
}`,
  js: `// The hero background's zoom-and-drift transform and the copy's fade-out
// are both driven purely by CSS animation-timeline: scroll(root) on sticky
// layers -- there is no scroll listener, no requestAnimationFrame loop,
// and no other runtime code in this file at all.`,
  seo: {
    title: 'CSS Scroll Timeline Image Zoom Parallax — Native animation-timeline: scroll()',
    description: 'A real photo backdrop that scales up and drifts as you scroll past it, driven entirely by native CSS animation-timeline: scroll() on sticky layers — no JavaScript parallax library. Exports to React, Vue & Tailwind.',
    about: {
      title: 'CSS Scroll Timeline Image Zoom Parallax — Sticky Layers Driven by scroll(root)',
      description: `Zoom-and-drift hero backgrounds are usually built with a parallax library reading scroll offset and writing a transform every frame. This snippet gets the same visual — a photo that scales up and shifts as the hero scrolls past — from three stacked, independently animated \`position: sticky\` layers, all timed by native \`animation-timeline: scroll(root)\`.

**A tall hero, a sticky media layer**

\`.izp-hero\` is 180vh tall, but \`.izp-media\` inside it is \`position: sticky; top: 0; height: 100vh\`, so the backdrop stays pinned to the viewport for the entire time the hero section is scrolling past — exactly the sticky trick behind [CSS Scroll Timeline Section Counter](/ui-snippets/css-scroll-timeline-section-counter/), applied here to a full-bleed \`background-image\` layer instead of a counter panel.

**animation-range confines the zoom to the hero's own transit**

\`animation-range: 0% 100%\` on \`.izp-media\`'s keyframes maps the whole \`scale(1) → scale(1.3)\` zoom to exactly the hero's own scroll distance (the 180vh minus the pinned 100vh), so the transform finishes precisely as the hero finishes scrolling away — it does not keep zooming into unrelated content further down the page.

**Two layers, two independent ranges**

The background media zooms across its full 0%–100% range, while the overlaid copy fades and lifts across a shorter \`animation-range: 0% 60%\`, so the text disappears well before the backdrop has finished its zoom — two \`animation-timeline: scroll(root)\`-bound layers with independently tuned ranges, composited together with nothing but stacked \`position: sticky\` and negative margins.

**A bottom scrim, not a full-frame vignette**

An earlier version of this snippet used a centered radial vignette for text legibility, and it had a real problem: darkening the whole frame toward its center meant that once the zoom carried the photo's brightest area out from behind the vignette's clear middle, large stretches of the scroll felt like they were staring at an almost-black screen. \`.izp-scrim\` fixes that with a \`linear-gradient(to top, ...)\` anchored to the bottom of the frame instead — only the band directly behind the copy darkens, and the rest of the photo stays visible and recognizable through the entire zoom.

**Why not background-position parallax**

Animating \`background-position\` percentage-based parallax is comparatively cheap, but a true zoom needs a scaling transform, and \`transform\` is compositor-friendly in a way raw \`background-size\` changes are not — keeping the effect smooth even on a fast fling-scroll.

**Browser support**

Chromium-based browsers (Chrome, Edge, Opera, Brave) support \`animation-timeline: scroll()\` today; Firefox and Safari support is still landing. The \`@supports not (animation-timeline: scroll())\` fallback locks the backdrop at a fixed enlarged scale and keeps the copy fully visible, rather than leaving it stuck unscaled or invisible.

**Customizing it**

Widen \`scale(1.3)\` for a more dramatic zoom, change \`translateY(-2%)\` for more vertical drift, swap the \`picsum.photos\` URL for your own image, or shorten \`animation-range\` on \`.izp-copy\` to make the text disappear even earlier. Pair it with [CSS View Timeline Stagger List Items](/ui-snippets/css-view-timeline-stagger-list-items/) for content directly below the hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: 'A 180vh hero with a sticky zooming photo backdrop renders, followed by a normal content section.' },
      { title: 'Scroll through the hero', text: 'Watch the photo scale up and drift while the heading and paragraph fade out ahead of it.' },
      { title: 'Scroll back up', text: 'Both layers rewind to their starting scale and full opacity exactly, since they read a live scroll timeline.' },
      { title: 'Swap in your own image', text: 'Replace the picsum.photos URL on .izp-media\'s background-image with a photo of your choice.' },
      { title: 'Tune the zoom amount', text: 'Change scale(1.3) in @keyframes izp-zoom for a subtler or more dramatic effect.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
    ] },
    features: [
      'Full hero photo backdrop scale-and-drift zoom driven entirely by animation-timeline: scroll(root)',
      'Three stacked position: sticky layers (media, scrim, copy) composited with no JavaScript',
      'animation-range confines each layer’s animation to exactly the hero’s own scroll distance',
      'Copy fades and lifts on a shorter range than the backdrop zoom for layered pacing',
      'Compositor-friendly transform: scale() keeps the zoom smooth during fast scrolling',
      'Bottom-anchored scrim keeps text legible without blacking out the rest of the photo',
      'Zero JavaScript parallax library or scroll event listeners',
      '@supports fallback locks to a static enlarged backdrop with fully visible copy',
    ],
    useCases: [
      { icon: 'APP', title: 'Landing page hero sections', desc: 'A cinematic entrance backdrop without pulling in a parallax library dependency.' },
      { icon: 'DESIGN', title: 'Product and brand story openers', desc: 'Pair with [CSS View Timeline Card Flip In](/ui-snippets/css-view-timeline-card-flip-in/) directly below the hero for a cohesive scroll story.' },
      { icon: 'LEARN', title: 'Learn sticky-layer scroll animation', desc: 'A focused demo of compositing multiple independently timed sticky layers with one shared timeline source.' },
      { icon: 'FLOW', title: 'Editorial and magazine-style openers', desc: 'Give a feature article a dramatic full-bleed image entrance before the body copy begins.' },
      { icon: 'CODE', title: 'Replace a JS parallax hero library', desc: 'Removes the need for a scroll-listener-based transform calculation for this specific hero effect.' },
      { icon: 'CODE', title: 'Related: CSS Scroll Timeline Gauge Needle', desc: 'See [CSS Scroll Timeline Gauge Needle](/ui-snippets/css-scroll-timeline-gauge-needle/) for another native scroll(root) technique.' },
      { icon: 'CODE', title: 'Related: Scroll Parallax Layers', desc: 'See [Scroll Parallax Layers](/ui-snippets/scroll-parallax-layers/) for a JS-driven multi-layer parallax approach worth comparing against this native version.' },
    ],
    faqs: [
      { q: 'Why does the backdrop use position: sticky instead of position: fixed?', a: 'A fixed layer would stay pinned for the entire document, not just for the hero’s own scroll distance. A sticky layer inside the 180vh .izp-hero container stays pinned only while that container is scrolling past, then scrolls away naturally with the rest of the page once the hero has fully passed.' },
      { q: 'What does animation-range: 0% 100% actually control here?', a: 'It maps the keyframe animation’s full 0%-to-100% progress onto the element’s own scroll(root) timeline range that corresponds to the hero’s scroll distance, so the zoom finishes exactly when the hero finishes scrolling past rather than continuing to animate against unrelated scroll distance further down the page.' },
      { q: 'Why do the backdrop and the copy use different animation-range values?', a: 'Using a shorter range (0% 60%) for the copy than the backdrop (0% 100%) makes the text fade out well before the zoom finishes, creating a layered, staggered feel instead of every element animating in perfect unison for the full transit.' },
      { q: 'What happens in browsers without animation-timeline support?', a: 'The @supports not (animation-timeline: scroll()) block fixes the backdrop at a static enlarged scale and keeps the copy fully visible and unmoved, so Firefox and Safari users see a complete, intentional-looking hero rather than one stuck at its un-zoomed starting state.' },
      { q: 'Can I swap in my own photograph?', a: 'Yes — replace the picsum.photos URL in .izp-media\'s background-image with your own photo (keeping background-size: cover) and the scroll-driven scale/translate animation applies identically, since the animated property is transform, not the background image itself.' },
      { q: 'Why a bottom scrim instead of a centered vignette?', a: 'A vignette that darkens toward the center of the frame can black out most of the visible area once the zoom carries the photo\'s bright regions out from behind its clear middle — for stretches of the scroll, the frame would read as an almost-empty black screen. Anchoring the scrim to the bottom instead only darkens the band directly behind the copy, so the photo itself stays visible and recognizable through the whole zoom.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out sticky-layer compositing and animation-range math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the backdrop needs position: sticky inside a taller container rather than position: fixed, how animation-range confines the zoom to only the hero's own scroll distance, and why a bottom-anchored scrim keeps the photo visible where a centered vignette would black out the frame partway through the zoom. The same assistant is useful for extending the effect: ask it to add a third sticky layer with its own independent animation-range for a floating badge or logo, swap the zoom direction so the image shrinks instead of grows, or add a subtle brightness dip synced to the same timeline as the copy fades out. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section with a real background photo that scales up and drifts as the user scrolls past it, using only native CSS animation-timeline: scroll() on sticky layers — no JavaScript parallax library, no scroll event listeners.

Requirements:
- A hero wrapper element significantly taller than the viewport (for example 180vh) containing a background/media layer set to position: sticky; top: 0; height: 100vh, with a real background-image (background-size: cover, background-position: center), so it stays pinned to the viewport for the wrapper's entire scroll distance.
- A @keyframes animation on that sticky media layer animating transform (for example scale from 1 to roughly 1.3, combined with a small translateY drift), bound to animation-timeline: scroll(root) and scoped with animation-range so the animation's 0%-to-100% progress corresponds exactly to the hero wrapper's own scroll distance rather than the whole document.
- A second sticky layer stacked on top (using a negative top margin equal to the viewport height to overlap the media layer) holding heading and paragraph copy, aligned toward the bottom of the frame rather than centered, animated with its own @keyframes (opacity and a small upward translateY) bound to the same animation-timeline: scroll(root) but with a shorter animation-range so the text fades out before the backdrop zoom finishes.
- A scrim overlay layer for text legibility, also sticky-positioned to stay aligned with the media layer — anchor its darkening gradient to the bottom of the frame (behind the copy) rather than centering it, so the photo stays visible and recognizable through the entire zoom instead of being blacked out toward the middle of the scroll.
- Ordinary content sections before and after the hero so the sticky pinning behavior is demonstrated clearly.
- Add an @supports not (animation-timeline: scroll()) fallback that fixes the backdrop at a static enlarged scale and keeps the copy fully visible and unmoved, rather than leaving either stuck at its un-zoomed or invisible starting state.
- Keep any JavaScript limited to, at most, a one-time CSS.supports('animation-timeline: scroll()') feature check — it must never drive or read scroll position itself.`,
    },
  },
};

export default cssScrollTimelineImageZoomParallax;
