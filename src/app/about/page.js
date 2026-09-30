import styles from '../privacy-policy/styles.module.css';
import aboutStyles from './styles.module.css';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import { LIVE_TOOLS } from '@/lib/tools-registry';

const LIVE_TOOL_COUNT = LIVE_TOOLS.length;

export const metadata = {
  title: 'About webdevpuneet.com — Free UI Snippets & Coding Playgrounds | webdevpuneet.com',
  description: 'webdevpuneet.com — free UI snippets and interactive coding playgrounds by Puneet Sharma. No install, no signup, no data collection. Everything runs in your browser.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/about/' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/about/',
    siteName: 'webdevpuneet.com',
    title: 'About webdevpuneet.com — Free UI Snippets & Coding Playgrounds',
    description: `webdevpuneet.com is a free collection of ${SNIPPET_COUNT}+ UI snippets and ${LIVE_TOOL_COUNT} browser-based coding playgrounds. No install, no sign-up, no data collection. Built by Puneet Sharma.`,
    images: [{ url: 'https://webdevpuneet.com/images/dev-tools.png', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'About webdevpuneet.com — Free UI Snippets & Coding Playgrounds',
    description: `webdevpuneet.com is a free collection of ${SNIPPET_COUNT}+ UI snippets and ${LIVE_TOOL_COUNT} browser-based coding playgrounds. No install, no sign-up, no data collection.`,
    images: ['https://webdevpuneet.com/images/dev-tools.png'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://webdevpuneet.com/about/' },
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'webdevpuneet.com',
  url: 'https://webdevpuneet.com',
  description: `A free collection of ${SNIPPET_COUNT}+ UI snippets and ${LIVE_TOOL_COUNT} browser-based coding playgrounds. No install, no sign-up, no data collection.`,
  founder: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  sameAs: ['https://twitter.com/webdevpuneet', 'https://x.com/webdevpuneet'],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.title}>About webdevpuneet.com</h1>
          <p className={styles.updated}>UI Snippets for designers · Playgrounds for developers and learners</p>

          <section className={styles.section}>
            <h2>The Vision</h2>
            <p>Most developer tools are locked behind accounts, paywalls, or subscriptions. The ones that are free often collect your data, require a sign-up, or stop working the moment you go offline. webdevpuneet.com exists to change that.</p>
            <p>The vision is simple: every developer tool you need should be available instantly, free, private, and right in your browser. No install. No account. No data sent anywhere. Open the tool, use it, and move on with your work.</p>
            <p>When a developer pastes a JSON object into a formatter, writes CSS in a playground, copies a UI Snippet into their project, or builds a regex — that code belongs to them. It should never leave their machine. webdevpuneet.com was built on the belief that privacy is not a premium feature. It is the default.</p>
          </section>

          <section className={styles.section}>
            <h2>Why It Was Built</h2>
            <p>webdevpuneet.com started as a personal collection of utilities that kept getting rebuilt on every project — a JSON formatter here, a CSS generator there, a regex tester in a bookmarked tab that eventually broke. Every tool needed either had ads, required a login, or stored data on a server that didn't need it.</p>
            <p>The first version was a single JSON formatter. Then a CSS flexbox builder. Then a regex tester. Each tool was built to solve a real problem encountered while working as a freelance developer. Over time, the collection grew into what webdevpuneet.com is today — interactive playgrounds for developers, productivity tools for freelancers, and UI Snippets for designers and UI enthusiasts.</p>
            <p>The rule for every tool has always been the same: if it can run in the browser, it runs in the browser. No server needed. No data collected. No account required.</p>
          </section>

          <section className={styles.section}>
            <h2>What Makes webdevpuneet.com Different</h2>
            <ul>
              <li><strong>Everything runs in your browser.</strong> Your code, your files, your data — processed entirely on your device using modern browser APIs. Nothing is sent to any webdevpuneet.com server.</li>
              <li><strong>No account, no sign-up, ever.</strong> Every tool is open the moment you arrive. No form to fill in, no email to verify, no subscription to manage.</li>
              <li><strong>No paywalls.</strong> Every tool is free. There is no "Pro" tier that locks the features you actually need behind a monthly fee.</li>
              <li><strong>Persistent without a cloud.</strong> Features that need to save data — My Code, saved UI Snippets, playground progress — use your browser's storage. Your data stays on your device, not on someone else's server.</li>
              <li><strong>Fast and focused.</strong> No dashboards to navigate, no onboarding flows, no feature tours. Open a tool, use it.</li>
              <li><strong>Built to learn from.</strong> Playgrounds for HTML, CSS, JavaScript, React, TypeScript, Tailwind, SCSS, Vue, Angular, Next.js, GSAP, SVG, jQuery, Bootstrap, and more — all with live preview and zero setup. The <a href="/ui-snippets/">UI Snippets</a> library adds {SNIPPET_COUNT}+ real, production-ready components you can read, edit, and learn from.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>The Two Pillars</h2>

            <h3><a href="/ui-snippets/">UI Snippets — for Designers & UI Enthusiasts</a></h3>
            <p>{SNIPPET_COUNT}+ copy-paste HTML, CSS, and JavaScript components with a live editor, personal save space, GitHub Gist sync, and export to HTML, JSX, React + Tailwind, Vue, or Angular. Buttons, modals, tables, animations, hero sections, loaders, charts — every snippet is production-ready and fully editable in the browser. Test each export live in every framework before you download. The fastest way to go from idea to working UI.</p>

            <h3><a href="/learn-to-code/">Code Playgrounds — Learn Coding Visually</a></h3>
            <p>Interactive coding environments for HTML, CSS, JavaScript, React, TypeScript, Tailwind, SCSS, Vue, Angular, Next.js, GSAP, SVG, jQuery, Bootstrap, and more — all with live preview and zero setup. Write code, see results instantly, and share your work with a link. No install, no configuration, no waiting.</p>

            <p>Looking for developer utilities, PDF and image tools, or freelancer business tools (invoicing, CRM, proposals)? They live on the sister site <a href="https://fwdtools.com/" target="_blank" rel="noopener">fwdtools.com</a>.</p>
          </section>

          <section className={styles.section}>
            <h2>Who Builds It</h2>
            <p>webdevpuneet.com is built and maintained by <strong>Puneet Sharma</strong>, a freelance frontend developer based in Shimla. Every tool on this site is built, designed, and written by him — in between client projects, early mornings, and weekends. <strong>Aayush</strong>, a friend, thinker, and business enthusiast also based in Shimla, contributes ideas and feedback along the way.</p>
            <p>There is no team, no VC funding, no enterprise behind webdevpuneet.com. It is a solo project built because the tools were needed, because building them was a way to learn, and because other developers seemed to need them too.</p>
            <p>If you find a bug, want to suggest a tool, or just want to say something useful, you can reach out at <a href="mailto:puneet438@gmail.com">puneet438@gmail.com</a> or on X at <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a>.</p>
          </section>

          <section className={styles.section}>
            <h2>What's Next</h2>
            <p>webdevpuneet.com is a living project. New tools get added regularly — driven by what's actually needed when working on real projects. The focus will always stay the same: tools that work in the browser, tools that respect your privacy, and tools that don't ask for anything in return.</p>
            <p>If you use webdevpuneet.com regularly and want to support it, the best things you can do are share a tool with someone who needs it, follow <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a> on X, or leave a small tip via PayPal — <a href="https://paypal.me/webdevpuneet/3" target="_blank" rel="noopener noreferrer">$3</a>, <a href="https://paypal.me/webdevpuneet/5" target="_blank" rel="noopener noreferrer">$5</a>, or <a href="https://paypal.me/webdevpuneet/10" target="_blank" rel="noopener noreferrer">$10</a> <span className={aboutStyles.heart}>♥</span> — it helps keep the project running.</p>
          </section>

          <div className={styles.footer}>
            Built with care by <a href="https://www.webdevpuneet.com/" target="_blank" rel="noopener noreferrer">Puneet Sharma</a> · <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a>
          </div>
        </div>
      </div>
    </>
  );
}

