const textDiffChecker = {
  id: 'text-diff-checker',
  title: 'Text Diff Checker',
  lastmod: '2026-08-24',
  category: 'dev',
  cdnUrls: [],
  html: `<div class="tdc-card">
  <h3>Text Diff Checker</h3>
  <p class="tdc-sub">Word-level comparison between two blocks of text, computed client-side.</p>
  <div class="tdc-inputs">
    <div class="tdc-col">
      <label>Original</label>
      <textarea id="tdcA">The quick brown fox jumps over the lazy dog near the river.</textarea>
    </div>
    <div class="tdc-col">
      <label>Changed</label>
      <textarea id="tdcB">The quick brown fox leaps over the sleepy dog by the river bank.</textarea>
    </div>
  </div>
  <button class="tdc-btn" id="tdcCompare">Compare</button>
  <div class="tdc-result" id="tdcResult">
    <div class="tdc-legend"><span class="tdc-swatch tdc-del"></span> removed <span class="tdc-swatch tdc-add"></span> added</div>
    <div class="tdc-output" id="tdcOutput"></div>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.tdc-card{background:#fff;border-radius:16px;padding:26px 28px;width:100%;max-width:640px;box-shadow:0 4px 24px rgba(15,23,42,.08)}
.tdc-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:4px}
.tdc-sub{font-size:12.5px;color:#64748b;margin-bottom:18px}
.tdc-inputs{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.tdc-col label{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#94a3b8;margin-bottom:6px}
.tdc-col textarea{width:100%;min-height:90px;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:9px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;line-height:1.6;resize:vertical;outline:none;color:#1e293b}
.tdc-col textarea:focus{border-color:#6366f1}
.tdc-btn{padding:10px 20px;background:#6366f1;color:#fff;border:none;border-radius:9px;font-size:13.5px;font-weight:700;cursor:pointer;margin-bottom:18px}
.tdc-btn:hover{background:#4f46e5}
.tdc-legend{font-size:11.5px;color:#64748b;display:flex;align-items:center;gap:6px;margin-bottom:10px}
.tdc-swatch{width:11px;height:11px;border-radius:3px;display:inline-block}
.tdc-swatch.tdc-del{background:#fecaca}
.tdc-swatch.tdc-add{background:#bbf7d0}
.tdc-output{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;font-size:13.5px;line-height:2;color:#334155;word-break:break-word}
.tdc-output del{background:#fecaca;color:#991b1b;text-decoration:line-through;text-decoration-color:rgba(153,27,27,.5);border-radius:3px;padding:1px 3px;margin:0 1px}
.tdc-output ins{background:#bbf7d0;color:#065f46;text-decoration:none;border-radius:3px;padding:1px 3px;margin:0 1px}
@media (max-width:520px){.tdc-inputs{grid-template-columns:1fr}}`,
  js: `(function(){
  var aInput = document.getElementById('tdcA');
  var bInput = document.getElementById('tdcB');
  var btn = document.getElementById('tdcCompare');
  var output = document.getElementById('tdcOutput');

  function tokenize(text) {
    // split on whitespace, keeping the whitespace as its own token so spacing survives
    return text.split(/(\\s+)/).filter(function (t) { return t.length > 0; });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Longest Common Subsequence table over word tokens, then backtrack to build
  // a sequence of equal / delete / insert operations (classic Myers-style diff via DP).
  function diffWords(a, b) {
    var n = a.length, m = b.length;
    var dp = new Array(n + 1);
    for (var i = 0; i <= n; i++) dp[i] = new Array(m + 1).fill(0);
    for (i = n - 1; i >= 0; i--) {
      for (var j = m - 1; j >= 0; j--) {
        dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    var ops = [];
    i = 0; var jj = 0;
    while (i < n && jj < m) {
      if (a[i] === b[jj]) { ops.push({ type: 'eq', text: a[i] }); i++; jj++; }
      else if (dp[i + 1][jj] >= dp[i][jj + 1]) { ops.push({ type: 'del', text: a[i] }); i++; }
      else { ops.push({ type: 'add', text: b[jj] }); jj++; }
    }
    while (i < n) { ops.push({ type: 'del', text: a[i] }); i++; }
    while (jj < m) { ops.push({ type: 'add', text: b[jj] }); jj++; }
    return ops;
  }

  function render() {
    var ops = diffWords(tokenize(aInput.value), tokenize(bInput.value));
    output.innerHTML = ops.map(function (op) {
      var text = escapeHtml(op.text);
      if (op.type === 'del') return '<del>' + text + '</del>';
      if (op.type === 'add') return '<ins>' + text + '</ins>';
      return text;
    }).join('');
  }

  btn.addEventListener('click', render);
  render();
})();`,
  seo: {
    title: 'Text Diff Checker — Free HTML CSS JS Word-Level Diff Snippet',
    description: 'A word-level text comparison tool using a dynamic-programming longest common subsequence algorithm, highlighting insertions and deletions inline — no external diff library.',
    about: {
      title: 'Text Diff Checker — LCS Dynamic Programming Diff, No Library',
      description: `Comparing two versions of a document, contract, or paragraph word-by-word is exactly the kind of problem that looks trivial until you try to implement it — a naive character comparison produces useless, noisy output. This snippet implements a real longest common subsequence (LCS) diff algorithm from scratch in vanilla JavaScript, operating on whitespace-preserving word tokens instead of individual characters.

**Tokenizing without losing whitespace**

\`tokenize()\` splits on \`/(\\s+)/\` with a capturing group, which — unlike a plain split on whitespace — keeps every run of spaces, tabs, and newlines as its own token in the resulting array. That means the diff algorithm treats "quick brown" and "quick  brown" (two spaces) as genuinely different token sequences, and reassembling the output never needs to guess where whitespace should go — it's already preserved token-for-token.

**Building the LCS table bottom-up**

\`dp[i][j]\` holds the length of the longest common subsequence between the tail of array \`a\` starting at index \`i\` and the tail of \`b\` starting at index \`j\`. The nested loop fills this table from the bottom-right corner backward: \`dp[i][j] = a[i] === b[j] ? dp[i+1][j+1] + 1 : Math.max(dp[i+1][j], dp[i][j+1])\` — if the tokens match, extend the best subsequence found one cell diagonally; otherwise take whichever neighboring cell (skip a token from \`a\`, or skip one from \`b\`) gives the longer subsequence. This is the same core recurrence used by \`diff\`, \`git diff\`, and most text-comparison tools.

**Backtracking to recover the actual edits**

Once the table is built, a forward walk from \`(0, 0)\` reconstructs the operations: matching tokens are \`eq\`, and at a mismatch the walk follows whichever neighbor cell in the DP table has the larger value — \`dp[i+1][jj] >= dp[i][jj+1]\` — deciding whether this token was deleted from \`a\` or inserted from \`b\`. This greedy-looking walk is provably optimal because the table already encodes the best subsequence length at every position.

**Rendering with real \`<del>\`/\`<ins>\` elements**

Deleted tokens render inside \`<del>\` and inserted tokens inside \`<ins>\` — the semantically correct HTML elements for this exact purpose, not just styled \`<span>\`s — while every token is passed through \`escapeHtml()\` first so pasted text containing \`<\`, \`>\`, or \`&\` can't break the output markup.

**Customizing it**

Swap word-level tokenization for character-level (drop the whitespace-preserving regex and split on \`''\`) for finer-grained diffs, or add a line-level mode by tokenizing on \`\\n\` first and running the same \`diffWords()\` function on lines instead of words.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two sample paragraphs load with a diff already rendered below.` },
      { title: 'Edit either text area', text: `Change the "Original" or "Changed" text to whatever you want to compare.` },
      { title: 'Click Compare', text: `The diff output re-renders, showing removed words struck through in red and added words highlighted in green.` },
      { title: 'Read the result', text: `Unchanged words appear plain; only the actual differing spans are highlighted, not the whole line.` },
      { title: 'Switch to character-level diffing', text: `In tokenize(), remove the whitespace-preserving split and split the string into individual characters instead.` },
      { title: 'Add line-level diffing', text: `Tokenize on newlines first, run diffWords() on the resulting line arrays, then run it again within each changed line for word-level detail.` },
    ] },
    features: [
      { title: 'Real LCS diff algorithm', text: `A dynamic-programming longest common subsequence table drives the comparison, not a naive line-by-line check.` },
      { title: 'Word-level granularity', text: `Diffs individual words rather than whole lines, so small edits in a long paragraph stay easy to spot.` },
      { title: 'Whitespace-preserving tokenizer', text: `A capturing-group regex split keeps spacing as real tokens so output reconstruction is exact.` },
      { title: 'Semantic del/ins markup', text: `Removed and added text render inside real <del> and <ins> elements, not generic styled spans.` },
      { title: 'HTML-escaped output', text: `Every token is escaped before insertion so pasted text with angle brackets can't break the layout.` },
      { title: 'Color-coded legend', text: `A small legend clarifies the red-for-removed, green-for-added convention up front.` },
      { title: 'Responsive two-column input', text: `Side-by-side text areas collapse to a single column on narrow viewports.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no diff-match-patch or similar library.` },
    ],
    useCases: [
      { title: 'Contract and legal document review', text: `Spot exact wording changes between two versions of a clause or agreement.` },
      { title: 'Content editing and copyediting tools', text: `Show writers precisely what an editor changed in a paragraph.` },
      { title: 'Translation and localization QA', text: `Compare a translated string against a previous version to catch unintended drift.` },
      { title: 'Version comparison in CMS platforms', text: `Let editors see word-level changes between saved drafts of an article.` },
      { title: 'Support and documentation changelogs', text: `Highlight exactly what changed in an updated help article or policy page.` },
      { title: 'Learning diff algorithms', text: `A readable, from-scratch implementation of the LCS recurrence used by real diff tools.` },
      { icon: 'CODE', title: 'Related: GitHub-Style Contribution Heatmap', desc: 'See the [GitHub-Style Contribution Heatmap](/ui-snippets/github-contribution-heatmap/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Regex Tester & Match Visualizer', desc: 'See the [Regex Tester & Match Visualizer](/ui-snippets/regex-tester/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How does this diff algorithm actually work?`, a: `It builds a dynamic-programming table where dp[i][j] represents the length of the longest common subsequence between the remaining tokens of each text starting at positions i and j. Filling that table from the end backward, then walking it forward from the start while following whichever neighbor has the larger stored value, reconstructs the optimal sequence of matches, deletions, and insertions.` },
      { q: `Why tokenize on words instead of characters?`, a: `Character-level diffing on prose tends to produce noisy, hard-to-read output — a single added word can make every following character look "different" until things realign. Word-level tokens keep the diff granularity matched to how humans actually read changes: word by word, not letter by letter.` },
      { q: `How is whitespace preserved between the two texts?`, a: `tokenize() splits using a regex with a capturing group around whitespace, /(\\s+)/, which — unlike a normal split — includes the matched whitespace runs as their own array entries instead of discarding them. This means spacing differences are diffed and reconstructed exactly like word differences.` },
      { q: `Is this algorithm efficient for very long documents?`, a: `The DP table is O(n × m) in both time and memory, where n and m are the token counts of each text. That's fine for paragraphs and typical documents, but for very large files (thousands of lines) you'd want a line-level pre-pass first — diff at the line granularity, then only run this word-level diff on the lines that actually changed.` },
      { q: `Can I highlight character-level changes within a changed word instead of the whole word?`, a: `Yes — run diffWords() a second time, but on the individual characters of just the words marked del/add adjacent to each other, rather than on the full token arrays. This two-pass approach (word-level first, then character-level within changed spans) is how most polished diff tools get fine-grained highlighting.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the dynamic-programming recurrence by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why dp[i][j] = a[i] === b[j] ? dp[i+1][j+1] + 1 : Math.max(dp[i+1][j], dp[i][j+1]) correctly computes the longest common subsequence, and how the backtracking walk turns that table into a concrete list of matched, deleted, and inserted tokens. The same assistant can help optimize it too — ask whether a line-level pre-pass would make the algorithm practical for multi-page documents where the full O(n×m) table would otherwise be too large. It's also useful for extending the tool: ask it to add character-level highlighting within changed words, a side-by-side (rather than inline) diff view, or a copy-as-markdown export of the diff result. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "text diff checker" that highlights word-level differences between two blocks of text, in plain HTML, CSS, and JavaScript with no external diff library — implement the diff algorithm yourself.

Requirements:
- Two text areas labeled "Original" and "Changed", each containing editable sample text, and a "Compare" button.
- A tokenizer that splits each text into an array of word and whitespace tokens using a whitespace-preserving strategy (e.g. splitting with a regex capturing group on whitespace runs) so that spacing differences between the two texts are preserved as real tokens, not discarded.
- A from-scratch implementation of a longest common subsequence dynamic-programming algorithm over the two token arrays: build a 2D table bottom-up where each cell represents the LCS length of the remaining suffixes, then backtrack (or walk forward) through that table to reconstruct an ordered list of operations tagged as unchanged, deleted (only in the original), or inserted (only in the changed text).
- Render the reconstructed operations inline: unchanged tokens as plain text, deleted tokens wrapped in real <del> elements with strikethrough and a red background, and inserted tokens wrapped in real <ins> elements with a green background — concatenated in order so the output reads as continuous prose with the changes highlighted in place.
- HTML-escape every token's text before inserting it into the page so pasted text containing angle brackets or ampersands can't break the rendered output.
- A small legend explaining the red/green color convention, and a responsive two-column input layout that collapses to one column on narrow screens.`,
    },
  },
};

export default textDiffChecker;
