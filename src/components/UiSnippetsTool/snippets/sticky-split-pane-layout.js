const stickySplitPaneLayout = {
  id: 'sticky-split-pane-layout',
  title: 'Sticky Split-Pane Documentation Layout',
  lastmod: '2026-08-27',
  category: 'layouts',
  html: `<div class="demo">
  <div class="split-layout">
    <aside class="split-side">
      <div class="side-sticky">
        <h3>getUserSettings()</h3>
        <p>Fetches the current user's saved preferences from local storage, falling back to sensible defaults for any key that hasn't been set yet.</p>
        <div class="sig-block">
          <span class="sig-label">Signature</span>
          <code>getUserSettings(defaults?: object): Settings</code>
        </div>
        <div class="sig-block">
          <span class="sig-label">Returns</span>
          <code>Settings</code> — a merged object of stored and default values
        </div>
      </div>
    </aside>

    <main class="split-main">
      <section>
        <h4>Basic usage</h4>
        <p>Call with no arguments to read whatever is currently stored, merged over the library's built-in defaults.</p>
        <pre>const settings = getUserSettings();
console.log(settings.theme); // "light"</pre>
      </section>
      <section>
        <h4>Custom defaults</h4>
        <p>Pass a defaults object to override the library's built-in fallback values for any key.</p>
        <pre>const settings = getUserSettings({ theme: 'dark', fontSize: 16 });</pre>
      </section>
      <section>
        <h4>Reacting to changes</h4>
        <p>Settings updated elsewhere in the same tab are reflected immediately; updates from other tabs sync on the next call.</p>
        <pre>window.addEventListener('storage', () => {
  const fresh = getUserSettings();
  applyTheme(fresh.theme);
});</pre>
      </section>
      <section>
        <h4>Error handling</h4>
        <p>If localStorage is unavailable (private browsing, storage quota exceeded), getUserSettings silently falls back to defaults rather than throwing.</p>
        <pre>const settings = getUserSettings(); // never throws</pre>
      </section>
      <section>
        <h4>TypeScript usage</h4>
        <p>The Settings type is exported for consumers who want to extend or reference the shape directly.</p>
        <pre>import type { Settings } from './settings';
function applyTheme(s: Settings) { /* ... */ }</pre>
      </section>
    </main>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; }
.demo { max-width: 720px; margin: 0 auto; padding: 24px; }

.split-layout { display: grid; grid-template-columns: 220px 1fr; gap: 28px; height: 380px; }

.split-side { overflow: hidden; }
.side-sticky { position: sticky; top: 0; display: flex; flex-direction: column; gap: 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; }
.side-sticky h3 { font-size: 13.5px; font-weight: 800; color: #111827; font-family: ui-monospace, monospace; }
.side-sticky p { font-size: 11.5px; color: #64748b; line-height: 1.55; }

.sig-block { display: flex; flex-direction: column; gap: 4px; padding-top: 8px; border-top: 1px solid #f1f5f9; }
.sig-label { font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #94a3b8; }
.sig-block code { font-size: 11px; color: #4f46e5; font-family: ui-monospace, monospace; background: #eef2ff; padding: 4px 6px; border-radius: 5px; display: inline-block; word-break: break-word; }

.split-main { overflow-y: auto; display: flex; flex-direction: column; gap: 22px; padding-right: 6px; }
.split-main section { display: flex; flex-direction: column; gap: 8px; }
.split-main h4 { font-size: 13px; font-weight: 800; color: #111827; }
.split-main p { font-size: 12.5px; color: #64748b; line-height: 1.6; }
.split-main pre { background: #0f172a; color: #e2e8f0; font-size: 11.5px; font-family: ui-monospace, monospace; padding: 12px 14px; border-radius: 10px; overflow-x: auto; line-height: 1.6; }`,
  seo: {
    title: 'Sticky Split-Pane Documentation Layout — Independently Scrolling Panes with a Pinned Sidebar',
    description: 'A two-pane documentation layout where a summary sidebar stays pinned in view via position:sticky while the detailed content scrolls independently in its own container.',
    about: {
      title: 'Sticky Split-Pane Layout — Two Independently Scrolling Regions, One Pinned',
      description: `API documentation, reference pages, and settings screens often pair a short summary (a function signature, a field's constraints) with much longer detail content (usage examples, edge cases, related notes). This layout keeps the **summary always visible** while the longer content scrolls past it, using a combination that's easy to get subtly wrong: \`position: sticky\` only works correctly when its scroll container and containing block are set up in a specific way.

**Why the two panes need separate scroll containers**

\`.split-main\` has its own \`overflow-y: auto\` and a fixed \`height\` inherited from the parent \`.split-layout\` grid row — this makes it independently scrollable, distinct from the page's own scroll. \`.split-side\` deliberately has \`overflow: hidden\` (not \`auto\`) and no explicit height constraint of its own, so it doesn't create a second competing scroll context; instead, its child \`.side-sticky\` uses \`position: sticky; top: 0\` to stay pinned *within* the grid row's available height as the row itself doesn't scroll but the sibling \`.split-main\` does.

**The CSS Grid row height is what makes both panes agree on "the same space"**

\`.split-layout\` is a two-column CSS Grid with an explicit \`height: 380px\` — this single height applies to both grid tracks simultaneously, giving \`.split-main\` a concrete height to compute \`overflow-y: auto\` against, and giving \`.split-side\`'s sticky child a bounded area to stay pinned within. Without a shared explicit height on the grid container, \`position: sticky\` on the sidebar would have no meaningful "container" to stick relative to, since sticky positioning is scoped to the nearest scrolling ancestor and its own containing block — both of which need this grid row to actually constrain them.

**A common failure mode this layout avoids**

A frequent bug in split-pane layouts is applying \`overflow: hidden\` or \`auto\` somewhere in the ancestor chain *above* the sticky element without realizing it — \`position: sticky\` stops working (silently, with no error) if any ancestor between the sticky element and the actual scrolling container has its own overflow clipping that isn't the intended scroll context. This snippet keeps the ancestor chain deliberately simple: \`.split-side\` clips overflow (so its content can't spill into \`.split-main\`'s column) without becoming its own scroll container, and \`.side-sticky\`'s sticky positioning resolves against \`.split-layout\`'s grid row height correctly as a result.

**Where this genuinely earns its complexity**

This pattern is worth the setup specifically when a page has a short, glanceable summary that a reader wants to reference *while* scrolling through much longer supporting content — API reference docs, a product spec sheet next to detailed reviews, or a form field's constraints next to a long list of validation rules — rather than as a general-purpose two-column layout for content of roughly equal length, where independent scrolling adds complexity without a corresponding benefit.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Set an explicit height on the grid container', text: 'The .split-layout height is what both the sticky sidebar and the scrollable main pane compute their behavior against — remove it and sticky positioning breaks.' },
        { title: 'Keep .split-side as overflow:hidden, not overflow:auto', text: 'Giving the sidebar its own scrollbar would create a second competing scroll context instead of one clean sticky-within-the-grid-row behavior.' },
        { title: 'Put position:sticky on the inner content, not the column itself', text: 'The sticky behavior belongs on .side-sticky (the actual content block) so it can stick to top:0 within its parent column\'s bounds.' },
        { title: 'Add or remove sections in .split-main freely', text: 'The main pane scrolls independently regardless of how much content is inside it — the sidebar stays pinned throughout.' },
        { title: 'Adjust the grid-template-columns split', text: 'Change the 220px sidebar width or the 1fr main content ratio to fit your content\'s needs.' },
      ],
    },
    features: [
      'True independent scrolling — the sidebar stays pinned while only the main content pane scrolls',
      'Correct position:sticky setup avoiding the common "an ancestor\'s overflow silently breaks sticky" pitfall',
      'CSS Grid row height is the single shared constraint both panes compute their scroll/sticky behavior against',
      'Sidebar clips its own overflow without becoming a second, competing scroll container',
      'No JavaScript required — the entire layout and scroll behavior is pure CSS',
      'Realistic API-documentation content structure (signature card plus usage sections) demonstrates the pattern in context',
      'Scrollbar gutter reserved via padding-right on the main pane to avoid content shifting under a scrollbar',
      'Responsive-ready structure — the grid can collapse to a single column with a media query for narrow viewports',
    ],
    useCases: [
      { icon: 'DOCS', title: 'API Reference Documentation', desc: 'Keep a function\'s signature and summary visible while a reader scrolls through usage examples and notes.' },
      { icon: 'ECOM', title: 'Product Spec Sheets', desc: 'Pin key product specs while long-form reviews or detailed descriptions scroll alongside them.' },
      { icon: 'FORM', title: 'Form Field Reference Panels', desc: 'Keep a field\'s validation rules visible while scrolling through a long list of examples or edge cases.' },
      { icon: 'LEGAL', title: 'Annotated Legal / Contract Documents', desc: 'Pin a clause summary while the full legal text scrolls in the adjacent pane.' },
    ],
    faqs: [
      { q: 'Why doesn\'t position:sticky just work by adding it to any element?', a: 'Sticky positioning requires a bounded containing block and needs to be scoped correctly relative to its nearest scrolling ancestor — if any element between the sticky element and the intended scroll container has its own overflow clipping (even accidentally), sticky positioning silently stops working with no console warning, which is a very common real-world bug.' },
      { q: 'Why does .split-side use overflow:hidden instead of overflow:auto?', a: 'overflow:auto would make the sidebar its own independent scroll container, which is not what\'s wanted here — the sidebar\'s content is meant to stay pinned in place via sticky positioning, not to scroll on its own. overflow:hidden simply prevents its content from visually spilling outside its column without creating a second scrollbar.' },
      { q: 'Why is an explicit height required on .split-layout?', a: 'Both position:sticky on the sidebar and overflow-y:auto on the main pane need a concrete height to compute their behavior against. Without an explicit height on the shared grid container, the main pane would simply grow to fit its content instead of scrolling, and the sidebar would have no bounded row height to stick within.' },
      { q: 'Does the sidebar ever unstick and scroll away?', a: 'No — with top: 0 and no height constraint of its own beyond the grid row, .side-sticky stays pinned to the top of its column for as long as .split-main has more content to scroll through, which is the intended "always-visible summary" behavior.' },
      { q: 'Can I make this layout responsive for mobile?', a: 'Yes — add a media query that switches .split-layout to a single grid-template-columns: 1fr with auto height, and remove the sticky positioning and independent overflow at that breakpoint so the whole page scrolls normally with the sidebar content stacked above the main content.' },
      { q: 'Does this require any JavaScript?', a: 'No — the entire independent-scroll-plus-sticky-sidebar behavior is achieved purely through CSS Grid, position: sticky, and overflow properties, with zero JavaScript involved.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain exactly why position:sticky requires both a correctly-scoped containing block and an unbroken chain of non-clipping ancestors up to its scroll container, and to help debug a specific case where sticky positioning silently isn't working. It's also worth asking for a responsive variant that collapses to a single stacked column with the sidebar becoming non-sticky below a chosen breakpoint, or a three-pane variant (sticky sidebar, scrollable main content, sticky right-hand table of contents).`,
      prompt: `Build a two-pane documentation-style layout in HTML and CSS where a summary sidebar stays pinned in view while a separate main content pane scrolls independently beside it — no JavaScript, no external libraries.

Requirements:
- A CSS Grid container with two columns (a narrower sidebar and a wider main content area) and an explicit height, since both the sidebar's sticky behavior and the main pane's independent scrolling need a shared, bounded height to work against.
- The sidebar column must clip its own overflow without becoming a second independently-scrollable region — its inner content block should use position: sticky with top: 0 so it stays pinned at the top of its column as the page's focus content scrolls.
- The main content pane must scroll independently via its own overflow-y: auto, containing several longer sections of content (e.g. multiple usage examples) so there's genuinely more content than fits in the visible area.
- Structure the ancestor elements carefully so nothing between the sticky sidebar content and its intended scroll boundary accidentally clips or creates a competing scroll context, which is the most common way this kind of layout silently breaks.
- Include realistic example content (like an API reference: a function signature and description in the sidebar, several usage sections with code examples in the main pane) to demonstrate the pattern in a believable context.`,
    },
  },
};

export default stickySplitPaneLayout;
