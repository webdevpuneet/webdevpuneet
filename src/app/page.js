import HomeOmniSearch from '@/components/HomeOmniSearch';
import ProfileHeroCard from '@/components/ProfileHeroCard';
import HomeSnippetsCarousel from '@/components/HomeSnippetsCarousel';
import FrontendPlaygroundsStrip from '@/components/FrontendPlaygroundsStrip';
import ToolsStrip from '@/components/ToolsStrip';
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
              {SNIPPET_COUNT}+ UI snippets &bull; {PLAYGROUND_COUNT} playgrounds &bull; 100% free &bull; No signup required
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
          <p className={styles.subtitleSeo}>{SNIPPET_COUNT}+ copy-paste UI snippets — cards, heroes, navbars, modals, forms, loaders and animations — plus {PLAYGROUND_COUNT} learn-to-code playgrounds for HTML, CSS, JavaScript, TypeScript, React, Vue, Next.js, Tailwind and more. Live preview, structured lessons, nothing to install and no account needed.</p>
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
        <IndexOnly><SeoSection {...SEO} /></IndexOnly>
      </div>
    </div>
  );
}




