import styles from '../privacy-policy/styles.module.css';
import aboutStyles from './styles.module.css';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { TEMPLATES as SOCIAL_TEMPLATES } from '@/components/SocialPostTemplates/templates/index.js';
import { EMAIL_TEMPLATES } from '@/components/EmailTemplates/templates/index.js';
import { SECTION_TEMPLATES } from '@/components/SectionTemplates/templates/index.js';
import { WEBSITE_TEMPLATES } from '@/components/SectionTemplates/templates/starters.js';

// Same split as the home page: coding playgrounds vs. everything else that is a tool.
const PLAYGROUND_COUNT = LIVE_TOOLS.filter(t => t.slug.endsWith('-playground')).length;
const TOOL_COUNT = LIVE_TOOLS.filter(t => t.slug !== 'ui-snippets' && !t.slug.endsWith('-playground')).length;
const TEMPLATE_COUNT = WEBSITE_TEMPLATES.length + SECTION_TEMPLATES.length + EMAIL_TEMPLATES.length + SOCIAL_TEMPLATES.length;
const OG_IMAGE = 'https://webdevpuneet.com/images/home-og.jpg';
// Rounded down to the nearest hundred, like the home page, so the headline number stays true as the library grows.
const SNIPPETS_ROUNDED = (Math.floor(SNIPPET_COUNT / 100) * 100).toLocaleString('en-US');

