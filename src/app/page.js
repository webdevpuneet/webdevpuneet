import HomeOmniSearch from '@/components/HomeOmniSearch';
import HomeToolSearch from '@/components/HomeToolSearch';
import InViewImg from '@/components/InViewImg';
import AdSlot from '@/components/AdSlot';
import { fetchLatestBlogPosts } from '@/lib/blog-feed';
import { TEMPLATES as SOCIAL_TEMPLATES } from '@/components/SocialPostTemplates/templates/index.js';
import { EMAIL_TEMPLATES } from '@/components/EmailTemplates/templates/index.js';
import { SECTION_TEMPLATES } from '@/components/SectionTemplates/templates/index.js';
import { WEBSITE_TEMPLATES } from '@/components/SectionTemplates/templates/starters.js';
import { LIVE_TOOLS, CATEGORY_META } from '@/lib/tools-registry';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import styles from './page.module.css';

/* ── Home page ──
   Order: hero → Website Builder showcase → UI snippets → Build / Explore / Learn →
   developer tools → playgrounds → tutorials → short intro + FAQ. */

const PLAYGROUNDS = LIVE_TOOLS.filter(t => t.slug.endsWith('-playground'));
const TOOLS = LIVE_TOOLS.filter(t => t.slug !== 'ui-snippets' && !t.slug.endsWith('-playground'));
const PLAYGROUND_COUNT = PLAYGROUNDS.length;
const TOOL_COUNT = TOOLS.length;
const TEMPLATE_COUNT = WEBSITE_TEMPLATES.length + SECTION_TEMPLATES.length + EMAIL_TEMPLATES.length + SOCIAL_TEMPLATES.length;
// Rounded down to the nearest hundred / ten so the headline numbers stay true as libraries grow.
const SNIPPETS_ROUNDED = (Math.floor(SNIPPET_COUNT / 100) * 100).toLocaleString('en-US');
const TOOLS_ROUNDED = Math.floor(TOOL_COUNT / 10) * 10;

const TITLE = 'Build Websites, Explore UI & Create Faster — Free Tools';
const DESCRIPTION = `${SNIPPETS_ROUNDED}+ copy-paste UI snippets, a free website builder with ${WEBSITE_TEMPLATES.length} templates, ${PLAYGROUND_COUNT} coding playgrounds and ${TOOLS_ROUNDED}+ developer tools. All in your browser, no signup.`;

const OG_TITLE = 'Build Websites. Explore UI. Create Faster.';
const OG_IMAGE = { url: 'https://webdevpuneet.com/images/home-og.jpg', width: 1200, height: 630, alt: 'webdevpuneet.com — build websites, explore UI components, coding playgrounds and developer tools' };

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'free website builder', 'website templates', 'ui snippets', 'copy paste ui components', 'html css js components',
    'website section templates', 'html email templates', 'social media post templates',
    'coding playground', 'learn to code online free', 'html playground', 'css playground', 'javascript playground', 'react playground',
    'free developer tools', 'css generators', 'frontend developer tools',
  ],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com',
    siteName: 'webdevpuneet.com',
    title: OG_TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    creator: '@webdevpuneet',
    title: OG_TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
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
      description: `A free frontend development workspace: ${SNIPPET_COUNT}+ copy-paste UI components, a free website builder with ${WEBSITE_TEMPLATES.length} website templates and ${SECTION_TEMPLATES.length} section templates, ${EMAIL_TEMPLATES.length} HTML email and ${SOCIAL_TEMPLATES.length} social post templates, ${PLAYGROUND_COUNT} interactive coding playgrounds and ${TOOL_COUNT} developer tools. Free, no signup, runs in your browser.`,
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
      logo: 'https://webdevpuneet.com/favicon.ico',
      founder: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/', jobTitle: 'Frontend Developer & UI Engineer' },
      sameAs: ['https://www.webdevpuneet.com/', 'https://www.upwork.com/freelancers/~017de423dd2d0e2767'],
    },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'UI Snippets, Website Builder, Templates, Coding Playgrounds and Developer Tools',
  url: 'https://webdevpuneet.com',
  itemListElement: LIVE_TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    description: t.desc,
    url: `https://webdevpuneet.com/${t.slug}/`,
  })),
};

