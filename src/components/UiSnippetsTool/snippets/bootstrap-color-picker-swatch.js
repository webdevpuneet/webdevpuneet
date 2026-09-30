const bootstrapColorPickerSwatch = {
  id: 'bootstrap-color-picker-swatch',
  title: 'Bootstrap Color Picker with Swatches',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscp-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-3">Choose a color</h5>

      <div class="d-flex flex-wrap gap-2 mb-3" id="bscpSwatches">
        <button type="button" class="bscp-swatch" style="background:#dc3545" data-color="#dc3545" aria-label="Red"></button>
        <button type="button" class="bscp-swatch" style="background:#fd7e14" data-color="#fd7e14" aria-label="Orange"></button>
        <button type="button" class="bscp-swatch" style="background:#ffc107" data-color="#ffc107" aria-label="Yellow"></button>
        <button type="button" class="bscp-swatch" style="background:#198754" data-color="#198754" aria-label="Green"></button>
        <button type="button" class="bscp-swatch" style="background:#0dcaf0" data-color="#0dcaf0" aria-label="Cyan"></button>
        <button type="button" class="bscp-swatch" style="background:#0d6efd" data-color="#0d6efd" aria-label="Blue"></button>
        <button type="button" class="bscp-swatch" style="background:#6f42c1" data-color="#6f42c1" aria-label="Purple"></button>
        <button type="button" class="bscp-swatch" style="background:#212529" data-color="#212529" aria-label="Black"></button>
        <label class="bscp-swatch bscp-custom" title="Custom color">
          <input type="color" id="bscpCustom" class="visually-hidden" value="#dc3545">
        </label>
      </div>

      <div class="bscp-preview mb-3" id="bscpPreview"></div>

      <div class="input-group">
        <span class="input-group-text">HEX</span>
        <input type="text" class="form-control" id="bscpHex" value="#DC3545" readonly>
        <button class="btn btn-outline-secondary" type="button" id="bscpCopy">Copy</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bscp-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bscp-swatch { width: 36px; height: 36px; border-radius: 8px; border: 2px solid transparent; padding: 0; cursor: pointer; }
.bscp-swatch.active { border-color: #212529; box-shadow: 0 0 0 2px #fff inset; }
.bscp-custom { background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red); display: flex; align-items: center; justify-content: center; }
.bscp-preview { height: 90px; border-radius: 10px; border: 1px solid #eceef1; transition: background-color .15s ease; }`,
  js: `const swatches = Array.from(document.querySelectorAll('.bscp-swatch[data-color]'));
const customInput = document.getElementById('bscpCustom');
const preview = document.getElementById('bscpPreview');
const hexField = document.getElementById('bscpHex');
const copyBtn = document.getElementById('bscpCopy');

function setColor(hex) {
  const upper = hex.toUpperCase();
  preview.style.backgroundColor = upper;
  hexField.value = upper;
  swatches.forEach(s => s.classList.toggle('active', s.dataset.color.toUpperCase() === upper));
}

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    setColor(swatch.dataset.color);
    customInput.value = swatch.dataset.color;
  });
});

customInput.addEventListener('input', () => {
  setColor(customInput.value);
});

copyBtn.addEventListener('click', async () => {
  const original = copyBtn.textContent;
  try {
    await navigator.clipboard.writeText(hexField.value);
    copyBtn.textContent = 'Copied!';
  } catch (err) {
    // Clipboard API can throw in insecure contexts or without permission;
    // fall back to a visible message instead of a silent failure.
    copyBtn.textContent = 'Failed';
  }
  setTimeout(() => { copyBtn.textContent = original; }, 1500);
});

setColor('#dc3545');`,

  seo: {
    title: 'Bootstrap Color Picker with Swatches — Free Snippet',
    description: `Real Bootstrap 5.3 swatch grid plus a native color input, synced hex field, and Clipboard API copy button with a timed "Copied!" reset. Ships to React & Tailwind.`,
    about: {
      title: 'Bootstrap Color Picker with Swatches — HTML, CSS & JavaScript',
      description: `A color picker that only shows a native \`<input type="color">\` forces users through the browser's own (often clunky) color dialog for every pick, even when they just want one of a handful of brand colors. This snippet solves that by putting eight preset \`.bscp-swatch\` buttons in front of a real \`<input type="color" id="bscpCustom">\`, so a single click covers the common case while the native picker stays available for anything outside the preset palette — both paths converge on the same \`setColor()\` function, so the preview box, the hex field, and the active-swatch highlight always stay in sync regardless of which input triggered the change.\n\nEach swatch button carries its color in a \`data-color\` attribute rather than duplicating it in JavaScript; clicking a swatch reads that attribute, calls \`setColor(swatch.dataset.color)\`, and also writes the value into the hidden \`customInput\` so the native color input's internal state doesn't silently drift out of sync with what's visually selected. The custom swatch itself is styled with a CSS \`conic-gradient(red, yellow, lime, cyan, blue, magenta, red)\` rainbow background so it visually reads as "pick anything" rather than looking like an eighth flat preset. Bootstrap's own \`visually-hidden\` utility class hides the raw \`<input type="color">\` element while keeping it in the accessibility tree and fully clickable underneath its label, which is the standard accessible way to restyle a native color input without losing keyboard and screen-reader support.\n\n\`setColor(hex)\` does three things every time it runs: it sets \`preview.style.backgroundColor\`, writes the uppercased hex string into the read-only \`#bscpHex\` field, and loops over every swatch toggling an \`active\` class based on a case-insensitive match against \`data-color\` — so the active border only appears on a swatch when its exact color is currently selected, and correctly disappears when a custom color is picked that doesn't match any preset.\n\nThe Copy button uses the real async Clipboard API (\`navigator.clipboard.writeText\`) wrapped in a try/catch, since that call can throw in an insecure (non-HTTPS) context or when clipboard permission is denied — a case a lot of copy-button implementations forget to handle. On success the button label swaps to "Copied!" and a \`setTimeout\` resets it back to "Copy" after 1.5 seconds; on failure it shows "Failed" instead, so the user always gets accurate feedback rather than a button that silently claims success.\n\nA final call at the bottom of the script, \`setColor('#dc3545')\`, deliberately initializes the whole widget to a known state on load rather than leaving the preview box, hex field, and active-swatch highlight relying on whatever the browser happens to default an unset element to — the red swatch's button is marked active and the hex field reads "#DC3545" from the very first render, matching the initial inline styles already present in the markup so there's no flash of mismatched state between HTML and JavaScript.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A grid of eight color swatches plus a rainbow-gradient custom swatch appears above a preview box already showing red.' },
        { title: 'Click the blue swatch', text: 'The preview box fills with blue, the hex field updates to "#0D6EFD", and a dark border highlights the blue swatch as active.' },
        { title: 'Click the rainbow custom swatch', text: `The browser's native color picker opens; choosing any color updates the preview and hex field instantly and removes the active border from every preset swatch.` },
        { title: 'Click Copy', text: 'The button label changes to "Copied!" for 1.5 seconds, then reverts to "Copy" automatically.' },
        { title: 'Check the hex field', text: 'It stays read-only and always mirrors exactly what is shown in the preview box, whichever input last changed the color.' },
      ],
    },
    features: [
      'Eight preset color swatches built as real clickable buttons with data-color attributes',
      'Native input type="color" for unlimited custom color selection',
      'Rainbow conic-gradient styling on the custom swatch to signal "pick anything"',
      'Single setColor() function keeps preview, hex field, and active state in sync',
      'Active-swatch highlight clears automatically when a non-matching custom color is picked',
      'Real async Clipboard API copy with try/catch error handling',
      'Timed "Copied!" label reset via setTimeout, not a permanent state change',
      'Accessible: native color input hidden with Bootstrap visually-hidden, not display:none',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Theme and brand color pickers', desc: `Let users pick an accent color for a dashboard or profile, similar to configuring the look of a [hero section](/ui-snippets/bootstrap-hero-gradient-cta/) before publishing.` },
      { icon: 'APP', title: 'Design tool and canvas apps', desc: 'A fast preset-plus-custom color selector for drawing, diagramming, or annotation tools where speed matters more than a full color wheel.' },
      { icon: 'FORM', title: 'Product customization forms', desc: `Pair with a [stepper wizard](/ui-snippets/bootstrap-stepper-wizard-form/) so a shopper picks a product color as one step before checkout.` },
      { icon: 'LEARN', title: 'Learning the Clipboard API', desc: 'A clear, working example of navigator.clipboard.writeText() with proper error handling and a timed UI reset — a pattern reusable in any copy-to-clipboard feature.' },
      { icon: 'CODE', title: 'Design system documentation', desc: `Show a palette of approved brand colors with instant hex-code copy, useful alongside a [notification center](/ui-snippets/bootstrap-notification-center-dropdown/) style guide page.` },
    ],
    faqs: [
      { q: 'Why use a label wrapping the color input instead of styling the input directly?', a: 'Native color inputs render very differently across browsers and are hard to restyle consistently. Wrapping a visually-hidden input in a styled label lets the label carry the gradient swatch look while clicking it still opens the real native color picker.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — track the selected hex value in component state (useState in React, a ref in Vue with onMounted, or a signal in Angular) instead of relying on DOM classList toggles, and bind each swatch\'s click and the color input\'s change event to update that state directly.' },
      { q: 'Does the Copy button work if clipboard permission is denied?', a: 'The writeText() call is wrapped in a try/catch specifically for this — if it throws, the button shows "Failed" for 1.5 seconds instead of silently doing nothing or throwing an uncaught error in the console.' },
      { q: 'How would I add more preset swatches?', a: 'Add another button.bscp-swatch element with a data-color attribute and matching background style inside #bscpSwatches — the existing click listener is attached via a loop over that selector, so no other JavaScript changes are needed.' },
      { q: 'Can this export cleanly to Tailwind?', a: 'Yes — replace the input-group, form-control, and card classes with Tailwind utilities, keep the inline data-color-driven swatch styling as-is, and the setColor() and clipboard logic need zero changes since neither depends on Bootstrap.' },
      { q: 'Is the hex field editable by typing?', a: 'No, it is intentionally read-only — it exists to display and copy the currently selected color, not to accept typed hex input; add a text-input parsing path separately if you want users to type a hex code directly.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add a recently-used colors row that remembers the last five picks in localStorage, or to add RGB and HSL value displays alongside the hex field. It's also worth asking it to validate a manually typed hex value if you make the hex field editable.`,
      prompt: `Build a Bootstrap 5.3 color picker with preset swatches using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A grid of at least eight preset color swatch buttons, each storing its color in a data-color attribute, plus one additional swatch that wraps a native input type="color" for custom color selection.
- Clicking any preset swatch or choosing a custom color must update a large preview box's background color and a read-only hex code text field, and must toggle an "active" highlight so only the matching swatch (if any) appears selected.
- A Copy button next to the hex field must copy the current hex value using the real async Clipboard API, wrapped in error handling, and show a temporary "Copied!" (or "Failed") label that reverts to "Copy" after roughly 1.5 seconds via setTimeout.
- The custom color swatch must be visually distinguishable from the flat preset swatches (e.g. a gradient background) so it reads as "pick any color."`,
    },
  },
};

export default bootstrapColorPickerSwatch;
