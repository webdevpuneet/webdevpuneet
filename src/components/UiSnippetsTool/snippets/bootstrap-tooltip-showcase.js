const bootstrapTooltipShowcase = {
  id: 'bootstrap-tooltip-showcase',
  title: 'Bootstrap Tooltip Showcase',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <h1 class="bstip-title">Hover any button</h1>
  <p class="text-muted small mb-4">Real Bootstrap tooltips, initialized once in JavaScript from a data attribute.</p>
  <div class="d-flex flex-wrap gap-3 justify-content-center">
    <button class="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Appears above">Top</button>
    <button class="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" title="Appears to the right">Right</button>
    <button class="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Appears below">Bottom</button>
    <button class="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="left" title="Appears to the left">Left</button>
    <button class="btn btn-outline-dark" data-bs-toggle="tooltip" data-bs-html="true" title="<strong>Bold</strong> HTML content">HTML content</button>
    <button class="btn btn-primary" data-bs-toggle="tooltip" title="Click me to save your changes">Save</button>
  </div>
  <p class="text-muted small mt-4">Tooltips initialized: <strong id="bstipCount">0</strong></p>
</div>`,
  css: `.bstip-title { font-weight: 800; letter-spacing: -0.01em; }`,
  js: `// Bootstrap does not auto-initialize tooltips — every [data-bs-toggle="tooltip"]
// element needs an explicit new bootstrap.Tooltip(el) call, unlike Modal/Collapse/
// Dropdown which wire themselves up automatically from their own data attributes.
const triggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltips = [...triggers].map(el => new bootstrap.Tooltip(el));
document.getElementById('bstipCount').textContent = tooltips.length;`,

  seo: {
    title: 'Bootstrap Tooltip Showcase — Free Snippet',
    description: 'Real Bootstrap 5.3 tooltips in every placement, explicitly initialized in JavaScript — the one Bootstrap component that never wires itself up automatically.',
    about: {
      title: 'Bootstrap Tooltip Showcase — HTML, CSS & JavaScript',
      description: `Most Bootstrap components — Modal, Collapse, Dropdown, Tab — wire themselves up automatically the instant \`bootstrap.bundle.min.js\` loads, just from their \`data-bs-toggle\` attribute. **Tooltip is the one common exception.** This snippet shows the full, correct pattern: every element carrying \`data-bs-toggle="tooltip"\` still needs an explicit \`new bootstrap.Tooltip(el)\` call before it will ever show up, which is the single most common "why doesn't this tooltip work" mistake in real Bootstrap projects.\n\nThe six examples cover every cardinal placement (\`data-bs-placement\`), a tooltip rendering **HTML content** via \`data-bs-html="true"\` — which requires explicitly opting in, since raw HTML in a tooltip is disabled by default as an XSS precaution — and a tooltip on a primary action button, the most common real-world placement.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads six buttons and a count of initialized tooltips.' },
        { title: 'Hover each button', text: 'Each shows Bootstrap\'s real tooltip in a different placement — top, right, bottom, left.' },
        { title: 'Hover "HTML content"', text: 'Its tooltip renders the bold text as actual formatting, not escaped text, because of data-bs-html="true".' },
        { title: 'Add a tooltip to your own button', text: 'Add data-bs-toggle="tooltip" and a title attribute to any element, then add it to the JS panel\'s querySelectorAll selector — or just re-query on load, which already includes it.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Tooltip component, explicitly initialized — the correct, required pattern',
      'All four cardinal placements demonstrated: top, right, bottom, left',
      'HTML-content tooltip shown correctly via the required data-bs-html="true" opt-in',
      'A live count confirms exactly how many tooltip instances were created',
      'Query-all-and-map pattern scales to any number of tooltip triggers on a page',
      'No custom tooltip library — this is Bootstrap\'s own Popper-powered component',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Learning why your Bootstrap tooltips don\'t appear', desc: 'The single most common Bootstrap support question — forgetting the explicit new bootstrap.Tooltip() initialization — solved and demonstrated directly.' },
      { icon: 'ACCESS', title: 'Icon-only buttons needing a text label', desc: 'A tooltip is the standard way to give an icon-only button (like an admin panel\'s action icons) an accessible, visible label on hover.' },
      { icon: 'FORM',   title: 'Form fields with inline help text', desc: 'Attach a tooltip to a form label or a small info icon next to a field for contextual help without cluttering the layout.' },
      { icon: 'CODE',   title: 'Any UI needing consistent hover explanations', desc: 'Reuse the query-all-and-initialize pattern anywhere multiple tooltip triggers exist on one page.' },
    ],
    faqs: [
      { q: 'Why do I need JavaScript for tooltips but not for modals?', a: 'Bootstrap\'s Modal, Collapse, Dropdown, and Tab components self-initialize from their data-bs-toggle attribute alone. Tooltip and Popover are the exceptions — the library requires an explicit new bootstrap.Tooltip(element) call per element, by design, since auto-initializing every tooltip on a page could be expensive on content-heavy pages.' },
      { q: 'How do I show HTML (like bold text or a link) inside a tooltip?', a: 'Add data-bs-html="true" to the trigger element. Without it, Bootstrap escapes the title content as plain text for security, so any markup would show as literal angle brackets instead of rendering.' },
      { q: 'Can I change how long a visitor must hover before the tooltip appears?', a: 'Yes — pass a delay option to the constructor, e.g. new bootstrap.Tooltip(el, { delay: { show: 300, hide: 100 } }), instead of the default near-instant show.' },
      { q: 'Do tooltips work on touch devices?', a: 'Bootstrap tooltips trigger on hover and focus by default, which touch devices approximate via tap-and-hold or focus in some browsers, but the experience is less consistent than on desktop — consider a different pattern (like a Popover on click) for primarily touch-driven interfaces.' },
      { q: 'What happens if I forget the data-bs-html attribute but pass HTML anyway?', a: 'Bootstrap renders it as escaped, literal text — you would see the actual angle brackets and tag names in the tooltip instead of formatted content, which is a safe default rather than a silent failure.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a custom delay and animation duration, or to build a small reusable helper function that auto-initializes every tooltip on a page including ones added dynamically later. It's also a good exercise to ask the assistant to explain Popper.js's role in Bootstrap's Tooltip and Popover positioning.`,
      prompt: `Build a Bootstrap 5.3 tooltip showcase, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- At least four buttons, each with data-bs-toggle="tooltip" and a title attribute, one for each of Bootstrap's cardinal placements via data-bs-placement (top, right, bottom, left).
- One additional button demonstrating an HTML-content tooltip using data-bs-html="true" with bold or otherwise formatted text in its title.
- In JavaScript, explicitly initialize every tooltip trigger with new bootstrap.Tooltip(element) — do not rely on automatic initialization, since Bootstrap's Tooltip component requires this explicit step unlike Modal or Dropdown.
- Display a count of how many tooltip instances were successfully initialized, to make the explicit-initialization step visibly confirmed rather than just assumed.`,
    },
  },
};

export default bootstrapTooltipShowcase;
