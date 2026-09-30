const cardComponentLightDarkPreview = {
  id: 'card-component-light-dark-preview',
  title: 'Card Component Light/Dark Preview',
  lastmod: '2026-09-05',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="cp-row">
  <div class="cp-preview" data-theme="light">
    <span class="cp-preview-label">Light</span>
    <article class="cp-card">
      <div class="cp-avatar">MK</div>
      <h3>Maya Kessler</h3>
      <p class="cp-role">Product Designer</p>
      <p class="cp-bio">Designs interfaces for climate and energy startups. Based in Berlin.</p>
      <div class="cp-tags">
        <span class="cp-tag">Figma</span>
        <span class="cp-tag">Design Systems</span>
      </div>
      <button class="cp-btn">View profile</button>
    </article>
  </div>

  <div class="cp-preview" data-theme="dark">
    <span class="cp-preview-label">Dark</span>
    <article class="cp-card">
      <div class="cp-avatar">MK</div>
      <h3>Maya Kessler</h3>
      <p class="cp-role">Product Designer</p>
      <p class="cp-bio">Designs interfaces for climate and energy startups. Based in Berlin.</p>
      <div class="cp-tags">
        <span class="cp-tag">Figma</span>
        <span class="cp-tag">Design Systems</span>
      </div>
      <button class="cp-btn">View profile</button>
    </article>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.cp-row { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; }

.cp-preview {
  padding: 26px; border-radius: 18px; display: flex; flex-direction: column; align-items: center; gap: 14px;
  --cp-page: #f8fafc; --cp-surface: #ffffff; --cp-text: #1e293b; --cp-muted: #64748b; --cp-border: #e2e8f0; --cp-accent: #4f46e5; --cp-tag-bg: #eef2ff;
  background: var(--cp-page);
}
.cp-preview[data-theme="dark"] { --cp-page: #0f172a; --cp-surface: #1e293b; --cp-text: #f1f5f9; --cp-muted: #94a3b8; --cp-border: #334155; --cp-accent: #818cf8; --cp-tag-bg: #312e81; }

.cp-preview-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--cp-muted); }

.cp-card { width: 240px; background: var(--cp-surface); border: 1px solid var(--cp-border); border-radius: 16px; padding: 22px; text-align: center; color: var(--cp-text); }
.cp-avatar { width: 52px; height: 52px; border-radius: 50%; background: var(--cp-accent); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; margin: 0 auto 12px; }
.cp-card h3 { margin: 0 0 2px; font-size: 15px; }
.cp-role { margin: 0 0 10px; font-size: 12px; color: var(--cp-muted); font-weight: 600; }
.cp-bio { margin: 0 0 14px; font-size: 12px; color: var(--cp-muted); line-height: 1.6; }
.cp-tags { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
.cp-tag { background: var(--cp-tag-bg); color: var(--cp-accent); font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.cp-btn { width: 100%; background: var(--cp-accent); color: #fff; border: none; padding: 9px; border-radius: 9px; font-weight: 700; font-size: 12.5px; cursor: pointer; font-family: inherit; }

@media (max-width: 560px) {
  .cp-row { flex-direction: column; align-items: center; }
}`,
  js: `// This snippet is intentionally static: each preview wrapper carries its own
// fixed data-theme attribute ("light" or "dark"), and every color inside the
// card is a CSS custom property scoped to that wrapper. No JS toggle is
// needed to demonstrate both themes side by side -- the same card markup and
// stylesheet renders correctly under either attribute value simultaneously.`,
  seo: {
    title: 'Card Component Light/Dark Preview — Free HTML CSS JS Snippet',
    description: 'The same profile card rendered twice side-by-side under independently scoped light and dark theme attributes for direct visual comparison. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Card Component Light/Dark Preview — Side-by-Side Scoped Theme Comparison',
      description: `Reviewing a component's dark mode usually means flipping a global toggle back and forth and relying on memory to compare the two states. This snippet instead renders the identical card markup twice, each instance wrapped in its own preview container with a fixed \`data-theme\` attribute — "light" on one, "dark" on the other — so both variants are visible at the same time for direct, side-by-side comparison.\n\n**Scoped theming instead of a global switch**\n\nEach \`.cp-preview\` wrapper defines its own full set of CSS custom properties (surface, text, muted, border, accent, tag background), with the dark wrapper overriding all of them via a \`[data-theme="dark"]\` attribute selector scoped to that specific wrapper. Because the attribute lives on the wrapper rather than a shared ancestor like \`<html>\` or \`<body>\`, the two previews never interfere with each other — there is no global state to toggle, and no JavaScript is needed to produce the comparison at all.\n\n**Identical markup and CSS prove the theming actually works**\n\nBoth cards use byte-for-byte the same HTML structure and the same \`.cp-card\` CSS rules. The only difference between them is which custom-property values are in scope where they render — which is exactly the property a token-based design system is supposed to guarantee: components shouldn't need theme-specific markup or theme-specific CSS classes, only theme-scoped variable values.\n\n**Practical for design review and QA**\n\nThis pattern is directly useful for style-guide pages, design QA, and pull-request screenshots — anywhere a reviewer needs to confirm that a component reads correctly in both themes without manually toggling anything or trusting a memory of "how it looked a moment ago."`,
    },
    features: [
      'Identical card markup and CSS rendered twice under independently scoped data-theme attributes',
      'No JavaScript toggle required — both themes are visible simultaneously by default',
      'Each preview wrapper defines its own complete set of CSS custom properties',
      'Proves theme correctness by construction: the only difference between the two cards is variable scope',
      'Realistic profile card content: avatar, name, role, bio, tags, and a call-to-action button',
      'Responsive stacking of the two previews on narrow viewports',
      'Directly reusable pattern for style guides, design QA pages, and component documentation',
      'Zero global state — scoped attributes mean this pattern composes safely with any page-level theme system',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Design QA and style guides', desc: 'Verify a component renders correctly in both themes without toggling anything or relying on memory.' },
      { icon: 'CODE', title: 'Component documentation pages', desc: 'Show both theme variants of a component simultaneously in a Storybook-style reference page.' },
      { icon: 'LEARN', title: 'Teaching scoped CSS custom properties', desc: 'A clear, minimal example of theme scoping via an attribute on a wrapper rather than a global toggle.' },
      { icon: 'APP', title: 'Pull request screenshots and reviews', desc: 'Capture both light and dark renders of a component in one screenshot for reviewers.' },
    ],
    faqs: [
      { q: 'Why are there two separate cards instead of one card with a toggle?', a: 'The goal is direct visual comparison — seeing both themes at once rather than switching between them and relying on memory. Each preview wrapper carries its own fixed data-theme attribute so both render permanently in their respective themes.' },
      { q: 'How does theme scoping work without any global state?', a: 'Each .cp-preview wrapper defines its own set of CSS custom properties, and a [data-theme="dark"] attribute selector scoped to that same wrapper overrides them. Since the attribute lives on the wrapper itself rather than a shared ancestor, the two previews never affect each other.' },
      { q: 'Is the card component itself theme-aware?', a: 'The card\'s own CSS rules never reference "light" or "dark" directly — they only reference custom properties via var(). This is what proves the same component markup and stylesheet correctly adapts to whichever theme context it happens to be rendered inside.' },
      { q: 'Can I use this to compare more than two themes?', a: 'Yes — duplicate a .cp-preview block, give it a distinct data-theme value (e.g. "high-contrast"), and add a matching CSS override block redefining the same custom properties for that value.' },
    ],
  },
};

export default cardComponentLightDarkPreview;
