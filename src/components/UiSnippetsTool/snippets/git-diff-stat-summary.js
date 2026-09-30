const gitDiffStatSummary = {
  id: 'git-diff-stat-summary',
  title: 'Git Diff Stat Summary',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="gds-panel">
  <div class="gds-head">
    <h3>3 files changed</h3>
    <span class="gds-total"><b class="gds-add">+142</b> <b class="gds-del">&minus;38</b></span>
  </div>

  <ul class="gds-files" id="gdsFiles">
    <li class="gds-file" data-file="0">
      <button type="button" class="gds-file-toggle" aria-expanded="false">
        <span class="gds-chevron">&rsaquo;</span>
        <span class="gds-fname">src/components/Checkout.tsx</span>
        <span class="gds-fstat">+86 &minus;12</span>
        <span class="gds-diffbar" aria-hidden="true">
          <span class="gds-diffbar-add" style="width:74%"></span><span class="gds-diffbar-del" style="width:26%"></span>
        </span>
      </button>
      <div class="gds-diff" hidden>
        <pre><code><span class="gds-line ctx">  const [step, setStep] = useState(0);</span>
<span class="gds-line del">-  const total = items.reduce((s, i) =&gt; s + i.price, 0);</span>
<span class="gds-line add">+  const subtotal = items.reduce((s, i) =&gt; s + i.price, 0);</span>
<span class="gds-line add">+  const total = subtotal + shipping - discount;</span>
<span class="gds-line ctx">  return (</span>
<span class="gds-line add">+    &lt;OrderSummary subtotal={subtotal} total={total} /&gt;</span>
<span class="gds-line ctx">  );</span></code></pre>
      </div>
    </li>

    <li class="gds-file" data-file="1">
      <button type="button" class="gds-file-toggle" aria-expanded="false">
        <span class="gds-chevron">&rsaquo;</span>
        <span class="gds-fname">src/utils/pricing.ts</span>
        <span class="gds-fstat">+41 &minus;9</span>
        <span class="gds-diffbar" aria-hidden="true">
          <span class="gds-diffbar-add" style="width:82%"></span><span class="gds-diffbar-del" style="width:18%"></span>
        </span>
      </button>
      <div class="gds-diff" hidden>
        <pre><code><span class="gds-line ctx">  export function formatPrice(cents) {</span>
<span class="gds-line del">-    return '$' + (cents / 100).toFixed(2);</span>
<span class="gds-line add">+    return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });</span>
<span class="gds-line ctx">  }</span></code></pre>
      </div>
    </li>

    <li class="gds-file" data-file="2">
      <button type="button" class="gds-file-toggle" aria-expanded="false">
        <span class="gds-chevron">&rsaquo;</span>
        <span class="gds-fname">tests/checkout.spec.ts</span>
        <span class="gds-fstat">+15 &minus;17</span>
        <span class="gds-diffbar" aria-hidden="true">
          <span class="gds-diffbar-add" style="width:47%"></span><span class="gds-diffbar-del" style="width:53%"></span>
        </span>
      </button>
      <div class="gds-diff" hidden>
        <pre><code><span class="gds-line ctx">  it('computes the order total', () =&gt; {</span>
<span class="gds-line del">-    expect(total(items)).toBe(84.50);</span>
<span class="gds-line add">+    expect(total(items, shipping, discount)).toBe(84.50);</span>
<span class="gds-line ctx">  });</span></code></pre>
      </div>
    </li>
  </ul>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}

