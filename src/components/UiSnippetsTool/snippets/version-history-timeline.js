const versionHistoryTimeline = {
  id: 'version-history-timeline',
  title: 'Version History Timeline',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="vht-card">
  <div class="vht-head">
    <div>
      <h2>Version history</h2>
      <p>Q3-roadmap.docx · 7 versions</p>
    </div>
    <span class="vht-hint" id="vhtHint">Select two versions to compare</span>
  </div>

  <div class="vht-list" id="vhtList"></div>

  <div class="vht-compare" id="vhtCompare" hidden>
    <div class="vht-compare-head">
      <strong id="vhtCompareTitle">Comparing v5 and v7</strong>
      <button type="button" id="vhtCompareClose">Clear</button>
    </div>
    <div class="vht-compare-stats" id="vhtCompareStats"></div>
    <ul class="vht-compare-changes" id="vhtCompareChanges"></ul>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vht-card{background:#121826;border:1px solid #232c3f;border-radius:18px;padding:22px;width:100%;max-width:480px;box-shadow:0 24px 60px rgba(0,0,0,.45)}
.vht-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:16px}
.vht-head h2{font-size:16.5px;font-weight:800;color:#f1f5f9}
.vht-head p{font-size:12px;color:#64748b;margin-top:3px}
.vht-hint{font-size:11px;color:#818cf8;font-weight:700;white-space:nowrap;padding-top:2px}

.vht-list{position:relative;display:flex;flex-direction:column}
.vht-item{position:relative;display:flex;gap:12px;padding:14px 4px 14px 4px}
.vht-item:not(:last-child)::before{content:'';position:absolute;left:29px;top:44px;bottom:-14px;width:2px;background:#1f2937}
.vht-check{margin-top:14px;width:15px;height:15px;accent-color:#818cf8;cursor:pointer;flex-shrink:0}
.vht-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:800;color:#fff;margin-top:8px}
.vht-body{flex:1;min-width:0;border-radius:12px;padding:8px 10px;transition:background .15s}
.vht-item:hover .vht-body{background:#0e1420}
.vht-row-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.vht-label{font-size:13px;font-weight:800;color:#e2e8f0}
.vht-label.current{color:#34d399}
.vht-time{font-size:11.5px;color:#64748b}
.vht-dot{width:3px;height:3px;border-radius:50%;background:#475569}
.vht-author{font-size:12px;color:#94a3b8}
.vht-summary{font-size:12.5px;color:#cbd5e1;margin-top:4px;line-height:1.5}
.vht-restore{margin-top:8px;font-size:11.5px;font-weight:700;color:#818cf8;background:rgba(129,140,248,.1);border:1px solid rgba(129,140,248,.25);border-radius:7px;padding:5px 10px;cursor:pointer;opacity:0;transform:translateY(-2px);transition:opacity .15s,transform .15s}
.vht-item:hover .vht-restore{opacity:1;transform:translateY(0)}
.vht-restore:hover{background:rgba(129,140,248,.18)}
.vht-restore.done{opacity:1;color:#34d399;background:rgba(52,211,153,.1);border-color:rgba(52,211,153,.3);pointer-events:none}

.vht-compare{margin-top:16px;background:#0e1420;border:1px solid #1f2937;border-radius:12px;padding:14px 16px;animation:vhtIn .2s ease}
@keyframes vhtIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.vht-compare-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.vht-compare-head strong{font-size:13px;color:#e2e8f0;font-weight:800}
.vht-compare-head button{background:none;border:none;color:#64748b;font-size:11.5px;font-weight:700;cursor:pointer}
.vht-compare-head button:hover{color:#e2e8f0}
.vht-compare-stats{display:flex;gap:14px;margin-bottom:10px}
.vht-stat{font-size:12px;font-weight:700;font-variant-numeric:tabular-nums}
.vht-stat.add{color:#34d399}
.vht-stat.rem{color:#f87171}
.vht-compare-changes{list-style:none;display:flex;flex-direction:column;gap:5px}
.vht-compare-changes li{font-size:12px;color:#94a3b8;padding-left:14px;position:relative}
.vht-compare-changes li::before{content:'•';position:absolute;left:0;color:#475569}`,

  js: `var VERSIONS = [
  { id: 7, label: 'Current', current: true, author: 'You', initials: 'YO', color: '#6366f1', time: 'Just now', summary: 'Reworked the launch timeline and added owner assignments to each phase.', added: 34, removed: 9, changes: ['Launch timeline reworked into 4 phases', 'Owners assigned to every workstream', 'Removed outdated Q2 carryover notes'] },
  { id: 6, label: 'v6', author: 'Priya Anand', initials: 'PA', color: '#ec4899', time: '2 hours ago', summary: 'Added budget estimates for the marketing workstream.', added: 18, removed: 2, changes: ['Marketing budget table added', 'Minor copy edits in overview'] },
  { id: 5, label: 'v5', author: 'Marcus Lee', initials: 'ML', color: '#10b981', time: 'Yesterday', summary: 'Restructured goals section and clarified success metrics.', added: 26, removed: 15, changes: ['Goals split into north-star and supporting metrics', 'Removed duplicate KPI table', 'Success criteria reworded for clarity'] },
  { id: 4, label: 'v4', author: 'Priya Anand', initials: 'PA', color: '#ec4899', time: '3 days ago', summary: 'Fixed formatting and added the engineering dependencies list.', added: 12, removed: 1, changes: ['Engineering dependency list added', 'Table formatting fixed'] },
  { id: 3, label: 'v3', author: 'You', initials: 'YO', color: '#6366f1', time: '5 days ago', summary: 'First full draft of the roadmap with all workstreams outlined.', added: 61, removed: 0, changes: ['Initial draft of all four workstreams', 'Timeline skeleton added'] },
  { id: 2, label: 'v2', author: 'Marcus Lee', initials: 'ML', color: '#10b981', time: '1 week ago', summary: 'Added meeting notes from the kickoff and initial scope.', added: 22, removed: 3, changes: ['Kickoff notes appended', 'Scope section drafted'] },
  { id: 1, label: 'v1', author: 'You', initials: 'YO', color: '#6366f1', time: '2 weeks ago', summary: 'Created the document from the roadmap template.', added: 8, removed: 0, changes: ['Document created from template'] },
];

var listEl = document.getElementById('vhtList');
var compareEl = document.getElementById('vhtCompare');
var hintEl = document.getElementById('vhtHint');
var selected = [];

function render() {
  listEl.innerHTML = VERSIONS.map(function (v) {
    return '<div class="vht-item">' +
      '<input type="checkbox" class="vht-check" data-id="' + v.id + '" aria-label="Select ' + v.label + ' for comparison">' +
      '<div class="vht-avatar" style="background:' + v.color + '">' + v.initials + '</div>' +
      '<div class="vht-body">' +
        '<div class="vht-row-top">' +
          '<span class="vht-label' + (v.current ? ' current' : '') + '">' + v.label + '</span>' +
          '<span class="vht-dot"></span><span class="vht-time">' + v.time + '</span>' +
          '<span class="vht-dot"></span><span class="vht-author">' + v.author + '</span>' +
        '</div>' +
        '<div class="vht-summary">' + v.summary + '</div>' +
        (v.current ? '' : '<button type="button" class="vht-restore" data-id="' + v.id + '">Restore this version</button>') +
      '</div>' +
    '</div>';
  }).join('');
}

function updateCompare() {
  if (selected.length === 2) {
    var ids = selected.slice().sort(function (a, b) { return b - a; });
    var vNew = VERSIONS.find(function (v) { return v.id === ids[0]; });
    var vOld = VERSIONS.find(function (v) { return v.id === ids[1]; });
    document.getElementById('vhtCompareTitle').textContent = 'Comparing ' + vOld.label + ' and ' + vNew.label;
    document.getElementById('vhtCompareStats').innerHTML =
      '<span class="vht-stat add">+' + vNew.added + ' lines</span><span class="vht-stat rem">-' + vNew.removed + ' lines</span>';
    document.getElementById('vhtCompareChanges').innerHTML = vNew.changes.map(function (c) { return '<li>' + c + '</li>'; }).join('');
    compareEl.hidden = false;
    hintEl.textContent = 'Comparing 2 versions';
  } else {
    compareEl.hidden = true;
    hintEl.textContent = selected.length === 1 ? 'Select one more version' : 'Select two versions to compare';
  }
}

listEl.addEventListener('change', function (e) {
  if (!e.target.classList.contains('vht-check')) return;
  var id = parseInt(e.target.dataset.id, 10);
  if (e.target.checked) {
    if (selected.length >= 2) {
      var firstId = selected.shift();
      var firstBox = listEl.querySelector('.vht-check[data-id="' + firstId + '"]');
      if (firstBox) firstBox.checked = false;
    }
    selected.push(id);
  } else {
    selected = selected.filter(function (s) { return s !== id; });
  }
  updateCompare();
});

listEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.vht-restore');
  if (!btn) return;
  btn.textContent = 'Restored';
  btn.classList.add('done');
});

document.getElementById('vhtCompareClose').addEventListener('click', function () {
  selected = [];
  listEl.querySelectorAll('.vht-check').forEach(function (c) { c.checked = false; });
  updateCompare();
});

render();`,

  seo: {
    title: 'Version History Timeline — Free HTML CSS JS Snippet',
    description: `A document version history with author avatars, relative timestamps, hover-to-restore actions, and a two-version diff comparison. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Version History Timeline — Restore Points, Authors & Version Comparison',
      description: `Any collaborative document tool — a docs editor, a design file, a CMS entry — needs a way to show how a file evolved and let people jump back to an earlier state. The version history timeline lists every save as a point in time with who made it and what changed, and lets you restore or compare across points. This snippet builds a complete version history in plain HTML, CSS, and vanilla JavaScript, with no dependencies.

**A timeline built from one data array**

Every version in \`VERSIONS\` carries an id, a label, an author with initials and a color, a relative timestamp, a one-line summary, and diff stats. \`render()\` maps that array into the list, so adding a real version — from your document's revision API — is a data change, not a markup change. The connecting line between avatars is drawn with a CSS \`::before\` pseudo-element rather than an SVG, keeping the timeline lightweight and easy to restyle.

**Restore actions that stay out of the way**

Each past version gets a "Restore this version" button that's invisible until you hover the row, then fades and slides in. This keeps the list scannable at rest — nobody needs to see seven restore buttons at once — while making the action obvious and reachable the moment you're actually looking at that version. Clicking it flips the button to a confirmed "Restored" state, the same pattern you'd wire to a real restore-version API call.

**Comparing two versions**

Each row also has a compare checkbox. Checking exactly two reveals a diff summary panel showing the added/removed line counts and a bulleted list of what changed between them, ordered newest-first regardless of click order. Checking a third automatically drops the oldest selection, so you're never stuck needing to manually uncheck something to compare a different pair — similar in spirit to how [comment thread](/ui-snippets/comment-thread/) sorting reorders without losing state.

**Author identity at a glance**

Each version shows a colored initials avatar for its author, echoing the visual language of [avatar stack](/ui-snippets/avatar-stack/) and [team presence list](/ui-snippets/team-presence-list/) — consistent author coloring across a document's history makes it easy to spot "which versions did I make" versus a collaborator's at a glance, without reading every name.

**Wiring it to a real backend**

Swap the \`VERSIONS\` array for your document API's revision list, keeping the same shape (id, author, time, summary, added/removed counts, and a changes array or generated diff). The restore button's click handler is where you'd call your actual restore-version endpoint; the compare panel is where you'd render a real line-level diff if your backend produces one.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A version timeline renders with the current version at the top and six prior versions below it.` },
      { title: 'Hover a past version', text: `A "Restore this version" button fades in over that row's summary.` },
      { title: 'Click restore', text: `The button switches to a confirmed green "Restored" state.` },
      { title: 'Check two compare boxes', text: `A diff panel appears showing added/removed line counts and what changed.` },
      { title: 'Check a third box', text: `The oldest selection is dropped automatically so the pair stays at two.` },
      { title: 'Connect real data', text: `Replace VERSIONS with your document API's revision list in the same shape.` },
    ] },
    features: [
      { title: 'Data-driven timeline', text: `One VERSIONS array renders every row — add a real version by adding an object.` },
      { title: 'CSS connector line', text: `A ::before pseudo-element draws the timeline spine, no SVG needed.` },
      { title: 'Hover-reveal restore', text: `Restore actions fade in on hover so the list stays uncluttered at rest.` },
      { title: 'Confirmed restore state', text: `Clicking restore flips the button to a clear "Restored" confirmation.` },
      { title: 'Two-version compare', text: `Checking two rows reveals a diff summary with line stats and changes.` },
      { title: 'Auto-managed selection', text: `A third check drops the oldest so the compare pair never exceeds two.` },
      { title: 'Newest-first diff order', text: `The compare panel always shows newer vs older regardless of click order.` },
      { title: 'Colored author avatars', text: `Consistent per-author initials and color make history scannable at a glance.` },
    ],
    useCases: [
      { title: 'Document editors', text: `Show save history in a docs or wiki tool, alongside [comment thread](/ui-snippets/comment-thread/) discussions.` },
      { title: 'Design file history', text: `Let designers restore or compare canvas versions in a Figma-like tool.` },
      { title: 'CMS content revisions', text: `Track edits to a page or post with author attribution and restore points.` },
      { title: 'Code review context', text: `Summarize commit-like history for a non-technical audience reviewing changes.` },
      { title: 'Collaborative presence', text: `Pair with a [shared document presence bar](/ui-snippets/shared-doc-presence-bar/) to show who's active now versus who edited before.` },
      { title: 'Approval workflows', text: `Combine with a [task approval flow card](/ui-snippets/task-approval-flow-card/) to review a version before approving it.` },
    ],
    faqs: [
      { q: 'How does comparing exactly two versions work?', a: `Each checkbox click adds or removes that version's id from a selected array. When selected has two entries, updateCompare() sorts them newest-first and pulls their diff stats and changes from the VERSIONS array to render the panel. Anything other than exactly two selections hides the panel and updates the hint text to tell you how many more to pick.` },
      { q: 'What happens if I check a third version?', a: `The oldest of the two currently selected ids is removed — its checkbox is unchecked programmatically and dropped from the selected array — before the new one is added. This keeps the comparison always showing your two most recent picks without requiring you to manually deselect anything first.` },
      { q: 'How do I make restore actually work?', a: `Give each version a real revision id from your backend, and in the click handler for .vht-restore, call your document API's restore-version endpoint with that id instead of just toggling the button's text and class. On success, keep the "Restored" confirmation state and optionally refresh the version list so the restored version's copy becomes the new "Current" entry.` },
      { q: 'Where would a real line-level diff come from?', a: `This snippet shows a diff summary (line counts and a change list) rather than a full inline diff, since most document APIs return structured change summaries rather than raw text diffs. If your backend does return line-level diffs, render them inside .vht-compare-changes using a diff-rendering approach appropriate to your content type (text diff, rich-text operational transform log, or a JSON patch).` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Model VERSIONS as state or a prop, track selected version ids in component state, and derive the compare panel's visibility and content from that selection with a computed value or useMemo. The restore and compare logic are plain functions of the array and selection, so they port directly — only the DOM string-building in render() needs to become JSX or template syntax.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the selection-management logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the selected array caps itself at two entries by dropping the oldest checkbox when a third is checked, and why the compare panel always sorts the pair newest-first regardless of click order. The same assistant can help you optimize it — ask whether re-rendering the full list on every restore click is necessary or whether a targeted class swap on just the clicked button is enough. It's also useful for extending the timeline: ask it to add pagination for documents with dozens of versions, a real line-level diff renderer, or a confirmation dialog before restore actually overwrites the current version. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a document "version history timeline" in plain HTML, CSS, and JavaScript — no frameworks, no libraries.

Requirements:
- Render a vertical list of version entries from a single data array, each with an id, author name and initials, a relative timestamp, a one-line change summary, and added/removed line counts, with the current version visually distinguished at the top and a connecting timeline line drawn between entries using a CSS pseudo-element (not an SVG or image).
- Each past (non-current) version must show a "Restore this version" button that is invisible at rest and fades/slides into view only when that specific row is hovered, so the list stays visually calm when not being interacted with; clicking it should flip the button into a distinct confirmed "Restored" state.
- Give every version a compare checkbox. When exactly two are checked, show a diff summary panel with the added/removed line counts and a bulleted list of what changed, always ordered so the newer of the two selected versions is treated as the "after" state regardless of the order the boxes were checked in.
- If a third checkbox is checked while two are already selected, automatically uncheck and drop the oldest of the two current selections so the comparison always reflects your two most recent picks, without requiring the user to manually deselect anything.
- Show a small hint text that updates based on selection state: prompting to select two versions, prompting to select one more, or confirming two are being compared.
- Give each author a consistent colored initials avatar so a reader can visually tell at a glance which versions came from which person.`,
    },
  },
};

export default versionHistoryTimeline;
