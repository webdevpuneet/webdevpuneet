'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import s from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Constants ── */
const LAYOUTS = [
  { id: 'default',  label: 'Default',  hint: 'Logo left, links right' },
  { id: 'centered', label: 'Centered', hint: 'All items centered inline' },
  { id: 'split',    label: 'Split',    hint: 'Links left, logo center, links right' },
  { id: 'minimal',  label: 'Minimal',  hint: 'Links only, no logo' },
];
const CODE_TABS = ['HTML', 'React', 'Tailwind', 'Vue'];
const CONFIG_TABS = ['Logo', 'Links', 'Style'];
const FONT_WEIGHTS = [['400','Regular'], ['500','Medium'], ['600','Semibold'], ['700','Bold']];

let _id = 4;
const uid = () => ++_id;

const DEFAULT_LINKS = [
  { id: 1, label: 'Home',        href: '/',       active: true,  cta: false, children: [] },
  { id: 2, label: 'About',       href: '/about',  active: false, cta: false, children: [] },
  { id: 3, label: 'Blog',        href: '/blog',   active: false, cta: false, children: [] },
  { id: 4, label: 'Get Started', href: '/signup', active: false, cta: true,  children: [] },
];

const DEFAULT_STYLE = {
  bg: '#ffffff', text: '#111827', accent: '#3b82f6',
  padding: 14, fontSize: 14, fontWeight: '500',
  shadow: true, border: false, rounded: 6, gap: 28,
};

/* ── Helpers ── */
function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
const ctaPadV = st => Math.round(st.padding * 0.45);

// Below this width every layout collapses to a hamburger + dropdown (Tailwind's `md`).
const MOBILE_BP = 768;

const showLogo = (layout, logo) => logo.show && layout !== 'minimal';
const logoText = logo => `${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}`;
const containerMod = layout =>
  layout === 'centered' ? ' nav-centered' : layout === 'minimal' ? ' nav-minimal' : layout === 'split' ? ' nav-split' : '';
const splitAt = links => Math.ceil(links.length / 2);
const linksJSON = links =>
  JSON.stringify(links.map(l => ({ label: l.label, href: l.href, active: l.active, cta: l.cta })), null, 2);

/* ── Code Generators ── */

