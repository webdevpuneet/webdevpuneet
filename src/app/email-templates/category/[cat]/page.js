import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { EmailCategoryPage } from '@/components/EmailTemplates';
import { emailPreviewIds, hasEmailOg, emailOgUrl } from '@/components/EmailTemplates/assets';
import { EMAIL_TEMPLATES, EMAIL_CATEGORIES, emailCategoryById } from '@/components/EmailTemplates/templates/index.js';
import { EMAIL_SEO, EMAIL_DIFFERENT } from '@/components/EmailTemplates/templates/seo-content.js';
import { EMAIL_CATEGORY_SEO } from '@/components/EmailTemplates/templates/seo-categories.js';
import styles from '../../../tool-page.module.css';

const BASE = 'https://webdevpuneet.com/email-templates/';

export const dynamicParams = false;
export function generateStaticParams() {
  return EMAIL_CATEGORIES.filter(c => EMAIL_TEMPLATES.some(t => t.category === c.id)).map(c => ({ cat: c.id }));
}

export async function generateMetadata({ params }) {
  const { cat } = await params;
  const c = EMAIL_CATEGORY_SEO[cat];
  if (!c) return {};
  const url = `${BASE}category/${cat}/`;
  // Use the first template's OG card in this category, once captured
  const first = EMAIL_TEMPLATES.find(t => t.category === cat);
  const images = first && hasEmailOg(first.id) ? [{ url: emailOgUrl(first.id), width: 1200, height: 630, alt: c.h1 }] : undefined;
  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/email-templates.svg', shortcut: '/icons/email-templates.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: c.title, description: c.description, locale: 'en_US', ...(images && { images }) },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: c.title, description: c.description, ...(images && { images: [images[0].url] }) },
  };
}

export default async function EmailCategoryRoute({ params }) {
  const { cat } = await params;
  const c = EMAIL_CATEGORY_SEO[cat];
  const meta = emailCategoryById(cat);
  if (!c || !meta) notFound();
  const list = EMAIL_TEMPLATES.filter(t => t.category === cat);
  const url = `${BASE}category/${cat}/`;
  const n = list.length;
  const lead = `${n} free ${meta.label.toLowerCase()} email template${n > 1 ? 's' : ''}. ${meta.blurb} Responsive, Outlook-safe and dark mode ready: edit in your browser, then copy the HTML, download a ZIP or fork it into My Code.`;

  const faqs = [
    ...c.faqs,
    { q: `Which ${meta.label.toLowerCase()} email templates are included?`, a: list.map(t => `${t.name}: ${t.description}`).join(' ') },
    { q: 'Will these templates work in Outlook, Gmail and Apple Mail?', a: 'Yes. They use nested tables, inline styles, a 600 px container with Outlook conditional comments, a VML "bulletproof" button for Outlook on Windows, and an Arial override so Outlook doesn\'t fall back to Times New Roman. Each includes a dark palette and a plain-text version.' },
    { q: 'Are they free for commercial use?', a: 'Yes. Every template is free for personal and commercial email, with no account and no watermark. Everything runs in your browser and your edits are saved locally.' },
  ];

  const sections = [
    {
      type: 'text',
      label: 'About these templates',
      heading: c.h1,
      text: `${c.intro}\n\n${list.map(t => `**[${t.name}](/email-templates/${t.id}/)**: ${t.description}`).join('\n\n')}`,
      quickFacts: false,
    },
    {
      type: 'cards',
      label: 'Real-world uses',
      heading: `Best Uses for ${meta.label} Email Templates`,
      columns: 3,
      items: list.flatMap(t => (EMAIL_SEO[t.id]?.useCases || []).slice(0, list.length > 2 ? 2 : 3).map(u => ({ ...u, title: `${u.title} (${t.name})` }))).slice(0, 6),
    },
    { type: 'cards', label: 'How it’s different', heading: 'How These Email Templates Are Different', columns: 3, items: EMAIL_DIFFERENT },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use',
      items: [
        { title: 'Pick a template', text: `Open one of the ${meta.label.toLowerCase()} templates above. Your edits are saved in your browser as you go.` },
        { title: 'Write the email', text: 'Fill in the sender name, subject, preheader and content, or click any text in the preview to jump to its field. Switch sections on or off.' },
        { title: 'Add your brand', text: 'Upload or paste your logo and images, set the brand colour and the light and dark palettes, choose fonts, or apply your saved brand kit.' },
        { title: 'Preview and check', text: 'Switch between desktop, mobile and dark mode, and fix anything the pre-send checks flag.' },
        { title: 'Export', text: 'Copy the HTML into your email service, download a ZIP with images, copy the plain-text version, or fork it into My Code.' },
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
      { '@type': 'ListItem', position: 2, name: 'Email Templates', item: BASE },
      { '@type': 'ListItem', position: 3, name: meta.label, item: url },
    ],
  };

  return (
    <div className={styles.page}>
      {[collection, faqSchema, breadcrumb].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={`${styles.toolSection} ${styles.toolSectionGallery}`}>
        <EmailCategoryPage category={cat} h1={c.h1} lead={lead} previews={emailPreviewIds()} />
      </div>
      <IndexOnly>
        <AdSlot />
        <SeoSection slug="email-templates" title={c.h1} subtitle={`${n} template${n > 1 ? 's' : ''} · Gmail, Outlook & Apple Mail · Dark mode · Copy HTML`} sections={sections} />
      </IndexOnly>
    </div>
  );
}
