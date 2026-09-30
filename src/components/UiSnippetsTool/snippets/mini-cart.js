const miniCart = {
  id: 'mini-cart',
  title: 'Mini Cart',
  category: 'cards',
  html: `<div class="page">
  <div class="cart-wrap">
    <button class="cart-btn" onclick="toggleCart()">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      <span class="cart-count" id="cartCount">3</span>
    </button>
    <div class="cart-dropdown" id="cartDropdown">
      <div class="cart-head">
        <span class="cart-title">Your Cart <span id="itemCount">(3 items)</span></span>
        <button class="close-btn" onclick="toggleCart()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="cart-items" id="cartItems">
        <div class="cart-item" data-price="49.00">
          <div class="item-img" style="background:linear-gradient(135deg,#667eea,#764ba2)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          </div>
          <div class="item-info">
            <div class="item-name">Wireless Headphones</div>
            <div class="item-price">$49.00</div>
          </div>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty(this,-1)">&#x2212;</button>
            <span class="qty">1</span>
            <button class="qty-btn" onclick="changeQty(this,1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(this)" title="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cart-item" data-price="29.00">
          <div class="item-img" style="background:linear-gradient(135deg,#f093fb,#f5576c)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </div>
          <div class="item-info">
            <div class="item-name">Phone Stand</div>
            <div class="item-price">$29.00</div>
          </div>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty(this,-1)">&#x2212;</button>
            <span class="qty">2</span>
            <button class="qty-btn" onclick="changeQty(this,1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(this)" title="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cart-item" data-price="15.00">
          <div class="item-img" style="background:linear-gradient(135deg,#4facfe,#00f2fe)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div class="item-info">
            <div class="item-name">USB-C Hub</div>
            <div class="item-price">$15.00</div>
          </div>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty(this,-1)">&#x2212;</button>
            <span class="qty">1</span>
            <button class="qty-btn" onclick="changeQty(this,1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(this)" title="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="cart-footer">
        <div class="free-ship">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          Free shipping on orders over $50
        </div>
        <div class="totals">
          <div class="tot-row"><span>Subtotal</span><span id="subtotal">$108.00</span></div>
          <div class="tot-row"><span>Shipping</span><span class="free-tag">Free</span></div>
          <div class="tot-row total-row"><span>Total</span><strong id="total">$108.00</strong></div>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
        <button class="continue-btn" onclick="toggleCart()">Continue Shopping</button>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: flex-start; justify-content: flex-end; padding: 24px; }
.page { position: relative; }
.cart-btn { position: relative; background: #1e293b; border: none; color: #fff; width: 48px; height: 48px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
.cart-btn:hover { background: #0f172a; }
.cart-count { position: absolute; top: -6px; right: -6px; background: #ef4444; color: #fff; font-size: 10px; font-weight: 800; min-width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center; justify-content: center; padding: 0 4px; }
.cart-dropdown { position: absolute; right: 0; top: 58px; width: 360px; background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08); display: none; flex-direction: column; overflow: hidden; z-index: 100; }
.cart-dropdown.open { display: flex; }
.cart-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; }
.cart-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.cart-title span { font-size: 12px; font-weight: 500; color: #94a3b8; }
.close-btn { background: none; border: none; cursor: pointer; color: #94a3b8; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
.close-btn:hover { background: #f1f5f9; color: #64748b; }
.cart-items { overflow-y: auto; max-height: 300px; padding: 8px 0; }
.cart-item { display: flex; align-items: center; gap: 12px; padding: 12px 20px; transition: background 0.1s; }
.cart-item:hover { background: #fafafa; }
.item-img { width: 48px; height: 48px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.item-info { flex: 1; min-width: 0; }
.item-name { font-size: 13px; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-price { font-size: 12px; color: #64748b; margin-top: 2px; }
.qty-ctrl { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.qty-btn { width: 24px; height: 24px; border: 1px solid #e2e8f0; background: #fff; border-radius: 6px; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569; transition: all 0.1s; }
.qty-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }
.qty { font-size: 13px; font-weight: 700; color: #0f172a; min-width: 16px; text-align: center; }
.remove-btn { background: none; border: none; cursor: pointer; color: #cbd5e1; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
.remove-btn:hover { background: #fee2e2; color: #ef4444; }
.cart-footer { padding: 16px 20px; border-top: 1px solid #f1f5f9; }
.free-ship { font-size: 11px; color: #16a34a; display: flex; align-items: center; gap: 6px; margin-bottom: 14px; font-weight: 600; }
.totals { margin-bottom: 14px; display: flex; flex-direction: column; gap: 6px; }
.tot-row { display: flex; justify-content: space-between; font-size: 13px; color: #64748b; }
.tot-row.total-row { font-size: 15px; color: #0f172a; font-weight: 600; padding-top: 6px; border-top: 1px solid #f1f5f9; }
.free-tag { color: #16a34a; font-weight: 600; }
.checkout-btn { width: 100%; background: #1e293b; color: #fff; border: none; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; margin-bottom: 8px; transition: background 0.15s; }
.checkout-btn:hover { background: #0f172a; }
.continue-btn { width: 100%; background: none; border: 1px solid #e2e8f0; color: #64748b; padding: 10px; border-radius: 10px; font-size: 13px; cursor: pointer; transition: all 0.15s; }
.continue-btn:hover { background: #f8fafc; color: #1e293b; }`,
  js: `function toggleCart() {
  document.getElementById('cartDropdown').classList.toggle('open');
}

function getTotal() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(function(item) {
    var price = parseFloat(item.dataset.price);
    var qty = parseInt(item.querySelector('.qty').textContent);
    total += price * qty;
  });
  return total;
}

function updateSummary() {
  var items = document.querySelectorAll('.cart-item');
  var totalQty = 0;
  items.forEach(function(item) {
    totalQty += parseInt(item.querySelector('.qty').textContent);
  });
  document.getElementById('cartCount').textContent = totalQty;
  document.getElementById('itemCount').textContent = '(' + items.length + ' item' + (items.length !== 1 ? 's' : '') + ')';
  var total = getTotal();
  document.getElementById('subtotal').textContent = '$' + total.toFixed(2);
  document.getElementById('total').textContent = '$' + total.toFixed(2);
}

function changeQty(btn, delta) {
  var ctrl = btn.parentElement;
  var qtyEl = ctrl.querySelector('.qty');
  qtyEl.textContent = Math.max(1, parseInt(qtyEl.textContent) + delta);
  updateSummary();
}

function removeItem(btn) {
  btn.closest('.cart-item').remove();
  updateSummary();
}`,
  seo: {
    title: 'Mini Cart Dropdown — Free HTML CSS JS Snippet',
    description: 'Shopping cart flyout dropdown with quantity steppers, per-item removal, free shipping badge, and live subtotal. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Mini Cart Dropdown — Item List, Quantity Stepper, Subtotal & Checkout UI',
      description: `A mini cart (also called a cart flyout) is a compact shopping cart summary that appears on click, anchored to the cart icon in the header. It lets users review items, adjust quantities, and proceed to checkout without navigating away from the current page. This snippet provides a complete mini cart dropdown with gradient product thumbnails, [quantity steppers](/ui-snippets/quantity-stepper/), remove buttons, a [free shipping](/ui-snippets/free-shipping-bar/) indicator, subtotal/total calculations, and a button that leads to the [checkout form](/ui-snippets/checkout-form/).\n\n**The dropdown toggle and positioning**\n\nThe cart dropdown uses position: absolute anchored to the .cart-wrap container. It is display: none by default and switches to display: flex on toggle via the .open class. On toggle, the JS adds or removes .open from the dropdown element. .cart-wrap uses position: relative as the containing block. The right: 0 keeps the dropdown flush with the cart button on the right side.\n\n**Quantity stepper controls**\n\nEach .cart-item has a .qty-ctrl row with two buttons and a span showing the quantity. changeQty() increments or decrements the span text, enforcing Math.max(1, ...) so quantity never drops below 1. After every change, updateSummary() re-reads all item quantities and prices from the DOM — each .cart-item has a data-price attribute holding the unit price as a float string.\n\n**Remove item flow**\n\nbtn.closest('.cart-item') traverses up the DOM to the containing item row and removes the entire element. updateSummary() then re-counts remaining items, updates the badge count and item count in the header, and recalculates the total.\n\n**Price calculation without state**\n\ngetTotal() iterates all .cart-item elements, reading parseFloat(item.dataset.price) and multiplying by the qty span. This data-attribute approach avoids a separate JS state object for the demo. In production, keep a cart array in memory (or localStorage) and recalculate from that rather than reading the DOM.\n\n**Accessibility and keyboard support**\n\nThe cart button is a native button element, giving it automatic keyboard focus and Enter/Space activation. The close button inside the dropdown is also a button, so keyboard users can Tab into the dropdown and close it without a mouse. For a production implementation, add aria-expanded="true/false" to the cart button and aria-modal="true" with role="dialog" to the dropdown so screen readers announce the panel state correctly. Trap focus inside the dropdown when open using a focusTrap utility so Tab does not cycle behind the overlay.\n\n**Animation and transition considerations**\n\nThe current snippet uses a hard display: none / display: flex toggle. To animate the dropdown open and close, replace the display switch with an opacity and transform transition: set opacity: 0; transform: translateY(-8px); pointer-events: none on the closed state, and opacity: 1; transform: translateY(0); pointer-events: auto on .open. CSS transitions on these properties create a smooth slide-down effect without JavaScript animation loops.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the cart button to open the dropdown', text: 'The dark cart icon button in the top-right shows the item count badge. Click it to open the dropdown. Click it again or the × button to close.' },
      { title: 'Adjust item quantities', text: 'Click the + or − buttons next to any item. The quantity updates and the subtotal and total recalculate immediately. Quantity cannot go below 1.' },
      { title: 'Remove an item', text: 'Click the × icon at the right edge of any item row to remove it. The item count badge and totals update automatically.' },
      { title: 'Add your own items', text: 'Duplicate a .cart-item div and update the data-price attribute, gradient background colors, SVG icon, item name, and price text. JS auto-picks up the new item.' },
      { title: 'Close on outside click', text: 'Add document.addEventListener("click", e => { if (!e.target.closest(".cart-wrap")) document.getElementById("cartDropdown").classList.remove("open"); }); to close the dropdown when clicking outside.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component with useState cart management. Click "Vue" for a Vue 3 SFC with reactive cart array.' },
    ]},
    features: ['.open class toggle: display none/flex switch for dropdown visibility','position: absolute anchored right: 0 with z-index: 100 layering','Gradient thumbnail divs: no image dependencies, scalable to any product','Qty stepper: Math.max(1) guard ensures quantity never drops to zero','data-price attribute: unit price stored in DOM for state-free calculation','btn.closest(".cart-item") remove: clean DOM traversal without IDs','Free shipping badge with SVG truck icon and green accent','Subtotal/total recalculated on every qty change and item removal','Checkout and continue shopping CTAs with distinct visual hierarchy'],
    useCases: [
      { icon: 'APP', title: 'E-commerce cart flyout on product listing pages', desc: 'The mini cart lets shoppers adjust quantities and review their order without leaving the listing page. Connect the cart count badge to a cart state array and update it every time an Add to Cart button is clicked. Persist the cart in localStorage and restore it on page load.' },
      { icon: 'DESIGN', title: 'SaaS subscription plan add-on selector summary', desc: 'Use the mini cart pattern for subscription add-ons — show selected plans, seats, and billing cycle with a live subtotal. The quantity stepper maps cleanly to licence seat counts or usage units per add-on.' },
      { icon: 'FLOW', title: 'Event ticketing quantity selector and order summary', desc: 'Each cart item becomes a ticket type: General Admission, VIP, Early Bird. The qty stepper controls seat count. The checkout button proceeds to the payment form with the order summary pre-filled.' },
      { icon: 'CODE', title: 'Wire to Stripe Checkout or a headless commerce API', desc: 'Store cart state in a React useState or Zustand store. On checkout click, POST the cart array to a Stripe Checkout session endpoint or Commerce.js cart API. The mini cart becomes a controlled component fed from that store.' },
      { icon: 'LEARN', title: 'Study dropdown positioning and DOM-based state patterns', desc: 'The snippet demonstrates position: absolute anchoring, click-toggle UI patterns, and data-attribute state storage — foundational patterns in vanilla JS commerce UIs that predate React. Understanding these helps debug framework cart implementations.' },
      { icon: 'CHART', title: 'Internal tools item selector and procurement UI', desc: 'Adapt the cart for an internal procurement request tool: employees select supplies or software licences from a catalog, adjust quantities, and submit. The checkout button becomes Submit Request and fires a POST to an internal approval API.' },
    ],
    faqs: [
      { q: 'How do I close the cart when clicking outside?', a: 'Add a click listener on document: document.addEventListener("click", e => { if (!e.target.closest(".cart-wrap")) document.getElementById("cartDropdown").classList.remove("open"); }); closest(".cart-wrap") returns null if the click originated outside the cart wrapper — the if block then removes .open. Also add a keydown listener for Escape: document.addEventListener("keydown", e => { if (e.key === "Escape") document.getElementById("cartDropdown").classList.remove("open"); }); to support keyboard users who expect Escape to dismiss overlays. After dismissing, return focus to the cart button so keyboard navigation is not lost: document.querySelector(".cart-btn").focus().' },
      { q: 'How do I persist the cart across page refreshes?', a: 'Maintain a cart array: let cart = JSON.parse(localStorage.getItem("cart") || "[]"). After every add/remove/qty change, call localStorage.setItem("cart", JSON.stringify(cart)). On DOMContentLoaded, call renderCart() to rebuild .cart-items from the saved array instead of the hardcoded HTML. Each cart item object should store id, name, price, qty, and an optional imageUrl or gradient string. renderCart() iterates the array and creates .cart-item elements dynamically using innerHTML or DOM createElement, then calls updateSummary() to set the badge count and totals. If cart is empty after loading, show an empty state inside the dropdown rather than a blank items area.' },
      { q: 'How do I build this in React?', a: 'Manage cart as const [cart, setCart] = useState([]). Render a MiniCart component that maps cart items to CartItem rows. Each CartItem receives price, qty, onQtyChange(delta), and onRemove props. Compute subtotal with cart.reduce((sum, item) => sum + item.price * item.qty, 0). Use a Zustand store for global cart state so the cart icon in the header and the mini cart dropdown both read from the same source. Persist to localStorage with a Zustand middleware: { persist } from "zustand/middleware", passing the cart slice with a "cart" key so it survives page reloads.' },
      { q: 'How do the quantity buttons update the totals?', a: 'Each .cart-item stores its unit price in a data-price attribute, and the current quantity lives in the .qty element\'s text. getTotal() loops over every .cart-item and sums parseFloat(item.dataset.price) * parseInt(qty). updateSummary() then writes the aggregate quantity to the #cartCount badge on the cart button, the row count to #itemCount in the header, and the formatted money values to #subtotal and #total with toFixed(2). Every interaction — plus, minus, or remove — simply calls updateSummary() again, so the DOM itself is the single source of truth and there is no separate state object to keep in sync.' },
      { q: 'How do I add a free-shipping progress bar?', a: 'Pick a threshold (say 75) and extend updateSummary(): const remaining = Math.max(0, 75 - getTotal()). If remaining is 0, show "You\'ve unlocked free shipping!"; otherwise show "Add $" + remaining.toFixed(2) + " more for free shipping". For the bar itself, add a thin track div under the cart header and set its fill width to Math.min(100, getTotal() / 75 * 100) + "%" with a CSS transition on width so it animates as quantities change. Because updateSummary() already runs on every cart mutation, the bar stays correct for free.' },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace the DOM reads by hand to see how this stays in sync. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why getTotal reads price and quantity straight from data-price attributes and .qty text instead of a separate cart array, or what would break the moment two cart items shared the same data-price value. The same assistant can help optimize it — asking whether re-scanning every .cart-item on each quantity change scales past a few dozen line items, or whether the mini cart should move to a single source-of-truth cart object once persistence is added. It's just as useful for extending the feature: ask it to add a free-shipping progress bar that reuses updateSummary, close the dropdown on outside click and Escape, or persist the cart to localStorage across page reloads. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "mini cart" flyout dropdown in plain HTML, CSS, and JavaScript using only DOM traversal and data attributes for state — no framework, no external state library.

Requirements:
- A cart icon button showing a numeric badge, anchored via position: relative on its wrapper, with an absolutely positioned dropdown panel that toggles between display: none and display: flex via a single "open" class.
- Each cart line item stores its unit price as a data-price attribute (a numeric string) directly on the row element, and its current quantity as the text content of a small span — no separate JavaScript array or object should hold the cart state; the DOM itself is the source of truth.
- A quantity stepper with plus and minus buttons per row that read the current quantity from the row's own span, clamp the result so it can never go below 1 using Math.max, and write the new value back into that span's text.
- A getTotal function that queries every cart-item row in the document, reads its data-price attribute with parseFloat and its quantity span with parseInt, multiplies them, and sums across all rows — recomputed fresh on every call rather than cached.
- After every quantity change or item removal, call a single updateSummary function that recalculates the total item count for the header badge, the "(N items)" label, and the subtotal/total currency display (formatted with toFixed(2)) — so every mutation path (plus, minus, remove) funnels through the same recalculation function rather than each having its own update logic.
- A remove button per row that walks up to the closest cart-item row with the DOM's closest() method and removes the entire row element, then triggers the same summary recalculation.
- Include a free-shipping threshold message that reruns off the same getTotal computation, and a checkout button and a continue-shopping button that closes the dropdown.`,
    },
  },
};

export default miniCart;
