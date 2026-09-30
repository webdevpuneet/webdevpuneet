const aiActionApprovalCard = {
  id: 'ai-action-approval-card',
  title: 'AI Agent Action Approval Card',
  lastmod: '2026-08-08',
  category: 'cards',
  html: `<div class="approval-card" id="approval-card">
  <div class="card-head">
    <div class="ai-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      Agent proposes an action
    </div>
    <span class="risk-tag" id="risk-tag">Irreversible</span>
  </div>

  <h3 class="action-title" id="action-title">Send email to 3 recipients</h3>
  <p class="action-summary">The agent has drafted a follow-up email based on your instructions. Nothing is sent until you approve it below.</p>

  <div class="preview-list" id="preview-list">
    <div class="preview-row">
      <span class="preview-label">To</span>
      <span class="preview-value">alex@northwind.co, priya@northwind.co, dana@northwind.co</span>
    </div>
    <div class="preview-row">
      <span class="preview-label">Subject</span>
      <span class="preview-value">Following up: Q3 proposal next steps</span>
    </div>
    <div class="preview-row preview-row--body">
      <span class="preview-label">Body</span>
      <span class="preview-value">"Hi all — attaching the revised proposal with the pricing changes we discussed. Let me know if Thursday still works for a quick call."</span>
    </div>
  </div>

  <div class="card-actions" id="card-actions">
    <button class="btn-edit" id="btn-edit">Edit first</button>
    <button class="btn-deny" id="btn-deny">Deny</button>
    <button class="btn-approve" id="btn-approve">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Approve &amp; Send
    </button>
  </div>

  <div class="result-state" id="result-state">
    <div class="result-icon" id="result-icon"></div>
    <p class="result-text" id="result-text"></p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.approval-card {
  width: 100%; max-width: 420px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 22px; box-shadow: 0 4px 20px rgba(15,23,42,0.06);
}

.card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.ai-badge {
  display: flex; align-items: center; gap: 6px;
  font-size: 11.5px; font-weight: 700; color: #6366f1;
  background: #eef2ff; border-radius: 20px; padding: 5px 10px;
}
.risk-tag {
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;
  color: #b45309; background: #fef3c7; border-radius: 6px; padding: 4px 8px;
}

.action-title { font-size: 16.5px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
.action-summary { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 16px; }

/* — Concrete, specific preview of exactly what will happen — */
.preview-list {
  background: #f8fafc; border: 1px solid #eef2ff; border-radius: 10px;
  padding: 12px 14px; display: flex; flex-direction: column; gap: 9px;
  margin-bottom: 18px;
}
.preview-row { display: flex; gap: 10px; align-items: baseline; }
.preview-row--body { flex-direction: column; gap: 4px; }
.preview-label {
  flex-shrink: 0; width: 52px;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;
  color: #94a3b8;
}
.preview-value { font-size: 12.5px; color: #334155; line-height: 1.55; }
.preview-row--body .preview-value { font-style: italic; color: #475569; }

.card-actions { display: flex; gap: 8px; }
.card-actions button {
  font-family: inherit; font-size: 13px; font-weight: 700;
  border-radius: 9px; cursor: pointer; transition: all 0.15s;
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.btn-edit {
  flex: 1; padding: 10px 8px;
  background: transparent; color: #64748b; border: 1.5px solid #e2e8f0;
}
.btn-edit:hover { border-color: #94a3b8; color: #1e293b; }
.btn-deny {
  flex: 1; padding: 10px 8px;
  background: transparent; color: #dc2626; border: 1.5px solid #fecaca;
}
.btn-deny:hover { background: #fef2f2; border-color: #dc2626; }
.btn-approve {
  flex: 1.4; padding: 10px 8px;
  background: #6366f1; color: #fff; border: none;
}
.btn-approve:hover { background: #4f46e5; }
.card-actions button:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

/* — Result state, shown after a decision — */
.result-state {
  display: none; align-items: center; gap: 10px;
  padding: 14px; border-radius: 10px; margin-top: 4px;
}
.result-state.show { display: flex; }
.result-state.approved { background: #ecfdf5; }
.result-state.denied { background: #f1f5f9; }
.result-icon {
  width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
}
.result-state.approved .result-icon { background: #10b981; color: #fff; }
.result-state.denied .result-icon { background: #94a3b8; color: #fff; }
.result-text { font-size: 12.5px; font-weight: 600; color: #1e293b; }

/* Fade out the action content once a decision has been made */
.card-body-fade { transition: opacity 0.2s ease; }
.card-body-fade.hidden { display: none; }`,

  js: `const previewList = document.getElementById('preview-list');
const cardActions = document.getElementById('card-actions');
const actionTitle = document.getElementById('action-title');
const actionSummary = document.querySelector('.action-summary');
const resultState = document.getElementById('result-state');
const resultIcon = document.getElementById('result-icon');
const resultText = document.getElementById('result-text');
const riskTag = document.getElementById('risk-tag');

const btnApprove = document.getElementById('btn-approve');
const btnDeny = document.getElementById('btn-deny');
const btnEdit = document.getElementById('btn-edit');

function hideActionUI() {
  previewList.style.display = 'none';
  cardActions.style.display = 'none';
  actionSummary.style.display = 'none';
  riskTag.style.display = 'none';
}

function showResult(kind, message, icon) {
  hideActionUI();
  resultState.classList.remove('approved', 'denied');
  resultState.classList.add('show', kind);
  resultIcon.textContent = icon;
  resultText.textContent = message;
}

// Nothing irreversible happens until this explicit approval click fires —
// the agent only ever proposed the action and showed exactly what it would
// do; execution is fully gated behind human confirmation.
btnApprove.addEventListener('click', () => {
  actionTitle.textContent = 'Sending email…';
  btnApprove.disabled = true;
  setTimeout(() => {
    showResult('approved', 'Action completed — email sent to 3 recipients.', '\\u2713');
  }, 700);
});

btnDeny.addEventListener('click', () => {
  showResult('denied', 'Action denied — nothing was sent.', '\\u2715');
});

btnEdit.addEventListener('click', () => {
  showResult('denied', 'Opening draft for edits before anything is sent…', '\\u270E');
});`,

  seo: {
    title: 'AI Agent Action Approval Card — Free HTML CSS JS Snippet',
    description: 'A gated approval UI showing an AI agent\'s exact proposed action with Approve, Deny, and Edit first controls. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'AI Agent Action Approval Card — Human-in-the-Loop Confirmation UI for Irreversible AI Actions',
      description: `As AI agents move from answering questions to actually taking actions — sending emails, deleting files, making purchases, modifying records — the interface pattern that gates those actions becomes one of the most consequential pieces of UI a product can ship. Get it wrong and users either lose trust because an agent did something unexpected, or they lose the benefit of automation because every action requires a full manual redo. This snippet implements the pattern correctly: a card that shows exactly what the agent is about to do, in concrete and specific terms, and requires an explicit human decision — Approve, Deny, or Edit first — before anything irreversible actually executes.

**Specific and previewable, never vague**

The single biggest failure mode in agentic-action UI is a confirmation dialog that says something like "AI wants to take an action, continue?" with no detail about what that action actually is. A vague confirmation trains users to click through without reading, which defeats the entire purpose of a human-in-the-loop gate — the approval becomes theater rather than a real checkpoint. This card instead renders a genuine preview: a \`.preview-list\` breaking the proposed email down into its actual \`To\`, \`Subject\`, and \`Body\` fields, with the real recipient addresses and real drafted subject line visible before any decision is made. For a file-deletion agent, the equivalent would list the 12 actual filenames rather than saying "delete some files" — the underlying principle is the same regardless of the action type: a user must be able to verify the specific, concrete consequences of approval, not just trust a label.

**Two distinct rejection paths, not one**

Most approval UIs offer only "confirm" and "cancel," which forces a false binary — either accept the AI's draft exactly as-is, or discard the whole thing and start over. This card separates those into \`btn-deny\` ("Deny," which cancels the action entirely) and \`btn-edit\` ("Edit first," which signals intent to modify the draft before anything sends). Giving users a middle path between full acceptance and full rejection substantially increases how often people actually engage critically with an agent's proposal, rather than defaulting to whichever button requires the least friction. In this demo both secondary actions currently route to the same denied-state UI for simplicity, but in a real implementation "Edit first" would reopen the draft in an editable view rather than terminating the flow.

**The confirmation state closes the loop**

Once \`btn-approve\` is clicked, the button disables immediately (\`btnApprove.disabled = true\`) to prevent a double-send from a second click, the title updates to "Sending email…" as an in-progress signal, and after a brief simulated delay the card transitions to a distinct \`.result-state.approved\` view with a checkmark and the explicit text "Action completed — email sent to 3 recipients." This closing confirmation matters as much as the initial preview: a user who approved an action needs unambiguous proof that it actually happened and exactly what happened, not silence or an assumption that everything went fine. The \`hideActionUI()\` function removes the now-irrelevant preview and buttons so the card's final state reads cleanly as a completed record rather than a stale form.

**Why this matters for 2026 AI-native UX**

The core discipline of 2026 AI-native product design is that agentic actions must be transparent, specific, and gated behind explicit human control before anything irreversible happens — never silently auto-executed based on an inferred intent. As agents gain the ability to actually act on a user's behalf rather than just suggest, the interface separating "the agent proposed this" from "this actually happened" is the single most important trust mechanism a product has. A well-built approval card like this one is not friction added on top of AI capability; it is the thing that makes delegating real, consequential actions to an agent something a user can do with confidence rather than anxiety.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Review the specific proposed action',
          text: 'The card shows exactly what the agent drafted — real recipient addresses, subject line, and body text in the .preview-list, not a vague "send an email?" prompt. This concreteness is what lets a reviewer make an informed decision instead of blindly trusting the agent.',
        },
        {
          title: 'Click "Approve & Send" to execute',
          text: 'The Approve button disables itself immediately to prevent a double-click send, the title changes to "Sending email…" as a brief in-progress state, then the card transitions to a green "Action completed" confirmation — closing the loop so you know the action genuinely happened.',
        },
        {
          title: 'Click "Deny" to cancel with no side effects',
          text: 'Denying shows a neutral grey confirmation state ("Action denied — nothing was sent") and no email is sent. This path exists so rejecting a proposal is exactly as easy and unambiguous as approving one, with no dark-pattern friction discouraging refusal.',
        },
        {
          title: 'Click "Edit first" for the middle path',
          text: 'Rather than forcing an all-or-nothing choice, "Edit first" signals the reviewer wants to modify the draft before anything executes. Wire btnEdit\'s click handler in your real implementation to reopen the draft in an editable form instead of the demo\'s simplified denied-state placeholder.',
        },
        {
          title: 'Inspect the risk tag and badge',
          text: 'The "Irreversible" risk-tag pill and "Agent proposes an action" badge at the top set expectations before the user even reads the details below. Swap the risk-tag text and colour (for example to "Reversible" with a calmer palette) for lower-stakes actions like draft-saving that do not warrant the same visual weight.',
        },
        {
          title: 'Export and connect to a real agent backend',
          text: 'Click HTML or JSX to export. Replace the hard-coded preview values with data returned by your agent\'s planning step, and wire btnApprove\'s click handler to actually call your send/delete/execute endpoint instead of the setTimeout() simulation, updating the result state based on the real API response.',
        },
      ],
    },
    features: [
      'Concrete preview: real To/Subject/Body fields shown before approval, never a vague "AI wants to act" prompt',
      'Three distinct paths: Approve, Deny, and Edit first — not a false accept/cancel binary',
      'Approve button self-disables on click to prevent an accidental double-execution',
      'In-progress state ("Sending email…") communicates the action is running before completion',
      'Explicit completion confirmation with a checkmark closes the loop after approval',
      'Distinct denied-state styling (neutral grey) keeps rejection visually equal in weight to approval',
      'Risk tag ("Irreversible") sets expectations about consequence level before the user reads details',
      'hideActionUI() cleanly removes stale controls once a decision is made, leaving a clean final record',
    ],
    useCases: [
      {
        icon: 'FLOW',
        title: 'Email, messaging, and outbound-communication agents',
        desc: 'Any agent capable of sending a message on a user\'s behalf must show the actual recipients, subject, and body before sending — this is the exact pattern implemented in this card. Wire the preview to your agent\'s drafted output and the approve action to your real send endpoint, keeping the disable-on-click and completion-confirmation behaviour intact to prevent duplicate sends.',
      },
      {
        icon: 'APP',
        title: 'File management and destructive-operation agents',
        desc: 'An agent proposing to delete, move, or overwrite files must enumerate the actual filenames or paths affected, not summarize as "some old files." Extend the .preview-list pattern to a scrollable list of specific file paths with sizes or last-modified dates, so a reviewer can catch a mistaken inclusion before approving an irreversible deletion.',
      },
      {
        icon: 'FORM',
        title: 'Financial and purchasing agents',
        desc: 'Agents that can place orders, transfer funds, or modify billing must show exact amounts, recipients, and line items in the preview, with the risk-tag reflecting the real stakes (for example "Charges your card" rather than a generic label). The disable-on-approve and explicit completion state are especially important here since a duplicate financial action is a genuinely costly UI bug.',
      },
      {
        icon: 'DESIGN',
        title: 'Multi-step agent workflows needing a consistent approval checkpoint',
        desc: 'Products with several different agent capabilities (drafting, sending, filing, scheduling) benefit from a single reusable approval-card component with a swappable preview-row schema, so every irreversible action in the product is gated by the same visual language and the same explicit Approve/Deny/Edit pattern rather than each team inventing its own confirmation UI.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching human-in-the-loop design for agentic products',
        desc: 'This card is a compact teaching reference for the core principles of human-in-the-loop AI UX: specificity over vagueness, a genuine rejection path with equal visual weight to approval, protection against duplicate execution, and an explicit closing confirmation — the same checklist used to review any new agentic feature\'s approval flow before shipping it, comparable to how the [AI Generating Content Loader](/ui-snippets/ai-generating-loader) teaches transparent progress communication for the waiting state that usually precedes this card.',
      },
      {
        icon: 'CODE',
        title: 'Retrofitting existing "AI assistant" features with a real approval gate',
        desc: 'Many early AI-assistant integrations skip an explicit approval step entirely, auto-executing suggested actions to feel more "seamless." This snippet is a practical retrofit template: intercept the point where your agent currently calls an action directly, render this card with the action\'s actual parameters instead, and only call the real execution function from the Approve handler.',
      },
      { icon: 'CODE', title: 'Related: Achievement Badge Collection Grid', desc: 'See the [Achievement Badge Collection Grid](/ui-snippets/achievement-badge-grid/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Heart Rate Zone Card', desc: 'See the [Heart Rate Zone Card](/ui-snippets/heart-rate-zone-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Parcel Locker Pickup Code Card', desc: 'See the [Parcel Locker Pickup Code Card](/ui-snippets/locker-pickup-code-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why show the exact recipients and email body instead of just asking "send this email?"',
        a: 'A vague confirmation gives the reviewer nothing concrete to evaluate, which trains people to click through automatically — the approval step stops functioning as a real safeguard. Showing the actual To, Subject, and Body fields lets a reviewer catch a wrong recipient, an inaccurate claim in the draft, or an unintended attachment before anything sends, which is the entire point of a human-in-the-loop gate for an irreversible action.',
      },
      {
        q: 'Why offer "Edit first" instead of just Approve and Deny?',
        a: 'A binary choice forces reviewers to either accept a draft exactly as written or discard it entirely and start over, which discourages engaging critically with imperfect-but-close drafts. "Edit first" gives a middle path — reopen the proposal in an editable state, make a small correction, then approve the corrected version — which better matches how people actually want to collaborate with an AI draft rather than purely accepting or rejecting it wholesale.',
      },
      {
        q: 'Why disable the Approve button immediately after it is clicked?',
        a: 'Network latency between the click and the action actually completing creates a window where an impatient or uncertain user might click Approve a second time, potentially sending a duplicate email or executing a costly action twice. Disabling the button the instant it is clicked (btnApprove.disabled = true) closes that window entirely, and the subsequent "Sending…" and "Action completed" states give the user clear feedback that their single click was received and is being processed.',
      },
      {
        q: 'How should the risk-tag change for different types of actions?',
        a: 'Reserve strong warning styling like "Irreversible" (amber/red) for actions that genuinely cannot be undone or are costly to undo — sending a message, deleting data, spending money. For safely reversible actions like saving a draft, adding a calendar hold that can be cancelled, or generating a preview, use a calmer tag (or omit it) so the visual weight of the warning stays meaningful and does not become background noise from overuse on low-stakes actions.',
      },
      {
        q: 'Should every AI agent action require this level of explicit approval?',
        a: 'No — the right amount of friction scales with the consequence and reversibility of the action. Read-only or trivially reversible actions (searching, summarizing, drafting without sending) generally do not need a gated approval card at all, since requiring confirmation for every AI step would recreate the manual-labor problem automation is meant to solve. Reserve a full approval card like this one for actions that are irreversible, costly, or affect someone other than the user themselves — that is where explicit, specific, human-gated consent genuinely matters.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how the Approve button's disabled state, the "Sending…" in-progress label, and the final "Action completed" confirmation work together to prevent a duplicate send and give the user unambiguous proof the action ran. It's worth asking the assistant to extend the preview-row pattern to a different action type — for example a file-deletion list with individual per-file checkboxes so a reviewer can approve some files and deny others in one card, rather than only all-or-nothing. You could also ask it to add a countdown-based "auto-deny after 60 seconds of inactivity" safeguard for especially high-stakes actions, or to wire the Edit-first path to actually reopen an editable textarea inline in the card instead of routing to the same denied state the demo currently uses.`,
      prompt: `Build an AI agent action approval card in plain HTML, CSS, and JavaScript that gates an irreversible action (for example sending an email to several recipients) behind explicit human confirmation.

Requirements:
- Display a specific, concrete preview of exactly what will happen if approved — real field values (for example actual recipient addresses, subject line, and message body), never a vague "AI wants to perform an action" message.
- Provide three distinct actions: a primary Approve button that executes the action, a secondary Deny button that cancels it with no side effects, and a third Edit-first option that signals the user wants to modify the draft before anything executes — not just a binary accept/cancel.
- When Approve is clicked, immediately disable the button to prevent a duplicate execution from a second click, show a brief in-progress state (for example "Sending…"), and after a short simulated delay transition to an explicit, visually distinct "Action completed" confirmation state.
- When Deny is clicked, show a clearly different, neutral confirmation state indicating nothing happened, with equal visual prominence to the approved state so declining never feels penalized or harder to find than approving.
- Include a small risk indicator (for example an "Irreversible" tag) near the top of the card that sets expectations about the consequence level of the action before the user reads the detailed preview.
- Structure the code so the preview fields, action title, and approve/deny logic could realistically be swapped for a different action type (file deletion, a purchase, a calendar change) without rewriting the card's core approve/deny/edit flow.`,
    },
  },
};

export default aiActionApprovalCard;
