const stackingScrollCards = {
  id: 'stacking-scroll-cards',
  title: 'Stacking Scroll Cards',
  lastmod: '2026-07-18',
  category: 'scroll',
  html: `<div class="ss-intro">Scroll down ↓</div>
<div class="ss-stack" id="ssStack">
  <section class="ss-card" style="--bg:#6366f1;--t:0">
    <div class="ss-num">01</div><h3>Capture</h3><p>Collect every idea, link, and note in one fast inbox.</p>
  </section>
  <section class="ss-card" style="--bg:#0ea5e9;--t:1">
    <div class="ss-num">02</div><h3>Organize</h3><p>Tag, group, and connect notes into a living knowledge base.</p>
  </section>
  <section class="ss-card" style="--bg:#ec4899;--t:2">
    <div class="ss-num">03</div><h3>Recall</h3><p>Search instantly and resurface the right thing at the right time.</p>
  </section>
  <section class="ss-card" style="--bg:#10b981;--t:3">
    <div class="ss-num">04</div><h3>Share</h3><p>Publish polished pages or hand off a workspace in one click.</p>
  </section>
</div>
<div class="ss-outro">Each card pins, then the next slides over it.</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#070710;color:#fff}

.ss-intro,.ss-outro{height:55vh;display:flex;align-items:center;justify-content:center;color:#5b5b72;font-size:15px;letter-spacing:.04em}

.ss-stack{display:flex;flex-direction:column;align-items:center;gap:5vh}
.ss-card{position:sticky;top:90px;width:min(560px,calc(100% - 32px));min-height:300px;border-radius:24px;padding:34px;background:var(--bg);box-shadow:0 30px 60px -24px rgba(0,0,0,.6);transform:scale(1);transform-origin:top center;display:flex;flex-direction:column;justify-content:center;will-change:transform}
.ss-num{font-size:13px;font-weight:800;letter-spacing:.2em;opacity:.7;margin-bottom:14px}
.ss-card h3{font-size:clamp(26px,5vw,40px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.ss-card p{font-size:16px;line-height:1.55;max-width:400px;opacity:.92}`,

  js: `var cards = Array.prototype.slice.call(document.querySelectorAll('.ss-card'));
var ticking = false;

// As a card pins and the next one rises to cover it, scale the pinned card
// down slightly so the stack reads as physical layers, not flat overlaps.
function update() {
  var vh = window.innerHeight;
  cards.forEach(function (card, i) {
    var rect = card.getBoundingClientRect();
    var pinTop = 90;
    // progress: 0 while the card fills the viewport, ->1 as it gets covered.
    var next = cards[i + 1];
    if (!next) { card.style.transform = 'scale(1)'; return; }
    var nextRect = next.getBoundingClientRect();
    var dist = nextRect.top - pinTop;              // how far the next card is below the pin line
    var span = vh * 0.7;
    var p = 1 - Math.max(0, Math.min(1, dist / span));
    var scale = 1 - p * 0.08;                      // shrink up to 8%
    var bright = 1 - p * 0.25;                     // dim slightly as it is covered
    card.style.transform = 'scale(' + scale.toFixed(4) + ')';
    card.style.filter = 'brightness(' + bright.toFixed(3) + ')';
  });
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}, { passive: true });
window.addEventListener('resize', update);
update();`,

  seo: {
    title: 'Stacking Scroll Cards — Free HTML CSS JS Sticky Snippet',
    description: `Sticky cards that pin and stack as you scroll, each shrinking and dimming as the next slides over it. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Stacking Scroll Cards — Sticky Cards That Layer on Scroll',
      description: `Stacking scroll cards are the storytelling pattern where full-width cards pin to the top of the viewport one after another, and as you keep scrolling the next card slides up to cover the previous one — which shrinks back like a card going into a deck. It's a favorite for explaining a product in numbered steps. This snippet builds the effect in plain HTML, CSS, and a small amount of vanilla JavaScript, leaning on \`position: sticky\` so the heavy lifting is native.

**Sticky positioning does the pinning**

Each card is \`position: sticky; top: 90px\`. As you scroll, a card scrolls normally until its top hits 90px from the viewport top, then it sticks there while the rest of the page continues moving. Because all cards share the same sticky offset, the next card scrolls up from below and slides directly over the pinned one — no JavaScript is needed for the pinning itself, which keeps it smooth even on low-end devices. The cards have descending nothing; they simply stack in document order with their drop shadows separating the layers.

**JavaScript adds the depth cues**

Pure sticky stacking looks flat — the covered card just disappears behind the next. The JavaScript adds the physical "into the deck" feel by measuring, each frame, how close the next card has risen to the pin line. It computes a progress value \`p\` from the gap between the next card's top and the pin position, normalized over roughly 70% of the viewport height. As \`p\` goes from 0 to 1, the pinned card scales down up to 8% via \`transform: scale\` and dims up to 25% via \`filter: brightness\`. The combination makes each card recede as it's buried, so the stack reads as real layers.

**transform-origin keeps the shrink anchored**

The scale uses \`transform-origin: top center\` so cards shrink toward their top edge rather than their middle. That keeps the top of each card aligned at the pin line as it shrinks, so the visible "spine" of the stack stays put — exactly how a physical deck looks from the front.

**Efficient scroll handling**

The scroll listener is \`{ passive: true }\` and throttled through \`requestAnimationFrame\` with a \`ticking\` guard, so at most one measurement-and-write happens per frame no matter how many scroll events fire. Reads (\`getBoundingClientRect\`) and writes (setting \`transform\` and \`filter\`) are batched in the single rAF callback. A \`resize\` listener re-runs the update because viewport height feeds the progress math.

**Numbered, colorful steps**

Each card carries a CSS custom property for its background color and a number, making it a natural fit for "how it works" sections. The content is centered vertically and capped in width for readability. Because color is a variable, theming the stack is a per-card one-liner.

**Customizing it**

Adjust \`top: 90px\` to change where cards pin, tune the \`0.08\` scale and \`0.25\` brightness factors for a stronger or subtler recede, and change the \`0.7\` span to make the effect happen over more or less scroll. Add or remove cards freely — the script reads them from the DOM and links each to its successor. Pair it with a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/) or follow it with an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) to convert at the end of the story.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Four colorful numbered cards stack vertically with a scroll prompt.` },
      { title: 'Scroll down', text: `Each card pins near the top of the viewport in turn.` },
      { title: 'Keep scrolling', text: `The next card slides over the pinned one, which shrinks back.` },
      { title: 'Watch the dimming', text: `Covered cards also darken slightly to recede into the deck.` },
      { title: 'Add or remove cards', text: `The script reads cards from the DOM automatically.` },
      { title: 'Tune the depth', text: `Adjust the pin offset, scale, and brightness factors.` },
    ] },
    features: [
      { title: 'Native sticky pinning', text: `position: sticky pins each card with no JS.` },
      { title: 'Scale-back depth cue', text: `Covered cards shrink up to 8% via transform.` },
      { title: 'Brightness dimming', text: `Buried cards darken to recede into the stack.` },
      { title: 'Top-anchored shrink', text: `transform-origin keeps the spine aligned.` },
      { title: 'rAF-throttled scroll', text: `One batched read/write per frame, passive.` },
      { title: 'Resize-aware', text: `Recomputes progress when viewport height changes.` },
      { title: 'Per-card color variable', text: `Theme each step with one custom property.` },
      { title: 'Auto-linked cards', text: `Each card measures against its successor.` },
    ],
    useCases: [
      { title: 'Numbered how-it-works steps', text: 'Present numbered steps as cards that pin and cover one another, before a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/) for the detail.' },
      { title: 'Product storytelling', text: 'Walk through value propositions one card at a time, then end with an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) once the stack is complete.' },
      { title: 'Onboarding pages', text: 'Offer a scroll version of an [onboarding tour](/ui-snippets/onboarding-tour/), with native `position: sticky` pinning each card and requiring no JavaScript.' },
      { title: 'Pricing narratives', text: 'Lead into a [pricing card](/ui-snippets/pricing-card/) comparison by building the case first, with covered cards shrinking up to 8% and dimming as they recede.' },
      { title: 'Case study milestones', text: 'Reveal project milestones over a [vertical timeline](/ui-snippets/vertical-timeline/), using a top-anchored transform origin so card spines stay aligned.' },
    ],
    faqs: [
      { q: 'What makes the cards pin and stack?', a: `Each card is position: sticky with the same top: 90px. A card scrolls normally until its top reaches the pin line, then sticks there while the page keeps moving, so the next card rises from below and slides over it. The pinning is entirely native CSS, which keeps it smooth even without JavaScript.` },
      { q: 'What does the JavaScript add?', a: `Sticky stacking alone looks flat. The script measures how close the next card has risen to the pin line each frame, derives a progress value, and uses it to scale the pinned card down up to 8% and dim it up to 25%. Those depth cues make each card recede like it's going into a physical deck rather than just vanishing.` },
      { q: 'Why use transform-origin: top center?', a: `So cards shrink toward their top edge instead of their center. That keeps the top of every card aligned at the pin line as it scales down, preserving the visible stacked spine. Shrinking from the center would pull the tops downward and break the layered look.` },
      { q: 'Is the scroll handling efficient?', a: `Yes. The scroll listener is passive and throttled with requestAnimationFrame guarded by a ticking flag, so there's at most one update per frame regardless of how many scroll events fire. All layout reads and style writes happen together in that single rAF callback to avoid layout thrashing, and a resize listener refreshes the viewport-height math.` },
      { q: 'How do I use these stacking scroll cards in React, Vue, or Angular?', a: `Render the cards from an array with their color and step text. The sticky CSS works as-is. Put the scroll and resize listeners in a mount effect with cleanup, and query the card elements via a container ref rather than getElementById. Keep the ticking flag in a ref. In Tailwind, use sticky top-[90px], and apply the scale and brightness through inline styles updated in the effect.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out how the progress value ties sticky positioning to the scale-and-dim effect by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the update function derives progress p from the next card's distance to the pin line, or why transform-origin is set to top center rather than center so the shrinking card's top edge stays anchored at the pin line. The same assistant can help optimize it, for example checking whether the rAF-throttled scroll handler with its ticking flag is correctly avoiding layout thrashing when getBoundingClientRect reads and style writes are interleaved across many cards. It's also useful for extending the feature: ask it to add a progress-driven color or opacity shift on the card's inner content (not just the whole card), support horizontal stacking for a side-scrolling variant, or add a subtle rotation to the depth cue alongside the existing scale and brightness. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a sticky, stacking scroll-card effect in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Multiple full-width card sections, each with position sticky and the exact same top offset value, so each pins near the top of the viewport in turn as the page scrolls and the next card visually slides up to cover it.
- In JavaScript, for every card that has a following card, measure on each scroll event how close the next card's top edge has risen toward the pin line (using getBoundingClientRect, not scroll position alone), and convert that distance into a normalized progress value between 0 and 1 based on a configurable fraction of the viewport height.
- Use that progress value to scale the currently-pinned card down by up to a small percentage (for example up to 8 percent) via a CSS transform, and to dim it via a brightness filter, so the covered card visually recedes rather than abruptly disappearing behind the next one.
- Set transform-origin to the top center of each card so the shrink is anchored at the top edge (where the sticky pin line is), keeping the visible "spine" of the stack aligned rather than shrinking toward the card's center.
- Throttle the scroll handler with requestAnimationFrame and a boolean guard flag so at most one measurement-and-style-update pass runs per animation frame regardless of how many scroll events fire, and register the scroll listener as passive.
- Recompute the effect on window resize as well as scroll, since the progress math depends on viewport height.
- Read the set of cards from the DOM automatically (not a hardcoded count), so adding or removing card sections in the HTML requires no JavaScript changes.`,
    },
  },
};

export default stackingScrollCards;
