const bootstrapOffcanvasCart = {
  id: 'bootstrap-offcanvas-cart',
  title: 'Bootstrap Offcanvas Shopping Cart',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="bscart-stage">
  <button class="btn btn-dark position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#bscartPanel">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
    Cart
    <span class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" id="bscartBadge">2</span>
  </button>
</div>

<div class="offcanvas offcanvas-end bscart-panel" tabindex="-1" id="bscartPanel">
  <div class="offcanvas-header border-bottom">
    <h5 class="offcanvas-title fw-bold">Your cart</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body d-flex flex-column">
    <div id="bscartItems" class="flex-grow-1">
      <div class="bscart-item" data-price="76.00">
        <div class="bscart-thumb" style="--h:250"></div>
        <div class="flex-grow-1">
          <div class="fw-semibold small">Brass Task Lamp</div>
          <div class="text-muted small mb-1">$76.00</div>
          <div class="bscart-qty">
            <button class="bscart-step" data-dir="-1" aria-label="Decrease quantity">&minus;</button>
            <span class="bscart-qty-val">1</span>
            <button class="bscart-step" data-dir="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="bscart-remove" aria-label="Remove item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="bscart-item" data-price="29.00">
        <div class="bscart-thumb" style="--h:150"></div>
        <div class="flex-grow-1">
          <div class="fw-semibold small">Linen Desk Mat</div>
          <div class="text-muted small mb-1">$29.00</div>
          <div class="bscart-qty">
            <button class="bscart-step" data-dir="-1" aria-label="Decrease quantity">&minus;</button>
            <span class="bscart-qty-val">1</span>
            <button class="bscart-step" data-dir="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="bscart-remove" aria-label="Remove item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div id="bscartEmpty" class="text-center text-muted small py-5 d-none">Your cart is empty.</div>
    <div class="border-top pt-3 mt-2">
      <div class="d-flex justify-content-between fw-bold mb-3">
        <span>Subtotal</span>
        <span>$<span id="bscartTotal">105.00</span></span>
      </div>
      <button class="btn btn-primary w-100 fw-bold">Checkout</button>
    </div>
  </div>
</div>`,
  css: `.bscart-stage {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
  background: #f6f7f9;
}

.bscart-panel { width: 340px; }

.bscart-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #f1f2f5;
  animation: bscartIn .2s ease;
}
@keyframes bscartIn { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: none; } }

.bscart-thumb {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  flex-shrink: 0;
  background: linear-gradient(135deg, hsl(calc(var(--h)) 55% 88%), hsl(calc(var(--h) + 40) 55% 78%));
}

