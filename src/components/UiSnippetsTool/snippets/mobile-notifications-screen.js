const mobileNotificationsScreen = {
  id: 'mobile-notifications-screen',
  title: 'Mobile Notifications Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="mnt-phone">
  <div class="mnt-screen">
    <div class="mnt-status"><span>9:41</span><span class="mnt-batt"><i></i></span></div>
    <header class="mnt-head">
      <h1>Notifications</h1>
      <button class="mnt-clear" id="mntClear">Mark all read</button>
    </header>

    <div class="mnt-scroll" id="mntList">
      <div class="mnt-grp">
        <div class="mnt-gh">New</div>
        <div class="mnt-item unread" data-id="1"><span class="mnt-ic i1">❤</span><div class="mnt-body"><p><b>Theo</b> liked your post</p><small>2 min ago</small></div><span class="mnt-dot"></span></div>
        <div class="mnt-item unread" data-id="2"><span class="mnt-ic i2">💬</span><div class="mnt-body"><p><b>Sana</b> commented: "Love this!"</p><small>18 min ago</small></div><span class="mnt-dot"></span></div>
        <div class="mnt-item unread" data-id="3"><span class="mnt-ic i3">👤</span><div class="mnt-body"><p><b>Leo</b> started following you</p><small>1 hr ago</small></div><span class="mnt-dot"></span></div>
      </div>
      <div class="mnt-grp">
        <div class="mnt-gh">Earlier</div>
        <div class="mnt-item" data-id="4"><span class="mnt-ic i4">⭐</span><div class="mnt-body"><p>Your weekly summary is ready</p><small>Yesterday</small></div></div>
        <div class="mnt-item" data-id="5"><span class="mnt-ic i5">🎁</span><div class="mnt-body"><p><b>3 friends</b> joined this week</p><small>Yesterday</small></div></div>
        <div class="mnt-item" data-id="6"><span class="mnt-ic i1">❤</span><div class="mnt-body"><p><b>Iva</b> and 12 others liked your comment</p><small>Mar 9</small></div></div>
      </div>
      <p class="mnt-empty" id="mntEmpty" hidden>You're all caught up 🎉<br><span>No new notifications</span></p>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.mnt-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.mnt-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#f1f5f9;color:#0f172a;display:flex;flex-direction:column}
.mnt-status{display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700}
.mnt-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block}
.mnt-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.mnt-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:70%;background:currentColor;border-radius:1px}

