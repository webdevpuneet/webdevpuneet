const bootstrapRateLimitedActionButton = {
  id: 'bootstrap-rate-limited-action-button',
  title: 'Bootstrap Rate-Limited Action Button',
  lastmod: '2026-09-11',
  category: 'buttons',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsrate-card">
    <div class="card-body p-4">
      <label class="form-label small fw-semibold">Invite a teammate</label>
      <div class="input-group mb-2">
        <input type="email" class="form-control" id="bsrateEmail" placeholder="teammate@company.com">
        <button type="button" class="btn btn-dark fw-bold" id="bsrateBtn">Send invite</button>
      </div>
      <p class="small text-muted mb-0" id="bsrateStatus">You can send up to 3 invites per minute.</p>
    </div>
  </div>
</div>`,
  css: `.bsrate-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bsrateStatus.text-danger { color: #dc3545 !important; }
#bsrateStatus.text-success { color: #198754 !important; }`,
  js: `const LIMIT = 3;
const WINDOW_MS = 60 * 1000;
const DEMO_WINDOW_MS = 8 * 1000; // sped up so the cooldown is actually observable here

const btn = document.getElementById('bsrateBtn');
const email = document.getElementById('bsrateEmail');
const status = document.getElementById('bsrateStatus');

// Timestamps of recent sends. Rate limiting by "count within a sliding
// window" rather than a flat cooldown after every click — the first LIMIT
// clicks are instant, and only clicking faster than the limit allows starts
// blocking, which matches how real API rate limits typically behave.
let sentAt = [];
let cooldownTimer = null;

function prune() {
  const cutoff = Date.now() - DEMO_WINDOW_MS;
  sentAt = sentAt.filter(t => t > cutoff);
}

function msUntilNextSlot() {
  prune();
  if (sentAt.length < LIMIT) return 0;
  return sentAt[0] + DEMO_WINDOW_MS - Date.now();
}

function updateButton() {
  const wait = msUntilNextSlot();
  clearInterval(cooldownTimer);

  if (wait <= 0) {
    btn.disabled = false;
    btn.textContent = 'Send invite';
    return;
  }

  btn.disabled = true;
  const tick = () => {
    const remaining = Math.ceil(msUntilNextSlot() / 1000);
    if (remaining <= 0) {
      clearInterval(cooldownTimer);
      updateButton();
      return;
    }
    btn.textContent = 'Wait ' + remaining + 's';
  };
  tick();
  cooldownTimer = setInterval(tick, 250);
}

btn.addEventListener('click', () => {
  if (!email.value.trim()) {
    status.textContent = 'Enter an email address first.';
    status.className = 'small text-danger mb-0';
    return;
  }
  if (msUntilNextSlot() > 0) return;

  sentAt.push(Date.now());
  status.textContent = 'Invite sent to ' + email.value.trim() + '.';
  status.className = 'small text-success mb-0';
  email.value = '';
  updateButton();
});

updateButton();`,

  seo: {
    title: 'Bootstrap Rate-Limited Action Button — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 sliding-window rate limiter on a button — the first few clicks fire instantly, and only exceeding the limit starts a live "Wait Ns" countdown, matching how real API rate limits actually work.',
    about: {
      title: 'Bootstrap Rate-Limited Action Button — HTML, CSS & JavaScript',
      description: `This models a genuinely different, more realistic pattern than a flat "disable for N seconds after every click" cooldown — \`sentAt\` records the timestamp of every recent click, and \`prune()\` discards any older than the sliding window before every check, so the button only ever blocks once \`LIMIT\` clicks have genuinely happened within that window. The first few clicks in a row fire instantly, one after another, exactly like a real API token-bucket or sliding-window rate limiter behaves — not like a resend-code button that always makes you wait the same fixed delay even for your very first click.\n\n\`msUntilNextSlot()\` is the one function both the click handler and the countdown display read from — it returns \`0\` when there's room under the limit, or the exact number of milliseconds until the oldest recorded click ages out of the window and frees up a slot. Because both places call the same function, the button's disabled state and the countdown number it displays can never disagree about how long is actually left.\n\nThe countdown ticks every 250ms rather than a full second, re-deriving the remaining time from \`msUntilNextSlot()\` on every tick instead of counting down a separately stored number — which is what keeps the displayed countdown accurate even if the tab was backgrounded and timers were throttled, since it's always computed fresh from real timestamps rather than decremented blindly.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type an email and click "Send invite" three times in a row quickly', text: 'All three sends go through instantly, one after another, with no waiting.' },
        { title: 'Try clicking a fourth time immediately', text: 'The button disables and shows a live "Wait Ns" countdown instead of sending.' },
        { title: 'Watch the countdown', text: 'It ticks down in real time until the oldest of your three sends ages out of the window.' },
        { title: 'Wait for the countdown to reach zero', text: 'The button re-enables itself automatically, ready for another send.' },
        { title: 'Click "Send invite" with the email field empty', text: 'It shows a validation message instead of counting toward the rate limit at all.' },
      ],
    },
    features: [
      'A genuine sliding-window rate limiter — the first several clicks are instant, unlike a flat per-click cooldown',
      'One msUntilNextSlot() function is the single source of truth for both blocking clicks and the countdown display',
      'The countdown re-derives remaining time from real timestamps every tick, staying accurate through timer throttling',
      'An empty/invalid input is rejected without consuming one of the limited send slots',
      'The button automatically re-enables itself the instant a slot frees up, with no manual reset needed',
    ],
    useCases: [
      { icon: 'FORM', title: 'Invite, resend, and notification-sending buttons', desc: 'Prevents accidental spam-clicking from firing dozens of emails or notifications in a burst.' },
      { icon: 'API', title: 'Any UI action backed by a rate-limited API endpoint', desc: 'Mirrors the real backend limit in the UI itself, so a user sees the constraint before hitting an API error.' },
      { icon: 'APP', title: 'Comment, like, or vote buttons needing abuse prevention', desc: 'A lightweight client-side deterrent against rapid repeated actions, alongside real server-side rate limiting.' },
    ],
    faqs: [
      { q: 'How is this different from a simple "disable for 30 seconds after clicking" cooldown?', a: 'A flat cooldown blocks every single click equally, even the very first one in a session. This sliding-window approach allows a genuine burst of clicks up to the limit before blocking anything, only kicking in once that limit is actually exceeded — much closer to how real API rate limits (and their 429 responses) typically behave.' },
      { q: 'Why does the countdown recompute from timestamps instead of just counting down a number?', a: 'A plain decrementing counter can drift if the browser throttles background tab timers; recomputing msUntilNextSlot() from real Date.now() timestamps on every tick keeps the displayed countdown accurate regardless of any timer throttling that occurred in between.' },
      { q: 'Does an invalid or empty submission still count against the rate limit?', a: 'No — the empty-email check happens before msUntilNextSlot() is even consulted for blocking, and a rejected empty submission never gets pushed into sentAt, so it doesn\'t consume one of the limited slots.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep sentAt in a ref (not state, since it updates on a timer without needing a full re-render for every millisecond) and mirror the computed disabled/label values into component state on each tick, the same way this snippet updates the DOM directly.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to persist the sentAt timestamps in localStorage so the rate limit survives a page refresh, or to sync the client-side limit with a real API's rate-limit response headers (like X-RateLimit-Remaining and X-RateLimit-Reset) instead of tracking clicks purely client-side.`,
      prompt: `Build a Bootstrap 5.3 button with client-side sliding-window rate limiting, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- An input field and an action button (e.g. "Send invite") that allows up to a fixed number of clicks (e.g. 3) within a rolling time window, tracked as an array of click timestamps rather than a single flat cooldown.
- Once the limit is reached within the current window, disable the button and show a live countdown (e.g. "Wait 7s") counting down to the moment the oldest click ages out of the window and frees up a slot — recompute the remaining time from real timestamps on every tick, not by decrementing a stored number.
- The button must re-enable itself automatically and immediately once a slot becomes available, with no manual reset action required.
- An empty or invalid input submission must be rejected with a validation message and must not count against the rate limit at all.`,
    },
  },
};

export default bootstrapRateLimitedActionButton;
