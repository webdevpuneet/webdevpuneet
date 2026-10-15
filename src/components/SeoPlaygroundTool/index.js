'use client';

import { useEffect, useMemo, useState } from 'react';
import s from './styles.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const DEFAULT_HTML = `<!doctype html>
<html lang="en">
<head>
  <title>SEO Checker - Audit Metadata, SERP, OG Tags & Schema</title>
  <meta name="description" content="Audit any URL or HTML for SEO before publishing. Check metadata, Google snippets, Open Graph tags, Twitter cards, canonical URLs, robots tags, headings, links, images, and JSON-LD.">
  <meta name="keywords" content="seo auditor, seo audit tool, free seo checker, google snippet preview, open graph preview, twitter card preview, json-ld tester, schema markup validator, robots meta tester, canonical url checker, structured data preview, technical seo tool, metadata checker, live serp preview">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://webdevpuneet.com/seo-checker/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://webdevpuneet.com/seo-checker/">
  <meta property="og:title" content="SEO Checker - Audit Metadata, SERP, OG Tags & Schema">
  <meta property="og:description" content="Audit Google search snippets, Open Graph tags, Twitter cards, canonical URLs, robots settings, and JSON-LD schema before publishing your website.">
  <meta property="og:image" content="https://webdevpuneet.com/images/seo-checker.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="SEO Checker - Audit and Preview Website Metadata">
  <meta property="og:site_name" content="webdevpuneet.com">
  <meta property="og:locale" content="en_US">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@webdevpuneet">
  <meta name="twitter:title" content="SEO Checker - Audit Metadata, SERP, OG Tags & Schema">
  <meta name="twitter:description" content="Free SEO checker to audit metadata, social previews, canonical URLs, robots tags, headings, and structured data.">
  <meta name="twitter:image" content="https://webdevpuneet.com/images/seo-checker.png">
  <link rel="shortcut icon" href="/icons/seo-checker.svg">
  <link rel="icon" href="/icons/seo-checker.svg">
  <meta name="author" content="Puneet Sharma">
  <link rel="author" href="https://www.webdevpuneet.com/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SEO Checker",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "url": "https://webdevpuneet.com/seo-checker/",
    "image": "https://webdevpuneet.com/images/seo-checker.png",
    "description": "Free SEO checker to audit any URL or HTML — metadata, Google snippets, Open Graph tags, Twitter cards, robots settings, canonical URLs, headings, links, and JSON-LD schema — before publishing.",
    "author": {
      "@type": "Person",
      "name": "Puneet Sharma",
      "url": "https://www.webdevpuneet.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "webdevpuneet.com",
      "url": "https://webdevpuneet.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
</head>
<body>
  <main>
    <h1>SEO Checker</h1>
    <p>SEO Checker helps developers, content teams, and freelancers audit search metadata before a page goes live. Enter a URL or paste an HTML document, then inspect how the page may appear in Google snippets, Open Graph cards, Twitter cards, and structured data previews — with a 0–100 score and concrete fixes.</p>
    <p>The workspace checks practical publishing details that are easy to miss during launch: title length, meta description length, canonical URLs, robots settings, heading structure, social image coverage, image alt text, internal links, external links, and JSON-LD schema. Each failed check includes a severity label and a concrete fix suggestion.</p>
    <p>Use the SERP tab to edit the search result title, description, and URL directly. Use the Social tab to confirm that the card image, title, description, and domain look correct. Use the Content, Links, and Images tabs to review body copy quality, anchor text, image attributes, and accessibility signals before publishing.</p>
    <p>The output panel exports clean metadata as HTML, Next.js metadata, React Helmet, Astro head markup, and JSON-LD. That makes the tool useful whether the page is built in a static site generator, a React application, a Next.js app, or a CMS template.</p>
    <img src="/images/seo-checker.png" alt="SEO Checker dashboard showing audit checks, social previews, and metadata output" width="1200" height="630" loading="lazy">
    <p>For focused tag generation, open the <a href="/meta-tag-generator/">Meta Tag Generator</a>. For structured data templates, use the <a href="/schema-markup-generator/">Schema Markup Generator</a>. For crawl rules, pair your page metadata with the <a href="/robots-txt-generator/">Robots.txt Generator</a> and a clean <a href="/sitemap-generator/">XML Sitemap Generator</a>.</p>
  </main>
</body>
</html>`;

const SECTIONS = [
  { id: 'audit', label: 'Audit' },
  { id: 'content', label: 'Content' },
  { id: 'links', label: 'Links' },
  { id: 'images', label: 'Images' },
  { id: 'serp', label: 'SERP' },
  { id: 'social', label: 'Social' },
  { id: 'schema', label: 'Schema' },
  { id: 'keyword', label: 'Keyword' },
  { id: 'crawl', label: 'Crawlability' },
  { id: 'report', label: 'Report' },
  { id: 'output', label: 'Output' },
];

const OUTPUT_TABS = [
  { id: 'html', label: 'HTML' },
  { id: 'next', label: 'Next.js' },
  { id: 'helmet', label: 'Helmet' },
  { id: 'astro', label: 'Astro' },
  { id: 'jsonld', label: 'JSON-LD' },
];

const DEFAULT_FIELDS = {
  title: 'SEO Checker - Audit Metadata, SERP, OG Tags & Schema',
  description: 'Audit SEO metadata before publishing. Check Google snippets, Open Graph tags, Twitter cards, canonical URLs, robots tags, headings, links, images, and JSON-LD.',
  url: 'https://webdevpuneet.com/seo-checker/',
  image: 'https://webdevpuneet.com/images/seo-checker.png',
  siteName: 'webdevpuneet.com',
  robots: 'index, follow',
  h1: 'SEO Checker',
  imageAlt: 'SEO Checker dashboard showing audit checks, social previews, and metadata output',
  schemaType: 'SoftwareApplication',
  author: 'Puneet Sharma',
  appCategory: 'DeveloperApplication',
  price: '0',
  currency: 'USD',
  productSku: 'seo-checker',
  businessName: 'webdevpuneet.com',
  businessAddress: 'Online',
  faqQuestion: 'What is the SEO Checker?',
  faqAnswer: 'The SEO Checker is a free browser-based tool for auditing SEO metadata, snippets, schema, links, images, and crawlability before publishing.',
};

const DEFAULT_URL = 'https://webdevpuneet.com/seo-checker/';
const SOCIAL_PLATFORMS = ['Facebook', 'X/Twitter', 'LinkedIn', 'Slack'];
const CMS_PRESETS = ['Next.js', 'Astro', 'WordPress', 'Shopify', 'Webflow', 'Static HTML'];

function getFetchCandidates(target) {
  const candidates = [];
  try {
    const parsed = new URL(target);
    if (typeof window !== 'undefined' && /(^|\.)webdevpuneet\.com$/i.test(parsed.hostname)) {
      candidates.push({
        label: 'local route',
        url: `${window.location.origin}${parsed.pathname}${parsed.search}`,
      });
    }
  } catch {}
  candidates.push(
    { label: 'direct fetch', url: target },
    { label: 'AllOrigins proxy', url: `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}` },
    { label: 'Codetabs proxy', url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(target)}` },
    { label: 'CORSProxy.io', url: `https://corsproxy.io/?${encodeURIComponent(target)}` },
  );
  return candidates;
}

