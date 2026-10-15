import SitemapGeneratorTool from '@/components/SitemapGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/sitemap-generator.png';

const howToSteps = [
  {
    title: 'Enter your canonical base URL',
    text: 'Type the preferred HTTPS version of your domain, such as `https://example.com`, in the Base URL field. This matters when you paste relative paths because the tool turns `/blog/` into a complete `<loc>` URL. Use the same canonical domain you use in your [Meta Tag Generator](/meta-tag-generator) canonical tags so the sitemap, page metadata, and Search Console property all agree.',
  },
  {
    title: 'Paste one URL or path per line',
    text: 'Add the homepage, category pages, important landing pages, product pages, documentation pages, and blog posts you want indexed. You can paste absolute URLs or short paths like `/pricing/`; blank lines are ignored. Leave out URLs with tracking parameters, session IDs, redirects, noindex tags, checkout pages, internal search pages, and duplicate filter pages.',
  },
  {
    title: 'Use Sample or Clear to manage the list',
    text: 'Click Sample if you want to see the expected one-per-line format before replacing it with your own URLs. Click Clear when you need a clean editor for a new sitemap.xml file. The URL counter in the header updates as you type, which helps you catch accidental blank lines or missing entries before downloading the XML.',
  },
  {
    title: 'Set an accurate lastmod date',
    text: 'Choose the last meaningful content update date in `YYYY-MM-DD` format. For a new site launch, today is usually fine. For an existing website, use the real publish or update date for the pages you are listing; changing every URL to today when nothing changed can make search engines trust your lastmod signal less over time.',
  },
  {
    title: 'Choose changefreq and priority',
    text: 'Select a change frequency that matches the content type: daily for frequently updated listings, weekly for active blogs, monthly for stable service pages, and yearly for evergreen pages. Set priority as a relative site-level hint, not a ranking lever. A homepage might use `1.0`, main categories `0.8`, and individual posts or utility pages `0.6` to `0.7`.',
  },
  {
    title: 'Review the generated sitemap XML',
    text: 'Read the output panel before copying. Each `<url>` block should include a valid absolute `<loc>`, and optional `<lastmod>`, `<changefreq>`, and `<priority>` fields should match the values you chose. Confirm there are no doubled domains, staging URLs, localhost URLs, or encoded tracking parameters that would confuse Google Search Console.',
  },
  {
    title: 'Copy or download sitemap.xml',
    text: 'Use Copy when you want to paste the XML into a CMS, code editor, or deployment file. Use Download to save a ready-to-upload `sitemap.xml` file. For static frameworks such as Next.js export, Astro, Hugo, Eleventy, or plain HTML, deploy it at the site root or in the public folder that maps to `https://yourdomain.com/sitemap.xml`.',
  },
  {
    title: 'Submit and connect it to robots.txt',
    text: 'After deployment, open the sitemap URL in a browser and confirm it loads as XML. Submit that URL in Google Search Console under Sitemaps, then reference it in robots.txt with `Sitemap: https://yourdomain.com/sitemap.xml`. The [Robots.txt Generator](/robots-txt-generator) can create that companion file with the sitemap directive included.',
  },
];

