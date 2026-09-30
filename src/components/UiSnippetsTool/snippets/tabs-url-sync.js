const tabsUrlSync = {
  id: 'tabs-url-sync',
  title: 'Tabs with URL Sync',
  category: 'navigation',
  html: `<div class="tabs" role="tablist" aria-label="URL synced tabs">
  <button class="tab" data-tab="overview" onclick="goToTab('overview')">Overview</button>
  <button class="tab" data-tab="pricing" onclick="goToTab('pricing')">Pricing</button>
  <button class="tab" data-tab="faq" onclick="goToTab('faq')">FAQ</button>
</div>
<div class="panels">
  <div class="panel" data-panel="overview">
    <h3>Overview</h3>
    <p>This tab's state lives in the URL hash. Try refreshing the page after switching tabs.</p>
  </div>
  <div class="panel" data-panel="pricing">
    <h3>Pricing</h3>
    <p>Share a link straight to this tab — <code>#pricing</code> opens it automatically on load.</p>
  </div>
  <div class="panel" data-panel="faq">
    <h3>FAQ</h3>
    <p>Browser back/forward buttons also switch tabs, since each click pushes a new hash entry.</p>
  </div>
</div>
<p class="hash-hint">Current hash: <code id="hashDisplay">#overview</code></p>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.tabs {
  display: flex;
  gap: 2px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 20px;
}

.tab {
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color 0.15s, border-color 0.15s;
  border-radius: 4px 4px 0 0;
}
.tab:hover { color: #1e293b; background: #f1f5f9; }
.tab.active { color: #6366f1; border-bottom-color: #6366f1; font-weight: 600; }

.panel { display: none; }
.panel.active { display: block; }
.panel h3 { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
.panel p { font-size: 14px; color: #64748b; line-height: 1.6; }
.panel code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 13px; }

.hash-hint { margin-top: 20px; font-size: 13px; color: #94a3b8; }
.hash-hint code { background: #eef2ff; color: #4f46e5; padding: 2px 8px; border-radius: 4px; font-weight: 600; }`,
  js: `function goToTab(tabName) {
  location.hash = tabName;
}

function activateTab(tabName) {
  const valid = ['overview', 'pricing', 'faq'];
  const name = valid.includes(tabName) ? tabName : 'overview';

  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === name);
  });
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.toggle('active', p.dataset.panel === name);
  });

  const display = document.getElementById('hashDisplay');
  if (display) display.textContent = '#' + name;
}

function readHashAndActivate() {
  const tabName = location.hash.replace('#', '');
  activateTab(tabName);
}

window.addEventListener('hashchange', readHashAndActivate);
readHashAndActivate();`,

  seo: {
    title: 'Tabs with URL Sync — Free HTML CSS JS Hash-Linked Tab Bar Snippet',
    description: 'A tab bar whose active tab syncs to location.hash so refreshes, shared links, and browser back/forward buttons all land on the right panel. Vanilla JS, no router needed.',
    about: {
      title: 'Tabs with URL Sync — HTML, CSS & JavaScript Hash-Based Tab State',
      description: `Ordinary tab bars lose their state on refresh — click "Pricing", hit F5, and you're back on the first tab. This snippet fixes that by storing the active tab in the URL hash (\`location.hash\`), so the browser itself remembers which tab was open. Refreshing, bookmarking, or sending a colleague a link to \`yoursite.com/page#pricing\` all open the correct panel.

**How the hash becomes the source of truth**

Clicking a tab doesn't directly toggle classes — it calls \`goToTab(tabName)\`, which simply sets \`location.hash = tabName\`. Setting the hash is what triggers the browser's native \`hashchange\` event, which fires a listener calling \`readHashAndActivate()\`. That function reads \`location.hash\`, strips the leading \`#\`, and calls \`activateTab(name)\` to update the visible tab and panel. The result: **the hash change is the only thing that ever changes the visible tab** — clicking a tab bar button and typing a hash directly into the address bar go through the exact same code path.

**How back/forward buttons work for free**

Every time \`location.hash\` is set to a new value, the browser pushes a new entry onto the session history. That means the native Back and Forward buttons walk through your tab history automatically — no manual \`history.pushState\` bookkeeping required. This is one of the main advantages of hash-based state over a plain JS variable.

**How the initial load is handled**

On first load there may be no hash at all (a fresh visit to the page) or an invalid one (a stale bookmark). \`activateTab\` guards against this with a \`valid.includes(tabName)\` check, falling back to \`'overview'\` if the hash is missing or unrecognized. \`readHashAndActivate()\` is called once immediately on script load, in addition to being wired to the \`hashchange\` event, so the correct tab is shown even before the user clicks anything.

**Extending to more tabs**

Add the tab name to the \`valid\` array, add a matching \`data-tab\`/\`data-panel\` pair in the HTML, and the hash-driven activation continues to work with no other logic changes.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Tabs with URL Sync" in the sidebar Library tab to load the panels and preview.' },
        { title: 'Click a tab and check the hash', text: 'Click Pricing or FAQ — notice the "Current hash" text and the browser URL bar (in the exported HTML file) both update.' },
        { title: 'Test refresh persistence', text: 'Export to an HTML file, open it, switch tabs, and refresh — the same tab reopens because the hash survives a reload.' },
        { title: 'Test back/forward', text: 'Click through a couple of tabs then press the browser Back button — it steps back through your tab history.' },
        { title: 'Add a tab', text: 'Add the new name to the valid array in JS and add matching data-tab/data-panel elements in HTML.' },
        { title: 'Export and save', text: 'Use the export buttons for a standalone file or component, or click "Save as" to keep your version.' },
      ],
    },
    features: [
      'Active tab persists across page refresh via location.hash',
      'Shareable deep links — #pricing opens straight to that tab',
      'Native browser back/forward buttons step through tab history automatically',
      'Single readHashAndActivate function handles both clicks and manual URL edits identically',
      'Falls back to a default tab when the hash is missing or invalid',
      'No router or history.pushState bookkeeping required — hashchange does the work',
      'Same underline-indicator styling as a standard tab bar for visual consistency',
      'Scales to any number of tabs by extending one validation array',
    ],
    useCases: [
      { icon: 'LINK', title: 'Shareable documentation tabs', desc: 'Let users link directly to a specific tab in docs or settings pages, e.g. #installation or #api-reference.' },
      { icon: 'FLOW', title: 'Multi-step settings pages', desc: 'Keep a settings page\'s active section in the URL so support links and bookmarks always open the right panel.' },
      { icon: 'TABS', title: 'Dashboards with persistent views', desc: 'Users switching between Analytics/Reports/Settings won\'t lose their place on an accidental refresh.' },
      { icon: 'LEARN', title: 'Learn hash-based state management', desc: 'Study how a single browser API (location.hash + hashchange) can replace a chunk of client-side routing logic.' },
      { icon: 'CODE', title: 'Foundation for a lightweight router', desc: 'Extend the pattern with more routes and query parameters to build a minimal hash router without a framework.' },
      { icon: 'ACCESS', title: 'SEO-safe tabbed content fallback', desc: 'Pair with server-rendered content per hash route for progressively enhanced tab navigation.' },
    ],
    faqs: [
      { q: 'Why use location.hash instead of a JavaScript variable for the active tab?', a: 'A plain variable resets on every page load. location.hash is part of the URL, so it survives refreshes, gets included when the link is shared or bookmarked, and integrates with the browser\'s native back/forward history for free.' },
      { q: 'Does clicking a tab reload the page?', a: 'No. Setting location.hash does not trigger a network request or full page reload — it only fires the hashchange event, which the script listens for to update the visible tab.' },
      { q: 'What happens if someone visits a link with an invalid hash?', a: 'activateTab checks the requested tab name against a valid array. If it is not recognized (or the hash is empty), it falls back to showing the default "overview" tab instead of showing nothing.' },
      { q: 'How do back and forward buttons work with this pattern?', a: 'Every hash assignment pushes a new browser history entry automatically. The Back and Forward buttons move through those entries, which re-fires hashchange and re-activates the corresponding tab — no extra code needed.' },
      { q: 'Can I use this with pushState-based routing instead of a hash?', a: 'Yes, conceptually. Replace location.hash assignments with history.pushState calls and listen for the popstate event instead of hashchange, then read location.pathname instead of location.hash.' },
      { q: 'How do I add a fourth tab?', a: 'Add its name to the valid array in the JS panel, then add a matching button with data-tab="name" and a panel with data-panel="name" in the HTML panel.' },
      { q: 'Does this work if JavaScript is disabled?', a: 'No — like any dynamically-toggled tab pattern, it requires JavaScript to read the hash and toggle the active classes. Without JS, no panel would ever become visible.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to trace exactly why goToTab only ever sets location.hash rather than directly toggling classes — the point is that the hash change becomes the single source of truth, so clicking a button and manually editing the URL bar produce identical behavior. It's also worth asking the assistant to convert this to History API-based routing with pushState/popstate for cleaner URLs without a leading #, or to add support for a query parameter alongside the hash (e.g. #pricing?plan=pro) that the panel content can read.`,
      prompt: `Build a "tabs with URL sync" component in plain HTML, CSS, and vanilla JavaScript, with no router library.

Requirements:
- A tab bar of at least three buttons where clicking a tab does not directly toggle CSS classes but instead sets location.hash to the tab's name.
- A single hashchange event listener that reads location.hash, validates it against a known list of tab names, falls back to a default tab if the hash is missing or invalid, and then toggles the active class on the matching tab button and content panel.
- The same activation function must run once on initial page load (not just on hashchange) so a page opened directly with a hash like #pricing shows the correct tab immediately.
- Verify that clicking through tabs creates browser history entries so the native Back and Forward buttons move between previously visited tabs.
- Style the tabs with a colored active-tab underline consistent with a standard tab bar, and keep the whole thing dependency-free.`,
    },
  },
};

export default tabsUrlSync;
