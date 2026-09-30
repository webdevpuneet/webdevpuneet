const tokenBucketRateLimiterVisualizer = {
  id: 'token-bucket-rate-limiter-visualizer',
  title: 'Token Bucket Rate Limiter Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="wrap">
  <div class="top-row">
    <div class="bucket-panel" id="bucket-panel">
      <div class="bucket-label">Token Bucket <span class="rate-tag">refill 1 tok/sec &middot; capacity 10</span></div>
      <div class="bucket">
        <div class="bucket-fill" id="bucket-fill"></div>
      </div>
      <div class="pip-row" id="pip-row"></div>
      <div class="token-count"><span id="token-count">10.0</span> / 10 tokens</div>
    </div>
    <div class="controls-panel">
      <button class="btn btn-primary" id="btn-send" type="button">Send Request</button>
      <button class="btn" id="btn-burst" type="button">Burst Click (6x)</button>
      <div class="stats">
        <div class="stat"><span class="stat-label">Allowed</span><span class="stat-val ok" id="stat-allowed">0</span></div>
        <div class="stat"><span class="stat-label">Rejected</span><span class="stat-val bad" id="stat-rejected">0</span></div>
      </div>
    </div>
  </div>
  <div class="log-panel">
    <div class="log-title">Request Log</div>
    <div class="log-list" id="log-list"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 620px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.top-row { display: flex; gap: 16px; }
.bucket-panel { flex: 1; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 12px; padding: 14px; transition: background-color 0.2s ease; }
.bucket-panel.flash-ok { background: #ecfdf5; }
.bucket-panel.flash-bad { background: #fef2f2; }

.bucket-label { font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 10px; }
.rate-tag { display: block; font-size: 10.5px; font-weight: 600; color: #94a3b8; margin-top: 2px; text-transform: none; }

.bucket { position: relative; height: 120px; border: 2px solid #cbd5e1; border-top: none; border-radius: 0 0 14px 14px; background: #fff; overflow: hidden; }
.bucket-fill { position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(180deg, #a5b4fc, #6366f1); transition: height 0.25s linear; }

.pip-row { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; margin-top: 8px; }
.pip { height: 14px; border-radius: 3px; background: linear-gradient(to top, #6366f1 var(--fill, 0%), #e2e8f0 var(--fill, 0%)); transition: background 0.1s linear; }

.token-count { margin-top: 8px; font-size: 13px; font-weight: 700; color: #0f172a; font-variant-numeric: tabular-nums; }

.controls-panel { width: 180px; display: flex; flex-direction: column; gap: 8px; }
.btn { font-size: 13px; font-weight: 600; padding: 10px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: all 0.15s; }
.btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; border-color: #4f46e5; }
.btn:active { transform: scale(0.97); }

.stats { display: flex; gap: 10px; margin-top: 6px; }
.stat { flex: 1; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 8px; padding: 8px; text-align: center; }
.stat-label { display: block; font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-val { font-size: 16px; font-weight: 800; }
.stat-val.ok { color: #16a34a; }
.stat-val.bad { color: #ef4444; }

.log-panel { margin-top: 14px; padding-top: 14px; border-top: 1px solid #f1f5f9; }
.log-title { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
.log-list { display: flex; flex-direction: column-reverse; gap: 4px; max-height: 140px; overflow-y: auto; }
.log-item { font-size: 12px; padding: 6px 10px; border-radius: 6px; font-family: ui-monospace, monospace; animation: slideIn 0.18s ease; }
.log-item.ok { background: #ecfdf5; color: #15803d; }
.log-item.bad { background: #fef2f2; color: #b91c1c; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`,
  js: `const CAPACITY = 10;
const REFILL_RATE = 1;

let tokens = CAPACITY;
let lastTick = performance.now();
let startTime = performance.now();
let allowed = 0;
let rejected = 0;

const pipRow = document.getElementById('pip-row');
for (let i = 0; i < CAPACITY; i++) {
  const pip = document.createElement('div');
  pip.className = 'pip';
  pipRow.appendChild(pip);
}
const pips = pipRow.querySelectorAll('.pip');

function renderBucket() {
  document.getElementById('bucket-fill').style.height = (tokens / CAPACITY * 100) + '%';
  document.getElementById('token-count').textContent = tokens.toFixed(1);
  const full = Math.floor(tokens);
  const frac = tokens - full;
  pips.forEach((p, i) => {
    if (i < full) p.style.setProperty('--fill', '100%');
    else if (i === full) p.style.setProperty('--fill', (frac * 100) + '%');
    else p.style.setProperty('--fill', '0%');
  });
}

function tick(now) {
  const elapsed = (now - lastTick) / 1000;
  lastTick = now;
  tokens = Math.min(CAPACITY, tokens + elapsed * REFILL_RATE);
  renderBucket();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

function flashBucket(kind) {
  const panel = document.getElementById('bucket-panel');
  panel.classList.remove('flash-ok', 'flash-bad');
  void panel.offsetWidth;
  panel.classList.add(kind === 'ok' ? 'flash-ok' : 'flash-bad');
  setTimeout(() => panel.classList.remove('flash-ok', 'flash-bad'), 260);
}

function log(text, kind) {
  const list = document.getElementById('log-list');
  const el = document.createElement('div');
  el.className = 'log-item ' + kind;
  const t = ((performance.now() - startTime) / 1000).toFixed(1);
  el.textContent = '[' + t + 's] ' + text;
  list.appendChild(el);
  while (list.children.length > 30) list.removeChild(list.firstChild);
}

function updateStats() {
  document.getElementById('stat-allowed').textContent = String(allowed);
  document.getElementById('stat-rejected').textContent = String(rejected);
}

function sendRequest() {
  if (tokens >= 1) {
    tokens -= 1;
    allowed++;
    flashBucket('ok');
    log('Request allowed \\u2014 ' + tokens.toFixed(1) + ' tokens left', 'ok');
  } else {
    rejected++;
    flashBucket('bad');
    log('Request rejected \\u2014 bucket empty, refilling at 1/sec', 'bad');
  }
  updateStats();
  renderBucket();
}

function burst() {
  for (let i = 0; i < 6; i++) {
    setTimeout(sendRequest, i * 110);
  }
}

document.getElementById('btn-send').addEventListener('click', sendRequest);
document.getElementById('btn-burst').addEventListener('click', burst);

renderBucket();
log('Bucket starts full at capacity (10 tokens)', 'ok');`,
  seo: {
    title: 'Token Bucket Rate Limiter Visualizer — Free JS Snippet',
    description: 'Animated bucket refills at a steady rate and drains per request, proving burst tolerance beats fixed-window limiting. Exports to React & Vue.',
    about: {
      title: 'Token Bucket Rate Limiter Visualizer — Animated Refill Rate, Capacity Draining & Burst Tolerance Demo in Vanilla JS',
      description: `Rate limiting is usually described in one sentence ("limit users to N requests per second") that hides the actual design decision every API gateway has to make: what happens to a client that sends 10 requests in the first 100 milliseconds of a fresh minute, then goes quiet? A naive fixed-window counter either blocks that burst outright or, worse, lets it double up at a window boundary. The token bucket algorithm — used by AWS API Gateway, Stripe's API, and most CDN edge limiters — handles it differently, and this snippet implements the real mechanics rather than a stylized approximation of them.

**The refill loop: continuous time, not discrete ticks**

The bucket does not refill in visible per-second jumps. \`tick(now)\` runs on \`requestAnimationFrame\` and computes \`elapsed = (now - lastTick) / 1000\` on every single frame, then adds \`elapsed * REFILL_RATE\` to the \`tokens\` float, capped at \`CAPACITY\` with \`Math.min\`. Because this happens roughly 60 times a second, refilling is visually continuous — the bucket-fill bar's height and the fractional pip both creep upward smoothly rather than snapping in whole-token jumps. This matters for accuracy: real token bucket implementations (including the ones behind AWS and Stripe's limiters) also track tokens as a continuous value internally and only ever check "is there at least 1.0 available" at request time, not at refill time.

**Capacity and the two discrete visualizations of the same number**

\`tokens\` is a single float between 0 and \`CAPACITY\` (10 in this demo). It is rendered two ways simultaneously: a liquid \`bucket-fill\` div whose \`height\` is set to \`tokens / CAPACITY * 100%\` for a smooth analog read, and a row of 10 \`.pip\` elements where pips below \`Math.floor(tokens)\` are fully lit, the pip at exactly \`Math.floor(tokens)\` shows the fractional remainder as a partial CSS gradient fill via a \`--fill\` custom property, and pips above that are empty. Both views are driven from the exact same \`tokens\` variable on every animation frame, so they never disagree with each other or with the numeric \`token-count\` readout.

**Consuming a token: the actual rate-limit check**

\`sendRequest()\` is the entire rate-limit decision, and it is two lines: \`if (tokens >= 1) { tokens -= 1; ...allow... } else { ...reject... }\`. There is no separate request-counting window, no timestamp bucket, no sliding array of recent request times — the single \`tokens\` float is simultaneously the rate limiter's entire state. A green flash on the bucket panel and a log entry confirm an allowed request; a red flash and a distinct log entry confirm a rejection, with both counted in the Allowed/Rejected stat tiles so the outcome is never just a color you have to trust.

**Why burst tolerance is the actual point, demonstrated with real math**

The Burst Click button fires 6 \`sendRequest()\` calls 110ms apart — well within the same second, so almost no natural refill happens between them. Starting from a full bucket of 10 tokens, all 6 succeed instantly, because the bucket had capacity sitting banked from before the burst even started. This is the core behavior a fixed-window counter cannot replicate cleanly: a client that has been idle is allowed to spend its saved-up capacity all at once, up to \`CAPACITY\`, without being throttled mid-burst. Click Burst Click again immediately afterward with only 4 tokens left banked (10 minus the 6 just spent, still recovering at 1/sec) and watch some of the second burst get rejected — the system is not "10 requests per second" in the way a naive counter would enforce it, it is "spend up to 10 banked tokens instantly, then settle into a steady 1-per-second replenishment rate," which is exactly the guarantee real APIs advertise as their both burst allowance and sustained rate limit in the same sentence.

**Why not a fixed-window counter instead**

A fixed-window limiter resets a request counter to zero every fixed interval (e.g. every 1000ms) and rejects once the counter hits the limit within that window. Its failure mode is the classic "boundary burst": a client can send the full limit at the very end of one window and the full limit again at the very start of the next, delivering 2x the intended rate in a short span straddling the boundary, something the continuously-draining, continuously-refilling token bucket in this snippet structurally cannot do, because there is no window edge for two bursts to stack across.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the bucket sit full at 10 tokens on load', text: 'The liquid fill bar is at 100% and all 10 pips below it are lit indigo — the log confirms the bucket starts full at capacity.' },
      { title: 'Click Send Request a few times in a row', text: 'Each click drains exactly one token: the fill bar drops slightly, one pip empties, the panel flashes green, and a log entry confirms the request was allowed with the remaining token count.' },
      { title: 'Click Burst Click (6x)', text: 'Six requests fire 110ms apart. Because the bucket started full, all six succeed almost instantly — this is burst tolerance: banked capacity can be spent all at once.' },
      { title: 'Immediately click Burst Click again', text: 'With only a few tokens recovered so far, some of this second burst gets rejected — the panel flashes red and the log shows "bucket empty, refilling at 1/sec" for the calls that missed.' },
      { title: 'Stop clicking and watch the bucket refill on its own', text: 'The fill bar and pips creep back upward continuously, gaining roughly one full token every second, driven by a requestAnimationFrame loop rather than a stepped timer.' },
      { title: 'Compare the Allowed and Rejected counters', text: 'The running totals make the burst-then-throttle pattern concrete: a fixed-window counter would either reject the whole burst upfront or, at a window boundary, allow double the intended rate — neither of which happens here.' },
    ]},
    features: [
      'Bucket state is a single continuous float (0 to capacity), refilled every animation frame based on real elapsed time, not stepped ticks',
      'Dual visualization of the same value: a smooth liquid fill bar plus 10 discrete pips with a partially-filled fractional pip',
      'Rate-limit decision is exactly two lines: consume 1 token if available, otherwise reject — no separate window-counter state',
      'Burst Click fires 6 rapid requests to demonstrate that banked capacity can be spent instantly up to the bucket\'s capacity',
      'Green/red panel flash plus a scrolling, timestamped request log confirm every allow and reject decision individually',
      'Live Allowed and Rejected counters make the burst-then-throttle behavior comparable as numbers, not just colors',
      'Refill rate (1 token/sec) and capacity (10) are both named constants — change either to model a stricter or looser real API limit',
      'Zero dependencies, pure requestAnimationFrame plus setTimeout — no external timer or animation library',
    ],
    useCases: [
      { icon: 'APP', title: 'Explaining API rate-limit design to a team or in documentation', desc: 'Drop this into internal engineering docs or an onboarding deck when introducing a new rate limiter — watching a burst succeed and then throttle is far more convincing than a paragraph describing "burst allowance" in the abstract. Pair with the [WebSocket vs polling visualizer](/ui-snippets/websocket-vs-polling-visualizer) for a broader real-time-systems explainer sequence.' },
      { icon: 'LEARN', title: 'System design interview preparation', desc: 'Token bucket versus fixed-window versus sliding-window rate limiting is one of the most frequently asked system design interview topics. This visualizer makes the specific failure mode of fixed-window counters (boundary bursts) concrete enough to explain confidently out loud during an interview.' },
      { icon: 'CODE', title: 'Reference implementation before writing a real limiter', desc: 'The refill-and-consume logic here (a float token count, elapsed-time-based refill, a single >= 1 check) maps almost directly onto how Redis-backed token bucket limiters and libraries like the Node "limiter" package implement the same algorithm server-side, minus the animation layer.' },
      { icon: 'DASH', title: 'Dashboard widget for live API quota status', desc: 'Adapt the bucket-fill-plus-pips visualization as a real-time quota indicator in a developer-facing API dashboard, replacing the simulated tokens with a live count polled or pushed from your actual rate-limiter backend.' },
      { icon: 'DESIGN', title: 'Teaching material for a distributed systems or backend course', desc: 'Use as a live, clickable companion to a lecture on API gateways and traffic shaping, letting students trigger their own bursts and directly observe the difference between burst allowance and sustained throughput instead of reading it from a textbook diagram.' },
    ],
    faqs: [
      { q: 'Can I use this rate limiter visualizer in React, Vue, or Angular?', a: 'Yes, with one important change: the requestAnimationFrame refill loop must be started and stopped inside the framework\'s lifecycle, not at module load time. In React, start it in a useEffect with an empty dependency array, store the frame id in a ref, and call cancelAnimationFrame(ref.current) in the cleanup function so the loop stops on unmount. In Vue, start it in onMounted and cancel it in onUnmounted the same way. In Angular, start it in ngAfterViewInit and cancel it in ngOnDestroy. The setTimeout chain used by burst() should also be tracked in an array and cleared on unmount if a burst might still be in flight when the component is removed, otherwise it will try to update state on an unmounted component.' },
      { q: 'Why does token bucket allow bursts instead of enforcing a strict steady rate?', a: 'Because real traffic is rarely perfectly smooth — a client might legitimately need to send several requests at once (e.g. loading a page with 6 API calls) and then stay quiet for a while. Token bucket lets a client "save up" unused capacity, up to the bucket\'s capacity, and spend it all at once without being throttled mid-burst, then falls back to the steady refill rate once that banked capacity runs out. This is why API providers describe their limits as both a burst number and a sustained rate, not just one number.' },
      { q: 'How is this different from a fixed-window counter?', a: 'A fixed-window counter resets a request count to zero every fixed interval and blocks once the count hits the limit within that window. Its known failure mode is a boundary burst: a client can send the full limit right at the end of one window and the full limit again right at the start of the next, delivering roughly double the intended rate across the boundary. Token bucket has no window edges to straddle, because tokens refill continuously rather than resetting in a lump at fixed instants, which this snippet\'s frame-by-frame refill loop demonstrates directly.' },
      { q: 'What happens if I change the refill rate or capacity constants?', a: 'REFILL_RATE and CAPACITY are both plain constants at the top of the script. Raising CAPACITY increases how large a burst the bucket can absorb before throttling kicks in; raising REFILL_RATE increases the sustained long-run rate the bucket settles into once a burst has drained it. Setting CAPACITY to 1 effectively turns the limiter into a strict one-request-at-a-time-with-a-cooldown model, which is a useful way to demonstrate the opposite extreme from a generous burst allowance.' },
      { q: 'Why is tokens a float instead of an integer?', a: 'Refilling happens continuously based on real elapsed time (fractions of a second between animation frames), so the bucket needs to represent partial tokens, like 3.4 out of 10, to refill smoothly rather than in visible per-second jumps. The >= 1 check in sendRequest() only cares whether at least one whole token is available, so fractional tokens accumulate correctly toward the next whole token without ever being spendable early.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JavaScript to an AI assistant like Claude and ask it to walk through exactly why a boundary burst can happen in a fixed-window counter but structurally cannot happen here, using the elapsed-time refill math as the explanation. Good extensions to ask for: a second bucket panel running a fixed-window counter side by side for a direct visual comparison, a queued-instead-of-dropped mode for rejected requests, or a slider to live-adjust the refill rate and capacity and watch the burst behavior change in real time.`,
      prompt: `Build an animated token bucket rate limiter visualizer in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- A bucket UI showing a continuously refilling liquid fill level plus a row of discrete capacity pips, both driven from one shared float token count that refills over real elapsed time using requestAnimationFrame (not a stepped setInterval tick), capped at a fixed maximum capacity.
- A "Send Request" button that, if at least 1 token is available, subtracts one token, flashes the bucket panel green, and logs a timestamped "allowed" entry with the tokens remaining; if no token is available, flashes red and logs a "rejected" entry instead, without touching the token count.
- A "burst click" button that fires several requests in rapid succession (spaced roughly 100ms apart) so a user can see that, starting from a full or nearly-full bucket, a burst of requests succeeds all at once up to the bucket's capacity, then throttles to the steady refill rate if fired again before enough time has passed to recover.
- Running counters for total allowed and total rejected requests, updated live, plus a scrolling timestamped log of every individual request decision.
- Make the refill rate and bucket capacity named constants near the top of the script so they are easy to change, and ensure the token count is a float internally (so fractional refill progress is visible) even though the consume check only requires a whole token.`,
    },
  },
};

export default tokenBucketRateLimiterVisualizer;
