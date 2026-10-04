'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
// ── Comprehensive Google Fonts list (category + variants) ─────────────────────
// Loaded lazily from Google Fonts API; this is the offline fallback/seed list
const SEED_FONTS = [
  // Serif
  { family: 'Playfair Display', category: 'serif' },
  { family: 'Merriweather', category: 'serif' },
  { family: 'Lora', category: 'serif' },
  { family: 'Libre Baskerville', category: 'serif' },
  { family: 'EB Garamond', category: 'serif' },
  { family: 'Cormorant Garamond', category: 'serif' },
  { family: 'Crimson Pro', category: 'serif' },
  { family: 'DM Serif Display', category: 'serif' },
  { family: 'Fraunces', category: 'serif' },
  { family: 'Spectral', category: 'serif' },
  { family: 'Cinzel', category: 'serif' },
  { family: 'Cardo', category: 'serif' },
  { family: 'Vollkorn', category: 'serif' },
  { family: 'Noto Serif', category: 'serif' },
  { family: 'Bitter', category: 'serif' },
  { family: 'Zilla Slab', category: 'serif' },
  { family: 'Rokkitt', category: 'serif' },
  { family: 'Source Serif 4', category: 'serif' },
  { family: 'Alegreya', category: 'serif' },
  { family: 'Domine', category: 'serif' },
  { family: 'GFS Didot', category: 'serif' },
  { family: 'Tinos', category: 'serif' },
  { family: 'Unna', category: 'serif' },
  { family: 'Neuton', category: 'serif' },
  { family: 'Fjord One', category: 'serif' },
  // Sans Serif
  { family: 'Inter', category: 'sans-serif' },
  { family: 'Roboto', category: 'sans-serif' },
  { family: 'Open Sans', category: 'sans-serif' },
  { family: 'Lato', category: 'sans-serif' },
  { family: 'Montserrat', category: 'sans-serif' },
  { family: 'Poppins', category: 'sans-serif' },
  { family: 'Nunito', category: 'sans-serif' },
  { family: 'Raleway', category: 'sans-serif' },
  { family: 'DM Sans', category: 'sans-serif' },
  { family: 'IBM Plex Sans', category: 'sans-serif' },
  { family: 'Space Grotesk', category: 'sans-serif' },
  { family: 'Outfit', category: 'sans-serif' },
  { family: 'Josefin Sans', category: 'sans-serif' },
  { family: 'Figtree', category: 'sans-serif' },
  { family: 'Plus Jakarta Sans', category: 'sans-serif' },
  { family: 'Syne', category: 'sans-serif' },
  { family: 'Lexend', category: 'sans-serif' },
  { family: 'Mulish', category: 'sans-serif' },
  { family: 'Karla', category: 'sans-serif' },
  { family: 'Jost', category: 'sans-serif' },
  { family: 'Work Sans', category: 'sans-serif' },
  { family: 'Barlow', category: 'sans-serif' },
  { family: 'Noto Sans', category: 'sans-serif' },
  { family: 'Source Sans 3', category: 'sans-serif' },
  { family: 'Hind', category: 'sans-serif' },
  { family: 'Cabin', category: 'sans-serif' },
  { family: 'Oxygen', category: 'sans-serif' },
  { family: 'Ubuntu', category: 'sans-serif' },
  { family: 'Quicksand', category: 'sans-serif' },
  { family: 'Manrope', category: 'sans-serif' },
  { family: 'Rubik', category: 'sans-serif' },
  { family: 'Muli', category: 'sans-serif' },
  { family: 'Exo 2', category: 'sans-serif' },
  { family: 'Titillium Web', category: 'sans-serif' },
  { family: 'Overpass', category: 'sans-serif' },
  { family: 'Public Sans', category: 'sans-serif' },
  { family: 'Nanum Gothic', category: 'sans-serif' },
  { family: 'Be Vietnam Pro', category: 'sans-serif' },
  { family: 'Nunito Sans', category: 'sans-serif' },
  { family: 'Assistant', category: 'sans-serif' },
  { family: 'Libre Franklin', category: 'sans-serif' },
  { family: 'Merriweather Sans', category: 'sans-serif' },
  { family: 'Varela Round', category: 'sans-serif' },
  // Display
  { family: 'Abril Fatface', category: 'display' },
  { family: 'Bebas Neue', category: 'display' },
  { family: 'Oswald', category: 'display' },
  { family: 'Anton', category: 'display' },
  { family: 'Righteous', category: 'display' },
  { family: 'Fredoka One', category: 'display' },
  { family: 'Lobster', category: 'display' },
  { family: 'Pacifico', category: 'display' },
  { family: 'Alfa Slab One', category: 'display' },
  { family: 'Titan One', category: 'display' },
  { family: 'Boogaloo', category: 'display' },
  { family: 'Comfortaa', category: 'display' },
  { family: 'Poiret One', category: 'display' },
  { family: 'Sigmar One', category: 'display' },
  { family: 'Bree Serif', category: 'display' },
  { family: 'Yeseva One', category: 'display' },
  { family: 'Archivo Black', category: 'display' },
  { family: 'Fjalla One', category: 'display' },
  { family: 'Black Han Sans', category: 'display' },
  { family: 'Ultra', category: 'display' },
  { family: 'Squada One', category: 'display' },
  { family: 'Audiowide', category: 'display' },
  { family: 'Exo', category: 'display' },
  { family: 'Teko', category: 'display' },
  { family: 'Chakra Petch', category: 'display' },
  { family: 'Russo One', category: 'display' },
  { family: 'Permanent Marker', category: 'display' },
  { family: 'Lilita One', category: 'display' },
  // Monospace
  { family: 'JetBrains Mono', category: 'monospace' },
  { family: 'Fira Code', category: 'monospace' },
  { family: 'Source Code Pro', category: 'monospace' },
  { family: 'Space Mono', category: 'monospace' },
  { family: 'IBM Plex Mono', category: 'monospace' },
  { family: 'Roboto Mono', category: 'monospace' },
  { family: 'Inconsolata', category: 'monospace' },
  { family: 'Courier Prime', category: 'monospace' },
  { family: 'Cutive Mono', category: 'monospace' },
  { family: 'Share Tech Mono', category: 'monospace' },
  { family: 'Ubuntu Mono', category: 'monospace' },
  { family: 'Anonymous Pro', category: 'monospace' },
  { family: 'Overpass Mono', category: 'monospace' },
  { family: 'Nanum Gothic Coding', category: 'monospace' },
  // Handwriting
  { family: 'Dancing Script', category: 'handwriting' },
  { family: 'Satisfy', category: 'handwriting' },
  { family: 'Caveat', category: 'handwriting' },
  { family: 'Kalam', category: 'handwriting' },
  { family: 'Cookie', category: 'handwriting' },
  { family: 'Patrick Hand', category: 'handwriting' },
  { family: 'Indie Flower', category: 'handwriting' },
  { family: 'Shadows Into Light', category: 'handwriting' },
  { family: 'Amatic SC', category: 'handwriting' },
  { family: 'Handlee', category: 'handwriting' },
  { family: 'Nothing You Could Do', category: 'handwriting' },
  { family: 'Rancho', category: 'handwriting' },
  { family: 'Allura', category: 'handwriting' },
  { family: 'Alex Brush', category: 'handwriting' },
  { family: 'Great Vibes', category: 'handwriting' },
  { family: 'Sacramento', category: 'handwriting' },
  { family: 'Marck Script', category: 'handwriting' },
];

