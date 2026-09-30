const resizeObserverCard = {
  id: 'resize-observer-card',
  title: 'ResizeObserver Live Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<section class="roc-wrap">
  <span class="roc-tag">resizeobserver api · live content-box tracking</span>
  <h1>Drag the corner</h1>
  <p>Resize this card by its bottom-right handle, or programmatically — the dimensions below update via a real <code>ResizeObserver</code>, not a one-time measurement.</p>

  <div class="roc-card" id="rocCard">
    <div class="roc-readout">
      <div><span id="rocWidth">0</span><small>content width (px)</small></div>
      <div><span id="rocHeight">0</span><small>content height (px)</small></div>
    </div>
    <div class="roc-meta">
      <span id="rocEvents">0 resize events observed</span>
    </div>
    <div class="roc-handle" id="rocHandle"></div>
  </div>

  <div class="roc-actions">
    <button class="roc-btn" id="rocGrow">Grow via JS</button>
    <button class="roc-btn" id="rocShrink">Shrink via JS</button>
    <button class="roc-btn ghost" id="rocResetSize">Reset size</button>
  </div>
  <p class="roc-note">Unlike a one-time <code>getBoundingClientRect()</code> read, ResizeObserver keeps reporting new dimensions no matter what causes the size change — CSS, JS, drag, or a parent container reflowing.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1a1420,#08060c 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.roc-wrap{width:100%;max-width:560px;text-align:center}
.roc-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fca5f1;background:rgba(252,165,241,.1);border:1px solid rgba(252,165,241,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.roc-wrap h1{font-size:clamp(26px,5.5vw,36px);font-weight:800;letter-spacing:-.03em}
.roc-wrap>p{font-size:13.5px;color:#c3a9c1;margin-top:8px;line-height:1.6}
.roc-card{position:relative;margin:24px auto 8px;width:340px;height:200px;min-width:180px;min-height:120px;max-width:100%;resize:both;overflow:auto;border-radius:16px;background:linear-gradient(160deg,#2a1a34,#120c18);border:1px solid rgba(252,165,241,.3);padding:22px;text-align:left}
.roc-readout{display:flex;gap:22px;margin-bottom:14px}
.roc-readout span{display:block;font-size:30px;font-weight:800;color:#fca5f1;line-height:1}
.roc-readout small{font-size:10.5px;color:#8f7590;text-transform:uppercase;letter-spacing:.05em}
.roc-meta{font-size:11.5px;color:#8f7590}
.roc-handle{position:absolute;bottom:6px;right:6px;width:12px;height:12px;border-right:2px solid rgba(252,165,241,.5);border-bottom:2px solid rgba(252,165,241,.5);pointer-events:none}
.roc-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:18px 0 14px}
.roc-btn{padding:11px 18px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#f2e6f1;font:600 12.5px system-ui;cursor:pointer}
.roc-btn:hover{background:rgba(255,255,255,.11)}
.roc-btn.ghost{color:#c3a9c1}
.roc-note{font-size:11.5px;color:#7a6579;max-width:480px;margin:0 auto;line-height:1.6}`,

  js: `var card = document.getElementById('rocCard');
var widthEl = document.getElementById('rocWidth');
var heightEl = document.getElementById('rocHeight');
var eventsEl = document.getElementById('rocEvents');
var growBtn = document.getElementById('rocGrow');
var shrinkBtn = document.getElementById('rocShrink');
var resetBtn = document.getElementById('rocResetSize');

var eventCount = 0;
var DEFAULT_W = 340, DEFAULT_H = 200;

function readOnce() {
  // What most code reaches for by default: a single, point-in-time read.
  // It's accurate the instant it runs, but it never updates again on its
  // own — you'd have to manually re-call this after every possible cause
  // of a size change, and you'd have to know about every one of those
  // causes in advance.
  var rect = card.getBoundingClientRect();
  widthEl.textContent = Math.round(rect.width);
  heightEl.textContent = Math.round(rect.height);
}

if ('ResizeObserver' in window) {
  var ro = new ResizeObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      // contentBoxSize/contentRect reflect the CONTENT box (padding and
      // border excluded), and this callback fires for every resize cause:
      // the user dragging the CSS resize handle, a class toggle changing
      // padding, a JS-driven width/height change, a parent flex/grid
      // reflow, even a font-loading-triggered text reflow that changes
      // the card's natural size. No polling, no manual re-measurement.
      var box = entry.contentBoxSize
        ? (Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize)
        : null;
      var w = box ? box.inlineSize : entry.contentRect.width;
      var h = box ? box.blockSize : entry.contentRect.height;

      widthEl.textContent = Math.round(w);
      heightEl.textContent = Math.round(h);
      eventCount += 1;
      eventsEl.textContent = eventCount + ' resize event' + (eventCount === 1 ? '' : 's') + ' observed';
    }
  });
  ro.observe(card);
} else {
  // ResizeObserver has near-universal support in evergreen browsers, but
  // for the rare unsupported context we fall back to re-measuring on the
  // window resize event plus after each button click — a manual mode that
  // still keeps the numbers correct for the interactions this demo offers,
  // even though it won't catch every possible resize cause (e.g. a drag
  // handle resize alone, without a window resize, could go unnoticed).
  eventsEl.textContent = 'ResizeObserver unsupported — falling back to manual re-measurement on window resize and button clicks only.';
  readOnce();
  window.addEventListener('resize', readOnce);
}

growBtn.addEventListener('click', function () {
  var rect = card.getBoundingClientRect();
  card.style.width = Math.min(rect.width + 40, 560) + 'px';
  card.style.height = Math.min(rect.height + 24, 400) + 'px';
  if (!('ResizeObserver' in window)) readOnce();
});
shrinkBtn.addEventListener('click', function () {
  var rect = card.getBoundingClientRect();
  card.style.width = Math.max(rect.width - 40, 180) + 'px';
  card.style.height = Math.max(rect.height - 24, 120) + 'px';
  if (!('ResizeObserver' in window)) readOnce();
});
resetBtn.addEventListener('click', function () {
  card.style.width = DEFAULT_W + 'px';
  card.style.height = DEFAULT_H + 'px';
  if (!('ResizeObserver' in window)) readOnce();
});`,

  seo: {
    title: 'ResizeObserver Live Card — Free Real-Time Size Tracking Demo',
    description: `A draggable-resize card that reports its own live content-box dimensions using the real ResizeObserver API, reacting to every resize cause — CSS, JS, drag, or reflow. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ResizeObserver Live Card — Dimensions That Stay Correct, Automatically',
      description: `This card reports its own width and height using a real \`ResizeObserver\`, and stays correct no matter what makes it change size — dragging its CSS \`resize: both\` handle, clicking the JS buttons that set \`style.width\`/\`style.height\` directly, or a parent layout reflowing around it. That "any cause" guarantee is the entire reason \`ResizeObserver\` exists.

**The one-time-read trap**

\`element.getBoundingClientRect()\` is accurate the instant it runs, but it's a snapshot — it never updates itself. Code that relies on it has to know, in advance, every possible reason the element might resize (a CSS class change, a user drag, a sibling's height changing in a flex row, a web font finishing its load and reflowing text) and manually re-call \`getBoundingClientRect()\` after each one. Miss a cause, and the reported size silently goes stale.

**What ResizeObserver actually watches**

\`new ResizeObserver(callback)\` and \`observer.observe(element)\` sets up a genuine, ongoing watch: the callback fires with fresh measurements every time the observed element's box actually changes size, regardless of cause. This card reads \`entry.contentBoxSize\` (falling back to \`entry.contentRect\` for older Chromium releases that only supported it) to report the **content box** specifically — dimensions with padding and border excluded, which is usually what "how much room is inside this element" actually means.

**Every resize source, one code path**

The demo wires up three different ways to resize the card — the native CSS resize handle (drag), two buttons that set inline styles (JS), and a reset button — and every single one flows through the *same* \`ResizeObserver\` callback with no special-casing. The running event counter climbing regardless of which method triggered it is the point: the observer doesn't care how the size changed, only that it did.

**The rare fallback**

\`ResizeObserver\` has shipped in every major evergreen browser for years, so an unsupported context is genuinely rare — but this snippet still feature-detects \`'ResizeObserver' in window\` and falls back to a manual re-measurement on \`window resize\` and on each button click, with a clear note that this fallback can't catch every resize cause (a lone drag-handle resize, for instance, wouldn't be caught without also resizing the window). Pair this with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for layout-aware entrance animation, or a [network information badge](/ui-snippets/network-information-badge/) for another live-capability readout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A resizable card with a live dimension readout renders.` },
      { title: 'Drag the bottom-right corner', text: `Width/height update live via ResizeObserver.` },
      { title: 'Click "Grow via JS"', text: `A programmatic style change is observed too.` },
      { title: 'Watch the event counter', text: `Increments for every resize cause, not just drag.` },
      { title: 'Reset the size', text: `Confirms the observer keeps firing on repeated changes.` },
      { title: 'Read contentBoxSize', text: `Understand content-box vs border-box measurement.` },
    ] },
    features: [
      { title: 'Real ResizeObserver wiring', text: `observe() drives every dimension update.` },
      { title: 'Content-box precision', text: `Reads contentBoxSize, excluding padding/border.` },
      { title: 'Any-cause detection', text: `Drag, CSS, JS, and reflow all trigger the same callback.` },
      { title: 'Live event counter', text: `Proves the observer keeps firing, not just once.` },
      { title: 'Native drag-resize handle', text: `CSS resize: both needs no JS to work.` },
      { title: 'contentRect fallback', text: `Supports older Chromium's non-array shape.` },
      { title: 'Unsupported-browser fallback', text: `Manual re-measurement on window resize.` },
      { title: 'Zero dependencies', text: `Plain DOM APIs only.` },
    ],
    useCases: [
      { title: 'Responsive card layouts', text: `Switch internal layout past a pixel threshold.` },
      { title: 'Chart/canvas containers', text: `Redraw canvas content on container resize.` },
      { title: 'Sidebar/panel resizing', text: `Track live width of a draggable-width panel.` },
      { title: 'Text-truncation logic', text: `Recompute line clamps as available width changes.` },
      { title: 'Editor components', text: `Resize a code editor's internal canvas/grid.` },
      { title: 'Debug/dev tools', text: `Pair with [network information badge](/ui-snippets/network-information-badge/) in a capability panel.` },
    ],
    faqs: [
      { q: 'How is ResizeObserver different from a getBoundingClientRect() call?', a: `getBoundingClientRect() returns the element's size at the exact moment you call it and never updates again on its own — you'd have to manually re-call it after every possible resize cause. ResizeObserver instead sets up an ongoing subscription: its callback fires automatically every time the observed element's box actually changes, regardless of what caused it, so you never have to enumerate resize causes yourself.` },
      { q: 'What does entry.contentBoxSize actually measure?', a: `It reports the content box — the element's inner content area with padding, border, and scrollbar excluded — which is usually the most useful number for layout decisions like "how much room do I have to lay out my content." Some older Chromium versions only exposed entry.contentRect instead of the array-based contentBoxSize, so this snippet checks for both.` },
      { q: 'Does ResizeObserver fire for CSS-only size changes with no JS involved?', a: `Yes. It observes the box itself, not any particular API that changed it, so a CSS class toggle that changes padding, a media query that changes layout, a parent flex/grid container reflowing, or even a web font finishing its load and changing text height, will all trigger the callback exactly like a JS-driven style change would.` },
      { q: 'Is ResizeObserver widely supported?', a: `Yes — it has shipped in every major evergreen browser (Chrome, Firefox, Safari, Edge) for several years and has near-universal support today. This snippet still feature-detects it and falls back to a manual re-measurement on window resize and button clicks for the rare unsupported context, while noting that fallback can't catch every possible resize cause.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Create the ResizeObserver instance in a mount effect, call observe() on a DOM ref, and update component state from inside the callback (throttling with requestAnimationFrame if you're driving expensive layout work from it). Disconnect the observer in the cleanup function on unmount to avoid a memory leak.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why ResizeObserver is preferred over a manual getBoundingClientRect() re-measurement strategy, specifically walking through which resize causes a naive window-resize-only listener would miss (like a CSS-only padding change or a sibling reflowing a flex container) that ResizeObserver still catches. It's also useful for reasoning about contentBoxSize versus contentRect — ask why the array check exists and what it's compensating for across browser versions. For extensions, ask it to add a second observed element to demonstrate the callback receiving multiple entries in one batch, or to throttle the callback with requestAnimationFrame for a case where it drives expensive canvas redraws. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "ResizeObserver live card" in plain HTML, CSS, and JavaScript using the real browser ResizeObserver API — no libraries.

Requirements:
- A card element with CSS resize: both (and overflow: auto, since resize requires it) so the user can drag its bottom-right corner to resize it, plus two buttons that programmatically change the card's inline width/height styles (grow/shrink) and a reset button.
- Use new ResizeObserver(callback) and observer.observe(cardElement) to read the card's live content-box dimensions inside the callback — read entry.contentBoxSize (handling both the array and non-array shape across browser versions) falling back to entry.contentRect.width/height for older engines — and display the rounded width/height in the UI, updating on every callback firing.
- A running counter of how many times the ResizeObserver callback has fired, so the demo visibly proves the observer reacts to ALL of the resize causes offered (drag handle, both JS buttons, and reset), not just one of them, without any manual re-measurement calls scattered through the button handlers.
- CRITICAL fallback: feature-detect 'ResizeObserver' in window. If unsupported, fall back to reading getBoundingClientRect() once on load, again on the window resize event, and again after each button click, with a clearly labeled note explaining this is a manual fallback that can't detect every possible resize cause (e.g. a drag-handle-only resize with no window resize).
- Include a brief code comment or on-page note contrasting ResizeObserver's "fires for any cause" behavior against a one-time getBoundingClientRect() read.`,
    },
  },
};

export default resizeObserverCard;
