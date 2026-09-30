const aiDiffReviewCard = {
  id: 'ai-diff-review-card',
  title: 'AI Diff Review Card',
  lastmod: '2026-08-22',
  category: 'cards',
  html: `<div class="drc-card">
  <div class="drc-head">
    <div class="drc-head-left">
      <span class="drc-icon">&#10022;</span>
      <div>
        <h3>AI-suggested change</h3>
        <p id="drcFile">utils/formatCurrency.js</p>
      </div>
    </div>
    <span class="drc-confidence" id="drcConfidence">92% confident</span>
  </div>

  <div class="drc-diff" id="drcDiff"></div>

  <div class="drc-reason">
    <strong>Why:</strong> <span id="drcReason">Rounds to the nearest cent before formatting to avoid floating-point display errors like $9.999999.</span>
  </div>

  <div class="drc-actions">
    <button type="button" class="drc-reject" id="drcReject">Reject</button>
    <button type="button" class="drc-accept" id="drcAccept">Accept change</button>
  </div>

  <div class="drc-result" id="drcResult" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d15;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.drc-card{background:#0f1420;border:1px solid #1e2536;border-radius:16px;padding:20px;width:100%;max-width:480px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.drc-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px}
.drc-head-left{display:flex;gap:10px;align-items:flex-start}
.drc-icon{width:30px;height:30px;border-radius:9px;background:linear-gradient(160deg,#8b5cf6,#6366f1);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;flex-shrink:0}
.drc-head h3{font-size:14.5px;font-weight:800;color:#f1f5f9}
.drc-head p{font-size:11.5px;color:#64748b;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;margin-top:2px}
.drc-confidence{font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:999px;background:rgba(52,211,153,.14);color:#34d399;white-space:nowrap;height:fit-content}

.drc-diff{background:#0a0e17;border:1px solid #1a2130;border-radius:10px;overflow:hidden;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.7;margin-bottom:14px}
.drc-line{display:flex;padding:0 12px}
.drc-line .drc-gutter{width:16px;flex-shrink:0;user-select:none;font-weight:700}
.drc-line-del{background:rgba(248,113,113,.08)}
.drc-line-del .drc-gutter{color:#f87171}
.drc-line-del .drc-code{color:#fca5a5;text-decoration:line-through;text-decoration-color:rgba(248,113,113,.4)}
.drc-line-add{background:rgba(52,211,153,.08)}
.drc-line-add .drc-gutter{color:#34d399}
.drc-line-add .drc-code{color:#a7f3d0}
.drc-line-ctx .drc-gutter{color:#3f4a63}
.drc-line-ctx .drc-code{color:#7c8aa5}
.drc-code{white-space:pre;overflow-x:auto}

.drc-reason{font-size:12.5px;color:#9aa5c1;line-height:1.6;background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.18);border-radius:10px;padding:11px 13px;margin-bottom:16px}
.drc-reason strong{color:#c7d2fe}

.drc-actions{display:flex;gap:8px}
.drc-actions button{flex:1;border:none;border-radius:9px;padding:11px;font-size:13px;font-weight:700;cursor:pointer;transition:background .15s,opacity .15s}
.drc-accept{background:#6366f1;color:#fff}
.drc-accept:hover{background:#4f46e5}
.drc-reject{background:#1a2130;color:#cbd5e1}
.drc-reject:hover{background:#232b40}
.drc-card.drc-decided .drc-actions{display:none}

.drc-result{margin-top:14px;border-radius:10px;padding:11px 13px;font-size:12.5px;font-weight:600;text-align:center}
.drc-result[hidden]{display:none}
.drc-result.accepted{background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.3);color:#6ee7b7}
.drc-result.rejected{background:rgba(148,163,184,.08);border:1px solid rgba(148,163,184,.2);color:#94a3b8}`,

  js: `var DIFF = [
  { type: 'ctx', text: "export function formatCurrency(amount) {" },
  { type: 'del', text: "  return '$' + amount.toFixed(2);" },
  { type: 'add', text: "  const rounded = Math.round(amount * 100) / 100;" },
  { type: 'add', text: "  return '$' + rounded.toFixed(2);" },
  { type: 'ctx', text: "}" },
];

var diffEl = document.getElementById('drcDiff');
var card = document.querySelector('.drc-card');
var resultEl = document.getElementById('drcResult');

function renderDiff() {
  diffEl.innerHTML = DIFF.map(function (line) {
    var cls = line.type === 'del' ? 'drc-line-del' : line.type === 'add' ? 'drc-line-add' : 'drc-line-ctx';
    var gutter = line.type === 'del' ? '&#8722;' : line.type === 'add' ? '+' : '&nbsp;';
    return '<div class="drc-line ' + cls + '"><span class="drc-gutter">' + gutter + '</span><span class="drc-code">' + escapeHtml(line.text) + '</span></div>';
  }).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function decide(outcome) {
  card.classList.add('drc-decided');
  resultEl.hidden = false;
  resultEl.className = 'drc-result ' + outcome;
  resultEl.textContent = outcome === 'accepted'
    ? 'Change applied to utils/formatCurrency.js'
    : 'Change discarded — no files were modified';
}

document.getElementById('drcAccept').addEventListener('click', function () { decide('accepted'); });
document.getElementById('drcReject').addEventListener('click', function () { decide('rejected'); });

renderDiff();`,

  seo: {
    title: 'AI Diff Review Card — Free Code Change Accept/Reject Snippet',
    description: `A card showing an AI-suggested code change as a red/green line diff with a confidence badge, a plain-language reason, and Accept/Reject buttons. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'AI Diff Review Card — Red/Green Diff with Confidence and Accept/Reject',
      description: `AI coding assistants and autonomous agents increasingly propose code changes rather than making them silently — and the review moment is where trust is won or lost. This snippet builds a self-contained diff review card in plain HTML, CSS, and vanilla JavaScript: a red/green line-by-line diff, a confidence badge, a plain-language explanation of *why* the change was made, and clear Accept/Reject actions.

**A line-typed diff, not a diff library**

Each line in the \`DIFF\` array is tagged \`del\`, \`add\`, or \`ctx\` (context). \`renderDiff()\` maps that into a gutter marker (\`−\`, \`+\`, or blank) and a colored background — red with strikethrough for removed lines, green for added lines, muted for unchanged context — the same visual language as GitHub and every major code review tool, without pulling in a diffing library. Because it's just data, generating this from a real diff (e.g. from Git or an LLM's structured output) is a straightforward mapping step.

**A confidence badge that sets expectations**

The 92% badge in the header signals the AI's own certainty about the suggestion, letting a reviewer calibrate how carefully to check it — a low-confidence change deserves more scrutiny than a high-confidence one. This is the same trust-calibration idea behind this library's [AI confidence badge](/ui-snippets/ai-confidence-badge/), applied specifically to code suggestions.

**Explaining the "why," not just the "what"**

Below the diff, a reason panel states in plain language why the change was suggested — here, a floating-point rounding bug — rather than leaving the reviewer to reverse-engineer intent from the code alone. This single addition is often what separates an AI suggestion a developer trusts enough to accept quickly from one they ignore.

**Decisive actions with a visible outcome**

Accepting or rejecting hides the action row and shows a clear result message, so the card visibly reflects the reviewer's decision rather than staying in an ambiguous "still pending" state. Pair it with an [AI action approval card](/ui-snippets/ai-action-approval-card/) for non-code AI actions, or an [AI review summary card](/ui-snippets/ai-review-summary-card/) to summarize a batch of decisions like this one.

**Customizing it**

Swap the hard-coded \`DIFF\` array for a real diff parsed from your AI backend's output, add a "view full file" expand action, or add a third "request changes" option that opens a comment field instead of a binary accept/reject.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A diff review card renders with a red/green line diff and a confidence badge.` },
      { title: 'Read the reason panel', text: `A plain-language explanation states why the AI suggested the change.` },
      { title: 'Click Accept or Reject', text: `The action buttons hide and a result message confirms the decision.` },
      { title: 'Edit the DIFF array', text: `Change the del/add/ctx lines to show a different suggested change.` },
      { title: 'Change the confidence value', text: `Update the badge text and color to reflect the AI's certainty.` },
      { title: 'Wire up real actions', text: `Replace decide() with calls to apply or discard the change via your API.` },
    ] },
    features: [
      { title: 'Red/green line diff', text: `Data-driven del/add/context lines render with familiar diff coloring and gutter markers.` },
      { title: 'Confidence badge', text: `Sets reviewer expectations about how carefully to check the suggestion.` },
      { title: 'Plain-language reason', text: `Explains why the change was suggested, not just what changed.` },
      { title: 'Accept / Reject actions', text: `Clear binary decision with a visible result state afterward.` },
      { title: 'HTML-escaped code rendering', text: `Diff lines are safely escaped so arbitrary code text can't break the layout.` },
      { title: 'Monospace diff styling', text: `Matches familiar code-review tool conventions for instant legibility.` },
      { title: 'Decided-state UI', text: `Actions disappear once a decision is made, replaced by a clear outcome.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no diff library required.` },
    ],
    useCases: [
      { title: 'AI coding assistants', text: `Let developers review and accept suggested edits, paired with [code diff viewer](/ui-snippets/code-diff-viewer/).` },
      { title: 'Autonomous coding agents', text: `Gate agent-proposed commits behind human review, alongside an [AI action approval card](/ui-snippets/ai-action-approval-card/).` },
      { title: 'PR review bots', text: `Surface a bot's suggested fix inline in a review dashboard.` },
      { title: 'Refactor suggestion tools', text: `Show a batch of proposed refactors next to a [code comparison](/ui-snippets/code-comparison/) view.` },
      { title: 'Linting and auto-fix UIs', text: `Let users accept or reject an automated fix one at a time.` },
      { title: 'Learning tools', text: `Teach diff reading with a clear, styled before/after example.` },
      { icon: 'CODE', title: 'Related: Atropos 3D Parallax Card', desc: 'See the [Atropos 3D Parallax Card](/ui-snippets/atropos-3d-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Recipe Card with Serving Scaler', desc: 'See the [Recipe Card with Serving Scaler](/ui-snippets/recipe-serving-scaler-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pet Vaccination Reminder Card', desc: 'See the [Pet Vaccination Reminder Card](/ui-snippets/pet-vaccination-reminder-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the diff rendered without a diffing library?', a: `The DIFF array already encodes each line's type (removed, added, or unchanged context) rather than computing a diff at render time. renderDiff() simply maps each type to a gutter marker and a CSS class. If you need to diff two arbitrary strings client-side, you would still want a small diffing algorithm — this snippet assumes the diff is already known, which is typically true when an AI backend returns a structured suggestion.` },
      { q: 'Why show a confidence badge on a code suggestion?', a: `Confidence helps a reviewer calibrate scrutiny — a change the AI is 98% confident about (a straightforward bug fix) usually needs a quick glance, while a 60% confidence change (a larger refactor) deserves a closer read. Surfacing that number turns a binary "trust it or don't" into a more honest, gradated signal.` },
      { q: 'How do I make Accept actually apply the change?', a: `Replace the accept button's decide("accepted") call with a request to your backend or version control API that applies the underlying patch, then call decide("accepted") once that request succeeds (or decide with an error state if it fails).` },
      { q: 'Can I show multiple diff hunks in one card?', a: `Yes — extend DIFF to include a hunk header type (showing something like @@ -12,3 +12,4 @@) between groups of lines, and add a small amount of spacing or a divider between hunks in renderDiff(). The accept/reject actions can stay scoped to the whole suggestion or be split per hunk depending on your workflow.` },
      { q: 'How do I use this diff review card in React, Vue, or Angular?', a: `Pass the diff lines and confidence as props, render them with a map/v-for/*ngFor, and lift the accept/reject decision to a callback prop so the parent can apply or discard the underlying patch. The escapeHtml step becomes unnecessary since JSX/templates escape text content by default.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the diff-rendering logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the DIFF array's type field drives both the gutter marker and the background color for each line, and why escaping the code text before inserting it as innerHTML matters when the diff content could come from an untrusted AI response. The same assistant can help optimize it — ask whether very long diffs should virtualize or truncate with a "show more" control, or whether syntax highlighting should be layered on top of the existing diff coloring. It's also useful for extending the card: ask it to add a third "request changes" action with a comment field, support multiple file diffs in one card with tabs, or animate the transition from pending to decided state. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "AI diff review card" in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- A card header showing an AI icon, a file name, and a confidence percentage badge indicating how certain the AI is about its suggested change.
- A code diff area driven entirely from a JavaScript array of line objects, each tagged as removed, added, or unchanged context — render removed lines with a red background, strikethrough text, and a minus-sign gutter marker; added lines with a green background, normal text, and a plus-sign gutter marker; and context lines muted with no gutter marker, all in a monospace font.
- HTML-escape the code text before inserting it into the page, since the diff content should be treated as untrusted data that could contain angle brackets or ampersands.
- A plain-language "reason" panel below the diff explaining in one or two sentences why the AI suggested this specific change, not just restating what changed.
- Accept and Reject buttons that, when clicked, hide the action buttons and reveal a clear result message confirming which decision was made (e.g. "Change applied" vs "Change discarded") — the card should visibly move from a pending state to a decided state.
- Use a dark theme with a violet accent for the header icon and confidence badge, monospace font for code, and system-ui font for everything else.`,
    },
  },
};

export default aiDiffReviewCard;
