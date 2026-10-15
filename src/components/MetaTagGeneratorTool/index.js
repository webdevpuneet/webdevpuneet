'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import styles from './styles.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

/* ─── Helpers ───────────────────────────────────────────────────── */
function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len - 1) + '…' : str;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeTwitterHandle(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('@')) return trimmed;
  return `@${trimmed.replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, '').replace(/^@+/, '')}`;
}

function getDomain(url) {
  try { return new URL(url.startsWith('http') ? url : 'https://' + url).hostname; }
  catch { return url || 'example.com'; }
}

function getBreadcrumb(url) {
  try {
    const u = new URL(url.startsWith('http') ? url : 'https://' + url);
    const parts = u.pathname.split('/').filter(Boolean);
    return [u.hostname, ...parts].join(' › ');
  } catch { return url || 'example.com'; }
}

/* Generates clean JS object literal (no quoted keys) */
function jsVal(v, d = 0) {
  const p = '  '.repeat(d);
  const i = '  '.repeat(d + 1);
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    return `[\n${v.map(x => `${i}${jsVal(x, d + 1)}`).join(',\n')},\n${p}]`;
  }
  const entries = Object.entries(v).filter(([, val]) =>
    val !== undefined && val !== null && val !== '' &&
    !(Array.isArray(val) && !val.length)
  );
  if (!entries.length) return '{}';
  return `{\n${entries.map(([k, val]) => `${i}${k}: ${jsVal(val, d + 1)}`).join(',\n')},\n${p}}`;
}

/* ─── Page types ────────────────────────────────────────────────── */
const PAGE_TYPES = [
  { id:'blog',    label:'Blog Post',    ogType:'article',  schemaType:'BlogPosting' },
  { id:'article', label:'Article',      ogType:'article',  schemaType:'Article'     },
  { id:'product', label:'Product',      ogType:'product',  schemaType:'Product'     },
  { id:'home',    label:'Homepage',     ogType:'website',  schemaType:'WebSite'     },
  { id:'about',   label:'About',        ogType:'website',  schemaType:'AboutPage'   },
  { id:'landing', label:'Landing Page', ogType:'website',  schemaType:'WebPage'     },
  { id:'service', label:'Service',      ogType:'website',  schemaType:'Service'     },
];

const PREVIEW_TABS = ['Google', 'Facebook', 'Twitter'];
const CODE_TABS    = ['HTML', 'Next.js', 'React Helmet', 'Vue / Nuxt', 'Astro', 'JSON-LD', 'OG Only'];

/* ─── Code generators ───────────────────────────────────────────── */
function genHTML({ title, description, keywords, url, imageUrl, siteName, author,
                   pubDate, modDate, robotsContent, ogType, twitterHandle }) {
  const L = [];
  const titleText = escapeHtml(title);
  const titleAttr = escapeAttr(title);
  const descAttr = escapeAttr(description);
  const keywordsAttr = escapeAttr(keywords);
  const urlAttr = escapeAttr(url);
  const imageAttr = escapeAttr(imageUrl);
  const siteNameAttr = escapeAttr(siteName);
  const authorAttr = escapeAttr(author);
  const twitterAttr = escapeAttr(twitterHandle);
  L.push('<!-- Primary Meta Tags -->');
  if (title)       { L.push(`<title>${titleText}</title>`); L.push(`<meta name="title" content="${titleAttr}" />`); }
  if (description) L.push(`<meta name="description" content="${descAttr}" />`);
  if (keywords)    L.push(`<meta name="keywords" content="${keywordsAttr}" />`);
  if (author)      L.push(`<meta name="author" content="${authorAttr}" />`);
  L.push(`<meta name="robots" content="${robotsContent}" />`);
  if (url)         L.push(`<link rel="canonical" href="${urlAttr}" />`);
  L.push('', '<!-- Open Graph / Facebook -->');
  L.push(`<meta property="og:type" content="${ogType}" />`);
  if (url)         L.push(`<meta property="og:url" content="${urlAttr}" />`);
  if (title)       L.push(`<meta property="og:title" content="${titleAttr}" />`);
  if (description) L.push(`<meta property="og:description" content="${descAttr}" />`);
  if (imageUrl)    L.push(`<meta property="og:image" content="${imageAttr}" />`);
  if (imageUrl)    L.push(`<meta property="og:image:width" content="1200" />`);
  if (imageUrl)    L.push(`<meta property="og:image:height" content="630" />`);
  if (siteName)    L.push(`<meta property="og:site_name" content="${siteNameAttr}" />`);
  if (pubDate)     L.push(`<meta property="article:published_time" content="${escapeAttr(pubDate)}" />`);
  if (modDate)     L.push(`<meta property="article:modified_time" content="${escapeAttr(modDate)}" />`);
  L.push('', '<!-- Twitter / X -->');
  L.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (twitterHandle) L.push(`<meta name="twitter:site" content="${twitterAttr}" />`);
  if (url)         L.push(`<meta name="twitter:url" content="${urlAttr}" />`);
  if (title)       L.push(`<meta name="twitter:title" content="${titleAttr}" />`);
  if (description) L.push(`<meta name="twitter:description" content="${descAttr}" />`);
  if (imageUrl)    L.push(`<meta name="twitter:image" content="${imageAttr}" />`);
  return L.join('\n');
}

