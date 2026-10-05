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
const CODE_TABS = ['HTML', 'React', 'Tailwind', 'Vue', 'Angular'];
const CONFIG_TABS = ['Presets', 'Logo', 'Links', 'Style', 'Behavior'];
const FONT_WEIGHTS = [['400','Regular'], ['500','Medium'], ['600','Semibold'], ['700','Bold']];

const SCROLL_MODES = [
  ['static',      'Static',      'Scrolls away with the page'],
  ['sticky',      'Sticky',      'Stays pinned to the top'],
  ['shrink',      'Shrink',      'Sticky, slims down once you scroll'],
  ['hide',        'Hide on scroll', 'Hides scrolling down, returns scrolling up'],
  ['transparent', 'Transparent', 'Clear over the hero, solid once you scroll'],
];
const MENU_STYLES = [
  ['dropdown',   'Dropdown',    'Panel drops down under the bar'],
  ['drawer',     'Drawer',      'Slides in from the side over a dimmed page'],
  ['fullscreen', 'Full screen', 'Covers the screen with large links'],
];
const TOGGLE_ICONS = [
  ['cross', 'Cross', 'Lines morph into an ×'],
  ['arrow', 'Arrow', 'Lines fold into a ← arrow'],
  ['spin',  'Spin',  'Spins round into an ×'],
];

let _id = 100;
const uid = () => ++_id;

const DEFAULT_LINKS = [
  { id: 1, label: 'Home',     href: '/',         active: true,  cta: false, children: [] },
  { id: 2, label: 'Products', href: '/products', active: false, cta: false, children: [
    { id: 21, label: 'Analytics',    href: '/products/analytics' },
    { id: 22, label: 'Automation',   href: '/products/automation' },
    { id: 23, label: 'Integrations', href: '/products/integrations' },
  ] },
  { id: 3, label: 'Blog',        href: '/blog',   active: false, cta: false, children: [] },
  { id: 4, label: 'Get Started', href: '/signup', active: false, cta: true,  children: [] },
];

const DEFAULT_STYLE = {
  bg: '#ffffff', text: '#111827', accent: '#3b82f6',
  padding: 14, fontSize: 14, fontWeight: '500',
  shadow: true, border: false, rounded: 6, gap: 28,
};

const DEFAULT_OPTIONS = { scroll: 'sticky', menu: 'dropdown', side: 'right', icon: 'cross', bp: 768 };

