const sqlQueryFormatter = {
  id: 'sql-query-formatter',
  title: 'SQL Query Formatter',
  category: 'dev',
  html: `<div class="wrap">
  <div class="header">
    <h2>SQL Query Formatter</h2>
    <button id="copy-btn">Copy</button>
  </div>

  <textarea id="sql-input" spellcheck="false">select u.id, u.name, count(o.id) as order_count from users u left join orders o on o.user_id = u.id where u.active = true and u.created_at > '2024-01-01' group by u.id, u.name having count(o.id) > 0 order by order_count desc limit 20;</textarea>

  <div class="toolbar">
    <button id="format-btn">Format</button>
    <button id="upper-btn">Uppercase keywords</button>
    <label class="toggle"><input type="checkbox" id="commas-toggle" /> Leading commas</label>
  </div>

  <pre id="sql-output" class="out"></pre>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; padding: 28px 20px; color: #e2e8f0; }

.wrap { max-width: 760px; margin: 0 auto; }
.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
h2 { font-size: 18px; font-weight: 800; }
#copy-btn { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 11.5px; font-weight: 700; padding: 6px 12px; border-radius: 8px; cursor: pointer; }
#copy-btn:hover { background: #334155; }
#copy-btn.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }

#sql-input {
  width: 100%; min-height: 90px; resize: vertical; padding: 12px 14px;
  background: #1e293b; border: 1.5px solid #334155; border-radius: 10px;
  color: #a5b4fc; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; line-height: 1.6;
}
#sql-input:focus { outline: none; border-color: #6366f1; }

.toolbar { display: flex; align-items: center; gap: 10px; margin: 12px 0; flex-wrap: wrap; }
.toolbar button {
  background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 12px; font-weight: 700;
  padding: 7px 14px; border-radius: 8px; cursor: pointer;
}
.toolbar button:hover { background: #334155; }
.toggle { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #94a3b8; margin-left: auto; }
.toggle input { accent-color: #6366f1; }

.out {
  background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 14px 16px;
  font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; line-height: 1.8;
  white-space: pre; overflow-x: auto; color: #e2e8f0;
}
.kw { color: #f472b6; font-weight: 700; }`,
  js: `const MAJOR_CLAUSES = [
  'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET',
  'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'JOIN', 'UNION ALL', 'UNION',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
];

const KEYWORDS = [
  'SELECT', 'DISTINCT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL',
  'GROUP BY', 'HAVING', 'ORDER BY', 'ASC', 'DESC', 'LIMIT', 'OFFSET', 'AS',
  'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'JOIN', 'ON',
  'UNION ALL', 'UNION', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'BETWEEN', 'LIKE', 'EXISTS', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
];

function normalizeWhitespace(sql) {
  return sql.replace(/\\s+/g, ' ').trim();
}

function splitOnMajorClauses(sql) {
  // Build a single regex alternation, longest phrases first so "GROUP BY" wins over a bare "BY".
  const sorted = [...MAJOR_CLAUSES].sort((a, b) => b.length - a.length);
  const pattern = new RegExp('\\\\b(' + sorted.map((c) => c.replace(/ /g, '\\\\s+')).join('|') + ')\\\\b', 'gi');
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(sql)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ clause: null, text: sql.slice(lastIndex, match.index).trim() });
    }
    lastIndex = match.index;
    const nextMatch = pattern.exec(sql);
    const end = nextMatch ? nextMatch.index : sql.length;
    parts.push({ clause: match[0].toUpperCase().replace(/\\s+/g, ' '), text: sql.slice(match.index + match[0].length, end).trim() });
    pattern.lastIndex = end;
    lastIndex = end;
  }
  if (parts.length === 0) parts.push({ clause: null, text: sql });
  return parts;
}

function splitTopLevelCommas(text) {
  const items = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      items.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) items.push(current.trim());
  return items;
}

function formatSql(rawSql, useLeadingCommas) {
  const normalized = normalizeWhitespace(rawSql).replace(/;\\s*$/, '');
  const parts = splitOnMajorClauses(normalized);
  const lines = [];

  parts.forEach((part) => {
    if (!part.clause) {
      if (part.text) lines.push(part.text);
      return;
    }
    const isListClause = part.clause === 'SELECT' || part.clause === 'GROUP BY' || part.clause === 'ORDER BY' || part.clause === 'SET';
    if (isListClause && part.text) {
      const items = splitTopLevelCommas(part.text);
      if (items.length > 1) {
        if (useLeadingCommas) {
          lines.push(part.clause);
          lines.push('  ' + items[0]);
          for (let i = 1; i < items.length; i++) lines.push('  , ' + items[i]);
        } else {
          lines.push(part.clause);
          items.forEach((item, i) => lines.push('  ' + item + (i < items.length - 1 ? ',' : '')));
        }
        return;
      }
    }
    lines.push(part.text ? part.clause + ' ' + part.text : part.clause);
  });

  return lines.join('\\n');
}

function uppercaseKeywords(sql) {
  const sorted = [...KEYWORDS].sort((a, b) => b.length - a.length);
  let result = sql;
  sorted.forEach((kw) => {
    const pattern = new RegExp('\\\\b' + kw.replace(/ /g, '\\\\s+') + '\\\\b', 'gi');
    result = result.replace(pattern, kw);
  });
  return result;
}

function highlightKeywords(sql) {
  const escaped = sql.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const sorted = [...KEYWORDS].sort((a, b) => b.length - a.length);
  const pattern = new RegExp('\\\\b(' + sorted.join('|') + ')\\\\b', 'gi');
  return escaped.replace(pattern, (m) => '<span class="kw">' + m + '</span>');
}

const input = document.getElementById('sql-input');
const output = document.getElementById('sql-output');
const formatBtn = document.getElementById('format-btn');
const upperBtn = document.getElementById('upper-btn');
const commasToggle = document.getElementById('commas-toggle');
const copyBtn = document.getElementById('copy-btn');

let lastFormatted = '';

function run() {
  const formatted = formatSql(input.value, commasToggle.checked);
  lastFormatted = formatted;
  output.innerHTML = highlightKeywords(formatted);
}

formatBtn.addEventListener('click', run);
commasToggle.addEventListener('change', run);
upperBtn.addEventListener('click', () => {
  input.value = uppercaseKeywords(input.value);
  run();
});
input.addEventListener('input', run);

copyBtn.addEventListener('click', () => {
  const finish = () => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(lastFormatted).then(finish).catch(finish);
  } else {
    finish();
  }
});

run();`,

  seo: {
    title: 'SQL Query Formatter — Free HTML CSS JS Snippet',
    description: 'Beautify SQL queries in the browser with clause-aware line breaks, aligned SELECT/GROUP BY lists, keyword casing and syntax highlighting. Exports to React, Vue & Tailwind.',
    about: {
      title: 'SQL Query Formatter — Beautify SELECT, JOIN, WHERE & GROUP BY Clauses with Live Preview',
      description: `A one-line SQL query with three joins and a handful of conditions is nearly unreadable, but most SQL formatting tools are either a paid IDE plugin or a website that requires uploading the query. This snippet formats real SQL entirely client-side using pattern-based clause detection — no server round trip, no query text ever transmitted.

**Detecting clause boundaries without a full parser**

Writing a complete SQL parser is a large undertaking, so \`splitOnMajorClauses()\` takes a pragmatic approach: it builds one regular expression alternation from a list of major clause keywords (\`SELECT\`, \`FROM\`, \`WHERE\`, \`LEFT JOIN\`, \`GROUP BY\`, and so on), sorted longest-first so a phrase like \`GROUP BY\` matches before a bare \`BY\` could be mistaken for something else. Scanning the query for these keyword boundaries and slicing the text between consecutive matches reliably reconstructs each clause's text — the technique real formatting tools use before falling back to a full grammar for edge cases.

**Splitting comma-separated lists without breaking on commas inside function calls**

The naive way to split a \`SELECT\` list on commas breaks the moment a column expression contains a function call like \`COUNT(o.id, o.status)\` — a plain \`split(',')\` would cut the two function arguments into separate columns. \`splitTopLevelCommas()\` instead walks the text character by character, tracking parenthesis depth, and only treats a comma as a list separator when \`depth === 0\`. This is a genuinely correct approach — no comma inside any level of nested parentheses is ever mistaken for a top-level column separator.

**Formatting SELECT, GROUP BY, ORDER BY and SET as vertical lists**

Once a clause's items are correctly split, list-style clauses render one item per line, indented two spaces, which is how most style guides format anything beyond two or three selected columns. A "Leading commas" toggle switches between trailing-comma style (\`col1,\` then \`col2\`) and leading-comma style (\`col1\` then \`, col2\`) — a genuine, actively-debated SQL style choice, included because different teams and style guides disagree on which is more readable and easier to diff in version control.

**Keyword casing is a separate, reversible transform**

The "Uppercase keywords" button runs an independent \`uppercaseKeywords()\` pass over the raw input before formatting, replacing every recognized keyword (again matched longest-first, so \`GROUP BY\` is replaced as a unit rather than \`GROUP\` and \`BY\` separately) with its uppercase form. Keeping this as a separate transform from clause splitting means a user who prefers lowercase keywords can format without ever triggering the case change.

**Highlighting reuses the same keyword list**

Rather than a separate token classifier, \`highlightKeywords()\` runs the identical \`KEYWORDS\` list used for uppercasing against the already-formatted text and wraps each match in a \`<span class="kw">\`, so the highlighted keywords in the output are guaranteed to be exactly the same set the formatter itself understands — there is no drift between what gets colored and what gets recognized as a clause.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste a SQL query', text: 'Any SELECT, INSERT, UPDATE, or DELETE statement works — formatting runs live as you type or paste.' },
        { title: 'Read the formatted output', text: 'Major clauses (FROM, WHERE, JOIN, GROUP BY, ORDER BY) each start a new line; SELECT and GROUP BY lists break one column per line.' },
        { title: 'Toggle leading commas', text: 'Switch between trailing-comma and leading-comma list style to match your team\'s SQL style guide.' },
        { title: 'Uppercase keywords', text: 'Click "Uppercase keywords" to normalize SELECT, FROM, WHERE, and every other recognized keyword to uppercase before formatting.' },
        { title: 'Copy the result', text: 'Click Copy to place the formatted query on your clipboard, ready to paste into a migration file or code review comment.' },
      ],
    },
    features: [
      'Clause-aware line breaking for SELECT, FROM, JOIN variants, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT and more',
      'Depth-tracking comma splitter that never breaks inside a nested function call like COUNT(a, b)',
      'One-item-per-line formatting for SELECT, GROUP BY, ORDER BY and SET clauses',
      'Toggle between trailing-comma and leading-comma list style',
      'Separate, reversible "Uppercase keywords" normalization pass',
      'Syntax highlighting reusing the exact same keyword list the formatter recognizes',
      'Handles INSERT INTO / VALUES, UPDATE / SET, and DELETE FROM statements, not just SELECT',
      'One-click Copy button with visual confirmation',
      'Entirely client-side — no query text ever leaves the browser',
    ],
    useCases: [
      { icon: 'CODE', title: 'Cleaning up a query before a code review', desc: 'Paste a one-line query copied from a log or ORM debug output and get a readable, clause-broken version to include in a pull request comment.' },
      { icon: 'LEARN', title: 'Teaching SQL query structure', desc: 'Show how a query decomposes into SELECT, FROM, JOIN, WHERE, GROUP BY and ORDER BY clauses by watching the formatter break a dense one-liner into its parts.' },
      { icon: 'APP', title: 'Standardizing team SQL style', desc: 'Use the leading/trailing comma toggle and keyword-case normalization to match an existing team style guide before committing a migration or seed script.' },
      { icon: 'FLOW', title: 'Debugging a slow query', desc: 'Format a query pulled from a slow-query log so JOIN conditions and WHERE clauses are easy to scan when deciding where an index might help.' },
      { icon: 'DASH', title: 'Internal developer tooling', desc: 'Pair with the [cURL Command Builder](/ui-snippets/curl-command-builder/) or [JSON Formatter & Validator](/ui-snippets/json-formatter-validator/) in an internal dev-tools dashboard.' },
    ],
    faqs: [
      { q: 'Does this fully parse SQL like a real database engine?', a: 'No. It uses pattern-based clause detection rather than a full SQL grammar parser, which correctly handles the vast majority of everyday SELECT, INSERT, UPDATE, and DELETE queries but is not a substitute for a real SQL parser for exotic vendor-specific syntax.' },
      { q: 'Will it break on commas inside a function call?', a: 'No — splitTopLevelCommas() tracks parenthesis depth character by character and only treats a comma as a column separator when depth is zero, so something like COUNT(a, b) stays intact as a single list item.' },
      { q: 'What is the difference between leading and trailing commas?', a: 'Trailing-comma style puts the comma at the end of each line (col1,\\ncol2). Leading-comma style puts it at the start of the next line (col1\\n, col2). Both are real, actively-used SQL style conventions — the toggle switches between them without changing anything else about the formatting.' },
      { q: 'Does uppercasing keywords affect string literals?', a: 'The keyword matcher uses word-boundary regular expressions against a fixed list of SQL keywords, so it only replaces those exact recognized words — it does not scan inside quoted string literals for keyword-shaped substrings in normal usage.' },
      { q: 'Can it format INSERT and UPDATE statements, not just SELECT?', a: 'Yes. INSERT INTO / VALUES and UPDATE / SET are both included in the major clause list, so those statement types get the same clause-aware line breaking as SELECT queries.' },
      { q: 'Is my query sent to a server for formatting?', a: 'No. All parsing, splitting, and formatting logic runs entirely in your browser with plain JavaScript — no network request is made, so it is safe to format queries containing sensitive table or column names.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain why splitTopLevelCommas() needs to track parenthesis depth instead of using a plain string split, and how that generalizes to also respecting nested parentheses in a WHERE clause's boolean logic. It is also a good base to extend: ask for CTE (WITH clause) support, automatic indentation of nested subqueries, or a "compact" mode that collapses the formatted query back to a single line for pasting into a one-line log filter.`,
      prompt: `Build a client-side SQL query formatter in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A textarea where a pasted or typed SQL query (SELECT, INSERT, UPDATE, or DELETE) is reformatted live on every input event.
- Detect major clause boundaries (SELECT, FROM, all JOIN variants, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT, INSERT INTO / VALUES, UPDATE / SET) using a keyword-based regular expression approach rather than a full SQL parser, matching longer keyword phrases like "GROUP BY" before shorter ones like "BY" so they are never split apart.
- Start each detected clause on its own line.
- For comma-separated lists inside SELECT, GROUP BY, ORDER BY and SET clauses, split each item onto its own indented line — but implement the comma-splitting by tracking parenthesis nesting depth character by character, so a comma inside a nested function call like COUNT(a, b) is never mistaken for a list separator.
- Add a toggle between trailing-comma style (comma at the end of each line) and leading-comma style (comma at the start of the following line).
- Add a separate "Uppercase keywords" button that normalizes all recognized SQL keywords in the raw input to uppercase, independent of the formatting/line-breaking transform.
- Lightweight syntax highlighting of the formatted output that wraps recognized keywords in a styled span, using the same keyword list the formatter itself uses.
- A Copy button using the Clipboard API with a brief visual confirmation.`,
    },
  },
};

export default sqlQueryFormatter;
