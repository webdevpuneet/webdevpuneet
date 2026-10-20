import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import WebsiteBuilder from '@/components/WebsiteBuilder';
import { SECTION_TEMPLATES, SECTION_CATEGORIES } from '@/components/SectionTemplates/templates/index.js';
import { STARTERS } from '@/components/SectionTemplates/templates/page.js';
import styles from '../tool-page.module.css';

const PAGE_URL = 'https://webdevpuneet.com/website-builder/';
const TITLE = 'Free Website Builder — Build From Sections, Export HTML';
const DESC = 'Free website builder: stack navbars, heroes, pricing, FAQ and footers into one page with one theme and GSAP animation, then export clean HTML. No sign-up.';
const OG = 'https://webdevpuneet.com/images/website-builder.png';
const N = SECTION_TEMPLATES.length;
const CATS = SECTION_CATEGORIES.filter(c => SECTION_TEMPLATES.some(t => t.category === c.id)).length;

export const metadata = {
  title: TITLE,
  description: DESC,
  keywords: ['free website builder', 'landing page builder', 'html website builder', 'no code website builder', 'website builder export html', 'static site builder', 'page builder'],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  icons: { icon: '/icons/website-builder.svg', shortcut: '/icons/website-builder.svg' },
  openGraph: { type: 'website', url: PAGE_URL, siteName: 'webdevpuneet.com', title: TITLE, description: DESC, locale: 'en_US', images: [{ url: OG, width: 1200, height: 630, alt: 'Website Builder: a landing page built from sections' }] },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: TITLE, description: DESC, images: [OG] },
};

const faqs = [
  { q: 'Is this website builder really free?', a: `Yes. Every feature is free: all ${N} sections, the themes, GSAP animation, saving pages and exporting HTML. There is no account, no watermark and no limit on pages. Your work is saved in your own browser.` },
  { q: 'How does the website builder work?', a: 'Start from one of the website templates (SaaS, app, agency, portfolio, restaurant, real estate, gym, clinic, event, nonprofit and more) or an empty page, then add sections such as a navbar, hero, features, pricing, testimonials, FAQ, call to action and footer. Click any section to edit its text, images and links, reorder or duplicate sections, and set colours, fonts and animation once for the whole page.' },
  { q: 'Can I export my website?', a: 'Yes. Download the page as one HTML file with your images embedded, or as a ZIP with index.html and an images folder. Upload it to any static host such as Netlify, Vercel, Cloudflare Pages, GitHub Pages or your own server; there is no lock-in.' },
  { q: 'Is the exported code clean?', a: 'Yes. It is semantic HTML with one style sheet built on CSS custom properties, responsive container queries and small, dependency-light scripts for interactive parts. Animations use GSAP from a CDN. FAQ and blog sections include structured data for search engines.' },
  { q: 'Do I need to know how to code?', a: 'No. Everything is edited with forms in the side panel: text, links, images, lists of cards and toggles. Developers can still open the exported HTML and change anything.' },
  { q: 'Will my pages be saved?', a: 'The current page autosaves in your browser. Save named pages to My pages, and use Backup to download a file with all your pages, uploaded images, fonts and brand kit, which you can import in any browser.' },
  { q: 'Are the pages responsive and accessible?', a: 'Every section adapts to its own width with container queries and is checked on desktop, tablet and mobile. Menus, accordions, carousels and forms are keyboard and screen-reader friendly, and animations switch off for people who prefer reduced motion.' },
];

