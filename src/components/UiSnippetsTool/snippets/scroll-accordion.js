const scrollAccordion = {
  id: 'scroll-accordion',
  title: 'Scroll Accordion',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sac-top"><p>Scroll ↓</p></section>
<section class="sac-stage" id="sacStage">
  <div class="sac-list">
    <div class="sac-item">
      <div class="sac-head"><span class="sac-idx">01</span><h3>Design</h3><span class="sac-chev">▾</span></div>
      <div class="sac-body"><p>Wireframes become prototypes in days. Every decision is tested against real users before a line of code ships.</p></div>
    </div>
    <div class="sac-item">
      <div class="sac-head"><span class="sac-idx">02</span><h3>Build</h3><span class="sac-chev">▾</span></div>
      <div class="sac-body"><p>Small teams, weekly releases. CI keeps main deployable and feature flags keep launches boring.</p></div>
    </div>
    <div class="sac-item">
      <div class="sac-head"><span class="sac-idx">03</span><h3>Measure</h3><span class="sac-chev">▾</span></div>
      <div class="sac-body"><p>Every release ships with its own dashboard. If a number moves, you know which commit moved it.</p></div>
    </div>
    <div class="sac-item">
      <div class="sac-head"><span class="sac-idx">04</span><h3>Scale</h3><span class="sac-chev">▾</span></div>
      <div class="sac-body"><p>What works gets budget. What does not gets archived. The roadmap writes itself from the data.</p></div>
    </div>
  </div>
</section>
<section class="sac-bottom"><p>Each scroll segment opened one panel and closed the last.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.sac-top,.sac-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.sac-stage{height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(75% 65% at 50% 45%,#11162e,#07080d)}
.sac-list{width:min(620px,92vw);display:flex;flex-direction:column;gap:12px}
.sac-item{border-radius:16px;background:#0d1122;border:1px solid rgba(255,255,255,.09);overflow:hidden}
.sac-head{display:flex;align-items:center;gap:16px;padding:20px 22px}
.sac-idx{font-size:13px;font-weight:700;letter-spacing:.14em;color:#9fb4ff}
.sac-head h3{font-size:clamp(18px,3vw,24px);font-weight:800;letter-spacing:-.01em;flex:1}
.sac-chev{color:#8a90a8;transition:transform .3s}
.sac-item.is-open{border-color:rgba(159,180,255,.4)}
.sac-item.is-open .sac-chev{transform:rotate(180deg)}
.sac-body{height:0;opacity:0;overflow:hidden}
.sac-body p{padding:0 22px 22px;color:#aeb4ca;font-size:15px;line-height:1.65;max-width:520px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var items = gsap.utils.toArray('.sac-item');
var bodies = gsap.utils.toArray('.sac-body');
var OPEN_H = 96; // fixed open height keeps the scrub math simple

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#sacStage',
    start: 'top top',
    end: '+=' + (items.length * 70) + '%',
    scrub: 0.35,
    pin: true
  }
});

// Sequentially: open panel i while closing panel i-1. Each hand-off
// occupies one unit of timeline time, so scroll pacing is even.
items.forEach(function (item, i) {
  tl.to(bodies[i], { height: OPEN_H, opacity: 1, ease: 'none', duration: 0.6 }, i);
  tl.call(function () { item.classList.toggle('is-open'); }, null, i + 0.05);
  if (i > 0) {
    tl.to(bodies[i - 1], { height: 0, opacity: 0, ease: 'none', duration: 0.6 }, i);
    tl.call(function () { items[i - 1].classList.toggle('is-open'); }, null, i + 0.05);
  }
});`,

  seo: {
    title: 'Scroll Accordion — Free GSAP Pinned Panels Snippet',
    description: `A pinned accordion that opens itself: each scroll segment expands the next panel and closes the last, scrubbed via ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Accordion — Panels That Open and Close Themselves on Scroll',
      description: `The scroll accordion replaces clicking with scrolling: the list pins in the viewport, and each segment of scroll expands the next panel while collapsing the previous one — a self-guiding tour through a process or feature list where the reader's scroll position *is* the open panel. Scrolling up walks backward through the panels. This snippet builds it with GSAP ScrollTrigger (from a CDN) and a paired open/close choreography.

**Open and close are paired at the same timeline position**

For each panel \`i\`, two tweens are placed at position \`i\` on the master timeline: panel \`i\` animates to its open height while panel \`i − 1\` animates back to zero. Because they share a position and duration, the hand-off is a perfect crossfade of heights — the list's total height stays nearly constant during transitions, so the pinned stage never visibly grows or shifts vertically mid-scroll.

**A fixed open height keeps the scrub honest**

The bodies open to a constant \`OPEN_H\` of 96px rather than \`height: 'auto'\`. Auto heights force GSAP to measure and lock a pixel value the first time the tween runs — fine for click accordions, but under a scrub that measurement can happen mid-gesture and produce a subtle pop. A fixed height (sized to fit the longest paragraph) makes every hand-off geometrically identical and perfectly reversible. If your content varies a lot, measure each body's \`scrollHeight\` up front and tween to that stored number instead.

**Class toggles ride the timeline with .call()**

The border highlight and chevron rotation are CSS states, not tweens, so they're flipped by \`tl.call()\` entries placed just after each hand-off starts. Crucially, the callbacks use \`classList.toggle\` rather than \`add\`/\`remove\`: a scrubbed timeline re-fires calls when the playhead crosses them in either direction, and a toggle self-inverts on reverse passes, keeping the visual state correct no matter how erratically the user scrolls.

**Scroll distance scales with the panel count**

The trigger's \`end\` is \`items.length × 70%\`, granting each panel the same scroll budget regardless of how many you add. Each open/close pair occupies one unit of timeline duration, so pacing stays even — panel three doesn't rush by faster than panel one.

**Why height animation is safe here**

Height tweens normally cause layout thrash, but this accordion animates one (or two) small bodies inside a pinned stage with everything else static — the browser relayouts a 600px-wide column, not the page. \`overflow: hidden\` on the bodies clips the text during the collapse, and animating opacity alongside height keeps half-open text from looking cropped.

**The reader can't get lost**

Because exactly one panel is open at any scroll position and the mapping is deterministic, the accordion doubles as a progress indicator: seeing "03 Measure" open tells you you're 60% through the section. That's the advantage over click accordions in narrative contexts — no decision fatigue, no skipped steps.

**Customizing it**

Add panels (the math adapts), swap the fixed height for measured \`scrollHeight\`, or put media in the bodies. For a click-driven version see the [accordion FAQ](/ui-snippets/accordion-faq/); pair this one with [scroll pin steps](/ui-snippets/scroll-pin-steps/) for a panel-swap cousin or a [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) rail alongside.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Four closed accordion rows render in a pinned list.` },
      { title: 'Scroll into the stage', text: `Panel 01 expands as the section pins.` },
      { title: 'Keep scrolling', text: `Each segment opens the next panel, closing the last.` },
      { title: 'Scroll back up', text: `The accordion walks backward through its panels.` },
      { title: 'Add your content', text: `Duplicate a row; the timeline scales automatically.` },
    ] },
    features: [
      { title: 'Scroll-driven panels', text: `Scroll position decides the open panel.` },
      { title: 'Paired hand-offs', text: `Open and close tweens share a position.` },
      { title: 'Stable height', text: `Fixed OPEN_H keeps the pinned list steady.` },
      { title: 'Toggle-safe calls', text: `classList.toggle survives reverse scrubs.` },
      { title: 'Count-aware pacing', text: `End distance scales with panel count.` },
      { title: 'Clipped collapse', text: `overflow hidden crops text during close.` },
      { title: 'Progress by design', text: `The open panel doubles as a progress cue.` },
      { title: 'Reversible', text: `Scrolling up steps back through panels.` },
    ],
    useCases: [
      { title: 'Process walkthroughs', text: `Design → build → measure → scale narratives; add a [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) rail beside it.` },
      { title: 'Feature tours', text: `One panel per feature, then a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) of the rest.` },
      { title: 'How-it-works sections', text: `Self-advancing steps beat click-to-open; compare [scroll pin steps](/ui-snippets/scroll-pin-steps/).` },
      { title: 'FAQ storytelling', text: `Walk the top questions in order; deep-link the full list to an [accordion FAQ](/ui-snippets/accordion-faq/).` },
      { title: 'Changelogs', text: `Expand release highlights version by version, like a scrollable [changelog feed](/ui-snippets/changelog-feed/).` },
      { title: 'Onboarding previews', text: `Preview setup stages before signup; follow with [sticky scroll features](/ui-snippets/scroll-sticky-features/).` },
      { icon: 'CODE', title: 'Related: Scroll Blur Focus', desc: 'See the [Scroll Blur Focus](/ui-snippets/scroll-blur-focus/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does scrolling decide which panel is open?', a: `A pinned, scrubbed timeline places an open tween for panel i and a close tween for panel i − 1 at the same position i. As the scrubbed playhead moves through positions 0–3, exactly one panel is open at any scroll offset, and moving backward replays the hand-offs in reverse. Scroll position maps deterministically to accordion state.` },
      { q: 'Why do the panels open to a fixed height instead of auto?', a: `height: 'auto' makes GSAP measure and lock a pixel value the first time the tween runs, which under a scrub can happen mid-gesture and pop. A constant OPEN_H makes every hand-off geometrically identical and cleanly reversible. For varied content, measure each body's scrollHeight once up front and tween to those stored values.` },
      { q: 'How do the chevron and border states stay correct when scrolling backward?', a: `They're flipped by tl.call entries using classList.toggle rather than add/remove. A scrubbed timeline re-fires call() whenever the playhead crosses it in either direction, and a toggle self-inverts on the reverse pass — so the is-open class tracks the true state no matter how erratically the user scrubs back and forth.` },
      { q: 'Doesn’t animating height cause layout jank?', a: `Height tweens do trigger layout, but here only one small body (two during hand-offs) inside a pinned 620px column changes — the rest of the page is static, so the relayout cost is tiny. The paired open/close also keeps total list height nearly constant, which is why the pinned stage doesn't visibly shift during transitions.` },
      { q: 'How do I use this scroll accordion in React, Vue, or Angular?', a: `Render rows from an array and build the timeline in a mount effect (useEffect, onMounted, or ngAfterViewInit) inside gsap.context scoped to a list ref, reverting it on cleanup so the pin unregisters. Keep is-open as classes toggled by the timeline rather than framework state — routing it through state would re-render on every reverse crossing. Row styling converts directly to Tailwind utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reconstruct the timeline choreography in your head. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the open tween for panel i and the close tween for panel i minus 1 are placed at the same timeline position, and why the code uses classList.toggle inside tl.call instead of classList.add or remove. The same assistant is useful for optimizing it — ask whether the fixed OPEN_H constant is the right tradeoff for content with wildly varying paragraph lengths, or how you'd measure each body's scrollHeight once up front and tween to those stored values instead. It is just as useful for extending the effect — ask it to let two panels stay open simultaneously instead of strictly one, add a progress rail that mirrors which panel index is currently open, or make the panel content itself (an image or a stat) crossfade in sync with the height tween. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll accordion" in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A pinned list of accordion items, each with a header (index, title, chevron icon) and a collapsible body that starts at height 0 and opacity 0 with overflow hidden.
- Register a single GSAP timeline on one ScrollTrigger for the whole list, with pin: true, scrub enabled, and an end distance that scales with the number of items (for example items.length times a fixed percentage), so scroll pacing per panel stays even regardless of how many items exist.
- For every item at index i, place an open tween (animate that item's body to a fixed open height and opacity 1) at timeline position i, and — for every index after the first — place a close tween for the previous item's body (animate its height and opacity back to 0) at that same timeline position i, so each hand-off is a paired crossfade rather than two independent transitions.
- Use a fixed pixel height for the open state (not height: auto), sized to comfortably fit the longest body's content.
- Toggle each item's "open" visual state (border highlight, chevron rotation) using classList.toggle inside a tl.call placed just after each hand-off begins — not classList.add/remove — so the state self-inverts correctly when the scrubbed timeline is crossed in the reverse (scrolling up) direction.
- Confirm that scrolling backward through the pinned section correctly walks the accordion open/close sequence in reverse with no separate reverse-scroll logic, relying entirely on the scrubbed timeline's natural reversibility.`,
    },
  },
};

export default scrollAccordion;
