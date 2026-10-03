'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

/* ════════════════════════════════════════════════════════════════
   Tailwind → CSS conversion engine
════════════════════════════════════════════════════════════════ */

// Spacing scale: TW token → rem value
const TW_SPACE = {
  '0': '0px', 'px': '1px',
  '0.5': '0.125rem', '1': '0.25rem', '1.5': '0.375rem',
  '2': '0.5rem', '2.5': '0.625rem', '3': '0.75rem', '3.5': '0.875rem',
  '4': '1rem', '5': '1.25rem', '6': '1.5rem', '7': '1.75rem',
  '8': '2rem', '9': '2.25rem', '10': '2.5rem', '11': '2.75rem',
  '12': '3rem', '14': '3.5rem', '16': '4rem', '20': '5rem',
  '24': '6rem', '28': '7rem', '32': '8rem', '36': '9rem',
  '40': '10rem', '44': '11rem', '48': '12rem', '52': '13rem',
  '56': '14rem', '60': '15rem', '64': '16rem', '72': '18rem',
  '80': '20rem', '96': '24rem',
  'auto': 'auto', 'full': '100%', 'screen': '100vw',
  'min': 'min-content', 'max': 'max-content', 'fit': 'fit-content',
  'svh': '100svh', 'lvh': '100lvh', 'dvh': '100dvh',
};

// Fraction sizes
const TW_FRAC = {
  '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%',
  '1/4': '25%', '3/4': '75%', '1/5': '20%', '2/5': '40%',
  '3/5': '60%', '4/5': '80%', '1/6': '16.666667%', '5/6': '83.333333%',
  '1/12': '8.333333%', '5/12': '41.666667%', '7/12': '58.333333%', '11/12': '91.666667%',
};

function sp(token) {
  if (TW_SPACE[token] !== undefined) return TW_SPACE[token];
  if (TW_FRAC[token] !== undefined) return TW_FRAC[token];
  return null;
}

// Arbitrary value: strip [ ] and unescape underscores
function arb(token) {
  if (token.startsWith('[') && token.endsWith(']')) {
    return token.slice(1, -1).replace(/_/g, ' ');
  }
  return null;
}

function spOrArb(token) {
  return sp(token) ?? arb(token);
}

// Tailwind color palette → CSS hex
const TW_COLORS = {
  'inherit': 'inherit', 'current': 'currentColor', 'transparent': 'transparent',
  'black': '#000000', 'white': '#ffffff',
  'slate-50': '#f8fafc', 'slate-100': '#f1f5f9', 'slate-200': '#e2e8f0',
  'slate-300': '#cbd5e1', 'slate-400': '#94a3b8', 'slate-500': '#64748b',
  'slate-600': '#475569', 'slate-700': '#334155', 'slate-800': '#1e293b',
  'slate-900': '#0f172a', 'slate-950': '#020617',
  'gray-50': '#f9fafb', 'gray-100': '#f3f4f6', 'gray-200': '#e5e7eb',
  'gray-300': '#d1d5db', 'gray-400': '#9ca3af', 'gray-500': '#6b7280',
  'gray-600': '#4b5563', 'gray-700': '#374151', 'gray-800': '#1f2937',
  'gray-900': '#111827', 'gray-950': '#030712',
  'zinc-50': '#fafafa', 'zinc-100': '#f4f4f5', 'zinc-200': '#e4e4e7',
  'zinc-300': '#d4d4d8', 'zinc-400': '#a1a1aa', 'zinc-500': '#71717a',
  'zinc-600': '#52525b', 'zinc-700': '#3f3f46', 'zinc-800': '#27272a',
  'zinc-900': '#18181b', 'zinc-950': '#09090b',
  'neutral-50': '#fafafa', 'neutral-100': '#f5f5f5', 'neutral-200': '#e5e5e5',
  'neutral-300': '#d4d4d4', 'neutral-400': '#a3a3a3', 'neutral-500': '#737373',
  'neutral-600': '#525252', 'neutral-700': '#404040', 'neutral-800': '#262626',
  'neutral-900': '#171717', 'neutral-950': '#0a0a0a',
  'stone-50': '#fafaf9', 'stone-100': '#f5f5f4', 'stone-200': '#e7e5e4',
  'stone-300': '#d6d3d1', 'stone-400': '#a8a29e', 'stone-500': '#78716c',
  'stone-600': '#57534e', 'stone-700': '#44403c', 'stone-800': '#292524',
  'stone-900': '#1c1917', 'stone-950': '#0c0a09',
  'red-50': '#fef2f2', 'red-100': '#fee2e2', 'red-200': '#fecaca',
  'red-300': '#fca5a5', 'red-400': '#f87171', 'red-500': '#ef4444',
  'red-600': '#dc2626', 'red-700': '#b91c1c', 'red-800': '#991b1b',
  'red-900': '#7f1d1d', 'red-950': '#450a0a',
  'orange-50': '#fff7ed', 'orange-100': '#ffedd5', 'orange-200': '#fed7aa',
  'orange-300': '#fdba74', 'orange-400': '#fb923c', 'orange-500': '#f97316',
  'orange-600': '#ea580c', 'orange-700': '#c2410c', 'orange-800': '#9a3412',
  'orange-900': '#7c2d12', 'orange-950': '#431407',
  'amber-50': '#fffbeb', 'amber-100': '#fef3c7', 'amber-200': '#fde68a',
  'amber-300': '#fcd34d', 'amber-400': '#fbbf24', 'amber-500': '#f59e0b',
  'amber-600': '#d97706', 'amber-700': '#b45309', 'amber-800': '#92400e',
  'amber-900': '#78350f', 'amber-950': '#451a03',
  'yellow-50': '#fefce8', 'yellow-100': '#fef9c3', 'yellow-200': '#fef08a',
  'yellow-300': '#fde047', 'yellow-400': '#facc15', 'yellow-500': '#eab308',
  'yellow-600': '#ca8a04', 'yellow-700': '#a16207', 'yellow-800': '#854d0e',
  'yellow-900': '#713f12', 'yellow-950': '#422006',
  'lime-50': '#f7fee7', 'lime-100': '#ecfccb', 'lime-200': '#d9f99d',
  'lime-300': '#bef264', 'lime-400': '#a3e635', 'lime-500': '#84cc16',
  'lime-600': '#65a30d', 'lime-700': '#4d7c0f', 'lime-800': '#3f6212',
  'lime-900': '#365314', 'lime-950': '#1a2e05',
  'green-50': '#f0fdf4', 'green-100': '#dcfce7', 'green-200': '#bbf7d0',
  'green-300': '#86efac', 'green-400': '#4ade80', 'green-500': '#22c55e',
  'green-600': '#16a34a', 'green-700': '#15803d', 'green-800': '#166534',
  'green-900': '#14532d', 'green-950': '#052e16',
  'emerald-50': '#ecfdf5', 'emerald-100': '#d1fae5', 'emerald-200': '#a7f3d0',
  'emerald-300': '#6ee7b7', 'emerald-400': '#34d399', 'emerald-500': '#10b981',
  'emerald-600': '#059669', 'emerald-700': '#047857', 'emerald-800': '#065f46',
  'emerald-900': '#064e3b', 'emerald-950': '#022c22',
  'teal-50': '#f0fdfa', 'teal-100': '#ccfbf1', 'teal-200': '#99f6e4',
  'teal-300': '#5eead4', 'teal-400': '#2dd4bf', 'teal-500': '#14b8a6',
  'teal-600': '#0d9488', 'teal-700': '#0f766e', 'teal-800': '#115e59',
  'teal-900': '#134e4a', 'teal-950': '#042f2e',
  'cyan-50': '#ecfeff', 'cyan-100': '#cffafe', 'cyan-200': '#a5f3fc',
  'cyan-300': '#67e8f9', 'cyan-400': '#22d3ee', 'cyan-500': '#06b6d4',
  'cyan-600': '#0891b2', 'cyan-700': '#0e7490', 'cyan-800': '#155e75',
  'cyan-900': '#164e63', 'cyan-950': '#083344',
  'sky-50': '#f0f9ff', 'sky-100': '#e0f2fe', 'sky-200': '#bae6fd',
  'sky-300': '#7dd3fc', 'sky-400': '#38bdf8', 'sky-500': '#0ea5e9',
  'sky-600': '#0284c7', 'sky-700': '#0369a1', 'sky-800': '#075985',
  'sky-900': '#0c4a6e', 'sky-950': '#082f49',
  'blue-50': '#eff6ff', 'blue-100': '#dbeafe', 'blue-200': '#bfdbfe',
  'blue-300': '#93c5fd', 'blue-400': '#60a5fa', 'blue-500': '#3b82f6',
  'blue-600': '#2563eb', 'blue-700': '#1d4ed8', 'blue-800': '#1e40af',
  'blue-900': '#1e3a8a', 'blue-950': '#172554',
  'indigo-50': '#eef2ff', 'indigo-100': '#e0e7ff', 'indigo-200': '#c7d2fe',
  'indigo-300': '#a5b4fc', 'indigo-400': '#818cf8', 'indigo-500': '#6366f1',
  'indigo-600': '#4f46e5', 'indigo-700': '#4338ca', 'indigo-800': '#3730a3',
  'indigo-900': '#312e81', 'indigo-950': '#1e1b4b',
  'violet-50': '#f5f3ff', 'violet-100': '#ede9fe', 'violet-200': '#ddd6fe',
  'violet-300': '#c4b5fd', 'violet-400': '#a78bfa', 'violet-500': '#8b5cf6',
  'violet-600': '#7c3aed', 'violet-700': '#6d28d9', 'violet-800': '#5b21b6',
  'violet-900': '#4c1d95', 'violet-950': '#2e1065',
  'purple-50': '#faf5ff', 'purple-100': '#f3e8ff', 'purple-200': '#e9d5ff',
  'purple-300': '#d8b4fe', 'purple-400': '#c084fc', 'purple-500': '#a855f7',
  'purple-600': '#9333ea', 'purple-700': '#7e22ce', 'purple-800': '#6b21a8',
  'purple-900': '#581c87', 'purple-950': '#3b0764',
  'fuchsia-50': '#fdf4ff', 'fuchsia-100': '#fae8ff', 'fuchsia-200': '#f5d0fe',
  'fuchsia-300': '#f0abfc', 'fuchsia-400': '#e879f9', 'fuchsia-500': '#d946ef',
  'fuchsia-600': '#c026d3', 'fuchsia-700': '#a21caf', 'fuchsia-800': '#86198f',
  'fuchsia-900': '#701a75', 'fuchsia-950': '#4a044e',
  'pink-50': '#fdf2f8', 'pink-100': '#fce7f3', 'pink-200': '#fbcfe8',
  'pink-300': '#f9a8d4', 'pink-400': '#f472b6', 'pink-500': '#ec4899',
  'pink-600': '#db2777', 'pink-700': '#be185d', 'pink-800': '#9d174d',
  'pink-900': '#831843', 'pink-950': '#500724',
  'rose-50': '#fff1f2', 'rose-100': '#ffe4e6', 'rose-200': '#fecdd3',
  'rose-300': '#fda4af', 'rose-400': '#fb7185', 'rose-500': '#f43f5e',
  'rose-600': '#e11d48', 'rose-700': '#be123c', 'rose-800': '#9f1239',
  'rose-900': '#881337', 'rose-950': '#4c0519',
};

