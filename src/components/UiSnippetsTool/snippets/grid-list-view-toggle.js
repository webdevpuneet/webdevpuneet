const gridListViewToggle = {
  id: 'grid-list-view-toggle',
  title: 'Grid / List View Toggle',
  category: 'layouts',
  html: `<div class="toolbar">
  <span class="toolbar-label">4 items</span>
  <div class="view-toggle" role="group" aria-label="Switch view layout">
    <button class="view-btn active" id="gridBtn" aria-pressed="true" aria-label="Grid view" onclick="setView('grid')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    </button>
    <button class="view-btn" id="listBtn" aria-pressed="false" aria-label="List view" onclick="setView('list')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </div>
</div>
<div class="item-container grid-view" id="itemContainer">
  <div class="item-card">
    <div class="item-thumb"></div>
    <div class="item-info"><h4>Wireless Headphones</h4><p>Noise-cancelling, 30hr battery</p><span class="item-price">$129</span></div>
  </div>
  <div class="item-card">
    <div class="item-thumb"></div>
    <div class="item-info"><h4>Mechanical Keyboard</h4><p>Hot-swappable switches</p><span class="item-price">$89</span></div>
  </div>
  <div class="item-card">
    <div class="item-thumb"></div>
    <div class="item-info"><h4>4K Webcam</h4><p>Auto-focus, wide angle</p><span class="item-price">$59</span></div>
  </div>
  <div class="item-card">
    <div class="item-thumb"></div>
    <div class="item-info"><h4>USB-C Hub</h4><p>7-in-1 dock</p><span class="item-price">$39</span></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; flex-direction: column; gap: 20px; }

.toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; width: 420px; max-width: 100%; }
.toolbar-label { font-size: 13px; color: #94a3b8; font-weight: 500; }

.view-toggle { display: flex; gap: 2px; background: #f1f5f9; padding: 3px; border-radius: 9px; }
.view-btn {
  width: 32px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #94a3b8;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.view-btn:hover { color: #475569; }
.view-btn.active { background: #fff; color: #6366f1; box-shadow: 0 1px 3px rgba(15,23,42,0.1); }

.item-container.grid-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  width: 420px;
  max-width: 100%;
}
.item-container.grid-view .item-card { flex-direction: column; }
.item-container.grid-view .item-thumb { width: 100%; aspect-ratio: 1.4; }

.item-container.list-view {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 420px;
  max-width: 100%;
}
.item-container.list-view .item-card { flex-direction: row; align-items: center; }
.item-container.list-view .item-thumb { width: 64px; height: 64px; flex-shrink: 0; }

.item-card {
  display: flex;
  gap: 12px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
}

.item-thumb { border-radius: 8px; background: linear-gradient(135deg, #6366f1, #a855f7); }

.item-info { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 3px; }
.item-info h4 { font-size: 13px; color: #1e293b; }
.item-info p { font-size: 12px; color: #94a3b8; }
.item-price { font-size: 13px; font-weight: 700; color: #6366f1; }`,
  js: `function setView(view) {
  const container = document.getElementById('itemContainer');
  container.classList.remove('grid-view', 'list-view');
  container.classList.add(view + '-view');

  document.getElementById('gridBtn').classList.toggle('active', view === 'grid');
  document.getElementById('gridBtn').setAttribute('aria-pressed', String(view === 'grid'));
  document.getElementById('listBtn').classList.toggle('active', view === 'list');
  document.getElementById('listBtn').setAttribute('aria-pressed', String(view === 'list'));
}`,

  seo: {
    title: 'Grid / List View Toggle — Free HTML CSS JS Layout Switcher Snippet',
    description: 'A two-button grid/list toggle that switches a card collection between a grid layout and a stacked list layout using a single CSS class swap. Vanilla JS, no re-render needed.',
    about: {
      title: 'Grid / List View Toggle — HTML, CSS & JavaScript Layout Switcher',
      description: `Product listings, file browsers, and search results commonly let users choose between a visual grid layout and a denser list layout. This snippet implements that switch with a single class swap on the shared container — the same card markup renders completely differently depending on whether \`.grid-view\` or \`.list-view\` is applied, with no JavaScript re-rendering of the actual items.

**How one class controls two layouts**

Every item uses identical markup: a \`.item-card\` containing a \`.item-thumb\` and an \`.item-info\` block. The *container* (\`#itemContainer\`) carries either \`.grid-view\` or \`.list-view\`. CSS descendant selectors like \`.item-container.grid-view .item-card { flex-direction: column }\` versus \`.item-container.list-view .item-card { flex-direction: row }\` change how each identical card lays out its own children, and the container itself switches between \`display: grid\` (grid mode) and \`display: flex; flex-direction: column\` (list mode). Because only the container's class changes, \`setView(view)\` never touches the individual item elements — no cloning, no re-rendering, no risk of losing scroll position or event listeners bound to specific cards.

**How the thumbnail resizes between modes**

In grid mode, the thumbnail is full width with a fixed \`aspect-ratio: 1.4\` so every card's image area is proportional regardless of card width. In list mode, the thumbnail shrinks to a fixed \`64px\` square and the card's \`flex-direction\` switches to \`row\`, turning what was a vertical stack (image on top, text below) into a horizontal row (small thumbnail on the left, text filling the rest) — again purely through the container-level class controlling which descendant selectors apply.

**How the toggle buttons stay in sync**

\`setView\` toggles the \`.active\` class and the \`aria-pressed\` attribute on both buttons together, so exactly one is always shown as active and screen readers correctly announce a toggle-button-group pattern (\`role="group"\` on the wrapper, \`aria-pressed\` per button) rather than an ambiguous pair of plain buttons.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Grid / List View Toggle" in the sidebar Library tab to load the item collection.' },
        { title: 'Switch views', text: 'Click the grid and list icons in the toolbar in the preview to see the layout swap instantly.' },
        { title: 'Swap in real content', text: 'Replace the .item-thumb gradients with real <img> tags and update the title/description/price text.' },
        { title: 'Persist the chosen view', text: 'Store the selected view in localStorage inside setView and restore it on page load.' },
        { title: 'Add a third view mode', text: 'Add a new CSS class like .compact-view with its own descendant rules, and extend setView to accept and apply it.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this toggle in a real product or file listing page.' },
      ],
    },
    features: [
      'Single container class swap re-lays-out identical card markup with zero re-rendering',
      'Grid mode uses CSS grid; list mode uses flex column — both driven by one class change',
      'Thumbnail size and card direction both respond automatically to the active mode',
      'Toggle buttons use role="group" and aria-pressed for correct assistive technology semantics',
      'Active button gets a raised white background against a muted toggle-group track',
      'No data loss or scroll-position reset when switching views since cards are never re-created',
      'Easy to extend with a third or fourth layout mode by adding another CSS class',
      'Works with any card content — text, price, image — with no per-item JavaScript logic',
    ],
    useCases: [
      { icon: 'SHOP', title: 'Product listing pages', desc: 'Let shoppers switch between a visual grid for browsing and a dense list for quick scanning and comparison.' },
      { icon: 'FLOW', title: 'File and document browsers', desc: 'Toggle between thumbnail grid view and detailed list view, similar to a desktop file manager.' },
      { icon: 'DASH', title: 'Search results and directories', desc: 'Apply the same toggle to search results, contact directories, or media libraries.' },
      { icon: 'LEARN', title: 'Learn container-level layout switching', desc: 'Study how descendant CSS selectors keyed off a single parent class can re-lay-out identical markup with no JS DOM manipulation of the items.' },
      { icon: 'ACCESS', title: 'Accessible toggle button groups', desc: 'See the role="group" plus aria-pressed pattern that correctly communicates a segmented view-switcher to screen readers.' },
      { icon: 'CODE', title: 'Related: Resizable Sidebar with Persisted Width', desc: 'See the [Resizable Sidebar with Persisted Width](/ui-snippets/resizable-sidebar-persisted-width/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does switching the view not require re-rendering the items?', a: 'Every card uses identical HTML markup regardless of the active view. Only the container\'s class changes between .grid-view and .list-view, and CSS descendant selectors scoped to that class control how each card\'s children are laid out — no JavaScript ever touches the individual item elements.' },
      { q: 'What CSS technique controls the thumbnail size difference between modes?', a: 'The .item-thumb rule is overridden separately for grid mode (full width, fixed aspect-ratio) and list mode (fixed 64px square), both scoped under .item-container.grid-view and .item-container.list-view respectively.' },
      { q: 'How do the two toggle buttons stay visually and semantically in sync?', a: 'setView toggles the .active class and the aria-pressed attribute on both buttons in the same call, so exactly one button always shows the active/raised styling and screen readers hear the correct pressed state for both.' },
      { q: 'Can I persist the user\'s chosen view across page loads?', a: 'Yes — save the view name to localStorage inside setView, and on page load read that value back and call setView with it before the user interacts with the toggle.' },
      { q: 'How would I add a third view mode, like a compact list?', a: 'Add a new class (e.g. .compact-view) with its own container and descendant CSS rules, add a third toggle button, and update setView to remove all view classes before adding whichever one was selected.' },
      { q: 'Does this toggle require any framework or state management library?', a: 'No — it is a single class swap driven by one small JavaScript function. It works equally well as a static HTML/CSS/JS component or embedded inside a React/Vue component\'s render output.' },
      { q: 'Is this toggle accessible to keyboard and screen reader users?', a: 'Yes — the wrapping div has role="group" with an aria-label describing its purpose, and each button reports its own pressed state via aria-pressed, which is the standard pattern for a mutually-exclusive toggle button group.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why this pattern only ever changes one class on the container rather than manipulating individual item elements, and what advantages that has for preserving scroll position, event listeners, and animation state compared to re-rendering the item list on every toggle. It's also a useful prompt for adding a smooth cross-fade or layout transition between the two modes using the View Transitions API or a manual opacity crossfade, since the base version switches instantly with no animation.`,
      prompt: `Build a "grid / list view toggle" in plain HTML, CSS, and vanilla JavaScript that switches a collection of item cards between a grid layout and a stacked list layout using only a single container class change — the individual card markup must never be re-created or re-rendered.

Requirements:
- A toolbar with two toggle buttons (grid icon, list icon) inside a wrapper with role="group" and an aria-label, where each button reports its state via aria-pressed and exactly one is shown as active at a time.
- A shared container holding several identical item cards (thumbnail + title + description + price), where the container itself carries either a "grid-view" or "list-view" class.
- CSS descendant selectors scoped to the container's active class must control the card's flex-direction and thumbnail sizing — grid mode should show a vertical card with a full-width thumbnail in a CSS grid layout, list mode should show a horizontal card with a small fixed-size thumbnail in a vertically stacked flex layout.
- One JavaScript function, setView(mode), that removes both view classes from the container, adds the requested one, and updates both toggle buttons' active class and aria-pressed attribute together.
- No cloning, re-rendering, or recreating of the item card elements when switching views — only the container's class should change.`,
    },
  },
};

export default gridListViewToggle;
