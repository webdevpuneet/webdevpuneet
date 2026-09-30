const taskApprovalFlowCard = {
  id: 'task-approval-flow-card',
  title: 'Task Approval Flow Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="tac-card" id="tacCard">
  <div class="tac-head">
    <div class="tac-avatar">DK</div>
    <div class="tac-who">
      <strong>Dana Kim</strong> <span>requested approval</span>
      <div class="tac-time">2 hours ago</div>
    </div>
    <span class="tac-status" id="tacStatus">Pending</span>
  </div>

  <div class="tac-body">
    <div class="tac-label">Requesting</div>
    <div class="tac-title">Publish "Q3 pricing update" to production</div>
    <p class="tac-desc">Rolls out the new tiered pricing page and updates checkout copy. Affects all new signups starting today.</p>
  </div>

  <div class="tac-changes-box" id="tacChangesBox" hidden>
    <label for="tacComment">What needs to change?</label>
    <textarea id="tacComment" placeholder="Explain what should be revised before this can be approved..."></textarea>
    <div class="tac-changes-actions">
      <button type="button" class="tac-btn ghost" id="tacCancelChanges">Cancel</button>
      <button type="button" class="tac-btn dark" id="tacSendChanges">Send request</button>
    </div>
  </div>

  <div class="tac-actions" id="tacActions">
    <button type="button" class="tac-btn approve" id="tacApprove">Approve</button>
    <button type="button" class="tac-btn changes" id="tacChanges">Request changes</button>
    <button type="button" class="tac-btn reject" id="tacReject">Reject</button>
  </div>

  <div class="tac-resolved" id="tacResolved" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0e1016;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.tac-card{background:#15171f;border:1px solid #262a38;border-radius:16px;padding:20px;width:100%;max-width:420px;box-shadow:0 22px 55px rgba(0,0,0,.45);transition:opacity .2s}
.tac-head{display:flex;align-items:flex-start;gap:11px;margin-bottom:16px}
.tac-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#f472b6,#fb923c);color:#1a1220;font-size:12.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.tac-who{flex:1;min-width:0}
.tac-who strong{font-size:13.5px;color:#f1f5f9;font-weight:800}
.tac-who span{font-size:13px;color:#7c8494}
.tac-time{font-size:11.5px;color:#4b5566;margin-top:2px}
.tac-status{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;background:rgba(251,191,36,.14);color:#fbbf24;padding:4px 9px;border-radius:999px;white-space:nowrap;flex-shrink:0}
.tac-status.approved{background:rgba(52,211,153,.14);color:#34d399}
.tac-status.rejected{background:rgba(248,113,113,.14);color:#f87171}
.tac-status.changes{background:rgba(129,140,248,.14);color:#818cf8}

.tac-label{font-size:10.5px;font-weight:800;color:#565f72;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.tac-title{font-size:14.5px;font-weight:700;color:#e9ecf3;margin-bottom:8px;line-height:1.4}
.tac-desc{font-size:12.5px;color:#8b93a3;line-height:1.6}

.tac-changes-box{margin-top:16px;background:#0e1016;border:1px solid #232838;border-radius:12px;padding:14px}
.tac-changes-box label{font-size:12px;font-weight:700;color:#cbd2e0;display:block;margin-bottom:8px}
.tac-changes-box textarea{width:100%;background:#171a24;border:1.5px solid #262a38;border-radius:9px;color:#e2e6ef;font-family:inherit;font-size:12.5px;padding:10px;resize:none;min-height:64px;outline:none}
.tac-changes-box textarea:focus{border-color:#818cf8}
.tac-changes-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}

.tac-actions{display:flex;gap:8px;margin-top:18px}
.tac-btn{flex:1;border:none;border-radius:10px;padding:10px;font-size:12.5px;font-weight:700;cursor:pointer;transition:filter .12s,background .12s}
.tac-btn:hover{filter:brightness(1.12)}
.tac-btn.approve{background:#22c55e;color:#052013}
.tac-btn.changes{background:#232838;color:#c7cede}
.tac-btn.reject{background:#2a1b1f;color:#f87171}
.tac-btn.ghost{flex:none;background:none;color:#7c8494;padding:9px 12px}
.tac-btn.dark{flex:none;background:#818cf8;color:#0e1016;padding:9px 16px}

.tac-resolved{margin-top:18px;display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:11px;font-size:13px;font-weight:700}
.tac-resolved.approved{background:rgba(34,197,94,.1);color:#4ade80;border:1px solid rgba(34,197,94,.25)}
.tac-resolved.rejected{background:rgba(248,113,113,.1);color:#f87171;border:1px solid rgba(248,113,113,.25)}
.tac-resolved.changes{background:rgba(129,140,248,.1);color:#a5b4fc;border:1px solid rgba(129,140,248,.25)}
.tac-resolved svg{width:16px;height:16px;flex-shrink:0}`,

  js: `var statusEl = document.getElementById('tacStatus');
var actionsEl = document.getElementById('tacActions');
var changesBoxEl = document.getElementById('tacChangesBox');
var resolvedEl = document.getElementById('tacResolved');
var commentEl = document.getElementById('tacComment');

var ICONS = {
  approved: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
  rejected: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  changes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
};

function resolve(kind, message) {
  statusEl.textContent = kind === 'approved' ? 'Approved' : kind === 'rejected' ? 'Rejected' : 'Changes requested';
  statusEl.className = 'tac-status ' + kind;
  actionsEl.hidden = true;
  changesBoxEl.hidden = true;
  resolvedEl.hidden = false;
  resolvedEl.className = 'tac-resolved ' + kind;
  resolvedEl.innerHTML = ICONS[kind] + '<span>' + message + '</span>';
}

document.getElementById('tacApprove').addEventListener('click', function () {
  resolve('approved', 'You approved this request.');
});

document.getElementById('tacReject').addEventListener('click', function () {
  resolve('rejected', 'You rejected this request.');
});

document.getElementById('tacChanges').addEventListener('click', function () {
  actionsEl.hidden = true;
  changesBoxEl.hidden = false;
  commentEl.focus();
});

document.getElementById('tacCancelChanges').addEventListener('click', function () {
  changesBoxEl.hidden = true;
  actionsEl.hidden = false;
  commentEl.value = '';
});

document.getElementById('tacSendChanges').addEventListener('click', function () {
  var text = commentEl.value.trim();
  resolve('changes', text ? 'Changes requested: \\u201c' + text + '\\u201d' : 'You requested changes on this request.');
});`,

  seo: {
    title: 'Task Approval Flow Card — Free HTML CSS JS Snippet',
    description: `An approval request card with Approve, Reject, and Request-changes actions, a conditional comment field, and a clear resolved state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Task Approval Flow Card — Approve, Reject & Request Changes With a Resolved State',
      description: `Approval requests show up everywhere teams work together — publishing content, merging a change, releasing a budget, signing off a design. The task approval flow card packages the three real outcomes of an approval decision — approve, reject, or ask for revisions — into one self-contained card with a clean resolved state once acted on. Pair it with [task approval flow card](/ui-snippets/task-approval-flow-card/)'s sibling patterns like [progress wizard](/ui-snippets/progress-wizard/) for multi-step approval chains, or [comment thread](/ui-snippets/comment-thread/) for the discussion that often follows.

**Three distinct outcomes, not just yes/no**

Most approval UIs collapse to a binary approve/reject, but real review almost always has a third path: "close, but not yet." This card treats Request changes as a first-class action rather than a variant of rejection — clicking it doesn't resolve the card immediately, it opens a comment field, because rejecting and asking for a revision are different intents that deserve different downstream handling (a rejected request usually needs to be resubmitted from scratch; a changes-requested one usually gets edited in place).

**A comment field that appears only when needed**

The textarea for explaining requested changes stays hidden until you actually click "Request changes," then swaps in for the action row entirely — you either commit to explaining what's needed or cancel back to the three original choices. This keeps the card's default state lean (three buttons, no clutter) while making sure a changes-requested action always comes with context, not a bare status flip.

**One resolve() function, three visual outcomes**

Approve, reject, and the submitted change request all funnel through a single \`resolve(kind, message)\` function that swaps the status badge's color and text, hides the action buttons, and shows a resolved banner with a matching icon and color (green check, red X, indigo pencil). Because every outcome shares one code path, the card can never end up in an inconsistent state — like showing "Approved" while the reject button is still clickable.

**Clear, permanent resolved state**

Once acted on, the card replaces its action row with a resolved banner and disables further clicks — modeling the reality that an approval decision, once made, is a fact about the request rather than something to be casually re-clicked. This is the same principle behind [task approval flow card](/ui-snippets/task-approval-flow-card/)'s status badge switching from a pending amber to a definitive final color.

**Wiring it to a real workflow**

Swap the click handlers' local \`resolve()\` calls for real API requests — POST the decision (and comment, if any) to your backend, then call \`resolve()\` once the request succeeds so the UI only shows the final state after it's actually persisted. Add a loading state on the clicked button while the request is in flight, and revert to the action row on failure so the user can retry.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A pending approval card renders with Approve, Reject, and Request changes buttons.` },
      { title: 'Click Approve or Reject', text: `The status badge updates and a resolved banner replaces the action buttons.` },
      { title: 'Click Request changes', text: `A comment textarea appears in place of the buttons, focused and ready to type.` },
      { title: 'Send or cancel the request', text: `Sending resolves the card with your comment quoted; cancel returns to the three actions.` },
      { title: 'Reload to reset', text: `Refresh the sandbox to see the card in its original pending state again.` },
      { title: 'Wire to a real API', text: `Replace resolve() calls with actual approve/reject/request-changes endpoint calls.` },
    ] },
    features: [
      { title: 'Three distinct outcomes', text: `Approve, reject, and request-changes are handled as separate intents, not one binary.` },
      { title: 'Conditional comment field', text: `The changes textarea only appears when Request changes is clicked, keeping the default lean.` },
      { title: 'Single resolve() function', text: `Every outcome shares one code path, so the badge and banner can never disagree.` },
      { title: 'Color-coded resolved banner', text: `A matching icon and color confirm exactly what happened after the decision.` },
      { title: 'Cancelable change request', text: `Cancel returns to the original three actions without losing the pending state.` },
      { title: 'Requester context up top', text: `Avatar, name, and relative time establish who's asking before the decision.` },
      { title: 'Quoted comment in the resolution', text: `A submitted change request echoes back the reviewer's own comment text.` },
      { title: 'Locked-in final state', text: `Once resolved, the action row is replaced entirely rather than merely disabled.` },
    ],
    useCases: [
      { title: 'Content publishing approvals', text: `Gate publishing a page or post behind an editor's sign-off before it goes live.` },
      { title: 'Design review sign-off', text: `Approve or request revisions on a design handoff, pairing with [comment thread](/ui-snippets/comment-thread/) for detailed feedback.` },
      { title: 'Expense and budget requests', text: `Route spend requests through an approve/reject/request-detail flow.` },
      { title: 'Access and permissions requests', text: `Approve a teammate's request for elevated access with an audit-friendly resolved state.` },
      { title: 'Multi-step approval chains', text: `Combine with a [progress wizard](/ui-snippets/progress-wizard/) to show where a request sits across several approvers.` },
      { title: 'Onboarding task sign-off', text: `Pair with an [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/) where a manager approves completed steps.` },
    ],
    faqs: [
      { q: 'Why treat "Request changes" separately from "Reject"?', a: `Rejecting and asking for a revision carry different intents and usually trigger different downstream flows — a rejected request is typically closed and resubmitted fresh, while a changes-requested one is expected to be edited and resubmitted in place. Giving Request changes its own comment field makes sure the requester always gets specific, actionable feedback instead of a bare rejection.` },
      { q: 'How does the card guarantee a consistent resolved state?', a: `All three outcomes call the same resolve(kind, message) function, which is the single place that updates the status badge's class and text, hides the action row and comment box, and shows the resolved banner with a matching color and icon. Because there's one function instead of three separate branches of UI-updating code, the badge and the banner can never fall out of sync.` },
      { q: 'What happens if I click Request changes and then change my mind?', a: `The Cancel button in the comment box clears the textarea and restores the original three-button action row, with the card still in its pending state — nothing is resolved and no comment is sent unless you explicitly click "Send request."` },
      { q: 'How do I connect this to a real approval workflow?', a: `Replace the resolve() calls inside each button's click handler with an actual API request — POST the decision (and the comment text for a changes request) to your backend — and only call resolve() to update the UI after that request succeeds. Add a brief loading state on the clicked button while waiting, and on failure, leave the action row visible so the user can retry.` },
      { q: 'How do I use this approval card in React, Vue, or Angular?', a: `Model the card's state as a single status value (pending, approved, rejected, or changes-requested) plus a comment string. Render the action row, comment box, or resolved banner based on that status, and call your framework's state setter from each button's handler instead of resolve()'s direct DOM manipulation — the visual states and CSS classes map over directly.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to design the state machine for this card from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why Request changes is modeled as a distinct outcome from Reject rather than a variant of it, and how funneling all three outcomes through one resolve() function guarantees the status badge and the resolved banner can never disagree. The same assistant can help you optimize it — ask whether the card should support an "undo" within a short window after resolving, or whether the comment textarea should validate a minimum length before allowing submission. It's also useful for extending the flow: ask it to add a loading spinner while a real API call is in flight, chain multiple approval cards into a sequential multi-approver flow, or add file/screenshot attachments to the request-changes comment. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "task approval flow card" in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Show a pending approval request card with the requester's avatar, name, a relative timestamp, a short title describing what's being requested, and a longer description, plus a status badge that starts in a "Pending" (amber) state.
- Provide three action buttons: Approve, Reject, and Request changes — these must represent three genuinely distinct outcomes, not a binary approve/reject with "request changes" treated as a lesser form of rejection.
- Clicking Request changes must NOT immediately resolve the card. Instead it should hide the three action buttons and reveal a comment textarea (auto-focused) with Cancel and Send request buttons; Cancel must return to the original three-button state without losing any prior context, and Send request must resolve the card only once submitted, with the resolution text including or referencing the comment that was typed.
- Clicking Approve or Reject must resolve the card immediately: hide the action buttons, update the status badge to a distinct color and label for that outcome, and show a resolved confirmation banner with a matching icon and color (e.g. green check for approved, red X for rejected, a different color/icon for changes-requested).
- Route all three possible resolutions through one shared function that updates the badge and shows the resolved banner, so it is structurally impossible for the badge state and the banner state to disagree with each other.
- Once a card is resolved (approved, rejected, or changes sent), it should not be possible to trigger any of the original three actions again — the action row must be fully replaced by the resolved banner, not merely disabled-looking.`,
    },
  },
};

export default taskApprovalFlowCard;
