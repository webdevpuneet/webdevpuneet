const swipeDeleteList = {
  id: 'swipe-delete-list',
  title: 'Swipe to Delete List',
  lastmod: '2026-06-13',
  category: 'mobile',
  html: `<div class="demo">
  <div class="panel">
    <div class="panel-header">
      <h2 class="panel-title">Notifications</h2>
      <span class="badge" id="badge">5</span>
    </div>

    <ul class="list" id="list">
      <li class="list-item" id="item-0">
        <div class="swipe-track" id="track-0">
          <div class="delete-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Delete
          </div>
          <div class="item-content">
            <div class="item-avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">JD</div>
            <div class="item-body">
              <div class="item-title">Jane Doe liked your post</div>
              <div class="item-sub">2 minutes ago</div>
            </div>
            <div class="item-dot unread"></div>
          </div>
        </div>
        <button class="del-btn" onclick="deleteItem('item-0')" title="Delete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </li>

      <li class="list-item" id="item-1">
        <div class="swipe-track" id="track-1">
          <div class="delete-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Delete
          </div>
          <div class="item-content">
            <div class="item-avatar" style="background:linear-gradient(135deg,#0ea5e9,#06b6d4)">AK</div>
            <div class="item-body">
              <div class="item-title">Alex Kim commented on your PR</div>
              <div class="item-sub">15 minutes ago</div>
            </div>
            <div class="item-dot unread"></div>
          </div>
        </div>
        <button class="del-btn" onclick="deleteItem('item-1')" title="Delete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </li>

      <li class="list-item" id="item-2">
        <div class="swipe-track" id="track-2">
          <div class="delete-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Delete
          </div>
          <div class="item-content">
            <div class="item-avatar" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">MP</div>
            <div class="item-body">
              <div class="item-title">Maria Perez shared a file with you</div>
              <div class="item-sub">1 hour ago</div>
            </div>
          </div>
        </div>
        <button class="del-btn" onclick="deleteItem('item-2')" title="Delete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </li>

      <li class="list-item" id="item-3">
        <div class="swipe-track" id="track-3">
          <div class="delete-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Delete
          </div>
          <div class="item-content">
            <div class="item-avatar" style="background:linear-gradient(135deg,#10b981,#059669)">TN</div>
            <div class="item-body">
              <div class="item-title">Tom Nelson merged your pull request</div>
              <div class="item-sub">3 hours ago</div>
            </div>
            <div class="item-dot unread"></div>
          </div>
        </div>
        <button class="del-btn" onclick="deleteItem('item-3')" title="Delete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </li>

      <li class="list-item" id="item-4">
        <div class="swipe-track" id="track-4">
          <div class="delete-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Delete
          </div>
          <div class="item-content">
            <div class="item-avatar" style="background:linear-gradient(135deg,#ec4899,#f43f5e)">SW</div>
            <div class="item-body">
              <div class="item-title">Sara White invited you to a project</div>
              <div class="item-sub">Yesterday</div>
            </div>
          </div>
        </div>
        <button class="del-btn" onclick="deleteItem('item-4')" title="Delete">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </li>
    </ul>

    <div class="empty-state" id="emptyState" style="display:none">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
      <p>All caught up!</p>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.demo { width: 100%; max-width: 360px; }
.panel { background: #fff; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); overflow: hidden; }
.panel-header { display: flex; align-items: center; gap: 8px; padding: 16px 18px 12px; border-bottom: 1px solid #f3f4f6; }
.panel-title { font-size: 15px; font-weight: 800; color: #111827; }
.badge { background: #ef4444; color: #fff; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 20px; }

/* List */
.list { list-style: none; }
.list-item { position: relative; border-bottom: 1px solid #f3f4f6; overflow: hidden; transition: max-height 0.35s ease, opacity 0.25s ease; max-height: 80px; }
.list-item:last-child { border-bottom: none; }
.list-item.removing { max-height: 0; opacity: 0; }

/* Swipe track */
.swipe-track { position: relative; display: flex; align-items: stretch; cursor: grab; user-select: none; touch-action: pan-y; }
.swipe-track.dragging { cursor: grabbing; }
.delete-bg { position: absolute; right: 0; top: 0; bottom: 0; background: #ef4444; display: flex; align-items: center; gap: 6px; padding: 0 16px; color: #fff; font-size: 11px; font-weight: 700; min-width: 80px; justify-content: center; }
.item-content { position: relative; display: flex; align-items: center; gap: 11px; padding: 12px 36px 12px 16px; background: #fff; width: 100%; transition: transform 0.15s ease; z-index: 1; }
.swipe-track.no-transition .item-content { transition: none; }

/* Item parts */
.item-avatar { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #fff; flex-shrink: 0; }
.item-body { flex: 1; min-width: 0; }
.item-title { font-size: 12px; font-weight: 600; color: #111827; line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-sub { font-size: 10px; color: #9ca3af; margin-top: 2px; }
.item-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.item-dot.unread { background: #3b82f6; }

/* Delete button (always visible on right) */
.del-btn { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 22px; height: 22px; border-radius: 50%; border: none; background: #f3f4f6; color: #9ca3af; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2; transition: background 0.12s, color 0.12s; }
.del-btn:hover { background: #fee2e2; color: #ef4444; }

/* Empty state */
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 40px 20px; }
.empty-state p { font-size: 13px; color: #9ca3af; font-weight: 600; }`,

  js: `var startX = 0, currentX = 0, activeTrack = null, THRESHOLD = 80;

function pointerDown(e, track) {
  activeTrack = track;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  currentX = 0;
  track.classList.add('no-transition', 'dragging');
  document.addEventListener('mousemove', pointerMove);
  document.addEventListener('mouseup', pointerUp);
  document.addEventListener('touchmove', pointerMove, { passive: false });
  document.addEventListener('touchend', pointerUp);
}
function pointerMove(e) {
  if (!activeTrack) return;
  var x = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
  currentX = Math.min(0, x);
  var content = activeTrack.querySelector('.item-content');
  var reveal = Math.min(Math.abs(currentX), THRESHOLD + 20);
  content.style.transform = 'translateX(' + currentX + 'px)';
  var bg = activeTrack.querySelector('.delete-bg');
  bg.style.opacity = Math.min(1, Math.abs(currentX) / THRESHOLD);
  if (e.cancelable) e.preventDefault();
}
function pointerUp() {
  if (!activeTrack) return;
  activeTrack.classList.remove('no-transition', 'dragging');
  var content = activeTrack.querySelector('.item-content');
  if (Math.abs(currentX) >= THRESHOLD) {
    var li = activeTrack.closest('.list-item');
    content.style.transform = 'translateX(-100%)';
    setTimeout(() => deleteItem(li.id), 250);
  } else {
    content.style.transform = '';
    var bg = activeTrack.querySelector('.delete-bg');
    bg.style.opacity = '';
  }
  activeTrack = null;
  document.removeEventListener('mousemove', pointerMove);
  document.removeEventListener('mouseup', pointerUp);
  document.removeEventListener('touchmove', pointerMove);
  document.removeEventListener('touchend', pointerUp);
}

// Attach swipe handlers
document.querySelectorAll('.swipe-track').forEach(function(track) {
  track.addEventListener('mousedown', function(e) { pointerDown(e, track); });
  track.addEventListener('touchstart', function(e) { pointerDown(e, track); }, { passive: true });
});

function deleteItem(id) {
  var li = document.getElementById(id);
  if (!li) return;
  li.classList.add('removing');
  setTimeout(function() {
    li.remove();
    updateBadge();
    checkEmpty();
  }, 380);
}
function updateBadge() {
  var count = document.querySelectorAll('.item-dot.unread').length;
  var badge = document.getElementById('badge');
  badge.textContent = count;
  badge.style.display = count > 0 ? '' : 'none';
}
function checkEmpty() {
  var items = document.querySelectorAll('.list-item');
  if (items.length === 0) {
    document.getElementById('emptyState').style.display = 'flex';
  }
}`,

  seo: {
    title: 'Swipe to Delete List — Touch Gesture HTML CSS JS Snippet',
    description: 'Swipe-to-delete list with touch and mouse drag, threshold delete, smooth collapse, and an unread badge. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: `Swipe-to-Delete List — Touch & Mouse Drag, Threshold Delete & Collapse Animation`,
      description: `Swipe-to-delete is the dominant gesture pattern for list management on mobile — popularised by iOS Mail and Android Gmail, it lets users dismiss items with a natural leftward swipe without needing a separate edit mode or confirmation dialog. This snippet implements a full swipe-to-delete notification list that works on both touch (mobile) and mouse (desktop drag), with a threshold-based delete trigger, smooth height collapse animation, and an unread count badge.\n\n**Pointer event architecture: unified touch + mouse**\n\nThe gesture handler listens for both \`touchstart\`/\`touchmove\`/\`touchend\` and \`mousedown\`/\`mousemove\`/\`mouseup\`. This single-handler approach avoids \`PointerEvents\` API (which has quirks with passive listeners on iOS) while covering all input types. The key trick: \`mousemove\` and \`mouseup\` listeners are attached to \`document\` on drag start (not on the element), so the drag continues even if the cursor leaves the list item during fast movement.\n\n**Threshold detection and snap behaviour**\n\nThe reveal distance is tracked in \`currentX\` (clamped to \`Math.min(0, x)\` — left-only swipe). When \`pointerUp\` fires, if \`Math.abs(currentX) >= THRESHOLD\` (80px), the item is committed to deletion: the content is animated to \`translateX(-100%)\` then \`deleteItem()\` fires after 250ms. If below threshold, the item snaps back to \`translateX(0)\`. The delete background opacity is driven by progress: \`Math.min(1, Math.abs(currentX) / THRESHOLD)\`, so it fades in proportionally to swipe distance.\n\n**Height collapse animation**\n\nWhen an item is deleted, the \`.removing\` class is added which sets \`max-height: 0\` and \`opacity: 0\` (with CSS transitions). After 380ms (matching the transition duration), \`li.remove()\` is called to clean up the DOM. This \`max-height\` collapse technique is a CSS-only approach to height transitions — animating \`height\` from a computed value is impossible, but animating from a known max down to 0 works in all browsers.\n\n**Unread dot and badge**\n\nItems with unread notifications have a \`.item-dot.unread\` element (a small blue circle). After each deletion, \`updateBadge()\` counts remaining \`.unread\` dots and updates the badge number. If count reaches 0, the badge is hidden. This is a realistic implementation pattern for notification UIs.\n\n**\`no-transition\` class during drag**\n\nDuring active drag, the \`.no-transition\` class is added to the swipe track, which sets \`transition: none\` on \`.item-content\`. Without this, every pixel of drag movement would trigger a CSS transition, causing a laggy "rubber band" effect. The transition is only re-enabled on pointer release, so the snap-back and delete animations run smoothly.\n\n**React integration**\n\nIn React, maintain \`items\` array in state. Each item has an \`id\` and \`removing\` boolean. Swipe handlers update a \`swipeOffsets\` ref (not state, to avoid re-renders during drag). On \`pointerUp\`, check threshold and call \`setItems(prev => prev.filter(i => i.id !== id))\`. Use \`useRef\` for the drag state. Apply \`className={removing ? 'removing' : ''}\` on the list item. Use a \`useEffect\` cleanup to remove document event listeners on unmount.\n\nSee also the [checkout form snippet](/ui-snippets/checkout-form/) for form step UX patterns, the [progress wizard snippet](/ui-snippets/progress-wizard/) for multi-step flows, and the [floating chat widget snippet](/ui-snippets/floating-chat-widget/) for notification-style overlays.`
    },
    howToUse: [
      { title: 'Copy all three blocks', text: 'Paste the HTML, CSS, and JS. Five notification items render in a card panel with gradient avatars and timestamps.' },
      { title: 'Try swipe on mobile', text: 'On a touch device, swipe any item left. A red delete background reveals beneath. Swipe past 80px to trigger deletion, or release early to snap back.' },
      { title: 'Try drag on desktop', text: 'Click and drag an item to the left with your mouse. The same threshold logic applies — drag past 80px to delete.' },
      { title: 'Use the X button', text: 'Each item has a small X button on the right for click-to-delete without swiping — useful for mouse-first users.' },
      { title: 'Watch the badge update', text: 'The red notification badge counts unread items (those with blue dots). It decrements as unread items are deleted.' },
      { title: 'Dismiss all items', text: 'Delete all five items to reveal the empty state — a grey icon and "All caught up!" message.' }
    ],
    features: [
      'Unified touch + mouse drag handling — works on mobile and desktop',
      'Threshold-based commit (80px) with snap-back below threshold',
      'Red delete reveal background with opacity proportional to swipe distance',
      'max-height collapse animation for smooth item removal',
      'Unread dot system with live badge count updates',
      'Click-to-delete X button alongside swipe gesture',
      'Empty state when all items are dismissed',
      'no-transition during drag prevents rubber-band lag'
    ],
    useCases: [
      { icon: '🔔', title: 'Notification panels', desc: 'Let users dismiss alerts with a natural leftward swipe, with a red reveal behind the row growing in opacity as the finger moves further.' },
      { icon: '✅', title: 'To-do and task lists', desc: 'Swipe to complete or discard tasks without an edit mode, snapping back below the 80 px threshold so accidental brushes do nothing.' },
      { icon: '📧', title: 'Email inbox interfaces', desc: 'Recreate the Gmail-style swipe to archive or delete, with a smooth `max-height` collapse closing the gap left by the removed message.' },
      { icon: '💬', title: 'Chat message lists', desc: 'Delete conversations or messages with one gesture, using unified touch and mouse drag handling so desktop reviewers can try it too.' },
      { icon: '🔢', title: 'Unread badge handling', desc: 'Keep a running unread badge accurate as rows disappear, showing how list state and counts stay in step after every removal.' },
    ],
    faqs: [
      { q: 'How do I add a swipe-right action (like "archive")?', a: 'Extend the handler to track positive currentX values. Add an archive-bg div on the left side. When swipe right exceeds threshold, trigger archive instead of delete. Use green for archive, red for delete.' },
      { q: 'How do I add an undo snackbar after deletion?', a: 'On delete, instead of immediately removing the item, mark it as removed in state but keep it in the DOM for 5 seconds. Show a "Undo" snackbar. If undo clicked, un-mark it. After 5s with no undo, call the actual delete API.' },
      { q: 'How do I use this in React?', a: 'Use useRef for drag state (not useState — avoid re-renders during drag). Attach event listeners via useEffect. Store item removal in useState with a removing flag for the CSS animation, then filter the item from state after the animation duration.' },
      { q: 'How do I prevent swipe from conflicting with page scroll?', a: 'Call e.preventDefault() inside touchmove only when horizontal movement exceeds ~5px (to distinguish horizontal swipe from vertical scroll). Check Math.abs(deltaX) > Math.abs(deltaY) before starting the swipe gesture.' },
      { q: 'How do I export this swipe list to Vue, Angular, or Tailwind?', a: 'Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the row and delete-background styles become utility classes, a Vue 3 single-file component, and an Angular standalone component. Each converter preserves the markup, the collapse animation, and the touch/mouse drag behaviour, so the gesture works identically across React, Vue, and Angular. In React, keep the live drag offset in a useRef so dragging does not trigger re-renders, attach the pointer listeners in useEffect, and only move item removal into useState when you run the collapse animation — the same pattern maps to onMounted in Vue and ngAfterViewInit in Angular.' },
      { q: 'How do I make swipe-to-delete accessible for keyboard and screen readers?', a: 'Swipe gestures are not keyboard accessible on their own, so reveal a real delete button on each row when it receives focus and wire it to the same delete function. Give each row role="listitem" inside a role="list" container, label the delete control with aria-label, and announce removals through an aria-live="polite" region so screen-reader users hear "Notification deleted" when an item disappears.' }
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the drag-to-delete math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why currentX is clamped with Math.min(0, x) to allow only leftward movement, and how the no-transition class prevents the rubber-band lag that would otherwise appear on every pixel of drag. The same assistant can help optimize it — for instance whether attaching mousemove and mouseup to document on every single pointerDown call (rather than once globally) scales well with a long list, or whether the max-height collapse animation's fixed 80px value should instead be measured from each item's real rendered height. It's also useful for extending the list: ask it to add a swipe-right "archive" action alongside delete, show an undo snackbar for a few seconds before actually removing an item, or persist the remaining notifications to storage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "swipe to delete" notification list in plain HTML, CSS, and JavaScript using unified mouse and touch drag handling — no gesture library, no framework.

Requirements:
- A list of items, each containing a red delete-background layer positioned absolutely behind the row and a foreground content layer (avatar, title, timestamp) that sits on top and gets dragged.
- Track horizontal drag distance from a pointerdown/touchstart start position, clamping the value so only leftward movement (negative offsets) has any effect — rightward drags must do nothing.
- While dragging, translateX the foreground content by the clamped drag distance in real time, and fade in the delete background's opacity proportional to how far the drag has progressed toward a fixed pixel threshold (e.g. 80px).
- During an active drag, disable the CSS transition on the foreground content (add a "no transition" state) so the row follows the pointer with zero lag, then re-enable the transition the moment the drag ends so the snap-back or delete-commit animation is smooth.
- On release, if the drag distance met or exceeded the threshold, animate the content fully off-screen to the left and then remove the item; if it fell short, animate the content back to its resting position and fade the delete background back to invisible.
- Deleting an item (whether via swipe-commit or a separate always-visible small delete button) must first collapse the row's max-height to zero with a CSS transition and fade its opacity out, and only remove the element from the DOM after that collapse transition finishes.
- Maintain an unread-count badge at the top of the list that recalculates by counting a specific unread-indicator class among remaining items every time an item is deleted, hiding the badge entirely when the count reaches zero, and show a distinct empty state once every item has been removed.`,
    },
  }
};

export default swipeDeleteList;
