const bootstrapHeroGradientCta = {
  id: 'bootstrap-hero-gradient-cta',
  title: 'Bootstrap Hero Section with Gradient Background',
  lastmod: '2026-09-09',
  category: 'heroes',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<section class="bshero-section">
  <div class="container py-5">
    <div class="row align-items-center gy-4">
      <div class="col-lg-6 text-center text-lg-start">
        <span class="badge rounded-pill bshero-badge mb-3">New · v2.4 launched</span>
        <h1 class="bshero-title">Ship your product page in an afternoon.</h1>
        <p class="bshero-sub">A Bootstrap 5 hero section with a real, working email capture form — type an address, submit, and watch it get validated and added to the list below, no page reload.</p>
        <form id="bsheroForm" class="row g-2 justify-content-center justify-content-lg-start bshero-form" novalidate>
          <div class="col-sm-7">
            <input type="email" class="form-control form-control-lg" id="bsheroEmail" placeholder="you@company.com" required>
            <div class="invalid-feedback" id="bsheroError">Enter a valid email address.</div>
          </div>
          <div class="col-sm-auto">
            <button class="btn btn-light btn-lg fw-bold text-nowrap" type="submit">Get early access</button>
          </div>
        </form>
        <div class="bshero-signups" id="bsheroSignups">
          <span class="text-white-50 small">No signups yet — be the first.</span>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="bshero-card">
          <div class="bshero-card-dots"><span></span><span></span><span></span></div>
          <div class="bshero-card-body">
            <div class="bshero-stat">
              <div class="bshero-stat-label">Weekly signups</div>
              <div class="bshero-stat-value" id="bsheroCount">0</div>
            </div>
            <div class="bshero-bars">
              <div class="bshero-bar" style="--h:40%"></div>
              <div class="bshero-bar" style="--h:65%"></div>
              <div class="bshero-bar" style="--h:52%"></div>
              <div class="bshero-bar" style="--h:80%"></div>
              <div class="bshero-bar bshero-bar-active" style="--h:95%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  css: `body { margin: 0; }

.bshero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
  color: #fff;
}

.bshero-badge {
  background: rgba(255,255,255,.16);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
}

.bshero-title {
  font-size: clamp(1.8rem, 1.4rem + 1.5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: 14px;
}

.bshero-sub {
  color: rgba(255,255,255,.85);
  font-size: 15px;
  line-height: 1.65;
  margin-bottom: 22px;
  max-width: 480px;
}

.bshero-form .form-control {
  border: none;
}
.bshero-form .form-control.is-invalid { box-shadow: 0 0 0 3px rgba(220,38,38,.35); }

.bshero-signups {
  margin-top: 14px;
  min-height: 20px;
  font-size: 13px;
}
.bshero-signups .badge { margin-right: 6px; }

.bshero-card {
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 16px;
  backdrop-filter: blur(6px);
  overflow: hidden;
}
.bshero-card-dots {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,.14);
}
.bshero-card-dots span {
  width: 9px; height: 9px; border-radius: 50%;
  background: rgba(255,255,255,.35);
}
.bshero-card-body { padding: 26px; }

.bshero-stat-label { font-size: 12px; color: rgba(255,255,255,.7); margin-bottom: 4px; }
.bshero-stat-value { font-size: 32px; font-weight: 800; margin-bottom: 20px; transition: transform .15s ease; }
.bshero-stat-value.bshero-pop { transform: scale(1.12); }

