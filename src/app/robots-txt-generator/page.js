import RobotsTxtGeneratorTool from '@/components/RobotsTxtGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/robots-txt-generator.png';

export const metadata = {
  title: 'Robots.txt Generator: Create Crawl Rules for SEO Free',
  description: 'Free robots.txt generator. Add Allow, Disallow, Crawl-delay and Sitemap rules, or start from presets for public sites, staging and stores. Copy or download.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/robots-txt-generator/' },
  icons: { icon: '/icons/robots-txt-generator.svg', shortcut: '/icons/robots-txt-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/robots-txt-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Robots.txt Generator — Create Crawl Rules for SEO',
    description: 'Free robots.txt generator. Add Allow, Disallow, Crawl-delay, Sitemap, and Host directives. Presets for public sites, staging, and ecommerce. Copy or download instantly.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Robots.txt Generator by webdevpuneet.com' }],
  },
  twitter: { card: 'summary_large_image', title: 'Robots.txt Generator', description: 'Generate a clean robots.txt file with sitemap and crawl rules.', images: [OG_IMAGE] },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a robots.txt file and why do I need one?', acceptedAnswer: { '@type': 'Answer', text: 'A robots.txt file is a plain text file placed at the root of your website (e.g. https://example.com/robots.txt) that tells web crawlers which paths they may or may not visit. Search engines like Googlebot check it before crawling. You need one to protect crawl budget — if Google spends crawl quota on admin panels, checkout flows, duplicate pages, or internal search results, it may not reach your important content as frequently. A well-configured robots.txt directs crawlers to the pages that matter and away from the ones that don\'t.' } },
    { '@type': 'Question', name: 'What is the difference between Disallow and noindex in robots.txt?', acceptedAnswer: { '@type': 'Answer', text: 'Disallow in robots.txt blocks a crawler from visiting a URL — the page is never crawled. noindex is an HTML meta tag or HTTP header that tells a crawler "visit the page but don\'t include it in search results." The critical mistake to avoid: if you Disallow a URL, Googlebot cannot see the noindex tag on it, so the page may still appear in search results if it is linked from elsewhere. To fully remove a page from Google, add noindex to the page and keep it crawlable (remove the Disallow rule). Only use Disallow to save crawl budget on content you don\'t care about indexing.' } },
    { '@type': 'Question', name: 'Where do I upload the robots.txt file?', acceptedAnswer: { '@type': 'Answer', text: 'Upload robots.txt to the root directory of your domain — it must be accessible at https://yourdomain.com/robots.txt exactly. For WordPress, place it in the public_html folder. For Next.js static exports, put it in the public/ folder. For Apache/Nginx, place it in the web root (usually /var/www/html/). Subdomain sites need their own robots.txt at the subdomain root. You can verify it is accessible by opening the URL directly in your browser.' } },
    { '@type': 'Question', name: 'What paths should I block in robots.txt for an ecommerce site?', acceptedAnswer: { '@type': 'Answer', text: 'Ecommerce sites typically block: /cart/ (session-specific, no SEO value), /checkout/ (private), /account/ and /login/ (private user paths), /search (or ?q= query strings that generate duplicate pages), /wishlist/, /compare/, and any /admin/ paths. Keep /products/, /categories/, /collections/, /blog/, and your canonical product pages open. Blocking paginated or filtered URLs (/products?sort=price or /category/page/2/) is common but requires care — only block filters that create true duplicates, not URLs with unique content.' } },
    { '@type': 'Question', name: 'Should robots.txt include a Sitemap directive?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, always. The Sitemap directive tells search engines exactly where to find your XML sitemap without waiting for them to discover it through other means. Add a line like: Sitemap: https://example.com/sitemap.xml — this applies to all crawlers, not just the User-agent block it appears near. If you have multiple sitemaps (images, videos, news), add a separate Sitemap line for each. This is especially useful for new sites that haven\'t accumulated many inbound links yet.' } },
    { '@type': 'Question', name: 'What does Crawl-delay do in robots.txt?', acceptedAnswer: { '@type': 'Answer', text: 'Crawl-delay specifies the minimum number of seconds a crawler should wait between requests to your server. For example, Crawl-delay: 2 asks bots to pause 2 seconds between page requests. This is useful for shared hosting or low-capacity servers that get overwhelmed by aggressive bots. Note: Googlebot ignores Crawl-delay — to control Google\'s crawl rate, use the crawl rate settings in Google Search Console. Crawl-delay is mainly respected by Bing, Yandex, and other crawlers.' } },
    { '@type': 'Question', name: 'Can I use robots.txt to block my staging site from Google?', acceptedAnswer: { '@type': 'Answer', text: 'You can use Disallow: / in the staging site\'s robots.txt to discourage compliant crawlers, but this is not access control — the file itself is public, and the content can still be accessed directly. For true privacy on a staging environment, use HTTP authentication (basic auth), IP allowlists, or environment-level access restrictions. The robots.txt approach works well as a second layer to reduce accidental indexing of staging content that gets discovered through links, but should never be your only protection.' } },
    { '@type': 'Question', name: 'Does robots.txt affect all search engines equally?', acceptedAnswer: { '@type': 'Answer', text: 'No. Major search engines like Google, Bing, Yandex, and Apple\'s crawler respect robots.txt, but rogue bots and scrapers ignore it entirely. The robots.txt protocol is voluntary — there is no technical enforcement. For Googlebot specifically, the Crawl-delay directive is ignored (use Search Console instead). The User-agent: * rule applies to all compliant crawlers. You can also write crawler-specific rules using the exact User-agent name, like User-agent: Googlebot to target only Google, followed by the Disallow or Allow rules for that crawler.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Robots.txt Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free robots.txt generator with Allow/Disallow rule editor, 3 presets (public site, staging, ecommerce), Sitemap directive, Crawl-delay, and Host support. Copy or download instantly.',
  url: 'https://webdevpuneet.com/robots-txt-generator/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Robots.txt Generator', item: 'https://webdevpuneet.com/robots-txt-generator/' },
  ],
};

