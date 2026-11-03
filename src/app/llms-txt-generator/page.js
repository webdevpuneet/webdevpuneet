import LlmsTxtGeneratorTool from '@/components/LlmsTxtGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/llms-txt-generator.png';

const howToSteps = [
  { title: 'Write a concise site summary', text: 'Enter the site name and a short description of what the website provides, who it serves, and what topics it covers. Keep it useful for AI assistants and citation tools rather than turning it into marketing copy.' },
  { title: 'Add sitemap and contact URLs', text: 'Use the canonical sitemap URL, usually `https://example.com/sitemap.xml`, so discovery can connect to your normal crawl map. Add a contact or policy URL when you want publishers, AI systems, or users to find usage guidance.' },
  { title: 'List authoritative core pages', text: 'Add the pages that best explain the site: docs, API references, categories, pricing, product pages, changelogs, tutorials, support pages, or editorial hubs. Use canonical URLs that also appear in your [Sitemap.xml Generator](/sitemap-generator/) output.' },
  { title: 'Add notes for each important page', text: 'Write one short note that explains why each URL matters. Notes help distinguish a product page from a docs page, a category hub from a tutorial, or a canonical resource from a secondary page.' },
  { title: 'Write a usage policy', text: 'Use the policy field to state citation preferences, canonical URL preference, and pages to avoid, such as private, duplicate, parameterized, outdated, or noindex URLs. This complements access rules from [Robots.txt Generator](/robots-txt-generator/) but does not replace them.' },
  { title: 'Review the generated Markdown', text: 'Check the llms.txt preview for broken links, vague notes, duplicate URLs, and pages that should not be cited. The file should be short enough for quick machine and human scanning while still pointing to the most useful resources.' },
  { title: 'Copy or download llms.txt', text: 'Copy the output into your project or download `llms.txt`. Publish it at the website root so it loads at `https://yourdomain.com/llms.txt`, then revisit it whenever important docs, product pages, or canonical URLs change.' },
];

