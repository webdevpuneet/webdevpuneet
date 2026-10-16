import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { TemplateEditor, TemplateGallery } from '@/components/SocialPostTemplates';
import { TEMPLATES, SIZES, templateById, categoryById } from '@/components/SocialPostTemplates/templates/index.js';
import styles from '../../tool-page.module.css';
import local from './styles.module.css';

const BASE = 'https://webdevpuneet.com/social-post-templates/';

export const dynamicParams = false;
export function generateStaticParams() {
  return TEMPLATES.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = templateById(id);
  if (!t) return {};
  const url = `${BASE}${t.id}/`;
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/social-post-templates.svg', shortcut: '/icons/social-post-templates.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: t.seoTitle, description: t.seoDescription, locale: 'en_US' },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: t.seoTitle, description: t.seoDescription },
  };
}

function seoFor(t) {
  const cat = categoryById(t.category);
  const textFields = t.fields.filter(f => f.type !== 'image').map(f => f.label.replace(/ \(optional\)/i, ''));
  const imageFields = t.fields.filter(f => f.type === 'image').map(f => f.label.replace(/ \(optional\)/i, '').toLowerCase());
  const colourList = t.vars.map(v => v.label.toLowerCase()).join(', ');
  const faqs = [
    { q: `What can I edit in the ${t.name} template?`, a: `You can edit ${textFields.length} text fields (${textFields.join(', ')})${imageFields.length ? `, upload ${imageFields.join(' and ')}` : ''}, change the ${colourList} colours, and switch the heading and body fonts. Click any text in the preview to edit it in place, and wrap words in *asterisks* to colour them with the accent.` },
    { q: `What sizes does ${t.name} come in?`, a: `${SIZES.map(z => `${z.label}: ${z.w}×${z.h} (${z.short})`).join('; ')}. The layout adapts to each size, and "All sizes (ZIP)" downloads every one at once.${t.defaultSize === 'story' ? ' This template is designed Story-first, so it opens at 1080×1920.' : ' It opens at the 4:5 portrait size Instagram recommends for feed posts.'}` },
    { q: 'Can I copy the HTML into my own project?', a: `Yes. Copy HTML and Download .html give you a self-contained file with the markup, inline CSS and Google Fonts links for ${t.name}. The comment at the top records the template name and version (v${t.version}), so you can tell later which version you used.` },
    { q: 'Are my photos and text private?', a: 'Yes. Everything is drawn in your browser and nothing is uploaded. Your edits to this template are saved in your browser, so they are still there when you return.' },
  ];
  return {
    faqs,
    SEO: {
      slug: 'social-post-templates',
      title: `${t.name} — Free ${cat?.label || 'Social Post'} Template`,
      about: {
        title: `About the ${t.name} template`,
        description: `${t.description}\n\n**Best for:** ${t.bestFor.join('; ')}.\n\n**Category:** ${cat?.label}. ${cat?.blurb} **Version** ${t.version}, updated ${t.updated}. Tags: ${t.tags.join(', ')}.\n\nThe design is plain HTML and CSS, laid out in relative units so it works as an Instagram portrait post, a square post, a Story and a landscape post for X and Facebook. Long text shrinks to fit automatically, and Story layouts keep content clear of Instagram’s buttons.`,
      },
      howToUse: {
        type: 'steps',
        items: [
          { title: 'Choose a size', text: 'Pick Portrait (4:5), Square (1:1), Story / Reel (9:16) or Landscape (16:9) in the Size section.' },
          { title: 'Edit the content', text: `Click text in the preview or use the fields on the left to change ${textFields.slice(0, 3).join(', ').toLowerCase()} and the rest.${imageFields.length ? ` Click the photo area, or use Images, to upload your ${imageFields[0]}.` : ''}` },
          { title: 'Match your brand', text: 'Apply a palette or set exact colours with the pickers, then choose heading and body fonts.' },
          { title: 'Export', text: 'Download a full-size PNG or JPEG, download every size as a ZIP, or copy the HTML to use in your own system.' },
        ],
      },
      features: [
        `${textFields.length} editable text fields${imageFields.length ? ` and ${imageFields.length} image slot${imageFields.length > 1 ? 's' : ''}` : ''}`,
        `${t.vars.length} colour controls plus 12 palettes`,
        'Heading and body fonts from 12 Google Fonts or system fonts',
        `${SIZES.length} sizes: 1080×1350, 1080×1080, 1080×1920 and 1600×900`,
        'Automatic text fitting and Story safe zones',
        'PNG or JPEG download at full resolution, or all sizes as a ZIP',
        'Self-contained HTML export with inline CSS',
        `Versioned design (v${t.version}), free for commercial use`,
      ],
      faqs,
    },
  };
}

export default async function SocialPostTemplatePage({ params }) {
  const { id } = await params;
  const t = templateById(id);
  if (!t) notFound();
  const cat = categoryById(t.category);
  const { SEO, faqs } = seoFor(t);
  const url = `${BASE}${t.id}/`;

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${t.name} social post template`,
    url,
    description: t.seoDescription,
    version: t.version,
    dateCreated: t.created,
    dateModified: t.updated,
    genre: cat?.label,
    keywords: t.tags.join(', '),
    isAccessibleForFree: true,
    encodingFormat: 'text/html',
    author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
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
      { '@type': 'ListItem', position: 3, name: t.name, item: url },
    ],
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><TemplateEditor id={t.id} /></div>
      <IndexOnly>
        <AdSlot adFirst related={false} />
        <section className={local.more}>
          <div className={local.moreHead}>
            <h2>More social post templates</h2>
            <a href="/social-post-templates/">See all {TEMPLATES.length} →</a>
          </div>
          <TemplateGallery compact excludeId={t.id} limit={8} />
        </section>
        <SeoSection {...SEO} />
      </IndexOnly>
    </div>
  );
}
