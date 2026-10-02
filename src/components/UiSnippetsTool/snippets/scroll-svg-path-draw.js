const scrollSvgPathDraw = {
  id: 'scroll-svg-path-draw',
  title: 'Scroll SVG Path Draw',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="pd-top"><p>Scroll to draw ↓</p></section>
<section class="pd-stage" id="pdStage">
  <div class="pd-sticky">
    <svg class="pd-svg" viewBox="0 0 200 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path id="pdPath" d="M100 10 C 30 90, 170 150, 100 230 S 20 330, 100 410 S 180 500, 100 590" fill="none" stroke="url(#pdGrad)" stroke-width="5" stroke-linecap="round"/>
      <defs><linearGradient id="pdGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="0.5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>
    </svg>
    <div class="pd-dots">
      <span class="pd-dot" style="top:6%">Plan</span>
      <span class="pd-dot" style="top:38%">Build</span>
      <span class="pd-dot" style="top:68%">Launch</span>
      <span class="pd-dot" style="top:96%">Grow</span>
    </div>
  </div>
</section>
<section class="pd-bottom"><p>The line drew itself as you scrolled.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.pd-top,.pd-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.pd-stage{position:relative;min-height:200vh;display:flex;justify-content:center;padding:60px 24px}
/* The dots must share the SAME sticky box as the SVG -- if only the SVG were
   sticky while the dots stayed positioned against the tall 200vh stage, the
   labels would just scroll past normally and vanish off-screen instead of
   staying anchored to the pinned, currently-visible path. */
.pd-sticky{position:sticky;top:50%;transform:translateY(-50%);width:min(200px,60vw);max-height:80vh}
.pd-svg{display:block;width:100%;height:auto;max-height:80vh;overflow:visible}
.pd-dots{position:absolute;inset:0;pointer-events:none}
.pd-dot{position:absolute;left:50%;transform:translateX(40px);font-size:14px;font-weight:700;color:#cdd3e6;background:#161a28;border:1px solid #2a3146;padding:6px 12px;border-radius:999px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var path = document.getElementById('pdPath');
var len = path.getTotalLength();

// Lay the stroke out as one dash the length of the path, then hide it.
path.style.strokeDasharray = len;
path.style.strokeDashoffset = len;

// Reveal the stroke proportionally to scroll through the tall stage.
gsap.to(path, {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '#pdStage',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true
  }
});`,

  seo: {
    title: 'Scroll SVG Path Draw — Free GSAP ScrollTrigger Snippet',
    description: `An SVG path that draws itself as you scroll using stroke-dashoffset and a GSAP ScrollTrigger scrub. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll SVG Path Draw — A Line That Draws Itself on Scroll',
      description: `The scroll SVG path draw is the effect where a winding line or route appears to draw itself stroke by stroke as you scroll — the technique behind animated roadmaps, timelines, and "how it works" sections. This snippet builds it with GSAP and ScrollTrigger (from a CDN) plus an inline SVG, using the classic stroke-dash trick.

**The stroke-dash draw**

The path is animated with two SVG properties. The script measures the path's true length with \`getTotalLength()\` and sets both \`stroke-dasharray\` and \`stroke-dashoffset\` to that length: the dash array makes a single dash that spans the whole path, and the matching offset pushes that dash entirely out of view, so the line starts invisible. Animating \`stroke-dashoffset\` back toward zero slides the dash into place, revealing the path progressively from start to end — the line literally draws itself.

**Scrubbed to the scroll**

A single \`gsap.to\` tweens \`strokeDashoffset\` to 0, tied to a ScrollTrigger on a tall stage with \`start: 'top top'\`, \`end: 'bottom bottom'\`, and \`scrub: true\`. Because the offset is bound to the scrollbar, the drawn portion of the line tracks exactly how far you've scrolled — scroll halfway and the line is half drawn; scroll back and it un-draws. \`ease: 'none'\` keeps the draw rate constant against scroll.

**Sticky viewport, tall scroll**

The SVG is \`position: sticky\` centered in the viewport while the stage is much taller than one screen (200vh). That combination is what gives the draw room to breathe: the line stays put on screen while you scroll a long distance, so the animation plays out over a comfortable range rather than flashing past. Step labels are absolutely positioned along the path to annotate stages as the line reaches them.

**Gradient stroke**

The stroke is painted with a vertical SVG \`linearGradient\`, so the line shifts hue from top to bottom as it draws — a premium touch that costs nothing and helps distinguish phases of a roadmap. \`stroke-linecap: round\` keeps the growing tip soft.

**Why measure the length in JS**

The dash values must equal the path's real length for the draw to start fully hidden and finish exactly complete. Hard-coding a guess leaves a gap or an overshoot; \`getTotalLength()\` reads the precise value for whatever path data you use, so the effect is correct for any shape — straight, curved, or a complex route.

**Customizing it**

Replace the path \`d\` with your own route or logo outline, change the gradient, the stroke width, or the stage height to slow or speed the draw, and reposition the step labels. Pair it with a [scroll timeline dots](/ui-snippets/scroll-timeline-dots/), a [vertical timeline](/ui-snippets/vertical-timeline/), or a [scroll pin steps](/ui-snippets/scroll-pin-steps/) section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A winding SVG line sits in a tall stage.` },
      { title: 'Scroll down', text: `The line draws itself from top to bottom.` },
      { title: 'Scroll back up', text: `The line un-draws — the offset is scrubbed.` },
      { title: 'Use your own path', text: `Swap the path d for a route or logo.` },
      { title: 'Change the pace', text: `Adjust the stage height to slow the draw.` },
    ] },
    features: [
      { title: 'Stroke-dash draw', text: `Offset slides one dash into view.` },
      { title: 'True length', text: `getTotalLength() makes the draw exact.` },
      { title: 'Scrubbed to scroll', text: `Drawn amount tracks scroll position.` },
      { title: 'Sticky viewport', text: `Line holds on screen over a tall stage.` },
      { title: 'Gradient stroke', text: `Hue shifts along the drawn line.` },
      { title: 'Step labels', text: `Annotations sit along the path.` },
      { title: 'Reversible', text: `Scrolling up un-draws the line.` },
      { title: 'Any path shape', text: `Works for curves, routes, or outlines.` },
    ],
    useCases: [
      { title: 'Roadmap illustrations', text: 'Animate a [product roadmap](/ui-snippets/product-roadmap/) path so a winding line draws itself stroke by stroke as the user scrolls.' },
      { title: 'Timeline spines', text: 'Draw the spine of a [vertical timeline](/ui-snippets/vertical-timeline/), using `getTotalLength()` to make the draw exactly match the path.' },
      { title: 'How it works journeys', text: 'Pair with [scroll pin steps](/ui-snippets/scroll-pin-steps/), or connect to [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) for a complete scroll-driven journey.' },
      { title: 'Logo outline entrances', text: 'Self-draw a brand outline when it enters the viewport, with a sticky viewport keeping the line on screen throughout the scroll.' },
      { title: 'Process tracing', text: 'Trace stages beside [feature cards](/ui-snippets/feature-cards/), scrubbing `stroke-dashoffset` so the drawn amount tracks scroll position in both directions.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Fold Cards', desc: 'See the [Three.js Scroll Fold Cards](/ui-snippets/three-scroll-fold-cards/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the line draw itself?', a: `The script measures the path with getTotalLength() and sets stroke-dasharray and stroke-dashoffset to that length, so a single dash spans the path but is pushed out of view, leaving it invisible. Animating stroke-dashoffset back to zero slides the dash into place, revealing the path progressively — the classic SVG line-draw technique.` },
      { q: 'How is the draw tied to scrolling?', a: `One gsap.to tweens strokeDashoffset to 0 with a ScrollTrigger on the tall stage using start: top top, end: bottom bottom, and scrub: true. Because the offset is bound to the scrollbar, the drawn portion matches how far you have scrolled — half scrolled is half drawn — and scrolling up un-draws it. ease: none keeps the rate constant.` },
      { q: 'Why is the SVG sticky inside a tall section?', a: `The SVG is position: sticky and centered while the stage is 200vh tall. The line stays on screen while you scroll a long distance, so the draw plays over a comfortable range instead of flashing by. The extra height is the scroll budget that the scrubbed animation consumes.` },
      { q: 'Why measure the path length in JavaScript?', a: `The dash values must equal the path's real length for it to start fully hidden and finish exactly complete. A hard-coded guess leaves a gap or overshoots. getTotalLength() returns the precise length for any path data, so the effect is correct whether the line is straight, curved, or a complex route.` },
      { q: 'How do I use this scroll SVG path draw in React, Vue, or Angular?', a: `Render the inline SVG, then in a mount effect read getTotalLength() from a ref to the path, set the dash properties, and build the scrubbed tween after registering ScrollTrigger. Return a cleanup that reverts the GSAP context. Re-measure on resize if the SVG scales. The CSS and SVG markup port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the stroke-dash math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why getTotalLength must be called on the path before setting stroke-dasharray and stroke-dashoffset to the same value, or why the stage needs to be far taller than one viewport (200vh) alongside position: sticky for the draw to have room to play out. The same assistant can help optimize it — asking whether re-measuring getTotalLength on window resize matters if the SVG's viewBox scales responsively, or whether the gradient's stop colors should shift as the line draws for extra visual interest. It's also useful for extending the effect: ask it to add a dot marker that travels along the tip of the drawing line, sync the step label callouts to specific percentages of the path length instead of fixed positions, or support multiple paths that draw in sequence rather than one continuous line. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll SVG path draw" effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) and the native SVG stroke-dash technique — no MotionPathPlugin, no canvas.

Requirements:
- An inline SVG containing a single curved path (using cubic or smooth Bezier commands) with a gradient stroke defined via a linearGradient in defs, sitting inside a stage section that is significantly taller than one viewport height (e.g. 200vh).
- Style the SVG itself with position: sticky centered vertically in the viewport, so it remains visible on screen for the entire scroll distance of the tall stage rather than scrolling past quickly.
- In JavaScript, call getTotalLength on the path element to get its exact real-world length, then set both stroke-dasharray and stroke-dashoffset to that measured length (not a hardcoded guess) so the stroke starts completely invisible, pushed exactly one dash-length out of view.
- Register a single GSAP tween on the path's strokeDashoffset going from its current value down to 0, using ease none, driven by a ScrollTrigger whose trigger is the tall stage, starting when the stage's top reaches the top of the viewport and ending when the stage's bottom reaches the bottom of the viewport, with scrub set to true.
- Confirm the drawn portion of the line always matches how far the user has scrolled through the stage (half scrolled means half the path is drawn) and that scrolling back up visibly un-draws the line, purely because the offset tween is scrubbed in reverse.
- Add a few short text labels absolutely positioned near specific points along the path's visual course to annotate stages of the route, without needing to calculate their exact pixel positions from the path geometry.`,
    },
  },
};

export default scrollSvgPathDraw;
