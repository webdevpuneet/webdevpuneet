const breadcrumbDropdown = {
  id: 'breadcrumb-dropdown',
  title: 'Breadcrumb Dropdown',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<nav class="bd-nav" aria-label="Breadcrumb">
  <ol class="bd-crumbs" id="bdCrumbs">
    <li><a href="#">Home</a></li>
    <li class="bd-collapsed">
      <button type="button" class="bd-more" id="bdMore" aria-haspopup="true" aria-expanded="false" aria-label="Show hidden path">…</button>
      <ul class="bd-menu" id="bdMenu" role="menu">
        <li role="none"><a role="menuitem" href="#">Workspace</a></li>
        <li role="none"><a role="menuitem" href="#">Projects</a></li>
        <li role="none"><a role="menuitem" href="#">Marketing site</a></li>
      </ul>
    </li>
    <li><a href="#">Pages</a></li>
    <li><a href="#">Landing</a></li>
    <li aria-current="page">Hero section</li>
  </ol>
</nav>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0f18;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.bd-nav{background:#151926;border:1px solid #232838;border-radius:12px;padding:10px 14px}
.bd-crumbs{list-style:none;display:flex;align-items:center;flex-wrap:wrap;gap:2px;font-size:14px}
.bd-crumbs li{display:flex;align-items:center}
/* Chevron separator before every item except the first. */
.bd-crumbs li:not(:first-child)::before{content:'';width:7px;height:7px;border-right:1.6px solid #56607a;border-bottom:1.6px solid #56607a;transform:rotate(-45deg);margin:0 8px;flex-shrink:0}
.bd-crumbs a{color:#9aa3bb;text-decoration:none;padding:4px 7px;border-radius:7px;transition:background .14s,color .14s;white-space:nowrap}
.bd-crumbs a:hover{background:#1e2334;color:#dfe4f2}
.bd-crumbs li[aria-current="page"]{color:#fff;font-weight:600;padding:4px 7px}

.bd-collapsed{position:relative}
.bd-more{background:#1e2334;border:0;color:#9aa3bb;font-size:14px;font-weight:700;line-height:1;padding:5px 9px;border-radius:7px;cursor:pointer;letter-spacing:1px}
.bd-more:hover{color:#dfe4f2}
.bd-menu{position:absolute;top:calc(100% + 8px);left:0;list-style:none;background:#1b2030;border:1px solid #2b3245;border-radius:11px;padding:6px;min-width:170px;box-shadow:0 16px 40px rgba(0,0,0,.45);opacity:0;transform:translateY(-6px) scale(.97);transform-origin:top left;pointer-events:none;transition:opacity .16s,transform .16s;z-index:5}
.bd-menu.is-open{opacity:1;transform:none;pointer-events:auto}
.bd-menu a{display:block;color:#c3cadb;padding:8px 11px;border-radius:8px;font-size:13px;white-space:nowrap}
.bd-menu a:hover{background:#252c40;color:#fff}`,

  js: `var more = document.getElementById('bdMore');
var menu = document.getElementById('bdMenu');

function close() {
  menu.classList.remove('is-open');
  more.setAttribute('aria-expanded', 'false');
}
function toggle() {
  var open = menu.classList.toggle('is-open');
  more.setAttribute('aria-expanded', open ? 'true' : 'false');
}

more.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });

// Close on outside click and on Escape.
document.addEventListener('click', function (e) {
  if (!menu.contains(e.target) && e.target !== more) close();
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });`,

  seo: {
    title: 'Breadcrumb Dropdown — Free HTML CSS JS Collapsed Path Nav',
    description: `A breadcrumb that collapses its middle into an accessible dropdown menu, with CSS chevrons and Escape handling. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Breadcrumb Dropdown — Collapse Deep Paths Without Losing Them',
      description: `The breadcrumb dropdown solves the problem of long navigation trails: instead of wrapping a deep path across several lines, the middle segments collapse into a single "…" button that opens a menu of the hidden levels. This snippet builds it with a semantic ordered list, CSS, and a small vanilla JavaScript dropdown controller.

**A semantic, accessible trail**

The breadcrumb is a real \`<nav aria-label="Breadcrumb">\` wrapping an ordered list, with the current page marked \`aria-current="page"\` and rendered as plain text rather than a link. This is the structure search engines and screen readers expect from a breadcrumb, so the collapse is an enhancement layered on top of correct semantics, not a replacement for them.

**CSS chevron separators**

The arrows between crumbs aren't characters or images — each non-first \`<li>\` draws a chevron with a \`::before\` made from two borders rotated 45°. Generating separators in CSS means they never get selected or copied with the text, scale crisply, and recolour with a single property. The trail uses flex with \`flex-wrap\`, so on a truly tiny screen it can still wrap gracefully as a fallback.

**The collapsed middle**

The middle segment is a \`bd-collapsed\` list item holding a "…" button and a hidden menu of the levels it represents. Keeping the hidden crumbs in the DOM (inside the dropdown) rather than removing them means the full path is still available to anyone who wants it — you've folded the trail, not truncated it. The button carries \`aria-haspopup\` and \`aria-expanded\` so assistive tech knows it opens a menu and whether it's open.

**The dropdown mechanics**

Clicking "…" toggles an \`is-open\` class that fades and scales the menu in from its top-left origin with a short transition; \`pointer-events\` are disabled while closed so the hidden menu never blocks clicks. The controller closes the menu on an outside click (using \`menu.contains\` to ignore clicks inside it) and on the Escape key — the two dismissals every dropdown should support. \`stopPropagation\` on the button prevents its own click from immediately triggering the outside-click close.

**Why collapse the middle, not the ends**

The first crumb (home/root) and the last two (parent and current page) are the most useful for orientation, so those stay visible and only the deep middle folds away. This mirrors how file managers and IDEs handle long paths, keeping the trail compact while preserving the context that matters.

**Customizing it**

Choose how many crumbs to keep on each side before collapsing, restyle the chevrons and menu, or build the list dynamically and only insert the dropdown when the path exceeds a length. Pair it with a [breadcrumb](/ui-snippets/breadcrumb/), a [nested dropdown](/ui-snippets/nested-dropdown/), or a [sidebar nav](/ui-snippets/sidebar-nav/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A breadcrumb renders with a … in the middle.` },
      { title: 'Click the …', text: `A menu of the hidden path levels opens.` },
      { title: 'Click outside', text: `The menu closes; Escape closes it too.` },
      { title: 'Follow a crumb', text: `Each link navigates to that level.` },
      { title: 'Choose what collapses', text: `Decide how many crumbs stay on each side.` },
      { title: 'Recolor the chevrons', text: `Edit the ::before border colors.` },
    ] },
    features: [
      { title: 'Semantic breadcrumb', text: `nav + ordered list with aria-current.` },
      { title: 'CSS chevrons', text: `Border-rotated separators, no glyphs.` },
      { title: 'Collapsed middle', text: `Deep levels fold into a … menu.` },
      { title: 'Path preserved', text: `Hidden crumbs stay in the dropdown.` },
      { title: 'ARIA dropdown', text: `aria-haspopup and aria-expanded on the button.` },
      { title: 'Outside-click close', text: `contains() check dismisses the menu.` },
      { title: 'Escape to close', text: `Keyboard dismissal supported.` },
      { title: 'Graceful wrap', text: `Flex-wrap fallback on tiny screens.` },
    ],
    useCases: [
      { title: 'Deep apps', text: `Compact paths over a plain [breadcrumb](/ui-snippets/breadcrumb/).` },
      { title: 'File managers', text: `Fold long trails in a [file manager UI](/ui-snippets/file-manager-ui/).` },
      { title: 'Nested nav', text: `Pair with a [nested dropdown](/ui-snippets/nested-dropdown/).` },
      { title: 'Docs', text: `Orient readers above a [table of contents](/ui-snippets/table-of-contents/).` },
      { title: 'Dashboards', text: `Header path beside a [sidebar nav](/ui-snippets/sidebar-nav/).` },
      { title: 'CMS editors', text: `Show location in a [dashboard layout](/ui-snippets/dashboard-layout/).` },
      { icon: 'CODE', title: 'Related: CSS Anchor-Positioned Tooltip Menu', desc: 'See the [CSS Anchor-Positioned Tooltip Menu](/ui-snippets/css-anchor-tooltip-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why collapse the middle of the trail and not the ends?', a: `The first crumb (root) and the last two (parent and current page) give the most orientation, so they stay visible and only the deep middle folds into the … menu. This mirrors how file managers and IDEs handle long paths, keeping the trail compact while preserving the context that matters most.` },
      { q: 'Is the hidden path still accessible?', a: `Yes. The collapsed crumbs stay in the DOM inside the dropdown rather than being removed, so the full path is available to anyone who opens the menu — you fold the trail rather than truncate it. The toggle button carries aria-haspopup and aria-expanded so assistive tech knows it opens a menu and its state.` },
      { q: 'How are the separators drawn?', a: `Each non-first list item draws a chevron with a ::before made from two borders rotated 45 degrees. Generating them in CSS means the arrows are never selected or copied with the text, scale crisply, and recolour with one property — cleaner than slash characters or separator images.` },
      { q: 'How does the dropdown close?', a: `Clicking … toggles an is-open class that fades and scales the menu in. A document click handler closes it when the click is outside the menu, using menu.contains to ignore inside clicks, and an Escape keydown also closes it. stopPropagation on the button keeps its own click from instantly triggering the outside-click close.` },
      { q: 'How do I use this breadcrumb dropdown in React, Vue, or Angular?', a: `Render the crumbs from a path array and, when it exceeds a length, slice out the middle into the dropdown while keeping the first and last items visible. Hold an open boolean in state for the menu, and add document listeners for outside-click and Escape in a mount effect with cleanup. The chevron and menu CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the event propagation by hand to see why the dropdown never closes itself accidentally. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why stopPropagation is called in the more button's click handler and how the document-level click listener uses menu.contains to distinguish an inside click from an outside one. The same assistant can help optimize it — asking whether attaching the outside-click and Escape listeners only while the menu is open (instead of permanently on document) would be cheaper, or whether the chevron separators could be replaced with a single reusable CSS class shared across other nav snippets. It's also useful for extending the pattern: ask it to auto-collapse crumbs based on measured container width instead of a fixed hidden set, add keyboard arrow navigation inside the opened menu, or animate the chevrons in sync with the menu opening. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "breadcrumb with a collapsed middle dropdown" in plain HTML, CSS, and JavaScript using a semantic nav and ordered list — no icon library, no images for the separators.

Requirements:
- A nav element with an aria-label of "Breadcrumb" wrapping an ordered list of crumbs, where the final crumb is rendered as plain text (not a link) and marked aria-current="page".
- Chevron separators between crumbs must be generated purely in CSS using a ::before pseudo-element with two borders rotated 45 degrees — no separator characters, glyphs, or background images anywhere.
- One list item in the middle of the trail must represent multiple collapsed path levels: it contains a toggle button labeled with an ellipsis and a hidden dropdown menu listing the levels it stands in for, with those levels remaining real DOM links (not deleted), so the full path is always reachable.
- The toggle button must carry aria-haspopup and aria-expanded attributes that update correctly on open and close, and the dropdown menu itself must use role="menu" with menuitem roles on its links.
- Clicking the toggle button must open the dropdown with a fade-and-scale-in transition from its top-left corner, and clicking the toggle again, clicking anywhere outside the menu, or pressing Escape must all close it — with the button's own click never being misinterpreted as an outside click that immediately closes the menu it just opened.
- While closed, the dropdown menu must not intercept any clicks (even though it exists in the DOM), and it must not affect the layout or wrapping of the visible breadcrumb trail.`,
    },
  },
};

export default breadcrumbDropdown;
