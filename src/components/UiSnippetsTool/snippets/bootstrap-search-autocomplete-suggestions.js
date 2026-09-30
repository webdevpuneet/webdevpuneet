const bootstrapSearchAutocompleteSuggestions = {
  id: 'bootstrap-search-autocomplete-suggestions',
  title: 'Bootstrap Search Autocomplete Suggestions',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="bsac-wrap position-relative">
    <input type="text" class="form-control form-control-lg" id="bsacInput" placeholder="Search fruits and vegetables..." autocomplete="off">
    <div class="list-group position-absolute w-100 shadow-sm d-none" id="bsacList"></div>
  </div>
</div>`,
  css: `.bsac-wrap { width: 420px; }
#bsacList { top: 100%; left: 0; z-index: 10; max-height: 260px; overflow-y: auto; }
#bsacList .list-group-item.active-suggestion { background-color: #f1f3f5; }
#bsacList mark { background-color: #fff3a3; padding: 0; }`,
  js: `const ITEMS = [
  'Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Broccoli',
  'Cabbage', 'Carrot', 'Cauliflower', 'Cherry', 'Cucumber', 'Date',
  'Eggplant', 'Fig', 'Grape', 'Guava', 'Kale', 'Kiwi', 'Lemon',
  'Lettuce', 'Mango', 'Mushroom', 'Onion', 'Orange', 'Papaya',
  'Peach', 'Pear', 'Pepper', 'Pineapple', 'Potato', 'Pumpkin',
  'Radish', 'Spinach', 'Strawberry', 'Tomato', 'Watermelon',
];

const input = document.getElementById('bsacInput');
const list = document.getElementById('bsacList');
let matches = [];
let activeIndex = -1;

function escapeRegExp(str) {
  return str.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
}

function highlight(text, query) {
  const re = new RegExp('(' + escapeRegExp(query) + ')', 'ig');
  return text.replace(re, '<mark>$1</mark>');
}

function render(query) {
  list.innerHTML = '';
  activeIndex = -1;

  if (!query) {
    list.classList.add('d-none');
    return;
  }

  if (matches.length === 0) {
    list.classList.remove('d-none');
    const empty = document.createElement('div');
    empty.className = 'list-group-item text-muted small';
    empty.textContent = 'No matches found for "' + query + '"';
    list.appendChild(empty);
    return;
  }

  matches.forEach((item, i) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'list-group-item list-group-item-action';
    row.innerHTML = highlight(item, query);
    row.dataset.index = String(i);
    row.addEventListener('click', () => selectItem(item));
    list.appendChild(row);
  });
  list.classList.remove('d-none');
}

function setActive(index) {
  const rows = Array.from(list.querySelectorAll('.list-group-item-action'));
  rows.forEach(r => r.classList.remove('active-suggestion'));
  if (index >= 0 && index < rows.length) {
    rows[index].classList.add('active-suggestion');
    rows[index].scrollIntoView({ block: 'nearest' });
  }
  activeIndex = index;
}

function selectItem(item) {
  input.value = item;
  list.classList.add('d-none');
  matches = [];
}

function closeList() {
  list.classList.add('d-none');
  activeIndex = -1;
}

input.addEventListener('input', () => {
  const query = input.value.trim();
  matches = query
    ? ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    : [];
  render(query);
});

input.addEventListener('keydown', e => {
  const rows = Array.from(list.querySelectorAll('.list-group-item-action'));
  if (list.classList.contains('d-none') || rows.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setActive(Math.min(activeIndex + 1, rows.length - 1));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setActive(Math.max(activeIndex - 1, 0));
  } else if (e.key === 'Enter') {
    if (activeIndex >= 0 && matches[activeIndex]) {
      e.preventDefault();
      selectItem(matches[activeIndex]);
    }
  } else if (e.key === 'Escape') {
    closeList();
  }
});

// Clicking anywhere outside the input/list closes the suggestion list,
// matching how native browser autocomplete dropdowns behave.
document.addEventListener('click', e => {
  if (!e.target.closest('.bsac-wrap')) closeList();
});`,

  seo: {
    title: 'Bootstrap Search Autocomplete Suggestions — Free Snippet',
    description: 'A live-filtered Bootstrap list-group with highlighted matches, arrow-key navigation, and a no-results state. Copy-paste or export to React, Vue & Angular.',
    about: {
      title: 'Bootstrap Search Autocomplete Suggestions — HTML, CSS & JavaScript',
      description: `Autocomplete only feels right when it behaves like a native browser dropdown, so this snippet builds a keystroke-filtered suggestion list on top of a plain Bootstrap \`form-control\` and a \`list-group\` positioned underneath it with \`position: absolute\`, \`top: 100%\`, and a \`z-index\` high enough to float above surrounding content. On every \`input\` event, the current query is matched case-insensitively against a hardcoded \`ITEMS\` array with \`.filter(item => item.toLowerCase().includes(...))\`, and each surviving match is rendered as a real Bootstrap \`list-group-item-action\` button rather than a plain \`<li>\`, so it gets Bootstrap's own hover and focus styling for free.\n\nMatching substrings are wrapped in \`<mark>\` by the \`highlight()\` function, which builds a case-insensitive \`RegExp\` from the query — after first passing it through \`escapeRegExp()\` so a query containing regex-special characters like \`.\` or \`(\` cannot throw or produce a broken pattern — and replaces matches with an HTML \`<mark>$1</mark>\` wrapper before the string is assigned via \`innerHTML\`. That escaping step is the non-obvious edge case this snippet specifically guards against: naively feeding raw user input into \`new RegExp()\` is a common source of runtime errors or unexpected matches the moment someone types a character like \`*\` or \`+\`.\n\nKeyboard navigation is handled entirely in one \`keydown\` listener on the input: ArrowDown and ArrowUp move an \`activeIndex\` up or down (clamped with \`Math.min\`/\`Math.max\` so it never runs past either end of the list) and \`setActive()\` applies an \`active-suggestion\` class to the corresponding row while calling \`scrollIntoView({ block: 'nearest' })\` so keyboard-selected rows scroll into view inside the scrollable dropdown without jumping the whole page. Enter commits whichever row is currently active by calling \`selectItem()\`, and Escape or a click anywhere outside \`.bsac-wrap\` (detected with \`e.target.closest('.bsac-wrap')\` on a document-level click listener) closes the dropdown, mirroring how native OS-level autocomplete dismisses itself.\n\nWhen no items match, the list still opens but shows a single muted "No matches found" row instead of staying empty or hidden, so the absence of results is communicated explicitly rather than looking like the search silently did nothing.\n\nRows are built as real \`<button type="button">\` elements rather than plain \`<div>\`s specifically so they remain focusable and clickable through native Bootstrap \`list-group-item-action\` hover/focus styling, and each is wired with its own \`click\` listener calling \`selectItem(item)\`, keeping mouse selection and keyboard selection funneled through the exact same function so the two input methods can never disagree about what "selecting" an item actually does.\n\nSwapping the hardcoded \`ITEMS\` array for a real API call only changes where the filtered list comes from — debounce the \`input\` listener with \`setTimeout\`/\`clearTimeout\` before firing a \`fetch\`, then render whatever the response returns through the exact same \`highlight()\` and keyboard-navigation code, since none of that logic cares whether the array was hardcoded or fetched.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A single search input is shown with no dropdown visible yet.' },
        { title: 'Type "ap"', text: 'A Bootstrap list-group dropdown opens beneath the input showing Apple, Apricot, and Grape, with the matching "ap" letters highlighted in yellow.' },
        { title: 'Press the Down arrow key', text: 'The first suggestion row gets a highlighted background indicating it is now the active keyboard selection.' },
        { title: 'Keep pressing Down and Up', text: 'The active row moves through the list and never wraps past the first or last suggestion.' },
        { title: 'Press Enter', text: 'The active suggestion fills the input and the dropdown closes.' },
        { title: 'Type "zzz"', text: 'The dropdown opens showing a muted "No matches found" message instead of staying empty.' },
        { title: 'Click outside the input', text: 'The dropdown closes immediately, the same way a native browser autocomplete list dismisses itself.' },
      ],
    },
    features: [
      'Real Bootstrap list-group-item-action rows for each suggestion, styled consistently with the rest of Bootstrap',
      'Case-insensitive substring filtering against a hardcoded JS array on every keystroke',
      'Matched text wrapped in <mark> tags for visual highlighting',
      'Regex-special characters in the query are escaped before building the highlight pattern',
      'Full keyboard navigation: ArrowUp/ArrowDown to move selection, Enter to select, Escape to close',
      'Explicit "No matches found" row instead of a silently empty dropdown',
      'Active row auto-scrolls into view within the scrollable list on keyboard navigation',
      'Dropdown closes automatically on outside click, matching native browser autocomplete behavior',
    ],
    useCases: [
      { icon: 'SEARCH', title: 'Site search boxes and command palettes', desc: 'The exact filtering and keyboard-navigation pattern used by most in-page search bars and quick-open menus.' },
      { icon: 'FORM', title: 'Tag, city, or country pickers in forms', desc: 'Swap the hardcoded ITEMS array for any dataset and reuse the same highlight-and-navigate behavior.' },
      { icon: 'NAV', title: 'Navigation search overlays', desc: 'Pair with something like [Breadcrumb Overflow Dropdown](/ui-snippets/bootstrap-breadcrumb-overflow-dropdown/) to help users jump directly to a page instead of clicking through breadcrumbs.' },
      { icon: 'LEARN', title: 'Learning keyboard-accessible dropdowns', desc: 'A clear reference for building the same kind of keyboard-driven list navigation used in [Pagination with Page Jump](/ui-snippets/bootstrap-pagination-page-jump/).' },
      { icon: 'CART', title: 'Product search in a storefront', desc: 'Use the same highlighted-match dropdown to help shoppers find items quickly before adding them to a cart, alongside a [User Menu Avatar Dropdown](/ui-snippets/bootstrap-user-menu-avatar-dropdown/) for account actions.' },
    ],
    faqs: [
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the query and activeIndex in useState (React), refs (Vue), or component properties (Angular), derive the filtered matches array on every keystroke inside the input handler, and render the list-group rows from that array with the framework\'s own list rendering instead of manually building DOM nodes — the highlight and keyboard-navigation logic stays the same, just triggered from framework event bindings.' },
      { q: 'Where does the suggestion data come from?', a: 'It is a hardcoded ITEMS array in the JavaScript for this demo — replace the filter step with a debounced fetch call to a real search API and keep the same rendering, highlighting, and keyboard-navigation logic downstream of it.' },
      { q: 'Is it safe to build the highlight regex directly from user input?', a: 'Only after escaping it — the escapeRegExp() function escapes regex-special characters like . * + ( ) before the query is used to build a RegExp, preventing both thrown errors and unintended pattern matches from special characters a user might type.' },
      { q: 'How does Enter know which item to select?', a: 'The keydown handler checks the current activeIndex maintained by the arrow-key handlers and looks up the corresponding item in the matches array, so Enter always selects whatever row currently has the active-suggestion highlight, or does nothing if no row is active yet.' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'Yes — swap the list-group and list-group-item-action classes for a Tailwind dropdown pattern like an absolutely positioned div with divide-y rows; the filtering, highlighting, and keyboard-navigation JavaScript needs no changes since it targets the rows by structure, not by Bootstrap-specific classes.' },
      { q: 'What happens if I clear the search input?', a: 'The input event handler sets matches to an empty array and render() immediately adds d-none back to the dropdown, hiding it entirely rather than showing an empty list-group.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add debounced fetching from a real search API in place of the hardcoded array, or to add a small icon per suggestion row (like a category badge) alongside the highlighted match text.`,
      prompt: `Build a Bootstrap 5.3 search autocomplete input using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A Bootstrap form-control input with a list-group dropdown absolutely positioned directly beneath it.
- On every keystroke, filter a hardcoded JavaScript array of strings case-insensitively by substring match and render each match as a list-group-item-action row.
- Wrap the matched substring in each result in a <mark> tag, safely escaping any regex-special characters in the typed query before building the highlight pattern.
- Support full keyboard navigation on the input: ArrowDown/ArrowUp move a highlighted active row (clamped at both ends), Enter selects the active row and fills the input, and Escape closes the dropdown.
- Show an explicit "No matches found" row when the query matches nothing, instead of leaving the dropdown empty or hidden.
- Close the dropdown automatically when the user clicks anywhere outside the input and list.`,
    },
  },
};

export default bootstrapSearchAutocompleteSuggestions;