function safeText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseAttrs(attrText) {
  const attrs = {};
  const re = /([:@\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let match;
  while ((match = re.exec(attrText || ''))) {
    attrs[match[1].toLowerCase()] = match[3] ?? match[4] ?? match[5] ?? '';
  }
  return attrs;
}

function stripTags(value) {
  return safeText(String(value || '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '));
}

function firstMatch(html, re) {
  const match = html.match(re);
  return safeText(match?.[1] || '');
}

function collectMatches(html, re, mapper) {
  const out = [];
  let match;
  while ((match = re.exec(html))) out.push(mapper(match));
  return out;
}

function parseHtml(html) {
  const meta = {};
  const og = {};
  const twitter = {};
  const linkTags = [];
  const metaTags = [];
  const links = [];
  const images = [];
  const jsonLd = [];

  collectMatches(html, /<meta\b([^>]*)>/gi, match => {
    const attrs = parseAttrs(match[1]);
    const name = attrs.name;
    const prop = attrs.property;
    const content = attrs.content || '';
    metaTags.push(attrs);
    if (name) meta[name.toLowerCase()] = content;
    if (prop?.startsWith('og:')) og[prop.slice(3)] = content;
    if (name?.startsWith('twitter:')) twitter[name.slice(8)] = content;
    return null;
  });

  collectMatches(html, /<link\b([^>]*)>/gi, match => {
    const attrs = parseAttrs(match[1]);
    linkTags.push(attrs);
    return null;
  });

  collectMatches(html, /<a\b([^>]*)>([\s\S]*?)<\/a>/gi, match => {
    const attrs = parseAttrs(match[1]);
    links.push({ ...attrs, text: stripTags(match[2]) });
    return null;
  });

  collectMatches(html, /<img\b([^>]*)>/gi, match => {
    const attrs = parseAttrs(match[1]);
    images.push(attrs);
    return null;
  });

  collectMatches(html, /<script\b([^>]*)>([\s\S]*?)<\/script>/gi, match => {
    const attrs = parseAttrs(match[1]);
    if ((attrs.type || '').toLowerCase() === 'application/ld+json') {
      const raw = match[2].trim();
      try { jsonLd.push(JSON.parse(raw)); }
      catch { jsonLd.push({ invalid: true, raw }); }
    }
    return null;
  });

  const headings = [1, 2, 3].reduce((acc, level) => {
    acc[`h${level}`] = collectMatches(html, new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi'), m => safeText(m[1].replace(/<[^>]+>/g, '')));
    return acc;
  }, {});
  const bodyHtml = firstMatch(html, /<body[^>]*>([\s\S]*?)<\/body>/i) || html;
  const paragraphs = collectMatches(bodyHtml, /<p\b[^>]*>([\s\S]*?)<\/p>/gi, m => stripTags(m[1])).filter(Boolean);
  const bodyText = stripTags(bodyHtml);
  const words = bodyText ? bodyText.split(/\s+/).filter(Boolean) : [];
  const allHeadings = [1, 2, 3].flatMap(level => headings[`h${level}`].map(text => ({ level, text })));
  const duplicateHeadings = allHeadings
    .map(item => item.text)
    .filter((text, idx, arr) => text && arr.indexOf(text) !== idx)
    .filter((text, idx, arr) => arr.indexOf(text) === idx);

  return {
    title: firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: meta.description || '',
    robots: meta.robots || '',
    canonical: linkTags.find(link => (link.rel || '').toLowerCase() === 'canonical')?.href || '',
    og,
    twitter,
    headings,
    content: {
      wordCount: words.length,
      firstParagraph: paragraphs[0] || '',
      paragraphCount: paragraphs.length,
      duplicateHeadings,
      emptyHeadings: allHeadings.filter(item => !item.text).length,
      outline: allHeadings,
    },
    linkTags,
    metaTags,
    links,
    images,
    jsonLd,
  };
}

function getIssues(data) {
  const titleLen = data.title.length;
  const descLen = data.description.length;
  const missingAlt = data.images.filter(img => !safeText(img.alt)).length;
  const internalLinks = data.links.filter(link => link.href && link.href.startsWith('/')).length;
  const externalLinks = data.links.filter(link => /^https?:\/\//i.test(link.href || '')).length;
  const canonicalTags = (data.linkTags || []).filter(link => (link.rel || '').toLowerCase() === 'canonical');
  const robotsTags = (data.metaTags || []).filter(tag => (tag.name || '').toLowerCase() === 'robots');
  const canonicalHost = getHostname(data.canonical);
  const ogHost = getHostname(data.og.url || '');
  const title = safeText(data.og.title || data.title);
  const description = safeText(data.og.description || data.description);
  const h1 = safeText(data.headings.h1[0] || '');
  const titleTerms = new Set(title.toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 3));
  const h1Terms = h1.toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 3);
  const h1Overlap = h1Terms.filter(word => titleTerms.has(word)).length;
  const titleDescDuplicate = title && description && title.toLowerCase() === description.toLowerCase();
  const robotsTokens = data.robots
    .toLowerCase()
    .split(',')
    .map(token => token.trim())
    .filter(Boolean);
  const validRobots = new Set([
    'index',
    'noindex',
    'follow',
    'nofollow',
    'none',
    'noarchive',
    'nosnippet',
    'noimageindex',
    'notranslate',
    'unavailable_after',
    'max-snippet',
    'max-image-preview',
    'max-video-preview',
  ]);
  const invalidRobots = robotsTokens.filter(token => !validRobots.has(token.split(':')[0]));
  const noindex = robotsTokens.includes('noindex') || robotsTokens.includes('none');

  const checks = [
    {
      label: 'Title tag',
      category: 'Metadata',
      severity: titleLen ? 'warning' : 'critical',
      ok: titleLen >= 30 && titleLen <= 60,
      detail: data.title ? `${titleLen} characters` : 'Missing title',
      fix: 'Keep the title specific and usually between 30 and 60 characters.',
      suggestion: data.title
        ? titleLen > 60 ? safeText(data.title).slice(0, 58) : `${safeText(data.title)} | Brand`
        : 'Write a page-specific title with the primary topic and brand.',
    },
    {
      label: 'Meta description',
      category: 'Metadata',
      severity: descLen ? 'warning' : 'critical',
      ok: descLen >= 90 && descLen <= 160,
      detail: data.description ? `${descLen} characters` : 'Missing description',
      fix: 'Write a useful 90-160 character summary with the page promise.',
      suggestion: data.description
        ? descLen > 160 ? safeText(data.description).slice(0, 157) + '...' : `${safeText(data.description)} Add the main benefit or next step.`
        : 'Summarize what this page offers, who it helps, and why it is useful in one clear sentence.',
    },
    {
      label: 'Canonical URL',
      category: 'Crawlability',
      severity: 'critical',
      ok: Boolean(data.canonical) && canonicalTags.length <= 1 && (!canonicalHost || !ogHost || canonicalHost === ogHost),
      detail: data.canonical || 'Missing canonical',
      fix: canonicalTags.length > 1
        ? 'Keep only one canonical URL on the page.'
        : canonicalHost && ogHost && canonicalHost !== ogHost
          ? 'Canonical URL and og:url should use the same canonical host.'
          : 'Add a canonical URL that points to the preferred HTTPS page.',
      suggestion: data.og.url || 'https://example.com/preferred-page/',
    },
    {
      label: 'Robots directive',
      category: 'Crawlability',
      severity: noindex || invalidRobots.length ? 'critical' : 'warning',
      ok: Boolean(data.robots) && robotsTags.length <= 1 && !noindex && invalidRobots.length === 0,
      detail: data.robots || 'Missing robots meta',
      fix: robotsTags.length > 1
        ? 'Keep one robots meta tag so crawler instructions are unambiguous.'
        : invalidRobots.length
        ? `Remove or correct invalid robots directive${invalidRobots.length === 1 ? '' : 's'}: ${invalidRobots.join(', ')}.`
        : noindex ? 'Remove noindex before publishing a page that should rank.' : 'Use index, follow for indexable pages.',
      suggestion: 'index, follow',
    },
    {
      label: 'Single H1',
      category: 'Content',
      severity: data.headings.h1.length === 0 ? 'critical' : 'warning',
      ok: data.headings.h1.length === 1 && (!h1 || !title || h1Overlap > 0),
      detail: `${data.headings.h1.length} H1 found`,
      fix: data.headings.h1.length === 1 && h1Overlap === 0 && title
        ? 'Align the H1 with the title so the page topic is consistent.'
        : 'Use one clear H1 that matches the page intent.',
      suggestion: data.title || data.og.title || 'Use one descriptive page heading.',
    },
    {
      label: 'Social card metadata',
      category: 'Social',
      severity: 'warning',
      ok: Boolean((data.og.title || data.title) && (data.og.description || data.description) && data.og.image && data.og['image:width'] && data.og['image:height'] && (data.twitter.image || data.og.image)),
      detail: data.og.image ? 'OG image present' : 'OG image missing',
      fix: !data.og.image
        ? 'Add og:title, og:description, and a 1200x630 og:image.'
        : !data.og['image:width'] || !data.og['image:height']
          ? 'Add og:image:width and og:image:height so social platforms can size the card reliably.'
          : !data.twitter.image ? 'Add twitter:image or reuse the Open Graph image.' : 'Complete the social card metadata.',
      suggestion: data.og.image || 'https://example.com/images/social-card.png',
    },
    {
      label: 'Metadata uniqueness',
      category: 'Metadata',
      severity: titleDescDuplicate ? 'warning' : 'opportunity',
      ok: !titleDescDuplicate,
      detail: titleDescDuplicate ? 'Title and description are identical' : 'Title and description are distinct',
      fix: 'Use the title for the short page label and the description for a fuller page summary.',
      suggestion: 'Rewrite the description as a benefit-focused sentence instead of repeating the title.',
    },
    {
      label: 'Image alt text',
      category: 'Images',
      severity: missingAlt > 3 ? 'warning' : 'opportunity',
      ok: missingAlt === 0,
      detail: `${missingAlt} image${missingAlt === 1 ? '' : 's'} missing alt`,
      fix: 'Add descriptive alt text to meaningful images. Use empty alt only for decorative images.',
      suggestion: 'Describe the meaningful image content in plain language.',
    },
    {
      label: 'Structured data',
      category: 'Schema',
      severity: data.jsonLd.some(item => item.invalid) ? 'warning' : 'opportunity',
      ok: data.jsonLd.length > 0 && !data.jsonLd.some(item => item.invalid),
      detail: data.jsonLd.length ? `${data.jsonLd.length} JSON-LD block${data.jsonLd.length === 1 ? '' : 's'}` : 'No JSON-LD found',
      fix: 'Add JSON-LD that matches the page type, such as Article, Product, FAQPage, or SoftwareApplication.',
      suggestion: 'Start with WebPage, Article, Product, FAQPage, or SoftwareApplication schema.',
    },
    {
      label: 'Link signals',
      category: 'Links',
      severity: 'opportunity',
      ok: internalLinks + externalLinks > 0,
      detail: `${internalLinks} internal, ${externalLinks} external`,
      fix: 'Include useful crawlable links to related pages and references.',
      suggestion: 'Add internal links to related pages and external links only when they support the content.',
    },
  ];

  return checks;
}

function clampText(text, max) {
  const clean = safeText(text);
  return clean.length > max ? `${clean.slice(0, max - 1)}...` : clean;
}

function getHost(value) {
  try {
    const url = value?.startsWith('http') ? value : `https://${value || 'example.com'}`;
    return new URL(url).hostname || 'example.com';
  } catch {
    return 'example.com';
  }
}

function getHostname(value) {
  try {
    if (!value) return '';
    const url = value.startsWith('http') ? value : `https://${value}`;
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function urlHasNoPart(value, part) {
  try {
    if (!value) return false;
    return !new URL(value)[part];
  } catch {
    return false;
  }
}

function getImageSrc(value) {
  const clean = String(value || '').trim().replace(/\\\//g, '/');
  if (!clean) return '';
  try {
    const url = clean.startsWith('//') ? `https:${clean}` : clean;
    if (url.startsWith('/')) return url;
    const parsed = new URL(url);
    if (parsed.hostname === 'webdevpuneet.com' || parsed.hostname === 'www.webdevpuneet.com') {
      return `${parsed.pathname}${parsed.search}`;
    }
    return parsed.href;
  } catch {
    return clean;
  }
}

function jsVal(value, depth = 0) {
  const pad = '  '.repeat(depth);
  const inner = '  '.repeat(depth + 1);
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    return `[\n${value.map(item => `${inner}${jsVal(item, depth + 1)}`).join(',\n')},\n${pad}]`;
  }
  const entries = Object.entries(value).filter(([, val]) =>
    val !== undefined && val !== null && val !== '' &&
    !(Array.isArray(val) && val.length === 0)
  );
  if (!entries.length) return '{}';
  return `{\n${entries.map(([key, val]) => `${inner}${key}: ${jsVal(val, depth + 1)}`).join(',\n')},\n${pad}}`;
}

function createJsonLd(data) {
  const title = data.og.title || data.title;
  const description = data.og.description || data.description;
  const url = data.canonical || data.og.url || '';
  const image = data.og.image || data.twitter.image || '';
  const existing = data.jsonLd.find(item => !item.invalid);
  if (existing) return existing;
  return {
    '@context': 'https://schema.org',
    '@type': data.schemaType || 'WebPage',
    name: title,
    description,
    url,
    image,
  };
}

function createSchemaFromFields(fields) {
  const base = {
    '@context': 'https://schema.org',
    '@type': fields.schemaType,
    name: fields.title,
    description: fields.description,
    url: fields.url,
    image: fields.image,
  };
  if (fields.schemaType === 'SoftwareApplication') {
    return {
      ...base,
      applicationCategory: fields.appCategory,
      operatingSystem: 'Web Browser',
      author: fields.author ? { '@type': 'Person', name: fields.author } : undefined,
      offers: { '@type': 'Offer', price: fields.price || '0', priceCurrency: fields.currency || 'USD' },
    };
  }
  if (fields.schemaType === 'Article' || fields.schemaType === 'BlogPosting') {
    return {
      ...base,
      headline: fields.title,
      author: fields.author ? { '@type': 'Person', name: fields.author } : undefined,
      publisher: { '@type': 'Organization', name: fields.siteName },
    };
  }
  if (fields.schemaType === 'Product') {
    return {
      ...base,
      sku: fields.productSku,
      brand: { '@type': 'Brand', name: fields.siteName },
      offers: { '@type': 'Offer', price: fields.price || '0', priceCurrency: fields.currency || 'USD', availability: 'https://schema.org/InStock' },
    };
  }
  if (fields.schemaType === 'FAQPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [{
        '@type': 'Question',
        name: fields.faqQuestion,
        acceptedAnswer: { '@type': 'Answer', text: fields.faqAnswer },
      }],
    };
  }
  if (fields.schemaType === 'LocalBusiness') {
    return {
      ...base,
      '@type': 'LocalBusiness',
      address: fields.businessAddress,
    };
  }
  if (fields.schemaType === 'BreadcrumbList') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: getHostname(fields.url) ? `${new URL(fields.url).origin}/` : fields.url },
        { '@type': 'ListItem', position: 2, name: fields.title, item: fields.url },
      ],
    };
  }
  return base;
}