// One-click starting points. Links get fresh ids when applied.
const PRESETS = [
  {
    id: 'saas', name: 'SaaS', desc: 'Product dropdown, shrinks on scroll',
    layout: 'default', logo: { text: 'Flowly', icon: '⚡', show: true },
    links: [
      { label: 'Product', href: '/product', children: [
        { label: 'Features', href: '/features' }, { label: 'Integrations', href: '/integrations' }, { label: 'Changelog', href: '/changelog' },
      ] },
      { label: 'Pricing', href: '/pricing' }, { label: 'Docs', href: '/docs' }, { label: 'Blog', href: '/blog' },
      { label: 'Start free', href: '/signup', cta: true },
    ],
    style: { bg: '#ffffff', text: '#0f172a', accent: '#4f46e5', fontWeight: '500', rounded: 8 },
    options: { scroll: 'shrink', menu: 'dropdown', icon: 'cross' },
  },
  {
    id: 'portfolio', name: 'Portfolio', desc: 'Centered, hides on scroll, full-screen menu',
    layout: 'centered', logo: { text: 'Jane Doe', icon: '✦', show: true },
    links: [
      { label: 'Work', href: '/work', active: true }, { label: 'About', href: '/about' },
      { label: 'Writing', href: '/writing' }, { label: 'Contact', href: '/contact' },
    ],
    style: { bg: '#fafaf9', text: '#1c1917', accent: '#ea580c', fontWeight: '600', shadow: false, border: true },
    options: { scroll: 'hide', menu: 'fullscreen', icon: 'spin' },
  },
  {
    id: 'shop', name: 'E-commerce', desc: 'Shop dropdown, sticky, side drawer',
    layout: 'default', logo: { text: 'ShopNest', icon: '🛒', show: true },
    links: [
      { label: 'Shop', href: '/shop', children: [
        { label: 'New In', href: '/new' }, { label: 'Women', href: '/women' }, { label: 'Men', href: '/men' }, { label: 'Sale', href: '/sale' },
      ] },
      { label: 'Collections', href: '/collections' }, { label: 'About', href: '/about' },
      { label: 'Cart (2)', href: '/cart', cta: true },
    ],
    style: { bg: '#ffffff', text: '#111827', accent: '#059669', rounded: 999 },
    options: { scroll: 'sticky', menu: 'drawer', side: 'right', icon: 'cross' },
  },
  {
    id: 'docs', name: 'Docs', desc: 'Dark bar, guides dropdown, bottom border',
    layout: 'default', logo: { text: 'DevDocs', icon: '📚', show: true },
    links: [
      { label: 'Guides', href: '/guides', active: true, children: [
        { label: 'Getting started', href: '/start' }, { label: 'Tutorials', href: '/tutorials' }, { label: 'Recipes', href: '/recipes' },
      ] },
      { label: 'API Reference', href: '/api' }, { label: 'Examples', href: '/examples' },
      { label: 'GitHub', href: 'https://github.com', cta: true },
    ],
    style: { bg: '#0f172a', text: '#e2e8f0', accent: '#38bdf8', shadow: false, border: true, fontSize: 14 },
    options: { scroll: 'sticky', menu: 'dropdown', icon: 'arrow' },
  },
  {
    id: 'midnight', name: 'Midnight', desc: 'Transparent over the hero, left drawer',
    layout: 'default', logo: { text: 'Nova', icon: '🌙', show: true },
    links: [
      { label: 'Features', href: '/features' }, { label: 'Showcase', href: '/showcase' },
      { label: 'Company', href: '/company', children: [
        { label: 'About us', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Press', href: '/press' },
      ] },
      { label: 'Join waitlist', href: '/join', cta: true },
    ],
    style: { bg: '#111827', text: '#f9fafb', accent: '#a78bfa', rounded: 999, fontWeight: '500' },
    options: { scroll: 'transparent', menu: 'drawer', side: 'left', icon: 'arrow' },
  },
  {
    id: 'agency', name: 'Agency', desc: 'Split layout, services dropdown, full screen',
    layout: 'split', logo: { text: 'STUDIO', icon: '', show: true },
    links: [
      { label: 'Work', href: '/work' },
      { label: 'Services', href: '/services', children: [
        { label: 'Branding', href: '/branding' }, { label: 'Web Design', href: '/web' }, { label: 'Motion', href: '/motion' },
      ] },
      { label: 'About', href: '/about' }, { label: "Let's talk", href: '/contact', cta: true },
    ],
    style: { bg: '#ffffff', text: '#0a0a0a', accent: '#e11d48', fontWeight: '600', rounded: 0, gap: 32 },
    options: { scroll: 'sticky', menu: 'fullscreen', icon: 'cross' },
  },
];

/* ── Helpers ── */
function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
function isLight(hex) {
  const h = hex.replace('#', '');
  if (h.length < 6) return false;
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.6;
}
const ctaPadV = st => Math.round(st.padding * 0.45);
const ind = (str, n) => str.split('\n').map(l => (l ? ' '.repeat(n) + l : l)).join('\n');

const showLogo = (layout, logo) => logo.show && layout !== 'minimal';
const logoText = logo => `${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}`;
const containerMod = layout =>
  layout === 'centered' ? ' nav-centered' : layout === 'minimal' ? ' nav-minimal' : layout === 'split' ? ' nav-split' : '';
const splitAt = links => Math.ceil(links.length / 2);
// A link opens a dropdown when it has sub-items (a CTA button never does).
const hasKids = l => !l.cta && Array.isArray(l.children) && l.children.length > 0;
const linksJSON = links => JSON.stringify(links.map(l => {
  const o = { label: l.label, href: l.href };
  if (l.active) o.active = true;
  if (l.cta) o.cta = true;
  if (hasKids(l)) o.children = l.children.map(c => ({ label: c.label, href: c.href }));
  return o;
}), null, 2);

const tracksScroll = o => o.scroll === 'shrink' || o.scroll === 'transparent';
const locksScroll = o => o.menu !== 'dropdown';

const CARET_HTML = '<svg class="nav-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>';
const CARET_JSX = '<svg className="nav-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>';

/* ── Code Generators ── */

// Shared stylesheet for the HTML, React, Vue and Angular outputs (Tailwind has its own
// utility classes). Everything is driven by state classes on .navbar: is-open (mobile
// menu), is-scrolled / is-hidden (scroll behaviour), and is-open on a .nav-item (dropdown).
function genCSS(data, { reset = true } = {}) {
  const { layout, logo, links, navStyle: st, options: o } = data;
  const kids = links.some(hasKids);
  const fixed = o.scroll === 'transparent';
  const sticky = o.scroll === 'sticky' || o.scroll === 'shrink' || o.scroll === 'hide';
  const full = o.menu === 'fullscreen';
  const shadow = `0 1px 8px ${hexToRgba(st.text, 0.08)}`;
  const decor = [
    st.shadow && `  box-shadow: ${shadow};`,
    st.border && `  border-bottom: 1px solid ${hexToRgba(st.text, 0.1)};`,
  ].filter(Boolean);
  const out = [];
  if (reset) out.push('* { box-sizing: border-box; }', '');

  out.push(
    '.navbar {',
    `  position: ${fixed ? 'fixed' : sticky ? 'sticky' : 'relative'};`,
    ...(fixed ? ['  top: 0;', '  left: 0;', '  right: 0;'] : sticky ? ['  top: 0;'] : []),
    '  z-index: 50;',
    `  background: ${fixed ? 'transparent' : st.bg};`,
    ...(fixed ? [] : decor),
    ...(o.scroll === 'hide' ? ['  transition: transform 0.3s ease;'] : []),
    ...(fixed ? ['  transition: background-color 0.25s ease, box-shadow 0.25s ease;'] : []),
    '}',
  );
  if (fixed) {
    out.push('/* Solid once the page scrolls (or while the mobile menu is open) */',
      '.navbar.is-scrolled,', '.navbar.is-open {', `  background: ${st.bg};`, ...(decor.length ? decor : [`  box-shadow: ${shadow};`]), '}');
  }
  if (o.scroll === 'shrink') out.push(`.navbar.is-scrolled { box-shadow: 0 4px 16px ${hexToRgba(st.text, 0.12)}; }`);
  if (o.scroll === 'hide') out.push('.navbar.is-hidden { transform: translateY(-100%); }');

  out.push('',
    '.nav-container {',
    '  max-width: 1200px;',
    '  margin: 0 auto;',
    `  padding: ${st.padding}px 24px;`,
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  gap: 16px;',
    ...(o.scroll === 'shrink' ? ['  transition: padding 0.25s ease;'] : []),
    '}',
  );
  if (o.scroll === 'shrink') {
    const p = Math.max(4, Math.round(st.padding / 2));
    out.push(`.navbar.is-scrolled .nav-container { padding-top: ${p}px; padding-bottom: ${p}px; }`);
  }

  if (showLogo(layout, logo)) {
    out.push('',
      '.nav-logo {',
      `  font-size: ${st.fontSize + 4}px;`,
      '  font-weight: 700;',
      `  color: ${st.text};`,
      '  text-decoration: none;',
      '  flex-shrink: 0;',
      '}',
    );
  }

  out.push('',
    '.nav-links {',
    '  display: flex;',
    '  align-items: center;',
    `  gap: ${st.gap}px;`,
    '  list-style: none;',
    '  margin: 0;',
    '  padding: 0;',
    '}',
    '',
    '.nav-link {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: 4px;',
    '  padding: 0;',
    '  border: 0;',
    '  background: none;',
    '  font-family: inherit;',
    `  font-size: ${st.fontSize}px;`,
    `  font-weight: ${st.fontWeight};`,
    `  color: ${st.text};`,
    '  text-decoration: none;',
    '  cursor: pointer;',
    '  transition: color 0.15s;',
    '}',
    '.nav-link:hover,',
    `.nav-link.active { color: ${st.accent}; }`,
    '',
    '.nav-link.cta {',
    `  background: ${st.accent};`,
    '  color: #fff;',
    `  padding: ${ctaPadV(st)}px ${st.padding}px;`,
    `  border-radius: ${st.rounded}px;`,
    '  transition: opacity 0.15s;',
    '}',
    '.nav-link.cta:hover { opacity: 0.88; }',
  );

  if (kids) {
    out.push('',
      '/* Dropdowns */',
      '.nav-item { position: relative; }',
      '.nav-caret { transition: transform 0.2s ease; }',
      '.nav-item.is-open .nav-caret { transform: rotate(180deg); }',
      '.nav-dropdown {',
      '  list-style: none;',
      '  margin: 0;',
      '  padding: 6px;',
      '}',
      '.nav-dropdown-link {',
      '  display: block;',
      '  padding: 8px 12px;',
      '  border-radius: 6px;',
      `  font-size: ${st.fontSize - 1}px;`,
      `  color: ${st.text};`,
      '  text-decoration: none;',
      '  white-space: nowrap;',
      '  transition: background-color 0.15s, color 0.15s;',
      '}',
      `.nav-dropdown-link:hover { background: ${hexToRgba(st.text, 0.06)}; color: ${st.accent}; }`,
    );
  }

  out.push('',
    '/* Visible keyboard focus */',
    ...(showLogo(layout, logo) ? ['.nav-logo:focus-visible,'] : []),
    '.nav-link:focus-visible,',
    ...(kids ? ['.nav-dropdown-link:focus-visible,'] : []),
    '.nav-toggle:focus-visible {',
    `  outline: 2px solid ${st.accent};`,
    '  outline-offset: 3px;',
    '}',
    '',
    `/* Hamburger: hidden on desktop; ${o.icon === 'arrow' ? 'folds into a ← arrow' : o.icon === 'spin' ? 'spins into an ×' : 'morphs into an ×'} while the menu is open */`,
    '.nav-toggle {',
    '  display: none;',
    '  flex-direction: column;',
    '  justify-content: center;',
    '  gap: 5px;',
    '  width: 40px;',
    '  height: 40px;',
    '  margin-left: auto;',
    '  padding: 8px;',
    '  background: none;',
    '  border: 0;',
    '  cursor: pointer;',
    ...(o.icon === 'spin' ? ['  transition: transform 0.35s ease;'] : []),
    '}',
    '.nav-toggle span {',
    '  display: block;',
    '  width: 24px;',
    '  height: 2px;',
    '  border-radius: 2px;',
    `  background: ${st.text};`,
    ...(o.icon === 'arrow' ? ['  transform-origin: left center;'] : []),
    '  transition: transform 0.25s ease, opacity 0.2s ease;',
    '}',
  );
  if (o.icon === 'arrow') {
    out.push(
      '.navbar.is-open .nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(-45deg) scaleX(0.55); }',
      '.navbar.is-open .nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(45deg) scaleX(0.55); }',
    );
  } else {
    if (o.icon === 'spin') out.push('.navbar.is-open .nav-toggle { transform: rotate(180deg); }');
    out.push(
      '.navbar.is-open .nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }',
      '.navbar.is-open .nav-toggle span:nth-child(2) { opacity: 0; }',
      '.navbar.is-open .nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }',
    );
  }
  if (o.menu === 'drawer') out.push('.nav-backdrop { display: none; }');

  /* Desktop */
  const desk = [];
  if (layout === 'centered') desk.push('.nav-centered { justify-content: center; gap: 40px; }');
  if (layout === 'minimal') desk.push('.nav-minimal { justify-content: center; }');
  desk.push('.nav-menu {', '  display: flex;', '  align-items: center;', `  gap: ${st.gap}px;`, '}');
  if (layout === 'split') {
    desk.push(
      '/* Split: the menu wrapper steps aside so its two lists sit either side of the logo */',
      '.nav-split {',
      '  display: grid;',
      '  grid-template-columns: 1fr auto 1fr;',
      '  grid-template-areas: "left logo right";',
      '  gap: 24px;',
      '}',
      '.nav-split .nav-logo { grid-area: logo; }',
      '.nav-split .nav-menu { display: contents; }',
      '.nav-split .nav-links:first-child { grid-area: left; justify-content: flex-end; }',
      '.nav-split .nav-links:last-child { grid-area: right; justify-content: flex-start; }',
    );
  }
  if (kids) {
    desk.push(
      '/* Dropdowns float under their link and open on hover or click */',
      '.nav-dropdown {',
      '  position: absolute;',
      '  top: calc(100% + 10px);',
      '  left: 50%;',
      '  min-width: 200px;',
      `  background: ${st.bg};`,
      `  border: 1px solid ${hexToRgba(st.text, 0.08)};`,
      '  border-radius: 10px;',
      `  box-shadow: 0 12px 32px ${hexToRgba(st.text, 0.14)};`,
      '  opacity: 0;',
      '  visibility: hidden;',
      '  transform: translate(-50%, 6px);',
      '  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;',
      '}',
      "/* Invisible bridge so the pointer can cross the gap into the dropdown */",
      ".nav-dropdown::before { content: ''; position: absolute; left: 0; right: 0; top: -12px; height: 12px; }",
      '.nav-item:hover > .nav-dropdown,',
      '.nav-item.is-open > .nav-dropdown {',
      '  opacity: 1;',
      '  visibility: visible;',
      '  transform: translate(-50%, 0);',
      '}',
      '.nav-item:hover .nav-caret { transform: rotate(180deg); }',
    );
  }
  out.push('', `@media (min-width: ${o.bp + 1}px) {`, ...desk.map(l => '  ' + l), '}');

  /* Mobile */
  const mob = ['.nav-toggle { display: flex; }'];
  if (o.menu === 'dropdown') {
    mob.push(
      '.nav-menu {',
      '  display: none;',
      '  position: absolute;',
      '  top: 100%;',
      '  left: 0;',
      '  right: 0;',
      '  max-height: calc(100vh - 100%);',
      '  overflow-y: auto;',
      '  padding: 8px 24px 16px;',
      `  background: ${st.bg};`,
      `  box-shadow: 0 8px 16px ${hexToRgba(st.text, 0.1)};`,
      '}',
      '.navbar.is-open .nav-menu { display: block; }',
    );
  } else if (o.menu === 'drawer') {
    mob.push(
      '.nav-menu {',
      '  position: fixed;',
      '  top: 0;',
      '  bottom: 0;',
      `  ${o.side}: 0;`,
      '  z-index: 1;',
      '  width: min(320px, 85vw);',
      '  padding: 80px 24px 24px;',
      '  overflow-y: auto;',
      `  background: ${st.bg};`,
      '  box-shadow: 0 0 32px rgba(15, 23, 42, 0.2);',
      `  transform: translateX(${o.side === 'right' ? '100%' : '-100%'});`,
      '  visibility: hidden;',
      '  transition: transform 0.3s ease, visibility 0.3s;',
      '}',
      '.navbar.is-open .nav-menu {',
      '  transform: none;',
      '  visibility: visible;',
      '}',
      '.nav-backdrop {',
      '  display: block;',
      '  position: fixed;',
      '  inset: 0;',
      '  background: rgba(15, 23, 42, 0.45);',
      '  opacity: 0;',
      '  visibility: hidden;',
      '  transition: opacity 0.3s ease, visibility 0.3s;',
      '}',
      '.navbar.is-open .nav-backdrop {',
      '  opacity: 1;',
      '  visibility: visible;',
      '}',
      '.nav-toggle {',
      '  position: relative;',
      '  z-index: 2;',
      '}',
    );
  } else {
    mob.push(
      '.nav-menu {',
      '  position: fixed;',
      '  inset: 0;',
      '  z-index: 1;',
      '  display: flex;',
      '  flex-direction: column;',
      '  justify-content: safe center;',
      '  padding: 96px 32px 32px;',
      '  overflow-y: auto;',
      `  background: ${st.bg};`,
      '  opacity: 0;',
      '  visibility: hidden;',
      '  transition: opacity 0.25s ease, visibility 0.25s;',
      '}',
      '.navbar.is-open .nav-menu {',
      '  opacity: 1;',
      '  visibility: visible;',
      '}',
      '.nav-toggle {',
      '  position: relative;',
      '  z-index: 2;',
      '}',
    );
  }
  mob.push(
    '.nav-links {',
    '  flex-direction: column;',
    '  align-items: stretch;',
    '  gap: 0;',
    '}',
    '.nav-link {',
    '  display: flex;',
    '  width: 100%;',
    `  justify-content: ${full ? 'center' : 'space-between'};`,
    '  padding: 12px 0;',
    ...(full ? [`  font-size: ${st.fontSize + 6}px;`] : []),
    '}',
    '.nav-link.cta {',
    '  justify-content: center;',
    '  margin-top: 8px;',
    `  padding: 12px ${st.padding}px;`,
    '}',
  );
  if (kids) {
    mob.push(
      '/* Dropdowns become expandable sections inside the menu */',
      '.nav-dropdown {',
      '  display: none;',
      `  padding: ${full ? '0 0 8px' : '0 0 8px 12px'};`,
      ...(full ? ['  text-align: center;'] : []),
      '}',
      '.nav-item.is-open > .nav-dropdown { display: block; }',
      '.nav-dropdown-link { padding: 10px 12px; }',
    );
  }
  out.push('', `/* Mobile: ${o.menu === 'drawer' ? `a ${o.side} drawer` : o.menu === 'fullscreen' ? 'a full-screen menu' : 'a dropdown panel under the bar'} */`,
    `@media (max-width: ${o.bp}px) {`, ...mob.map(l => '  ' + l), '}');

  return out.join('\n');
}

// HTML markup for the navbar (shared by the HTML tab, the live preview and Fork).
function genMarkup(data) {
  const { layout, logo, links, options: o } = data;
  const item = l => hasKids(l)
    ? `<li class="nav-item has-dropdown">
  <button class="nav-link nav-dropdown-toggle" type="button" aria-expanded="false">
    ${l.label}
    ${CARET_HTML}
  </button>
  <ul class="nav-dropdown">
${l.children.map(c => `    <li><a href="${c.href}" class="nav-dropdown-link">${c.label}</a></li>`).join('\n')}
  </ul>
</li>`
    : `<li><a href="${l.href}" class="nav-link${l.active ? ' active' : ''}${l.cta ? ' cta' : ''}"${l.active ? ' aria-current="page"' : ''}>${l.label}</a></li>`;
  const list = items => `<ul class="nav-links">\n${ind(items.map(item).join('\n'), 2)}\n</ul>`;
  const lists = layout === 'split'
    ? `${list(links.slice(0, splitAt(links)))}\n${list(links.slice(splitAt(links)))}`
    : list(links);
  const logoLine = showLogo(layout, logo) ? `    <a href="/" class="nav-logo">${logoText(logo)}</a>\n` : '';

  return `<nav class="navbar" aria-label="Main">
  <div class="nav-container${containerMod(layout)}">
${logoLine}    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="nav-menu" id="nav-menu">
${ind(lists, 6)}
    </div>
  </div>${o.menu === 'drawer' ? '\n  <div class="nav-backdrop"></div>' : ''}
</nav>`;
}

// Vanilla JS for the HTML output: mobile menu, dropdowns, Escape, scroll behaviour.
function genJS(data) {
  const { links, options: o } = data;
  const kids = links.some(hasKids);
  const lines = [
    '(() => {',
    "  const navbar = document.querySelector('.navbar');",
    "  const toggle = navbar.querySelector('.nav-toggle');",
    ...(kids ? ["  const dropdowns = navbar.querySelectorAll('.has-dropdown');"] : []),
    '',
    '  function setMenu(open) {',
    "    navbar.classList.toggle('is-open', open);",
    "    toggle.setAttribute('aria-expanded', open);",
    "    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');",
    ...(locksScroll(o) ? ["    document.body.style.overflow = open ? 'hidden' : '';  // no page scroll behind the menu"] : []),
    '  }',
  ];
  if (kids) {
    lines.push('',
      '  function closeDropdowns(except) {',
      '    dropdowns.forEach(item => {',
      '      if (item === except) return;',
      "      item.classList.remove('is-open');",
      "      item.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');",
      '    });',
      '  }',
    );
  }
  lines.push('',
    "  toggle.addEventListener('click', () => setMenu(!navbar.classList.contains('is-open')));",
    ...(o.menu === 'drawer' ? ["  navbar.querySelector('.nav-backdrop').addEventListener('click', () => setMenu(false));"] : []),
    "  navbar.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => setMenu(false)));",
  );
  if (kids) {
    lines.push('',
      '  // Dropdowns: click (or Enter / Space) toggles; on desktop hover opens them too.',
      '  dropdowns.forEach(item => {',
      "    const button = item.querySelector('.nav-dropdown-toggle');",
      "    button.addEventListener('click', () => {",
      "      const open = !item.classList.contains('is-open');",
      '      closeDropdowns(item);',
      "      item.classList.toggle('is-open', open);",
      "      button.setAttribute('aria-expanded', open);",
      '    });',
      '  });',
      "  document.addEventListener('click', e => { if (!navbar.contains(e.target)) closeDropdowns(); });",
    );
  }
  lines.push('',
    "  document.addEventListener('keydown', e => {",
    "    if (e.key !== 'Escape') return;",
    ...(kids ? ['    closeDropdowns();'] : []),
    '    setMenu(false);',
    '  });',
    '',
    '  // Back to the desktop layout: reset the mobile menu.',
    `  matchMedia('(min-width: ${o.bp + 1}px)').addEventListener('change', () => setMenu(false));`,
  );
  if (tracksScroll(o) || o.scroll === 'hide') {
    lines.push('');
    if (o.scroll === 'hide') {
      lines.push(
        '  // Hide while scrolling down, show again on any scroll up.',
        '  let lastY = window.scrollY;',
        '  function onScroll() {',
        '    const y = window.scrollY;',
        "    navbar.classList.toggle('is-hidden', y > lastY && y > 80 && !navbar.classList.contains('is-open'));",
        '    lastY = y;',
        '  }',
      );
    } else {
      lines.push(
        `  // ${o.scroll === 'shrink' ? 'Slim the bar down' : 'Turn the bar solid'} once the page has scrolled.`,
        "  const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 10);",
      );
    }
    lines.push("  window.addEventListener('scroll', onScroll, { passive: true });", '  onScroll();');
  }
  lines.push('})();');
  return lines.join('\n');
}

function genHTML(data) {
  return `${genMarkup(data)}

<style>
${genCSS(data)}
</style>

<script>
${genJS(data)}
</script>`;
}

// State + effects shared by the React and Tailwind (React) outputs.
function reactLogic(data) {
  const { links, options: o } = data;
  const kids = links.some(hasKids);
  const hide = o.scroll === 'hide';
  const track = tracksScroll(o);
  const lines = [
    'const navRef = useRef(null);',
    'const [open, setOpen] = useState(false);',
    ...(kids ? ['const [dropdown, setDropdown] = useState(null);'] : []),
    ...(track ? ['const [scrolled, setScrolled] = useState(false);'] : []),
    ...(hide ? ['const [hidden, setHidden] = useState(false);'] : []),
    '',
    'const close = () => {',
    '  setOpen(false);',
    ...(kids ? ['  setDropdown(null);'] : []),
    '};',
    '',
    kids
      ? '// Escape closes everything; a click outside the navbar closes an open dropdown.'
      : '// Escape closes the menu.',
    'useEffect(() => {',
    "  const onKey = e => { if (e.key === 'Escape') close(); };",
    ...(kids ? ['  const onClick = e => { if (!navRef.current?.contains(e.target)) setDropdown(null); };'] : []),
    "  document.addEventListener('keydown', onKey);",
    ...(kids ? ["  document.addEventListener('click', onClick);"] : []),
    '  return () => {',
    "    document.removeEventListener('keydown', onKey);",
    ...(kids ? ["    document.removeEventListener('click', onClick);"] : []),
    '  };',
    '}, []);',
  ];
  if (locksScroll(o)) {
    lines.push('',
      '// No page scroll behind the open menu.',
      'useEffect(() => {',
      "  document.body.style.overflow = open ? 'hidden' : '';",
      "  return () => { document.body.style.overflow = ''; };",
      '}, [open]);',
    );
  }
  if (track || hide) {
    lines.push('',
      hide ? '// Hide while scrolling down, show again on any scroll up.'
        : `// ${o.scroll === 'shrink' ? 'Slim the bar down' : 'Turn the bar solid'} once the page has scrolled.`,
      'useEffect(() => {',
      ...(hide ? ['  let lastY = window.scrollY;'] : []),
      '  const onScroll = () => {',
      ...(track ? ['    setScrolled(window.scrollY > 10);'] : []),
      ...(hide ? ['    const y = window.scrollY;', '    setHidden(y > lastY && y > 80);', '    lastY = y;'] : []),
      '  };',
      '  onScroll();',
      "  window.addEventListener('scroll', onScroll, { passive: true });",
      "  return () => window.removeEventListener('scroll', onScroll);",
      '}, []);',
    );
  }
  return lines.join('\n');
}

function genReact(data) {
  const { layout, logo, links, options: o } = data;
  const kids = links.some(hasKids);
  const linkEl = `<a
  href={link.href}
  className={\`nav-link\${link.active ? ' active' : ''}\${link.cta ? ' cta' : ''}\`}
  aria-current={link.active ? 'page' : undefined}
  onClick={close}
>
  {link.label}
</a>`;
  const renderLinks = kids
    ? `const renderLinks = items => items.map(link => (
  link.children ? (
    <li key={link.label} className={\`nav-item has-dropdown\${dropdown === link.label ? ' is-open' : ''}\`}>
      <button
        type="button"
        className="nav-link nav-dropdown-toggle"
        aria-expanded={dropdown === link.label}
        onClick={() => setDropdown(d => (d === link.label ? null : link.label))}
      >
        {link.label}
        ${CARET_JSX}
      </button>
      <ul className="nav-dropdown">
        {link.children.map(child => (
          <li key={child.label}>
            <a href={child.href} className="nav-dropdown-link" onClick={close}>{child.label}</a>
          </li>
        ))}
      </ul>
    </li>
  ) : (
    <li key={link.label}>
${ind(linkEl, 6)}
    </li>
  )
));`
    : `const renderLinks = items => items.map(link => (
  <li key={link.label}>
${ind(linkEl, 4)}
  </li>
));`;
  const navClass = ["'navbar'", "open && 'is-open'",
    ...(tracksScroll(o) ? ["scrolled && 'is-scrolled'"] : []),
    ...(o.scroll === 'hide' ? ["hidden && !open && 'is-hidden'"] : [])];
  const lists = layout === 'split'
    ? `<ul className="nav-links">{renderLinks(links.slice(0, ${splitAt(links)}))}</ul>
<ul className="nav-links">{renderLinks(links.slice(${splitAt(links)}))}</ul>`
    : '<ul className="nav-links">{renderLinks(links)}</ul>';
  const logoLine = showLogo(layout, logo) ? `        <a href="/" className="nav-logo">${logoText(logo)}</a>\n` : '';

  return `// Navbar.jsx
import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const links = ${linksJSON(links)};

export default function Navbar() {
${ind(reactLogic(data), 2)}

${ind(renderLinks, 2)}

  const navClass = [${navClass.join(', ')}].filter(Boolean).join(' ');

  return (
    <nav className={navClass} ref={navRef} aria-label="Main">
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
${ind(lists, 10)}
        </div>
      </div>${o.menu === 'drawer' ? '\n      <div className="nav-backdrop" onClick={close} />' : ''}
    </nav>
  );
}

/* ── Navbar.css ─────────────────────────────────────────── */
${genCSS(data)}`;
}

function genTailwind(data) {
  const { layout, logo, links, navStyle: st, options: o } = data;
  const D = `min-[${o.bp + 1}px]:`;
  const d = cls => cls.split(/\s+/).filter(Boolean).map(c => D + c).join(' ');
  const kids = links.some(hasKids);
  const split = layout === 'split';
  const full = o.menu === 'fullscreen';
  const fixed = o.scroll === 'transparent';
  const sticky = o.scroll === 'sticky' || o.scroll === 'shrink' || o.scroll === 'hide';
  const decor = [st.shadow ? 'shadow-sm' : '', st.border ? 'border-b border-black/10' : ''].filter(Boolean).join(' ');

  // <nav> classes
  let navExpr;
  if (fixed) {
    navExpr = `{\`fixed top-0 inset-x-0 z-50 transition-colors duration-300 \${scrolled || open ? 'bg-[${st.bg}] ${decor || 'shadow-sm'}' : 'bg-transparent'}\`}`;
  } else {
    const base = [sticky ? 'sticky top-0' : 'relative', 'z-50', `bg-[${st.bg}]`, decor].filter(Boolean).join(' ');
    if (o.scroll === 'hide') navExpr = `{\`${base} transition-transform duration-300 \${hidden && !open ? '-translate-y-full' : ''}\`}`;
    else if (o.scroll === 'shrink') navExpr = `{\`${base} transition-shadow \${scrolled ? 'shadow-md' : ''}\`}`;
    else navExpr = `"${base}"`;
  }

  const container = [
    'max-w-6xl mx-auto px-6 flex items-center justify-between gap-4',
    layout === 'centered' ? d('justify-center gap-10') : layout === 'minimal' ? d('justify-center') : '',
    split ? d('grid grid-cols-[1fr_auto_1fr] gap-6') : '',
    o.scroll === 'shrink' ? 'transition-[padding] duration-300' : '',
  ].filter(Boolean).join(' ');
  const shrinkP = Math.max(4, Math.round(st.padding / 2));
  const padStyle = o.scroll === 'shrink'
    ? `{{ paddingTop: scrolled ? '${shrinkP}px' : '${st.padding}px', paddingBottom: scrolled ? '${shrinkP}px' : '${st.padding}px' }}`
    : `{{ paddingTop: '${st.padding}px', paddingBottom: '${st.padding}px' }}`;

  // Mobile panel per menu style; from the breakpoint up it sits back inline in the bar.
  let menuMobile;
  if (o.menu === 'dropdown') {
    menuMobile = `\${open ? 'block' : 'hidden'} absolute top-full inset-x-0 max-h-[calc(100vh-100%)] overflow-y-auto px-6 pt-2 pb-4 bg-[${st.bg}] shadow-lg`;
  } else if (o.menu === 'drawer') {
    const off = o.side === 'right' ? 'translate-x-full' : '-translate-x-full';
    menuMobile = `fixed inset-y-0 ${o.side}-0 z-[1] w-[min(320px,85vw)] overflow-y-auto px-6 pt-20 pb-6 bg-[${st.bg}] shadow-2xl transition-[transform,visibility] duration-300 \${open ? 'visible translate-x-0' : 'invisible ${off}'}`;
  } else {
    menuMobile = `fixed inset-0 z-[1] flex flex-col justify-center overflow-y-auto px-8 pt-24 pb-8 bg-[${st.bg}] transition-[opacity,visibility] duration-300 \${open ? 'visible opacity-100' : 'invisible opacity-0'}`;
  }
  const menuDesk = split
    ? d('contents visible')
    : d(`static flex flex-row items-center gap-[${st.gap}px] w-auto max-h-none overflow-visible p-0 bg-transparent shadow-none visible opacity-100 translate-x-0 z-auto`);

  const ulBase = `flex flex-col list-none m-0 p-0${full ? ' items-center' : ''} ${d(`flex-row items-center gap-[${st.gap}px]`)}`;
  const lists = split
    ? `<ul className="${ulBase} ${d('col-start-1 row-start-1 justify-end')}">{renderLinks(links.slice(0, ${splitAt(links)}))}</ul>
<ul className="${ulBase} ${d('col-start-3 row-start-1 justify-start')}">{renderLinks(links.slice(${splitAt(links)}))}</ul>`
    : `<ul className="${ulBase}">{renderLinks(links)}</ul>`;

  const logoLine = showLogo(layout, logo)
    ? `        <a href="/" className="text-[${st.fontSize + 4}px] font-bold text-[${st.text}] no-underline shrink-0${split ? ' ' + d('col-start-2 row-start-1') : ''} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[${st.accent}]">${logoText(logo)}</a>\n`
    : '';

  const barOpen = o.icon === 'arrow'
    ? ["translate-y-[7px] -rotate-45 scale-x-[0.55]", '', "-translate-y-[7px] rotate-45 scale-x-[0.55]"]
    : ['translate-y-[7px] rotate-45', 'opacity-0', '-translate-y-[7px] -rotate-45'];
  const bars = barOpen.map(c => c
    ? `<span className={\`\${bar} \${open ? '${c}' : ''}\`} />`
    : '<span className={bar} />').join('\n');

  const linkFont = full ? `text-[${st.fontSize + 6}px] ${d(`text-[${st.fontSize}px]`)}` : `text-[${st.fontSize}px]`;
  const focus = `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[${st.accent}]`;

  const renderLinks = kids
    ? `const renderLinks = items => items.map(link => (
  link.children ? (
    <li key={link.label} className="relative group">
      <button
        type="button"
        className={\`\${navLink(link.active)} bg-transparent border-0 cursor-pointer\`}
        aria-expanded={dropdown === link.label}
        onClick={() => setDropdown(d => (d === link.label ? null : link.label))}
      >
        {link.label}
        <svg className={\`transition-transform duration-200 ${D}group-hover:rotate-180 \${dropdown === link.label ? 'rotate-180' : ''}\`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      <ul className={\`\${dropdown === link.label ? 'block' : 'hidden'} \${dropdownPanel(dropdown === link.label)}\`}>
        {link.children.map(child => (
          <li key={child.label}>
            <a href={child.href} className={dropdownLink} onClick={close}>{child.label}</a>
          </li>
        ))}
      </ul>
    </li>
  ) : (
    <li key={link.label}>
      <a href={link.href} className={linkClass(link)} aria-current={link.active ? 'page' : undefined} onClick={close}>
        {link.label}
      </a>
    </li>
  )
));`
    : `const renderLinks = items => items.map(link => (
  <li key={link.label}>
    <a href={link.href} className={linkClass(link)} aria-current={link.active ? 'page' : undefined} onClick={close}>
      {link.label}
    </a>
  </li>
));`;

  const dropdownConsts = kids ? `

// Mobile: an expandable section inside the menu. Desktop: a panel that floats under the
// link and opens on hover (group-hover) or click.
const dropdownPanel = isOpen => \`list-none m-0 pb-2 ${full ? 'text-center' : 'pl-3'} ${d(`block absolute left-1/2 top-[calc(100%+10px)] min-w-[200px] p-1.5 rounded-[10px] bg-[${st.bg}] border border-black/5 shadow-xl -translate-x-1/2 transition duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']${full ? ' text-left' : ''}`)} \${isOpen ? '${d('visible opacity-100 translate-y-0')}' : '${d('invisible opacity-0 translate-y-1.5')}'}\`;
const dropdownLink = 'block px-3 py-2.5 ${D}py-2 rounded-md text-[${st.fontSize - 1}px] text-[${st.text}] no-underline whitespace-nowrap transition-colors hover:bg-black/5 hover:text-[${st.accent}] ${focus}';` : '';

  return `// Navbar.jsx — Tailwind CSS v3.2+ (uses the min-[${o.bp + 1}px]: breakpoint variant)
import { useEffect, useRef, useState } from 'react';

const links = ${linksJSON(links)};

const linkBase = 'flex w-full items-center gap-1 ${linkFont} font-[${st.fontWeight}] no-underline transition ${d('inline-flex w-auto')} ${focus}';
const navLink = active => \`\${linkBase} py-3 ${D}py-0 ${full ? 'justify-center' : 'justify-between'} ${D}justify-start \${active ? 'text-[${st.accent}]' : 'text-[${st.text}]'} hover:text-[${st.accent}]\`;
const linkClass = link => link.cta
  ? \`\${linkBase} justify-center mt-2 ${D}mt-0 py-3 ${D}py-[${ctaPadV(st)}px] px-[${st.padding}px] bg-[${st.accent}] text-white rounded-[${st.rounded}px] hover:opacity-90\`
  : navLink(link.active);${dropdownConsts}

// Hamburger bars: ${o.icon === 'arrow' ? 'the outer two fold into a ← arrow' : 'the outer two cross into an × and the middle one fades out'}.
const bar = 'block h-0.5 w-6 rounded bg-[${st.text}] transition duration-300${o.icon === 'arrow' ? ' origin-left' : ''}';

export default function Navbar() {
${ind(reactLogic(data), 2)}

${ind(renderLinks, 2)}

  return (
    <nav ref={navRef} aria-label="Main" className=${navExpr}>
      <div className="${container}" style=${padStyle}>
${logoLine}        <button
          type="button"
          className={\`${D}hidden relative z-[2] ml-auto flex flex-col justify-center gap-[5px] w-10 h-10 p-2 bg-transparent border-0 cursor-pointer ${focus}${o.icon === 'spin' ? " transition-transform duration-300 ${open ? 'rotate-180' : ''}" : ''}\`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(o => !o)}
        >
${ind(bars, 10)}
        </button>
        <div id="nav-menu" className={\`${menuMobile} ${menuDesk}\`}>
${ind(lists, 10)}
        </div>
      </div>${o.menu === 'drawer' ? `
      <div
        className={\`${D}hidden fixed inset-0 bg-slate-900/45 transition-[opacity,visibility] duration-300 \${open ? 'visible opacity-100' : 'invisible opacity-0'}\`}
        onClick={close}
      />` : ''}
    </nav>
  );
}`;
}

function genVue(data) {
  const { layout, logo, links, options: o } = data;
  const kids = links.some(hasKids);
  const split = layout === 'split';
  const hide = o.scroll === 'hide';
  const track = tracksScroll(o);
  const linkA = `<a
  ${kids ? 'v-else\n  ' : ''}:href="link.href"
  :class="['nav-link', { active: link.active, cta: link.cta }]"
  :aria-current="link.active ? 'page' : undefined"
  @click="close"
