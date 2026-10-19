import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import HomeTemplatesCarousel from '@/components/HomeTemplatesCarousel';
import { EmailTemplateEditor, EmailShot } from '@/components/EmailTemplates';
import { EMAIL_TEMPLATES, emailTemplateById, emailCategoryById, relatedEmailTemplates } from '@/components/EmailTemplates/templates/index.js';
import { EMAIL_SEO, EMAIL_DIFFERENT } from '@/components/EmailTemplates/templates/seo-content.js';
import { emailPreviewIds, hasEmailOg, emailOgUrl, emailPreviewUrl } from '@/components/EmailTemplates/assets';
import styles from '../../tool-page.module.css';
import snip from '../../ui-snippets/[slug]/styles.module.css';

const BASE = 'https://webdevpuneet.com/email-templates/';
const AUTHOR = { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' };

export const dynamicParams = false;
export function generateStaticParams() {
  return EMAIL_TEMPLATES.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = emailTemplateById(id);
  if (!t) return {};
  const url = `${BASE}${t.id}/`;
  // Share card from scripts/capture-email-previews.mjs, once captured
  const images = hasEmailOg(t.id) ? [{ url: emailOgUrl(t.id), width: 1200, height: 630, alt: `${t.name} — free responsive HTML email template` }] : undefined;
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    keywords: EMAIL_SEO[t.id]?.keywords,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/email-templates.svg', shortcut: '/icons/email-templates.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: t.seoTitle, description: t.seoDescription, locale: 'en_US', ...(images && { images }) },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: t.seoTitle, description: t.seoDescription, ...(images && { images: [images[0].url] }) },
  };
}

