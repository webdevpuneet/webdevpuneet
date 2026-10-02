const eyedropperColorPicker = {
  id: 'eyedropper-color-picker',
  title: 'EyeDropper Color Picker',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<section class="edp-wrap">
  <span class="edp-tag">window.eyedropper api</span>
  <h1>Pick any color</h1>
  <p id="edpStatus">Click "Pick a color" to sample any pixel on your screen — the button, another app, anything.</p>

  <div class="edp-current">
    <div class="edp-swatch" id="edpSwatch"></div>
    <div class="edp-values">
      <div class="edp-hex" id="edpHex">#000000</div>
      <div class="edp-rgb" id="edpRgb">rgb(0, 0, 0)</div>
    </div>
    <button class="edp-copy" id="edpCopy" type="button">Copy</button>
  </div>

  <div class="edp-actions">
    <button class="edp-btn primary" id="edpPickBtn" type="button">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 3 3 11l3 3 8-8-3-3Z"/><path d="M14 6l4 4"/><path d="M6 14l4 4-3 3-4-4 3-3Z"/></svg>
      Pick a color
    </button>
    <div class="edp-manual-wrap" id="edpManualWrap" hidden>
      <label for="edpManualInput">Type a hex color instead</label>
      <input type="text" id="edpManualInput" class="edp-manual-input" placeholder="#7c3aed" maxlength="7">
    </div>
  </div>

  <div class="edp-palette-head">
    <span>Picked colors</span>
    <button class="edp-clear" id="edpClearBtn" type="button">Clear</button>
  </div>
  <div class="edp-palette" id="edpPalette"><span class="edp-empty" id="edpEmpty">Nothing picked yet.</span></div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#131c33,#05070d 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.edp-wrap{width:100%;max-width:460px}
.edp-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#93c5fd;background:rgba(147,197,253,.1);border:1px solid rgba(147,197,253,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.edp-wrap h1{font-size:clamp(26px,6vw,34px);font-weight:800;letter-spacing:-.03em}
.edp-wrap p{font-size:13.5px;color:#a6b0c8;margin-top:8px;line-height:1.6}
.edp-current{display:flex;align-items:center;gap:14px;margin:22px 0 16px;padding:14px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
.edp-swatch{width:52px;height:52px;border-radius:12px;background:#000;border:1px solid rgba(255,255,255,.15);flex-shrink:0;box-shadow:inset 0 0 0 3px rgba(0,0,0,.25)}
.edp-values{flex:1;min-width:0}
.edp-hex{font-size:16px;font-weight:800;font-variant-numeric:tabular-nums;text-transform:uppercase}
.edp-rgb{font-size:12px;color:#8b93ab;margin-top:2px;font-variant-numeric:tabular-nums}
.edp-copy{padding:8px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e8ecf5;font:600 12px system-ui;cursor:pointer}
.edp-copy:hover{background:rgba(255,255,255,.11)}
.edp-actions{margin-bottom:20px}
.edp-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 20px;border-radius:11px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e8ecf5;font:700 13.5px system-ui;cursor:pointer;transition:background .15s,border-color .15s}
.edp-btn:hover{background:rgba(255,255,255,.11)}
.edp-btn.primary{background:linear-gradient(135deg,#60a5fa,#a78bfa);border-color:transparent;color:#0a0f1f}
.edp-manual-wrap{margin-top:12px;padding:12px;border-radius:10px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.15)}
.edp-manual-wrap label{display:block;font-size:11px;color:#8b93ab;margin-bottom:6px;font-weight:600}
.edp-manual-input{width:100%;padding:9px 11px;border-radius:8px;border:1px solid rgba(255,255,255,.16);background:rgba(0,0,0,.3);color:#fff;font:600 13px monospace}
.edp-manual-input:focus{outline:none;border-color:#93c5fd}
.edp-palette-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
.edp-palette-head span{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#8b93ab}
.edp-clear{background:none;border:none;color:#8b93ab;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline}
.edp-palette{display:flex;flex-wrap:wrap;gap:8px;min-height:36px}
.edp-empty{font-size:12px;color:#5c6480;padding:8px 0}
.edp-chip{width:32px;height:32px;border-radius:9px;border:1px solid rgba(255,255,255,.18);cursor:pointer;position:relative}
.edp-chip:hover::after{content:attr(data-hex);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:#000;color:#fff;font-size:10px;padding:3px 7px;border-radius:5px;white-space:nowrap}`,

  js: `var swatchEl = document.getElementById('edpSwatch');
var hexEl = document.getElementById('edpHex');
var rgbEl = document.getElementById('edpRgb');
var statusEl = document.getElementById('edpStatus');
var pickBtn = document.getElementById('edpPickBtn');
var manualWrap = document.getElementById('edpManualWrap');
var manualInput = document.getElementById('edpManualInput');
var copyBtn = document.getElementById('edpCopy');
var clearBtn = document.getElementById('edpClearBtn');
var paletteEl = document.getElementById('edpPalette');
var emptyEl = document.getElementById('edpEmpty');

var picked = [];
var supported = typeof window.EyeDropper === 'function';

function hexToRgb(hex) {
  var h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
  var num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function isValidHex(hex) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);
}

function applyColor(hex, source) {
  hex = hex.toLowerCase();
  var rgb = hexToRgb(hex);
  swatchEl.style.background = hex;
  hexEl.textContent = hex;
  rgbEl.textContent = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
  addToPalette(hex);
  statusEl.textContent = source === 'manual'
    ? 'Set from manual hex input — ' + hex + '.'
    : 'Sampled from your screen — ' + hex + '.';
}

function addToPalette(hex) {
  if (picked.indexOf(hex) !== -1) return;
  picked.unshift(hex);
  picked = picked.slice(0, 12);
  renderPalette();
}

function renderPalette() {
  emptyEl.hidden = picked.length > 0;
  var chips = paletteEl.querySelectorAll('.edp-chip');
  chips.forEach(function (c) { c.remove(); });
  picked.forEach(function (hex) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'edp-chip';
    chip.style.background = hex;
    chip.dataset.hex = hex;
    chip.title = hex;
    chip.addEventListener('click', function () { applyColor(hex, 'palette'); });
    paletteEl.appendChild(chip);
  });
}

async function pickColor() {
  // Real EyeDropper API path: Chromium-based browsers only, and it must be
  // triggered directly from a user gesture (this click handler). It resolves
  // with the actual sRGB hex of whatever pixel the user clicks, anywhere on
  // screen -- not just inside this page.
  try {
    var eyeDropper = new window.EyeDropper();
    statusEl.textContent = 'Move your cursor and click any pixel on screen…';
    var result = await eyeDropper.open();
    applyColor(result.sRGBHex, 'eyedropper');
  } catch (err) {
    // User pressed Escape or clicked away to cancel -- not an error state,
    // just restore the idle message.
    if (err && err.name === 'AbortError') {
      statusEl.textContent = 'Pick cancelled. Click "Pick a color" to try again.';
    } else {
      statusEl.textContent = 'EyeDropper failed (' + (err && err.name ? err.name : 'unknown') + ') — use the manual hex field below instead.';
    }
  }
}

function initUnsupported() {
  pickBtn.hidden = true;
  manualWrap.hidden = false;
  statusEl.textContent = 'This browser has no window.EyeDropper support (it currently ships in Chromium-based browsers only) — type a hex value manually instead. Everything else on this page works identically either way.';
}

pickBtn.addEventListener('click', pickColor);

manualInput.addEventListener('input', function () {
  var v = manualInput.value.trim();
  if (isValidHex(v)) applyColor(v.length === 4 ? '#' + v.slice(1).split('').map(function (c) { return c + c; }).join('') : v, 'manual');
});

copyBtn.addEventListener('click', function () {
  var text = hexEl.textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      copyBtn.textContent = 'Copied!';
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1200);
    }).catch(function () {});
  }
});

clearBtn.addEventListener('click', function () {
  picked = [];
  renderPalette();
});

if (!supported) {
  initUnsupported();
} else {
  manualWrap.hidden = true;
}

applyColor('#7c3aed', 'init');
picked = [];
renderPalette();`,

  seo: {
    title: 'EyeDropper Color Picker — Free window.EyeDropper Screen Sampler',
    description: `A "pick a color" button that samples any pixel on screen with the real window.EyeDropper API, plus a running palette and copy-to-clipboard — with a manual hex fallback for unsupported browsers. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'EyeDropper Color Picker — Sampling Real Screen Pixels, With a Manual Fallback',
      description: `Most "color picker" widgets on the web are really just \`<input type="color">\` wrappers — a swatch grid or a saturation square you drag inside. This one is different: it uses the actual \`window.EyeDropper\` API to let the user sample a pixel from *anywhere on their screen*, not just inside the page, then builds a running palette from what's picked.

**The real API: new EyeDropper().open()**

\`window.EyeDropper\` is a constructor. Calling \`new EyeDropper().open()\` inside a click handler switches the cursor into a magnifier and resolves a promise with \`{ sRGBHex: '#rrggbb' }\` once the user clicks anywhere — another browser tab, the OS taskbar, a design file open in a different app. It must be invoked from a direct user gesture (the click on "Pick a color") or the browser rejects it; that's why the pick call lives directly inside the button's \`click\` listener rather than behind any async setup.

**Cancellation is not an error**

Pressing Escape or clicking away rejects the promise with an \`AbortError\` \`DOMException\`. The code checks for that name specifically and restores the idle message instead of showing a scary "failed" state — cancelling a pick is a normal, expected outcome, not a failure.

**Honest unsupported fallback**

\`window.EyeDropper\` currently exists only in Chromium-based browsers (Chrome, Edge, Opera) — Firefox and Safari don't implement it. Rather than hide the feature or show a dead button, \`typeof window.EyeDropper === 'function'\` is feature-detected up front: if it's missing, the "Pick a color" button is hidden and a manual hex \`<input>\` takes its place, styled identically to the rest of the UI. Because \`applyColor()\` is the single function both paths call, the swatch, hex/RGB readout, palette, and copy button behave exactly the same whether the color came from a real screen sample or a typed value.

**A palette that survives repeated picks**

Every applied color — from either path — is pushed to the front of a \`picked\` array (deduped, capped at 12) and re-rendered as clickable chips, so a design session can build up a working set of colors without losing earlier picks. Pair this with a [gradient picker](/ui-snippets/gradient-picker/) for building multi-stop gradients from sampled colors, or a [color swatch](/ui-snippets/color-swatch/) grid for a fixed brand palette.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The swatch, hex/RGB readout, and palette render immediately.` },
      { title: 'Click "Pick a color"', text: `In a supporting browser, your cursor becomes a magnifier.` },
      { title: 'Click any pixel on screen', text: `Another tab, the OS, another app — the real color is sampled.` },
      { title: 'Press Escape to cancel', text: `The pick aborts cleanly with no error shown.` },
      { title: 'Unsupported browser?', text: `A manual hex input appears in place of the button automatically.` },
      { title: 'Build a palette', text: `Every applied color adds a clickable chip you can revisit or clear.` },
    ] },
    features: [
      { title: 'Real EyeDropper API', text: `new EyeDropper().open() samples an actual screen pixel.` },
      { title: 'Whole-screen sampling', text: `Not limited to page content — any visible pixel counts.` },
      { title: 'Gesture-gated call', text: `Invoked directly from the click handler, as the API requires.` },
      { title: 'Graceful cancel handling', text: `AbortError from Escape/click-away restores idle state, no error UI.` },
      { title: 'Feature-detected fallback', text: `Manual hex input swaps in when window.EyeDropper is missing.` },
      { title: 'Shared render path', text: `applyColor() renders picks and manual entries identically.` },
      { title: 'Running palette', text: `Deduped, capped chip list of every picked color.` },
      { title: 'One-click copy', text: `Copies the current hex to the clipboard with confirmation.` },
    ],
    useCases: [
      { title: 'Design tool colour sampling', text: 'Sample any visible pixel on screen into a [gradient picker](/ui-snippets/gradient-picker/), using the real `EyeDropper` API called directly from the click handler.' },
      { title: 'Brand palette collection', text: 'Collect sampled colours beside a [colour swatch](/ui-snippets/color-swatch/) palette, with copy-to-clipboard available for each hex value in the running list.' },
      { title: 'Theme editor seeding', text: 'Grab a real colour from a mockup to seed a theme, with a manual hex fallback for browsers that lack the API.' },
      { title: 'Accessibility contrast checks', text: 'Sample foreground and background colours from any page to test contrast, with the API sampling beyond the browser window itself.' },
      { title: 'Illustration and design review', text: 'Match a stroke colour to something on screen, or report the exact hex of a rendered element, with Escape cleanly restoring the idle state.' },
      { icon: 'CODE', title: 'Related: Load More Button', desc: 'See the [Load More Button](/ui-snippets/load-more-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Which browsers support window.EyeDropper?', a: `It currently ships in Chromium-based browsers — Chrome, Edge, and Opera — from Chrome 95 onward. Firefox and Safari do not implement it as of this writing. The snippet feature-detects with typeof window.EyeDropper === 'function' and swaps in a manual hex input when it's missing, so the demo works everywhere either way.` },
      { q: 'Why does the pick have to start from a button click?', a: `The EyeDropper API requires a direct user gesture (a click, tap, or key press) to open, as a security measure against pages silently sampling the screen. That's why new EyeDropper().open() is called synchronously inside the button's own click listener rather than after any await or setTimeout, which would break the gesture chain and cause the browser to reject the call.` },
      { q: 'What happens if the user cancels the pick?', a: `Pressing Escape or clicking outside the eyedropper's active area rejects the open() promise with a DOMException named AbortError. The code checks err.name === 'AbortError' specifically and shows a neutral "cancelled" message rather than an error, since cancelling is a normal, expected user action, not a failure.` },
      { q: 'Can this sample colors outside the browser window?', a: `Yes — that's the defining feature of the EyeDropper API versus a regular color input. Once open() is called, the browser lets the user click anywhere visible on their screen, including other applications, the OS desktop, or another monitor, and returns the sRGB hex of whatever pixel was clicked.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Feature-detect window.EyeDropper once (e.g. in a memoized value or computed property), conditionally render either the pick button or the manual hex input based on it, and call new EyeDropper().open() inside the button's onClick handler exactly as here — keep it synchronous with the click so the user-gesture requirement is preserved. Store the resulting hex in component state and derive the RGB/swatch/palette from that single value.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why new EyeDropper().open() must be called synchronously from within a user-gesture event handler, and what would break if it were called after an await or inside a setTimeout instead. It's also useful for reasoning about the fallback: ask why the manual hex input and the real eyedropper both funnel into the same applyColor() function rather than having separate rendering logic for each path, and how that keeps the swatch, palette, and copy button behavior identical regardless of source. For extensions, ask it to add a "compare two colors" mode using two independent eyedropper picks, persist the palette to localStorage between sessions, or add an HSL readout alongside the existing hex/RGB values. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "EyeDropper color picker" tool in plain HTML, CSS, and JavaScript using the real browser window.EyeDropper API — no libraries.

Requirements:
- A "Pick a color" button that, on click, calls new EyeDropper().open() directly and synchronously inside the click handler (required because the API only works from a direct user gesture), and on success applies the returned sRGBHex value to a swatch element, a hex text readout, and an RGB text readout computed from the hex.
- Wrap the open() call in a try/catch. If the promise rejects with a DOMException named AbortError (the user pressed Escape or clicked away to cancel), show a neutral "cancelled" status message rather than an error. For any other rejection, show a status message naming the error and suggesting the manual fallback.
- CRITICAL: feature-detect support with typeof window.EyeDropper === 'function' before wiring up the button. If unsupported (which is the common case — this API currently only exists in Chromium-based browsers, not Firefox or Safari), hide the pick button entirely and show a manual hex color text input in its place, styled to match the rest of the UI. Route both the real eyedropper result and the manual input's value through the exact same "apply color" function so the swatch, RGB readout, and everything downstream behaves identically regardless of which path produced the color.
- Maintain a running palette: every applied color (whether picked or manually typed) gets added to a deduplicated list of clickable swatch chips capped at a reasonable size (e.g. 12), each of which re-applies that color when clicked, plus a "Clear" control to empty the palette.
- Add a "Copy" button next to the current hex value that copies it to the clipboard via navigator.clipboard.writeText with a brief "Copied!" confirmation state.`,
    },
  },
};

export default eyedropperColorPicker;
