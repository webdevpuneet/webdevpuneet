const roughAnnotationCard = {
  id: 'rough-annotation-card',
  title: 'Hand-Drawn Annotation Card',
  lastmod: '2026-08-02',
  category: 'cards',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/rough-notation@0.5.1/lib/rough-notation.iife.js'],
  html: `<div class="rac-card">
  <div class="rac-meta">
    <span class="rac-badge">rough-notation</span>
    <button class="rac-replay" id="racReplay">Replay ↻</button>
  </div>

  <p class="rac-copy">
    We rebuilt onboarding in a single sprint and
    <span data-annot="highlight" data-color="#fde68a">cut time-to-first-value by 63%</span>.
    The old flow had <span data-annot="strike-through" data-color="#f87171">eleven required fields</span>
    — now it has <span data-annot="circle" data-color="#818cf8">three</span>.
    Support tickets about signup dropped to
    <span data-annot="underline" data-color="#34d399">almost nothing</span>,
    and the team shipped it without
    <span data-annot="box" data-color="#fb923c">a single migration</span>.
  </p>

  <div class="rac-author">
    <span class="rac-avatar">MR</span>
    <div>
      <b>Mara Reyes</b>
      <small>Head of Product, Northwind</small>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7fb;color:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rac-card{width:min(560px,94vw);background:#fff;border:1px solid #e6e9f2;border-radius:20px;padding:28px;box-shadow:0 24px 60px -30px rgba(15,23,42,.35)}
.rac-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.rac-badge{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6366f1;background:#eef2ff;border:1px solid #ddd6fe;padding:5px 11px;border-radius:99px}
.rac-replay{padding:7px 14px;border-radius:9px;border:1px solid #e2e8f0;background:#fff;color:#475569;font:600 12.5px system-ui;cursor:pointer;transition:background .16s,border-color .16s,color .16s}
.rac-replay:hover{background:#f8fafc;border-color:#cbd5e1;color:#0f172a}

.rac-copy{font-size:clamp(17px,3vw,21px);line-height:2;font-weight:500;letter-spacing:-.01em}
.rac-copy span[data-annot]{position:relative;white-space:normal}

.rac-author{display:flex;align-items:center;gap:12px;margin-top:26px;padding-top:20px;border-top:1px solid #eef1f7}
.rac-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rac-author b{font-size:14px;display:block}
.rac-author small{font-size:12.5px;color:#94a3b8}`,

  js: `var targets = Array.prototype.slice.call(document.querySelectorAll('[data-annot]'));

var annotations = targets.map(function (el) {
  return RoughNotation.annotate(el, {
    type: el.dataset.annot,
    color: el.dataset.color,
    strokeWidth: el.dataset.annot === 'highlight' ? 12 : 2,
    // Highlight draws THROUGH the text, so it must sit behind it; the others sit on top.
    padding: el.dataset.annot === 'box' ? 6 : 3,
    iterations: 2,
    animationDuration: 700,
    multiline: true
  });
});

var group = RoughNotation.annotationGroup(annotations);

var played = false;
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !played) {
      played = true;
      group.show();
    }
  });
}, { threshold: 0.4 });

io.observe(document.querySelector('.rac-card'));

document.getElementById('racReplay').addEventListener('click', function () {
  group.hide();
  // hide() strips the SVGs synchronously; re-showing on the next frame
  // guarantees the draw animation restarts from zero length.
  requestAnimationFrame(function () { group.show(); });
});`,

  seo: {
    title: 'Hand-Drawn Annotation Card — Rough Notation Snippet',
    description: 'A testimonial card whose key phrases get sketchy hand-drawn highlights and circles that draw themselves on scroll. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Hand-Drawn Annotation Card — Sketchy Emphasis That Draws Itself',
      description: `Bolding a phrase says "this matters." Drawing a wobbly circle around it by hand says "this is the bit I would have pointed at if we were in the same room." That difference in tone is why hand-drawn annotation has become a signature of well-designed marketing pages — and why faking it with CSS never quite lands.

This snippet uses **rough-notation**, a tiny library built on top of Rough.js, which generates genuinely irregular SVG paths using the same algorithms that make hand-drawn diagrams look hand-drawn. Every stroke is procedurally imperfect. Reload the page and the wobble is different, because the paths are regenerated rather than replayed from a fixed asset.

## Markup drives the annotations

The critical design decision is that nothing is hard-coded in JavaScript. Every annotated phrase declares its own treatment as data attributes directly in the HTML:

\`<span data-annot="highlight" data-color="#fde68a">cut time-to-first-value by 63%</span>\`

The script queries \`[data-annot]\`, maps over the results, and reads \`el.dataset.annot\` and \`el.dataset.color\` to configure each annotation. That means a copywriter can add, remove, or restyle emphasis by editing the sentence — no JS changes at all. The snippet demonstrates five of the six available types: \`highlight\`, \`strike-through\`, \`circle\`, \`underline\`, and \`box\` (the sixth, \`bracket\`, works identically).

## Per-type configuration, and why highlight is special

The options object is not uniform across types, and getting this wrong is what makes most implementations look off:

\`strokeWidth: el.dataset.annot === 'highlight' ? 12 : 2\`

A \`highlight\` simulates a marker pen — it needs a very wide stroke (12) to cover the text's x-height, and rough-notation automatically inserts it **behind** the text rather than in front, so the words stay readable through the ink. Every other type is a thin pen line (2) drawn **over** the text. Using stroke width 2 for a highlight produces a thin stripe through the middle of the words; using 12 for an underline produces an unreadable smear.

Padding is likewise conditional. A \`box\` needs breathing room (6) or the rectangle crowds the letters, while an underline sits better tight to the baseline (3).

\`iterations: 2\` means each stroke is drawn twice with different randomization — the way a person naturally goes over a circle a second time. One iteration looks tentative; three looks scribbled.

## Sequencing with annotationGroup

Showing five annotations at once is visual noise. \`RoughNotation.annotationGroup(annotations)\` wraps them into a group whose \`show()\` plays them **in array order, one after another**, each waiting for the previous to finish. Since the array comes from \`querySelectorAll\`, that order is document order — so the annotations appear in exactly the sequence a reader encounters them. The effect reads as someone marking up the paragraph as they read it aloud.

## Playing on scroll, exactly once

An \`IntersectionObserver\` with \`threshold: 0.4\` waits until 40% of the card is visible before calling \`group.show()\`. The \`played\` boolean guard is what keeps it from restarting every time the card re-enters the viewport — without it, scrolling up and down retriggers the whole sequence repeatedly, which is the single most irritating way to ship this effect.

## The replay gotcha

The replay button cannot simply call \`show()\` again — the annotations are already shown, so nothing happens. It must \`hide()\` first, and crucially, re-show on the **next animation frame**:

\`group.hide(); requestAnimationFrame(function () { group.show(); });\`

\`hide()\` removes the generated SVG elements synchronously. Calling \`show()\` immediately afterward in the same tick can have the browser coalesce the removal and re-insertion, so the paths appear fully drawn with no animation. Deferring by one frame guarantees the browser registers the removal first, and the strokes draw from zero length again.

## Reusing it

Wrap any phrase in a span with \`data-annot\` and \`data-color\` and it joins the sequence automatically. \`multiline: true\` is already set, so annotations survive text wrapping and reflow correctly on mobile — a wrapped highlight becomes two ink strokes rather than one impossibly wide box. It sits naturally beside a [testimonial card](/ui-snippets/testimonial-card/) as its more opinionated cousin, or a [pull quote](/ui-snippets/pull-quote/) when the emphasis is the whole point.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the rough-notation CDN', text: 'Include the IIFE build from the CDN panel — it exposes a global RoughNotation.' },
      { title: 'Paste HTML, CSS, and JS', text: 'The card renders and annotations draw themselves once it scrolls into view.' },
      { title: 'Watch the sequence', text: 'Each mark waits for the previous one, following document order.' },
      { title: 'Press Replay', text: 'Annotations are cleared and redrawn with fresh randomized wobble.' },
      { title: 'Annotate your own copy', text: 'Wrap a phrase in a span with data-annot and data-color — no JS edits needed.' },
      { title: 'Pick a type', text: 'Use highlight, underline, circle, box, strike-through, or bracket.' },
    ] },
    features: [
      { title: 'Genuinely irregular strokes', text: 'Rough.js path generation, re-randomized on every draw.' },
      { title: 'Markup-driven config', text: 'data-annot and data-color set each phrase from the HTML.' },
      { title: 'Five annotation types', text: 'Highlight, strike-through, circle, underline, and box in one card.' },
      { title: 'Per-type stroke width', text: 'Highlight uses 12 to act as marker ink, pen types use 2.' },
      { title: 'Sequenced playback', text: 'annotationGroup plays marks one after another in document order.' },
      { title: 'Draws on scroll once', text: 'IntersectionObserver at 0.4 with a played guard against retriggering.' },
      { title: 'Frame-deferred replay', text: 'hide() then show() on the next frame so strokes redraw from zero.' },
      { title: 'Wrap-safe', text: 'multiline: true keeps annotations correct across line breaks.' },
    ],
    useCases: [
      { title: 'Marketing testimonials', text: 'Give a [testimonial card](/ui-snippets/testimonial-card/) a more expressive treatment, with key phrases highlighted or circled by hand-drawn strokes that draw themselves on scroll.' },
      { title: 'Landing page emphasis', text: 'Circle the number that matters instead of bolding it, using `data-annot` and `data-color` attributes to configure each phrase from the HTML.' },
      { title: 'Editorial pull quotes', text: 'Add hand-marked stress to a [pull quote](/ui-snippets/pull-quote/), choosing from highlight, strike-through, circle, underline and box types.' },
      { title: 'Docs and tutorials', text: 'Point at the exact term a reader needs to notice, with Rough.js re-randomising every stroke so no two drawings look identical.' },
      { title: 'Onboarding and pricing highlights', text: 'Draw attention to first-run explanations, or box the recommended plan detail on a pricing page, with highlights using a thick marker-style stroke.' },
    ],
    faqs: [
      { q: 'Why does highlight need a different stroke width from the other types?', a: 'A highlight simulates a marker pen, so its stroke has to be wide enough to cover the text x-height — 12 here — and rough-notation places it behind the text so the words stay legible. Every other type is a pen line drawn over the text at width 2. Using 2 for a highlight gives a thin stripe through the middle of the words; using 12 for an underline smears them.' },
      { q: 'How are the annotations configured without touching JavaScript?', a: 'Each annotated phrase carries data-annot and data-color attributes in the markup. The script queries all [data-annot] elements and reads el.dataset.annot and el.dataset.color to build each annotation, so adding or restyling emphasis is a pure copy edit.' },
      { q: 'What does annotationGroup do that calling show() on each would not?', a: 'It plays the annotations in sequence, each waiting for the previous to finish, rather than all at once. Because the array comes from querySelectorAll it is in document order, so the marks appear in the same order a reader meets them.' },
      { q: 'Why does replay wait a frame before showing again?', a: 'hide() removes the generated SVGs synchronously. Calling show() in the same tick lets the browser coalesce the removal and re-insertion, so the paths can appear already drawn with no animation. Deferring the show by one requestAnimationFrame guarantees the removal is registered first and the strokes animate from zero length.' },
      { q: 'Do the annotations survive text wrapping on mobile?', a: 'Yes, because multiline: true is set. A highlight spanning a line break becomes two separate ink strokes rather than one impossibly wide box, and the annotation recalculates against the wrapped geometry.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Render the copy with spans carrying the data attributes, then build the annotations in a mount effect using refs, not during render — the library measures live DOM geometry. Keep the group in a ref, call group.hide() in the cleanup so unmounting removes the SVGs, and rebuild the group if the copy changes. Tailwind styles the card while the annotation logic stays in JS.' },
    ],
    aiPrompt: {
      paragraph: `This snippet's subtleties are all in configuration rather than algorithm, which makes it a good one to interrogate rather than just read. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why strokeWidth is branched on the annotation type — and what a highlight at width 2 and an underline at width 12 would each actually look like. Then ask why the replay handler wraps group.show() in a requestAnimationFrame instead of calling it directly after group.hide(), and reproduce the bug by removing it so you can see the paths appear fully drawn with no animation. For optimization, ask what happens to the annotation geometry when the container resizes after the SVGs are generated, and whether you need to re-run the annotations on a ResizeObserver. To extend it: have it add the sixth type (bracket), stagger the group with a custom delay between marks, randomize the seed so each replay wobbles differently, or drive the annotated phrases from a CMS field so marketing can mark up copy without a deploy. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a testimonial/marketing card whose key phrases get hand-drawn sketchy annotations that draw themselves in sequence, using the rough-notation library from a CDN (IIFE build, global RoughNotation).

Requirements:
- Annotations must be configured entirely from the MARKUP, not hard-coded in JS: wrap each emphasized phrase in a span carrying data-annot (the annotation type) and data-color attributes. The script queries all [data-annot] elements and reads el.dataset to build each annotation, so editing the copy is enough to change the emphasis.
- Demonstrate at least five types across one paragraph: highlight, strike-through, circle, underline, and box.
- Branch the options per type rather than using one uniform config: a highlight needs a very wide strokeWidth (around 12) because it simulates marker ink covering the text x-height and is drawn behind the text, while pen-style types need a thin stroke (around 2) drawn over the text. A box needs more padding than an underline. Add a comment explaining the highlight/behind-the-text distinction.
- Use iterations: 2 so each stroke is drawn over twice with different randomization, mimicking how a person naturally retraces a circle, and multiline: true so annotations remain correct when text wraps on narrow screens.
- Combine all annotations with RoughNotation.annotationGroup() so calling show() plays them one after another in document order, rather than all firing simultaneously.
- Trigger the sequence with an IntersectionObserver at roughly a 0.4 threshold, guarded by a boolean so it plays exactly once and does not restart every time the card re-enters the viewport.
- Add a replay button that calls group.hide() and then group.show() inside a requestAnimationFrame — explain in a comment that calling show() synchronously after hide() can let the browser coalesce the SVG removal and re-insertion, making the strokes appear already drawn instead of animating from zero length.
- Style it as a clean light card: white surface, soft border, generous line-height (around 2) so the annotations have room to breathe, and an author row with an avatar.`,
    },
  },
};

export default roughAnnotationCard;