export const metadata = {
  title: 'llms.txt Generator: Create an AI Discovery File for Free',
  description: 'Create an llms.txt file that tells AI assistants and LLM crawlers what your site offers and which pages to cite. Add sections, links and policies. Free tool.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/llms-txt-generator/' },
  icons: { icon: '/icons/llms-txt-generator.svg', shortcut: '/icons/llms-txt-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/llms-txt-generator/',
    siteName: 'webdevpuneet.com',
    title: 'LLMs.txt Generator - Create an AI Discovery File',
    description: 'Generate a concise llms.txt file with site summary, core page links, sitemap discovery, contact URL, and usage policy.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'LLMs.txt Generator by webdevpuneet.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLMs.txt Generator',
    description: 'Generate an AI-readable llms.txt file for your website.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is llms.txt and what is it used for?', acceptedAnswer: { '@type': 'Answer', text: 'llms.txt is an emerging Markdown-style file intended to help AI assistants, agents, and crawlers understand the important pages on a website. It usually contains a site summary, curated links, sitemap discovery, and usage notes. The goal is to point systems toward authoritative canonical resources instead of making them infer everything from navigation, search pages, or noisy URL patterns. It complements traditional SEO files but is not a replacement for them.' } },
    { '@type': 'Question', name: 'How do I create an llms.txt file for my website?', acceptedAnswer: { '@type': 'Answer', text: 'Start with the site name and a concise description, then list the most useful canonical pages with short notes. Add a sitemap URL, contact or policy URL, and usage guidance that explains citation preferences or URLs to avoid. This generator formats those fields into a clean Markdown-style llms.txt draft. Publish the file at the site root, such as https://example.com/llms.txt.' } },
    { '@type': 'Question', name: 'Where should I publish llms.txt?', acceptedAnswer: { '@type': 'Answer', text: 'Publish llms.txt at the root of your domain so it is available at https://yourdomain.com/llms.txt. For static sites and many JavaScript frameworks, that usually means placing it in the public folder. For a CMS, upload it to the public web root or use a plugin or route that serves plain text. After deployment, open the URL directly in a browser to confirm it returns the file instead of an HTML error page.' } },
    { '@type': 'Question', name: 'Is llms.txt the same as robots.txt?', acceptedAnswer: { '@type': 'Answer', text: 'No. robots.txt is a crawler access file that tells compliant bots which paths they may or may not crawl. llms.txt is a contextual guide that points AI systems toward important pages and explains how the site should be understood or cited. Use robots.txt for crawl rules, sitemap.xml for URL discovery, and llms.txt for curated context. They work together but solve different problems.' } },
    { '@type': 'Question', name: 'What pages should I include in llms.txt?', acceptedAnswer: { '@type': 'Answer', text: 'Include high-value canonical pages that explain the site well: documentation, API references, product pages, pricing, changelogs, support pages, category hubs, policies, tutorials, and authoritative articles. Leave out private pages, parameterized URLs, duplicate filters, staging pages, internal search results, and low-value archive pages. A short curated list is more useful than a complete dump of every URL.' } },
    { '@type': 'Question', name: 'Should llms.txt include my sitemap URL?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, including the sitemap URL is useful because it connects the curated AI context file with your canonical crawl map. The sitemap remains the broader URL discovery file, while llms.txt highlights the pages that deserve special attention or citation context. Keep both files aligned: if a core page appears in llms.txt, it should usually also be a canonical, indexable URL in your sitemap.' } },
    { '@type': 'Question', name: 'Can llms.txt stop AI crawlers from using my content?', acceptedAnswer: { '@type': 'Answer', text: 'No. llms.txt is not an access-control mechanism. It can express preferences and guidance, but it does not technically block crawling or usage. For crawler access rules, use robots.txt and server-level controls where appropriate. For legal or licensing restrictions, publish clear policy pages and consult qualified legal guidance. Treat llms.txt as a discovery and context file, not enforcement.' } },
    { '@type': 'Question', name: 'Do I need llms-full.txt as well as llms.txt?', acceptedAnswer: { '@type': 'Answer', text: 'Some sites may choose to maintain a longer companion file, sometimes called llms-full.txt, with more complete documentation or expanded context. Many sites should start with a concise llms.txt first because it is easier to maintain and less likely to become stale. If you add a fuller version, link to it from llms.txt and keep both files aligned with the same canonical URLs and policies.' } },
    { '@type': 'Question', name: 'How often should I update llms.txt?', acceptedAnswer: { '@type': 'Answer', text: 'Update llms.txt whenever important documentation, product pages, category pages, or canonical URLs change. Also review it after migrations, rebrands, pricing changes, product launches, and major content audits. A stale llms.txt file can point assistants toward outdated pages or broken URLs. Treat it like sitemap and metadata maintenance rather than a one-time launch task.' } },
    { '@type': 'Question', name: 'Is llms.txt useful for small websites?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if the site has a few pages that are clearly more authoritative than the rest. A small SaaS site, portfolio, agency site, or documentation hub can use llms.txt to highlight the homepage, product overview, pricing, docs, support, and policies. The smaller the site, the more important it is to keep the file concise. Do not add filler pages just to make the file longer.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LLMs.txt Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate a Markdown-style llms.txt file with site summary, core pages, sitemap URL, contact URL, usage policy, copy, and download.',
  url: 'https://webdevpuneet.com/llms-txt-generator/',
  featureList: [
    'Generate Markdown-style llms.txt output',
    'Add site name and summary',
    'Add sitemap discovery URL',
    'Add contact or policy URL',
    'List important canonical pages',
    'Write notes for each core page',
    'Track missing page notes',
    'Show output character count',
    'Copy generated llms.txt content',
    'Download a ready-to-publish llms.txt file',
  ],
};

function stripInlineMarkdown(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, '');
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to create an llms.txt file',
  description: 'Create a concise AI discovery file with site context, canonical core pages, sitemap discovery, and usage policy notes.',
  totalTime: 'PT5M',
  step: howToSteps.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step.title, text: stripInlineMarkdown(step.text) })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'LLMs.txt Generator', item: 'https://webdevpuneet.com/llms-txt-generator/' },
  ],
};

