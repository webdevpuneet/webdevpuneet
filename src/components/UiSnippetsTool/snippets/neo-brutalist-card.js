const neoBrutalistCard = {
  id: 'neo-brutalist-card',
  title: 'Neo-Brutalist Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="nb-stage">
  <article class="nb-card" tabindex="0">
    <div class="nb-tag">NEW</div>
    <div class="nb-thumb" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"></path></svg>
    </div>
    <h3 class="nb-title">Ship faster</h3>
    <p class="nb-text">A bold, high-contrast card with a hard offset shadow that snaps on hover. Pure CSS, no blur.</p>
    <div class="nb-foot">
      <span class="nb-price">$0</span>
      <button type="button" class="nb-btn">Get it →</button>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fde047;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px 18px}

.nb-stage{width:100%;max-width:320px}

.nb-card{position:relative;background:#fff;border:3px solid #111;border-radius:14px;padding:22px;box-shadow:8px 8px 0 #111;transition:transform .12s ease,box-shadow .12s ease;cursor:pointer;outline:none}
.nb-card:hover,.nb-card:focus-visible{transform:translate(-4px,-4px);box-shadow:12px 12px 0 #111}
.nb-card:active{transform:translate(2px,2px);box-shadow:4px 4px 0 #111}

.nb-tag{position:absolute;top:-14px;right:18px;background:#22d3ee;border:3px solid #111;border-radius:8px;font-size:11px;font-weight:900;letter-spacing:.06em;padding:4px 9px;transform:rotate(4deg)}

.nb-thumb{width:54px;height:54px;border:3px solid #111;border-radius:12px;background:#f472b6;display:flex;align-items:center;justify-content:center;box-shadow:4px 4px 0 #111;margin-bottom:16px}
.nb-thumb svg{width:26px;height:26px}

.nb-title{font-size:23px;font-weight:900;color:#111;letter-spacing:-.02em;margin-bottom:7px}
.nb-text{font-size:13.5px;line-height:1.55;color:#333;font-weight:500;margin-bottom:18px}

.nb-foot{display:flex;align-items:center;justify-content:space-between}
.nb-price{font-size:20px;font-weight:900;color:#111}
.nb-btn{background:#a3e635;border:3px solid #111;border-radius:9px;padding:9px 15px;font-family:inherit;font-size:13px;font-weight:800;color:#111;cursor:pointer;box-shadow:3px 3px 0 #111;transition:transform .1s,box-shadow .1s}
.nb-btn:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 #111}
.nb-btn:active{transform:translate(1px,1px);box-shadow:2px 2px 0 #111}`,

  js: `// Neo-brutalism is a pure-CSS aesthetic — the JS just adds a tactile
// click ripple so the card feels physical on press.
var card = document.querySelector('.nb-card');
var btn = document.querySelector('.nb-btn');

btn.addEventListener('click', function (e) {
  e.stopPropagation();
  btn.textContent = 'Added ✓';
  btn.style.background = '#111';
  btn.style.color = '#a3e635';
  setTimeout(function () {
    btn.textContent = 'Get it →';
    btn.style.background = '#a3e635';
    btn.style.color = '#111';
  }, 1100);
});

// Keyboard activation mirrors the hover press for accessibility.
card.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
});`,

  seo: {
    title: 'Neo-Brutalist Card — Free HTML CSS Hard Shadow Snippet',
    description: `A bold neo-brutalist card with thick black borders and a hard offset box-shadow that snaps on hover and press. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Neo-Brutalist Card — Hard Shadows, Thick Borders, Tactile Press',
      description: `Neo-brutalism is the high-contrast design trend that strips away soft gradients and blurred shadows in favor of thick black outlines, flat saturated color blocks, and chunky offset shadows that look like the element was cut from paper and dropped on the page. This snippet builds a complete neo-brutalist product card in plain HTML, CSS, and a few lines of vanilla JavaScript — no framework, no images, no blur filters.

**The defining hard shadow**

The whole look hinges on one property: \`box-shadow: 8px 8px 0 #111\`. The zero blur radius is what makes it "brutalist" — instead of a soft drop shadow, you get a crisp solid duplicate offset down and to the right, as if a second black card sits directly behind it. Combined with a \`3px solid #111\` border on every element, the card reads as a bold sticker rather than a floating surface. The same recipe is applied to the thumbnail, the button, and the rotated "NEW" tag so the entire composition feels consistent.

**A press that moves in space**

On \`:hover\` and keyboard \`:focus-visible\` the card translates up-left with \`translate(-4px,-4px)\` while the shadow grows to \`12px 12px\` — the card appears to lift off the page. On \`:active\` it does the opposite: it translates down-right and the shadow shrinks to \`4px\`, so clicking physically pushes the card toward its shadow like a real button. Because the transform and box-shadow both transition over \`.12s\`, the motion is snappy rather than floaty, which is exactly the brutalist feel. The button repeats this lift-and-press at a smaller scale so nested controls behave the same way.

**Color as structure**

Brutalism leans on flat, unapologetic color. The page background is a saturated yellow, the card is pure white, the icon tile is hot pink, the CTA is lime, and the tag is cyan — each separated by the same black border so the palette never turns muddy. There are no opacity tricks or gradients; every surface is a solid fill. This makes the card trivially themeable: swap the five hex values and you have a new variant without touching layout.

**The rotated accent tag**

The "NEW" badge is absolutely positioned outside the card's top edge and rotated \`4deg\` with \`transform: rotate(4deg)\`. That tiny tilt is a brutalist signature — perfectly aligned elements feel corporate, while a single rotated sticker feels handmade and energetic. Because it is a normal positioned element, you can move it to any corner or change the angle freely.

**What the JavaScript adds**

The aesthetic is entirely CSS; JavaScript only provides tactile feedback. Clicking the button swaps its label to "Added ✓" and inverts its colors for 1.1 seconds before reverting, giving a satisfying confirmation without a state library. A \`keydown\` handler on the card maps Enter and Space to the button so the whole component is operable from the keyboard, and \`stopPropagation\` keeps the button click from bubbling to the card.

**Customizing it**

Resize the shadow offset to make the card feel heavier or lighter, change the border radius from the rounded \`14px\` to \`0\` for a stricter brutalist look, or drop the card into a CSS grid to build a whole bento wall of them. Pair it with a [pricing card](/ui-snippets/pricing-card/) grid or use the same shadow recipe on a [shimmer button](/ui-snippets/shimmer-button/) to keep a consistent design language across a landing page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A bold yellow stage renders a white card with a hard black offset shadow.` },
      { title: 'Hover or tab to the card', text: `It lifts up-left and the solid shadow grows, with no blur.` },
      { title: 'Press it', text: `The card pushes down-right toward its shadow like a physical button.` },
      { title: 'Click Get it', text: `The lime CTA flips to a dark Added confirmation for a moment.` },
      { title: 'Recolor the palette', text: `Swap the five flat hex fills to create a new brutalist variant.` },
      { title: 'Tile into a grid', text: `Drop multiple cards into a CSS grid for a bento-style wall.` },
    ] },
    features: [
      { title: 'Zero-blur hard shadow', text: `box-shadow with 0 blur creates the crisp brutalist offset.` },
      { title: 'Lift on hover and focus', text: `translate plus a larger shadow makes the card rise.` },
      { title: 'Physical press on active', text: `It moves toward its shadow when clicked.` },
      { title: 'Flat saturated palette', text: `Solid color blocks separated by 3px black borders.` },
      { title: 'Rotated accent tag', text: `A tilted NEW sticker gives the handmade brutalist feel.` },
      { title: 'Keyboard operable', text: `Enter and Space trigger the CTA via a keydown handler.` },
      { title: 'Tactile click feedback', text: `The button confirms with an inverted Added state.` },
      { title: 'No images or blur', text: `Pure HTML and CSS, trivially themeable.` },
    ],
    useCases: [
      { title: 'Bold landing pages', text: 'Headline a brutalist hero beside an [animated gradient CTA](/ui-snippets/animated-gradient-cta/), using thick black borders and flat saturated colour blocks.' },
      { title: 'Pricing grids', text: 'Restyle a wall of [pricing card](/ui-snippets/pricing-card/) options in the brutalist style, with a zero-blur hard shadow giving a crisp offset.' },
      { title: 'Brutalist bento cells', text: 'Use as the cells of a [bento grid](/ui-snippets/bento-grid/) layout, with cards lifting on hover and focus through translate plus a larger shadow.' },
      { title: 'E-commerce product cards', text: 'Give a [product card](/ui-snippets/product-card/) a high-contrast treatment, so pressing it moves it toward its shadow like a physical button.' },
      { title: 'Design system demos', text: 'Contrast with a [neon glow](/ui-snippets/neon-glow/) accent, and use as a reference for the hard-shadow brutalist look.' },
    ],
    faqs: [
      { q: 'What makes a shadow look brutalist?', a: `The blur radius is zero: box-shadow: 8px 8px 0 #111 paints a solid offset copy of the element rather than a soft fade. Paired with a thick 3px solid black border, the card reads as a flat cut-out sticker instead of a floating material surface, which is the core of the neo-brutalist aesthetic.` },
      { q: 'How does the card feel like a physical button?', a: `On hover it translates up-left while the shadow grows, so it lifts off the page; on active it translates down-right and the shadow shrinks, so a click pushes it toward its shadow. Both the transform and box-shadow transition over 0.12s, giving a snappy mechanical press rather than a floaty animation.` },
      { q: 'Can I change the colors easily?', a: `Yes. Every surface is a flat solid fill — the yellow background, white card, pink icon tile, lime button, and cyan tag are independent hex values with no gradients or opacity. Swap any of the five colors to create a new variant without touching the layout or shadow rules.` },
      { q: 'Is the card accessible?', a: `The card has tabindex="0" and a focus-visible style identical to its hover state, so keyboard users see the same lift. A keydown handler maps Enter and Space to the CTA, and stopPropagation keeps the button from double-firing through the card. Replace the icon SVG with a real label if it conveys meaning.` },
      { q: 'How do I use this neo-brutalist card in React, Vue, or Angular?', a: `The markup and CSS port directly — drop the JSX or template in and keep the class names. Move the button click and card keydown listeners into the framework: an onClick handler that toggles an added boolean in state (React), a @click and ref in Vue, or an (click)/(keydown) binding in Angular. In Tailwind, express the look with border-[3px] border-black shadow-[8px_8px_0_#111] and hover:-translate-x-1 hover:-translate-y-1.` },
    ],
    aiPrompt: {
      paragraph: `Rather than eyeballing the shadow numbers, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why a zero-blur box-shadow paired with a thick solid border is what reads as brutalist rather than a normal material-design elevation shadow, and how the hover translate and the shadow's growth from 8px to 12px are coordinated to sell the "lifting off the page" illusion. The same assistant can help optimize it, for instance checking whether the transition timing on :hover, :focus-visible, and :active is consistent enough that keyboard and mouse interactions feel identical, or whether the inline style.background/style.color mutation in the click handler should be replaced with a toggled class for easier theming. It's also useful for extending the card: ask it to generate a whole grid of these cards with randomized rotation on each tag, add a second accent color variant driven by a data attribute, or make the click confirmation state persist instead of reverting after a timeout. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "neo-brutalist" product card in plain HTML, CSS, and a few lines of JavaScript using only solid colors and zero-blur box-shadows — no gradients, no blur filters, no images.

Requirements:
- A card with a thick solid border (a few pixels, one solid dark color) and a box-shadow with zero blur radius and a solid color matching the border, offset several pixels down and to the right, so it reads as a duplicate flat copy sitting behind the card rather than a soft drop shadow.
- On hover and on keyboard focus (using :focus-visible, since the card must be focusable via tabindex), the card must translate up and to the left while its shadow offset grows larger, giving the illusion the card is lifting off the page; on active/press, it must do the opposite — translate down and to the right while the shadow shrinks — so clicking visibly pushes the card toward its own shadow.
- A small badge/tag element positioned so it overlaps the card's top edge, rotated a few degrees off-axis, using the same thick-border-plus-hard-shadow treatment at a smaller scale.
- An icon tile and a call-to-action button that repeat the identical hard-shadow-and-border recipe at their own scale, each with their own hover-lift and active-press behavior independent of the outer card's.
- Every fill color on the card (background, icon tile, button, tag) must be a flat solid hex value with no gradients or transparency, so the whole palette could be swapped by changing five color values and nothing else.
- Clicking the CTA button must give brief non-navigating feedback — swap its label and invert its two colors for about a second before reverting — and pressing Enter or Space while the card itself is focused must trigger that same button action.`,
    },
  },
};

export default neoBrutalistCard;
