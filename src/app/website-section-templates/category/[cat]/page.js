import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { SectionCategoryPage } from '@/components/SectionTemplates';
import { SECTION_TEMPLATES, SECTION_CATEGORIES, sectionCategoryById } from '@/components/SectionTemplates/templates/index.js';
import { SECTION_SEO, SECTION_DIFFERENT } from '@/components/SectionTemplates/templates/seo-content.js';
import { SECTION_CATEGORY_SEO } from '@/components/SectionTemplates/templates/seo-categories.js';
import { sectionPreviewIds, hasSectionOg, sectionOgUrl } from '@/components/SectionTemplates/assets';
import styles from '../../../tool-page.module.css';

const BASE = 'https://webdevpuneet.com/website-section-templates/';

export const dynamicParams = false;
export function generateStaticParams() {
  return SECTION_CATEGORIES.filter(c => SECTION_CATEGORY_SEO[c.id] && SECTION_TEMPLATES.some(t => t.category === c.id)).map(c => ({ cat: c.id }));
}

export async function generateMetadata({ params }) {
  const { cat } = await params;
  const c = SECTION_CATEGORY_SEO[cat];
  if (!c) return {};
  const url = `${BASE}category/${cat}/`;
  const first = SECTION_TEMPLATES.find(t => t.category === cat);
  const images = first && hasSectionOg(first.id) ? [{ url: sectionOgUrl(first.id), width: 1200, height: 630, alt: c.h1 }] : undefined;
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/website-section-templates.svg', shortcut: '/icons/website-section-templates.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: c.title, description: c.description, locale: 'en_US', ...(images && { images }) },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: c.title, description: c.description, ...(images && { images: [images[0].url] }) },
  };
}

export default async function SectionCategoryRoute({ params }) {
  const { cat } = await params;
  const c = SECTION_CATEGORY_SEO[cat];
  const meta = sectionCategoryById(cat);
  if (!c || !meta) notFound();
  const list = SECTION_TEMPLATES.filter(t => t.category === cat);
  const url = `${BASE}category/${cat}/`;
  const n = list.length;
  const lead = `${n} free, editable ${meta.label.toLowerCase()} section template${n > 1 ? 's' : ''}. ${meta.blurb} Change the text, images, colours and fonts in your browser, add a GSAP animation, then export HTML, React or Vue.`;

  const faqs = [
    ...c.faqs,
    { q: `Which ${meta.label.toLowerCase()} sections are included?`, a: list.map(t => `${t.name}: ${t.description}`).join(' ') },
    { q: 'Are these sections free for commercial use?', a: 'Yes. Every section is free for personal and commercial websites, with no account and no watermark. Everything runs in your browser and your edits are saved locally.' },
  ];

  const sections = [
    {
      type: 'text',
      label: 'About these sections',
      heading: c.h1,
      text: `${c.intro}\n\n${list.map(t => `**[${t.name}](/website-section-templates/${t.id}/)**: ${t.description}`).join('\n\n')}`,
      quickFacts: false,
    },
    {
      type: 'cards',
      label: 'Real-world uses',
      heading: `Best Uses for ${meta.label} Sections`,
      columns: 3,
      items: list.flatMap(t => (SECTION_SEO[t.id]?.useCases || []).slice(0, list.length > 2 ? 2 : 3).map(u => ({ ...u, title: `${u.title} (${t.name})` }))).slice(0, 6),
    },
    { type: 'cards', label: 'How it’s different', heading: 'How These Section Templates Are Different', columns: 3, items: SECTION_DIFFERENT },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use',
      items: [
        { title: 'Pick a section', text: `Open one of the ${meta.label.toLowerCase()} sections above. Your edits autosave in your browser as you go.` },
        { title: 'Edit the content', text: 'Change the text, buttons, links and images in the panel, and switch optional parts on or off.' },
        { title: 'Add your brand', text: 'Pick colours, fonts, radius and width, or apply your saved brand kit; every section shares the same theme.' },
        { title: 'Animate and preview', text: 'Choose a GSAP entrance effect, press Play animation, and check desktop, tablet and mobile.' },
        { title: 'Export', text: 'Download HTML or a ZIP, copy a React or Vue component, or fork it into My Code.' },
      ],
    },
    { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
  ];

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: c.h1,
    url,
    description: c.description,
    keywords: c.keywords.join(', '),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: n,
      itemListElement: list.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${BASE}${t.id}/` })),
    },
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
      { '@type': 'ListItem', position: 2, name: 'Website Section Templates', item: BASE },
      { '@type': 'ListItem', position: 3, name: meta.label, item: url },
    ],
  };

  return (
    <div className={styles.page}>
      {[collection, faqSchema, breadcrumb].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={`${styles.toolSection} ${styles.toolSectionGallery}`}>
        <SectionCategoryPage category={cat} h1={c.h1} lead={lead} previews={sectionPreviewIds()} />
      </div>
      <AdSlot related={false} />
      <IndexOnly>
        <SeoSection slug="website-section-templates" title={c.h1} subtitle={`${n} section${n > 1 ? 's' : ''} · Responsive · GSAP animation · HTML, React & Vue`} sections={sections} />
      </IndexOnly>
    </div>
  );
}