function genNextJs({ title, description, keywords, url, imageUrl, siteName, author,
                     pubDate, modDate, robotsIndex, robotsFollow, ogType, twitterHandle }) {
  const obj = {};
  if (title)       obj.title = title;
  if (description) obj.description = description;
  if (keywords)    obj.keywords = keywords.split(',').map(k => k.trim()).filter(Boolean);
  if (author)      obj.authors = [{ name: author }];
  obj.robots = { index: robotsIndex, follow: robotsFollow };
  if (url)         obj.alternates = { canonical: url };
  const og = { type: ogType };
  if (url)         og.url = url;
  if (title)       og.title = title;
  if (description) og.description = description;
  if (siteName)    og.siteName = siteName;
  if (imageUrl)    og.images = [{ url: imageUrl, width: 1200, height: 630, alt: title || '' }];
  if (pubDate)     og.publishedTime = pubDate;
  if (modDate)     og.modifiedTime = modDate;
  if (author)      og.authors = [author];
  obj.openGraph = og;
  const tw = { card: 'summary_large_image' };
  if (twitterHandle) tw.site = twitterHandle;
  if (title)       tw.title = title;
  if (description) tw.description = description;
  if (imageUrl)    tw.images = [imageUrl];
  obj.twitter = tw;
  return `export const metadata = ${jsVal(obj)};`;
}

function genHelmet({ title, description, keywords, url, imageUrl, siteName,
                     robotsContent, ogType, twitterHandle }) {
  const L = [`import { Helmet } from 'react-helmet-async';`, '', '<Helmet>'];
  if (title)       { L.push(`  <title>${escapeHtml(title)}</title>`); L.push(`  <meta name="title" content="${escapeAttr(title)}" />`); }
  if (description) L.push(`  <meta name="description" content="${escapeAttr(description)}" />`);
  if (keywords)    L.push(`  <meta name="keywords" content="${escapeAttr(keywords)}" />`);
  L.push(`  <meta name="robots" content="${robotsContent}" />`);
  if (url)         L.push(`  <link rel="canonical" href="${escapeAttr(url)}" />`);
  L.push(`  <meta property="og:type" content="${ogType}" />`);
  if (url)         L.push(`  <meta property="og:url" content="${escapeAttr(url)}" />`);
  if (title)       L.push(`  <meta property="og:title" content="${escapeAttr(title)}" />`);
  if (description) L.push(`  <meta property="og:description" content="${escapeAttr(description)}" />`);
  if (imageUrl)    L.push(`  <meta property="og:image" content="${escapeAttr(imageUrl)}" />`);
  if (siteName)    L.push(`  <meta property="og:site_name" content="${escapeAttr(siteName)}" />`);
  L.push(`  <meta name="twitter:card" content="summary_large_image" />`);
  if (twitterHandle) L.push(`  <meta name="twitter:site" content="${escapeAttr(twitterHandle)}" />`);
  if (title)       L.push(`  <meta name="twitter:title" content="${escapeAttr(title)}" />`);
  if (description) L.push(`  <meta name="twitter:description" content="${escapeAttr(description)}" />`);
  if (imageUrl)    L.push(`  <meta name="twitter:image" content="${escapeAttr(imageUrl)}" />`);
  L.push('</Helmet>');
  return L.join('\n');
}