>{{ link.label }}</a>`;
  const li = source => kids
    ? `<li
  v-for="link in ${source}"
  :key="link.label"
  :class="{ 'nav-item has-dropdown': link.children, 'is-open': dropdown === link.label }"
>
  <template v-if="link.children">
    <button
      type="button"
      class="nav-link nav-dropdown-toggle"
      :aria-expanded="dropdown === link.label"
      @click="dropdown = dropdown === link.label ? null : link.label"
    >
      {{ link.label }}
      ${CARET_HTML}
    </button>
    <ul class="nav-dropdown">
      <li v-for="child in link.children" :key="child.label">
        <a :href="child.href" class="nav-dropdown-link" @click="close">{{ child.label }}</a>
      </li>
    </ul>
  </template>
${ind(linkA, 2)}
</li>`
    : `<li v-for="link in ${source}" :key="link.label">
${ind(linkA, 2)}
</li>`;
  const list = source => `<ul class="nav-links">\n${ind(li(source), 2)}\n</ul>`;
  const lists = split ? `${list('leftLinks')}\n${list('rightLinks')}` : list('links');
  const logoLine = showLogo(layout, logo) ? `      <a href="/" class="nav-logo">${logoText(logo)}</a>\n` : '';
  const stateClasses = ["'is-open': open", ...(track ? ["'is-scrolled': scrolled"] : []), ...(hide ? ["'is-hidden': hidden && !open"] : [])];

  const script = [
    `import { ref, onMounted, onUnmounted${locksScroll(o) ? ', watch' : ''} } from 'vue';`,
    '',
    `const links = ${linksJSON(links)};`,
    ...(split ? ['', `const leftLinks = links.slice(0, ${splitAt(links)});`, `const rightLinks = links.slice(${splitAt(links)});`] : []),
    '',
    'const navRef = ref(null);',
    'const open = ref(false);',
    ...(kids ? ['const dropdown = ref(null);'] : []),
    ...(track ? ['const scrolled = ref(false);'] : []),
    ...(hide ? ['const hidden = ref(false);'] : []),
    '',
    'function close() {',
    '  open.value = false;',
    ...(kids ? ['  dropdown.value = null;'] : []),
    '}',
    '',
    "function onKey(e) { if (e.key === 'Escape') close(); }",
    ...(kids ? ['function onClick(e) { if (navRef.value && !navRef.value.contains(e.target)) dropdown.value = null; }'] : []),
  ];
  if (track || hide) {
    script.push(
      ...(hide ? ['let lastY = 0;'] : []),
      'function onScroll() {',
      ...(track ? ['  scrolled.value = window.scrollY > 10;'] : []),
      ...(hide ? ['  const y = window.scrollY;', '  hidden.value = y > lastY && y > 80;', '  lastY = y;'] : []),
      '}',
    );
  }
  if (locksScroll(o)) {
    script.push('', '// No page scroll behind the open menu.', "watch(open, value => { document.body.style.overflow = value ? 'hidden' : ''; });");
  }
  script.push('',
    'onMounted(() => {',
    "  document.addEventListener('keydown', onKey);",
    ...(kids ? ["  document.addEventListener('click', onClick);"] : []),
    ...(track || hide ? ["  window.addEventListener('scroll', onScroll, { passive: true });", '  onScroll();'] : []),
    '});',
    '',
    'onUnmounted(() => {',
    "  document.removeEventListener('keydown', onKey);",
    ...(kids ? ["  document.removeEventListener('click', onClick);"] : []),
    ...(track || hide ? ["  window.removeEventListener('scroll', onScroll);"] : []),
    ...(locksScroll(o) ? ["  document.body.style.overflow = '';"] : []),
    '});',
  );

  return `<template>
  <nav ref="navRef" :class="['navbar', { ${stateClasses.join(', ')} }]" aria-label="Main">
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
${ind(lists, 8)}
      </div>
    </div>${o.menu === 'drawer' ? '\n    <div class="nav-backdrop" @click="close"></div>' : ''}
  </nav>