.bshero-bars {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 100px;
}
.bshero-bar {
  flex: 1;
  height: var(--h);
  background: rgba(255,255,255,.28);
  border-radius: 5px 5px 0 0;
  transition: height .3s ease, background .3s ease;
}
.bshero-bar-active { background: #fff; }`,
  js: `const form = document.getElementById('bsheroForm');
const emailInput = document.getElementById('bsheroEmail');
const signupsEl = document.getElementById('bsheroSignups');
const countEl = document.getElementById('bsheroCount');
const lastBar = document.querySelector('.bshero-bar-active');

let count = 0;
const added = [];

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = emailInput.value.trim();

  if (!emailInput.checkValidity()) {
    emailInput.classList.add('is-invalid');
    return;
  }
  emailInput.classList.remove('is-invalid');

  count++;
  added.unshift(value);
  countEl.textContent = count;
  countEl.classList.add('bshero-pop');
  setTimeout(() => countEl.classList.remove('bshero-pop'), 200);

  // Grow the live bar a little with each signup, capped so it never
  // overflows the chart — a small visual payoff tied to a real action.
  const currentH = parseFloat(lastBar.style.getPropertyValue('--h'));
  lastBar.style.setProperty('--h', Math.min(100, currentH + 3) + '%');

  signupsEl.innerHTML = added.slice(0, 4).map(e =>
    '<span class="badge bg-light text-dark">' + e + '</span>'
  ).join('');

  form.reset();
});

emailInput.addEventListener('input', () => emailInput.classList.remove('is-invalid'));`,

  seo: {
    title: 'Bootstrap Hero Section with Gradient Background — Free Snippet',
    description: 'A Bootstrap 5.3 hero section with a gradient background, a real validated email-capture form, and a live stat card that updates on every signup. Copy-paste ready.',
    about: {
      title: 'Bootstrap Hero Section with Gradient Background — HTML, CSS & JavaScript',
      description: `A landing page hero has one job: get a visitor to take the first step, usually entering an email address or clicking a primary CTA. This snippet builds that hero as a **real Bootstrap 5.3 layout** — a two-column \`row\`/\`col-lg-6\` grid, Bootstrap's own form controls and validation classes, loaded from the actual Bootstrap CDN — with a genuinely working email capture form on the left and a live, animating stat card on the right, instead of static placeholder numbers.

**Real validation, not a decorative form**

The form is a real \`<form>\` with an \`email\` input marked \`required\`. On submit, \`emailInput.checkValidity()\` runs Bootstrap-compatible native HTML5 validation — an invalid or empty address adds Bootstrap's \`.is-invalid\` class (which drives both a red focus ring and, if you add a sibling \`.invalid-feedback\`, an inline error message) and the submission stops there. A valid address clears any error state, gets added to a running list rendered as badges under the form, and bumps a signup counter with a small scale "pop" animation — a genuine confirmation that something happened, not just an emptied input box.

**The stat card is driven by the same submit event**

Rather than a chart library, the bar chart on the right is five plain \`div\`s sized with a CSS custom property (\`--h\`) controlling height via \`inline style\`. Each successful signup nudges the last (highlighted) bar's height up slightly, capped at 100% — a small, honest piece of "your action changed something" feedback rather than a chart that's purely decorative.

**The gradient and glass card**

The background is a three-stop \`linear-gradient\` (indigo → violet → pink) applied to the whole \`<section>\`, and the stat card on the right uses \`backdrop-filter: blur(6px)\` over a translucent white background — a common combination for making a card read as "floating" above a colored gradient rather than sitting flatly on top of it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Bootstrap Hero Section with Gradient Background" in the sidebar Library tab. The preview loads with a zero-signup stat card.' },
        { title: 'Submit an invalid email', text: 'Type something that isn\'t a valid email (or leave it blank) and click "Get early access" — the input gets a red Bootstrap invalid state and the form does not submit.' },
        { title: 'Submit a real email', text: 'Type a properly formatted address and submit — it appears as a badge below the form, the counter increments with a pop animation, and the highlighted bar in the stat card grows slightly.' },
        { title: 'Submit a few more', text: 'Repeat with different addresses to watch the signup list, counter, and bar chart all update live from real form submissions.' },
        { title: 'Restyle the gradient', text: 'In the CSS panel, edit the linear-gradient on .bshero-section to swap in your own brand colors.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 grid (row/col-lg-6) and form-control classes, loaded from the actual CDN',
      'Genuine native HTML5 email validation via checkValidity(), driving Bootstrap\'s is-invalid state',
      'Live signup list rendered as Bootstrap badges from real, validated form submissions',
      'Animated counter with a scale-pop confirmation on every successful signup',
      'Five-bar chart built from plain divs and a CSS custom property, no charting library',
      'Three-stop CSS linear-gradient background, easy to swap for any brand palette',
      'Glassmorphism stat card using backdrop-filter over a translucent background',
      'Fully responsive — stacks to a single column below Bootstrap\'s lg breakpoint',
    ],
    useCases: [
      { icon: 'MONEY', title: 'SaaS product launch and waitlist pages', desc: 'A genuinely functional email-capture hero for a pre-launch or early-access page, with real validation instead of a form that silently accepts anything.' },
      { icon: 'LEARN', title: 'Learning Bootstrap\'s native validation classes', desc: 'See exactly how is-invalid and invalid-feedback pair with checkValidity() to produce a working validated form, without a validation library.' },
      { icon: 'DESIGN', title: 'Marketing pages needing a bold, colorful first impression', desc: 'The gradient background and glass stat card give a hero section visual weight appropriate for a landing page\'s very first fold.' },
      { icon: 'FLOW', title: 'A/B testing hero copy and CTA framing', desc: 'Swap the headline, subhead, and badge text to test different value propositions while keeping the working form and stat card intact.' },
    ],
    faqs: [
      { q: 'Is the email form actually validated, or just for show?', a: 'It\'s real. The submit handler calls the input\'s native checkValidity(), which enforces the browser\'s built-in email format rules. An invalid or empty address is rejected with Bootstrap\'s is-invalid styling; only a properly formatted address is accepted and added to the signup list.' },
      { q: 'Where do the submitted emails go?', a: 'Nowhere outside the page — this is a front-end demo, so submissions are held in a plain JavaScript array and rendered as badges. Wire the submit handler to your own API endpoint (fetch/POST) to actually collect signups.' },
      { q: 'How does the bar chart update without a charting library?', a: 'Each bar is a div whose height is set via a CSS custom property (--h) read by its own height: var(--h) rule. The highlighted bar\'s --h value is nudged upward by a few percent on each successful signup, with a CSS transition producing the smooth grow animation.' },
      { q: 'Can I change the gradient colors?', a: 'Yes — edit the linear-gradient() value on .bshero-section in the CSS panel. Any valid CSS gradient works; keep at least two stops with enough contrast for the white text to stay readable.' },
      { q: 'Is this section fully responsive?', a: 'Yes — it uses Bootstrap\'s standard row/col-lg-6 grid, so the two columns stack vertically on screens narrower than Bootstrap\'s lg breakpoint (992px), with the copy and form centered.' },
      { q: 'Can I add a second CTA button next to the email form?', a: 'Yes — add a second Bootstrap button (e.g. btn btn-outline-light) inside or beside the form row; it won\'t interfere with the existing submit handler as long as it doesn\'t have type="submit" unless you want it to trigger the same validation.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to wire the form's submit handler to a real API endpoint with fetch(), including a loading state on the button and an error state for a failed request — versus the current front-end-only array. It's also a good snippet to ask the assistant to extract the five-bar chart into its own reusable component that accepts a live data array, or to add localStorage persistence so the signup list and counter survive a page reload.`,
      prompt: `Build a Bootstrap 5.3 hero section for a SaaS landing page, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A two-column layout using Bootstrap's grid (row / col-lg-6) with a colorful CSS linear-gradient background across the full section, white text, a headline, a supporting paragraph, and an email-capture form on the left; a glassmorphism-style stat card with a small bar chart on the right.
- The email form must use a real HTML5 email input with the required attribute, and its submit handler must call the input's native checkValidity() — an invalid or empty submission should add Bootstrap's is-invalid class and stop, not silently succeed.
- A valid, successful submission must: add the submitted email to a visible list rendered as Bootstrap badges, increment a counter with a brief scale animation, and slightly grow the tallest bar in the stat card's chart (implemented with plain divs sized by a CSS custom property, not a charting library).
- The stat card should use backdrop-filter for a frosted-glass effect over the gradient background.
- The whole section must be responsive, stacking to a single column below Bootstrap's lg breakpoint using Bootstrap's grid classes alone (no custom media queries needed for the stacking behavior).`,
    },
  },
};

export default bootstrapHeroGradientCta;
