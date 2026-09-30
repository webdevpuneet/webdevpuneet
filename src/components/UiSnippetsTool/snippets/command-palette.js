const commandPalette = {
    id: 'command-palette',
    title: 'Command Palette',
    category: 'modals',
    html: `<div class="page">
  <p class="hint">Press <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd></p>
  <button class="open-btn" onclick="openPalette()">Open Command Palette <kbd>⌘K</kbd></button>
</div>
<div class="overlay" id="overlay" onclick="closePalette()"></div>
<div class="palette" id="palette" role="dialog" aria-modal="true">
  <div class="search-row">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input id="cmd-q" class="cmd-input" placeholder="Search commands…" oninput="filter(this.value)" autocomplete="off" />
    <kbd class="esc-key" onclick="closePalette()">ESC</kbd>
  </div>
  <div id="cmd-list" class="cmd-list"></div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.page { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.hint { font-size: 13px; color: #475569; }
.hint kbd, .open-btn kbd { font-family: monospace; font-size: 11px; background: #1e293b; border: 1px solid #334155; border-radius: 4px; padding: 2px 6px; color: #94a3b8; }
.open-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #1e293b; border: 1px solid #334155; border-radius: 10px; color: #94a3b8; font-size: 14px; cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s; }
.open-btn:hover { border-color: #6366f1; color: #f1f5f9; }

.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); opacity: 0; pointer-events: none; transition: opacity 0.15s; z-index: 10; }
.overlay.show { opacity: 1; pointer-events: all; }

.palette {
  position: fixed; top: 20%; left: 50%; transform: translateX(-50%) scale(0.96);
  width: min(560px, 90vw);
  background: #1e293b; border: 1px solid #334155;
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
  opacity: 0; pointer-events: none;
  transition: opacity 0.15s, transform 0.15s; z-index: 20;
}
.palette.show { opacity: 1; pointer-events: all; transform: translateX(-50%) scale(1); }

.search-row { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid #334155; }
.search-row svg { color: #475569; flex-shrink: 0; }
.cmd-input { flex: 1; background: none; border: none; outline: none; font-size: 15px; color: #f1f5f9; font-family: inherit; }
.cmd-input::placeholder { color: #475569; }
.esc-key { font-family: monospace; font-size: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 4px; padding: 2px 7px; color: #475569; cursor: pointer; flex-shrink: 0; }

.cmd-list { max-height: 360px; overflow-y: auto; padding: 6px; }

.cmd-group-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #475569; padding: 8px 10px 4px; }

.cmd-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: 8px;
  cursor: pointer; transition: background 0.1s;
}
.cmd-item:hover, .cmd-item.active { background: #334155; }
.cmd-icon { width: 30px; height: 30px; border-radius: 7px; background: #0f172a; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
.cmd-text { flex: 1; }
.cmd-name { font-size: 13px; font-weight: 500; color: #f1f5f9; }
.cmd-desc { font-size: 11px; color: #475569; margin-top: 1px; }
.cmd-shortcut { font-family: monospace; font-size: 10px; color: #475569; background: #0f172a; border: 1px solid #334155; border-radius: 4px; padding: 2px 6px; flex-shrink: 0; }
.cmd-empty { padding: 32px 16px; text-align: center; font-size: 13px; color: #475569; }`,
    js: `const COMMANDS = [
  { group: 'Navigation', icon: '🏠', name: 'Go to Home',        desc: 'Return to the main dashboard',  shortcut: 'G H' },
  { group: 'Navigation', icon: '📊', name: 'Open Dashboard',    desc: 'View analytics overview',       shortcut: 'G D' },
  { group: 'Navigation', icon: '⚙️', name: 'Settings',          desc: 'Manage account preferences',    shortcut: 'G S' },
  { group: 'Actions',    icon: '➕', name: 'New Document',       desc: 'Create a blank document',       shortcut: '⌘N' },
  { group: 'Actions',    icon: '📤', name: 'Export as PDF',      desc: 'Download current page as PDF',  shortcut: '⌘E' },
  { group: 'Actions',    icon: '🔗', name: 'Copy Link',          desc: 'Copy page URL to clipboard',    shortcut: '⌘L' },
  { group: 'Actions',    icon: '🗑️', name: 'Delete',             desc: 'Move item to trash',            shortcut: '⌘⌫' },
  { group: 'Theme',      icon: '🌙', name: 'Toggle Dark Mode',   desc: 'Switch color scheme',           shortcut: '⌘T' },
  { group: 'Theme',      icon: '🔍', name: 'Zoom In',            desc: 'Increase interface scale',      shortcut: '⌘+' },
  { group: 'Help',       icon: '📖', name: 'Documentation',      desc: 'Open the docs in a new tab',   shortcut: '?' },
  { group: 'Help',       icon: '💬', name: 'Contact Support',    desc: 'Get help from the team',        shortcut: '' },
];

let activeIdx = 0, visible = [];

function render(cmds) {
  visible = cmds;
  activeIdx = 0;
  const el = document.getElementById('cmd-list');
  if (!cmds.length) { el.innerHTML = '<div class="cmd-empty">No commands found</div>'; return; }
  const groups = [...new Set(cmds.map(c => c.group))];
  el.innerHTML = groups.map(g => {
    const items = cmds.filter(c => c.group === g).map((c, i) => {
      const gi = cmds.indexOf(c);
      return \`<div class="cmd-item\${gi === 0 ? ' active' : ''}" data-idx="\${gi}" onclick="pick(\${gi})">\` +
        \`<div class="cmd-icon">\${c.icon}</div>\` +
        \`<div class="cmd-text"><div class="cmd-name">\${c.name}</div><div class="cmd-desc">\${c.desc}</div></div>\` +
        \`\${c.shortcut ? \`<span class="cmd-shortcut">\${c.shortcut}</span>\` : ''}</div>\`;
    }).join('');
    return \`<div class="cmd-group-label">\${g}</div>\${items}\`;
  }).join('');
}

function filter(q) {
  const lq = q.toLowerCase();
  render(q ? COMMANDS.filter(c => c.name.toLowerCase().includes(lq) || c.desc.toLowerCase().includes(lq)) : COMMANDS);
}

function setActive(i) {
  document.querySelectorAll('.cmd-item').forEach(el => el.classList.remove('active'));
  const el = document.querySelector(\`[data-idx="\${i}"]\`);
  if (el) { el.classList.add('active'); el.scrollIntoView({ block: 'nearest' }); activeIdx = i; }
}

function pick(i) { alert('Running: ' + visible[i]?.name); closePalette(); }

function openPalette() {
  document.getElementById('overlay').classList.add('show');
  document.getElementById('palette').classList.add('show');
  document.getElementById('cmd-q').value = '';
  render(COMMANDS);
  setTimeout(() => document.getElementById('cmd-q').focus(), 50);
}
function closePalette() {
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('palette').classList.remove('show');
}

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openPalette(); return; }
  if (!document.getElementById('palette').classList.contains('show')) return;
  if (e.key === 'Escape') closePalette();
  if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, visible.length - 1)); }
  if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
  if (e.key === 'Enter') pick(activeIdx);
});`,

  seo: {
    title: 'Command Palette — Free HTML CSS JS Cmd+K Snippet',
    description: 'Cmd+K command palette with live search, arrow-key navigation and grouped results — like Raycast or VS Code. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Command Palette — Cmd+K Shortcut, Grouped Commands, Fuzzy Search & Keyboard Nav',
      description: `A command palette is a searchable list of application actions triggered by a keyboard shortcut — typically Cmd+K or Ctrl+K. Popularised by VS Code and Linear, it is now a standard power-user feature in developer tools, dashboards, and productivity apps. It replaces deep menu hierarchies with a single [search](/ui-snippets/search-box/) interface: type a few characters and instantly find any action.

**The COMMANDS data structure**

Commands are plain JS objects with \`group\`, \`icon\`, \`name\`, \`desc\`, and \`shortcut\` fields. The \`render(cmds)\` function groups them by the \`group\` field and renders each group with a label and its items. Adding new commands is as simple as adding an object to the array.

**The search/filter function**

\`filter(q)\` converts the query to lowercase and calls \`COMMANDS.filter(c => c.name.toLowerCase().includes(lq) || c.desc.toLowerCase().includes(lq))\`. This searches both name and description — typing "dashboard" finds commands named "Open Dashboard" and commands with "dashboard" in their description. Passing the result to \`render()\` re-builds the list.

**Keyboard navigation**

A \`keydown\` listener on the input catches ArrowDown, ArrowUp, Enter, and Escape. Arrow keys call \`setActive(i)\` which removes \`.active\` from all items, adds it to the target item, and calls \`scrollIntoView({ block: 'nearest' })\` so the active item is always visible. Enter calls \`pick(activeIdx)\` to execute the command. Escape calls \`closePalette()\`.

**Opening and closing**

\`document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openPalette(); } })\` wires the Cmd+K shortcut. \`openPalette()\` adds \`.show\` to the overlay and palette and focuses the search input with a 50ms delay (allowing the CSS transition to start first). \`closePalette()\` removes \`.show\` from both.

**Replacing alert() with real actions**

The \`pick(i)\` function currently calls \`alert()\`. Replace it with a switch statement or a map from command name to handler function to execute real actions.

**Keyboard shortcut capture**

The Cmd+K / Ctrl+K listener checks: if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openPalette(); }. e.preventDefault() stops the browser's default Cmd+K action (some browsers map this to a bookmark or search action). The listener is attached to document once on component mount and remains active globally while the page is open.

**The fuzzy search algorithm**

The search filters commands by checking if the query string is a substring of the command name or description: cmd.name.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q). For a true fuzzy match (allowing out-of-order character matching), replace includes with a character-order test: const chars = [...q]; let idx = 0; return name.split('').some(c => c === chars[idx] && ++idx) && idx === chars.length. This matches "cmpl" to "command palette".

**Arrow key navigation**

The keydown handler tracks selectedIndex state. ArrowDown increments it (wrapping at the list end); ArrowUp decrements (wrapping to the end). The selected command gets a highlighted background. Enter triggers the selected command's action and closes the palette. The selectedIndex is reset to 0 on each new search query.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Press Cmd+K in the preview', text: 'Click inside the preview and press Cmd+K (or Ctrl+K) to open the palette. Or click the "Open palette" button.' },
        { title: 'Type to search', text: 'Type any word to filter commands by name or description. The list filters in real time as you type.' },
        { title: 'Navigate with arrow keys and Enter', text: 'Use ArrowDown/ArrowUp to move between commands. Press Enter to run the selected command. Press ESC to close.' },
        { title: 'Add your own commands', text: 'In the JS panel, add objects to the COMMANDS array: { group: "My Group", icon: "⭐", name: "My Command", desc: "What it does", shortcut: "⌘X" }.' },
        { title: 'Wire pick() to real actions', text: 'Replace the alert() in pick(i) with a switch on visible[i].name or a map of command names to handler functions.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Cmd+K and Ctrl+K shortcut opens the palette via document keydown listener',
      'Substring filter on name and description — searches both fields simultaneously',
      'Grouped results by group field with group label headers',
      'Arrow key navigation: ArrowDown/Up calls setActive() + scrollIntoView',
      'Enter runs the active command; ESC closes the palette',
      'backdrop-filter blur overlay with scale+opacity open animation',
      'data-idx attributes allow onclick delegation to individual items',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'SaaS dashboard navigation',          desc: 'Replace deep navigation menus like the [mega menu](/ui-snippets/mega-menu/) with a command palette. Users type instead of clicking through multiple levels to find an action.' },
      { icon: 'CODE',   title: 'Developer tool quick actions',        desc: 'Add to any developer tool for keyboard-first power users — pair with a [keyboard shortcuts](/ui-snippets/keyboard-shortcuts/) cheatsheet. Wire commands to real actions: navigate to files, run builds, toggle settings.' },
      { icon: 'LEARN',  title: 'Learn keyboard event handling and DOM rendering', desc: 'The palette uses keydown, metaKey/ctrlKey detection, and dynamic DOM rendering. Edit the JS to understand how each part works.' },
      { icon: 'FLOW',   title: 'Prototype keyboard-first UX',         desc: 'Use the palette in a prototype to test whether a keyboard-centric navigation model works for your user base before building a full implementation.' },
      { icon: 'DESIGN', title: 'Customise grouping and icons',        desc: 'Update the group field on COMMANDS to create your own sections. Change the icon field to SVG strings or emoji to match your visual style.' },
      { icon: 'PEOPLE', title: 'Accessibility-first navigation',      desc: 'The command palette makes deep features discoverable without hunting through menus — valuable for power users and keyboard-only users alike.' },
      { icon: 'CODE', title: 'Related: App Store Rating Prompt Modal', desc: 'See the [App Store Rating Prompt Modal](/ui-snippets/app-store-rating-prompt/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the Cmd+K shortcut work?', a: 'A document.addEventListener("keydown") handler checks (e.metaKey || e.ctrlKey) && e.key === "k". metaKey is true on Mac for the Command key; ctrlKey is true on Windows/Linux for Control. e.preventDefault() stops the browser default Cmd+K action. Then openPalette() is called.' },
      { q: 'How does the search filter work?', a: 'filter(q) converts the query to lowercase and filters COMMANDS where c.name.toLowerCase().includes(lq) or c.desc.toLowerCase().includes(lq). Both name and description are searched. The filtered array is passed to render() which rebuilds the grouped list.' },
      { q: 'How does arrow key navigation work?', a: 'The keydown handler on the input catches ArrowDown (increment activeIdx), ArrowUp (decrement), and Enter (execute). setActive(i) removes .active from all items, adds it to the item with data-idx={i}, and calls el.scrollIntoView({ block: "nearest" }) to keep the active item visible.' },
      { q: 'How do I wire commands to real actions?', a: 'Replace the alert() in pick(i) with your action logic. Use a switch on visible[i].name, or create an actions map: const handlers = { "Go to Home": () => router.push("/"), ... }. Then pick calls handlers[visible[i].name]?.().' },
      { q: 'How do I add more commands?', a: 'Add objects to the COMMANDS array in the JS panel: { group: "MyGroup", icon: "⭐", name: "My Action", desc: "Does something useful", shortcut: "" }. The render function groups and displays them automatically.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. In React, manage open state with useState, filter state with useState, and active index with useState. Use useEffect to add/remove the document keydown listener. Wire the search input to a controlled value.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the keyboard handling and grouping logic line by line to trust it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how setActive keeps the highlighted item in sync between the data-idx attribute, the visible array, and scrollIntoView, and why the Cmd+K listener needs to check both metaKey and ctrlKey rather than just one. The same assistant can help optimize it — for instance asking whether rebuilding the entire innerHTML string on every keystroke is fine at eleven commands but would need a different approach at a few hundred. It's also useful for extending the palette: ask it to add real fuzzy matching instead of plain substring search, support recently-used commands pinned to the top, or wire pick() to an actual router/action dispatcher instead of the placeholder alert. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Cmd+K command palette in plain HTML, CSS, and JavaScript — no fuzzy-search library, no UI framework.

Requirements:
- A global keydown listener on document that detects both e.metaKey and e.ctrlKey combined with the "k" key, calls preventDefault to stop the browser's own shortcut, and opens the palette from anywhere on the page without requiring focus to be inside it first.
- A flat array of command objects, each with a group name, an icon, a name, a description, and an optional keyboard shortcut string, rendered by grouping commands under their group label headers dynamically (not hardcoded per-group markup).
- A search input that filters the command array by checking whether the lowercased query is a substring of either the command's name or its description, re-rendering the grouped list on every keystroke and resetting the active selection to the first result each time.
- Full keyboard navigation inside the open palette: ArrowDown and ArrowUp move a highlighted-item index up or down clamped to the list bounds, calling scrollIntoView with block: "nearest" so the highlighted item is always visible without page-level scrolling, Enter executes the highlighted command, and Escape closes the palette.
- An empty state shown when no commands match the current query.
- Open/close must be driven by toggling a class that animates opacity and a scale transform on the palette panel plus a separate blurred backdrop overlay, not by toggling display or visibility directly.
- Focus the search input automatically after opening, with enough delay that the open transition has already started.`,
    },
  },
};

export default commandPalette;
