import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { TemplateEditor } from '@/components/SocialPostTemplates';
import HomeTemplatesCarousel from '@/components/HomeTemplatesCarousel';
import TemplateShot from '@/components/SocialPostTemplates/Shot';
import { previewIds, hasOg, ogUrl, previewUrl } from '@/components/SocialPostTemplates/assets';
import { TEMPLATES, SIZES, templateById, categoryById } from '@/components/SocialPostTemplates/templates/index.js';
import { EMAIL_TEMPLATES } from '@/components/EmailTemplates/templates/index.js';
import { emailsForSocial } from '@/lib/cross-library-links';
import { TEMPLATE_SEO } from '@/components/SocialPostTemplates/templates/seo-content.js';
import { TEMPLATE_WHY, TEMPLATE_DIFFERENT } from '@/components/SocialPostTemplates/templates/seo-why.js';
import styles from '../../tool-page.module.css';
import snip from '../../ui-snippets/[slug]/styles.module.css';

const BASE = 'https://webdevpuneet.com/social-post-templates/';
const AUTHOR = { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' };

export const dynamicParams = false;
export function generateStaticParams() {
  return TEMPLATES.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = templateById(id);
  if (!t) return {};
  const url = `${BASE}${t.id}/`;
  // Compressed 1200×630 OG card from scripts/capture-template-previews.mjs, once captured
  const images = hasOg(t.id) ? [{ url: ogUrl(t.id), width: 1200, height: 630, alt: `${t.name} social post template preview` }] : undefined;
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    keywords: TEMPLATE_SEO[t.id]?.keywords,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/social-post-templates.svg', shortcut: '/icons/social-post-templates.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: t.seoTitle, description: t.seoDescription, locale: 'en_US', ...(images && { images }) },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: t.seoTitle, description: t.seoDescription, ...(images && { images: [images[0].url] }) },
  };
}

