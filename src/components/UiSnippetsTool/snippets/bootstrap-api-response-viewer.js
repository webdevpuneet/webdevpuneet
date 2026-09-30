const bootstrapApiResponseViewer = {
  id: 'bootstrap-api-response-viewer',
  title: 'Bootstrap API Response Viewer',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsapi-card">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div class="d-flex align-items-center gap-2">
          <span class="badge text-bg-success">200 OK</span>
          <span class="small text-muted">GET /api/orders/1042</span>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bsapiCopy">Copy JSON</button>
      </div>
      <div class="bsapi-tree" id="bsapiTree"></div>
    </div>
  </div>
</div>`,
  css: `.bsapi-card { width: 440px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsapi-tree {
  background: #14151a; color: #e1e4e8; border-radius: 10px; padding: 12px 14px;
  font: 12.5px/1.6 ui-monospace, Menlo, Consolas, monospace; max-height: 320px; overflow: auto;
}
.bsapi-key { color: #7dd3fc; }
.bsapi-string { color: #86efac; }
.bsapi-number { color: #fca5a5; }
.bsapi-bool { color: #fcd34d; }
.bsapi-toggle { cursor: pointer; user-select: none; color: #9ca3af; }
.bsapi-toggle:hover { color: #e1e4e8; }
.bsapi-children { margin-left: 18px; }
.bsapi-children.bsapi-collapsed { display: none; }`,
  js: `const DATA = {
  id: 1042,
  status: 'shipped',
  total: 128.5,
  paid: true,
  customer: { name: 'Dana Reyes', email: 'dana@acme.co' },
  items: [
    { sku: 'TR-4021', qty: 2, price: 42 },
    { sku: 'WB-1188', qty: 1, price: 44.5 },
  ],
};

const tree = document.getElementById('bsapiTree');

function valueSpan(value) {
  if (typeof value === 'string') return '<span class="bsapi-string">"' + value + '"</span>';
  if (typeof value === 'number') return '<span class="bsapi-number">' + value + '</span>';
  if (typeof value === 'boolean') return '<span class="bsapi-bool">' + value + '</span>';
  return String(value);
}

let nodeId = 0;

function renderNode(value, keyLabel) {
  const isObject = value !== null && typeof value === 'object';
  const prefix = keyLabel !== undefined ? '<span class="bsapi-key">"' + keyLabel + '"</span>: ' : '';

  if (!isObject) return '<div>' + prefix + valueSpan(value) + '</div>';

  const id = 'bsapi-node-' + (nodeId++);
  const isArray = Array.isArray(value);
  const entries = Object.entries(value);
  const openBrace = isArray ? '[' : '{';
  const closeBrace = isArray ? ']' : '}';

  const children = entries.map(([k, v]) => renderNode(v, isArray ? undefined : k)).join('');

  return '<div>' + prefix +
    '<span class="bsapi-toggle" data-target="' + id + '">&#9662; ' + openBrace + '</span>' +
    '<div class="bsapi-children" id="' + id + '">' + children + '</div>' +
    closeBrace + '</div>';
}

tree.innerHTML = renderNode(DATA);

tree.addEventListener('click', e => {
  const toggle = e.target.closest('.bsapi-toggle');
  if (!toggle) return;
  const child = document.getElementById(toggle.dataset.target);
  const collapsed = child.classList.toggle('bsapi-collapsed');
  toggle.innerHTML = (collapsed ? '&#9656; ' : '&#9662; ') + toggle.textContent.trim().slice(-1);
});

document.getElementById('bsapiCopy').addEventListener('click', () => {
  navigator.clipboard.writeText(JSON.stringify(DATA, null, 2));
});`,

  seo: {
    title: 'Bootstrap API Response Viewer — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 JSON response viewer — recursively rendered, syntax-colored by type, with independently collapsible objects and arrays and a one-click Copy JSON action.',
    about: {
      title: 'Bootstrap API Response Viewer — HTML, CSS & JavaScript',
      description: `\`renderNode()\` is a genuinely recursive function, not a two-level special case for "an object with some flat values" — it calls itself for every nested object or array it encounters, however deep, which is why the sample response's \`customer\` object and \`items\` array (itself an array of objects) both render correctly with the same function that handles the top-level response. A value's type decides its color entirely through \`valueSpan()\`: strings, numbers, and booleans each get their own CSS class, which is what makes the viewer's syntax coloring accurate rather than a single uniform text color for every value.\n\nEach collapsible object or array gets a unique, incrementing \`id\` (via a closured \`nodeId\` counter) so its toggle arrow and its \`.bsapi-children\` block can find each other by that id regardless of how many other collapsible nodes exist elsewhere in the tree — collapsing the \`items\` array has zero effect on whether \`customer\` is expanded, because they're wired to completely independent ids.\n\n"Copy JSON" copies \`DATA\` itself, re-serialized fresh with \`JSON.stringify(DATA, null, 2)\`, rather than scraping the rendered HTML back into text — which guarantees the copied JSON is always valid and correctly formatted no matter what collapsed/expanded state the tree happens to be showing on screen at the time.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A full JSON response renders with colored strings, numbers, and booleans, fully expanded.' },
        { title: 'Click the arrow next to "items ["', text: 'Just that array collapses to a single line, independent of every other node in the tree.' },
        { title: 'Click the arrow again', text: 'It re-expands to show both order items exactly as before.' },
        { title: 'Collapse "customer" too', text: 'Both collapsed sections stay collapsed independently — collapsing one never affects the other.' },
        { title: 'Click "Copy JSON"', text: 'The complete, correctly formatted JSON is copied to the clipboard, regardless of what\'s currently collapsed on screen.' },
      ],
    },
    features: [
      'A genuinely recursive renderer that handles JSON of any nesting depth, not a fixed two-level layout',
      'Type-based syntax coloring — strings, numbers, and booleans each get a distinct, accurate color',
      'Every object and array node collapses independently via its own unique generated id',
      '"Copy JSON" re-serializes the original data object, always valid regardless of the tree\'s collapsed state',
      'A status badge and endpoint label give the response real request context, not just a bare JSON dump',
    ],
    useCases: [
      { icon: 'DEV', title: 'Internal admin tools and API debugging dashboards', desc: 'Pairs with [bootstrap-http-status-badge](/ui-snippets/bootstrap-http-status-badge/) for a fuller request/response inspection panel.' },
      { icon: 'API', title: 'Webhook and integration testing tools', desc: 'Inspect a payload\'s exact shape without leaving the app, alongside [bootstrap-webhook-event-viewer](/ui-snippets/bootstrap-webhook-event-viewer/)-style tooling.' },
      { icon: 'LEARN', title: 'Learning recursive rendering techniques', desc: 'A compact, complete example of rendering arbitrarily nested data with one function instead of hardcoding levels of depth.' },
    ],
    faqs: [
      { q: 'Does this handle deeply nested JSON, not just this one example?', a: 'Yes — renderNode() calls itself for every nested object or array regardless of depth, so a response with objects nested five levels deep would render (and collapse) exactly the same way this two-level example does.' },
      { q: 'Why does collapsing one section never affect another?', a: 'Each collapsible node gets its own unique id from an incrementing counter, and its toggle only ever looks up its own matching id\'s children block — there\'s no shared or global collapsed state that could leak between unrelated sections.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Convert renderNode() into a recursive component that renders itself for object/array values, track each node\'s collapsed state as a boolean (in local component state or a shared collapsed-ids Set), and keep "Copy JSON" serializing the original data object rather than reading rendered markup.' },
      { q: 'How would I connect this to a real API response?', a: 'Replace the DATA constant with the parsed JSON body from an actual fetch response — renderNode() makes no assumptions about the specific shape of the object, only that it\'s valid JSON-compatible data (objects, arrays, strings, numbers, booleans, null).' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "collapse all" / "expand all" pair of buttons that toggle every node's collapsed state at once, or to add inline key search/highlighting so a specific field name can be located quickly inside a very large response.`,
      prompt: `Build a Bootstrap 5.3 JSON API response viewer, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A sample nested JSON object (including at least one nested object and one array of objects) rendered as a syntax-colored tree — distinct colors for string, number, and boolean values.
- Render the tree with a genuinely recursive function that handles any nesting depth, not hardcoded levels.
- Every object and array in the tree must be independently collapsible/expandable via a click on its own toggle arrow, using a unique id per node so collapsing one has no effect on any other node.
- Include a status badge (e.g. "200 OK") and a request label above the tree for context.
- Add a "Copy JSON" button that copies a freshly re-serialized, correctly formatted version of the original data object to the clipboard, regardless of the tree's current collapsed/expanded state.`,
    },
  },
};

export default bootstrapApiResponseViewer;
