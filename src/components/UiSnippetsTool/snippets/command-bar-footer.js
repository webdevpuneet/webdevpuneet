const commandBarFooter = {
  id: 'command-bar-footer',
  title: 'Command Bar Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<div class="cbf-app" id="cbfApp">
  <main class="cbf-content"><p>↑ App content sits above this status-bar-style footer</p></main>

  <footer class="cbf">
    <div class="cbf-left">
      <span class="cbf-status"><span class="cbf-dot"></span>Connected</span>
      <span class="cbf-sync" id="cbfSync">Synced just now</span>
    </div>
    <button class="cbf-cmd" id="cbfCmdBtn" type="button">
      <span>Search or run a command</span>
      <kbd id="cbfKbd">⌘K</kbd>
    </button>
    <div class="cbf-right">
      <span class="cbf-version">v2.4.1</span>
      <button class="cbf-theme" id="cbfTheme" type="button" aria-label="Toggle theme">
        <svg class="cbf-sun" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="cbf-moon" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>
      </button>
    </div>
  </footer>

  <div class="cbf-overlay" id="cbfOverlay">
    <div class="cbf-palette" role="dialog" aria-modal="true" aria-label="Command palette">
      <div class="cbf-palette-input"><span>›</span><input type="text" placeholder="Type a command…"></div>
      <div class="cbf-palette-list" id="cbfPaletteList">
        <button type="button">📄 Go to dashboard</button>
        <button type="button">🔍 Search issues</button>
        <button type="button">⚙️ Open settings</button>
        <button type="button">🚀 Deploy latest build</button>
      </div>
      <div class="cbf-palette-hint">Press <kbd>Esc</kbd> to close</div>
    </div>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif}

