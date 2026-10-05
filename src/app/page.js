import HomeOmniSearch from '@/components/HomeOmniSearch';
import ProfileHeroCard from '@/components/ProfileHeroCard';
import HomeSnippetsCarousel from '@/components/HomeSnippetsCarousel';
import FrontendPlaygroundsStrip from '@/components/FrontendPlaygroundsStrip';
import ToolsStrip from '@/components/ToolsStrip';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { BrowsePanel } from '@/components/UiSnippetsGallery';
import adStyles from '@/components/AdSlot/styles.module.css';
import { getLatestSnippets } from '@/lib/snippet-related';
import { fetchLatestBlogPosts } from '@/lib/blog-feed';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import styles from './page.module.css';

// Coding playgrounds (lesson-based editors) vs. everything else that is a tool.
const PLAYGROUND_COUNT = LIVE_TOOLS.filter(t => t.slug.endsWith('-playground')).length;
const TOOL_COUNT = LIVE_TOOLS.filter(t => t.slug !== 'ui-snippets' && !t.slug.endsWith('-playground')).length;

const META_DESCRIPTION = `${SNIPPET_COUNT}+ copy-paste UI snippets, ${PLAYGROUND_COUNT} coding playgrounds with lessons and ${TOOL_COUNT} free developer tools for HTML, CSS, JS, React and more. No signup, all in-browser.`;

export const metadata = {
  title: 'Free UI Snippets, Coding Playgrounds & Developer Tools',
  description: META_DESCRIPTION,
  keywords: [
    'ui snippets', 'html css js snippets', 'copy paste ui components', 'learn to code online free',
    'coding playground', 'html playground', 'css playground', 'javascript playground', 'react playground',
    'free developer tools', 'css generators', 'online code editor', 'frontend developer tools',
  ],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com',
    siteName: 'webdevpuneet.com',
    title: 'UI Snippets, Coding Playgrounds & Dev Tools — All Free',
    description: META_DESCRIPTION,
    images: [{ url: 'https://webdevpuneet.com/images/dev-tools.png', width: 1200, height: 640, alt: 'webdevpuneet.com — UI snippets, coding playgrounds and developer tools' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    creator: '@webdevpuneet',
    title: 'UI Snippets, Coding Playgrounds & Dev Tools — All Free',
    description: META_DESCRIPTION,
    images: ['https://webdevpuneet.com/images/dev-tools.png'],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://webdevpuneet.com/#website',
      name: 'webdevpuneet.com',
      url: 'https://webdevpuneet.com',
      inLanguage: 'en',
      description: `${SNIPPET_COUNT}+ copy-paste UI snippets (HTML, CSS and JavaScript components), ${PLAYGROUND_COUNT} interactive coding playgrounds with structured lessons, and ${TOOL_COUNT} free developer tools including CSS generators, code formatters and converters. Free, no signup, runs entirely in your browser.`,
      publisher: { '@id': 'https://webdevpuneet.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://webdevpuneet.com/?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://webdevpuneet.com/#organization',
      name: 'webdevpuneet.com',
      url: 'https://webdevpuneet.com',
      founder: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
      sameAs: ['https://www.webdevpuneet.com/'],
    },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'UI Snippets, Coding Playgrounds and Developer Tools',
  url: 'https://webdevpuneet.com',
  description: 'Free copy-paste UI snippets, browser-based coding playgrounds and developer tools on webdevpuneet.com.',
  itemListElement: LIVE_TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    description: t.desc,
    url: `https://webdevpuneet.com/${t.slug}`,
  })),
};

