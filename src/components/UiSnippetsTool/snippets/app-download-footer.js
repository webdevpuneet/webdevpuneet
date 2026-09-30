const appDownloadFooter = {
  id: 'app-download-footer',
  title: 'App Download Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<footer class="adf">
  <div class="adf-inner">
    <div class="adf-promo">
      <span class="adf-eyebrow">★★★★★ 4.8 on the App Store</span>
      <h2>Take Fluxly with you</h2>
      <p>Track sprints, review PRs, and get push notified the second a build fails — from your pocket.</p>
      <div class="adf-badges">
        <a href="#" class="adf-badge" aria-label="Download on the App Store">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.72-.15 1.66-.85 2.99-.68 3.13.41 4.55 3.34 3.24 5.64-2.42 1.36-1.5 4.83.7 5.55-.5 1.24-1.15 2.47-2.01 3.66zM12.03 7.25c-.15-2.23 1.66-4.09 3.74-4.25.29 2.31-2.08 4.4-3.74 4.25z"/></svg>
          <span><small>Download on the</small>App Store</span>
        </a>
        <a href="#" class="adf-badge" aria-label="Get it on Google Play">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3.6 2.6c-.3.3-.5.7-.5 1.2v16.4c0 .5.2.9.5 1.2l.1.1L13 12.2v-.4L3.7 2.5l-.1.1z"/><path d="M16.1 15.3l-3.1-3.1v-.4l3.1-3.1 6.9 3.9c.7.4.7 1.1 0 1.5l-6.9 3.9z"/></svg>
          <span><small>Get it on</small>Google Play</span>
        </a>
      </div>
    </div>
    <div class="adf-qr" aria-hidden="true">
      <div class="adf-qr-grid">
        <span style="grid-area:1/1/3/3"></span><span style="grid-area:1/6/3/8"></span><span style="grid-area:6/1/8/3"></span>
        <span style="grid-area:1/4/2/5"></span><span style="grid-area:3/1/4/2"></span><span style="grid-area:3/4/4/6"></span>
        <span style="grid-area:4/3/5/4"></span><span style="grid-area:4/6/5/8"></span><span style="grid-area:5/2/6/4"></span>
        <span style="grid-area:5/5/6/6"></span><span style="grid-area:6/5/7/7"></span><span style="grid-area:7/4/8/5"></span>
        <span style="grid-area:2/4/3/5"></span><span style="grid-area:1/3/2/4"></span><span style="grid-area:7/7/8/8"></span>
      </div>
      <span class="adf-qr-label">Scan to get the app</span>
    </div>
  </div>
  <div class="adf-bottom">
    <span>© 2026 Fluxly, Inc.</span>
    <div class="adf-legal"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Status</a></div>
  </div>
</footer>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f1e;min-height:100vh}

