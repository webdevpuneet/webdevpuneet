const outOfStockOverlay = {
  id: 'out-of-stock-overlay',
  title: 'Out of Stock Overlay',
  category: 'cards',
  html: `<div class="product-card out-of-stock">
  <div class="image-box">
    <div class="product-thumb"></div>
    <div class="stock-overlay">
      <span class="ribbon">Out of Stock</span>
    </div>
  </div>
  <div class="product-body">
    <h4>Classic Canvas Sneaker</h4>
    <p class="price">$68.00</p>
    <button class="notify-btn" disabled>Notify Me</button>
  </div>
</div>

<div class="product-card">
  <div class="image-box">
    <div class="product-thumb thumb-alt"></div>
  </div>
  <div class="product-body">
    <h4>Everyday Runner</h4>
    <p class="price">$84.00</p>
    <button class="add-cart-btn">Add to Cart</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }

.product-card { width: 220px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; }

.image-box { position: relative; }
.product-thumb { width: 100%; aspect-ratio: 1.1; background: linear-gradient(135deg, #94a3b8, #64748b); }
.thumb-alt { background: linear-gradient(135deg, #6366f1, #8b5cf6); }

.out-of-stock .product-thumb { filter: grayscale(0.4); opacity: 0.85; }

.stock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15,23,42,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ribbon {
  position: absolute;
  top: 18px;
  left: -34px;
  width: 140px;
  padding: 5px 0;
  background: #1e293b;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-align: center;
  transform: rotate(-40deg);
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
}

.product-body { padding: 14px; }
.product-body h4 { font-size: 13px; color: #1e293b; margin-bottom: 4px; }
.price { font-size: 14px; font-weight: 700; color: #6366f1; margin-bottom: 10px; }

.add-cart-btn, .notify-btn {
  width: 100%;
  padding: 9px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.add-cart-btn { background: #6366f1; color: #fff; }
.add-cart-btn:hover { background: #4f46e5; }

.notify-btn { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; }
.notify-btn:not(:disabled) { background: #eef2ff; color: #6366f1; cursor: pointer; }`,
  js: `// Toggle stock state programmatically, e.g. when inventory data loads from an API.
function setStock(cardEl, inStock) {
  cardEl.classList.toggle('out-of-stock', !inStock);
  const overlay = cardEl.querySelector('.stock-overlay');
  const addBtn = cardEl.querySelector('.add-cart-btn');
  const notifyBtn = cardEl.querySelector('.notify-btn');

  if (overlay) overlay.style.display = inStock ? 'none' : 'flex';
  if (notifyBtn) notifyBtn.disabled = inStock;
}`,

  seo: {
    title: 'Out of Stock Overlay — Free HTML CSS JS Product Card Sold-Out Ribbon Snippet',
    description: 'A product card with a diagonal "Out of Stock" ribbon overlay across the image and a disabled greyed-out "Notify Me" button instead of "Add to Cart". Pure CSS ribbon.',
    about: {
      title: 'Out of Stock Overlay — HTML & CSS Sold-Out Product Card Pattern',
      description: `Showing an out-of-stock product without any visual distinction from an available one leads to frustrated clicks on an "Add to Cart" button that can't actually do anything. This snippet gives sold-out products a clearly distinct treatment: a dimmed, slightly desaturated product image, a diagonal "Out of Stock" ribbon across it, and a disabled, muted "Notify Me" button in place of the normal purchase action.

**How the diagonal ribbon is built**

The ribbon reuses the same rotated-rectangle technique as the environment badge snippet in this library: a \`span\` positioned absolutely, rotated \`-40deg\`, and nudged with a negative \`left\` offset so the rotated band spans cleanly across the image corner-to-corner rather than floating off it at an odd angle. Because the ribbon sits inside a \`.stock-overlay\` div with \`position: absolute; inset: 0\`, it scales correctly regardless of the specific pixel size of the product image beneath it.

**How the dimming effect works**

The \`.out-of-stock\` modifier class applies \`filter: grayscale(0.4)\` and a slightly reduced \`opacity\` directly to \`.product-thumb\`, desaturating the image just enough to read as "unavailable" without making it illegible — a full grayscale or heavy opacity drop can make product photos hard to identify, so this uses a partial value tuned to stay recognizable. A separate semi-transparent \`.stock-overlay\` layer sits on top of the image (not affecting the "in stock" sibling card), adding a subtle darkening wash that further reinforces the disabled feel.

**How the button swap works**

Rather than showing a disabled "Add to Cart" button (which implies the button itself is broken), the out-of-stock card swaps in an entirely different action: "Notify Me." It's rendered with the native \`disabled\` attribute and muted grey styling by default in this static demo, representing a state where the notify signup hasn't been wired up yet; the CSS also includes a \`:not(:disabled)\` style so that once you enable the button (after wiring up an email capture flow), it automatically picks up an active, on-brand appearance with no extra classes needed.

**Toggling stock state programmatically**

The included \`setStock(cardEl, inStock)\` helper function is what a real integration would call once inventory data loads from an API — it toggles the \`.out-of-stock\` class, shows or hides the ribbon overlay, and enables or disables the Notify button accordingly, so the same card markup can represent either state depending on live data rather than being hardcoded per product.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Out of Stock Overlay" in the sidebar Library tab to see both an out-of-stock and an in-stock card side by side.' },
        { title: 'Compare the two states', text: 'Notice the dimmed image, ribbon, and disabled "Notify Me" button on the first card versus the normal "Add to Cart" on the second.' },
        { title: 'Wire up real inventory data', text: 'Call setStock(cardElement, inStock) once your product data loads, passing whether the item currently has stock.' },
        { title: 'Adjust the ribbon angle or color', text: 'Tune the rotate(-40deg) value and background color on .ribbon in the CSS panel to fit your card\'s proportions and brand.' },
        { title: 'Enable the Notify Me signup', text: 'Remove the disabled attribute once you wire an actual email-capture handler to the button\'s click event.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this card pattern across your product catalog.' },
      ],
    },
    features: [
      'Diagonal ribbon built from a single rotated span, matching the technique used for corner badges elsewhere',
      'Partial grayscale + opacity dimming keeps the product image recognizable while clearly signaling unavailability',
      'Semi-transparent overlay layer reinforces the disabled feel without hiding the underlying photo',
      '"Notify Me" replaces "Add to Cart" entirely rather than just disabling the purchase button',
      'Disabled button styling automatically upgrades to an active look once the disabled attribute is removed',
      'setStock() helper lets the same card markup represent either stock state from live inventory data',
      'No layout shift between in-stock and out-of-stock cards — same dimensions, same structure',
      'Pure CSS visual treatment — no image processing or extra image assets required',
    ],
    useCases: [
      { icon: 'SHOP', title: 'E-commerce product grids', desc: 'Clearly flag sold-out items in a catalog grid so shoppers don\'t waste a click trying to purchase them.' },
      { icon: 'FLOW', title: 'Back-in-stock notification signups', desc: 'Capture shopper interest for restocking via the Notify Me action instead of losing the visit entirely.' },
      { icon: 'DASH', title: 'Inventory management dashboards', desc: 'Reuse the same visual treatment internally to flag zero-stock SKUs in an admin product list.' },
      { icon: 'LEARN', title: 'Learn the diagonal ribbon CSS technique', desc: 'Study the rotated-span ribbon pattern, reusable for sale badges, new-arrival flags, or discontinued markers.' },
      { icon: 'DESIGN', title: 'Marketplace and multi-vendor listings', desc: 'Apply consistent out-of-stock styling across listings sourced from different sellers or inventory feeds.' },
    ],
    faqs: [
      { q: 'How is the diagonal "Out of Stock" ribbon created?', a: 'A single span element is positioned absolutely over the product image and rotated with a CSS transform (rotate(-40deg)), with a negative left offset so the rotated band spans the image corner-to-corner. It is the same technique used for the diagonal corner-ribbon environment badge snippet.' },
      { q: 'Why is the product image only partially desaturated instead of fully grayscale?', a: 'A full grayscale filter or a heavy opacity reduction can make it hard to identify the actual product. A partial grayscale(0.4) plus a slightly reduced opacity communicates "unavailable" clearly while keeping the image recognizable.' },
      { q: 'Why show "Notify Me" instead of a disabled "Add to Cart" button?', a: 'A disabled Add to Cart button implies something is broken with the purchase flow itself. Replacing it with a distinct "Notify Me" action gives the shopper something useful to do and can capture their interest for a future restock.' },
      { q: 'How do I make the Notify Me button functional?', a: 'Remove the disabled attribute and add a click handler that opens an email capture form or calls your notification-signup API. The CSS already includes a :not(:disabled) style so the button automatically looks active once enabled.' },
      { q: 'How do I toggle a card between in-stock and out-of-stock based on real data?', a: 'Call the included setStock(cardElement, inStock) function with the card\'s DOM element and a boolean. It toggles the out-of-stock class, shows or hides the ribbon overlay, and disables or enables the Notify Me button accordingly.' },
      { q: 'Does the out-of-stock treatment cause any layout shift compared to an in-stock card?', a: 'No — both card variants share identical dimensions and structure. Only the overlay, ribbon, and button content differ, so cards in the same grid stay perfectly aligned regardless of stock state.' },
      { q: 'Can I use this same ribbon technique for other badges, like "Sale" or "New"?', a: 'Yes — the .ribbon technique is generic. Change the background color, text, and rotation angle to repurpose it for a sale badge, a "New Arrival" flag, or any other diagonal corner label.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain the rotation and offset math behind the diagonal ribbon and how you'd need to adjust it if your product card had different image dimensions or aspect ratio than the one in this demo. It's also a good prompt for wiring the setStock helper function to a real inventory API response, or for adding an actual email-capture form that appears in a small popover when "Notify Me" is clicked, since the base version only disables the button as a visual placeholder.`,
      prompt: `Build an "out of stock overlay" product card in plain HTML, CSS, and vanilla JavaScript.

Requirements:
- A product card showing a thumbnail image, product name, and price, in two states: in-stock (showing a normal, enabled "Add to Cart" button) and out-of-stock (showing a partially desaturated/dimmed image, a diagonal "Out of Stock" ribbon built from a single rotated element positioned over the image, and a disabled "Notify Me" button in place of the purchase button entirely — not just a disabled version of the same button).
- The diagonal ribbon must be created with a CSS transform rotation on a plain element (no image asset), sized and offset so it spans cleanly across the image regardless of the specific product photo underneath.
- Both card states must share identical layout dimensions and structure so a grid of mixed in-stock and out-of-stock cards stays visually aligned with no layout shift.
- Include one JavaScript helper function that takes a card element and a boolean "in stock" flag, and toggles all the relevant classes/attributes (the out-of-stock styling class, the ribbon overlay's visibility, and the Notify button's disabled state) so the same markup can represent either state driven by real inventory data.
- The disabled Notify Me button's CSS must be structured so that simply removing the disabled attribute automatically gives it an active, on-brand appearance with no additional classes required.`,
    },
  },
};

export default outOfStockOverlay;
