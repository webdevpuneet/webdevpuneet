const scrollProgressJourneyTrail = {
  id: 'scroll-progress-journey-trail',
  title: 'Scroll Progress Journey Trail',
  lastmod: '2026-08-23',
  category: 'scroll',
  cdnUrls: [],
  html: `<section class="jt-intro"><h1>Scroll ↓</h1><p>A journey trail lights up sequentially as you pass each waypoint, with a connecting line that fills progressively between them.</p></section>
<div class="jt-layout">
  <aside class="jt-rail" id="jtRail">
    <div class="jt-rail-line"><div class="jt-rail-fill" id="jtRailFill"></div></div>
    <div class="jt-waypoint" data-target="jtStep1"><span class="jt-dot">1</span><em>Sign up</em></div>
    <div class="jt-waypoint" data-target="jtStep2"><span class="jt-dot">2</span><em>Import data</em></div>
    <div class="jt-waypoint" data-target="jtStep3"><span class="jt-dot">3</span><em>Automate</em></div>
    <div class="jt-waypoint" data-target="jtStep4"><span class="jt-dot">4</span><em>Scale up</em></div>
  </aside>
  <main class="jt-main">
    <section class="jt-step" id="jtStep1"><h2>1. Sign up</h2><p>Create a workspace and invite your team — no credit card required to start exploring the product.</p></section>
    <section class="jt-step" id="jtStep2"><h2>2. Import your data</h2><p>Connect an existing spreadsheet or database and we'll map your fields automatically in seconds.</p></section>
    <section class="jt-step" id="jtStep3"><h2>3. Automate the busywork</h2><p>Set up rules once and let recurring tasks run themselves in the background, every single day.</p></section>
    <section class="jt-step" id="jtStep4"><h2>4. Scale with confidence</h2><p>Add seats, connect more sources, and lean on the same workflow as your team grows past the first hundred.</p></section>
  </main>
</div>
<section class="jt-outro"><p>Scroll back up — the trail dims and un-fills exactly in reverse.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b13;color:#fff}
.jt-intro,.jt-outro{min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.jt-intro h1{font-size:clamp(30px,6vw,54px);letter-spacing:-.02em}
.jt-intro p,.jt-outro p{color:#9aa0b8;font-size:16px;max-width:500px}
.jt-layout{display:grid;grid-template-columns:120px 1fr;gap:clamp(20px,5vw,60px);max-width:900px;margin:0 auto;padding:0 24px}
.jt-rail{position:sticky;top:14vh;align-self:start;height:72vh;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:10px 0}
.jt-rail-line{position:absolute;top:20px;bottom:20px;left:50%;width:3px;transform:translateX(-50%);background:#1c2135;border-radius:999px;overflow:hidden;z-index:0}
.jt-rail-fill{position:absolute;top:0;left:0;width:100%;height:0%;background:linear-gradient(180deg,#6366f1,#22d3ee)}
.jt-waypoint{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:6px}
.jt-dot{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;background:#11131f;border:2px solid #2a3148;color:#565f80;transition:background .35s,border-color .35s,color .35s,box-shadow .35s}
.jt-dot.is-lit{background:#22d3ee;border-color:#22d3ee;color:#06111a;box-shadow:0 0 16px rgba(34,211,238,.7)}
.jt-waypoint em{font-style:normal;font-size:11px;color:#6b7290;letter-spacing:.02em;transition:color .35s}
.jt-waypoint.is-lit em{color:#c9d2f8}
.jt-main{padding:8vh 0}
.jt-step{min-height:60vh;display:flex;flex-direction:column;justify-content:center;gap:12px;border-top:1px solid #191d2c}
.jt-step:first-child{border-top:none}
.jt-step h2{font-size:clamp(24px,4vw,34px);letter-spacing:-.01em}
.jt-step p{color:#a7adc4;font-size:16px;line-height:1.65;max-width:480px}`,

  js: `(function () {
  var steps = Array.prototype.slice.call(document.querySelectorAll('.jt-step'));
  var waypoints = Array.prototype.slice.call(document.querySelectorAll('.jt-waypoint'));
  var railFill = document.getElementById('jtRailFill');

  // Light each waypoint the first time its matching step scrolls past the
  // viewport's vertical center, using IntersectionObserver with a
  // rootMargin that shifts the effective trigger line to the middle.
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      var waypoint = waypoints.filter(function (w) { return w.getAttribute('data-target') === id; })[0];
      if (!waypoint) return;
      if (entry.isIntersecting) {
        waypoint.classList.add('is-lit');
        waypoint.querySelector('.jt-dot').classList.add('is-lit');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  steps.forEach(function (step) { observer.observe(step); });

  // The connecting line fills continuously from the overall scroll
  // fraction across the whole step sequence, not in discrete per-step
  // jumps, so it visually catches up smoothly between lit waypoints.
  var ticking = false;
  function updateRail() {
    ticking = false;
    var first = steps[0].getBoundingClientRect();
    var last = steps[steps.length - 1].getBoundingClientRect();
    var totalHeight = (last.top + last.height) - first.top;
    var viewportCenter = window.innerHeight / 2;
    var scrolledPast = viewportCenter - first.top;
    var progress = totalHeight > 0 ? scrolledPast / totalHeight : 0;
    progress = Math.max(0, Math.min(1, progress));
    railFill.style.height = (progress * 100) + '%';
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateRail);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateRail();
})();`,

  seo: {
    title: 'Scroll Progress Journey Trail — Free Sequential Waypoint Reveal',
    description: `A vertical trail of waypoints lights up sequentially as the reader scrolls past each matching section, with a connecting line that fills continuously between them. Vanilla JS.`,
    about: {
      title: 'Scroll Progress Journey Trail — Waypoints That Light Up as You Read',
      description: `A sidebar trail of waypoint dots tracks progress through a multi-step narrative — sign up, import data, automate, scale — lighting each dot the first time its matching section crosses the viewport's center, while a connecting line behind the dots fills smoothly and continuously rather than jumping in discrete steps. It's built entirely in vanilla JavaScript: an \`IntersectionObserver\` with a center-anchored \`rootMargin\` handles the discrete waypoint lighting, and a separate scroll-position calculation drives the continuous line fill.

**Center-anchored IntersectionObserver, not a default one**

The observer uses \`rootMargin: '-50% 0px -50% 0px'\`, which shrinks the observer's effective viewport to a single horizontal line at 50% height — so \`isIntersecting\` only flips true the instant a step's element crosses the exact vertical center of the screen, not whenever any part of it becomes visible. That precise center-crossing is what makes each waypoint light up in a way that feels tied to "you're now reading this section," rather than lighting up too early as the section first appears at the bottom of the viewport.

**Two independently-computed signals, one visual trail**

The waypoint dots (discrete, permanent once lit) and the connecting line fill (continuous, reversible) are calculated by two separate pieces of logic that happen to render into the same sidebar. The line fill reads the combined bounding-box height of the entire step sequence and computes what fraction of that total height has been scrolled past the viewport's center — a single continuous percentage applied as the fill element's \`height\`, independent of which waypoints have individually lit up.

**Why this differs from a stepped timeline**

A common pattern nudges a fixed indicator to each step's position only when that step becomes "nearest" to center, producing a trail that jumps between fixed stop points. This snippet's line fill instead recalculates from raw scroll position on every scroll event, so it visibly, continuously catches up while scrolling between two waypoints rather than staying pinned at the last lit stop until the next one is reached.

**Sticky rail, scrolling content**

The \`.jt-rail\` sidebar uses \`position: sticky\` so it stays in view alongside whichever step is currently being read, while \`.jt-main\`'s sections scroll normally — a standard two-column sticky-sidebar layout, with all the position math and lighting logic layered on top in JavaScript.

**Customizing it**

Swap the numbered dots for small avatar photos or icons, add a fifth waypoint, or make the line fill snap to the nearest lit waypoint instead of tracking exact scroll position continuously. Pair it with [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) for a GSAP-driven alternative, or a [scroll progress bar](/ui-snippets/css-scroll-driven-progress/) for a simpler top-of-page indicator.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a sticky waypoint rail, four step sections, and an outro render.` },
      { title: 'Scroll down the steps', text: `Each waypoint dot lights up as its matching step crosses center.` },
      { title: 'Watch the connecting line', text: `It fills continuously, catching up smoothly between waypoints.` },
      { title: 'Scroll back up', text: `The line un-fills exactly in reverse, tracking scroll position.` },
      { title: 'Add a waypoint', text: `Add a .jt-waypoint, a matching .jt-step, and update data-target.` },
      { title: 'Adjust the trigger line', text: `Change the IntersectionObserver's rootMargin percentages.` },
    ] },
    features: [
      { title: 'Center-anchored trigger', text: `rootMargin shrinks the observer to the viewport's exact middle.` },
      { title: 'Continuous line fill', text: `Fill height is a real scroll-position percentage, not stepped.` },
      { title: 'Independent dual signals', text: `Discrete lighting and continuous fill computed separately.` },
      { title: 'Sticky sidebar rail', text: `CSS position: sticky keeps waypoints visible while reading.` },
      { title: 'IntersectionObserver lighting', text: `Cheap, precise per-step visibility detection.` },
      { title: 'rAF-throttled fill calc', text: `One recalculation per frame regardless of scroll event rate.` },
      { title: 'Data-target matching', text: `Waypoints link to steps by a simple attribute, easy to extend.` },
      { title: 'No dependencies', text: `Pure vanilla JS, IntersectionObserver, and scroll math.` },
    ],
    useCases: [
      { title: 'Product onboarding stories', text: 'Show progress through a multi-step narrative such as sign up, import data, automate and scale, lighting each waypoint dot as its section crosses the middle.' },
      { title: 'Long-form case studies', text: 'Track which phase of a project the reader is in, with a sticky sidebar rail that keeps the waypoints visible while reading.' },
      { title: 'Course and tutorial pages', text: 'Mark lesson progress down the page, with a connecting line that fills continuously in proportion to real scroll position.' },
      { title: 'Company history trails', text: 'Pair with [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) for a longer story, where `rootMargin` shrinks the observer to the viewport\'s exact midpoint.' },
      { title: 'Documentation walkthroughs', text: 'Combine with [CSS scroll-driven progress](/ui-snippets/css-scroll-driven-progress/) so a rail shows the stage and a top bar shows the overall position.' },
      { icon: 'CODE', title: 'Related: Scroll Timeline Beam', desc: 'See the [Scroll Timeline Beam](/ui-snippets/scroll-timeline-beam/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does a waypoint know exactly when to light up?', a: `Each step section is observed by a single IntersectionObserver configured with rootMargin: '-50% 0px -50% 0px', which shrinks the observer's effective intersection area to a single line at the vertical center of the viewport. isIntersecting only becomes true the instant a step's element crosses that exact center line, so the waypoint lights up precisely when the reader is centered on that section, not as soon as it first appears at the bottom.` },
      { q: 'Why does the connecting line fill continuously instead of jumping between waypoints?', a: `The line fill is calculated separately from the waypoint lighting: on every scroll event it reads the combined height of the entire step sequence and computes what fraction of that height has been scrolled past the viewport's center, applying that fraction directly as the fill element's height percentage. Because it's a raw scroll-position ratio recalculated continuously, it visibly catches up while scrolling between two waypoints rather than staying pinned at the last lit stop.` },
      { q: 'Are the dots and the line the same calculation?', a: `No — they're intentionally two independent signals rendered into the same sidebar. The dots are discrete and driven by IntersectionObserver center-crossing events (each one only changes state once, when its step crosses center). The line fill is continuous and driven by a scroll-position percentage recalculated every scroll event. This separation is what lets the line feel fluid while the waypoints still feel like clear, discrete checkpoints.` },
      { q: 'Does the trail reverse correctly when scrolling back up?', a: `The line fill does, exactly and continuously, since it's recomputed fresh from the current scroll position on every event with no accumulated state. The waypoint dots as written stay lit once reached (a deliberate choice, similar to a completed-steps indicator) — if you want dots to also dim when scrolled back above their step, remove the isIntersecting-only branch and also handle the false case in the observer callback.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Render the rail and step sections with refs (or map from a shared array of step data so waypoints and sections can't drift out of sync), then in a mount effect create the IntersectionObserver with the same center rootMargin and attach the rAF-gated scroll listener for the fill calculation. Return a cleanup that disconnects the observer and removes the scroll listener.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI coding assistant like Claude and ask it to explain how rootMargin: '-50% 0px -50% 0px' changes an IntersectionObserver's behavior from "fires when any part of the target is visible" to "fires only when the target crosses the exact vertical center of the viewport" — the negative percentages shrink the observer's root area from both top and bottom simultaneously. It's also worth asking why the connecting line's fill is computed as an entirely separate scroll-position percentage rather than derived from which waypoints are lit, since that separation is what makes the line feel continuous while the dots stay discrete. Good follow-ups: ask it to make waypoints dim again when scrolled back above their step (currently they stay lit once reached), or to derive both the waypoints and steps from one shared array of step data so they can never drift out of sync when a step is added.`,
      prompt: `Build a "scroll progress journey trail" effect in plain HTML, CSS, and vanilla JavaScript (no libraries).

Requirements:
- A two-column layout: a sticky left sidebar rail (position: sticky) containing a vertical connecting line and several waypoint dot elements with labels, and a right-hand main column containing full-height narrative sections, one per waypoint, each with a matching id referenced by a data-target attribute on its waypoint.
- Use a single IntersectionObserver (not a scroll-position threshold comparison) configured with rootMargin set to shrink its effective intersection area to a thin line at the exact vertical center of the viewport (e.g. '-50% 0px -50% 0px'), observing each narrative section. When a section's isIntersecting becomes true (meaning it has crossed the viewport's center), add a "lit" class to its matching waypoint dot and label.
- Separately (not derived from the waypoint lighting), calculate a continuous line-fill percentage on scroll: measure the combined bounding height of the entire sequence of narrative sections, determine what fraction of that total height has been scrolled past relative to the viewport's vertical center, clamp it to 0-1, and set a fill element's height to that percentage. This must update continuously as a smooth percentage, not jump directly between waypoint stop-points.
- Gate the scroll-based fill calculation with a requestAnimationFrame flag so it runs at most once per frame.
- Confirm the two signals behave distinctly: the waypoint dots should light up in sequence as their exact matching section crosses the viewport's center, while the connecting line's fill should visibly continue to grow smoothly even while scrolling through the middle of a section between two waypoints, not just snap at each lit dot.`,
    },
  },
};

export default scrollProgressJourneyTrail;
