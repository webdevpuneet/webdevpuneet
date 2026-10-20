import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { SectionGalleryPage } from '@/components/SectionTemplates';
import { SECTION_TEMPLATES, SECTION_CATEGORIES } from '@/components/SectionTemplates/templates/index.js';
import { SECTION_DIFFERENT } from '@/components/SectionTemplates/templates/seo-content.js';
import { sectionPreviewIds, hasSectionOg, sectionOgUrl } from '@/components/SectionTemplates/assets';
import styles from '../tool-page.module.css';

const PAGE_URL = 'https://webdevpuneet.com/website-section-templates/';
const TITLE = 'Website Section Templates — Free HTML, React & Vue Blocks';
const DESC = 'Free editable website section templates: hero sections and more, with GSAP animation. Change text, images, colours and fonts, then export HTML, React or Vue.';
const first = SECTION_TEMPLATES[0];
const OG_IMAGES = first && hasSectionOg(first.id) ? [{ url: sectionOgUrl(first.id), width: 1200, height: 630, alt: 'Free website section templates' }] : undefined;

export const metadata = {
  title: TITLE,
  description: DESC,
  keywords: ['website section templates', 'hero section template', 'landing page sections', 'html css sections', 'react section components', 'vue section components', 'free website templates', 'gsap animated sections'],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  icons: { icon: '/icons/website-section-templates.svg', shortcut: '/icons/website-section-templates.svg' },
  openGraph: { type: 'website', url: PAGE_URL, siteName: 'webdevpuneet.com', title: TITLE, description: DESC, locale: 'en_US', ...(OG_IMAGES && { images: OG_IMAGES }) },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: TITLE, description: DESC, ...(OG_IMAGES && { images: [OG_IMAGES[0].url] }) },
};

const faqs = [
  { q: 'What are website section templates?', a: 'Ready-made, complete page blocks (hero, features, pricing, testimonials, FAQ, footer and more) that you customise in the browser and add to your site. Each one is responsive, animated with GSAP and exports as HTML and CSS, a ZIP, a React component or a Vue component.' },
  { q: 'How are these different from UI component libraries?', a: 'Component libraries give you code to copy and edit by hand. These sections are editable templates: change the text, links, images, colours, fonts, radius and animation in a visual panel, preview desktop, tablet and mobile, then export. Need individual components instead? Browse UI Snippets.' },
  { q: 'Will the sections look consistent together?', a: 'Yes. Every section reads the same theme tokens (brand, background, surface, text and muted colours, heading and body fonts, corner radius and content width) as CSS custom properties, so any combination looks like one website. A page builder that stacks sections is on the way.' },
  { q: 'How do the animations work?', a: 'Sections animate in with GSAP and ScrollTrigger once they scroll into view. You can pick the effect (fade up, fade, slide or zoom) and speed, or turn it off. Content stays visible without JavaScript and animations are skipped for people who prefer reduced motion.' },
  { q: 'Can I upload my own images and fonts?', a: 'Yes. Images are resized in your browser and saved in IndexedDB; fonts can be any Google Font or your own WOFF2, WOFF, TTF or OTF file. Exports include them: the single HTML file embeds them, and the ZIP puts images in an images folder.' },
  { q: 'Will I lose my work?', a: 'No. Edits autosave in your browser, Save keeps named designs in My designs, and the Import / Export tab downloads one backup file with your designs, uploaded images, uploaded fonts and brand kit that you can restore in any browser.' },
  { q: 'Are they free for commercial use?', a: 'Yes. Every section is free for personal and commercial websites, with no account, no watermark and no attribution required.' },
];

