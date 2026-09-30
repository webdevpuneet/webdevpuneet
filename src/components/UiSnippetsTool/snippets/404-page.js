const _404Page = {
    id: '404-page',
    title: '404 Error Page',
    category: 'layouts',
    html: `<div class="page">
  <div class="glitch-num" data-text="404">404</div>
  <h1>Page not found</h1>
  <p>The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
  <div class="actions">
    <a href="#" class="btn primary">← Back to home</a>
    <a href="#" class="btn ghost">Report issue</a>
  </div>
  <div class="search-wrap">
    <input type="text" placeholder="Search for something…" class="search" />
    <button class="search-btn">Search</button>
  </div>
  <div class="links">
    <span>Popular pages:</span>
    <a href="#">Dashboard</a>
    <a href="#">Docs</a>
    <a href="#">Pricing</a>
    <a href="#">Blog</a>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.page { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px; max-width: 480px; }

.glitch-num {
  font-size: clamp(80px,18vw,140px); font-weight: 900;
  color: #6366f1; line-height: 1;
  position: relative;
  text-shadow: 0 0 40px rgba(99,102,241,0.4);
  animation: glitch 3s infinite;
}
.glitch-num::before,.glitch-num::after { content: attr(data-text); position: absolute; top:0; left:0; right:0; }
.glitch-num::before { color: #ec4899; clip-path: polygon(0 20%,100% 20%,100% 40%,0 40%); animation: gb 3s infinite; }
.glitch-num::after  { color: #0ea5e9;  clip-path: polygon(0 60%,100% 60%,100% 80%,0 80%); animation: ga 3s infinite; }

@keyframes glitch { 0%,90%,100%{transform:none} 92%{transform:skewX(-3deg)} 94%{transform:skewX(3deg)} }
@keyframes gb { 0%,85%,100%{transform:none;opacity:0} 86%{transform:translateX(-4px);opacity:1} 88%{transform:translateX(4px);opacity:1} 90%{opacity:0} }
@keyframes ga { 0%,88%,100%{transform:none;opacity:0} 89%{transform:translateX(4px);opacity:1} 91%{transform:translateX(-4px);opacity:1} 93%{opacity:0} }

h1 { font-size: 22px; font-weight: 700; color: #f1f5f9; }
p  { font-size: 14px; color: #475569; line-height: 1.7; }

.actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.btn { padding: 9px 20px; font-size: 13px; font-weight: 600; border-radius: 8px; text-decoration: none; transition: all 0.15s; }
.btn.primary { background: #6366f1; color: #fff; }
.btn.primary:hover { background: #4f46e5; }
.btn.ghost  { background: rgba(255,255,255,0.06); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); }
.btn.ghost:hover { background: rgba(255,255,255,0.1); color: #f1f5f9; }

.search-wrap { display: flex; width: 100%; max-width: 340px; }
.search { flex: 1; padding: 10px 14px; font-size: 13px; font-family: inherit; background: #1e293b; border: 1px solid #334155; border-right: none; border-radius: 8px 0 0 8px; outline: none; color: #f1f5f9; }
.search::placeholder { color: #475569; }
.search-btn { padding: 10px 16px; background: #6366f1; color: #fff; border: none; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }

.links { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; font-size: 13px; }
.links span { color: #475569; }
.links a { color: #6366f1; text-decoration: none; font-weight: 500; }
.links a:hover { text-decoration: underline; }`,
    js: '',

  seo: {
    title: '404 Page — Free HTML CSS Error Page Snippet',
    description: 'Dark 404 error page with gradient-filled animated number, message and back-home CTAs — no JavaScript. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: "404 Page — Dark Glitch Animation, Search Box & Popular Pages Navigation",
      description: `A 404 page is what users see when they follow a broken link or mistype a URL. It is one of the most important pages on any website because it directly determines whether a user abandons your site or finds what they were looking for. A poorly designed 404 page showing just "Page not found" with no navigation sends users to your competitors. A well-crafted 404 page reassures users, explains the situation, and offers clear recovery paths — turning a dead end into a retention opportunity.

This snippet delivers a complete, production-ready 404 error page built entirely with HTML and CSS. The centerpiece is a large "404" number that uses the same [glitch text](/ui-snippets/glitch-text/) animation technique: CSS \`@keyframes\` combined with \`::before\` and \`::after\` pseudo-elements using \`content: attr(data-text)\` to duplicate the number, then \`clip-path: polygon()\` to slice each pseudo-element to a horizontal band. The two pseudo-elements are offset by a few pixels horizontally via \`translateX\`, creating a RGB-split glitch effect that triggers every few seconds.

**The glitch animation technique**

The \`.glitch-num\` element stores the text value in \`data-text="404"\`. Both pseudo-elements read this via \`content: attr(data-text)\` and position absolutely over the original. The \`::before\` pseudo-element renders in pink (\`#ec4899\`) and is clipped to the upper band; the \`::after\` renders in blue (\`#0ea5e9\`) and is clipped to the lower band. Three separate \`@keyframes\` animations (\`glitch\`, \`gb\`, \`ga\`) fire in a staggered sequence to produce the displacement effect.

**The font size scaling with clamp()**

The 404 number uses \`font-size: clamp(80px, 18vw, 140px)\` — it scales from 80px on a 375px mobile up to 140px on a 1200px+ desktop, without any media query. This same technique works for any display headline that needs to scale fluidly across viewports.

**Action buttons and recovery UI**

Below the error message, two buttons provide the primary recovery paths: a filled primary "Back to home" button and a ghost "Report issue" button. Below the buttons, a [search box](/ui-snippets/search-box/) lets users search for the missing content directly on the 404 page — reducing bounce rate by giving users something useful to do. The "Popular pages" link row at the bottom provides direct navigation to high-traffic pages like Dashboard, Docs, and Pricing, covering the most common destinations users may have been trying to reach.

**Dark theme with a deep navy background**

The dark \`#0f172a\` background with an indigo accent (\`#6366f1\`) gives the page a premium, tech-focused feel that matches developer tools, SaaS dashboards, and modern product brands. The text shadow on the 404 number (\`0 0 40px rgba(99,102,241,0.4)\`) creates a soft ambient glow that reinforces the accent colour throughout the layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Preview the animated 404 page", text: "The preview shows the dark navy page with the large glitching 404 number, error headline, description text, action buttons, search input, and popular page links in a flex column layout." },
      { title: "Update the error message text", text: "In the HTML panel, find the h1 and p elements. Change the headline and description text to match your site's tone of voice — keep the message friendly, short, and focused on helping the user recover." },
      { title: "Update the navigation links", text: "In the HTML panel, update the href values on the 'Back to home' button and the popular page links to match your site's actual URL structure and most-visited pages." },
      { title: "Change the accent colour to match your brand", text: "In the CSS panel, find every instance of #6366f1 (the indigo accent) and replace it with your brand's primary colour. This updates the 404 text glow, button backgrounds, link colours, and search button simultaneously." },
      { title: "Wire up the search box to your site search", text: "In the HTML, update the search button to submit the form: add a form element wrapping the search inputs and set action='/search' method='get'. The input name='q' will append the query as a URL parameter your search page can read." },
      { title: "Deploy as your custom 404 page", text: "Click 'HTML' to export as a standalone file. Save it as 404.html in your project root. Netlify and Vercel automatically serve this file for all not-found routes. For Apache, add ErrorDocument 404 /404.html to your .htaccess file." },
    ]},
    features: [
      "CSS glitch animation on 404 number using ::before/::after pseudo-elements with clip-path polygon bands",
      "content: attr(data-text) technique duplicates the number for the glitch offset layers",
      "clamp(80px, 18vw, 140px) font size scales 404 number fluidly from mobile to desktop without media queries",
      "Dark #0f172a navy background with #6366f1 indigo accent and ambient text-shadow glow",
      "Primary filled button and ghost outline button for home and report-issue recovery actions",
      "Inline search input with Search button for on-page content discovery from the 404 page",
      "Popular pages link row provides direct navigation to high-traffic site sections",
      "Pure HTML and CSS — zero JavaScript required; works in any project without dependencies",
      "Export as standalone HTML file, React JSX component, or React with Tailwind CSS",
      "Live split-pane editor with mobile, tablet, and desktop device preview sizes",
    ],
    useCases: [
      { icon: "APP", title: "Website and web app 404 error page", desc: "Replace the default server 404 page with a fully branded experience that matches your site's visual identity. The search box and popular page links keep users engaged rather than bouncing to competitors after hitting a broken link, significantly improving the user experience at one of the most common failure points on any website." },
      { icon: "CODE", title: "Custom error pages for static sites and CDNs", desc: "Static hosting platforms like Netlify, Vercel, Cloudflare Pages, and GitHub Pages all support custom 404.html files. Export this snippet, drop it in your project root, and deploy. No server configuration required — the CDN automatically serves your branded 404 page instead of the host's default white-page error screen." },
      { icon: "DESIGN", title: "Dark-themed SaaS and developer tool error pages", desc: "The dark navy aesthetic with indigo accents precisely matches the visual language of developer tools, API dashboards, and SaaS products. When a user hits a broken link inside your app, this page feels like a natural extension of the UI rather than a jarring interruption, maintaining the premium product experience throughout the error state." },
      { icon: "LEARN", title: "Learn CSS glitch effects and clip-path animations", desc: "The 404 glitch is built using CSS clip-path: polygon() to slice pseudo-elements into horizontal bands, combined with translateX offset keyframe animations to create the RGB-split displacement effect. Study the ::before and ::after keyframe timings and the clip-path values to understand how layered CSS animations produce complex visual effects from simple geometric operations." },
      { icon: "FLOW", title: "Client-side router not-found boundary pages", desc: "In React Router, Next.js, and Vue Router, unmatched routes render a not-found component. Export the JSX version of this snippet and use it directly as your NotFound route component. The component is self-contained with no external dependencies, making it trivial to drop into any React or Vue application's routing configuration." },
      { icon: "STAR", title: "Maintenance mode and coming soon pages", desc: "Adapt this page for a [maintenance page](/ui-snippets/maintenance-page/) or [coming soon hero](/ui-snippets/coming-soon-hero/) by changing '404' to '503' and updating the message to explain the site is temporarily down. Use the same dark aesthetic and button layout but replace the search box with a notification signup form so users can be alerted when the site is back online. The clamp() font sizing works equally well for any three-digit status code." },
      { icon: 'CODE', title: 'Related: AI Image Generator UI', desc: 'See the [AI Image Generator UI](/ui-snippets/ai-image-generator-ui/) for a related layouts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Breakout Grid Article Layout', desc: 'See the [Breakout Grid Article Layout](/ui-snippets/breakout-grid-article-layout/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How do I deploy this as a real 404 page on Netlify or Vercel?", a: "Export the snippet as HTML using the 'HTML' button, then save the file as 404.html in the root of your project repository. Netlify automatically detects 404.html and serves it for all not-found routes — no configuration needed. Vercel also serves 404.html automatically. For Next.js specifically, create src/app/not-found.js and export a React component — Next.js renders it for unmatched routes. For Apache servers, add ErrorDocument 404 /404.html to your .htaccess file. For nginx, add error_page 404 /404.html inside your server block." },
      { q: "How does the CSS glitch animation work on the 404 number?", a: "The .glitch-num element has data-text='404' as an HTML attribute. Both ::before and ::after pseudo-elements use content: attr(data-text) to duplicate the number text and position: absolute to overlay it exactly over the original. The ::before pseudo-element is coloured pink (#ec4899) and the ::after is blue (#0ea5e9). Each is clipped to a horizontal band using clip-path: polygon() — upper band for before, lower band for after. Three separate @keyframes animations fire in a coordinated sequence: the main element skews slightly, while each pseudo-element translates horizontally in opposite directions and fades in/out. The combination creates the RGB-split glitch effect that triggers every few seconds." },
      { q: "How do I add a working search box to the 404 page?", a: "Wrap the search input and button in a form element with action pointing to your search page and method='get'. Set the input's name attribute to 'q' (the standard search query parameter). When submitted, the browser navigates to /search?q=userquery and your search page reads the q parameter. If your site uses a search service like Algolia or a CMS search API, the form action can point directly to that endpoint. For a JavaScript-powered search, add an onsubmit handler that prevents the default form submission and instead calls your search function: event.preventDefault(); window.location.href = '/search?q=' + encodeURIComponent(searchInput.value)." },
      { q: "How do I track 404 errors in Google Analytics to find broken links?", a: "Add a script tag to the 404 page that fires a Google Analytics 4 event recording the missing URL. Inside a script block: if (typeof gtag !== 'undefined') { gtag('event', 'page_not_found', { page_location: window.location.href, page_path: window.location.pathname, page_referrer: document.referrer }); } The page_referrer field tells you which page linked to the missing URL, making it easy to find and fix broken internal links. In GA4, create a custom exploration report filtered to the page_not_found event to see your top 404 pages sorted by frequency." },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer the glitch timing by hand — paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how the ::before and ::after pseudo-elements use content: attr(data-text) plus clip-path polygon bands to slice the "404" number into offset RGB layers, and why three separate keyframe animations are staggered rather than combined into one. The same assistant is useful for optimizing it — asking whether the infinite glitch keyframes should pause under prefers-reduced-motion, or whether the clip-path polygon coordinates could be generated programmatically for an arbitrary number of bands. It's just as good for extending the page: ask it to wire the search input to a real endpoint with fetch, add a GA4 tracking snippet for the missing URL and referrer, or generalize the glitch effect into a reusable component that accepts any data-text string for a 500 or maintenance page. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a dark-themed "404 error page" in plain HTML and CSS only — no JavaScript required, no images, no external fonts.

Requirements:
- A large "404" heading element whose text is duplicated into a data-text HTML attribute (not just its inner text), so pseudo-elements can read the same string via content: attr(data-text).
- Two absolutely-positioned pseudo-elements (::before and ::after) layered exactly over the original number, each in a different accent color, each clipped to a distinct horizontal band using clip-path: polygon(...) so only a slice of the duplicated number shows through each layer.
- Three separate @keyframes animations running infinitely: one on the base number applying a barely-perceptible skewX wobble for a couple of percentage points of its duration, and one each on the ::before/::after layers that translateX them a few pixels in opposite directions and toggle their opacity, so the glitch reads as a brief RGB-split flicker rather than a constant effect.
- The number's font-size must use clamp() with a small viewport-width-based middle value so it scales fluidly between a mobile minimum and a desktop maximum with no media queries.
- Below the heading, include a short reassuring message, a primary "back to home" button, a secondary ghost-style button, an inline search input plus button styled as a joined pill (shared border-radius split across both elements), and a row of "popular pages" links — all reachable and legible against a dark navy background.
- Keep the whole thing pure HTML/CSS so it can be dropped in as a static 404.html on any static host with zero JavaScript dependency for the visual effect itself.`,
    },
  }
};

export default _404Page;
