const recentPurchaseNotificationPopup = {
  id: 'recent-purchase-notification-popup',
  title: 'Recent Purchase Notification Popup',
  category: 'modals',
  html: `<div class="demo-page">
  <h1>Storefront demo</h1>
  <p>A "social proof" toast periodically slides in from the bottom-left, shows a recent purchase, auto-dismisses, then cycles to the next one after a pause.</p>
</div>

<div class="fomo-toast" id="fomoToast" role="status" aria-live="polite">
  <div class="fomo-avatar" id="fomoAvatar">JD</div>
  <div class="fomo-body">
    <p class="fomo-text" id="fomoText"><strong>Jordan D.</strong> in New York just bought <strong>Wireless Headphones</strong></p>
    <span class="fomo-time" id="fomoTime">2 minutes ago</span>
  </div>
  <button class="fomo-close" onclick="hideToast(true)" aria-label="Dismiss notification">&times;</button>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.demo-page { width: 100%; padding: 60px 24px; max-width: 460px; margin: 0 auto; text-align: center; }
.demo-page h1 { font-size: 22px; color: #1e293b; margin: 0 0 10px; }
.demo-page p { font-size: 14px; color: #64748b; line-height: 1.6; }

.fomo-toast {
  position: fixed;
  bottom: 24px;
  left: 24px;
  max-width: 320px;
  background: #fff;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transform: translateX(-120%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 50;
}
.fomo-toast.visible { transform: translateX(0); }

.fomo-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #6366f1;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.fomo-body { flex: 1; min-width: 0; }
.fomo-text { font-size: 13px; color: #1e293b; line-height: 1.45; margin: 0 0 4px; }
.fomo-text strong { font-weight: 700; }
.fomo-time { font-size: 11.5px; color: #94a3b8; }

.fomo-close {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0 0 0 4px;
}
.fomo-close:hover { color: #64748b; }`,
  js: `const NOTIFICATIONS = [
  { initials: 'JD', name: 'Jordan D.', location: 'New York', product: 'Wireless Headphones', time: '2 minutes ago' },
  { initials: 'AM', name: 'Amara M.', location: 'Austin', product: 'Standing Desk', time: '5 minutes ago' },
  { initials: 'PK', name: 'Priya K.', location: 'Seattle', product: 'Mechanical Keyboard', time: '11 minutes ago' },
  { initials: 'LR', name: 'Lucas R.', location: 'Toronto', product: 'Smart Watch', time: '18 minutes ago' },
  { initials: 'SC', name: 'Sofia C.', location: 'Miami', product: 'Noise Cancelling Earbuds', time: '24 minutes ago' },
];

const toast = document.getElementById('fomoToast');
const VISIBLE_DURATION = 4500;
const GAP_BETWEEN = 4000;
let index = 0;
let cycleTimer = null;

function renderNotification(n) {
  document.getElementById('fomoAvatar').textContent = n.initials;
  document.getElementById('fomoText').innerHTML =
    '<strong>' + n.name + '</strong> in ' + n.location + ' just bought <strong>' + n.product + '</strong>';
  document.getElementById('fomoTime').textContent = n.time;
}

function showToast() {
  renderNotification(NOTIFICATIONS[index]);
  toast.classList.add('visible');
  cycleTimer = setTimeout(() => hideToast(false), VISIBLE_DURATION);
}

function hideToast(userDismissed) {
  clearTimeout(cycleTimer);
  toast.classList.remove('visible');
  index = (index + 1) % NOTIFICATIONS.length;
  const nextDelay = userDismissed ? GAP_BETWEEN * 1.5 : GAP_BETWEEN;
  cycleTimer = setTimeout(showToast, nextDelay);
}

// Kick off the first notification after a short initial delay.
cycleTimer = setTimeout(showToast, 1500);`,

  seo: {
    title: 'Recent Purchase Notification Popup — Free HTML CSS JS FOMO Toast Snippet',
    description: 'A "FOMO"-style toast that periodically slides in showing a recent purchase, auto-dismisses, then cycles to the next one. Plain HTML, CSS, and JS.',
    about: {
      title: 'Recent Purchase Notification Popup — HTML, CSS & JavaScript FOMO Toast',
      description: `A "recent purchase" or "FOMO" notification is the small toast — popularized by tools like Fomo and Proof — that periodically appears in the corner of an e-commerce site showing something like "Jordan D. in New York just bought Wireless Headphones." It's a lightweight social-proof signal that other real people are actively buying, meant to nudge hesitant visitors.

This snippet implements the full cycling behavior in **plain HTML, CSS, and vanilla JavaScript**, with no third-party social-proof service.

**How the notification queue works**

A plain array, \`NOTIFICATIONS\`, holds a handful of \`{ initials, name, location, product, time }\` objects. An \`index\` variable tracks which one is currently showing, and \`renderNotification\` fills the toast's avatar initials, message text, and timestamp from whichever entry is at that index. \`(index + 1) % NOTIFICATIONS.length\` advances to the next entry and wraps back to the start once the list is exhausted — so the cycle repeats indefinitely.

**How the slide-in/out animation works**

The toast sits fixed at \`bottom: 24px; left: 24px\` with \`transform: translateX(-120%)\` by default — fully off-screen to the left. Adding the \`.visible\` class animates it to \`translateX(0)\` using a spring-like \`cubic-bezier(0.22, 1, 0.36, 1)\` easing curve, which gives a slight overshoot-and-settle feel rather than a plain linear slide.

**How the show → wait → hide → cycle loop works**

Two named timing constants drive the whole loop: \`VISIBLE_DURATION\` (how long each toast stays on screen before auto-hiding) and \`GAP_BETWEEN\` (how long the toast stays completely off-screen before the next one appears). \`showToast()\` displays the current notification and schedules \`hideToast()\` after \`VISIBLE_DURATION\`. \`hideToast()\` removes the \`.visible\` class, advances the index, and schedules the next \`showToast()\` after \`GAP_BETWEEN\`. Because each function schedules the other via \`setTimeout\`, the cycle runs indefinitely without a \`setInterval\`, which is important — a fixed interval would fire even while a previous toast's exit animation was still playing, whereas this chained-timeout approach always waits for the current toast's full cycle to finish first.

**Manual dismissal**

Clicking the × button calls \`hideToast(true)\`, which behaves identically to the automatic timeout except it schedules the *next* notification slightly further out (\`GAP_BETWEEN * 1.5\`) — a small courtesy so a visitor who explicitly closed a toast isn't immediately shown another one.

**Accessibility**

The toast has \`role="status"\` and \`aria-live="polite"\`, so screen readers announce each new notification's text as it appears, without interrupting whatever the user is currently doing.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Recent Purchase Notification Popup" in the sidebar Library tab. After about 1.5 seconds, the first toast slides in from the bottom-left.' },
        { title: 'Watch it cycle', text: 'Let it run — the toast auto-dismisses after a few seconds, pauses briefly, then shows the next entry from the notification list, looping indefinitely.' },
        { title: 'Dismiss one manually', text: 'Click the × to close a toast early and notice the next one waits slightly longer before appearing.' },
        { title: 'Edit the notification list', text: 'In the JS panel, edit the NOTIFICATIONS array to reflect real (or realistic) purchases relevant to your store.' },
        { title: 'Tune the timing', text: 'Adjust VISIBLE_DURATION and GAP_BETWEEN in the JS panel to control how long each toast stays visible and how long the gap is between them.' },
        { title: 'Connect to real order data', text: 'Replace the static NOTIFICATIONS array with data fetched from your order/checkout backend for genuine (not fabricated) recent activity.' },
      ],
    },
    features: [
      'Chained setTimeout show/hide loop — never overlaps or double-fires like a raw setInterval could',
      'Spring-like cubic-bezier easing gives the slide-in a subtle overshoot-and-settle feel',
      'Cycles indefinitely through an array of notifications, wrapping back to the start automatically',
      'Manual dismissal schedules the next toast slightly later, as a courtesy to the user',
      'role="status" and aria-live="polite" announce each new notification to screen readers',
      'All notification content driven by a single easily editable data array — no repeated markup',
      'Fixed bottom-left positioning keeps it out of the way of typical bottom-right chat widgets',
      'Avatar initials generated directly from the data, no image assets required',
      'Close button always available so users can dismiss an individual toast early',
      'No framework, no third-party social-proof service or script, no build step required',
    ],
    useCases: [
      { icon: 'STORE', title: 'E-commerce social proof', desc: 'Show visitors that real purchases are happening on your store, without paying for a third-party FOMO/social-proof SaaS product.' },
      { icon: 'LEARN', title: 'Learn chained-timeout animation loops', desc: 'Study why alternating setTimeout calls between a show and hide function is safer than a single repeating setInterval for cyclic UI.' },
      { icon: 'FLOW', title: 'Prototype conversion-focused landing pages', desc: 'Drop this into a product launch or landing page prototype to test whether social proof notifications measurably affect signup or purchase rates.' },
      { icon: 'DESIGN', title: 'Match your storefront\'s visual style', desc: 'Recolor the avatar, adjust the toast shadow and corner radius, and reposition it to fit alongside other UI already on your page.' },
      { icon: 'ACCESS', title: 'Announce updates without interrupting users', desc: 'The aria-live="polite" region ensures screen reader users are informed of new notifications without their current task being forcibly interrupted.' },
      { icon: 'CODE', title: 'Connect to real, live order data', desc: 'Replace the static notification array with data pulled from your actual checkout or order-webhook system for authentic, non-fabricated social proof.' },
    ],
    faqs: [
      { q: 'Is this popup using real purchase data?', a: 'Not by default — the demo uses a hardcoded array of example notifications. For a legitimate use, replace the array with data fetched from your real order or checkout system rather than fabricating purchases, which can mislead users and run afoul of consumer protection rules in some jurisdictions.' },
      { q: 'Why use chained setTimeout calls instead of setInterval?', a: 'setInterval fires on a fixed schedule regardless of what else is happening, which could trigger the next show while the current toast\'s hide animation is still playing. Each function here calls setTimeout to schedule the next step only once its own logic has run, keeping the cycle strictly sequential and glitch-free.' },
      { q: 'How do I change how long each notification stays visible?', a: 'Edit the VISIBLE_DURATION constant in the JS panel — it is the number of milliseconds a toast stays on screen before it automatically hides and the cycle advances to the next notification.' },
      { q: 'How do I change the gap between notifications?', a: 'Edit the GAP_BETWEEN constant — it is the number of milliseconds the toast stays fully hidden before the next one slides in. Dismissing a toast manually adds a 50% longer pause as a courtesy before the next one appears.' },
      { q: 'Can I show real-time notifications instead of a fixed list?', a: 'Yes. Replace the NOTIFICATIONS array with data from a WebSocket connection, Server-Sent Events stream, or periodic API poll against your order system, pushing new entries into the array (or a queue) as real purchases happen.' },
      { q: 'Is this accessible to screen reader users?', a: 'Yes. The toast container has role="status" and aria-live="polite", so assistive technology announces each new notification\'s text as it appears, without stealing focus or interrupting the user\'s current task.' },
      { q: 'Can I position the toast on the right side instead of the left?', a: 'Yes. Change left: 24px to right: 24px on .fomo-toast, and flip the initial transform to translateX(120%) so it slides in from the opposite direction.' },
      { q: 'Does dismissing a notification stop the cycle permanently?', a: 'No — dismissing a toast early just hides it sooner and slightly delays the next one; the cycle continues indefinitely afterward. If you want dismissal to stop the whole feature for a session, you could set a sessionStorage flag inside the close handler and check it before scheduling future notifications.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain why alternating setTimeout calls between the show and hide functions avoids the overlap and timing-drift problems a single repeating setInterval would introduce for this kind of cyclic toast animation. It's also worth discussing the ethics and legal considerations of this pattern with the assistant — ask it to help you design a version that only ever displays genuine, real-time purchase events pulled from your actual order system, since presenting fabricated activity as real social proof can be misleading to users and is restricted under consumer protection regulations in several jurisdictions.`,
      prompt: `Build a "recent purchase" social-proof toast notification that periodically cycles through a list of items in plain HTML, CSS, and JavaScript — no third-party social-proof service or script.

Requirements:
- A toast fixed near a bottom corner of the viewport, hidden off-screen by default via a CSS transform, that slides into view with a spring-like eased transition when shown.
- A data-driven notification queue (a plain array of objects with fields like name, location, product, and a relative timestamp) that the toast renders from, with a single render function that updates the toast's content from whichever entry is currently active.
- Implement the show/wait/hide/cycle loop using chained setTimeout calls between a show function and a hide function — not a single repeating setInterval — so that each phase only begins once the previous one has actually completed, and the cycle wraps back to the first entry after the last one.
- Include a close button that lets the user dismiss the current toast immediately, which should also cause the next notification in the cycle to wait somewhat longer than usual before appearing, as a courtesy.
- Give the toast container role="status" and aria-live="polite" so each new notification is announced to screen reader users without interrupting their current task or stealing keyboard focus.
- Keep all timing values (how long a toast stays visible, how long the gap between toasts is) as clearly named constants near the top of the script so they are easy to tune.`,
    },
  },
};

export default recentPurchaseNotificationPopup;