function genVue({ title, description, keywords, url, imageUrl, siteName,
                  robotsContent, ogType, twitterHandle }) {
  const metas = [];
  if (description) metas.push(`    { name: 'description', content: ${jsVal(description)} }`);
  if (keywords)    metas.push(`    { name: 'keywords', content: ${jsVal(keywords)} }`);
  metas.push(`    { name: 'robots', content: ${jsVal(robotsContent)} }`);
  metas.push(`    { property: 'og:type', content: ${jsVal(ogType)} }`);
  if (url)         metas.push(`    { property: 'og:url', content: ${jsVal(url)} }`);
  if (title)       metas.push(`    { property: 'og:title', content: ${jsVal(title)} }`);
  if (description) metas.push(`    { property: 'og:description', content: ${jsVal(description)} }`);
  if (imageUrl)    metas.push(`    { property: 'og:image', content: ${jsVal(imageUrl)} }`);
  if (siteName)    metas.push(`    { property: 'og:site_name', content: ${jsVal(siteName)} }`);
  metas.push(`    { name: 'twitter:card', content: 'summary_large_image' }`);
  if (twitterHandle) metas.push(`    { name: 'twitter:site', content: ${jsVal(twitterHandle)} }`);
  if (title)       metas.push(`    { name: 'twitter:title', content: ${jsVal(title)} }`);
  if (description) metas.push(`    { name: 'twitter:description', content: ${jsVal(description)} }`);
  if (imageUrl)    metas.push(`    { name: 'twitter:image', content: ${jsVal(imageUrl)} }`);
  const L = ['<script setup>', `import { useHead } from '@vueuse/head';`, '', 'useHead({'];
  if (title) L.push(`  title: ${jsVal(title)},`);
  if (url)   L.push(`  link: [{ rel: 'canonical', href: ${jsVal(url)} }],`);
  L.push('  meta: [', metas.join(',\n'), '  ],', '});', '</script>');
  return L.join('\n');
}

function genAstro({ title, description, keywords, url, imageUrl, siteName,
                    robotsContent, ogType, twitterHandle }) {
  const L = ['---', `const title = ${JSON.stringify(title || '')};`, `const description = ${JSON.stringify(description || '')};`, '---', '<head>'];
  L.push('  <meta charset="utf-8" />');
  L.push('  <meta name="viewport" content="width=device-width, initial-scale=1" />');
  if (title)       L.push('  <title>{title}</title>');
  if (description) L.push('  <meta name="description" content={description} />');
  if (keywords)    L.push(`  <meta name="keywords" content="${escapeAttr(keywords)}" />`);
  L.push(`  <meta name="robots" content="${robotsContent}" />`);
  if (url)         L.push(`  <link rel="canonical" href="${escapeAttr(url)}" />`);
  L.push(`  <meta property="og:type" content="${ogType}" />`);
  if (url)         L.push(`  <meta property="og:url" content="${escapeAttr(url)}" />`);
  L.push('  <meta property="og:title" content={title} />');
  L.push('  <meta property="og:description" content={description} />');
  if (imageUrl)    L.push(`  <meta property="og:image" content="${escapeAttr(imageUrl)}" />`);
  if (siteName)    L.push(`  <meta property="og:site_name" content="${escapeAttr(siteName)}" />`);
  L.push('  <meta name="twitter:card" content="summary_large_image" />');
  if (twitterHandle) L.push(`  <meta name="twitter:site" content="${escapeAttr(twitterHandle)}" />`);
  L.push('  <meta name="twitter:title" content={title} />');
  L.push('  <meta name="twitter:description" content={description} />');
  if (imageUrl)    L.push(`  <meta name="twitter:image" content="${escapeAttr(imageUrl)}" />`);
  L.push('</head>');
  return L.join('\n');
}