export const metadata = {
  title: 'Sitemap.xml Generator: Create an XML Sitemap Online Free',
  description: 'Free XML sitemap generator for SEO. Paste URLs or paths, set lastmod, changefreq and priority, then copy or download a valid sitemap.xml file in seconds.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/sitemap-generator/' },
  icons: { icon: '/icons/sitemap-generator.svg', shortcut: '/icons/sitemap-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/sitemap-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Sitemap.xml Generator - Create XML Sitemap for SEO',
    description: 'Paste URLs or paths, set lastmod, changefreq, and priority, then copy or download a valid sitemap.xml file for Google Search Console.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Sitemap.xml Generator by webdevpuneet.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitemap.xml Generator',
    description: 'Generate a valid sitemap.xml file from URLs or paths.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I create a sitemap.xml file for my website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'List the canonical URLs you want search engines to discover, wrap each URL in the standard sitemap XML structure, and save the file as sitemap.xml at the root of your site. This generator handles the XML structure for you: paste one URL or path per line, add optional lastmod, changefreq, and priority values, then copy or download the file. After deployment, the file should be available at https://yourdomain.com/sitemap.xml.',
      },
    },
    {
      '@type': 'Question',
      name: 'What URLs should I include in sitemap.xml?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Include only canonical, public, indexable pages: your homepage, service pages, product pages, category pages, blog posts, documentation pages, and important landing pages. Do not include noindex pages, redirected URLs, staging URLs, login pages, cart or checkout pages, internal search results, duplicate filter URLs, or URLs with tracking parameters like ?utm_source=. A sitemap should be a clean crawl list, not a dump of every URL your site can produce.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate a sitemap from a list of URLs instead of crawling my site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A URL-list sitemap generator is useful when you already know the pages that matter, especially for small business sites, static sites, portfolios, docs sites, and launch checklists. It also avoids the noise that crawler-based tools can collect from filters, query strings, redirects, and blocked paths. Paste the final canonical URLs here and the tool creates a simple XML sitemap without needing access to your server or CMS.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do lastmod, changefreq, and priority mean in sitemap XML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'lastmod is the date a page was last meaningfully changed, using YYYY-MM-DD format. changefreq is a hint about how often the page usually changes, such as daily, weekly, monthly, or yearly. priority is a relative value from 0.0 to 1.0 that compares URLs within your own site; it does not improve search rankings. In practice, accurate lastmod dates are the most useful of the three because they help crawlers notice recently updated content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I put every page in my sitemap.xml file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A sitemap should contain the pages you want discovered and indexed, not every URL that exists. Excluding low-value, duplicate, private, or blocked pages makes the sitemap easier to audit and keeps crawl signals clean. If a page should not appear in Google results, it usually should not be in the sitemap. For large sites, split the sitemap by content type, such as posts, products, categories, or docs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where should I upload sitemap.xml on my website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload sitemap.xml to the root of your domain so it loads at https://yourdomain.com/sitemap.xml. In a Next.js, Astro, Vite, or static export project, that usually means placing it in the public folder. In WordPress, most SEO plugins generate it automatically, but a manual file would go in the public web root. After upload, open the URL in a browser to confirm it returns XML instead of a 404, redirect loop, or HTML error page.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I submit my sitemap to Google Search Console?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open Google Search Console for the correct property, go to Sitemaps, enter the sitemap path or full URL, and click Submit. Google will show whether the file was fetched successfully and how many URLs were discovered. Submission does not guarantee indexing, but it gives Google a direct crawl source. If URLs are discovered but not indexed, check page quality, canonical tags, robots rules, noindex tags, redirects, and server response codes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I add my sitemap URL to robots.txt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Add a line like Sitemap: https://yourdomain.com/sitemap.xml to robots.txt so compliant crawlers can discover the sitemap automatically. This line is separate from Allow and Disallow rules and can appear anywhere in the file. If you maintain multiple sitemap files, add one Sitemap line for each. Use the Robots.txt Generator if you want to create both the crawl rules and sitemap directive together.',
      },
    },
    {
      '@type': 'Question',
      name: 'How large can one sitemap.xml file be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single sitemap can contain up to 50,000 URLs and must be no larger than 50 MB uncompressed. Small and medium sites usually fit comfortably in one sitemap.xml file. Large publishers, ecommerce stores, and documentation platforms often use multiple sitemap files plus a sitemap index. If your site is near the limit, split by content type or section so each file stays easier to generate, validate, and troubleshoot.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is Google not indexing pages that are in my sitemap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A sitemap helps Google discover URLs, but it does not force indexing. Google may skip pages because of thin content, duplicate content, weak internal links, canonical conflicts, noindex tags, blocked robots.txt paths, redirects, 404 errors, or server problems. Search Console coverage reports are the best place to diagnose the reason. Treat the sitemap as one part of technical SEO, alongside clean metadata, internal linking, schema markup, and crawlable page content.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sitemap.xml Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free XML sitemap generator. Paste URLs or relative paths, configure lastmod, changefreq, and priority, then copy or download a valid sitemap.xml file instantly.',
  url: 'https://webdevpuneet.com/sitemap-generator/',
  featureList: [
    'Generate sitemap.xml from full URLs or relative paths',
    'Resolve relative paths against a canonical base URL',
    'Set lastmod dates for sitemap entries',
    'Choose changefreq values for crawler hints',
    'Set priority values from 0.0 to 1.0',
    'Escape XML characters in generated URLs',
    'Preview sitemap XML before deployment',
    'Copy generated XML to clipboard',
    'Download a ready-to-upload sitemap.xml file',
    'Use sample URLs for quick formatting reference',
  ],
};

