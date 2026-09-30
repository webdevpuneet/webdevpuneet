const bootstrapDiffViewer = {
  id: 'bootstrap-diff-viewer',
  title: 'Bootstrap Diff Viewer',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsdiff-card">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="fw-bold mb-0">Changes in v5</h6>
        <span class="small text-muted"><span class="text-success fw-bold" id="bsdiffAdded">0</span> added &middot; <span class="text-danger fw-bold" id="bsdiffRemoved">0</span> removed</span>
      </div>
      <pre class="bsdiff-view mb-0" id="bsdiffView"></pre>
    </div>
  </div>
</div>`,
  css: `.bsdiff-card { width: 440px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsdiff-view {
  margin: 0; padding: 10px 12px; background: #f8f9fb; border-radius: 8px;
  font: 12.5px/1.7 ui-monospace, Menlo, Consolas, monospace; white-space: pre-wrap; word-break: break-word;
}
.bsdiff-line { display: block; padding: 1px 6px; border-radius: 3px; }
.bsdiff-add { background: #dcfce7; color: #166534; }
.bsdiff-remove { background: #fee2e2; color: #991b1b; text-decoration: line-through; }
.bsdiff-same { color: #6b7280; }`,
  js: `const OLD_LINES = [
  'Our platform helps teams ship faster.',
  'Get started with a free 14-day trial.',
  'No credit card required.',
  'Cancel anytime.',
];

const NEW_LINES = [
  'Our platform helps teams ship faster, together.',
  'Get started with a free 30-day trial.',
  'No credit card required.',
  'Trusted by over 2,000 companies.',
];

// A minimal line-level LCS diff — good enough for short, line-oriented
// content like this without pulling in a full diff library.
function diffLines(oldLines, newLines) {
  const m = oldLines.length, n = newLines.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = oldLines[i] === newLines[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const result = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (oldLines[i] === newLines[j]) { result.push({ type: 'same', text: oldLines[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { result.push({ type: 'remove', text: oldLines[i] }); i++; }
    else { result.push({ type: 'add', text: newLines[j] }); j++; }
  }
  while (i < m) { result.push({ type: 'remove', text: oldLines[i] }); i++; }
  while (j < n) { result.push({ type: 'add', text: newLines[j] }); j++; }
  return result;
}

function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

const view = document.getElementById('bsdiffView');
const diff = diffLines(OLD_LINES, NEW_LINES);

const added = diff.filter(d => d.type === 'add').length;
const removed = diff.filter(d => d.type === 'remove').length;
document.getElementById('bsdiffAdded').textContent = added;
document.getElementById('bsdiffRemoved').textContent = removed;

view.innerHTML = diff.map(d => {
  const prefix = d.type === 'add' ? '+ ' : d.type === 'remove' ? '- ' : '  ';
  const cls = d.type === 'add' ? 'bsdiff-add' : d.type === 'remove' ? 'bsdiff-remove' : 'bsdiff-same';
  return '<span class="bsdiff-line ' + cls + '">' + prefix + escapeHtml(d.text) + '</span>';
}).join('');`,

  seo: {
    title: 'Bootstrap Diff Viewer — Free HTML CSS JS Snippet',
    description: 'A real line-level text diff built with Bootstrap 5.3 styling and a genuine longest-common-subsequence algorithm — matching unchanged lines correctly instead of naively comparing by position.',
    about: {
      title: 'Bootstrap Diff Viewer — HTML, CSS & JavaScript',
      description: `The naive way to "diff" two lists of lines — compare index 0 to index 0, index 1 to index 1, and so on — breaks the instant a single line is inserted or removed near the top, since every line after that point would then appear "changed" even though most of them are actually identical, just shifted. This snippet instead implements a genuine longest-common-subsequence (LCS) algorithm: a dynamic-programming table \`dp[i][j]\` records the length of the longest matching subsequence between the remaining old and new lines from each position, built from the bottom right corner upward.\n\nWalking that table forward from \`i = 0, j = 0\` is what turns the LCS lengths into an actual list of same/add/remove operations — a matching line at the current position advances both pointers as \`same\`, and at a mismatch, comparing \`dp[i+1][j]\` against \`dp[i][j+1]\` decides whether the old line was removed or the new line was inserted, always picking whichever choice preserves the longer eventual match. That's the mechanism that correctly identifies "No credit card required." as unchanged even though it sits at a different combination of surrounding added and removed lines in this demo's before/after text.\n\nEvery line's text is HTML-escaped via \`escapeHtml()\` before being inserted, so diffed content containing \`<\`, \`>\`, or \`&\` — entirely plausible in real document or config content — can never be misinterpreted as markup once rendered.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A four-line diff renders: unchanged lines in gray, added lines highlighted green, removed lines struck through in red.' },
        { title: 'Read the count above the diff', text: 'It reads the real number of added and removed lines, computed from the same diff result being rendered.' },
        { title: 'Look at "No credit card required."', text: 'It renders as unchanged (gray), correctly recognized as identical even though the lines around it changed.' },
        { title: 'Compare the last line of each version', text: '"Cancel anytime." is shown as removed, and "Trusted by over 2,000 companies." as added — genuinely different lines, not a false "changed" pairing.' },
      ],
    },
    features: [
      'A real longest-common-subsequence algorithm, not a naive index-by-index comparison',
      'Correctly identifies unchanged lines even when surrounded by insertions and deletions',
      'Added and removed line counts are derived from the same diff result being displayed, never computed separately',
      'All diffed text is HTML-escaped before rendering, safe against special characters in real content',
      'Distinct, clearly readable visual styles for added, removed, and unchanged lines',
    ],
    useCases: [
      { icon: 'DEV', title: 'Document and CMS content revision comparisons', desc: 'Pairs directly with [bootstrap-version-history-panel](/ui-snippets/bootstrap-version-history-panel/) to show exactly what a restore would change before committing to it.' },
      { icon: 'API', title: 'Configuration and settings change review', desc: 'Show precisely what changed in a JSON config or settings file between two saved states.' },
      { icon: 'LEARN', title: 'Learning the LCS algorithm applied to a real problem', desc: 'A genuinely useful, complete implementation of the same core algorithm behind tools like git diff.' },
    ],
    faqs: [
      { q: 'Why not just compare lines by their index position?', a: 'Comparing purely by position breaks as soon as a single line is inserted or removed anywhere before the end — every subsequent line would then appear mismatched even if it\'s identical, just shifted by one position. LCS correctly finds the actual longest matching subsequence regardless of where insertions or deletions occur.' },
      { q: 'Does this diff at the word level or only whole lines?', a: 'Whole lines only — this is a line-level diff suitable for prose, config files, or any line-oriented content; a word-level diff (useful for highlighting a small change within a long paragraph) would need a similar LCS approach applied to words instead of lines.' },
      { q: 'Is the diff safe against HTML in the content being compared?', a: 'Yes — escapeHtml() runs on every line\'s text before it\'s inserted into the page, so content containing <, >, or & characters renders as literal text rather than being interpreted as markup.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. The diffLines() function is plain, framework-agnostic JavaScript — call it with your old/new line arrays in component state and map the result to JSX/template elements instead of building an HTML string directly.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to extend the diff to a word-level or character-level granularity for highlighting a small change within a single changed line, or to add a side-by-side (two-column) view as an alternative to the current unified inline view.`,
      prompt: `Build a Bootstrap 5.3 line-level text diff viewer, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the surrounding card styling.

Requirements:
- Two sample multi-line texts (an "old" and a "new" version) with at least one line unchanged, at least one line added, and at least one line removed between them.
- Implement a genuine longest-common-subsequence (LCS) diff algorithm using dynamic programming — not a naive line-by-line positional comparison — to correctly identify which lines are unchanged even when insertions or deletions occur elsewhere in the text.
- Render the result as a unified diff: unchanged lines shown plainly, added lines visually highlighted (e.g. green background with a "+" prefix), and removed lines visually struck through (e.g. red background with a "-" prefix).
- Show a live count of added and removed lines above the diff, computed from the same diff result being rendered, not a separately maintained count.
- HTML-escape every line's text before rendering, so diffed content containing special HTML characters displays safely as literal text.`,
    },
  },
};

export default bootstrapDiffViewer;
