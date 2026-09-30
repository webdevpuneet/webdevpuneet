const fullscreenToggleButton = {
  id: 'fullscreen-toggle-button',
  title: 'Fullscreen API Toggle Button',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="fsb-wrap">
  <span class="fsb-tag">fullscreen api · requestfullscreen</span>
  <h1>Fullscreen toggle</h1>
  <p id="fsbStatus">Click the button to request fullscreen for the panel below.</p>

  <div class="fsb-panel" id="fsbPanel">
    <button class="fsb-btn" id="fsbToggle">
      <span id="fsbIcon">⤢</span>
      <span id="fsbLabel">Enter fullscreen</span>
    </button>
    <div class="fsb-content">
      <h2>Demo panel</h2>
      <p>This box becomes the fullscreen element when toggled. Press <kbd>Esc</kbd> to exit — the button updates automatically because it listens for the real <code>fullscreenchange</code> event, not just its own click.</p>
    </div>
  </div>

  <p class="fsb-note" id="fsbNote">If fullscreen is disallowed here (common inside a sandboxed preview iframe without <code>allow="fullscreen"</code>), a manual "simulated fullscreen" mode takes over instead.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0f1b2e,#050a12 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.fsb-wrap{width:100%;max-width:640px;text-align:center}
.fsb-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.fsb-wrap h1{font-size:clamp(28px,6vw,40px);font-weight:800;letter-spacing:-.03em}
.fsb-wrap>p{font-size:14px;color:#9fb4cc;margin-top:8px;line-height:1.6}
.fsb-panel{margin:24px 0 16px;border-radius:16px;border:1px solid rgba(125,211,252,.25);background:#0a121e;padding:22px;position:relative}
.fsb-panel:fullscreen,.fsb-panel:-webkit-full-screen{display:flex;flex-direction:column;align-items:center;justify-content:center;background:#050a12;border-radius:0}
.fsb-panel.fsb-simulated{background:#0d1626;border-color:#38bdf8}
.fsb-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:10px;border:1px solid transparent;background:linear-gradient(135deg,#38bdf8,#818cf8);color:#04121f;font:700 13px system-ui;cursor:pointer;margin-bottom:16px}
.fsb-btn:hover{filter:brightness(1.08)}
.fsb-content h2{font-size:20px;margin-bottom:8px}
.fsb-content p{font-size:13.5px;color:#9fb4cc;line-height:1.7;max-width:440px}
.fsb-content kbd{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:5px;padding:1px 6px;font-size:12px}
.fsb-note{font-size:11.5px;color:#6b7f97;max-width:520px;margin:0 auto;line-height:1.6}`,

  js: `var panel = document.getElementById('fsbPanel');
var toggleBtn = document.getElementById('fsbToggle');
var icon = document.getElementById('fsbIcon');
var label = document.getElementById('fsbLabel');
var statusEl = document.getElementById('fsbStatus');
var noteEl = document.getElementById('fsbNote');

// Vendor-prefixed Fullscreen API surface. Most evergreen browsers support the
// unprefixed API today, but Safari still ships webkit-prefixed variants in
// some contexts, so we resolve whichever methods/properties actually exist.
function fsRequest(el) {
  var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
  return fn ? fn.call(el) : Promise.reject(new Error('no requestFullscreen'));
}
function fsExit() {
  var fn = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
  return fn ? fn.call(document) : Promise.reject(new Error('no exitFullscreen'));
}
function fsElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
}
function fsEnabled() {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || false;
}

var simulated = false; // manual fallback mode when the real API is blocked/unsupported

function setUiForFullscreen(isFs) {
  if (isFs) {
    icon.textContent = '⤡';
    label.textContent = 'Exit fullscreen';
    statusEl.textContent = simulated
      ? 'Simulated fullscreen — the panel is enlarged in-page since the real API is unavailable here.'
      : 'Fullscreen active — press Esc or click the button to exit.';
  } else {
    icon.textContent = '⤢';
    label.textContent = 'Enter fullscreen';
    statusEl.textContent = 'Click the button to request fullscreen for the panel below.';
  }
}

// The single source of truth for the button's state is the *real*
// fullscreenchange event, not the click handler's own assumption — because
// the user can also exit fullscreen via Esc, browser chrome, or the OS,
// none of which fire a click on our button.
function onFullscreenChange() {
  var active = fsElement() === panel;
  setUiForFullscreen(active);
}
document.addEventListener('fullscreenchange', onFullscreenChange);
document.addEventListener('webkitfullscreenchange', onFullscreenChange);
document.addEventListener('msfullscreenchange', onFullscreenChange);

function enterSimulated() {
  simulated = true;
  panel.classList.add('fsb-simulated');
  setUiForFullscreen(true);
  noteEl.textContent = 'Real Fullscreen API unavailable or blocked (likely a sandboxed iframe without allow="fullscreen") — using a simulated in-page fullscreen instead.';
}
function exitSimulated() {
  simulated = false;
  panel.classList.remove('fsb-simulated');
  setUiForFullscreen(false);
}

toggleBtn.addEventListener('click', function () {
  if (simulated) { exitSimulated(); return; }

  if (fsElement() === panel) {
    fsExit().catch(function () { exitSimulated(); });
    return;
  }

  if (!fsEnabled()) {
    // fullscreenEnabled is false when the browser/context disallows it
    // outright (e.g. iframe missing the fullscreen permission).
    enterSimulated();
    return;
  }

  fsRequest(panel).catch(function (err) {
    // NotAllowedError / SecurityError etc — commonly thrown inside a
    // sandboxed preview iframe lacking allow="fullscreen". Fail into the
    // simulated mode rather than leaving the button inert.
    enterSimulated();
  });
});`,

  seo: {
    title: 'Fullscreen API Toggle Button — Free requestFullscreen Demo',
    description: `A button that toggles a panel in and out of real browser fullscreen using requestFullscreen/exitFullscreen, synced to the true fullscreenchange event, with a simulated fallback when fullscreen is blocked. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Fullscreen API Toggle Button — State Driven by the Real Event, Not the Click',
      description: `This snippet wraps the browser's real Fullscreen API — \`element.requestFullscreen()\` and \`document.exitFullscreen()\` — in a single toggle button, and gets the one detail most homemade fullscreen buttons miss: the button's icon and label are driven entirely by the \`fullscreenchange\` event, never by the click handler's own assumption of what just happened.

**Why the click handler can't be the source of truth**

A user can leave fullscreen in ways that never touch your button at all — pressing \`Esc\`, using browser chrome, or switching apps on some platforms. If a toggle button only flips its own local "am I fullscreen" flag inside the click handler, it goes stale the instant the user exits with \`Esc\`. This snippet instead listens for the real \`fullscreenchange\` event (plus its \`webkitfullscreenchange\`/\`msfullscreenchange\` cousins) and checks \`document.fullscreenElement\` directly every time it fires, so the icon and label are always correct regardless of how fullscreen was entered or exited.

**Vendor-prefix handling, kept minimal**

Evergreen Chrome, Firefox, and Edge support the unprefixed \`requestFullscreen\`/\`exitFullscreen\`/\`fullscreenElement\`/\`fullscreenEnabled\` surface, but Safari has historically shipped \`webkit\`-prefixed variants in some versions. Small resolver functions (\`fsRequest\`, \`fsExit\`, \`fsElement\`, \`fsEnabled\`) pick whichever method actually exists on the element or document, so the rest of the code never has to branch on browser.

**The blocked case: sandboxed iframes**

Fullscreen is a permission-gated feature. Inside a sandboxed preview \`<iframe>\` without \`allow="fullscreen"\` in its attributes, \`document.fullscreenEnabled\` reports \`false\` outright, or a call to \`requestFullscreen()\` rejects with \`NotAllowedError\`/\`SecurityError\`. Both paths are caught and routed into a **simulated fullscreen** mode: the panel gets a CSS class that visually enlarges and highlights it in place, the button still toggles correctly, and a note explains plainly why the real API isn't in use. The demo never sits inert.

**One toggle button, two real states**

Clicking the button when nothing is fullscreen tries the real API first; only on failure does it fall back to the simulated class. Clicking again while simulated simply removes that class — no dead ends, no silent no-ops. Pair this with a [screen wake lock toggle](/ui-snippets/screen-wake-lock-toggle/) for a media-player control cluster, or a [network information badge](/ui-snippets/network-information-badge/) for a broader "browser capability" dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A panel with a fullscreen toggle button renders.` },
      { title: 'Click "Enter fullscreen"', text: `The panel requests real browser fullscreen.` },
      { title: 'Press Esc', text: `The button label updates via the real fullscreenchange event.` },
      { title: 'Try it in a restricted context', text: `Blocked fullscreen falls back to a simulated in-page mode.` },
      { title: 'Click to exit', text: `Works identically whether real or simulated.` },
      { title: 'Style the fullscreen state', text: `Target :fullscreen for layout changes when active.` },
    ] },
    features: [
      { title: 'Real requestFullscreen/exitFullscreen', text: `Uses the actual browser Fullscreen API.` },
      { title: 'Event-driven state', text: `fullscreenchange listener, not click-local assumptions.` },
      { title: 'Vendor-prefix resolvers', text: `Covers webkit/ms variants briefly.` },
      { title: 'fullscreenEnabled check', text: `Detects outright disallowed contexts upfront.` },
      { title: 'Try/catch on request', text: `Catches NotAllowedError/SecurityError gracefully.` },
      { title: 'Simulated fallback mode', text: `A CSS-only enlarged panel when real API is blocked.` },
      { title: 'Clear status messaging', text: `Explains which mode is active and why.` },
      { title: 'Esc-safe', text: `Correctly reflects exits triggered outside the button.` },
    ],
    useCases: [
      { title: 'Video/media players', text: `Pair with a [screen wake lock toggle](/ui-snippets/screen-wake-lock-toggle/).` },
      { title: 'Image/photo viewers', text: `Enlarge a single image or gallery view.` },
      { title: 'Dashboards', text: `Fullscreen a chart or [uptime status page](/ui-snippets/uptime-status-page/).` },
      { title: 'Presentations', text: `Kiosk-style slide or demo panels.` },
      { title: 'Code playgrounds', text: `Distraction-free fullscreen editing panes.` },
      { title: 'Embedded widgets', text: `Safe to ship inside sandboxed iframes.` },
      { icon: 'CODE', title: 'Related: Neumorphic Button', desc: 'See the [Neumorphic Button](/ui-snippets/neumorphic-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the button update even when I press Esc instead of clicking it?', a: `Because the icon and label are driven by the real fullscreenchange event listener, which checks document.fullscreenElement every time it fires — not by a local flag the click handler sets. Esc, browser chrome, and OS-level exits all fire this event just like a programmatic exitFullscreen() call, so the UI stays accurate no matter how fullscreen ends.` },
      { q: 'What happens if fullscreen is blocked, like inside a sandboxed iframe?', a: `The snippet checks document.fullscreenEnabled before requesting, and also wraps the request call in a catch for NotAllowedError or SecurityError. Either path routes into a simulated fullscreen mode that visually enlarges the panel with CSS instead, with a status note explaining that the real API is unavailable — the button keeps working either way.` },
      { q: 'Do I need vendor prefixes for Safari?', a: `Some Safari versions historically required webkitRequestFullscreen/webkitExitFullscreen and webkitFullscreenElement. This snippet resolves whichever variant exists at runtime via small helper functions, so it works across the unprefixed and webkit-prefixed API without separate code paths elsewhere.` },
      { q: 'Can I make a different element fullscreen instead of this panel?', a: `Yes — requestFullscreen() is called on whatever element reference you pass to fsRequest(). Point it at any container (a video element, a chart div, a whole app shell) and update the fullscreenchange check to compare against that same element.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep a ref to the target element, call the same requestFullscreen/exitFullscreen resolvers on it from an event handler, and register the fullscreenchange listener in a mount effect, removing it on unmount. Store the active/simulated state in component state and drive the icon/label from that, exactly as the vanilla version does from the DOM.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the button's displayed state comes from the fullscreenchange event listener rather than from the click handler that requested fullscreen in the first place — and what breaks if you skip that and just toggle a local boolean instead. It's also useful for reasoning about the fallback: ask why document.fullscreenEnabled is checked before ever calling requestFullscreen(), and why the request is additionally wrapped in a catch even after that check passes. For extensions, ask it to add fullscreen support for a video element with custom controls, or to persist the user's last fullscreen preference across page loads. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "fullscreen toggle button" in plain HTML, CSS, and JavaScript using the real browser Fullscreen API — no libraries.

Requirements:
- A panel element and a button that calls panelElement.requestFullscreen() to enter fullscreen and document.exitFullscreen() to exit, resolving vendor-prefixed variants (webkitRequestFullscreen, webkitExitFullscreen, webkitFullscreenElement, document.webkitFullscreenEnabled) as a fallback for older Safari.
- CRITICAL: the button's icon/label state must be driven by listening for the real fullscreenchange (and webkitfullscreenchange) event and checking document.fullscreenElement === panelElement inside that handler — not by a boolean the click handler sets itself — because the user can exit fullscreen via Esc or browser chrome without ever clicking the button again.
- Before requesting fullscreen, check document.fullscreenEnabled and treat a false value as "fullscreen is disallowed in this context" (e.g. a sandboxed iframe missing allow="fullscreen"). Also wrap the requestFullscreen() call itself in a .catch/try-catch for NotAllowedError/SecurityError rejections.
- CRITICAL fallback: when fullscreen is disallowed or the request is rejected, fall back to a "simulated fullscreen" mode that toggles a CSS class enlarging/highlighting the panel in place, with clear status text explaining that the real Fullscreen API is unavailable here and a simulated mode is active instead. The toggle button must keep working identically in this mode.
- The status text should always plainly state which mode is currently active (idle, real fullscreen, or simulated) so the demo is never ambiguous or looks broken.`,
    },
  },
};

export default fullscreenToggleButton;
