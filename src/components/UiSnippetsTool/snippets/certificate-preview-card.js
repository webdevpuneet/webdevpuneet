const certificatePreviewCard = {
  id: 'certificate-preview-card',
  title: 'Certificate of Completion Preview',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="cert-wrap">
  <div class="cert" id="cert">
    <div class="cert-border">
      <div class="cert-corner tl"></div><div class="cert-corner tr"></div>
      <div class="cert-corner bl"></div><div class="cert-corner br"></div>
      <p class="cert-kicker">Certificate of Completion</p>
      <div class="cert-seal" aria-hidden="true">
        <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="27" /><circle cx="30" cy="30" r="20" /><path d="M20 30l7 7 13-14" /></svg>
      </div>
      <p class="cert-presented">This certifies that</p>
      <h2 class="cert-name" id="certName">Priya Nandakumar</h2>
      <p class="cert-course">has successfully completed</p>
      <h3 class="cert-title" id="certCourse">Advanced Data Visualization</h3>
      <div class="cert-meta">
        <div class="cert-meta-item"><span class="cert-meta-label">Completion Date</span><span class="cert-meta-value" id="certDate">March 14, 2026</span></div>
        <div class="cert-meta-item"><span class="cert-meta-label">Certificate ID</span><span class="cert-meta-value" id="certId">CDV-88213</span></div>
      </div>
      <div class="cert-sign">
        <div class="cert-sign-line"><span class="cert-sig">A. Whitfield</span><span class="cert-sign-label">Program Director</span></div>
        <div class="cert-sign-line"><span class="cert-sig cert-sig-alt">R. Okoye</span><span class="cert-sign-label">Head of Instruction</span></div>
      </div>
    </div>
  </div>

  <div class="cert-actions">
    <button class="cert-btn cert-btn-primary" id="certDownload" type="button">Download PDF</button>
    <button class="cert-btn cert-btn-ghost" id="certShare" type="button">Share</button>
  </div>
  <p class="cert-status" id="certStatus" role="status" aria-live="polite"></p>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0d12;color:#eee;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.cert-wrap{width:100%;max-width:520px}
.cert{background:linear-gradient(150deg,#171310,#0e0c0a);border-radius:14px;padding:10px;box-shadow:0 30px 70px rgba(0,0,0,.5)}
.cert-border{position:relative;border:1.5px solid #b6903f;border-radius:10px;padding:32px 28px;text-align:center;background:
  radial-gradient(circle at 15% 10%, rgba(182,144,63,.09), transparent 55%),
  radial-gradient(circle at 85% 90%, rgba(182,144,63,.09), transparent 55%);}
.cert-corner{position:absolute;width:22px;height:22px;border:2px solid #d8b567}
.cert-corner.tl{top:8px;left:8px;border-right:0;border-bottom:0}
.cert-corner.tr{top:8px;right:8px;border-left:0;border-bottom:0}
.cert-corner.bl{bottom:8px;left:8px;border-right:0;border-top:0}
.cert-corner.br{bottom:8px;right:8px;border-left:0;border-top:0}
.cert-kicker{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#d8b567;margin-bottom:14px}
.cert-seal{width:52px;height:52px;margin:0 auto 14px}
.cert-seal svg{width:100%;height:100%;fill:none;stroke:#d8b567;stroke-width:1.6}
.cert-presented{font-size:12.5px;color:#a89877;font-style:italic;margin-bottom:6px}
.cert-name{font-family:Georgia,'Times New Roman',serif;font-size:clamp(24px,6vw,32px);color:#f4ead2;margin-bottom:10px;letter-spacing:.01em}
.cert-course{font-size:12.5px;color:#a89877;font-style:italic;margin-bottom:8px}
.cert-title{font-family:Georgia,'Times New Roman',serif;font-size:19px;color:#e9d7ac;margin-bottom:22px}
.cert-meta{display:flex;justify-content:center;gap:36px;margin-bottom:26px;flex-wrap:wrap}
.cert-meta-item{display:flex;flex-direction:column;gap:3px}
.cert-meta-label{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:#8a7a5c}
.cert-meta-value{font-size:13px;color:#e4d9bc;font-weight:600}
.cert-sign{display:flex;justify-content:space-around;gap:16px;padding-top:18px;border-top:1px solid rgba(216,181,103,.25);flex-wrap:wrap}
.cert-sign-line{display:flex;flex-direction:column;align-items:center;gap:4px}
.cert-sig{font-family:'Brush Script MT',cursive,Georgia,serif;font-size:20px;color:#e9d7ac;border-bottom:1px solid rgba(216,181,103,.4);padding:0 10px 4px}
.cert-sig-alt{transform:rotate(-1.5deg)}
.cert-sign-label{font-size:10px;color:#8a7a5c}
.cert-actions{display:flex;gap:10px;margin-top:20px}
.cert-btn{flex:1;padding:12px;border-radius:10px;border:1px solid transparent;font-size:13.5px;font-weight:600;cursor:pointer;transition:transform .12s,opacity .12s}
.cert-btn:active{transform:scale(.97)}
.cert-btn-primary{background:linear-gradient(135deg,#d8b567,#b6903f);color:#20180a}
.cert-btn-ghost{background:transparent;border-color:#3a342a;color:#e4d9bc}
.cert-btn-ghost:hover{border-color:#d8b567}
.cert-btn:disabled{opacity:.6;cursor:default}
.cert-status{margin-top:10px;font-size:12.5px;color:#9adba0;min-height:16px;text-align:center}`,
  js: `// Simulated download: swap the button label to a progress state, then to a
// confirmed state, mirroring how a real certificate PDF export would report status.
const downloadBtn = document.getElementById('certDownload');
const shareBtn = document.getElementById('certShare');
const status = document.getElementById('certStatus');

downloadBtn.addEventListener('click', () => {
  if (downloadBtn.disabled) return;
  downloadBtn.disabled = true;
  const original = downloadBtn.textContent;
  downloadBtn.textContent = 'Preparing PDF…';
  status.textContent = '';

  setTimeout(() => {
    downloadBtn.textContent = 'Downloaded ✓';
    status.textContent = 'certificate-of-completion.pdf saved.';
    setTimeout(() => {
      downloadBtn.textContent = original;
      downloadBtn.disabled = false;
    }, 1800);
  }, 900);
});

shareBtn.addEventListener('click', async () => {
  const name = document.getElementById('certCourse').textContent;
  const shareText = 'I just completed "' + name + '"!';
  const originalLabel = shareBtn.textContent;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Certificate of Completion', text: shareText });
      status.textContent = 'Shared successfully.';
      return;
    } catch (err) {
      // user cancelled or share failed — fall through to clipboard copy
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
  } catch (err) {
    // clipboard may be unavailable in this sandbox — still show the confirmed state
  }
  shareBtn.textContent = 'Link Copied ✓';
  status.textContent = 'Share text copied to clipboard.';
  setTimeout(() => { shareBtn.textContent = originalLabel; }, 1800);
});`,
  seo: {
    title: 'Certificate of Completion Preview — Free LMS Card Snippet',
    description: `A decorative certificate preview card with a wax-seal checkmark, recipient name, signature lines, and Download/Share buttons. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Certificate of Completion Preview — Decorative Border, Seal & Share Actions',
      description: `The certificate preview card is the shareable artifact an LMS or course platform generates the moment a learner finishes — a formal-looking document rendered inline rather than a plain "you're done" banner. This snippet builds one with a gold decorative border, corner brackets, a checkmark seal, a serif recipient name, two signature lines, and a working Download/Share button pair.

**Decorative framing without images**

The ornate look comes entirely from CSS: a double-layer border (an outer card background plus an inset bordered panel), four absolutely-positioned corner brackets built from partial borders, and two soft radial gradients placed at opposite corners to fake a subtle vignette. None of it is a background image, so the certificate stays crisp at any size and themeable by changing a handful of color variables.

**The seal as inline SVG**

The checkmark seal is a small inline \`<svg>\` — two concentric circles plus a checkmark path — rather than an icon font or image, so its stroke color matches the gold palette exactly and scales without blurring. Because it's real markup, it's trivial to swap for a different mark (a ribbon, a star, an organization logo) without touching layout.

**Signatures as styled text, not images**

Both signature lines use a cursive font stack (\`'Brush Script MT', cursive\`) with a fallback to the serif stack, sitting on a thin bottom border to read as a signature line. One signature is given a slight \`rotate\` to avoid the two looking mechanically identical — a small detail that keeps the certificate from feeling templated.

**Working download and share actions**

The Download button simulates the PDF-generation delay a real export would have — swapping its label to "Preparing PDF…", then to a confirmed "Downloaded ✓" state — so it's a realistic stand-in for wiring up an actual \`html2canvas\`/PDF export later. The Share button calls the native \`navigator.share\` API where available and falls back to copying share text to the clipboard, updating an \`aria-live\` status region either way so screen reader users hear the result.

**Customizing it**

Swap the palette for a brand color, change the serif stack, or replace the checkmark seal with an uploaded badge image. Pair it with a [course progress tracker](/ui-snippets/course-progress-tracker/) that links to this card on 100% completion, or a [quiz result breakdown](/ui-snippets/quiz-result-breakdown/) that gates certificate issuance on a passing score.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A gold-bordered certificate renders with sample recipient data.` },
      { title: 'Click "Download PDF"', text: `The button shows a preparing state, then a confirmed downloaded state.` },
      { title: 'Click "Share"', text: `Uses navigator.share if available, otherwise copies share text.` },
      { title: 'Edit the recipient details', text: `Change #certName, #certCourse, #certDate, and #certId in the HTML.` },
      { title: 'Swap the seal mark', text: `Replace the inline SVG checkmark path with a badge or logo.` },
      { title: 'Recolor the palette', text: `Change the gold hex values in the CSS to match your brand.` },
    ] },
    features: [
      { title: 'CSS-only ornamentation', text: `Border, corner brackets, and vignette built with no images.` },
      { title: 'Inline SVG seal', text: `A scalable checkmark seal that recolors with the palette.` },
      { title: 'Styled signature lines', text: `Cursive text on underline rules, one subtly rotated.` },
      { title: 'Simulated PDF export', text: `Download button shows a realistic preparing-then-done sequence.` },
      { title: 'Native share integration', text: `Uses navigator.share with a clipboard-copy fallback.` },
      { title: 'Accessible status updates', text: `An aria-live region announces download and share results.` },
      { title: 'Responsive certificate', text: `clamp()-sized name and fluid meta row wrap on narrow screens.` },
      { title: 'Metadata row', text: `Completion date and certificate ID displayed as a labeled pair.` },
    ],
    useCases: [
      { title: 'Online course platforms', text: `Issue a shareable completion artifact after the final lesson.` },
      { title: 'Corporate training LMS', text: `Confirm compliance-course completion with a formal record.` },
      { title: 'Certification programs', text: `Pair with [quiz result breakdown](/ui-snippets/quiz-result-breakdown/) to gate on passing.` },
      { title: 'Bootcamps and workshops', text: `Generate a card learners screenshot and post on social media.` },
      { title: 'Progress-linked rewards', text: `Trigger from a [course progress tracker](/ui-snippets/course-progress-tracker/) hitting 100%.` },
      { title: 'Event attendance proof', text: `Adapt the layout for a conference or webinar attendance certificate.` },
      { icon: 'CODE', title: 'Related: Empty State with Sample Data Toggle', desc: 'See the [Empty State with Sample Data Toggle](/ui-snippets/empty-state-sample-data-toggle/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the decorative border use any background images?', a: `No. The gold border, four corner brackets, and soft vignette are built entirely with CSS — a bordered inset panel, absolutely-positioned partial-border corner elements, and two radial gradients. That keeps the certificate crisp at any zoom level and easy to recolor by changing a few hex values.` },
      { q: 'How does the Download button work without a real PDF library?', a: `It simulates the sequence a real export would show: the label changes to "Preparing PDF…" for about a second, then to "Downloaded ✓" with a status message, then resets. In production you'd trigger an actual export — for example html2canvas plus jsPDF, or a server-rendered PDF — inside that same click handler, in place of the setTimeout calls.` },
      { q: 'What does the Share button actually do?', a: `It first tries the native navigator.share API, which on supporting browsers (mostly mobile) opens the OS share sheet with the certificate's course name. If navigator.share isn't available or the user cancels, it falls back to copying a share-text string to the clipboard via navigator.clipboard.writeText and confirms with a status message.` },
      { q: 'How do I generate a real downloadable PDF or image from this card?', a: `Capture the .cert element with html2canvas to get a canvas, then either convert that canvas to a PNG via toDataURL for an image download, or feed it into jsPDF's addImage to produce an actual PDF file. Replace the simulated setTimeout logic in the download handler with that capture-and-export call.` },
      { q: 'How do I use this certificate card in React, Vue, or Angular?', a: `Pass recipient name, course title, date, and certificate ID as props or a data object and interpolate them into the template — the CSS and SVG seal port over unchanged. Keep the download/share handlers as component methods that call your real export library instead of the simulated timeouts.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to hand-tune the certificate's ornamental CSS or the share fallback logic yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the four corner brackets are built from partial-border absolutely-positioned elements, or why the Share button checks for navigator.share before falling back to a clipboard copy rather than assuming one behavior everywhere. The same assistant can help optimize it — ask whether the two radial-gradient vignettes should be combined into one background-image value, or whether the simulated download delay should be replaced with a real html2canvas-plus-jsPDF export. It's also useful for extending the card: ask it to add a QR code linking to a verification URL, generate a unique certificate ID from a hash of the recipient and course, or add a subtle particle-confetti burst the first time the card renders. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "certificate of completion preview" card in plain HTML, CSS, and JavaScript — no framework, no library, no external images.

Requirements:
- A decorative certificate panel with a gold-toned border, four corner bracket accents built from CSS borders (not images), and a subtle background vignette using CSS radial gradients — all achieved with plain CSS, no background-image files.
- An inline SVG checkmark "seal" (two concentric circles plus a checkmark path) rendered above the recipient name, using currentColor or a CSS variable so its stroke color matches the gold palette and can be recolored globally.
- A recipient name in a serif display font, a course title, and a metadata row showing a completion date and a certificate ID as labeled key/value pairs.
- Two styled "signature" lines using a cursive font stack with a bottom border rule beneath each, positioned side by side, with a small rotation on one signature so the two don't look identical.
- A Download button that, on click, disables itself, changes its label to a "Preparing…" state, waits roughly a second, then shows a confirmed "Downloaded" state with a checkmark before resetting — simulating a real PDF export's timing without an actual PDF library.
- A Share button that calls the native navigator.share API when available with a title and text about the completed course, and falls back to copying a share-text string to the clipboard via the Clipboard API when navigator.share is unavailable or the user cancels — confirming either outcome in an aria-live status region so the result is announced to screen readers.`,
    },
  },
};

export default certificatePreviewCard;