</template>

<script setup>
${script.join('\n')}
</script>

<style scoped>
${genCSS(data, { reset: false })}
</style>`;
}

function genAngular(data) {
  const { layout, logo, links, options: o } = data;
  const kids = links.some(hasKids);
  const split = layout === 'split';
  const hide = o.scroll === 'hide';
  const track = tracksScroll(o);
  const linkLi = `<li>
  <a
    [href]="link.href"
    class="nav-link"
    [class.active]="link.active"
    [class.cta]="link.cta"
    [attr.aria-current]="link.active ? 'page' : null"
    (click)="close()"
  >{{ link.label }}</a>
</li>`;
  const loop = source => kids
    ? `@for (link of ${source}; track link.label) {
  @if (link.children) {
    <li class="nav-item has-dropdown" [class.is-open]="dropdown() === link.label">
      <button
        type="button"
        class="nav-link nav-dropdown-toggle"
        [attr.aria-expanded]="dropdown() === link.label"
        (click)="toggleDropdown(link.label)"
      >
        {{ link.label }}
        ${CARET_HTML}
      </button>
      <ul class="nav-dropdown">
        @for (child of link.children; track child.label) {
          <li><a [href]="child.href" class="nav-dropdown-link" (click)="close()">{{ child.label }}</a></li>
        }
      </ul>
    </li>
  } @else {
${ind(linkLi, 4)}
  }
}`
    : `@for (link of ${source}; track link.label) {
${ind(linkLi, 2)}
}`;
  const list = source => `<ul class="nav-links">\n${ind(loop(source), 2)}\n</ul>`;
  const lists = split ? `${list('leftLinks')}\n${list('rightLinks')}` : list('links');
  const logoLine = showLogo(layout, logo) ? `    <a href="/" class="nav-logo">${logoText(logo)}</a>\n` : '';
  const navAttrs = ['[class.is-open]="open()"',
    ...(track ? ['[class.is-scrolled]="scrolled()"'] : []),
    ...(hide ? ['[class.is-hidden]="hidden() && !open()"'] : [])].join(' ');

  const template = `<nav class="navbar" ${navAttrs} aria-label="Main">
  <div class="nav-container${containerMod(layout)}">