function twColor(token) {
  if (TW_COLORS[token] !== undefined) return TW_COLORS[token];
  return arb(token);
}

// Font size scale
const TW_TEXT_SIZE = {
  'xs': '0.75rem', 'sm': '0.875rem', 'base': '1rem',
  'lg': '1.125rem', 'xl': '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem',
  '4xl': '2.25rem', '5xl': '3rem', '6xl': '3.75rem', '7xl': '4.5rem',
  '8xl': '6rem', '9xl': '8rem',
};

// Line height scale
const TW_LEADING = {
  'none': '1', 'tight': '1.25', 'snug': '1.375', 'normal': '1.5',
  'relaxed': '1.625', 'loose': '2',
  '3': '.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem',
  '7': '1.75rem', '8': '2rem', '9': '2.25rem', '10': '2.5rem',
};

// Letter spacing scale
const TW_TRACKING = {
  'tighter': '-0.05em', 'tight': '-0.025em', 'normal': '0em',
  'wide': '0.025em', 'wider': '0.05em', 'widest': '0.1em',
};

// Font weight
const TW_FONT_WEIGHT = {
  'thin': '100', 'extralight': '200', 'light': '300', 'normal': '400',
  'medium': '500', 'semibold': '600', 'bold': '700', 'extrabold': '800', 'black': '900',
};

// Border radius
const TW_ROUNDED = {
  '': '0.25rem', 'none': '0px', 'sm': '0.125rem', 'md': '0.375rem',
  'lg': '0.5rem', 'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px',
};

// Opacity scale
const TW_OPACITY = {
  '0': '0', '5': '0.05', '10': '0.1', '15': '0.15', '20': '0.2', '25': '0.25',
  '30': '0.3', '35': '0.35', '40': '0.4', '45': '0.45', '50': '0.5',
  '55': '0.55', '60': '0.6', '65': '0.65', '70': '0.7', '75': '0.75',
  '80': '0.8', '85': '0.85', '90': '0.9', '95': '0.95', '100': '1',
};

// Z-index
const TW_Z = {
  '0': '0', '10': '10', '20': '20', '30': '30', '40': '40', '50': '50', 'auto': 'auto',
};

// Breakpoints
const TW_BREAKPOINTS = {
  'sm': '640px', 'md': '768px', 'lg': '1024px', 'xl': '1280px', '2xl': '1536px',
};

