const snackbarUndo = {
  id: 'snackbar-undo',
  title: 'Snackbar with Undo',
  lastmod: '2026-06-16',
  category: 'modals',
  html: `<div class="sb-stage">
  <div class="sb-card">
    <div class="sb-head">Tasks</div>
    <div class="sb-list" id="sbList">
      <div class="sb-item"><span class="sb-check">✓</span><span class="sb-text">Finish the quarterly report</span><button class="sb-del" onclick="deleteItem(this)" aria-label="Delete">🗑</button></div>
      <div class="sb-item"><span class="sb-check">✓</span><span class="sb-text">Reply to design feedback</span><button class="sb-del" onclick="deleteItem(this)" aria-label="Delete">🗑</button></div>
      <div class="sb-item"><span class="sb-check">✓</span><span class="sb-text">Book the team offsite</span><button class="sb-del" onclick="deleteItem(this)" aria-label="Delete">🗑</button></div>
      <div class="sb-item"><span class="sb-check">✓</span><span class="sb-text">Update the changelog</span><button class="sb-del" onclick="deleteItem(this)" aria-label="Delete">🗑</button></div>
    </div>
    <div class="sb-empty" id="sbEmpty">All clear — no tasks left.</div>
  </div>

  <div class="sb-snackbar" id="snackbar" role="status" aria-live="polite">
    <span class="sb-msg"></span>
    <button class="sb-undo" onclick="undo()">Undo</button>
    <span class="sb-progress"></span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.sb-stage{position:relative;width:100%;max-width:380px;min-height:340px;display:flex;align-items:flex-start}
.sb-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:8px;width:100%;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.sb-head{font-size:15px;font-weight:800;color:#1e293b;padding:12px 12px 8px}

.sb-list{display:flex;flex-direction:column}
.sb-item{display:flex;align-items:center;gap:11px;padding:12px;border-radius:10px;transition:background .15s}
.sb-item:hover{background:#f8fafc}
.sb-item.restored{animation:sb-restore .4s ease}
@keyframes sb-restore{from{opacity:0;transform:translateX(-12px);background:#eef2ff}to{opacity:1;transform:translateX(0)}}
.sb-check{width:22px;height:22px;border-radius:6px;background:#dcfce7;color:#16a34a;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb-text{flex:1;font-size:13px;font-weight:600;color:#334155}
.sb-del{background:none;border:none;font-size:15px;cursor:pointer;opacity:.4;transition:opacity .15s,transform .1s;padding:4px}
.sb-item:hover .sb-del{opacity:.85}
.sb-del:hover{opacity:1}
.sb-del:active{transform:scale(.88)}

.sb-empty{display:none;text-align:center;color:#94a3b8;font-size:13px;padding:40px 0}
.sb-list:empty + .sb-empty{display:block}

.sb-snackbar{position:absolute;left:50%;bottom:0;transform:translate(-50%,140%);display:flex;align-items:center;gap:14px;background:#1e293b;color:#f1f5f9;padding:13px 16px;border-radius:12px;font-size:13px;font-weight:600;box-shadow:0 12px 30px rgba(0,0,0,.3);opacity:0;transition:transform .3s cubic-bezier(.2,.9,.3,1),opacity .3s;overflow:hidden;min-width:280px}
.sb-snackbar.show{transform:translate(-50%,0);opacity:1}
.sb-msg{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sb-undo{background:none;border:none;color:#a5b4fc;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;text-transform:uppercase;letter-spacing:.03em;flex-shrink:0}
.sb-undo:hover{color:#c7d2fe}
.sb-progress{position:absolute;left:0;bottom:0;height:3px;width:100%;background:#6366f1;transform-origin:left}
.sb-progress.run{animation:sb-count 4s linear forwards}
@keyframes sb-count{from{transform:scaleX(1)}to{transform:scaleX(0)}}`,

  js: `var pending = null;
var timer = null;
var DURATION = 4000;

function deleteItem(btn) {
  finalize();
  var row = btn.closest('.sb-item');
  pending = {
    node: row,
    next: row.nextElementSibling,
    parent: row.parentNode,
    label: row.querySelector('.sb-text').textContent
  };
  row.classList.remove('restored');
  row.remove();
  showSnack(pending.label);
}

function showSnack(label) {
  var s = document.getElementById('snackbar');
  s.querySelector('.sb-msg').textContent = 'Deleted “' + label + '”';
  s.classList.add('show');
  var bar = s.querySelector('.sb-progress');
  bar.classList.remove('run');
  void bar.offsetWidth;
  bar.classList.add('run');
  clearTimeout(timer);
  timer = setTimeout(finalize, DURATION);
}

function undo() {
  if (!pending) return;
  clearTimeout(timer);
  if (pending.next && pending.next.parentNode === pending.parent) pending.parent.insertBefore(pending.node, pending.next);
  else pending.parent.appendChild(pending.node);
  pending.node.classList.add('restored');
  pending = null;
  hideSnack();
}

function finalize() {
  if (!pending) return;
  pending = null;
  hideSnack();
}

function hideSnack() {
  document.getElementById('snackbar').classList.remove('show');
}`,

  seo: {
    title: 'Snackbar with Undo — HTML CSS JS Snippet',
    description: `Material-style undo snackbar: delete a row, get a toast with a countdown bar and an Undo that restores it to its exact spot. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Snackbar with Undo — Deferred Delete, Countdown Progress Bar & Exact-Position Restore`,
      description: `"Undo" is one of the kindest patterns in UI design. Instead of interrupting users with a "Are you sure?" confirmation dialog for every delete, you let the action happen instantly and offer a brief window to reverse it. That is the undo snackbar — popularised by Gmail and Material Design — and it makes destructive actions feel safe without nagging. This snippet implements the full pattern in plain HTML, CSS, and vanilla JavaScript: an instant delete, a snackbar with an animated countdown bar, an Undo that restores the item to its exact original position, and automatic commit when the window expires.

**Deferred, reversible delete**

The key insight is that the delete is *visually* immediate but *logically* deferred. \`deleteItem\` removes the row from the DOM straight away (so the list updates instantly) but stores everything needed to put it back in a \`pending\` object: the detached node itself, its former \`parent\`, and crucially its \`nextElementSibling\` — the element it sat before. That sibling reference is what lets undo restore the row to its precise original slot, not just append it to the end.

**Countdown progress bar**

The snackbar shows an \`sb-progress\` bar that scales from full to zero over the 4-second window using a pure-CSS \`transform: scaleX\` keyframe — a transform animation that runs on the compositor and stays smooth. Each time a snackbar appears, the bar's animation is restarted by removing the class, forcing a reflow with \`void offsetWidth\`, and re-adding it, so the countdown always plays fresh even on rapid successive deletes. The bar gives users a visible sense of how long they have to act.

**Exact-position restore**

\`undo\` clears the pending timer and reinserts the stored node: if the original next sibling still exists in the parent, it uses \`insertBefore\` to drop the row back exactly where it was; otherwise it appends. The restored row plays an \`sb-restore\` highlight animation so users can see what came back. After undo, \`pending\` is cleared so the action cannot be reversed twice.

**Commit on expiry or on the next action**

If the user does nothing, the \`setTimeout\` fires \`finalize\`, which simply clears \`pending\` — the node was already removed, so the delete becomes permanent. The same \`finalize\` is called at the start of \`deleteItem\`, so if you delete a second item while a snackbar is still showing, the first delete commits immediately and the snackbar re-targets the new item. This single-pending model avoids the bug where overlapping deletes lose track of what to undo.

Pair this with a [swipe-to-delete list](/ui-snippets/swipe-delete-list/) for the delete gesture, a [toast notification](/ui-snippets/toast-notification/) system for non-undoable messages, or a [todo widget](/ui-snippets/todo-widget/) as the list.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Tasks" card appears with four rows, each with a trash icon that shows on hover.` },
      { title: 'Delete a task', text: `Click a trash icon — the row vanishes instantly and a dark snackbar slides up from the bottom reading "Deleted …".` },
      { title: 'Watch the countdown', text: `A thin purple bar shrinks across the bottom of the snackbar over four seconds, showing your window to undo.` },
      { title: 'Click Undo', text: `Hit Undo before the bar empties — the task reappears in its exact original position with a brief highlight.` },
      { title: 'Let it expire', text: `Do nothing and the bar runs out — the snackbar slides away and the delete becomes permanent.` },
      { title: 'Delete several quickly', text: `Delete another task while a snackbar is showing — the previous delete commits immediately and the snackbar re-targets the new item.` },
    ] },
    features: [
      { title: 'Instant, reversible delete', text: `The row is removed immediately for a responsive feel, while a \`pending\` object retains everything needed to undo before the window closes.` },
      { title: 'Exact-position restore', text: `\`deleteItem\` stores the \`nextElementSibling\`, so \`undo\` uses \`insertBefore\` to return the row to its precise slot — not the end of the list.` },
      { title: 'Compositor-smooth countdown', text: `The progress bar animates with \`transform: scaleX\`, a GPU-friendly transform, so the countdown stays smooth even under load.` },
      { title: 'Reflow-restarted animation', text: `Removing the \`run\` class, reading \`offsetWidth\`, and re-adding it restarts the countdown on every snackbar, even back-to-back deletes.` },
      { title: 'Single-pending commit model', text: `Deleting again calls \`finalize\` first, committing the prior delete and re-targeting the snackbar — no lost or ambiguous undo state.` },
      { title: 'Auto-commit on expiry', text: `A \`setTimeout\` fires \`finalize\` when the window ends, making the delete permanent without any extra confirmation.` },
      { title: 'Restore highlight', text: `Undone rows replay an \`sb-restore\` keyframe so users can see exactly which item returned.` },
      { title: 'Accessible live region', text: `The snackbar is \`role="status"\` with \`aria-live="polite"\`, so screen readers announce the deletion and the undo option.` },
    ],
    useCases: [
      { title: 'Email and task list deletes', text: `The classic Gmail-style undo for archiving or deleting. Use it on a [todo widget](/ui-snippets/todo-widget/) or any list of removable rows.` },
      { title: 'Swipe-to-delete confirmation', text: `Pair the undo snackbar with a [swipe-to-delete list](/ui-snippets/swipe-delete-list/) so a swipe removes the row and the snackbar offers a safety net.` },
      { title: 'Bulk actions with safety', text: `Offer "Undo" after archiving, moving, or marking many items, sparing users a confirmation dialog for every action.` },
      { title: 'Settings and destructive toggles', text: `When a user turns off a feature or removes an integration, an undo snackbar reverses it within a grace period.` },
      { title: 'Cart and wishlist removals', text: `Remove an item from a cart with an instant "Undo" instead of a modal; complements an [order summary](/ui-snippets/order-summary/) or [mini cart](/ui-snippets/mini-cart/).` },
      { title: 'General action feedback', text: `Use the same snackbar shell (without undo) for non-reversible confirmations alongside a full [toast notification](/ui-snippets/toast-notification/) system.` },
    ],
    faqs: [
      { q: 'How do I make the delete actually call my API?', a: `Keep the optimistic UI: remove the row immediately and store \`pending\`. Fire the real DELETE request inside \`finalize\` (on expiry/commit), not in \`deleteItem\` — that way Undo simply cancels the timer and no request is ever sent. If you prefer to delete on the server first, send the request in \`deleteItem\` and a restore request in \`undo\`; the optimistic approach avoids the extra round-trip.` },
      { q: 'Why store nextElementSibling instead of an index?', a: `An index can drift if other rows are added or removed while the snackbar is showing. A reference to the next sibling node restores the item relative to its actual neighbour, and \`undo\` checks that the sibling still belongs to the parent before using \`insertBefore\`, falling back to append — so restore stays correct even if the list changed.` },
      { q: 'How do I change the undo window length?', a: `Edit the \`DURATION\` constant (milliseconds) and the \`4s\` in the \`sb-count\` CSS keyframe to match — the JS timer and the visual bar must use the same duration. Four to six seconds is the usual range: long enough to react, short enough not to block the workflow.` },
      { q: 'What happens if the user deletes many items in a row?', a: `This snippet keeps a single \`pending\` slot: each new delete commits the previous one immediately and shows a fresh snackbar for the newest item. If you need to undo multiple deletes, change \`pending\` to a stack/array, render a count ("3 items deleted"), and restore them in reverse order on undo.` },
      { q: 'How do I use this undo snackbar in React, Vue, or Angular?', a: `In React, keep the list in state and a \`pending\` item with its index in a ref; remove on delete, restore by splicing back on undo, and use a \`useEffect\` timeout to commit. In Vue, manage the list with \`ref\` and a \`setTimeout\` in the delete method. In Angular, hold the list and pending item on the component. The countdown bar and slide-in CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the deferred-delete lifecycle by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why deleteItem stores nextElementSibling rather than an array index, or why showSnack forces a reflow with void bar.offsetWidth before re-adding the run class to the progress bar. The same assistant can help optimize it, for instance checking whether the single-pending model correctly handles a rapid sequence of five or six deletes without losing any of them, or whether the aria-live region announces too often during fast successive deletes. It is just as useful for extending the pattern: ask it to change pending from one object to a stack so multiple deletes can each be undone independently, wire finalize() up to a real DELETE fetch call instead of just clearing state, or add a keyboard shortcut (like Ctrl+Z) that triggers undo() while the snackbar is visible. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Material-style "undo snackbar" for deleting list rows in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A list of rows, each with a delete button. Clicking delete must remove the row from the DOM immediately (instant, optimistic removal) while storing everything needed to restore it later: the detached DOM node itself, its original parent element, and specifically its original nextElementSibling reference (not a numeric index), so it can be reinserted at its exact original position even if other rows changed in the meantime.
- A snackbar element with role="status" and aria-live="polite" that slides up from the bottom of its container, showing the name of the just-deleted item and an Undo button.
- A progress bar inside the snackbar that visually counts down the undo window using a CSS transform: scaleX animation from full to zero over a fixed duration (e.g. 4 seconds) — animate transform, not width, so it stays compositor-smooth. Each time the snackbar reappears, restart this animation by removing its animation class, forcing a synchronous reflow by reading the element's offsetWidth, then re-adding the class — otherwise the browser will not replay an already-running CSS animation.
- Clicking Undo must cancel the pending auto-commit timer, reinsert the stored node using insertBefore relative to its stored next-sibling reference (falling back to appendChild if that sibling no longer exists in the parent), and play a brief restore highlight animation on the returned row.
- If the countdown timer expires without an undo, the delete becomes permanent — simply clear the pending state since the node is already removed from the DOM.
- If the user deletes a second row while a snackbar for a previous delete is still showing, immediately commit the first delete (finalize it, canceling its timer) and show a fresh snackbar targeting the new row — never allow two deletes to be pending undo at once.`,
    },
  },
};

export default snackbarUndo;
