const hotelRoomPicker = {
  id: 'hotel-room-picker',
  title: 'Hotel Room Type Picker',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="hrp-wrap">
  <h2 class="hrp-heading">Choose your room</h2>
  <div class="hrp-cards" id="hrpCards" role="radiogroup" aria-label="Room type">
    <label class="hrp-card">
      <input type="radio" name="hrpRoom" value="standard" data-price="129" />
      <div class="hrp-card-inner">
        <span class="hrp-radio-dot" aria-hidden="true"></span>
        <h3 class="hrp-name">Standard Queen</h3>
        <p class="hrp-desc">1 queen bed · 28 m²</p>
        <ul class="hrp-amenities">
          <li>Free Wi-Fi</li>
          <li>City view</li>
        </ul>
        <span class="hrp-price">$129<small>/night</small></span>
      </div>
    </label>
    <label class="hrp-card">
      <input type="radio" name="hrpRoom" value="deluxe" data-price="189" checked />
      <div class="hrp-card-inner">
        <span class="hrp-radio-dot" aria-hidden="true"></span>
        <span class="hrp-badge">Most popular</span>
        <h3 class="hrp-name">Deluxe King</h3>
        <p class="hrp-desc">1 king bed · 36 m²</p>
        <ul class="hrp-amenities">
          <li>Free Wi-Fi</li>
          <li>Ocean view</li>
          <li>Minibar</li>
        </ul>
        <span class="hrp-price">$189<small>/night</small></span>
      </div>
    </label>
    <label class="hrp-card">
      <input type="radio" name="hrpRoom" value="suite" data-price="309" />
      <div class="hrp-card-inner">
        <span class="hrp-radio-dot" aria-hidden="true"></span>
        <h3 class="hrp-name">Executive Suite</h3>
        <p class="hrp-desc">1 king bed + lounge · 58 m²</p>
        <ul class="hrp-amenities">
          <li>Free Wi-Fi</li>
          <li>Ocean view</li>
          <li>Minibar</li>
          <li>Butler service</li>
        </ul>
        <span class="hrp-price">$309<small>/night</small></span>
      </div>
    </label>
  </div>

  <div class="hrp-summary">
    <div class="hrp-nights">
      <span class="hrp-nights-label">Nights</span>
      <div class="hrp-stepper">
        <button type="button" class="hrp-step-btn" id="hrpMinus" aria-label="Decrease nights">−</button>
        <span class="hrp-nights-value" id="hrpNights">3</span>
        <button type="button" class="hrp-step-btn" id="hrpPlus" aria-label="Increase nights">+</button>
      </div>
    </div>
    <div class="hrp-total">
      <span class="hrp-total-label">Total</span>
      <span class="hrp-total-value" id="hrpTotal">$567</span>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0f18;color:#fff;min-height:100vh;padding:32px 16px;display:flex;align-items:center;justify-content:center}
.hrp-wrap{max-width:760px;margin:0 auto}
.hrp-heading{font-size:22px;margin-bottom:18px;letter-spacing:-.01em}
.hrp-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:22px}
.hrp-card{display:block;cursor:pointer;position:relative}
.hrp-card input{position:absolute;opacity:0;pointer-events:none}
.hrp-card-inner{position:relative;height:100%;border:1.5px solid #232a3d;border-radius:16px;padding:18px 16px 16px;background:#131722;transition:border-color .2s ease,background .2s ease,transform .2s ease}
.hrp-card:hover .hrp-card-inner{border-color:#3a4258}
.hrp-card input:checked + .hrp-card-inner{border-color:#818cf8;background:#171b2c;transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.18)}
.hrp-radio-dot{position:absolute;top:16px;right:16px;width:18px;height:18px;border-radius:50%;border:2px solid #3a4258;transition:border-color .2s ease}
.hrp-radio-dot::after{content:'';position:absolute;inset:3px;border-radius:50%;background:#818cf8;transform:scale(0);transition:transform .15s ease}
.hrp-card input:checked + .hrp-card-inner .hrp-radio-dot{border-color:#818cf8}
.hrp-card input:checked + .hrp-card-inner .hrp-radio-dot::after{transform:scale(1)}
.hrp-badge{display:inline-block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#c4b5fd;background:#241f42;padding:3px 8px;border-radius:999px;margin-bottom:8px}
.hrp-name{font-size:16px;font-weight:700;margin-bottom:4px;padding-right:26px}
.hrp-desc{font-size:12.5px;color:#7a8199;margin-bottom:10px}
.hrp-amenities{list-style:none;margin-bottom:14px;display:flex;flex-direction:column;gap:5px}
.hrp-amenities li{font-size:12.5px;color:#c3c8db;padding-left:16px;position:relative}
.hrp-amenities li::before{content:'✓';position:absolute;left:0;color:#4ade80;font-weight:700;font-size:11px}
.hrp-price{font-size:19px;font-weight:800}
.hrp-price small{font-size:11px;font-weight:500;color:#7a8199}
.hrp-summary{display:flex;justify-content:space-between;align-items:center;background:#131722;border:1px solid #232a3d;border-radius:14px;padding:16px 18px}
.hrp-nights-label,.hrp-total-label{display:block;font-size:11px;color:#7a8199;margin-bottom:6px}
.hrp-stepper{display:flex;align-items:center;gap:14px}
.hrp-step-btn{width:30px;height:30px;border-radius:9px;border:1px solid #2a3145;background:#1a1f2e;color:#fff;font-size:16px;cursor:pointer;transition:background .15s ease}
.hrp-step-btn:hover{background:#232a3d}
.hrp-nights-value{font-size:16px;font-weight:700;min-width:16px;text-align:center}
.hrp-total{text-align:right}
.hrp-total-value{font-size:24px;font-weight:800}`,

  js: `const cardsWrap = document.getElementById('hrpCards');
const radios = cardsWrap.querySelectorAll('input[name="hrpRoom"]');
const nightsEl = document.getElementById('hrpNights');
const totalEl = document.getElementById('hrpTotal');
const minusBtn = document.getElementById('hrpMinus');
const plusBtn = document.getElementById('hrpPlus');

let nights = 3;
const minNights = 1;
const maxNights = 14;

function selectedPrice() {
  const checked = cardsWrap.querySelector('input[name="hrpRoom"]:checked');
  return checked ? Number(checked.dataset.price) : 0;
}

function updateTotal() {
  const total = selectedPrice() * nights;
  totalEl.textContent = '$' + total.toLocaleString();
  nightsEl.textContent = nights;
  minusBtn.disabled = nights <= minNights;
  plusBtn.disabled = nights >= maxNights;
}

radios.forEach((radio) => {
  radio.addEventListener('change', updateTotal);
});

minusBtn.addEventListener('click', () => {
  if (nights > minNights) {
    nights -= 1;
    updateTotal();
  }
});

plusBtn.addEventListener('click', () => {
  if (nights < maxNights) {
    nights += 1;
    updateTotal();
  }
});

updateTotal();`,

  seo: {
    title: 'Hotel Room Type Picker — Free Radio-Card Selector With Total',
    description: `Selectable hotel room-type cards with amenities and price per night, a radio-card checked state, and a nights stepper that recalculates the running total. Plain HTML, CSS & JS.`,
    about: {
      title: 'Hotel Room Type Picker — Radio Cards With a Live Nightly Total',
      description: `The hotel room type picker is the card-based room selector booking sites use in place of a plain dropdown — Standard, Deluxe, Suite, each showing its bed configuration, size, amenities, and price per night, with the whole card clickable and a nights stepper that recalculates a running total live. This snippet builds it in plain HTML, CSS, and JavaScript.

**Radio inputs disguised as cards**

Each card is a \`<label>\` wrapping a visually hidden \`<input type="radio">\` and a styled \`.hrp-card-inner\`. Because the input and its sibling div share a parent label, clicking anywhere on the card toggles the radio, and the \`input:checked + .hrp-card-inner\` sibling selector drives the entire selected look — border color, background tint, lift, and a filled radio dot — with zero JavaScript for the visual state.

**Real radiogroup semantics**

The cards keep native \`<input type="radio" name="hrpRoom">\` elements grouped by \`name\`, wrapped in a \`role="radiogroup"\` container. That means keyboard users get free arrow-key navigation between options and screen readers announce them as a proper radio group — the styling is a skin over standard form semantics, not a replacement for them.

**Price per room, on the input itself**

Each radio input carries a \`data-price\` attribute holding that room's nightly rate. The total calculation reads whichever input is currently \`:checked\` and multiplies its \`data-price\` by the nights count — so adding a fourth room tier is just adding another labeled card with its own \`data-price\`, no JS changes required.

**A nights stepper wired to the same total**

Two buttons increment and decrement a \`nights\` counter, clamped between 1 and 14, disabling at each bound. Both the radio \`change\` event and the stepper buttons call the same \`updateTotal()\` function, so switching rooms or nights always keeps the total in sync from a single source of truth.

**A popular-choice badge**

The Deluxe card carries a small "Most popular" badge — a common booking-site nudge — built as plain inline markup rather than a script-driven recommendation, easy to move to whichever card should be highlighted.

**Customizing it**

Add a taxes-and-fees line, a "sold out" disabled state for a room type, or swap the stepper for a date-range picker that derives nights automatically. Pair it with a [property listing card](/ui-snippets/property-listing-card/), [checkout form](/ui-snippets/checkout-form/), or [radio card group](/ui-snippets/radio-card-group/) for other selection patterns.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three room cards and a nights/total summary render.` },
      { title: 'Click a card', text: `The whole card is clickable and shows the checked state.` },
      { title: 'Use the nights stepper', text: `+/- buttons clamp between 1 and 14 nights.` },
      { title: 'Watch the total update', text: `Price × nights recalculates on every change.` },
      { title: 'Add a room tier', text: `Copy a card, adjust amenities and data-price.` },
      { title: 'Wire real booking data', text: `Read the checked radio's value on submit.` },
    ] },
    features: [
      { title: 'Radio inputs as cards', text: `Sibling selector drives the checked look.` },
      { title: 'True radiogroup semantics', text: `Keyboard and screen-reader accessible.` },
      { title: 'Per-card data-price', text: `Total math reads price straight off the input.` },
      { title: 'Nights stepper', text: `Clamped +/- buttons recompute the total.` },
      { title: 'Single source of truth', text: `One updateTotal() keeps everything in sync.` },
      { title: 'Popular-choice badge', text: `Inline markup highlights a recommended tier.` },
      { title: 'Amenity checklists', text: `Per-room bullet list with check icons.` },
      { title: 'Zero dependencies', text: `Plain HTML, CSS, and JS, no CDN.` },
    ],
    useCases: [
      { title: 'Hotel booking pages', text: 'Let guests choose between Standard, Deluxe and Suite cards that show bed type, size and amenities, beside a [property listing card](/ui-snippets/property-listing-card/) for the hotel itself.' },
      { title: 'Checkout hand-off', text: 'Feed the selected room and number of nights straight into a [checkout form](/ui-snippets/checkout-form/), with the total read from each radio\'s `data-price` attribute.' },
      { title: 'Vacation rental units', text: 'Offer unit tiers with live pricing, where the whole card is a real radio input so keyboard and screen reader users get proper radiogroup behaviour.' },
      { title: 'Ticket tier selection', text: 'Reuse the pattern for event ticket tiers, with a sibling selector driving the checked appearance and a clamped stepper recomputing the total.' },
      { title: 'Plan comparison siblings', text: 'Compare with a [radio card group](/ui-snippets/radio-card-group/) for subscription plans, and use it in corporate travel tools that compare room options against a running total.' },
      { icon: 'CODE', title: 'Related: Staking Rewards Card', desc: 'See the [Staking Rewards Card](/ui-snippets/staking-rewards-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does clicking anywhere on the card select it?', a: `Each card is a label element wrapping a visually hidden radio input and the styled card body. Because a label toggles its wrapped input on click anywhere inside it, the whole card area is effectively the click target, and the input:checked + .hrp-card-inner sibling selector applies the selected styling automatically.` },
      { q: 'Is this still accessible to keyboard and screen reader users?', a: `Yes. The underlying inputs are real type="radio" elements sharing a name, grouped in a container with role="radiogroup", so arrow-key navigation and screen reader announcements work exactly as they would for a native radio group — the card look is a CSS skin, not a custom-built widget.` },
      { q: 'How is the total calculated?', a: `Each radio input carries a data-price attribute. updateTotal() finds the currently :checked input in the group, reads its data-price, multiplies by the nights counter, and writes the result to the total display. Both the stepper buttons and the radios' change event call this same function.` },
      { q: 'How do I add another room tier?', a: `Copy one .hrp-card label block, change its input's value and data-price, and update the name, description, and amenities list. No JavaScript changes are needed since the total logic reads whichever input is checked generically.` },
      { q: 'Can I replace the nights stepper with a date range picker?', a: `Yes — compute nights as the difference in days between a check-in and check-out date from a date picker, then call updateTotal() (or inline the same multiplication) whenever the date range changes instead of the +/- buttons.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering the selection styling on your own, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how wrapping a hidden radio input and a styled div in the same label, combined with the input:checked + .hrp-card-inner sibling selector, produces a fully clickable, accessible card without any JavaScript for the visual state. It's also useful for extending the pattern — ask it to add a "sold out" disabled room card, replace the nights stepper with a check-in/check-out date range that derives nights automatically, or add a taxes-and-fees breakdown beneath the total. Use it to adapt the component to your booking flow rather than shipping the demo data as-is.`,
      prompt: `Build a "hotel room type picker" in plain HTML, CSS, and JavaScript with no external dependencies.

Requirements:
- Three room-type cards (e.g. Standard, Deluxe, Suite), each built as a label wrapping a visually hidden native radio input (all sharing the same name, grouped in a container with role="radiogroup") plus a styled card body — so clicking anywhere on the card selects it and keyboard/screen-reader radio semantics keep working.
- Each card shows a room name, a short bed/size description, a short amenities checklist, and a price per night. Give one card a small "most popular" badge.
- A checked-state style driven purely by a CSS sibling selector (input:checked + .card-body) that changes the border color, adds a subtle background tint and lift, and fills in a custom radio dot — no JavaScript toggling classes for the visual state.
- Store each room's nightly price as a data-price attribute directly on its radio input.
- Below the cards, a nights stepper (decrement/increment buttons) clamped between 1 and 14 nights, and a total display.
- A single updateTotal() function that reads whichever radio is currently checked, multiplies its data-price by the current nights count, and updates both the nights display and total display — call it from both the radios' change event and the stepper buttons so everything stays in sync from one source of truth.
- Disable the stepper buttons at the min/max bounds.`,
    },
  },
};

export default hotelRoomPicker;
