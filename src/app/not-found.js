'use client';
import { useState, useEffect } from 'react';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { setNotFound } from '@/lib/not-found-state';
import HeroSnippetPreview from '@/components/HeroSnippetPreview';
import styles from './not-found.module.css';

const POPULAR = [
  'typescript-playground', 'tailwind-playground', 'scss-playground', 'nextjs-playground',
  'angular-playground', 'gsap-playground', 'svg-playground', 'git-playground',
  'ai-prompt-studio', 'mind-map', 'database-schema-designer', 'rest-api-builder-playground',
];

const LEARN = [
  'ui-snippets',
  'html-playground', 'css-playground', 'js-playground', 'react-playground',
  'vue-playground', 'python-playground', 'sql-playground', 'express-playground',
];

const BACKEND = [
  'sql-playground', 'mongo-playground', 'express-playground', 'nodejs-playground',
  'graphql-playground', 'firebase-playground', 'php-playground', 'python-playground',
];

const TOOL_MAP = Object.fromEntries(LIVE_TOOLS.map(t => [t.slug, t]));
const popularTools = POPULAR.map(s => TOOL_MAP[s]).filter(Boolean);
const learnTools = LEARN.map(s => TOOL_MAP[s]).filter(Boolean);
const backendTools = BACKEND.map(s => TOOL_MAP[s]).filter(Boolean);

export default function NotFound() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    setNotFound(true);
    return () => setNotFound(false);
  }, []);

  const results = query.trim().length > 1
    ? LIVE_TOOLS.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : null;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.sub}>That URL doesn't exist — but one of these snippets or playgrounds might be what you're looking for.</p>

        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            className={styles.searchInput}
            placeholder={`Search ${LIVE_TOOLS.length} tools...`}
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && <button className={styles.searchClear} onClick={() => setQuery('')}>×</button>}
        </div>

        {results ? (
          <div className={styles.results}>
            {results.length === 0 ? (
              <p className={styles.noResults}>No tools match "{query}"</p>
            ) : (
              results.map(tool => (
                <a key={tool.slug} href={`/${tool.slug}/`} className={styles.toolCard}>
                  <img src={`/icons/${tool.slug}.svg`} alt="" width={16} height={16} className={styles.toolIcon} />
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.toolSub}>{tool.sub}</span>
                </a>
              ))
            )}
          </div>
        ) : (
          <>
            <HeroSnippetPreview pageSize={4} columns={2} />

            <p className={styles.sectionLabel}>Learn to code</p>
            <div className={styles.learnGrid}>
              {learnTools.map(tool => (
                <a key={tool.slug} href={`/${tool.slug}/`} className={styles.learnCard}>
                  <img src={`/icons/${tool.slug}.svg`} alt="" width={18} height={18} className={styles.toolIcon} />
                  <span className={styles.learnName}>{tool.name.replace(' Playground', '')}</span>
                </a>
              ))}
              <a href="/learn-to-code/" className={styles.learnCardMore}>All playgrounds →</a>
            </div>

            <p className={styles.sectionLabel}>Backend &amp; data</p>
            <div className={styles.learnGrid}>
              {backendTools.map(tool => (
                <a key={tool.slug} href={`/${tool.slug}/`} className={`${styles.learnCard} ${styles.learnCardFreelancer}`}>
                  <img src={`/icons/${tool.slug}.svg`} alt="" width={18} height={18} className={styles.toolIcon} />
                  <span className={styles.learnName}>{tool.name.replace(' Playground', '')}</span>
                </a>
              ))}
              <a href="/learn-to-code/" className={styles.learnCardMore}>All playgrounds →</a>
            </div>

            <p className={styles.sectionLabel}>More playgrounds &amp; tools</p>
            <div className={styles.results}>
              {popularTools.map(tool => (
                <a key={tool.slug} href={`/${tool.slug}/`} className={styles.toolCard}>
                  <img src={`/icons/${tool.slug}.svg`} alt="" width={16} height={16} className={styles.toolIcon} />
                  <span className={styles.toolName}>{tool.name}</span>
                  <span className={styles.toolSub}>{tool.sub}</span>
                </a>
              ))}
            </div>
          </>
        )}

        <a href="/" className={styles.homeLink}>← Back to home</a>
      </div>
    </div>
  );
}