/* ── FAQ: shown on the page and published as FAQPage structured data ── */
const FAQS = [
  {
    q: 'What is webdevpuneet.com?',
    a: `webdevpuneet.com is a free website for frontend developers and people learning to code. It brings together ${SNIPPET_COUNT}+ copy-paste UI snippets, ${PLAYGROUND_COUNT} interactive coding playgrounds with structured lessons, ${TOOL_COUNT} developer tools such as CSS generators, code formatters and converters, a personal online code editor called My Code, and a blog of tutorials with live demos. Everything runs in your browser with no account.`,
  },
  {
    q: 'Is everything on webdevpuneet.com free?',
    a: 'Yes. Every snippet, playground, lesson and tool is completely free, with no account, no subscription, no trial and no usage limits. Code you copy or generate is yours to use in personal and commercial projects.',
  },
  {
    q: 'What are the UI snippets?',
    a: `${SNIPPET_COUNT}+ ready-to-use HTML, CSS and JavaScript components — buttons, cards, hero sections, navigation, modals, forms, loaders, animations, layouts, tables, dashboards, games and more. Each one has a live preview, an editable code editor, full source code on its page, and one-click export to React (JSX), React + Tailwind, a standalone Tailwind HTML file, a Vue 3 single-file component or an Angular component. Browse them by category or tag, or search the whole library.`,
  },
  {
    q: 'Which languages and frameworks can I learn here?',
    a: `The ${PLAYGROUND_COUNT} playgrounds cover HTML, CSS, SCSS, JavaScript, TypeScript, Tailwind CSS, Bootstrap 5, jQuery, React, Vue.js, Angular, Next.js, GSAP and SVG on the frontend, plus Node.js, Express, Python, PHP, SQL, MongoDB, Redis, GraphQL, Firebase, Git and REST APIs. Most teach through structured lessons with a live editor and preview, and your progress is saved in your browser.`,
  },
  {
    q: 'What developer tools are available?',
    a: `${TOOL_COUNT} tools, including visual CSS generators (Flexbox and Grid builders, gradients, box shadows, glassmorphism, animations, clip-path and more), component builders such as the Responsive Navbar Builder, code formatters and validators for JSON, XML, SQL and HTML, converters like HTML to JSX and JSON to TypeScript, an API request tester, a diff checker, a color contrast checker and an AI prompt builder. The All Tools page lists every one.`,
  },
  {
    q: 'What is My Code?',
    a: 'My Code is a free online code editor on webdevpuneet.com for your own HTML, CSS and JavaScript snippets. It has separate editor panes with a live preview, saves your snippets in your browser, can back them up to a private GitHub Gist, and exports them as an HTML file or a React component. You can save any UI snippet into it, or use Fork & Edit on a demo or a tool such as the Navbar Builder to open the result there and keep editing.',
  },
  {
    q: 'Is my code sent to a server?',
    a: 'No. Snippet previews, playgrounds, tools and My Code all run in your browser, so your code and lesson progress stay on your device. The only exceptions are tools whose job is a network request, such as the API request tester, which sends the requests you ask it to.',
  },
  {
    q: 'Do I need to install anything or create an account?',
    a: 'No. Open any snippet, playground or tool in a modern browser — Chrome, Edge, Firefox or Safari — and start straight away. There is no npm install, no build step, no extension and no sign-up.',
  },
  {
    q: 'Can I use it on a phone or tablet?',
    a: 'Yes. The whole site is responsive. Editors with side-by-side code and preview are most comfortable on a laptop or desktop, but everything works on phones and tablets.',
  },
  {
    q: 'Who builds webdevpuneet.com?',
    a: 'webdevpuneet.com is built and maintained by Puneet Sharma, a frontend developer and UI engineer who builds pixel-perfect HTML, React and WordPress websites. New snippets, lessons, tools and blog posts are added regularly.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

/* ── Page content ── */
const FEATURES = [
  { title: `${SNIPPET_COUNT}+ UI snippets`, text: 'Copy-paste HTML, CSS and JavaScript components with live preview — [browse the library](/ui-snippets/).' },
  { title: `${PLAYGROUND_COUNT} coding playgrounds`, text: 'Learn frontend and backend with structured lessons and a live editor — [start learning](/learn-to-code/).' },
  { title: `${TOOL_COUNT} developer tools`, text: 'CSS generators, builders, formatters and converters — [see all tools](/tools/).' },
  { title: 'Export to any framework', text: 'Every snippet exports to React, React + Tailwind, Tailwind HTML, Vue 3 and Angular.' },
  { title: 'My Code editor', text: 'Keep your own snippets with a live preview, Gist backup and export — [open My Code](/ui-snippets/mycode/).' },
  { title: 'Fork & Edit', text: 'Open any demo or builder result in My Code and keep editing it in the browser.' },
  { title: 'Lessons that save progress', text: 'Pick up any playground exactly where you left off — no account needed.' },
  { title: 'Tutorials with live demos', text: 'Practical front-end guides on the [blog](https://webdevpuneet.com/blog/), every demo runnable and forkable.' },
  { title: '100% in your browser', text: 'Nothing to install, nothing uploaded — your code stays on your device.' },
  { title: 'Free, no sign-up', text: 'No account, no paywall, no limits — and the code is yours to use.' },
];

const ABOUT = `**webdevpuneet.com** is a free home for frontend developers and anyone learning to code. In one place you get **${SNIPPET_COUNT}+ copy-paste UI snippets**, **${PLAYGROUND_COUNT} interactive coding playgrounds** with structured lessons, **${TOOL_COUNT} free developer tools**, a personal online code editor and a blog of practical tutorials. Everything runs in your browser: there is nothing to install, no account to create, and your code never leaves your device.

Use it when you need a component today, when you are learning a language or framework, or when you want a quick tool to generate, format or convert code. Each part of the site is described below.

### UI Snippets: ${SNIPPET_COUNT}+ copy-paste HTML, CSS and JavaScript components

The [UI Snippets library](/ui-snippets/) is a collection of ready-to-use interface components written in plain HTML, CSS and vanilla JavaScript — **buttons, cards, hero sections, navigation, modals, forms, loaders, animations, layouts, tables, dashboards, games** and much more. Every snippet opens in a live editor where you can change the HTML, CSS and JS and see the preview update as you type, check it at mobile, tablet and desktop widths, and copy it in one click.

Because projects use different stacks, every snippet also **exports to React (JSX), React + Tailwind CSS, a standalone Tailwind HTML file, a Vue 3 single-file component and an Angular standalone component**, and a built-in export tester renders each version live so you can confirm it works before you download it. Each snippet has its own page with the full source code, a screenshot, how it works and FAQs. Browse by category or tag, or search all ${SNIPPET_COUNT}+ from the box at the top of this page.

### Learn to code: ${PLAYGROUND_COUNT} interactive playgrounds

The [Learn to Code](/learn-to-code/) playgrounds teach by doing. Each one pairs short lessons with a live editor and an instant preview, so you change real code and see what happens instead of watching a video. On the frontend there are playgrounds for [HTML](/html-playground/) (42 lessons), [CSS](/css-playground/), [SCSS](/scss-playground/) (45 lessons), [JavaScript](/js-playground/) (60 lessons), [TypeScript](/typescript-playground/), [Tailwind CSS](/tailwind-playground/), [Bootstrap 5](/bootstrap5-playground/) (50 lessons), [jQuery](/jquery-playground/) (72 lessons), [React](/react-playground/), [Vue.js](/vue-playground/) (40 lessons), [Angular](/angular-playground/) (45 lessons), [Next.js](/nextjs-playground/), [GSAP](/gsap-playground/) and [SVG](/svg-playground/) (44 lessons).

For the backend and data side there are playgrounds for [Node.js](/nodejs-playground/), [Express](/express-playground/), [Python](/python-playground/), [PHP](/php-playground/) (60 lessons), [SQL](/sql-playground/) with a real PostgreSQL engine in the browser, [MongoDB](/mongo-playground/), [Redis](/redis-playground/), [GraphQL](/graphql-playground/), [Firebase](/firebase-playground/), [Git](/git-playground/) (43 lessons) and a [REST API builder](/rest-api-builder-playground/). Progress is saved in your browser automatically, so you can close the tab and continue exactly where you stopped.

### ${TOOL_COUNT} free developer tools

The [developer tools](/tools/) handle the small jobs that shouldn't need a new package. **CSS generators** build layouts and effects visually with a live preview — the [Flexbox Builder](/flexbox-builder/), [CSS Grid Builder](/css-grid-builder/), [Gradient Generator](/gradient-generator/), [Box Shadow Generator](/box-shadow-generator/), [Glassmorphism Generator](/glassmorphism-generator/), [CSS Animation Generator](/css-animation-generator/) and many more — and component builders such as the [Responsive Navbar Builder](/navbar-builder/) design a whole navigation bar with dropdowns and a mobile menu. **Code tools** format and validate JSON, XML, SQL and HTML, convert HTML to JSX or JSON to TypeScript, compare text with a diff checker and test HTTP APIs, while the [Color Contrast Checker](/color-contrast-checker/) checks WCAG accessibility and [AI Prompt Studio](/ai-prompt-studio/) helps you write better prompts. Most generators export plain CSS, Tailwind, SCSS or a React or Vue component. The [CSS Tools](/css-tools/) page lists just the CSS generators.

### My Code and Fork & Edit

[My Code](/ui-snippets/mycode/) is your own free online code editor for HTML, CSS and JavaScript. Write a snippet from scratch or save any UI snippet into it, edit it with a live preview, and it stays saved in your browser — with an optional private GitHub Gist backup to sync across devices. When it is ready, export it as a standalone HTML file or a React component. **Fork & Edit** buttons on blog demos and on tools like the Navbar Builder open the result straight in My Code, so you can keep building where the demo or tool stops.

### The blog: tutorials with live demos

The [webdevpuneet.com blog](https://webdevpuneet.com/blog/) publishes practical front-end guides — CSS Grid vs Flexbox, container queries, the :has() selector, fluid typography with clamp(), learning to code in the age of AI, and complete guides to the tools on this site. Every article includes live, interactive demos you can open, read the source of, and fork into My Code.

### Private, free and built for the browser

Everything on webdevpuneet.com runs client-side. Snippets, playgrounds, tools and My Code process your code on your own device, and lesson progress and saved snippets stay in your browser's storage. There is no sign-up, no paywall and no usage limit, and the site works in every modern browser on desktop, tablet and phone.`;

const AT_A_GLANCE = {
  columns: ['Section', 'What you get', 'Start here'],
  rows: [
    ['**UI Snippets**', `${SNIPPET_COUNT}+ HTML/CSS/JS components with live editor and export to React, Tailwind, Vue and Angular`, '[Browse snippets](/ui-snippets/)'],
    ['**Learn to Code**', `${PLAYGROUND_COUNT} playgrounds with structured lessons, frontend to backend`, '[Pick a playground](/learn-to-code/)'],
    ['**Developer Tools**', `${TOOL_COUNT} CSS generators, builders, formatters, converters and testers`, '[See all tools](/tools/)'],
    ['**CSS Tools**', 'Visual generators for layout, effects, color and animation', '[CSS Tools](/css-tools/)'],
    ['**My Code**', 'Your own HTML/CSS/JS editor with live preview, saved in the browser', '[Open My Code](/ui-snippets/mycode/)'],
    ['**Blog**', 'Front-end tutorials with live, forkable demos', '[Read the blog](https://webdevpuneet.com/blog/)'],
  ],
};

const STEPS = [
  { title: 'Search or browse', text: `Type what you need — "card", "modal", "flexbox", "json" — into the search box at the top of this page to search snippets, playgrounds and tools at once, or browse the categories and tags.` },
  { title: 'Grab a component', text: 'Open a UI snippet, tweak the HTML, CSS and JS in the live editor, then copy it or export it to React, Tailwind, Vue or Angular.' },
  { title: 'Learn something new', text: 'Open a playground and follow its lessons in order. Edit the code, watch the preview, and come back later — your progress is saved.' },
  { title: 'Generate code with a tool', text: 'Use a CSS generator or builder to design visually, then copy production-ready CSS, Tailwind or a framework component.' },
  { title: 'Keep it in My Code', text: 'Save snippets you edit, or use Fork & Edit, to keep building in your own browser-based code editor.' },
];

const USE_CASES = [
  { icon: '⚡', title: 'Frontend developers shipping fast', desc: 'Skip rebuilding the same components: start from a tested snippet or generate the CSS visually, then export it in the framework your project uses.' },
  { icon: '🎓', title: 'Beginners learning to code', desc: 'Start with the HTML, CSS and JavaScript playgrounds, follow the lessons in order, and see every change in a live preview — no setup, no account.' },
  { icon: '🔁', title: 'Developers learning a new framework', desc: 'Move from plain JavaScript to React, Vue, Angular or Next.js, or from CSS to Tailwind and SCSS, in a playground that runs straight in the browser.' },
  { icon: '🗄️', title: 'Exploring the backend', desc: 'Try SQL, MongoDB, Redis, Node.js, Express, PHP, Python and Git with interactive lessons and simulators before setting anything up locally.' },
  { icon: '👩‍🏫', title: 'Teachers and workshop leaders', desc: 'Project a playground or snippet, edit it live in front of the class, and share the URL — students follow along with nothing to install.' },
  { icon: '🎨', title: 'Designers who code', desc: 'Turn visual ideas into CSS with the generators, check color contrast, and copy production-ready code without memorising syntax.' },
];

const SECTIONS = [
  { type: 'features', label: "What's inside", heading: 'Everything on webdevpuneet.com', items: FEATURES },
  { type: 'text', label: 'About the site', heading: 'Free UI Snippets, Coding Playgrounds and Developer Tools — All in Your Browser', text: ABOUT },
  { type: 'table', label: 'At a glance', heading: 'What You Can Do Here', ...AT_A_GLANCE },
  { type: 'steps', label: 'Get started', heading: 'How to Use webdevpuneet.com', items: STEPS },
  { type: 'cards', label: 'Who it is for', heading: 'Built for Developers and Learners', columns: 3, items: USE_CASES },
  { type: 'callout', variant: 'tip', heading: 'Private by design', text: 'Snippets, playgrounds, tools and My Code all run in your browser. Your code and progress stay on your device — no account, no upload, no tracking of what you write.' },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: FAQS },
];

export default async function Home() {
  const blogPosts = await fetchLatestBlogPosts(6);
  const latestSnippets = getLatestSnippets(60);

  return (
    <div className={styles.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className={styles.hero}>
        {/* Decorative orbs */}
        <div className={styles.heroOrb1} aria-hidden="true" />
        <div className={styles.heroOrb2} aria-hidden="true" />
        <div className={styles.heroOrb3} aria-hidden="true" />

        <div className={styles.heroCenter}>
          <div className={styles.heroTextCol}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              {SNIPPET_COUNT}+ UI snippets &bull; {PLAYGROUND_COUNT} playgrounds &bull; {TOOL_COUNT} tools &bull; 100% free &bull; No signup required
            </div>
            <h1 className={styles.title}>
              Build UIs &amp; <span className={styles.titleGrad}>Learn to Code</span>
            </h1>
            <p className={styles.heroTagline}>
              Copy-paste UI snippets, interactive coding playgrounds and free CSS &amp; developer tools — all in your browser, instantly.
            </p>
            <div className={styles.heroSearch}>
              <HomeOmniSearch />
            </div>
          </div>
          <div className={styles.heroProfileCol}>
            <ProfileHeroCard />
          </div>
          <p className={styles.subtitleSeo}>{SNIPPET_COUNT}+ copy-paste UI snippets — cards, heroes, navbars, modals, forms, loaders and animations — plus {PLAYGROUND_COUNT} learn-to-code playgrounds for HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, SQL, Python and more, and {TOOL_COUNT} free developer tools. Live preview, structured lessons, nothing to install and no account needed.</p>
        </div>

      {/* Leaderboard ad (same unit as the snippet editor, max 90px), full width of the content column. */}
      <div className={styles.snippetBrowse}>
        <PlaygroundTopAd className={styles.homeTopAd} />
      </div>

      {/* Same Categories | Tags browse box as the gallery and snippet pages — plain links, nothing highlighted. */}
      <div className={styles.snippetBrowse}>
        <BrowsePanel activeCategory={null} highlightAll={false} />
      </div>

      {/* ── Latest UI snippets: newest six, arrows page through the rest ── */}
      <HomeSnippetsCarousel items={latestSnippets.items} total={latestSnippets.total} />

      {/* ── Latest blog posts (fetched on the server above) + Learn Coding Visually + tools ── */}
      {/* No top padding: the snippets strip's bottom margin already sets the gap. */}
      <div className={adStyles.relatedFull} style={{ paddingTop: 0 }}>
        <FrontendPlaygroundsStrip blogPosts={blogPosts} blogFirst after={<ToolsStrip />} />
      </div>

      </div>

      <AdSlot />

      <div className={styles.seoWrap}>
        <IndexOnly><SeoSection sections={SECTIONS} /></IndexOnly>
      </div>
    </div>
  );
}
