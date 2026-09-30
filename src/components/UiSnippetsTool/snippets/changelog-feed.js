const changelogFeed = {
  id: 'changelog-feed',
  title: 'Changelog / Release Notes',
  category: 'cards',
  html: `<div class="wrap">
  <div class="header">
    <h1 class="title">What's New</h1>
    <p class="sub">Latest updates, features, and fixes.</p>
    <div class="filter-tabs" id="filterTabs">
      <button class="ftab active" data-filter="all" onclick="setFilter('all',this)">All</button>
      <button class="ftab" data-filter="feature" onclick="setFilter('feature',this)">Features</button>
      <button class="ftab" data-filter="improvement" onclick="setFilter('improvement',this)">Improvements</button>
      <button class="ftab" data-filter="fix" onclick="setFilter('fix',this)">Fixes</button>
    </div>
  </div>
  <div class="feed" id="feed"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 40px 20px; }
.wrap { max-width: 680px; margin: 0 auto; }
.header { margin-bottom: 36px; }
.title { font-size: 28px; font-weight: 900; color: #0f172a; }
.sub { font-size: 15px; color: #64748b; margin-top: 6px; margin-bottom: 20px; }
.filter-tabs { display: flex; gap: 6px; }
.ftab { padding: 7px 16px; border-radius: 20px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.15s; }
.ftab.active { background: #0f172a; color: #fff; border-color: #0f172a; }
.ftab:hover:not(.active) { border-color: #94a3b8; color: #334155; }
.feed { position: relative; padding-left: 28px; }
.feed::before { content: ''; position: absolute; left: 6px; top: 8px; bottom: 8px; width: 2px; background: #e2e8f0; }
.entry { position: relative; margin-bottom: 32px; }
.entry::before { content: ''; position: absolute; left: -25px; top: 20px; width: 10px; height: 10px; border-radius: 50%; background: #e2e8f0; border: 2px solid #fff; }
.entry.new-entry::before { background: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
.entry-card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px 22px; }
.entry-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.version { font-size: 13px; font-weight: 800; color: #0f172a; background: #f1f5f9; padding: 3px 10px; border-radius: 6px; font-family: ui-monospace, monospace; }
.type-badge { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 9px; border-radius: 6px; }
.type-feature { background: #ede9fe; color: #6d28d9; }
.type-improvement { background: #dbeafe; color: #1d4ed8; }
.type-fix { background: #dcfce7; color: #15803d; }
.type-security { background: #fee2e2; color: #dc2626; }
.date { font-size: 12px; color: #94a3b8; margin-left: auto; }
.entry-title { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
.entry-body { font-size: 14px; color: #475569; line-height: 1.6; }
.items { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
.item { display: flex; gap: 8px; font-size: 14px; color: #475569; }
.item::before { content: '–'; color: #94a3b8; flex-shrink: 0; }
.entry.hidden { display: none; }`,
  js: `var entries = [
  {
    version: 'v3.4.0', type: 'feature', date: 'Jun 10, 2026', isNew: true,
    title: 'AI-Powered Smart Suggestions',
    body: "Get contextual suggestions as you type, powered by our new ML model trained on your team's past content.",
    items: ['Real-time inline suggestions in all text fields',"Learns from your team's writing style over time",'Toggle off per-field or globally in Settings']
  },
  {
    version: 'v3.3.2', type: 'fix', date: 'Jun 3, 2026', isNew: true,
    title: 'Critical Bug Fixes',
    body: 'Resolved three issues reported by users in the last release cycle.',
    items: ['Fixed pagination resetting when applying filters','Fixed date picker not respecting user timezone','Resolved duplicate notification emails on bulk actions']
  },
  {
    version: 'v3.3.0', type: 'improvement', date: 'May 22, 2026', isNew: false,
    title: 'Dashboard Performance Overhaul',
    body: 'The main dashboard now loads 3× faster thanks to query optimisation and incremental rendering.',
    items: ['Initial load time reduced from 4.2s to 1.4s','Charts now render progressively as data arrives','Background data refresh no longer blocks UI interactions']
  },
  {
    version: 'v3.2.1', type: 'fix', date: 'May 14, 2026', isNew: false,
    title: 'Export and Permissions Fixes',
    items: ['CSV export now correctly handles special characters in field values','Fixed admin role not being able to delete archived items','Corrected link preview not loading for HTTPS-only domains']
  },
  {
    version: 'v3.2.0', type: 'feature', date: 'May 6, 2026', isNew: false,
    title: 'Custom Workflows & Automations',
    body: 'Build no-code automations with triggers, conditions, and actions across your workspace.',
    items: ['20+ trigger types including field changes, due dates, and status updates','Multi-step action chains with conditional branching','Automation run history with per-step status and logs']
  }
];

var activeFilter = 'all';

function renderFeed() {
  var el = document.getElementById('feed');
  el.innerHTML = entries.map(function(e) {
    var hidden = activeFilter !== 'all' && e.type !== activeFilter;
    var itemsHtml = e.items ? '<div class="items">' + e.items.map(function(i) { return '<div class="item">' + i + '</div>'; }).join('') + '</div>' : '';
    return '<div class="entry ' + (e.isNew ? 'new-entry ' : '') + (hidden ? 'hidden' : '') + '">' +
      '<div class="entry-card">' +
      '<div class="entry-header">' +
      '<span class="version">' + e.version + '</span>' +
      '<span class="type-badge type-' + e.type + '">' + e.type + '</span>' +
      '<span class="date">' + e.date + '</span>' +
      '</div>' +
      '<div class="entry-title">' + e.title + '</div>' +
      (e.body ? '<div class="entry-body">' + e.body + '</div>' : '') +
      itemsHtml +
      '</div></div>';
  }).join('');
}

function setFilter(filter, btn) {
  activeFilter = filter;
  document.querySelectorAll('.ftab').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  renderFeed();
}

renderFeed();`,
  seo: {
    title: 'Changelog / Release Notes Feed — HTML CSS JS Snippet',
    description: 'Versioned changelog feed with feature/improvement/fix badges, timeline connector, filter tabs, and bullet-point items. Exports to React, Vue & Angular.',
    about: {
      title: 'Changelog Feed — Version Timeline, Type Badges & Filter Tabs',
      description: `A changelog or release notes page is a high-search-intent component for SaaS products, developer tools, and open-source libraries because it is both a trust signal and a product communication channel — the forward-looking counterpart is the [product roadmap](/ui-snippets/product-roadmap/), and the in-app version is the [activity feed](/ui-snippets/activity-feed/). This snippet provides a complete changelog feed with a vertical timeline, version number badges, type-coloured labels (feature, improvement, fix, security), per-entry bullet points, filter tabs to isolate a change type, and a "new" indicator on recent entries.\n\n**The data model**\n\nThe entries array is the single source of truth: each entry has a version string, a type, a date, a title, an optional body paragraph, and an optional items array of bullet points. The renderer maps over this array to produce the HTML, so adding a release is as simple as prepending a new object. In production this array would be fetched from an API or loaded from a JSON file maintained alongside the product codebase.\n\n**Timeline connector**\n\nThe feed container uses a left-border pseudo-element for the [vertical timeline](/ui-snippets/vertical-timeline/) line, and each entry has a small circle pseudo-element positioned over that line. Recent entries (isNew: true) get a filled indigo circle with a glow ring; older entries get a neutral grey. This visual encoding gives readers an immediate at-a-glance sense of recency without reading the dates.\n\n**Type badges and filter tabs**\n\nEach entry is labelled with a colour-coded type badge: purple for features, blue for improvements, green for fixes, and red for security. The filter tabs at the top toggle the activeFilter variable and re-render the list, adding a hidden class to non-matching entries. This client-side filter is fast and requires no server round-trip for a typical changelog of 20–100 entries.\n\n**Version number styling**\n\nThe version string is displayed in a monospace badge with a subtle dark background, matching the convention users expect from developer-facing changelogs and making the version easy to scan or search visually.\n\n**Accessibility and extensibility**\n\nThe semantic structure (h1 header, version strings, dated entries, bullet lists) is easily crawlable for SEO and screenreader-readable. Extending the snippet with anchor-linked entries (id per version), a search input, or pagination for long changelogs are all natural next steps that fit the existing structure.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Browse the timeline', text: 'Scroll through the release history. The timeline dot glows for recent entries and the version badge, type, and date are immediately visible.' },
      { title: 'Filter by type', text: 'Click Features, Improvements, or Fixes to show only that change type. Click All to show the full history.' },
      { title: 'Add a new release', text: 'Prepend a new object to the entries array with version, type, date, title, and optionally body and items. Set isNew: true to glow the timeline dot.' },
      { title: 'Add a new type', text: 'Add a new type value (e.g. "security"), define a .type-security CSS class with the appropriate colour, and use it in entries.' },
      { title: 'Load from an API', text: 'Replace the entries array with a fetch() call to your releases endpoint. Render the feed in the fetch callback, applying the same template.' },
      { title: 'Export for your framework', text: 'Click "React" for a component with entries as props and filter state in useState. Click "Vue" for a Vue 3 SFC with a computed filteredEntries.' },
    ]},
    features: ['Vertical timeline with pseudo-element connector line', 'Glow dot for recent entries, neutral dot for older ones', 'Version number badge in monospace for developer readability', 'Four colour-coded type badges: feature, improvement, fix, security', 'Per-entry bullet-point items list', 'Filter tabs (All / Features / Improvements / Fixes)', 'Data-driven rendering from a plain JS array', 'Compact date label positioned at the right of the header row'],
    useCases: [
      { icon: 'APP', title: 'SaaS product changelog page', desc: 'Publish every release as an entry in the changelog. Feature badges attract users who want to know what is new; fix badges build trust by showing that reported issues are resolved. The filter tabs let power users who only care about security fixes find them instantly without scrolling through feature announcements.' },
      { icon: 'CODE', title: 'Open-source library release notes', desc: 'Display your library\'s release history with version numbers as the primary navigation anchor. Developers searching for "when was breaking change X introduced?" scan by version and type. Pair with anchor links so #v3-4-0 URLs work in documentation and GitHub issue references.' },
      { icon: 'FLOW', title: 'Embedded in-app What\'s New panel', desc: 'Mount the changelog as a slide-in panel or popover accessible from a "What\'s new?" bell or badge in the app header. Show only entries since the user\'s last login by filtering on date against the stored lastSeen timestamp, and add a dot notification badge on the bell when new entries exist.' },
      { icon: 'DESIGN', title: 'Internal team update feed', desc: 'Adapt the feed for internal product or eng team updates — sprint releases, design system changes, API deprecations. Colour-code types to engineering, design, and product, and embed the feed in your internal wiki or Notion so stakeholders can track changes without being pinged in Slack.' },
      { icon: 'CHART', title: 'Email newsletter archive', desc: 'Render changelog entries as a public archive of your "product updates" email newsletter. Each version maps to one issue. The filter lets subscribers browse only the feature announcements or only the fix summaries, reusing the same data that drives the email itself.' },
      { icon: 'LEARN', title: 'Study data-driven list rendering and filter patterns', desc: 'The feed\'s renderFeed() + setFilter() pattern is the canonical client-side filter: filter on a state variable, re-render from the source array, toggle CSS classes for visibility. The result is a fast, dependency-free UI that handles any number of filter dimensions without re-fetching data.' },
      { icon: 'CODE', title: 'Related: Encrypt Reveal Card', desc: 'See the [Encrypt Reveal Card](/ui-snippets/evervault-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I load changelog entries from an API or Markdown files?', a: 'Replace the static entries array with a fetch() call in a DOMContentLoaded listener. Your API returns entries as JSON in the same shape. For Markdown, parse each file\'s frontmatter (version, type, date, title) into the object schema and the body into the body string. Store entries newest-first in the response so rendering order is correct without client-side sorting.' },
      { q: 'How do I add anchor links per version so #v3-4-0 URLs work?', a: 'Add an id attribute to each entry card derived from the version string: id="v3-4-0" (replacing dots with dashes). The browser will scroll to the anchor on load. Optionally add a copy-link icon beside the version badge that writes location.origin + "#" + id to the clipboard, giving users a shareable deep link to any specific release.' },
      { q: 'How do I show only entries since the user\'s last visit?', a: 'Store a lastSeen ISO date in localStorage when the user closes the changelog (or on any page load). When rendering, compare each entry\'s date to lastSeen and set isNew accordingly. Add a badge count to the "What\'s new?" trigger showing how many unseen entries there are, and mark them as seen when the user opens the panel.' },
      { q: 'How do I build this in React?', a: 'Accept entries as a prop (or fetch them in useEffect). Keep activeFilter in useState. Derive filteredEntries with useMemo(() => filter === "all" ? entries : entries.filter(e => e.type === filter), [entries, filter]). Map filteredEntries to JSX entry cards. The filter tabs call setFilter; the timeline dot styling applies based on entry.isNew. This pattern cleanly separates data from presentation. For the Tailwind version, click "Tailwind" to get the same markup with utility classes instead of a scoped stylesheet.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the filter-and-rerender cycle by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setFilter() re-renders the entire feed from the entries array instead of just toggling a hidden class on existing DOM nodes, and how that choice trades off against the alternative. The same assistant can help you optimize it — ask whether rebuilding every entry's innerHTML string on every filter click would start to feel slow with a hundred-plus entries, and what a more surgical update (only touching visibility) would look like. It's also useful for extending the feed: ask it to add anchor-linkable version IDs so #v3-4-0 URLs scroll to the right entry, persist a "last seen" timestamp to only badge genuinely new releases, or add a search box that filters entries by keyword in addition to type. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "changelog / release notes feed" in plain HTML, CSS, and JavaScript — no framework, no build step.

Requirements:
- Render the entire feed from a single JavaScript array of release objects (each with a version string, a type like feature/improvement/fix, a date, a title, an optional body paragraph, and an optional array of bullet-point strings) — no hardcoded entry markup in the HTML.
- A vertical timeline rendered with CSS pseudo-elements: a continuous connecting line down the left side of the list, and a small circular dot per entry positioned over that line, where entries flagged as new get a distinct filled, glowing dot style and older entries get a neutral one.
- Each entry must show a monospace version badge, a color-coded type badge (a different background/text color per type value), and a right-aligned relative date, followed by the title, optional body text, and an optional bulleted list of changes.
- Filter tabs (e.g. All, Features, Improvements, Fixes) that, when clicked, update an active-filter variable and re-render the full list from the source array, applying a hidden state to entries that don't match the current filter rather than removing them from the underlying data.
- Adding a new release must require nothing more than prepending one object to the source array — the timeline dot styling, badge coloring, and filter behavior must all apply automatically with no other code changes.`,
    },
  },
};
export default changelogFeed;
