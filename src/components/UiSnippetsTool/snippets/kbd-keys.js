const kbdKeys = {
  id: 'kbd-keys',
  title: 'Keyboard Keys',
  lastmod: '2026-06-23',
  category: 'buttons',
  html: `<div class="kbd-card">
  <h3>Keyboard shortcuts</h3>
  <ul class="kbd-list" id="kbdList"></ul>
  <p class="kbd-hint">Press any shortcut below — the keys light up.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.kbd-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:400px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.kbd-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:16px}

.kbd-list{list-style:none;display:flex;flex-direction:column;gap:13px}
.kbd-list li{display:flex;align-items:center;justify-content:space-between;gap:12px}
.kbd-desc{font-size:13.5px;color:#475569;font-weight:600}
.kbd-combo{display:flex;align-items:center;gap:5px}
.kbd-plus{color:#cbd5e1;font-size:12px;font-weight:700}

kbd,.kbd{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;padding:0 7px;
  font-family:inherit;font-size:12px;font-weight:700;color:#334155;
  background:linear-gradient(180deg,#fff,#f1f5f9);border:1px solid #cbd5e1;
  border-radius:7px;box-shadow:0 2px 0 #cbd5e1,inset 0 1px 0 #fff;
  transition:transform .08s,box-shadow .08s,background .08s}
.kbd.kbd-down{transform:translateY(2px);box-shadow:0 0 0 #cbd5e1,inset 0 1px 0 #fff;background:linear-gradient(180deg,#eef2ff,#e0e7ff);color:#4f46e5;border-color:#a5b4fc}`,

  js: `// Each shortcut: the keys to display, the matching event keys, and a label.
var SHORTCUTS = [
  { keys: ['⌘', 'K'], match: ['meta', 'k'], desc: 'Open command palette' },
  { keys: ['⌘', 'S'], match: ['meta', 's'], desc: 'Save' },
  { keys: ['⌘', '⇧', 'P'], match: ['meta', 'shift', 'p'], desc: 'Command menu' },
  { keys: ['/'], match: ['/'], desc: 'Focus search' },
  { keys: ['Esc'], match: ['escape'], desc: 'Close / cancel' },
];

var list = document.getElementById('kbdList');
list.innerHTML = SHORTCUTS.map(function (s, si) {
  var combo = s.keys.map(function (k, ki) {
    return (ki ? '<span class="kbd-plus">+</span>' : '') + '<kbd class="kbd" data-s="' + si + '" data-k="' + ki + '">' + k + '</kbd>';
  }).join('');
  return '<li><span class="kbd-desc">' + s.desc + '</span><span class="kbd-combo">' + combo + '</span></li>';
}).join('');

function setDown(si, down) {
  list.querySelectorAll('kbd[data-s="' + si + '"]').forEach(function (el) { el.classList.toggle('kbd-down', down); });
}

// Light up the matching shortcut's keys while it is held.
document.addEventListener('keydown', function (e) {
  var typing = /^(input|textarea|select)$/i.test((e.target.tagName || ''));
  SHORTCUTS.forEach(function (s, si) {
    var ok = s.match.every(function (m) {
      if (m === 'meta') return e.metaKey || e.ctrlKey;
      if (m === 'shift') return e.shiftKey;
      return e.key.toLowerCase() === m;
    });
    if (ok) {
      if (!typing) e.preventDefault();
      setDown(si, true);
    }
  });
});
document.addEventListener('keyup', function () {
  SHORTCUTS.forEach(function (s, si) { setDown(si, false); });
});`,

  seo: {
    title: 'Keyboard Keys (kbd) — Shortcut Key UI HTML CSS JS',
    description: `Realistic keyboard key (kbd) UI for shortcut hints — 3D keycaps that press down when you hit the matching shortcut. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Keyboard Keys — 3D Keycaps That Press Down on the Matching Shortcut',
      description: `Styled keyboard keys (the \`<kbd>\` element) communicate shortcuts far better than plain text like "Cmd+K" — they look like real keycaps. This snippet builds a polished keyboard-key UI in plain HTML, CSS, and vanilla JavaScript: 3D keycaps with the right depth and shadows, laid out as a shortcut list, that actually *press down* when you hit the matching keys — no library or images.

**Keycaps with real depth**

Each key uses the semantic \`<kbd>\` element styled to look pressable: a subtle top-to-bottom gradient (lighter on top), a 1px border, and — the key detail — a \`box-shadow\` offset *downward* plus an inset highlight, which gives the cap a 3D lip as if it sits above the surface. This bottom-shadow-as-depth technique is what makes a keycap read as physical rather than a flat badge, the same trick behind every realistic key UI.

**They press when you press**

The standout feature: when you actually hit a shortcut, its on-screen keys depress. A document \`keydown\` listener checks each shortcut's modifier and key requirements against the event, and on a match adds a "down" class that translates the cap down by 2px and removes its drop shadow — so it looks pushed into the surface — then \`keyup\` releases it. Wiring the visual to real key events turns a static legend into a live demonstration, which is both delightful and genuinely instructive for teaching shortcuts.

**Correct modifier matching**

Each shortcut declares the keys to *display* (\`⌘\`, \`⇧\`, \`K\`) separately from the keys to *match* (\`meta\`, \`shift\`, \`k\`), so the pretty symbols and the event logic stay decoupled. The matcher treats \`meta\` as either ⌘ or Ctrl (so it works on macOS and Windows), checks \`shiftKey\`, and compares the main key case-insensitively — the standard, cross-platform way to detect a shortcut. It also avoids hijacking keys while the user is typing in a field.

**A clean shortcut list**

The keys are laid out as a list pairing each shortcut with its description, with subtle \`+\` separators between caps in a combo. This description-plus-combo row is the conventional "keyboard shortcuts" layout you see in command palettes and help dialogs, and it's generated from a \`SHORTCUTS\` data array so it's easy to extend.

**Drop-in and adaptable**

Use the \`<kbd>\` styling alone anywhere you mention a shortcut in text, or use the whole list as a shortcuts help panel. Edit the \`SHORTCUTS\` array to your app's bindings. It's a clear, dependency-free reference for realistic keycap styling and live, cross-platform shortcut detection. If you wire these shortcuts to real actions rather than just a demo, remember the \`typing\` guard exists for a reason — a global \`/\` for search or a bare letter shortcut will otherwise fire while a user is mid-sentence in a text field, which is the most common way custom keyboard shortcuts break a normal typing experience.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A shortcuts panel renders with realistic 3D keycaps next to each description.` },
      { title: 'Press a shortcut', text: `Hit any listed combo (e.g. ⌘K) and its on-screen keys depress, then release on keyup.` },
      { title: 'Use the kbd style anywhere', text: `Apply the kbd styling to inline <kbd> elements wherever you mention a shortcut in text.` },
      { title: 'Edit the shortcuts', text: `Change the SHORTCUTS array — keys to display, keys to match, and the description.` },
      { title: 'Match your platform', text: `meta matches ⌘ or Ctrl automatically; adjust the display symbols per OS if needed.` },
      { title: 'Wire real actions', text: `Trigger your actual handlers in the keydown match alongside the press animation.` },
    ] },
    features: [
      { title: 'Realistic 3D keycaps', text: `A downward box-shadow plus inset highlight gives each <kbd> a pressable lip.` },
      { title: 'Live press animation', text: `Keys depress when you hit the matching shortcut and release on keyup.` },
      { title: 'Cross-platform matching', text: `meta matches ⌘ or Ctrl, with shift and case-insensitive key checks.` },
      { title: 'Display vs. match keys', text: `Pretty symbols are decoupled from the event-matching keys for clean logic.` },
      { title: 'Typing guard', text: `Shortcuts don't hijack keys while the user types in an input or textarea.` },
      { title: 'Semantic <kbd>', text: `Uses the real <kbd> element, correct for keyboard input semantics.` },
      { title: 'Description + combo rows', text: `The conventional shortcuts-list layout with + separators.` },
      { title: 'Data-driven & no library', text: `Generated from a SHORTCUTS array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Shortcut help panels', text: `A keyboard cheat-sheet in your app — pair with a [keyboard shortcuts](/ui-snippets/keyboard-shortcuts/) modal.` },
      { title: 'Command palette hints', text: `Show the ⌘K hint as a real keycap, alongside a [command palette](/ui-snippets/command-palette/).` },
      { title: 'Docs and tutorials', text: `Render shortcuts as keycaps inline in documentation.` },
      { title: 'Onboarding and tips', text: `Teach power-user shortcuts with keys that respond when pressed.` },
      { title: 'Settings and accessibility', text: `Display configurable keybindings clearly.` },
      { title: 'Learning shortcut detection', text: `A reference for cross-platform key matching and keycap styling — compare with an [expandable search](/ui-snippets/expandable-search/) "/" hint.` },
      { icon: 'CODE', title: 'Related: Nav Tabs — Overflow Collapse to ', desc: 'See the [Nav Tabs — Overflow Collapse to ](/ui-snippets/nav-tabs-overflow-more-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the keys made to look 3D?', a: `Each <kbd> has a subtle vertical gradient (lighter top, darker bottom), a 1px border, and a box-shadow offset downward plus an inset top highlight. The downward shadow makes the cap appear to sit above the surface with a lip, and the inset highlight mimics the light edge of a real keycap. Removing that downward shadow and translating the cap down a couple pixels makes it look pressed.` },
      { q: 'How does pressing a real key animate the on-screen key?', a: `A document keydown listener checks each shortcut's requirements against the event — modifiers and the main key. On a match, it adds a "down" class to that shortcut's <kbd> elements, which translates them down and flattens the shadow so they look depressed; keyup removes the class to release them. This ties the visual to actual key events, turning the legend into a live demo.` },
      { q: 'How does it work across macOS and Windows?', a: `Each shortcut separates display keys (⌘, ⇧) from match keys (meta, shift, the letter). The matcher treats meta as true for either e.metaKey (⌘) or e.ctrlKey (Ctrl), so ⌘K on Mac and Ctrl+K on Windows both match, and it compares the main key case-insensitively. You can swap the displayed symbols per platform (⌘ vs Ctrl) while keeping the same match logic.` },
      { q: 'Why use the <kbd> element instead of a styled span?', a: `<kbd> is the semantic HTML element for keyboard input, so screen readers and assistive tech understand it represents keys the user presses, and it conveys meaning beyond styling. Styling the real element (rather than a generic span) keeps the markup meaningful and accessible while still letting you make it look like a keycap.` },
      { q: 'How do I use these keyboard keys in React, Vue, or Angular?', a: `Render the shortcut list from an array and apply the kbd CSS. Attach the keydown/keyup listeners in a useEffect (React), onMounted/onUnmounted (Vue), or HostListener (Angular), tracking which shortcut is pressed in state to toggle the down class. The keycap styling and matcher logic are framework-agnostic — only the listeners and pressed state move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the matcher logic by testing every OS yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each SHORTCUTS entry keeps separate keys and match arrays instead of one, or why treating meta as e.metaKey or e.ctrlKey is what makes a single shortcut definition work on both macOS and Windows. The same assistant can help optimize it, for instance checking whether the setDown loop that walks every shortcut on every keydown scales fine once the list grows to dozens of entries, or whether a lookup map keyed by the pressed key would be cheaper. It is just as useful for extending the component, such as wiring the matched shortcuts to real navigation or command actions instead of just a visual press, adding chorded multi-key sequences like a Vim-style leader key, or building a settings screen where users remap the match arrays themselves. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "keyboard keys" (kbd) shortcut list in plain HTML, CSS, and JavaScript that visually presses down its on-screen keys when the matching real shortcut is pressed — no library.

Requirements:
- A data array of shortcut objects, each with a keys array (the symbols to display, like a modifier glyph and a letter), a match array (the lowercase values to compare against real KeyboardEvent properties, like "meta" and a letter), and a description string.
- Render the list by generating one row per shortcut showing its description alongside its key combo, with a visible plus separator between multiple keys in the same combo, using the real semantic kbd element for each key.
- Style each kbd element to look like a physical keycap: a vertical gradient background, a border, and a box-shadow offset downward plus an inset highlight, so it reads as sitting above the surface with a lip.
- Add a document-level keydown listener that, for each shortcut, checks whether every entry in its match array is satisfied by the current event — treating the literal string "meta" as true if either the event's metaKey or ctrlKey property is set (so the same definition works as Cmd on macOS and Ctrl on Windows), treating "shift" as the event's shiftKey property, and comparing any other value case-insensitively against the event's key property.
- When a shortcut's full match array is satisfied, add a class to that shortcut's kbd elements that translates them down a couple pixels and removes their drop shadow, visually depressing them, and remove that class on keyup.
- Guard against hijacking single-character shortcuts (like "/") while the user is focused in an input, textarea, or select element, and call preventDefault only when it is safe to do so.`,
    },
  },
};

export default kbdKeys;
