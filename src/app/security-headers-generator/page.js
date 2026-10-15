import SecurityHeadersGeneratorTool from '@/components/SecurityHeadersGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/security-headers-generator.png';

export const metadata = {
  title: 'Security Headers Generator: CSP, HSTS & Permissions Free',
  description: 'Generate HTTP security headers: Content-Security-Policy, HSTS, Permissions-Policy, X-Frame-Options and more. Copy them as Apache, Nginx or Next.js config. Free.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/security-headers-generator/' },
  icons: { icon: '/icons/security-headers-generator.svg', shortcut: '/icons/security-headers-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/security-headers-generator/', siteName: 'webdevpuneet.com', title: 'Security Headers Generator', description: 'Generate security header configuration for Apache, Nginx, and Next.js.', images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Security Headers Generator by webdevpuneet.com' }] },
  twitter: { card: 'summary_large_image', title: 'Security Headers Generator', description: 'Generate CSP, HSTS, and security header configs.', images: [OG_IMAGE] },
};

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
  { '@type': 'Question', name: 'What security headers should I add to my website?', acceptedAnswer: { '@type': 'Answer', text: 'A solid baseline is Strict-Transport-Security (forces HTTPS), Content-Security-Policy (restricts where scripts/styles/images can load from), X-Content-Type-Options: nosniff (stops MIME-type sniffing), X-Frame-Options or frame-ancestors (blocks clickjacking), Referrer-Policy (limits referrer leakage), and Permissions-Policy (disables unused browser features like camera or geolocation). The Balanced preset in this tool sets all six with safe defaults; Strict tightens CSP and Permissions-Policy further.' } },
  { '@type': 'Question', name: 'Why is my Content-Security-Policy blocking inline scripts or styles?', acceptedAnswer: { '@type': 'Answer', text: 'CSP blocks inline <script> and <style> blocks by default unless your script-src or style-src explicitly allows \'unsafe-inline\'. The tool flags this in the diagnostics row — if "unsafe-inline" shows yes, any inline handlers or inline CSS will still execute, which weakens XSS protection. The safer fix is to move inline code into external files or use a nonce/hash, but if that is not feasible yet, keep \'unsafe-inline\' temporarily and tighten it later.' } },
  { '@type': 'Question', name: 'How do I test a CSP without breaking my live site?', acceptedAnswer: { '@type': 'Answer', text: 'Enable the CSP report-only toggle — this switches the header to Content-Security-Policy-Report-Only, which logs violations to the browser console without blocking any resource. Deploy it to production, open devtools on key pages, and check the Console and Network tabs for blocked-resource warnings. Once you have allow-listed every legitimate script, style, font, and embed your site actually uses, turn report-only off to enforce the policy for real.' } },
  { '@type': 'Question', name: 'What does the HSTS preload flag do, and can it be undone?', acceptedAnswer: { '@type': 'Answer', text: 'Strict-Transport-Security with preload tells browsers to hardcode your domain into a built-in HTTPS-only list shipped with the browser itself, so even the very first request never touches HTTP. This is stronger than a normal HSTS header, but it is hard to reverse — once submitted to the preload list, removal can take months to propagate across browsers. Only enable preload after confirming every subdomain reliably serves valid HTTPS.' } },
  { '@type': 'Question', name: 'How do I add security headers in Next.js?', acceptedAnswer: { '@type': 'Answer', text: 'Select the Next.js output format — the tool generates an async headers() function for next.config.js that returns a source/headers array matching every path. Paste it into your existing config (merge the headers array if you already export one) and redeploy; Next.js applies these headers at the edge or server layer on every matching route automatically.' } },
  { '@type': 'Question', name: 'What is the difference between security headers in Nginx and Apache?', acceptedAnswer: { '@type': 'Answer', text: 'Nginx uses add_header directives inside a server or location block, and needs the always flag so headers are also sent on error responses (4xx/5xx) — this tool includes always automatically. Apache uses Header always set directives inside .htaccess or a VirtualHost block. The header names and values are identical; only the server-specific syntax wrapping them differs, which is exactly what switching the output format changes.' } },
  { '@type': 'Question', name: 'Do static HTML sites need security headers, and how do I add them?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but plain static HTML files cannot set HTTP headers by themselves — headers must be sent by whatever serves the files: your web server, a reverse proxy, or a static host\'s edge config. If you self-host with Apache or Nginx, paste the generated snippet into .htaccess or your server block. On platforms like Vercel, Netlify, or Cloudflare Pages, use their headers configuration file/dashboard with the same header names and values.' } },
  { '@type': 'Question', name: 'What is frame-ancestors and how is it different from X-Frame-Options?', acceptedAnswer: { '@type': 'Answer', text: 'Both prevent clickjacking by controlling which sites can embed your page in an <iframe>, but frame-ancestors is the modern CSP directive and supports a list of allowed origins, while X-Frame-Options only supports DENY or SAMEORIGIN. Browsers that understand CSP prefer frame-ancestors when both are present. The Strict preset sets frame-ancestors \'none\' in the CSP; keep X-Frame-Options alongside it for older browsers that ignore CSP.' } },
] };

