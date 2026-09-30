const invoicePreview = {
  id: 'invoice-preview',
  title: 'Invoice Preview',
  category: 'cards',
  html: `<div class="page">
  <div class="invoice">
    <div class="inv-head">
      <div class="inv-brand">
        <div class="logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#6366f1"/><path d="M8 20L14 8l6 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 16h8" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>
          <span class="brand-name">Acme Studio</span>
        </div>
        <div class="inv-meta">
          <div class="inv-badge">INVOICE</div>
          <div class="inv-num">#INV-2024-089</div>
        </div>
      </div>
      <div class="inv-dates">
        <div class="date-row"><span class="date-label">Issue Date</span><span class="date-val">June 1, 2024</span></div>
        <div class="date-row"><span class="date-label">Due Date</span><span class="date-val due">June 15, 2024</span></div>
        <div class="date-row"><span class="date-label">Status</span><span class="status-chip">Unpaid</span></div>
      </div>
    </div>
    <div class="parties">
      <div class="party">
        <div class="party-label">From</div>
        <div class="party-name">Acme Studio</div>
        <div class="party-detail">hello@acmestudio.co</div>
        <div class="party-detail">San Francisco, CA 94105</div>
        <div class="party-detail">Tax ID: US-98765432</div>
      </div>
      <div class="party">
        <div class="party-label">Bill To</div>
        <div class="party-name">TechFlow Inc.</div>
        <div class="party-detail">billing@techflow.io</div>
        <div class="party-detail">Austin, TX 78701</div>
        <div class="party-detail">PO: PO-2024-0041</div>
      </div>
    </div>
    <table class="items-table">
      <thead>
        <tr>
          <th class="th-desc">Description</th>
          <th class="th-num">Qty</th>
          <th class="th-num">Rate</th>
          <th class="th-num">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr class="item-row">
          <td>
            <div class="item-title">UI Design — Dashboard Screens</div>
            <div class="item-sub">Figma, 12 screens, 2 rounds of revision</div>
          </td>
          <td class="num">1</td>
          <td class="num">$3,200.00</td>
          <td class="num bold">$3,200.00</td>
        </tr>
        <tr class="item-row">
          <td>
            <div class="item-title">Frontend Development</div>
            <div class="item-sub">React + Tailwind, component library integration</div>
          </td>
          <td class="num">40 hr</td>
          <td class="num">$95.00</td>
          <td class="num bold">$3,800.00</td>
        </tr>
        <tr class="item-row">
          <td>
            <div class="item-title">Monthly Maintenance</div>
            <div class="item-sub">May 2024 — bug fixes, updates, monitoring</div>
          </td>
          <td class="num">1</td>
          <td class="num">$450.00</td>
          <td class="num bold">$450.00</td>
        </tr>
      </tbody>
    </table>
    <div class="totals-wrap">
      <div class="totals">
        <div class="tot-row"><span>Subtotal</span><span>$7,450.00</span></div>
        <div class="tot-row"><span>Tax (8%)</span><span>$596.00</span></div>
        <div class="tot-row"><span>Discount</span><span class="discount">&#x2212;$200.00</span></div>
        <div class="tot-final"><span>Total Due</span><span>$7,846.00</span></div>
      </div>
    </div>
    <div class="inv-footer">
      <div class="note">
        <div class="note-label">Payment Terms</div>
        <div class="note-text">Payment due within 14 days. Bank transfer or PayPal accepted. Late payments may incur a 2% monthly fee.</div>
      </div>
      <div class="bank">
        <div class="note-label">Bank Details</div>
        <div class="note-text">Bank: Chase &nbsp;&middot;&nbsp; Account: 0042-8812-09 &nbsp;&middot;&nbsp; Routing: 021000021</div>
      </div>
    </div>
    <div class="inv-bottom">
      <span>Thank you for your business!</span>
      <button class="print-btn" onclick="window.print()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print / Save PDF
      </button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; min-height: 100vh; padding: 32px 20px; display: flex; justify-content: center; }
.page { width: 100%; }
.invoice { background: #fff; border-radius: 16px; max-width: 720px; margin: 0 auto; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
.inv-head { background: #f8fafc; padding: 28px 32px; border-bottom: 1px solid #e2e8f0; }
.inv-brand { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; }
.logo { display: flex; align-items: center; gap: 10px; }
.brand-name { font-size: 18px; font-weight: 800; color: #1e293b; }
.inv-meta { text-align: right; }
.inv-badge { font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #6366f1; background: rgba(99,102,241,0.08); border-radius: 6px; padding: 3px 8px; display: inline-block; margin-bottom: 4px; }
.inv-num { font-size: 14px; font-weight: 600; color: #475569; }
.inv-dates { display: flex; gap: 24px; flex-wrap: wrap; }
.date-row { display: flex; flex-direction: column; gap: 3px; }
.date-label { font-size: 10px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.date-val { font-size: 13px; font-weight: 600; color: #334155; }
.date-val.due { color: #ef4444; }
.status-chip { display: inline-block; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
.parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 24px 32px; border-bottom: 1px solid #f1f5f9; }
.party-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
.party-name { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.party-detail { font-size: 12px; color: #64748b; line-height: 1.7; }
.items-table { width: 100%; border-collapse: collapse; padding: 0 32px; display: table; }
.items-table { padding: 0; }
.items-table th, .items-table td { padding: 12px 16px; }
.items-table thead tr { border-bottom: 2px solid #f1f5f9; }
.th-desc { text-align: left; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; padding-left: 32px; }
.th-num { text-align: right; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; padding-right: 32px; }
.item-row { border-bottom: 1px solid #f8fafc; }
.item-row td:first-child { padding-left: 32px; }
.item-row td:last-child { padding-right: 32px; }
.item-title { font-size: 14px; font-weight: 600; color: #1e293b; }
.item-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
.num { text-align: right; font-size: 14px; color: #475569; font-variant-numeric: tabular-nums; }
.num.bold { font-weight: 700; color: #1e293b; }
.totals-wrap { display: flex; justify-content: flex-end; padding: 20px 32px; border-bottom: 1px solid #f1f5f9; }
.totals { width: 240px; display: flex; flex-direction: column; gap: 8px; }
.tot-row { display: flex; justify-content: space-between; font-size: 13px; color: #64748b; }
.discount { color: #16a34a; }
.tot-final { display: flex; justify-content: space-between; font-size: 17px; font-weight: 800; color: #1e293b; padding-top: 10px; border-top: 2px solid #e2e8f0; margin-top: 4px; }
.inv-footer { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 20px 32px; border-bottom: 1px solid #f1f5f9; background: #fafafa; }
.note-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
.note-text { font-size: 12px; color: #64748b; line-height: 1.6; }
.inv-bottom { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; }
.inv-bottom span { font-size: 13px; color: #94a3b8; font-style: italic; }
.print-btn { display: flex; align-items: center; gap: 6px; background: #1e293b; color: #fff; border: none; padding: 9px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.print-btn:hover { background: #0f172a; }
@media print { body { background: #fff; padding: 0; } .invoice { box-shadow: none; border-radius: 0; } .print-btn { display: none; } }`,
  js: ``,
  seo: {
    title: 'Invoice Preview UI — Free HTML CSS Snippet',
    description: 'Printable invoice card with line items table, tax, discount, totals, payment terms, and PDF print button. Exports to React, Vue & Angular.',
    about: {
      title: 'Invoice Preview — Line Items Table, Tax, Discount, Totals, and Print to PDF',
      description: `An invoice preview component is a fundamental element in any freelance tool, SaaS billing system, or e-commerce back office — at checkout, it is preceded by the [order summary](/ui-snippets/order-summary/). This snippet renders a complete print-ready invoice document with a branded header, from/to party addresses, a multi-column line items table with description, quantity, rate, and amount columns, a totals block with subtotal, tax, discount, and total due, a payment terms + bank details footer, and a Print / Save PDF button that calls window.print().\n\n**The layout structure**\n\nThe invoice is a single white-background .invoice container with max-width 720px — the standard printable content width. It is divided into semantic sections: .inv-head (brand + invoice number + dates), .parties grid, .items-table, .totals-wrap, .inv-footer (payment terms + bank), and .inv-bottom (thank-you + print button). Each section has a border-bottom: 1px solid separator.\n\n**The line items table**\n\nThe items use a standard HTML table (not CSS Grid) for semantic correctness and natural column alignment — make the rows editable with the [editable table](/ui-snippets/editable-table/) pattern. The Qty, Rate, and Amount columns use text-align: right with padding-right: 32px to align numbers with the invoice edges. font-variant-numeric: tabular-nums on numeric cells prevents amount digits from jumping as values change.\n\n**Print to PDF via window.print()**\n\nThe Print button calls window.print(). A @media print CSS block hides the button and removes the background and border-radius from the invoice container, producing a clean white printed document. Users can Save as PDF from the browser print dialog. For programmatic PDF generation, use libraries like jsPDF or Puppeteer.\n\n**The totals block**\n\nThe totals are right-aligned in a 240px-wide column (matching the Amount column width). Subtotal, Tax (8%), and Discount rows use the same flex justify-content: space-between pattern. The Total Due row uses a bold font and a border-top separator to visually separate it from the line items.\n\n**Dynamic totals with JavaScript**\n\nTo compute totals from the line items dynamically, iterate all item rows and extract qty and rate values: const rows = document.querySelectorAll(".item-row"); let subtotal = 0; rows.forEach(row => { const qty = parseFloat(row.querySelector(".item-qty").textContent) || 0; const rate = parseFloat(row.querySelector(".item-rate").textContent.replace(/[^0-9.]/g, "")) || 0; subtotal += qty * rate; }). Then compute tax as subtotal * TAX_RATE and discount as a fixed value or percentage. Write results to the .totals span elements. This approach makes the invoice fully dynamic — add or remove rows and the totals recalculate automatically.\n\n**Programmatic PDF generation beyond window.print()**\n\nFor more control over the PDF output — custom page size, headers, footers, or watermarks — use a server-side approach with Puppeteer or headless Chrome: render the invoice HTML on the server, call page.pdf({ format: "A4", printBackground: true }) and stream the result as a PDF download. Client-side alternatives include jsPDF with html2canvas (converts the DOM to a canvas then to PDF) or the PDF.js render pipeline. For invoices requiring digital signatures, use a PDF library that supports PDF/A format and signature fields such as pdf-lib on Node.js.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Update the invoice details', text: 'Edit the brand name, logo SVG, invoice number (#INV-2024-089), issue date, due date, and status chip. Change the From and Bill To party names, emails, and addresses.' },
      { title: 'Edit the line items', text: 'Each .item-row in the table contains a description, subtitle, qty, rate, and amount. Update these values. To add a new line, duplicate an .item-row and update its content.' },
      { title: 'Update the totals', text: 'Edit the Subtotal, Tax (change the rate label and value), Discount, and Total Due values in the .totals block. These are hardcoded strings — for a dynamic invoice, compute them with JS from the items array.' },
      { title: 'Print or save as PDF', text: 'Click the Print / Save PDF button. In the browser print dialog, select "Save as PDF" as the destination. The @media print CSS hides the button and removes decorative styles for a clean printout.' },
      { title: 'Make totals dynamic', text: 'Replace the static totals with JS: read qty and rate from each row, compute line amounts and subtotal, apply tax rate and discount, and write the results to the .totals span elements.' },
      { title: 'Export for your framework', text: 'Click "JSX" to download a React InvoicePreview component that accepts an invoice prop object. Click "Vue" for a Vue 3 SFC. The JSX version separates the line items into a LineItem sub-component.' },
    ]},
    features: ['Semantic HTML table for line items with correct column alignment','text-align: right + padding-right on numeric columns for clean alignment','font-variant-numeric: tabular-nums on amount cells for stable digit width','@media print: hides button, removes background and border-radius for clean PDF output','From/Bill To parties in 2-column CSS Grid','Totals block with subtotal, tax, discount, and Total Due row','Status chip (Unpaid/Paid/Overdue) with color-coded background','window.print() PDF generation: no library dependency for basic use'],
    useCases: [
      { icon: 'APP', title: 'Freelance invoice generator and PDF export', desc: 'Pair with webdevpuneet.com\' own invoice generator. Accept invoice data as a prop object, render this component in a modal or full page, and call window.print() to save as PDF. Connect to localStorage to persist draft invoices.' },
      { icon: 'DESIGN', title: 'SaaS billing portal invoice history view', desc: 'Render a list of historical invoices in a billing dashboard. Each invoice row in the list navigates to this invoice preview page. The Print button lets users download any past invoice as a PDF for their expense records.' },
      { icon: 'FLOW', title: 'E-commerce order confirmation and receipt display', desc: 'Adapt the line items table to show ordered products instead of services. Replace the Rate column with Unit Price. Remove Tax and Discount if not applicable. The parties section becomes Shipped To and Order Number.' },
      { icon: 'CODE', title: 'Generate dynamic invoices from a database', desc: 'Fetch invoice data from an API endpoint (/api/invoices/:id) and populate the component props. Compute subtotal with items.reduce((sum, i) => sum + i.qty * i.rate, 0). Apply tax and discount multipliers. Display the formatted Total Due.' },
      { icon: 'LEARN', title: 'Study print CSS and @media print techniques', desc: 'The @media print block demonstrates standard print CSS patterns: hiding interactive elements (buttons, navigation), removing backgrounds and shadows, and setting max-width for printable content. This technique works for any printable UI — receipts, reports, certificates, and PDFs.' },
      { icon: 'CHART', title: 'Contract and proposal preview alongside invoice', desc: 'Use the same card layout for a project proposal template: replace the line items table with a scope-of-work list, remove the bank details, and change the footer to a signature block. The same print CSS makes proposals saveable as PDFs.' },
      { icon: 'CODE', title: 'Related: Text Selection Highlight & Comment', desc: 'See the [Text Selection Highlight & Comment](/ui-snippets/text-selection-annotation/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I save the invoice as a PDF?', a: 'Click the Print / Save PDF button (or press Ctrl+P / Cmd+P). In the browser print dialog, set the Destination to "Save as PDF". The @media print CSS removes the background, border-radius, and button so the PDF looks like a clean white document.' },
      { q: 'How do I compute totals dynamically from the line items?', a: 'Read each row: const items = [...document.querySelectorAll(".item-row")].map(r => ({ qty: parseFloat(r.cells[1].textContent), rate: parseFloat(r.cells[2].textContent.replace(/[^0-9.]/g,"")) })); const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0); Then apply taxRate and discount to compute the total.' },
      { q: 'How do I use this in React?', a: 'Build an InvoicePreview component that accepts an invoice prop: { number, issueDate, dueDate, from, to, items[], taxRate, discount }. Compute subtotal with items.reduce((sum, i) => sum + i.qty * i.rate, 0). Apply tax as subtotal * taxRate and subtract the discount. Map items to table row elements. The print button calls window.print() directly — no extra library needed for basic PDF output. For a print preview mode, render the InvoicePreview inside a React Portal in a separate div with print-only CSS (@media not print { display: none }) so the preview can be shown in a modal on screen while the rest of the app remains hidden when the user triggers print.' },
      { q: 'Does this snippet need JavaScript?', a: 'No — the invoice is pure HTML and CSS. The line items, dates, and totals are static markup, which is exactly what you want when the invoice is a render target: your server template or framework loops real line items into the rows and prints computed totals into the summary cells. Because there is no runtime dependency, the same markup works in a print stylesheet, a PDF renderer like Puppeteer or wkhtmltopdf, and an email-safe variant with inlined styles. The React, Vue, and Angular exports give you the component shell to feed props into.' },
      { q: 'How do I customise the branding and accent colour?', a: 'The logo is an inline SVG next to a .brand-name span — swap the SVG paths for your own mark (keep it around 28×28 with a rounded rect background) and edit the name text. The indigo accent used on the logo, the INVOICE badge, and the totals highlight is a hex value repeated in the CSS, so a find-and-replace on it rebrands the whole document; move it into a CSS custom property like --inv-accent if you theme invoices per client.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to work out every column alignment rule by inspection. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why font-variant-numeric: tabular-nums is applied to the numeric table cells and what would visually break in the totals column without it, or why the totals block is deliberately built at 240px to match the Amount column rather than spanning the full width. The same assistant is useful for optimizing it, for example checking whether the static markup and the print stylesheet still hold up once line items are generated dynamically from an array of dozens of rows. It is just as good for extending the invoice, such as wiring the Subtotal, Tax, and Total Due values to compute live from the item rows instead of being hardcoded strings, adding a currency selector, or generating the PDF server-side with Puppeteer instead of relying on window.print(). Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a printable "invoice preview" document in plain HTML and CSS, with only enough JavaScript to trigger printing — no PDF library required for the basic version.

Requirements:
- A single card container capped at a print-friendly max-width (around 720px), containing a header with a logo, brand name, an INVOICE badge, an invoice number, and issue/due dates plus a status chip.
- A two-column From and Bill To section using CSS Grid, each showing a party name, email, and address lines.
- A real semantic HTML table (not CSS Grid or flex rows) for line items, with Description, Qty, Rate, and Amount columns. The numeric columns must be right-aligned and use font-variant-numeric: tabular-nums so digits do not shift width as values change.
- A totals block, right-aligned and matching the Amount column's width, listing Subtotal, Tax, and Discount rows, then a visually distinct Total Due row with a top border and bolder weight separating it from the rest.
- A footer with payment terms text and bank transfer details, followed by a bottom bar with a thank-you message and a Print / Save PDF button that calls window.print().
- A @media print stylesheet block that removes the page background, drops the card's shadow and border radius so it prints as a flush white document, and hides the print button entirely so it never appears in the output.`,
    },
  },
};

export default invoicePreview;
