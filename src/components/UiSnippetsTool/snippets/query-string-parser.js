const queryStringParser = {
  id: 'query-string-parser',
  title: 'URL Query String Parser & Builder',
  category: 'dev',
  html: `<div class="wrap">
  <h2>Query String Parser & Builder</h2>

  <label class="field-label">Full URL or query string</label>
  <input type="text" id="url-input" spellcheck="false" value="https://example.com/search?q=running+shoes&category=sports&page=2&sort=price_asc" />

  <div class="params-head">
    <span>Parameters</span>
    <button id="add-param">+ Add param</button>
  </div>
  <div class="params-list" id="params-list"></div>

  <div class="output-head">Rebuilt URL</div>
  <div class="output-row">
    <pre id="rebuilt-url"></pre>
    <button id="copy-btn">Copy</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 700px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.field-label { display: block; font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
#url-input {
  width: 100%; padding: 11px 13px; border: 1.5px solid #e2e8f0; border-radius: 9px;
  font-family: "SF Mono", Consolas, monospace; font-size: 13px; color: #1e293b; margin-bottom: 18px;
}
#url-input:focus { outline: none; border-color: #6366f1; }
#url-input.invalid { border-color: #dc2626; }

.params-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.params-head span { font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; }
#add-param { font-size: 11.5px; font-weight: 700; color: #4f46e5; background: #eef2ff; border: 1px solid #c7d2fe; padding: 5px 10px; border-radius: 7px; cursor: pointer; }
#add-param:hover { background: #e0e7ff; }

.params-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.param-row { display: flex; gap: 6px; align-items: center; }
.param-row input { flex: 1; min-width: 0; padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; color: #1e293b; }
.param-row input.key { color: #6366f1; font-weight: 700; flex: 0 0 34%; }
.param-row input:focus { outline: none; border-color: #6366f1; }
.param-row button { flex-shrink: 0; width: 28px; height: 28px; border-radius: 7px; border: 1px solid #fecaca; background: #fef2f2; color: #dc2626; font-size: 14px; cursor: pointer; line-height: 1; }
.param-row button:hover { background: #fee2e2; }
.no-params { font-size: 12.5px; color: #94a3b8; padding: 8px 2px; }

.output-head { font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
.output-row { display: flex; gap: 8px; align-items: flex-start; background: #0f172a; border-radius: 10px; padding: 12px 14px; }
#rebuilt-url { flex: 1; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; color: #a5b4fc; white-space: pre-wrap; word-break: break-all; line-height: 1.6; }
#copy-btn { flex-shrink: 0; background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 11px; font-weight: 700; padding: 6px 10px; border-radius: 6px; cursor: pointer; }
#copy-btn:hover { background: #334155; }
#copy-btn.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }`,
  js: `const urlInput = document.getElementById('url-input');
const paramsList = document.getElementById('params-list');
const addParamBtn = document.getElementById('add-param');
const rebuiltUrl = document.getElementById('rebuilt-url');
const copyBtn = document.getElementById('copy-btn');

let baseOrigin = '';
let basePath = '';
let params = [];

function splitUrl(raw) {
  raw = raw.trim();
  const qIndex = raw.indexOf('?');
  if (qIndex === -1) return { prefix: raw, query: '' };
  return { prefix: raw.slice(0, qIndex), query: raw.slice(qIndex + 1) };
}

function parseFromInput() {
  const raw = urlInput.value;
  const { prefix, query } = splitUrl(raw);
  basePath = prefix;
  urlInput.classList.remove('invalid');

  let usp;
  try {
    usp = new URLSearchParams(query);
  } catch (e) {
    urlInput.classList.add('invalid');
    usp = new URLSearchParams();
  }

  params = [];
  usp.forEach((value, key) => { params.push({ key, value }); });
  renderParams();
  renderOutput();
}

function renderParams() {
  if (!params.length) {
    paramsList.innerHTML = '<div class="no-params">No parameters yet. Click "+ Add param" or type a query string above.</div>';
    return;
  }
  paramsList.innerHTML = '';
  params.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'param-row';
    row.innerHTML =
      '<input class="key" data-idx="' + i + '" data-field="key" value="' + escapeAttr(p.key) + '" placeholder="key" />' +
      '<input class="val" data-idx="' + i + '" data-field="value" value="' + escapeAttr(p.value) + '" placeholder="value" />' +
      '<button data-idx="' + i + '" title="Remove">\\u00d7</button>';
    paramsList.appendChild(row);
  });
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function renderOutput() {
  const usp = new URLSearchParams();
  params.forEach(p => { if (p.key) usp.append(p.key, p.value); });
  const queryStr = usp.toString();
  rebuiltUrl.textContent = basePath + (queryStr ? '?' + queryStr : '');
}

paramsList.addEventListener('input', (e) => {
  const idx = e.target.dataset.idx;
  const field = e.target.dataset.field;
  if (idx === undefined) return;
  params[idx][field] = e.target.value;
  renderOutput();
});

paramsList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-idx]');
  if (!btn) return;
  params.splice(parseInt(btn.dataset.idx, 10), 1);
  renderParams();
  renderOutput();
});

addParamBtn.addEventListener('click', () => {
  params.push({ key: '', value: '' });
  renderParams();
  renderOutput();
  const lastInput = paramsList.querySelector('.param-row:last-child .key');
  if (lastInput) lastInput.focus();
});

urlInput.addEventListener('input', parseFromInput);

copyBtn.addEventListener('click', () => {
  const text = rebuiltUrl.textContent;
  const finish = () => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(finish);
  } else {
    finish();
  }
});

parseFromInput();`,

  seo: {
    title: 'URL Query String Parser & Builder — Free Snippet',
    description: 'Parse a URL query string into editable key/value rows using real URLSearchParams, then rebuild a correctly encoded URL live. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Query String Parser & Builder — Live URLSearchParams Editing with Correct Percent-Encoding',
      description: `A URL's query string looks simple until you have to hand-edit one with an ampersand inside a value, a plus sign that means a literal space, or a parameter repeated twice with different values. This snippet parses any full URL or bare query string into an editable table of key/value rows using the browser's own \`URLSearchParams\` API, then rebuilds a correctly percent-encoded URL from those rows on every edit — so you never have to remember encoding rules by hand.

**Splitting the URL from its query string**

\`splitUrl()\` finds the first \`?\` character and splits the input into a \`prefix\` (everything before it — scheme, host, and path) and a \`query\` (everything after). This is a deliberately simple split rather than a full URL-parsing implementation, because it needs to accept both a complete URL and a bare query string like \`a=1&b=2\` typed on its own, which the stricter built-in \`URL\` constructor would reject for lacking a scheme and host.

**URLSearchParams does the real parsing**

\`new URLSearchParams(query)\` is the browser's native query-string parser: it understands \`&\`-separated pairs, \`=\`-separated key/value pairs, \`+\` as an encoded space (per the \`application/x-www-form-urlencoded\` convention used in query strings), and full percent-decoding of any \`%XX\` sequence. Iterating it with \`.forEach((value, key) => ...)\` correctly yields every occurrence of a repeated key as a separate pair, so \`?tag=a&tag=b\` becomes two distinct rows in the editable list rather than being collapsed or overwritten — a detail a hand-rolled \`split('&').map(...)\` parser very commonly gets wrong.

**Editable rows kept as an in-memory array of objects**

Parsed parameters are stored as a plain array of \`{ key, value }\` objects, re-rendered into a row of two text inputs and a remove button per parameter. Editing a key or value field updates that array entry directly via a single delegated \`input\` listener on the container (reading \`data-idx\` and \`data-field\` attributes from the event target), rather than attaching a listener to every individual input — a pattern that scales cleanly regardless of how many parameters are added or removed.

**Rebuilding with correct encoding, not string concatenation**

\`renderOutput()\` builds a fresh \`URLSearchParams\` from the current row data and calls \`.append(key, value)\` for each one, then \`.toString()\` to produce the encoded query string. This is the critical correctness detail: manually concatenating \`key + '=' + value + '&'\` would produce a broken URL the moment any value contains an \`&\`, a space, or a non-ASCII character, since none of those get escaped. Delegating to \`URLSearchParams.toString()\` guarantees standards-correct percent-encoding every time, matching exactly what \`fetch()\` or \`XMLHttpRequest\` would produce for the same parameters.

**Adding, removing, and copying**

The "+ Add param" button pushes an empty row and focuses its key input immediately, keeping the editing flow fast for building a query string from scratch rather than only editing an existing one. Each row's remove button splices that entry out of the array by index. The final rebuilt URL is shown in a read-only panel with a one-click Copy button using \`navigator.clipboard.writeText()\`, with a safe fallback confirmation if the Clipboard API is unavailable.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste a URL or query string', text: 'Paste a full URL with a ?query or just a bare a=1&b=2 style string into the top input — it parses immediately.' },
        { title: 'Edit parameters as rows', text: 'Each key and value becomes its own editable text field. Change either one and the rebuilt URL updates live below.' },
        { title: 'Add a new parameter', text: 'Click "+ Add param" to append a blank row, ready to type a new key and value into.' },
        { title: 'Remove a parameter', text: 'Click the × button on any row to delete that parameter entirely.' },
        { title: 'Copy the rebuilt URL', text: 'Click "Copy" to copy the correctly percent-encoded final URL to your clipboard.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Real URLSearchParams-based parsing — correctly handles repeated keys, + as space, and percent-decoding',
      'Accepts either a full URL or a bare query string as input',
      'Editable key/value rows backed by a plain in-memory array, re-rendered efficiently on every change',
      'Rebuilds the query string via URLSearchParams.toString() for guaranteed correct percent-encoding',
      'Add and remove parameter rows dynamically with automatic focus on the newest field',
      'Single delegated input listener handles edits across any number of rows',
      'One-click Copy of the final rebuilt URL via the Clipboard API',
      'Invalid input is visually flagged without crashing the parser',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging a tracking or analytics URL', desc: 'Paste a long UTM-tagged marketing URL to see every parameter broken out individually, then tweak utm_source or utm_campaign and copy the corrected link.' },
      { icon: 'FORM', title: 'Building an API request URL by hand', desc: 'Add query parameters one at a time while testing an API endpoint, confirming the exact encoded string that will be sent before pasting it into curl or a browser.' },
      { icon: 'LEARN', title: 'Teaching URL encoding rules', desc: 'Show students how a space becomes + or %20, and how an ampersand inside a value gets encoded to %26, by typing tricky values directly into the value field.' },
      { icon: 'APP', title: 'Internal developer tooling', desc: 'Pair with the [JWT Decoder](/ui-snippets/jwt-decoder/) or [Regex Tester](/ui-snippets/regex-tester/) in an internal dev-tools dashboard for quick request debugging.' },
      { icon: 'FLOW', title: 'Cleaning up a URL before sharing', desc: 'Strip out unwanted tracking parameters by removing their rows, then copy a clean shareable link.' },
      { icon: 'CODE', title: 'Related: JWT Decoder & Inspector', desc: 'See the [JWT Decoder & Inspector](/ui-snippets/jwt-decoder/) for a related client-side dev tool worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this use a real URL parser or hand-written string splitting?', a: 'Splitting the base URL from the query string uses a simple indexOf(\'?\') split, but all actual query-string parsing and rebuilding is delegated to the browser\'s native URLSearchParams object, which correctly handles percent-decoding, + as a space, and repeated keys.' },
      { q: 'What happens with a repeated parameter key, like tag=a&tag=b?', a: 'URLSearchParams.forEach() correctly yields both occurrences as separate entries, so they appear as two distinct editable rows rather than being merged or having one silently overwrite the other.' },
      { q: 'How does the rebuilt URL guarantee correct encoding?', a: 'Instead of concatenating strings by hand, the rebuild step constructs a fresh URLSearchParams object from the current rows and calls its .toString() method, which applies standards-correct percent-encoding automatically — the same encoding fetch() or a native form submission would produce.' },
      { q: 'Can I paste just a query string without a full URL?', a: 'Yes. If there is no ? in the pasted text, it is treated entirely as the base path with no parameters; if there is a ?, everything before it becomes the base and everything after is parsed as parameters. A bare a=1&b=2 with no leading path also works since it is passed straight to URLSearchParams.' },
      { q: 'Does editing a key or value re-parse the whole URL from scratch?', a: 'No. Edits update the specific entry in an in-memory array of key/value objects via a single delegated input listener, and only the rebuilt-URL output re-renders — the full input field is not re-parsed on every keystroke inside a parameter row.' },
      { q: 'Is anything sent to a server?', a: 'No. All parsing, editing, and rebuilding happens client-side using URLSearchParams; nothing is transmitted anywhere, so it is safe to use with URLs containing sensitive query parameters during local debugging.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain exactly why manually concatenating key=value&key2=value2 strings is unsafe compared to using URLSearchParams.toString(), with concrete examples of values that would break the naive approach. It is also a solid base to extend: ask for a "decode all values" toggle that shows the raw decoded value next to the encoded one, sorting parameters alphabetically before rebuilding, or a diff view comparing the original and edited query strings side by side.`,
      prompt: `Build a URL query string parser and builder in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A text input accepting either a full URL with a query string or a bare query string on its own, parsed live on every keystroke.
- Split the base path from the query string using the first ? character, then parse the query portion using the browser's native URLSearchParams object so repeated keys, + as space, and percent-encoded characters are all handled correctly rather than with hand-written string splitting.
- Render each parsed parameter as an editable row with a key input and a value input; editing either field updates an in-memory array of {key, value} objects and immediately re-renders the final rebuilt URL.
- Provide an "Add parameter" button that appends a new blank editable row and focuses its key field, and a remove button on each row that deletes that parameter.
- Rebuild the final URL by constructing a new URLSearchParams from the current rows and calling its toString() method (not manual string concatenation) to guarantee standards-correct percent-encoding, and display the result alongside the original base path.
- Add a "Copy" button that copies the final rebuilt URL to the clipboard using the Clipboard API, with a brief visual confirmation and a safe fallback if the API is unavailable.`,
    },
  },
};

export default queryStringParser;
