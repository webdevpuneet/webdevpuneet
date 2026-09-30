const breadcrumb = {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    category: 'navigation',
    html: `<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Electronics</a></li>
    <li aria-current="page">Headphones</li>
  </ol>
</nav>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; }

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
  list-style: none;
  font-size: 13px;
}

.breadcrumb li {
  display: flex;
  align-items: center;
  color: #94a3b8;
}

.breadcrumb li + li::before {
  content: '/';
  margin: 0 8px;
  color: #cbd5e1;
}

.breadcrumb a {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}
.breadcrumb a:hover { color: #4f46e5; text-decoration: underline; }

.breadcrumb li[aria-current="page"] {
  color: #1e293b;
  font-weight: 600;
}`,
    js: '',

  seo: {
    title: 'Breadcrumb Navigation — Free HTML CSS Snippet',
    description: 'Accessible breadcrumb with semantic ol/li markup, CSS-only separators and aria-current — zero JavaScript. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Breadcrumb Navigation — Semantic HTML, CSS Separators & Accessibility',
      description: `A breadcrumb is a horizontal trail of links showing the user's path through a site hierarchy — Home / Products / Electronics / Headphones. It complements primary navigation like the [sidebar nav](/ui-snippets/sidebar-nav/) and [mega menu](/ui-snippets/mega-menu/). It answers "where am I?" at a glance, reduces navigation friction, and tells search engines how your pages are structured. Google uses breadcrumb markup to display the path inside search result snippets, which can improve click-through rate.

This snippet gives you a complete, production-ready breadcrumb in **plain HTML and CSS — no JavaScript required**. It uses semantic markup, CSS-generated separators, and proper ARIA attributes out of the box.

**Why ol and li instead of div and span**

Breadcrumbs use \`<ol>\` (ordered list) rather than divs because the items have a meaningful hierarchical order. Screen readers announce ordered lists differently from generic containers — a VoiceOver user hears "list, 4 items" and can navigate between items with arrow keys. The \`<nav aria-label="Breadcrumb">\` wrapper registers as a landmark region, so screen reader users can jump directly to it via landmark navigation. The last item uses \`aria-current="page"\` to tell assistive technology that this item represents the current location — it is not a link, just text.

**How the CSS separator trick works**

The separators between items are generated entirely in CSS using the adjacent sibling combinator and the \`::before\` pseudo-element: \`li + li::before { content: '/'; margin: 0 8px; color: #cbd5e1; }\`. This selector reads "for every li that directly follows another li, insert a / before it." The first item gets no separator because there is no preceding sibling. This approach is better than putting separators in the HTML because they are purely presentational — screen readers ignore \`::before\` content by default, so they read "Home, Products, Electronics, Headphones" without announcing the slashes.

**Changing the separator**

To change the separator, find \`content: '/'\` in the CSS panel and update the value. Use \`content: '>'\` for a chevron style, \`content: '\\2192'\` for a right arrow (→), or \`content: '\\00BB'\` for a double angle quote (»). You can also replace the text with a short SVG data URI to use an icon separator.

**Adding breadcrumb schema for Google**

To get Google to show the breadcrumb path in search results, add a JSON-LD script block alongside the HTML. The BreadcrumbList schema lists each item with its name and URL. This snippet's HTML structure already mirrors that schema — each \`<li>\` maps to a ListItem. Add the script tag with type="application/ld+json" and Google will parse it at crawl time with no extra rendering needed.

**Responsive wrapping**

The breadcrumb uses \`flex-wrap: wrap\` so it automatically wraps to multiple lines on narrow screens. On very small screens you may want to show only the last two levels — hide earlier items with \`display: none\` at a media query breakpoint and add an ellipsis item to indicate the hidden path.

**Saving your customised version**

After editing, click **"Save as"** in the editor header, type a name, and press Enter. Saves to IndexedDB and appears in the **Saved** tab in the sidebar.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Load the snippet',
          text: 'Click "Breadcrumb" in the sidebar Library tab. The HTML and CSS panels load instantly and the preview shows the four-item trail.',
        },
        {
          title: 'Update the labels and links',
          text: 'In the HTML panel, replace Home / Products / Electronics / Headphones with your actual page names and href values. The last li should have no anchor — just text with aria-current="page".',
        },
        {
          title: 'Change the separator',
          text: 'In the CSS panel, find li + li::before and update content: \'/\' to any character or CSS unicode escape. The preview updates instantly.',
        },
        {
          title: 'Adjust colours',
          text: 'Update the link colour in .breadcrumb a and the current-page colour in li[aria-current="page"] to match your design system.',
        },
        {
          title: 'Export in your format',
          text: 'Click "HTML" to download a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind CSS version with utility classes.',
        },
        {
          title: 'Save your version',
          text: 'Click "Save as", type a name, and press Enter. Your breadcrumb saves to IndexedDB and appears in the Saved tab.',
        },
      ],
    },
    features: [
      'Semantic ol/li markup — correct hierarchy for screen readers and search engines',
      'CSS li+li::before separator trick — no separators in HTML, invisible to screen readers',
      'aria-label="Breadcrumb" nav landmark and aria-current="page" on the current item',
      'No JavaScript required — pure HTML and CSS',
      'flex-wrap: wrap so breadcrumb reflows on narrow screens',
      'Hover underline on links with smooth colour transition',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Live split-pane editor — preview updates as you type',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Save custom versions to IndexedDB via "Save as"',
    ],
    useCases: [
      {
        icon: 'NAV',
        title: 'E-commerce and content sites',
        desc: 'Drop the breadcrumb into any product, article, or category page. The semantic markup and aria attributes work immediately without configuration.',
      },
      {
        icon: 'LEARN',
        title: 'Learn the CSS pseudo-element separator trick',
        desc: 'The li+li::before technique is a widely-used CSS pattern. Edit the content value in the CSS panel and watch the separator update live to understand how it works.',
      },
      {
        icon: 'GLOBAL',
        title: 'Improve SEO with structured markup',
        desc: 'The ol/li structure maps directly to BreadcrumbList JSON-LD schema. Add a script tag alongside the HTML to get Google to show the breadcrumb path in search result snippets.',
      },
      {
        icon: 'ACCESS',
        title: 'Accessible navigation out of the box',
        desc: 'The nav landmark, ordered list, and aria-current="page" are already in the markup. Screen readers announce the trail correctly with no extra work.',
      },
      {
        icon: 'DESIGN',
        title: 'Customise the separator character',
        desc: 'Change the content value in li+li::before from / to >, an arrow unicode, or a custom icon. A single CSS line change updates every separator in the trail instantly.',
      },
      {
        icon: 'CODE',
        title: 'Generate dynamically in Next.js or React',
        desc: 'Use the JSX export as a base. Map over a route segments array to render each li and anchor dynamically. The last item renders as plain text with aria-current="page".',
      },
      { icon: 'CODE', title: 'Related: CSS Anchor-Positioned Tooltip Menu', desc: 'See the [CSS Anchor-Positioned Tooltip Menu](/ui-snippets/css-anchor-tooltip-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'What is a breadcrumb navigation component?',
        a: 'A breadcrumb is a row of links showing the user\'s current location within a site hierarchy — for example, Home / Products / Electronics / Headphones. It helps users navigate back to parent pages and tells search engines how pages are related. Google can display breadcrumb paths in search result snippets.',
      },
      {
        q: 'Why use ol and li instead of div for breadcrumbs?',
        a: 'Breadcrumb items have a meaningful order — they represent a hierarchy from root to current page. An ordered list (ol) communicates this to screen readers and search engines. Screen readers announce it as a list and allow users to navigate items. Divs and spans have no implicit semantic meaning for navigation.',
      },
      {
        q: 'How does the CSS separator work?',
        a: 'The rule li + li::before { content: \'/\' } uses the adjacent sibling combinator to insert a slash before every li that follows another li. The first item gets no separator because it has no preceding sibling. The separator is generated by CSS, so screen readers ignore it and only announce the link text.',
      },
      {
        q: 'How do I change the separator character?',
        a: 'Find content: \'/\' in the CSS panel and replace it with any string. Use content: \'>\' for a simple chevron, content: \'\\2192\' for →, or content: \'\\00BB\' for ». You can also use a short SVG as a background-image on a ::before pseudo-element with specific width and height instead of a text character.',
      },
      {
        q: 'How do I add breadcrumb schema for Google?',
        a: 'Add a script tag with type="application/ld+json" in your page head containing a BreadcrumbList object. List each item as a ListItem with position, name, and item (URL). Google uses this to display the breadcrumb path inside search result snippets. The HTML structure in this snippet mirrors the schema exactly.',
      },
      {
        q: 'What does aria-current="page" do?',
        a: 'aria-current="page" on the last breadcrumb item tells screen readers that this item represents the current page. The item is plain text with no anchor tag, so users cannot click it. Screen readers announce it differently from the linked items, making the current location clear to assistive technology users.',
      },
      {
        q: 'Can I use this breadcrumb in React or Next.js?',
        a: 'Yes. Click "JSX" to download a React component or "Tailwind" for a Tailwind CSS version. In Next.js, replace the href="#" values with your actual route paths and use the Link component instead of anchor tags. The aria attributes work the same in React JSX.',
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the selector logic here by hand. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why the separator rule targets li + li rather than every li, and why a screen reader ignores the inserted slash even though it's visibly rendered on the page. The same assistant can help optimize it — asking whether the separator content value should be swapped for a locale-aware arrow character for RTL languages, or how to keep the ol semantics intact while generating the list items dynamically from a route array. It's also a good way to extend the pattern: ask it to add the matching BreadcrumbList JSON-LD schema, collapse long trails into a dropdown like a companion snippet, or animate each crumb fading in on route change. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an accessible "breadcrumb navigation" trail in plain HTML and CSS only, no JavaScript, no separator characters typed into the markup.

Requirements:
- A nav element with aria-label="Breadcrumb" wrapping an ordered list (not a div or unordered list), where each list item is either a link or, for the final item only, plain text marked with aria-current="page" and no anchor tag.
- Generate every separator between crumbs purely in CSS using the adjacent sibling combinator (so a rule matches only list items that directly follow another list item) combined with a ::before pseudo-element's content property, so the separator character never appears in the actual HTML text content and is not announced by screen readers.
- The very first crumb must have no separator before it, achieved naturally by the sibling-combinator selector rather than a manual exception.
- Style links with a distinct color and an underline-on-hover transition, and the current page item with a visually heavier weight and darker color than the links, without it appearing clickable.
- Make the list wrap gracefully with flexbox wrapping so a long trail reflows onto a second line on narrow viewports rather than overflowing or getting clipped.
- Keep the whole thing framework-free and dependency-free, ready to have its separator character swapped by editing exactly one CSS content value.`,
    },
  },
};

export default breadcrumb;
