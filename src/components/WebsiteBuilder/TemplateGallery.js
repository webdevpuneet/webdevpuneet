'use client';

/* /website-builder/: the landing page, laid out like the Website Section Templates gallery
   (same header, chips, search, card grid and widths). Your pages first (start from scratch,
   continue, My pages), then every website template, filterable by industry. Every template
   card is in the server-rendered HTML (the filters only hide cards). */

import { useEffect, useMemo, useState } from 'react';
import { LoadMore } from '@/components/UiSnippetsGallery';
import s from '../SocialPostTemplates/styles.module.css';
import x from '../SectionTemplates/styles.module.css';
import StartCards, { EDITOR } from './StartCards';
import InViewImg from '@/components/InViewImg';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import hs from '@/components/HomeTemplatesCarousel/styles.module.css';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

const PAGE = 10; // 2 rows of 5

export default function TemplateGallery({ templates, industries }) {
  const [ind, setInd] = useState('all');
  const [q, setQ] = useState('');
  // 10 cards at first (2 rows of 5), then 10 more per Load more; a new filter starts over
  const [shownCount, setShownCount] = useState(PAGE);
  useEffect(() => { setShownCount(PAGE); }, [ind, q]);
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return templates
      .filter(t => ind === 'all' || t.industry === ind)
      .filter(t => !words.length || words.every(w => `${t.name} ${t.industry} ${t.blurb}`.toLowerCase().includes(w)));
  }, [templates, ind, q]);

  return (
    <div className={`${s.galleryPage} ${s.galleryFull}`}>
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Free Website Builder &amp; Templates</h1>
        <p className={s.galleryLead}>
          Pick one of {templates.length} complete website templates with real content, or start from scratch. Edit everything in the browser,
          set your colours and fonts, preview desktop, tablet and mobile, then export clean HTML you can host anywhere. No sign-up.
        </p>
      </header>
      <nav className={s.catLinks} aria-label="Template industries">
        <button type="button" className={`${s.catLink} ${x.chipBtn} ${ind === 'all' ? s.catLinkActive : ''}`} onClick={() => setInd('all')} aria-pressed={ind === 'all'}>All templates <span>{templates.length}</span></button>
        {industries.map(i => (
          <button key={i} type="button" className={`${s.catLink} ${x.chipBtn} ${ind === i ? s.catLinkActive : ''}`} onClick={() => setInd(i)} aria-pressed={ind === i}>
            {i} <span>{templates.filter(t => t.industry === i).length}</span>
          </button>
        ))}
        <a href="/website-section-templates/" className={s.catLink}>Single sections →</a>
      </nav>
      <div className={s.gallery}>
        <div className={s.galleryControls}>
          <input className={s.search} value={q} onChange={ev => setQ(ev.target.value)} placeholder={`Search ${templates.length} website templates…`} aria-label="Search website templates" />
        </div>

        <StartCards />

        <div className={s.sectionHead}>
          <h2>{ind === 'all' ? 'All Templates' : `${ind} Templates`}</h2>
          <span>{list.length}{list.length !== templates.length ? ` of ${templates.length}` : ''}</span>
        </div>
        {list.length === 0
          ? <div className={s.empty}>No website templates match &ldquo;{q}&rdquo;. <a href={`${EDITOR}?starter=blank`}>Start from scratch</a> instead.</div>
          : (
            <div className={`${s.grid} ${s.grid5}`}>
              {list.slice(0, shownCount).map(t => (
                // Tall card with the whole page: the preview scrolls top to bottom while hovered
                <a key={t.id} className={s.card} href={`/website-builder/templates/${t.id}/`} title={t.blurb} {...panHandlers}>
                  <div className={s.cardPreview}>
                    <InViewImg className={`${s.cardImg} ${hs.scrollImg}`} src={`/images/website-templates/full/${t.id}.jpg`} alt={`${t.name} template preview`} />
                  </div>
                  <div className={s.cardBody}>
                    <span className={s.cardCat}>{t.industry}</span>
                    <h3 className={s.cardTitle}>{t.name}</h3>
                    <span className={s.cardMeta}>{t.n} sections · {t.p > 1 ? `One page or ${t.p} pages` : "One page"} · Export HTML</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        <LoadMore shown={Math.min(shownCount, list.length)} total={list.length} onLoadMore={() => setShownCount(n => n + PAGE)} />
      </div>
    </div>
  );
}
