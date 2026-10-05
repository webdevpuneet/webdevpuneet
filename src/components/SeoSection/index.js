'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import { AdSlot300x600 } from '@/components/AdSlot';
import { TOOLS, LIVE_TOOLS } from '@/lib/tools-registry';
import { RELATED_TOOLS } from '@/lib/related-tools';

/* ── Text node highlighter (DOM mutation, client-only) ── */
function applyHighlights(container, query, caseSensitive) {
  const marks = [];
  if (!query || !container) return marks;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, caseSensitive ? 'g' : 'gi');

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const tag = node.parentElement?.tagName;
      if (!tag || tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach(textNode => {
    const text = textNode.textContent;
    re.lastIndex = 0;
    if (!re.test(text)) return;
    re.lastIndex = 0;
    const parent = textNode.parentNode;
    if (!parent) return;
    const frag = document.createDocumentFragment();
    let last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const mark = document.createElement('mark');
      mark.dataset.seoSearch = '';
      mark.style.cssText = 'background:rgba(251,191,36,0.25);color:inherit;border-radius:2px;';
      mark.textContent = m[0];
      frag.appendChild(mark);
      marks.push(mark);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    parent.replaceChild(frag, textNode);
  });

  return marks;
}

function clearHighlights(container) {
  if (!container) return;
  container.querySelectorAll('mark[data-seo-search]').forEach(mark => {
    const parent = mark.parentNode;
    if (parent) { parent.replaceChild(document.createTextNode(mark.textContent), mark); parent.normalize(); }
  });
}

/* ── Inline rendering helpers ── */
function renderInline(text) {
  if (!text) return text;
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) return <a key={i} href={linkMatch[2]} className={styles.inlineLink}>{linkMatch[1]}</a>;
    return part;
  });
}

