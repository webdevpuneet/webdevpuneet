const megaFooter = {
  id: 'mega-footer',
  title: 'Mega Footer',
  category: 'footers',
  html: `<div class="site-mock">
  <main class="mock-content">
    <p>↑ Page content above the footer</p>
  </main>
  <footer class="footer">
    <div class="footer-inner">
      <div class="brand-col">
        <div class="brand">
          <div class="brand-logo">⚡</div>
          <span class="brand-name">Voltstack</span>
        </div>
        <p class="brand-desc">Helping teams ship faster with developer-first tools, APIs, and world-class documentation.</p>
        <div class="socials">
          <a class="social" href="#" title="Twitter">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a class="social" href="#" title="GitHub">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a class="social" href="#" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
        <div class="newsletter">
          <p class="nl-label">Get product updates</p>
          <div class="nl-form">
            <input class="nl-input" type="email" placeholder="you@company.com" id="nlEmail">
            <button class="nl-btn" onclick="subscribe()">Subscribe</button>
          </div>
          <p class="nl-note" id="nlNote"></p>
        </div>
      </div>
      <nav class="link-cols">
        <div class="link-col">
          <p class="col-head">Product</p>
          <a href="#">Features</a><a href="#">Pricing</a><a href="#">Changelog</a><a href="#">Roadmap</a><a href="#">Status</a>
        </div>
        <div class="link-col">
          <p class="col-head">Developers</p>
          <a href="#">Documentation</a><a href="#">API Reference</a><a href="#">SDKs</a><a href="#">Webhooks</a><a href="#">CLI</a>
        </div>
        <div class="link-col">
          <p class="col-head">Company</p>
          <a href="#">About</a><a href="#">Blog</a><a href="#">Careers <span class="hiring">Hiring</span></a><a href="#">Press</a><a href="#">Contact</a>
        </div>
        <div class="link-col">
          <p class="col-head">Legal</p>
          <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookie Policy</a><a href="#">GDPR</a><a href="#">Security</a>
        </div>
      </nav>
    </div>
    <div class="footer-bottom">
      <p class="copyright">© 2026 Voltstack Inc. All rights reserved.</p>
      <div class="bottom-links">
        <a href="#">Sitemap</a>
        <a href="#">Accessibility</a>
        <select class="lang-select" title="Language">
          <option>🌐 English</option>
          <option>🇩🇪 Deutsch</option>
          <option>🇫🇷 Français</option>
          <option>🇯🇵 日本語</option>
        </select>
      </div>
    </div>
  </footer>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; }
.site-mock { min-height: 100vh; display: flex; flex-direction: column; }
.mock-content { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #94a3b8; font-weight: 600; padding: 60px 20px; }
.footer { background: #0a0e1a; color: #94a3b8; }
.footer-inner { max-width: 1160px; margin: 0 auto; padding: 60px 32px 40px; display: grid; grid-template-columns: 340px 1fr; gap: 64px; }
.brand { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.brand-logo { width: 34px; height: 34px; background: linear-gradient(135deg,#6366f1,#8b5cf6); border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.brand-name { font-size: 18px; font-weight: 900; color: #f1f5f9; }
.brand-desc { font-size: 14px; line-height: 1.6; color: #64748b; margin-bottom: 20px; }
.socials { display: flex; gap: 10px; margin-bottom: 24px; }
.social { width: 36px; height: 36px; border-radius: 9px; background: #111827; border: 1px solid #1e2744; display: flex; align-items: center; justify-content: center; color: #64748b; text-decoration: none; transition: all 0.15s; }
.social:hover { background: #1e2744; color: #a5b4fc; }
.newsletter { }
.nl-label { font-size: 13px; font-weight: 700; color: #e2e8f0; margin-bottom: 10px; }
.nl-form { display: flex; gap: 6px; }
.nl-input { flex: 1; background: #111827; border: 1px solid #1e2744; border-radius: 9px; padding: 10px 14px; font-size: 13px; color: #f1f5f9; outline: none; font-family: inherit; transition: border-color 0.15s; }
.nl-input::placeholder { color: #334155; }
.nl-input:focus { border-color: #4f46e5; }
.nl-btn { background: #6366f1; border: none; color: #fff; font-size: 13px; font-weight: 800; padding: 10px 18px; border-radius: 9px; cursor: pointer; white-space: nowrap; font-family: inherit; transition: background 0.15s; }
.nl-btn:hover { background: #4f46e5; }
.nl-note { font-size: 12px; color: #22c55e; margin-top: 8px; min-height: 16px; }
.link-cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.col-head { font-size: 12px; font-weight: 800; color: #f1f5f9; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px; }
.link-col a { display: block; font-size: 14px; color: #64748b; text-decoration: none; margin-bottom: 10px; transition: color 0.15s; }
.link-col a:hover { color: #a5b4fc; }
.hiring { background: #4ade80; color: #052e16; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; margin-left: 6px; vertical-align: middle; }
.footer-bottom { border-top: 1px solid #111827; max-width: 1160px; margin: 0 auto; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.copyright { font-size: 13px; color: #334155; }
.bottom-links { display: flex; align-items: center; gap: 16px; }
.bottom-links a { font-size: 13px; color: #334155; text-decoration: none; transition: color 0.15s; }
.bottom-links a:hover { color: #64748b; }
.lang-select { background: #111827; border: 1px solid #1e2744; color: #64748b; font-size: 13px; padding: 5px 10px; border-radius: 7px; cursor: pointer; font-family: inherit; outline: none; }
@media (max-width: 900px) { .footer-inner { grid-template-columns: 1fr; gap: 40px; } .link-cols { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .link-cols { grid-template-columns: 1fr 1fr; } }`,
  js: `function subscribe() {
  var email = document.getElementById('nlEmail').value.trim();
  var note = document.getElementById('nlNote');
  if (!email || !/^[^@]+@[^@]+\\.[^@]+$/.test(email)) {
    note.style.color = '#ef4444';
    note.textContent = 'Please enter a valid email.';
    return;
  }
  note.style.color = '#22c55e';
  note.textContent = '✓ Subscribed! You will receive our next update.';
  document.getElementById('nlEmail').disabled = true;
  document.querySelector('.nl-btn').disabled = true;
}`,
  seo: {
    title: 'Mega Footer — Multi-Column Site Footer UI Snippet',
    description: 'Multi-column mega footer with brand, social icons, newsletter form, four link groups, language selector, and bottom bar. Exports to React, Vue & Angular.',
    about: {
      title: 'Mega Footer — Brand Column, Link Groups, Newsletter Form & Language Selector',
      description: `A mega footer is a full-width, multi-column site footer that consolidates navigation, legal links, brand identity, social links, and a newsletter sign-up in one structured section. It is a staple of SaaS product sites, developer tools, e-commerce platforms, and marketing pages — and a frequently-searched component because getting the layout right across column counts and screen sizes requires careful grid design. This snippet provides a complete mega footer with a brand and social column, four navigational link columns, a newsletter input, a language selector, and a responsive bottom bar.\n\n**The two-zone layout**\n\nThe footer splits into two horizontal zones: a wide brand column on the left (brand logo, description, social icons, newsletter) and a four-column link grid on the right. This is achieved with a CSS grid of grid-template-columns: 340px 1fr — a fixed brand column and a fluid link area. The link grid inside uses grid-template-columns: repeat(4, 1fr) for equal-width columns. Both grids collapse gracefully: at 900px the footer stacks brand above links; at 520px the four link columns become a 2×2 grid.\n\n**Brand column**\n\nThe brand section contains a logo mark (emoji swappable for an SVG), a company name in bold, a short tagline description, social icon buttons, and a newsletter input row. Grouping all brand-level content in the first column follows the standard mega-footer convention and ensures the most important "who we are" information is always visible without scrolling the link columns.\n\n**Social icon buttons**\n\n[Social links](/ui-snippets/social-buttons/) use inline SVG icons (Twitter/X, GitHub, LinkedIn) inside square icon buttons. Inline SVGs ensure they load with the page, scale perfectly at any size, and can be recoloured with CSS color. The buttons have a dark background that lightens on hover, providing visible interactivity without bright colour.\n\n**Newsletter form**\n\nThe [newsletter](/ui-snippets/newsletter-signup/) subscribe() function validates the email client-side before submission, shows a green confirmation message, and disables the input and button to prevent re-submission. In production this POSTs to an email service endpoint (Mailchimp, ConvertKit, Resend, or a custom API).\n\n**Hiring badge and contextual labels**\n\nThe Careers link in the Company column has a green "Hiring" badge — a small detail that drives qualified candidates directly from the footer and saves the marketing site team from building a separate recruitment banner. Contextual badge patterns like this are easy to add to any link.\n\n**Bottom bar**\n\nThe footer-bottom row contains the copyright notice, Sitemap and Accessibility links, and a [language selector](/ui-snippets/language-switcher/). These bottom-bar elements are separated from the main footer content by a border-top and kept in a flex row that wraps on small screens.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Replace the brand', text: 'Swap the ⚡ emoji for your logo SVG, update the brand name, and edit the description tagline to match your product.' },
      { title: 'Update the link columns', text: 'Edit the four link column sections (Product, Developers, Company, Legal) to match your site\'s navigation structure. Add or remove columns by adjusting the grid-template-columns value.' },
      { title: 'Connect social links', text: 'Replace the # hrefs with your actual Twitter, GitHub, and LinkedIn URLs. Add or remove social buttons by duplicating or deleting .social elements.' },
      { title: 'Wire the newsletter', text: 'In subscribe(), POST the validated email to your mailing list endpoint. The form already handles disabling after submit and showing a confirmation.' },
      { title: 'Update the copyright and language options', text: 'Change the year and company name in the copyright line. Update the language dropdown options to match the locales your site supports.' },
      { title: 'Export for your framework', text: 'Click "React" for a component with the newsletter form in useState. Click "Vue" for a Vue 3 SFC with reactive form state.' },
    ]},
    features: ['Two-zone layout: fixed brand column and fluid four-column link grid', 'Brand column with logo, description, social icons, and newsletter', 'Inline SVG social icons (Twitter/X, GitHub, LinkedIn) — no image requests', 'Newsletter form with email validation, confirmation message, and disable-after-submit', 'Four navigational link groups with hover colour transition', 'Contextual "Hiring" badge on the Careers link', 'Language/locale selector in the bottom bar', 'Responsive: two-column at tablet, stacked on mobile'],
    useCases: [
      { icon: 'APP', title: 'SaaS product and developer tool marketing site', desc: 'The mega footer is the standard footer pattern for B2B SaaS and developer tool sites. The four link groups cover Product, Developers, Company, and Legal — the four navigation pillars most SaaS products need. The brand column provides SEO-relevant descriptive text and social signals in a location search engines expect to find authoritative content.' },
      { icon: 'DESIGN', title: 'E-commerce site with department navigation', desc: 'Adapt the four link columns to e-commerce categories, customer service links, loyalty programme links, and store policies. The newsletter form captures email subscribers at the bottom of every page, typically achieving higher conversion rates than pop-ups because the intent is self-selected.' },
      { icon: 'CODE', title: 'Render link columns from a navigation config', desc: 'Replace the hardcoded anchor lists with a data-driven rendering: keep link groups as a JavaScript array of { heading, links[] } objects, and map over them to generate the columns. This makes the footer manageable via a single config file or a CMS, so marketing can update links without touching the component.' },
      { icon: 'FLOW', title: 'Documentation site footer with quick-access links', desc: 'Developer documentation sites (Stripe, Twilio, Vercel) use mega footers to link to key API references, SDKs, guides, and community resources. The Developers column is pre-populated with the right categories: API Reference, SDKs, Webhooks, CLI — making it immediately usable for a dev-tool docs site.' },
      { icon: 'LEARN', title: 'Study responsive grid and footer layout patterns', desc: 'The footer uses two nested CSS grids: the outer for brand-vs-links and the inner for the four link columns. The responsive collapse uses a media query to switch both grids to single-column and 2×2. This is a canonical example of nested grid layout and responsive column collapsing that transfers to any multi-column content structure.' },
      { icon: 'CHART', title: 'Newsletter acquisition at the bottom of every page', desc: 'Placing a newsletter form in the footer puts email capture on every page of your site without the conversion-rate cost of a pop-up or the maintenance of dedicated landing pages. The subscribe function is a drop-in for any email marketing API, making this the lowest-friction path to growing a subscriber list.' },
      { icon: 'CODE', title: 'Related: Footer with Mobile Accordion Collapse', desc: 'See the [Footer with Mobile Accordion Collapse](/ui-snippets/footer-accordion-mobile-collapse/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Status Bar Footer', desc: 'See the [Status Bar Footer](/ui-snippets/status-bar-footer/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add a fifth or sixth link column?', a: 'Change .link-cols { grid-template-columns: repeat(4, 1fr) } to repeat(5, 1fr) or repeat(6, 1fr). You may also need to narrow the brand column (from 340px to 280px) in the footer-inner grid to give the link grid more space. On mobile, the existing 2-column responsive breakpoint at 520px still works — extra columns just wrap into more rows.' },
      { q: 'How do I add my logo SVG instead of the emoji?', a: 'Replace the ⚡ text inside .brand-logo with an <svg> or <img> element. Set the SVG to width: 20px; height: 20px (or the natural aspect ratio) and fill: white for a white icon. The .brand-logo container already handles the size (34×34px) and background gradient, so the logo just needs to fit inside it.' },
      { q: 'How do I connect the newsletter to Mailchimp or ConvertKit?', a: 'In subscribe(), after validation passes, POST to your provider\'s API endpoint. For Mailchimp, POST to their /3.0/lists/{listId}/members endpoint with Authorization: apikey {key}. For ConvertKit, POST to their /v2/forms/{formId}/subscribe endpoint with api_key and email. Both APIs are CORS-restricted so the POST should go through a proxy (a serverless function or Next.js API route) rather than directly from the browser.' },
      { q: 'How do I build this in React?', a: 'Create a Footer component that accepts optional linkGroups and socialLinks as props (or hardcodes them as constants). Keep nlEmail and nlStatus in useState for the newsletter form. The link groups render from an array.map() — { heading, links: [{label, href}] }. The bottom bar is a separate div with the copyright string (derived from new Date().getFullYear()) and a static language select. The component has no side effects and no API calls, so no useEffect is needed. For the Tailwind version, click "Tailwind" to get the same markup with utility classes instead of a scoped stylesheet.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to trace the nested grid breakpoints by resizing the window repeatedly. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the outer footer-inner grid-template-columns of 340px 1fr collapses at the 900px media query, and how that interacts with the separate inner link-cols grid collapsing from four columns to two at the same breakpoint and to a 2x2 layout at 520px. The same assistant can help optimize it, for instance asking whether the hardcoded anchor lists for each link column should be refactored into a data array that both the component and a CMS could drive, to avoid editing raw markup every time a link changes. It is also useful for extending the footer: ask it to wire the subscribe() function to a real email-marketing API with a proxied CORS-safe request, add a dynamically generated copyright year, or make the language selector actually trigger a locale change. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "mega footer" in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- An outer two-column CSS grid with a fixed-width brand column (logo, name, description, inline SVG social icons, and a newsletter form) and a fluid column containing a four-column grid of link groups, each with a heading and a list of anchor links.
- The outer grid must collapse to a single stacked column at a defined tablet breakpoint, and independently, the inner four-column link grid must collapse to two columns at that same breakpoint and further to a different two-column arrangement at a narrower mobile breakpoint.
- A newsletter subscribe function that validates the entered email with a basic regex, shows a red inline error message for invalid or empty input without submitting anything, and on a valid email shows a green confirmation message while disabling both the input and the subscribe button so the same email cannot be submitted twice.
- At least one link in the link columns must carry a small contextual badge (e.g. a "Hiring" tag) styled distinctly from the surrounding link text, demonstrating how to attach a call-out to an individual navigation item without a separate component.
- A bottom bar, visually separated from the main footer content by a top border, containing a copyright line, secondary utility links, and a language/locale select dropdown, laid out in a flex row that wraps gracefully on narrow screens.
- All social icons must be inline SVG (not external image requests or an icon font), each sitting inside a square icon button with a background that visibly lightens on hover.`,
    },
  },
};
export default megaFooter;
