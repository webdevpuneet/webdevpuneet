const scrollShapeMorph = {
  id: 'scroll-shape-morph',
  title: 'Scroll Shape Morph',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ssm-top"><p>Scroll ↓</p></section>
<section class="ssm-stage" id="ssmStage">
  <div class="ssm-blob" id="ssmBlob"></div>
  <div class="ssm-caption" id="ssmCap0"><h3>Fluid by default</h3><p>An organic blob, drawn with border-radius alone.</p></div>
  <div class="ssm-caption" id="ssmCap1"><h3>Structured when needed</h3><p>The same element tightening toward geometry.</p></div>
  <div class="ssm-caption" id="ssmCap2"><h3>Precise at the end</h3><p>A crisp rounded square — one div the whole way.</p></div>
</section>
<section class="ssm-bottom"><p>Scroll up to melt the square back into a blob.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.ssm-top,.ssm-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.ssm-stage{position:relative;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6vh;overflow:hidden;background:radial-gradient(75% 65% at 50% 42%,#111631,#07080d)}
.ssm-blob{width:min(300px,58vw);aspect-ratio:1;background:linear-gradient(135deg,#818cf8,#22d3ee);border-radius:58% 42% 63% 37% / 45% 58% 42% 55%;box-shadow:0 30px 90px rgba(99,102,241,.35);will-change:border-radius,transform,filter}
.ssm-caption{position:absolute;bottom:12vh;text-align:center;opacity:0;will-change:transform,opacity}
.ssm-caption h3{font-size:clamp(22px,4vw,34px);font-weight:800;letter-spacing:-.02em}
.ssm-caption p{color:#aeb4ca;font-size:15px;margin-top:6px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Three border-radius states: organic blob → soft pebble → rounded square.
// Because all three use the full 8-value syntax, GSAP interpolates every
// corner smoothly between states.
var SHAPES = [
  '58% 42% 63% 37% / 45% 58% 42% 55%',
  '38% 62% 44% 56% / 60% 40% 60% 40%',
  '12% 12% 12% 12% / 12% 12% 12% 12%'
];

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#ssmStage',
    start: 'top top',
    end: '+=220%',
    scrub: 0.5,
    pin: true
  }
});

// Shape morphs: state i → i+1, each over one timeline unit.
tl.to('#ssmBlob', { borderRadius: SHAPES[1], rotation: 40, filter: 'hue-rotate(60deg)', ease: 'none', duration: 1 }, 0)
  .to('#ssmBlob', { borderRadius: SHAPES[2], rotation: 90, filter: 'hue-rotate(140deg)', ease: 'none', duration: 1 }, 1);

// Captions hand off at the same boundaries.
gsap.set('#ssmCap0', { opacity: 1 });
tl.to('#ssmCap0', { opacity: 0, y: -20, duration: 0.25, ease: 'none' }, 0.6)
  .fromTo('#ssmCap1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: 'none' }, 0.75)
  .to('#ssmCap1', { opacity: 0, y: -20, duration: 0.25, ease: 'none' }, 1.6)
  .fromTo('#ssmCap2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: 'none' }, 1.75);`,

  seo: {
    title: 'Scroll Shape Morph — Free GSAP Blob Morph Snippet',
    description: `One div morphs from organic blob to rounded square on scroll — 8-value border-radius interpolation, hue rotation, synced captions. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Shape Morph — Melt a Blob Into Geometry With the Scrollbar',
      description: `The scroll shape morph pins a single gradient element and reshapes it as you scroll: an organic blob tightens into a soft pebble, then squares off into crisp geometry — while its hue rotates and captions narrate each state. Scrolling up melts it back. It's a lightweight way to visualize a "flexible to structured" story without SVG path morphing. This snippet builds it with GSAP ScrollTrigger (from a CDN) and interpolated 8-value border-radius.

**Blobs are just asymmetric border-radius**

The organic shape comes from border-radius's full syntax: \`58% 42% 63% 37% / 45% 58% 42% 55%\` sets each corner's horizontal radii before the slash and vertical radii after. Unequal values per corner turn a square div into a lumpy, organic form — no SVG, no clip-path, no mask. The gradient fill and a colored shadow complete the blob look on a single div.

**GSAP interpolates all eight radii between states**

Each morph tweens \`borderRadius\` from one 8-value string to the next. GSAP parses complex CSS values into their numeric components and interpolates each of the eight percentages independently, so every corner travels smoothly from its blob value to its square value. The one rule: all states must use the same full syntax — mixing \`12%\` shorthand with 8-value strings would misalign the component mapping, which is why the square state is written out as all eight values.

**Rotation disguises the corner correspondence**

A pure radius morph can look like corners "breathing" in place. Adding \`rotation: 40°\` then \`90°\` across the two morphs keeps the silhouette turning while it reshapes, so the eye reads continuous transformation rather than four corners independently inflating. By the square state the element has turned a quarter — arriving at geometry squared-up, not tilted.

**hue-rotate recolors without a second gradient**

The fill appears to shift from indigo-cyan toward warmer tones via \`filter: hue-rotate()\` — one interpolatable value — instead of crossfading stacked gradient layers. It's the cheapest way to make each shape state feel like its own "chapter" color while the underlying gradient never changes.

**Captions narrate state boundaries**

Three captions hand off at the morph boundaries on the same scrubbed timeline (out at \`0.6\`/\`1.6\`, in at \`0.75\`/\`1.75\`), with a small gap between exit and entrance so two captions never overlap mid-scrub. As always with single-timeline choreography, the narration can't drift from the shape it describes.

**Two morphs, 220% of scroll**

Each state transition owns one timeline unit across a \`+=220%\` pin — roughly a full viewport-height of scrolling per morph, slow enough to watch corners travel. \`scrub: 0.5\` smooths the reshaping into a melt rather than a stutter.

**Where this approach ends**

Radius morphing handles convex, roundish forms. For star shapes, letters, or concave silhouettes you'd graduate to SVG path morphing (MorphSVG or flubber); for a continuously wobbling blob see the [liquid blob](/ui-snippets/liquid-blob/) snippet.

**Box-shadow and gradient stay constant while the silhouette changes**

The blob's colored shadow and gradient fill never animate — only \`border-radius\`, \`rotation\`, and the \`hue-rotate\` filter move. Keeping the shadow static means the browser doesn't need to recompute blur geometry every frame; it just repaints the same shadow shape clipped by whatever the border-radius currently is. That division of labor — shape-defining properties animate, decorative properties stay fixed — is what keeps a filter-heavy element (blur shadow, hue rotation) affordable under a scrub running at 60fps.

**Customizing it**

Add states to the \`SHAPES\` array (one tween per transition), retint via the hue-rotate degrees, or put a logo inside the shape. Pair it with [scroll color sections](/ui-snippets/scroll-color-sections/) for page-wide theming, a [scroll word wheel](/ui-snippets/scroll-word-wheel/) for the headline, or [wave divider](/ui-snippets/wave-divider/) transitions between sections.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A gradient blob renders with its first caption.` },
      { title: 'Scroll into the stage', text: `The blob starts tightening and turning.` },
      { title: 'Pass each state', text: `Captions hand off as pebble becomes square.` },
      { title: 'Scroll back up', text: `The square melts back into the blob.` },
      { title: 'Add shape states', text: `Append 8-value strings to the SHAPES array.` },
    ] },
    features: [
      { title: '8-value morphing', text: `Every corner radius interpolates independently.` },
      { title: 'Single-div shape', text: `No SVG, clip-path, or mask needed.` },
      { title: 'Turning silhouette', text: `Rotation disguises corner breathing.` },
      { title: 'hue-rotate chapters', text: `One filter recolors each state.` },
      { title: 'Narrated states', text: `Captions hand off at morph boundaries.` },
      { title: 'Gap-safe handoffs', text: `Exits finish before entrances begin.` },
      { title: 'Pinned + scrubbed', text: `Two morphs across 220% of scroll.` },
      { title: 'Reversible melt', text: `Scrolling up un-squares the shape.` },
    ],
    useCases: [
      { title: 'Concept storytelling', text: `Visualize flexible-to-structured narratives inside a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Brand motifs', text: `Morph the brand blob between sections; keep it ambient with [liquid blob](/ui-snippets/liquid-blob/).` },
      { title: 'Feature states', text: `One shape per product mode, narrated like [scroll pin steps](/ui-snippets/scroll-pin-steps/).` },
      { title: 'Design-tool sites', text: `Show malleability literally, then a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) of outputs.` },
      { title: 'Theme transitions', text: `Sync the hue shift with [scroll color sections](/ui-snippets/scroll-color-sections/).` },
      { title: 'Hero accents', text: `Park the morph beside a [scroll letter stagger](/ui-snippets/scroll-letter-stagger/) headline.` },
      { icon: 'CODE', title: 'Related: Scrollama Scrollytelling', desc: 'See the [Scrollama Scrollytelling](/ui-snippets/scrollama-story-steps/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does a square div become an organic blob?', a: `Through border-radius's full syntax: four horizontal radii before the slash and four vertical after, one pair per corner. Unequal percentages like 58% 42% 63% 37% / 45% 58% 42% 55% pull each corner differently, producing a lumpy organic silhouette from a single div — no SVG, clip-path, or mask involved.` },
      { q: 'How does GSAP animate between the shapes?', a: `GSAP parses complex CSS values into numeric components and interpolates each independently, so tweening borderRadius between two 8-value strings animates all eight percentages in parallel. The requirement is consistent syntax across states — the square is written as all eight 12% values rather than shorthand so components stay aligned.` },
      { q: 'Why does the shape rotate while it morphs?', a: `A pure radius morph reads as corners inflating and deflating in place. Layering rotation (0° → 40° → 90°) keeps the silhouette turning during the reshape, which the eye reads as one continuous transformation. The quarter-turn total also means the element arrives at its square state squared-up rather than tilted.` },
      { q: 'Can this morph into stars or letters?', a: `No — border-radius can only produce convex, roundish forms since it just rounds a rectangle's corners. Concave shapes, stars, or glyphs need SVG path interpolation (GSAP's MorphSVG plugin or flubber) where you tween between path definitions with matched point counts. For roundish state stories, though, radius morphing is far lighter.` },
      { q: 'Why does the shape stay performant despite the shadow and gradient?', a: `Because only shape-defining properties — border-radius, rotation, and the hue-rotate filter — are tweened, while the box-shadow and gradient fill stay fixed. The browser repaints the same shadow geometry clipped to whatever radius is current, rather than recomputing blur math every frame. That separation of "what animates" from "what decorates" is what keeps a filter-heavy element affordable under a 60fps scrub.` },
      { q: 'How do I use this scroll shape morph in React, Vue, or Angular?', a: `Create the timeline in a mount effect — useEffect, onMounted, or ngAfterViewInit — inside gsap.context scoped to the stage ref, and revert it on cleanup so the pin unregisters on unmount. Keep SHAPES as a constant outside the component to avoid re-allocations, and leave borderRadius writes to GSAP rather than framework state. The blob's gradient and sizing express naturally in Tailwind arbitrary values.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the 8-value border-radius interpolation on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why every entry in the SHAPES array must use the full eight-value border-radius syntax rather than shorthand, or why the rotation is layered on top of the radius morph specifically to disguise "corner breathing." The same assistant can help optimize it — asking whether the hue-rotate filter and the border-radius interpolation together risk any repaint cost at 60fps under scrub, or whether the caption handoff gaps (0.6 to 0.75, 1.6 to 1.75) are wide enough to avoid overlap on slower devices. It's also useful for extending the effect: ask it to add a fourth shape state, swap the rounded-square end state for an entirely different silhouette, or make the hue-rotate degrees driven by a data attribute per state instead of a fixed value per tween. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll shape morph" effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) — using only CSS border-radius morphing, no SVG path morphing, no clip-path.

Requirements:
- A single gradient-filled div acting as the shape, plus several caption elements describing each state, all inside a pinned stage section.
- Define at least three shape states as strings using the full eight-value border-radius syntax (four horizontal radii before a slash, four vertical radii after), ranging from a strongly asymmetric organic blob shape to a nearly-square rounded rectangle — every state must use the same eight-value format so GSAP can interpolate each corner's value independently and consistently between states.
- Register one GSAP timeline on a single ScrollTrigger with pin: true and a scrub smoothing value, over a scroll distance long enough to give each shape transition its own clearly perceivable timeline segment.
- Tween the shape's border-radius from state to state across the timeline, and on each of those same tweens simultaneously animate its rotation (increasing across each transition) and a CSS filter hue-rotate value (also increasing across each transition), so the shape visibly turns and recolors while its silhouette changes — the rotation must be layered on top of the radius change so the shape reads as one continuous transformation, not a static shape whose corners just move independently.
- On the same shared timeline, fade and vertically slide each caption in and out at explicit positions synced to the shape's state boundaries, leaving a small time gap between one caption's exit and the next caption's entrance so two captions can never be visible or animating at once.
- Do not animate the shape's box-shadow or gradient background — only the border-radius, rotation, and hue-rotate filter should be part of the tweened properties, so the browser can repaint the same static shadow/gradient shape clipped to whatever radius is currently active rather than recomputing shadow geometry every frame.
- Confirm scrolling back up smoothly un-squares the shape back into the organic blob, purely because the timeline is scrubbed in reverse.`,
    },
  },
};

export default scrollShapeMorph;
