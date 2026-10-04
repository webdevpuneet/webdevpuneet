'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
// ── Color palette for flex items ─────────────────────────────────────────────
// Text colours are the dark (700) shade of each hue so the number and grow/shrink
// label stay readable on the light canvas; the old 400-shade lime (#d4f064) was
// nearly invisible on white.
const PALETTE = [
  { bg: 'rgba(59,130,246,0.14)',  border: 'rgba(59,130,246,0.55)',  text: '#1d4ed8' },
  { bg: 'rgba(132,204,22,0.16)',  border: 'rgba(101,163,13,0.6)',   text: '#3f6212' },
  { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.5)',    text: '#b91c1c' },
  { bg: 'rgba(16,185,129,0.13)',  border: 'rgba(16,185,129,0.55)',  text: '#047857' },
  { bg: 'rgba(249,115,22,0.13)',  border: 'rgba(249,115,22,0.55)',  text: '#c2410c' },
  { bg: 'rgba(139,92,246,0.13)',  border: 'rgba(139,92,246,0.55)',  text: '#6d28d9' },
  { bg: 'rgba(236,72,153,0.12)',  border: 'rgba(236,72,153,0.5)',   text: '#be185d' },
];

// ── Default state ────────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  direction: 'row',
  wrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'normal',
  gap: 8,
  padding: 16,
  height: 160,
  items: [
    { grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 },
    { grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 },
    { grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 },
  ],
  selected: null,
  activeTab: 'css',
};

// ── Code generation functions ────────────────────────────────────────────────

function buildCSS(s) {
  const lines = [];
  lines.push(`<span class="c-comment">/* Container */</span>`);
  lines.push(`<span class="c-kw">.container</span> {`);
  lines.push(`  <span class="c-prop">display</span>: <span class="c-val">flex</span>;`);
  if (s.direction !== 'row')          lines.push(`  <span class="c-prop">flex-direction</span>: <span class="c-val">${s.direction}</span>;`);
  if (s.wrap !== 'nowrap')            lines.push(`  <span class="c-prop">flex-wrap</span>: <span class="c-val">${s.wrap}</span>;`);
  if (s.justifyContent !== 'flex-start') lines.push(`  <span class="c-prop">justify-content</span>: <span class="c-val">${s.justifyContent}</span>;`);
  if (s.alignItems !== 'stretch')     lines.push(`  <span class="c-prop">align-items</span>: <span class="c-val">${s.alignItems}</span>;`);
  if (s.alignContent !== 'normal')    lines.push(`  <span class="c-prop">align-content</span>: <span class="c-val">${s.alignContent}</span>;`);
  if (s.gap > 0)     lines.push(`  <span class="c-prop">gap</span>: <span class="c-val">${s.gap}px</span>;`);
  if (s.padding > 0) lines.push(`  <span class="c-prop">padding</span>: <span class="c-val">${s.padding}px</span>;`);
  if (s.height > 0)  lines.push(`  <span class="c-prop">min-height</span>: <span class="c-val">${s.height}px</span>;`);
  lines.push(`}`);

  const customItems = s.items.map((item, i) => {
    const parts = [];
    if (item.grow !== 0 || item.shrink !== 1 || item.basis !== 'auto')
      parts.push(`  <span class="c-prop">flex</span>: <span class="c-val">${item.grow} ${item.shrink} ${item.basis}</span>;`);
    if (item.alignSelf !== 'auto') parts.push(`  <span class="c-prop">align-self</span>: <span class="c-val">${item.alignSelf}</span>;`);
    if (item.order !== 0)          parts.push(`  <span class="c-prop">order</span>: <span class="c-val">${item.order}</span>;`);
    return parts.length ? { idx: i, lines: parts } : null;
  }).filter(Boolean);

  if (customItems.length) {
    lines.push('');
    lines.push(`<span class="c-comment">/* Items */</span>`);
    customItems.forEach(({ idx, lines: ilines }) => {
      lines.push(`<span class="c-kw">.item-${idx + 1}</span> {`);
      ilines.forEach((l) => lines.push(l));
      lines.push(`}`);
    });
  }
  return lines.join('\n');
}

