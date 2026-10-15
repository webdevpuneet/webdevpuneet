'use client';

import { useMemo, useState } from 'react';
import JSZip from 'jszip';
import s from './styles.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const PRESETS = {
  public: {
    name: 'Public site',
    disallow: ['/admin/', '/private/', '/tmp/'],
    allow: ['/'],
  },
  staging: {
    name: 'Block staging',
    disallow: ['/'],
    allow: [],
  },
  ecommerce: {
    name: 'Store crawl rules',
    disallow: ['/cart/', '/checkout/', '/account/', '/search'],
    allow: ['/'],
  },
};

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  try {
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withScheme).origin.replace(/\/+$/, '');
  } catch {
    return trimmed.replace(/\/+$/, '');
  }
}

function normalizeHost(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  try {
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withScheme).hostname;
  } catch {
    return trimmed.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
  }
}

function cleanCrawlDelay(value) {
  const parsed = Number.parseInt(String(value).trim(), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? String(parsed) : '';
}

function cleanLine(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function buildRobots({ allow, disallow, crawlDelay, sitemapUrl, host }) {
  const lines = ['User-agent: *'];
  const allowLines = allow.map(cleanLine).filter(Boolean);
  const disallowLines = disallow.map(cleanLine).filter(Boolean);

  if (allowLines.length === 0 && disallowLines.length === 0) {
    lines.push('Allow: /');
  } else {
    allowLines.forEach(item => lines.push(`Allow: ${item}`));
    disallowLines.forEach(item => lines.push(`Disallow: ${item}`));
  }

  const delay = cleanCrawlDelay(crawlDelay);
  if (delay) lines.push(`Crawl-delay: ${delay}`);
  if (sitemapUrl.trim()) lines.push('', `Sitemap: ${sitemapUrl.trim()}`);
  const cleanHost = normalizeHost(host);
  if (cleanHost) lines.push(`Host: ${cleanHost}`);
  return lines.join('\n');
}

function parseRobots(content) {
  const next = { allow: [], disallow: [], crawlDelay: '', sitemap: '', host: '' };
  content.split(/\r?\n/).forEach(line => {
    const clean = line.replace(/#.*$/, '').trim();
    const idx = clean.indexOf(':');
    if (idx === -1) return;
    const key = clean.slice(0, idx).trim().toLowerCase();
    const value = clean.slice(idx + 1).trim();
    if (key === 'allow') next.allow.push(value || '/');
    if (key === 'disallow') next.disallow.push(value || '/');
    if (key === 'crawl-delay') next.crawlDelay = value;
    if (key === 'sitemap' && !next.sitemap) next.sitemap = value;
    if (key === 'host') next.host = value;
  });
  return next;
}

function buildNextRobots({ allow, disallow, crawlDelay, sitemapUrl, host }) {
  const rules = {
    userAgent: '*',
    allow: allow.map(cleanLine).filter(Boolean),
    disallow: disallow.map(cleanLine).filter(Boolean),
    crawlDelay: cleanCrawlDelay(crawlDelay) ? Number(cleanCrawlDelay(crawlDelay)) : undefined,
  };
  const meta = {
    rules,
    sitemap: sitemapUrl || undefined,
    host: normalizeHost(host) || undefined,
  };
  const body = JSON.stringify(meta, null, 2).replace(/"([^"]+)":/g, '$1:');
  return `export default function robots() {\n  return ${body};\n}\n`;
}

function pathMatches(rule, path) {
  if (!rule) return false;
  if (rule === '/') return true;
  return path.startsWith(rule);
}

function canCrawlPath(path, allow, disallow) {
  const clean = cleanLine(path || '/');
  let best = { type: 'allow', length: 0 };
  allow.map(cleanLine).filter(Boolean).forEach(rule => {
    if (pathMatches(rule, clean) && rule.length >= best.length) best = { type: 'allow', length: rule.length };
  });
  disallow.map(cleanLine).filter(Boolean).forEach(rule => {
    if (pathMatches(rule, clean) && rule.length > best.length) best = { type: 'disallow', length: rule.length };
  });
  return best.type !== 'disallow';
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function RobotsTxtGeneratorTool() {
  const [siteUrl, setSiteUrl] = useState('https://webdevpuneet.com');
  const [allow, setAllow] = useState(PRESETS.public.allow);
  const [disallow, setDisallow] = useState(PRESETS.public.disallow);
  const [crawlDelay, setCrawlDelay] = useState('');
  const [includeSitemap, setIncludeSitemap] = useState(true);
  const [host, setHost] = useState('');
  const [testPath, setTestPath] = useState('/admin/');
  const [outputMode, setOutputMode] = useState('robots.txt');
  const [copied, setCopied] = useState(false);

  const sitemapUrl = useMemo(() => {
    if (!includeSitemap) return '';
    const base = normalizeUrl(siteUrl) || 'https://example.com';
    return `${base}/sitemap.xml`;
  }, [includeSitemap, siteUrl]);

  const output = useMemo(() => buildRobots({
    allow,
    disallow,
    crawlDelay,
    sitemapUrl,
    host,
  }), [allow, disallow, crawlDelay, sitemapUrl, host]);

  const nextOutput = useMemo(() => buildNextRobots({ allow, disallow, crawlDelay, sitemapUrl, host }), [allow, disallow, crawlDelay, sitemapUrl, host]);
  const finalOutput = outputMode === 'Next.js' ? nextOutput : output;
  const testAllowed = canCrawlPath(testPath, allow, disallow);

  const diagnostics = useMemo(() => {
    const issues = [];
    if (disallow.map(cleanLine).includes('/')) issues.push('Disallow: / blocks the whole site for compliant crawlers.');
    if (sitemapUrl && !/^https?:\/\/[^/]+\/.+/i.test(sitemapUrl)) issues.push('Sitemap URL should be an absolute HTTP/HTTPS URL.');
    if (crawlDelay && !cleanCrawlDelay(crawlDelay)) issues.push('Crawl-delay must be a non-negative integer.');
    if (host && host !== normalizeHost(host)) issues.push('Host will be normalized to hostname only.');
    return issues;
  }, [disallow, sitemapUrl, crawlDelay, host]);

  function updateList(type, index, value) {
    const setter = type === 'allow' ? setAllow : setDisallow;
    const current = type === 'allow' ? allow : disallow;
    setter(current.map((item, i) => i === index ? value : item));
  }

  function removeListItem(type, index) {
    const setter = type === 'allow' ? setAllow : setDisallow;
    const current = type === 'allow' ? allow : disallow;
    setter(current.filter((_, i) => i !== index));
  }

  function addListItem(type) {
    const setter = type === 'allow' ? setAllow : setDisallow;
    const current = type === 'allow' ? allow : disallow;
    setter([...current, '/']);
  }

  function applyPreset(key) {
    setAllow(PRESETS[key].allow);
    setDisallow(PRESETS[key].disallow);
  }

  function copyOutput() {
    navigator.clipboard.writeText(finalOutput).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  async function importFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = parseRobots(text);
      if (parsed.allow.length) setAllow(parsed.allow);
      if (parsed.disallow.length) setDisallow(parsed.disallow);
      if (parsed.crawlDelay) setCrawlDelay(parsed.crawlDelay);
      if (parsed.host) setHost(parsed.host);
      if (parsed.sitemap) setSiteUrl(normalizeUrl(parsed.sitemap.replace(/\/sitemap\.xml.*$/i, '')));
    } catch {}
  }

  async function downloadPack() {
    const zip = new JSZip();
    zip.file('robots.txt', output);
    zip.file('app-robots.js', nextOutput);
    zip.file('README.md', [
      '# Robots export',
      '',
      '- Upload `robots.txt` to your site root.',
      '- For Next.js App Router, adapt `app-robots.js` as `app/robots.js`.',
      `- Test path ${testPath}: ${testAllowed ? 'allowed' : 'blocked'}.`,
      `- Diagnostics: ${diagnostics.length ? diagnostics.join('; ') : 'No issues detected.'}`,
    ].join('\n'));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots-launch-pack.zip';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={s.wrap}>
      <SeoMetaToolsTopNav active="robots-txt-generator" />
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>R</span>
          <span>Robots.txt <span className={s.accent}>Generator</span></span>
        </div>
        <span className={s.hint}>Crawl rules + sitemap</span>
      </div>

      <div className={s.body}>
        <section className={s.panel}>
          <div className={s.panelTitle}>Site settings</div>
          <div className={s.grid}>
            <label className={s.field}>
              <span>Site URL</span>
              <input value={siteUrl} onChange={event => setSiteUrl(event.target.value)} placeholder="https://example.com" />
            </label>
            <label className={s.field}>
              <span>Crawl delay</span>
              <input value={crawlDelay} onChange={event => setCrawlDelay(event.target.value)} placeholder="Optional seconds" inputMode="numeric" />
            </label>
            <label className={s.field}>
              <span>Host</span>
              <input value={host} onChange={event => setHost(event.target.value)} placeholder="Optional preferred host" />
            </label>
            <label className={s.check}>
              <input type="checkbox" checked={includeSitemap} onChange={event => setIncludeSitemap(event.target.checked)} />
              <span>Include sitemap URL</span>
            </label>
            <label className={s.field}>
              <span>Output</span>
              <input value={outputMode} onChange={event => setOutputMode(event.target.value === 'Next.js' ? 'Next.js' : 'robots.txt')} list="robots-output-modes" />
              <datalist id="robots-output-modes"><option value="robots.txt" /><option value="Next.js" /></datalist>
            </label>
          </div>
        </section>

        <div className={s.stats}>
          <span className={s.pill}><strong>{allow.length}</strong> allow</span>
          <span className={s.pill}><strong>{disallow.length}</strong> disallow</span>
          <span className={s.pill}><strong>{diagnostics.length}</strong> issue{diagnostics.length === 1 ? '' : 's'}</span>
          <span className={s.pill}><strong>{testAllowed ? 'allowed' : 'blocked'}</strong> {testPath || '/'}</span>
        </div>
        {diagnostics.length > 0 && <div className={s.notice}>{diagnostics.join(' ')}</div>}

        <section className={s.panel}>
          <div className={s.panelHeader}>
            <div className={s.panelTitle}>Presets</div>
            <div className={s.presets}>
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button key={key} onClick={() => applyPreset(key)}>{preset.name}</button>
              ))}
              <button onClick={importFromClipboard}>Import Clipboard</button>
            </div>
          </div>
        </section>

        <section className={s.panel}>
          <div className={s.panelTitle}>Path tester</div>
          <div className={s.testerRow}>
            <input value={testPath} onChange={event => setTestPath(event.target.value)} placeholder="/admin/" />
            <span className={testAllowed ? s.allowed : s.blocked}>{testAllowed ? 'Allowed' : 'Blocked'}</span>
          </div>
        </section>

        <div className={s.rulesGrid}>
          <section className={s.panel}>
            <div className={s.panelHeader}>
              <div className={s.panelTitle}>Allow paths</div>
              <button className={s.smallBtn} onClick={() => addListItem('allow')}>Add</button>
            </div>
            <div className={s.list}>
              {allow.map((item, index) => (
                <div className={s.row} key={`allow-${index}`}>
                  <input value={item} onChange={event => updateList('allow', index, event.target.value)} />
                  <button onClick={() => removeListItem('allow', index)}>Remove</button>
                </div>
              ))}
              {allow.length === 0 && <p className={s.empty}>No explicit allow rules.</p>}
            </div>
          </section>

          <section className={s.panel}>
            <div className={s.panelHeader}>
              <div className={s.panelTitle}>Disallow paths</div>
              <button className={s.smallBtn} onClick={() => addListItem('disallow')}>Add</button>
            </div>
            <div className={s.list}>
              {disallow.map((item, index) => (
                <div className={s.row} key={`disallow-${index}`}>
                  <input value={item} onChange={event => updateList('disallow', index, event.target.value)} />
                  <button onClick={() => removeListItem('disallow', index)}>Remove</button>
                </div>
              ))}
              {disallow.length === 0 && <p className={s.empty}>No blocked paths.</p>}
            </div>
          </section>
        </div>

        <section className={s.outputPanel}>
          <div className={s.outputHeader}>
            <span>{outputMode === 'Next.js' ? 'app/robots.js' : 'robots.txt'}</span>
            <div className={s.outputActions}>
              <button onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button>
              <button onClick={() => downloadFile(outputMode === 'Next.js' ? 'robots.js' : 'robots.txt', finalOutput)}>Download</button>
              <button onClick={downloadPack}>Pack</button>
            </div>
          </div>
          <textarea value={finalOutput} readOnly spellCheck={false} />
        </section>
      </div>
    </div>
  );
}
