const spotlightProductCard = {
  id: 'spotlight-product-card',
  title: 'Spotlight Product Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<article class="sp-card" id="spCard">
  <div class="sp-media">
    <div class="sp-shape"></div>
    <span class="sp-tag">New</span>
  </div>
  <div class="sp-body">
    <div class="sp-row">
      <h3 class="sp-name">Aero Wireless Buds</h3>
      <span class="sp-price">$129</span>
    </div>
    <p class="sp-desc">Active noise cancelling, 32-hour battery, and spatial audio in a 4g shell.</p>
    <div class="sp-stars" aria-label="4.8 out of 5">★★★★★ <small>4.8 (2,140)</small></div>
    <button type="button" class="sp-btn">Add to cart</button>
  </div>
</article>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0c14;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.sp-card{position:relative;width:300px;border-radius:20px;background:#11131d;border:1px solid #20232f;overflow:hidden;isolation:isolate}
/* The spotlight: a soft circle that follows the cursor, masked to the card. */
.sp-card::before{content:'';position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0;transition:opacity .25s;background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(120,140,255,.16),transparent 60%)}
.sp-card:hover::before{opacity:1}
/* A matching border highlight under the cursor. */
.sp-card::after{content:'';position:absolute;inset:0;z-index:3;pointer-events:none;border-radius:20px;opacity:0;transition:opacity .25s;background:radial-gradient(280px circle at var(--mx,50%) var(--my,50%),rgba(150,170,255,.5),transparent 45%);-webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px}
.sp-card:hover::after{opacity:1}

.sp-media{position:relative;height:160px;background:radial-gradient(120% 120% at 50% 0,#1d2236,#0d0f18);display:flex;align-items:center;justify-content:center}
.sp-shape{width:96px;height:96px;border-radius:30px;background:linear-gradient(140deg,#7c8cff,#4f5bd5);box-shadow:0 18px 40px rgba(79,91,213,.45)}
.sp-tag{position:absolute;top:12px;left:12px;font-size:11px;font-weight:700;color:#0a0c14;background:#8be9c6;padding:3px 9px;border-radius:999px}
.sp-body{padding:18px;position:relative;z-index:1}
.sp-row{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.sp-name{color:#fff;font-size:16px}
.sp-price{color:#9fb0ff;font-size:18px;font-weight:800}
.sp-desc{color:#8a8fa3;font-size:13px;line-height:1.5;margin:8px 0 12px}
.sp-stars{color:#ffce4a;font-size:13px;letter-spacing:1px;margin-bottom:14px}
.sp-stars small{color:#71778c;letter-spacing:0;margin-left:4px}
.sp-btn{width:100%;background:#fff;color:#11131d;border:0;font-family:inherit;font-weight:700;font-size:14px;padding:11px;border-radius:11px;cursor:pointer;transition:transform .12s}
.sp-btn:active{transform:scale(.97)}`,

  js: `var card = document.getElementById('spCard');

// Feed the cursor position into CSS variables that both spotlight layers read.
card.addEventListener('mousemove', function (e) {
  var r = card.getBoundingClientRect();
  card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  card.style.setProperty('--my', (e.clientY - r.top) + 'px');
});

card.querySelector('.sp-btn').addEventListener('click', function () {
  this.textContent = 'Added ✓';
  var self = this;
  setTimeout(function () { self.textContent = 'Add to cart'; }, 1400);
});`,

  seo: {
    title: 'Spotlight Product Card — Free HTML CSS JS Hover Card Snippet',
    description: `A product card with a cursor-following spotlight glow and a masked gradient border that lights up on hover. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Spotlight Product Card — A Cursor-Lit E-commerce Card',
      description: `The spotlight product card is the e-commerce card that lights up under your cursor — a soft glow sweeps across the surface and the border itself illuminates where the pointer is, the effect made famous by developer-tool and hardware landing pages. This snippet builds it with plain HTML, CSS, and a four-line JavaScript handler, with no canvas and no library.

**Two spotlight layers from one set of variables**

A single \`mousemove\` handler writes the cursor's position into two CSS custom properties, \`--mx\` and \`--my\`, on the card. Two pseudo-elements then read those variables: \`::before\` paints a large, soft \`radial-gradient\` glow over the card body, and \`::after\` paints a tighter, brighter gradient used for the border. Because both reference the same variables, the surface glow and the border highlight track the cursor in perfect lockstep with only two values updated per frame.

**The masked gradient border**

The illuminated border is the clever part. The \`::after\` layer fills the whole card with its bright radial gradient, but a CSS mask using \`mask-composite: exclude\` (with the \`-webkit-\` fallback) cuts out everything except a 1px frame around the edge — so only the border shows the gradient, and it brightens exactly where the cursor is. This is how a border can appear to be lit by a moving light without any extra elements.

**Hover-gated opacity**

Both spotlight layers sit at \`opacity: 0\` and fade in only on \`:hover\`, so the resting card is calm and the light reads as something that switches on as you approach. \`isolation: isolate\` and careful \`z-index\` ordering keep the glow above the media but below the interactive content, so text and the button stay crisp and clickable.

**Pointer-events and layering**

Both pseudo-elements are \`pointer-events: none\`, so they never intercept clicks — the cursor always reaches the button and links beneath. The card body sits on its own stacking context above the body glow but below the border layer, which keeps the design legible while the light plays over it.

**A complete product card**

Inside the effect is a real, usable product card: a media area with a tagged badge, a title-and-price row, a description, a star rating, and an add-to-cart button that confirms with a brief "Added ✓" state. The spotlight is decorative polish layered on top of solid commerce markup.

**Customizing it**

Change the glow colours and radii in the two gradients, adjust the border thickness via the mask padding, or swap the media for a real product image. The whole effect is content-agnostic. Pair it with a [product card](/ui-snippets/product-card/) grid, a [tilt glow card](/ui-snippets/tilt-glow-card/), or an [add to cart button](/ui-snippets/add-to-cart-button/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A product card renders, calm at rest.` },
      { title: 'Hover the card', text: `A soft spotlight and a lit border fade in.` },
      { title: 'Move the cursor', text: `Both the glow and border track the pointer.` },
      { title: 'Click Add to cart', text: `The button confirms with Added ✓ briefly.` },
      { title: 'Recolor the glow', text: `Edit the two radial-gradient colors.` },
      { title: 'Swap the media', text: `Drop a product image into the media area.` },
    ] },
    features: [
      { title: 'Cursor-following glow', text: `Radial gradient driven by CSS variables.` },
      { title: 'Lit gradient border', text: `Masked ::after frame brightens under the cursor.` },
      { title: 'Single handler', text: `One mousemove writes --mx and --my.` },
      { title: 'Hover-gated', text: `Both layers fade in only on hover.` },
      { title: 'Click-through layers', text: `pointer-events: none keeps content usable.` },
      { title: 'Confirming button', text: `Add to cart flips to Added ✓.` },
      { title: 'Complete card', text: `Badge, price, rating, and CTA included.` },
      { title: 'Content-agnostic', text: `Drop in any product markup.` },
    ],
    useCases: [
      { title: 'Store product grids', text: 'Replace a plain [product card](/ui-snippets/product-card/) with one that lights up under the cursor, with a gradient border that illuminates where the pointer is.' },
      { title: 'Feature card rows', text: 'Light up a row of [tilt glow cards](/ui-snippets/tilt-glow-card/) with the same spotlight idea, using one `mousemove` handler to write `--mx` and `--my`.' },
      { title: 'Add to cart pairing', text: 'Pair with an [add to cart button](/ui-snippets/add-to-cart-button/) so the lit card leads naturally into the purchase action.' },
      { title: 'Quick view and pricing', text: 'Use inside a [product quick view](/ui-snippets/product-quick-view/) or spotlight a tier on a [pricing card](/ui-snippets/pricing-card/), with both layers fading in on hover only.' },
      { title: 'Focus grids', text: 'Highlight items in a [focus cards](/ui-snippets/focus-cards/) grid, where the masked `::after` frame brightens under the pointer.' },
    ],
    faqs: [
      { q: 'How do the glow and border track the cursor together?', a: `A single mousemove handler writes the pointer position into two CSS custom properties, --mx and --my, on the card. Two pseudo-elements read those same variables — ::before for the surface glow and ::after for the border — so both move in lockstep with only two values updated per frame.` },
      { q: 'How can the border itself light up?', a: `The ::after layer fills the card with a bright radial gradient, then a CSS mask with mask-composite: exclude cuts out everything except a 1px frame around the edge. Only the border shows the gradient, and because the gradient is centred on the cursor variables, it brightens exactly where the pointer is.` },
      { q: 'Why does the effect not block clicks?', a: `Both spotlight pseudo-elements are pointer-events: none, so they never intercept the cursor — clicks pass through to the button and links beneath. isolation: isolate plus z-index ordering keeps the glow above the media but below the interactive content, so everything stays clickable and crisp.` },
      { q: 'Is the effect expensive?', a: `No. Only two CSS variables change per pointer move; the gradients and masks are static. The browser repaints the pseudo-elements but never reflows layout, and the layers fade in only on hover, so the resting card costs nothing. It runs smoothly even in a dense product grid.` },
      { q: 'How do I use this spotlight product card in React, Vue, or Angular?', a: `Attach an onMouseMove handler that writes --mx and --my to the card via a ref, imperatively, so you do not re-render on every pointer move. Keep the rest as ordinary JSX/template markup. The pseudo-element gradients and mask CSS port unchanged; in Tailwind use arbitrary properties for the mask-composite rule since it has no built-in utility.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out how one mousemove handler drives two separate pseudo-element gradients by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the ::before glow and ::after border both read the same --mx and --my variables yet look visually distinct, or how the mask-composite exclude rule on the ::after layer isolates just the 1px border from an otherwise full-card gradient fill. The same assistant can help optimize it, for example checking whether writing two CSS custom properties on every mousemove event is cheap enough to avoid throttling even on a page with many of these cards. It's also useful for extending the feature: ask it to swap the placeholder shape in the media area for a real product image with a matching glow tint, add a wishlist heart icon that toggles state, or make the Added confirmation state persist longer if clicked multiple times in a row. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a single e-commerce product card with a cursor-following spotlight glow and a matching illuminated border in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A product card with a media area (a placeholder shape or image plus a small badge), a name and price row, a description, a star rating with a review count, and an Add to cart button.
- One mousemove listener on the card must write the cursor's position relative to the card (computed via getBoundingClientRect, not raw clientX/clientY) into two CSS custom properties on the card element.
- A ::before pseudo-element must render a large, soft radial gradient across the whole card surface, centered using those same two custom properties, hidden at rest and fading in only on hover via an opacity transition.
- A separate ::after pseudo-element must render a tighter, brighter radial gradient also centered on the same custom properties, but clipped using a CSS mask so that only a roughly 1px border ring around the card's edge is visible — the interior of the gradient must be invisible, achieved by compositing two stacked masks together rather than by drawing a literal border element.
- Both pseudo-elements must be pointer-events none and must not sit above the card's real content in stacking order, so the Add to cart button and any text remain fully clickable and legible at all times.
- Clicking Add to cart must change its label to a confirmation state for a short duration (roughly 1 to 2 seconds) and then revert automatically to the original label, without needing a page reload or external state.`,
    },
  },
};

export default spotlightProductCard;
