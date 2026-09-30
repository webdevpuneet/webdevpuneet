import HomeGrid from '@/components/HomeGrid';
import HomeOmniSearch from '@/components/HomeOmniSearch';
import ProfileHeroCard from '@/components/ProfileHeroCard';
import HomeSnippetsCarousel from '@/components/HomeSnippetsCarousel';
import { getLatestSnippets } from '@/lib/snippet-related';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { TOOLS, LIVE_TOOLS, SEARCHABLE_TOOLS } from '@/lib/tools-registry';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import { fetchLatestBlogPosts } from '@/lib/blog-feed';
import styles from './page.module.css';

// Playgrounds = every live tool except the UI Snippets library itself
const PLAYGROUND_COUNT = LIVE_TOOLS.filter(t => t.slug !== 'ui-snippets').length;

export const metadata = {
  title: `UI Snippets & Learn to Code — Free Interactive Playgrounds | webdevpuneet.com`,
  description: `${SNIPPET_COUNT}+ copy-paste UI snippets and ${PLAYGROUND_COUNT} interactive playgrounds to learn HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, GSAP and more. Live preview, structured lessons. No install, no signup, 100% private.`,
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com',
    siteName: 'webdevpuneet.com',
    title: `${SNIPPET_COUNT}+ UI Snippets · Learn to Code · Interactive Playgrounds — Free`,
    description: `${SNIPPET_COUNT}+ copy-paste UI snippets and ${PLAYGROUND_COUNT} interactive playgrounds to learn HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, GSAP and more. Live preview, structured lessons. No install, no signup, 100% private.`,
    images: [{ url: 'https://webdevpuneet.com/images/dev-tools.png', width: 1200, height: 640, alt: 'webdevpuneet.com — UI Snippets & Learn to Code' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    creator: '@webdevpuneet',
    title: `${SNIPPET_COUNT}+ UI Snippets · Learn to Code · Interactive Playgrounds — Free`,
    description: `${SNIPPET_COUNT}+ copy-paste UI snippets and ${PLAYGROUND_COUNT} interactive coding playgrounds — HTML, CSS, JavaScript, React, Vue, Next.js, Tailwind and more. No install, no signup, 100% private.`,
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
      description: `${SNIPPET_COUNT}+ copy-paste UI snippets (HTML/CSS/JS components) and ${PLAYGROUND_COUNT} interactive coding playgrounds to learn HTML, CSS, JavaScript, TypeScript, React, Vue, Next.js, Tailwind and more. All free, no signup, runs entirely in your browser.`,
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
      sameAs: ['https://www.webdevpuneet.com/'],
    },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'UI Snippets & Interactive Coding Playgrounds',
  url: 'https://webdevpuneet.com',
  description: 'Free copy-paste UI snippets and browser-based coding playgrounds for learning web development.',
  itemListElement: LIVE_TOOLS
    .map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      description: t.desc,
      url: `https://webdevpuneet.com/${t.slug}`,
    })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are the UI snippets and playgrounds completely free?',
      acceptedAnswer: { '@type': 'Answer', text: `Yes — all ${SNIPPET_COUNT}+ UI snippets and all ${PLAYGROUND_COUNT} coding playgrounds are completely free with no account, no subscription, and no usage limits. There are no paywalled lessons or components.` },
    },
    {
      '@type': 'Question',
      name: 'Does my code get sent to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Snippet previews and every playground run entirely in your browser. Your code and lesson progress stay on your device (progress is saved in your browser\'s local storage).' },
    },
    {
      '@type': 'Question',
      name: 'Which languages and frameworks can I learn?',
      acceptedAnswer: { '@type': 'Answer', text: 'HTML, CSS, SCSS, JavaScript, TypeScript, jQuery, Bootstrap 5, Tailwind CSS, React, Vue.js, Angular, Next.js, GSAP and SVG — each with structured lessons and live preview.' },
    },
    {
      '@type': 'Question',
      name: 'What are the UI snippets?',
      acceptedAnswer: { '@type': 'Answer', text: `${SNIPPET_COUNT}+ production-ready HTML, CSS and JavaScript components — cards, heroes, navigation, modals, forms, loaders, animations, dashboards, games and more. Each has a live preview, source code, and export to React, Vue, Angular and Tailwind.` },
    },
    {
      '@type': 'Question',
      name: 'Do I need to install anything?',
      acceptedAnswer: { '@type': 'Answer', text: 'No installation needed. Open any playground or snippet in a modern browser and start immediately. No Node.js, no npm install, no terminal, no build step.' },
    },
    {
      '@type': 'Question',
      name: 'Which browsers are supported?',
      acceptedAnswer: { '@type': 'Answer', text: 'All modern browsers are supported — Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use it on mobile or tablet?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The layout is fully responsive. Playgrounds with side-by-side editor and preview panels are most comfortable on a larger screen, but everything works on phones and tablets.' },
    },
    {
      '@type': 'Question',
      name: 'Can I save my own code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — My Code (/ui-snippets/mycode/) lets you write and keep your own HTML, CSS and JS snippets in your browser, and playground progress is saved automatically.' },
    },
  ],
};

