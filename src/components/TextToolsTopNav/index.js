'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { SEARCHABLE_TOOLS } from '@/lib/tools-registry';

// Tools that live on webdevpuneet link locally; the rest still live on fwdtools.
const LOCAL_SLUGS = new Set(SEARCHABLE_TOOLS.map(t => t.slug));
const toolHref = slug => (LOCAL_SLUGS.has(slug) ? `/${slug}/` : `https://fwdtools.com/${slug}/`);

const NAV_ITEMS = [
  { slug: 'word-counter',              short: 'Word Counter',       icon: '/icons/word-counter.svg' },
  { slug: 'reading-time-calculator',   short: 'Reading Time',       icon: '/icons/reading-time-calculator.svg' },
  { slug: 'text-case-converter',       short: 'Case Converter',     icon: '/icons/text-case-converter.svg' },
  { slug: 'lorem-ipsum-generator',     short: 'Lorem Ipsum',        icon: '/icons/lorem-ipsum-generator.svg' },
  { slug: 'line-utilities',            short: 'Line Utilities',     icon: '/icons/line-utilities.svg' },
  { slug: 'diff-checker',              short: 'Diff Checker',       icon: '/icons/diff-checker.svg' },
  { slug: 'html-to-markdown',          short: 'HTML → Markdown',    icon: '/icons/html-to-markdown.svg' },
  { slug: 'markdown-to-html',          short: 'Markdown → HTML',    icon: '/icons/markdown-to-html.svg' },
  { slug: 'markdown-editor',           short: 'Markdown Editor',    icon: '/icons/markdown-editor.svg' },
  { slug: 'html-table-generator',      short: 'HTML Table',         icon: '/icons/html-table-generator.svg' },
  { slug: 'markdown-table-generator',  short: 'Markdown Table',     icon: '/icons/markdown-table-generator.svg' },
];

export default function TextToolsTopNav({ active }) {
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
      <nav className={styles.nav} ref={scrollRef} aria-label="Text tools">
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