/* ── Content ── */
const HERO_BENEFITS = [
  { n: `${SNIPPETS_ROUNDED}+`, label: 'UI snippets' },
  { n: 'Free', label: 'website builder' },
  { n: `${PLAYGROUND_COUNT}`, label: 'coding playgrounds' },
  { n: `${TOOLS_ROUNDED}+`, label: 'developer tools' },
];

const BUILDER_POINTS = [
  { title: 'Start with a ready-made template', text: `${WEBSITE_TEMPLATES.length} one-page websites for SaaS, restaurants, clinics, events and more, or a blank page.` },
  { title: 'Customise sections, colours and type', text: `Mix ${SECTION_TEMPLATES.length} sections, click any text to edit it and set one theme for the whole page.` },
  { title: 'Export your website code', text: 'Download clean HTML or a ZIP with every image, and host it anywhere.' },
];

const BUILDER_SECTIONS = ['Navbar', 'Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Footer'];
const BUILDER_SWATCHES = ['#4f46e5', '#059669', '#e11d48', '#d97706', '#0f172a'];
const BUILDER_TEMPLATE_STRIP = ['restaurant', 'real-estate', 'fitness', 'portfolio'];
// Templates the animated builder mock cycles through (4: the loop in page.module.css is 14s = 4 x 3.5s)
const BUILDER_MOCK_TEMPLATES = ['saas', 'restaurant', 'fitness', 'portfolio'];

const SNIPPET_CATEGORIES = [
  { slug: 'buttons', title: 'Buttons & interactions' },
  { slug: 'cards', title: 'Cards & layouts' },
  { slug: 'navigation', title: 'Navigation' },
  { slug: 'forms', title: 'Forms & inputs' },
  { slug: 'animations', title: 'CSS animations' },
  { slug: 'dashboards', title: 'Dashboards' },
];

const PATHS = [
  {
    id: 'build', label: 'Build', accent: '#4f46e5',
    blurb: 'Create websites and interfaces from editable templates.',
    links: [
      { label: 'Website Builder', href: '/website-builder/' },
      { label: `${WEBSITE_TEMPLATES.length} Website Templates`, href: '/website-builder/' },
      { label: 'Website Section Templates', href: '/website-section-templates/' },
      { label: 'Email Templates', href: '/email-templates/' },
      { label: 'Social Post Templates', href: '/social-post-templates/' },
    ],
    cta: 'Explore building tools', href: '/website-builder/',
  },
  {
    id: 'explore', label: 'Explore', accent: '#059669',
    blurb: 'Find ready-made components and everyday developer utilities.',
    links: [
      { label: 'UI Snippets', href: '/ui-snippets/' },
      { label: 'CSS Generators', href: '/css-tools/' },
      { label: 'Layout Builders', href: '/flexbox-builder/' },
      { label: 'Code Formatters', href: '/json-formatter/' },
      { label: 'All Developer Tools', href: '/tools/' },
    ],
    cta: 'Explore resources', href: '/tools/',
  },
  {
    id: 'learn', label: 'Learn', accent: '#d97706',
    blurb: 'Learn frontend development by changing real code.',
    links: [
      { label: 'HTML Playground', href: '/html-playground/' },
      { label: 'CSS Playground', href: '/css-playground/' },
      { label: 'JavaScript Playground', href: '/js-playground/' },
      { label: 'React Playground', href: '/react-playground/' },
      { label: 'GSAP Playground', href: '/gsap-playground/' },
    ],
    cta: 'Start learning', href: '/learn-to-code/',
  },
];

const FEATURED_TOOL_SLUGS = ['gradient-generator', 'responsive-preview-tool', 'flexbox-builder', 'carousel-builder', 'navbar-builder', 'css-animation-generator'];
const FEATURED_PLAYGROUND_SLUGS = ['html-playground', 'css-playground', 'js-playground', 'react-playground'];

