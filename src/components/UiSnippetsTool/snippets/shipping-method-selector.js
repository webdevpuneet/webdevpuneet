const shippingMethodSelector = {
  id: 'shipping-method-selector',
  title: 'Shipping Method Selector',
  lastmod: '2026-06-16',
  category: 'forms',
  html: `<div class="sm-card">
  <h2 class="sm-title">Delivery method</h2>

  <div class="sm-opts" id="smOpts">
    <label class="sm-opt sel" data-cost="0">
      <input type="radio" name="ship" value="standard" checked onchange="selectShip(this)">
      <span class="sm-radio"></span>
      <span class="sm-icon">📦</span>
      <span class="sm-info">
        <span class="sm-name">Standard</span>
        <span class="sm-eta">5–7 business days</span>
      </span>
      <span class="sm-cost free">Free</span>
    </label>

    <label class="sm-opt" data-cost="9.90">
      <input type="radio" name="ship" value="express" onchange="selectShip(this)">
      <span class="sm-radio"></span>
      <span class="sm-icon">⚡</span>
      <span class="sm-info">
        <span class="sm-name">Express</span>
        <span class="sm-eta">2–3 business days</span>
      </span>
      <span class="sm-cost">$9.90</span>
    </label>

    <label class="sm-opt" data-cost="24.90">
      <input type="radio" name="ship" value="overnight" onchange="selectShip(this)">
      <span class="sm-radio"></span>
      <span class="sm-icon">✈️</span>
      <span class="sm-info">
        <span class="sm-name">Overnight <span class="sm-tag">Fastest</span></span>
        <span class="sm-eta">Next business day by 12 PM</span>
      </span>
      <span class="sm-cost">$24.90</span>
    </label>

    <label class="sm-opt" data-cost="0">
      <input type="radio" name="ship" value="pickup" onchange="selectShip(this)">
      <span class="sm-radio"></span>
      <span class="sm-icon">🏬</span>
      <span class="sm-info">
        <span class="sm-name">Store pickup</span>
        <span class="sm-eta">Ready in ~2 hours</span>
      </span>
      <span class="sm-cost free">Free</span>
    </label>
  </div>

  <div class="sm-summary">
    <div class="sm-row"><span>Subtotal</span><span>$128.00</span></div>
    <div class="sm-row"><span>Shipping</span><span id="smShip">Free</span></div>
    <div class="sm-row sm-total"><span>Order total</span><span id="smTotal">$128.00</span></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.sm-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:22px;width:100%;max-width:380px;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.sm-title{font-size:16px;font-weight:800;color:#1e293b;margin-bottom:16px}

.sm-opts{display:flex;flex-direction:column;gap:10px}
.sm-opt{display:flex;align-items:center;gap:12px;padding:14px;border:1.5px solid #e2e8f0;border-radius:13px;cursor:pointer;transition:border-color .15s,background .15s,box-shadow .15s;position:relative}
.sm-opt:hover{border-color:#cbd5e1}
.sm-opt.sel{border-color:#6366f1;background:#f5f3ff;box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.sm-opt input{position:absolute;opacity:0;width:0;height:0}

.sm-radio{width:20px;height:20px;border-radius:50%;border:2px solid #cbd5e1;flex-shrink:0;position:relative;transition:border-color .15s}
.sm-opt.sel .sm-radio{border-color:#6366f1}
.sm-opt.sel .sm-radio::after{content:'';position:absolute;inset:0;margin:auto;width:10px;height:10px;border-radius:50%;background:#6366f1;animation:sm-pop .2s ease}
@keyframes sm-pop{from{transform:scale(0)}to{transform:scale(1)}}

.sm-icon{font-size:22px;flex-shrink:0;width:26px;text-align:center}
.sm-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.sm-name{font-size:13px;font-weight:700;color:#1e293b;display:flex;align-items:center;gap:6px}
.sm-tag{font-size:9px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#fff;background:#6366f1;border-radius:5px;padding:2px 5px}
.sm-eta{font-size:11px;color:#94a3b8}
.sm-cost{font-size:14px;font-weight:800;color:#1e293b;white-space:nowrap}
.sm-cost.free{color:#16a34a}

.sm-summary{margin-top:18px;border-top:1px solid #f1f5f9;padding-top:14px}
.sm-row{display:flex;justify-content:space-between;font-size:13px;color:#64748b;margin-bottom:8px}
.sm-row span:last-child{font-weight:600;color:#475569;font-variant-numeric:tabular-nums}
.sm-total{font-size:16px;font-weight:800;color:#1e293b;border-top:1.5px solid #e2e8f0;padding-top:10px;margin-top:4px}
.sm-total span:last-child{color:#1e293b;font-weight:800}`,

  js: `var SUBTOTAL = 128.00;

function selectShip(input) {
  document.querySelectorAll('.sm-opt').forEach(function (o) { o.classList.remove('sel'); });
  var opt = input.closest('.sm-opt');
  opt.classList.add('sel');

  var cost = parseFloat(opt.dataset.cost) || 0;
  document.getElementById('smShip').textContent = cost === 0 ? 'Free' : '$' + cost.toFixed(2);
  document.getElementById('smShip').style.color = cost === 0 ? '#16a34a' : '#475569';
  document.getElementById('smTotal').textContent = '$' + (SUBTOTAL + cost).toFixed(2);
}`,

  seo: {
    title: 'Shipping Method Selector — Radio Cards HTML CSS JS',
    description: `Shipping method selector built from accessible radio cards with icons, ETAs & prices that update the live order total. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Shipping Method Selector — Accessible Radio Cards With ETAs, Prices & Live Order Total`,
      description: `Choosing a delivery method is a small but high-stakes checkout decision: shoppers weigh cost against speed, and the interface has to make that trade-off obvious at a glance. A plain \`<select>\` dropdown hides the options and forces a click to compare them; a set of radio cards lays every choice out with its icon, estimated arrival, and price side by side, and updates the order total the instant a selection changes. This snippet implements that pattern in plain HTML, CSS, and vanilla JavaScript: accessible radio cards with a custom-styled control, a highlighted selected state, and a live shipping and order-total recalculation.

**Radio cards, not a dropdown**

Each option is a \`<label>\` wrapping a hidden native \`<input type="radio">\`. Wrapping the radio in the label means clicking anywhere on the card selects it — the entire card is the hit target, which is far more forgiving than a tiny radio dot. The native radio is visually hidden but still present, so keyboard users can arrow between options and screen readers announce the group correctly. The visible control is a \`.sm-radio\` circle whose inner dot pops in with a small scale animation when its card is selected.

**Selected-state highlight**

\`selectShip\` clears the \`.sel\` class from every card and adds it to the chosen one. The selected card gets an indigo border, a tinted background, and a soft focus-ring shadow — the standard "selected card" treatment that reads instantly. Because the highlight is a class toggled in JavaScript (rather than relying solely on \`:checked\` CSS), the behaviour is identical across the React, Vue, and Angular exports.

**ETAs and pricing in context**

Every card shows three things in a fixed layout: an icon, the method name with its estimated arrival ("2–3 business days", "Next business day by 12 PM"), and the price aligned to the right. Free options render their price in green so "Free" stands out as a positive. The fastest option carries a small "Fastest" tag to guide users who optimise for speed. Laying out cost and speed together is what lets shoppers make the trade-off without clicking around.

**Live order-total recalculation**

Each card carries its shipping cost on a \`data-cost\` attribute. When a method is selected, \`selectShip\` reads that cost, updates the "Shipping" line (showing "Free" in green for zero-cost methods), and recomputes the "Order total" as \`subtotal + cost\`, all formatted with \`toFixed(2)\`. The total updates the moment the selection changes, so the financial consequence of choosing Overnight over Standard is immediate and clear.

In production you would render the cards from your carrier rate API (costs and ETAs can be dynamic by destination and weight), but the selection and recalculation logic stays exactly the same. Pair this selector with an [order summary](/ui-snippets/order-summary/), a [checkout payment form](/ui-snippets/checkout-form/), or a [shipping/order tracking timeline](/ui-snippets/order-tracking-timeline/) after purchase.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Delivery method" card appears with four radio-card options; Standard (Free) is pre-selected and highlighted, and the order total reads $128.00.` },
      { title: 'Click Express', text: `The Express card highlights with an indigo border and tinted background, the radio dot pops in, the Shipping line shows $9.90, and the total updates to $137.90.` },
      { title: 'Click Overnight', text: `The fastest option (tagged "Fastest") highlights and the total jumps to $152.90 — the cost of choosing speed is immediately visible.` },
      { title: 'Click Store pickup', text: `A free method — the Shipping line returns to a green "Free" and the total drops back to $128.00.` },
      { title: 'Use the keyboard', text: `Tab to the group and use the arrow keys to move between options — the native radios keep the selector fully keyboard-operable.` },
      { title: 'Wire in real rates', text: `Set each card's \`data-cost\` from your carrier API and update the ETA copy; the selection and total logic needs no changes.` },
    ] },
    features: [
      { title: 'Full-card hit target', text: `Each option is a \`<label>\` wrapping a hidden radio, so clicking anywhere on the card selects it — far more forgiving than a small radio dot.` },
      { title: 'Accessible native radios', text: `The real \`<input type="radio">\` is visually hidden but present, keeping arrow-key navigation and screen-reader group semantics intact.` },
      { title: 'Animated custom radio', text: `The \`.sm-radio\` inner dot scales in with a keyframe on selection, giving a polished control without sacrificing native behaviour.` },
      { title: 'Class-toggled highlight', text: `\`selectShip\` toggles a \`.sel\` class for the selected-card styling, so the highlight behaves identically across framework exports.` },
      { title: 'Cost-and-speed layout', text: `Icon, name, ETA, and right-aligned price sit in one row per card, letting shoppers weigh the speed/price trade-off at a glance.` },
      { title: 'Free price emphasis', text: `Zero-cost methods render "Free" in green so the absence of a charge reads as a positive, not just a missing number.` },
      { title: 'Data-attribute pricing', text: `Each card stores its cost on \`data-cost\`, so adding or changing methods is a markup edit — no JavaScript changes needed.` },
      { title: 'Live total recalculation', text: `Selecting a method updates the Shipping line and recomputes the Order total as \`subtotal + cost\`, formatted to two decimals instantly.` },
    ],
    useCases: [
      { title: 'Checkout delivery step', text: `The core use — pick a shipping speed during checkout. Place it above an [order summary](/ui-snippets/order-summary/) or inside a [checkout payment form](/ui-snippets/checkout-form/).` },
      { title: 'Pickup vs delivery choice', text: `Offer store pickup alongside shipping; selecting pickup can hide the address fields and keep shipping free.` },
      { title: 'Subscription delivery cadence', text: `Reuse the radio cards to pick a delivery frequency (weekly / monthly), pairing with a [subscription widget](/ui-snippets/subscription-widget/).` },
      { title: 'Service tier selection', text: `Any "pick one plan" decision — support tiers, processing speeds — maps to these priced radio cards with a live total.` },
      { title: 'Booking and appointment slots', text: `Present time-window options with prices and pick one; the selected-card pattern works for any single-choice list.` },
      { title: 'Payment method selection', text: `Swap shipping icons for card and wallet logos to build a payment-method picker with the same accessible radio-card structure.` },
    ],
    faqs: [
      { q: 'How do I load shipping rates from a carrier API?', a: `Render the \`.sm-opt\` cards from your rate response, setting each \`data-cost\` and the ETA text per method. Rates often depend on destination and cart weight, so re-render the cards when the address changes and call \`selectShip\` on the currently checked input to refresh the total with the new costs.` },
      { q: 'How do I keep the radios fully accessible?', a: `They already are — real \`<input type="radio">\` elements share a \`name\`, so they form one group that is keyboard-navigable with arrow keys and announced by screen readers. Add an \`aria-label\` or a heading association to the group, and ensure the selected-card styling is not the only indicator by keeping the radio dot visible.` },
      { q: 'How do I add free shipping over a threshold?', a: `Compute eligibility from the subtotal: if it exceeds your threshold, set the Standard (or Express) card's \`data-cost\` to 0, update its price label to "Free", and show a "You unlocked free shipping" note. Recalculate by calling \`selectShip\` on the checked input so the total reflects the new cost.` },
      { q: 'How do I disable a method that is unavailable for an address?', a: `Add a \`disabled\` attribute to that card's radio and a \`.disabled\` style (dimmed, \`not-allowed\` cursor), plus a short reason like "Not available for PO boxes". In \`selectShip\`, ignore clicks on disabled options. Re-evaluate availability whenever the shipping address changes.` },
      { q: 'How do I use this shipping selector in React, Vue, or Angular?', a: `In React, map an array of methods to radio cards, hold the selected value in \`useState\`, and derive the shipping cost and total from it — no manual DOM updates. In Vue, use \`v-model\` on the radio group and a \`computed\` total. In Angular, bind \`[(ngModel)]\` and compute the total in a getter. The card layout and animations port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out how the hidden radio inputs and the data-cost attributes cooperate on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why wrapping the native radio in a label rather than styling the input directly is what makes the whole card clickable, or how selectShip reads data-cost to keep the shipping line and order total in sync from one function. The same assistant can help optimize it, for example checking whether hardcoding SUBTOTAL as a constant would break the total once real cart data is wired in, or whether the cards should be generated from an array instead of static markup as more shipping methods are added. It's also useful for extending the feature: ask it to disable a method with a reason when it's unavailable for an address, add a free-shipping threshold that zeroes out a method's cost automatically, or animate the total's digit change on selection. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an accessible shipping method selector with a live order total in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Each shipping option must be a real label element wrapping a visually-hidden native radio input (not a styled div with a click handler), so the entire card is the click target and the native radios remain keyboard-navigable as one group via the shared name attribute.
- Each option's card must store its cost in a data-cost attribute on the label, display an icon, a name, an estimated delivery time, and a right-aligned price, with zero-cost options displaying "Free" in a distinct color from paid options.
- On selection, a single function must: remove the selected-state class from every option, add it only to the newly selected one, read that option's data-cost, update a "Shipping" line to show either "Free" (styled distinctly) or a formatted dollar amount, and recompute an "Order total" as a fixed subtotal constant plus the selected cost, formatted to two decimal places.
- Style the selected card distinctly (a colored border, a tinted background, and a focus-ring-style box-shadow) purely by toggling one class, so the same highlight logic works identically regardless of which option is chosen.
- Add a small custom radio indicator (a circle) whose inner dot animates in with a scale transition only when its parent option becomes selected, while the real native radio input stays functionally present but visually hidden.
- As a documented extension point in a code comment, show how the SUBTOTAL constant and each card's data-cost would instead be populated dynamically from a cart state and a shipping-rate API response.`,
    },
  },
};

export default shippingMethodSelector;
