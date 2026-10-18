import HreflangTagGeneratorTool from '@/components/HreflangTagGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/hreflang-tag-generator.png';

const howToSteps = [
  { title: 'Add every language or regional alternate', text: 'Create one row for each equivalent page: `en`, `en-us`, `en-gb`, `fr`, `fr-ca`, or any valid language-region combination. Include the current page URL too, because hreflang sets should be self-referencing as well as reciprocal.' },
  { title: 'Use canonical absolute URLs', text: 'Paste the final HTTPS URL for each page, not a tracking URL, redirect URL, or staging URL. The alternate URLs should match canonical tags generated with [Meta Tag Generator](/meta-tag-generator) and the discovery URLs you include in [Sitemap.xml Generator](/sitemap-generator).' },
  { title: 'Add an x-default fallback', text: 'Include `x-default` for the global fallback, language selector, or default version shown when no better language or region match exists. The tool shows whether an x-default row is present because missing fallbacks are common on international SEO implementations.' },
  { title: 'Choose HTML tags or sitemap XML', text: 'Use HTML output when you can add link tags to each page head. Use sitemap XML output when the site has many localized pages and you prefer managing alternates in an XML sitemap with the required XHTML namespace.' },
  { title: 'Fix duplicate locale warnings', text: 'Check the duplicate locale count before publishing. Each hreflang value should appear once per alternate set. Duplicate `en-us` or repeated region codes can make search engines ignore or distrust the annotations.' },
  { title: 'Deploy reciprocally across all alternates', text: 'Every page in the set should reference itself and all other alternates. If the English page references French and German, the French and German pages should reference English, each other, and themselves too.' },
  { title: 'Validate with Search Console or crawlers', text: 'After deployment, inspect international targeting reports, crawl the pages, or review rendered head output. Look for missing return tags, blocked alternate URLs, non-canonical alternates, noindex pages, and language codes that do not match the page content.' },
];

