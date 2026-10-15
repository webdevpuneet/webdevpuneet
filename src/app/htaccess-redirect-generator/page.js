import HtaccessRedirectGeneratorTool from '@/components/HtaccessRedirectGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/htaccess-redirect-generator.png';

const howToSteps = [
  { title: 'Choose your global Apache redirect rules', text: 'Decide whether the site should force HTTPS, force `www`, force non-www, add trailing slashes, or remove trailing slashes. These site-wide rules should match the canonical URLs in your [Meta Tag Generator](/meta-tag-generator/) output and the URLs you submit through your [Sitemap.xml Generator](/sitemap-generator/).' },
  { title: 'Pick the correct host mode', text: 'Use Force non-www when `https://example.com/page/` is the canonical version, or Force www when `https://www.example.com/page/` is the canonical version. Avoid switching this casually on an existing site because host redirects affect every page, analytics path, canonical tag, and backlink target.' },
  { title: 'Set trailing slash behavior carefully', text: 'Choose Add slash or Remove slash only when your site has a clear URL style. Changing slash behavior can create site-wide redirects, so confirm that your CMS, internal links, canonical tags, and sitemap all use the same version before publishing the generated `.htaccess` rules.' },
  { title: 'Add custom 301 or 302 redirect rows', text: 'Enter the old path in the From field and the final destination in the To field. Use 301 for permanent moves, deleted pages with a replacement, slug changes, and SEO migrations. Use 302 only for temporary campaigns, short tests, or routing that you expect to reverse.' },
  { title: 'Review the generated .htaccess output', text: 'Read the preview before copying. Confirm that `RewriteEngine On` appears once, HTTPS and host rules are above custom redirects, old paths start with `/`, and each old URL points directly to the final destination rather than another redirecting URL.' },
  { title: 'Back up your current .htaccess file', text: 'Before uploading, download or copy the existing production `.htaccess` file. A small syntax issue in Apache config can break the site, so always keep a known-good version ready and apply changes during a window where you can immediately test important pages.' },
  { title: 'Copy or download and deploy', text: 'Use Copy when editing directly in hosting file manager or Download to save a fresh `.htaccess` file. Upload it to the Apache document root, usually the same directory as the main `index.php` or `index.html`, then test several old and canonical URLs in a browser.' },
  { title: 'Verify redirects after deployment', text: 'Check that HTTP redirects to HTTPS, the wrong host redirects to the canonical host, and old URLs return the expected 301 or 302 status. If you also changed security headers or crawler rules, review the matching [Security Headers Generator](/security-headers-generator) and [Robots.txt Generator](/robots-txt-generator/) outputs.' },
];

