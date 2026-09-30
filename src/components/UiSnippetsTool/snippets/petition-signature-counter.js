const petitionSignatureCounter = {
  id: 'petition-signature-counter',
  title: 'Petition Signature Counter',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="psc-card">
  <p class="psc-cause">Protect the Cedar Creek Wetlands</p>

  <div class="psc-count" id="pscCount">0</div>
  <p class="psc-label">signatures — goal: <b id="pscGoalLabel">25,000</b></p>

  <div class="psc-bar-track">
    <div class="psc-bar-fill" id="pscBarFill"></div>
  </div>

  <form class="psc-form" id="pscForm">
    <input type="text" id="pscName" placeholder="Full name" required autocomplete="name">
    <input type="email" id="pscEmail" placeholder="Email address" required autocomplete="email">
    <button type="submit" class="psc-submit" id="pscSubmit">Sign this petition</button>
  </form>

  <p class="psc-confirm" id="pscConfirm" aria-live="polite"></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#052e26;color:#ecfdf5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 20px}

.psc-card{background:#0b3d33;border:1px solid #14543f;border-radius:18px;padding:28px;width:100%;max-width:400px;text-align:center}
.psc-cause{font-size:14px;font-weight:700;color:#6ee7b7;margin-bottom:14px}

.psc-count{font-size:clamp(44px,10vw,60px);font-weight:900;letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums;color:#fff}
.psc-label{font-size:13px;color:#9cd9c4;margin:6px 0 16px}
.psc-label b{color:#ecfdf5}

.psc-bar-track{height:8px;background:#0f4b3d;border-radius:4px;overflow:hidden;margin-bottom:22px}
.psc-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#34d399,#10b981);border-radius:4px;transition:width .8s cubic-bezier(.22,.9,.3,1)}

.psc-form{display:flex;flex-direction:column;gap:9px;text-align:left}
.psc-form input{border:1.5px solid #14543f;background:#083026;border-radius:10px;padding:12px 13px;font-size:13.5px;color:#ecfdf5;font-family:inherit;outline:none;transition:border-color .15s}
.psc-form input::placeholder{color:#5f9484}
.psc-form input:focus{border-color:#34d399}

.psc-submit{background:#10b981;color:#022c22;border:none;border-radius:10px;padding:13px;font-size:14.5px;font-weight:800;cursor:pointer;margin-top:2px;transition:background .15s}
.psc-submit:hover{background:#34d399}
.psc-submit:disabled{opacity:.6;cursor:default}

.psc-confirm{font-size:12.5px;color:#6ee7b7;font-weight:600;margin-top:12px;min-height:16px}`,

  js: `var GOAL = 25000;
var count = 18742; // starting count, as if the petition is already in progress

var countEl = document.getElementById('pscCount');
var barFill = document.getElementById('pscBarFill');
var form = document.getElementById('pscForm');
var confirmEl = document.getElementById('pscConfirm');
var submitBtn = document.getElementById('pscSubmit');

function renderStatic(n) {
  countEl.textContent = n.toLocaleString('en-US');
  barFill.style.width = Math.min(100, (n / GOAL) * 100) + '%';
}

// Animates the counter from "from" to "to" over duration ms with an ease-out curve.
function countUp(from, to, duration) {
  var start = null;
  function step(ts) {
    if (start === null) start = ts;
    var progress = Math.min(1, (ts - start) / duration);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(from + (to - from) * eased);
    renderStatic(current);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

renderStatic(count);
document.getElementById('pscGoalLabel').textContent = GOAL.toLocaleString('en-US');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('pscName').value.trim();
  var email = document.getElementById('pscEmail').value.trim();
  if (!name || !email) return;

  var newCount = count + 1;
  countUp(count, newCount, 900);
  count = newCount;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signed \\u2713';
  confirmEl.textContent = 'Thanks, ' + name.split(' ')[0] + ' — your signature has been added.';
  form.querySelectorAll('input').forEach(function (i) { i.disabled = true; });
});`,

  seo: {
    title: 'Petition Signature Counter — Live Count-Up Signature Widget HTML CSS JS',
    description: `A large petition signature counter with a real count-up animation on submit, a sign form, and a progress bar toward a stated goal. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Petition Signature Counter — A Count-Up Signature Widget With a Sign Form',
      description: `A petition page lives or dies on momentum — a big, satisfying counter that visibly climbs when someone signs does more to encourage the next signature than any amount of persuasive copy. This snippet builds that: a large tabular-number counter, a name-and-email sign form, and a progress bar toward a stated goal, all in plain HTML, CSS, and vanilla JavaScript.

**A real count-up, not an instant jump**

The core interaction detail is that signing doesn't just set \`textContent\` to the new number — it runs \`countUp()\`, a \`requestAnimationFrame\` loop that eases from the old count to the new one over 900ms using a cubic ease-out. Even though a single signature only moves the number by one, the animated climb (paired with \`font-variant-numeric: tabular-nums\` so digits don't jitter sideways) is what makes the moment feel rewarding rather than a flat form-submit confirmation. For a reusable version of this pattern by itself, see [count-up](/ui-snippets/count-up/).

**Goal-relative progress bar**

Beneath the counter, a thin bar fills to \`count / GOAL\`, giving a second, complementary signal to the raw number — useful once a petition is past the point where the count alone is legible at a glance (25,000 versus 25,001 doesn't visually register, but a bar creeping toward full does).

**A form that commits before it counts**

Signing requires a name and email, validated with the browser's native \`required\` attributes plus a JS guard, before the counter increments — so the animation only fires on a genuine submission, and the confirmation message personalizes with the signer's first name. After signing, the form disables and the button locks to "Signed ✓" so a signer can't accidentally double-submit and inflate the count.

**Accessible confirmation**

The confirmation line carries \`aria-live="polite"\`, so screen reader users hear the thank-you message as soon as it appears, without needing to navigate back to find it — important since the visual counter animation itself isn't announced.

**Starting from a realistic in-progress count**

The demo seeds \`count\` at 18,742 rather than zero, because that's how petitions actually look when someone lands on them — mid-campaign, with visible momentum already built. Swap it for zero if you're launching fresh.

**Customizing it**

Swap \`GOAL\` and the starting \`count\` for your real numbers, replace the demo submit handler with a call to your petition backend, and adjust the count-up duration and easing to taste. Pair it with a [progress bar](/ui-snippets/progress-bar/) or [live visitor counter](/ui-snippets/live-visitor-counter/) for a companion widget.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The counter loads at 18,742 with a filled progress bar toward the 25,000 goal.` },
      { title: 'Fill in name and email', text: `Both fields are required before the form can submit.` },
      { title: 'Click "Sign this petition"', text: `The counter animates up by one with an eased count-up, and the bar advances.` },
      { title: 'Read the confirmation', text: `A personalized thank-you message appears and the form locks to prevent double-signing.` },
      { title: 'Set GOAL and the starting count', text: `Match them to your real petition's numbers.` },
      { title: 'Wire the submit handler', text: `Replace the demo logic with a real API call, then trigger countUp() on success.` },
    ] },
    features: [
      { title: 'Real animated count-up', text: `An eased requestAnimationFrame loop climbs from the old to new total, not an instant jump.` },
      { title: 'Tabular-number digits', text: `font-variant-numeric keeps digit widths fixed so the animation never jitters.` },
      { title: 'Goal-relative progress bar', text: `A second, glanceable signal once the raw count is too large to register visually.` },
      { title: 'Validated sign form', text: `Native required fields plus a JS guard ensure only genuine signatures count.` },
      { title: 'Personalized confirmation', text: `The thank-you message uses the signer's first name.` },
      { title: 'Double-submit protection', text: `The form disables and the button locks after a successful signature.` },
      { title: 'Accessible live region', text: `aria-live="polite" announces the confirmation to screen readers.` },
      { title: 'Realistic demo seed', text: `Starts mid-campaign at 18,742 rather than zero, matching how petitions actually look.` },
    ],
    useCases: [
      { title: 'Advocacy and petition platforms', text: `The core widget for any cause collecting public signatures.` },
      { title: 'Local ballot and community initiatives', text: `Pair with a [donation thermometer](/ui-snippets/donation-thermometer/) for a combined support-and-fund page.` },
      { title: 'Open letters and public statements', text: `Show growing support for a collective statement or pledge.` },
      { title: 'Union and workplace organizing', text: `Track signed cards or pledges toward a stated threshold.` },
      { title: 'Product waitlists reframed as demand signals', text: `Reuse the same count-up mechanic for "X people want this."` },
      { title: 'Learning count-up animation patterns', text: `A reference for requestAnimationFrame easing — compare with [number ticker](/ui-snippets/number-ticker/).` },
      { icon: 'CODE', title: 'Related: Usage-Based Billing Meter', desc: 'See the [Usage-Based Billing Meter](/ui-snippets/usage-based-billing-meter/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the count-up animation actually work?', a: `countUp() runs a requestAnimationFrame loop that tracks elapsed time against a fixed duration (900ms), computes a 0-to-1 progress value, applies a cubic ease-out curve to it, and renders the interpolated number on every frame until progress reaches 1. This produces a smooth climb from the old total to the new one rather than an instant text swap, which is what makes signing feel like an event.` },
      { q: 'Why use font-variant-numeric: tabular-nums on the counter?', a: `Most fonts render digits at slightly different widths (a "1" is narrower than an "8"), which makes a rapidly changing number visually jitter left and right as digits swap. tabular-nums forces every digit to the same fixed width, so the counter's overall width stays stable and the count-up animation reads as a smooth climb rather than a wobbling one.` },
      { q: 'What stops someone from signing more than once and inflating the count?', a: `After a successful submission, every input in the form is disabled and the submit button is disabled and relabeled "Signed ✓", so the same browser session cannot submit again. This is a client-side UX safeguard, not a security measure — a real petition backend should also deduplicate by email or account server-side.` },
      { q: 'How do I connect this to a real petition backend?', a: `Replace the body of the submit handler: instead of just incrementing the local count variable, POST the name and email to your API, and on a successful response call countUp(count, newCount, 900) with the authoritative count your backend returns (which also protects against the count drifting if multiple people sign concurrently).` },
      { q: 'How do I use this signature counter in React, Vue, or Angular?', a: `Keep count in component state and trigger the requestAnimationFrame loop inside an effect/lifecycle hook whenever a new target count is set (rather than re-rendering instantly), updating a separate "displayed count" state variable each frame. The form validation and confirmation logic map directly to controlled inputs and conditional rendering.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering the animation timing by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the requestAnimationFrame loop in countUp() computes elapsed-time progress and applies the cubic ease-out to interpolate the displayed number, and why tabular-nums matters for a rapidly changing counter. The same assistant can help optimize it — for example asking whether 900ms is the right duration if many signatures come in close together, or how to queue multiple count-up animations without them fighting over the same DOM element. It's also useful for extending the widget: ask it to add a live polling loop that periodically fetches the real signature count from a backend and animates to it, a milestone celebration at round numbers, or social-proof text like "247 people signed in the last hour." Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "petition signature counter" widget in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A large, prominently styled number display using font-variant-numeric: tabular-nums so digit widths stay fixed during animation, plus a thin progress bar beneath it filled to the current count divided by a stated numeric goal.
- A sign-this-petition form with required name and email inputs, validated both by native HTML required attributes and a JavaScript guard before allowing a submission to count.
- A reusable count-up function that takes a starting number, an ending number, and a duration in milliseconds, and uses requestAnimationFrame (not setInterval or an instant text swap) with an eased progress curve (for example a cubic ease-out) to animate the displayed number smoothly from start to end over that duration.
- On successful form submission, increment the total signature count by one and trigger the count-up animation from the old total to the new total, update the progress bar's width to match, disable every input plus the submit button so the same session cannot sign twice, and show a personalized confirmation message that includes the signer's first name.
- The confirmation message element must use aria-live="polite" so screen reader users are notified of the successful signature without needing to navigate to it.
- Seed the demo with a realistic in-progress starting count (not zero) and a stated goal larger than that starting count, so the progress bar shows a petition already underway.`,
    },
  },
};

export default petitionSignatureCounter;
