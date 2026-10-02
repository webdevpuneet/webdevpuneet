const heroCountdownLaunch = {
  id: 'hero-countdown-launch',
  title: 'Product Launch Countdown Hero',
  lastmod: '2026-08-23',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="clh-hero">
  <div class="clh-glow"></div>

  <span class="clh-eyebrow" id="clhEyebrow">Launching soon</span>
  <h1 class="clh-h1" id="clhHeadline">Something new<br>is almost here</h1>
  <p class="clh-sub" id="clhSub">We're putting the final touches on it. Set a reminder and be the first through the door.</p>

  <div class="clh-timer" id="clhTimer">
    <div class="clh-unit"><span class="clh-num" id="clhDays">00</span><span class="clh-label">Days</span></div>
    <span class="clh-sep">:</span>
    <div class="clh-unit"><span class="clh-num" id="clhHours">00</span><span class="clh-label">Hours</span></div>
    <span class="clh-sep">:</span>
    <div class="clh-unit"><span class="clh-num" id="clhMinutes">00</span><span class="clh-label">Min</span></div>
    <span class="clh-sep">:</span>
    <div class="clh-unit"><span class="clh-num" id="clhSeconds">00</span><span class="clh-label">Sec</span></div>
  </div>

  <form class="clh-form" id="clhForm">
    <input type="email" id="clhEmail" placeholder="you@email.com" required>
    <button type="submit" id="clhBtn">Notify me</button>
  </form>
  <p class="clh-confirm" id="clhConfirm" role="status"></p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e1a;color:#f1f5f9}
.clh-hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:22px;padding:24px;overflow:hidden}
.clh-glow{position:absolute;top:-10%;left:50%;transform:translateX(-50%);width:800px;height:500px;background:radial-gradient(ellipse,rgba(250,204,21,.1),transparent 65%);pointer-events:none}
.clh-eyebrow{position:relative;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#facc15}
.clh-h1{position:relative;font-size:clamp(32px,5.8vw,58px);font-weight:800;line-height:1.1;letter-spacing:-.02em;max-width:640px}
.clh-sub{position:relative;font-size:15.5px;color:#94a3b8;line-height:1.7;max-width:460px}

.clh-timer{position:relative;display:flex;align-items:center;gap:12px;margin:16px 0 6px}
.clh-unit{display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px 16px;min-width:68px}
.clh-num{font-size:clamp(24px,4vw,34px);font-weight:800;font-variant-numeric:tabular-nums;color:#facc15}
.clh-label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#64748b}
.clh-sep{position:relative;font-size:24px;font-weight:800;color:#334155;margin-top:-20px}

.clh-form{position:relative;display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;justify-content:center}
.clh-form input{font:inherit;font-size:14px;padding:12px 16px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:#12151f;color:#f1f5f9;min-width:220px;outline:none;transition:border-color .15s}
.clh-form input:focus{border-color:#facc15}
.clh-form button{background:#facc15;color:#1c1503;font-weight:700;font-size:14.5px;padding:12px 22px;border:none;border-radius:9px;cursor:pointer;transition:background .15s,transform .15s}
.clh-form button:hover{background:#eab308;transform:translateY(-1px)}
.clh-confirm{position:relative;font-size:13px;color:#34d399;font-weight:600;min-height:16px}

/* Live state */
.clh-hero.clh-live .clh-timer{display:none}
.clh-hero.clh-live .clh-eyebrow{color:#34d399}
.clh-hero.clh-live .clh-form button{background:#34d399}
.clh-hero.clh-live .clh-form button:hover{background:#10b981}`,

  js: `// Real live countdown: recomputed from the actual clock every second, with a genuine transition to a "live" state.
const LAUNCH_AT = Date.now() + (2 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000) + (32 * 60 * 1000); // demo target: ~2d 6h 32m from load

const hero = document.querySelector('.clh-hero');
const eyebrow = document.getElementById('clhEyebrow');
const headline = document.getElementById('clhHeadline');
const sub = document.getElementById('clhSub');
const btn = document.getElementById('clhBtn');
const daysEl = document.getElementById('clhDays');
const hoursEl = document.getElementById('clhHours');
const minutesEl = document.getElementById('clhMinutes');
const secondsEl = document.getElementById('clhSeconds');
const form = document.getElementById('clhForm');
const emailInput = document.getElementById('clhEmail');
const confirm = document.getElementById('clhConfirm');

let timerId = null;
let isLive = false;

function pad(n) {
  return String(n).padStart(2, '0');
}

function tick() {
  const remaining = LAUNCH_AT - Date.now();

  if (remaining <= 0 && !isLive) {
    goLive();
    return;
  }
  if (remaining <= 0) return;

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function goLive() {
  isLive = true;
  clearInterval(timerId);
  hero.classList.add('clh-live');
  eyebrow.textContent = "We're live!";
  headline.innerHTML = 'It&rsquo;s here.<br>Go get it.';
  sub.textContent = 'Launch day is now. Thanks for waiting with us.';
  btn.textContent = 'Get started';
}

tick();
timerId = setInterval(tick, 1000);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  if (!emailOk) {
    confirm.style.color = '#f87171';
    confirm.textContent = 'Enter a valid email address.';
    return;
  }
  confirm.style.color = '#34d399';
  confirm.textContent = isLive ? "You're in — redirecting shortly." : "You're on the list — we'll email you at launch.";
  form.reset();
});`,

  seo: {
    title: 'Product Launch Countdown Hero — Free HTML CSS JS Snippet',
    description: `A coming-soon hero with a real live countdown timer that transitions to a "We're live!" state and CTA once it reaches zero. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Product Launch Countdown Hero — Live Timer with a Real Zero-State Transition',
      description: `A launch countdown is only convincing if the numbers are actually counting toward something. This snippet computes days/hours/minutes/seconds from a real target timestamp on every tick, and — the part most countdown snippets skip — genuinely transitions the whole hero into a "we're live" state the moment the countdown reaches zero, rather than freezing at 00:00:00:00 forever.

**Counting from a real target, not decrementing a number**

\`LAUNCH_AT\` is a timestamp (\`Date.now()\` plus an offset for this demo — swap it for a fixed launch date in production). Every second, \`tick()\` recomputes \`remaining = LAUNCH_AT - Date.now()\` from scratch and derives each unit from that fresh value with integer division and modulo. This matters: a countdown that just decrements a stored \`seconds\` variable by one each tick drifts out of sync if the tab is backgrounded or the interval is throttled — recomputing from the real clock every tick means the display is always correct the instant it runs, even after a long pause.

**A genuine zero-state transition**

Once \`remaining <= 0\`, \`goLive()\` fires exactly once (guarded by the \`isLive\` flag so it can't re-trigger), clears the interval, swaps the eyebrow label, headline, subheading, and button text, and adds a \`.clh-live\` class that hides the timer and re-colors the UI from amber to green via CSS. This is the detail that separates a real countdown from a decorative one: the page's whole story changes on schedule, without a reload.

**Padded, tabular-width digits**

Each unit is zero-padded with \`padStart(2, '0')\` and rendered with \`font-variant-numeric: tabular-nums\`, so digits don't shift the layout width as they change — "09" and "10" occupy the same visual space, which matters for a number that updates every second right next to body copy.

**A functioning notify form, live and post-launch**

The email form validates with a regex on submit and shows a real confirmation message — and because the confirmation text checks the same \`isLive\` flag, the copy correctly differs before and after launch ("we'll email you at launch" vs. "redirecting shortly") without needing two separate forms.

**Customizing it**

Replace \`LAUNCH_AT\` with a fixed \`new Date('2026-09-01T09:00:00Z').getTime()\`, wire the notify form to a real waitlist API, and adjust the \`goLive()\` copy and \`.clh-live\` CSS to your brand's launch messaging. Pair it with [countdown timer](/ui-snippets/countdown-timer/) or [circular countdown](/ui-snippets/circular-countdown/) for a non-hero countdown, or [coming soon hero](/ui-snippets/coming-soon-hero/) for a lighter pre-launch layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The countdown starts immediately, ticking down from the demo target.` },
      { title: 'Watch the seconds update', text: `Each unit recomputes from Date.now() every second — a real live timer.` },
      { title: 'Set a real launch date', text: `Replace LAUNCH_AT with new Date('2026-09-01T09:00:00Z').getTime().` },
      { title: 'Test the live transition', text: `Temporarily set LAUNCH_AT to a few seconds in the future to see goLive() fire.` },
      { title: 'Submit the notify form', text: `Validated inline; the confirmation message differs before/after launch.` },
      { title: 'Wire a real waitlist API', text: `Replace the confirmation branch with a fetch() call to your backend.` },
    ] },
    features: [
      { title: 'Recomputed every tick', text: `Derived fresh from Date.now(), never drifts from a stored counter.` },
      { title: 'Real zero-state transition', text: `goLive() swaps copy, CTA, and styling exactly once.` },
      { title: 'Tabular-num digits', text: `Zero-padded numbers that never shift layout width.` },
      { title: 'Guarded single trigger', text: `isLive flag prevents goLive() re-firing.` },
      { title: 'Live-aware confirmation copy', text: `Notify form message adapts pre/post launch.` },
      { title: 'Inline email validation', text: `Regex check with an error state, no library.` },
      { title: 'Ambient glow backdrop', text: `Radial gradient anchors the composition.` },
      { title: 'No dependencies', text: `Pure vanilla JS timer logic.` },
    ],
    useCases: [
      { title: 'Pre-launch countdown pages', text: 'Pair with a [coming soon hero](/ui-snippets/coming-soon-hero/) for the pre-launch phase, with a countdown derived fresh from `Date.now()` on every tick.' },
      { title: 'Event and webinar starts', text: 'Swap the copy for an event start time, with zero-padded tabular digits that never shift the layout width.' },
      { title: 'Flash sale and drop pages', text: 'Reuse `goLive()` to switch to a Shop now state at zero, guarded by an `isLive` flag so the transition fires only once.' },
      { title: 'App store launch pages', text: 'Follow the countdown with an [app hero](/ui-snippets/app-hero/) after release, automatically swapping copy and call to action.' },
      { title: 'Crowdfunding and beta transitions', text: 'Count down to a campaign opening, or automate the messaging switch between beta and general availability.' },
      { icon: 'CODE', title: 'Related: Hero Framed as Us vs. Them', desc: 'See the [Hero Framed as Us vs. Them](/ui-snippets/hero-comparison-vs-competitor/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the countdown drift if the tab is backgrounded?', a: `No — tick() recomputes remaining as LAUNCH_AT minus the current Date.now() from scratch on every call, rather than decrementing a stored counter by one each second. Even if setInterval is throttled while the tab is backgrounded and several ticks are skipped, the next tick that does run calculates the correct remaining time from the real clock, so the display self-corrects instead of drifting.` },
      { q: 'What happens exactly when the countdown reaches zero?', a: `Once remaining is 0 or less and the isLive flag hasn't been set yet, goLive() runs exactly once: it clears the interval, sets isLive to true (preventing re-entry), swaps the eyebrow label, headline, subheading, and button text to launch-day copy, and adds a clh-live class that hides the timer and switches the accent color from amber to green via CSS.` },
      { q: 'How do I set a real launch date instead of the demo offset?', a: `Replace the LAUNCH_AT line with a fixed timestamp, e.g. const LAUNCH_AT = new Date('2026-09-01T09:00:00Z').getTime(); — using an ISO string with an explicit timezone offset (Z for UTC) avoids ambiguity about which timezone the countdown targets.` },
      { q: 'Does the notify form know whether the product has launched yet?', a: `Yes. The submit handler checks the same isLive flag the countdown itself uses, so the confirmation message reads "we'll email you at launch" before the countdown ends and "redirecting shortly" after — one shared source of truth drives both the timer display and the form copy.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Store LAUNCH_AT as a constant (or prop), and run the tick logic inside a mount effect with setInterval, clearing it in the cleanup function. Keep isLive and the four unit values in component state so re-renders reflect them, and call the equivalent of goLive() as a state update rather than direct DOM manipulation once remaining reaches zero.` },
    ],
    aiPrompt: {
      paragraph: `Instead of trusting a countdown snippet at face value, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why recomputing remaining = LAUNCH_AT - Date.now() on every tick avoids the drift problem a naive decrement-by-one-second counter has, especially across a backgrounded browser tab where setInterval gets throttled. The same assistant can help you verify the zero-state logic — ask it to trace through what happens if goLive() were called twice, and why the isLive guard prevents that. It's also useful for extending the pattern: ask it to persist the launch state in localStorage so a returning visitor who missed the live transition sees the correct state on reload, add a per-unit flip animation when a digit changes, or wire the notify form to a real backend with loading and duplicate-email states. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a product launch countdown hero in plain HTML, CSS, and vanilla JavaScript (no library, no CDN) that transitions to a live state when the countdown ends.

Requirements:
- A hero with an eyebrow label, headline, subheading, a four-unit countdown display (days/hours/minutes/seconds, each zero-padded to two digits with tabular number styling so digit width never shifts), and an email notify form with a submit button.
- Set a fixed target timestamp constant and, on an interval running once per second, recompute the remaining time as target-minus-current-time from scratch every tick (do not decrement a stored counter by one each second) — derive days/hours/minutes/seconds from that fresh remaining-milliseconds value using integer division and modulo.
- When the remaining time reaches zero or below, transition the hero into a genuine "live" state exactly once (guard against re-triggering): stop the interval, hide the countdown display, swap the eyebrow/headline/subheading/button text to launch-day copy, and apply a different accent color via a CSS class toggle.
- The email form should validate the input against a basic email-shape regex on submit, prevent default navigation, and show an inline confirmation message whose wording differs depending on whether the countdown has already reached the live state or not.
- Use Date.now() as the time source throughout so the countdown is always correct relative to the real clock, including after the tab has been backgrounded and interval ticks were skipped or throttled.`,
    },
  },
};

export default heroCountdownLaunch;
