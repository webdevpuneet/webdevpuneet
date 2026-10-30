import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { websiteAiPrompt } from '@/components/SectionTemplates/templates/ai-prompts.js';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import HomeTemplatesCarousel from '@/components/HomeTemplatesCarousel';
import { WEBSITE_TEMPLATES, websiteTemplateById } from '@/components/SectionTemplates/templates/starters.js';
import { starterPageList } from '@/components/SectionTemplates/templates/site.js';
import { addedSectionsOf, joinList } from '@/components/SectionTemplates/templates/starters-widgets.js';
import { sectionTemplateById, sectionCategoryById, THEME_PRESETS } from '@/components/SectionTemplates/templates/index.js';
import { WEBSITE_TEMPLATE_SEO } from '@/components/SectionTemplates/templates/seo-website-templates.js';
import { resolveFont } from '@/lib/fonts';
import st from '../templates.module.css';

const BASE = 'https://webdevpuneet.com/website-builder/templates/';
/* Live demos: demos/website-templates/<id>/one-page and /multi-page (made by scripts/export-website-demos.mjs).
   A demo button shows only when its folder exists, so a missing demo never becomes a dead link. */
const DEMOS = 'https://webdevpuneet.com/demos/website-templates/';
const hasDemo = (id, kind) => fs.existsSync(path.join(process.cwd(), 'demos', 'website-templates', id, kind, 'index.html'));

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
  // Every template opens as one page or as its multi-page version (one .html file per page)
  const pages = starterPageList(t.id);
  const multi = pages.length > 1;
  const pageNames = pages.map(pg => pg.name).join(', ');
  const multiUrl = `/website-builder/editor/?starter=${t.id}&pages=multi`;
  const newest = [...WEBSITE_TEMPLATES].reverse(); // newest first
  const related = [...newest.filter(x => x.id !== t.id && x.industry === t.industry), ...newest.filter(x => x.id !== t.id && x.industry !== t.industry)];
  const useUrl = `/website-builder/editor/?starter=${t.id}`;
  const demoOne = hasDemo(t.id, 'one-page') ? `${DEMOS}${t.id}/one-page/` : '';
  const demoMulti = multi && hasDemo(t.id, 'multi-page') ? `${DEMOS}${t.id}/multi-page/` : '';
  const nameLower = t.name.replace(/ (Website|Landing Page)$/, '').toLowerCase();

  const seo = WEBSITE_TEMPLATE_SEO[t.id];
  const faqs = [
    ...(seo?.faqs || []),
    { q: `Is the ${t.name} template free?`, a: `Yes. The ${t.name} template is free for personal and commercial use, with no sign-up, no watermark and no attribution required.` },
    { q: `How do I customize the ${t.name} template?`, a: 'Click “Use this template” to open it in the free Website Builder. Click any section to change its text, images and links, change colours and fonts for the whole page in the Theme tab, and add, remove or drag sections to reorder them.' },
    ...(multi ? [{ q: 'Is this a one-page or a multi-page template?', a: `Both. Use it as one scrolling page, or as a ${pages.length}-page website (${pageNames}) that opens with every page in the editor. The pages share one navbar, footer and theme, and the menu links to every page automatically. Add more pages (About, Pricing, Contact, Blog and others) or remove any you don’t need in the builder’s Pages tab.` }] : []),
    { q: 'Can I download the template as HTML?', a: multi ? `Yes. As one page you get a ZIP with index.html and an assets folder. As a ${pages.length}-page website you get one HTML file per page (${pages.map(pg => pg.file).join(', ')}), a shared styles.css and script.js, and an assets folder with your images, then upload it to any web host. Links between pages also work when you open the files from your computer.` : 'Yes. Download a ZIP with index.html and an assets folder with your images, then upload it to any web host.' },
  ];

  const ai = websiteAiPrompt(t, { theme, fontNames: fonts, pages });
  const extras = addedSectionsOf(t);
  const SECTIONS = [
    ...(multi ? [{ type: 'features', label: 'Multi-page version', heading: `Pages in the ${pages.length}-Page ${t.name} Template`, items: pages.map(pg => `${pg.name} (${pg.file}): ${pg.n} sections${pg.file === 'index.html' ? ', the home page' : ''}`) }] : []),
    { type: 'features', label: "What's included", heading: `Sections in the ${t.name} Template`, items: parts.map(p => `${p.name}: ${p.description.split('. ')[0].replace(/\.$/, '')}`) },
    {
      type: 'text',
      label: 'About this template',
      heading: `A Free ${t.name} Template You Can Edit Online`,
      quickFacts: false,
      text: `${t.intro}

${multi ? `Use it as one scrolling page, or as a ${pages.length}-page website (${pageNames}) sharing one navbar, footer and theme. The one-page version is` : `It's`} built from ${parts.length} sections of the [Website Section Templates](/website-section-templates/) library and opens in the free [Website Builder](/website-builder/editor/?starter=${t.id}), where you can change every word and image, swap sections, set your own colours and fonts and export the finished ${multi ? 'site as clean HTML pages' : 'page as clean HTML'}. The page is responsive, accessible and animated with GSAP, with content that stays visible without JavaScript.

The template ships with a ${fonts[0]} and ${fonts[1]} font pairing and a colour theme suited to ${nameLower} websites; switch to any Google Font, upload your own, or apply your brand kit in one click.`,
    },
    // Widgets and sections added to the template later (back to top, accessibility toolbar, timeline ...), each linked to its own page
    ...(extras.length ? [{
      type: 'text',
      label: 'Extras included',
      heading: `Extras Built Into the ${t.name} Template`,
      quickFacts: false,
      boxed: true,
      text: `Beyond the standard sections, the ${t.name} template includes ${extras.length === 1 ? 'one extra' : `${extras.length} extras`} that you can edit, move or remove in the builder.\n\n${extras.map(e => `**[${e.name}](${e.url})**: ${e.role}.`).join('\n\n')}\n\nEach extra has its own page in the free [Website Section Templates](/website-section-templates/) library, where you can try its settings on their own before you use it here.`,
    }] : []),
    ...(seo?.about ? [{ type: 'text', label: 'Make it yours', heading: `How to Get the Most From the ${t.name} Template`, quickFacts: false, boxed: true, text: seo.about }] : []),
    { type: 'aiPrompt', label: 'Extend with AI', heading: 'Take This Template Further With AI', paragraph: ai.paragraph, prompt: ai.prompt },
    ...(seo?.checklist ? [{ type: 'features', label: 'Checklist', heading: `What a ${nameLower} Website Needs`, items: seo.checklist }] : []),
    { type: 'cards', label: 'Who it’s for', heading: 'Best For', columns: 3, items: t.bestFor.map((b, i) => ({ icon: ['★', '◆', '●'][i % 3], title: b, desc: `A ready-made starting point for ${b.toLowerCase()}, with real copy you can adapt in minutes.` })) },
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use This Template',
      items: [
        { title: 'Open the template', text: multi ? `Click “Use as one page” or “Use as ${pages.length}-page website” to load it in the Website Builder. Your current website is kept in Saved.` : 'Click “Use as one page” to load it in the Website Builder. Your current website is kept in Saved.' },
        { title: 'Make it yours', text: 'Click any section to change its text, images and links; upload your logo and photos.' },
        { title: 'Set your brand', text: 'Pick colours and fonts in the Theme tab, or apply your saved brand kit.' },
        { title: 'Adjust the page', text: 'Add sections from the library, drag to reorder, duplicate or remove what you don’t need.' },
        { title: 'Export and publish', text: multi ? 'Download the ZIP (one HTML file per page for the multi-page version) and upload it to Netlify, Vercel or any host.' : 'Download the ZIP and upload it to Netlify, Vercel or any host.' },
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
      thumbnailUrl: `https://webdevpuneet.com/images/website-templates/thumb/${t.id}.jpg`,
      inLanguage: 'en',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url },
      license: 'Free for personal and commercial use',
      hasPart: { '@type': 'ItemList', numberOfItems: parts.length, itemListElement: parts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `https://webdevpuneet.com/website-section-templates/${p.id}/` })) },
      author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
      isPartOf: { '@type': 'CollectionPage', name: 'Free Website Templates', url: 'https://webdevpuneet.com/website-builder/' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
        { '@type': 'ListItem', position: 2, name: 'Website Builder', item: 'https://webdevpuneet.com/website-builder/' },
        { '@type': 'ListItem', position: 3, name: t.name, item: url },
      ],
    },
  ];

  return (
    <div>
      {schemas.map((sc, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }} />)}
      <PlaygroundTopAd />
      <div className={st.wrap}>
        <nav className={st.crumbs} aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/website-builder/">Website Builder</a> / <span>{t.name}</span></nav>
        <h1 className={st.h1}>{t.name} Template</h1>
        <p className={st.lead}>{t.intro}</p>
        {multi && <p className={st.lead} style={{ fontSize: 14, margin: '-6px 0 22px' }}>One page keeps everything on a single scrolling page. The {pages.length}-page website opens all its pages in the editor: {pageNames}.</p>}
        <div className={st.split}>
          <div className={st.browser}>
            <div className={st.browserBar}><i /><i /><i /><span>Full page preview · scroll to see it all</span></div>
            <div className={st.scroller} tabIndex={0} aria-label={`Full page preview of the ${t.name} template`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/website-templates/full/${t.id}.jpg`} alt={`The complete ${t.name} template: ${parts.map(p => p.name).join(', ')}`} loading="eager" width="900" />
            </div>
          </div>
          <aside className={st.side}>
            <div className={st.versions}>
              <section className={st.version} aria-labelledby="ver-one">
                <h2 id="ver-one" className={st.versionTitle}>One page</h2>
                <p className={st.versionText}>{t.sections.length} sections on one scrolling page, with menu links that jump to each part.</p>
                <div className={st.versionBtns}>
                  <a className={st.btn} href={useUrl}>Use this version</a>
                  {demoOne && <a className={`${st.btn} ${st.btnGhost}`} href={demoOne} target="_blank" rel="noopener">Live demo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg><span className={st.srOnly}> (opens in a new tab)</span></a>}
                </div>
              </section>
              {multi && (
                <section className={st.version} aria-labelledby="ver-multi">
                  <h2 id="ver-multi" className={st.versionTitle}>{pages.length}-page website</h2>
                  <p className={st.versionText}>{pageNames}, sharing one navbar, footer and theme.</p>
                  <div className={st.versionBtns}>
                    <a className={st.btn} href={multiUrl}>Use this version</a>
                    {demoMulti && <a className={`${st.btn} ${st.btnGhost}`} href={demoMulti} target="_blank" rel="noopener">Live demo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg><span className={st.srOnly}> (opens in a new tab)</span></a>}
                  </div>
                </section>
              )}
              <a className={`${st.btn} ${st.btnGhost} ${st.allBtn}`} href="/website-builder/"><span aria-hidden="true">←</span> All website templates</a>
            </div>
            {multi && (
              <div className={st.box}>
                <h2>Multi-page: {pages.length} pages</h2>
                <ol className={st.sectionList}>
                  {pages.map(pg => <li key={pg.file}>{pg.name} <span>· {pg.file} · {pg.n} sections</span></li>)}
                </ol>
              </div>
            )}
            <div className={st.box}>
              <h2>{multi ? `One page: ${parts.length} sections` : `${parts.length} sections`}</h2>
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
                <dt>Pages</dt><dd>{multi ? `1 or ${pages.length}` : '1'}</dd>
                <dt>Export</dt><dd>{multi ? 'ZIP (one page, or HTML pages + CSS)' : 'HTML in a ZIP'}</dd>
                <dt>Price</dt><dd>Free</dd>
              </dl>
            </div>
          </aside>
        </div>
        {/* The page's ad sits above More Templates */}
        <AdSlot related={false} contained />
        {/* Same strip as the home page: full-page shots that scroll on hover */}
        <div className={st.related}>
          <HomeTemplatesCarousel
            title="More Templates"
            label={`${related.length} more website templates`}
            viewAllHref="/website-builder/"
            items={related.map(r => ({ id: r.id, title: r.name, href: `/website-builder/templates/${r.id}/`, img: `/images/website-templates/full/${r.id}.jpg`, cat: r.industry, meta: `${r.sections.length} sections · One page or ${starterPageList(r.id).length} pages` }))}
            scroll
            cols={4}
            flush
          />
        </div>
      </div>
      <IndexOnly>
        <SeoSection slug="website-builder" title={`${t.name} Template — Free, Editable, Export HTML`} subtitle={`${t.industry} · ${multi ? `One page or ${pages.length} pages · ` : ''}${parts.length} sections · ${fonts[0]} + ${fonts[1]} · Responsive · GSAP animation`} sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
