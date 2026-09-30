const scrollamaStorySteps = {
  id: 'scrollama-story-steps',
  title: 'Scrollama Scrollytelling',
  lastmod: '2026-08-02',
  category: 'scroll',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/scrollama@3.2.0/build/scrollama.min.js'],
  html: `<header class="sss-intro">
  <span class="sss-tag">scrollama · intersection observer</span>
  <h1>How a request becomes a page</h1>
  <p>Scroll — the diagram on the left stays pinned while each step explains itself.</p>
  <span class="sss-cue">↓</span>
</header>

<section class="sss-scrolly">
  <figure class="sss-sticky">
    <div class="sss-diagram">
      <div class="sss-node n1" data-node="0"><b>Browser</b><small>Request</small></div>
      <div class="sss-node n2" data-node="1"><b>Edge</b><small>Cache</small></div>
      <div class="sss-node n3" data-node="2"><b>Server</b><small>Render</small></div>
      <div class="sss-node n4" data-node="3"><b>Client</b><small>Hydrate</small></div>
      <svg class="sss-wires" viewBox="0 0 100 400" preserveAspectRatio="none">
        <line x1="50" y1="52" x2="50" y2="112"/><line x1="50" y1="152" x2="50" y2="212"/><line x1="50" y1="252" x2="50" y2="312"/>
      </svg>
    </div>
    <div class="sss-progress"><i id="sssBar"></i></div>
  </figure>

  <div class="sss-steps">
    <div class="sss-step" data-step="0">
      <h2>The request leaves</h2>
      <p>A URL is resolved, a connection is negotiated, and a single GET goes out. Everything after this is latency you are choosing to spend.</p>
    </div>
    <div class="sss-step" data-step="1">
      <h2>The edge answers first</h2>
      <p>If a cached copy exists within a few hundred kilometres, the origin is never contacted. This is the cheapest millisecond in the whole chain.</p>
    </div>
    <div class="sss-step" data-step="2">
      <h2>The server renders</h2>
      <p>On a miss, the origin builds the document — data fetched, components resolved, HTML streamed out as it becomes available rather than all at once.</p>
    </div>
    <div class="sss-step" data-step="3">
      <h2>The client takes over</h2>
      <p>Markup paints immediately, then JavaScript attaches behavior to what is already on screen. Done well, the user never sees the seam.</p>
    </div>
  </div>
</section>

<footer class="sss-foot">End of the story.</footer>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#080b18;color:#fff}

.sss-intro{min-height:88vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px;background:radial-gradient(110% 70% at 50% 0%,rgba(56,189,248,.18),transparent 60%)}
.sss-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,.11);border:1px solid rgba(56,189,248,.3);padding:5px 12px;border-radius:99px;margin-bottom:18px}
.sss-intro h1{font-size:clamp(30px,6.6vw,58px);font-weight:800;letter-spacing:-.03em;line-height:1.07;max-width:16ch}
.sss-intro p{font-size:clamp(14px,2.4vw,16.5px);color:#8f9ab8;margin-top:16px;max-width:44ch;line-height:1.65}
.sss-cue{margin-top:34px;font-size:22px;color:#38bdf8;animation:sssBob 1.8s ease-in-out infinite}
@keyframes sssBob{50%{transform:translateY(9px);opacity:.5}}

.sss-scrolly{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1060px;margin:0 auto;padding:0 24px}
@media (max-width:820px){.sss-scrolly{grid-template-columns:1fr}}

.sss-sticky{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px}
.sss-diagram{position:relative;width:min(300px,80vw);display:flex;flex-direction:column;gap:18px}
.sss-node{position:relative;z-index:1;padding:16px 20px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);text-align:center;opacity:.32;transform:scale(.94);transition:opacity .45s cubic-bezier(.22,1,.36,1),transform .45s cubic-bezier(.22,1,.36,1),border-color .45s,background .45s}
.sss-node b{font-size:15px;font-weight:800;display:block}
.sss-node small{font-size:11px;color:#8f9ab8;letter-spacing:.06em;text-transform:uppercase}
.sss-node.is-on{opacity:1;transform:scale(1);background:rgba(56,189,248,.13);border-color:#38bdf8;box-shadow:0 18px 40px -20px rgba(56,189,248,.85)}
.sss-node.is-done{opacity:.6;transform:scale(.97);border-color:rgba(56,189,248,.35)}
.sss-wires{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sss-wires line{stroke:rgba(255,255,255,.14);stroke-width:2;stroke-dasharray:4 6}

.sss-progress{width:min(300px,80vw);height:3px;border-radius:99px;background:rgba(255,255,255,.09);overflow:hidden}
.sss-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#38bdf8,#5eead4);transition:width .12s linear}

.sss-steps{padding:30vh 0}
.sss-step{min-height:82vh;display:flex;flex-direction:column;justify-content:center;opacity:.3;transition:opacity .4s}
.sss-step.is-on{opacity:1}
.sss-step h2{font-size:clamp(21px,3.6vw,30px);font-weight:800;letter-spacing:-.02em}
.sss-step p{font-size:clamp(14px,2.2vw,16px);color:#96a0c4;margin-top:12px;line-height:1.8;max-width:46ch}

.sss-foot{text-align:center;padding:100px 24px 140px;color:#5f688a;font-size:13px}`,

  js: `var steps = document.querySelectorAll('.sss-step');
var nodes = document.querySelectorAll('.sss-node');
var bar = document.getElementById('sssBar');

var scroller = scrollama();

function setActive(index) {
  steps.forEach(function (s, i) { s.classList.toggle('is-on', i === index); });
  nodes.forEach(function (n, i) {
    n.classList.toggle('is-on', i === index);
    // Everything before the current step reads as already completed.
    n.classList.toggle('is-done', i < index);
  });
}

scroller
  .setup({
    step: '.sss-step',
    // Trigger when a step reaches 55% down the viewport, not the very top —
    // the reader should be looking at it before the graphic changes.
    offset: 0.55,
    progress: true
  })
  .onStepEnter(function (response) {
    setActive(response.index);
  })
  .onStepProgress(function (response) {
    var per = 1 / steps.length;
    bar.style.width = ((response.index * per + response.progress * per) * 100).toFixed(1) + '%';
  });

// Scrollama caches step offsets on setup; without this a rotated phone or a
// resized window leaves every trigger point measured against the old layout.
window.addEventListener('resize', function () { scroller.resize(); });

setActive(0);`,

  seo: {
    title: 'Scrollama Scrollytelling — Sticky Graphic Story Steps',
    description: 'A scrollytelling layout with a sticky diagram that advances as each text step enters, using Scrollama step and progress callbacks. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Scrollama Scrollytelling — Step Triggers Without a Scroll Listener',
      description: `Scrollytelling — a graphic that stays put while text scrolls past and drives it — is the format behind most modern data journalism. The naive implementation is a \`scroll\` event listener that calls \`getBoundingClientRect()\` on every step on every scroll event, which fires hundreds of times a second and forces a layout recalculation each time. It works, and it is one of the most reliable ways to make a page feel sluggish.

**Scrollama** is a ~3kb wrapper around the **Intersection Observer API**. The browser watches the elements and tells you when a threshold is crossed, off the main thread. No scroll listener, no per-frame measurement, no throttling code to write.

## The layout does most of the work

Scrollytelling is a CSS pattern before it is a JavaScript one:

\`.sss-scrolly { display: grid; grid-template-columns: 1fr 1fr }\` with \`.sss-sticky { position: sticky; top: 0; height: 100vh }\`

The graphic column sticks within the grid's bounds while the text column scrolls normally. \`height: 100vh\` is required — a sticky element with auto height sticks at whatever height its content happens to be, which is why these layouts so often drift out of vertical alignment.

Each step is \`min-height: 82vh\`, giving the reader roughly a screenful per beat. Too short and steps fire in rapid succession; too tall and the graphic sits unchanged long enough to feel broken. The \`padding: 30vh 0\` on the step column lets the first and last steps sit centered rather than clamping to the edges.

## offset is the most important setting

\`offset: 0.55\`

This is where in the viewport a step must reach before it counts as entered, as a fraction from the top. At \`0\` the step triggers when it touches the very top of the screen — the reader has not begun reading it and the graphic has already moved on. At \`1\` it triggers at the bottom, before the text is legible.

Just past halfway is the sweet spot: the reader is looking directly at the step as the graphic responds. Getting this wrong is the most common reason a scrollytelling piece feels disconnected from its own narrative.

## Two callbacks, two jobs

\`onStepEnter\` fires once per step crossing and receives \`{ element, index, direction }\`. Because \`index\` is supplied, the handler is a pure function of position — \`setActive(response.index)\` sets the current node, marks everything before it as done, and highlights the matching text. Discrete state, updated on discrete events.

\`onStepProgress\` fires continuously while a step is in view, giving \`progress\` from 0 to 1. That is for **continuous** state, here a progress bar:

\`((response.index * per + response.progress * per) * 100)\`

Each step owns \`1 / steps.length\` of the bar, so the fill is the completed steps plus the fraction through the current one — a single continuous 0–100% across the whole story. Progress is opt-in (\`progress: true\`) because tracking it is more work than plain enter/exit events, so it stays off unless requested.

## Three-state nodes

The diagram distinguishes **upcoming**, **current**, and **completed** rather than just on/off. Completed nodes stay at 60% opacity with a dimmed border instead of resetting to their inactive state, so scrolling back through the story shows a visible trail of where you have been. That is the small detail that makes the graphic feel like a narrative rather than a switch, and it costs one \`classList.toggle\`.

## The resize call that is not optional

\`window.addEventListener('resize', function () { scroller.resize(); });\`

Scrollama measures every step's position when \`setup()\` runs and caches those offsets. A rotated phone, a resized window, or lazy-loaded content shifting the page all invalidate that cache, and without \`resize()\` every trigger point stays measured against a layout that no longer exists. Steps then fire at visibly wrong moments — a bug that never appears in desktop testing.

## Reusing it

Add a \`.sss-step\` and a matching node and everything follows, since the handlers work from \`index\` and \`steps.length\` rather than hard-coded counts. The sticky graphic can be anything — a chart, a map, a canvas, a video scrubbed by \`progress\`. On narrow screens the grid collapses to one column, which is the honest mobile fallback: the graphic scrolls inline between steps rather than fighting for half a small screen. Compare with [scroll pin steps](/ui-snippets/scroll-pin-steps/) for a GSAP-driven version, or [scroll progress](/ui-snippets/scroll-progress/) if you only need the bar.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Scrollama CDN', text: 'Include scrollama from the CDN panel — global scrollama factory.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A sticky diagram renders beside four scrolling story steps.' },
      { title: 'Scroll the story', text: 'Each step lights its matching node as it reaches mid-viewport.' },
      { title: 'Watch the trail', text: 'Completed nodes stay dimmed rather than resetting, so progress is visible.' },
      { title: 'Follow the bar', text: 'onStepProgress fills it continuously across the whole story.' },
      { title: 'Add your own steps', text: 'Add a step and a node — handlers derive from index and step count.' },
    ] },
    features: [
      { title: 'Intersection Observer based', text: 'No scroll listener and no per-frame getBoundingClientRect.' },
      { title: 'Tuned trigger point', text: 'offset 0.55 fires as the reader reaches the step, not before.' },
      { title: 'Discrete and continuous', text: 'onStepEnter for state, onStepProgress for the bar.' },
      { title: 'Three-state diagram', text: 'Upcoming, current, and completed rather than a binary toggle.' },
      { title: 'Index-driven handlers', text: 'No hard-coded step count anywhere in the logic.' },
      { title: 'Correct sticky sizing', text: 'height 100vh so the graphic centers reliably.' },
      { title: 'Resize recalculation', text: 'scroller.resize() re-measures cached step offsets.' },
      { title: 'Honest mobile fallback', text: 'The grid collapses to one column below 820px.' },
    ],
    useCases: [
      { title: 'Data journalism', text: 'The standard format for explaining a chart one beat at a time.' },
      { title: 'Product explainers', text: 'Walk a diagram through a pipeline or architecture.' },
      { title: 'Onboarding narratives', text: 'A scrolled alternative to an [onboarding tour](/ui-snippets/onboarding-tour/).' },
      { title: 'Case studies', text: 'Reveal results progressively as the reader moves through.' },
      { title: 'Documentation walkthroughs', text: 'Highlight the relevant part of a diagram per paragraph.' },
      { title: 'Learning scroll triggers', text: 'A reference beside [scroll pin steps](/ui-snippets/scroll-pin-steps/).' },
    ],
    faqs: [
      { q: 'Why use Scrollama instead of a scroll event listener?', a: 'A scroll listener fires hundreds of times per second and typically calls getBoundingClientRect on every step, forcing a layout recalculation each time — a reliable way to make a page feel sluggish. Scrollama wraps the Intersection Observer API, so the browser watches the elements and reports threshold crossings off the main thread, with no throttling code to write.' },
      { q: 'What does the offset option control?', a: 'Where in the viewport a step must reach before it counts as entered, expressed as a fraction from the top. At 0 it fires when the step touches the very top, before the reader has begun reading it. At 1 it fires at the bottom, before the text is legible. Just past halfway means the reader is looking directly at the step as the graphic responds.' },
      { q: 'What is the difference between onStepEnter and onStepProgress?', a: 'onStepEnter fires once per crossing and supplies the step index and direction, which suits discrete state like switching the active diagram node. onStepProgress fires continuously while a step is in view and supplies a 0-to-1 value, which suits continuous state like a progress bar or a scrubbed animation. Progress must be opted into with progress: true since tracking it costs more.' },
      { q: 'Why must the sticky element have an explicit height?', a: 'A position: sticky element with auto height sticks at whatever height its content happens to be, so the graphic ends up vertically misaligned and drifts as content changes. Setting height: 100vh makes it occupy the full viewport so the graphic can be reliably centered within it.' },
      { q: 'Why is scroller.resize() necessary?', a: 'Scrollama measures each step position during setup and caches those offsets. Rotating a phone, resizing a window, or lazy-loaded content shifting the page all invalidate that cache, leaving trigger points measured against a layout that no longer exists — so steps fire at visibly wrong moments. Calling resize() re-measures them, and the bug rarely shows up in desktop testing.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Create the scroller in a mount effect after the steps have rendered, since setup measures the DOM, and call scroller.destroy() in cleanup so observers are not left watching detached nodes. Keep the active index in state and drive the classes declaratively from it rather than calling classList in the callback. Re-run setup if the number of steps changes.' },
    ],
    aiPrompt: {
      paragraph: `The mechanics here are simple but the tuning decisions are what separate a scrollytelling piece that reads well from one that feels off, so it is worth talking through. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain what the offset value of 0.55 means in viewport terms, and describe how the experience changes at 0 and at 1 — then try both and feel the disconnect. Ask it to explain why onStepEnter and onStepProgress exist as separate callbacks and which kind of state each is suited to. Then ask what specifically breaks without the scroller.resize() call on window resize, and why that bug rarely appears during desktop development. For optimization, ask whether the sticky graphic needs will-change or containment as the diagram grows more complex, and how you would avoid layout thrash if each step also lazy-loaded an image. To extend it: have it scrub a video or a canvas animation from onStepProgress, add a direction check so scrolling up plays a different transition, add prefers-reduced-motion handling, or drive the steps from a data array. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scrollytelling section with a sticky graphic and scrolling text steps using Scrollama (from a CDN, global scrollama factory) in plain HTML, CSS, and JavaScript.

Requirements:
- Lay it out as a two-column CSS grid: a sticky graphic column and a scrolling steps column, collapsing to a single column below about 820px. The sticky element must use position: sticky with top: 0 AND an explicit height of 100vh — explain that a sticky element with auto height sticks at its content height and ends up vertically misaligned.
- Give each text step a min-height of roughly 82vh so the reader gets about a screenful per beat, and pad the steps column top and bottom with around 30vh so the first and last steps can sit centered.
- The sticky graphic should be a vertical diagram of four labelled nodes connected by dashed SVG lines, plus a thin progress bar underneath.
- Set up Scrollama with step: '.your-step', offset: 0.55 and progress: true. Explain the offset value specifically: it is where in the viewport a step must reach before counting as entered, so 0 fires before the reader has begun reading and 1 fires before the text is legible — just past halfway means the reader is looking at the step as the graphic responds.
- Use onStepEnter for DISCRETE state: take response.index and set the matching diagram node to a current state, mark all EARLIER nodes as completed (a dimmed third state, not reset to inactive, so scrolling back shows a visible trail), and highlight the matching text step.
- Use onStepProgress for CONTINUOUS state: fill the progress bar across the WHOLE story by giving each step an equal share (1 / stepCount) and computing completed steps plus the fraction through the current one, so the bar runs smoothly from 0 to 100% across all steps rather than resetting per step.
- Derive everything from response.index and the step count — no hard-coded step numbers in the handlers — so adding a step and a node requires no JS changes.
- Add a window resize listener calling scroller.resize() and explain that Scrollama caches every step's measured offset during setup, so a rotated phone, resized window, or lazy-loaded content shifting the page leaves every trigger point measured against a stale layout, making steps fire at visibly wrong moments.
- Include a tall intro hero above and a footer below so there is real scroll runway, and style it dark with a cyan accent and smooth cubic-bezier transitions on the node states.`,
    },
  },
};

export default scrollamaStorySteps;
