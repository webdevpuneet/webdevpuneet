const pullToRefresh = {
  id: 'pull-to-refresh',
  title: 'Pull to Refresh',
  lastmod: '2026-06-16',
  category: 'loaders',
  html: `<div class="ptr-phone">
  <div class="ptr-bar">
    <span class="ptr-title">Inbox</span>
    <span class="ptr-hint">Pull down ↓</span>
  </div>
  <div class="ptr-scroll" id="ptrScroll">
    <div class="ptr-spinner" id="ptrSpinner">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.5"/></svg>
    </div>
    <div class="ptr-list" id="ptrList">
      <div class="ptr-item"><span class="ptr-av" style="background:#6366f1">A</span><div><div class="ptr-name">Ava Chen</div><div class="ptr-msg">Sent the design files 🎨</div></div><span class="ptr-time">9:41</span></div>
      <div class="ptr-item"><span class="ptr-av" style="background:#10b981">M</span><div><div class="ptr-name">Marco Diaz</div><div class="ptr-msg">Standup moved to 10am</div></div><span class="ptr-time">8:12</span></div>
      <div class="ptr-item"><span class="ptr-av" style="background:#f59e0b">S</span><div><div class="ptr-name">Sora Lee</div><div class="ptr-msg">Approved the budget ✅</div></div><span class="ptr-time">Yesterday</span></div>
      <div class="ptr-item"><span class="ptr-av" style="background:#ef4444">R</span><div><div class="ptr-name">Riya Patel</div><div class="ptr-msg">Can you review the PR?</div></div><span class="ptr-time">Yesterday</span></div>
      <div class="ptr-item"><span class="ptr-av" style="background:#0ea5e9">T</span><div><div class="ptr-name">Theo Park</div><div class="ptr-msg">Thanks for the help!</div></div><span class="ptr-time">Mon</span></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ptr-phone{width:300px;height:480px;background:#fff;border-radius:30px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,.45);display:flex;flex-direction:column;border:1px solid #e2e8f0}
.ptr-bar{padding:18px 18px 12px;display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid #f1f5f9;flex-shrink:0}
.ptr-title{font-size:20px;font-weight:800;color:#1e293b}
.ptr-hint{font-size:11px;color:#cbd5e1;font-weight:600}

.ptr-scroll{flex:1;overflow-y:auto;position:relative;-webkit-overflow-scrolling:touch}
.ptr-spinner{position:absolute;top:0;left:50%;transform:translate(-50%,-44px);width:36px;height:36px;border-radius:50%;background:#fff;box-shadow:0 2px 10px rgba(15,23,42,.12);display:flex;align-items:center;justify-content:center;opacity:0;z-index:2}
.ptr-spinner svg{transition:transform .05s linear}
.ptr-spinner.spin svg{animation:ptr-rot .7s linear infinite}
@keyframes ptr-rot{to{transform:rotate(360deg)}}

.ptr-list{transition:transform .25s cubic-bezier(.2,.8,.3,1);will-change:transform}
.ptr-list.dragging{transition:none}
.ptr-item{display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid #f6f8fb;background:#fff}
.ptr-item.fresh{animation:ptr-in .4s ease}
@keyframes ptr-in{from{opacity:0;transform:translateY(-8px);background:#eef2ff}to{opacity:1;transform:translateY(0)}}
.ptr-av{width:38px;height:38px;border-radius:50%;color:#fff;font-weight:800;font-size:15px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ptr-name{font-size:13px;font-weight:700;color:#1e293b}
.ptr-msg{font-size:12px;color:#94a3b8;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px}
.ptr-time{margin-left:auto;font-size:11px;color:#cbd5e1;align-self:flex-start;white-space:nowrap}`,

  js: `var scroll = document.getElementById('ptrScroll');
var list = document.getElementById('ptrList');
var spinner = document.getElementById('ptrSpinner');
var THRESHOLD = 70;
var startY = 0, pull = 0, dragging = false, refreshing = false;
var senders = [
  ['Nina Rao', 'New comment on your post', '#8b5cf6'],
  ['Leo Frost', 'Invoice #2042 is paid 💸', '#14b8a6'],
  ['Mia Vance', 'Liked your photo', '#f43f5e'],
  ['Owen Bly', 'Meeting notes attached', '#6366f1']
];
var pick = 0;

function onStart(e) {
  if (refreshing || scroll.scrollTop > 0) return;
  startY = (e.touches ? e.touches[0].clientY : e.clientY);
  dragging = true;
  list.classList.add('dragging');
}

function onMove(e) {
  if (!dragging) return;
  var y = (e.touches ? e.touches[0].clientY : e.clientY);
  pull = y - startY;
  if (pull <= 0) { pull = 0; return; }
  if (e.cancelable) e.preventDefault();
  var damped = Math.min(pull * 0.5, 90);
  list.style.transform = 'translateY(' + damped + 'px)';
  spinner.style.opacity = Math.min(1, damped / THRESHOLD);
  spinner.style.transform = 'translate(-50%,' + (damped - 44) + 'px)';
  spinner.querySelector('svg').style.transform = 'rotate(' + (damped * 4) + 'deg)';
}

function onEnd() {
  if (!dragging) return;
  dragging = false;
  list.classList.remove('dragging');
  list.style.transform = '';
  if (pull * 0.5 >= THRESHOLD) doRefresh();
  else { spinner.style.opacity = '0'; spinner.style.transform = 'translate(-50%,-44px)'; }
  pull = 0;
}

function doRefresh() {
  refreshing = true;
  spinner.classList.add('spin');
  spinner.style.opacity = '1';
  spinner.style.transform = 'translate(-50%,12px)';
  setTimeout(function () {
    var s = senders[pick % senders.length]; pick++;
    var item = document.createElement('div');
    item.className = 'ptr-item fresh';
    item.innerHTML = '<span class="ptr-av" style="background:' + s[2] + '">' + s[0][0] + '</span>' +
      '<div><div class="ptr-name">' + s[0] + '</div><div class="ptr-msg">' + s[1] + '</div></div>' +
      '<span class="ptr-time">now</span>';
    list.insertBefore(item, list.firstChild);
    spinner.classList.remove('spin');
    spinner.style.opacity = '0';
    spinner.style.transform = 'translate(-50%,-44px)';
    refreshing = false;
  }, 1100);
}

scroll.addEventListener('touchstart', onStart, { passive: true });
scroll.addEventListener('touchmove', onMove, { passive: false });
scroll.addEventListener('touchend', onEnd);
scroll.addEventListener('mousedown', onStart);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onEnd);`,

  seo: {
    title: 'Pull to Refresh — Mobile Gesture HTML CSS JS Snippet',
    description: `Mobile pull-to-refresh list — rubber-band drag, distance-rotated spinner, release threshold, and an animated fresh item. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Pull to Refresh — Rubber-Band Drag, Distance-Rotated Spinner & Release Threshold`,
      description: `Pull-to-refresh is one of the most recognised gestures in mobile UI — drag a list down past its top and release to reload. Getting it to feel native is all in the details: the content should follow the finger with resistance (a rubber-band effect), the spinner should reveal and rotate in proportion to how far you have pulled, and a release past a threshold should trigger the refresh while a release short of it should snap back. This snippet implements the complete gesture in plain HTML, CSS, and vanilla JavaScript, working with both touch and mouse so you can demo it on desktop.

**Guarding the gesture to the top**

The gesture must only start when the list is already scrolled to the top — otherwise dragging would fight normal scrolling. \`onStart\` checks \`scroll.scrollTop > 0\` and bails if the user is mid-list. It records the start Y coordinate from either \`e.touches[0].clientY\` (touch) or \`e.clientY\` (mouse), so the same handlers serve both input types.

**Rubber-band drag with damping**

\`onMove\` computes the raw pull distance, ignores upward movement, and applies a 0.5 damping factor (\`pull * 0.5\`) capped at 90px. That damping is what makes the pull feel elastic rather than 1:1 — the further you drag, the more resistance you feel, exactly like a native scroll view overscroll. During the drag the list gets a \`.dragging\` class that disables its CSS transition, so it tracks the finger instantly; on release the transition is restored so the snap-back animates smoothly. \`e.preventDefault()\` is called on the cancelable touch-move to stop the page from scrolling while pulling.

**Distance-mapped spinner**

The spinner's opacity ramps from 0 to 1 as the damped distance approaches the threshold, its vertical position follows the pull, and — the satisfying touch — its icon rotates proportionally to distance (\`distance * 4\` degrees). So the spinner visibly winds up as you pull, giving continuous feedback before you even release.

**Threshold, refresh, and animated insert**

On \`onEnd\`, if the damped pull crossed \`THRESHOLD\` (70px), \`doRefresh\` runs: the spinner locks into a CSS spin animation, holds at a fixed position, and after a simulated 1.1s load it prepends a new message that animates in with a highlighted \`.fresh\` keyframe, then hides the spinner. A release that did not cross the threshold simply fades the spinner out and lets the list snap back — no refresh.

Replace the \`setTimeout\` with your real data fetch and prepend the returned items. Pair this with an [infinite scroll](/ui-snippets/infinite-scroll/) list for load-more-at-bottom, a [skeleton loader](/ui-snippets/skeleton-loader/) during the fetch, or an [activity feed](/ui-snippets/activity-feed/) as the list content.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A phone-style "Inbox" with five message rows appears; the header hints "Pull down ↓".` },
      { title: 'Drag the list down', text: `Press and drag downward from the top — the list follows your finger with elastic resistance and a spinner reveals above it.` },
      { title: 'Watch the spinner wind up', text: `As you pull, the spinner fades in, moves down, and its icon rotates proportionally to how far you have dragged.` },
      { title: 'Release past the threshold', text: `Drag past about 70px and let go — the spinner locks into a continuous spin while a refresh runs.` },
      { title: 'See the fresh item', text: `After ~1.1s a new message is prepended to the top with a highlighted slide-in animation, and the spinner hides.` },
      { title: 'Release early', text: `Pull only a little and release — the spinner fades out and the list springs back with no refresh.` },
    ] },
    features: [
      { title: 'Touch and mouse support', text: `\`onStart\`/\`onMove\`/\`onEnd\` read from \`e.touches\` or \`e.clientY\`, so the same gesture works on phones and is demoable with a mouse on desktop.` },
      { title: 'Top-of-list guard', text: `The gesture only begins when \`scroll.scrollTop\` is 0, so pulling never conflicts with normal mid-list scrolling.` },
      { title: 'Rubber-band damping', text: `A 0.5 damping factor capped at 90px makes the pull feel elastic and resistant, mirroring native overscroll behaviour.` },
      { title: 'Transition toggle for instant tracking', text: `A \`.dragging\` class disables the list transition during the drag so it tracks the finger, then restores it for a smooth snap-back.` },
      { title: 'Distance-mapped spinner', text: `Spinner opacity, position, and icon rotation are all driven by pull distance, giving continuous wind-up feedback before release.` },
      { title: 'Release threshold logic', text: `\`onEnd\` triggers a refresh only when the damped distance crosses 70px; shorter pulls fade out and snap back.` },
      { title: 'Spin-and-load state', text: `On refresh the spinner locks into a CSS keyframe spin and holds position during the simulated fetch.` },
      { title: 'Animated fresh insert', text: `New items are prepended and animate in with a highlighted \`.fresh\` keyframe, making the reload visible and satisfying.` },
    ],
    useCases: [
      { title: 'Mobile message and email lists', text: `The canonical use — refresh an inbox or chat list with a pull. Use it to reload an [activity feed](/ui-snippets/activity-feed/) or notifications list.` },
      { title: 'Social and news feeds', text: `Pull to fetch the latest posts at the top, then pair with an [infinite scroll](/ui-snippets/infinite-scroll/) for older content below.` },
      { title: 'PWAs and hybrid apps', text: `Web apps wrapped as mobile apps expect this gesture; it gives a native-feeling refresh without a heavy gesture library.` },
      { title: 'Dashboard data reload', text: `Pull to refresh live metrics or order lists, showing a [skeleton loader](/ui-snippets/skeleton-loader/) while the new data loads.` },
      { title: 'Stock, crypto, and live tickers', text: `Manual refresh of fast-changing data where users want to force a fetch rather than wait for polling.` },
      { title: 'E-commerce order tracking', text: `Pull to re-check shipment status, updating an [order tracking timeline](/ui-snippets/order-tracking-timeline/) with the latest scan.` },
      { icon: 'CODE', title: 'Related: Suspense-Style Data Fetch Fallback', desc: 'See the [Suspense-Style Data Fetch Fallback](/ui-snippets/loader-suspense-fallback-card/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real data fetch?', a: `In \`doRefresh\`, replace the \`setTimeout\` with your request (\`fetch('/api/messages')\`). On resolve, prepend the returned items to the list and then hide the spinner. Keep the \`refreshing\` flag set until the request finishes so a second pull cannot start mid-refresh, and handle errors by hiding the spinner and showing a retry message.` },
      { q: 'Why apply damping instead of moving the list 1:1 with the finger?', a: `A 1:1 drag feels rigid and lets users pull the content arbitrarily far. The 0.5 damping (capped at 90px) creates the elastic resistance of a native scroll view — the list moves less the harder you pull — which signals the boundary and makes the threshold feel intentional rather than arbitrary.` },
      { q: 'How do I stop it from interfering with normal scrolling?', a: `The \`onStart\` guard only begins the gesture when \`scrollTop\` is 0, and \`onMove\` ignores upward movement. \`preventDefault\` is called only on the cancelable touch-move while actively pulling, so once the user scrolls into the list normally, native scrolling is untouched.` },
      { q: 'Is pull-to-refresh accessible for users who cannot perform the gesture?', a: `Always provide a non-gesture alternative: a visible "Refresh" button in the header that calls \`doRefresh\` directly. The gesture is an enhancement, not the only path. Announce new items via an \`aria-live="polite"\` region so screen-reader users hear that the list updated.` },
      { q: 'How do I use pull-to-refresh in React, Vue, or Angular?', a: `In React, attach the touch/mouse listeners in a \`useEffect\` with a ref to the scroll container and store pull distance in a ref (not state) to avoid re-renders per frame; clean up listeners on unmount. In Vue, use \`onMounted\`/\`onUnmounted\` and template refs. In Angular, bind in \`ngAfterViewInit\` with \`@ViewChild\`. The damping math and spinner CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the gesture math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why onMove multiplies the raw pull distance by a 0.5 damping factor and caps it at 90px instead of moving the list 1:1 with the finger, or how the .dragging class disabling the CSS transition during the drag and re-enabling it on release produces both instant tracking and a smooth snap-back from the same transform property. The same assistant can help optimize it, for instance checking whether the mousemove listener attached to the whole window is safe to leave running when the user isn't actively dragging, or whether preventDefault on touchmove could be scoped more precisely. It's just as useful for extending the gesture: ask it to replace the simulated setTimeout fetch with a real API call and error state, add a maximum-pull haptic-style bounce, or support a custom pull threshold per list. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile "pull to refresh" gesture in plain HTML, CSS, and JavaScript with no framework and no libraries, supporting both touch and mouse input.

Requirements:
- A scrollable list container and a spinner element absolutely positioned above the list's content, hidden (zero opacity) by default.
- Gesture handlers that read the starting Y coordinate from either e.touches[0].clientY (touch) or e.clientY (mouse) so the same start/move/end functions serve both input types, and that only begin tracking a pull when the scroll container's scrollTop is exactly 0 — the gesture must never engage while the user is scrolled into the middle of the list.
- During the drag, compute the raw distance pulled, ignore any upward movement, then apply a damping factor (roughly 0.5) and cap the result at a fixed maximum (e.g. 90px) before applying it as a translateY transform to the list — this damping must make the drag feel like it has increasing resistance rather than following the finger 1:1.
- While dragging, the list's CSS transition must be disabled (via a class toggle) so the transform tracks the pointer instantly; on release, the transition must be re-enabled so the list either snaps back to zero or animates to a fixed "refreshing" position.
- The spinner's opacity, vertical position, and icon rotation angle must all be derived continuously from the current damped pull distance during the drag, so it visibly winds up before the user even releases.
- On release, if the damped distance crossed a fixed threshold (e.g. 70px), lock the spinner into a continuous CSS spin animation, wait a short simulated delay, then prepend a new item to the top of the list with its own entrance animation before hiding the spinner; if the threshold was not crossed, simply fade the spinner out and let the list snap back with no refresh triggered.`,
    },
  },
};

export default pullToRefresh;
