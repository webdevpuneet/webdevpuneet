'use client';

// Standalone "Export ▾" dropdown for the static source-code section on the
// canonical snippet page (src/app/ui-snippets/[slug]/page.js). Deliberately
// self-contained rather than reusing the ExportMenu defined inside index.js
// (that component isn't exported, and the interactive editor's export
// handlers close over live editor state) — this one takes the snippet's
// static html/css/js as props and drives the same shared converters.

import { useEffect, useRef, useState } from 'react';
import {
  toHtmlFile,
  toReactComponent,
  toTailwindComponent,
  toTailwindHtml,
  toVueSfc,
  toAngularComponent,
  componentName,
  angularSelector,
} from '@/lib/snippet-exporters';
import EmbedModal from './EmbedModal';
import s from './styles.module.css';

const EXPORT_ICONS = {
  'HTML':             <svg width="16" height="18" viewBox="0 0 512 512" title="HTML"><path fill="#e44d26" d="M107 457L75 96h362l-32 361-149 41z"/><path fill="#f16529" d="M256 444l120-33 27-307H256z"/><path fill="#ebebeb" d="M256 208h-62l-4-45h66v-44H144l11 127h101zm0 122l-49-13-3-36h-44l6 67 90 25z"/><path fill="#fff" d="M256 208v44h58l-6 58-52 14v46l90-25 7-77 7-60zm0-89v44h114l-4-44z"/></svg>,
  'HTML + Tailwind':  <svg width="18" height="11" viewBox="0 0 54 33" title="Tailwind"><path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.728 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.256 3.272 34.192 0 27 0zM13.5 16C6.3 16 1.8 19.6 0 26.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C16.744 28.728 19.808 32 26.5 32c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.756 19.272 20.692 16 13.5 16z" fill="#38bdf8"/></svg>,
  'React':            <svg width="17" height="17" viewBox="0 0 100 100" title="React"><ellipse cx="50" cy="50" rx="10" ry="10" fill="#61dafb"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(120 50 50)"/></svg>,
  'React + Tailwind': (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <svg width="17" height="17" viewBox="0 0 100 100" title="React + Tailwind"><ellipse cx="50" cy="50" rx="10" ry="10" fill="#61dafb"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#61dafb" strokeWidth="5" transform="rotate(120 50 50)"/></svg>
      <svg width="10" height="6" viewBox="0 0 54 33" style={{ position: 'absolute', right: -4, bottom: -2 }}><path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.728 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C37.256 3.272 34.192 0 27 0zM13.5 16C6.3 16 1.8 19.6 0 26.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C16.744 28.728 19.808 32 26.5 32c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.756 19.272 20.692 16 13.5 16z" fill="#38bdf8"/></svg>
    </span>
  ),
  'Vue':              <svg width="17" height="15" viewBox="0 0 261.76 226.69" title="Vue"><path d="M161.096 0l-30.225 52.351L100.647 0H0l130.871 226.69L261.742 0z" fill="#41b883"/><path d="M161.096 0l-30.225 52.351L100.647 0H52.346l78.525 136.01L209.397 0z" fill="#34495e"/></svg>,
  'Angular':          <svg width="17" height="17" viewBox="0 0 250 250" title="Angular"><path d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" fill="#dd0031"/><path d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" fill="#c3002f"/><path fill="#fff" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/></svg>,
  'Embed':            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
};

const EXPORT_ICON_TINTS = {
  'HTML':             '#e44d26',
  'HTML + Tailwind':  '#38bdf8',
  'React':            '#61dafb',
  'React + Tailwind': '#61dafb',
  'Vue':              '#41b883',
  'Angular':          '#dd0031',
  'Embed':            '#6b7280',
};

function downloadText(content, filename, type = 'text/plain') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function SnippetExportButton({ id, title, html, css, js, cdnUrls = [] }) {
  const [open, setOpen] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const sn = { id, title, html, css, js, cdnUrls };

  const options = [
    { label: 'HTML',             sub: 'Standalone .html file',                onClick: () => downloadText(toHtmlFile(sn), `${id}.html`, 'text/html') },
    { label: 'HTML + Tailwind',  sub: 'Standalone file via Tailwind CDN',     onClick: () => downloadText(toTailwindHtml(sn), `${id}.tailwind.html`, 'text/html') },
    { label: 'React',            sub: 'JSX component (.jsx) with useEffect',   onClick: () => downloadText(toReactComponent(sn), componentName(sn) + '.jsx') },
    { label: 'React + Tailwind', sub: 'JSX with Tailwind utility classes',     onClick: () => downloadText(toTailwindComponent(sn), componentName(sn) + '.tailwind.jsx') },
    { label: 'Vue',              sub: 'Vue 3 single-file component (.vue)',    onClick: () => downloadText(toVueSfc(sn), componentName(sn) + '.vue') },
    { label: 'Angular',          sub: 'Standalone component (.component.ts)',  onClick: () => downloadText(toAngularComponent(sn), angularSelector(componentName(sn)) + '.component.ts') },
    { label: 'Embed',            sub: 'Live-preview <iframe> for WordPress & other sites', onClick: () => setEmbedOpen(true) },
  ];

  return (
    <div className={s.popoverAnchor} ref={ref}>
      <button className={s.iconBtn} onClick={() => setOpen(v => !v)} title="Export as HTML, Tailwind, React, Vue or Angular" aria-haspopup="true" aria-expanded={open}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="M8 11l4 4 4-4"/><path d="M4 19h16"/></svg>
        Export
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 1, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 299 }} />}
      {open && (
        <div className={s.exportMenu} role="menu">
          <div className={s.exportMenuHead}>Export this snippet as…</div>
          {options.map((o, i) => (
            <div key={o.label}>
              {o.label === 'Embed' && i > 0 && <div className={s.exportMenuDivider} />}
              <button className={s.exportMenuItem} role="menuitem" onClick={() => { o.onClick(); setOpen(false); }}>
                <span className={s.exportMenuItemIcon} style={{ background: `${EXPORT_ICON_TINTS[o.label]}1a` }}>
                  {EXPORT_ICONS[o.label]}
                </span>
                <span className={s.exportMenuItemText}>
                  <span className={s.exportMenuItemLabel}>{o.label}</span>
                  <span className={s.exportMenuItemSub}>{o.sub}</span>
                </span>
                <svg className={s.exportMenuItemArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
      {embedOpen && <EmbedModal slug={id} title={title} onClose={() => setEmbedOpen(false)} />}
    </div>
  );
}