/* ── Static class map ──────────────────────────────────────── */
const STATIC = {
  // Display
  'block': 'display: block',
  'inline-block': 'display: inline-block',
  'inline': 'display: inline',
  'flex': 'display: flex',
  'inline-flex': 'display: inline-flex',
  'grid': 'display: grid',
  'inline-grid': 'display: inline-grid',
  'table': 'display: table',
  'table-row': 'display: table-row',
  'table-cell': 'display: table-cell',
  'contents': 'display: contents',
  'hidden': 'display: none',
  'list-item': 'display: list-item',
  // Position
  'static': 'position: static',
  'fixed': 'position: fixed',
  'absolute': 'position: absolute',
  'relative': 'position: relative',
  'sticky': 'position: sticky',
  // Overflow
  'overflow-auto': 'overflow: auto',
  'overflow-hidden': 'overflow: hidden',
  'overflow-visible': 'overflow: visible',
  'overflow-scroll': 'overflow: scroll',
  'overflow-x-auto': 'overflow-x: auto',
  'overflow-x-hidden': 'overflow-x: hidden',
  'overflow-x-scroll': 'overflow-x: scroll',
  'overflow-y-auto': 'overflow-y: auto',
  'overflow-y-hidden': 'overflow-y: hidden',
  'overflow-y-scroll': 'overflow-y: scroll',
  // Flexbox
  'flex-row': 'flex-direction: row',
  'flex-row-reverse': 'flex-direction: row-reverse',
  'flex-col': 'flex-direction: column',
  'flex-col-reverse': 'flex-direction: column-reverse',
  'flex-wrap': 'flex-wrap: wrap',
  'flex-nowrap': 'flex-wrap: nowrap',
  'flex-wrap-reverse': 'flex-wrap: wrap-reverse',
  'flex-1': 'flex: 1 1 0%',
  'flex-auto': 'flex: 1 1 auto',
  'flex-initial': 'flex: 0 1 auto',
  'flex-none': 'flex: none',
  'flex-grow': 'flex-grow: 1',
  'grow': 'flex-grow: 1',
  'grow-0': 'flex-grow: 0',
  'flex-grow-0': 'flex-grow: 0',
  'flex-shrink': 'flex-shrink: 1',
  'shrink': 'flex-shrink: 1',
  'shrink-0': 'flex-shrink: 0',
  'flex-shrink-0': 'flex-shrink: 0',
  // Justify
  'justify-start': 'justify-content: flex-start',
  'justify-end': 'justify-content: flex-end',
  'justify-center': 'justify-content: center',
  'justify-between': 'justify-content: space-between',
  'justify-around': 'justify-content: space-around',
  'justify-evenly': 'justify-content: space-evenly',
  'justify-stretch': 'justify-content: stretch',
  'justify-normal': 'justify-content: normal',
  // Align items
  'items-start': 'align-items: flex-start',
  'items-end': 'align-items: flex-end',
  'items-center': 'align-items: center',
  'items-baseline': 'align-items: baseline',
  'items-stretch': 'align-items: stretch',
  // Align self
  'self-auto': 'align-self: auto',
  'self-start': 'align-self: flex-start',
  'self-end': 'align-self: flex-end',
  'self-center': 'align-self: center',
  'self-stretch': 'align-self: stretch',
  'self-baseline': 'align-self: baseline',
  // Align content
  'content-start': 'align-content: flex-start',
  'content-end': 'align-content: flex-end',
  'content-center': 'align-content: center',
  'content-between': 'align-content: space-between',
  'content-around': 'align-content: space-around',
  'content-evenly': 'align-content: space-evenly',
  'content-stretch': 'align-content: stretch',
  // Place
  'place-content-center': 'place-content: center',
  'place-items-center': 'place-items: center',
  'place-self-center': 'place-self: center',
  // Text align
  'text-left': 'text-align: left',
  'text-right': 'text-align: right',
  'text-center': 'text-align: center',
  'text-justify': 'text-align: justify',
  'text-start': 'text-align: start',
  'text-end': 'text-align: end',
  // Font style
  'italic': 'font-style: italic',
  'not-italic': 'font-style: normal',
  // Font family
  'font-sans': "font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  'font-serif': "font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  'font-mono': "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  // Text decoration
  'underline': 'text-decoration-line: underline',
  'overline': 'text-decoration-line: overline',
  'line-through': 'text-decoration-line: line-through',
  'no-underline': 'text-decoration-line: none',
  // Text transform
  'uppercase': 'text-transform: uppercase',
  'lowercase': 'text-transform: lowercase',
  'capitalize': 'text-transform: capitalize',
  'normal-case': 'text-transform: none',
  // Text overflow
  'truncate': 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap',
  'text-ellipsis': 'text-overflow: ellipsis',
  'text-clip': 'text-overflow: clip',
  // White space
  'whitespace-normal': 'white-space: normal',
  'whitespace-nowrap': 'white-space: nowrap',
  'whitespace-pre': 'white-space: pre',
  'whitespace-pre-line': 'white-space: pre-line',
  'whitespace-pre-wrap': 'white-space: pre-wrap',
  'whitespace-break-spaces': 'white-space: break-spaces',
  // Word break
  'break-normal': 'overflow-wrap: normal; word-break: normal',
  'break-words': 'overflow-wrap: break-word',
  'break-all': 'word-break: break-all',
  'break-keep': 'word-break: keep-all',
  // Visibility
  'visible': 'visibility: visible',
  'invisible': 'visibility: hidden',
  'collapse': 'visibility: collapse',
  // Cursor
  'cursor-auto': 'cursor: auto',
  'cursor-default': 'cursor: default',
  'cursor-pointer': 'cursor: pointer',
  'cursor-wait': 'cursor: wait',
  'cursor-text': 'cursor: text',
  'cursor-move': 'cursor: move',
  'cursor-not-allowed': 'cursor: not-allowed',
  'cursor-crosshair': 'cursor: crosshair',
  'cursor-grab': 'cursor: grab',
  'cursor-grabbing': 'cursor: grabbing',
  'cursor-help': 'cursor: help',
  'cursor-none': 'cursor: none',
  'cursor-col-resize': 'cursor: col-resize',
  'cursor-row-resize': 'cursor: row-resize',
  'cursor-zoom-in': 'cursor: zoom-in',
  'cursor-zoom-out': 'cursor: zoom-out',
  // Pointer events
  'pointer-events-none': 'pointer-events: none',
  'pointer-events-auto': 'pointer-events: auto',
  // User select
  'select-none': 'user-select: none',
  'select-text': 'user-select: text',
  'select-all': 'user-select: all',
  'select-auto': 'user-select: auto',
  // Resize
  'resize-none': 'resize: none',
  'resize-x': 'resize: horizontal',
  'resize-y': 'resize: vertical',
  'resize': 'resize: both',
  // Object fit
  'object-contain': 'object-fit: contain',
  'object-cover': 'object-fit: cover',
  'object-fill': 'object-fit: fill',
  'object-none': 'object-fit: none',
  'object-scale-down': 'object-fit: scale-down',
  // Border style
  'border-solid': 'border-style: solid',
  'border-dashed': 'border-style: dashed',
  'border-dotted': 'border-style: dotted',
  'border-double': 'border-style: double',
  'border-none': 'border-style: none',
  'border-hidden': 'border-style: hidden',
  // Outline
  'outline-none': 'outline: 2px solid transparent; outline-offset: 2px',
  'outline': 'outline-style: solid',
  'outline-dashed': 'outline-style: dashed',
  'outline-dotted': 'outline-style: dotted',
  'outline-double': 'outline-style: double',
  // Shadow
  'shadow-sm': 'box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'shadow': 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'shadow-md': 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'shadow-lg': 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'shadow-xl': 'box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  'shadow-2xl': 'box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)',
  'shadow-inner': 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  'shadow-none': 'box-shadow: 0 0 #0000',
  // Transition
  'transition': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
  'transition-none': 'transition-property: none',
  'transition-all': 'transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
  'transition-colors': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
  'transition-opacity': 'transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
  'transition-shadow': 'transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
  'transition-transform': 'transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
  // Easing
  'ease-linear': 'transition-timing-function: linear',
  'ease-in': 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1)',
  'ease-out': 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1)',
  'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
  // Aspect ratio
  'aspect-auto': 'aspect-ratio: auto',
  'aspect-square': 'aspect-ratio: 1 / 1',
  'aspect-video': 'aspect-ratio: 16 / 9',
  // Misc
  'sr-only': 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0',
  'not-sr-only': 'position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal',
  'antialiased': '-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale',
  'subpixel-antialiased': '-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto',
  'box-border': 'box-sizing: border-box',
  'box-content': 'box-sizing: content-box',
  'border-collapse': 'border-collapse: collapse',
  'border-separate': 'border-collapse: separate',
  'float-right': 'float: right',
  'float-left': 'float: left',
  'float-none': 'float: none',
  'clear-left': 'clear: left',
  'clear-right': 'clear: right',
  'clear-both': 'clear: both',
  'clear-none': 'clear: none',
  'isolate': 'isolation: isolate',
  'isolation-auto': 'isolation: auto',
  'invert': 'filter: invert(100%)',
  'invert-0': 'filter: invert(0)',
  'grayscale': 'filter: grayscale(100%)',
  'grayscale-0': 'filter: grayscale(0)',
};

/* ── Pattern-based conversion ──────────────────────────────── */
function convertClass(raw) {
  // Handle negative prefix
  const neg = raw.startsWith('-');
  const cls = neg ? raw.slice(1) : raw;

  // 1. Static lookup first
  if (!neg && STATIC[cls] !== undefined) return STATIC[cls];

  // 2. Pattern matching
  const decls = patternMatch(cls, neg);
  if (decls) return decls;

  return null;
}