function buildSCSS(s) {
  const lines = [];
  lines.push(`<span class="c-comment">// Container</span>`);
  lines.push(`<span class="c-kw">.container</span> {`);
  lines.push(`  <span class="c-prop">display</span>: <span class="c-val">flex</span>;`);
  if (s.direction !== 'row')          lines.push(`  <span class="c-prop">flex-direction</span>: <span class="c-val">${s.direction}</span>;`);
  if (s.wrap !== 'nowrap')            lines.push(`  <span class="c-prop">flex-wrap</span>: <span class="c-val">${s.wrap}</span>;`);
  if (s.justifyContent !== 'flex-start') lines.push(`  <span class="c-prop">justify-content</span>: <span class="c-val">${s.justifyContent}</span>;`);
  if (s.alignItems !== 'stretch')     lines.push(`  <span class="c-prop">align-items</span>: <span class="c-val">${s.alignItems}</span>;`);
  if (s.alignContent !== 'normal')    lines.push(`  <span class="c-prop">align-content</span>: <span class="c-val">${s.alignContent}</span>;`);
  if (s.gap > 0)     lines.push(`  <span class="c-prop">gap</span>: <span class="c-val">${s.gap}px</span>;`);
  if (s.padding > 0) lines.push(`  <span class="c-prop">padding</span>: <span class="c-val">${s.padding}px</span>;`);
  if (s.height > 0)  lines.push(`  <span class="c-prop">min-height</span>: <span class="c-val">${s.height}px</span>;`);

  const customItems = s.items.map((item, i) => {
    const parts = [];
    if (item.grow !== 0 || item.shrink !== 1 || item.basis !== 'auto')
      parts.push(`    <span class="c-prop">flex</span>: <span class="c-val">${item.grow} ${item.shrink} ${item.basis}</span>;`);
    if (item.alignSelf !== 'auto') parts.push(`    <span class="c-prop">align-self</span>: <span class="c-val">${item.alignSelf}</span>;`);
    if (item.order !== 0)          parts.push(`    <span class="c-prop">order</span>: <span class="c-val">${item.order}</span>;`);
    return parts.length ? { idx: i, lines: parts } : null;
  }).filter(Boolean);

  if (customItems.length) {
    lines.push('');
    lines.push(`  <span class="c-comment">// Items</span>`);
    customItems.forEach(({ idx, lines: ilines }) => {
      lines.push(`  <span class="c-kw">&amp; &gt; .item-${idx + 1}</span> {`);
      ilines.forEach((l) => lines.push(l));
      lines.push(`  }`);
    });
  }
  lines.push(`}`);
  return lines.join('\n');
}

function buildHTML(s) {
  let html = `<span class="c-comment">&lt;!-- Container --&gt;</span>\n`;
  html += `<span class="c-kw">&lt;div</span> <span class="c-prop">class</span>="<span class="c-val">container</span>"&gt;\n`;
  s.items.forEach((item, i) => {
    const iStyle = [];
    if (item.grow !== 0)          iStyle.push(`flex-grow: ${item.grow}`);
    if (item.shrink !== 1)        iStyle.push(`flex-shrink: ${item.shrink}`);
    if (item.basis !== 'auto')    iStyle.push(`flex-basis: ${item.basis}`);
    if (item.alignSelf !== 'auto') iStyle.push(`align-self: ${item.alignSelf}`);
    if (item.order !== 0)         iStyle.push(`order: ${item.order}`);
    if (iStyle.length) {
      html += `  <span class="c-kw">&lt;div</span> <span class="c-prop">style</span>="<span class="c-val">${iStyle.join('; ')}</span>"&gt;Item ${i + 1}<span class="c-kw">&lt;/div&gt;</span>\n`;
    } else {
      html += `  <span class="c-kw">&lt;div&gt;</span>Item ${i + 1}<span class="c-kw">&lt;/div&gt;</span>\n`;
    }
  });
  html += `<span class="c-kw">&lt;/div&gt;</span>`;
  return html;
}

