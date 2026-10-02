const scrollCounterOvershoot = {
  id: 'scroll-counter-overshoot',
  title: 'Scroll-Triggered Overshoot Counter',
  lastmod: '2026-08-23',
  category: 'scroll',
  cdnUrls: [],
  html: `<section class="oc-intro"><h1>Scroll ↓</h1><p>Each number overshoots its target, then springs back to settle exactly on it.</p></section>
<section class="oc-grid" id="ocGrid">
  <div class="oc-stat"><div class="oc-value" data-target="128400" data-prefix="$" data-suffix="">0</div><div class="oc-label">Revenue this quarter</div></div>
  <div class="oc-stat"><div class="oc-value" data-target="4820" data-prefix="" data-suffix="">0</div><div class="oc-label">Active subscribers</div></div>
  <div class="oc-stat"><div class="oc-value" data-target="97" data-prefix="" data-suffix="%">0</div><div class="oc-label">Uptime this month</div></div>
  <div class="oc-stat"><div class="oc-value" data-target="312" data-prefix="" data-suffix="">0</div><div class="oc-label">New signups today</div></div>
</section>
<section class="oc-outro"><p>Scroll back up and re-enter — it springs again.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b13;color:#fff}
.oc-intro,.oc-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.oc-intro h1{font-size:clamp(34px,7vw,64px);letter-spacing:-.02em}
.oc-intro p,.oc-outro p{color:#9aa0b8;font-size:16px;max-width:480px}
.oc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;max-width:960px;margin:0 auto;padding:14vh 24px}
.oc-stat{padding:28px 24px;border-radius:20px;background:linear-gradient(160deg,#191f36,#11131f);border:1px solid #262d44;text-align:center}
.oc-value{font-size:clamp(32px,5.2vw,48px);font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;background:linear-gradient(135deg,#8c9bff,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.oc-label{margin-top:8px;font-size:13.5px;color:#9aa0b8}`,

  js: `(function () {
  var stats = document.querySelectorAll('.oc-stat');

  // A real overshoot/spring easing: the classic "back" formula extended
  // past 1 before it eases back down. c1/c3 control how far it overshoots.
  function easeOutBackOvershoot(t) {
    var c1 = 1.9;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function formatNumber(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function animateValue(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var elapsed = ts - start;
      var t = Math.min(1, elapsed / duration);
      var eased = easeOutBackOvershoot(t);
      // eased genuinely exceeds 1 partway through, then settles back to
      // exactly 1 at t = 1 — the number visibly overshoots then corrects.
      var current = target * eased;
      el.textContent = prefix + formatNumber(current) + suffix;
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = prefix + formatNumber(target) + suffix;
      }
    }
    requestAnimationFrame(frame);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var valueEl = entry.target.querySelector('.oc-value');
      if (entry.isIntersecting) {
        if (!valueEl.dataset.animated) {
          valueEl.dataset.animated = '1';
          animateValue(valueEl);
        }
      } else {
        // Re-arm so scrolling away and back triggers the spring again.
        valueEl.dataset.animated = '';
        valueEl.textContent = (valueEl.getAttribute('data-prefix') || '') + '0' + (valueEl.getAttribute('data-suffix') || '');
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(function (stat) { observer.observe(stat); });
})();`,

  seo: {
    title: 'Scroll-Triggered Overshoot Counter — Free Spring Count-Up Effect',
    description: `Numbers that count up and overshoot past their target before springing back to settle exactly on it, triggered by scroll with vanilla JS and IntersectionObserver.`,
    about: {
      title: 'Scroll-Triggered Overshoot Counter — Numbers That Overshoot, Then Settle',
      description: `A plain count-up animates linearly from zero to a target and stops. This one does something a real spring does: it runs past the target, then corrects back down to land exactly on the right number — the kind of motion you'd feel from a physical needle or a UI element with real weight. It's built in vanilla JavaScript with an IntersectionObserver trigger and a genuine overshoot easing function, no animation library required.

**A real overshoot formula, not a trick**

The easing is the classic "back" curve, \`1 + c3 * (t-1)^3 + c1 * (t-1)^2\`, tuned with \`c1 = 1.9\` so the eased value climbs past \`1.0\` partway through the animation before descending back to exactly \`1.0\` at \`t = 1\`. Multiplying the target value by this eased fraction means the displayed number genuinely exceeds the target mid-animation and then comes back down — this is verifiable by watching the number tick past its final value before settling, not a fixed one-time bounce applied after the fact.

**IntersectionObserver, not a scroll listener**

Because the trigger only needs to know "has this stat scrolled into view," a single \`IntersectionObserver\` with \`threshold: 0.5\` is simpler and cheaper than measuring scroll position on every frame. Each stat animates independently the moment half of it is visible, using its own \`requestAnimationFrame\` loop driven by elapsed time and the overshoot easing function.

**Resets so it can spring again**

When a stat scrolls back out of view, its \`data-animated\` flag clears and its display resets to zero. Scrolling it back into view re-triggers the full overshoot-and-settle animation from scratch, which is useful for demoing the effect repeatedly and keeps the section feeling alive rather than "already spent" on a second pass.

**Per-stat configuration via data attributes**

Each \`.oc-value\` reads its target number, prefix, and suffix straight from \`data-target\`, \`data-prefix\`, and \`data-suffix\` attributes, so adding a new stat to the grid is just a markup change — no JS edits needed. Numbers format with \`toLocaleString\` for thousands separators as they animate, not only at the end.

**Customizing it**

Tune \`c1\` for a bigger or smaller overshoot, change \`duration\` for a snappier or slower spring, or swap the "back" formula for a true damped-spring simulation if you want multiple decaying oscillations instead of a single overshoot. Pair it with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/), or compare it against a linear [count up](/ui-snippets/count-up/) and [odometer stat counter](/ui-snippets/odometer-stat-counter/) to see the difference in feel.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a stat grid, and an outro render — no dependencies.` },
      { title: 'Scroll the stat grid into view', text: `Each number counts up, overshoots, then springs back to settle.` },
      { title: 'Watch the peak', text: `Numbers briefly exceed their final value before correcting down.` },
      { title: 'Scroll away and back', text: `The stat resets to zero and re-triggers the spring on re-entry.` },
      { title: 'Add a stat', text: `Add a .oc-stat with data-target, data-prefix, data-suffix.` },
      { title: 'Tune the spring', text: `Adjust c1 for overshoot amount, duration for speed.` },
    ] },
    features: [
      { title: 'Real overshoot easing', text: `A back-ease formula that genuinely exceeds 1 mid-animation.` },
      { title: 'Settles exactly on target', text: `Eased value returns to 1.0 precisely at animation end.` },
      { title: 'IntersectionObserver trigger', text: `Cheap, per-stat visibility detection, no scroll math needed.` },
      { title: 'Independent per-stat timing', text: `Each stat runs its own rAF loop from its own start time.` },
      { title: 'Re-arms on scroll-back', text: `Leaving and re-entering resets and replays the spring.` },
      { title: 'Data-attribute config', text: `Target, prefix, suffix all set from markup, zero JS edits.` },
      { title: 'Locale-formatted digits', text: `toLocaleString adds thousands separators while animating.` },
      { title: 'No dependencies', text: `Pure vanilla JS and IntersectionObserver, no library needed.` },
    ],
    useCases: [
      { title: 'Weighty KPI tiles', text: 'Give dashboard figures a springy feel, running past the target and then settling exactly on it through a back-ease that genuinely exceeds 1 mid-animation.' },
      { title: 'Landing page stats', text: 'Pair with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) of feature cards so the statistics bounce in after the cards appear.' },
      { title: 'Savings and usage numbers', text: 'Emphasise a saving or usage figure on a pricing page, with each stat running its own animation loop from its own start time.' },
      { title: 'Plain count-up comparison', text: 'Compare against [count up](/ui-snippets/count-up/) and [number ticker](/ui-snippets/number-ticker/) to choose between linear, odometer and spring-like motion for the same data.' },
      { title: 'Annual report totals', text: 'Reveal year-end totals with a satisfying settle, as a contrast to the mechanical roll of an [odometer stat counter](/ui-snippets/odometer-stat-counter/).' },
      { icon: 'CODE', title: 'Related: Scroll Comic Panel Sequence', desc: 'See the [Scroll Comic Panel Sequence](/ui-snippets/scroll-comic-panels/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the number actually overshoot, not just bounce visually?', a: `The eased fraction itself exceeds 1.0 partway through the animation, using the "back" easing formula 1 + c3*(t-1)^3 + c1*(t-1)^2. Since the displayed number is target * easedFraction, when easedFraction is greater than 1 the displayed number is genuinely larger than the target — it's real math producing the overshoot, not a separate bounce animation layered on top.` },
      { q: 'Does it always land exactly on the target?', a: `Yes. The easing formula is constructed so it evaluates to exactly 1.0 at t = 1 (the end of the animation), and the code also forces the final displayed value to the raw target on the last frame to avoid any floating-point rounding drift, so it always settles precisely on the number in data-target.` },
      { q: 'Why IntersectionObserver instead of a scroll listener?', a: `The effect only needs a one-time trigger — "this stat is now visible" — not a continuous scroll-position value. IntersectionObserver reports exactly that with threshold: 0.5, is cheaper than reading getBoundingClientRect on every scroll event, and automatically handles resizing and layout changes without extra code.` },
      { q: 'Can I make the overshoot bigger or smaller?', a: `Yes — increase c1 in easeOutBackOvershoot for a larger, more dramatic overshoot, or lower it toward 0 for a subtler settle that barely exceeds the target. You can also shorten or lengthen the duration variable to make the whole spring feel snappier or slower.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Render the stat markup with the same data attributes, then in a mount effect create the IntersectionObserver scoped to a container ref and observe each stat element found within it. Keep the animateValue and easing functions as plain utilities. Return a cleanup that disconnects the observer on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI coding assistant like Claude and ask it to explain why the "back" easing formula, 1 + c3*(t-1)^3 + c1*(t-1)^2, produces a value that exceeds 1.0 before returning to exactly 1.0, and how that directly translates into a displayed number that overshoots its target and settles — since the displayed value is simply target multiplied by that eased fraction. It's also useful for extending the effect: ask it to replace the single-overshoot "back" ease with a true damped-spring simulation (mass, stiffness, damping) that oscillates a couple of times before settling, or to make the overshoot amount scale with how large the target number is so huge numbers overshoot more dramatically than small ones.`,
      prompt: `Build a "scroll-triggered overshoot counter" effect in plain HTML, CSS, and vanilla JavaScript (no libraries).

Requirements:
- A grid of stat cards, each with a target number, an optional prefix (e.g. "$") and suffix (e.g. "%") stored as data attributes on a .oc-value element, starting displayed as 0.
- Use an IntersectionObserver with threshold 0.5 to detect when each stat card scrolls into view, and trigger that stat's count-up animation independently the moment it crosses the threshold — do not use a single global scroll listener for the trigger.
- Implement a genuine overshoot/spring easing function (the "back" easing formula: 1 + c3*(t-1)^3 + c1*(t-1)^2 with c3 = c1 + 1, using a c1 value like 1.7–2) rather than a linear or ease-out count-up. This easing function must evaluate to a value greater than 1.0 partway through its 0-to-1 input range, and return exactly 1.0 at input 1.0.
- Animate each counter with requestAnimationFrame, computing an elapsed-time fraction t from 0 to 1 over roughly 1200–1500ms, passing t through the overshoot easing function, and setting the displayed number to target * easedValue on every frame — so the displayed number visibly exceeds the target before correcting back down to land exactly on it.
- Format numbers with toLocaleString for thousands separators during the animation, and force the final frame to display the exact raw target value to avoid floating-point rounding drift.
- When a stat scrolls back out of view, reset its displayed value to 0 and clear its "already animated" flag so scrolling it back into view re-triggers the full overshoot animation from the start.
- Confirm the overshoot is visible by eye: the number should climb noticeably past its final value before dropping back down to settle exactly on it, not just decelerate smoothly into place.`,
    },
  },
};

export default scrollCounterOvershoot;
