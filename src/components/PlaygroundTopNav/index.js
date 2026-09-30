'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { LIVE_TOOLS } from '@/lib/tools-registry';

const NAV_ITEMS = [
  { slug: 'ui-snippets',                 short: 'UI Snippets',  icon: '/icons/ui-snippets.svg' },
  { slug: 'html-playground',             short: 'HTML',         icon: '/icons/html-playground.svg' },
  { slug: 'css-playground',              short: 'CSS',          icon: '/icons/css-playground.svg' },
  { slug: 'js-playground',               short: 'JavaScript',   icon: '/icons/js-playground.svg' },
  { slug: 'jquery-playground',           short: 'jQuery',       icon: '/icons/jquery-playground.svg' },
  { slug: 'gsap-playground',             short: 'GSAP',         icon: '/icons/gsap-playground.svg' },
  { slug: 'svg-playground',              short: 'SVG',          icon: '/icons/svg-playground.svg' },
  { slug: 'react-playground',            short: 'React',        icon: '/icons/react-playground.svg' },
  { slug: 'typescript-playground',       short: 'TypeScript',   icon: '/icons/typescript-playground.svg' },
  { slug: 'vue-playground',              short: 'Vue',          icon: '/icons/vue-playground.svg' },
  { slug: 'angular-playground',          short: 'Angular',      icon: '/icons/angular-playground.svg' },
  { slug: 'scss-playground',             short: 'SCSS',         icon: '/icons/scss-playground.svg' },
  { slug: 'tailwind-playground',         short: 'Tailwind',     icon: '/icons/tailwind-playground.svg' },
  { slug: 'bootstrap5-playground',       short: 'Bootstrap',    icon: '/icons/bootstrap5-playground.svg' },
  { slug: 'nextjs-playground',           short: 'Next.js',      icon: '/icons/nextjs-playground.svg' },
  { slug: 'redis-playground',            short: 'Redis',        icon: '/icons/redis-playground.svg' },
];

export default function PlaygroundTopNav({ active }) {
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
      <nav className={styles.nav} ref={scrollRef} aria-label="Coding playgrounds">
        {NAV_ITEMS.filter(item => LIVE_TOOLS.some(t => t.slug === item.slug)).map(item => (
          <a
            key={item.slug}
            href={`/${item.slug}/`}
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