function patternMatch(cls, neg) {
  // --- Spacing: p, px, py, pt, pr, pb, pl ---
  const spaceM = cls.match(/^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-(.+)$/);
  if (spaceM) {
    const [, prefix, token] = spaceM;
    const val = spOrArb(token);
    if (!val) return null;
    const v = neg ? `-${val}` : val;
    const propMap = {
      p: 'padding', px: 'padding-left: VAL; padding-right', py: 'padding-top: VAL; padding-bottom',
      pt: 'padding-top', pr: 'padding-right', pb: 'padding-bottom', pl: 'padding-left',
      m: 'margin', mx: 'margin-left: VAL; margin-right', my: 'margin-top: VAL; margin-bottom',
      mt: 'margin-top', mr: 'margin-right', mb: 'margin-bottom', ml: 'margin-left',
    };
    const prop = propMap[prefix];
    if (prop.includes('VAL')) return prop.replace('VAL', v) + `: ${v}`;
    return `${prop}: ${v}`;
  }

  // --- Width / Height ---
  const sizeM = cls.match(/^(w|h|min-w|max-w|min-h|max-h|size)-(.+)$/);
  if (sizeM) {
    const [, prefix, token] = sizeM;
    const val = spOrArb(token);
    if (!val) return null;
    const propMap = {
      w: 'width', h: 'height',
      'min-w': 'min-width', 'max-w': 'max-width',
      'min-h': 'min-height', 'max-h': 'max-height',
      size: 'width: VAL; height',
    };
    const prop = propMap[prefix];
    if (prop === 'width: VAL; height') return `width: ${val}; height: ${val}`;
    return `${prop}: ${val}`;
  }

  // --- Text size ---
  const textSizeM = cls.match(/^text-(.+)$/);
  if (textSizeM) {
    const token = textSizeM[1];
    if (TW_TEXT_SIZE[token]) return `font-size: ${TW_TEXT_SIZE[token]}`;
    // Color
    const col = twColor(token);
    if (col) return `color: ${col}`;
    // Arbitrary size
    const a = arb(token);
    if (a) return `font-size: ${a}`;
  }

  // --- Font weight ---
  const fwM = cls.match(/^font-(.+)$/);
  if (fwM) {
    const token = fwM[1];
    if (TW_FONT_WEIGHT[token]) return `font-weight: ${TW_FONT_WEIGHT[token]}`;
    const a = arb(token);
    if (a) return `font-weight: ${a}`;
  }

  // --- Leading / line-height ---
  const leadM = cls.match(/^leading-(.+)$/);
  if (leadM) {
    const token = leadM[1];
    if (TW_LEADING[token]) return `line-height: ${TW_LEADING[token]}`;
    const a = arb(token);
    if (a) return `line-height: ${a}`;
  }

  // --- Tracking / letter-spacing ---
  const trackM = cls.match(/^tracking-(.+)$/);
  if (trackM) {
    const token = trackM[1];
    if (TW_TRACKING[token]) return `letter-spacing: ${TW_TRACKING[token]}`;
    const a = arb(token);
    if (a) return `letter-spacing: ${a}`;
  }

  // --- Background color ---
  const bgM = cls.match(/^bg-(.+)$/);
  if (bgM) {
    const token = bgM[1];
    const col = twColor(token);
    if (col) return `background-color: ${col}`;
    const a = arb(token);
    if (a) return `background-color: ${a}`;
  }

  // --- Border ---
  const borderColorM = cls.match(/^border-(.+)$/);
  if (borderColorM) {
    const token = borderColorM[1];
    // border-{n} width
    const bwM = token.match(/^\d+$/);
    if (bwM) return `border-width: ${token}px`;
    // border-t/r/b/l-{n}
    const bSideM = token.match(/^(t|r|b|l|x|y)-(\d+)$/);
    if (bSideM) {
      const sideMap = { t: 'border-top-width', r: 'border-right-width', b: 'border-bottom-width', l: 'border-left-width' };
      if (sideMap[bSideM[1]]) return `${sideMap[bSideM[1]]}: ${bSideM[2]}px`;
    }
    const col = twColor(token);
    if (col) return `border-color: ${col}`;
    const a = arb(token);
    if (a && (a.startsWith('#') || a.startsWith('rgb') || a.startsWith('hsl'))) return `border-color: ${a}`;
  }

  // --- Bare border ---
  if (cls === 'border') return 'border-width: 1px';

  // --- Rounded ---
  const roundedM = cls.match(/^rounded(?:-(.+))?$/);
  if (roundedM) {
    const token = roundedM[1] ?? '';
    // rounded-{side}-{size}
    const sideM = token.match(/^(t|r|b|l|tl|tr|br|bl)(?:-(.+))?$/);
    if (sideM) {
      const [, side, sz] = sideM;
      const r = sz !== undefined ? (TW_ROUNDED[sz] ?? arb(sz)) : TW_ROUNDED[''];
      if (!r) return null;
      const propMap = {
        t: `border-top-left-radius: ${r}; border-top-right-radius`,
        r: `border-top-right-radius: ${r}; border-bottom-right-radius`,
        b: `border-bottom-right-radius: ${r}; border-bottom-left-radius`,
        l: `border-top-left-radius: ${r}; border-bottom-left-radius`,
        tl: 'border-top-left-radius',
        tr: 'border-top-right-radius',
        br: 'border-bottom-right-radius',
        bl: 'border-bottom-left-radius',
      };
      const prop = propMap[side];
      if (prop.includes('; border')) return `${prop}: ${r}`;
      return `${prop}: ${r}`;
    }
    const r = TW_ROUNDED[token] ?? arb(token);
    if (r !== undefined && r !== null) return `border-radius: ${r}`;
  }

  // --- Opacity ---
  const opM = cls.match(/^opacity-(.+)$/);
  if (opM) {
    const v = TW_OPACITY[opM[1]] ?? arb(opM[1]);
    if (v) return `opacity: ${v}`;
  }

  // --- Z-index ---
  const zM = cls.match(/^z-(.+)$/);
  if (zM) {
    const v = TW_Z[zM[1]] ?? arb(zM[1]);
    if (v) return `z-index: ${v}`;
  }

  // --- Gap ---
  const gapM = cls.match(/^gap(?:-(x|y))?-(.+)$/);
  if (gapM) {
    const [, axis, token] = gapM;
    const val = spOrArb(token);
    if (!val) return null;
    if (axis === 'x') return `column-gap: ${val}`;
    if (axis === 'y') return `row-gap: ${val}`;
    return `gap: ${val}`;
  }

  // --- Space between (space-x, space-y) ---
  const spaceXM = cls.match(/^space-(x|y)-(.+)$/);
  if (spaceXM) {
    const [, axis, token] = spaceXM;
    const val = spOrArb(token);
    if (!val) return null;
    const v = neg ? `-${val}` : val;
    if (axis === 'x') return `/* space-x: use > * + * { margin-left: ${v} } */`;
    return `/* space-y: use > * + * { margin-top: ${v} } */`;
  }

  // --- Inset (top, right, bottom, left, inset) ---
  const insetM = cls.match(/^(inset|top|right|bottom|left|inset-x|inset-y)-(.+)$/);
  if (insetM) {
    const [, prefix, token] = insetM;
    const val = spOrArb(token);
    if (!val) return null;
    const v = neg ? `-${val}` : val;
    const propMap = {
      inset: 'inset', top: 'top', right: 'right', bottom: 'bottom', left: 'left',
      'inset-x': 'left: VAL; right', 'inset-y': 'top: VAL; bottom',
    };
    const prop = propMap[prefix];
    if (prop?.includes('VAL')) return `${prop.replace('VAL', v)}: ${v}`;
    return `${prop}: ${v}`;
  }

  // --- Grid ---
  const gridColsM = cls.match(/^grid-cols-(.+)$/);
  if (gridColsM) {
    const token = gridColsM[1];
    const a = arb(token);
    if (a) return `grid-template-columns: ${a}`;
    if (!isNaN(token)) return `grid-template-columns: repeat(${token}, minmax(0, 1fr))`;
    if (token === 'none') return 'grid-template-columns: none';
  }

  const gridRowsM = cls.match(/^grid-rows-(.+)$/);
  if (gridRowsM) {
    const token = gridRowsM[1];
    const a = arb(token);
    if (a) return `grid-template-rows: ${a}`;
    if (!isNaN(token)) return `grid-template-rows: repeat(${token}, minmax(0, 1fr))`;
    if (token === 'none') return 'grid-template-rows: none';
  }

  const colSpanM = cls.match(/^col-span-(.+)$/);
  if (colSpanM) {
    const token = colSpanM[1];
    const a = arb(token);
    if (a) return `grid-column: ${a}`;
    if (token === 'full') return 'grid-column: 1 / -1';
    if (!isNaN(token)) return `grid-column: span ${token} / span ${token}`;
  }

  const rowSpanM = cls.match(/^row-span-(.+)$/);
  if (rowSpanM) {
    const token = rowSpanM[1];
    const a = arb(token);
    if (a) return `grid-row: ${a}`;
    if (token === 'full') return 'grid-row: 1 / -1';
    if (!isNaN(token)) return `grid-row: span ${token} / span ${token}`;
  }

  // --- Duration / delay ---
  const durM = cls.match(/^duration-(.+)$/);
  if (durM) {
    const a = arb(durM[1]);
    const known = { '75': '75ms','100': '100ms','150': '150ms','200': '200ms','300': '300ms','500': '500ms','700': '700ms','1000': '1000ms' };
    return `transition-duration: ${known[durM[1]] ?? a ?? `${durM[1]}ms`}`;
  }

  const delayM = cls.match(/^delay-(.+)$/);
  if (delayM) {
    const a = arb(delayM[1]);
    const known = { '75': '75ms','100': '100ms','150': '150ms','200': '200ms','300': '300ms','500': '500ms','700': '700ms','1000': '1000ms' };
    return `transition-delay: ${known[delayM[1]] ?? a ?? `${delayM[1]}ms`}`;
  }

  // --- Scale / Rotate / Translate / Skew ---
  const scaleM = cls.match(/^scale(?:-(x|y))?-(.+)$/);
  if (scaleM) {
    const [, axis, token] = scaleM;
    const a = arb(token);
    const v = a ?? (parseFloat(token) / 100);
    if (axis === 'x') return `--tw-scale-x: ${v}; transform: scaleX(${v})`;
    if (axis === 'y') return `--tw-scale-y: ${v}; transform: scaleY(${v})`;
    return `transform: scale(${v})`;
  }

  const rotateM = cls.match(/^rotate-(.+)$/);
  if (rotateM) {
    const a = arb(rotateM[1]);
    const v = a ?? `${rotateM[1]}deg`;
    return `transform: rotate(${neg ? '-' : ''}${v})`;
  }

  const translateM = cls.match(/^translate-(x|y)-(.+)$/);
  if (translateM) {
    const [, axis, token] = translateM;
    const val = spOrArb(token) ?? `${token}`;
    const v = neg ? `-${val}` : val;
    return `transform: translate${axis.toUpperCase()}(${v})`;
  }

  const skewM = cls.match(/^skew-(x|y)-(.+)$/);
  if (skewM) {
    const [, axis, token] = skewM;
    const a = arb(token);
    const v = neg ? `-${a ?? token + 'deg'}` : (a ?? token + 'deg');
    return `transform: skew${axis.toUpperCase()}(${v})`;
  }

  // --- Order ---
  const orderM = cls.match(/^order-(.+)$/);
  if (orderM) {
    const known = { first: '-9999', last: '9999', none: '0' };
    const v = known[orderM[1]] ?? arb(orderM[1]) ?? orderM[1];
    return `order: ${v}`;
  }

  // --- Flex basis ---
  const basisM = cls.match(/^basis-(.+)$/);
  if (basisM) {
    const val = spOrArb(basisM[1]);
    if (val) return `flex-basis: ${val}`;
  }

  // --- Columns ---
  const colsM = cls.match(/^columns-(.+)$/);
  if (colsM) {
    const a = arb(colsM[1]);
    if (a) return `columns: ${a}`;
    if (!isNaN(colsM[1])) return `columns: ${colsM[1]}`;
  }

  // --- Aspect ratio ---
  const aspectM = cls.match(/^aspect-(.+)$/);
  if (aspectM) {
    const a = arb(aspectM[1]);
    if (a) return `aspect-ratio: ${a}`;
  }

  // --- Object position ---
  const objM = cls.match(/^object-(bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top)$/);
  if (objM) return `object-position: ${objM[1].replace(/-/g, ' ')}`;

  // --- Stroke / Fill (SVG) ---
  const fillM = cls.match(/^fill-(.+)$/);
  if (fillM) {
    const col = twColor(fillM[1]);
    if (col) return `fill: ${col}`;
    if (fillM[1] === 'none') return 'fill: none';
  }

  const strokeM = cls.match(/^stroke-(.+)$/);
  if (strokeM) {
    const a = arb(strokeM[1]);
    if (a && /^\d/.test(a)) return `stroke-width: ${a}`;
    const col = twColor(strokeM[1]);
    if (col) return `stroke: ${col}`;
  }

  // --- Ring ---
  if (cls === 'ring') return 'box-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width,0px)) var(--tw-ring-color,rgb(59 130 246/0.5))';
  if (cls === 'ring-0') return 'box-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width,0px)) var(--tw-ring-color)';
  const ringM = cls.match(/^ring-(.+)$/);
  if (ringM) {
    const token = ringM[1];
    if (/^\d+$/.test(token)) return `box-shadow: 0 0 0 ${token}px var(--tw-ring-color,rgb(59 130 246/0.5))`;
    const col = twColor(token);
    if (col) return `--tw-ring-color: ${col}`;
  }

  return null;
}

