import SchemaMarkupGeneratorTool from '@/components/SchemaMarkupGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/schema-markup-generator.png';

const howToSteps = [
  { title: 'Choose the schema type that matches the visible page', text: 'Select WebSite for a homepage, Article for editorial content, Product for an ecommerce detail page, FAQPage for visible Q&A content, or LocalBusiness for a location page. Do not add a schema type just because you want a rich result; it should describe the real page content.' },
  { title: 'Enter the canonical URL and primary page details', text: 'Add the page name, headline, canonical HTTPS URL, description, image, author, organization, price, address, phone, or FAQ rows depending on the schema type. Keep these values aligned with your [Meta Tag Generator](/meta-tag-generator) title, canonical URL, and Open Graph image.' },
  { title: 'Fill type-specific fields', text: 'For Product schema, add price, currency, SKU, and rating only when that information is visible and accurate. For LocalBusiness schema, add a real address and phone number. For FAQPage schema, enter one question and answer per line using the `question|answer` format.' },
  { title: 'Review warnings before copying', text: 'The tool flags common issues such as non-HTTPS URLs, short descriptions, missing FAQ rows, or incomplete product offer fields. Fix warnings before publishing so the JSON-LD is a useful production starter rather than placeholder structured data.' },
  { title: 'Choose script tag or raw JSON-LD output', text: 'Use the full `<script type="application/ld+json">` output for most websites. Use raw JSON-LD when your framework, CMS, or component already wraps structured data in a script tag for you.' },
  { title: 'Paste and validate after deployment', text: 'Add the generated output to the relevant page, deploy it, then test the live URL with Google Rich Results Test or Schema.org Validator. Also confirm the visible page content matches the structured data to avoid misleading markup.' },
  { title: 'Keep schema in sync with page changes', text: 'Update JSON-LD when prices, availability, ratings, author names, publish dates, phone numbers, or FAQ answers change. Schema markup is not a one-time task; it should track the source content just like metadata and sitemap entries.' },
];

