const subscriptionBillingToggle = {
  id: 'subscription-billing-toggle',
  title: 'Subscription Billing Toggle',
  category: 'pricing',
  html: `<div class="pricing-page">
  <div class="billing-switch">
    <span class="switch-label" id="monthlyLabel">Monthly</span>
    <button class="toggle" id="billingToggle" role="switch" aria-checked="false" aria-label="Toggle yearly billing" onclick="toggleBilling()">
      <span class="toggle-thumb"></span>
    </button>
    <span class="switch-label" id="yearlyLabel">Yearly <span class="save-badge" id="saveBadge">Save 20%</span></span>
  </div>

  <div class="plans">
    <div class="plan-card" data-monthly="9" data-yearly="86">
      <h3>Starter</h3>
      <div class="price"><span class="amount">$9</span><span class="period">/mo</span></div>
      <p class="billed-as" data-monthly-text="Billed monthly" data-yearly-text="$86 billed yearly">Billed monthly</p>
      <ul>
        <li>1 project</li>
        <li>Basic analytics</li>
        <li>Email support</li>
      </ul>
      <button class="plan-btn">Choose Starter</button>
    </div>
    <div class="plan-card featured" data-monthly="29" data-yearly="278">
      <span class="popular-badge">Most popular</span>
      <h3>Pro</h3>
      <div class="price"><span class="amount">$29</span><span class="period">/mo</span></div>
      <p class="billed-as" data-monthly-text="Billed monthly" data-yearly-text="$278 billed yearly">Billed monthly</p>
      <ul>
        <li>Unlimited projects</li>
        <li>Advanced analytics</li>
        <li>Priority support</li>
        <li>Team collaboration</li>
      </ul>
      <button class="plan-btn primary">Choose Pro</button>
    </div>
    <div class="plan-card" data-monthly="79" data-yearly="758">
      <h3>Business</h3>
      <div class="price"><span class="amount">$79</span><span class="period">/mo</span></div>
      <p class="billed-as" data-monthly-text="Billed monthly" data-yearly-text="$758 billed yearly">Billed monthly</p>
      <ul>
        <li>Everything in Pro</li>
        <li>SSO &amp; audit logs</li>
        <li>Dedicated account manager</li>
      </ul>
      <button class="plan-btn">Choose Business</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 40px 24px; margin: 0; display: flex; align-items: center; flex-direction: column; gap: 20px; }

.pricing-page { width: 100%; max-width: 880px; margin: 0 auto; }

.billing-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 36px;
}

.switch-label { font-size: 14px; font-weight: 600; color: #94a3b8; transition: color 0.15s; }
.switch-label.active { color: #1e293b; }

.save-badge {
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  margin-left: 6px;
}

.toggle {
  width: 48px;
  height: 26px;
  border-radius: 999px;
  background: #cbd5e1;
  border: none;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
}
.toggle[aria-checked="true"] { background: #6366f1; }

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 0.2s ease;
}
.toggle[aria-checked="true"] .toggle-thumb { transform: translateX(22px); }

.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.plan-card {
  position: relative;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 28px 22px;
  text-align: center;
}
.plan-card.featured {
  border-color: #6366f1;
  box-shadow: 0 12px 30px rgba(99,102,241,0.15);
  transform: scale(1.03);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #6366f1;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
}

.plan-card h3 { font-size: 16px; color: #1e293b; margin: 0 0 14px; }

.price { margin-bottom: 4px; }
.amount { font-size: 32px; font-weight: 800; color: #1e293b; }
.period { font-size: 13px; color: #94a3b8; }

.billed-as { font-size: 12px; color: #94a3b8; margin: 0 0 20px; }

.plan-card ul { list-style: none; margin: 0 0 22px; padding: 0; text-align: left; }
.plan-card li {
  font-size: 13px;
  color: #475569;
  padding: 7px 0 7px 22px;
  position: relative;
}
.plan-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #16a34a;
  font-weight: 700;
}

.plan-btn {
  width: 100%;
  padding: 11px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #1e293b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.plan-btn:hover { background: #f1f5f9; }
.plan-btn.primary { background: #6366f1; color: #fff; border-color: #6366f1; }
.plan-btn.primary:hover { background: #4f46e5; }`,
  js: `const toggle = document.getElementById('billingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const yearlyLabel = document.getElementById('yearlyLabel');

function toggleBilling() {
  const isYearly = toggle.getAttribute('aria-checked') !== 'true';
  toggle.setAttribute('aria-checked', String(isYearly));
  monthlyLabel.classList.toggle('active', !isYearly);
  yearlyLabel.classList.toggle('active', isYearly);
  updatePrices(isYearly);
}

function updatePrices(isYearly) {
  document.querySelectorAll('.plan-card').forEach((card) => {
    const monthly = parseFloat(card.dataset.monthly);
    const yearly = parseFloat(card.dataset.yearly);
    const amountEl = card.querySelector('.amount');
    const billedAsEl = card.querySelector('.billed-as');

    if (isYearly) {
      // Show the equivalent monthly rate when billed yearly, e.g. $278/yr -> $23.17/mo.
      const monthlyEquivalent = (yearly / 12).toFixed(2).replace(/\\.00$/, '');
      amountEl.textContent = '$' + monthlyEquivalent;
      billedAsEl.textContent = billedAsEl.dataset.yearlyText;
    } else {
      amountEl.textContent = '$' + monthly;
      billedAsEl.textContent = billedAsEl.dataset.monthlyText;
    }
  });
}

// Initialize labels to reflect the default (monthly) state.
monthlyLabel.classList.add('active');`,

  seo: {
    title: 'Subscription Billing Toggle — Free HTML CSS JS Pricing Switch Snippet',
    description: 'A monthly/yearly pricing toggle that updates prices across multiple plan cards and shows a "save X%" badge, driven by per-card data attributes.',
    about: {
      title: 'Subscription Billing Toggle — HTML, CSS & JavaScript Pricing Switch',
      description: `Pricing pages routinely offer a discount for committing to annual billing, and the standard way to present that is a single toggle switch above the plan cards that updates every card's displayed price at once. Building this well means keeping the pricing data close to the markup (so a designer or CMS editor can update prices without touching JavaScript) rather than hardcoding numbers inside a script.

This snippet implements the full toggle in **plain HTML, CSS, and vanilla JavaScript**.

**How pricing data is stored**

Every \`.plan-card\` carries its own \`data-monthly\` and \`data-yearly\` attributes — the full price for each billing cycle — directly in the HTML. This means the source of truth for pricing lives in the markup itself, not buried in a JavaScript object that someone updating a plan's price might not think to check.

**How the toggle switch works**

The switch is a single \`<button role="switch" aria-checked="false">\` with an inner \`.toggle-thumb\` span. Clicking it flips \`aria-checked\` between \`"true"\` and \`"false"\`, and a CSS rule targeting \`.toggle[aria-checked="true"]\` both recolors the track and translates the thumb — using the \`aria-checked\` attribute itself as the single source of visual truth means the accessible state and the visual state can never disagree.

**How prices update across all cards**

\`updatePrices(isYearly)\` loops over every \`.plan-card\` with \`querySelectorAll\`, reading each card's own \`data-monthly\`/\`data-yearly\` values. For the yearly view, it computes the *equivalent monthly rate* — \`yearly / 12\` — rather than showing the full annual charge as the headline number, since showing a much bigger number as the "price" would read as more expensive at a glance even though it's actually the better deal. The full annual charge (\`$278 billed yearly\`) is shown instead as smaller supporting text below the headline price, sourced from a \`data-yearly-text\` attribute on that same paragraph.

**How the "Save 20%" badge fits in**

The badge is static markup next to the "Yearly" label rather than computed per-plan, since in this snippet the discount percentage is roughly consistent across all three plans. If your plans have different discount rates, compute the percentage per-card instead: \`Math.round((1 - yearly / (monthly * 12)) * 100)\`.

**Why the featured plan is visually distinct**

The middle "Pro" card has a \`.featured\` class giving it a colored border, a lifted shadow, and a slight \`scale(1.03)\`, plus a "Most popular" badge — a common pricing-page technique to visually anchor most buyers toward the plan you'd prefer they choose.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Subscription Billing Toggle" in the sidebar Library tab. The preview shows three plan cards with monthly pricing and the toggle set to Monthly.' },
        { title: 'Flip the toggle', text: 'Click the switch to see all three prices update simultaneously to their per-month-equivalent yearly rate, with the annual total shown beneath each price.' },
        { title: 'Edit a plan\'s pricing', text: 'In the HTML panel, update a plan card\'s data-monthly and data-yearly attributes — the toggle logic picks up the new values automatically.' },
        { title: 'Adjust the savings badge', text: 'In the HTML panel, edit the "Save 20%" text in the save-badge span to match your actual discount percentage.' },
        { title: 'Add a fourth plan', text: 'Copy an existing .plan-card block, update its data attributes, features list, and button text — the toggle and grid layout scale automatically.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Pricing data lives in HTML data attributes per card, not hardcoded inside the JavaScript',
      'aria-checked on the toggle button is the single source of truth for both visual and accessible state',
      'Yearly view shows the equivalent monthly rate as the headline price, with the full annual charge as supporting text',
      'Single updatePrices function loops over any number of plan cards uniformly',
      'Featured plan card visually distinguished with a border, shadow, scale, and "Most popular" badge',
      'Checkmark list items styled via a ::before pseudo-element, no icon font needed',
      'Responsive plan grid via auto-fit and minmax handles any screen size with no media queries',
      'Toggle switch built as a real accessible role="switch" button, not a styled checkbox hack',
      'Labels on both sides of the switch highlight which billing period is currently active',
      'No framework, no pricing-table library, no build step required',
    ],
    useCases: [
      { icon: 'PRICING', title: 'SaaS pricing pages', desc: 'Let visitors compare monthly versus discounted annual pricing across your full plan lineup with a single, familiar toggle interaction.' },
      { icon: 'LEARN', title: 'Learn data-attribute-driven UI updates', desc: 'Study how keeping pricing data in HTML attributes rather than a JS object keeps the markup and behavior cleanly decoupled and easy to update.' },
      { icon: 'FLOW', title: 'Prototype a subscription business model', desc: 'Drop this into an early-stage product prototype to test which pricing tiers and annual discount rate resonate before finalizing them.' },
      { icon: 'DESIGN', title: 'Match your brand\'s pricing page style', desc: 'Adjust the featured plan\'s accent color, badge copy, and card spacing to fit your site\'s existing design system.' },
      { icon: 'ACCESS', title: 'Build accessible custom toggle switches', desc: 'The role="switch" plus aria-checked pattern here is a solid reusable reference for any other custom toggle control in your product.' },
      { icon: 'CODE', title: 'Connect real dynamic pricing', desc: 'Populate the data-monthly and data-yearly attributes server-side or via an API response instead of hardcoding them, for pricing that can change without a deploy.' },
      { icon: 'CODE', title: 'Related: Auto-Detected Regional Pricing', desc: 'See the [Auto-Detected Regional Pricing](/ui-snippets/pricing-region-currency-detector/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Where does the pricing data come from?', a: 'Each .plan-card element has its own data-monthly and data-yearly attributes set directly in the HTML. The JavaScript reads these values at click time rather than storing prices in a separate JavaScript object, keeping pricing data next to the markup it describes.' },
      { q: 'Why does the yearly view show a monthly-equivalent price instead of the full annual charge?', a: 'Showing yearly / 12 as the big headline number keeps the visual price format consistent between the monthly and yearly views (both read as "$X/mo"), and is the standard convention on pricing pages — showing the much larger full annual number as the headline would make the discounted plan look more expensive at a glance, even though it is the better deal.' },
      { q: 'How is the full annual charge shown?', a: 'It appears as smaller supporting text below the price, such as "$278 billed yearly," pulled from a data-yearly-text attribute on the same paragraph element, giving the complete picture without competing with the headline price for attention.' },
      { q: 'How do I calculate the correct "Save X%" percentage for my own pricing?', a: 'Compute it as Math.round((1 - yearly / (monthly * 12)) * 100) for each plan. If your plans all use roughly the same discount rate, a single static badge like the one here is fine; if they differ meaningfully, compute and display the percentage per plan card instead.' },
      { q: 'How does the toggle switch stay in sync between its visual and accessible states?', a: 'The button\'s own aria-checked attribute is the single source of truth — the CSS selector .toggle[aria-checked="true"] drives both the track color and the thumb position, so the visual state can never disagree with what a screen reader announces.' },
      { q: 'How do I add a fourth pricing plan?', a: 'Copy an existing .plan-card block in the HTML panel, update its data-monthly, data-yearly, feature list, and button label. The responsive grid and the price-update loop both automatically include the new card with no other changes.' },
      { q: 'Can I default the toggle to Yearly instead of Monthly?', a: 'Yes. Set the button\'s initial aria-checked to "true", add the active class to the yearly label instead of the monthly one on load, and call updatePrices(true) once when the page initializes.' },
      { q: 'Is this toggle accessible to screen reader and keyboard users?', a: 'Yes. It is a real button with role="switch" and a live aria-checked state, reachable via Tab and toggleable with Enter or Space, and its purpose is described by an aria-label — assistive technology will correctly announce it as a switch with its current on/off state.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain the pricing-page convention behind showing a monthly-equivalent number as the big headline price in the yearly view rather than the full annual charge, and why keeping the raw price data in HTML data attributes (rather than a separate JavaScript object) makes the component easier for a non-engineer to maintain. It's also worth asking the assistant to help you compute a per-plan "Save X%" badge dynamically from each card's own data-monthly and data-yearly values instead of a single static badge, in case your different plan tiers end up with different actual discount rates as your pricing evolves.`,
      prompt: `Build a monthly/yearly billing toggle that updates prices across multiple pricing plan cards in plain HTML, CSS, and JavaScript — no framework, no pricing-table library.

Requirements:
- A single accessible toggle switch built as a real button with role="switch" and a live aria-checked attribute that serves as the sole source of truth for both its visual state (track color, thumb position via CSS attribute selectors) and its accessible state — do not use a hidden checkbox or duplicate the state in a separate JavaScript variable.
- At least three pricing plan cards, each storing its own monthly and yearly total price directly as HTML data attributes on the card element, not hardcoded in the JavaScript.
- Toggling the switch must update every plan card's displayed price simultaneously in a single loop: the yearly view should show the equivalent monthly rate (yearly total divided by 12) as the large headline price, with the full annual charge shown as smaller supporting text beneath it, while the monthly view shows the plain monthly price with "billed monthly" as the supporting text.
- Include a "Save X%" badge near the yearly label on the toggle to advertise the annual discount.
- Visually distinguish one plan card as the recommended/featured option with a colored border, elevated shadow, a slight scale increase, and a "Most popular" badge.
- The plan cards must be laid out in a responsive grid that reflows for narrower screens with no explicit media queries, and the solution must support adding additional plan cards with no changes to the JavaScript.`,
    },
  },
};

export default subscriptionBillingToggle;
