const jsonFormatterValidator = {
  id: 'json-formatter-validator',
  title: 'JSON Formatter & Validator',
  category: 'dev',
  html: `<div class="wrap">
  <div class="header">
    <h2>JSON Formatter &amp; Validator</h2>
    <span class="badge" id="status-badge">Paste JSON</span>
  </div>

  <textarea id="json-input" spellcheck="false">{"user":{"id":482,"name":"Ada Lovelace","roles":["admin","editor"],"active":true,"balance":128.5,"meta":null}}</textarea>

  <div class="toolbar">
    <button id="format-btn">Format</button>
    <button id="minify-btn">Minify</button>
    <button id="copy-btn">Copy</button>
    <div class="indent-control">
      <label for="indent-select">Indent</label>
      <select id="indent-select">
        <option value="2">2 spaces</option>
        <option value="4">4 spaces</option>
        <option value="tab">Tab</option>
      </select>
    </div>
  </div>

  <div id="error-box" class="error-box" hidden></div>

  <pre id="json-output" class="out"></pre>

  <div class="stats" id="stats-row"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; padding: 28px 20px; color: #e2e8f0; }

.wrap { max-width: 760px; margin: 0 auto; }

.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
h2 { font-size: 18px; font-weight: 800; }
.badge { font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 999px; background: #1e293b; color: #94a3b8; border: 1px solid #334155; }
.badge.valid { background: rgba(34,197,94,0.15); color: #4ade80; border-color: rgba(34,197,94,0.3); }
.badge.invalid { background: rgba(239,68,68,0.15); color: #f87171; border-color: rgba(239,68,68,0.3); }

#json-input {
  width: 100%; min-height: 100px; resize: vertical; padding: 12px 14px;
  background: #1e293b; border: 1.5px solid #334155; border-radius: 10px;
  color: #a5b4fc; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; line-height: 1.6;
}
#json-input:focus { outline: none; border-color: #6366f1; }

.toolbar { display: flex; align-items: center; gap: 8px; margin: 12px 0; flex-wrap: wrap; }
.toolbar button {
  background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 12px; font-weight: 700;
  padding: 7px 14px; border-radius: 8px; cursor: pointer;
}
.toolbar button:hover { background: #334155; }
.toolbar button.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }
.indent-control { margin-left: auto; display: flex; align-items: center; gap: 6px; }
.indent-control label { font-size: 11px; color: #94a3b8; font-weight: 700; }
.indent-control select { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 12px; padding: 6px 8px; border-radius: 6px; }

.error-box {
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.35); color: #fca5a5;
  padding: 10px 14px; border-radius: 8px; font-size: 12.5px; margin-bottom: 12px; font-family: "SF Mono", Consolas, monospace;
}

.out {
  background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 14px 16px;
  font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; line-height: 1.7;
  white-space: pre-wrap; word-break: break-word; min-height: 60px; max-height: 420px; overflow: auto;
}
.tok-key { color: #93c5fd; }
.tok-str { color: #86efac; }
.tok-num { color: #fbbf24; }
.tok-bool { color: #f472b6; }
.tok-null { color: #94a3b8; }
.tok-punc { color: #64748b; }

.stats { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.stat-chip { font-size: 11.5px; padding: 6px 10px; border-radius: 8px; background: #1e293b; border: 1px solid #334155; color: #cbd5e1; }
.stat-chip b { color: #a5b4fc; }`,
  js: `const input = document.getElementById('json-input');
const output = document.getElementById('json-output');
const errorBox = document.getElementById('error-box');
const badge = document.getElementById('status-badge');
const statsRow = document.getElementById('stats-row');
const formatBtn = document.getElementById('format-btn');
const minifyBtn = document.getElementById('minify-btn');
const copyBtn = document.getElementById('copy-btn');
const indentSelect = document.getElementById('indent-select');

function currentIndent() {
  const v = indentSelect.value;
  return v === 'tab' ? '\\t' : Number(v);
}

function locateError(text, message) {
  const match = /position (\\d+)/.exec(message);
  if (!match) return message;
  const pos = Number(match[1]);
  const upToError = text.slice(0, pos);
  const line = upToError.split('\\n').length;
  const col = pos - upToError.lastIndexOf('\\n');
  return message + ' (line ' + line + ', column ' + col + ')';
}

function countKeys(value, depthState) {
  if (value === null || typeof value !== 'object') return 0;
  depthState.depth += 1;
  let total = Array.isArray(value) ? 0 : Object.keys(value).length;
  const entries = Array.isArray(value) ? value : Object.values(value);
  let maxChildDepth = depthState.depth;
  entries.forEach((child) => {
    const childState = { depth: depthState.depth };
    total += countKeys(child, childState);
    if (childState.depth > maxChildDepth) maxChildDepth = childState.depth;
  });
  depthState.depth = maxChildDepth;
  return total;
}

function highlight(jsonText) {
  const escaped = jsonText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const pattern = /("(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\"])*"(\\s*:)?|\\b(true|false)\\b|\\bnull\\b|-?\\d+(\\.\\d+)?([eE][+-]?\\d+)?)/g;
  return escaped.replace(pattern, (match) => {
    let cls = 'tok-num';
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'tok-key' : 'tok-str';
    } else if (/true|false/.test(match)) {
      cls = 'tok-bool';
    } else if (/null/.test(match)) {
      cls = 'tok-null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function render(formatted, parsed) {
  output.innerHTML = highlight(formatted);
  statsRow.innerHTML = '';
  if (parsed === undefined) return;
  const depthState = { depth: 1 };
  const keyCount = countKeys(parsed, depthState);
  const chips = [
    ['Characters', formatted.length],
    ['Keys', keyCount],
    ['Max depth', depthState.depth],
    ['Type', Array.isArray(parsed) ? 'array' : typeof parsed],
  ];
  chips.forEach(([k, v]) => {
    const chip = document.createElement('div');
    chip.className = 'stat-chip';
    chip.innerHTML = '<b>' + k + '</b>: ' + v;
    statsRow.appendChild(chip);
  });
}

function format() {
  const text = input.value.trim();
  if (!text) {
    badge.textContent = 'Paste JSON';
    badge.className = 'badge';
    errorBox.hidden = true;
    output.textContent = '';
    statsRow.innerHTML = '';
    return;
  }
  try {
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, currentIndent());
    errorBox.hidden = true;
    badge.textContent = 'Valid JSON';
    badge.className = 'badge valid';
    render(formatted, parsed);
  } catch (err) {
    badge.textContent = 'Invalid JSON';
    badge.className = 'badge invalid';
    errorBox.hidden = false;
    errorBox.textContent = locateError(text, err.message);
    output.textContent = '';
    statsRow.innerHTML = '';
  }
}

function minify() {
  const text = input.value.trim();
  try {
    const parsed = JSON.parse(text);
    const compact = JSON.stringify(parsed);
    errorBox.hidden = true;
    badge.textContent = 'Valid JSON';
    badge.className = 'badge valid';
    render(compact, parsed);
  } catch (err) {
    badge.textContent = 'Invalid JSON';
    badge.className = 'badge invalid';
    errorBox.hidden = false;
    errorBox.textContent = locateError(text, err.message);
  }
}

formatBtn.addEventListener('click', format);
minifyBtn.addEventListener('click', minify);
indentSelect.addEventListener('change', format);
input.addEventListener('input', format);

copyBtn.addEventListener('click', () => {
  const text = output.textContent;
  if (!text) return;
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

format();`,

  seo: {
    title: 'JSON Formatter & Validator — Free HTML CSS JS Snippet',
    description: 'Format, minify and validate JSON in the browser with precise line/column error locations, syntax highlighting and live key/depth stats. Exports to React, Vue & Tailwind.',
    about: {
      title: 'JSON Formatter & Validator — Pretty-Print, Minify & Locate Parse Errors by Line and Column',
      description: `Malformed JSON is one of the most common time-sinks in web development — a trailing comma, an unquoted key, or a stray comment breaks an entire config file, and the browser's native error message ("Unexpected token in JSON at position 214") tells you almost nothing about where to look. This snippet builds a real formatter and validator entirely on top of the browser's built-in \`JSON.parse\` and \`JSON.stringify\`, but adds the missing piece: translating that raw character position into a human-readable line and column number.

**Turning a byte offset into a line and column**

V8-based engines (Chrome, Edge, Node) append \`position N\` to their JSON parse error messages. \`locateError()\` extracts that number with a regular expression, slices the original input up to that offset, and counts how many newline characters appear before it — that count plus one is the line number. The column is the offset minus the index of the most recent newline. This is exactly the technique a real IDE's JSON linter uses under the hood, just without a full recursive-descent parser.

**Format vs minify are the same operation with a different indent**

Both buttons call \`JSON.parse\` followed by \`JSON.stringify(parsed, null, indent)\`. Format passes the currently selected indent width (2, 4, or a literal tab character); minify passes no third argument at all, which tells \`JSON.stringify\` to omit whitespace entirely. Round-tripping through parse and stringify also normalizes the input — inconsistent spacing, mixed indentation, and even key ordering (which \`JSON.stringify\` preserves as insertion order per the spec) all come out consistent.

**Syntax highlighting with one regular expression**

Rather than writing a second JSON parser just to colorize tokens, \`highlight()\` runs a single regex over the already-valid, already-formatted JSON string that matches strings (including one that is immediately followed by a colon, marking it as a key rather than a value), booleans, \`null\`, and numbers including exponents and decimals. Because the string only reaches the highlighter after a successful \`JSON.parse\`, the regex never has to handle malformed input — it only needs to distinguish between five well-defined token categories.

**Recursively computing key count and max nesting depth**

\`countKeys()\` walks the parsed value tree recursively: for a plain value it contributes zero, for an object it adds the count of its own keys plus the same recursive count for every value, and for an array it recurses into every element without adding to the key count (arrays have no keys of their own). A shared \`depthState\` object is threaded through the recursion so the deepest level reached anywhere in the tree is tracked without a separate traversal.

**Why errors and stats are mutually exclusive**

The stats row (character count, key count, max depth, root type) only ever renders for JSON that parsed successfully — there's no meaningful key count for a document that failed to parse. The moment \`format()\` catches an exception, the stats row and formatted output are cleared and only the error message renders, keeping the UI honest about what state the document is actually in.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste or edit JSON', text: 'Type or paste any JSON document into the textarea — formatting and validation run live on every keystroke.' },
        { title: 'Read the status badge', text: 'It reads "Valid JSON" in green or "Invalid JSON" in red, matching whether the current text parses successfully.' },
        { title: 'Check the error box for parse failures', text: 'A malformed document shows the exact line and column of the first syntax error, translated from the raw JSON.parse error message.' },
        { title: 'Switch between Format and Minify', text: 'Format pretty-prints with your chosen indent width; Minify strips all whitespace for the smallest possible payload.' },
        { title: 'Change the indent width', text: 'Pick 2 spaces, 4 spaces, or a tab character from the dropdown — re-formats immediately.' },
        { title: 'Copy the result', text: 'Click Copy to put the currently displayed formatted or minified JSON on your clipboard.' },
      ],
    },
    features: [
      'Real JSON.parse/JSON.stringify round-trip — no hand-rolled parser, so behavior matches the browser exactly',
      'Parse errors translated from raw character position into line and column numbers',
      'One-regex syntax highlighter distinguishing keys, strings, numbers, booleans and null',
      'Live key count and max nesting depth computed via recursive tree walk',
      'Format (pretty-print) and Minify modes sharing the same validation path',
      'Selectable indent width: 2 spaces, 4 spaces, or tab',
      'One-click Copy button with visual confirmation',
      'Updates on every keystroke — no submit button required',
      'Entirely client-side, no network request, safe for sensitive config data',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging a broken API response or config file', desc: 'Paste a malformed JSON payload straight from a network tab or log file and jump directly to the line and column where parsing fails, instead of scanning by eye.' },
      { icon: 'APP', title: 'Cleaning up minified JSON for readability', desc: 'Paste a single-line minified JSON blob and click Format to get an indented, syntax-highlighted version for code review or documentation.' },
      { icon: 'FLOW', title: 'Shrinking a config payload before shipping', desc: 'Use Minify to strip whitespace from a hand-written JSON config before embedding it in a build artifact or URL parameter, where every byte counts.' },
      { icon: 'LEARN', title: 'Teaching JSON syntax rules', desc: 'Deliberately break a document (trailing comma, unquoted key, single quotes) and show the exact error location to teach why each JSON syntax rule exists.' },
      { icon: 'DASH', title: 'Internal developer tooling', desc: 'Pair with the [JWT Decoder & Inspector](/ui-snippets/jwt-decoder/) or an [API response inspector](/ui-snippets/api-response-inspector/) in an internal dev-tools dashboard for quick payload debugging.' },
      { icon: 'CODE', title: 'Related: JSON Diff Viewer', desc: 'See the [JSON Diff Viewer](/ui-snippets/json-diff-viewer/) for comparing two JSON documents once this one is validated and formatted.' },
      { icon: 'CODE', title: 'Related: SHA Hash Generator', desc: 'See the [SHA Hash Generator](/ui-snippets/sha-hash-generator/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this use a custom JSON parser?', a: 'No. Validation and formatting both go through the browser\'s native JSON.parse and JSON.stringify, so the accepted grammar and error conditions exactly match what your actual JavaScript runtime does with the same document.' },
      { q: 'How does it find the line and column of a syntax error?', a: 'V8-based engines include the character position of the failure in the thrown error message. The tool extracts that number, counts newline characters in the text before it to get the line, and measures the distance from the previous newline to get the column.' },
      { q: 'What is the difference between Format and Minify?', a: 'Both parse the input the same way. Format calls JSON.stringify with an indent argument (2 spaces, 4 spaces, or a tab) to pretty-print the result. Minify calls JSON.stringify with no indent argument, producing the most compact valid representation.' },
      { q: 'Does key count include array elements?', a: 'No. Only object properties count toward the key count. Arrays are still walked recursively so any objects nested inside them contribute their own keys, but the array itself does not add to the total.' },
      { q: 'Is my JSON sent anywhere?', a: 'No. Every operation — parsing, formatting, minifying, highlighting, and computing stats — runs entirely in your browser using built-in JavaScript APIs. Nothing is transmitted over the network.' },
      { q: 'Can it fix invalid JSON automatically?', a: 'No, it deliberately does not attempt auto-repair — silently guessing at a fix for a trailing comma or unquoted key could hide the exact bug you introduced. It only reports precisely where parsing failed so you can fix the source.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain how locateError() converts a raw JSON.parse "position N" message into a line and column number, then ask it to extend the approach to also highlight the offending line in the textarea itself. It is also a solid starting point for related tools: ask for a "convert to TypeScript interface" button that infers types from the parsed structure, a JSON Schema generator, or a side-by-side diff mode against a second pasted document.`,
      prompt: `Build a client-side JSON formatter and validator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A textarea where a user pastes or edits JSON, validating and formatting live on every input event using only the browser's built-in JSON.parse and JSON.stringify.
- A status badge that reads a valid state or an invalid state depending on whether the current text currently parses.
- When parsing fails, extract the character position from the native error message and convert it into a 1-indexed line number and column number by counting newlines in the text up to that position, then display a clear error message including both.
- A "Format" button that pretty-prints with a selectable indent width (2 spaces, 4 spaces, or a tab character) and a "Minify" button that strips all whitespace, both sharing the same parse-and-validate path.
- Lightweight syntax highlighting of the formatted output distinguishing object keys, string values, numbers, booleans, and null using a single regular expression over the already-valid JSON text.
- A stats row showing character count, total object key count (computed recursively, not counting array indices), and maximum nesting depth, updating alongside the formatted output.
- A Copy button using the Clipboard API with a brief visual confirmation.`,
    },
  },
};

export default jsonFormatterValidator;
