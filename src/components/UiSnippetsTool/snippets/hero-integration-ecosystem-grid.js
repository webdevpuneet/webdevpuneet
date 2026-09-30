const heroIntegrationEcosystemGrid = {
  id: 'hero-integration-ecosystem-grid',
  title: 'Hero with Integration Ecosystem Grid',
  lastmod: '2026-08-31',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="ieg-hero">
  <div class="ieg-copy">
    <span class="ieg-eyebrow">200+ integrations</span>
    <h1 class="ieg-h1">Plugs into the tools your team already lives in</h1>
    <p class="ieg-sub">Connect your CRM, calendar, chat, and data warehouse in a couple of clicks. No custom middleware, no brittle Zapier chains.</p>
    <div class="ieg-search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="iegSearch" placeholder="Search integrations e.g. Slack, Salesforce...">
    </div>
    <p class="ieg-count"><span id="iegCount">18</span> integrations shown</p>
  </div>

  <div class="ieg-visual">
    <div class="ieg-hub">
      <span>Core</span>
    </div>
    <div class="ieg-grid" id="iegGrid">
      <div class="ieg-node" data-name="Slack">Slack</div>
      <div class="ieg-node" data-name="Salesforce">Salesforce</div>
      <div class="ieg-node" data-name="Notion">Notion</div>
      <div class="ieg-node" data-name="Google Calendar">Calendar</div>
      <div class="ieg-node" data-name="HubSpot">HubSpot</div>
      <div class="ieg-node" data-name="Zendesk">Zendesk</div>
      <div class="ieg-node" data-name="Jira">Jira</div>
      <div class="ieg-node" data-name="Snowflake">Snowflake</div>
      <div class="ieg-node" data-name="Stripe">Stripe</div>
      <div class="ieg-node" data-name="Figma">Figma</div>
      <div class="ieg-node" data-name="GitHub">GitHub</div>
      <div class="ieg-node" data-name="Zoom">Zoom</div>
      <div class="ieg-node" data-name="Airtable">Airtable</div>
      <div class="ieg-node" data-name="Segment">Segment</div>
      <div class="ieg-node" data-name="Intercom">Intercom</div>
      <div class="ieg-node" data-name="Looker">Looker</div>
      <div class="ieg-node" data-name="Asana">Asana</div>
      <div class="ieg-node" data-name="Mailchimp">Mailchimp</div>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c1220;color:#eef1fb}
.ieg-hero{display:grid;grid-template-columns:1fr 1.1fr;gap:48px;max-width:1140px;margin:0 auto;padding:72px 24px;align-items:center}

.ieg-eyebrow{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.04em;color:#7dd3fc;background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.25);padding:6px 12px;border-radius:99px;margin-bottom:20px}
.ieg-h1{font-size:clamp(28px,4vw,42px);font-weight:800;line-height:1.15;letter-spacing:-.02em;margin-bottom:16px}
.ieg-sub{font-size:15px;color:#9aa3c0;line-height:1.65;margin-bottom:26px;max-width:440px}

.ieg-search{display:flex;align-items:center;gap:10px;background:#161d30;border:1.5px solid #262e48;border-radius:12px;padding:12px 16px;max-width:400px;transition:border-color .15s}
.ieg-search:focus-within{border-color:#38bdf8}
.ieg-search svg{color:#6b7394;flex-shrink:0}
.ieg-search input{flex:1;background:none;border:none;outline:none;color:#eef1fb;font-size:14px;font-family:inherit}
.ieg-search input::placeholder{color:#5b6284}
.ieg-count{font-size:12.5px;color:#6b7394;margin-top:10px;font-weight:600}

.ieg-visual{position:relative;display:flex;align-items:center;justify-content:center;min-height:380px}
.ieg-hub{position:absolute;z-index:2;width:74px;height:74px;border-radius:50%;background:linear-gradient(135deg,#38bdf8,#6366f1);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;box-shadow:0 0 0 10px rgba(56,189,248,.08),0 20px 50px rgba(56,189,248,.3)}

.ieg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:100%;max-width:420px;position:relative;z-index:1}
.ieg-node{background:#161d30;border:1.5px solid #262e48;border-radius:12px;padding:14px 8px;text-align:center;font-size:11.5px;font-weight:700;color:#c3c9e4;cursor:default;transition:opacity .2s,transform .2s,border-color .2s,filter .2s}
.ieg-node.ieg-node-hidden{opacity:0;transform:scale(.7);pointer-events:none;position:absolute}
.ieg-node.ieg-node-match{border-color:#38bdf8;color:#fff;filter:drop-shadow(0 0 10px rgba(56,189,248,.35))}
.ieg-node:not(.ieg-node-hidden):hover{transform:translateY(-3px);border-color:#38bdf8}

@media(max-width:840px){
  .ieg-hero{grid-template-columns:1fr;gap:36px;padding:48px 20px}
  .ieg-visual{min-height:0;margin-top:8px}
}`,

  js: `// Live-filters the integration grid as you type. Non-matching nodes are
// visually removed via a hidden class (opacity+scale, then pulled out of flow)
// rather than deleted from the DOM, so the grid can restore them instantly.
var searchInput = document.getElementById('iegSearch');
var nodes = Array.prototype.slice.call(document.querySelectorAll('.ieg-node'));
var countEl = document.getElementById('iegCount');

function applyFilter() {
  var query = searchInput.value.trim().toLowerCase();
  var visibleCount = 0;

  nodes.forEach(function (node) {
    var name = (node.getAttribute('data-name') || '').toLowerCase();
    var matches = query === '' || name.indexOf(query) !== -1;

    node.classList.toggle('ieg-node-hidden', !matches);
    node.classList.toggle('ieg-node-match', matches && query !== '');

    if (matches) visibleCount++;
  });

  countEl.textContent = String(visibleCount);
}

searchInput.addEventListener('input', applyFilter);
applyFilter();`,

  seo: {
    title: 'Hero with Integration Ecosystem Grid — Free HTML CSS JS Snippet',
    description: 'A developer-tool hero section built around a searchable grid of integration logos radiating from a central "core" hub, filtering live as you type. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Integration Ecosystem Hero — Live-Searchable Integration Grid Around a Central Hub',
      description: `A wall of integration logos communicates breadth, but it doesn't let a visitor confirm the one tool they actually care about is there. This hero pairs a headline and CTA with a hub-and-grid visual — a glowing central "core" node surrounded by a grid of integration tiles — and a real search input that filters the grid live as a visitor types, turning a passive logo wall into a quick yes/no answer.

**Filtering by attribute, not by re-rendering the DOM**

\`applyFilter()\` never removes or recreates any \`.ieg-node\` element. Instead it reads each node's \`data-name\` attribute, lowercases both it and the query, and toggles two classes based on a simple \`indexOf\` substring match. Keeping every node permanently in the DOM means there's no re-render cost and no risk of losing element state (like a hover or focus outline) — filtering is purely a class toggle applied to elements that already exist.

**Two classes, two distinct jobs**

\`.ieg-node-hidden\` handles non-matches: it fades and shrinks the tile via \`opacity\`/\`transform: scale\`, then switches to \`position: absolute\` so it's pulled out of the grid's flow and doesn't leave a visible gap. \`.ieg-node-match\` handles the opposite case — it only applies when there's an active, non-empty query, highlighting matching tiles with a colored border and glow so a visitor gets clear positive confirmation rather than just "everything else disappeared."

**Live count reflects the filtered result, not the total**

\`countEl.textContent\` is updated inside the same loop that classifies each node, incrementing \`visibleCount\` only for matches. This keeps the "X integrations shown" line perfectly accurate to what's currently visible in the grid — including the un-filtered case, where every node counts as a match and the number equals the full list.

**Why an empty query does not apply the match-highlight style**

The \`matches && query !== ''\` condition in the \`.ieg-node-match\` toggle deliberately excludes the empty-query case — otherwise every tile in the grid would carry the "highlighted match" glow simultaneously as soon as the page loads, which would look like a rendering bug rather than intentional design. The highlight only appears once a visitor has actually typed something and narrowed the results.

**The hub is a purely visual anchor, not interactive**

\`.ieg-hub\` sits absolutely centered behind the grid with a radial glow, representing "your product" as the thing every integration connects to. It has no click handler or filter logic tied to it — its only job is to give the surrounding grid of tiles a visual center of gravity so the composition reads as "ecosystem" rather than "list."

**Customizing it**

Add more integrations by adding \`.ieg-node\` divs with a \`data-name\` attribute to \`#iegGrid\` — \`applyFilter()\` re-queries \`.ieg-node\` on page load via \`querySelectorAll\`, so any node present in the HTML is automatically included in filtering with no JavaScript changes. Swap the plain-text tiles for real logo \`<img>\` tags by adding an image inside each \`.ieg-node\` div while keeping the \`data-name\` attribute for search matching.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type into the search box', text: 'Try "sla" or "fig" — matching tiles highlight with a glow while non-matches fade out instantly.' },
        { title: 'Clear the search', text: 'Emptying the input restores the full grid with no highlight applied to any tile.' },
        { title: 'Watch the live count', text: 'The "X integrations shown" line updates to match exactly what is visible in the grid.' },
        { title: 'Add a new integration tile', text: 'Copy an .ieg-node div in the HTML panel, set its data-name and label — search picks it up automatically.' },
        { title: 'Swap in real logos', text: 'Replace each tile\'s text content with an img tag while keeping the data-name attribute intact.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Live substring search filters the integration grid as you type, no submit button',
      'Nodes are hidden via class toggling, never removed from the DOM, for zero re-render cost',
      'Separate hidden and match classes handle fading non-matches and highlighting matches',
      'Match highlight only applies once a real query is typed, not on initial page load',
      'Live "X integrations shown" count stays accurate to the currently filtered set',
      'Central glowing hub node gives the grid a visual ecosystem anchor',
      'data-name attribute drives search independent of the visible tile label',
      'No search or fuzzy-matching library — plain indexOf substring matching',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Developer tool and API platform homepages', desc: 'Let a visitor confirm their specific stack is supported instead of scanning a static logo wall.' },
      { icon: 'FLOW', title: 'Integrations and app marketplace landing pages', desc: 'Pair with a full [integration cards](/ui-snippets/integration-cards/) directory page linked from the search result count.' },
      { icon: 'FORM', title: 'Sales and RFP-facing product pages', desc: 'Give prospects a fast way to verify compatibility with their existing tools during evaluation.' },
      { icon: 'LEARN', title: 'Learn attribute-driven client-side filtering', desc: 'Study how data-name plus class toggling filters a grid without touching the DOM structure.' },
      { icon: 'DESIGN', title: 'Workflow automation and no-code platform pages', desc: 'Reuse the hub-and-grid visual to communicate "connects everything" for automation-focused products.' },
      { icon: 'CODE', title: 'Related: Social Proof Logos Hero', desc: 'See the [Social Proof Logos Hero](/ui-snippets/hero-social-proof-logos/) for a simpler static-logo-strip alternative.' },
    ],
    faqs: [
      { q: 'Does the search filter integrations by exact match or substring?', a: 'Substring match, case-insensitive. applyFilter() lowercases both the typed query and each node\'s data-name attribute and checks name.indexOf(query) !== -1, so typing "sla" matches "Slack" anywhere the letters appear in sequence, not just at the start.' },
      { q: 'Why do hidden nodes disappear instead of just being greyed out?', a: 'The .ieg-node-hidden class combines opacity: 0, a scale-down transform, and position: absolute. The first two create a smooth fade-out transition, and switching to absolute positioning pulls the tile out of the grid\'s normal flow afterward so the remaining matched tiles reflow into a clean grid instead of leaving empty gaps.' },
      { q: 'Why does every tile not highlight when the search box is empty?', a: 'The match-highlight class is only applied when matches && query !== \'\' — the query !== \'\' check specifically excludes the empty-input case. Without it, every tile would carry the highlighted-match glow style as soon as the page loads, which reads as a rendering bug rather than intentional feedback.' },
      { q: 'How is the "X integrations shown" count kept accurate?', a: 'countEl.textContent is set inside the same applyFilter() loop that classifies every node, incrementing a visibleCount variable only when a node counts as a match. Because it runs on every keystroke via the input event listener, the displayed number always reflects exactly what is currently visible in the grid.' },
      { q: 'How do I add a new integration to the grid?', a: 'Add a new div with class ieg-node and a data-name attribute (e.g. data-name="Linear") inside the #iegGrid container in the HTML panel. Because nodes are re-queried via document.querySelectorAll(\'.ieg-node\') and applyFilter() runs generically over whatever it finds, no JavaScript changes are needed for the new tile to be included in search.' },
      { q: 'Can I replace the text tiles with real logo images?', a: 'Yes. Keep the data-name attribute on each .ieg-node div (search matching depends on it) but replace its text content with an img tag pointing at the integration\'s logo, sized to fit within the existing tile padding.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the class-toggling logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why applyFilter() uses two separate classes (one for hiding non-matches, one for highlighting matches) instead of a single toggle, and why the match-highlight class specifically excludes the empty-query case. The same assistant can help you extend it — ask it to add category filter chips (e.g. "CRM," "Chat," "Analytics") above the search box that combine with the text search using AND logic, animate the grid tiles into a reflowed layout using the FLIP technique when items are hidden so remaining tiles slide smoothly into their new positions, or fetch the integration list from a JSON endpoint instead of a hardcoded HTML grid. It's also useful for a UX review: ask whether a "no results" empty state message is needed when a search query matches zero integrations, since the current version simply shows an empty grid. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section in plain HTML, CSS, and vanilla JavaScript centered on a live-searchable grid of integration name tiles arranged around a glowing central "hub" element — no search or animation library.

Requirements:
- A two-column layout: a left column with an eyebrow label, a headline, a supporting paragraph, and a search text input with a magnifying-glass icon; a right column containing an absolutely-positioned glowing circular "hub" element layered behind a grid of at least 16 integration name tiles, each carrying a data-name attribute holding its full searchable name (which may differ from its short visible label).
- Typing into the search input must filter the grid live, on every keystroke, with no submit button — case-insensitive substring matching against each tile's data-name attribute, not the tile's visible label.
- Non-matching tiles must fade and shrink out via a CSS transition (opacity and a scale transform) and then be removed from the grid's layout flow (e.g. via position: absolute) so the remaining matching tiles reflow into a clean grid with no gaps.
- Matching tiles must receive a distinct highlighted style (a colored border and glow) — but only while a non-empty search query is active; when the search box is empty, no tile should carry the highlight style even though all of them are visible.
- Display a live count of how many integrations are currently visible, updating on every keystroke to stay in sync with the filtered grid.
- Do not remove or recreate any tile element from the DOM during filtering — use class toggling on the existing elements only, so state is cheap to restore when the search is cleared.`,
    },
  },
};

export default heroIntegrationEcosystemGrid;
