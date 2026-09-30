const variantSwatchPicker = {
  id: 'variant-swatch-picker',
  title: 'Variant Swatch Picker',
  category: 'forms',
  html: `<div class="picker-wrap">
  <div class="picker-group">
    <span class="picker-label">Color</span>
    <div class="swatches" role="radiogroup" aria-label="Color">
      <button class="swatch" style="background:#1e293b" data-value="Midnight" onclick="selectSwatch(this)" aria-label="Midnight" role="radio" aria-checked="true"></button>
      <button class="swatch" style="background:#ef4444" data-value="Crimson" onclick="selectSwatch(this)" aria-label="Crimson" role="radio" aria-checked="false"></button>
      <button class="swatch" style="background:#22c55e" data-value="Forest" onclick="selectSwatch(this)" aria-label="Forest" role="radio" aria-checked="false"></button>
      <button class="swatch" style="background:#f8fafc; border: 1px solid #e2e8f0" data-value="Cloud" onclick="selectSwatch(this)" aria-label="Cloud" role="radio" aria-checked="false"></button>
    </div>
  </div>
  <div class="picker-group">
    <span class="picker-label">Size</span>
    <div class="sizes" role="radiogroup" aria-label="Size">
      <button class="size-pill" data-value="S" onclick="selectSize(this)" role="radio" aria-checked="false">S</button>
      <button class="size-pill active" data-value="M" onclick="selectSize(this)" role="radio" aria-checked="true">M</button>
      <button class="size-pill" data-value="L" onclick="selectSize(this)" role="radio" aria-checked="false">L</button>
      <button class="size-pill" data-value="XL" onclick="selectSize(this)" role="radio" aria-checked="false">XL</button>
    </div>
  </div>
  <p class="selection-label">Selected: <strong id="selectionText">Midnight, M</strong></p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.picker-wrap { max-width: 320px; }
.picker-group { margin-bottom: 20px; }
.picker-label { display: block; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px; }

.swatches { display: flex; gap: 10px; }
.swatch {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow: 0 1px 3px rgba(15,23,42,0.15);
  transition: transform 0.15s;
}
.swatch:hover { transform: scale(1.08); }
.swatch[aria-checked="true"] {
  outline: 2px solid #6366f1;
  outline-offset: 3px;
}

.sizes { display: flex; gap: 8px; }
.size-pill {
  min-width: 40px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.size-pill:hover { border-color: #94a3b8; }
.size-pill.active { background: #6366f1; border-color: #6366f1; color: #fff; }

.selection-label { font-size: 13px; color: #64748b; padding-top: 8px; border-top: 1px solid #e2e8f0; }
.selection-label strong { color: #1e293b; }`,
  js: `let selectedColor = 'Midnight';
let selectedSize = 'M';

function updateSelectionText() {
  document.getElementById('selectionText').textContent = selectedColor + ', ' + selectedSize;
}

function selectSwatch(btn) {
  document.querySelectorAll('.swatch').forEach(s => s.setAttribute('aria-checked', 'false'));
  btn.setAttribute('aria-checked', 'true');
  selectedColor = btn.dataset.value;
  updateSelectionText();
}

function selectSize(btn) {
  document.querySelectorAll('.size-pill').forEach(s => {
    s.classList.remove('active');
    s.setAttribute('aria-checked', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-checked', 'true');
  selectedSize = btn.dataset.value;
  updateSelectionText();
}`,

  seo: {
    title: 'Variant Swatch Picker — Free HTML CSS JS Color & Size Selector Snippet',
    description: 'A product variant picker with circular color swatches and pill-shaped size buttons, a focus ring on the active swatch, and a live "Selected: X, Y" label. Vanilla JS.',
    about: {
      title: 'Variant Swatch Picker — HTML, CSS & JavaScript Product Variant Selector',
      description: `Almost every product with color or size options needs a variant picker, and the standard pattern is two independent single-select groups: circular color swatches and pill-shaped size buttons, each behaving as its own radio group. This snippet builds both, keyed off two plain JavaScript variables, with a live summary label showing the current combination.

**How each group behaves like a radio group without radio inputs**

Rather than native \`<input type="radio">\` elements (which are harder to style into custom shapes like circular swatches), each swatch and size pill is a plain \`<button>\` with \`role="radio"\` and \`aria-checked\`. \`selectSwatch(btn)\` and \`selectSize(btn)\` each reset every button in their own group to \`aria-checked="false"\`, then set the clicked button to \`"true"\` — the same "clear all, then set one" pattern used for tabs and filter chips elsewhere in this library, just applied per-group. The two groups are entirely independent — clicking a size never touches the color swatches and vice versa, since each function only ever queries its own \`.swatch\` or \`.size-pill\` class.

**How the active swatch is highlighted**

Rather than a checkmark icon (which would need to render legibly against any swatch color, including near-white ones), the active swatch gets a colored \`outline\` with \`outline-offset\`, forming a visible ring *around* the swatch rather than altering its fill. This works cleanly against every swatch color, including the light "Cloud" swatch, without needing per-color contrast logic.

**How the live selection label works**

Two module-level variables, \`selectedColor\` and \`selectedSize\`, hold the current choice from each group. Every time either \`selectSwatch\` or \`selectSize\` runs, it updates its own variable and calls a shared \`updateSelectionText()\` function, which writes both current values into the \`<strong id="selectionText">\` element. Keeping the two variables outside any single click handler is what lets both groups update the same shared label independently, without needing to read the DOM back to reconstruct the current state.

**Extending toward a real product page**

In production, you'd typically use the \`selectedColor\`/\`selectedSize\` combination to look up a specific SKU's price, image, and stock status — for instance, swapping the product's main photo when a different color swatch is clicked, or disabling out-of-stock size pills for the currently selected color.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Variant Swatch Picker" in the sidebar Library tab to load the color and size selectors.' },
        { title: 'Click swatches and sizes', text: 'Click different colors and sizes in the preview and watch the "Selected: X, Y" label update live.' },
        { title: 'Add more colors', text: 'Add a new .swatch button with its own background color and data-value in the HTML panel — selectSwatch handles any number automatically.' },
        { title: 'Add more sizes', text: 'Add a new .size-pill button with a data-value in the sizes group; no JS changes needed.' },
        { title: 'Wire to real product data', text: 'Inside selectSwatch/selectSize, add a lookup against your product variants to update price, image, or stock state.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this picker on a real product detail page.' },
      ],
    },
    features: [
      'Two fully independent single-select groups (color swatches, size pills) using role="radio" semantics',
      'Consistent "clear all, then set one" selection pattern shared across both groups',
      'Active swatch highlighted with an outline ring rather than a fill change, so it works on any swatch color',
      'Live "Selected: X, Y" label driven by two simple module-level state variables',
      'Circular swatch buttons and pill-shaped size buttons both built from plain <button> elements, not native radios',
      'Adding new color or size options requires zero JavaScript changes',
      'Hover scale effect on swatches for clear interactive affordance',
      'Fully keyboard-clickable and screen-reader-friendly via role/aria-checked on every option',
    ],
    useCases: [
      { icon: 'SHOP', title: 'Product detail page variant selection', desc: 'Let shoppers choose color and size before adding an item to their cart, with the exact combination clearly displayed.' },
      { icon: 'FORM', title: 'Configurable product builders', desc: 'Extend the pattern to material, finish, or bundle options for any product with multiple independent choice dimensions.' },
      { icon: 'FLOW', title: 'Quick-view and modal product cards', desc: 'Drop this compact picker into a quick-view modal where full page real estate isn\'t available.' },
      { icon: 'LEARN', title: 'Learn custom radio-group patterns', desc: 'Study how role="radio" and aria-checked recreate native radio group semantics using freely-styleable buttons.' },
      { icon: 'DESIGN', title: 'Design system component reference', desc: 'Use as a starting point for a design system\'s standard variant-selector component across multiple product types.' },
    ],
    faqs: [
      { q: 'Why use buttons with role="radio" instead of native radio inputs?', a: 'Native radio inputs are difficult to style into custom shapes like solid-color circular swatches while keeping consistent cross-browser appearance. Using button elements with role="radio" and aria-checked recreates the same accessible single-selection semantics while allowing full custom styling.' },
      { q: 'How does the active swatch stay visible against a very light color like white?', a: 'Instead of relying on the swatch\'s own fill color to indicate selection, the active swatch gets a colored outline drawn outside its edge with outline-offset. This ring is visible regardless of how light or dark the underlying swatch color is.' },
      { q: 'How do the color and size selections stay independent of each other?', a: 'selectSwatch and selectSize each only query their own class (.swatch or .size-pill) when resetting and setting aria-checked, so clicking in one group never affects the state of the other group.' },
      { q: 'How does the "Selected: X, Y" label know both current values?', a: 'Two variables, selectedColor and selectedSize, are declared outside either click handler and updated independently by their respective functions. A shared updateSelectionText function reads both variables whenever either one changes and writes the combined string into the label.' },
      { q: 'How do I add a new color option?', a: 'Add a new button with class="swatch", a background color via inline style or a CSS class, a data-value attribute, and the standard role/aria-checked/aria-label attributes, inside the .swatches container.' },
      { q: 'Can I disable a size for a particular color (e.g. out of stock)?', a: 'Yes — inside selectSwatch, after updating selectedColor, look up which sizes are unavailable for that color in your product data and toggle a disabled attribute (plus a visually muted class) on the corresponding .size-pill buttons.' },
      { q: 'Is this picker accessible to screen reader users?', a: 'Yes — each option group uses role="radiogroup" on its container and role="radio" with aria-checked on each button, which is the standard ARIA pattern for a custom single-select control, and every swatch has a descriptive aria-label naming its color.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why an outline ring around the swatch, rather than a checkmark drawn on top of it, is the more robust way to indicate the active color selection across an unpredictable range of swatch colors including near-white ones. It's also a good prompt for extending the picker to disable out-of-stock size options based on the currently selected color, or for swapping the product's main image automatically whenever a different color swatch is chosen, both common real-world requirements for a variant picker.`,
      prompt: `Build a "variant swatch picker" in plain HTML, CSS, and vanilla JavaScript for a product page, with two independent single-select option groups — no native radio inputs, no framework.

Requirements:
- A color group of circular swatch buttons, each with role="radio", aria-checked, a descriptive aria-label, and its own distinct background color, where exactly one is selected at a time and the active one is indicated with an outline ring drawn outside the swatch rather than any change to its fill color (so it remains clearly visible even against a near-white swatch).
- A size group of pill-shaped buttons (S, M, L, XL) using the identical role="radio"/aria-checked single-select pattern, completely independent from the color group's state.
- Two separate variables tracking the currently selected color and size, updated by two separate functions (one per group), with a shared function that writes both current values into a single live "Selected: X, Y" text label whenever either group's selection changes.
- Adding a new color swatch or size pill must require no JavaScript changes — only new markup with the correct attributes.
- All buttons must remain fully operable via mouse click and keyboard, with clear visual hover and active states.`,
    },
  },
};

export default variantSwatchPicker;
