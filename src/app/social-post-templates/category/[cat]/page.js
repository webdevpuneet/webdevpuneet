import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { TemplateCategoryPage } from '@/components/SocialPostTemplates';
import { previewIds, hasOg, ogUrl } from '@/components/SocialPostTemplates/assets';
import { TEMPLATES, TEMPLATE_CATEGORIES, SIZES, categoryById } from '@/components/SocialPostTemplates/templates/index.js';
import { TEMPLATE_SEO } from '@/components/SocialPostTemplates/templates/seo-content.js';
import { TEMPLATE_DIFFERENT } from '@/components/SocialPostTemplates/templates/seo-why.js';
import { CATEGORY_SEO } from '@/components/SocialPostTemplates/templates/seo-categories.js';
import styles from '../../../tool-page.module.css';

const BASE = 'https://webdevpuneet.com/social-post-templates/';

export const dynamicParams = false;
export function generateStaticParams() {
  return TEMPLATE_CATEGORIES.filter(c => TEMPLATES.some(t => t.category === c.id)).map(c => ({ cat: c.id }));
}

export async function generateMetadata({ params }) {
  const { cat } = await params;
  const c = CATEGORY_SEO[cat];
  if (!c) return {};
  const url = `${BASE}category/${cat}/`;
  // Use the first template's OG card in this category, once captured
  const first = TEMPLATES.find(t => t.category === cat);
  const images = first && hasOg(first.id) ? [{ url: ogUrl(first.id), width: 1200, height: 630, alt: c.h1 }] : undefined;
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/social-post-templates.svg', shortcut: '/icons/social-post-templates.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: c.title, description: c.description, locale: 'en_US', ...(images && { images }) },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: c.title, description: c.description, ...(images && { images: [images[0].url] }) },
  };
}

export default async function TemplateCategoryRoute({ params }) {
  const { cat } = await params;
  const c = CATEGORY_SEO[cat];
  const meta = categoryById(cat);
  if (!c || !meta) notFound();
  const list = TEMPLATES.filter(t => t.category === cat);
  const url = `${BASE}category/${cat}/`;
  const lead = `${list.length} free ${meta.label.toLowerCase()} templates for Instagram, Facebook and X. ${meta.blurb} Edit in your browser, download every post size or copy the HTML.`;

  const faqs = [
    ...c.faqs,
    { q: `Which ${meta.label.toLowerCase()} templates are included?`, a: list.map(t => `${t.name}: ${t.description}`).join(' ') },
    { q: 'What sizes can I download?', a: `${SIZES.map(z => `${z.label} ${z.w}×${z.h} (${z.short})`).join(', ')}. Every template adapts to each size, and "All sizes (ZIP)" downloads them together.` },
  ];

  const sections = [
    {
      type: 'text',
      label: 'About this category',
      heading: c.h1,
      text: `${c.intro}\n\n${list.map(t => `**[${t.name}](/social-post-templates/${t.id}/)**: ${t.description}`).join('\n\n')}`,
      quickFacts: false,
    },
    {
      type: 'cards',
      label: 'Templates in this category',
      heading: `Best Uses for ${meta.label} Templates`,
      columns: 3,
      items: list.flatMap(t => TEMPLATE_SEO[t.id].useCases.slice(0, 2).map(u => ({ ...u, title: `${u.title} (${t.name})` }))).slice(0, 6),
    },
    { type: 'cards', label: 'How it’s different', heading: 'Why These Templates Instead of Canva-Style Ones', columns: 3, items: TEMPLATE_DIFFERENT },
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
      numberOfItems: list.length,
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
      { '@type': 'ListItem', position: 2, name: 'Social Post Templates', item: BASE },
      { '@type': 'ListItem', position: 3, name: meta.label, item: url },
    ],
  };

  return (
    <div className={styles.page}>
      {[collection, faqSchema, breadcrumb].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={`${styles.toolSection} ${styles.toolSectionGallery}`}>
        <TemplateCategoryPage category={cat} h1={c.h1} lead={lead} previews={previewIds()} />
      </div>
      <AdSlot />
      <IndexOnly>
        <SeoSection slug="social-post-templates" title={c.h1} subtitle={`${list.length} templates · Instagram, Facebook & X · PNG, JPEG & HTML`} sections={sections} />
      </IndexOnly>
    </div>
  );
}
