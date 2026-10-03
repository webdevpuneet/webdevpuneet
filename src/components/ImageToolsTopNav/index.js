'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';

// Tools that live on webdevpuneet link locally; the rest still live on fwdtools.
const LOCAL_SLUGS = new Set(SEARCHABLE_TOOLS.map(t => t.slug));
const toolHref = slug => (LOCAL_SLUGS.has(slug) ? `/${slug}/` : `https://fwdtools.com/${slug}/`);

const NAV_ITEMS = [
  { slug: 'image-editor',          short: 'Editor',          icon: '/icons/image-editor.svg' },
  { slug: 'image-background-remover', short: 'Remove BG',    icon: '/icons/image-background-remover.svg' },
  { slug: 'relight-photo',         short: 'Relight',         icon: '/icons/relight-photo.svg' },
  { slug: 'image-compressor',      short: 'Compress',        icon: '/icons/image-compressor.svg' },
  { slug: 'image-to-svg',          short: 'Image → SVG',     icon: '/icons/image-to-svg.svg' },
  { slug: 'svg-to-png',            short: 'SVG → PNG',       icon: '/icons/svg-to-png.svg' },
  { slug: 'image-to-base64',       short: 'Image → Base64',  icon: '/icons/image-to-base64.svg' },
  { slug: 'image-to-text-converter', short: 'Image → Text',  icon: '/icons/image-to-text-converter.svg' },
  { slug: 'pdf-to-images',         short: 'PDF → Images',    icon: '/icons/pdf-to-images.svg' },
  { slug: 'images-to-pdf',         short: 'Images → PDF',    icon: '/icons/images-to-pdf.svg' },
  { slug: 'favicon-generator',     short: 'Favicon',         icon: '/icons/favicon-generator.svg' },
  { slug: 'og-image-generator',    short: 'OG Image',        icon: '/icons/og-image-generator.svg' },
  { slug: 'qr-code-generator',     short: 'QR Code',         icon: '/icons/qr-code-generator.svg' },
  { slug: 'code-screenshot-generator', short: 'Code Screenshot', icon: '/icons/code-screenshot-generator.svg' },
  { slug: 'animated-svg-icons',    short: 'SVG Icons',       icon: '/icons/animated-svg-icons.svg' },
  { slug: 'image-color-palette',   short: 'Color Palette',   icon: '/icons/image-color-palette.svg' },
];

export default function ImageToolsTopNav({ active }) {
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
      <nav className={styles.nav} ref={scrollRef} aria-label="Image tools">
        {NAV_ITEMS.map(item => (
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
