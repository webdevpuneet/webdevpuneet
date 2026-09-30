'use client';

import { useState } from 'react';
// The lightweight index, not UiSnippetsTool/snippets (which bundles every snippet's source).
import { VISIBLE_SNIPPET_INDEX as VISIBLE_SNIPPETS } from '@/lib/snippet-index';
import s from './styles.module.css';

const pool = [...VISIBLE_SNIPPETS].filter(sn => !sn.noindex).reverse().slice(0, 18);

export default function HeroSnippetPreview({ pageSize = 4, columns = 4 }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(pool.length / pageSize);
  const shown = pool.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className={s.wrap} style={{ '--cols': columns }}>
      <div className={s.head}>
        <div className={s.headLeft}>
          <span className={s.label}>Latest UI Snippets</span>
          <span className={s.sub}>Copy-paste HTML, CSS &amp; JS Snippets — Export to React, Angular, Vue &amp; Tailwind CSS</span>
        </div>
        <div className={s.headRight}>
          <button className={s.navBtn} onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} aria-label="Previous">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className={s.navBtn} onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} aria-label="Next">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <a href="/ui-snippets/" className={s.seeAll}>See all →</a>
        </div>
      </div>

      <div className={s.grid}>
        {shown.map(sn => (
          <a key={sn.id} href={`/ui-snippets/${sn.id}/`} className={s.card}>
            <div className={s.thumb}>
              <img
                src={`/images/ui-snippets/previews/${sn.id}.png`}
                alt=""
                loading="lazy"
              />
            </div>
            <div className={s.footer}>
              <span className={s.title}>{sn.title}</span>
              <span className={s.badge}>{sn.category}</span>
            </div>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={s.dots}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${s.dot} ${i === page ? s.dotActive : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
