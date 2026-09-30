const propertyListingCard = {
  id: 'property-listing-card',
  title: 'Property Listing Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<article class="plc-card" id="plcCard">
  <div class="plc-media">
    <span class="plc-badge" id="plcBadge">New</span>
    <button class="plc-fav" id="plcFav" type="button" aria-pressed="false" aria-label="Save property">
      <svg class="plc-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 21s-7.5-4.6-10-9.2C.4 8.1 2 4.5 5.6 4c2.1-.3 4 .8 6.4 3.2C14.4 4.8 16.3 3.7 18.4 4c3.6.5 5.2 4.1 3.6 7.8C19.5 16.4 12 21 12 21z"></path>
      </svg>
    </button>
    <span class="plc-price">$625,000</span>
  </div>
  <div class="plc-body">
    <div class="plc-stats">
      <span class="plc-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"></path><path d="M3 18h18M5 10V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4M13 10V8a1 1 0 0 1 1-1h4a2 2 0 0 1 2 2v1"></path></svg>3 bd</span>
      <span class="plc-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3z"></path><path d="M6 12V6a2 2 0 0 1 2-2h1M4 12V9a1 1 0 0 1 1-1h1M6 18v2M18 18v2"></path></svg>2 ba</span>
      <span class="plc-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"></path></svg>1,840 sqft</span>
    </div>
    <h3 class="plc-address">428 Maple Ridge Court</h3>
    <p class="plc-sub">Willow Creek, TX 78660</p>
    <div class="plc-foot">
      <span class="plc-days">Listed 4 days ago</span>
      <span class="plc-agent">Listed by Rowan &amp; Co.</span>
    </div>
  </div>
</article>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.plc-card{width:100%;max-width:340px;background:#141822;border:1px solid #232a38;border-radius:18px;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,.35);transition:transform .2s,box-shadow .2s}
.plc-card:hover{transform:translateY(-3px);box-shadow:0 24px 56px rgba(0,0,0,.45)}
.plc-media{position:relative;aspect-ratio:16/11;background:linear-gradient(150deg,#2a3a52 0%,#1b2433 45%,#101521 100%);overflow:hidden}
.plc-media::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(100deg,rgba(255,255,255,.05) 0 2px,transparent 2px 42px),repeating-linear-gradient(10deg,rgba(255,255,255,.03) 0 1px,transparent 1px 60px)}
.plc-media::after{content:'';position:absolute;left:12%;right:12%;bottom:0;height:38%;background:linear-gradient(180deg,transparent,rgba(0,0,0,.35));clip-path:polygon(8% 100%,8% 40%,50% 8%,92% 40%,92% 100%)}
.plc-badge{position:absolute;top:12px;left:12px;background:#22c55e;color:#052e12;font-size:11px;font-weight:800;letter-spacing:.02em;padding:5px 10px;border-radius:999px;z-index:2}
.plc-badge.reduced{background:#f59e0b;color:#3a1e02}
.plc-fav{position:absolute;top:10px;right:10px;width:34px;height:34px;border-radius:50%;border:none;background:rgba(10,12,18,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#e5e7eb;z-index:2;transition:background .15s,transform .15s}
.plc-fav:hover{transform:scale(1.06)}
.plc-fav .plc-heart{width:18px;height:18px;transition:stroke .15s,fill .15s,transform .2s}
.plc-fav[aria-pressed="true"] .plc-heart{fill:#fb7185;stroke:#fb7185;transform:scale(1.1)}
.plc-price{position:absolute;left:12px;bottom:12px;background:rgba(10,12,18,.72);backdrop-filter:blur(4px);color:#fff;font-size:17px;font-weight:800;padding:6px 12px;border-radius:10px;z-index:2}
.plc-body{padding:16px 18px 18px}
.plc-stats{display:flex;gap:14px;margin-bottom:10px}
.plc-stat{display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:700;color:#a5adc0}
.plc-stat svg{width:15px;height:15px;flex-shrink:0}
.plc-address{font-size:16px;font-weight:800;color:#f1f4fa;letter-spacing:-.01em}
.plc-sub{font-size:13px;color:#7c8496;margin-top:3px}
.plc-foot{display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid #232a38}
.plc-days{font-size:11.5px;color:#5b6479}
.plc-agent{font-size:11.5px;color:#5b6479}`,

  js: `var favBtn = document.getElementById('plcFav');
var badge = document.getElementById('plcBadge');

favBtn.addEventListener('click', function () {
  var saved = favBtn.getAttribute('aria-pressed') === 'true';
  favBtn.setAttribute('aria-pressed', String(!saved));
  favBtn.setAttribute('aria-label', !saved ? 'Remove from saved properties' : 'Save property');
});

// Demo toggle: click the badge to preview the "Price reduced" state.
badge.addEventListener('click', function () {
  var reduced = badge.classList.toggle('reduced');
  badge.textContent = reduced ? 'Price reduced' : 'New';
});`,

  seo: {
    title: 'Property Listing Card — Free Real Estate Card UI Snippet',
    description: `A real-estate listing card with a photo placeholder, price overlay, beds/baths/sqft stats, a heart save toggle, and a New/Price-reduced badge. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Property Listing Card — Real Estate Photo, Stats, and Save Toggle in One Card',
      description: `The property listing card is the unit every real-estate search result, map pin popup, and "similar homes" rail is built from — a photo, a price, the beds/baths/sqft trio, an address, and a way to shortlist it without leaving the grid. This snippet builds that card with a pure-CSS photo placeholder (a layered gradient with a faint window-and-roofline silhouette, no image request required), a floating price tag, a status badge, and an accessible heart toggle.

**A CSS-only photo placeholder**

Instead of a real photo, the media area layers a diagonal gradient, two repeating-linear-gradient textures for subtle grain, and a clipped polygon that reads as a simple roofline silhouette against the horizon. It's deliberately abstract — the point is to demonstrate the card's layout and states without depending on a licensed image — and it's trivial to swap for a real \`<img>\` or background photo in production.

**Stats row with inline icon SVGs**

Beds, baths, and square footage sit in a row of small inline SVG icons paired with bold numerals, the scannable pattern buyers pattern-match on instantly across every major listing site. Each icon is a tiny hand-drawn path (a bed frame, a tub, a floor-plan grid) rather than an icon-font dependency, keeping the snippet free of external requests — consistent with how a [product card](/ui-snippets/product-card/) keeps its rating stars inline rather than font-based.

**An accessible save toggle**

The heart button is a real \`<button>\` with \`aria-pressed\` reflecting saved state and an \`aria-label\` that updates between "Save property" and "Remove from saved properties" — the same accessible toggle-button pattern used by [favorite button](/ui-snippets/favorite-button/) and [wishlist heart button](/ui-snippets/wishlist-heart-button/). The heart fills and briefly scales up on save, giving immediate visual confirmation without a network round trip.

**Status badge for urgency and updates**

A top-left badge flags listing status — "New" in green for a fresh listing, or "Price reduced" in amber when the seller drops the price — the kind of contextual signal that drives clicks in a search results grid. In this demo, clicking the badge toggles between the two states so you can preview both without editing the markup.

**Built for a grid, and for a calculator handoff**

The card's fixed-ratio media and consistent footer height make it safe to repeat in a CSS grid of any column count. Once a buyer taps into a listing, the natural next step is affordability — hand the price straight into a [mortgage calculator](/ui-snippets/mortgage-calculator/) or the fuller [mortgage payment breakdown](/ui-snippets/mortgage-payment-breakdown/) so they can see a monthly payment before they ever contact an agent.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A listing card renders with a gradient photo placeholder, price tag, badge, and stats row.` },
      { title: 'Click the heart', text: `The icon fills and scales up; aria-pressed and aria-label update for screen readers.` },
      { title: 'Click the badge', text: `Toggles between "New" and "Price reduced" so you can preview both states.` },
      { title: 'Swap in a real photo', text: `Replace the .plc-media gradient with a background-image or an <img>.` },
      { title: 'Repeat it in a grid', text: `Wrap several cards in a CSS grid — the fixed aspect-ratio keeps rows aligned.` },
      { title: 'Wire up the click target', text: `Add a link or click handler on the card to open the full listing page.` },
    ] },
    features: [
      { title: 'CSS-only photo placeholder', text: `A layered gradient and roofline silhouette — no image request needed.` },
      { title: 'Floating price tag', text: `A high-contrast overlay pinned to the media area's corner.` },
      { title: 'Inline SVG stat icons', text: `Bed, bath, and sqft icons with no icon-font dependency.` },
      { title: 'Accessible save toggle', text: `Real button with aria-pressed and a dynamic aria-label.` },
      { title: 'Animated heart fill', text: `Scales and fills color on save for instant visual feedback.` },
      { title: 'Status badge', text: `New or Price reduced, color-coded and easy to restyle.` },
      { title: 'Fixed-ratio media', text: `aspect-ratio keeps every card aligned in a responsive grid.` },
      { title: 'Grid-ready layout', text: `Consistent footer height so rows stay level at any column count.` },
    ],
    useCases: [
      { title: 'Real estate search results', text: `The repeating unit for an MLS or listing-site results grid.` },
      { title: 'Map pin popups', text: `A compact version inside a map marker's popover card.` },
      { title: 'Similar homes rails', text: `A horizontal scroller of comparable listings on a detail page.` },
      { title: 'Saved / favorites list', text: `Pair with [favorite button](/ui-snippets/favorite-button/) for a shortlist page.` },
      { title: 'Affordability handoff', text: `Link the price into a [mortgage calculator](/ui-snippets/mortgage-calculator/).` },
      { title: 'Agent portfolio pages', text: `Showcase an agent's active listings in a card grid.` },
    ],
    faqs: [
      { q: 'Why is the photo a CSS gradient instead of an image?', a: `So the snippet renders instantly with zero network requests and no licensing concerns while you evaluate the layout. In production, swap the .plc-media background for a real photo via background-image or an absolutely positioned <img> with object-fit: cover — the badge, price tag, and heart button are already positioned with z-index above the media layer, so they'll sit correctly on top of a real photo too.` },
      { q: 'How does the heart button stay accessible?', a: `It's a real <button>, not a styled <div>, so it's keyboard-focusable and clickable via Enter or Space by default. Its aria-pressed attribute reflects saved state as a boolean, and its aria-label switches between "Save property" and "Remove from saved properties" on toggle, so a screen reader announces both the current state and the action the next press will take.` },
      { q: 'How do I make the whole card clickable to a listing page?', a: `Wrap the .plc-card in an <a> tag, or add a click handler on the card that navigates — but keep the heart button's click handler calling event.stopPropagation() so saving a listing doesn't also trigger navigation. That's the same pattern used by any card with a nested interactive control, like a product card with an add-to-cart button.` },
      { q: 'How do I show different badge states beyond New and Price reduced?', a: `The badge is just a span with a modifier class (.reduced) that swaps its background color. Add more modifier classes — for example .pending or .open-house — each with its own background, and set the class and text based on the listing's actual status field when you render the card from data.` },
      { q: 'How do I use this property listing card in React, Vue, or Angular?', a: `Pass address, price, stats, photo URL, and a saved boolean as props; render the heart button's aria-pressed and fill class from that boolean and toggle it in a click handler. In React, that's useState(false) with an onClick that flips it and calls a save callback; in Vue, a reactive ref bound with :aria-pressed and @click. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the layered placeholder or the toggle accessibility on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the .plc-media pseudo-elements combine a diagonal gradient, a repeating-linear-gradient texture, and a clip-path polygon to fake a photo without an image request, or why the heart button's aria-pressed attribute and dynamic aria-label matter more than just toggling a CSS class. The same assistant can help optimize it — ask whether the card's fixed aspect-ratio media area is the right approach for a masonry-style grid versus a uniform grid, or whether the badge and price tag's z-index stacking will still work once a real photo replaces the gradient. It's also useful for extending the card: ask it to add a horizontal photo carousel with dots, a "compare" checkbox alongside the heart, or a skeleton loading state for when listing data is still fetching. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "property listing card" for a real-estate site in plain HTML, CSS, and JavaScript — no frameworks, no external images.

Requirements:
- A photo area built entirely from CSS (gradients, repeating-linear-gradient texture, and a clip-path shape) rather than a real image, since this must render with zero network requests — but structured so it can be swapped for a real background-image or <img> without changing the layered elements sitting on top of it (badge, price tag, save button).
- A status badge in the top-left corner of the photo area (e.g. "New" in green, or "Price reduced" in amber) and a price tag overlaid on the photo's bottom-left corner, both above the photo layer via z-index.
- A save/favorite toggle button in the photo's top-right corner built as a real <button> (not a div) with an SVG heart icon that fills with color and briefly scales up when toggled on; the button must expose its state via aria-pressed and update its aria-label between "Save property" and "Remove from saved properties" based on that state.
- A stats row below the photo showing bed count, bath count, and square footage, each with a small inline SVG icon (not an icon font) directly beside the number.
- An address heading, a city/state/zip subline, and a footer row with "listed X days ago" text and an agent or brokerage name, separated from the stats above by a thin top border.
- A fixed aspect-ratio on the photo area so the card stays visually consistent when repeated in a responsive CSS grid at any column count, and hover elevation (a subtle lift and shadow increase) on the whole card.`,
    },
  },
};

export default propertyListingCard;
