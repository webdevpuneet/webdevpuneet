import MetaTagGeneratorTool from '@/components/MetaTagGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Meta Tag Generator: SEO, Open Graph & Twitter Card Tags',
  description: 'Generate SEO, Open Graph, Twitter Card and JSON-LD meta tags with live Google and social previews. Export for HTML, Next.js or React. Free, no sign-up needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/meta-tag-generator/' },
  icons: { icon: '/icons/meta-tag-generator.svg', shortcut: '/icons/meta-tag-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/meta-tag-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Meta Tag Generator — SEO, OG & Twitter Card Tags + Live Previews',
    description: 'Fill in your page details and instantly generate all meta tags. Live Google SERP, Facebook OG, and Twitter Card previews. Export HTML, Next.js metadata, React Helmet, Vue/Nuxt, Astro, or JSON-LD.',
    images: [{ url: 'https://webdevpuneet.com/images/meta-tag-generator.png', width: 1200, height: 800, alt: 'Meta Tag Generator — SEO, Open Graph & Twitter Card Tool' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Meta Tag Generator — SEO, OG & Twitter Card Tags',
    description: 'Generate complete meta tag sets with live Google, Facebook and Twitter previews. 7 export formats including HTML, Next.js, React Helmet, Vue, and Astro.',
    images: ['https://webdevpuneet.com/images/meta-tag-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What meta tags should every web page have?',
      acceptedAnswer: { '@type': 'Answer', text: 'Every web page should have at minimum: a <title> tag (50–60 characters), a <meta name="description"> tag (130–160 characters), a <link rel="canonical"> pointing to the definitive URL, and a <meta name="robots"> tag. For social sharing add the Open Graph tags og:title, og:description, og:image (1200×630px), og:url, and og:type. For Twitter/X add twitter:card, twitter:title, twitter:description, and twitter:image. For search engine structured data add a JSON-LD <script> block with the appropriate Schema.org type for your page.' },
    },
    {
      '@type': 'Question',
      name: 'What is the ideal length for a meta title and meta description?',
      acceptedAnswer: { '@type': 'Answer', text: 'Google displays approximately 50–60 characters of a page title before truncating it in search results. Titles between 50 and 60 characters are shown in full on desktop. Meta descriptions should be 130–160 characters — enough to provide a complete, compelling snippet without being cut off. The tool uses a color-coded character counter: amber means the field is too short, green means it is in the optimal range, and red means it exceeds the limit and will be truncated by Google.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between og:title and <title>?',
      acceptedAnswer: { '@type': 'Answer', text: 'The <title> tag controls what appears in the browser tab and in Google search results. The og:title meta property controls what title Facebook, LinkedIn, Twitter/X, Slack, and other apps show when your page is shared as a link. They should usually match, but you can write them differently — for example the <title> might include your brand name at the end ("How to Center a Div — MyBlog") while the og:title might be more direct for social context ("How to Center a Div in CSS in 2025"). This tool generates both from the same title input but you can manually adjust either in the HTML output.' },
    },
    {
      '@type': 'Question',
      name: 'What size should my OG image be?',
      acceptedAnswer: { '@type': 'Answer', text: 'The recommended OG image size is 1200×630 pixels at a 1.91:1 aspect ratio. This size works correctly on Facebook, LinkedIn, Slack, iMessage, and WhatsApp. Twitter/X summary_large_image cards also use this size. Minimum size is 200×200px (for small card formats), but anything under 1200×630 risks looking blurry or cropped. Always use an absolute URL (starting with https://) for the og:image value — relative paths will not work when pages are shared externally. The Facebook and Twitter preview panels in this tool show a realistic representation of how your image will appear.' },
    },
    {
      '@type': 'Question',
      name: 'What is a canonical URL and why does it matter?',
      acceptedAnswer: { '@type': 'Answer', text: 'A canonical URL (<link rel="canonical" href="...">) tells search engines which version of a page is the "official" one when the same content is accessible at multiple URLs. For example, if your page can be reached at both https://example.com/page and https://example.com/page?ref=social, the canonical tag tells Google to consolidate ranking signals onto the clean URL. Without it, Google may split your SEO value between duplicates or pick the wrong version. Always set the canonical to the HTTPS, non-www (or www — whichever you use consistently) version of the URL without tracking parameters.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use the Next.js metadata export?',
      acceptedAnswer: { '@type': 'Answer', text: 'Copy the generated code from the Next.js tab and paste it into your page.js or layout.js file in a Next.js 13+ App Router project. The export const metadata = { ... } object is natively supported by Next.js App Router — no additional packages needed. Next.js automatically injects all the title, openGraph, twitter, robots, and alternates properties into the page <head> at build time. For dynamic metadata (where values depend on data fetching), convert it to export async function generateMetadata() { return { ... }; } instead.' },
    },
    {
      '@type': 'Question',
      name: 'What is JSON-LD and do I need it?',
      acceptedAnswer: { '@type': 'Answer', text: 'JSON-LD (JavaScript Object Notation for Linked Data) is Google\'s recommended format for adding structured data to your pages. It is a <script type="application/ld+json"> block that tells Google what type of content the page contains — Article, Product, FAQ, Recipe, etc. — so it can display rich results in search (star ratings, publication dates, breadcrumbs). It does not affect regular rankings directly but can significantly improve click-through rates by enabling rich snippets. This tool generates appropriate JSON-LD Schema based on your selected page type: Article for blog posts, NewsArticle for news, Product for product pages, WebSite for homepages.' },
    },
    {
      '@type': 'Question',
      name: 'What does robots: index, follow mean?',
      acceptedAnswer: { '@type': 'Answer', text: '"index, follow" (the default) tells search engine crawlers to index the page and follow all links on it. "noindex" removes the page from search results entirely — useful for thank-you pages, admin pages, and staging environments. "nofollow" tells crawlers not to follow links on the page — useful if you do not want to pass link equity to outbound links. "noindex, nofollow" is the most restrictive option and is used for pages you want completely hidden from search engines. The robots toggle buttons in the form update the meta content value in real time across all export formats.' },
    },
    {
      '@type': 'Question',
      name: 'How do I add meta tags in React without Next.js?',
      acceptedAnswer: { '@type': 'Answer', text: 'In a React project without Next.js App Router, use the react-helmet-async package: npm install react-helmet-async. Wrap your app with <HelmetProvider> in your root component, then use the <Helmet> component inside any page to inject meta tags into the document head. The React Helmet tab in this tool generates the exact JSX snippet ready to paste. For Vite React projects with SSR, react-helmet-async handles server-side rendering correctly. For non-SSR React SPAs, the meta tags are injected client-side — they will be present for social sharing crawlers that execute JavaScript (like Facebook and Twitter) but not for those that do not.' },
    },
    {
      '@type': 'Question',
      name: 'How do I generate meta tags for Vue or Nuxt?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Vue / Nuxt tab generates a useHead() composable call using @vueuse/head — the standard head management library for both Vue 3 and Nuxt 3. In Nuxt 3, useHead is auto-imported so no import statement is needed. In Vue 3 with a standalone app, install @vueuse/head: npm install @vueuse/head, then add createHead() to your app setup. The generated code covers title, canonical link, all meta tags, Open Graph properties, and Twitter Card tags in a single composable call. For page-level meta, place the useHead() call inside the <script setup> block of your page component.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Meta Tag Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate complete meta tag sets for SEO, Open Graph, and Twitter Card with live previews and 7 export formats.',
  url: 'https://webdevpuneet.com/meta-tag-generator/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Meta Tag Generator', item: 'https://webdevpuneet.com/meta-tag-generator/' },
  ],
};

const seoData = {
  slug: 'meta-tag-generator',
  title: 'Meta Tag Generator — SEO, Open Graph & Twitter Card',
  about: {
    title: 'Generate Every Meta Tag Your Page Needs — With Live Previews',
    description: `You shared a link and it showed a blank card on Twitter. You published a page and the title is getting cut off in Google. You're writing meta tags by hand and you're not sure whether og:title or twitter:title takes precedence, or whether your JSON-LD @type should be Article or BlogPosting. This tool generates the complete set — SEO, Open Graph, Twitter, and structured data — and shows live previews of exactly how Google, Facebook, and Twitter will render the page before you publish.\n\nThis Meta Tag Generator takes your page details and generates a complete, production-ready meta tag set in one click. Fill in the title, description, URL, OG image, site name, author, and dates. Select your page type (blog post, product, homepage, article, landing page, service) and the tool automatically picks the right og:type, Twitter card type, and Schema.org @type from an internal mapping table — a Product page maps to og:type "product" with a Product schema, a Homepage maps to "website" with a WebSite schema, and so on. Toggle the robots index and follow settings with a single button and every export format updates its robots content string together.\n\nThe live preview panel shows exactly how your page will look as a **Google search result** (SERP snippet with domain breadcrumb, blue title, gray description truncated the same way Google truncates it), as a **Facebook/LinkedIn link card** (image + uppercase domain + title + description), and as a **Twitter/X summary_large_image card**. Character counters under the title and description fields turn amber, green, or red in real time as you type, and a separate diagnostics panel flags issues a counter alone can't catch — a missing OG image, a non-HTTPS canonical URL, or an uploaded image that loads at the wrong pixel dimensions, checked by loading the image URL in the background and reading its natural width and height. No more guessing whether your title will be truncated or your image will be the right ratio.\n\nExport the result in **7 formats**: plain HTML tags for any website, the Next.js App Router \`metadata\` export object, a React Helmet JSX snippet, a Vue/Nuxt \`useHead()\` composable call, an Astro \`<head>\` block, a standalone JSON-LD structured data script, or just the Open Graph and Twitter tags for projects that handle basic SEO elsewhere. Already have tags written somewhere else? Click Import to parse HTML meta tags copied from your clipboard straight back into the form fields, or click Pack to download a ZIP containing the key export files plus a README noting any outstanding diagnostics. Every field auto-saves to localStorage a fraction of a second after you stop typing, so refreshing the page never loses your draft.`,
  },
  features: [
    '**7 page types** — Blog Post, Article, Product, Homepage, About, Landing Page, Service with auto-matched og:type and Schema @type',
    '**Live Google SERP preview** — realistic search result card showing domain breadcrumb, blue title, gray description snippet',
    '**Facebook OG card preview** — shows image, uppercase domain, title, and description as Facebook renders them',
    '**Twitter/X card preview** — summary_large_image card with your actual image, title, and description',
    '**Character counters with color coding** — amber (too short), green (optimal), red (too long) for title (60) and description (160)',
    '**7 export formats** — HTML, Next.js metadata, React Helmet, Vue/Nuxt useHead, Astro, JSON-LD, OG-only',
    '**JSON-LD Schema generation** — Article, NewsArticle, Product, WebSite, AboutPage, WebPage, Service based on page type; generate a site favicon with our [Favicon Generator](/favicon-generator)',
    '**Robots toggles** — index/noindex and follow/nofollow toggle buttons with live robots meta content preview',
    '**Date fields for articles** — Published and Modified date inputs for Article/NewsArticle Schema and og:article properties',
    '**One-click copy** — copies the full code block for the active format with visual confirmation',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Select your page type', text: 'Click the page type that matches your page: Blog Post or Article for editorial content, Product for e-commerce, Homepage or Landing Page for marketing pages, About or Service for informational pages. The tool automatically sets og:type, the Schema.org @type, and shows/hides date fields based on your selection.' },
      { title: 'Fill in your page details', text: 'Enter your page title — watch the character counter turn green when you hit the 50–60 char sweet spot. Write your meta description aiming for 130–160 characters. Add the canonical URL, OG image URL (1200×630px), site name, and Twitter handle. For blog posts and articles, add published and modified dates.' },
      { title: 'Set robots and additional options', text: 'Toggle the index/noindex and follow/nofollow options to control how search engines treat the page. For articles, fill in the published and modified dates to enable og:article properties and Article schema.' },
      { title: 'Check the live previews', text: 'Switch between the Google, Facebook, and Twitter tabs to see how your page will look in each context. Check for title truncation in the Google SERP preview and verify your OG image appears correctly in the social card previews.' },
      { title: 'Choose your export format and copy', text: 'Click the format tab that matches your stack: HTML for static sites, Next.js for App Router projects, React Helmet for CRA or Vite React, Vue/Nuxt for Vue 3 and Nuxt 3, Astro for Astro projects, JSON-LD for standalone structured data, or OG Only if your basic SEO is handled elsewhere. Click Copy and paste directly into your file.' },
    ],
  },
  useCases: [
    { icon: '◉', title: 'Check if your title and description will be truncated in Google', desc: 'The live Google SERP preview shows your title and description exactly as they\'ll appear in search results, with character counters that turn red when you\'ve exceeded the limit. Fix truncation before the page goes live, not after.' },
    { icon: '▤', title: 'Make shared links show an image on Facebook and LinkedIn', desc: 'Fill in og:title, og:description, og:image, and og:url — the Facebook OG preview shows your social card with the actual image. Fix missing or incorrect OG tags before publishing so shared links look right everywhere. Create the OG image with our [Mesh Gradient Generator](/mesh-gradient-generator).' },
    { icon: '⚡', title: 'Generate the Next.js App Router metadata export', desc: 'Copy the generated `export const metadata = { ... }` object directly into page.js or layout.js. All openGraph, twitter, robots, and alternates properties are correctly structured — no manual reference to the Next.js metadata API needed.' },
    { icon: '◑', title: 'Add Article or Product structured data for Google rich results', desc: 'Select your page type and the tool generates the correct JSON-LD Schema: Article (with author, datePublished, dateModified), Product, or WebSite. Paste the script block into your <head> to make the page eligible for rich snippets in Google.' },
    { icon: '▦', title: 'Generate meta tags for React, Vue, or Astro without Next.js', desc: 'The React Helmet, Vue/Nuxt useHead, and Astro export tabs generate the correct syntax for each framework. Copy and paste into the appropriate file — no guessing the right API for your stack.' },
    { icon: '⇄', title: 'Verify your Twitter Card before tweeting a link', desc: 'The Twitter/X card preview shows your summary_large_image card with your actual OG image, title, and description. Verify appearance before publishing — Twitter caches cards and incorrect ones require a cache-clearing step to fix. Compress the OG image with our [Image Compressor](/image-compressor).' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function MetaTagGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <MetaTagGeneratorTool />
        </div>
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>

      </div>
    </>
  );
}