.adf{background:linear-gradient(180deg,#0f1428,#0a0f1e);border-top:1px solid rgba(255,255,255,0.08)}
.adf-inner{max-width:960px;margin:0 auto;padding:56px 24px 40px;display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap}

.adf-promo{max-width:420px}
.adf-eyebrow{display:inline-block;font-size:12px;font-weight:700;color:#fbbf24;letter-spacing:.02em;margin-bottom:10px}
.adf-promo h2{font-size:clamp(24px,4vw,32px);font-weight:800;color:#f8fafc;letter-spacing:-.02em;line-height:1.2}
.adf-promo p{font-size:14px;color:#94a3b8;line-height:1.65;margin-top:10px}

.adf-badges{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap}
.adf-badge{display:flex;align-items:center;gap:9px;background:#000;color:#fff;border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:9px 16px 9px 13px;text-decoration:none;transition:border-color .15s,transform .15s}
.adf-badge:hover{border-color:rgba(255,255,255,0.4);transform:translateY(-1px)}
.adf-badge span{display:flex;flex-direction:column;line-height:1.15}
.adf-badge small{font-size:9.5px;color:#cbd5e1;font-weight:500}
.adf-badge span:not(small){font-size:14px;font-weight:700}

.adf-qr{display:flex;flex-direction:column;align-items:center;gap:10px;flex-shrink:0}
.adf-qr-grid{width:96px;height:96px;background:#fff;border-radius:12px;display:grid;grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(8,1fr);padding:10px;gap:1px}
.adf-qr-grid span{background:#0a0f1e;border-radius:1px}
.adf-qr-label{font-size:11px;color:#64748b}

.adf-bottom{border-top:1px solid rgba(255,255,255,0.06);padding:16px 24px;max-width:960px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.adf-bottom span{font-size:12px;color:#475569}
.adf-legal{display:flex;gap:18px}
.adf-legal a{font-size:12px;color:#64748b;text-decoration:none;transition:color .15s}
.adf-legal a:hover{color:#e2e8f0}

@media (max-width:640px){
  .adf-inner{flex-direction:column;text-align:center}
  .adf-promo{max-width:none}
  .adf-badges{justify-content:center}
}`,
  js: '',
  seo: {
    title: 'App Download Footer — Free HTML CSS App Store & Google Play Footer',
    description: 'A footer built to close every page with an app download push — real App Store and Google Play badge shapes, a CSS-only QR code, and a legal row. No dependencies.',
    about: {
      title: 'App Download Footer — Store Badges and a CSS-Drawn QR Code',
      description: `Most marketing sites for a mobile-first product bury the App Store links in the header nav where nobody looks, or as a single small badge lost in a mega-footer's fourth column. This snippet makes the download push the entire point of the footer — a headline, both store badges at real size, and a scannable QR code — because the footer is one of the last things a visitor sees before they either convert or leave, and "download the app" is a much easier ask than the one the rest of the page just made.

**Badges built as real anchor tags, not images**

Both the App Store and Google Play badges are inline SVG glyphs plus text inside an \`<a>\`, not screenshots of Apple's and Google's official badge artwork. That matters for three reasons: the text stays selectable and readable to screen readers, the badge recolors and resizes with CSS instead of needing a new export from a design tool, and there's no image request blocking the footer's first paint. The two-line label (\`small\` + bold app store name) reproduces the same visual hierarchy as the official badges without shipping their exact typography, which you should swap for the real Apple/Google badge assets before shipping to production — this snippet demonstrates the layout and interaction, not brand-compliant artwork.

**A QR code with zero image requests and zero library**

The "QR code" is a fixed \`display: grid\` of 8×8 cells, and fifteen of those cells are explicit \`<span>\` elements positioned by \`grid-area\` coordinates to look like a scan pattern. It is not a real, scannable QR code — generating one that actually encodes a URL needs either a server-rendered image or a QR-generation library (see the [QR Code Generator](https://fwdtools.com/qr-code-generator/) tool for that). What this snippet demonstrates is the zero-dependency way to get QR-code *styling* into a footer instantly: no image asset, no network request, and the pattern recolors with a single CSS variable if you retheme the footer. Swap in a real generated QR image once you have an actual App Store / Play Store link to encode.

**Two distinct rows, two distinct jobs**

The top section is the pitch — eyebrow rating, headline, description, badges, QR — and it's visually separated from a slim bottom bar carrying just the copyright and three legal links. Splitting these means the persuasive content doesn't have to share visual weight with boilerplate, and the legal row can be reused verbatim across a site's other footers if you're mixing footer styles per page template.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML and CSS', text: 'The promo panel, both store badges, the QR placeholder, and the legal row render immediately — no JavaScript is used.' },
        { title: 'Replace the badge artwork', text: 'Swap the inline SVG + text badges for the official Apple and Google badge assets before shipping — this snippet\'s badges demonstrate layout, not brand-compliant artwork.' },
        { title: 'Generate a real QR code', text: 'Replace .adf-qr-grid with an actual QR image encoding your App Store / Play Store link, from a QR generator tool or a server-side library.' },
        { title: 'Update the rating and copy', text: 'Edit the eyebrow rating text, headline, and description to match your product and its real store rating.' },
        { title: 'Check the mobile stack', text: 'Resize below 640px to confirm the promo and QR code centre themselves cleanly rather than crowding.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'App Store and Google Play badges as real, accessible anchor tags — not badge screenshots',
      'CSS Grid-based QR code pattern with zero image requests and zero external library',
      'Star-rating eyebrow line for immediate social proof above the headline',
      'Two-tier layout: a persuasive promo section and a slim, reusable legal bottom bar',
      'Pure HTML and CSS — no JavaScript, no layout shift, no dependency',
      'Fully responsive: promo and QR code stack and centre below 640px',
    ],
    useCases: [
      { icon: 'MOBILE', title: 'Mobile-first product marketing sites', desc: 'When the whole point of the site is to get a visitor into the app, the footer is a second, lower-pressure chance to make that ask after the hero\'s primary CTA.' },
      { icon: 'APP', title: 'SaaS products with a companion mobile app', desc: 'Push the mobile app as a footer-level cross-sell on every page of the web product, without dedicating hero space to it site-wide.' },
      { icon: 'DESIGN', title: 'App landing pages and pre-launch sites', desc: 'Pair with a hero section higher on the page and use this footer as the final, lowest-friction conversion point before a visitor leaves.' },
      { icon: 'FLOW', title: 'Blog posts and content marketing pages', desc: 'A content site tied to a mobile app (news, fitness, finance) can end every article with the same download push instead of an inline banner ad.' },
      { icon: 'LEARN', title: 'Studying CSS-only QR/pattern generation', desc: 'A reference for building a convincing scan-code visual purely from CSS Grid and positioned spans, with no image asset or canvas involved.' },
      { icon: 'CODE', title: 'Multi-platform product pages', desc: 'Combine both store badges in one place when a single web page needs to route iOS and Android visitors to their respective stores.' },
      { icon: 'CODE', title: 'Related: Aurora Gradient Footer', desc: 'See the [Aurora Gradient Footer](/ui-snippets/aurora-gradient-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Minimal Footer', desc: 'See the [Minimal Footer](/ui-snippets/minimal-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Sitemap Directory Footer', desc: 'See the [Sitemap Directory Footer](/ui-snippets/footer-directory-sitemap/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Business Hours Status Footer', desc: 'See the [Business Hours Status Footer](/ui-snippets/footer-business-hours-status/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Careers Teaser Footer', desc: 'See the [Careers Teaser Footer](/ui-snippets/footer-careers-teaser/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the QR code in this snippet actually scannable?', a: 'No — it is a fixed CSS Grid pattern styled to look like a QR code, not a real encoded image. It demonstrates the zero-dependency visual placement; you need a real QR-generation tool or library (such as the site\'s QR Code Generator) to produce one that actually decodes to your app store link.' },
      { q: 'Can I use the App Store and Google Play badges as shown in production?', a: 'The badges here are built as accessible anchor tags with inline SVG icons and text to demonstrate the layout — they are not the official, brand-compliant badge artwork Apple and Google provide. Replace them with the official downloadable badge assets from Apple\'s and Google\'s brand guidelines before shipping.' },
      { q: 'Why are the badges built as text and SVG rather than an image?', a: 'Text-based badges stay selectable and screen-reader friendly, recolor and resize with plain CSS instead of needing a new export from a design tool, and load with zero extra image requests — which matters in a footer that should not block the page\'s first paint.' },
      { q: 'How do I link each badge to the correct store?', a: 'Set the href on each .adf-badge anchor to your app\'s real App Store and Google Play listing URLs. Both badges are ordinary links, so no JavaScript routing is needed.' },
      { q: 'Does this footer include a link directory or newsletter signup?', a: 'No — this snippet is intentionally focused on the download push and a slim legal row. For a fuller footer with a link directory, brand description, and newsletter form, see the mega footer instead.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. Since there is no JavaScript behaviour, the conversion is a direct markup translation — replace the QR grid and badge artwork with your real assets in the resulting component.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is a strong candidate for an AI assistant's help on the two things it deliberately leaves as placeholders. Paste the HTML and CSS into an assistant like Claude and ask it to help you wire the .adf-qr-grid element up to a real QR-generation approach — either recommending a small client-side library that can render a scannable code into that same visual slot, or a server-side image generation approach if you're on a framework with API routes. It's equally useful for the badges: ask it to walk through Apple's and Google's current badge usage guidelines so the replacement artwork stays brand-compliant. For extending the layout, ask it to add a second QR code for the alternate platform, or to condition which single badge and QR code render based on a User-Agent or Client Hints device check so mobile visitors see only their platform's badge.`,
      prompt: `Build an "app download" website footer in plain HTML and CSS — no JavaScript, no external QR library.

Requirements:
- A promo section with a small star-rating eyebrow line, a headline, a short description, and a row of two store badges (App Store and Google Play) built as real anchor tags containing an inline SVG glyph and two-line text (a small "Download on the" / "Get it on" line above a bold store name) — not images.
- Style the badges as solid black, rounded rectangles with a subtle border, brightening border colour and lifting 1px on hover.
- Next to the promo section, add a placeholder "QR code": a fixed 8x8 CSS Grid of white background with roughly a dozen dark cells positioned via named grid-area coordinates so it visually resembles a scan pattern, with a small caption label beneath it. State clearly that this is a decorative placeholder, not a real scannable code.
- Below the main promo section, add a slim, visually separated bottom bar containing a copyright string and three legal links (Privacy, Terms, Status).
- Make it fully responsive: below 640px, stack the promo and QR sections vertically and centre their content, and keep the badges wrapping cleanly.
- Use a dark background with a subtle top border separating the footer from the page content above it.`,
    },
  },
};

export default appDownloadFooter;