${logoLine}    <button
      class="nav-toggle"
      type="button"
      [attr.aria-label]="open() ? 'Close menu' : 'Open menu'"
      [attr.aria-expanded]="open()"
      aria-controls="nav-menu"
      (click)="setMenu(!open())"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="nav-menu" id="nav-menu">
${ind(lists, 6)}
    </div>
  </div>${o.menu === 'drawer' ? '\n  <div class="nav-backdrop" (click)="close()"></div>' : ''}
</nav>`;

  // JSON → TypeScript style: bare keys, single-quoted strings (apostrophes escaped).
  const linksTs = linksJSON(links)
    .replace(/"(\w+)":/g, '$1:')
    .replace(/"((?:[^"\\]|\\.)*)"/g, (_, str) => `'${str.replace(/\\"/g, '"').replace(/'/g, "\\'")}'`);
  const members = [
    `readonly links: NavLink[] = ${linksTs};`,
    ...(split ? [`readonly leftLinks = this.links.slice(0, ${splitAt(links)});`, `readonly rightLinks = this.links.slice(${splitAt(links)});`] : []),
    '',
    'readonly open = signal(false);',
    ...(kids ? ['readonly dropdown = signal<string | null>(null);'] : []),
    ...(track ? ['readonly scrolled = signal(false);'] : []),
    ...(hide ? ['readonly hidden = signal(false);'] : []),
    ...(kids ? ['', 'private host = inject(ElementRef);'] : []),
    ...(hide ? ['private lastY = 0;'] : []),
    '',
    'setMenu(open: boolean) {',
    '  this.open.set(open);',
    ...(locksScroll(o) ? ["  document.body.style.overflow = open ? 'hidden' : '';  // no page scroll behind the menu"] : []),
    '}',
    '',
    'close() {',
    '  this.setMenu(false);',
    ...(kids ? ['  this.dropdown.set(null);'] : []),
    '}',
  ];
  if (kids) {
    members.push('',
      'toggleDropdown(label: string) {',
      '  this.dropdown.update(current => (current === label ? null : label));',
      '}',
      '',
      "@HostListener('document:click', ['$event'])",
      'onDocumentClick(event: MouseEvent) {',
      '  if (!this.host.nativeElement.contains(event.target)) this.dropdown.set(null);',
      '}',
    );
  }
  members.push('',
    "@HostListener('document:keydown.escape')",
    'onEscape() {',
    '  this.close();',
    '}',
  );
  if (track || hide) {
    members.push('',
      "@HostListener('window:scroll')",
      'onScroll() {',
      ...(track ? ['  this.scrolled.set(window.scrollY > 10);'] : []),
      ...(hide ? ['  const y = window.scrollY;', '  this.hidden.set(y > this.lastY && y > 80);', '  this.lastY = y;'] : []),
      '}',
    );
  }
  const imports = ['Component', ...(kids ? ['ElementRef'] : []), 'HostListener', ...(kids ? ['inject'] : []), 'signal'];

  return `// navbar.component.ts — Angular 17+ standalone component (signals + @for / @if control flow)
