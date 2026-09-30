const bootstrapMultiSelectDropdown = {
  id: 'bootstrap-multi-select-dropdown',
  title: 'Bootstrap Multi-Select Dropdown',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="dropdown bsms-wrap">
    <button class="btn btn-outline-dark dropdown-toggle w-100 text-start d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" id="bsmsToggle">
      <span id="bsmsSummary">Select skills</span>
    </button>
    <div class="dropdown-menu p-2 bsms-menu" aria-labelledby="bsmsToggle">
      <input type="text" class="form-control form-control-sm mb-2" id="bsmsSearch" placeholder="Search skills...">
      <div class="bsms-list" id="bsmsList">
        <div class="form-check" data-name="JavaScript">
          <input class="form-check-input bsms-check" type="checkbox" value="JavaScript" id="bsmsOpt1">
          <label class="form-check-label" for="bsmsOpt1">JavaScript</label>
        </div>
        <div class="form-check" data-name="Python">
          <input class="form-check-input bsms-check" type="checkbox" value="Python" id="bsmsOpt2">
          <label class="form-check-label" for="bsmsOpt2">Python</label>
        </div>
        <div class="form-check" data-name="React">
          <input class="form-check-input bsms-check" type="checkbox" value="React" id="bsmsOpt3">
          <label class="form-check-label" for="bsmsOpt3">React</label>
        </div>
        <div class="form-check" data-name="Vue">
          <input class="form-check-input bsms-check" type="checkbox" value="Vue" id="bsmsOpt4">
          <label class="form-check-label" for="bsmsOpt4">Vue</label>
        </div>
        <div class="form-check" data-name="Node.js">
          <input class="form-check-input bsms-check" type="checkbox" value="Node.js" id="bsmsOpt5">
          <label class="form-check-label" for="bsmsOpt5">Node.js</label>
        </div>
        <div class="form-check" data-name="SQL">
          <input class="form-check-input bsms-check" type="checkbox" value="SQL" id="bsmsOpt6">
          <label class="form-check-label" for="bsmsOpt6">SQL</label>
        </div>
        <div class="form-check" data-name="Docker">
          <input class="form-check-input bsms-check" type="checkbox" value="Docker" id="bsmsOpt7">
          <label class="form-check-label" for="bsmsOpt7">Docker</label>
        </div>
        <div class="small text-muted text-center py-2 d-none" id="bsmsNoResults">No matches found.</div>
      </div>
      <hr class="my-2">
      <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none" id="bsmsClear">Clear all</button>
    </div>
  </div>
</div>`,
  css: `.bsms-wrap { width: 320px; }
.bsms-menu { width: 100%; }
.bsms-list { max-height: 200px; overflow-y: auto; }
.bsms-list .form-check { padding-left: 1.75rem; padding-top: .25rem; padding-bottom: .25rem; }`,
  js: `const checkboxes = Array.from(document.querySelectorAll('.bsms-check'));
const summary = document.getElementById('bsmsSummary');
const search = document.getElementById('bsmsSearch');
const clearBtn = document.getElementById('bsmsClear');
const noResults = document.getElementById('bsmsNoResults');

function updateSummary() {
  const selected = checkboxes.filter(cb => cb.checked);
  if (selected.length === 0) {
    summary.textContent = 'Select skills';
  } else if (selected.length <= 2) {
    summary.textContent = selected.map(cb => cb.value).join(', ');
  } else {
    summary.textContent = selected.length + ' selected';
  }
}

checkboxes.forEach(cb => cb.addEventListener('change', updateSummary));

// Filters the checkbox rows by matching the search text against each row's
// data-name, hiding non-matching rows in place rather than re-rendering.
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;
  checkboxes.forEach(cb => {
    const row = cb.closest('.form-check');
    const name = row.dataset.name.toLowerCase();
    const matches = name.includes(query);
    row.classList.toggle('d-none', !matches);
    if (matches) visibleCount++;
  });
  noResults.classList.toggle('d-none', visibleCount !== 0);
});

clearBtn.addEventListener('click', () => {
  checkboxes.forEach(cb => { cb.checked = false; });
  updateSummary();
});