export default async function EmailTemplatePage({ params }) {
  const { id } = await params;
  const t = emailTemplateById(id);
  if (!t) notFound();
  const seo = EMAIL_SEO[t.id];
  const cat = emailCategoryById(t.category);
  const url = `${BASE}${t.id}/`;
  const hasPreview = emailPreviewIds().includes(t.id);
  const catUrl = `${BASE}category/${t.category}/`;
  // Content groups this template exposes (skipping the shared inbox, brand and footer groups)
  const contentGroups = t.groups.filter(g => !['inbox', 'brand', 'footer'].includes(g.id)).map(g => g.label.replace(/ \(.*\)$/, '').toLowerCase());
  const toggleable = t.groups.filter(g => g.toggle).map(g => g.label.replace(/ \(.*\)$/, '').toLowerCase());
  const hasImages = t.fields.some(f => f.upload && f.key !== 'logoUrl');
  const listJoin = a => (a.length > 1 ? `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}` : a[0] || '');
  // Related strip under the ad, like Related Snippets: every template in this category,
  // the current one first and highlighted, then the closest by shared topic tags
  const relatedAll = [t, ...relatedEmailTemplates(t).filter(x => x.category === t.category)];
  const shots = new Set(emailPreviewIds());
  const relatedItems = relatedAll.filter(x => shots.has(x.id)).map(x => ({
    id: x.id, title: x.name, href: `/email-templates/${x.id}/`, img: `/images/email-templates/previews/${x.id}.png`,
    cat: emailCategoryById(x.category)?.label, meta: 'Responsive · Dark mode',
  }));

  const faqs = [
    ...seo.faqs,
    { q: 'What does "Fork to My Code" do?', a: `It saves an editable copy of your ${t.name} in My Code, the UI Snippets code editor: the email markup goes in the HTML panel and its CSS (mobile and dark-mode rules plus fonts) in the CSS panel, so you can keep refining the code and save your own versions.` },
    { q: `Is the ${t.name} template free for commercial use?`, a: 'Yes. It is free for personal and commercial email, with no sign-up and no watermark. Everything runs in your browser, and your edits are saved locally.' },
  ];

  const sections = [
    { type: 'features', label: "What's included", heading: 'Features', items: seo.features },
    {
      type: 'text',
      label: 'About this template',
      heading: seo.about.title,
      text: seo.about.description,
      quickFacts: false,
      extra: (
        <div key="shot" className={snip.screenshotFrame}>
          {hasPreview
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={emailPreviewUrl(t.id)} alt={`${t.name} template: ${t.description}`} loading="lazy" className={snip.screenshotImg} />
            : <EmailShot id={t.id} />}
        </div>
      ),
    },
    { type: 'cards', label: 'Why use it', heading: `Why Use the ${t.name} Template`, columns: 3, items: seo.why },
    { type: 'cards', label: 'How it’s different', heading: 'How It’s Different From Other Free Email Templates', columns: 3, items: EMAIL_DIFFERENT },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use',
      items: [
        { title: 'Pick your email platform', text: 'Choose Mailchimp, Klaviyo, HubSpot or Brevo under Merge tags so first names and unsubscribe links export in its syntax, or keep plain {{first_name}} tokens.' },
        { title: 'Edit the content', text: `Fill in the ${listJoin(contentGroups)}, or click any text in the preview to jump to its field.${toggleable.length ? ` Switch the ${listJoin(toggleable)} on or off.` : ''}` },
        { title: 'Add your brand', text: `Upload or paste your logo${hasImages ? ' and images' : ''}, set the brand colour and the light and dark palettes, pick fonts, or apply your saved brand kit.` },
        { title: 'Preview and check', text: 'Switch between desktop, mobile and dark mode, and fix anything the pre-send checks flag, such as placeholder links or missing alt text.' },
        { title: 'Export or fork', text: `Copy the HTML into ${t.category === 'transactional' ? 'Postmark, SendGrid, Amazon SES, Resend' : 'Mailchimp, Klaviyo, HubSpot, Brevo'} or your own code, copy the plain-text version, download a ZIP with images, or fork it into My Code.` },
      ],
    },
    { type: 'cards', label: 'Real-world uses', heading: 'Common Use Cases', columns: 3, items: seo.useCases },
    { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
  ];

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${t.name} — HTML email template`,
    url,
    description: t.seoDescription,
    encodingFormat: 'text/html',
    version: t.version,
    dateCreated: t.created,
    dateModified: t.updated,
    genre: cat?.label,
    keywords: [...seo.keywords, ...t.tags].join(', '),
    isAccessibleForFree: true,
    isPartOf: { '@type': 'CollectionPage', name: `${cat?.label} Email Templates`, url: catUrl },
    ...(hasPreview && { image: `https://webdevpuneet.com${emailPreviewUrl(t.id)}` }),
    author: AUTHOR,
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
      { '@type': 'ListItem', position: 2, name: 'Email Templates', item: BASE },
      { '@type': 'ListItem', position: 3, name: cat?.label, item: catUrl },
      { '@type': 'ListItem', position: 4, name: t.name, item: url },
    ],
  };

  return (
    <div className={styles.page}>
      {[workSchema, faqSchema, breadcrumbSchema].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={styles.toolSection}><EmailTemplateEditor id={t.id} /></div>
      <AdSlot
          adFirst
          related={(
            <HomeTemplatesCarousel
              title="Related Email Templates"
              label={`${relatedItems.length} in ${cat?.label} category`}
              viewAllHref={`/email-templates/category/${t.category}/`}
              items={relatedItems}
              activeId={t.id}
              scroll
              flush
            />
          )}
        />
      <IndexOnly>
        <SeoSection
          slug="email-templates"
          title={`${t.name} — Free Responsive HTML Email Template`}
          subtitle={`${cat?.label} · v${t.version} · Updated ${t.updated} · Gmail, Outlook & Apple Mail · Dark mode`}
          titleExtra={(
            <>
              <div className={snip.snippetTagRow}>
                <span className={snip.snippetTagLabel}>Category</span>
                <a href={`/email-templates/category/${t.category}/`} className={snip.tagChipLink}>{cat?.label}</a>
              </div>
              <div className={snip.snippetTagRow}>
                <span className={snip.snippetTagLabel}>Tags</span>
                {t.tags.map(tag => <span key={tag} className={snip.tagChipLink}>{tag.replace(/-/g, ' ')}</span>)}
              </div>
            </>
          )}
          sections={sections}
        />
      </IndexOnly>
    </div>
  );
}