function buildTailwind(s) {
  function twSize(px, prefix) {
    const map = { 0: '0', 1: 'px', 2: '0.5', 4: '1', 6: '1.5', 8: '2', 10: '2.5', 12: '3', 14: '3.5', 16: '4', 20: '5', 24: '6', 28: '7', 32: '8', 36: '9', 40: '10', 44: '11', 48: '12' };
    return map[px] !== undefined ? `${prefix}-${map[px]}` : `${prefix}-[${px}px]`;
  }
  const dirMap = { 'row-reverse': 'flex-row-reverse', column: 'flex-col', 'column-reverse': 'flex-col-reverse' };
  const wrapMap = { wrap: 'flex-wrap', 'wrap-reverse': 'flex-wrap-reverse' };
  const jcMap = { 'flex-end': 'justify-end', center: 'justify-center', 'space-between': 'justify-between', 'space-around': 'justify-around', 'space-evenly': 'justify-evenly' };
  const aiMap = { 'flex-start': 'items-start', 'flex-end': 'items-end', center: 'items-center', baseline: 'items-baseline' };
  const acMap = { 'flex-start': 'content-start', 'flex-end': 'content-end', center: 'content-center', 'space-between': 'content-between', 'space-around': 'content-around' };
  const asMap = { 'flex-start': 'self-start', 'flex-end': 'self-end', center: 'self-center', stretch: 'self-stretch', baseline: 'self-baseline' };

  const cc = ['flex'];
  if (dirMap[s.direction]) cc.push(dirMap[s.direction]);
  if (wrapMap[s.wrap]) cc.push(wrapMap[s.wrap]);
  if (jcMap[s.justifyContent]) cc.push(jcMap[s.justifyContent]);
  if (aiMap[s.alignItems]) cc.push(aiMap[s.alignItems]);
  if (acMap[s.alignContent]) cc.push(acMap[s.alignContent]);
  if (s.gap > 0) cc.push(twSize(s.gap, 'gap'));
  if (s.padding > 0) cc.push(twSize(s.padding, 'p'));
  if (s.height > 0) cc.push(`min-h-[${s.height}px]`);

  let html = `<span class="c-comment">&lt;!-- Container --&gt;</span>\n`;
  html += `<span class="c-kw">&lt;div</span> <span class="c-prop">class</span>="<span class="c-val">${cc.join(' ')}</span>"&gt;\n`;
  s.items.forEach((item, i) => {
    const ic = [];
    if (item.grow === 1) ic.push('grow');
    else if (item.grow > 1) ic.push(`grow-[${item.grow}]`);
    if (item.shrink === 0) ic.push('shrink-0');
    if (item.basis !== 'auto') ic.push(`basis-[${item.basis}]`);
    if (asMap[item.alignSelf]) ic.push(asMap[item.alignSelf]);
    if (item.order !== 0) ic.push(item.order >= 1 && item.order <= 12 ? `order-${item.order}` : `order-[${item.order}]`);
    if (ic.length) {
      html += `  <span class="c-kw">&lt;div</span> <span class="c-prop">class</span>="<span class="c-val">${ic.join(' ')}</span>"&gt;Item ${i + 1}<span class="c-kw">&lt;/div&gt;</span>\n`;
    } else {
      html += `  <span class="c-kw">&lt;div&gt;</span>Item ${i + 1}<span class="c-kw">&lt;/div&gt;</span>\n`;
    }
  });
  html += `<span class="c-kw">&lt;/div&gt;</span>`;
  return html;
}

