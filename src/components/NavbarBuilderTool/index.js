'use client';
import { useState, useMemo } from 'react';
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

/* ── Code Generators ── */

function genHTML({ layout, logo, links, navStyle: st }) {
  const renderLink = l =>
    `      <li><a href="${l.href}" class="nav-link${l.active ? ' active' : ''}${l.cta ? ' cta' : ''}">${l.label}</a></li>`;

  let htmlBlock;
  if (layout === 'split') {
    const mid = Math.ceil(links.length / 2);
    const left = links.slice(0, mid).map(renderLink).join('\n');
    const right = links.slice(mid).map(renderLink).join('\n');
    const logoLine = logo.show ? `    <a href="#" class="nav-logo">${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}</a>` : '    <span></span>';
    htmlBlock = `<nav class="navbar">
  <div class="nav-container nav-split">
    <ul class="nav-links">
${left}
    </ul>
${logoLine}
    <ul class="nav-links">
${right}
    </ul>
  </div>
</nav>`;
  } else {
    const logoLine = logo.show && layout !== 'minimal'
      ? `    <a href="#" class="nav-logo">${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}</a>\n` : '';
    htmlBlock = `<nav class="navbar">
  <div class="nav-container${layout === 'centered' ? ' nav-centered' : layout === 'minimal' ? ' nav-minimal' : ''}">
${logoLine}    <ul class="nav-links">
${links.map(renderLink).join('\n')}
    </ul>
  </div>
</nav>`;
  }

  const borderVal = st.border ? `  border-bottom: 1px solid ${hexToRgba(st.text, 0.1)};` : '';
  const shadowVal = st.shadow ? `  box-shadow: 0 1px 8px ${hexToRgba(st.text, 0.08)};` : '';
  const logoCSS = logo.show ? `
.nav-logo {
  font-size: ${st.fontSize + 4}px;
  font-weight: 700;
  color: ${st.text};
  text-decoration: none;
  flex-shrink: 0;
}` : '';
  const splitCSS = layout === 'split' ? `
.nav-split {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
.nav-split .nav-links:first-child { justify-content: flex-end; }
.nav-split .nav-links:last-child  { justify-content: flex-start; }` : '';

  const css = `<style>
* { box-sizing: border-box; }

.navbar {
  background: ${st.bg};
${shadowVal}${borderVal}
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
.nav-link:hover { color: ${st.accent}; }
.nav-link.active { color: ${st.accent}; }

.nav-link.cta {
  background: ${st.accent};
  color: #fff;
  padding: ${ctaPadV(st)}px ${st.padding}px;
  border-radius: ${st.rounded}px;
  transition: opacity 0.15s;
}
.nav-link.cta:hover { opacity: 0.88; }
</style>`;

  return `${htmlBlock}\n\n${css}`;
}

function genReact({ layout, logo, links, navStyle: st }) {
  const containerExtras = layout === 'split'
    ? `\n    display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px',`
    : layout === 'centered'
    ? `\n    justifyContent: 'center', gap: '40px',`
    : layout === 'minimal'
    ? `\n    justifyContent: 'center',`
    : `\n    justifyContent: 'space-between',`;

  const navShadow = st.shadow ? `, boxShadow: '0 1px 8px ${hexToRgba(st.text, 0.08)}'` : '';
  const navBorder = st.border ? `, borderBottom: '1px solid ${hexToRgba(st.text, 0.1)}'` : '';

  const renderLink = l => {
    const extraStyle = l.active
      ? `, color: '${st.accent}'`
      : l.cta
      ? `, background: '${st.accent}', color: '#fff', padding: '${ctaPadV(st)}px ${st.padding}px', borderRadius: '${st.rounded}px'`
      : '';
    return `        <li key="${l.label}"><a href="${l.href}" style={{ fontSize: '${st.fontSize}px', fontWeight: ${st.fontWeight}, color: '${st.text}', textDecoration: 'none'${extraStyle} }}>${l.label}</a></li>`;
  };

  let body;
  if (layout === 'split') {
    const mid = Math.ceil(links.length / 2);
    const left = links.slice(0, mid).map(renderLink).join('\n');
    const right = links.slice(mid).map(renderLink).join('\n');
    const logoEl = logo.show
      ? `<a href="#" style={{ fontSize: '${st.fontSize + 4}px', fontWeight: 700, color: '${st.text}', textDecoration: 'none' }}>${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}</a>`
      : '<span />';
    body = `      <ul style={linkStyle}>${left}\n      </ul>
      ${logoEl}
      <ul style={{ ...linkStyle, justifyContent: 'flex-start' }}>
${right}
      </ul>`;
  } else {
    const logoEl = logo.show && layout !== 'minimal'
      ? `<a href="#" style={{ fontSize: '${st.fontSize + 4}px', fontWeight: 700, color: '${st.text}', textDecoration: 'none' }}>${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}</a>\n      ` : '';
    body = `      ${logoEl}<ul style={linkStyle}>
${links.map(renderLink).join('\n')}
      </ul>`;
  }

  return `const linkStyle = {
  display: 'flex', alignItems: 'center',
  gap: '${st.gap}px', listStyle: 'none', margin: 0, padding: 0,
};

export default function Navbar() {
  return (
    <nav style={{ background: '${st.bg}'${navShadow}${navBorder} }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '${st.padding}px 24px',
        display: 'flex', alignItems: 'center',${containerExtras}
      }}>
${body}
      </div>
    </nav>
  );
}`;
}

