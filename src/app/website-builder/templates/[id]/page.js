import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { WEBSITE_TEMPLATES, websiteTemplateById } from '@/components/SectionTemplates/templates/starters.js';
import { sectionTemplateById, sectionCategoryById, THEME_PRESETS } from '@/components/SectionTemplates/templates/index.js';
import { resolveFont } from '@/lib/fonts';
import st from '../templates.module.css';

const BASE = 'https://webdevpuneet.com/website-builder/templates/';

export const dynamicParams = false;
export function generateStaticParams() {
  return WEBSITE_TEMPLATES.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = websiteTemplateById(id);
  if (!t) return {};
  const url = `${BASE}${t.id}/`;
  const img = `https://webdevpuneet.com/images/website-templates/og/${t.id}.jpg`;
  return {
    title: t.seoTitle,
    description: t.seoDescription,
    keywords: t.keywords,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    icons: { icon: '/icons/website-builder.svg', shortcut: '/icons/website-builder.svg' },
    openGraph: { type: 'website', url, siteName: 'webdevpuneet.com', title: t.seoTitle, description: t.seoDescription, locale: 'en_US', images: [{ url: img, width: 1200, height: 630, alt: `${t.name} template` }] },
    twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: t.seoTitle, description: t.seoDescription, images: [img] },
  };
}

/* The template's colours, for the swatches */
const themeOf = t => ({ ...(t.preset ? THEME_PRESETS.find(p => p.id === t.preset) : {}), ...(t.theme || {}) });

