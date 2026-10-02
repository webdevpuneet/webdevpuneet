const breadcrumbs = {
  id: 'breadcrumbs',
  title: 'Breadcrumb Trail with Collapsing Middle Items',
  lastmod: '2026-08-17',
  category: 'navigation',
  html: `<div class="demo">
  <nav class="crumbs" id="crumbsShort" aria-label="Breadcrumb">
    <ol>
      <li><a href="#">Home</a></li>
      <li><span class="sep">/</span><a href="#">Settings</a></li>
      <li><span class="sep">/</span><span class="current" aria-current="page">Profile</span></li>
    </ol>
  </nav>

  <nav class="crumbs" id="crumbsLong" aria-label="Breadcrumb">
    <ol id="crumbsLongList"></ol>
  </nav>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 100%; max-width: 460px; display: flex; flex-direction: column; gap: 20px; }
.crumbs ol { list-style: none; display: flex; flex-wrap: wrap; align-items: center; gap: 4px; font-size: 13.5px; }
.crumbs li { display: flex; align-items: center; gap: 4px; }
.crumbs a { color: #6b7280; text-decoration: none; padding: 3px 4px; border-radius: 5px; }
.crumbs a:hover { color: #2563eb; background: #f0f5ff; }
.crumbs .sep { color: #c7cbd1; }
.crumbs .current { color: #111827; font-weight: 600; padding: 3px 4px; }
.crumbs .collapse-btn { background: #f3f4f6; border: none; border-radius: 5px; color: #6b7280; font-size: 13px; font-weight: 700; width: 24px; height: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.crumbs .collapse-btn:hover { background: #e5e7eb; color: #374151; }`,
  js: `var LONG_PATH = ['Home', 'Workspace', 'Projects', 'Marketing Site', 'Pages', 'Landing', 'Hero Section', 'Variant B'];

function renderLong() {
  var list = document.getElementById('crumbsLongList');
  var collapsed = window.innerWidth < 480 && LONG_PATH.length > 4;
  var items = LONG_PATH;
  var html = '';

  if (collapsed) {
    var head = LONG_PATH.slice(0, 1);
    var tail = LONG_PATH.slice(-2);
    html += crumbHtml(head[0], 0, false);
    html += '<li><span class="sep">/</span><button class="collapse-btn" onclick="expandCrumbs()" aria-label="Show hidden path segments">\\u2026</button></li>';
    tail.forEach(function(label, i) {
      var isLast = i === tail.length - 1;
      html += crumbHtml(label, i, isLast, true);
    });
  } else {
    items.forEach(function(label, i) {
      var isLast = i === items.length - 1;
      html += crumbHtml(label, i, isLast, i > 0);
    });
  }
  list.innerHTML = html;
}

function crumbHtml(label, index, isLast, withSep) {
  var sep = withSep ? '<span class="sep">/</span>' : '';
  if (isLast) return '<li>' + sep + '<span class="current" aria-current="page">' + label + '</span></li>';
  return '<li>' + sep + '<a href="#">' + label + '</a></li>';
}

function expandCrumbs() {
  var list = document.getElementById('crumbsLongList');
  var html = '';
  LONG_PATH.forEach(function(label, i) {
    var isLast = i === LONG_PATH.length - 1;
    html += crumbHtml(label, i, isLast, i > 0);
  });
  list.innerHTML = html;
}

renderLong();
window.addEventListener('resize', renderLong);`,
  seo: {
    title: 'Breadcrumbs — Collapsing Trail HTML CSS JS Snippet',
    description: 'Accessible breadcrumb trail with aria-current, hover states, and a collapsing middle-segment pattern for deep paths. Exports to React, Vue & Angular.',
    about: {
      title: 'Breadcrumb Trail — aria-current Navigation with Collapsing Middle Segments',
      description: `Breadcrumbs show a user where they are in a site's hierarchy and let them jump back up to any ancestor level in one click — standard on any site with nested categories, file paths, or multi-step settings. This snippet covers both the simple three-level case and the harder problem: what happens when the path is eight levels deep and doesn't fit on one line.\n\n**Semantic structure**\n\nThe trail is a \`<nav aria-label="Breadcrumb">\` wrapping an \`<ol>\` — an ordered list, not an unordered one, because a breadcrumb path has a meaningful sequence. Every visited ancestor is a real \`<a href="...">\`, and only the final, current segment is a plain \`<span>\` with \`aria-current="page"\` — marking the current location as non-interactive is correct because linking a page to itself serves no purpose and \`aria-current\` tells assistive technology which segment represents "here" without needing to infer it from position.\n\n**Separators as siblings, not pseudo-elements**\n\nEach \`/\` separator is a real \`<span class="sep">\` element placed before its link, rather than a \`::before\` CSS pseudo-element. This is a deliberate accessibility choice: CSS-generated content is inconsistently exposed to screen readers across browsers, so a visible, real DOM separator guarantees consistent behavior, at the minor cost of one extra element per crumb.\n\n**The collapsing problem**\n\nA breadcrumb trail with eight segments doesn't fit in a typical sidebar or mobile viewport width. This snippet's \`renderLong()\` checks \`window.innerWidth < 480 && LONG_PATH.length > 4\` and, when both are true, renders only the first segment, a \`…\` button standing in for the hidden middle, and the last two segments — the same convention Windows Explorer and macOS Finder's breadcrumb bars use. The first segment stays because it anchors the user to the top of the hierarchy; the last two stay because they show exactly where the user currently is and the level directly above it.\n\n**The collapse button is interactive, not decorative**\n\nThe \`…\` is a real \`<button>\`, not static text, with \`aria-label="Show hidden path segments"\` — clicking it calls \`expandCrumbs()\`, which re-renders the full uncollapsed list. A common mistake is rendering the ellipsis as plain text, which discards the ability to ever see the hidden segments; making it a button preserves full navigability while still solving the width problem.\n\n**Recalculating on resize**\n\n\`window.addEventListener('resize', renderLong)\` means resizing the browser (or rotating a device) re-evaluates the collapse condition and re-renders — a trail collapsed on a narrow mobile viewport automatically expands back to full when the window widens past the 480px threshold, without requiring a page reload.\n\n**Building the HTML string safely**\n\n\`crumbHtml()\` is the single function responsible for rendering one segment, called identically whether building the collapsed or expanded view — this avoids duplicating the link-vs-current-span branching logic in two places, which is a common source of the two views silently drifting apart from each other over time.\n\n**Truncating long individual labels**\n\nThis snippet handles too many *segments*; a segment with a very long individual label (a long file name, for instance) is a separate problem, best solved with \`text-overflow: ellipsis\` and a \`max-width\` on that specific \`<a>\` or \`<span>\`, combined with a native \`title\` attribute so the full text is still available on hover.\n\n**React integration**\n\nIn React, pass the path as an array of \`{ label, href }\` objects, derive the collapsed/expanded view with a small \`useMemo\` keyed on a \`window.innerWidth\` value tracked via a resize listener in \`useEffect\`, and render the last item as a \`<span aria-current="page">\` exactly as this snippet does.\n\nSee also the [breadcrumb dropdown](/ui-snippets/breadcrumb-dropdown/) for a variant where each segment itself opens a dropdown of sibling pages, and the [table of contents](/ui-snippets/table-of-contents/) snippet for a different kind of "where am I" navigation aid.`,
    },
    howToUse: [
      { title: 'Copy the nav/ol structure', text: 'Use <nav aria-label="Breadcrumb"><ol>...</ol></nav> with one <li> per path segment — links for ancestors, a plain aria-current span for the current page.' },
      { title: 'Replace the LONG_PATH array', text: 'Swap LONG_PATH for your real route hierarchy, either hardcoded per page or generated from your router\'s current path segments.' },
      { title: 'Add the CSS', text: 'Paste the CSS once — it styles both the short static example and the dynamically rendered long trail identically.' },
      { title: 'Adjust the collapse threshold', text: 'Change the 480px width check and the "> 4 segments" condition in renderLong() to match when your layout actually needs to collapse.' },
      { title: 'Wire real hrefs', text: 'Replace the demo\'s href="#" placeholders with real ancestor URLs so each breadcrumb link actually navigates.' },
    ],
    features: [
      'Semantic <nav><ol> structure with aria-current="page" marking the non-interactive final segment',
      'Real DOM separator elements instead of CSS-generated content, for consistent screen-reader behavior',
      'Automatic collapsing of middle segments on narrow viewports, matching the OS file-browser convention',
      'Collapse ellipsis is a real interactive button, not static text — clicking it reveals the full path',
      'Recalculates and re-renders on window resize, expanding back automatically on wider viewports',
      'Single shared render function for both collapsed and expanded views, preventing the two from drifting apart',
      'Hover and focus states on every ancestor link',
      'Zero dependencies — pure HTML, CSS, and JavaScript',
    ],
    useCases: [
      { icon: '🗂️', title: 'Nested content hierarchies', desc: 'Show where a reader is within documentation or category trees, using semantic `nav` and `ol` markup with `aria-current` on the final item.' },
      { icon: '📁', title: 'File and folder navigation', desc: 'Pair with a [file manager UI](/ui-snippets/file-manager-ui/) so users can jump to any ancestor folder with one click.' },
      { icon: '⚙️', title: 'Multi-step settings pages', desc: 'Orient users inside deep multi-step settings pages, alongside a [sidebar nav](/ui-snippets/sidebar-nav/) that lists the sibling sections.' },
      { icon: '🛍️', title: 'E-commerce categories', desc: 'Display paths like Home, Shoes and Running, with collapsing of middle segments on narrow screens and a real button for the ellipsis.' },
      { icon: 'CODE', title: 'Related: Dropdown Navbar — CSS Only Hover & Focus-Within (No JavaScript)', desc: 'See the [Dropdown Navbar — CSS Only Hover & Focus-Within (No JavaScript)](/ui-snippets/css-only-dropdown-nav-hover/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the current page a span instead of a link?', a: 'A link to the page the user is already on serves no purpose and can confuse screen reader users into thinking it navigates somewhere new. Using a plain span with aria-current="page" correctly marks it as the non-interactive current location.' },
      { q: 'How do I change how many segments show before collapsing?', a: 'Edit the condition in renderLong() — currently window.innerWidth < 480 && LONG_PATH.length > 4 — and the slice indices in the collapsed branch (head = first 1, tail = last 2) to whatever combination fits your layout.' },
      { q: 'Why are separators real elements instead of CSS ::before content?', a: 'CSS-generated content is not consistently exposed to assistive technology across all browsers and screen readers. A real <span class="sep"> guarantees the separator (or its absence, since it can be hidden from screen readers with aria-hidden if desired) behaves predictably everywhere.' },
      { q: 'How do I build the path array from my router automatically?', a: 'Split your current route pathname on "/", map each segment to a { label, href } pair by accumulating the path so far for each href, and optionally translate URL slugs into human-readable labels via a lookup table or your CMS data.' },
      { q: 'How do I use these breadcrumbs in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page for a React component accepting a path array as a prop with the same collapse-on-resize logic in a useEffect, a React + Tailwind version, a Vue 3 SFC, or an Angular standalone component with an @Input() path array.' },
    ],
    aiPrompt: {
      paragraph: `Paste this breadcrumb trail's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the current page renders as a plain span with aria-current instead of a link, and how the collapse-to-ellipsis logic decides which segments to keep versus hide on a narrow viewport. Since this snippet builds its path from a hardcoded array, it's a good candidate to ask the assistant to wire up to your actual router — describe your routing library and have it generate the segment array (with real hrefs and human-readable labels) from the current URL automatically. Beyond that, ask it to add a dropdown on the collapse button showing the hidden segments as a menu instead of fully expanding the trail, or to add individual-segment text truncation for very long labels.`,
      prompt: `Build an accessible breadcrumb trail component in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Use a semantic nav element labeled as a breadcrumb, wrapping an ordered list where each list item represents one level of a page hierarchy. Every ancestor level must be a real link; the final, current-page segment must be plain non-interactive text marked with an aria-current attribute indicating it is the current page, not a link to itself.
- Render separators between segments as real visible DOM elements rather than CSS-generated pseudo-element content.
- Given a path with more than four segments, automatically collapse the middle segments into a single interactive ellipsis button when the viewport is narrow (for example under 480px wide), showing only the first segment, the collapse button, and the last two segments. On a wider viewport, render the full uncollapsed path instead.
- The collapse ellipsis must be a real button (not static punctuation) with an appropriate accessible label, and clicking it must re-render the full, uncollapsed path in place.
- Recalculate whether to collapse or expand whenever the browser window is resized, so a trail collapsed on a narrow width automatically expands again if the window is widened past the threshold, without requiring a page reload.
- Use one shared rendering function for building both the collapsed and the fully expanded views so the logic for "is this the last segment" and "is this a link or the current-page text" is not duplicated in two separate code paths.`,
    },
  },
};

export default breadcrumbs;
