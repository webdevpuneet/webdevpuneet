const jsonDiffViewer = {
  id: 'json-diff-viewer',
  title: 'JSON Diff Viewer',
  lastmod: '2026-08-22',
  category: 'tools',
  cdnUrls: [],
  html: `<section class="jdv-wrap">
  <span class="jdv-tag">recursive structural diff</span>
  <h1>JSON diff viewer</h1>

  <div class="jdv-inputs">
    <div class="jdv-input-col">
      <label for="jdvBefore">Before</label>
      <textarea id="jdvBefore" spellcheck="false"></textarea>
    </div>
    <div class="jdv-input-col">
      <label for="jdvAfter">After</label>
      <textarea id="jdvAfter" spellcheck="false"></textarea>
    </div>
  </div>

  <div class="jdv-legend">
    <span class="jdv-legend-item"><i class="jdv-swatch added"></i>Added</span>
    <span class="jdv-legend-item"><i class="jdv-swatch removed"></i>Removed</span>
    <span class="jdv-legend-item"><i class="jdv-swatch changed"></i>Changed</span>
  </div>

  <div class="jdv-output" id="jdvOutput"></div>
  <p class="jdv-error" id="jdvError" hidden></p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0f1a24,#03070a 60%);color:#fff;min-height:100vh;padding:26px;display:flex;align-items:center;justify-content:center}
.jdv-wrap{width:100%;max-width:760px}
.jdv-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#67e8f9;background:rgba(103,232,249,.1);border:1px solid rgba(103,232,249,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.jdv-wrap h1{font-size:clamp(22px,5vw,28px);font-weight:800;letter-spacing:-.02em;margin-bottom:16px}
.jdv-inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.jdv-input-col label{display:block;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#7fa3ac;margin-bottom:6px}
.jdv-input-col textarea{width:100%;height:150px;resize:vertical;padding:11px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.03);color:#dff0f4;font:12.5px/1.55 'SFMono-Regular',Consolas,monospace}
.jdv-input-col textarea:focus{outline:none;border-color:#67e8f9}
.jdv-legend{display:flex;gap:16px;margin:14px 0 10px}
.jdv-legend-item{display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;color:#9db4bc}
.jdv-swatch{width:10px;height:10px;border-radius:3px;display:inline-block}
.jdv-swatch.added{background:#4ade80}
.jdv-swatch.removed{background:#f87171}
.jdv-swatch.changed{background:#facc15}
.jdv-output{border-radius:12px;background:rgba(0,0,0,.35);border:1px solid rgba(103,232,249,.18);padding:14px 16px;font:12.5px/1.75 'SFMono-Regular',Consolas,monospace;white-space:pre;overflow-x:auto;max-height:400px;overflow-y:auto}
.jdv-line{white-space:pre}
.jdv-line.added{color:#4ade80}
.jdv-line.removed{color:#f87171}
.jdv-line.changed{color:#facc15}
.jdv-line.same{color:#7c93a0}
.jdv-error{margin-top:10px;font-size:12px;color:#f87171;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.25);padding:9px 12px;border-radius:9px}`,

  js: `var beforeEl = document.getElementById('jdvBefore');
var afterEl = document.getElementById('jdvAfter');
var outputEl = document.getElementById('jdvOutput');
var errorEl = document.getElementById('jdvError');

var DEFAULT_BEFORE = {
  name: 'Aria Notes',
  version: '1.2.0',
  settings: { theme: 'dark', autosave: true, fontSize: 14 },
  tags: ['productivity', 'notes'],
  author: 'Priya'
};

var DEFAULT_AFTER = {
  name: 'Aria Notes',
  version: '1.3.0',
  settings: { theme: 'light', autosave: true, fontSize: 16, spellcheck: true },
  tags: ['productivity', 'notes', 'sync'],
  license: 'MIT'
};

function isObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }

// Recursive structural diff. Returns a nested "diff tree" mirroring the
// shape of the inputs, where each node is tagged with its status:
// 'added' | 'removed' | 'changed' | 'same' | 'nested' (object/array with
// child differences inside).
function diffValue(a, b) {
  var bothObjects = isObject(a) && isObject(b);
  var bothArrays = Array.isArray(a) && Array.isArray(b);

  if (bothObjects) {
    var keys = Array.from(new Set(Object.keys(a).concat(Object.keys(b)))).sort();
    var children = {};
    var hasDiff = false;
    keys.forEach(function (k) {
      var inA = Object.prototype.hasOwnProperty.call(a, k);
      var inB = Object.prototype.hasOwnProperty.call(b, k);
      if (inA && !inB) { children[k] = { status: 'removed', value: a[k] }; hasDiff = true; }
      else if (!inA && inB) { children[k] = { status: 'added', value: b[k] }; hasDiff = true; }
      else {
        var childDiff = diffValue(a[k], b[k]);
        children[k] = childDiff;
        if (childDiff.status !== 'same') hasDiff = true;
      }
    });
    return { status: hasDiff ? 'nested' : 'same', type: 'object', children: children, keys: keys };
  }

  if (bothArrays) {
    var len = Math.max(a.length, b.length);
    var items = [];
    var arrHasDiff = a.length !== b.length;
    for (var i = 0; i < len; i++) {
      if (i >= a.length) { items.push({ status: 'added', value: b[i] }); arrHasDiff = true; }
      else if (i >= b.length) { items.push({ status: 'removed', value: a[i] }); arrHasDiff = true; }
      else {
        var itemDiff = diffValue(a[i], b[i]);
        items.push(itemDiff);
        if (itemDiff.status !== 'same') arrHasDiff = true;
      }
    }
    return { status: arrHasDiff ? 'nested' : 'same', type: 'array', items: items };
  }

  // Primitives (or mismatched types, e.g. object vs. array vs. primitive)
  var equal = JSON.stringify(a) === JSON.stringify(b);
  if (equal) return { status: 'same', type: 'value', value: a };
  return { status: 'changed', type: 'value', before: a, after: b };
}

function renderJson(value, indent) {
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    var inner = value.map(function (v) { return indent + '  ' + renderJson(v, indent + '  '); }).join(',\\n');
    return '[\\n' + inner + '\\n' + indent + ']';
  }
  if (isObject(value)) {
    var keys = Object.keys(value);
    if (!keys.length) return '{}';
    var innerObj = keys.map(function (k) { return indent + '  ' + JSON.stringify(k) + ': ' + renderJson(value[k], indent + '  '); }).join(',\\n');
    return '{\\n' + innerObj + '\\n' + indent + '}';
  }
  return JSON.stringify(value);
}

function line(text, cls) {
  var div = document.createElement('div');
  div.className = 'jdv-line' + (cls ? ' ' + cls : '');
  div.textContent = text;
  return div;
}

function renderDiff(node, key, indent, isLast, container) {
  var comma = isLast ? '' : ',';
  var prefix = key !== null ? JSON.stringify(key) + ': ' : '';

  if (node.status === 'added') {
    container.appendChild(line(indent + '+ ' + prefix + renderJson(node.value, indent).trimStart() + comma, 'added'));
    return;
  }
  if (node.status === 'removed') {
    container.appendChild(line(indent + '- ' + prefix + renderJson(node.value, indent).trimStart() + comma, 'removed'));
    return;
  }
  if (node.status === 'changed') {
    container.appendChild(line(indent + '~ ' + prefix + JSON.stringify(node.before) + '  ->  ' + JSON.stringify(node.after) + comma, 'changed'));
    return;
  }
  if (node.status === 'same') {
    container.appendChild(line(indent + '  ' + prefix + renderJson(node.value, indent).trimStart() + comma, 'same'));
    return;
  }
  // nested object or array with internal changes
  if (node.type === 'object') {
    container.appendChild(line(indent + '  ' + prefix + '{', 'same'));
    node.keys.forEach(function (k, i) {
      renderDiff(node.children[k], k, indent + '    ', i === node.keys.length - 1, container);
    });
    container.appendChild(line(indent + '  }' + comma, 'same'));
  } else {
    container.appendChild(line(indent + '  ' + prefix + '[', 'same'));
    node.items.forEach(function (item, i) {
      renderDiff(item, null, indent + '    ', i === node.items.length - 1, container);
    });
    container.appendChild(line(indent + '  ]' + comma, 'same'));
  }
}

function runDiff() {
  errorEl.hidden = true;
  outputEl.innerHTML = '';
  var beforeVal, afterVal;
  try {
    beforeVal = JSON.parse(beforeEl.value);
  } catch (e) {
    errorEl.textContent = 'Invalid JSON in "Before": ' + e.message;
    errorEl.hidden = false;
    return;
  }
  try {
    afterVal = JSON.parse(afterEl.value);
  } catch (e) {
    errorEl.textContent = 'Invalid JSON in "After": ' + e.message;
    errorEl.hidden = false;
    return;
  }

  var tree = diffValue(beforeVal, afterVal);
  if (tree.status === 'same') {
    outputEl.appendChild(line('No differences — the two JSON documents are structurally identical.', 'same'));
    return;
  }
  renderDiff(tree, null, '', true, outputEl);
}

var debounceTimer = null;
function scheduleDiff() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(runDiff, 200);
}

beforeEl.addEventListener('input', scheduleDiff);
afterEl.addEventListener('input', scheduleDiff);

beforeEl.value = JSON.stringify(DEFAULT_BEFORE, null, 2);
afterEl.value = JSON.stringify(DEFAULT_AFTER, null, 2);
runDiff();`,

  seo: {
    title: 'JSON Diff Viewer — Free Recursive Structural JSON Comparator',
    description: `A JSON diff tool that recursively compares two JSON documents key by key, highlighting added, removed, and changed values with old→new detail, not a superficial line-by-line text diff. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'JSON Diff Viewer — A Real Structural Diff, Not a Text Diff',
      description: `A text/line diff on two pretty-printed JSON blobs is famously misleading — reordering keys or reformatting whitespace produces a wall of red and green even when the data is identical. This tool instead parses both inputs and walks them recursively as JavaScript values, so the diff reflects actual structural differences.

**The recursive comparison: diffValue()**

\`diffValue(a, b)\` branches on the actual types of both values. If both are plain objects, it unions their key sets, sorts them for stable output, and recurses into \`diffValue\` for every key present in both — keys only in \`a\` are tagged \`removed\`, keys only in \`b\` are tagged \`added\`. If both are arrays, it walks index by index the same way, tagging extra trailing indices as added or removed. For anything else (primitives, or mismatched types like a number replaced by an object), it falls back to a value comparison via \`JSON.stringify\` equality and tags the result \`changed\` with both the old and new value preserved, or \`same\` if they're identical.

**A diff tree, not a flat list**

Every recursive call returns a node describing its own status — \`added\`, \`removed\`, \`changed\`, \`same\`, or \`nested\` (an object/array that contains changes somewhere inside it) — plus, for objects and arrays, a \`children\`/\`items\` structure holding the same kind of node for every key or index. \`renderDiff()\` then walks that tree and prints indented, properly bracketed JSON, coloring each line by its node's status: green \`+\` for added, red \`-\` for removed, yellow \`~\` with an old → new pair for changed, and neutral gray for unchanged context — so nested changes stay visually anchored inside their real object/array structure instead of flattening into an unreadable list.

**Handles nesting correctly, at any depth**

Because \`diffValue\` calls itself for every object/array value, a change three levels deep inside a nested \`settings\` object is caught and reported at exactly that depth, with every ancestor object correctly marked \`nested\` so it still renders (unchanged siblings included) rather than being collapsed away. Pair this with a [code diff viewer](/ui-snippets/code-diff-viewer/) for comparing raw text, or a [JSON tree](/ui-snippets/json-tree/) viewer for exploring a single document.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two sample JSON documents load and diff immediately.` },
      { title: 'Edit the "Before" JSON', text: `The diff recomputes live, debounced by 200ms.` },
      { title: 'Edit the "After" JSON', text: `Added, removed, and changed keys highlight instantly.` },
      { title: 'Read the output', text: `+ green additions, - red removals, ~ yellow old → new changes.` },
      { title: 'Try nested changes', text: `Edit a value inside settings to see depth-correct diffing.` },
      { title: 'Break the JSON syntax', text: `A parse error names exactly which side and why.` },
    ] },
    features: [
      { title: 'True recursive diff', text: `Walks real JS object/array structure, not text lines.` },
      { title: 'Correct nested handling', text: `Changes at any depth report at their exact location.` },
      { title: 'Added/removed/changed tags', text: `Every value gets one precise status, not a guess.` },
      { title: 'Old → new value display', text: `Changed primitives show both sides explicitly.` },
      { title: 'Formatted, indented output', text: `Bracket-correct pretty-printed JSON with inline markers.` },
      { title: 'Live debounced diffing', text: `Recomputes 200ms after the last keystroke.` },
      { title: 'Friendly parse errors', text: `Names which input is invalid JSON and why.` },
      { title: 'Zero dependencies', text: `No diff library — genuine recursive comparison logic.` },
    ],
    useCases: [
      { title: 'API response debugging', text: 'Compare two payloads to spot an unexpected change, ignoring whitespace and key order that make text diffs misleading.' },
      { title: 'Configuration and flag review', text: 'See exactly what changed between two config versions, with every value tagged added, removed or changed at its precise path.' },
      { title: 'Code review companions', text: 'Pair with a [code diff viewer](/ui-snippets/code-diff-viewer/) so reviewers can read structured data changes next to line-based source changes.' },
      { title: 'Data migration QA', text: 'Verify that a transform changed only the intended fields, showing old and new values side by side for changed primitives.' },
      { title: 'Schema documentation', text: 'Pair with a [JSON tree](/ui-snippets/json-tree/) viewer for exploring documents, since both walk real object structure rather than text lines.' },
      { icon: 'CODE', title: 'Related: Live Log Stream Panel', desc: 'See the [Live Log Stream Panel](/ui-snippets/live-log-stream-panel/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a text/line diff on JSON?', a: `A text diff compares two strings line by line, so reordering keys, changing indentation, or reformatting whitespace produces spurious differences even when the underlying data is identical. This tool instead parses both inputs with JSON.parse and recursively compares the resulting JavaScript objects and arrays by key and index, so only genuine structural differences — a key that's actually missing, added, or holds a different value — are reported.` },
      { q: 'How does the recursive diff algorithm actually work?', a: `diffValue(a, b) checks the types of both values. For two plain objects, it unions and sorts their key sets, then recursively calls diffValue on every shared key (tagging keys only in one side as added or removed). For two arrays, it walks index by index the same way. For anything else — primitives or mismatched types — it compares via JSON.stringify equality and returns either "same" or "changed" with both the old and new value attached. Every recursive call returns a small "node" describing its own status, which the renderer later walks to produce the formatted output.` },
      { q: 'Does it handle changes nested several levels deep correctly?', a: `Yes — because diffValue calls itself for every object or array value it encounters, a change buried inside a deeply nested object is detected and reported at its exact location, while every ancestor object along the way is marked "nested" (meaning it contains a change somewhere inside) so it still renders fully, including its unchanged sibling keys, rather than being flattened or collapsed.` },
      { q: 'What happens if a key changes from an object to a primitive (or similar type change)?', a: `diffValue only recurses when both sides are objects, or both sides are arrays. If the types don't match that way — for example a key that was an object in "Before" and a plain number in "After" — it falls through to the primitive comparison path, which correctly reports the whole value as "changed" with the old object and new primitive both shown, rather than trying to diff incompatible structures key by key.` },
      { q: 'How do I use this diff logic in React, Vue, or Angular?', a: `The diffValue and renderDiff functions have no DOM dependency until the final render step, so you can keep them as-is and swap only the rendering: instead of building DOM line elements directly, walk the same returned diff tree recursively in your framework's template syntax, mapping each node's status to a CSS class the same way. Keep the JSON.parse calls in a try/catch tied to your input state so parse errors surface the same way.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace through diffValue() for a specific nested example — e.g. a key that's added at the top level and a value that changes three levels deep inside a nested object in the same comparison — and explain exactly how the returned diff tree represents both changes simultaneously. It's also useful for reasoning about edge cases — ask what happens when comparing an array to an object at the same key, or when one side has a key whose value is undefined versus the key being entirely absent, since JSON.stringify treats those differently. For extensions, ask it to add an "ignore key order" toggle for arrays (treating them as unordered sets for comparison), add a summary count of total additions/removals/changes at the top, or add a button to copy just the changed subset as a JSON patch. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "JSON diff viewer" in plain HTML, CSS, and JavaScript — no diff library, implement the comparison logic yourself.

Requirements:
- Two textareas ("Before" and "After") pre-filled with sample JSON objects that have some overlapping keys, some added/removed keys, some changed values, and at least one nested object and one array, so the demo shows every diff type at once.
- CRITICAL: implement a genuine recursive structural diff function, not a text/line diff. Given two parsed JSON values, it should: for two plain objects, union their key sets and recursively diff every shared key, tagging keys present only in the first as "removed" and only in the second as "added"; for two arrays, walk index by index the same way; for anything else (primitives, or mismatched types like an object replaced by a number), compare by value equality and tag the result "changed" (keeping both the old and new value) or "same". Each recursive call should return a small descriptive node (its status, and for objects/arrays, the same kind of node for every child) so the overall result is a full diff tree mirroring the input's shape, correctly handling any nesting depth.
- Render the diff as formatted, properly indented JSON output (not a flat list) by walking that diff tree: added values shown in green with a "+" marker, removed values in red with a "-" marker, changed primitive values in yellow showing "oldValue -> newValue", and unchanged values in neutral gray as context — with objects and arrays rendering their real brackets/braces and nested children indented correctly, mirroring how the JSON would normally pretty-print.
- Recompute the diff live as either textarea is edited, debounced by roughly 200ms. Wrap each JSON.parse call in its own try/catch and show a clear error message naming which input (Before or After) failed to parse and why, without crashing the diff for valid input.
- If the two documents are structurally identical, show an explicit "no differences" message rather than an empty output area.`,
    },
  },
};

export default jsonDiffViewer;