/* ── Variant prefix resolution ─────────────────────────────── */
const STATE_MAP = {
  'hover': '&:hover',
  'focus': '&:focus',
  'focus-within': '&:focus-within',
  'focus-visible': '&:focus-visible',
  'active': '&:active',
  'visited': '&:visited',
  'checked': '&:checked',
  'disabled': '&:disabled',
  'enabled': '&:enabled',
  'required': '&:required',
  'optional': '&:optional',
  'valid': '&:valid',
  'invalid': '&:invalid',
  'placeholder': '&::placeholder',
  'before': '&::before',
  'after': '&::after',
  'first': '&:first-child',
  'last': '&:last-child',
  'odd': '&:nth-child(odd)',
  'even': '&:nth-child(even)',
  'first-of-type': '&:first-of-type',
  'last-of-type': '&:last-of-type',
  'only': '&:only-child',
  'only-of-type': '&:only-of-type',
  'empty': '&:empty',
  'dark': '@media (prefers-color-scheme: dark)',
  'print': '@media print',
  'motion-safe': '@media (prefers-reduced-motion: no-preference)',
  'motion-reduce': '@media (prefers-reduced-motion: reduce)',
  'portrait': '@media (orientation: portrait)',
  'landscape': '@media (orientation: landscape)',
};

