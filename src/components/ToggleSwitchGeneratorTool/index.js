'use client';

import { useState, useMemo } from 'react';
import s from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const PRESETS = [
  { name: 'Blue',    trackOff: '#d1d5db', trackOn: '#3b82f6', thumb: '#ffffff', focus: '#3b82f6', shape: 'pill', shadow: true,  border: false },
  { name: 'Green',   trackOff: '#d1d5db', trackOn: '#10b981', thumb: '#ffffff', focus: '#10b981', shape: 'pill', shadow: true,  border: false },
  { name: 'Purple',  trackOff: '#e5e7eb', trackOn: '#8b5cf6', thumb: '#ffffff', focus: '#8b5cf6', shape: 'pill', shadow: true,  border: false },
  { name: 'Amber',   trackOff: '#fde68a', trackOn: '#f59e0b', thumb: '#ffffff', focus: '#f59e0b', shape: 'pill', shadow: true,  border: false },
  { name: 'Minimal', trackOff: '#e5e7eb', trackOn: '#111827', thumb: '#ffffff', focus: '#6b7280', shape: 'pill', shadow: false, border: false },
  { name: 'Outline', trackOff: 'transparent', trackOn: '#3b82f6', thumb: '#3b82f6', focus: '#3b82f6', shape: 'pill', shadow: false, border: true },
  { name: 'Rounded', trackOff: '#d1d5db', trackOn: '#6366f1', thumb: '#ffffff', focus: '#6366f1', shape: 'rounded', shadow: true,  border: false },
  { name: 'Square',  trackOff: '#374151', trackOn: '#22c55e', thumb: '#ffffff', focus: '#22c55e', shape: 'square', shadow: false, border: false },
];

const SIZES = {
  sm: { w: 32, h: 18, t: 14 },
  md: { w: 44, h: 24, t: 20 },
  lg: { w: 56, h: 30, t: 26 },
};

const EASINGS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier(0.34,1.56,0.64,1)'];

