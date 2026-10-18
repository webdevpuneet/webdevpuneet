import SeoPlaygroundTool from '@/components/SeoPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/seo-checker.png';

export const metadata = {
  title: 'SEO Checker: Free On-Page Audit for Meta, Schema & Social',
  description: 'Audit any URL or pasted HTML for metadata, content, links, SERP snippet, social cards and JSON-LD schema. Get a 0-100 score with one-click fixes. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/seo-checker/' },
  icons: { icon: '/icons/seo-checker.svg', shortcut: '/icons/seo-checker.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/seo-checker/',
    siteName: 'webdevpuneet.com',
    title: 'SEO Checker — Free SEO Audit Tool, SERP Preview & Schema Checker',
    description: 'Audit any URL or HTML for metadata, Google snippet preview, Open Graph cards, Twitter/X previews, JSON-LD schema, crawlability, links, images, and keyword coverage. Scored 0–100, with framework-ready exports.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SEO Checker — Free SEO Audit Tool and SERP Preview' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SEO Checker — Free SEO Audit Tool, SERP Preview & Schema Checker',
    description: 'Audit metadata, preview Google snippets and social cards, validate JSON-LD, check crawlability, and export Next.js / React / Astro tags — all in the browser, free.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is the SEO Checker free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — the SEO Checker is completely free with no sign-up, account, or usage limit. Enter any public URL or paste HTML and run the full audit, all the previews, and every export as many times as you like. Pasted HTML is parsed entirely in your browser and never uploaded.' },
    },
    {
      '@type': 'Question',
      name: 'Can I audit a live URL with the SEO Checker?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Enter any public URL in the Check by URL field. The tool attempts a direct browser fetch first, then falls back to a public proxy if CORS blocks the request. Some sites block all external access — for those, open the page in your browser, use View Source, copy the HTML, and paste it into the HTML Source panel. All the same audits, previews, and exports run on pasted HTML.' },
    },
    {
      '@type': 'Question',
      name: 'What does the SEO Checker check?',
      acceptedAnswer: { '@type': 'Answer', text: 'The auditor scores seven categories: Metadata (title tag length, meta description, robots directives, canonical URL), Crawlability (HTTPS canonical, query/hash in canonical, noindex, nofollow, canonical vs OG host mismatch), Content (word count, H1 presence and alignment with title, heading outline, first paragraph), Social (Open Graph title/description/image, Twitter card tags), Schema (JSON-LD presence and type detection), Links (internal vs external ratio, anchor text quality, missing or empty hrefs), and Images (alt text coverage, missing width/height, loading attribute). Issues are grouped by category with specific fix suggestions and an overall 0–100 score.' },
    },
    {
      '@type': 'Question',
      name: 'How does the SERP preview work?',
      acceptedAnswer: { '@type': 'Answer', text: 'The SERP tab renders a Google-style search result card using the extracted or manually entered title, meta description, and URL. It shows character counts for title and description alongside pixel-width guidance for desktop and mobile truncation. Edit the title and description directly inside the SERP preview to tune snippet length without switching panels.' },
    },
    {
      '@type': 'Question',
      name: 'Which social platforms does the social card preview support?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Social tab renders card previews for Facebook (using Open Graph tags), X/Twitter (using twitter: card tags), LinkedIn (which uses Open Graph), and Slack (which uses og:image and og:title for link unfurling). You can see how the same page metadata looks across all four platforms and spot missing images or truncated titles before sharing.' },
    },
    {
      '@type': 'Question',
      name: 'What schema types can the Schema Builder generate?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Schema Builder generates JSON-LD for eight common types: WebPage, Article, BlogPosting, Product, FAQPage, SoftwareApplication, LocalBusiness, and BreadcrumbList. Fill in the form fields, and the tool produces ready-to-paste JSON-LD. The Schema tab also parses and displays any existing JSON-LD found in the page you audited.' },
    },
    {
      '@type': 'Question',
      name: 'What output formats does the SEO Checker export?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Output tab generates implementation-ready tags in five formats: plain HTML meta tags (paste into any <head>), Next.js metadata object (export const metadata = { ... }), React Helmet JSX, Astro head component markup, and JSON-LD script tags. The Report tab exports a full audit summary as Markdown (for developer handoff) or JSON (for programmatic use), including the score, open issues, fix suggestions, content statistics, link flags, image flags, and schema summary.' },
    },
    {
      '@type': 'Question',
      name: 'Is the SEO Checker a replacement for Google Search Console?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The SEO Checker is a pre-publish QA and implementation tool — it catches metadata mistakes, markup errors, crawlability issues, and missing social tags before a page goes live. Google Search Console is for post-publish monitoring: indexing status, coverage errors, Core Web Vitals, search queries, and click data. Use the SEO Checker during development and pre-launch QA, then use Search Console to monitor the live page after it is indexed.' },
    },
    {
      '@type': 'Question',
      name: 'Is pasted HTML or URL data sent to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pasted HTML is parsed entirely in your browser — nothing is uploaded. URL auditing requests the public URL directly from your browser, and may route through a public CORS proxy if direct access is blocked by the target site. For pages with sensitive content, paste the HTML manually instead of using URL fetch.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SEO Checker',
  url: 'https://webdevpuneet.com/seo-checker/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based SEO audit tool. Audit any URL or paste HTML to score metadata, preview Google SERP snippets, test Open Graph and Twitter/X social cards, validate JSON-LD schema, check crawlability, audit links and images, analyse keyword coverage, and export framework-ready tags for HTML, Next.js, React Helmet, and Astro.',
  featureList: [
    'Audit by URL with direct fetch and public proxy fallback — or paste full HTML, head snippets, or metadata blocks generated by the [meta tag generator](/meta-tag-generator)',
    'Seven-category audit score (0–100): Metadata, Crawlability, Content, Social, Schema, Links, and Images',
    'Click-to-apply fix suggestions for common metadata, robots, canonical, H1, social image, and schema issues',
    'SERP preview with character count and pixel-width desktop/mobile truncation guidance',
    'Social card previews for Facebook, X/Twitter, LinkedIn, and Slack',
    'Schema Builder for WebPage, Article, BlogPosting, Product, FAQPage, SoftwareApplication, LocalBusiness, and BreadcrumbList',
    'Keyword intent panel — checks target phrase in title, H1, description, first paragraph, and headings',
    'Crawlability checks — HTTPS canonical, query/hash in canonical, noindex, nofollow, canonical/OG host mismatch',
    'Content audit — word count, heading outline, first paragraph quality',
    'Link audit — internal vs external ratio, anchor text, empty or missing hrefs',
    'Image audit — alt text coverage, missing width/height, loading attribute',
    'Output: HTML tags, Next.js metadata object, React Helmet JSX, Astro head, JSON-LD',
    'Report: Markdown and JSON audit export for developer handoff and client review',
    'Runs in the browser — pasted HTML never leaves your device',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'SEO Checker', item: 'https://webdevpuneet.com/seo-checker/' },
  ],
};