export const metadata = {
  title: 'Schema Markup Generator: Free JSON-LD Structured Data',
  description: 'Generate JSON-LD schema markup for WebSite, Article, Product, FAQPage, LocalBusiness, HowTo and more with guided forms. Copy-paste ready. Free, no sign-up.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/schema-markup-generator/' },
  icons: { icon: '/icons/schema-markup-generator.svg', shortcut: '/icons/schema-markup-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/schema-markup-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Schema Markup Generator - JSON-LD Structured Data',
    description: 'Create JSON-LD schema for WebSite, Article, Product, FAQPage, LocalBusiness, BreadcrumbList, Organization, Person, VideoObject, HowTo, and SoftwareApplication pages.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Schema Markup Generator by webdevpuneet.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schema Markup Generator',
    description: 'Generate JSON-LD structured data for common page types.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I generate JSON-LD schema markup for a page?', acceptedAnswer: { '@type': 'Answer', text: 'Choose the schema type that matches the page, fill in the required fields, copy the JSON-LD script, and paste it into the page head or body. This generator supports WebSite, Article, Product, FAQPage, and LocalBusiness structured data. After deployment, test the live URL with Google Rich Results Test or Schema.org Validator. The structured data should describe content that is actually visible or true on the page.' } },
    { '@type': 'Question', name: 'Where should I paste JSON-LD schema markup?', acceptedAnswer: { '@type': 'Answer', text: 'JSON-LD can be placed in the head or body of the HTML page inside a script tag with type application/ld+json. Many frameworks let you render that script from the page component or layout. The exact location is less important than making sure the JSON is valid and present in the rendered HTML. If your framework already wraps JSON-LD, copy the raw JSON output instead of the full script tag.' } },
    { '@type': 'Question', name: 'Which schema type should I use for my page?', acceptedAnswer: { '@type': 'Answer', text: 'Use WebSite for a homepage or site-level entity, Article for blog posts and editorial pages, Product for ecommerce product detail pages, FAQPage for visible question-and-answer content, LocalBusiness for real business location pages, BreadcrumbList for navigation trails, Organization or Person for entity pages, VideoObject for video pages, HowTo for step-based instructions, and SoftwareApplication for tools or apps. The schema type should match the primary purpose of the page. Do not add schema for content that is not visible or true on the page.' } },
    { '@type': 'Question', name: 'Does schema markup guarantee Google rich results?', acceptedAnswer: { '@type': 'Answer', text: 'No. Structured data can make a page eligible for rich results, but Google decides whether to show them based on quality, relevance, policy compliance, search query, device, and visible page content. Invalid or misleading markup can be ignored. Treat schema as clarity for search engines, not a guaranteed display feature. Always validate after publishing.' } },
    { '@type': 'Question', name: 'Can I add FAQ schema if the FAQs are hidden or not on the page?', acceptedAnswer: { '@type': 'Answer', text: 'No. FAQPage schema should describe questions and answers that users can see on the page. Adding hidden, fake, or unrelated FAQ markup is against rich result guidelines and can cause the structured data to be ignored. If you want FAQ schema, publish useful visible FAQ content first, then generate JSON-LD that matches it exactly.' } },
    { '@type': 'Question', name: 'What fields are important for Product schema?', acceptedAnswer: { '@type': 'Answer', text: 'Product schema usually needs a product name, canonical URL, description, image, offer details, price, currency, availability, and optionally SKU, rating value, and review count. Only include ratings and reviews when they are real and visible or supported by trustworthy review data. Price and availability should stay current. Outdated Product schema can create misleading search snippets and validation warnings.' } },
    { '@type': 'Question', name: 'What is the difference between JSON-LD and microdata?', acceptedAnswer: { '@type': 'Answer', text: 'JSON-LD is structured data written as a standalone JSON script, while microdata is embedded directly in HTML attributes around page content. Google generally recommends JSON-LD because it is easier to maintain and less invasive in templates. This generator outputs JSON-LD so you can add or update structured data without rewriting visible HTML markup.' } },
    { '@type': 'Question', name: 'How do I test if my schema markup is valid?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the live page URL into Google Rich Results Test to check Google-supported rich result eligibility, and use Schema.org Validator for broader structured data validation. Testing raw code is useful during development, but testing the live URL catches rendering, deployment, and script injection issues. Fix errors first, then review warnings and recommended fields.' } },
    { '@type': 'Question', name: 'Should schema markup match my meta title and description?', acceptedAnswer: { '@type': 'Answer', text: 'It should be consistent, though it does not need to be identical word for word. The schema name, headline, description, image, and canonical URL should describe the same page represented by your title tag, meta description, Open Graph tags, and canonical link. Inconsistent metadata and structured data can make the page harder for search engines to interpret.' } },
    { '@type': 'Question', name: 'Can I use more than one schema type on a page?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, when the page legitimately contains multiple entities or content types. A product page might include Product schema and BreadcrumbList schema, while an article page might include Article and FAQPage if the FAQs are visible. Keep each schema accurate and avoid adding markup for things that are not present. When in doubt, start with the primary page type and add supporting schema only when it adds real context.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Schema Markup Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate JSON-LD schema markup for common SEO page types with raw JSON, script tag output, import, diagnostics, and export pack support.',
  url: 'https://webdevpuneet.com/schema-markup-generator/',
  featureList: [
    'Generate WebSite JSON-LD schema',
    'Generate Article JSON-LD schema',
    'Generate Product JSON-LD schema',
    'Generate FAQPage JSON-LD schema',
    'Generate LocalBusiness JSON-LD schema',
    'Generate BreadcrumbList JSON-LD schema',
    'Generate Organization and Person JSON-LD schema',
    'Generate VideoObject JSON-LD schema',
    'Generate HowTo JSON-LD schema',
    'Generate SoftwareApplication JSON-LD schema',
    'Remove empty fields from output',
    'Copy raw JSON-LD or script tag output',
    'Warn about short descriptions and non-HTTPS URLs',
    'Download schema.html or schema.jsonld files',
    'Run fully in the browser without upload',
  ],
};

function stripInlineMarkdown(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, '');
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate JSON-LD schema markup',
  description: 'Create structured data for WebSite, Article, Product, FAQPage, or LocalBusiness pages and validate it after deployment.',
  totalTime: 'PT5M',
  step: howToSteps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: stripInlineMarkdown(step.text) })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Schema Markup Generator', item: 'https://webdevpuneet.com/schema-markup-generator/' },
  ],
};

