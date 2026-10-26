'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';

// Only tools that live on webdevpuneet are listed (the rest stay on fwdtools).
const LOCAL_SLUGS = new Set(SEARCHABLE_TOOLS.map(t => t.slug));
const toolHref = slug => (LOCAL_SLUGS.has(slug) ? `/${slug}/` : `https://fwdtools.com/${slug}/`);

const NAV_ITEMS = [
  { slug: 'pdf-merger',            short: 'Merge',           icon: '/icons/pdf-merger.svg' },
  { slug: 'pdf-splitter',          short: 'Split',           icon: '/icons/pdf-splitter.svg' },
  { slug: 'pdf-compressor',        short: 'Compress',        icon: '/icons/pdf-compressor.svg' },
  { slug: 'pdf-page-organizer',    short: 'Organise Pages',  icon: '/icons/pdf-page-organizer.svg' },
  { slug: 'pdf-to-images',         short: 'PDF → Images',    icon: '/icons/pdf-to-images.svg' },
  { slug: 'images-to-pdf',         short: 'Images → PDF',    icon: '/icons/images-to-pdf.svg' },
  { slug: 'html-to-pdf',           short: 'HTML → PDF',      icon: '/icons/html-to-pdf.svg' },
  { slug: 'pdf-watermark',         short: 'Watermark',       icon: '/icons/pdf-watermark.svg' },
  { slug: 'pdf-password-protector', short: 'Protect',        icon: '/icons/pdf-password-protector.svg' },
  { slug: 'pdf-unlock',            short: 'Unlock',          icon: '/icons/pdf-unlock.svg' },
  { slug: 'pdf-metadata',          short: 'Metadata',        icon: '/icons/pdf-metadata.svg' },
  { slug: 'pdf-to-word',           short: 'PDF → Word',      icon: '/icons/pdf-to-word.svg' },
  { slug: 'pdf-ocr',               short: 'OCR',             icon: '/icons/pdf-ocr.svg' },
];

export default function PdfToolsTopNav({ active }) {
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    const active_el = el.querySelector('[aria-current="page"]');
    if (active_el) active_el.scrollIntoView({ block: 'nearest', inline: 'center' });
    return () => { el.removeEventListener('scroll', updateArrows); ro.disconnect(); };
  }, []);

  function scroll(dir) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth / 3), behavior: 'smooth' });
  }

  return (
    <div className={styles.wrapper}>
      {canLeft && (
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(-1)} aria-label="Scroll left">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      <nav className={styles.nav} ref={scrollRef} aria-label="PDF tools">
        {NAV_ITEMS.filter(item => LOCAL_SLUGS.has(item.slug)).map(item => (
          <a
            key={item.slug}
            href={toolHref(item.slug)}
            className={`${styles.item} ${item.slug === active ? styles.active : ''}`}
            aria-current={item.slug === active ? 'page' : undefined}
          >
            <img src={item.icon} width={14} height={14} alt="" className={styles.icon} />
            <span className={styles.label}>{item.short}</span>
          </a>
        ))}
      </nav>
      {canRight && (
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(1)} aria-label="Scroll right">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
    </div>
  );
}