const SEO = {
  slug: 'robots-txt-generator',
  title: 'Robots.txt Generator — Create Crawl Rules for SEO',
  about: {
    title: 'Stop Google Wasting Crawl Budget on Pages That Shouldn\'t Be Indexed',
    description: `Every time Googlebot visits your site, it has a limited crawl budget — a quota of pages it will crawl before moving on. If that quota gets consumed by admin panels, checkout flows, duplicate filter URLs, internal search results, or staging paths, your important product pages, blog posts, and landing pages may not get crawled and indexed as quickly as they should. A correctly configured robots.txt file solves this by directing crawlers away from pages with no SEO value and toward the content that matters.\n\nThis Robots.txt Generator builds a valid robots.txt file in seconds. Enter your site URL, choose from three practical presets — Public Site, Block Staging, or Store Crawl Rules for ecommerce — and customise the Allow and Disallow paths to match your specific setup. The Sitemap directive is added automatically using your domain, pointing Googlebot straight to your XML sitemap from the moment it reads the file. Optional Crawl-delay and Host directives are available for servers that need rate limiting or canonical domain enforcement.\n\n**Robots.txt is crawler guidance, not access control.** The file is publicly readable — anyone can open https://yourdomain.com/robots.txt and see every path you've blocked. Disallowed paths can still appear in search results if they're linked from other sites. For pages that must be removed from Google's index, the correct approach is to add a noindex meta tag or HTTP header on the page itself and ensure the page remains crawlable so Google can read the noindex signal. Never Disallow a URL you also need noindexed — it's one of the most common technical SEO mistakes.\n\n**The difference between robots.txt and a sitemap.** A sitemap tells search engines which URLs exist and should be crawled. Robots.txt tells them which URLs to avoid. They work together: your sitemap lists every important page, and robots.txt keeps crawlers away from the ones that shouldn't be in that list. Use the [Sitemap.xml Generator](/sitemap-generator) to build the companion sitemap file, then reference it with the Sitemap directive in this tool.\n\nFor ecommerce sites, the biggest crawl budget drains are typically paginated filter URLs (like /products?sort=price&color=red), session-based paths (/cart/, /checkout/), and duplicate category views. For developer tools, documentation, and SaaS apps, the usual suspects are /admin/, /dashboard/, /api/, staging subpaths, and any URL that requires authentication to be useful. The presets cover these common patterns — customise the Disallow list to add paths specific to your stack.`,
  },
  features: [
    '**Allow and Disallow rule editor** — add, remove, and reorder crawl rules for any path on your site',
    '**3 practical presets** — Public Site (blocks admin/private/tmp), Block Staging (Disallow all), Store Crawl Rules (blocks cart, checkout, account, search)',
    '**Auto Sitemap directive** — generates `Sitemap: https://yourdomain.com/sitemap.xml` from your site URL automatically',
    '**Crawl-delay support** — add a delay in seconds for servers that need rate limiting (respected by Bing, Yandex; ignored by Googlebot)',
    '**Host directive** — specify the canonical domain for Yandex and other crawlers that support it',
    '**Live output preview** — see the exact robots.txt file content update in real time as you change rules',
    '**Copy or download** — copy to clipboard or download as `robots.txt` ready to upload to your domain root',
    '**Works with [Sitemap.xml Generator](/sitemap-generator)** — generate both files together for a complete crawl configuration',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Enter your site URL', text: 'Type your domain (e.g. https://example.com) into the site URL field. The tool uses it to auto-build the Sitemap directive as https://example.com/sitemap.xml.' },
      { title: 'Choose a preset', text: 'Pick from Public Site (sensible defaults for most websites), Block Staging (Disallow: / to block all crawlers), or Store Crawl Rules (blocks cart, checkout, account, and search paths for ecommerce). The rules populate automatically — edit them to match your site.' },
      { title: 'Customise Allow and Disallow paths', text: 'Add any paths you need to explicitly allow or block. Paths must start with /. Common additions: /admin/, /api/, /staging/, /wp-admin/, /dashboard/, and duplicate or filter URL patterns like /search or ?sort=. Remove any preset rules that don\'t apply to your stack.' },
      { title: 'Add optional directives', text: 'Toggle the Sitemap checkbox to include or exclude the sitemap line. Add a Crawl-delay (in seconds) if your server struggles under bot load — Bing and Yandex respect this. Add a Host value only if you need to specify a canonical domain for Yandex.' },
      { title: 'Review the output', text: 'Check the generated file in the preview panel. Confirm the paths are correct, the sitemap URL points to the right location, and there are no typos in the directives.' },
      { title: 'Copy or download and deploy', text: 'Click Copy to clipboard or Download to get robots.txt. Upload it to the root of your domain — it must be accessible at https://yourdomain.com/robots.txt. Verify in a browser that the URL returns the file. Then submit the URL to Google Search Console under Settings > robots.txt to confirm Google can read it.' },
    ],
  },
  useCases: [
    { icon: '🤖', title: 'Block Googlebot from admin and login pages', desc: 'Add Disallow: /admin/, Disallow: /login/, and Disallow: /wp-admin/ to stop crawlers from wasting quota on pages that require authentication and have no SEO value. These paths can accumulate crawl budget usage on large sites.' },
    { icon: '🛒', title: 'Protect ecommerce crawl budget from filter and session URLs', desc: 'Block /cart/, /checkout/, /account/, and filtered URLs like /search or ?sort= to prevent duplicate content and crawl budget drain. Leave /products/, /categories/, and /collections/ open so Google indexes your inventory.' },
    { icon: '🚧', title: 'Stop Google indexing a staging or development site', desc: 'Generate a robots.txt with Disallow: / for your staging environment to discourage crawlers. Pair with HTTP basic auth for actual access control — robots.txt alone does not prevent determined access.' },
    { icon: '🗺️', title: 'Point all crawlers to your XML sitemap', desc: 'Add the Sitemap directive to every robots.txt file, regardless of other rules. It signals your canonical URL list to all compliant crawlers immediately, without waiting for them to find the sitemap through other discovery paths. Build the sitemap itself with the [XML sitemap generator](/sitemap-generator).' },
    { icon: '📄', title: 'Prepare robots.txt for a new site before launch', desc: 'Create a baseline robots.txt before a site goes live so the first crawl is guided correctly. Add the sitemap URL, block any internal tools or test paths, and confirm the file is in place before submitting the site to Search Console.' },
    { icon: '🔍', title: 'Understand when to use noindex instead of Disallow', desc: 'If a page is already in Google\'s index and you need it removed, noindex is the correct tool — not Disallow. Use this generator to write the crawl rules, then apply noindex tags to pages that should be kept uncrawlable but whose indexing status needs to be managed separately.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function RobotsTxtGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><RobotsTxtGeneratorTool /></div>
      <IndexOnly><AdSlot /><SeoSection {...SEO} /></IndexOnly>


    </div>
  );
}
