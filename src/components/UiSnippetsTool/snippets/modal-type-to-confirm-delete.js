const modalTypeToConfirmDelete = {
  id: 'modal-type-to-confirm-delete',
  title: 'Type-to-Confirm Delete Modal',
  category: 'modals',
  html: `<div class="ttc-page"><button type="button" class="ttc-open" id="ttcOpen">Delete Project</button></div>

<div class="ttc-backdrop" id="ttcBackdrop"></div>
<div class="ttc-modal" id="ttcModal" role="alertdialog" aria-modal="true" aria-labelledby="ttcTitle">
  <div class="ttc-icon">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
  </div>
  <h3 id="ttcTitle">Delete "Marketing Site Redesign"?</h3>
  <p class="ttc-desc">This will permanently delete the project, all of its files, and remove access for every collaborator. This cannot be undone.</p>

  <label class="ttc-label" for="ttcInput">Type <strong id="ttcTarget">Marketing Site Redesign</strong> to confirm</label>
  <input type="text" id="ttcInput" class="ttc-input" autocomplete="off" spellcheck="false" placeholder="Type the project name">
  <p class="ttc-status" id="ttcStatus">&nbsp;</p>

  <div class="ttc-actions">
    <button type="button" class="ttc-btn ttc-cancel" id="ttcCancel">Cancel</button>
    <button type="button" class="ttc-btn ttc-delete" id="ttcDelete" disabled>Delete this project</button>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh}
.ttc-page{min-height:100vh;display:flex;align-items:center;justify-content:center}
.ttc-open{background:#fff;color:#ef4444;border:1.5px solid #fecaca;border-radius:10px;padding:11px 22px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}

.ttc-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.5);opacity:0;pointer-events:none;transition:opacity .2s;z-index:90}
.ttc-backdrop.show{opacity:1;pointer-events:all}

.ttc-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-46%) scale(.97);opacity:0;pointer-events:none;
  width:min(420px,90vw);background:#fff;border-radius:16px;padding:28px 26px;z-index:91;
  transition:opacity .22s,transform .22s;box-shadow:0 30px 70px rgba(0,0,0,.3)}
.ttc-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}

.ttc-icon{width:42px;height:42px;border-radius:11px;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.ttc-modal h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:8px;line-height:1.4}
.ttc-desc{font-size:13px;color:#64748b;line-height:1.65;margin-bottom:20px}

.ttc-label{display:block;font-size:12.5px;color:#475569;margin-bottom:8px}
.ttc-label strong{color:#0f172a;font-weight:800}
.ttc-input{width:100%;border:1.5px solid #e2e8f0;border-radius:9px;padding:10px 13px;font-size:14px;font-family:inherit;outline:none;transition:border-color .15s}
.ttc-input:focus{border-color:#94a3b8}
.ttc-input.match{border-color:#16a34a}
.ttc-input.mismatch{border-color:#ef4444}

.ttc-status{font-size:12px;margin-top:7px;min-height:16px;color:#94a3b8}
.ttc-status.match{color:#16a34a;font-weight:700}
.ttc-status.mismatch{color:#ef4444}

.ttc-actions{display:flex;gap:10px;margin-top:20px}
.ttc-btn{flex:1;border-radius:9px;padding:11px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;border:none;transition:background .15s,opacity .15s}
.ttc-cancel{background:#f1f5f9;color:#334155}
.ttc-delete{background:#ef4444;color:#fff}
.ttc-delete:disabled{background:#fca5a5;cursor:not-allowed;opacity:.75}
.ttc-delete:not(:disabled):hover{background:#dc2626}`,
  js: `// Real, case-sensitive exact-match validation against a live target string — not a
// hardcoded "type DELETE" phrase. The input is checked on every keystroke and the
// delete button's disabled state and the input's visual match/mismatch state both
// derive from the same single comparison.
var TARGET_NAME = 'Marketing Site Redesign';

var openBtn = document.getElementById('ttcOpen');
var backdrop = document.getElementById('ttcBackdrop');
var modal = document.getElementById('ttcModal');
var input = document.getElementById('ttcInput');
// Named statusEl, not status -- window.status is a built-in browser global
// (legacy status-bar text) typed as a string, so "var status = <element>" at
// top-level scope gets silently coerced to a string instead of holding the
// element, breaking every later .classList/.textContent call on it.
var statusEl = document.getElementById('ttcStatus');
var deleteBtn = document.getElementById('ttcDelete');
var cancelBtn = document.getElementById('ttcCancel');

function resetForm() {
  input.value = '';
  input.classList.remove('match', 'mismatch');
  statusEl.textContent = '\\u00a0';
  statusEl.classList.remove('match', 'mismatch');
  deleteBtn.disabled = true;
}

function openModal() {
  resetForm();
  backdrop.classList.add('show');
  modal.classList.add('show');
  window.setTimeout(function () { input.focus(); }, 200);
}

function closeModal() {
  backdrop.classList.remove('show');
  modal.classList.remove('show');
}

function validate() {
  var value = input.value;

  if (value.length === 0) {
    input.classList.remove('match', 'mismatch');
    statusEl.textContent = '\\u00a0';
    statusEl.classList.remove('match', 'mismatch');
    deleteBtn.disabled = true;
    return;
  }

  var isMatch = value === TARGET_NAME;
  deleteBtn.disabled = !isMatch;

  input.classList.toggle('match', isMatch);
  input.classList.toggle('mismatch', !isMatch);
  statusEl.classList.toggle('match', isMatch);
  statusEl.classList.toggle('mismatch', !isMatch);
  statusEl.textContent = isMatch ? 'Name matches — you can now delete this project.' : 'Does not match yet.';
}

openBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
input.addEventListener('input', validate);

deleteBtn.addEventListener('click', function () {
  if (deleteBtn.disabled) return;
  closeModal();
  openBtn.textContent = 'Project deleted';
  openBtn.disabled = true;
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});`,
  seo: {
    title: 'Type-to-Confirm Delete Modal — Free HTML CSS JS Snippet',
    description: 'A destructive-action modal that requires typing the exact resource name before Delete enables, with live match/mismatch styling on every keystroke. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Type-to-Confirm Delete Modal — Exact-Name Match, Not a Generic "DELETE" Phrase',
      description: `A plain "Are you sure?" confirmation dialog is easy to click through without reading it — the buttons are in the same place every time, and muscle memory takes over. For genuinely destructive, irreversible actions (deleting a whole project, not a single item), requiring the visitor to type the exact name of the specific thing they're deleting adds real friction that forces a moment of deliberate attention, and confirms they're deleting the resource they think they're deleting rather than a different one they clicked into by mistake.

**Matching the resource's real name, not a fixed phrase**

Some type-to-confirm patterns ask for a generic phrase like "DELETE" — which is easy to type from muscle memory without looking at what's actually being deleted. This snippet instead sets \`TARGET_NAME\` to the actual project's name ("Marketing Site Redesign") and requires an exact match against that specific string. This is deliberately more work than a fixed phrase, because the extra work is the point — the visitor has to read and reproduce the specific name of the thing they're about to permanently remove.

**One comparison, three visual outputs**

\`validate()\` computes \`isMatch = value === TARGET_NAME\` exactly once per keystroke, then derives every visual consequence of that single boolean: the delete button's \`disabled\` attribute, the input's border color (\`.match\` green or \`.mismatch\` red via \`classList.toggle\`), and the status line's text and color beneath the input. Because all three outputs trace back to one comparison, there's no risk of the button's enabled state and the input's visual feedback disagreeing with each other.

**The empty-input special case**

Before checking for a match, \`validate()\` checks \`value.length === 0\` and returns early, clearing all match/mismatch styling rather than showing a red "mismatch" state. An empty input hasn't failed to match — it simply hasn't attempted a match yet, and showing an alarming red border the instant the modal opens (before the visitor has typed anything) would be a false signal.

**Exact, case-sensitive comparison — deliberately**

\`value === TARGET_NAME\` uses strict equality with no \`.toLowerCase()\` normalization. This is intentional: a case-insensitive match would let "marketing site redesign" (lowercase) count as confirmation, which weakens the "you had to actually read and reproduce this correctly" signal the whole pattern exists to provide. If your use case genuinely doesn't need case sensitivity, lowercase both sides of the comparison — but understand that doing so trades away some of the deliberate friction.

**Resetting state on every open**

\`openModal()\` calls \`resetForm()\` before showing the modal, clearing any previously typed text and resetting the button to disabled. Without this, closing the modal via Cancel and reopening it later (perhaps for a *different* project, if this modal were reused across a list) could leave a stale, already-matching value in the input, allowing an immediate delete with no re-typing required.

**A single \`TARGET_NAME\` constant, easy to wire to real data**

In a real application, \`TARGET_NAME\` and the strings shown in the heading and label would come from whatever resource is currently being deleted (a prop, a data attribute, a server-rendered value) rather than a hardcoded constant. The validation logic itself doesn't need to change — only where \`TARGET_NAME\`'s value comes from.

**Auto-focusing the input**

\`openModal()\` focuses the text input shortly after the modal becomes visible (delayed slightly to let the open transition start first). This removes an extra click before the visitor can start typing, which matters for a flow already asking for more effort than a single confirmation click.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the modal', text: 'Click "Delete Project" — the Delete button starts disabled and the input is empty.' },
        { title: 'Type the project name', text: 'The input border and a status line update live as you type, and turn green only on an exact match.' },
        { title: 'Delete becomes enabled', text: 'Once the typed text exactly matches the project name, the Delete button becomes clickable.' },
        { title: 'Click Delete or Cancel', text: 'Delete closes the modal and disables the trigger button; Cancel closes without deleting.' },
        { title: 'Wire TARGET_NAME to real data', text: 'Replace the hardcoded TARGET_NAME constant (and the matching text in the heading/label) with the actual resource name from your app.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Requires an exact, case-sensitive match against the real resource name, not a generic phrase',
      'Delete button, input border color, and status text all derive from one comparison per keystroke',
      'Empty input shows a neutral state rather than a false "mismatch" the instant the modal opens',
      'Form resets fully every time the modal is opened, avoiding stale state from a prior session',
      'Auto-focuses the confirmation input shortly after the modal becomes visible',
      'Live status line explains match/mismatch beyond just the input\'s border color',
      'Escape key and backdrop click both close the modal without requiring a match',
      'role="alertdialog" for correct assistive-technology semantics on a destructive confirmation',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'DASH', title: 'Deleting an entire project, workspace, or account', desc: 'The strongest confirmation pattern for actions affecting an entire resource and all its contents, not a single row.' },
      { icon: 'FORM', title: 'Admin panels and dangerous bulk operations', desc: 'Require typing an exact record count or resource name before an irreversible bulk delete or data purge proceeds.' },
      { icon: 'APP', title: 'Infrastructure and DevOps tooling', desc: 'A standard pattern for destroying a production database, server, or environment — the extra typing step matches the weight of the action.' },
      { icon: 'LEARN', title: 'Learn single-source-of-truth validation', desc: 'Study how one boolean comparison drives three separate visual outputs (button, border, status text) without them disagreeing.' },
      { icon: 'CODE', title: 'Related: Delete Confirmation Modal', desc: 'Compare against the simpler [Delete Confirmation Modal](/ui-snippets/delete-confirmation-modal/) for lower-stakes deletions that don\'t need typed confirmation.' },
      { icon: 'DESIGN', title: 'Unsaved changes and destructive guards', desc: 'Pair the same exact-match pattern with the [Unsaved Changes Modal Guard](/ui-snippets/unsaved-changes-modal-guard/) for other high-stakes confirmations.' },
    ],
    faqs: [
      { q: 'Why require typing the exact resource name instead of just "DELETE"?', a: 'A fixed phrase like "DELETE" is easy to type from muscle memory without actually reading what is being deleted. Requiring the specific resource\'s real name forces the visitor to read and reproduce that name, which both adds deliberate friction to an irreversible action and confirms they are deleting the specific resource they intend to, not a different one they navigated to by mistake.' },
      { q: 'Why is the comparison case-sensitive?', a: 'value === TARGET_NAME uses strict, case-sensitive equality on purpose. A case-insensitive match would allow a casually-typed lowercase version to count as confirmation, which weakens the intended friction. If your use case does not need this level of strictness, you can lowercase both sides of the comparison, but that trades away some of the deliberate-attention benefit of the pattern.' },
      { q: 'Why does an empty input not show a red "mismatch" state?', a: 'validate() explicitly checks for an empty input first and clears all match/mismatch styling in that case, rather than falling through to the mismatch branch. Showing a red, alarming border the instant the modal opens — before the visitor has typed anything at all — would be a false and confusing signal.' },
      { q: 'What happens if I close and reopen the modal — does it remember what I typed?', a: 'No. openModal() calls resetForm() every time the modal is shown, clearing the input value and resetting the delete button to disabled. This avoids a scenario where a previously-typed matching value could persist and allow an immediate delete with no re-typing on a later, potentially unrelated, open of the modal.' },
      { q: 'How do I connect TARGET_NAME to a real, dynamic resource name?', a: 'Replace the hardcoded TARGET_NAME constant with the actual resource\'s name pulled from your data layer (a prop, a data attribute rendered server-side, or a value read from the DOM element that triggered the delete flow), and update the heading and label text to match the same dynamic value — the validate() comparison logic itself does not need to change.' },
      { q: 'Is role="alertdialog" required here instead of role="dialog"?', a: 'alertdialog is the more semantically correct choice for a modal specifically confirming a destructive or otherwise significant action, since it signals to assistive technology that the dialog demands the user\'s immediate attention and a decision, distinct from a general-purpose dialog that might contain non-critical content.' },
    ],
    aiPrompt: {
      paragraph: `Rather than second-guessing the validation edge cases, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why validate() derives the delete button's disabled state, the input's border color, and the status text from a single isMatch boolean computed once per keystroke, rather than three separate independent checks — and what subtle bugs could appear if those three outputs were computed separately and could fall out of sync. The same assistant is useful for adapting this to a real app: ask it how to wire TARGET_NAME to a dynamic resource name passed into the component, or how to add a short cooldown after the match is detected (so the button enables a beat after the last correct keystroke rather than instantly) for an extra safety margin on especially destructive actions. It can also help you evaluate whether case-sensitive matching is the right call for your specific resource-naming conventions, or convert the vanilla implementation into a controlled React input with the match state held via useState. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a destructive-action confirmation modal in plain HTML, CSS, and vanilla JavaScript where the Delete button stays disabled until the visitor types the exact, case-sensitive name of the specific resource being deleted into a text input — not a generic fixed confirmation phrase — no library.

Requirements:
- A trigger button that opens a modal (backdrop + centered dialog with a fade/scale transition, using role="alertdialog") showing a warning icon, a heading naming the specific resource being deleted, a short description of the consequences, a labeled text input asking the visitor to type the resource's exact name to confirm, a status message area, and Cancel / Delete buttons.
- Store the target resource name as a single JavaScript constant used both for validation and for display in the heading/label text.
- On every keystroke in the input, compare its current value against the target name with strict, case-sensitive equality exactly once, and derive all of the following from that single comparison result: whether the Delete button is disabled, the input's border color (a distinct color for match vs. mismatch), and a status text message beneath the input explaining the current state.
- When the input is empty, it must show a neutral state — no match or mismatch styling — rather than an alarming mismatch state appearing the instant the modal opens before anything has been typed.
- Every time the modal is opened, fully reset the input value and the Delete button back to disabled, so a previously typed matching value from an earlier open of the modal cannot silently persist and allow an immediate delete.
- Auto-focus the text input shortly after the modal becomes visible so the visitor can start typing immediately.
- Support closing via Cancel, a backdrop click, and the Escape key, none of which should require a completed match.`,
    },
  },
};

export default modalTypeToConfirmDelete;
