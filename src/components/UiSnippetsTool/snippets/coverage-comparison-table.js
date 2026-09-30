const coverageComparisonTable = {
  id: 'coverage-comparison-table',
  title: 'Insurance Coverage Comparison Table',
  lastmod: '2026-08-22',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="cc-wrap">
  <div class="cc-head">
    <h2>Compare plans</h2>
    <p>Every plan includes 24/7 claims support and no hidden fees.</p>
  </div>

  <div class="cc-table-scroll">
    <table class="cc-table">
      <thead>
        <tr>
          <th class="cc-row-label"></th>
          <th>Basic</th>
          <th class="cc-recommended">
            <span class="cc-badge">Most popular</span>
            Standard
          </th>
          <th>Premium</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cc-row-label">Monthly premium</td>
          <td class="cc-price">$24<span>/mo</span></td>
          <td class="cc-recommended cc-price">$41<span>/mo</span></td>
          <td class="cc-price">$68<span>/mo</span></td>
        </tr>
        <tr>
          <td class="cc-row-label">Coverage limit</td>
          <td>$25,000</td>
          <td class="cc-recommended">$100,000</td>
          <td>$500,000</td>
        </tr>
        <tr>
          <td class="cc-row-label">Deductible</td>
          <td>$1,000</td>
          <td class="cc-recommended">$500</td>
          <td>$250</td>
        </tr>
        <tr>
          <td class="cc-row-label">Roadside assistance</td>
          <td class="cc-dash">—</td>
          <td class="cc-recommended cc-check">✓</td>
          <td class="cc-check">✓</td>
        </tr>
        <tr>
          <td class="cc-row-label">Rental car reimbursement</td>
          <td class="cc-dash">—</td>
          <td class="cc-recommended cc-check">✓</td>
          <td class="cc-check">✓</td>
        </tr>
        <tr>
          <td class="cc-row-label">Accident forgiveness</td>
          <td class="cc-dash">—</td>
          <td class="cc-recommended cc-dash">—</td>
          <td class="cc-check">✓</td>
        </tr>
        <tr>
          <td class="cc-row-label">New car replacement</td>
          <td class="cc-dash">—</td>
          <td class="cc-recommended cc-dash">—</td>
          <td class="cc-check">✓</td>
        </tr>
        <tr>
          <td class="cc-row-label">Claims response time</td>
          <td>5–7 days</td>
          <td class="cc-recommended">2–4 days</td>
          <td>24 hours</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="cc-row-label"></td>
          <td><button class="cc-btn cc-btn-outline" onclick="selectPlan('Basic', this)">Choose Basic</button></td>
          <td class="cc-recommended"><button class="cc-btn cc-btn-solid" onclick="selectPlan('Standard', this)">Choose Standard</button></td>
          <td><button class="cc-btn cc-btn-outline" onclick="selectPlan('Premium', this)">Choose Premium</button></td>
        </tr>
      </tfoot>
    </table>
  </div>

  <div class="cc-selected" id="ccSelected" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;color:#e6e9f0;min-height:100vh;padding:40px 20px;display:flex;justify-content:center;align-items:center}
.cc-wrap{width:100%;max-width:760px}
.cc-head{text-align:center;margin-bottom:26px}
.cc-head h2{font-size:26px;letter-spacing:-.01em;margin-bottom:6px}
.cc-head p{color:#8992a8;font-size:13px}

.cc-table-scroll{overflow-x:auto;border-radius:16px;border:1px solid #232a3a}
.cc-table{width:100%;border-collapse:collapse;background:#12161f;min-width:520px}
.cc-table th,.cc-table td{padding:14px 16px;text-align:center;font-size:13px;border-bottom:1px solid #1c2230}
.cc-table thead th{font-size:14px;font-weight:800;color:#f4f6fb;padding-top:20px;position:relative}
.cc-row-label{text-align:left;color:#aab1c6;font-weight:600;white-space:nowrap}
.cc-table tbody tr:last-child td{border-bottom:none}

.cc-recommended{background:#161f33;position:relative}
.cc-table thead .cc-recommended{border-radius:10px 10px 0 0}
.cc-badge{display:block;font-size:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:#7cb2ff;background:#1e2c4a;padding:3px 9px;border-radius:999px;margin:0 auto 8px;width:fit-content}

.cc-price{font-size:18px;font-weight:800;color:#f4f6fb}
.cc-price span{font-size:11px;font-weight:500;color:#8992a8}

.cc-check{color:#4ade80;font-weight:800;font-size:15px}
.cc-dash{color:#3d4356}

.cc-table tfoot .cc-recommended{border-radius:0 0 10px 10px}
.cc-btn{width:100%;padding:9px 10px;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;border:1px solid transparent;transition:opacity .15s}
.cc-btn-outline{background:transparent;border-color:#2c3448;color:#c6ccdb}
.cc-btn-outline:hover{background:#1a2030}
.cc-btn-solid{background:#3b82f6;color:#fff}
.cc-btn-solid:hover{opacity:.9}

.cc-selected{margin-top:18px;padding:12px 16px;background:#0f3327;color:#4ade80;border-radius:11px;font-size:13px;font-weight:600;text-align:center}

@media (max-width:640px){.cc-table th,.cc-table td{padding:11px 10px;font-size:12px}}`,

  js: `function selectPlan(name, btn) {
  var box = document.getElementById('ccSelected');
  box.hidden = false;
  box.textContent = 'You selected the ' + name + ' plan. Continuing to checkout…';

  document.querySelectorAll('.cc-btn').forEach(function (b) { b.disabled = false; });
  btn.disabled = true;

  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}`,

  seo: {
    title: 'Insurance Coverage Comparison Table — Free HTML CSS JS Snippet',
    description: `A three-plan insurance comparison table with a highlighted "most popular" column, checkmark benefits, and pricing. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Insurance Coverage Comparison Table — A Highlighted Plan Table for Coverage Decisions',
      description: `Buying insurance is a spreadsheet decision dressed up as a purchase — people want to line up deductibles, limits, and benefits side by side before they commit. This snippet is a three-plan comparison table (Basic, Standard, Premium) built in plain HTML, CSS, and a sprinkle of vanilla JavaScript, with a visually highlighted "Standard" column, checkmark and dash cells for included benefits, and a selection action per plan.

**A semantic table, not a div grid**

The comparison uses a real \`<table>\` with \`<thead>\`, \`<tbody>\`, and \`<tfoot>\` — row labels down the left, plans across the top. That's deliberate: a genuine table is navigable by screen readers with row/column context, reflows sensibly, and is the correct semantic element for tabular data, unlike a flexbox row of "cards" that only looks like a table.

**The recommended column**

The middle "Standard" column carries a \`.cc-recommended\` class that tints its background, rounds its corners at the top and bottom, and adds a small "Most popular" badge above its header. Because the highlight is applied per-cell via a shared class rather than a separate table, the recommended column's shading lines up perfectly with every row without any extra markup.

**Checkmarks and dashes, not text**

Benefit rows ("Roadside assistance," "Accident forgiveness") use a green ✓ for included and a muted — for excluded, rather than "Yes"/"No" text. This is a scanning optimization: eyes pick out the shape and color of a checkmark column far faster than reading repeated words, which matters when a shopper is comparing six or more benefit rows across three plans.

**Selecting a plan**

Each plan has a "Choose" button in the table footer. Clicking one calls \`selectPlan\`, which shows a confirmation message and disables that button (re-enabling any previously selected one) so only one plan can be "chosen" at a time in this demo — swap the confirmation for a real navigation to checkout in production.

**Responsive without breaking the table**

On narrow viewports, \`.cc-table-scroll\` lets the table scroll horizontally rather than squeezing three price columns into a phone width, which would make numbers unreadable. Padding and font-size shrink slightly under 640px, but the table itself never wraps into cards, keeping row-to-row comparison intact at every width.

Pair this with a [pricing feature table](/ui-snippets/pricing-feature-table/) for SaaS-style plans, an [insurance quote calculator](/ui-snippets/insurance-quote-calculator/) to estimate a premium before comparing, or a [comparison table](/ui-snippets/comparison-table/) for a more general product comparison.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-column plan table renders with Standard highlighted and badged "Most popular".` },
      { title: 'Scan the benefit rows', text: `Green checkmarks and muted dashes show which benefits each plan includes at a glance.` },
      { title: 'Compare pricing', text: `Monthly premium, coverage limit, and deductible are aligned in the top rows for quick comparison.` },
      { title: 'Choose a plan', text: `Click a "Choose" button — a confirmation message appears and that button disables.` },
      { title: 'Resize the window', text: `Below 640px the table scrolls horizontally instead of squeezing columns unreadably.` },
      { title: 'Swap in real plans', text: `Replace the row values and benefit checks with your own plan data.` },
    ] },
    features: [
      { title: 'Real semantic table', text: `Built with thead/tbody/tfoot so screen readers get proper row and column context.` },
      { title: 'Highlighted recommended column', text: `A single .cc-recommended class shades and rounds one column consistently across every row.` },
      { title: 'Most popular badge', text: `A small pill above the recommended header calls out the suggested plan without extra markup.` },
      { title: 'Checkmark benefit cells', text: `Green checks and muted dashes scan far faster than repeated Yes/No text.` },
      { title: 'Per-plan pricing display', text: `Prices get their own larger, bold styling with a muted "/mo" suffix for quick reading.` },
      { title: 'Selectable plans', text: `Choose buttons in the table footer confirm a selection and disable to show the active choice.` },
      { title: 'Horizontal scroll fallback', text: `Narrow viewports scroll the table instead of cramming three columns into unreadable widths.` },
      { title: 'Framework-portable markup', text: `Plain table markup with utility classes drops cleanly into React, Vue, or Tailwind.` },
    ],
    useCases: [
      { title: 'Auto and home insurance plans', text: `The direct use case — compare Basic/Standard/Premium coverage before checkout.` },
      { title: 'Health insurance tiers', text: `Compare HMO/PPO-style tiers with deductible, premium, and network rows.` },
      { title: 'Warranty and protection plans', text: `Reuse the same shape for extended warranty tiers on electronics or appliances.` },
      { title: 'Pairing with a quote flow', text: `Follow an [insurance quote calculator](/ui-snippets/insurance-quote-calculator/) with this table so shoppers can compare the estimate against real plans.` },
      { title: 'SaaS and subscription pricing', text: `The same highlighted-column pattern works for a [pricing feature table](/ui-snippets/pricing-feature-table/).` },
      { title: 'General product comparison', text: `Strip the insurance-specific rows and reuse the structure as a [comparison table](/ui-snippets/comparison-table/) for any tiered product.` },
      { icon: 'CODE', title: 'Related: Table with Scroll Shadow Indicators', desc: 'See the [Table with Scroll Shadow Indicators](/ui-snippets/table-scroll-shadow-indicators/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Formula-Calculated Columns Table', desc: 'See the [Formula-Calculated Columns Table](/ui-snippets/table-formula-calculated-columns/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Table with Sticky Footer Totals Row', desc: 'See the [Table with Sticky Footer Totals Row](/ui-snippets/table-sticky-footer-totals/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use a real table element instead of a CSS grid of cards?', a: `A table gives screen readers native row and column relationships — a user can navigate by "monthly premium, Standard plan" cell by cell. A grid of divs styled to look like a table loses that structure entirely unless you manually add a large set of ARIA table roles, so starting with a real table is simpler and more robust.` },
      { q: 'How do I highlight a different column as recommended?', a: `Move the cc-recommended class from the Standard column's cells to whichever plan you want highlighted — each row's corresponding cell needs the class. Since the highlight is per-cell rather than a separate element, moving it is a find-and-replace on the class name, not a markup restructure.` },
      { q: 'How do I make the Choose buttons actually navigate to checkout?', a: `Replace the confirmation message inside selectPlan with a redirect (window.location.href = '/checkout?plan=' + name) or a router push in your framework. Keep the disabled-button feedback if the button also needs to reflect a selection state before navigation completes.` },
      { q: 'Can I add more benefit rows without breaking the layout?', a: `Yes — each row is an independent tr, so add or remove rows freely. Just remember to add the cc-recommended class to that row's middle cell to keep the highlighted column's shading continuous down the table.` },
      { q: 'How do I use this comparison table in React, Vue, or Angular?', a: `Map an array of plan objects into the table columns and an array of benefit rows into tbody rows, applying the recommended class conditionally based on a plan's "featured" flag. The CSS classes and table structure port unchanged; only the static markup becomes a loop.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to manually trace how the highlight lines up across every row. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why a real semantic table with thead/tbody/tfoot is the right choice here over a flexbox card row, and how applying the cc-recommended class per-cell (rather than wrapping one column in a separate container) keeps the shaded column's background and rounded corners aligned across every row automatically. The same assistant can help you optimize it — ask whether the horizontal-scroll fallback at 640px is the right breakpoint for your typical plan count, or whether the Choose button's disabled-toggle logic should instead drive a visually distinct "selected" row state. It's also useful for extending the effect: ask it to make the table data-driven from a JSON array of plans and benefits, add a toggle between monthly and annual pricing, or add a tooltip explaining each benefit row on hover. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "insurance coverage comparison table" in plain HTML, CSS, and JavaScript with no framework.

Requirements:
- A real semantic HTML table (thead, tbody, tfoot) with row labels in the first column and three plan columns (e.g. Basic, Standard, Premium) as the remaining columns.
- Rows for monthly premium, coverage limit, deductible, and at least four yes/no benefit rows, using a checkmark character for included benefits and a dash character for excluded ones rather than "Yes"/"No" text.
- The middle plan column must be visually highlighted as the recommended option: a tinted background applied to every cell in that column (not just the header), rounded top corners on the header cell and rounded bottom corners on the footer cell of that column, and a small "Most popular" badge shown above that column's plan name.
- A footer row with a "Choose [Plan]" button under each plan column. Clicking a button must show a confirmation message elsewhere on the page naming the chosen plan, and must disable that specific button while re-enabling any other plan's button, so only one plan appears selected at a time.
- On narrow viewports the table must remain a real table (not collapse into stacked cards) — wrap it in a horizontally scrolling container so all three plan columns stay aligned and comparable even on a phone-width screen.
- Use a dark, insurance-dashboard-appropriate color palette with clear visual separation between rows via subtle borders.`,
    },
  },
};

export default coverageComparisonTable;