function buildReact(s) {
  function jsVal(v) { return typeof v === 'number' ? v : `'${v}'`; }
  function pxVal(n) { return `'${n}px'`; }
  const indent = '  ';

  const cProps = [];
  cProps.push(`<span class="c-prop">display</span>: <span class="c-val">'flex'</span>`);
  if (s.direction !== 'row')          cProps.push(`<span class="c-prop">flexDirection</span>: <span class="c-val">'${s.direction}'</span>`);
  if (s.wrap !== 'nowrap')            cProps.push(`<span class="c-prop">flexWrap</span>: <span class="c-val">'${s.wrap}'</span>`);
  if (s.justifyContent !== 'flex-start') cProps.push(`<span class="c-prop">justifyContent</span>: <span class="c-val">'${s.justifyContent}'</span>`);
  if (s.alignItems !== 'stretch')     cProps.push(`<span class="c-prop">alignItems</span>: <span class="c-val">'${s.alignItems}'</span>`);
  if (s.alignContent !== 'normal')    cProps.push(`<span class="c-prop">alignContent</span>: <span class="c-val">'${s.alignContent}'</span>`);
  if (s.gap > 0)     cProps.push(`<span class="c-prop">gap</span>: <span class="c-val">${pxVal(s.gap)}</span>`);
  if (s.padding > 0) cProps.push(`<span class="c-prop">padding</span>: <span class="c-val">${pxVal(s.padding)}</span>`);
  if (s.height > 0)  cProps.push(`<span class="c-prop">minHeight</span>: <span class="c-val">${pxVal(s.height)}</span>`);

  const styleStr = cProps.length === 1
    ? `{{ ${cProps[0]} }}`
    : `{{\n${indent}  ${cProps.join(`,\n${indent}  `)}\n${indent}}}`;

  let out = `<span class="c-comment">{'/* Container */'}</span>\n`;
  out += `<span class="c-kw">&lt;div</span> <span class="c-prop">style</span>=${styleStr}<span class="c-kw">&gt;</span>\n`;
  s.items.forEach((item, i) => {
    const iProps = [];
    if (item.grow !== 0)           iProps.push(`<span class="c-prop">flexGrow</span>: <span class="c-val">${jsVal(item.grow)}</span>`);
    if (item.shrink !== 1)         iProps.push(`<span class="c-prop">flexShrink</span>: <span class="c-val">${jsVal(item.shrink)}</span>`);
    if (item.basis !== 'auto')     iProps.push(`<span class="c-prop">flexBasis</span>: <span class="c-val">'${item.basis}'</span>`);
    if (item.alignSelf !== 'auto') iProps.push(`<span class="c-prop">alignSelf</span>: <span class="c-val">'${item.alignSelf}'</span>`);
    if (item.order !== 0)          iProps.push(`<span class="c-prop">order</span>: <span class="c-val">${jsVal(item.order)}</span>`);
    if (iProps.length) {
      const iStyle = iProps.length === 1
        ? `{{ ${iProps[0]} }}`
        : `{{\n${indent}    ${iProps.join(`,\n${indent}    `)}\n${indent}  }}`;
      out += `${indent}<span class="c-kw">&lt;div</span> <span class="c-prop">style</span>=${iStyle}<span class="c-kw">&gt;</span>Item ${i + 1}<span class="c-kw">&lt;/div&gt;</span>\n`;
    } else {
      out += `${indent}<span class="c-kw">&lt;div&gt;</span>Item ${i + 1}<span class="c-kw">&lt;/div&gt;</span>\n`;
    }
  });
  out += `<span class="c-kw">&lt;/div&gt;</span>`;
  return out;
}

