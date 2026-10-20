'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { LoadMore } from '@/components/UiSnippetsGallery';
import { TEMPLATES, TEMPLATE_CATEGORIES, SIZES, categoryById, templateById } from './templates/index.js';
import Preview from './Preview';
import SavedDesignsStrip from '@/components/SavedDesignsStrip';
import * as socialDesigns from './designs';
import { defaultState } from './render';

const LS_PREFIX = 'wdp-spt-v1:';
const GALLERY_PAGE = 10; // cards per "Load more", same rhythm as the UI snippets gallery

/* ── Gallery ─────────────────────────────────────────────────────────────────── */
// savedStrip(query): the "My designs" row, shown under the search with a Templates heading
export function TemplateGallery({ compact = false, excludeId = null, limit = null, previews = [], initialCategory = 'all', hideControls = false, chips = true, savedStrip = null }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState('');
  const [shownCount, setShownCount] = useState(GALLERY_PAGE);
  // A new search or category starts again from the first page
  useEffect(() => { setShownCount(GALLERY_PAGE); }, [cat, q]);
  // /social-post-templates/#events opens with that category selected
  useEffect(() => {
    const pick = () => { const h = window.location.hash.slice(1); if (categoryById(h)) setCat(h); };
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
  }, []);
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return TEMPLATES.filter(t => t.id !== excludeId)
      .filter(t => cat === 'all' || t.category === cat)
      .filter(t => !words.length || words.every(w => `${t.name} ${t.tags.join(' ')} ${categoryById(t.category)?.label}`.toLowerCase().includes(w)))
      .slice(0, limit || undefined);
  }, [cat, q, excludeId, limit]);
  // Compact strips (e.g. "More templates") show their fixed `limit`; the gallery pages by 10
  const shown = limit ? list : list.slice(0, shownCount);

  return (
    <div className={compact ? s.galleryCompact : s.gallery} data-spt-gallery>
      {!compact && !hideControls && (
        <div className={s.galleryControls}>
          <input className={s.search} value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${TEMPLATES.length} templates…`} aria-label="Search templates" />
          {chips && <div className={s.chips}>
            <button type="button" className={`${s.chip} ${cat === 'all' ? s.chipActive : ''}`} onClick={() => setCat('all')}>All <span>{TEMPLATES.length}</span></button>
            {TEMPLATE_CATEGORIES.map(c => {
              const n = TEMPLATES.filter(t => t.category === c.id).length;
              return n ? (
                <button key={c.id} type="button" className={`${s.chip} ${cat === c.id ? s.chipActive : ''}`} onClick={() => setCat(c.id)}>
                  {c.label} <span>{n}</span>
                </button>
              ) : null;
            })}
          </div>}
        </div>
      )}
      {savedStrip && (
        <>
          {savedStrip(q)}
          <div className={s.sectionHead}>
            <h2>All Templates</h2>
            <span>{list.length}{list.length !== TEMPLATES.length ? ` of ${TEMPLATES.length}` : ''}</span>
          </div>
        </>
      )}
      {list.length === 0 ? (
        <div className={s.empty}>No templates match &ldquo;{q}&rdquo;.</div>
      ) : (
        <div className={s.grid}>
          {shown.map(t => <GalleryCard key={t.id} t={t} preview={previews.includes(t.id)} />)}
        </div>
      )}
      {!limit && <LoadMore shown={shown.length} total={list.length} onLoadMore={() => setShownCount(n => n + GALLERY_PAGE)} />}
    </div>
  );
}

/* Full gallery screen: image-tools nav, leaderboard ad, heading, then the grid */
export function TemplateGalleryPage({ previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <PlaygroundTopNav active="social-post-templates" />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Social Post Templates</h1>
        <p className={s.galleryLead}>
          {TEMPLATES.length} free HTML templates for Instagram, Facebook and X posts and Stories. Pick one, edit the text,
          photos, colours and fonts in your browser, then download every size as an image or copy the HTML.
        </p>
      </header>
      <CategoryLinks />
      <TemplateGallery
        previews={previews}
        chips={false}
        savedStrip={q => (
          <SavedDesignsStrip
            store={socialDesigns}
            basePath="/social-post-templates/"
            nameOf={id => templateById(id)?.name || id}
            imgFor={d => d.thumb || `/images/social-post-templates/previews/${d.tpl}.png`}
            renderPreview={(d, w) => <SavedDesignPreview design={d} width={w} />}
            query={q}
          />
        )}
      />
    </div>
  );
}

/* A saved design drawn live from its template (first slide for carousels), fitted to a
   4:5 card the way the gallery cards are */
function SavedDesignPreview({ design: d, width }) {
  const sl = d.state?.slides?.[0];
  const tt = templateById(sl?.tpl) || templateById(d.tpl);
  const state = useMemo(() => (sl ? {
    size: d.state.size || 'portrait',
    vars: d.state.vars || {},
    fonts: d.state.fonts || tt?.fonts,
    fields: sl.fields || {},
    images: sl.images || {},
    imagePos: sl.imagePos || {},
    imageDims: sl.imageDims || {},
    slideNo: 1,
    slideTotal: d.state.slides.length,
  } : null), [d, sl, tt]);
  if (!tt || !state) return null;
  return <Preview template={tt} state={state} maxW={width} maxH={width * 1.25} />;
}

/* Crawlable links to every category landing page */
function CategoryLinks({ active = null }) {
  return (
    <nav className={s.catLinks} aria-label="Template categories">
      <a href="/social-post-templates/" className={`${s.catLink} ${!active ? s.catLinkActive : ''}`}>All templates</a>
      {TEMPLATE_CATEGORIES.map(c => (
        <a key={c.id} href={`/social-post-templates/category/${c.id}/`} className={`${s.catLink} ${active === c.id ? s.catLinkActive : ''}`}>
          {c.label} <span>{TEMPLATES.filter(t => t.category === c.id).length}</span>
        </a>
      ))}
    </nav>
  );
}

/* Category landing page: same shell as the gallery, filtered to one category */
export function TemplateCategoryPage({ category, h1, lead, previews = [] }) {
  return (
    <div className={s.galleryPage}>
      <PlaygroundTopNav active="social-post-templates" />
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <a href="/social-post-templates/" className={s.back}>← All social post templates</a>
        <h1 className={s.galleryH1}>{h1}</h1>
        <p className={s.galleryLead}>{lead}</p>
      </header>
      <CategoryLinks active={category} />
      <TemplateGallery previews={previews} initialCategory={category} hideControls />
    </div>
  );
}

function GalleryCard({ t, preview }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [visible, setVisible] = useState(false);
  const state = useMemo(() => ({ ...defaultState(t), size: 'portrait' }), [t]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    // Only mount the live preview (and load its fonts) once the card scrolls near view
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  const cat = categoryById(t.category);
  return (
    <a className={s.card} href={`/social-post-templates/${t.id}/`}>
      <div ref={ref} className={s.cardPreview}>
        {preview
          // Captured screenshot when available: much lighter than a live preview
          // eslint-disable-next-line @next/next/no-img-element
          ? <img className={s.cardImg} src={`/images/social-post-templates/previews/${t.id}.png`} alt={`${t.name} template preview`} loading="lazy" />
          : visible && w > 0 && <Preview template={t} state={state} maxW={w} />}
      </div>
      <div className={s.cardBody}>
        <span className={s.cardCat}>{cat?.label}</span>
        <h3 className={s.cardTitle}>{t.name}</h3>
        <span className={s.cardMeta}>{SIZES.length} sizes</span>
      </div>
    </a>
  );
}

/* The editor lives in Editor.js */
export { default as TemplateEditor } from './Editor';
