const qrCodeGenerator = {
  id: 'qr-code-generator',
  title: 'QR Code Generator',
  category: 'tools',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js',
  ],
  description: 'Free QR code generator HTML CSS JavaScript snippet. Live-renders a scannable QR code from any text or URL on a canvas via the qrcode.js library, with colour controls and PNG download.',
  html: `<div class="demo">
  <div class="qr-card">
    <label class="field">
      <span>Text or URL</span>
      <input type="text" class="qr-input" value="https://webdevpuneet.com" placeholder="Type something to encode..." />
    </label>
    <div class="row">
      <label class="field small">
        <span>Code colour</span>
        <input type="color" class="qr-fg" value="#1f2937" />
      </label>
      <label class="field small">
        <span>Background</span>
        <input type="color" class="qr-bg" value="#ffffff" />
      </label>
    </div>
    <div class="qr-preview">
      <canvas class="qr-canvas"></canvas>
    </div>
    <button class="download-btn" type="button">Download PNG</button>
  </div>
</div>`,
  css: `.demo {
  font-family: 'Segoe UI', system-ui, sans-serif;
  display: flex;
  justify-content: center;
  padding: 28px;
  background: #f1f5f9;
}
.qr-card {
  width: 100%;
  max-width: 340px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 14px 36px rgba(15,23,42,0.08);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}
.field input[type="text"] {
  font-size: 14px;
  font-weight: 400;
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  outline: none;
  font-family: inherit;
}
.field input[type="text"]:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
}
.row {
  display: flex;
  gap: 14px;
}
.field.small {
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.field.small input[type="color"] {
  width: 38px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: none;
}
.qr-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 16px;
  min-height: 200px;
}
.qr-canvas {
  border-radius: 8px;
  max-width: 100%;
}
.download-btn {
  border: none;
  background: #4f46e5;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.download-btn:hover { background: #4338ca; }`,
  js: `const input = document.querySelector('.qr-input');
const fg = document.querySelector('.qr-fg');
const bg = document.querySelector('.qr-bg');
const canvas = document.querySelector('.qr-canvas');
const downloadBtn = document.querySelector('.download-btn');

let timer = null;

function render() {
  const text = input.value.trim() || ' ';
  QRCode.toCanvas(canvas, text, {
    width: 220,
    margin: 1,
    color: { dark: fg.value, light: bg.value },
  }, (err) => {
    if (err) console.error(err);
  });
}

function scheduleRender() {
  clearTimeout(timer);
  timer = setTimeout(render, 200);
}

input.addEventListener('input', scheduleRender);
fg.addEventListener('input', render);
bg.addEventListener('input', render);

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'qr-code.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

render();`,
  seo: {
    title: 'QR Code Generator — Free HTML CSS JS Snippet',
    description: 'Live QR generator — type text or a URL and a scannable code renders instantly with custom colours and PNG download. Exports to React & Vue.',
    about: {
      title: 'How this QR code generator was built — qrcode.js, debounced rendering, and canvas export',
      description: `This snippet recreates the "type a link, get a scannable code" widget you see on share pages, business-card tools, and Wi-Fi-login screens — every keystroke redraws a real, scannable QR code on canvas, with adjustable foreground/background colours and a one-click PNG download. Rather than computing QR matrices by hand (a genuinely fiddly bit of error-correction math), it loads the small, focused **qrcode.js** library from a CDN and wires it up to a live form with about 35 lines of glue code.

**Why reach for a CDN library here**

QR codes are not just a pattern of black and white squares — they encode data with Reed–Solomon error correction so a scanner can still read the code even if part of it is smudged, printed small, or partially obscured by a logo. Implementing that correctly from scratch is a project in itself, so this snippet pulls in \`qrcode@1.5.1\` from jsDelivr and calls its single \`QRCode.toCanvas()\` method — the same "load a focused library, then build your UI around it" approach used by the [Theme Palette Generator](/ui-snippets/theme-palette-generator) for colour math, just applied to a domain where hand-rolling the algorithm would be wasted effort.

**Live rendering with a debounce**

The text input fires \`QRCode.toCanvas(canvas, text, options, callback)\` on every keystroke, but redrawing on *every single character* would be wasteful and can visibly stutter on slower devices — so the snippet wraps the call in a \`scheduleRender()\` function that clears any pending \`setTimeout\` and queues a fresh one 200ms later. Type continuously and only the final pause triggers a render; the colour pickers call \`render()\` directly since dragging a colour wheel naturally produces fewer, more deliberate updates. This debounce pattern is a small but important detail any time you're rendering something non-trivial in response to rapid input events.

**Live colour customization**

Two native \`<input type="color">\` swatches feed straight into \`QRCode.toCanvas\`'s \`color: { dark, light }\` option — the library redraws the entire matrix in the chosen foreground and background colours on every \`input\` event, so the preview updates in real time as you drag the colour wheel. No extra canvas manipulation is needed; the library handles the recoloring as part of its normal render path.

**Exporting the finished code**

"Download PNG" reuses the same \`canvas.toDataURL('image/png')\` plus programmatic \`<a download>\` click pattern as the [Signature Pad](/ui-snippets/signature-pad) snippet — because \`QRCode.toCanvas\` draws onto a real \`<canvas>\` element, the resulting image is just standard canvas content, exportable with the browser's built-in encoding and no extra image-processing step.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the qrcode.js library from a CDN', text: 'Add `https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js` to the page — it exposes a global `QRCode` object with a `toCanvas()` method that handles the encoding and error-correction math for you.' },
        { title: 'Build the form: text input + two colour pickers', text: 'Add a text `<input>` for the content to encode and two `<input type="color">` swatches bound to `dark` (foreground) and `light` (background), plus a `<canvas>` to render into.' },
        { title: 'Render with QRCode.toCanvas', text: 'Call `QRCode.toCanvas(canvas, text, { width, margin, color: { dark, light } }, callback)` — the library draws the full QR matrix directly onto the canvas element you pass it.' },
        { title: 'Debounce text input, render colours immediately', text: 'Wrap the text-input handler in a `scheduleRender()` that clears and resets a `setTimeout(render, 200)` so rapid typing only triggers one render per pause; call `render()` directly from the colour inputs\' `input` events.' },
        { title: 'Add PNG export', text: 'On the download button, set a temporary `<a>`\'s `download` attribute and `href = canvas.toDataURL("image/png")`, then call `.click()` — the canvas content (the QR code) saves as a standard image file.' },
        { title: 'Render once on load', text: 'Call `render()` immediately after wiring up the listeners so the canvas shows a live, scannable code with the default text and colours before the visitor types anything.' },
      ],
    },
    features: [
      'Real, scannable QR codes via qrcode.js — generated with proper Reed–Solomon error correction by a focused CDN library, not a hand-rolled approximation',
      'Live re-render on every keystroke — type any text or URL and the canvas updates to match, debounced at 200ms so rapid typing stays smooth instead of stuttering',
      'Custom foreground/background colours — two native colour pickers feed `QRCode.toCanvas`\'s `color` option directly, recolouring the entire matrix in real time as you drag',
      'One-click PNG download — `canvas.toDataURL("image/png")` plus a programmatic `<a download>` click exports the finished code as a standalone image with no server involved',
      'Debounced vs. immediate update strategy — text input is debounced (frequent keystrokes), colour input renders immediately (deliberate, infrequent changes) — a small but instructive UX distinction',
      'Card-style preview layout — bordered preview frame, labelled fields, and a primary download button mirror the layout patterns of real generator tools and admin utilities',
      'Loads from a CDN with zero build setup — one script tag and ~35 lines of glue code; copy the HTML, CSS, and JS into any page and it works immediately',
    ],
    useCases: [
      { icon: 'GLOBAL', title: 'Share pages, business cards, and contact widgets', desc: 'Generate a scannable code for a profile URL, vCard string, or social link directly on a page — visitors can scan with their phone instead of typing a long address by hand.' },
      { icon: 'STAR', title: 'Event check-ins, menus, and Wi-Fi access', desc: 'Encode an event-check-in URL, a digital menu link, or a `WIFI:` connection string and let the generator render a printable, on-brand code with custom colours that match your venue or packaging.' },
      { icon: 'WRITE', title: 'Marketing landing pages and print campaigns', desc: 'Let marketers preview exactly how a tracking-link QR code will look — including custom brand colours — before exporting it as a PNG for posters, packaging, or print ads.' },
      { icon: 'CODE', title: 'Internal tools and admin dashboards', desc: 'Drop the generator into an admin panel to produce one-off codes for invite links, asset tags, or device-pairing flows without standing up a backend QR service.' },
      { icon: 'LEARN', title: 'Learning to wire a focused CDN library into a live UI', desc: 'A clean, minimal example of the "load a small library, build your form around its single entry point" pattern — directly transferable to any tool that wraps a specialist algorithm in a friendly interface.' },
      { icon: 'FLOW', title: 'A reference for debounced live-preview inputs', desc: 'The `scheduleRender()` debounce is a reusable pattern for any input-driven preview — search-as-you-type, live markdown rendering (see the [Markdown Live Preview](/ui-snippets/markdown-live-preview) snippet), or canvas-based tools that redraw on every keystroke.' },
    ],
    faqs: [
      { q: 'Why use a library instead of generating the QR code with plain canvas drawing?', a: 'A QR code is not just a grid of black and white squares — it encodes data using Reed–Solomon error correction so the code stays scannable even when partly damaged, small, or covered by a logo. Computing that matrix correctly is a non-trivial algorithm in its own right, so this snippet loads the small, focused `qrcode.js` library from a CDN and calls its `toCanvas()` method, which produces a fully spec-compliant, scannable code in one call.' },
      { q: 'Why does the text input use a debounce but the colour pickers do not?', a: 'Typing produces many rapid `input` events — re-rendering the QR matrix on every keystroke would be wasteful and can visibly stutter. `scheduleRender()` clears any pending `setTimeout` and queues a new 200ms-delayed render, so only the pause after typing triggers a redraw. Dragging a colour wheel, by contrast, naturally produces fewer and more deliberate change events, so the colour inputs call `render()` directly for instant visual feedback.' },
      { q: 'How do I change the colours of the generated QR code?', a: 'The two `<input type="color">` swatches are passed straight into `QRCode.toCanvas`\'s `color: { dark: fg.value, light: bg.value }` option. The `dark` value colours the QR modules (the foreground pattern) and `light` colours the background — the library redraws the entire matrix in those colours on every `input` event, so the preview updates live as you pick.' },
      { q: 'Will the QR code still scan if I change its colours or size?', a: 'Yes, as long as there is enough contrast between the foreground and background colours for a scanner\'s camera to distinguish the modules — very low-contrast combinations (e.g. two similar pastel shades) can make scanning unreliable on some devices. The size set via the `width` option does not affect scannability; it only changes how large the rendered canvas is.' },
      { q: 'How do I save the generated code as an image I can print or share?', a: 'Click "Download PNG" — it calls `canvas.toDataURL("image/png")` to get a base64-encoded image of the canvas, assigns it to a temporary `<a download="qr-code.png">` link, and clicks it programmatically. The browser handles the save dialog, producing a standalone PNG file with no server round-trip.' },
      { q: 'Can I use this QR code generator snippet on my own site for free, including commercial projects?', a: 'Yes — the HTML, CSS, and JS on this page are free to copy and adapt anywhere, including commercial products. The `qrcode.js` library it loads from jsDelivr is published under the MIT license, so there are no usage restrictions or attribution requirements to worry about.' },
      { q: 'Can I use this QR code generator in React, Vue, or Angular?', a: 'Yes. Use the export buttons on this page: JSX downloads a React component, Vue a Vue 3 SFC, Angular a standalone component, and Tailwind a utility-class version. In React, load the qrcode.js script inside useEffect and generate the code after the library resolves; in Vue use onMounted.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to reverse-engineer the timing choices here by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why scheduleRender debounces the text input at 200ms but wires the color pickers straight to render, and what would break if the QRCode.toCanvas call ran synchronously on every keystroke instead. The same assistant is useful for optimizing it — ask whether the 200ms debounce window is too long or short for the target audience, or whether re-encoding the entire matrix on every color change is wasted work that could be replaced with a canvas recolor pass. It also helps with extending the tool: ask it to add SVG export alongside the PNG download, support embedding a logo in the code's center safely within the error-correction budget, or add an error-correction-level selector. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live QR code generator in plain HTML, CSS, and JavaScript using the qrcode.js library loaded from a CDN (via its global QRCode object and toCanvas method) — no hand-rolled QR matrix math, no build step.

Requirements:
- A text input for the content to encode, two native color inputs for the foreground (dark modules) and background, a canvas element for the rendered code, and a download button.
- Call QRCode.toCanvas(canvas, text, { width, margin, color: { dark, light } }, callback) to render, and fall back to a single space character if the input is empty so the canvas never errors out on blank text.
- The text input must be debounced: wrap the render call in a function that clears any pending setTimeout and schedules a new one roughly 200ms later, so rapid typing produces one render per pause rather than one per keystroke.
- The two color inputs must call the render function directly on every input event, with no debounce, since dragging a color wheel produces fewer and more deliberate changes.
- The download button must export the canvas exactly as displayed using canvas.toDataURL("image/png"), assign it to a temporary anchor element's href with a download attribute set, and trigger it with a programmatic click — no server round trip.
- Render once immediately on page load using the default input values so a valid, scannable code is visible before the user interacts with anything.`,
    },
  },
};

export default qrCodeGenerator;