const softwareSchema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Security Headers Generator', applicationCategory: 'DeveloperApplication', operatingSystem: 'Any (browser-based)', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: 'https://webdevpuneet.com/security-headers-generator/' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
  { '@type': 'ListItem', position: 2, name: 'Security Headers Generator', item: 'https://webdevpuneet.com/security-headers-generator/' },
] };

const about = `Every browser request to your site arrives without any security guarantees unless your server explicitly adds them as HTTP response headers. This Security Headers Generator builds a complete, copy-ready header set — Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy — and formats it for Apache .htaccess, Nginx server blocks, or a Next.js headers() function, so you don't have to hand-translate the same six header names into three different config syntaxes.

**How the header set is assembled.** X-Content-Type-Options: nosniff is always included since it has no compatibility downside — it simply stops browsers from guessing a file's MIME type from its content, which closes off a class of MIME-sniffing attacks. The other headers are configurable: X-Frame-Options toggles between DENY and SAMEORIGIN, Referrer-Policy and Permissions-Policy take free-text values you edit directly, and HSTS can be switched off entirely for local development or staging environments that don't yet have HTTPS everywhere.

**Content-Security-Policy and the diagnostics row.** CSP is the most powerful and most failure-prone header here, so the tool surfaces three live diagnostics pulled straight from the policy you're editing: whether \`'unsafe-inline'\` is present (weakens protection against inline-script XSS), whether \`object-src 'none'\` is set (blocks legacy Flash/plugin-based attacks), and whether \`frame-ancestors\` is defined (the modern, origin-list-aware replacement for X-Frame-Options). Toggling CSP report-only switches the header name to Content-Security-Policy-Report-Only, which logs violations to the browser console instead of blocking resources — the safe way to discover what a new policy would break before it actually breaks it.

**Balanced vs. Strict presets.** The Balanced preset allows self-hosted scripts/styles plus \`'unsafe-inline'\` for styles and data:/https: images — a realistic starting point for sites with existing inline styling or third-party widgets. The Strict preset removes \`'unsafe-inline'\`, adds \`object-src 'none'\`, \`base-uri 'self'\`, \`frame-ancestors 'none'\`, and \`form-action 'self'\`, and locks Permissions-Policy down to nearly every sensor and capability. Applying a preset overwrites both the CSP and Permissions-Policy fields in one click, which you can then hand-edit to re-allow specific domains your site actually depends on.

**HSTS and why preload is a one-way door.** When enabled, HSTS is generated as \`max-age=31536000; includeSubDomains; preload\` — a full year, applied to every subdomain, with the preload flag requesting inclusion in browsers' built-in HTTPS-only list. preload is the strongest setting because it protects even the very first request a user ever makes to your domain, before any header could be read, but reversing it is slow: once a domain is baked into browser preload lists, removal can take months to roll out across releases. Confirm every subdomain serves valid HTTPS before turning it on.

**Output format differences.** Apache uses \`Header always set Name "value"\` lines for .htaccess or a VirtualHost block. Nginx uses \`add_header Name "value" always;\` — the \`always\` flag matters because, without it, Nginx skips the header on error responses like 404s and 500s. Next.js gets an async \`headers()\` function returning a \`source: '/(.*)'\` rule with a \`headers\` array, matching the exact shape \`next.config.js\` expects, ready to merge into an existing config or drop in as-is.`;