/* ── WCAG 1.4.11 Non-text Contrast ── */
function wcagContrast(hex1, hex2) {
  function lum(hex) {
    if (!hex || !hex.startsWith('#') || hex.length < 7) return null;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const lin = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  }
  const L1 = lum(hex1), L2 = lum(hex2);
  if (L1 === null || L2 === null) return null;
  const hi = Math.max(L1, L2), lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

/* ── CSS generator ── */
function buildCSS({ w, h, t, tx, trackOff, trackOn, thumbColor, focusColor, radiusPx, thumbRadiusPx, shadow, borderWidth, borderColor, dur, ease, labelSize, trackIcons, thumbIcon }) {
  const shadowVal = shadow ? '0 1px 3px rgba(0,0,0,0.25),0 1px 2px rgba(0,0,0,0.15)' : 'none';
  const borderVal = borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none';
  const offset = Math.max(0, Math.round((h - 2 * borderWidth - t) / 2));
  const hasThumbIcon = thumbIcon !== 'none';

  let css = `.toggle-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}
.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
}
.toggle-track {
  position: relative;
  display: inline-block;
  width: ${w}px;
  height: ${h}px;
  background: ${trackOff};
  border-radius: ${radiusPx}px;
  border: ${borderVal};
  transition: background ${dur}ms ${ease};
  flex-shrink: 0;
  box-sizing: border-box;
}
.toggle-input:checked + .toggle-track {
  background: ${trackOn};
}
.toggle-thumb {
  position: absolute;
  top: ${offset}px;
  left: ${offset}px;
  width: ${t}px;
  height: ${t}px;
  background: ${thumbColor};
  border-radius: ${thumbRadiusPx}px;
  box-shadow: ${shadowVal};
  transition: transform ${dur}ms ${ease};
  pointer-events: none;${hasThumbIcon ? '\n  display: flex;\n  align-items: center;\n  justify-content: center;' : ''}
}
.toggle-input:checked + .toggle-track .toggle-thumb {
  transform: translateX(${tx}px);
}
.toggle-input:focus-visible + .toggle-track {
  outline: 2px solid ${focusColor};
  outline-offset: 2px;
}
.toggle-input:disabled + .toggle-track {
  opacity: 0.45;
  cursor: not-allowed;
}
.toggle-wrapper:has(.toggle-input:disabled) {
  cursor: not-allowed;
}
.toggle-label {
  font-size: ${labelSize}px;
  font-weight: 500;
  color: inherit;
  line-height: 1.4;
}`;

  if (trackIcons) {
    const iconSz = Math.round(h * 0.42);
    const iconPos = Math.round(h * 0.22);
    css += `
.toggle-track::before {
  content: '✓';
  position: absolute;
  left: ${iconPos}px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${iconSz}px;
  line-height: 1;
  color: #ffffff;
  opacity: 0;
  transition: opacity ${dur}ms ${ease};
  pointer-events: none;
}
.toggle-input:checked + .toggle-track::before { opacity: 1; }
.toggle-track::after {
  content: '✕';
  position: absolute;
  right: ${iconPos}px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${iconSz}px;
  line-height: 1;
  color: rgba(0,0,0,0.35);
  opacity: 1;
  transition: opacity ${dur}ms ${ease};
  pointer-events: none;
}
.toggle-input:checked + .toggle-track::after { opacity: 0; }`;
  }

  if (thumbIcon === 'power') {
    const iconSz = Math.round(t * 0.5);
    css += `
.toggle-thumb::before {
  content: '⏻';
  font-size: ${iconSz}px;
  line-height: 1;
}`;
  } else if (thumbIcon === 'sun-moon') {
    const iconSz = Math.round(t * 0.52);
    css += `
.toggle-thumb::before {
  content: '☀';
  font-size: ${iconSz}px;
  line-height: 1;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: opacity ${dur}ms ${ease};
}
.toggle-input:checked + .toggle-track .toggle-thumb::before { opacity: 0; }
.toggle-thumb::after {
  content: '☽';
  font-size: ${iconSz}px;
  line-height: 1;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity ${dur}ms ${ease};
}
.toggle-input:checked + .toggle-track .toggle-thumb::after { opacity: 1; }`;
  }

  return css;
}

/* ── Code generators ── */
function genHTML(cfg) {
  const { labelText, labelPos } = cfg;
  const css = buildCSS(cfg);
  const inputEl = `  <input
    type="checkbox"
    class="toggle-input"
    role="switch"
    aria-label="${labelText || 'Toggle'}"
  >
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>`;
  const labelEl = `  <span class="toggle-label">${labelText}</span>`;
  let inner = '';
  if (labelPos === 'left')       inner = `\n${labelEl}\n${inputEl}\n`;
  else if (labelPos === 'right') inner = `\n${inputEl}\n${labelEl}\n`;
  else                           inner = `\n${inputEl}\n`;
  return `<label class="toggle-wrapper">${inner}</label>\n\n<style>\n${css}\n</style>`;
}

function genReact(cfg) {
  const { labelText, labelPos } = cfg;
  return `import { useState } from 'react';

const toggleStyles = \`
${buildCSS(cfg)}
\`;

export function Toggle({
  label = '${labelText || 'Toggle'}',
  defaultChecked = false,
  disabled = false,
  onChange,
}) {
  const [checked, setChecked] = useState(defaultChecked);

  function handleChange(e) {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  }

  return (
    <>
      <style>{toggleStyles}</style>
      <label className="toggle-wrapper">
        ${labelPos === 'left' ? '<span className="toggle-label">{label}</span>\n        ' : ''}<input
          type="checkbox"
          className="toggle-input"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
        <span className="toggle-track">
          <span className="toggle-thumb" />
        </span>${labelPos === 'right' ? '\n        <span className="toggle-label">{label}</span>' : ''}
      </label>
    </>
  );
}`;
}

function genVue(cfg) {
  const css = buildCSS(cfg);
  const { labelText, labelPos } = cfg;
  return `<template>
  <label class="toggle-wrapper">
    <span v-if="labelPos === 'left'" class="toggle-label">{{ label }}</span>
    <input
      type="checkbox"
      class="toggle-input"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    >
    <span class="toggle-track">
      <span class="toggle-thumb"></span>
    </span>
    <span v-if="labelPos === 'right'" class="toggle-label">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  label:      { type: String,  default: '${labelText || 'Toggle'}' },
  labelPos:   { type: String,  default: '${labelPos}' },
  disabled:   { type: Boolean, default: false },
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
${css}
</style>`;
}

function genSvelte(cfg) {
  const css = buildCSS(cfg);
  const { labelText, labelPos } = cfg;
  return `<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let label = '${labelText || 'Toggle'}';
  export let labelPos = '${labelPos}';
  export let checked = false;
  export let disabled = false;

  function handleChange(e) {
    checked = e.target.checked;
    dispatch('change', checked);
  }
</script>

<label class="toggle-wrapper">
  {#if labelPos === 'left'}<span class="toggle-label">{label}</span>{/if}
  <input
    type="checkbox"
    class="toggle-input"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    bind:checked
    {disabled}
    on:change={handleChange}
  >
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
  {#if labelPos === 'right'}<span class="toggle-label">{label}</span>{/if}
</label>

<style>
${css}
</style>`;
}

function genTailwind(cfg) {
  const { w, h, t, tx, trackOff, trackOn, thumbColor, focusColor, radiusPx, thumbRadiusPx, shadow, dur, labelText, labelPos, labelSize, trackIcons, thumbIcon } = cfg;
  const radius = radiusPx >= h / 2 ? 'rounded-full' : radiusPx >= 6 ? 'rounded-md' : 'rounded-sm';
  const thumbRadius = thumbRadiusPx >= t / 2 ? 'rounded-full' : 'rounded-sm';
  const shadowCls = shadow ? 'shadow-sm' : '';
  const labelEl = `<span class="text-[${labelSize}px] font-medium leading-snug">${labelText}</span>`;
  const iconNote = (trackIcons || thumbIcon !== 'none')
    ? `<!-- Track/thumb icons require custom CSS — copy the icon rules from the HTML+CSS tab into your stylesheet. -->\n`
    : '';
  return `${iconNote}<!-- Requires Tailwind CSS v3+ -->
<label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
  ${labelPos === 'left' ? labelEl + '\n  ' : ''}<div class="relative">
    <input
      type="checkbox"
      class="sr-only peer"
      role="switch"
      aria-label="${labelText || 'Toggle'}"
    >
    <div
      class="w-[${w}px] h-[${h}px] ${radius} transition-colors duration-[${dur}ms]
             bg-[${trackOff}] peer-checked:bg-[${trackOn}]
             peer-focus-visible:outline peer-focus-visible:outline-2
             peer-focus-visible:outline-[${focusColor}] peer-focus-visible:outline-offset-2
             peer-disabled:opacity-45"
    ></div>
    <div
      class="absolute top-0.5 left-0.5 w-[${t}px] h-[${t}px] ${thumbRadius} ${shadowCls}
             bg-[${thumbColor}] transition-transform duration-[${dur}ms]
             pointer-events-none peer-checked:translate-x-[${tx}px]"
    ></div>
  </div>${labelPos === 'right' ? '\n  ' + labelEl : ''}
</label>`;
}

/* ── Color input ── */
function ColorInput({ label, value, onChange }) {
  return (
    <div className={s.colorRow}>
      <label className={s.colorLabel}>{label}</label>
      <div className={s.colorInputWrap}>
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className={s.colorSwatch} />
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className={s.colorHex} spellCheck={false} />
      </div>
    </div>
  );
}

/* ── Preview toggle ── */
function PreviewToggle({ cfg, checked, onChange, disabled, forceFocus, label, inlineLabel, inlineLabelPos, leftAlign }) {
  const { w, h, t, tx, trackOff, trackOn, thumbColor, focusColor, radiusPx, thumbRadiusPx, shadow, borderWidth, borderColor, dur, ease, labelSize, trackIcons, thumbIcon } = cfg;
  const isOn = checked;
  const trackBg = isOn ? trackOn : trackOff;
  const thumbX = isOn ? tx : 0;
  const borderVal = borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none';
  const thumbOffset = Math.max(0, (h - 2 * borderWidth - t) / 2);
  const iconSz = Math.round(h * 0.42);
  const iconPos = Math.round(h * 0.22);
  const thumbIconSz = Math.round(t * 0.5);

  return (
    <div className={s.stateItem} style={leftAlign ? { alignItems: 'flex-start' } : undefined}>
      <label
        className={s.previewLabel}
        style={{ opacity: disabled ? 0.55 : 1, cursor: disabled ? 'not-allowed' : 'pointer', gap: inlineLabel ? 10 : undefined }}
      >
        {inlineLabel && inlineLabelPos === 'left' && (
          <span style={{ fontSize: labelSize, fontWeight: 500 }}>{inlineLabel}</span>
        )}
        <span
          className={s.previewTrack}
          style={{
            width: w, height: h,
            background: trackBg,
            borderRadius: radiusPx,
            border: borderVal,
            boxSizing: 'border-box',
            transition: `background ${dur}ms ${ease}`,
            boxShadow: forceFocus ? `0 0 0 2px var(--bg), 0 0 0 4px ${focusColor}` : 'none',
          }}
        >
          {trackIcons && (
            <>
              <span style={{
                position: 'absolute', left: iconPos, top: '50%', transform: 'translateY(-50%)',
                fontSize: iconSz, lineHeight: 1, color: '#ffffff',
                opacity: isOn ? 1 : 0, transition: `opacity ${dur}ms ${ease}`,
                pointerEvents: 'none', userSelect: 'none',
              }}>✓</span>
              <span style={{
                position: 'absolute', right: iconPos, top: '50%', transform: 'translateY(-50%)',
                fontSize: iconSz, lineHeight: 1, color: 'rgba(0,0,0,0.35)',
                opacity: isOn ? 0 : 1, transition: `opacity ${dur}ms ${ease}`,
                pointerEvents: 'none', userSelect: 'none',
              }}>✕</span>
            </>
          )}
          <span
            className={s.previewThumb}
            style={{
              top: thumbOffset, left: thumbOffset,
              width: t, height: t,
              background: thumbColor,
              borderRadius: thumbRadiusPx,
              boxShadow: shadow
                ? '0 1px 3px rgba(0,0,0,0.25),0 1px 2px rgba(0,0,0,0.15),0 0 0 1.5px rgba(255,255,255,0.55)'
                : '0 0 0 1.5px rgba(255,255,255,0.55)',
              transform: `translateX(${thumbX}px)`,
              transition: `transform ${dur}ms ${ease}`,
              ...(thumbIcon !== 'none' ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}),
            }}
          >
            {thumbIcon === 'power' && (
              <span style={{ fontSize: thumbIconSz, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>⏻</span>
            )}
            {thumbIcon === 'sun-moon' && (
              <>
                <span style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  fontSize: thumbIconSz, lineHeight: 1,
                  opacity: isOn ? 0 : 1, transition: `opacity ${dur}ms ${ease}`,
                  pointerEvents: 'none', userSelect: 'none',
                }}>☀</span>
                <span style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  fontSize: thumbIconSz, lineHeight: 1,
                  opacity: isOn ? 1 : 0, transition: `opacity ${dur}ms ${ease}`,
                  pointerEvents: 'none', userSelect: 'none',
                }}>☽</span>
              </>
            )}
          </span>
        </span>
        {inlineLabel && inlineLabelPos === 'right' && (
          <span style={{ fontSize: labelSize, fontWeight: 500 }}>{inlineLabel}</span>
        )}
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange ? e => onChange(e.target.checked) : undefined}
          readOnly={!onChange}
          className={s.hiddenInput}
          role="switch"
          aria-label={cfg.labelText || 'Toggle'}
        />
      </label>
      {label && <span className={s.stateLabel}>{label}</span>}
    </div>
  );
}