const SECTIONS = [
  {
    type: 'features',
    label: "What's included",
    heading: 'Features',
    items: [
      `${N} professionally designed sections in ${CATS} categories: navbars, heroes, features, pricing, testimonials, FAQ, CTA, stats, team, contact, blog and footers`,
      `${STARTERS.length} website templates with real content: SaaS, app, agency, portfolio, restaurant, real estate, gym, dental clinic, local services, online course, coach, event, nonprofit and more`,
      'Add, reorder, duplicate and remove sections; click any section in the preview to edit it',
      'One theme for the whole page: colour presets, exact colours, any Google Font or your own font, radius and width',
      'GSAP animation built in: entrance effects, SplitText headline reveals, counters, marquees and more',
      'Working interactions: mobile menus, pricing toggles, accordions, carousels and contact forms',
      'Upload your own images and logos (resized in your browser)',
      'Preview on desktop, tablet and mobile',
      'Export one HTML file or a ZIP with an images folder; host it anywhere',
      'Autosave, My pages, undo/redo and a one-file backup',
      'Free, private and no sign-up',
    ],
  },
  {
    type: 'text',
    label: 'About the builder',
    heading: 'A Free Website Builder That Exports Real HTML',
    quickFacts: false,
    text: `Most website builders keep your site on their platform. This one gives it to you. You build a page from professionally designed sections, set one theme for the whole page, and download clean HTML you can host anywhere: Netlify, Vercel, Cloudflare Pages, GitHub Pages or your own server.

**Built from sections.** Every page is a stack of sections from the [Website Section Templates](/website-section-templates/) library: a [navbar](/website-section-templates/category/navbar/), a [hero](/website-section-templates/category/hero/), [features](/website-section-templates/category/features/), [pricing](/website-section-templates/category/pricing/), [testimonials](/website-section-templates/category/testimonials/), an [FAQ](/website-section-templates/category/faq/), a [call to action](/website-section-templates/category/cta/) and a [footer](/website-section-templates/category/footer/), plus [stats and logos](/website-section-templates/category/stats/), [team](/website-section-templates/category/team/), [contact](/website-section-templates/category/contact/) and [blog](/website-section-templates/category/blog/) sections. Start from one of the free [website templates](/website-builder/templates/) or an empty page, add what you need and drag sections to reorder them.

**One theme, one website.** Colours, fonts, corner radius and content width are set once for the whole page as CSS custom properties, so any mix of sections looks like it was designed together. Apply your saved brand kit in one click, or choose any Google Font or your own uploaded font.

**Animation that's built in, not bolted on.** Every section is designed for GSAP: entrance animations as sections scroll into view, SplitText headline reveals, counting numbers, endless marquees, draggable carousels, magnetic buttons and smooth accordions. Content stays visible without JavaScript, and motion switches off for people who prefer reduced motion.

**Interactions that work.** Mobile menus with focus handling, pricing toggles, FAQ accordions, testimonial carousels and contact forms that send to Formspree or your own endpoint all work in the exported page, with no framework required.

**Private by design.** Your pages, uploaded images and fonts are stored in your own browser. Nothing is uploaded to our servers, and a one-file backup moves everything to another device.`,
  },
  {
    type: 'steps',
    label: 'Step by step',
    heading: 'How to Build a Website',
    items: [
      { title: 'Start a page', text: 'Pick one of the website templates (restaurant, real estate, gym, SaaS, portfolio and more) or begin with an empty page.' },
      { title: 'Add and arrange sections', text: 'Add a navbar, hero, features, pricing, testimonials, FAQ, CTA and footer, then reorder, duplicate or remove them.' },
      { title: 'Edit the content', text: 'Click a section to change its text, links, images and lists of cards; upload your own images and logo.' },
      { title: 'Set the theme', text: 'Choose colours, fonts, corner radius, content width and animation once for the whole page, or apply your brand kit.' },
      { title: 'Preview and export', text: 'Check desktop, tablet and mobile, save the page, then download one HTML file or a ZIP and upload it to your host.' },
    ],
  },
  {
    type: 'cards',
    label: 'Why use it',
    heading: 'Why Use This Website Builder',
    columns: 3,
    items: [
      { icon: '⤓', title: 'You own the code', desc: 'Export clean HTML and CSS and host it anywhere, with no subscription or lock-in.' },
      { icon: '◐', title: 'Consistent by design', desc: 'One theme drives every section, so the page always looks like one website.' },
      { icon: '✦', title: 'Animated with GSAP', desc: 'Professional motion on every section, accessible and reduced-motion friendly.' },
      { icon: '⚡', title: 'Fast pages', desc: 'Static HTML, one style sheet and small scripts load quickly on any host.' },
      { icon: '🔒', title: 'Private', desc: 'Pages, images and fonts stay in your browser; nothing is uploaded.' },
      { icon: '€0', title: 'Free', desc: 'No account, no watermark and no paid tier.' },
    ],
  },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
];

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Website Builder',
  url: PAGE_URL,
  description: DESC,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any (web browser)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Website Builder', item: PAGE_URL },
  ],
};

export default function WebsiteBuilderPage() {
  return (
    <div className={styles.page}>
      {[appSchema, faqSchema, breadcrumbSchema].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={styles.toolSection}><WebsiteBuilder /></div>
      <AdSlot />
      <IndexOnly>
        <SeoSection slug="website-builder" title="Free Website Builder — Build a Page From Sections, Export HTML" subtitle={`${N} sections · ${STARTERS.length} website templates · One theme · GSAP animation · Export HTML or ZIP`} sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