const CAT_LABELS = {
  all: 'All',
  serif: 'Serif',
  'sans-serif': 'Sans Serif',
  display: 'Display',
  monospace: 'Mono',
  handwriting: 'Handwriting',
};

const CATEGORIES = ['all', 'serif', 'sans-serif', 'display', 'monospace', 'handwriting'];

// ── Font loading ──────────────────────────────────────────────────────────────
const loadedFonts = new Set();

function loadFont(family) {
  if (typeof window === 'undefined') return;
  if (loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:ital,wght@0,400;0,600;0,700;1,400&display=swap`;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// ── Sample preview text ───────────────────────────────────────────────────────
const SAMPLE_TEXTS = {
  article: {
    label: 'Article',
    heading: 'The Art of Typography',
    sub: 'How typefaces shape the way we read',
    body: 'Typography is the craft of arranging type to make written language legible and beautiful. The right font pairing creates harmony between personality and function — the heading draws you in, while the body keeps you reading.',
  },
  landing: {
    label: 'Landing Page',
    heading: 'Build faster, ship better',
    sub: 'The modern developer platform',
    body: 'Deploy with confidence on a platform built for performance. From prototype to production in minutes — with zero config, automatic scaling, and real-time analytics built in.',
  },
  magazine: {
    label: 'Magazine',
    heading: 'Spring Collection 2025',
    sub: 'Where elegance meets the everyday',
    body: 'This season, the lines between structured tailoring and fluid silhouettes blur beautifully. Designers are embracing contrast as a creative tool — pairing the rigid with the relaxed.',
  },
};

// ── Font picker panel ─────────────────────────────────────────────────────────
function FontPicker({ fonts, headingFont, bodyFont, onSelectHeading, onSelectBody, title = null }) {
  const [activeTab, setActiveTab] = useState('heading');
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [visibleFonts, setVisibleFonts] = useState(new Set());
  const listRef = useRef(null);
  const observerRef = useRef(null);

  const selectedFont = activeTab === 'heading' ? headingFont : bodyFont;
  const onSelect = activeTab === 'heading' ? onSelectHeading : onSelectBody;
  const accentColor = activeTab === 'heading' ? '#f87171' : '#4ade80';

  // Reset search/cat when switching tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
    setSearch('');
    setCat('all');
  };

  const filtered = fonts.filter(f => {
    const matchCat = cat === 'all' || f.category === cat;
    const matchSearch = !search || f.family.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // IntersectionObserver: load font when list item enters viewport
  useEffect(() => {
    if (!listRef.current) return;
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver((entries) => {
      const newFonts = [];
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const family = entry.target.dataset.family;
          if (family && !loadedFonts.has(family)) {
            loadFont(family);
            newFonts.push(family);
          }
        }
      });
      if (newFonts.length > 0) {
        setVisibleFonts(prev => new Set([...prev, ...newFonts]));
      }
    }, { root: listRef.current, rootMargin: '80px 0px', threshold: 0 });

    listRef.current.querySelectorAll('[data-family]').forEach(el => observer.observe(el));
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [filtered.length, activeTab]);

  return (
    <div className={styles.pickerPanel}>
      {title}
      {/* Tabs */}
      <div className={styles.pickerTabs}>
        <button
          className={`${styles.pickerTab} ${activeTab === 'heading' ? styles.pickerTabActive : ''}`}
          style={activeTab === 'heading' ? { borderBottomColor: '#f87171', color: '#f87171' } : {}}
          onClick={() => switchTab('heading')}
        >
          <span className={styles.tabDot} style={{ background: '#f87171' }} />
          Heading
          <span className={styles.tabFont}>{headingFont}</span>
        </button>
        <button
          className={`${styles.pickerTab} ${activeTab === 'body' ? styles.pickerTabActive : ''}`}
          style={activeTab === 'body' ? { borderBottomColor: '#4ade80', color: '#4ade80' } : {}}
          onClick={() => switchTab('body')}
        >
          <span className={styles.tabDot} style={{ background: '#4ade80' }} />
          Body
          <span className={styles.tabFont}>{bodyFont}</span>
        </button>
      </div>

      {/* Search */}
      <div className={styles.pickerSearch}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.searchIcon}>
          <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={`Search ${activeTab} font…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button className={styles.searchClear} onClick={() => setSearch('')}>×</button>}
      </div>

      {/* Category pills */}
      <div className={styles.catPills}>
        {CATEGORIES.map(c => (
          <button key={c}
            className={`${styles.catPill} ${cat === c ? styles.catPillActive : ''}`}
            style={cat === c ? { background: accentColor, borderColor: accentColor, color: '#000' } : {}}
            onClick={() => setCat(c)}>
            {CAT_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Font list */}
      <div className={styles.fontList} ref={listRef}>
        {filtered.length === 0 && <div className={styles.fontListEmpty}>No fonts found</div>}
        {filtered.map(f => {
          const isActive = selectedFont === f.family;
          const isLoaded = visibleFonts.has(f.family) || loadedFonts.has(f.family);
          return (
            <div
              key={f.family}
              data-family={f.family}
              className={`${styles.fontItem} ${isActive ? styles.fontItemActive : ''}`}
              style={isActive ? { borderLeftColor: accentColor, background: `${accentColor}14` } : {}}
              onClick={() => { loadFont(f.family); onSelect(f.family); }}
              title={f.family}
            >
              <div
                className={styles.fontPreviewName}
                style={isLoaded ? { fontFamily: `'${f.family}', sans-serif` } : {}}
              >
                {f.family}
              </div>
              <span className={styles.fontCat}>{CAT_LABELS[f.category] || f.category}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FontPairingTool() {
  const [fonts, setFonts] = useState(SEED_FONTS);
  const [headingFont, setHeadingFont] = useState('Playfair Display');
  const [bodyFont, setBodyFont] = useState('Inter');
  const [hSize, setHSize] = useState(42);
  const [bSize, setBSize] = useState(16);
  const [hWeight, setHWeight] = useState(700);
  const [bWeight, setBWeight] = useState(400);
  const [lightTheme, setLightTheme] = useState(true);
  const [sampleKey] = useState('article');
  const [copied, setCopied] = useState(false);

  const sample = SAMPLE_TEXTS[sampleKey];
  const previewBg = lightTheme ? '#f9f8f5' : '#13161b';
  const previewText = lightTheme ? '#1a1a2e' : '#e8e8f0';
  const previewMuted = lightTheme ? '#666' : '#8888a0';
  const previewBorder = lightTheme ? '#e0ddd8' : '#252535';

  // Fetch full font list from Google Fonts API
  useEffect(() => {
    const API_KEY = 'AIzaSyDvjpsSSqKzF7BvIovLGUyXEzLgTUAq0Is'; // public demo key — replace with your own
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=popularity`)
      .then(r => r.json())
      .then(data => {
        if (data.items) {
          const mapped = data.items.map(f => ({ family: f.family, category: f.category }));
          setFonts(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Load initial fonts
  useEffect(() => {
    loadFont(headingFont);
    loadFont(bodyFont);
  }, []);

  const selectHeading = (family) => {
    loadFont(family);
    setHeadingFont(family);
  };

  const selectBody = (family) => {
    loadFont(family);
    setBodyFont(family);
  };

  const cssCode = `/* Import from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(headingFont)}:wght@400;700&family=${encodeURIComponent(bodyFont)}:wght@400;600&display=swap');

/* Heading */
h1, h2, h3 {
  font-family: '${headingFont}', serif;
}

/* Body */
body, p {
  font-family: '${bodyFont}', sans-serif;
}`;

  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="font-pairing-tool" />
      {/* Body */}
      <div className={styles.layout}>
        {/* Left: tabbed font picker sidebar */}
        <FontPicker
          fonts={fonts}
          headingFont={headingFont}
          bodyFont={bodyFont}
          onSelectHeading={selectHeading}
          onSelectBody={selectBody}
          title={
            // Tool name heads the left column, so the ad can sit at the very top on the right.
            <div className={styles.pickerTitle}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>Ff</div>
                <span>Font <span className={styles.logoAccent}>Pairing</span></span>
              </div>
            </div>
          }
        />

        {/* Right: preview + controls + output */}
        <div className={styles.main}>
          <PlaygroundTopAd />
          {/* Size controls */}
          <div className={styles.controls}>
            <span className={styles.ctrlFontPair}>
              <span style={{ color: '#f87171', fontWeight: 600 }}>{headingFont}</span>
              <span className={styles.ctrlPlus}>+</span>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>{bodyFont}</span>
            </span>
            <div className={styles.controlGroup}>
              <span className={styles.ctrlLabel} style={{ color: '#f87171' }}>Heading</span>
              <input type="range" min={24} max={80} value={hSize} onChange={e => setHSize(+e.target.value)} className={styles.rangeRed} />
              <span className={styles.ctrlVal}>{hSize}px</span>
              <input type="range" min={100} max={900} step={100} value={hWeight} onChange={e => setHWeight(+e.target.value)} className={styles.rangeRed} />
              <span className={styles.ctrlVal}>{hWeight}</span>
            </div>
            <div className={styles.controlSep} />
            <div className={styles.controlGroup}>
              <span className={styles.ctrlLabel} style={{ color: '#4ade80' }}>Body</span>
              <input type="range" min={12} max={24} value={bSize} onChange={e => setBSize(+e.target.value)} className={styles.rangeGreen} />
              <span className={styles.ctrlVal}>{bSize}px</span>
              <input type="range" min={100} max={900} step={100} value={bWeight} onChange={e => setBWeight(+e.target.value)} className={styles.rangeGreen} />
              <span className={styles.ctrlVal}>{bWeight}</span>
            </div>
            <label className={styles.themeToggle}>
              <input type="checkbox" checked={lightTheme} onChange={e => setLightTheme(e.target.checked)} />
              <span className={styles.toggleTrack}><span className={styles.toggleThumb} /></span>
              <span>Light</span>
            </label>
          </div>

          {/* Preview */}
          <div className={styles.preview} style={{ background: previewBg }}>
            <div className={styles.previewInner}>
              <p className={styles.previewLabel} style={{ color: previewMuted }}>HEADING — {headingFont}</p>
              <h1 style={{
                fontFamily: `'${headingFont}', serif`,
                fontSize: hSize + 'px',
                color: previewText,
                lineHeight: 1.1,
                fontWeight: hWeight,
                margin: '0 0 8px',
                letterSpacing: '-0.02em',
              }}>
                {sample.heading}
              </h1>
              <h2 style={{
                fontFamily: `'${headingFont}', serif`,
                fontSize: Math.round(hSize * 0.5) + 'px',
                color: previewMuted,
                lineHeight: 1.3,
                fontWeight: Math.max(300, hWeight - 200),
                margin: '0 0 28px',
              }}>
                {sample.sub}
              </h2>

              <div style={{ height: 1, background: previewBorder, marginBottom: 28 }} />

              <p className={styles.previewLabel} style={{ color: previewMuted }}>BODY — {bodyFont}</p>
              <p style={{
                fontFamily: `'${bodyFont}', sans-serif`,
                fontSize: bSize + 'px',
                color: previewText,
                lineHeight: 1.75,
                fontWeight: bWeight,
                margin: 0,
              }}>
                {sample.body}
              </p>

              <div style={{ height: 1, background: previewBorder, margin: '28px 0' }} />

              {/* Alphabet specimen */}
              <p className={styles.previewLabel} style={{ color: previewMuted }}>SPECIMEN</p>
              <p style={{ fontFamily: `'${headingFont}', serif`, fontSize: Math.round(hSize * 0.45) + 'px', color: previewText, lineHeight: 1.4, margin: '0 0 8px', fontWeight: hWeight }}>
                AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
              </p>
              <p style={{ fontFamily: `'${bodyFont}', sans-serif`, fontSize: bSize + 'px', color: previewMuted, lineHeight: 1.5, margin: 0 }}>
                0123456789 !@#$%^&*() The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>

          {/* CSS output */}
          <div className={styles.codeSection}>
            <div className={styles.codeSectionHeader}>
              <span className={styles.codeSectionTitle}>CSS Import</span>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`} onClick={copyCSS}>
                {copied ? '✓ Copied' : 'Copy CSS'}
              </button>
            </div>
            <pre className={styles.codeBlock}>{cssCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
