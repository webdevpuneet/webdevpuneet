'use client';

import { useMemo, useState } from 'react';
import JSZip from 'jszip';
import s from '../SeoGeneratorTools.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const TYPES = ['WebSite', 'Article', 'Product', 'FAQPage', 'LocalBusiness', 'BreadcrumbList', 'Organization', 'Person', 'VideoObject', 'HowTo', 'SoftwareApplication'];

function compact(value) {
  if (Array.isArray(value)) return value.map(compact).filter(Boolean);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, compact(val)]).filter(([, val]) => val !== '' && val !== null && val !== undefined && (!Array.isArray(val) || val.length)));
  }
  return value;
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'application/ld+json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function parseFaqRows(value) {
  return value
    .split('\n')
    .map(line => {
      const sep = line.indexOf('|');
      if (sep === -1) return null;
      const question = line.slice(0, sep).trim();
      const answer = line.slice(sep + 1).trim();
      if (!question || !answer) return null;
      return { '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } };
    })
    .filter(Boolean);
}

function numberOrString(value) {
  const trimmed = String(value).trim();
  if (!trimmed) return '';
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : trimmed;
}

export default function SchemaMarkupGeneratorTool() {
  const [type, setType] = useState('WebSite');
  const [name, setName] = useState('webdevpuneet.com');
  const [url, setUrl] = useState('https://webdevpuneet.com/');
  const [description, setDescription] = useState('Fast, private browser-based tools for developers, designers, and creators.');
  const [image, setImage] = useState('https://webdevpuneet.com/images/schema-markup-generator.png');
  const [author, setAuthor] = useState('webdevpuneet.com');
  const [price, setPrice] = useState('0');
  const [currency, setCurrency] = useState('USD');
  const [sku, setSku] = useState('');
  const [rating, setRating] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [sameAs, setSameAs] = useState('https://x.com/webdevpuneet');
  const [searchTarget, setSearchTarget] = useState('');
  const [faq, setFaq] = useState('What is structured data?|Structured data helps search engines understand page content.\nWhere do I paste JSON-LD?|Paste it inside a script tag in the page head or body.');
  const [extraRows, setExtraRows] = useState('Home|https://webdevpuneet.com/\nTools|https://webdevpuneet.com/tools/');
  const [duration, setDuration] = useState('PT2M30S');
  const [outputMode, setOutputMode] = useState('script');
  const [copied, setCopied] = useState(false);

  const schema = useMemo(() => {
    const base = { '@context': 'https://schema.org', '@type': type, name, url, description };
    const rows = parseFaqRows(extraRows);
    if (type === 'WebSite') return compact({
      ...base,
      potentialAction: searchTarget.trim()
        ? { '@type': 'SearchAction', target: searchTarget.trim(), 'query-input': 'required name=search_term_string' }
        : null,
    });
    if (type === 'Article') return compact({ ...base, headline: name, image, author: { '@type': 'Person', name: author }, publisher: { '@type': 'Organization', name: author }, datePublished: new Date().toISOString().slice(0, 10), dateModified: new Date().toISOString().slice(0, 10) });
    if (type === 'Product') return compact({
      ...base,
      image,
      sku,
      aggregateRating: rating && reviewCount ? { '@type': 'AggregateRating', ratingValue: numberOrString(rating), reviewCount: numberOrString(reviewCount) } : null,
      offers: { '@type': 'Offer', price: numberOrString(price), priceCurrency: currency, availability: 'https://schema.org/InStock', url },
    });
    if (type === 'FAQPage') return compact({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: parseFaqRows(faq) });
    if (type === 'BreadcrumbList') return compact({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: rows.map((row, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: row.name,
        item: row.acceptedAnswer.text,
      })),
    });
    if (type === 'Organization') return compact({ ...base, logo: image, sameAs: sameAs.split('\n').map(item => item.trim()).filter(Boolean), contactPoint: phone ? { '@type': 'ContactPoint', telephone: phone, contactType: 'customer support' } : null });
    if (type === 'Person') return compact({ ...base, image, jobTitle: author, sameAs: sameAs.split('\n').map(item => item.trim()).filter(Boolean) });
    if (type === 'VideoObject') return compact({ ...base, thumbnailUrl: image, uploadDate: new Date().toISOString().slice(0, 10), duration });
    if (type === 'HowTo') return compact({ ...base, image, step: rows.map((row, index) => ({ '@type': 'HowToStep', position: index + 1, name: row.name, text: row.acceptedAnswer.text })) });
    if (type === 'SoftwareApplication') return compact({ ...base, image, operatingSystem: 'Any', applicationCategory: 'WebApplication', offers: { '@type': 'Offer', price: numberOrString(price), priceCurrency: currency } });
    return compact({ ...base, image, telephone: phone, sameAs: sameAs.split('\n').map(item => item.trim()).filter(Boolean), address: { '@type': 'PostalAddress', streetAddress: address } });
  }, [type, name, url, description, image, author, price, currency, sku, rating, reviewCount, address, phone, sameAs, searchTarget, faq, extraRows, duration]);

  const output = JSON.stringify(schema, null, 2);
  const scriptOutput = `<script type="application/ld+json">\n${output}\n</script>`;
  const finalOutput = outputMode === 'json' ? output : scriptOutput;
  const warnings = [
    !url.startsWith('https://') ? 'Use an absolute HTTPS canonical URL.' : '',
    type !== 'FAQPage' && description.length < 50 ? 'Description is short for structured data context.' : '',
    type === 'FAQPage' && !schema.mainEntity?.length ? 'Add at least one valid FAQ row using question|answer format.' : '',
    type === 'Product' && (!price || !currency) ? 'Product schema should include price and currency.' : '',
    type === 'Product' && rating && !reviewCount ? 'Aggregate rating should include a review count.' : '',
    type === 'WebSite' && searchTarget && !searchTarget.includes('{search_term_string}') ? 'SearchAction target should include {search_term_string}.' : '',
    ['BreadcrumbList', 'HowTo'].includes(type) && !parseFaqRows(extraRows).length ? `${type} needs at least one valid title|url or step|text row.` : '',
    type === 'VideoObject' && !image ? 'VideoObject should include a thumbnail URL.' : '',
  ].filter(Boolean);

  function copyOutput() {
    navigator.clipboard.writeText(finalOutput).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  async function importFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      const json = text.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
      const parsed = JSON.parse(json);
      if (parsed['@type']) {
        const importedType = Array.isArray(parsed['@type']) ? parsed['@type'][0] : parsed['@type'];
        if (TYPES.includes(importedType)) setType(importedType);
      }
      if (parsed.name || parsed.headline) setName(parsed.name || parsed.headline);
      if (parsed.url) setUrl(parsed.url);
      if (parsed.description) setDescription(parsed.description);
      if (parsed.image || parsed.logo || parsed.thumbnailUrl) setImage(Array.isArray(parsed.image) ? parsed.image[0] : parsed.image || parsed.logo || parsed.thumbnailUrl);
    } catch {}
  }

  async function downloadPack() {
    const zip = new JSZip();
    zip.file(outputMode === 'script' ? 'schema.html' : 'schema.jsonld', finalOutput);
    zip.file('schema.raw.json', output);
    zip.file('README.md', [
      '# Schema export',
      '',
      '- Paste `schema.html` into the relevant page, or use `schema.raw.json` in framework code.',
      '- Validate the deployed URL with Google Rich Results Test or Schema.org Validator.',
      `- Diagnostics: ${warnings.length ? warnings.join('; ') : 'No issues detected.'}`,
    ].join('\n'));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'schema-launch-pack.zip';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={s.wrap} style={{ '--accent': '#a855f7' }}>
      <SeoMetaToolsTopNav active="schema-markup-generator" />
      <div className={s.header}>
        <div className={s.logo}><span className={s.logoIcon}>S</span><span>Schema Markup <span className={s.accent}>Generator</span></span></div>
        <span className={s.hint}>JSON-LD structured data</span>
      </div>
      <div className={s.body}>
        <section className={s.panel}>
          <div className={s.grid}>
            <label className={s.field}><span>Schema type</span><select value={type} onChange={event => setType(event.target.value)}>{TYPES.map(item => <option key={item}>{item}</option>)}</select></label>
            <label className={s.field}><span>Name / headline</span><input value={name} onChange={event => setName(event.target.value)} /></label>
            <label className={s.field}><span>Canonical URL</span><input value={url} onChange={event => setUrl(event.target.value)} /></label>
            <label className={s.field}><span>Description</span><textarea value={description} onChange={event => setDescription(event.target.value)} /></label>
            <label className={s.field}><span>Image URL</span><input value={image} onChange={event => setImage(event.target.value)} /></label>
            <label className={s.field}><span>Author / organization / role</span><input value={author} onChange={event => setAuthor(event.target.value)} /></label>
            {type === 'WebSite' && <label className={s.field}><span>Search URL template</span><input value={searchTarget} onChange={event => setSearchTarget(event.target.value)} placeholder="https://example.com/search?q={search_term_string}" /></label>}
            {type === 'Product' && <><label className={s.field}><span>Price</span><input value={price} onChange={event => setPrice(event.target.value)} /></label><label className={s.field}><span>Currency</span><input value={currency} onChange={event => setCurrency(event.target.value)} /></label><label className={s.field}><span>SKU</span><input value={sku} onChange={event => setSku(event.target.value)} /></label><label className={s.field}><span>Rating value</span><input value={rating} onChange={event => setRating(event.target.value)} placeholder="4.8" /></label><label className={s.field}><span>Review count</span><input value={reviewCount} onChange={event => setReviewCount(event.target.value)} placeholder="124" /></label></>}
            {type === 'LocalBusiness' && <><label className={s.field}><span>Address</span><input value={address} onChange={event => setAddress(event.target.value)} /></label><label className={s.field}><span>Phone</span><input value={phone} onChange={event => setPhone(event.target.value)} /></label><label className={s.field}><span>SameAs URLs</span><textarea value={sameAs} onChange={event => setSameAs(event.target.value)} /></label></>}
            {['Organization', 'Person'].includes(type) && <label className={s.field}><span>SameAs URLs</span><textarea value={sameAs} onChange={event => setSameAs(event.target.value)} /></label>}
            {type === 'VideoObject' && <label className={s.field}><span>Duration</span><input value={duration} onChange={event => setDuration(event.target.value)} placeholder="PT2M30S" /></label>}
            {type === 'FAQPage' && <label className={s.field}><span>FAQ rows question|answer</span><textarea value={faq} onChange={event => setFaq(event.target.value)} /></label>}
            {['BreadcrumbList', 'HowTo'].includes(type) && <label className={s.field}><span>{type === 'BreadcrumbList' ? 'Breadcrumb rows name|url' : 'Step rows title|text'}</span><textarea value={extraRows} onChange={event => setExtraRows(event.target.value)} /></label>}
          </div>
          <div className={s.actions} style={{ marginTop: 12 }}>
            <button onClick={() => setOutputMode(outputMode === 'script' ? 'json' : 'script')}>{outputMode === 'script' ? 'Script tag' : 'Raw JSON'}</button>
            <button onClick={importFromClipboard}>Import Clipboard</button>
          </div>
        </section>
        <div className={s.stats}>
          <span className={s.pill}><strong>{type}</strong> type</span>
          <span className={s.pill}><strong>{warnings.length}</strong> warning{warnings.length === 1 ? '' : 's'}</span>
          <span className={s.pill}><strong>{output.length}</strong> chars</span>
        </div>
        {warnings.length > 0 && <div className={s.notice}>{warnings.join(' ')}</div>}
        <section className={s.outputPanel}>
          <div className={s.outputHeader}><span>{outputMode === 'script' ? 'JSON-LD script' : 'Raw JSON-LD'}</span><div className={s.outputActions}><button onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button><button onClick={() => downloadFile(outputMode === 'script' ? 'schema.html' : 'schema.jsonld', finalOutput)}>Download</button><button onClick={downloadPack}>Pack</button></div></div>
          <textarea value={finalOutput} readOnly spellCheck={false} />
        </section>
      </div>
    </div>
  );
}