function genHtmlOutput(data) {
  const title = data.og.title || data.title;
  const description = data.og.description || data.description;
  const image = data.og.image || data.twitter.image || '';
  const url = data.canonical || data.og.url || '';
  return [
    '<!-- SEO Checker output -->',
    title ? `<title>${escapeHtml(title)}</title>` : '',
    description ? `<meta name="description" content="${escapeAttr(description)}" />` : '',
    `<meta name="robots" content="${escapeAttr(data.robots || 'index, follow')}" />`,
    url ? `<link rel="canonical" href="${escapeAttr(url)}" />` : '',
    `<meta property="og:type" content="${escapeAttr(data.og.type || 'website')}" />`,
    url ? `<meta property="og:url" content="${escapeAttr(url)}" />` : '',
    title ? `<meta property="og:title" content="${escapeAttr(title)}" />` : '',
    description ? `<meta property="og:description" content="${escapeAttr(description)}" />` : '',
    image ? `<meta property="og:image" content="${escapeAttr(image)}" />` : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    title ? `<meta name="twitter:title" content="${escapeAttr(title)}" />` : '',
    description ? `<meta name="twitter:description" content="${escapeAttr(description)}" />` : '',
    image ? `<meta name="twitter:image" content="${escapeAttr(image)}" />` : '',
  ].filter(Boolean).join('\n');
}

