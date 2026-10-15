'use client';

import { useMemo, useState } from 'react';
import s from '../SeoGeneratorTools.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const DEFAULT_LINKS = [
  { title: 'UI Snippets', url: 'https://webdevpuneet.com/ui-snippets/', note: 'Copy-paste HTML, CSS and JavaScript components with a live editor.' },
  { title: 'Learn to Code', url: 'https://webdevpuneet.com/learn-to-code/', note: 'Interactive coding playgrounds with structured lessons and live previews.' },
  { title: 'CSS Tools', url: 'https://webdevpuneet.com/css-tools/', note: 'Visual generators for CSS layouts, effects, animation, and responsive design.' },
];

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function LlmsTxtGeneratorTool() {
  const [siteName, setSiteName] = useState('webdevpuneet.com');
  const [description, setDescription] = useState('Free UI snippets, coding playgrounds and browser-based tools for frontend developers.');
  const [sitemap, setSitemap] = useState('https://webdevpuneet.com/sitemap.xml');
  const [contact, setContact] = useState('https://webdevpuneet.com/contact/');
  const [policy, setPolicy] = useState('Use canonical URLs. Do not cite private, duplicate, parameterized, or noindex pages.');
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => [
    `# ${siteName}`,
    '',
    `> ${description}`,
    '',
    '## Core pages',
    '',
    ...links.filter(link => link.title.trim() && link.url.trim()).map(link => `- [${link.title.trim()}](${link.url.trim()}): ${link.note.trim()}`),
    '',
    '## Discovery',
    '',
    `- Sitemap: ${sitemap}`,
    contact.trim() ? `- Contact: ${contact}` : '',
    '- Preferred format: concise Markdown with canonical URLs.',
    `- Usage: ${policy}`,
  ].filter(line => line !== '').join('\n'), [siteName, description, sitemap, contact, policy, links]);

  const validLinks = links.filter(link => link.title.trim() && link.url.trim());
  const missingNotes = validLinks.filter(link => !link.note.trim()).length;

  function updateLink(index, key, value) {
    setLinks(links.map((link, i) => i === index ? { ...link, [key]: value } : link));
  }

  function copyOutput() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={s.wrap} style={{ '--accent': '#6366f1' }}>
      <SeoMetaToolsTopNav active="llms-txt-generator" />
      <div className={s.header}>
        <div className={s.logo}><span className={s.logoIcon}>L</span><span>LLMs.txt <span className={s.accent}>Generator</span></span></div>
        <span className={s.hint}>AI discovery file</span>
      </div>
      <div className={s.body}>
        <section className={s.panel}>
          <div className={s.grid}>
            <label className={s.field}><span>Site name</span><input value={siteName} onChange={event => setSiteName(event.target.value)} /></label>
            <label className={s.field}><span>Sitemap URL</span><input value={sitemap} onChange={event => setSitemap(event.target.value)} /></label>
            <label className={s.field}><span>Contact URL</span><input value={contact} onChange={event => setContact(event.target.value)} /></label>
            <label className={s.field}><span>Description</span><textarea value={description} onChange={event => setDescription(event.target.value)} /></label>
            <label className={s.field}><span>Usage policy</span><textarea value={policy} onChange={event => setPolicy(event.target.value)} /></label>
          </div>
        </section>
        <section className={s.panel}>
          <div className={s.panelHeader}><div className={s.panelTitle}>Important pages</div><button className={s.addBtn} onClick={() => setLinks([...links, { title: '', url: '', note: '' }])}>Add page</button></div>
          <div className={s.rows}>
            {links.map((link, index) => (
              <div className={`${s.row} ${s.wideRow}`} key={index}>
                <input value={link.title} onChange={event => updateLink(index, 'title', event.target.value)} placeholder="Page title" />
                <input value={link.url} onChange={event => updateLink(index, 'url', event.target.value)} placeholder="https://example.com/page/" />
                <input value={link.note} onChange={event => updateLink(index, 'note', event.target.value)} placeholder="Short description" />
                <button onClick={() => setLinks(links.filter((_, i) => i !== index))}>Remove</button>
              </div>
            ))}
          </div>
        </section>
        <div className={s.stats}>
          <span className={s.pill}><strong>{validLinks.length}</strong> core page{validLinks.length === 1 ? '' : 's'}</span>
          <span className={s.pill}><strong>{missingNotes}</strong> missing note{missingNotes === 1 ? '' : 's'}</span>
          <span className={s.pill}><strong>{output.length}</strong> chars</span>
        </div>
        <div className={s.notice}>Publish this as /llms.txt at the site root. Keep it concise and link only to canonical pages that are useful for citation or AI context.</div>
        <section className={s.outputPanel}>
          <div className={s.outputHeader}><span>llms.txt</span><div className={s.outputActions}><button onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button><button onClick={() => downloadFile('llms.txt', output)}>Download</button></div></div>
          <textarea value={output} readOnly spellCheck={false} />
        </section>
      </div>
    </div>
  );
}