// ── Chip group component ─────────────────────────────────────────────────────
function ChipGroup({ options, value, onChange }) {
  return (
    <div className={styles.chips}>
      {options.map((opt) => (
        <button
          key={opt}
          className={`${styles.chip} ${value === opt ? styles.chipActive : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function FlexboxBuilderTool() {
  const [s, setS] = useState(DEFAULT_STATE);
  const [codePanelHeight, setCodePanelHeight] = useState(null);
  const [copyDone, setCopyDone] = useState(false);

  const codePanelRef = useRef(null);
  const isResizingRef = useRef(false);
  const startYRef = useRef(0);
  const startHRef = useRef(0);

  // Updater helpers
  const updateContainer = useCallback((key, val) => {
    setS((prev) => ({ ...prev, [key]: val }));
  }, []);

  const updateItem = useCallback((key, val) => {
    setS((prev) => {
      if (prev.selected === null) return prev;
      const items = prev.items.map((item, i) =>
        i === prev.selected ? { ...item, [key]: val } : item
      );
      return { ...prev, items };
    });
  }, []);

  const selectItem = useCallback((i) => {
    setS((prev) => ({ ...prev, selected: prev.selected === i ? null : i }));
  }, []);

  // Resize handle events
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizingRef.current) return;
      const dy = startYRef.current - e.clientY;
      const newH = Math.max(80, Math.min(window.innerHeight * 0.85, startHRef.current + dy));
      setCodePanelHeight(newH);
    };
    const handleMouseUp = () => {
      if (!isResizingRef.current) return;
      isResizingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const onResizeMouseDown = (e) => {
    isResizingRef.current = true;
    startYRef.current = e.clientY;
    startHRef.current = codePanelRef.current?.offsetHeight || 300;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  // Code output
  const codeHtml = useMemo(() => {
    if (s.activeTab === 'css') return buildCSS(s);
    if (s.activeTab === 'scss') return buildSCSS(s);
    if (s.activeTab === 'tailwind') return buildTailwind(s);
    if (s.activeTab === 'react') return buildReact(s);
    return buildHTML(s);
  }, [s]);

  const handleCopy = () => {
    const el = document.getElementById('fb-code-output');
    const text = el?.innerText || el?.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    });
  };

  const handleReset = () => {
    setS({ ...DEFAULT_STATE, items: DEFAULT_STATE.items.map((item) => ({ ...item })) });
    setCodePanelHeight(null);
  };

  const selectedItem = s.selected !== null ? s.items[s.selected] : null;
  const selectedColor = s.selected !== null ? PALETTE[s.selected % PALETTE.length] : null;

  return (
    <div className={styles.outerWrap}>
      <CssToolsTopNav active="flexbox-builder" />
      <PlaygroundTopAd />
      <div className={styles.app}>
      {/* ── Control Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <rect x="1" y="4" width="4" height="8" rx="1" fill="#0e0e0f" />
              <rect x="6" y="2" width="4" height="12" rx="1" fill="#0e0e0f" />
              <rect x="11" y="5" width="4" height="6" rx="1" fill="#0e0e0f" />
            </svg>
          </div>
          <div>
            <div className={styles.brandText}>Flexbox Builder</div>
            <div className={styles.brandSub}>Visual layout editor</div>
          </div>
        </div>

        <div className={styles.sidebarScroll}>
          {/* Container properties */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Container</div>

            <Prop name="flex-direction" value={s.direction}>
              <ChipGroup options={['row', 'row-reverse', 'column', 'column-reverse']} value={s.direction} onChange={(v) => updateContainer('direction', v)} />
            </Prop>

            <Prop name="flex-wrap" value={s.wrap}>
              <ChipGroup options={['nowrap', 'wrap', 'wrap-reverse']} value={s.wrap} onChange={(v) => updateContainer('wrap', v)} />
            </Prop>

            <Prop name="justify-content" value={s.justifyContent}>
              <ChipGroup options={['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']} value={s.justifyContent} onChange={(v) => updateContainer('justifyContent', v)} />
            </Prop>

            <Prop name="align-items" value={s.alignItems}>
              <ChipGroup options={['stretch', 'flex-start', 'flex-end', 'center', 'baseline']} value={s.alignItems} onChange={(v) => updateContainer('alignItems', v)} />
            </Prop>

            <Prop name="align-content" value={s.alignContent}>
              <ChipGroup options={['normal', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around']} value={s.alignContent} onChange={(v) => updateContainer('alignContent', v)} />
            </Prop>

            <Prop name="gap" value={`${s.gap}px`}>
              <div className={styles.sliderWrap}>
                <input type="range" min="0" max="64" value={s.gap} step="1"
                  onChange={(e) => updateContainer('gap', parseInt(e.target.value))} />
              </div>
            </Prop>

            <Prop name="padding" value={`${s.padding}px`}>
              <div className={styles.sliderWrap}>
                <input type="range" min="0" max="64" value={s.padding} step="4"
                  onChange={(e) => updateContainer('padding', parseInt(e.target.value))} />
              </div>
            </Prop>

            <Prop name="min-height" value={`${s.height}px`}>
              <div className={styles.sliderWrap}>
                <input type="range" min="80" max="420" value={s.height} step="8"
                  onChange={(e) => updateContainer('height', parseInt(e.target.value))} />
              </div>
            </Prop>
          </div>

          {/* Selected item properties */}
          {selectedItem && (
            <div className={styles.itemPanel}>
              <div className={styles.itemPanelHead}>
                <span className={styles.itemPanelTitle}>Selected item</span>
                <span
                  className={styles.itemBadge}
                  style={{ background: selectedColor.bg, color: selectedColor.text, border: `1px solid ${selectedColor.border}` }}
                >
                  #{s.selected + 1}
                </span>
              </div>

              <Prop name="flex-grow" value={String(selectedItem.grow)}>
                <div className={styles.sliderWrap}>
                  <input type="range" min="0" max="6" value={selectedItem.grow} step="1"
                    onChange={(e) => updateItem('grow', parseInt(e.target.value))} />
                </div>
              </Prop>

              <Prop name="flex-shrink" value={String(selectedItem.shrink)}>
                <div className={styles.sliderWrap}>
                  <input type="range" min="0" max="6" value={selectedItem.shrink} step="1"
                    onChange={(e) => updateItem('shrink', parseInt(e.target.value))} />
                </div>
              </Prop>

              <Prop name="flex-basis" value={selectedItem.basis}>
                <ChipGroup options={['auto', '0', '60px', '100px', '150px', '200px']} value={selectedItem.basis} onChange={(v) => updateItem('basis', v)} />
              </Prop>

              <Prop name="align-self" value={selectedItem.alignSelf}>
                <ChipGroup options={['auto', 'flex-start', 'flex-end', 'center', 'stretch']} value={selectedItem.alignSelf} onChange={(v) => updateItem('alignSelf', v)} />
              </Prop>

              <Prop name="order" value={String(selectedItem.order)}>
                <div className={styles.sliderWrap}>
                  <input type="range" min="-4" max="8" value={selectedItem.order} step="1"
                    onChange={(e) => updateItem('order', parseInt(e.target.value))} />
                </div>
              </Prop>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Area ── */}
      <main className={styles.main}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.toolbarLabel}>Items</span>
            <button
              className={styles.toolBtn}
              title="Remove item"
              onClick={() => {
                if (s.items.length <= 1) return;
                setS((prev) => {
                  const newSelected = prev.selected !== null && prev.selected >= prev.items.length - 1 ? null : prev.selected;
                  return { ...prev, items: prev.items.slice(0, -1), selected: newSelected };
                });
              }}
            >−</button>
            <button
              className={styles.toolBtn}
              title="Add item"
              onClick={() => setS((prev) => ({
                ...prev,
                items: [...prev.items, { grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 }],
              }))}
            >+</button>
          </div>
          <div className={styles.toolbarRight}>
            <button className={styles.resetBtn} onClick={handleReset}>↺ Reset</button>
          </div>
        </div>

        {/* Canvas */}
        <div className={styles.canvasWrap}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '780px' }}>
            <div className={styles.containerLabel}>.container</div>
            <div
              className={styles.flexContainer}
              style={{
                flexDirection: s.direction,
                flexWrap: s.wrap,
                justifyContent: s.justifyContent,
                alignItems: s.alignItems,
                alignContent: s.alignContent,
                gap: `${s.gap}px`,
                padding: `${s.padding}px`,
                minHeight: `${s.height}px`,
              }}
            >
              {s.items.map((item, i) => {
                const c = PALETTE[i % PALETTE.length];
                return (
                  <div
                    key={i}
                    className={`${styles.flexItem} ${s.selected === i ? styles.flexItemSelected : ''}`}
                    style={{
                      background: c.bg,
                      borderColor: c.border,
                      color: c.text,
                      flexGrow: item.grow,
                      flexShrink: item.shrink,
                      flexBasis: item.basis,
                      alignSelf: item.alignSelf,
                      order: item.order,
                    }}
                    onClick={() => selectItem(i)}
                  >
                    <span className={styles.itemNum}>{i + 1}</span>
                    <span className={styles.itemSub}>grow·{item.grow} shrink·{item.shrink}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div className={styles.resizeHandle} onMouseDown={onResizeMouseDown} />

        {/* Code Panel */}
        <div
          ref={codePanelRef}
          className={styles.codePanel}
          style={codePanelHeight ? { height: `${codePanelHeight}px` } : {}}
        >
          <div className={styles.codeHeader}>
            <div className={styles.codeTabs}>
              {['css', 'scss', 'html', 'tailwind', 'react'].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.codeTab} ${s.activeTab === tab ? styles.codeTabActive : ''}`}
                  onClick={() => setS((prev) => ({ ...prev, activeTab: tab }))}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <button className={`${styles.copyBtn} ${copyDone ? styles.copyBtnDone : ''}`} onClick={handleCopy}>
              {copyDone ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="1,6 4.5,9.5 11,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor"/><path d="M3.5 8.5H2a.5.5 0 0 1-.5-.5V2A.5.5 0 0 1 2 1.5h6a.5.5 0 0 1 .5.5v1.5" stroke="currentColor"/></svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div className={styles.codeBody}>
            <pre id="fb-code-output" dangerouslySetInnerHTML={{ __html: codeHtml }} />
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}

// ── Prop row helper ──────────────────────────────────────────────────────────
function Prop({ name, value, children }) {
  return (
    <div className={styles.prop}>
      <div className={styles.propHead}>
        <span className={styles.propName}>{name}</span>
        <span className={styles.propVal}>{value}</span>
      </div>
      {children}
    </div>
  );
}