function genNextOutput(data) {
  const title = data.og.title || data.title;
  const description = data.og.description || data.description;
  const image = data.og.image || data.twitter.image || '';
  const url = data.canonical || data.og.url || '';
  const obj = {
    title,
    description,
    robots: data.robots || 'index, follow',
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: data.og.type || 'website',
      url,
      title,
      description,
      siteName: data.og.site_name || data.siteName,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
  return `export const metadata = ${jsVal(obj)};`;
}

function genHelmetOutput(data) {
  return [
    'import { Helmet } from "react-helmet-async";',
    '',
    '<Helmet>',
    genHtmlOutput(data).split('\n').filter(line => !line.startsWith('<!--')).map(line => `  ${line}`).join('\n'),
    '</Helmet>',
  ].join('\n');
}

function genAstroOutput(data) {
  const title = data.og.title || data.title;
  const description = data.og.description || data.description;
  return [
    '---',
    `const title = ${JSON.stringify(title)};`,
    `const description = ${JSON.stringify(description)};`,
    '---',
    '<head>',
    genHtmlOutput(data)
      .split('\n')
      .filter(line => !line.startsWith('<!--') && !line.startsWith('<title>') && !line.includes('name="description"'))
      .map(line => `  ${line}`)
      .join('\n'),
    '  <title>{title}</title>',
    '  <meta name="description" content={description} />',
    '</head>',
  ].join('\n');
}

function genOutput(data, tab) {
  if (tab === 'next') return genNextOutput(data);
  if (tab === 'helmet') return genHelmetOutput(data);
  if (tab === 'astro') return genAstroOutput(data);
  if (tab === 'jsonld') return JSON.stringify(createJsonLd(data), null, 2);
  return genHtmlOutput(data);
}

function buildDataFromFields(fields) {
  const jsonLd = createSchemaFromFields(fields);
  return {
    title: fields.title,
    description: fields.description,
    robots: fields.robots,
    canonical: fields.url,
    siteName: fields.siteName,
    schemaType: fields.schemaType,
    og: {
      type: 'website',
      url: fields.url,
      title: fields.title,
      description: fields.description,
      image: fields.image,
      'image:width': fields.image ? '1200' : '',
      'image:height': fields.image ? '630' : '',
      site_name: fields.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: fields.title,
      description: fields.description,
      image: fields.image,
    },
    headings: { h1: fields.h1 ? [fields.h1] : [], h2: [], h3: [] },
    content: {
      wordCount: fields.description.split(/\s+/).filter(Boolean).length,
      firstParagraph: fields.description,
      paragraphCount: fields.description ? 1 : 0,
      duplicateHeadings: [],
      emptyHeadings: fields.h1 ? 0 : 1,
      outline: fields.h1 ? [{ level: 1, text: fields.h1 }] : [],
    },
    linkTags: fields.url ? [{ rel: 'canonical', href: fields.url }] : [],
    metaTags: fields.robots ? [{ name: 'robots', content: fields.robots }] : [],
    links: [],
    images: fields.image ? [{ src: fields.image, alt: fields.imageAlt }] : [],
    jsonLd: [JSON.parse(JSON.stringify(jsonLd, (key, value) => value === undefined ? undefined : value))],
  };
}

function fieldsFromData(data, previous = DEFAULT_FIELDS) {
  const title = data.og.title || data.title || previous.title;
  const description = data.og.description || data.description || previous.description;
  const url = data.canonical || data.og.url || previous.url;
  const image = data.og.image || data.twitter.image || previous.image;
  return {
    ...previous,
    title,
    description,
    url,
    image,
    siteName: data.og.site_name || data.siteName || previous.siteName,
    robots: data.robots || previous.robots,
    h1: data.headings.h1[0] || title,
    imageAlt: data.images.find(img => safeText(img.alt))?.alt || previous.imageAlt,
    schemaType: data.jsonLd.find(item => !item.invalid)?.['@type'] || data.schemaType || previous.schemaType,
  };
}

function SnippetBar({ label, value, goodMin, goodMax }) {
  const max = Math.max(goodMax + 28, 1);
  const pct = Math.min(100, Math.round((value / max) * 100));
  const state = value < goodMin ? 'short' : value <= goodMax ? 'good' : 'long';
  return (
    <div className={s.snippetBar}>
      <div className={s.snippetBarTop}>
        <span>{label}</span>
        <strong>{state === 'good' ? 'good' : state === 'short' ? 'short' : 'likely truncated'}</strong>
      </div>
      <div className={s.snippetTrack}>
        <div className={`${s.snippetFill} ${s['snippet_' + state]}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function measureTextPx(text, font = '20px Arial') {
  if (typeof document === 'undefined') return text.length * 9;
  const canvas = measureTextPx.canvas || (measureTextPx.canvas = document.createElement('canvas'));
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  return Math.round(ctx.measureText(text || '').width);
}

function PixelBar({ label, value, maxPx, font }) {
  const px = measureTextPx(value, font);
  const pct = Math.min(100, Math.round((px / maxPx) * 100));
  const state = px <= maxPx * 0.72 ? 'short' : px <= maxPx ? 'good' : 'long';
  return (
    <div className={s.snippetBar}>
      <div className={s.snippetBarTop}>
        <span>{label}</span>
        <strong>{px}px / {maxPx}px</strong>
      </div>
      <div className={s.snippetTrack}>
        <div className={`${s.snippetFill} ${s['snippet_' + state]}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function isGenericAnchor(text) {
  return /^(click here|here|read more|learn more|more|link)$/i.test(safeText(text));
}

function getLinkKind(href) {
  if (!href) return 'missing';
  if (href.startsWith('#')) return 'fragment';
  if (href.startsWith('/')) return 'internal';
  if (/^https?:\/\//i.test(href)) return 'external';
  return 'relative';
}

function getReportData(data, checks, score) {
  const failed = checks.filter(check => !check.ok);
  const linkFlags = data.links.map(link => {
    const flags = [
      !link.href ? 'missing href' : '',
      !safeText(link.text) ? 'empty text' : '',
      isGenericAnchor(link.text) ? 'generic text' : '',
      link.target === '_blank' && !/noopener/i.test(link.rel || '') ? 'missing noopener' : '',
      /nofollow/i.test(link.rel || '') ? 'nofollow' : '',
    ].filter(Boolean);
    return { text: link.text || '(empty)', href: link.href || '(missing)', type: getLinkKind(link.href || ''), flags };
  });
  const imageFlags = data.images.map(img => {
    const flags = [
      safeText(img.alt) ? '' : 'missing alt',
      img.width && img.height ? '' : 'missing dimensions',
      img.loading ? '' : 'loading not set',
    ].filter(Boolean);
    return { src: img.src || '(missing src)', alt: img.alt || '(missing)', flags };
  });
  return {
    score,
    title: data.og.title || data.title,
    description: data.og.description || data.description,
    canonical: data.canonical,
    robots: data.robots,
    failed,
    content: data.content,
    links: linkFlags,
    images: imageFlags,
    schemaTypes: data.jsonLd.map(item => item.invalid ? 'Invalid JSON-LD' : item['@type'] || 'Unknown').filter(Boolean),
  };
}

function getScoreBreakdown(checks) {
  const groups = ['Metadata', 'Crawlability', 'Content', 'Social', 'Schema', 'Links', 'Images'];
  return groups.map(name => {
    const items = checks.filter(check => check.category === name);
    const passed = items.filter(check => check.ok).length;
    return {
      name,
      total: items.length,
      passed,
      score: items.length ? Math.round((passed / items.length) * 100) : 100,
    };
  });
}

function genMarkdownReport(report) {
  return [
    '# SEO Checker Report',
    '',
    `Score: ${report.score}%`,
    '',
    '## Metadata',
    `- Title: ${report.title || '(missing)'}`,
    `- Description: ${report.description || '(missing)'}`,
    `- Canonical: ${report.canonical || '(missing)'}`,
    `- Robots: ${report.robots || '(missing)'}`,
    '',
    '## Open Issues',
    report.failed.length
      ? report.failed.map(check => `- [${check.severity.toUpperCase()}] ${check.label}: ${check.fix} Suggested: ${check.suggestion}`).join('\n')
      : '- No open audit issues.',
    '',
    '## Content',
    `- Words: ${report.content.wordCount}`,
    `- Paragraphs: ${report.content.paragraphCount}`,
    `- Headings: ${report.content.outline.length}`,
    `- Duplicate headings: ${report.content.duplicateHeadings.length ? report.content.duplicateHeadings.join(', ') : 'none'}`,
    '',
    '## Links',
    report.links.length
      ? report.links.map(link => `- ${link.text} -> ${link.href} (${link.type}${link.flags.length ? `; ${link.flags.join(', ')}` : '; ok'})`).join('\n')
      : '- No body links found.',
    '',
    '## Images',
    report.images.length
      ? report.images.map(img => `- ${img.src} | alt: ${img.alt} | ${img.flags.length ? img.flags.join(', ') : 'ok'}`).join('\n')
      : '- No body images found.',
    '',
    '## Schema',
    report.schemaTypes.length ? report.schemaTypes.map(type => `- ${type}`).join('\n') : '- No JSON-LD schema found.',
  ].join('\n');
}

export default function SeoPlaygroundTool() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [mode, setMode] = useState('html');
  const [urlInput, setUrlInput] = useState(DEFAULT_URL);
  const [urlStatus, setUrlStatus] = useState('');
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [outputTab, setOutputTab] = useState('html');
  const [socialPlatform, setSocialPlatform] = useState('Facebook');
  const [cmsPreset, setCmsPreset] = useState('Next.js');
  const [keyword, setKeyword] = useState('seo playground');
  const [imageFailed, setImageFailed] = useState(false);
  const [active, setActive] = useState('audit');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const data = useMemo(() => mode === 'build' ? buildDataFromFields(fields) : parseHtml(html), [fields, html, mode]);
  const checks = useMemo(() => getIssues(data), [data]);
  const passed = checks.filter(check => check.ok).length;
  const score = Math.round((passed / checks.length) * 100);
  const scoreBreakdown = useMemo(() => getScoreBreakdown(checks), [checks]);
  const output = useMemo(() => genOutput(data, outputTab), [data, outputTab]);
  const report = useMemo(() => getReportData(data, checks, score), [checks, data, score]);
  const markdownReport = useMemo(() => genMarkdownReport(report), [report]);

  const copyOutput = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };
  const fetchUrl = async () => {
    const raw = urlInput.trim();
    if (!raw) {
      setUrlStatus('Enter a URL first.');
      return;
    }
    const target = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    setIsFetchingUrl(true);
    setUrlStatus('Fetching page HTML...');
    try {
      let text = '';
      let loadedBy = '';
      let lastError = '';
      const candidates = getFetchCandidates(target);
      for (const candidate of candidates) {
        try {
          setUrlStatus(`Trying ${candidate.label}...`);
          const res = await fetch(candidate.url, { redirect: 'follow' });
          const contentType = res.headers.get('content-type') || '';
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          if (contentType && !contentType.includes('text/html') && !contentType.includes('text/plain')) {
            throw new Error(`Expected HTML, got ${contentType}`);
          }
          const candidateText = await res.text();
          if (!/<html|<head|<meta|<title/i.test(candidateText)) {
            throw new Error('No HTML metadata found in response');
          }
          text = candidateText;
          loadedBy = candidate.label;
          break;
        } catch (err) {
          lastError = `${candidate.label}: ${err.message || 'failed'}`;
        }
      }
      if (!text) throw new Error(lastError || 'All fetch methods failed');
      setHtml(text);
      setMode('html');
      setActive('audit');
      setUrlStatus(`Loaded via ${loadedBy}`);
    } catch (err) {
      setUrlStatus(`Could not fetch URL. ${err.message || 'The site may block browser access.'}`);
    } finally {
      setIsFetchingUrl(false);
    }
  };
  const copyReport = () => {
    navigator.clipboard.writeText(markdownReport).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };
  const downloadText = (content, filename, type = 'text/plain') => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const title = data.og.title || data.title || 'Untitled page';
  const description = data.og.description || data.description || 'No description found.';
  const displayUrl = data.canonical || data.og.url || 'https://example.com/';
  const socialImage = data.og.image || data.twitter.image || '';
  const socialImageSrc = getImageSrc(socialImage);
  const updateField = (key, value) => setFields(prev => ({ ...prev, [key]: value }));
  const updateImageField = (value) => {
    setImageFailed(false);
    updateField('image', value);
  };
  const updateSerpField = (key, value) => {
    if (mode !== 'build') {
      setMode('build');
      setFields(prev => ({ ...fieldsFromData(data, prev), [key]: value }));
      return;
    }
    updateField(key, value);
  };
  const applyFix = (check) => {
    setMode('build');
    setFields(prev => {
      const next = fieldsFromData(data, prev);
      if (check.label === 'Title tag') next.title = check.suggestion;
      if (check.label === 'Meta description' || check.label === 'Metadata uniqueness') next.description = check.suggestion;
      if (check.label === 'Canonical URL') next.url = data.og.url || data.canonical || prev.url || DEFAULT_URL;
      if (check.label === 'Robots directive') next.robots = 'index, follow';
      if (check.label === 'Single H1') next.h1 = next.title;
      if (check.label === 'Social card metadata') next.image = data.og.image || data.twitter.image || prev.image || DEFAULT_FIELDS.image;
      if (check.label === 'Image alt text') next.imageAlt = next.title ? `${next.title} preview image` : DEFAULT_FIELDS.imageAlt;
      if (check.label === 'Structured data') next.schemaType = prev.schemaType || 'WebPage';
      return next;
    });
    if (check.label === 'Social card metadata') setImageFailed(false);
  };
  const loadSample = () => {
    setHtml(DEFAULT_HTML);
    setFields(DEFAULT_FIELDS);
    setImageFailed(false);
  };

  useEffect(() => {
    setImageFailed(false);
  }, [socialImageSrc]);

  return (
    <div className={s.wrap}>
      <SeoMetaToolsTopNav active="seo-checker" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <span className={s.headerTitle}>SEO <span className={s.accent}>Checker</span></span>
          <span className={s.headerBreadcrumb}>{active.toUpperCase()} / {passed} of {checks.length} checks passing</span>
        </div>
        <div className={s.headerRight}>
          <button className={s.toolBtn} onClick={loadSample}>Sample</button>
          <button className={s.toolBtn} onClick={copyOutput}>{copied ? 'Copied' : 'Copy Output'}</button>
        </div>
      </header>

      <div className={s.body}>
        {sidebarOpen ? (
          <aside className={s.sidebar}>
            <div className={s.sidebarTop}>
              <span className={s.sidebarPill}><span className={s.sidebarPillDot} />Workspace</span>
              <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">Hide</button>
            </div>
            <div className={s.sidebarMode}>
              <div className={s.modeToggle} aria-label="Input mode">
                <button className={mode === 'html' ? s.modeActive : ''} onClick={() => setMode('html')}>Paste HTML</button>
                <button className={mode === 'build' ? s.modeActive : ''} onClick={() => setMode('build')}>Build Metadata</button>
              </div>
            </div>
            <div className={s.urlCheck}>
              <label htmlFor="seo-url-input">Check by URL</label>
              <div className={s.urlInputRow}>
                <input
                  id="seo-url-input"
                  value={urlInput}
                  onChange={event => setUrlInput(event.target.value)}
                  onKeyDown={event => { if (event.key === 'Enter') fetchUrl(); }}
                  placeholder="https://example.com/page"
                />
                <button onClick={fetchUrl} disabled={isFetchingUrl}>{isFetchingUrl ? '...' : 'Go'}</button>
              </div>
              <small className={s.urlHint}>Works best with public pages. If a site blocks browser fetches, paste View Source HTML.</small>
              {urlStatus && <p>{urlStatus}</p>}
            </div>
            <div className={s.scorePanel}>
              <div className={s.scorePanelTop}>
                <div>
                  <span>SEO score</span>
                  <strong>{score}%</strong>
                </div>
                <i><b style={{ width: `${score}%` }} /></i>
              </div>
              <div className={s.scoreBreakdown}>
                {scoreBreakdown.map(group => (
                  <button key={group.name} onClick={() => {
                    const map = { Metadata: 'audit', Crawlability: 'crawl', Content: 'content', Social: 'social', Schema: 'schema', Links: 'links', Images: 'images' };
                    setActive(map[group.name] || 'audit');
                  }}>
                    <span>{group.name}</span>
                    <strong>{group.score}%</strong>
                    <i><b style={{ width: `${group.score}%` }} /></i>
                  </button>
                ))}
              </div>
            </div>
            <nav className={s.lessonList}>
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  className={`${s.lessonBtn} ${active === section.id ? s.lessonBtnActive : ''}`}
                  onClick={() => setActive(section.id)}
                >
                  <span className={s.lessonDot} />
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>
        ) : (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>Open</button>
        )}

        <main className={s.main}>
          <section className={s.conceptPanel}>
            <div>
              <h2>{SECTIONS.find(section => section.id === active)?.label}</h2>
              <p>Paste a page's HTML, then review search snippets, social cards, metadata, headings, links, images, and structured data in one workspace.</p>
            </div>
            <div className={s.statStrip}>
              <span>{mode === 'build' ? 'manual' : 'parsed'}</span>
              <span>{data.headings.h1.length} H1</span>
              <span>{data.images.length} images</span>
              <span>{data.links.length} links</span>
              <span>{data.jsonLd.length} schema</span>
            </div>
          </section>

          <section className={s.workbench}>
            <div className={s.editorPane}>
              <div className={s.paneHeader}>
                <span>{mode === 'build' ? 'Metadata Builder' : 'HTML Source'}</span>
                <span>{mode === 'build' ? `${fields.title.length}/${fields.description.length}` : `${html.length.toLocaleString()} chars`}</span>
              </div>
              {mode === 'build' ? (
                <div className={s.builderForm}>
                  <label className={s.field}>
                    <span>Title</span>
                    <input value={fields.title} onChange={event => updateField('title', event.target.value)} />
                    <small>{fields.title.length} characters</small>
                  </label>
                  <label className={s.field}>
                    <span>Description</span>
                    <textarea value={fields.description} onChange={event => updateField('description', event.target.value)} />
                    <small>{fields.description.length} characters</small>
                  </label>
                  <label className={s.field}>
                    <span>Canonical URL</span>
                    <input value={fields.url} onChange={event => updateField('url', event.target.value)} />
                  </label>
                  <label className={s.field}>
                    <span>OG / Twitter Image</span>
                    <input value={fields.image} onChange={event => updateImageField(event.target.value)} />
                  </label>
                  <div className={s.twoCols}>
                    <label className={s.field}>
                      <span>Site Name</span>
                      <input value={fields.siteName} onChange={event => updateField('siteName', event.target.value)} />
                    </label>
                    <label className={s.field}>
                      <span>Robots</span>
                      <select value={fields.robots} onChange={event => updateField('robots', event.target.value)}>
                        <option value="index, follow">index, follow</option>
                        <option value="noindex, follow">noindex, follow</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, nofollow">noindex, nofollow</option>
                      </select>
                    </label>
                  </div>
                  <label className={s.field}>
                    <span>H1</span>
                    <input value={fields.h1} onChange={event => updateField('h1', event.target.value)} />
                  </label>
                  <label className={s.field}>
                    <span>Image Alt</span>
                    <input value={fields.imageAlt} onChange={event => updateField('imageAlt', event.target.value)} />
                  </label>
                  <div className={s.twoCols}>
                    <label className={s.field}>
                      <span>Schema Type</span>
                      <select value={fields.schemaType} onChange={event => updateField('schemaType', event.target.value)}>
                        <option>WebPage</option>
                        <option>Article</option>
                        <option>BlogPosting</option>
                        <option>Product</option>
                        <option>FAQPage</option>
                        <option>SoftwareApplication</option>
                        <option>LocalBusiness</option>
                      </select>
                    </label>
                    <label className={s.field}>
                      <span>Author</span>
                      <input value={fields.author} onChange={event => updateField('author', event.target.value)} />
                    </label>
                  </div>
                </div>
              ) : (
                <textarea
                  className={s.editor}
                  value={html}
                  onChange={event => setHtml(event.target.value)}
                  spellCheck="false"
                />
              )}
            </div>

            <div className={s.previewPane}>
              {active === 'audit' && (
                <div className={s.auditView}>
                  <div className={s.auditGrid}>
                    {checks.map(check => (
                      <article
                        key={check.label}
                        className={`${s.checkCard} ${check.ok ? s.checkOk : s.checkFail} ${s['severity_' + check.severity]}`}
                      >
                        <div className={s.checkTop}>
                          <strong>{check.label}</strong>
                          <span>{check.ok ? 'Pass' : check.severity}</span>
                        </div>
                        <p>{check.detail}</p>
                        {!check.ok && <small>{check.fix}</small>}
                      </article>
                    ))}
                  </div>
                  <div className={s.fixPanel}>
                    <div className={s.fixPanelHeader}>
                      <strong>Fix Suggestions</strong>
                      <span>{checks.filter(check => !check.ok).length} open</span>
                    </div>
                    {checks.filter(check => !check.ok).length ? checks.filter(check => !check.ok).map(check => (
                      <article key={check.label} className={s.fixItem}>
                        <span className={`${s.severityPill} ${s['pill_' + check.severity]}`}>{check.severity}</span>
                        <div>
                          <strong>{check.label}</strong>
                          <p>{check.fix}</p>
                          <code>{check.suggestion}</code>
                          <button className={s.applyFixBtn} onClick={() => applyFix(check)}>Apply fix</button>
                        </div>
                      </article>
                    )) : (
                      <div className={s.emptyState}>All current audit checks are passing.</div>
                    )}
                  </div>
                </div>
              )}

              {active === 'content' && (
                <div className={s.insightPanel}>
                  <div className={s.summaryGrid}>
                    <article><strong>{data.content.wordCount}</strong><span>words</span></article>
                    <article><strong>{data.content.paragraphCount}</strong><span>paragraphs</span></article>
                    <article><strong>{data.content.outline.length}</strong><span>headings</span></article>
                    <article><strong>{data.content.duplicateHeadings.length}</strong><span>duplicates</span></article>
                  </div>
                  <div className={s.contentCards}>
                    <article className={s.infoCard}>
                      <strong>First Paragraph</strong>
                      <p>{data.content.firstParagraph || 'No paragraph text found.'}</p>
                    </article>
                    <article className={s.infoCard}>
                      <strong>Heading Outline</strong>
                      {data.content.outline.length ? (
                        <ul className={s.outlineList}>
                          {data.content.outline.map((item, idx) => (
                            <li key={`${item.level}-${idx}`} style={{ paddingLeft: `${(item.level - 1) * 14}px` }}>
                              <span>H{item.level}</span>{item.text || 'Empty heading'}
                            </li>
                          ))}
                        </ul>
                      ) : <p>No H1-H3 headings found.</p>}
                    </article>
                    <article className={s.infoCard}>
                      <strong>Content Flags</strong>
                      <ul className={s.flagList}>
                        <li className={data.content.wordCount >= 300 ? s.flagOk : s.flagWarn}>{data.content.wordCount >= 300 ? 'Enough body copy for a basic page.' : 'Thin content warning: fewer than 300 words found.'}</li>
                        <li className={data.content.firstParagraph ? s.flagOk : s.flagWarn}>{data.content.firstParagraph ? 'Intro paragraph detected.' : 'Missing intro paragraph.'}</li>
                        <li className={data.content.duplicateHeadings.length ? s.flagWarn : s.flagOk}>{data.content.duplicateHeadings.length ? `Duplicate headings: ${data.content.duplicateHeadings.join(', ')}` : 'No duplicate H1-H3 headings found.'}</li>
                      </ul>
                    </article>
                  </div>
                </div>
              )}

              {active === 'links' && (
                <div className={s.tablePanel}>
                  <div className={s.tableHeader}>
                    <strong>Link Audit</strong>
                    <span>{data.links.length} links found</span>
                  </div>
                  {data.links.length ? (
                    <div className={s.auditTable}>
                      <div className={s.tableRowHead}><span>Anchor</span><span>URL</span><span>Type</span><span>Flags</span></div>
                      {data.links.map((link, idx) => {
                        const href = link.href || '';
                        const flags = [
                          !href ? 'missing href' : '',
                          !safeText(link.text) ? 'empty text' : '',
                          isGenericAnchor(link.text) ? 'generic text' : '',
                          link.target === '_blank' && !/noopener/i.test(link.rel || '') ? 'missing noopener' : '',
                          /nofollow/i.test(link.rel || '') ? 'nofollow' : '',
                        ].filter(Boolean);
                        return (
                          <div key={`${href}-${idx}`} className={s.tableRow}>
                            <span>{link.text || '(empty)'}</span>
                            <code>{href || '(missing)'}</code>
                            <span>{getLinkKind(href)}</span>
                            <span>{flags.length ? flags.join(', ') : 'ok'}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : <div className={s.emptyState}>No anchor links found in the page body.</div>}
                </div>
              )}

              {active === 'images' && (
                <div className={s.tablePanel}>
                  <div className={s.tableHeader}>
                    <strong>Image Audit</strong>
                    <span>{data.images.length} images found</span>
                  </div>
                  {data.images.length ? (
                    <div className={s.imageGrid}>
                      {data.images.map((img, idx) => {
                        const src = getImageSrc(img.src || '');
                        const flags = [
                          safeText(img.alt) ? '' : 'missing alt',
                          img.width && img.height ? '' : 'missing dimensions',
                          img.loading ? '' : 'loading not set',
                        ].filter(Boolean);
                        return (
                          <article key={`${img.src}-${idx}`} className={s.imageCard}>
                            <div className={s.imageThumb}>{src ? <img src={src} alt="" /> : <span>No src</span>}</div>
                            <div className={s.imageMeta}>
                              <code>{img.src || '(missing src)'}</code>
                              <p><strong>Alt:</strong> {img.alt || '(missing)'}</p>
                              <p><strong>Flags:</strong> {flags.length ? flags.join(', ') : 'ok'}</p>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : <div className={s.emptyState}>No images found in the page body.</div>}
                </div>
              )}

              {active === 'serp' && (
                <div className={s.serpWrap}>
                  <div className={s.googleCard}>
                    <input
                      className={s.serpUrlInput}
                      value={displayUrl}
                      onChange={event => updateSerpField('url', event.target.value)}
                      aria-label="SERP URL"
                    />
                    <textarea
                      className={s.serpTitleInput}
                      value={title}
                      onChange={event => updateSerpField('title', event.target.value)}
                      aria-label="SERP title"
                      rows={2}
                    />
                    <textarea
                      className={s.serpDescriptionInput}
                      value={description}
                      onChange={event => updateSerpField('description', event.target.value)}
                      aria-label="SERP description"
                      rows={3}
                    />
                  </div>
                  <div className={s.lengthGrid}>
                    <span>Title: {title.length} characters</span>
                    <span>Description: {description.length} characters</span>
                    <span>Canonical: {data.canonical ? 'present' : 'missing'}</span>
                  </div>
                  <div className={s.snippetBars}>
                    <SnippetBar label="Title width" value={title.length} goodMin={30} goodMax={60} />
                    <SnippetBar label="Description width" value={description.length} goodMin={90} goodMax={160} />
                    <PixelBar label="Desktop title pixels" value={title} maxPx={580} font="20px Arial" />
                    <PixelBar label="Mobile title pixels" value={title} maxPx={430} font="18px Arial" />
                    <PixelBar label="Description pixels" value={description} maxPx={920} font="13px Arial" />
                  </div>
                </div>
              )}

              {active === 'social' && (
                <div className={s.socialPanel}>
                  <div className={s.platformTabs}>
                    {SOCIAL_PLATFORMS.map(platform => (
                      <button key={platform} className={socialPlatform === platform ? s.platformActive : ''} onClick={() => setSocialPlatform(platform)}>{platform}</button>
                    ))}
                  </div>
                  <div className={`${s.socialPreview} ${s['social_' + socialPlatform.replace(/\W+/g, '')]}`}>
                    <div className={s.socialImage}>
                      {socialImageSrc && !imageFailed ? (
                        <img
                          key={socialImageSrc}
                          src={socialImageSrc}
                          alt={title}
                          onLoad={() => setImageFailed(false)}
                          onError={() => setImageFailed(true)}
                        />
                      ) : (
                        <span>{socialImage || 'No image'}</span>
                      )}
                    </div>
                    <div className={s.socialBody}>
                      <span>{socialPlatform} · {getHost(displayUrl)}</span>
                      <strong>{clampText(title, socialPlatform === 'X/Twitter' ? 64 : 78)}</strong>
                      <p>{clampText(description, socialPlatform === 'Slack' ? 150 : 120)}</p>
                    </div>
                  </div>
                </div>
              )}

              {active === 'schema' && (
                <div className={s.schemaWorkbench}>
                  <div className={s.schemaBuilder}>
                    <div className={s.tableHeader}><strong>Schema Builder 2.0</strong><span>{fields.schemaType}</span></div>
                    <div className={s.schemaFields}>
                      <label className={s.field}><span>Schema Type</span><select value={fields.schemaType} onChange={event => { setMode('build'); updateField('schemaType', event.target.value); }}><option>WebPage</option><option>Article</option><option>BlogPosting</option><option>Product</option><option>FAQPage</option><option>SoftwareApplication</option><option>LocalBusiness</option><option>BreadcrumbList</option></select></label>
                      <label className={s.field}><span>Name / Headline</span><input value={fields.title} onChange={event => updateField('title', event.target.value)} /></label>
                      <label className={s.field}><span>Description</span><textarea value={fields.description} onChange={event => updateField('description', event.target.value)} /></label>
                      {(fields.schemaType === 'SoftwareApplication' || fields.schemaType === 'Product') && <div className={s.twoCols}><label className={s.field}><span>Price</span><input value={fields.price} onChange={event => updateField('price', event.target.value)} /></label><label className={s.field}><span>Currency</span><input value={fields.currency} onChange={event => updateField('currency', event.target.value)} /></label></div>}
                      {fields.schemaType === 'FAQPage' && <><label className={s.field}><span>Question</span><input value={fields.faqQuestion} onChange={event => updateField('faqQuestion', event.target.value)} /></label><label className={s.field}><span>Answer</span><textarea value={fields.faqAnswer} onChange={event => updateField('faqAnswer', event.target.value)} /></label></>}
                      {fields.schemaType === 'LocalBusiness' && <><label className={s.field}><span>Business Name</span><input value={fields.businessName} onChange={event => updateField('businessName', event.target.value)} /></label><label className={s.field}><span>Address</span><input value={fields.businessAddress} onChange={event => updateField('businessAddress', event.target.value)} /></label></>}
                    </div>
                  </div>
                  <div className={s.schemaList}>
                    <article className={s.schemaCard}>
                      <span>Generated from builder</span>
                      <strong>{fields.schemaType}</strong>
                      <pre>{JSON.stringify(createSchemaFromFields(fields), null, 2)}</pre>
                    </article>
                    {data.jsonLd.length ? data.jsonLd.map((item, idx) => (
                      <article key={idx} className={s.schemaCard}>
                        <span>Parsed JSON-LD #{idx + 1}</span>
                        <strong>{item.invalid ? 'Invalid JSON' : item['@type'] || 'Unknown type'}</strong>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                      </article>
                    )) : <div className={s.emptyState}>No JSON-LD block found in the pasted HTML.</div>}
                  </div>
                </div>
              )}

              {active === 'keyword' && (
                <div className={s.insightPanel}>
                  <div className={s.keywordBox}>
                    <label className={s.field}><span>Target Keyword</span><input value={keyword} onChange={event => setKeyword(event.target.value)} placeholder="primary keyword" /></label>
                  </div>
                  <div className={s.auditGrid}>
                    {[
                      ['Title', title],
                      ['H1', data.headings.h1.join(' ')],
                      ['Description', description],
                      ['First paragraph', data.content.firstParagraph],
                      ['Headings', data.content.outline.map(item => item.text).join(' ')],
                    ].map(([label, source]) => {
                      const ok = keyword && safeText(source).toLowerCase().includes(keyword.toLowerCase());
                      return <article key={label} className={`${s.checkCard} ${ok ? s.checkOk : s.checkFail} ${ok ? '' : s.severity_opportunity}`}><div className={s.checkTop}><strong>{label}</strong><span>{ok ? 'Found' : 'Missing'}</span></div><p>{ok ? `Keyword appears in ${label.toLowerCase()}.` : `Add "${keyword}" naturally if it matches the page intent.`}</p></article>;
                    })}
                  </div>
                </div>
              )}

              {active === 'crawl' && (
                <div className={s.auditGrid}>
                  {[
                    ['HTTPS canonical', /^https:\/\//i.test(data.canonical), data.canonical || 'Missing canonical'],
                    ['No query in canonical', urlHasNoPart(data.canonical, 'search'), data.canonical || 'Missing canonical'],
                    ['No hash in canonical', urlHasNoPart(data.canonical, 'hash'), data.canonical || 'Missing canonical'],
                    ['Indexable robots', !/noindex|none/i.test(data.robots || ''), data.robots || 'Missing robots'],
                    ['Followable robots', !/nofollow|none/i.test(data.robots || ''), data.robots || 'Missing robots'],
                    ['Canonical matches OG host', !getHostname(data.canonical) || !getHostname(data.og.url || '') || getHostname(data.canonical) === getHostname(data.og.url || ''), `${getHostname(data.canonical)} / ${getHostname(data.og.url || '')}`],
                  ].map(([label, ok, detail]) => <article key={label} className={`${s.checkCard} ${ok ? s.checkOk : s.checkFail} ${ok ? '' : s.severity_critical}`}><div className={s.checkTop}><strong>{label}</strong><span>{ok ? 'Pass' : 'Fix'}</span></div><p>{detail}</p></article>)}
                </div>
              )}

              {active === 'report' && (
                <div className={s.reportPanel}>
                  <div className={s.reportHeader}>
                    <div>
                      <strong>SEO Report</strong>
                      <span>{score}% score · {report.failed.length} open issue{report.failed.length === 1 ? '' : 's'}</span>
                    </div>
                    <div className={s.reportActions}>
                      <button onClick={copyReport}>{copied ? 'Copied' : 'Copy Markdown'}</button>
                      <button onClick={() => downloadText(markdownReport, 'seo-report.md', 'text/markdown')}>Download .md</button>
                      <button onClick={() => downloadText(JSON.stringify(report, null, 2), 'seo-report.json', 'application/json')}>Download .json</button>
                    </div>
                  </div>
                  <div className={s.reportSummary}>
                    <article><strong>{report.failed.length}</strong><span>open issues</span></article>
                    <article><strong>{report.content.wordCount}</strong><span>words</span></article>
                    <article><strong>{report.links.length}</strong><span>links</span></article>
                    <article><strong>{report.images.length}</strong><span>images</span></article>
                  </div>
                  <pre className={s.reportPreview}>{markdownReport}</pre>
                </div>
              )}

              {active === 'output' && (
                <div className={s.outputPanel}>
                  <div className={s.cmsPreset}>
                    <label>CMS / Framework preset</label>
                    <select value={cmsPreset} onChange={event => setCmsPreset(event.target.value)}>
                      {CMS_PRESETS.map(preset => <option key={preset}>{preset}</option>)}
                    </select>
                    <p>{{
                      'Next.js': 'Paste the Next.js output into app/page.js as export const metadata, and render JSON-LD with a script tag in the page component.',
                      'Astro': 'Paste Astro output into the page frontmatter/head area, or move it into a reusable SEO component.',
                      'WordPress': 'Use HTML output in your SEO plugin custom fields or theme head hook. Add JSON-LD through a schema plugin or wp_head.',
                      'Shopify': 'Add HTML output to theme.liquid or the relevant template head. Use Liquid variables for product/page-specific values.',
                      'Webflow': 'Paste HTML tags into Page Settings > Custom Code > Inside head tag. Add JSON-LD in the same head block.',
                      'Static HTML': 'Paste HTML output directly inside the document head before publishing.',
                    }[cmsPreset]}</p>
                  </div>
                  <div className={s.outputTabs}>
                    {OUTPUT_TABS.map(tab => (
                      <button
                        key={tab.id}
                        className={outputTab === tab.id ? s.outputTabActive : ''}
                        onClick={() => setOutputTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <pre className={s.outputBlock}>{output}</pre>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