const FAQS = [
  {
    q: 'Is webdevpuneet.com free?',
    a: 'Yes. Every snippet, template, playground and tool is free, with no subscription, trial or usage limit.',
  },
  {
    q: 'Can I use the code in commercial projects?',
    a: 'Yes. Code you copy, generate or export is yours to use in personal and commercial projects.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. Everything runs in your browser with nothing to install. Your work and lesson progress are saved in your browser.',
  },
  {
    q: 'Can I export code from the Website Builder?',
    a: 'Yes. Export the finished page as clean HTML or as a ZIP that includes every image, then host it anywhere.',
  },
  {
    q: 'Which frameworks are supported?',
    a: 'UI snippets are plain HTML, CSS and JavaScript and export to React, React + Tailwind, Vue 3 and Angular. Section templates export HTML, React or Vue, and the playgrounds cover React, Vue, Angular, Next.js, Tailwind and more.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
);

function SectionHead({ id, eyebrow, title, desc, href, linkLabel }) {
  return (
    <div className={styles.sectionHead}>
      <div>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {desc && <p className={styles.sectionDesc}>{desc}</p>}
      </div>
      {href && <a href={href} className={styles.headLink}>{linkLabel} <Arrow /></a>}
    </div>
  );
}

export default async function Home() {
  const blogPosts = (await fetchLatestBlogPosts(4)).slice(0, 3);
  const featuredTools = FEATURED_TOOL_SLUGS.map(s => LIVE_TOOLS.find(t => t.slug === s)).filter(Boolean);
  const featuredPlaygrounds = FEATURED_PLAYGROUND_SLUGS.map(s => LIVE_TOOLS.find(t => t.slug === s)).filter(Boolean);
  const mockTemplates = BUILDER_MOCK_TEMPLATES.map(id => WEBSITE_TEMPLATES.find(x => x.id === id)).filter(Boolean);
  const builderStrip = BUILDER_TEMPLATE_STRIP.map(id => WEBSITE_TEMPLATES.find(t => t.id === id)).filter(Boolean);
  // Plain data for the client-side tool finder; only categories that actually have tools.
  const searchTools = TOOLS.map(({ slug, name, sub, desc, icon, accent, category }) => ({ slug, name, sub, desc, icon, accent, category }));
  const toolCategories = CATEGORY_META.filter(c => c.id !== 'learn' && TOOLS.some(t => t.category === c.id));

  return (
    <div className={styles.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Free frontend development workspace</p>
          <h1 className={styles.heroTitle}>
            Build Websites. Explore UI. <span className={styles.heroGrad}>Create Faster.</span>
          </h1>
          <p className={styles.heroText}>
            Discover {SNIPPETS_ROUNDED}+ copy-paste UI components, build complete websites with editable templates, and use free browser-based developer tools and coding playgrounds. No installation or signup required.
          </p>
          <div className={styles.heroCtas}>
            <a href="/ui-snippets/" className={styles.btnPrimary}>Explore UI Snippets <Arrow /></a>
            <a href="/website-builder/" className={styles.btnSecondary}>Open Website Builder</a>
          </div>
          <ul className={styles.heroBenefits}>
            {HERO_BENEFITS.map(b => (
              <li key={b.label}><strong>{b.n}</strong> {b.label}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className={styles.main}>

        {/* ── 2. Featured product: Website Builder ── */}
        <section className={styles.builder} aria-labelledby="h2-builder">
          <div className={styles.builderText}>
            <p className={styles.builderTag}>Featured · Website Builder</p>
            <h2 id="h2-builder" className={styles.builderTitle}>Build a Website Without Starting From Scratch</h2>
            <p className={styles.builderDesc}>Choose a template, customise sections and styling, preview your design, and export the code.</p>
            <ul className={styles.builderPoints}>
              {BUILDER_POINTS.map(p => (
                <li key={p.title}>
                  <span className={styles.builderCheck}><Check /></span>
                  <span><strong>{p.title}.</strong> {p.text}</span>
                </li>
              ))}
            </ul>
            <div className={styles.builderCtaRow}>
              <a href="/website-builder/" className={styles.btnPrimary}>Start Building for Free <Arrow /></a>
              <span className={styles.builderNote}>No signup · HTML or ZIP export</span>
            </div>
          </div>

          {/* Mock of the builder: section list + theme on the left, live template preview on the right */}
          <div className={styles.builderVisual}>
            <div className={styles.mockWindow}>
              <div className={styles.mockBar}><i /><i /><i /><span>webdevpuneet.com/website-builder</span></div>
              <div className={styles.mockBody}>
                <div className={styles.mockPanel} aria-hidden="true">
                  <p className={styles.mockLabel}>Sections</p>
                  <ul className={styles.mockSections}>
                    {BUILDER_SECTIONS.map((s, i) => (
                      <li key={s} style={{ '--i': i }}><span>⋮⋮</span>{s}</li>
                    ))}
                  </ul>
                  <p className={styles.mockLabel}>Theme</p>
                  <div className={styles.mockSwatches}>
                    {BUILDER_SWATCHES.map((c, i) => <i key={c} style={{ background: c, '--i': i }} />)}
                  </div>
                  <p className={styles.mockLabel}>Font</p>
                  <div className={styles.mockSelect}>Inter <span>▾</span></div>
                  <div className={styles.mockExport}>Export HTML</div>
                </div>
                {/* Decorative loop: templates crossfade, a focus box steps down the page, a cursor
                    picks sections and presses Export (all CSS, see .mock* in page.module.css) */}
                <a href="/website-builder/" className={styles.mockPreview} aria-label="Website Builder: build a page from a template">
                  <span className={styles.mockStack}>
                    {mockTemplates.map((tpl, i) => (
                      <img
                        key={tpl.id}
                        src={`/images/website-templates/thumb/${tpl.id}.jpg`}
                        alt={i === 0 ? 'Website templates open in the Website Builder' : ''}
                        width={640}
                        height={400}
                        style={{ '--t': i }}
                      />
                    ))}
                    <span className={styles.mockFocus} aria-hidden="true" />
                  </span>
                  <span className={styles.mockChips} aria-hidden="true">
                    {mockTemplates.map((tpl, i) => <b key={tpl.id} style={{ '--t': i }}>{tpl.name}</b>)}
                  </span>
                  <span className={styles.mockToast} aria-hidden="true">✓ index.html exported</span>
                </a>
                <svg className={styles.mockCursor} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 1.8L10.5 19z" fill="#0f172a" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div className={styles.builderStrip}>
              {builderStrip.map(t => (
                <a key={t.id} href={`/website-builder/templates/${t.id}/`} className={styles.builderThumb} title={t.name}>
                  <InViewImg src={`/images/website-templates/thumb/${t.id}.jpg`} alt={t.name} width={640} height={400} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. UI Snippets ── */}
        <section className={styles.section} aria-labelledby="h2-snippets">
          <SectionHead
            id="h2-snippets"
            eyebrow={`${SNIPPET_COUNT.toLocaleString('en-US')} components`}
            title="Ready-to-Use UI Components"
            desc="Browse, preview, customise and export HTML, CSS and JavaScript components for your next project — or export them to React, Tailwind, Vue and Angular."
            href="/ui-snippets/"
            linkLabel="Explore all UI snippets"
          />
          <div className={styles.snippetSearch}><HomeOmniSearch snippetsOnly /></div>
          <div className={styles.snippetGrid}>
            {SNIPPET_CATEGORIES.map(c => (
              <a key={c.slug} href={`/ui-snippets/${c.slug}/`} className={styles.snippetCard}>
                <span className={styles.snippetImg}>
                  <InViewImg src={`/images/ui-snippets/${c.slug}.png`} alt="" width={1200} height={635} />
                </span>
                <span className={styles.snippetCardFoot}>
                  <span className={styles.snippetCardTitle}>{c.title}</span>
                  <Arrow />
                </span>
              </a>
            ))}
          </div>
          <div className={styles.centerCta}>
            <a href="/ui-snippets/" className={styles.btnPrimary}>Explore All UI Snippets <Arrow /></a>
          </div>
        </section>

        {/* ── 4. Build / Explore / Learn ── */}
        <section className={styles.section} aria-labelledby="h2-paths">
          <SectionHead id="h2-paths" title="Where Do You Want to Start?" desc="Three ways in. Every product is free and runs in your browser." />
          <div className={styles.paths}>
            {PATHS.map(p => (
              <article key={p.id} className={styles.pathCard} style={{ '--path-accent': p.accent }}>
                <h3 className={styles.pathTitle}>{p.label}</h3>
                <p className={styles.pathBlurb}>{p.blurb}</p>
                <ul className={styles.pathLinks}>
                  {p.links.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
                </ul>
                <a href={p.href} className={styles.pathCta}>{p.cta} <Arrow /></a>
              </article>
            ))}
          </div>
        </section>

        {/* ── 5. Developer tools ── */}
        <section className={styles.section} aria-labelledby="h2-tools">
          <SectionHead
            id="h2-tools"
            eyebrow={`${TOOL_COUNT} tools`}
            title="Free Developer Tools"
            desc="Generate CSS, build layouts, format code and solve everyday development tasks directly in your browser."
            href="/tools/"
            linkLabel="Browse all developer tools"
          />
          <div className={styles.shotGrid}>
            {featuredTools.map(t => (
              <a key={t.slug} href={`/${t.slug}/`} className={styles.shotCard}>
                <span className={styles.shotImg}><InViewImg src={`/images/${t.slug}.png`} alt="" /></span>
                <span className={styles.shotBody}>
                  <span className={styles.shotTitle}>{t.name}</span>
                  <span className={styles.shotSub}>{t.sub}</span>
                </span>
              </a>
            ))}
          </div>
          <h3 className={styles.subHead}>Find a tool</h3>
          <HomeToolSearch tools={searchTools} categories={toolCategories} />
        </section>

        {/* ── 6. Playgrounds ── */}
        <section className={`${styles.section} ${styles.learnBand}`} aria-labelledby="h2-learn">
          <SectionHead
            id="h2-learn"
            eyebrow={`${PLAYGROUND_COUNT} playgrounds`}
            title="Learn to Code Interactively"
            desc="Write code, change the examples and see the result instantly. Short lessons, a live editor and progress saved in your browser."
            href="/learn-to-code/"
            linkLabel="Explore all playgrounds"
          />
          <div className={styles.playGrid}>
            {featuredPlaygrounds.map(t => (
              <a key={t.slug} href={`/${t.slug}/`} className={styles.shotCard}>
                <span className={styles.shotImg}><InViewImg src={`/images/${t.slug}.png`} alt="" /></span>
                <span className={styles.shotBody}>
                  <span className={styles.shotTitle}>{t.name}</span>
                  <span className={styles.shotSub}>{t.sub}</span>
                </span>
              </a>
            ))}
          </div>
          <p className={styles.moreLine}>
            Also: {PLAYGROUNDS.filter(t => !FEATURED_PLAYGROUND_SLUGS.includes(t.slug)).slice(0, 10).map((t, i) => (
              <span key={t.slug}>{i > 0 && ' · '}<a href={`/${t.slug}/`}>{t.name.replace(/ Playground$/, '')}</a></span>
            ))} · <a href="/learn-to-code/">and more</a>
          </p>
        </section>

        {/* ── 7. Tutorials ── */}
        <section className={styles.section} aria-labelledby="h2-blog">
          <SectionHead
            id="h2-blog"
            title="Practical Web Development Tutorials"
            desc="Guides with live demos you can open, read and fork."
            href="https://webdevpuneet.com/blog/"
            linkLabel="Read all tutorials"
          />
          {blogPosts.length === 0 ? (
            <p className={styles.sectionDesc}>Couldn&apos;t load the latest posts right now — <a href="https://webdevpuneet.com/blog/">browse the blog directly</a>.</p>
          ) : (
            <div className={styles.blogGrid}>
              {blogPosts.map(post => (
                <a key={post.href} href={post.href} className={styles.blogCard}>
                  <span className={styles.blogImg}>
                    {post.thumb
                      ? <InViewImg src={post.thumb} alt="" />
                      : <span className={styles.blogImgFallback} aria-hidden="true">{'</>'}</span>}
                  </span>
                  <span className={styles.blogBody}>
                    <span className={styles.blogTitle}>{post.title}</span>
                    {post.excerpt && <span className={styles.blogExcerpt}>{post.excerpt}</span>}
                    <span className={styles.blogMore}>Read the article <Arrow /></span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </section>

        <AdSlot />

        {/* ── 8. Short intro + FAQ ── */}
        <section className={styles.introFaq} aria-labelledby="h2-intro">
          <div className={styles.intro}>
            <h2 id="h2-intro" className={styles.sectionTitle}>Everything You Need to Build for the Web</h2>
            <p>
              webdevpuneet.com brings together {SNIPPET_COUNT.toLocaleString('en-US')} free UI components, {TEMPLATE_COUNT} website, email and social templates, {PLAYGROUND_COUNT} interactive coding playgrounds and {TOOL_COUNT} developer tools. Build websites, experiment with code and create reusable interfaces directly in your browser.
            </p>
            <p className={styles.introMeta}>Built and maintained by <a href="/puneet/">Puneet Sharma</a>, frontend developer and UI engineer.</p>
          </div>
          <div className={styles.faq}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            {FAQS.map(f => (
              <details key={f.q} className={styles.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