const SEO = {
  about: {
    title: `${SNIPPET_COUNT}+ UI Snippets & ${PLAYGROUND_COUNT} Interactive Coding Playgrounds — webdevpuneet.com`,
    description: `webdevpuneet.com brings two things together in one place: a library of ${SNIPPET_COUNT}+ copy-paste UI snippets and ${PLAYGROUND_COUNT} interactive coding playgrounds for learning web development — with nothing to install, no account to create, and no code sent to any server.

**UI Snippets** — ${SNIPPET_COUNT}+ production-ready HTML, CSS, and JavaScript components you can copy-paste directly into any project. Cards, heroes, navigation, modals, forms, loaders, animations, dashboards, games and more. No framework required — pure HTML/CSS/JS that works anywhere. Every snippet has a live preview, syntax-highlighted source code, and a dedicated page with framework export tips for React, Vue, and Tailwind. A built-in **Test Exports** preview renders each snippet live in HTML, Tailwind, React, React + Tailwind, Vue, and Angular — so you can confirm the converted code actually works before you download it. **My Code** lets you write and keep your own snippets in the browser.

**Learn to code interactively** — ${PLAYGROUND_COUNT} browser-based playgrounds with no install, no account, and no setup required. The **HTML Playground** teaches semantic markup through 42 lessons. The **CSS Playground** shows every property live with 53 lessons. The **JavaScript Playground** covers 60 lessons from variables through generators and Proxy. The **Tailwind Playground** includes class autocomplete and 48 lessons. The **React Playground** covers 44 lessons from JSX through hooks, portals, and Suspense. The **Vue.js Playground** covers 40 lessons including Composition API, Teleport, and custom directives. The **GSAP Playground** teaches animation with 55 lessons including ScrollTrigger. TypeScript, SCSS, jQuery, Bootstrap 5, Angular, Next.js and SVG playgrounds round out the frontend stack. All save progress automatically in your browser.

Everything is built with React 19 and runs 100% client-side. No signup, no account, no data uploaded — your code never leaves your device. The interface is keyboard-friendly, fast, and fully mobile-responsive.`,
  },
  features: [
    `${SNIPPET_COUNT}+ copy-paste UI snippets — cards, heroes, navigation, modals, forms, loaders, animations, and dashboards in pure HTML/CSS/JS`,
    'Live preview for every snippet — see exactly how it looks before copying; export to React, Vue, Angular and Tailwind',
    `${PLAYGROUND_COUNT} interactive coding playgrounds — HTML, CSS, JavaScript, TypeScript, Tailwind, React, Vue.js, Angular, Next.js, GSAP, SVG, jQuery and Bootstrap 5`,
    'Structured lessons from beginner to pro — no install, no account, progress saved automatically in your browser',
    'My Code — write and keep your own HTML, CSS and JS snippets in the browser',
    '100% browser-based — your code, snippets, and progress never leave your device',
    'No sign-up, no account, no usage limits — completely free',
    'Dark theme UI — keyboard-friendly, fast, and fully mobile-responsive',
  ],
  useCases: [
    {
      icon: 'CODE',
      title: 'Copy-Paste UI Snippets',
      desc: `${SNIPPET_COUNT}+ production-ready HTML, CSS, and JavaScript components — cards, heroes, navigation, modals, forms, loaders, animations, and dashboards. No framework needed. Live preview, one-click copy, works in any project.`,
    },
    {
      icon: 'LEARN',
      title: 'Learn Frontend Interactively',
      desc: 'HTML, CSS, SCSS, JavaScript, TypeScript, Tailwind, React, Vue.js, Angular, Next.js, GSAP and SVG playgrounds — live editor, instant preview, structured lessons from beginner to pro.',
    },
    {
      icon: 'FLOW',
      title: 'Animate the Web',
      desc: 'GSAP and SVG playgrounds teach tweens, timelines, ScrollTrigger, paths and SVG animation with instant visual feedback and replay controls.',
    },
    {
      icon: 'DESIGN',
      title: 'Style With Any Approach',
      desc: 'Plain CSS, SCSS, Tailwind and Bootstrap 5 side by side — learn the box model, flexbox, grid, utilities and components with a live preview.',
    },
  ],
  faqs: [
    {
      q: 'What are the UI snippets?',
      a: `webdevpuneet.com has ${SNIPPET_COUNT}+ copy-paste HTML, CSS, and JavaScript UI components — no framework, no npm install required. Categories include cards, hero sections, navigation, modals, forms, loaders, animations, dashboards, and more. Every snippet has a live preview, syntax-highlighted source, and a dedicated page with notes on using it in React, Vue, and Tailwind projects. New snippets are added regularly.`,
    },
    {
      q: 'Who is this site built for?',
      a: 'webdevpuneet.com is built for frontend developers, students, and anyone learning to code. It covers two areas: UI snippets (copy-paste components) and interactive coding playgrounds (learn HTML/CSS/JS/TypeScript/React/Vue/Next.js and more).',
    },
    {
      q: 'What are the interactive coding playgrounds?',
      a: `${PLAYGROUND_COUNT} browser-based coding playgrounds — no install, no account, no setup required. The **HTML Playground** teaches semantic markup through 42 lessons. The **CSS Playground** shows every property live with 53 lessons. The **JavaScript Playground** has 60 lessons from variables through generators and Proxy. The **Tailwind Playground** includes class name autocomplete and 48 lessons. The **React Playground** covers 44 lessons from JSX through hooks, portals, and Suspense. The **Vue.js Playground** covers 40 lessons including Composition API, Teleport, custom directives, and mini-projects. The **GSAP Playground** teaches animation with 55 lessons including ScrollTrigger. TypeScript, SCSS, jQuery, Bootstrap 5, Angular, Next.js and SVG playgrounds cover the rest of the frontend stack. All save progress automatically.`,
    },
    {
      q: 'Is everything completely free?',
      a: 'Yes — every snippet and playground is completely free with no account, no subscription, and no usage limits. There are no paywalled lessons or components.',
    },
    {
      q: 'Is my code sent to a server?',
      a: 'No. All processing happens entirely in your browser. Your code and lesson progress never leave your device.',
    },
    {
      q: 'Do I need to install anything?',
      a: 'No. Open any playground in a modern browser — Chrome, Firefox, Safari, or Edge — and start immediately. No npm install, no browser extension, no app download required.',
    },
    {
      q: 'Can I use it on mobile?',
      a: 'Yes. The layout is fully responsive and works on phones and tablets. Playgrounds with side-by-side editor and preview are best on larger screens, but everything is functional on mobile.',
    },
    {
      q: 'Will more snippets and lessons be added?',
      a: 'Yes. New UI snippets are added in regular batches and playgrounds gain new lessons over time.',
    },
  ],
};