// Shared stylesheet for the HTML, React and Vue outputs. Desktop: links inline in the bar.
// Mobile: the links move into a dropdown under the bar, opened by a hamburger that morphs
// into an × (the `is-open` class on .navbar drives both).
function genCSS({ layout, logo, navStyle: st }, { reset = true } = {}) {
  const shadow = st.shadow ? `\n  box-shadow: 0 1px 8px ${hexToRgba(st.text, 0.08)};` : '';
  const border = st.border ? `\n  border-bottom: 1px solid ${hexToRgba(st.text, 0.1)};` : '';
  const logoCSS = showLogo(layout, logo) ? `
.nav-logo {
  font-size: ${st.fontSize + 4}px;
  font-weight: 700;
  color: ${st.text};
  text-decoration: none;
  flex-shrink: 0;
}
` : '';
  // Split: the menu wrapper drops out of the box tree so its two lists become grid cells
  // either side of the logo.
  const splitCSS = layout === 'split' ? `
.nav-split {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: "left logo right";
  gap: 24px;
}
.nav-split .nav-logo { grid-area: logo; }
.nav-split .nav-menu { display: contents; }
.nav-split .nav-links:first-child { grid-area: left;  justify-content: flex-end; }
.nav-split .nav-links:last-child  { grid-area: right; justify-content: flex-start; }
` : '';
  const splitMobileCSS = layout === 'split' ? `
  .nav-split { display: flex; }
  .nav-split .nav-menu { display: none; }` : '';
  const centerMobileCSS = layout === 'centered' || layout === 'minimal' ? `
  .nav-centered, .nav-minimal { justify-content: space-between; }` : '';

  return `${reset ? '* { box-sizing: border-box; }\n\n' : ''}.navbar {
  position: relative;
  background: ${st.bg};${shadow}${border}
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: ${st.padding}px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-centered { justify-content: center; gap: 40px; }
.nav-minimal  { justify-content: center; }
${splitCSS}${logoCSS}
.nav-menu {
  display: flex;
  align-items: center;
  gap: ${st.gap}px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: ${st.gap}px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-size: ${st.fontSize}px;
  font-weight: ${st.fontWeight};
  color: ${st.text};
  text-decoration: none;
  transition: color 0.15s;
}
.nav-link:hover,
.nav-link.active { color: ${st.accent}; }

.nav-link.cta {
  background: ${st.accent};
  color: #fff;
  padding: ${ctaPadV(st)}px ${st.padding}px;
  border-radius: ${st.rounded}px;
  transition: opacity 0.15s;
}
.nav-link.cta:hover { opacity: 0.88; }

/* Hamburger: hidden on desktop, morphs into an × while the menu is open */
.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  margin-left: auto;
  padding: 8px;
  background: none;
  border: 0;
  cursor: pointer;
}
.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  border-radius: 2px;
  background: ${st.text};
  transition: transform 0.25s ease, opacity 0.2s ease;
}
.navbar.is-open .nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar.is-open .nav-toggle span:nth-child(2) { opacity: 0; }
.navbar.is-open .nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile: the links collapse into a dropdown under the bar */
@media (max-width: ${MOBILE_BP}px) {
  .nav-container { gap: 16px; }${centerMobileCSS}${splitMobileCSS}
  .nav-toggle { display: flex; }
  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 50;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 24px 16px;
    background: ${st.bg};
    box-shadow: 0 8px 16px ${hexToRgba(st.text, 0.1)};
  }
  .navbar.is-open .nav-menu { display: flex; }
  .nav-links { flex-direction: column; align-items: stretch; gap: 0; }
  .nav-link { display: block; padding: 12px 0; }
  .nav-link.cta { margin-top: 8px; padding: 12px ${st.padding}px; text-align: center; }
}`;
}

function genHTML(data) {
  const { layout, logo, links } = data;
  const renderLink = l =>
    `        <li><a href="${l.href}" class="nav-link${l.active ? ' active' : ''}${l.cta ? ' cta' : ''}">${l.label}</a></li>`;
  const list = items => `      <ul class="nav-links">\n${items.map(renderLink).join('\n')}\n      </ul>`;
  const lists = layout === 'split'
    ? `${list(links.slice(0, splitAt(links)))}\n${list(links.slice(splitAt(links)))}`
    : list(links);
  const logoLine = showLogo(layout, logo)
    ? `    <a href="#" class="nav-logo">${logoText(logo)}</a>\n` : '';

  return `<nav class="navbar">
  <div class="nav-container${containerMod(layout)}">
${logoLine}    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="nav-menu" id="nav-menu">
${lists}
    </div>
  </div>
</nav>

<style>
${genCSS(data)}
</style>

<script>
  // Mobile menu: toggle the dropdown, and close it again when a link is picked.
  const navbar = document.querySelector('.navbar');
  const toggle = navbar.querySelector('.nav-toggle');

  function setMenu(open) {
    navbar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', () => setMenu(!navbar.classList.contains('is-open')));
  navbar.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setMenu(false)));
</script>`;
}

