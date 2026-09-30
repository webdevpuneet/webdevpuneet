const deliveryEtaCard = {
  id: 'delivery-eta-card',
  title: 'Delivery ETA Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="de-card">
  <div class="de-top">
    <span class="de-eyebrow">Arriving in</span>
    <div class="de-countdown" id="deCountdown">2h 15m</div>
  </div>

  <div class="de-progress">
    <div class="de-progress-track">
      <div class="de-progress-fill" id="deFill"></div>
    </div>
    <div class="de-progress-labels">
      <span>Warehouse</span>
      <span id="deDistance">4.2 mi left</span>
      <span>Your door</span>
    </div>
  </div>

  <div class="de-courier">
    <span class="de-avatar">MK</span>
    <div class="de-courier-info">
      <strong>Maria K.</strong>
      <span>Your courier</span>
    </div>
    <button class="de-contact" id="deContact" type="button">Contact courier</button>
  </div>
  <div class="de-toast" id="deToast">Calling Maria K. …</div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0f14;color:#eef1f7;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.de-card{width:100%;max-width:380px;background:linear-gradient(160deg,#171b26,#12141c);border:1px solid #262c3b;border-radius:18px;padding:22px;position:relative;overflow:hidden}
.de-top{text-align:center;padding-bottom:18px}
.de-eyebrow{display:block;font-size:12px;color:#8891a6;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.de-countdown{font-size:38px;font-weight:800;letter-spacing:-.02em;color:#ffb648;font-variant-numeric:tabular-nums}
.de-progress{margin:8px 0 22px}
.de-progress-track{height:8px;border-radius:6px;background:#232a3a;overflow:hidden}
.de-progress-fill{height:100%;width:72%;background:linear-gradient(90deg,#ff8a3d,#ffb648);border-radius:6px;transition:width .5s ease}
.de-progress-labels{display:flex;justify-content:space-between;margin-top:8px;font-size:11.5px;color:#7b8296}
#deDistance{color:#c7ccd9;font-weight:600}
.de-courier{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid #232a3a}
.de-avatar{width:40px;height:40px;border-radius:50%;background:#3d4a6b;color:#dbe3ff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}
.de-courier-info{flex:1;display:flex;flex-direction:column}
.de-courier-info strong{font-size:14px}
.de-courier-info span{font-size:12px;color:#828aa0}
.de-contact{background:#ffb648;color:#1a1206;border:none;padding:9px 14px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}
.de-contact:hover{background:#ffc470}
.de-toast{position:absolute;left:50%;bottom:14px;transform:translate(-50%,12px);background:#1f2534;border:1px solid #303a52;color:#e6ebf5;font-size:12.5px;padding:8px 14px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .25s ease,transform .25s ease}
.de-toast.de-toast--show{opacity:1;transform:translate(-50%,0)}`,

  js: `// Simple client-side countdown driving the "Arriving in" label and progress fill.
let remainingSeconds = 2 * 3600 + 15 * 60; // 2h 15m
const totalSeconds = remainingSeconds;
const countdownEl = document.getElementById('deCountdown');
const fillEl = document.getElementById('deFill');
const distanceEl = document.getElementById('deDistance');
const totalDistanceMiles = 4.2;

function format(remaining) {
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  return h > 0 ? \`\${h}h \${m}m\` : \`\${m}m\`;
}

function tick() {
  if (remainingSeconds <= 0) return;
  remainingSeconds -= 60; // advance a minute per tick for a visible demo
  if (remainingSeconds < 0) remainingSeconds = 0;

  countdownEl.textContent = format(remainingSeconds);

  const elapsedRatio = 1 - remainingSeconds / totalSeconds;
  fillEl.style.width = (elapsedRatio * 100).toFixed(0) + '%';

  const distanceLeft = (totalDistanceMiles * (remainingSeconds / totalSeconds)).toFixed(1);
  distanceEl.textContent = distanceLeft + ' mi left';
}

const timer = setInterval(() => {
  tick();
  if (remainingSeconds <= 0) clearInterval(timer);
}, 3000); // tick every 3s for the demo (represents a minute passing)

const contactBtn = document.getElementById('deContact');
const toast = document.getElementById('deToast');
let toastTimeout;
contactBtn.addEventListener('click', () => {
  toast.classList.add('de-toast--show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('de-toast--show'), 2200);
});`,

  seo: {
    title: 'Delivery ETA Card — Free Countdown & Progress Courier Card',
    description: `A compact delivery-estimate card with a live countdown, a distance-remaining progress bar, courier name and avatar initial, and a contact-courier button. Plain HTML, CSS & JS.`,
    about: {
      title: 'Delivery ETA Card — A Compact Countdown Card for the Last Mile',
      description: `The delivery ETA card is the small, glanceable card food-delivery and courier apps show once an order is out for delivery — a countdown, a progress bar, and a way to reach the driver, all in one compact block. This snippet builds it in plain HTML, CSS, and JavaScript.

**Countdown as the headline**

The top of the card is a large, tabular-numeral countdown ("2h 15m") formatted by a small \`format()\` helper that switches between "Nh Nm" and "Nm" once the hour count hits zero. \`font-variant-numeric: tabular-nums\` keeps the digits from jittering in width as they change.

**Progress tied to the same countdown**

The progress bar's fill width and the "X mi left" label are both derived from the same \`remainingSeconds / totalSeconds\` ratio the countdown uses — so the bar, the distance label, and the time all stay mathematically consistent instead of being three separately animated pieces that can drift apart.

**Avatar-initial courier identity**

Rather than loading a photo, the courier is represented by a colored circle with their initials ("MK") — a lightweight, always-available identity pattern that avoids broken image states and loads instantly.

**A contact action with feedback**

The "Contact courier" button doesn't navigate away; it shows a small toast ("Calling Maria K. …") that fades in and back out, giving the user confirmation the tap registered — the same micro-interaction pattern used across delivery apps for in-card actions.

**A self-contained demo timer**

The JavaScript uses \`setInterval\` to advance the countdown for demonstration purposes (each tick represents a simulated minute). In production you'd replace this with a value computed from your delivery-tracking backend or recalculated from a real ETA timestamp on each poll.

**Customizing it**

Swap the countdown source for a real ETA timestamp, replace the avatar initials with a photo with a graceful fallback, or add a small map thumbnail. Pair it with a [package tracking route](/ui-snippets/package-tracking-map/) or [order tracking timeline](/ui-snippets/order-tracking-timeline/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The card renders with a starting countdown.` },
      { title: 'Watch it count down', text: `The demo timer advances every few seconds.` },
      { title: 'Watch the progress bar', text: `Fill and distance stay in sync with the timer.` },
      { title: 'Click "Contact courier"', text: `A toast confirms the action.` },
      { title: 'Wire to real data', text: `Replace remainingSeconds with a live ETA.` },
    ] },
    features: [
      { title: 'Live countdown', text: `Large tabular-numeral time-remaining display.` },
      { title: 'Synced progress bar', text: `Fill and distance derive from one ratio.` },
      { title: 'Avatar-initial identity', text: `No photo dependency, always renders.` },
      { title: 'Contact button with toast', text: `In-card feedback with no page navigation.` },
      { title: 'Compact card layout', text: `Fits a sidebar, modal, or app widget.` },
      { title: 'Smooth fill transition', text: `CSS transition animates progress changes.` },
      { title: 'Formatted time helper', text: `Switches between "Nh Nm" and "Nm" cleanly.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and JavaScript.` },
    ],
    useCases: [
      { title: 'Food delivery apps', text: `Show a live courier ETA after an order.` },
      { title: 'Package tracking', text: `Pair with a [package tracking route](/ui-snippets/package-tracking-map/).` },
      { title: 'Rideshare-style apps', text: `Reuse the pattern for a driver arrival card.` },
      { title: 'Order confirmation pages', text: `Sit beside [order summary](/ui-snippets/order-summary/).` },
      { title: 'Support widgets', text: `Give agents a quick courier-contact shortcut.` },
      { title: 'Dashboards', text: `Combine with a [status dashboard](/ui-snippets/status-dashboard/) for ops teams.` },
      { icon: 'CODE', title: 'Related: Motion One Spring Card Expand', desc: 'See the [Motion One Spring Card Expand](/ui-snippets/motion-flip-expand/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the countdown a real timer synced to a server?', a: `No — the demo advances remainingSeconds locally via setInterval to show the pattern. In production, recompute remainingSeconds from a real ETA timestamp each time you poll or receive a push update, rather than trusting client-side elapsed time alone.` },
      { q: 'Why do the progress bar and distance label stay in sync?', a: `Both are derived from the same elapsedRatio value (1 - remainingSeconds / totalSeconds) inside a single tick() function, so there's one source of truth instead of three independently updated elements that could drift apart.` },
      { q: 'Why use avatar initials instead of a courier photo?', a: `Initials in a colored circle render instantly with no network request and never show a broken-image icon. It's a common fallback pattern — you can layer a real <img> on top with an onerror handler that falls back to the initials if you want photos when available.` },
      { q: 'What does the "Contact courier" button actually do?', a: `In this snippet it shows a toast as a placeholder for the real action. In production, wire the click handler to open a masked-number call, an in-app chat thread, or a deep link, and keep the toast (or a similar confirmation) as feedback that the tap registered.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move remainingSeconds into component state, replace the setInterval-based tick with your framework's timer/effect pattern (recomputing from a real ETA when available), and bind the fill width, countdown text, and distance label to that state. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why deriving the progress-bar width and the distance-remaining label from the same ratio as the countdown prevents the three pieces of UI from drifting out of sync. It can help you replace the local setInterval demo timer with logic that recomputes the ETA from a real timestamp on each server poll (so the countdown stays accurate even if the tab was backgrounded), or help you add a small live map thumbnail or a "courier is nearby" push notification trigger when the countdown crosses a threshold.`,
      prompt: `Build a "delivery ETA card" in plain HTML, CSS, and JavaScript (no dependencies).

Requirements:
- A large, prominent countdown showing time remaining (e.g. "2h 15m") using tabular/monospaced numerals so the width doesn't jitter as digits change, formatted by a helper function that switches format once the hour count reaches zero.
- A progress bar (track + fill) representing how much of the delivery distance/time has elapsed, plus a "X mi left" style label — both the fill width and the distance label must be computed from the exact same underlying ratio as the countdown, not updated independently, so they can never drift out of sync with each other.
- A courier/driver identity row using an avatar built from initials in a colored circle (no image dependency), with a name and a small "Your courier" caption.
- A "Contact courier" button that, on click, shows a small toast/confirmation message that fades in and back out after a couple seconds, rather than navigating away.
- Drive the countdown with a simple interval-based demo timer that decrements a remaining-seconds value and updates the countdown, progress fill, and distance label together in one function each tick, so it's obvious where to plug in a real ETA timestamp later.
- Keep the whole card compact enough to fit in a sidebar or modal, and make sure the progress fill has a smooth CSS transition rather than jumping.`,
    },
  },
};

export default deliveryEtaCard;
