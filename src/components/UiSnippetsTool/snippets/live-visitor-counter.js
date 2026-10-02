const liveVisitorCounter = {
  id: 'live-visitor-counter',
  title: 'Live Visitor Counter',
  lastmod: '2026-06-20',
  category: 'dashboards',
  html: `<div class="lvc-card">
  <span class="lvc-pulse-wrap">
    <span class="lvc-pulse-dot"></span>
  </span>
  <div class="lvc-text">
    <strong id="lvcCount">0</strong>
    <span id="lvcLabel">people viewing this page right now</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.lvc-card{display:inline-flex;align-items:center;gap:11px;background:#fff;border-radius:999px;padding:11px 18px;box-shadow:0 10px 30px rgba(15,23,42,.1);border:1px solid #f1f5f9}

.lvc-pulse-wrap{position:relative;width:11px;height:11px;flex-shrink:0}
.lvc-pulse-dot{position:absolute;inset:0;border-radius:50%;background:#22c55e}
.lvc-pulse-wrap::before{content:'';position:absolute;inset:0;border-radius:50%;background:#22c55e;animation:lvcPing 1.8s cubic-bezier(0,0,.2,1) infinite}
@keyframes lvcPing{0%{transform:scale(1);opacity:.6}75%,100%{transform:scale(2.6);opacity:0}}

.lvc-text{display:flex;align-items:baseline;gap:6px;font-size:13.5px;color:#475569;font-weight:600}
.lvc-text strong{font-size:17px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums;min-width:1.4ch;display:inline-block;text-align:right}
.lvc-text strong.bump{animation:lvcBump .3s ease}
@keyframes lvcBump{0%{transform:translateY(0)}30%{transform:translateY(-3px)}100%{transform:translateY(0)}}`,

  js: `var count = 23 + Math.floor(Math.random() * 12);
var countEl = document.getElementById('lvcCount');
countEl.textContent = count;

function step() {
  var delta = Math.random() < 0.5 ? -1 : 1;
  if (Math.random() < 0.15) delta *= 2; // occasional bigger jump
  count = Math.max(4, count + delta);
  countEl.textContent = count;
  countEl.classList.remove('bump');
  void countEl.offsetWidth;
  countEl.classList.add('bump');

  var label = document.getElementById('lvcLabel');
  label.textContent = (count === 1 ? 'person' : 'people') + ' viewing this page right now';

  setTimeout(step, 2200 + Math.random() * 2600);
}

setTimeout(step, 2400);`,

  seo: {
    title: 'Live Visitor Counter — Real-Time Viewer Count UI',
    description: `A pulsing "X people viewing this page right now" counter with a believable random-walk count and a bump animation on every change. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Live Visitor Counter — Random-Walk Count, Pulsing Dot & Per-Update Bump',
      description: `"23 people are viewing this right now" is a small but effective urgency cue used across e-commerce and ticketing sites — it signals active demand without the harder sell of a discount or a deadline. This snippet builds a believable live-counter widget: a pulsing presence dot, a count that drifts realistically rather than mechanically, and a tiny bump animation marking every change.

**A random walk, not random noise**

Rather than picking a fresh random number on every tick (which would jump around with no continuity and immediately look fake), \`step()\` nudges the *existing* count by ±1, occasionally ±2 on a 15% chance for a slightly bigger jump, clamped with \`Math.max(4, …)\` so it never drops to an unbelievable near-zero. This random-walk approach — each new value derived from the last, not generated independently — is what makes the number feel like it's tracking something real instead of visibly randomizing.

**Irregular timing reads as more real than a fixed interval**

Each update schedules the *next* one with \`setTimeout(step, 2200 + Math.random() * 2600)\` — a randomized 2.2–4.8 second gap — rather than a fixed \`setInterval\`. A perfectly regular tick is one of the easiest "this is fake" tells for any live-data widget; irregular timing, even though it's still simulated, matches how real, independent visitor arrivals and departures would actually look.

**A pulsing dot built from one extra layer**

The presence indicator is two stacked elements at the same position: a solid dot and a \`::before\` pseudo-element of the same color that scales up to 2.6× while fading out on a 1.8-second loop — the classic CSS "ping" effect, requiring no JavaScript and no extra real DOM node beyond the one dot \`<span>\`.

**A bump animation that announces the change without text noise**

Every time the count updates, its number element gets a \`.bump\` class removed and immediately re-added (with a forced reflow via \`void countEl.offsetWidth\` so the animation retriggers even on consecutive updates) — a quick upward nudge-and-settle that draws the eye to the new value for an instant without a distracting color flash or a layout-shifting size change.

**Use real data once you have it**

This widget is built to demonstrate the interaction, not to manufacture demand — once connected to genuine concurrent-viewer data from real analytics, the exact same rendering and animation logic applies unchanged; only the source of the number differs. Treat the random-walk version as a placeholder for development and design review, not as something to ship in front of real visitors.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A pill-shaped counter renders with a pulsing green dot and a starting count between 23 and 34.` },
      { title: 'Watch it drift', text: `Every few seconds (an irregular 2.2–4.8s gap), the count nudges up or down by 1 or 2, with a small bump animation marking each change.` },
      { title: 'Notice the floor', text: `The count never drops below 4, however many consecutive decreases occur in a row.` },
      { title: 'Check the singular/plural label', text: `If the count ever reaches exactly 1, the label automatically switches from "people" to "person."` },
      { title: 'Adjust the starting range or drift size', text: `Change the initial count formula or the ±1/±2 delta logic in step() to tune how active or volatile the counter feels.` },
      { title: 'Connect a real visitor count', text: `Replace the random-walk step() logic with a value from your real-time analytics (a WebSocket or short-poll endpoint), keeping the same bump-animation update call.` },
    ] },
    features: [
      { title: 'Random-walk count, not independent noise', text: `Each update nudges the existing value rather than picking a fresh random number, producing a continuous, believable drift.` },
      { title: 'Irregular update timing', text: `A randomized 2.2–4.8 second gap between updates avoids the unmistakably mechanical feel of a fixed-interval tick.` },
      { title: 'Occasional bigger jumps', text: `A 15% chance of a ±2 change instead of ±1 adds natural-feeling variance to the drift pattern.` },
      { title: 'Enforced minimum count', text: `The number never drops below 4, preventing an unbelievable near-zero "viewing right now" claim.` },
      { title: 'Zero-JS pulsing presence dot', text: `A pure CSS ping animation built from one pseudo-element, requiring no extra DOM nodes or script.` },
      { title: 'Per-update bump animation', text: `A forced-reflow class retrigger ensures the bump animation replays on every single change, even back-to-back ones.` },
      { title: 'Automatic singular/plural label', text: `The label text itself switches between "person" and "people" based on the current count.` },
      { title: 'Compact, drop-anywhere pill', text: `A self-contained inline pill component that fits naturally near a product price, CTA, or page header.` },
    ],
    useCases: [
      { title: 'Product page urgency cues', text: 'Show a pulsing X people are viewing this right now line on a product page, signalling active demand without a discount or deadline.' },
      { title: 'Ticket and event sales', text: 'Display live interest in a popular show alongside a [stock urgency bar](/ui-snippets/stock-urgency-bar/), with a believable random walk instead of independent noise.' },
      { title: 'Property and rental listings', text: 'Signal demand for a popular listing, where a 15% chance of a plus or minus two change adds natural variation between mostly small steps.' },
      { title: 'Course and webinar sign-ups', text: 'Pair with a [social proof popup](/ui-snippets/social-proof-popup/) on a registration page, with updates arriving at irregular gaps between 2.2 and 4.8 seconds.' },
      { title: 'Flash sale countdown pages', text: 'Reinforce urgency next to a [countdown timer](/ui-snippets/countdown-timer/), with a minimum of four visitors so the number never looks implausibly low.' },
      { icon: 'CODE', title: 'Related: Podcast Episode Chapters', desc: 'See the [Podcast Episode Chapters](/ui-snippets/podcast-episode-chapters/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real visitor count?', a: `Replace the random-walk logic in step() with a value from your analytics provider — either a WebSocket pushing live concurrent-viewer counts, or a short-poll fetch every few seconds — and call the same textContent/bump-class update with the real number instead of the simulated delta.` },
      { q: 'Is it okay to show a fake or simulated visitor count in production?', a: `Many regions and platforms (and several countries' advertising/consumer-protection rules) treat fabricated scarcity or demand signals as a deceptive practice if presented as real data — use simulated numbers only for demos, mockups, or prototypes, and connect this to genuine analytics before shipping it to real users.` },
      { q: 'How do I make the counter only show during business hours or business-relevant times?', a: `Check the current time (or fetch a server-provided value) before starting the step() loop, and conditionally hide the whole .lvc-card element (or skip rendering it) outside your desired active window.` },
      { q: 'How do I show the count per-product instead of per-page?', a: `Key your real visitor-count data by product id and pass the relevant count into this component's update logic per product card, rendering one counter instance per product rather than one global page-level counter.` },
      { q: 'How do I use this live counter in React, Vue, or Angular?', a: `In React, keep count in useState and run the randomized setTimeout loop inside useEffect with cleanup on unmount; in Vue, use ref()/onUnmounted for the same timer cleanup; in Angular, use a component field with ngOnDestroy. The random-walk and bump-animation-retrigger logic is plain JavaScript and ports directly.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to reconstruct the believability tricks in step() by intuition alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why the count is nudged by ±1 from its previous value instead of being re-randomized from scratch each tick, and why setTimeout with a randomized 2200 to 4800ms gap reads as more realistic than a fixed setInterval. The same assistant can help optimize it, for example asking whether the recursive setTimeout chain could leak if the component unmounts mid-wait, and how to guard against that. It is also useful for extending the widget: ask it to swap the random walk for a real WebSocket-driven concurrent-viewer count, add a small trend arrow when the count has been rising for several updates in a row, or scope the counter per product id on a multi-product page. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "live visitor counter" pill widget in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- A pill-shaped card containing a pulsing presence dot and a text line reading "<count> people viewing this page right now", where the count switches to singular "person" when it equals exactly 1.
- The presence dot must be built from exactly one extra layer (a pseudo-element), not an additional DOM node, that scales up while fading out on a continuous loop to create a CSS "ping" ripple effect.
- The count must update via a random walk: each tick nudges the existing count by -1 or +1, with roughly a 15% chance of nudging by -2 or +2 instead for occasional bigger jumps, and the count must never be allowed to drop below a fixed floor value (e.g. 4).
- Do not use setInterval for the update loop. Each update must schedule the next one with setTimeout using a randomized delay (e.g. somewhere between 2.2 and 4.8 seconds), so the timing itself looks organic rather than mechanically regular.
- Every time the count changes, briefly apply a small upward bump-and-settle animation to the number by removing and immediately re-adding its animation class with a forced reflow in between, so the bump retriggers even on consecutive updates.
- Structure the update function so that swapping the random-walk logic for a value read from a real analytics feed (WebSocket or polling) requires changing only the source of the new count, not the rendering, bump-animation, or label pluralization logic.`,
    },
  },
};

export default liveVisitorCounter;
