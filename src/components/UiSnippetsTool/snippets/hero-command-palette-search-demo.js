const heroCommandPaletteSearchDemo = {
  id: 'hero-command-palette-search-demo',
  title: 'Hero with Interactive Command Palette Demo',
  lastmod: '2026-08-31',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="cpd-hero">
  <div class="cpd-copy">
    <span class="cpd-eyebrow">Press <kbd>&#8984;</kbd><kbd>K</kbd> anywhere</span>
    <h1 class="cpd-h1">Every action, one keystroke away</h1>
    <p class="cpd-sub">Search files, run commands, jump to any page — the command palette means your hands never have to leave the keyboard.</p>
    <div class="cpd-cta-row">
      <button type="button" class="cpd-btn-primary" id="cpdTryBtn">Try it below &#8595;</button>
      <button type="button" class="cpd-btn-ghost">View docs</button>
    </div>
  </div>

  <div class="cpd-demo-wrap">
    <div class="cpd-palette">
      <div class="cpd-palette-input-row">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="cpdInput" placeholder="Type a command or search..." autocomplete="off">
        <kbd class="cpd-esc">esc</kbd>
      </div>
      <div class="cpd-results" id="cpdResults"></div>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0e0e12;color:#f2f2f7}
.cpd-hero{display:flex;flex-direction:column;align-items:center;gap:44px;max-width:760px;margin:0 auto;padding:72px 24px;text-align:center}

.cpd-eyebrow{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:#a3a3b8;margin-bottom:18px}
.cpd-eyebrow kbd{background:#1c1c24;border:1px solid #2e2e3a;border-radius:5px;padding:2px 7px;font-family:inherit;font-size:11.5px;color:#e5e5f0}
.cpd-h1{font-size:clamp(30px,4.6vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.02em;margin-bottom:16px}
.cpd-sub{font-size:15.5px;color:#a3a3b8;line-height:1.65;max-width:520px;margin:0 auto 28px}

.cpd-cta-row{display:flex;gap:12px;justify-content:center}
.cpd-btn-primary{background:#f2f2f7;color:#0e0e12;border:none;border-radius:10px;padding:13px 22px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit}
.cpd-btn-ghost{background:none;border:1.5px solid #2e2e3a;color:#f2f2f7;border-radius:10px;padding:13px 22px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit}

.cpd-demo-wrap{width:100%;display:flex;justify-content:center}
.cpd-palette{width:min(560px,100%);background:#17171f;border:1px solid #2a2a36;border-radius:16px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.5);text-align:left}
.cpd-palette-input-row{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid #24242e}
.cpd-palette-input-row svg{color:#6b6b80;flex-shrink:0}
.cpd-palette-input-row input{flex:1;background:none;border:none;outline:none;color:#f2f2f7;font-size:15px;font-family:inherit}
.cpd-palette-input-row input::placeholder{color:#6b6b80}
.cpd-esc{background:#24242e;border:1px solid #34343f;border-radius:5px;padding:2px 7px;font-size:10.5px;color:#9a9ab0;font-family:inherit}

.cpd-results{max-height:280px;overflow-y:auto;padding:8px}
.cpd-group-label{font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#5c5c70;padding:10px 12px 6px}
.cpd-result{display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:9px;cursor:pointer;transition:background .1s}
.cpd-result.cpd-result-active{background:#2a2a3a}
.cpd-result-icon{width:28px;height:28px;border-radius:7px;background:#24242e;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px}
.cpd-result-text{flex:1;min-width:0}
.cpd-result-name{font-size:13.5px;font-weight:600;color:#f2f2f7}
.cpd-result-name mark{background:none;color:#a78bfa;font-weight:800}
.cpd-result-sub{font-size:11.5px;color:#6b6b80}
.cpd-result-kbd{font-size:10.5px;color:#6b6b80;background:#24242e;border:1px solid #34343f;border-radius:5px;padding:2px 6px;flex-shrink:0}
.cpd-empty{padding:32px 12px;text-align:center;font-size:13px;color:#6b6b80}`,

  js: `// A functional, keyboard-navigable command palette: type to filter across
// several command groups, use arrow keys to move the active selection, and
// press Enter to "run" the highlighted command (shown via a brief flash).
var commands = [
  { group: 'Navigate', name: 'Go to Dashboard', sub: 'Overview and recent activity', icon: 'DA', shortcut: 'G D' },
  { group: 'Navigate', name: 'Go to Settings', sub: 'Account and workspace preferences', icon: '\\u2699', shortcut: 'G S' },
  { group: 'Navigate', name: 'Go to Billing', sub: 'Plan, invoices, and payment method', icon: 'BI', shortcut: 'G B' },
  { group: 'Actions', name: 'Create new project', sub: 'Start a project from a template', icon: '+', shortcut: 'C P' },
  { group: 'Actions', name: 'Invite teammate', sub: 'Send an email invite to your workspace', icon: '\\u2709', shortcut: 'C T' },
  { group: 'Actions', name: 'Create API key', sub: 'Generate a new secret key', icon: 'KY', shortcut: 'C K' },
  { group: 'Search', name: 'Search files', sub: 'Find any file across every project', icon: 'FI', shortcut: '' },
  { group: 'Search', name: 'Search people', sub: 'Find a teammate by name or email', icon: 'PE', shortcut: '' },
  { group: 'Theme', name: 'Switch to dark mode', sub: 'Toggle the workspace appearance', icon: '\\u25D1', shortcut: '' },
  { group: 'Theme', name: 'Switch to light mode', sub: 'Toggle the workspace appearance', icon: '\\u25CB', shortcut: '' }
];

var input = document.getElementById('cpdInput');
var resultsEl = document.getElementById('cpdResults');
var tryBtn = document.getElementById('cpdTryBtn');
var activeIndex = 0;
var currentMatches = [];

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function (c) {
    return c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;';
  });
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  var lower = text.toLowerCase();
  var qLower = query.toLowerCase();
  var idx = lower.indexOf(qLower);
  if (idx === -1) return escapeHtml(text);
  var before = escapeHtml(text.slice(0, idx));
  var match = escapeHtml(text.slice(idx, idx + query.length));
  var after = escapeHtml(text.slice(idx + query.length));
  return before + '<mark>' + match + '</mark>' + after;
}

function render() {
  var query = input.value.trim();
  currentMatches = commands.filter(function (cmd) {
    return query === '' || cmd.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  if (currentMatches.length === 0) {
    resultsEl.innerHTML = '<div class="cpd-empty">No commands match &ldquo;' + escapeHtml(query) + '&rdquo;</div>';
    return;
  }

  if (activeIndex >= currentMatches.length) activeIndex = 0;

  var html = '';
  var lastGroup = null;
  currentMatches.forEach(function (cmd, i) {
    if (cmd.group !== lastGroup) {
      html += '<div class="cpd-group-label">' + escapeHtml(cmd.group) + '</div>';
      lastGroup = cmd.group;
    }
    var activeClass = i === activeIndex ? ' cpd-result-active' : '';
    html += '<div class="cpd-result' + activeClass + '" data-index="' + i + '">' +
      '<span class="cpd-result-icon">' + cmd.icon + '</span>' +
      '<span class="cpd-result-text">' +
        '<span class="cpd-result-name">' + highlight(cmd.name, query) + '</span>' +
        '<span class="cpd-result-sub">' + escapeHtml(cmd.sub) + '</span>' +
      '</span>' +
      (cmd.shortcut ? '<span class="cpd-result-kbd">' + escapeHtml(cmd.shortcut) + '</span>' : '') +
      '</div>';
  });
  resultsEl.innerHTML = html;

  Array.prototype.forEach.call(resultsEl.querySelectorAll('.cpd-result'), function (el) {
    el.addEventListener('mouseenter', function () {
      activeIndex = parseInt(el.getAttribute('data-index'), 10);
      render();
    });
    el.addEventListener('click', runActive);
  });
}

function runActive() {
  var cmd = currentMatches[activeIndex];
  if (!cmd) return;
  input.value = cmd.name + ' \\u2713';
  input.style.color = '#a78bfa';
  setTimeout(function () {
    input.value = '';
    input.style.color = '';
    activeIndex = 0;
    render();
  }, 700);
}

input.addEventListener('input', function () {
  activeIndex = 0;
  render();
});

input.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, currentMatches.length - 1);
    render();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    render();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    runActive();
  } else if (e.key === 'Escape') {
    input.value = '';
    render();
    input.blur();
  }
});

tryBtn.addEventListener('click', function () {
  input.focus();
});

render();`,

  seo: {
    title: 'Hero with Interactive Command Palette Demo — Free HTML CSS JS Snippet',
    description: 'A developer-tool hero section with a fully working, keyboard-navigable Cmd+K command palette embedded right in the fold, complete with grouped results and match highlighting. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Command Palette Hero Demo — Live Cmd+K Search Embedded in the Hero Section',
      description: `Most product heroes describe a keyboard-driven command palette in a bullet point. This one lets a visitor actually use one, right in the fold — a real, working \`Cmd+K\`-style palette with grouped results, live substring filtering, match highlighting, and full arrow-key navigation, all before they've signed up for anything.

**A single \`render()\` function owns the entire palette state**

Rather than separately manipulating the DOM for filtering, highlighting, and active-item styling, one \`render()\` function reads the current input value, filters the \`commands\` array into \`currentMatches\`, and rebuilds the results list from scratch as an HTML string. This "re-render the whole list on every state change" approach — the same idea React popularized — keeps the DOM, the filtered data, and the active selection index from ever drifting out of sync with each other, because there's only one code path that produces the visible list.

**Match highlighting without a regex library**

\`highlight(text, query)\` finds the query's position with a plain \`indexOf\` on lowercased strings, then slices the original (correctly-cased) text into a before/match/after triple and wraps the matched slice in \`<mark>\`. Every slice is passed through \`escapeHtml()\` first — user-typed text is being inserted as HTML via \`innerHTML\`, so escaping \`&\`, \`<\`, and \`>\` prevents a visitor's own search query from being interpreted as markup.

**Grouped results via a "last group seen" tracker**

The commands array isn't pre-grouped into nested arrays; instead \`render()\` walks the flat, filtered list once and inserts a \`.cpd-group-label\` heading only when the current item's \`group\` differs from \`lastGroup\`. This keeps the source data flat and simple (just add a command with any \`group\` string) while still rendering correctly-grouped section headers, including when filtering removes an entire group from view.

**Keyboard navigation matches real palette conventions**

\`ArrowDown\`/\`ArrowUp\` move \`activeIndex\` and re-render (clamped so it can't go out of bounds), \`Enter\` calls \`runActive()\` on whichever command is currently active — regardless of whether it was reached by keyboard or mouse hover — and \`Escape\` clears the query. Hovering a result with the mouse also updates \`activeIndex\` and re-renders, so keyboard and mouse interaction always agree on which single item is "active" at any moment.

**"Running" a command is simulated, but the state machine is real**

\`runActive()\` swaps the input's value to show a checkmark confirmation, then resets everything after a short delay — there's no real navigation since this is a demo, but the selection, filtering, and active-index tracking are all fully functional, so the interaction pattern is exactly what you'd wire real navigation into.

**Customizing it**

Add real commands by extending the \`commands\` array with \`group\`, \`name\`, \`sub\`, \`icon\`, and \`shortcut\` fields — everything else (grouping, filtering, highlighting) works generically off that data. Replace \`runActive()\`'s checkmark simulation with real navigation (e.g. \`window.location.href\`) once wiring this into an actual app rather than a marketing demo.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click into the search box', text: 'Or click "Try it below" to focus the palette input automatically.' },
        { title: 'Type to filter commands', text: 'Try "set" or "invite" — matching results stay grouped and the matched text is highlighted.' },
        { title: 'Navigate with arrow keys', text: 'Press ArrowDown/ArrowUp to move the active selection; the highlighted row follows.' },
        { title: 'Press Enter to run a command', text: 'The input briefly shows a confirmation checkmark, then resets.' },
        { title: 'Edit the commands list', text: 'In the JS panel, edit the commands array — add group, name, sub, icon, and shortcut fields.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Fully working command palette with live substring filtering across a flat command list',
      'Results automatically grouped by category via a last-group-seen tracker, no nested data needed',
      'Match highlighting with a safe escapeHtml() pass to prevent typed queries from injecting markup',
      'Full keyboard navigation: ArrowUp/ArrowDown to move selection, Enter to run, Escape to clear',
      'Mouse hover and keyboard navigation share the same activeIndex, always in agreement',
      'Single render() function keeps filtered data, DOM, and active state from ever drifting apart',
      'Simulated command execution with a checkmark confirmation and auto-reset',
      'Keyboard-shortcut badges shown per command, matching real command palette conventions',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Developer tools and IDE-adjacent product pages', desc: 'Let a visitor feel the keyboard-driven speed of your product\'s command palette before they ever install it.' },
      { icon: 'FLOW', title: 'Productivity and workspace SaaS homepages', desc: 'Pair with a [feature tabs preview](/ui-snippets/hero-feature-tabs-preview/) further down the page for a second interactive proof point.' },
      { icon: 'FORM', title: 'Docs and changelog landing pages', desc: 'Reuse the same palette pattern as an actual working search across documentation pages.' },
      { icon: 'LEARN', title: 'Learn re-render-on-state-change UI patterns', desc: 'Study how one render() function keeps filtered results, grouping, and active selection consistent without a framework.' },
      { icon: 'DESIGN', title: 'Design system and component library sites', desc: 'Showcase a command palette component in situ as both documentation and a working demo simultaneously.' },
      { icon: 'CODE', title: 'Related: Search Bar Centerpiece Hero', desc: 'See the [Search Bar Centerpiece Hero](/ui-snippets/hero-search-bar-centerpiece/) for a simpler single-input alternative to this full palette.' },
    ],
    faqs: [
      { q: 'Is this a real functioning command palette or just a static mockup?', a: 'It is fully functional within the scope of a demo: typing filters real data, arrow keys move a real active selection, Enter triggers a real (simulated) command-run state, and Escape clears the query. The only thing that is not "real" is that runActive() shows a checkmark confirmation instead of performing actual navigation, since there is nowhere for a marketing demo to navigate to.' },
      { q: 'How does the palette decide which items belong to which group heading?', a: 'The commands array is flat with each entry carrying its own group string field. render() walks the filtered list once, tracking the group of the previously rendered item in a lastGroup variable, and only inserts a new .cpd-group-label heading when the current item\'s group differs from it — so grouping falls out naturally from the data order rather than needing pre-nested arrays.' },
      { q: 'Why does the highlight function pass every text slice through escapeHtml()?', a: 'The results list is built as an HTML string and inserted via innerHTML, and the query text driving the highlight comes directly from user input. Without escaping, a visitor typing characters like < or & into the search box could have those characters interpreted as HTML markup rather than displayed literally, which is a real (if low-stakes, client-side-only) injection risk.' },
      { q: 'Do keyboard navigation and mouse hover ever disagree about which item is active?', a: 'No — both update the same activeIndex variable and both call render() afterward, so whichever interaction happened most recently (a hover or an arrow key press) is reflected consistently in both the highlighted row and whichever item Enter would run.' },
      { q: 'How do I add a new command?', a: 'Add an object with group, name, sub, icon, and shortcut fields to the commands array at the top of the JS panel. The filtering, grouping, and highlighting logic all read from this array generically, so a new entry appears in search results and under the correct group heading automatically.' },
      { q: 'How would I wire this into a real app instead of a demo?', a: 'Replace the body of runActive() — currently a checkmark-and-reset simulation — with real logic per command, such as window.location.href = cmd.url for navigation commands or a function call for action commands. You would likely also want to add a url or action field to each entry in the commands array to drive that logic.' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the render cycle by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how render() keeps the filtered command list, the grouped headings, the highlighted match text, and the active-selection index all in sync from a single function call, and why every piece of user-typed text passes through escapeHtml() before being inserted via innerHTML. The same assistant can help you extend it — ask it to add fuzzy matching (so "gd" also matches "Go to Dashboard") instead of plain substring matching, persist recently-run commands to the top of the list using localStorage, or wire a real global Cmd+K / Ctrl+K keyboard shortcut listener on document that opens this palette as an actual modal overlay rather than an always-visible hero element. It's also useful for an accessibility review: ask whether the results list needs role="listbox" and aria-activedescendant so screen reader users get equivalent feedback to the sighted arrow-key navigation. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section in plain HTML, CSS, and vanilla JavaScript centered on a fully working command-palette search demo, styled like a Cmd+K launcher — no framework, no fuzzy-search library.

Requirements:
- A flat JavaScript array of command objects, each with a group name, a display name, a short subtitle, an icon character, and an optional keyboard shortcut label.
- A search input inside a palette-styled card. Typing must filter the array live via case-insensitive substring matching against each command's name, and results must render grouped under their group name as a heading — inserting a group heading only when the group changes as you walk the filtered, still-flat list, not from pre-nested data.
- Highlight the matched substring within each result's name using a <mark> element, built by slicing the original (correctly-cased) string around the lowercase match position — and pass every piece of text derived from the live search query through an HTML-escaping function before inserting it via innerHTML, since it comes from user input.
- Implement full keyboard navigation on the input: ArrowDown and ArrowUp move a single shared "active index" up and down through the currently filtered results (clamped at the bounds), Enter "runs" whichever result is currently active regardless of whether it was reached by keyboard or mouse hover, and Escape clears the search query.
- Hovering a result with the mouse must also update the same active-index state used by keyboard navigation, so the two interaction methods can never show two different items as "active" at once.
- Running a command should not perform real navigation (there is nothing to navigate to in a demo) — instead briefly show a confirmation state in the input (e.g. a checkmark) and then reset the input and selection after a short delay.
- Rebuild the entire results list from one single render function on every state change (typing, arrow key, hover, or run) rather than patching individual DOM nodes for each kind of change.`,
    },
  },
};

export default heroCommandPaletteSearchDemo;
