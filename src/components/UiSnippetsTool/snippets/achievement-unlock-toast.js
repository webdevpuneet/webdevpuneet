const achievementUnlockToast = {
  id: 'achievement-unlock-toast',
  title: 'Achievement Unlock Toast',
  lastmod: '2026-08-08',
  category: 'modals',
  html: `<div class="wrap">
  <div class="demo-controls">
    <div class="demo-label">Fire achievements (click fast to test the queue)</div>
    <div class="demo-buttons">
      <button class="demo-btn" data-ach="0">First Blood</button>
      <button class="demo-btn" data-ach="1">Speedrunner</button>
      <button class="demo-btn" data-ach="2">Completionist</button>
      <button class="demo-btn demo-btn-all" id="fire-all">Fire All 3 At Once</button>
    </div>
  </div>

  <div class="toast-slot" id="toast-slot"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 32px; display: flex; align-items: center; justify-content: center; }

.wrap { width: 100%; max-width: 420px; position: relative; min-height: 260px; }

.demo-label { font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 10px; }
.demo-buttons { display: flex; flex-wrap: wrap; gap: 8px; }
.demo-btn { font-size: 12.5px; font-weight: 600; padding: 9px 14px; border-radius: 9px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: border-color 0.15s, transform 0.1s; }
.demo-btn:hover { border-color: #6366f1; color: #4f46e5; }
.demo-btn:active { transform: scale(0.96); }
.demo-btn-all { background: #6366f1; border-color: #6366f1; color: #fff; }
.demo-btn-all:hover { background: #4f46e5; color: #fff; }

.toast-slot { position: absolute; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; pointer-events: none; }

.ach-toast { pointer-events: all; width: 100%; max-width: 360px; background: linear-gradient(135deg, #1e1b3a, #171429); border-radius: 16px; padding: 14px 16px 14px 14px; display: flex; align-items: center; gap: 12px; box-shadow: 0 20px 50px rgba(30, 27, 58, 0.35); border: 1px solid rgba(255,255,255,0.08); position: relative; overflow: hidden; cursor: pointer; opacity: 0; transform: scale(0.6) translateY(10px); }

.ach-toast.enter { animation: achIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.ach-toast.leave { animation: achOut 0.28s ease-in forwards; }

@keyframes achIn { 0% { opacity: 0; transform: scale(0.55) translateY(14px); } 60% { opacity: 1; transform: scale(1.06) translateY(-2px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes achOut { 0% { opacity: 1; transform: scale(1) translateY(0); } 100% { opacity: 0; transform: scale(0.85) translateY(-8px); } }

.ach-badge-wrap { position: relative; width: 46px; height: 46px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.ach-badge { width: 46px; height: 46px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #ffe28a, #f5a623 65%, #d1790a); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 3px rgba(245,166,35,0.22), 0 4px 14px rgba(245,166,35,0.4); animation: badgeSpin 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes badgeSpin { 0% { transform: scale(0) rotate(-140deg); } 70% { transform: scale(1.15) rotate(12deg); } 100% { transform: scale(1) rotate(0deg); } }
.ach-badge svg { color: #4a2a05; }

.spark { position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; border-radius: 50%; background: #ffd166; opacity: 0; }
.spark.go { animation: sparkFly 0.7s ease-out forwards; }
@keyframes sparkFly { 0% { opacity: 1; transform: translate(-50%, -50%) translate(0,0) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--sx), var(--sy)) scale(0.2); } }

.ach-body { flex: 1; min-width: 0; }
.ach-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fbbf24; margin-bottom: 2px; }
.ach-title { font-size: 14.5px; font-weight: 700; color: #fff; line-height: 1.25; }
.ach-desc { font-size: 12px; color: #b6b2d6; margin-top: 2px; line-height: 1.4; }

.ach-progress-track { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: rgba(255,255,255,0.08); }
.ach-progress-fill { height: 100%; background: linear-gradient(90deg, #fbbf24, #f97316); width: 100%; transform-origin: left; }
.ach-progress-fill.run { animation: progressDrain linear forwards; }
@keyframes progressDrain { from { transform: scaleX(1); } to { transform: scaleX(0); } }

.queue-count { position: absolute; top: 8px; right: 10px; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.35); }`,
  js: `var ACHIEVEMENTS = [
  { icon: 'trophy', title: 'First Blood', desc: 'Complete your very first task.' },
  { icon: 'bolt', title: 'Speedrunner', desc: 'Finish a level in under 60 seconds.' },
  { icon: 'star', title: 'Completionist', desc: 'Unlock every achievement in the game.' }
];

var ICONS = {
  trophy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4a2 2 0 0 0 2 3.5"/><path d="M17 5h3a2 2 0 0 1-2 3.5"/></svg>',
  bolt: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  star: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.63 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.63 12 2"/></svg>'
};

var queue = [];
var isShowing = false;
var AUTO_DISMISS_MS = 3600;

function queueAchievement(data) {
  queue.push(data);
  tryShowNext();
}

function tryShowNext() {
  if (isShowing) return;
  if (queue.length === 0) return;
  var data = queue.shift();
  isShowing = true;
  showToast(data);
}

function showToast(data) {
  var slot = document.getElementById('toast-slot');
  var toast = document.createElement('div');
  toast.className = 'ach-toast enter';

  var sparkHtml = '';
  for (var i = 0; i < 10; i++) {
    var angle = (Math.PI * 2 * i) / 10;
    var dist = 34 + (i % 3) * 8;
    var sx = Math.cos(angle) * dist;
    var sy = Math.sin(angle) * dist;
    sparkHtml += '<span class="spark" style="--sx:' + sx.toFixed(1) + 'px; --sy:' + sy.toFixed(1) + 'px; animation-delay:' + (i * 18) + 'ms"></span>';
  }

  toast.innerHTML =
    '<div class="queue-count" id="queue-count"></div>' +
    '<div class="ach-badge-wrap">' +
      '<div class="ach-badge">' + ICONS[data.icon] + '</div>' +
      sparkHtml +
    '</div>' +
    '<div class="ach-body">' +
      '<div class="ach-eyebrow">Achievement Unlocked</div>' +
      '<div class="ach-title">' + data.title + '</div>' +
      '<div class="ach-desc">' + data.desc + '</div>' +
    '</div>' +
    '<div class="ach-progress-track"><div class="ach-progress-fill" id="progress-fill"></div></div>';

  slot.innerHTML = '';
  slot.appendChild(toast);
  updateQueueCount();

  requestAnimationFrame(function () {
    var sparks = toast.querySelectorAll('.spark');
    sparks.forEach(function (s) { s.classList.add('go'); });
    var fill = document.getElementById('progress-fill');
    fill.style.animationDuration = AUTO_DISMISS_MS + 'ms';
    fill.classList.add('run');
  });

  var dismissTimer = setTimeout(function () { dismiss(toast); }, AUTO_DISMISS_MS);

  toast.addEventListener('click', function () {
    clearTimeout(dismissTimer);
    dismiss(toast);
  });
}

function dismiss(toast) {
  if (!toast || !toast.parentNode) return;
  toast.classList.remove('enter');
  toast.classList.add('leave');
  toast.addEventListener('animationend', function handler() {
    toast.removeEventListener('animationend', handler);
    if (toast.parentNode) toast.parentNode.removeChild(toast);
    isShowing = false;
    tryShowNext();
  });
}

function updateQueueCount() {
  var el = document.getElementById('queue-count');
  if (!el) return;
  el.textContent = queue.length > 0 ? ('+' + queue.length + ' queued') : '';
}

document.querySelectorAll('.demo-btn[data-ach]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var idx = Number(btn.getAttribute('data-ach'));
    queueAchievement(ACHIEVEMENTS[idx]);
  });
});

document.getElementById('fire-all').addEventListener('click', function () {
  ACHIEVEMENTS.forEach(function (a) { queueAchievement(a); });
});`,
  seo: {
    title: 'Achievement Unlock Toast — Free HTML CSS JS Snippet',
    description: 'Game-style unlock toast with spring entrance, spark burst and a FIFO queue that shows the next achievement only after the current one dismisses. Exports to React & Vue.',
    about: {
      title: 'Achievement Unlock Toast — Queued Game-Style Notification Toast in Vanilla JS',
      description: `Games like Steam, Xbox, and PlayStation solved a UI problem long before web apps needed to: what happens when the user does two things worth celebrating within the same second? If both toasts render at once, they overlap and neither is readable. If the second replaces the first mid-animation, the player never actually sees what they earned. The correct answer, used by every console overlay, is a queue — one toast on screen at a time, everything else waits its turn. This snippet implements exactly that pattern with a plain JavaScript array and a boolean lock, no external state library, and applies it to a celebratory "Achievement Unlocked" toast with a spring-overshoot badge entrance and a small radial spark burst.

**The queue: an array plus a lock flag**

The entire scheduling logic is two module-level variables: \`queue\`, a plain array acting as FIFO storage, and \`isShowing\`, a boolean lock. \`queueAchievement(data)\` does one thing — \`queue.push(data)\` — then calls \`tryShowNext()\`. That function is the gatekeeper: if \`isShowing\` is true, it returns immediately and does nothing, leaving the new item sitting safely in the array. If nothing is showing and the queue has an item, it calls \`queue.shift()\` to pull the oldest entry off the front, sets \`isShowing = true\`, and renders it. The lock is only released back to \`false\` inside \`dismiss()\`, right before \`tryShowNext()\` is called again — which is what lets the next queued achievement (if any) begin its own entrance animation. This shift-then-lock-then-unlock-then-recurse loop is the same shape used by toast notification libraries, upload-progress queues, and chat "typing" indicator sequencing in production apps; the achievement toast is just a concrete, visual place to see it work.

**Why shift() and not pop()**

Using \`Array.prototype.shift()\` instead of \`pop()\` is deliberate — it takes from the front of the array, preserving the order achievements were earned in. If \`pop()\` were used instead, firing three achievements quickly would show the last-earned one first, which reads as a bug to any player watching their own accomplishments play back out of order. FIFO ordering is the entire point of a notification queue; a stack (LIFO) is the wrong data structure here even though both are one-line changes.

**Spring-overshoot entrance with cubic-bezier**

The badge and toast card both animate in using a CSS \`@keyframes\` rule driven by \`cubic-bezier(0.34, 1.56, 0.64, 1)\` — a bezier curve whose second control point exceeds 1, which is what produces the overshoot: the element grows past its final scale of 1 before settling back down, mimicking a physical spring rather than a linear ease. The badge keyframes go further, adding a rotation from -140 degrees back to 0 degrees so the medal appears to spin into place rather than simply grow. Because this is pure CSS animation rather than a JavaScript physics simulation, it runs on the compositor thread and stays smooth even while other work (like the spark burst) is happening on the main thread at the same time.

**The spark burst: trigonometry, not sprites**

Ten \`span.spark\` elements are generated in a loop, each positioned with \`Math.cos(angle) * distance\` and \`Math.sin(angle) * distance\` where \`angle\` divides a full circle (2π) into ten equal slices. Those computed x/y offsets are written as CSS custom properties (\`--sx\`, \`--sy\`) directly in each spark's inline style, and a shared \`@keyframes sparkFly\` rule reads them via \`translate(var(--sx), var(--sy))\` to fly every spark outward along its own radius. Staggering each spark's \`animation-delay\` by a small per-index offset makes the burst feel organic rather than a single synchronized pop, without needing any actual particle-system library.

**Auto-dismiss synced to a real progress bar**

The thin bar under the toast is not decorative — its \`animation-duration\` is set in JavaScript to the exact same \`AUTO_DISMISS_MS\` value used in the \`setTimeout\` that removes the toast, using \`scaleX(1)\` to \`scaleX(0)\` as a literal, linear countdown the user can watch. Clicking the toast clears that timeout and dismisses immediately, so a player who already read their achievement is never stuck waiting. Either path — timeout or click — funnels into the same \`dismiss()\` function, which listens for \`animationend\` on the CSS-driven exit animation before actually removing the DOM node and releasing the \`isShowing\` lock, guaranteeing the exit animation always finishes cleanly before the next queued toast begins its own entrance.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click a single achievement button', text: 'A toast slides up from the bottom with a spring-overshoot scale animation, the badge spins into place, and a burst of gold sparks flies outward from around it.' },
      { title: 'Watch the auto-dismiss progress bar drain', text: 'A thin amber bar beneath the toast text shrinks from full width to nothing over about 3.6 seconds — when it empties, the toast fades and slides out on its own.' },
      { title: 'Click the toast itself to dismiss early', text: 'Clicking anywhere on the toast cancels the countdown immediately and plays the same exit animation, so you never have to wait out the timer if you already saw the message.' },
      { title: 'Click "Fire All 3 At Once" to see the queue', text: 'All three achievements are pushed into the queue array in the same tick, but only the first one animates in — the other two wait silently until the current toast fully dismisses.' },
      { title: 'Watch the "+N queued" counter in the corner', text: 'While a toast is showing and others are waiting, a small counter in the top-right of the toast tells you how many more are lined up behind it.' },
      { title: 'Confirm strict one-at-a-time, in-order playback', text: 'Each queued achievement appears only after the previous one fully finishes its exit animation, and they always play back in the exact order you triggered them — first earned, first shown.' },
    ]},
    features: [
      'FIFO queue implemented with a plain array (push/shift) plus an isShowing boolean lock — no external state library',
      'Spring-overshoot entrance via cubic-bezier(0.34, 1.56, 0.64, 1) keyframes on both the card and the badge icon',
      'Trigonometric spark burst: 10 particles positioned with Math.cos/Math.sin around a full circle, flown outward via CSS custom properties',
      'Auto-dismiss timer synced 1:1 with a visual countdown progress bar using scaleX animation',
      'Click-to-dismiss cancels the pending setTimeout so the toast never lingers after being read',
      'animationend listener guarantees the exit animation always completes before the DOM node is removed and the lock releases',
      'Queue-position indicator ("+N queued") rendered live on the currently visible toast',
      'Zero overlapping or stacked toasts even when multiple achievements fire in the same JavaScript tick',
    ],
    useCases: [
      { icon: 'APP', title: 'In-browser game achievement and milestone systems', desc: 'Drop this directly into a web-based game, quiz app, or gamified onboarding flow to celebrate unlocks without ever risking two celebrations overlapping. Pair it with a [progress bar](/ui-snippets/progress-bar) tracking overall completion so players see both the moment-to-moment reward and the long-term goal.' },
      { icon: 'FORM', title: 'Multi-step form and onboarding completion celebrations', desc: 'Fire a queued toast each time a user finishes a step of a signup wizard or product tour, reusing the same queue so rapid step completions (like a "skip all defaults" power user) never collide visually.' },
      { icon: 'APP', title: 'Notification queue pattern for any toast system', desc: 'The push/shift/lock structure here is the same one production toast libraries use for ordinary alerts. Study it alongside [toast-notification](/ui-snippets/toast-notification) and [toast-queue](/ui-snippets/toast-queue) to see the pattern applied to plainer, non-celebratory notifications.' },
      { icon: 'LEARN', title: 'Teaching FIFO data structures with a visual payoff', desc: 'Because the queue is only two variables, this is a good teaching artifact for explaining shift() versus pop(), or for demonstrating why a lock flag is needed to prevent two async-triggered renders from racing each other.' },
      { icon: 'DESIGN', title: 'Reward and gamification layers in SaaS dashboards', desc: 'Use it for streak milestones, usage-based badges, or "you just unlocked a new feature" moments in a product dashboard, keeping the same dark, game-like visual treatment or restyling it to match your [dashboard widget grid](/ui-snippets/dashboard-widget-grid).' },
      { icon: 'CODE', title: 'Reference implementation for spring-style CSS entrances', desc: 'Reuse the exact cubic-bezier overshoot curve and keyframe structure for any element that needs a "pop in" feel — modals, badges, or cart-add confirmations — without reaching for a JS animation library.' },
      { icon: 'CODE', title: 'Related: Sign In / Sign Up Modal with Tabs', desc: 'See the [Sign In / Sign Up Modal with Tabs](/ui-snippets/modal-auth-signin-signup-tabs/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Onboarding Checklist Modal with Progress Ring', desc: 'See the [Onboarding Checklist Modal with Progress Ring](/ui-snippets/modal-onboarding-checklist-progress/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Booking Date Range Picker Modal', desc: 'See the [Booking Date Range Picker Modal](/ui-snippets/modal-date-range-picker/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I queue an achievement from my own game or app logic?', a: 'Call queueAchievement() with an object shaped like the entries in the ACHIEVEMENTS array: { icon: "trophy", title: "...", desc: "..." }. The icon key must match a key in the ICONS map (trophy, bolt, star) or you can add your own SVG entry to that map. The function immediately pushes onto the internal queue array and calls tryShowNext(), which either renders it right away or leaves it waiting if another toast is currently visible — you never need to check isShowing yourself.' },
      { q: 'Can multiple achievements ever show at the same time?', a: 'No — that is the entire purpose of the isShowing lock flag. tryShowNext() checks isShowing before doing anything, and it only becomes false again inside dismiss(), after the exit animation has fully played via the animationend listener. Even if you call queueAchievement() ten times in a single synchronous loop, only one toast renders at a time, in the order they were queued.' },
      { q: 'How do I change the auto-dismiss duration or make it not auto-dismiss at all?', a: 'Change the AUTO_DISMISS_MS constant at the top of the script (in milliseconds) — it drives both the setTimeout call and the progress-bar animation-duration, so they always stay in sync automatically. To disable auto-dismiss entirely and require a click, remove the setTimeout call in showToast() and keep only the click listener that calls dismiss().' },
      { q: 'Can I use this achievement toast in React, Vue, or Angular?', a: 'Yes. Keep queue and isShowing as values in a ref (React useRef, or a plain module-level variable in Vue/Angular) rather than reactive state, since they are scheduling internals, not render data — only the "currently visible achievement" needs to be actual component state. In React, call tryShowNext() from a useEffect with no dependency array to mount the listener setup once, and make sure any pending setTimeout from showToast is cleared in the effect cleanup function if the component unmounts mid-toast, to avoid a "set state on unmounted component" warning. In Vue, the equivalent goes in onMounted/onBeforeUnmount; in Angular, ngAfterViewInit and ngOnDestroy.' },
      { q: 'Why use shift() instead of pop() to read from the queue?', a: 'shift() removes and returns the first element of the array, preserving the order things were queued in (first earned, first shown). pop() would remove the last element, meaning the most recently triggered achievement would display first — which looks like a bug to a user watching their own accomplishments appear out of order. FIFO ordering via shift() is what makes this a true queue rather than a stack.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to trace exactly what happens if queueAchievement() is called five times in the same synchronous loop — walking through the isShowing lock step by step is a great way to actually understand FIFO queueing rather than just accepting that it works. From there, try asking the assistant to add a "max 2 queued, drop the rest" limit, a pause-on-hover that stops the countdown bar, or a swap from CSS keyframes to the Web Animations API so the entrance and exit can be reversed smoothly if the toast is clicked mid-animation.`,
      prompt: `Build a queued "Achievement Unlocked" toast notification system in plain HTML, CSS, and JavaScript — no frameworks, no libraries.

Requirements:
- A toast card that renders a circular badge icon, an eyebrow label, a title, and a short description, anchored to one area of the screen.
- The badge and card must animate in with a spring/overshoot effect (grows past 100% scale before settling) using a CSS cubic-bezier keyframe animation, not a JS tween.
- Around the badge, generate a burst of 8-12 small particle elements positioned using trigonometry (Math.cos/Math.sin around a circle) that fly outward and fade on entrance, staggered slightly so they don't all move in perfect unison.
- Implement a strict FIFO queue using a plain array and a boolean "currently showing" lock: pushing a new achievement while one is visible must NOT render it immediately — it must wait until the current toast's exit animation fully completes.
- Auto-dismiss each toast after a few seconds using a visible countdown progress bar whose animation duration exactly matches the JS timeout duration, and also allow dismissing early by clicking the toast (cancelling the pending timeout).
- After a toast's exit animation ends (detected via an animationend listener, not a fixed setTimeout guess), remove it from the DOM, release the lock, and automatically show the next queued achievement if one is waiting.
- Provide a few demo trigger buttons, including one that fires several achievements in the same click handler, to prove the queue never shows two toasts stacked or overlapping.`,
    },
  },
};

export default achievementUnlockToast;