export default async function WebsiteTemplatePage({ params }) {
  const { id } = await params;
  const t = websiteTemplateById(id);
  if (!t) notFound();
  const url = `${BASE}${t.id}/`;
  const theme = themeOf(t);
  const fonts = [resolveFont(t.fonts?.heading).label, resolveFont(t.fonts?.body).label];
  const parts = t.sections.map(([sid]) => sectionTemplateById(sid)).filter(Boolean);
  const related = [...WEBSITE_TEMPLATES.filter(x => x.id !== t.id && x.industry === t.industry), ...WEBSITE_TEMPLATES.filter(x => x.id !== t.id && x.industry !== t.industry)].slice(0, 3);
  const useUrl = `/website-builder/?starter=${t.id}`;
  const nameLower = t.name.replace(/ (Website|Landing Page)$/, '').toLowerCase();

  const faqs = [
    { q: `Is the ${t.name} template free?`, a: `Yes. The ${t.name} template is free for personal and commercial use, with no sign-up, no watermark and no attribution required.` },
    { q: `How do I customize the ${t.name} template?`, a: 'Click “Use this template” to open it in the free Website Builder. Click any section to change its text, images and links, change colours and fonts for the whole page in the Theme tab, and add, remove or drag sections to reorder them.' },
    { q: 'Can I download the template as HTML?', a: 'Yes. Export the page as one HTML file with your images embedded, or as a ZIP with index.html and an images folder, then upload it to any web host.' },
    { q: 'Is the template mobile-friendly?', a: 'Yes. Every section is responsive with CSS container queries, and menus, accordions, carousels and forms work on touch screens and with a keyboard.' },
    { q: 'Does it work without coding?', a: 'Yes. Everything is edited with simple forms. If you know HTML and CSS you can also edit the exported code directly; colours, fonts and sizes are CSS variables.' },
  ];

  const SECTIONS = [
    { type: 'features', label: "What's included", heading: `Sections in the ${t.name} Template`, items: parts.map(p => `${p.name}: ${p.description.split('. ')[0].replace(/\.$/, '')}`) },
    {
      type: 'text',
      label: 'About this template',
      heading: `A Free ${t.name} Template You Can Edit Online`,
      quickFacts: false,
      text: `${t.intro}

It's built from ${parts.length} sections of the [Website Section Templates](/website-section-templates/) library and opens in the free [Website Builder](/website-builder/), where you can change every word and image, swap sections, set your own colours and fonts and export the finished page as clean HTML. The page is responsive, accessible and animated with GSAP, with content that stays visible without JavaScript.

The template ships with a ${fonts[0]} and ${fonts[1]} font pairing and a colour theme suited to ${nameLower} websites; switch to any Google Font, upload your own, or apply your brand kit in one click.`,
    },
    { type: 'cards', label: 'Who it’s for', heading: 'Best For', columns: 3, items: t.bestFor.map((b, i) => ({ icon: ['★', '◆', '●'][i % 3], title: b, desc: `A ready-made starting point for ${b.toLowerCase()}, with real copy you can adapt in minutes.` })) },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use This Template',
      items: [
        { title: 'Open the template', text: 'Click “Use this template” to load it in the Website Builder. Your current page is kept in My pages.' },
        { title: 'Make it yours', text: 'Click any section to change its text, images and links; upload your logo and photos.' },
        { title: 'Set your brand', text: 'Pick colours and fonts in the Theme tab, or apply your saved brand kit.' },
        { title: 'Adjust the page', text: 'Add sections from the library, drag to reorder, duplicate or remove what you don’t need.' },
        { title: 'Export and publish', text: 'Download one HTML file or a ZIP and upload it to Netlify, Vercel or any host.' },
      ],
    },
    { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: `${t.name} template`,
      url,
      description: t.seoDescription,
      image: `https://webdevpuneet.com/images/website-templates/og/${t.id}.jpg`,
      genre: t.industry,
      keywords: t.keywords.join(', '),
      isAccessibleForFree: true,
      license: 'Free for personal and commercial use',
      author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
      isPartOf: { '@type': 'CollectionPage', name: 'Free Website Templates', url: BASE },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
        { '@type': 'ListItem', position: 2, name: 'Website Builder', item: 'https://webdevpuneet.com/website-builder/' },
        { '@type': 'ListItem', position: 3, name: 'Templates', item: BASE },
        { '@type': 'ListItem', position: 4, name: t.name, item: url },
      ],
    },
  ];

  return (
    <div>
      {schemas.map((sc, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />)}
      <div className={st.wrap}>
        <nav className={st.crumbs} aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/website-builder/">Website Builder</a> / <a href="/website-builder/templates/">Templates</a> / <span>{t.name}</span></nav>
        <h1 className={st.h1}>{t.name} Template</h1>
        <p className={st.lead}>{t.intro}</p>
        <div className={st.actions}>
          <a className={st.btn} href={useUrl}>Use this template, free</a>
          <a className={`${st.btn} ${st.btnGhost}`} href="/website-builder/templates/">All templates</a>
        </div>
        <div className={st.split}>
          <div className={st.browser}>
            <div className={st.browserBar}><i /><i /><i /><span>Full page preview · scroll to see it all</span></div>
            <div className={st.scroller} tabIndex={0} aria-label={`Full page preview of the ${t.name} template`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/website-templates/full/${t.id}.jpg`} alt={`The complete ${t.name} template: ${parts.map(p => p.name).join(', ')}`} loading="eager" width="900" />
            </div>
          </div>
          <aside className={st.side}>
            <div className={st.box}>
              <h2>{parts.length} sections</h2>
              <ol className={st.sectionList}>
                {parts.map((p, i) => <li key={`${p.id}-${i}`}><a href={`/website-section-templates/${p.id}/`}>{p.name}</a> <span>· {sectionCategoryById(p.category)?.label}</span></li>)}
              </ol>
            </div>
            <div className={st.box}>
              <h2>Details</h2>
              <dl className={st.facts}>
                <dt>Industry</dt><dd>{t.industry}</dd>
                <dt>Fonts</dt><dd>{fonts[0]} + {fonts[1]}</dd>
                <dt>Colours</dt><dd className={st.swatches}>{['bg', 'surface', 'brand', 'text'].map(k => <i key={k} style={{ background: theme[k] }} title={theme[k]} />)}</dd>
                <dt>Export</dt><dd>HTML or ZIP</dd>
                <dt>Price</dt><dd>Free</dd>
              </dl>
            </div>
            <a className={st.btn} href={useUrl} style={{ justifyContent: 'center' }}>Use this template</a>
          </aside>
        </div>
        <section className={st.related}>
          <h2 className={st.groupTitle}>More templates</h2>
          <ul className={st.grid}>
            {related.map(r => (
              <li key={r.id}>
                <a className={st.card} href={`/website-builder/templates/${r.id}/`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={st.cardImg} src={`/images/website-templates/thumb/${r.id}.jpg`} alt={`${r.name} template preview`} loading="lazy" width="640" height="400" />
                  <span className={st.cardBody}><b>{r.name}</b><span>{r.blurb}</span></span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <AdSlot />
      <IndexOnly>
        <SeoSection slug="website-builder" title={`${t.name} Template — Free, Editable, Export HTML`} subtitle={`${t.industry} · ${parts.length} sections · ${fonts[0]} + ${fonts[1]} · Responsive · GSAP animation`} sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
