const giftWrapOptionCard = {
  id: 'gift-wrap-option-card',
  title: 'Gift Wrap Option Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="gwc-card">
  <div class="gwc-top">
    <div class="gwc-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7C10 3 6 3 6 6c0 2 3 1 6 1M12 7c2-4 6-4 6-1 0 2-3 1-6 1"/></svg>
    </div>
    <div class="gwc-copy">
      <label class="gwc-toggle-row">
        <span>
          <strong>Add gift wrap</strong>
          <small>Wrapped in tissue paper with a ribbon</small>
        </span>
        <span class="gwc-switch"><input type="checkbox" id="gwcToggle"><span class="gwc-slider"></span></span>
      </label>
    </div>
    <div class="gwc-price" id="gwcPrice">+&#36;0.00</div>
  </div>

  <div class="gwc-detail" id="gwcDetail" hidden>
    <div class="gwc-section">
      <div class="gwc-label">Wrap style</div>
      <div class="gwc-swatches" id="gwcSwatches">
        <button type="button" class="gwc-swatch selected" data-color="#e8b4bc" style="background:#e8b4bc" aria-label="Blush"></button>
        <button type="button" class="gwc-swatch" data-color="#8fb996" style="background:#8fb996" aria-label="Sage"></button>
        <button type="button" class="gwc-swatch" data-color="#e3c565" style="background:#e3c565" aria-label="Gold"></button>
        <button type="button" class="gwc-swatch" data-color="#7c93c9" style="background:#7c93c9" aria-label="Slate blue"></button>
      </div>
    </div>

    <div class="gwc-section">
      <div class="gwc-label">Gift message <span id="gwcCount">0/120</span></div>
      <textarea id="gwcMessage" maxlength="120" placeholder="Write a short note for the recipient..."></textarea>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f7f3ee;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.gwc-card{background:#fff;border:1px solid #ece4d8;border-radius:16px;padding:18px 20px;width:100%;max-width:400px;box-shadow:0 14px 34px rgba(120,90,60,.1)}
.gwc-top{display:flex;align-items:flex-start;gap:12px}
.gwc-icon{width:38px;height:38px;border-radius:10px;background:#fdf0ef;color:#d6796f;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.gwc-icon svg{width:20px;height:20px}
.gwc-copy{flex:1;min-width:0}
.gwc-toggle-row{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;cursor:pointer}
.gwc-toggle-row strong{display:block;font-size:14px;font-weight:800;color:#3a2f28}
.gwc-toggle-row small{display:block;font-size:11.5px;color:#8a7d6e;margin-top:2px}
.gwc-switch{position:relative;width:38px;height:22px;flex-shrink:0;margin-top:2px}
.gwc-switch input{opacity:0;width:0;height:0}
.gwc-slider{position:absolute;inset:0;background:#e4dccf;border-radius:999px;transition:background .18s}
.gwc-slider::before{content:'';position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform .18s;box-shadow:0 1px 3px rgba(0,0,0,.25)}
.gwc-switch input:checked + .gwc-slider{background:#d6796f}
.gwc-switch input:checked + .gwc-slider::before{transform:translateX(16px)}
.gwc-price{font-size:13px;font-weight:800;color:#a89a87;white-space:nowrap;flex-shrink:0}
.gwc-price.active{color:#c2624f}

.gwc-detail{margin-top:16px;padding-top:16px;border-top:1px solid #f0e9df;animation:gwcIn .2s ease}
@keyframes gwcIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.gwc-section{margin-bottom:14px}
.gwc-section:last-child{margin-bottom:0}
.gwc-label{display:flex;justify-content:space-between;font-size:11px;font-weight:700;color:#8a7d6e;text-transform:uppercase;letter-spacing:.03em;margin-bottom:8px}
.gwc-swatches{display:flex;gap:9px}
.gwc-swatch{width:28px;height:28px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1.5px #e4dccf;cursor:pointer;transition:box-shadow .12s,transform .12s}
.gwc-swatch:hover{transform:scale(1.08)}
.gwc-swatch.selected{box-shadow:0 0 0 2px #c2624f}
.gwc-message-textarea,#gwcMessage{width:100%;border:1.5px solid #e4dccf;border-radius:10px;padding:10px 11px;font-size:12.5px;font-family:inherit;color:#3a2f28;resize:none;min-height:56px;outline:none;transition:border-color .15s}
#gwcMessage:focus{border-color:#d6796f}`,

  js: `var GIFT_WRAP_PRICE = 4.5;

var toggle = document.getElementById('gwcToggle');
var detail = document.getElementById('gwcDetail');
var priceEl = document.getElementById('gwcPrice');
var message = document.getElementById('gwcMessage');
var countEl = document.getElementById('gwcCount');
var swatches = document.getElementById('gwcSwatches');

function fmtPrice(n) {
  return '+$' + n.toFixed(2);
}

toggle.addEventListener('change', function () {
  var on = toggle.checked;
  detail.hidden = !on;
  priceEl.textContent = fmtPrice(on ? GIFT_WRAP_PRICE : 0);
  priceEl.classList.toggle('active', on);
});

swatches.addEventListener('click', function (e) {
  var btn = e.target.closest('.gwc-swatch');
  if (!btn) return;
  swatches.querySelectorAll('.gwc-swatch').forEach(function (s) { s.classList.remove('selected'); });
  btn.classList.add('selected');
});

message.addEventListener('input', function () {
  countEl.textContent = message.value.length + '/120';
});`,

  seo: {
    title: 'Gift Wrap Option Card — Free HTML CSS JS Snippet',
    description: `A checkout add-on card with a gift-wrap toggle, color swatch picker, a message textarea with a live character counter, and a price delta. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Gift Wrap Option Card — Toggle Add-On With Wrap Colors & a Live Character Count',
      description: `A well-designed checkout add-on does three things: it stays out of the way until the shopper wants it, it makes the exact cost of opting in obvious, and it doesn't ask for more detail than it needs. The gift wrap option card follows all three — a single toggle reveals the wrap-style and message options only when switched on, and a price delta updates the instant the toggle flips. Pair it with a [promo code input](/ui-snippets/promo-code-input/) or [checkout form](/ui-snippets/checkout-form/) for the rest of the purchase flow.

**Collapsed by default, expanded on demand**

At rest, the card shows just the toggle, its description, and a "+$0.00" price — a single row that doesn't compete for attention with the actual checkout. Switching the toggle on reveals the wrap-style swatches and the message textarea in one smooth slide-and-fade, and switching it back off collapses everything again, so the detail only ever occupies space when it's relevant to the current decision.

**The price delta is the whole point**

Rather than hiding the cost of the add-on in a total that updates elsewhere on the page, the price sits directly next to the toggle and updates from "+$0.00" to the real charge ("+$4.50") the instant you opt in, with a color change to draw the eye. This answers the shopper's actual question — "what does checking this box cost me?" — without requiring them to scroll to a summary to find out.

**A small, tactile swatch picker**

Wrap style is chosen from four color swatches rather than a dropdown, because it's a purely visual decision — seeing the actual colors is faster and more satisfying than reading their names in a \`<select>\`. Clicking a swatch removes the \`.selected\` ring from whichever was previously chosen and applies it to the new one, guaranteeing exactly one wrap style is ever selected at a time.

**A message field that respects a real constraint**

Gift messages usually print on a small card, so the textarea enforces a \`maxlength\` and shows a live "34/120" counter that updates on every keystroke — the same low-friction pattern as a [checkout form](/ui-snippets/checkout-form/)'s field validation, telling the shopper exactly how much room they have left rather than letting them write past a limit and silently truncating it later.

**Wiring it into checkout**

On submit, read \`toggle.checked\`, the \`.selected\` swatch's \`data-color\`, and the message textarea's value, and include them in your order payload alongside your normal cart total plus the \`GIFT_WRAP_PRICE\` delta if enabled. The card's local state (toggle, swatch selection, message) is intentionally simple enough to lift into a parent cart/checkout state object with no restructuring.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A collapsed gift-wrap card renders showing just the toggle and a "+$0.00" price.` },
      { title: 'Switch the toggle on', text: `The wrap-color swatches and message textarea slide into view; the price updates to "+$4.50".` },
      { title: 'Pick a wrap color', text: `Click any swatch — the selected ring moves to it and the others deselect.` },
      { title: 'Type a gift message', text: `The counter below the label updates live and the textarea won't exceed 120 characters.` },
      { title: 'Switch the toggle off', text: `The detail section collapses and the price returns to "+$0.00".` },
      { title: 'Wire to checkout', text: `Read the toggle, selected swatch color, and message on submit and add them to your order payload.` },
    ] },
    features: [
      { title: 'Collapsed-by-default detail', text: `Wrap options and message field only take up space once the toggle is switched on.` },
      { title: 'Live price delta', text: `The add-on price updates instantly between +$0.00 and the real charge as the toggle flips.` },
      { title: 'Visual swatch picker', text: `Wrap color is chosen from real color swatches instead of a text dropdown.` },
      { title: 'Single-selection guarantee', text: `Clicking a swatch always deselects the previous one — exactly one style is ever active.` },
      { title: 'Enforced message limit', text: `A maxlength textarea paired with a live counter prevents writing past the print limit.` },
      { title: 'Smooth reveal animation', text: `The detail section fades and slides in rather than snapping open abruptly.` },
      { title: 'Accessible toggle markup', text: `A real checkbox input with a styled slider keeps the switch keyboard- and screen-reader-friendly.` },
      { title: 'Simple, liftable state', text: `Toggle, swatch, and message state are plain values easy to lift into a parent cart state.` },
    ],
    useCases: [
      { title: 'E-commerce checkout add-ons', text: `Offer gift wrapping as an upsell alongside a [checkout form](/ui-snippets/checkout-form/).` },
      { title: 'Gift card and gift-shop flows', text: `Pair with a [gift card](/ui-snippets/gift-card/) product page to bundle wrapping with the purchase.` },
      { title: 'Holiday and seasonal promotions', text: `Highlight a limited-time gift-wrap option during a seasonal shopping campaign.` },
      { title: 'Subscription box customization', text: `Let subscribers add a gift note and wrap style to a one-off gifted box.` },
      { title: 'Marketplace seller options', text: `Offer wrap/packaging add-ons as a configurable line item per order.` },
      { title: 'Order customization patterns', text: `A reference for a collapsible, priced add-on toggle usable beyond gift wrap.` },
      { icon: 'CODE', title: 'Related: 360° Product Spin Viewer', desc: 'See the [360° Product Spin Viewer](/ui-snippets/product-360-image-spin/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the price update stay accurate?', a: `The price display reads a single GIFT_WRAP_PRICE constant and formats it with fmtPrice() based only on the toggle's checked state — "+$0.00" when off, the real price when on. Because there's one constant and one formatting function rather than separately hard-coded strings for each state, the price shown can never drift from the actual charge you'd add to the order total.` },
      { q: 'How does the swatch picker guarantee only one selection?', a: `The click handler is attached once to the swatch container (not to each swatch individually) and, on every click, first removes the .selected class from every swatch before adding it to the one that was clicked. This "clear all, then select one" pattern makes it structurally impossible to end up with zero or multiple swatches selected at once.` },
      { q: 'What happens if someone types past 120 characters?', a: `The textarea has a native maxlength="120" attribute, so the browser itself prevents typing, pasting, or otherwise inserting text beyond that length — it's enforced at the input level, not just visually. The counter above it reads message.value.length on every input event, so it always reflects the actual current length and never exceeds "120/120".` },
      { q: 'How do I change the gift wrap price or add more wrap styles?', a: `Edit the GIFT_WRAP_PRICE constant for the price — it's the only place the amount is defined. For wrap styles, add another .gwc-swatch button with its own data-color and a background color in the HTML; the existing click handler works on any number of swatches without changes since it selects by class, not by a fixed count.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Model gift-wrap enabled, the selected swatch color, and the message text as component state (or fields in a parent checkout/cart state object). Derive the price delta and the detail section's visibility from the enabled boolean with a computed value, and bind the swatch buttons' selected state and the textarea's value/onChange to that same state rather than direct DOM class toggling.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the toggle-driven reveal pattern by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the "clear all, then select one" pattern in the swatch click handler guarantees exactly one wrap style is ever selected, and why deriving the price display from a single constant and the toggle's boolean state (rather than separate hard-coded strings) prevents the shown price from ever drifting from the real charge. The same assistant can help you optimize it — ask whether the detail section's reveal animation should respect prefers-reduced-motion for accessibility. It's also useful for extending the card: ask it to add a live wrap-color preview illustration that updates as you pick a swatch, support multiple gift-wrap tiers at different price points, or persist the selected options into a shared checkout state object. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "gift wrap option" checkout add-on card in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Show a toggle switch (a real checkbox styled as a slider, for accessibility) labeled "Add gift wrap" with a short description, collapsed by default so no extra options are visible until it's switched on.
- Next to the toggle, show a price delta that reads "+$0.00" when the toggle is off and updates instantly to the real add-on price (from a single named price constant, not a hard-coded string) the moment the toggle is switched on, with a visual color change to draw attention to the active price.
- When the toggle is switched on, reveal (with a smooth animated transition, not an abrupt snap) a detail section containing: a row of 3-4 clickable color swatches representing wrap styles, where clicking any swatch visually marks it as the single selected style and always deselects whichever swatch was previously selected (never zero or multiple selected at once); and a gift-message textarea capped at a maximum character length (e.g. 120) with a live counter above it that updates on every keystroke and never allows the count to exceed the max.
- Switching the toggle back off must collapse the detail section again and reset the displayed price back to "+$0.00", without necessarily discarding the user's swatch selection or typed message underneath.
- Keep all interaction state (toggle on/off, selected swatch, message text) simple enough that it could be read out programmatically on form submission and included in an order payload.`,
    },
  },
};

export default giftWrapOptionCard;
