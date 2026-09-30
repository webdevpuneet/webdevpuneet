const scrollBlurFocus = {
  id: 'scroll-blur-focus',
  title: 'Scroll Blur Focus',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="bf-top"><p>Scroll ↓</p></section>
<section class="bf-list" id="bfList">
  <p class="bf-line">We build tools that</p>
  <p class="bf-line">disappear into the work,</p>
  <p class="bf-line">so the work is all</p>
  <p class="bf-line">that's left to see.</p>
  <p class="bf-line">Calm software,</p>
  <p class="bf-line">made on purpose.</p>
</section>
<section class="bf-bottom"><p>Lines sharpened at center, blurred at the edges.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.bf-top,.bf-bottom{min-height:60vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.bf-list{max-width:820px;margin:0 auto;padding:30vh 24px;display:flex;flex-direction:column;gap:2vh;text-align:center}
.bf-line{font-size:clamp(26px,5vw,56px);font-weight:800;letter-spacing:-.02em;line-height:1.15;filter:blur(8px);opacity:.35;will-change:filter,opacity,transform}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Each line snaps into focus as it nears the center of the viewport, then blurs again.
gsap.utils.toArray('.bf-line').forEach(function (line) {
  gsap.fromTo(line,
    { filter: 'blur(8px)', opacity: 0.35, scale: 0.96 },
    {
      filter: 'blur(0px)', opacity: 1, scale: 1, ease: 'power1.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 75%',
        end: 'center 45%',
        scrub: true
      }
    }
  );

  // Re-blur on the way out so only the centered line is sharp.
  gsap.to(line, {
    filter: 'blur(8px)', opacity: 0.35, scale: 0.96, ease: 'power1.in',
    scrollTrigger: {
      trigger: line,
      start: 'center 45%',
      end: 'bottom 20%',
      scrub: true
    }
  });
});`,

  seo: {
    title: 'Scroll Blur Focus — Free GSAP ScrollTrigger Snippet',
    description: `Text lines that sharpen from a blur at screen center and blur again as they leave, via a scrubbed GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Blur Focus — Lines That Snap Into Focus at Center',
      description: `Scroll blur focus is the editorial effect where each line of a statement is blurred and faint until it reaches the middle of the screen, where it snaps sharp and bright, then softens again as it scrolls away — a "depth of field that follows your reading" feel. This snippet builds it with GSAP and ScrollTrigger (from a CDN), using an animated CSS \`blur()\` filter.

**Two scrubbed phases per line**

Each line gets two ScrollTriggers. The first is a \`fromTo\` that animates from \`blur(8px)\`, low opacity, and slightly scaled down to perfectly sharp as the line travels from \`top 75%\` up to \`center 45%\` — the focus-in. The second tween runs from \`center 45%\` to \`bottom 20%\`, blurring and dimming it again — the focus-out. Both are \`scrub: true\`, so the sharpness is a direct function of how close the line is to center; only the line crossing the focal zone is ever fully clear.

**Why split into focus-in and focus-out**

A single tween could fade a line in, but it couldn't also blur it back out symmetrically as it leaves. Splitting the lifecycle into two scrubbed ranges that meet at the focal point (\`center 45%\`) makes the line sharpen on approach and soften on departure, so the effect reads as a moving plane of focus rather than a one-way reveal. The handoff point is shared so there's no jump.

**Filter, opacity, and scale together**

Combining \`blur\`, \`opacity\`, and a subtle \`scale\` is what sells "focus": real lenses bring a subject up in clarity, brightness, and apparent size at once. Animating all three on the same scrub keeps them in lockstep. The easing differs per phase (\`power1.out\` in, \`power1.in\` out) so the snap into focus feels a touch quicker than the drift out.

**A note on performance**

Animated \`filter: blur()\` is heavier than transform/opacity because it's a real per-pixel blur, so the snippet keeps the blurred elements simple (single lines of text), uses \`will-change\` to promote them, and only animates the few lines near the viewport at any time. For long passages, limit how many lines blur at once — which this scroll-ranged approach does naturally, since off-screen lines aren't animating.

**Reversible by construction**

Because both phases are scrubbed, scrolling up runs them backward — a line that blurred out as you passed it sharpens again as you scroll back to it. There's no fixed timeline to get out of sync.

**Customizing it**

Change the blur amount, the focal position (\`center 45%\`), the scale, or the easing; apply it to images or cards instead of text. Pair it with a [scroll text clip reveal](/ui-snippets/scroll-text-clip-reveal/), a [text reveal scroll](/ui-snippets/text-reveal-scroll/), or [reveal on scroll](/ui-snippets/reveal-on-scroll/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Blurred lines of a statement render.` },
      { title: 'Scroll down', text: `Each line sharpens as it reaches center.` },
      { title: 'Keep scrolling', text: `Lines blur again as they leave center.` },
      { title: 'Scroll back up', text: `Lines re-focus — both phases are scrubbed.` },
      { title: 'Tune the focus', text: `Change the blur amount and focal point.` },
    ] },
    features: [
      { title: 'Animated blur', text: `CSS blur() filter drives the focus.` },
      { title: 'Focus-in + out', text: `Two scrubbed ranges meet at center.` },
      { title: 'Moving focal plane', text: `Only the centered line is sharp.` },
      { title: 'Blur + opacity + scale', text: `Three cues sell real focus.` },
      { title: 'Asymmetric easing', text: `Snaps in, drifts out.` },
      { title: 'Scroll-ranged', text: `Only near-center lines animate.` },
      { title: 'Reversible', text: `Scrolling up re-focuses lines.` },
      { title: 'Works on any block', text: `Text, images, or cards.` },
    ],
    useCases: [
      { title: 'Mission statements', text: `Pair with a [scroll text clip reveal](/ui-snippets/scroll-text-clip-reveal/).` },
      { title: 'Editorial', text: `Focus lines like [text reveal scroll](/ui-snippets/text-reveal-scroll/).` },
      { title: 'Quotes', text: `Sharpen a [testimonial card](/ui-snippets/testimonial-card/) line.` },
      { title: 'Section intros', text: `Combine with [reveal on scroll](/ui-snippets/reveal-on-scroll/).` },
      { title: 'Storytelling', text: `Pace a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Galleries', text: `Apply focus to a [photo gallery](/ui-snippets/photo-gallery/).` },
      { icon: 'CODE', title: 'Related: Scroll Card Fan', desc: 'See the [Scroll Card Fan](/ui-snippets/scroll-card-fan/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does each line have two ScrollTriggers?', a: `One handles focus-in and one handles focus-out. The first fromTo animates from blur, low opacity, and slight scale to sharp as the line moves from top 75% to center 45%; the second blurs and dims it again from center 45% to bottom 20%. Splitting the lifecycle lets a line sharpen on approach and soften on departure, so only the centered line is clear.` },
      { q: 'Why combine blur with opacity and scale?', a: `Real lenses bring a subject up in clarity, brightness, and apparent size together, so animating blur, opacity, and a subtle scale on the same scrub reproduces genuine focus rather than a flat fade. They move in lockstep, and slightly different easing per phase makes the snap into focus feel quicker than the drift out.` },
      { q: 'Is animating blur expensive?', a: `Animated filter: blur() is heavier than transform or opacity because it is a true per-pixel blur, so the snippet keeps blurred elements simple, promotes them with will-change, and only animates lines near the viewport at any moment. The scroll-ranged triggers mean off-screen lines are not animating, which keeps the cost bounded.` },
      { q: 'Does it reverse on scroll up?', a: `Yes. Both phases are scrub: true, so scrolling up runs them backward — a line that blurred out as you passed it sharpens again as you return to it. Because there is no fixed timeline, the focal plane simply follows the scrollbar in either direction with nothing to fall out of sync.` },
      { q: 'How do I use this scroll blur focus in React, Vue, or Angular?', a: `Render the lines, then in a mount effect register ScrollTrigger and loop the line refs to create the two scrubbed tweens each (use gsap.context or a scoped selector). Return a cleanup that reverts the context so triggers are removed on unmount. Keep will-change in CSS for smoothness; the markup and styles port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out why the focal handoff feels seamless just by staring at the code. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the two ScrollTriggers per line share the center 45 percent boundary, and what would visually break if the focus-in and focus-out ranges didn't meet at that exact point. The same assistant is useful for optimizing it — asking whether animating the blur filter on many long lines at once would tank frame rate, and whether narrowing the active scroll-trigger range per line would keep the cost bounded on longer passages. It's just as good for extending the effect: ask it to apply the same focus-in/focus-out pattern to images or cards instead of text, add a chromatic aberration accent alongside the blur, or make the focal point track the exact vertical center of the viewport dynamically rather than a fixed percentage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll blur focus" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A vertical stack of text lines, each starting blurred via CSS filter: blur(8px), dimmed opacity, and slightly scaled down.
- For every line, create two separate ScrollTrigger-driven tweens, not one: a focus-in tween that animates from the blurred/dim/scaled-down state to fully sharp (blur(0px), opacity 1, scale 1) as the line travels from roughly the bottom quarter of the viewport up to the exact vertical center, and a focus-out tween that reverses the same properties as the line continues from that same center point up toward the top of the viewport.
- Both tweens per line must be scrub-linked to scroll position (scrub: true), not played on a timer, so the sharpness at any scroll position is a direct function of the line's distance from the viewport's center.
- The focus-in and focus-out tweens for a given line must share the exact same boundary position (e.g. "center 45%") so there is no visual jump or double-processing at the handoff point.
- Use different easing for the two phases (e.g. a quicker ease-out on the way in, a slower ease-in on the way out) so the snap into focus feels distinct from the drift away.
- Do not implement this with IntersectionObserver or manual scroll-position math — the blur amount must be driven purely by GSAP's scrub mapping of scroll position to each trigger's own start/end range.
- Add will-change hints on the animated properties and keep each animated block simple (single lines of text) since animating CSS filter: blur() is comparatively expensive.`,
    },
  },
};

export default scrollBlurFocus;
