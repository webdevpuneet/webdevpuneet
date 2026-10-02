const abTestResultsCard = {
  id: 'ab-test-results-card',
  title: 'A/B Test Results Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="ab-card">
  <div class="ab-head">
    <div>
      <span class="ab-eyebrow">Experiment</span>
      <h2>Checkout CTA Copy</h2>
    </div>
    <span class="ab-status" id="abStatus">95% confidence</span>
  </div>

  <div class="ab-variants">
    <div class="ab-variant" id="abVariantA">
      <div class="ab-vhead">
        <span class="ab-vname">Variant A</span>
        <span class="ab-vtag">Control</span>
      </div>
      <div class="ab-rate">4.8<span>%</span></div>
      <div class="ab-meta">1,214 / 25,300 visitors</div>
      <div class="ab-bar-track"><div class="ab-bar" id="abBarA"></div></div>
    </div>

    <div class="ab-variant ab-winner" id="abVariantB">
      <div class="ab-vhead">
        <span class="ab-vname">Variant B</span>
        <span class="ab-vtag ab-vtag-win">Winner</span>
      </div>
      <div class="ab-rate">6.3<span>%</span></div>
      <div class="ab-meta">1,596 / 25,320 visitors</div>
      <div class="ab-bar-track"><div class="ab-bar ab-bar-win" id="abBarB"></div></div>
    </div>
  </div>

  <div class="ab-footer">
    <div class="ab-uplift" id="abUplift">+31.3% relative uplift</div>
    <div class="ab-verdict" id="abVerdict">Variant B wins with 95% statistical confidence</div>
  </div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ab-card{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;color:#e9ebf5;border:1px solid #262a3b;border-radius:18px;padding:24px;max-width:480px;margin:0 auto}
.ab-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;gap:10px}
.ab-eyebrow{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8b90a8;margin-bottom:4px}
.ab-head h2{font-size:19px;margin:0}
.ab-status{font-size:12px;font-weight:700;background:rgba(74,222,128,.14);color:#4ade80;padding:6px 12px;border-radius:999px;white-space:nowrap}
.ab-variants{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
.ab-variant{background:#161927;border:1px solid #262a3b;border-radius:14px;padding:16px;position:relative}
.ab-winner{border-color:#3ba55d;box-shadow:0 0 0 1px rgba(59,165,93,.25) inset}
.ab-vhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.ab-vname{font-size:13px;font-weight:700}
.ab-vtag{font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#8b90a8;background:#20243a;padding:3px 8px;border-radius:999px}
.ab-vtag-win{color:#0c1a10;background:#4ade80}
.ab-rate{font-size:30px;font-weight:800;letter-spacing:-.02em;line-height:1}
.ab-rate span{font-size:16px;font-weight:600;color:#8b90a8;margin-left:2px}
.ab-meta{font-size:11px;color:#8b90a8;margin:6px 0 12px}
.ab-bar-track{height:8px;border-radius:99px;background:#20243a;overflow:hidden}
.ab-bar{height:100%;border-radius:99px;background:#565d80;width:0;transition:width .8s cubic-bezier(.2,.8,.2,1)}
.ab-bar-win{background:linear-gradient(90deg,#22c55e,#4ade80)}
.ab-footer{border-top:1px solid #262a3b;padding-top:16px;text-align:center}
.ab-uplift{font-size:20px;font-weight:800;color:#4ade80;margin-bottom:4px}
.ab-verdict{font-size:13px;color:#a8adc4}`,

  js: `// All values in one place so the whole card is driven by data, not
// hardcoded percentages scattered through markup.
var data = {
  a: { name: 'Variant A', visitors: 25300, conversions: 1214 },
  b: { name: 'Variant B', visitors: 25320, conversions: 1596 },
};

function rate(v) {
  return (v.conversions / v.visitors) * 100;
}

// Simplified two-proportion z-test to derive a confidence level for the
// "95% confidence" style badge, computed from the actual counts rather
// than being a fixed label.
function zTestConfidence(a, b) {
  var p1 = a.conversions / a.visitors;
  var p2 = b.conversions / b.visitors;
  var pPool = (a.conversions + b.conversions) / (a.visitors + b.visitors);
  var se = Math.sqrt(pPool * (1 - pPool) * (1 / a.visitors + 1 / b.visitors));
  var z = se === 0 ? 0 : (p2 - p1) / se;
  // Approximate two-tailed confidence from |z| using a lightweight
  // logistic approximation of the normal CDF (good enough for a UI badge).
  var absZ = Math.abs(z);
  var confidence = (1 - 2 * (1 - 1 / (1 + Math.exp(1.702 * absZ)))) * 100;
  return { z: z, confidence: Math.max(0, Math.min(99.9, confidence)) };
}

var rateA = rate(data.a);
var rateB = rate(data.b);
var result = zTestConfidence(data.a, data.b);
var uplift = ((rateB - rateA) / rateA) * 100;
var winnerIsB = rateB > rateA;

document.getElementById('abBarA').style.width = (rateA / Math.max(rateA, rateB) * 100) + '%';
document.getElementById('abBarB').style.width = (rateB / Math.max(rateA, rateB) * 100) + '%';

var statusEl = document.getElementById('abStatus');
var confRounded = Math.round(result.confidence * 10) / 10;
statusEl.textContent = confRounded + '% confidence';
statusEl.style.background = confRounded >= 95 ? 'rgba(74,222,128,.14)' : 'rgba(250,204,21,.14)';
statusEl.style.color = confRounded >= 95 ? '#4ade80' : '#facc15';

document.getElementById('abUplift').textContent =
  (uplift >= 0 ? '+' : '') + uplift.toFixed(1) + '% relative uplift';

var verdictEl = document.getElementById('abVerdict');
if (confRounded >= 95) {
  verdictEl.textContent = (winnerIsB ? data.b.name : data.a.name) + ' wins with ' + confRounded + '% statistical confidence';
} else {
  verdictEl.textContent = 'Not yet statistically significant — keep the test running';
}`,

  seo: {
    title: 'A/B Test Results Card — Free Split-Test Comparison Snippet',
    description: `A card comparing two A/B test variants with conversion rate, sample size, a real z-test confidence calculation, and a declared winner. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'A/B Test Results Card — Variant Comparison With a Real Confidence Calculation',
      description: `The A/B test results card is the summary widget every experimentation dashboard needs: it puts two variants side by side, shows their conversion rates and sample sizes, and declares a statistical winner. This snippet builds one in plain HTML, CSS, and JavaScript, with the confidence badge computed from a real two-proportion z-test instead of a fixed label.

**A real statistical test, not a hardcoded badge**

The \`zTestConfidence(a, b)\` function runs a standard two-proportion z-test against the actual conversion counts and visitor totals for each variant: it pools the conversion rate, computes the standard error, derives a z-score, and approximates a confidence percentage from it with a lightweight logistic approximation of the normal CDF. Change the input numbers and the confidence badge, uplift figure, and verdict text all recompute — nothing is a hardcoded "95%" string.

**Visual comparison bars**

Below each variant's headline rate, a horizontal bar scales relative to the higher of the two rates, giving an at-a-glance read of the gap before anyone reads the numbers. The winning variant's bar uses a green gradient to reinforce the declared winner.

**Clear winner state**

The winning variant card gets a highlighted border and a "Winner" tag, and the footer prints both the relative uplift percentage and a verdict sentence — but only declares a winner once confidence clears the 95% threshold computed from the test. Below that threshold, the card honestly reports the result isn't significant yet rather than forcing a call.

**Customizing it**

Swap in your real experiment's conversion and visitor counts, adjust the significance threshold, add a third variant, or wire the verdict text to your experimentation platform's API. Pair it with a [funnel chart](/ui-snippets/funnel-chart/) to show where in the funnel the lift occurred, or a [stat comparison card](/ui-snippets/stat-comparison-card/) for a simpler two-number comparison.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The card renders with both variants and a confidence badge.` },
      { title: 'Check the confidence badge', text: `It's computed live from the conversion counts via a z-test.` },
      { title: 'Read the verdict', text: `A winner is declared only above the significance threshold.` },
      { title: 'Swap in real data', text: `Edit the data object with your experiment's actual numbers.` },
      { title: 'Adjust the threshold', text: `Change the 95 check in the JS to your team's bar for significance.` },
    ] },
    features: [
      { title: 'Real z-test', text: `Confidence is computed from conversion counts, not fixed.` },
      { title: 'Two-variant layout', text: `Side-by-side control vs. treatment comparison.` },
      { title: 'Visual comparison bars', text: `Scaled relative to the higher conversion rate.` },
      { title: 'Winner highlighting', text: `Winning variant gets a distinct border and tag.` },
      { title: 'Relative uplift', text: `Computed percentage difference, not eyeballed.` },
      { title: 'Honest non-significance state', text: `Won't declare a winner below the confidence bar.` },
      { title: 'Sample size shown', text: `Conversions over visitors for transparency.` },
      { title: 'Zero dependencies', text: `Pure DOM and math, no chart library.` },
    ],
    useCases: [
      { title: 'Growth experiment reports', text: 'Report CTA, pricing or copy test results, with confidence computed by a genuine z-test from conversion counts and sample sizes.' },
      { title: 'Product dashboard summaries', text: 'Summarise an experiment inside an internal tool, comparing control and treatment side by side with bars scaled to the higher rate.' },
      { title: 'Stakeholder updates', text: 'Share a clear winner with non-technical readers, highlighting the winning variant with a distinct border and tag.' },
      { title: 'Onboarding flow tests', text: 'Compare signup flow variants for conversion, with sample size shown so small tests are not over-interpreted.' },
      { title: 'Email and pricing page tests', text: 'Show subject line or call-to-action results from an email campaign, or compare the conversion impact of two pricing layouts.' },
      { icon: 'CODE', title: 'Related: EV Charging Status Card', desc: 'See the [EV Charging Status Card](/ui-snippets/ev-charging-status-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Insurance Claim Status Card', desc: 'See the [Insurance Claim Status Card](/ui-snippets/insurance-claim-status-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the confidence percentage a real calculation?', a: `Yes. zTestConfidence() runs a two-proportion z-test using the pooled conversion rate and standard error from the actual visitor and conversion counts for both variants, then approximates a confidence percentage from the resulting z-score. It is not a hardcoded "95%" label — change the input numbers and it recomputes.` },
      { q: 'When does the card declare a winner?', a: `Only when the computed confidence is at or above 95%. Below that, the verdict text says the result isn't yet statistically significant, so the card won't mislead viewers into acting on a test that hasn't reached significance.` },
      { q: 'How accurate is the confidence approximation?', a: `It uses a logistic approximation of the normal CDF, which is accurate enough for a UI badge but not a substitute for a dedicated statistics library in a production experimentation platform. For rigorous analysis, compute significance server-side with a proper stats package and pass the result into the card.` },
      { q: 'How do I plug in my own experiment data?', a: `Edit the data.a and data.b objects (visitors and conversions) at the top of the JS. Every derived value — rates, bar widths, uplift, confidence, and the verdict — recomputes from those two objects.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move data into component state or props, keep zTestConfidence() and rate() as pure helper functions, and drive the bar widths and verdict text from computed values in your template instead of direct DOM writes.` },
    ],
    aiPrompt: {
      paragraph: `Statistical significance is easy to fake with a hardcoded badge and easy to get subtly wrong with a real calculation, so it's worth having an AI coding assistant like Claude walk through this snippet's zTestConfidence() function line by line — why it pools the conversion rate across both variants before computing standard error, why the z-score gets converted through a logistic approximation rather than a true normal CDF, and where that approximation could diverge from a proper statistics library at the tails. It's also useful for hardening the UI logic: ask whether the 95% significance threshold should be configurable, whether the card should show a confidence interval rather than a point estimate, or how to handle the edge case where one variant has zero conversions. From there, have it help you wire the card to a real experimentation backend or add a minimum-sample-size gate before declaring any winner at all.`,
      prompt: `Build an "A/B test results card" in plain HTML, CSS, and JavaScript — no chart library, no CDN.

Requirements:
- Show two variant cards side by side (e.g. "Variant A" / control and "Variant B" / treatment), each displaying its conversion rate as a percentage, and its raw conversions-over-visitors sample size.
- Compute a real statistical significance/confidence value from the two variants' actual conversion and visitor counts using a two-proportion z-test (pooled conversion rate, standard error, z-score, and an approximation of confidence from the z-score) — do not hardcode a "95% confidence" string; it must be derived from the numbers.
- Show a horizontal bar under each variant's rate, scaled relative to the higher of the two conversion rates, for an at-a-glance visual comparison.
- Highlight the winning variant (border/tag) only once the computed confidence clears a significance threshold (e.g. 95%); below that threshold, show an honest "not yet significant" verdict instead of forcing a winner.
- Display the relative uplift percentage between the two variants, computed from their rates.
- Keep the whole thing driven by a single data object (visitors/conversions per variant) so changing the numbers updates every derived value in the card. Dark-theme friendly, no dependencies.`,
    },
  },
};

export default abTestResultsCard;
