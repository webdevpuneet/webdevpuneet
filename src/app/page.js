import HomeOmniSearch from '@/components/HomeOmniSearch';
import ProfileHeroCard from '@/components/ProfileHeroCard';
import { fetchLatestBlogPosts } from '@/lib/blog-feed';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import HomeSnippetsCarousel from '@/components/HomeSnippetsCarousel';
import HomeTemplateLibraries from '@/components/HomeTemplateLibraries';
import InViewImg from '@/components/InViewImg';
import { TEMPLATES as SOCIAL_TEMPLATES, TEMPLATE_CATEGORIES as SOCIAL_CATEGORIES } from '@/components/SocialPostTemplates/templates/index.js';
import { EMAIL_TEMPLATES, EMAIL_CATEGORIES } from '@/components/EmailTemplates/templates/index.js';
import { SECTION_TEMPLATES, SECTION_CATEGORIES } from '@/components/SectionTemplates/templates/index.js';
import { WEBSITE_TEMPLATES } from '@/components/SectionTemplates/templates/starters.js';
import { getLatestSnippets } from '@/lib/snippet-related';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import styles from './page.module.css';

// Coding playgrounds (lesson-based editors) vs. everything else that is a tool.
const PLAYGROUND_COUNT = LIVE_TOOLS.filter(t => t.slug.endsWith('-playground')).length;
const TOOL_COUNT = LIVE_TOOLS.filter(t => t.slug !== 'ui-snippets' && !t.slug.endsWith('-playground')).length;
// Template libraries: website templates (Website Builder), website sections, emails, social posts
const TEMPLATE_COUNT = WEBSITE_TEMPLATES.length + SECTION_TEMPLATES.length + EMAIL_TEMPLATES.length + SOCIAL_TEMPLATES.length;
const HOME_TITLE = 'Free UI Snippets, Templates, Coding Playgrounds & Dev Tools';
const HOME_OG_TITLE = 'UI Snippets, Templates, Playgrounds & Dev Tools — All Free';

const META_DESCRIPTION = `${SNIPPET_COUNT}+ UI snippets, ${TEMPLATE_COUNT} website, email & social templates, a website builder, ${PLAYGROUND_COUNT} coding playgrounds and ${TOOL_COUNT} free dev tools. No signup, all in your browser.`;

