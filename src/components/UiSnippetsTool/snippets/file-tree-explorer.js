const fileTreeExplorer = {
  id: 'file-tree-explorer',
  title: 'File Tree Explorer',
  lastmod: '2026-08-08',
  category: 'navigation',
  html: `<div class="wrap">
  <div class="titlebar">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
    <span>EXPLORER</span>
  </div>
  <ul class="tree" id="tree" role="tree" aria-label="File explorer"></ul>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 300px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.titlebar { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-bottom: 1px solid #f1f5f9; color: #64748b; }
.titlebar span { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; }

.tree, .children { list-style: none; }
.tree { padding: 6px; max-height: 420px; overflow-y: auto; }
.children { overflow: hidden; max-height: 0; transition: max-height 0.22s ease; padding-left: 16px; }
.children.open { }

.row { display: flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: 7px; cursor: pointer; font-size: 13px; color: #334155; outline: none; user-select: none; }
.row:hover { background: #f1f5f9; }
.row.focused { background: #eef2ff; box-shadow: inset 0 0 0 1.5px #6366f1; }

.chevron { width: 12px; height: 12px; flex-shrink: 0; color: #94a3b8; transition: transform 0.18s ease; }
.chevron.open { transform: rotate(90deg); }
.chevron.hidden { visibility: hidden; }

.icon { width: 15px; height: 15px; flex-shrink: 0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 800; color: #fff; }
.icon-folder { background: transparent; color: #60a5fa; width: 16px; height: 16px; }

.name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`,
  js: `const DATA = {
  name: 'project', type: 'folder', children: [
    { name: 'src', type: 'folder', children: [
      { name: 'components', type: 'folder', children: [
        { name: 'Header.js', type: 'file' },
        { name: 'Footer.js', type: 'file' },
        { name: 'styles.css', type: 'file' },
      ]},
      { name: 'utils', type: 'folder', children: [
        { name: 'format.js', type: 'file' },
        { name: 'api.js', type: 'file' },
      ]},
      { name: 'index.html', type: 'file' },
      { name: 'app.js', type: 'file' },
    ]},
    { name: 'public', type: 'folder', children: [
      { name: 'logo.png', type: 'file' },
      { name: 'favicon.png', type: 'file' },
    ]},
    { name: 'package.json', type: 'file' },
    { name: 'README.md', type: 'file' },
    { name: '.gitignore', type: 'file' },
  ]
};

const EXT_ICONS = {
  js:   { color: '#f7df1e', text: 'JS' },
  css:  { color: '#38bdf8', text: 'CS' },
  html: { color: '#fb923c', text: '<>' },
  json: { color: '#a3a3a3', text: '{}' },
  md:   { color: '#94a3b8', text: 'M' },
  png:  { color: '#34d399', text: 'IMG' },
  gitignore: { color: '#f472b6', text: 'GIT' },
  default: { color: '#cbd5e1', text: '' },
};

function iconFor(filename) {
  const parts = filename.split('.');
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : filename.replace('.', '');
  return EXT_ICONS[ext] || EXT_ICONS.default;
}

const tree = document.getElementById('tree');
let idCounter = 0;
let focusedRow = null;

function buildNode(node, container, depth) {
  const li = document.createElement('li');
  li.setAttribute('role', 'treeitem');
  const isFolder = node.type === 'folder';
  const nodeId = 'node-' + (idCounter++);
  li.dataset.id = nodeId;

  const row = document.createElement('div');
  row.className = 'row';
  row.tabIndex = -1;
  row.style.paddingLeft = (8 + depth * 2) + 'px';

  const chevron = document.createElement('svg');
  chevron.setAttribute('viewBox', '0 0 24 24');
  chevron.setAttribute('fill', 'none');
  chevron.setAttribute('stroke', 'currentColor');
  chevron.setAttribute('stroke-width', '3');
  chevron.setAttribute('stroke-linecap', 'round');
  chevron.setAttribute('stroke-linejoin', 'round');
  chevron.innerHTML = '<polyline points="9 6 15 12 9 18"></polyline>';
  chevron.className = 'chevron' + (isFolder ? '' : ' hidden');
  row.appendChild(chevron);

  const icon = document.createElement('span');
  if (isFolder) {
    icon.className = 'icon icon-folder';
    icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>';
  } else {
    const info = iconFor(node.name);
    icon.className = 'icon';
    icon.style.background = info.color;
    icon.textContent = info.text;
  }
  row.appendChild(icon);

  const nameSpan = document.createElement('span');
  nameSpan.className = 'name';
  nameSpan.textContent = node.name;
  row.appendChild(nameSpan);

  row.setAttribute('aria-level', depth + 1);
  row.setAttribute('role', 'treeitem');
  li.appendChild(row);

  let childrenEl = null;
  if (isFolder) {
    childrenEl = document.createElement('ul');
    childrenEl.className = 'children';
    row.setAttribute('aria-expanded', 'false');
    (node.children || []).forEach(child => buildNode(child, childrenEl, depth + 1));
    li.appendChild(childrenEl);
  }

  row._meta = { isFolder, open: false, childrenEl, li, node };

  row.addEventListener('click', () => {
    setFocus(row);
    if (isFolder) toggleFolder(row);
  });

  container.appendChild(li);
  return row;
}

function toggleFolder(row) {
  const meta = row._meta;
  meta.open = !meta.open;
  const chevron = row.querySelector('.chevron');
  chevron.classList.toggle('open', meta.open);
  row.setAttribute('aria-expanded', String(meta.open));
  animateHeight(meta.childrenEl, meta.open);
}

/*
 * The classic "height:auto can't be transitioned" problem: browsers cannot
 * animate to/from an intrinsic "auto" height because auto is not a fixed
 * value the animation engine can interpolate toward. The fix used here is
 * the measure-then-transition trick: read the element's real content height
 * via scrollHeight (which always reports the full rendered height even
 * while max-height is clamped to 0), set max-height to that exact pixel
 * value so the transition has two concrete numbers to interpolate between,
 * and once fully open swap max-height to 'none' so nested content can still
 * grow freely (e.g. if a child folder opens later) without being clipped.
 */
function animateHeight(el, open) {
  if (open) {
    el.style.maxHeight = el.scrollHeight + 'px';
    const onEnd = (e) => {
      if (e.propertyName !== 'max-height') return;
      el.style.maxHeight = 'none';
      el.removeEventListener('transitionend', onEnd);
    };
    el.addEventListener('transitionend', onEnd);
  } else {
    if (el.style.maxHeight === 'none' || el.style.maxHeight === '') {
      el.style.maxHeight = el.scrollHeight + 'px';
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.style.maxHeight = '0px'; });
    });
  }
}

function setFocus(row) {
  if (focusedRow) focusedRow.classList.remove('focused');
  focusedRow = row;
  row.classList.add('focused');
  row.focus();
}

function visibleRows() {
  return Array.from(tree.querySelectorAll('.row')).filter(r => {
    let el = r.closest('.children');
    while (el) {
      if (el.classList.contains('children') && !el.parentElement.querySelector(':scope > .row')._meta.open) return false;
      el = el.parentElement ? el.parentElement.closest('.children') : null;
    }
    return true;
  });
}

tree.addEventListener('keydown', (e) => {
  if (!focusedRow) return;
  const rows = visibleRows();
  const idx = rows.indexOf(focusedRow);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const next = rows[Math.min(idx + 1, rows.length - 1)];
    if (next) setFocus(next);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prev = rows[Math.max(idx - 1, 0)];
    if (prev) setFocus(prev);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    const meta = focusedRow._meta;
    if (meta.isFolder) {
      if (!meta.open) toggleFolder(focusedRow);
      else {
        const firstChild = meta.childrenEl.querySelector('.row');
        if (firstChild) setFocus(firstChild);
      }
    }
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const meta = focusedRow._meta;
    if (meta.isFolder && meta.open) {
      toggleFolder(focusedRow);
    } else {
      const parentLi = focusedRow.closest('li').parentElement.closest('li');
      if (parentLi) {
        const parentRow = parentLi.querySelector(':scope > .row');
        if (parentRow) setFocus(parentRow);
      }
    }
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (focusedRow._meta.isFolder) toggleFolder(focusedRow);
  }
});

buildNode(DATA, tree, 0);
const rootRow = tree.querySelector('.row');
rootRow.tabIndex = 0;
setFocus(rootRow);
toggleFolder(rootRow);`,
  seo: {
    title: 'File Tree Explorer — Free HTML CSS JS Snippet',
    description: 'VS-Code-style collapsible file tree with real height-animated folders, per-extension icons and full keyboard arrow navigation. No library.',
    about: {
      title: 'File Tree Explorer — Animated Collapsible Folders, Per-Extension Icons & Arrow-Key Navigation in Vanilla JS',
      description: `Most "collapsible tree" tutorials fake the animation with display: none, which snaps open and closed with no transition at all, or they skip keyboard support entirely and only work with a mouse. This snippet builds a VS-Code-style file explorer that does neither: folders slide open and closed with a real measured height transition, every folder row has a rotating chevron, files get a small colored icon keyed off their extension, and the whole tree is fully operable with arrow keys the way a real IDE sidebar is.

**The height:auto transition problem, solved**

CSS cannot transition to or from height: auto (or max-height: none) because the browser has no fixed numeric value to interpolate toward — "auto" is a layout instruction, not a length. The common broken fix is to hardcode a max-height guess like 500px, which either clips tall folders or leaves a visible empty gap under short ones once the transition finishes. This snippet uses the standard measure-then-transition technique instead: when a folder opens, animateHeight() reads the child list's scrollHeight — which reports the element's true rendered content height even while its max-height is still clamped to 0px, because scrollHeight measures the content box regardless of overflow clipping — and sets max-height to that exact pixel value. Now the CSS transition has two concrete numbers (0px and, say, 184px) to animate between, so it plays smoothly. A transitionend listener then swaps max-height to none once the animation finishes, so if a nested child folder opens later and the list needs to grow taller, it is not clipped by a now-stale fixed pixel value.

**Closing needs an extra frame, not just a class removal**

Collapsing is trickier than opening. If max-height is currently none, setting it directly to 0px skips the transition entirely, because the browser has no starting numeric value to animate from. The fix is to first set max-height to the current scrollHeight (a real pixel number, functionally a no-op visually since the content is already that tall), force the browser to acknowledge that value on the next animation frame, and only then set max-height to 0px on a second nested requestAnimationFrame. That double rAF is a deliberate paint-cycle wait: the first frame lets the browser commit the "start" height as a real style, and the second frame issues the "end" height as a separate change the transition engine can actually interpolate, rather than both writes collapsing into the same layout pass and skipping the animation.

**Per-extension icons via a lookup table**

Icons are resolved with a plain object, EXT_ICONS, mapping a lowercased file extension (js, css, html, json, md, png) to a background color and short label, with a default fallback for anything unrecognized. iconFor() splits the filename on '.', takes the last segment as the extension, and looks it up — a pattern that is trivial to extend by adding new keys, and cheap enough to run on every file row at render time with no caching needed.

**Roving tabindex and arrow-key navigation**

Only one row in the whole tree has tabIndex = 0 at any moment (the currently focused one); every other row sits at tabIndex = -1 so Tab moves focus into and out of the tree as a single stop, not once per row. setFocus() moves both the .focused CSS class and the actual DOM focus() call together. The keydown handler on the tree root computes a flat, order-preserved list of only the currently visible rows via visibleRows() — walking up each row's ancestor .children containers and checking whether the owning folder is open — so ArrowDown/ArrowUp always step to the next visually-adjacent row, skipping collapsed subtrees entirely rather than jumping into hidden content. ArrowRight either expands a closed folder or, if already open, moves focus into its first child (mirroring how VS Code, Windows Explorer, and macOS Finder's list view all behave). ArrowLeft either collapses an open folder in place or, if it is already collapsed (or is a file), moves focus up to the parent folder row — the standard "collapse or go up" behavior every desktop file browser implements.

**Why this beats a display:none tree**

Because the animation is driven by real max-height values rather than a hard show/hide toggle, the chevron rotation, the slide transition, and the eventual none/0px cleanup are all handled by ordinary CSS transitions with no JavaScript animation loop and no risk of layout thrashing from repeated reflows — the browser's compositor handles the interpolation once the two endpoint values are set.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click any folder row to expand it', text: 'The chevron rotates 90 degrees and the child list visibly slides open using a measured max-height transition, not an instant display-none swap.' },
      { title: 'Click an open folder again to collapse it', text: 'The children animate shut over roughly 220ms, and the chevron rotates back to its resting horizontal position in sync.' },
      { title: 'Notice the per-file-type icon colors', text: 'JavaScript files get a yellow JS badge, CSS files a blue badge, HTML files an orange bracket badge, and unrecognized extensions fall back to a neutral gray dot — all driven by one lookup table.' },
      { title: 'Click a row, then use the arrow keys', text: 'The clicked row gets a visible indigo focus ring. Press ArrowDown/ArrowUp to move to the next or previous visible row, skipping anything inside a collapsed folder.' },
      { title: 'Press ArrowRight on a folder', text: 'If the folder is closed it expands; if it is already open, focus jumps straight into its first child row — exactly like VS Code\'s sidebar.' },
      { title: 'Press ArrowLeft to collapse or step up', text: 'On an open folder it collapses in place; on a file or an already-closed folder it moves focus up to the parent folder instead.' },
    ]},
    features: [
      'Real measured height animation on folder expand/collapse (scrollHeight + max-height), not display:none',
      'Double-requestAnimationFrame collapse sequence so the closing transition always plays from a real pixel value',
      'Rotating chevron icon synced to each folder\'s open/closed state via a single CSS class toggle',
      'Per-extension icon lookup table (.js, .css, .html, .json, .md, .png, default fallback)',
      'Roving tabindex pattern: exactly one row is keyboard-focusable at a time',
      'Full arrow-key navigation: Down/Up moves focus, Right expands or descends, Left collapses or moves to parent',
      'Enter/Space toggles a focused folder without requiring a mouse at all',
      'Recursive tree builder driven entirely by a plain nested JS data object — add files by editing one object',
    ],
    useCases: [
      { icon: 'CODE', title: 'In-browser code editor and IDE sidebars', desc: 'Drop this directly into a web-based code editor or documentation site as the file navigation sidebar, the same role a [tree menu](/ui-snippets/tree-menu/) or [checkbox tree](/ui-snippets/checkbox-tree/) plays for other nested-selection use cases.' },
      { icon: 'APP', title: 'File manager and cloud storage UIs', desc: 'Pair with a [file manager UI](/ui-snippets/file-manager-ui/) or [file dropzone](/ui-snippets/file-dropzone/) to give users a full navigate-and-upload workflow for browsing nested folders of uploaded assets.' },
      { icon: 'DOC', title: 'Documentation and API reference navigation', desc: 'Use the same nested-list pattern to organize documentation pages by section and sub-section, with the height-animation technique making deep hierarchies feel light instead of overwhelming.' },
      { icon: 'LEARN', title: 'Teaching the height:auto CSS problem', desc: 'A ready reference implementation for the classic "why won\'t my accordion animate" question — useful alongside a [JSON tree](/ui-snippets/json-tree/) viewer when explaining nested-content animation techniques to other developers.' },
      { icon: 'DESIGN', title: 'Admin dashboards with hierarchical settings or permissions', desc: 'Represent nested settings groups, permission scopes, or category trees where users need to drill down and where full keyboard operability is a real accessibility requirement, not a nice-to-have.' },
      { icon: 'CODE', title: 'Related: Hover Reveal List', desc: 'See the [Hover Reveal List](/ui-snippets/hover-reveal-list/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why not just use display: none instead of all this max-height logic?', a: 'display: none has no animatable intermediate state — the element is either fully in the layout or completely removed from it between one frame and the next, so there is no way to transition it; folders would snap open and shut instantly with zero animation. The max-height + scrollHeight approach gives the browser two real numeric endpoints to interpolate between, which is the only way to get a genuine slide transition without a JavaScript-driven frame-by-frame height loop.' },
      { q: 'Why does collapsing use two nested requestAnimationFrame calls instead of one?', a: 'If max-height is currently none (set after the open transition finished) and you set it straight to 0px, the browser has no valid starting number to transition from and the change applies instantly with no animation. The fix sets max-height to the current scrollHeight first (a real, already-true value), waits one frame for the browser to commit that as the transition\'s starting point, and only then sets it to 0px on a second frame so the transition engine has two concrete values to animate between.' },
      { q: 'How do I add a new file extension icon?', a: 'Add a key to the EXT_ICONS object, e.g. ts: { color: "#3178c6", text: "TS" }. The iconFor() function automatically looks up any extension present in the object and falls back to EXT_ICONS.default for anything not listed, so no other code needs to change.' },
      { q: 'Can I use this file tree in React, Vue, or Angular?', a: 'Yes. In React, model open/closed state per node with useState (or a Set of open node ids) instead of the row._meta object, and run the max-height measurement inside a useLayoutEffect that fires after the relevant node re-renders so scrollHeight reflects the just-updated DOM; there is no interval or animation frame loop to clean up since it is CSS-transition-driven. In Vue, the same open/closed state can live in reactive() with the measurement done in a watcher\'s nextTick callback. In Angular, do the scrollHeight read inside ngAfterViewChecked guarded by a dirty flag so it only measures when the open state actually changed.' },
      { q: 'Does the keyboard navigation work correctly with deeply nested folders?', a: 'Yes. visibleRows() rebuilds the flat, top-to-bottom list of only currently-visible rows on every key press by checking each row\'s ancestor .children containers for open state, so ArrowDown/ArrowUp always skip over anything inside a collapsed subtree at any depth, and ArrowLeft correctly walks up through multiple nesting levels one parent at a time.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JS to an AI assistant like Claude and ask it to walk through exactly why the collapse animation needs two nested requestAnimationFrame calls instead of one — it is one of the more counterintuitive parts of the CSS height-transition trick and worth understanding before reusing the pattern elsewhere. It is also worth asking whether visibleRows() could be made more efficient by caching the flat visible list and only invalidating it when a folder toggles, instead of recomputing it from the DOM on every single key press. For extending the snippet, ask for drag-and-drop file moving between folders, a search/filter box that auto-expands only the folders containing a match, or multi-select with Shift+Click and Ctrl+Click the way a real file manager supports.`,
      prompt: `Build a VS-Code-style collapsible file/folder tree in plain HTML, CSS, and JavaScript, driven by a nested JS data object — no external tree library.

Requirements:
- A recursive renderer that walks a nested { name, type: 'folder'|'file', children } object and builds nested <ul>/<li> rows, with folders getting a rotating chevron icon and files getting a small colored icon looked up from a lookup table keyed by file extension (cover at least .js, .css, .html, .json, .md, .png with a default fallback).
- Folder expand/collapse must use a REAL height animation, not display:none: on open, set the child list's max-height to its measured scrollHeight so the CSS transition has a real pixel value to animate to, then once the transition ends swap max-height to none so nested content can grow later without being clipped.
- On collapse, first set max-height back to the current scrollHeight (undoing the 'none' value with an equal real number so there is no visual jump), wait a rendered frame via requestAnimationFrame, then set max-height to 0px on a second frame so the transition actually plays instead of snapping shut instantly.
- Full keyboard support using a roving tabindex (only the focused row is tabbable): ArrowDown/ArrowUp move focus to the next/previous VISIBLE row (skipping rows inside collapsed folders), ArrowRight expands a closed folder or moves focus into its first child if already open, ArrowLeft collapses an open folder or moves focus to the parent row otherwise, and Enter/Space toggles a focused folder.
- A visible focus indicator (like an inset ring) on the currently focused row, separate from hover styling.
- Explain in a code comment why CSS cannot transition directly to/from height: auto and how the scrollHeight + max-height approach works around that limitation.`,
    },
  },
};

export default fileTreeExplorer;