const SEO = {
  slug: 'security-headers-generator',
  title: 'Security Headers Generator',
  sections: [
    { type: '2col', left: { type: 'text', label: 'About this tool', heading: 'Generate HTTP security headers for Apache, Nginx, and Next.js', text: about }, right: { type: 'features', heading: 'Features', items: ['Generate Apache .htaccess, Nginx, and Next.js headers() output from one config', 'Balanced and Strict presets for CSP and Permissions-Policy', 'CSP report-only toggle to test policies without blocking resources', 'HSTS with includeSubDomains and preload, toggled independently', 'Configurable X-Frame-Options (DENY/SAMEORIGIN) and Referrer-Policy', 'Editable Content-Security-Policy and Permissions-Policy directive fields', 'Live diagnostics flag unsafe-inline, object-src none, and frame-ancestors', 'Copy to clipboard or download the generated config as a file', 'Pairs with the [.htaccess Redirect Generator](/htaccess-redirect-generator) for HTTPS canonicalization'] } },
    { type: 'steps', heading: 'How to Use', items: [
      { title: 'Choose your deployment target', text: 'Select Apache, Nginx, or Next.js so the output matches your hosting configuration.' },
      { title: 'Pick a baseline preset', text: 'Start with Balanced for most sites or Strict for apps that can handle tighter CSP rules.' },
      { title: 'Customize CSP and permissions', text: 'Add domains for real scripts, styles, images, fonts, APIs, and embeds used by your site.' },
      { title: 'Use report-only first', text: 'Deploy CSP in report-only mode before enforcing it on production traffic.' },
      { title: 'Copy and test', text: 'Apply the snippet on staging, then verify headers with browser devtools or an external header scanner.' },
    ] },
    { type: 'cards', heading: 'Common Use Cases', columns: 3, items: [
      { icon: 'SAFE', title: 'Add a baseline to a new website', desc: 'Generate common security headers before launching a static site, SaaS app, or marketing page.' },
      { icon: 'CODE', title: 'Create Next.js header config', desc: 'Copy a headers() function block for Next.js projects that need deployment-level security headers.' },
      { icon: 'WEB', title: 'Harden Apache or Nginx hosting', desc: 'Generate snippets for traditional hosting where headers are configured in .htaccess or server blocks — pair with the [.htaccess redirect generator](/htaccess-redirect-generator) for rewrites in the same file.' },
      { icon: 'CHECK', title: 'Test CSP safely before enforcing', desc: 'Use report-only mode to find blocked scripts and assets without breaking the live page.' },
      { icon: 'LOCK', title: 'Enable HTTPS-only behavior', desc: 'Add HSTS to tell browsers to access the site only over HTTPS after the first secure visit.' },
      { icon: 'LINK', title: 'Pair redirects with secure headers', desc: 'Use this with the [.htaccess Redirect Generator](/htaccess-redirect-generator) for canonical HTTPS and header configuration.' },
    ] },
    { type: 'faq', heading: 'Frequently Asked Questions', items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })) },
  ],
};

export default function SecurityHeadersGeneratorPage() {
  return <div className={styles.page}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><div className={styles.toolSection}><SecurityHeadersGeneratorTool /></div><IndexOnly><AdSlot /><SeoSection {...SEO} /></IndexOnly>

</div>;
}