export const metadata = {
  title: '.htaccess Redirect Generator: 301, 302, HTTPS & www Free',
  description: 'Generate Apache .htaccess redirect rules: custom 301 and 302 redirects, force HTTPS, www or non-www, and trailing slashes. Copy or download. Free, no sign-up.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/htaccess-redirect-generator/' },
  icons: { icon: '/icons/htaccess-redirect-generator.svg', shortcut: '/icons/htaccess-redirect-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/htaccess-redirect-generator/',
    siteName: 'webdevpuneet.com',
    title: '.htaccess Redirect Generator - Apache 301 and 302 Rules',
    description: 'Create Apache .htaccess rules for HTTPS, canonical host, trailing slash cleanup, and custom 301 or 302 redirects.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: '.htaccess Redirect Generator by webdevpuneet.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '.htaccess Redirect Generator',
    description: 'Generate Apache 301/302 redirects, HTTPS rules, and canonical host rewrites.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I create a 301 redirect in .htaccess?', acceptedAnswer: { '@type': 'Answer', text: 'For a simple Apache redirect, use a line like Redirect 301 /old-page/ https://example.com/new-page/. The old path should be relative to the site root and the destination should be the final canonical URL. This generator builds those rows for you and also adds optional HTTPS, host, and trailing slash rewrite rules. After publishing, test the old URL and confirm it returns a 301 status instead of a 302 or redirect chain.' } },
    { '@type': 'Question', name: 'Should I use a 301 or 302 redirect for SEO?', acceptedAnswer: { '@type': 'Answer', text: 'Use 301 when the move is permanent: site migrations, changed slugs, merged pages, deleted pages with a replacement, and canonical cleanup. Use 302 only when the redirect is temporary and you expect the original URL to return, such as a short promotion or test. For SEO migrations, 301 is normally the right choice because it tells search engines to transfer signals to the new URL. Avoid using 302 for permanent moves because it can delay canonical consolidation.' } },
    { '@type': 'Question', name: 'How do I force HTTPS using .htaccess?', acceptedAnswer: { '@type': 'Answer', text: 'Enable the Force HTTPS option to generate a RewriteCond that checks whether the request is not already HTTPS, followed by a RewriteRule that redirects to the HTTPS version of the same host and path. Put this rule near the top of the file so HTTP requests normalize before custom page redirects run. Make sure your SSL certificate is installed first. If HTTPS is broken at the hosting level, an .htaccess redirect cannot fix the certificate problem.' } },
    { '@type': 'Question', name: 'How do I redirect www to non-www or non-www to www in .htaccess?', acceptedAnswer: { '@type': 'Answer', text: 'Choose Force non-www if your canonical URLs should use example.com, or Force www if they should use www.example.com. The generated rewrite conditions normalize the host before users and crawlers continue to page-level URLs. Keep this choice consistent with canonical tags, sitemap URLs, internal links, analytics settings, and Search Console properties. Mixing host versions creates duplicate URL signals and unnecessary redirects.' } },
    { '@type': 'Question', name: 'Can .htaccess redirects cause redirect chains?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A redirect chain happens when URL A redirects to URL B, then URL B redirects again to URL C. Chains slow page loads, waste crawl budget, and make migrations harder to debug. Point every old URL directly to the final canonical destination whenever possible. If you are forcing HTTPS and host changes globally, make sure custom redirect destinations already use the final HTTPS canonical host.' } },
    { '@type': 'Question', name: 'Where do I upload the .htaccess file?', acceptedAnswer: { '@type': 'Answer', text: 'Upload .htaccess to the Apache document root for the site, usually the folder containing index.php or index.html. On shared hosting this is often public_html. On some managed hosts, .htaccess editing may be restricted or generated by the platform. Always back up the existing file first because .htaccess can also contain WordPress rules, caching rules, security headers, or application routing that you should not overwrite blindly.' } },
    { '@type': 'Question', name: 'Does .htaccess work on Nginx, Vercel, or Netlify?', acceptedAnswer: { '@type': 'Answer', text: 'No. .htaccess is specific to Apache and hosts that support Apache per-directory configuration. Nginx uses server block configuration, Vercel uses redirects in vercel.json or framework config, and Netlify uses _redirects or netlify.toml. Use this generator only for Apache hosting, cPanel hosting, many WordPress installs, and environments where .htaccess rules are supported.' } },
    { '@type': 'Question', name: 'Should HTTPS and host redirects go before custom page redirects?', acceptedAnswer: { '@type': 'Answer', text: 'Usually yes. Normalizing protocol and host early means every request reaches the same canonical domain before page-level redirect logic is evaluated. That makes rules easier to reason about and prevents duplicate mappings for HTTP, HTTPS, www, and non-www variants. The main exception is an advanced application setup with custom routing requirements, where you should follow the server or CMS documentation.' } },
    { '@type': 'Question', name: 'How do I test .htaccess redirects after publishing?', acceptedAnswer: { '@type': 'Answer', text: 'Open several old URLs in a browser and confirm they land on the expected new pages. For status codes, use browser developer tools, curl -I, or an online HTTP header checker to verify 301 or 302 responses. Test HTTP, HTTPS, www, non-www, and trailing slash variants if you changed those rules. If the site returns a 500 error, restore the backup .htaccess file and inspect the generated rules for host-specific incompatibilities.' } },
    { '@type': 'Question', name: 'Can I use .htaccess redirects for a WordPress migration?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if the WordPress site runs on Apache or a host that supports .htaccess. Put custom redirects carefully around the existing WordPress rewrite block and avoid deleting platform-generated rules. For many migrations, page-level Redirect 301 rows are enough for old slug to new slug mapping. For large migrations, export a URL map from your old site and add rows in batches so you can test before publishing everything.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '.htaccess Redirect Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate Apache .htaccess redirect rules for 301 and 302 redirects, force HTTPS, canonical host rewrites, trailing slash cleanup, comments, copy, and download.',
  url: 'https://webdevpuneet.com/htaccess-redirect-generator/',
  featureList: [
    'Generate Apache .htaccess redirect rules',
    'Create 301 permanent redirects',
    'Create 302 temporary redirects',
    'Force HTTPS with RewriteCond and RewriteRule',
    'Force www or non-www canonical host',
    'Add or remove trailing slashes',
    'Include optional comments in generated output',
    'Add and remove custom redirect rows',
    'Copy generated .htaccess rules',
    'Download a ready-to-upload .htaccess file',
  ],
};

function stripInlineMarkdown(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, '');
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate Apache .htaccess redirect rules',
  description: 'Create HTTPS, canonical host, trailing slash, and custom 301 or 302 redirect rules for an Apache .htaccess file.',
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
    { '@type': 'ListItem', position: 2, name: '.htaccess Redirect Generator', item: 'https://webdevpuneet.com/htaccess-redirect-generator/' },
  ],
};

