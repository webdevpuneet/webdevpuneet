const couponCard = {
  id: 'coupon-card',
  title: 'Coupon Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="cpn">
  <div class="cpn-left">
    <span class="cpn-off">25<small>%</small></span>
    <span class="cpn-offlbl">OFF</span>
  </div>
  <div class="cpn-right">
    <div class="cpn-top">
      <strong>Summer Sale</strong>
      <p>25% off everything storewide. Min. order $30.</p>
    </div>
    <div class="cpn-codebar">
      <span class="cpn-code" id="cpnCode">SUMMER25</span>
      <button class="cpn-copy" id="cpnCopy" type="button">
        <svg class="cpn-ic-copy" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="cpn-ic-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        <span id="cpnCopyLbl">Copy</span>
      </button>
    </div>
    <div class="cpn-meta">
      <span class="cpn-timer" id="cpnTimer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Expires in <b id="cpnLeft">—</b>
      </span>
      <span class="cpn-uses">3 uses left</span>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #ede9fe; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.cpn {
  position: relative; display: flex; width: min(440px, 100%);
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 14px 36px rgba(76, 29, 149, 0.22);
}

/* Left stub */
.cpn-left {
  flex: 0 0 128px; padding: 22px 8px;
  background: linear-gradient(155deg, #7c3aed, #4f46e5);
  color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center;
  /* Perforated divider on the right edge */
  border-right: 2px dashed rgba(255, 255, 255, 0.45);
}
.cpn-off { font-size: 42px; font-weight: 900; line-height: 1; letter-spacing: -1px; }
.cpn-off small { font-size: 20px; font-weight: 800; }
.cpn-offlbl { font-size: 13px; font-weight: 800; letter-spacing: 0.32em; margin-top: 4px; opacity: 0.85; }

/* Punch holes over the divider — same colour as the page background */
.cpn::before, .cpn::after {
  content: ''; position: absolute; left: 128px; transform: translateX(-50%);
  width: 22px; height: 22px; border-radius: 50%; background: #ede9fe; z-index: 2;
}
.cpn::before { top: -11px; }
.cpn::after { bottom: -11px; }

/* Right body */
.cpn-right { flex: 1; background: #fff; padding: 16px 18px; display: flex; flex-direction: column; gap: 11px; min-width: 0; }
.cpn-top strong { font-size: 16px; font-weight: 800; color: #1e1b4b; }
.cpn-top p { font-size: 12.5px; color: #64748b; margin-top: 3px; line-height: 1.45; }

.cpn-codebar {
  display: flex; align-items: stretch; border: 1.5px dashed #c4b5fd; border-radius: 10px; overflow: hidden;
}
.cpn-code {
  flex: 1; display: flex; align-items: center; padding: 8px 12px;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 14px; font-weight: 800;
  letter-spacing: 0.14em; color: #5b21b6; background: #f5f3ff;
}
.cpn-copy {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; border: none; cursor: pointer;
  background: #7c3aed; color: #fff; font-family: inherit; font-size: 12.5px; font-weight: 700;
  transition: background 0.2s;
}
.cpn-copy:hover { background: #6d28d9; }
.cpn-copy svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.cpn-ic-check { display: none; }
.cpn-copy.copied { background: #16a34a; }
.cpn-copy.copied .cpn-ic-copy { display: none; }
.cpn-copy.copied .cpn-ic-check { display: block; }

.cpn-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.cpn-timer { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #dc2626; }
.cpn-timer svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.cpn-timer b { font-variant-numeric: tabular-nums; }
.cpn-uses { font-size: 11.5px; font-weight: 700; color: #7c3aed; background: #f5f3ff; padding: 3px 9px; border-radius: 999px; }

/* Expired state */
.cpn.expired .cpn-left { background: linear-gradient(155deg, #94a3b8, #64748b); }
.cpn.expired .cpn-code { color: #94a3b8; text-decoration: line-through; }
.cpn.expired .cpn-copy { background: #cbd5e1; cursor: not-allowed; }
.cpn.expired .cpn-timer { color: #94a3b8; }`,
  js: `const code = document.getElementById('cpnCode');
const copyBtn = document.getElementById('cpnCopy');
const copyLbl = document.getElementById('cpnCopyLbl');
const leftEl = document.getElementById('cpnLeft');
const card = document.querySelector('.cpn');

// Copy the code with a green success state
copyBtn.addEventListener('click', async () => {
  if (card.classList.contains('expired')) return;
  try {
    await navigator.clipboard.writeText(code.textContent);
  } catch (err) {
    // Fallback for non-secure contexts
    const ta = document.createElement('textarea');
    ta.value = code.textContent;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  copyBtn.classList.add('copied');
  copyLbl.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.classList.remove('copied');
    copyLbl.textContent = 'Copy';
  }, 1600);
});

// Live countdown to an expiry timestamp (demo: ~4h from load)
const expiresAt = Date.now() + (4 * 60 * 60 + 12 * 60 + 45) * 1000;

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const ms = expiresAt - Date.now();
  if (ms <= 0) {
    leftEl.textContent = 'expired';
    card.classList.add('expired');
    clearInterval(timer);
    return;
  }
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  leftEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
}

const timer = setInterval(tick, 1000);
tick();`,
  seo: {
    title: 'Coupon Card — Free HTML CSS JS Snippet',
    description: 'A ticket-style coupon with CSS punch holes, a copy-code button with clipboard fallback and a live expiry countdown. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Coupon Card — Ticket-Style Discount Coupon with Punch Holes, Copy Code, and Expiry Countdown',
      description: `The perforated ticket is the universal visual shorthand for a discount — a coloured stub carrying the offer, a dashed tear line with punched holes, and a code the user can grab. This component builds the complete e-commerce coupon in HTML, CSS, and vanilla JavaScript: the ticket illusion in pure CSS, a copy-to-clipboard button with success feedback and a legacy fallback, a live \`HH:MM:SS\` expiry countdown, and a greyed-out expired state the card enters automatically when time runs out.

**The punch-hole illusion**

The ticket effect needs two things: a perforation and the two semicircular notches where a real coupon would be torn. The perforation is simply a \`border-right: 2px dashed\` on the stub. The notches are the card's own \`::before\` and \`::after\` pseudo-elements — 22px circles filled with the *page background colour*, absolutely positioned half-in half-out at the top and bottom of the divider line (\`top: -11px\` / \`bottom: -11px\`, centred on the stub edge with \`translateX(-50%)\`). Because they match the backdrop, they read as holes cut through the card. The one constraint of this classic technique: the circles must track the page background, so on a patterned backdrop you would switch to \`mask-image: radial-gradient()\` cut-outs instead — the trade-off is noted so you can pick per context.

**Copy-to-clipboard done properly**

The copy button calls \`navigator.clipboard.writeText()\` — the modern async API — inside a \`try/catch\` that falls back to the hidden-textarea \`document.execCommand('copy')\` trick for non-secure contexts (plain HTTP, some embedded webviews) where the Clipboard API is unavailable. On success the button swaps its copy icon for a checkmark, turns green, and relabels to "Copied!", reverting after 1.6 seconds. The two icons are both in the markup with CSS toggling their \`display\` off the \`.copied\` class, so no SVG is created at runtime — the same pattern as the standalone [copy button](/ui-snippets/copy-button/).

**The live countdown**

A \`setInterval\` computes the remaining milliseconds against a fixed \`expiresAt\` timestamp each second — recomputing from \`Date.now()\` rather than decrementing a counter, so the timer cannot drift and survives tab throttling correctly. Hours, minutes, and seconds are derived with integer division and modulo, zero-padded with \`padStart\`, and rendered with \`tabular-nums\` so digits do not jiggle as they change. Storing an absolute expiry (as your backend would supply) rather than a duration is what makes the countdown honest across reloads.

**The expired state**

When the countdown hits zero the interval stops, the label reads "expired", and one class on the root repaints the whole card: the stub gradient desaturates to grey, the code gets struck through, the copy button greys out (and its handler exits early), and the urgency timer loses its red. Encoding expiry as a single class keeps the state change atomic — nothing can end up half-expired.

**Urgency signals**

The card carries the two proven scarcity cues: the red countdown ("Expires in 04:12:45") and a "3 uses left" pill — the same psychology as the [stock urgency bar](/ui-snippets/stock-urgency-bar/) and [trial countdown](/ui-snippets/trial-countdown/). Both are static-markup easy to feed from your promotions API.

**Customisation**

Change the stub gradient and percentage, set \`expiresAt\` from your API's ISO timestamp (\`new Date(iso).getTime()\`), and wire the copy handler to also apply the code straight to the cart — pair it with the [promo code input](/ui-snippets/promo-code-input/) at checkout. The stub, holes, and dashed line are all sized off the single \`128px\` flex-basis, so widening the stub moves everything consistently.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A purple ticket renders — a 25% OFF stub with a dashed perforation and punch holes, the SUMMER25 code, a copy button, and a red live countdown.` },
      { title: 'Copy the code', text: `Click Copy — the code lands on the clipboard, the button turns green with a checkmark and "Copied!", then reverts after 1.6 seconds.` },
      { title: 'Watch the countdown', text: `The timer ticks down in HH:MM:SS with tabular digits, recomputed from the absolute expiry each second so it never drifts.` },
      { title: 'See the expired state', text: `Set expiresAt to a few seconds ahead — at zero the stub greys out, the code strikes through, and the copy button disables.` },
      { title: 'Feed real promo data', text: `Set the code text, offer copy, uses-left pill, and expiresAt (new Date(iso).getTime()) from your promotions API.` },
      { title: 'Style to your brand', text: `Swap the stub gradient and accent purples; the holes track the page background colour, so update those two circles if your backdrop changes.` },
    ]},
    features: [
      { title: 'Pure-CSS punch holes', text: `::before/::after circles in the page background colour sit half-out at the divider ends, creating the torn-ticket notches with zero images.` },
      { title: 'Dashed perforation', text: `A dashed border-right on the stub completes the tear line between the notches.` },
      { title: 'Clipboard API + fallback', text: `navigator.clipboard.writeText with a hidden-textarea execCommand fallback for non-secure contexts.` },
      { title: 'Copied success state', text: `The button swaps to a green checkmark and "Copied!" via one class, both icons pre-rendered in markup.` },
      { title: 'Drift-free countdown', text: `Remaining time recomputes from an absolute expiresAt timestamp every second — honest across throttled tabs and reloads.` },
      { title: 'Automatic expired state', text: `At zero, one class desaturates the stub, strikes the code, disables copying, and stops the interval.` },
      { title: 'Urgency cues built in', text: `Red countdown plus a uses-left pill — the standard scarcity pairing for promo conversion.` },
      { title: 'Tabular timer digits', text: `font-variant-numeric keeps the HH:MM:SS readout from jiggling as digits change.` },
    ],
    useCases: [
      { title: 'E-commerce promotions', text: `Surface active discounts on product and cart pages — pair with the [promo code input](/ui-snippets/promo-code-input/) it feeds.` },
      { title: 'Flash sale campaigns', text: `The countdown-driven variant for limited-time offers, alongside a [countdown timer](/ui-snippets/countdown-timer/) hero.` },
      { title: 'Loyalty and rewards programs', text: `Render earned rewards as collectible tickets in a wallet screen — see the [loyalty points widget](/ui-snippets/loyalty-points-widget/).` },
      { title: 'Email and landing-page offers', text: `A self-contained offer block whose code users copy in one click.` },
      { title: 'Referral incentives', text: `Show the reward coupon a user unlocks for referring friends next to a [referral card](/ui-snippets/referral-card/).` },
      { title: 'Learning the ticket technique', text: `A reference for pseudo-element cut-outs, clipboard handling with fallback, and drift-free countdowns.` },
      { icon: 'CODE', title: 'Related: Howler Audio Player + Visualizer', desc: 'See the [Howler Audio Player + Visualizer](/ui-snippets/howler-audio-player-visualizer/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the punch holes made without images?', a: `The card's ::before and ::after are 22px circles absolutely positioned at the top and bottom of the stub's right edge, pulled half outside the card with top/bottom: -11px and filled with the page's background colour (#ede9fe). Against that backdrop they are indistinguishable from holes. The limitation is inherent: they must match the backdrop, so over a photo or gradient you would use mask-image radial-gradient cut-outs on the card instead, which genuinely removes pixels.` },
      { q: 'Why does the copy button need a fallback path?', a: `navigator.clipboard is only available in secure contexts (HTTPS or localhost) and can be blocked by permissions policy in iframes. The catch branch creates a temporary offscreen textarea, selects it, and calls document.execCommand('copy') — deprecated but still the reliable fallback where the async API is missing. Wrapping the modern call in try/catch means users on plain HTTP embeds still get a working copy button.` },
      { q: 'Why compute the countdown from a timestamp instead of decrementing?', a: `A counter that subtracts one each tick drifts: browsers throttle setInterval in background tabs, so after a minute away your "60 seconds" might have ticked only a dozen times. Recomputing expiresAt - Date.now() every tick is self-correcting — however irregularly ticks fire, the displayed remainder is always true. It also means the expiry can come straight from your backend as an ISO date and stay consistent across reloads.` },
      { q: 'How do I make the coupon apply itself at checkout when copied?', a: `In the copy handler, after writeText succeeds, also dispatch your cart action — e.g. fetch('/api/cart/apply-coupon', { method: 'POST', body: JSON.stringify({ code: code.textContent }) }) or set a query param and navigate. Many stores do both: copy for later plus a toast offering "Apply now". Keep the button's green success state either way so the user gets immediate confirmation.` },
      { q: 'How do I use this coupon card in React, Vue, or Angular?', a: `Make the coupon a component taking code, title, expiresAt, and usesLeft as props. The countdown becomes an effect: useEffect / onMounted / ngOnInit starts the interval, updates a remaining-time state each tick, and the cleanup clears it on unmount — deriving an expired boolean from remaining <= 0 drives the class binding. The copied flag is a piece of state reset by a timeout. All the ticket CSS — pseudo-element holes, dashed perforation, expired styles — ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the pseudo-element trick yourself to see why the "punch holes" disappear if the background ever changes. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the before and after circles are filled with the page's own background color rather than being cut out of the card, and why the countdown recomputes from an absolute expiresAt timestamp every tick instead of just decrementing a counter. The same assistant can help optimize it — for instance asking whether the setInterval-driven countdown could drift under heavy main-thread load and whether requestAnimationFrame or a Web Worker timer would be more reliable for a long-running promotional countdown. It's also useful for extending the card: ask it to swap the fixed-background punch holes for a mask-image approach that works over photos or gradients, wire the copy handler to also apply the coupon directly to a cart via an API call, or drive expiresAt and usesLeft from real promotion data instead of hardcoded values. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a ticket-style discount coupon card in plain HTML, CSS, and JavaScript — no clipboard library, no countdown library.

Requirements:
- A two-part card: a colored stub on one side showing a large percentage-off number, and a white body on the other showing an offer title, description, a monospace discount code, a copy button, a live countdown, and a "uses left" indicator.
- The illusion of a torn perforated ticket must be created purely in CSS: a dashed border between the stub and the body, plus two circular pseudo-elements (top and bottom) positioned half on and half off that same edge, filled with the exact page background color so they read as punched-out holes.
- The copy button must attempt the modern async clipboard write API first, and only if that throws (wrapped in try/catch) fall back to creating a temporary hidden textarea, selecting its text, and using the older synchronous copy command, removing the textarea afterward either way.
- On a successful copy, swap the button to a distinct success state (different icon, different color, changed label) and automatically revert it back to its normal state after roughly a second and a half.
- Implement the countdown by storing one fixed future timestamp representing expiry, then every second recomputing the remaining milliseconds as that fixed timestamp minus the current time (never by decrementing a running counter), formatting the result as zero-padded hours, minutes, and seconds.
- When the recomputed remaining time reaches zero or below, stop the interval, change the displayed time to an "expired" label, and add a single class to the whole card that simultaneously desaturates the stub's color, strikes through the discount code, and disables the copy button (including making its click handler a no-op while that class is present).`,
    },
  },
};

export default couponCard;