/* ── Main component ── */
export default function ToggleSwitchGeneratorTool() {
  const [trackOff,        setTrackOff]        = useState('#d1d5db');
  const [trackOn,         setTrackOn]         = useState('#3b82f6');
  const [thumbColor,      setThumbColor]      = useState('#ffffff');
  const [focusColor,      setFocusColor]      = useState('#3b82f6');
  const [size,            setSize]            = useState('md');
  const [shape,           setShape]           = useState('pill');
  const [shadow,          setShadow]          = useState(true);
  const [borderWidth,     setBorderWidth]     = useState(0);
  const [borderColor,     setBorderColor]     = useState('#d1d5db');
  const [dur,             setDur]             = useState(200);
  const [ease,            setEase]            = useState('ease');
  const [labelText,       setLabelText]       = useState('Enable notifications');
  const [labelPos,        setLabelPos]        = useState('right');
  const [labelSize,       setLabelSize]       = useState(14);
  const [trackIcons,      setTrackIcons]      = useState(false);
  const [thumbIcon,       setThumbIcon]       = useState('none');
  const [previewBg,       setPreviewBg]       = useState('dark');
  const [previewBgCustom, setPreviewBgCustom] = useState('#f1f5f9');
  const [liveOn,          setLiveOn]          = useState(false);
  const [codeTab,         setCodeTab]         = useState('html');
  const [copied,          setCopied]          = useState(false);

  const { w, h, t } = SIZES[size];
  const tx = w - t - 4;
  const radiusPx      = shape === 'pill' ? h / 2 : shape === 'rounded' ? 6 : 2;
  const thumbRadiusPx = shape === 'square' ? 2 : t / 2;

  const cfg = { w, h, t, tx, trackOff, trackOn, thumbColor, focusColor, radiusPx, thumbRadiusPx, shadow, borderWidth, borderColor, dur, ease, labelText, labelPos, labelSize, trackIcons, thumbIcon };

  const contrastRatio = wcagContrast(thumbColor, trackOn);
  const previewCanvasBg = previewBg === 'dark' ? 'var(--bg)' : previewBg === 'light' ? '#f1f5f9' : previewBgCustom;

  function applyPreset(p) {
    setTrackOff(p.trackOff);
    setTrackOn(p.trackOn);
    setThumbColor(p.thumb);
    setFocusColor(p.focus);
    setShape(p.shape);
    setShadow(p.shadow);
    setBorderWidth(p.border ? 2 : 0);
    setBorderColor(p.trackOn);
  }

  const code = useMemo(() => {
    switch (codeTab) {
      case 'html':     return genHTML(cfg);
      case 'react':    return genReact(cfg);
      case 'vue':      return genVue(cfg);
      case 'svelte':   return genSvelte(cfg);
      case 'tailwind': return genTailwind(cfg);
      default:         return '';
    }
  }, [codeTab, cfg]);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className={s.wrap}>
      <CssToolsTopNav active="toggle-switch-generator" />
      <PlaygroundTopAd />

      {/* ── Header ── */}
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="7" width="20" height="10" rx="5" stroke="#3b82f6" strokeWidth="1.5"/>
              <circle cx="16" cy="12" r="3" fill="#3b82f6"/>
            </svg>
          </div>
          <span>Toggle Switch <span className={s.accent}>Generator</span></span>
        </div>
        <div className={s.headerRight}>
          <span className={s.hint}>Live preview · 6 states · HTML, React, Vue, Svelte, Tailwind</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={s.body}>

        {/* ── Left panel ── */}
        <div className={s.left}>
          <div className={s.leftScroll}>

            {/* Presets */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Presets</div>
              <div className={s.presetGrid}>
                {PRESETS.map(p => (
                  <button key={p.name} className={s.presetBtn} onClick={() => applyPreset(p)}>
                    <span className={s.presetDot} style={{ background: p.trackOn }} />
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Size</div>
              <div className={s.segmented}>
                {['sm', 'md', 'lg'].map(v => (
                  <button key={v} className={`${s.seg} ${size === v ? s.segActive : ''}`} onClick={() => setSize(v)}>
                    {v === 'sm' ? 'Small' : v === 'md' ? 'Medium' : 'Large'}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Track Shape</div>
              <div className={s.segmented}>
                {['pill', 'rounded', 'square'].map(v => (
                  <button key={v} className={`${s.seg} ${shape === v ? s.segActive : ''}`} onClick={() => setShape(v)}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Colors</div>
              <ColorInput label="Track — Off" value={trackOff}   onChange={setTrackOff} />
              <ColorInput label="Track — On"  value={trackOn}    onChange={setTrackOn} />
              <ColorInput label="Thumb"       value={thumbColor} onChange={setThumbColor} />
              <ColorInput label="Focus ring"  value={focusColor} onChange={setFocusColor} />
            </div>

            {/* Style */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Style</div>
              <label className={s.checkRow}>
                <input type="checkbox" checked={shadow} onChange={e => setShadow(e.target.checked)} className={s.check} />
                Thumb shadow
              </label>
              <div className={s.row}>
                <label className={s.rowLabel}>Border</label>
                <input type="range" min="0" max="3" value={borderWidth} onChange={e => setBorderWidth(Number(e.target.value))} className={s.range} />
                <span className={s.rowVal}>{borderWidth}px</span>
              </div>
              {borderWidth > 0 && (
                <ColorInput label="Border color" value={borderColor} onChange={setBorderColor} />
              )}
            </div>

            {/* Icons */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Icons</div>
              <label className={s.checkRow}>
                <input type="checkbox" checked={trackIcons} onChange={e => setTrackIcons(e.target.checked)} className={s.check} />
                Track icons (✓ / ✕)
              </label>
              <div className={s.row}>
                <label className={s.rowLabel}>Thumb icon</label>
                <div className={s.segmented} style={{ flex: 1 }}>
                  {[['none', 'None'], ['power', '⏻'], ['sun-moon', '☀/🌙']].map(([v, lbl]) => (
                    <button key={v} className={`${s.seg} ${thumbIcon === v ? s.segActive : ''}`} onClick={() => setThumbIcon(v)}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transition */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Transition</div>
              <div className={s.row}>
                <label className={s.rowLabel}>Duration</label>
                <input type="range" min="50" max="600" step="10" value={dur} onChange={e => setDur(Number(e.target.value))} className={s.range} />
                <span className={s.rowVal}>{dur}ms</span>
              </div>
              <div className={s.row}>
                <label className={s.rowLabel}>Easing</label>
                <select value={ease} onChange={e => setEase(e.target.value)} className={s.select}>
                  {EASINGS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>

            {/* Label */}
            <div className={s.section}>
              <div className={s.sectionTitle}>Label</div>
              <div className={s.row}>
                <label className={s.rowLabel}>Text</label>
                <input type="text" value={labelText} onChange={e => setLabelText(e.target.value)} className={s.textInput} />
              </div>
              <div className={s.row}>
                <label className={s.rowLabel}>Position</label>
                <div className={s.segmented} style={{ flex: 1 }}>
                  {['left', 'right', 'none'].map(v => (
                    <button key={v} className={`${s.seg} ${labelPos === v ? s.segActive : ''}`} onClick={() => setLabelPos(v)}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className={s.row}>
                <label className={s.rowLabel}>Font size</label>
                <input type="range" min="10" max="20" value={labelSize} onChange={e => setLabelSize(Number(e.target.value))} className={s.range} />
                <span className={s.rowVal}>{labelSize}px</span>
              </div>
            </div>

            {/* Accessibility note */}
            <div className={s.a11yNote}>
              <span className={s.a11yIcon}>♿</span>
              <div>
                <strong>Accessible by default</strong>
                <p>Generated code uses <code>role="switch"</code>, <code>aria-checked</code>, <code>aria-label</code>, visible focus ring, and keyboard operability (Space to toggle, Tab to navigate).</p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Right panel ── */}
        <div className={s.right}>

          {/* Preview */}
          <div className={s.preview}>
            <div className={s.previewHeader}>
              <span className={s.previewTitle}>Preview</span>
              <span className={s.previewHint}>Click the interactive toggle to try it</span>
              <div className={s.bgSwitcher}>
                <button title="Dark background" className={`${s.bgBtn} ${previewBg === 'dark' ? s.bgBtnActive : ''}`} onClick={() => setPreviewBg('dark')}>◼</button>
                <button title="Light background" className={`${s.bgBtn} ${previewBg === 'light' ? s.bgBtnActive : ''}`} onClick={() => setPreviewBg('light')}>◻</button>
                <input type="color" title="Custom background" className={s.bgCustom} value={previewBgCustom} onChange={e => { setPreviewBgCustom(e.target.value); setPreviewBg('custom'); }} />
              </div>
              {contrastRatio && (
                <span className={`${s.contrastBadge} ${contrastRatio >= 3 ? s.contrastPass : s.contrastFail}`}>
                  {contrastRatio.toFixed(1)}:1 {contrastRatio >= 3 ? 'AA ✓' : 'Fail ✗'}
                </span>
              )}
            </div>

            <div className={s.previewCanvas} style={{ background: previewCanvasBg }}>
              <div className={s.statesGrid}>
                <div className={s.stateBlock}>
                  <span className={s.stateName}>Interactive</span>
                  <PreviewToggle cfg={cfg} checked={liveOn} onChange={setLiveOn} label={liveOn ? 'On' : 'Off'} />
                </div>
                <div className={s.stateBlock}>
                  <span className={s.stateName}>Default off</span>
                  <PreviewToggle cfg={cfg} checked={false} label="Off" />
                </div>
                <div className={s.stateBlock}>
                  <span className={s.stateName}>Default on</span>
                  <PreviewToggle cfg={cfg} checked={true} label="On" />
                </div>
                <div className={s.stateBlock}>
                  <span className={s.stateName}>Focused</span>
                  <PreviewToggle cfg={cfg} checked={false} forceFocus label="Focus" />
                </div>
                <div className={s.stateBlock}>
                  <span className={s.stateName}>Disabled off</span>
                  <PreviewToggle cfg={cfg} checked={false} disabled label="Disabled" />
                </div>
                <div className={s.stateBlock}>
                  <span className={s.stateName}>Disabled on</span>
                  <PreviewToggle cfg={cfg} checked={true} disabled label="Disabled" />
                </div>
              </div>

              {labelPos !== 'none' && (
                <div className={s.labelPreview}>
                  <span className={s.stateName}>With label</span>
                  <PreviewToggle
                    cfg={cfg}
                    checked={liveOn}
                    onChange={setLiveOn}
                    label=""
                    inlineLabel={labelText}
                    inlineLabelPos={labelPos}
                    leftAlign
                  />
                </div>
              )}
            </div>
          </div>

          {/* Code panel */}
          <div className={s.codePanel}>
            <div className={s.codeTabs}>
              {['html', 'react', 'vue', 'svelte', 'tailwind'].map(tab => (
                <button key={tab} className={`${s.codeTab} ${codeTab === tab ? s.codeTabActive : ''}`} onClick={() => setCodeTab(tab)}>
                  {tab === 'html' ? 'HTML + CSS' : tab === 'react' ? 'React' : tab === 'vue' ? 'Vue 3' : tab === 'svelte' ? 'Svelte' : 'Tailwind'}
                </button>
              ))}
              <button className={`${s.copyBtn} ${copied ? s.copyOk : ''}`} onClick={handleCopy}>
                {copied ? '✓ Copied' : '⎘ Copy'}
              </button>
            </div>
            <div className={s.codeScroll}>
              <pre className={s.code}>{code}</pre>
            </div>
          </div>

        </div>{/* right */}

      </div>{/* body */}
    </div>
  );
}
