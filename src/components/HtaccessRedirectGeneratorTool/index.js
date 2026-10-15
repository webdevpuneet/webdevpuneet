'use client';

import { useMemo, useState } from 'react';
import s from './styles.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const INITIAL_REDIRECTS = [
  { from: '/old-page/', to: 'https://webdevpuneet.com/new-page/', type: '301' },
  { from: '/blog/old-post/', to: '/blog/new-post/', type: '301' },
];

function cleanPath(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function buildHtaccess({ forceHttps, hostMode, slashMode, redirects, comments }) {
  const lines = ['RewriteEngine On'];

  if (forceHttps) {
    if (comments) lines.push('', '# Force HTTPS');
    lines.push('RewriteCond %{HTTPS} !=on');
    lines.push('RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]');
  }

  if (hostMode === 'www') {
    if (comments) lines.push('', '# Force www');
    lines.push('RewriteCond %{HTTP_HOST} !^www\\. [NC]');
    lines.push('RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]');
  }

  if (hostMode === 'non-www') {
    if (comments) lines.push('', '# Force non-www');
    lines.push('RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]');
    lines.push('RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]');
  }

  if (slashMode === 'add') {
    if (comments) lines.push('', '# Add trailing slash');
    lines.push('RewriteCond %{REQUEST_FILENAME} !-f');
    lines.push('RewriteCond %{REQUEST_URI} !(.*)/$');
    lines.push('RewriteRule ^(.*)$ /$1/ [L,R=301]');
  }

  if (slashMode === 'remove') {
    if (comments) lines.push('', '# Remove trailing slash');
    lines.push('RewriteCond %{REQUEST_FILENAME} !-d');
    lines.push('RewriteCond %{REQUEST_URI} (.+)/$');
    lines.push('RewriteRule ^ %1 [L,R=301]');
  }

  const validRedirects = redirects
    .map(item => ({ ...item, from: cleanPath(item.from), to: item.to.trim() }))
    .filter(item => item.from && item.to);

  if (validRedirects.length) {
    if (comments) lines.push('', '# Custom redirects');
    validRedirects.forEach(item => lines.push(`Redirect ${item.type} ${item.from} ${item.to}`));
  }

  return `${lines.join('\n')}\n`;
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

export default function HtaccessRedirectGeneratorTool() {
  const [forceHttps, setForceHttps] = useState(true);
  const [hostMode, setHostMode] = useState('non-www');
  const [slashMode, setSlashMode] = useState('none');
  const [comments, setComments] = useState(true);
  const [redirects, setRedirects] = useState(INITIAL_REDIRECTS);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => buildHtaccess({
    forceHttps,
    hostMode,
    slashMode,
    redirects,
    comments,
  }), [forceHttps, hostMode, slashMode, redirects, comments]);

  function updateRedirect(index, key, value) {
    setRedirects(redirects.map((row, i) => i === index ? { ...row, [key]: value } : row));
  }

  function addRedirect() {
    setRedirects([...redirects, { from: '/old-url/', to: '/new-url/', type: '301' }]);
  }

  function removeRedirect(index) {
    setRedirects(redirects.filter((_, i) => i !== index));
  }

  function copyOutput() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={s.wrap}>
      <SeoMetaToolsTopNav active="htaccess-redirect-generator" />
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>H</span>
          <span>.htaccess <span className={s.accent}>Redirect Generator</span></span>
        </div>
        <span className={s.hint}>Apache redirects</span>
      </div>

      <div className={s.body}>
        <section className={s.panel}>
          <div className={s.optionsGrid}>
            <label className={s.check}>
              <input type="checkbox" checked={forceHttps} onChange={event => setForceHttps(event.target.checked)} />
              <span>Force HTTPS</span>
            </label>
            <label className={s.field}>
              <span>Host rule</span>
              <select value={hostMode} onChange={event => setHostMode(event.target.value)}>
                <option value="none">No host rewrite</option>
                <option value="www">Force www</option>
                <option value="non-www">Force non-www</option>
              </select>
            </label>
            <label className={s.field}>
              <span>Trailing slash</span>
              <select value={slashMode} onChange={event => setSlashMode(event.target.value)}>
                <option value="none">No slash rule</option>
                <option value="add">Add slash</option>
                <option value="remove">Remove slash</option>
              </select>
            </label>
            <label className={s.check}>
              <input type="checkbox" checked={comments} onChange={event => setComments(event.target.checked)} />
              <span>Include comments</span>
            </label>
          </div>
        </section>

        <section className={s.panel}>
          <div className={s.panelHeader}>
            <div className={s.panelTitle}>Custom redirects</div>
            <button className={s.addBtn} onClick={addRedirect}>Add redirect</button>
          </div>
          <div className={s.redirectList}>
            {redirects.map((item, index) => (
              <div className={s.redirectRow} key={index}>
                <select value={item.type} onChange={event => updateRedirect(index, 'type', event.target.value)}>
                  <option value="301">301</option>
                  <option value="302">302</option>
                </select>
                <input value={item.from} onChange={event => updateRedirect(index, 'from', event.target.value)} placeholder="/old-url/" />
                <input value={item.to} onChange={event => updateRedirect(index, 'to', event.target.value)} placeholder="/new-url/" />
                <button onClick={() => removeRedirect(index)}>Remove</button>
              </div>
            ))}
          </div>
        </section>

        <section className={s.outputPanel}>
          <div className={s.outputHeader}>
            <span>.htaccess</span>
            <div className={s.outputActions}>
              <button onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button>
              <button onClick={() => downloadFile('.htaccess', output)}>Download</button>
            </div>
          </div>
          <textarea value={output} readOnly spellCheck={false} />
        </section>
      </div>
    </div>
  );
}
