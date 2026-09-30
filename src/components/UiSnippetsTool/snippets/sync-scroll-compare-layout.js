const syncScrollCompareLayout = {
  id: 'sync-scroll-compare-layout',
  title: 'Sync-Scroll Comparison Layout',
  lastmod: '2026-08-30',
  category: 'layouts',
  html: `<div class="sc-page">
  <div class="sc-toolbar">
    <div class="sc-titles">
      <span class="sc-dot v1"></span> Draft v1 <span class="sc-vs">vs</span> <span class="sc-dot v2"></span> Draft v2
    </div>
    <label class="sc-sync-toggle">
      <input type="checkbox" id="scSyncBox" checked>
      <span class="sc-track"><span class="sc-thumb"></span></span>
      Sync scroll
    </label>
  </div>

  <div class="sc-panes">
    <div class="sc-pane" id="scPaneA">
      <h3>Draft v1</h3>
      <p>Section 1. Our refund policy allows customers to request a full refund within 14 days of purchase, no questions asked, provided the request is submitted through the support portal.</p>
      <p>Section 2. Subscriptions renew automatically each billing cycle unless cancelled at least 24 hours before the renewal date. Cancelling mid-cycle does not issue a prorated refund.</p>
      <p>Section 3. Enterprise customers may request a custom contract with negotiated payment terms, a dedicated account manager, and a service level agreement covering uptime and support response times.</p>
      <p>Section 4. Data exported from the platform is provided in CSV or JSON format. Export requests are processed within 48 hours and a download link is emailed once ready.</p>
      <p>Section 5. Accounts inactive for more than 12 months may be archived. Archived accounts can be restored within 90 days by contacting support before permanent deletion occurs.</p>
      <p>Section 6. API rate limits are set per plan tier: 100 requests per minute on the free tier, 1,000 on Pro, and custom limits negotiated for Enterprise accounts.</p>
      <p>Section 7. All payments are processed securely through our payment partner. We never store raw card numbers on our own servers at any point in the transaction flow.</p>
    </div>
    <div class="sc-pane" id="scPaneB">
      <h3>Draft v2</h3>
      <p>Section 1. Our refund policy allows customers to request a full refund within 30 days of purchase, no questions asked, provided the request is submitted through the support portal or by email.</p>
      <p>Section 2. Subscriptions renew automatically each billing cycle unless cancelled at least 48 hours before the renewal date. Cancelling mid-cycle issues a prorated refund for unused days.</p>
      <p>Section 3. Enterprise customers may request a custom contract with negotiated payment terms, a dedicated account manager, a named support engineer, and a service level agreement covering uptime and support response times.</p>
      <p>Section 4. Data exported from the platform is provided in CSV, JSON, or Parquet format. Export requests are processed within 24 hours and a download link is emailed once ready.</p>
      <p>Section 5. Accounts inactive for more than 18 months may be archived. Archived accounts can be restored within 120 days by contacting support before permanent deletion occurs.</p>
      <p>Section 6. API rate limits are set per plan tier: 200 requests per minute on the free tier, 2,000 on Pro, and custom limits negotiated for Enterprise accounts.</p>
      <p>Section 7. All payments are processed securely through our payment partner. We never store raw card numbers on our own servers at any point in the transaction flow. Tokenized cards are retained for one-click checkout only with explicit consent.</p>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px 16px; }

.sc-page { max-width: 920px; margin: 0 auto; }

.sc-toolbar {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px 12px 0 0;
  padding: 12px 18px;
}
.sc-titles { font-size: 13.5px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
.sc-vs { font-weight: 500; color: #94a3b8; font-size: 12px; }
.sc-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
.sc-dot.v1 { background: #6366f1; }
.sc-dot.v2 { background: #f97316; }

.sc-sync-toggle { display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600; color: #475569; cursor: pointer; }
.sc-sync-toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
.sc-track { width: 34px; height: 19px; background: #cbd5e1; border-radius: 999px; position: relative; transition: background .15s; flex-shrink: 0; }
.sc-thumb { position: absolute; top: 2px; left: 2px; width: 15px; height: 15px; border-radius: 50%; background: #fff; transition: transform .15s; box-shadow: 0 1px 3px rgba(0,0,0,.25); }
.sc-sync-toggle input:checked + .sc-track { background: #4f46e5; }
.sc-sync-toggle input:checked + .sc-track .sc-thumb { transform: translateX(15px); }

.sc-panes {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;
  overflow: hidden; background: #fff;
}
.sc-pane {
  height: 380px; overflow-y: auto; padding: 20px 22px; scroll-behavior: auto;
}
.sc-pane:first-child { border-right: 1px solid #e2e8f0; }
.sc-pane h3 { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 14px; position: sticky; top: 0; background: #fff; padding-bottom: 6px; }
.sc-pane p { font-size: 13px; color: #475569; line-height: 1.7; margin-bottom: 16px; }

.sc-pane.flash { animation: scFlash .4s ease; }
@keyframes scFlash { 0% { background: #eef2ff; } 100% { background: #fff; } }

@media (max-width: 640px) {
  .sc-panes { grid-template-columns: 1fr; }
  .sc-pane:first-child { border-right: none; border-bottom: 1px solid #e2e8f0; }
}`,
  js: `var syncBox = document.getElementById('scSyncBox');
var paneA = document.getElementById('scPaneA');
var paneB = document.getElementById('scPaneB');

var guardA = false;
var guardB = false;

function fraction(pane) {
  var max = pane.scrollHeight - pane.clientHeight;
  return max <= 0 ? 0 : pane.scrollTop / max;
}

function applyFraction(pane, f) {
  var max = pane.scrollHeight - pane.clientHeight;
  pane.scrollTop = f * max;
}

paneA.addEventListener('scroll', function () {
  if (guardA) { guardA = false; return; }
  if (!syncBox.checked) return;
  guardB = true;
  applyFraction(paneB, fraction(paneA));
});

paneB.addEventListener('scroll', function () {
  if (guardB) { guardB = false; return; }
  if (!syncBox.checked) return;
  guardA = true;
  applyFraction(paneA, fraction(paneB));
});

syncBox.addEventListener('change', function () {
  if (!syncBox.checked) return;
  // Re-align B to A's current position the moment sync is turned back on.
  guardB = true;
  applyFraction(paneB, fraction(paneA));
  paneA.classList.add('flash');
  paneB.classList.add('flash');
  setTimeout(function () {
    paneA.classList.remove('flash');
    paneB.classList.remove('flash');
  }, 400);
});`,
  seo: {
    title: 'Sync-Scroll Comparison Layout — Side-by-Side Panes JS',
    description: 'A two-pane comparison layout with independently scrolling documents that can be mirrored together via a scroll-position sync toggle, built in vanilla JS. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Sync-Scroll Comparison Layout — Mirroring Scroll Position Between Two Independent Panes',
      description: `Comparing two versions of a long document side by side only works if the reader can keep both halves roughly aligned while scrolling — otherwise "compare draft v1 to draft v2" quickly turns into hunting for the matching paragraph after every scroll. This layout puts two independently scrollable panes next to each other and adds a **sync scroll** toggle that mirrors scroll position between them proportionally, so scrolling either pane moves the other by the same relative amount even when the two documents are different lengths.

**Two panes, two independent scroll containers**

Each \`.sc-pane\` is its own fixed-height, \`overflow-y: auto\` box — not a single tall page that happens to be split visually. This is the same primitive behind a code editor with a diff view or an email client's list-and-reading-pane: giving each column its own scrollable region means either side can be scrolled on its own with no effect on the other, which is exactly the behavior needed when sync is switched off and a reader wants to read one document at its own pace.

**Mirroring by fraction, not by pixel**

The naive approach — copying \`scrollTop\` directly from one pane to the other — breaks the moment the two documents have different total heights, since a pixel offset near the bottom of a short document might land in the middle of a long one. Instead, \`fraction(pane)\` computes \`scrollTop / (scrollHeight - clientHeight)\`, a value between 0 and 1 representing *how far through* that pane's own scrollable range the reader currently is. \`applyFraction(pane, f)\` does the inverse — multiplying that same fraction by the target pane's own scrollable range. Two documents of wildly different lengths still track together sensibly: reaching 60% of the way down v1 moves v2 to 60% of the way down v2, not to the same absolute pixel position.

**Breaking the infinite scroll-event loop**

Setting a pane's \`scrollTop\` from code fires its own \`scroll\` event, which — without a guard — would immediately try to mirror back to the pane that triggered the change, which fires again, forever. Each pane has a boolean guard flag (\`guardA\`, \`guardB\`) that is set to \`true\` immediately before a programmatic scroll and consumed (reset to \`false\` without acting) the next time that pane's own \`scroll\` handler runs. This is the standard pattern for any two-way-bound scroll, drag, or form-field mirroring: one flag per direction, set right before the write, consumed on the very next event from that same element.

**Re-syncing on demand**

Turning sync back on after scrolling the panes apart independently does not leave them silently misaligned — the change handler immediately re-applies pane A's current fraction onto pane B and briefly flashes both panes so the jump is visually obvious rather than surprising. This small feedback detail matters: a sync toggle that silently teleports content out from under a reader's eyes feels broken even when the underlying math is correct.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll either pane with sync on', text: 'With the toggle enabled (default), scrolling one document moves the other by the same proportional amount, keeping both roughly aligned even though the texts differ.' },
        { title: 'Turn sync off to read independently', text: 'Uncheck "Sync scroll" to scroll either pane freely without affecting the other — useful once you have found the section you actually want to focus on.' },
        { title: 'Re-enable sync to snap back', text: 'Checking the box again immediately re-aligns the right pane to the left pane\'s current scroll fraction, with a brief highlight flash on both.' },
        { title: 'Swap in your own two documents', text: 'Replace the paragraphs inside #scPaneA and #scPaneB — the fraction-based mirroring works for any content length, they do not need to match.' },
        { title: 'Adjust the pane height', text: 'Change the 380px height on .sc-pane to fit more or less content in view at once.' },
        { title: 'Extend to more than two panes', text: 'Add a third pane and mirror its scroll fraction from either existing handler, following the same guard-flag pattern to avoid feedback loops.' },
      ],
    },
    features: [
      'Two independently scrollable panes, each its own fixed-height overflow-y: auto container',
      'Scroll position mirrored by proportional fraction, not raw pixel offset — works with mismatched content lengths',
      'Guard-flag pattern on both panes prevents an infinite scroll-event feedback loop',
      'Sync toggle can be switched off mid-read to scroll either pane independently',
      'Re-enabling sync immediately re-aligns and briefly flashes both panes for clear visual feedback',
      'Sticky pane headings stay visible at the top of each column while scrolling',
      'No external diff or comparison library — plain scroll event math in vanilla JavaScript',
      'Responsive: panes stack vertically on narrow viewports instead of squeezing side by side',
    ],
    useCases: [
      { icon: 'DOC', title: 'Document and policy draft comparison', desc: 'Compare two versions of a contract, terms of service, or spec document while keeping corresponding sections roughly in view together.' },
      { icon: 'CODE', title: 'Translation and localization review', desc: 'Show a source-language document next to its translation, scrolled in sync, so a reviewer can check corresponding paragraphs without manually re-finding position after every scroll.' },
      { icon: 'DATA', title: 'Before/after content or copy review', desc: 'Marketing or legal teams comparing an old page copy to a proposed rewrite benefit from the same proportional alignment this layout provides.' },
      { icon: 'LEARN', title: 'Teaching scroll-event feedback loops', desc: 'A concrete, minimal example of the guard-flag pattern needed any time two elements mirror each other\'s state via events that could otherwise loop forever.' },
      { icon: 'APP', title: 'Two-column reading and annotation tools', desc: 'Pair with the [Sticky Split-Pane Documentation Layout](/ui-snippets/sticky-split-pane-layout/) for a related two-pane pattern with a different pinning behavior.' },
    ],
    faqs: [
      { q: 'Why mirror scroll by fraction instead of by pixel offset?', a: 'A raw pixel offset assumes both panes have identical scrollable heights. If the two documents differ in length — which is the normal case when comparing two drafts — a fixed pixel offset would land at different relative positions in each. Computing scrollTop / (scrollHeight - clientHeight) gives a 0-to-1 fraction representing how far through its own range each pane is, which keeps the two aligned proportionally regardless of length differences.' },
      { q: 'How does the layout avoid an infinite loop when one pane\'s scroll triggers the other?', a: 'Setting scrollTop from JavaScript fires a native scroll event on that element, which would otherwise immediately trigger the mirroring logic back toward the pane that started the change. Each pane has its own guard boolean that is set right before a programmatic scroll write and checked (then cleared) at the very start of that pane\'s own scroll handler — if the guard is set, the handler returns immediately instead of mirroring again.' },
      { q: 'What happens if I turn sync off and scroll the panes apart, then turn it back on?', a: 'The change handler on the sync checkbox immediately reads pane A\'s current scroll fraction and applies it to pane B, snapping them back into proportional alignment, and both panes briefly flash to make the jump visually clear rather than a silent, disorienting teleport.' },
      { q: 'Can this layout compare more than two panes at once?', a: 'Yes — add additional panes and additional scroll listeners following the same fraction-and-guard-flag pattern, mirroring each pane\'s scroll fraction to every other pane. With more than two panes it is worth designating one as the "source of truth" during a sync event to avoid redundant writes.' },
      { q: 'Does this depend on a diffing or comparison library?', a: 'No — this snippet is purely the layout and scroll-synchronization mechanism, with no text-diff highlighting included. Pair it with a diff library or the [Text Diff Checker](/ui-snippets/text-diff-checker/) if you also want word-level or line-level highlighting of what changed between the two documents.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep a ref to each scroll container, attach the same scroll listeners in an effect/mount hook, and store the guard flags in refs (not state) so setting them does not trigger unnecessary re-renders — the underlying fraction math is identical to the vanilla version.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the guard-flag pattern is necessary to stop the two scroll listeners from triggering each other in an infinite loop, and why mirroring by proportional fraction is more robust than copying a raw pixel scrollTop between panes of different lengths. It is also a good candidate for extension — ask it to add word-level diff highlighting so corresponding changed text is colored in both panes, support three or more synced panes at once, or debounce the mirroring with requestAnimationFrame so extremely fast scroll-wheel input on a low-powered device does not stutter.`,
      prompt: `Build a two-pane side-by-side comparison layout in plain HTML, CSS, and JavaScript with a scroll-synchronization toggle — no libraries.

Requirements:
- Two independently scrollable panes placed side by side, each a fixed-height container with its own overflow-y: auto, containing a long block of paragraph text (the two panes should contain text of noticeably different total lengths to prove the sync logic handles mismatched content).
- A toggle switch labeled "Sync scroll" that is on by default.
- While sync is on, scrolling either pane must move the other pane's scroll position by the same proportional fraction of its own scrollable range (scrollTop divided by scrollHeight minus clientHeight) — not the same raw pixel offset — so that panes of different lengths still track together sensibly (e.g. reaching 50% down one moves the other to 50% down as well).
- The scroll mirroring logic must not create an infinite loop: programmatically setting one pane's scroll position fires that pane's own scroll event, which must not re-trigger mirroring back to the pane that originally caused the change. Implement this with a guard flag per pane.
- While sync is off, each pane must scroll completely independently with no effect on the other.
- Re-enabling the sync toggle after scrolling the panes apart must immediately re-align the second pane to the first pane's current scroll fraction, with a brief visual flash on both panes to make the realignment obvious.
- Make the layout responsive: on narrow viewports the two panes should stack vertically instead of sitting side by side.`,
    },
  },
};

export default syncScrollCompareLayout;