export default async function SocialPostTemplatePage({ params }) {
  const { id } = await params;
  const t = templateById(id);
  if (!t) notFound();
  const cat = categoryById(t.category);
  const seo = TEMPLATE_SEO[t.id];
  const url = `${BASE}${t.id}/`;

  // Shared FAQs every template page answers, after the template-specific ones
  const faqs = [
    ...seo.faqs,
    { q: `What sizes does the ${t.name} template export?`, a: `${SIZES.map(z => `${z.label} ${z.w}×${z.h} (${z.short}): ${z.note}`).join('. ')}. Switch sizes in the editor and the layout adapts, or click "All sizes (ZIP)" to download every size at once.` },
    { q: 'Can I make lots of posts at once?', a: `Yes. Choose Export, then "Bulk create from CSV", and paste rows from a spreadsheet or upload a CSV whose column names match the ${t.name} fields. Every row becomes one post, and you download them all as a ZIP.` },
    { q: 'Can I see how the post will look on Instagram or LinkedIn?', a: 'Yes. The preview switches between the plain design and mock-ups of an Instagram feed post, an Instagram Story, an X post and a LinkedIn post, using the name, handle and logo from your brand kit and the caption you type.' },
    { q: 'Can I use the HTML in my own project?', a: `Yes. "Copy HTML" and "Download .html" give you one self-contained file: the markup, all the CSS and links to the Google Fonts it uses. "Fork to My Code" saves an editable copy in the UI Snippets editor. The file records the template name and version (v${t.version}).` },
    { q: `Is the ${t.name} template free for commercial use?`, a: 'Yes. It is free for personal and commercial posts, with no sign-up and no watermark. Everything runs in your browser and nothing you type or upload is sent to a server.' },
  ];

  const size = SIZES.find(z => z.id === (t.defaultSize || 'portrait')) || SIZES[0];
  const previews = previewIds();
  const hasPreview = previews.includes(t.id);
  // Related strip under the ad, like Related Snippets: every template in this category,
  // the current one first and highlighted, then the most shared tags
  const tags = new Set(t.tags);
  const others = TEMPLATES.filter(x => x.id !== t.id && x.category === t.category)
    .map((x, i) => ({ x, i, score: x.tags.filter(tag => tags.has(tag)).length }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .map(r => r.x);
  const relatedItems = [t, ...others].filter(x => previews.includes(x.id)).map(x => ({
    id: x.id, title: x.name, href: `/social-post-templates/${x.id}/`, img: previewUrl(x.id),
    cat: categoryById(x.category)?.label, meta: `${SIZES.length} sizes`,
  }));

  const emailMatches = emailsForSocial(t.id).map(id => EMAIL_TEMPLATES.find(x => x.id === id)).filter(Boolean);

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
            ? <img src={previewUrl(t.id)} alt={`${t.name} social post template: ${t.description}`} loading="lazy" className={snip.screenshotImg} />
            : <TemplateShot id={t.id} />}
        </div>
      ),
    },
    { type: 'cards', label: 'Why use it', heading: `Why Use the ${t.name} Template`, columns: 3, items: TEMPLATE_WHY[t.id] },
    { type: 'cards', label: 'How it’s different', heading: 'How It’s Different From Canva-Style Templates', columns: 3, items: TEMPLATE_DIFFERENT },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use',
      items: [
        { title: 'Pick the size', text: `Choose Portrait 4:5 (the Instagram feed default), Square, Story / Reel, Landscape 16:9 for X, a 1200×627 LinkedIn image or a 1000×1500 Pinterest pin. ${t.name} opens at ${size.w}×${size.h}.` },
        { title: 'Edit the text', text: `Click any text in the preview, or use the fields on the left (${t.fields.filter(f => f.type !== 'image').slice(0, 4).map(f => f.label.replace(/ \(optional\)/i, '').toLowerCase()).join(', ')} and more). Wrap words in *asterisks* to colour them.` },
        ...(t.fields.some(f => f.type === 'image') ? [{ title: 'Add your images', text: `Click a photo area in the preview or use Images to upload your ${t.fields.filter(f => f.type === 'image').map(f => f.label.replace(/ \(optional\)/i, '').toLowerCase()).join(' and ')}. Images stay in your browser.` }] : []),
        { title: 'Match your brand', text: 'Apply your saved brand kit or one of 12 palettes, set exact colours, and choose heading and body fonts from any Google Font or your own uploaded font.' },
        { title: 'Preview it in the feed', text: 'Switch the preview to Instagram, Story, X or LinkedIn to see the post with your name, handle and caption, and fix anything the quality checks flag.' },
        { title: 'Download, save or bulk create', text: 'Download PNG, JPG or PDF, every size as a ZIP, or copy the HTML. Save it to My designs to reuse later, or turn a CSV into dozens of posts with Bulk create.' },
      ],
    },
    { type: 'cards', label: 'Real-world uses', heading: 'Common Use Cases', columns: 3, items: seo.useCases },
    ...(emailMatches.length ? [{
      type: 'text',
      label: 'Follow it up',
      heading: `Email Templates to Match the ${t.name} Post`,
      quickFacts: false,
      text: `Reach the people who are not on social media with a matching email from the free responsive HTML email templates: ${emailMatches.map(m => `[${m.name}](/email-templates/${m.id}/)`).join(', ')}. Both libraries use the same brand colours and fonts, so the post and the email look like one campaign.`,
    }] : []),
    { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
  ];

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${t.name} social post template`,
    url,
    description: t.seoDescription,
    encodingFormat: 'text/html',
    version: t.version,
    dateCreated: t.created,
    dateModified: t.updated,
    keywords: [...seo.keywords, ...t.tags].join(', '),
    isAccessibleForFree: true,
    license: 'Free for personal and commercial use',
    ...(hasPreview && { image: `https://webdevpuneet.com${previewUrl(t.id)}` }),
    author: AUTHOR,
  };
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: seo.about.title,
    description: t.seoDescription,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: t.created,
    dateModified: t.updated,
    author: AUTHOR,
    publisher: AUTHOR,
    about: seo.keywords.map(k => ({ '@type': 'Thing', name: k })),
    proficiencyLevel: 'Beginner',
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
      { '@type': 'ListItem', position: 2, name: 'Social Post Templates', item: BASE },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `${BASE}category/${cat.id}/` },
      { '@type': 'ListItem', position: 4, name: t.name, item: url },
    ],
  };

  return (
    <div className={styles.page}>
      {[softwareSchema, articleSchema, faqSchema, breadcrumbSchema].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={styles.toolSection}><TemplateEditor id={t.id} /></div>
      <AdSlot
          adFirst
          related={relatedItems.length ? (
            <HomeTemplatesCarousel
              title="Related Social Post Templates"
              label={`${relatedItems.length} in ${cat.label} category`}
              viewAllHref={`/social-post-templates/category/${t.category}/`}
              items={relatedItems}
              activeId={t.id}
              flush
            />
          ) : false}
        />
      <IndexOnly>
        <SeoSection
          slug="social-post-templates"
          title={`${t.name} — Free ${cat.label} Social Post Template`}
          subtitle={`${cat.label} · v${t.version} · Updated ${t.updated} · Instagram, Facebook & X · HTML + CSS`}
          titleExtra={(
            <>
              <div className={snip.snippetTagRow}>
                <span className={snip.snippetTagLabel}>Category</span>
                <a href={`/social-post-templates/category/${cat.id}/`} className={snip.tagChipLink}>{cat.label}</a>
              </div>
              <div className={snip.snippetTagRow}>
                <span className={snip.snippetTagLabel}>Tags</span>
                {t.tags.map(tag => <span key={tag} className={snip.tagChipLink}>{tag.replace(/-/g, ' ')}</span>)}
              </div>
              <div className={snip.snippetTagRow}>
                <span className={snip.snippetTagLabel}>Sizes</span>
                {SIZES.map(z => <span key={z.id} className={snip.tagChipLink}>{z.short} · {z.w}×{z.h}</span>)}
              </div>
            </>
          )}
          sections={sections}
        />
      </IndexOnly>
    </div>
  );
}
