const menuItemCustomizer = {
  id: 'menu-item-customizer',
  title: 'Restaurant Menu Item Customizer',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="mic-card">
  <div class="mic-media" aria-hidden="true">🍜</div>
  <div class="mic-body">
    <h2 class="mic-title">Spicy Miso Ramen</h2>
    <p class="mic-desc">Rich miso broth, chashu pork, soft egg, scallion, nori.</p>

    <div class="mic-section">
      <span class="mic-section-title">Size</span>
      <div class="mic-radio-group" id="micSize">
        <label class="mic-radio"><input type="radio" name="micSize" value="regular" data-delta="0" checked /><span>Regular</span></label>
        <label class="mic-radio"><input type="radio" name="micSize" value="large" data-delta="3" /><span>Large <em>+$3.00</em></span></label>
        <label class="mic-radio"><input type="radio" name="micSize" value="xl" data-delta="5.5" /><span>XL <em>+$5.50</em></span></label>
      </div>
    </div>

    <div class="mic-section">
      <span class="mic-section-title">Add-ons</span>
      <div class="mic-addons" id="micAddons">
        <label class="mic-checkbox"><input type="checkbox" value="egg" data-price="1.5" /><span>Extra egg</span><em>+$1.50</em></label>
        <label class="mic-checkbox"><input type="checkbox" value="chashu" data-price="3" /><span>Extra chashu</span><em>+$3.00</em></label>
        <label class="mic-checkbox"><input type="checkbox" value="corn" data-price="1" /><span>Corn</span><em>+$1.00</em></label>
        <label class="mic-checkbox"><input type="checkbox" value="chili" data-price="0.5" /><span>Chili oil</span><em>+$0.50</em></label>
      </div>
    </div>

    <div class="mic-footer">
      <div class="mic-stepper">
        <button type="button" class="mic-step-btn" id="micMinus" aria-label="Decrease quantity">−</button>
        <span class="mic-qty" id="micQty">1</span>
        <button type="button" class="mic-step-btn" id="micPlus" aria-label="Increase quantity">+</button>
      </div>
      <button type="button" class="mic-add" id="micAdd">Add to order · <span id="micTotal">$16.00</span></button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#100d0a;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.mic-card{width:100%;max-width:400px;background:linear-gradient(170deg,#221a12,#171310);border:1px solid #3a2d1d;border-radius:22px;overflow:hidden}
.mic-media{height:150px;display:flex;align-items:center;justify-content:center;font-size:64px;background:radial-gradient(circle at 50% 30%,#4a2f14,#1c1510)}
.mic-body{padding:20px}
.mic-title{font-size:19px;margin-bottom:6px;letter-spacing:-.01em}
.mic-desc{font-size:13px;color:#b3a897;line-height:1.5;margin-bottom:18px}
.mic-section{margin-bottom:18px}
.mic-section-title{display:block;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#e5883c;margin-bottom:10px}
.mic-radio-group{display:flex;flex-direction:column;gap:8px}
.mic-radio{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:11px;border:1px solid #3a2d1d;background:#1c1712;cursor:pointer;font-size:13.5px;transition:border-color .15s ease,background .15s ease}
.mic-radio input{accent-color:#e5883c;width:16px;height:16px}
.mic-radio:has(input:checked){border-color:#e5883c;background:#2a1f14}
.mic-radio em{margin-left:auto;font-style:normal;color:#9a8f7c;font-size:12px}
.mic-addons{display:flex;flex-direction:column;gap:8px}
.mic-checkbox{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:11px;border:1px solid #3a2d1d;background:#1c1712;cursor:pointer;font-size:13.5px;transition:border-color .15s ease,background .15s ease}
.mic-checkbox input{accent-color:#e5883c;width:16px;height:16px}
.mic-checkbox:has(input:checked){border-color:#e5883c;background:#2a1f14}
.mic-checkbox em{margin-left:auto;font-style:normal;color:#9a8f7c;font-size:12px}
.mic-footer{display:flex;align-items:center;gap:10px;margin-top:6px}
.mic-stepper{display:flex;align-items:center;gap:10px;background:#1c1712;border:1px solid #3a2d1d;border-radius:12px;padding:8px 10px}
.mic-step-btn{width:26px;height:26px;border-radius:8px;border:1px solid #3a2d1d;background:#2a1f14;color:#fff;font-size:14px;cursor:pointer}
.mic-step-btn:hover{background:#3a2d1d}
.mic-qty{font-size:14px;font-weight:700;min-width:14px;text-align:center}
.mic-add{flex:1;padding:13px 10px;border-radius:12px;border:none;background:#e5883c;color:#20140a;font-size:13.5px;font-weight:800;cursor:pointer;transition:background .2s ease}
.mic-add:hover{background:#f0994f}`,

  js: `const basePrice = 12.5;
const sizeInputs = document.querySelectorAll('input[name="micSize"]');
const addonInputs = document.querySelectorAll('#micAddons input[type="checkbox"]');
const qtyEl = document.getElementById('micQty');
const minusBtn = document.getElementById('micMinus');
const plusBtn = document.getElementById('micPlus');
const totalEl = document.getElementById('micTotal');
const addBtn = document.getElementById('micAdd');

let qty = 1;
const minQty = 1;
const maxQty = 9;

function calcUnitPrice() {
  const sizeInput = document.querySelector('input[name="micSize"]:checked');
  let price = basePrice + (sizeInput ? Number(sizeInput.dataset.delta) : 0);
  addonInputs.forEach((input) => {
    if (input.checked) price += Number(input.dataset.price);
  });
  return price;
}

function updateTotal() {
  const total = calcUnitPrice() * qty;
  totalEl.textContent = '$' + total.toFixed(2);
  qtyEl.textContent = qty;
  minusBtn.disabled = qty <= minQty;
  plusBtn.disabled = qty >= maxQty;
}

sizeInputs.forEach((input) => input.addEventListener('change', updateTotal));
addonInputs.forEach((input) => input.addEventListener('change', updateTotal));

minusBtn.addEventListener('click', () => {
  if (qty > minQty) { qty -= 1; updateTotal(); }
});
plusBtn.addEventListener('click', () => {
  if (qty < maxQty) { qty += 1; updateTotal(); }
});

addBtn.addEventListener('click', () => {
  addBtn.textContent = 'Added ✓';
  setTimeout(() => {
    addBtn.innerHTML = 'Add to order · <span id="micTotal">' + totalEl.textContent + '</span>';
  }, 1200);
});

updateTotal();`,

  seo: {
    title: 'Restaurant Menu Item Customizer — Free Live-Total Order Card',
    description: `A restaurant menu item card with size options, add-on checkboxes, and a quantity stepper, all recalculating a live total price. Plain HTML, CSS & JS.`,
    about: {
      title: 'Restaurant Menu Item Customizer — Sizes, Add-ons, and a Live Total',
      description: `The menu item customizer is the detail card food ordering apps show when you tap a dish — a base item you can size up, load with add-ons, and multiply by quantity, watching the total price update after every choice. This snippet builds it in plain HTML, CSS, and JavaScript, no dependencies.

**Three price contributors, one calculation**

The unit price is built from three sources: a fixed \`basePrice\` constant in JS, the checked size radio's \`data-delta\` (a price difference, which can be \`0\`), and the sum of every checked add-on's \`data-price\`. \`calcUnitPrice()\` reduces all three into one number, then \`updateTotal()\` multiplies by quantity — so every possible combination of size, add-ons, and quantity resolves through the same two small functions.

**Radios for size, checkboxes for add-ons — on purpose**

Size is mutually exclusive (you can't order Regular and Large at once), so it's a radio group; add-ons are independent toggles, so they're checkboxes. Each price-affecting input carries its own \`data-delta\` or \`data-price\`, so the calculation logic never hardcodes an option's price — it just reads whatever's on the checked/selected inputs.

**A visible selected state without extra JS**

Both the radio and checkbox rows use the \`:has()\` selector — \`.mic-radio:has(input:checked)\` — to recolor the row's border and background when its input is checked, so the "selected" look is pure CSS reacting to native form state, not a class the JavaScript has to add and remove.

**Quantity stepper feeding the same total**

The quantity stepper works exactly like the reservation and room-picker patterns elsewhere in this library: clamped between 1 and 9, disabling at each bound, and calling the same \`updateTotal()\` every size, add-on, or quantity change touches.

**A satisfying add-to-order moment**

Clicking "Add to order" briefly swaps its label to "Added ✓" before reverting, a lightweight bit of feedback that doesn't require a toast library — just a \`setTimeout\` restoring the button's original markup.

**Customizing it**

Add a "spice level" radio group, a max-add-ons limit, or an out-of-stock disabled state for an add-on. Pair it with a [quantity stepper](/ui-snippets/quantity-stepper/), [variant selector](/ui-snippets/variant-selector/), or [order summary](/ui-snippets/order-summary/) further down the ordering flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dish card with size, add-ons, and stepper renders.` },
      { title: 'Pick a size', text: `The radio row highlights and price deltas apply.` },
      { title: 'Toggle add-ons', text: `Each checked add-on adds its price to the total.` },
      { title: 'Adjust quantity', text: `The stepper multiplies the unit price live.` },
      { title: 'Click Add to order', text: `A brief "Added ✓" confirms the action.` },
      { title: 'Wire it to a cart', text: `Read calcUnitPrice() and qty on add-to-order.` },
    ] },
    features: [
      { title: 'Three-part price calc', text: `Base, size delta, and add-ons in one function.` },
      { title: 'Radios for exclusive size', text: `Only one size active at a time.` },
      { title: 'Checkboxes for add-ons', text: `Independent toggles each add their own price.` },
      { title: 'CSS :has() selected state', text: `No class toggling needed for the highlight.` },
      { title: 'Clamped quantity stepper', text: `Disables at 1 and 9 guest bounds.` },
      { title: 'Live total everywhere', text: `One updateTotal() keeps every input in sync.` },
      { title: 'Add-to-order feedback', text: `Button label briefly confirms the action.` },
      { title: 'Zero dependencies', text: `Plain HTML, CSS, and JS, no CDN.` },
    ],
    useCases: [
      { title: 'Food delivery apps', text: `Feed the total into an [order summary](/ui-snippets/order-summary/).` },
      { title: 'Restaurant ordering kiosks', text: `Customize a dish before adding to cart.` },
      { title: 'Coffee shop apps', text: `Reuse size/add-ons for drink customization.` },
      { title: 'Product configurators', text: `A sibling of [variant selector](/ui-snippets/variant-selector/).` },
      { title: 'Meal kit services', text: `Let customers size and add extras to a box.` },
      { title: 'Catering order forms', text: `Combine with a [quantity stepper](/ui-snippets/quantity-stepper/).` },
      { icon: 'CODE', title: 'Related: Virtual Tour Badge', desc: 'See the [Virtual Tour Badge](/ui-snippets/virtual-tour-badge/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the total price calculated?', a: `calcUnitPrice() adds a fixed basePrice, the currently checked size radio's data-delta, and the sum of every checked add-on checkbox's data-price. updateTotal() then multiplies that unit price by the quantity and writes the formatted result, so every input change routes through the same two functions.` },
      { q: 'Why use radios for size but checkboxes for add-ons?', a: `Size options are mutually exclusive — a dish can only be one size at a time — which is exactly what a radio group enforces natively. Add-ons are independent; any combination can be selected, which is what checkboxes are for. Using the right native input type also gets correct keyboard and screen reader behavior for free.` },
      { q: 'How does the row highlight when an option is selected?', a: `Both .mic-radio and .mic-checkbox rows use a :has() CSS selector — e.g. .mic-radio:has(input:checked) — to change their border and background the moment the input inside them becomes checked. No JavaScript needs to add or remove a "selected" class; the highlight is pure CSS reacting to native form state.` },
      { q: 'What happens when I click Add to order?', a: `The button's text briefly changes to "Added ✓" and then, after about a second, reverts to "Add to order" followed by the current total — a lightweight confirmation. In a real app you'd also push the configured item (size, add-ons, quantity, unit price) into your cart state at that point.` },
      { q: 'How do I wire this into a real cart or checkout?', a: `On the add-to-order click, call calcUnitPrice() and read qty to build a line item object, then push it into your cart state or send it to your backend. The DOM structure already exposes everything needed: the checked size input's value, the checked add-on values, and the quantity.` },
    ],
    aiPrompt: {
      paragraph: `Instead of working out the price-calculation logic from scratch, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how calcUnitPrice() combines a fixed base price, a size radio's data-delta, and the sum of checked add-on data-price values into one number, and why the selected-row highlight uses the CSS :has() selector instead of JavaScript class toggling. It's also a strong assistant for extending the card — ask it to add a "spice level" radio group, cap the number of selectable add-ons, disable an add-on that's out of stock, or wire the Add to order button into a real cart array with line items. Use the conversation to adapt the calculation and cart logic to your app instead of treating this as a finished checkout system.`,
      prompt: `Build a "restaurant menu item customizer" card in plain HTML, CSS, and JavaScript with no external dependencies.

Requirements:
- A dish card with an image/emoji area, a title, and a short description.
- A size section using a radio group (Regular / Large / XL), where each radio input carries a data-delta price attribute (Regular is 0) and only one size can be selected.
- An add-ons section using checkboxes (e.g. extra egg, extra protein, a topping, a sauce), each carrying its own data-price attribute, where any combination can be checked independently of the others.
- A visual "selected" highlight (border color + background tint) on whichever radio or checkbox row is currently checked, implemented using the CSS :has() selector rather than JavaScript adding/removing a class.
- A quantity stepper (decrement/increment buttons around a live count) clamped between 1 and 9, disabling each button at its bound.
- A single calcUnitPrice() function that sums a fixed base price, the checked size's data-delta, and every checked add-on's data-price, and a single updateTotal() function that multiplies that by the quantity and updates a total display on the "Add to order" button — call updateTotal() from the size radios' change event, the add-on checkboxes' change event, and the stepper buttons.
- Clicking "Add to order" should briefly show a confirmation state (e.g. change the label to "Added ✓" for about a second) before reverting to show the button with the current total again.`,
    },
  },
};

export default menuItemCustomizer;