function genReact(data) {
  const { layout, logo, links } = data;
  const lists = layout === 'split'
    ? `          <ul className="nav-links">{renderLinks(links.slice(0, ${splitAt(links)}))}</ul>
          <ul className="nav-links">{renderLinks(links.slice(${splitAt(links)}))}</ul>`
    : `          <ul className="nav-links">{renderLinks(links)}</ul>`;
  const logoLine = showLogo(layout, logo)
    ? `        <a href="#" className="nav-logo">${logoText(logo)}</a>\n` : '';

  return `// Navbar.jsx
import { useState } from 'react';
import './Navbar.css';

const links = ${linksJSON(links)};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const renderLinks = items => items.map(link => (
    <li key={link.label}>
      <a
        href={link.href}
        className={\`nav-link\${link.active ? ' active' : ''}\${link.cta ? ' cta' : ''}\`}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </a>
    </li>
  ));

  return (
    <nav className={\`navbar\${open ? ' is-open' : ''}\`}>
      <div className="nav-container${containerMod(layout)}">
${logoLine}        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
        <div className="nav-menu" id="nav-menu">
${lists}
        </div>
      </div>
    </nav>
  );
}

/* ── Navbar.css ─────────────────────────────────────────── */
${genCSS(data)}`;
}

function genTailwind({ layout, logo, links, navStyle: st }) {
  const split = layout === 'split';
  const centered = layout === 'centered' || layout === 'minimal';
  const navClasses = [
    `relative bg-[${st.bg}]`,
    st.shadow ? 'shadow-sm' : '',
    st.border ? 'border-b border-black/10' : '',
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'max-w-6xl mx-auto px-6 flex items-center justify-between gap-4',
    split ? 'md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6' : '',
    layout === 'centered' ? 'md:justify-center md:gap-10' : layout === 'minimal' ? 'md:justify-center' : '',
  ].filter(Boolean).join(' ');

  // Mobile: a full-width dropdown under the bar. md and up: back inline in the bar
  // (split: `md:contents` lets the two lists sit in the grid either side of the logo).
  const menuClasses = [
    'absolute top-full inset-x-0 z-50 flex-col px-6 pt-2 pb-4',
    `bg-[${st.bg}] shadow-lg`,
    'md:static md:p-0 md:shadow-none md:bg-transparent',
    split ? 'md:contents' : `md:flex md:flex-row md:items-center md:gap-[${st.gap}px]`,
  ].join(' ');

  const ulBase = `flex flex-col md:flex-row md:items-center md:gap-[${st.gap}px] list-none m-0 p-0`;
  const lists = split
    ? `          <ul className="${ulBase} md:col-start-1 md:row-start-1 md:justify-end">{renderLinks(links.slice(0, ${splitAt(links)}))}</ul>
          <ul className="${ulBase} md:col-start-3 md:row-start-1">{renderLinks(links.slice(${splitAt(links)}))}</ul>`
    : `          <ul className="${ulBase}">{renderLinks(links)}</ul>`;

  const logoLine = showLogo(layout, logo)
    ? `        <a href="#" className="text-[${st.fontSize + 4}px] font-bold text-[${st.text}] no-underline shrink-0${split ? ' md:col-start-2 md:row-start-1' : ''}">${logoText(logo)}</a>\n`
    : '';

  return `import { useState } from 'react';

const links = ${linksJSON(links)};

const linkBase = 'text-[${st.fontSize}px] font-[${st.fontWeight}] no-underline transition';
const linkClass = link => link.cta
  ? \`\${linkBase} block mt-2 md:mt-0 text-center bg-[${st.accent}] text-white px-[${st.padding}px] py-3 md:py-[${ctaPadV(st)}px] rounded-[${st.rounded}px] hover:opacity-90\`
  : \`\${linkBase} block py-3 md:py-0 \${link.active ? 'text-[${st.accent}]' : 'text-[${st.text}]'} hover:text-[${st.accent}]\`;

// Hamburger bars; the outer two rotate into an × and the middle one fades out.
const bar = 'block h-0.5 w-6 rounded bg-[${st.text}] transition duration-300';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const renderLinks = items => items.map(link => (
    <li key={link.label}>
      <a href={link.href} className={linkClass(link)} onClick={() => setOpen(false)}>
        {link.label}
      </a>
    </li>
  ));

  return (
    <nav className="${navClasses}">
      <div className="${containerClasses}" style={{ paddingTop: '${st.padding}px', paddingBottom: '${st.padding}px' }}>
${logoLine}        <button
          type="button"
          className="md:hidden ml-auto flex flex-col justify-center gap-[5px] w-10 h-10 p-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(o => !o)}
        >
          <span className={\`\${bar} \${open ? 'translate-y-[7px] rotate-45' : ''}\`} />
          <span className={\`\${bar} \${open ? 'opacity-0' : ''}\`} />
          <span className={\`\${bar} \${open ? '-translate-y-[7px] -rotate-45' : ''}\`} />
        </button>
        <div id="nav-menu" className={\`\${open ? 'flex' : 'hidden'} ${menuClasses}\`}>
${lists}
        </div>
      </div>
    </nav>
  );
}`;
}

