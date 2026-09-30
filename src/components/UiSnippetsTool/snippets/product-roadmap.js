const productRoadmap = {
  id: 'product-roadmap',
  title: 'Product Roadmap Board',
  category: 'dashboards',
  html: `<div class="wrap">
  <div class="board-header">
    <div>
      <h1 class="board-title">Product Roadmap</h1>
      <p class="board-sub">Vote on what we build next</p>
    </div>
    <div class="legend">
      <span class="dot planned"></span>Planned
      <span class="dot progress"></span>In Progress
      <span class="dot shipped"></span>Shipped
    </div>
  </div>
  <div class="board" id="board"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 32px 20px; }
.wrap { max-width: 980px; margin: 0 auto; }
.board-header { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
.board-title { font-size: 24px; font-weight: 900; color: #0f172a; }
.board-sub { font-size: 14px; color: #64748b; margin-top: 4px; }
.legend { display: flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 600; color: #64748b; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dot.planned { background: #e2e8f0; border: 2px solid #94a3b8; }
.dot.progress { background: #6366f1; }
.dot.shipped { background: #22c55e; }
.board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
.col { background: #f1f5f9; border-radius: 16px; padding: 16px; }
.col-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.col-label { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
.col-count { background: #e2e8f0; color: #64748b; font-size: 12px; font-weight: 800; padding: 2px 8px; border-radius: 10px; }
.items { display: flex; flex-direction: column; gap: 10px; }
.item { background: #fff; border-radius: 12px; padding: 14px 16px; border: 1.5px solid #e2e8f0; transition: box-shadow 0.15s; }
.item:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
.item-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
.item-title { font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.35; }
.item-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 7px; border-radius: 5px; flex-shrink: 0; }
.tag-bug { background: #fee2e2; color: #dc2626; }
.tag-feature { background: #ede9fe; color: #7c3aed; }
.tag-perf { background: #dbeafe; color: #1d4ed8; }
.tag-ux { background: #fef3c7; color: #b45309; }
.item-desc { font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 10px; }
.item-footer { display: flex; align-items: center; justify-content: space-between; }
.vote-btn { display: flex; align-items: center; gap: 6px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 5px 10px; cursor: pointer; font-size: 13px; font-weight: 700; color: #475569; transition: all 0.15s; font-family: inherit; }
.vote-btn.voted { background: #ede9fe; border-color: #c4b5fd; color: #6d28d9; }
.vote-btn:hover:not(.voted) { border-color: #94a3b8; }
.vote-count { font-variant-numeric: tabular-nums; }
.arrow { font-size: 11px; }
.quarter { font-size: 11px; color: #94a3b8; font-weight: 600; }
.shipped-check { color: #22c55e; font-size: 15px; }`,
  js: `var columns = [
  {
    id: 'planned', label: 'Planned', color: '#94a3b8',
    items: [
      { id:1, title:'Dark mode support', tag:'feature', desc:'System-aware dark/light mode with manual override toggle in settings.', votes:142, quarter:'Q3 2026', voted:false },
      { id:2, title:'CSV bulk import', tag:'feature', desc:'Upload a CSV to create or update hundreds of records in one operation.', votes:98, quarter:'Q3 2026', voted:false },
      { id:3, title:'Custom webhook events', tag:'feature', desc:'Subscribe to any entity change event and receive a real-time webhook payload.', votes:76, quarter:'Q4 2026', voted:false },
    ]
  },
  {
    id: 'progress', label: 'In Progress', color: '#6366f1',
    items: [
      { id:4, title:'AI smart search', tag:'feature', desc:'Natural language search across all your data using our embedded vector index.', votes:211, quarter:'Q2 2026', voted:false },
      { id:5, title:'Column freeze in tables', tag:'ux', desc:'Pin one or more columns so they stay visible when scrolling wide tables.', votes:134, quarter:'Q2 2026', voted:false },
    ]
  },
  {
    id: 'shipped', label: 'Shipped', color: '#22c55e',
    items: [
      { id:6, title:'Keyboard shortcut panel', tag:'ux', desc:'Press ? anywhere to open a searchable list of all keyboard shortcuts.', votes:89, quarter:'Q1 2026', voted:false },
      { id:7, title:'Pagination performance fix', tag:'perf', desc:'Reduced page-load time by 60% for tables with more than 10,000 rows.', votes:55, quarter:'Q1 2026', voted:false },
      { id:8, title:'Two-factor authentication', tag:'feature', desc:'TOTP-based 2FA support for all account types via any authenticator app.', votes:203, quarter:'Q1 2026', voted:false },
    ]
  }
];

var votes = {};

function render() {
  var board = document.getElementById('board');
  board.innerHTML = columns.map(function(col) {
    var dotCls = col.id === 'planned' ? 'planned' : col.id === 'progress' ? 'progress' : 'shipped';
    return '<div class="col">' +
      '<div class="col-head">' +
      '<span class="col-label"><span class="dot ' + dotCls + '"></span>' + col.label + '</span>' +
      '<span class="col-count">' + col.items.length + '</span>' +
      '</div>' +
      '<div class="items">' +
      col.items.map(function(item) {
        var voted = !!votes[item.id];
        var count = item.votes + (voted ? 1 : 0);
        var shipped = col.id === 'shipped';
        return '<div class="item">' +
          '<div class="item-head">' +
          '<span class="item-title">' + item.title + '</span>' +
          '<span class="item-tag tag-' + item.tag + '">' + item.tag + '</span>' +
          '</div>' +
          '<div class="item-desc">' + item.desc + '</div>' +
          '<div class="item-footer">' +
          '<button class="vote-btn' + (voted ? ' voted' : '') + '" onclick="vote(' + item.id + ",'" + col.id + "')" + '">' +
          '<span class="arrow">' + (voted ? '▲' : '△') + '</span>' +
          '<span class="vote-count">' + count + '</span>' +
          '</button>' +
          (shipped ? '<span class="shipped-check">✓ Shipped</span>' : '<span class="quarter">' + item.quarter + '</span>') +
          '</div></div>';
      }).join('') +
      '</div></div>';
  }).join('');
}

function vote(id, colId) {
  if (votes[id]) { delete votes[id]; } else { votes[id] = true; }
  render();
}

render();`,
  seo: {
    title: 'Product Roadmap Board — HTML CSS JS Snippet',
    description: 'Three-column product roadmap board (Planned / In Progress / Shipped) with upvote buttons, tags, quarters, and live vote counts. Exports to React, Vue & Angular.',
    about: {
      title: 'Product Roadmap Board — Planned, In Progress & Shipped with Upvotes',
      description: `A public product roadmap board is a standard transparency feature for SaaS products and developer tools, and a frequently-searched UI component. Showing users what is coming, what is being built now, and what has shipped builds trust and reduces "when is X coming?" support requests. This snippet provides a complete three-column [Kanban-style](/ui-snippets/kanban-board/) roadmap with category tags, target quarters, upvote buttons with live vote counts, and a shipped confirmation badge — the released items typically also appear in a [changelog feed](/ui-snippets/changelog-feed/).\n\n**The three-column model**\n\nPlanned / In Progress / Shipped is the canonical roadmap structure: planned items are committed but not yet started, in-progress items are actively being built, and shipped items are done and deployed. The columns use a CSS grid with three equal columns. Each column is a card with a coloured status dot in the header, an item count badge, and a scrollable list of feature cards.\n\n**Feature cards**\n\nEach item card shows a title, a category tag (feature, bug, perf, ux), a short description, an upvote button, and a quarter or shipped badge. The tag uses a colour-coded design: purple for features, red for bugs, blue for performance, and amber for UX — making it easy to scan by type across all three columns.\n\n**Upvote system**\n\nEach item has a vote button (△ hollow, ▲ filled when voted). Clicking toggles the voted state in a local votes map and re-renders. The displayed count is base votes + (voted ? 1 : 0), derived from the votes map rather than mutating the source array — a clean approach that makes the votes undoable. In production, votes would be persisted to a backend with user authentication to prevent duplicate voting.\n\n**Data-driven rendering**\n\nThe entire board renders from a columns array of plain JavaScript objects. Adding a new feature card is adding an object to the correct column\'s items array; moving a card between columns is moving the object. In a real product this data would come from a backend, a headless CMS, or a product management tool like Linear, Productboard, or Canny via their public API.\n\n**Quarter and shipped labels**\n\nPlanned and in-progress items show their target quarter (Q3 2026, Q4 2026). Shipped items show a green ✓ Shipped badge instead of a quarter, since the timeline is no longer relevant. This distinction is a small detail that makes the board feel genuinely useful rather than a cosmetic exercise.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Browse the roadmap', text: 'Scan the three columns for planned, in-progress, and shipped items. Category tags and quarter labels give context for each item.' },
      { title: 'Upvote features', text: 'Click △ on any item to cast your vote. The count increases and the button fills. Click again to remove your vote.' },
      { title: 'Add your own items', text: 'Add an object to any column\'s items array: { id, title, tag, desc, votes, quarter }. Shipped column items show a "✓ Shipped" badge.' },
      { title: 'Move items between columns', text: 'Cut and paste an item object from one column\'s items array to another — the column it is in determines its status dot and badge.' },
      { title: 'Load from an API', text: 'Replace the columns array with a fetch() to your roadmap endpoint (Canny, Productboard, Linear, or your own API) and call render() in the then callback.' },
      { title: 'Export for your framework', text: 'Click "React" for a component with votes in useState and columns as props. Click "Vue" for a Vue 3 SFC with a reactive votes map.' },
    ]},
    features: ['Three-column Planned / In Progress / Shipped layout', 'Colour-coded status dots matching legend (grey, indigo, green)', 'Four category tags: feature, bug, perf, ux with colour coding', 'Upvote toggle: vote is added/removed locally without mutating the source', 'Derived vote count (base + local vote) updates on every toggle', 'Quarter labels on upcoming items; ✓ Shipped badge on done items', 'Item count badge per column header', 'Data-driven rendering from a plain JavaScript columns array'],
    useCases: [
      { icon: 'APP', title: 'Public SaaS product roadmap page', desc: 'Publish the roadmap at /roadmap on your product site. Load entries from a headless CMS or your own API so the product team can update it without a deploy. The upvote system gives users a voice in prioritisation and gives the product team quantified demand data — how many users want dark mode vs CSV import.' },
      { icon: 'FLOW', title: 'Embed in an in-app feedback hub', desc: 'Mount the roadmap inside the product itself, visible from a "Roadmap" link in the sidebar or settings menu. Users who just hit a limitation can see if it is already planned or in progress, reducing "where is X?" support requests. The shipped column doubles as an in-app changelog.' },
      { icon: 'DESIGN', title: 'Internal sprint board for product and engineering', desc: 'Adapt the three columns to Now / Next / Later or This Sprint / Next Sprint / Backlog for an internal planning board. Add drag-and-drop to move cards between columns, and replace the vote button with an effort/impact score for a lightweight prioritisation matrix.' },
      { icon: 'CODE', title: 'Sync with Linear, Canny, or Productboard', desc: 'Fetch items from Linear\'s GraphQL API (filtering by project and status), Canny\'s REST API, or Productboard\'s features endpoint and map the response to the columns array shape. Persist upvotes to the same backend so votes aggregate across all visitors rather than resetting on refresh.' },
      { icon: 'CHART', title: 'Stakeholder and investor transparency page', desc: 'Use the roadmap board as a lightweight external-facing product brief for investors, enterprise buyers, and integration partners. The Shipped column demonstrates execution cadence, In Progress shows current focus, and Planned shows strategic direction — a persuasive combination in sales and due-diligence contexts.' },
      { icon: 'LEARN', title: 'Study Kanban-style data-driven UI rendering', desc: 'The board renders entirely from a nested data array: columns containing items. The upvote system demonstrates a clean derived-state pattern (base + local vote) rather than mutating source data. These patterns — column-based rendering, toggle state without mutation, data-driven re-render — transfer directly to task managers, CRMs, and project tools.' },
      { icon: 'CODE', title: 'Related: Version History Timeline', desc: 'See the [Version History Timeline](/ui-snippets/version-history-timeline/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the vote count avoid mutating the source data?', a: 'The items array stores a base vote count that never changes. A separate votes plain object acts as a toggle map: votes[id] = true when voted. In the renderer, count = item.votes + (votes[id] ? 1 : 0) derives the displayed value from both sources. This means undoing a vote (deleting votes[id]) automatically returns the displayed count to the original, and the source data stays clean — a pattern that makes syncing to a backend much simpler because you only send the toggle event, not a raw count.' },
      { q: 'How do I persist votes to prevent duplicate voting?', a: 'On the client side, store voted item ids in localStorage so votes persist across page reloads. On the backend, record a vote as a row in a votes table with (userId, itemId, createdAt) and a unique constraint on (userId, itemId) to enforce one vote per user per item. The vote endpoint increments a denormalized vote_count on the item row on insert and decrements on delete, returning the new total to the client.' },
      { q: 'How do I load roadmap items from Linear or Canny?', a: 'For Linear: query the GraphQL API for issues in a specific project, filtering by state. Map "Backlog" to planned, "In Progress" to progress, and "Done" to shipped. Include the title, description, priority/votes, and target date. For Canny: GET /v1/posts with board_id and category filters. Both APIs return JSON that maps cleanly to the columns[].items shape. Refresh on a server-side schedule and cache so the public page does not hammer the external API.' },
      { q: 'How do I build this in React?', a: 'Accept columns as a prop (or fetch in useEffect). Keep a votes Set in useState for voted item ids. Toggle votes: setVotes(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; }). Render each column and item from the data, deriving the vote count as item.votes + (votes.has(item.id) ? 1 : 0). The shipped check and quarter label render conditionally based on the column id. For the Tailwind version, click "Tailwind" to get the same markup with utility classes instead of a scoped stylesheet.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the derived-vote-count pattern by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the displayed vote count is computed as item.votes plus a lookup in a separate votes toggle map rather than incrementing item.votes directly, and how that separation makes an "undo vote" trivially correct. The same assistant can help optimize it, for example checking whether rebuilding the entire board's innerHTML on every single vote toggle is wasteful once the item count grows, or whether the same column-rendering logic could be extracted into one reusable function instead of being inlined in the map callback. It's also useful for extending the effect: ask it to add drag-and-drop so items can move between columns, persist votes to localStorage keyed by item id so a refresh doesn't reset them, or add a search/filter input that narrows the visible items across all three columns by keyword or tag. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a three-column product roadmap board (Planned, In Progress, Shipped) with upvoting in plain HTML, CSS, and vanilla JavaScript, rendered entirely from a data structure — no Kanban library.

Requirements:
- A nested data structure: an array of column objects (each with an id, a label, and a color), where each column object contains its own array of item objects (each with an id, a title, a category tag like feature/bug/perf/ux, a description, a base vote count, and a target quarter string).
- Render the entire board by mapping over the columns array to produce one card-styled column per entry, and within each column mapping over that column's items to produce one card per item, with a colored status dot and item count badge in each column's header.
- Each item card must show its title, a color-coded category tag (a distinct background/text color per tag type), its description, an upvote button, and either a target-quarter label or, if the item is in the Shipped column specifically, a green "Shipped" checkmark badge instead of the quarter.
- Implement voting so that a separate object or Set tracks which item ids the current user has voted for (the toggle map), and the displayed vote count for every item is computed at render time as that item's base vote count plus one if its id is present in the toggle map — never mutate the base vote count in the source data directly.
- Clicking an item's vote button must toggle that item's id in the toggle map (add it if absent, remove it if present) and re-render the whole board so the count and the button's filled/outlined arrow icon update immediately.
- Make sure adding a new item is as simple as pushing one more object into the correct column's items array with no other code changes required, since the whole board renders generically from the data.`,
    },
  },
};
export default productRoadmap;
