import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { WEBSITE_TEMPLATES, TEMPLATE_INDUSTRIES } from '@/components/SectionTemplates/templates/starters.js';
import st from './templates.module.css';

const PAGE_URL = 'https://webdevpuneet.com/website-builder/templates/';
const N = WEBSITE_TEMPLATES.length;
const TITLE = 'Free Website Templates — Edit Online and Export HTML';
const DESC = `${N} free website templates for SaaS, restaurants, real estate, gyms, clinics, events, nonprofits and more. Customize in the Website Builder and export HTML.`;

export const metadata = {
  title: TITLE,
  description: DESC,
  keywords: ['free website templates', 'html website templates', 'landing page templates', 'business website templates', 'website templates free download'],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  icons: { icon: '/icons/website-builder.svg', shortcut: '/icons/website-builder.svg' },
  openGraph: { type: 'website', url: PAGE_URL, siteName: 'webdevpuneet.com', title: TITLE, description: DESC, locale: 'en_US', images: [{ url: 'https://webdevpuneet.com/images/website-templates/og/saas.jpg', width: 1200, height: 630, alt: 'Free website templates' }] },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: TITLE, description: DESC, images: ['https://webdevpuneet.com/images/website-templates/og/saas.jpg'] },
};

const faqs = [
  { q: 'Are these website templates really free?', a: 'Yes. Every template is free for personal and commercial use, with no account, no watermark and no attribution required. You edit it in the Website Builder and download the HTML.' },
  { q: 'How do I use a website template?', a: 'Open a template and click “Use this template”. It opens in the free Website Builder, where you change the text, images, colours and fonts, add or remove sections, and export the finished page as one HTML file or a ZIP.' },
  { q: 'Can I host the website anywhere?', a: 'Yes. The export is plain HTML and CSS with small scripts, so it works on Netlify, Vercel, Cloudflare Pages, GitHub Pages, any shared host or your own server.' },
  { q: 'Are the templates responsive?', a: 'Yes. Every section adapts to its width with CSS container queries and is checked on desktop, tablet and mobile.' },
  { q: 'Can I change the design completely?', a: 'Yes. Templates are built from the same sections as the Website Section Templates library, so you can swap any section, change the theme for the whole page and add new sections at any time.' },
];

const SECTIONS = [
  {
    type: 'text',
    label: 'About these templates',
    heading: 'Website Templates You Can Actually Edit',
    quickFacts: false,
    text: `Each template is a complete, one-page website for a real kind of business, written with real content, not lorem ipsum: a restaurant with set menus and opening hours, an estate agency with valuations and agents, a gym with memberships, a clinic with treatments and booking, a conference with speakers and tickets, and more.

Open any template in the free [Website Builder](/website-builder/) and everything is editable without code: text, images, links, lists of cards, colours, fonts and animation. Add sections from the [Website Section Templates](/website-section-templates/) library, reorder them by dragging, and export the finished page as clean HTML you can host anywhere.

Every template is responsive, animated with GSAP (entrance effects, text reveals, counters and carousels), accessible, and free for commercial use.`,
  },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
];

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Website Templates',
    url: PAGE_URL,
    description: DESC,
    mainEntity: { '@type': 'ItemList', numberOfItems: N, itemListElement: WEBSITE_TEMPLATES.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${PAGE_URL}${t.id}/` })) },
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
      { '@type': 'ListItem', position: 2, name: 'Website Builder', item: 'https://webdevpuneet.com/website-builder/' },
      { '@type': 'ListItem', position: 3, name: 'Templates', item: PAGE_URL },
    ],
  },
];

export default function WebsiteTemplatesPage() {
  return (
    <div>
      {schemas.map((sc, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />)}
      <div className={st.wrap}>
        <nav className={st.crumbs} aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/website-builder/">Website Builder</a> / <span>Templates</span></nav>
        <h1 className={st.h1}>Free Website Templates</h1>
        <p className={st.lead}>{N} complete website templates with real content for software, creative work, local businesses, health, education, events and nonprofits. Open any of them in the free Website Builder, make it yours, and export clean HTML.</p>
        <div className={st.actions}>
          <a className={st.btn} href="/website-builder/">Open the Website Builder</a>
          <a className={`${st.btn} ${st.btnGhost}`} href="/website-section-templates/">Browse single sections</a>
        </div>
        {TEMPLATE_INDUSTRIES.map(ind => (
          <section key={ind} className={st.group}>
            <h2 className={st.groupTitle}>{ind}</h2>
            <ul className={st.grid}>
              {WEBSITE_TEMPLATES.filter(t => t.industry === ind).map(t => (
                <li key={t.id}>
                  <a className={st.card} href={`/website-builder/templates/${t.id}/`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={st.cardImg} src={`/images/website-templates/thumb/${t.id}.jpg`} alt={`${t.name} template preview`} loading="lazy" width="640" height="400" />
                    <span className={st.cardBody}>
                      <b>{t.name}</b>
                      <span>{t.blurb}</span>
                      <span className={st.cardMeta}>{t.sections.length} sections · free</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <AdSlot />
      <IndexOnly>
        <SeoSection slug="website-builder" title="Free Website Templates — Real Content, Fully Editable" subtitle={`${N} templates · Responsive · GSAP animation · Export HTML`} sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
