const staggerRevealScrollList = {
  id: 'stagger-reveal-scroll-list',
  title: 'Staggered Reveal on Scroll — IntersectionObserver, One Timer',
  lastmod: '2026-08-28',
  category: 'scroll',
  html: `<div class="demo">
  <p class="hint">Scroll down inside the box — cards reveal with a staggered delay ONLY the first time each one enters view, in the order they actually appear on screen.</p>
  <div class="scroll-box" id="scrollBox">
    <div class="reveal-card" data-index="0"><strong>Real-time sync</strong><p>Changes propagate to every connected client in under 100ms.</p></div>
    <div class="reveal-card" data-index="1"><strong>Granular permissions</strong><p>Control access down to individual fields, not just whole records.</p></div>
    <div class="reveal-card" data-index="2"><strong>Audit history</strong><p>Every change is logged with who, what, and when — permanently.</p></div>
    <div class="reveal-card" data-index="3"><strong>Offline-first</strong><p>Keep working with no connection; changes sync automatically once you're back online.</p></div>
    <div class="reveal-card" data-index="4"><strong>API access</strong><p>A full REST and webhook API for anything the UI doesn't cover yet.</p></div>
    <div class="reveal-card" data-index="5"><strong>SSO &amp; SCIM</strong><p>Enterprise-ready identity provisioning out of the box.</p></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 380px; max-width: 100%; display: flex; flex-direction: column; gap: 10px; }
.hint { font-size: 11.5px; color: #94a3b8; line-height: 1.6; }

.scroll-box { height: 320px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 14px; background: #fff; padding: 16px; display: flex; flex-direction: column; gap: 12px; }

.reveal-card { padding: 16px; border-radius: 12px; background: #f8fafc; border: 1px solid #f1f5f9; opacity: 0; transform: translateY(16px); transition: opacity 0.45s ease, transform 0.45s ease; }
.reveal-card.visible { opacity: 1; transform: translateY(0); }
.reveal-card strong { display: block; font-size: 13px; color: #111827; margin-bottom: 5px; }
.reveal-card p { font-size: 12px; color: #64748b; line-height: 1.6; }`,
  js: `const scrollBox = document.getElementById('scrollBox');
const cards = Array.from(document.querySelectorAll('.reveal-card'));

// Cards entering the viewport in a single scroll "batch" (several crossing
// the threshold within the same IntersectionObserver callback tick) should
// stagger their reveal in visual order, top to bottom — NOT all animate
// simultaneously (which looks abrupt) and not in whatever arbitrary order
// the observer happens to report them in (which can be inconsistent with
// their actual on-screen order). Sorting the batch by DOM index before
// applying the stagger delay is what guarantees the correct visual order.
const STAGGER_STEP_MS = 90;

const observer = new IntersectionObserver(
  (entries) => {
    const enteringNow = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => entry.target)
      .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));

    enteringNow.forEach((card, i) => {
      // Reveal each card in this batch with an increasing delay based on
      // its position WITHIN THIS BATCH, not its absolute index in the full
      // list — a card revealed on its own gets no artificial delay, while
      // several revealed together stagger relative to each other.
      setTimeout(() => {
        card.classList.add('visible');
      }, i * STAGGER_STEP_MS);

      // Stop observing once revealed — this is a one-time reveal-on-first-
      // view effect, not something that should re-trigger every time a card
      // scrolls in and out of view again.
      observer.unobserve(card);
    });
  },
  {
    root: scrollBox,
    threshold: 0.2, // a card must be at least 20% visible before it counts as "entered"
  }
);

cards.forEach((card) => observer.observe(card));`,
  seo: {
    title: 'Staggered Reveal on Scroll — Correct Batch Ordering with IntersectionObserver',
    description: 'A scroll-triggered reveal animation where cards entering the viewport together stagger in true visual (top-to-bottom) order rather than an arbitrary observer-reported order, using IntersectionObserver and one-time unobserve per element.',
    about: {
      title: 'Staggered Scroll Reveal — Getting Batch Order and Timing Right',
      description: `A staggered reveal-on-scroll effect — where list items fade in one after another rather than all at once — is a common, tasteful touch, but a naive implementation has a subtle bug: when a user scrolls fast enough that several elements cross into view within the same animation frame, \`IntersectionObserver\`'s callback receives all of them in a single \`entries\` array, and that array's order is not guaranteed to match their actual top-to-bottom visual order on screen. This snippet fixes that by explicitly sorting each batch before applying the stagger delay.

**Why the entries array can't be trusted for visual ordering**

\`IntersectionObserver\` reports every element whose intersection state changed since the last check, batched into one callback call — but the order of that \`entries\` array reflects internal observation bookkeeping, not necessarily the elements' visual top-to-bottom order. On a fast scroll where three or four cards cross the visibility threshold within the same tick, revealing them in whatever order \`entries\` happens to list them could easily animate the *third* card before the *first* — visually jarring and the opposite of what a "staggered top-to-bottom reveal" is supposed to look like.

**Sorting by a stored index, not relying on DOM traversal at animation time**

Each card carries a \`data-index\` attribute matching its actual position in the list. The observer callback filters down to just the entries that newly intersected, then explicitly \`.sort()\`s them by that numeric index before applying any stagger delay. This guarantees that whatever batch of cards enters view together, they always animate in true top-to-bottom order relative to *each other* — regardless of what order the browser happened to report them in internally.

**The stagger delay is relative to the batch, not the element's absolute position**

\`setTimeout(..., i * STAGGER_STEP_MS)\` uses \`i\`, the card's index *within the current batch* (after sorting) — not its absolute \`data-index\` in the full six-card list. This distinction matters: if a user scrolls slowly and only one card enters view at a time, that card should reveal immediately with no artificial delay (batch size of one, \`i = 0\`), not wait for a delay proportional to its absolute position in a much longer list. The stagger effect should only apply *relative to other cards entering at the same moment*, not accumulate across the whole page.

**\`unobserve()\` makes this a genuine one-time reveal, not a re-triggering animation**

The moment a card is scheduled to reveal, the code calls \`observer.unobserve(card)\` — removing it from further observation entirely. Without this, scrolling a revealed card back out of view and then back in would re-trigger \`isIntersecting: true\` again, replaying the fade-in animation every single time, which reads as a distracting, repetitive effect rather than the intended one-time "welcome to this content" reveal.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll slowly inside the box', text: 'Cards reveal one at a time with no artificial delay between them, since each enters its own separate observer batch.' },
        { title: 'Scroll quickly, several cards at once', text: 'Multiple cards enter the same batch and stagger their reveal relative to each other, always in correct top-to-bottom order regardless of how the browser internally reported them.' },
        { title: 'Scroll a revealed card back out and then back into view', text: 'It stays visible and does not replay its animation — observer.unobserve() makes this a genuine one-time reveal, not a re-triggering effect.' },
        { title: 'Adjust STAGGER_STEP_MS', text: 'Change this constant to make the stagger delay between cards in the same batch faster or slower.' },
        { title: 'Adjust the threshold option', text: 'Change 0.2 to control how much of a card must be visible before it counts as "entered" and becomes eligible for reveal.' },
      ],
    },
    features: [
      'Cards entering the viewport together are explicitly sorted into correct top-to-bottom order before staggering, not left in arbitrary observer order',
      'Stagger delay is relative to the current batch, not an element\'s absolute position in the full list — a lone entering card reveals with zero artificial delay',
      'Built entirely on IntersectionObserver — no scroll event listener or manual position math',
      'observer.unobserve() makes this a genuine one-time reveal, not a re-triggering animation on repeated scroll in/out',
      'Configurable stagger step timing and visibility threshold via two simple constants',
      'Works correctly regardless of scroll speed — slow scrolling and fast scrolling both produce visually correct staggering',
      'Smooth opacity and transform transition gives each reveal a subtle upward-motion entrance',
    ],
    useCases: [
      { icon: 'MARKETING', title: 'Feature list and landing page sections', desc: 'A tasteful, correctly-ordered staggered reveal for feature cards or benefit lists as a user scrolls down a marketing page.' },
      { icon: 'PORTFOLIO', title: 'Portfolio and case study galleries', desc: 'Project cards or case study previews revealing in visual order as a user scrolls through a portfolio page.' },
      { icon: 'CONTENT', title: 'Long-form content with list sections', desc: 'Any scrollable list or grid of cards where a staggered entrance adds polish without risking visually incorrect ordering on fast scrolls.' },
      { icon: 'DASHBOARD', title: 'Dashboard widget reveal on first load', desc: 'A row or grid of dashboard tiles that stagger into view once scrolled into the viewport, giving a polished first-impression load.' },
    ],
    faqs: [
      { q: 'Why can\'t the IntersectionObserver entries array be trusted for visual top-to-bottom order?', a: 'The entries array\'s order reflects internal observation bookkeeping, not necessarily the elements\' actual visual position on screen. On a fast scroll where several elements cross the visibility threshold within the same callback tick, their order in that array is not guaranteed to match their top-to-bottom order, which is why this pattern explicitly sorts by a stored index before staggering.' },
      { q: 'Why does the stagger delay use the batch-relative index instead of each card\'s absolute list position?', a: 'If the delay were based on absolute position, a single card entering view late in a long list (with nothing else nearby entering at the same time) would still wait an artificially long delay proportional to its position, rather than revealing immediately. Basing the delay on position within the CURRENT batch means a lone entering card always reveals instantly, and only cards entering together actually stagger relative to each other.' },
      { q: 'Does scrolling a card out of view and back in replay its reveal animation?', a: 'No — observer.unobserve(card) is called the moment a card is scheduled to reveal, permanently removing it from further observation. This makes the effect a genuine one-time "first view" reveal rather than something that replays every time the card happens to scroll in and out of the viewport again.' },
      { q: 'What does the threshold: 0.2 option control?', a: 'It sets how much of a card must actually be visible within the scroll container before IntersectionObserver reports it as intersecting — 0.2 means at least 20% of the card must be visible before it\'s eligible to be revealed, avoiding a reveal triggered by just a sliver of the card barely entering view.' },
      { q: 'What happens if I scroll extremely fast, past many cards at once?', a: 'All the cards that newly intersected since the last check arrive together in one entries array, get sorted into correct visual order, and stagger-reveal relative to each other using the same batch-relative delay logic — the pattern handles a large batch exactly the same way it handles a batch of one or two.' },
      { q: 'How would I make this re-trigger every time a card scrolls into view, instead of only once?', a: 'Remove the observer.unobserve(card) call, and additionally handle the entry.isIntersecting === false case by removing the "visible" class — this would turn it into a repeating scroll-in/scroll-out effect rather than a one-time reveal, though the batch-ordering and stagger-timing logic would remain unchanged.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain in detail why IntersectionObserver's entries array order isn't guaranteed to match visual DOM order, with a concrete example of a fast scroll producing an out-of-order batch, and why sorting by a stored index before staggering fixes it. It's also worth asking for a version that reveals items in a CSS grid (where "visual order" also depends on column position, not just a single vertical index), or one that adds a slight random jitter to the stagger delay for a less mechanically uniform reveal feel.`,
      prompt: `Build a staggered scroll-reveal animation for a list of cards in HTML, CSS, and vanilla JavaScript using IntersectionObserver — no scroll event listener, no external animation library.

Requirements:
- A vertically scrollable container with at least six cards, each starting invisible (opacity 0, slightly translated) and fading/sliding into view once scrolled into the viewport.
- Use one IntersectionObserver watching all the cards. Each card must carry a stored numeric index reflecting its true top-to-bottom position in the list.
- Whenever the observer's callback fires with multiple cards having newly entered the viewport within the same batch (simulating what happens on a fast scroll), the reveal animation must stagger them in CORRECT top-to-bottom visual order — explicitly sort the batch of newly-intersecting entries by their stored index before applying any stagger delay, since the raw order IntersectionObserver reports entries in is not guaranteed to match visual order.
- The stagger delay applied to each card in a batch must be based on that card's position WITHIN the current batch (so a card entering alone gets zero artificial delay), not on its absolute position in the full list of cards.
- Once a card has been revealed, it must stop being observed so that scrolling it back out of view and then back into view again does NOT replay its reveal animation — this must be a genuine one-time-per-card effect.
- Make the stagger delay amount and the visibility threshold both easily adjustable via named constants/options.`,
    },
  },
};

export default staggerRevealScrollList;
