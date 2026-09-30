const scrollRevealStaggerColumns = {
  id: 'scroll-reveal-stagger-columns',
  title: 'Direction-Aware Grid Reveal (IntersectionObserver)',
  category: 'scroll',
  html: `<div class="dgr-page">
  <p class="dgr-hint">Scroll down. Left-column cards slide in from the left, right-column cards slide in from the right, and the middle column rises from below — one shared IntersectionObserver, each card's own direction read from a data attribute.</p>
  <div class="dgr-grid">
    <div class="dgr-card" data-from="left"><h3>Plan</h3><p>Scope the work before writing a line of code.</p></div>
    <div class="dgr-card" data-from="up"><h3>Design</h3><p>Sketch the interface and the data model together.</p></div>
    <div class="dgr-card" data-from="right"><h3>Build</h3><p>Ship the smallest version that proves the idea.</p></div>
    <div class="dgr-card" data-from="left"><h3>Test</h3><p>Catch regressions before your users do.</p></div>
    <div class="dgr-card" data-from="up"><h3>Launch</h3><p>Release behind a flag, then widen the rollout.</p></div>
    <div class="dgr-card" data-from="right"><h3>Learn</h3><p>Watch real usage and feed it back into planning.</p></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f1117; color: #e8eaf0; }

.dgr-page { max-width: 900px; margin: 0 auto; padding: 20vh 24px 40vh; }
.dgr-hint { text-align: center; color: #7d8394; font-size: 14px; max-width: 480px; margin: 0 auto 44px; line-height: 1.7; }

.dgr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.dgr-card {
  background: #171a23; border: 1px solid #262b38; border-radius: 14px; padding: 26px 22px;
  opacity: 0; transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.dgr-card[data-from="left"]  { transform: translateX(-40px); }
.dgr-card[data-from="right"] { transform: translateX(40px); }
.dgr-card[data-from="up"]    { transform: translateY(28px); }
.dgr-card.dgr-visible { opacity: 1; transform: translate(0, 0); }

.dgr-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 8px; color: #f4f5f9; }
.dgr-card p  { font-size: 13.5px; color: #9096a8; line-height: 1.6; }

@media (max-width: 640px) { .dgr-grid { grid-template-columns: 1fr; } }

@media (prefers-reduced-motion: reduce) {
  .dgr-card { transition: opacity 0.3s ease; transform: none !important; }
}`,
  js: `const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = reduceMotion ? 0 : Array.from(el.parentElement.children).indexOf(el) % 3 * 90;
    setTimeout(() => el.classList.add('dgr-visible'), delay);
    observer.unobserve(el);
  });
}, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.dgr-card').forEach((el) => observer.observe(el));`,
  seo: {
    title: 'Direction-Aware Grid Reveal on Scroll — IntersectionObserver',
    description: 'A card grid where each card slides in from its own direction — left, right, or up — read from a data attribute, driven by one shared IntersectionObserver with a row-based stagger. Requires JavaScript. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Direction-Aware Grid Reveal — Per-Card Slide Direction via IntersectionObserver',
      description: `The standard scroll reveal — every element fading up from the same fixed offset, as in [Reveal on Scroll](/ui-snippets/reveal-on-scroll/) — reads as slightly mechanical once a grid has more than a handful of items, because every card performs an identical motion. This variant keeps the same underlying single-observer pattern but lets each card declare its own entrance direction through a plain \`data-from\` attribute, so a three-column grid can have its left column slide in from the left, its right column slide in from the right, and its middle column simply rise from below — motion that visually converges toward the grid's center rather than marching uniformly in one direction.

**Direction as data, not as a hardcoded class per card**

Each \`.dgr-card\` carries \`data-from="left"\`, \`data-from="right"\`, or \`data-from="up"\`. The CSS then keys off that attribute directly — \`.dgr-card[data-from="left"] { transform: translateX(-40px) }\` and so on — so the JavaScript never needs to know or branch on direction at all; it only ever toggles a single \`.dgr-visible\` class, and the attribute selector supplies the starting offset. This keeps the observer callback identical to a plain single-direction reveal while giving markup-level control over per-card motion.

**A row-based stagger computed from DOM position, not a hardcoded delay**

Rather than hand-authoring a \`transition-delay\` inline style on every card (as in the simplest reveal-on-scroll pattern), the delay here is computed at trigger time: \`Array.from(el.parentElement.children).indexOf(el) % 3 * 90\` finds the card's index among its siblings, takes it modulo 3 (the column count), and multiplies by \`90ms\`. This staggers cards left-to-right within whichever row is currently entering the viewport, without needing to know in advance how many rows the grid will end up having — add or remove cards and the stagger still lines up correctly by column position.

**Why setTimeout instead of a CSS transition-delay per card**

Because the stagger delay is computed dynamically from DOM position rather than known in advance, applying it via \`el.style.transitionDelay\` before adding \`.dgr-visible\` would work equally well — this snippet uses \`setTimeout\` to defer adding the class instead, which is a small implementation choice with an equivalent visual result; either approach avoids hardcoding delay values into the markup.

**rootMargin shifts the trigger point earlier**

\`{ threshold: 0.2, rootMargin: '0px 0px -60px 0px' }\` shrinks the observer's effective viewport by \`60px\` from the bottom, so cards must scroll slightly further up before they're considered "intersecting" — this avoids the reveal firing the instant a card's top pixel touches the very bottom edge of the screen, which can look premature on tall viewports.

**Respecting prefers-reduced-motion**

The reduced-motion check happens once up front and, when true, both zeroes the computed stagger delay and lets a \`prefers-reduced-motion\` media query in the CSS strip the \`transform\` entirely (\`!important\` overriding the direction-specific starting offsets) — cards still fade in via opacity, but never slide, for users who have asked for reduced motion.

**Customizing it**

Add a fourth direction like \`data-from="down"\` with its own attribute selector and starting \`transform\`, change the \`% 3\` in the stagger calculation to match a different column count, or swap \`translate\` for a \`scale\`-based entrance per card. Pair it with a [Bento Grid](/ui-snippets/bento-grid/) or [Feature Cards](/ui-snippets/feature-cards/) layout for a more dynamic feature showcase entrance.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Scroll the grid into view', text: `Left-column cards slide from the left, right-column cards from the right, middle cards rise from below.` },
      { title: 'Add a new card', text: `Copy a .dgr-card block and set data-from to left, right, or up depending on its grid column.` },
      { title: 'Add a new direction', text: `In the CSS panel, add .dgr-card[data-from="down"] { transform: translateY(-28px); } for a fourth direction.` },
      { title: 'Match the stagger to your column count', text: `In the JS panel, change the % 3 in the delay calculation to your grid's actual column count.` },
      { title: 'Tune the trigger point', text: `Adjust rootMargin: '0px 0px -60px 0px' to make cards reveal earlier or later relative to the viewport edge.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'Per-card entrance direction read from a data-from attribute, not hardcoded per element',
      'Single shared IntersectionObserver watches the whole grid via one querySelectorAll loop',
      'Column-aware stagger computed from each card DOM sibling index, not manually authored delays',
      'Motion converges toward the grid center — left column in from the left, right from the right',
      'rootMargin shifts the trigger point so reveals do not fire at the very bottom viewport edge',
      'obs.unobserve ensures each card reveals exactly once, never repeats on re-scroll',
      'prefers-reduced-motion strips all transform motion while keeping the opacity fade',
      'Adding or removing cards keeps the stagger correctly aligned with no other changes needed',
    ],
    useCases: [
      { icon: 'APP', title: 'Feature grids and product showcases', desc: 'Pair with a [Feature Cards](/ui-snippets/feature-cards/) or [Bento Grid](/ui-snippets/bento-grid/) layout for a more dynamic multi-directional entrance.' },
      { icon: 'DESIGN', title: 'Team and portfolio grids', desc: 'Give a [Team Member Card Grid](/ui-snippets/team-member-card-grid/) a converging entrance instead of a uniform single-direction fade.' },
      { icon: 'LEARN', title: 'Learn data-attribute-driven CSS variants', desc: 'A clean example of letting markup attributes select CSS behavior instead of branching in JavaScript.' },
      { icon: 'FLOW', title: 'Process and how-it-works step grids', desc: 'Show a multi-step process converging visually toward the grid as the reader scrolls to it.' },
      { icon: 'CODE', title: 'Replace an AOS multi-direction config', desc: 'Replaces AOS (Animate on Scroll) data-aos="fade-left" / "fade-right" attribute system with a small dependency-free implementation.' },
      { icon: 'CODE', title: 'Related: Reveal on Scroll', desc: 'See the [Reveal on Scroll](/ui-snippets/reveal-on-scroll/) baseline for the simpler single-direction fade-up version of this pattern.' },
    ],
    faqs: [
      { q: 'How does each card know which direction to slide in from?', a: `Each .dgr-card element carries a data-from attribute set to left, right, or up. CSS attribute selectors like .dgr-card[data-from="left"] apply the matching starting transform, so the JavaScript observer callback never needs to check or branch on direction — it only ever toggles one shared .dgr-visible class regardless of which direction a given card uses.` },
      { q: 'How is the stagger delay calculated without hardcoding it per card?', a: `The delay is computed at reveal time from the card's position among its siblings: Array.from(el.parentElement.children).indexOf(el) % 3 * 90 finds its index, takes it modulo the column count (3), and multiplies by 90 milliseconds. This staggers cards left-to-right within whichever row is currently entering view, and continues to work correctly if cards are added or removed.` },
      { q: 'Why use setTimeout instead of a CSS transition-delay?', a: `Because the delay value is computed dynamically at trigger time from DOM position rather than known in advance, deferring the class toggle with setTimeout achieves the same staggered visual result as setting el.style.transitionDelay would — this snippet simply picks setTimeout as the more direct way to express "wait, then reveal."` },
      { q: 'What does the negative rootMargin do?', a: `rootMargin: "0px 0px -60px 0px" shrinks the observer's effective viewport by 60px from the bottom edge, so a card must scroll up slightly further before intersection is reported. This avoids the reveal firing the instant a card's top pixel barely touches the very bottom of the screen, which tends to look premature.` },
      { q: 'What happens with prefers-reduced-motion enabled?', a: `The script checks window.matchMedia once and zeroes the computed stagger delay if reduced motion is requested. Separately, a CSS media query strips the transform property entirely with !important, so cards still fade in via opacity but never perform any sliding motion for users who have asked for reduced motion.` },
      { q: 'Can I add a fourth or fifth direction?', a: `Yes. Add a new data-from value (for example "down") and a matching CSS attribute selector rule with its own starting transform, such as .dgr-card[data-from="down"] { transform: translateY(-28px); } — no JavaScript changes are needed since the observer logic is direction-agnostic.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the attribute-driven CSS or the column-stagger math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the data-from attribute selector pattern lets one shared IntersectionObserver callback drive multiple different entrance directions without branching in JavaScript, and how the modulo-based stagger calculation stays correct as cards are added or removed from the grid. The same assistant is useful for extending the effect: ask it to add a diagonal entrance direction combining both translateX and translateY, make the stagger delay scale with the grid's actual computed column count via getComputedStyle instead of a hardcoded % 3, or add a subtle rotation to each card's entrance alongside the slide. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a grid of cards where each card slides in from a different direction depending on its position — left-column cards from the left, right-column cards from the right, middle-column cards from below — using the IntersectionObserver API with a single shared observer. No animation library, no scroll event listeners.

Requirements:
- A CSS grid of cards, each carrying a data-from attribute set to "left", "right", or "up" depending on which column it belongs to.
- CSS attribute selectors (for example .card[data-from="left"]) must supply each direction's own starting transform (translateX for left/right, translateY for up) and starting opacity: 0, with a single shared "visible" class that resets transform to none and opacity to 1 on any card regardless of its direction.
- Create exactly one IntersectionObserver instance (not one per card), observing every card via a single querySelectorAll loop, with a threshold around 0.2 and a negative bottom rootMargin (for example "0px 0px -60px 0px") so the reveal triggers slightly before a card reaches the very bottom edge of the viewport.
- When a card intersects, compute a stagger delay from its index among its sibling cards modulo the grid's column count, multiplied by a small delay-per-column value (for example 90ms), and use that delay (via setTimeout or an equivalent) before adding the "visible" class — so cards in the same row reveal in a left-to-right sequence rather than all at once.
- Call unobserve on each card immediately once it starts revealing, so every card animates in exactly once and never repeats on subsequent scroll back-and-forth.
- Check prefers-reduced-motion via window.matchMedia once; if reduced motion is requested, skip the stagger delay and ensure a CSS media query removes all transform-based motion (opacity fade only) for those users.`,
    },
  },
};

export default scrollRevealStaggerColumns;
