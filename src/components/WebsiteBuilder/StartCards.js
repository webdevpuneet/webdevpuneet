'use client';

/* "Your pages" on /website-builder/ (the landing page): start from scratch, continue the
   autosaved page, or open a page from My pages. All of them open the editor at
   /website-builder/editor/. Renders cards only; the parent supplies the grid.

   Old builder links pointed at /website-builder/?page=…, ?starter=… and ?add=1 (saved pages,
   the section editor's "Add to page", backups); they are forwarded to the editor unchanged. */

import { useEffect, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import x from '../SectionTemplates/styles.module.css';
import { makeDesignStore } from '@/lib/design-store';
import { sectionTemplateById } from '@/components/SectionTemplates/templates/index.js';

export const EDITOR = '/website-builder/editor/';
const store = makeDesignStore('wdp-website-pages');

/* A page's card image: its hero (else its first section that isn't a navbar) */
function coverOf(page) {
  const secs = (page?.sections || []).map(o => sectionTemplateById(o.tpl)).filter(Boolean);
  const t = secs.find(o => o.category === 'hero') || secs.find(o => o.category !== 'navbar') || secs[0];
  return t ? `/images/section-templates/previews/${t.id}.png` : null;
}
const when = iso => { try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); } catch { return ''; } };

function PageCard({ href, page, cat, title, meta }) {
  const cover = coverOf(page);
  return (
    <a className={s.card} href={href}>
      <div className={x.cardPreview}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {cover && <img className={x.cardImg} src={cover} alt="" loading="lazy" />}
      </div>
      <div className={s.cardBody}>
        <span className={s.cardCat}>{cat}</span>
        <h3 className={s.cardTitle}>{title}</h3>
        <span className={s.cardMeta}>{meta}</span>
      </div>
    </a>
  );
}

export default function StartCards({ max = 6 }) {
  const [auto, setAuto] = useState(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (['page', 'starter', 'add'].some(k => q.has(k))) { window.location.replace(`${EDITOR}${window.location.search}${window.location.hash}`); return undefined; }
    let live = true;
    store.getAutosave('page').then(a => { if (live && a?.sections?.length) setAuto(a); }).catch(() => {});
    const load = () => store.listDesigns().then(list => { if (live) setPages(list); }).catch(() => {});
    load();
    const off = store.onDesignsChange(load);
    return () => { live = false; off?.(); };
  }, []);

  return (
    <>
      <a className={`${s.card} ${x.cardBlank}`} href={`${EDITOR}?starter=blank`}>
        <div className={x.blankArt} aria-hidden="true">+</div>
        <div className={s.cardBody}>
          <span className={s.cardCat}>Blank page</span>
          <h3 className={s.cardTitle}>Start from scratch</h3>
          <span className={s.cardMeta}>Add sections one by one from the library</span>
        </div>
      </a>
      {auto && <PageCard href={EDITOR} page={auto} cat="Autosaved" title="Continue editing" meta={`${auto.name || 'Your page'} · ${auto.sections.length} sections`} />}
      {pages.slice(0, max).map(d => (
        <PageCard key={d.id} href={`${EDITOR}?page=${encodeURIComponent(d.id)}`} page={d.state} cat="My pages" title={d.name} meta={`${d.state?.sections?.length || 0} sections · ${when(d.updated)}`} />
      ))}
    </>
  );
}
