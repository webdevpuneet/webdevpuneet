const cssScrollTimelineSectionCounter = {
  id: 'css-scroll-timeline-section-counter',
  title: 'Sticky Section Counter (scroll-timeline)',
  category: 'scroll',
  html: `<div class="stc-page">
  <aside class="stc-counter" aria-hidden="true">
    <span class="stc-num">01</span>
    <span class="stc-total">/ 05</span>
    <div class="stc-track"><div class="stc-fill"></div></div>
  </aside>
  <main class="stc-sections">
    <section class="stc-section" style="--c:#6366f1"><span class="stc-tag">01</span><h2>Discover</h2><p>Users find the product through search, referral, or a shared link — the first ten seconds decide whether they stay.</p></section>
    <section class="stc-section" style="--c:#0891b2"><span class="stc-tag">02</span><h2>Evaluate</h2><p>They compare pricing, features, and reviews across three or four tabs before committing to a trial.</p></section>
    <section class="stc-section" style="--c:#16a34a"><span class="stc-tag">03</span><h2>Onboard</h2><p>A guided first session determines whether the trial converts into daily habitual use.</p></section>
    <section class="stc-section" style="--c:#ea580c"><span class="stc-tag">04</span><h2>Adopt</h2><p>Regular use across the team turns a single seat into a company-wide rollout.</p></section>
    <section class="stc-section" style="--c:#db2777"><span class="stc-tag">05</span><h2>Advocate</h2><p>Satisfied teams refer the product onward, closing the loop back to discovery.</p></section>
  </main>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;color:#eef0f6}

.stc-page{display:flex;max-width:1000px;margin:0 auto}

.stc-counter{
  position:sticky;top:0;height:100vh;width:140px;flex-shrink:0;
  display:flex;flex-direction:column;justify-content:center;gap:8px;padding:0 20px;
}
.stc-num{font-size:64px;font-weight:800;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.stc-num::before{content:counter(sec-count,decimal-leading-zero)}
.stc-counter{counter-reset:sec-count 1;animation:stc-increment steps(4) both;animation-timeline:scroll(root)}
@keyframes stc-increment{
  0%{counter-increment:sec-count 0}
  25%{counter-increment:sec-count 1}
  50%{counter-increment:sec-count 1}
  75%{counter-increment:sec-count 1}
  100%{counter-increment:sec-count 1}
}
.stc-total{font-size:13px;color:#6b7280;font-weight:600}
.stc-track{width:2px;height:120px;background:#1c2230;margin-top:12px;position:relative}
.stc-fill{position:absolute;top:0;left:0;width:100%;height:0%;background:#818cf8;transform-origin:top;animation:stc-fillgrow linear both;animation-timeline:scroll(root)}
@keyframes stc-fillgrow{ to{ height:100% } }

.stc-sections{flex:1;min-width:0}
.stc-section{
  min-height:90vh;display:flex;flex-direction:column;justify-content:center;gap:12px;
  padding:0 32px;border-left:3px solid transparent;
}
.stc-tag{font-size:12px;font-weight:700;color:var(--c);letter-spacing:.08em}
.stc-section h2{font-size:clamp(30px,5vw,48px);letter-spacing:-.02em}
.stc-section p{max-width:440px;color:#a3aab8;font-size:15.5px;line-height:1.75}

@media (max-width:720px){
  .stc-page{flex-direction:column}
  .stc-counter{position:static;height:auto;flex-direction:row;align-items:baseline;padding:20px 24px 0}
  .stc-track{display:none}
}
@supports not (animation-timeline: scroll()){
  .stc-num::before{content:"—"}
  .stc-fill{height:100%;animation:none}
}`,
  js: `// The counter digits and the vertical fill track are both driven by CSS
// animation-timeline: scroll(root) — the counter uses a CSS counter that
// steps once per stc-increment keyframe stop, no JS scroll handling at all.
// This script only reports feature support and section count for the demo.
const supportsScrollTimeline = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');
const total = document.querySelectorAll('.stc-section').length;
document.querySelector('.stc-total').textContent = '/ ' + String(total).padStart(2, '0');
console.log('[section-counter] animation-timeline: scroll() supported:', supportsScrollTimeline, 'sections:', total);`,
  seo: {
    title: 'Sticky Section Counter — Native CSS scroll-timeline',
    description: 'A sticky "01 / 05" section index counter that increments purely from native CSS animation-timeline: scroll() and CSS counters, with no scroll event listener. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Sticky Section Counter — CSS Counters Driven by animation-timeline: scroll()',
      description: `A sticky section counter — the small "02 / 05" indicator pinned beside long-form content on editorial sites and portfolios — normally requires JavaScript: an IntersectionObserver or scroll listener tracking which section is currently in view and writing a number into the DOM. This snippet reproduces the same effect using only \`position: sticky\`, native CSS counters, and \`animation-timeline: scroll(root)\` — the number in the corner is never written by JavaScript at all.

**Sticky positioning does the pinning**

\`.stc-counter\` uses \`position: sticky; top: 0; height: 100vh\`, so it stays pinned in the viewport as \`.stc-sections\` scrolls past beside it — this part is ordinary CSS with no scroll-driven animation involved, the same technique behind [Sticky Sidebar](/ui-snippets/sticky-sidebar/).

**A CSS counter driven by a scroll-bound keyframe animation**

The actual number is a native CSS counter, initialized with \`counter-reset: sec-count 1\` and rendered via \`content: counter(sec-count, decimal-leading-zero)\` on a \`::before\` pseudo-element — this is the same mechanism browsers use for ordered-list numbering. What makes it scroll-driven is that a \`@keyframes\` animation on the counter's own element increments \`counter-increment\` at four evenly-spaced keyframe stops, using \`steps(4)\` as the animation's timing function so each stop is instant rather than eased. Binding that animation to \`animation-timeline: scroll(root)\` means the browser fires each counter-increment step at the corresponding point in the page's total scroll range — 25% of the way down the page, the counter jumps from 01 to 02, and so on.

**Why steps() instead of linear**

A \`linear\` timing function would blend between counter values in a way that makes no visual sense for a whole number — CSS counters do not interpolate fractionally. \`steps(4)\` forces the animation to jump discretely between its four increment stops, so the displayed number is always a clean integer, never a blended or rounded fractional counter value.

**The accompanying fill track**

A slim vertical track beside the number fills from 0% to 100% height using the exact same \`animation-timeline: scroll(root)\` binding, giving a continuous secondary progress cue alongside the discrete counter — similar in spirit to [Scroll Timeline Dots](/ui-snippets/scroll-timeline-dots/) but rendered as a single continuous bar instead of individual dot markers.

**A structural limitation worth knowing**

Because the counter increments are spaced evenly across the total scroll range (25%, 50%, 75%, 100%), this technique assumes all five sections are roughly equal height. If sections vary dramatically in length, the counter will drift out of sync with which section is actually centered in the viewport — an IntersectionObserver-based counter tracks the DOM directly and does not have this limitation, at the cost of requiring JavaScript.

**Browser support**

Chromium-based browsers (Chrome, Edge, Opera, Brave) support \`animation-timeline: scroll()\` today. Firefox and Safari support is still landing, so an \`@supports not (animation-timeline: scroll())\` block swaps the counter for a static em dash and fills the track completely rather than leaving it stuck at 01.

**Customizing it**

Adjust the keyframe percentages in \`stc-increment\` to match your actual section proportions, add more \`counter-increment\` stops for additional sections, or swap the \`decimal-leading-zero\` counter style for \`upper-roman\` or a custom \`@counter-style\` for a different numeral system. Pair it with [Scroll Spy Nav](/ui-snippets/scroll-spy-nav/) for a version that also highlights the matching nav link.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A sticky counter beside five full-height sections renders immediately.` },
      { title: 'Scroll through the sections', text: `Watch the counter step from 01 to 05 and the vertical track fill as you pass each section boundary.` },
      { title: 'Match your real section count', text: `Update counter-reset and add or remove counter-increment stops in @keyframes stc-increment to match your section count.` },
      { title: 'Align stops to uneven sections', text: `If sections vary in height, adjust the keyframe percentages so each stop lands where that section actually begins.` },
      { title: 'Change the numeral style', text: `Swap decimal-leading-zero in the counter() function for upper-roman, or define a custom @counter-style.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'Native CSS counter (counter-reset / counter-increment / content: counter()) — not a JS-written number',
      'steps(4) timing function forces clean, discrete integer jumps, never fractional blending',
      'animation-timeline: scroll(root) drives both the counter and the vertical fill track',
      'position: sticky keeps the whole counter pinned during the section scroll',
      'Zero JavaScript scroll or intersection handling for the number itself',
      'Responsive fallback collapses to a horizontal, non-sticky layout on narrow viewports',
      '@supports fallback shows a static dash instead of a counter frozen at 01',
      'Easily restyled with a custom @counter-style for roman numerals or letters',
    ],
    useCases: [
      { icon: 'APP', title: 'Editorial and long-form storytelling pages', desc: 'Pair with a [Scroll Company Timeline](/ui-snippets/scroll-company-timeline/) or narrative sequence so readers always know which chapter they are in.' },
      { icon: 'DESIGN', title: 'Portfolio case-study pages', desc: 'Number each project phase and keep the count visible without a JS scroll listener.' },
      { icon: 'LEARN', title: 'Learn CSS counters plus scroll-timeline', desc: 'A focused demo of combining native CSS counters with animation-timeline for a non-obvious effect pairing.' },
      { icon: 'FLOW', title: 'Multi-step explainer or how-it-works sections', desc: 'Show progress through a fixed sequence of steps as the reader scrolls, similar in spirit to [Scroll Pin Steps](/ui-snippets/scroll-pin-steps/).' },
      { icon: 'CODE', title: 'Replace an IntersectionObserver section tracker', desc: 'Removes the need for scroll-listener-based active-section tracking when sections are roughly equal height.' },
      { icon: 'CODE', title: 'Related: Scroll Timeline Dots', desc: 'See the [Scroll Timeline Dots](/ui-snippets/scroll-timeline-dots/) for a related native scroll-timeline milestone-marker pattern.' },
      { icon: 'CODE', title: 'Related: Heading Underline Fill (view-timeline)', desc: 'See the [Heading Underline Fill (view-timeline)](/ui-snippets/css-view-timeline-underline-progress/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does a CSS counter update without JavaScript?', a: `The counter is initialized with counter-reset: sec-count 1 and displayed via content: counter(sec-count, decimal-leading-zero) on a pseudo-element — a native CSS feature normally used for ordered-list numbering. A @keyframes animation increments counter-increment at fixed percentage stops, and binding that animation to animation-timeline: scroll(root) ties those stops to specific points in the page's scroll range instead of to elapsed time.` },
      { q: 'Why does the animation use steps(4) instead of a linear or eased timing function?', a: `CSS counters hold whole numbers and cannot interpolate fractionally between them. steps(4) forces the animation to jump discretely between its four increment stops rather than trying to blend, keeping the displayed number always a clean integer.` },
      { q: 'What happens if my sections have very different heights?', a: `Because the keyframe stops are spaced evenly across the total scroll range (every 25%), the counter assumes roughly equal-height sections. If your sections vary a lot, either adjust each keyframe percentage to match your actual section proportions, or fall back to an IntersectionObserver-based counter that reads the DOM directly and is unaffected by uneven heights.` },
      { q: 'Does the counter decrement correctly when scrolling back up?', a: `Yes. Because the animation is bound to a live scroll(root) timeline rather than triggered once, scrolling back up moves the animation's playback position backward and the counter-increment steps apply in reverse, decrementing the displayed number as expected.` },
      { q: 'What happens in browsers without animation-timeline support?', a: `The @supports not (animation-timeline: scroll()) block replaces the counter's content with a static em dash and fills the track fully, so Firefox and Safari users see a stable placeholder rather than a counter stuck at 01 or a track stuck empty.` },
      { q: 'Can I add more than five sections?', a: `Yes. Increase counter-reset's implicit total sections by adding matching entries to @keyframes stc-increment (for example a stop at every 1/N of 100% for N sections) and update the JS-driven "/ 05" total text, which is computed automatically from the number of .stc-section elements in the DOM.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the counter-increment keyframe math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why steps(4) is required instead of a linear timing function for a CSS counter animation, and how animation-timeline: scroll(root) maps the keyframe percentage stops onto specific points in the page's total scroll distance. The same assistant is useful for extending the effect: ask it to generate the correct keyframe percentages automatically for sections of very different heights, add a name label beside the number that also swaps per section (driven by the same counter), or combine this counter with a scroll-spy nav that highlights the matching link. It's also worth asking whether an IntersectionObserver fallback would be worth adding for pages where section heights vary too much for the even-spacing assumption to hold. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a sticky "01 / 05" section index counter pinned beside a vertically scrolling list of full-height sections, where the number increments purely from native CSS — a CSS counter driven by animation-timeline: scroll(root) — with no JavaScript scroll or intersection handling for the counter value itself.

Requirements:
- A two-column layout: a sticky counter panel (position: sticky, pinned for the full viewport height) beside a scrollable column of several full-height section elements, each with a heading and short paragraph.
- The counter's number must be rendered via a native CSS counter (counter-reset and counter-increment) displayed through content: counter(name, decimal-leading-zero) on a pseudo-element — not written into the DOM by JavaScript.
- Define a @keyframes animation on the counter element that increments counter-increment at evenly spaced percentage stops matching the number of sections, using a steps() timing function (not linear or eased) so the counter jumps discretely between whole numbers instead of trying to interpolate fractionally.
- Bind that keyframe animation via animation-timeline: scroll(root) so its stops correspond to how far the user has scrolled through the whole page, not to elapsed time.
- Add a slim vertical progress track beside the counter that fills from 0% to 100% height using the same animation-timeline: scroll(root) binding, as a continuous complement to the discrete counter.
- Add an @supports not (animation-timeline: scroll()) fallback that shows a static placeholder character instead of the counter and a fully filled track, rather than leaving either stuck at its initial state.
- Keep any JavaScript limited to computing the total section count for a "/ 05" label and a one-time feature-support check — it must never drive the counter or track itself.`,
    },
  },
};

export default cssScrollTimelineSectionCounter;
