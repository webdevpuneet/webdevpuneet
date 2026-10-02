const jspdfCertificateGenerator = {
  id: 'jspdf-certificate-generator',
  title: 'jsPDF Certificate Generator with Custom Script Font',
  lastmod: '2026-09-25',
  category: 'tools',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/jspdf@4.2.1/dist/jspdf.umd.min.js',
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js',
  ],
  html: `<div class="jcg">
  <form class="jcg-form" id="jcgForm" autocomplete="off">
    <h2>Certificate of completion</h2>
    <label>Recipient name <input name="name" value="Amara Okafor" maxlength="40"></label>
    <label>Course <input name="course" value="Advanced Accessible Interfaces" maxlength="60"></label>
    <div class="jcg-row">
      <label>Date <input name="date" type="date" value="2026-09-25"></label>
      <label>Hours <input name="hours" type="number" min="1" max="500" value="24"></label>
    </div>
    <label>Signed by <input name="signer" value="Dr. Lena Park, Programme Lead" maxlength="50"></label>
    <fieldset class="jcg-theme">
      <legend>Theme</legend>
      <label><input type="radio" name="theme" value="navy" checked> Navy &amp; gold</label>
      <label><input type="radio" name="theme" value="forest"> Forest</label>
      <label><input type="radio" name="theme" value="plum"> Plum</label>
    </fieldset>
    <button type="button" id="jcgDownload">Download PDF</button>
    <p class="jcg-status" id="jcgStatus" role="status">Loading script font…</p>
  </form>
  <div class="jcg-preview"><canvas id="jcgCanvas" aria-label="Rendered certificate PDF"></canvas></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f5f5f4;color:#1c1917;min-height:100vh;padding:20px}
.jcg{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:320px minmax(0,1fr);gap:18px;align-items:start}
@media (max-width:860px){.jcg{grid-template-columns:1fr}}
.jcg-form{background:#fff;border:1px solid #e7e5e4;border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:10px}
.jcg-form h2{font-size:16px}
.jcg label{display:flex;flex-direction:column;gap:4px;font-size:11px;font-weight:700;color:#57534e}
.jcg input[type=text],.jcg input:not([type]),.jcg input[type=date],.jcg input[type=number]{font:500 13px system-ui;border:1px solid #d6d3d1;border-radius:8px;padding:7px 9px;width:100%}
.jcg-row{display:grid;grid-template-columns:1fr 90px;gap:8px}
.jcg-theme{border:1px solid #e7e5e4;border-radius:10px;padding:8px 10px;display:flex;gap:12px;flex-wrap:wrap}
.jcg-theme legend{font-size:11px;font-weight:700;color:#57534e;padding:0 4px}
.jcg-theme label{flex-direction:row;align-items:center;gap:5px;font-weight:600;color:#1c1917}
.jcg :focus-visible{outline:2px solid #b45309;outline-offset:1px}
#jcgDownload{border:0;border-radius:10px;background:#1c1917;color:#fff;font:700 13px system-ui;padding:10px;cursor:pointer}
.jcg-status{font-size:12px;color:#78716c}
.jcg-preview{background:#d6d3d1;border-radius:16px;padding:16px}
#jcgCanvas{width:100%;height:auto;display:block;background:#fff;box-shadow:0 10px 28px rgba(28,25,23,.2)}`,

  js: `pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

var FONT_URL = 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/greatvibes/GreatVibes-Regular.ttf';
var THEMES = {
  navy:   { ink: [23, 37, 84],  accent: [180, 140, 60] },
  forest: { ink: [20, 83, 45],  accent: [161, 98, 7] },
  plum:   { ink: [88, 28, 135], accent: [190, 120, 150] },
};
var scriptFont = null; // base64 TTF once loaded
var form = document.getElementById('jcgForm');
var statusEl = document.getElementById('jcgStatus');

// jsPDF's 14 built-in fonts are fine for body text, but a certificate name
// wants a script face. Custom fonts must be TrueType, added to jsPDF's
// virtual file system as base64, then registered under a name.
function toBase64(buffer) {
  var bytes = new Uint8Array(buffer), bin = '', chunk = 0x8000;
  for (var i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return btoa(bin);
}
fetch(FONT_URL)
  .then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
  .then(function (buf) { scriptFont = toBase64(buf); statusEl.textContent = 'Script font embedded (' + Math.round(buf.byteLength / 1024) + ' KB TTF).'; preview(); })
  .catch(function () { statusEl.textContent = 'Could not load the script font — using Times Italic instead.'; preview(); });

function build() {
  var f = new FormData(form);
  var t = THEMES[f.get('theme')] || THEMES.navy;
  var doc = new jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  var W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), cx = W / 2;

  if (scriptFont) {
    doc.addFileToVFS('GreatVibes-Regular.ttf', scriptFont);
    doc.addFont('GreatVibes-Regular.ttf', 'GreatVibes', 'normal');
  }

  // Double border: a thick outer frame and a thin inner rule.
  doc.setDrawColor.apply(doc, t.ink);
  doc.setLineWidth(2.2);
  doc.rect(8, 8, W - 16, H - 16);
  doc.setDrawColor.apply(doc, t.accent);
  doc.setLineWidth(0.6);
  doc.rect(13, 13, W - 26, H - 26);
  // Corner ornaments
  [[13, 13], [W - 13, 13], [13, H - 13], [W - 13, H - 13]].forEach(function (p) {
    doc.setFillColor.apply(doc, t.accent);
    doc.circle(p[0], p[1], 2.2, 'F');
  });

  doc.setTextColor.apply(doc, t.accent);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  // align:'center' measures the text WITHOUT character spacing, so spaced
  // text drifts right. Centre it by hand: width + spacing between letters.
  var heading = 'CERTIFICATE OF COMPLETION', spacing = 1.6;
  var headingWidth = doc.getTextWidth(heading) + spacing * (heading.length - 1);
  doc.setCharSpace(spacing);
  doc.text(heading, cx - headingWidth / 2, 40);
  doc.setCharSpace(0);

  doc.setTextColor(87, 83, 78);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('This certifies that', cx, 60, { align: 'center' });

  // The name, in the embedded script font, shrunk to fit if it's long.
  var name = String(f.get('name') || 'Recipient');
  doc.setTextColor.apply(doc, t.ink);
  if (scriptFont) doc.setFont('GreatVibes', 'normal'); else doc.setFont('times', 'italic');
  var size = 54;
  doc.setFontSize(size);
  while (doc.getTextWidth(name) > W - 80 && size > 24) { size -= 2; doc.setFontSize(size); }
  doc.text(name, cx, 88, { align: 'center' });
  doc.setDrawColor.apply(doc, t.accent);
  doc.setLineWidth(0.4);
  doc.line(cx - 80, 94, cx + 80, 94);

  doc.setTextColor(87, 83, 78);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('has successfully completed', cx, 108, { align: 'center' });
  doc.setTextColor.apply(doc, t.ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(doc.splitTextToSize(String(f.get('course') || ''), W - 90), cx, 120, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(87, 83, 78);
  doc.text(String(f.get('hours') || 0) + ' hours of instruction', cx, 136, { align: 'center' });

  // Footer: date on the left, signature on the right, seal in the middle.
  var d = f.get('date') ? new Date(f.get('date') + 'T00:00:00') : new Date();
  var dateText = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.setDrawColor(168, 162, 158);
  doc.line(40, H - 42, 110, H - 42);
  doc.line(W - 110, H - 42, W - 40, H - 42);
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text(dateText, 75, H - 46, { align: 'center' });
  if (scriptFont) { doc.setFont('GreatVibes', 'normal'); doc.setFontSize(22); } else { doc.setFont('times', 'italic'); doc.setFontSize(16); }
  doc.text(String(f.get('signer') || '').split(',')[0], W - 75, H - 46, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 113, 108);
  doc.text('Date', 75, H - 36, { align: 'center' });
  doc.text(String(f.get('signer') || ''), W - 75, H - 36, { align: 'center' });

  doc.setFillColor.apply(doc, t.accent);
  doc.circle(cx, H - 44, 13, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.5);
  doc.circle(cx, H - 44, 10.5);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('VERIFIED', cx, H - 43, { align: 'center' });
  doc.setFontSize(6);
  doc.text(String(d.getFullYear()), cx, H - 39, { align: 'center' });
  return doc;
}

var canvas = document.getElementById('jcgCanvas');
var token = 0;
async function preview() {
  var my = ++token;
  var bytes = build().output('arraybuffer');
  // PDF.js detaches the buffer it receives, so hand it a copy.
  var pdf = await pdfjsLib.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;
  var page = await pdf.getPage(1);
  if (my !== token) { pdf.destroy(); return; }
  var scale = (canvas.clientWidth || 700) / page.getViewport({ scale: 1 }).width * (window.devicePixelRatio || 1);
  var vp = page.getViewport({ scale: scale });
  canvas.width = vp.width; canvas.height = vp.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
  pdf.destroy();
}

var timer;
form.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(preview, 250); });
form.addEventListener('change', function () { clearTimeout(timer); timer = setTimeout(preview, 50); });
document.getElementById('jcgDownload').addEventListener('click', function () {
  var name = String(new FormData(form).get('name') || 'certificate').trim().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/gi, '');
  build().save('certificate-' + (name || 'recipient') + '.pdf');
  statusEl.textContent = 'Saving the PDF — if nothing downloads, open this demo in its own tab (sandboxed previews block downloads).';
});`,

  seo: {
    title: 'jsPDF Certificate Generator with Custom Script Font — Free Snippet',
    description: `Generate printable landscape certificates as real PDFs in the browser with jsPDF: an embedded Google script font for the name, auto-shrinking text, decorative borders, a seal, three colour themes and a live PDF.js preview. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'jsPDF Certificates — Custom Fonts, Fitted Text and Print-Ready Layout',
      description: `Course platforms, workshops and HR tools all eventually need to hand out certificates. Generating them in the browser keeps personal data on the user's device and needs no rendering server. This snippet builds a landscape A4 certificate with jsPDF and previews the actual PDF with PDF.js as you type.

**Embedding a custom font**

jsPDF ships with 14 standard fonts, none of them script faces. To use another font it must be TrueType (.ttf, not WOFF), converted to base64, added to jsPDF's virtual file system with \`addFileToVFS\`, and registered with \`addFont(file, name, style)\`. After that \`setFont('GreatVibes', 'normal')\` works like any built-in font. The TTF is fetched once and reused for every re-render. If the fetch fails, the certificate falls back to Times Italic rather than breaking.

**Base64 without blowing the stack**

\`String.fromCharCode.apply\` with a 450 KB array exceeds the maximum argument count, so the conversion processes the bytes in 32 KB chunks before calling \`btoa\`.

**Text that always fits**

Names vary wildly in length. The generator measures the name with \`getTextWidth\` and steps the font size down until it fits the available width, with a minimum size. Long course titles wrap with \`splitTextToSize\` and centre with \`{ align: 'center' }\`.

**Layout in millimetres**

Every element is positioned in millimetres on a 297 × 210 mm page, so the certificate prints at exactly the size you design. Borders are two rectangles with different line widths, and the seal is two concentric circles with small caps text. \`setCharSpace\` spaces out the heading letters — and because \`align: 'center'\` ignores that spacing, the heading is centred by hand from its measured width plus the added space.

**Themes**

Three colour themes change the ink and accent colours, applied through \`setDrawColor\`, \`setFillColor\` and \`setTextColor\` with RGB arrays.

**Downloads in sandboxes**

Sandboxed iframes block downloads, so the status line tells users to open the demo in its own tab if nothing is saved.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load jsPDF and PDF.js', text: `Both from the CDN; the script font is fetched at startup.` },
      { title: 'Fill in the details', text: `Name, course, date, hours and signer; the preview follows.` },
      { title: 'Try a long name', text: `The font size shrinks to keep it inside the border.` },
      { title: 'Pick a theme', text: `Navy and gold, forest or plum.` },
      { title: 'Download', text: `Saves a print-ready landscape A4 PDF.` },
    ] },
    features: [
      { title: 'Custom TTF embedding', text: `addFileToVFS plus addFont with a Google Font.` },
      { title: 'Graceful font fallback', text: `Times Italic if the font can't load.` },
      { title: 'Chunked base64 conversion', text: `Avoids call-stack limits on large fonts.` },
      { title: 'Auto-fitting names', text: `getTextWidth shrinks long names.` },
      { title: 'Wrapped course titles', text: `splitTextToSize with centre alignment.` },
      { title: 'Print-accurate layout', text: `Millimetre coordinates on A4 landscape.` },
      { title: 'Colour themes', text: `Ink and accent RGB sets.` },
      { title: 'Live PDF preview', text: `The real file rendered with PDF.js.` },
    ],
    useCases: [
      { title: 'Course completion certificates', text: 'Generate a certificate per learner the moment they finish, with the name set in an embedded script font. Long names shrink automatically using `getTextWidth`, so nothing overflows the line.' },
      { title: 'Workshop and event attendance', text: 'Hand out printable A4 certificates on the spot at a workshop or webinar. The live PDF.js preview shows the real PDF as you type, so typos are caught before anything is printed.' },
      { title: 'HR and compliance training records', text: 'Issue completion records for safety or compliance courses while keeping personal data on the user\'s device, since the PDF is built entirely in the browser with no rendering server.' },
      { title: 'Awards for schools and clubs', text: 'Create achievement and sports-day awards in three colour themes with a border and seal. If the Google font cannot load, the generator falls back to Times Italic instead of failing.' },
      { title: 'Learning custom fonts in jsPDF', text: 'See how `addFileToVFS` and `addFont` embed a TTF, and why large fonts are converted to base64 in chunks. It is a reusable recipe for any branded PDF.' },
      { icon: 'CODE', title: 'Related: jsPDF Invoice Generator', desc: 'Tables and totals with autoTable: [jsPDF Invoice Generator with Live PDF Preview](/ui-snippets/jspdf-invoice-generator/).' },
      { icon: 'CODE', title: 'Related: Certificate Preview Card', desc: 'An HTML certificate card: [Certificate of Completion Preview](/ui-snippets/certificate-preview-card/).' },
    ],
    faqs: [
      { q: 'How do I use a custom font in jsPDF?', a: `Load a TrueType (.ttf) file, convert it to base64, call doc.addFileToVFS('Font.ttf', base64) and doc.addFont('Font.ttf', 'FontName', 'normal'), then doc.setFont('FontName', 'normal').` },
      { q: 'Can jsPDF use WOFF or WOFF2 fonts?', a: `No. jsPDF needs TrueType fonts. Download the .ttf version, which Google Fonts provides in its GitHub repository and download archives.` },
      { q: 'How do I make long text fit on one line?', a: `Measure it with doc.getTextWidth(text) at the current font size and reduce the size until it is narrower than the space available, with a sensible minimum.` },
      { q: 'How do I centre text in jsPDF?', a: `Pass the horizontal centre as the x coordinate and { align: 'center' } as options: doc.text(text, pageWidth / 2, y, { align: 'center' }).` },
      { q: 'Why convert the font to base64 in chunks?', a: `String.fromCharCode.apply on a very large array can exceed the engine's maximum number of function arguments. Processing the bytes in chunks keeps each call within the limit.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain the steps for embedding a TrueType font in jsPDF. Ask it to add a QR code linking to a verification URL, a logo image, bulk generation from a CSV list into one multi-page PDF, or a unique certificate ID. It can also help you subset a large font so the generated PDFs stay small.`,
      prompt: `Build a certificate generator with jsPDF and a PDF.js 3 live preview (both from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Form fields: recipient name, course, date, hours, signer and a three-option colour theme.
- Fetch a Google Fonts script TTF (Great Vibes) at startup, convert it to base64 in chunks, embed it with addFileToVFS and addFont, and fall back to Times Italic if loading fails.
- Draw a landscape A4 certificate in millimetres: a thick outer border and thin inner border with corner dots, a spaced-out heading, the recipient name in the script font reduced in size until it fits, an underline, the wrapped course title, hours, a date line on the left, a signature line on the right with the signer's name in script, and a round seal in the centre.
- Regenerate on every edit (debounced) and render the PDF with PDF.js onto a canvas, passing it a copy of the bytes and ignoring outdated renders.
- A Download button that saves the PDF with the recipient's name in the file name and a note that sandboxed previews block downloads.`,
    },
  },
};

export default jspdfCertificateGenerator;
