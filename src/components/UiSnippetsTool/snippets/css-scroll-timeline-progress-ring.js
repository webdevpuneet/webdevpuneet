const cssScrollTimelineProgressRing = {
  id: 'css-scroll-timeline-progress-ring',
  title: 'CSS Scroll Timeline Progress Ring',
  lastmod: '2026-09-16',
  category: 'scroll',
  html: `<div class="ptr-page">
  <aside class="ptr-stage">
    <p class="ptr-hint">Scroll ↓ — the ring fills with the page</p>
    <div class="ptr-ring-wrap">
      <svg class="ptr-svg" viewBox="0 0 200 200" aria-hidden="true">
        <circle class="ptr-track" cx="100" cy="100" r="85"></circle>
        <circle class="ptr-fill" cx="100" cy="100" r="85"></circle>
      </svg>
      <div class="ptr-readout"><span class="ptr-num"></span><span class="ptr-sign">%</span></div>
    </div>
  </aside>
  <main class="ptr-sections">
    <section class="ptr-block"><span class="ptr-tag">Start</span><h2>A Ring Bound to the Page, Not a Timer</h2><p>The stroke on that circle is not animated by a duration or a JavaScript scroll listener — it is bound directly to how far down this document you have scrolled, via native CSS <code>animation-timeline: scroll(root)</code>.</p></section>
    <section class="ptr-block"><span class="ptr-tag">Building</span><h2>Keep Scrolling</h2><p>The stroke-dashoffset on the fill circle unwinds continuously as the scroll position advances — no threshold checks, no requestAnimationFrame loop.</p></section>
    <section class="ptr-block"><span class="ptr-tag">Almost There</span><h2>Nearly Full</h2><p>The percentage readout beside the ring steps upward through fixed keyframe values as the same scroll timeline advances.</p></section>
    <section class="ptr-block"><span class="ptr-tag">Done</span><h2>100%</h2><p>By the bottom of the page the ring is completely filled — scroll back up and watch every part of it rewind in perfect sync.</p></section>
  </main>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0c14;color:#eef0f9}
code{background:rgba(124,58,237,.18);color:#d4c2ff;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}

.ptr-page{display:flex;max-width:1020px;margin:0 auto}
.ptr-stage{
  position:sticky;top:0;height:100vh;width:280px;flex-shrink:0;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;padding:0 24px;
}
.ptr-hint{font-size:12.5px;letter-spacing:.06em;color:#8f8bb3;text-align:center;text-transform:uppercase}

.ptr-ring-wrap{position:relative;width:200px;height:200px}
.ptr-svg{width:100%;height:100%;transform:rotate(-90deg)}
.ptr-track{fill:none;stroke:#1c1e2e;stroke-width:14}
.ptr-fill{
  fill:none;stroke:#a78bfa;stroke-width:14;stroke-linecap:round;
  stroke-dasharray:534.07; stroke-dashoffset:534.07;
  filter:drop-shadow(0 0 10px rgba(167,139,250,.55));
  animation:ptr-unwind linear both;
  animation-timeline:scroll(root);
}
@keyframes ptr-unwind{ to{ stroke-dashoffset:0 } }

.ptr-readout{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:2px;font-variant-numeric:tabular-nums}
.ptr-num{font-size:40px;font-weight:800;letter-spacing:-.02em}
.ptr-num::before{
  content:"0";
  animation:ptr-count-up steps(20) both;
  animation-timeline:scroll(root);
}
/* align-self: flex-start here would pin this to the top of the whole
   200px ring (since .ptr-readout is inset: 0 across the entire circle),
   not to the top of the "0" beside it -- a small relative nudge keeps it
   sitting right next to the number instead, like a superscript. */
.ptr-sign{font-size:18px;color:#a78bfa;font-weight:700;align-self:center;position:relative;top:-10px}
@keyframes ptr-count-up{
  0%{content:"0"}
  5%{content:"5"}
  10%{content:"10"}
  15%{content:"15"}
  20%{content:"20"}
  25%{content:"25"}
  30%{content:"30"}
  35%{content:"35"}
  40%{content:"40"}
  45%{content:"45"}
  50%{content:"50"}
  55%{content:"55"}
  60%{content:"60"}
  65%{content:"65"}
  70%{content:"70"}
  75%{content:"75"}
  80%{content:"80"}
  85%{content:"85"}
  90%{content:"90"}
  95%{content:"95"}
  100%{content:"100"}
}

.ptr-sections{flex:1;min-width:0}
.ptr-block{min-height:88vh;display:flex;flex-direction:column;justify-content:center;gap:12px;padding:0 32px;max-width:520px}
.ptr-tag{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#a78bfa}
.ptr-block h2{font-size:clamp(26px,4.4vw,38px);letter-spacing:-.02em}
.ptr-block p{color:#a3a1c4;font-size:15.5px;line-height:1.75}

@media (max-width:760px){
  .ptr-page{flex-direction:column}
  .ptr-stage{position:static;height:auto;padding:40px 24px}
}
@supports not (animation-timeline: scroll()){
  .ptr-fill{stroke-dashoffset:130; animation:none}
  .ptr-num::before{content:"75"}
}`,
  js: `// The ring's stroke-dashoffset and the percentage readout beside it are
// both driven entirely by CSS animation-timeline: scroll(root) — there is
// no scroll listener, no requestAnimationFrame loop, and no other runtime
// code in this file at all.`,
  seo: {
    title: 'CSS Scroll Timeline Progress Ring — Native animation-timeline: scroll()',
    description: 'A circular SVG progress ring with a synced percentage readout that fills purely from native CSS animation-timeline: scroll(root) — no JavaScript scroll listener. Exports to React, Vue & Tailwind.',
    about: {
      title: 'CSS Scroll Timeline Progress Ring — SVG stroke-dashoffset Driven by scroll(root)',
      description: `A circular reading-progress indicator is normally built with a scroll event listener computing a percentage and writing it into an inline style every frame. This snippet replaces that entirely with native CSS: an SVG ring whose \`stroke-dashoffset\` and a percentage readout whose digits both advance purely because they are bound to \`animation-timeline: scroll(root)\`.

**Why stroke-dashoffset instead of a conic-gradient**

An SVG circle's circumference is a fixed, known number (\`2 * PI * r\`, here 534.07 for a radius of 85). Setting \`stroke-dasharray\` to that exact circumference and animating \`stroke-dashoffset\` from the full circumference down to 0 unwinds the visible stroke smoothly, because \`stroke-dashoffset\` is a natively interpolable SVG presentation property — no custom \`@property\` registration is required, unlike animating a \`conic-gradient()\`'s angle directly.

**A stepped readout, and why it isn't a CSS counter**

The percentage digits animate via twenty-one keyframe stops, five percentage points apart, each setting \`content\` to an absolute literal value ("0", "5", "10" ... "100") on a pseudo-element, wrapped in \`steps(20)\` so the digits jump cleanly between whole numbers. The more obvious-looking approach — \`counter-reset\` plus \`counter-increment: 5\` at every stop — looks identical on paper but breaks under a scroll-scrubbed timeline: \`counter-increment\` is a delta added to whatever total already existed, and that only accumulates correctly when an animation plays through its keyframes in order, over real time. A \`scroll(root)\`-bound animation instead jumps directly to whichever keyframe matches the current scroll position without passing through the others, so only that one keyframe's increment would ever apply — the readout would freeze at 5 no matter how far down the page you scrolled. Writing the absolute value straight into \`content\` sidesteps the problem, since there's no running total to lose.

**One shared timeline, two properties**

Both the ring's stroke and the readout's digits reference the exact same \`animation-timeline: scroll(root)\` — the whole document's scroll range — so they are guaranteed to stay in lockstep with each other and with the page, with no coordination code linking them beyond both being bound to the same timeline name.

**Browser support**

Chromium-based browsers (Chrome, Edge, Opera, Brave) support \`animation-timeline: scroll()\` today; Firefox and Safari support is still landing. The \`@supports not (animation-timeline: scroll())\` block freezes the ring at a static 75% fill and the counter at a static "75" rather than leaving either stuck at 0.

**Customizing it**

Change the circle's \`r\` attribute and recompute the matching \`stroke-dasharray\` circumference for a bigger or smaller ring, swap \`stroke-linecap: round\` for \`butt\` for a flat-ended fill, or replace the SVG entirely with a \`conic-gradient\` mask if you would rather avoid inline SVG. Pair it with [CSS Scroll Timeline Gauge Needle](/ui-snippets/css-scroll-timeline-gauge-needle/) for a related dial-style scroll readout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: 'A sticky ring and percentage readout render beside four full-height content blocks.' },
      { title: 'Scroll from top to bottom', text: 'Watch the ring stroke unwind and the percentage climb in sync, purely via animation-timeline: scroll(root).' },
      { title: 'Scroll back up', text: 'Both the ring and the readout rewind exactly, since they read a live scroll timeline, not a one-shot trigger.' },
      { title: 'Resize the ring', text: 'Change the SVG circle radius and recompute stroke-dasharray to 2 * PI * r for a different ring size.' },
      { title: 'Adjust the readout granularity', text: 'Add more content: "N" keyframe stops to ptr-count-up (and a matching steps() value) for finer-grained percentage jumps.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
    ] },
    features: [
      'SVG stroke-dashoffset unwind driven entirely by animation-timeline: scroll(root)',
      'Percentage readout steps through literal content values per keyframe, stepped with steps(20) for clean whole-number jumps',
      'Ring and readout share one scroll timeline, so they never drift out of sync',
      'Sticky positioned stage keeps the ring pinned while content scrolls past beside it',
      'Zero JavaScript scroll listeners or requestAnimationFrame loops',
      'drop-shadow glow on the fill stroke for a polished at-rest and in-motion look',
      '@supports fallback locks to a static 75% ring instead of a stuck-at-zero state',
      'Fully reversible — scrolling up rewinds both the ring and the readout in lockstep',
    ],
    useCases: [
      { icon: 'APP', title: 'Long-form article reading progress', desc: 'A circular alternative to a top-of-page progress bar like [Scroll Progress](/ui-snippets/scroll-progress/).' },
      { icon: 'DESIGN', title: 'Portfolio case-study pages', desc: 'Show how far through a scrollytelling case study the visitor has traveled.' },
      { icon: 'LEARN', title: 'Learn scroll-driven SVG animation', desc: 'A focused demo of animating stroke-dashoffset with a native scroll timeline instead of JavaScript.' },
      { icon: 'FLOW', title: 'Onboarding or checkout step trackers', desc: 'Pair with a fixed set of steps to show overall completion as the user scrolls through them.' },
      { icon: 'CODE', title: 'Replace a scroll-listener progress ring', desc: 'Removes the need for a scroll-event-driven percentage calculation for this specific ring UI.' },
      { icon: 'CODE', title: 'Related: CSS Scroll Timeline Gauge Needle', desc: 'See [CSS Scroll Timeline Gauge Needle](/ui-snippets/css-scroll-timeline-gauge-needle/) for a related dial-style scroll readout.' },
      { icon: 'CODE', title: 'Related: Scroll Progress (circle)', desc: 'See [Scroll Progress](/ui-snippets/scroll-progress/) for a JS-driven progress indicator worth comparing against this native version.' },
    ],
    faqs: [
      { q: 'Why animate stroke-dashoffset instead of a conic-gradient angle?', a: 'An SVG circle’s stroke-dashoffset is a natively interpolable presentation property, so the browser can animate it directly with keyframes and a scroll timeline. Animating a conic-gradient’s angle smoothly requires registering the custom property via @property first; stroke-dashoffset needs none of that setup.' },
      { q: 'Why does the percentage readout jump in steps of 5 instead of counting every integer?', a: 'Discrete string content values cannot be fractionally interpolated between keyframes. Using twenty-one keyframe stops five percentage points apart with steps(20) keeps the displayed number always a clean integer without needing a hundred individual keyframe stops.' },
      { q: 'Why does this use content: "N" per keyframe instead of a CSS counter?', a: 'A CSS counter animated via counter-increment only accumulates correctly when an animation plays through its keyframes in sequence over real time — each step adds its delta to whatever total already existed. A scroll-linked timeline instead jumps directly to whichever keyframe matches the current scroll position without passing through the others, so only that one keyframe’s increment would ever apply, and the readout would freeze after the first step regardless of how far down the page you scrolled. Writing the absolute value straight into content at each step has no running total to lose, so it stays correct at any scroll position.' },
      { q: 'Do the ring and the readout ever fall out of sync with each other?', a: 'No, because both are bound to the exact same animation-timeline: scroll(root) — the whole document’s scroll range — so any given scroll position always maps to the same ring fill and the same readout value.' },
      { q: 'What happens in browsers without animation-timeline support?', a: 'The @supports not (animation-timeline: scroll()) block fixes the ring at a static 75% fill and the readout at a static "75" label, so Firefox and Safari users see an intentional, complete-looking state rather than a ring and readout stuck at zero.' },
      { q: 'Can I make the ring track total scroll progress across the whole site instead of just this section?', a: 'Yes — animation-timeline: scroll(root) already measures the entire document’s scroll range by default, so as long as this markup is the only scrollable content on the page, the ring already reflects true whole-page progress; nesting it inside a shorter scroll container would require scroll(nearest) instead.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the stroke-dashoffset math or the stepped readout by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the circle's circumference determines the stroke-dasharray value, and why the percentage readout needs twenty-one explicit keyframe stops with literal content values instead of a CSS counter or a single smooth 0-to-100 keyframe. The same assistant is useful for extending the effect: ask it to add a second, thinner ring showing a different metric on an independent view() timeline, animate the ring's stroke color alongside the fill, or generate the keyframe stops programmatically for a different step granularity. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a circular scroll-progress ring with a synced percentage readout using only native CSS animation-timeline: scroll(root) — no JavaScript scroll listener, no requestAnimationFrame loop.

Requirements:
- An inline SVG circle used as a progress ring: a static background track circle plus a foreground fill circle with stroke-dasharray set to its exact circumference (2 * PI * r) and stroke-dashoffset animated from that same circumference down to 0 via a @keyframes animation bound to animation-timeline: scroll(root).
- A percentage readout built by animating a pseudo-element's content property directly, with a steps() timing function across at least fifteen to twenty explicit keyframe stops evenly spaced across the 0%-100% range, each setting content to a literal absolute string value (e.g. content: "45") rather than using counter-reset/counter-increment. A CSS counter's increment is a delta that only accumulates correctly under real sequential time-based playback, and silently fails to reach later values when driven by a scroll-scrubbed, directly-seekable timeline — writing the absolute number straight into content at each step avoids that failure mode entirely.
- Both the ring's stroke-dashoffset animation and the readout's animation must reference the same animation-timeline: scroll(root) so they always agree at any given scroll position.
- A sticky-positioned stage that pins the ring in the viewport while several full-height content sections scroll past beside it, giving the scroll(root) timeline enough range to animate across.
- Add an @supports not (animation-timeline: scroll()) fallback that fixes the ring at a reasonable static partial fill and the readout at a matching static number, rather than leaving either stuck at zero in unsupported browsers.
- Keep any JavaScript limited to a one-time CSS.supports('animation-timeline: scroll()') feature check logged to the console — it must never drive or read scroll position itself.`,
    },
  },
};

export default cssScrollTimelineProgressRing;