import { ${imports.join(', ')} } from '@angular/core';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  cta?: boolean;
  children?: { label: string; href: string }[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: \`
${ind(template, 4)}
  \`,
  styles: [\`
${ind(genCSS(data, { reset: false }), 4)}
  \`],
})
export class NavbarComponent {
${ind(members.join('\n'), 2)}
}`;
}

function generateCode(tab, data) {
  try {
    switch (tab) {
      case 'HTML':     return genHTML(data);
      case 'React':    return genReact(data);
      case 'Tailwind': return genTailwind(data);
      case 'Vue':      return genVue(data);
      case 'Angular':  return genAngular(data);
      default:         return '';
    }
  } catch (e) {
    return `// Error: ${e.message}`;
  }
}

/* ── Preview page ── */

// A scrollable demo page under the navbar, so sticky / shrink / hide / transparent can be
// felt in the preview. The hero flips dark when the navbar text is light, so a transparent
// bar stays readable over it.
const SCROLL_HINTS = {
  static: 'The navbar scrolls away with the page.',
  sticky: 'Scroll down — the navbar stays pinned to the top.',
  shrink: 'Scroll down — the navbar slims down and gains a shadow.',
  hide: 'Scroll down to hide the navbar, scroll up to bring it back.',
  transparent: 'The navbar sits transparent over this hero, then turns solid as you scroll.',
};
function demoPage(data) {
  const { navStyle: st, options: o } = data;
  const dark = isLight(st.text);
  const html = `<header class="demo-hero">
  <div class="demo-wrap">
    <p class="demo-eyebrow">Live preview</p>
    <h1>Scroll this page</h1>
    <p class="demo-lead">${SCROLL_HINTS[o.scroll]} Resize below ${o.bp}px (or switch to Mobile) for the ${o.menu === 'fullscreen' ? 'full-screen' : o.menu} menu.</p>
  </div>
</header>
<main class="demo-wrap demo-grid">
${Array.from({ length: 9 }, () => '  <section class="demo-card"><div class="demo-line w60"></div><div class="demo-line"></div><div class="demo-line w80"></div><div class="demo-line w40"></div></section>').join('\n')}
</main>`;
  const css = `/* Demo page (not part of the navbar) */
body { margin: 0; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
.demo-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.demo-hero { padding: ${o.scroll === 'transparent' ? 140 : 72}px 0 72px; background: ${dark ? 'linear-gradient(135deg, #0f172a, #312e81)' : 'linear-gradient(135deg, #eef2ff, #fdf2f8)'}; color: ${dark ? '#f8fafc' : '#0f172a'}; }
.demo-hero h1 { margin: 0 0 10px; font-size: clamp(26px, 5vw, 40px); line-height: 1.15; }
.demo-eyebrow { margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; opacity: .7; }
.demo-lead { margin: 0; max-width: 560px; font-size: 15px; line-height: 1.6; opacity: .85; }
.demo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; padding-top: 28px; padding-bottom: 48px; }
.demo-card { height: 150px; padding: 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; }
.demo-line { height: 10px; margin-bottom: 12px; border-radius: 5px; background: #e2e8f0; }
.demo-line.w60 { width: 60%; background: #cbd5e1; } .demo-line.w80 { width: 80%; } .demo-line.w40 { width: 40%; }`;
  return { html, css };
}