export const metadata = {
  title: 'About webdevpuneet.com — Free Frontend Development Workspace',
  description: `A free frontend workspace by Puneet Sharma: ${SNIPPETS_ROUNDED}+ UI snippets, a free website builder, ${TEMPLATE_COUNT} templates, ${PLAYGROUND_COUNT} coding playgrounds and ${TOOL_COUNT} developer tools. No signup.`,
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/about/' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/about/',
    siteName: 'webdevpuneet.com',
    title: 'About webdevpuneet.com — Build Websites. Explore UI. Create Faster.',
    description: `webdevpuneet.com is a free frontend workspace: ${SNIPPETS_ROUNDED}+ UI snippets, a free website builder, ${TEMPLATE_COUNT} templates, ${PLAYGROUND_COUNT} coding playgrounds and ${TOOL_COUNT} developer tools. No signup. Built by Puneet Sharma.`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'webdevpuneet.com — build websites, explore UI components, coding playgrounds and developer tools' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'About webdevpuneet.com — Build Websites. Explore UI. Create Faster.',
    description: `A free frontend workspace: ${SNIPPETS_ROUNDED}+ UI snippets, a free website builder, ${TEMPLATE_COUNT} templates, ${PLAYGROUND_COUNT} coding playgrounds and ${TOOL_COUNT} developer tools. No signup.`,
    images: [OG_IMAGE],
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
  description: `A free frontend development workspace: ${SNIPPETS_ROUNDED}+ copy-paste UI snippets, a free website builder with ${WEBSITE_TEMPLATES.length} website templates and ${SECTION_TEMPLATES.length} section templates, ${EMAIL_TEMPLATES.length} email and ${SOCIAL_TEMPLATES.length} social post templates, ${PLAYGROUND_COUNT} coding playgrounds and ${TOOL_COUNT} developer tools. No signup, runs in your browser.`,
  founder: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/', jobTitle: 'Frontend Developer & UI Engineer' },
  sameAs: ['https://twitter.com/webdevpuneet', 'https://x.com/webdevpuneet', 'https://www.upwork.com/freelancers/~017de423dd2d0e2767'],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.title}>About webdevpuneet.com</h1>
          <p className={styles.updated}>Build websites · Explore UI · Learn to code · Create faster</p>

          <section className={styles.section}>
            <p><strong>webdevpuneet.com is a free frontend development workspace.</strong> Discover {SNIPPETS_ROUNDED}+ copy-paste UI components, build complete websites with editable templates, practise in {PLAYGROUND_COUNT} interactive coding playgrounds and use {TOOL_COUNT} free browser-based developer tools. No installation and no signup: everything runs in your browser.</p>
          </section>

          <section className={styles.section}>
            <h2>The Vision</h2>
            <p>Most developer tools are locked behind accounts, paywalls, or subscriptions. The ones that are free often collect your data, require a sign-up, or stop working the moment you go offline. webdevpuneet.com exists to change that.</p>
            <p>The vision is simple: every developer tool you need should be available instantly, free, private, and right in your browser. No install. No account. No data sent anywhere. Open the tool, use it, and move on with your work.</p>
            <p>When a developer pastes a JSON object into a formatter, writes CSS in a playground, copies a UI Snippet into their project, or builds a regex — that code belongs to them. It should never leave their machine. webdevpuneet.com was built on the belief that privacy is not a premium feature. It is the default.</p>
          </section>

          <section className={styles.section}>
            <h2>Why It Was Built</h2>
            <p>webdevpuneet.com started as a personal collection of utilities that kept getting rebuilt on every project — a JSON formatter here, a CSS generator there, a regex tester in a bookmarked tab that eventually broke. Every tool needed either had ads, required a login, or stored data on a server that didn't need it.</p>
            <p>The first version was a single JSON formatter. Then a CSS flexbox builder. Then a regex tester. Each tool was built to solve a real problem encountered while working as a freelance developer. Over time, the collection grew into what webdevpuneet.com is today: a frontend workspace with a library of UI snippets, a free website builder and template libraries, interactive playgrounds for learning, and developer tools for the everyday jobs in between.</p>
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
              <li><strong>Built to learn from.</strong> {PLAYGROUND_COUNT} playgrounds for HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, SCSS, Bootstrap, jQuery, GSAP and SVG, all with live preview, structured lessons and zero setup. The <a href="/ui-snippets/">UI Snippets</a> library adds {SNIPPETS_ROUNDED}+ real, production-ready components you can read, edit, and learn from.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>What You Can Do Here</h2>

            <h3><a href="/website-builder/">Website Builder &amp; Templates — Build a Website Without Starting From Scratch</a></h3>
            <p>Choose one of {WEBSITE_TEMPLATES.length} ready-made website templates (SaaS, restaurant, clinic, gym, wedding, portfolio and more) or start from a blank page. Mix and customise sections, colours and typography, preview your design and export clean HTML or a ZIP with every image. The same editor powers {SECTION_TEMPLATES.length} <a href="/website-section-templates/">website section templates</a> (navbars, heroes, pricing, FAQ, footers), {EMAIL_TEMPLATES.length} responsive <a href="/email-templates/">HTML email templates</a> and {SOCIAL_TEMPLATES.length} <a href="/social-post-templates/">social post templates</a>.</p>

            <h3><a href="/ui-snippets/">UI Snippets — Ready-to-Use UI Components</a></h3>
            <p>{SNIPPETS_ROUNDED}+ copy-paste HTML, CSS, and JavaScript components with a live editor, personal save space, GitHub Gist sync, and export to HTML, JSX, React + Tailwind, Vue, or Angular. Buttons, cards, navigation, forms, animations, dashboards, loaders, charts: every snippet is production-ready and fully editable in the browser. Test each export live in every framework before you download it.</p>

            <h3><a href="/learn-to-code/">Coding Playgrounds — Learn to Code Interactively</a></h3>
            <p>{PLAYGROUND_COUNT} interactive coding environments for HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, SCSS, Bootstrap, jQuery, GSAP and SVG. Write code, change the examples and see the result instantly. No install, no configuration, no waiting.</p>

            <h3><a href="/tools/">Developer Tools — Solve Everyday Development Tasks</a></h3>
            <p>{TOOL_COUNT} free tools that run in your browser: <a href="/css-tools/">CSS generators</a> (Flexbox and Grid builders, gradients, box shadows, animations), code formatters and converters, a color contrast checker, SEO and meta tag generators, and image tools.</p>

            <h3><a href="https://webdevpuneet.com/blog/">The Blog — Practical Web Development Tutorials</a></h3>
            <p>Tutorials and guides with live demos you can open, read the source of, and fork into your own code editor.</p>
          </section>

          <section className={styles.section}>
            <h2>Who Builds It</h2>
            <p>webdevpuneet.com is built and maintained by <strong>Puneet Sharma</strong>, a freelance frontend developer based in Shimla. Every tool on this site is built, designed, and written by him — in between client projects, early mornings, and weekends.</p>
            <p>There is no team, no VC funding, no enterprise behind webdevpuneet.com. It is a solo project built because the tools were needed, because building them was a way to learn, and because other developers seemed to need them too.</p>
            <p>If you find a bug, want to suggest a tool, or just want to say something useful, you can reach out at <a href="mailto:puneet438@gmail.com">puneet438@gmail.com</a> or on X at <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a>.</p>
          </section>

          <section className={styles.section}>
            <h2>What's Next</h2>
            <p>webdevpuneet.com is a living project. New tools get added regularly — driven by what's actually needed when working on real projects. The focus will always stay the same: tools that work in the browser, tools that respect your privacy, and tools that don't ask for anything in return.</p>
            <p>If you use webdevpuneet.com regularly and want to support it, the best things you can do are share a tool with someone who needs it, follow <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a> on X, or leave a small tip via PayPal — <a href="https://paypal.me/webdevpuneet/3" target="_blank" rel="noopener noreferrer">$3</a>, <a href="https://paypal.me/webdevpuneet/5" target="_blank" rel="noopener noreferrer">$5</a>, or <a href="https://paypal.me/webdevpuneet/10" target="_blank" rel="noopener noreferrer">$10</a> <span className={aboutStyles.heart}>♥</span> — it helps keep the project running.</p>
          </section>

          <div className={styles.footer}>
            Built with care by <a href="/puneet/">Puneet Sharma</a> · <a href="https://x.com/webdevpuneet" target="_blank" rel="noopener noreferrer">@webdevpuneet</a>
          </div>
        </div>
      </div>
    </>
  );
}

