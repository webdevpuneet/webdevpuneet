const bootstrapPricingTableToggle = {
  id: 'bootstrap-pricing-table-toggle',
  title: 'Bootstrap Pricing Table with Monthly/Annual Toggle',
  lastmod: '2026-09-09',
  category: 'pricing',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <h1 class="bsprice-title">Simple, transparent pricing</h1>
  <p class="bsprice-sub">Every plan includes unlimited projects and community support.</p>

  <div class="bsprice-toggle-row">
    <span class="bsprice-toggle-label" id="bspriceMonthlyLabel">Monthly</span>
    <div class="form-check form-switch bsprice-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="bspriceToggle">
    </div>
    <span class="bsprice-toggle-label" id="bspriceAnnualLabel">Annual <span class="badge bg-success-subtle text-success-emphasis ms-1">Save 20%</span></span>
  </div>

  <div class="row justify-content-center g-4 mt-2">
    <div class="col-md-6 col-lg-4">
      <div class="card bsprice-card h-100">
        <div class="card-body">
          <h5 class="text-uppercase text-muted small fw-bold mb-3">Starter</h5>
          <div class="bsprice-amount"><span class="bsprice-num" data-monthly="0" data-annual="0">$0</span><span class="bsprice-period">/mo</span></div>
          <p class="text-muted small mb-4">For solo projects just getting started.</p>
          <ul class="list-unstyled bsprice-features text-start">
            <li>✓ 1 project</li>
            <li>✓ Community support</li>
            <li>✓ 1 GB storage</li>
          </ul>
          <button class="btn btn-outline-dark w-100">Get started</button>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="card bsprice-card bsprice-featured h-100">
        <span class="badge bg-dark bsprice-pill">Most popular</span>
        <div class="card-body">
          <h5 class="text-uppercase text-white-50 small fw-bold mb-3">Pro</h5>
          <div class="bsprice-amount"><span class="bsprice-num" data-monthly="24" data-annual="19">$24</span><span class="bsprice-period">/mo</span></div>
          <p class="text-white-50 small mb-4">For growing teams that need more room.</p>
          <ul class="list-unstyled bsprice-features text-start">
            <li>✓ Unlimited projects</li>
            <li>✓ Priority support</li>
            <li>✓ 100 GB storage</li>
          </ul>
          <button class="btn btn-light w-100 fw-bold">Get started</button>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="card bsprice-card h-100">
        <div class="card-body">
          <h5 class="text-uppercase text-muted small fw-bold mb-3">Team</h5>
          <div class="bsprice-amount"><span class="bsprice-num" data-monthly="79" data-annual="63">$79</span><span class="bsprice-period">/mo</span></div>
          <p class="text-muted small mb-4">For teams that need SSO and audit logs.</p>
          <ul class="list-unstyled bsprice-features text-start">
            <li>✓ Everything in Pro</li>
            <li>✓ SSO &amp; audit log</li>
            <li>✓ 1 TB storage</li>
          </ul>
          <button class="btn btn-outline-dark w-100">Get started</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `body { background: #fff; }

.bsprice-title { font-weight: 800; letter-spacing: -0.02em; }
.bsprice-sub { color: #6b7280; margin-bottom: 28px; }

.bsprice-toggle-row {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 36px;
}
.bsprice-toggle-label { font-size: 14px; font-weight: 600; color: #9ca3af; transition: color .15s; }
.bsprice-toggle-label.bsprice-active { color: #111827; }
.bsprice-switch .form-check-input { width: 2.6em; height: 1.4em; cursor: pointer; }

.bsprice-card {
  border: 1px solid #eceef1;
  border-radius: 14px;
  position: relative;
  transition: transform .2s ease, box-shadow .2s ease;
}
.bsprice-card:hover { transform: translateY(-4px); box-shadow: 0 14px 32px rgba(15,23,42,.08); }

.bsprice-featured {
  background: #111827;
  color: #fff;
  border-color: #111827;
}
.bsprice-pill {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
}

.bsprice-amount { display: flex; align-items: baseline; justify-content: center; gap: 3px; margin-bottom: 6px; }
.bsprice-num { font-size: 40px; font-weight: 800; transition: opacity .12s ease; }
.bsprice-num.bsprice-swap { opacity: 0; }
.bsprice-period { font-size: 13px; color: inherit; opacity: .6; }

.bsprice-features li { padding: 5px 0; font-size: 13.5px; }`,
  js: `const toggle = document.getElementById('bspriceToggle');
const monthlyLabel = document.getElementById('bspriceMonthlyLabel');
const annualLabel = document.getElementById('bspriceAnnualLabel');
const nums = document.querySelectorAll('.bsprice-num');

toggle.addEventListener('change', () => {
  const annual = toggle.checked;
  monthlyLabel.classList.toggle('bsprice-active', !annual);
  annualLabel.classList.toggle('bsprice-active', annual);

  nums.forEach(el => {
    // Fade the number out, swap the digits while invisible, fade back in —
    // avoids the price just snapping to a new value with no transition.
    el.classList.add('bsprice-swap');
    setTimeout(() => {
      const value = annual ? el.dataset.annual : el.dataset.monthly;
      el.textContent = '$' + value;
      el.classList.remove('bsprice-swap');
    }, 120);
  });
});

// Start in the "monthly active" visual state.
monthlyLabel.classList.add('bsprice-active');`,

  seo: {
    title: 'Bootstrap Pricing Table with Monthly/Annual Toggle — Free Snippet',
    description: 'A real Bootstrap 5.3 three-tier pricing table with a working monthly/annual billing switch that recalculates every price with a smooth fade transition.',
    about: {
      title: 'Bootstrap Pricing Table with Monthly/Annual Toggle — HTML, CSS & JavaScript',
      description: `A SaaS pricing page's most important interactive element is usually the billing toggle — the switch that recalculates every plan's price between monthly and annual (discounted) rates. This snippet builds that toggle on **real Bootstrap 5.3**: the actual \`.form-check.form-switch\` component for the switch itself, and a genuine three-card \`.card\` grid for the pricing tiers, loaded from the real Bootstrap CDN.

**Where the two prices come from**

Every plan's price element carries two data attributes — \`data-monthly\` and \`data-annual\` — holding that plan's rate under each billing cycle. There's no separate calculation or percentage-off math happening in JavaScript; the annual rate is simply whatever value is written into \`data-annual\`, which keeps the logic dead simple and the numbers exactly what you intended, rather than computed and potentially rounded incorrectly at runtime.

**The fade-swap transition**

Flipping the switch doesn't just replace the price text instantly — each \`.bsprice-num\` element gets a \`.bsprice-swap\` class (which fades its opacity to 0 via CSS transition), waits 120ms for that fade to complete, swaps in the new digits from the relevant data attribute, then removes the class to fade back in. That short pause is what turns a jarring instant number-swap into a price that visibly "updates" rather than glitches.

**The featured plan**

The middle "Pro" card breaks from the other two — a dark background, a "Most popular" pill badge positioned to straddle its top edge, and a lifted \`transform\` on hover — the standard visual technique for directing a visitor's eye toward the plan you actually want most people to choose, without needing to disable or grey out the other options.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Bootstrap Pricing Table with Monthly/Annual Toggle" in the sidebar Library tab. The preview loads with the Monthly rate showing on all three cards.' },
        { title: 'Flip the toggle', text: 'Click the switch — all three prices fade out, swap to their annual (discounted) rate, and fade back in, and the active label bolds to match.' },
        { title: 'Flip it back', text: 'Click again to confirm it correctly reverts every price back to its monthly rate.' },
        { title: 'Edit the prices', text: 'In the HTML panel, change any .bsprice-num\'s data-monthly and data-annual attributes and its starting $X text — the toggle picks up new values automatically, no JS changes needed.' },
        { title: 'Add a fourth tier', text: 'Copy one .col-md-6.col-lg-4 card block and adjust its content — the toggle logic applies to any number of .bsprice-num elements on the page.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 form-switch component and card grid, loaded from the actual CDN',
      'Monthly/annual prices stored as data attributes per plan — no runtime percentage math to get wrong',
      'Fade-out, swap, fade-in transition on every price change instead of an instant, jarring update',
      'Featured "Most popular" plan with a straddling pill badge and a dark, elevated card treatment',
      'Toggle logic scales to any number of pricing cards — add a fourth tier with zero JS changes',
      'Active billing-period label bolds to reflect the current toggle state at a glance',
      'Fully responsive three-column grid that stacks on mobile via Bootstrap\'s grid classes',
      'Hover-lift and shadow on every card for a tactile, clickable feel',
    ],
    useCases: [
      { icon: 'MONEY', title: 'SaaS and subscription product pricing pages', desc: 'A complete, working billing toggle is the single most expected interaction on a modern pricing page — this snippet ships it correctly rather than as a static mockup.' },
      { icon: 'LEARN', title: 'Learning Bootstrap\'s real form-switch component', desc: 'See how form-check-input with role="switch" produces a genuine accessible toggle control, wired to a plain change event listener.' },
      { icon: 'DESIGN', title: 'A/B testing annual-discount framing', desc: 'Swap the "Save 20%" badge copy and the data-annual values to test different discount framings without touching any of the toggle logic.' },
      { icon: 'FLOW', title: 'Internal tools with tiered feature access', desc: 'Reuse the same three-card layout and feature-list pattern for an internal plan/tier selector, even without the billing-cycle toggle if it isn\'t needed.' },
    ],
    faqs: [
      { q: 'Does the toggle use real Bootstrap components?', a: 'Yes — the switch is Bootstrap\'s actual form-check-input with role="switch" (form-switch styling), and the pricing cards use the real .card component, both loaded from the genuine Bootstrap 5.3 CDN, not custom-styled imitations.' },
      { q: 'How is the annual discount calculated?', a: 'It isn\'t calculated at runtime — each price\'s annual rate is a fixed value written directly into a data-annual attribute. This avoids rounding surprises and means you always see exactly the number you set, not a computed percentage that might come out oddly.' },
      { q: 'Why does the price fade instead of just changing instantly?', a: 'An instant text swap on a toggle click reads as a glitch. Fading the price out, updating the digits while invisible, then fading back in over about 250ms total makes the change feel intentional and smooth rather than jarring.' },
      { q: 'Can I add a fourth pricing tier?', a: 'Yes — copy one of the existing .col-md-6.col-lg-4 card blocks, update its content and data-monthly/data-annual values. The toggle\'s change listener queries all .bsprice-num elements on the page, so a new card is picked up automatically.' },
      { q: 'Is the toggle accessible to keyboard and screen reader users?', a: 'Yes — it\'s a real checkbox input styled by Bootstrap\'s form-switch classes, so it\'s natively focusable, togglable with the keyboard, and announced correctly by screen readers, unlike a purely decorative div-based toggle.' },
      { q: 'How do I make a different plan the "featured" one?', a: 'Move the bsprice-featured class and the "Most popular" badge span to a different card\'s .card element — the dark styling and pill badge positioning are pure CSS tied to that class, independent of which column it\'s in.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a third billing option (e.g. a 2-year plan with a steeper discount) by extending the toggle into a segmented control instead of a binary switch, or to animate the featured card's badge with a subtle pulse to draw more attention. It's also a good snippet to ask the assistant to convert into a React component that takes a plans array as a prop, deriving the monthly/annual display from props and toggle state instead of reading data attributes off the DOM.`,
      prompt: `Build a Bootstrap 5.3 pricing table with a working monthly/annual billing toggle, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Three pricing cards in a responsive Bootstrap grid (row/col-md-6/col-lg-4), each with a plan name, a price, a short description, a feature list, and a CTA button. The middle card should be visually featured (elevated, dark background, a "Most popular" badge).
- A real Bootstrap form-switch toggle (form-check-input with role="switch") above the cards, with labels on either side indicating "Monthly" and "Annual", the active label visually bolded based on the current toggle state.
- Each plan's price element must store its monthly and annual rates as data attributes (not computed via a percentage at runtime) — toggling the switch should read the correct data attribute and update the displayed price for all three plans simultaneously.
- The price update on toggle must not be instant — fade the price out via a CSS opacity transition, swap the digits while invisible, then fade back in, so the change reads as smooth rather than jarring.
- The layout must be fully responsive, stacking the three cards to a single column on mobile using Bootstrap's grid classes alone.`,
    },
  },
};

export default bootstrapPricingTableToggle;