function genVue(data) {
  const { layout, logo, links } = data;
  const split = layout === 'split';
  const list = source => `        <ul class="nav-links">
          <li v-for="link in ${source}" :key="link.label">
            <a :href="link.href" :class="['nav-link', { active: link.active, cta: link.cta }]" @click="open = false">{{ link.label }}</a>
          </li>
        </ul>`;
  const lists = split ? `${list('leftLinks')}\n${list('rightLinks')}` : list('links');
  const logoLine = showLogo(layout, logo)
    ? `      <a href="#" class="nav-logo">${logoText(logo)}</a>\n` : '';
  const scriptSplit = split ? `
const leftLinks = links.slice(0, ${splitAt(links)});
const rightLinks = links.slice(${splitAt(links)});
` : '';

  return `<template>
  <nav :class="['navbar', { 'is-open': open }]">
    <div class="nav-container${containerMod(layout)}">
${logoLine}      <button
        class="nav-toggle"
        type="button"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        :aria-expanded="open"
        aria-controls="nav-menu"
        @click="open = !open"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="nav-menu" id="nav-menu">
${lists}
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const open = ref(false);

const links = ${linksJSON(links)};
${scriptSplit}</script>

<style scoped>
${genCSS(data, { reset: false })}
</style>`;
}

function generateCode(tab, data) {
  try {
    switch (tab) {
      case 'HTML':     return genHTML(data);
      case 'React':    return genReact(data);
      case 'Tailwind': return genTailwind(data);
      case 'Vue':      return genVue(data);
      default:         return '';
    }
  } catch (e) {
    return `// Error: ${e.message}`;
  }
}

/* ── Sub-components ── */

