const scrollYearTimeline = {
  id: 'scroll-year-timeline',
  title: 'Scroll Year Timeline',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="syt-top"><p>Scroll ↓</p></section>
<section class="syt-stage" id="sytStage">
  <div class="syt-year" id="sytYear">1998</div>
  <div class="syt-cards">
    <div class="syt-card" id="sytCard0"><span>🏢</span><h3>Founded in a garage</h3><p>Two people, one borrowed server, and a name nobody could pronounce.</p></div>
    <div class="syt-card" id="sytCard1"><span>🚀</span><h3>The breakout product</h3><p>Version 3 landed and revenue went vertical for eleven straight quarters.</p></div>
    <div class="syt-card" id="sytCard2"><span>🌍</span><h3>Going global</h3><p>Offices on four continents and the platform's first billion requests a day.</p></div>
  </div>
  <div class="syt-rail"><div class="syt-fill" id="sytFill"></div></div>
  <div class="syt-ticks"><span>1998</span><span>2010</span><span>2026</span></div>
</section>
<section class="syt-bottom"><p>28 years scrubbed by one scrollbar.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.syt-top,.syt-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.syt-stage{position:relative;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5vh;overflow:hidden;background:radial-gradient(75% 65% at 50% 40%,#131834,#07080d);padding:0 22px}
.syt-year{font-size:clamp(80px,18vw,190px);font-weight:800;letter-spacing:-.04em;line-height:1;font-variant-numeric:tabular-nums;background:linear-gradient(120deg,#a5b4fc,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.syt-cards{position:relative;width:min(460px,90vw);min-height:150px}
.syt-card{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:20px;border-radius:16px;background:#0d1122;border:1px solid rgba(255,255,255,.09);opacity:0;will-change:transform,opacity}
.syt-card span{font-size:30px}
.syt-card h3{font-size:19px;font-weight:800;letter-spacing:-.01em}
.syt-card p{color:#aeb4ca;font-size:14px;line-height:1.6}
.syt-rail{width:min(460px,90vw);height:4px;border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden}
.syt-fill{height:100%;width:0%;border-radius:inherit;background:linear-gradient(90deg,#818cf8,#22d3ee)}
.syt-ticks{display:flex;justify-content:space-between;width:min(460px,90vw);font-size:12px;letter-spacing:.1em;color:#8a90a8;font-variant-numeric:tabular-nums}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var START = 1998, END = 2026;
var yearEl = document.getElementById('sytYear');
var fillEl = document.getElementById('sytFill');
var CARDS = 3;

var counter = { y: START };

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#sytStage',
    start: 'top top',
    end: '+=250%',
    scrub: 0.4,
    pin: true
  }
});

// The odometer: one tween drives the year and the rail together.
tl.to(counter, {
  y: END,
  ease: 'none',
  duration: CARDS,
  onUpdate: function () {
    yearEl.textContent = Math.round(counter.y);
    fillEl.style.width = ((counter.y - START) / (END - START) * 100) + '%';
  }
}, 0);

// Era cards: each owns one third of the timeline, with crossfade handoffs.
for (var i = 0; i < CARDS; i++) {
  var card = '#sytCard' + i;
  tl.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, i === 0 ? 0 : i - 0.15);
  if (i < CARDS - 1) {
    tl.to(card, { opacity: 0, y: -30, duration: 0.3, ease: 'none' }, i + 0.85);
  }
}`,

  seo: {
    title: 'Scroll Year Timeline — Free GSAP Scrub Counter Snippet',
    description: `A giant year counter scrubbed from 1998 to 2026 by scrolling, with era cards crossfading and a progress rail filling in sync. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Year Timeline — Scrub Through Decades With a Giant Year Counter',
      description: `The scroll year timeline turns company-history sections into a time machine: a giant year counter scrubs from 1998 to 2026 as you scroll, era cards crossfade beneath it as their years arrive, and a rail fills to show where you are in the span. Scrolling up literally rewinds history. This snippet builds it with GSAP ScrollTrigger (from a CDN), a numeric proxy odometer, and one shared timeline.

**The year is a tweened number, not an animation**

GSAP tweens a proxy object's \`y\` property from 1998 to 2026; \`onUpdate\` rounds it and writes \`textContent\`. Tweens interpolate any numeric property — not just CSS — so the year counter is just math surfaced into the DOM. \`Math.round\` (rather than floor) keeps forward and backward scrubbing symmetric around each year boundary, and \`font-variant-numeric: tabular-nums\` locks digit widths so the giant number doesn't shudder horizontally as digits flip.

**One tween drives the counter and the rail together**

The same \`onUpdate\` that writes the year also sets the rail's width from \`(y − START) / (END − START)\`. Deriving both from one interpolated value means the number and the progress bar can't disagree — a classic scrollytelling bug when two separate animations drift by a frame or two under fast scrubbing.

**Era cards own equal thirds of the timeline**

The counter tween's duration is set to \`CARDS\` (3 units), and each card fades in around position \`i\` and out at \`i + 0.85\`. Since the counter spans those same 3 units linearly, card boundaries land at exact years: card two appears as the counter passes ~2007, card three at ~2017. Change \`START\`/\`END\` or the card count and the year-to-card mapping recomputes itself — no hand-synced year constants anywhere.

**Crossfades overlap, entrance leads exit**

Each card enters at \`i − 0.15\` while the previous card exits at \`(i−1) + 0.85\` — a 0.3-unit overlap where both are semi-visible, moving through each other vertically (incoming rises from +30, outgoing lifts to −30). That continuous hand-off reads as eras flowing into each other rather than slides being swapped, and it stays coherent when scrubbed backward because both tweens live on the same timeline.

**Pinned for a deliberate 250% journey**

The stage pins for 2.5 viewport-heights, giving 28 years roughly 20px of scroll per year — slow enough that milestone years are visible as they tick past, fast enough that the section doesn't overstay. \`scrub: 0.4\` smooths wheel detents into a continuous time-slide.

**Gradient text via background-clip**

The year uses the \`background-clip: text\` trick — an indigo-to-cyan gradient painted through transparent glyphs — which survives the per-frame text rewrites because only the node's text content changes, never its styles.

**Customizing it**

Set \`START\`/\`END\` to your company's span, add cards (the mapping adapts), or swap cards for images per era. Related patterns: a [scroll timeline dots](/ui-snippets/scroll-timeline-dots/) rail for event-based histories, [count up](/ui-snippets/count-up/) for viewport-triggered counters, a [scrollytelling chart](/ui-snippets/scroll-story-chart/) when eras carry data, and a [vertical timeline](/ui-snippets/vertical-timeline/) for the static fallback.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `The stage renders at 1998 with the first era card.` },
      { title: 'Scroll into the stage', text: `It pins and the year begins counting upward.` },
      { title: 'Watch the handoffs', text: `Era cards crossfade as their years arrive.` },
      { title: 'Scroll back up', text: `History rewinds — counter, rail, and cards together.` },
      { title: 'Set your own span', text: `Change START, END, and the era cards.` },
    ] },
    features: [
      { title: 'Scrubbed odometer', text: `A proxy number becomes the year display.` },
      { title: 'Single source of truth', text: `Counter and rail derive from one tween.` },
      { title: 'Auto year mapping', text: `Card boundaries land on computed years.` },
      { title: 'Flowing crossfades', text: `Eras hand off with overlapping motion.` },
      { title: 'Tabular digits', text: `The giant number never jitters in width.` },
      { title: 'Gradient headline', text: `background-clip paints the year.` },
      { title: 'Pinned journey', text: `28 years mapped across 250% of scroll.` },
      { title: 'Fully reversible', text: `Scrolling up rewinds the decades.` },
    ],
    useCases: [
      { title: 'Company history pages', text: 'Scrub from the founding to today with a giant year counter, next to a [vertical timeline](/ui-snippets/vertical-timeline/) that lists the detail of each milestone.' },
      { title: 'Anniversary campaigns', text: 'Celebrate 25 years interactively, ending with a [confetti celebration card](/ui-snippets/confetti-celebration-card/) when the counter reaches the present year.' },
      { title: 'Product evolution stories', text: 'Walk through version history by year, pairing each era card with a [scroll phone screens](/ui-snippets/scroll-phone-screens/) view of how the interface looked then.' },
      { title: 'Data histories', text: 'Attach numbers to eras with a [scroll story chart](/ui-snippets/scroll-story-chart/), where a proxy number tweened by scroll becomes the year display.' },
      { title: 'Museum and event retrospectives', text: 'Run decade-by-decade exhibitions or rewindable recaps inside a [scroll pin story](/ui-snippets/scroll-pin-story/), or compare with [scroll timeline dots](/ui-snippets/scroll-timeline-dots/).' },
    ],
    faqs: [
      { q: 'How does the year number count with the scroll?', a: `GSAP tweens a plain object's y property from START to END on a pinned, scrubbed trigger; onUpdate rounds it into textContent. Tweens interpolate any numeric property, so the counter is pure math surfaced to the DOM. Rounding (not flooring) keeps year boundaries symmetric whether you scrub forward or backward.` },
      { q: 'How do the era cards know when to appear?', a: `The counter tween's duration equals the card count, so timeline position i corresponds linearly to a computed year. Each card fades in around position i and out at i + 0.85 on the same timeline — meaning card changes land at exact fractions of the year span, and changing START, END, or the card count remaps everything automatically.` },
      { q: 'Why don’t the counter and progress rail ever drift apart?', a: `Both are written in the same onUpdate from the same interpolated value: the year is Math.round(y) and the rail width is (y − START)/(END − START). With one source value there's no second animation to fall out of phase — the classic scrollytelling drift bug can't occur.` },
      { q: 'Why doesn’t the giant number wobble as digits change?', a: `font-variant-numeric: tabular-nums renders every digit at equal width, so 1999 → 2000 doesn't reflow the glyph box. Without it, proportional digits (1 being narrow) make the number visibly breathe during fast scrubs. The gradient survives rewrites because background-clip: text is a style on the element, and only its text content changes.` },
      { q: 'How do I use this scroll year timeline in React, Vue, or Angular?', a: `Keep the counter as a ref write, not framework state — setting state 60 times a second would re-render per scroll tick. Build the timeline in a mount effect (useEffect, onMounted, ngAfterViewInit) inside gsap.context scoped to the stage ref and revert on cleanup so the pin unregisters. Era cards can render from an array; layout and the gradient text map directly to Tailwind utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the proxy-object tweening or the card-to-year mapping by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how tweening a plain counter object's y property lets a non-CSS value like a year number get scrubbed by ScrollTrigger, and why the timeline's duration is deliberately set equal to the card count. The same assistant can help optimize it — checking whether writing textContent on every onUpdate tick could be batched or whether it is already cheap enough at typical scrub rates, or whether Math.round versus Math.floor actually matters for how symmetric the reverse-scrub feels. It is just as useful for extending the effect: ask it to attach a small data point or stat to each era card that counts up alongside the year, support a non-linear timeline where some decades get more scroll budget than others, or add a background color shift keyed to the same counter value. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll year timeline" odometer effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A pinned stage showing a giant year number, a row of era cards stacked on top of each other (absolutely positioned so only one is visible at a time), and a thin progress rail beneath them.
- Tween a plain JavaScript object's numeric property (not a DOM element) from a start year to an end year using ease: none, and in that tween's onUpdate callback, round the current value and write it into the year element's textContent, and separately compute (currentValue - startYear) / (endYear - startYear) as a percentage and set that as the progress rail's width — both derived from the exact same interpolated value in the same callback, not from two independent tweens, so they can never drift apart.
- Set the counter tween's duration equal to the number of era cards (for example 3), and add each era card's enter/exit animation at fractional positions relative to its index on that same timeline (entering around position i, exiting around i + 0.85), so each card's screen time corresponds to an equal, automatically-computed fraction of the year range with no hardcoded year-to-card mapping.
- Card transitions must overlap slightly, with the incoming card's fade/rise beginning before the outgoing card's fade/fall finishes, so eras hand off with a brief crossfade rather than a hard cut.
- Apply font-variant-numeric: tabular-nums to the year element so the digits do not change width as they change, preventing the large number from jittering horizontally during fast scrubbing.
- The whole timeline must be scrubbed and fully reversible, with the pinned stage spanning a fixed multiple of the viewport height (for example 250%) regardless of how many years the range spans.`,
    },
  },
};

export default scrollYearTimeline;
