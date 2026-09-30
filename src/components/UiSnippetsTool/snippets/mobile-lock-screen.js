const mobileLockScreen = {
  id: 'mobile-lock-screen',
  title: 'Mobile Lock Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="ls-phone">
  <div class="ls-screen" id="lsScreen">
    <div class="ls-status"><span id="lsBar">9:41</span><span class="ls-sr"><span class="ls-batt"><i></i></span></span></div>
    <div class="ls-clock">
      <span class="ls-lock"><svg viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>
      <div class="ls-date" id="lsDate">Monday, June 29</div>
      <div class="ls-time" id="lsTime">9:41</div>
    </div>
    <div class="ls-notes" id="lsNotes">
      <div class="ls-note">
        <span class="ls-ic" style="background:#22c55e">M</span>
        <div class="ls-body"><div class="ls-row"><b>Messages</b><small>now</small></div><p>Sara: Are we still on for lunch? 🥗</p></div>
      </div>
      <div class="ls-note">
        <span class="ls-ic" style="background:#3b82f6">C</span>
        <div class="ls-body"><div class="ls-row"><b>Calendar</b><small>9:30</small></div><p>Standup with the design team in 30 min</p></div>
      </div>
      <div class="ls-note">
        <span class="ls-ic" style="background:#f59e0b">W</span>
        <div class="ls-body"><div class="ls-row"><b>Weather</b><small>8:00</small></div><p>Sunny today, high of 24°. Light breeze.</p></div>
      </div>
    </div>
    <div class="ls-foot">
      <span class="ls-torch"><svg viewBox="0 0 24 24" width="16" fill="currentColor"><path d="M9 2h6l-1 5h-4zM10 9h4l-1 6h-2zM11 17h2v5h-2z"/></svg></span>
      <div class="ls-swipe"><div class="ls-grip"></div><span>Swipe up to unlock</span></div>
      <span class="ls-cam"><svg viewBox="0 0 24 24" width="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8h3l1.5-2h5L16 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.2"/></svg></span>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.ls-phone{width:280px;height:580px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.ls-screen{position:relative;width:100%;height:100%;border-radius:34px;overflow:hidden;color:#fff;display:flex;flex-direction:column;background:linear-gradient(160deg,#4338ca,#7c3aed 45%,#db2777)}
.ls-screen::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 70% 18%,rgba(255,255,255,.22),transparent 45%);pointer-events:none}

.ls-status{display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700;z-index:2}
.ls-batt{width:22px;height:11px;border:1.4px solid #fff;border-radius:3px;position:relative;display:inline-block;opacity:.9}
.ls-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:#fff;border-radius:0 1px 1px 0}
.ls-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:70%;background:#fff;border-radius:1px}

.ls-clock{text-align:center;padding:34px 0 18px;z-index:2}
.ls-lock{display:inline-flex;opacity:.85;margin-bottom:10px}
.ls-date{font-size:14px;font-weight:600;opacity:.92}
.ls-time{font-size:74px;font-weight:300;letter-spacing:-2px;line-height:1;font-variant-numeric:tabular-nums}

.ls-notes{flex:1;overflow-y:auto;padding:6px 14px;display:flex;flex-direction:column;gap:9px;z-index:2;scrollbar-width:none;-ms-overflow-style:none}
.ls-notes::-webkit-scrollbar{display:none}
.ls-note{display:flex;gap:10px;background:rgba(255,255,255,.16);backdrop-filter:blur(10px);border-radius:16px;padding:11px 13px;animation:lsIn .5s ease backwards}
.ls-note:nth-child(2){animation-delay:.08s}.ls-note:nth-child(3){animation-delay:.16s}
@keyframes lsIn{from{opacity:0;transform:translateY(10px)}}
.ls-ic{width:30px;height:30px;border-radius:8px;color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ls-body{flex:1;min-width:0}
.ls-row{display:flex;justify-content:space-between;align-items:baseline}
.ls-row b{font-size:13px;font-weight:700}
.ls-row small{font-size:11px;opacity:.75}
.ls-body p{font-size:12.5px;opacity:.95;margin-top:2px;line-height:1.35}

.ls-foot{display:flex;align-items:center;justify-content:space-between;padding:14px 28px 22px;z-index:2}
.ls-torch,.ls-cam{width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer}
.ls-torch:active,.ls-cam:active{background:rgba(0,0,0,.5)}
.ls-swipe{flex:1;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px}
.ls-grip{width:90px;height:5px;border-radius:3px;background:rgba(255,255,255,.85)}
.ls-swipe span{font-size:11px;opacity:.85;animation:lsPulse 2s ease-in-out infinite}
@keyframes lsPulse{50%{opacity:.4;transform:translateY(-2px)}}`,

  js: `var timeEl = document.getElementById('lsTime');
var barEl = document.getElementById('lsBar');
var dateEl = document.getElementById('lsDate');
var screen = document.getElementById('lsScreen');

var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function tick() {
  var d = new Date();
  var h = d.getHours() % 12 || 12;
  var t = h + ':' + ('0' + d.getMinutes()).slice(-2);
  timeEl.textContent = t;
  barEl.textContent = t;
  dateEl.textContent = DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate();
}
tick();
setInterval(tick, 5000);

// Swipe up (or click the grip) "unlocks" — slides the screen content up and fades.
var notes = document.getElementById('lsNotes');
function unlock() {
  screen.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), opacity .5s';
  screen.style.transform = 'translateY(-12%)';
  screen.style.opacity = '0';
  setTimeout(function () {
    screen.style.transition = 'none';
    screen.style.transform = 'translateY(8%)';
    setTimeout(function () { screen.style.transition = 'transform .5s, opacity .5s'; screen.style.transform = ''; screen.style.opacity = '1'; }, 500);
  }, 650);
}
document.querySelector('.ls-swipe').addEventListener('click', unlock);

var startY = null;
screen.addEventListener('pointerdown', function (e) { startY = e.clientY; });
screen.addEventListener('pointerup', function (e) {
  if (startY !== null && startY - e.clientY > 60) unlock();
  startY = null;
});`,

  seo: {
    title: 'Mobile Lock Screen — Free CSS Phone Lock Screen Snippet',
    description: `A phone lock screen with a live clock, date, glassy notification stack, and swipe-up-to-unlock gesture. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Mobile Lock Screen — Live Clock & Notification Stack',
      description: `A mobile lock screen is the first screen a phone shows — a big clock, the date, a stack of notifications, and a swipe-to-unlock hint. It's a great showcase for app concepts, push-notification designs, and onboarding flows. This snippet builds a polished one inside a CSS phone frame with a live clock and a real swipe-up gesture, in HTML, CSS, and vanilla JavaScript with no dependency.

**Live clock and date**

A \`tick()\` function formats the current time in 12-hour style and writes it to both the large clock and the status bar, and builds a friendly date ("Monday, June 29") from \`DAYS\` and \`MONTHS\` arrays rather than a locale string, so the format is fully in your control. An interval keeps it current. The large time uses a thin \`font-weight: 300\` with negative letter-spacing to mimic the system lock-screen typography.

**Glassmorphism notifications**

Each notification is a frosted card — a semi-transparent white background plus \`backdrop-filter: blur(10px)\` — layered over the gradient wallpaper, which is the modern lock-screen look. They animate in with a staggered \`lsIn\` keyframe (increasing \`animation-delay\` per card) so the stack cascades on load, and the list scrolls independently with \`overflow-y:auto\`.

**The wallpaper**

The background is a multi-stop \`linear-gradient\` with a soft \`radial-gradient\` highlight layered via \`::after\` for depth, giving a rich wallpaper without an image. All the foreground text and glyphs are white over it, with the notification glass providing contrast for readability.

**A real swipe-up gesture**

Unlocking works two ways: clicking the grip, or an actual swipe — \`pointerdown\` records the start Y, and \`pointerup\` checks whether the finger moved up more than 60px before triggering \`unlock()\`. The unlock animates the whole screen up and fades it, then resets, simulating the transition into the home screen. This is the same threshold-based swipe detection used for sheets and dismissible cards.

**Reusing it**

Swap the notifications for your own data, change the wallpaper gradient, and keep the frame as a wrapper. It pairs naturally with a [phone mockup](/ui-snippets/phone-mockup/) for presenting an app, or as the entry point before a [mobile login screen](/ui-snippets/mobile-login-screen/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A phone lock screen renders with a live clock and notifications.` },
      { title: 'Watch the clock', text: `The time and date update live from the system clock.` },
      { title: 'See the notifications', text: `Glassy cards cascade in over the gradient wallpaper.` },
      { title: 'Swipe up', text: `Drag up from the screen to trigger the unlock animation.` },
      { title: 'Or tap the grip', text: `Clicking the swipe hint unlocks too.` },
      { title: 'Customize it', text: `Swap notifications and the wallpaper gradient for your app.` },
    ] },
    features: [
      { title: 'Live clock and date', text: `Updates from the system clock with custom formatting.` },
      { title: 'System-style type', text: `Thin, tight clock to match a real lock screen.` },
      { title: 'Glass notifications', text: `Frosted cards via backdrop-filter blur.` },
      { title: 'Staggered entrance', text: `Cards cascade in with per-item delays.` },
      { title: 'Gradient wallpaper', text: `Multi-stop gradient plus a radial highlight.` },
      { title: 'Swipe-up gesture', text: `Threshold-based pointer detection to unlock.` },
      { title: 'Unlock animation', text: `Screen slides up and fades on unlock.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS inside a CSS phone frame.` },
    ],
    useCases: [
      { title: 'App concept demos', text: `Present a concept beside a [phone mockup](/ui-snippets/phone-mockup/).` },
      { title: 'Push notification design', text: `Show alerts like a [notification center](/ui-snippets/notification-center/).` },
      { title: 'Onboarding entry', text: `Lead into a [mobile login screen](/ui-snippets/mobile-login-screen/).` },
      { title: 'Marketing screenshots', text: `Frame an app launch in a [product hero](/ui-snippets/product-hero/).` },
      { title: 'Wallpaper and theme demos', text: `Pair with a [color theme switcher](/ui-snippets/color-theme-switcher/).` },
      { title: 'Learning swipe gestures', text: `A reference for threshold-based pointer swipes.` },
      { icon: 'CODE', title: 'Related: Mobile Fitness Screen', desc: 'See the [Mobile Fitness Screen](/ui-snippets/mobile-fitness-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the swipe-to-unlock work?', a: `A pointerdown handler records the starting Y coordinate, and pointerup checks whether the pointer moved upward by more than 60 pixels — if so it calls unlock(), which slides the screen up and fades it before resetting. Clicking the grip triggers the same function. It's the same threshold-based swipe detection used for bottom sheets and dismissible cards.` },
      { q: 'Is the clock real?', a: `Yes. A tick() function reads the current Date, formats the time in 12-hour style, and updates both the large clock and the status bar, plus builds the date string from day and month name arrays. An interval keeps it current, so the lock screen never looks frozen on a placeholder time.` },
      { q: 'How are the frosted notification cards made?', a: `Each card has a semi-transparent white background combined with backdrop-filter: blur(10px), so the gradient wallpaper shows through softly — the glassmorphism look used on real lock screens. They animate in with a staggered keyframe, increasing the animation-delay per card so the stack cascades rather than appearing all at once.` },
      { q: 'Can I use my own wallpaper and notifications?', a: `Definitely. The wallpaper is a CSS gradient with a radial highlight, so change the colors or swap in a background image. The notifications are plain markup driven by an icon, title, time, and message, so replace them with your own data or render them from an array in a framework.` },
      { q: 'How do I use this lock screen in React, Vue, or Angular?', a: `Keep the time in state updated by an interval in a mount effect with cleanup, and render notifications from an array. Implement unlock as a state flag that toggles the slide-and-fade classes. The swipe uses pointer events on a ref. In Tailwind, build the wallpaper with a gradient and the glass cards with bg-white/15 and backdrop-blur.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the gesture math by hand to know if it feels right. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the swipe detection compares startY minus the pointerup clientY against a 60px threshold rather than tracking movement continuously with pointermove, or how the unlock function's two chained setTimeout calls produce the slide-up-then-reset sequence. The same assistant can help optimize it — ask whether the 5-second tick interval for the clock is wasteful when the displayed format only changes once a minute, or whether backdrop-filter blur on three stacked notification cards has a noticeable cost on lower-end devices. It is just as useful for extending the feature: have it add a real drag-following animation instead of a threshold-only swipe, support swiping individual notifications away, or wire the unlock into an actual screen transition to a home screen or login screen. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile lock screen in plain HTML, CSS, and JavaScript inside a phone-frame container — no animation library.

Requirements:
- A gradient wallpaper background (a multi-stop linear-gradient plus a soft radial-gradient highlight layered on a pseudo-element) with a status bar, a small lock icon, a date line, and a large time display using tabular figures.
- Drive the time and date from the real system clock with a repeating interval, formatting the time and a full weekday-plus-month date string yourself from Date object fields rather than relying on a locale-formatting shortcut.
- A stack of notification cards using the glassmorphism technique: a semi-transparent background color combined with backdrop-filter blur so the wallpaper shows through, each card entering with a staggered fade-and-slide-up keyframe animation where each successive card's animation-delay is slightly longer than the one before it.
- Implement swipe-to-unlock two ways: clicking a visible grip/handle element, and an actual pointer gesture — record the starting Y coordinate on pointerdown, and on pointerup, only trigger the unlock if the pointer moved upward by more than a fixed pixel threshold (do not require continuous tracking during the drag).
- The unlock action must animate the whole screen sliding upward while fading out, then after that animation completes, reset the screen instantly below its start position with transitions disabled, then re-enable transitions and animate it back to its resting position and full opacity, so the sequence reads as one continuous unlock rather than two visible steps.`,
    },
  },
};

export default mobileLockScreen;