function parseVariants(raw) {
  // Split on : but not inside [] (for arbitrary variants like [&:hover]:)
  const parts = [];
  let depth = 0, start = 0;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '[') depth++;
    else if (raw[i] === ']') depth--;
    else if (raw[i] === ':' && depth === 0) {
      parts.push(raw.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(raw.slice(start));
  const classToken = parts.pop();
  return { variants: parts, classToken };
}

/* ── Parse a class string → variant groups + unknown list ─── */
function parseClassGroups(classString) {
  const tokens = classString.split(/\s+/).filter(Boolean);
  const groups = new Map();
  let converted = 0;
  const unknownClasses = [];

  for (const raw of tokens) {
    if (!raw || raw === '\\') continue;
    const { variants, classToken } = parseVariants(raw);
    const decl = convertClass(classToken);
    if (!decl) { unknownClasses.push(raw); continue; }
    converted++;

    let mediaQuery = null;
    let pseudoSelector = null;
    for (const v of variants) {
      if (TW_BREAKPOINTS[v]) {
        mediaQuery = `@media (min-width: ${TW_BREAKPOINTS[v]})`;
      } else if (v.startsWith('[') && v.endsWith(']')) {
        const inner = v.slice(1, -1);
        if (inner.startsWith('@')) mediaQuery = inner;
        else pseudoSelector = inner;
      } else if (STATE_MAP[v]) {
        const s = STATE_MAP[v];
        if (s.startsWith('@media')) mediaQuery = s;
        else pseudoSelector = s;
      }
    }

    const key = [mediaQuery, pseudoSelector].filter(Boolean).join('|');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(decl);
  }

  return { groups, converted, unknownClasses };
}

/* ── Render: CSS ──────────────────────────────────────────── */
function renderCss(selector, groups, unknownClasses) {
  const lines = [];
  const I = '  ';

  function pushDecls(decls, prefix) {
    for (const d of decls) {
      for (const part of d.split(';')) {
        const p = part.trim();
        if (p) lines.push(`${prefix}${p};`);
      }
    }
  }

  for (const [key, decls] of groups) {
    const parts  = key ? key.split('|') : [];
    const media  = parts.find(p => p.startsWith('@'));
    const pseudo = parts.find(p => !p.startsWith('@'));

    if (!key) {
      lines.push(`${selector} {`);
      pushDecls(decls, I);
      lines.push('}');
    } else if (media && pseudo) {
      lines.push(`${media} {`);
      lines.push(`${I}${selector}${pseudo.replace('&', '')} {`);
      pushDecls(decls, I + I);
      lines.push(`${I}}`);
      lines.push('}');
    } else if (media) {
      lines.push(`${media} {`);
      lines.push(`${I}${selector} {`);
      pushDecls(decls, I + I);
      lines.push(`${I}}`);
      lines.push('}');
    } else {
      lines.push(`${selector}${pseudo.replace('&', '')} {`);
      pushDecls(decls, I);
      lines.push('}');
    }
    lines.push('');
  }

  if (unknownClasses.length > 0) {
    lines.push(`/* ⚠ not converted: ${unknownClasses.join(' ')} */`);
    lines.push('');
  }

  return lines.join('\n');
}

/* ── Render: SCSS (nested variants) ──────────────────────── */
function renderScss(selector, groups, unknownClasses) {
  const lines = [];
  const I = '  ';

  function pushDecls(decls, prefix) {
    for (const d of decls) {
      for (const part of d.split(';')) {
        const p = part.trim();
        if (p) lines.push(`${prefix}${p};`);
      }
    }
  }

  lines.push(`${selector} {`);
  pushDecls(groups.get('') ?? [], I);

  for (const [key, decls] of groups) {
    if (!key) continue;
    const parts  = key.split('|');
    const media  = parts.find(p => p.startsWith('@'));
    const pseudo = parts.find(p => !p.startsWith('@'));

    lines.push('');
    if (pseudo && !media) {
      lines.push(`${I}${pseudo} {`);
      pushDecls(decls, I + I);
      lines.push(`${I}}`);
    } else if (media && !pseudo) {
      lines.push(`${I}${media} {`);
      pushDecls(decls, I + I);
      lines.push(`${I}}`);
    } else if (media && pseudo) {
      lines.push(`${I}${media} {`);
      lines.push(`${I}${I}${pseudo} {`);
      pushDecls(decls, I + I + I);
      lines.push(`${I}${I}}`);
      lines.push(`${I}}`);
    }
  }

  lines.push('}');

  if (unknownClasses.length > 0) {
    lines.push('');
    lines.push(`// ⚠ not converted: ${unknownClasses.join(' ')}`);
  }

  return lines.join('\n');
}

/* ── Render: JS Object ───────────────────────────────────── */
function cssToCamel(prop) {
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function renderJs(varName, groups, unknownClasses) {
  const lines = [];
  const I = '  ';

  function declsToJs(decls, prefix, asComment = false) {
    for (const d of decls) {
      for (const part of d.split(';')) {
        const p = part.trim();
        if (!p) continue;
        const col = p.indexOf(':');
        if (col === -1) continue;
        const prop = cssToCamel(p.slice(0, col).trim());
        const val  = p.slice(col + 1).trim();
        const line = `${prefix}${prop}: '${val}',`;
        lines.push(asComment ? `${prefix}// ${prop}: '${val}',` : line);
      }
    }
  }

  lines.push(`const ${varName} = {`);
  declsToJs(groups.get('') ?? [], I);

  for (const [key, decls] of groups) {
    if (!key) continue;
    const parts  = key.split('|');
    const media  = parts.find(p => p.startsWith('@'));
    const pseudo = parts.find(p => !p.startsWith('@'));
    const label  = [pseudo, media].filter(Boolean).join(' ');
    lines.push(`${I}// ${label}:`);
    declsToJs(decls, I, true);
  }

  lines.push('};');

  if (unknownClasses.length > 0) {
    lines.push('');
    lines.push(`// ⚠ not converted: ${unknownClasses.join(' ')}`);
  }

  return lines.join('\n');
}

/* ── Main converter — returns blocks ─────────────────────── */
function convertTailwind(input) {
  const hasHtml = /<[a-zA-Z][a-zA-Z0-9]*\b[^>]*class(?:Name)?="[^"]*"[^>]*>/i.test(input);

  if (hasHtml) {
    const elements = [];
    const tagRe = /<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
    let m;
    while ((m = tagRe.exec(input)) !== null) {
      const [, tag, attrs] = m;
      const classMatch = attrs.match(/class(?:Name)?="([^"]*)"/);
      if (classMatch && classMatch[1].trim()) {
        elements.push({ tag: tag.toLowerCase(), classes: classMatch[1].trim() });
      }
    }

    if (elements.length > 0) {
      const tagCounts = {};
      const blocks = [];
      for (const { tag, classes } of elements) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        const selector = tagCounts[tag] === 1 ? `.${tag}` : `.${tag}-${tagCounts[tag]}`;
        const { groups, converted, unknownClasses } = parseClassGroups(classes);
        if (converted > 0 || unknownClasses.length > 0) {
          blocks.push({ selector, tag, classes, groups, converted, unknownClasses });
        }
      }
      return { blocks, isHtml: true };
    }
  }

  // Plain class list
  const cleaned = input
    .replace(/class(?:Name)?="([^"]*)"/g, (_, c) => c)
    .replace(/class(?:Name)?='([^']*)'/g, (_, c) => c)
    .replace(/<[^>]+>/g, ' ')
    .replace(/[,;]/g, ' ');

  const { groups, converted, unknownClasses } = parseClassGroups(cleaned.trim());
  return {
    blocks: [{ selector: '.element', tag: null, classes: cleaned.trim(), groups, converted, unknownClasses }],
    isHtml: false,
  };
}

/* ════════════════════════════════════════════════════════════════
   Syntax highlight helpers
════════════════════════════════════════════════════════════════ */

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// CSS output highlight
function getC() {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  return dark
    ? { selector: '#4ec9b0', property: '#9cdcfe', value: '#ce9178', punct: '#569cd6', atRule: '#c586c0', comment: '#6a9955', number: '#b5cea8' }
    : { selector: '#0f766e', property: '#0550ae', value: '#b45309', punct: '#374151', atRule: '#7c3aed', comment: '#6b7280', number: '#1d4ed8' };
}

