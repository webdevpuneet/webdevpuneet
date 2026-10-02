const swiperCardsDeck = {
  id: 'swiper-cards-deck',
  title: 'Swiper Cards Deck',
  lastmod: '2026-08-02',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
  ],
  html: `<div class="scd-wrap">
  <div class="scd-head">
    <span class="scd-tag">swiper · cards effect</span>
    <h2>What teams say</h2>
    <p>Drag the top card, or use the arrow keys.</p>
  </div>

  <div class="swiper scd-swiper" id="scdSwiper">
    <div class="swiper-wrapper">

      <div class="swiper-slide scd-slide s1">
        <span class="scd-quote">“</span>
        <p>We cut our design-to-production handoff from four days to about forty minutes. Nobody has asked for a Figma export since.</p>
        <div class="scd-by"><span class="scd-av">EL</span><div><b>Elena Vos</b><small>Design Lead · Kestrel</small></div></div>
      </div>

      <div class="swiper-slide scd-slide s2">
        <span class="scd-quote">“</span>
        <p>The migration took one sprint and broke nothing. That has genuinely never happened to us before with a platform change.</p>
        <div class="scd-by"><span class="scd-av">JT</span><div><b>Jonah Tran</b><small>Staff Engineer · Aperture</small></div></div>
      </div>

      <div class="swiper-slide scd-slide s3">
        <span class="scd-quote">“</span>
        <p>Support volume about signup dropped 60% in the first month. We did not touch the backend once.</p>
        <div class="scd-by"><span class="scd-av">MR</span><div><b>Mara Reyes</b><small>Head of Product · Northwind</small></div></div>
      </div>

      <div class="swiper-slide scd-slide s4">
        <span class="scd-quote">“</span>
        <p>Onboarding went from eleven required fields to three. Conversion moved more than any pricing test we have ever run.</p>
        <div class="scd-by"><span class="scd-av">DA</span><div><b>Dai Anand</b><small>Growth · Loop</small></div></div>
      </div>

      <div class="swiper-slide scd-slide s5">
        <span class="scd-quote">“</span>
        <p>It is the first component library our engineers actually reach for instead of rebuilding from scratch every quarter.</p>
        <div class="scd-by"><span class="scd-av">SK</span><div><b>Sofia Klein</b><small>CTO · Meridian</small></div></div>
      </div>

    </div>
  </div>

  <div class="scd-controls">
    <button class="scd-nav" id="scdPrev" aria-label="Previous">‹</button>
    <div class="scd-count"><b id="scdNow">1</b> / <span id="scdTotal">5</span></div>
    <button class="scd-nav" id="scdNext" aria-label="Next">›</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0c1a;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px}
.scd-wrap{width:min(420px,92vw);text-align:center}

.scd-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f0abfc;background:rgba(240,171,252,.11);border:1px solid rgba(240,171,252,.3);padding:5px 11px;border-radius:99px;margin-bottom:12px}
.scd-head h2{font-size:clamp(24px,5vw,32px);font-weight:800;letter-spacing:-.02em}
.scd-head p{font-size:13.5px;color:#8b93b7;margin-top:7px}

.scd-swiper{width:100%;max-width:340px;height:400px;margin:28px auto 0;overflow:visible}
.scd-slide{display:flex;flex-direction:column;border-radius:22px;padding:28px 26px;color:#0b0e1c;box-shadow:0 30px 60px -26px rgba(0,0,0,.85);overflow:hidden}
.s1{background:linear-gradient(155deg,#c7d2fe,#a5b4fc 55%,#818cf8)}
.s2{background:linear-gradient(155deg,#bae6fd,#7dd3fc 55%,#38bdf8)}
.s3{background:linear-gradient(155deg,#bbf7d0,#86efac 55%,#4ade80)}
.s4{background:linear-gradient(155deg,#fde68a,#fcd34d 55%,#fbbf24)}
.s5{background:linear-gradient(155deg,#fbcfe8,#f9a8d4 55%,#f472b6)}

.scd-quote{font-size:64px;font-weight:800;line-height:.6;opacity:.32;display:block;height:34px}
.scd-slide p{font-size:16.5px;line-height:1.6;font-weight:600;letter-spacing:-.01em;margin-top:14px}
.scd-by{display:flex;align-items:center;gap:11px;margin-top:auto;padding-top:20px;text-align:left}
.scd-av{width:38px;height:38px;border-radius:50%;background:rgba(11,14,28,.85);color:#fff;font:800 12px system-ui;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.scd-by b{font-size:13.5px;display:block}
.scd-by small{font-size:11.5px;opacity:.7}

.scd-controls{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:30px}
.scd-nav{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#fff;font-size:22px;line-height:1;cursor:pointer;transition:background .16s,border-color .16s}
.scd-nav:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.34)}
.scd-nav:disabled{opacity:.3;cursor:default}
.scd-count{font-size:13px;color:#8b93b7;font-variant-numeric:tabular-nums;min-width:44px}
.scd-count b{color:#fff;font-weight:700}`,

  js: `var nowEl = document.getElementById('scdNow');
var prevBtn = document.getElementById('scdPrev');
var nextBtn = document.getElementById('scdNext');

var swiper = new Swiper('#scdSwiper', {
  effect: 'cards',
  grabCursor: true,
  // The deck is a stack, so only the top card can be dragged — looping a
  // stacked effect would put a card behind itself and flicker on wrap.
  loop: false,
  keyboard: { enabled: true, onlyInViewport: true },
  cardsEffect: {
    perSlideOffset: 9,
    perSlideRotate: 3,
    rotate: true,
    slideShadows: true
  },
  on: {
    slideChange: function () { sync(this); },
    init: function () { sync(this); }
  }
});

function sync(sw) {
  nowEl.textContent = sw.activeIndex + 1;
  prevBtn.disabled = sw.isBeginning;
  nextBtn.disabled = sw.isEnd;
}

document.getElementById('scdTotal').textContent = swiper.slides.length;

prevBtn.addEventListener('click', function () { swiper.slidePrev(); });
nextBtn.addEventListener('click', function () { swiper.slideNext(); });`,

  seo: {
    title: 'Swiper Cards Deck — Draggable Stacked Card Carousel',
    description: 'A stacked testimonial deck built on the Swiper cards effect — drag the top card, keyboard navigable, with end states. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Swiper Cards Deck — The Stacked Carousel, Configured Properly',
      description: `A stack of cards you can throw off the top is a genuinely different interaction from a carousel that slides sideways. It communicates a finite pile rather than an endless track, which is why it suits testimonials, onboarding steps, and anything where the user should feel they are working *through* a set.

**Swiper**'s \`cards\` effect does this out of the box, and it does the parts that are tedious to hand-build: pointer, touch, and keyboard input on one code path, momentum and resistance at the ends, and correct behavior when the container resizes.

## What the cardsEffect numbers do

The effect is entirely controlled by three values, and they are the difference between a convincing deck and a pile of misaligned rectangles:

\`cardsEffect: { perSlideOffset: 9, perSlideRotate: 3, rotate: true, slideShadows: true }\`

- **\`perSlideOffset: 9\`** — how far each card behind the top one is pushed, in percent. This is what makes the stack visible. Too low and the deck looks like a single card; too high and the back cards fan out so far the stack reads as a spread hand.
- **\`perSlideRotate: 3\`** — degrees of rotation added per card down the stack. Three degrees is small on purpose. Real stacked paper is *almost* aligned, and the slight imperfection is what stops the deck looking machine-printed.
- **\`slideShadows: true\`** — darkens cards further back. This is the one people disable because it looks "dirty" in isolation, and it is doing the most work: without depth shading the cards read as flat overlapping shapes rather than a stack with air between them.

## Why loop is off

\`loop: false\` is deliberate, not an omission. Swiper implements looping by cloning slides, and in a **stacked** effect those clones sit inside the same visual pile — so at the wrap point a card can briefly render behind a copy of itself, producing a visible flicker. Sliding carousels hide this because the clone is off-screen; a deck has no off-screen. Finite decks are also the honest interaction here: a pile that never ends undermines the whole metaphor.

That decision is what makes the end states meaningful, which is why \`sync()\` disables the arrows using \`sw.isBeginning\` and \`sw.isEnd\` rather than letting users press dead buttons.

## Keeping external UI in sync

The counter and arrow states are driven from Swiper's own events rather than from the click handlers:

\`on: { slideChange: function () { sync(this); }, init: function () { sync(this); } }\`

This matters because the deck can advance in three ways — dragging, arrow keys, and the buttons. Updating the counter inside the button handlers would leave it stale after a drag. Hooking \`slideChange\` means every input path converges on one update function. Including \`init\` in the same object is what sets the initial state, since \`slideChange\` does not fire for the starting slide.

Note that \`this\` inside a Swiper event handler is the Swiper instance, which is why the handler is a regular \`function\` and not an arrow — an arrow function would inherit the outer \`this\` and break the pattern.

## The overflow rule that catches people

\`.scd-swiper { overflow: visible }\` overrides Swiper's own \`overflow: hidden\`. A sliding carousel needs clipping so neighbouring slides do not spill out. A card deck needs the opposite: the offset and rotation push back cards slightly outside the container bounds, and clipping shears their corners off. This one declaration is the difference between a clean deck and cards that look cropped along one edge.

\`keyboard: { enabled: true, onlyInViewport: true }\` adds arrow-key control, scoped so a deck further down the page does not hijack arrow keys while the user is reading something else.

## Height, and why it is fixed

The Swiper container has an explicit \`height: 400px\`. Stacked effects position slides absolutely, so the container cannot derive height from its content the way a normal flow element would. Leaving it auto collapses the deck to zero. Cards then use \`margin-top: auto\` on the attribution row to push it to the bottom, so slides of different text lengths still align their footers.

## Reusing it

Replace the slides with your own content and update nothing else — the counter reads \`swiper.slides.length\` at runtime. For a wider sliding gallery, the same library's \`coverflow\` effect is a one-word change; compare against a hand-built [coverflow carousel](/ui-snippets/coverflow-carousel/) or a [testimonial slider](/ui-snippets/testimonial-slider/) if you would rather avoid the dependency.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add both Swiper CDNs', text: 'Swiper needs its bundled CSS as well as its JS — include both.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A five-card testimonial deck renders with the top card active.' },
      { title: 'Drag the top card', text: 'Throw it aside and the next card rises to the top of the stack.' },
      { title: 'Use the keyboard', text: 'Arrow keys move through the deck when it is in the viewport.' },
      { title: 'Watch the end states', text: 'Arrows disable at the first and last card since the deck does not loop.' },
      { title: 'Swap the content', text: 'Replace the slides — the total counter reads slide count at runtime.' },
    ] },
    features: [
      { title: 'Stacked cards effect', text: 'perSlideOffset and perSlideRotate build a believable pile.' },
      { title: 'Depth shading', text: 'slideShadows darkens cards further back so the stack has air.' },
      { title: 'Three input paths', text: 'Drag, arrow keys, and buttons all drive the same deck.' },
      { title: 'Event-driven sync', text: 'slideChange and init keep the counter correct after any input.' },
      { title: 'Honest end states', text: 'isBeginning and isEnd disable the arrows instead of dead-ending.' },
      { title: 'Deliberately unlooped', text: 'No slide clones, so a stacked card never renders behind its copy.' },
      { title: 'Overflow visible', text: 'Overrides Swiper default clipping that would shear rotated cards.' },
      { title: 'Aligned footers', text: 'margin-top auto keeps attributions level across varied text lengths.' },
    ],
    useCases: [
      { title: 'Testimonial piles', text: 'Present a finite stack of quotes that reads better than an endless track, using `perSlideOffset` and `perSlideRotate` to build a believable pile.' },
      { title: 'Onboarding sequences', text: 'Deal through a first-run sequence one card at a time, with drag, arrow keys and buttons all driving the same deck.' },
      { title: 'Flashcards and quizzes', text: 'Pair with a [flashcard deck](/ui-snippets/flashcard-deck/) for study tools, with `slideShadows` darkening each card further back in the stack.' },
      { title: 'Product highlights', text: 'Stack feature cards where the total count matters, keeping a counter correct through `slideChange` and `init` events after any input.' },
      { title: 'Testimonial slider comparison', text: 'Compare with the sideways [testimonial slider](/ui-snippets/testimonial-slider/) when an endless track suits the content better than a pile.' },
    ],
    faqs: [
      { q: 'What do perSlideOffset and perSlideRotate control?', a: 'perSlideOffset is how far, in percent, each card behind the top one is pushed — it is what makes the stack visible at all. perSlideRotate is degrees of rotation added per card down the pile. Three degrees is deliberately small: real stacked paper is almost aligned, and slight imperfection is what stops the deck looking machine-printed.' },
      { q: 'Why is loop turned off?', a: 'Swiper loops by cloning slides, and in a stacked effect those clones live inside the same visual pile, so at the wrap point a card can render behind a copy of itself and flicker. Sliding carousels hide this because clones sit off-screen; a deck has no off-screen. A finite deck is also the more honest metaphor, which is what makes the disabled end states meaningful.' },
      { q: 'Why must overflow be set to visible?', a: 'Swiper defaults its container to overflow: hidden so a sliding carousel clips neighbouring slides. In a card deck, the per-slide offset and rotation push back cards slightly outside the container bounds, so clipping shears their corners. Setting overflow: visible is what keeps the stack clean.' },
      { q: 'Why does the counter update from slideChange rather than the buttons?', a: 'The deck can advance three ways — drag, arrow keys, and buttons. Updating inside the click handlers leaves the counter stale after a drag. Hooking Swiper own slideChange event routes every input path through one update function, and adding init to the same events object sets the starting state, since slideChange does not fire for the initial slide.' },
      { q: 'Why does the Swiper container need an explicit height?', a: 'Stacked effects position slides absolutely, so the container cannot derive its height from content the way a normal flow element would — left on auto it collapses to zero. With a fixed height set, cards use margin-top: auto on the attribution row so footers stay aligned across slides with different text lengths.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Swiper ships official swiper/react and swiper/vue components, which handle instance lifecycle for you — register the EffectCards module and pass cardsEffect as a prop. If you use the vanilla build instead, construct it in a mount effect against a ref and call swiper.destroy(true, true) in cleanup, or remounts leave orphaned listeners. Import the CSS once globally.' },
    ],
    aiPrompt: {
      paragraph: `Most of this snippet is configuration where each value has a visible consequence, which makes it ideal to poke at rather than accept. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain what perSlideOffset and perSlideRotate each control, then have it predict how the deck looks at perSlideOffset 2 versus 25 and try both. Ask specifically why loop is set to false for a stacked effect when it would be fine on a sliding one — the slide-cloning explanation is the interesting part. Then ask why the CSS overrides Swiper own overflow: hidden with overflow: visible, and remove it to see the rotated back cards get sheared. For optimization, ask whether slideShadows costs anything meaningful and how the deck behaves with fifty slides rather than five. To extend it: have it add a swipe-to-dismiss that removes the card from the DOM entirely, wire the deck to real data with a loading state, add autoplay with pause on hover, or swap effect: 'cards' for 'creative' and author a custom transform. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a draggable stacked card deck (testimonials) using Swiper 11 from a CDN — you must include BOTH swiper-bundle.min.css and swiper-bundle.min.js — in plain HTML, CSS, and JavaScript.

Requirements:
- Use Swiper's built-in effect: 'cards' with grabCursor enabled, and configure cardsEffect with perSlideOffset around 9, perSlideRotate around 3, rotate: true and slideShadows: true. Explain what each value does: the offset is what makes the stack visible, the small rotation mimics almost-aligned real paper, and slideShadows provides the depth shading without which the cards read as flat overlapping shapes.
- Set loop: false deliberately and explain why in a comment: Swiper loops by cloning slides, and in a stacked effect the clones sit inside the same visual pile, so at the wrap point a card can render behind a copy of itself and flicker. A finite deck is also the correct metaphor.
- Override Swiper's default container overflow with overflow: visible on the swiper element, and explain that a sliding carousel needs clipping but a card deck does not — the per-slide offset and rotation push back cards slightly outside the container, so clipping would shear their corners.
- Give the Swiper container an explicit fixed height, because stacked effects position slides absolutely and the container would otherwise collapse to zero height. Inside each card, push the author/attribution row down with margin-top: auto so footers align across slides with different text lengths.
- Enable keyboard navigation with onlyInViewport: true so a deck further down the page does not hijack arrow keys while the user reads other content.
- Add previous/next buttons and a live "N / total" counter. Drive both from Swiper's own event handlers — hook slideChange AND init in the on: {} config, calling one shared sync function — rather than updating inside the button click handlers, because the deck can also advance by dragging and keyboard. Use regular function expressions, not arrow functions, so the handler's "this" is the Swiper instance. Read the total from swiper.slides.length at runtime.
- Disable the previous/next buttons at the ends using swiper.isBeginning and swiper.isEnd, since the deck does not loop.
- Style it as a premium dark page with five vividly gradient-filled cards, a large decorative quote glyph, and circular initial avatars.`,
    },
  },
};

export default swiperCardsDeck;
