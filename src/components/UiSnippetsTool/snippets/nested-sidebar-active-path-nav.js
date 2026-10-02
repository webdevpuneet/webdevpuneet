const nestedSidebarActivePathNav = {
  id: 'nested-sidebar-active-path-nav',
  title: 'Nested Sidebar Nav with Active Path Auto-Expand',
  lastmod: '2026-08-27',
  category: 'navigation',
  html: `<div class="demo">
  <nav class="tree-nav" id="treeNav" aria-label="Documentation">
    <div class="tree-group">
      <button class="tree-parent" aria-expanded="false">
        <svg class="chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>
        Getting Started
      </button>
      <div class="tree-children">
        <a href="#" class="tree-link">Installation</a>
        <a href="#" class="tree-link">Quick start</a>
        <a href="#" class="tree-link">Configuration</a>
      </div>
    </div>

    <div class="tree-group">
      <button class="tree-parent" aria-expanded="false">
        <svg class="chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>
        API Reference
      </button>
      <div class="tree-children">
        <a href="#" class="tree-link">Authentication</a>
        <a href="#" class="tree-link active" data-active="true">Rate limits</a>
        <a href="#" class="tree-link">Pagination</a>
        <a href="#" class="tree-link">Webhooks</a>
      </div>
    </div>

    <div class="tree-group">
      <button class="tree-parent" aria-expanded="false">
        <svg class="chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>
        Guides
      </button>
      <div class="tree-children">
        <a href="#" class="tree-link">Migrating from v1</a>
        <a href="#" class="tree-link">Error handling</a>
      </div>
    </div>
  </nav>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.tree-nav { width: 240px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 10px; display: flex; flex-direction: column; gap: 2px; }

.tree-group { display: flex; flex-direction: column; }
.tree-parent { display: flex; align-items: center; gap: 8px; width: 100%; text-align: left; background: none; border: none; padding: 9px 10px; border-radius: 8px; font-size: 13px; font-weight: 700; color: #334155; cursor: pointer; font-family: inherit; }
.tree-parent:hover { background: #f8fafc; }
.chev { transition: transform 0.18s ease; color: #94a3b8; flex-shrink: 0; }
.tree-parent[aria-expanded="true"] .chev { transform: rotate(90deg); }

.tree-children { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.2s ease; }
.tree-group.open .tree-children { grid-template-rows: 1fr; }
.tree-children > div, .tree-children { overflow: hidden; }

.tree-link { display: block; padding: 7px 10px 7px 30px; font-size: 12.5px; color: #64748b; text-decoration: none; border-radius: 7px; font-weight: 600; }
.tree-link:hover { background: #f1f5f9; color: #334155; }
.tree-link.active { background: #eef2ff; color: #4338ca; }`,
  js: `const nav = document.getElementById('treeNav');
const groups = Array.from(nav.querySelectorAll('.tree-group'));

// The overflow:hidden wrapper the grid-template-rows trick needs.
groups.forEach((group) => {
  const children = group.querySelector('.tree-children');
  const wrapper = document.createElement('div');
  wrapper.style.overflow = 'hidden';
  wrapper.style.minHeight = '0';
  while (children.firstChild) wrapper.appendChild(children.firstChild);
  children.appendChild(wrapper);
});

function setGroupOpen(group, open) {
  group.classList.toggle('open', open);
  group.querySelector('.tree-parent').setAttribute('aria-expanded', String(open));
}

groups.forEach((group) => {
  const parent = group.querySelector('.tree-parent');
  parent.addEventListener('click', () => {
    setGroupOpen(group, !group.classList.contains('open'));
  });
});

// On load, auto-expand exactly the group that contains the active link,
// and leave every other group collapsed — the active page's location in
// the tree should always be immediately visible without manual clicking.
function expandActivePath() {
  const activeLink = nav.querySelector('.tree-link.active');
  if (!activeLink) return;
  const group = activeLink.closest('.tree-group');
  if (group) setGroupOpen(group, true);
}

expandActivePath();`,
  seo: {
    title: 'Nested Sidebar Navigation with Active-Path Auto-Expand — Real grid-template-rows Animation',
    description: 'A collapsible tree-style sidebar navigation that automatically expands only the group containing the currently active link on load, animated smoothly via grid-template-rows.',
    about: {
      title: 'Nested Sidebar Nav — Auto-Expanding Exactly the Active Path, Nothing Else',
      description: `A collapsible sidebar with several top-level groups is only genuinely useful if it opens to the right place automatically — a user landing on a "Rate limits" documentation page shouldn't have to manually click open "API Reference" themselves just to see where they currently are in the site structure. This snippet computes that on load: it finds whichever link is marked active, walks up to its containing group, and expands only that one group, leaving every sibling group collapsed.

**Finding the active group from the active link, not the reverse**

\`expandActivePath()\` starts from \`nav.querySelector('.tree-link.active')\` — the link, not the group — and calls \`.closest('.tree-group')\` on it to find its containing parent group. This direction matters: the active state genuinely belongs on the *link* (it's the specific page the user is on), and the group's open/closed state is *derived* from that, not the other way around. If a different link becomes active later (e.g. after a client-side route change), re-running the same lookup would correctly find and expand its new containing group without any group-specific logic needing to change.

**Smooth open/close via the same grid-template-rows trick used elsewhere in this library**

Rather than animating \`height\` (which requires a fixed pixel target CSS can't compute from \`auto\`) or a hard \`display\` toggle (which can't animate at all), \`.tree-children\` uses \`grid-template-rows: 0fr\` at rest and \`1fr\` when its group has the \`.open\` class — the same fractional-grid-row animation technique used by this library's CSS-only accordion, applied here to a JavaScript-driven nested nav instead of a pure-CSS checkbox hack.

**Building the required overflow wrapper dynamically, not by hand in the markup**

The grid-row-collapse technique needs an inner wrapper with \`overflow: hidden\` so content visually clips as the row shrinks toward zero. Rather than requiring that wrapper \`<div>\` to be written by hand around every group's links in the HTML, the setup code moves each group's existing child links into a wrapper it creates programmatically on load — keeping the authored HTML markup simpler (flat \`<a>\` tags directly inside \`.tree-children\`) while still getting the wrapper structure the animation technique actually needs underneath.

**Only one group opens automatically — the rest wait for a deliberate click**

\`expandActivePath()\` only ever calls \`setGroupOpen(group, true)\` for the one group containing the active link; every other group is left in its default collapsed state. This keeps the sidebar's initial state focused and uncluttered — showing exactly "here's where you are" rather than expanding everything and asking the user to scan a wall of open sections to find their current location themselves.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Mark the current page\'s link with class="active" and data-active="true"', text: 'The active link\'s containing group is automatically found and expanded on load — no manual group-opening needed.' },
        { title: 'Click any group header to expand/collapse it manually', text: 'Groups can also be freely opened and closed independently by the user at any time, in addition to the automatic active-path expansion.' },
        { title: 'Add or remove nav groups and links freely', text: 'Any number of .tree-group blocks with their own .tree-parent and .tree-children are picked up automatically.' },
        { title: 'Re-run expandActivePath() after a route change', text: 'In a single-page app, call expandActivePath() again after updating which link has the .active class, so the sidebar stays in sync with client-side navigation.' },
        { title: 'Adjust the animation speed', text: 'Change the grid-template-rows transition duration on .tree-children in the CSS panel.' },
      ],
    },
    features: [
      'Automatically expands exactly the group containing the currently active link on load, nothing else',
      'Active state correctly derived from link to group, not hardcoded per group, so it adapts if the active link changes',
      'Smooth grid-template-rows animation avoids both the max-height guessing problem and the non-animatable display toggle',
      'Overflow-clipping wrapper built programmatically, keeping the authored HTML markup simple and flat',
      'Groups remain fully manually togglable by the user independent of the automatic active-path expansion',
      'aria-expanded kept accurate on every group\'s toggle button for both automatic and manual state changes',
      'Chevron icon rotation gives clear visual feedback for each group\'s open/closed state',
      'Reusable expandActivePath() function can be re-invoked after client-side route changes in an SPA',
    ],
    useCases: [
      { icon: '📚', title: 'Documentation site sidebars', desc: 'Open a doc nav to the right place automatically, expanding only the group that contains the current page\'s link on load.' },
      { icon: '🧭', title: 'Admin panel navigation', desc: 'Provide nested settings or resource menus that land on the active section, with `aria-expanded` kept in step with each group.' },
      { icon: '🗂️', title: 'Multi-level product navigation', desc: 'Support any product with grouped, collapsible sections, animating height through `grid-template-rows` without guessing a `max-height` value.' },
      { icon: '❓', title: 'Help centre and knowledge base sidebars', desc: 'Help visitors orient themselves, deriving the active group from the link rather than hardcoding it for each group.' },
      { icon: 'CODE', title: 'Related: Pinned, Draggable Browser-Style Tabs', desc: 'See the [Pinned, Draggable Browser-Style Tabs](/ui-snippets/pinned-draggable-tabs/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the sidebar know which group to expand on load?', a: 'It looks up whichever link currently has the .active class, then walks up the DOM using .closest(\'.tree-group\') to find that link\'s containing parent group, and expands only that one group — the active state is read from the link and used to derive the group\'s state, not the reverse.' },
      { q: 'Do other groups stay collapsed, or does everything expand together?', a: 'Only the one group containing the active link is automatically expanded on load; every other group remains in its default collapsed state until a user manually clicks to open it.' },
      { q: 'Why use grid-template-rows instead of max-height for the collapse animation?', a: 'max-height requires guessing a fixed pixel value taller than the tallest possible content, which either clips real content or creates an uneven animation pace; grid-template-rows animating between 0fr and 1fr always sizes to the content\'s exact real height with no guessing, the same technique used by this library\'s CSS-only accordion snippets.' },
      { q: 'Why does the setup code create a wrapper div in JavaScript instead of writing it directly in the HTML?', a: 'It keeps the authored markup simpler — plain <a> links directly inside .tree-children — while still providing the overflow:hidden wrapper the grid-row-collapse animation technique needs underneath, moving that structural detail into the setup code rather than requiring every author to remember to add it by hand.' },
      { q: 'What happens if the active link changes after a client-side route change?', a: 'Update which link has the .active class to match the new current page, then call expandActivePath() again — it will find the new active link\'s containing group and expand it the same way it did on initial load.' },
      { q: 'Can a user manually collapse the auto-expanded group?', a: 'Yes — the automatic active-path expansion only sets the initial state; every group remains fully independently togglable by clicking its header at any time afterward, including the one that was auto-expanded.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why deriving the active group from the active link (rather than hardcoding which group should be open) is the more maintainable approach, especially in a single-page app where the active page can change without a full reload. It's also worth asking for a version that persists which groups a user has manually opened across page loads using localStorage, or one that supports a second level of nesting (groups within groups) while keeping the same active-path auto-expand logic working correctly.`,
      prompt: `Build a nested, collapsible sidebar navigation tree in HTML, CSS and vanilla JavaScript that automatically expands only the group containing the current page's active link on load — no external libraries.

Requirements:
- Several top-level collapsible groups, each with a clickable header button and a list of link children, where clicking any header toggles that specific group's expanded/collapsed state independently of the others.
- Mark exactly one link across the whole tree as the "active" link (representing the current page). On page load, without any user interaction, automatically expand only the single group that contains this active link — all other groups must remain collapsed by default.
- Animate each group's expand/collapse using CSS grid-template-rows transitioning between 0fr and 1fr (not max-height or display toggling), so the animation always matches the actual content height with no hardcoded pixel guess.
- Keep each group header's aria-expanded attribute accurate for both the automatic active-path expansion and any subsequent manual toggling by the user.
- Write the function that determines which group to expand so that it derives the answer from which link is currently marked active (e.g. by walking up from the active link to its containing group), rather than hardcoding a specific group as the one to open — so the same logic would correctly find a different group if a different link were marked active instead.`,
    },
  },
};

export default nestedSidebarActivePathNav;
