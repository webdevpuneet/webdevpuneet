const appSwitcherOverlay = {
  id: 'app-switcher-overlay',
  title: 'App Switcher Overlay',
  category: 'navigation',
  html: `<div class="demo-page">
  <div class="demo-hint">
    <p>Press <kbd>Alt</kbd> + <kbd>Tab</kbd> (or click below) to open the switcher, then <kbd>Tab</kbd> / arrow keys to cycle and <kbd>Enter</kbd> to select.</p>
    <button class="open-btn" id="open-btn">Open app switcher</button>
  </div>
  <p class="active-app">Active app: <strong id="active-app-name">Dashboard</strong></p>
</div>

<div class="switcher-overlay" id="switcher" hidden>
  <div class="switcher-panel">
    <div class="switcher-grid" id="switcher-grid"></div>
    <p class="switcher-hint">Tab to cycle &middot; Enter to open &middot; Esc to cancel</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-page { max-width: 460px; margin: 0 auto; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; gap: 18px; text-align: center; }
.demo-hint p { font-size: 13px; color: #64748b; line-height: 1.7; }
kbd { background: #1e293b; color: #f1f5f9; border-radius: 6px; padding: 2px 7px; font-size: 12px; font-family: inherit; font-weight: 700; }
.open-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 10px 22px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit;
}
.open-btn:hover { background: #4f46e5; }
.active-app { font-size: 13px; color: #475569; }
.active-app strong { color: #1e293b; }

.switcher-overlay {
  position: fixed; inset: 0; z-index: 50;
  background: rgba(15,23,42,0.72); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  animation: fade-in 0.15s ease;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

.switcher-panel {
  background: rgba(30,41,59,0.9); border: 1px solid rgba(148,163,184,0.25);
  border-radius: 18px; padding: 22px; max-width: 560px; width: calc(100% - 40px);
}
.switcher-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

.switcher-card {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 16px 8px; border-radius: 14px; border: 2px solid transparent;
  background: rgba(255,255,255,0.04); cursor: pointer;
  transition: background 0.12s, border-color 0.12s, transform 0.12s;
}
.switcher-card:hover { background: rgba(255,255,255,0.08); }
.switcher-card.focused { border-color: #818cf8; background: rgba(129,140,248,0.14); transform: translateY(-2px); }

.switcher-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; font-weight: 800; color: #fff;
}
.switcher-name { font-size: 11.5px; font-weight: 700; color: #e2e8f0; text-align: center; }

.switcher-hint { text-align: center; font-size: 11px; color: #64748b; margin-top: 16px; }`,
  js: `const APPS = [
  { name: 'Dashboard', color: '#6366f1', glyph: 'DB' },
  { name: 'Inbox', color: '#f97316', glyph: 'IN' },
  { name: 'Calendar', color: '#22c55e', glyph: 'CA' },
  { name: 'Files', color: '#0ea5e9', glyph: 'FI' },
  { name: 'Analytics', color: '#e11d48', glyph: 'AN' },
  { name: 'Team', color: '#a855f7', glyph: 'TM' },
  { name: 'Settings', color: '#64748b', glyph: 'ST' },
  { name: 'Support', color: '#14b8a6', glyph: 'SU' },
];

const overlay = document.getElementById('switcher');
const grid = document.getElementById('switcher-grid');
const openBtn = document.getElementById('open-btn');
const activeNameEl = document.getElementById('active-app-name');

let cards = [];
let focusedIndex = 0;
let isOpen = false;
let activeAppName = 'Dashboard';

function buildGrid() {
  grid.innerHTML = '';
  cards = APPS.map((app, i) => {
    const card = document.createElement('div');
    card.className = 'switcher-card';
    card.tabIndex = -1;
    card.dataset.index = i;

    const icon = document.createElement('div');
    icon.className = 'switcher-icon';
    icon.style.background = app.color;
    icon.textContent = app.glyph;

    const name = document.createElement('div');
    name.className = 'switcher-name';
    name.textContent = app.name;

    card.appendChild(icon);
    card.appendChild(name);
    card.addEventListener('click', () => selectApp(i));
    card.addEventListener('mouseenter', () => setFocus(i));
    grid.appendChild(card);
    return card;
  });
}

function setFocus(i) {
  focusedIndex = (i + APPS.length) % APPS.length;
  cards.forEach((c, idx) => c.classList.toggle('focused', idx === focusedIndex));
}

function openSwitcher() {
  isOpen = true;
  overlay.hidden = false;
  const startIdx = Math.max(0, APPS.findIndex(a => a.name === activeAppName));
  setFocus((startIdx + 1) % APPS.length);
}

function closeSwitcher() {
  isOpen = false;
  overlay.hidden = true;
}

function selectApp(i) {
  activeAppName = APPS[i].name;
  activeNameEl.textContent = activeAppName;
  closeSwitcher();
}

openBtn.addEventListener('click', openSwitcher);
overlay.addEventListener('click', e => { if (e.target === overlay) closeSwitcher(); });

window.addEventListener('keydown', e => {
  if (e.altKey && e.key === 'Tab') {
    e.preventDefault();
    if (!isOpen) openSwitcher();
    else setFocus(focusedIndex + (e.shiftKey ? -1 : 1));
    return;
  }
  if (!isOpen) return;

  if (e.key === 'Tab') {
    e.preventDefault();
    setFocus(focusedIndex + (e.shiftKey ? -1 : 1));
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    setFocus(focusedIndex + 1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    setFocus(focusedIndex - 1);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    setFocus(focusedIndex + 4);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setFocus(focusedIndex - 4);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    selectApp(focusedIndex);
  } else if (e.key === 'Escape') {
    e.preventDefault();
    closeSwitcher();
  }
});

window.addEventListener('keyup', e => {
  if (e.key === 'Alt' && isOpen) selectApp(focusedIndex);
});

buildGrid();`,
  seo: {
    title: 'App Switcher Overlay — Free HTML CSS JS Snippet',
    description: 'A Cmd+Tab / Alt+Tab-style modal grid for jumping between apps, with hold-to-cycle key handling, arrow-key grid navigation and release-to-select. Exports to React, Vue & Tailwind.',
    about: {
      title: 'App Switcher Overlay — Hold-to-Cycle Key Handling and 2D Arrow-Key Grid Navigation',
      description: `Desktop operating systems and many productivity suites share a familiar interaction: hold a modifier key, tap Tab repeatedly to cycle through open apps or recent items in a floating grid, and release the modifier to jump to whichever one is highlighted. This snippet implements that exact interaction model as a self-contained overlay — a grid of app cards, full keyboard cycling in two dimensions, and a genuine hold-and-release selection flow — for use inside a web app's own command surface rather than the OS-level switcher.

**Hold-to-cycle via keydown and keyup working together**

The core interaction spans two separate event listeners cooperating on shared state. A \`keydown\` listener detects \`Alt\` held together with \`Tab\`: on the first press it opens the overlay via \`openSwitcher()\`, and on every subsequent press while still open it advances \`focusedIndex\` by one (or backward with \`Shift\`) via \`setFocus()\` — exactly mirroring how holding Alt and tapping Tab repeatedly cycles further through a real OS switcher without closing it. A separate \`keyup\` listener watches specifically for the \`Alt\` key being released, and when it is, calls \`selectApp(focusedIndex)\` immediately — so releasing the modifier key is itself the selection gesture, not a separate click or Enter press, matching the muscle memory of the real OS pattern.

**Two-dimensional arrow-key navigation over a 1D data array**

The apps are stored as a flat array, but rendered into a four-column CSS grid, so up/down arrow navigation needs to move by a full row rather than by one array index. \`ArrowDown\`/\`ArrowUp\` add or subtract 4 (the fixed column count) from \`focusedIndex\` inside \`setFocus()\`, while \`ArrowLeft\`/\`ArrowRight\` and \`Tab\`/\`Shift+Tab\` move by exactly one. \`setFocus()\` wraps the resulting index with \`(i + APPS.length) % APPS.length\`, so navigating past either end of the flat array wraps around to the opposite end cleanly, regardless of whether the movement came from a row-jump or a single-step arrow key.

**Opening pre-focused on the next item, not the current app**

When the switcher opens, \`openSwitcher()\` deliberately does not focus the currently active app first — it looks up the active app's index and immediately focuses the *next* one (\`(startIdx + 1) % APPS.length\`). This mirrors real app switchers, where the very first Tab-hold already lands you on the second-most-recent item rather than re-highlighting the app you're already in, since selecting the app you're already using would be a no-op.

**Mouse and keyboard sharing one focus model**

Every \`.switcher-card\` also has a \`mouseenter\` listener wired to the same \`setFocus(i)\` function the keyboard uses, and a \`click\` listener wired to the same \`selectApp(i)\` function that \`Enter\` and Alt-release trigger. Because both input methods drive identical shared functions rather than separate parallel logic, the visual "focused" state (a highlighted border and background) and the selection behavior stay perfectly consistent regardless of whether the user is navigating with a mouse, a trackpad, or purely the keyboard.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the switcher', text: 'Click "Open app switcher" or hold Alt and press Tab. openSwitcher() shows the overlay and focuses the item just after the currently active app.' },
        { title: 'Keep holding Alt and tap Tab to cycle', text: 'Each additional Tab press while Alt is held advances focusedIndex by one via setFocus(), exactly like a real OS app switcher — Shift+Tab moves backward.' },
        { title: 'Or navigate with arrow keys', text: 'Left/Right move one card at a time; Up/Down jump by a full row (4 cards) since the grid is two-dimensional but the underlying data is a flat array.' },
        { title: 'Release Alt, or press Enter, to select', text: 'Releasing the Alt key (detected via a keyup listener) immediately selects whichever card is focused, matching real hold-and-release switcher behavior. Enter does the same without requiring a held modifier.' },
        { title: 'Click a card directly, or press Escape to cancel', text: 'Clicking any card selects it immediately regardless of keyboard focus. Escape, or clicking the dimmed backdrop, closes the overlay without changing the active app.' },
        { title: 'Edit the apps list', text: 'Update the APPS array with your own name, color, and glyph (a short initials string) for each entry — buildGrid() regenerates the full card grid from whatever entries exist.' },
      ],
    },
    features: [
      'Genuine hold-to-cycle interaction: keydown advances focus while Alt+Tab is held, keyup on Alt triggers selection',
      'Full two-dimensional arrow-key navigation (left/right by one, up/down by a full row) over a flat data array',
      'Index wrapping via modulo arithmetic so navigation past either end of the list cycles around cleanly',
      'Opens pre-focused on the next item after the currently active app, not the current app itself',
      'Mouse hover and keyboard navigation share one setFocus() function, keeping visual state always consistent',
      'Click and Enter/Alt-release selection paths share one selectApp() function',
      'Escape key and backdrop click both close the overlay without changing the active app',
      'Self-contained overlay with a blurred backdrop — no dependency on a specific app framework or router',
    ],
    useCases: [
      { icon: 'APP', title: 'In-app workspace or module switcher', desc: 'Give a multi-module product (dashboard, inbox, calendar, files) a fast, keyboard-first way to jump between sections, similar to the [command palette](/ui-snippets/command-palette/) but optimized for visual, icon-based recent-item switching instead of text search.' },
      { icon: 'FLOW', title: 'Recent documents or recent workspaces overlay', desc: 'Reuse the same hold-to-cycle pattern for a "recent files" or "recent projects" switcher, swapping app icons for document thumbnails or project avatars.' },
      { icon: 'DASH', title: 'Multi-account or multi-tenant switcher', desc: 'Let users holding a shortcut cycle between connected accounts, organizations, or tenants in a SaaS product without leaving the keyboard.' },
      { icon: 'LEARN', title: 'Reference for hold-and-release keyboard interaction patterns', desc: 'A clear example of coordinating keydown and keyup listeners to implement a modifier-key-held interaction, useful for any UI that needs "hold to preview, release to commit" behavior.' },
      { icon: 'DESIGN', title: 'Power-user productivity tool onboarding', desc: 'Demonstrating this pattern in a product tour helps power users discover a faster way to move around than clicking through a [sidebar nav](/ui-snippets/sidebar-nav/).' },
      { icon: 'CODE', title: 'Related: Voice Command Navigation Menu', desc: 'See the [Voice Command Navigation Menu](/ui-snippets/voice-command-nav-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the hold-Alt-and-release-to-select interaction actually work?', a: 'A keydown listener opens the switcher and advances the focused index on repeated Alt+Tab presses while the key combination is held. A separate keyup listener specifically watches for the Alt key being released and, if the switcher is open, immediately calls selectApp() on whatever card is currently focused — so releasing the modifier key is the selection trigger, not a separate action.' },
      { q: 'Why do Up and Down arrows move by 4 instead of by 1?', a: 'The apps are stored as a flat one-dimensional array but rendered into a 4-column CSS grid. Moving up or down visually means jumping a full row, so ArrowUp and ArrowDown add or subtract 4 (the fixed column count) from the focused index rather than 1, which is what Left/Right and Tab use.' },
      { q: 'What happens if I navigate past the first or last app?', a: 'setFocus() wraps the resulting index using (i + APPS.length) % APPS.length, so moving past the last item cycles back to the first, and moving before the first item cycles to the last, regardless of whether the navigation came from an arrow key or a Tab press.' },
      { q: 'Why does opening the switcher not focus the currently active app first?', a: 'openSwitcher() intentionally focuses the item immediately after the currently active app\'s index, because selecting the app you are already in would be a no-op — this mirrors how real OS-level app switchers land on the next most relevant item rather than re-highlighting your current app.' },
      { q: 'Can I trigger selection without holding a modifier key?', a: 'Yes. Pressing Enter while the switcher is open calls the exact same selectApp() function that releasing Alt triggers, and clicking a card directly also calls it — the modifier-hold pattern is one of three equivalent ways to select an item, not the only one.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, keep focusedIndex and isOpen in state, and wire the same keydown/keyup logic to window listeners inside a useEffect that adds and cleans up the listeners.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the keydown and keyup listeners cooperate to implement the hold-to-cycle, release-to-select interaction, and why Up/Down arrow navigation adds or subtracts the fixed column count instead of using a different calculation. It's also a good candidate for extension — ask it to add a search/filter text input at the top of the panel that narrows the grid as the user types while still supporting arrow-key navigation over the filtered results, recently-used ordering so the grid re-sorts based on selection history, or a middle-click / dedicated close button per card for closing an app directly from the switcher instead of only selecting it.`,
      prompt: `Build an app-switcher overlay in plain HTML, CSS, and JavaScript — no libraries — that replicates the OS-style hold-Alt-Tab-to-cycle, release-to-select interaction pattern.

Requirements:
- A grid of app cards (icon plus name) that opens as a centered modal overlay with a dimmed, blurred backdrop, triggered either by a visible button or by pressing Tab while the Alt key is held down.
- While the overlay is open and Alt continues to be held, each additional Tab press (Shift+Tab for reverse) must advance a focused-card index by one, visually highlighting the newly focused card — this needs a keydown listener that does not close the overlay on repeated presses.
- Releasing the Alt key while the overlay is open must immediately select whichever card is currently focused and close the overlay — implemented via a separate keyup listener specifically watching for the modifier key going up, not a keydown or click.
- Also support Left/Right arrow keys moving focus by one card, and Up/Down arrow keys moving focus by a full grid row (i.e. by however many columns the grid has), with focus wrapping around from the last card back to the first and vice versa in every direction.
- Support Enter as an alternate way to select the currently focused card without requiring the modifier key to be released, Escape to close the overlay without changing selection, and clicking a card directly (or hovering it to move keyboard focus there) as equivalent alternate interactions — all selection paths should call one shared selection function, and all focus-change paths should call one shared focus function, so mouse and keyboard stay consistent.
- When the overlay opens, focus should land on the app immediately after the currently active one in the list, not on the currently active app itself.`,
    },
  },
};

export default appSwitcherOverlay;