export const metadata = {
  title: HOME_TITLE,
  description: META_DESCRIPTION,
  keywords: [
    'ui snippets', 'html css js snippets', 'copy paste ui components', 'learn to code online free',
    'coding playground', 'html playground', 'css playground', 'javascript playground', 'react playground',
    'free developer tools', 'css generators', 'online code editor', 'frontend developer tools',
    'free website builder', 'free website templates', 'website section templates', 'html email templates', 'social media post templates',
  ],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com',
    siteName: 'webdevpuneet.com',
    title: HOME_OG_TITLE,
    description: META_DESCRIPTION,
    images: [{ url: 'https://webdevpuneet.com/images/dev-tools.png', width: 1200, height: 640, alt: 'webdevpuneet.com — UI snippets, coding playgrounds and developer tools' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    creator: '@webdevpuneet',
    title: HOME_OG_TITLE,
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
      description: `${SNIPPET_COUNT}+ copy-paste UI snippets (HTML, CSS and JavaScript components), ${TEMPLATE_COUNT} editable templates (website templates with a free website builder, website sections, HTML emails and social media posts), ${PLAYGROUND_COUNT} interactive coding playgrounds with structured lessons, and ${TOOL_COUNT} free developer tools including CSS generators, code formatters and converters. Free, no signup, runs entirely in your browser.`,
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
  name: 'UI Snippets, Templates, Coding Playgrounds and Developer Tools',
  url: 'https://webdevpuneet.com',
  description: 'Free copy-paste UI snippets, editable website, email and social templates, a website builder, browser-based coding playgrounds and developer tools on webdevpuneet.com.',
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
    a: `webdevpuneet.com is a free website for frontend developers and people learning to code. It brings together ${SNIPPET_COUNT}+ copy-paste UI snippets, ${TEMPLATE_COUNT} editable website, email and social templates with a free website builder, ${PLAYGROUND_COUNT} interactive coding playgrounds with structured lessons, ${TOOL_COUNT} developer tools such as CSS generators, code formatters and converters, a personal online code editor called My Code, and a blog of tutorials with live demos. Everything runs in your browser with no account.`,
  },
  {
    q: 'Is everything on webdevpuneet.com free?',
    a: 'Yes. Every snippet, template, playground, lesson and tool is completely free, with no account, no subscription, no trial and no usage limits. Code you copy or generate is yours to use in personal and commercial projects.',
  },
  {
    q: 'What are the UI snippets?',
    a: `${SNIPPET_COUNT}+ ready-to-use HTML, CSS and JavaScript components — buttons, cards, hero sections, navigation, modals, forms, loaders, animations, layouts, tables, dashboards, games and more. Each one has a live preview, an editable code editor, full source code on its page, and one-click export to React (JSX), React + Tailwind, a standalone Tailwind HTML file, a Vue 3 single-file component or an Angular component. Browse them by category or tag, or search the whole library.`,
  },
  {
    q: 'What templates are available?',
    a: `${TEMPLATE_COUNT} free, editable templates: ${WEBSITE_TEMPLATES.length} one-page website templates for SaaS, restaurants, real estate, gyms, clinics, events and more; ${SECTION_TEMPLATES.length} website section templates (navbars, heroes, features, pricing, testimonials, FAQ, footers) animated with GSAP; ${EMAIL_TEMPLATES.length} responsive HTML email templates tested for Gmail, Outlook and Apple Mail; and ${SOCIAL_TEMPLATES.length} social media post templates for Instagram, Facebook, X and LinkedIn. You edit each one in the browser and export HTML, React or Vue code, or PNG and JPG images.`,
  },
  {
    q: 'Can I build a whole website here?',
    a: 'Yes. The free Website Builder stacks navbars, heroes, features, pricing, testimonials, FAQ and footers into one page with a shared theme and GSAP animation. Start from a website template or from scratch, click any text in the preview to edit it, then export clean HTML or a ZIP with every image and host it anywhere.',
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
const ABOUT = `**webdevpuneet.com** is a free home for frontend developers and anyone learning to code. In one place you get **${SNIPPET_COUNT}+ copy-paste UI snippets**, **${TEMPLATE_COUNT} editable templates** with a free website builder, **${PLAYGROUND_COUNT} interactive coding playgrounds** with structured lessons, **${TOOL_COUNT} free developer tools**, a personal online code editor and a blog of practical tutorials. Everything runs in your browser: there is nothing to install, no account to create, and your code never leaves your device.

Use it when you need a component today, when you are learning a language or framework, or when you want a quick tool to generate, format or convert code. Each part of the site is described below.

### UI Snippets: ${SNIPPET_COUNT}+ copy-paste HTML, CSS and JavaScript components

The [UI Snippets library](/ui-snippets/) is a collection of ready-to-use interface components written in plain HTML, CSS and vanilla JavaScript — **buttons, cards, hero sections, navigation, modals, forms, loaders, animations, layouts, tables, dashboards, games** and much more. Every snippet opens in a live editor where you can change the HTML, CSS and JS and see the preview update as you type, check it at mobile, tablet and desktop widths, and copy it in one click.

Because projects use different stacks, every snippet also **exports to React (JSX), React + Tailwind CSS, a standalone Tailwind HTML file, a Vue 3 single-file component and an Angular standalone component**, and a built-in export tester renders each version live so you can confirm it works before you download it. Each snippet has its own page with the full source code, a screenshot, how it works and FAQs. Browse by category or tag, or search all ${SNIPPET_COUNT}+ from the box at the top of this page.

### Templates and a free Website Builder

Four template libraries cover the rest of a project, and every template is edited in the browser with no code. The [Website Builder](/website-builder/) starts from one of **${WEBSITE_TEMPLATES.length} one-page website templates** (SaaS, app, agency, portfolio, restaurant, real estate, gym, clinic, course, event, nonprofit and more) or a blank page; you click any text in the preview to change it, set one theme for the whole page and export clean HTML or a ZIP. Its building blocks are the **${SECTION_TEMPLATES.length} [website section templates](/website-section-templates/)** (navbars, heroes, features, pricing, testimonials, FAQ, calls to action, team, contact, blog and footers), animated with GSAP and exportable on their own as HTML, React or Vue.

For marketing there are **${EMAIL_TEMPLATES.length} [HTML email templates](/email-templates/)**, responsive and tested for Gmail, Outlook, Apple Mail and dark mode, and **${SOCIAL_TEMPLATES.length} [social media post templates](/social-post-templates/)** for Instagram, Facebook, X and LinkedIn that download as PNG or JPG. Your designs, images and fonts are saved in your browser, with a one-file backup to move them between devices.

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
    ['**Website Builder**', `${WEBSITE_TEMPLATES.length} website templates or a blank page; edit in place and export HTML`, '[Build a website](/website-builder/)'],
    ['**Website Sections**', `${SECTION_TEMPLATES.length} navbars, heroes, pricing, FAQ, footers and more, animated with GSAP`, '[Browse sections](/website-section-templates/)'],
    ['**Email & Social Templates**', `${EMAIL_TEMPLATES.length} responsive HTML emails and ${SOCIAL_TEMPLATES.length} social post designs`, '[Email templates](/email-templates/) · [Social posts](/social-post-templates/)'],
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
  { title: 'Build a page from a template', text: 'Open a website, email or social post template, change the text, images, colours and fonts, then export HTML, React or Vue, or download an image.' },
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
  { type: 'text', label: 'About the site', heading: 'Free UI Snippets, Templates, Coding Playgrounds and Developer Tools — All in Your Browser', text: ABOUT },
  { type: 'table', label: 'At a glance', heading: 'What You Can Do Here', ...AT_A_GLANCE },
  { type: 'steps', label: 'Get started', heading: 'How to Use webdevpuneet.com', items: STEPS },
  { type: 'cards', label: 'Who it is for', heading: 'Built for Developers and Learners', columns: 3, items: USE_CASES },
  { type: 'callout', variant: 'tip', heading: 'Private by design', text: 'Snippets, playgrounds, tools and My Code all run in your browser. Your code and progress stay on your device — no account, no upload, no tracking of what you write.' },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: FAQS },
];

/* ── Feature grid content (UI Snippets / Coding Playgrounds / Developer Tools / Blog) ── */
const SNIPPET_CARD_ITEMS = [
  { title: 'Animated Buttons',  sub: 'Modern & interactive button designs', href: '/ui-snippets/buttons/',    accent: '#6366f1', icon: 'M4 10a3 3 0 0 1 3-3h10a3 3 0 0 1 0 6H7a3 3 0 0 1-3-3Z' },
  { title: 'Card Components',   sub: 'Beautiful card layouts',              href: '/ui-snippets/cards/',      accent: '#e11d48', icon: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5ZM3 10h18' },
  { title: 'Navigation Bars',   sub: 'Responsive navbars',                  href: '/ui-snippets/navigation/', accent: '#1f2937', icon: 'M4 6h16M4 12h16M4 18h16' },
  { title: 'Modal Dialogs',     sub: 'Accessible & flexible',               href: '/ui-snippets/modals/',     accent: '#0ea5e9', icon: 'M4 4h16v16H4zM9 9l6 6M15 9l-6 6' },
  { title: 'Form & Input',      sub: 'Stylish form elements',               href: '/ui-snippets/forms/',      accent: '#d97706', icon: 'M4 6h16M4 12h16M4 18h10' },
  { title: 'Loaders',           sub: 'Spinners & progress indicators',      href: '/ui-snippets/loaders/',    accent: '#f59e0b', icon: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83' },
  { title: 'Tables',            sub: 'Sortable & responsive data grids',    href: '/ui-snippets/tables/',     accent: '#059669', icon: 'M3 4h18v16H3zM3 10h18M9 4v16' },
  { title: 'Dashboards',        sub: 'Charts, stats & admin layouts',       href: '/ui-snippets/dashboards/', accent: '#7c3aed', icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2' },
];

const PLAYGROUND_CARD_SLUGS = ['html-playground', 'css-playground', 'js-playground', 'react-playground', 'vue-playground', 'gsap-playground', 'svg-playground', 'tailwind-playground'];
const TOOL_CARD_SLUGS = ['gradient-generator', 'box-shadow-generator', 'flexbox-builder', 'css-grid-builder', 'color-palette-generator', 'navbar-builder', 'css-animation-generator', 'image-editor'];

function ItemIcon({ d, accent }) {
  return (
    <span className={styles.featureItemIcon} style={{ color: accent, background: accent + '18', borderColor: accent + '38' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
    </span>
  );
}

export default async function Home() {
  const blogPosts = await fetchLatestBlogPosts(6);
  const latestSnippets = getLatestSnippets(60);
  // Template libraries as light text cards (no preview images): category links with counts
  const byCategory = (templates, categories, base) => categories
    .map(c => ({ label: c.label, href: `${base}category/${c.id}/`, n: templates.filter(t => t.category === c.id).length }))
    .filter(c => c.n);
  const templateLibs = [
    { id: 'sections', title: 'Website Section Templates', count: `${SECTION_TEMPLATES.length} sections`, accent: '#6366f1', href: '/website-section-templates/', cta: 'Browse sections', chipsLabel: 'category',
      blurb: 'Heroes, navbars, pricing, FAQ, galleries and footers with GSAP animation. Edit, then export HTML, React or Vue.',
      chips: byCategory(SECTION_TEMPLATES, SECTION_CATEGORIES, '/website-section-templates/') },
    { id: 'websites', title: 'Website Templates', count: `${WEBSITE_TEMPLATES.length} websites`, accent: '#0f766e', href: '/website-builder/', cta: 'Open the Website Builder', chipsLabel: 'industry',
      blurb: 'One-page and multi-page websites with real content for each industry. Edit everything and export clean HTML.',
      chips: [...WEBSITE_TEMPLATES].reverse().map(t => ({ label: t.name.replace(/ (Landing Page|Website)/gi, ''), href: `/website-builder/templates/${t.id}/` })) },
    { id: 'social', title: 'Social Post Templates', count: `${SOCIAL_TEMPLATES.length} templates`, accent: '#db2777', href: '/social-post-templates/', cta: 'Browse social templates', chipsLabel: 'category',
      blurb: 'Designs for Instagram, Facebook and X in every post size. Change text, images, colours and fonts, then download.',
      chips: byCategory(SOCIAL_TEMPLATES, SOCIAL_CATEGORIES, '/social-post-templates/') },
    { id: 'email', title: 'Email Templates', count: `${EMAIL_TEMPLATES.length} emails`, accent: '#d97706', href: '/email-templates/', cta: 'Browse email templates', chipsLabel: 'category',
      blurb: 'Responsive HTML emails with dark mode that work in Gmail and Outlook. Edit in the browser and export the code.',
      chips: byCategory(EMAIL_TEMPLATES, EMAIL_CATEGORIES, '/email-templates/') },
  ];
  const playgroundCardTools = PLAYGROUND_CARD_SLUGS.map(slug => LIVE_TOOLS.find(t => t.slug === slug)).filter(Boolean);
  // Six for the blog fetch; the blog card lists the first four.
  const latestPosts = blogPosts.slice(0, 4);
  const toolCardTools = TOOL_CARD_SLUGS.map(slug => LIVE_TOOLS.find(t => t.slug === slug)).filter(Boolean);

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
              {SNIPPET_COUNT}+ UI snippets &bull; {TEMPLATE_COUNT} templates &bull; {PLAYGROUND_COUNT} playgrounds &bull; {TOOL_COUNT} tools &bull; 100% free &bull; No signup required
            </div>
            <h1 className={styles.title}>
              Build UIs &amp; <span className={styles.titleGrad}>Learn to Code</span>
            </h1>
            <p className={styles.heroTagline}>
              Copy-paste UI snippets, edit free website, email and social templates, practise in live coding playgrounds and use developer tools — all in your browser, instantly.
            </p>
            <div className={styles.heroSearch}>
              <HomeOmniSearch />
            </div>
          </div>
          <div className={styles.heroProfileCol}>
            <ProfileHeroCard />
          </div>
          <p className={styles.subtitleSeo}>{SNIPPET_COUNT}+ copy-paste UI snippets — cards, heroes, navbars, modals, forms, loaders and animations — {TEMPLATE_COUNT} editable website, email and social templates with a free website builder, {PLAYGROUND_COUNT} learn-to-code playgrounds for HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, SQL, Python and more, and {TOOL_COUNT} free developer tools. Live preview, structured lessons, nothing to install and no account needed.</p>
        </div>

      {/* ── Latest UI snippets: newest five, arrows page through the rest ── */}
      <div className={styles.snippetsStrip}>
        <HomeSnippetsCarousel items={latestSnippets.items} total={latestSnippets.total} />
      </div>

      {/* ── Template libraries: light text cards (no preview images) ── */}
      <div className={styles.snippetsStrip}>
        <HomeTemplateLibraries libs={templateLibs} />
      </div>

      {/* ── Feature grid: UI Snippets / Coding Playgrounds / Developer Tools / Latest From the Blog ── */}
      <div className={styles.featureGrid}>
        <div className={styles.featureCard} style={{ '--fc-accent': '#7c3aed' }}>
          <div className={styles.featureCardTop}>
            <span className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </span>
            <h2 className={styles.featureTitle}>UI Snippets</h2>
            <a href="/ui-snippets/" className={styles.featureArrowLink} aria-label="View UI Snippets">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
          <p className={styles.featureDesc}>Copy-paste ready UI components for your next project. {SNIPPET_COUNT}+ snippets across 20+ categories.</p>
          <div className={styles.featureList}>
            {SNIPPET_CARD_ITEMS.map(item => (
              <a key={item.href} href={item.href} className={styles.featureItem}>
                <ItemIcon d={item.icon} accent={item.accent} />
                <span className={styles.featureItemBody}>
                  <span className={styles.featureItemTitle}>{item.title}</span>
                  <span className={styles.featureItemSub}>{item.sub}</span>
                </span>
                <svg className={styles.featureItemChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
              </a>
            ))}
          </div>
          <a href="/ui-snippets/" className={styles.featureCtaBtn}>Explore All UI Snippets →</a>
        </div>

        <div className={styles.featureCard} style={{ '--fc-accent': '#2563eb' }}>
          <div className={styles.featureCardTop}>
            <span className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
            </span>
            <h2 className={styles.featureTitle}>Coding Playgrounds</h2>
            <a href="/learn-to-code/" className={styles.featureArrowLink} aria-label="View coding playgrounds">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
          <p className={styles.featureDesc}>Learn HTML, CSS, JavaScript, React and Next.js visually with live editors. No install required.</p>
          <div className={styles.featureList}>
            {playgroundCardTools.map(tool => (
              <a key={tool.slug} href={`/${tool.slug}`} className={styles.featureItem}>
                <span className={styles.featureItemIcon} style={{ background: tool.accent + '18', borderColor: tool.accent + '38' }}>
                  {tool.icon?.startsWith('/')
                    ? <img src={tool.icon} alt="" width={15} height={15} />
                    : <span style={{ color: tool.accent }}>{tool.icon}</span>}
                </span>
                <span className={styles.featureItemBody}>
                  <span className={styles.featureItemTitle}>{tool.name}</span>
                  <span className={styles.featureItemSub}>{tool.sub}</span>
                </span>
                <svg className={styles.featureItemChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
              </a>
            ))}
          </div>
          <a href="/learn-to-code/" className={styles.featureCtaBtn}>Open All Playgrounds →</a>
        </div>

        <div className={styles.featureCard} style={{ '--fc-accent': '#0d9488' }}>
          <div className={styles.featureCardTop}>
            <span className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </span>
            <h2 className={styles.featureTitle}>Developer Tools</h2>
            <a href="/tools/" className={styles.featureArrowLink} aria-label="View developer tools">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
          <p className={styles.featureDesc}>{TOOL_COUNT} free browser-based tools for developers and designers — CSS generators, builders and converters. No install, no signup.</p>
          <div className={styles.featureList}>
            {toolCardTools.map(tool => (
              <a key={tool.slug} href={`/${tool.slug}/`} className={styles.featureItem}>
                <span className={styles.featureItemIcon} style={{ background: tool.accent + '18', borderColor: tool.accent + '38' }}>
                  {tool.icon?.startsWith('/')
                    ? <img src={tool.icon} alt="" width={15} height={15} />
                    : <span style={{ color: tool.accent }}>{tool.icon}</span>}
                </span>
                <span className={styles.featureItemBody}>
                  <span className={styles.featureItemTitle}>{tool.name}</span>
                  <span className={styles.featureItemSub}>{tool.sub}</span>
                </span>
                <svg className={styles.featureItemChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            ))}
          </div>
          <a href="/tools/" className={styles.featureCtaBtn}>Browse All Tools →</a>
        </div>

        <div className={styles.featureCard} style={{ '--fc-accent': '#e11d48' }}>
          <div className={styles.featureCardTop}>
            <span className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
            </span>
            <h2 className={styles.featureTitle}>Latest From the Blog</h2>
            <a href="https://webdevpuneet.com/blog/" target="_blank" rel="noopener noreferrer" className={styles.featureArrowLink} aria-label="Visit the blog">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
          <p className={styles.featureDesc}>Practical tutorials, examples and guides for modern web development.</p>
          <div className={styles.featureList}>
            {latestPosts.length === 0 && (
              <p className={styles.featureEmptyNote}>Couldn&apos;t load the latest posts right now — <a href="https://webdevpuneet.com/blog/" target="_blank" rel="noopener noreferrer">browse the blog directly</a>.</p>
            )}
            {latestPosts.map(post => (
              <a key={post.href} href={post.href} target="_blank" rel="noopener noreferrer" className={styles.featureBlogItem}>
                {post.thumb
                  ? <InViewImg className={styles.featureBlogThumb} src={post.thumb} alt="" />
                  : <span className={styles.featureBlogThumbFallback} aria-hidden="true">{'</>'}</span>}
                <span className={styles.featureItemBody}>
                  <span className={styles.featureBlogTitle}>{post.title}</span>
                </span>
              </a>
            ))}
          </div>
          <a href="https://webdevpuneet.com/blog/" target="_blank" rel="noopener noreferrer" className={styles.featureCtaBtn}>Read More Blogs →</a>
        </div>
      </div>

      </div>

      <AdSlot />

      <div className={styles.seoWrap}>
        <IndexOnly><SeoSection sections={SECTIONS} /></IndexOnly>
      </div>
    </div>
  );
}
