const bootstrapCommandPalette = {
  id: 'bootstrap-command-palette',
  title: 'Bootstrap Command Palette',
  lastmod: '2026-09-11',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscmd-card">
    <div class="card-body p-4 text-center">
      <p class="small text-muted mb-2">Press Ctrl+K (or Cmd+K on Mac), or click below.</p>
      <button type="button" class="btn btn-outline-secondary" id="bscmdOpen">
        Search commands <kbd class="ms-1">Ctrl</kbd><kbd>K</kbd>
      </button>
      <p class="small mt-3 mb-0" id="bscmdStatus">&nbsp;</p>
    </div>
  </div>
</div>

<div class="modal fade" id="bscmdModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bscmd-modal-content">
      <div class="p-2 border-bottom">
        <input type="text" class="form-control border-0 bscmd-input" id="bscmdInput" placeholder="Type a command...">
      </div>
      <ul class="list-unstyled mb-0 bscmd-list" id="bscmdList"></ul>
    </div>
  </div>
</div>`,
  css: `.bscmd-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bscmd-modal-content { border-radius: 14px; overflow: hidden; }
.bscmd-input:focus { box-shadow: none; }
.bscmd-list { max-height: 280px; overflow-y: auto; padding: 6px; }
.bscmd-item { display: flex; justify-content: space-between; padding: 9px 10px; border-radius: 8px; font-size: 13.5px; cursor: pointer; }
.bscmd-item-active { background: #eef0ff; color: #4338ca; }
.bscmd-item span.bscmd-hint { color: #9ca3af; font-size: 11.5px; }`,
  js: `const COMMANDS = [
  { label: 'Go to Dashboard', hint: 'Navigation' },
  { label: 'Create new project', hint: 'Action' },
  { label: 'Invite teammate', hint: 'Action' },
  { label: 'Open settings', hint: 'Navigation' },
  { label: 'Toggle dark mode', hint: 'Preference' },
  { label: 'View billing', hint: 'Navigation' },
  { label: 'Log out', hint: 'Account' },
];

const openBtn = document.getElementById('bscmdOpen');
const input = document.getElementById('bscmdInput');
const list = document.getElementById('bscmdList');
const status = document.getElementById('bscmdStatus');
const modalEl = document.getElementById('bscmdModal');
const modal = new bootstrap.Modal(modalEl);

let activeIndex = 0;
let visible = COMMANDS;

function render() {
  const q = input.value.trim().toLowerCase();
  visible = q ? COMMANDS.filter(c => c.label.toLowerCase().includes(q)) : COMMANDS;
  activeIndex = Math.min(activeIndex, Math.max(visible.length - 1, 0));

  list.innerHTML = visible.map((c, i) =>
    '<li class="bscmd-item' + (i === activeIndex ? ' bscmd-item-active' : '') + '" data-index="' + i + '">' +
    '<span>' + c.label + '</span><span class="bscmd-hint">' + c.hint + '</span></li>'
  ).join('') || '<li class="bscmd-item text-muted">No matching commands</li>';
}

function runCommand(cmd) {
  status.textContent = 'Ran: "' + cmd.label + '"';
  modal.hide();
}

function open() {
  input.value = '';
  activeIndex = 0;
  render();
  modal.show();
}

openBtn.addEventListener('click', open);

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    open();
  }
});

modalEl.addEventListener('shown.bs.modal', () => input.focus());

input.addEventListener('input', render);

input.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, visible.length - 1);
    render();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    render();
  } else if (e.key === 'Enter' && visible[activeIndex]) {
    runCommand(visible[activeIndex]);
  }
});

list.addEventListener('click', e => {
  const item = e.target.closest('.bscmd-item');
  if (item && visible[Number(item.dataset.index)]) runCommand(visible[Number(item.dataset.index)]);
});

render();`,

  seo: {
    title: 'Bootstrap Command Palette — Free HTML CSS JS Snippet',
    description: 'A real Ctrl+K command palette built on a genuine Bootstrap modal — live filtering, full arrow-key navigation with a wraparound-free active index, and Enter to run the highlighted command.',
    about: {
      title: 'Bootstrap Command Palette — HTML, CSS & JavaScript',
      description: `Filtering and keyboard navigation share one \`activeIndex\` and one \`visible\` array, both recomputed together inside \`render()\` — every keystroke re-filters \`COMMANDS\` into \`visible\`, then clamps \`activeIndex\` with \`Math.min(activeIndex, visible.length - 1)\` so a highlighted row can never point past the end of a list that just got shorter mid-search. Skipping that clamp is the single most common bug in a homemade command palette: filter down to two results while the fourth item was highlighted, and the highlight silently vanishes or throws trying to read an item that no longer exists.\n\nThe palette opens through two different triggers — clicking the button, or a global \`keydown\` listener checking \`(e.ctrlKey || e.metaKey) && e.key === 'k'\` — and both funnel through the same \`open()\` function, which resets the query and \`activeIndex\` before showing the modal, so a stale search from a previous session never lingers into the next one. Bootstrap's own \`shown.bs.modal\` event is what focuses the input, deliberately after the modal's own opening transition completes rather than immediately on open, since focusing an element still mid-transition can be unreliable across browsers.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Press Ctrl+K (or Cmd+K on Mac)', text: 'The palette opens as a real Bootstrap modal with the input already focused.' },
        { title: 'Type part of a command, like "dash"', text: 'The list filters live to just "Go to Dashboard".' },
        { title: 'Press the down arrow a few times', text: 'The highlighted row moves down the filtered list and never overshoots the last item.' },
        { title: 'Press Enter', text: 'The highlighted command runs, the palette closes, and a status message confirms which one.' },
        { title: 'Reopen and click a command directly instead', text: 'Clicking any row runs it exactly the same way pressing Enter on it would.' },
      ],
    },
    features: [
      'A genuine Ctrl+K / Cmd+K global keyboard shortcut, not just a clickable button',
      'activeIndex is re-clamped on every keystroke so it can never point past a shortened filtered list',
      'Full arrow-key navigation (Up/Down) plus Enter-to-run, with mouse click running the identical function',
      'Opening always resets the query and highlight, so no stale search state leaks between sessions',
      'Input focus is wired through Bootstrap\'s real shown.bs.modal event, after the open transition finishes',
    ],
    useCases: [
      { icon: 'DEV', title: 'Developer tools and internal admin panels', desc: 'The classic "power user" pattern — pairs with [bootstrap-keyboard-shortcut-help-modal](/ui-snippets/bootstrap-keyboard-shortcut-help-modal/) to document every available shortcut in one place.' },
      { icon: 'APP', title: 'SaaS dashboards with many destinations and actions', desc: 'A faster way to reach a deep settings page or trigger an action than navigating through several menus.' },
      { icon: 'LEARN', title: 'Learning keyboard-first UI patterns', desc: 'A complete, realistic example of the filter-plus-clamped-index technique every list-style keyboard navigator needs.' },
    ],
    faqs: [
      { q: 'Why clamp activeIndex instead of just resetting it to 0 on every filter?', a: 'Resetting to 0 on every keystroke would keep yanking the highlight back to the top while a user is trying to arrow down toward a specific item — clamping only intervenes when the current index has actually become invalid, preserving the user\'s position otherwise.' },
      { q: 'Does the Ctrl+K shortcut conflict with the browser\'s own shortcuts?', a: 'Ctrl+K is free in most browsers on most platforms (Firefox uses it for the search bar in older versions, which is the one real exception), which is why command palettes conventionally offer Cmd+K as the equivalent on Mac — e.preventDefault() stops the default browser behavior once the modal opens.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track query and activeIndex in component state, derive the filtered visible list in the render function, and attach the global keydown listener in a mount lifecycle hook (useEffect, onMounted) with cleanup on unmount.' },
      { q: 'How do I make a command actually navigate or perform an action?', a: 'Replace the status message inside runCommand() with a real router push, a function call, or a dispatched action — everything else (filtering, keyboard nav, modal lifecycle) is unrelated to what a command actually does when it runs.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to group commands into labeled sections (Navigation, Actions, Recent) the way many real command palettes do, or to add fuzzy matching so a query like "godb" still matches "Go to Dashboard".`,
      prompt: `Build a Bootstrap 5.3 command palette (Ctrl+K style), using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A global keydown listener that opens a real Bootstrap modal when Ctrl+K or Cmd+K is pressed, in addition to a visible trigger button.
- Inside the modal, a search input filters a list of at least 6 sample commands live on every keystroke (case-insensitive substring match on each command's label).
- Support ArrowUp/ArrowDown to move a highlighted active index through the currently filtered list, and Enter to run the highlighted command. The active index must be re-clamped after every filter so it can never point past the end of a shortened list.
- Clicking a command in the list runs it the same way pressing Enter on it would.
- Reset the query and active index every time the palette opens, and focus the input once the modal's own open transition has finished (via Bootstrap's shown.bs.modal event).`,
    },
  },
};

export default bootstrapCommandPalette;
