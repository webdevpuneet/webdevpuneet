const minimalFooter = {
  id: 'minimal-footer',
  title: 'Minimal Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<div class="mnf-page">
  <main class="mnf-content"><p>↑ Page content above the footer</p></main>
  <footer class="mnf">
    <div class="mnf-inner">
      <a href="#" class="mnf-brand"><span class="mnf-mark">◆</span> Fluxly</a>
      <nav class="mnf-links" aria-label="Footer">
        <a href="#">Product</a>
        <a href="#">Pricing</a>
        <a href="#">Docs</a>
        <a href="#">Contact</a>
      </nav>
      <div class="mnf-right">
        <a href="#" class="mnf-icon" aria-label="Twitter"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        <a href="#" class="mnf-icon" aria-label="GitHub"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
        <span class="mnf-copy">© 2026 Fluxly</span>
      </div>
    </div>
  </footer>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a}
.mnf-page{min-height:100vh;display:flex;flex-direction:column}
.mnf-content{flex:1;display:flex;align-items:center;justify-content:center;color:#475569;font-size:13px;padding:40px}

.mnf{border-top:1px solid rgba(255,255,255,0.08)}
.mnf-inner{max-width:960px;margin:0 auto;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}

.mnf-brand{display:flex;align-items:center;gap:7px;color:#f1f5f9;font-weight:800;font-size:15px;text-decoration:none;letter-spacing:-.01em}
.mnf-mark{color:#818cf8}

.mnf-links{display:flex;gap:22px;flex-wrap:wrap}
.mnf-links a{color:#94a3b8;font-size:13px;text-decoration:none;transition:color .15s}
.mnf-links a:hover{color:#f1f5f9}

.mnf-right{display:flex;align-items:center;gap:14px}
.mnf-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#64748b;background:rgba(255,255,255,0.04);transition:color .15s,background .15s}
.mnf-icon:hover{color:#f1f5f9;background:rgba(255,255,255,0.08)}
.mnf-copy{color:#475569;font-size:12px;white-space:nowrap}

@media (max-width:640px){
  .mnf-inner{flex-direction:column;align-items:flex-start}
  .mnf-right{width:100%;justify-content:space-between}
}`,
  js: '',
  seo: {
    title: 'Minimal Footer — Free HTML CSS One-Row Footer Snippet',
    description: 'A single-row footer — logo, four links, two social icons, copyright — that stays out of the way. Pure CSS, no JavaScript. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Minimal Footer — The One-Row Case Against the Mega-Footer',
      description: `Most footers exist because nobody decided what belonged in them, so everything did — a link directory, a newsletter box, five social icons, a brand blurb, a language switcher. This snippet is the deliberate opposite: one row, three groups, done. It exists to make the point that a footer's job is usually just "confirm the page is over and offer four exits," and a four-column mega-footer is often solving a navigation problem the site doesn't actually have.

**One flex row, three groups, no wrapper divs beyond what's needed**

The whole footer is \`.mnf-inner { display: flex; align-items: center; justify-content: space-between }\` holding exactly three children: the brand mark, a \`<nav>\` of links, and a right-hand cluster of two social icons plus the copyright string. \`justify-content: space-between\` pushes brand to one edge and the icon cluster to the other with the nav links floating in the middle — no manual margins, no grid template, no breakpoint math for three groups that just need to spread out.

**Why the nav is a real \`<nav>\` and not a \`<div>\`**

Screen readers announce a \`<nav aria-label="Footer">\` as a landmark, which matters more here than in a page's primary navigation — a footer nav is easy to skip past silently if it's just a bag of anchor tags, and the landmark is what lets assistive tech jump straight to "the other nav" without reading every link on the page first.

**The one responsive rule that matters**

Below 640px, the row simply stacks: \`flex-direction: column\` on the container, and the icon cluster gets \`justify-content: space-between\` so the social icons and copyright don't collapse into a single crowded line. That's the entire mobile treatment — three media query lines, because there's nothing else to collapse, accordion, or hide. A footer this small doesn't need a hamburger for itself.

**When this is the wrong footer**

If your site genuinely has forty pages a user might want from any page — documentation, a blog, a changelog, legal pages, regional sites — a real link directory (see the [mega footer](/ui-snippets/mega-footer/)) is doing honest work and this snippet is too thin for the job. This one is for marketing sites, small SaaS products, and personal sites where the real navigation already lives in the header and the footer's only remaining job is closure.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML and CSS', text: 'A single-row footer renders — no JavaScript is used, so there is no JS panel to add.' },
        { title: 'Swap the brand and links', text: 'Replace the brand text and the four anchor hrefs/labels inside .mnf-links with your own.' },
        { title: 'Replace or extend the icons', text: 'Each .mnf-icon wraps one inline SVG — swap the path data or add a third icon; the flex row absorbs it automatically.' },
        { title: 'Check the mobile stack', text: 'Resize below 640px to confirm the row collapses into a clean stack rather than wrapping mid-sentence.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'Single flex row with justify-content: space-between — no grid, no manual spacing',
      'Real <nav aria-label="Footer"> landmark for screen-reader users to skip to',
      'Pure CSS and HTML — zero JavaScript, zero layout shift',
      'Two inline SVG social icons with hover background and colour states',
      'One clean breakpoint at 640px that stacks the row without wrapping mid-group',
      'Every colour, gap and icon is a direct CSS edit — no build step',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Marketing and landing pages', desc: 'When the header already carries the real navigation, the footer only needs to confirm the page has ended and offer a couple of exits — not repeat the whole sitemap.' },
      { icon: 'APP', title: 'Small SaaS products and dashboards', desc: 'Internal or lightly-marketed products rarely need a link directory in the footer; a brand mark, three links, and a copyright line is proportionate.' },
      { icon: 'MOBILE', title: 'Portfolio and personal sites', desc: 'A quiet closing row that does not compete with the work above it, with social links positioned exactly where visitors expect to find them.' },
      { icon: 'LEARN', title: 'Teaching flexbox spacing', desc: 'A clean, real-world example of justify-content: space-between solving a three-group layout without a single manual margin.' },
      { icon: 'CODE', title: 'Documentation and changelog pages', desc: 'Content-first pages where a heavy footer would visually compete with the reading experience below the fold.' },
      { icon: 'FLOW', title: 'A/B testing footer weight', desc: 'Swap this in against a mega-footer to see whether a lighter footer changes scroll depth or exit-link click-through on a given page template.' },
      { icon: 'CODE', title: 'Related: Footer Live System-Status Indicator', desc: 'See the [Footer Live System-Status Indicator](/ui-snippets/footer-live-status-indicator/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Status Bar Footer', desc: 'See the [Status Bar Footer](/ui-snippets/status-bar-footer/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the link list wrapped in <nav> instead of a plain <div>?', a: '<nav aria-label="Footer"> is announced as a navigation landmark by screen readers, letting users jump directly to the footer links instead of reading through every other element on the page first. A <div> of anchors carries no such landmark.' },
      { q: 'Does this footer need any JavaScript?', a: 'No — the entire component is HTML and CSS. There is nothing state-dependent in a one-row footer, so there is no JS panel to export or maintain.' },
      { q: 'How do I add a fourth or fifth social icon?', a: 'Copy an existing .mnf-icon anchor, swap its inline SVG path data and aria-label, and place it inside .mnf-right. The flex row absorbs additional icons automatically without any layout changes.' },
      { q: 'When should I use the mega-footer instead of this one?', a: 'If your site has real depth — documentation, a blog, multiple product lines, legal pages, regional variants — a full link-directory footer like the mega footer is doing genuine navigational work. This minimal footer is for sites where the header already carries that responsibility.' },
      { q: 'Will the row wrap awkwardly on a narrow screen?', a: 'No — below 640px the row switches to flex-direction: column and the right-hand cluster gets its own justify-content: space-between, so it stacks into three clean groups rather than wrapping words mid-line.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Click JSX, Vue, or Angular to download the converted component — since there is no JavaScript behaviour, the conversion is a straightforward markup and class-name translation with no lifecycle hooks needed.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is small enough that an AI assistant is more useful for judgment calls than for generating more code. Paste the HTML and CSS into an assistant like Claude and ask it whether a one-row footer is actually the right choice for your specific site, given how many distinct sections or pages you have — the honest answer for a large content site may well be "no, use a real link directory instead." It is also a good candidate for accessibility review: ask it to check colour contrast on the muted link and copyright text against the dark background, and whether the icon-only social links need more explicit labelling for assistive technology than the current aria-label attributes provide. For extending it, ask for a version with a locale/language switcher added as a fourth group, or one that swaps the flex row for CSS Grid so the three groups can be independently reordered per breakpoint.`,
      prompt: `Build a minimal, single-row site footer in plain HTML and CSS only — no JavaScript.

Requirements:
- A .mnf-inner flex container with align-items: center and justify-content: space-between, holding exactly three groups: a brand mark on the left, a semantic <nav aria-label="Footer"> of four links in the middle, and a right-hand cluster of two inline-SVG social icon links plus a copyright string.
- Give the nav links and the copyright text a muted colour against a dark background, with the links brightening to a light colour on hover via a CSS transition — no underline.
- Style each social icon as a small rounded square with a faint background that darkens/brightens on hover, sized around 30x30px, using currentColor SVGs so recolouring is a single CSS property change.
- Add exactly one responsive rule: below 640px, stack the row into a column, and keep the right-hand cluster's icons and copyright spread apart with their own justify-content: space-between rather than left-aligning everything.
- Keep the whole thing to a handful of CSS rules — no grid template, no JavaScript, no more than one breakpoint — since the point of the component is demonstrating that a footer does not have to be heavy to be complete.`,
    },
  },
};

export default minimalFooter;
