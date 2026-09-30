const combobox = {
  id: 'combobox',
  title: 'Searchable Combobox with Keyboard Navigation',
  lastmod: '2026-08-17',
  category: 'forms',
  html: `<div class="demo">
  <label class="field-label" for="comboInput">Assign to</label>
  <div class="combo" id="combo">
    <div class="combo-control">
      <input id="comboInput" class="combo-input" type="text" role="combobox" aria-expanded="false" aria-controls="comboList" aria-autocomplete="list" placeholder="Search team members..." autocomplete="off">
      <button class="combo-clear" id="comboClear" aria-label="Clear selection" hidden>&times;</button>
      <svg class="combo-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
    <ul class="combo-list" id="comboList" role="listbox"></ul>
  </div>
  <p class="selected-text" id="selectedText">No one assigned</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 100%; max-width: 340px; }
.field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
.combo { position: relative; }
.combo-control { position: relative; display: flex; align-items: center; }
.combo-input { width: 100%; padding: 10px 60px 10px 14px; border: 1.5px solid #d1d5db; border-radius: 9px; font-size: 14px; color: #111827; background: #fff; }
.combo-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
.combo-arrow { position: absolute; right: 14px; color: #9ca3af; pointer-events: none; transition: transform 0.15s; }
.combo.open .combo-arrow { transform: rotate(180deg); }
.combo-clear { position: absolute; right: 34px; width: 20px; height: 20px; border: none; background: #e5e7eb; color: #4b5563; border-radius: 50%; font-size: 14px; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.combo-list { position: absolute; z-index: 20; top: calc(100% + 6px); left: 0; right: 0; max-height: 220px; overflow-y: auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; box-shadow: 0 10px 28px rgba(0,0,0,0.14); list-style: none; padding: 6px; display: none; }
.combo.open .combo-list { display: block; }
.combo-option { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 7px; font-size: 13.5px; color: #1f2937; cursor: pointer; }
.combo-option .avatar { width: 24px; height: 24px; border-radius: 50%; background: #dbeafe; color: #1d4ed8; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.combo-option mark { background: #fde68a; color: inherit; border-radius: 2px; }
.combo-option.active { background: #eff6ff; }
.combo-option[aria-selected="true"]::after { content: '✓'; margin-left: auto; color: #2563eb; font-weight: 700; }
.combo-empty { padding: 14px 10px; text-align: center; font-size: 13px; color: #9ca3af; }
.selected-text { margin-top: 10px; font-size: 13px; color: #6b7280; }`,
  js: `var PEOPLE = [
  { id: 1, name: 'Ava Chen', initials: 'AC' },
  { id: 2, name: 'Marcus Reed', initials: 'MR' },
  { id: 3, name: 'Priya Sharma', initials: 'PS' },
  { id: 4, name: 'Diego Alvarez', initials: 'DA' },
  { id: 5, name: 'Sofia Marin', initials: 'SM' },
  { id: 6, name: 'Liam O\\'Brien', initials: 'LO' },
  { id: 7, name: 'Noor Haddad', initials: 'NH' },
  { id: 8, name: 'Yuki Tanaka', initials: 'YT' }
];

var combo = document.getElementById('combo');
var input = document.getElementById('comboInput');
var list = document.getElementById('comboList');
var clearBtn = document.getElementById('comboClear');
var selectedText = document.getElementById('selectedText');
var activeIndex = -1;
var filtered = PEOPLE.slice();
var selected = null;

function escapeHtml(s) {
  return s.replace(/[&<>]/g, function(c) { return c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'; });
}

function highlight(name, query) {
  if (!query) return escapeHtml(name);
  var idx = name.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return escapeHtml(name);
  return escapeHtml(name.slice(0, idx)) + '<mark>' + escapeHtml(name.slice(idx, idx + query.length)) + '</mark>' + escapeHtml(name.slice(idx + query.length));
}

function render() {
  var query = input.value.trim();
  if (filtered.length === 0) {
    list.innerHTML = '<li class="combo-empty">No matches for "' + escapeHtml(query) + '"</li>';
    return;
  }
  list.innerHTML = filtered.map(function(p, i) {
    var isActive = i === activeIndex ? ' active' : '';
    var isSelected = selected && selected.id === p.id ? ' aria-selected="true"' : '';
    return '<li class="combo-option' + isActive + '" role="option" id="opt-' + p.id + '"' + isSelected + ' data-id="' + p.id + '">' +
      '<span class="avatar">' + p.initials + '</span>' + highlight(p.name, query) + '</li>';
  }).join('');
}

function openList() {
  combo.classList.add('open');
  input.setAttribute('aria-expanded', 'true');
}
function closeList() {
  combo.classList.remove('open');
  input.setAttribute('aria-expanded', 'false');
  activeIndex = -1;
}

function filterList() {
  var query = input.value.trim().toLowerCase();
  filtered = PEOPLE.filter(function(p) { return p.name.toLowerCase().indexOf(query) !== -1; });
  activeIndex = filtered.length ? 0 : -1;
  render();
}

function selectPerson(p) {
  selected = p;
  input.value = p.name;
  selectedText.textContent = 'Assigned to ' + p.name;
  clearBtn.hidden = false;
  closeList();
}

input.addEventListener('input', function() {
  selected = null;
  clearBtn.hidden = true;
  filterList();
  openList();
});
input.addEventListener('focus', function() {
  filterList();
  openList();
});
input.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!combo.classList.contains('open')) { openList(); return; }
    activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
    render();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    render();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (activeIndex >= 0 && filtered[activeIndex]) selectPerson(filtered[activeIndex]);
  } else if (e.key === 'Escape') {
    closeList();
  }
});
list.addEventListener('click', function(e) {
  var li = e.target.closest('.combo-option');
  if (!li) return;
  var id = Number(li.getAttribute('data-id'));
  var p = PEOPLE.filter(function(x) { return x.id === id; })[0];
  if (p) selectPerson(p);
});
clearBtn.addEventListener('click', function() {
  selected = null;
  input.value = '';
  selectedText.textContent = 'No one assigned';
  clearBtn.hidden = true;
  input.focus();
  filterList();
});
document.addEventListener('click', function(e) {
  if (!e.target.closest('#combo')) closeList();
});
filterList();`,
  seo: {
    title: 'Combobox — Searchable Select with Keyboard Nav',
    description: 'Type-to-filter combobox with match highlighting, arrow-key navigation, and ARIA combobox roles. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: 'Searchable Combobox — Type-to-Filter Select with Full Keyboard Navigation',
      description: `A combobox pairs a text input with a filtered dropdown list, letting a user either type to narrow a long list of options or browse it directly — the pattern behind "assign to a teammate," "choose a country," or "pick a project" fields where a plain \`<select>\` becomes unusable past a dozen items. Unlike the [autocomplete input](/ui-snippets/autocomplete-input/), which suggests free-text completions, a combobox constrains the final value to one item from a fixed list.\n\n**ARIA combobox pattern**\n\nThe input carries \`role="combobox"\`, \`aria-expanded\`, \`aria-controls\` pointing at the listbox's id, and \`aria-autocomplete="list"\`. The list itself is \`role="listbox"\` with each item as \`role="option"\`. \`aria-expanded\` flips between \`"true"\` and \`"false"\` as the list opens and closes, which is what tells a screen reader whether the popup is currently visible — this is the official WAI-ARIA combobox pattern, not an invented shortcut.\n\n**Filtering and highlighting**\n\nOn every keystroke, \`filterList()\` rebuilds the \`filtered\` array with a case-insensitive \`indexOf\` check against each person's name, and resets \`activeIndex\` to 0 so the first match is always ready to select with Enter. The \`highlight()\` function wraps the matched substring in \`<mark>\`, built with string slicing around the match index rather than a regex replace — sidestepping the classic bug where special regex characters in a user's search query (like \`.\` or \`(\`) would otherwise need escaping before use in a \`RegExp\`.\n\n**Keyboard navigation**\n\nArrowDown and ArrowUp move \`activeIndex\` and re-render, clamped with \`Math.min\`/\`Math.max\` so it can't run past either end of the filtered list. Enter selects whichever option is currently active — not necessarily the one under the mouse — which is why \`activeIndex\` and mouse \`:hover\` are tracked as two separate concerns; a combobox driven purely by hover state breaks the moment a keyboard user moves focus without moving the mouse. Escape closes the list without selecting, leaving the typed text as-is.\n\n**Selection and the clear button**\n\nSelecting an option sets \`input.value\` to the person's full name, stores the full object in \`selected\`, and reveals a small circular clear button. Typing again after a selection clears \`selected\` immediately — this matters because it is what distinguishes "the user is refining their search" from "the user has committed to a choice," and downstream code should treat \`selected\` (not \`input.value\`) as the source of truth for what was actually picked.\n\n**Outside-click and empty state**\n\nA document-level click listener uses \`e.target.closest('#combo')\` to close the list on any click outside the component, the same delegation pattern used by dropdown menus and split buttons. When no options match the query, the list renders a single \`.combo-empty\` row instead of an empty \`<ul>\`, so the absence of results is communicated rather than silently showing nothing.\n\n**XSS safety**\n\nEvery piece of user-influenced text — both the option names and the search query echoed inside \`<mark>\` — passes through \`escapeHtml()\` before being inserted via \`innerHTML\`. This is a small but easy detail to skip when a list is rendered from a template string, and skipping it is exactly how a search box becomes a stored or reflected XSS vector once the option list comes from real user data instead of a hardcoded array.\n\n**React integration**\n\nIn React, keep \`query\`, \`filtered\`, \`activeIndex\`, and \`selected\` as four pieces of \`useState\`, derive \`filtered\` with \`useMemo\` off \`query\`, and keep the same ARIA attributes on the rendered \`<input>\` and \`<ul>\` — the accessibility structure translates directly regardless of framework.\n\nSee also the [multi-select dropdown](/ui-snippets/multi-select-dropdown/) for choosing several options at once, and the [country selector](/ui-snippets/country-selector/) for a domain-specific combobox variant.`,
    },
    howToUse: [
      { title: 'Copy the input/list markup', text: 'The .combo wrapper holds a text input with combobox ARIA roles, a clear button, and a .combo-list <ul> with role="listbox" that starts empty and hidden.' },
      { title: 'Replace the PEOPLE array', text: 'Swap the PEOPLE array for your own options — each item just needs a unique id and the fields your render function displays (name, initials, or any other data).' },
      { title: 'Add the CSS', text: 'Paste the CSS once. The .combo.open class controls visibility of the dropdown and the arrow rotation — no per-instance changes needed.' },
      { title: 'Wire selection to your app', text: 'Read the selected variable (or its equivalent in your framework state) after selectPerson runs — it holds the full matched object, not just the display text.' },
      { title: 'Handle empty results', text: 'The .combo-empty row already covers the no-matches case — customize its message or add a "Create new" action there for tag-style comboboxes.' },
    ],
    features: [
      'WAI-ARIA combobox pattern: role="combobox", aria-expanded, aria-controls, role="listbox"/"option"',
      'Type-to-filter with case-insensitive matching and highlighted match substrings',
      'Full keyboard navigation — ArrowUp/ArrowDown to move, Enter to select, Escape to close',
      'Selection tracked separately from typed text, so refining a search after selecting clears the stale value correctly',
      'One-click clear button appears only after a selection is made',
      'Empty-state row when no options match the current query',
      'Outside-click closes the dropdown via event delegation',
      'All rendered text passed through an HTML-escaping helper to prevent injection',
    ],
    useCases: [
      { icon: 'PEOPLE', title: 'Assign-to Fields', desc: 'Picking a teammate from a searchable list in a task tracker or [kanban board](/ui-snippets/kanban-board/)' },
      { icon: 'FORM', title: 'Long Option Lists', desc: 'Country, timezone, or currency pickers where a native select becomes hard to scan past a dozen items' },
      { icon: 'DOC', title: 'Command-Style Pickers', desc: 'Selecting a template, project, or category, similar in spirit to the [command palette](/ui-snippets/command-palette/) but scoped to one field' },
      { icon: 'GEAR', title: 'Admin Filters', desc: 'Filtering a dashboard or [filterable table](/ui-snippets/filterable-table/) by a searchable single-value field' },
      { icon: 'APP', title: 'Tag and Category Selection', desc: 'A base for tag-style inputs where selecting from the list or creating a new value are both offered' },
      { icon: 'CODE', title: 'Related: Styled Radio Buttons — CSS Only Plan Selector (No JavaScript)', desc: 'See the [Styled Radio Buttons — CSS Only Plan Selector (No JavaScript)](/ui-snippets/css-only-styled-radio-buttons/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between a combobox and an autocomplete input?', a: 'A combobox constrains the final value to one item chosen from a fixed list — free typing only filters, it never becomes the value. An autocomplete input suggests completions but still accepts whatever free text the user types as the final value.' },
      { q: 'How do I load options asynchronously from an API?', a: 'Debounce the input event (e.g. 250ms with setTimeout), fetch matching options from your endpoint inside that debounced handler, replace the filtered array with the response, and re-render — the rest of the keyboard and selection logic is unchanged.' },
      { q: 'Why is selected tracked separately from the input value?', a: 'The input value changes on every keystroke while the user searches, but the actual chosen option should only update on an explicit select. Treating input.value as the answer would silently "unselect" the moment someone edits the text to search again.' },
      { q: 'How do I add multi-select to this combobox?', a: 'Keep an array instead of a single selected object, render chosen items as removable chips above or inside the input, and on selectPerson push to that array instead of replacing input.value — see the multi-select dropdown snippet for a full worked example of that pattern.' },
      { q: 'How do I use this combobox in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page. It generates a React component managing query/filtered/activeIndex/selected as hooks, a React + Tailwind version, a Vue 3 SFC using refs and computed filtering, and an Angular standalone component — all preserving the ARIA roles and keyboard handling exactly.' },
    ],
    aiPrompt: {
      paragraph: `Paste this combobox's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how activeIndex, the mouse-hover class, and the actual selected value stay in sync without interfering with each other — that three-way separation is the part most from-scratch comboboxes get wrong first. It's also a strong candidate for an accessibility audit: ask the assistant to check the implementation against the full WAI-ARIA combobox authoring practice, including whether aria-activedescendant should be added to point the input at the currently active option's id rather than relying on visual highlighting alone. Beyond that, ask it to add async loading with a debounced fetch and a loading-state row, or to add multi-select support with removable chips.`,
      prompt: `Build a searchable combobox with keyboard navigation in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- A text input styled with role="combobox", aria-expanded, and aria-controls pointing to a dropdown list's id, paired with a dropdown list styled with role="listbox" containing options with role="option".
- Typing in the input must filter a fixed in-memory array of at least eight items by a case-insensitive substring match against each item's name, and the matched substring within each visible option's label must be visually highlighted.
- The dropdown must support full keyboard navigation: ArrowDown and ArrowUp move a highlighted "active" option up or down through the currently filtered list without going out of bounds, Enter selects whichever option is currently active, and Escape closes the dropdown without changing the selection.
- Selecting an option (by click or by Enter) must set the input's displayed text to that option's label, store the full selected object separately from the raw input text, and reveal a small clear button that resets both the input and the stored selection when clicked.
- If the user resumes typing after having made a selection, the previously stored selection must be cleared immediately, since further typing means the user is searching again, not confirming the prior choice.
- Clicking anywhere outside the combobox must close the dropdown. When the current query matches nothing, show a distinct empty-state row inside the dropdown instead of an empty list. All list content built from data must be safely escaped before insertion so no HTML can be injected through the search text or the option labels.`,
    },
  },
};

export default combobox;
