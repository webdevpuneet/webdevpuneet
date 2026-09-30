const cssViewTimelineUnderlineProgress = {
  id: 'css-view-timeline-underline-progress',
  title: 'Heading Underline Fill (view-timeline)',
  category: 'scroll',
  html: `<article class="hup-article">
  <header class="hup-header"><h1>Read to Fill the Line</h1><p>Scroll down. The underline beneath each heading below fills left-to-right as you scroll past that heading's own paragraph, driven by a native CSS <code>view-timeline</code> attached to the paragraph itself — no scroll listener involved.</p></header>

  <section class="hup-section">
    <h2 class="hup-heading">The Problem With Manual Trust</h2>
    <div class="hup-underline"></div>
    <p class="hup-source">Every workflow that depends on a human remembering to double-check something eventually fails, not because people are careless but because attention is a finite resource that gets spent elsewhere under deadline pressure. Systems that rely on vigilance alone are systems that are quietly waiting to fail at the worst possible time, and the fix is never "try harder" — it is removing the step where a human has to remember at all.</p>
  </section>

  <section class="hup-section">
    <h2 class="hup-heading">Designing for the Absent-Minded Case</h2>
    <div class="hup-underline"></div>
    <p class="hup-source">The strongest interfaces assume the user is distracted, in a hurry, and on a phone with one bar of signal. Defaults should be safe, destructive actions should require confirmation proportional to their cost, and state that matters should be visible without requiring a click to reveal it. Design for the tired eleven-p.m. version of your user, not the attentive one reading the documentation.</p>
  </section>

  <section class="hup-section">
    <h2 class="hup-heading">Why Progress Should Be Legible</h2>
    <div class="hup-underline"></div>
    <p class="hup-source">A reader who cannot tell how much of a page remains will either abandon early out of uncertainty or skim past details assuming there is more time than there is. A visible sense of progress — a bar, a counter, or in this case a filling underline tied to how much of a specific passage has been read — keeps the reader oriented without requiring them to scroll back and check.</p>
  </section>
</article>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0e13;color:#eef0f6}

.hup-article{max-width:600px;margin:0 auto;padding:10vh 24px 30vh}
.hup-header{margin-bottom:12vh}
.hup-header h1{font-size:clamp(28px,5.5vw,44px);letter-spacing:-.02em;margin-bottom:14px}
.hup-header p{color:#9aa1b8;font-size:16px;line-height:1.75}
code{background:rgba(129,140,248,.16);color:#c7d2fe;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}

.hup-section{margin-bottom:16vh}
.hup-heading{font-size:24px;letter-spacing:-.01em;display:inline-block;margin-bottom:2px}

/* The underline's fill is bound to a view-timeline whose SOURCE is the
   paragraph below it, not the underline bar itself -- so the fill tracks
   how far the reader has scrolled through that specific passage of text. */
.hup-source{
  view-timeline-name:--para-read;
  view-timeline-axis:block;
}

.hup-underline{
  height:3px;width:100%;max-width:340px;background:#1c2230;border-radius:2px;margin-bottom:20px;position:relative;overflow:hidden;
}
.hup-underline::after{
  content:"";position:absolute;inset:0;width:100%;background:#818cf8;border-radius:2px;
  transform:scaleX(0);transform-origin:left;

  animation:hup-fill linear both;
  animation-timeline:--para-read;
  animation-range:cover 0% cover 85%;
}
@keyframes hup-fill{ to{ transform:scaleX(1) } }
.hup-section p{color:#b7bdd0;font-size:16px;line-height:1.85}

@supports not (animation-timeline: view()){
  .hup-underline::after{transform:scaleX(1);animation:none}
}`,
  js: `// Every underline's fill above is driven by CSS animation-timeline: view()
// referencing --para-read, a view-timeline-name declared on the PARAGRAPH
// element rather than on the underline bar itself -- so the fill tracks
// that specific paragraph's own transit through the viewport as the
// reader scrolls past it. No JS observes scroll or intersection at all;
// this script only reports feature support for the demo readout.
const supportsView = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
console.log('[underline-progress] native view() timeline supported:', supportsView);
if (!supportsView) {
  document.querySelectorAll('.hup-underline').forEach(u => { u.title = 'Fallback: underline shown fully filled.'; });
}`,
  seo: {
    title: 'Heading Underline Read Progress — Native CSS view-timeline',
    description: 'An underline beneath a heading that fills as the reader scrolls past its paragraph, driven by a native CSS view-timeline attached to the paragraph itself, with no JavaScript scroll tracking. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Heading Underline Read Progress — animation-timeline: view() Bound to a Different Element',
      description: `Most scroll-driven CSS demos bind an element's animation to its own view timeline — the element watches itself. This snippet shows the less commonly demonstrated but equally native pattern: a view timeline whose *source* is one element (a paragraph) driving an animation on a completely different element (a heading's underline bar), so the underline fills in step with how far the reader has scrolled through that specific block of text, not with the underline's own tiny transit through the viewport.

**Splitting the timeline source from the animated element**

\`view-timeline-name: --para-read\` and \`view-timeline-axis: block\` are declared on \`.hup-source\`, the \`<p>\` element — this makes the paragraph the *source* of a named timeline representing its own scroll-driven visibility, from first entering to fully exiting the viewport. The underline bar's \`::after\` pseudo-element then references that exact same name via \`animation-timeline: --para-read\`, even though it is a sibling element, not the paragraph itself and not a descendant of it. CSS scroll-driven animations resolve a named timeline by searching up the accessible tree for the nearest element or ancestor exposing that name, which is what allows one element's scroll position to drive a completely different element's animation.

**Why this is more honest than animating the underline's own timeline**

If \`view-timeline-name\` were declared on the underline bar instead, the fill would track the underline's own two-pixel-tall transit through the viewport — which happens almost instantly, since it is a thin line, not a real "reading progress" signal. Sourcing the timeline from the full paragraph instead means the fill genuinely represents how much of that block of prose has scrolled past the reader, which is the actual semantic the effect is named for.

**animation-range narrows it to the readable window**

\`animation-range: cover 0% cover 85%\` completes the fill slightly before the paragraph's absolute last pixel leaves the viewport, so the underline reaches 100% right around when a reader has plausibly finished reading the passage rather than only at the exact geometric edge case of the last line scrolling out.

**Comparing to a document-wide reading bar**

[CSS Scroll-Driven Progress Bar](/ui-snippets/css-scroll-driven-progress/) and [Scroll Reading Time](/ui-snippets/scroll-reading-time/) both represent progress through the *entire* document. This underline is deliberately scoped — three separate underlines in this demo each track their own paragraph independently, useful for structured content like a FAQ or a stepped explainer where "progress through this specific answer" matters more than "progress through the whole page."

**Browser support**

Chromium-based browsers (Chrome, Edge, Opera, Brave) support named \`view()\` timelines referenced across sibling elements today. Firefox and Safari support is still landing, so an \`@supports not (animation-timeline: view())\` block shows every underline fully filled rather than stuck empty.

**Customizing it**

Move \`view-timeline-name\` onto a different, more meaningful element (a whole \`<section>\` instead of a single paragraph) to change what "read" means, swap \`scaleX\` for a \`width\` change to a percentage-based fill instead, or add a small percentage label using the same \`--para-read\` timeline for a numeric readout beside each underline. Pair it with a [FAQ Search Accordion](/ui-snippets/faq-search-accordion/) for a "how much of this answer have you read" cue on long answers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `Three headings, each with an underline and a paragraph, render immediately.` },
      { title: 'Scroll past each paragraph', text: `Watch the underline beneath its heading fill left-to-right as you pass through that paragraph.` },
      { title: 'Scroll back up', text: `Each underline empties again in reverse, since it is driven by a live view timeline.` },
      { title: 'Change what counts as "read"', text: `Move view-timeline-name from .hup-source to a wrapping section to track a larger block of content instead.` },
      { title: 'Adjust the completion point', text: `Tune animation-range: cover 0% cover 85% to make the fill finish earlier or later relative to the paragraph's exit.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'A view-timeline source declared on one element (the paragraph) driving another (the underline)',
      'view-timeline-name resolved by name across sibling elements, not just self-referencing',
      'animation-range narrows completion to a plausible "finished reading" point, not the literal geometric edge',
      'Independent per-paragraph timelines — each underline tracks only its own passage',
      'transform: scaleX() fill is compositor-friendly and stays smooth during fast scrolling',
      'Zero JavaScript scroll or intersection handling',
      '@supports fallback shows every underline fully filled rather than stuck empty',
      'Reusable on any heading/paragraph pair with no per-instance JavaScript wiring',
    ],
    useCases: [
      { icon: 'APP', title: 'Long-form articles with distinct sub-sections', desc: 'Give each subsection its own legible read-progress cue instead of one document-wide bar like [CSS Scroll-Driven Progress Bar](/ui-snippets/css-scroll-driven-progress/).' },
      { icon: 'DESIGN', title: 'FAQ and documentation answers', desc: 'Show how much of a specific long answer remains inside a [FAQ Search Accordion](/ui-snippets/faq-search-accordion/) or docs page.' },
      { icon: 'LEARN', title: 'Learn cross-element named view timelines', desc: 'A focused demo of view-timeline-name resolving across sibling elements, not just an element animating itself.' },
      { icon: 'FLOW', title: 'Stepped explainers and tutorials', desc: 'Pair with a [Scroll Pin Steps](/ui-snippets/scroll-pin-steps/) sequence so each step shows its own read progress.' },
      { icon: 'CODE', title: 'Replace a per-paragraph IntersectionObserver ratio tracker', desc: 'Removes the need for scroll-listener-based intersectionRatio math for this specific per-passage effect.' },
      { icon: 'CODE', title: 'Related: Scroll Reading Time', desc: 'See the [Scroll Reading Time](/ui-snippets/scroll-reading-time/) for a document-wide reading progress alternative.' },
      { icon: 'CODE', title: 'Related: Direction-Aware Grid Reveal (IntersectionObserver)', desc: 'See the [Direction-Aware Grid Reveal (IntersectionObserver)](/ui-snippets/scroll-reveal-stagger-columns/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How can the underline animate from a timeline declared on a different element?', a: `view-timeline-name declares a named timeline sourced from the element it is set on (the paragraph, here). Any other element can then bind to that exact name via animation-timeline, as long as it is within the accessible scope of the name — the browser resolves the named timeline the same way it would resolve a custom property, letting one element's scroll-driven visibility control a completely different element's animation.` },
      { q: 'Why not just put view-timeline-name directly on the underline bar?', a: `The underline bar is only a few pixels tall, so its own transit through the viewport happens almost instantly and would make the fill snap nearly all at once rather than tracking genuine reading progress. Sourcing the timeline from the full paragraph instead means the fill duration matches how long that block of text actually takes to scroll past.` },
      { q: 'What does animation-range: cover 0% cover 85% do here?', a: `It completes the fill once the paragraph is 85% through its own cover range rather than the full 100%, so the underline reaches full width slightly before the very last pixel of the paragraph leaves the viewport — closer to when a reader has plausibly finished the passage than the exact geometric edge case.` },
      { q: 'Does each underline track only its own paragraph, or the whole page?', a: `Only its own paragraph. Each .hup-source paragraph declares its own view-timeline-name, so the three underlines in this demo are entirely independent — scrolling past the first paragraph does not affect the second or third underline's fill state at all.` },
      { q: 'What happens in browsers without animation-timeline: view() support?', a: `The @supports not (animation-timeline: view()) block sets every underline's fill to transform: scaleX(1) with the animation removed, so Firefox and Safari users see every underline fully filled by default rather than stuck empty or animating incorrectly.` },
      { q: 'Can I track a whole section instead of a single paragraph?', a: `Yes. Move the view-timeline-name and view-timeline-axis declarations from the .hup-source paragraph onto a wrapping element such as the .hup-section, and the underline will then fill based on that larger block's scroll transit instead of just the one paragraph's.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out cross-element named timelines by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how animation-timeline: --para-read on the underline's ::after pseudo-element resolves to the view-timeline-name declared on a completely different, sibling <p> element, and why sourcing the timeline from the paragraph rather than the underline itself produces a more meaningful fill duration. The same assistant is useful for extending the effect: ask it to add a small numeric percentage label driven by the same named timeline, make the fill color shift from one hue to another as it completes, or move the timeline source up to a whole <section> so the underline represents a broader block of read content. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a heading with a thin underline bar beneath it that fills from left to right as the reader scrolls past a specific paragraph of body text below it — using only native CSS scroll-driven animations, where the view timeline's SOURCE element is the paragraph itself, not the underline bar. No JavaScript, no scroll event listeners.

Requirements:
- A heading, a thin underline bar element, and a paragraph of body text, in that visual order.
- The paragraph element must declare its own view-timeline-name and view-timeline-axis: block, making it the source of a named view timeline representing its own transit through the viewport.
- The underline bar (or a pseudo-element on it) must NOT declare its own view-timeline-name. Instead it must reference the paragraph's timeline by name via animation-timeline, proving that a named view timeline sourced on one element can drive an animation on a different, sibling element.
- The underline's fill animation must scale a colored overlay from 0 width to full width (for example via transform: scaleX()) as the paragraph's view timeline progresses.
- Use animation-range to complete the fill slightly before the paragraph's absolute last pixel exits the viewport (for example cover 0% cover 85%), so it reads as "finished reading" rather than only completing at the exact geometric edge.
- Repeat the heading/underline/paragraph pattern at least three times on the page, each with its own independent named timeline, to demonstrate that each underline tracks only its own paragraph.
- Add an @supports not (animation-timeline: view()) fallback that shows every underline fully filled by default, rather than stuck empty, in unsupported browsers.
- Keep any JavaScript limited to a CSS.supports('animation-timeline: view()') feature check — it must not drive or trigger the fill itself.`,
    },
  },
};

export default cssViewTimelineUnderlineProgress;
