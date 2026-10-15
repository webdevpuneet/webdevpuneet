'use client';

import { useMemo, useState } from 'react';
import s from '../SeoGeneratorTools.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const DEFAULT_ROWS = [
  { lang: 'en', url: 'https://webdevpuneet.com/' },
  { lang: 'en-us', url: 'https://webdevpuneet.com/us/' },
  { lang: 'x-default', url: 'https://webdevpuneet.com/' },
];

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

export default function HreflangTagGeneratorTool() {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [mode, setMode] = useState('html');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const valid = rows.filter(row => row.lang.trim() && row.url.trim());
    if (mode === 'sitemap') {
      const blocks = valid.map(row => [
        '  <url>',
        `    <loc>${escapeAttr(row.url.trim())}</loc>`,
        ...valid.map(alt => `    <xhtml:link rel="alternate" hreflang="${escapeAttr(alt.lang.trim().toLowerCase())}" href="${escapeAttr(alt.url.trim())}" />`),
        '  </url>',
      ].join('\n')).join('\n');
      return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        blocks,
        '</urlset>',
      ].join('\n');
    }
    return valid.map(row => `<link rel="alternate" hreflang="${escapeAttr(row.lang.trim().toLowerCase())}" href="${escapeAttr(row.url.trim())}" />`).join('\n');
  }, [rows, mode]);

  const validRows = rows.filter(row => row.lang.trim() && row.url.trim());
  const hasDefault = validRows.some(row => row.lang.trim().toLowerCase() === 'x-default');
  const duplicateLangs = validRows.length - new Set(validRows.map(row => row.lang.trim().toLowerCase())).size;

  function updateRow(index, key, value) {
    setRows(rows.map((row, i) => i === index ? { ...row, [key]: value } : row));
  }

  function copyOutput() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={s.wrap} style={{ '--accent': '#14b8a6' }}>
      <SeoMetaToolsTopNav active="hreflang-tag-generator" />
      <div className={s.header}>
        <div className={s.logo}><span className={s.logoIcon}>H</span><span>Hreflang Tag <span className={s.accent}>Generator</span></span></div>
        <span className={s.hint}>International SEO tags</span>
      </div>
      <div className={s.body}>
        <section className={s.panel}>
          <div className={s.panelHeader}>
            <div className={s.panelTitle}>Language alternates</div>
            <div className={s.actions}>
              <button onClick={() => setMode(mode === 'html' ? 'sitemap' : 'html')}>{mode === 'html' ? 'HTML tags' : 'Sitemap XML'}</button>
              <button onClick={() => setRows([...rows, { lang: '', url: '' }])}>Add locale</button>
            </div>
          </div>
          <div className={s.rows}>
            {rows.map((row, index) => (
              <div className={`${s.row} ${s.wideRow}`} key={index}>
                <input value={row.lang} onChange={event => updateRow(index, 'lang', event.target.value)} placeholder="en-us" />
                <input value={row.url} onChange={event => updateRow(index, 'url', event.target.value)} placeholder="https://example.com/en-us/page/" />
                <input value={row.url.trim().startsWith('https://') ? 'valid HTTPS URL' : 'check URL'} readOnly aria-label="URL check" />
                <button onClick={() => setRows(rows.filter((_, i) => i !== index))}>Remove</button>
              </div>
            ))}
          </div>
        </section>
        <div className={s.stats}>
          <span className={s.pill}><strong>{validRows.length}</strong> alternates</span>
          <span className={s.pill}><strong>{hasDefault ? 'yes' : 'no'}</strong> x-default</span>
          <span className={s.pill}><strong>{duplicateLangs}</strong> duplicate locale{duplicateLangs === 1 ? '' : 's'}</span>
        </div>
        {!hasDefault && <div className={s.notice}>Add an x-default row for a fallback URL when no language or region match is appropriate.</div>}
        <section className={s.outputPanel}>
          <div className={s.outputHeader}><span>{mode === 'html' ? 'HTML hreflang tags' : 'Sitemap alternates'}</span><div className={s.outputActions}><button onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button><button onClick={() => downloadFile(mode === 'html' ? 'hreflang-tags.html' : 'hreflang-sitemap.xml', output)}>Download</button></div></div>
          <textarea value={output} readOnly spellCheck={false} />
        </section>
      </div>
    </div>
  );
}
