const scrollCardFan = {
  id: 'scroll-card-fan',
  title: 'Scroll Card Fan',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="scf-top"><p>Scroll ↓</p></section>
<section class="scf-stage" id="scfStage">
  <div class="scf-heading">
    <h2>Pick a card</h2>
    <p>The deck fans open as you scroll.</p>
  </div>
  <div class="scf-deck" id="scfDeck">
    <div class="scf-card" style="--cc1:#6366f1;--cc2:#4338ca"><span>⚡</span><em>Speed</em></div>
    <div class="scf-card" style="--cc1:#a855f7;--cc2:#7e22ce"><span>🛡️</span><em>Security</em></div>
    <div class="scf-card" style="--cc1:#06b6d4;--cc2:#0e7490"><span>📈</span><em>Scale</em></div>
    <div class="scf-card" style="--cc1:#10b981;--cc2:#047857"><span>🧩</span><em>Plugins</em></div>
    <div class="scf-card" style="--cc1:#f59e0b;--cc2:#b45309"><span>🤝</span><em>Support</em></div>
  </div>
</section>
<section class="scf-bottom"><p>Scroll up to sweep the fan back into a deck.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.scf-top,.scf-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.scf-stage{position:relative;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8vh;overflow:hidden;background:radial-gradient(75% 65% at 50% 40%,#141936,#07080d)}
.scf-heading{text-align:center}
.scf-heading h2{font-size:clamp(28px,5vw,48px);font-weight:800;letter-spacing:-.02em}
.scf-heading p{color:#8a90a8;margin-top:8px;font-size:15px}
.scf-deck{position:relative;width:min(200px,44vw);aspect-ratio:5/7}
.scf-card{position:absolute;inset:0;border-radius:16px;background:linear-gradient(160deg,var(--cc1),var(--cc2));border:1px solid rgba(255,255,255,.18);box-shadow:0 24px 60px rgba(0,0,0,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;transform-origin:50% 130%;will-change:transform}
.scf-card span{font-size:42px}
.scf-card em{font-style:normal;font-weight:700;font-size:16px;letter-spacing:.04em}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var cards = gsap.utils.toArray('.scf-card');
var mid = (cards.length - 1) / 2;

// Slight resting offsets so the pile reads as a physical deck.
cards.forEach(function (card, i) {
  gsap.set(card, { rotation: (i - mid) * 1.5, y: -i * 2 });
});

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#scfStage',
    start: 'top top',
    end: '+=160%',
    scrub: 0.4,
    pin: true
  }
});

// Fan out: every card pivots around a point below the deck
// (transform-origin: 50% 130%), so rotation alone creates the arc.
cards.forEach(function (card, i) {
  var spread = i - mid; // -2 .. 2
  tl.to(card, {
    rotation: spread * 16,
    x: spread * 24,
    y: Math.abs(spread) * -6,
    ease: 'none'
  }, 0);
});

// A late lift on the center card gives the fan a focal point.
tl.to(cards[Math.round(mid)], { y: -34, scale: 1.06, ease: 'none' }, 0.75);`,

  seo: {
    title: 'Scroll Card Fan — Free GSAP Deck Spread Snippet',
    description: `A card deck that fans into an arc as you scroll: rotation around a shared low pivot spreads five cards, pinned and scrubbed. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Card Fan — Fan a Deck of Cards Open With the Scrollbar',
      description: `The scroll card fan takes a neat pile of cards and spreads it into a hand-of-cards arc as you scroll — the same gesture as fanning playing cards on a table, driven by the scrollbar and fully reversible. It's a compact way to introduce a set of features, plans, or categories with one satisfying motion. This snippet builds it with GSAP ScrollTrigger (from a CDN) and a single transform-origin trick.

**One low pivot point creates the entire arc**

Every card is absolutely stacked in the same box with \`transform-origin: 50% 130%\` — a pivot *below* the card's bottom edge. Rotating around that shared low point automatically swings each card outward and upward along a circular arc, exactly like cards pinched at one corner. Without the shifted origin you'd have to hand-calculate an x/y/rotation triple per card to fake the arc; with it, rotation alone does 90% of the work.

**Spread is computed from distance-to-center**

Each card's target rotation is \`(i − mid) × 16°\`, where \`mid\` is the middle index. The center card stays upright, neighbors lean ±16°, outer cards ±32° — a symmetric fan that works for any odd or even card count without editing the tween code. A small \`x: spread × 24\` widens the fan beyond what pure rotation gives, and \`y: |spread| × −6\` lifts outer cards slightly so their top corners align along the arc.

**The deck starts as a believable pile**

Before the trigger runs, \`gsap.set\` gives each card a resting offset — 1.5° of alternating rotation and 2px of vertical stagger. That messy-pile look matters: fanning from a mathematically perfect stack reads as sterile, while fanning from a slightly uneven pile reads as physical. Because these offsets are set as start values, the scrubbed tween interpolates from pile to fan and back without snapping.

**All cards animate at position 0, plus one accent later**

Every card's tween is placed at timeline position 0 so the whole fan opens as one gesture rather than card-by-card. Then, at 75% of the timeline, the center card lifts 34px and scales to 1.06 — a focal accent that lands only after the fan is mostly open, giving the sequence a beginning (spread) and an end (highlight) within one scroll.

**Pinned, scrubbed, and compositor-only**

The stage pins for \`+=160%\` with \`scrub: 0.4\`, so the fan opens exactly as far as you've scrolled and glides slightly after each wheel tick. Rotation, translation, and scale are all transforms — no layout or paint work — and \`will-change: transform\` promotes each card to its own layer up front, avoiding promotion jank mid-scroll.

**z-order comes free from source order**

Later cards in the DOM paint on top, so the rightmost card naturally overlaps leftward like a real right-handed fan. Reverse the DOM order (or set explicit z-indexes) to flip the overlap direction.

**The fanned cards stay fully interactive**

Nothing about pinning or scrubbing disables the DOM: the cards remain real elements at every scrub position, so links, hover states, and click handlers work mid-fan or fully open. ScrollTrigger's pin spacer wraps the stage without intercepting pointer events, and because the cards only carry transforms, their hit areas travel exactly with their rendered positions. A common production touch is enabling a lift-on-hover only once the fan is open — gate it by checking \`tl.progress() > 0.9\` in a pointerenter handler, or toggle a class from an \`onComplete\`-style position callback on the timeline.

**Customizing it**

Change the spread angle, card count (the \`mid\` math adapts), or make each card a link. Pair the fan with a [scroll sticky stack](/ui-snippets/scroll-sticky-stack/) for the section after, a [scroll 3d cards](/ui-snippets/scroll-3d-cards/) alternative entrance, or [stacked cards](/ui-snippets/stacked-cards/) for a hover-driven cousin.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Five cards stack into a slightly messy pile.` },
      { title: 'Scroll into the stage', text: `It pins and the deck begins fanning open.` },
      { title: 'Finish the scroll', text: `The center card lifts and scales as the focal point.` },
      { title: 'Scroll back up', text: `The fan sweeps back into the pile — fully scrubbed.` },
      { title: 'Add or restyle cards', text: `The distance-to-center math adapts to any count.` },
    ] },
    features: [
      { title: 'Low-pivot arc', text: `transform-origin below the card creates the fan.` },
      { title: 'Center-distance spread', text: `Rotation scales with each card's offset from mid.` },
      { title: 'Messy-pile start', text: `Resting offsets make the deck feel physical.` },
      { title: 'One-gesture open', text: `All cards tween from position 0 together.` },
      { title: 'Focal accent', text: `Center card lifts late in the timeline.` },
      { title: 'Pinned + scrubbed', text: `Fan progress tracks the scrollbar exactly.` },
      { title: 'Transform-only', text: `Rotation and translation, zero layout cost.` },
      { title: 'Count-agnostic', text: `Works with any number of cards unchanged.` },
    ],
    useCases: [
      { title: 'Feature intros', text: `Fan five value props open, then detail them with [sticky scroll features](/ui-snippets/scroll-sticky-features/).` },
      { title: 'Plan pickers', text: `Fan pricing tiers before a [pricing card](/ui-snippets/pricing-card/) section.` },
      { title: 'Portfolio decks', text: `Spread project cards; let a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/) carry the detail view.` },
      { title: 'Game and NFT sites', text: `Literal card reveals; add a [3d flip card](/ui-snippets/3d-flip-card/) on click.` },
      { title: 'Onboarding choices', text: `Fan the paths a user can take, echoing [stacked cards](/ui-snippets/stacked-cards/).` },
      { title: 'Section transitions', text: `Open the fan, then hand off to a [scroll sticky stack](/ui-snippets/scroll-sticky-stack/).` },
      { icon: 'CODE', title: 'Related: Scroll Chapter Sidebar Story', desc: 'See the [Scroll Chapter Sidebar Story](/ui-snippets/scroll-chapter-sidebar-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does rotation alone create the fan arc?', a: `Every card shares transform-origin: 50% 130% — a pivot below its bottom edge. Rotating around that low point swings the card outward and upward along a circle, like playing cards pinched at one corner. Without the shifted origin you would need hand-tuned x, y, and rotation per card to fake the same arc.` },
      { q: 'How is each card’s angle decided?', a: `From its distance to the center index: rotation is (i − mid) × 16°, so the middle card stays upright and outer cards lean the most, symmetrically. A small x shift widens the fan and a negative y proportional to |spread| aligns the top corners along the arc. Change one multiplier to open or tighten the whole fan.` },
      { q: 'Can I use more or fewer cards?', a: `Yes — add or remove .scf-card elements and everything adapts, because mid is computed as (count − 1) / 2 and every tween derives from distance-to-center. For big decks, lower the 16° multiplier (for example 60° total divided by count) so outer cards don't rotate past legibility, and consider raising the pinned end distance.` },
      { q: 'Why do the cards start slightly rotated instead of perfectly stacked?', a: `gsap.set gives each card 1.5° of alternating tilt and a 2px vertical stagger before the trigger runs. A mathematically perfect stack fans open looking sterile; a slightly uneven pile reads as a physical deck. Since these are start values, the scrubbed tween interpolates smoothly from pile to fan and back without any snap.` },
      { q: 'Are the cards still clickable once the fan is open?', a: `Fully — pinning and scrubbing never disable the DOM, and transform-only animation means each card's hit area travels with its rendered position. Wrap card contents in anchors or attach click handlers as usual. To add hover lifts only after the fan opens, gate the effect on tl.progress() > 0.9 so a half-open deck doesn't respond like a finished layout.` },
      { q: 'How do I use this scroll card fan in React, Vue, or Angular?', a: `Render cards from an array, then build the set() offsets and timeline in a mount effect (useEffect, onMounted, or ngAfterViewInit) inside gsap.context scoped to a container ref, reverting it in the cleanup so the pin unregisters on unmount. Compute mid from the array length so adding data adds cards. Card visuals translate directly to Tailwind gradient and shadow utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer the pivot math by staring at the transform values. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting transform-origin to 50% 130% on every card is what turns a plain rotation into a convincing fan arc, or why the spread angle is computed from each card's distance to the middle index rather than hardcoded per card. The same assistant can help you optimize it — checking whether the per-card gsap.set calls that establish the resting pile could be batched, or whether a much larger deck (dozens of cards) would need a cheaper approach than tweening every card at timeline position 0. It's also useful for extending the effect: ask it to make each card a clickable link that pauses the fan on hover, add a shuffle-and-redeal animation before the fan opens, or drive the deck's card count and colors from a data array instead of static markup. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll card fan" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A stack of absolutely-positioned cards inside one container, all sharing the same box, with transform-origin set to a point below the card's bottom edge (e.g. 50% 130%) so rotation alone produces an outward-and-upward fanning arc rather than a flat spin in place.
- Before any scroll animation runs, give each card a small resting offset (a few degrees of alternating rotation and a couple of pixels of vertical stagger via gsap.set) so the closed pile looks like a physical stack of cards rather than a perfectly aligned block.
- Compute a middle index from the card count, then for every card calculate its rotation as a function of its distance from that middle index (so the center card stays upright and cards further from center lean progressively more, symmetrically in both directions), plus a horizontal x offset and a small vertical y lift that also scale with that same distance value.
- All card tweens must start at the same timeline position (position 0) so the entire fan opens as one synchronized gesture, not a staggered card-by-card reveal.
- Add one additional tween, later in the timeline (e.g. at 75% progress), that lifts and slightly scales up only the center card as a focal accent once the fan is mostly open.
- Wire the whole timeline to a pinned, scrubbed ScrollTrigger so the fan's openness tracks the scrollbar exactly and reverses cleanly back into a pile on scroll-up.
- Keep every animated property a transform (rotation, x, y, scale) with no width/height/layout properties involved, and confirm the cards remain fully clickable at every scrub position since nothing in the pin or scrub should disable pointer events.`,
    },
  },
};

export default scrollCardFan;