function genJsonLD({ title, description, url, imageUrl, siteName, author,
                     pubDate, modDate, schemaType }) {
  const schema = { '@context': 'https://schema.org', '@type': schemaType };
  const org = siteName ? { '@type': 'Organization', name: siteName } : undefined;
  if (['Article', 'BlogPosting', 'NewsArticle'].includes(schemaType)) {
    if (title) schema.headline = title;
    if (description) schema.description = description;
    if (url) schema.url = url;
    if (imageUrl) schema.image = imageUrl;
    if (author) schema.author = { '@type': 'Person', name: author };
    if (org) schema.publisher = org;
    if (pubDate) schema.datePublished = pubDate;
    if (modDate) schema.dateModified = modDate;
  } else if (schemaType === 'Product') {
    if (title) schema.name = title;
    if (description) schema.description = description;
    if (url) schema.url = url;
    if (imageUrl) schema.image = imageUrl;
    if (org) schema.brand = org;
  } else if (schemaType === 'Service') {
    if (title) schema.name = title;
    if (description) schema.description = description;
    if (url) schema.url = url;
    if (imageUrl) schema.image = imageUrl;
    if (org) schema.provider = org;
  } else {
    if (title || siteName) schema.name = title || siteName;
    if (description) schema.description = description;
    if (url) schema.url = url;
    if (imageUrl) schema.image = imageUrl;
    if (org && schemaType !== 'WebSite') schema.publisher = org;
  }
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

function genOGOnly({ title, description, url, imageUrl, siteName, ogType, twitterHandle }) {
  const L = ['<!-- Open Graph / Facebook -->'];
  L.push(`<meta property="og:type" content="${ogType}" />`);
  if (url)         L.push(`<meta property="og:url" content="${url}" />`);
  if (title)       L.push(`<meta property="og:title" content="${title}" />`);
  if (description) L.push(`<meta property="og:description" content="${description}" />`);
  if (imageUrl)    L.push(`<meta property="og:image" content="${imageUrl}" />`);
  if (imageUrl)    L.push(`<meta property="og:image:width" content="1200" />`);
  if (imageUrl)    L.push(`<meta property="og:image:height" content="630" />`);
  if (siteName)    L.push(`<meta property="og:site_name" content="${siteName}" />`);
  L.push('', '<!-- Twitter / X Card -->');
  L.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (twitterHandle) L.push(`<meta name="twitter:site" content="${twitterHandle}" />`);
  if (url)         L.push(`<meta name="twitter:url" content="${url}" />`);
  if (title)       L.push(`<meta name="twitter:title" content="${title}" />`);
  if (description) L.push(`<meta name="twitter:description" content="${description}" />`);
  if (imageUrl)    L.push(`<meta name="twitter:image" content="${imageUrl}" />`);
  return L.join('\n');
}

function parseMetaHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const meta = (selector, attr = 'content') => doc.querySelector(selector)?.getAttribute(attr) || '';
  return {
    title: doc.querySelector('title')?.textContent || meta('meta[name="title"]'),
    desc: meta('meta[name="description"]') || meta('meta[property="og:description"]'),
    keywords: meta('meta[name="keywords"]'),
    url: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || meta('meta[property="og:url"]'),
    imageUrl: meta('meta[property="og:image"]') || meta('meta[name="twitter:image"]'),
    siteName: meta('meta[property="og:site_name"]'),
    twHandle: meta('meta[name="twitter:site"]'),
    robots: meta('meta[name="robots"]'),
  };
}

