import HomeOmniSearch from '@/components/HomeOmniSearch';
import HomeToolSearch from '@/components/HomeToolSearch';
import ProfileHeroCard from '@/components/ProfileHeroCard';
import HomeSnippetsCarousel from '@/components/HomeSnippetsCarousel';
import NotFoundBlogStrip from '@/components/NotFoundBlogStrip';
import { getLatestSnippets } from '@/lib/snippet-related';
import InViewImg from '@/components/InViewImg';
import AdSlot from '@/components/AdSlot';
import { TEMPLATES as SOCIAL_TEMPLATES } from '@/components/SocialPostTemplates/templates/index.js';
import { EMAIL_TEMPLATES } from '@/components/EmailTemplates/templates/index.js';
import { SECTION_TEMPLATES } from '@/components/SectionTemplates/templates/index.js';
import { WEBSITE_TEMPLATES } from '@/components/SectionTemplates/templates/starters.js';
import { LIVE_TOOLS, CATEGORY_META } from '@/lib/tools-registry';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import { VISIBLE_SNIPPET_INDEX } from '@/lib/snippet-index';
import { CATEGORIES as SNIPPET_CATEGORIES } from '@/components/UiSnippetsTool/categories';
import { PATREON_GAME_IDS } from '@/lib/patreon-settings';

// "Random UI Snippets" strip: five cards, always 2 games + 3 snippets from the other categories, mixed in a
// random order. The pools are picked when the page is built; the strip re-picks and reshuffles in the visitor's browser,
// so every visit (and every Shuffle click) shows a different six. Each card is tagged with its category.
const catLabel = id => SNIPPET_CATEGORIES.find(c => c.id === id)?.label || id;
const RANDOM_GAMES = VISIBLE_SNIPPET_INDEX
  .filter(sn => sn.category === 'games' && PATREON_GAME_IDS.includes(sn.id))
  .sort(() => Math.random() - 0.5)
  .map(sn => ({ id: sn.id, title: sn.title, cat: catLabel(sn.category), game: true }));
const RANDOM_SNIPPETS = VISIBLE_SNIPPET_INDEX
  .filter(sn => sn.category !== 'games')
  .sort(() => Math.random() - 0.5)
  .slice(0, 40)
  .map(sn => ({ id: sn.id, title: sn.title, cat: catLabel(sn.category) }));
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

const TITLE = 'Free Website Templates, UI Snippets & Coding Playgrounds';
const DESCRIPTION = `${WEBSITE_TEMPLATES.length} website templates, ${SECTION_TEMPLATES.length} sections, email and social templates, ${SNIPPETS_ROUNDED}+ UI snippets and ${PLAYGROUND_COUNT} coding playgrounds. See, edit and learn, with or without AI. Free.`;

const OG_TITLE = 'Web Design Ideas You Can See, Edit and Learn From';
const OG_IMAGE = { url: 'https://webdevpuneet.com/images/home-og.jpg', width: 1200, height: 630, alt: 'webdevpuneet.com — website templates, UI snippets and coding playgrounds you can see, edit and learn from' };

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

const BUILDER_POINTS = [
  { title: 'Start with a ready-made template', text: `${WEBSITE_TEMPLATES.length} one-page websites for SaaS, restaurants, clinics, events and more, or a blank page.` },
  { title: 'Customise sections, colours and type', text: 'Mix and reorder sections, click any text to edit it and set one theme for the whole page.' },
  { title: 'Or start from a single section', text: <>Pick from <a href="/website-section-templates/">{SECTION_TEMPLATES.length} website section templates</a> (hero, pricing, FAQ, footer and more), edit it and export HTML, React or Vue.</> },
  { title: 'Export your website code', text: 'Download clean HTML or a ZIP with every image, and host it anywhere.' },
];