function previewDoc(data) {
  const demo = demoPage(data);
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${genCSS(data)}
${demo.css}</style></head><body>
${genMarkup(data)}
${demo.html}
<script>${genJS(data)}<\/script>
<script>document.addEventListener('click', function (e) { if (e.target.closest('a')) e.preventDefault(); });<\/script>
</body></html>`;
}

/* ── Fork & Edit → My Code (same hand-off the demo pages use) ── */
const FORK_PREFIX = 'uis_fork_';
function b64url(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function forkToMyCode(data) {
  const demo = demoPage(data);
  const payload = {
    v: 1,
    name: `Navbar — ${data.logo.text || 'Navbar Builder'}`,
    html: `${genMarkup(data)}\n\n${demo.html}`,
    css: `${genCSS(data)}\n\n${demo.css}`,
    js: genJS(data),
    cdnUrls: [],
  };
  const base = `${window.location.origin}/ui-snippets/mycode/`;
  let url = null;
  try {
    const token = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(FORK_PREFIX + token, JSON.stringify({ t: Date.now(), payload }));
    if (localStorage.getItem(FORK_PREFIX + token)) url = `${base}#fork=ls:${token}`;
  } catch { /* storage unavailable: fall back to the self-contained link */ }
  if (!url) url = `${base}#fork=${b64url(JSON.stringify(payload))}`;
  window.open(url, '_blank', 'noopener');
}

/* ── Sub-components ── */

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

function SliderRow({ label, value, min, max, step = 1, unit = 'px', onChange }) {
  return (
    <div className={s.sliderRow}>
      <span className={s.sliderLabel}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className={s.slider} />
      <span className={s.sliderVal}>{value}{unit}</span>
    </div>
  );
}