// data-bs-auto-close="outside" keeps the dropdown open while interacting
// with checkboxes and the search field, closing only on an outside click.
updateSummary();`,

  seo: {
    title: 'Bootstrap Multi-Select Dropdown — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 checkbox dropdown with a live search filter, a dynamic "N selected" summary label, and Clear all. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Multi-Select Dropdown — HTML, CSS & JavaScript',
      description: `This snippet deliberately avoids the native \`<select multiple>\` element, which requires Ctrl/Cmd-click to select more than one option and renders inconsistently across browsers. Instead it's a real Bootstrap \`.dropdown\` whose \`.dropdown-menu\` contains ordinary \`form-check\` checkbox rows — each one fully styled by Bootstrap's own checkbox CSS, not a custom widget. The critical attribute making this usable is \`data-bs-auto-close="outside"\` on the toggle button: by default Bootstrap closes a dropdown on any click inside it, which would slam the menu shut the instant a user tried to check a second box. Setting it to \`outside\` tells Bootstrap's own dropdown component to only close on a click genuinely outside the menu, so checking boxes and typing in the search field both keep the menu open.\n\nThe toggle button's label is driven by \`updateSummary()\`, called on every checkbox's \`change\` event: with nothing selected it reads "Select skills"; with one or two items selected it lists them by name (e.g. "React, Vue"); and beyond two it collapses to a count like "5 selected" so the button never grows unpredictably wide. This three-tier logic is a deliberate balance between showing useful detail for a small selection and staying compact for a large one.\n\nThe search field filters in place rather than re-rendering the list: on every \`input\` event, \`checkboxes.forEach\` reads each row's \`data-name\` attribute (set once in the HTML, matching the checkbox's own label), lowercases both the query and the name, and toggles Bootstrap's \`d-none\` class on the row based on \`name.includes(query)\`. Filtering by toggling visibility rather than removing and re-adding DOM nodes means checked state is never disturbed by typing in the search box — a user can check "React", search for "java" to find and check "JavaScript", then clear the search and see both selections still checked. A \`visibleCount\` counter tracked during that same loop drives a "No matches found." message, shown only when every row has been filtered out.\n\nClear all is a single handler that unchecks every box and calls \`updateSummary()\` directly, rather than requiring individual clicks — useful once a user has multiple selections and wants to start over without reopening the dropdown repeatedly. The dropdown menu itself is capped with \`max-height: 200px\` and \`overflow-y: auto\` on \`.bsms-list\`, so a longer option list scrolls internally instead of pushing the page layout around or overflowing the viewport.\n\nEach checkbox is wired to \`updateSummary()\` individually through a single shared \`checkboxes.forEach(cb => cb.addEventListener('change', updateSummary))\` loop rather than one listener per option written out by hand, so adding an eighth or ninth skill to the list requires no new JavaScript at all — the existing loop picks up any \`.bsms-check\` element present in the DOM at load time. The search filter reads each row's name from a \`data-name\` attribute set once in the markup rather than reading the checkbox's associated \`<label>\` text at filter time, which keeps the filtering logic decoupled from the exact DOM structure of the label and avoids any risk of matching against unrelated markup that might later be added inside a row, such as an icon or a badge next to the skill name.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A dropdown button reading "Select skills" appears; nothing is selected yet.' },
        { title: 'Click the button', text: 'A menu opens showing a search box and a scrollable list of skill checkboxes.' },
        { title: 'Check "React" and "Vue"', text: 'The menu stays open after each click, and the button label updates live to "React, Vue".' },
        { title: 'Check three or more boxes', text: 'The button label switches to a compact count, e.g. "4 selected", instead of listing every name.' },
        { title: 'Type "sql" into the search field', text: 'The list narrows to just the matching row in place, without losing any of your existing checked selections.' },
        { title: 'Click Clear all', text: 'Every checkbox unchecks at once and the button label resets to "Select skills".' },
      ],
    },
    features: [
      'Real Bootstrap dropdown-menu containing form-check checkboxes, not a native multi-select element',
      'data-bs-auto-close="outside" keeps the menu open while checking boxes or typing in search',
      'Dynamic summary label: names selections directly for 1-2 items, collapses to "N selected" beyond that',
      'Live in-place search filter using data-name attributes and Bootstrap\'s d-none, preserving checked state',
      '"No matches found" message shown only when the filter hides every row',
      'Clear all button resets every checkbox and the summary label in one action',
      'Internally scrolling option list (max-height + overflow-y) that never pushes the page layout',
      'Filtering never re-renders or removes checkbox DOM nodes, so selection state can never be lost while typing',
    ],
    useCases: [
      { icon: 'FORM', title: 'Filtering tables or lists by multiple categories', desc: 'Combine with [bootstrap-sortable-data-table](/ui-snippets/bootstrap-sortable-data-table/) to let users filter rows by several tags or statuses at once.' },
      { icon: 'FORM', title: 'Job or profile forms collecting multiple skills/interests', desc: 'A cleaner alternative to a long list of standalone checkboxes for tag-style multi-selection in signup or profile forms.' },
      { icon: 'SEARCH', title: 'Search interfaces with faceted filters', desc: 'Pairs naturally with [bootstrap-responsive-navbar-search](/ui-snippets/bootstrap-responsive-navbar-search/) as an advanced filter panel alongside a main search bar.' },
      { icon: 'APP', title: 'Admin tools assigning multiple roles or permissions', desc: 'Use the same checkbox-in-dropdown pattern for assigning multiple roles to a user inside a [bootstrap-admin-dashboard-sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/)-style interface.' },
      { icon: 'LEARN', title: 'Learning Bootstrap dropdown auto-close behavior', desc: 'A focused example of the data-bs-auto-close="outside" option, which is easy to miss but essential for any interactive dropdown content.' },
    ],
    faqs: [
      { q: 'Why not just use a native <select multiple> element?', a: 'A native multi-select requires holding Ctrl or Cmd while clicking to select more than one option, which many users don\'t know to do, and its default styling is inconsistent and hard to customize across browsers. A checkbox dropdown is discoverable, keeps every option visible, and is fully styleable with ordinary Bootstrap form-check classes.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, track selected values in a Set inside useState and compute the summary text from its size on render, using Bootstrap\'s data-bs-auto-close attribute unchanged in JSX; in Vue, bind checkboxes with v-model to an array; in Angular, use reactive forms with a FormArray of checkbox controls and compute the summary in the component class.' },
      { q: 'Does searching lose my current checkbox selections?', a: 'No — the search filter only toggles a d-none class on non-matching rows; it never removes, re-creates, or unchecks any checkbox, so clearing the search field afterward reveals all previously checked items still checked.' },
      { q: 'Why does the dropdown stay open when I click a checkbox?', a: 'The toggle button has data-bs-auto-close="outside" set, which is a real Bootstrap 5.3 dropdown configuration option instructing it to close only on a click outside the menu, rather than the default behavior of closing on any click inside it.' },
      { q: 'How would I restyle this with Tailwind?', a: 'Keep the dropdown structure and JS logic unchanged, then replace .dropdown-menu with an absolutely positioned Tailwind panel (absolute mt-2 w-full rounded-lg border bg-white shadow-lg p-2) and swap form-check for a Tailwind-styled checkbox and label pairing.' },
      { q: 'Can I preselect some options when the page loads?', a: 'Yes — add the checked attribute to any checkbox in the initial HTML, then call updateSummary() once on load (as this snippet already does at the bottom of its JS) so the button label reflects the preselected items immediately.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a "Select all visible" action that respects the current search filter, or to persist the selection to localStorage across page reloads. It's also worth asking for keyboard navigation (arrow keys moving focus between checkboxes) inside the open menu.`,
      prompt: `Build a Bootstrap 5.3 multi-select dropdown using checkboxes, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) and its actual dropdown component with data-bs-toggle="dropdown", not custom CSS made to resemble Bootstrap.

Requirements:
- A dropdown toggle button whose label dynamically summarizes the selection: default text when nothing is selected, the actual item names when 1-2 are selected, and a count like "5 selected" beyond that.
- The dropdown-menu must contain a list of Bootstrap form-check checkboxes, and must use data-bs-auto-close="outside" so the menu does not close when a checkbox or the search input inside it is clicked.
- Include a text input inside the dropdown menu that live-filters the checkbox list as the user types, hiding non-matching rows in place (never removing or re-creating checkbox elements, so checked state is preserved while filtering).
- Show a "No matches found" message only when the filter hides every option.
- Include a "Clear all" action that unchecks every checkbox and resets the summary label in one click.
- The option list must scroll internally past a fixed height rather than growing the page.`,
    },
  },
};

export default bootstrapMultiSelectDropdown;
