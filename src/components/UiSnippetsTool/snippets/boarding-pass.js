const boardingPass = {
  id: 'boarding-pass',
  title: 'Boarding Pass',
  category: 'cards',
  html: `<div class="wrap">
  <div class="pass">
    <div class="pass-main">
      <div class="airline">
        <div class="logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z"/></svg>
        </div>
        <span class="airline-name">Skyward Air</span>
        <span class="flight-class">Business</span>
      </div>
      <div class="route">
        <div class="endpoint">
          <span class="code">SFO</span>
          <span class="city">San Francisco</span>
          <span class="time">08:45</span>
        </div>
        <div class="path">
          <div class="path-line">
            <span class="dot"></span>
            <svg class="plane" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5L22 16z"/></svg>
            <span class="dot"></span>
          </div>
          <span class="duration">5h 30m &middot; Nonstop</span>
        </div>
        <div class="endpoint end">
          <span class="code">JFK</span>
          <span class="city">New York</span>
          <span class="time">17:15</span>
        </div>
      </div>
      <div class="details">
        <div class="detail"><span class="d-label">Passenger</span><span class="d-val">A. MORGAN</span></div>
        <div class="detail"><span class="d-label">Flight</span><span class="d-val">SK 482</span></div>
        <div class="detail"><span class="d-label">Date</span><span class="d-val">14 JUN</span></div>
        <div class="detail"><span class="d-label">Gate</span><span class="d-val hl">B12</span></div>
      </div>
    </div>
    <div class="pass-stub">
      <div class="perforation"></div>
      <div class="stub-content">
        <div class="stub-row"><span class="d-label">Seat</span><span class="d-val big">4A</span></div>
        <div class="stub-row"><span class="d-label">Boarding</span><span class="d-val">08:15</span></div>
        <div class="stub-row"><span class="d-label">Group</span><span class="d-val">1</span></div>
        <div class="barcode">
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <span class="ticket-no">SK482 &middot; ETKT 0142847290</span>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: linear-gradient(135deg,#1e3a8a,#3b82f6); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.wrap { width: 100%; max-width: 720px; }
.pass { display: flex; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.35); }
.pass-main { flex: 1; background: #fff; padding: 28px; }
.airline { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
.logo { width: 34px; height: 34px; background: linear-gradient(135deg,#2563eb,#1e40af); border-radius: 9px; display: flex; align-items: center; justify-content: center; }
.airline-name { font-size: 16px; font-weight: 800; color: #1e293b; }
.flight-class { margin-left: auto; font-size: 11px; font-weight: 700; color: #2563eb; background: rgba(37,99,235,0.1); padding: 4px 12px; border-radius: 20px; letter-spacing: 0.5px; }
.route { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; }
.endpoint { display: flex; flex-direction: column; }
.endpoint.end { align-items: flex-end; }
.code { font-size: 38px; font-weight: 900; color: #0f172a; line-height: 1; letter-spacing: -1px; }
.city { font-size: 12px; color: #94a3b8; margin-top: 4px; }
.time { font-size: 15px; font-weight: 700; color: #475569; margin-top: 8px; }
.path { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 0 18px; }
.path-line { display: flex; align-items: center; width: 100%; gap: 4px; color: #2563eb; }
.path-line .dot { width: 7px; height: 7px; border-radius: 50%; background: #2563eb; flex-shrink: 0; }
.path-line::before, .path-line::after { content: ''; flex: 1; height: 2px; background: repeating-linear-gradient(90deg,#cbd5e1 0,#cbd5e1 4px,transparent 4px,transparent 8px); }
.plane { transform: rotate(0deg); flex-shrink: 0; }
.duration { font-size: 11px; color: #94a3b8; margin-top: 10px; white-space: nowrap; }
.details { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; border-top: 1px dashed #e2e8f0; padding-top: 20px; }
.detail { display: flex; flex-direction: column; gap: 4px; }
.d-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
.d-val { font-size: 14px; font-weight: 700; color: #1e293b; }
.d-val.hl { color: #2563eb; }
.d-val.big { font-size: 26px; }
.pass-stub { width: 220px; background: #2563eb; color: #fff; position: relative; display: flex; align-items: center; }
.perforation { position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: repeating-linear-gradient(180deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 6px,transparent 6px,transparent 12px); }
.pass-stub::before, .pass-stub::after { content: ''; position: absolute; left: -11px; width: 22px; height: 22px; border-radius: 50%; background: #2c4fc4; }
.pass-stub::before { top: -11px; background: linear-gradient(135deg,#1e3a8a,#3b82f6); }
.pass-stub::after { bottom: -11px; background: linear-gradient(135deg,#1e3a8a,#3b82f6); }
.stub-content { padding: 28px 24px; width: 100%; }
.stub-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
.stub-row .d-label { color: rgba(255,255,255,0.6); }
.stub-row .d-val { color: #fff; }
.barcode { display: flex; gap: 2px; height: 52px; align-items: stretch; margin: 20px 0 10px; }
.barcode span { flex: 1; background: #fff; }
.barcode span:nth-child(2n) { flex: 0.5; }
.barcode span:nth-child(3n) { flex: 1.5; }
.barcode span:nth-child(5n) { flex: 0.4; }
.ticket-no { font-size: 9px; color: rgba(255,255,255,0.6); font-family: ui-monospace, monospace; letter-spacing: 0.5px; }
@media (max-width: 560px) { .pass { flex-direction: column; } .pass-stub { width: 100%; } .perforation { left: 0; right: 0; top: 0; bottom: auto; width: auto; height: 2px; background: repeating-linear-gradient(90deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 6px,transparent 6px,transparent 12px); } .pass-stub::before { left: -11px; top: -11px; } .pass-stub::after { left: auto; right: -11px; top: -11px; bottom: auto; } }`,
  js: ``,
  seo: {
    title: 'Boarding Pass Card — Free HTML CSS Snippet',
    description: 'Airline boarding pass UI with flight route, perforated tear-off stub, barcode, and seat details. Pure CSS. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Boarding Pass — Flight Route, Perforated Tear-Off Stub & CSS Barcode',
      description: `A boarding pass card is a high-craft UI piece that appears in travel apps, flight booking confirmations, [event tickets](/ui-snippets/event-card/), and design portfolios. This snippet recreates a realistic airline boarding pass entirely in HTML and CSS: an airline header, a departure-to-arrival route with an animated flight path, passenger and flight details, and a colour-contrasting tear-off stub with a pure-CSS barcode and notched perforation.\n\n**The two-part ticket structure**\n\nThe pass is a flex container split into a white main section and a coloured stub. This mirrors a real boarding pass where the stub is the part torn off and retained at the gate. On narrow screens, a media query stacks the two parts vertically and rotates the perforation to a horizontal tear line — a thoughtful responsive adaptation that keeps the ticket metaphor intact.\n\n**The perforated tear edge**\n\nThe perforation between the two parts is built from a repeating-linear-gradient that creates a dashed dotted line, plus two circular notches punched into the top and bottom of the seam using ::before and ::after pseudo-elements coloured to match the page background. These notches are the visual signature of a tear-off ticket — the same technique used for the [gift card](/ui-snippets/gift-card/) and other coupon designs.\n\n**The flight route visualisation**\n\nThe route shows large three-letter airport codes (SFO, JFK), city names, and times. Between them, a flight path uses a dashed repeating-gradient line with a plane icon centred and a dot at each end. The dashed line evokes a flight trajectory on a map, and the plane sits at the midpoint pointing toward the destination.\n\n**The pure-CSS barcode**\n\nThe barcode is a row of span elements with varying flex widths driven by nth-child selectors (every 2nd, 3rd, and 5th bar gets a different width). This produces an irregular, realistic barcode pattern without any image or library. It is decorative here, but in production you would replace it with a real scannable code from the [QR code generator](/ui-snippets/qr-code-generator/).\n\n**Typography and detail hierarchy**\n\nThe design uses a clear hierarchy: oversized airport codes anchor the eye, uppercase micro-labels (Passenger, Flight, Gate) sit above their values, and the gate number is highlighted in the brand blue. font-weight and size contrast carry the information architecture, a technique that makes dense ticket data scannable at a glance.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Update the flight details', text: 'Edit the airport codes (SFO, JFK), city names, departure and arrival times, and the duration text to match your flight.' },
      { title: 'Set passenger and gate info', text: 'Change the Passenger name, Flight number, Date, and Gate in the details grid. The gate uses a highlighted blue style to draw attention.' },
      { title: 'Edit the stub', text: 'Update the Seat, Boarding time, and Group on the coloured stub. The seat number uses an oversized style as the most important stub value.' },
      { title: 'Brand the pass', text: 'Change the airline name and logo, and recolour the stub and accents by editing the brand blue values. The gradient page background can match your brand too.' },
      { title: 'Add a real barcode', text: 'Replace the decorative CSS barcode with a real one — generate a Code128 or QR code from the ticket number using a library like JsBarcode or qrcode, and insert the resulting image or canvas in place of the span bars.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component that accepts a flight prop object. Click "Vue" for a Vue 3 SFC. Click "Tailwind" for a React + Tailwind version.' },
    ]},
    features: ['Two-part ticket: white main section plus coloured tear-off stub','Perforated seam with repeating-gradient dashes and circular notches','Flight route with dashed path line, plane icon, and endpoint dots','Oversized three-letter airport codes for clear visual anchoring','Pure-CSS barcode using nth-child flex-width variation','Highlighted gate number and oversized seat for scannable hierarchy','Responsive: stacks vertically with a horizontal tear line on mobile','Zero JavaScript and no images — entirely HTML and CSS'],
    useCases: [
      { icon: 'APP', title: 'Travel and airline app digital boarding pass', desc: 'Render a passenger\'s boarding pass from booking data in a flight app. Replace the decorative barcode with a real scannable Aztec or QR code that gate scanners can read. Add Apple Wallet and Google Wallet pass generation so travellers can save it to their phone\'s native wallet.' },
      { icon: 'CHART', title: 'Booking confirmation and itinerary email', desc: 'Show the boarding pass card on a post-purchase confirmation page or in a transactional email. The familiar ticket format reassures travellers that their booking is confirmed and surfaces the key details — gate, seat, boarding time — in a single scannable card.' },
      { icon: 'DESIGN', title: 'Event ticket and concert pass adaptation', desc: 'The tear-off ticket structure adapts directly to event tickets: replace airports with venue and section, the flight path with an event date band, and the stub with seat row and entry gate. The perforation and barcode metaphors are identical to physical event tickets.' },
      { icon: 'FLOW', title: 'Travel portfolio and design showcase piece', desc: 'Designers use boarding pass recreations to demonstrate CSS skill — the perforation notches, barcode, and route visualisation are non-trivial pure-CSS effects. It makes a strong portfolio centrepiece that shows attention to real-world detail.' },
      { icon: 'LEARN', title: 'Study advanced CSS: notches, dashed seams, and barcodes', desc: 'The snippet is a compact lesson in CSS techniques: punching circular notches with pseudo-elements, building dashed tear lines with repeating-linear-gradient, and faking a barcode with nth-child flex widths. These transfer to coupons, tickets, receipts, and any cut-out card design.' },
      { icon: 'CODE', title: 'Loyalty card or membership pass template', desc: 'Repurpose as a digital loyalty or membership card: the main section holds the member name and tier, the stub holds a member ID and barcode. The premium, physical-ticket aesthetic elevates a simple membership card into something that feels valuable and tangible.' },
      { icon: 'CODE', title: 'Related: Direction-Aware Hover', desc: 'See the [Direction-Aware Hover](/ui-snippets/direction-aware-hover/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the perforated tear edge created?', a: 'Two techniques combine. The dashed line down the seam is a repeating-linear-gradient that alternates a visible colour and transparent every few pixels, producing a dotted perforation. The circular notches at the top and bottom of the seam are ::before and ::after pseudo-elements on the stub: each is a circle (border-radius: 50%) positioned half-off the left edge and filled with the same colour as the page background, so they read as holes punched into the ticket. Together they recreate the look of a real tear-off stub.' },
      { q: 'Is the barcode functional or decorative?', a: 'It is decorative — a row of span bars with varying widths set by nth-child rules to look like a real barcode without any image. For a scannable boarding pass, replace it with a genuine code generated from the ticket data: use JsBarcode for a Code128 barcode or the qrcode library for a QR code, rendering to a canvas or SVG. Airlines typically use the Aztec or PDF417 2D formats for boarding passes, which encode the full IATA BCBP data string.' },
      { q: 'How does the boarding pass adapt to mobile?', a: 'A media query at 560px switches the flex direction from row to column, so the stub drops below the main section instead of sitting beside it. The perforation, originally a vertical line, is rotated to a horizontal repeating-gradient across the new seam, and the two circular notches are repositioned to the left and right of the top edge. This keeps the tear-off ticket metaphor intact on narrow screens where a side-by-side layout would be too cramped.' },
      { q: 'How do I use this as a React component?', a: 'Accept a flight prop object: { airline, class, from: {code, city, time}, to: {code, city, time}, duration, passenger, flightNo, date, gate, seat, boarding, group, ticketNo }. Render the static markup from those values. For a real barcode, render a Barcode component (from react-barcode or similar) passing the ticket number. Generate Wallet passes server-side and offer Add to Wallet buttons alongside the visual card.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer the notch-and-perforation trick by squinting at the CSS. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how the pass-stub::before and ::after pseudo-elements combine with the repeating-linear-gradient perforation to fake a torn ticket edge, or why those notches are filled with the page background color rather than white. The same assistant can help optimize it — asking whether the four separate nth-child rules driving the barcode's flex widths could be generated procedurally instead of hardcoded, or how to keep the layout stable if the airport code text is much longer. It's also a good way to extend the design: ask it to wire in a real scannable barcode or QR code, animate the plane icon along the dashed path, or add a boarding-status state that changes the stub color. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an airline "boarding pass" card in plain HTML and CSS only, no JavaScript, no images, no icon fonts.

Requirements:
- A two-part ticket: a wider white main section and a narrower colored stub, laid out side by side with flexbox, that stack vertically on narrow screens via a media query.
- A perforated seam between the two parts made from a repeating-linear-gradient that produces a dashed line, plus two circular pseudo-elements (::before and ::after) positioned half outside the seam edge and filled with the page's background color, so they read as punched-out notches rather than solid circles.
- When the layout stacks vertically on mobile, the perforation must rotate from a vertical dashed line to a horizontal one, and the two notch circles must reposition to the top-left and top-right corners of the new seam instead of top and bottom.
- A route section showing large origin and destination airport codes, city names, and times, connected by a dashed flight-path line built with repeating-linear-gradient on a pseudo-element, with a small icon centered on the path and a dot at each end.
- A details grid below the route showing passenger name, flight number, date, and a visually highlighted gate value in a different color than the other fields.
- On the stub: a large seat number, boarding time, group number, and a fake barcode made from a row of plain span elements whose widths vary using nth-child selectors (so every second, third, and fifth bar has a different flex width) to look like an irregular real barcode without any image or canvas.`,
    },
  },
};

export default boardingPass;
