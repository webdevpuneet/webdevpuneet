'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import ForkToMyCodeButton from '@/components/ForkToMyCodeButton';
import { CENTER_PAGE_CSS } from '@/lib/fork-to-mycode';
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

/* ─── Google Fonts ────────────────────────────────────────────────────────── */

const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat',
  'Raleway', 'Nunito', 'Source Sans 3', 'Oswald', 'Ubuntu', 'PT Sans',
  'DM Sans', 'Space Grotesk', 'Outfit', 'Plus Jakarta Sans', 'Quicksand',
  'Exo 2', 'Kanit', 'Barlow', 'Mulish', 'Work Sans', 'Figtree',
  'Noto Sans', 'Rubik', 'Jost', 'Sora', 'Manrope', 'Lexend',
  'Playfair Display', 'Merriweather', 'Libre Baskerville',
  'Pacifico', 'Lobster', 'Dancing Script', 'Righteous',
  'Bebas Neue', 'Anton', 'Black Han Sans',
];

const SYSTEM_FONTS = ['inherit', 'sans-serif', 'serif', 'monospace'];

const ALL_FONTS = [...SYSTEM_FONTS, ...GOOGLE_FONTS];

const loadedFonts = new Set();

function loadGoogleFont(family) {
  if (!family || SYSTEM_FONTS.includes(family) || loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const id = `gf-${family.replace(/\s+/g, '-')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
}

/* ─── Font picker ─────────────────────────────────────────────────────────── */

function FontPicker({ value, onChange }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 180 });
  const inputRef = useRef(null);
  const ref = useRef(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_FONTS.filter(f => f.toLowerCase().includes(q)).slice(0, 50);
  }, [search]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function openDropdown() {
    if (inputRef.current) {
      const r = inputRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + 2, left: r.left, width: r.width });
    }
    setOpen(true);
    setSearch('');
  }

  function select(font) {
    loadGoogleFont(font);
    onChange(font);
    setOpen(false);
    setSearch('');
  }

  return (
    <div className={styles.fontPicker} ref={ref}>
      <input
        ref={inputRef}
        className={styles.fontSearch}
        value={open ? search : value}
        placeholder="Search fonts…"
        onFocus={openDropdown}
        onChange={e => setSearch(e.target.value)}
        spellCheck={false}
        style={{ fontFamily: value }}
      />
      {open && (
        <div className={styles.fontDropdown} style={{ top: dropPos.top, left: dropPos.left, width: Math.max(dropPos.width, 160) }}>
          {filtered.map(f => (
            <div
              key={f}
              className={`${styles.fontOption} ${f === value ? styles.fontSelected : ''}`}
              style={{ fontFamily: f }}
              onMouseDown={() => select(f)}
            >
              {f}
            </div>
          ))}
          {filtered.length === 0 && <div className={styles.fontEmpty}>No fonts found</div>}
        </div>
      )}
    </div>
  );
}

/* ─── Presets ─────────────────────────────────────────────────────────────── */

const PRESETS = [
  {
    name: 'Electric Blue', category: 'Gradient',
    s: { label: 'Click Me', bg1: '#4776e6', bg2: '#8e54e9', gradDir: '135deg', bgType: 'gradient', textColor: '#ffffff', fontSize: 15, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: '#4776e6', borderStyle: 'solid', shadow: '0 4px 15px rgba(71,118,230,0.4)', hoverShadow: '0 6px 20px rgba(71,118,230,0.6)', hoverScale: 1.04, hoverBg1: '#5a89f5', hoverBg2: '#9f6bf5', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Sunset', category: 'Gradient',
    s: { label: 'Explore', bg1: '#f093fb', bg2: '#f5576c', gradDir: '135deg', bgType: 'gradient', textColor: '#ffffff', fontSize: 15, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: '#f093fb', borderStyle: 'solid', shadow: '0 4px 15px rgba(245,87,108,0.4)', hoverShadow: '0 6px 22px rgba(245,87,108,0.6)', hoverScale: 1.04, hoverBg1: '#f5a8ff', hoverBg2: '#ff6b85', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Aurora', category: 'Gradient',
    s: { label: 'Get Started', bg1: '#43e97b', bg2: '#38f9d7', gradDir: '135deg', bgType: 'gradient', textColor: '#0a2a1f', fontSize: 15, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: '#43e97b', borderStyle: 'solid', shadow: '0 4px 15px rgba(67,233,123,0.35)', hoverShadow: '0 6px 22px rgba(67,233,123,0.55)', hoverScale: 1.04, hoverBg1: '#5df590', hoverBg2: '#55ffee', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Neon Cyan', category: 'Neon',
    s: { label: 'ACTIVATE', bg1: 'transparent', bg2: 'transparent', gradDir: '135deg', bgType: 'solid', solidBg: '#000000', textColor: '#00fff5', fontSize: 14, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 4, borderWidth: 2, borderColor: '#00fff5', borderStyle: 'solid', shadow: '0 0 10px #00fff5, inset 0 0 10px rgba(0,255,245,0.1)', hoverShadow: '0 0 20px #00fff5, 0 0 40px #00fff5, inset 0 0 20px rgba(0,255,245,0.2)', hoverScale: 1, hoverBg1: 'rgba(0,255,245,0.08)', hoverBg2: 'rgba(0,255,245,0.08)', transition: 0.3, cursor: 'pointer', letterSpacing: 3, textTransform: 'uppercase', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Neon Pink', category: 'Neon',
    s: { label: 'LAUNCH', bg1: 'transparent', bg2: 'transparent', gradDir: '135deg', bgType: 'solid', solidBg: '#0a000a', textColor: '#ff2d78', fontSize: 14, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 4, borderWidth: 2, borderColor: '#ff2d78', borderStyle: 'solid', shadow: '0 0 10px #ff2d78, inset 0 0 10px rgba(255,45,120,0.1)', hoverShadow: '0 0 20px #ff2d78, 0 0 40px #ff2d78, inset 0 0 20px rgba(255,45,120,0.2)', hoverScale: 1, hoverBg1: 'rgba(255,45,120,0.08)', hoverBg2: 'rgba(255,45,120,0.08)', transition: 0.3, cursor: 'pointer', letterSpacing: 3, textTransform: 'uppercase', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Glass', category: 'Glassmorphism',
    s: { label: 'Continue', bg1: 'rgba(255,255,255,0.15)', bg2: 'rgba(255,255,255,0.05)', gradDir: '135deg', bgType: 'gradient', textColor: '#ffffff', fontSize: 15, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', borderStyle: 'solid', shadow: '0 8px 32px rgba(0,0,0,0.2)', hoverShadow: '0 8px 40px rgba(0,0,0,0.3)', hoverScale: 1.03, hoverBg1: 'rgba(255,255,255,0.22)', hoverBg2: 'rgba(255,255,255,0.1)', transition: 0.3, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', backdropFilter: 'blur(12px)', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Frosted', category: 'Glassmorphism',
    s: { label: 'Learn More', bg1: 'rgba(255,255,255,0.1)', bg2: 'rgba(255,255,255,0.03)', gradDir: '180deg', bgType: 'gradient', textColor: '#e2e8f0', fontSize: 15, fontWeight: '500', paddingX: 32, paddingY: 13, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'solid', shadow: '0 4px 24px rgba(0,0,0,0.15)', hoverShadow: '0 8px 32px rgba(0,0,0,0.25)', hoverScale: 1.03, hoverBg1: 'rgba(255,255,255,0.18)', hoverBg2: 'rgba(255,255,255,0.08)', transition: 0.3, cursor: 'pointer', letterSpacing: 0.5, textTransform: 'none', backdropFilter: 'blur(16px)', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Soft Push', category: 'Neumorphism',
    s: { label: 'Press Me', bg1: '#e0e5ec', bg2: '#e0e5ec', gradDir: '145deg', bgType: 'solid', solidBg: '#e0e5ec', textColor: '#5a6070', fontSize: 15, fontWeight: '600', paddingX: 28, paddingY: 13, borderRadius: 12, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: '6px 6px 12px #b8bec7, -6px -6px 12px #ffffff', hoverShadow: '2px 2px 5px #b8bec7, -2px -2px 5px #ffffff', hoverScale: 1, hoverBg1: '#e0e5ec', hoverBg2: '#e0e5ec', transition: 0.2, cursor: 'pointer', letterSpacing: 0.2, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Outlined', category: 'Outlined',
    s: { label: 'Sign Up', bg1: 'transparent', bg2: 'transparent', gradDir: '135deg', bgType: 'solid', solidBg: 'transparent', textColor: '#6366f1', fontSize: 15, fontWeight: '600', paddingX: 28, paddingY: 11, borderRadius: 8, borderWidth: 2, borderColor: '#6366f1', borderStyle: 'solid', shadow: 'none', hoverShadow: '0 4px 15px rgba(99,102,241,0.25)', hoverScale: 1.03, hoverBg1: 'rgba(99,102,241,0.08)', hoverBg2: 'rgba(99,102,241,0.08)', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Pill Outline', category: 'Outlined',
    s: { label: 'Subscribe', bg1: 'transparent', bg2: 'transparent', gradDir: '135deg', bgType: 'solid', solidBg: 'transparent', textColor: '#10b981', fontSize: 14, fontWeight: '600', paddingX: 32, paddingY: 11, borderRadius: 50, borderWidth: 2, borderColor: '#10b981', borderStyle: 'solid', shadow: 'none', hoverShadow: '0 4px 15px rgba(16,185,129,0.25)', hoverScale: 1.03, hoverBg1: 'rgba(16,185,129,0.1)', hoverBg2: 'rgba(16,185,129,0.1)', transition: 0.25, cursor: 'pointer', letterSpacing: 0.5, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: '3D Depth', category: '3D',
    s: { label: 'Push Me', bg1: '#4776e6', bg2: '#4776e6', gradDir: '135deg', bgType: 'solid', solidBg: '#4776e6', textColor: '#ffffff', fontSize: 15, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: '0 6px 0 #2a4fa3, 0 8px 6px rgba(0,0,0,0.3)', hoverShadow: '0 3px 0 #2a4fa3, 0 5px 4px rgba(0,0,0,0.25)', hoverScale: 1, hoverBg1: '#5a89f5', hoverBg2: '#5a89f5', transition: 0.12, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', hoverTranslateY: 3, outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Retro Pop', category: '3D',
    s: { label: 'GO!', bg1: '#fbbf24', bg2: '#fbbf24', gradDir: '135deg', bgType: 'solid', solidBg: '#fbbf24', textColor: '#1a1a1a', fontSize: 16, fontWeight: '800', paddingX: 32, paddingY: 12, borderRadius: 6, borderWidth: 2, borderColor: '#1a1a1a', borderStyle: 'solid', shadow: '4px 4px 0px #1a1a1a', hoverShadow: '2px 2px 0px #1a1a1a', hoverScale: 1, hoverBg1: '#fcd34d', hoverBg2: '#fcd34d', transition: 0.1, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', hoverTranslateY: 2, outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Minimal', category: 'Minimal',
    s: { label: 'Learn More', bg1: '#1a1a1a', bg2: '#1a1a1a', gradDir: '135deg', bgType: 'solid', solidBg: '#1a1a1a', textColor: '#ffffff', fontSize: 14, fontWeight: '500', paddingX: 28, paddingY: 12, borderRadius: 6, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: 'none', hoverShadow: 'none', hoverScale: 1, hoverBg1: '#333333', hoverBg2: '#333333', transition: 0.2, cursor: 'pointer', letterSpacing: 0.5, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Ghost', category: 'Minimal',
    s: { label: 'Cancel', bg1: 'transparent', bg2: 'transparent', gradDir: '135deg', bgType: 'solid', solidBg: 'transparent', textColor: '#94a3b8', fontSize: 14, fontWeight: '500', paddingX: 24, paddingY: 11, borderRadius: 6, borderWidth: 1, borderColor: '#334155', borderStyle: 'solid', shadow: 'none', hoverShadow: 'none', hoverScale: 1, hoverBg1: 'rgba(148,163,184,0.06)', hoverBg2: 'rgba(148,163,184,0.06)', transition: 0.2, cursor: 'pointer', letterSpacing: 0.2, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Amber Solid', category: 'Solid',
    s: { label: 'Buy Now', bg1: '#f59e0b', bg2: '#f59e0b', gradDir: '135deg', bgType: 'solid', solidBg: '#f59e0b', textColor: '#1a1a1a', fontSize: 15, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: '0 4px 12px rgba(245,158,11,0.35)', hoverShadow: '0 6px 18px rgba(245,158,11,0.5)', hoverScale: 1.04, hoverBg1: '#fbbf24', hoverBg2: '#fbbf24', transition: 0.2, cursor: 'pointer', letterSpacing: 0.2, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Danger', category: 'Solid',
    s: { label: 'Delete', bg1: '#ef4444', bg2: '#ef4444', gradDir: '135deg', bgType: 'solid', solidBg: '#ef4444', textColor: '#ffffff', fontSize: 14, fontWeight: '600', paddingX: 24, paddingY: 11, borderRadius: 7, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: '0 4px 12px rgba(239,68,68,0.35)', hoverShadow: '0 6px 18px rgba(239,68,68,0.5)', hoverScale: 1.03, hoverBg1: '#f87171', hoverBg2: '#f87171', transition: 0.2, cursor: 'pointer', letterSpacing: 0.2, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  /* ── Gradient extras ── */
  {
    name: 'Ocean', category: 'Gradient',
    s: { label: 'Dive In', bg1: '#0072ff', bg2: '#00c6ff', gradDir: '135deg', bgType: 'gradient', textColor: '#ffffff', fontSize: 15, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: 'transparent', borderStyle: 'solid', shadow: '0 4px 18px rgba(0,114,255,0.4)', hoverShadow: '0 6px 24px rgba(0,114,255,0.6)', hoverScale: 1.04, hoverBg1: '#1a87ff', hoverBg2: '#20d4ff', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Purple Rain', category: 'Gradient',
    s: { label: 'Let\'s Go', bg1: '#7c3aed', bg2: '#db2777', gradDir: '135deg', bgType: 'gradient', textColor: '#ffffff', fontSize: 15, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: 'transparent', borderStyle: 'solid', shadow: '0 4px 18px rgba(124,58,237,0.4)', hoverShadow: '0 6px 24px rgba(124,58,237,0.6)', hoverScale: 1.04, hoverBg1: '#8b5cf6', hoverBg2: '#ec4899', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Fire', category: 'Gradient',
    s: { label: 'Ignite', bg1: '#ff4500', bg2: '#ffd700', gradDir: '135deg', bgType: 'gradient', textColor: '#1a1a1a', fontSize: 15, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 8, borderWidth: 0, borderColor: 'transparent', borderStyle: 'solid', shadow: '0 4px 18px rgba(255,69,0,0.45)', hoverShadow: '0 6px 28px rgba(255,69,0,0.65)', hoverScale: 1.04, hoverBg1: '#ff6a2a', hoverBg2: '#ffe033', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  /* ── Neon extra ── */
  {
    name: 'Neon Green', category: 'Neon',
    s: { label: 'EXECUTE', bg1: 'transparent', bg2: 'transparent', gradDir: '135deg', bgType: 'solid', solidBg: '#000000', textColor: '#39ff14', fontSize: 14, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 4, borderWidth: 2, borderColor: '#39ff14', borderStyle: 'solid', shadow: '0 0 10px #39ff14, inset 0 0 10px rgba(57,255,20,0.1)', hoverShadow: '0 0 20px #39ff14, 0 0 40px #39ff14, inset 0 0 20px rgba(57,255,20,0.2)', hoverScale: 1, hoverBg1: 'rgba(57,255,20,0.08)', hoverBg2: 'rgba(57,255,20,0.08)', transition: 0.3, cursor: 'pointer', letterSpacing: 3, textTransform: 'uppercase', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  /* ── Metallic ── */
  {
    name: 'Silver', category: 'Metallic',
    s: { label: 'Premium', bg1: '#e8e8e8', bg2: '#a0a0a0', gradDir: '145deg', bgType: 'gradient', textColor: '#2a2a2a', fontSize: 14, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 6, borderWidth: 1, borderColor: '#c0c0c0', borderStyle: 'solid', shadow: '0 2px 0 #888, 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)', hoverShadow: '0 1px 0 #888, 0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.8)', hoverScale: 1, hoverBg1: '#f0f0f0', hoverBg2: '#b0b0b0', transition: 0.12, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', hoverTranslateY: 1, outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Gold', category: 'Metallic',
    s: { label: 'VIP Access', bg1: '#f5d060', bg2: '#b8860b', gradDir: '145deg', bgType: 'gradient', textColor: '#3d2b00', fontSize: 14, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 6, borderWidth: 1, borderColor: '#c9a227', borderStyle: 'solid', shadow: '0 2px 0 #7a5c00, 0 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,200,0.7)', hoverShadow: '0 1px 0 #7a5c00, 0 2px 5px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,200,0.7)', hoverScale: 1, hoverBg1: '#fce07a', hoverBg2: '#d4a017', transition: 0.12, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', hoverTranslateY: 1, outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  /* ── Brutalist ── */
  {
    name: 'Neobrutalist', category: 'Brutalist',
    s: { label: 'DO IT', bg1: '#facc15', bg2: '#facc15', gradDir: '135deg', bgType: 'solid', solidBg: '#facc15', textColor: '#000000', fontSize: 15, fontWeight: '800', paddingX: 28, paddingY: 12, borderRadius: 0, borderWidth: 3, borderColor: '#000000', borderStyle: 'solid', shadow: '4px 4px 0 #000', hoverShadow: '6px 6px 0 #000', hoverScale: 1, hoverBg1: '#fde047', hoverBg2: '#fde047', transition: 0.08, cursor: 'pointer', letterSpacing: 1.5, textTransform: 'uppercase', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Brutalist Dark', category: 'Brutalist',
    s: { label: 'SUBMIT', bg1: '#ffffff', bg2: '#ffffff', gradDir: '135deg', bgType: 'solid', solidBg: '#ffffff', textColor: '#000000', fontSize: 14, fontWeight: '800', paddingX: 28, paddingY: 12, borderRadius: 0, borderWidth: 3, borderColor: '#000000', borderStyle: 'solid', shadow: '5px 5px 0 #000', hoverShadow: '2px 2px 0 #000', hoverScale: 1, hoverBg1: '#f0f0f0', hoverBg2: '#f0f0f0', transition: 0.08, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', hoverTranslateY: 3, outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  /* ── Pastel ── */
  {
    name: 'Cotton Candy', category: 'Pastel',
    s: { label: 'Sweet!', bg1: '#f9a8d4', bg2: '#c4b5fd', gradDir: '135deg', bgType: 'gradient', textColor: '#5b21b6', fontSize: 14, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 50, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: '0 4px 14px rgba(196,181,253,0.5)', hoverShadow: '0 6px 20px rgba(196,181,253,0.7)', hoverScale: 1.05, hoverBg1: '#fbb6ce', hoverBg2: '#d8b4fe', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Mint', category: 'Pastel',
    s: { label: 'Fresh Start', bg1: '#6ee7b7', bg2: '#a7f3d0', gradDir: '135deg', bgType: 'gradient', textColor: '#064e3b', fontSize: 14, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 10, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: '0 4px 14px rgba(110,231,183,0.45)', hoverShadow: '0 6px 20px rgba(110,231,183,0.65)', hoverScale: 1.04, hoverBg1: '#86efbd', hoverBg2: '#bbf7d0', transition: 0.25, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  /* ── Skeuomorphic ── */
  {
    name: 'Classic', category: 'Skeuomorphic',
    s: { label: 'Click Here', bg1: '#6b9fff', bg2: '#3a6bcc', gradDir: '180deg', bgType: 'gradient', textColor: '#ffffff', fontSize: 14, fontWeight: '700', paddingX: 28, paddingY: 12, borderRadius: 6, borderWidth: 1, borderColor: '#2a5aaa', borderStyle: 'solid', shadow: '0 2px 0 #1e3f7a, 0 4px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)', hoverShadow: '0 1px 0 #1e3f7a, 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.35)', hoverScale: 1, hoverBg1: '#80adff', hoverBg2: '#4d7de0', transition: 0.12, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', hoverTranslateY: 1, outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  {
    name: 'Embossed', category: 'Skeuomorphic',
    s: { label: 'Press', bg1: '#d1d5db', bg2: '#9ca3af', gradDir: '180deg', bgType: 'gradient', textColor: '#1f2937', fontSize: 14, fontWeight: '600', paddingX: 28, paddingY: 12, borderRadius: 6, borderWidth: 1, borderColor: '#9ca3af', borderStyle: 'solid', shadow: '0 2px 0 #6b7280, inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 6px rgba(0,0,0,0.15)', hoverShadow: '0 1px 0 #6b7280, inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 3px rgba(0,0,0,0.12)', hoverScale: 1, hoverBg1: '#e5e7eb', hoverBg2: '#adb5bd', transition: 0.12, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', hoverTranslateY: 1, outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
  /* ── Minimal extra ── */
  {
    name: 'Underline', category: 'Minimal',
    s: { label: 'Read More →', bg1: 'transparent', bg2: 'transparent', gradDir: '135deg', bgType: 'solid', solidBg: 'transparent', textColor: '#a855f7', fontSize: 14, fontWeight: '500', paddingX: 4, paddingY: 6, borderRadius: 0, borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', shadow: '0 2px 0 #a855f7', hoverShadow: '0 2px 0 #7c3aed', hoverScale: 1, hoverBg1: 'transparent', hoverBg2: 'transparent', transition: 0.2, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'none', outline: 'none', display: 'inline-block', position: 'relative', overflow: 'hidden' },
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(PRESETS.map(p => p.category)))];

/* ─── Quick icons ─────────────────────────────────────────────────────────── */

const QUICK_ICONS = [
  '→', '←', '↑', '↓', '↗', '↙',
  '✓', '✕', '+', '−',
  '▶', '⏸', '⏹', '⏭',
  '★', '♥', '⚡', '🔥',
  '🔍', '🔗', '📧', '📋',
  '🔒', '🔓', '⚙️', '🎯',
  '⬇', '⬆', '💾', '🚀',
];

/* ─── CSS generator ───────────────────────────────────────────────────────── */

function getBg(s, hover = false) {
  if (s.bgType === 'gradient') {
    const bg1 = hover ? s.hoverBg1 : s.bg1;
    const bg2 = hover ? s.hoverBg2 : s.bg2;
    return `linear-gradient(${s.gradDir}, ${bg1}, ${bg2})`;
  }
  if (hover) {
    const hbg = s.hoverBg1;
    return hbg;
  }
  return s.solidBg ?? s.bg1;
}

function buildBaseCSS(s, selector = '.my-button', fontFamily = '', iconPos = 'none', iconGap = 8) {
  const bg = getBg(s);
  const isGoogleFont = fontFamily && !SYSTEM_FONTS.includes(fontFamily);
  const importLine = isGoogleFont
    ? `@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@300;400;500;600;700;800&display=swap');\n\n`
    : '';
  const hasIcon = iconPos !== 'none';
  const lines = [
    `${selector} {`,
    hasIcon ? `  display: inline-flex;` : `  display: inline-block;`,
    hasIcon ? `  align-items: center;` : null,
    hasIcon ? `  gap: ${iconGap}px;` : null,
    `  padding: ${s.paddingY}px ${s.paddingX}px;`,
    `  background: ${bg};`,
    `  color: ${s.textColor};`,
    `  font-size: ${s.fontSize}px;`,
    `  font-weight: ${s.fontWeight};`,
    fontFamily && fontFamily !== 'inherit' ? `  font-family: '${fontFamily}', sans-serif;` : null,
    `  border: ${s.borderWidth}px ${s.borderStyle} ${s.borderColor};`,
    `  border-radius: ${s.borderRadius}px;`,
    `  cursor: pointer;`,
    `  outline: none;`,
    s.letterSpacing ? `  letter-spacing: ${s.letterSpacing}px;` : null,
    s.textTransform && s.textTransform !== 'none' ? `  text-transform: ${s.textTransform};` : null,
    s.shadow && s.shadow !== 'none' ? `  box-shadow: ${s.shadow};` : null,
    s.backdropFilter ? `  backdrop-filter: ${s.backdropFilter};` : null,
    s.backdropFilter ? `  -webkit-backdrop-filter: ${s.backdropFilter};` : null,
    `  transition: all ${s.transition}s ease;`,
    `  text-decoration: none;`,
    `  position: relative;`,
    `  overflow: hidden;`,
    `}`,
  ].filter(Boolean);

  const hoverBg = getBg(s, true);
  const hoverLines = [
    `\n${selector}:hover {`,
    `  background: ${hoverBg};`,
    s.hoverShadow && s.hoverShadow !== 'none' ? `  box-shadow: ${s.hoverShadow};` : `  box-shadow: none;`,
    s.hoverScale && s.hoverScale !== 1 ? `  transform: scale(${s.hoverScale});` : null,
    s.hoverTranslateY ? `  transform: translateY(${s.hoverTranslateY}px);` : null,
    `}`,
    ...(s.activeEnabled !== false ? [
      `\n${selector}:active {`,
      `  transform: scale(${s.activeScale ?? 0.97})${s.hoverTranslateY ? ` translateY(${s.hoverTranslateY * 2}px)` : ''};`,
      s.activeShadow ? `  box-shadow: ${s.activeShadow};` : null,
      `}`,
    ] : []),
  ].filter(Boolean);

  return importLine + [...lines, ...hoverLines].join('\n');
}

function buildTailwind(s) {
  const classes = [
    'inline-block',
    `py-[${s.paddingY}px]`,
    `px-[${s.paddingX}px]`,
    `text-[${s.fontSize}px]`,
    `font-${s.fontWeight === '700' || s.fontWeight === '800' ? 'bold' : s.fontWeight === '600' ? 'semibold' : 'medium'}`,
    `rounded-[${s.borderRadius}px]`,
    s.borderWidth > 0 ? `border-[${s.borderWidth}px]` : 'border-0',
    `cursor-pointer`,
    `outline-none`,
    `transition-all`,
    `duration-[${Math.round(s.transition * 1000)}ms]`,
    s.textTransform === 'uppercase' ? 'uppercase' : null,
    s.textTransform === 'capitalize' ? 'capitalize' : null,
    s.letterSpacing > 1 ? 'tracking-widest' : s.letterSpacing > 0.3 ? 'tracking-wide' : null,
    `overflow-hidden`,
    `relative`,
    `hover:scale-[${s.hoverScale}]`,
  ].filter(Boolean);
  return `<button className="${classes.join(' ')}">\n  ${s.label}\n</button>`;
}

function buildReact(s, fontFamily = '', iconPos = 'none', iconText = '', iconGap = 8) {
  const bg = getBg(s);
  const hoverBg = getBg(s, true);
  const activeScale = s.activeScale ?? 0.97;
  const activeShadow = s.activeShadow ?? s.shadow;
  const hasIcon = iconPos !== 'none' && iconText;
  const isGoogleFont = fontFamily && !SYSTEM_FONTS.includes(fontFamily);
  const importLine = isGoogleFont
    ? `// Add to your <head>:\n// <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">\n\n`
    : '';
  const fontLine = fontFamily && fontFamily !== 'inherit' ? `\n    fontFamily: "'${fontFamily}', sans-serif",` : '';
  const iconBefore = hasIcon && iconPos === 'before' ? `\n      <span style={{ lineHeight: 1 }}>${iconText}</span>` : '';
  const iconAfter  = hasIcon && iconPos === 'after'  ? `\n      <span style={{ lineHeight: 1 }}>${iconText}</span>` : '';
  return `${importLine}import { useState } from 'react';

function MyButton({ children = '${s.label}', onClick }) {
  const [hovered, setHovered] = useState(false);
  ${s.activeEnabled !== false ? "const [active, setActive] = useState(false);" : ""}

  const style = {
    display: '${hasIcon ? 'inline-flex' : 'inline-block'}',
    ${hasIcon ? `alignItems: 'center',\n    gap: ${iconGap},` : ''}
    padding: '${s.paddingY}px ${s.paddingX}px',
    background: ${s.activeEnabled !== false ? `active ? '${hoverBg}' : ` : ''}hovered ? '${hoverBg}' : '${bg}',
    color: '${s.textColor}',
    fontSize: ${s.fontSize},
    fontWeight: '${s.fontWeight}',${fontLine}
    border: '${s.borderWidth}px ${s.borderStyle} ${s.borderColor}',
    borderRadius: ${s.borderRadius},
    cursor: 'pointer',
    outline: 'none',
    letterSpacing: '${s.letterSpacing}px',
    textTransform: '${s.textTransform}',
    boxShadow: ${s.activeEnabled !== false ? `active ? '${activeShadow}' : ` : ''}hovered ? '${s.hoverShadow}' : '${s.shadow}',
    transform: ${s.activeEnabled !== false ? `active ? 'scale(${activeScale})' : ` : ''}hovered ? 'scale(${s.hoverScale})' : 'scale(1)',
    transition: 'all ${s.transition}s ease',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    ${s.backdropFilter ? `backdropFilter: '${s.backdropFilter}',` : ''}
  };

  return (
    <button
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); ${s.activeEnabled !== false ? 'setActive(false);' : ''} }}
      ${s.activeEnabled !== false ? 'onMouseDown={() => setActive(true)}' : ''}
      ${s.activeEnabled !== false ? 'onMouseUp={() => setActive(false)}' : ''}
      onClick={onClick}
    >${iconBefore}
      <span>{children}</span>${iconAfter}
    </button>
  );
}`;
}

function buildHTML(s, fontFamily = '', iconPos = 'none', iconText = '', iconGap = 8) {
  const isGoogleFont = fontFamily && !SYSTEM_FONTS.includes(fontFamily);
  const fontLink = isGoogleFont
    ? `  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">\n`
    : '';
  const css = buildBaseCSS(s, '.my-button', fontFamily, iconPos, iconGap);
  const cssLines = css.split('\n').filter(l => !l.startsWith('@import')).map(l => '  ' + l).join('\n');
  const hasIcon = iconPos !== 'none' && iconText;
  const inner = hasIcon
    ? (iconPos === 'before'
        ? `<span class="btn-icon">${iconText}</span><span>${s.label}</span>`
        : `<span>${s.label}</span><span class="btn-icon">${iconText}</span>`)
    : s.label;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
${fontLink}  <style>
${cssLines}
  </style>
</head>
<body>
  <button class="my-button">${inner}</button>
</body>
</html>`;
}

function buildSCSS(s, fontFamily = '', iconPos = 'none', iconGap = 8) {
  const bg = getBg(s);
  const hoverBg = getBg(s, true);
  const isGoogleFont = fontFamily && !SYSTEM_FONTS.includes(fontFamily);
  const importLine = isGoogleFont
    ? `@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@300;400;500;600;700;800&display=swap');\n\n`
    : '';
  const fontLine = fontFamily && fontFamily !== 'inherit' ? `\n  font-family: '${fontFamily}', sans-serif;` : '';
  const hasIcon = iconPos !== 'none';
  return `${importLine}.my-button {
  display: ${hasIcon ? 'inline-flex' : 'inline-block'};
  ${hasIcon ? `align-items: center;\n  gap: ${iconGap}px;` : ''}
  padding: ${s.paddingY}px ${s.paddingX}px;
  background: ${bg};
  color: ${s.textColor};
  font-size: ${s.fontSize}px;
  font-weight: ${s.fontWeight};${fontLine}
  border: ${s.borderWidth}px ${s.borderStyle} ${s.borderColor};
  border-radius: ${s.borderRadius}px;
  cursor: pointer;
  outline: none;
  letter-spacing: ${s.letterSpacing}px;
  text-transform: ${s.textTransform};
  box-shadow: ${s.shadow};
  transition: all ${s.transition}s ease;
  position: relative;
  overflow: hidden;
  ${s.backdropFilter ? `-webkit-backdrop-filter: ${s.backdropFilter};
  backdrop-filter: ${s.backdropFilter};` : ''}

  &:hover {
    background: ${hoverBg};
    box-shadow: ${s.hoverShadow};
    transform: scale(${s.hoverScale})${s.hoverTranslateY ? ` translateY(${s.hoverTranslateY}px)` : ''};
  }

  ${s.activeEnabled !== false ? `&:active {
    transform: scale(${s.activeScale ?? 0.97})${s.hoverTranslateY ? ` translateY(${s.hoverTranslateY * 2}px)` : ''};
    ${s.activeShadow ? `box-shadow: ${s.activeShadow};` : ''}
  }` : ''}
}`;
}

/* ─── Export tabs ─────────────────────────────────────────────────────────── */

const EXPORT_TABS = ['CSS', 'SCSS', 'HTML', 'React JSX', 'Tailwind'];

/* ─── Inline preview style ────────────────────────────────────────────────── */

function previewStyle(s, hovered, active, fontFamily) {
  const isActive = active && s.activeEnabled !== false;
  const bg = isActive ? getBg(s, true) : getBg(s, hovered);
  const shadow = isActive ? (s.activeShadow ?? s.shadow) : hovered ? s.hoverShadow : s.shadow;
  let transform = 'scale(1)';
  if (isActive) {
    transform = `scale(${s.activeScale ?? 0.97})${s.hoverTranslateY ? ` translateY(${s.hoverTranslateY * 2}px)` : ''}`;
  } else if (hovered) {
    transform = `scale(${s.hoverScale})${s.hoverTranslateY ? ` translateY(${s.hoverTranslateY}px)` : ''}`;
  }
  return {
    display: 'inline-block',
    padding: `${s.paddingY}px ${s.paddingX}px`,
    background: bg,
    color: s.textColor,
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    fontFamily: fontFamily && fontFamily !== 'inherit' ? `'${fontFamily}', sans-serif` : 'inherit',
    border: `${s.borderWidth}px ${s.borderStyle} ${s.borderColor}`,
    borderRadius: s.borderRadius,
    cursor: 'pointer',
    outline: 'none',
    letterSpacing: `${s.letterSpacing}px`,
    textTransform: s.textTransform,
    boxShadow: shadow,
    transform,
    transition: `all ${s.transition}s ease`,
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: s.backdropFilter || undefined,
    WebkitBackdropFilter: s.backdropFilter || undefined,
    userSelect: 'none',
  };
}

/* ─── Slider row ──────────────────────────────────────────────────────────── */

function SliderRow({ label, value, min, max, step = 1, onChange, unit = '' }) {
  return (
    <div className={styles.sliderRow}>
      <div className={styles.sliderLabel}>
        <span>{label}</span>
        <span className={styles.sliderVal}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} className={styles.range} />
    </div>
  );
}