// Home promo cards for the email and social post template libraries
const PROMOS = [
  {
    id: 'email', accent: '#d97706', tag: 'Email templates', href: '/email-templates/', cta: 'Browse email templates',
    title: 'Emails that look right in every inbox',
    desc: 'Welcome emails, receipts, newsletters and sales emails with Outlook-safe buttons, dark mode and merge tags for Mailchimp, Klaviyo, HubSpot and Brevo.',
    points: ['Welcome, order, newsletter and holiday emails', 'Outlook-safe buttons and dark mode built in', 'Copy the HTML straight into your email tool'],
  },
  {
    id: 'social', accent: '#7c3aed', tag: 'Social post templates', href: '/social-post-templates/', cta: 'Browse social post templates',
    title: 'Posts, Stories and carousels in minutes',
    desc: 'Quotes, launches, tips and seasonal posts in every size for Instagram, Facebook, X, LinkedIn and Pinterest. Edit the text, apply your brand and download.',
    points: ['Every size from a single design', 'Download PNG, JPG, PDF or MP4 video', 'Create dozens at once from a spreadsheet'],
  },
];

const BUILDER_SECTIONS = ['Navbar', 'Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Footer'];
const BUILDER_SWATCHES = ['#4f46e5', '#059669', '#e11d48', '#d97706', '#0f172a'];
// Templates the animated builder mock cycles through (4: the loop in page.module.css is 14s = 4 x 3.5s)
const BUILDER_MOCK_TEMPLATES = ['saas']; // one fixed template (no crossfade)
// The elements the mock editor picks in turn, in % of the preview (left, top, width, height) and the second each is picked.
// Each gets a dashed outline that wraps it, with a small label saying what it is.
const MOCK_SELECTS = [
  { label: 'Menu links', l: 28.6, t: 1.4, w: 35, h: 7.6, s: 0.2 },
  { label: 'Heading', l: 5.6, t: 30.6, w: 36.6, h: 32.4, s: 1.9 },
  { label: 'Text', l: 5.2, t: 62.4, w: 41, h: 15.6, s: 3.3 },
  { label: 'Button', l: 6.9, t: 78.4, w: 14.2, h: 10, s: 4.7 },
  { label: 'Button', l: 21.2, t: 78.4, w: 13.8, h: 10.6, s: 4.85 },
  { label: 'Image', l: 50.4, t: 33.4, w: 42.2, h: 51.4, s: 6.1 },
];



