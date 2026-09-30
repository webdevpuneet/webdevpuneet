const sortDropdown = {
  id: 'sort-dropdown',
  title: 'Sort Dropdown',
  category: 'forms',
  html: `<div class="sort-wrap">
  <button class="sort-trigger" id="sortTrigger" aria-haspopup="listbox" aria-expanded="false" onclick="toggleSortMenu()">
    <span id="sortLabel">Sort: Relevance</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <ul class="sort-menu" id="sortMenu" role="listbox" aria-label="Sort options">
    <li role="option" aria-selected="true" data-value="Relevance" onclick="selectSort(this)">
      <span class="check">✓</span> Relevance
    </li>
    <li role="option" aria-selected="false" data-value="Price: Low to High" onclick="selectSort(this)">
      <span class="check"></span> Price: Low to High
    </li>
    <li role="option" aria-selected="false" data-value="Price: High to Low" onclick="selectSort(this)">
      <span class="check"></span> Price: High to Low
    </li>
    <li role="option" aria-selected="false" data-value="Newest" onclick="selectSort(this)">
      <span class="check"></span> Newest
    </li>
  </ul>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 60px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.sort-wrap { position: relative; display: inline-block; }

.sort-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.sort-trigger:hover { border-color: #94a3b8; }
.sort-trigger svg { transition: transform 0.15s; color: #94a3b8; }
.sort-trigger[aria-expanded="true"] svg { transform: rotate(180deg); }

.sort-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 220px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.12);
  list-style: none;
  padding: 6px;
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity 0.15s, transform 0.15s;
  z-index: 20;
}
.sort-menu.open { opacity: 1; transform: translateY(0); pointer-events: auto; }

.sort-menu li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  font-size: 13px;
  color: #475569;
  border-radius: 7px;
  cursor: pointer;
}
.sort-menu li:hover { background: #f1f5f9; }
.sort-menu li[aria-selected="true"] { color: #6366f1; font-weight: 600; }

.check { width: 14px; color: #6366f1; font-weight: 700; }`,
  js: `const trigger = document.getElementById('sortTrigger');
const menu = document.getElementById('sortMenu');
const label = document.getElementById('sortLabel');

function toggleSortMenu() {
  const isOpen = menu.classList.toggle('open');
  trigger.setAttribute('aria-expanded', String(isOpen));
}

function selectSort(item) {
  document.querySelectorAll('.sort-menu li').forEach(li => {
    li.setAttribute('aria-selected', 'false');
    li.querySelector('.check').textContent = '';
  });
  item.setAttribute('aria-selected', 'true');
  item.querySelector('.check').textContent = '✓';
  label.textContent = 'Sort: ' + item.dataset.value;
  toggleSortMenu();
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.sort-wrap')) {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
});`,

  seo: {
    title: 'Sort Dropdown — Free HTML CSS JS Custom Sort By Menu Snippet',
    description: 'A custom-styled "Sort by" dropdown with radio-style options and an active checkmark, replacing a native <select>. Click-outside and Escape-to-close included, vanilla JS.',
    about: {
      title: 'Sort Dropdown — HTML, CSS & JavaScript Custom Sort Menu',
      description: `A native \`<select>\` is accessible and simple, but it can't be styled beyond its trigger — the dropdown list itself renders using the operating system's own styles, which breaks visual consistency on a polished product page. This snippet replaces it with a fully custom "Sort by" dropdown: a styled trigger button and an absolutely-positioned menu of radio-style options, each showing a checkmark next to the currently active choice.

**How the open/close state works**

The trigger button toggles an \`.open\` class on the \`.sort-menu\` and mirrors that state in \`aria-expanded\` on the button itself. The menu is always present in the DOM (not conditionally rendered) but hidden via \`opacity: 0\`, a slight \`translateY(-6px)\` offset, and \`pointer-events: none\` when closed — this lets the open/close transition animate smoothly, since a menu that's actually removed from the DOM (\`display: none\`) can't transition.

**How the active option and checkmark stay in sync**

Each \`<li>\` carries \`role="option"\` and \`aria-selected\`. Clicking an option calls \`selectSort(item)\`, which first resets every option's \`aria-selected\` to \`"false"\` and clears its checkmark span, then sets the clicked item's \`aria-selected\` to \`"true"\` and fills in its checkmark character. The trigger's own label text is updated from \`item.dataset.value\`, so the visible button always reflects the true selected state stored on the DOM.

**How click-outside and Escape-to-close work**

A single \`click\` listener on \`document\` checks whether the click target is inside \`.sort-wrap\` using \`e.target.closest('.sort-wrap')\`. If not, the menu closes — this is the standard way to implement "click anywhere else closes the dropdown" without attaching a listener to every possible outside element. A parallel \`keydown\` listener closes the menu on \`Escape\`, which is expected behavior for any custom popup menu and is not something a native \`<select>\` needs since the browser already handles it.

**Why not just use \`<select>\`**

The native element remains the more accessible *default* choice for simple use cases. This custom version is for when a design system needs the dropdown menu itself — its spacing, checkmarks, hover states, and animation — to be fully brand-consistent, at the cost of reimplementing keyboard and outside-click handling yourself.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Sort Dropdown" in the sidebar Library tab to load the custom sort menu.' },
        { title: 'Open and select', text: 'Click the trigger in the preview, then click a sort option — notice the checkmark moves and the trigger label updates.' },
        { title: 'Test click-outside and Escape', text: 'Open the menu, then click elsewhere on the page or press Escape to confirm it closes both ways.' },
        { title: 'Add or rename options', text: 'Add a new <li role="option"> with a data-value attribute in the HTML panel — selectSort works for any number of options automatically.' },
        { title: 'Wire to real sorting logic', text: 'Inside selectSort, add a call to your actual list-sorting function using item.dataset.value to know which sort order was chosen.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this component in your product listing UI.' },
      ],
    },
    features: [
      'Fully custom-styled dropdown menu replacing a native <select> for complete visual control',
      'Radio-style single selection with a checkmark that moves to the active option',
      'aria-expanded, role="listbox", and aria-selected keep the menu screen-reader accessible',
      'Menu stays in the DOM and animates open/closed via opacity/transform, not display:none',
      'Single document-level click listener closes the menu on any outside click using closest()',
      'Escape key closes the menu, matching expected native dropdown behavior',
      'Trigger label text updates automatically from the selected option\'s data-value',
      'Chevron icon rotates 180 degrees to indicate open/closed state using one SVG',
    ],
    useCases: [
      { icon: 'SHOP', title: 'E-commerce sort-by controls', desc: 'Let shoppers reorder a product grid by price, relevance, or recency with a fully brand-styled menu.' },
      { icon: 'DASH', title: 'Table and dashboard sort controls', desc: 'Reuse the same pattern to sort a data table or dashboard widget by a chosen column or metric.' },
      { icon: 'FORM', title: 'Custom select replacements', desc: 'Use as a base pattern anywhere a design system requires a fully custom dropdown menu instead of a native select.' },
      { icon: 'LEARN', title: 'Learn accessible custom dropdown patterns', desc: 'Study how role="listbox"/role="option" plus aria-selected and aria-expanded replicate native select semantics.' },
      { icon: 'ACCESS', title: 'Click-outside and Escape handling', desc: 'See the standard closest()-based technique for detecting outside clicks without attaching listeners everywhere.' },
      { icon: 'FLOW', title: 'Filter menus in general', desc: 'Adapt the same open/close and single-select pattern for any custom filter or settings menu, not just sorting.' },
    ],
    faqs: [
      { q: 'Why build a custom dropdown instead of using a native <select>?', a: 'A native select cannot be styled beyond its closed trigger — the open option list uses the operating system\'s own rendering. A custom dropdown gives full control over spacing, hover states, checkmarks, and animation to match a design system exactly.' },
      { q: 'How does the checkmark move to the newly selected option?', a: 'selectSort first clears the checkmark text and aria-selected on every option, then sets aria-selected to true and writes a checkmark character into only the clicked option\'s check span.' },
      { q: 'How does clicking outside the menu close it?', a: 'A single click listener on the whole document checks whether the click target is inside the .sort-wrap container using e.target.closest(\'.sort-wrap\'). If the click landed outside that container, the menu\'s open class is removed.' },
      { q: 'Why does the menu stay in the DOM instead of being conditionally rendered?', a: 'Keeping the element in the DOM and toggling opacity/transform lets the open and close transitions animate smoothly. An element removed from the DOM (or set to display:none) cannot transition, so it would just appear and disappear instantly.' },
      { q: 'Is this accessible to keyboard and screen reader users?', a: 'The trigger has aria-haspopup and aria-expanded, the menu has role="listbox", and each option has role="option" and aria-selected, which mirrors native select semantics closely enough for most screen readers to announce state changes correctly. Escape closes the menu as expected.' },
      { q: 'How do I add a new sort option?', a: 'Add a new <li role="option" aria-selected="false" data-value="Your Label"> with a .check span inside the sort-menu <ul>. selectSort works for any number of options without changes.' },
      { q: 'How do I trigger an actual sort when an option is selected?', a: 'Add your own function call inside selectSort, using item.dataset.value to identify which sort order was picked, and call it after updating the label — e.g. applySortOrder(item.dataset.value).' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet to an AI assistant and ask it to explain why the menu is hidden with opacity/transform/pointer-events rather than display:none, and what breaks about the open/close animation if you swap to display:none. It's also a good prompt for adding full keyboard arrow-key navigation between options (moving a highlighted state up/down with ArrowUp/ArrowDown and selecting with Enter) to bring this closer to full native <select> keyboard parity, since the current version only supports mouse/touch selection plus Escape-to-close.`,
      prompt: `Build a custom "Sort by" dropdown in plain HTML, CSS, and vanilla JavaScript that replaces a native <select> element with fully custom-styled markup — no framework, no library.

Requirements:
- A trigger button showing the current sort label and a chevron icon that rotates when the menu is open, with aria-haspopup and aria-expanded attributes reflecting the open state.
- A menu of options (role="listbox" on the container, role="option" and aria-selected on each item) styled as a floating card below the trigger, hidden when closed using opacity, a small transform offset, and pointer-events:none (not display:none), so opening and closing can animate smoothly.
- Exactly one option must be selected at a time. Clicking an option must move a checkmark indicator to that option, clear it from all others, update aria-selected on all options accordingly, and update the trigger's visible label text to match the selected option.
- The menu must close when the user clicks anywhere outside the dropdown's wrapping element, implemented with a single document-level click listener using Element.closest(), not one listener per possible outside target.
- The menu must also close when the user presses the Escape key while it is open.`,
    },
  },
};

export default sortDropdown;
