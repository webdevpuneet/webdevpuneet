const localFontPicker = {
  id: 'local-font-picker',
  title: 'Local Font Access Picker',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<section class="lfp-wrap">
  <span class="lfp-tag">window.queryLocalFonts · local font access api</span>
  <h1>Font picker</h1>
  <p id="lfpStatus">Browse your installed fonts, or pick from a curated list of common system fonts.</p>

  <div class="lfp-card">
    <button class="lfp-btn primary" id="lfpBrowseBtn">Browse local fonts</button>

    <label class="lfp-label" for="lfpSearch">Search fonts</label>
    <input class="lfp-input" id="lfpSearch" type="text" placeholder="Type to filter…" />

    <select class="lfp-select" id="lfpSelect" size="6"></select>

    <div class="lfp-preview" id="lfpPreview">
      <span class="lfp-preview-name" id="lfpPreviewName">Georgia</span>
      <p id="lfpPreviewText">The quick brown fox jumps over the lazy dog — 0123456789</p>
    </div>
  </div>

  <p class="lfp-note">queryLocalFonts() is Chromium-only and needs an explicit permission grant — most browsers, and any sandboxed preview iframe, will show the curated system-font list below instead, in the exact same searchable dropdown and live-preview UI.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1a1408,#0a0805 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.lfp-wrap{width:100%;max-width:440px;text-align:center}
.lfp-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.lfp-wrap h1{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em}
.lfp-wrap p{font-size:13.5px;color:#c2ac81;margin-top:8px;line-height:1.6}
.lfp-card{margin-top:22px;border-radius:16px;border:1px solid rgba(251,191,36,.18);background:#141006;padding:20px;text-align:left}
.lfp-btn{width:100%;padding:11px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#f5ead1;font:600 13px system-ui;cursor:pointer;transition:background .15s}
.lfp-btn:hover{background:rgba(255,255,255,.09)}
.lfp-btn.primary{background:linear-gradient(135deg,#fbbf24,#f97316);border-color:transparent;color:#241601;font-weight:700}
.lfp-label{display:block;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#a68c5e;margin:16px 0 6px}
.lfp-input{width:100%;padding:9px 12px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#fff;font:13px system-ui;outline:none;transition:border-color .15s}
.lfp-input:focus{border-color:#fbbf24}
.lfp-select{width:100%;margin-top:10px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.03);color:#f0e2c2;font:13.5px system-ui;padding:4px}
.lfp-select option{padding:6px 8px}
.lfp-preview{margin-top:16px;padding:16px;border-radius:12px;background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.16)}
.lfp-preview-name{display:block;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#c99a3c;margin-bottom:8px}
.lfp-preview p{font-size:22px;line-height:1.4;color:#fff8ea}
.lfp-note{font-size:11.5px;color:#5a4b2b;max-width:400px;margin:16px auto 0;line-height:1.6}`,

  js: `var statusEl = document.getElementById("lfpStatus");
var browseBtn = document.getElementById("lfpBrowseBtn");
var searchInput = document.getElementById("lfpSearch");
var selectEl = document.getElementById("lfpSelect");
var previewName = document.getElementById("lfpPreviewName");
var previewText = document.getElementById("lfpPreviewText");

// --- Curated fallback list: common system font stacks that render
// consistently without needing any permission at all. This is what most
// visitors of this demo will actually browse.
var CURATED_FONTS = [
  { name: "Arial", stack: "Arial, Helvetica, sans-serif" },
  { name: "Helvetica", stack: "Helvetica, Arial, sans-serif" },
  { name: "Georgia", stack: "Georgia, 'Times New Roman', serif" },
  { name: "Times New Roman", stack: "'Times New Roman', Times, serif" },
  { name: "Courier New", stack: "'Courier New', Courier, monospace" },
  { name: "Verdana", stack: "Verdana, Geneva, sans-serif" },
  { name: "Trebuchet MS", stack: "'Trebuchet MS', sans-serif" },
  { name: "Garamond", stack: "Garamond, Baskerville, serif" },
  { name: "Segoe UI", stack: "'Segoe UI', Tahoma, sans-serif" },
  { name: "Tahoma", stack: "Tahoma, Geneva, sans-serif" },
  { name: "Palatino", stack: "Palatino, 'Palatino Linotype', serif" },
  { name: "Impact", stack: "Impact, 'Arial Narrow Bold', sans-serif" },
];

var allFonts = CURATED_FONTS.slice();
var usingRealApi = false;

function populateSelect(fonts) {
  selectEl.innerHTML = "";
  fonts.forEach(function (font) {
    var opt = document.createElement("option");
    opt.value = font.name;
    opt.textContent = font.name;
    opt.style.fontFamily = font.stack;
    selectEl.appendChild(opt);
  });
  if (fonts.length) selectEl.selectedIndex = 0;
}

function applyPreview(font) {
  if (!font) return;
  previewName.textContent = font.name;
  previewText.style.fontFamily = font.stack;
}

function findFont(name) {
  for (var i = 0; i < allFonts.length; i++) {
    if (allFonts[i].name === name) return allFonts[i];
  }
  return null;
}

selectEl.addEventListener("change", function () {
  applyPreview(findFont(selectEl.value));
});

searchInput.addEventListener("input", function () {
  var q = searchInput.value.trim().toLowerCase();
  var filtered = q ? allFonts.filter(function (f) { return f.name.toLowerCase().indexOf(q) !== -1; }) : allFonts;
  populateSelect(filtered);
  if (filtered.length) applyPreview(filtered[0]);
});

async function browseLocalFonts() {
  if (!("queryLocalFonts" in window)) {
    statusEl.textContent = "Local Font Access isn't supported in this browser — showing a curated list of common system fonts instead.";
    return;
  }

  try {
    statusEl.textContent = "Requesting local font access permission\\u2026";
    var localFonts = await window.queryLocalFonts();

    if (!localFonts || localFonts.length === 0) {
      statusEl.textContent = "No local fonts were returned — showing the curated list instead.";
      return;
    }

    // Deduplicate by family name, keep it sorted and reasonably sized.
    var seen = {};
    var mapped = [];
    localFonts.forEach(function (f) {
      var family = f.family;
      if (!seen[family]) {
        seen[family] = true;
        mapped.push({ name: family, stack: '"' + family + '"' });
      }
    });
    mapped.sort(function (a, b) { return a.name.localeCompare(b.name); });

    allFonts = mapped;
    usingRealApi = true;
    populateSelect(allFonts);
    applyPreview(allFonts[0]);
    statusEl.textContent = "Loaded " + allFonts.length + " real local fonts from your system via queryLocalFonts().";
    browseBtn.textContent = "Local fonts loaded";
    browseBtn.disabled = true;
  } catch (err) {
    // NotAllowedError (permission denied), or the call is disallowed inside
    // a sandboxed preview iframe (a permissions-policy block is common here).
    statusEl.textContent = "Couldn't access local fonts (" + (err && err.name ? err.name : "blocked") + ") — showing the curated list of common system fonts instead.";
  }
}

browseBtn.addEventListener("click", browseLocalFonts);

populateSelect(allFonts);
applyPreview(allFonts[2]); // start on Georgia to match the initial preview markup`,

  seo: {
    title: 'Local Font Access Picker — Free queryLocalFonts with Curated Fallback',
    description: `A searchable font picker with a live preview, using the real Local Font Access API's queryLocalFonts() where permitted, and a matching curated system-font list everywhere else. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Local Font Access Picker — Real System Fonts, or a Curated List in the Same UI',
      description: `The Local Font Access API's \`window.queryLocalFonts()\` lets a page enumerate every font actually installed on a user's device — design tools and creative software are the obvious use case. It's also one of the most tightly gated capabilities available to the web: Chromium-only, behind an explicit permission prompt, and disabled by default inside most embedded and sandboxed contexts. This snippet's design goal is that the picker UI — search box, list, live preview — looks and behaves identically whether it's listing your real fonts or a curated fallback.

**The real enumeration path**

\`browseLocalFonts()\` checks \`'queryLocalFonts' in window\` before calling it, wrapped in a \`try/catch\` since the call can reject with a \`NotAllowedError\` if the permission prompt is denied. On success, it deduplicates the returned \`FontData\` array by \`family\` name, sorts it alphabetically, and repopulates the same \`<select>\` and preview elements the curated list uses — there's no separate "real font" rendering path.

**A curated list that's a real feature, not an apology**

\`CURATED_FONTS\` is a hand-picked set of the common cross-platform system font stacks — Arial, Georgia, Times New Roman, Courier New, Verdana, and others — each paired with a proper CSS fallback stack (\`'Times New Roman', Times, serif\`) so they render sensibly even on a device that happens to lack the exact named font. This list populates the picker by default and stays fully searchable, filterable, and previewable, because for the overwhelming majority of visitors — anyone not on a permission-granted Chromium session — this curated list *is* the font picker, not a degraded stand-in for one.

**One rendering path, two data sources**

\`populateSelect()\` and \`applyPreview()\` don't know or care whether \`allFonts\` currently holds real \`queryLocalFonts()\` results or the curated defaults — both paths funnel through the identical functions, the same discipline used in this library's [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) snippet, where simulated and real audio data drive one shared drawing routine. That's what keeps the two modes visually indistinguishable.

**Live preview, either way**

Selecting any font — real or curated — immediately updates a sample sentence's \`font-family\`, giving instant visual feedback. Searching filters the currently active list (real or curated) by substring match against the font name. Pair this with a [dark mode toggle](/ui-snippets/dark-mode-toggle/) for a settings panel, or a [native popover API demo](/ui-snippets/native-popover-api-demo/) for the picker's dropdown behavior pattern.

**Customizing it**

Expand the curated list with more web-safe stacks, group fonts by category (serif/sans/mono), or add a "download from Google Fonts" fallback tier for names the curated list doesn't cover.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A searchable dropdown of curated system fonts renders with a live preview.` },
      { title: 'Click "Browse local fonts"', text: `On Chromium with permission granted, real installed fonts load instead.` },
      { title: 'Search the list', text: `Filters whichever font source is currently active.` },
      { title: 'Select a font', text: `The sample sentence's font-family updates immediately.` },
      { title: 'Deny or lack the permission', text: `The status explains it and the curated list stays fully usable.` },
      { title: 'Swap in your own sample text', text: `Edit the preview paragraph to test your own copy.` },
    ] },
    features: [
      { title: 'Real queryLocalFonts call', text: `Enumerates genuinely installed system fonts where permitted.` },
      { title: 'Deduplicated, sorted results', text: `Real font families are cleaned up before display.` },
      { title: 'Full-featured curated fallback', text: `A proper picker, not a degraded placeholder list.` },
      { title: 'Shared rendering functions', text: `One populateSelect/applyPreview pair for both data sources.` },
      { title: 'Live search filtering', text: `Filters whichever font list is currently active.` },
      { title: 'Instant live preview', text: `Sample text updates font-family on every selection.` },
      { title: 'Safe CSS fallback stacks', text: `Curated entries pair each font with sensible fallbacks.` },
      { title: 'Named permission outcomes', text: `States plainly why real fonts weren't loaded, if they weren't.` },
    ],
    useCases: [
      { title: 'Design and creative tools', text: `Let users pick from their real installed fonts.` },
      { title: 'Document editors', text: `A typography picker with instant live preview.` },
      { title: 'Website builder settings panels', text: `Pair with a [dark mode toggle](/ui-snippets/dark-mode-toggle/) settings group.` },
      { title: 'Presentation software', text: `Font selection with a working fallback for any browser.` },
      { title: 'Branding/style guide tools', text: `Preview brand fonts against curated system alternatives.` },
      { title: 'Accessibility font testers', text: `Compare readability across common system font stacks.` },
      { icon: 'CODE', title: 'Related: Segmented Toggle', desc: 'See the [Segmented Toggle](/ui-snippets/segmented-toggle/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does "Browse local fonts" just show me the same list as before?', a: `window.queryLocalFonts() is implemented only in Chromium-based browsers and requires an explicit permission grant through a browser prompt — if it's unsupported, denied, or blocked (which is the common case inside a sandboxed preview iframe like the one likely rendering this demo, since the local-fonts permission is rarely granted to embedded frames), the picker simply keeps showing its curated list of common system fonts, which is a fully functional picker in its own right.` },
      { q: "Is it safe for a website to see every font installed on my computer?", a: `Browsers treat this as a meaningful privacy-sensitive permission, since your exact set of installed fonts can be used as a device fingerprinting signal. That's why queryLocalFonts() requires an explicit one-time permission prompt the user must actively approve, unlike most other font-related browser APIs, and why it's disabled by default in many embedded and sandboxed contexts.` },
      { q: "What fonts are in the curated fallback list, and why those?", a: `The curated list includes common cross-platform system fonts like Arial, Georgia, Times New Roman, Courier New, Verdana, Segoe UI, and others that have shipped with Windows, macOS, or both for years, each paired with a proper CSS fallback stack. They were chosen because they're highly likely to render as intended regardless of the visitor's actual operating system, even without any font-detection capability at all.` },
      { q: "Does the search box work differently for real fonts versus the curated list?", a: `No — the search input filters whichever list is currently active (allFonts) by a case-insensitive substring match against each font's name, using the exact same filtering and re-rendering logic regardless of whether that list holds real queryLocalFonts() results or the curated defaults. There's no separate code path for either source.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Keep the current font list and selected font in component state, and call the same queryLocalFonts()-checking logic from your "Browse" button's click handler, updating state on success instead of touching the DOM directly. Drive both the dropdown options and the live preview's font-family style from that same state so the two data sources (real and curated) continue to render through one shared path.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the curated fallback font list is built to be a fully-featured, equally-weighted picker experience rather than a degraded placeholder — and why both the real queryLocalFonts() results and the curated defaults are funneled through the exact same populateSelect/applyPreview functions instead of separate rendering code paths. It's a good prompt for reasoning about privacy-sensitive browser APIs generally — ask why enumerating installed fonts is treated as a meaningful fingerprinting risk requiring an explicit permission prompt, unlike most other CSS or DOM capabilities. For extensions, ask it to add font categorization (serif/sans-serif/monospace/display) as filterable tabs, persist the last-selected font in localStorage, or add a font-weight and font-style selector alongside the family picker. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Local Font Access Picker" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A "Browse local fonts" button, a search input, a scrollable list/select of font names, and a live preview area showing sample text rendered in the currently selected font.
- Define a curated array of at least ten common cross-platform system font names (Arial, Georgia, Times New Roman, Courier New, Verdana, Segoe UI, Trebuchet MS, Tahoma, Palatino, Impact, etc.), each paired with a proper CSS font-family fallback stack, and populate the list and preview from this array by default so the picker is fully functional immediately on load with zero permissions needed.
- The Browse button should check 'queryLocalFonts' in window before calling it, then call window.queryLocalFonts() inside a try/catch. On success, deduplicate the returned font data by family name, sort alphabetically, and replace the active font list with the real results, re-rendering through the exact same list-population and preview functions the curated list uses (do not create a separate rendering path for real vs. curated fonts).
- CRITICAL: since queryLocalFonts() is Chromium-only, permission-gated, and commonly blocked entirely inside a sandboxed preview iframe (a likely scenario for wherever this demo renders), handle every failure case — API missing, permission denied, or any thrown error — by leaving the curated list active and showing a specific status message explaining why real fonts weren't loaded, without ever leaving the picker non-functional or empty.
- The search input should filter whichever font list is currently active (real or curated) by a case-insensitive substring match on the font name, and selecting any font in the list should immediately update the preview text's font-family to match.`,
    },
  },
};

export default localFontPicker;
