const scrollTextDraw = {
  id: 'scroll-text-draw',
  title: 'Scroll Text Draw',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="std-top"><p>Scroll ↓</p></section>
<section class="std-stage" id="stdStage">
  <svg class="std-svg" viewBox="0 0 800 240" aria-hidden="true">
    <defs>
      <linearGradient id="stdGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#a5b4fc"/><stop offset="1" stop-color="#22d3ee"/>
      </linearGradient>
    </defs>
    <text class="std-text std-stroke" x="50%" y="52%">DRAWN</text>
    <text class="std-text std-fill" x="50%" y="52%">DRAWN</text>
    <text class="std-sub" x="50%" y="82%">by your scrollbar</text>
  </svg>
</section>
<section class="std-bottom"><p>Outline first, ink second — scroll up to erase it.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.std-top,.std-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.std-stage{height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(75% 65% at 50% 45%,#10152e,#07080d)}
.std-svg{width:min(800px,94vw);height:auto}
.std-text{font-family:system-ui,-apple-system,sans-serif;font-size:150px;font-weight:800;letter-spacing:.02em;text-anchor:middle;dominant-baseline:middle}
.std-stroke{fill:none;stroke:url(#stdGrad);stroke-width:2}
.std-fill{fill:url(#stdGrad);opacity:0}
.std-sub{font-size:22px;letter-spacing:.42em;text-transform:uppercase;fill:#8a90a8;text-anchor:middle;opacity:0}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// A dash longer than any letter's outline; offsetting it by its own
// length hides the stroke entirely, and scrubbing back to 0 "draws" it.
var DASH = 1000;
gsap.set('.std-stroke', { strokeDasharray: DASH, strokeDashoffset: DASH });

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#stdStage',
    start: 'top top',
    end: '+=180%',
    scrub: 0.4,
    pin: true
  }
});

tl.to('.std-stroke', { strokeDashoffset: 0, ease: 'none', duration: 2 }, 0)
  .to('.std-fill', { opacity: 1, ease: 'none', duration: 0.8 }, 1.6)
  .to('.std-stroke', { opacity: 0.25, ease: 'none', duration: 0.8 }, 1.6)
  .to('.std-sub', { opacity: 1, ease: 'none', duration: 0.4 }, 2.2);`,

  seo: {
    title: 'Scroll Text Draw — Free GSAP SVG Outline Snippet',
    description: `SVG headline outlines draw themselves with stroke-dashoffset as you scroll, then flood with gradient fill — pinned and scrubbed. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Text Draw — A Headline That Sketches Itself, Then Inks In',
      description: `The scroll text draw renders a headline as SVG outlines that trace themselves in as you scroll — like watching a hand letter the word — and once the strokes complete, the gradient fill floods in and the outline recedes. Scroll up and the word erases itself. This snippet builds it with GSAP ScrollTrigger (from a CDN) and the classic stroke-dashoffset trick applied to \`<text>\`.

**The dash trick: a stroke hidden by its own offset**

Every SVG stroke can be dashed with \`stroke-dasharray\` and shifted with \`stroke-dashoffset\`. Setting both to the same value — here 1000, longer than any letter's outline — makes the visible dash start exactly one dash-length away, so the stroke is completely invisible. Tweening the offset back to 0 slides the dash along each glyph's contour, and the letters appear to draw themselves. On a scrubbed timeline, the scrollbar becomes the pen.

**Why the dash length is a constant, not a measurement**

For a \`<path>\` you'd measure \`getTotalLength()\`, but SVG \`<text>\` has no path-length API — its outlines live inside the font. The pragmatic standard is a constant comfortably longer than the longest glyph contour. The only cost of oversizing: some letters finish drawing slightly before others (each contour shorter than 1000 completes early in the tween). Visually this reads as natural hand-lettering variation. If you need per-letter precision, convert the text to outlines in an editor and export real paths.

**Two stacked text layers separate stroke from fill**

The word is rendered twice at identical coordinates: a stroke-only layer (\`fill: none\`) and a fill-only layer (\`opacity: 0\`). Splitting them means the draw and the ink are independently animatable — the fill fades in at timeline position 1.6, while the stroke simultaneously dims to 25% instead of vanishing, leaving a subtle contour like inked linework under a wash. A single text element can't crossfade its own stroke against its fill this cleanly.

**Gradient via url() reference**

Both layers paint with \`url(#stdGrad)\`, a \`<linearGradient>\` defined in \`<defs>\`. SVG paint servers apply to stroke and fill alike, so the outline and the flood share the exact same indigo-to-cyan ramp — a coherence trick that's awkward with CSS text (where stroke gradients need background-clip hacks).

**Choreography: draw, ink, caption**

The pinned timeline runs three beats: the outline draws for 2 units, the ink crossfade starts at 1.6 (slightly overlapping the final strokes so it feels continuous, not staged), and the letter-spaced caption fades at 2.2 as a sign-off. \`end: '+=180%'\` gives the whole sequence almost two viewport-heights of scroll, and \`scrub: 0.4\` smooths wheel ticks into pen glides.

**text-anchor centers without layout math**

\`text-anchor: middle\` with \`x="50%"\` centers the word inside the responsive viewBox, so the SVG scales from phone to desktop with zero JS measurement — the drawing coordinates are resolution-independent by nature.

**Customizing it**

Change the word (bump \`DASH\` if you use a long word in a heavier font), the gradient stops, or the stroke width for a bolder sketch. Pair it with the line-drawing [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/), a [scroll text clip reveal](/ui-snippets/scroll-text-clip-reveal/) for paragraph copy, or [gradient text](/ui-snippets/gradient-text/) for static headings elsewhere.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `The SVG headline renders with invisible strokes.` },
      { title: 'Scroll into the stage', text: `Letter outlines start tracing themselves in.` },
      { title: 'Keep scrolling', text: `Gradient ink floods the letters; the outline dims.` },
      { title: 'Scroll back up', text: `The word un-inks and erases stroke by stroke.` },
      { title: 'Change the word', text: `Edit both text layers; raise DASH for longer glyphs.` },
    ] },
    features: [
      { title: 'Self-drawing text', text: `stroke-dashoffset traces each glyph.` },
      { title: 'Two-layer type', text: `Separate stroke and fill text stacks.` },
      { title: 'Gradient paint', text: `One linearGradient inks stroke and fill.` },
      { title: 'Overlapped beats', text: `Ink starts before the draw finishes.` },
      { title: 'Residual outline', text: `Stroke dims to 25%, not to zero.` },
      { title: 'Responsive viewBox', text: `Centers and scales with no JS measuring.` },
      { title: 'Pinned + scrubbed', text: `The scrollbar is the pen.` },
      { title: 'Reversible', text: `Scrolling up erases the word.` },
    ],
    useCases: [
      { title: 'Brand name moments', text: 'Draw a product name at a chapter break inside a [scroll pin story](/ui-snippets/scroll-pin-story/), with outlines tracing in through `stroke-dashoffset`.' },
      { title: 'Sketched name openers', text: 'Sketch your name as an opening, then follow with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) of projects once the strokes have flooded with colour.' },
      { title: 'Event wordmarks', text: 'Trace an event wordmark as the page opens, adding a [countdown timer](/ui-snippets/countdown-timer/) beneath so the date is clear to visitors.' },
      { title: 'Diagram narratives', text: 'Combine with [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) so lines and lettering draw together, with one linear gradient inking both the stroke and the fill.' },
      { title: 'Section headers and static fallbacks', text: 'Place a drawn heading between sections such as a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/), or use [gradient text](/ui-snippets/gradient-text/) where motion is unwanted.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Hologram Scan Reveal', desc: 'See the [Three.js Scroll Hologram Scan Reveal](/ui-snippets/three-scroll-hologram-scan/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does stroke-dashoffset make text draw itself?', a: `The stroke is dashed with stroke-dasharray: 1000 and shifted by stroke-dashoffset: 1000 — the visible dash starts exactly one dash-length away, so nothing shows. Tweening the offset to 0 slides the dash along each glyph's contour, revealing the outline progressively. On a scrubbed pinned timeline, scroll position controls how much of each letter is traced.` },
      { q: 'Why 1000 instead of measuring the real outline length?', a: `getTotalLength() only exists on path elements; SVG text exposes no contour-length API because outlines live in the font. A constant longer than the longest glyph contour is the standard workaround — shorter letters just finish a bit early, which reads as hand-lettering variation. For exact per-letter timing, convert the text to outlines and animate real paths.` },
      { q: 'Why is the word rendered twice?', a: `One text layer is stroke-only and one is fill-only, stacked at identical coordinates. That separation lets the draw and the ink animate independently: the fill fades in while the stroke dims to 25% rather than disappearing. A single element can't crossfade its own stroke against its own fill with separate timings.` },
      { q: 'Can I use a different font or a multi-word headline?', a: `Yes — any font-family works since the browser strokes whatever glyphs it renders, though bold geometric faces read best because their contours are long and clean. For multiple words, add more text-layer pairs at different y positions and stagger their tweens on the timeline; raise DASH if a heavier face has longer contours than 1000 units.` },
      { q: 'How do I use this scroll text draw in React, Vue, or Angular?', a: `Inline the SVG in your template and run the gsap.set and timeline in a mount effect — useEffect, onMounted, or ngAfterViewInit — scoped with gsap.context to a ref, reverting on cleanup so the pin unregisters. Keep the gradient id unique per instance (suffix it with a component id) or two rendered copies will fight over url(#stdGrad). Layout around the SVG works fine in Tailwind.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the two-layer text trick alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why SVG text elements need a constant dash length instead of getTotalLength like an SVG path would use, or why the word is rendered as two stacked text layers (stroke-only and fill-only) instead of animating one element's stroke and fill together. The same assistant can help optimize it — asking whether the fixed DASH value of 1000 is safe for a heavier or longer word, or whether the timeline's overlap between the stroke finishing and the fill starting (at position 1.6 while stroke duration is 2) should be tuned differently for a slower reveal. It's also useful for extending the effect: ask it to add a second word that draws immediately after the first, animate the gradient's stop colors as the ink fills in, or convert the text to real outline paths for exact per-letter draw timing. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll text draw" self-sketching headline in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) and the SVG stroke-dash technique applied to text elements — no path conversion tools, no canvas.

Requirements:
- An inline SVG containing a linearGradient definition in defs, and the same headline word rendered twice at identical x/y coordinates as two separate SVG text elements: one styled with fill: none and a gradient stroke (the outline layer), and one styled with a gradient fill and starting opacity 0 (the ink layer). Add a smaller subtitle text element also starting at opacity 0.
- Because SVG text elements have no getTotalLength API (unlike SVG path elements), use a single constant dash length value picked comfortably larger than the longest letter's contour, and set both stroke-dasharray and stroke-dashoffset on the outline layer to that same constant so its stroke starts completely invisible.
- Register one GSAP timeline on a single ScrollTrigger with pin: true and a scrub smoothing value, over a scroll distance of somewhat under two viewport heights.
- On that timeline: first tween the outline layer's strokeDashoffset down to 0 with ease none over roughly the timeline's first half, tracing each letter's outline progressively; then, starting slightly before that stroke tween fully finishes (an overlapping timeline position, not a strictly sequential one), fade the ink layer's opacity up to 1 while simultaneously fading the outline layer's opacity down to a low but nonzero value like 0.25 (so a faint outline remains visible under the fill rather than disappearing completely); finally fade in the subtitle text after the ink has finished.
- Center the text using SVG's text-anchor: middle with percentage-based x coordinates inside a responsive viewBox, so the whole composition scales correctly at any screen size with no JavaScript-based centering math.
- Confirm scrolling back up reverses the entire sequence — ink fades out, the outline brightens back up, and the stroke un-draws letter by letter — purely because the timeline is scrubbed, with no separate reverse code path.`,
    },
  },
};

export default scrollTextDraw;