const SEO = {
  slug: 'seo-checker',
  title: 'SEO Checker — Free Audit Metadata, Preview SERP Snippets, Validate Schema',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Enter a URL or paste your HTML', text: 'Type any public URL into the Check by URL field and press Enter. For pages that block external fetching (CORS restrictions, authentication, staging servers), open the page in your browser, right-click → View Page Source, copy all the HTML, and paste it into the HTML Source panel. The same full audit runs on both.' },
      { title: 'Read the score and category breakdown', text: 'The sidebar shows a score from 0–100 broken down across seven categories: Metadata, Crawlability, Content, Social, Schema, Links, and Images. Click any category to jump directly into that audit section. Red and amber issues show what is failing; green shows what is passing.' },
      { title: 'Apply fix suggestions for quick wins', text: 'Open Fix Suggestions to see a list of detected issues with one-click Apply fix buttons for common problems: missing meta description, wrong robots directive, non-HTTPS canonical URL, title too short, missing OG image, missing H1, or no JSON-LD schema. Applying a fix updates the live preview and score immediately.' },
      { title: 'Tune your Google snippet in the SERP tab', text: 'The SERP tab renders a Google-style search result card using your title, description, and URL. Edit the title and description directly in the preview. The character counter and pixel-width gauge show exactly when desktop and mobile truncation will kick in — aim for titles under 60 characters and descriptions under 155.' },
      { title: 'Check social card previews', text: 'Switch to the Social tab to see how the page looks when shared on Facebook, X/Twitter, LinkedIn, and Slack. Missing og:image means a blank card on every platform. A title that is correct length for Google may still get truncated on Twitter cards. Fix social issues before publishing to avoid broken link previews.' },
      { title: 'Validate schema and check keyword coverage', text: 'The Schema tab parses existing JSON-LD and lets you build new schema for WebPage, Article, BlogPosting, Product, FAQPage, SoftwareApplication, LocalBusiness, or BreadcrumbList. The Keyword tab checks whether your target search phrase appears in the title, H1, meta description, first paragraph, and subheadings — the five places Google pays most attention to.' },
      { title: 'Check crawlability for indexing problems', text: 'The Crawlability panel flags issues that can prevent Google from indexing a page: noindex in robots meta tag, nofollow on the canonical link, non-HTTPS canonical URL, query strings or hash fragments in the canonical, and mismatches between the canonical host and the og:url host. These are common mistakes that are invisible to the naked eye but block or dilute crawl signals.' },
      { title: 'Export tags or download an audit report', text: 'The Output tab generates copy-paste tags for HTML, Next.js metadata object, React Helmet, Astro head, and JSON-LD. Choose your framework from the tabs and paste directly into your codebase. The Report tab exports a Markdown file (for developer handoff or GitHub tickets) or a JSON file (for programmatic use) with the full audit: score, issues, fix suggestions, content stats, link analysis, image flags, and schema summary.' },
    ],
  },
  about: {
    title: 'SEO Checker — Free Metadata, SERP Preview, Social Cards, Schema & Crawlability in One Workspace',
    description: `Most SEO QA happens across five or six separate tools: a snippet preview tool for checking title length, an Open Graph tester for social cards, a JSON-LD validator for schema, a robots meta checker for crawlability, and a manual checklist for everything else. Switching between them on every page is slow, easy to skip, and misses the connections between issues — a canonical that conflicts with the og:url will silently affect both crawlability and social sharing, but you'd only catch it if you happened to check both at the same time. The SEO Checker replaces that fragmented workflow with a single browser-based audit that runs every check together and rolls them into one 0–100 score.

Enter any public URL or paste your page HTML. The tool extracts every SEO-relevant signal from the document — title tag, meta description, robots directives, canonical URL, Open Graph fields, Twitter card tags, JSON-LD structured data, H1 and heading outline, body word count, internal and external links, image alt text, and image attributes — and surfaces them in a scored dashboard across seven audit categories.

**Metadata** covers the fundamentals that affect every page: title tag (length, keyword placement), meta description (length, presence), robots meta directive (index/noindex, follow/nofollow), and canonical URL format. The audit flags titles that are too short to be meaningful or too long to display fully in Google results, descriptions that are missing or duplicate the title, and canonical URLs that point to HTTP instead of HTTPS.

**Crawlability** is where silent indexing mistakes hide. A page with \`noindex\` in its robots meta tag will never appear in Google results — but it looks completely normal in a browser. A canonical URL with a query string (\`?ref=newsletter\`) can confuse Googlebot about which URL is authoritative. A canonical pointing to a different subdomain than the og:url tells Google and social platforms different things about the same page. The Crawlability panel catches all of these before they go live.

**Content** checks word count (thin content below 300 words is a common quality signal issue), H1 presence and alignment with the title tag (Google uses both to understand the page topic), heading outline logic (skipping from H1 to H3 confuses document structure), and the first paragraph (keyword in the opening sentence is a strong on-page signal).

**Social** renders card previews for all four platforms where link sharing matters. Facebook and LinkedIn both read Open Graph tags — \`og:title\`, \`og:description\`, \`og:image\` — and will show a blank gray card if the image is missing or returns a 4xx error. X/Twitter reads \`twitter:card\`, \`twitter:title\`, and \`twitter:image\`. Slack reads \`og:image\` and \`og:title\` for link unfurling in channels. The Social tab shows all four previews side by side so you can catch truncation and missing images across every platform at once.

**Schema** parses any JSON-LD already on the page and displays the detected type and key fields. The built-in Schema Builder generates clean JSON-LD for the eight most common schema types: WebPage, Article, BlogPosting, Product, FAQPage, SoftwareApplication, LocalBusiness, and BreadcrumbList. Structured data is increasingly important for rich results in Google Search — an Article schema enables the article rich snippet, a FAQPage schema can trigger expandable Q&A entries in results, and a Product schema enables price and availability badges.

**Links and Images** cover accessibility and SEO signals that are easy to miss at scale. The Links audit checks for empty anchor text, overly generic text like "click here" or "read more", the ratio of internal to external links, and links with missing or broken hrefs. The Images audit checks alt text coverage (empty alt text on non-decorative images is both an accessibility failure and a missed keyword opportunity), missing width and height attributes (which cause layout shift that hurts Core Web Vitals), and missing \`loading="lazy"\` on below-the-fold images.

The **Output** tab exports implementation-ready code the moment you have the metadata right. Switch between HTML tags (paste into any \`<head>\`), Next.js \`export const metadata\` object, React Helmet JSX, Astro head component, and JSON-LD. The **Report** tab packages the full audit into a Markdown file you can paste into a GitHub issue, Notion page, or client report — or a JSON file for programmatic integration with CI pipelines or audit dashboards. Pair the auditor with the [meta tag generator](/meta-tag-generator) to build tags from scratch, the [schema markup generator](/schema-markup-generator) for structured data, and the [sitemap generator](/sitemap-generator) for clean indexing.`,
  },
  features: [
    'Audit by URL with direct fetch and public proxy fallback — or paste full HTML, head snippets, or metadata blocks',
    'Seven-category scored audit (0–100): Metadata, Crawlability, Content, Social, Schema, Links, and Images',
    'One-click fix suggestions for missing descriptions, wrong robots directives, non-HTTPS canonicals, missing OG images, and more — fix them with the [robots.txt generator](/robots-txt-generator), [OG image generator](/og-image-generator), and [schema markup generator](/schema-markup-generator)',
    'SERP preview with live edit, character count, and pixel-width desktop/mobile truncation guidance',
    'Social card previews for Facebook, X/Twitter, LinkedIn, and Slack — side by side',
    'Schema Builder for 8 types: WebPage, Article, BlogPosting, Product, FAQPage, SoftwareApplication, LocalBusiness, BreadcrumbList',
    'Keyword intent panel — checks target phrase in title, H1, description, first paragraph, and headings',
    'Crawlability checks — noindex, nofollow, non-HTTPS canonical, query/hash in canonical, canonical/OG host mismatch',
    'Content audit — word count, heading outline, H1 alignment with title',
    'Link audit — internal/external ratio, anchor text quality, empty or missing hrefs',
    'Image audit — alt text, missing width/height, loading attribute',
    'Export: HTML tags, Next.js metadata, React Helmet, Astro head markup, JSON-LD',
    'Report: Markdown and JSON audit export for developer handoff and client review',
    'Pasted HTML parsed entirely in the browser — never uploaded to a server',
  ],
  useCases: [
    { icon: '⚡', title: 'Pre-launch SEO QA', desc: 'Audit every landing page, blog post, or product page before deployment. Catch missing metadata, noindex mistakes, canonical mismatches, broken social images, and missing schema in one pass — not spread across six separate tools.' },
    { icon: '⬚', title: 'SERP snippet tuning', desc: 'Use the SERP tab to refine title and description until both character count and pixel width are in range for desktop and mobile. See exactly what Google will truncate before the page goes live.' },
    { icon: '⇄', title: 'Social sharing QA', desc: 'Preview how a shared link looks on Facebook, X/Twitter, LinkedIn, and Slack before publishing. Catch missing og:image, truncated titles, and wrong card types before the post goes out.' },
    { icon: '▹', title: 'Framework metadata export', desc: 'Use the Output tab to generate your metadata as Next.js export const metadata, React Helmet JSX, Astro head markup, or plain HTML — whichever your stack needs. Copy and paste, no manual translation.' },
    { icon: '◈', title: 'Schema markup validation', desc: 'Parse existing JSON-LD to check what Google will read, or use the Schema Builder to generate Article, FAQPage, Product, LocalBusiness, or BreadcrumbList schema without writing JSON by hand.' },
    { icon: '◇', title: 'Developer handoff and client audit', desc: 'Export a Markdown or JSON report with the full audit score, open issues, fix suggestions, content stats, and schema summary. Paste into a GitHub issue, Notion doc, or client-facing review document.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
  links: [
    { href: '/meta-tag-generator', label: 'Meta Tag Generator — build Open Graph, Twitter Card, and SEO tags from a form' },
    { href: '/schema-markup-generator', label: 'Schema Markup Generator — generate JSON-LD for any schema type' },
    { href: '/robots-txt-generator', label: 'Robots.txt Generator — control Googlebot crawl rules' },
    { href: '/sitemap-generator', label: 'Sitemap Generator — create XML sitemaps for Google indexing' },
    { href: '/og-image-generator', label: 'OG Image Generator — create Open Graph preview images' },
  ],
};

export default function SeoCheckerPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SeoPlaygroundTool /></div>
      <AdSlot />
      <IndexOnly>
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