/* ── Home page tool order ──────────────────────────────────────────────────
   Frontend playgrounds first, then the remaining tools.
   The UI Snippets library has its own card + carousel, so it is left out.
─────────────────────────────────────────────────────────────────────────── */
const FRONTEND_PLAYGROUND_SLUGS = [
  'html-playground', 'css-playground', 'js-playground', 'typescript-playground', 'scss-playground',
  'tailwind-playground', 'react-playground', 'vue-playground', 'angular-playground', 'nextjs-playground',
  'gsap-playground', 'svg-playground', 'jquery-playground', 'bootstrap5-playground',
];

function getToolWeight(t) {
  const i = FRONTEND_PLAYGROUND_SLUGS.indexOf(t.slug);
  if (i !== -1) return i;
  return t.slug.endsWith('-playground') ? 50 : 99;
}

const homeOrderedTools = [...LIVE_TOOLS]
  .filter(t => t.slug !== 'ui-snippets')
  .sort((a, b) => {
    const wa = getToolWeight(a), wb = getToolWeight(b);
    if (wa !== wb) return wa - wb;
    return TOOLS.indexOf(a) - TOOLS.indexOf(b);
  });

/* ── Above-the-fold feature grid content ───────────────────────────────── */
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


function ItemIcon({ d, accent }) {
  return (
    <span className={styles.featureItemIcon} style={{ color: accent, background: accent + '18', borderColor: accent + '38' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
    </span>
  );
}

export default async function Home() {
  const playgroundCardTools = PLAYGROUND_CARD_SLUGS.map(slug => LIVE_TOOLS.find(t => t.slug === slug)).filter(Boolean);
  const latestPosts = await fetchLatestBlogPosts(5);
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
              {SNIPPET_COUNT}+ UI snippets &bull; {PLAYGROUND_COUNT} playgrounds &bull; 100% free &bull; No signup required
            </div>
            <h1 className={styles.title}>
              Build UIs &amp; <span className={styles.titleGrad}>Learn to Code</span>
            </h1>
            <p className={styles.heroTagline}>
              Copy-paste UI snippets and interactive coding playgrounds — all in your browser, instantly.
            </p>
            <div className={styles.heroSearch}>
              <HomeOmniSearch />
            </div>
          </div>
          <div className={styles.heroProfileCol}>
            <ProfileHeroCard />
          </div>
          <p className={styles.subtitleSeo}>{SNIPPET_COUNT}+ copy-paste UI snippets — cards, heroes, navbars, modals, forms, loaders and animations — plus {PLAYGROUND_COUNT} learn-to-code playgrounds for HTML, CSS, JavaScript, TypeScript, React, Vue, Next.js, Tailwind and more. Live preview, structured lessons, nothing to install and no account needed.</p>
        </div>

      {/* ── Latest UI snippets: newest six, arrows page through the rest ── */}
      <HomeSnippetsCarousel items={latestSnippets.items} total={latestSnippets.total} />

      {/* ── Above-the-fold feature grid ──────────────────────────────────── */}
      <div className={`${styles.featureGrid} ${styles.featureGridThree}`}>
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
          <div className={styles.featureFootRow}>
            <span className={styles.featureFootLink}>View by Category</span>
            <span className={styles.featureFootLink}>Browse Tags</span>
          </div>
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
          <div className={styles.featureFootRow}>
            <span className={styles.featureFootLink}>Start Learning</span>
            <span className={styles.featureFootLink}>View All Playgrounds</span>
          </div>
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
                  ? <img className={styles.featureBlogThumb} src={post.thumb} alt="" loading="lazy" />
                  : <span className={styles.featureBlogThumbFallback} aria-hidden="true">{'</>'}</span>}
                <span className={styles.featureItemBody}>
                  <span className={styles.featureBlogTitle}>{post.title}</span>
                </span>
              </a>
            ))}
          </div>
          <a href="https://webdevpuneet.com/blog/" target="_blank" rel="noopener noreferrer" className={styles.featureCtaBtn}>Read More Blogs →</a>
          <div className={styles.featureFootRow}>
            <span className={styles.featureFootLink}>View All Posts</span>
            <span className={styles.featureFootLink}>Development Tips</span>
          </div>
        </div>
      </div>
      </div>

      <IndexOnly><AdSlot showBlog={false} /></IndexOnly>

      <div className={styles.searchToolsWrap}>
        <div id="tools" className={styles.searchToolsHeader}>
          <div className={styles.playgroundHeaderLeft}>
            <span className={styles.playgroundLabel}>All Playgrounds</span>
            <span className={styles.playgroundSub}>{PLAYGROUND_COUNT} free coding playgrounds · No install, no signup</span>
          </div>
        </div>
        <HomeGrid tools={homeOrderedTools} searchTools={SEARCHABLE_TOOLS} />
      </div>

      <div className={styles.seoWrap}>
        <IndexOnly><SeoSection {...SEO} /></IndexOnly>
      </div>
    </div>
  );
}




