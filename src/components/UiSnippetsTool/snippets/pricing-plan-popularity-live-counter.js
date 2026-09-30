const pricingPlanPopularityLiveCounter = {
  id: 'pricing-plan-popularity-live-counter',
  title: 'Pricing Cards with Live Plan Popularity Counter',
  lastmod: '2026-08-31',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="ppc-wrap">
  <div class="ppc-card">
    <span class="ppc-name">Starter</span>
    <div class="ppc-price">$12<small>/mo</small></div>
    <ul class="ppc-features">
      <li>Up to 3 projects</li>
      <li>Basic analytics</li>
      <li>Email support</li>
    </ul>
    <button type="button" class="ppc-cta ppc-cta-ghost">Choose Starter</button>
    <div class="ppc-popularity">
      <span class="ppc-pop-dot"></span>
      <span><b class="ppc-pop-count" data-base="6" id="ppcCount0">6</b> people picked this in the last hour</span>
    </div>
  </div>

  <div class="ppc-card ppc-card-featured">
    <span class="ppc-badge">Most popular</span>
    <span class="ppc-name">Growth</span>
    <div class="ppc-price">$34<small>/mo</small></div>
    <ul class="ppc-features">
      <li>Unlimited projects</li>
      <li>Advanced analytics</li>
      <li>Priority support</li>
      <li>Team roles &amp; permissions</li>
    </ul>
    <button type="button" class="ppc-cta ppc-cta-solid">Choose Growth</button>
    <div class="ppc-popularity">
      <span class="ppc-pop-dot"></span>
      <span><b class="ppc-pop-count" data-base="41" id="ppcCount1">41</b> people picked this in the last hour</span>
    </div>
  </div>

  <div class="ppc-card">
    <span class="ppc-name">Scale</span>
    <div class="ppc-price">$79<small>/mo</small></div>
    <ul class="ppc-features">
      <li>Everything in Growth</li>
      <li>SSO &amp; audit logs</li>
      <li>Dedicated success manager</li>
    </ul>
    <button type="button" class="ppc-cta ppc-cta-ghost">Choose Scale</button>
    <div class="ppc-popularity">
      <span class="ppc-pop-dot"></span>
      <span><b class="ppc-pop-count" data-base="14" id="ppcCount2">14</b> people picked this in the last hour</span>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f5f6fb;display:flex;justify-content:center;padding:44px 20px}