const SECTIONS = [
  {
    type: 'features',
    label: "What's included",
    heading: 'Features',
    items: [
      'Editable text, links, images and show/hide toggles for every part of a section',
      'One shared theme: colours, fonts, corner radius and content width as CSS variables',
      '8 colour presets, exact colour pickers and your saved brand kit',
      'Any Google Font, or upload your own WOFF2, WOFF, TTF or OTF font',
      'Upload images (resized in your browser) or paste image URLs',
      'GSAP + ScrollTrigger entrance animations with effect and speed controls',
      'Container-query responsive layouts; preview desktop, tablet and mobile',
      'Export a single HTML file, a ZIP with images, a React component or a Vue component',
      'Fork any section into My Code to keep editing the code',
      'Autosave, My designs (save, save as, rename, duplicate, delete) and undo/redo',
      'Import / Export backup with designs, images, fonts and brand kit',
      'Free, private and works without an account',
    ],
  },
  {
    type: 'text',
    label: 'Browse by category',
    heading: 'Sections for Every Part of a Website',
    quickFacts: false,
    text: SECTION_CATEGORIES.filter(c => SECTION_TEMPLATES.some(t => t.category === c.id)).map(c => {
      const list = SECTION_TEMPLATES.filter(t => t.category === c.id);
      return `**[${c.label} section templates](/website-section-templates/category/${c.id}/)**: ${c.blurb} Includes ${list.map(t => `[${t.name}](/website-section-templates/${t.id}/)`).join(', ')}.`;
    }).join('\n\n') + '\n\nNavbar, features, pricing, testimonials, FAQ, call-to-action, stats, team, contact, blog and footer sections are being added next, all built on the same theme so they combine into complete pages.',
  },
  {
    type: 'text',
    label: 'About these templates',
    heading: 'Free, Editable Website Sections With Animation Built In',
    quickFacts: false,
    text: `Most section libraries hand you code and leave the editing to you. These **website section templates** work the other way round: open a section, change its text, links and images in a panel, set your brand colours and fonts, pick an animation, check it on desktop, tablet and mobile, and only then export the code.

**One theme for the whole site.** Every section is built on the same design tokens: brand, background, surface, text and muted colours, heading and body fonts, corner radius and content width, all as CSS custom properties. Pick a preset, set exact colours or apply your brand kit, and every section you add will match.

**Responsive the modern way.** Sections use CSS container queries, so they respond to the width of their own container rather than the browser window. They look right in a full-width page, inside a narrower column, and in the page builder that comes next.

**Animated with GSAP.** Each section marks which elements animate, and a small GSAP + ScrollTrigger script reveals them once as the section scrolls into view. Choose fade up, fade, slide or zoom and a speed, or turn animation off. Without JavaScript, everything is simply visible, and visitors who prefer reduced motion see no animation.

**Your images and fonts, kept private.** Upload images and they are resized in your browser and stored in IndexedDB; upload your own font file or choose any Google Font. Nothing is sent to a server. Autosave, named designs and a one-file backup with your images, fonts and brand kit mean you never lose work.

**Export the way you build.** Download a single HTML file that works offline, a ZIP with an images folder, or copy a React or Vue component. Fork any section into [My Code](/ui-snippets/mycode/) to keep editing, or browse 2,000+ individual [UI Snippets](/ui-snippets/). Making emails and social posts for the same brand? See [Email Templates](/email-templates/) and [Social Post Templates](/social-post-templates/).`,
  },
  { type: 'cards', label: 'How it’s different', heading: 'How These Section Templates Are Different', columns: 3, items: SECTION_DIFFERENT },
  {
    type: 'steps',
    label: 'Step by step',
    heading: 'How to Use',
    items: [
      { title: 'Pick a section', text: 'Open a section from the gallery. Your edits autosave in your browser as you go.' },
      { title: 'Edit the content', text: 'Change the headline, text, buttons, links and images in the panel, and switch optional parts on or off.' },
      { title: 'Style it', text: 'Pick a colour preset or exact colours, choose fonts, set the corner radius and width, or apply your brand kit.' },
      { title: 'Animate and preview', text: 'Choose an entrance effect and speed, press Play animation, and check desktop, tablet and mobile.' },
      { title: 'Save and export', text: 'Save it to My designs, then export HTML, a ZIP, a React or Vue component, or fork it into My Code.' },
    ],
  },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Website Section Templates',
  url: PAGE_URL,
  description: DESC,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: SECTION_TEMPLATES.length,
    itemListElement: SECTION_TEMPLATES.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${PAGE_URL}${t.id}/` })),
  },
};
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Website Section Templates', item: PAGE_URL },
  ],
};

export default function WebsiteSectionTemplatesPage() {
  return (
    <div className={styles.page}>
      {[collectionSchema, faqSchema, breadcrumbSchema].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={`${styles.toolSection} ${styles.toolSectionGallery}`}><SectionGalleryPage previews={sectionPreviewIds()} /></div>
      <AdSlot />
      <IndexOnly>
        <SeoSection slug="website-section-templates" title="Website Section Templates — Free, Editable, Animated" subtitle="Hero sections · Shared theme · GSAP animation · Container queries · HTML, React & Vue" sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
