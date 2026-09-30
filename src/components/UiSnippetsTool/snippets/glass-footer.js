const glassFooter = {
  id: 'glass-footer',
  title: 'Glass Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<div class="glf-page">
  <div class="glf-backdrop" aria-hidden="true"></div>
  <main class="glf-content"><p>↑ Page content sits above a colourful backdrop</p></main>

  <footer class="glf">
    <div class="glf-panel">
      <div class="glf-top">
        <span class="glf-brand">◆ Fluxly</span>
        <div class="glf-cols">
          <div class="glf-col"><h4>Product</h4><a href="#">Features</a><a href="#">Pricing</a><a href="#">Changelog</a></div>
          <div class="glf-col"><h4>Company</h4><a href="#">About</a><a href="#">Careers</a><a href="#">Blog</a></div>
          <div class="glf-col"><h4>Resources</h4><a href="#">Docs</a><a href="#">Support</a><a href="#">Status</a></div>
        </div>
      </div>
      <div class="glf-bottom">
        <span>© 2026 Fluxly, Inc.</span>
        <div class="glf-socials">
          <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
        </div>
      </div>
    </div>
  </footer>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif}

.glf-page{position:relative;min-height:100vh;overflow:hidden}
.glf-backdrop{position:absolute;inset:0;background:
  radial-gradient(circle at 15% 20%, #6366f1 0%, transparent 45%),
  radial-gradient(circle at 85% 15%, #ec4899 0%, transparent 45%),
  radial-gradient(circle at 50% 90%, #22d3ee 0%, transparent 50%),
  #0a0f1e;
  z-index:0}
.glf-content{position:relative;z-index:1;min-height:60vh;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.75);font-size:14px;padding:40px}

.glf{position:relative;z-index:1;padding:24px}
.glf-panel{max-width:900px;margin:0 auto;background:rgba(255,255,255,0.1);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.22);border-radius:20px;padding:36px 32px;box-shadow:0 20px 60px rgba(0,0,0,0.3)}

.glf-top{display:flex;justify-content:space-between;gap:32px;flex-wrap:wrap;padding-bottom:26px;border-bottom:1px solid rgba(255,255,255,0.18)}
.glf-brand{font-weight:800;color:#fff;font-size:17px;flex-shrink:0}
.glf-cols{display:flex;gap:40px;flex-wrap:wrap}
.glf-col{display:flex;flex-direction:column;gap:8px}
.glf-col h4{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:rgba(255,255,255,0.55);margin-bottom:2px}
.glf-col a{font-size:13.5px;color:rgba(255,255,255,0.85);text-decoration:none;transition:opacity .15s}
.glf-col a:hover{opacity:.65}

.glf-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:20px;gap:16px;flex-wrap:wrap}
.glf-bottom span{font-size:12.5px;color:rgba(255,255,255,0.6)}
.glf-socials{display:flex;gap:12px}
.glf-socials a{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;background:rgba(255,255,255,0.12);transition:background .15s}
.glf-socials a:hover{background:rgba(255,255,255,0.22)}

@media (max-width:640px){
  .glf-top{flex-direction:column;gap:22px}
  .glf-bottom{flex-direction:column;align-items:flex-start}
}

@supports not (backdrop-filter: blur(1px)){
  .glf-panel{background:rgba(15,23,42,0.85)}
}`,
  js: '',
  seo: {
    title: 'Glass Footer — Free HTML CSS Glassmorphism Footer Snippet',
    description: 'A frosted-glass footer panel floating over a colourful gradient backdrop — backdrop-filter blur, a translucent border, and a graceful fallback. No JavaScript, no dependency.',
    about: {
      title: 'Glass Footer — A Frosted Panel That Needs Something Behind It',
      description: `Glassmorphism only reads as glass when there's something worth blurring behind it — a flat, single-colour page background makes the effect invisible. This snippet pairs the frosted panel with the colourful, multi-blob gradient backdrop it needs, and floats the footer as a distinct rounded card rather than a full-width bar, which is what separates a genuine glass panel from a page section that merely has some transparency applied to it.

**Three ingredients, one on the panel**

The recipe is the same three CSS declarations behind every glass effect: \`background: rgba(255,255,255,0.1)\` for the translucent tint, \`backdrop-filter: blur(18px)\` (with the \`-webkit-\` prefix for Safari) to blur whatever sits behind the panel, and \`border: 1px solid rgba(255,255,255,0.22)\` to trace a faint, light-catching edge. All three live together on \`.glf-panel\`; remove any one and the "frosted" read collapses — background alone with no blur looks like a plain semi-transparent box, and blur with no border looks like it's floating with no defined edge.

**The backdrop is not decoration — it's the point**

\`.glf-backdrop\` is three overlapping \`radial-gradient\`s at different screen positions and colours (indigo, pink, cyan) over a dark base, covering the entire page behind the content. Without genuine colour and contrast variation behind the panel, \`backdrop-filter\` has nothing meaningful to blur and the glass effect simply won't be visible — this is the single most common reason a glassmorphism component looks broken when someone copies just the panel CSS without also copying something colourful to sit behind it.

**A footer that floats, rather than one that spans**

Unlike a conventional edge-to-edge footer bar, \`.glf-panel\` is capped at \`max-width: 900px\`, centred, and fully rounded — a discrete card resting on the page rather than a strip that touches both edges of the viewport. That choice is deliberate: a full-bleed glass panel loses the sense of "an object floating in front of the background" that makes the effect convincing, because there's no visible backdrop at its edges to contrast against.

**A real fallback for browsers without \`backdrop-filter\`**

\`@supports not (backdrop-filter: blur(1px))\` swaps the panel to a solid, opaque dark background for the small minority of browsers that don't support the filter. Without this, unsupported browsers would render a nearly-invisible, low-contrast panel with barely-readable light text over a bright gradient — worse than no glass effect at all. \`@supports\` is the correct progressive-enhancement tool here rather than a JavaScript feature-detection library, since it's a pure CSS query the browser resolves itself.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML and CSS', text: 'A gradient backdrop renders behind a frosted-glass footer panel — no JavaScript is used.' },
        { title: 'Replace the backdrop', text: 'Swap the radial-gradient blobs in .glf-backdrop for a photo, a different gradient, or your existing page background — the panel needs contrast and colour behind it to read as glass.' },
        { title: 'Tune the blur and tint', text: 'Adjust blur(18px) for a sharper or softer frost, and the 0.1 alpha on the panel background for a more or less opaque glass.' },
        { title: 'Update the footer content', text: 'Replace the brand, link columns, socials, and copyright with your own.' },
        { title: 'Verify the fallback', text: 'Check the @supports block renders a legible, opaque panel in browsers without backdrop-filter support.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'The complete three-property glassmorphism recipe: translucent background, backdrop-filter blur, faint border',
      'A genuinely colourful, multi-gradient backdrop for the blur to have visible effect on',
      'Footer rendered as a floating, rounded, max-width card rather than a full-bleed bar',
      '@supports fallback to a solid background for browsers without backdrop-filter',
      'Pure CSS — no JavaScript, no image assets, no dependency',
      'Fully responsive: link columns and bottom row stack cleanly below 640px',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Product pages with a colourful hero backdrop', desc: 'When a page already commits to a vibrant gradient or photo background, a glass footer continues that visual language instead of resetting to a flat colour block at the bottom.' },
      { icon: 'APP', title: 'AI and crypto product marketing sites', desc: 'Glassmorphism is a strong fit for the ambient, gradient-forward aesthetic common across AI tools and Web3 products.' },
      { icon: 'STAR', title: 'Event and conference landing pages', desc: 'A striking, modern footer treatment for a single-page event site where the whole page already leans into bold colour and depth.' },
      { icon: 'FLOW', title: 'Portfolio and creative agency sites', desc: 'Pairs naturally with a photography or illustration-heavy backdrop, letting the footer feel like part of the artwork rather than a bolted-on UI chrome.' },
      { icon: 'LEARN', title: 'Studying the glassmorphism technique', desc: 'A clear, minimal reference for the three CSS properties that make glass work, why each is necessary, and how to fall back gracefully when the browser can\'t render the blur.' },
      { icon: 'CODE', title: 'Design systems introducing a glass component', desc: 'A footer-scale example to validate a glass treatment before rolling backdrop-filter panels out across cards, modals, and navigation elsewhere in a product.' },
      { icon: 'CODE', title: 'Related: Command Bar Footer', desc: 'See the [Command Bar Footer](/ui-snippets/command-bar-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Social Magnet Footer', desc: 'See the [Social Magnet Footer](/ui-snippets/social-magnet-footer/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the glass effect look invisible when I remove the backdrop?', a: 'backdrop-filter: blur() blurs whatever is directly behind the element — on a flat single-colour background, there is nothing with enough contrast or colour variation to blur, so the panel just looks like a plain semi-transparent box. The gradient backdrop in this snippet is not decoration; it is required for the effect to read as glass at all.' },
      { q: 'What happens in browsers that don\'t support backdrop-filter?', a: 'An @supports not (backdrop-filter: blur(1px)) query swaps the panel to a solid, opaque dark background instead, keeping the light-coloured text readable. Without this fallback, unsupported browsers would render a barely-visible, low-contrast panel over the bright gradient.' },
      { q: 'Why is the footer a centred, rounded card instead of a full-width bar?', a: 'A discrete, max-width panel with visible backdrop around its edges reads as an object genuinely floating in front of the background. A full-bleed glass bar touching both edges of the viewport loses that contrast at its border and looks flatter.' },
      { q: 'Can I use a photo instead of a gradient as the backdrop?', a: 'Yes — replace .glf-backdrop\'s background with any image (via background-image or an <img> positioned behind the content). Photos with real colour and luminance variation often produce an even more convincing glass effect than gradients.' },
      { q: 'Is backdrop-filter expensive for performance?', a: 'It is more expensive than a plain background colour since the browser has to continuously sample and blur the layer(s) behind the element, but it is GPU-accelerated in modern browsers and fine for a single footer panel. Avoid stacking many overlapping blurred panels on one page if performance on lower-end devices matters.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. Since there is no JavaScript behaviour, the conversion is a direct markup and class-name translation with no state or lifecycle hooks required.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain, property by property, why removing the background tint, the blur, or the border each individually breaks the glass illusion in a different way — that's the fastest way to actually internalise the technique rather than treating it as a copy-paste recipe. It's also worth asking the assistant to audit text contrast: light, semi-transparent text over a variable, colourful backdrop is exactly the kind of case that can fail WCAG contrast checks depending on which part of the gradient sits behind a given word. For extending it, ask for a version where the backdrop gradient subtly animates (reusing the drift technique from an aurora background), or one that swaps to the @supports fallback background automatically based on a JavaScript feature-detection check instead of relying on the CSS query alone.`,
      prompt: `Build a "glassmorphism" website footer in plain HTML and CSS — no JavaScript, no image assets.

Requirements:
- A full-page absolutely positioned backdrop layer behind everything, built from three or more overlapping radial-gradient blobs in different saturated colours (e.g. indigo, pink, cyan) at different positions, over a dark base colour — this backdrop must have real colour and contrast variation for the glass effect to be visible at all.
- A footer containing a single centred, rounded, max-width panel (not a full-width bar) styled with the complete glassmorphism recipe: a low-opacity white background (around rgba(255,255,255,0.1)), backdrop-filter: blur(18px) with the -webkit- prefix for Safari, and a faint semi-transparent white border (around 1px, 20% opacity) to catch the light.
- Inside the panel, include a brand name, a small set of link columns with headings, a bottom row with a copyright string, and two social icon links — all styled in white/light text and icons with reduced opacity for hierarchy, since they sit against a variable-colour backdrop.
- Add an @supports not (backdrop-filter: blur(1px)) fallback that swaps the panel to a solid, opaque dark background for browsers that do not support the filter, keeping text legible.
- Make the panel's internal layout responsive: link columns and the bottom row should stack cleanly on narrow screens.
- Add a border-radius large enough (18-20px) that the panel reads as a distinct floating card resting on the backdrop.`,
    },
  },
};

export default glassFooter;