const SEO = {
  slug: 'schema-markup-generator',
  title: 'Schema Markup Generator - JSON-LD Structured Data',
  about: {
    title: 'Need Valid JSON-LD Without Piecing Together Schema Examples?',
    description: `You published a page and want Google to understand whether it is an article, product, FAQ, local business, video, software tool, organization, person, breadcrumb trail, how-to guide, or site-level entity. The hard part is not just writing JSON; it is choosing the right Schema.org type, filling the right fields, avoiding empty placeholders, and making sure the structured data matches the visible page. A small syntax error or misleading property can make the markup invalid or ignored.\n\nThis Schema Markup Generator creates clean JSON-LD for WebSite, Article, Product, FAQPage, LocalBusiness, BreadcrumbList, Organization, Person, VideoObject, HowTo, and SoftwareApplication pages. Fill in the page URL, name, description, image, author, offer, address, phone, FAQ rows, breadcrumb rows, or how-to steps, then copy either raw JSON-LD or a ready-to-paste \`<script type="application/ld+json">\` block. Empty fields are removed automatically, and warnings flag common issues like non-HTTPS URLs, incomplete ratings, and thin descriptions.\n\nStructured data works best when it reinforces the real content on the page. FAQ answers should be visible to users, Product ratings should be real, LocalBusiness details should be accurate, VideoObject thumbnails should exist, and Article dates should match the published content. Schema markup can make a page eligible for rich results, but it does not guarantee them.\n\nUse this alongside [Meta Tag Generator](/meta-tag-generator) for title, canonical, Open Graph, and Twitter tags; [Sitemap.xml Generator](/sitemap-generator) for crawl discovery; and [Hreflang Tag Generator](/hreflang-tag-generator) when the same structured content has language or regional alternates.\n\nUnder the hood, every generated object passes through a recursive compaction step that strips empty strings, null, undefined, and empty arrays from arrays and nested objects alike — so switching schema types never leaves a stray blank \`sku\` or an empty \`sameAs: []\` behind. Row-based fields (FAQ question|answer pairs, breadcrumb name|url pairs, HowTo title|text steps) all share one pipe-delimited line parser that splits on the first \`|\`, trims both sides, and silently discards any line missing either half rather than emitting a malformed entity. Numeric-looking fields like price and rating are coerced to real JSON numbers only when they parse cleanly, otherwise kept as strings so a SKU with letters isn't corrupted. **Import Clipboard** accepts a raw JSON-LD object or a full \`<script type="application/ld+json">\` block — it strips the tags, parses the JSON, and pre-fills type, name, URL, description, and image from whatever it finds, so you can pull in an existing page's schema and edit it visually.`,
  },
  features: [
    '**WebSite schema output** - generate site-level JSON-LD with optional SearchAction support',
    '**Article schema output** - create headline, image, author, publisher, and date fields',
    '**Product schema output** - include price, currency, availability, SKU, and optional ratings',
    '**FAQPage schema rows** - convert visible `question|answer` lines into valid Q&A markup',
    '**LocalBusiness schema output** - add business name, URL, image, phone, address, and profiles',
    '**BreadcrumbList, VideoObject, and HowTo schema** - cover navigation, media, and step content',
    '**Organization, Person, and SoftwareApplication schema** - describe entities, profiles, and tools',
    '**Raw JSON or script tag mode** - choose the export format your framework needs',
    '**Empty-field cleanup** - remove blank values so output stays compact and valid',
    '**Built-in warnings** - catch short descriptions, missing FAQ rows, and non-HTTPS URLs',
    '**Import existing JSON-LD from clipboard** - load a current script block and revise it visually',
    '**Copy, download, or export pack** - export `schema.html`, raw JSON-LD, and implementation notes',
    '**Pairs with [Meta Tag Generator](/meta-tag-generator)** - keep metadata and structured data consistent',
    '**Works with [Sitemap.xml Generator](/sitemap-generator)** - align schema URLs with crawl discovery',
    '**Browser-only generation** - structured data drafts are not uploaded to a server',
  ],
  howToUse: { type: 'steps', items: howToSteps },
  useCases: [
    { icon: 'WEB', title: 'Add WebSite schema to a homepage', desc: 'Generate WebSite JSON-LD with site name, canonical URL, description, and optional SearchAction when the site has a real search URL. This helps define the site entity and complements homepage metadata from [Meta Tag Generator](/meta-tag-generator).' },
    { icon: 'DOC', title: 'Mark up an article or blog post', desc: 'Create Article structured data with headline, author, publisher, image, publish date, and modified date. Use it for tutorials, blog posts, guides, changelog posts, and editorial pages where the article is the main content.' },
    { icon: 'DELIVERY', title: 'Create Product schema for ecommerce pages', desc: 'Add product name, image, description, price, currency, availability, SKU, and optional aggregate rating values. Keep this markup synchronized with visible product information so search engines do not receive stale offer data.' },
    { icon: 'FORM', title: 'Build FAQPage markup from visible questions', desc: 'Paste one question and answer per line to generate FAQPage JSON-LD. Use it only when those same questions and answers are visible on the page, then validate the live URL after deployment.' },
    { icon: 'GLOBAL', title: 'Describe a local business location page', desc: 'Generate LocalBusiness structured data with address, phone, URL, image, and sameAs profile links. This is useful for service businesses, stores, offices, clinics, agencies, and other pages tied to a physical location.' },
    { icon: 'SAFE', title: 'Prepare structured data before launch QA', desc: 'Use the warnings and preview to catch incomplete fields before release. Then compare the output with canonical URLs, sitemap entries, and hreflang alternates from [Hreflang Tag Generator](/hreflang-tag-generator) if the page is localized.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function SchemaMarkupGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SchemaMarkupGeneratorTool /></div>
      <IndexOnly><AdSlot /><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