/* ─── Char counter ──────────────────────────────────────────────── */
function CharBar({ len, max, goodMin }) {
  const pct = Math.min(100, (len / max) * 100);
  const cls = len > max ? styles.barOver : len >= goodMin ? styles.barGood : styles.barWarn;
  return (
    <div className={styles.charBarWrap}>
      <div className={`${styles.charBarFill} ${cls}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const STORAGE_KEY = 'wdp-meta-tag-generator-v1';

const DEFAULTS = {
  pageType: 'blog',
  title: '', desc: '', url: '', imageUrl: '',
  siteName: '', author: '', pubDate: '', modDate: '',
  keywords: '', twHandle: '',
  rIndex: true, rFollow: true,
};

/* ─── Main component ─────────────────────────────────────────────── */
export default function MetaTagGeneratorTool() {
  const hydrated  = useRef(false);
  const saveTimer = useRef(null);

  const [pageType,  setPageType]  = useState(DEFAULTS.pageType);
  const [title,     setTitle]     = useState(DEFAULTS.title);
  const [desc,      setDesc]      = useState(DEFAULTS.desc);
  const [url,       setUrl]       = useState(DEFAULTS.url);
  const [imageUrl,  setImageUrl]  = useState(DEFAULTS.imageUrl);
  const [siteName,  setSiteName]  = useState(DEFAULTS.siteName);
  const [author,    setAuthor]    = useState(DEFAULTS.author);
  const [pubDate,   setPubDate]   = useState(DEFAULTS.pubDate);
  const [modDate,   setModDate]   = useState(DEFAULTS.modDate);
  const [keywords,  setKeywords]  = useState(DEFAULTS.keywords);
  const [twHandle,  setTwHandle]  = useState(DEFAULTS.twHandle);
  const [rIndex,    setRIndex]    = useState(DEFAULTS.rIndex);
  const [rFollow,   setRFollow]   = useState(DEFAULTS.rFollow);
  const [previewTab, setPreviewTab] = useState('Google');
  const [codeTab,    setCodeTab]    = useState('HTML');
  const [copied,     setCopied]     = useState(false);
  const [saveState,  setSaveState]  = useState('idle');
  const [imageInfo, setImageInfo] = useState(null);

  const pt = PAGE_TYPES.find(p => p.id === pageType) || PAGE_TYPES[0];
  const robotsContent = `${rIndex ? 'index' : 'noindex'}, ${rFollow ? 'follow' : 'nofollow'}`;
  const domain     = getDomain(url);
  const breadcrumb = getBreadcrumb(url);

  const genData = useMemo(() => ({
    title, description: desc, keywords, url, imageUrl, siteName,
    author, pubDate, modDate, robotsContent, robotsIndex: rIndex, robotsFollow: rFollow,
    ogType: pt.ogType, schemaType: pt.schemaType, twitterHandle: normalizeTwitterHandle(twHandle),
  }), [title, desc, keywords, url, imageUrl, siteName, author, pubDate, modDate,
       robotsContent, rIndex, rFollow, pt, twHandle]);

  const code = useMemo(() => {
    switch (codeTab) {
      case 'HTML':         return genHTML(genData);
      case 'Next.js':      return genNextJs(genData);
      case 'React Helmet': return genHelmet(genData);
      case 'Vue / Nuxt':   return genVue(genData);
      case 'Astro':        return genAstro(genData);
      case 'JSON-LD':      return genJsonLD(genData);
      case 'OG Only':      return genOGOnly(genData);
      default: return '';
    }
  }, [genData, codeTab]);

  useEffect(() => {
    if (!imageUrl) { setImageInfo(null); return; }
    const img = new Image();
    img.onload = () => setImageInfo({ ok: true, width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => setImageInfo({ ok: false });
    img.src = imageUrl;
  }, [imageUrl]);

  const diagnostics = useMemo(() => {
    const issues = [];
    if (title && (title.length < 50 || title.length > 60)) issues.push('Title should usually be 50-60 characters.');
    if (desc && (desc.length < 130 || desc.length > 160)) issues.push('Description should usually be 130-160 characters.');
    if (url && !/^https:\/\//i.test(url)) issues.push('Canonical URL should be absolute HTTPS.');
    if (imageUrl && !/^https:\/\//i.test(imageUrl)) issues.push('OG image should be an absolute HTTPS URL.');
    if (!imageUrl) issues.push('OG image is missing.');
    if (imageInfo?.ok && (imageInfo.width !== 1200 || imageInfo.height !== 630)) issues.push(`OG image is ${imageInfo.width}x${imageInfo.height}; 1200x630 is recommended.`);
    if (imageInfo && !imageInfo.ok) issues.push('OG image could not be loaded for preview/dimension check.');
    return issues;
  }, [title, desc, url, imageUrl, imageInfo]);

  /* ── Restore from localStorage ─────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.pageType)           setPageType(s.pageType);
        if (s.title  != null)     setTitle(s.title);
        if (s.desc   != null)     setDesc(s.desc);
        if (s.url    != null)     setUrl(s.url);
        if (s.imageUrl != null)   setImageUrl(s.imageUrl);
        if (s.siteName != null)   setSiteName(s.siteName);
        if (s.author != null)     setAuthor(s.author);
        if (s.pubDate != null)    setPubDate(s.pubDate);
        if (s.modDate != null)    setModDate(s.modDate);
        if (s.keywords != null)   setKeywords(s.keywords);
        if (s.twHandle != null)   setTwHandle(s.twHandle);
        if (s.rIndex   != null)   setRIndex(s.rIndex);
        if (s.rFollow  != null)   setRFollow(s.rFollow);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  /* ── Debounced save ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          pageType, title, desc, url, imageUrl, siteName,
          author, pubDate, modDate, keywords, twHandle, rIndex, rFollow,
        }));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [pageType, title, desc, url, imageUrl, siteName, author, pubDate, modDate, keywords, twHandle, rIndex, rFollow]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Reset ──────────────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    setPageType(DEFAULTS.pageType);
    setTitle(DEFAULTS.title);
    setDesc(DEFAULTS.desc);
    setUrl(DEFAULTS.url);
    setImageUrl(DEFAULTS.imageUrl);
    setSiteName(DEFAULTS.siteName);
    setAuthor(DEFAULTS.author);
    setPubDate(DEFAULTS.pubDate);
    setModDate(DEFAULTS.modDate);
    setKeywords(DEFAULTS.keywords);
    setTwHandle(DEFAULTS.twHandle);
    setRIndex(DEFAULTS.rIndex);
    setRFollow(DEFAULTS.rFollow);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSaveState('idle');
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleImportClipboard() {
    try {
      const html = await navigator.clipboard.readText();
      const parsed = parseMetaHtml(html);
      if (parsed.title) setTitle(parsed.title);
      if (parsed.desc) setDesc(parsed.desc);
      if (parsed.keywords) setKeywords(parsed.keywords);
      if (parsed.url) setUrl(parsed.url);
      if (parsed.imageUrl) setImageUrl(parsed.imageUrl);
      if (parsed.siteName) setSiteName(parsed.siteName);
      if (parsed.twHandle) setTwHandle(parsed.twHandle);
      if (parsed.robots) {
        const lower = parsed.robots.toLowerCase();
        setRIndex(!lower.includes('noindex'));
        setRFollow(!lower.includes('nofollow'));
      }
    } catch {}
  }

  async function downloadPack() {
    const zip = new JSZip();
    zip.file('meta-tags.html', genHTML(genData));
    zip.file('metadata.next.js', genNextJs(genData));
    zip.file('schema.html', genJsonLD(genData));
    zip.file('og-twitter-tags.html', genOGOnly(genData));
    zip.file('README.md', [
      '# Meta tag export',
      '',
      '- Use `meta-tags.html` for generic HTML/CMS pages.',
      '- Use `metadata.next.js` for Next.js App Router.',
      '- Validate shared URLs after deployment because social platforms cache previews.',
      `- Diagnostics: ${diagnostics.length ? diagnostics.join('; ') : 'No issues detected.'}`,
    ].join('\n'));
    const blob = await zip.generateAsync({ type: 'blob' });
    const packUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = packUrl;
    link.download = 'meta-launch-pack.zip';
    link.click();
    URL.revokeObjectURL(packUrl);
  }

  const titleLen = title.length;
  const descLen  = desc.length;

  return (
    <div className={styles.wrap}>
      <SeoMetaToolsTopNav active="meta-tag-generator" />

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><span className={styles.accent}>◈</span></div>
          <span>Meta <span className={styles.accent}>Tag</span> Generator</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.schemaBadge}>{pt.schemaType}</span>
          <span className={styles.fmtBadge}>7 formats</span>
          <span className={`${styles.saveIndicator} ${saveState === 'saving' ? styles.saveIndicatorSaving : saveState === 'saved' ? styles.saveIndicatorSaved : ''}`}>
            <span className={styles.saveDot} />
            {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Auto-saved'}
          </span>
          <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
          <button className={styles.resetBtn} onClick={handleImportClipboard}>Import</button>
          <button className={styles.resetBtn} onClick={downloadPack}>Pack</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Left: form */}
        <div className={styles.formPanel}>

          {/* Page type */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Page Type</label>
            <div className={styles.typeGrid}>
              {PAGE_TYPES.map(p => (
                <button key={p.id}
                  className={`${styles.typeBtn} ${pageType === p.id ? styles.typeBtnActive : ''}`}
                  onClick={() => setPageType(p.id)}
                >{p.label}</button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label className={styles.fieldLabel}>Page Title</label>
              <span className={`${styles.charCount} ${titleLen > 60 ? styles.countOver : titleLen >= 50 ? styles.countGood : styles.countWarn}`}>
                {titleLen}/60
              </span>
            </div>
            <input type="text" className={styles.input} value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Your page title (50–60 chars ideal)" />
            <CharBar len={titleLen} max={60} goodMin={50} />
          </div>

          {/* Description */}
          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label className={styles.fieldLabel}>Meta Description</label>
              <span className={`${styles.charCount} ${descLen > 160 ? styles.countOver : descLen >= 130 ? styles.countGood : styles.countWarn}`}>
                {descLen}/160
              </span>
            </div>
            <textarea className={styles.textarea} rows={3} value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Brief page description (130–160 chars ideal)" />
            <CharBar len={descLen} max={160} goodMin={130} />
          </div>

          {/* URL */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Canonical URL</label>
            <input type="url" className={styles.input} value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com/page" />
          </div>

          {/* OG Image */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              OG Image URL <span className={styles.fieldHint}>1200×630px recommended</span>
            </label>
            <input type="url" className={styles.input} value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/og-image.jpg" />
          </div>

          {/* Site name + Twitter */}
          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Site Name</label>
              <input type="text" className={styles.input} value={siteName}
                onChange={e => setSiteName(e.target.value)} placeholder="Brand Name" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Twitter Handle</label>
              <input type="text" className={styles.input} value={twHandle}
                onChange={e => setTwHandle(e.target.value)} placeholder="@handle" />
            </div>
          </div>

          {/* Author */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Author</label>
            <input type="text" className={styles.input} value={author}
              onChange={e => setAuthor(e.target.value)} placeholder="Author Name" />
          </div>

          {/* Dates — only for content types */}
          {(pageType === 'blog' || pageType === 'article') && (
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Published Date</label>
                <input type="date" className={styles.input} value={pubDate} onChange={e => setPubDate(e.target.value)} />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Modified Date</label>
                <input type="date" className={styles.input} value={modDate} onChange={e => setModDate(e.target.value)} />
              </div>
            </div>
          )}

          {/* Keywords */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              Keywords <span className={styles.fieldHint}>comma-separated</span>
            </label>
            <input type="text" className={styles.input} value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="react, tutorial, javascript" />
          </div>

          {/* Robots */}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Robots</label>
            <div className={styles.robotsRow}>
              <button
                className={`${styles.robotBtn} ${rIndex ? styles.robotActive : styles.robotInactive}`}
                onClick={() => setRIndex(v => !v)}
              >{rIndex ? '✓ index' : '✗ noindex'}</button>
              <button
                className={`${styles.robotBtn} ${rFollow ? styles.robotActive : styles.robotInactive}`}
                onClick={() => setRFollow(v => !v)}
              >{rFollow ? '✓ follow' : '✗ nofollow'}</button>
              <code className={styles.robotsCode}>{robotsContent}</code>
            </div>
          </div>

          <div className={styles.diagnosticsBox}>
            <div className={styles.diagnosticsTitle}>Diagnostics</div>
            <div className={styles.diagnosticsStats}>
              <span>{diagnostics.length} issue{diagnostics.length === 1 ? '' : 's'}</span>
              <span>{imageInfo?.ok ? `${imageInfo.width}x${imageInfo.height}` : imageUrl ? 'image check failed' : 'no image'}</span>
            </div>
            {diagnostics.length > 0 && <p>{diagnostics.slice(0, 3).join(' ')}</p>}
          </div>

        </div>

        {/* Right: preview + code */}
        <div className={styles.rightPanel}>

          {/* Preview section */}
          <div className={styles.previewSection}>
            <div className={styles.tabBar}>
              {PREVIEW_TABS.map(t => (
                <button key={t}
                  className={`${styles.tab} ${previewTab === t ? styles.tabActive : ''}`}
                  onClick={() => setPreviewTab(t)}
                >{t}</button>
              ))}
            </div>

            <div className={styles.previewBody}>

              {/* Google SERP */}
              {previewTab === 'Google' && (
                <div className={styles.serpWrap}>
                  <div className={styles.serpCard}>
                    <div className={styles.serpSite}>
                      <div className={styles.serpFavicon}>G</div>
                      <div>
                        <div className={styles.serpDomain}>{siteName || domain}</div>
                        <div className={styles.serpBreadcrumb}>{breadcrumb || 'example.com'}</div>
                      </div>
                    </div>
                    <div className={styles.serpTitle}>
                      {truncate(title, 60) || 'Your Page Title Will Appear Here'}
                    </div>
                    <div className={styles.serpDesc}>
                      {truncate(desc, 160) || 'Your meta description will appear here. Keep it between 130–160 characters to avoid truncation in Google search results.'}
                    </div>
                  </div>
                </div>
              )}

              {/* Facebook OG */}
              {previewTab === 'Facebook' && (
                <div className={styles.fbWrap}>
                  <div className={styles.fbCard}>
                    <div className={styles.fbImageBox}>
                      {imageUrl
                        ? <img src={imageUrl} alt="" className={styles.fbImg} onError={e => { e.currentTarget.style.display = 'none'; }} />
                        : <div className={styles.fbPlaceholder}><span>1200 × 630</span></div>
                      }
                    </div>
                    <div className={styles.fbMeta}>
                      <div className={styles.fbDomain}>{domain.toUpperCase()}</div>
                      <div className={styles.fbTitle}>{truncate(title, 88) || 'Your Page Title'}</div>
                      <div className={styles.fbDesc}>{truncate(desc, 110) || 'Your page description as it appears in Facebook and LinkedIn link previews.'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Twitter card */}
              {previewTab === 'Twitter' && (
                <div className={styles.twWrap}>
                  <div className={styles.twCard}>
                    <div className={styles.twImageBox}>
                      {imageUrl
                        ? <img src={imageUrl} alt="" className={styles.twImg} onError={e => { e.currentTarget.style.display = 'none'; }} />
                        : <div className={styles.twPlaceholder}><span>1200 × 630</span></div>
                      }
                    </div>
                    <div className={styles.twMeta}>
                      <div className={styles.twTitle}>{truncate(title, 70) || 'Your Page Title'}</div>
                      <div className={styles.twDesc}>{truncate(desc, 125) || 'Your page description as it appears in Twitter / X card previews when sharing links.'}</div>
                      <div className={styles.twDomain}>🌐 {domain}</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Code section */}
          <div className={styles.codeSection}>
            <div className={styles.tabBar}>
              {CODE_TABS.map(t => (
                <button key={t}
                  className={`${styles.tab} ${codeTab === t ? styles.tabActive : ''}`}
                  onClick={() => setCodeTab(t)}
                >{t}</button>
              ))}
            </div>
            <div className={styles.codeWrap}>
              <pre className={styles.code}><code>{code}</code></pre>
            </div>
            <div className={styles.codeFooter}>
              <button
                className={`${styles.copyBtn} ${copied ? styles.copyOk : ''}`}
                onClick={handleCopy}
              >{copied ? '✓ Copied!' : '⎘ Copy'}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