function NavbarPreview({ layout, logo, links, navStyle: st, mobile = false, open = false, onToggle }) {
  const navBg = { background: st.bg, boxShadow: st.shadow ? `0 1px 8px ${hexToRgba(st.text, 0.08)}` : 'none', borderBottom: st.border ? `1px solid ${hexToRgba(st.text, 0.1)}` : 'none' };
  const inner = { maxWidth: '100%', padding: `${st.padding}px 20px`, display: 'flex', alignItems: 'center' };
  const logoStyle = { fontSize: st.fontSize + 4 + 'px', fontWeight: 700, color: st.text, textDecoration: 'none', flexShrink: 0 };
  const linkBase = { fontSize: st.fontSize + 'px', fontWeight: st.fontWeight, textDecoration: 'none', flexShrink: 0 };
  const linksWrap = { display: 'flex', alignItems: 'center', gap: st.gap + 'px', listStyle: 'none', margin: 0, padding: 0 };

  const renderLink = l => (
    <li key={l.id}>
      <a href="#" style={l.cta
        ? { ...linkBase, background: st.accent, color: '#fff', padding: `${ctaPadV(st)}px ${st.padding}px`, borderRadius: st.rounded + 'px' }
        : { ...linkBase, color: l.active ? st.accent : st.text }
      } onClick={e => e.preventDefault()}>
        {l.label}
      </a>
    </li>
  );

  const logoEl = logo.show && layout !== 'minimal' && (
    <a href="#" style={logoStyle} onClick={e => e.preventDefault()}>
      {logo.icon && <span style={{ marginRight: 5 }}>{logo.icon}</span>}
      {logo.text || 'Logo'}
    </a>
  );

  // Mobile: logo + hamburger in the bar; the links drop down underneath. Mirrors the
  // generated CSS (same 5px bar gap, so a 7px shift lands the outer bars on the middle).
  if (mobile) {
    const barStyle = i => ({
      display: 'block', width: 24, height: 2, borderRadius: 2, background: st.text,
      transition: 'transform 0.25s ease, opacity 0.2s ease',
      transform: open && i === 0 ? 'translateY(7px) rotate(45deg)' : open && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
      opacity: open && i === 1 ? 0 : 1,
    });
    return (
      <div style={{ ...navBg, position: 'relative' }}>
        <div style={{ ...inner, padding: `${st.padding}px 16px`, justifyContent: 'space-between', gap: 16 }}>
          {logoEl}
          <button
            type="button"
            onClick={onToggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, width: 40, height: 40, padding: 8, background: 'none', border: 0, cursor: 'pointer' }}
          >
            {[0, 1, 2].map(i => <span key={i} style={barStyle(i)} />)}
          </button>
        </div>
        {open && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 5, padding: '8px 16px 16px', background: st.bg, boxShadow: `0 8px 16px ${hexToRgba(st.text, 0.1)}` }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
              {links.map(l => (
                <li key={l.id}>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); onToggle(); }}
                    style={l.cta
                      ? { ...linkBase, display: 'block', marginTop: 8, textAlign: 'center', background: st.accent, color: '#fff', padding: `12px ${st.padding}px`, borderRadius: st.rounded + 'px' }
                      : { ...linkBase, display: 'block', padding: '12px 0', color: l.active ? st.accent : st.text }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (layout === 'split') {
    const mid = Math.ceil(links.length / 2);
    return (
      <div style={navBg}>
        <div style={{ ...inner, display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24 }}>
          <ul style={{ ...linksWrap, justifyContent: 'flex-end' }}>{links.slice(0, mid).map(renderLink)}</ul>
          {logoEl || <span />}
          <ul style={{ ...linksWrap, justifyContent: 'flex-start' }}>{links.slice(mid).map(renderLink)}</ul>
        </div>
      </div>
    );
  }
  return (
    <div style={navBg}>
      <div style={{ ...inner, justifyContent: layout === 'centered' ? 'center' : layout === 'minimal' ? 'center' : 'space-between', gap: layout === 'centered' ? 40 : 0 }}>
        {logoEl}
        <ul style={linksWrap}>{links.map(renderLink)}</ul>
      </div>
    </div>
  );
}

// Logo-friendly emoji, grouped; the picker shows them as one scrollable grid per group.
const EMOJI_GROUPS = [
  ['Tech',     ['🚀', '💻', '⚡', '🔥', '✨', '💡', '🧠', '🤖', '⚙️', '🛠️', '🔒', '🌐', '📱', '🖥️', '🧩', '📦']],
  ['Business', ['💼', '📈', '📊', '💰', '🏆', '🎯', '🤝', '🏢', '🛒', '🧾', '📣', '💎']],
  ['Creative', ['🎨', '🖌️', '📷', '🎬', '🎵', '✏️', '📝', '📚', '🎮', '🪄', '🌈', '🎉']],
  ['Nature',   ['🌱', '🌿', '🍃', '🌸', '🌻', '🌊', '🌙', '☀️', '⭐', '🌍', '🍀', '🔆']],
  ['Shapes',   ['●', '◆', '▲', '■', '★', '♦', '✦', '⬢', '◉', '❖', '✚', '➜']],
];

function EmojiPicker({ value, onPick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on a click outside the picker or on Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = v => { onPick(v); setOpen(false); };

  return (
    <div className={s.emojiPicker} ref={ref}>
      <button
        type="button"
        className={`${s.emojiTrigger} ${open ? s.emojiTriggerOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        title="Pick an emoji"
      >
        <span className={s.emojiTriggerIcon}>{value || '😀'}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={s.emojiPanel} role="dialog" aria-label="Pick an emoji">
          {EMOJI_GROUPS.map(([group, list]) => (
            <div key={group}>
              <div className={s.emojiGroupLabel}>{group}</div>
              <div className={s.emojiGrid}>
                {list.map(em => (
                  <button
                    key={em}
                    type="button"
                    className={`${s.emojiBtn} ${value === em ? s.emojiBtnActive : ''}`}
                    onClick={() => pick(em)}
                    title={em}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button type="button" className={s.emojiClear} onClick={() => pick('')}>No icon</button>
        </div>
      )}
    </div>
  );
}

function ColorPicker({ label, value, onChange }) {
  return (
    <div className={s.colorRow}>
      <span className={s.colorLabel}>{label}</span>
      <label className={s.colorSwatchWrap} title="Pick color">
        <span className={s.colorSwatch} style={{ background: value }} />
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className={s.colorHidden} />
      </label>
      <input
        className={s.hexInput}
        value={value}
        onChange={e => { const v = e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v); }}
        maxLength={7}
        spellCheck={false}
      />
    </div>
  );
}

function SliderRow({ label, value, min, max, unit = 'px', onChange }) {
  return (
    <div className={s.sliderRow}>
      <span className={s.sliderLabel}>{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className={s.slider} />
      <span className={s.sliderVal}>{value}{unit}</span>
    </div>
  );
}

/* ── Main Component ── */

export default function NavbarBuilderTool() {
  const [layout, setLayout] = useState('default');
  const [logo, setLogo] = useState({ text: 'MyBrand', icon: '', show: true });
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [navStyle, setNavStyle] = useState(DEFAULT_STYLE);
  const [configTab, setConfigTab] = useState('Logo');
  const [codeTab, setCodeTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = device === 'mobile';
  // Room for the open dropdown inside the preview frame (it overlays the page below the bar).
  const mobileMinHeight = menuOpen
    ? navStyle.padding * 2 + 40 + 24 + links.length * (navStyle.fontSize * 1.4 + 24) + 24
    : undefined;

  const updLogo = (k, v) => setLogo(l => ({ ...l, [k]: v }));
  const updStyle = (k, v) => setNavStyle(st => ({ ...st, [k]: v }));

  const updateLink = (id, field, val) => {
    setLinks(ls => ls.map(l => {
      if (l.id !== id) return field === 'active' && val ? { ...l, active: false } : l;
      return { ...l, [field]: val };
    }));
  };

  const removeLink = id => {
    setLinks(ls => { const n = ls.filter(l => l.id !== id); return n.length ? n : ls; });
  };

  const moveLink = (id, dir) => {
    setLinks(ls => {
      const idx = ls.findIndex(l => l.id === id);
      const next = [...ls];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return ls;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  };

  const addLink = () => setLinks(ls => [...ls, { id: uid(), label: 'New Link', href: '#', active: false, cta: false, children: [] }]);

  const genData = useMemo(() => ({ layout, logo, links, navStyle }), [layout, logo, links, navStyle]);
  const code = useMemo(() => generateCode(codeTab, genData), [codeTab, genData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  return (
    <div className={s.wrap}>
      <CssToolsTopNav active="navbar-builder" />

      {/* Body */}
      <div className={s.body}>
        {/* Config panel: title + layout picker on top, then the settings tabs */}
        <div className={s.configPanel}>
          <div className={s.header}>
            <span className={s.logo}>
              <span className={s.logoIcon}>☰</span>
              <span>Navbar <span className={s.accent}>Builder</span></span>
            </span>
            <div className={s.layoutPicker}>
              {LAYOUTS.map(lay => (
                <button
                  key={lay.id}
                  className={`${s.layoutBtn} ${layout === lay.id ? s.layoutBtnActive : ''}`}
                  onClick={() => setLayout(lay.id)}
                  title={lay.hint}
                >
                  {lay.label}
                </button>
              ))}
            </div>
            <span className={s.headerHint}>{LAYOUTS.find(l => l.id === layout)?.hint}</span>
          </div>
          <div className={s.configTabBar}>
            {CONFIG_TABS.map(t => (
              <button key={t} className={`${s.configTab} ${configTab === t ? s.configTabActive : ''}`} onClick={() => setConfigTab(t)}>
                {t}
              </button>
            ))}
          </div>
          <div className={s.configContent}>

            {/* Logo tab */}
            {configTab === 'Logo' && (
              <div className={s.section}>
                <div className={s.toggleRow}>
                  <span className={s.fieldLabel}>Show Logo</span>
                  <button className={`${s.toggleBtn} ${logo.show ? s.toggleOn : s.toggleOff}`} onClick={() => updLogo('show', !logo.show)}>
                    {logo.show ? 'Visible' : 'Hidden'}
                  </button>
                </div>
                {logo.show && (
                  <>
                    <div className={s.fieldGroup}>
                      <label className={s.fieldLabel}>Brand Name</label>
                      <input className={s.input} value={logo.text} onChange={e => updLogo('text', e.target.value)} placeholder="MyBrand" />
                    </div>
                    <div className={s.fieldGroup}>
                      <label className={s.fieldLabel}>Icon / Emoji <span className={s.hint}>(optional, before text)</span></label>
                      <div className={s.emojiRow}>
                        <input className={s.input} value={logo.icon} onChange={e => updLogo('icon', e.target.value)} placeholder="🚀" />
                        <EmojiPicker value={logo.icon} onPick={v => updLogo('icon', v)} />
                      </div>
                    </div>
                  </>
                )}
                {layout === 'minimal' && (
                  <p className={s.notice}>Logo is hidden in Minimal layout regardless of this setting.</p>
                )}
              </div>
            )}

            {/* Links tab */}
            {configTab === 'Links' && (
              <div className={s.section}>
                <div className={s.linkHelp}>
                  <span className={s.helpDot} style={{ background: '#10b981' }} /> Active &nbsp;
                  <span className={s.helpDot} style={{ background: '#f97316' }} /> CTA
                </div>
                {links.map((link, idx) => (
                  <div key={link.id} className={s.linkItem}>
                    <div className={s.linkTop}>
                      <div className={s.linkArrows}>
                        <button className={s.arrowBtn} onClick={() => moveLink(link.id, 'up')} disabled={idx === 0}>↑</button>
                        <button className={s.arrowBtn} onClick={() => moveLink(link.id, 'down')} disabled={idx === links.length - 1}>↓</button>
                      </div>
                      <input className={`${s.input} ${s.linkLabelInput}`} value={link.label} onChange={e => updateLink(link.id, 'label', e.target.value)} placeholder="Label" />
                      <button
                        className={`${s.dotBtn} ${link.active ? s.dotActive : ''}`}
                        onClick={() => updateLink(link.id, 'active', !link.active)}
                        title="Set as active"
                      />
                      <button
                        className={`${s.ctaTag} ${link.cta ? s.ctaTagOn : ''}`}
                        onClick={() => updateLink(link.id, 'cta', !link.cta)}
                        title="Toggle CTA style"
                      >CTA</button>
                      <button className={s.delBtn} onClick={() => removeLink(link.id)} title="Remove">×</button>
                    </div>
                    <input className={`${s.input} ${s.linkHrefInput}`} value={link.href} onChange={e => updateLink(link.id, 'href', e.target.value)} placeholder="/path" />
                  </div>
                ))}
                <button className={s.addLinkBtn} onClick={addLink}>+ Add Link</button>
                {layout === 'split' && links.length > 0 && (
                  <p className={s.notice}>Split layout: first {Math.ceil(links.length / 2)} link{Math.ceil(links.length / 2) !== 1 ? 's' : ''} go left, rest go right.</p>
                )}
              </div>
            )}

            {/* Style tab */}
            {configTab === 'Style' && (
              <div className={s.section}>
                <ColorPicker label="Background" value={navStyle.bg} onChange={v => updStyle('bg', v)} />
                <ColorPicker label="Text" value={navStyle.text} onChange={v => updStyle('text', v)} />
                <ColorPicker label="Accent / Active" value={navStyle.accent} onChange={v => updStyle('accent', v)} />
                <div className={s.divider} />
                <SliderRow label="Padding" value={navStyle.padding} min={8} max={24} onChange={v => updStyle('padding', v)} />
                <SliderRow label="Font Size" value={navStyle.fontSize} min={12} max={18} onChange={v => updStyle('fontSize', v)} />
                <SliderRow label="Link Gap" value={navStyle.gap} min={8} max={56} onChange={v => updStyle('gap', v)} />
                <SliderRow label="CTA Radius" value={navStyle.rounded} min={0} max={24} onChange={v => updStyle('rounded', v)} />
                <div className={s.divider} />
                <div className={s.fieldGroup}>
                  <label className={s.fieldLabel}>Font Weight</label>
                  <div className={s.weightBtns}>
                    {FONT_WEIGHTS.map(([val, label]) => (
                      <button
                        key={val}
                        className={`${s.weightBtn} ${navStyle.fontWeight === val ? s.weightBtnActive : ''}`}
                        style={{ fontWeight: val }}
                        onClick={() => updStyle('fontWeight', val)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={s.divider} />
                <div className={s.toggleRow}>
                  <span className={s.fieldLabel}>Drop Shadow</span>
                  <button className={`${s.toggleBtn} ${navStyle.shadow ? s.toggleOn : s.toggleOff}`} onClick={() => updStyle('shadow', !navStyle.shadow)}>
                    {navStyle.shadow ? 'On' : 'Off'}
                  </button>
                </div>
                <div className={s.toggleRow}>
                  <span className={s.fieldLabel}>Bottom Border</span>
                  <button className={`${s.toggleBtn} ${navStyle.border ? s.toggleOn : s.toggleOff}`} onClick={() => updStyle('border', !navStyle.border)}>
                    {navStyle.border ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code panel: live preview on top, then the code tabs */}
        <div className={s.codePanel}>
          {/* Leaderboard ad (max 90px) at the top of the right column, above the preview */}
          <PlaygroundTopAd />
          <div className={s.previewWrap}>
            <div className={s.previewBar}>
              <span className={s.previewBarLabel}>
                Preview{mobile && ` · ${MOBILE_BP}px and below — tap the menu icon`}
              </span>
              <div className={s.deviceBtns}>
                {['desktop', 'mobile'].map(d => (
                  <button
                    key={d}
                    type="button"
                    className={`${s.deviceBtn} ${device === d ? s.deviceBtnActive : ''}`}
                    onClick={() => { setDevice(d); setMenuOpen(false); }}
                  >
                    {d === 'desktop' ? 'Desktop' : 'Mobile'}
                  </button>
                ))}
              </div>
            </div>
            <div className={`${s.previewInner} ${mobile ? s.previewMobile : ''}`} style={mobile ? { minHeight: mobileMinHeight } : undefined}>
              <NavbarPreview
                layout={layout} logo={logo} links={links} navStyle={navStyle}
                mobile={mobile} open={menuOpen} onToggle={() => setMenuOpen(o => !o)}
              />
              <div className={s.pageHint}>
                <div className={s.pageLineW} />
                <div className={s.pageLineN} />
              </div>
            </div>
          </div>
          <div className={s.codeTabBar}>
            {CODE_TABS.map(t => (
              <button key={t} className={`${s.codeTab} ${codeTab === t ? s.codeTabActive : ''}`} onClick={() => setCodeTab(t)}>
                {t}
              </button>
            ))}
            <button className={`${s.copyBtn} ${copied ? s.copyOk : ''}`} onClick={handleCopy}>
              {copied ? '✓ Copied' : `⎘ Copy ${codeTab}`}
            </button>
          </div>
          <div className={s.codeWrap}>
            <pre className={s.code}>{code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