function highlightCss(code) {
  const C = getC();
  let out = '', i = 0, depth = 0, inProp = true;
  while (i < code.length) {
    const rem = code.slice(i);
    if (rem.startsWith('/*')) {
      const end = code.indexOf('*/', i + 2);
      out += `<span style="color:${C.comment}">${esc(code.slice(i, end < 0 ? code.length : end + 2))}</span>`;
      i = end < 0 ? code.length : end + 2; continue;
    }
    if (code[i] === '@') {
      const m = rem.match(/^@[\w-]+/);
      if (m) { out += `<span style="color:${C.atRule}">${esc(m[0])}</span>`; i += m[0].length; continue; }
    }
    if (code[i] === '{') { out += `<span style="color:${C.punct}">{</span>`; depth++; inProp = true; i++; continue; }
    if (code[i] === '}') { out += `<span style="color:${C.punct}">}</span>`; depth = Math.max(0, depth - 1); inProp = false; i++; continue; }
    if (code[i] === ';') { out += `<span style="color:${C.punct}">;</span>`; inProp = true; i++; continue; }
    if (code[i] === ':' && depth > 0 && inProp) { out += `<span style="color:${C.punct}">:</span>`; inProp = false; i++; continue; }
    if (/[a-zA-Z_-]/.test(code[i])) {
      const m = rem.match(/^[-a-zA-Z_][-\w]*/);
      if (m) {
        const after = code.slice(i + m[0].length).trimStart();
        const col = depth > 0 && inProp && after.startsWith(':') && !after.startsWith('::')
          ? C.property : depth > 0 && !inProp ? C.value : C.selector;
        out += `<span style="color:${col}">${esc(m[0])}</span>`; i += m[0].length; continue;
      }
    }
    if (code[i] === '#' && depth > 0) {
      const m = rem.match(/^#[0-9a-fA-F]{3,8}\b/);
      if (m) { out += `<span style="color:${C.number}">${esc(m[0])}</span>`; i += m[0].length; continue; }
    }
    if (/\d/.test(code[i])) {
      const m = rem.match(/^\d*\.?\d+(%|px|em|rem|vh|vw|s|ms|deg|fr)?/);
      if (m) { out += `<span style="color:${C.number}">${esc(m[0])}</span>`; i += m[0].length; continue; }
    }
    out += esc(code[i]); i++;
  }
  return out;
}

// JS Object highlight
function highlightJs(code) {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const J = dark
    ? { comment: '#6a9955', kw: '#c586c0', name: '#4ec9b0', punct: '#d4d4d4', prop: '#9cdcfe', str: '#ce9178' }
    : { comment: '#6b7280', kw: '#7c3aed', name: '#0f766e', punct: '#374151', prop: '#0550ae', str: '#b45309' };
  return code.split('\n').map(line => {
    if (/^\s*\/\//.test(line)) return `<span style="color:${J.comment}">${esc(line)}</span>`;
    const constM = line.match(/^(const )(\w+)( = \{)$/);
    if (constM) return `<span style="color:${J.kw}">${esc(constM[1])}</span><span style="color:${J.name}">${esc(constM[2])}</span><span style="color:${J.punct}">${esc(constM[3])}</span>`;
    if (/^\};$/.test(line.trim())) return `<span style="color:${J.kw}">}</span><span style="color:${J.punct}">;</span>`;
    const propM = line.match(/^(\s*)([\w]+)(: ')([^']*)(',?.*)$/);
    if (propM) return `${esc(propM[1])}<span style="color:${J.prop}">${esc(propM[2])}</span><span style="color:${J.punct}">${esc(propM[3])}</span><span style="color:${J.str}">${esc(propM[4])}</span><span style="color:${J.punct}">${esc(propM[5])}</span>`;
    return esc(line);
  }).join('\n');
}

// Tailwind input highlight: class tokens coloured
function highlightTailwind(code) {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const T = dark
    ? { comment: '#6a9955', arbitrary: '#fbbf24', variant: '#4ec9b0', cls: '#7dd3fc' }
    : { comment: '#6b7280', arbitrary: '#b45309', variant: '#0f766e', cls: '#0550ae' };
  return code.split('\n').map(line => {
    if (!line.trim()) return '';
    return line.split(/(\s+)/).map(tok => {
      if (!tok.trim()) return esc(tok);
      // Comment lines
      if (tok.startsWith('//') || tok.startsWith('#')) return `<span style="color:${T.comment}">${esc(tok)}</span>`;
      // Arbitrary value classes get amber
      if (tok.includes('[')) return `<span style="color:${T.arbitrary}">${esc(tok)}</span>`;
      // Variant prefix (contains :) gets teal
      if (tok.includes(':')) {
        const colon = tok.lastIndexOf(':');
        return `<span style="color:${T.variant}">${esc(tok.slice(0, colon + 1))}</span><span style="color:${T.cls}">${esc(tok.slice(colon + 1))}</span>`;
      }
      return `<span style="color:${T.cls}">${esc(tok)}</span>`;
    }).join('');
  }).join('\n');
}

/* ════════════════════════════════════════════════════════════════
   Sample
════════════════════════════════════════════════════════════════ */

const SAMPLE = `<div class="flex flex-col items-center p-6 rounded-2xl bg-white shadow-md">
  <img class="size-48 rounded-lg shadow-xl" src="/cover.png" alt="" />
  <div class="mt-4 text-center">
    <h2 class="text-lg font-semibold text-gray-900">Album Title</h2>
    <p class="text-sm text-gray-500 mt-1">Artist · 2025</p>
  </div>
  <button class="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
    Play
  </button>
</div>`;

/* ════════════════════════════════════════════════════════════════
   Line numbers helper
════════════════════════════════════════════════════════════════ */

function LineNumbers({ count, scrollRef }) {
  const nums = Array.from({ length: Math.max(count, 1) }, (_, i) => i + 1);
  return (
    <div ref={scrollRef} className={styles.lineNums} aria-hidden="true">
      {nums.map(n => <div key={n} className={styles.lineNum}>{n}</div>)}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Component
════════════════════════════════════════════════════════════════ */

export default function TailwindToCssTool() {
  const [input, setInput]             = useState(SAMPLE);
  const [fmt, setFmt]                 = useState('css'); // 'css' | 'scss' | 'js'
  const [copyDone, setCopyDone]       = useState(false);
  const [history, setHistory]         = useState([]);
  const [histOpen, setHistOpen]       = useState(false);
  const [selectorOverrides, setSelOv] = useState({});
  const [editingIdx, setEditingIdx]   = useState(null);
  const [editingVal, setEditingVal]   = useState('');

  const inputLineRef  = useRef(null);
  const inputHighRef  = useRef(null);
  const outputLineRef = useRef(null);
  const textareaRef   = useRef(null);
  const fileInputRef  = useRef(null);

  // Parse input → blocks
  const { blocks, isHtml } = (() => {
    try { return input.trim() ? convertTailwind(input) : { blocks: [], isHtml: false }; }
    catch { return { blocks: [], isHtml: false }; }
  })();

  const totalConverted = blocks.reduce((s, b) => s + b.converted, 0);
  const totalUnknown   = blocks.reduce((s, b) => s + b.unknownClasses.length, 0);

  // Reset selector overrides when input changes
  useEffect(() => { setSelOv({}); }, [input]);

  // Build output text from blocks + format + selector overrides
  const outputText = (() => {
    if (!blocks.length) return '';
    const parts = [];
    for (let i = 0; i < blocks.length; i++) {
      const b        = blocks[i];
      const selector = selectorOverrides[i] ?? b.selector;
      const varName  = selector.replace(/^[.#]/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Styles';
      if (blocks.length > 1) {
        parts.push(fmt === 'js'
          ? `// <${b.tag} class="${b.classes}">`
          : `/* <${b.tag ?? 'element'} class="${b.classes}"> */`);
      }
      if (fmt === 'scss')     parts.push(renderScss(selector, b.groups, b.unknownClasses));
      else if (fmt === 'js')  parts.push(renderJs(varName, b.groups, b.unknownClasses));
      else                    parts.push(renderCss(selector, b.groups, b.unknownClasses));
    }
    return parts.join('\n').trimEnd();
  })();

  const inputLineCount  = Math.max(input.split('\n').length, 1);
  const outputLineCount = Math.max(outputText.split('\n').length, 1);

  // Auto-save to history
  useEffect(() => {
    if (!input.trim() || !outputText) return;
    const timer = setTimeout(() => {
      setHistory(prev => {
        if (prev.length > 0 && prev[0].input === input) return prev;
        return [{
          id: Date.now(),
          ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          input,
          preview: input.replace(/\s+/g, ' ').trim().slice(0, 72),
          converted: totalConverted,
        }, ...prev].slice(0, 15);
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [input]); // eslint-disable-line react-hooks/exhaustive-deps

  const syncInputScroll = useCallback((e) => {
    const top = e.target.scrollTop, left = e.target.scrollLeft;
    if (inputLineRef.current) inputLineRef.current.scrollTop = top;
    if (inputHighRef.current) { inputHighRef.current.scrollTop = top; inputHighRef.current.scrollLeft = left; }
  }, []);

  const syncOutputScroll = useCallback((e) => {
    if (outputLineRef.current) outputLineRef.current.scrollTop = e.target.scrollTop;
  }, []);

  const handleCopy = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 1800);
    });
  }, [outputText]);

  const ext = fmt === 'js' ? 'js' : fmt === 'scss' ? 'scss' : 'css';
  const handleDownload = useCallback(() => {
    if (!outputText) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([outputText], { type: 'text/plain' }));
    a.download = `tailwind-output.${ext}`;
    a.click();
  }, [outputText, ext]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadFile = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => setInput(e.target.result);
    r.readAsText(file);
  };

  const handleFileInput = (e) => { loadFile(e.target.files[0]); e.target.value = ''; };
  const handleDrop      = (e) => { e.preventDefault(); loadFile(e.dataTransfer.files[0]); };

  // Selector editing (HTML mode)
  function startEdit(i) {
    setEditingIdx(i);
    setEditingVal(selectorOverrides[i] ?? blocks[i].selector);
  }
  function commitEdit() {
    if (editingIdx !== null && editingVal.trim()) {
      setSelOv(prev => ({ ...prev, [editingIdx]: editingVal.trim() }));
    }
    setEditingIdx(null);
  }

  const highlightOutput = fmt === 'js' ? highlightJs : highlightCss;
  const copyLabel = copyDone ? '✓ Copied' : fmt === 'js' ? 'Copy JS' : fmt === 'scss' ? 'Copy SCSS' : 'Copy CSS';
  const outputTitle = fmt === 'js' ? 'JS Object' : fmt === 'scss' ? 'SCSS Output' : 'CSS Output';

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="tailwind-to-css" />

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoBox}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 4a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2"/>
            <path d="M6 4a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2"/>
          </svg>
        </div>
        <span className={styles.logoText}>Tailwind <span className={styles.accent}>→</span> CSS</span>
        <div className={styles.headerSep}/>
        <span className={styles.headerSub}>Expand utility classes to CSS</span>
        <div className={styles.headerRight}>
          <div className={styles.fmtTabs}>
            {[['css','CSS'],['scss','SCSS'],['js','JS Object']].map(([f, label]) => (
              <button
                key={f}
                className={`${styles.fmtTab} ${fmt === f ? styles.fmtTabActive : ''}`}
                onClick={() => setFmt(f)}
              >{label}</button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <button className={styles.btnSample} onClick={() => setInput(SAMPLE)}>Sample</button>
        <button className={styles.btnTool} onClick={() => setInput('')} disabled={!input}>Clear</button>
        <button className={styles.btnTool} onClick={() => fileInputRef.current?.click()}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload
        </button>
        <input ref={fileInputRef} type="file" accept=".txt,.html,.jsx,.tsx" style={{ display: 'none' }} onChange={handleFileInput}/>
        <div className={styles.toolbarSpacer}/>
        <button className={`${styles.btnTool}${histOpen ? ' ' + styles.btnToolActive : ''}`} onClick={() => setHistOpen(h => !h)} style={{ position: 'relative' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          History
          {history.length > 0 && <span className={styles.histBadge}>{history.length}</span>}
        </button>
        <button className={`${styles.btnCopy}${copyDone ? ' ' + styles.btnCopyDone : ''}`} onClick={handleCopy} disabled={!outputText}>
          {copyLabel}
        </button>
        <button className={styles.btnTool} onClick={handleDownload} disabled={!outputText}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download
        </button>
      </div>

      {/* ── Selector Strip (HTML mode only) ── */}
      {isHtml && blocks.length > 0 && (
        <div className={styles.selectorStrip}>
          <span className={styles.selectorStripLabel}>Selectors</span>
          {blocks.map((b, i) => (
            <div key={i} className={styles.selectorChip}>
              {editingIdx === i ? (
                <input
                  className={styles.selectorInput}
                  value={editingVal}
                  onChange={e => setEditingVal(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditingIdx(null); }}
                  autoFocus
                />
              ) : (
                <button className={styles.selectorBtn} onClick={() => startEdit(i)} title="Click to rename selector">
                  <span className={styles.selectorTag}>&lt;{b.tag}&gt;</span>
                  <span className={styles.selectorName}>{selectorOverrides[i] ?? b.selector}</span>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── History Panel ── */}
      {histOpen && (
        <div className={styles.histPanel}>
          <div className={styles.histPanelHeader}>
            <span className={styles.histPanelTitle}>History</span>
            <button className={styles.histClearBtn} onClick={() => setHistory([])} disabled={history.length === 0}>Clear all</button>
            <button className={styles.histCloseBtn} onClick={() => setHistOpen(false)}>✕</button>
          </div>
          {history.length === 0 ? (
            <div className={styles.histEmpty}>No history yet — paste classes to auto-save.</div>
          ) : (
            <div className={styles.histList}>
              {history.map(h => (
                <button key={h.id} className={styles.histItem} onClick={() => { setInput(h.input); setHistOpen(false); }}>
                  <div className={styles.histMeta}>{h.ts} · <span className={styles.histFmt}>{h.converted} converted</span></div>
                  <div className={styles.histPreview}>{h.preview}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Editor Grid ── */}
      <div className={styles.editorGrid}>

        {/* Left: Tailwind input */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>Tailwind Classes</span>
            <span className={styles.paneCount}>{inputLineCount} lines</span>
          </div>
          <div className={styles.editorWrap} onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
            <LineNumbers count={inputLineCount} scrollRef={inputLineRef}/>
            <div className={styles.editorInner}>
              <pre
                ref={inputHighRef}
                className={styles.highlight}
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlightTailwind(input) + '\n' }}
              />
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={input}
                onChange={e => setInput(e.target.value)}
                onScroll={syncInputScroll}
                placeholder="Paste Tailwind classes or an HTML snippet…"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        </div>

        {/* Right: output */}
        <div className={styles.pane}>
          <div className={styles.paneHeader}>
            <span className={styles.paneTitle}>{outputTitle}</span>
            {totalConverted > 0 && (
              <span className={styles.paneCount}>
                {totalConverted} propert{totalConverted === 1 ? 'y' : 'ies'}
                {totalUnknown > 0 && <span className={styles.unknownBadge}> · ⚠ {totalUnknown} unknown</span>}
              </span>
            )}
          </div>
          <div className={styles.editorWrap}>
            <LineNumbers count={outputLineCount} scrollRef={outputLineRef}/>
            <div className={styles.editorInner}>
              {outputText ? (
                <pre
                  className={`${styles.highlight} ${styles.outputPre}`}
                  onScroll={syncOutputScroll}
                  dangerouslySetInnerHTML={{ __html: highlightOutput(outputText) + '\n' }}
                />
              ) : (
                <pre className={styles.highlight} style={{ color: '#3d4450' }}>
                  {input.trim() ? 'No output — check your Tailwind classes.' : 'Paste Tailwind classes on the left to see output here.'}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div className={styles.statusBar}>
        <div className={`${styles.statusDot}${totalConverted > 0 ? ' ' + styles.statusOk : ''}`}/>
        <span className={styles.statusText}>
          {totalConverted > 0
            ? `${totalConverted} propert${totalConverted === 1 ? 'y' : 'ies'} generated${totalUnknown ? ` · ${totalUnknown} class${totalUnknown > 1 ? 'es' : ''} not recognised` : ''}`
            : 'Ready — paste Tailwind classes on the left'}
        </span>
        {isHtml && blocks.length > 0 && (
          <span className={styles.statusHint}>{blocks.length} element{blocks.length > 1 ? 's' : ''} detected</span>
        )}
      </div>
    </div>
  );
}
