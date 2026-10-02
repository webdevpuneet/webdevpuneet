const paywallScreen = {
  id: 'paywall-screen',
  title: 'Mobile Paywall Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="pw-phone">
  <div class="pw-screen">
    <div class="pw-hero">
      <button class="pw-close" aria-label="Close">&times;</button>
      <div class="pw-crown">👑</div>
      <h1>Go Premium</h1>
      <p>Unlock every feature and remove all limits.</p>
    </div>
    <ul class="pw-feats">
      <li><span class="pw-ck"></span>Unlimited projects &amp; exports</li>
      <li><span class="pw-ck"></span>Advanced analytics dashboard</li>
      <li><span class="pw-ck"></span>Priority support, no ads</li>
      <li><span class="pw-ck"></span>Early access to new features</li>
    </ul>
    <div class="pw-plans" id="pwPlans">
      <button type="button" class="pw-plan" data-p="month"><div><b>Monthly</b><small>Billed every month</small></div><span class="pw-price">$9.99<i>/mo</i></span></button>
      <button type="button" class="pw-plan active" data-p="year"><span class="pw-badge">SAVE 40%</span><div><b>Annual</b><small>Billed $71.88/year</small></div><span class="pw-price">$5.99<i>/mo</i></span></button>
    </div>
    <button type="button" class="pw-cta" id="pwCta">Start 7-day free trial</button>
    <p class="pw-fine" id="pwFine">Then $71.88/year. Cancel anytime.</p>
    <div class="pw-links"><a href="#">Restore</a><span>·</span><a href="#">Terms</a><span>·</span><a href="#">Privacy</a></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.pw-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.pw-screen{width:100%;height:100%;border-radius:34px;overflow-y:auto;background:#fff;color:#0f172a;scrollbar-width:none;-ms-overflow-style:none}
.pw-screen::-webkit-scrollbar{display:none}
.pw-hero{position:relative;background:linear-gradient(160deg,#4f46e5,#7c3aed);color:#fff;padding:40px 24px 26px;border-radius:0 0 26px 26px;text-align:center}
.pw-close{position:absolute;top:14px;right:16px;background:rgba(255,255,255,.2);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:18px;cursor:pointer;line-height:1}
.pw-crown{font-size:40px;margin-bottom:8px}
.pw-hero h1{font-size:25px;font-weight:800}
.pw-hero p{font-size:13px;opacity:.9;margin-top:5px}

.pw-feats{list-style:none;padding:20px 24px 6px}
.pw-feats li{display:flex;align-items:center;gap:11px;font-size:13.5px;font-weight:600;color:#334155;margin-bottom:13px}
.pw-ck{width:21px;height:21px;border-radius:50%;background:#dcfce7;flex-shrink:0;position:relative}
.pw-ck::after{content:'';position:absolute;left:7px;top:4px;width:5px;height:9px;border:solid #16a34a;border-width:0 2px 2px 0;transform:rotate(45deg)}

.pw-plans{display:flex;flex-direction:column;gap:10px;padding:8px 20px 0}
.pw-plan{position:relative;display:flex;align-items:center;justify-content:space-between;gap:10px;background:#fff;border:2px solid #e2e8f0;border-radius:14px;padding:14px;cursor:pointer;font-family:inherit;text-align:left;transition:border-color .15s,background .15s}
.pw-plan b{font-size:14px;font-weight:800;color:#0f172a}
.pw-plan small{font-size:11px;color:#94a3b8}
.pw-price{font-size:16px;font-weight:800;color:#0f172a;white-space:nowrap}
.pw-price i{font-size:11px;font-weight:600;color:#94a3b8;font-style:normal}
.pw-plan.active{border-color:#6366f1;background:#eef2ff}
.pw-badge{position:absolute;top:-9px;right:14px;background:#16a34a;color:#fff;font-size:9px;font-weight:800;padding:3px 8px;border-radius:99px;letter-spacing:.5px}

.pw-cta{display:block;width:calc(100% - 40px);margin:18px 20px 0;background:#6366f1;color:#fff;border:none;border-radius:14px;padding:15px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 10px 24px -10px rgba(99,102,241,.8)}
.pw-cta:active{transform:scale(.985)}
.pw-fine{text-align:center;font-size:11px;color:#94a3b8;margin:10px 24px 0}
.pw-links{display:flex;justify-content:center;gap:8px;padding:14px 0 24px;font-size:11.5px;color:#cbd5e1}
.pw-links a{color:#6366f1;text-decoration:none;font-weight:600}`,

  js: `var plans = document.getElementById('pwPlans');
var cta = document.getElementById('pwCta');
var fine = document.getElementById('pwFine');

var COPY = {
  month: { fine: 'Billed $9.99 every month. Cancel anytime.', cta: 'Continue — $9.99/mo' },
  year:  { fine: 'Then $71.88/year. Cancel anytime.', cta: 'Start 7-day free trial' }
};

plans.querySelectorAll('.pw-plan').forEach(function (btn) {
  btn.addEventListener('click', function () {
    plans.querySelectorAll('.pw-plan').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var key = btn.getAttribute('data-p');
    cta.textContent = COPY[key].cta;
    fine.textContent = COPY[key].fine;
  });
});

cta.addEventListener('click', function () {
  cta.textContent = 'Processing…';
  setTimeout(function () { cta.textContent = 'Welcome to Premium 🎉'; }, 1200);
});`,

  seo: {
    title: 'Mobile Paywall Screen — Free Subscription UI Snippet',
    description: `A mobile subscription paywall with a premium hero, feature checklist, selectable monthly/annual plans, and a trial CTA. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Paywall Screen — Subscription Upsell UI',
      description: `A paywall screen is the subscription upsell an app shows to convert free users to paid — a benefit-led hero, a checklist of premium features, selectable plans with savings highlighted, and a trial call-to-action. This snippet builds a conversion-optimized one inside a CSS phone frame, where selecting a plan updates the CTA and fine print, in HTML, CSS, and vanilla JavaScript with no dependency.

**Plan selection drives the CTA**

The two plan cards are real \`<button>\`s; clicking one moves the \`.active\` class (a colored border and tint) and, crucially, rewrites the CTA label and the fine print from a \`COPY\` map. Choosing Annual shows "Start 7-day free trial" with "Then $71.88/year"; choosing Monthly switches to "Continue — $9.99/mo" with monthly billing terms. Keeping the button and legal copy in sync with the selected plan is exactly what a compliant, high-converting paywall must do, and here it's one lookup.

**Conversion patterns baked in**

The design uses the standard upsell tactics: the annual plan is pre-selected (the choice you want) and carries a "SAVE 40%" badge, prices are shown as a per-month equivalent so annual looks cheaper, benefits are framed as outcomes ("Unlimited projects", "no ads"), and a free-trial CTA lowers the commitment. These aren't incidental — they're the elements that make a paywall work, assembled in one reference.

**A CSS checklist**

Each feature row has a checkmark drawn purely in CSS: a green circle with an \`::after\` pseudo-element rotated into a tick (two borders at 45°). No icon font or SVG, so the list stays self-contained and recolors easily.

**The hero and layout**

A gradient hero with a rounded bottom, a close button, a crown glyph, and benefit copy sits atop a scrollable screen; the restore/terms/privacy links at the bottom are the legally-expected footer for app subscriptions. The whole screen scrolls within the phone frame.

**Reusing it**

Replace the plans, prices, and feature copy, and wire the CTA to your billing SDK (StoreKit, Play Billing, Stripe). The plan-to-copy map makes adding plans or A/B-testing wording trivial. Lift it out of the frame for a web pricing modal, or keep it framed inside a [phone mockup](/ui-snippets/phone-mockup/) for store screenshots.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A subscription paywall renders inside a phone frame.` },
      { title: 'Read the benefits', text: `A CSS checklist lists the premium features.` },
      { title: 'Switch plans', text: `Tapping Monthly or Annual moves the selection highlight.` },
      { title: 'Watch the CTA update', text: `The button and fine print change with the chosen plan.` },
      { title: 'Tap the CTA', text: `It shows a processing state then confirms.` },
      { title: 'Wire your billing', text: `Connect the CTA to your subscription SDK.` },
    ] },
    features: [
      { title: 'Plan-driven CTA', text: `Button and fine print update from a copy map.` },
      { title: 'Pre-selected best value', text: `Annual is default with a save badge.` },
      { title: 'Per-month framing', text: `Prices shown monthly so annual looks cheaper.` },
      { title: 'Outcome benefits', text: `Features framed as user outcomes.` },
      { title: 'Free-trial CTA', text: `Lowers commitment to convert.` },
      { title: 'CSS checklist', text: `Pure-CSS checkmarks, no icon font.` },
      { title: 'Compliant footer', text: `Restore, terms, and privacy links.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS for paywalls.` },
    ],
    useCases: [
      { title: 'App subscription upsells', text: 'Convert free users inside a [phone mockup](/ui-snippets/phone-mockup/), with a benefit-led hero and a checklist framed as outcomes, not features.' },
      { title: 'Premium feature gating', text: 'Pair with an [upgrade banner](/ui-snippets/upgrade-banner/) shown earlier in the app, so the paywall appears as the natural next step.' },
      { title: 'Plan selection screens', text: 'Lift the plans out as a [plan selector](/ui-snippets/plan-selector/) on the web, keeping annual preselected with a savings badge and monthly-equivalent pricing.' },
      { title: 'Free trial offers', text: 'Add urgency with a [trial countdown](/ui-snippets/trial-countdown/), while the call-to-action and fine print change together from one copy map.' },
      { title: 'Pricing page reuse', text: 'Reuse the plan cards on a marketing page like a [pricing card](/ui-snippets/pricing-card/), keeping the same savings framing across web and app.' },
      { icon: 'CODE', title: 'Related: Mobile Settings Screen', desc: 'See the [Mobile Settings Screen](/ui-snippets/mobile-settings-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does selecting a plan change the button?', a: `The plan cards are buttons, and clicking one moves an active class and looks up that plan's copy in a COPY map. The map holds the CTA label and the fine print for each plan, so selecting Annual versus Monthly rewrites both the button text and the billing terms in one step — keeping the call-to-action and the legal copy in sync with the choice.` },
      { q: 'Why is the annual plan pre-selected?', a: `It's a deliberate conversion pattern: defaulting to the plan you want users to pick (annual, which has higher lifetime value) increases its take rate. The screen reinforces it with a SAVE badge and a per-month price so annual appears cheaper than monthly at a glance — standard, effective paywall tactics.` },
      { q: 'Are the checkmarks images?', a: `No. Each is a green circle with an ::after pseudo-element styled into a tick using two borders rotated 45 degrees — the classic CSS checkmark. There's no icon font or SVG, so the feature list is self-contained and you can recolor the checks by changing two CSS values.` },
      { q: 'How do I connect it to real billing?', a: `Wire the CTA's click handler to your subscription SDK — StoreKit on iOS, Play Billing on Android, or Stripe on the web — passing the selected plan's product id. The plan-to-copy map also makes it easy to add plans or A/B-test wording without touching the markup. The restore link should call your SDK's restore-purchases flow.` },
      { q: 'How do I use this paywall in React, Vue, or Angular?', a: `Hold the selected plan in state and derive the CTA label and fine print from a copy map keyed by plan. Render the plan cards from data with a conditional active class. Trigger your purchase flow in the CTA handler and show a processing state. In Tailwind, style the cards, badge, and checklist with utilities and the checkmarks with a small style block.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reconstruct the conversion logic from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the COPY object keyed by plan drives both the CTA button text and the fine print in one lookup, and why the annual plan is pre-selected with the "SAVE 40%" badge rather than left neutral. The same assistant can help optimize it, for example checking whether the plan-switching logic scales cleanly to a third or fourth pricing tier, or whether the pure-CSS checkmark technique (an ::after pseudo-element rotated into an L-shape) is the cheapest way to render the feature list icons. It's also useful for extending the effect: ask it to add a live countdown for a limited-time discount, wire the CTA into a real billing SDK like StoreKit or Play Billing, or add a comparison table between plans. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile subscription paywall screen in plain HTML, CSS, and vanilla JavaScript, styled inside a phone-shaped frame, with no external libraries.

Requirements:
- A gradient hero section with a close button, an icon or emoji, a headline, and a short benefit sentence, sitting above a scrollable feature checklist.
- Render the feature checklist items with checkmarks drawn purely in CSS (a colored circle with an ::after pseudo-element rotated 45 degrees to form a checkmark) — no icon font, no SVG, no image for the checkmarks.
- Render at least two plan option buttons (for example Monthly and Annual), each showing a plan name, a short billing description, and a price framed as a per-month equivalent even for the annual plan. Pre-select the plan you want users to choose by default and mark it with a savings badge.
- Store a mapping from plan key to its call-to-action label and fine-print legal text in a single JavaScript object, and when the user taps a different plan button, move the active-state styling to the tapped button and update both the CTA button text and the fine print from that one object — they must never fall out of sync.
- Tapping the primary call-to-action button should show a brief "Processing" state before confirming, standing in for a real billing SDK call.
- Include a footer row with Restore, Terms, and Privacy links, matching the legally expected footer pattern for app subscription screens.`,
    },
  },
};

export default paywallScreen;