export const metadata = {
  title: 'Hreflang Tag Generator: International SEO Tags Free',
  description: 'Generate hreflang tags for multilingual and regional SEO. Create HTML alternate link tags or sitemap XML xhtml:link alternates with x-default. Free and instant.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/hreflang-tag-generator/' },
  icons: { icon: '/icons/hreflang-tag-generator.svg', shortcut: '/icons/hreflang-tag-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/hreflang-tag-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Hreflang Tag Generator - HTML Tags and Sitemap XML',
    description: 'Create hreflang alternate link tags or sitemap XML alternates for multilingual and regional pages.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Hreflang Tag Generator by webdevpuneet.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hreflang Tag Generator',
    description: 'Generate hreflang tags for international SEO.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I create hreflang tags for multilingual pages?', acceptedAnswer: { '@type': 'Answer', text: 'Create one hreflang annotation for every equivalent language or regional URL, including a self-reference for the current page. For example, an English page should list itself, the Spanish page, the French page, and any x-default fallback. This generator creates either HTML link tags for the page head or sitemap XML alternates using xhtml:link. Publish the same complete alternate set on every page in the group.' } },
    { '@type': 'Question', name: 'What is x-default in hreflang and should I use it?', acceptedAnswer: { '@type': 'Answer', text: 'x-default identifies the fallback URL when no language or regional version is the best match for a searcher. It is commonly used for a global homepage, country selector, or default English page. You should use it when you have a page that is appropriate for unmatched users. It does not replace language-specific hreflang values; it sits alongside them as the fallback.' } },
    { '@type': 'Question', name: 'Should hreflang tags go in HTML or in an XML sitemap?', acceptedAnswer: { '@type': 'Answer', text: 'Both methods are valid. HTML link tags are simple for small sites where you control the page head template. XML sitemap hreflang is often easier for large sites, ecommerce catalogs, or documentation systems with many localized URLs. Choose one primary implementation method and keep it consistent. Do not let HTML and sitemap annotations disagree, because conflicting hreflang sets are difficult to debug.' } },
    { '@type': 'Question', name: 'Do hreflang pages need reciprocal return tags?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Hreflang annotations should be reciprocal. If page A names page B as an alternate, page B should name page A and every other page in the same alternate set. Missing return tags are one of the most common hreflang errors. Search engines may ignore incomplete sets because they cannot confirm that the pages are intentional equivalents.' } },
    { '@type': 'Question', name: 'Can hreflang point to non-canonical URLs?', acceptedAnswer: { '@type': 'Answer', text: 'Avoid pointing hreflang at non-canonical URLs. Each hreflang URL should normally be indexable, canonical, accessible, and equivalent in content purpose to the other alternates. If an alternate URL redirects, is noindexed, is blocked by robots.txt, or canonicalizes to a different URL, the hreflang signal can fail. Align hreflang URLs with canonical tags and sitemap URLs.' } },
    { '@type': 'Question', name: 'What is the difference between en, en-us, and en-gb hreflang?', acceptedAnswer: { '@type': 'Answer', text: 'en targets English-language users broadly. en-us targets English users in the United States, and en-gb targets English users in the United Kingdom. Use language-only values when the content is not region-specific. Use language-region values when pricing, spelling, shipping, legal copy, currency, or availability differs by country or region.' } },
    { '@type': 'Question', name: 'Should every translated page have a self-referencing hreflang tag?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A complete hreflang set normally includes self-referencing tags. The Spanish page should include an es tag pointing to itself, plus tags for every other language or region in the same set. Self-references make the alternate cluster explicit and reduce ambiguity when search engines process the annotations.' } },
    { '@type': 'Question', name: 'Can I use hreflang for country pages that are not translated?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if the pages are true regional alternates and serve users in different countries, even if the language is similar. For example, en-us and en-gb pages may both be English but differ in currency, shipping, spelling, taxes, or availability. Do not use hreflang just to connect loosely related pages. The pages should satisfy the same search intent for different language or regional audiences.' } },
    { '@type': 'Question', name: 'Why is Google ignoring my hreflang tags?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes include missing return tags, duplicate locale values, non-canonical alternate URLs, blocked pages, noindex tags, redirects, invalid language codes, or content that is not equivalent. Google also treats hreflang as a signal, not a command. Start by crawling the alternate set and confirming that every page returns 200, is indexable, references itself, and references every other page consistently.' } },
    { '@type': 'Question', name: 'Do I need hreflang if I only have one language?', acceptedAnswer: { '@type': 'Answer', text: 'Usually no. Hreflang is for pages that have equivalent versions targeting different languages or regions. A single-language site does not need hreflang unless it has regional variants, such as separate US, UK, Canada, or Australia pages. If all users should see the same page, focus on canonical tags, sitemap coverage, internal linking, and regular metadata instead.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Hreflang Tag Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate HTML hreflang link tags or sitemap XML xhtml:link alternates for multilingual and regional SEO pages.',
  url: 'https://webdevpuneet.com/hreflang-tag-generator/',
  featureList: [
    'Generate HTML hreflang link tags',
    'Generate sitemap XML hreflang alternates',
    'Support language and language-region values',
    'Support x-default fallback URLs',
    'Count duplicate locale entries',
    'Show x-default presence status',
    'Escape HTML and XML attributes safely',
    'Add unlimited locale rows',
    'Copy generated hreflang output',
    'Download HTML or XML hreflang files',
  ],
};

function stripInlineMarkdown(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, '');
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate hreflang tags',
  description: 'Create HTML hreflang tags or sitemap XML alternates for multilingual and regional pages.',
  totalTime: 'PT5M',
  step: howToSteps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: stripInlineMarkdown(step.text) })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Hreflang Tag Generator', item: 'https://webdevpuneet.com/hreflang-tag-generator/' },
  ],
};

