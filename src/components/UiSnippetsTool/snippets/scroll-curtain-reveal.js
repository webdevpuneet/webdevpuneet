const scrollCurtainReveal = {
  id: 'scroll-curtain-reveal',
  title: 'Scroll Curtain Reveal',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="cr-top"><p>Scroll ↓</p></section>
<section class="cr-stage" id="crStage">
  <div class="cr-back">
    <span class="cr-eyebrow">Next chapter</span>
    <h2>The reveal</h2>
    <p>The panel below slides up like a curtain to uncover the next section.</p>
  </div>
  <div class="cr-curtain" id="crCurtain">
    <div class="cr-curtain-inner">
      <h3>Pull back the curtain</h3>
      <span class="cr-cue">keep scrolling ↑</span>
    </div>
  </div>
</section>
<section class="cr-bottom"><p>The curtain lifted to reveal the section behind it.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.cr-top,.cr-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.cr-stage{position:relative;height:100vh;overflow:hidden}
.cr-back{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:14px;padding:24px;background:radial-gradient(80% 70% at 50% 30%,#1a2347,#0a0e1c)}
.cr-back .cr-eyebrow{font-size:13px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#9fb4ff}
.cr-back h2{font-size:clamp(40px,9vw,108px);letter-spacing:-.03em;font-weight:800;background:linear-gradient(120deg,#a5b4fc,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.cr-back p{color:#aeb4ca;font-size:clamp(15px,2.2vw,20px);max-width:430px}
.cr-curtain{position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#15182a,#0c0e18);border-bottom:1px solid rgba(255,255,255,.06);will-change:transform;transform-origin:top}
.cr-curtain-inner{text-align:center;display:flex;flex-direction:column;gap:10px;will-change:transform,opacity}
.cr-curtain-inner h3{font-size:clamp(26px,6vw,60px);font-weight:800;letter-spacing:-.02em}
.cr-cue{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#7e88a0}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Pin the stage; slide the curtain up off the top to reveal the section behind.
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#crStage',
    start: 'top top',
    end: '+=130%',
    scrub: true,
    pin: true
  }
});

tl.to('#crCurtain .cr-curtain-inner', { y: -40, opacity: 0, ease: 'none' }, 0)
  .to('#crCurtain', { yPercent: -100, ease: 'none' }, 0)
  .from('.cr-back h2', { y: 60, opacity: 0.2, ease: 'none' }, 0.2);`,

  seo: {
    title: 'Scroll Curtain Reveal — Free GSAP ScrollTrigger Snippet',
    description: `A full-screen curtain panel that slides up on scroll to uncover the section behind it, pinned and scrubbed with GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Curtain Reveal — Lift a Panel to Uncover the Section Behind',
      description: `The scroll curtain reveal is the transition where a full-screen panel slides up and off the top of the viewport as you scroll, drawing back like a theater curtain to reveal the content waiting behind it — a dramatic way to move between sections. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus plain HTML and CSS.

**A covering panel over hidden content**

The stage layers two pieces in the same box: a background section at the base and a full-cover \`.cr-curtain\` panel above it at \`z-index: 2\`. At rest the curtain hides the section completely. The entire effect is simply sliding that one panel up out of the way — the reveal is what's already sitting underneath.

**Pinned, scrubbed lift**

A GSAP timeline tied to a pinned ScrollTrigger (\`scrub: true\`, \`end: '+=130%'\`) drives the curtain. From position 0, the curtain tweens \`yPercent: -100\`, moving it entirely off the top edge, while its inner label fades and lifts slightly ahead of the panel so the text doesn't ride awkwardly to the very top. Because it's pinned and scrubbed, the curtain rises exactly as far as you scroll and lowers again if you scroll back — a fully reversible draw.

**The content settles as it's revealed**

The background heading starts pushed down and dim, then eases into place over the same scroll (\`from\` at timeline position 0.2). So as the curtain lifts, the revealed section doesn't just sit there statically — its headline rises into focus, making the reveal feel like the content is arriving rather than being uncovered by a moving shutter. Layering the curtain exit and the content entrance on one timeline keeps them synchronized.

**Why yPercent and a pin**

\`yPercent: -100\` is a transform, so the curtain slides on the GPU without reflowing the page, and \`transform-origin: top\` keeps the motion anchored upward. Pinning the stage means the lift plays over a deliberate scroll distance instead of the panel simply scrolling away with the page — that control is what makes it read as a designed transition rather than normal scrolling.

**Linear and contained**

\`ease: 'none'\` on the curtain and content tweens locks them to the scrollbar with no rubber-banding, and \`overflow: hidden\` on the stage clips the curtain as it exits so nothing spills above the section. The whole thing runs backward perfectly on scroll-up.

**Customizing it**

Change the lift direction (curtain down with \`yPercent: 100\`, or sideways), the reveal distance via \`end\`, the panel styling, or what's behind it — an image, a hero, a video. Pair it with [scroll split panels](/ui-snippets/scroll-split-panels/), a [scroll image mask](/ui-snippets/scroll-image-mask/), or a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A curtain panel covers a hidden section.` },
      { title: 'Scroll down', text: `The curtain slides up off the top.` },
      { title: 'See the reveal', text: `The section behind settles into focus.` },
      { title: 'Scroll back up', text: `The curtain lowers — motion is scrubbed.` },
      { title: 'Change the content', text: `Put any hero or media behind the curtain.` },
    ] },
    features: [
      { title: 'Curtain lift', text: `Panel slides off the top edge.` },
      { title: 'Layered cover', text: `Curtain hides a section beneath.` },
      { title: 'Pinned + scrubbed', text: `Lift follows the scrollbar.` },
      { title: 'Settling content', text: `Revealed heading rises into place.` },
      { title: 'Synced timeline', text: `Exit and entrance share one timeline.` },
      { title: 'Transform slide', text: `yPercent composites, no reflow.` },
      { title: 'Clipped exit', text: `overflow hidden contains the curtain.` },
      { title: 'Reversible', text: `Scrolling up lowers the curtain.` },
    ],
    useCases: [
      { title: 'Section transitions', text: `Pair with [scroll split panels](/ui-snippets/scroll-split-panels/).` },
      { title: 'Big reveals', text: `Uncover a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).` },
      { title: 'Editorial', text: `Open onto a [scroll image mask](/ui-snippets/scroll-image-mask/).` },
      { title: 'Launches', text: `Unveil over a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'Chapters', text: `Punctuate a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Galleries', text: `Lift into a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/).` },
      { icon: 'CODE', title: 'Related: Scroll-Triggered Overshoot Counter', desc: 'See the [Scroll-Triggered Overshoot Counter](/ui-snippets/scroll-counter-overshoot/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the section hidden until you scroll?', a: `The stage layers a background section at the base and a full-cover curtain panel above it at z-index 2, so at rest the curtain hides the section completely. The whole effect is sliding that one panel up out of the way — the reveal is the content already sitting underneath it.` },
      { q: 'How does the curtain lift with the scroll?', a: `A GSAP timeline on a pinned ScrollTrigger with scrub: true tweens the curtain to yPercent -100, moving it off the top edge, while its label fades and lifts slightly ahead. Because it is pinned and scrubbed, the curtain rises exactly as far as you scroll and lowers again on scroll-up — a fully reversible draw.` },
      { q: 'Why does the revealed content rise into focus?', a: `The background heading starts pushed down and dim, then eases into place over the same scroll via a from tween at timeline position 0.2. So as the curtain lifts, the section's headline arrives rather than sitting static, and layering the curtain exit and the content entrance on one timeline keeps them synchronized.` },
      { q: 'Why use yPercent and a pin instead of normal scrolling?', a: `yPercent is a transform, so the curtain slides on the GPU without reflowing the page, with transform-origin: top anchoring the motion upward. Pinning makes the lift play over a deliberate scroll distance instead of the panel just scrolling away with the page, which is what makes it read as a designed transition.` },
      { q: 'How do I use this scroll curtain reveal in React, Vue, or Angular?', a: `In a mount effect, register ScrollTrigger and build the pinned, scrubbed timeline scoped to refs for the stage, curtain, and content. Return a cleanup that reverts the GSAP context so the pin is removed on unmount and route changes. Put any hero or media behind the curtain; the layered CSS and timeline port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the layering and timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the curtain and its inner label are tweened as two separate targets with a slight timing offset, and why yPercent is used instead of animating top or margin-top for the lift. The same assistant can help optimize it — asking whether pinning for +=130% is the right scroll distance for a heavier background (like a full-bleed video) behind the curtain, or whether the settling-content tween needs its own trigger for very tall reveal sections. It's also useful for extending the effect: ask it to make the curtain lift sideways instead of up, split it into two panels that part like real theater curtains, or drop a video or image behind it instead of a gradient and heading. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll curtain reveal" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A single stage section with overflow hidden, containing two absolutely-positioned full-cover layers: a background layer with the "revealed" content sitting underneath, and a curtain layer on top (higher z-index) that fully hides the background at rest.
- Build one GSAP timeline tied to a pinned, scrubbed ScrollTrigger (pin: true, scrub: true) on the stage, running for a fixed extra scroll distance (e.g. +=130% of the viewport).
- At timeline position 0, tween the curtain's yPercent to -100 so it slides entirely off the top edge using a transform (not top/margin, which would trigger layout), with transform-origin set to the top of the curtain.
- Also starting at position 0, fade and lift the curtain's inner label/text slightly ahead of the curtain's own exit, so the label doesn't awkwardly ride all the way to the very top edge before disappearing.
- Slightly after the curtain starts moving (e.g. at 20% of the timeline), animate the background content's heading in from a lower, dimmer starting state (translateY plus reduced opacity) up to its resting state, so the revealed section doesn't just sit there statically — it settles into focus in sync with the curtain lifting.
- Use ease: 'none' on every tween in the timeline so all motion tracks the scrollbar linearly with no rubber-banding, since the scrub itself provides the smoothing.
- Confirm the whole sequence reverses correctly on scroll-up (curtain lowers back down, heading recedes) purely from the scrub being tied to scroll position, with no separate reverse-specific code.`,
    },
  },
};

export default scrollCurtainReveal;
