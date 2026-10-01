'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';

// Tools that live on webdevpuneet link locally; the rest still live on fwdtools.
const LOCAL_SLUGS = new Set(SEARCHABLE_TOOLS.map(t => t.slug));
const toolHref = slug => (LOCAL_SLUGS.has(slug) ? `/${slug}/` : `https://fwdtools.com/${slug}/`);

const NAV_ITEMS = [
  { slug: 'flexbox-builder',            short: 'Flexbox',        icon: '/icons/flexbox-builder.svg' },
  { slug: 'css-grid-builder',           short: 'Grid',           icon: '/icons/css-grid-builder.svg' },
  { slug: 'gradient-generator',         short: 'Gradients',      icon: '/icons/gradient-generator.svg' },
  { slug: 'mesh-gradient-generator',    short: 'Mesh Gradient',  icon: '/icons/mesh-gradient-generator.svg' },
  { slug: 'box-shadow-generator',       short: 'Box Shadow',     icon: '/icons/box-shadow-generator.svg' },
  { slug: 'glassmorphism-generator',    short: 'Glassmorphism',  icon: '/icons/glassmorphism-generator.svg' },
  { slug: 'css-animation-generator',    short: 'Animation',      icon: '/icons/css-animation-generator.svg' },
  { slug: 'css-easing-generator',       short: 'Easing',         icon: '/icons/css-easing-generator.svg' },
  { slug: 'color-palette-generator',    short: 'Color Palette',  icon: '/icons/color-palette-generator.svg' },
  { slug: 'color-picker',               short: 'Color Picker',   icon: '/icons/color-picker.svg' },
  { slug: 'color-contrast-checker',     short: 'Contrast',       icon: '/icons/color-contrast-checker.svg' },
  { slug: 'css-button-generator',       short: 'Buttons',        icon: '/icons/css-button-generator.svg' },
  { slug: 'navbar-builder',             short: 'Navbar',         icon: '/icons/navbar-builder.svg' },
  { slug: 'toggle-switch-generator',    short: 'Toggles',        icon: '/icons/toggle-switch-generator.svg' },
  { slug: 'carousel-builder',           short: 'Carousel',       icon: '/icons/carousel-builder.svg' },
  { slug: 'css-clip-path-generator',    short: 'Clip Path',      icon: '/icons/css-clip-path-generator.svg' },
  { slug: 'css-shape-generator',        short: 'Shapes',         icon: '/icons/css-shape-generator.svg' },
  { slug: 'css-loader-generator',       short: 'Loaders',        icon: '/icons/css-loader-generator.svg' },
  { slug: 'css-transform-generator',    short: 'Transform',      icon: '/icons/css-transform-generator.svg' },
  { slug: 'css-filter-generator',       short: 'Filters',        icon: '/icons/css-filter-generator.svg' },
  { slug: 'css-to-tailwind',            short: 'CSS→Tailwind',   icon: '/icons/css-to-tailwind.svg' },
  { slug: 'tailwind-to-css',            short: 'Tailwind→CSS',   icon: '/icons/tailwind-to-css.svg' },
  { slug: 'css-autoprefixer',           short: 'Autoprefixer',   icon: '/icons/css-autoprefixer.svg' },
  { slug: 'css-minifier-beautifier',    short: 'Minify/Beautify', icon: '/icons/css-minifier-beautifier.svg' },
  { slug: 'css-clamp-generator',        short: 'Clamp',          icon: '/icons/css-clamp-generator.svg' },
  { slug: 'css-media-queries-generator', short: 'Media Queries', icon: '/icons/css-media-queries-generator.svg' },
  { slug: 'rem-px-converter',           short: 'REM↔PX',         icon: '/icons/rem-px-converter.svg' },
  { slug: 'responsive-preview-tool',    short: 'Responsive Preview', icon: '/icons/responsive-preview-tool.svg' },
  { slug: 'font-pairing-tool',          short: 'Font Pairing',       icon: '/icons/font-pairing-tool.svg' },
  { slug: 'svg-animation-generator',    short: 'SVG Animation',      icon: '/icons/svg-animation-generator.svg' },
  { slug: 'svg-motion-studio',          short: 'SVG Motion Studio',  icon: '/icons/svg-motion-studio.svg' },
  { slug: 'svg-wave-generator',         short: 'SVG Waves',          icon: '/icons/svg-wave-generator.svg' },
];

export default function CssToolsTopNav({ active }) {
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
      <nav className={styles.nav} ref={scrollRef} aria-label="CSS tools">
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
