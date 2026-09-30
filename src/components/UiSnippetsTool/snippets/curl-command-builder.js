const curlCommandBuilder = {
  id: 'curl-command-builder',
  title: 'cURL Command Builder',
  category: 'dev',
  html: `<div class="wrap">
  <h2>cURL Command Builder</h2>

  <div class="row-top">
    <select id="method-select">
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>PATCH</option>
      <option>DELETE</option>
      <option>HEAD</option>
    </select>
    <input type="text" id="url-input" spellcheck="false" placeholder="https://api.example.com/v1/users" value="https://api.example.com/v1/users" />
  </div>

  <div class="section-head">
    <span>Headers</span>
    <button id="add-header">+ Add header</button>
  </div>
  <div class="headers-list" id="headers-list"></div>

  <div class="section-head">
    <span>Request body (JSON)</span>
    <label class="pretty-toggle"><input type="checkbox" id="pretty-toggle" /> multi-line</label>
  </div>
  <textarea id="body-input" spellcheck="false" placeholder='{"name": "Ada Lovelace"}'></textarea>

  <div class="output-head">
    <span>Generated command</span>
    <button id="copy-btn">Copy</button>
  </div>
  <pre id="curl-output"></pre>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.row-top { display: flex; gap: 8px; margin-bottom: 18px; }
#method-select { padding: 10px 8px; border: 1.5px solid #e2e8f0; border-radius: 9px; font-weight: 700; font-size: 13px; color: #4f46e5; background: #fff; }
#url-input { flex: 1; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 9px; font-family: "SF Mono", Consolas, monospace; font-size: 13px; color: #1e293b; }
#url-input:focus, #method-select:focus { outline: none; border-color: #6366f1; }

.section-head { display: flex; align-items: center; justify-content: space-between; margin: 4px 0 8px; }
.section-head span { font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; }
#add-header { font-size: 11px; font-weight: 700; color: #4f46e5; background: #eef2ff; border: 1px solid #c7d2fe; padding: 5px 10px; border-radius: 7px; cursor: pointer; }
#add-header:hover { background: #e0e7ff; }
.pretty-toggle { font-size: 11px; font-weight: 600; color: #64748b; display: flex; align-items: center; gap: 5px; cursor: pointer; }

.headers-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.header-row { display: flex; gap: 6px; }
.header-row input { flex: 1; min-width: 0; padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-family: "SF Mono", Consolas, monospace; font-size: 12px; color: #1e293b; }
.header-row input.h-key { color: #6366f1; font-weight: 700; flex: 0 0 40%; }
.header-row button { flex-shrink: 0; width: 28px; height: 28px; border-radius: 7px; border: 1px solid #fecaca; background: #fef2f2; color: #dc2626; font-size: 14px; cursor: pointer; }
.header-row button:hover { background: #fee2e2; }
.no-headers { font-size: 12px; color: #94a3b8; padding: 4px 2px 8px; }

#body-input { width: 100%; min-height: 70px; resize: vertical; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 9px; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; color: #1e293b; margin-bottom: 18px; }
#body-input:focus { outline: none; border-color: #6366f1; }
#body-input.invalid { border-color: #dc2626; }

.output-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.output-head span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }
#copy-btn { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; cursor: pointer; }
#copy-btn:hover { background: #334155; }
#copy-btn.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }

#curl-output { background: #0f172a; border-radius: 12px; padding: 14px 16px; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; color: #a5b4fc; white-space: pre-wrap; word-break: break-word; line-height: 1.8; }`,
  js: `const methodSelect = document.getElementById('method-select');
const urlInput = document.getElementById('url-input');
const headersList = document.getElementById('headers-list');
const addHeaderBtn = document.getElementById('add-header');
const bodyInput = document.getElementById('body-input');
const prettyToggle = document.getElementById('pretty-toggle');
const curlOutput = document.getElementById('curl-output');
const copyBtn = document.getElementById('copy-btn');

let headers = [
  { key: 'Content-Type', value: 'application/json' },
  { key: 'Authorization', value: 'Bearer YOUR_TOKEN' },
];

function shellEscape(str) {
  return "'" + String(str).replace(/'/g, "'\\\\''") + "'";
}

function renderHeaders() {
  if (!headers.length) {
    headersList.innerHTML = '<div class="no-headers">No headers added.</div>';
    return;
  }
  headersList.innerHTML = headers.map((h, i) => {
    return '<div class="header-row">' +
      '<input class="h-key" data-idx="' + i + '" data-field="key" value="' + escapeAttr(h.key) + '" placeholder="Header-Name" />' +
      '<input class="h-val" data-idx="' + i + '" data-field="value" value="' + escapeAttr(h.value) + '" placeholder="value" />' +
      '<button data-idx="' + i + '" title="Remove">\\u00d7</button>' +
    '</div>';
  }).join('');
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function build() {
  const method = methodSelect.value;
  const url = urlInput.value.trim() || 'https://example.com';
  const pretty = prettyToggle.checked;
  const sep = pretty ? ' \\\\\\n  ' : ' ';

  let cmd = 'curl';
  if (method !== 'GET') cmd += sep + '-X ' + method;
  cmd += sep + shellEscape(url);

  headers.forEach(h => {
    if (!h.key) return;
    cmd += sep + '-H ' + shellEscape(h.key + ': ' + h.value);
  });

  const bodyRaw = bodyInput.value.trim();
  bodyInput.classList.remove('invalid');
  if (bodyRaw) {
    try {
      JSON.parse(bodyRaw);
    } catch (e) {
      bodyInput.classList.add('invalid');
    }
    cmd += sep + '-d ' + shellEscape(bodyRaw);
  }

  curlOutput.textContent = cmd;
}

headersList.addEventListener('input', (e) => {
  const idx = e.target.dataset.idx;
  const field = e.target.dataset.field;
  if (idx === undefined) return;
  headers[idx][field] = e.target.value;
  build();
});

headersList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-idx]');
  if (!btn) return;
  headers.splice(parseInt(btn.dataset.idx, 10), 1);
  renderHeaders();
  build();
});

addHeaderBtn.addEventListener('click', () => {
  headers.push({ key: '', value: '' });
  renderHeaders();
  build();
  const lastInput = headersList.querySelector('.header-row:last-child .h-key');
  if (lastInput) lastInput.focus();
});

[methodSelect, urlInput, bodyInput, prettyToggle].forEach(el => {
  el.addEventListener('input', build);
  el.addEventListener('change', build);
});

copyBtn.addEventListener('click', () => {
  const text = curlOutput.textContent;
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

bodyInput.value = '{\\n  "name": "Ada Lovelace",\\n  "role": "admin"\\n}';
renderHeaders();
build();`,

  seo: {
    title: 'cURL Command Builder — Generate curl Commands from a Form',
    description: 'Build a correctly shell-escaped curl command from method, URL, headers, and a JSON body using a live form, with JSON validation and one-click copy. Exports to React, Vue & Tailwind.',
    about: {
      title: 'cURL Command Builder — Generate a Correctly Escaped curl Request from Method, Headers & Body',
      description: `Hand-writing a curl command with multiple headers and a JSON body means juggling quote characters, escaping, and line-continuation backslashes — and one misplaced quote silently breaks the whole command. This snippet flips that process around: fill in a method, a URL, a list of headers, and a JSON body through ordinary form fields, and it assembles a correctly shell-escaped \`curl\` command as you type, ready to paste straight into a terminal.

**Why every value goes through shellEscape()**

The single most important function in this tool is \`shellEscape()\`, which wraps every dynamic value — the URL, each header's \`key: value\` pair, and the JSON body — in single quotes, and handles the one tricky case: a literal single quote appearing inside a value. POSIX shells cannot escape a quote character *inside* single quotes directly, so the standard trick is used: close the quote, insert an escaped single quote, then reopen the quote (\`'\\''\`). Every value passed through \`shellEscape()\` is safe to paste into bash, zsh, or any POSIX-compatible shell without breaking the command or allowing accidental shell injection, regardless of what punctuation the header value or JSON body contains.

**Method flag omitted for GET, matching curl's actual default**

The \`-X\` method flag is only added when the method is not \`GET\`, because \`curl\` defaults to \`GET\` and explicitly adding \`-X GET\` is both redundant and, in one curl-specific edge case, can subtly change how a request with a body is sent. This mirrors what an experienced engineer writing curl commands by hand would actually do — omit flags that aren't needed rather than including every option unconditionally.

**Headers as an editable array with a default useful pair**

Headers are stored as an array of \`{ key, value }\` objects, pre-populated with a realistic \`Content-Type: application/json\` and \`Authorization: Bearer YOUR_TOKEN\` pair since those two headers appear in the overwhelming majority of authenticated JSON API requests. Each header contributes its own \`-H\` flag with the shell-escaped \`"key: value"\` string, and empty-key rows are silently skipped when building the command so an in-progress blank row never corrupts the output.

**Live JSON validation on the body without blocking the command**

The body textarea is validated with \`JSON.parse()\` inside a \`try/catch\` purely for feedback — an invalid JSON body highlights the textarea in red as a warning, but the command is still generated and includes the \`-d\` flag with whatever text is present. This is a deliberate choice: sometimes a request body is intentionally not strict JSON (form-encoded data, a GraphQL query string, or a body under active editing), so validation should warn without ever blocking output.

**Pretty-print mode for multi-line readability**

Toggling "multi-line" changes the separator between each part of the command from a plain space to \` \\\\\\n  \` — a trailing backslash followed by a newline and indentation, which is the standard shell line-continuation syntax. This produces a command that reads cleanly across multiple lines in documentation or a README, functionally identical to the single-line version when pasted into a terminal, since the shell treats a backslash-newline sequence as if it were not there at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Choose a method and enter a URL', text: 'Select GET, POST, PUT, PATCH, DELETE, or HEAD, and type the target endpoint URL.' },
        { title: 'Add or edit headers', text: 'Two common headers are pre-filled. Click "+ Add header" for more, or edit the key/value fields directly.' },
        { title: 'Write the JSON request body', text: 'Type or paste a JSON body. Invalid JSON is highlighted in red as a warning without blocking the generated command.' },
        { title: 'Toggle multi-line formatting', text: 'Check "multi-line" to format the command across multiple lines with backslash continuations, ideal for documentation.' },
        { title: 'Copy the generated command', text: 'Click "Copy" to copy the fully shell-escaped curl command to your clipboard.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Correctly shell-escapes every dynamic value using the POSIX single-quote-close-escape-reopen trick',
      'Omits the -X flag for GET requests, matching curl\'s real default behavior',
      'Editable header list stored as an array, pre-populated with Content-Type and Authorization',
      'Live JSON.parse() validation on the request body with non-blocking visual warning',
      'Multi-line pretty-print mode using standard backslash-newline shell continuation syntax',
      'Empty header rows are automatically skipped when generating the command',
      'One-click Copy of the generated command via the Clipboard API',
      'Updates live on every field change — method, URL, headers, and body',
    ],
    useCases: [
      { icon: 'CODE', title: 'Sharing a reproducible API request', desc: 'Build a request once through the form and copy a curl command a teammate can paste directly into their terminal to reproduce the exact same request.' },
      { icon: 'APP', title: 'Writing API documentation', desc: 'Use the multi-line mode to generate clean, readable curl examples for a README or internal API reference document.' },
      { icon: 'LEARN', title: 'Teaching curl and shell escaping', desc: 'Show why values need quoting in shell commands by typing an apostrophe into a header value and watching shellEscape() produce the correct escaped output.' },
      { icon: 'FLOW', title: 'Quickly testing an endpoint', desc: 'Fill in a URL, an Authorization header, and a body, then copy straight into a terminal to hit an API without writing the curl syntax from memory.' },
      { icon: 'DASH', title: 'Internal developer tooling', desc: 'Pair with the [Query String Parser & Builder](/ui-snippets/query-string-parser/) or [JWT Decoder](/ui-snippets/jwt-decoder/) in an internal dev-tools dashboard for API debugging workflows.' },
      { icon: 'CODE', title: 'Related: HTTP Status Code Reference', desc: 'See the [HTTP Status Code Reference](/ui-snippets/http-status-code-reference/) for a related dev tool worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Meta & Open Graph Tag Generator', desc: 'See the [Meta & Open Graph Tag Generator](/ui-snippets/meta-og-tag-generator/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does shellEscape() safely handle quotes inside values?', a: 'It wraps the whole value in single quotes, and for any literal single quote inside the value it uses the standard POSIX trick of closing the quote, inserting an escaped quote, and reopening the quote (\'\\\'\'). This produces a string that is always safe to paste into bash or zsh regardless of what characters the value contains.' },
      { q: 'Why is there no -X GET in the generated command?', a: 'curl defaults to a GET request when no -X flag is given, so omitting it for GET requests produces a cleaner command and avoids a curl-specific edge case where -X GET combined with certain other flags can behave slightly differently than a true default GET.' },
      { q: 'What happens if my JSON body is invalid?', a: 'The textarea border turns red as a non-blocking warning, but the command is still generated using whatever text is present in the -d flag. This is intentional since the body field is sometimes used for non-JSON payloads like form-encoded data or a GraphQL query.' },
      { q: 'What does the multi-line toggle actually change?', a: 'It replaces the plain space separator between each command part with a backslash, a newline, and two spaces of indentation — the standard shell line-continuation syntax. The resulting multi-line command behaves identically when pasted into a terminal.' },
      { q: 'Are empty header rows included in the generated command?', a: 'No. A header row with an empty key is skipped entirely when building the command, so adding a blank row while editing never produces a broken -H flag.' },
      { q: 'Is my API token or request data sent anywhere?', a: 'No. Everything is assembled client-side as a plain string; no request is actually made and nothing is transmitted to a server, so it is safe to fill in real tokens and payloads while building the command.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain exactly why the single-quote-close-escape-reopen trick in shellEscape() is necessary for safe shell escaping, and what could go wrong with a naive approach that just wraps values in double quotes instead. It is also a solid base to extend: ask for a reverse mode that parses a pasted curl command back into the form fields, support for --data-urlencode for form-encoded bodies, or a "copy as fetch()" button that generates equivalent JavaScript fetch code from the same form state.`,
      prompt: `Build a curl command builder in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A method dropdown (GET, POST, PUT, PATCH, DELETE, HEAD) and a URL text input, both driving a live-generated curl command.
- An editable list of HTTP header rows (key and value text inputs each), with an add button that appends a new blank row and a remove button per row, pre-populated with one or two realistic example headers.
- A textarea for a JSON request body, validated with JSON.parse() inside a try/catch purely to show a non-blocking visual warning on invalid JSON — the body must still be included in the generated command even if it fails validation.
- A shell-escaping function applied to every dynamic value (URL, each header's "key: value" string, and the body) that wraps values in single quotes and correctly handles a literal single quote appearing inside the value using the standard POSIX close-quote/escaped-quote/reopen-quote technique, so the output is always safe to paste into a real shell.
- Omit the -X method flag entirely when the method is GET, matching curl's actual default behavior, and skip any header row whose key is empty.
- A "multi-line" checkbox toggle that reformats the command using backslash-newline shell line-continuation syntax between each part instead of plain spaces.
- A Copy button that copies the final generated command to the clipboard using the Clipboard API, with a brief visual confirmation.`,
    },
  },
};

export default curlCommandBuilder;