const FAQS = [
  {
    q: 'Is webdevpuneet.com free?',
    a: 'Yes. Every snippet, template, playground and tool is free to use, with no trial or usage limit. Patreon is optional and only a way to support the site (supporters see it without ads).',
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
  const latestSnippets = getLatestSnippets(60);
  const mockTemplates = BUILDER_MOCK_TEMPLATES.map(id => WEBSITE_TEMPLATES.find(x => x.id === id)).filter(Boolean);
  // Plain data for the client-side tool finder; only categories that actually have tools.
  const searchTools = TOOLS.map(({ slug, name, sub, desc, icon, accent, category }) => ({ slug, name, sub, desc, icon, accent, category }));
  // Priority order: HTML, CSS, JS, SVG, TypeScript, React, GSAP first, then the rest
  const PLAYGROUND_PRIORITY = ['html-playground', 'css-playground', 'js-playground', 'svg-playground', 'typescript-playground', 'react-playground', 'gsap-playground'];
  const rank = slug => { const r = PLAYGROUND_PRIORITY.indexOf(slug); return r === -1 ? PLAYGROUND_PRIORITY.length : r; };
  const searchPlaygrounds = [...PLAYGROUNDS].sort((x, y) => rank(x.slug) - rank(y.slug)).map(({ slug, name, sub, desc, icon, accent, category }) => ({ slug, name, sub, desc, icon, accent, category }));
  const toolCategories = CATEGORY_META.filter(c => c.id !== 'learn' && TOOLS.some(t => t.category === c.id));

  return (
    <div className={styles.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 1. Hero ── */}
      {/* The "Your workspace" card (HomeWorkspace) was removed from the top of the home page on 2026-11-10; the component is still in src/components/HomeWorkspace */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>Free UI snippets, coding playgrounds and templates</p>
          <h1 className={styles.heroTitle}>
            Ready-to-use UI snippets you can <span className={styles.heroGrad}>see, edit and learn from.</span>
          </h1>
          <p className={styles.heroText}>
            Browse {SNIPPETS_ROUNDED}+ UI snippets, edit them live and export clean code, or hand them to your own AI. Learn how they work in {PLAYGROUND_COUNT} free coding playgrounds, or start a website, email or social post from a template. No sign-up, nothing to install.
          </p>
          </div>
          <div className={styles.heroProfile}><ProfileHeroCard /></div>
        </div>
      </section>

      <div className={styles.main}>

        {/* ── 2. UI Snippets (above the Website Builder) ── */}
        <section className={styles.section} aria-labelledby="h2-snippets">
          <div className={styles.snipTop}>
            <div className={styles.snipIntro}>
              <p className={styles.eyebrow}>{SNIPPET_COUNT.toLocaleString('en-US')} components</p>
              <h2 id="h2-snippets" className={styles.sectionTitle}>Ready-to-Use UI Components</h2>
              <p className={styles.sectionDesc}>Browse, preview, customise and export HTML, CSS and JavaScript components for your next project — or export them to React, Tailwind, Vue and Angular.</p>
            </div>
            <div className={styles.snippetSearch}><HomeOmniSearch snippetsOnly /></div>
          </div>
          {/* Latest and Random are one panel: same card, a thin divider between the two rows */}
          <div className={styles.snipPanel}>
            <div className={styles.latestStrip}><HomeSnippetsCarousel items={RANDOM_SNIPPETS} games={RANDOM_GAMES} total={RANDOM_SNIPPETS.length} title="Random UI Snippets" shuffle flush /></div>
            <div className={styles.latestStrip}><HomeSnippetsCarousel items={latestSnippets.items} total={latestSnippets.total} flush /></div>
          </div>
        </section>

        {/* Latest 4 blog posts (2026-11-14). Loaded in the visitor's browser from the WordPress blog, so the posts are always the newest
            even though the site is a static export; the strip draws nothing if the blog can't be reached. */}
        <section aria-label="Latest blog posts">
          <NotFoundBlogStrip count={4} columns={4} flush panelClass={styles.snipPanel} />
        </section>

        {/* ── 3. Featured product: Website Builder ── */}
        <section className={styles.builder} aria-labelledby="h2-builder">
          <div className={styles.builderText}>
            <p className={styles.builderTag}>Featured · Website Builder &amp; Section Templates</p>
            <h2 id="h2-builder" className={styles.builderTitle}>Build a Website Without Starting From Scratch</h2>
            <p className={styles.builderDesc}>Choose a full website template or a single section, customise the content and styling, preview your design, and export the code.</p>
            <ul className={styles.builderPoints}>
              {BUILDER_POINTS.map(p => (
                <li key={p.title}>
                  <span className={styles.builderCheck}><Check /></span>
                  <span><strong>{p.title}.</strong> {p.text}</span>
                </li>
              ))}
            </ul>
            <div className={styles.builderCtaRow}>
              <a href="/website-builder/" className={styles.btnPrimary}>Design your website <Arrow /></a>
              <a href="/website-section-templates/" className={styles.btnSecondary}>Section templates <Arrow /></a>
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
                  </span>
                  <span className={styles.mockSels} aria-hidden="true">
                    {MOCK_SELECTS.map((m, i) => (
                      <i key={i} className={styles.mockSel} style={{ '--l': `${m.l}%`, '--t': `${m.t}%`, '--w': `${m.w}%`, '--h': `${m.h}%`, '--s': `${m.s}s` }}><b>{m.label}</b></i>
                    ))}
                  </span>
                  <span className={styles.mockChips} aria-hidden="true">
                    {mockTemplates.map((tpl, i) => <b key={tpl.id} style={{ '--t': i }}>{tpl.name}</b>)}
                  </span>
                  <span className={styles.mockToast} aria-hidden="true">✓ index.html exported</span>
                  <svg className={styles.mockCursor} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 1.8L10.5 19z" fill="#0f172a" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3a. Email and social post templates ── */}
        <section className={styles.section} aria-labelledby="h2-send">
          <SectionHead
            id="h2-send"
            title="Emails and Social Posts, Ready to Send"
            desc="Edit in your browser, apply your brand, then copy the HTML for your email tool or download the post in every size."
          />
          <div className={styles.promoGrid}>
            {PROMOS.map(p => (
              <article key={p.id} className={styles.promo} style={{ '--promo': p.accent }}>
                <div className={styles.promoText}>
                  <p className={styles.promoTag}>{p.tag}</p>
                  <h3 className={styles.promoTitle}>{p.title}</h3>
                  <p className={styles.promoDesc}>{p.desc}</p>
                  <ul className={styles.promoPoints}>
                    {p.points.map(pt => <li key={pt}><span aria-hidden="true"><Check /></span>{pt}</li>)}
                  </ul>
                  <a href={p.href} className={styles.promoBtn}>{p.cta} <Arrow /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 3b + 3c. Playgrounds and developer tools: one row, two columns (stacked on narrow screens) ── */}
        <div className={styles.twoCol}>
        <section className={styles.section} aria-labelledby="h2-learn">
          <SectionHead
            id="h2-learn"
            title="Learn to Code Interactively"
            desc="Write code, change the examples and see the result instantly. Short lessons, a live editor and progress saved in your browser."
            href="/learn-to-code/"
            linkLabel="Explore all playgrounds"
          />
          <HomeToolSearch tools={searchPlaygrounds} categories={[]} noun="playgrounds" allHref="/learn-to-code/" searchable={false} />
        </section>

        {/* ── 3c. Developer tools (after Learn to Code) ── */}
        <section className={styles.section} aria-labelledby="h2-tools">
          <SectionHead
            id="h2-tools"
            title="Free Developer Tools"
            desc="Generate CSS, build layouts, format code and solve everyday development tasks directly in your browser."
            href="/tools/"
            linkLabel="Browse all developer tools"
          />
          <HomeToolSearch tools={searchTools} categories={toolCategories} />
        </section>
        </div>

        {/* The "Practical Web Development Tutorials" section (latest blog posts) was removed from the home page on 2026-11-10 */}

        <AdSlot />

        {/* ── 8. Short intro + FAQ ── */}
        <section className={styles.introFaq} aria-labelledby="h2-intro">
          <div className={styles.intro}>
            <div className={styles.introAi}>
              <h2 id="h2-intro" className={styles.sectionTitle}>Use it as it is, or take it into AI</h2>
              <p>Every UI snippet, section, website, email and social post template page has a ready-made prompt you can paste into ChatGPT, Claude or Copilot to rebuild, restyle or extend it. Prefer to skip AI? The code is clean and ready to use.</p>
              <div className={styles.introAiLinks}>
                <a href="/ui-snippets/">UI snippets</a>
                <a href="/website-section-templates/">Section templates</a>
                <a href="/website-builder/">Website templates</a>
                <a href="/email-templates/">Email templates</a>
                <a href="/social-post-templates/">Social posts</a>
              </div>
            </div>
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

        {/* ── 9. Quiet Hire me band ── */}
        <section className={styles.hireBand} aria-label="Hire Puneet Sharma">
          <p className={styles.hireBandText}><strong>Need it built?</strong> I&apos;m Puneet, the developer behind these templates. I can build, customise and launch your site from them.</p>
          <a href="/puneet/" className={styles.hireBandLink}>Hire me <Arrow /></a>
        </section>
      </div>
    </div>
  );
}
