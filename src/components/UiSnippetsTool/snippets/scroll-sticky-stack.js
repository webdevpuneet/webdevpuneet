const scrollStickyStack = {
  id: 'scroll-sticky-stack',
  title: 'Scroll Sticky Stack',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ss-intro"><h1>Scroll ↓</h1><p>Cards stack and shrink as the next slides over.</p></section>
<section class="ss-stack" id="ssStack">
  <article class="ss-card" style="--b:#6366f1"><span>01</span><h3>Capture</h3><p>Collect events from anywhere with one SDK.</p></article>
  <article class="ss-card" style="--b:#0ea5e9"><span>02</span><h3>Process</h3><p>Transform streams in real time, no servers.</p></article>
  <article class="ss-card" style="--b:#10b981"><span>03</span><h3>Visualize</h3><p>Live dashboards your whole team can read.</p></article>
  <article class="ss-card" style="--b:#f59e0b"><span>04</span><h3>Act</h3><p>Trigger alerts and workflows automatically.</p></article>
</section>
<section class="ss-outro"><p>A pinned, shrinking card stack.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b13;color:#fff}
.ss-intro,.ss-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.ss-intro h1{font-size:clamp(34px,7vw,68px);letter-spacing:-.02em}
.ss-intro p,.ss-outro p{color:#9aa0b8;font-size:16px}
.ss-stack{max-width:680px;margin:0 auto;padding:0 24px}
.ss-card{position:sticky;top:14vh;height:64vh;margin-bottom:8vh;border-radius:26px;padding:clamp(28px,5vw,56px);display:flex;flex-direction:column;justify-content:center;gap:12px;transform-origin:50% 0;will-change:transform;filter:brightness(1);background:radial-gradient(90% 90% at 20% 10%,color-mix(in srgb,var(--b) 60%,#0a0b13),#0d0f1a);border:1px solid color-mix(in srgb,var(--b) 45%,#0a0b13);box-shadow:0 -10px 40px rgba(0,0,0,.3)}
.ss-card span{font-size:14px;font-weight:800;letter-spacing:.2em;color:color-mix(in srgb,var(--b) 60%,#fff)}
.ss-card h3{font-size:clamp(28px,5vw,52px);letter-spacing:-.02em}
.ss-card p{color:#c6ccdd;font-size:clamp(15px,2.2vw,19px);max-width:420px;line-height:1.55}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var cards = gsap.utils.toArray('.ss-card');

// As each card is overtaken by the next, scale & dim it so it recedes into the stack.
cards.forEach(function (card, i) {
  if (i === cards.length - 1) return; // last card never gets covered
  gsap.to(card, {
    scale: 0.86,
    filter: 'brightness(0.6)',
    ease: 'none',
    scrollTrigger: {
      trigger: cards[i + 1],
      start: 'top bottom',  // next card begins to enter
      // The trigger card is ALSO position: sticky with the same top offset,
      // so it can never actually reach literal viewport-top (0) -- it
      // freezes at that shared offset once stuck. 'top top' asked for a
      // position sticky structurally can't reach, so the scrub overshot
      // past 1 and the brightness/scale extrapolated well past their
      // intended floor. 'top 14vh' matches the real full-coverage moment:
      // when the next card reaches ITS OWN stuck position.
      end: 'top 14%',
      scrub: true
    }
  });
});`,

  seo: {
    title: 'Scroll Sticky Stack — Free GSAP ScrollTrigger Stacking Cards',
    description: `Sticky cards that shrink and dim as the next card slides over them on scroll, building a layered stack with GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Sticky Stack — Cards That Recede as the Next Slides Over',
      description: `The scroll sticky stack is the popular effect where full-height cards pin one after another and each shrinks and darkens as the following card slides up to cover it, building a tidy deck instead of scrolling away — the storytelling layout from modern product pages. This snippet combines CSS \`position: sticky\` with GSAP ScrollTrigger (from a CDN).

**Sticky does the stacking**

Each card is \`position: sticky\` with the same \`top\` offset, so as you scroll, a card sticks at that position while the next card scrolls up underneath the previous one's bottom and eventually pins over it. CSS sticky alone produces the overlap for free — no JavaScript needed for the pinning. The cards share a top value so they land in the same place and pile up.

**GSAP adds the depth**

Sticky alone would just stack flat cards; the recession comes from GSAP. For each card, a tween scales it to 0.86 and dims it with \`filter: brightness(0.6)\`, driven by a ScrollTrigger whose trigger is the next card. So a card only shrinks while the card after it is moving up to cover it — \`start: 'top bottom'\` (next card enters) to \`end: 'top top'\` (next card fully overlaps). The result is each card visibly sinking back as it's buried, giving the stack real depth.

**Triggering off the next element**

The key idea is that each card's animation is keyed to the next card's scroll position, not its own. That's what synchronizes the shrink with the cover: the card behind reaches full small-and-dim exactly when the card in front has completely overlapped it. \`transform-origin: 50% 0\` scales each card from its top edge so it shrinks toward where it's pinned, keeping the top aligned as it recedes.

**Scrubbed and reversible**

\`scrub: true\` and \`ease: 'none'\` tie the scale and brightness directly to scroll, so scrolling back up brings each buried card forward again — it grows and brightens as the covering card retreats. Nothing plays on a fixed timeline, so the stack is fully reversible and always matches the scroll position.

**Cheap and smooth**

The animation only changes \`transform\` and \`filter\`, both GPU-friendly, and the last card is skipped since nothing ever covers it. Because sticky handles layout and GSAP only animates compositor properties, the effect stays smooth with any number of cards.

**Customizing it**

Add cards (each with its own accent), change how small or dim they get, adjust the sticky \`top\` and card heights, or add a slight \`y\` offset for a fanned look. Pair it with [stacking scroll cards](/ui-snippets/stacking-scroll-cards/), a [scroll pin steps](/ui-snippets/scroll-pin-steps/) panel, or [scroll 3d cards](/ui-snippets/scroll-3d-cards/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Four tall cards render in a stack.` },
      { title: 'Scroll down', text: `Each card pins, then shrinks as the next covers it.` },
      { title: 'Scroll back up', text: `Buried cards grow and brighten again.` },
      { title: 'Add a card', text: `Drop in another .ss-card with an accent.` },
      { title: 'Tune the recede', text: `Change the scale and brightness targets.` },
    ] },
    features: [
      { title: 'CSS sticky stacking', text: `Cards pin and overlap with no JS.` },
      { title: 'GSAP recession', text: `Scale and brightness add depth.` },
      { title: 'Next-card trigger', text: `Shrink syncs with the covering card.` },
      { title: 'Top-edge origin', text: `Cards shrink toward where they pin.` },
      { title: 'Scrubbed + reversible', text: `Recede ties to scroll both ways.` },
      { title: 'GPU properties', text: `Only transform and filter animate.` },
      { title: 'Last-card skip', text: `Uncovered card never shrinks.` },
      { title: 'Any card count', text: `Works for as many as you add.` },
    ],
    useCases: [
      { title: 'Product step stacks', text: 'Layer full-height cards that pin and cover one another, as a cousin of [stacking scroll cards](/ui-snippets/stacking-scroll-cards/) using CSS sticky for the overlap.' },
      { title: 'How it works sequences', text: 'Pair with [scroll pin steps](/ui-snippets/scroll-pin-steps/) so one section swaps content in place while another builds a deck.' },
      { title: 'Feature stories', text: 'Stack [feature cards](/ui-snippets/feature-cards/), with each card shrinking toward its pinned top edge and darkening as the next slides over it.' },
      { title: 'Case study panels', text: 'Layer project panels beside a [team card](/ui-snippets/team-card/), with GSAP scale and brightness adding depth to the recession.' },
      { title: 'Pricing tier decks', text: 'Stack [pricing card](/ui-snippets/pricing-card/) tiers one after another, or lead into [scroll 3D cards](/ui-snippets/scroll-3d-cards/) for a more dimensional follow-up.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Asteroid Belt Run', desc: 'See the [Three.js Scroll Asteroid Belt Run](/ui-snippets/three-scroll-asteroid-belt/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What creates the stacking — CSS or GSAP?', a: `CSS does the stacking: each card is position: sticky with the same top offset, so a card sticks while the next scrolls up and pins over it. That overlap is free, with no JavaScript. GSAP adds only the depth — scaling and dimming each card as it is covered — so the two work together.` },
      { q: 'How is the shrink synchronized with the next card covering it?', a: `Each card's tween is triggered by the next card, not itself: from start: top bottom (the next card enters) to end: top top (the next card fully overlaps). So a card reaches its smallest, dimmest state exactly when the card in front has completely covered it, which is what makes the recession read correctly.` },
      { q: 'Why scale from the top edge?', a: `transform-origin: 50% 0 scales each card from its top, which is where it pins. As the card shrinks it stays aligned to its sticky position instead of drifting toward its center, so it cleanly recedes behind the covering card with the top edges matching.` },
      { q: 'Is the effect reversible?', a: `Yes. scrub: true and ease: none tie the scale and brightness directly to scroll, so scrolling up brings each buried card forward again — it grows and brightens as the covering card retreats. Nothing plays on a fixed timeline, so the whole stack tracks scroll position in both directions.` },
      { q: 'How do I use this scroll sticky stack in React, Vue, or Angular?', a: `Render the cards with position: sticky in CSS, then in a mount effect register ScrollTrigger and loop the card refs, creating each tween triggered by the next card. Return a cleanup that reverts the GSAP context. If cards are dynamic, refresh ScrollTrigger after they render. The sticky CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the trigger-off-the-next-card trick alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each card's shrink-and-dim tween is keyed to the next card's ScrollTrigger rather than its own scroll position, or why transform-origin: 50% 0 is essential for the recession to look correct against a sticky top offset. The same assistant can help optimize it — asking whether the 0.86 scale and brightness(0.6) targets should vary per card for a more dramatic deep stack, or whether the last-card skip logic would need adjusting if cards were added or removed dynamically. It's also useful for extending the effect: ask it to add a slight rotation or horizontal offset as each card recedes for a fanned-deck look, layer a subtle box-shadow growth as cards go further back, or make the stack pause on a specific card when linked to from an anchor. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll sticky stack" card effect in plain HTML, CSS, and JavaScript using CSS position: sticky for the stacking and GSAP with its ScrollTrigger plugin (load both from a CDN) only for the depth/recession animation.

Requirements:
- A vertical sequence of full-height card elements, each using position: sticky with the exact same top offset value, so CSS alone causes each card to pin in place while the next one scrolls up and overlaps it — no JavaScript should be responsible for the stacking/pinning itself.
- Give every card transform-origin: 50% 0 (scaling from its top edge, not its center), since it is pinned at a fixed top offset and must shrink toward that same point to look anchored rather than drifting.
- For every card except the very last one (which nothing ever covers, so it must be skipped), create a GSAP tween that scales it down to roughly 0.86 and dims it using a CSS filter brightness value less than 1.
- Critically, each of those tweens' ScrollTrigger must use the NEXT card in the sequence as its trigger element (not the card being animated itself), starting when the next card's top reaches the bottom of the viewport and ending when the next card's top reaches the top of the viewport — so a card only recedes exactly while the card behind it is sliding up to cover it.
- Use scrub: true and ease: none on every tween so the recession is scrubbed directly to scroll position in both directions, meaning scrolling back up must bring a buried card forward again (growing and brightening) as the covering card retreats, with no separate reverse code.
- Only animate transform (scale) and filter (brightness) properties, both GPU-friendly, so the effect stays smooth regardless of how many cards are in the stack.`,
    },
  },
};

export default scrollStickyStack;
