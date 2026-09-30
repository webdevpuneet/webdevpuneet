const scrollCompanyTimeline = {
  id: 'scroll-company-timeline',
  title: 'Scroll Company Timeline',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ctl-intro">
  <h1>Ten Years, One Line</h1>
  <p>Scroll to trace the milestones that shaped the company.</p>
</section>
<section class="ctl-wrap">
  <div class="ctl-track">
    <div class="ctl-line-track"><div class="ctl-line-fill" id="ctlLineFill"></div></div>
  </div>
  <div class="ctl-items">
    <article class="ctl-item ctl-left" data-node>
      <div class="ctl-node"></div>
      <div class="ctl-card"><span class="ctl-year">2016</span><h3>Two founders, one garage</h3><p>The first prototype ships to eleven beta users, all of them friends.</p></div>
    </article>
    <article class="ctl-item ctl-right" data-node>
      <div class="ctl-node"></div>
      <div class="ctl-card"><span class="ctl-year">2018</span><h3>First outside funding</h3><p>A seed round lets the team grow from 3 people to 12.</p></div>
    </article>
    <article class="ctl-item ctl-left" data-node>
      <div class="ctl-node"></div>
      <div class="ctl-card"><span class="ctl-year">2020</span><h3>10,000 customers</h3><p>A hard year for the world becomes a breakout one for remote-first tools.</p></div>
    </article>
    <article class="ctl-item ctl-right" data-node>
      <div class="ctl-node"></div>
      <div class="ctl-card"><span class="ctl-year">2022</span><h3>Opening the platform</h3><p>A public API turns the product into an ecosystem overnight.</p></div>
    </article>
    <article class="ctl-item ctl-left" data-node>
      <div class="ctl-node"></div>
      <div class="ctl-card"><span class="ctl-year">2024</span><h3>Series B and 100 employees</h3><p>Four offices, three time zones, one roadmap.</p></div>
    </article>
    <article class="ctl-item ctl-right" data-node>
      <div class="ctl-node"></div>
      <div class="ctl-card"><span class="ctl-year">2026</span><h3>The story continues</h3><p>What started in a garage now runs infrastructure for a million teams.</p></div>
    </article>
  </div>
</section>
<section class="ctl-outro"><p>Scroll back up to relive the journey.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b10;color:#fff;min-height:100vh}
.ctl-intro,.ctl-outro{min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.ctl-intro h1{font-size:clamp(30px,6vw,54px);letter-spacing:-.02em}
.ctl-intro p,.ctl-outro p{color:#8b90a8;font-size:15px}
.ctl-wrap{position:relative;max-width:920px;margin:0 auto;padding:40px 20px 80px}
.ctl-track{position:absolute;left:50%;top:0;bottom:0;width:4px;transform:translateX(-50%);border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}
.ctl-line-fill{width:100%;height:0%;background:linear-gradient(180deg,#818cf8,#22d3ee);border-radius:999px}
.ctl-items{display:flex;flex-direction:column;gap:64px;position:relative;z-index:1}
.ctl-item{display:grid;grid-template-columns:1fr 1fr;align-items:center;column-gap:40px;opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease}
.ctl-item.is-in{opacity:1;transform:translateY(0)}
.ctl-item .ctl-node{grid-column:1/3;justify-self:center;width:16px;height:16px;border-radius:50%;background:#0a0b10;border:3px solid #6366f1;position:relative;z-index:2;grid-row:1;margin-bottom:-8px;transition:background .3s,border-color .3s,transform .3s}
.ctl-item.is-in .ctl-node{background:#818cf8;transform:scale(1.15)}
.ctl-card{grid-row:2;background:#12141f;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:22px 24px;max-width:380px}
.ctl-left .ctl-card{grid-column:1;justify-self:end;text-align:right}
.ctl-right .ctl-card{grid-column:2;justify-self:start;text-align:left}
.ctl-year{font-size:12px;font-weight:800;letter-spacing:.1em;color:#22d3ee}
.ctl-card h3{font-size:19px;margin:6px 0 6px;letter-spacing:-.01em}
.ctl-card p{font-size:14px;line-height:1.55;color:#9ba1bd}
@media (max-width:700px){
  .ctl-track{left:20px;transform:none}
  .ctl-item{grid-template-columns:1fr;column-gap:0;padding-left:48px}
  .ctl-item .ctl-node{grid-column:1;justify-self:start;position:absolute;left:20px;transform:translateX(-50%)}
  .ctl-item.is-in .ctl-node{transform:translateX(-50%) scale(1.15)}
  .ctl-left .ctl-card,.ctl-right .ctl-card{grid-column:1;justify-self:start;text-align:left;max-width:100%}
}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// The vertical line's fill height is scrubbed directly against how far the
// visitor has scrolled through the whole .ctl-wrap section, so it always
// reads as "how much of the timeline has been told so far" rather than
// firing as a one-shot animation.
gsap.to('#ctlLineFill', {
  height: '100%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.ctl-wrap',
    start: 'top 60%',
    end: 'bottom 60%',
    scrub: 0.4,
  },
});

// Each card/node pair gets its own independent trigger so they reveal one
// at a time as they individually cross the viewport, instead of all firing
// together when the section first appears.
document.querySelectorAll('[data-node]').forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 78%',
    end: 'bottom 20%',
    onEnter: () => item.classList.add('is-in'),
    onLeaveBack: () => item.classList.remove('is-in'),
  });
});`,

  seo: {
    title: 'Scroll Company Timeline — Free GSAP ScrollTrigger Milestone Timeline',
    description: `An alternating-card company timeline where a vertical progress line fills as you scroll and each milestone card reveals independently, built with GSAP ScrollTrigger scrub and per-item triggers.`,
    about: {
      title: 'Scroll Company Timeline — A Milestone Line That Fills as You Read',
      description: `Company "our story" pages usually show a timeline as a static list. This snippet turns it into a scroll-driven narrative: a vertical progress line grows in lockstep with how far the visitor has scrolled through the milestones, and each card reveals on its own the moment it crosses into view — so the line's height always doubles as an honest reading-progress indicator for the whole history.

**One scrubbed tween drives the whole line**

The line fill is a single \`gsap.to()\` call animating \`height\` from 0% to 100%, with its \`scrollTrigger\` set to \`scrub: 0.4\` across the full \`.ctl-wrap\` section. Scrub ties the tween's progress directly to scroll position rather than playing it once — scroll halfway through the timeline and the line is exactly half full, scroll back up and it retracts, frame for frame. That single scrubbed value is what makes the line read as "progress through the story" instead of a decorative flourish.

**Per-item triggers, not one big stagger**

Rather than animating all six cards from a single trigger on the section (which would either fire them all at once or force an artificial stagger delay unrelated to actual scroll position), every \`[data-node]\` item gets its own \`ScrollTrigger.create()\` with \`onEnter\`/\`onLeaveBack\` toggling an \`is-in\` class. Each card genuinely animates in exactly when it individually reaches 78% up the viewport, and reverses if the visitor scrolls back above it — real per-milestone timing, not a simulated one.

**CSS transitions do the card animation, GSAP does the timing**

The \`is-in\` class only toggles \`opacity\`, \`transform\`, and the node's border color — actual interpolation happens through a plain CSS \`transition\`, not a GSAP tween. This keeps the JavaScript responsible purely for *when* to reveal each card (via ScrollTrigger's viewport math) while the browser's compositor handles *how* it animates, which is cheaper for a page with many milestone items than tweening every property property-by-property in JS.

**Alternating layout is pure CSS grid, no JS positioning**

Left/right alternation comes from two class names (\`ctl-left\`/\`ctl-right\`) placing the card in column 1 or 2 of a two-column grid with the node itself pinned to the shared center line — no JavaScript computes card position, so adding a milestone is just adding another \`article\` with the next alternating class.

**Customizing it**

Add or remove \`.ctl-item\` blocks freely — the per-item trigger loop picks up any element with \`data-node\` automatically, and the scrubbed line covers whatever the section's total height ends up being with no manual duration to update. Pair with a [scroll pin story](/ui-snippets/scroll-pin-story/) hero above it, or a [scroll number odometer](/ui-snippets/scroll-number-odometer/) counting total customers at the very end.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add GSAP and ScrollTrigger', text: `Load both from the CDN and call gsap.registerPlugin(ScrollTrigger).` },
      { title: 'Paste the HTML, CSS, and JS', text: `Milestones alternate left and right automatically from their class names.` },
      { title: 'Scroll into the timeline', text: `The vertical line fills in step with scroll progress through the section.` },
      { title: 'Watch each card reveal', text: `Cards fade and rise in independently as they individually enter the viewport.` },
      { title: 'Scroll back up', text: `The line retracts and cards reset, since every trigger is fully reversible.` },
      { title: 'Add or remove milestones', text: `Duplicate a .ctl-item block with the next alternating class — no JS changes needed.` },
    ] },
    features: [
      { title: 'Scrubbed progress line', text: `The vertical line's height is tied directly to scroll position, not a one-shot animation.` },
      { title: 'Per-milestone triggers', text: `Each card gets its own ScrollTrigger, revealing exactly when it individually enters view.` },
      { title: 'Fully reversible', text: `Scrolling back up retracts the line and un-reveals cards in reverse order.` },
      { title: 'Alternating layout via CSS grid', text: `Left/right placement comes from a class name, not computed positioning.` },
      { title: 'CSS-driven card animation', text: `GSAP handles only timing; transitions handle the actual interpolation.` },
      { title: 'Responsive single-column fallback', text: `Collapses to a left-aligned line and stacked cards under 700px.` },
      { title: 'Extensible by data, not code', text: `Adding a milestone is adding markup — the JS loop scales automatically.` },
      { title: 'Zero external images', text: `Nodes and the line are pure CSS shapes and gradients.` },
    ],
    useCases: [
      { title: 'Company "our story" / about pages', text: `Turn a static founding history into a paced, scroll-driven narrative.` },
      { title: 'Product roadmap or changelog pages', text: `Show release milestones with the same fill-line progress metaphor.` },
      { title: 'Annual report retrospectives', text: `Walk investors through year-by-year milestones before a final metrics summary.` },
      { title: 'Nonprofit impact timelines', text: `Narrate program milestones alongside a growing progress indicator.` },
      { title: 'Personal portfolio "career journey" sections', text: `Reuse the same alternating-card pattern for individual work history.` },
      { title: 'Event or conference history pages', text: `Show past editions as milestones building toward the current one.` },
      { icon: 'CODE', title: 'Related: Scroll Comic Panel Sequence', desc: 'See the [Scroll Comic Panel Sequence](/ui-snippets/scroll-comic-panels/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `What is the difference between the scrubbed line and the per-card reveals?`, a: `The line uses scrub, which ties its animation progress directly to scroll position across the whole section — it is always exactly as full as the visitor has scrolled. The cards instead use onEnter and onLeaveBack callbacks, which are one-shot triggers that fire once each time a card crosses a fixed point in the viewport, then reverse when it crosses back. Scrub gives continuous, position-locked feedback; onEnter gives a discrete, direction-aware event — this snippet uses each for the job it fits.` },
      { q: `Why do the milestone cards use CSS transitions instead of GSAP tweens?`, a: `Because the JavaScript only needs to decide when a card should be revealed, which is exactly what ScrollTrigger's onEnter and onLeaveBack callbacks are for. Toggling a single is-in class and letting a plain CSS transition animate opacity and transform keeps every card's actual interpolation on the browser's own transition engine, which is simpler to maintain and doesn't require a GSAP tween instance per card.` },
      { q: `How do I add a seventh milestone to the timeline?`, a: `Duplicate one .ctl-item article, alternate its class between ctl-left and ctl-right so it lands on the opposite side of the line from its predecessor, update the year, heading, and paragraph text, and leave the data-node attribute in place. The per-item ScrollTrigger loop in the JS queries all [data-node] elements automatically, so no JavaScript needs to change for the new card to animate correctly.` },
      { q: `Will the line still line up correctly if milestone cards have very different heights?`, a: `Yes — the line's fill is scrubbed against the .ctl-wrap section's actual total scroll distance (from start: 'top 60%' to end: 'bottom 60%'), not against a fixed number of pixels or a hardcoded item count. Whatever the real rendered height of the section ends up being, including uneven card heights, the line always finishes filling exactly as the last card's trigger zone is reached.` },
      { q: `How do I build this scroll timeline in React, Vue, or Angular?`, a: `Create the ScrollTrigger for the line fill and the loop of per-item triggers inside a mount effect (useEffect, onMounted, or ngAfterViewInit), after the milestone list has rendered so every [data-node] element already exists in the DOM. Store the created ScrollTrigger instances and call .kill() on each in the cleanup function to avoid duplicate triggers on re-render or route change.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the vertical line uses scrub while the individual milestone cards use onEnter/onLeaveBack callbacks instead of scrub, and how giving every card its own ScrollTrigger instance produces genuinely independent, position-accurate reveals rather than a simulated stagger. The same assistant is useful for extending the pattern — ask it to add a small year marker that highlights on the line itself as each milestone activates, make the line curve instead of running straight down the center, or convert the card reveal into a horizontal-scroll variant for a wide-format timeline. Treat the code as a working starting point for building your own paced, scroll-driven history section.`,
      prompt: `Build a "scroll company timeline" in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin, loaded from a CDN with no bundler.

Requirements:
- A vertical timeline section containing a thin centered progress line and a list of milestone items alternating left and right of that line via CSS grid and class names, each with a year label, heading, and short description, plus a small circular node marker sitting on the line at each milestone's vertical position.
- Animate the vertical line's fill height from 0% to 100% using a single GSAP tween whose ScrollTrigger uses scrub (a fractional value like 0.4 for slight easing lag) across the full scroll distance of the timeline section, so the line's fill amount always directly reflects how far through the timeline the visitor has scrolled, including retracting smoothly when they scroll back up.
- Give every individual milestone item its own separate ScrollTrigger instance (not one shared trigger for the whole list) that toggles a revealed CSS class using onEnter and onLeaveBack callbacks, so each card fades and rises into view independently at the exact scroll position where it enters the viewport, and reverses cleanly if the visitor scrolls back above it.
- Let a plain CSS transition (not a GSAP tween) animate the actual opacity and transform change when the revealed class toggles, so GSAP and ScrollTrigger are responsible only for deciding when to reveal each item, not for performing the visual interpolation itself.
- Make the layout responsive: collapse the alternating two-column grid into a single left-aligned column with the line moved to the left edge on narrow viewports, without breaking the per-item reveal triggers.
- Ensure the whole timeline is fully reversible — scrolling back to the top should retract the line and remove the revealed state from every card in the correct reverse order, purely from ScrollTrigger's own state tracking with no manual scroll-direction logic.`,
    },
  },
};

export default scrollCompanyTimeline;
