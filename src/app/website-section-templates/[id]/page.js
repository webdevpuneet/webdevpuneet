import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import HomeTemplatesCarousel from '@/components/HomeTemplatesCarousel';
import { SectionTemplateEditor, SectionShot } from '@/components/SectionTemplates';
import { SECTION_TEMPLATES, sectionTemplateById, sectionCategoryById, relatedSectionTemplates } from '@/components/SectionTemplates/templates/index.js';
import { SECTION_SEO, SECTION_DIFFERENT } from '@/components/SectionTemplates/templates/seo-content.js';
import { sectionPreviewIds, hasSectionOg, sectionOgUrl, sectionPreviewUrl } from '@/components/SectionTemplates/assets';
import styles from '../../tool-page.module.css';
import snip from '../../ui-snippets/[slug]/styles.module.css';

const BASE = 'https://webdevpuneet.com/website-section-templates/';
const AUTHOR = { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' };

export const dynamicParams = false;
export function generateStaticParams() {
  return SECTION_TEMPLATES.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = sectionTemplateById(id);
  if (!t) return {};
  const url = `${BASE}${t.id}/`;
  const images = hasSectionOg(t.id) ? [{ url: sectionOgUrl(t.id), width: 1200, height: 630, alt: `${t.name} — free website section template` }] : undefined;
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    keywords: SECTION_SEO[t.id]?.keywords,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/website-section-templates.svg', shortcut: '/icons/website-section-templates.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: t.seoTitle, description: t.seoDescription, locale: 'en_US', ...(images && { images }) },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: t.seoTitle, description: t.seoDescription, ...(images && { images: [images[0].url] }) },
  };
}

export default async function WebsiteSectionTemplatePage({ params }) {
  const { id } = await params;
  const t = sectionTemplateById(id);
  if (!t) notFound();
  const seo = SECTION_SEO[t.id];
  const cat = sectionCategoryById(t.category);
  const url = `${BASE}${t.id}/`;
  const catUrl = `${BASE}category/${t.category}/`;
  const shots = new Set(sectionPreviewIds());
  const hasPreview = shots.has(t.id);
  const parts = t.groups.map(g => g.label.toLowerCase());
  const toggleable = t.groups.filter(g => g.toggle).map(g => g.label.toLowerCase());
  const listJoin = a => (a.length > 1 ? `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}` : a[0] || '');

  const relatedAll = [t, ...relatedSectionTemplates(t)];
  const relatedItems = relatedAll.filter(x => shots.has(x.id)).map(x => ({
    id: x.id, title: x.name, href: `/website-section-templates/${x.id}/`, img: sectionPreviewUrl(x.id),
    cat: sectionCategoryById(x.category)?.label, meta: 'Responsive · Animated',
  }));

  const faqs = [
    ...seo.faqs,
    { q: 'What does "Fork to My Code" do?', a: `It saves an editable copy of your ${t.name} in My Code, the UI Snippets code editor: the section markup goes in the HTML panel, its CSS (theme variables, base styles and layout) in the CSS panel, and the GSAP library is added as a CDN link, so you can keep refining the code and save your own versions.` },
    { q: `Is the ${t.name} template free for commercial use?`, a: 'Yes. It is free for personal and commercial websites, with no sign-up, no watermark and no attribution required. Everything runs in your browser and your edits are saved locally.' },
  ];

  const sections = [
    { type: 'features', label: "What's included", heading: 'Features', items: seo.features },
    {
      type: 'text',
      label: 'About this section',
      heading: seo.about.title,
      text: seo.about.description,
      quickFacts: false,
      extra: (
        <div key="shot" className={snip.screenshotFrame}>
          {hasPreview
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={sectionPreviewUrl(t.id)} alt={`${t.name}: ${t.description}`} loading="lazy" className={snip.screenshotImg} />
            : <SectionShot id={t.id} />}
        </div>
      ),
    },
    { type: 'cards', label: 'Why use it', heading: `Why Use the ${t.name}`, columns: 3, items: seo.why },
    { type: 'cards', label: 'How it’s different', heading: 'How It’s Different From Other Free Section Templates', columns: 3, items: SECTION_DIFFERENT },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use',
      items: [
        { title: 'Edit the content', text: `Fill in the ${listJoin(parts)} in the panel.${toggleable.length ? ` Switch the ${listJoin(toggleable)} on or off.` : ''} Wrap words in *asterisks* to colour them.` },
        { title: 'Add your images', text: 'Upload your own images (resized in your browser and kept on your device) or paste a hosted image URL.' },
        { title: 'Match your brand', text: 'Pick a colour preset or exact colours, choose heading and body fonts from Google Fonts or your own uploaded font, set the corner radius and width, or apply your brand kit.' },
        { title: 'Animate and preview', text: 'Choose a GSAP entrance effect and speed, press Play animation, and check the section on desktop, tablet and mobile.' },
        { title: 'Save and export', text: 'Save it to My designs, then export a single HTML file, a ZIP with your images, a React or Vue component, or fork it into My Code.' },
      ],
    },
    { type: 'cards', label: 'Real-world uses', heading: 'Common Use Cases', columns: 3, items: seo.useCases },
    { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
  ];

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${t.name} — website section template`,
    url,
    description: t.seoDescription,
    encodingFormat: 'text/html',
    version: t.version,
    dateCreated: t.created,
    dateModified: t.updated,
    genre: cat?.label,
    keywords: [...seo.keywords, ...t.tags].join(', '),
    isAccessibleForFree: true,
    license: 'Free for personal and commercial use',
    isPartOf: { '@type': 'CollectionPage', name: `${cat?.label} Section Templates`, url: catUrl },
    ...(hasPreview && { image: `https://webdevpuneet.com${sectionPreviewUrl(t.id)}` }),
    author: AUTHOR,
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(q => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
      { '@type': 'ListItem', position: 2, name: 'Website Section Templates', item: BASE },
      { '@type': 'ListItem', position: 3, name: cat?.label, item: catUrl },
      { '@type': 'ListItem', position: 4, name: t.name, item: url },
    ],
  };

  return (
    <div className={styles.page}>
      {[workSchema, faqSchema, breadcrumbSchema].map((sc, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />
      ))}
      <div className={styles.toolSection}><SectionTemplateEditor id={t.id} /></div>
      <AdSlot
        adFirst
        related={(
          <HomeTemplatesCarousel
            title="Related Section Templates"
            label={`${relatedItems.length} sections`}
            viewAllHref={`/website-section-templates/category/${t.category}/`}
            items={relatedItems}
            activeId={t.id}
            scroll
            flush
          />
        )}
      />
      <IndexOnly>
        <SeoSection
          slug="website-section-templates"
          title={`${t.name} — Free Website Section Template`}
          subtitle={`${cat?.label} · v${t.version} · Updated ${t.updated} · Responsive · GSAP animation · HTML, React & Vue`}
          titleExtra={(
            <>
              <div className={snip.snippetTagRow}>
                <span className={snip.snippetTagLabel}>Category</span>
                <a href={`/website-section-templates/category/${t.category}/`} className={snip.tagChipLink}>{cat?.label}</a>
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
