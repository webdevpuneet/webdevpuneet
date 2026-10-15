'use client';

import { useMemo, useState } from 'react';
import JSZip from 'jszip';
import s from './styles.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const SAMPLE_PATHS = [
  '/',
  '/tools/',
  '/css-tools/',
  '/ui-snippets/',
  '/meta-tag-generator/',
  '/robots-txt-generator/',
];

const FREQS = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
const OUTPUT_MODES = ['XML', 'Next.js'];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeBaseUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return 'https://example.com';
  try {
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withScheme);
    return url.origin.replace(/\/+$/, '');
  } catch {
    return trimmed.replace(/\/+$/, '');
  }
}

function joinUrl(base, path) {
  const cleanBase = normalizeBaseUrl(base);
  const cleanPath = path.trim();
  try {
    const url = /^https?:\/\//i.test(cleanPath)
      ? new URL(cleanPath)
      : new URL(cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`, cleanBase);
    url.hash = '';
    return url.href;
  } catch {
    return `${cleanBase}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
  }
}

function cleanPriority(value) {
  const parsed = Number.parseFloat(String(value).trim());
  if (!Number.isFinite(parsed)) return '';
  return Math.min(1, Math.max(0, parsed)).toFixed(1);
}

function isValidDate(value) {
  if (!value) return true;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
}

function parseRows(paths, defaults) {
  return paths.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
    const parts = line.split('|').map(part => part.trim());
    return {
      raw: line,
      path: parts[0],
      lastmod: parts[1] || defaults.lastmod,
      changefreq: parts[2] || defaults.changefreq,
      priority: parts[3] || defaults.priority,
    };
  });
}

function buildSitemapXml(rows, baseUrl) {
  const entries = rows.map(row => {
    const loc = escapeXml(joinUrl(baseUrl, row.path));
    const safePriority = cleanPriority(row.priority);
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      row.lastmod ? `    <lastmod>${escapeXml(row.lastmod)}</lastmod>` : '',
      row.changefreq ? `    <changefreq>${escapeXml(row.changefreq)}</changefreq>` : '',
      safePriority ? `    <priority>${escapeXml(safePriority)}</priority>` : '',
      '  </url>',
    ].filter(Boolean).join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
  ].join('\n');
}