// A labelled set of mutually exclusive option buttons, with the chosen option's description.
function OptionGroup({ label, value, options, onChange }) {
  const current = options.find(([v]) => v === value);
  return (
    <div className={s.fieldGroup}>
      <label className={s.fieldLabel}>{label}</label>
      <div className={s.optGroup}>
        {options.map(([v, text]) => (
          <button
            key={v}
            type="button"
            className={`${s.optBtn} ${value === v ? s.optBtnActive : ''}`}
            onClick={() => onChange(v)}
          >
            {text}
          </button>
        ))}
      </div>
      {current?.[2] && <p className={s.optHint}>{current[2]}</p>}
    </div>
  );
}

/* ── Main Component ── */

const withIds = links => links.map(l => ({
  id: uid(), active: false, cta: false, ...l,
  children: (l.children || []).map(c => ({ id: uid(), ...c })),
}));

export default function NavbarBuilderTool() {
  const [layout, setLayout] = useState('default');
  const [logo, setLogo] = useState({ text: 'MyBrand', icon: '', show: true });
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [navStyle, setNavStyle] = useState(DEFAULT_STYLE);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [preset, setPreset] = useState(null);
  const [configTab, setConfigTab] = useState('Presets');
  const [codeTab, setCodeTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [device, setDevice] = useState('desktop');

  const updLogo = (k, v) => setLogo(l => ({ ...l, [k]: v }));
  const updStyle = (k, v) => setNavStyle(st => ({ ...st, [k]: v }));
  const updOpt = (k, v) => setOptions(o => ({ ...o, [k]: v }));

  const applyPreset = p => {
    setPreset(p.id);
    setLayout(p.layout);
    setLogo(p.logo);
    setLinks(withIds(p.links));
    setNavStyle({ ...DEFAULT_STYLE, ...p.style });
    setOptions({ ...DEFAULT_OPTIONS, ...p.options });
  };

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

  // Dropdown items under a link
  const editChildren = (linkId, fn) => setLinks(ls => ls.map(l => (l.id === linkId ? { ...l, children: fn(l.children || []) } : l)));
  const addChild = linkId => editChildren(linkId, cs => [...cs, { id: uid(), label: 'New item', href: '#' }]);
  const updateChild = (linkId, childId, field, val) => editChildren(linkId, cs => cs.map(c => (c.id === childId ? { ...c, [field]: val } : c)));
  const removeChild = (linkId, childId) => editChildren(linkId, cs => cs.filter(c => c.id !== childId));

  const genData = useMemo(() => ({ layout, logo, links, navStyle, options }), [layout, logo, links, navStyle, options]);
  const code = useMemo(() => generateCode(codeTab, genData), [codeTab, genData]);
  const srcDoc = useMemo(() => previewDoc(genData), [genData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };

  const mobile = device === 'mobile';

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

            {/* Presets tab */}
            {configTab === 'Presets' && (
              <div className={s.section}>
                <p className={s.notice}>Start from a ready-made navbar, then tweak anything in the other tabs.</p>
                <div className={s.presetGrid}>
                  {PRESETS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      className={`${s.presetCard} ${preset === p.id ? s.presetCardActive : ''}`}
                      onClick={() => applyPreset(p)}
                    >
                      <span className={s.presetSwatch} style={{ background: p.style.bg, color: p.style.text, borderColor: hexToRgba(p.style.text, 0.15) }}>
                        <span className={s.presetLogo}>{p.logo.icon} {p.logo.text}</span>
                        <span className={s.presetDot} style={{ background: p.style.accent }} />
                      </span>
                      <span className={s.presetName}>{p.name}</span>
                      <span className={s.presetDesc}>{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                        title="Set as active (current page)"
                      />
                      <button
                        className={`${s.ctaTag} ${link.cta ? s.ctaTagOn : ''}`}
                        onClick={() => updateLink(link.id, 'cta', !link.cta)}
                        title="Toggle CTA style"
                      >CTA</button>
                      <button className={s.delBtn} onClick={() => removeLink(link.id)} title="Remove">×</button>
                    </div>
                    {hasKids(link)
                      ? <p className={s.childNote}>Opens a dropdown — the parent is a button, not a link.</p>
                      : <input className={`${s.input} ${s.linkHrefInput}`} value={link.href} onChange={e => updateLink(link.id, 'href', e.target.value)} placeholder="/path" />}
                    {!link.cta && (
                      <div className={s.childList}>
                        {(link.children || []).map(c => (
                          <div key={c.id} className={s.childRow}>
                            <input className={`${s.input} ${s.childInput}`} value={c.label} onChange={e => updateChild(link.id, c.id, 'label', e.target.value)} placeholder="Label" />
                            <input className={`${s.input} ${s.childInput}`} value={c.href} onChange={e => updateChild(link.id, c.id, 'href', e.target.value)} placeholder="/path" />
                            <button className={s.delBtn} onClick={() => removeChild(link.id, c.id)} title="Remove item">×</button>
                          </div>
                        ))}
                        <button className={s.addChildBtn} onClick={() => addChild(link.id)}>+ Dropdown item</button>
                      </div>
                    )}
                  </div>
                ))}
                <button className={s.addLinkBtn} onClick={addLink}>+ Add Link</button>
                {layout === 'split' && links.length > 0 && (
                  <p className={s.notice}>Split layout: first {splitAt(links)} link{splitAt(links) !== 1 ? 's' : ''} go left, rest go right.</p>
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

            {/* Behavior tab */}
            {configTab === 'Behavior' && (
              <div className={s.section}>
                <OptionGroup label="On scroll" value={options.scroll} options={SCROLL_MODES} onChange={v => updOpt('scroll', v)} />
                <div className={s.divider} />
                <OptionGroup label="Mobile menu" value={options.menu} options={MENU_STYLES} onChange={v => updOpt('menu', v)} />
                {options.menu === 'drawer' && (
                  <OptionGroup label="Drawer side" value={options.side} options={[['left', 'Left'], ['right', 'Right']]} onChange={v => updOpt('side', v)} />
                )}
                <OptionGroup label="Menu icon animation" value={options.icon} options={TOGGLE_ICONS} onChange={v => updOpt('icon', v)} />
                <SliderRow label="Breakpoint" value={options.bp} min={480} max={1024} step={8} onChange={v => updOpt('bp', v)} />
                <p className={s.optHint}>The hamburger menu takes over at {options.bp}px wide and below.</p>
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
                Preview · scroll inside it{mobile ? ' · tap the menu icon' : ` · hamburger at ${options.bp}px and below`}
              </span>
              <div className={s.deviceBtns}>
                <button
                  type="button"
                  className={`${s.forkBtn} ${s.forkBtnSm}`}
                  onClick={() => forkToMyCode(genData)}
                  title="Open this navbar (HTML, CSS & JS) in My Code to keep editing it"
                >
                  ⑂ Fork &amp; Edit
                </button>
                {['desktop', 'mobile'].map(dv => (
                  <button
                    key={dv}
                    type="button"
                    className={`${s.deviceBtn} ${device === dv ? s.deviceBtnActive : ''}`}
                    onClick={() => setDevice(dv)}
                  >
                    {dv === 'desktop' ? 'Desktop' : 'Mobile'}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.previewStage}>
              <iframe
                title="Navbar live preview"
                className={`${s.previewFrame} ${mobile ? s.previewFrameMobile : ''}`}
                sandbox="allow-scripts"
                srcDoc={srcDoc}
              />
            </div>
          </div>
          <div className={s.codeTabBar}>
            {CODE_TABS.map(t => (
              <button key={t} className={`${s.codeTab} ${codeTab === t ? s.codeTabActive : ''}`} onClick={() => setCodeTab(t)}>
                {t}
              </button>
            ))}
            <div className={s.codeActions}>
              <button
                className={s.forkBtn}
                onClick={() => forkToMyCode(genData)}
                title="Open this navbar (HTML, CSS & JS) in My Code to keep editing it"
              >
                ⑂ Fork &amp; Edit
              </button>
              <button className={`${s.copyBtn} ${copied ? s.copyOk : ''}`} onClick={handleCopy}>
                {copied ? '✓ Copied' : `⎘ Copy ${codeTab}`}
              </button>
            </div>
          </div>
          <div className={s.codeWrap}>
            <pre className={s.code}>{code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
