const colorSwatch = {
  id: 'color-swatch',
  title: 'Color Swatch Selector',
  category: 'forms',
  html: `<div class="page">

  <!-- Product colour selector -->
  <div class="field-group">
    <div class="field-label">
      <span>Colour</span>
      <span class="selected-name" id="sel-name">Midnight Indigo</span>
    </div>
    <div class="swatches" id="swatches" role="radiogroup" aria-label="Select colour">
      <button class="swatch selected" data-name="Midnight Indigo" style="--c:#6366f1" aria-label="Midnight Indigo" aria-pressed="true" title="Midnight Indigo"></button>
      <button class="swatch" data-name="Ocean Teal" style="--c:#0ea5e9" aria-label="Ocean Teal" aria-pressed="false" title="Ocean Teal"></button>
      <button class="swatch" data-name="Forest Green" style="--c:#10b981" aria-label="Forest Green" aria-pressed="false" title="Forest Green"></button>
      <button class="swatch" data-name="Sunset Rose" style="--c:#ec4899" aria-label="Sunset Rose" aria-pressed="false" title="Sunset Rose"></button>
      <button class="swatch" data-name="Amber Gold" style="--c:#f59e0b" aria-label="Amber Gold" aria-pressed="false" title="Amber Gold"></button>
      <button class="swatch" data-name="Slate Grey" style="--c:#64748b" aria-label="Slate Grey" aria-pressed="false" title="Slate Grey"></button>
      <button class="swatch" data-name="Crimson Red" style="--c:#ef4444" aria-label="Crimson Red" aria-pressed="false" title="Crimson Red"></button>
      <button class="swatch unavailable" data-name="Pearl White" style="--c:#e2e8f0" aria-label="Pearl White — out of stock" aria-pressed="false" title="Pearl White (out of stock)" disabled></button>
    </div>
  </div>

  <!-- Size selector -->
  <div class="field-group">
    <div class="field-label">
      <span>Size</span>
      <span class="selected-name" id="size-name">Medium</span>
    </div>
    <div class="size-swatches" id="size-swatches" role="radiogroup" aria-label="Select size">
      <button class="size-chip" data-size="XS" onclick="selectSize(this)">XS</button>
      <button class="size-chip" data-size="S" onclick="selectSize(this)">S</button>
      <button class="size-chip selected" data-size="M" onclick="selectSize(this)">M</button>
      <button class="size-chip" data-size="L" onclick="selectSize(this)">L</button>
      <button class="size-chip" data-size="XL" onclick="selectSize(this)">XL</button>
      <button class="size-chip unavailable" data-size="XXL" disabled title="Out of stock">XXL</button>
    </div>
  </div>

  <!-- Preview -->
  <div class="preview-card" id="preview">
    <div class="preview-colour" id="preview-colour" style="background:#6366f1"></div>
    <div class="preview-details">
      <div class="preview-name" id="preview-name">Premium Hoodie</div>
      <div class="preview-variant" id="preview-variant">Midnight Indigo · M</div>
      <div class="preview-price">$89.00</div>
    </div>
    <button class="add-btn" onclick="add()">Add to cart</button>
  </div>

</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 24px; }

.page { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 20px; }

.field-group { display: flex; flex-direction: column; gap: 10px; }
.field-label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: #374151; }
.selected-name { color: #6366f1; }

/* Colour swatches */
.swatches { display: flex; gap: 8px; flex-wrap: wrap; }
.swatch { width: 32px; height: 32px; border-radius: 50%; background: var(--c); border: 3px solid transparent; cursor: pointer; position: relative; transition: transform 0.15s; box-shadow: 0 0 0 1px rgba(0,0,0,0.1) inset; }
.swatch:hover:not(:disabled) { transform: scale(1.15); }
.swatch.selected { border-color: #fff; outline: 2px solid var(--c); outline-offset: 2px; transform: scale(1.1); }
.swatch.unavailable { opacity: 0.35; cursor: not-allowed; }
.swatch.unavailable::after { content: ''; position: absolute; inset: 4px; background: linear-gradient(45deg, transparent 43%, #fff 43%, #fff 57%, transparent 57%); border-radius: 50%; pointer-events: none; }

/* Size chips */
.size-swatches { display: flex; gap: 6px; flex-wrap: wrap; }
.size-chip { min-width: 42px; height: 38px; padding: 0 10px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; font-weight: 600; color: #374151; cursor: pointer; transition: all 0.12s; font-family: inherit; }
.size-chip:hover:not(:disabled) { border-color: #6366f1; color: #6366f1; }
.size-chip.selected { background: #6366f1; border-color: #6366f1; color: #fff; }
.size-chip.unavailable { opacity: 0.4; cursor: not-allowed; text-decoration: line-through; }

/* Preview */
.preview-card { display: flex; align-items: center; gap: 14px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; }
.preview-colour { width: 48px; height: 48px; border-radius: 10px; flex-shrink: 0; transition: background 0.2s; }
.preview-details { flex: 1; }
.preview-name { font-size: 13px; font-weight: 700; color: #0f172a; }
.preview-variant { font-size: 11px; color: #94a3b8; margin-top: 2px; transition: color 0.15s; }
.preview-price { font-size: 14px; font-weight: 800; color: #6366f1; margin-top: 4px; }
.add-btn { background: #6366f1; color: #fff; border: none; border-radius: 9px; padding: 9px 16px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: background 0.15s; font-family: inherit; }
.add-btn:hover { background: #4f46e5; }`,
  js: `let selectedColour = 'Midnight Indigo';
let selectedColourHex = '#6366f1';
let selectedSize = 'M';

document.querySelectorAll('.swatch').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach(b => {
      b.classList.remove('selected');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('selected');
    btn.setAttribute('aria-pressed', 'true');
    selectedColour = btn.dataset.name;
    selectedColourHex = getComputedStyle(btn).getPropertyValue('--c').trim();
    document.getElementById('sel-name').textContent = selectedColour;
    document.getElementById('preview-colour').style.background = selectedColourHex;
    updateVariant();
  });
});

function selectSize(btn) {
  document.querySelectorAll('.size-chip').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSize = btn.dataset.size;
  document.getElementById('size-name').textContent = btn.dataset.size;
  updateVariant();
}

function updateVariant() {
  document.getElementById('preview-variant').textContent = selectedColour + ' · ' + selectedSize;
}

function add() {
  const btn = document.querySelector('.add-btn');
  btn.textContent = '✓ Added!';
  btn.style.background = '#16a34a';
  setTimeout(() => { btn.textContent = 'Add to cart'; btn.style.background = ''; }, 2000);
}`,
  seo: {
    title: 'Color Swatch Selector — Free HTML CSS JS Snippet',
    description: 'Product colour swatches with selected ring, out-of-stock cross, size chips and live preview card. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Color Swatch Selector — CSS Custom Property Colours, Selected Ring, Out-of-Stock & Live Preview',
      description: `A colour swatch selector is the cornerstone of any e-commerce [product page](/ui-snippets/product-card/) — it lets users choose a product [variant](/ui-snippets/variant-selector/) by clicking a colour circle rather than selecting from a dropdown. For a free-form colour field, see the [color picker input](/ui-snippets/color-picker-input/). This snippet provides a complete colour and size variant selector: circular swatches using CSS custom properties for colour, a selected ring that matches the swatch colour, an out-of-stock diagonal slash indicator, size chips with active/disabled states, and a live preview card that updates in real time.\n\n**CSS custom properties for swatch colours**\n\nEach swatch has a style="--c:#hexvalue" inline attribute. The CSS uses background: var(--c) to apply the colour. This means colours are declared once in HTML and used in both the background and the selected outline — outline: 2px solid var(--c) creates an accent ring that matches the swatch colour exactly, without needing a separate CSS rule per colour.\n\n**The selected ring pattern**\n\nThe selected swatch uses two properties together: border: 3px solid #fff (white gap between swatch and ring) and outline: 2px solid var(--c) (the matching accent ring). This creates the standard e-commerce "selected colour" visual — a coloured ring separated from the swatch by a white gap. Both border and outline are required; one alone looks wrong.\n\n**Out-of-stock diagonal slash**\n\nThe .unavailable swatch has a ::after pseudo-element with background: linear-gradient(45deg, transparent 43%, #fff 43%, #fff 57%, transparent 57%) — a diagonal white line across the circle. This communicates "out of stock" without removing the swatch from the UI (users can still see the colour exists). The swatch also gets opacity: 0.35 and cursor: not-allowed.\n\n**Size chips**\n\nSize buttons use a similar selected/unavailable pattern but as rectangular chips rather than circles. The .selected chip fills with indigo. The .unavailable chip has text-decoration: line-through and is disabled. The active state is managed by JavaScript removing .selected from all chips and adding it to the clicked one.\n\n**The live preview card**\n\nA preview card below the selectors shows the selected colour (as a coloured square), product name, the current variant combination as text ("Midnight Indigo · M"), and the price. This gives users an instant confirmation of their selection before adding to cart.

**Persisting the selection**

Store the selected variant in localStorage or a URL parameter for returning users. On page load: const saved = new URLSearchParams(location.search).get("colour"); if (saved) { const btn = document.querySelector(".swatch[data-name='" + saved + "']"); if (btn) btn.click(); }. On selection: history.replaceState(null, "", "?colour=" + encodeURIComponent(selectedColour)). This preserves the selection across page reloads and allows sharing a specific colour variant via URL.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click a colour swatch or size chip to select', text: 'The selected colour gets an accent ring that matches its colour. The selected size chip fills with indigo. The preview card updates instantly to show the chosen combination.' },
      { title: 'Update swatch colours using data attributes', text: 'Change the style="--c:#hexvalue" on each .swatch button and update the data-name attribute with the colour name. Add or remove .swatch elements to match your product variants.' },
      { title: 'Mark out-of-stock variants', text: 'Add class="swatch unavailable" and disabled to any colour or size that is out of stock. The diagonal slash and disabled cursor appear automatically from CSS.' },
      { title: 'Update the product name and price', text: 'Edit the .preview-name and .preview-price text in the HTML. The variant text (colour + size combination) updates automatically from JavaScript. Add logic to onUpdate() to change price based on the selected variant.' },
      { title: 'Wire Add to Cart to your API', text: 'In the add() function, replace the feedback with a fetch POST: fetch("/api/cart", { method:"POST", body: JSON.stringify({ sku: selectedColour + "-" + selectedSize, qty: 1 }) }). Show success state on resolve.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component with selectedColour and selectedSize in useState, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['CSS custom property --c on each swatch: one declaration drives background + outline colour','Selected ring: border:3px solid #fff (gap) + outline:2px solid var(--c) (ring)','Out-of-stock: linear-gradient(45deg) diagonal white line via ::after','opacity:0.35 + cursor:not-allowed + disabled on unavailable swatches','Size chips: same selected/unavailable pattern as colour swatches','getComputedStyle().getPropertyValue("--c") reads CSS custom property value in JS','Live preview: colour square + variant text update on every selection change','aria-pressed="true/false" on swatches for screen reader state announcements'],
    useCases: [
      { icon: 'MONEY', title: 'E-commerce product page colour and size variant selector', desc: 'The standard product variant selection pattern on Shopify, WooCommerce, and custom e-commerce sites. Users click colour swatches and size chips before adding to cart. The selected combination feeds into the cart API as a variant SKU.' },
      { icon: 'DESIGN', title: 'Interior design product colour options', desc: 'Furniture, paint, and home decor products often have 20+ colour options. The swatch grid handles many colours in less space than a dropdown. Out-of-stock swatches remain visible with a diagonal line so users know the colour exists for future restocking.' },
      { icon: 'APP', title: 'Theme and personalisation colour picker', desc: 'Let users pick an accent colour for their profile, dashboard theme, or notification colour. The swatch grid is faster than a colour picker for predefined brand colours. The selected ring gives clear confirmation of the active choice.' },
      { icon: 'FLOW', title: 'Car configurator and product customiser', desc: 'Vehicle colour selectors, custom print colours, and configurable product pages all use the swatch pattern. Show the selected configuration in a live preview alongside the swatches for immediate visual feedback.' },
      { icon: 'LEARN', title: 'Study CSS custom properties for dynamic component theming', desc: 'The --c custom property pattern shows how to use inline CSS variables to drive multiple CSS rules from a single HTML attribute. This technique applies to any component where a colour needs to drive multiple related styles (background, border, shadow, text).' },
      { icon: 'CODE', title: 'Fabric and material selector for fashion e-commerce', desc: 'Fabric swatches can use background-image: url("fabric-texture.jpg") instead of a flat colour. Use the same CSS structure but swap background: var(--c) for background: var(--swatch-img). The selected ring, out-of-stock indicator, and JavaScript selection logic work identically.' },
      { icon: 'CODE', title: 'Related: Star Rating — CSS Only Radio Hack (No JavaScript)', desc: 'See the [Star Rating — CSS Only Radio Hack (No JavaScript)](/ui-snippets/css-only-star-rating-radio/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the selected ring use the swatch colour without JavaScript?', a: 'Each swatch button has a CSS custom property --c set as an inline style attribute: style="--c:#6366f1". The CSS rule .swatch.selected uses outline: 2px solid var(--c) — this reads the custom property value from the element itself. Since each swatch has its own --c value, the outline colour matches the swatch background automatically. No JavaScript needed to set the ring colour — just add the .selected class and CSS does the rest.' },
      { q: 'How do I read the CSS custom property value in JavaScript for the live preview?', a: 'Use getComputedStyle: const hex = getComputedStyle(btn).getPropertyValue("--c").trim(). This returns the CSS custom property value as a string. Note that getComputedStyle reads the computed value (after any CSS inheritance), while element.style.getPropertyValue("--c") reads only inline styles. For inline-set custom properties, both work. The .trim() removes any whitespace the browser adds around the value.' },
      { q: 'How do I show colour name tooltips on hover?', a: 'The title attribute on each swatch button provides a native browser tooltip: <button class="swatch" title="Midnight Indigo">. For a styled custom tooltip, use the CSS Tooltip snippet from the Navigation category: add data-tip="Midnight Indigo" to each swatch and apply the tooltip CSS. The tooltip text matches the data-name attribute, so you can generate it: btn.dataset.tip = btn.dataset.name.' },
      { q: 'How do I use this swatch selector in React?', a: 'Click "JSX" to download. Manage selectedColour and selectedSize with useState. The swatch onClick calls setSelectedColour(btn.dataset.name). Derive the outline colour from the selected swatch: the active ring uses the --c custom property which is set via inline style on each swatch element — this works identically in React. For the preview colour square, store the hex separately: setSelectedHex(btn.style.getPropertyValue("--c")).' },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out why the selected ring looks right just by staring at the CSS. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the selected swatch needs both a solid white border and a separate outline sharing the same --c custom property, and what would go wrong visually if either one were removed. The same assistant can help you optimize it — for instance asking whether reading the color back with getComputedStyle on every click is necessary versus reading the --c value straight from the button's inline style. It is also useful for extending the component: ask it to add keyboard arrow-key navigation between swatches within the radiogroup, support fabric or texture swatches using background-image instead of a flat color, or wire the selected variant into the URL so a specific color/size combination is shareable as a link. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a product color and size variant selector in plain HTML, CSS, and JavaScript — no frameworks, no component libraries.

Requirements:
- A row of circular color swatch buttons inside a role="radiogroup" container, where each swatch's color is set once via an inline CSS custom property (e.g. style="--c:#hex") and referenced by CSS for both its background and, when selected, its outline color — not two separate hardcoded color declarations per swatch.
- The selected swatch must show a solid white border creating a gap plus a separate outline in the swatch's own color, so the ring reads as a distinct halo rather than a plain border, and toggle aria-pressed appropriately on all swatches when selection changes.
- At least one swatch must be marked out of stock: disabled, dimmed with reduced opacity, and visually crossed out using a CSS pseudo-element diagonal gradient line rather than removing the swatch from the layout entirely.
- A separate row of rectangular size chips following the same selected/disabled visual pattern (fill color on selection, strikethrough text and disabled cursor when unavailable), toggled independently from the color swatches.
- A live preview card that updates immediately on any swatch or chip click to show a color swatch, the combined variant text ("ColorName - Size"), and a price, reading the actual applied color back from the DOM via getComputedStyle rather than a hardcoded lookup table.
- An "Add to cart" button that gives temporary visual confirmation (changed text and background color) for about two seconds after being clicked, then reverts.`,
    },
  },
};

export default colorSwatch;