function stripInlineMarkdown(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*]/g, '');
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to create a sitemap.xml file from a URL list',
  description: 'Create a valid XML sitemap by entering a base URL, pasting canonical URLs or paths, setting sitemap metadata, and downloading sitemap.xml for deployment.',
  totalTime: 'PT5M',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.title,
    text: stripInlineMarkdown(step.text),
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Sitemap.xml Generator', item: 'https://webdevpuneet.com/sitemap-generator/' },
  ],
};

const SEO = {
  slug: 'sitemap-generator',
  title: 'Sitemap.xml Generator - Create XML Sitemap for SEO',
  about: {
    title: 'Need Google to Find Every Important URL on Your Site?',
    description: `You have pages that matter for search - a new service page, a deep documentation article, a product category, or a landing page that is not linked from the homepage yet. Waiting for search engines to discover those URLs through normal internal links can take longer than you want, and crawler tools often pull in noisy URLs you would never want indexed. A clean sitemap.xml file gives Google, Bing, and other crawlers a direct list of the canonical pages you want discovered.\n\nThis XML Sitemap Generator creates a valid sitemap from the exact URLs you provide. Enter your base URL, paste one full URL or relative path per line, set the optional \`lastmod\`, \`changefreq\`, and \`priority\` fields, then copy or download a ready-to-upload \`sitemap.xml\` file. The tool resolves paths against your canonical domain and escapes XML characters automatically, so URLs containing query separators or special characters do not break the output.\n\nThe best sitemap is selective. Include public, canonical, indexable pages: homepage, pricing, services, products, categories, blog posts, docs, changelog pages, and evergreen landing pages. Leave out noindex pages, redirect URLs, staging links, login areas, checkout flows, internal search results, duplicate filters, and tracking URLs. If a page should not appear in Google results, it should usually not appear in your sitemap either.\n\nAfter generating the XML, deploy it at \`https://yourdomain.com/sitemap.xml\`, submit it in Google Search Console, and reference it from robots.txt with a \`Sitemap:\` directive. Use [Robots.txt Generator](/robots-txt-generator) for crawl rules, [Meta Tag Generator](/meta-tag-generator) to align canonical URLs, and [Schema Markup Generator](/schema-markup-generator) when the pages in your sitemap also need structured data.\n\nEach line in the input can carry its own metadata using a pipe-delimited format — \`/pricing/ | 2026-01-15 | weekly | 0.9\` overrides the shared defaults for that single URL, so a handful of frequently updated pages can have a tighter lastmod and higher priority without switching modes. Priority values are automatically clamped into the valid 0.0–1.0 range, and every URL is checked for common mistakes: the diagnostics panel flags duplicate URLs, non-absolute locations, malformed lastmod dates, and out-of-spec changefreq values before you download the file. An output-mode toggle can also render the same list as a ready-to-use \`app/sitemap.js\` file matching the Next.js App Router \`MetadataRoute.Sitemap\` shape. You can paste existing sitemap XML back into the input, too — an **Import XML** action parses it with the browser's \`DOMParser\`, pulls out every \`<loc>\`, \`<lastmod>\`, \`<changefreq>\`, and \`<priority>\` value, and reconstructs the pipe-delimited row format so you can edit an existing sitemap instead of rebuilding it from scratch.`,
  },
  features: [
    '**Generate sitemap.xml from a URL list** - paste canonical URLs or paths instead of crawling noisy duplicates',
    '**Accepts full URLs and relative paths** - resolve `/blog/` against your base URL automatically',
    '**Base URL normalization** - strips trailing slashes from the domain before joining relative paths',
    '**lastmod date field** - add accurate update dates so crawlers can notice changed content faster',
    '**changefreq selector** - choose always, hourly, daily, weekly, monthly, yearly, or never',
    '**Priority value control** - set relative crawl importance from `0.0` to `1.0` for all entries',
    '**XML-safe URL escaping** - converts characters like `&` into valid sitemap XML entities',
    '**Live URL counter** - check how many sitemap entries will be generated before export',
    '**Sample and Clear actions** - load example paths or reset the editor for a new sitemap',
    '**Preview before deployment** - inspect every `<url>` block before copying or downloading',
    '**Copy or download output** - copy XML to your editor or download `sitemap.xml` directly',
    '**Works with [Robots.txt Generator](/robots-txt-generator)** - add the matching `Sitemap:` directive to your crawl rules',
  ],
  howToUse: {
    type: 'steps',
    items: howToSteps,
  },
  useCases: [
    {
      icon: 'GLOBAL',
      title: 'Create sitemap.xml for a new website launch',
      desc: 'Paste the final homepage, service page, blog, and landing page URLs before launch day, then download sitemap.xml for deployment. Submitting the sitemap in Search Console gives Google a direct discovery path while your new site still has few inbound links.',
    },
    {
      icon: 'CODE',
      title: 'Generate a sitemap for a static site or Jamstack app',
      desc: 'Static HTML, Astro, Hugo, Eleventy, and exported Next.js projects do not always have a CMS plugin generating SEO files. Build the sitemap from your route list, place it in the public or output root, and pair it with clean canonical tags from the [Meta Tag Generator](/meta-tag-generator).',
    },
    {
      icon: 'DOC',
      title: 'Submit documentation and developer guide URLs',
      desc: 'Docs sites often bury API reference pages, changelogs, tutorials, and versioned guides several clicks deep. Paste those canonical docs URLs into the generator so search engines can discover support content that might not receive strong internal links from marketing pages.',
    },
    {
      icon: 'DELIVERY',
      title: 'Build a clean ecommerce sitemap from product URLs',
      desc: 'Add canonical product, collection, and category URLs while excluding cart, checkout, account, search, and filtered sort pages. This keeps crawl focus on pages that can rank and avoids sending duplicate parameter URLs to Google Search Console.',
    },
    {
      icon: 'SAFE',
      title: 'Audit indexable URLs before Search Console submission',
      desc: 'Manually pasting the URL list forces a useful technical SEO review. You can spot staging URLs, redirect targets, noindex pages, outdated slugs, and tracking parameters before they become part of the XML sitemap crawlers use for discovery.',
    },
    {
      icon: 'FLOW',
      title: 'Connect sitemap, robots.txt, metadata, and schema work',
      desc: 'A sitemap lists the pages to crawl, robots.txt exposes the sitemap location, metadata confirms canonical URLs, and schema clarifies page meaning. Use this generator alongside [Robots.txt Generator](/robots-txt-generator), [Hreflang Tag Generator](/hreflang-tag-generator), and [Schema Markup Generator](/schema-markup-generator) for a complete technical SEO setup.',
    },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function SitemapGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SitemapGeneratorTool /></div>
      <IndexOnly><AdSlot /><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
