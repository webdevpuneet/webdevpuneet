const offerLetterPreview = {
  id: 'offer-letter-preview',
  title: 'Offer Letter Preview Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="olp-card" id="olpCard">
  <div class="olp-head">
    <span class="olp-badge">Offer</span>
    <h2>Senior Product Designer</h2>
    <p class="olp-sub">Northwind Labs &middot; Remote (US)</p>
  </div>

  <dl class="olp-comp">
    <div class="olp-comp-row">
      <dt>Base salary</dt>
      <dd>$148,000<span>/yr</span></dd>
    </div>
    <div class="olp-comp-row">
      <dt>Signing bonus</dt>
      <dd>$10,000<span>one-time</span></dd>
    </div>
    <div class="olp-comp-row">
      <dt>Equity</dt>
      <dd>0.08%<span>4yr vest, 1yr cliff</span></dd>
    </div>
    <div class="olp-comp-row olp-comp-total">
      <dt>Est. year-one total</dt>
      <dd>$158,000</dd>
    </div>
  </dl>

  <div class="olp-meta">
    <div><span class="olp-meta-label">Start date</span><span class="olp-meta-val">September 15, 2026</span></div>
    <div><span class="olp-meta-label">Manager</span><span class="olp-meta-val">Priya Shah</span></div>
    <div><span class="olp-meta-label">Offer expires</span><span class="olp-meta-val">August 29, 2026</span></div>
  </div>

  <div class="olp-actions" id="olpActions">
    <button class="olp-btn olp-btn--decline" type="button" data-action="decline">Decline</button>
    <button class="olp-btn olp-btn--negotiate" type="button" data-action="negotiate">Negotiate</button>
    <button class="olp-btn olp-btn--accept" type="button" data-action="accept">Accept offer</button>
  </div>

  <div class="olp-result" id="olpResult" hidden></div>
</div>`,

  css: `*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0c0e15;color:#e7e9f2;padding:40px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.olp-card{width:100%;max-width:440px;background:#12141f;border:1px solid #23273a;border-radius:18px;padding:26px;transition:opacity .2s ease}
.olp-badge{display:inline-block;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#34d399;background:#0f2e22;padding:4px 10px;border-radius:99px;margin-bottom:10px}
.olp-head h2{margin:0 0 4px;font-size:20px;letter-spacing:-.01em}
.olp-sub{margin:0 0 22px;color:#9aa0b8;font-size:13.5px}
.olp-comp{margin:0 0 20px;border:1px solid #20232f;border-radius:12px;overflow:hidden}
.olp-comp-row{display:flex;justify-content:space-between;align-items:baseline;padding:12px 14px;border-bottom:1px solid #20232f}
.olp-comp-row:last-child{border-bottom:none}
.olp-comp-row dt{color:#9aa0b8;font-size:13px}
.olp-comp-row dd{margin:0;font-weight:700;font-size:14.5px}
.olp-comp-row dd span{display:block;font-weight:400;font-size:11px;color:#6d7290;text-align:right}
.olp-comp-total{background:#151830}
.olp-comp-total dt,.olp-comp-total dd{color:#a5b4fc;font-weight:700}
.olp-meta{display:flex;flex-direction:column;gap:10px;margin-bottom:22px}
.olp-meta > div{display:flex;justify-content:space-between;font-size:13px}
.olp-meta-label{color:#8a8fa8}
.olp-meta-val{font-weight:600}
.olp-actions{display:flex;gap:8px}
.olp-btn{flex:1;padding:11px 0;border-radius:10px;border:1px solid transparent;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
.olp-btn--decline{background:transparent;border-color:#3a2530;color:#f87171}
.olp-btn--decline:hover{background:#1a1116}
.olp-btn--negotiate{background:transparent;border-color:#2c3046;color:#c7cade}
.olp-btn--negotiate:hover{background:#181b27}
.olp-btn--accept{background:#34d399;color:#062018}
.olp-btn--accept:hover{background:#2bbd89}
.olp-result{margin-top:6px;padding:16px;border-radius:12px;text-align:center;font-size:13.5px;font-weight:600}
.olp-result--accept{background:#0f2e22;color:#34d399}
.olp-result--decline{background:#3a1420;color:#f87171}
.olp-result--negotiate{background:#151830;color:#a5b4fc}`,

  js: `const actions = document.getElementById('olpActions');
const result = document.getElementById('olpResult');
const card = document.getElementById('olpCard');

const messages = {
  accept: 'Offer accepted \\u2014 confirmation sent to Priya Shah. Welcome aboard!',
  decline: 'Offer declined. Northwind Labs has been notified.',
  negotiate: 'A negotiation request was sent \\u2014 Priya Shah will follow up within 2 business days.',
};

actions.querySelectorAll('.olp-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    actions.hidden = true;
    result.hidden = false;
    result.textContent = messages[action];
    result.className = 'olp-result olp-result--' + action;
    card.style.opacity = '1';
  });
});`,

  seo: {
    title: 'Offer Letter Preview Card — Free Compensation Breakdown UI',
    description: `A structured job-offer summary card with a base/bonus/equity compensation breakdown, start date, and Accept, Decline, or Negotiate actions that produce a clear state change once acted on.`,
    about: {
      title: 'Offer Letter Preview Card — Compensation Breakdown & Response Actions',
      description: `The offer letter preview card is the moment a candidate reads and responds to a job offer: role, compensation line items, key dates, and three distinct actions. This snippet builds it in plain HTML, CSS, and JavaScript.

**Compensation as itemized rows, not one number**

A \`<dl>\` lists base salary, signing bonus, and equity as separate rows, each with a secondary label (\`/yr\`, \`one-time\`, vesting terms) under the figure — then a visually distinct total row summarizes estimated year-one value. Breaking compensation into parts is what makes an offer legible instead of a single opaque number.

**Three actions, three outcomes**

Accept, Decline, and Negotiate are not decorative — each button carries a \`data-action\`, and a shared click handler looks up a distinct message per action from a \`messages\` object, then swaps the action row for a result panel styled uniquely per outcome (green for accept, red for decline, indigo for negotiate). One handler, three genuinely different end states.

**A real, visible state change**

Clicking any action hides the button row entirely and reveals \`#olpResult\` with outcome-specific text and color — so "acting on" the card isn't just a button press with no visible consequence, the card visibly resolves into whichever path was chosen.

**Metadata that matters to a decision**

Start date, hiring manager, and offer expiration are surfaced as their own row, separate from compensation — the practical details a candidate needs alongside the numbers to actually decide.

**Customizing it**

Wire each action to a real API call (e-signature for accept, a negotiation form for negotiate), add a countdown to the expiration date, or support multiple compensation currencies. Pair it with a [job listing card](/ui-snippets/job-listing-card/) for the original posting, or a [candidate pipeline kanban](/ui-snippets/candidate-pipeline-kanban/) for the recruiter's side of the same process.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `An offer card with compensation breakdown and actions render.` },
      { title: 'Review the comp rows', text: `Base, bonus, and equity each show a value and a note.` },
      { title: 'Click Accept, Decline, or Negotiate', text: `The action row is replaced by a result panel.` },
      { title: 'Compare outcomes', text: `Each action produces its own message and color.` },
      { title: 'Edit the compensation figures', text: `Change the dl rows for a different offer.` },
      { title: 'Wire an action to your backend', text: `Send the real request inside its click handler.` },
    ] },
    features: [
      { title: 'Itemized compensation', text: `Base, bonus, and equity as separate labeled rows.` },
      { title: 'Highlighted total row', text: `Estimated year-one total stands out visually.` },
      { title: 'Three distinct actions', text: `Accept, Decline, and Negotiate each resolve differently.` },
      { title: 'Visible state change', text: `Actions swap out for a result panel, not a silent no-op.` },
      { title: 'Outcome-specific styling', text: `Green, red, and indigo result panels per action.` },
      { title: 'Key offer metadata', text: `Start date, manager, and expiration surfaced clearly.` },
      { title: 'Single shared handler', text: `One click listener drives all three actions via data-action.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and JS.` },
    ],
    useCases: [
      { title: 'Recruiting platform offers', text: 'Pair with a [candidate pipeline kanban](/ui-snippets/candidate-pipeline-kanban/) so a candidate reaching the offer stage sees a clear summary.' },
      { title: 'HR offer management', text: 'Show a compensation breakdown of base, bonus and equity as separate rows, with a highlighted estimated first-year total.' },
      { title: 'Job board offer stages', text: 'Extend a [job listing card](/ui-snippets/job-listing-card/) into the offer stage, with Accept, Decline and Negotiate each resolving differently.' },
      { title: 'Internal mobility offers', text: 'Present compensation for a role change, replacing action buttons with a result panel so the response is never a silent no-op.' },
      { title: 'Contractor and promotion letters', text: 'Swap salary rows for hourly or project rates, or reuse the breakdown to summarise a raise on a promotion letter.' },
    ],
    faqs: [
      { q: 'How does one click handler produce three different outcomes?', a: `Each button carries a data-action attribute ("accept", "decline", or "negotiate"). The shared click handler reads that attribute, looks up the corresponding text in a messages object, and applies a matching modifier class (olp-result--accept, --decline, or --negotiate) to the result panel — so a single function drives three visually and textually distinct end states instead of three near-duplicate handlers.` },
      { q: 'Why hide the action buttons instead of just disabling them after a click?', a: `Hiding the entire action row and revealing a dedicated result panel makes the state change unambiguous — there's no risk of a disabled-but-still-visible button being misread as "still pending." It also frees the space for a message that explains what happens next, which a disabled button can't communicate on its own.` },
      { q: 'How would I connect the Accept button to a real e-signature or backend flow?', a: `Inside the click handler's accept branch, instead of (or in addition to) swapping in the result panel immediately, fire your API call or open an e-signature modal first, and only show the success result panel once that call resolves. You could show a loading state on the button while the request is in flight, then reveal the result panel on success or an error message on failure.` },
      { q: 'How do I show a countdown to the offer expiration date?', a: `Compute the difference between the current date and the expiration date shown in the metadata row, format it as "expires in N days," and update that text (or re-render it) on an interval or on page load. You could also swap the metadata row's styling to a warning color once the offer is within, say, 48 hours of expiring.` },
      { q: 'How do I use this offer card in React, Vue, or Angular?', a: `Model the offer as a data object (role, company, compensation line items, dates) and render the dl rows from it. Hold the response action in component state (null until clicked), conditionally render either the action buttons or the result panel based on that state, and call your real API from the click handler before updating state to reflect success. The compensation and metadata layout is plain CSS and ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing how to keep three different button outcomes maintainable, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the shared click handler uses each button's data-action attribute together with a messages lookup object to avoid three near-duplicate event handlers, and why swapping the action row for a distinct result panel communicates a state change more clearly than simply disabling the clicked button. The same assistant is useful for extending the card into a real flow — ask it to wire the Accept button to an e-signature API call with a loading state while the request is in flight, add a live countdown to the offer's expiration date, or restructure the compensation breakdown to support multiple currencies or hourly contractor terms instead of an annual salary.`,
      prompt: `Build an "offer letter preview card" in plain HTML, CSS, and JavaScript — no frameworks, no dependencies.

Requirements:
- A card showing a job title, company/location subtitle, and an itemized compensation breakdown as a definition list: base salary, signing bonus, and equity, each with its figure and a small secondary note (e.g. "/yr", "one-time", vesting terms) — plus a visually distinct total row summarizing estimated year-one value.
- A metadata section showing start date, hiring manager, and offer expiration date as separate rows.
- Three action buttons: Accept, Decline, and Negotiate, each carrying a data-action attribute, all wired to a single shared click handler (not three separate near-duplicate handlers) that looks up a distinct outcome message per action from a lookup object.
- Clicking any action button must hide the entire action-button row and reveal a separate result panel showing the outcome-specific message, with the result panel's background/text color also differing per action (e.g. green for accept, red for decline, indigo/blue for negotiate) — this must be a real, visible state change, not just a disabled button or a console log.
- Keep it in a dark theme with clear visual hierarchy between the compensation total and its line items, and make sure the JavaScript only references classnames/ids/data attributes that exist in the HTML you write.`,
    },
  },
};

export default offerLetterPreview;
