const treeViewFileExplorer = {
  id: 'tree-view-file-explorer',
  title: 'File Explorer Tree View',
  lastmod: '2026-08-15',
  category: 'navigation',
  html: `<div class="tv-wrap">
  <div class="tv-head">
    <h3>Explorer</h3>
    <div class="tv-actions">
      <button class="tv-btn" id="tvExpand">Expand all</button>
      <button class="tv-btn" id="tvCollapse">Collapse all</button>
    </div>
  </div>

  <input class="tv-filter" id="tvFilter" type="text" placeholder="Filter files…" spellcheck="false" autocomplete="off">

  <div class="tv-scroll">
    <ul class="tv-tree" id="tvTree" role="tree" aria-label="Project files"></ul>
  </div>

  <div class="tv-foot">
    <span id="tvPath">src/</span>
    <span class="tv-hint">↑ ↓ move · → ← open/close · Enter select</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#0f172a;padding:26px 16px;color:#e2e8f0}

.tv-wrap{max-width:420px;margin:0 auto;background:#1e293b;border:1px solid #334155;border-radius:14px;overflow:hidden}
.tv-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 15px;border-bottom:1px solid #334155}
.tv-head h3{font-size:14px;font-weight:700}
.tv-actions{display:flex;gap:6px}
.tv-btn{background:#334155;color:#cbd5e1;border:none;border-radius:6px;padding:5px 9px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit}
.tv-btn:hover{background:#475569}

.tv-filter{
  width:calc(100% - 30px);margin:11px 15px;padding:7px 11px;border-radius:8px;
  border:1.5px solid #334155;background:#0f172a;color:#e2e8f0;font-size:12.5px;font-family:inherit;
}
.tv-filter:focus{outline:none;border-color:#6366f1}

.tv-scroll{max-height:330px;overflow-y:auto;padding:0 8px 10px}
.tv-tree,.tv-tree ul{list-style:none}
.tv-tree ul{margin:0}

.tv-row{
  display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:7px;
  cursor:pointer;font-size:13px;color:#cbd5e1;-webkit-user-select:none;user-select:none;
}
.tv-row:hover{background:#2a3a55}
.tv-row.sel{background:#6366f1;color:#fff}
.tv-row:focus-visible{outline:2px solid #a5b4fc;outline-offset:-2px}

/* One rule sets every level's indent from a custom property the JS writes. */
.tv-row{padding-left:calc(8px + var(--d, 0) * 15px)}

.tv-caret{
  width:13px;height:13px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  transition:transform .16s;color:#64748b;
}
.tv-caret svg{width:8px;height:8px;fill:currentColor}
.tv-row.open > .tv-caret{transform:rotate(90deg)}
.tv-row.sel .tv-caret{color:#c7d2fe}
.tv-caret.leaf{visibility:hidden}

.tv-ico{width:14px;height:14px;flex-shrink:0}
.tv-ico svg{width:100%;height:100%;fill:none;stroke-width:1.8}
.tv-row .fold{stroke:#fbbf24}
.tv-row .file{stroke:#64748b}
.tv-row.sel .fold,.tv-row.sel .file{stroke:#fff}

.tv-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tv-name mark{background:rgba(251,191,36,.35);color:inherit;border-radius:2px}
.tv-badge{margin-left:auto;font-size:10px;font-weight:700;color:#64748b;flex-shrink:0}
.tv-row.sel .tv-badge{color:#c7d2fe}

.tv-empty{padding:22px 15px;text-align:center;color:#475569;font-size:12.5px}

.tv-foot{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  padding:9px 15px;border-top:1px solid #334155;font-size:11px;color:#64748b;
}
.tv-foot #tvPath{font-family:ui-monospace,Menlo,monospace;color:#a5b4fc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tv-hint{flex-shrink:0;opacity:.75}
@media (max-width:420px){.tv-hint{display:none}}`,

  js: `var TREE = [
  { name: 'src', type: 'dir', open: true, children: [
    { name: 'components', type: 'dir', children: [
      { name: 'Button.jsx', type: 'file' },
      { name: 'Modal.jsx', type: 'file' },
      { name: 'Table.jsx', type: 'file' },
    ]},
    { name: 'lib', type: 'dir', children: [
      { name: 'format.js', type: 'file' },
      { name: 'fetcher.js', type: 'file' },
    ]},
    { name: 'app.js', type: 'file' },
    { name: 'index.css', type: 'file' },
  ]},
  { name: 'public', type: 'dir', children: [
    { name: 'favicon.ico', type: 'file' },
    { name: 'robots.txt', type: 'file' },
  ]},
  { name: 'tests', type: 'dir', children: [
    { name: 'button.test.js', type: 'file' },
    { name: 'table.test.js', type: 'file' },
  ]},
  { name: 'package.json', type: 'file' },
  { name: 'README.md', type: 'file' },
];

var CARET = '<svg viewBox="0 0 8 8"><path d="M2 0l4 4-4 4z"/></svg>';
var FOLDER = '<svg viewBox="0 0 24 24" class="fold"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>';
var FILE = '<svg viewBox="0 0 24 24" class="file"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/></svg>';

var treeEl = document.getElementById('tvTree');
var filterEl = document.getElementById('tvFilter');
var pathEl = document.getElementById('tvPath');

var rows = [];        // flat list of currently visible rows, rebuilt each render
var selected = null;  // path string of the selected node

function escapeHtml(s) {
  return s.replace(/[&<>]/g, function (c) { return c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'; });
}

function mark(name, term) {
  var safe = escapeHtml(name);
  if (!term) return safe;
  var i = safe.toLowerCase().indexOf(term.toLowerCase());
  if (i === -1) return safe;
  return safe.slice(0, i) + '<mark>' + safe.slice(i, i + term.length) + '</mark>' + safe.slice(i + term.length);
}

// A node survives the filter if it matches, or if any descendant does — so a
// deep match keeps its whole ancestor chain visible instead of orphaning it.
function keeps(node, term) {
  if (!term) return true;
  if (node.name.toLowerCase().indexOf(term) !== -1) return true;
  return (node.children || []).some(function (c) { return keeps(c, term); });
}

function countFiles(node) {
  if (node.type === 'file') return 1;
  return (node.children || []).reduce(function (n, c) { return n + countFiles(c); }, 0);
}

function render() {
  var term = filterEl.value.trim().toLowerCase();
  rows = [];
  treeEl.innerHTML = '';

  function walk(nodes, depth, parentPath, container) {
    nodes.forEach(function (node) {
      if (!keeps(node, term)) return;

      var path = parentPath + node.name;
      var isDir = node.type === 'dir';
      // A filter implies intent to see the matches, so folders auto-open.
      var open = isDir && (term ? true : !!node.open);

      var li = document.createElement('li');
      li.setAttribute('role', 'treeitem');
      if (isDir) li.setAttribute('aria-expanded', String(open));

      var row = document.createElement('div');
      row.className = 'tv-row' + (open ? ' open' : '') + (selected === path ? ' sel' : '');
      row.style.setProperty('--d', depth);
      row.dataset.path = path;
      row.dataset.dir = String(isDir);
      // Roving tabindex: exactly one row is tabbable, the rest are reachable
      // with arrow keys — the standard tree pattern, and it keeps a big tree
      // from swallowing dozens of tab stops.
      row.tabIndex = -1;
      row.innerHTML =
        '<span class="tv-caret' + (isDir ? '' : ' leaf') + '">' + (isDir ? CARET : '') + '</span>' +
        '<span class="tv-ico">' + (isDir ? FOLDER : FILE) + '</span>' +
        '<span class="tv-name">' + mark(node.name, term) + '</span>' +
        (isDir ? '<span class="tv-badge">' + countFiles(node) + '</span>' : '');

      li.appendChild(row);
      container.appendChild(li);
      rows.push({ el: row, node: node, path: path, depth: depth, isDir: isDir, open: open });

      if (isDir && open && node.children) {
        var ul = document.createElement('ul');
        ul.setAttribute('role', 'group');
        li.appendChild(ul);
        walk(node.children, depth + 1, path + '/', ul);
      }
    });
  }

  walk(TREE, 0, '', treeEl);

  if (!rows.length) {
    treeEl.innerHTML = '<div class="tv-empty">Nothing matches that filter.</div>';
    return;
  }

  var active = rows.find(function (r) { return r.path === selected; }) || rows[0];
  active.el.tabIndex = 0;
}

function indexOfPath(path) {
  for (var i = 0; i < rows.length; i++) if (rows[i].path === path) return i;
  return -1;
}

function focusRow(i) {
  if (i < 0 || i >= rows.length) return;
  rows.forEach(function (r) { r.el.tabIndex = -1; });
  rows[i].el.tabIndex = 0;
  rows[i].el.focus();
}

function select(path) {
  selected = path;
  pathEl.textContent = path;
  render();
  var i = indexOfPath(path);
  if (i !== -1) focusRow(i);
}

function toggle(row) {
  if (!row.isDir) return;
  row.node.open = !row.open;
  select(row.path);
}

treeEl.addEventListener('click', function (e) {
  var el = e.target.closest('.tv-row');
  if (!el) return;
  var row = rows[indexOfPath(el.dataset.path)];
  if (!row) return;
  if (row.isDir) toggle(row); else select(row.path);
});

treeEl.addEventListener('keydown', function (e) {
  var el = e.target.closest('.tv-row');
  if (!el) return;
  var i = indexOfPath(el.dataset.path);
  var row = rows[i];
  if (!row) return;

  if (e.key === 'ArrowDown') { e.preventDefault(); focusRow(i + 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); focusRow(i - 1); }
  else if (e.key === 'ArrowRight') {
    e.preventDefault();
    // Closed folder opens; already-open folder steps into its first child.
    if (row.isDir && !row.open) toggle(row);
    else focusRow(i + 1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    if (row.isDir && row.open) { toggle(row); return; }
    // Otherwise jump to the parent — the nearest row above at a lower depth.
    for (var j = i - 1; j >= 0; j--) {
      if (rows[j].depth < row.depth) { focusRow(j); return; }
    }
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (row.isDir) toggle(row); else select(row.path);
  } else if (e.key === 'Home') { e.preventDefault(); focusRow(0); }
  else if (e.key === 'End') { e.preventDefault(); focusRow(rows.length - 1); }
});

filterEl.addEventListener('input', render);

function setAll(nodes, open) {
  nodes.forEach(function (n) {
    if (n.type === 'dir') { n.open = open; setAll(n.children || [], open); }
  });
}
document.getElementById('tvExpand').addEventListener('click', function () { setAll(TREE, true); render(); });
document.getElementById('tvCollapse').addEventListener('click', function () { setAll(TREE, false); render(); });

render();`,

  seo: {
    title: 'File Explorer Tree View — Free HTML CSS JS Snippet',
    description: 'Recursive file tree with roving-tabindex keyboard navigation, ancestor-preserving filter and ARIA tree roles. Vanilla JS, no dependencies.',
    about: {
      title: 'File Explorer Tree View — Recursive Rendering, Roving Tabindex & Ancestor-Preserving Filtering',
      description: `Tree views are the component people most often reach for a library to get, and the two things that actually make one good — correct keyboard navigation and a filter that does not orphan matches — are both about a hundred lines of plain JavaScript. This snippet implements the full ARIA tree interaction pattern over a nested data structure, with no dependencies.

**A flat row list derived from a nested tree**

The data is nested, but keyboard navigation is linear: Arrow Down goes to the next *visible* row regardless of how deep it sits or which branch it belongs to. Every render walks the tree and, alongside building the DOM, pushes each visible node into a flat \`rows\` array. Movement then becomes index arithmetic on that array rather than tree traversal, which is what makes Arrow Up from the first child of a folder land on the folder itself with no special-casing. Rebuilding the list on every render also means it can never disagree with what is on screen.

**Roving tabindex, not fifty tab stops**

Exactly one row carries \`tabindex="0"\`; every other row is \`-1\`. Tab moves into the tree once and out again, and arrow keys move within it — the standard tree pattern, and the reason a large tree does not force keyboard users through dozens of stops to reach the content after it. Moving focus updates which row is tabbable, so returning to the tree later restores the last position rather than resetting to the top.

**Arrow keys that behave like a real explorer**

Right on a closed folder opens it; on an already-open folder it steps into the first child. Left on an open folder closes it; on anything else it jumps to the parent, found by scanning upward for the nearest row at a lower depth. That asymmetry is what makes tree navigation feel correct, and it is specified in the ARIA authoring practices precisely because implementations tend to skip it and use Left/Right as plain expand and collapse.

**Filtering that keeps ancestors**

The naive filter shows only matching nodes, which strands a matched file with no visible parent and destroys the structure the tree exists to convey. \`keeps()\` is recursive: a node survives if it matches *or if any descendant matches*, so the whole ancestor chain down to a deep match stays visible. While a filter is active every folder renders open, because typing a filter is an unambiguous statement that you want to see the matches rather than the folders that contain them.

**Indentation from one custom property**

Each row writes its depth into a \`--d\` custom property and a single CSS rule computes \`padding-left: calc(8px + var(--d) * 15px)\`. There are no per-level selectors and no nested-margin arithmetic, so the tree renders correctly at any depth and the indent step is one number to change. Names are HTML-escaped before search highlighting is inserted, in that order, since filenames are untrusted data in any real explorer.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click to open folders and select files', text: 'Clicking a folder toggles it open or closed; clicking a file selects it and writes its full path into the footer. Folders show a count of the files beneath them, including nested ones.' },
        { title: 'Tab once to enter the tree', text: 'Only one row is in the tab order at a time, so the tree is a single tab stop rather than dozens. Tab again and focus leaves the tree entirely.' },
        { title: 'Move with Arrow Up and Down', text: 'Movement is linear across whatever is currently visible, so Arrow Down from the last child of a folder continues to the next sibling of that folder without any extra keystrokes.' },
        { title: 'Open and close with Arrow Right and Left', text: 'Right opens a closed folder, or steps into the first child if it is already open. Left closes an open folder, or jumps up to the parent if the row is a file or an already-closed folder.' },
        { title: 'Filter without losing structure', text: 'Typing in the filter keeps every node whose name matches and every ancestor of a match, so a deep result still shows the path that leads to it. Matches are highlighted and folders auto-open while filtering.' },
        { title: 'Expand or collapse everything', text: 'The two header buttons walk the whole tree setting the open flag, then re-render — useful for getting an overview or for resetting after a deep exploration.' },
      ],
    },
    features: [
      'Recursive rendering from a nested data structure of any depth',
      'Flat visible-row list rebuilt each render, making keyboard movement simple index arithmetic',
      'Roving tabindex so the whole tree is one tab stop, with the last focused row remembered',
      'Full ARIA tree pattern: Right opens or steps in, Left closes or jumps to parent, plus Home and End',
      'role="tree" / "treeitem" / "group" with aria-expanded maintained on every folder',
      'Ancestor-preserving filter so a deep match keeps its full visible path instead of being orphaned',
      'Folders auto-open while a filter is active, and matched substrings are highlighted',
      'Depth-driven indentation from a single CSS custom property with no per-level selectors',
      'Filenames HTML-escaped before highlight markup is inserted, and recursive file counts on folders',
    ],
    useCases: [
      { icon: 'CODE', title: 'File browsers in web IDEs and code viewers', desc: 'The obvious use, and the one where keyboard navigation matters most because the audience lives on the keyboard. Pair it with a [code diff viewer](/ui-snippets/code-diff-viewer/) so selecting a file loads its changes beside the tree.' },
      { icon: 'FLOW', title: 'Category and taxonomy pickers', desc: 'Product categories, org hierarchies, account structures and document folders are all trees. The ancestor-preserving filter is what makes a deep taxonomy searchable without flattening it into a meaningless list.' },
      { icon: 'DASH', title: 'Navigation sidebars for nested documentation', desc: 'Docs sites with several levels of nesting need exactly this: persistent open state, a filter, and arrow-key movement, without shipping a tree component from a UI framework.' },
      { icon: 'LEARN', title: 'Reference implementation of the ARIA tree pattern', desc: 'Roving tabindex and the asymmetric Left/Right behaviour are two things almost every hand-built tree gets wrong. Seeing them in a hundred readable lines is far more instructive than reading the authoring practices document alone.' },
      { icon: 'FORM', title: 'Folder pickers in upload and export dialogs', desc: 'Choosing a destination folder needs selection, expansion and search in a small space, and the footer path readout gives immediate confirmation of exactly where something will go.' },
      { icon: 'APP', title: 'Asset and media library organisation', desc: 'Digital asset managers and CMS media libraries need a tree beside a grid. Because this one is driven entirely by a plain nested array, wiring it to a real folder API is a matter of replacing that data.' },
    ],
    faqs: [
      { q: 'What is a roving tabindex and why use it here?', a: 'Exactly one row has tabindex="0" while all others have -1, so the browser treats the whole tree as a single tab stop and arrow keys handle movement inside it. Without it, a fifty-node tree adds fifty tab stops between whatever precedes it and whatever follows, which makes keyboard navigation of the surrounding page painful. It is the pattern the ARIA authoring practices specify for trees, tablists and menus.' },
      { q: 'Why does Arrow Right sometimes open a folder and sometimes move down?', a: 'Because that is the specified tree behaviour and it is what makes navigation efficient. On a closed folder, Right opens it. On a folder that is already open, there is nothing left to open, so Right steps into the first child. Left mirrors it: close if open, otherwise jump to the parent. Treating Left and Right as plain expand and collapse is the most common shortcut, and it leaves users unable to move up the hierarchy by keyboard.' },
      { q: 'How does the filter avoid hiding the path to a match?', a: 'keeps() is recursive: a node is kept if its own name matches OR if any descendant is kept. That means a match five levels deep keeps every ancestor above it visible, so you can see where the result actually lives. Filtering to matches alone produces a flat list of orphaned names, which defeats the purpose of a tree.' },
      { q: 'How do I load the tree from an API instead of a constant?', a: 'Replace the TREE constant with your fetched data in the same shape — objects with name, type, optional open and optional children — and call render(). For lazy loading, give directories a loaded flag, fetch children on first expand, assign them to node.children, then re-render; the flat row list and keyboard logic need no changes because they are derived from whatever the tree currently contains.' },
      { q: 'How is indentation handled at arbitrary depth?', a: 'Each row writes its depth into a --d custom property and one CSS rule computes padding-left: calc(8px + var(--d) * 15px). There are no per-level selectors, so any depth renders correctly and changing the indent step is a single number. It also keeps the row background spanning the full width, which nested margins would break.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Hold the tree and the set of open paths in state and render recursively with a component that calls itself for children. Keep the flat visible-row list as a memo derived from that state for keyboard movement, and manage the roving tabindex by storing the focused path in state and setting tabIndex={path === focusedPath ? 0 : -1}, calling .focus() through a ref in an effect when it changes.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add lazy loading, where a directory fetches its children the first time it is expanded and shows an inline spinner on that row — that is the change that makes a tree usable against a real filesystem or bucket rather than a constant. Other natural extensions: add type-ahead so pressing a letter jumps to the next visible node starting with it, which the ARIA tree pattern also specifies; add multi-select with Shift and Ctrl over the flat row list; add drag-and-drop to move nodes between folders with a validity check preventing a folder being dropped into its own descendant; or virtualise the row list so a tree with tens of thousands of nodes only renders the visible window.`,
      prompt: `Build a file explorer tree view in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Render recursively from a nested array of nodes, each with a name, a type of 'dir' or 'file', an optional open flag and optional children. Any depth must work.
- On every render, build a FLAT array of the currently visible rows alongside the DOM, and drive all keyboard movement with index arithmetic on that array rather than by traversing the tree.
- Implement a roving tabindex: exactly one row has tabindex="0" and all others have -1, so the entire tree is a single tab stop. Update it as focus moves so returning to the tree restores the last position.
- Implement the full ARIA tree keyboard pattern: Arrow Up/Down move between visible rows; Arrow Right opens a closed folder or steps into the first child if already open; Arrow Left closes an open folder or jumps to the parent (found by scanning upward for the nearest row at a lower depth); Enter and Space activate; Home and End jump to first and last.
- Use role="tree" on the container, role="treeitem" on each node, role="group" on child lists, and keep aria-expanded accurate on folders.
- Add a text filter where a node is kept if its own name matches OR any descendant matches, so a deep match keeps its entire ancestor chain visible. Auto-open all folders while a filter is active and highlight the matched substring with <mark> — escaping the name to HTML FIRST and inserting the mark tags into the escaped string afterwards.
- Indent rows by writing the depth into a CSS custom property and computing padding-left with one calc() rule; do not write per-level selectors or use nested margins.
- Show recursive file counts on folders, a selected-path readout in the footer, and Expand all / Collapse all buttons.
- Style it as a dark sidebar panel with a rotating caret for open folders, distinct folder and file icons, hover and selected row states, and a visible :focus-visible ring.`,
    },
  },
};

export default treeViewFileExplorer;
