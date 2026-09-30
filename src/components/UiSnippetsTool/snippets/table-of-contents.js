const tableOfContents = {
  id: 'table-of-contents',
  title: 'Table of Contents',
  category: 'navigation',
  html: `<div class="demo-layout">

  <!-- TOC Sidebar -->
  <nav class="toc" id="toc" aria-label="Table of contents">
    <div class="toc-head">On this page</div>
    <ul class="toc-list" id="toc-list"></ul>
  </nav>

  <!-- Article content -->
  <article class="article" id="article">
    <h1>Getting started with Next.js</h1>

    <h2 id="installation">Installation</h2>
    <p>Run npx create-next-app@latest to scaffold a new Next.js project. The CLI will ask you several questions about TypeScript, ESLint, Tailwind CSS, and the App Router. Choose the options that match your project requirements.</p>
    <p>Once the project is created, run npm run dev to start the development server on port 3000. The project comes pre-configured with hot module replacement, so changes you make to files are reflected in the browser instantly without a full page reload.</p>
    <p>Node.js 18.17 or later is required. You can check your version with node -v. If you need to manage multiple Node versions, nvm (Node Version Manager) makes switching between them straightforward.</p>

    <h2 id="project-structure">Project structure</h2>
    <p>Next.js 15 with the App Router organises your application inside the app directory. Each folder in app corresponds to a route segment. Special files like layout.js, page.js, and loading.js control the UI and behaviour of each route.</p>
    <p>The public folder holds static assets like images and fonts that are served directly from the root URL. Files placed here are accessible at the path /filename — no import required. Keep images optimised before placing them here since Next.js serves them as-is.</p>
    <p>Configuration lives in next.config.mjs at the root. This is where you enable features like image domains, redirects, environment variable exposure, and custom webpack settings. Most projects only need a handful of lines here.</p>

    <h3 id="app-directory">The app directory</h3>
    <p>The app directory enables React Server Components by default. Components defined here run on the server unless you add the "use client" directive. This model dramatically reduces JavaScript sent to the browser since server-only logic like database queries never ships to the client.</p>
    <p>Special files inside any route folder have reserved roles: layout.js wraps all child routes and persists across navigation; page.js is the publicly accessible UI; loading.js shows a skeleton while the page streams in; error.js catches runtime errors and renders a fallback.</p>

    <h3 id="pages-directory">The pages directory</h3>
    <p>The pages directory uses the older Pages Router. Both routers can coexist in the same application — useful when migrating an existing app incrementally to the App Router. Files placed inside pages automatically become routes, with index.js mapping to the root.</p>
    <p>API routes in the pages router live in pages/api and export handler functions. They run on the server and are useful for form submissions, webhook receivers, and lightweight backend logic without standing up a separate API server.</p>

    <h2 id="routing">Routing</h2>
    <p>File-based routing is one of Next.js's defining features. Every file in the app directory automatically becomes a route. Dynamic segments are created with square bracket syntax: [id] matches any value and provides it as a param to the component.</p>
    <p>Route groups created with (parentheses) let you organise folders without affecting the URL. Parallel routes defined with @slot allow multiple pages to render side by side in the same layout — useful for dashboards with independently loading panels.</p>
    <p>Linking between routes uses the Link component from next/link. It prefetches the linked page in the background when the link enters the viewport, making navigation feel instant. For programmatic navigation, useRouter from next/navigation provides push, replace, and back methods.</p>

    <h3 id="dynamic-routes">Dynamic routes</h3>
    <p>Dynamic routes like app/blog/[slug]/page.js match paths such as /blog/my-first-post. The slug is available via the params prop in the page component. Use generateStaticParams to pre-render dynamic routes at build time for optimal performance.</p>
    <p>Catch-all segments using [...slug] match any number of path segments. Optional catch-all segments [[...slug]] also match the route with no segments at all. These are useful for documentation sites where the depth of the URL hierarchy isn't known ahead of time.</p>

    <h2 id="data-fetching">Data fetching</h2>
    <p>Server Components can fetch data directly using async/await. This happens on the server during rendering. The result is streamed to the client. Use the React cache() function to deduplicate requests for the same data within a single render.</p>
    <p>Next.js extends the native fetch API with caching options. Pass cache: 'no-store' for always-fresh data, or next: &#123; revalidate: 60 &#125; to refresh cached data every 60 seconds. This incremental static regeneration approach gives you the performance of static with the freshness of dynamic.</p>
    <p>For client-side data fetching after the initial render, SWR and React Query both work well in Next.js Client Components. They handle caching, revalidation, and loading states so you don't have to manage useEffect-based fetching manually.</p>

    <h2 id="deployment">Deployment</h2>
    <p>Deploying a Next.js application to Vercel requires only connecting your Git repository. Vercel automatically detects Next.js and configures the build process. Every push to main triggers a production deployment; every pull request gets its own preview URL.</p>
    <p>For self-hosted deployments, run npm run build to produce an optimised production build, then npm start to serve it. You can also export a fully static site with output: 'export' in next.config.mjs — the result is plain HTML, CSS, and JS that can be served from any CDN or static host.</p>
    <p>Environment variables are loaded from .env.local in development and from your hosting provider's dashboard in production. Prefix variables with NEXT_PUBLIC_ to expose them to the browser; all others remain server-only and are never included in the client bundle.</p>
  </article>

</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 32px 20px; }

.demo-layout { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }
@media (max-width: 700px) { .demo-layout { grid-template-columns: 1fr; } .toc { display: none; } }

/* TOC */
.toc { position: sticky; top: 20px; padding: 16px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; }
.toc-head { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #94a3b8; margin-bottom: 12px; }

.toc-list { list-style: none; display: flex; flex-direction: column; gap: 2px; }
.toc-item { }
.toc-link { display: block; font-size: 13px; color: #64748b; text-decoration: none; padding: 4px 8px; border-radius: 6px; border-left: 2px solid transparent; transition: color 0.12s, background 0.12s, border-color 0.12s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.toc-link:hover { color: #0f172a; background: #f8fafc; }
.toc-link.active { color: #6366f1; border-left-color: #6366f1; font-weight: 600; }
.toc-link.h3 { font-size: 12px; padding-left: 18px; }

/* Article */
.article { background: #fff; border-radius: 14px; padding: 32px; border: 1px solid #e2e8f0; line-height: 1.75; }
.article h1 { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 28px; }
.article h2 { font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 32px; margin-bottom: 12px; padding-top: 16px; border-top: 1px solid #f1f5f9; }
.article h2:first-of-type { border-top: none; margin-top: 0; }
.article h3 { font-size: 15px; font-weight: 700; color: #374151; margin-top: 20px; margin-bottom: 8px; }
.article p  { font-size: 14px; color: #475569; margin-bottom: 14px; }`,
  js: `// Build TOC from headings in the article
const article = document.getElementById('article');
const tocList  = document.getElementById('toc-list');
const headings = [...article.querySelectorAll('h2, h3')];

headings.forEach(h => {
  if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/\\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  const li = document.createElement('li');
  li.className = 'toc-item';
  const a = document.createElement('a');
  a.className = 'toc-link' + (h.tagName === 'H3' ? ' h3' : '');
  a.href = '#' + h.id;
  a.textContent = h.textContent;
  a.addEventListener('click', e => {
    e.preventDefault();
    h.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  li.appendChild(a);
  tocList.appendChild(li);
});

// Highlight active section on scroll — only one item active at a time
const visible = new Set();
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) visible.add(entry.target);
    else visible.delete(entry.target);
  });
  // Pick the topmost visible heading (earliest in document order)
  const active = headings.find(h => visible.has(h));
  tocList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
  if (active) {
    const link = tocList.querySelector('a[href="#' + active.id + '"]');
    if (link) link.classList.add('active');
  }
}, { rootMargin: '-10% 0% -70% 0%', threshold: 0 });

headings.forEach(h => observer.observe(h));`,
  seo: {
    title: 'Table of Contents — Free HTML CSS JS Snippet',
    description: 'Auto-generated TOC from page headings with IntersectionObserver active highlight and smooth scroll. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Table of Contents — Auto-Generated from Headings, IntersectionObserver Active Highlight & Sticky Sidebar',
      description: `Land on a 3,000-word guide with no table of contents and the only way to know what's ahead — or to get back to the part about installation — is to scroll and hope. A sidebar that lists every section, jumps to it on click, and quietly tracks which one you're currently reading turns that wall of text into something closer to a map. This snippet builds that sidebar entirely from the article's own markup: it walks the DOM for \`h2\`/\`h3\` elements, builds the link list automatically, highlights whichever section currently fills the reader's view using \`IntersectionObserver\`, smooth-scrolls on click, and stays pinned in view via \`position: sticky\` as the page scrolls beneath it.\n\n**Building the list from the headings that already exist**\n\nRather than asking authors to maintain a parallel list of links — the kind that quietly drifts out of sync the moment someone adds a section and forgets the sidebar — the script queries \`article.querySelectorAll('h2, h3')\` and builds one \`<li>\` per heading it finds. Any heading missing an \`id\` gets one generated on the spot: \`h.textContent.trim().toLowerCase().replace(/\\\s+/g,'-').replace(/[^a-z0-9-]/g,'')\`, lowercasing, hyphenating spaces, and stripping anything that wouldn't survive in a URL fragment. The practical result is that *any* article with headings gets a working, always-current TOC the moment this script runs against it — no manual bookkeeping required.\n\n**Why the active zone sits near the top of the viewport, not the middle**\n\nA naive "50% visible = active" rule sounds reasonable until you notice that long sections dominate the screen for most of the scroll, while short ones flicker active and inactive within a single swipe. This snippet instead uses \`rootMargin: '-10% 0% -70% 0%'\`, which shrinks the observer's effective viewport down to a thin horizontal band occupying roughly the top fifth of the screen. A heading is "active" the instant it crosses into *that* band — which corresponds almost exactly to where a reader's eyes are actually resting as they scroll downward. It's the same top-band philosophy the [Scroll-Spy Navigation](/ui-snippets/scroll-spy-nav) snippet uses for its sliding indicator, just applied here to a flat list of links instead of a pill that glides between them.\n\n**Two heading levels, one indentation rule**\n\nThe visual hierarchy between \`h2\` and \`h3\` entries comes from a single conditional class: links built from an \`H3\` element get \`.h3\` appended, which adds \`padding-left: 18px\` and drops the font size slightly. No nested \`<ul>\` elements, no recursive tree-building — just one class name deciding how far an item sits from the left edge, which keeps the markup flat and the click-to-scroll wiring identical for every link regardless of its level.\n\n**Sticking around without JavaScript scroll handlers**\n\nThe sidebar uses \`position: sticky; top: 20px\`, a single CSS declaration that keeps it pinned near the top of the viewport as the surrounding page scrolls — without a single \`scroll\` event listener computing offsets on every frame. Pair that with \`scrollIntoView({ behavior: 'smooth', block: 'start' })\` on each link's click handler (after \`e.preventDefault()\` cancels the browser's instant jump), and the whole navigation experience — sticky position, smooth travel, live highlight — runs almost entirely on browser-native primitives rather than hand-rolled scroll math. For pages where readers expand and collapse long sections rather than scrolling through everything, the [Read More Expand](/ui-snippets/read-more) snippet pairs naturally with this pattern.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Scroll the article to see active section highlighting', text: 'As you scroll, the TOC link for the currently visible heading turns indigo and gets a left border. Scroll through the article to see it track your reading position.' },
      { title: 'Click any TOC link to jump to that section', text: 'Clicking a TOC link smoothly scrolls the article to that heading using scrollIntoView. The active highlight updates to the section you jumped to.' },
      { title: 'Replace the article content with your own', text: 'Update the .article HTML with your real content. Keep the h2 and h3 elements with meaningful ids (or let the script auto-generate them from heading text). The TOC regenerates automatically from the heading structure.' },
      { title: 'Adjust the active detection zone', text: 'Update the IntersectionObserver rootMargin: "-10% 0% -70% 0%" to change when sections become "active". Increase the top margin to activate later in the scroll; decrease the bottom margin to keep the active section visible longer.' },
      { title: 'Customise h2 and h3 visual hierarchy', text: 'Edit .toc-link.h3 padding-left and font-size for the indentation level. Add .h4 class support by updating the querySelectorAll to include h4 and adding the .h4 CSS class.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useEffect and useRef, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['Auto-generates TOC from all h2 and h3 elements in the article','Auto-id generation for headings without ids: lowercase + hyphenate + strip special chars','IntersectionObserver rootMargin: active = heading in top 20% of viewport','h3 indentation: .h3 class adds padding-left and smaller font-size','Smooth scroll: e.preventDefault() + scrollIntoView({behavior:"smooth"})','Active link: indigo text + 2px left border via .active class','Sticky sidebar: position:sticky top:20px — stays visible during scroll','observer.observe() on each heading after TOC is built'],
    useCases: [
      { icon: 'CODE', title: 'Technical documentation and API reference pages', desc: 'Long API documentation pages need a TOC for navigation. The auto-generation means adding new sections automatically appears in the TOC without any maintenance. The active highlight shows exactly which API method is currently in view.' },
      { icon: 'DESIGN', title: 'Blog posts and long-form editorial content', desc: 'Long-form blog posts benefit from TOC sidebars that give readers an overview and let them jump to the sections most relevant to them. The sticky sidebar stays accessible throughout the entire scroll.' },
      { icon: 'LEARN', title: 'Course content and tutorial pages', desc: 'Learning platform course pages with step-by-step tutorials use TOCs to show the learning structure and let students jump to specific steps or concepts. The active highlight shows progress through the lesson.' },
      { icon: 'APP', title: 'Legal documents and terms of service pages', desc: 'Legal documents are notoriously long and hard to navigate. A TOC with section anchors lets users jump to the specific clauses relevant to them. The active highlight confirms they reached the right section.' },
      { icon: 'LEARN', title: 'Study IntersectionObserver for scroll-based UI', desc: 'The TOC demonstrates IntersectionObserver with a custom rootMargin for partial viewport detection. The "-10% 0% -70% 0%" margin creates a detection zone in the upper portion of the viewport.' },
      { icon: 'FLOW', title: 'Product changelog and release notes pages', desc: 'Changelog pages list releases with h2 headers for each version. The TOC provides quick access to specific versions without scrolling. Users can share a link with the hash to point to a specific release.' },
    ],
    faqs: [
      { q: 'How does IntersectionObserver detect the active section?', a: 'The observer uses rootMargin: "-10% 0% -70% 0%". This shrinks the root viewport: 10% from the top and 70% from the bottom, creating a detection zone that is only the top 20% of the viewport. When a heading enters this zone (moves to the top of the screen as the user scrolls), its TOC link becomes active. When the next heading enters the zone, the first one exits and becomes inactive. This creates a clean single-active-section highlight that tracks scroll position precisely.' },
      { q: 'How do I add the TOC to an existing CMS or markdown page?', a: 'The auto-generation works on any page with h2/h3 elements. Add the TOC container HTML (<nav class="toc" id="toc">) to your page template. Include the JavaScript after your article content. The script automatically finds all headings in #article and builds the TOC. For a CMS, add the TOC HTML to your layout template and include the script in your base JavaScript bundle.' },
      { q: 'How do I make the TOC collapsible on mobile?', a: 'Add a toggle button: <button class="toc-toggle" onclick="toggleTOC()">Contents</button>. Style it to appear only on mobile: @media (max-width: 700px) { .toc-toggle { display: block; } }. In toggleTOC(): document.getElementById("toc-list").classList.toggle("hidden"). Add .hidden { display: none } to CSS. The sticky sidebar remains visible on desktop; on mobile it becomes a collapsible panel.' },
      { q: 'How do I use this TOC in a React or Next.js project?', a: 'Click "JSX" to download. Use useRef(null) for the article element. Run the heading collection and TOC building in useEffect([]) after mount. For the IntersectionObserver, also create it in useEffect and return a cleanup function: return () => observer.disconnect(). For Next.js App Router, use "use client" on the component since it uses DOM APIs and useEffect.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the rootMargin math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the observer's rootMargin of -10% top and -70% bottom shrinks the detection zone to a thin band near the top of the viewport, and how the visible Set combined with headings.find picks exactly one active heading even when several technically intersect at once. The same assistant can help optimize it — for instance whether rebuilding the auto-generated ids with a regex on every load is safe against duplicate heading text, or whether observing every heading individually scales fine on an article with hundreds of sections. It's also useful for extending the component: ask it to add a collapsible mobile version, support h4 nesting with deeper indentation, or highlight reading progress within the active section instead of just marking one link active. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an auto-generating "table of contents" sidebar in plain HTML, CSS, and JavaScript using only IntersectionObserver — no scroll-position math, no framework.

Requirements:
- On load, query the article container for all h2 and h3 elements (in document order) and build one table-of-contents link per heading found — do not hand-author a parallel list of links anywhere in the markup.
- Any heading missing an id attribute must have one generated automatically from its text content: lowercased, whitespace collapsed to hyphens, and any character that isn't a lowercase letter, digit, or hyphen stripped out.
- Give h3-derived links an extra CSS class that adds left indentation and a smaller font size compared to h2-derived links, using a flat list (no nested unordered lists).
- Clicking a table-of-contents link must prevent the default instant jump and instead smooth-scroll the matching heading into view using scrollIntoView with smooth behavior.
- Create exactly one IntersectionObserver (not one per heading) that observes every heading, with a rootMargin that shrinks the effective viewport to roughly the top 20% of the screen (e.g. a large negative bottom margin and a smaller negative top margin) — a heading is "active" only once it crosses into that band.
- Maintain the current set of intersecting headings and always pick the one that comes first in document order among those currently visible as the single active link, removing the active class from every other link.
- The sidebar itself must use position: sticky to stay pinned near the top of the viewport as the user scrolls, and must collapse or hide entirely below a chosen mobile breakpoint via a media query.`,
    },
  },
};

export default tableOfContents;