function genTailwind({ layout, logo, links, navStyle: st }) {
  const navClasses = [
    `bg-[${st.bg}]`,
    st.shadow ? 'shadow-sm' : '',
    st.border ? 'border-b border-black/10' : '',
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'max-w-6xl mx-auto px-6 flex items-center',
    layout === 'centered' ? 'justify-center gap-10' : layout === 'minimal' ? 'justify-center' : 'justify-between',
  ].filter(Boolean).join(' ');

  const gapClass = `gap-[${st.gap}px]`;

  const renderLink = l => {
    let cls = `text-[${st.fontSize}px] font-[${st.fontWeight}] no-underline transition-opacity`;
    if (l.cta) {
      cls += ` bg-[${st.accent}] text-white px-[${st.padding}px] py-[${ctaPadV(st)}px] rounded-[${st.rounded}px] hover:opacity-90`;
    } else {
      cls += ` text-[${l.active ? st.accent : st.text}] hover:text-[${st.accent}]`;
    }
    return `        <li><a href="${l.href}" className="${cls}">${l.label}</a></li>`;
  };

  let body;
  if (layout === 'split') {
    const mid = Math.ceil(links.length / 2);
    const left = links.slice(0, mid).map(renderLink).join('\n');
    const right = links.slice(mid).map(renderLink).join('\n');
    const logoEl = logo.show
      ? `<a href="#" className="text-[${st.fontSize + 4}px] font-bold text-[${st.text}] no-underline">${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}</a>`
      : '<span />';
    body = `      <ul className="flex items-center ${gapClass} list-none m-0 p-0 justify-end">
${left}
      </ul>
      ${logoEl}
      <ul className="flex items-center ${gapClass} list-none m-0 p-0 justify-start">
${right}
      </ul>`;
  } else {
    const logoEl = logo.show && layout !== 'minimal'
      ? `<a href="#" className="text-[${st.fontSize + 4}px] font-bold text-[${st.text}] no-underline shrink-0">${logo.icon ? logo.icon + ' ' : ''}${logo.text || 'Logo'}</a>\n      ` : '';
    body = `      ${logoEl}<ul className="flex items-center ${gapClass} list-none m-0 p-0">
${links.map(renderLink).join('\n')}
      </ul>`;
  }

  const containerStyle = layout === 'split'
    ? `\n        style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px' }}` : '';

  return `export default function Navbar() {
  return (
    <nav className="${navClasses}">
      <div
        className="${containerClasses}"
        style={{ padding: '${st.padding}px 24px' }}${containerStyle}
      >
${body}
      </div>
    </nav>
  );
}`;
}

function genVue({ layout, logo, links, navStyle: st }) {
  const containerClass = layout === 'centered' ? 'nav-centered' : layout === 'minimal' ? 'nav-minimal' : layout === 'split' ? 'nav-split' : '';
  const logoLine = logo.show && layout !== 'minimal'
    ? `      <a href="#" class="nav-logo">${logo.icon ? logo.icon + ' ' : ''}{{ logo.text }}</a>` : '';

  const borderVal = st.border ? `  border-bottom: 1px solid ${hexToRgba(st.text, 0.1)};` : '';
  const shadowVal = st.shadow ? `  box-shadow: 0 1px 8px ${hexToRgba(st.text, 0.08)};` : '';

  const linksData = JSON.stringify(links.map(l => ({ label: l.label, href: l.href, active: l.active, cta: l.cta })), null, 4).replace(/^/gm, '  ');

  let template;
  if (layout === 'split') {
    template = `<template>
  <nav class="navbar">
    <div class="nav-container nav-split">
      <ul class="nav-links">
        <li v-for="link in leftLinks" :key="link.label">
          <a :href="link.href" :class="['nav-link', { active: link.active, cta: link.cta }]">{{ link.label }}</a>
        </li>
      </ul>
      <a href="#" class="nav-logo">{{ logo.text }}</a>
      <ul class="nav-links">
        <li v-for="link in rightLinks" :key="link.label">
          <a :href="link.href" :class="['nav-link', { active: link.active, cta: link.cta }]">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>`;
  } else {
    template = `<template>
  <nav class="navbar">
    <div class="nav-container${containerClass ? ' ' + containerClass : ''}">
${logoLine ? logoLine + '\n' : ''}      <ul class="nav-links">
        <li v-for="link in links" :key="link.label">
          <a :href="link.href" :class="['nav-link', { active: link.active, cta: link.cta }]">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>`;
  }

  const mid = Math.ceil(links.length / 2);
  const scriptSplit = layout === 'split' ? `
const leftLinks = links.slice(0, ${mid});
const rightLinks = links.slice(${mid});` : '';

  const splitCSS = layout === 'split' ? `
.nav-split {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}
.nav-split .nav-links:first-child { justify-content: flex-end; }
.nav-split .nav-links:last-child  { justify-content: flex-start; }` : '';

  return `${template}

<script setup>
const logo = { text: '${logo.text || 'Logo'}' };

const links = ${linksData};
${scriptSplit}
</script>

<style scoped>
.navbar {
  background: ${st.bg};
${shadowVal}${borderVal}
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
${splitCSS}
.nav-logo {
  font-size: ${st.fontSize + 4}px;
  font-weight: 700;
  color: ${st.text};
  text-decoration: none;
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
}
.nav-link.cta:hover { opacity: 0.88; }
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

function NavbarPreview({ layout, logo, links, navStyle: st }) {
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
      <PlaygroundTopAd />

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
                      <input className={s.input} value={logo.icon} onChange={e => updLogo('icon', e.target.value)} placeholder="🚀" />
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
          <div className={s.previewWrap}>
            <div className={s.previewInner}>
              <NavbarPreview layout={layout} logo={logo} links={links} navStyle={navStyle} />
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
