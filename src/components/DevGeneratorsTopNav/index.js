'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';

// Tools that live on webdevpuneet link locally; the rest still live on fwdtools.
const LOCAL_SLUGS = new Set(SEARCHABLE_TOOLS.map(t => t.slug));
const toolHref = slug => (LOCAL_SLUGS.has(slug) ? `/${slug}/` : `https://fwdtools.com/${slug}/`);

const NAV_ITEMS = [
  { slug: 'uuid-generator',          short: 'UUID Generator', icon: '/icons/uuid-generator.svg' },
  { slug: 'password-generator',      short: 'Password',       icon: '/icons/password-generator.svg' },
  { slug: 'timestamp-converter',     short: 'Timestamp',      icon: '/icons/timestamp-converter.svg' },
  { slug: 'cron-expression-builder', short: 'Cron Builder',   icon: '/icons/cron-expression-builder.svg' },
  { slug: 'number-base-converter',   short: 'Number Base',    icon: '/icons/number-base-converter.svg' },
  { slug: 'unit-converter',          short: 'Unit Converter', icon: '/icons/unit-converter.svg' },
  { slug: 'regex-tester',            short: 'Regex Tester',   icon: '/icons/regex-tester.svg' },
];

export default function DevGeneratorsTopNav({ active }) {
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
      <nav className={styles.nav} ref={scrollRef} aria-label="Developer generators">
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