.gds-panel{width:100%;max-width:560px;background:#151b23;border:1px solid #262e3a;border-radius:14px;padding:18px;box-shadow:0 24px 60px rgba(0,0,0,.4)}

.gds-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #232b38}
.gds-head h3{font-size:14.5px;font-weight:800;color:#e7ebf3}
.gds-total{font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:13px}
.gds-add{color:#4ade80}
.gds-del{color:#f87171}

.gds-files{list-style:none;display:flex;flex-direction:column;gap:4px}
.gds-file-toggle{width:100%;display:grid;grid-template-columns:16px 1fr auto 90px;align-items:center;gap:10px;background:transparent;border:none;border-radius:8px;padding:9px 8px;cursor:pointer;font-family:inherit;text-align:left}
.gds-file-toggle:hover{background:#1a2129}
.gds-chevron{color:#5b6577;font-size:14px;transition:transform .15s;justify-self:center}
.gds-file-toggle[aria-expanded="true"] .gds-chevron{transform:rotate(90deg)}
.gds-fname{font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:12.5px;color:#c3cadb;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gds-fstat{font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:11.5px;color:#7c869c;white-space:nowrap}
.gds-diffbar{display:flex;height:8px;border-radius:3px;overflow:hidden;background:#1e2530}
.gds-diffbar-add{background:#4ade80}
.gds-diffbar-del{background:#f87171}

.gds-diff{padding:2px 8px 10px 34px}
.gds-diff pre{margin:0;background:#0e1218;border:1px solid #202836;border-radius:8px;padding:10px 0;overflow-x:auto}
.gds-diff code{font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:12px;line-height:1.7}
.gds-line{display:block;padding:0 12px;white-space:pre}
.gds-line.add{background:rgba(74,222,128,.09);color:#a5d6a7}
.gds-line.del{background:rgba(248,113,113,.09);color:#f4a3a3}
.gds-line.ctx{color:#7c869c}`,

  js: `var toggles = Array.prototype.slice.call(document.querySelectorAll('.gds-file-toggle'));

toggles.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var li = btn.closest('.gds-file');
    var diff = li.querySelector('.gds-diff');
    var isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Accordion behavior: close any other open diff before opening this one.
    toggles.forEach(function (other) {
      if (other === btn) return;
      other.setAttribute('aria-expanded', 'false');
      other.closest('.gds-file').querySelector('.gds-diff').setAttribute('hidden', '');
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    if (isOpen) {
      diff.setAttribute('hidden', '');
    } else {
      diff.removeAttribute('hidden');
    }
  });
});`,

  seo: {
    title: 'Git Diff Stat Summary — Free GitHub-Style Diffstat UI',
    description: `A compact git diff summary with per-file add/delete bar chips, a total change count, and an expandable line-level diff preview. Pure HTML, CSS & JS.`,
    about: {
      title: 'Git Diff Stat Summary — Diffstat Bars With an Expandable Line-Level Preview',
      description: `GitHub's pull request file list — a colored bar chip showing each file's insertion/deletion ratio next to its name — communicates change size at a glance without opening a single file. This snippet rebuilds that diffstat pattern, plus a click-to-expand line-level preview, entirely in vanilla HTML/CSS/JS. It pairs naturally with a [code diff viewer](/ui-snippets/code-diff-viewer/) or [code comparison](/ui-snippets/code-comparison/) widget in a PR review dashboard.

**The diffstat bar is two flex children, not a chart**

Each file's bar is a flex container with two children — \`.gds-diffbar-add\` and \`.gds-diffbar-del\` — each given an inline \`width\` percentage representing that file's share of insertions versus deletions. No canvas, no SVG: two colored \`<span>\`s inside a \`display: flex\` container naturally lay out side by side proportional to their widths, which is the entire visual technique behind GitHub's diffstat.

**Totals are a separate, deliberately unlinked number**

The header's \`+142 −38\` total is written directly in the markup rather than summed from the per-file stats in JS. In a real implementation you'd compute it server-side from the actual diff and inject both the total and the per-file numbers from the same source — the point of keeping them as plain text here is that this snippet's job is the *display* pattern, not diff computation.

**One accordion, not independent toggles**

Clicking a file's row expands its line-level diff preview and collapses any other currently-open file — the click handler loops through every toggle button, closing all others, before opening (or closing) the one that was clicked. This keeps the panel compact even with many changed files, rather than letting every diff expand independently and pushing the total height very tall.

**Colored diff lines follow git's own convention**

Inside the expanded preview, each line carries a \`.ctx\`, \`.add\`, or \`.del\` class — context lines stay neutral, added lines get a green tint with a \`+\` prefix, removed lines get a red tint with a \`-\` prefix — the same visual language as \`git diff\` in a terminal or GitHub's own file view, so it reads as instantly familiar to anyone who has looked at a diff before.

**Wiring it to real diff data**

Replace the hardcoded file list and diff lines with output from your git provider's API (GitHub's compare API, GitLab's diff API, or a local \`git diff --numstat\` and \`git diff\` parse) — compute each file's add/delete percentage for the bar width, and split the unified diff into context/add/del lines by their leading \`+\`/\`-\`/space character.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-file diff summary renders with colored insertion/deletion bars.` },
      { title: 'Click a file row', text: `Its line-level diff preview expands below it, with added/removed lines colored and prefixed.` },
      { title: 'Click another file', text: `The previous diff collapses automatically — only one stays open at a time.` },
      { title: 'Feed in real data', text: `Replace the file list and diff lines with parsed output from git diff --numstat and git diff.` },
      { title: 'Compute bar widths', text: `Set each file's add/delete bar width as its share of that file's total changed lines.` },
      { title: 'Sum the header total', text: `Compute +142 −38 from the sum of every file's insertions and deletions.` },
    ] },
    features: [
      { title: 'Flexbox diffstat bars', text: `Two colored spans with inline widths recreate GitHub's diffstat, no chart library.` },
      { title: 'Single-open accordion', text: `Expanding one file's diff automatically collapses any other open one.` },
      { title: 'Git-convention line coloring', text: `Context, added, and removed lines follow the same visual language as git diff.` },
      { title: 'Accessible expand state', text: `aria-expanded and the hidden attribute stay in sync on every toggle.` },
      { title: 'Rotating chevron', text: `A small icon rotation mirrors each row's expanded/collapsed state.` },
      { title: 'Monospaced diff text', text: `File names, stats, and diff lines all use a consistent code font.` },
      { title: 'Compact by default', text: `All diffs start collapsed so a many-file change stays scannable.` },
      { title: 'Zero dependencies', text: `No diff library, no chart library — every visual is plain CSS.` },
    ],
    useCases: [
      { title: 'Pull request review UIs', text: `Summarize a PR's changed files, paired with a [code diff viewer](/ui-snippets/code-diff-viewer/) for full-file review.` },
      { title: 'CI/CD change summaries', text: `Show what a deploy or build touched before it ships.` },
      { title: 'Code review dashboards', text: `Give reviewers a scannable overview alongside a [code comparison](/ui-snippets/code-comparison/) tool.` },
      { title: 'Commit history browsers', text: `Show diffstat for each commit in a repository timeline.` },
      { title: 'Internal audit tooling', text: `Track and review infrastructure-as-code changes before applying them.` },
      { title: 'Learning diffstat visualization', text: `A minimal reference for building GitHub-style change bars without a library.` },
      { icon: 'CODE', title: 'Related: Trip Itinerary Day Timeline', desc: 'See the [Trip Itinerary Day Timeline](/ui-snippets/itinerary-day-timeline/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the diffstat bar drawn without a charting library?', a: `Each bar is a flex container with two child spans — one for insertions, one for deletions — each given an inline-style width percentage representing that file's insertion/deletion ratio. Because they sit inside a display: flex container, the two colored segments naturally lay out side by side proportional to their widths, with no canvas, SVG, or chart dependency involved.` },
      { q: "Why does opening one file's diff close the others?", a: `The click handler loops through every toggle button and forces aria-expanded to false (and hides the diff) on every file except the one just clicked, before toggling that one. This single-open accordion pattern keeps the panel's total height manageable even when many files changed, rather than letting every expanded diff stack up.` },
      { q: 'How do I compute the per-file bar widths from a real diff?', a: `Run git diff --numstat to get each file's insertion and deletion counts, then compute addPercent = insertions / (insertions + deletions) * 100 and delPercent = 100 - addPercent for that file's bar. Set those as the inline width styles on the two bar segments. The header total is simply the sum of insertions and deletions across all files.` },
      { q: 'How do I turn a real unified diff into the colored line preview?', a: `Split the diff text by newline. Any line starting with + (but not +++) is an added line, any line starting with - (but not ---) is a removed line, and any other line is context — apply the matching .add, .del, or .ctx class to each line's element. Strip or keep the leading +/- character depending on whether you want it shown as part of the line text.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Hold an openFileIndex (or null) in component state instead of toggling DOM attributes directly. Render each file's bar widths and diff lines from your parsed diff data, and derive each toggle's aria-expanded and each diff panel's visibility from whether its index matches openFileIndex — clicking a file sets openFileIndex to its own index (or null if already open).` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the diffstat visualization or the accordion logic on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how two flex children with inline-percentage widths recreate GitHub's diffstat bar without any chart library, and why the accordion closes every other file's diff before opening the clicked one rather than letting each file toggle independently. The same assistant can help optimize it — asking whether looping through all toggle buttons on every click is efficient enough for a PR with hundreds of changed files, or how you'd virtualize the file list if it grew very long. It's also useful for extending the panel: ask it to wire real diff data from git diff --numstat and a unified diff parse, add a "collapse all / expand all" control, or add a file-type icon and syntax highlighting inside the expanded diff lines. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "git diff stat summary" panel in plain HTML, CSS, and JavaScript with no library or CDN dependency.

Requirements:
- A header showing the total number of files changed and a total insertions/deletions count (e.g. +142 -38) in git's conventional green/red coloring.
- A list of changed files, each row showing the filename, a per-file +N -N stat, and a "diffstat" bar built from two adjacent flex/inline-block colored segments (green for insertions, red for deletions) whose widths are set as inline-style percentages representing that file's insertion-to-deletion ratio — no canvas, SVG, or charting library.
- Each file row must be a clickable toggle (a real button, with aria-expanded kept in sync) that expands a line-level diff preview below it, showing individual lines styled as context (neutral), added (green background, + prefix), or removed (red background, - prefix), matching git's own diff coloring convention. Expanded panels must use the HTML hidden attribute, not just CSS display, when collapsed.
- Implement single-open accordion behavior: expanding one file's diff preview must automatically collapse any other file's diff preview that was previously open, so at most one file's line-level diff is visible at a time.
- Include a small chevron icon on each row that visually rotates to reflect that row's expanded/collapsed state, and use a consistent monospaced font for filenames, stats, and diff line text throughout.`,
    },
  },
};

export default gitDiffStatSummary;