.bscart-qty {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 2px 4px;
}
.bscart-step {
  width: 20px; height: 20px;
  border: none;
  background: none;
  border-radius: 50%;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  color: #4b5563;
}
.bscart-step:hover { background: #f3f4f6; }
.bscart-qty-val { font-size: 12.5px; font-weight: 600; min-width: 12px; text-align: center; }

.bscart-remove {
  border: none;
  background: none;
  color: #9ca3af;
  padding: 4px;
  cursor: pointer;
}
.bscart-remove:hover { color: #dc2626; }`,
  js: `const itemsEl = document.getElementById('bscartItems');
const emptyEl = document.getElementById('bscartEmpty');
const totalEl = document.getElementById('bscartTotal');
const badgeEl = document.getElementById('bscartBadge');

function recalc() {
  const rows = itemsEl.querySelectorAll('.bscart-item');
  let total = 0;
  let count = 0;

  rows.forEach(row => {
    const price = parseFloat(row.dataset.price);
    const qty = parseInt(row.querySelector('.bscart-qty-val').textContent, 10);
    total += price * qty;
    count += qty;
  });

  totalEl.textContent = total.toFixed(2);
  badgeEl.textContent = count;
  badgeEl.style.display = count > 0 ? '' : 'none';
  emptyEl.classList.toggle('d-none', rows.length > 0);
}

itemsEl.addEventListener('click', e => {
  const step = e.target.closest('.bscart-step');
  const removeBtn = e.target.closest('.bscart-remove');

  if (step) {
    const valEl = step.closest('.bscart-item').querySelector('.bscart-qty-val');
    const dir = Number(step.dataset.dir);
    const next = Math.max(1, parseInt(valEl.textContent, 10) + dir);
    valEl.textContent = next;
    recalc();
  }

  if (removeBtn) {
    removeBtn.closest('.bscart-item').remove();
    recalc();
  }
});

recalc();`,

  seo: {
    title: 'Bootstrap Offcanvas Shopping Cart — Free Snippet',
    description: 'A real Bootstrap 5.3 offcanvas cart panel with working quantity steppers, item removal, and a subtotal that recalculates live on every change.',
    about: {
      title: 'Bootstrap Offcanvas Shopping Cart — HTML, CSS & JavaScript',
      description: `A slide-in cart panel needs to do more than look right when it opens — every quantity change and removal has to recalculate the subtotal correctly, immediately. This snippet builds that panel on **real Bootstrap 5.3**: the actual \`.offcanvas\` component, triggered by Bootstrap's own \`data-bs-toggle="offcanvas"\` JavaScript, with fully working quantity steppers and item removal layered on top.

**One recalc function, called from everywhere**

Every change that could affect the cart — incrementing a quantity, decrementing it, removing an item entirely — funnels through a single \`recalc()\` function. It re-reads every remaining \`.bscart-item\`'s price and quantity from the DOM, sums the subtotal, counts total items for the header badge, and toggles the "Your cart is empty" message based on whether any rows remain. Centralizing this in one function is what guarantees the subtotal, the badge count, and the empty state can never drift out of sync with each other — there's only one place that computes any of them.

**Delegated clicks for both steppers and removal**

A single click listener on the items container distinguishes a quantity-stepper click from a remove-button click using \`e.target.closest()\` against each control's own class. This means removing an item (which deletes its row from the DOM entirely) never breaks anything for the remaining rows' listeners, because there were never any listeners bound to individual rows to begin with.

**The quantity floor**

Each stepper's decrement is clamped with \`Math.max(1, ...)\` — quantity can never go below 1 through the stepper. Reaching zero is handled by the separate, explicit remove button instead, which is a deliberate distinction: "reduce this to nothing" and "I don't want this item anymore" are different intents, and conflating them (letting the stepper delete a row at zero) tends to surprise users who just meant to correct a typo.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Bootstrap Offcanvas Shopping Cart" in the sidebar Library tab. The preview loads a "Cart" button with a badge showing 2 items.' },
        { title: 'Open the cart', text: 'Click the button — Bootstrap\'s real Offcanvas component slides in from the right with two items and a $105.00 subtotal.' },
        { title: 'Change a quantity', text: 'Click the + or − buttons next to any item — the subtotal and the header badge count both update immediately to match.' },
        { title: 'Try reducing below 1', text: 'Keep clicking − on an item at quantity 1 — it stays at 1 rather than going to zero or negative.' },
        { title: 'Remove an item', text: 'Click the × button on a row — it\'s removed entirely, and the subtotal/badge recalculate to reflect only the remaining item.' },
        { title: 'Remove everything', text: 'Remove the last remaining item — the item list is replaced by a "Your cart is empty" message.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 offcanvas component, opened by Bootstrap\'s own data-bs-toggle JavaScript',
      'Working quantity steppers on every item, clamped to a minimum of 1',
      'Item removal via a delegated click listener — no per-row listeners to manage',
      'One shared recalc() function keeps subtotal, badge count, and empty state always in sync',
      'Header cart badge count updates live to reflect the true sum of all item quantities',
      'Empty-cart message appears automatically once every item has been removed',
      'CSS-gradient item thumbnails, no product photography required to try the snippet',
      'Slide-in animation on newly visible rows for a touch of polish beyond Bootstrap\'s defaults',
    ],
    useCases: [
      { icon: 'MONEY', title: 'E-commerce sites needing a persistent cart panel', desc: 'A slide-out cart that doesn\'t navigate away from the current page is the standard modern pattern for letting shoppers review and adjust their cart without losing their place.' },
      { icon: 'LEARN', title: 'Learning Bootstrap\'s Offcanvas component', desc: 'See the real data-bs-toggle/data-bs-target wiring for Bootstrap\'s slide-in panel, alongside a genuine stateful UI built on top of it.' },
      { icon: 'FLOW', title: 'Prototyping cart interactions before backend integration', desc: 'A fully working quantity/removal/subtotal flow to demo or user-test before any real cart API or persistence layer exists.' },
      { icon: 'CODE', title: 'Pairing with a product grid\'s Add to cart buttons', desc: 'Combine with the Bootstrap Product Card Grid snippet in this category — wire its Add to cart clicks to append new rows into this offcanvas panel\'s item list.' },
    ],
    faqs: [
      { q: 'Is this a real Bootstrap Offcanvas, or a custom slide-in panel?', a: 'Real Bootstrap 5.3 — it\'s the actual .offcanvas component, opened via data-bs-toggle="offcanvas" and data-bs-target, using Bootstrap\'s own bundled JavaScript, not a hand-built sliding div.' },
      { q: 'How does the subtotal stay accurate as I change quantities?', a: 'Every quantity change or item removal calls one shared recalc() function that re-reads every remaining item\'s price and quantity directly from the DOM and recomputes the total from scratch — there\'s no running total variable that could drift out of sync.' },
      { q: 'Can quantity go down to zero with the stepper?', a: 'No — the decrement is clamped to a minimum of 1 with Math.max(1, ...). To remove an item entirely, use the separate × remove button, which is a deliberate distinction between "reduce" and "remove."' },
      { q: 'How do I add new items to the cart from elsewhere on the page?', a: 'Append a new .bscart-item block (matching the existing markup, with its own data-price) into the #bscartItems container, then call the exposed recalc() logic — or simplest, trigger the same click flow the existing rows use once the new row exists in the DOM.' },
      { q: 'Does the empty-cart message update automatically?', a: 'Yes — recalc() checks how many .bscart-item rows remain after every change and toggles the "Your cart is empty" message accordingly, so it appears the moment the last item is removed with no extra logic needed.' },
      { q: 'Where does checkout actually go?', a: 'Nowhere yet — the Checkout button is a plain Bootstrap button with no handler attached. Wire it to your real checkout flow or payment page as the next integration step.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add localStorage persistence so the cart survives a page reload, or to add a subtle "flying to cart" animation when an item is added from an external Add to cart button. It's also a good exercise to ask the assistant to combine this with the Bootstrap Product Card Grid snippet in this category, wiring the grid's Add to cart clicks to actually append new rows into this offcanvas cart instead of the two demos existing separately.`,
      prompt: `Build a Bootstrap 5.3 offcanvas shopping cart panel, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A "Cart" button with a badge showing the total item count, that opens a real Bootstrap offcanvas panel (data-bs-toggle="offcanvas") sliding in from the right edge, containing at least two starter cart items.
- Each cart item row must show a thumbnail, name, price, a quantity stepper (minus/plus buttons, clamped to a minimum quantity of 1), and a remove button.
- Use a single delegated click listener on the item list's parent container to handle both quantity stepper clicks and remove-button clicks — do not attach individual listeners to each row's buttons.
- A single shared function must recalculate the subtotal, the header badge's item count, and whether to show an "Your cart is empty" message, and this function must be called after every quantity change and every item removal so none of those three things can ever be out of sync with each other.
- When the last item is removed, the item list must be replaced by an empty-state message, and the subtotal should read $0.00.`,
    },
  },
};

export default bootstrapOffcanvasCart;