.ppc-wrap{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:900px;width:100%}
.ppc-card{position:relative;background:#fff;border:1.5px solid #e7e9f2;border-radius:18px;padding:26px 22px;display:flex;flex-direction:column}
.ppc-card-featured{border-color:#6366f1;box-shadow:0 20px 50px rgba(99,102,241,.16);transform:translateY(-6px)}
.ppc-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#6366f1;color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.03em;text-transform:uppercase;padding:5px 12px;border-radius:99px;white-space:nowrap}

.ppc-name{font-size:13px;font-weight:700;color:#7b7f99;text-transform:uppercase;letter-spacing:.03em;margin-bottom:8px}
.ppc-price{font-size:30px;font-weight:800;color:#181a2a;margin-bottom:18px}
.ppc-price small{font-size:13px;color:#9aa0b8;font-weight:600}

.ppc-features{list-style:none;display:flex;flex-direction:column;gap:9px;margin-bottom:20px;flex:1}
.ppc-features li{font-size:12.5px;color:#4b4f66;padding-left:20px;position:relative}
.ppc-features li::before{content:'\\2713';position:absolute;left:0;color:#10b981;font-weight:800}

.ppc-cta{width:100%;border-radius:10px;padding:12px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;border:none;margin-bottom:16px}
.ppc-cta-ghost{background:#f7f8fc;color:#181a2a;border:1.5px solid #e7e9f2}
.ppc-cta-ghost:hover{background:#eef0fe}
.ppc-cta-solid{background:#6366f1;color:#fff}
.ppc-cta-solid:hover{background:#4f46e5}

.ppc-popularity{display:flex;align-items:center;gap:8px;font-size:11px;color:#9aa0b8;line-height:1.4}
.ppc-pop-dot{width:7px;height:7px;border-radius:50%;background:#10b981;flex-shrink:0;box-shadow:0 0 0 0 rgba(16,185,129,.5);animation:ppcPulse 2s infinite}
.ppc-pop-count{color:#4b4f66;font-weight:800;transition:color .3s}
.ppc-pop-count.ppc-pop-bump{color:#10b981}

@keyframes ppcPulse{
  0%{box-shadow:0 0 0 0 rgba(16,185,129,.45)}
  70%{box-shadow:0 0 0 6px rgba(16,185,129,0)}
  100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}
}

@media(max-width:760px){.ppc-wrap{grid-template-columns:1fr}.ppc-card-featured{transform:none}}`,

  js: `// Each plan's popularity count starts from a real base number (data-base) and
// occasionally ticks up by a small random amount on an independent timer per
// card — simulating live activity without ever pretending the numbers are
// perfectly synchronized across cards, which real concurrent signups wouldn't be.
var counters = Array.prototype.slice.call(document.querySelectorAll('.ppc-pop-count'));

function scheduleNextBump(el) {
  var delay = 4000 + Math.random() * 7000; // stagger each card's own rhythm
  setTimeout(function () {
    bump(el);
    scheduleNextBump(el);
  }, delay);
}

function bump(el) {
  var current = parseInt(el.textContent, 10) || 0;
  var increment = Math.random() < 0.7 ? 1 : 2; // occasionally jump by 2, mostly by 1
  var next = current + increment;

  el.textContent = String(next);
  el.classList.add('ppc-pop-bump');
  setTimeout(function () {
    el.classList.remove('ppc-pop-bump');
  }, 600);
}

counters.forEach(function (el) {
  scheduleNextBump(el);
});`,

  seo: {
    title: 'Pricing Cards with Live Plan Popularity Counter — Free HTML CSS JS Snippet',
    description: 'A three-tier pricing grid where each card shows its own live, independently-ticking "picked this in the last hour" counter with a pulsing activity dot. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Pricing Cards with Live Popularity Counter — Independent Per-Card Activity Ticks',
      description: `A "Most popular" badge on one card is a claim; a number that visibly moves is closer to evidence. This pricing grid gives every plan its own small live counter — "N people picked this in the last hour" — that ticks upward on its own independent, randomized rhythm, so the activity feels like real concurrent signups across three plans rather than one obviously scripted global timer.

**Every card runs its own independent timer, deliberately unsynchronized**

\`scheduleNextBump(el)\` is called once per counter and re-schedules itself recursively after each bump, with a randomized delay between 4 and 11 seconds (\`4000 + Math.random() * 7000\`) picked fresh every time. Because each of the three counters calls this independently, they never bump in lockstep — which is exactly what real, unrelated signups across three different plans would look like. A single shared \`setInterval\` ticking all three counters at once would have been simpler to write, but would visibly read as fake the moment two cards moved in perfect sync.

**The base number is real content, not a placeholder**

Each \`.ppc-pop-count\` starts from a \`data-base\` value baked into the HTML — 6, 41, and 14 for Starter, Growth, and Scale respectively — reflecting a plausible real distribution where the featured "Growth" plan gets picked far more often. The JavaScript only ever increments from whatever \`textContent\` currently reads via \`parseInt\`, so the starting numbers are genuinely the page's real content, not zero-state placeholders waiting for a script to fill in.

**Mostly +1, occasionally +2, never a round jump**

\`bump()\` increments by 1 seventy percent of the time and by 2 the other thirty percent (\`Math.random() < 0.7 ? 1 : 2\`), avoiding both a suspiciously mechanical "always +1 on a fixed timer" pattern and an unrealistic "sometimes jumps by 10" pattern that would draw attention to itself as obviously synthetic.

**A brief color flash marks the moment of change**

When a counter bumps, \`.ppc-pop-bump\` applies a green color for 600ms before being removed — a visitor who happens to be looking at a card when its number ticks gets a clear, brief acknowledgment that something just changed, without a distracting animation that would fire indefinitely.

**The pulsing dot is a constant CSS animation, unrelated to the tick timing**

The small dot beside each counter uses a CSS \`@keyframes\` pulse running continuously and independently of the JavaScript-driven number ticks — it signals "this is live" as ambient, constant motion, while the actual number change is the more meaningful (and rarer) event that draws a second glance.

**Customizing it**

Adjust each card's \`data-base\` value to reflect real signup numbers from your own analytics rather than fabricated ones — the honesty of this pattern depends entirely on starting from a real distribution. Change the \`4000\`–\`11000\` millisecond delay range in \`scheduleNextBump()\` to slow down or speed up the perceived tick rate; a much shorter range reads as busier but can feel artificial if overdone.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch each card\'s counter', text: 'Numbers tick up independently on staggered random timers — they will not move in sync.' },
        { title: 'Notice the brief color flash', text: 'Each counter flashes green for a moment right when it increments.' },
        { title: 'Set real starting numbers', text: 'Edit the data-base attribute and initial text on each .ppc-pop-count element to reflect your actual signup data.' },
        { title: 'Adjust the tick frequency', text: 'Change the 4000 and 7000 millisecond values inside scheduleNextBump() in the JS panel.' },
        { title: 'Change the increment pattern', text: 'Edit the 0.7 probability and the 1/2 increment values inside bump() in the JS panel.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Three-tier pricing grid with a live "picked this in the last hour" counter per card',
      'Each counter runs its own independently randomized timer, never ticking in visible lockstep',
      'Starts from a real data-base number reflecting a plausible plan popularity distribution',
      'Increments mostly by 1 with occasional +2 jumps, avoiding a mechanical fixed-tick pattern',
      'Brief green color flash acknowledges the moment each counter changes',
      'Constant pulsing activity dot, independent of the JavaScript-driven number ticks',
      'Featured "Most popular" card gets its own elevated styling and badge',
      'No WebSocket or backend required — a believable client-side simulation',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'SaaS and subscription product pricing pages', desc: 'Add believable social proof directly to the pricing decision point instead of a separate testimonials section.' },
      { icon: 'FLOW', title: 'Product launch and limited-availability offers', desc: 'Pair with a [single plan spotlight](/ui-snippets/pricing-single-plan-spotlight/) to build urgency around one featured tier.' },
      { icon: 'FORM', title: 'Marketplace and course-platform pricing tiers', desc: 'Show relative popularity across tiers to nudge undecided visitors toward the plan others are actually choosing.' },
      { icon: 'LEARN', title: 'Learn believable client-side activity simulation', desc: 'Study why independently randomized per-element timers read as authentic where one shared global timer would not.' },
      { icon: 'DESIGN', title: 'Event ticketing and limited-seat registration pages', desc: 'Reuse the same staggered-counter pattern for "N people registered this hour" per ticket tier.' },
      { icon: 'CODE', title: 'Related: Sticky Compare Bar', desc: 'Pair with the [Sticky Compare Bar](/ui-snippets/pricing-sticky-compare-bar/) so the popularity signal stays visible while comparing plans further down the page.' },
    ],
    faqs: [
      { q: 'Do the three counters tick at the same time?', a: 'No, deliberately not. Each counter calls its own scheduleNextBump() with a freshly randomized delay between 4 and 11 seconds every time it fires, so the three cards bump at unrelated moments — which is what real, independent signups across three different plans would actually look like, rather than one obviously synchronized global timer.' },
      { q: 'Are the starting numbers real or placeholders?', a: 'They are meant to be real: each .ppc-pop-count element starts with an actual number in its text content and a matching data-base attribute (6, 41, and 14 in this example). The JavaScript only increments from whatever the element currently displays via parseInt — it never resets or overwrites the base number you set, so replacing those starting values with your own real signup data is the entire integration step.' },
      { q: 'Why does the counter sometimes jump by 2 instead of always by 1?', a: 'bump() increments by 1 about 70% of the time and by 2 the other 30%, controlled by Math.random() < 0.7. A counter that always incremented by exactly 1 on a fixed rhythm would start to look mechanical and scripted after a few ticks; the small amount of variation reads as more like genuinely independent real-world events.' },
      { q: 'What does the brief color flash on the counter indicate?', a: 'When bump() runs, it adds a ppc-pop-bump class that turns the number green, then removes it after 600 milliseconds via setTimeout. It is a lightweight visual acknowledgment for a visitor who happens to be looking at the number right when it changes, without a persistent or distracting animation.' },
      { q: 'Is the pulsing dot tied to the counter increments?', a: 'No — the dot uses a continuous CSS @keyframes animation that runs independently on a fixed loop, unrelated to the JavaScript-driven number ticks. It signals general "this is live" activity as constant ambient motion, while the counter number itself is the more meaningful, comparatively rare event.' },
      { q: 'Does this require a backend or WebSocket connection?', a: 'No, it is a fully client-side simulation using setTimeout and Math.random() — no server connection is required. For a genuinely real-time count reflecting actual signups, you would replace the simulated bump() logic with periodic fetch calls to a real backend endpoint that returns current counts.' },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing why the counters never seem to move together, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each counter schedules its own independently randomized timer via scheduleNextBump() rather than sharing one setInterval across all three cards, and why the increment logic mixes +1 and +2 instead of always incrementing by a fixed amount. The same assistant can help you extend it — ask it to replace the simulated random bumps with real periodic fetch calls to a backend endpoint that returns actual signup counts per plan, add a subtle "N people are viewing this plan right now" secondary signal using the same staggered-timer technique, or rate-limit how frequently the color flash can retrigger if a counter happens to bump twice in quick succession. It's also useful for an honesty review: ask whether simulated activity counters should be replaced with real data before shipping to production, since fabricated urgency signals can undermine trust once a visitor notices the pattern. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a three-tier pricing card grid in plain HTML, CSS, and vanilla JavaScript where each card shows its own live-ticking "N people picked this in the last hour" counter — no WebSocket, no backend, no animation library.

Requirements:
- Three pricing cards (e.g. Starter, Growth, Scale), the middle one visually featured as "Most popular," each with a plan name, price, a short feature checklist, a call-to-action button, and a small popularity line containing a pulsing activity dot and a bold number.
- Each counter must start from its own real starting number (set directly in the HTML, not zero), reflecting a plausible distribution where the featured plan already has a noticeably higher count than the others.
- Each counter must independently schedule its own next increment using a randomized delay (e.g. between 4 and 11 seconds), re-scheduling itself after every tick — the three counters must NOT be driven by one shared interval that would make them all tick at the same synchronized moment.
- When a counter increments, it should mostly go up by 1 but occasionally jump by 2 (roughly 70/30), and briefly flash a distinct color for under a second to acknowledge the change before returning to its normal color.
- The small activity dot next to each counter should use a continuous CSS pulse animation that runs independently of the JavaScript-driven number increments — it should never stop or restart in response to a counter tick.
- Read each counter's current value directly from its displayed text content when incrementing (do not track the count in a separate JavaScript variable disconnected from what is shown).`,
    },
  },
};

export default pricingPlanPopularityLiveCounter;
