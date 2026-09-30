const dotenvFileParser = {
  id: 'dotenv-file-parser',
  title: '.env File Parser & Validator',
  category: 'dev',
  html: `<div class="wrap">
  <div class="header">
    <h2>.env File Parser &amp; Validator</h2>
    <span class="badge" id="status-badge">0 variables</span>
  </div>

  <textarea id="env-input" spellcheck="false"># API configuration
API_URL=https://api.example.com
API_KEY="sk_live_51H8xyz00000000000000"
DEBUG=true
PORT=3000
DATABASE_URL='postgres://user:pass@localhost:5432/app'
API_URL=https://api.example.com/v2
EMPTY_VALUE=
NOT VALID LINE HERE</textarea>

  <div class="issues" id="issues" hidden></div>

  <div class="table-wrap">
    <table id="vars-table">
      <thead><tr><th>Key</th><th>Value</th><th>Type</th></tr></thead>
      <tbody id="vars-body"></tbody>
    </table>
  </div>

  <div class="toolbar">
    <button id="copy-example-btn">Copy as .env.example</button>
    <button id="copy-json-btn">Copy as JSON</button>
  </div>

  <pre id="example-output" class="out" hidden></pre>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; padding: 28px 20px; color: #e2e8f0; }

.wrap { max-width: 760px; margin: 0 auto; }
.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
h2 { font-size: 18px; font-weight: 800; }
.badge { font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 999px; background: #1e293b; color: #94a3b8; border: 1px solid #334155; }
.badge.has-errors { background: rgba(239,68,68,0.15); color: #f87171; border-color: rgba(239,68,68,0.3); }

#env-input {
  width: 100%; min-height: 130px; resize: vertical; padding: 12px 14px;
  background: #1e293b; border: 1.5px solid #334155; border-radius: 10px;
  color: #a5b4fc; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; line-height: 1.6; margin-bottom: 12px;
}
#env-input:focus { outline: none; border-color: #6366f1; }

.issues {
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.35); color: #fca5a5;
  padding: 10px 14px; border-radius: 8px; font-size: 12px; margin-bottom: 12px; line-height: 1.7;
}
.issues div { margin: 0; }

.table-wrap { background: #1e293b; border: 1px solid #334155; border-radius: 10px; overflow: hidden; margin-bottom: 12px; }
table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
th { text-align: left; padding: 8px 12px; background: #0f172a; color: #94a3b8; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid #334155; }
td { padding: 7px 12px; border-bottom: 1px solid #263449; font-family: "SF Mono", Consolas, monospace; }
tr:last-child td { border-bottom: none; }
td.key { color: #93c5fd; font-weight: 700; }
td.val { color: #86efac; word-break: break-all; }
td.type { color: #fbbf24; font-size: 11px; }
tr.duplicate td.key { color: #f87171; }
tr.duplicate td.key::after { content: ' (duplicate)'; font-size: 10px; color: #f87171; font-weight: 400; }

.toolbar { display: flex; gap: 8px; margin-bottom: 12px; }
.toolbar button { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 12px; font-weight: 700; padding: 7px 14px; border-radius: 8px; cursor: pointer; }
.toolbar button:hover { background: #334155; }
.toolbar button.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }

.out { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 14px 16px; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; color: #a5b4fc; white-space: pre-wrap; line-height: 1.7; }`,
  js: `const input = document.getElementById('env-input');
const badge = document.getElementById('status-badge');
const issuesBox = document.getElementById('issues');
const varsBody = document.getElementById('vars-body');
const exampleOutput = document.getElementById('example-output');
const copyExampleBtn = document.getElementById('copy-example-btn');
const copyJsonBtn = document.getElementById('copy-json-btn');

function stripQuotes(raw) {
  const trimmed = raw.trim();
  if (trimmed.length >= 2) {
    const first = trimmed[0];
    const last = trimmed[trimmed.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

function detectType(value) {
  if (value === '') return 'empty';
  if (/^(true|false)$/i.test(value)) return 'boolean';
  if (/^-?\\d+(\\.\\d+)?$/.test(value)) return 'number';
  if (/^https?:\\/\\//i.test(value)) return 'url';
  return 'string';
}

function parseEnv(text) {
  const lines = text.split('\\n');
  const entries = [];
  const errors = [];
  const seen = new Map();

  lines.forEach((rawLine, idx) => {
    const lineNo = idx + 1;
    const line = rawLine.trim();
    if (line === '' || line.startsWith('#')) return;

    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) {
      errors.push('Line ' + lineNo + ': missing "=" — "' + line + '" is not a valid KEY=VALUE pair.');
      return;
    }

    const key = line.slice(0, eqIndex).trim();
    const rawValue = line.slice(eqIndex + 1);

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      errors.push('Line ' + lineNo + ': "' + key + '" is not a valid variable name (must start with a letter or underscore, then letters/digits/underscores).');
      return;
    }

    const value = stripQuotes(rawValue);
    const isDuplicate = seen.has(key);
    seen.set(key, (seen.get(key) || 0) + 1);

    entries.push({ key, value, type: detectType(value), line: lineNo, duplicate: isDuplicate });
  });

  // Mark every occurrence of a repeated key as a duplicate, not just the later ones.
  const counts = new Map();
  entries.forEach((e) => counts.set(e.key, (counts.get(e.key) || 0) + 1));
  entries.forEach((e) => { e.duplicate = counts.get(e.key) > 1; });

  return { entries, errors };
}

function render() {
  const { entries, errors } = parseEnv(input.value);

  badge.textContent = entries.length + ' variable' + (entries.length === 1 ? '' : 's') + (errors.length ? ', ' + errors.length + ' issue' + (errors.length === 1 ? '' : 's') : '');
  badge.className = errors.length ? 'badge has-errors' : 'badge';

  if (errors.length) {
    issuesBox.hidden = false;
    issuesBox.innerHTML = errors.map((e) => '<div>' + e.replace(/</g, '&lt;') + '</div>').join('');
  } else {
    issuesBox.hidden = true;
    issuesBox.innerHTML = '';
  }

  varsBody.innerHTML = '';
  entries.forEach((e) => {
    const row = document.createElement('tr');
    if (e.duplicate) row.className = 'duplicate';
    row.innerHTML =
      '<td class="key">' + e.key + '</td>' +
      '<td class="val">' + (e.value === '' ? '(empty)' : e.value.replace(/</g, '&lt;')) + '</td>' +
      '<td class="type">' + e.type + '</td>';
    varsBody.appendChild(row);
  });

  const seenKeys = new Set();
  const exampleLines = [];
  entries.forEach((e) => {
    if (seenKeys.has(e.key)) return;
    seenKeys.add(e.key);
    const placeholder = e.type === 'boolean' ? 'true' : e.type === 'number' ? '0' : e.type === 'url' ? 'https://' : '';
    exampleLines.push(e.key + '=' + placeholder);
  });
  exampleOutput.dataset.example = exampleLines.join('\\n');
  exampleOutput.dataset.json = JSON.stringify(
    entries.reduce((acc, e) => { acc[e.key] = e.value; return acc; }, {}),
    null,
    2
  );
}

input.addEventListener('input', render);

function copyText(text, btn, label) {
  const finish = () => {
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(finish);
  } else {
    finish();
  }
}

copyExampleBtn.addEventListener('click', () => copyText(exampleOutput.dataset.example || '', copyExampleBtn));
copyJsonBtn.addEventListener('click', () => copyText(exampleOutput.dataset.json || '{}', copyJsonBtn));

render();`,

  seo: {
    title: '.env File Parser & Validator — Free HTML CSS JS Snippet',
    description: 'Paste .env content to validate KEY=VALUE syntax, detect duplicate keys and value types, then generate a redacted .env.example or JSON. Exports to React, Vue & Tailwind.',
    about: {
      title: '.env File Parser — Validate KEY=VALUE Syntax, Find Duplicates & Generate .env.example',
      description: `A \`.env\` file looks trivially simple — one \`KEY=VALUE\` pair per line — but it is surprisingly easy to introduce a subtle bug: a duplicate key where only the last value silently wins, a variable name with an invalid character, or quoting that does not match what the loading library actually expects. This snippet parses real \`.env\` syntax entirely in the browser and surfaces exactly those problems before they cause a confusing runtime bug.

**Line-by-line parsing that mirrors how dotenv loaders actually work**

\`parseEnv()\` splits the input on newlines and processes each line independently, skipping blank lines and full-line comments starting with \`#\` — the same convention used by the \`dotenv\` npm package and most language equivalents. Each remaining line is split on the first \`=\` character only, via \`indexOf('=')\` rather than \`split('=')\`, which matters because a value like \`DATABASE_URL=postgres://user:pass@host/db?ssl=true\` legitimately contains additional \`=\` characters after the first one — splitting on every occurrence would truncate the value.

**Validating the variable name, not just its presence**

Every key is checked against \`/^[A-Za-z_][A-Za-z0-9_]*$/\`, matching the actual identifier rules most language environment-variable APIs enforce: a variable name must start with a letter or underscore and contain only letters, digits, and underscores after that. A line like \`NOT VALID LINE HERE\` (no \`=\` at all) or a key starting with a digit is reported with its exact line number rather than silently ignored or half-parsed.

**Stripping quotes the way real loaders do**

\`.env\` values are commonly wrapped in single or double quotes to preserve leading/trailing whitespace or embed special characters. \`stripQuotes()\` checks whether the trimmed value both starts and ends with a matching quote character before removing them — a value with only a leading quote is left untouched rather than partially stripped, since that mismatch is far more likely to be a typo than an intentional unbalanced quote.

**Flagging every occurrence of a duplicate key**

Most \`.env\` loaders resolve a duplicate key by silently keeping whichever assignment appears last, which is exactly the kind of bug that is invisible until a value mysteriously does not match what was set higher in the file. The parser counts occurrences of each key across the whole file and marks every row sharing a repeated key — not just the second one — so both the shadowed value and the value that wins are equally visible in the table.

**Inferring a lightweight type per value**

\`detectType()\` classifies each parsed value as boolean, number, URL, empty, or plain string using simple pattern checks. This is not a strict schema — \`.env\` values are always strings at runtime — but the inferred type column makes it easy to spot a value that looks wrong for its apparent purpose, like a \`PORT\` value that is not actually numeric.

**Generating a redacted .env.example and a JSON view**

The tool separately builds two derived outputs: a \`.env.example\` where every key keeps its name but the value is replaced with a type-appropriate placeholder (\`true\` for booleans, \`0\` for numbers, \`https://\` for URLs, empty for strings) so real secrets never appear in a template file meant for version control, and a plain JSON object mapping keys to their real values for quick programmatic use elsewhere.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste your .env content', text: 'Any real .env file works — comments and blank lines are recognized and skipped automatically.' },
        { title: 'Check the status badge', text: 'It shows how many variables were parsed and how many syntax issues were found.' },
        { title: 'Read flagged issues', text: 'Lines missing an "=" or with an invalid variable name are listed with their exact line number.' },
        { title: 'Look for duplicate-key rows', text: 'Any key repeated more than once in the file is highlighted in red — only the last one actually takes effect in most loaders.' },
        { title: 'Review the inferred type column', text: 'Boolean, number, URL, empty, and string values are auto-detected to help catch a value that looks wrong for its purpose.' },
        { title: 'Copy a redacted template or JSON', text: 'Use "Copy as .env.example" for a safe, secret-free template, or "Copy as JSON" for a plain key-value object.' },
      ],
    },
    features: [
      'Line-by-line KEY=VALUE parsing matching real dotenv-loader conventions, including # comments and blank lines',
      'Splits only on the first "=" so values containing additional equals signs (like DATABASE_URL query strings) are never truncated',
      'Validates variable names against real identifier rules and reports the exact failing line number',
      'Correctly strips matched single or double quotes without touching unbalanced/mismatched quoting',
      'Flags every occurrence of a duplicate key, not just the later one, since most loaders silently let the last value win',
      'Lightweight value type inference: boolean, number, URL, empty, or string',
      'Generates a redacted .env.example with type-appropriate placeholders — real secret values never appear',
      'Generates a plain JSON object view of all parsed variables',
      'Entirely client-side — safe to paste real secrets, nothing is transmitted anywhere',
    ],
    useCases: [
      { icon: 'CODE', title: 'Auditing a .env file before committing', desc: 'Catch a duplicate key or malformed line before it causes a silently wrong configuration value in production.' },
      { icon: 'APP', title: 'Generating a safe .env.example for a repo', desc: 'Copy the redacted template output so new contributors know exactly which variables to set without ever seeing real secret values.' },
      { icon: 'FLOW', title: 'Debugging "why is this env var not what I set it to"', desc: 'The duplicate-key highlighting immediately surfaces the classic cause: the same key was assigned twice and the last one silently won.' },
      { icon: 'LEARN', title: 'Teaching environment variable file conventions', desc: 'Show why DATABASE_URL=postgres://user:pass@host/db?ssl=true parses correctly even though it contains a second "=" character.' },
      { icon: 'DASH', title: 'Quick JSON conversion for scripting', desc: 'Copy the JSON output to quickly feed parsed environment values into a Node script, Postman environment, or CI configuration step.' },
      { icon: 'CODE', title: 'Related: Semver Range Checker', desc: 'See the [Semver Range Checker](/ui-snippets/semver-range-checker/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this send my secrets anywhere?', a: 'No. Parsing, validation, and both generated outputs are computed entirely in the browser using plain JavaScript string operations — nothing is transmitted over the network, which is exactly why it is safe to paste real .env content with live secrets.' },
      { q: 'Why does it split only on the first "=" character?', a: 'A value like a database connection string can legitimately contain further "=" characters, for example in a query string parameter. Splitting on only the first occurrence via indexOf keeps the rest of the line intact as the value instead of truncating it.' },
      { q: 'How are duplicate keys handled?', a: 'The parser counts every occurrence of each key across the file and highlights every row that shares a repeated key, not just the second occurrence. This mirrors the real risk: most .env loaders let the last matching assignment silently win, which is easy to miss without this kind of highlighting.' },
      { q: 'What counts as an invalid variable name?', a: 'Anything that does not match the pattern of a letter or underscore followed by any number of letters, digits, or underscores — the same rule most shells and language runtimes enforce for environment variable names. A name starting with a digit or containing a space or hyphen is flagged with its line number.' },
      { q: 'What placeholder values does the .env.example output use?', a: 'Each key keeps its exact name, but the value is replaced based on the inferred type: true for booleans, 0 for numbers, https:// for URLs, and an empty value for plain strings — so the template documents which variables exist without exposing any real secret.' },
      { q: 'Does it validate that quoted values are well-formed?', a: 'It strips a value only when it starts and ends with the same matching quote character (both single or both double). A value with a stray or mismatched quote is left as-is, since silently guessing at a fix could hide a real typo in the source file.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain why the parser splits on only the first "=" character instead of using a plain string split, and why every occurrence of a duplicate key is flagged rather than just the second one. It is also a good base to extend: ask for a diff mode comparing two .env files (e.g. .env versus .env.production) to spot missing or extra keys, expansion of dollar-brace variable interpolation (VAR referencing another key), or a strictness toggle that also flags keys present in .env.example but missing from the pasted .env.`,
      prompt: `Build a client-side .env file parser and validator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A textarea where pasted .env-style content is parsed live on every input event, correctly skipping blank lines and full-line # comments.
- Split each remaining line on only the first "=" character (not every occurrence), so a value containing further equals signs, like a database URL query string, is preserved intact.
- Validate that each key matches real environment-variable identifier rules (starts with a letter or underscore, followed by letters, digits, or underscores only) and report any invalid line with its 1-indexed line number in a visible issues list.
- Strip matching single or double quotes surrounding a value, but leave a value with mismatched or only one-sided quoting untouched.
- Detect and count duplicate keys across the whole file, and visually highlight every row sharing a repeated key (not just the later one), since most real dotenv loaders silently let the last assignment win.
- Infer a lightweight type per value (boolean, number, URL, empty, or generic string) using simple pattern matching, and display it in a table alongside each key and value.
- Render all parsed variables in a table with Key, Value, and Type columns.
- Two copy actions: one that copies a redacted .env.example where every key keeps its name but the value is replaced with a type-appropriate placeholder (never the real value), and one that copies a plain JSON object of all parsed key-value pairs. Both should use the Clipboard API with a brief visual confirmation.`,
    },
  },
};

export default dotenvFileParser;