function Paragraphs({ text, className }) {
  if (!text) return null;
  return (
    <>
      {text.split(/\n\n+/).map(p => p.trim()).filter(Boolean).map((p, i) => {
        if (p.startsWith('### ')) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-ui)', margin: '8px 0 4px' }}>{renderInline(p.slice(4))}</h3>;
        if (p.startsWith('## '))  return <h2 key={i} style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-ui)', margin: '12px 0 6px' }}>{renderInline(p.slice(3))}</h2>;
        if (p.startsWith('<table')) return <div key={i} className="seo-table-wrap" dangerouslySetInnerHTML={{ __html: p }} />;
        if (p.startsWith('<pre'))   return <div key={i} className={styles.seoPre} dangerouslySetInnerHTML={{ __html: p }} />;
        return <p key={i} className={className}>{renderInline(p)}</p>;
      })}
    </>
  );
}

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div className={styles.faqList}>
      {faqs.map((item, i) => {
        const isOpen = open === i;
        const hidden = mounted && !isOpen;
        return (
          <div key={i} className={styles.faqItem}>
            <button className={`${styles.faqQ} ${isOpen ? styles.faqQOpen : ''}`} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              <span className={styles.faqQNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.faqQText}>{item.q}</span>
              <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </button>
            <div className={`${styles.faqA} ${hidden ? styles.faqAHidden : ''}`} aria-hidden={hidden}>
              <Paragraphs text={item.a} className={styles.faqAP} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const ALL_CATEGORIES = [
  { label: 'All Tools',        href: '/',                 icon: '🔧' },
  { label: 'Learn to Code',    href: '/learn-to-code',    icon: '🎓' },
  { label: 'UI Snippets',      href: '/ui-snippets',      icon: '🧩' },
];

const ALL_PLAYGROUND_SLUGS = [
  'ui-snippets',
  'html-playground','js-playground','typescript-playground','css-playground','scss-playground','tailwind-playground',
  'react-playground','angular-playground','vue-playground','nextjs-playground','gsap-playground',
];

const ALL_FREELANCER_SLUGS = [
  'freelance-dashboard','freelance-invoice-generator','freelance-expense-tracker',
  'client-crm','proposal-builder','contract-template-manager',
  'local-invoice-tracker','retainer-tracker','milestone-payment-tracker',
  'scope-creep-tracker','follow-up-reminder-board','client-intake-form-builder',
  'freelance-availability-planner','freelance-rate-calculator','time-tracker',
];

const DEFAULT_RELATED_SLUGS = [
  'word-counter',
  'code-screenshot-generator',
  'json-formatter',
  'timestamp-converter',
  'cron-expression-builder',
  'diff-checker',
  'color-picker',
  'qr-code-generator',
];

function PlaygroundSiblings({ currentSlug }) {
  const [showAll, setShowAll] = useState(false);
  const toolMap = Object.fromEntries(LIVE_TOOLS.map(t => [t.slug, t]));
  const all = ALL_PLAYGROUND_SLUGS.map(s => toolMap[s]).filter(t => t && t.slug !== currentSlug);
  const INITIAL = 8;
  const visible = showAll ? all : all.slice(0, INITIAL);
  const remaining = all.length - INITIAL;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <h2 className={styles.sectionH2} style={{ margin: 0 }}>
          Learn HTML, CSS, JavaScript, React and Next.js Visually
        </h2>
        <a href="/learn-to-code/" className={styles.relatedSub} style={{ textDecoration: 'none', color: 'var(--accent)', fontWeight: 600, fontSize: 13 }}>
          See all →
        </a>
      </div>
      <p className={styles.relatedSub} style={{ marginBottom: 14 }}>
        Live editor · Instant preview · Beginner to pro · No install required
      </p>
      <div className={styles.relatedGrid}>
        {visible.map(tool => (
          <a key={tool.slug} href={`/${tool.slug}/`} className={styles.relatedCard}>
            <span className={styles.relatedIcon} style={{ color: tool.accent }}>
              <img src={tool.icon} alt="" width={24} height={24} style={{ display: 'block' }} />
            </span>
            <div>
              <div className={styles.relatedName}>{tool.name}</div>
              <div className={styles.relatedSub}>{tool.sub}</div>
            </div>
            <svg style={{ marginLeft: 'auto', flexShrink: 0, color: 'var(--text3)' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        ))}
      </div>
      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1px solid var(--border)', borderRadius: 8,
            padding: '7px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text2)',
            cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s',
            fontFamily: 'var(--font-ui)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9"/></svg>
          Show {remaining} more playground{remaining !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
}

function FreelancerSiblings({ currentSlug }) {
  const [showAll, setShowAll] = useState(false);
  const toolMap = Object.fromEntries(LIVE_TOOLS.map(t => [t.slug, t]));
  const all = ALL_FREELANCER_SLUGS.map(s => toolMap[s]).filter(t => t && t.slug !== currentSlug);
  const INITIAL = 8;
  const visible = showAll ? all : all.slice(0, INITIAL);
  const remaining = all.length - INITIAL;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <h2 className={styles.sectionH2} style={{ margin: 0 }}>
          Freelance Business Tools for Invoices, Clients and Project Tracking
        </h2>
        <a href="https://fwdtools.com/freelancer-tools/" className={styles.relatedSub} style={{ textDecoration: 'none', color: 'var(--accent)', fontWeight: 600, fontSize: 13 }}>
          See all →
        </a>
      </div>
      <p className={styles.relatedSub} style={{ marginBottom: 14 }}>
        Manage invoices, proposals, clients, contracts, expenses and daily freelance workflows with browser-based tools.
      </p>
      <div className={styles.relatedGrid}>
        {visible.map(tool => (
          <a key={tool.slug} href={`/${tool.slug}/`} className={styles.relatedCard}>
            <span className={styles.relatedIcon} style={{ color: tool.accent }}>
              {tool.icon?.startsWith('/')
                ? <img src={tool.icon} alt="" width={24} height={24} style={{ display: 'block' }} />
                : tool.icon}
            </span>
            <div>
              <div className={styles.relatedName}>{tool.name}</div>
              <div className={styles.relatedSub}>{tool.sub}</div>
            </div>
            <svg style={{ marginLeft: 'auto', flexShrink: 0, color: 'var(--text3)' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        ))}
      </div>
      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1px solid var(--border)', borderRadius: 8,
            padding: '7px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text2)',
            cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s',
            fontFamily: 'var(--font-ui)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9"/></svg>
          Show {remaining} more tool{remaining !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
}

function ToolCategories() {
  return (
    <div>
      <h2 className={styles.sectionH2}>Explore Developer, CSS, PDF and Freelancer Tools</h2>
      <div className={styles.categoryPills}>
        {ALL_CATEGORIES.filter(c => c.label !== 'All Tools').map(c => (
          <a key={c.href} href={c.href} className={styles.categoryPill}>
            <span className={styles.categoryPillIcon}>{c.icon}</span>
            {c.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function RelatedTools({ slug }) {
  const relatedSlugs = RELATED_TOOLS[slug] || DEFAULT_RELATED_SLUGS;
  const toolMap = Object.fromEntries(LIVE_TOOLS.map(t => [t.slug, t]));
  const related = relatedSlugs
    ?.filter(s => s !== slug)
    .map(s => toolMap[s])
    .filter(Boolean) ?? [];
  if (!related.length) return null;

  return (
    <div>
      <h2 className={styles.sectionH2}>You Might Also Like</h2>
      <div className={styles.relatedGrid}>
        {related.map(tool => (
          <a key={tool.slug} href={`/${tool.slug}/`} className={styles.relatedCard}>
            <span className={styles.relatedIcon} style={{ color: tool.accent }}>
              {tool.icon?.startsWith('/')
                ? <img src={tool.icon} alt="" width={24} height={24} style={{ display:'block' }} />
                : tool.icon}
            </span>
            <div>
              <div className={styles.relatedName}>{tool.name}</div>
              <div className={styles.relatedSub}>{tool.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ToolCTA({ slug }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('fav-tools') || '[]');
      setIsFav(favs.includes(slug));
    } catch {}
  }, [slug]);

  const toggleFav = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('fav-tools') || '[]');
      const next = favs.includes(slug) ? favs.filter(s => s !== slug) : [...favs, slug];
      localStorage.setItem('fav-tools', JSON.stringify(next));
      setIsFav(next.includes(slug));
      window.dispatchEvent(new CustomEvent('fav-tools-changed'));
    } catch {}
  };

  if (!slug) return null;

  return (
    <div className={styles.ctaRow}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaIcon}>🔖</div>
        <div className={styles.ctaBody}>
          <div className={styles.ctaTitle}>Bookmark this page</div>
          <div className={styles.ctaText}>
            Press <kbd className={styles.ctaKbd}>Ctrl+D</kbd> (Windows) or <kbd className={styles.ctaKbd}>⌘D</kbd> (Mac) to save this tool in your browser for instant access anytime — no sign-up needed.
          </div>
        </div>
      </div>
      <button
        className={`${styles.ctaCard} ${styles.ctaBtn} ${isFav ? styles.ctaBtnFaved : ''}`}
        onClick={toggleFav}
      >
        <div className={styles.ctaIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={isFav ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div className={styles.ctaBody}>
          <div className={styles.ctaTitle}>{isFav ? 'Added to favourites' : 'Add to favourites'}</div>
          <div className={styles.ctaText}>
            {isFav
              ? 'This tool is pinned at the top of your sidebar for quick access.'
              : 'Pin this tool to the top of your sidebar so it\'s always one click away.'}
          </div>
        </div>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section renderers
   Each maps to a section `type` in the schema.
───────────────────────────────────────────── */

/** text — one or more paragraphs with optional label + heading */
function TextSection({ label, heading, headingSize = 'h2', text, extra, quickFacts = true, boxed = false }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.seoH2;
  const isAbout = label === 'About this tool' || label === 'About this UI Snippet' || label === 'About this category' || label === 'About this tag' || label === 'About the site';

  if (isAbout) {
    const paras = (text || '').split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    return (
      <div className={styles.aboutWrap}>
        <div className={styles.aboutHeader}>
          {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
          {heading && <Tag className={`${headingClass} ${styles.aboutTitle}`}>{heading}</Tag>}
        </div>
        <div className={styles.aboutBody}>
          {extra}
          {paras[0] && (paras[0].startsWith('### ') ? <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-ui)', marginBottom: 4 }}>{renderInline(paras[0].slice(4))}</h3> : paras[0].startsWith('<table') ? <div dangerouslySetInnerHTML={{ __html: paras[0] }} /> : <p className={styles.seoPLead}>{renderInline(paras[0])}</p>)}
          {paras.slice(1).map((p, i) => {
            if (p.startsWith('### ')) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-ui)', margin: '16px 0 4px' }}>{renderInline(p.slice(4))}</h3>;
            if (p.startsWith('## '))  return <h2 key={i} style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-ui)', margin: '20px 0 6px' }}>{renderInline(p.slice(3))}</h2>;
            if (p.startsWith('<table')) return <div key={i} dangerouslySetInnerHTML={{ __html: p }} />;
            if (p.startsWith('<pre'))   return <div key={i} className={styles.seoPre} dangerouslySetInnerHTML={{ __html: p }} />;
            return <p key={i} className={styles.seoP}>{renderInline(p)}</p>;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={boxed ? styles.boxedText : undefined}>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <Paragraphs text={text} className={styles.seoP} />
      {extra}
    </div>
  );
}

/** features — card grid (strings) or item list (objects) */
function FeatureCard({ item }) {
  if (typeof item !== 'string') {
    return (
      <div className={styles.featCard}>
        <div className={styles.featCardCheck}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div className={styles.featCardBody}>
          <div className={styles.featureItemTitle}>{renderInline(item.title)}</div>
          {item.text && <div className={styles.featureItemDesc}>{renderInline(item.text)}</div>}
        </div>
      </div>
    );
  }
  // Parse "Key: description" for bold prefix
  const colonIdx = item.indexOf(':');
  const hasColon = colonIdx > 0 && colonIdx < 48;
  const key  = hasColon ? item.slice(0, colonIdx).trim() : null;
  const rest = hasColon ? item.slice(colonIdx + 1).trim() : item;
  return (
    <div className={styles.featCard}>
      <div className={styles.featCardCheck}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div className={styles.featCardBody}>
        {key && <span className={styles.featCardKey}>{key}: </span>}
        <span className={styles.featCardRest}>{renderInline(rest)}</span>
      </div>
    </div>
  );
}

function FeaturesSection({ heading, headingSize = 'h2', label, items = [] }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.sectionH2;
  return (
    <div>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <div className={styles.featGrid}>
        {items.map((item, i) => <FeatureCard key={i} item={item} />)}
      </div>
    </div>
  );
}

/** steps — numbered step list; each item is a string or { title, text } */
function StepsSection({ heading, headingSize = 'h2', label, items = [], text }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.sectionH2;
  // Accept either items array or a `text` string split on double newlines
  const steps = items.length
    ? items
    : (text || '').split(/\n\n+/).map(p => p.trim()).filter(Boolean).map(p => ({ text: p }));
  return (
    <div>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <ol className={styles.stepList}>
        {steps.map((step, i) => (
          <li key={i} className={styles.stepItem}>
            <span className={styles.stepNum}>{i + 1}</span>
            <div className={styles.stepContent}>
              {step.title && <strong className={styles.stepTitle}>{step.title}</strong>}
              <span>{renderInline(typeof step === 'string' ? step : step.text)}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * cards — configurable-column card grid
 * items: { icon?, title, desc, badge? }
 * columns: 2 | 3 | 4 (default 3)
 */
function UseCaseIcon({ icon }) {
  const key = typeof icon === 'string' ? icon.toUpperCase() : '';
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  switch (key) {
    case 'PHP':
      return (
        <svg {...common}>
          <path d="M4 12c0-3 3.6-5.5 8-5.5s8 2.5 8 5.5-3.6 5.5-8 5.5S4 15 4 12z" />
          <path d="M8 10v5" />
          <path d="M8 10h1.8a1.5 1.5 0 0 1 0 3H8" />
          <path d="M12 10v5" />
          <path d="M12 12.5h2" />
          <path d="M14 10v5" />
          <path d="M16.5 10v5" />
          <path d="M16.5 10h1.8a1.5 1.5 0 0 1 0 3h-1.8" />
        </svg>
      );
    case 'API':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M7 9h.01M10 9h.01M13 9h.01" />
          <path d="M7 14h4" />
          <path d="M14 13l2 2-2 2" />
          <path d="M10 17l-2-2 2-2" />
        </svg>
      );
    case 'OOP':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M11 7.5h2" />
          <path d="M12 11v3" />
        </svg>
      );
    case 'DB':
    case 'SQL':
    case 'DATABASE':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case 'PRO':
      return (
        <svg {...common}>
          <path d="M12 3l7 4v5c0 4.4-2.8 7.4-7 9-4.2-1.6-7-4.6-7-9V7z" />
          <path d="M8.8 12.2l2.1 2.1 4.4-4.8" />
        </svg>
      );
    case 'CMS':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 9h8" />
          <path d="M8 13h5" />
          <path d="M8 17h7" />
          <path d="M17 13h.01" />
        </svg>
      );
    case 'APP':
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h3" />
          <path d="M16.5 15.5l2 2 3-3" />
        </svg>
      );
    case 'FILTER':
      return (
        <svg {...common}>
          <path d="M4 5h16l-6.5 7.5V19l-3-1.5v-5L4 5z" />
        </svg>
      );
    case 'TAX':
      return (
        <svg {...common}>
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );
    case 'PMI':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9.5 14.5l5-5" />
        </svg>
      );
    case 'HOA':
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case 'CSV':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="9" y1="4" x2="9" y2="20" />
          <line x1="15" y1="10" x2="15" y2="20" />
        </svg>
      );
    case '5Y':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <line x1="8" y1="3" x2="8" y2="7" />
          <line x1="16" y1="3" x2="16" y2="7" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'EQ':
      return (
        <svg {...common}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case 'GIT':
      return (
        <svg {...common}>
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      );
    case 'BR':
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M6 21V9a9 9 0 0 0 9 9" />
        </svg>
      );
    case 'CMD':
      return (
        <svg {...common}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case 'GH':
      return (
        <svg {...common}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'UNDO':
      return (
        <svg {...common}>
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      );
    case 'CHECK':
      return (
        <svg {...common}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case 'LOCK':
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'LINK':
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    case 'IDX':
      return (
        <svg {...common}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      );
    case 'RANGE':
      return (
        <svg {...common}>
          <line x1="4" y1="8" x2="20" y2="8" />
          <circle cx="9" cy="8" r="2.5" />
          <line x1="4" y1="16" x2="20" y2="16" />
          <circle cx="15" cy="16" r="2.5" />
        </svg>
      );
    case 'SORT':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="7" rx="1.5" />
          <rect x="14" y="4" width="6" height="7" rx="1.5" />
          <rect x="9" y="15" width="6" height="5" rx="1.5" />
          <path d="M7 13v3h2" />
          <path d="M17 13v3h-2" />
        </svg>
      );
    case 'DEL':
      return (
        <svg {...common}>
          <path d="M5 7h14" />
          <path d="M9 7V5h6v2" />
          <path d="M8 10v8" />
          <path d="M12 10v8" />
          <path d="M16 10v8" />
          <path d="M7 7l1 14h8l1-14" />
        </svg>
      );
    case 'ROT':
      return (
        <svg {...common}>
          <path d="M18.5 8A7 7 0 1 0 20 14" />
          <path d="M18.5 3v5h-5" />
          <rect x="8" y="9" width="7" height="9" rx="1.5" />
        </svg>
      );
    case 'FORM':
      return (
        <svg {...common}>
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h3" />
          <path d="M15.5 16.5l1.2 1.2 2.3-2.7" />
        </svg>
      );
    case 'DOC':
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h4" />
          <path d="M10 12h5" />
          <path d="M10 16h5" />
        </svg>
      );
    case 'FLOW':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="6" height="5" rx="1.3" />
          <rect x="15" y="5" width="6" height="5" rx="1.3" />
          <rect x="9" y="15" width="6" height="5" rx="1.3" />
          <path d="M9 7.5h6" />
          <path d="M18 10v3a4 4 0 0 1-4 4" />
          <path d="M6 10v3a4 4 0 0 0 4 4" />
        </svg>
      );
    case 'PDF':
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h4" />
          <path d="M10 13h4" />
          <path d="M10 17h3" />
        </svg>
      );
    case 'PNG':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M4 12h16" />
          <path d="M10 5v14" />
          <path d="M15 5v14" />
          <path d="M7 16l2.2-2.5 1.8 2 1.4-1.4 2.6 2.9" />
        </svg>
      );
    case 'JPG':
    case 'IMG':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.4" />
          <path d="M6.5 17l4.2-4.5 2.6 2.8 1.8-1.9 2.8 3.6" />
        </svg>
      );
    case 'WEBP':
    case 'WEB':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16" />
          <path d="M12 4a12 12 0 0 1 0 16" />
          <path d="M12 4a12 12 0 0 0 0 16" />
        </svg>
      );
    case 'CSS':
      return (
        <svg {...common}>
          <path d="M5 4h14l-1.4 14L12 21l-5.6-3L5 4z" />
          <path d="M9 8h6" />
          <path d="M8.8 12h5.8" />
          <path d="M9.4 16l2.6.9 2.7-.9.3-2" />
        </svg>
      );
    case 'CODE':
      return (
        <svg {...common}>
          <path d="M8.5 8l-4 4 4 4" />
          <path d="M15.5 8l4 4-4 4" />
          <path d="M13.5 5.5l-3 13" />
        </svg>
      );
    case 'RUPEE':
      return (
        <svg {...common}>
          <path d="M7 5h10" />
          <path d="M7 9h10" />
          <path d="M9 5h3.5a4 4 0 0 1 0 8H8l7 6" />
        </svg>
      );
    case 'CHART':
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M7 15l3-4 3 2 5-7" />
          <path d="M16 6h2v2" />
        </svg>
      );
    case 'ZIP':
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v5h4" />
          <path d="M10 6h2" />
          <path d="M12 8h2" />
          <path d="M10 10h2" />
          <rect x="10" y="14" width="4" height="4" rx="0.8" />
        </svg>
      );
    case 'OCR':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="11" height="14" rx="2" />
          <path d="M7 8h5" />
          <path d="M7 12h4" />
          <circle cx="16.5" cy="16.5" r="3.2" />
          <path d="M19 19l2 2" />
        </svg>
      );
    case 'A4':
      return (
        <svg {...common}>
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M10 8h4" />
          <path d="M10 12h4" />
          <path d="M10 16h3" />
        </svg>
      );
    case 'SCAN':
      return (
        <svg {...common}>
          <path d="M6 8V5h12v3" />
          <rect x="4" y="10" width="16" height="8" rx="2" />
          <path d="M7 14h10" />
          <path d="M8 21h8" />
        </svg>
      );
    case 'MAIL':
      return (
        <svg {...common}>
          <rect x="3.5" y="6" width="17" height="12" rx="2" />
          <path d="M4 8l8 5 8-5" />
        </svg>
      );
    case 'PPT':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="12" rx="2" />
          <path d="M8 20h8" />
          <path d="M12 17v3" />
          <path d="M8 13l2.3-2.5 2 2 1.7-1.8 2.3 2.3" />
        </svg>
      );
    case 'SAFE':
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.5-2.8 7.7-7 10-4.2-2.3-7-5.5-7-10V6z" />
          <path d="M9.5 12.5l1.7 1.7 3.6-4.1" />
        </svg>
      );
    case 'STAMP':
      return (
        <svg {...common}>
          <path d="M9 4h6v5l2.5 3v3h-11v-3L9 9z" />
          <path d="M6 19h12" />
          <path d="M8 15h8" />
          <path d="M10 8h4" />
        </svg>
      );
    case 'FOOD':
      return (
        <svg {...common}>
          <path d="M6 3v6a3 3 0 0 0 3 3v7" />
          <path d="M6 6h3" />
          <path d="M6 3h3" />
          <path d="M17 3c0 4-1 6-1 9v6" />
        </svg>
      );
    case 'CAR':
      return (
        <svg {...common}>
          <path d="M5 17H3v-5l2.5-6h11L19 12v5h-2" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
          <path d="M5 12h14" />
        </svg>
      );
    case 'PEOPLE':
      return (
        <svg {...common}>
          <circle cx="9" cy="7" r="3" />
          <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
          <circle cx="17" cy="8" r="2.5" />
          <path d="M21 20c0-2.5-2-4-4-4" />
        </svg>
      );
    case 'DELIVERY':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="12" height="11" rx="1.5" />
          <path d="M15 9h3l2 4v5h-5V9z" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="17.5" cy="18" r="1.5" />
        </svg>
      );
    case 'HOTEL':
      return (
        <svg {...common}>
          <path d="M3 7v12" />
          <path d="M21 17v2" />
          <path d="M3 17h18" />
          <path d="M7 17v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
          <circle cx="7" cy="9" r="1.5" />
        </svg>
      );
    case 'STAR':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'MONEY':
      return (
        <svg {...common}>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      );
    case 'CLOCK':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case 'GLOBAL':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M2 12h20" />
          <path d="M12 2c-3 3-4.5 6.5-4.5 10s1.5 7 4.5 10" />
          <path d="M12 2c3 3 4.5 6.5 4.5 10s-1.5 7-4.5 10" />
        </svg>
      );
    case 'INVOICE':
      return (
        <svg {...common}>
          <rect x="6" y="2" width="12" height="19" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h4" />
          <path d="M4 6v16l2-1 2 1 2-1 2 1 2-1 2 1V6" />
        </svg>
      );
    case 'WRITE':
      return (
        <svg {...common}>
          <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
          <path d="M15 5l4 4" />
        </svg>
      );
    case 'SYNC':
      return (
        <svg {...common}>
          <path d="M4.5 9A8 8 0 0 1 19 8" />
          <path d="M19.5 15A8 8 0 0 1 5 16" />
          <path d="M19 5v4h-4" />
          <path d="M5 19v-4h4" />
        </svg>
      );
    case 'EXPORT':
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <path d="M8 11l4 4 4-4" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      );
    case 'TABS':
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="13" rx="2" />
          <path d="M3 12h18" />
          <path d="M7 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        </svg>
      );
    case 'LEARN':
      return (
        <svg {...common}>
          <path d="M4 9l8-5 8 5-8 5-8-5z" />
          <path d="M4 9v7" />
          <path d="M20 9v7" />
          <path d="M8 21c0-2.2 1.8-4 4-4s4 1.8 4 4" />
          <path d="M4 16c2 1.3 4.5 2 8 2s6-0.7 8-2" />
        </svg>
      );
    case 'DESIGN':
      return (
        <svg {...common}>
          <path d="M12 20h7" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
          <path d="M15 5l3 3" />
        </svg>
      );
    case 'NAV':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <path d="M7 9V5" />
        </svg>
      );
    case 'MOBILE':
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case 'COPY':
      return (
        <svg {...common}>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case 'ACCESS':
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="3" />
          <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
          <path d="M12 14v2" />
          <path d="M10 17h4" />
        </svg>
      );
    case 'IMAGE':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      );
    case 'CONVERT':
      return (
        <svg {...common}>
          <polyline points="17 1 21 5 17 9"/>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
          <polyline points="7 23 3 19 7 15"/>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
        </svg>
      );
    case 'ART':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
      );
    case 'ANIM':
      return (
        <svg {...common}>
          <path d="M5 12c0-3.9 3.1-7 7-7s7 3.1 7 7" />
          <path d="M12 5V3" />
          <path d="M5 12H3" />
          <path d="M21 12h-2" />
          <path d="M8 8l-2-2M18 8l-2 2" />
          <rect x="8" y="14" width="8" height="5" rx="1.5" />
          <path d="M10 14v-2h4v2" />
        </svg>
      );
    case 'GAME':
      return (
        <svg {...common}>
          <rect x="2" y="8" width="20" height="12" rx="3" />
          <path d="M8 14h4M10 12v4" />
          <circle cx="16" cy="13" r="1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'DATA':
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <rect x="6" y="12" width="3" height="7" rx="0.8" />
          <rect x="11" y="8" width="3" height="11" rx="0.8" />
          <rect x="16" y="5" width="3" height="14" rx="0.8" />
        </svg>
      );
    case 'TABLE':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
          <path d="M9 5v14" />
          <path d="M15 10v9" />
        </svg>
      );
    case 'DASH':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="8" height="8" rx="1.5" />
          <rect x="13" y="4" width="8" height="5" rx="1.5" />
          <rect x="13" y="11" width="8" height="9" rx="1.5" />
          <rect x="3" y="14" width="8" height="6" rx="1.5" />
        </svg>
      );
    case 'TOOL':
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    default:
      return icon;
  }
}

function CardsSection({ heading, headingSize = 'h2', label, columns = 3, items = [] }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.sectionH2;
  const colClass = { 2: styles.cardsGrid2, 4: styles.cardsGrid4 }[columns] || styles.cardsGrid3;
  return (
    <div>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <div className={`${styles.cardsGrid} ${colClass}`}>
        {items.map((c, i) => (
          <div key={i} className={styles.useCard}>
            {c.icon && <span className={styles.useIcon}><UseCaseIcon icon={c.icon} /></span>}
            {c.badge && <span className={styles.cardBadge}>{c.badge}</span>}
            {c.title && <div className={styles.useTitle}>{renderInline(c.title)}</div>}
            {(c.text || c.desc) && <div className={styles.useDesc}>{renderInline(c.text || c.desc)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Copy-paste code box with a macOS-style title bar and Copy button */
function PromptCodeBox({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text || '')
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); })
      .catch(() => {});
  };
  return (
    <div className={styles.promptWindow}>
      <div className={styles.promptHeader}>
        <div className={styles.promptDots} aria-hidden="true">
          <span className={styles.promptDotRed} />
          <span className={styles.promptDotAmber} />
          <span className={styles.promptDotGreen} />
        </div>
        <span className={styles.promptLangLabel}>text</span>
      </div>
      <div className={styles.promptBody}>
        <button className={`${styles.promptCopyBtn} ${copied ? styles.promptCopyBtnOk : ''}`} onClick={copy} type="button">
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre><code>{text}</code></pre>
      </div>
    </div>
  );
}

/** aiPrompt — "Build with AI" paragraph plus a copy-paste recreate-it prompt */
function AiPromptSection({ heading, headingSize = 'h2', label, paragraph, prompt }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.seoH2;
  return (
    <div>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <div className={styles.boxedText}>
        <Paragraphs text={paragraph} className={styles.seoP} />
        {prompt && (
          <>
            <h3 className={styles.sectionH3} style={{ marginTop: 4 }}>Prompt to recreate it</h3>
            <p className={styles.seoP}>Copy this into your AI assistant of choice to build the effect from scratch, or as a jumping-off point for your own variant:</p>
            <PromptCodeBox text={prompt} />
            <p className={styles.seoP} style={{ marginTop: 10 }}>
              Want to tighten it up first? Run this prompt through the{' '}
              <a href="/ai-prompt-studio/" className={styles.inlineLink}>AI Prompt Studio</a>{' '}
              to score it across 8 quality dimensions, catch anti-patterns, and tune the wording for Claude, ChatGPT, or Gemini before you paste it in.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/** faq — accordion Q&A list */
function FaqSection({ heading, headingSize = 'h2', label, items = [] }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.sectionH2;
  return (
    <div>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <FaqAccordion faqs={items} />
    </div>
  );
}

/** image — responsive image with optional caption */
function ImageSection({ src, alt, caption, width, height, rounded = true }) {
  return (
    <figure className={styles.imageFigure}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ''}
        className={`${styles.seoImage} ${rounded ? styles.seoImageRounded : ''}`}
        width={width}
        height={height}
        loading="lazy"
      />
      {caption && <figcaption className={styles.imageCaption}>{renderInline(caption)}</figcaption>}
    </figure>
  );
}

/**
 * table — data or comparison table
 * columns: string[] (header row)
 * rows: string[][] (data rows)
 */
function TableSection({ heading, headingSize = 'h2', label, columns, rows = [], boxed = false }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.sectionH2;
  return (
    <div className={boxed ? styles.boxedText : undefined}>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <div className={styles.tableWrap}>
        <table className={styles.seoTable}>
          {columns?.length > 0 && (
            <thead>
              <tr>{columns.map((col, i) => <th key={i}>{renderInline(col)}</th>)}</tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => <td key={j}>{renderInline(cell)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** timeline - dated product updates / changelog */
function TimelineSection({ heading, headingSize = 'h2', label, items = [] }) {
  const Tag = headingSize === 'h3' ? 'h3' : 'h2';
  const headingClass = headingSize === 'h3' ? styles.sectionH3 : styles.sectionH2;
  return (
    <div>
      {label && <p className={styles.seoLabel} data-label={label}>{label}</p>}
      {heading && <Tag className={headingClass}>{heading}</Tag>}
      <div className={styles.timelineList}>
        {items.map((item, i) => (
          <article key={i} className={styles.timelineItem}>
            <div className={styles.timelineMarker} aria-hidden="true" />
            <div className={styles.timelineCard}>
              {item.date && <time className={styles.timelineDate}>{item.date}</time>}
              {item.title && <h3 className={styles.timelineTitle}>{renderInline(item.title)}</h3>}
              {item.text && <Paragraphs text={item.text} className={styles.timelineText} />}
              {item.items?.length > 0 && (
                <ul className={styles.timelineBullets}>
                  {item.items.map((entry, j) => (
                    <li key={j}>{renderInline(entry)}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/**
 * callout — highlighted info/tip/warning box
 * variant: 'info' | 'tip' | 'warning' | 'note'
 */
function CalloutSection({ heading, text, variant = 'info' }) {
  const variantClass = {
    info:    styles.calloutInfo,
    tip:     styles.calloutTip,
    warning: styles.calloutWarning,
    note:    styles.calloutNote,
  }[variant] || styles.calloutInfo;
  return (
    <div className={`${styles.callout} ${variantClass}`}>
      {heading && <strong className={styles.calloutHeading}>{heading}</strong>}
      <Paragraphs text={text} className={styles.calloutP} />
    </div>
  );
}

/**
 * 2col — two-column layout; each column is a Section object
 * Accepts `left` and `right` which are themselves section objects.
 * Optionally pass `gap` or `ratio` ('1:1' | '2:1' | '1:2').
 */
function TwoColSection({ left, right, ratio = '1:1' }) {
  const ratioClass = { '2:1': styles.twoColLeft2, '1:2': styles.twoColRight2 }[ratio] || '';
  return (
    <div className={`${styles.twoCol} ${ratioClass}`}>
      <SectionBlock section={left} />
      <SectionBlock section={right} />
    </div>
  );
}

/** Dispatches to the correct renderer based on section.type */
function SectionBlock({ section }) {
  if (!section) return null;
  switch (section.type) {
    case 'text':     return <TextSection    {...section} />;
    case 'features': return <FeaturesSection {...section} />;
    case 'steps':    return <StepsSection   {...section} />;
    case 'cards':    return <CardsSection   {...section} />;
    case 'faq':      return <FaqSection     {...section} />;
    case 'image':    return <ImageSection   {...section} />;
    case 'table':    return <TableSection   {...section} />;
    case 'timeline': return <TimelineSection {...section} />;
    case 'callout':  return <CalloutSection {...section} />;
    case '2col':     return <TwoColSection  {...section} />;
    case 'aiPrompt': return <AiPromptSection {...section} />;
    case 'node':     return section.node ?? null;
    default:         return null;
  }
}

/* ─────────────────────────────────────────────
   Backward-compatibility: convert legacy flat
   props to sections array so old page.js files
   don't need to change.
───────────────────────────────────────────── */
function flattenSections(sections) {
  // Convert any 2col (about left + features right) into [features, about] flat sections
  const result = [];
  for (const s of sections) {
    if (s.type === '2col' && s.left?.type === 'text' && s.right?.type === 'features') {
      if (s.right.items?.length) result.push({ ...s.right });
      result.push({ ...s.left });
    } else {
      result.push(s);
    }
  }
  return result;
}

function normalizeSections({ sections, about, features, howToUse, useCases, faqs, whatsNew, aiPrompt, aboutExtra, aboutLabel = 'About this tool', quickFacts = true, injectAfterAiPrompt }) {
  if (sections) return flattenSections(sections);
  const result = [];
  if (features?.length) {
    result.push({ type: 'features', label: 'What\'s included', heading: 'Features', items: features });
  }
  if (about) {
    result.push({ type: 'text', label: aboutLabel, heading: about?.title, text: about?.description || '', extra: aboutExtra, quickFacts });
  }
  if (aiPrompt) {
    result.push({
      type: 'aiPrompt',
      label: 'Build with AI',
      heading: 'Build, Understand, Optimize, and Extend It With AI',
      paragraph: aiPrompt.paragraph,
      prompt: aiPrompt.prompt,
    });
  }
  // Lands right after "Build, Understand, Optimize, and Extend It With AI" —
  // or, on the handful of pages with no aiPrompt, right after About — rather
  // than always at the very top of the page.
  if (injectAfterAiPrompt) {
    result.push({ type: 'node', node: injectAfterAiPrompt });
  }
  if (howToUse) {
    if (typeof howToUse === 'object' && howToUse.type === 'steps') {
      result.push({ type: 'steps', label: 'Step by step', heading: 'How to Use', items: howToUse.items });
    } else if (Array.isArray(howToUse)) {
      result.push({ type: 'steps', label: 'Step by step', heading: 'How to Use', items: howToUse });
    } else {
      result.push({ type: 'text', label: 'Step by step', heading: 'How to Use', text: howToUse });
    }
  }
  if (useCases?.length) result.push({ type: 'cards', label: 'Real-world uses', heading: 'Common Use Cases', columns: 3, items: useCases });
  if (faqs?.length) result.push({ type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs });
  if (whatsNew?.length) result.push({ type: 'timeline', label: 'Changelog', heading: 'Recent Features and Improvements', items: whatsNew });
  return result;
}

/* ─────────────────────────────────────────────
   Main SeoSection component
───────────────────────────────────────────── */
export default function SeoSection({
  // New API
  slug, title, subtitle, sections, noShare, noRelated, injectAfterAbout, injectAfterAiPrompt, aboutExtra, aboutLabel, quickFacts, topExtra, bottomExtra, titleExtra,
  // Legacy flat props (auto-converted to sections)
  about, features, howToUse, useCases, faqs, whatsNew, aiPrompt,
}) {
  const normalizedSections = normalizeSections({ sections, about, features, howToUse, useCases, faqs, whatsNew, aiPrompt, aboutExtra, aboutLabel, quickFacts, injectAfterAiPrompt });

  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCase,  setSearchCase]  = useState(false);
  const [searchIdx,   setSearchIdx]   = useState(0);
  const [matchCount,  setMatchCount]  = useState(0);

  const sectionRef     = useRef(null);
  const searchInputRef = useRef(null);

  // Apply / clear highlights whenever query, case, or search state changes
  useEffect(() => {
    const el = sectionRef.current;
    clearHighlights(el);
    if (!searchOpen || !searchQuery.trim()) { setMatchCount(0); return; }
    const marks = applyHighlights(el, searchQuery, searchCase);
    setMatchCount(marks.length);
    setSearchIdx(0);
  }, [searchOpen, searchQuery, searchCase]);

  // Re-apply highlights after accordion toggles (FAQ content appears in DOM)
  useEffect(() => {
    if (!searchOpen || !sectionRef.current) return;
    const el = sectionRef.current;
    const onClick = () => {
      if (!searchQuery.trim()) return;
      setTimeout(() => {
        clearHighlights(el);
        const marks = applyHighlights(el, searchQuery, searchCase);
        setMatchCount(marks.length);
      }, 50);
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [searchOpen, searchQuery, searchCase]);

  // Highlight current match (bright) and scroll to it
  useEffect(() => {
    if (!searchOpen || !matchCount) return;
    const el = sectionRef.current;
    if (!el) return;
    const marks = el.querySelectorAll('mark[data-seo-search]');
    marks.forEach((m, i) => {
      m.style.background  = i === searchIdx ? 'rgba(251,191,36,0.6)'  : 'rgba(251,191,36,0.25)';
      m.style.outline     = i === searchIdx ? '2px solid rgba(251,191,36,0.85)' : '';
      m.style.borderRadius = '2px';
    });
    marks[searchIdx]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [searchIdx, matchCount, searchOpen]);

  // Ctrl/Cmd+F opens find bar when section is in view
  useEffect(() => {
    const onKey = (e) => {
      if (!(e.ctrlKey || e.metaKey) || e.key !== 'f') return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      e.preventDefault();
      setSearchOpen(true);
      setTimeout(() => searchInputRef.current?.select(), 0);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => clearHighlights(sectionRef.current), []);

  const clampedIdx = matchCount ? ((searchIdx % matchCount) + matchCount) % matchCount : 0;
  const goNext = useCallback(() => setSearchIdx(i => matchCount ? (i + 1) % matchCount : 0), [matchCount]);
  const goPrev = useCallback(() => setSearchIdx(i => matchCount ? (i - 1 + matchCount) % matchCount : 0), [matchCount]);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.select(), 0);
  };
  const closeSearch = () => {
    setSearchOpen(false);
    clearHighlights(sectionRef.current);
    setMatchCount(0);
  };

  return (
    <section ref={sectionRef} className={styles.seo}>

      {/* Page H1 — Hero zone */}
      {title && (
        <div className={styles.heroZone}>
          <div className={styles.heroOrb1} aria-hidden="true" />
          <div className={styles.heroOrb2} aria-hidden="true" />
          <div className={styles.heroOrb3} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.seoH1}>{title}</h1>
              <div className={styles.heroAccentLine} aria-hidden="true" />
              {subtitle && <p className={styles.seoSubtitle}>{subtitle}</p>}
              {/* Rendered directly under the H1 — used for a snippet's tag chips */}
              {titleExtra}
              {slug && (() => {
                const tool = TOOLS.find(t => t.slug === slug);
                if (!tool?.lastmod) return null;
                const [y, m, d] = tool.lastmod.split('-').map(Number);
                const fmt = new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                return (
                  <div className={styles.lastmodRow}>
                    <span className={styles.lastmodPill}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      Updated {fmt}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Last modified — for tools without a title (e.g. resume-builder) */}
      {!title && slug && (() => {
        const tool = TOOLS.find(t => t.slug === slug);
        if (!tool?.lastmod) return null;
        const [y, m, d] = tool.lastmod.split('-').map(Number);
        const fmt = new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return (
          <div className={styles.lastmodRow}>
            <p className={styles.lastmod}>Last updated: {fmt}</p>
          </div>
        );
      })()}

      {/* Find bar */}
      {searchOpen && (
        <div className={styles.findBar}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.findBarIcon}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={searchInputRef}
            className={styles.findInput}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search in page…"
            spellCheck={false}
            onKeyDown={e => {
              if (e.key === 'Enter')  { e.shiftKey ? goPrev() : goNext(); }
              if (e.key === 'Escape') closeSearch();
            }}
          />
          <span className={styles.findCount}>
            {searchQuery ? (matchCount ? `${clampedIdx + 1} / ${matchCount}` : 'No results') : ''}
          </span>
          <button className={styles.findNavBtn} onClick={goPrev} disabled={!matchCount} title="Previous (Shift+Enter)">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button className={styles.findNavBtn} onClick={goNext} disabled={!matchCount} title="Next (Enter)">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button
            className={`${styles.findCaseBtn} ${searchCase ? styles.findCaseActive : ''}`}
            onClick={() => setSearchCase(c => !c)}
            title="Case sensitive"
          >Aa</button>
          <button className={styles.findCloseBtn} onClick={closeSearch}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      {/* Two-column body: content left, 300×600 ad right */}
      {(topExtra || normalizedSections.length > 0 || bottomExtra) && (
        <div className={styles.seoBody}>
          <div className={styles.seoMain}>
            {topExtra && (
              <>
                {topExtra}
                {normalizedSections.length > 0 && <div className={styles.sectionDivider} aria-hidden="true" />}
              </>
            )}
            {normalizedSections.map((section, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className={styles.sectionDivider} aria-hidden="true" />}
                <SectionBlock section={section} />
              </React.Fragment>
            ))}
            {bottomExtra && (
              <>
                {normalizedSections.length > 0 && <div className={styles.sectionDivider} aria-hidden="true" />}
                {bottomExtra}
              </>
            )}
          </div>
          <div className={styles.seoAdCol}>
            <AdSlot300x600 />
          </div>
        </div>
      )}


    </section>
  );
}