/* ─── ColorRow ────────────────────────────────────────────────────────────── */

function ColorRow({ label, value, onChange }) {
  return (
    <div className={styles.colorRow}>
      <span className={styles.colorLabel}>{label}</span>
      <div className={styles.colorRight}>
        <input type="color" className={styles.colorInput} value={value.startsWith('rgba') || value === 'transparent' ? '#ffffff' : value} onChange={e => onChange(e.target.value)} />
        <input type="text" className={styles.colorText} value={value} onChange={e => onChange(e.target.value)} spellCheck={false} />
      </div>
    </div>
  );
}

/* ─── useCopy ─────────────────────────────────────────────────────────────── */

function useCopy() {
  const [copied, setCopied] = useState('');
  const copy = useCallback((text, id) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(c => c === id ? '' : c), 1800);
    });
  }, []);
  return { copied, copy };
}

/* ─── Main component ──────────────────────────────────────────────────────── */

const PREVIEW_BGS = [
  { label: 'Black', value: '#000000' },
  { label: 'White', value: '#ffffff' },
  { label: 'Custom', value: 'custom' },
];

export default function CssButtonGeneratorTool() {
  const [activePreset, setActivePreset] = useState(0);
  const [s, setS] = useState({ ...PRESETS[0].s });
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [exportTab, setExportTab] = useState('CSS');
  const [catFilter, setCatFilter] = useState('All');
  const [previewBg, setPreviewBg] = useState(PREVIEW_BGS[0].value);
  const [customBg, setCustomBg] = useState('#1e293b');
  const [fontFamily, setFontFamily] = useState('inherit');
  const [iconText, setIconText] = useState('');
  const [iconPos, setIconPos] = useState('none');
  const [iconGap, setIconGap] = useState(8);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emojiPickerPos, setEmojiPickerPos] = useState({ top: 0, left: 0 });
  const emojiBtnRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (
        emojiPickerRef.current && !emojiPickerRef.current.contains(e.target) &&
        emojiBtnRef.current && !emojiBtnRef.current.contains(e.target)
      ) setEmojiPickerOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function openEmojiPicker() {
    if (emojiBtnRef.current) {
      const r = emojiBtnRef.current.getBoundingClientRect();
      setEmojiPickerPos({ top: r.bottom + 4, left: r.left });
    }
    setEmojiPickerOpen(v => !v);
  }
  const [previewHeight, setPreviewHeight] = useState(220);
  const dragRef = useRef(null);
  const { copied, copy } = useCopy();

  function startResize(e) {
    e.preventDefault();
    const startY = e.clientY;
    const startH = previewHeight;
    function onMove(ev) {
      const delta = ev.clientY - startY;
      setPreviewHeight(Math.max(120, Math.min(600, startH + delta)));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  useEffect(() => { loadGoogleFont(fontFamily); }, [fontFamily]);

  function applyPreset(idx) {
    setActivePreset(idx);
    setS({ ...PRESETS[idx].s });
  }

  function set(key, val) {
    setS(prev => ({ ...prev, [key]: val }));
  }

  const filteredPresets = catFilter === 'All' ? PRESETS : PRESETS.filter(p => p.category === catFilter);

  const exportCode = useMemo(() => {
    if (exportTab === 'CSS') return buildBaseCSS(s, '.my-button', fontFamily, iconPos, iconGap);
    if (exportTab === 'SCSS') return buildSCSS(s, fontFamily, iconPos, iconGap);
    if (exportTab === 'HTML') return buildHTML(s, fontFamily, iconPos, iconText, iconGap);
    if (exportTab === 'React JSX') return buildReact(s, fontFamily, iconPos, iconText, iconGap);
    if (exportTab === 'Tailwind') return buildTailwind(s, fontFamily);
    return '';
  }, [s, exportTab, fontFamily, iconPos, iconText, iconGap]);

  // Fork to My Code: the button in its own HTML + CSS, centred on a page
  const forkSnippet = () => {
    const hasIcon = iconPos !== 'none' && iconText;
    const inner = hasIcon
      ? (iconPos === 'before'
          ? `<span class="btn-icon">${iconText}</span><span>${s.label}</span>`
          : `<span>${s.label}</span><span class="btn-icon">${iconText}</span>`)
      : s.label;
    const base = buildBaseCSS(s, '.my-button', fontFamily, iconPos, iconGap);
    // @import (Google Font) has to stay first in the stylesheet
    const imports = base.split('\n').filter(l => l.startsWith('@import')).join('\n');
    const rules = base.split('\n').filter(l => !l.startsWith('@import')).join('\n').trim();
    return {
      name: `Button — ${s.label}`,
      html: `<button class="my-button">${inner}</button>`,
      css: [imports, CENTER_PAGE_CSS, rules].filter(Boolean).join('\n\n'),
    };
  };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-button-generator" />
      <div className={styles.body}>

        {/* ── Left: presets ── */}
        <div className={styles.presetsPanel}>
          <div className={styles.toolHead}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="4" width="14" height="8" rx="3" stroke="#a855f7" strokeWidth="1.5"/>
              <rect x="3.5" y="6.5" width="4" height="3" rx="1" fill="#a855f7" opacity="0.7"/>
              <line x1="9.5" y1="7" x2="12.5" y2="7" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="9.5" y1="9" x2="11.5" y2="9" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
              <span>CSS Button Generator</span>
            </div>
            <ForkToMyCodeButton getSnippet={forkSnippet} />
          </div>
          <div className={styles.panelTitle}>Button Presets</div>
          <div className={styles.catTabs}>
            {CATEGORIES.map(c => (
              <button key={c} className={`${styles.catTab} ${catFilter === c ? styles.catActive : ''}`}
                onClick={() => setCatFilter(c)}>{c}</button>
            ))}
          </div>
          <div className={styles.presetGrid}>
            {filteredPresets.map((p) => {
              const globalIdx = PRESETS.indexOf(p);
              return (
                <button
                  key={p.name}
                  className={`${styles.presetCard} ${activePreset === globalIdx ? styles.presetActive : ''}`}
                  onClick={() => applyPreset(globalIdx)}
                >
                  <div className={styles.presetPreview}>
                    <span style={{ ...previewStyle(p.s, false), fontSize: 11, padding: '5px 12px', pointerEvents: 'none' }}>
                      {p.s.label}
                    </span>
                  </div>
                  <div className={styles.presetMeta}>
                    <span className={styles.presetName}>{p.name}</span>
                    <span className={styles.presetCat}>{p.category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Middle: controls ── */}
        <div className={styles.controls}>
          <div className={styles.panelTitle}>Customize</div>

          {/* Label */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Label</div>
            <input className={styles.textInput} value={s.label} onChange={e => set('label', e.target.value)} />
          </div>

          {/* Icon */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Icon</div>
            <div className={styles.btnGroup}>
              {['none','before','after'].map(p => (
                <button key={p} className={`${styles.segBtn} ${iconPos === p ? styles.segActive : ''}`}
                  onClick={() => setIconPos(p)}>{p.charAt(0).toUpperCase() + p.slice(1)}</button>
              ))}
            </div>
            {iconPos !== 'none' && (
              <>
                <div className={styles.iconGrid}>
                  {QUICK_ICONS.map(ic => (
                    <button key={ic}
                      className={`${styles.iconChip} ${iconText === ic ? styles.iconChipActive : ''}`}
                      onClick={() => setIconText(ic)}>{ic}</button>
                  ))}
                </div>
                <div className={styles.iconInputRow}>
                  <input className={styles.textInput} value={iconText}
                    placeholder="Emoji or text…"
                    onChange={e => setIconText(e.target.value)}
                    style={{ flex: 1 }} />
                  <button ref={emojiBtnRef} className={`${styles.segBtn} ${emojiPickerOpen ? styles.segActive : ''}`}
                    onClick={openEmojiPicker} title="Open emoji picker">😀</button>
                  {iconText && (
                    <button className={styles.segBtn} onClick={() => setIconText('')} title="Clear">✕</button>
                  )}
                </div>
                <SliderRow label="Gap" value={iconGap} min={2} max={24} onChange={setIconGap} unit="px" />
              </>
            )}
          </div>

          {/* Emoji picker portal */}
          {emojiPickerOpen && (
            <div ref={emojiPickerRef} className={styles.emojiPickerWrap}
              style={{ top: emojiPickerPos.top, left: emojiPickerPos.left }}>
              <EmojiPicker
                onEmojiClick={(data) => { setIconText(data.emoji); setEmojiPickerOpen(false); }}
                theme="dark"
                height={340}
                width={300}
                previewConfig={{ showPreview: false }}
                searchPlaceholder="Search emoji…"
              />
            </div>
          )}

          {/* Background */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Background</div>
            <div className={styles.btnGroup}>
              <button className={`${styles.segBtn} ${s.bgType === 'solid' ? styles.segActive : ''}`} onClick={() => set('bgType', 'solid')}>Solid</button>
              <button className={`${styles.segBtn} ${s.bgType === 'gradient' ? styles.segActive : ''}`} onClick={() => set('bgType', 'gradient')}>Gradient</button>
            </div>
            {s.bgType === 'solid' ? (
              <ColorRow label="Color" value={s.solidBg ?? s.bg1} onChange={v => { set('solidBg', v); set('bg1', v); set('bg2', v); }} />
            ) : (
              <>
                <ColorRow label="Color 1" value={s.bg1} onChange={v => set('bg1', v)} />
                <ColorRow label="Color 2" value={s.bg2} onChange={v => set('bg2', v)} />
                <div className={styles.colorRow}>
                  <span className={styles.colorLabel}>Direction</span>
                  <select className={styles.select} value={s.gradDir} onChange={e => set('gradDir', e.target.value)}>
                    {['90deg','135deg','180deg','225deg','270deg','45deg','0deg'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Text appearance */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Text</div>
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Font</span>
              <FontPicker value={fontFamily} onChange={setFontFamily} />
            </div>
            <ColorRow label="Color" value={s.textColor} onChange={v => set('textColor', v)} />
            <SliderRow label="Font size" value={s.fontSize} min={11} max={24} onChange={v => set('fontSize', v)} unit="px" />
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Weight</span>
              <select className={styles.select} value={s.fontWeight} onChange={e => set('fontWeight', e.target.value)}>
                {['300','400','500','600','700','800'].map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Transform</span>
              <select className={styles.select} value={s.textTransform} onChange={e => set('textTransform', e.target.value)}>
                {['none','uppercase','capitalize','lowercase'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <SliderRow label="Letter spacing" value={s.letterSpacing} min={0} max={8} step={0.1} onChange={v => set('letterSpacing', v)} unit="px" />
          </div>

          {/* Size & shape */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Size & Shape</div>
            <SliderRow label="Padding X" value={s.paddingX} min={8} max={80} onChange={v => set('paddingX', v)} unit="px" />
            <SliderRow label="Padding Y" value={s.paddingY} min={4} max={40} onChange={v => set('paddingY', v)} unit="px" />
            <SliderRow label="Border radius" value={s.borderRadius} min={0} max={50} onChange={v => set('borderRadius', v)} unit="px" />
          </div>

          {/* Border */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Border</div>
            <SliderRow label="Width" value={s.borderWidth} min={0} max={6} onChange={v => set('borderWidth', v)} unit="px" />
            <ColorRow label="Color" value={s.borderColor} onChange={v => set('borderColor', v)} />
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Style</span>
              <select className={styles.select} value={s.borderStyle} onChange={e => set('borderStyle', e.target.value)}>
                {['solid','dashed','dotted','double','none'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Shadow */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Shadow</div>
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Normal</span>
              <input type="text" className={styles.shadowInput} value={s.shadow} onChange={e => set('shadow', e.target.value)} spellCheck={false} />
            </div>
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Hover</span>
              <input type="text" className={styles.shadowInput} value={s.hoverShadow} onChange={e => set('hoverShadow', e.target.value)} spellCheck={false} />
            </div>
          </div>

          {/* Hover */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Hover State</div>
            {s.bgType === 'solid' ? (
              <ColorRow label="Hover bg" value={s.hoverBg1} onChange={v => { set('hoverBg1', v); set('hoverBg2', v); }} />
            ) : (
              <>
                <ColorRow label="Hover 1" value={s.hoverBg1} onChange={v => set('hoverBg1', v)} />
                <ColorRow label="Hover 2" value={s.hoverBg2} onChange={v => set('hoverBg2', v)} />
              </>
            )}
            <SliderRow label="Scale" value={s.hoverScale} min={0.9} max={1.15} step={0.01} onChange={v => set('hoverScale', v)} />
            <SliderRow label="Transition" value={s.transition} min={0.05} max={0.8} step={0.05} onChange={v => set('transition', v)} unit="s" />
          </div>

          {/* Active state */}
          <div className={styles.section}>
            <div className={styles.sectionLabelRow}>
              <div className={styles.sectionLabel}>Active State</div>
              <label className={styles.toggleLabel}>
                <input type="checkbox" checked={s.activeEnabled !== false} onChange={e => set('activeEnabled', e.target.checked)} />
                <span>{s.activeEnabled !== false ? 'On' : 'Off'}</span>
              </label>
            </div>
            {s.activeEnabled !== false && (
              <>
                <SliderRow label="Scale" value={s.activeScale ?? 0.97} min={0.85} max={1.0} step={0.01} onChange={v => set('activeScale', v)} />
                <div className={styles.colorRow}>
                  <span className={styles.colorLabel}>Shadow</span>
                  <input type="text" className={styles.shadowInput}
                    value={s.activeShadow ?? ''}
                    placeholder="(same as normal)"
                    onChange={e => set('activeShadow', e.target.value || undefined)}
                    spellCheck={false} />
                </div>
              </>
            )}
          </div>

          {/* Backdrop */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Backdrop Filter (glass)</div>
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Value</span>
              <input type="text" className={styles.shadowInput}
                value={s.backdropFilter || ''}
                placeholder="blur(12px)"
                onChange={e => set('backdropFilter', e.target.value || undefined)}
                spellCheck={false} />
            </div>
          </div>
        </div>

        {/* ── Right: preview + export ── */}
        <div className={styles.rightPanel}>
          {/* Ad space: top of the right panel, above the preview */}
          <PlaygroundTopAd />

          {/* Preview */}
          <div className={styles.previewBox}>
            <div className={styles.previewHeader}>
              <div className={styles.panelTitle}>Preview</div>
              <div className={styles.previewBgPicker} title="Preview background">
                {PREVIEW_BGS.map(bg => (
                  bg.value === 'custom'
                    ? <label key="custom" className={`${styles.bgChip} ${previewBg === 'custom' ? styles.bgChipActive : ''}`}
                        style={{ background: customBg, padding: 0, position: 'relative', overflow: 'hidden' }} title="Custom color">
                        <input type="color" className={styles.bgColorInput} value={customBg}
                          onChange={e => { setCustomBg(e.target.value); setPreviewBg('custom'); }}
                          style={{ opacity: 0, width: '100%', height: '100%', position: 'absolute' }} />
                      </label>
                    : <button key={bg.label}
                        className={`${styles.bgChip} ${previewBg === bg.value ? styles.bgChipActive : ''}`}
                        style={{ background: bg.value }}
                        title={bg.label}
                        onClick={() => setPreviewBg(bg.value)}
                      />
                ))}
              </div>
            </div>
            <div
              className={styles.previewStage}
              style={{ background: previewBg === 'custom' ? customBg : previewBg, height: previewHeight }}
            >
              <button
                style={{
                  ...previewStyle(s, hovered, active, fontFamily),
                  ...(iconPos !== 'none' && iconText ? { display: 'inline-flex', alignItems: 'center', gap: iconGap } : {}),
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => { setHovered(false); setActive(false); }}
                onMouseDown={() => setActive(true)}
                onMouseUp={() => setActive(false)}
              >
                {iconPos === 'before' && iconText && <span style={{ lineHeight: 1 }}>{iconText}</span>}
                <span>{s.label}</span>
                {iconPos === 'after' && iconText && <span style={{ lineHeight: 1 }}>{iconText}</span>}
              </button>
            </div>
            <div className={styles.previewHint}>Hover · Click to preview all states</div>
          </div>

          {/* Resize handle */}
          <div className={styles.resizeHandle} onMouseDown={startResize} ref={dragRef}>
            <div className={styles.resizeBar} />
          </div>

          {/* Export */}
          <div className={styles.exportBox}>
            <div className={styles.exportHeader}>
              <div className={styles.panelTitle}>Export Code</div>
              <button
                className={`${styles.copyBtn} ${copied === 'code' ? styles.copyOk : ''}`}
                onClick={() => copy(exportCode, 'code')}
              >
                {copied === 'code' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className={styles.exportTabs}>
              {EXPORT_TABS.map(t => (
                <button key={t} className={`${styles.exportTab} ${exportTab === t ? styles.exportActive : ''}`}
                  onClick={() => setExportTab(t)}>{t}</button>
              ))}
            </div>
            <pre className={styles.code}><code>{exportCode}</code></pre>
          </div>

        </div>
      </div>
    </div>
  );
}