.cbf-app{min-height:100vh;display:flex;flex-direction:column;background:#0b0f1a;color:#e2e8f0;transition:background .2s,color .2s}
.cbf-app[data-theme="light"]{background:#f8fafc;color:#0f172a}
.cbf-content{flex:1;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:13px;padding:40px}

.cbf{display:flex;align-items:center;gap:16px;padding:9px 16px;border-top:1px solid rgba(148,163,184,0.15);background:rgba(15,23,42,0.6)}
.cbf-app[data-theme="light"] .cbf{background:rgba(255,255,255,0.7);border-color:rgba(15,23,42,0.08)}

.cbf-left{display:flex;align-items:center;gap:14px;flex-shrink:0}
.cbf-status{display:flex;align-items:center;gap:6px;font-size:12px;color:#4ade80;font-weight:600}
.cbf-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 2px rgba(74,222,128,0.25)}
.cbf-sync{font-size:12px;color:#64748b}

.cbf-cmd{flex:1;max-width:360px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:10px;background:rgba(148,163,184,0.08);border:1px solid rgba(148,163,184,0.15);color:#94a3b8;font-size:12.5px;padding:6px 8px 6px 12px;border-radius:7px;cursor:pointer;transition:border-color .15s,background .15s}
.cbf-cmd:hover{border-color:rgba(148,163,184,0.3);background:rgba(148,163,184,0.12)}
.cbf-cmd kbd{background:rgba(148,163,184,0.15);border:1px solid rgba(148,163,184,0.2);border-radius:5px;padding:2px 6px;font-size:10.5px;font-family:inherit;color:#cbd5e1}

.cbf-right{display:flex;align-items:center;gap:12px;flex-shrink:0}
.cbf-version{font-size:11.5px;color:#475569;font-family:ui-monospace,monospace}
.cbf-theme{width:26px;height:26px;border-radius:7px;border:none;background:rgba(148,163,184,0.1);color:#94a3b8;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s}
.cbf-theme:hover{background:rgba(148,163,184,0.2)}
.cbf-moon{display:none}
.cbf-app[data-theme="light"] .cbf-sun{display:none}
.cbf-app[data-theme="light"] .cbf-moon{display:block}

.cbf-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:flex-start;justify-content:center;padding-top:14vh;opacity:0;pointer-events:none;transition:opacity .15s;z-index:50}
.cbf-overlay.open{opacity:1;pointer-events:all}

.cbf-palette{width:100%;max-width:440px;background:#131826;border:1px solid rgba(148,163,184,0.15);border-radius:12px;box-shadow:0 30px 70px rgba(0,0,0,0.5);transform:translateY(-8px);transition:transform .15s}
.cbf-overlay.open .cbf-palette{transform:translateY(0)}
.cbf-palette-input{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(148,163,184,0.12)}
.cbf-palette-input span{color:#6366f1;font-weight:700}
.cbf-palette-input input{flex:1;background:none;border:none;outline:none;color:#f1f5f9;font-size:14px}
.cbf-palette-list{display:flex;flex-direction:column;padding:6px}
.cbf-palette-list button{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:none;color:#cbd5e1;font-size:13.5px;padding:9px 10px;border-radius:7px;cursor:pointer}
.cbf-palette-list button:hover{background:rgba(99,102,241,0.14);color:#fff}
.cbf-palette-hint{padding:10px 16px;border-top:1px solid rgba(148,163,184,0.12);font-size:11px;color:#64748b}
.cbf-palette-hint kbd{background:rgba(148,163,184,0.15);border-radius:4px;padding:1px 5px;font-family:inherit}

@media (max-width:640px){
  .cbf-cmd span{display:none}
  .cbf-left{gap:8px}
}`,
  js: `var app  = document.getElementById('cbfApp');
var btn  = document.getElementById('cbfCmdBtn');
var overlay = document.getElementById('cbfOverlay');
var themeBtn = document.getElementById('cbfTheme');
var syncEl = document.getElementById('cbfSync');
var kbdEl = document.getElementById('cbfKbd');
var paletteList = document.getElementById('cbfPaletteList');

// Show the platform-correct shortcut hint.
var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
kbdEl.textContent = isMac ? '⌘K' : 'Ctrl K';

function openPalette() {
  overlay.classList.add('open');
  overlay.querySelector('input').focus();
}
function closePalette() {
  overlay.classList.remove('open');
}

btn.addEventListener('click', openPalette);
overlay.addEventListener('click', function (e) { if (e.target === overlay) closePalette(); });
paletteList.addEventListener('click', function (e) {
  if (e.target.closest('button')) closePalette();
});
document.addEventListener('keydown', function (e) {
  var mod = isMac ? e.metaKey : e.ctrlKey;
  if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
  if (e.key === 'Escape') closePalette();
});

themeBtn.addEventListener('click', function () {
  var next = app.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  app.setAttribute('data-theme', next);
});

// Live "synced Xs/Xm ago" readout.
var lastSync = Date.now();
setInterval(function () {
  var s = Math.floor((Date.now() - lastSync) / 1000);
  syncEl.textContent = s < 5 ? 'Synced just now' : s < 60 ? 'Synced ' + s + 's ago' : 'Synced ' + Math.floor(s / 60) + 'm ago';
}, 1000);`,
  seo: {
    title: 'Command Bar Footer — Free HTML CSS JS App Status Bar & Command Palette',
    description: 'A slim app-shell footer with a live connection status, a real ⌘K command palette trigger, a light/dark toggle, and a live-updating sync timestamp. No dependency.',
    about: {
      title: 'Command Bar Footer — A Status Bar for Web Apps, Not a Marketing Footer',
      description: `Marketing footers close a page. This one is built for the opposite context — the persistent status strip at the bottom of a logged-in web app, where the job isn't navigation but continuous reassurance: are we connected, when did we last sync, and how do I get anywhere fast. It's modelled on the bar you'd find in an IDE, a project management tool, or a dashboard shell rather than a landing page.

**A real keyboard shortcut, not just a visual hint**

The \`⌘K\` badge isn't decorative — a \`document\`-level \`keydown\` listener checks for \`(isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k'\`, calls \`preventDefault()\` to stop the browser's own shortcuts from firing, and opens the same palette the button click does. The platform check matters: \`navigator.platform\` (or a user-agent fallback) decides whether the badge reads "⌘K" or "Ctrl K" and which modifier key the listener actually checks, so Windows and Linux users see and get the shortcut they'd actually press rather than a Mac-only hint that silently does nothing for them.

**One attribute drives the whole theme**

Clicking the sun/moon button flips \`data-theme\` between \`"light"\` and \`"dark"\` on the app's root wrapper. Every themed rule in the CSS is scoped under \`.cbf-app[data-theme="light"]\`, so background, text colour, and the footer's own tint all update from that single attribute — the same one-attribute-drives-everything approach as the site's dedicated [Colour Mode Toggle](/ui-snippets/color-mode-toggle/), just applied to an app shell instead of a marketing page. The sun and moon icons swap via plain CSS visibility rules keyed off the same attribute, so no JavaScript ever touches the icons directly.

**A live timestamp that means what it says**

\`lastSync\` is set once, to the moment the page loads, and a \`setInterval\` running once a second recomputes the elapsed time and writes a human string — "Synced just now," then "Synced 12s ago," then minutes. This is a small but real pattern worth having on hand: any UI claiming to show "how long ago" something happened needs to keep recalculating against the current time, not just render a value once and leave it stale.

**A command palette that's genuinely openable three ways**

The palette overlay opens from a click on the bar, from the real keyboard shortcut, and closes on Escape, an outside click on the backdrop, or (implicitly) selecting an action. Three independent entry/exit paths sound like a lot of code, but they all converge on the same two functions, \`openPalette()\` and \`closePalette()\`, which is what keeps the behaviour consistent regardless of which path a user takes to get there.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A dark status-bar footer renders with a live sync timestamp that updates every second.' },
        { title: 'Click the command bar, or press the shortcut', text: 'Click "Search or run a command," or press ⌘K (Mac) / Ctrl K (Windows/Linux) anywhere on the page, to open the palette.' },
        { title: 'Close the palette', text: 'Press Escape, click outside the panel, or click a command in the list.' },
        { title: 'Toggle the theme', text: 'Click the sun/moon icon — the whole app shell (not just the footer) switches between light and dark via one data-theme attribute.' },
        { title: 'Wire up real commands', text: 'Replace the four placeholder buttons in .cbf-palette-list with real actions — navigation, search, or app commands.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'Real, working ⌘K / Ctrl K global keyboard shortcut — not just a visual badge',
      'Platform-aware shortcut label and modifier-key check via navigator.platform detection',
      'Command palette openable three ways: click, keyboard shortcut, and closable via Escape or outside click',
      'Light/dark theme toggle driven by a single data-theme attribute on the app root',
      'Live "synced Xs/Xm ago" timestamp that recalculates every second, not a static string',
      'Connection-status indicator with a pulseless, always-on dot for a calm, always-connected default state',
    ],
    useCases: [
      { icon: 'APP', title: 'SaaS dashboards and admin panels', desc: 'A persistent status strip that reassures the user the app is connected and synced, while offering instant access to a command palette without leaving the keyboard.' },
      { icon: 'CODE', title: 'Developer tools and IDE-style web apps', desc: 'Matches the status-bar convention developers already expect from code editors — connection state, version number, and a command-K trigger in one familiar strip.' },
      { icon: 'FLOW', title: 'Project management and collaboration tools', desc: 'Surface sync status and quick navigation in the one part of the UI that\'s visible regardless of which view or panel a user currently has open.' },
      { icon: 'DESIGN', title: 'Internal tools and back-office software', desc: 'A lightweight way to add power-user navigation (a command palette) to an internal tool without building a full search index or routing layer first.' },
      { icon: 'LEARN', title: 'Studying real keyboard-shortcut handling', desc: 'A practical example of detecting platform-specific modifier keys correctly, rather than hard-coding metaKey and silently failing for non-Mac users.' },
      { icon: 'MOBILE', title: 'Desktop-first productivity apps', desc: 'The command-palette shortcut is a desktop-keyboard feature by nature; the bar itself remains a fully functional, clickable status strip on touch devices where no keyboard is present.' },
      { icon: 'CODE', title: 'Related: Big Wordmark Footer', desc: 'See the [Big Wordmark Footer](/ui-snippets/big-wordmark-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Newsletter Subscribe Footer with Validation', desc: 'See the [Newsletter Subscribe Footer with Validation](/ui-snippets/newsletter-subscribe-footer-validated/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Legal & Compliance Bottom Bar', desc: 'See the [Legal & Compliance Bottom Bar](/ui-snippets/footer-legal-bar/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Docs Footer with Version Selector', desc: 'See the [Docs Footer with Version Selector](/ui-snippets/footer-docs-version-selector/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Minimal Single-Page App Footer', desc: 'See the [Minimal Single-Page App Footer](/ui-snippets/footer-minimal-spa/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the ⌘K shortcut actually work, or is it just a visual hint?', a: 'It genuinely works — a document-level keydown listener checks for the correct modifier key (Cmd on Mac, Ctrl elsewhere) plus the K key, calls preventDefault() to stop the browser\'s own shortcuts from intercepting it, and opens the same palette the button triggers.' },
      { q: 'How does it know whether to show ⌘K or Ctrl K?', a: 'A platform check using navigator.platform (with a user-agent string fallback) determines whether the current device is a Mac. That same check decides both which label the badge shows and which modifier key (metaKey vs ctrlKey) the keydown listener actually tests for.' },
      { q: 'How does the theme toggle affect the whole app, not just the footer?', a: 'Every themed CSS rule is scoped under .cbf-app[data-theme="light"], and the toggle button only ever changes that one attribute on the app\'s root wrapper. Because the attribute lives on the ancestor of everything else, background, text colour, and the footer\'s own styling all update together from a single change.' },
      { q: 'Why does the "synced" timestamp keep changing on its own?', a: 'A setInterval running once a second recalculates the elapsed time since lastSync and rewrites the label — "just now," then "12s ago," then minutes. A timestamp rendered once and left alone would silently go stale the moment more time passes.' },
      { q: 'Can I add more commands to the palette?', a: 'Yes — each row in .cbf-palette-list is a plain button; add more of them with their own icon and label, and wire a click handler to each that performs the real action (navigation, search, opening a modal) instead of the placeholder no-op.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. Move the keydown listener into the mount lifecycle (useEffect in React, onMounted in Vue) with proper cleanup on unmount, and store the sync interval\'s ID the same way so it clears rather than leaking when the component is removed.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the keydown listener checks navigator.platform to decide between metaKey and ctrlKey rather than just checking both unconditionally — and what edge case that unconditional approach would create (hint: Ctrl+K is a real, different browser/OS shortcut on some platforms, and checking both could fire the palette when the user meant something else). It's also a good candidate for a real-world wiring discussion: ask the assistant how you'd replace the four static palette commands with actual fuzzy-searchable results from your app's own routes or an API, keeping the same open/close mechanics. For extending it, ask for arrow-key navigation through the palette list (so a user can select a command without touching the mouse), or for the "synced" timestamp to trigger a visible warning state if too much time passes without an actual successful sync event from your backend.`,
      prompt: `Build a persistent app-shell "status bar" footer with a working command palette, in plain HTML, CSS, and vanilla JavaScript — no library.

Requirements:
- A slim footer bar fixed to the bottom (or bottom of a simple app-shell layout) containing three groups: a left group with a connection-status dot and label plus a live "synced Xs ago" timestamp that recalculates every second via setInterval; a centered "Search or run a command" button showing a keyboard-shortcut badge; and a right group with a version number and a light/dark theme toggle icon button.
- The theme toggle must flip a single data-theme attribute ("light" or "dark") on the app's root wrapper element, with every themed CSS rule scoped under that attribute selector, so one attribute change re-themes the whole app shell, not just the footer.
- Detect whether the user is on a Mac (via navigator.platform or a user-agent fallback) to decide both the shortcut badge's label (⌘K vs Ctrl K) and which modifier key a global keydown listener checks for.
- Add a document-level keydown listener that, when the correct platform-specific modifier plus the K key is pressed, calls preventDefault() and opens a command palette overlay — the same overlay a click on the status-bar button also opens.
- The command palette should be a centered modal-style panel with a text input, a short list of clickable placeholder command buttons, and a hint showing that Escape closes it; it must also close when clicking outside the panel on the backdrop.
- Keep the whole thing dependency-free and make the command-bar button's label collapse to just the shortcut badge on narrow screens to save space.`,
    },
  },
};

export default commandBarFooter;