const SEO = {
  slug: 'llms-txt-generator',
  title: 'LLMs.txt Generator - AI Discovery File Creator',
  about: {
    title: 'Need a Clear AI Context File for Your Website?',
    description: `You have useful documentation, product pages, support content, category hubs, or API references, but AI assistants may not know which URLs are authoritative. A sitemap lists crawlable URLs, and robots.txt gives access guidance, but neither explains which pages best represent your site or how they should be cited. An llms.txt file fills that gap with a short, curated, Markdown-style guide.\n\nThis LLMs.txt Generator creates a practical draft with a site summary, important page list, notes for each URL, sitemap discovery, contact URL, and usage policy. Add only canonical, public, high-value pages: docs, pricing, product overviews, tutorials, API references, changelogs, policy pages, and support hubs. The output is plain text, easy to review, and ready to publish at \`/llms.txt\`.\n\nThe llms.txt convention is still emerging, so the safest file is concise, accurate, and maintainable. It should not duplicate your entire sitemap or promise technical restrictions it cannot enforce. Use it to guide context and citation; use [Robots.txt Generator](/robots-txt-generator/) for crawler access rules and [Sitemap.xml Generator](/sitemap-generator/) for full URL discovery.\n\nFor technical SEO consistency, keep llms.txt aligned with canonical metadata from [Meta Tag Generator](/meta-tag-generator/), structured data from [Schema Markup Generator](/schema-markup-generator/), and your current sitemap. Update it after migrations, product launches, documentation changes, and major URL cleanup so AI systems do not keep seeing stale or secondary pages as authoritative.\n\nThe generator follows the emerging llms.txt convention structurally, not just in spirit: the output starts with an \`# H1\` site name, a \`>\` blockquote one-line summary, then an \`## Core pages\` section rendering each entry as a standard Markdown link followed by a colon and its note — \`- [Title](https://example.com/page/): why it matters\` — so the file is both human-readable in a text editor and trivially parseable by a Markdown-aware crawler. A closing \`## Discovery\` section lists your sitemap URL, an optional contact URL, a fixed "preferred format" line, and your usage policy text, with blank optional fields (like an empty contact URL) automatically omitted from the output rather than left as dangling empty lines. Only rows with both a title and a URL filled in count toward the page list — a live counter tracks how many of those valid rows are still missing a note, since an unexplained link is far less useful to a citing model than one with a short reason attached, and a running character count helps you judge whether the file is still short enough to be skimmed at a glance.`,
  },
  features: [
    '**Markdown-style llms.txt output** - generate a readable AI discovery file for your site root',
    '**Site name and summary fields** - describe what your website provides in concise context',
    '**Sitemap discovery field** - point assistants toward the canonical URL map for the site',
    '**Contact URL field** - include a policy, contact, or licensing page when relevant',
    '**Usage policy field** - explain canonical URL preference and pages that should not be cited',
    '**Important page rows** - list core docs, products, categories, APIs, and support pages',
    '**Per-page notes** - add short descriptions that explain why each URL matters',
    '**Missing-note counter** - catch important page rows that need more context',
    '**Character count** - keep the file concise enough to be scanned quickly',
    '**Copy or download llms.txt** - publish the generated text at your site root',
    '**Works with [Sitemap.xml Generator](/sitemap-generator/)** - keep curated links aligned with crawl discovery',
    '**Complements [Robots.txt Generator](/robots-txt-generator/)** - separate AI context from crawler access rules',
  ],
  howToUse: { type: 'steps', items: howToSteps },
  useCases: [
    { icon: 'DOC', title: 'Create llms.txt for a documentation site', desc: 'List getting-started guides, API references, changelogs, examples, and conceptual docs so assistants can find the pages that best explain the product. Short notes help distinguish beginner guides from detailed reference material.' },
    { icon: 'WEB', title: 'Expose core pages for a SaaS website', desc: 'Point AI systems toward product overview, pricing, security, docs, changelog, support, and policy pages. This gives assistants a cleaner map than relying on navigation labels or every URL in a sitemap.' },
    { icon: 'FLOW', title: 'Connect AI context with sitemap discovery', desc: 'Include the canonical sitemap URL and keep important pages aligned with your [Sitemap.xml Generator](/sitemap-generator/) output. The sitemap handles broad discovery, while llms.txt highlights the pages that carry the best context.' },
    { icon: 'SAFE', title: 'State citation and URL preference guidance', desc: 'Use the policy section to prefer canonical URLs and discourage private, duplicate, parameterized, outdated, or noindex pages. This is guidance, not enforcement, so pair it with robots.txt and site policies where needed.' },
    { icon: 'CHART', title: 'Prioritize high-value pages after a content audit', desc: 'After cleaning up a site, add only the strongest resources to llms.txt. A concise file with authoritative pages is more useful than a long list that repeats archives, tag pages, and thin content.' },
    { icon: 'SYNC', title: 'Maintain AI discovery during migrations', desc: 'When URLs change, update llms.txt alongside canonical tags, redirects, sitemaps, and structured data. This keeps AI-facing context current after a redesign, docs restructure, product launch, or domain move.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function LlmsTxtGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><LlmsTxtGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
