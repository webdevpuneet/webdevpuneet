import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import HomeTemplatesCarousel from '@/components/HomeTemplatesCarousel';
import { SectionTemplateEditor, SectionShot } from '@/components/SectionTemplates';
import { SECTION_TEMPLATES, SECTION_CATEGORIES, CUSTOM_TEMPLATES, sectionTemplateById, sectionCategoryById, relatedSectionTemplates } from '@/components/SectionTemplates/templates/index.js';
import { WEBSITE_TEMPLATES } from '@/components/SectionTemplates/templates/starters.js';
import { SECTION_SEO, SECTION_DIFFERENT } from '@/components/SectionTemplates/templates/seo-content.js';
import { sectionPreviewIds, hasSectionOg, sectionOgUrl, sectionPreviewUrl } from '@/components/SectionTemplates/assets';
import styles from '../../tool-page.module.css';
import snip from '../../ui-snippets/[slug]/styles.module.css';

const BASE = 'https://webdevpuneet.com/website-section-templates/';
const AUTHOR = { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' };

export const dynamicParams = false;
export function generateStaticParams() {
  return [...SECTION_TEMPLATES, ...CUSTOM_TEMPLATES].map(t => ({ id: t.id }));
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
    robots: { index: !t.draft, follow: true }, // drafts: SEO content not written yet
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
  const cat = sectionCategoryById(t.category) || (t.custom ? { label: 'Custom section' } : null); // a custom section has no category
  const url = `${BASE}${t.id}/`;
  const catUrl = t.category ? `${BASE}category/${t.category}/` : BASE;
  const shots = new Set(sectionPreviewIds());
  const hasPreview = shots.has(t.id);
  const parts = t.groups.map(g => g.label.toLowerCase());
  const toggleable = t.groups.filter(g => g.toggle).map(g => g.label.toLowerCase());
  const listJoin = a => (a.length > 1 ? `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}` : a[0] || '');

  // Only sections from the same category (this one first)
  // A section with no category (the Custom Section) shows one section from every category instead
  const relatedAll = t.category
    ? [t, ...relatedSectionTemplates(t).filter(x => x.category === t.category)]
    : [t, ...SECTION_CATEGORIES.map(c => SECTION_TEMPLATES.find(x => x.category === c.id)).filter(Boolean)];
  const relatedItems = relatedAll.filter(x => shots.has(x.id)).map(x => ({
    id: x.id, title: x.name, href: `/website-section-templates/${x.id}/`, img: sectionPreviewUrl(x.id),
    cat: sectionCategoryById(x.category)?.label, meta: 'Responsive · Animated',
  }));

  const faqs = [
    ...seo.faqs,
    { q: 'What does "Fork to My Code" do?', a: `It saves an editable copy of your ${t.name} in My Code, the UI Snippets code editor: the section markup goes in the HTML panel, its CSS (theme variables, base styles and layout) in the CSS panel, and the GSAP library is added as a CDN link, so you can keep refining the code and save your own versions.` },
    { q: `Is the ${t.name} template free for commercial use?`, a: 'Yes. It is free for personal and commercial websites, with no sign-up, no watermark and no attribution required. Everything runs in your browser and your edits are saved locally.' },
  ];

  // Website templates built with this section: a link from the section page to each of them
  const usedIn = WEBSITE_TEMPLATES.filter(w => w.sections.some(([sid]) => sid === t.id));

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
    ...(seo.aiPrompt ? [{ type: 'aiPrompt', label: 'Extend with AI', heading: 'Take This Section Further With AI', paragraph: seo.aiPrompt.paragraph, prompt: seo.aiPrompt.prompt }] : []),
    { type: 'cards', label: 'Why use it', heading: `Why Use the ${t.name}`, columns: 3, items: seo.why },
    { type: 'cards', label: 'How it’s different', heading: 'How It’s Different From Other Free Section Templates', columns: 3, items: SECTION_DIFFERENT },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use',
      items: [
        { title: 'Edit the content', text: t.custom ? 'Add rows and columns in the panel, fill them with blocks such as headings, text, images, buttons, lists and HTML, then set alignment, spacing and any custom CSS or JavaScript. Click text in the preview to edit it in place.' : `Fill in the ${listJoin(parts)} in the panel.${toggleable.length ? ` Switch the ${listJoin(toggleable)} on or off.` : ''} Wrap words in *asterisks* to colour them.` },
        { title: 'Add your images', text: 'Upload your own images (resized in your browser and kept on your device) or paste a hosted image URL.' },
        { title: 'Match your brand', text: 'Pick a colour preset or exact colours, choose heading and body fonts from Google Fonts or your own uploaded font, set the corner radius and width, or apply your brand kit.' },
        { title: 'Animate and preview', text: 'Choose a GSAP entrance effect and speed, press Play animation, and check the section on desktop, tablet and mobile.' },
        { title: 'Save and export', text: 'Save it to My designs, then export a single HTML file, a ZIP with your images, a React or Vue component, or fork it into My Code.' },
      ],
    },
    { type: 'cards', label: 'Real-world uses', heading: 'Common Use Cases', columns: 3, items: seo.useCases },
    ...(usedIn.length ? [{
      type: 'text',
      label: 'In real websites',
      heading: `Website Templates That Use the ${t.name} Section`,
      quickFacts: false,
      boxed: true,
      text: `The ${t.name} section is part of ${usedIn.length} complete website template${usedIn.length > 1 ? 's' : ''} in the free [Website Builder](/website-builder/), so you can see it in a full page before you use it on its own: ${usedIn.map(w => `[${w.name}](/website-builder/templates/${w.id}/)`).join(', ')}. Open any of them in the builder to edit the whole page, or keep customising this section by itself.`,
    }] : []),
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
            viewAllHref={catUrl}
            items={relatedItems}
            activeId={t.id}
            wide
            cols={5}
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
                <a href={catUrl} className={snip.tagChipLink}>{t.category ? cat?.label : 'All sections'}</a>
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
