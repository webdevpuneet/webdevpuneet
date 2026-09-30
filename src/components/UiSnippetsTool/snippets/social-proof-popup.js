const socialProofPopup = {
  id: 'social-proof-popup',
  title: 'Social Proof Popup',
  lastmod: '2026-06-20',
  category: 'modals',
  html: `<div class="spp-page">
  <p class="spp-hint">A rotating purchase notification appears in the bottom-left corner.</p>
</div>
<div class="spp-toast" id="sppToast" role="status">
  <img class="spp-avatar" id="sppAvatar" alt="">
  <div class="spp-body">
    <strong id="sppName"></strong>
    <span id="sppAction"></span>
    <span class="spp-time" id="sppTime"></span>
  </div>
  <button type="button" class="spp-close" id="sppClose" aria-label="Dismiss">✕</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}

.spp-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.spp-hint{color:#94a3b8;font-size:14px;font-weight:600;text-align:center;max-width:280px}

.spp-toast{position:fixed;left:18px;bottom:18px;display:flex;align-items:center;gap:11px;background:#fff;border-radius:14px;
  padding:11px 14px;box-shadow:0 16px 40px rgba(15,23,42,.16);max-width:300px;z-index:90;
  transform:translateY(16px) scale(.97);opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}
.spp-toast.show{transform:translateY(0) scale(1);opacity:1;pointer-events:all}

.spp-avatar{width:38px;height:38px;border-radius:50%;flex-shrink:0;background:#e2e8f0;object-fit:cover}
.spp-body{display:flex;flex-direction:column;gap:1px;min-width:0}
.spp-body strong{font-size:13px;font-weight:800;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.spp-body span{font-size:12px;color:#64748b}
.spp-time{font-size:10.5px;color:#22c55e;font-weight:700;display:flex;align-items:center;gap:4px}
.spp-time::before{content:'';width:6px;height:6px;border-radius:50%;background:#22c55e}

.spp-close{position:absolute;top:6px;right:6px;width:18px;height:18px;border-radius:50%;border:none;background:#f1f5f9;color:#94a3b8;
  font-size:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s}
.spp-toast:hover .spp-close{opacity:1}
.spp-close:hover{background:#e2e8f0}`,

  js: `var EVENTS = [
  { name: 'Sarah from Austin, TX', action: 'just purchased the Pro plan', avatar: '#6366f1', mins: 2 },
  { name: 'Devon from Toronto, ON', action: 'just signed up', avatar: '#22c55e', mins: 4 },
  { name: 'Mei from Singapore', action: 'just upgraded to Team', avatar: '#f59e0b', mins: 6 },
  { name: 'Lucas from São Paulo', action: 'just left a 5-star review', avatar: '#ec4899', mins: 9 },
  { name: 'Anna from Berlin', action: 'just purchased the Pro plan', avatar: '#0ea5e9', mins: 12 },
];

var toast = document.getElementById('sppToast');
var dismissedManually = false;
var rotateIndex = 0;
var cycleTimer = null;
var hideTimer = null;

function avatarUri(color) {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38"><rect width="38" height="38" fill="' + color + '"/></svg>';
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

function showEvent(evt) {
  document.getElementById('sppAvatar').src = avatarUri(evt.avatar);
  document.getElementById('sppName').textContent = evt.name;
  document.getElementById('sppAction').textContent = evt.action;
  document.getElementById('sppTime').textContent = evt.mins + ' minutes ago';
  toast.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(function () { toast.classList.remove('show'); }, 5200);
}

function cycle() {
  if (dismissedManually) return;
  showEvent(EVENTS[rotateIndex % EVENTS.length]);
  rotateIndex++;
}

document.getElementById('sppClose').addEventListener('click', function () {
  dismissedManually = true;
  toast.classList.remove('show');
  clearTimeout(hideTimer);
  clearInterval(cycleTimer);
});

setTimeout(function () {
  cycle();
  cycleTimer = setInterval(cycle, 8000);
}, 1500);`,

  seo: {
    title: 'Social Proof Popup — Rotating Purchase Notification',
    description: `A rotating "Sarah just purchased…" social-proof toast with a relative timestamp and a manual dismiss that stops the rotation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Social Proof Popup — Auto-Cycling Purchase Toasts with a Persistent Dismiss',
      description: `The small "Sarah from Austin just bought the Pro plan" bubble that drifts in near the corner of a landing page is a well-known conversion pattern — seeing recent, specific activity from real-seeming people builds more trust than a generic testimonial block. This snippet builds the complete rotating toast: a queue of events, automatic cycling on a timer, and a dismiss action that respects the user's choice for the rest of the session.

**A queue of events, not a single static message**

\`EVENTS\` is an array of \`{ name, action, avatar, mins }\` objects, and \`cycle()\` advances through them in order (wrapping back to the start via \`rotateIndex % EVENTS.length\`), showing one at a time on a repeating interval. A single static "someone just bought this" message loses credibility the longer it sits on screen unchanged — rotating through several distinct, named events is what makes the pattern read as ongoing real activity rather than a fixed banner.

**Generated avatar colors, not external images**

Each event's avatar is a solid-color square generated on the fly as a tiny inline SVG, base64-encoded into a \`data:\` URI (\`avatarUri()\`) — no image hosting or placeholder service required, and no failed network request if the page is previewed offline. Swap this for a real photo URL per event once you have one; the \`<img>\` tag and its sizing don't need to change.

**A relative timestamp that looks credible**

Each event carries a \`mins\` value rendered as "X minutes ago" with a small pulsing-dot-style green indicator beside it — deliberately *not* a live-incrementing counter, since constantly ticking "1 minute ago" → "2 minutes ago" while a single toast is displayed would be more work for very little added believability; a fixed plausible time per event reads naturally without that complexity.

**Dismiss means dismiss, for the whole session**

Clicking the ✕ button doesn't just hide the current toast — it sets a \`dismissedManually\` flag that \`cycle()\` checks before showing anything, and clears the rotation interval outright. Once a user has explicitly said "stop showing me this," the pattern should respect that permanently rather than popping back up a few seconds later with the next event in the queue, which would undo the very trust the pattern is trying to build.

**Where this pattern earns its keep, and where it backfires**

Social proof works because specificity reads as truth — a named city and a named action feel real in a way "people love this!" never does. But the same specificity makes a fabricated or stale feed obvious the moment a visitor notices the same three names looping every visit, which is why real implementations should draw from an actually-updating event source rather than running a fixed demo list indefinitely in production.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `After a short delay, a toast slides in near the bottom-left corner showing a purchase event with a colored avatar.` },
      { title: 'Watch it auto-cycle', text: `Every 8 seconds, the toast hides and a new event from the EVENTS queue appears in its place.` },
      { title: 'Hover the toast', text: `A small ✕ dismiss button fades in at the top-right corner of the toast.` },
      { title: 'Click dismiss', text: `The toast hides immediately and the rotation stops permanently for the rest of the session — it won't reappear with the next event.` },
      { title: 'Edit the events', text: `Change any entry's name, action, avatar color, or mins value in the EVENTS array to customize the rotation content.` },
      { title: 'Connect real activity data', text: `Replace the static EVENTS array with recent orders/signups fetched from your backend, keeping the same showEvent()/cycle() rotation logic.` },
    ] },
    features: [
      { title: 'Rotating event queue', text: `Multiple distinct events cycle automatically, reading as ongoing activity rather than one static claim.` },
      { title: 'Zero-dependency generated avatars', text: `Avatars are inline base64 SVGs generated per event color, with no image hosting or network request required.` },
      { title: 'Plausible relative timestamps', text: `A fixed "X minutes ago" per event with a small live-style dot indicator, without the complexity of an actually ticking counter.` },
      { title: 'Permanent, respected dismissal', text: `Closing the toast stops the rotation entirely for the session — it never reappears with the next queued event.` },
      { title: 'Auto-hide per toast', text: `Each shown event automatically hides itself after about 5 seconds even without a dismiss click, keeping the page uncluttered.` },
      { title: 'Hover-revealed dismiss button', text: `The ✕ control stays out of the way until hovered, avoiding visual clutter on a toast that's mostly meant to be glanced at.` },
      { title: 'Smooth slide-and-fade entrance', text: `The toast animates in with opacity and transform only, staying smooth across every framework export.` },
      { title: 'Easily themeable accent colors', text: `Each event's avatar color is just a hex value in its data object — no CSS changes needed to add new color variety.` },
    ],
    useCases: [
      { title: 'E-commerce conversion optimization', text: `The classic "recent purchase" notification pattern used by FOMO, Proof, and similar conversion tools.` },
      { title: 'SaaS landing pages', text: `Show recent signups or upgrades to build trust before a visitor commits to creating an account.` },
      { title: 'Course and info-product sales pages', text: `Display recent enrollments alongside a [countdown timer](/ui-snippets/countdown-timer/) or [trial countdown](/ui-snippets/trial-countdown/) for urgency plus social proof.` },
      { title: 'Marketplace and crowdfunding pages', text: `Show recent backer or buyer activity to reinforce that a campaign or listing is actively gaining traction.` },
      { title: 'Event and ticket sales pages', text: `Display recent ticket purchases to create urgency around a limited-availability event.` },
      { title: 'Learning respectful notification UX', text: `A practical reference for an auto-cycling toast that still honors an explicit user dismissal — compare with a [snackbar undo](/ui-snippets/snackbar-undo/) for action-based toast feedback.` },
    ],
    faqs: [
      { q: 'How do I connect this to real purchase/signup data?', a: `Fetch recent events from your backend (e.g. the last N orders or signups) on page load, map them into the { name, action, avatar, mins } shape EVENTS uses, and assign the result to EVENTS before the cycle() rotation starts — for fresher data, refetch periodically and merge new events into the queue.` },
      { q: 'Why does dismissing stop the rotation entirely instead of just hiding the current toast?', a: `An explicit dismiss is the strongest possible signal that a user doesn't want to see this pattern — popping the next event back up moments later would directly undo the trust the dismiss action was supposed to build. Respecting it for the whole session is the more honest choice, even though it costs you the remaining impressions.` },
      { q: 'How do I remember the dismissal across page reloads, not just the current session?', a: `In the close button's click handler, write a flag (and optionally a timestamp) to localStorage; on page load, check that flag before starting the cycle() rotation at all, and skip scheduling it entirely if the user dismissed it within your chosen cooldown window (e.g. the last 24 hours).` },
      { q: 'How do I show real, live relative timestamps instead of a fixed mins value per event?', a: `Store an actual createdAt timestamp per event instead of a fixed mins number, and compute the relative label ("3 minutes ago") at the moment showEvent() runs using a small time-formatting helper, so the displayed time reflects how long ago the event actually happened rather than a value baked into the data.` },
      { q: 'How do I use this social proof popup in React, Vue, or Angular?', a: `In React, keep the current event and visibility in useState and run the rotation interval inside useEffect with cleanup on unmount; in Vue, use ref()/onUnmounted for the same interval cleanup; in Angular, use a component field with ngOnDestroy. The dismissedManually flag and cycle logic are plain JavaScript and need no framework-specific changes.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the rotation-and-dismissal state machine by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why avatarUri() base64-encodes a tiny inline SVG rather than pointing at a placeholder image service, or why dismissedManually is checked inside cycle() rather than simply calling clearInterval once and trusting that alone. The same assistant can help optimize it, for instance checking whether the two independent timers (hideTimer for auto-hide, cycleTimer for rotation) could ever race and show a toast for less than its intended duration if a click happens at just the wrong moment. It is just as useful for extending the pattern: ask it to persist the dismissal in localStorage so it survives a page reload within a cooldown window, replace the fixed mins values with real createdAt timestamps computed live, or fetch the EVENTS queue from a real backend endpoint instead of a hardcoded array. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a rotating "social proof" purchase notification toast in plain HTML, CSS, and JavaScript — no libraries, no external image requests.

Requirements:
- A fixed-position toast in a page corner, hidden by default via opacity and transform (not display:none), that becomes visible by toggling a single CSS class so the transition animates smoothly.
- A JavaScript array of multiple distinct event objects (name, action text, an accent color, and a relative "minutes ago" number) — not a single static message — that the toast cycles through in order, wrapping back to the start once it reaches the end.
- Generate each event's avatar as a solid-color circle without any external image request or placeholder service: build a tiny inline SVG string colored per event, base64-encode it, and assign it as the image element's src via a data: URI.
- Each shown toast must automatically hide itself after a fixed duration (a few seconds) even if the user takes no action, using its own independent timer separate from the rotation timer that advances to the next event.
- A close button that, when clicked, immediately hides the current toast AND permanently stops the rotation from ever showing another event for the rest of the page session — clicking dismiss must not just hide the current one while leaving the next one queued to appear later.
- The rotation must not start immediately on page load; delay the first appearance by a couple of seconds, then continue on a longer repeating interval (e.g. every several seconds) for subsequent events.
- Confirm in a comment why respecting an explicit dismissal permanently, rather than resuming rotation after a pause, is the more trustworthy design choice for this kind of notification.`,
    },
  },
};

export default socialProofPopup;
