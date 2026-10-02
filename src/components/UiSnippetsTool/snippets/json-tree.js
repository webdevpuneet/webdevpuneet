const jsonTree = {
  id: 'json-tree',
  title: 'JSON Tree Viewer',
  lastmod: '2026-07-18',
  category: 'tables',
  html: `<div class="jt-card">
  <div class="jt-bar">
    <span class="jt-title">response.json</span>
    <span class="jt-actions">
      <button type="button" class="jt-btn" id="jtExpand">Expand all</button>
      <button type="button" class="jt-btn" id="jtCollapse">Collapse all</button>
      <button type="button" class="jt-btn" id="jtCopy">Copy</button>
    </span>
  </div>
  <div class="jt-tree" id="jtTree"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;color:#e2e8f0;display:flex;justify-content:center;padding:36px 16px}

.jt-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;width:100%;max-width:460px;overflow:hidden}
.jt-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 14px;border-bottom:1px solid #1e293b;background:#0b1120}
.jt-title{font-family:ui-monospace,monospace;font-size:12.5px;color:#94a3b8}
.jt-actions{display:flex;gap:6px}
.jt-btn{background:#1e293b;border:1px solid #334155;color:#cbd5e1;border-radius:7px;padding:4px 9px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit}
.jt-btn:hover{border-color:#6366f1;color:#a5b4fc}

.jt-tree{padding:12px 14px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:13px;line-height:1.6;overflow:auto;max-height:340px}
.jt-node{padding-left:16px}
.jt-row{display:flex;align-items:flex-start;gap:4px;border-radius:5px;padding:0 4px}
.jt-row:hover{background:#1e293b}
.jt-tog{width:14px;flex-shrink:0;cursor:pointer;color:#64748b;user-select:none;text-align:center}
.jt-tog.jt-leaf{visibility:hidden}
.jt-key{color:#7dd3fc}
.jt-colon{color:#475569;margin:0 4px 0 0}
.jt-brace{color:#94a3b8}
.jt-count{color:#475569;font-style:italic;margin-left:6px;font-size:11px}
.jt-str{color:#86efac}
.jt-num{color:#fca5a5}
.jt-bool{color:#fdba74}
.jt-null{color:#64748b}
.jt-collapsed>.jt-node{display:none}
.jt-collapsed .jt-preview{display:inline}
.jt-preview{display:none;color:#475569;font-style:italic}`,

  js: `var DATA = {
  id: 4821,
  name: "Ada Lovelace",
  active: true,
  roles: ["admin", "editor"],
  profile: { city: "London", verified: false, posts: 134 },
  lastLogin: null
};

var tree = document.getElementById('jtTree');

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

function leaf(v) {
  var t = typeOf(v);
  var span = document.createElement('span');
  if (t === 'string') { span.className = 'jt-str'; span.textContent = '"' + v + '"'; }
  else if (t === 'number') { span.className = 'jt-num'; span.textContent = v; }
  else if (t === 'boolean') { span.className = 'jt-bool'; span.textContent = v; }
  else { span.className = 'jt-null'; span.textContent = 'null'; }
  return span;
}

function build(value, key, isLast) {
  var t = typeOf(value);
  var row = document.createElement('div');
  row.className = 'jt-row';

  var tog = document.createElement('span');
  tog.className = 'jt-tog';
  row.appendChild(tog);

  if (key !== null) {
    var k = document.createElement('span');
    k.className = 'jt-key'; k.textContent = '"' + key + '"';
    row.appendChild(k);
    var colon = document.createElement('span'); colon.className = 'jt-colon'; colon.textContent = ':';
    row.appendChild(colon);
  }

  if (t === 'object' || t === 'array') {
    var open = t === 'array' ? '[' : '{';
    var close = t === 'array' ? ']' : '}';
    var entries = t === 'array' ? value.map(function (v, i) { return [null, v]; }) : Object.keys(value).map(function (kk) { return [kk, value[kk]]; });

    var brace = document.createElement('span'); brace.className = 'jt-brace'; brace.textContent = open;
    row.appendChild(brace);
    var preview = document.createElement('span'); preview.className = 'jt-preview'; preview.textContent = ' … ' + close;
    row.appendChild(preview);
    var count = document.createElement('span'); count.className = 'jt-count'; count.textContent = entries.length + (t === 'array' ? ' items' : ' keys');
    row.appendChild(count);

    var wrap = document.createElement('div');
    wrap.className = 'jt-collapsible';
    wrap.appendChild(row);
    var children = document.createElement('div'); children.className = 'jt-node';
    entries.forEach(function (e, i) { children.appendChild(build(e[1], e[0], i === entries.length - 1)); });
    var closer = document.createElement('div'); closer.className = 'jt-row';
    var pad = document.createElement('span'); pad.className = 'jt-tog jt-leaf'; closer.appendChild(pad);
    var cb = document.createElement('span'); cb.className = 'jt-brace'; cb.textContent = close; closer.appendChild(cb);
    children.appendChild(closer);
    wrap.appendChild(children);

    tog.textContent = '▾';
    tog.addEventListener('click', function () {
      var collapsed = wrap.classList.toggle('jt-collapsed');
      tog.textContent = collapsed ? '▸' : '▾';
    });
    return wrap;
  }

  tog.classList.add('jt-leaf');
  row.appendChild(leaf(value));
  return row;
}

function setAll(collapsed) {
  Array.prototype.forEach.call(tree.querySelectorAll('.jt-collapsible'), function (w, i) {
    if (i === 0) return; // keep root open
    w.classList.toggle('jt-collapsed', collapsed);
    var t = w.querySelector('.jt-tog'); if (t) t.textContent = collapsed ? '▸' : '▾';
  });
}

tree.appendChild(build(DATA, null, true));
document.getElementById('jtExpand').addEventListener('click', function () { setAll(false); });
document.getElementById('jtCollapse').addEventListener('click', function () { setAll(true); });
document.getElementById('jtCopy').addEventListener('click', function () {
  navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(DATA, null, 2));
});`,

  seo: {
    title: 'JSON Tree Viewer — Collapsible JSON Explorer',
    description: `A collapsible JSON tree viewer: render objects and arrays as a syntax-colored tree with expand/collapse all and copy. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'JSON Tree Viewer — Collapsible, Syntax-Colored JSON Explorer',
      description: `A JSON tree viewer turns a raw JSON blob into an explorable, collapsible tree with syntax colouring — the view behind API consoles, debuggers, and config editors. This snippet recursively renders any JSON value into expandable nodes with type-based colours, per-node toggles, expand/collapse-all, and copy, in plain HTML, CSS, and vanilla JavaScript with no JSON-viewer library.

**Recursive rendering**

The core is a single \`build(value, key)\` function that inspects a value's type and returns a DOM node. Primitives (string, number, boolean, null) render as a coloured leaf; objects and arrays render an opening brace, a child container, and a closing brace, recursing into each entry. Because it's recursive, it handles arbitrary nesting depth — objects in arrays in objects — without any special-casing, and it works on any JSON you feed it by swapping the \`DATA\` constant.

**Type-aware syntax colouring**

Each value type gets its own colour the way a code editor does: keys in blue, strings in green, numbers in red, booleans in orange, \`null\` in grey, and structural braces in muted slate. A correct \`typeOf\` helper distinguishes \`null\` and arrays from plain objects (since \`typeof null\` is \`"object"\` and arrays are objects too), so the colouring and the \`{ }\` vs \`[ ]\` braces are always right.

**Collapsible nodes with previews**

Every object and array has a \`▾\`/\`▸\` toggle that collapses its children. When collapsed, the node shows a compact \`… }\` preview plus a count ("3 keys", "2 items"), so you can see the shape of a large payload at a glance and drill in only where you need to. Expand-all and Collapse-all buttons operate on the whole tree at once (keeping the root open), which is invaluable for big API responses.

**Copy and reuse**

A Copy button writes the pretty-printed JSON to the clipboard via the Clipboard API, so the viewer doubles as a formatter. The data lives as a normal JavaScript object, so you can wire it to a fetch response, a textarea, or a file drop with one line — the renderer doesn't care where the JSON comes from.

**Lightweight and themeable**

Rows highlight on hover for easy scanning, the monospace type and dark palette read like a real console, and the whole thing is a couple of hundred lines with no dependencies. It's a clean, drop-in reference for the collapsible JSON-tree pattern that you'd otherwise pull a library in for.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A sample JSON object renders as a colored, collapsible tree.` },
      { title: 'Feed your JSON', text: `Replace the DATA object with your own — any nesting works.` },
      { title: 'Drill in', text: `Click a ▾ toggle to collapse or expand any object or array.` },
      { title: 'Expand or collapse all', text: `Use the toolbar buttons to open or close the whole tree.` },
      { title: 'Read the shape fast', text: `Collapsed nodes show a count like "3 keys" or "2 items".` },
      { title: 'Copy it', text: `The Copy button writes pretty-printed JSON to the clipboard.` },
    ] },
    features: [
      { title: 'Recursive renderer', text: `One function renders any depth of nested objects and arrays.` },
      { title: 'Syntax colouring', text: `Keys, strings, numbers, booleans, and null each get a color.` },
      { title: 'Correct type detection', text: `Distinguishes null and arrays from plain objects.` },
      { title: 'Collapsible nodes', text: `Per-node ▾/▸ toggles with a preview and key/item count.` },
      { title: 'Expand/collapse all', text: `Toolbar buttons operate on the whole tree at once.` },
      { title: 'Copy to clipboard', text: `Writes pretty-printed JSON via the Clipboard API.` },
      { title: 'Hover highlighting', text: `Rows highlight for easy scanning of large payloads.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no JSON-viewer dependency.` },
    ],
    useCases: [
      { title: 'API response exploration', text: 'Explore payloads beside an [API key manager](/ui-snippets/api-key-manager/), with one recursive function rendering objects and arrays of any depth.' },
      { title: 'Debug state panels', text: 'Show application state in a [terminal window](/ui-snippets/terminal-window/) style container, with keys, strings, numbers, booleans and null each coloured.' },
      { title: 'Configuration editors', text: 'Render structured settings in a readable way, with each node showing a preview and an item count when collapsed.' },
      { title: 'Webhook and log inspection', text: 'Drill into nested event payloads, using correct type detection that tells null and arrays apart from plain objects.' },
      { title: 'Documentation examples', text: 'Display sample responses in API docs next to a [changelog feed](/ui-snippets/changelog-feed/), with expand and collapse all plus copy controls.' },
      { icon: 'CODE', title: 'Related: Table Inline Cell Validation', desc: 'See the [Table Inline Cell Validation](/ui-snippets/table-cell-validation-errors/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does it handle deeply nested JSON?', a: `The build function is recursive: for every object or array it creates a container and calls itself on each child, so nesting depth is unlimited and needs no special handling. Each level adds indentation and its own collapse toggle, so even a deeply nested API response stays navigable.` },
      { q: 'Why not just use JSON.stringify with indentation?', a: `Pretty-printing gives you text, but not interactivity — you cannot collapse a noisy branch, scan counts, or color by type. A tree viewer lets you fold away the parts you do not care about and drill into the parts you do, which is essential when a payload is hundreds of lines. The Copy button still gives you the stringified version when you want it.` },
      { q: 'How are types detected and colored?', a: `A typeOf helper returns "null" for null, "array" for arrays, and otherwise the JavaScript typeof. This matters because typeof null is "object" and arrays are objects too, so a naive check would mis-render both. Each resolved type maps to a CSS class, giving editor-style colors for keys, strings, numbers, booleans, and null.` },
      { q: 'Can I load JSON from an API instead of the sample?', a: `Yes. The DATA constant is a normal JavaScript value, so assign it the parsed result of a fetch (await res.json()), a JSON.parse of a textarea, or a dropped file, then call build and append it. The renderer is agnostic about the source — it only needs a JavaScript object, array, or primitive.` },
      { q: 'How do I use this JSON tree in React, Vue, or Angular?', a: `Recreate the recursion as a component that renders itself for child nodes (a JsonNode that maps over entries and renders JsonNode again), holding each node's collapsed state locally. Pass the parsed JSON as a prop and color leaves by type. Expand/collapse-all can broadcast via context or a key. Tailwind users swap the classes for utilities; the recursive structure is the same.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the recursive build function by hand to see exactly how it works. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the typeOf helper special-cases null and arrays before falling back to the plain JavaScript typeof operator, and what would render incorrectly if that check were removed. The same assistant can help optimize it too, for example asking whether building the entire DOM tree eagerly is wasteful for a very large or deeply nested payload, and whether lazily rendering a node's children only on first expand would keep huge API responses responsive. It is just as useful for extending the viewer, such as adding a search box that highlights matching keys or values across the whole tree, supporting inline editing of leaf values with a callback on change, or adding keyboard navigation so arrow keys walk the tree instead of requiring clicks on every toggle. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a collapsible "JSON tree viewer" in plain HTML, CSS, and JavaScript using only recursive DOM construction — no JSON-viewer library, no framework.

Requirements:
- A single recursive function that accepts a JavaScript value (and its key name, if any) and returns a DOM node: primitive values render as a coloured leaf span, and objects or arrays render an opening brace, a child container built by calling the same function on every entry, and a closing brace.
- A type-detection helper that correctly distinguishes null from a plain object (since typeof null is "object" in JavaScript) and distinguishes arrays from plain objects (since arrays are also objects), so braces render as square brackets for arrays and curly braces for objects, and null renders as its own type rather than being mistaken for an object.
- Give each primitive type its own CSS color class: strings, numbers, booleans, and null must all look visually distinct, similar to a code editor's syntax highlighting.
- Every object or array node needs a clickable toggle (e.g. a triangle character) that collapses or expands only its own children by toggling a class on its wrapper element. When collapsed, show a compact inline preview (like an ellipsis and the closing brace) plus a count of how many keys or items are inside.
- Add "Expand all" and "Collapse all" buttons that walk every collapsible node in the tree and set its collapsed state in one action, while leaving the root node itself always expanded.
- Add a Copy button that writes the pretty-printed (indented) JSON string of the underlying data object to the clipboard using the Clipboard API, independent of however the tree is currently collapsed or expanded.`,
    },
  },
};

export default jsonTree;