const SEO = {
  slug: 'htaccess-redirect-generator',
  title: '.htaccess Redirect Generator - Apache 301 and 302 Rules',
  about: {
    title: 'Need Apache Redirect Rules Without Rewriting .htaccess by Hand?',
    description: `You changed URLs, moved a site, switched to HTTPS, or decided whether the canonical domain should use www or non-www. The redirect logic has to be correct because it affects users, search engines, analytics, and every old link pointing at your site. One wrong \`.htaccess\` rule can create a redirect loop, a 500 error, or a long redirect chain that wastes crawl budget.\n\nThis .htaccess Redirect Generator creates practical Apache redirect rules for common SEO and migration work. You can force HTTPS, choose a canonical host, add or remove trailing slashes, and create custom 301 or 302 redirect rows from old paths to new destinations. The preview updates instantly, with optional comments so the output is easier to review before it reaches production.\n\nUse 301 redirects for permanent moves: old blog posts, service page slug changes, HTTP to HTTPS migration, www cleanup, deleted pages with a replacement, and full CMS migrations. Use 302 redirects for temporary tests, campaigns, maintenance paths, or short-lived routing where the original URL should keep its long-term identity. Keep the destination URL final, canonical, and already aligned with your [Sitemap.xml Generator](/sitemap-generator/) output.\n\nBefore deploying, back up the existing \`.htaccess\` file. Many Apache sites already use this file for WordPress routing, cache headers, security headers, or application rewrites. Add generated redirects carefully, test old URLs and canonical variants, and pair redirect work with the [Security Headers Generator](/security-headers-generator), [Robots.txt Generator](/robots-txt-generator/), and [Meta Tag Generator](/meta-tag-generator/) when you are doing a full technical SEO cleanup.\n\nThe generator mixes two Apache mechanisms and orders them deliberately. Site-wide normalization uses \`mod_rewrite\`: the HTTPS rule checks \`%{HTTPS} !=on\` and rewrites to the same host and path over TLS; the host rules use a negated \`^www\\.\` condition to force www, or capture everything after \`www.\` with a backreference (\`%1\`) to strip it for non-www; and the trailing-slash rules guard against redirecting real files or directories by testing \`%{REQUEST_FILENAME} !-f\` (add mode) or \`!-d\` (remove mode) first, so a request for \`/style.css\` is never redirected to \`/style.css/\`. These blocks are always emitted in the same fixed order — HTTPS, host, slash — so protocol and domain normalize before any path logic runs. Custom old-to-new rows instead use the simpler \`mod_alias\` \`Redirect\` directive rather than \`RewriteRule\`, sufficient for exact-path matches and easier to audit visually. Every "From" path is normalized to a leading slash automatically, and rows missing a from or to value are silently dropped rather than producing a broken rule.`,
  },
  features: [
    '**Apache .htaccess redirect output** - generate rules for hosts that support per-directory config',
    '**301 redirect rows** - move old URLs permanently to final canonical destinations',
    '**302 redirect rows** - create temporary redirects for tests, campaigns, or maintenance paths',
    '**Force HTTPS rewrite** - redirect HTTP traffic to secure HTTPS before page rules run',
    '**www and non-www canonical host rules** - normalize duplicate host versions site-wide',
    '**Trailing slash cleanup** - add or remove slashes to match your canonical URL style',
    '**Optional comments** - include readable labels above generated rule groups for easier review',
    '**Clean old path handling** - normalize custom From paths so they start with `/`',
    '**Copy or download .htaccess** - paste into hosting editor or save a ready file',
    '**Works with [Sitemap.xml Generator](/sitemap-generator/)** - keep redirect destinations and submitted URLs aligned',
    '**Pairs with [Security Headers Generator](/security-headers-generator)** - review related Apache config changes together',
    '**No upload required** - all redirect rule generation runs locally in your browser',
  ],
  howToUse: { type: 'steps', items: howToSteps },
  useCases: [
    { icon: 'FLOW', title: 'Redirect old URLs after a website migration', desc: 'Create direct 301 redirects from legacy pages to their final new locations after a CMS move, redesign, or slug cleanup. A clean URL map helps preserve SEO signals and prevents users from landing on 404 pages.' },
    { icon: 'SAFE', title: 'Force HTTPS on Apache hosting', desc: 'Generate the common RewriteCond and RewriteRule pattern that sends HTTP requests to HTTPS. Deploy this only after the SSL certificate works, then test important pages so users and crawlers reach the secure version consistently.' },
    { icon: 'WEB', title: 'Normalize www and non-www URL versions', desc: 'Choose one canonical host and redirect the other version to it. This avoids duplicate crawl paths and keeps canonical tags, sitemap URLs, backlinks, and analytics reporting pointed at the same hostname.' },
    { icon: 'CODE', title: 'Create temporary campaign redirects', desc: 'Use 302 redirects for short-lived campaign paths, event links, or maintenance routing where the source URL may return later. The tool keeps temporary redirects separate from permanent migration rows so intent stays clear.' },
    { icon: 'DOC', title: 'Clean up trailing slash duplicates', desc: 'Generate add-slash or remove-slash rules when your site has mixed URL styles. Match the rule to your internal links, canonical tags, and sitemap entries to avoid creating unnecessary redirects on every page.' },
    { icon: 'GLOBAL', title: 'Prepare a technical SEO redirect audit', desc: 'Use the preview as a readable redirect plan before deploying to Apache. Compare it with canonical metadata from [Meta Tag Generator](/meta-tag-generator/) and crawl discovery files from [Robots.txt Generator](/robots-txt-generator/) so the site sends consistent signals.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function HtaccessRedirectGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><HtaccessRedirectGeneratorTool /></div>
      <IndexOnly><AdSlot /><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
