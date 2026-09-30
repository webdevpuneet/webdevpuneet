const codeDiffViewer = {
  id: 'code-diff-viewer',
  title: 'Code Diff Viewer',
  lastmod: '2026-07-22',
  category: 'layouts',
  html: `<div class="diff-card">
  <div class="diff-head">
    <div class="diff-file">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      <span class="diff-name">fetchUsers.js</span>
      <span class="diff-stats"><b class="added">+6</b> <b class="removed">-4</b></span>
    </div>
    <div class="mode-toggle" role="tablist">
      <button class="mode-btn active" id="btn-unified" role="tab" aria-selected="true">Unified</button>
      <button class="mode-btn" id="btn-split" role="tab" aria-selected="false">Split</button>
    </div>
  </div>
  <div class="diff-body" id="diff-body"></div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.diff-card {
  width: 100%; max-width: 720px;
  background: #111a2e; border: 1px solid #283548;
  border-radius: 14px; overflow: hidden;
}

/* — Header — */
.diff-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; background: #16213a;
  border-bottom: 1px solid #283548; gap: 12px; flex-wrap: wrap;
}
.diff-file { display: flex; align-items: center; gap: 8px; color: #64748b; }
.diff-name { font-size: 13px; font-weight: 600; color: #e2e8f0; font-family: 'SF Mono', Consolas, monospace; }
.diff-stats { font-size: 12px; font-family: 'SF Mono', Consolas, monospace; }
.diff-stats .added   { color: #4ade80; font-weight: 700; }
.diff-stats .removed { color: #f87171; font-weight: 700; margin-left: 4px; }

.mode-toggle { display: flex; background: #0f172a; border: 1px solid #283548; border-radius: 8px; padding: 3px; }
.mode-btn {
  background: none; border: none; color: #64748b;
  padding: 5px 14px; border-radius: 6px;
  font-size: 12px; font-weight: 600; font-family: inherit; cursor: pointer;
  transition: all 0.15s;
}
.mode-btn.active { background: #283548; color: #e2e8f0; }

/* — Diff body — */
.diff-body { overflow-x: auto; font-family: 'SF Mono', Consolas, monospace; font-size: 12.5px; line-height: 1.7; }
.diff-table { width: 100%; border-collapse: collapse; }

.ln {
  width: 1%; min-width: 36px; padding: 0 10px;
  text-align: right; color: #3d4f68; user-select: none;
  font-size: 11px; vertical-align: top;
  border-right: 1px solid #1c2940;
}
.code-cell { padding: 0 14px; white-space: pre; color: #b6c2d4; width: 49%; }

/* row types */
.row-add  { background: rgba(74,222,128,0.09); }
.row-add .code-cell { color: #d8f5e0; }
.row-add .ln { background: rgba(74,222,128,0.07); color: #3f6e52; }
.row-del  { background: rgba(248,113,113,0.09); }
.row-del .code-cell { color: #f3d9d9; }
.row-del .ln { background: rgba(248,113,113,0.07); color: #7a4343; }
.row-empty { background: #0d1526; }

.sign { display: inline-block; width: 14px; user-select: none; }
.row-add .sign { color: #4ade80; }
.row-del .sign { color: #f87171; }

/* intra-line word highlight */
.hl-add { background: rgba(74,222,128,0.28); border-radius: 3px; }
.hl-del { background: rgba(248,113,113,0.28); border-radius: 3px; }

/* collapsed context bar */
.row-hunk td {
  background: #14203a; color: #5b7db1;
  font-size: 11px; padding: 4px 14px;
  cursor: pointer; user-select: none;
}
.row-hunk td:hover { color: #93b4e0; background: #182647; }`,

  js: `const OLD_CODE = [
  "async function fetchUsers() {",
  "  const res = await fetch('/api/users');",
  "  const data = await res.json();",
  "  return data;",
  "}",
  "",
  "function renderUsers(users) {",
  "  const list = document.querySelector('#list');",
  "  users.forEach(u => {",
  "    const li = document.createElement('li');",
  "    li.textContent = u.name;",
  "    list.appendChild(li);",
  "  });",
  "}",
];

const NEW_CODE = [
  "async function fetchUsers(page = 1) {",
  "  const res = await fetch('/api/users?page=' + page);",
  "  if (!res.ok) throw new Error('HTTP ' + res.status);",
  "  const data = await res.json();",
  "  return data.results;",
  "}",
  "",
  "function renderUsers(users) {",
  "  const list = document.querySelector('#list');",
  "  const frag = document.createDocumentFragment();",
  "  users.forEach(u => {",
  "    const li = document.createElement('li');",
  "    li.textContent = u.name;",
  "    frag.appendChild(li);",
  "  });",
  "  list.appendChild(frag);",
  "}",
];

/* ————— Diff engine: classic LCS on lines ————— */
function diffLines(a, b) {
  const m = a.length, n = b.length;
  // LCS length table
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i+1][j+1] + 1 : Math.max(dp[i+1][j], dp[i][j+1]);
  // walk the table to emit ops
  const ops = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) { ops.push({ t: 'ctx', a: i, b: j, text: a[i] }); i++; j++; }
    else if (dp[i+1][j] >= dp[i][j+1]) { ops.push({ t: 'del', a: i, text: a[i] }); i++; }
    else { ops.push({ t: 'add', b: j, text: b[j] }); j++; }
  }
  while (i < m) { ops.push({ t: 'del', a: i, text: a[i] }); i++; }
  while (j < n) { ops.push({ t: 'add', b: j, text: b[j] }); j++; }
  return ops;
}

/* Intra-line: highlight the changed middle by trimming common prefix/suffix */
function charDiff(oldS, newS) {
  let p = 0;
  while (p < oldS.length && p < newS.length && oldS[p] === newS[p]) p++;
  let s = 0;
  while (s < oldS.length - p && s < newS.length - p &&
         oldS[oldS.length - 1 - s] === newS[newS.length - 1 - s]) s++;
  return {
    del: esc(oldS.slice(0, p)) + '<span class="hl-del">' + esc(oldS.slice(p, oldS.length - s)) + '</span>' + esc(oldS.slice(oldS.length - s)),
    add: esc(newS.slice(0, p)) + '<span class="hl-add">' + esc(newS.slice(p, newS.length - s)) + '</span>' + esc(newS.slice(newS.length - s)),
  };
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Pair adjacent del+add runs so we can char-highlight replacements */
function pairOps(ops) {
  const out = [];
  for (let k = 0; k < ops.length; k++) {
    if (ops[k].t === 'del') {
      const dels = []; let k2 = k;
      while (k2 < ops.length && ops[k2].t === 'del') dels.push(ops[k2++]);
      const adds = []; let k3 = k2;
      while (k3 < ops.length && ops[k3].t === 'add') adds.push(ops[k3++]);
      const pairs = Math.min(dels.length, adds.length);
      for (let p = 0; p < pairs; p++) {
        const cd = charDiff(dels[p].text, adds[p].text);
        out.push({ t: 'pair', del: dels[p], add: adds[p], delHtml: cd.del, addHtml: cd.add });
      }
      for (let p = pairs; p < dels.length; p++) out.push(dels[p]);
      for (let p = pairs; p < adds.length; p++) out.push(adds[p]);
      k = k3 - 1;
    } else out.push(ops[k]);
  }
  return out;
}

/* ————— Renderers ————— */
const body = document.getElementById('diff-body');
const CONTEXT = 2; // visible ctx lines around changes

function renderUnified(ops) {
  let html = '<table class="diff-table">';
  const rows = collapse(ops);
  rows.forEach(op => {
    if (op.t === 'hunk') { html += hunkRow(op, 3); return; }
    if (op.t === 'pair') {
      html += row('del', op.del.a + 1, '', '-', op.delHtml);
      html += row('add', '', op.add.b + 1, '+', op.addHtml);
      return;
    }
    if (op.t === 'ctx') html += row('ctx', op.a + 1, op.b + 1, ' ', esc(op.text));
    if (op.t === 'del') html += row('del', op.a + 1, '', '-', esc(op.text));
    if (op.t === 'add') html += row('add', '', op.b + 1, '+', esc(op.text));
  });
  body.innerHTML = html + '</table>';
  bindHunks(ops, renderUnified);

  function row(type, lnA, lnB, sign, code) {
    return '<tr class="row-' + type + '"><td class="ln">' + lnA + '</td><td class="ln">' + lnB +
      '</td><td class="code-cell"><span class="sign">' + sign + '</span>' + code + '</td></tr>';
  }
}

function renderSplit(ops) {
  let html = '<table class="diff-table">';
  const rows = collapse(ops);
  rows.forEach(op => {
    if (op.t === 'hunk') { html += hunkRow(op, 4); return; }
    if (op.t === 'ctx')  html += sRow('ctx', op.a + 1, esc(op.text), 'ctx', op.b + 1, esc(op.text));
    if (op.t === 'pair') html += sRow('del', op.del.a + 1, op.delHtml, 'add', op.add.b + 1, op.addHtml);
    if (op.t === 'del')  html += sRow('del', op.a + 1, esc(op.text), 'empty', '', '');
    if (op.t === 'add')  html += sRow('empty', '', '', 'add', op.b + 1, esc(op.text));
  });
  body.innerHTML = html + '</table>';
  bindHunks(ops, renderSplit);

  function sRow(lt, lnA, lHtml, rt, lnB, rHtml) {
    return '<tr><td class="ln row-' + lt + '">' + lnA + '</td><td class="code-cell row-' + lt + '">' + lHtml +
      '</td><td class="ln row-' + rt + '">' + lnB + '</td><td class="code-cell row-' + rt + '">' + rHtml + '</td></tr>';
  }
}

/* Collapse long context runs into expandable hunk bars */
function collapse(ops) {
  const out = [];
  let run = [];
  const flush = (isEdge) => {
    if (run.length > CONTEXT * 2 + 1) {
      const head = run.slice(0, isEdge ? 0 : CONTEXT);
      const tail = run.slice(run.length - CONTEXT);
      out.push(...head);
      out.push({ t: 'hunk', hidden: run.slice(head.length, run.length - CONTEXT) });
      out.push(...tail);
    } else out.push(...run);
    run = [];
  };
  ops.forEach(op => {
    if (op.t === 'ctx') run.push(op);
    else { flush(out.length === 0); out.push(op); }
  });
  if (run.length) {
    if (run.length > CONTEXT + 1) {
      out.push(...run.slice(0, CONTEXT));
      out.push({ t: 'hunk', hidden: run.slice(CONTEXT) });
    } else out.push(...run);
  }
  return out;
}

function hunkRow(op, cols) {
  return '<tr class="row-hunk" data-count="' + op.hidden.length + '"><td colspan="' + cols + '">' +
    '\\u2195 Expand ' + op.hidden.length + ' unchanged lines</td></tr>';
}

/* Clicking a hunk bar re-renders with collapsing disabled */
let collapseDisabled = false;
function bindHunks(ops, renderer) {
  body.querySelectorAll('.row-hunk').forEach(tr => {
    tr.addEventListener('click', () => {
      collapseDisabled = true;
      renderer(PAIRED);
    });
  });
}
const _collapse = collapse;
collapse = function(ops) {
  if (collapseDisabled) return ops;
  return _collapse(ops);
};

const PAIRED = pairOps(diffLines(OLD_CODE, NEW_CODE));

document.getElementById('btn-unified').addEventListener('click', e => setMode('unified', e.target));
document.getElementById('btn-split').addEventListener('click', e => setMode('split', e.target));

function setMode(mode, btn) {
  document.querySelectorAll('.mode-btn').forEach(b => {
    b.classList.toggle('active', b === btn);
    b.setAttribute('aria-selected', b === btn);
  });
  mode === 'unified' ? renderUnified(PAIRED) : renderSplit(PAIRED);
}

renderUnified(PAIRED);`,

  seo: {
    title: 'Code Diff Viewer — Free HTML CSS JS Snippet',
    description: 'GitHub-style diff with a real LCS algorithm: unified & split views, word-level highlights, expandable hunks and +/- stats. React & Tailwind exports.',
    about: {
      title: 'Code Diff Viewer — LCS Line Diffing, Unified & Split Rendering, Intra-Line Highlights & Expandable Context Hunks',
      description: `Every developer reads diffs daily, yet almost nobody builds one — the rendering lives inside GitHub, GitLab, and IDEs, and embedding a diff in your own product usually means importing a heavyweight library. This snippet implements the whole stack in vanilla JavaScript: a genuine LCS-based diff algorithm computing changes from two source strings (not pre-baked diff data), GitHub-style unified and side-by-side split renderings, word-level change highlights inside modified lines, collapsible unchanged-context hunks, and the familiar file header with +6/−4 stats. It is both a usable component and a readable explanation of how diff tools actually work.

**The diff engine: longest common subsequence on lines**

\`diffLines(a, b)\` is the textbook dynamic-programming LCS algorithm in ~20 lines. It fills an (m+1)×(n+1) table where \`dp[i][j]\` holds the length of the longest common subsequence of \`a[i..]\` and \`b[j..]\` — computed bottom-up, so each cell is either \`1 + dp[i+1][j+1]\` when lines match or the max of skipping a line from either side. Walking the table from the top-left then *emits* the diff: matching lines become context ops, and at each mismatch the walk follows the larger neighbouring value, producing a \`del\` (line only in old) or \`add\` (line only in new). This is the same core that \`git diff\` builds on (git uses Myers' algorithm, an optimisation of the same problem that avoids the full table), and seeing it in 20 lines demystifies the whole category. Each op carries its original line number, which is what makes dual line-number gutters possible.

**Pairing and intra-line highlights**

Raw LCS output represents a changed line as a deletion plus an addition — but readers want to see *what changed within the line*. \`pairOps()\` scans for adjacent del-runs followed by add-runs and zips them into replacement pairs; \`charDiff()\` then trims the common prefix and common suffix of each pair and wraps only the differing middle in \`.hl-del\`/\`.hl-add\` marks. That prefix/suffix trim is a deliberately simple heuristic — it nails the common cases (a changed argument, a renamed variable, an added property) in six lines, where full word-level LCS would be overkill. All source text passes through an HTML escaper before markup injection, the non-negotiable step when rendering code into innerHTML.

**Two renderings from one op stream**

Unified view is a three-column table — old line number, new line number, code with a +/−/space sign column — where a replacement pair renders as a red row then a green row. Split view is four columns: old gutter and code on the left, new gutter and code on the right; context rows show both sides, pairs show del-left/add-right with their intra-line highlights aligned, and unpaired adds/dels leave a dimmed \`.row-empty\` cell opposite — exactly GitHub's alignment behaviour. Both renderers consume the same paired op stream, so the toggle is a pure re-render with no recomputation. Row colouring uses low-alpha green/red backgrounds with matching tinted gutters and slightly brightened text, tuned for dark UIs.

**Hunk collapsing**

Real diffs are mostly unchanged lines, so \`collapse()\` replaces context runs longer than a threshold with an "Expand N unchanged lines" bar, keeping two context lines on each side of every change — the same presentation as \`git diff\`'s hunk headers. The bars are clickable table rows that re-render with collapsing disabled, revealing the full file. The stats in the header (+6 −4) are just counts over the op stream, and the horizontal-scroll container with \`white-space: pre\` preserves code formatting at any width.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Read the diff and switch views',
          text: 'The demo diffs two versions of a fetchUsers module. In Unified view, deletions (red, −) sit above their replacement additions (green, +), with the changed characters inside each line highlighted more strongly. Click Split for the side-by-side rendering — old file left, new file right, changes aligned row-by-row. Click an "Expand N unchanged lines" bar to reveal collapsed context.',
        },
        {
          title: 'Diff your own content',
          text: 'Replace OLD_CODE and NEW_CODE with any two arrays of lines — split file contents with text.split("\\n"). Everything downstream (algorithm, pairing, stats, both renderers) recomputes automatically. The viewer is language-agnostic: it diffs configuration files, JSON, SQL, or prose paragraphs exactly as happily as JavaScript.',
        },
        {
          title: 'Feed it from real sources',
          text: 'Common integrations: two <textarea> inputs for a paste-and-compare tool; fetch two versions from your API (document revisions, config history); or parse existing unified-diff text from git by mapping +/-/space prefixed lines directly into the op shape { t, text } and skipping diffLines entirely. For PR-style multi-file views, render one diff-card per file and add a file-tree rail.',
        },
        {
          title: 'Tune context and highlights',
          text: 'CONTEXT = 2 controls visible unchanged lines around each change; git\'s default is 3. Set it to Infinity to never collapse. The intra-line highlighter is the prefix/suffix trim in charDiff() — if you need true word-level marking for heavily rewritten lines, replace it with a token-level LCS over line.split(/(\\W)/) reusing the same diffLines function on tokens instead of lines.',
        },
        {
          title: 'Add syntax highlighting',
          text: 'Highlight each code cell after diff markup: run a lightweight tokenizer over the escaped code and wrap keywords/strings in coloured spans, being careful to apply it around (not inside) the .hl-add/.hl-del marks. The practical order is: escape → intra-line diff marks → syntax spans on the remaining text nodes. For production, Shiki or highlight.js can process each line individually to keep the table structure.',
        },
        {
          title: 'Export to your framework',
          text: 'Click JSX for React — keep diffLines/pairOps/collapse as pure functions in a module (they are framework-free already), memoise the paired ops with useMemo on [oldText, newText], and render rows from the op array. Pairs with the [Code Block Tabs](/ui-snippets/code-block-tabs) for before/after file views, the [Code Comparison](/ui-snippets/code-comparison) for marketing-style comparisons, and the [AI Streaming Response](/ui-snippets/ai-streaming-response) for AI code-review products that stream diff explanations.',
        },
      ],
    },
    features: [
      'Real diff computation: textbook LCS dynamic-programming algorithm over lines, ~20 readable lines',
      'Unified view with dual line-number gutters and +/−/space sign column, GitHub-style row tinting',
      'Split view with old/new panes, row-aligned changes, and dimmed empty cells opposite unpaired lines',
      'Replacement pairing: adjacent del/add runs zipped so changed lines render as aligned pairs',
      'Intra-line word highlights via common prefix/suffix trimming, escaped safely before markup',
      'Expandable hunks: context runs beyond 2 lines collapse into clickable "Expand N lines" bars',
      'File header with monospace filename and computed +added/−removed stats',
      'One op stream feeds both renderers — the view toggle re-renders without re-diffing',
    ],
    useCases: [
      {
        icon: 'CODE',
        title: 'AI code-review and coding-assistant products',
        desc: 'Every AI coding tool must show proposed changes as a diff — it is the accept/reject surface of the whole product. Feed OLD_CODE from the user\'s file and NEW_CODE from the model\'s proposal, and this component renders the review UI; add accept/reject buttons per hunk by attaching them to the op indices each hunk spans. Because the diff is computed client-side from two strings, it works with streamed AI output: re-run diffLines as the proposal streams in and the view updates live.',
      },
      {
        icon: 'DOC',
        title: 'Version history for documents, configs, and CMS content',
        desc: 'Anywhere users edit versioned text — CMS articles, configuration files, email templates, legal clauses — a revision-compare view answers "what changed between v4 and v7?". Fetch both revisions, split into lines, and render; the hunk collapsing matters most here since document revisions are typically 95% unchanged. For prose, set CONTEXT higher (4–5) and consider diffing at sentence granularity by splitting on sentence boundaries instead of newlines — the algorithm is granularity-agnostic.',
      },
      {
        icon: 'FLOW',
        title: 'Deployment and infrastructure change previews',
        desc: 'Terraform plans, Kubernetes manifest updates, feature-flag config pushes — ops tooling lives on "here is exactly what will change, approve it". Embed this viewer in your internal deploy console: old side from the live config, new side from the proposed one, with the +/− stats giving reviewers instant blast-radius sense. The split view is the right default for config review since operators read old and new values side by side rather than interleaved.',
      },
      {
        icon: 'LEARN',
        title: 'Learning how diff algorithms actually work',
        desc: 'The LCS table-fill and walk in diffLines() is the canonical dynamic-programming interview problem rendered practical: you can log the dp table, trace why the walk prefers one path at a mismatch, and see how ops fall out. The pairing and prefix/suffix heuristics show the pragmatic layer real tools add atop the theory. Students can extend it measurably — implement Myers\' O(ND) algorithm as a drop-in replacement for diffLines and verify both produce valid (if occasionally different) diffs of the same inputs.',
      },
      {
        icon: 'WEB',
        title: 'Paste-and-compare utilities and text-comparison tools',
        desc: 'The classic "compare two texts" tool is this component plus two textareas and a button: diff contracts against templates, API responses across environments, generated output across model versions, scraped content across dates. The HTML-escaping layer already makes arbitrary pasted input safe, and the language-agnostic line diffing handles prose, JSON, and CSV alike. Add "ignore whitespace" by normalising lines with .trim() before comparison while rendering the originals.',
      },
      {
        icon: 'CHART',
        title: 'Audit trails and compliance change records',
        desc: 'Regulated workflows need human-readable records of exactly what changed in a policy, price list, or permission set, and by how much. The op stream doubles as the audit artifact: serialise it (ops with line numbers and text) alongside the rendered view, and the +/− stats become the summary line in audit logs. Pair with the [AI Agent Steps](/ui-snippets/ai-agent-steps) timeline when changes are agent-made, and the [Data Table](/ui-snippets/data-table) for the surrounding revision list.',
      },
      { icon: 'CODE', title: 'Related: CSS if() Conditional Demo', desc: 'See the [CSS if() Conditional Demo](/ui-snippets/css-if-conditional-demo/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the LCS algorithm turn two files into a diff, in plain terms?',
        a: 'The insight is that a diff is defined by what did NOT change: find the longest sequence of lines appearing in both files in the same order (the longest common subsequence), and everything outside it is, by definition, the changes — old-only lines are deletions, new-only lines are additions. The dp table computes LCS lengths for every pair of suffixes: dp[i][j] answers "how many lines can old-from-i and new-from-j still have in common?", built bottom-up so each cell needs only its three neighbours. The walk then re-traces the optimal path: when lines match, that line is part of the common spine (context); when they differ, the walk moves in whichever direction preserves the larger remaining LCS, emitting a del or add. Git\'s Myers algorithm solves the identical problem in O(ND) time and O(N) space instead of this O(MN) table — necessary for huge files, but the table version is the one you can hold in your head, and for the few-hundred-line inputs typical of embedded viewers it is plenty fast.',
      },
      {
        q: 'Why do changed lines render as a delete/add pair, and how does the word-level highlight work?',
        a: 'Line-based diffing has no concept of "modified" — a changed line is literally an old line that disappeared plus a new line that appeared, which is exactly how git stores it. The pairing pass reconstructs the human notion of modification: an unbroken run of deletions immediately followed by additions is almost always an edit, so pairOps zips them positionally into replacement pairs (surplus lines on either side stay as pure adds/dels). For each pair, charDiff finds what actually changed by trimming the longest common prefix and longest common suffix — everything between the trims gets the strong highlight. This heuristic is intentionally simple: for "return data;" → "return data.results;" it isolates ".results" perfectly. Its known weakness is multiple separated edits in one line (it will highlight the whole span between the first and last change); upgrading means running the same LCS algorithm over word tokens within the pair, which the code structure permits — diffLines works on any array, including line.split(/(\\W)/).',
      },
      {
        q: 'How do I render an existing git unified diff instead of computing one from two strings?',
        a: 'Skip the algorithm and map the patch format straight into ops. A unified diff\'s body lines start with a space (context), "-" (deletion), or "+" (addition); hunk headers like @@ -12,6 +12,8 @@ carry the starting line numbers for each side. Parse line by line: maintain two counters seeded from the hunk header, and emit { t: "ctx", a, b, text } incrementing both, { t: "del", a, text } incrementing the old counter, or { t: "add", b, text } incrementing the new one, stripping the prefix character from text. Feed the result through pairOps() and either renderer works unchanged — the renderers only know about ops, not about how they were produced. This is the right architecture for PR-review tools where the server (or git itself) already produced the patch: never re-diff what git has diffed, since byte-identical rendering to git\'s decisions is what reviewers expect.',
      },
      {
        q: 'Can I style this with Tailwind CSS or use it in React and Angular?',
        a: 'Tailwind: the card is bg-slate-900 border border-slate-700 rounded-xl overflow-hidden; gutters are w-10 px-2.5 text-right text-[11px] text-slate-600 select-none border-r border-slate-800 align-top; code cells are px-3.5 whitespace-pre font-mono text-[12.5px]; row tints are bg-green-400/10 for additions and bg-red-400/10 for deletions with the intra-line marks as bg-green-400/30 rounded-sm and bg-red-400/30. In React, keep diffLines, pairOps, charDiff, and collapse as pure functions in a diff.ts module — they have zero DOM dependencies — then const ops = useMemo(() => pairOps(diffLines(oldLines, newLines)), [oldText, newText]) and map ops to <tr> elements, replacing the innerHTML string-building with JSX (which also gives you escaping for free, so drop esc()). In Angular, the same pure module plus a component computing ops in a computed() signal, rendered with @for over the collapsed rows; the hunk-expand becomes a signal flip instead of a re-render call.',
      },
    ],
    aiPrompt: {
      paragraph: `This file contains a complete diff implementation small enough to actually understand, and an AI assistant is the ideal study partner for it: paste the code into Claude and ask it to walk the dp table for two five-line files by hand, showing why the traceback emits dels before adds at a mismatch — then ask where the O(MN) cost bites and have it swap in Myers' O(ND) algorithm as a drop-in diffLines replacement, verifying both produce valid diffs. On the product side, the highest-value requests are integration-shaped: have it write the unified-diff parser that maps git patch text into this op format so you can render server-produced diffs byte-faithfully; ask for per-hunk accept/reject buttons that reconstruct the merged file from chosen ops (the core of any AI code-review UI); or have it layer a line-by-line syntax highlighter around the existing intra-line marks in the escape → diff-marks → syntax order the about section prescribes. And if the demo's word-level highlight underwhelms on heavily edited lines, ask it to re-run the same LCS over word tokens within each pair — the algorithm is already granularity-agnostic, which is the lesson worth extracting.`,
      prompt: `Build a GitHub-style code diff viewer in plain HTML, CSS, and JavaScript that COMPUTES the diff itself from two versions of a source file — no diff libraries, no pre-baked diff data.

Requirements:
- Implement line diffing with the classic LCS dynamic-programming algorithm: fill the (m+1)×(n+1) suffix table bottom-up, then walk it emitting typed ops — context lines carrying both original line numbers, deletions carrying old line numbers, additions carrying new ones.
- Add a pairing pass that zips adjacent deletion runs with following addition runs into replacement pairs, and an intra-line highlighter that trims each pair's common prefix and suffix, wrapping only the changed middle in stronger-tinted mark spans; all source text must pass through an HTML escaper before any markup injection.
- Render a Unified view as a table with two line-number gutters (old and new), a +/−/space sign column, and low-alpha green/red row tints with matching tinted gutters — replacement pairs appearing as a red row directly above its green counterpart.
- Render a Split view as a four-column table — old gutter and code left, new gutter and code right — where context rows fill both sides, pairs align del-left/add-right with their intra-line highlights, and unpaired lines leave a dimmed empty cell opposite; both views must consume the same op stream so toggling is a pure re-render.
- Collapse runs of unchanged lines longer than ~5 into clickable "Expand N unchanged lines" bars keeping two context lines around every change, expanding on click; include a header bar with a monospace filename, computed +added/−removed stats, and a Unified/Split segmented toggle.
- Wrap the table in a horizontal-scroll container with white-space: pre so long lines never wrap, and comment the algorithm generously — the dp recurrence, why the traceback direction choice matters, and where Myers' algorithm would substitute for large files.`,
    },
  },
};

export default codeDiffViewer;