function buildNextSitemap(rows, baseUrl) {
  const items = rows.map(row => {
    const entry = {
      url: joinUrl(baseUrl, row.path),
      lastModified: row.lastmod || undefined,
      changeFrequency: row.changefreq || undefined,
      priority: cleanPriority(row.priority) ? Number(cleanPriority(row.priority)) : undefined,
    };
    return `    ${JSON.stringify(entry).replace(/"([^"]+)":/g, '$1:')}`;
  }).join(',\n');

  return `export default function sitemap() {\n  return [\n${items}\n  ];\n}\n`;
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function SitemapGeneratorTool() {
  const [baseUrl, setBaseUrl] = useState('https://webdevpuneet.com');
  const [paths, setPaths] = useState(SAMPLE_PATHS.join('\n'));
  const [lastmod, setLastmod] = useState(today());
  const [changefreq, setChangefreq] = useState('monthly');
  const [priority, setPriority] = useState('0.8');
  const [outputMode, setOutputMode] = useState('XML');
  const [copied, setCopied] = useState(false);

  const rows = useMemo(() => parseRows(paths, { lastmod, changefreq, priority }), [paths, lastmod, changefreq, priority]);
  const urls = rows.map(row => row.path);

  const xmlOutput = useMemo(() => buildSitemapXml(rows, baseUrl), [rows, baseUrl]);
  const nextOutput = useMemo(() => buildNextSitemap(rows, baseUrl), [rows, baseUrl]);
  const output = outputMode === 'Next.js' ? nextOutput : xmlOutput;

  const diagnostics = useMemo(() => {
    const issues = [];
    const seen = new Set();
    rows.forEach((row, index) => {
      const loc = joinUrl(baseUrl, row.path);
      if (!/^https?:\/\//i.test(loc)) issues.push(`Line ${index + 1}: URL is not absolute HTTP/HTTPS.`);
      const dedupeKey = loc.toLowerCase();
      if (seen.has(dedupeKey)) issues.push(`Line ${index + 1}: duplicate URL.`);
      seen.add(dedupeKey);
      if (!isValidDate(row.lastmod)) issues.push(`Line ${index + 1}: invalid lastmod date.`);
      if (row.changefreq && !FREQS.includes(row.changefreq)) issues.push(`Line ${index + 1}: invalid changefreq.`);
      const priorityValue = Number.parseFloat(row.priority);
      if (row.priority && (!Number.isFinite(priorityValue) || priorityValue < 0 || priorityValue > 1)) issues.push(`Line ${index + 1}: priority will be clamped to 0.0-1.0.`);
    });
    return issues;
  }, [rows, baseUrl]);

  function importXmlFromTextarea() {
    try {
      const doc = new DOMParser().parseFromString(paths, 'application/xml');
      const imported = Array.from(doc.querySelectorAll('url')).map(node => {
        const loc = node.querySelector('loc')?.textContent?.trim();
        if (!loc) return '';
        const lm = node.querySelector('lastmod')?.textContent?.trim() || lastmod;
        const cf = node.querySelector('changefreq')?.textContent?.trim() || changefreq;
        const pr = node.querySelector('priority')?.textContent?.trim() || priority;
        return `${loc} | ${lm} | ${cf} | ${pr}`;
      }).filter(Boolean);
      if (imported.length) setPaths(imported.join('\n'));
    } catch {}
  }

  async function downloadPack() {
    const zip = new JSZip();
    zip.file('sitemap.xml', xmlOutput);
    zip.file('app-sitemap.js', nextOutput);
    zip.file('README.md', [
      '# Sitemap export',
      '',
      '- Upload `sitemap.xml` to your site root or public folder.',
      '- For Next.js App Router, adapt `app-sitemap.js` as `app/sitemap.js`.',
      '- Add `Sitemap: https://yourdomain.com/sitemap.xml` to robots.txt.',
      `- Diagnostics: ${diagnostics.length ? diagnostics.join('; ') : 'No issues detected.'}`,
    ].join('\n'));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap-launch-pack.zip';
    link.click();
    URL.revokeObjectURL(url);
  }

  function copyOutput() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={s.wrap}>
      <SeoMetaToolsTopNav active="sitemap-generator" />
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>S</span>
          <span>Sitemap.xml <span className={s.accent}>Generator</span></span>
        </div>
        <span className={s.hint}>{urls.length} URL{urls.length === 1 ? '' : 's'}</span>
      </div>

      <div className={s.body}>
        <section className={s.panel}>
          <div className={s.grid}>
            <label className={s.field}>
              <span>Base URL</span>
              <input value={baseUrl} onChange={event => setBaseUrl(event.target.value)} placeholder="https://example.com" />
            </label>
            <label className={s.field}>
              <span>Last modified</span>
              <input type="date" value={lastmod} onChange={event => setLastmod(event.target.value)} />
            </label>
            <label className={s.field}>
              <span>Change frequency</span>
              <select value={changefreq} onChange={event => setChangefreq(event.target.value)}>
                {FREQS.map(freq => <option key={freq} value={freq}>{freq}</option>)}
              </select>
            </label>
            <label className={s.field}>
              <span>Priority</span>
              <input value={priority} onChange={event => setPriority(event.target.value)} placeholder="0.8" inputMode="decimal" />
            </label>
            <label className={s.field}>
              <span>Output</span>
              <select value={outputMode} onChange={event => setOutputMode(event.target.value)}>
                {OUTPUT_MODES.map(mode => <option key={mode} value={mode}>{mode}</option>)}
              </select>
            </label>
          </div>
        </section>

        <div className={s.stats}>
          <span className={s.pill}><strong>{rows.length}</strong> URLs</span>
          <span className={s.pill}><strong>{diagnostics.length}</strong> issue{diagnostics.length === 1 ? '' : 's'}</span>
          <span className={s.pill}><strong>{outputMode}</strong> output</span>
        </div>
        {diagnostics.length > 0 && <div className={s.notice}>{diagnostics.slice(0, 4).join(' ')}</div>}

        <div className={s.editorGrid}>
          <section className={s.panel}>
            <div className={s.panelHeader}>
              <div className={s.panelTitle}>URLs or paths</div>
              <div className={s.actions}>
                <button onClick={() => setPaths(SAMPLE_PATHS.join('\n'))}>Sample</button>
                <button onClick={importXmlFromTextarea}>Import XML</button>
                <button onClick={() => setPaths('')}>Clear</button>
              </div>
            </div>
            <textarea
              className={s.inputArea}
              value={paths}
              onChange={event => setPaths(event.target.value)}
              placeholder="One path or absolute URL per line"
              spellCheck={false}
            />
          </section>

          <section className={s.outputPanel}>
            <div className={s.outputHeader}>
              <span>{outputMode === 'Next.js' ? 'app/sitemap.js' : 'sitemap.xml'}</span>
              <div className={s.outputActions}>
                <button onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button>
                <button onClick={() => downloadFile(outputMode === 'Next.js' ? 'sitemap.js' : 'sitemap.xml', output)}>Download</button>
                <button onClick={downloadPack}>Pack</button>
              </div>
            </div>
            <textarea value={output} readOnly spellCheck={false} />
          </section>
        </div>

        <section className={s.panel}>
          <div className={s.panelTitle}>URL preview</div>
          <div className={s.previewTable}>
            {rows.slice(0, 8).map((row, index) => (
              <div className={s.previewRow} key={`${row.path}-${index}`}>
                <span>{joinUrl(baseUrl, row.path)}</span>
                <span>{row.lastmod || '-'}</span>
                <span>{row.changefreq || '-'}</span>
                <span>{cleanPriority(row.priority) || '-'}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