const SEO = {
  slug: 'hreflang-tag-generator',
  title: 'Hreflang Tag Generator - International SEO Tags',
  about: {
    title: 'Need Search Engines to Show the Right Language or Country Page?',
    description: `You have equivalent pages for different languages or regions, but Google may show the wrong version if the alternate relationship is unclear. A US visitor might see the UK page, a French page might compete with an English page, or translated documentation might not connect back to the canonical source. Hreflang tags solve that mapping problem by telling search engines which URL belongs to each language or regional audience.\n\nThis Hreflang Tag Generator creates two common implementation formats: HTML \`<link rel="alternate" hreflang="...">\` tags for the page head, and XML sitemap alternates using the required \`xhtml:link\` namespace. Add each locale and URL, include \`x-default\` when you have a global fallback, then copy or download the output.\n\nThe two output modes are built from the same underlying row list, but the sitemap format is structurally more repetitive than most people expect: because each \`<url>\` block must declare its full set of alternates on its own, the generator nests every locale's \`xhtml:link\` entry inside every single \`<url>\` block — five locales means five \`<url>\` blocks, each containing all five \`xhtml:link\` lines, not five lines total. This is exactly what the sitemap spec requires (each URL entry has to be self-describing), and it's the detail people miss when hand-editing sitemap alternates and end up with an incomplete, one-directional set.\n\nDuplicate detection works by lower-casing every locale code and comparing the count of valid rows against the size of a Set built from those lowercased values — so \`en-US\` and \`en-us\` are correctly caught as the same duplicate value even though they're typed differently, which matters since hreflang codes are case-insensitive but easy to enter inconsistently across a large row list. The x-default check does the same lowercase comparison against the literal string \`x-default\`, so the fallback indicator stays accurate regardless of how it was capitalized when typed. Every URL and locale value passed into the output is run through an attribute-escaping step that converts \`&\`, \`"\`, \`<\`, and \`>\` into their entity equivalents, so a URL containing a query-string ampersand can't break the generated HTML or XML.\n\nHreflang works only when the pages form a clean alternate set. Every URL should be canonical, indexable, accessible, and equivalent in search intent. Each page should include a self-reference and reciprocal references to every other alternate. If a page redirects, uses noindex, points to a different canonical URL, or is blocked in robots.txt, the hreflang signal can fail.\n\nEverything runs locally: the row list and generated output are held in component state and downloaded straight from a Blob URL, so your URL map and international page structure are never sent anywhere. Use this tool alongside [Sitemap.xml Generator](/sitemap-generator) when managing alternates in XML, [Meta Tag Generator](/meta-tag-generator) to keep canonical tags aligned, and [Schema Markup Generator](/schema-markup-generator) when localized pages also need structured data for articles, products, FAQs, or local business pages.`,
  },
  features: [
    '**HTML hreflang tag output** - generate alternate link tags for each localized page head',
    '**Sitemap XML output** - create `xhtml:link` alternates with the correct XML namespace',
    '**Language and region support** - use values like `en`, `en-us`, `fr-ca`, or `de`',
    '**x-default support** - add a fallback page for unmatched languages or country selectors',
    '**Duplicate locale counter** - catch repeated hreflang values before publishing',
    '**x-default presence check** - see whether the alternate set includes a fallback URL',
    '**Safe attribute escaping** - escape URLs and locale values for HTML and XML output',
    '**Unlimited locale rows** - add as many language or regional alternates as the page needs',
    '**Copy or download output** - export HTML tags or an XML sitemap file instantly',
    '**Works with [Sitemap.xml Generator](/sitemap-generator)** - keep hreflang XML and canonical discovery aligned',
    '**Pairs with [Meta Tag Generator](/meta-tag-generator)** - match canonical URLs across metadata and alternates',
    '**Runs locally in your browser** - no URL list or international page map is uploaded',
  ],
  howToUse: { type: 'steps', items: howToSteps },
  useCases: [
    { icon: 'GLOBAL', title: 'Map translated landing pages by language', desc: 'Generate hreflang tags for English, Spanish, French, German, or other translated versions of the same page. This helps search engines choose the correct language page instead of treating translations as disconnected duplicates.' },
    { icon: 'WEB', title: 'Separate US, UK, Canada, and Australia pages', desc: 'Use regional values like `en-us`, `en-gb`, `en-ca`, and `en-au` when similar English pages differ by currency, shipping, spelling, legal terms, or offers. Regional hreflang keeps country-specific pages aimed at the right audience.' },
    { icon: 'FLOW', title: 'Build hreflang alternates in an XML sitemap', desc: 'For large international sites, sitemap output can be easier to maintain than editing every page head. Generate the XML alternate blocks here, then review the canonical URL set with [Sitemap.xml Generator](/sitemap-generator).' },
    { icon: 'DOC', title: 'Connect localized documentation pages', desc: 'Documentation sites often translate guides, API references, and support pages by folder or subdomain. Hreflang tags connect equivalent docs so users searching in their language reach the matching localized version.' },
    { icon: 'DELIVERY', title: 'Handle country-specific ecommerce product URLs', desc: 'Product pages may vary by stock, price, shipping region, currency, or legal requirements. Use hreflang to connect true regional alternates while keeping each product URL canonical and indexable.' },
    { icon: 'SAFE', title: 'Audit international SEO implementation mistakes', desc: 'Use the duplicate locale and x-default checks before publishing. The manual row review helps catch wrong regions, repeated hreflang codes, missing fallbacks, staging URLs, and alternates that do not match the canonical page map.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function HreflangTagGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><HreflangTagGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