.mnt-head{display:flex;align-items:center;justify-content:space-between;padding:8px 16px 12px}
.mnt-head h1{font-size:22px;font-weight:800}
.mnt-clear{background:none;border:none;color:#6366f1;font-size:12.5px;font-weight:700;cursor:pointer}
.mnt-clear:disabled{color:#cbd5e1;cursor:default}

.mnt-scroll{flex:1;overflow-y:auto;padding:0 14px 16px;scrollbar-width:none;-ms-overflow-style:none}
.mnt-scroll::-webkit-scrollbar{display:none}
.mnt-gh{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#94a3b8;padding:8px 4px 6px}
.mnt-item{display:flex;align-items:center;gap:12px;background:#fff;border-radius:13px;padding:12px 13px;margin-bottom:8px;cursor:pointer;position:relative;transition:transform .18s ease,opacity .18s ease,background .15s}
.mnt-item.unread{background:#eef2ff}
.mnt-item.swipe{transform:translateX(-110%);opacity:0}
.mnt-ic{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;color:#fff}
.i1{background:#f43f5e}.i2{background:#6366f1}.i3{background:#0ea5e9}.i4{background:#f59e0b}.i5{background:#22c55e}
.mnt-body{flex:1}
.mnt-body p{font-size:12.5px;line-height:1.35;color:#334155}
.mnt-body b{color:#0f172a;font-weight:700}
.mnt-body small{font-size:10.5px;color:#94a3b8;display:block;margin-top:3px}
.mnt-dot{width:9px;height:9px;border-radius:50%;background:#6366f1;flex-shrink:0}
.mnt-empty{text-align:center;color:#0f172a;font-size:15px;font-weight:700;padding:50px 16px;line-height:1.8}
.mnt-empty span{font-size:12px;color:#94a3b8;font-weight:500}`,

  js: `var list = document.getElementById('mntList');
var clearBtn = document.getElementById('mntClear');
var empty = document.getElementById('mntEmpty');

function updateState(){
  var remaining = list.querySelectorAll('.mnt-item').length;
  var unread = list.querySelectorAll('.mnt-item.unread').length;
  clearBtn.disabled = unread === 0;
  empty.hidden = remaining > 0;
  // hide empty group headers
  list.querySelectorAll('.mnt-grp').forEach(function(grp){
    grp.style.display = grp.querySelector('.mnt-item') ? '' : 'none';
  });
}

// tap to mark a single item read
list.addEventListener('click', function(e){
  var item = e.target.closest('.mnt-item');
  if (!item) return;
  if (item.classList.contains('unread')){
    item.classList.remove('unread');
    var dot = item.querySelector('.mnt-dot');
    if (dot) dot.remove();
    updateState();
  }
});

// mark all read
clearBtn.addEventListener('click', function(){
  list.querySelectorAll('.mnt-item.unread').forEach(function(item){
    item.classList.remove('unread');
    var dot = item.querySelector('.mnt-dot');
    if (dot) dot.remove();
  });
  updateState();
});

// double-click to dismiss (swipe-away)
list.addEventListener('dblclick', function(e){
  var item = e.target.closest('.mnt-item');
  if (!item) return;
  item.classList.add('swipe');
  setTimeout(function(){ item.remove(); updateState(); }, 200);
});

updateState();`,

  seo: {
    title: 'Mobile Notifications Screen — Free HTML CSS JS UI',
    description: `A grouped notifications inbox with unread highlights, tap-to-read, mark-all-read, and swipe-to-dismiss. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Notifications Screen — Activity Inbox UI',
      description: `A notifications screen is a grouped inbox of activity — new items highlighted, older ones grouped below, each dismissible, with a "mark all read" shortcut and an empty state when you are caught up. This snippet builds a complete, interactive one inside a CSS phone frame: tapping an item marks it read, double-tapping dismisses it with a swipe-away, mark-all-read clears every unread dot at once, and empty groups and the whole list resolve to a friendly caught-up message — in HTML, CSS, and vanilla JavaScript with no dependency.

**Grouped, with unread state**

Notifications are split into "New" and "Earlier" groups. Unread items carry an \`unread\` class that tints their card and shows a blue dot on the right; read items are plain white with no dot. This two-tier styling is the standard way inboxes separate what needs attention from what you have already seen, and it is driven by a single class so the state is easy to flip.

**Tap to read, one delegated listener**

Instead of binding a handler to every row, a single click listener on the list uses \`event.target.closest('.mnt-item')\` to find which notification was tapped — event delegation, so newly added items would work automatically and there is only one listener to manage. Tapping an unread item removes its class and its dot, then re-evaluates the screen state.

**Mark all read and a smart button**

The header button clears the unread class and dot from every item at once. It also disables itself when there is nothing unread left, using the \`:disabled\` state to grey out — so the control accurately reflects whether there is anything to act on, rather than sitting active over an already-read inbox.

**Swipe-to-dismiss and self-healing groups**

Double-tapping a notification adds a \`swipe\` class that slides it off to the left and fades it, then removes it from the DOM after the transition. A shared \`updateState()\` function then hides any group whose items are all gone and reveals the all-caught-up empty state when the list is finally empty — so the screen never shows a stranded group header or a blank void.

**Accessibility and performance**

The mark-all-read control is a real \`<button>\` that disables itself when there is nothing unread, so its state is exposed to assistive tech through the native \`disabled\` attribute rather than styling alone. When you adapt this, make each notification a button or link so it is keyboard-focusable, reinforce the unread state with text — a "new" label or the count in the group header — rather than relying on the blue tint and dot, and announce changes through an \`aria-live\` region so marking read or dismissing is spoken. Performance is a deliberate win of the delegation approach: a single click listener on the list handles every current and future row via \`closest()\`, so there are no per-item listeners to attach or clean up, and marking read toggles one class and removes one dot node. Dismissal animates with a CSS transition and removes the node on completion, and \`updateState()\` does a couple of cheap \`querySelectorAll\` counts. For a very large inbox you would paginate or virtualize, but the delegated model already scales far past a typical screen of notifications.

**Reusing it**

Feed notifications from your API, persist read state, and replace the double-tap dismiss with a real swipe gesture using Pointer Events if you want touch-drag. Lift the list out of the phone frame for a responsive web notification center, or keep it framed beside a [notification center](/ui-snippets/notification-center/) panel to present a full activity feed.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A grouped notifications inbox renders with New and Earlier sections.` },
      { title: 'Tap an unread item', text: `Its tinted highlight and blue dot clear as it becomes read.` },
      { title: 'Mark all read', text: `The header button clears every unread dot at once, then disables itself.` },
      { title: 'Double-tap to dismiss', text: `A notification slides off to the left and is removed from the list.` },
      { title: 'Empty a group', text: `When a group's items are all gone, its header disappears too.` },
      { title: 'Clear everything', text: `Dismiss all notifications and an all-caught-up empty state appears.` },
    ] },
    features: [
      { title: 'Grouped inbox', text: `New and Earlier sections with headers.` },
      { title: 'Unread highlights', text: `Tinted cards and a dot for unseen items.` },
      { title: 'Event delegation', text: `One list listener via closest().` },
      { title: 'Tap to read', text: `Clears the highlight and dot per item.` },
      { title: 'Mark all read', text: `Clears every unread at once.` },
      { title: 'Smart clear button', text: `Disables when nothing is unread.` },
      { title: 'Swipe-to-dismiss', text: `Double-tap slides an item away.` },
      { title: 'Self-healing groups', text: `Empty headers and list resolve to a caught-up state.` },
    ],
    useCases: [
      { title: 'Activity inboxes', text: `The screen behind a [notification center](/ui-snippets/notification-center/).` },
      { title: 'Social apps', text: `Pair with a [mobile feed screen](/ui-snippets/mobile-feed-screen/).` },
      { title: 'Badge counts', text: `Feed the unread total into a [notification badge](/ui-snippets/notification-badge/).` },
      { title: 'Dismiss patterns', text: `A tap take on a [swipe delete list](/ui-snippets/swipe-delete-list/).` },
      { title: 'App mockups', text: `Present it inside a [phone mockup](/ui-snippets/phone-mockup/).` },
      { title: 'Learning delegation', text: `A reference for delegated list interactions.` },
      { icon: 'CODE', title: 'Related: Mobile Keyboard Guide — Correct inputmode/type/pattern Per Field', desc: 'See the [Mobile Keyboard Guide — Correct inputmode/type/pattern Per Field](/ui-snippets/mobile-inputmode-keyboard-guide/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does one listener handle taps on every notification?', a: `The click handler is bound once to the list container and uses event.target.closest('.mnt-item') to find which row was tapped. This is event delegation: it works for any current or future item without per-row listeners, and there is only one handler to reason about. Tapping an unread item removes its class and dot.` },
      { q: 'Why does the mark-all-read button grey out?', a: `After any read or dismiss action, updateState counts remaining unread items and disables the button when that count is zero, styled via the :disabled state. This keeps the control honest — it is only tappable when there is actually something unread to clear, rather than sitting active over an already-read inbox.` },
      { q: 'How does swipe-to-dismiss work here?', a: `Double-tapping a notification adds a swipe class that translates it off the left edge and fades it out, and after the transition it is removed from the DOM. To support a real drag gesture, replace the double-click with Pointer Events that track horizontal movement and commit the dismiss past a threshold.` },
      { q: 'What keeps empty group headers from lingering?', a: `The shared updateState function runs after every change. It hides any group whose item list is empty and reveals the all-caught-up message when no items remain. That way you never see a stranded New or Earlier header with nothing under it, and an emptied inbox shows a friendly state instead of a blank area.` },
      { q: 'How do I use this notifications screen in React, Vue, or Angular?', a: `Hold notifications as an array with read flags and render grouped by section. Mark read by updating the item's flag and dismiss by filtering it out of state rather than removing DOM nodes. Derive the disabled button and empty state from the array. For dismissal animation, animate on exit with a transition group. Tailwind expresses the cards and highlights with utilities.` },
      { q: 'How would I add a swipe-to-dismiss gesture instead of double-tap?', a: `Track pointer events on each row: record the start x on pointerdown, translate the row by the horizontal delta on pointermove, and on pointerup either snap it back if the drag was small or commit the dismiss if it passed a threshold like a third of the width. Reuse the existing swipe class transition for the commit animation so the row slides fully off and is then removed. Keep the double-tap or a visible delete button as a fallback for keyboard and assistive users.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace every branch of updateState by hand to know what it touches. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the single delegated click listener on mntList uses event.target.closest instead of binding per-row handlers, or how the swipe class's transition and the setTimeout removal are kept in sync so an item never gets yanked from the DOM mid-animation. The same assistant can help optimize it — for instance checking whether querySelectorAll('.mnt-item') on every updateState call becomes a cost at hundreds of rows, and whether a running unread counter would be cheaper than recounting the DOM each time. It is just as useful for extending the behavior: ask it to swap the double-tap dismiss for a real Pointer Events swipe-to-delete, add an undo toast after dismissal, or group notifications by sender instead of by New and Earlier. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile "notifications inbox" screen in plain HTML, CSS, and JavaScript using only DOM APIs and event delegation — no frameworks, no per-item listeners.

Requirements:
- A scrollable list of notification rows grouped under section headers (e.g. "New" and "Earlier"), where unread rows carry a distinct highlighted background and a small unread dot, and read rows are plain.
- Bind exactly one click listener on the list container, not on individual rows, and use event.target.closest to identify which row was tapped. Tapping an unread row must remove its unread styling and its dot.
- Add a "mark all read" button in the header that clears the unread state from every row in one action, and that becomes disabled (using the native disabled attribute, not just a CSS class) whenever there is nothing left unread.
- Support dismissing a row: on double-click (or a real swipe gesture if you choose to go further), add a class that animates the row sliding out and fading via a CSS transition, then remove it from the DOM only after that transition's duration has elapsed via setTimeout, not before.
- After every state change (read, mark-all, dismiss), run one shared update function that: hides any section header whose group no longer has notifications, and reveals a friendly empty state message once the entire list is empty.
- Keep notification icons and copy data-driven (id, icon, text, timestamp) so new items can be appended without any changes to the interaction code.`,
    },
  },
};

export default mobileNotificationsScreen;
